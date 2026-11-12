import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://monitoring.amazonaws.com/doc/2014-03-28/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CloudWatch Logs",
  serviceShapeName: "Logs_20140328",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "logs" });
const ver = /*@__PURE__*/ T.ServiceVersion("2014-03-28");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
            return e(`https://logs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://logs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://logs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://logs.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "CloudWatchLogs",
  service: "CloudWatchLogs",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError) {}
export class DataAlreadyAcceptedException
  extends /*@__PURE__*/ S.TaggedError<DataAlreadyAcceptedException>()(
    "DataAlreadyAcceptedException",
    {
      expectedSequenceToken: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()("InvalidOperationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidSequenceTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidSequenceTokenException>()(
    "InvalidSequenceTokenException",
    {
      expectedSequenceToken: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withQuotaError, C.withThrottlingError, C.withRetryableError) {}
export class MalformedQueryException
  extends /*@__PURE__*/ S.TaggedError<MalformedQueryException>()("MalformedQueryException", {
    queryCompileError: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(4001, __c125, 1)).annotate({
        identifier: "QueryCompileError",
      }),
    ),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class OperationAbortedException
  extends /*@__PURE__*/ S.TaggedError<OperationAbortedException>()("OperationAbortedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError, C.withRetryableError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnrecognizedClientException
  extends /*@__PURE__*/ S.TaggedError<UnrecognizedClientException>()(
    "UnrecognizedClientException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export type LogGroupName = string;
export type KmsKeyId = string;
export type ResourceIdentifier = string;
export interface AssociateKmsKeyRequest {
  logGroupName?: string | undefined;
  kmsKeyId: string;
  resourceIdentifier?: string | undefined;
}
export interface AssociateKmsKeyResponse {}
export type Arn = string;
export type DataSourceName = string;
export type DataSourceType = string;
export interface DataSource {
  name: string;
  type?: string | undefined;
}
export interface AssociateSourceToS3TableIntegrationRequest {
  integrationArn: string;
  dataSource: DataSource;
}
export type S3TableIntegrationSourceIdentifier = string;
export interface AssociateSourceToS3TableIntegrationResponse {
  identifier?: string | undefined;
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
  bytesImported?: number | undefined;
}
export type ImportStatus = "IN_PROGRESS" | "CANCELLED" | "COMPLETED" | "FAILED" | (string & {});
export interface CancelImportTaskResponse {
  importId?: string | undefined;
  importStatistics?: ImportStatistics | undefined;
  importStatus?: ImportStatus | undefined;
  creationTime?: number | undefined;
  lastUpdatedTime?: number | undefined;
}
export type DeliverySourceName = string;
export type FieldHeader = string;
export type RecordFields = string[];
export type FieldDelimiter = string;
export type DeliverySuffixPath = string;
export interface S3DeliveryConfiguration {
  suffixPath?: string | undefined;
  enableHiveCompatiblePath?: boolean | undefined;
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateDeliveryRequest {
  deliverySourceName: string;
  deliveryDestinationArn: string;
  recordFields?: string[] | undefined;
  fieldDelimiter?: string | undefined;
  s3DeliveryConfiguration?: S3DeliveryConfiguration | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type DeliveryId = string;
export type DeliveryDestinationType = "S3" | "CWL" | "FH" | "XRAY" | (string & {});
export interface Delivery {
  id?: string | undefined;
  arn?: string | undefined;
  deliverySourceName?: string | undefined;
  deliveryDestinationArn?: string | undefined;
  deliveryDestinationType?: DeliveryDestinationType | undefined;
  recordFields?: string[] | undefined;
  fieldDelimiter?: string | undefined;
  s3DeliveryConfiguration?: S3DeliveryConfiguration | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateDeliveryResponse {
  delivery?: Delivery | undefined;
}
export type ExportTaskName = string;
export type LogStreamName = string;
export type ExportDestinationBucket = string;
export type ExportDestinationPrefix = string;
export interface CreateExportTaskRequest {
  taskName?: string | undefined;
  logGroupName: string;
  logStreamNamePrefix?: string | undefined;
  from: number;
  to: number;
  destination: string;
  destinationPrefix?: string | undefined;
}
export interface CreateExportTaskResponse {
  taskId?: string | undefined;
}
export type RoleArn = string;
export interface ImportFilter {
  startEventTime?: number | undefined;
  endEventTime?: number | undefined;
}
export interface CreateImportTaskRequest {
  importSourceArn: string;
  importRoleArn: string;
  importFilter?: ImportFilter | undefined;
}
export interface CreateImportTaskResponse {
  importId?: string | undefined;
  importDestinationArn?: string | undefined;
  creationTime?: number | undefined;
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
  detectorName?: string | undefined;
  evaluationFrequency?: EvaluationFrequency | undefined;
  filterPattern?: string | undefined;
  kmsKeyId?: string | undefined;
  anomalyVisibilityTime?: number | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type AnomalyDetectorArn = string;
export interface CreateLogAnomalyDetectorResponse {
  anomalyDetectorArn?: string | undefined;
}
export type LogGroupClass =
  | "STANDARD"
  | "INFREQUENT_ACCESS"
  | "DELIVERY"
  | "ESSENTIALS"
  | (string & {});
export type DeletionProtectionEnabled = boolean;
export interface CreateLogGroupRequest {
  logGroupName: string;
  kmsKeyId?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  logGroupClass?: LogGroupClass | undefined;
  deletionProtectionEnabled?: boolean | undefined;
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
  description?: string | undefined;
  tableBody?: string | undefined;
  queryId?: string | undefined;
  kmsKeyId?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateLookupTableResponse {
  lookupTableArn?: string | undefined;
  createdAt?: number | undefined;
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
  ownerAccountId?: string | undefined;
  kmsKeyId?: string | undefined;
}
export interface LookupTableConfiguration {
  tableName: string;
  roleArn: string;
  description?: string | undefined;
  kmsKeyId?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface DestinationConfiguration {
  s3Configuration?: S3Configuration | undefined;
  lookupTableConfiguration?: LookupTableConfiguration | undefined;
}
export type ScheduledQueryState = "ENABLED" | "DISABLED" | (string & {});
export interface CreateScheduledQueryRequest {
  name: string;
  description?: string | undefined;
  queryLanguage: QueryLanguage;
  queryString: string;
  logGroupIdentifiers?: string[] | undefined;
  scheduleExpression: string;
  timezone?: string | undefined;
  startTimeOffset?: number | undefined;
  endTimeOffset?: number | undefined;
  destinationConfiguration?: DestinationConfiguration | undefined;
  scheduleStartTime?: number | undefined;
  scheduleEndTime?: number | undefined;
  executionRoleArn: string;
  state?: ScheduledQueryState | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateScheduledQueryResponse {
  scheduledQueryArn?: string | undefined;
  state?: ScheduledQueryState | undefined;
}
export type PolicyName = string;
export type PolicyType =
  | "DATA_PROTECTION_POLICY"
  | "SUBSCRIPTION_FILTER_POLICY"
  | "FIELD_INDEX_POLICY"
  | "TRANSFORMER_POLICY"
  | "METRIC_EXTRACTION_POLICY"
  | "RETENTION_POLICY"
  | (string & {});
export type DryRun = boolean;
export interface DeleteAccountPolicyRequest {
  policyName: string;
  policyType: PolicyType;
  dryRun?: boolean | undefined;
}
export type DryRunCount = number;
export type RetentionValue = string;
export interface LogGroupImpact {
  logGroupName?: string | undefined;
  currentRetention?: string | undefined;
  proposedRetention?: string | undefined;
  storedBytes?: number | undefined;
}
export type LogGroupImpacts = LogGroupImpact[];
export interface DryRunResult {
  totalMatchedLogGroups?: number | undefined;
  increasedRetentionLogGroupCount?: number | undefined;
  decreasedRetentionLogGroupCount?: number | undefined;
  unchangedRetentionLogGroupCount?: number | undefined;
  failedAnalysisCount?: number | undefined;
  topLogGroupsImpacted?: LogGroupImpact[] | undefined;
}
export interface DeleteAccountPolicyResponse {
  dryRunResult?: DryRunResult | undefined;
}
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
  force?: boolean | undefined;
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
  success?: boolean | undefined;
}
export type ExpectedRevisionId = string;
export interface DeleteResourcePolicyRequest {
  policyName?: string | undefined;
  resourceArn?: string | undefined;
  expectedRevisionId?: string | undefined;
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
  vpcEndpointId?: string | undefined;
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
  policyName?: string | undefined;
  accountIdentifiers?: string[] | undefined;
  nextToken?: string | undefined;
}
export type AccountPolicyDocument = string;
export type Scope = "ALL" | (string & {});
export type SelectionCriteria = string;
export interface AccountPolicy {
  policyName?: string | undefined;
  policyDocument?: string | undefined;
  lastUpdatedTime?: number | undefined;
  policyType?: PolicyType | undefined;
  scope?: Scope | undefined;
  selectionCriteria?: string | undefined;
  accountId?: string | undefined;
}
export type AccountPolicies = AccountPolicy[];
export interface DescribeAccountPoliciesResponse {
  accountPolicies?: AccountPolicy[] | undefined;
  nextToken?: string | undefined;
}
export type Service = string;
export type LogType = string;
export type LogTypes = string[];
export type ResourceType = string;
export type ResourceTypes = string[];
export type DeliveryDestinationTypes = DeliveryDestinationType[];
export type DescribeLimit = number;
export interface DescribeConfigurationTemplatesRequest {
  service?: string | undefined;
  logTypes?: string[] | undefined;
  resourceTypes?: string[] | undefined;
  deliveryDestinationTypes?: DeliveryDestinationType[] | undefined;
  nextToken?: string | undefined;
  limit?: number | undefined;
}
export interface ConfigurationTemplateDeliveryConfigValues {
  recordFields?: string[] | undefined;
  fieldDelimiter?: string | undefined;
  s3DeliveryConfiguration?: S3DeliveryConfiguration | undefined;
}
export interface RecordField {
  name?: string | undefined;
  mandatory?: boolean | undefined;
}
export type AllowedFields = RecordField[];
export type OutputFormat = "json" | "plain" | "w3c" | "raw" | "parquet" | (string & {});
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
  supportedValues?: string[] | undefined;
  minValue?: number | undefined;
  maxValue?: number | undefined;
}
export type DeliverySourceConfigurationSchemas = DeliverySourceConfigurationSchema[];
export type S3TablesDatasourceName = string;
export type S3TablesDatasourceType = string;
export interface S3TablesIntegration {
  datasourceName?: string | undefined;
  datasourceType?: string | undefined;
}
export interface ConfigurationTemplate {
  service?: string | undefined;
  logType?: string | undefined;
  resourceType?: string | undefined;
  deliveryDestinationType?: DeliveryDestinationType | undefined;
  defaultDeliveryConfigValues?: ConfigurationTemplateDeliveryConfigValues | undefined;
  allowedFields?: RecordField[] | undefined;
  allowedOutputFormats?: OutputFormat[] | undefined;
  allowedActionForAllowVendedLogsDeliveryForResource?: string | undefined;
  allowedFieldDelimiters?: string[] | undefined;
  allowedSuffixPathFields?: string[] | undefined;
  deliverySourceConfiguration?: DeliverySourceConfigurationSchema[] | undefined;
  s3TablesIntegration?: S3TablesIntegration | undefined;
}
export type ConfigurationTemplates = ConfigurationTemplate[];
export interface DescribeConfigurationTemplatesResponse {
  configurationTemplates?: ConfigurationTemplate[] | undefined;
  nextToken?: string | undefined;
}
export type DeliverySourceNames = string[];
export interface DescribeDeliveriesRequest {
  nextToken?: string | undefined;
  limit?: number | undefined;
  deliverySourceNames?: string[] | undefined;
}
export type Deliveries = Delivery[];
export interface DescribeDeliveriesResponse {
  deliveries?: Delivery[] | undefined;
  nextToken?: string | undefined;
}
export type DeliveryDestinationNames = string[];
export interface DescribeDeliveryDestinationsRequest {
  nextToken?: string | undefined;
  limit?: number | undefined;
  names?: string[] | undefined;
}
export interface DeliveryDestinationConfiguration {
  destinationResourceArn: string;
}
export interface DeliveryDestination {
  name?: string | undefined;
  arn?: string | undefined;
  deliveryDestinationType?: DeliveryDestinationType | undefined;
  outputFormat?: OutputFormat | undefined;
  deliveryDestinationConfiguration?: DeliveryDestinationConfiguration | undefined;
  roleArn?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type DeliveryDestinations = DeliveryDestination[];
export interface DescribeDeliveryDestinationsResponse {
  deliveryDestinations?: DeliveryDestination[] | undefined;
  nextToken?: string | undefined;
}
export type FilterResourceArns = string[];
export interface DescribeDeliverySourcesRequest {
  nextToken?: string | undefined;
  limit?: number | undefined;
  resourceArns?: string[] | undefined;
}
export type ResourceArns = string[];
export type DeliverySourceConfigurationKey = string;
export type DeliverySourceConfigurationValue = string;
export type DeliverySourceConfiguration = { [key: string]: string | undefined };
export type DeliverySourceStatus = "ACTIVE" | "INACTIVE" | (string & {});
export type DeliverySourceStatusReason = "RESOURCE_DELETED" | (string & {});
export interface DeliverySource {
  name?: string | undefined;
  arn?: string | undefined;
  resourceArns?: string[] | undefined;
  service?: string | undefined;
  logType?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  deliverySourceConfiguration?: { [key: string]: string | undefined } | undefined;
  status?: DeliverySourceStatus | undefined;
  statusReason?: DeliverySourceStatusReason | undefined;
}
export type DeliverySources = DeliverySource[];
export interface DescribeDeliverySourcesResponse {
  deliverySources?: DeliverySource[] | undefined;
  nextToken?: string | undefined;
}
export interface DescribeDestinationsRequest {
  DestinationNamePrefix?: string | undefined;
  nextToken?: string | undefined;
  limit?: number | undefined;
}
export type TargetArn = string;
export type AccessPolicy = string;
export interface Destination {
  destinationName?: string | undefined;
  targetArn?: string | undefined;
  roleArn?: string | undefined;
  accessPolicy?: string | undefined;
  arn?: string | undefined;
  creationTime?: number | undefined;
}
export type Destinations = Destination[];
export interface DescribeDestinationsResponse {
  destinations?: Destination[] | undefined;
  nextToken?: string | undefined;
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
  taskId?: string | undefined;
  statusCode?: ExportTaskStatusCode | undefined;
  nextToken?: string | undefined;
  limit?: number | undefined;
}
export type ExportTaskStatusMessage = string;
export interface ExportTaskStatus {
  code?: ExportTaskStatusCode | undefined;
  message?: string | undefined;
}
export interface ExportTaskExecutionInfo {
  creationTime?: number | undefined;
  completionTime?: number | undefined;
}
export interface ExportTask {
  taskId?: string | undefined;
  taskName?: string | undefined;
  logGroupName?: string | undefined;
  from?: number | undefined;
  to?: number | undefined;
  destination?: string | undefined;
  destinationPrefix?: string | undefined;
  status?: ExportTaskStatus | undefined;
  executionInfo?: ExportTaskExecutionInfo | undefined;
}
export type ExportTasks = ExportTask[];
export interface DescribeExportTasksResponse {
  exportTasks?: ExportTask[] | undefined;
  nextToken?: string | undefined;
}
export type DescribeFieldIndexesLogGroupIdentifiers = string[];
export type IndexCategory = "DEFAULT" | "CUSTOM" | "AUTO" | "INACTIVE" | (string & {});
export type IndexCategories = IndexCategory[];
export interface DescribeFieldIndexesRequest {
  logGroupIdentifiers: string[];
  indexCategories?: IndexCategory[] | undefined;
  nextToken?: string | undefined;
}
export type FieldIndexName = string;
export type IndexType = "FACET" | "FIELD_INDEX" | (string & {});
export interface FieldIndex {
  logGroupIdentifier?: string | undefined;
  fieldIndexName?: string | undefined;
  lastScanTime?: number | undefined;
  firstEventTime?: number | undefined;
  lastEventTime?: number | undefined;
  type?: IndexType | undefined;
  indexCategory?: IndexCategory | undefined;
}
export type FieldIndexes = FieldIndex[];
export interface DescribeFieldIndexesResponse {
  fieldIndexes?: FieldIndex[] | undefined;
  nextToken?: string | undefined;
}
export type ImportStatusList = ImportStatus[];
export interface DescribeImportTaskBatchesRequest {
  importId: string;
  batchImportStatus?: ImportStatus[] | undefined;
  limit?: number | undefined;
  nextToken?: string | undefined;
}
export type BatchId = string;
export type ErrorMessage = string;
export interface ImportBatch {
  batchId: string;
  status: ImportStatus;
  errorMessage?: string | undefined;
}
export type ImportBatchList = ImportBatch[];
export interface DescribeImportTaskBatchesResponse {
  importSourceArn?: string | undefined;
  importId?: string | undefined;
  importBatches?: ImportBatch[] | undefined;
  nextToken?: string | undefined;
}
export interface DescribeImportTasksRequest {
  importId?: string | undefined;
  importStatus?: ImportStatus | undefined;
  importSourceArn?: string | undefined;
  limit?: number | undefined;
  nextToken?: string | undefined;
}
export interface Import {
  importId?: string | undefined;
  importSourceArn?: string | undefined;
  importStatus?: ImportStatus | undefined;
  importDestinationArn?: string | undefined;
  importStatistics?: ImportStatistics | undefined;
  importFilter?: ImportFilter | undefined;
  creationTime?: number | undefined;
  lastUpdatedTime?: number | undefined;
  errorMessage?: string | undefined;
}
export type ImportList = Import[];
export interface DescribeImportTasksResponse {
  imports?: Import[] | undefined;
  nextToken?: string | undefined;
}
export type DescribeIndexPoliciesLogGroupIdentifiers = string[];
export interface DescribeIndexPoliciesRequest {
  logGroupIdentifiers: string[];
  nextToken?: string | undefined;
}
export type PolicyDocument = string;
export type IndexSource = "ACCOUNT" | "LOG_GROUP" | (string & {});
export interface IndexPolicy {
  logGroupIdentifier?: string | undefined;
  lastUpdateTime?: number | undefined;
  policyDocument?: string | undefined;
  policyName?: string | undefined;
  source?: IndexSource | undefined;
}
export type IndexPolicies = IndexPolicy[];
export interface DescribeIndexPoliciesResponse {
  indexPolicies?: IndexPolicy[] | undefined;
  nextToken?: string | undefined;
}
export type LogGroupNamePattern = string;
export type IncludeLinkedAccounts = boolean;
export type DescribeLogGroupsLogGroupIdentifiers = string[];
export interface DescribeLogGroupsRequest {
  accountIdentifiers?: string[] | undefined;
  logGroupNamePrefix?: string | undefined;
  logGroupNamePattern?: string | undefined;
  nextToken?: string | undefined;
  limit?: number | undefined;
  includeLinkedAccounts?: boolean | undefined;
  logGroupClass?: LogGroupClass | undefined;
  logGroupIdentifiers?: string[] | undefined;
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
  logGroupName?: string | undefined;
  creationTime?: number | undefined;
  retentionInDays?: number | undefined;
  metricFilterCount?: number | undefined;
  arn?: string | undefined;
  storedBytes?: number | undefined;
  kmsKeyId?: string | undefined;
  dataProtectionStatus?: DataProtectionStatus | undefined;
  inheritedProperties?: InheritedProperty[] | undefined;
  logGroupClass?: LogGroupClass | undefined;
  logGroupArn?: string | undefined;
  deletionProtectionEnabled?: boolean | undefined;
  bearerTokenAuthenticationEnabled?: boolean | undefined;
  retentionPolicyName?: string | undefined;
}
export type LogGroups = LogGroup[];
export interface DescribeLogGroupsResponse {
  logGroups?: LogGroup[] | undefined;
  nextToken?: string | undefined;
}
export type OrderBy = "LogStreamName" | "LastEventTime" | (string & {});
export type Descending = boolean;
export interface DescribeLogStreamsRequest {
  logGroupName?: string | undefined;
  logGroupIdentifier?: string | undefined;
  logStreamNamePrefix?: string | undefined;
  orderBy?: OrderBy | undefined;
  descending?: boolean | undefined;
  nextToken?: string | undefined;
  limit?: number | undefined;
}
export type SequenceToken = string;
export interface LogStream {
  logStreamName?: string | undefined;
  creationTime?: number | undefined;
  firstEventTimestamp?: number | undefined;
  lastEventTimestamp?: number | undefined;
  lastIngestionTime?: number | undefined;
  uploadSequenceToken?: string | undefined;
  arn?: string | undefined;
  storedBytes?: number | undefined;
}
export type LogStreams = LogStream[];
export interface DescribeLogStreamsResponse {
  logStreams?: LogStream[] | undefined;
  nextToken?: string | undefined;
}
export type DescribeLookupTablesMaxResults = number;
export interface DescribeLookupTablesRequest {
  lookupTableNamePrefix?: string | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type TableFields = string[];
export type RecordsCount = number;
export interface LookupTable {
  lookupTableArn?: string | undefined;
  lookupTableName?: string | undefined;
  description?: string | undefined;
  tableFields?: string[] | undefined;
  recordsCount?: number | undefined;
  sizeBytes?: number | undefined;
  lastUpdatedTime?: number | undefined;
  kmsKeyId?: string | undefined;
}
export type LookupTables = LookupTable[];
export interface DescribeLookupTablesResponse {
  lookupTables?: LookupTable[] | undefined;
  nextToken?: string | undefined;
}
export type MetricName = string;
export type MetricNamespace = string;
export interface DescribeMetricFiltersRequest {
  logGroupName?: string | undefined;
  filterNamePrefix?: string | undefined;
  nextToken?: string | undefined;
  limit?: number | undefined;
  metricName?: string | undefined;
  metricNamespace?: string | undefined;
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
  defaultValue?: number | undefined;
  dimensions?: { [key: string]: string | undefined } | undefined;
  unit?: StandardUnit | undefined;
}
export type MetricTransformations = MetricTransformation[];
export type ApplyOnTransformedLogs = boolean;
export type FieldSelectionCriteria = string;
export type SystemField = string;
export type EmitSystemFields = string[];
export interface MetricFilter {
  filterName?: string | undefined;
  filterPattern?: string | undefined;
  metricTransformations?: MetricTransformation[] | undefined;
  creationTime?: number | undefined;
  logGroupName?: string | undefined;
  applyOnTransformedLogs?: boolean | undefined;
  fieldSelectionCriteria?: string | undefined;
  emitSystemFieldDimensions?: string[] | undefined;
}
export type MetricFilters = MetricFilter[];
export interface DescribeMetricFiltersResponse {
  metricFilters?: MetricFilter[] | undefined;
  nextToken?: string | undefined;
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
  logGroupName?: string | undefined;
  status?: QueryStatus | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  queryLanguage?: QueryLanguage | undefined;
}
export type QueryDuration = number;
export type BytesScannedValue = number;
export type UserIdentity = string;
export interface QueryInfo {
  queryLanguage?: QueryLanguage | undefined;
  queryId?: string | undefined;
  queryString?: string | undefined;
  status?: QueryStatus | undefined;
  createTime?: number | undefined;
  logGroupName?: string | undefined;
  queryDuration?: number | undefined;
  bytesScanned?: number | undefined;
  userIdentity?: string | undefined;
}
export type QueryInfoList = QueryInfo[];
export interface DescribeQueriesResponse {
  queries?: QueryInfo[] | undefined;
  nextToken?: string | undefined;
}
export type QueryDefinitionName = string;
export type QueryListMaxResults = number;
export interface DescribeQueryDefinitionsRequest {
  queryLanguage?: QueryLanguage | undefined;
  queryDefinitionNamePrefix?: string | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type QueryDefinitionString = string;
export type LogGroupNames = string[];
export type QueryParameterName = string;
export type QueryParameterDefaultValue = string;
export type QueryParameterDescription = string;
export interface QueryParameter {
  name: string;
  defaultValue?: string | undefined;
  description?: string | undefined;
}
export type QueryParameterList = QueryParameter[];
export interface QueryDefinition {
  queryLanguage?: QueryLanguage | undefined;
  queryDefinitionId?: string | undefined;
  name?: string | undefined;
  queryString?: string | undefined;
  lastModified?: number | undefined;
  logGroupNames?: string[] | undefined;
  parameters?: QueryParameter[] | undefined;
}
export type QueryDefinitionList = QueryDefinition[];
export interface DescribeQueryDefinitionsResponse {
  queryDefinitions?: QueryDefinition[] | undefined;
  nextToken?: string | undefined;
}
export type PolicyScope = "ACCOUNT" | "RESOURCE" | (string & {});
export interface DescribeResourcePoliciesRequest {
  nextToken?: string | undefined;
  limit?: number | undefined;
  resourceArn?: string | undefined;
  policyScope?: PolicyScope | undefined;
}
export interface ResourcePolicy {
  policyName?: string | undefined;
  policyDocument?: string | undefined;
  lastUpdatedTime?: number | undefined;
  policyScope?: PolicyScope | undefined;
  resourceArn?: string | undefined;
  revisionId?: string | undefined;
}
export type ResourcePolicies = ResourcePolicy[];
export interface DescribeResourcePoliciesResponse {
  resourcePolicies?: ResourcePolicy[] | undefined;
  nextToken?: string | undefined;
}
export interface DescribeSubscriptionFiltersRequest {
  logGroupName: string;
  filterNamePrefix?: string | undefined;
  nextToken?: string | undefined;
  limit?: number | undefined;
}
export type DestinationArn = string;
export type Distribution = "Random" | "ByLogStream" | (string & {});
export interface SubscriptionFilter {
  filterName?: string | undefined;
  logGroupName?: string | undefined;
  filterPattern?: string | undefined;
  destinationArn?: string | undefined;
  roleArn?: string | undefined;
  distribution?: Distribution | undefined;
  applyOnTransformedLogs?: boolean | undefined;
  creationTime?: number | undefined;
  fieldSelectionCriteria?: string | undefined;
  emitSystemFields?: string[] | undefined;
}
export type SubscriptionFilters = SubscriptionFilter[];
export interface DescribeSubscriptionFiltersResponse {
  subscriptionFilters?: SubscriptionFilter[] | undefined;
  nextToken?: string | undefined;
}
export interface DisassociateKmsKeyRequest {
  logGroupName?: string | undefined;
  resourceIdentifier?: string | undefined;
}
export interface DisassociateKmsKeyResponse {}
export interface DisassociateSourceFromS3TableIntegrationRequest {
  identifier: string;
}
export interface DisassociateSourceFromS3TableIntegrationResponse {
  identifier?: string | undefined;
}
export type InputLogStreamNames = string[];
export type EventsLimit = number;
export type StartFromHead = boolean;
export type Interleaved = boolean;
export type Unmask = boolean;
export interface FilterLogEventsRequest {
  logGroupName?: string | undefined;
  logGroupIdentifier?: string | undefined;
  logStreamNames?: string[] | undefined;
  logStreamNamePrefix?: string | undefined;
  startTime?: number | undefined;
  endTime?: number | undefined;
  filterPattern?: string | undefined;
  nextToken?: string | undefined;
  limit?: number | undefined;
  startFromHead?: boolean | undefined;
  interleaved?: boolean | undefined;
  unmask?: boolean | undefined;
}
export type EventMessage = string;
export type EventId = string;
export interface FilteredLogEvent {
  logStreamName?: string | undefined;
  timestamp?: number | undefined;
  message?: string | undefined;
  ingestionTime?: number | undefined;
  eventId?: string | undefined;
}
export type FilteredLogEvents = FilteredLogEvent[];
export type LogStreamSearchedCompletely = boolean;
export interface SearchedLogStream {
  logStreamName?: string | undefined;
  searchedCompletely?: boolean | undefined;
}
export type SearchedLogStreams = SearchedLogStream[];
export interface FilterLogEventsResponse {
  events?: FilteredLogEvent[] | undefined;
  searchedLogStreams?: SearchedLogStream[] | undefined;
  nextToken?: string | undefined;
}
export interface GetDataProtectionPolicyRequest {
  logGroupIdentifier: string;
}
export type DataProtectionPolicyDocument = string;
export interface GetDataProtectionPolicyResponse {
  logGroupIdentifier?: string | undefined;
  policyDocument?: string | undefined;
  lastUpdatedTime?: number | undefined;
}
export interface GetDeliveryRequest {
  id: string;
}
export interface GetDeliveryResponse {
  delivery?: Delivery | undefined;
}
export interface GetDeliveryDestinationRequest {
  name: string;
}
export interface GetDeliveryDestinationResponse {
  deliveryDestination?: DeliveryDestination | undefined;
}
export interface GetDeliveryDestinationPolicyRequest {
  deliveryDestinationName: string;
}
export type DeliveryDestinationPolicy = string;
export interface Policy {
  deliveryDestinationPolicy?: string | undefined;
}
export interface GetDeliveryDestinationPolicyResponse {
  policy?: Policy | undefined;
}
export interface GetDeliverySourceRequest {
  name: string;
}
export interface GetDeliverySourceResponse {
  deliverySource?: DeliverySource | undefined;
}
export interface GetIntegrationRequest {
  integrationName: string;
}
export type IntegrationType = "OPENSEARCH" | (string & {});
export type IntegrationStatus = "PROVISIONING" | "ACTIVE" | "FAILED" | (string & {});
export type OpenSearchDataSourceName = string;
export type OpenSearchResourceStatusType = "ACTIVE" | "NOT_FOUND" | "ERROR" | (string & {});
export type IntegrationStatusMessage = string;
export interface OpenSearchResourceStatus {
  status?: OpenSearchResourceStatusType | undefined;
  statusMessage?: string | undefined;
}
export interface OpenSearchDataSource {
  dataSourceName?: string | undefined;
  status?: OpenSearchResourceStatus | undefined;
}
export type OpenSearchApplicationEndpoint = string;
export type OpenSearchApplicationId = string;
export interface OpenSearchApplication {
  applicationEndpoint?: string | undefined;
  applicationArn?: string | undefined;
  applicationId?: string | undefined;
  status?: OpenSearchResourceStatus | undefined;
}
export type OpenSearchCollectionEndpoint = string;
export interface OpenSearchCollection {
  collectionEndpoint?: string | undefined;
  collectionArn?: string | undefined;
  status?: OpenSearchResourceStatus | undefined;
}
export type OpenSearchWorkspaceId = string;
export interface OpenSearchWorkspace {
  workspaceId?: string | undefined;
  status?: OpenSearchResourceStatus | undefined;
}
export type OpenSearchPolicyName = string;
export interface OpenSearchEncryptionPolicy {
  policyName?: string | undefined;
  status?: OpenSearchResourceStatus | undefined;
}
export interface OpenSearchNetworkPolicy {
  policyName?: string | undefined;
  status?: OpenSearchResourceStatus | undefined;
}
export interface OpenSearchDataAccessPolicy {
  policyName?: string | undefined;
  status?: OpenSearchResourceStatus | undefined;
}
export interface OpenSearchLifecyclePolicy {
  policyName?: string | undefined;
  status?: OpenSearchResourceStatus | undefined;
}
export interface OpenSearchIntegrationDetails {
  dataSource?: OpenSearchDataSource | undefined;
  application?: OpenSearchApplication | undefined;
  collection?: OpenSearchCollection | undefined;
  workspace?: OpenSearchWorkspace | undefined;
  encryptionPolicy?: OpenSearchEncryptionPolicy | undefined;
  networkPolicy?: OpenSearchNetworkPolicy | undefined;
  accessPolicy?: OpenSearchDataAccessPolicy | undefined;
  lifecyclePolicy?: OpenSearchLifecyclePolicy | undefined;
}
export type IntegrationDetails = { openSearchIntegrationDetails: OpenSearchIntegrationDetails };
export interface GetIntegrationResponse {
  integrationName?: string | undefined;
  integrationType?: IntegrationType | undefined;
  integrationStatus?: IntegrationStatus | undefined;
  integrationDetails?: IntegrationDetails | undefined;
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
  detectorName?: string | undefined;
  logGroupArnList?: string[] | undefined;
  evaluationFrequency?: EvaluationFrequency | undefined;
  filterPattern?: string | undefined;
  anomalyDetectorStatus?: AnomalyDetectorStatus | undefined;
  kmsKeyId?: string | undefined;
  creationTimeStamp?: number | undefined;
  lastModifiedTimeStamp?: number | undefined;
  anomalyVisibilityTime?: number | undefined;
}
export interface GetLogEventsRequest {
  logGroupName?: string | undefined;
  logGroupIdentifier?: string | undefined;
  logStreamName: string;
  startTime?: number | undefined;
  endTime?: number | undefined;
  nextToken?: string | undefined;
  limit?: number | undefined;
  startFromHead?: boolean | undefined;
  unmask?: boolean | undefined;
}
export interface OutputLogEvent {
  timestamp?: number | undefined;
  message?: string | undefined;
  ingestionTime?: number | undefined;
}
export type OutputLogEvents = OutputLogEvent[];
export interface GetLogEventsResponse {
  events?: OutputLogEvent[] | undefined;
  nextForwardToken?: string | undefined;
  nextBackwardToken?: string | undefined;
}
export interface GetLogFieldsRequest {
  dataSourceName: string;
  dataSourceType: string;
}
export type LogFieldName = string;
export type DataType = string;
export interface LogFieldType {
  type?: string | undefined;
  element?: LogFieldType | undefined;
  fields?: LogFieldsListItem[] | undefined;
}
export interface LogFieldsListItem {
  logFieldName?: string | undefined;
  logFieldType?: LogFieldType | undefined;
}
export type LogFieldsList = LogFieldsListItem[];
export interface GetLogFieldsResponse {
  logFields?: LogFieldsListItem[] | undefined;
}
export interface GetLogGroupFieldsRequest {
  logGroupName?: string | undefined;
  time?: number | undefined;
  logGroupIdentifier?: string | undefined;
}
export type Field = string;
export type Percentage = number;
export interface LogGroupField {
  name?: string | undefined;
  percent?: number | undefined;
}
export type LogGroupFieldList = LogGroupField[];
export interface GetLogGroupFieldsResponse {
  logGroupFields?: LogGroupField[] | undefined;
}
export type LogObjectPointer = string;
export interface GetLogObjectRequest {
  unmask?: boolean | undefined;
  logObjectPointer: string;
}
export type Data = Uint8Array;
export interface FieldsData {
  data?: Uint8Array | undefined;
}
export type Message = string;
export interface InternalStreamingException {
  message?: string | undefined;
}
export type GetLogObjectResponseStream =
  | { fields: FieldsData; InternalStreamingException?: undefined }
  | { fields?: undefined; InternalStreamingException: InternalStreamingException };
export interface GetLogObjectResponse {
  fieldStream?: stream.Stream<GetLogObjectResponseStream, Error, never> | undefined;
}
export type LogRecordPointer = string;
export interface GetLogRecordRequest {
  logRecordPointer: string;
  unmask?: boolean | undefined;
}
export type Value = string;
export type LogRecord = { [key: string]: string | undefined };
export interface GetLogRecordResponse {
  logRecord?: { [key: string]: string | undefined } | undefined;
}
export interface GetLookupTableRequest {
  lookupTableArn: string;
}
export interface GetLookupTableResponse {
  lookupTableArn?: string | undefined;
  lookupTableName?: string | undefined;
  description?: string | undefined;
  tableBody?: string | undefined;
  sizeBytes?: number | undefined;
  lastUpdatedTime?: number | undefined;
  kmsKeyId?: string | undefined;
}
export type GetQueryResultsNextToken = string;
export type GetQueryResultsMaxItems = number;
export interface GetQueryResultsRequest {
  queryId: string;
  nextToken?: string | undefined;
  maxItems?: number | undefined;
}
export interface ResultField {
  field?: string | undefined;
  value?: string | undefined;
}
export type ResultRows = ResultField[];
export type QueryResults = ResultField[][];
export type StatsValue = number;
export interface QueryStatistics {
  recordsMatched?: number | undefined;
  recordsScanned?: number | undefined;
  estimatedRecordsSkipped?: number | undefined;
  bytesScanned?: number | undefined;
  estimatedBytesSkipped?: number | undefined;
  logGroupsScanned?: number | undefined;
  resultCount?: number | undefined;
}
export type EncryptionKey = string;
export interface GetQueryResultsResponse {
  queryLanguage?: QueryLanguage | undefined;
  results?: ResultField[][] | undefined;
  statistics?: QueryStatistics | undefined;
  status?: QueryStatus | undefined;
  encryptionKey?: string | undefined;
  nextToken?: string | undefined;
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
  scheduledQueryArn?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  queryLanguage?: QueryLanguage | undefined;
  queryString?: string | undefined;
  logGroupIdentifiers?: string[] | undefined;
  scheduleExpression?: string | undefined;
  timezone?: string | undefined;
  startTimeOffset?: number | undefined;
  endTimeOffset?: number | undefined;
  destinationConfiguration?: DestinationConfiguration | undefined;
  state?: ScheduledQueryState | undefined;
  scheduleType?: ScheduleType | undefined;
  lastTriggeredTime?: number | undefined;
  lastExecutionStatus?: ExecutionStatus | undefined;
  scheduleStartTime?: number | undefined;
  scheduleEndTime?: number | undefined;
  executionRoleArn?: string | undefined;
  creationTime?: number | undefined;
  lastUpdatedTime?: number | undefined;
}
export type ExecutionStatusList = ExecutionStatus[];
export type GetScheduledQueryHistoryMaxResults = number;
export interface GetScheduledQueryHistoryRequest {
  identifier: string;
  startTime: number;
  endTime: number;
  executionStatuses?: ExecutionStatus[] | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type ScheduledQueryDestinationType = "S3" | "LOOKUP_TABLE" | (string & {});
export type ActionStatus = "IN_PROGRESS" | "CLIENT_ERROR" | "FAILED" | "COMPLETE" | (string & {});
export interface ScheduledQueryDestination {
  destinationType?: ScheduledQueryDestinationType | undefined;
  destinationIdentifier?: string | undefined;
  status?: ActionStatus | undefined;
  processedIdentifier?: string | undefined;
  errorMessage?: string | undefined;
}
export type ScheduledQueryDestinationList = ScheduledQueryDestination[];
export interface TriggerHistoryRecord {
  queryId?: string | undefined;
  executionStatus?: ExecutionStatus | undefined;
  triggeredTimestamp?: number | undefined;
  errorMessage?: string | undefined;
  destinations?: ScheduledQueryDestination[] | undefined;
}
export type TriggerHistoryRecordList = TriggerHistoryRecord[];
export interface GetScheduledQueryHistoryResponse {
  name?: string | undefined;
  scheduledQueryArn?: string | undefined;
  triggerHistory?: TriggerHistoryRecord[] | undefined;
  nextToken?: string | undefined;
}
export interface GetStorageTierPolicyRequest {}
export type StorageTier = "STANDARD" | "INTELLIGENT_TIERING" | (string & {});
export interface GetStorageTierPolicyResponse {
  storageTier?: StorageTier | undefined;
  lastUpdatedTime?: number | undefined;
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
  overwriteIfExists?: boolean | undefined;
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
  overwriteIfExists?: boolean | undefined;
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
  quoteCharacter?: string | undefined;
  delimiter?: string | undefined;
  columns?: string[] | undefined;
  source?: string | undefined;
  destination?: string | undefined;
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
  targetFormat?: string | undefined;
  matchPatterns: string[];
  sourceTimezone?: string | undefined;
  targetTimezone?: string | undefined;
  locale?: string | undefined;
}
export type WithKey = string;
export type DeleteWithKeys = string[];
export interface DeleteKeys {
  withKeys: string[];
}
export type GrokMatch = string;
export interface Grok {
  source?: string | undefined;
  match: string;
}
export type ValueKey = string;
export type Flatten = boolean;
export type FlattenedElement = "first" | "last" | (string & {});
export interface ListToMap {
  source: string;
  key: string;
  valueKey?: string | undefined;
  target?: string | undefined;
  flatten?: boolean | undefined;
  flattenedElement?: FlattenedElement | undefined;
}
export type LowerCaseStringWithKeys = string[];
export interface LowerCaseString {
  withKeys: string[];
}
export interface MoveKeyEntry {
  source: string;
  target: string;
  overwriteIfExists?: boolean | undefined;
}
export type MoveKeyEntries = MoveKeyEntry[];
export interface MoveKeys {
  entries: MoveKeyEntry[];
}
export interface ParseCloudfront {
  source?: string | undefined;
}
export interface ParseJSON {
  source?: string | undefined;
  destination?: string | undefined;
}
export type ParserFieldDelimiter = string;
export type KeyValueDelimiter = string;
export type KeyPrefix = string;
export type NonMatchValue = string;
export interface ParseKeyValue {
  source?: string | undefined;
  destination?: string | undefined;
  fieldDelimiter?: string | undefined;
  keyValueDelimiter?: string | undefined;
  keyPrefix?: string | undefined;
  nonMatchValue?: string | undefined;
  overwriteIfExists?: boolean | undefined;
}
export interface ParseRoute53 {
  source?: string | undefined;
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
  source?: string | undefined;
  eventSource: EventSource;
  ocsfVersion: OCSFVersion;
  mappingVersion?: string | undefined;
}
export interface ParsePostgres {
  source?: string | undefined;
}
export interface ParseVPC {
  source?: string | undefined;
}
export interface ParseWAF {
  source?: string | undefined;
}
export type RenameTo = string;
export interface RenameKeyEntry {
  key: string;
  renameTo: string;
  overwriteIfExists?: boolean | undefined;
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
  addKeys?: AddKeys | undefined;
  copyValue?: CopyValue | undefined;
  csv?: CSV | undefined;
  dateTimeConverter?: DateTimeConverter | undefined;
  deleteKeys?: DeleteKeys | undefined;
  grok?: Grok | undefined;
  listToMap?: ListToMap | undefined;
  lowerCaseString?: LowerCaseString | undefined;
  moveKeys?: MoveKeys | undefined;
  parseCloudfront?: ParseCloudfront | undefined;
  parseJSON?: ParseJSON | undefined;
  parseKeyValue?: ParseKeyValue | undefined;
  parseRoute53?: ParseRoute53 | undefined;
  parseToOCSF?: ParseToOCSF | undefined;
  parsePostgres?: ParsePostgres | undefined;
  parseVPC?: ParseVPC | undefined;
  parseWAF?: ParseWAF | undefined;
  renameKeys?: RenameKeys | undefined;
  splitString?: SplitString | undefined;
  substituteString?: SubstituteString | undefined;
  trimString?: TrimString | undefined;
  typeConverter?: TypeConverter | undefined;
  upperCaseString?: UpperCaseString | undefined;
}
export type Processors = Processor[];
export interface GetTransformerResponse {
  logGroupIdentifier?: string | undefined;
  creationTime?: number | undefined;
  lastModifiedTime?: number | undefined;
  transformerConfig?: Processor[] | undefined;
}
export type LogGroupNameRegexPattern = string;
export interface DataSourceFilter {
  name: string;
  type?: string | undefined;
}
export type DataSourceFilters = DataSourceFilter[];
export type ListAggregateLogGroupSummariesGroupBy =
  | "DATA_SOURCE_NAME_TYPE_AND_FORMAT"
  | "DATA_SOURCE_NAME_AND_TYPE"
  | (string & {});
export type ListLogGroupsRequestLimit = number;
export interface ListAggregateLogGroupSummariesRequest {
  accountIdentifiers?: string[] | undefined;
  includeLinkedAccounts?: boolean | undefined;
  logGroupClass?: LogGroupClass | undefined;
  logGroupNamePattern?: string | undefined;
  dataSources?: DataSourceFilter[] | undefined;
  groupBy: ListAggregateLogGroupSummariesGroupBy;
  nextToken?: string | undefined;
  limit?: number | undefined;
}
export type LogGroupCount = number;
export type GroupingIdentifierKey = string;
export type GroupingIdentifierValue = string;
export interface GroupingIdentifier {
  key?: string | undefined;
  value?: string | undefined;
}
export type GroupingIdentifiers = GroupingIdentifier[];
export interface AggregateLogGroupSummary {
  logGroupCount?: number | undefined;
  groupingIdentifiers?: GroupingIdentifier[] | undefined;
}
export type AggregateLogGroupSummaries = AggregateLogGroupSummary[];
export interface ListAggregateLogGroupSummariesResponse {
  aggregateLogGroupSummaries?: AggregateLogGroupSummary[] | undefined;
  nextToken?: string | undefined;
}
export type SuppressionState = "SUPPRESSED" | "UNSUPPRESSED" | (string & {});
export type ListAnomaliesLimit = number;
export interface ListAnomaliesRequest {
  anomalyDetectorArn?: string | undefined;
  suppressionState?: SuppressionState | undefined;
  limit?: number | undefined;
  nextToken?: string | undefined;
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
  timestamp?: number | undefined;
  message?: string | undefined;
}
export type LogSamples = LogEvent[];
export type DynamicTokenPosition = number;
export type TokenString = string;
export type TokenValue = number;
export type Enumerations = { [key: string]: number | undefined };
export type InferredTokenName = string;
export interface PatternToken {
  dynamicTokenPosition?: number | undefined;
  isDynamic?: boolean | undefined;
  tokenString?: string | undefined;
  enumerations?: { [key: string]: number | undefined } | undefined;
  inferredTokenName?: string | undefined;
}
export type PatternTokens = PatternToken[];
export interface Anomaly {
  anomalyId: string;
  patternId: string;
  anomalyDetectorArn: string;
  patternString: string;
  patternRegex?: string | undefined;
  priority?: string | undefined;
  firstSeen: number;
  lastSeen: number;
  description: string;
  active: boolean;
  state: State;
  histogram: { [key: string]: number | undefined };
  logSamples: LogEvent[];
  patternTokens: PatternToken[];
  logGroupArnList: string[];
  suppressed?: boolean | undefined;
  suppressedDate?: number | undefined;
  suppressedUntil?: number | undefined;
  isPatternLevelSuppression?: boolean | undefined;
}
export type Anomalies = Anomaly[];
export interface ListAnomaliesResponse {
  anomalies?: Anomaly[] | undefined;
  nextToken?: string | undefined;
}
export type IntegrationNamePrefix = string;
export interface ListIntegrationsRequest {
  integrationNamePrefix?: string | undefined;
  integrationType?: IntegrationType | undefined;
  integrationStatus?: IntegrationStatus | undefined;
}
export interface IntegrationSummary {
  integrationName?: string | undefined;
  integrationType?: IntegrationType | undefined;
  integrationStatus?: IntegrationStatus | undefined;
}
export type IntegrationSummaries = IntegrationSummary[];
export interface ListIntegrationsResponse {
  integrationSummaries?: IntegrationSummary[] | undefined;
}
export type ListLogAnomalyDetectorsLimit = number;
export interface ListLogAnomalyDetectorsRequest {
  filterLogGroupArn?: string | undefined;
  limit?: number | undefined;
  nextToken?: string | undefined;
}
export interface AnomalyDetector {
  anomalyDetectorArn?: string | undefined;
  detectorName?: string | undefined;
  logGroupArnList?: string[] | undefined;
  evaluationFrequency?: EvaluationFrequency | undefined;
  filterPattern?: string | undefined;
  anomalyDetectorStatus?: AnomalyDetectorStatus | undefined;
  kmsKeyId?: string | undefined;
  creationTimeStamp?: number | undefined;
  lastModifiedTimeStamp?: number | undefined;
  anomalyVisibilityTime?: number | undefined;
}
export type AnomalyDetectors = AnomalyDetector[];
export interface ListLogAnomalyDetectorsResponse {
  anomalyDetectors?: AnomalyDetector[] | undefined;
  nextToken?: string | undefined;
}
export type ListLimit = number;
export type FieldIndexNames = string[];
export type TagFilterKey = string;
export type TagFilterValue = string;
export type TagFilterValues = string[];
export interface TagFilter {
  key: string;
  values?: string[] | undefined;
}
export type TagFilters = TagFilter[];
export interface ListLogGroupsRequest {
  logGroupNamePattern?: string | undefined;
  logGroupClass?: LogGroupClass | undefined;
  includeLinkedAccounts?: boolean | undefined;
  accountIdentifiers?: string[] | undefined;
  nextToken?: string | undefined;
  limit?: number | undefined;
  dataSources?: DataSourceFilter[] | undefined;
  fieldIndexNames?: string[] | undefined;
  logGroupTags?: TagFilter[] | undefined;
}
export interface LogGroupSummary {
  logGroupName?: string | undefined;
  logGroupArn?: string | undefined;
  logGroupClass?: LogGroupClass | undefined;
}
export type LogGroupSummaries = LogGroupSummary[];
export interface ListLogGroupsResponse {
  logGroups?: LogGroupSummary[] | undefined;
  nextToken?: string | undefined;
}
export type ListLogGroupsForQueryMaxResults = number;
export interface ListLogGroupsForQueryRequest {
  queryId: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type LogGroupIdentifiers = string[];
export interface ListLogGroupsForQueryResponse {
  logGroupIdentifiers?: string[] | undefined;
  nextToken?: string | undefined;
}
export type ListScheduledQueriesMaxResults = number;
export interface ListScheduledQueriesRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  state?: ScheduledQueryState | undefined;
  scheduleType?: ScheduleType | undefined;
}
export interface ScheduledQuerySummary {
  scheduledQueryArn?: string | undefined;
  name?: string | undefined;
  state?: ScheduledQueryState | undefined;
  scheduleType?: ScheduleType | undefined;
  lastTriggeredTime?: number | undefined;
  lastExecutionStatus?: ExecutionStatus | undefined;
  scheduleExpression?: string | undefined;
  timezone?: string | undefined;
  destinationConfiguration?: DestinationConfiguration | undefined;
  creationTime?: number | undefined;
  lastUpdatedTime?: number | undefined;
}
export type ScheduledQuerySummaryList = ScheduledQuerySummary[];
export interface ListScheduledQueriesResponse {
  nextToken?: string | undefined;
  scheduledQueries?: ScheduledQuerySummary[] | undefined;
}
export type ListSourcesForS3TableIntegrationMaxResults = number;
export interface ListSourcesForS3TableIntegrationRequest {
  integrationArn: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type S3TableIntegrationSourceStatus =
  | "ACTIVE"
  | "UNHEALTHY"
  | "FAILED"
  | "DATA_SOURCE_DELETE_IN_PROGRESS"
  | (string & {});
export type S3TableIntegrationSourceStatusReason = string;
export interface S3TableIntegrationSource {
  identifier?: string | undefined;
  dataSource?: DataSource | undefined;
  status?: S3TableIntegrationSourceStatus | undefined;
  statusReason?: string | undefined;
  createdTimeStamp?: number | undefined;
  parentSourceIdentifier?: string | undefined;
}
export type S3TableIntegrationSources = S3TableIntegrationSource[];
export interface ListSourcesForS3TableIntegrationResponse {
  sources?: S3TableIntegrationSource[] | undefined;
  nextToken?: string | undefined;
}
export type ListSyslogConfigurationsMaxResults = number;
export interface ListSyslogConfigurationsRequest {
  logGroupIdentifier?: string | undefined;
  vpcEndpointId?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type SyslogSourceType = "VPCE" | (string & {});
export interface SyslogConfiguration {
  logGroupArn?: string | undefined;
  sourceType?: SyslogSourceType | undefined;
  vpcEndpointId?: string | undefined;
  createdAt?: number | undefined;
}
export type SyslogConfigurations = SyslogConfiguration[];
export interface ListSyslogConfigurationsResponse {
  syslogConfigurations?: SyslogConfiguration[] | undefined;
  nextToken?: string | undefined;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface ListTagsLogGroupRequest {
  logGroupName: string;
}
export interface ListTagsLogGroupResponse {
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutAccountPolicyRequest {
  policyName: string;
  policyDocument: string;
  policyType: PolicyType;
  scope?: Scope | undefined;
  selectionCriteria?: string | undefined;
  dryRun?: boolean | undefined;
}
export interface PutAccountPolicyResponse {
  accountPolicy?: AccountPolicy | undefined;
  dryRunResult?: DryRunResult | undefined;
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
  logGroupIdentifier?: string | undefined;
  policyDocument?: string | undefined;
  lastUpdatedTime?: number | undefined;
}
export interface PutDeliveryDestinationRequest {
  name: string;
  outputFormat?: OutputFormat | undefined;
  deliveryDestinationConfiguration?: DeliveryDestinationConfiguration | undefined;
  deliveryDestinationType?: DeliveryDestinationType | undefined;
  roleArn?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutDeliveryDestinationResponse {
  deliveryDestination?: DeliveryDestination | undefined;
}
export interface PutDeliveryDestinationPolicyRequest {
  deliveryDestinationName: string;
  deliveryDestinationPolicy: string;
}
export interface PutDeliveryDestinationPolicyResponse {
  policy?: Policy | undefined;
}
export interface PutDeliverySourceRequest {
  name: string;
  resourceArn: string;
  logType: string;
  tags?: { [key: string]: string | undefined } | undefined;
  deliverySourceConfiguration?: { [key: string]: string | undefined } | undefined;
}
export interface PutDeliverySourceResponse {
  deliverySource?: DeliverySource | undefined;
}
export interface PutDestinationRequest {
  destinationName: string;
  targetArn: string;
  roleArn: string;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutDestinationResponse {
  destination?: Destination | undefined;
}
export type ForceUpdate = boolean;
export interface PutDestinationPolicyRequest {
  destinationName: string;
  accessPolicy: string;
  forceUpdate?: boolean | undefined;
}
export interface PutDestinationPolicyResponse {}
export interface PutIndexPolicyRequest {
  logGroupIdentifier: string;
  policyDocument: string;
}
export interface PutIndexPolicyResponse {
  indexPolicy?: IndexPolicy | undefined;
}
export type DashboardViewerPrincipals = string[];
export type CollectionRetentionDays = number;
export interface OpenSearchResourceConfig {
  kmsKeyArn?: string | undefined;
  dataSourceRoleArn: string;
  dashboardViewerPrincipals: string[];
  applicationArn?: string | undefined;
  retentionDays: number;
}
export type ResourceConfig = { openSearchResourceConfig: OpenSearchResourceConfig };
export interface PutIntegrationRequest {
  integrationName: string;
  resourceConfig: ResourceConfig;
  integrationType: IntegrationType;
}
export interface PutIntegrationResponse {
  integrationName?: string | undefined;
  integrationStatus?: IntegrationStatus | undefined;
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
  keyAttributes?: { [key: string]: string | undefined } | undefined;
  attributes?: { [key: string]: string | undefined } | undefined;
}
export interface PutLogEventsRequest {
  logGroupName: string;
  logStreamName: string;
  logEvents: InputLogEvent[];
  sequenceToken?: string | undefined;
  entity?: Entity | undefined;
}
export type LogEventIndex = number;
export interface RejectedLogEventsInfo {
  tooNewLogEventStartIndex?: number | undefined;
  tooOldLogEventEndIndex?: number | undefined;
  expiredLogEventEndIndex?: number | undefined;
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
  nextSequenceToken?: string | undefined;
  rejectedLogEventsInfo?: RejectedLogEventsInfo | undefined;
  rejectedEntityInfo?: RejectedEntityInfo | undefined;
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
  applyOnTransformedLogs?: boolean | undefined;
  fieldSelectionCriteria?: string | undefined;
  emitSystemFieldDimensions?: string[] | undefined;
}
export interface PutMetricFilterResponse {}
export type ClientToken = string;
export interface PutQueryDefinitionRequest {
  queryLanguage?: QueryLanguage | undefined;
  name: string;
  queryDefinitionId?: string | undefined;
  logGroupNames?: string[] | undefined;
  queryString: string;
  clientToken?: string | undefined;
  parameters?: QueryParameter[] | undefined;
}
export interface PutQueryDefinitionResponse {
  queryDefinitionId?: string | undefined;
}
export interface PutResourcePolicyRequest {
  policyName?: string | undefined;
  policyDocument?: string | undefined;
  resourceArn?: string | undefined;
  expectedRevisionId?: string | undefined;
}
export interface PutResourcePolicyResponse {
  resourcePolicy?: ResourcePolicy | undefined;
  revisionId?: string | undefined;
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
  storageTier?: StorageTier | undefined;
  lastUpdatedTime?: number | undefined;
}
export interface PutSubscriptionFilterRequest {
  logGroupName: string;
  filterName: string;
  filterPattern: string;
  destinationArn: string;
  roleArn?: string | undefined;
  distribution?: Distribution | undefined;
  applyOnTransformedLogs?: boolean | undefined;
  fieldSelectionCriteria?: string | undefined;
  emitSystemFields?: string[] | undefined;
}
export interface PutSubscriptionFilterResponse {}
export interface PutSyslogConfigurationRequest {
  logGroupIdentifier: string;
  vpcEndpointId?: string | undefined;
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
  logStreamNames?: string[] | undefined;
  logStreamNamePrefixes?: string[] | undefined;
  logEventFilterPattern?: string | undefined;
}
export type RequestId = string;
export type SessionId = string;
export interface LiveTailSessionStart {
  requestId?: string | undefined;
  sessionId?: string | undefined;
  logGroupIdentifiers?: string[] | undefined;
  logStreamNames?: string[] | undefined;
  logStreamNamePrefixes?: string[] | undefined;
  logEventFilterPattern?: string | undefined;
}
export type IsSampled = boolean;
export interface LiveTailSessionMetadata {
  sampled?: boolean | undefined;
}
export interface LiveTailSessionLogEvent {
  logStreamName?: string | undefined;
  logGroupIdentifier?: string | undefined;
  message?: string | undefined;
  timestamp?: number | undefined;
  ingestionTime?: number | undefined;
}
export type LiveTailSessionResults = LiveTailSessionLogEvent[];
export interface LiveTailSessionUpdate {
  sessionMetadata?: LiveTailSessionMetadata | undefined;
  sessionResults?: LiveTailSessionLogEvent[] | undefined;
}
export interface SessionTimeoutException {
  message?: string | undefined;
}
export interface SessionStreamingException {
  message?: string | undefined;
}
export type StartLiveTailResponseStream =
  | {
      sessionStart: LiveTailSessionStart;
      sessionUpdate?: undefined;
      SessionTimeoutException?: undefined;
      SessionStreamingException?: undefined;
    }
  | {
      sessionStart?: undefined;
      sessionUpdate: LiveTailSessionUpdate;
      SessionTimeoutException?: undefined;
      SessionStreamingException?: undefined;
    }
  | {
      sessionStart?: undefined;
      sessionUpdate?: undefined;
      SessionTimeoutException: SessionTimeoutException;
      SessionStreamingException?: undefined;
    }
  | {
      sessionStart?: undefined;
      sessionUpdate?: undefined;
      SessionTimeoutException?: undefined;
      SessionStreamingException: SessionStreamingException;
    };
export interface StartLiveTailResponse {
  responseStream?: stream.Stream<StartLiveTailResponseStream, Error, never> | undefined;
}
export type EventsLimitStartQuery = number;
export interface StartQueryRequest {
  queryLanguage?: QueryLanguage | undefined;
  logGroupName?: string | undefined;
  logGroupNames?: string[] | undefined;
  logGroupIdentifiers?: string[] | undefined;
  startTime: number;
  endTime: number;
  queryString: string;
  limit?: number | undefined;
}
export interface StartQueryResponse {
  queryId?: string | undefined;
}
export interface StopQueryRequest {
  queryId: string;
}
export interface StopQueryResponse {
  success?: boolean | undefined;
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
  eventNumber?: number | undefined;
  eventMessage?: string | undefined;
  extractedValues?: { [key: string]: string | undefined } | undefined;
}
export type MetricFilterMatches = MetricFilterMatchRecord[];
export interface TestMetricFilterResponse {
  matches?: MetricFilterMatchRecord[] | undefined;
}
export interface TestTransformerRequest {
  transformerConfig: Processor[];
  logEventMessages: string[];
}
export type TransformedEventMessage = string;
export interface TransformedLogRecord {
  eventNumber?: number | undefined;
  eventMessage?: string | undefined;
  transformedEventMessage?: string | undefined;
}
export type TransformedLogs = TransformedLogRecord[];
export interface TestTransformerResponse {
  transformedLogs?: TransformedLogRecord[] | undefined;
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
  value?: number | undefined;
  suppressionUnit?: SuppressionUnit | undefined;
}
export type Baseline = boolean;
export interface UpdateAnomalyRequest {
  anomalyId?: string | undefined;
  patternId?: string | undefined;
  anomalyDetectorArn: string;
  suppressionType?: SuppressionType | undefined;
  suppressionPeriod?: SuppressionPeriod | undefined;
  baseline?: boolean | undefined;
}
export interface UpdateAnomalyResponse {}
export interface UpdateDeliveryConfigurationRequest {
  id: string;
  recordFields?: string[] | undefined;
  fieldDelimiter?: string | undefined;
  s3DeliveryConfiguration?: S3DeliveryConfiguration | undefined;
}
export interface UpdateDeliveryConfigurationResponse {}
export interface UpdateLogAnomalyDetectorRequest {
  anomalyDetectorArn: string;
  evaluationFrequency?: EvaluationFrequency | undefined;
  filterPattern?: string | undefined;
  anomalyVisibilityTime?: number | undefined;
  enabled: boolean;
}
export interface UpdateLogAnomalyDetectorResponse {}
export interface UpdateLookupTableRequest {
  lookupTableArn: string;
  description?: string | undefined;
  tableBody?: string | undefined;
  queryId?: string | undefined;
  kmsKeyId?: string | undefined;
}
export interface UpdateLookupTableResponse {
  lookupTableArn?: string | undefined;
  lastUpdatedTime?: number | undefined;
}
export interface UpdateScheduledQueryRequest {
  identifier: string;
  description?: string | undefined;
  queryLanguage: QueryLanguage;
  queryString: string;
  logGroupIdentifiers?: string[] | undefined;
  scheduleExpression: string;
  timezone?: string | undefined;
  startTimeOffset?: number | undefined;
  endTimeOffset?: number | undefined;
  destinationConfiguration?: DestinationConfiguration | undefined;
  scheduleStartTime?: number | undefined;
  scheduleEndTime?: number | undefined;
  executionRoleArn: string;
  state?: ScheduledQueryState | undefined;
}
export interface UpdateScheduledQueryResponse {
  scheduledQueryArn?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  queryLanguage?: QueryLanguage | undefined;
  queryString?: string | undefined;
  logGroupIdentifiers?: string[] | undefined;
  scheduleExpression?: string | undefined;
  timezone?: string | undefined;
  startTimeOffset?: number | undefined;
  endTimeOffset?: number | undefined;
  destinationConfiguration?: DestinationConfiguration | undefined;
  state?: ScheduledQueryState | undefined;
  scheduleType?: ScheduleType | undefined;
  lastTriggeredTime?: number | undefined;
  lastExecutionStatus?: ExecutionStatus | undefined;
  scheduleStartTime?: number | undefined;
  scheduleEndTime?: number | undefined;
  executionRoleArn?: string | undefined;
  creationTime?: number | undefined;
  lastUpdatedTime?: number | undefined;
}
export type QueryCharOffset = number;
export interface QueryCompileErrorLocation {
  startCharOffset?: number | undefined;
  endCharOffset?: number | undefined;
}
export interface QueryCompileError {
  location?: QueryCompileErrorLocation | undefined;
  message?: string | undefined;
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
  AssociateKmsKeyRequest & RegionInput,
  AssociateKmsKeyResponse,
  AssociateKmsKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<AssociateKmsKeyRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<AssociateKmsKeyResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateKmsKey",
  telemetry: TELEMETRY,
  span: "AssociateKmsKey",
}));

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
  AssociateSourceToS3TableIntegrationRequest & RegionInput,
  AssociateSourceToS3TableIntegrationResponse,
  AssociateSourceToS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<AssociateSourceToS3TableIntegrationRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<AssociateSourceToS3TableIntegrationResponse>,
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
  telemetry: TELEMETRY,
  span: "AssociateSourceToS3TableIntegration",
}));

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
  CancelExportTaskRequest & RegionInput,
  CancelExportTaskResponse,
  CancelExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<CancelExportTaskRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<CancelExportTaskResponse>,
  errors: [
    InvalidOperationException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelExportTask",
  telemetry: TELEMETRY,
  span: "CancelExportTask",
}));

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
  CancelImportTaskRequest & RegionInput,
  CancelImportTaskResponse,
  CancelImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<CancelImportTaskRequest>,
  output: __S(1377, __c43, 1) as any as S.Schema<CancelImportTaskResponse>,
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
  telemetry: TELEMETRY,
  span: "CancelImportTask",
}));

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
  CreateDeliveryRequest & RegionInput,
  CreateDeliveryResponse,
  CreateDeliveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<CreateDeliveryRequest>,
  output: __S(1600, __c50, 0) as any as S.Schema<CreateDeliveryResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateDelivery",
}));

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
  CreateExportTaskRequest & RegionInput,
  CreateExportTaskResponse,
  CreateExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<CreateExportTaskRequest>,
  output: __S(1633, __c51, 1) as any as S.Schema<CreateExportTaskResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateExportTask",
}));

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
  CreateImportTaskRequest & RegionInput,
  CreateImportTaskResponse,
  CreateImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<CreateImportTaskRequest>,
  output: __S(1665, __c52, 1) as any as S.Schema<CreateImportTaskResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateImportTask",
}));

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
  CreateLogAnomalyDetectorRequest & RegionInput,
  CreateLogAnomalyDetectorResponse,
  CreateLogAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<CreateLogAnomalyDetectorRequest>,
  output: __S(1729, __c54, 1) as any as S.Schema<CreateLogAnomalyDetectorResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateLogAnomalyDetector",
}));

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
  CreateLogGroupRequest & RegionInput,
  CreateLogGroupResponse,
  CreateLogGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<CreateLogGroupRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<CreateLogGroupResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateLogGroup",
}));

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
  CreateLogStreamRequest & RegionInput,
  CreateLogStreamResponse,
  CreateLogStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<CreateLogStreamRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<CreateLogStreamResponse>,
  errors: [
    InvalidParameterException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLogStream",
  telemetry: TELEMETRY,
  span: "CreateLogStream",
}));

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
  CreateLookupTableRequest & RegionInput,
  CreateLookupTableResponse,
  CreateLookupTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<CreateLookupTableRequest>,
  output: __S(1825, __c57, 1) as any as S.Schema<CreateLookupTableResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateLookupTable",
}));

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
  CreateScheduledQueryRequest & RegionInput,
  CreateScheduledQueryResponse,
  CreateScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<CreateScheduledQueryRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<CreateScheduledQueryResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateScheduledQuery",
}));

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
 * If you delete a retention policy, the log groups that it applied to use their own retention
 * setting, unless another retention policy applies to them. Deleting a retention policy does not
 * restore log events that CloudWatch Logs has already deleted.
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
 * - To delete a retention policy, you must have the
 * `logs:DeleteRetentionPolicy` and `logs:DeleteAccountPolicy`
 * permissions. To preview the impact of deleting a retention policy, specify
 * `true` for `dryRun`. A dry run requires the same
 * permissions as the operation that it previews, and no additional permissions.
 *
 * If you delete a field index policy, the indexing of the log events that happened before
 * you deleted the policy will still be used for up to 30 days to improve CloudWatch Logs
 * Insights queries.
 */
export const deleteAccountPolicy: API.OperationMethod<
  DeleteAccountPolicyRequest & RegionInput,
  DeleteAccountPolicyResponse,
  DeleteAccountPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<DeleteAccountPolicyRequest>,
  output: __S(1921, __c60, 1) as any as S.Schema<DeleteAccountPolicyResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountPolicy",
  telemetry: TELEMETRY,
  span: "DeleteAccountPolicy",
}));

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
  DeleteDataProtectionPolicyRequest & RegionInput,
  DeleteDataProtectionPolicyResponse,
  DeleteDataProtectionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<DeleteDataProtectionPolicyRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteDataProtectionPolicyResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataProtectionPolicy",
  telemetry: TELEMETRY,
  span: "DeleteDataProtectionPolicy",
}));

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
  DeleteDeliveryRequest & RegionInput,
  DeleteDeliveryResponse,
  DeleteDeliveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<DeleteDeliveryRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteDeliveryResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteDelivery",
}));

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
  DeleteDeliveryDestinationRequest & RegionInput,
  DeleteDeliveryDestinationResponse,
  DeleteDeliveryDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<DeleteDeliveryDestinationRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteDeliveryDestinationResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteDeliveryDestination",
}));

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
  DeleteDeliveryDestinationPolicyRequest & RegionInput,
  DeleteDeliveryDestinationPolicyResponse,
  DeleteDeliveryDestinationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<DeleteDeliveryDestinationPolicyRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteDeliveryDestinationPolicyResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeliveryDestinationPolicy",
  telemetry: TELEMETRY,
  span: "DeleteDeliveryDestinationPolicy",
}));

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
  DeleteDeliverySourceRequest & RegionInput,
  DeleteDeliverySourceResponse,
  DeleteDeliverySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<DeleteDeliverySourceRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteDeliverySourceResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteDeliverySource",
}));

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
  DeleteDestinationRequest & RegionInput,
  DeleteDestinationResponse,
  DeleteDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<DeleteDestinationRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteDestinationResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDestination",
  telemetry: TELEMETRY,
  span: "DeleteDestination",
}));

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
  DeleteIndexPolicyRequest & RegionInput,
  DeleteIndexPolicyResponse,
  DeleteIndexPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<DeleteIndexPolicyRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteIndexPolicyResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteIndexPolicy",
}));

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
  DeleteIntegrationRequest & RegionInput,
  DeleteIntegrationResponse,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<DeleteIntegrationRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteIntegrationResponse>,
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
  telemetry: TELEMETRY,
  span: "DeleteIntegration",
}));

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
  DeleteLogAnomalyDetectorRequest & RegionInput,
  DeleteLogAnomalyDetectorResponse,
  DeleteLogAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<DeleteLogAnomalyDetectorRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteLogAnomalyDetectorResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLogAnomalyDetector",
  telemetry: TELEMETRY,
  span: "DeleteLogAnomalyDetector",
}));

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
  DeleteLogGroupRequest & RegionInput,
  DeleteLogGroupResponse,
  DeleteLogGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<DeleteLogGroupRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteLogGroupResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteLogGroup",
}));

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
  DeleteLogStreamRequest & RegionInput,
  DeleteLogStreamResponse,
  DeleteLogStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<DeleteLogStreamRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteLogStreamResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteLogStream",
}));

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
  DeleteLookupTableRequest & RegionInput,
  DeleteLookupTableResponse,
  DeleteLookupTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<DeleteLookupTableRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteLookupTableResponse>,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLookupTable",
  telemetry: TELEMETRY,
  span: "DeleteLookupTable",
}));

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
  DeleteMetricFilterRequest & RegionInput,
  DeleteMetricFilterResponse,
  DeleteMetricFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<DeleteMetricFilterRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteMetricFilterResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetricFilter",
  telemetry: TELEMETRY,
  span: "DeleteMetricFilter",
}));

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
  DeleteQueryDefinitionRequest & RegionInput,
  DeleteQueryDefinitionResponse,
  DeleteQueryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<DeleteQueryDefinitionRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteQueryDefinitionResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueryDefinition",
  telemetry: TELEMETRY,
  span: "DeleteQueryDefinition",
}));

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
  DeleteResourcePolicyRequest & RegionInput,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
  telemetry: TELEMETRY,
  span: "DeleteResourcePolicy",
}));

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
 *
 * If an account-level retention policy applies to this log group, the log group uses
 * the retention period from that policy. For more information about account-level retention
 * policies, see PutAccountPolicy.
 */
export const deleteRetentionPolicy: API.OperationMethod<
  DeleteRetentionPolicyRequest & RegionInput,
  DeleteRetentionPolicyResponse,
  DeleteRetentionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<DeleteRetentionPolicyRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteRetentionPolicyResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRetentionPolicy",
  telemetry: TELEMETRY,
  span: "DeleteRetentionPolicy",
}));

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
  DeleteScheduledQueryRequest & RegionInput,
  DeleteScheduledQueryResponse,
  DeleteScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<DeleteScheduledQueryRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteScheduledQueryResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteScheduledQuery",
}));

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
  DeleteSubscriptionFilterRequest & RegionInput,
  DeleteSubscriptionFilterResponse,
  DeleteSubscriptionFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<DeleteSubscriptionFilterRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteSubscriptionFilterResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriptionFilter",
  telemetry: TELEMETRY,
  span: "DeleteSubscriptionFilter",
}));

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
  DeleteSyslogConfigurationRequest & RegionInput,
  DeleteSyslogConfigurationResponse,
  DeleteSyslogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<DeleteSyslogConfigurationRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteSyslogConfigurationResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteSyslogConfiguration",
}));

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
  DeleteTransformerRequest & RegionInput,
  DeleteTransformerResponse,
  DeleteTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<DeleteTransformerRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DeleteTransformerResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteTransformer",
}));

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
 *
 * - To see retention policies, you must have the `logs:DescribeAccountPolicies`
 * permission.
 */
export const describeAccountPolicies: API.OperationMethod<
  DescribeAccountPoliciesRequest & RegionInput,
  DescribeAccountPoliciesResponse,
  DescribeAccountPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<DescribeAccountPoliciesRequest>,
  output: __S(2658, __c83, 2) as any as S.Schema<DescribeAccountPoliciesResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountPolicies",
  telemetry: TELEMETRY,
  span: "DescribeAccountPolicies",
}));

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
  DescribeConfigurationTemplatesRequest & RegionInput,
  DescribeConfigurationTemplatesResponse,
  DescribeConfigurationTemplatesError,
  Credentials | HttpClient.HttpClient,
  ConfigurationTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<DescribeConfigurationTemplatesRequest>,
  output: __S(2729, __c85, 9) as any as S.Schema<DescribeConfigurationTemplatesResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeConfigurationTemplates",
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
  DescribeDeliveriesRequest & RegionInput,
  DescribeDeliveriesResponse,
  DescribeDeliveriesError,
  Credentials | HttpClient.HttpClient,
  Delivery
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<DescribeDeliveriesRequest>,
  output: __S(2786, __c87, 2) as any as S.Schema<DescribeDeliveriesResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeDeliveries",
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
  DescribeDeliveryDestinationsRequest & RegionInput,
  DescribeDeliveryDestinationsResponse,
  DescribeDeliveryDestinationsError,
  Credentials | HttpClient.HttpClient,
  DeliveryDestination
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<DescribeDeliveryDestinationsRequest>,
  output: __S(2818, __c88, 2) as any as S.Schema<DescribeDeliveryDestinationsResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeDeliveryDestinations",
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
  DescribeDeliverySourcesRequest & RegionInput,
  DescribeDeliverySourcesResponse,
  DescribeDeliverySourcesError,
  Credentials | HttpClient.HttpClient,
  DeliverySource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2880, __c90, 0) as any as S.Schema<DescribeDeliverySourcesRequest>,
  output: __S(2882, __c90, 2) as any as S.Schema<DescribeDeliverySourcesResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeDeliverySources",
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
  DescribeDestinationsRequest & RegionInput,
  DescribeDestinationsResponse,
  DescribeDestinationsError,
  Credentials | HttpClient.HttpClient,
  Destination
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<DescribeDestinationsRequest>,
  output: __S(2946, __c92, 2) as any as S.Schema<DescribeDestinationsResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeDestinations",
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
  DescribeExportTasksRequest & RegionInput,
  DescribeExportTasksResponse,
  DescribeExportTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<DescribeExportTasksRequest>,
  output: __S(3013, __c94, 5) as any as S.Schema<DescribeExportTasksResponse>,
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExportTasks",
  telemetry: TELEMETRY,
  span: "DescribeExportTasks",
}));

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
  DescribeFieldIndexesRequest & RegionInput,
  DescribeFieldIndexesResponse,
  DescribeFieldIndexesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<DescribeFieldIndexesRequest>,
  output: __S(3043, __c95, 3) as any as S.Schema<DescribeFieldIndexesResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeFieldIndexes",
}));

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
  DescribeImportTaskBatchesRequest & RegionInput,
  DescribeImportTaskBatchesResponse,
  DescribeImportTaskBatchesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<DescribeImportTaskBatchesRequest>,
  output: __S(3075, __c96, 3) as any as S.Schema<DescribeImportTaskBatchesResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeImportTaskBatches",
}));

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
  DescribeImportTasksRequest & RegionInput,
  DescribeImportTasksResponse,
  DescribeImportTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<DescribeImportTasksRequest>,
  output: __S(3107, __c97, 3) as any as S.Schema<DescribeImportTasksResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeImportTasks",
}));

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
  DescribeIndexPoliciesRequest & RegionInput,
  DescribeIndexPoliciesResponse,
  DescribeIndexPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<DescribeIndexPoliciesRequest>,
  output: __S(3138, __c98, 2) as any as S.Schema<DescribeIndexPoliciesResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeIndexPolicies",
}));

export type DescribeLogGroupsError =
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns information about log groups, including data sources that ingest into each log
 * group. You can return all your log groups or filter the results by prefix. The results are
 * ASCII-sorted by log group name.
 *
 * If an account-level retention policy applies to a log group, `retentionInDays`
 * shows the retention period from that policy, and `retentionPolicyName` shows the
 * name of the policy.
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
  DescribeLogGroupsRequest & RegionInput,
  DescribeLogGroupsResponse,
  DescribeLogGroupsError,
  Credentials | HttpClient.HttpClient,
  LogGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<DescribeLogGroupsRequest>,
  output: __S(3203, __c100, 3) as any as S.Schema<DescribeLogGroupsResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeLogGroups",
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
  DescribeLogStreamsRequest & RegionInput,
  DescribeLogStreamsResponse,
  DescribeLogStreamsError,
  Credentials | HttpClient.HttpClient,
  LogStream
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<DescribeLogStreamsRequest>,
  output: __S(3235, __c101, 3) as any as S.Schema<DescribeLogStreamsResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLogStreams",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "logStreams",
    pageSize: "limit",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeLogStreams",
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
  DescribeLookupTablesRequest & RegionInput,
  DescribeLookupTablesResponse,
  DescribeLookupTablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3264, __c102, 0) as any as S.Schema<DescribeLookupTablesRequest>,
  output: __S(3267, __c102, 3) as any as S.Schema<DescribeLookupTablesResponse>,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLookupTables",
  telemetry: TELEMETRY,
  span: "DescribeLookupTables",
}));

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
  DescribeMetricFiltersRequest & RegionInput,
  DescribeMetricFiltersResponse,
  DescribeMetricFiltersError,
  Credentials | HttpClient.HttpClient,
  MetricFilter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<DescribeMetricFiltersRequest>,
  output: __S(3299, __c103, 3) as any as S.Schema<DescribeMetricFiltersResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetricFilters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metricFilters",
    pageSize: "limit",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeMetricFilters",
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
  DescribeQueriesRequest & RegionInput,
  DescribeQueriesResponse,
  DescribeQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3360, __c105, 0) as any as S.Schema<DescribeQueriesRequest>,
  output: __S(3363, __c105, 3) as any as S.Schema<DescribeQueriesResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQueries",
  telemetry: TELEMETRY,
  span: "DescribeQueries",
}));

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
  DescribeQueryDefinitionsRequest & RegionInput,
  DescribeQueryDefinitionsResponse,
  DescribeQueryDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3392, __c106, 0) as any as S.Schema<DescribeQueryDefinitionsRequest>,
  output: __S(3395, __c106, 3) as any as S.Schema<DescribeQueryDefinitionsResponse>,
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQueryDefinitions",
  telemetry: TELEMETRY,
  span: "DescribeQueryDefinitions",
}));

export type DescribeResourcePoliciesError =
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the resource policies in this account.
 */
export const describeResourcePolicies: API.OperationMethod<
  DescribeResourcePoliciesRequest & RegionInput,
  DescribeResourcePoliciesResponse,
  DescribeResourcePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<DescribeResourcePoliciesRequest>,
  output: __S(3458, __c108, 2) as any as S.Schema<DescribeResourcePoliciesResponse>,
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicies",
  telemetry: TELEMETRY,
  span: "DescribeResourcePolicies",
}));

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
  DescribeSubscriptionFiltersRequest & RegionInput,
  DescribeSubscriptionFiltersResponse,
  DescribeSubscriptionFiltersError,
  Credentials | HttpClient.HttpClient,
  SubscriptionFilter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<DescribeSubscriptionFiltersRequest>,
  output: __S(3523, __c110, 3) as any as S.Schema<DescribeSubscriptionFiltersResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubscriptionFilters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscriptionFilters",
    pageSize: "limit",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeSubscriptionFilters",
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
  DisassociateKmsKeyRequest & RegionInput,
  DisassociateKmsKeyResponse,
  DisassociateKmsKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3552, __c111, 0) as any as S.Schema<DisassociateKmsKeyRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<DisassociateKmsKeyResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateKmsKey",
  telemetry: TELEMETRY,
  span: "DisassociateKmsKey",
}));

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
  DisassociateSourceFromS3TableIntegrationRequest & RegionInput,
  DisassociateSourceFromS3TableIntegrationResponse,
  DisassociateSourceFromS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<DisassociateSourceFromS3TableIntegrationRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<DisassociateSourceFromS3TableIntegrationResponse>,
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
  telemetry: TELEMETRY,
  span: "DisassociateSourceFromS3TableIntegration",
}));

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
  FilterLogEventsRequest & RegionInput,
  FilterLogEventsResponse,
  FilterLogEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<FilterLogEventsRequest>,
  output: __S(3621, __c113, 5) as any as S.Schema<FilterLogEventsResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FilterLogEvents",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", pageSize: "limit" } as const,
  telemetry: TELEMETRY,
  span: "FilterLogEvents",
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
  GetDataProtectionPolicyRequest & RegionInput,
  GetDataProtectionPolicyResponse,
  GetDataProtectionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3648, __c114, 0) as any as S.Schema<GetDataProtectionPolicyRequest>,
  output: __S(3680, __c115, 0) as any as S.Schema<GetDataProtectionPolicyResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataProtectionPolicy",
  telemetry: TELEMETRY,
  span: "GetDataProtectionPolicy",
}));

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
  GetDeliveryRequest & RegionInput,
  GetDeliveryResponse,
  GetDeliveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3712, __c116, 0) as any as S.Schema<GetDeliveryRequest>,
  output: __S(1600, __c50, 0) as any as S.Schema<GetDeliveryResponse>,
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
  telemetry: TELEMETRY,
  span: "GetDelivery",
}));

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
  GetDeliveryDestinationRequest & RegionInput,
  GetDeliveryDestinationResponse,
  GetDeliveryDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3744, __c117, 0) as any as S.Schema<GetDeliveryDestinationRequest>,
  output: __S(3776, __c118, 0) as any as S.Schema<GetDeliveryDestinationResponse>,
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
  telemetry: TELEMETRY,
  span: "GetDeliveryDestination",
}));

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
  GetDeliveryDestinationPolicyRequest & RegionInput,
  GetDeliveryDestinationPolicyResponse,
  GetDeliveryDestinationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<GetDeliveryDestinationPolicyRequest>,
  output: __S(3841, __c120, 1) as any as S.Schema<GetDeliveryDestinationPolicyResponse>,
  errors: [ResourceNotFoundException, ServiceUnavailableException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliveryDestinationPolicy",
  telemetry: TELEMETRY,
  span: "GetDeliveryDestinationPolicy",
}));

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
  GetDeliverySourceRequest & RegionInput,
  GetDeliverySourceResponse,
  GetDeliverySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3872, __c121, 0) as any as S.Schema<GetDeliverySourceRequest>,
  output: __S(3904, __c122, 0) as any as S.Schema<GetDeliverySourceResponse>,
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
  telemetry: TELEMETRY,
  span: "GetDeliverySource",
}));

export type GetIntegrationError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns information about one integration between CloudWatch Logs and OpenSearch Service.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationRequest & RegionInput,
  GetIntegrationResponse,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3936, __c123, 0) as any as S.Schema<GetIntegrationRequest>,
  output: __S(3945, __c123, 9) as any as S.Schema<GetIntegrationResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
  telemetry: TELEMETRY,
  span: "GetIntegration",
}));

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
  GetLogAnomalyDetectorRequest & RegionInput,
  GetLogAnomalyDetectorResponse,
  GetLogAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3968, __c124, 0) as any as S.Schema<GetLogAnomalyDetectorRequest>,
  output: __S(3969, __c124, 1) as any as S.Schema<GetLogAnomalyDetectorResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogAnomalyDetector",
  telemetry: TELEMETRY,
  span: "GetLogAnomalyDetector",
}));

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
 * If you set `startFromHead` to `true` and you don't include
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
  GetLogEventsRequest & RegionInput,
  GetLogEventsResponse,
  GetLogEventsError,
  Credentials | HttpClient.HttpClient,
  OutputLogEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4032, __c126, 0) as any as S.Schema<GetLogEventsRequest>,
  output: __S(4035, __c126, 3) as any as S.Schema<GetLogEventsResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextForwardToken",
    items: "events",
    pageSize: "limit",
  } as const,
  telemetry: TELEMETRY,
  span: "GetLogEvents",
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
  GetLogFieldsRequest & RegionInput,
  GetLogFieldsResponse,
  GetLogFieldsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4064, __c127, 0) as any as S.Schema<GetLogFieldsRequest>,
  output: __S(4068, __c127, 4) as any as S.Schema<GetLogFieldsResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogFields",
  telemetry: TELEMETRY,
  span: "GetLogFields",
}));

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
  GetLogGroupFieldsRequest & RegionInput,
  GetLogGroupFieldsResponse,
  GetLogGroupFieldsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4096, __c128, 0) as any as S.Schema<GetLogGroupFieldsRequest>,
  output: __S(4099, __c128, 3) as any as S.Schema<GetLogGroupFieldsResponse>,
  errors: [
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogGroupFields",
  telemetry: TELEMETRY,
  span: "GetLogGroupFields",
}));

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
  GetLogObjectRequest & RegionInput,
  GetLogObjectResponse,
  GetLogObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4128, __c129, 0) as any as S.Schema<GetLogObjectRequest>,
  output: __S(4131, __c129, 3) as any as S.Schema<GetLogObjectResponse>,
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
  telemetry: TELEMETRY,
  span: "GetLogObject",
}));

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
  GetLogRecordRequest & RegionInput,
  GetLogRecordResponse,
  GetLogRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4192, __c131, 0) as any as S.Schema<GetLogRecordRequest>,
  output: __S(4193, __c131, 1) as any as S.Schema<GetLogRecordResponse>,
  errors: [
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogRecord",
  telemetry: TELEMETRY,
  span: "GetLogRecord",
}));

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
  GetLookupTableRequest & RegionInput,
  GetLookupTableResponse,
  GetLookupTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4224, __c132, 0) as any as S.Schema<GetLookupTableRequest>,
  output: __S(4225, __c132, 1) as any as S.Schema<GetLookupTableResponse>,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLookupTable",
  telemetry: TELEMETRY,
  span: "GetLookupTable",
}));

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
  GetQueryResultsRequest & RegionInput,
  GetQueryResultsResponse,
  GetQueryResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4256, __c133, 0) as any as S.Schema<GetQueryResultsRequest>,
  output: __S(4261, __c133, 5) as any as S.Schema<GetQueryResultsResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResults",
  telemetry: TELEMETRY,
  span: "GetQueryResults",
}));

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
  GetScheduledQueryRequest & RegionInput,
  GetScheduledQueryResponse,
  GetScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4288, __c134, 0) as any as S.Schema<GetScheduledQueryRequest>,
  output: __S(4320, __c135, 0) as any as S.Schema<GetScheduledQueryResponse>,
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
  telemetry: TELEMETRY,
  span: "GetScheduledQuery",
}));

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
  GetScheduledQueryHistoryRequest & RegionInput,
  GetScheduledQueryHistoryResponse,
  GetScheduledQueryHistoryError,
  Credentials | HttpClient.HttpClient,
  TriggerHistoryRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<GetScheduledQueryHistoryRequest>,
  output: __S(4357, __c136, 5) as any as S.Schema<GetScheduledQueryHistoryResponse>,
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
  telemetry: TELEMETRY,
  span: "GetScheduledQueryHistory",
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
  GetStorageTierPolicyRequest & RegionInput,
  GetStorageTierPolicyResponse,
  GetStorageTierPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4384, __c137, 0) as any as S.Schema<GetStorageTierPolicyRequest>,
  output: __S(4416, __c138, 0) as any as S.Schema<GetStorageTierPolicyResponse>,
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
  telemetry: TELEMETRY,
  span: "GetStorageTierPolicy",
}));

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
  GetTransformerRequest & RegionInput,
  GetTransformerResponse,
  GetTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4448, __c139, 0) as any as S.Schema<GetTransformerRequest>,
  output: __S(4449, __c139, 1) as any as S.Schema<GetTransformerResponse>,
  errors: [
    InvalidOperationException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTransformer",
  telemetry: TELEMETRY,
  span: "GetTransformer",
}));

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
  ListAggregateLogGroupSummariesRequest & RegionInput,
  ListAggregateLogGroupSummariesResponse,
  ListAggregateLogGroupSummariesError,
  Credentials | HttpClient.HttpClient,
  AggregateLogGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4512, __c141, 0) as any as S.Schema<ListAggregateLogGroupSummariesRequest>,
  output: __S(4517, __c141, 5) as any as S.Schema<ListAggregateLogGroupSummariesResponse>,
  errors: [InvalidParameterException, ServiceUnavailableException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAggregateLogGroupSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "aggregateLogGroupSummaries",
    pageSize: "limit",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAggregateLogGroupSummaries",
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
  ListAnomaliesRequest & RegionInput,
  ListAnomaliesResponse,
  ListAnomaliesError,
  Credentials | HttpClient.HttpClient,
  Anomaly
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4576, __c143, 0) as any as S.Schema<ListAnomaliesRequest>,
  output: __S(4584, __c143, 8) as any as S.Schema<ListAnomaliesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListAnomalies",
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
  ListIntegrationsRequest & RegionInput,
  ListIntegrationsResponse,
  ListIntegrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4608, __c144, 0) as any as S.Schema<ListIntegrationsRequest>,
  output: __S(4611, __c144, 3) as any as S.Schema<ListIntegrationsResponse>,
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegrations",
  telemetry: TELEMETRY,
  span: "ListIntegrations",
}));

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
  ListLogAnomalyDetectorsRequest & RegionInput,
  ListLogAnomalyDetectorsResponse,
  ListLogAnomalyDetectorsError,
  Credentials | HttpClient.HttpClient,
  AnomalyDetector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4640, __c145, 0) as any as S.Schema<ListLogAnomalyDetectorsRequest>,
  output: __S(4643, __c145, 3) as any as S.Schema<ListLogAnomalyDetectorsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListLogAnomalyDetectors",
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
  ListLogGroupsRequest & RegionInput,
  ListLogGroupsResponse,
  ListLogGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4674, __c146, 2) as any as S.Schema<ListLogGroupsRequest>,
  output: __S(4677, __c146, 5) as any as S.Schema<ListLogGroupsResponse>,
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLogGroups",
  telemetry: TELEMETRY,
  span: "ListLogGroups",
}));

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
  ListLogGroupsForQueryRequest & RegionInput,
  ListLogGroupsForQueryResponse,
  ListLogGroupsForQueryError,
  Credentials | HttpClient.HttpClient,
  LogGroupIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4704, __c147, 0) as any as S.Schema<ListLogGroupsForQueryRequest>,
  output: __S(4705, __c147, 1) as any as S.Schema<ListLogGroupsForQueryResponse>,
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
  telemetry: TELEMETRY,
  span: "ListLogGroupsForQuery",
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
  ListScheduledQueriesRequest & RegionInput,
  ListScheduledQueriesResponse,
  ListScheduledQueriesError,
  Credentials | HttpClient.HttpClient,
  ScheduledQuerySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4736, __c148, 0) as any as S.Schema<ListScheduledQueriesRequest>,
  output: __S(4739, __c148, 3) as any as S.Schema<ListScheduledQueriesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListScheduledQueries",
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
  ListSourcesForS3TableIntegrationRequest & RegionInput,
  ListSourcesForS3TableIntegrationResponse,
  ListSourcesForS3TableIntegrationError,
  Credentials | HttpClient.HttpClient,
  S3TableIntegrationSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4768, __c149, 0) as any as S.Schema<ListSourcesForS3TableIntegrationRequest>,
  output: __S(4771, __c149, 3) as any as S.Schema<ListSourcesForS3TableIntegrationResponse>,
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
  telemetry: TELEMETRY,
  span: "ListSourcesForS3TableIntegration",
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
  ListSyslogConfigurationsRequest & RegionInput,
  ListSyslogConfigurationsResponse,
  ListSyslogConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4800, __c150, 0) as any as S.Schema<ListSyslogConfigurationsRequest>,
  output: __S(4803, __c150, 3) as any as S.Schema<ListSyslogConfigurationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListSyslogConfigurations",
}));

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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

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
  ListTagsLogGroupRequest & RegionInput,
  ListTagsLogGroupResponse,
  ListTagsLogGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<ListTagsLogGroupRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<ListTagsLogGroupResponse>,
  errors: [ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsLogGroup",
  telemetry: TELEMETRY,
  span: "ListTagsLogGroup",
}));

export type PutAccountPolicyError =
  | InvalidParameterException
  | LimitExceededException
  | OperationAbortedException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates an account-level data protection policy, subscription filter policy, field index
 * policy, transformer policy, metric extraction policy, or retention policy that applies to all
 * log groups, a subset of log groups, or a data source name and type combination in the
 * account. Account-level
 * policies are Region-specific: a policy applies only to log groups in the Region where you
 * create it. To apply a policy across multiple Regions, create the policy separately in each
 * Region.
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
 * - *Data protection* -- The two policies are cumulative. Any sensitive
 * term specified in either the account-level or the log-group-level policy is masked.
 *
 * - *Subscription filters* -- Account-level and log-group-level
 * subscription filters are additive. A log group can have up to 1 account-level and up to 2
 * log-group-level subscription filters.
 *
 * - *Transformers* -- A log-group-level transformer overrides the
 * account-level transformer. If a log group has its own transformer, it ignores the
 * account-level transformer policy.
 *
 * - *Field index policies* -- If a log group has its own field index
 * policy (created with `PutIndexPolicy`), any account-level policy that uses
 * `LogGroupNamePrefix` selection criteria or has no selection criteria is ignored
 * for that log group. However, account-level policies that use `DataSourceName`
 * and `DataSourceType` selection criteria still apply alongside the log-group-level
 * policy.
 *
 * - *Metric extraction policies* -- Metric extraction policies are
 * account-level only and have no log-group-level equivalent, so no conflict resolution
 * applies.
 *
 * - *Retention policies* -- An account-level retention policy overrides
 * the retention setting of the log group.
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
 * - To create a retention policy, you must have the `logs:PutRetentionPolicy`
 * and `logs:PutAccountPolicy` permissions. A dry run requires the same
 * permissions as the operation that it previews, and no additional permissions.
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
 *
 * **Retention policy**
 *
 * A retention policy sets the retention period for log groups in your account. You can use an
 * account-level retention policy to set a default retention period for all log groups in the
 * account, or for a subset of log groups that you specify with the
 * `selectionCriteria` parameter. CloudWatch Logs automatically deletes log events
 * that are older than the retention period.
 *
 * Each account can have up to 20 account-level retention policies in each Region. To scope a
 * retention policy to a subset of log groups, use `LogGroupNamePrefix` in
 * `selectionCriteria`. Retention policies support log group name prefixes only. If
 * you omit `selectionCriteria`, the policy applies
 * to all log groups in the account.
 *
 * Unlike other account-level policy types, retention policies can have overlapping selection
 * criteria. When more than one retention policy applies to a log group, the policy with the
 * longest retention period is used. A policy that specifies `NEVER_EXPIRE` is treated
 * as the longest retention period. This lets you set a baseline retention period for the account,
 * apply longer retention periods to specific log groups, and exempt specific log groups from
 * expiring at all. If two policies that apply to the same log group specify the same retention
 * period, the policy that was created first is the one reported in
 * `retentionPolicyName`.
 *
 * Account-level retention policies require a minimum retention period of 30 days.
 *
 * A retention policy takes effect 24 hours after you create it. If you update a policy, the
 * new retention period takes effect 24 hours after the update, and the previous retention
 * period stays in effect until then. During this period, `DescribeLogGroups` and log
 * event expiration use the retention period that is currently in effect, but a dry run reports
 * the impact as if the policy were already in effect.
 *
 * Before you create, update, or delete a retention policy, you can specify
 * `true` for `dryRun` to preview how many log groups would have a longer,
 * shorter, or unchanged retention period. For more information, see DryRunResult.
 *
 * An account-level retention policy replaces the retention period set on a log group,
 * including when the log group's own retention period is longer. For example, if a log group is
 * set to retain log events for 10 years and you create a retention policy that sets a 90-day
 * retention period for that log group, CloudWatch Logs deletes the log events in that log group
 * that are older than 90 days. Specify `true` for `dryRun` to see which
 * log groups would have a shorter retention period before you create or update the
 * policy.
 */
export const putAccountPolicy: API.OperationMethod<
  PutAccountPolicyRequest & RegionInput,
  PutAccountPolicyResponse,
  PutAccountPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<PutAccountPolicyRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<PutAccountPolicyResponse>,
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OperationAbortedException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountPolicy",
  telemetry: TELEMETRY,
  span: "PutAccountPolicy",
}));

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
  PutBearerTokenAuthenticationRequest & RegionInput,
  PutBearerTokenAuthenticationResponse,
  PutBearerTokenAuthenticationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<PutBearerTokenAuthenticationRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<PutBearerTokenAuthenticationResponse>,
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
  telemetry: TELEMETRY,
  span: "PutBearerTokenAuthentication",
}));

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
  PutDataProtectionPolicyRequest & RegionInput,
  PutDataProtectionPolicyResponse,
  PutDataProtectionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<PutDataProtectionPolicyRequest>,
  output: __S(3680, __c115, 0) as any as S.Schema<PutDataProtectionPolicyResponse>,
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
  telemetry: TELEMETRY,
  span: "PutDataProtectionPolicy",
}));

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
  PutDeliveryDestinationRequest & RegionInput,
  PutDeliveryDestinationResponse,
  PutDeliveryDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<PutDeliveryDestinationRequest>,
  output: __S(3776, __c118, 0) as any as S.Schema<PutDeliveryDestinationResponse>,
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
  telemetry: TELEMETRY,
  span: "PutDeliveryDestination",
}));

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
  PutDeliveryDestinationPolicyRequest & RegionInput,
  PutDeliveryDestinationPolicyResponse,
  PutDeliveryDestinationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<PutDeliveryDestinationPolicyRequest>,
  output: __S(3841, __c120, 1) as any as S.Schema<PutDeliveryDestinationPolicyResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDeliveryDestinationPolicy",
  telemetry: TELEMETRY,
  span: "PutDeliveryDestinationPolicy",
}));

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
  PutDeliverySourceRequest & RegionInput,
  PutDeliverySourceResponse,
  PutDeliverySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<PutDeliverySourceRequest>,
  output: __S(3904, __c122, 0) as any as S.Schema<PutDeliverySourceResponse>,
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
  telemetry: TELEMETRY,
  span: "PutDeliverySource",
}));

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
  PutDestinationRequest & RegionInput,
  PutDestinationResponse,
  PutDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<PutDestinationRequest>,
  output: __S(289, __c9, 1) as any as S.Schema<PutDestinationResponse>,
  errors: [InvalidParameterException, OperationAbortedException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDestination",
  telemetry: TELEMETRY,
  span: "PutDestination",
}));

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
  PutDestinationPolicyRequest & RegionInput,
  PutDestinationPolicyResponse,
  PutDestinationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<PutDestinationPolicyRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<PutDestinationPolicyResponse>,
  errors: [InvalidParameterException, OperationAbortedException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDestinationPolicy",
  telemetry: TELEMETRY,
  span: "PutDestinationPolicy",
}));

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
  PutIndexPolicyRequest & RegionInput,
  PutIndexPolicyResponse,
  PutIndexPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<PutIndexPolicyRequest>,
  output: __S(353, __c11, 1) as any as S.Schema<PutIndexPolicyResponse>,
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
  telemetry: TELEMETRY,
  span: "PutIndexPolicy",
}));

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
  PutIntegrationRequest & RegionInput,
  PutIntegrationResponse,
  PutIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(386, __c12, 2) as any as S.Schema<PutIntegrationRequest>,
  output: __S(387, __c12, 3) as any as S.Schema<PutIntegrationResponse>,
  errors: [
    InvalidParameterException,
    LimitExceededException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIntegration",
  telemetry: TELEMETRY,
  span: "PutIntegration",
}));

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
  PutLogEventsRequest & RegionInput,
  PutLogEventsResponse,
  PutLogEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(419, __c13, 3) as any as S.Schema<PutLogEventsRequest>,
  output: __S(422, __c13, 6) as any as S.Schema<PutLogEventsResponse>,
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
  telemetry: TELEMETRY,
  span: "PutLogEvents",
}));

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
  PutLogGroupDeletionProtectionRequest & RegionInput,
  PutLogGroupDeletionProtectionResponse,
  PutLogGroupDeletionProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<PutLogGroupDeletionProtectionRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<PutLogGroupDeletionProtectionResponse>,
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
  telemetry: TELEMETRY,
  span: "PutLogGroupDeletionProtection",
}));

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
  PutMetricFilterRequest & RegionInput,
  PutMetricFilterResponse,
  PutMetricFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<PutMetricFilterRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<PutMetricFilterResponse>,
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
  telemetry: TELEMETRY,
  span: "PutMetricFilter",
}));

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
  PutQueryDefinitionRequest & RegionInput,
  PutQueryDefinitionResponse,
  PutQueryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<PutQueryDefinitionRequest>,
  output: __S(513, __c16, 1) as any as S.Schema<PutQueryDefinitionResponse>,
  errors: [
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutQueryDefinition",
  telemetry: TELEMETRY,
  span: "PutQueryDefinition",
}));

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
 * users, roles, or cross-account principals)
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
  PutResourcePolicyRequest & RegionInput,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<PutResourcePolicyResponse>,
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
  telemetry: TELEMETRY,
  span: "PutResourcePolicy",
}));

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
 * Account-level retention policies created with PutAccountPolicy override the retention that you
 * set with `PutRetentionPolicy`. If an account-level retention policy applies to the
 * log group, this operation succeeds and CloudWatch Logs saves the retention period that you
 * specify, but the retention period from the account-level policy continues to determine when
 * log events in the log group expire. `DescribeLogGroups` returns the retention period
 * from the policy in `retentionInDays` and the name of the policy in
 * `retentionPolicyName`. The retention period that you set with this operation takes
 * effect if the account-level policy no longer applies to the log group.
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
  PutRetentionPolicyRequest & RegionInput,
  PutRetentionPolicyResponse,
  PutRetentionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<PutRetentionPolicyRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<PutRetentionPolicyResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRetentionPolicy",
  telemetry: TELEMETRY,
  span: "PutRetentionPolicy",
}));

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
  PutStorageTierPolicyRequest & RegionInput,
  PutStorageTierPolicyResponse,
  PutStorageTierPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<PutStorageTierPolicyRequest>,
  output: __S(4416, __c138, 0) as any as S.Schema<PutStorageTierPolicyResponse>,
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
  telemetry: TELEMETRY,
  span: "PutStorageTierPolicy",
}));

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
  PutSubscriptionFilterRequest & RegionInput,
  PutSubscriptionFilterResponse,
  PutSubscriptionFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<PutSubscriptionFilterRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<PutSubscriptionFilterResponse>,
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
  telemetry: TELEMETRY,
  span: "PutSubscriptionFilter",
}));

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
  PutSyslogConfigurationRequest & RegionInput,
  PutSyslogConfigurationResponse,
  PutSyslogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<PutSyslogConfigurationRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<PutSyslogConfigurationResponse>,
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
  telemetry: TELEMETRY,
  span: "PutSyslogConfiguration",
}));

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
  PutTransformerRequest & RegionInput,
  PutTransformerResponse,
  PutTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<PutTransformerRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<PutTransformerResponse>,
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
  telemetry: TELEMETRY,
  span: "PutTransformer",
}));

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
  StartLiveTailRequest & RegionInput,
  StartLiveTailResponse,
  StartLiveTailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<StartLiveTailRequest>,
  output: __S(743, __c23, 7) as any as S.Schema<StartLiveTailResponse>,
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
  telemetry: TELEMETRY,
  span: "StartLiveTail",
}));

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
  StartQueryRequest & RegionInput,
  StartQueryResponse,
  StartQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<StartQueryRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<StartQueryResponse>,
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
  telemetry: TELEMETRY,
  span: "StartQuery",
}));

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
  StopQueryRequest & RegionInput,
  StopQueryResponse,
  StopQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<StopQueryRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<StopQueryResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopQuery",
  telemetry: TELEMETRY,
  span: "StopQuery",
}));

export type TagLogGroupError = InvalidParameterException | ResourceNotFoundException | CommonErrors;
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
  TagLogGroupRequest & RegionInput,
  TagLogGroupResponse,
  TagLogGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<TagLogGroupRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<TagLogGroupResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagLogGroup",
  telemetry: TELEMETRY,
  span: "TagLogGroup",
}));

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
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type TestMetricFilterError =
  | InvalidParameterException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Tests the filter pattern of a metric filter against a sample of log event messages. You
 * can use this operation to validate the correctness of a metric filter pattern.
 */
export const testMetricFilter: API.OperationMethod<
  TestMetricFilterRequest & RegionInput,
  TestMetricFilterResponse,
  TestMetricFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<TestMetricFilterRequest>,
  output: __S(899, __c28, 3) as any as S.Schema<TestMetricFilterResponse>,
  errors: [InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestMetricFilter",
  telemetry: TELEMETRY,
  span: "TestMetricFilter",
}));

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
  TestTransformerRequest & RegionInput,
  TestTransformerResponse,
  TestTransformerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<TestTransformerRequest>,
  output: __S(931, __c29, 3) as any as S.Schema<TestTransformerResponse>,
  errors: [InvalidOperationException, InvalidParameterException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestTransformer",
  telemetry: TELEMETRY,
  span: "TestTransformer",
}));

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
  UntagLogGroupRequest & RegionInput,
  UntagLogGroupResponse,
  UntagLogGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<UntagLogGroupRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<UntagLogGroupResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagLogGroup",
  telemetry: TELEMETRY,
  span: "UntagLogGroup",
}));

export type UntagResourceError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

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
  UpdateAnomalyRequest & RegionInput,
  UpdateAnomalyResponse,
  UpdateAnomalyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1025, __c32, 1) as any as S.Schema<UpdateAnomalyRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<UpdateAnomalyResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnomaly",
  telemetry: TELEMETRY,
  span: "UpdateAnomaly",
}));

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
  UpdateDeliveryConfigurationRequest & RegionInput,
  UpdateDeliveryConfigurationResponse,
  UpdateDeliveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<UpdateDeliveryConfigurationRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<UpdateDeliveryConfigurationResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateDeliveryConfiguration",
}));

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
  UpdateLogAnomalyDetectorRequest & RegionInput,
  UpdateLogAnomalyDetectorResponse,
  UpdateLogAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<UpdateLogAnomalyDetectorRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<UpdateLogAnomalyDetectorResponse>,
  errors: [
    InvalidParameterException,
    OperationAbortedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLogAnomalyDetector",
  telemetry: TELEMETRY,
  span: "UpdateLogAnomalyDetector",
}));

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
  UpdateLookupTableRequest & RegionInput,
  UpdateLookupTableResponse,
  UpdateLookupTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<UpdateLookupTableRequest>,
  output: __S(1121, __c35, 1) as any as S.Schema<UpdateLookupTableResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateLookupTable",
}));

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
  UpdateScheduledQueryRequest & RegionInput,
  UpdateScheduledQueryResponse,
  UpdateScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<UpdateScheduledQueryRequest>,
  output: __S(4320, __c135, 0) as any as S.Schema<UpdateScheduledQueryResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateScheduledQuery",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(1472, __c46, 0)) }).pipe(ns)).annotate(
        { identifier: "ListTagsForResourceResponse" },
      );
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsLogGroupRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String,
          policyDocument: S.String,
          policyType: S.String,
          scope: S.optional(S.String),
          selectionCriteria: S.optional(S.String),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutAccountPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountPolicy: S.optional(__S(2688, __c84, 0)),
          dryRunResult: S.optional(__S(1954, __c61, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "PutAccountPolicyResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupIdentifier: S.String,
          bearerTokenAuthenticationEnabled: S.Boolean,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutBearerTokenAuthenticationRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupIdentifier: S.String, policyDocument: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutDataProtectionPolicyRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          outputFormat: S.optional(S.String),
          deliveryDestinationConfiguration: S.optional(__S(2848, __c89, 0)),
          deliveryDestinationType: S.optional(S.String),
          roleArn: S.optional(S.String),
          tags: S.optional(__S(1472, __c46, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutDeliveryDestinationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deliveryDestinationName: S.String, deliveryDestinationPolicy: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutDeliveryDestinationPolicyRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          resourceArn: S.String,
          logType: S.String,
          tags: S.optional(__S(1472, __c46, 0)),
          deliverySourceConfiguration: S.optional(__S(1472, __c46, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutDeliverySourceRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          destinationName: S.String,
          targetArn: S.String,
          roleArn: S.String,
          tags: S.optional(__S(1472, __c46, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutDestinationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ destination: S.optional(__S(2976, __c93, 0)) }).pipe(ns),
      ).annotate({ identifier: "PutDestinationResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          destinationName: S.String,
          accessPolicy: S.String,
          forceUpdate: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutDestinationPolicyRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupIdentifier: S.String, policyDocument: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutIndexPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ indexPolicy: S.optional(__S(3168, __c99, 0)) }).pipe(ns),
      ).annotate({ identifier: "PutIndexPolicyResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          kmsKeyArn: S.optional(S.String),
          dataSourceRoleArn: S.String,
          dashboardViewerPrincipals: __S(1504, __c47, 0),
          applicationArn: S.optional(S.String),
          retentionDays: S.Number,
        }),
      ).annotate({ identifier: "OpenSearchResourceConfig" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ openSearchResourceConfig: __S(384, __c12, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          integrationName: S.String,
          resourceConfig: __S(385, __c12, 1),
          integrationType: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutIntegrationRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          integrationName: S.optional(S.String),
          integrationStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PutIntegrationResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ timestamp: S.Number, message: S.String })).annotate({
        identifier: "InputLogEvent",
      });
    case 1:
      return S.Array(__S(416, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          keyAttributes: S.optional(__S(1472, __c46, 0)),
          attributes: S.optional(__S(1472, __c46, 0)),
        }),
      ).annotate({ identifier: "Entity" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.String,
          logStreamName: S.String,
          logEvents: __S(417, __c13, 1),
          sequenceToken: S.optional(S.String),
          entity: S.optional(__S(418, __c13, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutLogEventsRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          tooNewLogEventStartIndex: S.optional(S.Number),
          tooOldLogEventEndIndex: S.optional(S.Number),
          expiredLogEventEndIndex: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RejectedLogEventsInfo" });
    case 5:
      return S.suspend(() => S.Struct({ errorType: S.String })).annotate({
        identifier: "RejectedEntityInfo",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          nextSequenceToken: S.optional(S.String),
          rejectedLogEventsInfo: S.optional(__S(420, __c13, 4)),
          rejectedEntityInfo: S.optional(__S(421, __c13, 5)),
        }).pipe(ns),
      ).annotate({ identifier: "PutLogEventsResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupIdentifier: S.String, deletionProtectionEnabled: S.Boolean }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutLogGroupDeletionProtectionRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.String,
          filterName: S.String,
          filterPattern: S.String,
          metricTransformations: __S(3329, __c104, 1),
          applyOnTransformedLogs: S.optional(S.Boolean),
          fieldSelectionCriteria: S.optional(S.String),
          emitSystemFieldDimensions: S.optional(__S(1504, __c47, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutMetricFilterRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          queryLanguage: S.optional(S.String),
          name: S.String,
          queryDefinitionId: S.optional(S.String),
          logGroupNames: S.optional(__S(1504, __c47, 0)),
          queryString: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          parameters: S.optional(__S(3425, __c107, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutQueryDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ queryDefinitionId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "PutQueryDefinitionResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.optional(S.String),
          policyDocument: S.optional(S.String),
          resourceArn: S.optional(S.String),
          expectedRevisionId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourcePolicy: S.optional(__S(3488, __c109, 0)),
          revisionId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PutResourcePolicyResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.String, retentionInDays: S.Number }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutRetentionPolicyRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ storageTier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutStorageTierPolicyRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.String,
          filterName: S.String,
          filterPattern: S.String,
          destinationArn: S.String,
          roleArn: S.optional(S.String),
          distribution: S.optional(S.String),
          applyOnTransformedLogs: S.optional(S.Boolean),
          fieldSelectionCriteria: S.optional(S.String),
          emitSystemFields: S.optional(__S(1504, __c47, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutSubscriptionFilterRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupIdentifier: S.String, vpcEndpointId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutSyslogConfigurationRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupIdentifier: S.String, transformerConfig: __S(4508, __c140, 28) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutTransformerRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupIdentifiers: __S(1504, __c47, 0),
          logStreamNames: S.optional(__S(1504, __c47, 0)),
          logStreamNamePrefixes: S.optional(__S(1504, __c47, 0)),
          logEventFilterPattern: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartLiveTailRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          sessionId: S.optional(S.String),
          logGroupIdentifiers: S.optional(__S(1504, __c47, 0)),
          logStreamNames: S.optional(__S(1504, __c47, 0)),
          logStreamNamePrefixes: S.optional(__S(1504, __c47, 0)),
          logEventFilterPattern: S.optional(S.String),
        }),
      ).annotate({ identifier: "LiveTailSessionStart" });
    case 2:
      return S.suspend(() => S.Struct({ sampled: S.optional(S.Boolean) })).annotate({
        identifier: "LiveTailSessionMetadata",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          logStreamName: S.optional(S.String),
          logGroupIdentifier: S.optional(S.String),
          message: S.optional(S.String),
          timestamp: S.optional(S.Number),
          ingestionTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LiveTailSessionLogEvent" });
    case 4:
      return S.Array(__S(739, __c23, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          sessionMetadata: S.optional(__S(738, __c23, 2)),
          sessionResults: S.optional(__S(740, __c23, 4)),
        }),
      ).annotate({ identifier: "LiveTailSessionUpdate" });
    case 6:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ sessionStart: __S(737, __c23, 1) }),
          /*@__PURE__*/ S.Struct({ sessionUpdate: __S(741, __c23, 5) }),
          /*@__PURE__*/ S.Struct({ SessionTimeoutException: __S(4160, __c130, 0) }),
          /*@__PURE__*/ S.Struct({ SessionStreamingException: __S(4160, __c130, 0) }),
        ]),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({ responseStream: S.optional(__S(742, __c23, 6)) }).pipe(ns),
      ).annotate({ identifier: "StartLiveTailResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          queryLanguage: S.optional(S.String),
          logGroupName: S.optional(S.String),
          logGroupNames: S.optional(__S(1504, __c47, 0)),
          logGroupIdentifiers: S.optional(__S(1504, __c47, 0)),
          startTime: S.Number,
          endTime: S.Number,
          queryString: S.String,
          limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartQueryRequest" });
    case 1:
      return S.suspend(() => S.Struct({ queryId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "StartQueryResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ queryId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopQueryRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.String, tags: __S(1472, __c46, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagLogGroupRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(1472, __c46, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ filterPattern: S.String, logEventMessages: __S(1504, __c47, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TestMetricFilterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventNumber: S.optional(S.Number),
          eventMessage: S.optional(S.String),
          extractedValues: S.optional(__S(1472, __c46, 0)),
        }),
      ).annotate({ identifier: "MetricFilterMatchRecord" });
    case 2:
      return S.Array(__S(897, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ matches: S.optional(__S(898, __c28, 2)) }).pipe(ns),
      ).annotate({ identifier: "TestMetricFilterResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          transformerConfig: __S(4508, __c140, 28),
          logEventMessages: __S(1504, __c47, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TestTransformerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventNumber: S.optional(S.Number),
          eventMessage: S.optional(S.String),
          transformedEventMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransformedLogRecord" });
    case 2:
      return S.Array(__S(929, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ transformedLogs: S.optional(__S(930, __c29, 2)) }).pipe(ns),
      ).annotate({ identifier: "TestTransformerResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.String, tags: __S(1504, __c47, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagLogGroupRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(1504, __c47, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ value: S.optional(S.Number), suppressionUnit: S.optional(S.String) }),
      ).annotate({ identifier: "SuppressionPeriod" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          anomalyId: S.optional(S.String),
          patternId: S.optional(S.String),
          anomalyDetectorArn: S.String,
          suppressionType: S.optional(S.String),
          suppressionPeriod: S.optional(__S(1024, __c32, 0)),
          baseline: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAnomalyRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          recordFields: S.optional(__S(1504, __c47, 0)),
          fieldDelimiter: S.optional(S.String),
          s3DeliveryConfiguration: S.optional(__S(1536, __c48, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDeliveryConfigurationRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          anomalyDetectorArn: S.String,
          evaluationFrequency: S.optional(S.String),
          filterPattern: S.optional(S.String),
          anomalyVisibilityTime: S.optional(S.Number),
          enabled: S.Boolean,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLogAnomalyDetectorRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lookupTableArn: S.String,
          description: S.optional(S.String),
          tableBody: S.optional(S.String),
          queryId: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLookupTableRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          lookupTableArn: S.optional(S.String),
          lastUpdatedTime: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateLookupTableResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          description: S.optional(S.String),
          queryLanguage: S.String,
          queryString: S.String,
          logGroupIdentifiers: S.optional(__S(1504, __c47, 0)),
          scheduleExpression: S.String,
          timezone: S.optional(S.String),
          startTimeOffset: S.optional(S.Number),
          endTimeOffset: S.optional(S.Number),
          destinationConfiguration: S.optional(__S(1890, __c59, 2)),
          scheduleStartTime: S.optional(S.Number),
          scheduleEndTime: S.optional(S.Number),
          executionRoleArn: S.String,
          state: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateScheduledQueryRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          kmsKeyId: S.String,
          resourceIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateKmsKeyRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AssociateKmsKeyResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ integrationArn: S.String, dataSource: __S(1312, __c41, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateSourceToS3TableIntegrationRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ identifier: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "AssociateSourceToS3TableIntegrationResponse",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, type: S.optional(S.String) })).annotate({
        identifier: "DataSource",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelExportTaskRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ importId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelImportTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          importId: S.optional(S.String),
          importStatistics: S.optional(__S(1408, __c44, 0)),
          importStatus: S.optional(S.String),
          creationTime: S.optional(S.Number),
          lastUpdatedTime: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "CancelImportTaskResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ bytesImported: S.optional(S.Number) })).annotate({
        identifier: "ImportStatistics",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deliverySourceName: S.String,
          deliveryDestinationArn: S.String,
          recordFields: S.optional(__S(1504, __c47, 0)),
          fieldDelimiter: S.optional(S.String),
          s3DeliveryConfiguration: S.optional(__S(1536, __c48, 0)),
          tags: S.optional(__S(1472, __c46, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDeliveryRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          suffixPath: S.optional(S.String),
          enableHiveCompatiblePath: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "S3DeliveryConfiguration" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          deliverySourceName: S.optional(S.String),
          deliveryDestinationArn: S.optional(S.String),
          deliveryDestinationType: S.optional(S.String),
          recordFields: S.optional(__S(1504, __c47, 0)),
          fieldDelimiter: S.optional(S.String),
          s3DeliveryConfiguration: S.optional(__S(1536, __c48, 0)),
          tags: S.optional(__S(1472, __c46, 0)),
        }),
      ).annotate({ identifier: "Delivery" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ delivery: S.optional(__S(1568, __c49, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDeliveryResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskName: S.optional(S.String),
          logGroupName: S.String,
          logStreamNamePrefix: S.optional(S.String),
          from: S.Number,
          to: S.Number,
          destination: S.String,
          destinationPrefix: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateExportTaskRequest" });
    case 1:
      return S.suspend(() => S.Struct({ taskId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateExportTaskResponse",
      });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          importSourceArn: S.String,
          importRoleArn: S.String,
          importFilter: S.optional(__S(1696, __c53, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateImportTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          importId: S.optional(S.String),
          importDestinationArn: S.optional(S.String),
          creationTime: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "CreateImportTaskResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ startEventTime: S.optional(S.Number), endEventTime: S.optional(S.Number) }),
      ).annotate({ identifier: "ImportFilter" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupArnList: __S(1504, __c47, 0),
          detectorName: S.optional(S.String),
          evaluationFrequency: S.optional(S.String),
          filterPattern: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          anomalyVisibilityTime: S.optional(S.Number),
          tags: S.optional(__S(1472, __c46, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLogAnomalyDetectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ anomalyDetectorArn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateLogAnomalyDetectorResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.String,
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(1472, __c46, 0)),
          logGroupClass: S.optional(S.String),
          deletionProtectionEnabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLogGroupRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.String, logStreamName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateLogStreamRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lookupTableName: S.String,
          description: S.optional(S.String),
          tableBody: S.optional(S.String),
          queryId: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(1472, __c46, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLookupTableRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ lookupTableArn: S.optional(S.String), createdAt: S.optional(S.Number) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "CreateLookupTableResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          queryLanguage: S.String,
          queryString: S.String,
          logGroupIdentifiers: S.optional(__S(1504, __c47, 0)),
          scheduleExpression: S.String,
          timezone: S.optional(S.String),
          startTimeOffset: S.optional(S.Number),
          endTimeOffset: S.optional(S.Number),
          destinationConfiguration: S.optional(__S(1890, __c59, 2)),
          scheduleStartTime: S.optional(S.Number),
          scheduleEndTime: S.optional(S.Number),
          executionRoleArn: S.String,
          state: S.optional(S.String),
          tags: S.optional(__S(1472, __c46, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScheduledQueryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ scheduledQueryArn: S.optional(S.String), state: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateScheduledQueryResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          destinationIdentifier: S.String,
          roleArn: S.String,
          ownerAccountId: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Configuration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          tableName: S.String,
          roleArn: S.String,
          description: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(1472, __c46, 0)),
        }),
      ).annotate({ identifier: "LookupTableConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          s3Configuration: S.optional(__S(1888, __c59, 0)),
          lookupTableConfiguration: S.optional(__S(1889, __c59, 1)),
        }),
      ).annotate({ identifier: "DestinationConfiguration" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String,
          policyType: S.String,
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteAccountPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ dryRunResult: S.optional(__S(1954, __c61, 2)) }).pipe(ns),
      ).annotate({ identifier: "DeleteAccountPolicyResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          currentRetention: S.optional(S.String),
          proposedRetention: S.optional(S.String),
          storedBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LogGroupImpact" });
    case 1:
      return S.Array(__S(1952, __c61, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          totalMatchedLogGroups: S.optional(S.Number),
          increasedRetentionLogGroupCount: S.optional(S.Number),
          decreasedRetentionLogGroupCount: S.optional(S.Number),
          unchangedRetentionLogGroupCount: S.optional(S.Number),
          failedAnalysisCount: S.optional(S.Number),
          topLogGroupsImpacted: S.optional(__S(1953, __c61, 1)),
        }),
      ).annotate({ identifier: "DryRunResult" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupIdentifier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDataProtectionPolicyRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDeliveryRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDeliveryDestinationRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deliveryDestinationName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDeliveryDestinationPolicyRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDeliverySourceRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ destinationName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDestinationRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupIdentifier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIndexPolicyRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ integrationName: S.String, force: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIntegrationRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ anomalyDetectorArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLogAnomalyDetectorRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLogGroupRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.String, logStreamName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLogStreamRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ lookupTableArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLookupTableRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.String, filterName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMetricFilterRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ queryDefinitionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteQueryDefinitionRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ success: S.optional(S.Boolean) }).pipe(ns)).annotate({
        identifier: "DeleteQueryDefinitionResponse",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.optional(S.String),
          resourceArn: S.optional(S.String),
          expectedRevisionId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRetentionPolicyRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteScheduledQueryRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupName: S.String, filterName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSubscriptionFilterRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupIdentifier: S.String, vpcEndpointId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSyslogConfigurationRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupIdentifier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTransformerRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyType: S.String,
          policyName: S.optional(S.String),
          accountIdentifiers: S.optional(__S(1504, __c47, 0)),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAccountPoliciesRequest" });
    case 1:
      return S.Array(__S(2688, __c84, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          accountPolicies: S.optional(__S(2657, __c83, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAccountPoliciesResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.optional(S.String),
          policyDocument: S.optional(S.String),
          lastUpdatedTime: S.optional(S.Number),
          policyType: S.optional(S.String),
          scope: S.optional(S.String),
          selectionCriteria: S.optional(S.String),
          accountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccountPolicy" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          service: S.optional(S.String),
          logTypes: S.optional(__S(1504, __c47, 0)),
          resourceTypes: S.optional(__S(1504, __c47, 0)),
          deliveryDestinationTypes: S.optional(__S(2752, __c86, 0)),
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConfigurationTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recordFields: S.optional(__S(1504, __c47, 0)),
          fieldDelimiter: S.optional(S.String),
          s3DeliveryConfiguration: S.optional(__S(1536, __c48, 0)),
        }),
      ).annotate({ identifier: "ConfigurationTemplateDeliveryConfigValues" });
    case 2:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), mandatory: S.optional(S.Boolean) }),
      ).annotate({ identifier: "RecordField" });
    case 3:
      return S.Array(__S(2722, __c85, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          keyName: S.String,
          valueType: S.String,
          defaultValue: S.String,
          supportedValues: S.optional(__S(1504, __c47, 0)),
          minValue: S.optional(S.Number),
          maxValue: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DeliverySourceConfigurationSchema" });
    case 5:
      return S.Array(__S(2724, __c85, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ datasourceName: S.optional(S.String), datasourceType: S.optional(S.String) }),
      ).annotate({ identifier: "S3TablesIntegration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          service: S.optional(S.String),
          logType: S.optional(S.String),
          resourceType: S.optional(S.String),
          deliveryDestinationType: S.optional(S.String),
          defaultDeliveryConfigValues: S.optional(__S(2721, __c85, 1)),
          allowedFields: S.optional(__S(2723, __c85, 3)),
          allowedOutputFormats: S.optional(__S(2752, __c86, 0)),
          allowedActionForAllowVendedLogsDeliveryForResource: S.optional(S.String),
          allowedFieldDelimiters: S.optional(__S(1504, __c47, 0)),
          allowedSuffixPathFields: S.optional(__S(1504, __c47, 0)),
          deliverySourceConfiguration: S.optional(__S(2725, __c85, 5)),
          s3TablesIntegration: S.optional(__S(2726, __c85, 6)),
        }),
      ).annotate({ identifier: "ConfigurationTemplate" });
    case 8:
      return S.Array(__S(2727, __c85, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          configurationTemplates: S.optional(__S(2728, __c85, 8)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConfigurationTemplatesResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
          deliverySourceNames: S.optional(__S(1504, __c47, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDeliveriesRequest" });
    case 1:
      return S.Array(__S(1568, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          deliveries: S.optional(__S(2785, __c87, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDeliveriesResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
          names: S.optional(__S(1504, __c47, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDeliveryDestinationsRequest" });
    case 1:
      return S.Array(__S(2849, __c89, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          deliveryDestinations: S.optional(__S(2817, __c88, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDeliveryDestinationsResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ destinationResourceArn: S.String })).annotate({
        identifier: "DeliveryDestinationConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          deliveryDestinationType: S.optional(S.String),
          outputFormat: S.optional(S.String),
          deliveryDestinationConfiguration: S.optional(__S(2848, __c89, 0)),
          roleArn: S.optional(S.String),
          tags: S.optional(__S(1472, __c46, 0)),
        }),
      ).annotate({ identifier: "DeliveryDestination" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
          resourceArns: S.optional(__S(1504, __c47, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDeliverySourcesRequest" });
    case 1:
      return S.Array(__S(2912, __c91, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          deliverySources: S.optional(__S(2881, __c90, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDeliverySourcesResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          resourceArns: S.optional(__S(1504, __c47, 0)),
          service: S.optional(S.String),
          logType: S.optional(S.String),
          tags: S.optional(__S(1472, __c46, 0)),
          deliverySourceConfiguration: S.optional(__S(1472, __c46, 0)),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeliverySource" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationNamePrefix: S.optional(S.String),
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDestinationsRequest" });
    case 1:
      return S.Array(__S(2976, __c93, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          destinations: S.optional(__S(2945, __c92, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDestinationsResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          destinationName: S.optional(S.String),
          targetArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          accessPolicy: S.optional(S.String),
          arn: S.optional(S.String),
          creationTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Destination" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          statusCode: S.optional(S.String),
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeExportTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ExportTaskStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({ creationTime: S.optional(S.Number), completionTime: S.optional(S.Number) }),
      ).annotate({ identifier: "ExportTaskExecutionInfo" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          taskName: S.optional(S.String),
          logGroupName: S.optional(S.String),
          from: S.optional(S.Number),
          to: S.optional(S.Number),
          destination: S.optional(S.String),
          destinationPrefix: S.optional(S.String),
          status: S.optional(__S(3009, __c94, 1)),
          executionInfo: S.optional(__S(3010, __c94, 2)),
        }),
      ).annotate({ identifier: "ExportTask" });
    case 4:
      return S.Array(__S(3011, __c94, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          exportTasks: S.optional(__S(3012, __c94, 4)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeExportTasksResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupIdentifiers: __S(1504, __c47, 0),
          indexCategories: S.optional(__S(2752, __c86, 0)),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFieldIndexesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logGroupIdentifier: S.optional(S.String),
          fieldIndexName: S.optional(S.String),
          lastScanTime: S.optional(S.Number),
          firstEventTime: S.optional(S.Number),
          lastEventTime: S.optional(S.Number),
          type: S.optional(S.String),
          indexCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "FieldIndex" });
    case 2:
      return S.Array(__S(3041, __c95, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          fieldIndexes: S.optional(__S(3042, __c95, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeFieldIndexesResponse" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          importId: S.String,
          batchImportStatus: S.optional(__S(2752, __c86, 0)),
          limit: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeImportTaskBatchesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ batchId: S.String, status: S.String, errorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "ImportBatch" });
    case 2:
      return S.Array(__S(3073, __c96, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          importSourceArn: S.optional(S.String),
          importId: S.optional(S.String),
          importBatches: S.optional(__S(3074, __c96, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeImportTaskBatchesResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          importId: S.optional(S.String),
          importStatus: S.optional(S.String),
          importSourceArn: S.optional(S.String),
          limit: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeImportTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          importId: S.optional(S.String),
          importSourceArn: S.optional(S.String),
          importStatus: S.optional(S.String),
          importDestinationArn: S.optional(S.String),
          importStatistics: S.optional(__S(1408, __c44, 0)),
          importFilter: S.optional(__S(1696, __c53, 0)),
          creationTime: S.optional(S.Number),
          lastUpdatedTime: S.optional(S.Number),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "Import" });
    case 2:
      return S.Array(__S(3105, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          imports: S.optional(__S(3106, __c97, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeImportTasksResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupIdentifiers: __S(1504, __c47, 0),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeIndexPoliciesRequest" });
    case 1:
      return S.Array(__S(3168, __c99, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          indexPolicies: S.optional(__S(3137, __c98, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeIndexPoliciesResponse" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupIdentifier: S.optional(S.String),
          lastUpdateTime: S.optional(S.Number),
          policyDocument: S.optional(S.String),
          policyName: S.optional(S.String),
          source: S.optional(S.String),
        }),
      ).annotate({ identifier: "IndexPolicy" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIdentifiers: S.optional(__S(1504, __c47, 0)),
          logGroupNamePrefix: S.optional(S.String),
          logGroupNamePattern: S.optional(S.String),
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
          includeLinkedAccounts: S.optional(S.Boolean),
          logGroupClass: S.optional(S.String),
          logGroupIdentifiers: S.optional(__S(1504, __c47, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeLogGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          creationTime: S.optional(S.Number),
          retentionInDays: S.optional(S.Number),
          metricFilterCount: S.optional(S.Number),
          arn: S.optional(S.String),
          storedBytes: S.optional(S.Number),
          kmsKeyId: S.optional(S.String),
          dataProtectionStatus: S.optional(S.String),
          inheritedProperties: S.optional(__S(2752, __c86, 0)),
          logGroupClass: S.optional(S.String),
          logGroupArn: S.optional(S.String),
          deletionProtectionEnabled: S.optional(S.Boolean),
          bearerTokenAuthenticationEnabled: S.optional(S.Boolean),
          retentionPolicyName: S.optional(S.String),
        }),
      ).annotate({ identifier: "LogGroup" });
    case 2:
      return S.Array(__S(3201, __c100, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          logGroups: S.optional(__S(3202, __c100, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeLogGroupsResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          logGroupIdentifier: S.optional(S.String),
          logStreamNamePrefix: S.optional(S.String),
          orderBy: S.optional(S.String),
          descending: S.optional(S.Boolean),
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeLogStreamsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logStreamName: S.optional(S.String),
          creationTime: S.optional(S.Number),
          firstEventTimestamp: S.optional(S.Number),
          lastEventTimestamp: S.optional(S.Number),
          lastIngestionTime: S.optional(S.Number),
          uploadSequenceToken: S.optional(S.String),
          arn: S.optional(S.String),
          storedBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LogStream" });
    case 2:
      return S.Array(__S(3233, __c101, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          logStreams: S.optional(__S(3234, __c101, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeLogStreamsResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lookupTableNamePrefix: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeLookupTablesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          lookupTableArn: S.optional(S.String),
          lookupTableName: S.optional(S.String),
          description: S.optional(S.String),
          tableFields: S.optional(__S(1504, __c47, 0)),
          recordsCount: S.optional(S.Number),
          sizeBytes: S.optional(S.Number),
          lastUpdatedTime: S.optional(S.Number),
          kmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LookupTable" });
    case 2:
      return S.Array(__S(3265, __c102, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          lookupTables: S.optional(__S(3266, __c102, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeLookupTablesResponse" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          filterNamePrefix: S.optional(S.String),
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
          metricName: S.optional(S.String),
          metricNamespace: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMetricFiltersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filterName: S.optional(S.String),
          filterPattern: S.optional(S.String),
          metricTransformations: S.optional(__S(3329, __c104, 1)),
          creationTime: S.optional(S.Number),
          logGroupName: S.optional(S.String),
          applyOnTransformedLogs: S.optional(S.Boolean),
          fieldSelectionCriteria: S.optional(S.String),
          emitSystemFieldDimensions: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "MetricFilter" });
    case 2:
      return S.Array(__S(3297, __c103, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          metricFilters: S.optional(__S(3298, __c103, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMetricFiltersResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metricName: S.String,
          metricNamespace: S.String,
          metricValue: S.String,
          defaultValue: S.optional(S.Number),
          dimensions: S.optional(__S(1472, __c46, 0)),
          unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricTransformation" });
    case 1:
      return S.Array(__S(3328, __c104, 0));
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          status: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          queryLanguage: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeQueriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          queryLanguage: S.optional(S.String),
          queryId: S.optional(S.String),
          queryString: S.optional(S.String),
          status: S.optional(S.String),
          createTime: S.optional(S.Number),
          logGroupName: S.optional(S.String),
          queryDuration: S.optional(S.Number),
          bytesScanned: S.optional(S.Number),
          userIdentity: S.optional(S.String),
        }),
      ).annotate({ identifier: "QueryInfo" });
    case 2:
      return S.Array(__S(3361, __c105, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          queries: S.optional(__S(3362, __c105, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeQueriesResponse" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          queryLanguage: S.optional(S.String),
          queryDefinitionNamePrefix: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeQueryDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          queryLanguage: S.optional(S.String),
          queryDefinitionId: S.optional(S.String),
          name: S.optional(S.String),
          queryString: S.optional(S.String),
          lastModified: S.optional(S.Number),
          logGroupNames: S.optional(__S(1504, __c47, 0)),
          parameters: S.optional(__S(3425, __c107, 1)),
        }),
      ).annotate({ identifier: "QueryDefinition" });
    case 2:
      return S.Array(__S(3393, __c106, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          queryDefinitions: S.optional(__S(3394, __c106, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeQueryDefinitionsResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          defaultValue: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "QueryParameter" });
    case 1:
      return S.Array(__S(3424, __c107, 0));
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
          resourceArn: S.optional(S.String),
          policyScope: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeResourcePoliciesRequest" });
    case 1:
      return S.Array(__S(3488, __c109, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourcePolicies: S.optional(__S(3457, __c108, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeResourcePoliciesResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.optional(S.String),
          policyDocument: S.optional(S.String),
          lastUpdatedTime: S.optional(S.Number),
          policyScope: S.optional(S.String),
          resourceArn: S.optional(S.String),
          revisionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourcePolicy" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.String,
          filterNamePrefix: S.optional(S.String),
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSubscriptionFiltersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filterName: S.optional(S.String),
          logGroupName: S.optional(S.String),
          filterPattern: S.optional(S.String),
          destinationArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          distribution: S.optional(S.String),
          applyOnTransformedLogs: S.optional(S.Boolean),
          creationTime: S.optional(S.Number),
          fieldSelectionCriteria: S.optional(S.String),
          emitSystemFields: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "SubscriptionFilter" });
    case 2:
      return S.Array(__S(3521, __c110, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          subscriptionFilters: S.optional(__S(3522, __c110, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSubscriptionFiltersResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          resourceIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateKmsKeyRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateSourceFromS3TableIntegrationRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          logGroupIdentifier: S.optional(S.String),
          logStreamNames: S.optional(__S(1504, __c47, 0)),
          logStreamNamePrefix: S.optional(S.String),
          startTime: S.optional(S.Number),
          endTime: S.optional(S.Number),
          filterPattern: S.optional(S.String),
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
          startFromHead: S.optional(S.Boolean),
          interleaved: S.optional(S.Boolean),
          unmask: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "FilterLogEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logStreamName: S.optional(S.String),
          timestamp: S.optional(S.Number),
          message: S.optional(S.String),
          ingestionTime: S.optional(S.Number),
          eventId: S.optional(S.String),
        }),
      ).annotate({ identifier: "FilteredLogEvent" });
    case 2:
      return S.Array(__S(3617, __c113, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          logStreamName: S.optional(S.String),
          searchedCompletely: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SearchedLogStream" });
    case 4:
      return S.Array(__S(3619, __c113, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          events: S.optional(__S(3618, __c113, 2)),
          searchedLogStreams: S.optional(__S(3620, __c113, 4)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "FilterLogEventsResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupIdentifier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDataProtectionPolicyRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupIdentifier: S.optional(S.String),
          policyDocument: S.optional(S.String),
          lastUpdatedTime: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "GetDataProtectionPolicyResponse" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeliveryRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeliveryDestinationRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deliveryDestination: S.optional(__S(2849, __c89, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetDeliveryDestinationResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deliveryDestinationName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeliveryDestinationPolicyRequest" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deliveryDestinationPolicy: S.optional(S.String) }),
      ).annotate({ identifier: "Policy" });
    case 1:
      return S.suspend(() =>
        S.Struct({ policy: S.optional(__S(3840, __c120, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetDeliveryDestinationPolicyResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeliverySourceRequest" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deliverySource: S.optional(__S(2912, __c91, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetDeliverySourceResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ integrationName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIntegrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), statusMessage: S.optional(S.String) }),
      ).annotate({ identifier: "OpenSearchResourceStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          dataSourceName: S.optional(S.String),
          status: S.optional(__S(3937, __c123, 1)),
        }),
      ).annotate({ identifier: "OpenSearchDataSource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          applicationEndpoint: S.optional(S.String),
          applicationArn: S.optional(S.String),
          applicationId: S.optional(S.String),
          status: S.optional(__S(3937, __c123, 1)),
        }),
      ).annotate({ identifier: "OpenSearchApplication" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          collectionEndpoint: S.optional(S.String),
          collectionArn: S.optional(S.String),
          status: S.optional(__S(3937, __c123, 1)),
        }),
      ).annotate({ identifier: "OpenSearchCollection" });
    case 5:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.optional(S.String), status: S.optional(__S(3937, __c123, 1)) }),
      ).annotate({ identifier: "OpenSearchWorkspace" });
    case 6:
      return S.suspend(() =>
        S.Struct({ policyName: S.optional(S.String), status: S.optional(__S(3937, __c123, 1)) }),
      ).annotate({ identifier: "OpenSearchEncryptionPolicy" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          dataSource: S.optional(__S(3938, __c123, 2)),
          application: S.optional(__S(3939, __c123, 3)),
          collection: S.optional(__S(3940, __c123, 4)),
          workspace: S.optional(__S(3941, __c123, 5)),
          encryptionPolicy: S.optional(__S(3942, __c123, 6)),
          networkPolicy: S.optional(__S(3942, __c123, 6)),
          accessPolicy: S.optional(__S(3942, __c123, 6)),
          lifecyclePolicy: S.optional(__S(3942, __c123, 6)),
        }),
      ).annotate({ identifier: "OpenSearchIntegrationDetails" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ openSearchIntegrationDetails: __S(3943, __c123, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          integrationName: S.optional(S.String),
          integrationType: S.optional(S.String),
          integrationStatus: S.optional(S.String),
          integrationDetails: S.optional(__S(3944, __c123, 8)),
        }).pipe(ns),
      ).annotate({ identifier: "GetIntegrationResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ anomalyDetectorArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLogAnomalyDetectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          detectorName: S.optional(S.String),
          logGroupArnList: S.optional(__S(1504, __c47, 0)),
          evaluationFrequency: S.optional(S.String),
          filterPattern: S.optional(S.String),
          anomalyDetectorStatus: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          creationTimeStamp: S.optional(S.Number),
          lastModifiedTimeStamp: S.optional(S.Number),
          anomalyVisibilityTime: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "GetLogAnomalyDetectorResponse" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ startCharOffset: S.optional(S.Number), endCharOffset: S.optional(S.Number) }),
      ).annotate({ identifier: "QueryCompileErrorLocation" });
    case 1:
      return S.suspend(() =>
        S.Struct({ location: S.optional(__S(4000, __c125, 0)), message: S.optional(S.String) }),
      ).annotate({ identifier: "QueryCompileError" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          logGroupIdentifier: S.optional(S.String),
          logStreamName: S.String,
          startTime: S.optional(S.Number),
          endTime: S.optional(S.Number),
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
          startFromHead: S.optional(S.Boolean),
          unmask: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetLogEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          timestamp: S.optional(S.Number),
          message: S.optional(S.String),
          ingestionTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "OutputLogEvent" });
    case 2:
      return S.Array(__S(4033, __c126, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          events: S.optional(__S(4034, __c126, 2)),
          nextForwardToken: S.optional(S.String),
          nextBackwardToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetLogEventsResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dataSourceName: S.String, dataSourceType: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLogFieldsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          element: S.optional(
            S.suspend((): S.Schema<LogFieldType> => __S(4065, __c127, 1)).annotate({
              identifier: "LogFieldType",
            }),
          ),
          fields: S.optional(
            S.suspend(() => __S(4067, __c127, 3)).annotate({ identifier: "LogFieldsList" }),
          ),
        }),
      ).annotate({ identifier: "LogFieldType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          logFieldName: S.optional(S.String),
          logFieldType: S.optional(
            S.suspend((): S.Schema<LogFieldType> => __S(4065, __c127, 1)).annotate({
              identifier: "LogFieldType",
            }),
          ),
        }),
      ).annotate({ identifier: "LogFieldsListItem" });
    case 3:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<LogFieldsListItem> => __S(4066, __c127, 2)).annotate({
          identifier: "LogFieldsListItem",
        }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({ logFields: S.optional(__S(4067, __c127, 3)) }).pipe(ns),
      ).annotate({ identifier: "GetLogFieldsResponse" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          time: S.optional(S.Number),
          logGroupIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetLogGroupFieldsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), percent: S.optional(S.Number) }),
      ).annotate({ identifier: "LogGroupField" });
    case 2:
      return S.Array(__S(4097, __c128, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ logGroupFields: S.optional(__S(4098, __c128, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetLogGroupFieldsResponse" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ unmask: S.optional(S.Boolean), logObjectPointer: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLogObjectRequest" });
    case 1:
      return S.suspend(() => S.Struct({ data: S.optional(T.Blob) })).annotate({
        identifier: "FieldsData",
      });
    case 2:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ fields: __S(4129, __c129, 1) }),
          /*@__PURE__*/ S.Struct({ InternalStreamingException: __S(4160, __c130, 0) }),
        ]),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ fieldStream: S.optional(__S(4130, __c129, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetLogObjectResponse" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ message: S.optional(S.String) })).annotate({
        identifier: "InternalStreamingException",
      });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logRecordPointer: S.String, unmask: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLogRecordRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ logRecord: S.optional(__S(1472, __c46, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetLogRecordResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ lookupTableArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLookupTableRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          lookupTableArn: S.optional(S.String),
          lookupTableName: S.optional(S.String),
          description: S.optional(S.String),
          tableBody: S.optional(S.String),
          sizeBytes: S.optional(S.Number),
          lastUpdatedTime: S.optional(S.Number),
          kmsKeyId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetLookupTableResponse" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          queryId: S.String,
          nextToken: S.optional(S.String),
          maxItems: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetQueryResultsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ field: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "ResultField" });
    case 2:
      return S.Array(__S(4257, __c133, 1));
    case 3:
      return S.Array(__S(4258, __c133, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          recordsMatched: S.optional(S.Number),
          recordsScanned: S.optional(S.Number),
          estimatedRecordsSkipped: S.optional(S.Number),
          bytesScanned: S.optional(S.Number),
          estimatedBytesSkipped: S.optional(S.Number),
          logGroupsScanned: S.optional(S.Number),
          resultCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "QueryStatistics" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          queryLanguage: S.optional(S.String),
          results: S.optional(__S(4259, __c133, 3)),
          statistics: S.optional(__S(4260, __c133, 4)),
          status: S.optional(S.String),
          encryptionKey: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetQueryResultsResponse" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetScheduledQueryRequest" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scheduledQueryArn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          queryLanguage: S.optional(S.String),
          queryString: S.optional(S.String),
          logGroupIdentifiers: S.optional(__S(1504, __c47, 0)),
          scheduleExpression: S.optional(S.String),
          timezone: S.optional(S.String),
          startTimeOffset: S.optional(S.Number),
          endTimeOffset: S.optional(S.Number),
          destinationConfiguration: S.optional(__S(1890, __c59, 2)),
          state: S.optional(S.String),
          scheduleType: S.optional(S.String),
          lastTriggeredTime: S.optional(S.Number),
          lastExecutionStatus: S.optional(S.String),
          scheduleStartTime: S.optional(S.Number),
          scheduleEndTime: S.optional(S.Number),
          executionRoleArn: S.optional(S.String),
          creationTime: S.optional(S.Number),
          lastUpdatedTime: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "GetScheduledQueryResponse" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          startTime: S.Number,
          endTime: S.Number,
          executionStatuses: S.optional(__S(2752, __c86, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetScheduledQueryHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          destinationType: S.optional(S.String),
          destinationIdentifier: S.optional(S.String),
          status: S.optional(S.String),
          processedIdentifier: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledQueryDestination" });
    case 2:
      return S.Array(__S(4353, __c136, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          queryId: S.optional(S.String),
          executionStatus: S.optional(S.String),
          triggeredTimestamp: S.optional(S.Number),
          errorMessage: S.optional(S.String),
          destinations: S.optional(__S(4354, __c136, 2)),
        }),
      ).annotate({ identifier: "TriggerHistoryRecord" });
    case 4:
      return S.Array(__S(4355, __c136, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          scheduledQueryArn: S.optional(S.String),
          triggerHistory: S.optional(__S(4356, __c136, 4)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetScheduledQueryHistoryResponse" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetStorageTierPolicyRequest" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ storageTier: S.optional(S.String), lastUpdatedTime: S.optional(S.Number) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "GetStorageTierPolicyResponse" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroupIdentifier: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTransformerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logGroupIdentifier: S.optional(S.String),
          creationTime: S.optional(S.Number),
          lastModifiedTime: S.optional(S.Number),
          transformerConfig: S.optional(__S(4508, __c140, 28)),
        }).pipe(ns),
      ).annotate({ identifier: "GetTransformerResponse" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.String, value: S.String, overwriteIfExists: S.optional(S.Boolean) }),
      ).annotate({ identifier: "AddKeyEntry" });
    case 1:
      return S.Array(__S(4480, __c140, 0));
    case 2:
      return S.suspend(() => S.Struct({ entries: __S(4481, __c140, 1) })).annotate({
        identifier: "AddKeys",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ source: S.String, target: S.String, overwriteIfExists: S.optional(S.Boolean) }),
      ).annotate({ identifier: "CopyValueEntry" });
    case 4:
      return S.Array(__S(4483, __c140, 3));
    case 5:
      return S.suspend(() => S.Struct({ entries: __S(4484, __c140, 4) })).annotate({
        identifier: "CopyValue",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          quoteCharacter: S.optional(S.String),
          delimiter: S.optional(S.String),
          columns: S.optional(__S(1504, __c47, 0)),
          source: S.optional(S.String),
          destination: S.optional(S.String),
        }),
      ).annotate({ identifier: "CSV" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          source: S.String,
          target: S.String,
          targetFormat: S.optional(S.String),
          matchPatterns: __S(1504, __c47, 0),
          sourceTimezone: S.optional(S.String),
          targetTimezone: S.optional(S.String),
          locale: S.optional(S.String),
        }),
      ).annotate({ identifier: "DateTimeConverter" });
    case 8:
      return S.suspend(() => S.Struct({ withKeys: __S(1504, __c47, 0) })).annotate({
        identifier: "DeleteKeys",
      });
    case 9:
      return S.suspend(() => S.Struct({ source: S.optional(S.String), match: S.String })).annotate({
        identifier: "Grok",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          source: S.String,
          key: S.String,
          valueKey: S.optional(S.String),
          target: S.optional(S.String),
          flatten: S.optional(S.Boolean),
          flattenedElement: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListToMap" });
    case 11:
      return S.suspend(() => S.Struct({ source: S.optional(S.String) })).annotate({
        identifier: "ParseCloudfront",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({ source: S.optional(S.String), destination: S.optional(S.String) }),
      ).annotate({ identifier: "ParseJSON" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          source: S.optional(S.String),
          destination: S.optional(S.String),
          fieldDelimiter: S.optional(S.String),
          keyValueDelimiter: S.optional(S.String),
          keyPrefix: S.optional(S.String),
          nonMatchValue: S.optional(S.String),
          overwriteIfExists: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ParseKeyValue" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          source: S.optional(S.String),
          eventSource: S.String,
          ocsfVersion: S.String,
          mappingVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "ParseToOCSF" });
    case 15:
      return S.suspend(() =>
        S.Struct({ key: S.String, renameTo: S.String, overwriteIfExists: S.optional(S.Boolean) }),
      ).annotate({ identifier: "RenameKeyEntry" });
    case 16:
      return S.Array(__S(4495, __c140, 15));
    case 17:
      return S.suspend(() => S.Struct({ entries: __S(4496, __c140, 16) })).annotate({
        identifier: "RenameKeys",
      });
    case 18:
      return S.suspend(() => S.Struct({ source: S.String, delimiter: S.String })).annotate({
        identifier: "SplitStringEntry",
      });
    case 19:
      return S.Array(__S(4498, __c140, 18));
    case 20:
      return S.suspend(() => S.Struct({ entries: __S(4499, __c140, 19) })).annotate({
        identifier: "SplitString",
      });
    case 21:
      return S.suspend(() => S.Struct({ source: S.String, from: S.String, to: S.String })).annotate(
        { identifier: "SubstituteStringEntry" },
      );
    case 22:
      return S.Array(__S(4501, __c140, 21));
    case 23:
      return S.suspend(() => S.Struct({ entries: __S(4502, __c140, 22) })).annotate({
        identifier: "SubstituteString",
      });
    case 24:
      return S.suspend(() => S.Struct({ key: S.String, type: S.String })).annotate({
        identifier: "TypeConverterEntry",
      });
    case 25:
      return S.Array(__S(4504, __c140, 24));
    case 26:
      return S.suspend(() => S.Struct({ entries: __S(4505, __c140, 25) })).annotate({
        identifier: "TypeConverter",
      });
    case 27:
      return S.suspend(() =>
        S.Struct({
          addKeys: S.optional(__S(4482, __c140, 2)),
          copyValue: S.optional(__S(4485, __c140, 5)),
          csv: S.optional(__S(4486, __c140, 6)),
          dateTimeConverter: S.optional(__S(4487, __c140, 7)),
          deleteKeys: S.optional(__S(4488, __c140, 8)),
          grok: S.optional(__S(4489, __c140, 9)),
          listToMap: S.optional(__S(4490, __c140, 10)),
          lowerCaseString: S.optional(__S(4488, __c140, 8)),
          moveKeys: S.optional(__S(4485, __c140, 5)),
          parseCloudfront: S.optional(__S(4491, __c140, 11)),
          parseJSON: S.optional(__S(4492, __c140, 12)),
          parseKeyValue: S.optional(__S(4493, __c140, 13)),
          parseRoute53: S.optional(__S(4491, __c140, 11)),
          parseToOCSF: S.optional(__S(4494, __c140, 14)),
          parsePostgres: S.optional(__S(4491, __c140, 11)),
          parseVPC: S.optional(__S(4491, __c140, 11)),
          parseWAF: S.optional(__S(4491, __c140, 11)),
          renameKeys: S.optional(__S(4497, __c140, 17)),
          splitString: S.optional(__S(4500, __c140, 20)),
          substituteString: S.optional(__S(4503, __c140, 23)),
          trimString: S.optional(__S(4488, __c140, 8)),
          typeConverter: S.optional(__S(4506, __c140, 26)),
          upperCaseString: S.optional(__S(4488, __c140, 8)),
        }),
      ).annotate({ identifier: "Processor" });
    case 28:
      return S.Array(__S(4507, __c140, 27));
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIdentifiers: S.optional(__S(1504, __c47, 0)),
          includeLinkedAccounts: S.optional(S.Boolean),
          logGroupClass: S.optional(S.String),
          logGroupNamePattern: S.optional(S.String),
          dataSources: S.optional(__S(4544, __c142, 0)),
          groupBy: S.String,
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAggregateLogGroupSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "GroupingIdentifier" });
    case 2:
      return S.Array(__S(4513, __c141, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          logGroupCount: S.optional(S.Number),
          groupingIdentifiers: S.optional(__S(4514, __c141, 2)),
        }),
      ).annotate({ identifier: "AggregateLogGroupSummary" });
    case 4:
      return S.Array(__S(4515, __c141, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          aggregateLogGroupSummaries: S.optional(__S(4516, __c141, 4)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAggregateLogGroupSummariesResponse" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1312, __c41, 0));
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          anomalyDetectorArn: S.optional(S.String),
          suppressionState: S.optional(S.String),
          limit: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAnomaliesRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ timestamp: S.optional(S.Number), message: S.optional(S.String) }),
      ).annotate({ identifier: "LogEvent" });
    case 3:
      return S.Array(__S(4578, __c143, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          dynamicTokenPosition: S.optional(S.Number),
          isDynamic: S.optional(S.Boolean),
          tokenString: S.optional(S.String),
          enumerations: S.optional(__S(4577, __c143, 1)),
          inferredTokenName: S.optional(S.String),
        }),
      ).annotate({ identifier: "PatternToken" });
    case 5:
      return S.Array(__S(4580, __c143, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          anomalyId: S.String,
          patternId: S.String,
          anomalyDetectorArn: S.String,
          patternString: S.String,
          patternRegex: S.optional(S.String),
          priority: S.optional(S.String),
          firstSeen: S.Number,
          lastSeen: S.Number,
          description: S.String,
          active: S.Boolean,
          state: S.String,
          histogram: __S(4577, __c143, 1),
          logSamples: __S(4579, __c143, 3),
          patternTokens: __S(4581, __c143, 5),
          logGroupArnList: __S(1504, __c47, 0),
          suppressed: S.optional(S.Boolean),
          suppressedDate: S.optional(S.Number),
          suppressedUntil: S.optional(S.Number),
          isPatternLevelSuppression: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Anomaly" });
    case 7:
      return S.Array(__S(4582, __c143, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          anomalies: S.optional(__S(4583, __c143, 7)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAnomaliesResponse" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          integrationNamePrefix: S.optional(S.String),
          integrationType: S.optional(S.String),
          integrationStatus: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListIntegrationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          integrationName: S.optional(S.String),
          integrationType: S.optional(S.String),
          integrationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "IntegrationSummary" });
    case 2:
      return S.Array(__S(4609, __c144, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ integrationSummaries: S.optional(__S(4610, __c144, 2)) }).pipe(ns),
      ).annotate({ identifier: "ListIntegrationsResponse" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filterLogGroupArn: S.optional(S.String),
          limit: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLogAnomalyDetectorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          anomalyDetectorArn: S.optional(S.String),
          detectorName: S.optional(S.String),
          logGroupArnList: S.optional(__S(1504, __c47, 0)),
          evaluationFrequency: S.optional(S.String),
          filterPattern: S.optional(S.String),
          anomalyDetectorStatus: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          creationTimeStamp: S.optional(S.Number),
          lastModifiedTimeStamp: S.optional(S.Number),
          anomalyVisibilityTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AnomalyDetector" });
    case 2:
      return S.Array(__S(4641, __c145, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          anomalyDetectors: S.optional(__S(4642, __c145, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLogAnomalyDetectorsResponse" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.String, values: S.optional(__S(1504, __c47, 0)) }),
      ).annotate({ identifier: "TagFilter" });
    case 1:
      return S.Array(__S(4672, __c146, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          logGroupNamePattern: S.optional(S.String),
          logGroupClass: S.optional(S.String),
          includeLinkedAccounts: S.optional(S.Boolean),
          accountIdentifiers: S.optional(__S(1504, __c47, 0)),
          nextToken: S.optional(S.String),
          limit: S.optional(S.Number),
          dataSources: S.optional(__S(4544, __c142, 0)),
          fieldIndexNames: S.optional(__S(1504, __c47, 0)),
          logGroupTags: S.optional(__S(4673, __c146, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLogGroupsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          logGroupArn: S.optional(S.String),
          logGroupClass: S.optional(S.String),
        }),
      ).annotate({ identifier: "LogGroupSummary" });
    case 4:
      return S.Array(__S(4675, __c146, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          logGroups: S.optional(__S(4676, __c146, 4)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLogGroupsResponse" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          queryId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLogGroupsForQueryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logGroupIdentifiers: S.optional(__S(1504, __c47, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLogGroupsForQueryResponse" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          state: S.optional(S.String),
          scheduleType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListScheduledQueriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scheduledQueryArn: S.optional(S.String),
          name: S.optional(S.String),
          state: S.optional(S.String),
          scheduleType: S.optional(S.String),
          lastTriggeredTime: S.optional(S.Number),
          lastExecutionStatus: S.optional(S.String),
          scheduleExpression: S.optional(S.String),
          timezone: S.optional(S.String),
          destinationConfiguration: S.optional(__S(1890, __c59, 2)),
          creationTime: S.optional(S.Number),
          lastUpdatedTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ScheduledQuerySummary" });
    case 2:
      return S.Array(__S(4737, __c148, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          scheduledQueries: S.optional(__S(4738, __c148, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListScheduledQueriesResponse" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          integrationArn: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSourcesForS3TableIntegrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          identifier: S.optional(S.String),
          dataSource: S.optional(__S(1312, __c41, 0)),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          createdTimeStamp: S.optional(S.Number),
          parentSourceIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3TableIntegrationSource" });
    case 2:
      return S.Array(__S(4769, __c149, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          sources: S.optional(__S(4770, __c149, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListSourcesForS3TableIntegrationResponse" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logGroupIdentifier: S.optional(S.String),
          vpcEndpointId: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSyslogConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logGroupArn: S.optional(S.String),
          sourceType: S.optional(S.String),
          vpcEndpointId: S.optional(S.String),
          createdAt: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SyslogConfiguration" });
    case 2:
      return S.Array(__S(4801, __c150, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          syslogConfigurations: S.optional(__S(4802, __c150, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListSyslogConfigurationsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
