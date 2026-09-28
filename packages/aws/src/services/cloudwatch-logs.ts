import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as stream from "effect/Stream";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CloudWatch Logs",
  target: "Logs_20140328",
  version: "2014-03-28",
  sigv4: "logs",
  protocol: awsJson1_1Protocol,
  xmlns: "http://monitoring.amazonaws.com/doc/2014-03-28/",
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
                `https://logs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (Region === "us-gov-east-1") {
                return e("https://logs.us-gov-east-1.amazonaws.com");
              }
              if (Region === "us-gov-west-1") {
                return e("https://logs.us-gov-west-1.amazonaws.com");
              }
              return e(
                `https://logs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://logs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://logs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"])<{
    readonly message?: string;
  }> {}
export class DataAlreadyAcceptedException
  extends /*@__PURE__*/ TE.TaggedError("DataAlreadyAcceptedException", [
    "ConflictError",
  ])<{ readonly expectedSequenceToken?: string; readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidOperationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidOperationException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class InvalidSequenceTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidSequenceTokenException", [
    "BadRequestError",
  ])<{ readonly expectedSequenceToken?: string; readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException", [
    "QuotaError",
  ])<{ readonly message?: string }> {}
export class MalformedQueryException
  extends /*@__PURE__*/ TE.TaggedError("MalformedQueryException", [
    "BadRequestError",
  ])<{
    readonly queryCompileError?: QueryCompileError;
    readonly message?: string;
  }> {}
export class OperationAbortedException
  extends /*@__PURE__*/ TE.TaggedError("OperationAbortedException", [
    "ConflictError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ResourceAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError("ServiceQuotaExceededException", [
    "QuotaError",
  ])<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError("ServiceUnavailableException", [
    "ServerError",
  ])<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException", [
    "ThrottlingError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class UnrecognizedClientException
  extends /*@__PURE__*/ TE.TaggedError("UnrecognizedClientException", [
    "AuthError",
  ])<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export type LogGroupName = string;
export type KmsKeyId = string;
export type ResourceIdentifier = string;
export interface AssociateKmsKeyRequest {
  logGroupName?: string;
  kmsKeyId: string;
  resourceIdentifier?: string;
}
export interface AssociateKmsKeyResponse {}
export type Arn = string;
export type DataSourceName = string;
export type DataSourceType = string;
export interface DataSource {
  name: string;
  type?: string;
}
export interface AssociateSourceToS3TableIntegrationRequest {
  integrationArn: string;
  dataSource: DataSource;
}
export type S3TableIntegrationSourceIdentifier = string;
export interface AssociateSourceToS3TableIntegrationResponse {
  identifier?: string;
}
export type ExportTaskId = string;
export interface CancelExportTaskRequest {
  taskId: string;
}
export interface CancelExportTaskResponse {}
export type ImportId = string;
export interface CancelImportTaskRequest {
  importId: string;
}
export type StoredBytes = number;
export interface ImportStatistics {
  bytesImported?: number;
}
export type ImportStatus =
  | "IN_PROGRESS"
  | "CANCELLED"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export interface CancelImportTaskResponse {
  importId?: string;
  importStatistics?: ImportStatistics;
  importStatus?: ImportStatus;
  creationTime?: number;
  lastUpdatedTime?: number;
}
export type DeliverySourceName = string;
export type FieldHeader = string;
export type RecordFields = string[];
export type FieldDelimiter = string;
export type DeliverySuffixPath = string;
export interface S3DeliveryConfiguration {
  suffixPath?: string;
  enableHiveCompatiblePath?: boolean;
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateDeliveryRequest {
  deliverySourceName: string;
  deliveryDestinationArn: string;
  recordFields?: string[];
  fieldDelimiter?: string;
  s3DeliveryConfiguration?: S3DeliveryConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type DeliveryId = string;
export type DeliveryDestinationType =
  | "S3"
  | "CWL"
  | "FH"
  | "XRAY"
  | (string & {});
export interface Delivery {
  id?: string;
  arn?: string;
  deliverySourceName?: string;
  deliveryDestinationArn?: string;
  deliveryDestinationType?: DeliveryDestinationType;
  recordFields?: string[];
  fieldDelimiter?: string;
  s3DeliveryConfiguration?: S3DeliveryConfiguration;
  tags?: { [key: string]: string | undefined };
}
export interface CreateDeliveryResponse {
  delivery?: Delivery;
}
export type ExportTaskName = string;
export type LogStreamName = string;
export type ExportDestinationBucket = string;
export type ExportDestinationPrefix = string;
export interface CreateExportTaskRequest {
  taskName?: string;
  logGroupName: string;
  logStreamNamePrefix?: string;
  from: number;
  to: number;
  destination: string;
  destinationPrefix?: string;
}
export interface CreateExportTaskResponse {
  taskId?: string;
}
export type RoleArn = string;
export interface ImportFilter {
  startEventTime?: number;
  endEventTime?: number;
}
export interface CreateImportTaskRequest {
  importSourceArn: string;
  importRoleArn: string;
  importFilter?: ImportFilter;
}
export interface CreateImportTaskResponse {
  importId?: string;
  importDestinationArn?: string;
  creationTime?: number;
}
export type LogGroupArn = string;
export type LogGroupArnList = string[];
export type DetectorName = string;
export type EvaluationFrequency =
  | "ONE_MIN"
  | "FIVE_MIN"
  | "TEN_MIN"
  | "FIFTEEN_MIN"
  | "THIRTY_MIN"
  | "ONE_HOUR"
  | (string & {});
export type FilterPattern = string;
export type DetectorKmsKeyArn = string;
export type AnomalyVisibilityTime = number;
export interface CreateLogAnomalyDetectorRequest {
  logGroupArnList: string[];
  detectorName?: string;
  evaluationFrequency?: EvaluationFrequency;
  filterPattern?: string;
  kmsKeyId?: string;
  anomalyVisibilityTime?: number;
  tags?: { [key: string]: string | undefined };
}
export type AnomalyDetectorArn = string;
export interface CreateLogAnomalyDetectorResponse {
  anomalyDetectorArn?: string;
}
export type LogGroupClass =
  | "STANDARD"
  | "INFREQUENT_ACCESS"
  | "DELIVERY"
  | (string & {});
export type DeletionProtectionEnabled = boolean;
export interface CreateLogGroupRequest {
  logGroupName: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  logGroupClass?: LogGroupClass;
  deletionProtectionEnabled?: boolean;
}
export interface CreateLogGroupResponse {}
export interface CreateLogStreamRequest {
  logGroupName: string;
  logStreamName: string;
}
export interface CreateLogStreamResponse {}
export type LookupTableName = string;
export type LookupTableDescription = string;
export type TableBody = string;
export type QueryId = string;
export interface CreateLookupTableRequest {
  lookupTableName: string;
  description?: string;
  tableBody?: string;
  queryId?: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateLookupTableResponse {
  lookupTableArn?: string;
  createdAt?: number;
}
export type ScheduledQueryName = string;
export type ScheduledQueryDescription = string;
export type QueryLanguage = "CWLI" | "SQL" | "PPL" | (string & {});
export type QueryString = string;
export type LogGroupIdentifier = string;
export type ScheduledQueryLogGroupIdentifiers = string[];
export type ScheduleExpression = string;
export type ScheduleTimezone = string;
export type StartTimeOffset = number;
export type EndTimeOffset = number;
export type S3Uri = string;
export type AccountId = string;
export interface S3Configuration {
  destinationIdentifier: string;
  roleArn: string;
  ownerAccountId?: string;
  kmsKeyId?: string;
}
export interface LookupTableConfiguration {
  tableName: string;
  roleArn: string;
  description?: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
}
export interface DestinationConfiguration {
  s3Configuration?: S3Configuration;
  lookupTableConfiguration?: LookupTableConfiguration;
}
export type ScheduledQueryState = "ENABLED" | "DISABLED" | (string & {});
export interface CreateScheduledQueryRequest {
  name: string;
  description?: string;
  queryLanguage: QueryLanguage;
  queryString: string;
  logGroupIdentifiers?: string[];
  scheduleExpression: string;
  timezone?: string;
  startTimeOffset?: number;
  endTimeOffset?: number;
  destinationConfiguration?: DestinationConfiguration;
  scheduleStartTime?: number;
  scheduleEndTime?: number;
  executionRoleArn: string;
  state?: ScheduledQueryState;
  tags?: { [key: string]: string | undefined };
}
export interface CreateScheduledQueryResponse {
  scheduledQueryArn?: string;
  state?: ScheduledQueryState;
}
export type PolicyName = string;
export type PolicyType =
  | "DATA_PROTECTION_POLICY"
  | "SUBSCRIPTION_FILTER_POLICY"
  | "FIELD_INDEX_POLICY"
  | "TRANSFORMER_POLICY"
  | "METRIC_EXTRACTION_POLICY"
  | (string & {});
export interface DeleteAccountPolicyRequest {
  policyName: string;
  policyType: PolicyType;
}
export interface DeleteAccountPolicyResponse {}
export interface DeleteDataProtectionPolicyRequest {
  logGroupIdentifier: string;
}
export interface DeleteDataProtectionPolicyResponse {}
export interface DeleteDeliveryRequest {
  id: string;
}
export interface DeleteDeliveryResponse {}
export type DeliveryDestinationName = string;
export interface DeleteDeliveryDestinationRequest {
  name: string;
}
export interface DeleteDeliveryDestinationResponse {}
export interface DeleteDeliveryDestinationPolicyRequest {
  deliveryDestinationName: string;
}
export interface DeleteDeliveryDestinationPolicyResponse {}
export interface DeleteDeliverySourceRequest {
  name: string;
}
export interface DeleteDeliverySourceResponse {}
export type DestinationName = string;
export interface DeleteDestinationRequest {
  destinationName: string;
}
export interface DeleteDestinationResponse {}
export interface DeleteIndexPolicyRequest {
  logGroupIdentifier: string;
}
export interface DeleteIndexPolicyResponse {}
export type IntegrationName = string;
export type Force = boolean;
export interface DeleteIntegrationRequest {
  integrationName: string;
  force?: boolean;
}
export interface DeleteIntegrationResponse {}
export interface DeleteLogAnomalyDetectorRequest {
  anomalyDetectorArn: string;
}
export interface DeleteLogAnomalyDetectorResponse {}
export interface DeleteLogGroupRequest {
  logGroupName: string;
}
export interface DeleteLogGroupResponse {}
export interface DeleteLogStreamRequest {
  logGroupName: string;
  logStreamName: string;
}
export interface DeleteLogStreamResponse {}
export interface DeleteLookupTableRequest {
  lookupTableArn: string;
}
export interface DeleteLookupTableResponse {}
export type FilterName = string;
export interface DeleteMetricFilterRequest {
  logGroupName: string;
  filterName: string;
}
export interface DeleteMetricFilterResponse {}
export interface DeleteQueryDefinitionRequest {
  queryDefinitionId: string;
}
export type Success = boolean;
export interface DeleteQueryDefinitionResponse {
  success?: boolean;
}
export type ExpectedRevisionId = string;
export interface DeleteResourcePolicyRequest {
  policyName?: string;
  resourceArn?: string;
  expectedRevisionId?: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteRetentionPolicyRequest {
  logGroupName: string;
}
export interface DeleteRetentionPolicyResponse {}
export type ScheduledQueryIdentifier = string;
export interface DeleteScheduledQueryRequest {
  identifier: string;
}
export interface DeleteScheduledQueryResponse {}
export interface DeleteSubscriptionFilterRequest {
  logGroupName: string;
  filterName: string;
}
export interface DeleteSubscriptionFilterResponse {}
export type VpcEndpointId = string;
export interface DeleteSyslogConfigurationRequest {
  logGroupIdentifier: string;
  vpcEndpointId?: string;
}
export interface DeleteSyslogConfigurationResponse {}
export interface DeleteTransformerRequest {
  logGroupIdentifier: string;
}
export interface DeleteTransformerResponse {}
export type AccountIds = string[];
export type NextToken = string;
export interface DescribeAccountPoliciesRequest {
  policyType: PolicyType;
  policyName?: string;
  accountIdentifiers?: string[];
  nextToken?: string;
}
export type AccountPolicyDocument = string;
export type Scope = "ALL" | (string & {});
export type SelectionCriteria = string;
export interface AccountPolicy {
  policyName?: string;
  policyDocument?: string;
  lastUpdatedTime?: number;
  policyType?: PolicyType;
  scope?: Scope;
  selectionCriteria?: string;
  accountId?: string;
}
export type AccountPolicies = AccountPolicy[];
export interface DescribeAccountPoliciesResponse {
  accountPolicies?: AccountPolicy[];
  nextToken?: string;
}
export type Service = string;
export type LogType = string;
export type LogTypes = string[];
export type ResourceType = string;
export type ResourceTypes = string[];
export type DeliveryDestinationTypes = DeliveryDestinationType[];
export type DescribeLimit = number;
export interface DescribeConfigurationTemplatesRequest {
  service?: string;
  logTypes?: string[];
  resourceTypes?: string[];
  deliveryDestinationTypes?: DeliveryDestinationType[];
  nextToken?: string;
  limit?: number;
}
export interface ConfigurationTemplateDeliveryConfigValues {
  recordFields?: string[];
  fieldDelimiter?: string;
  s3DeliveryConfiguration?: S3DeliveryConfiguration;
}
export interface RecordField {
  name?: string;
  mandatory?: boolean;
}
export type AllowedFields = RecordField[];
export type OutputFormat =
  | "json"
  | "plain"
  | "w3c"
  | "raw"
  | "parquet"
  | (string & {});
export type OutputFormats = OutputFormat[];
export type AllowedActionForAllowVendedLogsDeliveryForResource = string;
export type AllowedFieldDelimiters = string[];
export type DeliverySourceConfigurationSchemaField = string;
export type DeliverySourceConfigurationSchemaValueType =
  | "string"
  | "boolean"
  | "int"
  | "double"
  | "long"
  | (string & {});
export type DeliverySourceConfigurationSupportedValues = string[];
export type DeliverySourceConfigurationNumericValue = number;
export interface DeliverySourceConfigurationSchema {
  keyName: string;
  valueType: DeliverySourceConfigurationSchemaValueType;
  defaultValue: string;
  supportedValues?: string[];
  minValue?: number;
  maxValue?: number;
}
export type DeliverySourceConfigurationSchemas =
  DeliverySourceConfigurationSchema[];
export type S3TablesDatasourceName = string;
export type S3TablesDatasourceType = string;
export interface S3TablesIntegration {
  datasourceName?: string;
  datasourceType?: string;
}
export interface ConfigurationTemplate {
  service?: string;
  logType?: string;
  resourceType?: string;
  deliveryDestinationType?: DeliveryDestinationType;
  defaultDeliveryConfigValues?: ConfigurationTemplateDeliveryConfigValues;
  allowedFields?: RecordField[];
  allowedOutputFormats?: OutputFormat[];
  allowedActionForAllowVendedLogsDeliveryForResource?: string;
  allowedFieldDelimiters?: string[];
  allowedSuffixPathFields?: string[];
  deliverySourceConfiguration?: DeliverySourceConfigurationSchema[];
  s3TablesIntegration?: S3TablesIntegration;
}
export type ConfigurationTemplates = ConfigurationTemplate[];
export interface DescribeConfigurationTemplatesResponse {
  configurationTemplates?: ConfigurationTemplate[];
  nextToken?: string;
}
export interface DescribeDeliveriesRequest {
  nextToken?: string;
  limit?: number;
}
export type Deliveries = Delivery[];
export interface DescribeDeliveriesResponse {
  deliveries?: Delivery[];
  nextToken?: string;
}
export interface DescribeDeliveryDestinationsRequest {
  nextToken?: string;
  limit?: number;
}
export interface DeliveryDestinationConfiguration {
  destinationResourceArn: string;
}
export interface DeliveryDestination {
  name?: string;
  arn?: string;
  deliveryDestinationType?: DeliveryDestinationType;
  outputFormat?: OutputFormat;
  deliveryDestinationConfiguration?: DeliveryDestinationConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type DeliveryDestinations = DeliveryDestination[];
export interface DescribeDeliveryDestinationsResponse {
  deliveryDestinations?: DeliveryDestination[];
  nextToken?: string;
}
export interface DescribeDeliverySourcesRequest {
  nextToken?: string;
  limit?: number;
}
export type ResourceArns = string[];
export type DeliverySourceConfigurationKey = string;
export type DeliverySourceConfigurationValue = string;
export type DeliverySourceConfiguration = { [key: string]: string | undefined };
export type DeliverySourceStatus = "ACTIVE" | "INACTIVE" | (string & {});
export type DeliverySourceStatusReason = "RESOURCE_DELETED" | (string & {});
export interface DeliverySource {
  name?: string;
  arn?: string;
  resourceArns?: string[];
  service?: string;
  logType?: string;
  tags?: { [key: string]: string | undefined };
  deliverySourceConfiguration?: { [key: string]: string | undefined };
  status?: DeliverySourceStatus;
  statusReason?: DeliverySourceStatusReason;
}
export type DeliverySources = DeliverySource[];
export interface DescribeDeliverySourcesResponse {
  deliverySources?: DeliverySource[];
  nextToken?: string;
}
export interface DescribeDestinationsRequest {
  DestinationNamePrefix?: string;
  nextToken?: string;
  limit?: number;
}
export type TargetArn = string;
export type AccessPolicy = string;
export interface Destination {
  destinationName?: string;
  targetArn?: string;
  roleArn?: string;
  accessPolicy?: string;
  arn?: string;
  creationTime?: number;
}
export type Destinations = Destination[];
export interface DescribeDestinationsResponse {
  destinations?: Destination[];
  nextToken?: string;
}
export type ExportTaskStatusCode =
  | "CANCELLED"
  | "COMPLETED"
  | "FAILED"
  | "PENDING"
  | "PENDING_CANCEL"
  | "RUNNING"
  | (string & {});
export interface DescribeExportTasksRequest {
  taskId?: string;
  statusCode?: ExportTaskStatusCode;
  nextToken?: string;
  limit?: number;
}
export type ExportTaskStatusMessage = string;
export interface ExportTaskStatus {
  code?: ExportTaskStatusCode;
  message?: string;
}
export interface ExportTaskExecutionInfo {
  creationTime?: number;
  completionTime?: number;
}
export interface ExportTask {
  taskId?: string;
  taskName?: string;
  logGroupName?: string;
  from?: number;
  to?: number;
  destination?: string;
  destinationPrefix?: string;
  status?: ExportTaskStatus;
  executionInfo?: ExportTaskExecutionInfo;
}
export type ExportTasks = ExportTask[];
export interface DescribeExportTasksResponse {
  exportTasks?: ExportTask[];
  nextToken?: string;
}
export type DescribeFieldIndexesLogGroupIdentifiers = string[];
export type IndexCategory =
  | "DEFAULT"
  | "CUSTOM"
  | "AUTO"
  | "INACTIVE"
  | (string & {});
export type IndexCategories = IndexCategory[];
export interface DescribeFieldIndexesRequest {
  logGroupIdentifiers: string[];
  indexCategories?: IndexCategory[];
  nextToken?: string;
}
export type FieldIndexName = string;
export type IndexType = "FACET" | "FIELD_INDEX" | (string & {});
export interface FieldIndex {
  logGroupIdentifier?: string;
  fieldIndexName?: string;
  lastScanTime?: number;
  firstEventTime?: number;
  lastEventTime?: number;
  type?: IndexType;
  indexCategory?: IndexCategory;
}
export type FieldIndexes = FieldIndex[];
export interface DescribeFieldIndexesResponse {
  fieldIndexes?: FieldIndex[];
  nextToken?: string;
}
export type ImportStatusList = ImportStatus[];
export interface DescribeImportTaskBatchesRequest {
  importId: string;
  batchImportStatus?: ImportStatus[];
  limit?: number;
  nextToken?: string;
}
export type BatchId = string;
export type ErrorMessage = string;
export interface ImportBatch {
  batchId: string;
  status: ImportStatus;
  errorMessage?: string;
}
export type ImportBatchList = ImportBatch[];
export interface DescribeImportTaskBatchesResponse {
  importSourceArn?: string;
  importId?: string;
  importBatches?: ImportBatch[];
  nextToken?: string;
}
export interface DescribeImportTasksRequest {
  importId?: string;
  importStatus?: ImportStatus;
  importSourceArn?: string;
  limit?: number;
  nextToken?: string;
}
export interface Import {
  importId?: string;
  importSourceArn?: string;
  importStatus?: ImportStatus;
  importDestinationArn?: string;
  importStatistics?: ImportStatistics;
  importFilter?: ImportFilter;
  creationTime?: number;
  lastUpdatedTime?: number;
  errorMessage?: string;
}
export type ImportList = Import[];
export interface DescribeImportTasksResponse {
  imports?: Import[];
  nextToken?: string;
}
export type DescribeIndexPoliciesLogGroupIdentifiers = string[];
export interface DescribeIndexPoliciesRequest {
  logGroupIdentifiers: string[];
  nextToken?: string;
}
export type PolicyDocument = string;
export type IndexSource = "ACCOUNT" | "LOG_GROUP" | (string & {});
export interface IndexPolicy {
  logGroupIdentifier?: string;
  lastUpdateTime?: number;
  policyDocument?: string;
  policyName?: string;
  source?: IndexSource;
}
export type IndexPolicies = IndexPolicy[];
export interface DescribeIndexPoliciesResponse {
  indexPolicies?: IndexPolicy[];
  nextToken?: string;
}
export type LogGroupNamePattern = string;
export type IncludeLinkedAccounts = boolean;
export type DescribeLogGroupsLogGroupIdentifiers = string[];
export interface DescribeLogGroupsRequest {
  accountIdentifiers?: string[];
  logGroupNamePrefix?: string;
  logGroupNamePattern?: string;
  nextToken?: string;
  limit?: number;
  includeLinkedAccounts?: boolean;
  logGroupClass?: LogGroupClass;
  logGroupIdentifiers?: string[];
}
export type Days = number;
export type FilterCount = number;
export type DataProtectionStatus =
  | "ACTIVATED"
  | "DELETED"
  | "ARCHIVED"
  | "DISABLED"
  | (string & {});
export type InheritedProperty = "ACCOUNT_DATA_PROTECTION" | (string & {});
export type InheritedProperties = InheritedProperty[];
export type BearerTokenAuthenticationEnabled = boolean;
export interface LogGroup {
  logGroupName?: string;
  creationTime?: number;
  retentionInDays?: number;
  metricFilterCount?: number;
  arn?: string;
  storedBytes?: number;
  kmsKeyId?: string;
  dataProtectionStatus?: DataProtectionStatus;
  inheritedProperties?: InheritedProperty[];
  logGroupClass?: LogGroupClass;
  logGroupArn?: string;
  deletionProtectionEnabled?: boolean;
  bearerTokenAuthenticationEnabled?: boolean;
}
export type LogGroups = LogGroup[];
export interface DescribeLogGroupsResponse {
  logGroups?: LogGroup[];
  nextToken?: string;
}
export type OrderBy = "LogStreamName" | "LastEventTime" | (string & {});
export type Descending = boolean;
export interface DescribeLogStreamsRequest {
  logGroupName?: string;
  logGroupIdentifier?: string;
  logStreamNamePrefix?: string;
  orderBy?: OrderBy;
  descending?: boolean;
  nextToken?: string;
  limit?: number;
}
export type SequenceToken = string;
export interface LogStream {
  logStreamName?: string;
  creationTime?: number;
  firstEventTimestamp?: number;
  lastEventTimestamp?: number;
  lastIngestionTime?: number;
  uploadSequenceToken?: string;
  arn?: string;
  storedBytes?: number;
}
export type LogStreams = LogStream[];
export interface DescribeLogStreamsResponse {
  logStreams?: LogStream[];
  nextToken?: string;
}
export type DescribeLookupTablesMaxResults = number;
export interface DescribeLookupTablesRequest {
  lookupTableNamePrefix?: string;
  maxResults?: number;
  nextToken?: string;
}
export type TableFields = string[];
export type RecordsCount = number;
export interface LookupTable {
  lookupTableArn?: string;
  lookupTableName?: string;
  description?: string;
  tableFields?: string[];
  recordsCount?: number;
  sizeBytes?: number;
  lastUpdatedTime?: number;
  kmsKeyId?: string;
}
export type LookupTables = LookupTable[];
export interface DescribeLookupTablesResponse {
  lookupTables?: LookupTable[];
  nextToken?: string;
}
export type MetricName = string;
export type MetricNamespace = string;
export interface DescribeMetricFiltersRequest {
  logGroupName?: string;
  filterNamePrefix?: string;
  nextToken?: string;
  limit?: number;
  metricName?: string;
  metricNamespace?: string;
}
export type MetricValue = string;
export type DefaultValue = number;
export type DimensionsKey = string;
export type DimensionsValue = string;
export type Dimensions = { [key: string]: string | undefined };
export type StandardUnit =
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Count"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | "None"
  | (string & {});
export interface MetricTransformation {
  metricName: string;
  metricNamespace: string;
  metricValue: string;
  defaultValue?: number;
  dimensions?: { [key: string]: string | undefined };
  unit?: StandardUnit;
}
export type MetricTransformations = MetricTransformation[];
export type ApplyOnTransformedLogs = boolean;
export type FieldSelectionCriteria = string;
export type SystemField = string;
export type EmitSystemFields = string[];
export interface MetricFilter {
  filterName?: string;
  filterPattern?: string;
  metricTransformations?: MetricTransformation[];
  creationTime?: number;
  logGroupName?: string;
  applyOnTransformedLogs?: boolean;
  fieldSelectionCriteria?: string;
  emitSystemFieldDimensions?: string[];
}
export type MetricFilters = MetricFilter[];
export interface DescribeMetricFiltersResponse {
  metricFilters?: MetricFilter[];
  nextToken?: string;
}
export type QueryStatus =
  | "Scheduled"
  | "Running"
  | "Complete"
  | "Failed"
  | "Cancelled"
  | "Timeout"
  | "Unknown"
  | (string & {});
export type DescribeQueriesMaxResults = number;
export interface DescribeQueriesRequest {
  logGroupName?: string;
  status?: QueryStatus;
  maxResults?: number;
  nextToken?: string;
  queryLanguage?: QueryLanguage;
}
export type QueryDuration = number;
export type BytesScannedValue = number;
export type UserIdentity = string;
export interface QueryInfo {
  queryLanguage?: QueryLanguage;
  queryId?: string;
  queryString?: string;
  status?: QueryStatus;
  createTime?: number;
  logGroupName?: string;
  queryDuration?: number;
  bytesScanned?: number;
  userIdentity?: string;
}
export type QueryInfoList = QueryInfo[];
export interface DescribeQueriesResponse {
  queries?: QueryInfo[];
  nextToken?: string;
}
export type QueryDefinitionName = string;
export type QueryListMaxResults = number;
export interface DescribeQueryDefinitionsRequest {
  queryLanguage?: QueryLanguage;
  queryDefinitionNamePrefix?: string;
  maxResults?: number;
  nextToken?: string;
}
export type QueryDefinitionString = string;
export type LogGroupNames = string[];
export type QueryParameterName = string;
export type QueryParameterDefaultValue = string;
export type QueryParameterDescription = string;
export interface QueryParameter {
  name: string;
  defaultValue?: string;
  description?: string;
}
export type QueryParameterList = QueryParameter[];
export interface QueryDefinition {
  queryLanguage?: QueryLanguage;
  queryDefinitionId?: string;
  name?: string;
  queryString?: string;
  lastModified?: number;
  logGroupNames?: string[];
  parameters?: QueryParameter[];
}
export type QueryDefinitionList = QueryDefinition[];
export interface DescribeQueryDefinitionsResponse {
  queryDefinitions?: QueryDefinition[];
  nextToken?: string;
}
export type PolicyScope = "ACCOUNT" | "RESOURCE" | (string & {});
export interface DescribeResourcePoliciesRequest {
  nextToken?: string;
  limit?: number;
  resourceArn?: string;
  policyScope?: PolicyScope;
}
export interface ResourcePolicy {
  policyName?: string;
  policyDocument?: string;
  lastUpdatedTime?: number;
  policyScope?: PolicyScope;
  resourceArn?: string;
  revisionId?: string;
}
export type ResourcePolicies = ResourcePolicy[];
export interface DescribeResourcePoliciesResponse {
  resourcePolicies?: ResourcePolicy[];
  nextToken?: string;
}
export interface DescribeSubscriptionFiltersRequest {
  logGroupName: string;
  filterNamePrefix?: string;
  nextToken?: string;
  limit?: number;
}
export type DestinationArn = string;
export type Distribution = "Random" | "ByLogStream" | (string & {});
export interface SubscriptionFilter {
  filterName?: string;
  logGroupName?: string;
  filterPattern?: string;
  destinationArn?: string;
  roleArn?: string;
  distribution?: Distribution;
  applyOnTransformedLogs?: boolean;
  creationTime?: number;
  fieldSelectionCriteria?: string;
  emitSystemFields?: string[];
}
export type SubscriptionFilters = SubscriptionFilter[];
export interface DescribeSubscriptionFiltersResponse {
  subscriptionFilters?: SubscriptionFilter[];
  nextToken?: string;
}
export interface DisassociateKmsKeyRequest {
  logGroupName?: string;
  resourceIdentifier?: string;
}
export interface DisassociateKmsKeyResponse {}
export interface DisassociateSourceFromS3TableIntegrationRequest {
  identifier: string;
}
export interface DisassociateSourceFromS3TableIntegrationResponse {
  identifier?: string;
}
export type InputLogStreamNames = string[];
export type EventsLimit = number;
export type StartFromHead = boolean;
export type Interleaved = boolean;
export type Unmask = boolean;
export interface FilterLogEventsRequest {
  logGroupName?: string;
  logGroupIdentifier?: string;
  logStreamNames?: string[];
  logStreamNamePrefix?: string;
  startTime?: number;
  endTime?: number;
  filterPattern?: string;
  nextToken?: string;
  limit?: number;
  startFromHead?: boolean;
  interleaved?: boolean;
  unmask?: boolean;
}
export type EventMessage = string;
export type EventId = string;
export interface FilteredLogEvent {
  logStreamName?: string;
  timestamp?: number;
  message?: string;
  ingestionTime?: number;
  eventId?: string;
}
export type FilteredLogEvents = FilteredLogEvent[];
export type LogStreamSearchedCompletely = boolean;
export interface SearchedLogStream {
  logStreamName?: string;
  searchedCompletely?: boolean;
}
export type SearchedLogStreams = SearchedLogStream[];
export interface FilterLogEventsResponse {
  events?: FilteredLogEvent[];
  searchedLogStreams?: SearchedLogStream[];
  nextToken?: string;
}
export interface GetDataProtectionPolicyRequest {
  logGroupIdentifier: string;
}
export type DataProtectionPolicyDocument = string;
export interface GetDataProtectionPolicyResponse {
  logGroupIdentifier?: string;
  policyDocument?: string;
  lastUpdatedTime?: number;
}
export interface GetDeliveryRequest {
  id: string;
}
export interface GetDeliveryResponse {
  delivery?: Delivery;
}
export interface GetDeliveryDestinationRequest {
  name: string;
}
export interface GetDeliveryDestinationResponse {
  deliveryDestination?: DeliveryDestination;
}
export interface GetDeliveryDestinationPolicyRequest {
  deliveryDestinationName: string;
}
export type DeliveryDestinationPolicy = string;
export interface Policy {
  deliveryDestinationPolicy?: string;
}
export interface GetDeliveryDestinationPolicyResponse {
  policy?: Policy;
}
export interface GetDeliverySourceRequest {
  name: string;
}
export interface GetDeliverySourceResponse {
  deliverySource?: DeliverySource;
}
export interface GetIntegrationRequest {
  integrationName: string;
}
export type IntegrationType = "OPENSEARCH" | (string & {});
export type IntegrationStatus =
  | "PROVISIONING"
  | "ACTIVE"
  | "FAILED"
  | (string & {});
export type OpenSearchDataSourceName = string;
export type OpenSearchResourceStatusType =
  | "ACTIVE"
  | "NOT_FOUND"
  | "ERROR"
  | (string & {});
export type IntegrationStatusMessage = string;
export interface OpenSearchResourceStatus {
  status?: OpenSearchResourceStatusType;
  statusMessage?: string;
}
export interface OpenSearchDataSource {
  dataSourceName?: string;
  status?: OpenSearchResourceStatus;
}
export type OpenSearchApplicationEndpoint = string;
export type OpenSearchApplicationId = string;
export interface OpenSearchApplication {
  applicationEndpoint?: string;
  applicationArn?: string;
  applicationId?: string;
  status?: OpenSearchResourceStatus;
}
export type OpenSearchCollectionEndpoint = string;
export interface OpenSearchCollection {
  collectionEndpoint?: string;
  collectionArn?: string;
  status?: OpenSearchResourceStatus;
}
export type OpenSearchWorkspaceId = string;
export interface OpenSearchWorkspace {
  workspaceId?: string;
  status?: OpenSearchResourceStatus;
}
export type OpenSearchPolicyName = string;
export interface OpenSearchEncryptionPolicy {
  policyName?: string;
  status?: OpenSearchResourceStatus;
}
export interface OpenSearchNetworkPolicy {
  policyName?: string;
  status?: OpenSearchResourceStatus;
}
export interface OpenSearchDataAccessPolicy {
  policyName?: string;
  status?: OpenSearchResourceStatus;
}
export interface OpenSearchLifecyclePolicy {
  policyName?: string;
  status?: OpenSearchResourceStatus;
}
export interface OpenSearchIntegrationDetails {
  dataSource?: OpenSearchDataSource;
  application?: OpenSearchApplication;
  collection?: OpenSearchCollection;
  workspace?: OpenSearchWorkspace;
  encryptionPolicy?: OpenSearchEncryptionPolicy;
  networkPolicy?: OpenSearchNetworkPolicy;
  accessPolicy?: OpenSearchDataAccessPolicy;
  lifecyclePolicy?: OpenSearchLifecyclePolicy;
}
export type IntegrationDetails = {
  openSearchIntegrationDetails: OpenSearchIntegrationDetails;
};
export interface GetIntegrationResponse {
  integrationName?: string;
  integrationType?: IntegrationType;
  integrationStatus?: IntegrationStatus;
  integrationDetails?: IntegrationDetails;
}
export interface GetLogAnomalyDetectorRequest {
  anomalyDetectorArn: string;
}
export type AnomalyDetectorStatus =
  | "INITIALIZING"
  | "TRAINING"
  | "ANALYZING"
  | "FAILED"
  | "DELETED"
  | "PAUSED"
  | (string & {});
export type EpochMillis = number;
export interface GetLogAnomalyDetectorResponse {
  detectorName?: string;
  logGroupArnList?: string[];
  evaluationFrequency?: EvaluationFrequency;
  filterPattern?: string;
  anomalyDetectorStatus?: AnomalyDetectorStatus;
  kmsKeyId?: string;
  creationTimeStamp?: number;
  lastModifiedTimeStamp?: number;
  anomalyVisibilityTime?: number;
}
export interface GetLogEventsRequest {
  logGroupName?: string;
  logGroupIdentifier?: string;
  logStreamName: string;
  startTime?: number;
  endTime?: number;
  nextToken?: string;
  limit?: number;
  startFromHead?: boolean;
  unmask?: boolean;
}
export interface OutputLogEvent {
  timestamp?: number;
  message?: string;
  ingestionTime?: number;
}
export type OutputLogEvents = OutputLogEvent[];
export interface GetLogEventsResponse {
  events?: OutputLogEvent[];
  nextForwardToken?: string;
  nextBackwardToken?: string;
}
export interface GetLogFieldsRequest {
  dataSourceName: string;
  dataSourceType: string;
}
export type LogFieldName = string;
export type DataType = string;
export interface LogFieldType {
  type?: string;
  element?: LogFieldType;
  fields?: LogFieldsListItem[];
}
export interface LogFieldsListItem {
  logFieldName?: string;
  logFieldType?: LogFieldType;
}
export type LogFieldsList = LogFieldsListItem[];
export interface GetLogFieldsResponse {
  logFields?: LogFieldsListItem[];
}
export interface GetLogGroupFieldsRequest {
  logGroupName?: string;
  time?: number;
  logGroupIdentifier?: string;
}
export type Field = string;
export type Percentage = number;
export interface LogGroupField {
  name?: string;
  percent?: number;
}
export type LogGroupFieldList = LogGroupField[];
export interface GetLogGroupFieldsResponse {
  logGroupFields?: LogGroupField[];
}
export type LogObjectPointer = string;
export interface GetLogObjectRequest {
  unmask?: boolean;
  logObjectPointer: string;
}
export type Data = Uint8Array;
export interface FieldsData {
  data?: Uint8Array;
}
export type Message = string;
export interface InternalStreamingException {
  message?: string;
}
export type GetLogObjectResponseStream =
  | { fields: FieldsData; InternalStreamingException?: never }
  | { fields?: never; InternalStreamingException: InternalStreamingException };
export interface GetLogObjectResponse {
  fieldStream?: stream.Stream<GetLogObjectResponseStream, Error, never>;
}
export type LogRecordPointer = string;
export interface GetLogRecordRequest {
  logRecordPointer: string;
  unmask?: boolean;
}
export type Value = string;
export type LogRecord = { [key: string]: string | undefined };
export interface GetLogRecordResponse {
  logRecord?: { [key: string]: string | undefined };
}
export interface GetLookupTableRequest {
  lookupTableArn: string;
}
export interface GetLookupTableResponse {
  lookupTableArn?: string;
  lookupTableName?: string;
  description?: string;
  tableBody?: string;
  sizeBytes?: number;
  lastUpdatedTime?: number;
  kmsKeyId?: string;
}
export type GetQueryResultsNextToken = string;
export type GetQueryResultsMaxItems = number;
export interface GetQueryResultsRequest {
  queryId: string;
  nextToken?: string;
  maxItems?: number;
}
export interface ResultField {
  field?: string;
  value?: string;
}
export type ResultRows = ResultField[];
export type QueryResults = ResultField[][];
export type StatsValue = number;
export interface QueryStatistics {
  recordsMatched?: number;
  recordsScanned?: number;
  estimatedRecordsSkipped?: number;
  bytesScanned?: number;
  estimatedBytesSkipped?: number;
  logGroupsScanned?: number;
  resultCount?: number;
}
export type EncryptionKey = string;
export interface GetQueryResultsResponse {
  queryLanguage?: QueryLanguage;
  results?: ResultField[][];
  statistics?: QueryStatistics;
  status?: QueryStatus;
  encryptionKey?: string;
  nextToken?: string;
}
export interface GetScheduledQueryRequest {
  identifier: string;
}
export type ScheduleType = "CUSTOMER_MANAGED" | "AWS_MANAGED" | (string & {});
export type ExecutionStatus =
  | "Running"
  | "InvalidQuery"
  | "Complete"
  | "Failed"
  | "Timeout"
  | (string & {});
export interface GetScheduledQueryResponse {
  scheduledQueryArn?: string;
  name?: string;
  description?: string;
  queryLanguage?: QueryLanguage;
  queryString?: string;
  logGroupIdentifiers?: string[];
  scheduleExpression?: string;
  timezone?: string;
  startTimeOffset?: number;
  endTimeOffset?: number;
  destinationConfiguration?: DestinationConfiguration;
  state?: ScheduledQueryState;
  scheduleType?: ScheduleType;
  lastTriggeredTime?: number;
  lastExecutionStatus?: ExecutionStatus;
  scheduleStartTime?: number;
  scheduleEndTime?: number;
  executionRoleArn?: string;
  creationTime?: number;
  lastUpdatedTime?: number;
}
export type ExecutionStatusList = ExecutionStatus[];
export type GetScheduledQueryHistoryMaxResults = number;
export interface GetScheduledQueryHistoryRequest {
  identifier: string;
  startTime: number;
  endTime: number;
  executionStatuses?: ExecutionStatus[];
  maxResults?: number;
  nextToken?: string;
}
export type ScheduledQueryDestinationType =
  | "S3"
  | "LOOKUP_TABLE"
  | (string & {});
export type ActionStatus =
  | "IN_PROGRESS"
  | "CLIENT_ERROR"
  | "FAILED"
  | "COMPLETE"
  | (string & {});
export interface ScheduledQueryDestination {
  destinationType?: ScheduledQueryDestinationType;
  destinationIdentifier?: string;
  status?: ActionStatus;
  processedIdentifier?: string;
  errorMessage?: string;
}
export type ScheduledQueryDestinationList = ScheduledQueryDestination[];
export interface TriggerHistoryRecord {
  queryId?: string;
  executionStatus?: ExecutionStatus;
  triggeredTimestamp?: number;
  errorMessage?: string;
  destinations?: ScheduledQueryDestination[];
}
export type TriggerHistoryRecordList = TriggerHistoryRecord[];
export interface GetScheduledQueryHistoryResponse {
  name?: string;
  scheduledQueryArn?: string;
  triggerHistory?: TriggerHistoryRecord[];
  nextToken?: string;
}
export interface GetStorageTierPolicyRequest {}
export type StorageTier = "STANDARD" | "INTELLIGENT_TIERING" | (string & {});
export interface GetStorageTierPolicyResponse {
  storageTier?: StorageTier;
  lastUpdatedTime?: number;
}
export interface GetTransformerRequest {
  logGroupIdentifier: string;
}
export type Key = string;
export type AddKeyValue = string;
export type OverwriteIfExists = boolean;
export interface AddKeyEntry {
  key: string;
  value: string;
  overwriteIfExists?: boolean;
}
export type AddKeyEntries = AddKeyEntry[];
export interface AddKeys {
  entries: AddKeyEntry[];
}
export type Source = string;
export type Target = string;
export interface CopyValueEntry {
  source: string;
  target: string;
  overwriteIfExists?: boolean;
}
export type CopyValueEntries = CopyValueEntry[];
export interface CopyValue {
  entries: CopyValueEntry[];
}
export type QuoteCharacter = string;
export type Delimiter = string;
export type Column = string;
export type Columns = string[];
export type DestinationField = string;
export interface CSV {
  quoteCharacter?: string;
  delimiter?: string;
  columns?: string[];
  source?: string;
  destination?: string;
}
export type TargetFormat = string;
export type MatchPattern = string;
export type MatchPatterns = string[];
export type SourceTimezone = string;
export type TargetTimezone = string;
export type Locale = string;
export interface DateTimeConverter {
  source: string;
  target: string;
  targetFormat?: string;
  matchPatterns: string[];
  sourceTimezone?: string;
  targetTimezone?: string;
  locale?: string;
}
export type WithKey = string;
export type DeleteWithKeys = string[];
export interface DeleteKeys {
  withKeys: string[];
}
export type GrokMatch = string;
export interface Grok {
  source?: string;
  match: string;
}
export type ValueKey = string;
export type Flatten = boolean;
export type FlattenedElement = "first" | "last" | (string & {});
export interface ListToMap {
  source: string;
  key: string;
  valueKey?: string;
  target?: string;
  flatten?: boolean;
  flattenedElement?: FlattenedElement;
}
export type LowerCaseStringWithKeys = string[];
export interface LowerCaseString {
  withKeys: string[];
}
export interface MoveKeyEntry {
  source: string;
  target: string;
  overwriteIfExists?: boolean;
}
export type MoveKeyEntries = MoveKeyEntry[];
export interface MoveKeys {
  entries: MoveKeyEntry[];
}
export interface ParseCloudfront {
  source?: string;
}
export interface ParseJSON {
  source?: string;
  destination?: string;
}
export type ParserFieldDelimiter = string;
export type KeyValueDelimiter = string;
export type KeyPrefix = string;
export type NonMatchValue = string;
export interface ParseKeyValue {
  source?: string;
  destination?: string;
  fieldDelimiter?: string;
  keyValueDelimiter?: string;
  keyPrefix?: string;
  nonMatchValue?: string;
  overwriteIfExists?: boolean;
}
export interface ParseRoute53 {
  source?: string;
}
export type EventSource =
  | "CloudTrail"
  | "Route53Resolver"
  | "VPCFlow"
  | "EKSAudit"
  | "AWSWAF"
  | (string & {});
export type OCSFVersion = "V1.1" | "V1.5" | (string & {});
export type MappingVersion = string;
export interface ParseToOCSF {
  source?: string;
  eventSource: EventSource;
  ocsfVersion: OCSFVersion;
  mappingVersion?: string;
}
export interface ParsePostgres {
  source?: string;
}
export interface ParseVPC {
  source?: string;
}
export interface ParseWAF {
  source?: string;
}
export type RenameTo = string;
export interface RenameKeyEntry {
  key: string;
  renameTo: string;
  overwriteIfExists?: boolean;
}
export type RenameKeyEntries = RenameKeyEntry[];
export interface RenameKeys {
  entries: RenameKeyEntry[];
}
export type SplitStringDelimiter = string;
export interface SplitStringEntry {
  source: string;
  delimiter: string;
}
export type SplitStringEntries = SplitStringEntry[];
export interface SplitString {
  entries: SplitStringEntry[];
}
export type FromKey = string;
export type ToKey = string;
export interface SubstituteStringEntry {
  source: string;
  from: string;
  to: string;
}
export type SubstituteStringEntries = SubstituteStringEntry[];
export interface SubstituteString {
  entries: SubstituteStringEntry[];
}
export type TrimStringWithKeys = string[];
export interface TrimString {
  withKeys: string[];
}
export type Type = "boolean" | "integer" | "double" | "string" | (string & {});
export interface TypeConverterEntry {
  key: string;
  type: Type;
}
export type TypeConverterEntries = TypeConverterEntry[];
export interface TypeConverter {
  entries: TypeConverterEntry[];
}
export type UpperCaseStringWithKeys = string[];
export interface UpperCaseString {
  withKeys: string[];
}
export interface Processor {
  addKeys?: AddKeys;
  copyValue?: CopyValue;
  csv?: CSV;
  dateTimeConverter?: DateTimeConverter;
  deleteKeys?: DeleteKeys;
  grok?: Grok;
  listToMap?: ListToMap;
  lowerCaseString?: LowerCaseString;
  moveKeys?: MoveKeys;
  parseCloudfront?: ParseCloudfront;
  parseJSON?: ParseJSON;
  parseKeyValue?: ParseKeyValue;
  parseRoute53?: ParseRoute53;
  parseToOCSF?: ParseToOCSF;
  parsePostgres?: ParsePostgres;
  parseVPC?: ParseVPC;
  parseWAF?: ParseWAF;
  renameKeys?: RenameKeys;
  splitString?: SplitString;
  substituteString?: SubstituteString;
  trimString?: TrimString;
  typeConverter?: TypeConverter;
  upperCaseString?: UpperCaseString;
}
export type Processors = Processor[];
export interface GetTransformerResponse {
  logGroupIdentifier?: string;
  creationTime?: number;
  lastModifiedTime?: number;
  transformerConfig?: Processor[];
}
export type LogGroupNameRegexPattern = string;
export interface DataSourceFilter {
  name: string;
  type?: string;
}
export type DataSourceFilters = DataSourceFilter[];
export type ListAggregateLogGroupSummariesGroupBy =
  | "DATA_SOURCE_NAME_TYPE_AND_FORMAT"
  | "DATA_SOURCE_NAME_AND_TYPE"
  | (string & {});
export type ListLogGroupsRequestLimit = number;
export interface ListAggregateLogGroupSummariesRequest {
  accountIdentifiers?: string[];
  includeLinkedAccounts?: boolean;
  logGroupClass?: LogGroupClass;
  logGroupNamePattern?: string;
  dataSources?: DataSourceFilter[];
  groupBy: ListAggregateLogGroupSummariesGroupBy;
  nextToken?: string;
  limit?: number;
}
export type LogGroupCount = number;
export type GroupingIdentifierKey = string;
export type GroupingIdentifierValue = string;
export interface GroupingIdentifier {
  key?: string;
  value?: string;
}
export type GroupingIdentifiers = GroupingIdentifier[];
export interface AggregateLogGroupSummary {
  logGroupCount?: number;
  groupingIdentifiers?: GroupingIdentifier[];
}
export type AggregateLogGroupSummaries = AggregateLogGroupSummary[];
export interface ListAggregateLogGroupSummariesResponse {
  aggregateLogGroupSummaries?: AggregateLogGroupSummary[];
  nextToken?: string;
}
export type SuppressionState = "SUPPRESSED" | "UNSUPPRESSED" | (string & {});
export type ListAnomaliesLimit = number;
export interface ListAnomaliesRequest {
  anomalyDetectorArn?: string;
  suppressionState?: SuppressionState;
  limit?: number;
  nextToken?: string;
}
export type AnomalyId = string;
export type PatternId = string;
export type PatternString = string;
export type PatternRegex = string;
export type Priority = string;
export type Description = string;
export type State = "Active" | "Suppressed" | "Baseline" | (string & {});
export type Count = number;
export type Histogram = { [key: string]: number | undefined };
export interface LogEvent {
  timestamp?: number;
  message?: string;
}
export type LogSamples = LogEvent[];
export type DynamicTokenPosition = number;
export type TokenString = string;
export type TokenValue = number;
export type Enumerations = { [key: string]: number | undefined };
export type InferredTokenName = string;
export interface PatternToken {
  dynamicTokenPosition?: number;
  isDynamic?: boolean;
  tokenString?: string;
  enumerations?: { [key: string]: number | undefined };
  inferredTokenName?: string;
}
export type PatternTokens = PatternToken[];
export interface Anomaly {
  anomalyId: string;
  patternId: string;
  anomalyDetectorArn: string;
  patternString: string;
  patternRegex?: string;
  priority?: string;
  firstSeen: number;
  lastSeen: number;
  description: string;
  active: boolean;
  state: State;
  histogram: { [key: string]: number | undefined };
  logSamples: LogEvent[];
  patternTokens: PatternToken[];
  logGroupArnList: string[];
  suppressed?: boolean;
  suppressedDate?: number;
  suppressedUntil?: number;
  isPatternLevelSuppression?: boolean;
}
export type Anomalies = Anomaly[];
export interface ListAnomaliesResponse {
  anomalies?: Anomaly[];
  nextToken?: string;
}
export type IntegrationNamePrefix = string;
export interface ListIntegrationsRequest {
  integrationNamePrefix?: string;
  integrationType?: IntegrationType;
  integrationStatus?: IntegrationStatus;
}
export interface IntegrationSummary {
  integrationName?: string;
  integrationType?: IntegrationType;
  integrationStatus?: IntegrationStatus;
}
export type IntegrationSummaries = IntegrationSummary[];
export interface ListIntegrationsResponse {
  integrationSummaries?: IntegrationSummary[];
}
export type ListLogAnomalyDetectorsLimit = number;
export interface ListLogAnomalyDetectorsRequest {
  filterLogGroupArn?: string;
  limit?: number;
  nextToken?: string;
}
export interface AnomalyDetector {
  anomalyDetectorArn?: string;
  detectorName?: string;
  logGroupArnList?: string[];
  evaluationFrequency?: EvaluationFrequency;
  filterPattern?: string;
  anomalyDetectorStatus?: AnomalyDetectorStatus;
  kmsKeyId?: string;
  creationTimeStamp?: number;
  lastModifiedTimeStamp?: number;
  anomalyVisibilityTime?: number;
}
export type AnomalyDetectors = AnomalyDetector[];
export interface ListLogAnomalyDetectorsResponse {
  anomalyDetectors?: AnomalyDetector[];
  nextToken?: string;
}
export type ListLimit = number;
export type FieldIndexNames = string[];
export type TagFilterKey = string;
export type TagFilterValue = string;
export type TagFilterValues = string[];
export interface TagFilter {
  key: string;
  values?: string[];
}
export type TagFilters = TagFilter[];
export interface ListLogGroupsRequest {
  logGroupNamePattern?: string;
  logGroupClass?: LogGroupClass;
  includeLinkedAccounts?: boolean;
  accountIdentifiers?: string[];
  nextToken?: string;
  limit?: number;
  dataSources?: DataSourceFilter[];
  fieldIndexNames?: string[];
  logGroupTags?: TagFilter[];
}
export interface LogGroupSummary {
  logGroupName?: string;
  logGroupArn?: string;
  logGroupClass?: LogGroupClass;
}
export type LogGroupSummaries = LogGroupSummary[];
export interface ListLogGroupsResponse {
  logGroups?: LogGroupSummary[];
  nextToken?: string;
}
export type ListLogGroupsForQueryMaxResults = number;
export interface ListLogGroupsForQueryRequest {
  queryId: string;
  nextToken?: string;
  maxResults?: number;
}
export type LogGroupIdentifiers = string[];
export interface ListLogGroupsForQueryResponse {
  logGroupIdentifiers?: string[];
  nextToken?: string;
}
export type ListScheduledQueriesMaxResults = number;
export interface ListScheduledQueriesRequest {
  maxResults?: number;
  nextToken?: string;
  state?: ScheduledQueryState;
  scheduleType?: ScheduleType;
}
export interface ScheduledQuerySummary {
  scheduledQueryArn?: string;
  name?: string;
  state?: ScheduledQueryState;
  scheduleType?: ScheduleType;
  lastTriggeredTime?: number;
  lastExecutionStatus?: ExecutionStatus;
  scheduleExpression?: string;
  timezone?: string;
  destinationConfiguration?: DestinationConfiguration;
  creationTime?: number;
  lastUpdatedTime?: number;
}
export type ScheduledQuerySummaryList = ScheduledQuerySummary[];
export interface ListScheduledQueriesResponse {
  nextToken?: string;
  scheduledQueries?: ScheduledQuerySummary[];
}
export type ListSourcesForS3TableIntegrationMaxResults = number;
export interface ListSourcesForS3TableIntegrationRequest {
  integrationArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type S3TableIntegrationSourceStatus =
  | "ACTIVE"
  | "UNHEALTHY"
  | "FAILED"
  | "DATA_SOURCE_DELETE_IN_PROGRESS"
  | (string & {});
export type S3TableIntegrationSourceStatusReason = string;
export interface S3TableIntegrationSource {
  identifier?: string;
  dataSource?: DataSource;
  status?: S3TableIntegrationSourceStatus;
  statusReason?: string;
  createdTimeStamp?: number;
  parentSourceIdentifier?: string;
}
export type S3TableIntegrationSources = S3TableIntegrationSource[];
export interface ListSourcesForS3TableIntegrationResponse {
  sources?: S3TableIntegrationSource[];
  nextToken?: string;
}
export type ListSyslogConfigurationsMaxResults = number;
export interface ListSyslogConfigurationsRequest {
  logGroupIdentifier?: string;
  vpcEndpointId?: string;
  nextToken?: string;
  maxResults?: number;
}
export type SyslogSourceType = "VPCE" | (string & {});
export interface SyslogConfiguration {
  logGroupArn?: string;
  sourceType?: SyslogSourceType;
  vpcEndpointId?: string;
  createdAt?: number;
}
export type SyslogConfigurations = SyslogConfiguration[];
export interface ListSyslogConfigurationsResponse {
  syslogConfigurations?: SyslogConfiguration[];
  nextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListTagsLogGroupRequest {
  logGroupName: string;
}
export interface ListTagsLogGroupResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PutAccountPolicyRequest {
  policyName: string;
  policyDocument: string;
  policyType: PolicyType;
  scope?: Scope;
  selectionCriteria?: string;
}
export interface PutAccountPolicyResponse {
  accountPolicy?: AccountPolicy;
}
export interface PutBearerTokenAuthenticationRequest {
  logGroupIdentifier: string;
  bearerTokenAuthenticationEnabled: boolean;
}
export interface PutBearerTokenAuthenticationResponse {}
export interface PutDataProtectionPolicyRequest {
  logGroupIdentifier: string;
  policyDocument: string;
}
export interface PutDataProtectionPolicyResponse {
  logGroupIdentifier?: string;
  policyDocument?: string;
  lastUpdatedTime?: number;
}
export interface PutDeliveryDestinationRequest {
  name: string;
  outputFormat?: OutputFormat;
  deliveryDestinationConfiguration?: DeliveryDestinationConfiguration;
  deliveryDestinationType?: DeliveryDestinationType;
  tags?: { [key: string]: string | undefined };
}
export interface PutDeliveryDestinationResponse {
  deliveryDestination?: DeliveryDestination;
}
export interface PutDeliveryDestinationPolicyRequest {
  deliveryDestinationName: string;
  deliveryDestinationPolicy: string;
}
export interface PutDeliveryDestinationPolicyResponse {
  policy?: Policy;
}
export interface PutDeliverySourceRequest {
  name: string;
  resourceArn: string;
  logType: string;
  tags?: { [key: string]: string | undefined };
  deliverySourceConfiguration?: { [key: string]: string | undefined };
}
export interface PutDeliverySourceResponse {
  deliverySource?: DeliverySource;
}
export interface PutDestinationRequest {
  destinationName: string;
  targetArn: string;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
}
export interface PutDestinationResponse {
  destination?: Destination;
}
export type ForceUpdate = boolean;
export interface PutDestinationPolicyRequest {
  destinationName: string;
  accessPolicy: string;
  forceUpdate?: boolean;
}
export interface PutDestinationPolicyResponse {}
export interface PutIndexPolicyRequest {
  logGroupIdentifier: string;
  policyDocument: string;
}
export interface PutIndexPolicyResponse {
  indexPolicy?: IndexPolicy;
}
export type DashboardViewerPrincipals = string[];
export type CollectionRetentionDays = number;
export interface OpenSearchResourceConfig {
  kmsKeyArn?: string;
  dataSourceRoleArn: string;
  dashboardViewerPrincipals: string[];
  applicationArn?: string;
  retentionDays: number;
}
export type ResourceConfig = {
  openSearchResourceConfig: OpenSearchResourceConfig;
};
export interface PutIntegrationRequest {
  integrationName: string;
  resourceConfig: ResourceConfig;
  integrationType: IntegrationType;
}
export interface PutIntegrationResponse {
  integrationName?: string;
  integrationStatus?: IntegrationStatus;
}
export interface InputLogEvent {
  timestamp: number;
  message: string;
}
export type InputLogEvents = InputLogEvent[];
export type EntityKeyAttributesKey = string;
export type EntityKeyAttributesValue = string;
export type EntityKeyAttributes = { [key: string]: string | undefined };
export type EntityAttributesKey = string;
export type EntityAttributesValue = string;
export type EntityAttributes = { [key: string]: string | undefined };
export interface Entity {
  keyAttributes?: { [key: string]: string | undefined };
  attributes?: { [key: string]: string | undefined };
}
export interface PutLogEventsRequest {
  logGroupName: string;
  logStreamName: string;
  logEvents: InputLogEvent[];
  sequenceToken?: string;
  entity?: Entity;
}
export type LogEventIndex = number;
export interface RejectedLogEventsInfo {
  tooNewLogEventStartIndex?: number;
  tooOldLogEventEndIndex?: number;
  expiredLogEventEndIndex?: number;
}
export type EntityRejectionErrorType =
  | "InvalidEntity"
  | "InvalidTypeValue"
  | "InvalidKeyAttributes"
  | "InvalidAttributes"
  | "EntitySizeTooLarge"
  | "UnsupportedLogGroupType"
  | "MissingRequiredFields"
  | (string & {});
export interface RejectedEntityInfo {
  errorType: EntityRejectionErrorType;
}
export interface PutLogEventsResponse {
  nextSequenceToken?: string;
  rejectedLogEventsInfo?: RejectedLogEventsInfo;
  rejectedEntityInfo?: RejectedEntityInfo;
}
export interface PutLogGroupDeletionProtectionRequest {
  logGroupIdentifier: string;
  deletionProtectionEnabled: boolean;
}
export interface PutLogGroupDeletionProtectionResponse {}
export interface PutMetricFilterRequest {
  logGroupName: string;
  filterName: string;
  filterPattern: string;
  metricTransformations: MetricTransformation[];
  applyOnTransformedLogs?: boolean;
  fieldSelectionCriteria?: string;
  emitSystemFieldDimensions?: string[];
}
export interface PutMetricFilterResponse {}
export type ClientToken = string;
export interface PutQueryDefinitionRequest {
  queryLanguage?: QueryLanguage;
  name: string;
  queryDefinitionId?: string;
  logGroupNames?: string[];
  queryString: string;
  clientToken?: string;
  parameters?: QueryParameter[];
}
export interface PutQueryDefinitionResponse {
  queryDefinitionId?: string;
}
export interface PutResourcePolicyRequest {
  policyName?: string;
  policyDocument?: string;
  resourceArn?: string;
  expectedRevisionId?: string;
}
export interface PutResourcePolicyResponse {
  resourcePolicy?: ResourcePolicy;
  revisionId?: string;
}
export interface PutRetentionPolicyRequest {
  logGroupName: string;
  retentionInDays: number;
}
export interface PutRetentionPolicyResponse {}
export interface PutStorageTierPolicyRequest {
  storageTier: StorageTier;
}
export interface PutStorageTierPolicyResponse {
  storageTier?: StorageTier;
  lastUpdatedTime?: number;
}
export interface PutSubscriptionFilterRequest {
  logGroupName: string;
  filterName: string;
  filterPattern: string;
  destinationArn: string;
  roleArn?: string;
  distribution?: Distribution;
  applyOnTransformedLogs?: boolean;
  fieldSelectionCriteria?: string;
  emitSystemFields?: string[];
}
export interface PutSubscriptionFilterResponse {}
export interface PutSyslogConfigurationRequest {
  logGroupIdentifier: string;
  vpcEndpointId?: string;
}
export interface PutSyslogConfigurationResponse {}
export interface PutTransformerRequest {
  logGroupIdentifier: string;
  transformerConfig: Processor[];
}
export interface PutTransformerResponse {}
export type StartLiveTailLogGroupIdentifiers = string[];
export interface StartLiveTailRequest {
  logGroupIdentifiers: string[];
  logStreamNames?: string[];
  logStreamNamePrefixes?: string[];
  logEventFilterPattern?: string;
}
export type RequestId = string;
export type SessionId = string;
export interface LiveTailSessionStart {
  requestId?: string;
  sessionId?: string;
  logGroupIdentifiers?: string[];
  logStreamNames?: string[];
  logStreamNamePrefixes?: string[];
  logEventFilterPattern?: string;
}
export type IsSampled = boolean;
export interface LiveTailSessionMetadata {
  sampled?: boolean;
}
export interface LiveTailSessionLogEvent {
  logStreamName?: string;
  logGroupIdentifier?: string;
  message?: string;
  timestamp?: number;
  ingestionTime?: number;
}
export type LiveTailSessionResults = LiveTailSessionLogEvent[];
export interface LiveTailSessionUpdate {
  sessionMetadata?: LiveTailSessionMetadata;
  sessionResults?: LiveTailSessionLogEvent[];
}
export interface SessionTimeoutException {
  message?: string;
}
export interface SessionStreamingException {
  message?: string;
}
export type StartLiveTailResponseStream =
  | {
      sessionStart: LiveTailSessionStart;
      sessionUpdate?: never;
      SessionTimeoutException?: never;
      SessionStreamingException?: never;
    }
  | {
      sessionStart?: never;
      sessionUpdate: LiveTailSessionUpdate;
      SessionTimeoutException?: never;
      SessionStreamingException?: never;
    }
  | {
      sessionStart?: never;
      sessionUpdate?: never;
      SessionTimeoutException: SessionTimeoutException;
      SessionStreamingException?: never;
    }
  | {
      sessionStart?: never;
      sessionUpdate?: never;
      SessionTimeoutException?: never;
      SessionStreamingException: SessionStreamingException;
    };
export interface StartLiveTailResponse {
  responseStream?: stream.Stream<StartLiveTailResponseStream, Error, never>;
}
export type EventsLimitStartQuery = number;
export interface StartQueryRequest {
  queryLanguage?: QueryLanguage;
  logGroupName?: string;
  logGroupNames?: string[];
  logGroupIdentifiers?: string[];
  startTime: number;
  endTime: number;
  queryString: string;
  limit?: number;
}
export interface StartQueryResponse {
  queryId?: string;
}
export interface StopQueryRequest {
  queryId: string;
}
export interface StopQueryResponse {
  success?: boolean;
}
export interface TagLogGroupRequest {
  logGroupName: string;
  tags: { [key: string]: string | undefined };
}
export interface TagLogGroupResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TestEventMessages = string[];
export interface TestMetricFilterRequest {
  filterPattern: string;
  logEventMessages: string[];
}
export type EventNumber = number;
export type Token = string;
export type ExtractedValues = { [key: string]: string | undefined };
export interface MetricFilterMatchRecord {
  eventNumber?: number;
  eventMessage?: string;
  extractedValues?: { [key: string]: string | undefined };
}
export type MetricFilterMatches = MetricFilterMatchRecord[];
export interface TestMetricFilterResponse {
  matches?: MetricFilterMatchRecord[];
}
export interface TestTransformerRequest {
  transformerConfig: Processor[];
  logEventMessages: string[];
}
export type TransformedEventMessage = string;
export interface TransformedLogRecord {
  eventNumber?: number;
  eventMessage?: string;
  transformedEventMessage?: string;
}
export type TransformedLogs = TransformedLogRecord[];
export interface TestTransformerResponse {
  transformedLogs?: TransformedLogRecord[];
}
export type TagList = string[];
export interface UntagLogGroupRequest {
  logGroupName: string;
  tags: string[];
}
export interface UntagLogGroupResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type SuppressionType = "LIMITED" | "INFINITE" | (string & {});
export type SuppressionUnit = "SECONDS" | "MINUTES" | "HOURS" | (string & {});
export interface SuppressionPeriod {
  value?: number;
  suppressionUnit?: SuppressionUnit;
}
export type Baseline = boolean;
export interface UpdateAnomalyRequest {
  anomalyId?: string;
  patternId?: string;
  anomalyDetectorArn: string;
  suppressionType?: SuppressionType;
  suppressionPeriod?: SuppressionPeriod;
  baseline?: boolean;
}
export interface UpdateAnomalyResponse {}
export interface UpdateDeliveryConfigurationRequest {
  id: string;
  recordFields?: string[];
  fieldDelimiter?: string;
  s3DeliveryConfiguration?: S3DeliveryConfiguration;
}
export interface UpdateDeliveryConfigurationResponse {}
export interface UpdateLogAnomalyDetectorRequest {
  anomalyDetectorArn: string;
  evaluationFrequency?: EvaluationFrequency;
  filterPattern?: string;
  anomalyVisibilityTime?: number;
  enabled: boolean;
}
export interface UpdateLogAnomalyDetectorResponse {}
export interface UpdateLookupTableRequest {
  lookupTableArn: string;
  description?: string;
  tableBody?: string;
  queryId?: string;
  kmsKeyId?: string;
}
export interface UpdateLookupTableResponse {
  lookupTableArn?: string;
  lastUpdatedTime?: number;
}
export interface UpdateScheduledQueryRequest {
  identifier: string;
  description?: string;
  queryLanguage: QueryLanguage;
  queryString: string;
  logGroupIdentifiers?: string[];
  scheduleExpression: string;
  timezone?: string;
  startTimeOffset?: number;
  endTimeOffset?: number;
  destinationConfiguration?: DestinationConfiguration;
  scheduleStartTime?: number;
  scheduleEndTime?: number;
  executionRoleArn: string;
  state?: ScheduledQueryState;
}
export interface UpdateScheduledQueryResponse {
  scheduledQueryArn?: string;
  name?: string;
  description?: string;
  queryLanguage?: QueryLanguage;
  queryString?: string;
  logGroupIdentifiers?: string[];
  scheduleExpression?: string;
  timezone?: string;
  startTimeOffset?: number;
  endTimeOffset?: number;
  destinationConfiguration?: DestinationConfiguration;
  state?: ScheduledQueryState;
  scheduleType?: ScheduleType;
  lastTriggeredTime?: number;
  lastExecutionStatus?: ExecutionStatus;
  scheduleStartTime?: number;
  scheduleEndTime?: number;
  executionRoleArn?: string;
  creationTime?: number;
  lastUpdatedTime?: number;
}
export type QueryCharOffset = number;
export interface QueryCompileErrorLocation {
  startCharOffset?: number;
  endCharOffset?: number;
}
export interface QueryCompileError {
  location?: QueryCompileErrorLocation;
  message?: string;
}
export type AssociateKmsKeyError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Associates the specified KMS key with either one log group in the
 * account, or with all stored CloudWatch Logs query insights results in the
 * account.
 *
 * When you use `AssociateKmsKey`, you specify either the
 * `logGroupName` parameter or the `resourceIdentifier` parameter. You
 * can't specify both of those parameters in the same operation.
 *
 * - Specify the `logGroupName` parameter to cause log events ingested into that
 * log group to be encrypted with that key. Only the log events ingested after the key is
 * associated are encrypted with that key.
 *
 * Associating a KMS key with a log group overrides any existing
 * associations between the log group and a KMS key. After a KMS key is associated with a log group, all newly ingested data for the log group
 * is encrypted using the KMS key. This association is stored as long as the
 * data encrypted with the KMS key is still within CloudWatch Logs. This
 * enables CloudWatch Logs to decrypt this data whenever it is requested.
 *
 * Associating a key with a log group does not cause the results of queries of that log
 * group to be encrypted with that key. To have query results encrypted with a KMS key, you must use an `AssociateKmsKey` operation with the
 * `resourceIdentifier` parameter that specifies a `query-result`
 * resource.
 *
 * - Specify the `resourceIdentifier` parameter with a `query-result`
 * resource, to use that key to encrypt the stored results of all future StartQuery operations in the account. The response from a GetQueryResults operation will still return the query results in plain
 * text.
 *
 * Even if you have not associated a key with your query results, the query results are
 * encrypted when stored, using the default CloudWatch Logs method.
 *
 * If you run a query from a monitoring account that queries logs in a source account,
 * the query results key from the monitoring account, if any, is used.
 *
 * If you delete the key that is used to encrypt log events or log group query results,
 * then all the associated stored log events or query results that were encrypted with that key
 * will be unencryptable and unusable.
 *
 * CloudWatch Logs supports only symmetric KMS keys. Do not associate an
 * asymmetric KMS key with your log group or query results. For more
 * information, see Using Symmetric and Asymmetric
 * Keys.
 *
 * It can take up to 5 minutes for this operation to take effect.
 *
 * If you attempt to associate a KMS key with a log group but the KMS key does not exist or the KMS key is disabled, you receive an
 * `InvalidParameterException` error.
 */
export const associateKmsKey: API.OperationMethod<
  AssociateKmsKeyRequest,
  AssociateKmsKeyResponse,
  AssociateKmsKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { logGroupName: 0, kmsKeyId: 0, resourceIdentifier: 0 },
  },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateKmsKey",
})) as any;

export type AssociateSourceToS3TableIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a data source with an S3 Table Integration for query access in the 'logs'
 * namespace. This enables querying log data using analytics engines that support Iceberg such as
 * Amazon Athena, Amazon Redshift, and Apache Spark.
 */
export const associateSourceToS3TableIntegration: API.OperationMethod<
  AssociateSourceToS3TableIntegrationRequest,
  AssociateSourceToS3TableIntegrationResponse,
  AssociateSourceToS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { integrationArn: 0, dataSource: { name: 0, type: 0 } },
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
  operationName: "AssociateSourceToS3TableIntegration",
})) as any;

export type CancelExportTaskError =
  | InvalidOperationException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Cancels the specified export task.
 *
 * The task must be in the `PENDING` or `RUNNING` state.
 */
export const cancelExportTask: API.OperationMethod<
  CancelExportTaskRequest,
  CancelExportTaskResponse,
  CancelExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { taskId: 0 } },
  errors: [
    InvalidOperationException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelExportTask",
})) as any;

export type CancelImportTaskError =
  | AccessDeniedException
  | InvalidOperationException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels an active import task and stops importing data from the CloudTrail Lake Event Data Store.
 */
export const cancelImportTask: API.OperationMethod<
  CancelImportTaskRequest,
  CancelImportTaskResponse,
  CancelImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { importId: 0 } },
  errors: [
    AccessDeniedException,
    InvalidOperationException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelImportTask",
})) as any;

export type CreateDeliveryError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a *delivery*. A delivery is a connection between a logical
 * *delivery source* and a logical *delivery destination*
 * that you have already created.
 *
 * Only some Amazon Web Services services support being configured as a delivery source using
 * this operation. These services are listed as Supported [V2
 * Permissions] in the table at Enabling logging from
 * Amazon Web Services services.
 *
 * A delivery destination can represent a log group in CloudWatch Logs, an Amazon S3 bucket, a delivery stream in Firehose, or X-Ray.
 *
 * To configure logs delivery between a supported Amazon Web Services service and a
 * destination, you must do the following:
 *
 * - Create a delivery source, which is a logical object that represents the resource that
 * is actually sending the logs. For more information, see PutDeliverySource.
 *
 * - Create a *delivery destination*, which is a logical object that
 * represents the actual delivery destination. For more information, see PutDeliveryDestination.
 *
 * - If you are delivering logs cross-account, you must use PutDeliveryDestinationPolicy in the destination account to assign an IAM policy to the destination. This policy allows delivery to that destination.
 *
 * - Use `CreateDelivery` to create a *delivery* by pairing
 * exactly one delivery source and one delivery destination.
 *
 * You can configure a single delivery source to send logs to multiple destinations by
 * creating multiple deliveries. You can also create multiple deliveries to configure multiple
 * delivery sources to send logs to the same delivery destination.
 *
 * To update an existing delivery configuration, use UpdateDeliveryConfiguration.
 */
export const createDelivery: API.OperationMethod<
  CreateDeliveryRequest,
  CreateDeliveryResponse,
  CreateDeliveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      deliverySourceName: 0,
      deliveryDestinationArn: 0,
      recordFields: 0,
      fieldDelimiter: 0,
      s3DeliveryConfiguration: i_S3DeliveryConfiguration,
      tags: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDelivery",
})) as any;

export type CreateExportTaskError =
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates an export task so that you can efficiently export data from a log group to an
 * Amazon S3 bucket. When you perform a `CreateExportTask` operation, you must use
 * credentials that have permission to write to the S3 bucket that you specify as the
 * destination.
 *
 * Exporting log data to S3 buckets that are encrypted by KMS is supported.
 * Exporting log data to Amazon S3 buckets that have S3 Object Lock enabled with a
 * retention period is also supported.
 *
 * Exporting to S3 buckets that are encrypted with AES-256 is supported.
 *
 * This is an asynchronous call. If all the required information is provided, this
 * operation initiates an export task and responds with the ID of the task. After the task has
 * started, you can use DescribeExportTasks to get the status of the export task. Each account can only
 * have one active (`RUNNING` or `PENDING`) export task at a time. To
 * cancel an export task, use CancelExportTask.
 *
 * You can export logs from multiple log groups or multiple time ranges to the same S3
 * bucket. To separate log data for each export task, specify a prefix to be used as the Amazon
 * S3 key prefix for all exported objects.
 *
 * We recommend that you don't regularly export to Amazon S3 as a way to
 * continuously archive your logs. For that use case, we instead recommend that you use
 * subscriptions. For more information about subscriptions, see Real-time processing of log data
 * with subscriptions.
 *
 * Time-based sorting on chunks of log data inside an exported file is not guaranteed. You
 * can sort the exported log field data by using Linux utilities.
 */
export const createExportTask: API.OperationMethod<
  CreateExportTaskRequest,
  CreateExportTaskResponse,
  CreateExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      taskName: 0,
      logGroupName: 0,
      logStreamNamePrefix: 0,
      from: 0,
      to: 0,
      destination: 0,
      destinationPrefix: 0,
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExportTask",
})) as any;

export type CreateImportTaskError =
  | AccessDeniedException
  | ConflictException
  | InvalidOperationException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an import from a data source to CloudWatch Log and creates a managed log group as the destination for the imported data.
 * Currently, CloudTrail Event Data Store is the only supported data source.
 *
 * The import task must satisfy the following constraints:
 *
 * - The specified source must be in an ACTIVE state.
 *
 * - The API caller must have permissions to access the data in the provided source and to perform iam:PassRole on the
 * provided import role which has the same permissions, as described below.
 *
 * - The provided IAM role must trust the "cloudtrail.amazonaws.com" principal and have the following permissions:
 *
 * - cloudtrail:GetEventDataStoreData
 *
 * - logs:CreateLogGroup
 *
 * - logs:CreateLogStream
 *
 * - logs:PutResourcePolicy
 *
 * - (If source has an associated Amazon Web Services KMS Key) kms:Decrypt
 *
 * - (If source has an associated Amazon Web Services KMS Key) kms:GenerateDataKey
 *
 * Example IAM policy for provided import role:
 *
 * `[ { "Effect": "Allow", "Action": "iam:PassRole", "Resource": "arn:aws:iam::123456789012:role/apiCallerCredentials", "Condition": { "StringLike": { "iam:AssociatedResourceARN": "arn:aws:logs:us-east-1:123456789012:log-group:aws/cloudtrail/f1d45bff-d0e3-4868-b5d9-2eb678aa32fb:*" } } }, { "Effect": "Allow", "Action": [ "cloudtrail:GetEventDataStoreData" ], "Resource": [ "arn:aws:cloudtrail:us-east-1:123456789012:eventdatastore/f1d45bff-d0e3-4868-b5d9-2eb678aa32fb" ] }, { "Effect": "Allow", "Action": [ "logs:CreateImportTask", "logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutResourcePolicy" ], "Resource": [ "arn:aws:logs:us-east-1:123456789012:log-group:/aws/cloudtrail/*" ] }, { "Effect": "Allow", "Action": [ "kms:Decrypt", "kms:GenerateDataKey" ], "Resource": [ "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012" ] } ]`
 *
 * - If the import source has a customer managed key, the "cloudtrail.amazonaws.com" principal needs permissions to perform kms:Decrypt and kms:GenerateDataKey.
 *
 * - There can be no more than 3 active imports per account at a given time.
 *
 * - The startEventTime must be less than or equal to endEventTime.
 *
 * - The data being imported must be within the specified source's retention period.
 */
export const createImportTask: API.OperationMethod<
  CreateImportTaskRequest,
  CreateImportTaskResponse,
  CreateImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      importSourceArn: 0,
      importRoleArn: 0,
      importFilter: { startEventTime: 0, endEventTime: 0 },
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidOperationException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImportTask",
})) as any;

export type CreateLogAnomalyDetectorError =
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates an *anomaly detector* that regularly scans one or more log
 * groups and look for patterns and anomalies in the logs.
 *
 * An anomaly detector can help surface issues by automatically discovering anomalies in your
 * log event traffic. An anomaly detector uses machine learning algorithms to scan log events and
 * find *patterns*. A pattern is a shared text structure that recurs among
 * your log fields. Patterns provide a useful tool for analyzing large sets of logs because a
 * large number of log events can often be compressed into a few patterns.
 *
 * The anomaly detector uses pattern recognition to find `anomalies`, which are
 * unusual log events. It uses the `evaluationFrequency` to compare current log events
 * and patterns with trained baselines.
 *
 * Fields within a pattern are called *tokens*. Fields that vary within a
 * pattern, such as a request ID or timestamp, are referred to as dynamic
 * tokens and represented by ``.
 *
 * The following is an example of a pattern:
 *
 * `[INFO] Request time: ms`
 *
 * This pattern represents log events like `[INFO] Request time: 327 ms` and other
 * similar log events that differ only by the number, in this csse 327. When the pattern is
 * displayed, the different numbers are replaced by ``
 *
 * Any parts of log events that are masked as sensitive data are not scanned for anomalies.
 * For more information about masking sensitive data, see Help protect sensitive log
 * data with masking.
 */
export const createLogAnomalyDetector: API.OperationMethod<
  CreateLogAnomalyDetectorRequest,
  CreateLogAnomalyDetectorResponse,
  CreateLogAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupArnList: 0,
      detectorName: 0,
      evaluationFrequency: 0,
      filterPattern: 0,
      kmsKeyId: 0,
      anomalyVisibilityTime: 0,
      tags: 0,
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLogAnomalyDetector",
})) as any;

export type CreateLogGroupError =
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a log group with the specified name. You can create up to 1,000,000 log groups
 * per Region per account.
 *
 * You must use the following guidelines when naming a log group:
 *
 * - Log group names must be unique within a Region for an Amazon Web Services
 * account.
 *
 * - Log group names can be between 1 and 512 characters long.
 *
 * - Log group names consist of the following characters: a-z, A-Z, 0-9, '_'
 * (underscore), '-' (hyphen), '/' (forward slash), '.' (period), and '#' (number
 * sign)
 *
 * - Log group names can't start with the string `aws/`
 *
 * When you create a log group, by default the log events in the log group do not expire.
 * To set a retention policy so that events expire and are deleted after a specified time, use
 * PutRetentionPolicy.
 *
 * If you associate an KMS key with the log group, ingested data is
 * encrypted using the KMS key. This association is stored as long as the data
 * encrypted with the KMS key is still within CloudWatch Logs. This enables
 * CloudWatch Logs to decrypt this data whenever it is requested.
 *
 * If you attempt to associate a KMS key with the log group but the KMS key does not exist or the KMS key is disabled, you receive an
 * `InvalidParameterException` error.
 *
 * CloudWatch Logs supports only symmetric KMS keys. Do not associate an
 * asymmetric KMS key with your log group. For more information, see Using
 * Symmetric and Asymmetric Keys.
 */
export const createLogGroup: API.OperationMethod<
  CreateLogGroupRequest,
  CreateLogGroupResponse,
  CreateLogGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupName: 0,
      kmsKeyId: 0,
      tags: 0,
      logGroupClass: 0,
      deletionProtectionEnabled: 0,
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLogGroup",
})) as any;

export type CreateLogStreamError =
  | InvalidParameterException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a log stream for the specified log group. A log stream is a sequence of log
 * events that originate from a single source, such as an application instance or a resource that
 * is being monitored.
 *
 * There is no limit on the number of log streams that you can create for a log group.
 * There is a limit of 50 TPS on `CreateLogStream` operations, after which
 * transactions are throttled.
 *
 * You must use the following guidelines when naming a log stream:
 *
 * - Log stream names must be unique within the log group.
 *
 * - Log stream names can be between 1 and 512 characters long.
 *
 * - Don't use ':' (colon) or '*' (asterisk) characters.
 */
export const createLogStream: API.OperationMethod<
  CreateLogStreamRequest,
  CreateLogStreamResponse,
  CreateLogStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupName: 0, logStreamName: 0 } },
  errors: [
    InvalidParameterException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLogStream",
})) as any;

export type CreateLookupTableError =
  | AccessDeniedException
  | InvalidParameterException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Creates a lookup table by uploading CSV data or from CloudWatch Logs query
 * results. You can use lookup tables to enrich log data in CloudWatch Logs queries with
 * reference data such as user details, application names, or error descriptions.
 *
 * The table name must be unique within your account and Region. You must specify either
 * `tableBody` or `queryId`, but not both. If you use
 * `tableBody`, the CSV content must include a header row with column names, use
 * UTF-8 encoding, and not exceed 10 MB.
 */
export const createLookupTable: API.OperationMethod<
  CreateLookupTableRequest,
  CreateLookupTableResponse,
  CreateLookupTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      lookupTableName: 0,
      description: 0,
      tableBody: 0,
      queryId: 0,
      kmsKeyId: 0,
      tags: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLookupTable",
})) as any;

export type CreateScheduledQueryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scheduled query that runs CloudWatch Logs Insights queries at regular intervals.
 * Scheduled queries enable proactive monitoring by automatically executing queries to detect
 * patterns and anomalies in your log data. Query results can be delivered to Amazon S3 for analysis
 * or further processing.
 */
export const createScheduledQuery: API.OperationMethod<
  CreateScheduledQueryRequest,
  CreateScheduledQueryResponse,
  CreateScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      queryLanguage: 0,
      queryString: 0,
      logGroupIdentifiers: 0,
      scheduleExpression: 0,
      timezone: 0,
      startTimeOffset: 0,
      endTimeOffset: 0,
      destinationConfiguration: i_DestinationConfiguration,
      scheduleStartTime: 0,
      scheduleEndTime: 0,
      executionRoleArn: 0,
      state: 0,
      tags: 0,
    },
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
  operationName: "CreateScheduledQuery",
})) as any;

export type DeleteAccountPolicyError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a CloudWatch Logs account policy. This stops the account-wide policy from
 * applying to log groups or data sources in the account. If you delete a data protection policy
 * or subscription filter policy, any log-group level policies of those types remain in effect.
 * This operation supports deletion of data source-based field index policies, including facet
 * configurations, in addition to log group-based policies.
 *
 * To use this operation, you must be signed on with the correct permissions depending on the
 * type of policy that you are deleting.
 *
 * - To delete a data protection policy, you must have the
 * `logs:DeleteDataProtectionPolicy` and `logs:DeleteAccountPolicy`
 * permissions.
 *
 * - To delete a subscription filter policy, you must have the
 * `logs:DeleteSubscriptionFilter` and `logs:DeleteAccountPolicy`
 * permissions.
 *
 * - To delete a transformer policy, you must have the `logs:DeleteTransformer`
 * and `logs:DeleteAccountPolicy` permissions.
 *
 * - To delete a field index policy, you must have the `logs:DeleteIndexPolicy`
 * and `logs:DeleteAccountPolicy` permissions.
 *
 * If you delete a field index policy that included facet configurations, those facets
 * will no longer be available for interactive exploration in the CloudWatch Logs Insights
 * console. However, facet data is retained for up to 30 days.
 *
 * If you delete a field index policy, the indexing of the log events that happened before
 * you deleted the policy will still be used for up to 30 days to improve CloudWatch Logs
 * Insights queries.
 */
export const deleteAccountPolicy: API.OperationMethod<
  DeleteAccountPolicyRequest,
  DeleteAccountPolicyResponse,
  DeleteAccountPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { policyName: 0, policyType: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountPolicy",
})) as any;

export type DeleteDataProtectionPolicyError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the data protection policy from the specified log group.
 *
 * For more information about data protection policies, see PutDataProtectionPolicy.
 */
export const deleteDataProtectionPolicy: API.OperationMethod<
  DeleteDataProtectionPolicyRequest,
  DeleteDataProtectionPolicyResponse,
  DeleteDataProtectionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupIdentifier: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataProtectionPolicy",
})) as any;

export type DeleteDeliveryError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a *delivery*. A delivery is a connection between a logical
 * *delivery source* and a logical delivery
 * destination. Deleting a delivery only deletes the connection between the delivery
 * source and delivery destination. It does not delete the delivery destination or the delivery
 * source.
 */
export const deleteDelivery: API.OperationMethod<
  DeleteDeliveryRequest,
  DeleteDeliveryResponse,
  DeleteDeliveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0 } },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDelivery",
})) as any;

export type DeleteDeliveryDestinationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a *delivery destination*. A delivery is a connection between a
 * logical *delivery source* and a logical delivery
 * destination.
 *
 * You can't delete a delivery destination if any current deliveries are associated with it.
 * To find whether any deliveries are associated with this delivery destination, use the DescribeDeliveries operation and check the `deliveryDestinationArn`
 * field in the results.
 */
export const deleteDeliveryDestination: API.OperationMethod<
  DeleteDeliveryDestinationRequest,
  DeleteDeliveryDestinationResponse,
  DeleteDeliveryDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeliveryDestination",
})) as any;

export type DeleteDeliveryDestinationPolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a delivery destination policy. For more information about these policies, see
 * PutDeliveryDestinationPolicy.
 */
export const deleteDeliveryDestinationPolicy: API.OperationMethod<
  DeleteDeliveryDestinationPolicyRequest,
  DeleteDeliveryDestinationPolicyResponse,
  DeleteDeliveryDestinationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { deliveryDestinationName: 0 } },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeliveryDestinationPolicy",
})) as any;

export type DeleteDeliverySourceError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a *delivery source*. A delivery is a connection between a
 * logical *delivery source* and a logical delivery
 * destination.
 *
 * You can't delete a delivery source if any current deliveries are associated with it. To
 * find whether any deliveries are associated with this delivery source, use the DescribeDeliveries operation and check the `deliverySourceName` field in
 * the results.
 */
export const deleteDeliverySource: API.OperationMethod<
  DeleteDeliverySourceRequest,
  DeleteDeliverySourceResponse,
  DeleteDeliverySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeliverySource",
})) as any;

export type DeleteDestinationError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the specified destination, and eventually disables all the subscription filters
 * that publish to it. This operation does not delete the physical resource encapsulated by the
 * destination.
 */
export const deleteDestination: API.OperationMethod<
  DeleteDestinationRequest,
  DeleteDestinationResponse,
  DeleteDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { destinationName: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDestination",
})) as any;

export type DeleteIndexPolicyError =
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a log-group level field index policy that was applied to a single log group. The
 * indexing of the log events that happened before you delete the policy will still be used for
 * as many as 30 days to improve CloudWatch Logs Insights queries.
 *
 * If the deleted policy included facet configurations, those facets will no longer be
 * available for interactive exploration in the CloudWatch Logs Insights console for this log
 * group. However, facet data is retained for up to 30 days.
 *
 * You can't use this operation to delete an account-level index policy. Instead, use DeleteAccountPolicy.
 *
 * If you delete a log-group level field index policy and there is an account-level field
 * index policy, in a few minutes the log group begins using that account-wide policy to index
 * new incoming log events. This operation only affects log group-level policies, including any
 * facet configurations, and preserves any data source-based account policies that may apply to
 * the log group.
 */
export const deleteIndexPolicy: API.OperationMethod<
  DeleteIndexPolicyRequest,
  DeleteIndexPolicyResponse,
  DeleteIndexPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupIdentifier: 0 } },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIndexPolicy",
})) as any;

export type DeleteIntegrationError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the integration between CloudWatch Logs and OpenSearch Service. If your
 * integration has active vended logs dashboards, you must specify `true` for the
 * `force` parameter, otherwise the operation will fail. If you delete the
 * integration by setting `force` to `true`, all your vended logs
 * dashboards powered by OpenSearch Service will be deleted and the data that was on them will no
 * longer be accessible.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationRequest,
  DeleteIntegrationResponse,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { integrationName: 0, force: 0 } },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
})) as any;

export type DeleteLogAnomalyDetectorError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the specified CloudWatch Logs anomaly detector.
 */
export const deleteLogAnomalyDetector: API.OperationMethod<
  DeleteLogAnomalyDetectorRequest,
  DeleteLogAnomalyDetectorResponse,
  DeleteLogAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { anomalyDetectorArn: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLogAnomalyDetector",
})) as any;

export type DeleteLogGroupError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified log group and permanently deletes all the archived log events
 * associated with the log group.
 */
export const deleteLogGroup: API.OperationMethod<
  DeleteLogGroupRequest,
  DeleteLogGroupResponse,
  DeleteLogGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupName: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLogGroup",
})) as any;

export type DeleteLogStreamError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified log stream and permanently deletes all the archived log events
 * associated with the log stream.
 */
export const deleteLogStream: API.OperationMethod<
  DeleteLogStreamRequest,
  DeleteLogStreamResponse,
  DeleteLogStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupName: 0, logStreamName: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLogStream",
})) as any;

export type DeleteLookupTableError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a lookup table permanently. This operation cannot be undone.
 *
 * Queries that reference a deleted table will return an error. Before deleting a lookup
 * table, review any saved queries or dashboards that may reference it.
 */
export const deleteLookupTable: API.OperationMethod<
  DeleteLookupTableRequest,
  DeleteLookupTableResponse,
  DeleteLookupTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { lookupTableArn: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLookupTable",
})) as any;

export type DeleteMetricFilterError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the specified metric filter.
 */
export const deleteMetricFilter: API.OperationMethod<
  DeleteMetricFilterRequest,
  DeleteMetricFilterResponse,
  DeleteMetricFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupName: 0, filterName: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetricFilter",
})) as any;

export type DeleteQueryDefinitionError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a saved CloudWatch Logs Insights query definition. A query definition contains
 * details about a saved CloudWatch Logs Insights query.
 *
 * Each `DeleteQueryDefinition` operation can delete one query definition.
 *
 * You must have the `logs:DeleteQueryDefinition` permission to be able to perform
 * this operation.
 */
export const deleteQueryDefinition: API.OperationMethod<
  DeleteQueryDefinitionRequest,
  DeleteQueryDefinitionResponse,
  DeleteQueryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { queryDefinitionId: 0 } },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueryDefinition",
})) as any;

export type DeleteResourcePolicyError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a resource policy from this account. This revokes the access of the identities
 * in that policy to put log events to this account.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { policyName: 0, resourceArn: 0, expectedRevisionId: 0 },
  },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteRetentionPolicyError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the specified retention policy.
 *
 * Log events do not expire if they belong to log groups without a retention
 * policy.
 */
export const deleteRetentionPolicy: API.OperationMethod<
  DeleteRetentionPolicyRequest,
  DeleteRetentionPolicyResponse,
  DeleteRetentionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupName: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRetentionPolicy",
})) as any;

export type DeleteScheduledQueryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a scheduled query and stops all future executions. This operation also removes any
 * configured actions and associated resources.
 */
export const deleteScheduledQuery: API.OperationMethod<
  DeleteScheduledQueryRequest,
  DeleteScheduledQueryResponse,
  DeleteScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { identifier: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledQuery",
})) as any;

export type DeleteSubscriptionFilterError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the specified subscription filter.
 */
export const deleteSubscriptionFilter: API.OperationMethod<
  DeleteSubscriptionFilterRequest,
  DeleteSubscriptionFilterResponse,
  DeleteSubscriptionFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupName: 0, filterName: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriptionFilter",
})) as any;

export type DeleteSyslogConfigurationError =
  | AccessDeniedException
  | InvalidOperationException
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a syslog configuration for a log group. After deletion, syslog data is no
 * longer ingested through the specified VPC endpoint.
 */
export const deleteSyslogConfiguration: API.OperationMethod<
  DeleteSyslogConfigurationRequest,
  DeleteSyslogConfigurationResponse,
  DeleteSyslogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { logGroupIdentifier: 0, vpcEndpointId: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidOperationException,
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSyslogConfiguration",
})) as any;

export type DeleteTransformerError =
  | InvalidOperationException
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the log transformer for the specified log group. As soon as you do this, the
 * transformation of incoming log events according to that transformer stops. If this account has
 * an account-level transformer that applies to this log group, the log group begins using that
 * account-level transformer when this log-group level transformer is deleted.
 *
 * After you delete a transformer, be sure to edit any metric filters or subscription filters
 * that relied on the transformed versions of the log events.
 */
export const deleteTransformer: API.OperationMethod<
  DeleteTransformerRequest,
  DeleteTransformerResponse,
  DeleteTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupIdentifier: 0 } },
  errors: [
    InvalidOperationException,
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTransformer",
})) as any;

export type DescribeAccountPoliciesError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of all CloudWatch Logs account policies in the account.
 *
 * To use this operation, you must be signed on with the correct permissions depending on the
 * type of policy that you are retrieving information for.
 *
 * - To see data protection policies, you must have the
 * `logs:GetDataProtectionPolicy` and `logs:DescribeAccountPolicies`
 * permissions.
 *
 * - To see subscription filter policies, you must have the
 * `logs:DescribeSubscriptionFilters` and
 * `logs:DescribeAccountPolicies` permissions.
 *
 * - To see transformer policies, you must have the `logs:GetTransformer` and
 * `logs:DescribeAccountPolicies` permissions.
 *
 * - To see field index policies, you must have the `logs:DescribeIndexPolicies`
 * and `logs:DescribeAccountPolicies` permissions.
 */
export const describeAccountPolicies: API.OperationMethod<
  DescribeAccountPoliciesRequest,
  DescribeAccountPoliciesResponse,
  DescribeAccountPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      policyType: 0,
      policyName: 0,
      accountIdentifiers: 0,
      nextToken: 0,
    },
  },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountPolicies",
})) as any;

export type DescribeConfigurationTemplatesError =
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to return the valid and default values that are used when creating
 * delivery sources, delivery destinations, and deliveries. For more information about
 * deliveries, see CreateDelivery.
 */
export const describeConfigurationTemplates: API.PaginatedOperationMethod<
  DescribeConfigurationTemplatesRequest,
  DescribeConfigurationTemplatesResponse,
  DescribeConfigurationTemplatesError,
  Credentials | HttpClient.HttpClient,
  ConfigurationTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      service: 0,
      logTypes: 0,
      resourceTypes: 0,
      deliveryDestinationTypes: 0,
      nextToken: 0,
      limit: 0,
    },
  },
  errors: [
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configurationTemplates",
    pageSize: "limit",
  } as const,
})) as any;

export type DescribeDeliveriesError =
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of the deliveries that have been created in the account.
 *
 * A *delivery* is a connection between a
 * delivery
 * source
 * and a
 * *delivery destination*
 * .
 *
 * A delivery source represents an Amazon Web Services resource that sends logs to an logs
 * delivery destination. The destination can be CloudWatch Logs, Amazon S3, Firehose or X-Ray. Only some Amazon Web Services services support being
 * configured as a delivery source. These services are listed in Enable logging from
 * Amazon Web Services services.
 */
export const describeDeliveries: API.PaginatedOperationMethod<
  DescribeDeliveriesRequest,
  DescribeDeliveriesResponse,
  DescribeDeliveriesError,
  Credentials | HttpClient.HttpClient,
  Delivery
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0, limit: 0 } },
  errors: [
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDeliveries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deliveries",
    pageSize: "limit",
  } as const,
})) as any;

export type DescribeDeliveryDestinationsError =
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of the delivery destinations that have been created in the
 * account.
 */
export const describeDeliveryDestinations: API.PaginatedOperationMethod<
  DescribeDeliveryDestinationsRequest,
  DescribeDeliveryDestinationsResponse,
  DescribeDeliveryDestinationsError,
  Credentials | HttpClient.HttpClient,
  DeliveryDestination
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0, limit: 0 } },
  errors: [
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDeliveryDestinations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deliveryDestinations",
    pageSize: "limit",
  } as const,
})) as any;

export type DescribeDeliverySourcesError =
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of the delivery sources that have been created in the account.
 */
export const describeDeliverySources: API.PaginatedOperationMethod<
  DescribeDeliverySourcesRequest,
  DescribeDeliverySourcesResponse,
  DescribeDeliverySourcesError,
  Credentials | HttpClient.HttpClient,
  DeliverySource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0, limit: 0 } },
  errors: [
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDeliverySources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deliverySources",
    pageSize: "limit",
  } as const,
})) as any;

export type DescribeDestinationsError =
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists all your destinations. The results are ASCII-sorted by destination
 * name.
 */
export const describeDestinations: API.PaginatedOperationMethod<
  DescribeDestinationsRequest,
  DescribeDestinationsResponse,
  DescribeDestinationsError,
  Credentials | HttpClient.HttpClient,
  Destination
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DestinationNamePrefix: 0, nextToken: 0, limit: 0 },
  },
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDestinations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "destinations",
    pageSize: "limit",
  } as const,
})) as any;

export type DescribeExportTasksError =
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the specified export tasks. You can list all your export tasks or filter the
 * results based on task ID or task status.
 */
export const describeExportTasks: API.OperationMethod<
  DescribeExportTasksRequest,
  DescribeExportTasksResponse,
  DescribeExportTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { taskId: 0, statusCode: 0, nextToken: 0, limit: 0 },
  },
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExportTasks",
})) as any;

export type DescribeFieldIndexesError =
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of field indexes discovered in log data. By default, the response includes
 * the `DEFAULT`, `CUSTOM`, and `INACTIVE` index categories. To
 * return indexes from other categories, use the `indexCategories` parameter.
 *
 * For more information about field index policies, see PutIndexPolicy.
 */
export const describeFieldIndexes: API.OperationMethod<
  DescribeFieldIndexesRequest,
  DescribeFieldIndexesResponse,
  DescribeFieldIndexesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { logGroupIdentifiers: 0, indexCategories: 0, nextToken: 0 },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFieldIndexes",
})) as any;

export type DescribeImportTaskBatchesError =
  | AccessDeniedException
  | InvalidOperationException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets detailed information about the individual batches within an import task, including their status and any error messages.
 * For CloudTrail Event Data Store sources, a batch refers to a subset of stored events grouped by their eventTime.
 */
export const describeImportTaskBatches: API.OperationMethod<
  DescribeImportTaskBatchesRequest,
  DescribeImportTaskBatchesResponse,
  DescribeImportTaskBatchesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { importId: 0, batchImportStatus: 0, limit: 0, nextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidOperationException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImportTaskBatches",
})) as any;

export type DescribeImportTasksError =
  | AccessDeniedException
  | InvalidOperationException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists and describes import tasks, with optional filtering by import status and source ARN.
 */
export const describeImportTasks: API.OperationMethod<
  DescribeImportTasksRequest,
  DescribeImportTasksResponse,
  DescribeImportTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      importId: 0,
      importStatus: 0,
      importSourceArn: 0,
      limit: 0,
      nextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InvalidOperationException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImportTasks",
})) as any;

export type DescribeIndexPoliciesError =
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the field index policies of the specified log group. For more information about
 * field index policies, see PutIndexPolicy.
 *
 * If a specified log group has a log-group level index policy, that policy is returned by
 * this operation.
 *
 * If a specified log group doesn't have a log-group level index policy, but an account-wide
 * index policy applies to it, that account-wide policy is returned by this operation.
 *
 * To find information about only account-level policies, use DescribeAccountPolicies instead.
 */
export const describeIndexPolicies: API.OperationMethod<
  DescribeIndexPoliciesRequest,
  DescribeIndexPoliciesResponse,
  DescribeIndexPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupIdentifiers: 0, nextToken: 0 } },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIndexPolicies",
})) as any;

export type DescribeLogGroupsError =
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns information about log groups, including data sources that ingest into each log
 * group. You can return all your log groups or filter the results by prefix. The results are
 * ASCII-sorted by log group name.
 *
 * CloudWatch Logs doesn't support IAM policies that control access to the
 * `DescribeLogGroups` action by using the
 * aws:ResourceTag/*key-name*
 * condition key. Other CloudWatch
 * Logs actions do support the use of the
 * aws:ResourceTag/*key-name*
 * condition key to control access.
 * For more information about using tags to control access, see Controlling access to Amazon Web Services
 * resources using tags.
 *
 * If you are using CloudWatch cross-account observability, you can use this operation
 * in a monitoring account and view data from the linked source accounts. For more information,
 * see CloudWatch cross-account observability.
 */
export const describeLogGroups: API.PaginatedOperationMethod<
  DescribeLogGroupsRequest,
  DescribeLogGroupsResponse,
  DescribeLogGroupsError,
  Credentials | HttpClient.HttpClient,
  LogGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      accountIdentifiers: 0,
      logGroupNamePrefix: 0,
      logGroupNamePattern: 0,
      nextToken: 0,
      limit: 0,
      includeLinkedAccounts: 0,
      logGroupClass: 0,
      logGroupIdentifiers: 0,
    },
  },
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLogGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "logGroups",
    pageSize: "limit",
  } as const,
})) as any;

export type DescribeLogStreamsError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the log streams for the specified log group. You can list all the log streams or
 * filter the results by prefix. You can also control how the results are ordered.
 *
 * You can specify the log group to search by using either `logGroupIdentifier` or
 * `logGroupName`. You must include one of these two parameters, but you can't
 * include both.
 *
 * This operation has a limit of 25 transactions per second, after which transactions are
 * throttled.
 *
 * If you are using CloudWatch cross-account observability, you can use this operation
 * in a monitoring account and view data from the linked source accounts. For more information,
 * see CloudWatch cross-account observability.
 */
export const describeLogStreams: API.PaginatedOperationMethod<
  DescribeLogStreamsRequest,
  DescribeLogStreamsResponse,
  DescribeLogStreamsError,
  Credentials | HttpClient.HttpClient,
  LogStream
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupName: 0,
      logGroupIdentifier: 0,
      logStreamNamePrefix: 0,
      orderBy: 0,
      descending: 0,
      nextToken: 0,
      limit: 0,
    },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLogStreams",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "logStreams",
    pageSize: "limit",
  } as const,
})) as any;

export type DescribeLookupTablesError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves metadata about lookup tables in your account. You can optionally filter the
 * results by table name prefix. Results are sorted by table name in ascending order.
 */
export const describeLookupTables: API.OperationMethod<
  DescribeLookupTablesRequest,
  DescribeLookupTablesResponse,
  DescribeLookupTablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { lookupTableNamePrefix: 0, maxResults: 0, nextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLookupTables",
})) as any;

export type DescribeMetricFiltersError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the specified metric filters. You can list all of the metric filters or filter
 * the results by log name, prefix, metric name, or metric namespace. The results are
 * ASCII-sorted by filter name.
 */
export const describeMetricFilters: API.PaginatedOperationMethod<
  DescribeMetricFiltersRequest,
  DescribeMetricFiltersResponse,
  DescribeMetricFiltersError,
  Credentials | HttpClient.HttpClient,
  MetricFilter
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupName: 0,
      filterNamePrefix: 0,
      nextToken: 0,
      limit: 0,
      metricName: 0,
      metricNamespace: 0,
    },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetricFilters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metricFilters",
    pageSize: "limit",
  } as const,
})) as any;

export type DescribeQueriesError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of CloudWatch Logs Insights queries that are scheduled, running, or have
 * been run recently in this account. You can request all queries or limit it to queries of a
 * specific log group or queries with a certain status.
 *
 * This operation includes both interactive queries started directly by users and automated
 * queries executed by scheduled query configurations. Scheduled query executions appear in the
 * results alongside manually initiated queries, providing visibility into all query activity in
 * your account.
 */
export const describeQueries: API.OperationMethod<
  DescribeQueriesRequest,
  DescribeQueriesResponse,
  DescribeQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupName: 0,
      status: 0,
      maxResults: 0,
      nextToken: 0,
      queryLanguage: 0,
    },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQueries",
})) as any;

export type DescribeQueryDefinitionsError =
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * This operation returns a paginated list of your saved CloudWatch Logs Insights query
 * definitions. You can retrieve query definitions from the current account or from a source
 * account that is linked to the current account.
 *
 * You can use the `queryDefinitionNamePrefix` parameter to limit the results to
 * only the query definitions that have names that start with a certain string.
 */
export const describeQueryDefinitions: API.OperationMethod<
  DescribeQueryDefinitionsRequest,
  DescribeQueryDefinitionsResponse,
  DescribeQueryDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      queryLanguage: 0,
      queryDefinitionNamePrefix: 0,
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQueryDefinitions",
})) as any;

export type DescribeResourcePoliciesError =
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the resource policies in this account.
 */
export const describeResourcePolicies: API.OperationMethod<
  DescribeResourcePoliciesRequest,
  DescribeResourcePoliciesResponse,
  DescribeResourcePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, limit: 0, resourceArn: 0, policyScope: 0 },
  },
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicies",
})) as any;

export type DescribeSubscriptionFiltersError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the subscription filters for the specified log group. You can list all the
 * subscription filters or filter the results by prefix. The results are ASCII-sorted by filter
 * name.
 */
export const describeSubscriptionFilters: API.PaginatedOperationMethod<
  DescribeSubscriptionFiltersRequest,
  DescribeSubscriptionFiltersResponse,
  DescribeSubscriptionFiltersError,
  Credentials | HttpClient.HttpClient,
  SubscriptionFilter
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { logGroupName: 0, filterNamePrefix: 0, nextToken: 0, limit: 0 },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubscriptionFilters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscriptionFilters",
    pageSize: "limit",
  } as const,
})) as any;

export type DisassociateKmsKeyError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Disassociates the specified KMS key from the specified log group or
 * from all CloudWatch Logs Insights query results in the account.
 *
 * When you use `DisassociateKmsKey`, you specify either the
 * `logGroupName` parameter or the `resourceIdentifier` parameter. You
 * can't specify both of those parameters in the same operation.
 *
 * - Specify the `logGroupName` parameter to stop using the KMS key to encrypt future log events ingested and stored in the log group.
 * Instead, they will be encrypted with the default CloudWatch Logs method. The log events
 * that were ingested while the key was associated with the log group are still encrypted
 * with that key. Therefore, CloudWatch Logs will need permissions for the key whenever
 * that data is accessed.
 *
 * - Specify the `resourceIdentifier` parameter with the
 * `query-result` resource to stop using the KMS key to
 * encrypt the results of all future StartQuery
 * operations in the account. They will instead be encrypted with the default CloudWatch Logs method. The results from queries that ran while the key was associated with
 * the account are still encrypted with that key. Therefore, CloudWatch Logs will need
 * permissions for the key whenever that data is accessed.
 *
 * It can take up to 5 minutes for this operation to take effect.
 */
export const disassociateKmsKey: API.OperationMethod<
  DisassociateKmsKeyRequest,
  DisassociateKmsKeyResponse,
  DisassociateKmsKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { logGroupName: 0, resourceIdentifier: 0 },
  },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateKmsKey",
})) as any;

export type DisassociateSourceFromS3TableIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a data source from an S3 Table Integration, removing query access and
 * deleting all associated data from the integration.
 */
export const disassociateSourceFromS3TableIntegration: API.OperationMethod<
  DisassociateSourceFromS3TableIntegrationRequest,
  DisassociateSourceFromS3TableIntegrationResponse,
  DisassociateSourceFromS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { identifier: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSourceFromS3TableIntegration",
})) as any;

export type FilterLogEventsError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists log events from the specified log group. You can list all the log events or
 * filter the results using one or more of the following:
 *
 * - A filter pattern
 *
 * - A time range
 *
 * - The log stream name, or a log stream name prefix that matches multiple log
 * streams
 *
 * You must have the `logs:FilterLogEvents` permission to perform this
 * operation.
 *
 * You can specify the log group to search by using either `logGroupIdentifier` or
 * `logGroupName`. You must include one of these two parameters, but you can't
 * include both.
 *
 * `FilterLogEvents` is a paginated operation. Each page returned can contain up
 * to 1 MB of log events or up to 10,000 log events. A returned page might only be partially
 * full, or even empty. For example, if the result of a query would return 15,000 log events, the
 * first page isn't guaranteed to have 10,000 log events even if they all fit into 1 MB.
 *
 * Partially full or empty pages don't necessarily mean that pagination is finished. If the
 * results include a `nextToken`, there might be more log events available. You can
 * return these additional log events by providing the nextToken in a subsequent
 * `FilterLogEvents` operation. If the results don't include a
 * `nextToken`, then pagination is finished.
 *
 * Specifying the `limit` parameter only guarantees that a single page doesn't
 * return more log events than the specified limit, but it might return fewer events than the
 * limit. This is the expected API behavior.
 *
 * The returned log events are sorted by event timestamp, the timestamp when the event was
 * ingested by CloudWatch Logs, and the ID of the `PutLogEvents` request. By default,
 * the events are returned in ascending timestamp order (oldest first). To return events in
 * descending timestamp order (newest first), set the `startFromHead` parameter to
 * `false`.
 *
 * If you are using CloudWatch cross-account observability, you can use this operation
 * in a monitoring account and view data from the linked source accounts. For more information,
 * see CloudWatch cross-account observability.
 *
 * If you are using log
 * transformation, the `FilterLogEvents` operation returns only the
 * original versions of log events, before they were transformed. To view the transformed
 * versions, you must use a CloudWatch Logs
 * query.
 */
export const filterLogEvents: API.PaginatedOperationMethod<
  FilterLogEventsRequest,
  FilterLogEventsResponse,
  FilterLogEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupName: 0,
      logGroupIdentifier: 0,
      logStreamNames: 0,
      logStreamNamePrefix: 0,
      startTime: 0,
      endTime: 0,
      filterPattern: 0,
      nextToken: 0,
      limit: 0,
      startFromHead: 0,
      interleaved: 0,
      unmask: 0,
    },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FilterLogEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "limit",
  } as const,
})) as any;

export type GetDataProtectionPolicyError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns information about a log group data protection policy.
 */
export const getDataProtectionPolicy: API.OperationMethod<
  GetDataProtectionPolicyRequest,
  GetDataProtectionPolicyResponse,
  GetDataProtectionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupIdentifier: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataProtectionPolicy",
})) as any;

export type GetDeliveryError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns complete information about one logical *delivery*. A delivery
 * is a connection between a
 * delivery
 * source
 * and a
 * *delivery destination*
 * .
 *
 * A delivery source represents an Amazon Web Services resource that sends logs to an logs
 * delivery destination. The destination can be CloudWatch Logs, Amazon S3, or Firehose. Only some Amazon Web Services services support being configured as a delivery
 * source. These services are listed in Enable logging from
 * Amazon Web Services services.
 *
 * You need to specify the delivery `id` in this operation. You can find the IDs
 * of the deliveries in your account with the DescribeDeliveries operation.
 */
export const getDelivery: API.OperationMethod<
  GetDeliveryRequest,
  GetDeliveryResponse,
  GetDeliveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0 } },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDelivery",
})) as any;

export type GetDeliveryDestinationError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves complete information about one delivery destination.
 */
export const getDeliveryDestination: API.OperationMethod<
  GetDeliveryDestinationRequest,
  GetDeliveryDestinationResponse,
  GetDeliveryDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliveryDestination",
})) as any;

export type GetDeliveryDestinationPolicyError =
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the delivery destination policy assigned to the delivery destination that you
 * specify. For more information about delivery destinations and their policies, see PutDeliveryDestinationPolicy.
 */
export const getDeliveryDestinationPolicy: API.OperationMethod<
  GetDeliveryDestinationPolicyRequest,
  GetDeliveryDestinationPolicyResponse,
  GetDeliveryDestinationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { deliveryDestinationName: 0 } },
  errors: [
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliveryDestinationPolicy",
})) as any;

export type GetDeliverySourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves complete information about one delivery source.
 */
export const getDeliverySource: API.OperationMethod<
  GetDeliverySourceRequest,
  GetDeliverySourceResponse,
  GetDeliverySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliverySource",
})) as any;

export type GetIntegrationError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns information about one integration between CloudWatch Logs and OpenSearch Service.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationRequest,
  GetIntegrationResponse,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { integrationName: 0 } },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
})) as any;

export type GetLogAnomalyDetectorError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves information about the log anomaly detector that you specify. The KMS key ARN detected is valid.
 */
export const getLogAnomalyDetector: API.OperationMethod<
  GetLogAnomalyDetectorRequest,
  GetLogAnomalyDetectorResponse,
  GetLogAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { anomalyDetectorArn: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogAnomalyDetector",
})) as any;

export type GetLogEventsError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists log events from the specified log stream. You can list all of the log events or
 * filter using a time range.
 *
 * `GetLogEvents` is a paginated operation. Each page returned can contain up to 1
 * MB of log events or up to 10,000 log events. A returned page might only be partially full, or
 * even empty. For example, if the result of a query would return 15,000 log events, the first
 * page isn't guaranteed to have 10,000 log events even if they all fit into 1 MB.
 *
 * Partially full or empty pages don't necessarily mean that pagination is finished. As long
 * as the `nextBackwardToken` or `nextForwardToken` returned is NOT equal
 * to the `nextToken` that you passed into the API call, there might be more log
 * events available. The token that you use depends on the direction you want to move in along
 * the log stream. The returned tokens are never null.
 *
 * If you set `startFromHead` to `true` and you don’t include
 * `endTime` in your request, you can end up in a situation where the pagination
 * doesn't terminate. This can happen when the new log events are being added to the target log
 * streams faster than they are being read. This situation is a good use case for the CloudWatch Logs
 * Live Tail feature.
 *
 * If you are using CloudWatch cross-account observability, you can use this operation
 * in a monitoring account and view data from the linked source accounts. For more information,
 * see CloudWatch cross-account observability.
 *
 * You can specify the log group to search by using either `logGroupIdentifier` or
 * `logGroupName`. You must include one of these two parameters, but you can't
 * include both.
 *
 * If you are using log
 * transformation, the `GetLogEvents` operation returns only the original
 * versions of log events, before they were transformed. To view the transformed versions, you
 * must use a CloudWatch Logs
 * query.
 */
export const getLogEvents: API.PaginatedOperationMethod<
  GetLogEventsRequest,
  GetLogEventsResponse,
  GetLogEventsError,
  Credentials | HttpClient.HttpClient,
  OutputLogEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupName: 0,
      logGroupIdentifier: 0,
      logStreamName: 0,
      startTime: 0,
      endTime: 0,
      nextToken: 0,
      limit: 0,
      startFromHead: 0,
      unmask: 0,
    },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextForwardToken",
    items: "events",
    pageSize: "limit",
  } as const,
})) as any;

export type GetLogFieldsError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Discovers available fields for a specific data source and type. The response includes any
 * field modifications introduced through pipelines, such as new fields or changed field types.
 */
export const getLogFields: API.OperationMethod<
  GetLogFieldsRequest,
  GetLogFieldsResponse,
  GetLogFieldsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { dataSourceName: 0, dataSourceType: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogFields",
})) as any;

export type GetLogGroupFieldsError =
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of the fields that are included in log events in the specified log group.
 * Includes the percentage of log events that contain each field. The search is limited to a time
 * period that you specify.
 *
 * This operation is used for discovering fields within log group events. For discovering
 * fields across data sources, use the GetLogFields operation.
 *
 * You can specify the log group to search by using either `logGroupIdentifier` or
 * `logGroupName`. You must specify one of these parameters, but you can't specify
 * both.
 *
 * In the results, fields that start with `@` are fields generated by CloudWatch
 * Logs. For example, `@timestamp` is the timestamp of each log event. For more
 * information about the fields that are generated by CloudWatch logs, see Supported
 * Logs and Discovered Fields.
 *
 * The response results are sorted by the frequency percentage, starting with the highest
 * percentage.
 *
 * If you are using CloudWatch cross-account observability, you can use this operation
 * in a monitoring account and view data from the linked source accounts. For more information,
 * see CloudWatch cross-account observability.
 */
export const getLogGroupFields: API.OperationMethod<
  GetLogGroupFieldsRequest,
  GetLogGroupFieldsResponse,
  GetLogGroupFieldsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { logGroupName: 0, time: 0, logGroupIdentifier: 0 },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogGroupFields",
})) as any;

export type GetLogObjectError =
  | AccessDeniedException
  | InvalidOperationException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a large logging object (LLO) and streams it back. This API is used to fetch the
 * content of large portions of log events that have been ingested through the
 * PutOpenTelemetryLogs API. When log events contain fields that would cause the total event size
 * to exceed 1MB, CloudWatch Logs automatically processes up to 10 fields, starting with the
 * largest fields. Each field is truncated as needed to keep the total event size as close to 1MB
 * as possible. The excess portions are stored as Large Log Objects (LLOs) and these fields are
 * processed separately and LLO reference system fields (in the format
 * `@ptr.$[path.to.field]`) are added. The path in the reference field reflects the
 * original JSON structure where the large field was located. For example, this could be
 * `@ptr.$['input']['message']`, `@ptr.$['AAA']['BBB']['CCC']['DDD']`,
 * `@ptr.$['AAA']`, or any other path matching your log structure.
 *
 * The `GetLogObject` API routes requests using SDK host prefix injection. SDK versions released before April 1, 2026 route to
 * `streaming-logs.*Region*.amazonaws.com`, which does not support VPC endpoints. SDK versions released on or after April 1, 2026 route to
 * `stream-logs.*Region*.amazonaws.com`, which supports VPC endpoints. To set up a VPC endpoint for this API, see Creating a VPC endpoint for CloudWatch Logs
 * .
 */
export const getLogObject: API.OperationMethod<
  GetLogObjectRequest,
  GetLogObjectResponse,
  GetLogObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { unmask: 0, logObjectPointer: 0 },
    output: {
      fieldStream: D.events({
        fields: { data: D.blob },
        InternalStreamingException: 0,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidOperationException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogObject",
  endpointHostPrefix: "stream-",
})) as any;

export type GetLogRecordError =
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves all of the fields and values of a single log event. All fields are retrieved,
 * even if the original query that produced the `logRecordPointer` retrieved only a
 * subset of fields. Fields are returned as field name/field value pairs.
 *
 * The full unparsed log event is returned within `@message`.
 */
export const getLogRecord: API.OperationMethod<
  GetLogRecordRequest,
  GetLogRecordResponse,
  GetLogRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logRecordPointer: 0, unmask: 0 } },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogRecord",
})) as any;

export type GetLookupTableError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves the full content of a lookup table, including the CSV data.
 */
export const getLookupTable: API.OperationMethod<
  GetLookupTableRequest,
  GetLookupTableResponse,
  GetLookupTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { lookupTableArn: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLookupTable",
})) as any;

export type GetQueryResultsError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the results from the specified query.
 *
 * Only the fields requested in the query are returned, along with a `@ptr` field,
 * which is the identifier for the log record. You can use the value of `@ptr` in a
 * GetLogRecord
 * operation to get the full log record.
 *
 * `GetQueryResults` does not start running a query. To run a query, use StartQuery. For more information about how long results of previous queries are
 * available, see CloudWatch Logs
 * quotas.
 *
 * If the value of the `Status` field in the output is `Running`, this
 * operation returns only partial results. If you see a value of `Scheduled` or
 * `Running` for the status, you can retry the operation later to see the final
 * results.
 *
 * This operation is used both for retrieving results from interactive queries and from
 * automated scheduled query executions. Scheduled queries use `GetQueryResults`
 * internally to retrieve query results for processing and delivery to configured
 * destinations.
 *
 * You can retrieve up to 100,000 log event results from a query, if available, by using
 * pagination. Use the `nextToken` returned in the response to request additional
 * pages of results, with each page returning up to 10,000 log events. This is only supported for Logs Insights QL and is currently not supported for PPL and SQL query languages.
 *
 * If you are using CloudWatch cross-account observability, you can use this operation
 * in a monitoring account to start queries in linked source accounts. For more information, see
 * CloudWatch cross-account observability.
 */
export const getQueryResults: API.OperationMethod<
  GetQueryResultsRequest,
  GetQueryResultsResponse,
  GetQueryResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { queryId: 0, nextToken: 0, maxItems: 0 },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResults",
})) as any;

export type GetScheduledQueryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific scheduled query, including its configuration, execution
 * status, and metadata.
 */
export const getScheduledQuery: API.OperationMethod<
  GetScheduledQueryRequest,
  GetScheduledQueryResponse,
  GetScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { identifier: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScheduledQuery",
})) as any;

export type GetScheduledQueryHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the execution history of a scheduled query within a specified time range,
 * including query results and destination processing status.
 */
export const getScheduledQueryHistory: API.PaginatedOperationMethod<
  GetScheduledQueryHistoryRequest,
  GetScheduledQueryHistoryResponse,
  GetScheduledQueryHistoryError,
  Credentials | HttpClient.HttpClient,
  TriggerHistoryRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      identifier: 0,
      startTime: 0,
      endTime: 0,
      executionStatuses: 0,
      maxResults: 0,
      nextToken: 0,
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
  operationName: "GetScheduledQueryHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "triggerHistory",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetStorageTierPolicyError =
  | AccessDeniedException
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the storage tier policy for the account.
 */
export const getStorageTierPolicy: API.OperationMethod<
  GetStorageTierPolicyRequest,
  GetStorageTierPolicyResponse,
  GetStorageTierPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageTierPolicy",
})) as any;

export type GetTransformerError =
  | InvalidOperationException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the information about the log transformer associated with this log group.
 *
 * This operation returns data only for transformers created at the log group level. To get
 * information for an account-level transformer, use DescribeAccountPolicies.
 */
export const getTransformer: API.OperationMethod<
  GetTransformerRequest,
  GetTransformerResponse,
  GetTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupIdentifier: 0 } },
  errors: [
    InvalidOperationException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTransformer",
})) as any;

export type ListAggregateLogGroupSummariesError =
  | InvalidParameterException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Returns an aggregate summary of all log groups in the Region grouped by specified data
 * source characteristics. Supports optional filtering by log group class, name patterns, and
 * data sources. If you perform this action in a monitoring account, you can also return
 * aggregated summaries of log groups from source accounts that are linked to the monitoring
 * account. For more information about using cross-account observability to set up monitoring
 * accounts and source accounts, see CloudWatch
 * cross-account observability.
 *
 * The operation aggregates log groups by data source name and type and optionally format,
 * providing counts of log groups that share these characteristics. The operation paginates
 * results. By default, it returns up to 50 results and includes a token to retrieve more
 * results.
 */
export const listAggregateLogGroupSummaries: API.PaginatedOperationMethod<
  ListAggregateLogGroupSummariesRequest,
  ListAggregateLogGroupSummariesResponse,
  ListAggregateLogGroupSummariesError,
  Credentials | HttpClient.HttpClient,
  AggregateLogGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      accountIdentifiers: 0,
      includeLinkedAccounts: 0,
      logGroupClass: 0,
      logGroupNamePattern: 0,
      dataSources: D.list(i_DataSourceFilter),
      groupBy: 0,
      nextToken: 0,
      limit: 0,
    },
  },
  errors: [
    InvalidParameterException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAggregateLogGroupSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "aggregateLogGroupSummaries",
    pageSize: "limit",
  } as const,
})) as any;

export type ListAnomaliesError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of anomalies that log anomaly detectors have found. For details about the
 * structure format of each anomaly object that is returned, see the example in this
 * section.
 */
export const listAnomalies: API.PaginatedOperationMethod<
  ListAnomaliesRequest,
  ListAnomaliesResponse,
  ListAnomaliesError,
  Credentials | HttpClient.HttpClient,
  Anomaly
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      anomalyDetectorArn: 0,
      suppressionState: 0,
      limit: 0,
      nextToken: 0,
    },
  },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnomalies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "anomalies",
    pageSize: "limit",
  } as const,
})) as any;

export type ListIntegrationsError =
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of integrations between CloudWatch Logs and other services in this
 * account. Currently, only one integration can be created in an account, and this integration
 * must be with OpenSearch Service.
 */
export const listIntegrations: API.OperationMethod<
  ListIntegrationsRequest,
  ListIntegrationsResponse,
  ListIntegrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      integrationNamePrefix: 0,
      integrationType: 0,
      integrationStatus: 0,
    },
  },
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegrations",
})) as any;

export type ListLogAnomalyDetectorsError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves a list of the log anomaly detectors in the account.
 */
export const listLogAnomalyDetectors: API.PaginatedOperationMethod<
  ListLogAnomalyDetectorsRequest,
  ListLogAnomalyDetectorsResponse,
  ListLogAnomalyDetectorsError,
  Credentials | HttpClient.HttpClient,
  AnomalyDetector
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { filterLogGroupArn: 0, limit: 0, nextToken: 0 },
  },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLogAnomalyDetectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "anomalyDetectors",
    pageSize: "limit",
  } as const,
})) as any;

export type ListLogGroupsError =
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of log groups in the Region in your account. If you are performing this
 * action in a monitoring account, you can choose to also return log groups from source accounts
 * that are linked to the monitoring account. For more information about using cross-account
 * observability to set up monitoring accounts and source accounts, see
 * CloudWatch cross-account observability.
 *
 * You can optionally filter the results by log group class, log group name pattern,
 * field indexes, data sources, field index names, or log group tags. If you specify more than
 * one filter type, the results include log groups that satisfy all filters.
 *
 * This operation is paginated. By default, your first use of this operation returns 50
 * results, and includes a token to use in a subsequent operation to return more results.
 */
export const listLogGroups: API.OperationMethod<
  ListLogGroupsRequest,
  ListLogGroupsResponse,
  ListLogGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupNamePattern: 0,
      logGroupClass: 0,
      includeLinkedAccounts: 0,
      accountIdentifiers: 0,
      nextToken: 0,
      limit: 0,
      dataSources: D.list(i_DataSourceFilter),
      fieldIndexNames: 0,
      logGroupTags: D.list({ key: 0, values: 0 }),
    },
  },
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLogGroups",
})) as any;

export type ListLogGroupsForQueryError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of the log groups that were analyzed during a single CloudWatch Logs
 * Insights query. This can be useful for queries that use log group name prefixes or the
 * `filterIndex` command, because the log groups are dynamically selected in these
 * cases.
 *
 * For more information about field indexes, see Create field indexes
 * to improve query performance and reduce costs.
 */
export const listLogGroupsForQuery: API.PaginatedOperationMethod<
  ListLogGroupsForQueryRequest,
  ListLogGroupsForQueryResponse,
  ListLogGroupsForQueryError,
  Credentials | HttpClient.HttpClient,
  LogGroupIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { queryId: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLogGroupsForQuery",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "logGroupIdentifiers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScheduledQueriesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all scheduled queries in your account and region. You can filter results by state to
 * show only enabled or disabled queries.
 */
export const listScheduledQueries: API.PaginatedOperationMethod<
  ListScheduledQueriesRequest,
  ListScheduledQueriesResponse,
  ListScheduledQueriesError,
  Credentials | HttpClient.HttpClient,
  ScheduledQuerySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, state: 0, scheduleType: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduledQueries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scheduledQueries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourcesForS3TableIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of data source associations for a specified S3 Table Integration, showing
 * which data sources are currently associated for query access.
 */
export const listSourcesForS3TableIntegration: API.PaginatedOperationMethod<
  ListSourcesForS3TableIntegrationRequest,
  ListSourcesForS3TableIntegrationResponse,
  ListSourcesForS3TableIntegrationError,
  Credentials | HttpClient.HttpClient,
  S3TableIntegrationSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { integrationArn: 0, maxResults: 0, nextToken: 0 },
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
  operationName: "ListSourcesForS3TableIntegration",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSyslogConfigurationsError =
  | AccessDeniedException
  | InvalidOperationException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of syslog configurations. You can optionally filter the results by log
 * group or VPC endpoint.
 */
export const listSyslogConfigurations: API.OperationMethod<
  ListSyslogConfigurationsRequest,
  ListSyslogConfigurationsResponse,
  ListSyslogConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupIdentifier: 0,
      vpcEndpointId: 0,
      nextToken: 0,
      maxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InvalidOperationException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSyslogConfigurations",
})) as any;

export type ListTagsForResourceError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Displays the tags associated with a CloudWatch Logs resource. Currently, log groups and
 * destinations support tagging.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTagsLogGroupError =
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * The ListTagsLogGroup operation is on the path to deprecation. We recommend that you use
 * ListTagsForResource instead.
 *
 * Lists the tags for the specified log group.
 */
export const listTagsLogGroup: API.OperationMethod<
  ListTagsLogGroupRequest,
  ListTagsLogGroupResponse,
  ListTagsLogGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupName: 0 } },
  errors: [ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsLogGroup",
})) as any;

export type PutAccountPolicyError =
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates an account-level data protection policy, subscription filter policy, field index
 * policy, transformer policy, or metric extraction policy that applies to all log groups, a
 * subset of log groups, or a data source name and type combination in the account.
 *
 * `PutAccountPolicy` is an account-wide administrative operation intended for
 * CloudWatch Logs administrators. Because it affects all log groups (or a broad subset) in
 * the account, you should grant `logs:PutAccountPolicy` permissions only to
 * administrators who manage logging configuration across the account, not to application teams
 * or individual log group owners.
 *
 * Conflict resolution between account-level and log-group-level
 * policies
 *
 * When both an account-level policy and a log-group-level policy of the same type apply to a
 * log group, the resolution depends on the policy type:
 *
 * - *Data protection* — The two policies are cumulative. Any sensitive
 * term specified in either the account-level or the log-group-level policy is masked.
 *
 * - *Subscription filters* — Account-level and log-group-level
 * subscription filters are additive. A log group can have up to 1 account-level and up to 2
 * log-group-level subscription filters.
 *
 * - *Transformers* — A log-group-level transformer overrides the
 * account-level transformer. If a log group has its own transformer, it ignores the
 * account-level transformer policy.
 *
 * - *Field index policies* — If a log group has its own field index
 * policy (created with `PutIndexPolicy`), any account-level policy that uses
 * `LogGroupNamePrefix` selection criteria or has no selection criteria is ignored
 * for that log group. However, account-level policies that use `DataSourceName`
 * and `DataSourceType` selection criteria still apply alongside the log-group-level
 * policy.
 *
 * - *Metric extraction policies* — Metric extraction policies are
 * account-level only and have no log-group-level equivalent, so no conflict resolution
 * applies.
 *
 * For field index policies, you can configure indexed fields as *facets*
 * to enable interactive exploration of your logs. Facets provide value distributions and counts
 * for indexed fields in the CloudWatch Logs Insights console without requiring query
 * execution. For more information, see Use facets to group and
 * explore logs.
 *
 * To use this operation, you must be signed on with the correct permissions depending on the
 * type of policy that you are creating.
 *
 * - To create a data protection policy, you must have the
 * `logs:PutDataProtectionPolicy` and `logs:PutAccountPolicy`
 * permissions.
 *
 * - To create a subscription filter policy, you must have the
 * `logs:PutSubscriptionFilter` and `logs:PutAccountPolicy`
 * permissions.
 *
 * - To create a transformer policy, you must have the `logs:PutTransformer` and
 * `logs:PutAccountPolicy` permissions.
 *
 * - To create a field index policy, you must have the `logs:PutIndexPolicy` and
 * `logs:PutAccountPolicy` permissions.
 *
 * - To configure facets for field index policies, you must have the
 * `logs:PutIndexPolicy` and `logs:PutAccountPolicy`
 * permissions.
 *
 * - To create a metric extraction policy, you must have the
 * `logs:PutMetricExtractionPolicy` and `logs:PutAccountPolicy`
 * permissions.
 *
 * **Data protection policy**
 *
 * A data protection policy can help safeguard sensitive data that's ingested by your log
 * groups by auditing and masking the sensitive log data. Each account can have only one
 * account-level data protection policy.
 *
 * Sensitive data is detected and masked when it is ingested into a log group. When you set
 * a data protection policy, log events ingested into the log groups before that time are not
 * masked.
 *
 * If you use `PutAccountPolicy` to create a data protection policy for your whole
 * account, it applies to both existing log groups and all log groups that are created later in
 * this account. The account-level policy is applied to existing log groups with eventual
 * consistency. It might take up to 5 minutes before sensitive data in existing log groups begins
 * to be masked.
 *
 * By default, when a user views a log event that includes masked data, the sensitive data is
 * replaced by asterisks. A user who has the `logs:Unmask` permission can use a GetLogEvents or FilterLogEvents operation with the `unmask` parameter set to
 * `true` to view the unmasked log events. Users with the `logs:Unmask`
 * can also view unmasked data in the CloudWatch Logs console by running a CloudWatch Logs
 * Insights query with the `unmask` query command.
 *
 * For more information, including a list of types of data that can be audited and masked,
 * see Protect sensitive log data
 * with masking.
 *
 * To use the `PutAccountPolicy` operation for a data protection policy, you must
 * be signed on with the `logs:PutDataProtectionPolicy` and
 * `logs:PutAccountPolicy` permissions.
 *
 * The `PutAccountPolicy` operation applies to all log groups in the account. You
 * can use PutDataProtectionPolicy to create a data protection policy that applies to just one
 * log group. If a log group has its own data protection policy and the account also has an
 * account-level data protection policy, then the two policies are cumulative. Any sensitive term
 * specified in either policy is masked.
 *
 * **Subscription filter policy**
 *
 * A subscription filter policy sets up a real-time feed of log events from CloudWatch Logs to other Amazon Web Services services. Account-level subscription filter policies apply to
 * both existing log groups and log groups that are created later in this account. Supported
 * destinations are Kinesis Data Streams, Firehose, and Lambda. When log
 * events are sent to the receiving service, they are Base64 encoded and compressed with the GZIP
 * format.
 *
 * The following destinations are supported for subscription filters:
 *
 * - An Kinesis Data Streams data stream in the same account as the subscription policy, for
 * same-account delivery.
 *
 * - An Firehose data stream in the same account as the subscription policy, for
 * same-account delivery.
 *
 * - A Lambda function in the same account as the subscription policy, for
 * same-account delivery.
 *
 * - A logical destination in a different account created with PutDestination, for cross-account delivery. Kinesis Data Streams and Firehose are supported as logical destinations.
 *
 * Each account can have one account-level subscription filter policy per Region. If you are
 * updating an existing filter, you must specify the correct name in `PolicyName`. To
 * perform a `PutAccountPolicy` subscription filter operation for any destination
 * except a Lambda function, you must also have the `iam:PassRole`
 * permission.
 *
 * **Transformer policy**
 *
 * Creates or updates a *log transformer policy* for your account. You use
 * log transformers to transform log events into a different format, making them easier for you
 * to process and analyze. You can also transform logs from different sources into standardized
 * formats that contain relevant, source-specific information. After you have created a
 * transformer, CloudWatch Logs performs this transformation at the time of log ingestion. You
 * can then refer to the transformed versions of the logs during operations such as querying with
 * CloudWatch Logs Insights or creating metric filters or subscription filters.
 *
 * You can also use a transformer to copy metadata from metadata keys into the log events
 * themselves. This metadata can include log group name, log stream name, account ID and
 * Region.
 *
 * A transformer for a log group is a series of processors, where each processor applies one
 * type of transformation to the log events ingested into this log group. For more information
 * about the available processors to use in a transformer, see Processors that you can use.
 *
 * Having log events in standardized format enables visibility across your applications for
 * your log analysis, reporting, and alarming needs. CloudWatch Logs provides transformation
 * for common log types with out-of-the-box transformation templates for major Amazon Web Services
 * log sources such as VPC flow logs, Lambda, and Amazon RDS. You can use
 * pre-built transformation templates or create custom transformation policies.
 *
 * You can create transformers only for the log groups in the Standard log class.
 *
 * You can have one account-level transformer policy that applies to all log groups in the
 * account. Or you can create as many as 20 account-level transformer policies that are each
 * scoped to a subset of log groups with the `selectionCriteria` parameter. If you
 * have multiple account-level transformer policies with selection criteria, no two of them can
 * use the same or overlapping log group name prefixes. For example, if you have one policy
 * filtered to log groups that start with `my-log`, you can't have another transformer
 * policy filtered to `my-logpprod` or `my-logging`.
 *
 * You can also set up a transformer at the log-group level. For more information, see PutTransformer. If there is both a log-group level transformer created with
 * `PutTransformer` and an account-level transformer that could apply to the same
 * log group, the log group uses only the log-group level transformer. It ignores the
 * account-level transformer.
 *
 * **Field index policy**
 *
 * You can use field index policies to create indexes on fields found in log events for a log
 * group or data source name and type combination. Creating field indexes can help lower the scan
 * volume for CloudWatch Logs Insights queries that reference those fields, because these
 * queries attempt to skip the processing of log events that are known to not match the indexed
 * field. Good fields to index are fields that you often need to query for and fields or values
 * that match only a small fraction of the total log events. Common examples of indexes include
 * request ID, session ID, user IDs, or instance IDs. For more information, see Create field indexes to improve query performance and reduce costs
 *
 * To find the fields that are in your log group events, use the GetLogGroupFields operation. To find the fields for a data source use the GetLogFields operation.
 *
 * For example, suppose you have created a field index for `requestId`. Then, any
 * CloudWatch Logs Insights query on that log group that includes requestId =
 * *value*
 * or requestId in [*value*,
 * *value*, ...] will attempt to process only the log events where
 * the indexed field matches the specified value.
 *
 * Matches of log events to the names of indexed fields are case-sensitive. For example, an
 * indexed field of `RequestId` won't match a log event containing
 * `requestId`.
 *
 * You can have one account-level field index policy that applies to all log groups in the
 * account. Or you can create as many as 20 account-level field index policies that are each
 * scoped to a subset of log groups using `LogGroupNamePrefix` with the
 * `selectionCriteria` parameter. You can have another 20 account-level field index
 * policies using `DataSourceName` and `DataSourceType` for the
 * `selectionCriteria` parameter. If you have multiple account-level index policies
 * with `LogGroupNamePrefix` selection criteria, no two of them can use the same or
 * overlapping log group name prefixes. For example, if you have one policy filtered to log
 * groups that start with *my-log*, you can't have another field index policy
 * filtered to *my-logpprod* or *my-logging*. Similarly, if
 * you have multiple account-level index policies with `DataSourceName` and
 * `DataSourceType` selection criteria, no two of them can use the same data source
 * name and type combination. For example, if you have one policy filtered to the data source
 * name `amazon_vpc` and data source type `flow` you cannot create another
 * policy with this combination.
 *
 * If you create an account-level field index policy in a monitoring account in cross-account
 * observability, the policy is applied only to the monitoring account and not to any source
 * accounts.
 *
 * CloudWatch Logs provides default field indexes for all log groups in the Standard log
 * class. Default field indexes are automatically available for the following fields:
 *
 * - `@logStream`
 *
 * - `@aws.region`
 *
 * - `@aws.account`
 *
 * - `@source.log`
 *
 * - `@data_source_name`
 *
 * - `@data_source_type`
 *
 * - `@data_format`
 *
 * - `traceId`
 *
 * - `severityText`
 *
 * - `attributes.session.id`
 *
 * CloudWatch Logs provides default field indexes for certain data source name and type
 * combinations as well. Default field indexes are automatically available for the following data
 * source name and type combinations as identified in the following list:
 *
 * `amazon_vpc.flow`
 *
 * - `action`
 *
 * - `logStatus`
 *
 * - `region`
 *
 * - `flowDirection`
 *
 * - `type`
 *
 * `amazon_route53.resolver_query`
 *
 * - `transport`
 *
 * - `rcode`
 *
 * `aws_waf.access`
 *
 * - `action`
 *
 * - `httpRequest.country`
 *
 * `aws_cloudtrail.data`, `aws_cloudtrail.management`
 *
 * - `eventSource`
 *
 * - `eventName`
 *
 * - `awsRegion`
 *
 * - `userAgent`
 *
 * - `errorCode`
 *
 * - `eventType`
 *
 * - `managementEvent`
 *
 * - `readOnly`
 *
 * - `eventCategory`
 *
 * - `requestId`
 *
 * Default field indexes are in addition to any custom field indexes you define within your
 * policy. Default field indexes are not counted towards your field index
 * quota.
 *
 * If you want to create a field index policy for a single log group, you can use PutIndexPolicy instead of `PutAccountPolicy`. If you do so, that log
 * group will use that log-group level policy and any account-level policies that match at the
 * data source level; any account-level policy that matches at the log group level (for example,
 * no selection criteria or log group name prefix selection criteria) will be ignored.
 *
 * **Metric extraction policy**
 *
 * A metric extraction policy controls whether CloudWatch Metrics can be created through the
 * Embedded Metrics Format (EMF) for log groups in your account. By default, EMF metric creation
 * is enabled for all log groups. You can use metric extraction policies to disable EMF metric
 * creation for your entire account or specific log groups.
 *
 * When a policy disables EMF metric creation for a log group, log events in the EMF format
 * are still ingested, but no CloudWatch Metrics are created from them.
 *
 * Creating a policy disables metrics for Amazon Web Services features that use EMF to create metrics, such
 * as CloudWatch Container Insights and CloudWatch Application Signals. To prevent turning off
 * those features by accident, we recommend that you exclude the underlying log-groups through
 * a selection-criteria such as LogGroupNamePrefix NOT IN ["/aws/containerinsights",
 * "/aws/ecs/containerinsights", "/aws/application-signals/data"].
 *
 * Each account can have either one account-level metric extraction policy that applies to
 * all log groups, or up to 5 policies that are each scoped to a subset of log groups with the
 * `selectionCriteria` parameter. The selection criteria supports filtering by
 * `LogGroupName` and `LogGroupNamePrefix` using the operators
 * `IN` and `NOT IN`. You can specify up to 50 values in each
 * `IN` or `NOT IN` list.
 *
 * The selection criteria can be specified in these formats:
 *
 * `LogGroupName IN ["log-group-1", "log-group-2"]`
 *
 * `LogGroupNamePrefix NOT IN ["/aws/prefix1", "/aws/prefix2"]`
 *
 * If you have multiple account-level metric extraction policies with selection criteria, no
 * two of them can have overlapping criteria. For example, if you have one policy with selection
 * criteria `LogGroupNamePrefix IN ["my-log"]`, you can't have another metric
 * extraction policy with selection criteria `LogGroupNamePrefix IN ["/my-log-prod"]`
 * or `LogGroupNamePrefix IN ["/my-logging"]`, as the set of log groups matching these
 * prefixes would be a subset of the log groups matching the first policy's prefix, creating an
 * overlap.
 *
 * When using `NOT IN`, only one policy with this operator is allowed per
 * account.
 *
 * When combining policies with `IN` and `NOT IN` operators, the
 * overlap check ensures that policies don't have conflicting effects. Two policies with
 * `IN` and `NOT IN` operators do not overlap if and only if every value
 * in the `IN `policy is completely contained within some value in the NOT
 * IN policy. For example:
 *
 * - If you have a `NOT IN` policy for prefix `"/aws/lambda"`, you
 * can create an `IN` policy for the exact log group name
 * `"/aws/lambda/function1"` because the set of log groups matching
 * `"/aws/lambda/function1"` is a subset of the log groups matching
 * `"/aws/lambda"`.
 *
 * - If you have a `NOT IN` policy for prefix `"/aws/lambda"`, you
 * cannot create an `IN` policy for prefix `"/aws"` because the set of
 * log groups matching `"/aws"` is not a subset of the log groups matching
 * `"/aws/lambda"`.
 */
export const putAccountPolicy: API.OperationMethod<
  PutAccountPolicyRequest,
  PutAccountPolicyResponse,
  PutAccountPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      policyName: 0,
      policyDocument: 0,
      policyType: 0,
      scope: 0,
      selectionCriteria: 0,
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountPolicy",
})) as any;

export type PutBearerTokenAuthenticationError =
  | AccessDeniedException
  | InvalidOperationException
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Enables or disables bearer token authentication for the specified log group. When enabled on a
 * log group, bearer token authentication is enabled on operations until it is explicitly
 * disabled.
 *
 * For information about the parameters that are common to all actions, see Common Parameters.
 */
export const putBearerTokenAuthentication: API.OperationMethod<
  PutBearerTokenAuthenticationRequest,
  PutBearerTokenAuthenticationResponse,
  PutBearerTokenAuthenticationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { logGroupIdentifier: 0, bearerTokenAuthenticationEnabled: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidOperationException,
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBearerTokenAuthentication",
})) as any;

export type PutDataProtectionPolicyError =
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a data protection policy for the specified log group. A data protection policy can
 * help safeguard sensitive data that's ingested by the log group by auditing and masking the
 * sensitive log data.
 *
 * Sensitive data is detected and masked when it is ingested into the log group. When you
 * set a data protection policy, log events ingested into the log group before that time are
 * not masked.
 *
 * By default, when a user views a log event that includes masked data, the sensitive data is
 * replaced by asterisks. A user who has the `logs:Unmask` permission can use a GetLogEvents or FilterLogEvents operation with the `unmask` parameter set to
 * `true` to view the unmasked log events. Users with the `logs:Unmask`
 * can also view unmasked data in the CloudWatch Logs console by running a CloudWatch Logs
 * Insights query with the `unmask` query command.
 *
 * For more information, including a list of types of data that can be audited and masked,
 * see Protect sensitive log data
 * with masking.
 *
 * The `PutDataProtectionPolicy` operation applies to only the specified log
 * group. You can also use PutAccountPolicy to create an account-level data protection policy that applies to
 * all log groups in the account, including both existing log groups and log groups that are
 * created level. If a log group has its own data protection policy and the account also has an
 * account-level data protection policy, then the two policies are cumulative. Any sensitive term
 * specified in either policy is masked.
 */
export const putDataProtectionPolicy: API.OperationMethod<
  PutDataProtectionPolicyRequest,
  PutDataProtectionPolicyResponse,
  PutDataProtectionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { logGroupIdentifier: 0, policyDocument: 0 },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataProtectionPolicy",
})) as any;

export type PutDeliveryDestinationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a logical *delivery destination*. A delivery
 * destination is an Amazon Web Services resource that represents an Amazon Web Services service
 * that logs can be sent to. CloudWatch Logs, Amazon S3, and Firehose are
 * supported as logs delivery destinations and X-Ray as the trace delivery
 * destination.
 *
 * To configure logs delivery between a supported Amazon Web Services service and a
 * destination, you must do the following:
 *
 * - Create a delivery source, which is a logical object that represents the resource that
 * is actually sending the logs. For more information, see PutDeliverySource.
 *
 * - Use `PutDeliveryDestination` to create a delivery
 * destination in the same account of the actual delivery destination. The
 * delivery destination that you create is a logical object that represents the actual
 * delivery destination.
 *
 * - If you are delivering logs cross-account, you must use PutDeliveryDestinationPolicy in the destination account to assign an IAM policy to the destination. This policy allows delivery to that destination.
 *
 * - Use `CreateDelivery` to create a *delivery* by pairing
 * exactly one delivery source and one delivery destination. For more information, see CreateDelivery.
 *
 * You can configure a single delivery source to send logs to multiple destinations by
 * creating multiple deliveries. You can also create multiple deliveries to configure multiple
 * delivery sources to send logs to the same delivery destination.
 *
 * Only some Amazon Web Services services support being configured as a delivery source. These
 * services are listed as **Supported [V2 Permissions]** in the
 * table at Enabling logging from
 * Amazon Web Services services.
 *
 * If you use this operation to update an existing delivery destination, all the current
 * delivery destination parameters are overwritten with the new parameter values that you
 * specify.
 */
export const putDeliveryDestination: API.OperationMethod<
  PutDeliveryDestinationRequest,
  PutDeliveryDestinationResponse,
  PutDeliveryDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      outputFormat: 0,
      deliveryDestinationConfiguration: { destinationResourceArn: 0 },
      deliveryDestinationType: 0,
      tags: 0,
    },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDeliveryDestination",
})) as any;

export type PutDeliveryDestinationPolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Creates and assigns an IAM policy that grants permissions to CloudWatch Logs to deliver logs cross-account to a specified destination in this account. To
 * configure the delivery of logs from an Amazon Web Services service in another account to a logs
 * delivery destination in the current account, you must do the following:
 *
 * - Create a delivery source, which is a logical object that represents the resource that
 * is actually sending the logs. For more information, see PutDeliverySource.
 *
 * - Create a *delivery destination*, which is a logical object that
 * represents the actual delivery destination. For more information, see PutDeliveryDestination.
 *
 * - Use this operation in the destination account to assign an IAM policy
 * to the destination. This policy allows delivery to that destination.
 *
 * - Create a *delivery* by pairing exactly one delivery source and one
 * delivery destination. For more information, see CreateDelivery.
 *
 * Only some Amazon Web Services services support being configured as a delivery source. These
 * services are listed as **Supported [V2 Permissions]** in the
 * table at Enabling logging from
 * Amazon Web Services services.
 *
 * The contents of the policy must include two statements. One statement enables general logs
 * delivery, and the other allows delivery to the chosen destination. See the examples for the
 * needed policies.
 */
export const putDeliveryDestinationPolicy: API.OperationMethod<
  PutDeliveryDestinationPolicyRequest,
  PutDeliveryDestinationPolicyResponse,
  PutDeliveryDestinationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deliveryDestinationName: 0, deliveryDestinationPolicy: 0 },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDeliveryDestinationPolicy",
})) as any;

export type PutDeliverySourceError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a logical *delivery source*. A delivery source
 * represents an Amazon Web Services resource that sends logs to an logs delivery destination. The
 * destination can be CloudWatch Logs, Amazon S3, Firehose or X-Ray for sending traces.
 *
 * To configure logs delivery between a delivery destination and an Amazon Web Services
 * service that is supported as a delivery source, you must do the following:
 *
 * - Use `PutDeliverySource` to create a delivery source, which is a logical
 * object that represents the resource that is actually sending the logs.
 *
 * - Use `PutDeliveryDestination` to create a delivery
 * destination, which is a logical object that represents the actual delivery
 * destination. For more information, see PutDeliveryDestination.
 *
 * - If you are delivering logs cross-account, you must use PutDeliveryDestinationPolicy in the destination account to assign an IAM policy to the destination. This policy allows delivery to that destination.
 *
 * - Use `CreateDelivery` to create a *delivery* by pairing
 * exactly one delivery source and one delivery destination. For more information, see CreateDelivery.
 *
 * You can configure a single delivery source to send logs to multiple destinations by
 * creating multiple deliveries. You can also create multiple deliveries to configure multiple
 * delivery sources to send logs to the same delivery destination.
 *
 * Only some Amazon Web Services services support being configured as a delivery source. These
 * services are listed as **Supported [V2 Permissions]** in the
 * table at Enabling logging from
 * Amazon Web Services services.
 *
 * If you use this operation to update an existing delivery source, all the current delivery
 * source parameters are overwritten with the new parameter values that you specify.
 */
export const putDeliverySource: API.OperationMethod<
  PutDeliverySourceRequest,
  PutDeliverySourceResponse,
  PutDeliverySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      resourceArn: 0,
      logType: 0,
      tags: 0,
      deliverySourceConfiguration: 0,
    },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDeliverySource",
})) as any;

export type PutDestinationError =
  | InvalidParameterException
  | OperationAbortedException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates or updates a destination. This operation is used only to create destinations
 * for cross-account subscriptions.
 *
 * A destination encapsulates a physical resource (such as an Amazon Kinesis stream). With
 * a destination, you can subscribe to a real-time stream of log events for a different account,
 * ingested using PutLogEvents.
 *
 * Through an access policy, a destination controls what is written to it. By default,
 * `PutDestination` does not set any access policy with the destination, which means
 * a cross-account user cannot call PutSubscriptionFilter against this destination. To enable this, the destination
 * owner must call PutDestinationPolicy after `PutDestination`.
 *
 * To perform a `PutDestination` operation, you must also have the
 * `iam:PassRole` permission.
 */
export const putDestination: API.OperationMethod<
  PutDestinationRequest,
  PutDestinationResponse,
  PutDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { destinationName: 0, targetArn: 0, roleArn: 0, tags: 0 },
  },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDestination",
})) as any;

export type PutDestinationPolicyError =
  | InvalidParameterException
  | OperationAbortedException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates or updates an access policy associated with an existing destination. An access
 * policy is an IAM
 * policy document that is used to authorize claims to register a subscription filter
 * against a given destination.
 */
export const putDestinationPolicy: API.OperationMethod<
  PutDestinationPolicyRequest,
  PutDestinationPolicyResponse,
  PutDestinationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { destinationName: 0, accessPolicy: 0, forceUpdate: 0 },
  },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDestinationPolicy",
})) as any;

export type PutIndexPolicyError =
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates or updates a *field index policy* for the specified log group.
 * Only log groups in the Standard log class support field index policies. For more information
 * about log classes, see Log
 * classes.
 *
 * You can use field index policies to create *field indexes* on fields
 * found in log events in the log group. Creating field indexes speeds up and lowers the costs
 * for CloudWatch Logs Insights queries that reference those field indexes, because these
 * queries attempt to skip the processing of log events that are known to not match the indexed
 * field. Good fields to index are fields that you often need to query for and fields or values
 * that match only a small fraction of the total log events. Common examples of indexes include
 * request ID, session ID, userID, and instance IDs. For more information, see Create field indexes to improve query performance and reduce costs.
 *
 * You can configure indexed fields as *facets* to enable interactive
 * exploration and filtering of your logs in the CloudWatch Logs Insights console. Facets
 * allow you to view value distributions and counts for indexed fields without running queries.
 * When you create a field index, you can optionally set it as a facet to enable this interactive
 * analysis capability. For more information, see Use facets to group and
 * explore logs.
 *
 * To find the fields that are in your log group events, use the GetLogGroupFields operation.
 *
 * For example, suppose you have created a field index for `requestId`. Then, any
 * CloudWatch Logs Insights query on that log group that includes requestId =
 * *value*
 * or requestId IN [*value*,
 * *value*, ...] will process fewer log events to reduce costs, and
 * have improved performance.
 *
 * CloudWatch Logs provides default field indexes for all log groups in the Standard log
 * class. Default field indexes are automatically available for the following fields:
 *
 * - `@logStream`
 *
 * - `@aws.region`
 *
 * - `@aws.account`
 *
 * - `@source.log`
 *
 * - `traceId`
 *
 * Default field indexes are in addition to any custom field indexes you define within your
 * policy. Default field indexes are not counted towards your field index quota.
 *
 * Each index policy has the following quotas and restrictions:
 *
 * - As many as 20 fields can be included in the policy.
 *
 * - Each field name can include as many as 100 characters.
 *
 * Matches of log events to the names of indexed fields are case-sensitive. For example, a
 * field index of `RequestId` won't match a log event containing
 * `requestId`.
 *
 * Log group-level field index policies created with `PutIndexPolicy` override
 * account-level field index policies created with PutAccountPolicy that apply to log groups. If you use `PutIndexPolicy`
 * to create a field index policy for a log group, that log group uses only that policy for log
 * group-level indexing, including any facet configurations. The log group ignores any
 * account-wide field index policy that applies to log groups, but data source-based account
 * policies may still apply.
 */
export const putIndexPolicy: API.OperationMethod<
  PutIndexPolicyRequest,
  PutIndexPolicyResponse,
  PutIndexPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { logGroupIdentifier: 0, policyDocument: 0 },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIndexPolicy",
})) as any;

export type PutIntegrationError =
  | InvalidParameterException
  | LimitExceededException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Creates an integration between CloudWatch Logs and another service in this account.
 * Currently, only integrations with OpenSearch Service are supported, and currently you can have
 * only one integration in your account.
 *
 * Integrating with OpenSearch Service makes it possible for you to create curated vended
 * logs dashboards, powered by OpenSearch Service analytics. For more information, see Vended log
 * dashboards powered by Amazon OpenSearch Service.
 *
 * You can use this operation only to create a new integration. You can't modify an existing
 * integration.
 */
export const putIntegration: API.OperationMethod<
  PutIntegrationRequest,
  PutIntegrationResponse,
  PutIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      integrationName: 0,
      resourceConfig: {
        openSearchResourceConfig: {
          kmsKeyArn: 0,
          dataSourceRoleArn: 0,
          dashboardViewerPrincipals: 0,
          applicationArn: 0,
          retentionDays: 0,
        },
      },
      integrationType: 0,
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIntegration",
})) as any;

export type PutLogEventsError =
  | DataAlreadyAcceptedException
  | InvalidParameterException
  | InvalidSequenceTokenException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | UnrecognizedClientException
  | CommonErrors;
/**
 * Uploads a batch of log events to the specified log stream.
 *
 * The sequence token is now ignored in `PutLogEvents` actions.
 * `PutLogEvents` actions are always accepted and never return
 * `InvalidSequenceTokenException` or `DataAlreadyAcceptedException`
 * even if the sequence token is not valid. You can use parallel `PutLogEvents`
 * actions on the same log stream.
 *
 * The batch of events must satisfy the following constraints:
 *
 * - The maximum batch size is 1,048,576 bytes. This size is calculated as the sum of
 * all event messages in UTF-8, plus 26 bytes for each log event.
 *
 * - Events more than 2 hours in the future are rejected while processing remaining
 * valid events.
 *
 * - Events older than 14 days or preceding the log group's retention period are
 * rejected while processing remaining valid events.
 *
 * - The log events in the batch must be in chronological order by their timestamp. The
 * timestamp is the time that the event occurred, expressed as the number of milliseconds
 * after `Jan 1, 1970 00:00:00 UTC`. (In Amazon Web Services Tools for PowerShell
 * and the Amazon Web Services SDK for .NET, the timestamp is specified in .NET format:
 * `yyyy-mm-ddThh:mm:ss`. For example, `2017-09-15T13:45:30`.)
 *
 * - A batch of log events in a single request must be in a chronological order.
 * Otherwise, the operation fails.
 *
 * - Each log event can be no larger than 1 MB.
 *
 * - The maximum number of log events in a batch is 10,000.
 *
 * - For valid events (within 14 days in the past to 2 hours in future), the time span
 * in a single batch cannot exceed 24 hours. Otherwise, the operation fails.
 *
 * The quota of five requests per second per log stream has been removed. Instead,
 * `PutLogEvents` actions are throttled based on a per-second per-account quota.
 * You can request an increase to the per-second throttling quota by using the Service Quotas service.
 *
 * If a call to `PutLogEvents` returns "UnrecognizedClientException" the most
 * likely cause is a non-valid Amazon Web Services access key ID or secret key.
 */
export const putLogEvents: API.OperationMethod<
  PutLogEventsRequest,
  PutLogEventsResponse,
  PutLogEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupName: 0,
      logStreamName: 0,
      logEvents: D.list({ timestamp: 0, message: 0 }),
      sequenceToken: 0,
      entity: { keyAttributes: 0, attributes: 0 },
    },
  },
  errors: [
    DataAlreadyAcceptedException,
    InvalidParameterException,
    InvalidSequenceTokenException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    UnrecognizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLogEvents",
})) as any;

export type PutLogGroupDeletionProtectionError =
  | AccessDeniedException
  | InvalidOperationException
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Enables or disables deletion protection for the specified log group. When enabled on a
 * log group, deletion protection blocks all deletion operations until it is explicitly
 * disabled.
 *
 * For information about the parameters that are common to all actions, see Common Parameters.
 */
export const putLogGroupDeletionProtection: API.OperationMethod<
  PutLogGroupDeletionProtectionRequest,
  PutLogGroupDeletionProtectionResponse,
  PutLogGroupDeletionProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { logGroupIdentifier: 0, deletionProtectionEnabled: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidOperationException,
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLogGroupDeletionProtection",
})) as any;

export type PutMetricFilterError =
  | InvalidOperationException
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates or updates a metric filter and associates it with the specified log group. With
 * metric filters, you can configure rules to extract metric data from log events ingested
 * through PutLogEvents.
 *
 * The maximum number of metric filters that can be associated with a log group is
 * 100.
 *
 * Using regular expressions in filter patterns is supported. For these filters, there is a
 * quota of two regular expression patterns within a single filter pattern. There is also a quota
 * of five regular expression patterns per log group. For more information about using regular
 * expressions in filter patterns, see Filter pattern syntax for
 * metric filters, subscription filters, filter log events, and Live Tail.
 *
 * When you create a metric filter, you can also optionally assign a unit and dimensions to
 * the metric that is created.
 *
 * Metrics extracted from log events are charged as custom metrics. To prevent unexpected
 * high charges, do not specify high-cardinality fields such as `IPAddress` or
 * `requestID` as dimensions. Each different value found for a dimension is
 * treated as a separate metric and accrues charges as a separate custom metric.
 *
 * CloudWatch Logs might disable a metric filter if it generates 1,000 different
 * name/value pairs for your specified dimensions within one hour.
 *
 * You can also set up a billing alarm to alert you if your charges are higher than
 * expected. For more information, see
 * Creating a Billing Alarm to Monitor Your Estimated Amazon Web Services Charges.
 */
export const putMetricFilter: API.OperationMethod<
  PutMetricFilterRequest,
  PutMetricFilterResponse,
  PutMetricFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupName: 0,
      filterName: 0,
      filterPattern: 0,
      metricTransformations: D.list({
        metricName: 0,
        metricNamespace: 0,
        metricValue: 0,
        defaultValue: 0,
        dimensions: 0,
        unit: 0,
      }),
      applyOnTransformedLogs: 0,
      fieldSelectionCriteria: 0,
      emitSystemFieldDimensions: 0,
    },
  },
  errors: [
    InvalidOperationException,
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricFilter",
})) as any;

export type PutQueryDefinitionError =
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates or updates a query definition for CloudWatch Logs Insights. For more information,
 * see Analyzing Log Data with CloudWatch Logs Insights.
 *
 * To update a query definition, specify its `queryDefinitionId` in your request.
 * The values of `name`, `queryString`, and `logGroupNames` are
 * changed to the values that you specify in your update operation. No current values are
 * retained from the current query definition. For example, imagine updating a current query
 * definition that includes log groups. If you don't specify the `logGroupNames`
 * parameter in your update operation, the query definition changes to contain no log
 * groups.
 *
 * You must have the `logs:PutQueryDefinition` permission to be able to perform
 * this operation.
 */
export const putQueryDefinition: API.OperationMethod<
  PutQueryDefinitionRequest,
  PutQueryDefinitionResponse,
  PutQueryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      queryLanguage: 0,
      name: 0,
      queryDefinitionId: 0,
      logGroupNames: 0,
      queryString: 0,
      clientToken: D.m({ idempotency: true }),
      parameters: D.list({ name: 0, defaultValue: 0, description: 0 }),
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutQueryDefinition",
})) as any;

export type PutResourcePolicyError =
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates or updates a resource policy allowing other Amazon Web Services services to put
 * log events to this account, such as Amazon Route 53. This API has the following
 * restrictions:
 *
 * - **Supported actions** - Policy only supports
 * `logs:PutLogEvents` and `logs:CreateLogStream ` actions
 *
 * - **Supported principals** - Policy only applies when
 * operations are invoked by Amazon Web Services service principals (not IAM
 * users, roles, or cross-account principals
 *
 * - **Policy limits** - An account can have a maximum of 10
 * policies without resourceARN and one per LogGroup resourceARN
 *
 * Resource policies with actions invoked by non-Amazon Web Services service principals
 * (such as IAM users, roles, or other Amazon Web Services accounts) will not be
 * enforced. For access control involving these principals, use the IAM
 * policies.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      policyName: 0,
      policyDocument: 0,
      resourceArn: 0,
      expectedRevisionId: 0,
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type PutRetentionPolicyError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Sets the retention of the specified log group. With a retention policy, you can
 * configure the number of days for which to retain log events in the specified log
 * group.
 *
 * CloudWatch Logs doesn't immediately delete log events when they reach their retention
 * setting. It typically takes up to 72 hours after that before log events are deleted, but in
 * rare situations might take longer.
 *
 * To illustrate, imagine that you change a log group to have a longer retention setting
 * when it contains log events that are past the expiration date, but haven't been deleted.
 * Those log events will take up to 72 hours to be deleted after the new retention date is
 * reached. To make sure that log data is deleted permanently, keep a log group at its lower
 * retention setting until 72 hours after the previous retention period ends. Alternatively,
 * wait to change the retention setting until you confirm that the earlier log events are
 * deleted.
 *
 * When log events reach their retention setting they are marked for deletion. After they
 * are marked for deletion, they do not add to your archival storage costs anymore, even if
 * they are not actually deleted until later. These log events marked for deletion are also not
 * included when you use an API to retrieve the `storedBytes` value to see how many
 * bytes a log group is storing.
 */
export const putRetentionPolicy: API.OperationMethod<
  PutRetentionPolicyRequest,
  PutRetentionPolicyResponse,
  PutRetentionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupName: 0, retentionInDays: 0 } },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRetentionPolicy",
})) as any;

export type PutStorageTierPolicyError =
  | AccessDeniedException
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Sets the storage tier policy for the account. When you set the storage tier to
 * `INTELLIGENT_TIERING`, the service automatically moves log data to the most
 * cost-effective storage tier based on access frequency.
 */
export const putStorageTierPolicy: API.OperationMethod<
  PutStorageTierPolicyRequest,
  PutStorageTierPolicyResponse,
  PutStorageTierPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { storageTier: 0 } },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutStorageTierPolicy",
})) as any;

export type PutSubscriptionFilterError =
  | InvalidOperationException
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates or updates a subscription filter and associates it with the specified log
 * group. With subscription filters, you can subscribe to a real-time stream of log events
 * ingested through PutLogEvents
 * and have them delivered to a specific destination. When log events are sent to the receiving
 * service, they are Base64 encoded and compressed with the GZIP format.
 *
 * The following destinations are supported for subscription filters:
 *
 * - An Amazon Kinesis data stream belonging to the same account as the subscription
 * filter, for same-account delivery.
 *
 * - A logical destination created with PutDestination that belongs to a different account, for cross-account delivery.
 * We currently support Kinesis Data Streams and Firehose as logical
 * destinations.
 *
 * - An Amazon Kinesis Data Firehose delivery stream that belongs to the same account as
 * the subscription filter, for same-account delivery.
 *
 * - An Lambda function that belongs to the same account as the
 * subscription filter, for same-account delivery.
 *
 * Each log group can have up to two subscription filters associated with it. If you are
 * updating an existing filter, you must specify the correct name in `filterName`.
 *
 * Using regular expressions in filter patterns is supported. For these filters, there is a
 * quotas of quota of two regular expression patterns within a single filter pattern. There is
 * also a quota of five regular expression patterns per log group. For more information about
 * using regular expressions in filter patterns, see Filter pattern syntax for
 * metric filters, subscription filters, filter log events, and Live Tail.
 *
 * To perform a `PutSubscriptionFilter` operation for any destination except a
 * Lambda function, you must also have the `iam:PassRole`
 * permission.
 */
export const putSubscriptionFilter: API.OperationMethod<
  PutSubscriptionFilterRequest,
  PutSubscriptionFilterResponse,
  PutSubscriptionFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupName: 0,
      filterName: 0,
      filterPattern: 0,
      destinationArn: 0,
      roleArn: 0,
      distribution: 0,
      applyOnTransformedLogs: 0,
      fieldSelectionCriteria: 0,
      emitSystemFields: 0,
    },
  },
  errors: [
    InvalidOperationException,
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSubscriptionFilter",
})) as any;

export type PutSyslogConfigurationError =
  | AccessDeniedException
  | InvalidOperationException
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates a syslog configuration for a log group. This enables ingestion of
 * syslog data through the specified VPC endpoint into the log group.
 */
export const putSyslogConfiguration: API.OperationMethod<
  PutSyslogConfigurationRequest,
  PutSyslogConfigurationResponse,
  PutSyslogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { logGroupIdentifier: 0, vpcEndpointId: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidOperationException,
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSyslogConfiguration",
})) as any;

export type PutTransformerError =
  | InvalidOperationException
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates or updates a *log transformer* for a single log group. You use
 * log transformers to transform log events into a different format, making them easier for you
 * to process and analyze. You can also transform logs from different sources into standardized
 * formats that contains relevant, source-specific information.
 *
 * After you have created a transformer, CloudWatch Logs performs the transformations at
 * the time of log ingestion. You can then refer to the transformed versions of the logs during
 * operations such as querying with CloudWatch Logs Insights or creating metric filters or
 * subscription filers.
 *
 * You can also use a transformer to copy metadata from metadata keys into the log events
 * themselves. This metadata can include log group name, log stream name, account ID and
 * Region.
 *
 * A transformer for a log group is a series of processors, where each processor applies one
 * type of transformation to the log events ingested into this log group. The processors work one
 * after another, in the order that you list them, like a pipeline. For more information about
 * the available processors to use in a transformer, see Processors that you can use.
 *
 * Having log events in standardized format enables visibility across your applications for
 * your log analysis, reporting, and alarming needs. CloudWatch Logs provides transformation
 * for common log types with out-of-the-box transformation templates for major Amazon Web Services
 * log sources such as VPC flow logs, Lambda, and Amazon RDS. You can use
 * pre-built transformation templates or create custom transformation policies.
 *
 * You can create transformers only for the log groups in the Standard log class.
 *
 * You can also set up a transformer at the account level. For more information, see PutAccountPolicy. If there is both a log-group level transformer created with
 * `PutTransformer` and an account-level transformer that could apply to the same
 * log group, the log group uses only the log-group level transformer. It ignores the
 * account-level transformer.
 */
export const putTransformer: API.OperationMethod<
  PutTransformerRequest,
  PutTransformerResponse,
  PutTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { logGroupIdentifier: 0, transformerConfig: D.list(i_Processor) },
  },
  errors: [
    InvalidOperationException,
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTransformer",
})) as any;

export type StartLiveTailError =
  | AccessDeniedException
  | InvalidOperationException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a Live Tail streaming session for one or more log groups. A Live Tail session
 * returns a stream of log events that have been recently ingested in the log groups. For more
 * information, see Use Live Tail to view logs
 * in near real time.
 *
 * The response to this operation is a response stream, over which the server sends live log
 * events and the client receives them.
 *
 * The following objects are sent over the stream:
 *
 * - A single LiveTailSessionStart object is sent at the start of the session.
 *
 * - Every second, a LiveTailSessionUpdate object is sent. Each of these objects contains an array
 * of the actual log events.
 *
 * If no new log events were ingested in the past second, the
 * `LiveTailSessionUpdate` object will contain an empty array.
 *
 * The array of log events contained in a `LiveTailSessionUpdate` can include
 * as many as 500 log events. If the number of log events matching the request exceeds 500
 * per second, the log events are sampled down to 500 log events to be included in each
 * `LiveTailSessionUpdate` object.
 *
 * If your client consumes the log events slower than the server produces them, CloudWatch Logs buffers up to 10 `LiveTailSessionUpdate` events or 5000 log
 * events, after which it starts dropping the oldest events.
 *
 * - A SessionStreamingException object is returned if an unknown error occurs on the
 * server side.
 *
 * - A SessionTimeoutException object is returned when the session times out, after it
 * has been kept open for three hours.
 *
 * The `StartLiveTail` API routes requests using SDK host prefix injection. SDK versions released before April 1, 2026 route to
 * `streaming-logs.*Region*.amazonaws.com`, which does not support VPC endpoints. SDK versions released on or after April 1, 2026 route to
 * `stream-logs.*Region*.amazonaws.com`, which supports VPC endpoints. To set up a VPC endpoint for this API, see Creating a VPC endpoint for CloudWatch Logs
 * .
 *
 * You can end a session before it times out by closing the session stream or by closing
 * the client that is receiving the stream. The session also ends if the established connection
 * between the client and the server breaks.
 *
 * For examples of using an SDK to start a Live Tail session, see Start
 * a Live Tail session using an Amazon Web Services SDK.
 */
export const startLiveTail: API.OperationMethod<
  StartLiveTailRequest,
  StartLiveTailResponse,
  StartLiveTailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      logGroupIdentifiers: 0,
      logStreamNames: 0,
      logStreamNamePrefixes: 0,
      logEventFilterPattern: 0,
    },
    output: {
      responseStream: D.events({
        sessionStart: 0,
        sessionUpdate: 0,
        SessionTimeoutException: 0,
        SessionStreamingException: 0,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidOperationException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartLiveTail",
  endpointHostPrefix: "stream-",
})) as any;

export type StartQueryError =
  | InvalidParameterException
  | LimitExceededException
  | MalformedQueryException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts a query of one or more log groups or data sources using CloudWatch Logs
 * Insights. You specify the log groups or data sources and time range to query and the query
 * string to use. You can query up to 10 data sources in a single query.
 *
 * For more information, see CloudWatch Logs Insights Query
 * Syntax.
 *
 * After you run a query using `StartQuery`, the query results are stored by
 * CloudWatch Logs. You can use GetQueryResults to retrieve the results of a query, using the `queryId`
 * that `StartQuery` returns.
 *
 * Interactive queries started with `StartQuery` share concurrency limits with
 * automated scheduled query executions. Both types of queries count toward the same regional
 * concurrent query quota, so high scheduled query activity may affect the availability of
 * concurrent slots for interactive queries.
 *
 * To specify the log groups to query, a `StartQuery` operation must include one
 * of the following:
 *
 * - Either exactly one of the following parameters: `logGroupName`,
 * `logGroupNames`, or `logGroupIdentifiers`
 *
 * - Or the `queryString` must include a `SOURCE` command to select
 * log groups for the query. The `SOURCE` command can select log groups based on
 * log group name prefix, account ID, and log class, or select data sources using
 * dataSource syntax in LogsQL, PPL, and SQL. In LogsQL, the `SOURCE` command
 * also supports filtering by log group tags.
 *
 * For more information about the `SOURCE` command, see SOURCE.
 *
 * If you have associated a KMS key with the query results in this
 * account, then StartQuery uses
 * that key to encrypt the results when it stores them. If no key is associated with query
 * results, the query results are encrypted with the default CloudWatch Logs encryption
 * method.
 *
 * Queries time out after 60 minutes of runtime. If your queries are timing out, reduce the
 * time range being searched or partition your query into a number of queries.
 *
 * If you are using CloudWatch cross-account observability, you can use this operation
 * in a monitoring account to start a query in a linked source account. For more information, see
 * CloudWatch cross-account observability. For a cross-account `StartQuery`
 * operation, the query definition must be defined in the monitoring account.
 *
 * You can have up to 100 concurrent CloudWatch Logs insights queries, including queries
 * that have been added to dashboards.
 */
export const startQuery: API.OperationMethod<
  StartQueryRequest,
  StartQueryResponse,
  StartQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      queryLanguage: 0,
      logGroupName: 0,
      logGroupNames: 0,
      logGroupIdentifiers: 0,
      startTime: 0,
      endTime: 0,
      queryString: 0,
      limit: 0,
    },
  },
  errors: [
    InvalidParameterException,
    LimitExceededException,
    MalformedQueryException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQuery",
})) as any;

export type StopQueryError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Stops a CloudWatch Logs Insights query that is in progress. If the query has already
 * ended, the operation returns an error indicating that the specified query is not
 * running.
 *
 * This operation can be used to cancel both interactive queries and individual scheduled
 * query executions. When used with scheduled queries, `StopQuery` cancels only the
 * specific execution identified by the query ID, not the scheduled query configuration
 * itself.
 */
export const stopQuery: API.OperationMethod<
  StopQueryRequest,
  StopQueryResponse,
  StopQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { queryId: 0 } },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopQuery",
})) as any;

export type TagLogGroupError =
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The TagLogGroup operation is on the path to deprecation. We recommend that you use
 * TagResource
 * instead.
 *
 * Adds or updates the specified tags for the specified log group.
 *
 * To list the tags for a log group, use ListTagsForResource. To remove tags, use UntagResource.
 *
 * For more information about tags, see Tag Log Groups in Amazon CloudWatch Logs in the Amazon CloudWatch Logs
 * User Guide.
 *
 * CloudWatch Logs doesn't support IAM policies that prevent users from assigning specified
 * tags to log groups using the aws:Resource/*key-name*
 * or
 * `aws:TagKeys` condition keys. For more information about using tags to control
 * access, see Controlling access to Amazon Web Services resources using tags.
 */
export const tagLogGroup: API.OperationMethod<
  TagLogGroupRequest,
  TagLogGroupResponse,
  TagLogGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupName: 0, tags: 0 } },
  errors: [InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagLogGroup",
})) as any;

export type TagResourceError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | TooManyTagsException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified CloudWatch Logs resource.
 * Currently, the only CloudWatch Logs resources that can be tagged are log groups and
 * destinations.
 *
 * Tags can help you organize and categorize your resources. You can also use them to scope
 * user permissions by granting a user permission to access or change only resources with certain
 * tag values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as
 * strings of characters.
 *
 * You can use the `TagResource` action with a resource that already has tags. If
 * you specify a new tag key for the alarm, this tag is appended to the list of tags associated
 * with the alarm. If you specify a tag key that is already associated with the alarm, the new
 * tag value that you specify replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a CloudWatch Logs resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: 0 } },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestMetricFilterError =
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Tests the filter pattern of a metric filter against a sample of log event messages. You
 * can use this operation to validate the correctness of a metric filter pattern.
 */
export const testMetricFilter: API.OperationMethod<
  TestMetricFilterRequest,
  TestMetricFilterResponse,
  TestMetricFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { filterPattern: 0, logEventMessages: 0 },
  },
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestMetricFilter",
})) as any;

export type TestTransformerError =
  | InvalidOperationException
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Use this operation to test a log transformer. You enter the transformer configuration and
 * a set of log events to test with. The operation responds with an array that includes the
 * original log events and the transformed versions.
 */
export const testTransformer: API.OperationMethod<
  TestTransformerRequest,
  TestTransformerResponse,
  TestTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { transformerConfig: D.list(i_Processor), logEventMessages: 0 },
  },
  errors: [
    InvalidOperationException,
    InvalidParameterException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestTransformer",
})) as any;

export type UntagLogGroupError = ResourceNotFoundException | CommonErrors;
/**
 * The UntagLogGroup operation is on the path to deprecation. We recommend that you use
 * UntagResource instead.
 *
 * Removes the specified tags from the specified log group.
 *
 * To list the tags for a log group, use ListTagsForResource. To add tags, use TagResource.
 *
 * When using IAM policies to control tag management for CloudWatch Logs log groups, the
 * condition keys `aws:Resource/key-name` and `aws:TagKeys` cannot be used
 * to restrict which tags users can assign.
 */
export const untagLogGroup: API.OperationMethod<
  UntagLogGroupRequest,
  UntagLogGroupResponse,
  UntagLogGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { logGroupName: 0, tags: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagLogGroup",
})) as any;

export type UntagResourceError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAnomalyError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Use this operation to *suppress* anomaly detection for a specified
 * anomaly or pattern. If you suppress an anomaly, CloudWatch Logs won't report new
 * occurrences of that anomaly and won't update that anomaly with new data. If you suppress a
 * pattern, CloudWatch Logs won't report any anomalies related to that pattern.
 *
 * You must specify either `anomalyId` or `patternId`, but you can't
 * specify both parameters in the same operation.
 *
 * If you have previously used this operation to suppress detection of a pattern or anomaly,
 * you can use it again to cause CloudWatch Logs to end the suppression. To do this, use this
 * operation and specify the anomaly or pattern to stop suppressing, and omit the
 * `suppressionType` and `suppressionPeriod` parameters.
 */
export const updateAnomaly: API.OperationMethod<
  UpdateAnomalyRequest,
  UpdateAnomalyResponse,
  UpdateAnomalyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      anomalyId: 0,
      patternId: 0,
      anomalyDetectorArn: 0,
      suppressionType: 0,
      suppressionPeriod: { value: 0, suppressionUnit: 0 },
      baseline: 0,
    },
  },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnomaly",
})) as any;

export type UpdateDeliveryConfigurationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to update the configuration of a delivery to change
 * either the S3 path pattern or the format of the delivered logs. You can't use this operation
 * to change the source or destination of the delivery.
 */
export const updateDeliveryConfiguration: API.OperationMethod<
  UpdateDeliveryConfigurationRequest,
  UpdateDeliveryConfigurationResponse,
  UpdateDeliveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      id: 0,
      recordFields: 0,
      fieldDelimiter: 0,
      s3DeliveryConfiguration: i_S3DeliveryConfiguration,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeliveryConfiguration",
})) as any;

export type UpdateLogAnomalyDetectorError =
  | InvalidParameterException
  | OperationAbortedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Updates an existing log anomaly detector.
 */
export const updateLogAnomalyDetector: API.OperationMethod<
  UpdateLogAnomalyDetectorRequest,
  UpdateLogAnomalyDetectorResponse,
  UpdateLogAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      anomalyDetectorArn: 0,
      evaluationFrequency: 0,
      filterPattern: 0,
      anomalyVisibilityTime: 0,
      enabled: 0,
    },
  },
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLogAnomalyDetector",
})) as any;

export type UpdateLookupTableError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing lookup table by replacing all of its content with new CSV data or
 * CloudWatch Logs query results. After the update completes, queries that use this table
 * use the new data.
 *
 * This is a full replacement operation. All existing content is replaced. You must specify
 * either `tableBody` or `queryId`, but not both.
 */
export const updateLookupTable: API.OperationMethod<
  UpdateLookupTableRequest,
  UpdateLookupTableResponse,
  UpdateLookupTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      lookupTableArn: 0,
      description: 0,
      tableBody: 0,
      queryId: 0,
      kmsKeyId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLookupTable",
})) as any;

export type UpdateScheduledQueryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing scheduled query with new configuration. This operation uses PUT
 * semantics, allowing modification of query parameters, schedule, and destinations.
 */
export const updateScheduledQuery: API.OperationMethod<
  UpdateScheduledQueryRequest,
  UpdateScheduledQueryResponse,
  UpdateScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      identifier: 0,
      description: 0,
      queryLanguage: 0,
      queryString: 0,
      logGroupIdentifiers: 0,
      scheduleExpression: 0,
      timezone: 0,
      startTimeOffset: 0,
      endTimeOffset: 0,
      destinationConfiguration: i_DestinationConfiguration,
      scheduleStartTime: 0,
      scheduleEndTime: 0,
      executionRoleArn: 0,
      state: 0,
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
  operationName: "UpdateScheduledQuery",
})) as any;

const i_DataSourceFilter: D.LazyStruct = () => ({ name: 0, type: 0 });
const i_DestinationConfiguration: D.LazyStruct = () => ({
  s3Configuration: {
    destinationIdentifier: 0,
    roleArn: 0,
    ownerAccountId: 0,
    kmsKeyId: 0,
  },
  lookupTableConfiguration: {
    tableName: 0,
    roleArn: 0,
    description: 0,
    kmsKeyId: 0,
    tags: 0,
  },
});
const i_Processor: D.LazyStruct = () => ({
  addKeys: { entries: D.list({ key: 0, value: 0, overwriteIfExists: 0 }) },
  copyValue: {
    entries: D.list({ source: 0, target: 0, overwriteIfExists: 0 }),
  },
  csv: {
    quoteCharacter: 0,
    delimiter: 0,
    columns: 0,
    source: 0,
    destination: 0,
  },
  dateTimeConverter: {
    source: 0,
    target: 0,
    targetFormat: 0,
    matchPatterns: 0,
    sourceTimezone: 0,
    targetTimezone: 0,
    locale: 0,
  },
  deleteKeys: { withKeys: 0 },
  grok: { source: 0, match: 0 },
  listToMap: {
    source: 0,
    key: 0,
    valueKey: 0,
    target: 0,
    flatten: 0,
    flattenedElement: 0,
  },
  lowerCaseString: { withKeys: 0 },
  moveKeys: { entries: D.list({ source: 0, target: 0, overwriteIfExists: 0 }) },
  parseCloudfront: { source: 0 },
  parseJSON: { source: 0, destination: 0 },
  parseKeyValue: {
    source: 0,
    destination: 0,
    fieldDelimiter: 0,
    keyValueDelimiter: 0,
    keyPrefix: 0,
    nonMatchValue: 0,
    overwriteIfExists: 0,
  },
  parseRoute53: { source: 0 },
  parseToOCSF: { source: 0, eventSource: 0, ocsfVersion: 0, mappingVersion: 0 },
  parsePostgres: { source: 0 },
  parseVPC: { source: 0 },
  parseWAF: { source: 0 },
  renameKeys: {
    entries: D.list({ key: 0, renameTo: 0, overwriteIfExists: 0 }),
  },
  splitString: { entries: D.list({ source: 0, delimiter: 0 }) },
  substituteString: { entries: D.list({ source: 0, from: 0, to: 0 }) },
  trimString: { withKeys: 0 },
  typeConverter: { entries: D.list({ key: 0, type: 0 }) },
  upperCaseString: { withKeys: 0 },
});
const i_S3DeliveryConfiguration: D.LazyStruct = () => ({
  suffixPath: 0,
  enableHiveCompatiblePath: 0,
});
