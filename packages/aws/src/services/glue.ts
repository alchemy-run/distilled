import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Glue",
  target: "AWSGlue",
  version: "2017-03-31",
  sigv4: "glue",
  protocol: awsJson1_1Protocol,
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
                `https://glue-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://glue-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://glue.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://glue.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class AlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("AlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ColumnStatisticsTaskNotRunningException
  extends /*@__PURE__*/ TE.TaggedError(
    "ColumnStatisticsTaskNotRunningException",
  )<{ readonly message?: string }> {}
export class ColumnStatisticsTaskRunningException
  extends /*@__PURE__*/ TE.TaggedError("ColumnStatisticsTaskRunningException")<{
    readonly message?: string;
  }> {}
export class ColumnStatisticsTaskStoppingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ColumnStatisticsTaskStoppingException",
  )<{ readonly message?: string }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError("ConcurrentModificationException")<{
    readonly message?: string;
  }> {}
export class ConcurrentRunsExceededException
  extends /*@__PURE__*/ TE.TaggedError("ConcurrentRunsExceededException")<{
    readonly message?: string;
  }> {}
export class ConditionCheckFailureException
  extends /*@__PURE__*/ TE.TaggedError("ConditionCheckFailureException")<{
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
  }> {}
export class CrawlerNotRunningException
  extends /*@__PURE__*/ TE.TaggedError("CrawlerNotRunningException")<{
    readonly message?: string;
  }> {}
export class CrawlerRunningException
  extends /*@__PURE__*/ TE.TaggedError("CrawlerRunningException")<{
    readonly message?: string;
  }> {}
export class CrawlerStoppingException
  extends /*@__PURE__*/ TE.TaggedError("CrawlerStoppingException")<{
    readonly message?: string;
  }> {}
export class EntityNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("EntityNotFoundException")<{
    readonly message?: string;
    readonly FromFederationSource?: boolean;
  }> {}
export class FederatedResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "FederatedResourceAlreadyExistsException",
    ["AlreadyExistsError"],
  )<{ readonly message?: string; readonly AssociatedGlueResource?: string }> {}
export class FederationSourceException
  extends /*@__PURE__*/ TE.TaggedError("FederationSourceException")<{
    readonly FederationSourceErrorCode?: FederationSourceErrorCode;
    readonly message?: string;
  }> {}
export class FederationSourceRetryableException
  extends /*@__PURE__*/ TE.TaggedError("FederationSourceRetryableException")<{
    readonly message?: string;
  }> {}
export class GlueEncryptionException
  extends /*@__PURE__*/ TE.TaggedError("GlueEncryptionException")<{
    readonly message?: string;
  }> {}
export class GlueRoleNotAssumable
  extends /*@__PURE__*/ TE.TaggedError(
    "GlueRoleNotAssumable",
    ["RetryableError"],
    {
      synthetic: {
        from: "InvalidInputException",
        message: { includes: "unable to assume" },
      },
    },
  )<{ readonly message?: string; readonly FromFederationSource?: boolean }> {}
export class GlueS3TargetNotReady
  extends /*@__PURE__*/ TE.TaggedError(
    "GlueS3TargetNotReady",
    ["RetryableError"],
    {
      synthetic: {
        from: "InvalidInputException",
        message: { includes: "InvalidAccessKeyId" },
      },
    },
  )<{ readonly message?: string; readonly FromFederationSource?: boolean }> {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ TE.TaggedError("IdempotentParameterMismatchException")<{
    readonly message?: string;
  }> {}
export class IllegalBlueprintStateException
  extends /*@__PURE__*/ TE.TaggedError("IllegalBlueprintStateException")<{
    readonly message?: string;
  }> {}
export class IllegalSessionStateException
  extends /*@__PURE__*/ TE.TaggedError("IllegalSessionStateException")<{
    readonly message?: string;
  }> {}
export class IllegalWorkflowStateException
  extends /*@__PURE__*/ TE.TaggedError("IllegalWorkflowStateException")<{
    readonly message?: string;
  }> {}
export class IntegrationConflictOperationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationConflictOperationFault",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class IntegrationNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class IntegrationQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationQuotaExceededFault",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError("InternalServiceException")<{
    readonly message?: string;
  }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInputException")<{
    readonly message?: string;
    readonly FromFederationSource?: boolean;
  }> {}
export class InvalidIntegrationStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidIntegrationStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidStateException
  extends /*@__PURE__*/ TE.TaggedError("InvalidStateException")<{
    readonly message?: string;
  }> {}
export class KMSKeyNotAccessibleFault
  extends /*@__PURE__*/ TE.TaggedError(
    "KMSKeyNotAccessibleFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MaterializedViewRefreshTaskNotRunningException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaterializedViewRefreshTaskNotRunningException",
  )<{ readonly message?: string }> {}
export class MaterializedViewRefreshTaskRunningException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaterializedViewRefreshTaskRunningException",
  )<{ readonly message?: string }> {}
export class MaterializedViewRefreshTaskStoppingException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaterializedViewRefreshTaskStoppingException",
  )<{ readonly message?: string }> {}
export class MLTransformNotReadyException
  extends /*@__PURE__*/ TE.TaggedError("MLTransformNotReadyException")<{
    readonly message?: string;
  }> {}
export class NoScheduleException
  extends /*@__PURE__*/ TE.TaggedError("NoScheduleException")<{
    readonly message?: string;
  }> {}
export class OperationNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError("OperationNotSupportedException")<{
    readonly message?: string;
  }> {}
export class OperationTimeoutException
  extends /*@__PURE__*/ TE.TaggedError("OperationTimeoutException")<{
    readonly message?: string;
  }> {}
export class PermissionTypeMismatchException
  extends /*@__PURE__*/ TE.TaggedError("PermissionTypeMismatchException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotReadyException")<{
    readonly message?: string;
  }> {}
export class ResourceNumberLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNumberLimitExceededException")<{
    readonly message?: string;
  }> {}
export class SchedulerNotRunningException
  extends /*@__PURE__*/ TE.TaggedError("SchedulerNotRunningException")<{
    readonly message?: string;
  }> {}
export class SchedulerRunningException
  extends /*@__PURE__*/ TE.TaggedError("SchedulerRunningException")<{
    readonly message?: string;
  }> {}
export class SchedulerTransitioningException
  extends /*@__PURE__*/ TE.TaggedError("SchedulerTransitioningException")<{
    readonly message?: string;
  }> {}
export class SessionBusyException
  extends /*@__PURE__*/ TE.TaggedError("SessionBusyException")<{
    readonly message?: string;
  }> {}
export class TargetResourceNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "TargetResourceNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
  }> {}
export class VersionMismatchException
  extends /*@__PURE__*/ TE.TaggedError("VersionMismatchException")<{
    readonly message?: string;
  }> {}
export type AssetId = string;
export type IterableFormName = string;
export type ItemIdentifier = string;
export type GlossaryTermId = string;
export type GlossaryTermIdList = string[];
export type HashString = string;
export interface AssociateGlossaryTermsRequest {
  AssetIdentifier: string;
  IterableFormName?: string;
  ItemIdentifier?: string;
  GlossaryTermIdentifiers: string[];
  ClientToken?: string;
}
export interface AssociateGlossaryTermsResponse {
  AssetIdentifier?: string;
  IterableFormName?: string;
  ItemIdentifier?: string;
  GlossaryTerms?: string[];
}
export type CatalogIdString = string;
export type NameString = string;
export type ValueString = string;
export type ValueStringList = string[];
export type ColumnTypeString = string;
export type CommentString = string;
export type KeyString = string;
export type ParametersMapValue = string;
export type ParametersMap = { [key: string]: string | undefined };
export interface Column {
  Name: string;
  Type?: string;
  Comment?: string;
  Parameters?: { [key: string]: string | undefined };
}
export type ColumnList = Column[];
export type LocationString = string;
export type LocationStringList = string[];
export type FormatString = string;
export interface SerDeInfo {
  Name?: string;
  SerializationLibrary?: string;
  Parameters?: { [key: string]: string | undefined };
}
export type NameStringList = string[];
export type IntegerFlag = number;
export interface Order {
  Column: string;
  SortOrder: number;
}
export type OrderList = Order[];
export type ColumnValuesString = string;
export type ColumnValueStringList = string[];
export type LocationMap = { [key: string]: string | undefined };
export interface SkewedInfo {
  SkewedColumnNames?: string[];
  SkewedColumnValues?: string[];
  SkewedColumnValueLocationMaps?: { [key: string]: string | undefined };
}
export type GlueResourceArn = string;
export type SchemaRegistryNameString = string;
export interface SchemaId {
  SchemaArn?: string;
  SchemaName?: string;
  RegistryName?: string;
}
export type SchemaVersionIdString = string;
export type VersionLongNumber = number;
export interface SchemaReference {
  SchemaId?: SchemaId;
  SchemaVersionId?: string;
  SchemaVersionNumber?: number;
}
export interface StorageDescriptor {
  Columns?: Column[];
  Location?: string;
  AdditionalLocations?: string[];
  InputFormat?: string;
  OutputFormat?: string;
  Compressed?: boolean;
  NumberOfBuckets?: number;
  SerdeInfo?: SerDeInfo;
  BucketColumns?: string[];
  SortColumns?: Order[];
  Parameters?: { [key: string]: string | undefined };
  SkewedInfo?: SkewedInfo;
  StoredAsSubDirectories?: boolean;
  SchemaReference?: SchemaReference;
}
export interface PartitionInput {
  Values?: string[];
  LastAccessTime?: Date;
  StorageDescriptor?: StorageDescriptor;
  Parameters?: { [key: string]: string | undefined };
  LastAnalyzedTime?: Date;
}
export type PartitionInputList = PartitionInput[];
export interface BatchCreatePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionInputList: PartitionInput[];
}
export type DescriptionString = string;
export interface ErrorDetail {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export interface PartitionError {
  PartitionValues?: string[];
  ErrorDetail?: ErrorDetail;
}
export type PartitionErrors = PartitionError[];
export interface BatchCreatePartitionResponse {
  Errors?: PartitionError[];
}
export type DeleteConnectionNameList = string[];
export interface BatchDeleteConnectionRequest {
  CatalogId?: string;
  ConnectionNameList: string[];
}
export type ErrorByName = { [key: string]: ErrorDetail | undefined };
export interface BatchDeleteConnectionResponse {
  Succeeded?: string[];
  Errors?: { [key: string]: ErrorDetail | undefined };
}
export interface PartitionValueList {
  Values: string[];
}
export type BatchDeletePartitionValueList = PartitionValueList[];
export interface BatchDeletePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionsToDelete: PartitionValueList[];
}
export interface BatchDeletePartitionResponse {
  Errors?: PartitionError[];
}
export type BatchDeleteTableNameList = string[];
export type TransactionIdString = string;
export interface BatchDeleteTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  TablesToDelete: string[];
  TransactionId?: string;
}
export interface TableError {
  TableName?: string;
  ErrorDetail?: ErrorDetail;
}
export type TableErrors = TableError[];
export interface BatchDeleteTableResponse {
  Errors?: TableError[];
}
export type VersionString = string;
export type BatchDeleteTableVersionList = string[];
export interface BatchDeleteTableVersionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  VersionIds: string[];
}
export interface TableVersionError {
  TableName?: string;
  VersionId?: string;
  ErrorDetail?: ErrorDetail;
}
export type TableVersionErrors = TableVersionError[];
export interface BatchDeleteTableVersionResponse {
  Errors?: TableVersionError[];
}
export type OrchestrationNameString = string;
export type BatchGetBlueprintNames = string[];
export interface BatchGetBlueprintsRequest {
  Names: string[];
  IncludeBlueprint?: boolean;
  IncludeParameterSpec?: boolean;
}
export type Generic512CharString = string;
export type TimestampValue = Date;
export type BlueprintParameterSpec = string;
export type BlueprintStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "FAILED"
  | (string & {});
export type ErrorString = string;
export interface LastActiveDefinition {
  Description?: string;
  LastModifiedOn?: Date;
  ParameterSpec?: string;
  BlueprintLocation?: string;
  BlueprintServiceLocation?: string;
}
export interface Blueprint {
  Name?: string;
  Description?: string;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  ParameterSpec?: string;
  BlueprintLocation?: string;
  BlueprintServiceLocation?: string;
  Status?: BlueprintStatus;
  ErrorMessage?: string;
  LastActiveDefinition?: LastActiveDefinition;
}
export type Blueprints = Blueprint[];
export type BlueprintNames = string[];
export interface BatchGetBlueprintsResponse {
  Blueprints?: Blueprint[];
  MissingBlueprints?: string[];
}
export type CrawlerNameList = string[];
export interface BatchGetCrawlersRequest {
  CrawlerNames: string[];
}
export type Role = string;
export type Path = string;
export type PathList = string[];
export type ConnectionName = string;
export type EventQueueArn = string;
export interface S3Target {
  Path?: string;
  Exclusions?: string[];
  ConnectionName?: string;
  SampleSize?: number;
  EventQueueArn?: string;
  DlqEventQueueArn?: string;
}
export type S3TargetList = S3Target[];
export type JdbcMetadataEntry = "COMMENTS" | "RAWTYPES" | (string & {});
export type EnableAdditionalMetadata = JdbcMetadataEntry[];
export interface JdbcTarget {
  ConnectionName?: string;
  Path?: string;
  Exclusions?: string[];
  EnableAdditionalMetadata?: JdbcMetadataEntry[];
}
export type JdbcTargetList = JdbcTarget[];
export interface MongoDBTarget {
  ConnectionName?: string;
  Path?: string;
  ScanAll?: boolean;
}
export type MongoDBTargetList = MongoDBTarget[];
export interface DynamoDBTarget {
  Path?: string;
  scanAll?: boolean;
  scanRate?: number;
}
export type DynamoDBTargetList = DynamoDBTarget[];
export type CatalogTablesList = string[];
export interface CatalogTarget {
  DatabaseName: string;
  Tables: string[];
  ConnectionName?: string;
  EventQueueArn?: string;
  DlqEventQueueArn?: string;
}
export type CatalogTargetList = CatalogTarget[];
export interface DeltaTarget {
  DeltaTables?: string[];
  ConnectionName?: string;
  WriteManifest?: boolean;
  CreateNativeDeltaTable?: boolean;
}
export type DeltaTargetList = DeltaTarget[];
export interface IcebergTarget {
  Paths?: string[];
  ConnectionName?: string;
  Exclusions?: string[];
  MaximumTraversalDepth?: number;
}
export type IcebergTargetList = IcebergTarget[];
export interface HudiTarget {
  Paths?: string[];
  ConnectionName?: string;
  Exclusions?: string[];
  MaximumTraversalDepth?: number;
}
export type HudiTargetList = HudiTarget[];
export interface CrawlerTargets {
  S3Targets?: S3Target[];
  JdbcTargets?: JdbcTarget[];
  MongoDBTargets?: MongoDBTarget[];
  DynamoDBTargets?: DynamoDBTarget[];
  CatalogTargets?: CatalogTarget[];
  DeltaTargets?: DeltaTarget[];
  IcebergTargets?: IcebergTarget[];
  HudiTargets?: HudiTarget[];
}
export type DatabaseName = string;
export type ClassifierNameList = string[];
export type RecrawlBehavior =
  | "CRAWL_EVERYTHING"
  | "CRAWL_NEW_FOLDERS_ONLY"
  | "CRAWL_EVENT_MODE"
  | (string & {});
export interface RecrawlPolicy {
  RecrawlBehavior?: RecrawlBehavior;
}
export type UpdateBehavior = "LOG" | "UPDATE_IN_DATABASE" | (string & {});
export type DeleteBehavior =
  | "LOG"
  | "DELETE_FROM_DATABASE"
  | "DEPRECATE_IN_DATABASE"
  | (string & {});
export interface SchemaChangePolicy {
  UpdateBehavior?: UpdateBehavior;
  DeleteBehavior?: DeleteBehavior;
}
export type CrawlerLineageSettings = "ENABLE" | "DISABLE" | (string & {});
export interface LineageConfiguration {
  CrawlerLineageSettings?: CrawlerLineageSettings;
}
export type CrawlerState = "READY" | "RUNNING" | "STOPPING" | (string & {});
export type TablePrefix = string;
export type CronExpression = string;
export type ScheduleState =
  | "SCHEDULED"
  | "NOT_SCHEDULED"
  | "TRANSITIONING"
  | (string & {});
export interface Schedule {
  ScheduleExpression?: string;
  State?: ScheduleState;
}
export type MillisecondsCount = number;
export type LastCrawlStatus =
  | "SUCCEEDED"
  | "CANCELLED"
  | "FAILED"
  | (string & {});
export type LogGroup = string;
export type LogStream = string;
export type MessagePrefix = string;
export interface LastCrawlInfo {
  Status?: LastCrawlStatus;
  ErrorMessage?: string;
  LogGroup?: string;
  LogStream?: string;
  MessagePrefix?: string;
  StartTime?: Date;
}
export type VersionId = number;
export type CrawlerConfiguration = string;
export type CrawlerSecurityConfiguration = string;
export type AccountId = string;
export interface LakeFormationConfiguration {
  UseLakeFormationCredentials?: boolean;
  AccountId?: string;
}
export interface Crawler {
  Name?: string;
  Role?: string;
  Targets?: CrawlerTargets;
  DatabaseName?: string;
  Description?: string;
  Classifiers?: string[];
  RecrawlPolicy?: RecrawlPolicy;
  SchemaChangePolicy?: SchemaChangePolicy;
  LineageConfiguration?: LineageConfiguration;
  State?: CrawlerState;
  TablePrefix?: string;
  Schedule?: Schedule;
  CrawlElapsedTime?: number;
  CreationTime?: Date;
  LastUpdated?: Date;
  LastCrawl?: LastCrawlInfo;
  Version?: number;
  Configuration?: string;
  CrawlerSecurityConfiguration?: string;
  LakeFormationConfiguration?: LakeFormationConfiguration;
}
export type CrawlerList = Crawler[];
export interface BatchGetCrawlersResponse {
  Crawlers?: Crawler[];
  CrawlersNotFound?: string[];
}
export type CustomEntityTypeNames = string[];
export interface BatchGetCustomEntityTypesRequest {
  Names: string[];
}
export type ContextWords = string[];
export interface CustomEntityType {
  Name: string;
  RegexString: string;
  ContextWords?: string[];
}
export type CustomEntityTypes = CustomEntityType[];
export interface BatchGetCustomEntityTypesResponse {
  CustomEntityTypes?: CustomEntityType[];
  CustomEntityTypesNotFound?: string[];
}
export type DataQualityResultIds = string[];
export interface BatchGetDataQualityResultRequest {
  ResultIds: string[];
}
export type GenericBoundedDouble = number;
export type GlueTableAdditionalOptions = { [key: string]: string | undefined };
export interface GlueTable {
  DatabaseName: string;
  TableName: string;
  CatalogId?: string;
  ConnectionName?: string;
  AdditionalOptions?: { [key: string]: string | undefined };
}
export type PreProcessingQueryString = string;
export interface DataQualityGlueTable {
  DatabaseName: string;
  TableName: string;
  CatalogId?: string;
  ConnectionName?: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  PreProcessingQuery?: string;
}
export interface DataSource {
  GlueTable?: GlueTable;
  DataQualityGlueTable?: DataQualityGlueTable;
}
export type DataQualityRuleResultDescription =
  | string
  | redacted.Redacted<string>;
export type DataQualityRuleResultStatus =
  | "PASS"
  | "FAIL"
  | "ERROR"
  | (string & {});
export type EvaluatedMetricsMap = { [key: string]: number | undefined };
export type RuleMetricsMap = { [key: string]: number | undefined };
export type Labels = { [key: string]: string | undefined };
export interface DataQualityRuleResult {
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  EvaluationMessage?: string | redacted.Redacted<string>;
  Result?: DataQualityRuleResultStatus;
  EvaluatedMetrics?: { [key: string]: number | undefined };
  EvaluatedRule?: string | redacted.Redacted<string>;
  RuleMetrics?: { [key: string]: number | undefined };
  Labels?: { [key: string]: string | undefined };
}
export type DataQualityRuleResults = DataQualityRuleResult[];
export type BinEdges = string[];
export type Count = number[];
export interface DistributionData {
  BinEdges?: string[];
  Count?: number[];
  DataType?: string;
}
export type EvaluatedDistributionsMap = {
  [key: string]: DistributionData | undefined;
};
export interface DataQualityAnalyzerResult {
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  EvaluationMessage?: string | redacted.Redacted<string>;
  EvaluatedMetrics?: { [key: string]: number | undefined };
  EvaluatedDistributions?: { [key: string]: DistributionData | undefined };
}
export type DataQualityAnalyzerResults = DataQualityAnalyzerResult[];
export type DataQualityObservationDescription =
  | string
  | redacted.Redacted<string>;
export interface DataQualityMetricValues {
  ActualValue?: number;
  ExpectedValue?: number;
  LowerLimit?: number;
  UpperLimit?: number;
}
export type NewRules = string[];
export interface MetricBasedObservation {
  MetricName?: string;
  StatisticId?: string;
  MetricValues?: DataQualityMetricValues;
  NewRules?: string[];
}
export interface DataQualityObservation {
  Description?: string | redacted.Redacted<string>;
  MetricBasedObservation?: MetricBasedObservation;
}
export type DataQualityObservations = DataQualityObservation[];
export interface DataQualityAggregatedMetrics {
  TotalRowsProcessed?: number;
  TotalRowsPassed?: number;
  TotalRowsFailed?: number;
  TotalRulesProcessed?: number;
  TotalRulesPassed?: number;
  TotalRulesFailed?: number;
}
export interface DataQualityResult {
  ResultId?: string;
  ProfileId?: string;
  Score?: number;
  DataSource?: DataSource;
  RulesetName?: string;
  EvaluationContext?: string;
  StartedOn?: Date;
  CompletedOn?: Date;
  JobName?: string;
  JobRunId?: string;
  RulesetEvaluationRunId?: string;
  RuleResults?: DataQualityRuleResult[];
  AnalyzerResults?: DataQualityAnalyzerResult[];
  Observations?: DataQualityObservation[];
  AggregatedMetrics?: DataQualityAggregatedMetrics;
}
export type DataQualityResultsList = DataQualityResult[];
export interface BatchGetDataQualityResultResponse {
  Results: DataQualityResult[];
  ResultsNotFound?: string[];
}
export type DataQualityRulesetEvaluationRunIdList = string[];
export interface BatchGetDataQualityRulesetEvaluationRunRequest {
  RunIds: string[];
}
export type RoleString = string;
export type Timeout = number;
export type UriString = string;
export type DQCompositeRuleEvaluationMethod = "COLUMN" | "ROW" | (string & {});
export type ResultTypeEnum =
  | "ALL"
  | "PASSED_ONLY"
  | "FAILED_ONLY"
  | (string & {});
export interface CatalogTableConfigOptions {
  DatabaseName?: string;
  TableName?: string;
  S3Location?: string;
  CatalogId?: string;
}
export interface RowLevelResultsOptions {
  MaxRowsToWrite?: number;
  ResultType?: ResultTypeEnum;
  CatalogTableConfig?: CatalogTableConfigOptions;
}
export interface DistributionResultsOptions {
  WriteDistributionResultsEnabled?: boolean;
  CatalogTableConfig?: CatalogTableConfigOptions;
}
export interface ProfilingResultsOptions {
  WriteProfilingResultsEnabled?: boolean;
  CatalogTableConfig?: CatalogTableConfigOptions;
  DistributionResults?: DistributionResultsOptions;
}
export type ObservationConfiguration = "ALL" | "NONE" | (string & {});
export type ObservationMode = "SCHEDULED" | "FIXED" | (string & {});
export interface DataQualityRuleResultsOptions {
  WriteDataQualityRuleResultsEnabled?: boolean;
  CatalogTableConfig?: CatalogTableConfigOptions;
}
export interface ObservationResultsOptions {
  WriteObservationResultsEnabled?: boolean;
  CatalogTableConfig?: CatalogTableConfigOptions;
}
export interface DataQualityEvaluationRunAdditionalRunOptions {
  CloudWatchMetricsEnabled?: boolean;
  ResultsS3Prefix?: string;
  CompositeRuleEvaluationMethod?: DQCompositeRuleEvaluationMethod;
  CustomLogGroupPrefix?: string;
  RowLevelResults?: RowLevelResultsOptions;
  ProfilingResults?: ProfilingResultsOptions;
  ObservationScope?: ObservationConfiguration;
  ObservationMode?: ObservationMode;
  DataQualityRuleResults?: DataQualityRuleResultsOptions;
  ObservationResults?: ObservationResultsOptions;
}
export type TaskStatusType =
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMEOUT"
  | (string & {});
export type ExecutionTime = number;
export type RulesetNames = string[];
export type DataQualityResultIdList = string[];
export type DataSourceMap = { [key: string]: DataSource | undefined };
export interface DataQualityRulesetEvaluationRun {
  RunId?: string;
  DataSource?: DataSource;
  Role?: string;
  NumberOfWorkers?: number;
  Timeout?: number;
  AdditionalRunOptions?: DataQualityEvaluationRunAdditionalRunOptions;
  Status?: TaskStatusType;
  ErrorString?: string;
  StartedOn?: Date;
  LastModifiedOn?: Date;
  CompletedOn?: Date;
  ExecutionTime?: number;
  RulesetNames?: string[];
  ResultIds?: string[];
  AdditionalDataSources?: { [key: string]: DataSource | undefined };
}
export type DataQualityRulesetEvaluationRunsList =
  DataQualityRulesetEvaluationRun[];
export interface BatchGetDataQualityRulesetEvaluationRunResponse {
  Runs?: DataQualityRulesetEvaluationRun[];
  RunsNotFound?: string[];
}
export type DevEndpointNames = string[];
export interface BatchGetDevEndpointsRequest {
  DevEndpointNames: string[];
}
export type RoleArn = string;
export type StringList = string[];
export type IntegerValue = number;
export type WorkerType =
  | "Standard"
  | "G.1X"
  | "G.2X"
  | "G.025X"
  | "G.4X"
  | "G.8X"
  | "Z.2X"
  | (string & {});
export type GlueVersionString = string;
export type PublicKeysList = string[];
export type MapValue = { [key: string]: string | undefined };
export interface DevEndpoint {
  EndpointName?: string;
  RoleArn?: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
  YarnEndpointAddress?: string;
  PrivateAddress?: string;
  ZeppelinRemoteSparkInterpreterPort?: number;
  PublicAddress?: string;
  Status?: string;
  WorkerType?: WorkerType;
  GlueVersion?: string;
  NumberOfWorkers?: number;
  NumberOfNodes?: number;
  AvailabilityZone?: string;
  VpcId?: string;
  ExtraPythonLibsS3Path?: string;
  ExtraJarsS3Path?: string;
  FailureReason?: string;
  LastUpdateStatus?: string;
  CreatedTimestamp?: Date;
  LastModifiedTimestamp?: Date;
  PublicKey?: string;
  PublicKeys?: string[];
  SecurityConfiguration?: string;
  Arguments?: { [key: string]: string | undefined };
}
export type DevEndpointList = DevEndpoint[];
export interface BatchGetDevEndpointsResponse {
  DevEndpoints?: DevEndpoint[];
  DevEndpointsNotFound?: string[];
}
export type ItemIdentifierList = string[];
export interface BatchGetIterableFormsRequest {
  AssetIdentifier: string;
  IterableFormName: string;
  ItemIdentifiers: string[];
}
export type ItemId = string;
export type ItemName = string;
export type AssetFormKey = string;
export type FormTypeId = string;
export type FormContent = string;
export interface AssetFormEntry {
  FormTypeId?: string;
  Content?: string;
}
export type AssetFormMap = { [key: string]: AssetFormEntry | undefined };
export interface IterableFormItem {
  ItemId?: string;
  ItemName?: string;
  GlossaryTerms?: string[];
  Forms?: { [key: string]: AssetFormEntry | undefined };
  Attachments?: { [key: string]: AssetFormEntry | undefined };
}
export type IterableFormItemList = IterableFormItem[];
export type ItemErrorCode = string;
export type ItemErrorMessage = string;
export interface ItemError {
  ItemIdentifier?: string;
  Code?: string;
  Message?: string;
}
export type ItemErrorList = ItemError[];
export interface BatchGetIterableFormsResponse {
  Items?: IterableFormItem[];
  Errors?: ItemError[];
}
export type JobNameList = string[];
export interface BatchGetJobsRequest {
  JobNames: string[];
}
export type JobMode = "SCRIPT" | "VISUAL" | "NOTEBOOK" | (string & {});
export type MaxConcurrentRuns = number;
export interface ExecutionProperty {
  MaxConcurrentRuns?: number;
}
export type ScriptLocationString = string;
export type PythonVersionString = string;
export type RuntimeNameString = string;
export interface JobCommand {
  Name?: string;
  ScriptLocation?: string;
  PythonVersion?: string;
  Runtime?: string;
}
export type GenericMap = { [key: string]: string | undefined };
export type ConnectionString = string;
export type ConnectionStringList = string[];
export interface ConnectionsList {
  Connections?: string[];
}
export type MaxRetries = number;
export type NotifyDelayAfter = number;
export interface NotificationProperty {
  NotifyDelayAfter?: number;
}
export type NodeId = string;
export type NodeName = string;
export type EnclosedInStringProperty = string;
export type EnclosedInStringPropertyWithQuote = string;
export type GlueStudioColumnNameString = string;
export interface GlueStudioSchemaColumn {
  Name: string;
  Type?: string;
  GlueStudioType?: string;
}
export type GlueStudioSchemaColumnList = GlueStudioSchemaColumn[];
export interface GlueSchema {
  Columns?: GlueStudioSchemaColumn[];
}
export type GlueSchemas = GlueSchema[];
export interface AthenaConnectorSource {
  Name: string;
  ConnectionName: string;
  ConnectorName: string;
  ConnectionType: string;
  ConnectionTable?: string;
  SchemaName: string;
  OutputSchemas?: GlueSchema[];
}
export type BoxedNonNegativeLong = number;
export type EnclosedInStringProperties = string[];
export type JDBCDataType =
  | "ARRAY"
  | "BIGINT"
  | "BINARY"
  | "BIT"
  | "BLOB"
  | "BOOLEAN"
  | "CHAR"
  | "CLOB"
  | "DATALINK"
  | "DATE"
  | "DECIMAL"
  | "DISTINCT"
  | "DOUBLE"
  | "FLOAT"
  | "INTEGER"
  | "JAVA_OBJECT"
  | "LONGNVARCHAR"
  | "LONGVARBINARY"
  | "LONGVARCHAR"
  | "NCHAR"
  | "NCLOB"
  | "NULL"
  | "NUMERIC"
  | "NVARCHAR"
  | "OTHER"
  | "REAL"
  | "REF"
  | "REF_CURSOR"
  | "ROWID"
  | "SMALLINT"
  | "SQLXML"
  | "STRUCT"
  | "TIME"
  | "TIME_WITH_TIMEZONE"
  | "TIMESTAMP"
  | "TIMESTAMP_WITH_TIMEZONE"
  | "TINYINT"
  | "VARBINARY"
  | "VARCHAR"
  | (string & {});
export type GlueRecordType =
  | "DATE"
  | "STRING"
  | "TIMESTAMP"
  | "INT"
  | "FLOAT"
  | "LONG"
  | "BIGDECIMAL"
  | "BYTE"
  | "SHORT"
  | "DOUBLE"
  | (string & {});
export type JDBCDataTypeMapping = { [key in JDBCDataType]?: GlueRecordType };
export interface JDBCConnectorOptions {
  FilterPredicate?: string;
  PartitionColumn?: string;
  LowerBound?: number;
  UpperBound?: number;
  NumPartitions?: number;
  JobBookmarkKeys?: string[];
  JobBookmarkKeysSortOrder?: string;
  DataTypeMapping?: { [key: string]: GlueRecordType | undefined };
}
export type SqlQuery = string;
export interface JDBCConnectorSource {
  Name: string;
  ConnectionName: string;
  ConnectorName: string;
  ConnectionType: string;
  AdditionalOptions?: JDBCConnectorOptions;
  ConnectionTable?: string;
  Query?: string;
  OutputSchemas?: GlueSchema[];
}
export type AdditionalOptions = { [key: string]: string | undefined };
export interface SparkConnectorSource {
  Name: string;
  ConnectionName: string;
  ConnectorName: string;
  ConnectionType: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export interface CatalogSource {
  Name: string;
  Database: string;
  Table: string;
  PartitionPredicate?: string;
  OutputSchemas?: GlueSchema[];
}
export interface RedshiftSource {
  Name: string;
  Database: string;
  Table: string;
  RedshiftTmpDir?: string;
  TmpDirIAMRole?: string;
}
export type BoxedLong = number;
export interface S3SourceAdditionalOptions {
  BoundedSize?: number;
  BoundedFiles?: number;
}
export interface S3CatalogSource {
  Name: string;
  Database: string;
  Table: string;
  PartitionPredicate?: string;
  AdditionalOptions?: S3SourceAdditionalOptions;
}
export type CompressionType = "gzip" | "bzip2" | (string & {});
export type BoxedBoolean = boolean;
export type BoxedNonNegativeInt = number;
export interface S3DirectSourceAdditionalOptions {
  BoundedSize?: number;
  BoundedFiles?: number;
  EnableSamplePath?: boolean;
  SamplePath?: string;
}
export type Separator =
  | "comma"
  | "ctrla"
  | "pipe"
  | "semicolon"
  | "tab"
  | (string & {});
export type QuoteChar =
  | "quote"
  | "quillemet"
  | "single_quote"
  | "disabled"
  | (string & {});
export interface S3CsvSource {
  Name: string;
  Paths: string[];
  CompressionType?: CompressionType;
  Exclusions?: string[];
  GroupSize?: string;
  GroupFiles?: string;
  Recurse?: boolean;
  MaxBand?: number;
  MaxFilesInBand?: number;
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  Separator: Separator;
  Escaper?: string;
  QuoteChar: QuoteChar;
  Multiline?: boolean;
  WithHeader?: boolean;
  WriteHeader?: boolean;
  SkipFirst?: boolean;
  OptimizePerformance?: boolean;
  OutputSchemas?: GlueSchema[];
}
export interface S3JsonSource {
  Name: string;
  Paths: string[];
  CompressionType?: CompressionType;
  Exclusions?: string[];
  GroupSize?: string;
  GroupFiles?: string;
  Recurse?: boolean;
  MaxBand?: number;
  MaxFilesInBand?: number;
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  JsonPath?: string;
  Multiline?: boolean;
  OutputSchemas?: GlueSchema[];
}
export type ParquetCompressionType =
  | "snappy"
  | "lzo"
  | "gzip"
  | "brotli"
  | "lz4"
  | "uncompressed"
  | "none"
  | (string & {});
export interface S3ParquetSource {
  Name: string;
  Paths: string[];
  CompressionType?: ParquetCompressionType;
  Exclusions?: string[];
  GroupSize?: string;
  GroupFiles?: string;
  Recurse?: boolean;
  MaxBand?: number;
  MaxFilesInBand?: number;
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  OutputSchemas?: GlueSchema[];
}
export interface RelationalCatalogSource {
  Name: string;
  Database: string;
  Table: string;
}
export interface DDBELTCatalogAdditionalOptions {
  DynamodbExport?: string;
  DynamodbUnnestDDBJson?: boolean;
}
export interface DynamoDBCatalogSource {
  Name: string;
  Database: string;
  Table: string;
  PitrEnabled?: boolean;
  AdditionalOptions?: DDBELTCatalogAdditionalOptions;
}
export type OneInput = string[];
export interface JDBCConnectorTarget {
  Name: string;
  Inputs: string[];
  ConnectionName: string;
  ConnectionTable: string;
  ConnectorName: string;
  ConnectionType: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export interface SparkConnectorTarget {
  Name: string;
  Inputs: string[];
  ConnectionName: string;
  ConnectorName: string;
  ConnectionType: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export type GlueStudioPathList = string[][];
export interface BasicCatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Database: string;
  Table: string;
}
export type EnclosedInStringPropertiesMinOne = string[];
export interface UpsertRedshiftTargetOptions {
  TableLocation?: string;
  ConnectionName?: string;
  UpsertKeys?: string[];
}
export interface RedshiftTarget {
  Name: string;
  Inputs: string[];
  Database: string;
  Table: string;
  RedshiftTmpDir?: string;
  TmpDirIAMRole?: string;
  UpsertRedshiftOptions?: UpsertRedshiftTargetOptions;
}
export type UpdateCatalogBehavior =
  | "UPDATE_IN_DATABASE"
  | "LOG"
  | (string & {});
export interface CatalogSchemaChangePolicy {
  EnableUpdateCatalog?: boolean;
  UpdateBehavior?: UpdateCatalogBehavior;
}
export interface AutoDataQuality {
  IsEnabled?: boolean;
  EvaluationContext?: string;
}
export interface S3CatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Table: string;
  Database: string;
  SchemaChangePolicy?: CatalogSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
}
export type NumberTargetPartitionsString = string;
export interface DirectSchemaChangePolicy {
  EnableUpdateCatalog?: boolean;
  UpdateBehavior?: UpdateCatalogBehavior;
  Table?: string;
  Database?: string;
}
export interface S3GlueParquetTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Path: string;
  Compression?: ParquetCompressionType;
  NumberTargetPartitions?: string;
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
}
export type TargetFormat =
  | "json"
  | "csv"
  | "avro"
  | "orc"
  | "parquet"
  | "hudi"
  | "delta"
  | "iceberg"
  | "hyper"
  | "xml"
  | (string & {});
export interface S3DirectTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Path: string;
  Compression?: string;
  NumberTargetPartitions?: string;
  Format: TargetFormat;
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
  OutputSchemas?: GlueSchema[];
}
export interface Mapping {
  ToKey?: string;
  FromPath?: string[];
  FromType?: string;
  ToType?: string;
  Dropped?: boolean;
  Children?: Mapping[];
}
export type Mappings = Mapping[];
export interface ApplyMapping {
  Name: string;
  Inputs: string[];
  Mapping: Mapping[];
}
export interface SelectFields {
  Name: string;
  Inputs: string[];
  Paths: string[][];
}
export interface DropFields {
  Name: string;
  Inputs: string[];
  Paths: string[][];
}
export interface RenameField {
  Name: string;
  Inputs: string[];
  SourcePath: string[];
  TargetPath: string[];
}
export type Topk = number;
export type Prob = number;
export interface Spigot {
  Name: string;
  Inputs: string[];
  Path: string;
  Topk?: number;
  Prob?: number;
}
export type TwoInputs = string[];
export type JoinType =
  | "equijoin"
  | "left"
  | "right"
  | "outer"
  | "leftsemi"
  | "leftanti"
  | (string & {});
export interface JoinColumn {
  From: string;
  Keys: string[][];
}
export type JoinColumns = JoinColumn[];
export interface Join {
  Name: string;
  Inputs: string[];
  JoinType: JoinType;
  Columns: JoinColumn[];
}
export interface SplitFields {
  Name: string;
  Inputs: string[];
  Paths: string[][];
}
export type NonNegativeInt = number;
export interface SelectFromCollection {
  Name: string;
  Inputs: string[];
  Index: number;
}
export interface FillMissingValues {
  Name: string;
  Inputs: string[];
  ImputedPath: string;
  FilledPath?: string;
}
export type FilterLogicalOperator = "AND" | "OR" | (string & {});
export type FilterOperation =
  | "EQ"
  | "LT"
  | "GT"
  | "LTE"
  | "GTE"
  | "REGEX"
  | "ISNULL"
  | (string & {});
export type FilterValueType = "COLUMNEXTRACTED" | "CONSTANT" | (string & {});
export interface FilterValue {
  Type: FilterValueType;
  Value: string[];
}
export type FilterValues = FilterValue[];
export interface FilterExpression {
  Operation: FilterOperation;
  Negated?: boolean;
  Values: FilterValue[];
}
export type FilterExpressions = FilterExpression[];
export interface Filter {
  Name: string;
  Inputs: string[];
  LogicalOperator: FilterLogicalOperator;
  Filters: FilterExpression[];
}
export type ManyInputs = string[];
export type ExtendedString = string;
export interface CustomCode {
  Name: string;
  Inputs: string[];
  Code: string;
  ClassName: string;
  OutputSchemas?: GlueSchema[];
}
export interface SqlAlias {
  From: string;
  Alias: string;
}
export type SqlAliases = SqlAlias[];
export interface SparkSQL {
  Name: string;
  Inputs: string[];
  SqlQuery: string;
  SqlAliases: SqlAlias[];
  OutputSchemas?: GlueSchema[];
}
export type BoxedPositiveInt = number;
export type StartingPosition =
  | "latest"
  | "trim_horizon"
  | "earliest"
  | "timestamp"
  | (string & {});
export type Iso8601DateTime = Date;
export interface KinesisStreamingSourceOptions {
  EndpointUrl?: string;
  StreamName?: string;
  Classification?: string;
  Delimiter?: string;
  StartingPosition?: StartingPosition;
  MaxFetchTimeInMs?: number;
  MaxFetchRecordsPerShard?: number;
  MaxRecordPerRead?: number;
  AddIdleTimeBetweenReads?: boolean;
  IdleTimeBetweenReadsInMs?: number;
  DescribeShardInterval?: number;
  NumRetries?: number;
  RetryIntervalMs?: number;
  MaxRetryIntervalMs?: number;
  AvoidEmptyBatches?: boolean;
  StreamArn?: string;
  RoleArn?: string;
  RoleSessionName?: string;
  AddRecordTimestamp?: string;
  EmitConsumerLagMetrics?: string;
  StartingTimestamp?: Date;
  FanoutConsumerARN?: string;
}
export type PollingTime = number;
export type PositiveLong = number;
export interface StreamingDataPreviewOptions {
  PollingTime?: number;
  RecordPollingLimit?: number;
}
export interface DirectKinesisSource {
  Name: string;
  WindowSize?: number;
  DetectSchema?: boolean;
  StreamingOptions?: KinesisStreamingSourceOptions;
  DataPreviewOptions?: StreamingDataPreviewOptions;
}
export interface KafkaStreamingSourceOptions {
  BootstrapServers?: string;
  SecurityProtocol?: string;
  ConnectionName?: string;
  TopicName?: string;
  Assign?: string;
  SubscribePattern?: string;
  Classification?: string;
  Delimiter?: string;
  StartingOffsets?: string;
  EndingOffsets?: string;
  PollTimeoutMs?: number;
  NumRetries?: number;
  RetryIntervalMs?: number;
  MaxOffsetsPerTrigger?: number;
  MinPartitions?: number;
  IncludeHeaders?: boolean;
  AddRecordTimestamp?: string;
  EmitConsumerLagMetrics?: string;
  StartingTimestamp?: Date;
}
export interface DirectKafkaSource {
  Name: string;
  StreamingOptions?: KafkaStreamingSourceOptions;
  WindowSize?: number;
  DetectSchema?: boolean;
  DataPreviewOptions?: StreamingDataPreviewOptions;
}
export interface CatalogKinesisSource {
  Name: string;
  WindowSize?: number;
  DetectSchema?: boolean;
  Table: string;
  Database: string;
  StreamingOptions?: KinesisStreamingSourceOptions;
  DataPreviewOptions?: StreamingDataPreviewOptions;
}
export interface CatalogKafkaSource {
  Name: string;
  WindowSize?: number;
  DetectSchema?: boolean;
  Table: string;
  Database: string;
  StreamingOptions?: KafkaStreamingSourceOptions;
  DataPreviewOptions?: StreamingDataPreviewOptions;
}
export interface NullCheckBoxList {
  IsEmpty?: boolean;
  IsNullString?: boolean;
  IsNegOne?: boolean;
}
export type GenericLimitedString = string;
export interface Datatype {
  Id: string;
  Label: string;
}
export interface NullValueField {
  Value: string;
  Datatype: Datatype;
}
export type NullValueFields = NullValueField[];
export interface DropNullFields {
  Name: string;
  Inputs: string[];
  NullCheckBoxList?: NullCheckBoxList;
  NullTextList?: NullValueField[];
}
export interface Merge {
  Name: string;
  Inputs: string[];
  Source: string;
  PrimaryKeys: string[][];
}
export type UnionType = "ALL" | "DISTINCT" | (string & {});
export interface Union {
  Name: string;
  Inputs: string[];
  UnionType: UnionType;
}
export type PiiType =
  | "RowAudit"
  | "RowHashing"
  | "RowMasking"
  | "RowPartialMasking"
  | "ColumnAudit"
  | "ColumnHashing"
  | "ColumnMasking"
  | (string & {});
export type BoxedDoubleFraction = number;
export type MaskValue = string;
export interface PIIDetection {
  Name: string;
  Inputs: string[];
  PiiType: PiiType;
  EntityTypesToDetect: string[];
  OutputColumnName?: string;
  SampleFraction?: number;
  ThresholdFraction?: number;
  MaskValue?: string;
  RedactText?: string;
  RedactChar?: string;
  MatchPattern?: string;
  NumLeftCharsToExclude?: number;
  NumRightCharsToExclude?: number;
  DetectionParameters?: string;
  DetectionSensitivity?: string;
}
export type AggFunction =
  | "avg"
  | "countDistinct"
  | "count"
  | "first"
  | "last"
  | "kurtosis"
  | "max"
  | "min"
  | "skewness"
  | "stddev_samp"
  | "stddev_pop"
  | "sum"
  | "sumDistinct"
  | "var_samp"
  | "var_pop"
  | (string & {});
export interface AggregateOperation {
  Column: string[];
  AggFunc: AggFunction;
}
export type AggregateOperations = AggregateOperation[];
export interface Aggregate {
  Name: string;
  Inputs: string[];
  Groups: string[][];
  Aggs: AggregateOperation[];
}
export type LimitedStringList = string[];
export type LimitedPathList = string[][];
export interface DropDuplicates {
  Name: string;
  Inputs: string[];
  Columns?: string[][];
}
export interface GovernedCatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Table: string;
  Database: string;
  SchemaChangePolicy?: CatalogSchemaChangePolicy;
}
export interface GovernedCatalogSource {
  Name: string;
  Database: string;
  Table: string;
  PartitionPredicate?: string;
  AdditionalOptions?: S3SourceAdditionalOptions;
}
export interface MicrosoftSQLServerCatalogSource {
  Name: string;
  Database: string;
  Table: string;
}
export interface MySQLCatalogSource {
  Name: string;
  Database: string;
  Table: string;
}
export interface OracleSQLCatalogSource {
  Name: string;
  Database: string;
  Table: string;
}
export interface PostgreSQLCatalogSource {
  Name: string;
  Database: string;
  Table: string;
}
export interface MicrosoftSQLServerCatalogTarget {
  Name: string;
  Inputs: string[];
  Database: string;
  Table: string;
}
export interface MySQLCatalogTarget {
  Name: string;
  Inputs: string[];
  Database: string;
  Table: string;
}
export interface OracleSQLCatalogTarget {
  Name: string;
  Inputs: string[];
  Database: string;
  Table: string;
}
export interface PostgreSQLCatalogTarget {
  Name: string;
  Inputs: string[];
  Database: string;
  Table: string;
}
export interface GroupFilters {
  GroupName: string;
  Filters: FilterExpression[];
  LogicalOperator: FilterLogicalOperator;
}
export type GroupFiltersList = GroupFilters[];
export interface Route {
  Name: string;
  Inputs: string[];
  GroupFiltersList: GroupFilters[];
}
export type ParamType =
  | "str"
  | "int"
  | "float"
  | "complex"
  | "bool"
  | "list"
  | "null"
  | (string & {});
export interface TransformConfigParameter {
  Name: string;
  Type: ParamType;
  ValidationRule?: string;
  ValidationMessage?: string;
  Value?: string[];
  ListType?: ParamType;
  IsOptional?: boolean;
}
export type TransformConfigParameterList = TransformConfigParameter[];
export interface DynamicTransform {
  Name: string;
  TransformName: string;
  Inputs: string[];
  Parameters?: TransformConfigParameter[];
  FunctionName: string;
  Path: string;
  Version?: string;
  OutputSchemas?: GlueSchema[];
}
export type DQDLString = string;
export type DQTransformOutput =
  | "PrimaryInput"
  | "EvaluationResults"
  | (string & {});
export interface DQResultsPublishingOptions {
  EvaluationContext?: string;
  ResultsS3Prefix?: string;
  CloudWatchMetricsEnabled?: boolean;
  ResultsPublishingEnabled?: boolean;
}
export type DQStopJobOnFailureTiming =
  | "Immediate"
  | "AfterDataLoad"
  | (string & {});
export interface DQStopJobOnFailureOptions {
  StopJobOnFailureTiming?: DQStopJobOnFailureTiming;
}
export interface EvaluateDataQuality {
  Name: string;
  Inputs: string[];
  Ruleset: string;
  Output?: DQTransformOutput;
  PublishingOptions?: DQResultsPublishingOptions;
  StopJobOnFailureOptions?: DQStopJobOnFailureOptions;
}
export interface S3CatalogHudiSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalHudiOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export interface CatalogHudiSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalHudiOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export interface S3HudiSource {
  Name: string;
  Paths: string[];
  AdditionalHudiOptions?: { [key: string]: string | undefined };
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  OutputSchemas?: GlueSchema[];
}
export interface S3HudiCatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Table: string;
  Database: string;
  AdditionalOptions: { [key: string]: string | undefined };
  SchemaChangePolicy?: CatalogSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
  OutputSchemas?: GlueSchema[];
}
export type HudiTargetCompressionType =
  | "gzip"
  | "lzo"
  | "uncompressed"
  | "snappy"
  | (string & {});
export interface S3HudiDirectTarget {
  Name: string;
  Inputs: string[];
  Path: string;
  Compression: HudiTargetCompressionType;
  NumberTargetPartitions?: string;
  PartitionKeys?: string[][];
  Format: TargetFormat;
  AdditionalOptions: { [key: string]: string | undefined };
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
}
export type JDBCConnectionType =
  | "sqlserver"
  | "mysql"
  | "oracle"
  | "postgresql"
  | "redshift"
  | (string & {});
export interface DirectJDBCSource {
  Name: string;
  Database: string;
  Table: string;
  ConnectionName: string;
  ConnectionType: JDBCConnectionType;
  RedshiftTmpDir?: string;
  OutputSchemas?: GlueSchema[];
}
export interface S3CatalogDeltaSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalDeltaOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export interface CatalogDeltaSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalDeltaOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export interface S3DeltaSource {
  Name: string;
  Paths: string[];
  AdditionalDeltaOptions?: { [key: string]: string | undefined };
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  OutputSchemas?: GlueSchema[];
}
export interface S3DeltaCatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Table: string;
  Database: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  SchemaChangePolicy?: CatalogSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
  OutputSchemas?: GlueSchema[];
}
export type DeltaTargetCompressionType =
  | "uncompressed"
  | "snappy"
  | (string & {});
export interface S3DeltaDirectTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Path: string;
  Compression: DeltaTargetCompressionType;
  NumberTargetPartitions?: string;
  Format: TargetFormat;
  AdditionalOptions?: { [key: string]: string | undefined };
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
}
export interface Option {
  Value?: string;
  Label?: string;
  Description?: string;
}
export interface AmazonRedshiftAdvancedOption {
  Key?: string;
  Value?: string;
}
export type AmazonRedshiftAdvancedOptions = AmazonRedshiftAdvancedOption[];
export type OptionList = Option[];
export interface AmazonRedshiftNodeData {
  AccessType?: string;
  SourceType?: string;
  Connection?: Option;
  Schema?: Option;
  Table?: Option;
  CatalogDatabase?: Option;
  CatalogTable?: Option;
  CatalogRedshiftSchema?: string;
  CatalogRedshiftTable?: string;
  TempDir?: string;
  IamRole?: Option;
  AdvancedOptions?: AmazonRedshiftAdvancedOption[];
  SampleQuery?: string;
  PreAction?: string;
  PostAction?: string;
  Action?: string;
  TablePrefix?: string;
  Upsert?: boolean;
  MergeAction?: string;
  MergeWhenMatched?: string;
  MergeWhenNotMatched?: string;
  MergeClause?: string;
  CrawlerConnection?: string;
  TableSchema?: Option[];
  StagingTable?: string;
  SelectedColumns?: Option[];
}
export interface AmazonRedshiftSource {
  Name?: string;
  Data?: AmazonRedshiftNodeData;
}
export interface AmazonRedshiftTarget {
  Name?: string;
  Data?: AmazonRedshiftNodeData;
  Inputs?: string[];
}
export type DQDLAliases = { [key: string]: string | undefined };
export type AdditionalOptionKeys =
  | "performanceTuning.caching"
  | "observations.scope"
  | "compositeRuleEvaluation.method"
  | (string & {});
export type DQAdditionalOptions = { [key in AdditionalOptionKeys]?: string };
export interface EvaluateDataQualityMultiFrame {
  Name: string;
  Inputs: string[];
  AdditionalDataSources?: { [key: string]: string | undefined };
  Ruleset: string;
  PublishingOptions?: DQResultsPublishingOptions;
  AdditionalOptions?: { [key: string]: string | undefined };
  StopJobOnFailureOptions?: DQStopJobOnFailureOptions;
}
export type RecipeVersion = string;
export interface RecipeReference {
  RecipeArn: string;
  RecipeVersion: string;
}
export type Operation = string;
export type ParameterName = string;
export type ParameterValue = string;
export type ParameterMap = { [key: string]: string | undefined };
export interface RecipeAction {
  Operation: string;
  Parameters?: { [key: string]: string | undefined };
}
export type DatabrewCondition = string;
export type DatabrewConditionValue = string;
export type TargetColumn = string;
export interface ConditionExpression {
  Condition: string;
  Value?: string;
  TargetColumn: string;
}
export type ConditionExpressionList = ConditionExpression[];
export interface RecipeStep {
  Action: RecipeAction;
  ConditionExpressions?: ConditionExpression[];
}
export type RecipeSteps = RecipeStep[];
export interface Recipe {
  Name: string;
  Inputs: string[];
  RecipeReference?: RecipeReference;
  RecipeSteps?: RecipeStep[];
}
export interface SnowflakeNodeData {
  SourceType?: string;
  Connection?: Option;
  Schema?: string;
  Table?: string;
  Database?: string;
  TempDir?: string;
  IamRole?: Option;
  AdditionalOptions?: { [key: string]: string | undefined };
  SampleQuery?: string;
  PreAction?: string;
  PostAction?: string;
  Action?: string;
  Upsert?: boolean;
  MergeAction?: string;
  MergeWhenMatched?: string;
  MergeWhenNotMatched?: string;
  MergeClause?: string;
  StagingTable?: string;
  SelectedColumns?: Option[];
  AutoPushdown?: boolean;
  TableSchema?: Option[];
}
export interface SnowflakeSource {
  Name: string;
  Data: SnowflakeNodeData;
  OutputSchemas?: GlueSchema[];
}
export interface SnowflakeTarget {
  Name: string;
  Data: SnowflakeNodeData;
  Inputs?: string[];
}
export type ConnectorOptions = { [key: string]: string | undefined };
export interface ConnectorDataSource {
  Name: string;
  ConnectionType: string;
  Data: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export interface ConnectorDataTarget {
  Name: string;
  ConnectionType: string;
  Data: { [key: string]: string | undefined };
  Inputs?: string[];
}
export interface S3CatalogIcebergSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalIcebergOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export interface CatalogIcebergSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalIcebergOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export interface S3IcebergCatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Table: string;
  Database: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  SchemaChangePolicy?: CatalogSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
}
export type IcebergTargetCompressionType =
  | "gzip"
  | "lzo"
  | "uncompressed"
  | "snappy"
  | (string & {});
export interface S3IcebergDirectTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Path: string;
  Format: TargetFormat;
  AdditionalOptions?: { [key: string]: string | undefined };
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
  Compression: IcebergTargetCompressionType;
  NumberTargetPartitions?: string;
  OutputSchemas?: GlueSchema[];
}
export interface S3ExcelSource {
  Name: string;
  Paths: string[];
  CompressionType?: ParquetCompressionType;
  Exclusions?: string[];
  GroupSize?: string;
  GroupFiles?: string;
  Recurse?: boolean;
  MaxBand?: number;
  MaxFilesInBand?: number;
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  NumberRows?: number;
  SkipFooter?: number;
  OutputSchemas?: GlueSchema[];
}
export type HyperTargetCompressionType = "uncompressed" | (string & {});
export interface S3HyperDirectTarget {
  Name: string;
  Inputs: string[];
  Format?: TargetFormat;
  PartitionKeys?: string[][];
  Path: string;
  Compression?: HyperTargetCompressionType;
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
  OutputSchemas?: GlueSchema[];
}
export type DdbExportType = "ddb" | "s3" | (string & {});
export interface DDBELTConnectionOptions {
  DynamodbExport?: DdbExportType;
  DynamodbUnnestDDBJson?: boolean;
  DynamodbTableArn: string;
  DynamodbS3Bucket?: string;
  DynamodbS3Prefix?: string;
  DynamodbS3BucketOwner?: string;
  DynamodbStsRoleArn?: string;
}
export interface DynamoDBELTConnectorSource {
  Name: string;
  ConnectionOptions?: DDBELTConnectionOptions;
  OutputSchemas?: GlueSchema[];
}
export interface CodeGenConfigurationNode {
  AthenaConnectorSource?: AthenaConnectorSource;
  JDBCConnectorSource?: JDBCConnectorSource;
  SparkConnectorSource?: SparkConnectorSource;
  CatalogSource?: CatalogSource;
  RedshiftSource?: RedshiftSource;
  S3CatalogSource?: S3CatalogSource;
  S3CsvSource?: S3CsvSource;
  S3JsonSource?: S3JsonSource;
  S3ParquetSource?: S3ParquetSource;
  RelationalCatalogSource?: RelationalCatalogSource;
  DynamoDBCatalogSource?: DynamoDBCatalogSource;
  JDBCConnectorTarget?: JDBCConnectorTarget;
  SparkConnectorTarget?: SparkConnectorTarget;
  CatalogTarget?: BasicCatalogTarget;
  RedshiftTarget?: RedshiftTarget;
  S3CatalogTarget?: S3CatalogTarget;
  S3GlueParquetTarget?: S3GlueParquetTarget;
  S3DirectTarget?: S3DirectTarget;
  ApplyMapping?: ApplyMapping;
  SelectFields?: SelectFields;
  DropFields?: DropFields;
  RenameField?: RenameField;
  Spigot?: Spigot;
  Join?: Join;
  SplitFields?: SplitFields;
  SelectFromCollection?: SelectFromCollection;
  FillMissingValues?: FillMissingValues;
  Filter?: Filter;
  CustomCode?: CustomCode;
  SparkSQL?: SparkSQL;
  DirectKinesisSource?: DirectKinesisSource;
  DirectKafkaSource?: DirectKafkaSource;
  CatalogKinesisSource?: CatalogKinesisSource;
  CatalogKafkaSource?: CatalogKafkaSource;
  DropNullFields?: DropNullFields;
  Merge?: Merge;
  Union?: Union;
  PIIDetection?: PIIDetection;
  Aggregate?: Aggregate;
  DropDuplicates?: DropDuplicates;
  GovernedCatalogTarget?: GovernedCatalogTarget;
  GovernedCatalogSource?: GovernedCatalogSource;
  MicrosoftSQLServerCatalogSource?: MicrosoftSQLServerCatalogSource;
  MySQLCatalogSource?: MySQLCatalogSource;
  OracleSQLCatalogSource?: OracleSQLCatalogSource;
  PostgreSQLCatalogSource?: PostgreSQLCatalogSource;
  MicrosoftSQLServerCatalogTarget?: MicrosoftSQLServerCatalogTarget;
  MySQLCatalogTarget?: MySQLCatalogTarget;
  OracleSQLCatalogTarget?: OracleSQLCatalogTarget;
  PostgreSQLCatalogTarget?: PostgreSQLCatalogTarget;
  Route?: Route;
  DynamicTransform?: DynamicTransform;
  EvaluateDataQuality?: EvaluateDataQuality;
  S3CatalogHudiSource?: S3CatalogHudiSource;
  CatalogHudiSource?: CatalogHudiSource;
  S3HudiSource?: S3HudiSource;
  S3HudiCatalogTarget?: S3HudiCatalogTarget;
  S3HudiDirectTarget?: S3HudiDirectTarget;
  DirectJDBCSource?: DirectJDBCSource;
  S3CatalogDeltaSource?: S3CatalogDeltaSource;
  CatalogDeltaSource?: CatalogDeltaSource;
  S3DeltaSource?: S3DeltaSource;
  S3DeltaCatalogTarget?: S3DeltaCatalogTarget;
  S3DeltaDirectTarget?: S3DeltaDirectTarget;
  AmazonRedshiftSource?: AmazonRedshiftSource;
  AmazonRedshiftTarget?: AmazonRedshiftTarget;
  EvaluateDataQualityMultiFrame?: EvaluateDataQualityMultiFrame;
  Recipe?: Recipe;
  SnowflakeSource?: SnowflakeSource;
  SnowflakeTarget?: SnowflakeTarget;
  ConnectorDataSource?: ConnectorDataSource;
  ConnectorDataTarget?: ConnectorDataTarget;
  S3CatalogIcebergSource?: S3CatalogIcebergSource;
  CatalogIcebergSource?: CatalogIcebergSource;
  S3IcebergCatalogTarget?: S3IcebergCatalogTarget;
  S3IcebergDirectTarget?: S3IcebergDirectTarget;
  S3ExcelSource?: S3ExcelSource;
  S3HyperDirectTarget?: S3HyperDirectTarget;
  DynamoDBELTConnectorSource?: DynamoDBELTConnectorSource;
}
export type CodeGenConfigurationNodes = {
  [key: string]: CodeGenConfigurationNode | undefined;
};
export type ExecutionClass = "FLEX" | "STANDARD" | (string & {});
export type SourceControlProvider =
  | "GITHUB"
  | "GITLAB"
  | "BITBUCKET"
  | "AWS_CODE_COMMIT"
  | (string & {});
export type SourceControlAuthStrategy =
  | "PERSONAL_ACCESS_TOKEN"
  | "AWS_SECRETS_MANAGER"
  | (string & {});
export interface SourceControlDetails {
  Provider?: SourceControlProvider;
  Repository?: string;
  Owner?: string;
  Branch?: string;
  Folder?: string;
  LastCommitId?: string;
  AuthStrategy?: SourceControlAuthStrategy;
  AuthToken?: string;
}
export type MaintenanceWindow = string;
export interface Job {
  Name?: string;
  JobMode?: JobMode;
  JobRunQueuingEnabled?: boolean;
  Description?: string;
  LogUri?: string;
  Role?: string;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  ExecutionProperty?: ExecutionProperty;
  Command?: JobCommand;
  DefaultArguments?: { [key: string]: string | undefined };
  NonOverridableArguments?: { [key: string]: string | undefined };
  Connections?: ConnectionsList;
  MaxRetries?: number;
  AllocatedCapacity?: number;
  Timeout?: number;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  SecurityConfiguration?: string;
  NotificationProperty?: NotificationProperty;
  GlueVersion?: string;
  CodeGenConfigurationNodes?: {
    [key: string]: CodeGenConfigurationNode | undefined;
  };
  ExecutionClass?: ExecutionClass;
  SourceControlDetails?: SourceControlDetails;
  MaintenanceWindow?: string;
  ProfileName?: string;
}
export type JobList = Job[];
export interface BatchGetJobsResponse {
  Jobs?: Job[];
  JobsNotFound?: string[];
}
export type BatchGetPartitionValueList = PartitionValueList[];
export type AuditContextString = string;
export type ColumnNameString = string;
export type AuditColumnNamesList = string[];
export interface AuditContext {
  AdditionalAuditContext?: string;
  RequestedColumns?: string[];
  AllColumnsRequested?: boolean;
}
export type NullableString = string;
export type ContextKey = string;
export type ContextValue = string;
export type AdditionalContextMap = { [key: string]: string | undefined };
export interface QuerySessionContext {
  QueryId?: string;
  QueryStartTime?: Date;
  ClusterId?: string;
  QueryAuthorizationId?: string;
  AdditionalContext?: { [key: string]: string | undefined };
}
export interface BatchGetPartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionsToGet: PartitionValueList[];
  AuditContext?: AuditContext;
  QuerySessionContext?: QuerySessionContext;
}
export interface Partition {
  Values?: string[];
  DatabaseName?: string;
  TableName?: string;
  CreationTime?: Date;
  LastAccessTime?: Date;
  StorageDescriptor?: StorageDescriptor;
  Parameters?: { [key: string]: string | undefined };
  LastAnalyzedTime?: Date;
  CatalogId?: string;
}
export type PartitionList = Partition[];
export interface BatchGetPartitionResponse {
  Partitions?: Partition[];
  UnprocessedKeys?: PartitionValueList[];
}
export type DatabaseNameString = string;
export type TableNameString = string;
export type TableOptimizerType =
  | "compaction"
  | "retention"
  | "orphan_file_deletion"
  | (string & {});
export interface BatchGetTableOptimizerEntry {
  catalogId?: string;
  databaseName?: string;
  tableName?: string;
  type?: TableOptimizerType;
}
export type BatchGetTableOptimizerEntries = BatchGetTableOptimizerEntry[];
export interface BatchGetTableOptimizerRequest {
  Entries: BatchGetTableOptimizerEntry[];
}
export type ArnString = string;
export type GlueConnectionNameString = string;
export type TableOptimizerVpcConfiguration = { glueConnectionName: string };
export type CompactionStrategy = "binpack" | "sort" | "z-order" | (string & {});
export interface IcebergCompactionConfiguration {
  strategy?: CompactionStrategy;
  minInputFiles?: number;
  deleteFileThreshold?: number;
}
export interface CompactionConfiguration {
  icebergConfiguration?: IcebergCompactionConfiguration;
}
export interface IcebergRetentionConfiguration {
  snapshotRetentionPeriodInDays?: number;
  numberOfSnapshotsToRetain?: number;
  cleanExpiredFiles?: boolean;
  runRateInHours?: number;
}
export interface RetentionConfiguration {
  icebergConfiguration?: IcebergRetentionConfiguration;
}
export type MessageString = string;
export interface IcebergOrphanFileDeletionConfiguration {
  orphanFileRetentionPeriodInDays?: number;
  location?: string;
  runRateInHours?: number;
}
export interface OrphanFileDeletionConfiguration {
  icebergConfiguration?: IcebergOrphanFileDeletionConfiguration;
}
export interface TableOptimizerConfiguration {
  roleArn?: string;
  enabled?: boolean;
  vpcConfiguration?: TableOptimizerVpcConfiguration;
  compactionConfiguration?: CompactionConfiguration;
  retentionConfiguration?: RetentionConfiguration;
  orphanFileDeletionConfiguration?: OrphanFileDeletionConfiguration;
}
export type TableOptimizerEventType =
  | "starting"
  | "completed"
  | "failed"
  | "in_progress"
  | (string & {});
export type TableOptimizerRunTimestamp = Date;
export interface RunMetrics {
  NumberOfBytesCompacted?: string;
  NumberOfFilesCompacted?: string;
  NumberOfDpus?: string;
  JobDurationInHour?: string;
}
export type MetricCounts = number;
export type DpuHours = number;
export type DpuCounts = number;
export type DpuDurationInHour = number;
export interface IcebergCompactionMetrics {
  NumberOfBytesCompacted?: number;
  NumberOfFilesCompacted?: number;
  DpuHours?: number;
  NumberOfDpus?: number;
  JobDurationInHour?: number;
}
export interface CompactionMetrics {
  IcebergMetrics?: IcebergCompactionMetrics;
}
export interface IcebergRetentionMetrics {
  NumberOfDataFilesDeleted?: number;
  NumberOfManifestFilesDeleted?: number;
  NumberOfManifestListsDeleted?: number;
  DpuHours?: number;
  NumberOfDpus?: number;
  JobDurationInHour?: number;
}
export interface RetentionMetrics {
  IcebergMetrics?: IcebergRetentionMetrics;
}
export interface IcebergOrphanFileDeletionMetrics {
  NumberOfOrphanFilesDeleted?: number;
  DpuHours?: number;
  NumberOfDpus?: number;
  JobDurationInHour?: number;
}
export interface OrphanFileDeletionMetrics {
  IcebergMetrics?: IcebergOrphanFileDeletionMetrics;
}
export interface TableOptimizerRun {
  eventType?: TableOptimizerEventType;
  startTimestamp?: Date;
  endTimestamp?: Date;
  metrics?: RunMetrics;
  error?: string;
  compactionMetrics?: CompactionMetrics;
  compactionStrategy?: CompactionStrategy;
  retentionMetrics?: RetentionMetrics;
  orphanFileDeletionMetrics?: OrphanFileDeletionMetrics;
}
export type ConfigurationSource = "catalog" | "table" | (string & {});
export interface TableOptimizer {
  type?: TableOptimizerType;
  configuration?: TableOptimizerConfiguration;
  lastRun?: TableOptimizerRun;
  configurationSource?: ConfigurationSource;
}
export interface BatchTableOptimizer {
  catalogId?: string;
  databaseName?: string;
  tableName?: string;
  tableOptimizer?: TableOptimizer;
}
export type BatchTableOptimizers = BatchTableOptimizer[];
export interface BatchGetTableOptimizerError_ {
  error?: ErrorDetail;
  catalogId?: string;
  databaseName?: string;
  tableName?: string;
  type?: TableOptimizerType;
}
export type BatchGetTableOptimizerErrors = BatchGetTableOptimizerError_[];
export interface BatchGetTableOptimizerResponse {
  TableOptimizers?: BatchTableOptimizer[];
  Failures?: BatchGetTableOptimizerError_[];
}
export type TriggerNameList = string[];
export interface BatchGetTriggersRequest {
  TriggerNames: string[];
}
export type IdString = string;
export type TriggerType =
  | "SCHEDULED"
  | "CONDITIONAL"
  | "ON_DEMAND"
  | "EVENT"
  | (string & {});
export type TriggerState =
  | "CREATING"
  | "CREATED"
  | "ACTIVATING"
  | "ACTIVATED"
  | "DEACTIVATING"
  | "DEACTIVATED"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export interface Action {
  JobName?: string;
  Arguments?: { [key: string]: string | undefined };
  Timeout?: number;
  SecurityConfiguration?: string;
  NotificationProperty?: NotificationProperty;
  CrawlerName?: string;
}
export type ActionList = Action[];
export type Logical = "AND" | "ANY" | (string & {});
export type LogicalOperator = "EQUALS" | (string & {});
export type JobRunState =
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMEOUT"
  | "ERROR"
  | "WAITING"
  | "EXPIRED"
  | (string & {});
export type CrawlState =
  | "RUNNING"
  | "CANCELLING"
  | "CANCELLED"
  | "SUCCEEDED"
  | "FAILED"
  | "ERROR"
  | (string & {});
export interface Condition {
  LogicalOperator?: LogicalOperator;
  JobName?: string;
  State?: JobRunState;
  CrawlerName?: string;
  CrawlState?: CrawlState;
}
export type ConditionList = Condition[];
export interface Predicate {
  Logical?: Logical;
  Conditions?: Condition[];
}
export type BatchSize = number;
export type BatchWindow = number;
export interface EventBatchingCondition {
  BatchSize: number;
  BatchWindow?: number;
}
export interface Trigger {
  Name?: string;
  WorkflowName?: string;
  Id?: string;
  Type?: TriggerType;
  State?: TriggerState;
  Description?: string;
  Schedule?: string;
  Actions?: Action[];
  Predicate?: Predicate;
  EventBatchingCondition?: EventBatchingCondition;
}
export type TriggerList = Trigger[];
export interface BatchGetTriggersResponse {
  Triggers?: Trigger[];
  TriggersNotFound?: string[];
}
export type WorkflowNames = string[];
export interface BatchGetWorkflowsRequest {
  Names: string[];
  IncludeGraph?: boolean;
}
export type WorkflowRunProperties = { [key: string]: string | undefined };
export type WorkflowRunStatus =
  | "RUNNING"
  | "COMPLETED"
  | "STOPPING"
  | "STOPPED"
  | "ERROR"
  | (string & {});
export interface WorkflowRunStatistics {
  TotalActions?: number;
  TimeoutActions?: number;
  FailedActions?: number;
  StoppedActions?: number;
  SucceededActions?: number;
  RunningActions?: number;
  ErroredActions?: number;
  WaitingActions?: number;
}
export type NodeType = "CRAWLER" | "JOB" | "TRIGGER" | (string & {});
export interface TriggerNodeDetails {
  Trigger?: Trigger;
}
export type AttemptCount = number;
export interface Predecessor {
  JobName?: string;
  RunId?: string;
}
export type PredecessorList = Predecessor[];
export type OrchestrationMessageString = string;
export type OrchestrationPolicyJsonString = string;
export interface JobRun {
  Id?: string;
  Attempt?: number;
  PreviousRunId?: string;
  TriggerName?: string;
  JobName?: string;
  JobMode?: JobMode;
  JobRunQueuingEnabled?: boolean;
  StartedOn?: Date;
  LastModifiedOn?: Date;
  CompletedOn?: Date;
  JobRunState?: JobRunState;
  Arguments?: { [key: string]: string | undefined };
  ErrorMessage?: string;
  PredecessorRuns?: Predecessor[];
  AllocatedCapacity?: number;
  ExecutionTime?: number;
  Timeout?: number;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  SecurityConfiguration?: string;
  LogGroupName?: string;
  NotificationProperty?: NotificationProperty;
  GlueVersion?: string;
  DPUSeconds?: number;
  ExecutionClass?: ExecutionClass;
  MaintenanceWindow?: string;
  ProfileName?: string;
  StateDetail?: string;
  ExecutionRoleSessionPolicy?: string;
}
export type JobRunList = JobRun[];
export interface JobNodeDetails {
  JobRuns?: JobRun[];
}
export interface Crawl {
  State?: CrawlState;
  StartedOn?: Date;
  CompletedOn?: Date;
  ErrorMessage?: string;
  LogGroup?: string;
  LogStream?: string;
}
export type CrawlList = Crawl[];
export interface CrawlerNodeDetails {
  Crawls?: Crawl[];
}
export interface Node {
  Type?: NodeType;
  Name?: string;
  UniqueId?: string;
  TriggerDetails?: TriggerNodeDetails;
  JobDetails?: JobNodeDetails;
  CrawlerDetails?: CrawlerNodeDetails;
}
export type NodeList = Node[];
export interface Edge {
  SourceId?: string;
  DestinationId?: string;
}
export type EdgeList = Edge[];
export interface WorkflowGraph {
  Nodes?: Node[];
  Edges?: Edge[];
}
export interface StartingEventBatchCondition {
  BatchSize?: number;
  BatchWindow?: number;
}
export interface WorkflowRun {
  Name?: string;
  WorkflowRunId?: string;
  PreviousRunId?: string;
  WorkflowRunProperties?: { [key: string]: string | undefined };
  StartedOn?: Date;
  CompletedOn?: Date;
  Status?: WorkflowRunStatus;
  ErrorMessage?: string;
  Statistics?: WorkflowRunStatistics;
  Graph?: WorkflowGraph;
  StartingEventBatchCondition?: StartingEventBatchCondition;
}
export interface BlueprintDetails {
  BlueprintName?: string;
  RunId?: string;
}
export interface Workflow {
  Name?: string;
  Description?: string;
  DefaultRunProperties?: { [key: string]: string | undefined };
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  LastRun?: WorkflowRun;
  Graph?: WorkflowGraph;
  MaxConcurrentRuns?: number;
  BlueprintDetails?: BlueprintDetails;
}
export type Workflows = Workflow[];
export interface BatchGetWorkflowsResponse {
  Workflows?: Workflow[];
  MissingWorkflows?: string[];
}
export type InclusionAnnotationValue = "INCLUDE" | "EXCLUDE" | (string & {});
export interface DatapointInclusionAnnotation {
  ProfileId?: string;
  StatisticId?: string;
  InclusionAnnotation?: InclusionAnnotationValue;
}
export type InclusionAnnotationList = DatapointInclusionAnnotation[];
export interface BatchPutDataQualityStatisticAnnotationRequest {
  InclusionAnnotations: DatapointInclusionAnnotation[];
  ClientToken?: string;
}
export interface AnnotationError {
  ProfileId?: string;
  StatisticId?: string;
  FailureReason?: string;
}
export type AnnotationErrorList = AnnotationError[];
export interface BatchPutDataQualityStatisticAnnotationResponse {
  FailedInclusionAnnotations?: AnnotationError[];
}
export type BatchStopJobRunJobRunIdList = string[];
export interface BatchStopJobRunRequest {
  JobName: string;
  JobRunIds: string[];
}
export interface BatchStopJobRunSuccessfulSubmission {
  JobName?: string;
  JobRunId?: string;
}
export type BatchStopJobRunSuccessfulSubmissionList =
  BatchStopJobRunSuccessfulSubmission[];
export interface BatchStopJobRunError_ {
  JobName?: string;
  JobRunId?: string;
  ErrorDetail?: ErrorDetail;
}
export type BatchStopJobRunErrorList = BatchStopJobRunError_[];
export interface BatchStopJobRunResponse {
  SuccessfulSubmissions?: BatchStopJobRunSuccessfulSubmission[];
  Errors?: BatchStopJobRunError_[];
}
export type BoundedPartitionValueList = string[];
export interface BatchUpdatePartitionRequestEntry {
  PartitionValueList: string[];
  PartitionInput: PartitionInput;
}
export type BatchUpdatePartitionRequestEntryList =
  BatchUpdatePartitionRequestEntry[];
export interface BatchUpdatePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  Entries: BatchUpdatePartitionRequestEntry[];
}
export interface BatchUpdatePartitionFailureEntry {
  PartitionValueList?: string[];
  ErrorDetail?: ErrorDetail;
}
export type BatchUpdatePartitionFailureList =
  BatchUpdatePartitionFailureEntry[];
export interface BatchUpdatePartitionResponse {
  Errors?: BatchUpdatePartitionFailureEntry[];
}
export interface CancelDataQualityRuleRecommendationRunRequest {
  RunId: string;
}
export interface CancelDataQualityRuleRecommendationRunResponse {}
export interface CancelDataQualityRulesetEvaluationRunRequest {
  RunId: string;
}
export interface CancelDataQualityRulesetEvaluationRunResponse {}
export interface CancelMLTaskRunRequest {
  TransformId: string;
  TaskRunId: string;
}
export interface CancelMLTaskRunResponse {
  TransformId?: string;
  TaskRunId?: string;
  Status?: TaskStatusType;
}
export interface CancelStatementRequest {
  SessionId: string;
  Id: number;
  RequestOrigin?: string;
}
export interface CancelStatementResponse {}
export type DataFormat = "AVRO" | "JSON" | "PROTOBUF" | (string & {});
export type SchemaDefinitionString = string;
export interface CheckSchemaVersionValidityInput {
  DataFormat: DataFormat;
  SchemaDefinition: string;
}
export type IsVersionValid = boolean;
export type SchemaValidationError = string;
export interface CheckSchemaVersionValidityResponse {
  Valid?: boolean;
  Error?: string;
}
export type OrchestrationS3Location = string;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export interface CreateBlueprintRequest {
  Name: string;
  Description?: string;
  BlueprintLocation: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateBlueprintResponse {
  Name?: string;
}
export type CatalogNameString = string;
export type FederationIdentifier = string;
export interface FederatedCatalog {
  Identifier?: string;
  ConnectionName?: string;
  ConnectionType?: string;
}
export type ResourceArnString = string;
export interface TargetRedshiftCatalog {
  CatalogArn: string;
}
export type IAMRoleArn = string;
export interface DataLakeAccessProperties {
  DataLakeAccess?: boolean;
  DataTransferRole?: string;
  KmsKey?: string;
  CatalogType?: string;
}
export interface IcebergOptimizationProperties {
  RoleArn?: string;
  Compaction?: { [key: string]: string | undefined };
  Retention?: { [key: string]: string | undefined };
  OrphanFileDeletion?: { [key: string]: string | undefined };
}
export interface CatalogProperties {
  DataLakeAccessProperties?: DataLakeAccessProperties;
  IcebergOptimizationProperties?: IcebergOptimizationProperties;
  CustomProperties?: { [key: string]: string | undefined };
}
export type DataLakePrincipalString = string;
export interface DataLakePrincipal {
  DataLakePrincipalIdentifier?: string;
}
export type Permission =
  | "ALL"
  | "SELECT"
  | "ALTER"
  | "DROP"
  | "DELETE"
  | "INSERT"
  | "CREATE_DATABASE"
  | "CREATE_TABLE"
  | "DATA_LOCATION_ACCESS"
  | (string & {});
export type PermissionList = Permission[];
export interface PrincipalPermissions {
  Principal?: DataLakePrincipal;
  Permissions?: Permission[];
}
export type PrincipalPermissionsList = PrincipalPermissions[];
export type AllowFullTableExternalDataAccessEnum =
  | "True"
  | "False"
  | (string & {});
export type OverwriteChildResourcePermissionsWithDefaultEnum =
  | "Accept"
  | "Deny"
  | (string & {});
export interface CatalogInput {
  Description?: string;
  FederatedCatalog?: FederatedCatalog;
  Parameters?: { [key: string]: string | undefined };
  TargetRedshiftCatalog?: TargetRedshiftCatalog;
  CatalogProperties?: CatalogProperties;
  CreateTableDefaultPermissions?: PrincipalPermissions[];
  CreateDatabaseDefaultPermissions?: PrincipalPermissions[];
  AllowFullTableExternalDataAccess?: AllowFullTableExternalDataAccessEnum;
  OverwriteChildResourcePermissionsWithDefault?: OverwriteChildResourcePermissionsWithDefaultEnum;
}
export interface CreateCatalogRequest {
  Name: string;
  CatalogInput: CatalogInput;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateCatalogResponse {}
export type Classification = string;
export type GrokPattern = string;
export type CustomPatterns = string;
export interface CreateGrokClassifierRequest {
  Classification: string;
  Name: string;
  GrokPattern: string;
  CustomPatterns?: string;
}
export type RowTag = string;
export interface CreateXMLClassifierRequest {
  Classification: string;
  Name: string;
  RowTag?: string;
}
export type JsonPath = string;
export interface CreateJsonClassifierRequest {
  Name: string;
  JsonPath: string;
}
export type CsvColumnDelimiter = string;
export type CsvQuoteSymbol = string;
export type CsvHeaderOption = "UNKNOWN" | "PRESENT" | "ABSENT" | (string & {});
export type CsvHeader = string[];
export type CustomDatatypes = string[];
export type CsvSerdeOption =
  | "OpenCSVSerDe"
  | "LazySimpleSerDe"
  | "None"
  | (string & {});
export interface CreateCsvClassifierRequest {
  Name: string;
  Delimiter?: string;
  QuoteSymbol?: string;
  ContainsHeader?: CsvHeaderOption;
  Header?: string[];
  DisableValueTrimming?: boolean;
  AllowSingleColumn?: boolean;
  CustomDatatypeConfigured?: boolean;
  CustomDatatypes?: string[];
  Serde?: CsvSerdeOption;
}
export interface CreateClassifierRequest {
  GrokClassifier?: CreateGrokClassifierRequest;
  XMLClassifier?: CreateXMLClassifierRequest;
  JsonClassifier?: CreateJsonClassifierRequest;
  CsvClassifier?: CreateCsvClassifierRequest;
}
export interface CreateClassifierResponse {}
export type ColumnNameList = string[];
export type SampleSizePercentage = number;
export interface CreateColumnStatisticsTaskSettingsRequest {
  DatabaseName: string;
  TableName: string;
  Role: string;
  Schedule?: string;
  ColumnNameList?: string[];
  SampleSize?: number;
  CatalogID?: string;
  SecurityConfiguration?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateColumnStatisticsTaskSettingsResponse {}
export type ConnectionType =
  | "JDBC"
  | "SFTP"
  | "MONGODB"
  | "KAFKA"
  | "NETWORK"
  | "MARKETPLACE"
  | "CUSTOM"
  | "SALESFORCE"
  | "VIEW_VALIDATION_REDSHIFT"
  | "VIEW_VALIDATION_ATHENA"
  | "GOOGLEADS"
  | "GOOGLESHEETS"
  | "GOOGLEANALYTICS4"
  | "SERVICENOW"
  | "MARKETO"
  | "SAPODATA"
  | "ZENDESK"
  | "JIRACLOUD"
  | "NETSUITEERP"
  | "HUBSPOT"
  | "FACEBOOKADS"
  | "INSTAGRAMADS"
  | "ZOHOCRM"
  | "SALESFORCEPARDOT"
  | "SALESFORCEMARKETINGCLOUD"
  | "ADOBEANALYTICS"
  | "SLACK"
  | "LINKEDIN"
  | "MIXPANEL"
  | "ASANA"
  | "STRIPE"
  | "SMARTSHEET"
  | "DATADOG"
  | "WOOCOMMERCE"
  | "INTERCOM"
  | "SNAPCHATADS"
  | "PAYPAL"
  | "QUICKBOOKS"
  | "FACEBOOKPAGEINSIGHTS"
  | "FRESHDESK"
  | "TWILIO"
  | "DOCUSIGNMONITOR"
  | "FRESHSALES"
  | "ZOOM"
  | "GOOGLESEARCHCONSOLE"
  | "SALESFORCECOMMERCECLOUD"
  | "SAPCONCUR"
  | "DYNATRACE"
  | "MICROSOFTDYNAMIC365FINANCEANDOPS"
  | "MICROSOFTTEAMS"
  | "BLACKBAUDRAISEREDGENXT"
  | "MAILCHIMP"
  | "GITLAB"
  | "PENDO"
  | "PRODUCTBOARD"
  | "CIRCLECI"
  | "PIPEDIVE"
  | "SENDGRID"
  | "AZURECOSMOS"
  | "AZURESQL"
  | "BIGQUERY"
  | "BLACKBAUD"
  | "CLOUDERAHIVE"
  | "CLOUDERAIMPALA"
  | "CLOUDWATCH"
  | "CLOUDWATCHMETRICS"
  | "CMDB"
  | "DATALAKEGEN2"
  | "DB2"
  | "DB2AS400"
  | "DOCUMENTDB"
  | "DOMO"
  | "DYNAMODB"
  | "GOOGLECLOUDSTORAGE"
  | "HBASE"
  | "KUSTOMER"
  | "MICROSOFTDYNAMICS365CRM"
  | "MONDAY"
  | "MYSQL"
  | "OKTA"
  | "OPENSEARCH"
  | "ORACLE"
  | "PIPEDRIVE"
  | "POSTGRESQL"
  | "SAPHANA"
  | "SQLSERVER"
  | "SYNAPSE"
  | "TERADATA"
  | "TERADATANOS"
  | "TIMESTREAM"
  | "TPCDS"
  | "VERTICA"
  | (string & {});
export type MatchCriteria = string[];
export type ConnectionPropertyKey =
  | "HOST"
  | "PORT"
  | "USERNAME"
  | "PASSWORD"
  | "ENCRYPTED_PASSWORD"
  | "JDBC_DRIVER_JAR_URI"
  | "JDBC_DRIVER_CLASS_NAME"
  | "JDBC_ENGINE"
  | "JDBC_ENGINE_VERSION"
  | "CONFIG_FILES"
  | "INSTANCE_ID"
  | "JDBC_CONNECTION_URL"
  | "JDBC_ENFORCE_SSL"
  | "CUSTOM_JDBC_CERT"
  | "SKIP_CUSTOM_JDBC_CERT_VALIDATION"
  | "CUSTOM_JDBC_CERT_STRING"
  | "CONNECTION_URL"
  | "KAFKA_BOOTSTRAP_SERVERS"
  | "KAFKA_SSL_ENABLED"
  | "KAFKA_CUSTOM_CERT"
  | "KAFKA_SKIP_CUSTOM_CERT_VALIDATION"
  | "KAFKA_CLIENT_KEYSTORE"
  | "KAFKA_CLIENT_KEYSTORE_PASSWORD"
  | "KAFKA_CLIENT_KEY_PASSWORD"
  | "ENCRYPTED_KAFKA_CLIENT_KEYSTORE_PASSWORD"
  | "ENCRYPTED_KAFKA_CLIENT_KEY_PASSWORD"
  | "KAFKA_SASL_MECHANISM"
  | "KAFKA_SASL_PLAIN_USERNAME"
  | "KAFKA_SASL_PLAIN_PASSWORD"
  | "ENCRYPTED_KAFKA_SASL_PLAIN_PASSWORD"
  | "KAFKA_SASL_SCRAM_USERNAME"
  | "KAFKA_SASL_SCRAM_PASSWORD"
  | "KAFKA_SASL_SCRAM_SECRETS_ARN"
  | "ENCRYPTED_KAFKA_SASL_SCRAM_PASSWORD"
  | "KAFKA_SASL_GSSAPI_KEYTAB"
  | "KAFKA_SASL_GSSAPI_KRB5_CONF"
  | "KAFKA_SASL_GSSAPI_SERVICE"
  | "KAFKA_SASL_GSSAPI_PRINCIPAL"
  | "SECRET_ID"
  | "CONNECTOR_URL"
  | "CONNECTOR_TYPE"
  | "CONNECTOR_CLASS_NAME"
  | "ENDPOINT"
  | "ENDPOINT_TYPE"
  | "ROLE_ARN"
  | "REGION"
  | "WORKGROUP_NAME"
  | "CLUSTER_IDENTIFIER"
  | "DATABASE"
  | (string & {});
export type ConnectionProperties = { [key in ConnectionPropertyKey]?: string };
export type PropertyKey = string;
export type PropertyValue = string;
export type PropertyMap = { [key: string]: string | undefined };
export type SecurityGroupIdList = string[];
export interface PhysicalConnectionRequirements {
  SubnetId?: string;
  SecurityGroupIdList?: string[];
  AvailabilityZone?: string;
}
export type AuthenticationType =
  | "BASIC"
  | "OAUTH2"
  | "CUSTOM"
  | "IAM"
  | (string & {});
export type OAuth2GrantType =
  | "AUTHORIZATION_CODE"
  | "CLIENT_CREDENTIALS"
  | "JWT_BEARER"
  | (string & {});
export type UserManagedClientApplicationClientId = string;
export type AWSManagedClientApplicationReference = string;
export interface OAuth2ClientApplication {
  UserManagedClientApplicationClientId?: string;
  AWSManagedClientApplicationReference?: string;
}
export type TokenUrl = string;
export type TokenUrlParameterKey = string;
export type TokenUrlParameterValue = string;
export type TokenUrlParametersMap = { [key: string]: string | undefined };
export type AuthorizationCode = string | redacted.Redacted<string>;
export type RedirectUri = string;
export interface AuthorizationCodeProperties {
  AuthorizationCode?: string | redacted.Redacted<string>;
  RedirectUri?: string;
}
export type UserManagedClientApplicationClientSecret =
  | string
  | redacted.Redacted<string>;
export type AccessToken = string | redacted.Redacted<string>;
export type RefreshToken = string | redacted.Redacted<string>;
export type JwtToken = string | redacted.Redacted<string>;
export interface OAuth2Credentials {
  UserManagedClientApplicationClientSecret?: string | redacted.Redacted<string>;
  AccessToken?: string | redacted.Redacted<string>;
  RefreshToken?: string | redacted.Redacted<string>;
  JwtToken?: string | redacted.Redacted<string>;
}
export interface OAuth2PropertiesInput {
  OAuth2GrantType?: OAuth2GrantType;
  OAuth2ClientApplication?: OAuth2ClientApplication;
  TokenUrl?: string;
  TokenUrlParametersMap?: { [key: string]: string | undefined };
  AuthorizationCodeProperties?: AuthorizationCodeProperties;
  OAuth2Credentials?: OAuth2Credentials;
}
export type SecretArn = string;
export type KmsKeyArn = string;
export type Username = string;
export type Password = string | redacted.Redacted<string>;
export interface BasicAuthenticationCredentials {
  Username?: string;
  Password?: string | redacted.Redacted<string>;
}
export type CredentialKey = string;
export type CredentialValue = string;
export type CredentialMap = { [key: string]: string | undefined };
export interface AuthenticationConfigurationInput {
  AuthenticationType?: AuthenticationType;
  OAuth2Properties?: OAuth2PropertiesInput;
  SecretArn?: string;
  KmsKeyArn?: string;
  BasicAuthenticationCredentials?: BasicAuthenticationCredentials;
  CustomAuthenticationCredentials?: { [key: string]: string | undefined };
}
export type ComputeEnvironment = "SPARK" | "ATHENA" | "PYTHON" | (string & {});
export type ComputeEnvironmentList = ComputeEnvironment[];
export interface ConnectionInput {
  Name: string;
  Description?: string;
  ConnectionType: ConnectionType;
  MatchCriteria?: string[];
  ConnectionProperties: { [key: string]: string | undefined };
  SparkProperties?: { [key: string]: string | undefined };
  AthenaProperties?: { [key: string]: string | undefined };
  PythonProperties?: { [key: string]: string | undefined };
  PhysicalConnectionRequirements?: PhysicalConnectionRequirements;
  AuthenticationConfiguration?: AuthenticationConfigurationInput;
  ValidateCredentials?: boolean;
  ValidateForComputeEnvironments?: ComputeEnvironment[];
}
export interface CreateConnectionRequest {
  CatalogId?: string;
  ConnectionInput: ConnectionInput;
  Tags?: { [key: string]: string | undefined };
}
export type ConnectionStatus =
  | "READY"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export interface CreateConnectionResponse {
  CreateConnectionStatus?: ConnectionStatus;
}
export interface CreateCrawlerRequest {
  Name: string;
  Role: string;
  DatabaseName?: string;
  Description?: string;
  Targets: CrawlerTargets;
  Schedule?: string;
  Classifiers?: string[];
  TablePrefix?: string;
  SchemaChangePolicy?: SchemaChangePolicy;
  RecrawlPolicy?: RecrawlPolicy;
  LineageConfiguration?: LineageConfiguration;
  LakeFormationConfiguration?: LakeFormationConfiguration;
  Configuration?: string;
  CrawlerSecurityConfiguration?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateCrawlerResponse {}
export interface CreateCustomEntityTypeRequest {
  Name: string;
  RegexString: string;
  ContextWords?: string[];
  Tags?: { [key: string]: string | undefined };
}
export interface CreateCustomEntityTypeResponse {
  Name?: string;
}
export type URI = string;
export interface DatabaseIdentifier {
  CatalogId?: string;
  DatabaseName?: string;
  Region?: string;
}
export interface FederatedDatabase {
  Identifier?: string;
  ConnectionName?: string;
  ConnectionType?: string;
}
export interface DatabaseInput {
  Name: string;
  Description?: string;
  LocationUri?: string;
  Parameters?: { [key: string]: string | undefined };
  CreateTableDefaultPermissions?: PrincipalPermissions[];
  TargetDatabase?: DatabaseIdentifier;
  FederatedDatabase?: FederatedDatabase;
}
export interface CreateDatabaseRequest {
  CatalogId?: string;
  DatabaseInput: DatabaseInput;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateDatabaseResponse {}
export type DataQualityRulesetString = string;
export interface DataQualityTargetTable {
  TableName: string;
  DatabaseName: string;
  CatalogId?: string;
}
export interface CreateDataQualityRulesetRequest {
  Name: string;
  Description?: string;
  Ruleset: string;
  Tags?: { [key: string]: string | undefined };
  TargetTable?: DataQualityTargetTable;
  DataQualitySecurityConfiguration?: string;
  ClientToken?: string;
}
export interface CreateDataQualityRulesetResponse {
  Name?: string;
}
export interface CreateDevEndpointRequest {
  EndpointName: string;
  RoleArn: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
  PublicKey?: string;
  PublicKeys?: string[];
  NumberOfNodes?: number;
  WorkerType?: WorkerType;
  GlueVersion?: string;
  NumberOfWorkers?: number;
  ExtraPythonLibsS3Path?: string;
  ExtraJarsS3Path?: string;
  SecurityConfiguration?: string;
  Tags?: { [key: string]: string | undefined };
  Arguments?: { [key: string]: string | undefined };
}
export interface CreateDevEndpointResponse {
  EndpointName?: string;
  Status?: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
  RoleArn?: string;
  YarnEndpointAddress?: string;
  ZeppelinRemoteSparkInterpreterPort?: number;
  NumberOfNodes?: number;
  WorkerType?: WorkerType;
  GlueVersion?: string;
  NumberOfWorkers?: number;
  AvailabilityZone?: string;
  VpcId?: string;
  ExtraPythonLibsS3Path?: string;
  ExtraJarsS3Path?: string;
  FailureReason?: string;
  SecurityConfiguration?: string;
  CreatedTimestamp?: Date;
  Arguments?: { [key: string]: string | undefined };
}
export type GlossaryName = string;
export type MetadataDescription = string;
export interface CreateGlossaryRequest {
  Name: string;
  Description?: string;
  ClientToken?: string;
}
export type GlossaryId = string;
export interface CreateGlossaryResponse {
  Id?: string;
  Name?: string;
  Description?: string;
}
export type GlossaryTermName = string;
export type GlossaryShortDescription = string;
export type GlossaryLongDescription = string;
export interface CreateGlossaryTermRequest {
  GlossaryIdentifier: string;
  Name: string;
  ShortDescription?: string;
  LongDescription?: string;
  ClientToken?: string;
}
export interface CreateGlossaryTermResponse {
  Id?: string;
  GlossaryId?: string;
  Name?: string;
  ShortDescription?: string;
  LongDescription?: string;
}
export type IdentityCenterInstanceArn = string;
export type IdentityCenterScope = string;
export type IdentityCenterScopesList = string[];
export interface CreateGlueIdentityCenterConfigurationRequest {
  InstanceArn: string;
  Scopes?: string[];
  UserBackgroundSessionsEnabled?: boolean;
}
export type ApplicationArn = string;
export interface CreateGlueIdentityCenterConfigurationResponse {
  ApplicationArn?: string;
}
export type String128 = string;
export type String512 = string;
export type IntegrationDescription = string;
export type String2048 = string;
export type IntegrationString = string;
export type IntegrationAdditionalEncryptionContextMap = {
  [key: string]: string | undefined;
};
export interface Tag {
  key?: string;
  value?: string;
}
export type IntegrationTagsList = Tag[];
export type IntegrationSourcePropertiesMap = {
  [key: string]: string | undefined;
};
export type ContinuousSync = boolean;
export interface IntegrationConfig {
  RefreshInterval?: string;
  SourceProperties?: { [key: string]: string | undefined };
  ContinuousSync?: boolean;
}
export interface CreateIntegrationRequest {
  IntegrationName: string;
  SourceArn: string;
  TargetArn: string;
  Description?: string;
  DataFilter?: string;
  KmsKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
  IntegrationConfig?: IntegrationConfig;
}
export type IntegrationStatus =
  | "CREATING"
  | "ACTIVE"
  | "MODIFYING"
  | "FAILED"
  | "DELETING"
  | "SYNCING"
  | "NEEDS_ATTENTION"
  | (string & {});
export type IntegrationTimestamp = Date;
export interface IntegrationError {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type IntegrationErrorList = IntegrationError[];
export interface CreateIntegrationResponse {
  SourceArn: string;
  TargetArn: string;
  IntegrationName: string;
  Description?: string;
  IntegrationArn: string;
  KmsKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
  Status: IntegrationStatus;
  CreateTime: Date;
  Errors?: IntegrationError[];
  DataFilter?: string;
  IntegrationConfig?: IntegrationConfig;
}
export interface SourceProcessingProperties {
  RoleArn?: string;
}
export interface TargetProcessingProperties {
  RoleArn?: string;
  KmsArn?: string;
  ConnectionName?: string;
  EventBusArn?: string;
}
export interface CreateIntegrationResourcePropertyRequest {
  ResourceArn: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
  Tags?: Tag[];
}
export interface CreateIntegrationResourcePropertyResponse {
  ResourceArn: string;
  ResourcePropertyArn?: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
}
export type SourceTableFieldsList = string[];
export type PrimaryKeyList = string[];
export interface SourceTableConfig {
  Fields?: string[];
  FilterPredicate?: string;
  PrimaryKey?: string[];
  RecordUpdateField?: string;
}
export type UnnestSpec = "TOPLEVEL" | "FULL" | "NOUNNEST" | (string & {});
export interface IntegrationPartition {
  FieldName?: string;
  FunctionSpec?: string;
  ConversionSpec?: string;
}
export type IntegrationPartitionSpecList = IntegrationPartition[];
export interface TargetTableConfig {
  UnnestSpec?: UnnestSpec;
  PartitionSpec?: IntegrationPartition[];
  TargetTableName?: string;
}
export interface CreateIntegrationTablePropertiesRequest {
  ResourceArn: string;
  TableName: string;
  SourceTableConfig?: SourceTableConfig;
  TargetTableConfig?: TargetTableConfig;
}
export interface CreateIntegrationTablePropertiesResponse {}
export interface CreateJobRequest {
  Name: string;
  JobMode?: JobMode;
  JobRunQueuingEnabled?: boolean;
  Description?: string;
  LogUri?: string;
  Role: string;
  ExecutionProperty?: ExecutionProperty;
  Command: JobCommand;
  DefaultArguments?: { [key: string]: string | undefined };
  NonOverridableArguments?: { [key: string]: string | undefined };
  Connections?: ConnectionsList;
  MaxRetries?: number;
  AllocatedCapacity?: number;
  Timeout?: number;
  MaxCapacity?: number;
  SecurityConfiguration?: string;
  Tags?: { [key: string]: string | undefined };
  NotificationProperty?: NotificationProperty;
  GlueVersion?: string;
  NumberOfWorkers?: number;
  WorkerType?: WorkerType;
  CodeGenConfigurationNodes?: {
    [key: string]: CodeGenConfigurationNode | undefined;
  };
  ExecutionClass?: ExecutionClass;
  SourceControlDetails?: SourceControlDetails;
  MaintenanceWindow?: string;
}
export interface CreateJobResponse {
  Name?: string;
}
export type GlueTables = GlueTable[];
export type TransformType = "FIND_MATCHES" | (string & {});
export interface FindMatchesParameters {
  PrimaryKeyColumnName?: string;
  PrecisionRecallTradeoff?: number;
  AccuracyCostTradeoff?: number;
  EnforceProvidedLabels?: boolean;
}
export interface TransformParameters {
  TransformType: TransformType;
  FindMatchesParameters?: FindMatchesParameters;
}
export type MLUserDataEncryptionModeString =
  | "DISABLED"
  | "SSE-KMS"
  | (string & {});
export interface MLUserDataEncryption {
  MlUserDataEncryptionMode: MLUserDataEncryptionModeString;
  KmsKeyId?: string;
}
export interface TransformEncryption {
  MlUserDataEncryption?: MLUserDataEncryption;
  TaskRunSecurityConfigurationName?: string;
}
export interface CreateMLTransformRequest {
  Name: string;
  Description?: string;
  InputRecordTables: GlueTable[];
  Parameters: TransformParameters;
  Role: string;
  GlueVersion?: string;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  Timeout?: number;
  MaxRetries?: number;
  Tags?: { [key: string]: string | undefined };
  TransformEncryption?: TransformEncryption;
}
export interface CreateMLTransformResponse {
  TransformId?: string;
}
export interface CreatePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionInput: PartitionInput;
}
export interface CreatePartitionResponse {}
export type KeyList = string[];
export interface PartitionIndex {
  Keys: string[];
  IndexName: string;
}
export interface CreatePartitionIndexRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionIndex: PartitionIndex;
}
export interface CreatePartitionIndexResponse {}
export interface CreateRegistryInput {
  RegistryName: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateRegistryResponse {
  RegistryArn?: string;
  RegistryName?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface RegistryId {
  RegistryName?: string;
  RegistryArn?: string;
}
export type Compatibility =
  | "NONE"
  | "DISABLED"
  | "BACKWARD"
  | "BACKWARD_ALL"
  | "FORWARD"
  | "FORWARD_ALL"
  | "FULL"
  | "FULL_ALL"
  | (string & {});
export interface CreateSchemaInput {
  RegistryId?: RegistryId;
  SchemaName: string;
  DataFormat: DataFormat;
  Compatibility?: Compatibility;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  SchemaDefinition?: string;
}
export type SchemaCheckpointNumber = number;
export type SchemaStatus = "AVAILABLE" | "PENDING" | "DELETING" | (string & {});
export type SchemaVersionStatus =
  | "AVAILABLE"
  | "PENDING"
  | "FAILURE"
  | "DELETING"
  | (string & {});
export interface CreateSchemaResponse {
  RegistryName?: string;
  RegistryArn?: string;
  SchemaName?: string;
  SchemaArn?: string;
  Description?: string;
  DataFormat?: DataFormat;
  Compatibility?: Compatibility;
  SchemaCheckpoint?: number;
  LatestSchemaVersion?: number;
  NextSchemaVersion?: number;
  SchemaStatus?: SchemaStatus;
  Tags?: { [key: string]: string | undefined };
  SchemaVersionId?: string;
  SchemaVersionStatus?: SchemaVersionStatus;
}
export type CodeGenIdentifier = string;
export type CodeGenNodeType = string;
export type CodeGenArgName = string;
export type CodeGenArgValue = string;
export interface CodeGenNodeArg {
  Name: string;
  Value: string;
  Param?: boolean;
}
export type CodeGenNodeArgs = CodeGenNodeArg[];
export interface CodeGenNode {
  Id: string;
  NodeType: string;
  Args: CodeGenNodeArg[];
  LineNumber?: number;
}
export type DagNodes = CodeGenNode[];
export interface CodeGenEdge {
  Source: string;
  Target: string;
  TargetParameter?: string;
}
export type DagEdges = CodeGenEdge[];
export type Language = "PYTHON" | "SCALA" | (string & {});
export interface CreateScriptRequest {
  DagNodes?: CodeGenNode[];
  DagEdges?: CodeGenEdge[];
  Language?: Language;
}
export type PythonScript = string;
export type ScalaCode = string;
export interface CreateScriptResponse {
  PythonScript?: string;
  ScalaCode?: string;
}
export type S3EncryptionMode =
  | "DISABLED"
  | "SSE-KMS"
  | "SSE-S3"
  | (string & {});
export interface S3Encryption {
  S3EncryptionMode?: S3EncryptionMode;
  KmsKeyArn?: string;
}
export type S3EncryptionList = S3Encryption[];
export type CloudWatchEncryptionMode = "DISABLED" | "SSE-KMS" | (string & {});
export interface CloudWatchEncryption {
  CloudWatchEncryptionMode?: CloudWatchEncryptionMode;
  KmsKeyArn?: string;
}
export type JobBookmarksEncryptionMode = "DISABLED" | "CSE-KMS" | (string & {});
export interface JobBookmarksEncryption {
  JobBookmarksEncryptionMode?: JobBookmarksEncryptionMode;
  KmsKeyArn?: string;
}
export type DataQualityEncryptionMode = "DISABLED" | "SSE-KMS" | (string & {});
export interface DataQualityEncryption {
  DataQualityEncryptionMode?: DataQualityEncryptionMode;
  KmsKeyArn?: string;
}
export interface EncryptionConfiguration {
  S3Encryption?: S3Encryption[];
  CloudWatchEncryption?: CloudWatchEncryption;
  JobBookmarksEncryption?: JobBookmarksEncryption;
  DataQualityEncryption?: DataQualityEncryption;
}
export interface CreateSecurityConfigurationRequest {
  Name: string;
  EncryptionConfiguration: EncryptionConfiguration;
}
export interface CreateSecurityConfigurationResponse {
  Name?: string;
  CreatedTimestamp?: Date;
}
export type OrchestrationRoleArn = string;
export interface SessionCommand {
  Name?: string;
  PythonVersion?: string;
}
export type OrchestrationArgumentsValue = string;
export type OrchestrationArgumentsMap = { [key: string]: string | undefined };
export type SessionType = "LIVY" | "SPARK_CONNECT" | (string & {});
export interface CreateSessionRequest {
  Id: string;
  Description?: string;
  Role: string;
  Command: SessionCommand;
  Timeout?: number;
  IdleTimeout?: number;
  DefaultArguments?: { [key: string]: string | undefined };
  Connections?: ConnectionsList;
  MaxCapacity?: number;
  NumberOfWorkers?: number;
  WorkerType?: WorkerType;
  SecurityConfiguration?: string;
  GlueVersion?: string;
  Tags?: { [key: string]: string | undefined };
  RequestOrigin?: string;
  SessionType?: SessionType;
}
export type SessionStatus =
  | "PROVISIONING"
  | "READY"
  | "FAILED"
  | "TIMEOUT"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export type DoubleValue = number;
export type IdleTimeout = number;
export interface Session {
  Id?: string;
  CreatedOn?: Date;
  Status?: SessionStatus;
  ErrorMessage?: string;
  Description?: string;
  Role?: string;
  Command?: SessionCommand;
  DefaultArguments?: { [key: string]: string | undefined };
  Connections?: ConnectionsList;
  Progress?: number;
  MaxCapacity?: number;
  SecurityConfiguration?: string;
  GlueVersion?: string;
  NumberOfWorkers?: number;
  WorkerType?: WorkerType;
  CompletedOn?: Date;
  ExecutionTime?: number;
  DPUSeconds?: number;
  IdleTimeout?: number;
  ProfileName?: string;
  SessionType?: SessionType;
}
export interface CreateSessionResponse {
  Session?: Session;
}
export type NonNegativeInteger = number;
export type ViewTextString = string;
export type TableTypeString = string;
export interface TableIdentifier {
  CatalogId?: string;
  DatabaseName?: string;
  Name?: string;
  Region?: string;
}
export type ViewDialect = "REDSHIFT" | "ATHENA" | "SPARK" | (string & {});
export type ViewDialectVersionString = string;
export interface ViewRepresentationInput {
  Dialect?: ViewDialect;
  DialectVersion?: string;
  ViewOriginalText?: string;
  ValidationConnection?: string;
  ViewExpandedText?: string;
}
export type ViewRepresentationInputList = ViewRepresentationInput[];
export type TableVersionId = number;
export type RefreshSeconds = number;
export type LastRefreshType = "FULL" | "INCREMENTAL" | (string & {});
export type ViewSubObjectsList = string[];
export type ViewSubObjectVersionIdsList = number[];
export interface ViewDefinitionInput {
  IsProtected?: boolean;
  Definer?: string;
  Representations?: ViewRepresentationInput[];
  ViewVersionId?: number;
  ViewVersionToken?: string;
  RefreshSeconds?: number;
  LastRefreshType?: LastRefreshType;
  SubObjects?: string[];
  SubObjectVersionIds?: number[];
}
export interface TableInput {
  Name: string;
  Description?: string;
  Owner?: string;
  LastAccessTime?: Date;
  LastAnalyzedTime?: Date;
  Retention?: number;
  StorageDescriptor?: StorageDescriptor;
  PartitionKeys?: Column[];
  ViewOriginalText?: string;
  ViewExpandedText?: string;
  TableType?: string;
  Parameters?: { [key: string]: string | undefined };
  TargetTable?: TableIdentifier;
  ViewDefinition?: ViewDefinitionInput;
}
export type PartitionIndexList = PartitionIndex[];
export type MetadataOperation = "CREATE" | (string & {});
export type IntegerList = number[];
export type IcebergStructTypeEnum = "struct" | (string & {});
export type IcebergDocument = unknown;
export interface IcebergStructField {
  Id: number;
  Name: string;
  Type: any;
  Required: boolean;
  Doc?: string;
  InitialDefault?: any;
  WriteDefault?: any;
}
export type IcebergStructFieldList = IcebergStructField[];
export interface IcebergSchema {
  SchemaId?: number;
  IdentifierFieldIds?: number[];
  Type?: IcebergStructTypeEnum;
  Fields: IcebergStructField[];
}
export type IcebergTransformString = string;
export interface IcebergPartitionField {
  SourceId: number;
  Transform: string;
  Name: string;
  FieldId?: number;
}
export type IcebergPartitionSpecFieldList = IcebergPartitionField[];
export interface IcebergPartitionSpec {
  Fields: IcebergPartitionField[];
  SpecId?: number;
}
export type IcebergSortDirection = "asc" | "desc" | (string & {});
export type IcebergNullOrder = "nulls-first" | "nulls-last" | (string & {});
export interface IcebergSortField {
  SourceId: number;
  Transform: string;
  Direction: IcebergSortDirection;
  NullOrder: IcebergNullOrder;
}
export type IcebergSortOrderFieldList = IcebergSortField[];
export interface IcebergSortOrder {
  OrderId: number;
  Fields: IcebergSortField[];
}
export type StringToStringMap = { [key: string]: string | undefined };
export interface CreateIcebergTableInput {
  Location: string;
  Schema: IcebergSchema;
  PartitionSpec?: IcebergPartitionSpec;
  WriteOrder?: IcebergSortOrder;
  Properties?: { [key: string]: string | undefined };
}
export interface IcebergInput {
  MetadataOperation: MetadataOperation;
  Version?: string;
  CreateIcebergTableInput?: CreateIcebergTableInput;
}
export interface OpenTableFormatInput {
  IcebergInput?: IcebergInput;
}
export interface CreateTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  Name?: string;
  TableInput?: TableInput;
  PartitionIndexes?: PartitionIndex[];
  TransactionId?: string;
  OpenTableFormatInput?: OpenTableFormatInput;
}
export interface CreateTableResponse {}
export interface CreateTableOptimizerRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Type: TableOptimizerType;
  TableOptimizerConfiguration: TableOptimizerConfiguration;
}
export interface CreateTableOptimizerResponse {}
export interface CreateTriggerRequest {
  Name: string;
  WorkflowName?: string;
  Type: TriggerType;
  Schedule?: string;
  Predicate?: Predicate;
  Actions: Action[];
  Description?: string;
  StartOnCreation?: boolean;
  Tags?: { [key: string]: string | undefined };
  EventBatchingCondition?: EventBatchingCondition;
}
export interface CreateTriggerResponse {
  Name?: string;
}
export type ConfigValueString = string;
export type AllowedValuesStringList = string[];
export interface ConfigurationObject {
  DefaultValue?: string;
  AllowedValues?: string[];
  MinValue?: string;
  MaxValue?: string;
}
export type ConfigurationMap = {
  [key: string]: ConfigurationObject | undefined;
};
export interface ProfileConfiguration {
  SessionConfiguration?: { [key: string]: ConfigurationObject | undefined };
  JobConfiguration?: { [key: string]: ConfigurationObject | undefined };
}
export interface CreateUsageProfileRequest {
  Name: string;
  Description?: string;
  Configuration: ProfileConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateUsageProfileResponse {
  Name?: string;
}
export type FunctionType =
  | "REGULAR_FUNCTION"
  | "AGGREGATE_FUNCTION"
  | "STORED_PROCEDURE"
  | (string & {});
export type PrincipalType = "USER" | "ROLE" | "GROUP" | (string & {});
export type ResourceType = "JAR" | "FILE" | "ARCHIVE" | (string & {});
export interface ResourceUri {
  ResourceType?: ResourceType;
  Uri?: string;
}
export type ResourceUriList = ResourceUri[];
export interface UserDefinedFunctionInput {
  FunctionName?: string;
  ClassName?: string;
  OwnerName?: string;
  FunctionType?: FunctionType;
  OwnerType?: PrincipalType;
  ResourceUris?: ResourceUri[];
}
export interface CreateUserDefinedFunctionRequest {
  CatalogId?: string;
  DatabaseName: string;
  FunctionInput: UserDefinedFunctionInput;
}
export interface CreateUserDefinedFunctionResponse {}
export type WorkflowDescriptionString = string;
export interface CreateWorkflowRequest {
  Name: string;
  Description?: string;
  DefaultRunProperties?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
  MaxConcurrentRuns?: number;
}
export interface CreateWorkflowResponse {
  Name?: string;
}
export interface DeleteAssetRequest {
  Identifier: string;
}
export interface DeleteAssetResponse {}
export type AssetTypeId = string;
export interface DeleteAssetTypeRequest {
  Identifier: string;
}
export interface DeleteAssetTypeResponse {}
export type AttachmentName = string;
export interface DeleteAttachmentRequest {
  AssetIdentifier: string;
  IterableFormName?: string;
  ItemIdentifier?: string;
  AttachmentName: string;
}
export interface DeleteAttachmentResponse {
  AssetIdentifier?: string;
  IterableFormName?: string;
  ItemIdentifier?: string;
}
export interface DeleteBlueprintRequest {
  Name: string;
}
export interface DeleteBlueprintResponse {
  Name?: string;
}
export interface DeleteCatalogRequest {
  CatalogId: string;
}
export interface DeleteCatalogResponse {}
export interface DeleteClassifierRequest {
  Name: string;
}
export interface DeleteClassifierResponse {}
export interface DeleteColumnStatisticsForPartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
  ColumnName: string;
}
export interface DeleteColumnStatisticsForPartitionResponse {}
export interface DeleteColumnStatisticsForTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  ColumnName: string;
}
export interface DeleteColumnStatisticsForTableResponse {}
export interface DeleteColumnStatisticsTaskSettingsRequest {
  DatabaseName: string;
  TableName: string;
}
export interface DeleteColumnStatisticsTaskSettingsResponse {}
export interface DeleteConnectionRequest {
  CatalogId?: string;
  ConnectionName: string;
}
export interface DeleteConnectionResponse {}
export interface DeleteConnectionTypeRequest {
  ConnectionType: string;
}
export interface DeleteConnectionTypeResponse {}
export interface DeleteCrawlerRequest {
  Name: string;
}
export interface DeleteCrawlerResponse {}
export interface DeleteCustomEntityTypeRequest {
  Name: string;
}
export interface DeleteCustomEntityTypeResponse {
  Name?: string;
}
export interface DeleteDatabaseRequest {
  CatalogId?: string;
  Name: string;
}
export interface DeleteDatabaseResponse {}
export interface DeleteDataQualityRulesetRequest {
  Name: string;
}
export interface DeleteDataQualityRulesetResponse {}
export interface DeleteDevEndpointRequest {
  EndpointName: string;
}
export interface DeleteDevEndpointResponse {}
export interface DeleteFormTypeRequest {
  Identifier: string;
}
export interface DeleteFormTypeResponse {}
export interface DeleteGlossaryRequest {
  Identifier: string;
}
export interface DeleteGlossaryResponse {}
export interface DeleteGlossaryTermRequest {
  Identifier: string;
}
export interface DeleteGlossaryTermResponse {}
export interface DeleteGlueIdentityCenterConfigurationRequest {}
export interface DeleteGlueIdentityCenterConfigurationResponse {}
export interface DeleteIntegrationRequest {
  IntegrationIdentifier: string;
}
export interface DeleteIntegrationResponse {
  SourceArn: string;
  TargetArn: string;
  IntegrationName: string;
  Description?: string;
  IntegrationArn: string;
  KmsKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
  Status: IntegrationStatus;
  CreateTime: Date;
  Errors?: IntegrationError[];
  DataFilter?: string;
}
export interface DeleteIntegrationResourcePropertyRequest {
  ResourceArn: string;
}
export interface DeleteIntegrationResourcePropertyResponse {}
export interface DeleteIntegrationTablePropertiesRequest {
  ResourceArn: string;
  TableName: string;
}
export interface DeleteIntegrationTablePropertiesResponse {}
export interface DeleteJobRequest {
  JobName: string;
}
export interface DeleteJobResponse {
  JobName?: string;
}
export interface DeleteMLTransformRequest {
  TransformId: string;
}
export interface DeleteMLTransformResponse {
  TransformId?: string;
}
export interface DeletePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
}
export interface DeletePartitionResponse {}
export interface DeletePartitionIndexRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  IndexName: string;
}
export interface DeletePartitionIndexResponse {}
export interface DeleteRegistryInput {
  RegistryId: RegistryId;
}
export type RegistryStatus = "AVAILABLE" | "DELETING" | (string & {});
export interface DeleteRegistryResponse {
  RegistryName?: string;
  RegistryArn?: string;
  Status?: RegistryStatus;
}
export interface DeleteResourcePolicyRequest {
  PolicyHashCondition?: string;
  ResourceArn?: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteSchemaInput {
  SchemaId: SchemaId;
}
export interface DeleteSchemaResponse {
  SchemaArn?: string;
  SchemaName?: string;
  Status?: SchemaStatus;
}
export type VersionsString = string;
export interface DeleteSchemaVersionsInput {
  SchemaId: SchemaId;
  Versions: string;
}
export type ErrorCodeString = string;
export type ErrorMessageString = string;
export interface ErrorDetails {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export interface SchemaVersionErrorItem {
  VersionNumber?: number;
  ErrorDetails?: ErrorDetails;
}
export type SchemaVersionErrorList = SchemaVersionErrorItem[];
export interface DeleteSchemaVersionsResponse {
  SchemaVersionErrors?: SchemaVersionErrorItem[];
}
export interface DeleteSecurityConfigurationRequest {
  Name: string;
}
export interface DeleteSecurityConfigurationResponse {}
export interface DeleteSessionRequest {
  Id: string;
  RequestOrigin?: string;
}
export interface DeleteSessionResponse {
  Id?: string;
}
export interface DeleteTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  Name: string;
  TransactionId?: string;
}
export interface DeleteTableResponse {}
export interface DeleteTableOptimizerRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Type: TableOptimizerType;
}
export interface DeleteTableOptimizerResponse {}
export interface DeleteTableVersionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  VersionId: string;
}
export interface DeleteTableVersionResponse {}
export interface DeleteTriggerRequest {
  Name: string;
}
export interface DeleteTriggerResponse {
  Name?: string;
}
export interface DeleteUsageProfileRequest {
  Name: string;
}
export interface DeleteUsageProfileResponse {}
export interface DeleteUserDefinedFunctionRequest {
  CatalogId?: string;
  DatabaseName: string;
  FunctionName: string;
}
export interface DeleteUserDefinedFunctionResponse {}
export interface DeleteWorkflowRequest {
  Name: string;
}
export interface DeleteWorkflowResponse {
  Name?: string;
}
export interface DescribeConnectionTypeRequest {
  ConnectionType: string;
}
export type Description = string;
export type AuthenticationTypes = AuthenticationType[];
export type DataOperation = "READ" | "WRITE" | (string & {});
export type DataOperations = DataOperation[];
export type ComputeEnvironments = ComputeEnvironment[];
export interface Capabilities {
  SupportedAuthenticationTypes: AuthenticationType[];
  SupportedDataOperations: DataOperation[];
  SupportedComputeEnvironments: ComputeEnvironment[];
}
export type PropertyName = string;
export type PropertyDescriptionString = string;
export type PropertyType =
  | "USER_INPUT"
  | "SECRET"
  | "READ_ONLY"
  | "UNUSED"
  | "SECRET_OR_USER_INPUT"
  | (string & {});
export type PropertyTypes = PropertyType[];
export type AllowedValueDescriptionString = string;
export type AllowedValueValueString = string;
export interface AllowedValue {
  Description?: string;
  Value: string;
}
export type AllowedValues = AllowedValue[];
export type PropertyLocation =
  | "HEADER"
  | "BODY"
  | "QUERY_PARAM"
  | "PATH"
  | (string & {});
export interface Property {
  Name: string;
  Description: string;
  Required: boolean;
  DefaultValue?: string;
  PropertyTypes: PropertyType[];
  AllowedValues?: AllowedValue[];
  DataOperationScopes?: DataOperation[];
  KeyOverride?: string;
  PropertyLocation?: PropertyLocation;
}
export type PropertiesMap = { [key: string]: Property | undefined };
export interface AuthConfiguration {
  AuthenticationType: Property;
  SecretArn?: Property;
  OAuth2Properties?: { [key: string]: Property | undefined };
  BasicAuthenticationProperties?: { [key: string]: Property | undefined };
  CustomAuthenticationProperties?: { [key: string]: Property | undefined };
}
export type ComputeEnvironmentName = string;
export type ComputeEnvironmentConfigurationDescriptionString = string;
export type PropertyNameOverrides = { [key: string]: string | undefined };
export type ListOfString = string[];
export interface ComputeEnvironmentConfiguration {
  Name: string;
  Description: string;
  ComputeEnvironment: ComputeEnvironment;
  SupportedAuthenticationTypes: AuthenticationType[];
  ConnectionOptions: { [key: string]: Property | undefined };
  ConnectionPropertyNameOverrides: { [key: string]: string | undefined };
  ConnectionOptionNameOverrides: { [key: string]: string | undefined };
  ConnectionPropertiesRequiredOverrides: string[];
  PhysicalConnectionPropertiesRequired?: boolean;
}
export type ComputeEnvironmentConfigurationMap = {
  [key: string]: ComputeEnvironmentConfiguration | undefined;
};
export type HTTPMethod = "GET" | "POST" | (string & {});
export type PathString = string;
export type ConnectorPropertyKey = string;
export interface ConnectorProperty {
  Name: string;
  KeyOverride?: string;
  Required: boolean;
  DefaultValue?: string;
  AllowedValues?: string[];
  PropertyLocation?: PropertyLocation;
  PropertyType: PropertyType;
  Format?: string;
}
export type ConnectorPropertyList = ConnectorProperty[];
export type JsonPathString = string;
export interface ResponseConfiguration {
  ResultPath: string;
  ErrorPath?: string;
}
export type DefaultValue = string;
export interface ResponseExtractionMapping {
  ContentPath?: string;
  HeaderKey?: string;
}
export interface ExtractedParameter {
  Key?: string;
  DefaultValue?: string;
  PropertyLocation?: PropertyLocation;
  Value?: ResponseExtractionMapping;
}
export interface CursorConfiguration {
  NextPage: ExtractedParameter;
  LimitParameter?: ExtractedParameter;
}
export interface OffsetConfiguration {
  OffsetParameter: ExtractedParameter;
  LimitParameter: ExtractedParameter;
}
export interface PaginationConfiguration {
  CursorConfiguration?: CursorConfiguration;
  OffsetConfiguration?: OffsetConfiguration;
}
export type FilterMode = "QUERY_PARAMS" | "FILTER_STRING" | (string & {});
export type ConnectionStringToStringMap = { [key: string]: string | undefined };
export interface BetweenConfiguration {
  LowBoundKey?: string;
  HighBoundKey?: string;
  Template?: string;
}
export interface FilterStringConfiguration {
  QueryParameterName: string;
  QuoteStringValues?: boolean;
  QuoteCharacter?: string;
}
export interface FilterConfiguration {
  FilterMode: FilterMode;
  OperatorMappings?: { [key: string]: string | undefined };
  DateTimeFormat?: string;
  StripQuotes?: boolean;
  BetweenConfiguration?: BetweenConfiguration;
  FilterStringConfiguration?: FilterStringConfiguration;
}
export interface SourceConfiguration {
  RequestMethod?: HTTPMethod;
  RequestPath?: string;
  RequestParameters?: ConnectorProperty[];
  ResponseConfiguration?: ResponseConfiguration;
  PaginationConfiguration?: PaginationConfiguration;
  FilterConfiguration?: FilterConfiguration;
}
export type EntityConfigurationMapKeyString = string;
export type FieldDefinitionMapKeyString = string;
export type FieldDataType =
  | "INT"
  | "SMALLINT"
  | "BIGINT"
  | "FLOAT"
  | "LONG"
  | "DATE"
  | "BOOLEAN"
  | "MAP"
  | "ARRAY"
  | "STRING"
  | "TIMESTAMP"
  | "DECIMAL"
  | "BYTE"
  | "SHORT"
  | "DOUBLE"
  | "STRUCT"
  | "BINARY"
  | "UNION"
  | (string & {});
export interface FilterOverrides {
  FieldName?: string;
  OperatorMappings?: { [key: string]: string | undefined };
  BetweenConfiguration?: BetweenConfiguration;
  DateTimeFormat?: string;
}
export interface FieldDefinition {
  Name: string;
  FieldDataType: FieldDataType;
  ResponseDateFormat?: string;
  IsPartitionable?: boolean;
  IsNullable?: boolean;
  IsQueryable?: boolean;
  IsOrderable?: boolean;
  FilterOverrides?: FilterOverrides;
}
export type FieldDefinitionMap = { [key: string]: FieldDefinition | undefined };
export interface EntityConfiguration {
  SourceConfiguration?: SourceConfiguration;
  Schema?: { [key: string]: FieldDefinition | undefined };
}
export type EntityConfigurationMap = {
  [key: string]: EntityConfiguration | undefined;
};
export interface RestConfiguration {
  GlobalSourceConfiguration?: SourceConfiguration;
  ValidationEndpointConfiguration?: SourceConfiguration;
  EntityConfigurations?: { [key: string]: EntityConfiguration | undefined };
}
export interface DescribeConnectionTypeResponse {
  ConnectionType?: string;
  Description?: string;
  Capabilities?: Capabilities;
  ConnectionProperties?: { [key: string]: Property | undefined };
  ConnectionOptions?: { [key: string]: Property | undefined };
  AuthenticationConfiguration?: AuthConfiguration;
  ComputeEnvironmentConfigurations?: {
    [key: string]: ComputeEnvironmentConfiguration | undefined;
  };
  PhysicalConnectionRequirements?: { [key: string]: Property | undefined };
  AthenaConnectionProperties?: { [key: string]: Property | undefined };
  PythonConnectionProperties?: { [key: string]: Property | undefined };
  SparkConnectionProperties?: { [key: string]: Property | undefined };
  RestConfiguration?: RestConfiguration;
}
export type EntityName = string;
export type NextToken = string;
export type ApiVersion = string;
export interface DescribeEntityRequest {
  ConnectionName: string;
  CatalogId?: string;
  EntityName: string;
  NextToken?: string;
  DataStoreApiVersion?: string;
}
export type EntityFieldName = string;
export type FieldLabel = string;
export type FieldDescription = string;
export type FieldFilterOperator =
  | "LESS_THAN"
  | "GREATER_THAN"
  | "BETWEEN"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "LESS_THAN_OR_EQUAL_TO"
  | "CONTAINS"
  | "ORDER_BY"
  | (string & {});
export type FieldFilterOperatorsList = FieldFilterOperator[];
export type CustomProperties = { [key: string]: string | undefined };
export interface Field {
  FieldName?: string;
  Label?: string;
  Description?: string;
  FieldType?: FieldDataType;
  IsPrimaryKey?: boolean;
  IsNullable?: boolean;
  IsRetrievable?: boolean;
  IsFilterable?: boolean;
  IsPartitionable?: boolean;
  IsCreateable?: boolean;
  IsUpdateable?: boolean;
  IsUpsertable?: boolean;
  IsDefaultOnCreate?: boolean;
  SupportedValues?: string[];
  SupportedFilterOperators?: FieldFilterOperator[];
  ParentField?: string;
  NativeDataType?: string;
  CustomProperties?: { [key: string]: string | undefined };
}
export type FieldsList = Field[];
export interface DescribeEntityResponse {
  Fields?: Field[];
  NextToken?: string;
}
export type IntegrationInteger = number;
export interface DescribeInboundIntegrationsRequest {
  IntegrationArn?: string;
  Marker?: string;
  MaxRecords?: number;
  TargetArn?: string;
}
export interface InboundIntegration {
  SourceArn: string;
  TargetArn: string;
  IntegrationArn: string;
  Status: IntegrationStatus;
  CreateTime: Date;
  IntegrationConfig?: IntegrationConfig;
  Errors?: IntegrationError[];
}
export type InboundIntegrationsList = InboundIntegration[];
export interface DescribeInboundIntegrationsResponse {
  InboundIntegrations?: InboundIntegration[];
  Marker?: string;
}
export type IntegrationFilterValues = string[];
export interface IntegrationFilter {
  Name?: string;
  Values?: string[];
}
export type IntegrationFilterList = IntegrationFilter[];
export interface DescribeIntegrationsRequest {
  IntegrationIdentifier?: string;
  Marker?: string;
  MaxRecords?: number;
  Filters?: IntegrationFilter[];
}
export interface Integration {
  SourceArn: string;
  TargetArn: string;
  Description?: string;
  IntegrationName: string;
  IntegrationArn: string;
  KmsKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
  Status: IntegrationStatus;
  CreateTime: Date;
  IntegrationConfig?: IntegrationConfig;
  Errors?: IntegrationError[];
  DataFilter?: string;
}
export type IntegrationsList = Integration[];
export interface DescribeIntegrationsResponse {
  Integrations?: Integration[];
  Marker?: string;
}
export interface DisassociateGlossaryTermsRequest {
  AssetIdentifier: string;
  IterableFormName?: string;
  ItemIdentifier?: string;
  GlossaryTermIdentifiers: string[];
  ClientToken?: string;
}
export interface DisassociateGlossaryTermsResponse {
  AssetIdentifier?: string;
  IterableFormName?: string;
  ItemIdentifier?: string;
  GlossaryTerms?: string[];
}
export interface GetAssetInput {
  Identifier: string;
}
export type AssetName = string;
export type AssetDescription = string;
export type CreatedAt = Date;
export type UpdatedAt = Date;
export type IterableFormKey = string;
export interface IterableFormEntry {
  FormTypeId?: string;
}
export type IterableFormMap = { [key: string]: IterableFormEntry | undefined };
export interface GetAssetOutput {
  Id: string;
  Name?: string;
  Description?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  AssetTypeId: string;
  GlossaryTerms?: string[];
  Forms?: { [key: string]: AssetFormEntry | undefined };
  Attachments?: { [key: string]: AssetFormEntry | undefined };
  IterableForms?: { [key: string]: IterableFormEntry | undefined };
}
export interface GetAssetTypeRequest {
  Identifier: string;
}
export type AssetTypeName = string;
export type AssetTypeFormKey = string;
export interface AssetTypeFormReference {
  FormTypeIdentifier: string;
}
export type AssetTypeFormsMap = {
  [key: string]: AssetTypeFormReference | undefined;
};
export interface GetAssetTypeResponse {
  Id?: string;
  Name?: string;
  Forms?: { [key: string]: AssetTypeFormReference | undefined };
}
export interface GetBlueprintRequest {
  Name: string;
  IncludeBlueprint?: boolean;
  IncludeParameterSpec?: boolean;
}
export interface GetBlueprintResponse {
  Blueprint?: Blueprint;
}
export interface GetBlueprintRunRequest {
  BlueprintName: string;
  RunId: string;
}
export type BlueprintRunState =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "ROLLING_BACK"
  | (string & {});
export type BlueprintParameters = string;
export type OrchestrationIAMRoleArn = string;
export interface BlueprintRun {
  BlueprintName?: string;
  RunId?: string;
  WorkflowName?: string;
  State?: BlueprintRunState;
  StartedOn?: Date;
  CompletedOn?: Date;
  ErrorMessage?: string;
  RollbackErrorMessage?: string;
  Parameters?: string;
  RoleArn?: string;
}
export interface GetBlueprintRunResponse {
  BlueprintRun?: BlueprintRun;
}
export type PageSize = number;
export interface GetBlueprintRunsRequest {
  BlueprintName: string;
  NextToken?: string;
  MaxResults?: number;
}
export type BlueprintRuns = BlueprintRun[];
export interface GetBlueprintRunsResponse {
  BlueprintRuns?: BlueprintRun[];
  NextToken?: string;
}
export interface GetCatalogRequest {
  CatalogId: string;
}
export interface DataLakeAccessPropertiesOutput {
  DataLakeAccess?: boolean;
  DataTransferRole?: string;
  KmsKey?: string;
  ManagedWorkgroupName?: string;
  ManagedWorkgroupStatus?: string;
  RedshiftDatabaseName?: string;
  StatusMessage?: string;
  CatalogType?: string;
}
export interface IcebergOptimizationPropertiesOutput {
  RoleArn?: string;
  Compaction?: { [key: string]: string | undefined };
  Retention?: { [key: string]: string | undefined };
  OrphanFileDeletion?: { [key: string]: string | undefined };
  LastUpdatedTime?: Date;
}
export interface CatalogPropertiesOutput {
  DataLakeAccessProperties?: DataLakeAccessPropertiesOutput;
  IcebergOptimizationProperties?: IcebergOptimizationPropertiesOutput;
  CustomProperties?: { [key: string]: string | undefined };
}
export interface Catalog {
  CatalogId?: string;
  Name: string;
  ResourceArn?: string;
  Description?: string;
  Parameters?: { [key: string]: string | undefined };
  CreateTime?: Date;
  UpdateTime?: Date;
  TargetRedshiftCatalog?: TargetRedshiftCatalog;
  FederatedCatalog?: FederatedCatalog;
  CatalogProperties?: CatalogPropertiesOutput;
  CreateTableDefaultPermissions?: PrincipalPermissions[];
  CreateDatabaseDefaultPermissions?: PrincipalPermissions[];
  AllowFullTableExternalDataAccess?: AllowFullTableExternalDataAccessEnum;
}
export interface GetCatalogResponse {
  Catalog?: Catalog;
}
export interface GetCatalogImportStatusRequest {
  CatalogId?: string;
}
export interface CatalogImportStatus {
  ImportCompleted?: boolean;
  ImportTime?: Date;
  ImportedBy?: string;
}
export interface GetCatalogImportStatusResponse {
  ImportStatus?: CatalogImportStatus;
}
export type Token = string;
export interface GetCatalogsRequest {
  ParentCatalogId?: string;
  NextToken?: string;
  MaxResults?: number;
  Recursive?: boolean;
  IncludeRoot?: boolean;
  HasDatabases?: boolean;
}
export type CatalogList = Catalog[];
export interface GetCatalogsResponse {
  CatalogList: Catalog[];
  NextToken?: string;
}
export interface GetClassifierRequest {
  Name: string;
}
export interface GrokClassifier {
  Name: string;
  Classification: string;
  CreationTime?: Date;
  LastUpdated?: Date;
  Version?: number;
  GrokPattern: string;
  CustomPatterns?: string;
}
export interface XMLClassifier {
  Name: string;
  Classification: string;
  CreationTime?: Date;
  LastUpdated?: Date;
  Version?: number;
  RowTag?: string;
}
export interface JsonClassifier {
  Name: string;
  CreationTime?: Date;
  LastUpdated?: Date;
  Version?: number;
  JsonPath: string;
}
export interface CsvClassifier {
  Name: string;
  CreationTime?: Date;
  LastUpdated?: Date;
  Version?: number;
  Delimiter?: string;
  QuoteSymbol?: string;
  ContainsHeader?: CsvHeaderOption;
  Header?: string[];
  DisableValueTrimming?: boolean;
  AllowSingleColumn?: boolean;
  CustomDatatypeConfigured?: boolean;
  CustomDatatypes?: string[];
  Serde?: CsvSerdeOption;
}
export interface Classifier {
  GrokClassifier?: GrokClassifier;
  XMLClassifier?: XMLClassifier;
  JsonClassifier?: JsonClassifier;
  CsvClassifier?: CsvClassifier;
}
export interface GetClassifierResponse {
  Classifier?: Classifier;
}
export interface GetClassifiersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type ClassifierList = Classifier[];
export interface GetClassifiersResponse {
  Classifiers?: Classifier[];
  NextToken?: string;
}
export type GetColumnNamesList = string[];
export interface GetColumnStatisticsForPartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
  ColumnNames: string[];
}
export type TypeString = string;
export type ColumnStatisticsType =
  | "BOOLEAN"
  | "DATE"
  | "DECIMAL"
  | "DOUBLE"
  | "LONG"
  | "STRING"
  | "BINARY"
  | (string & {});
export type NonNegativeLong = number;
export interface BooleanColumnStatisticsData {
  NumberOfTrues: number;
  NumberOfFalses: number;
  NumberOfNulls: number;
}
export interface DateColumnStatisticsData {
  MinimumValue?: Date;
  MaximumValue?: Date;
  NumberOfNulls: number;
  NumberOfDistinctValues: number;
}
export interface DecimalNumber {
  UnscaledValue: Uint8Array;
  Scale: number;
}
export interface DecimalColumnStatisticsData {
  MinimumValue?: DecimalNumber;
  MaximumValue?: DecimalNumber;
  NumberOfNulls: number;
  NumberOfDistinctValues: number;
}
export interface DoubleColumnStatisticsData {
  MinimumValue?: number;
  MaximumValue?: number;
  NumberOfNulls: number;
  NumberOfDistinctValues: number;
}
export interface LongColumnStatisticsData {
  MinimumValue?: number;
  MaximumValue?: number;
  NumberOfNulls: number;
  NumberOfDistinctValues: number;
}
export type NonNegativeDouble = number;
export interface StringColumnStatisticsData {
  MaximumLength: number;
  AverageLength: number;
  NumberOfNulls: number;
  NumberOfDistinctValues: number;
}
export interface BinaryColumnStatisticsData {
  MaximumLength: number;
  AverageLength: number;
  NumberOfNulls: number;
}
export interface ColumnStatisticsData {
  Type: ColumnStatisticsType;
  BooleanColumnStatisticsData?: BooleanColumnStatisticsData;
  DateColumnStatisticsData?: DateColumnStatisticsData;
  DecimalColumnStatisticsData?: DecimalColumnStatisticsData;
  DoubleColumnStatisticsData?: DoubleColumnStatisticsData;
  LongColumnStatisticsData?: LongColumnStatisticsData;
  StringColumnStatisticsData?: StringColumnStatisticsData;
  BinaryColumnStatisticsData?: BinaryColumnStatisticsData;
}
export interface ColumnStatistics {
  ColumnName: string;
  ColumnType: string;
  AnalyzedTime: Date;
  StatisticsData: ColumnStatisticsData;
}
export type ColumnStatisticsList = ColumnStatistics[];
export interface ColumnError {
  ColumnName?: string;
  Error?: ErrorDetail;
}
export type ColumnErrors = ColumnError[];
export interface GetColumnStatisticsForPartitionResponse {
  ColumnStatisticsList?: ColumnStatistics[];
  Errors?: ColumnError[];
}
export interface GetColumnStatisticsForTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  ColumnNames: string[];
}
export interface GetColumnStatisticsForTableResponse {
  ColumnStatisticsList?: ColumnStatistics[];
  Errors?: ColumnError[];
}
export interface GetColumnStatisticsTaskRunRequest {
  ColumnStatisticsTaskRunId: string;
}
export type TableName = string;
export type PositiveInteger = number;
export type ComputationType = "FULL" | "INCREMENTAL" | (string & {});
export type ColumnStatisticsState =
  | "STARTING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export interface ColumnStatisticsTaskRun {
  CustomerId?: string;
  ColumnStatisticsTaskRunId?: string;
  DatabaseName?: string;
  TableName?: string;
  ColumnNameList?: string[];
  CatalogID?: string;
  Role?: string;
  SampleSize?: number;
  SecurityConfiguration?: string;
  NumberOfWorkers?: number;
  WorkerType?: string;
  ComputationType?: ComputationType;
  Status?: ColumnStatisticsState;
  CreationTime?: Date;
  LastUpdated?: Date;
  StartTime?: Date;
  EndTime?: Date;
  ErrorMessage?: string;
  DPUSeconds?: number;
}
export interface GetColumnStatisticsTaskRunResponse {
  ColumnStatisticsTaskRun?: ColumnStatisticsTaskRun;
}
export interface GetColumnStatisticsTaskRunsRequest {
  DatabaseName: string;
  TableName: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ColumnStatisticsTaskRunsList = ColumnStatisticsTaskRun[];
export interface GetColumnStatisticsTaskRunsResponse {
  ColumnStatisticsTaskRuns?: ColumnStatisticsTaskRun[];
  NextToken?: string;
}
export interface GetColumnStatisticsTaskSettingsRequest {
  DatabaseName: string;
  TableName: string;
}
export type ScheduleType = "CRON" | "AUTO" | (string & {});
export type SettingSource = "CATALOG" | "TABLE" | (string & {});
export type ExecutionStatus = "FAILED" | "STARTED" | (string & {});
export interface ExecutionAttempt {
  Status?: ExecutionStatus;
  ColumnStatisticsTaskRunId?: string;
  ExecutionTimestamp?: Date;
  ErrorMessage?: string;
}
export interface ColumnStatisticsTaskSettings {
  DatabaseName?: string;
  TableName?: string;
  Schedule?: Schedule;
  ColumnNameList?: string[];
  CatalogID?: string;
  Role?: string;
  SampleSize?: number;
  SecurityConfiguration?: string;
  ScheduleType?: ScheduleType;
  SettingSource?: SettingSource;
  LastExecutionAttempt?: ExecutionAttempt;
}
export interface GetColumnStatisticsTaskSettingsResponse {
  ColumnStatisticsTaskSettings?: ColumnStatisticsTaskSettings;
}
export interface GetConnectionRequest {
  CatalogId?: string;
  Name: string;
  HidePassword?: boolean;
  ApplyOverrideForComputeEnvironment?: ComputeEnvironment;
}
export type LongValueString = string;
export interface OAuth2Properties {
  OAuth2GrantType?: OAuth2GrantType;
  OAuth2ClientApplication?: OAuth2ClientApplication;
  TokenUrl?: string;
  TokenUrlParametersMap?: { [key: string]: string | undefined };
}
export interface AuthenticationConfiguration {
  AuthenticationType?: AuthenticationType;
  SecretArn?: string;
  KmsKeyArn?: string;
  OAuth2Properties?: OAuth2Properties;
}
export type ConnectionSchemaVersion = number;
export interface Connection {
  Name?: string;
  Description?: string;
  ConnectionType?: ConnectionType;
  MatchCriteria?: string[];
  ConnectionProperties?: { [key: string]: string | undefined };
  SparkProperties?: { [key: string]: string | undefined };
  AthenaProperties?: { [key: string]: string | undefined };
  PythonProperties?: { [key: string]: string | undefined };
  PhysicalConnectionRequirements?: PhysicalConnectionRequirements;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  LastUpdatedBy?: string;
  Status?: ConnectionStatus;
  StatusReason?: string;
  LastConnectionValidationTime?: Date;
  AuthenticationConfiguration?: AuthenticationConfiguration;
  ConnectionSchemaVersion?: number;
  CompatibleComputeEnvironments?: ComputeEnvironment[];
}
export interface GetConnectionResponse {
  Connection?: Connection;
}
export interface GetConnectionsFilter {
  MatchCriteria?: string[];
  ConnectionType?: ConnectionType;
  ConnectionSchemaVersion?: number;
}
export interface GetConnectionsRequest {
  CatalogId?: string;
  Filter?: GetConnectionsFilter;
  HidePassword?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export type ConnectionList = Connection[];
export interface GetConnectionsResponse {
  ConnectionList?: Connection[];
  NextToken?: string;
}
export interface GetCrawlerRequest {
  Name: string;
}
export interface GetCrawlerResponse {
  Crawler?: Crawler;
}
export interface GetCrawlerMetricsRequest {
  CrawlerNameList?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export interface CrawlerMetrics {
  CrawlerName?: string;
  TimeLeftSeconds?: number;
  StillEstimating?: boolean;
  LastRuntimeSeconds?: number;
  MedianRuntimeSeconds?: number;
  TablesCreated?: number;
  TablesUpdated?: number;
  TablesDeleted?: number;
}
export type CrawlerMetricsList = CrawlerMetrics[];
export interface GetCrawlerMetricsResponse {
  CrawlerMetricsList?: CrawlerMetrics[];
  NextToken?: string;
}
export interface GetCrawlersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface GetCrawlersResponse {
  Crawlers?: Crawler[];
  NextToken?: string;
}
export interface GetCustomEntityTypeRequest {
  Name: string;
}
export interface GetCustomEntityTypeResponse {
  Name?: string;
  RegexString?: string;
  ContextWords?: string[];
}
export type GlueResourceType = "JOB" | "SESSION" | (string & {});
export interface GetDashboardUrlRequest {
  ResourceId: string;
  ResourceType: GlueResourceType;
  RequestOrigin?: string;
}
export type SensitiveUrl = string | redacted.Redacted<string>;
export interface GetDashboardUrlResponse {
  Url: string | redacted.Redacted<string>;
}
export interface GetDatabaseRequest {
  CatalogId?: string;
  Name: string;
}
export interface Database {
  Name: string;
  Description?: string;
  LocationUri?: string;
  Parameters?: { [key: string]: string | undefined };
  CreateTime?: Date;
  CreateTableDefaultPermissions?: PrincipalPermissions[];
  TargetDatabase?: DatabaseIdentifier;
  CatalogId?: string;
  FederatedDatabase?: FederatedDatabase;
}
export interface GetDatabaseResponse {
  Database?: Database;
}
export type CatalogGetterPageSize = number;
export type ResourceShareType = "FOREIGN" | "ALL" | "FEDERATED" | (string & {});
export type DatabaseAttributes = "NAME" | "TARGET_DATABASE" | (string & {});
export type DatabaseAttributesList = DatabaseAttributes[];
export interface GetDatabasesRequest {
  CatalogId?: string;
  NextToken?: string;
  MaxResults?: number;
  ResourceShareType?: ResourceShareType;
  AttributesToGet?: DatabaseAttributes[];
}
export type DatabaseList = Database[];
export interface GetDatabasesResponse {
  DatabaseList: Database[];
  NextToken?: string;
}
export interface GetDataCatalogEncryptionSettingsRequest {
  CatalogId?: string;
}
export type CatalogEncryptionMode =
  | "DISABLED"
  | "SSE-KMS"
  | "SSE-KMS-WITH-SERVICE-ROLE"
  | (string & {});
export interface EncryptionAtRest {
  CatalogEncryptionMode: CatalogEncryptionMode;
  SseAwsKmsKeyId?: string;
  CatalogEncryptionServiceRole?: string;
}
export interface ConnectionPasswordEncryption {
  ReturnConnectionPasswordEncrypted: boolean;
  AwsKmsKeyId?: string;
}
export interface DataCatalogEncryptionSettings {
  EncryptionAtRest?: EncryptionAtRest;
  ConnectionPasswordEncryption?: ConnectionPasswordEncryption;
}
export interface GetDataCatalogEncryptionSettingsResponse {
  DataCatalogEncryptionSettings?: DataCatalogEncryptionSettings;
}
export interface GetDataCatalogExportConfigurationInput {}
export type ExportSetting = "ENABLED" | "DISABLED" | (string & {});
export type ExportStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | "FAILED"
  | (string & {});
export type SseAlgorithm = string;
export type KmsKeyArnString = string;
export interface ExportEncryptionConfiguration {
  SseAlgorithm?: string;
  KmsKeyArn?: string;
}
export type S3TableBucketArn = string;
export interface GetDataCatalogExportConfigurationOutput {
  ExportSetting?: ExportSetting;
  Status?: ExportStatus;
  EncryptionConfiguration?: ExportEncryptionConfiguration;
  S3TableBucketArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetDataflowGraphRequest {
  PythonScript?: string;
}
export interface GetDataflowGraphResponse {
  DagNodes?: CodeGenNode[];
  DagEdges?: CodeGenEdge[];
}
export interface GetDataQualityModelRequest {
  StatisticId?: string;
  ProfileId: string;
}
export type DataQualityModelStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export interface GetDataQualityModelResponse {
  Status?: DataQualityModelStatus;
  StartedOn?: Date;
  CompletedOn?: Date;
  FailureReason?: string;
}
export interface GetDataQualityModelResultRequest {
  StatisticId: string;
  ProfileId: string;
}
export interface StatisticModelResult {
  LowerBound?: number;
  UpperBound?: number;
  PredictedValue?: number;
  ActualValue?: number;
  Date?: Date;
  InclusionAnnotation?: InclusionAnnotationValue;
}
export type StatisticModelResults = StatisticModelResult[];
export interface GetDataQualityModelResultResponse {
  CompletedOn?: Date;
  Model?: StatisticModelResult[];
}
export interface GetDataQualityResultRequest {
  ResultId: string;
}
export interface GetDataQualityResultResponse {
  ResultId?: string;
  ProfileId?: string;
  Score?: number;
  DataSource?: DataSource;
  RulesetName?: string;
  EvaluationContext?: string;
  StartedOn?: Date;
  CompletedOn?: Date;
  JobName?: string;
  JobRunId?: string;
  RulesetEvaluationRunId?: string;
  RuleResults?: DataQualityRuleResult[];
  AnalyzerResults?: DataQualityAnalyzerResult[];
  Observations?: DataQualityObservation[];
  AggregatedMetrics?: DataQualityAggregatedMetrics;
}
export interface GetDataQualityRuleRecommendationRunRequest {
  RunId: string;
}
export interface DataQualityRuleRecommendationRunAdditionalRunOptions {
  CustomLogGroupPrefix?: string;
}
export interface GetDataQualityRuleRecommendationRunResponse {
  RunId?: string;
  DataSource?: DataSource;
  Role?: string;
  NumberOfWorkers?: number;
  Timeout?: number;
  Status?: TaskStatusType;
  ErrorString?: string;
  StartedOn?: Date;
  LastModifiedOn?: Date;
  CompletedOn?: Date;
  ExecutionTime?: number;
  RecommendedRuleset?: string;
  CreatedRulesetName?: string;
  DataQualitySecurityConfiguration?: string;
  AdditionalRunOptions?: DataQualityRuleRecommendationRunAdditionalRunOptions;
}
export interface GetDataQualityRulesetRequest {
  Name: string;
}
export interface GetDataQualityRulesetResponse {
  Name?: string;
  Description?: string;
  Ruleset?: string;
  TargetTable?: DataQualityTargetTable;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  RecommendationRunId?: string;
  DataQualitySecurityConfiguration?: string;
}
export interface GetDataQualityRulesetEvaluationRunRequest {
  RunId: string;
}
export interface GetDataQualityRulesetEvaluationRunResponse {
  RunId?: string;
  DataSource?: DataSource;
  Role?: string;
  NumberOfWorkers?: number;
  Timeout?: number;
  AdditionalRunOptions?: DataQualityEvaluationRunAdditionalRunOptions;
  Status?: TaskStatusType;
  ErrorString?: string;
  StartedOn?: Date;
  LastModifiedOn?: Date;
  CompletedOn?: Date;
  ExecutionTime?: number;
  RulesetNames?: string[];
  ResultIds?: string[];
  AdditionalDataSources?: { [key: string]: DataSource | undefined };
}
export interface GetDevEndpointRequest {
  EndpointName: string;
}
export interface GetDevEndpointResponse {
  DevEndpoint?: DevEndpoint;
}
export interface GetDevEndpointsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface GetDevEndpointsResponse {
  DevEndpoints?: DevEndpoint[];
  NextToken?: string;
}
export type OptionKey = string;
export type OptionValue = string;
export type ConnectionOptions = { [key: string]: string | undefined };
export type FilterPredicate = string;
export type Limit = number;
export type SelectedFields = string[];
export interface GetEntityRecordsRequest {
  ConnectionName?: string;
  CatalogId?: string;
  EntityName: string;
  NextToken?: string;
  DataStoreApiVersion?: string;
  ConnectionOptions?: { [key: string]: string | undefined };
  FilterPredicate?: string;
  Limit: number;
  OrderBy?: string;
  SelectedFields?: string[];
}
export type Record = unknown;
export type Records = any[];
export interface GetEntityRecordsResponse {
  Records?: any[];
  NextToken?: string;
}
export interface GetFormTypeRequest {
  Identifier: string;
}
export type FormTypeName = string;
export type FormTypeSchema = string;
export interface GetFormTypeResponse {
  Id?: string;
  Name?: string;
  Schema?: string;
}
export interface GetGlossaryRequest {
  Identifier: string;
}
export interface GetGlossaryResponse {
  Id?: string;
  Name?: string;
  Description?: string;
}
export interface GetGlossaryTermRequest {
  Identifier: string;
}
export interface GetGlossaryTermResponse {
  Id?: string;
  GlossaryId?: string;
  Name?: string;
  ShortDescription?: string;
  LongDescription?: string;
}
export interface GetGlueIdentityCenterConfigurationRequest {}
export type OrchestrationStringList = string[];
export interface GetGlueIdentityCenterConfigurationResponse {
  ApplicationArn?: string;
  InstanceArn?: string;
  Scopes?: string[];
  UserBackgroundSessionsEnabled?: boolean;
}
export interface GetIntegrationResourcePropertyRequest {
  ResourceArn: string;
}
export interface GetIntegrationResourcePropertyResponse {
  ResourceArn?: string;
  ResourcePropertyArn?: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
}
export interface GetIntegrationTablePropertiesRequest {
  ResourceArn: string;
  TableName: string;
}
export interface GetIntegrationTablePropertiesResponse {
  ResourceArn?: string;
  TableName?: string;
  SourceTableConfig?: SourceTableConfig;
  TargetTableConfig?: TargetTableConfig;
}
export interface GetJobRequest {
  JobName: string;
}
export interface GetJobResponse {
  Job?: Job;
}
export type JobName = string;
export type RunId = string;
export interface GetJobBookmarkRequest {
  JobName: string;
  RunId?: string;
}
export type JsonValue = string;
export interface JobBookmarkEntry {
  JobName?: string;
  Version?: number;
  Run?: number;
  Attempt?: number;
  PreviousRunId?: string;
  RunId?: string;
  JobBookmark?: string;
}
export interface GetJobBookmarkResponse {
  JobBookmarkEntry?: JobBookmarkEntry;
}
export interface GetJobRunRequest {
  JobName: string;
  RunId: string;
  PredecessorsIncluded?: boolean;
}
export interface GetJobRunResponse {
  JobRun?: JobRun;
}
export type OrchestrationPageSize200 = number;
export interface GetJobRunsRequest {
  JobName: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface GetJobRunsResponse {
  JobRuns?: JobRun[];
  NextToken?: string;
}
export interface GetJobsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface GetJobsResponse {
  Jobs?: Job[];
  NextToken?: string;
}
export interface CatalogEntry {
  DatabaseName: string;
  TableName: string;
}
export type CatalogEntries = CatalogEntry[];
export interface Location {
  Jdbc?: CodeGenNodeArg[];
  S3?: CodeGenNodeArg[];
  DynamoDB?: CodeGenNodeArg[];
}
export interface GetMappingRequest {
  Source: CatalogEntry;
  Sinks?: CatalogEntry[];
  Location?: Location;
}
export type SchemaPathString = string;
export type FieldType = string;
export interface MappingEntry {
  SourceTable?: string;
  SourcePath?: string;
  SourceType?: string;
  TargetTable?: string;
  TargetPath?: string;
  TargetType?: string;
}
export type MappingList = MappingEntry[];
export interface GetMappingResponse {
  Mapping: MappingEntry[];
}
export type UUIDv4 = string;
export interface GetMaterializedViewRefreshTaskRunRequest {
  CatalogId: string;
  MaterializedViewRefreshTaskRunId: string;
}
export type MaterializedViewRefreshState =
  | "STARTING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export type MaterializedViewRefreshType =
  | "FULL"
  | "INCREMENTAL"
  | (string & {});
export type ByteCount = number;
export interface MaterializedViewRefreshTaskRun {
  CustomerId?: string;
  MaterializedViewRefreshTaskRunId?: string;
  DatabaseName?: string;
  TableName?: string;
  CatalogId?: string;
  Role?: string;
  Status?: MaterializedViewRefreshState;
  CreationTime?: Date;
  LastUpdated?: Date;
  StartTime?: Date;
  EndTime?: Date;
  ErrorMessage?: string;
  DPUSeconds?: number;
  RefreshType?: MaterializedViewRefreshType;
  ProcessedBytes?: number;
}
export interface GetMaterializedViewRefreshTaskRunResponse {
  MaterializedViewRefreshTaskRun?: MaterializedViewRefreshTaskRun;
}
export interface GetMLTaskRunRequest {
  TransformId: string;
  TaskRunId: string;
}
export type TaskType =
  | "EVALUATION"
  | "LABELING_SET_GENERATION"
  | "IMPORT_LABELS"
  | "EXPORT_LABELS"
  | "FIND_MATCHES"
  | (string & {});
export type ReplaceBoolean = boolean;
export interface ImportLabelsTaskRunProperties {
  InputS3Path?: string;
  Replace?: boolean;
}
export interface ExportLabelsTaskRunProperties {
  OutputS3Path?: string;
}
export interface LabelingSetGenerationTaskRunProperties {
  OutputS3Path?: string;
}
export interface FindMatchesTaskRunProperties {
  JobId?: string;
  JobName?: string;
  JobRunId?: string;
}
export interface TaskRunProperties {
  TaskType?: TaskType;
  ImportLabelsTaskRunProperties?: ImportLabelsTaskRunProperties;
  ExportLabelsTaskRunProperties?: ExportLabelsTaskRunProperties;
  LabelingSetGenerationTaskRunProperties?: LabelingSetGenerationTaskRunProperties;
  FindMatchesTaskRunProperties?: FindMatchesTaskRunProperties;
}
export interface GetMLTaskRunResponse {
  TransformId?: string;
  TaskRunId?: string;
  Status?: TaskStatusType;
  LogGroupName?: string;
  Properties?: TaskRunProperties;
  ErrorString?: string;
  StartedOn?: Date;
  LastModifiedOn?: Date;
  CompletedOn?: Date;
  ExecutionTime?: number;
}
export type PaginationToken = string;
export interface TaskRunFilterCriteria {
  TaskRunType?: TaskType;
  Status?: TaskStatusType;
  StartedBefore?: Date;
  StartedAfter?: Date;
}
export type TaskRunSortColumnType =
  | "TASK_RUN_TYPE"
  | "STATUS"
  | "STARTED"
  | (string & {});
export type SortDirectionType = "DESCENDING" | "ASCENDING" | (string & {});
export interface TaskRunSortCriteria {
  Column: TaskRunSortColumnType;
  SortDirection: SortDirectionType;
}
export interface GetMLTaskRunsRequest {
  TransformId: string;
  NextToken?: string;
  MaxResults?: number;
  Filter?: TaskRunFilterCriteria;
  Sort?: TaskRunSortCriteria;
}
export interface TaskRun {
  TransformId?: string;
  TaskRunId?: string;
  Status?: TaskStatusType;
  LogGroupName?: string;
  Properties?: TaskRunProperties;
  ErrorString?: string;
  StartedOn?: Date;
  LastModifiedOn?: Date;
  CompletedOn?: Date;
  ExecutionTime?: number;
}
export type TaskRunList = TaskRun[];
export interface GetMLTaskRunsResponse {
  TaskRuns?: TaskRun[];
  NextToken?: string;
}
export interface GetMLTransformRequest {
  TransformId: string;
}
export type TransformStatusType =
  | "NOT_READY"
  | "READY"
  | "DELETING"
  | (string & {});
export type RecordsCount = number;
export interface ConfusionMatrix {
  NumTruePositives?: number;
  NumFalsePositives?: number;
  NumTrueNegatives?: number;
  NumFalseNegatives?: number;
}
export interface ColumnImportance {
  ColumnName?: string;
  Importance?: number;
}
export type ColumnImportanceList = ColumnImportance[];
export interface FindMatchesMetrics {
  AreaUnderPRCurve?: number;
  Precision?: number;
  Recall?: number;
  F1?: number;
  ConfusionMatrix?: ConfusionMatrix;
  ColumnImportances?: ColumnImportance[];
}
export interface EvaluationMetrics {
  TransformType: TransformType;
  FindMatchesMetrics?: FindMatchesMetrics;
}
export type LabelCount = number;
export interface SchemaColumn {
  Name?: string;
  DataType?: string;
}
export type TransformSchema = SchemaColumn[];
export interface GetMLTransformResponse {
  TransformId?: string;
  Name?: string;
  Description?: string;
  Status?: TransformStatusType;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  InputRecordTables?: GlueTable[];
  Parameters?: TransformParameters;
  EvaluationMetrics?: EvaluationMetrics;
  LabelCount?: number;
  Schema?: SchemaColumn[];
  Role?: string;
  GlueVersion?: string;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  Timeout?: number;
  MaxRetries?: number;
  TransformEncryption?: TransformEncryption;
}
export interface TransformFilterCriteria {
  Name?: string;
  TransformType?: TransformType;
  Status?: TransformStatusType;
  GlueVersion?: string;
  CreatedBefore?: Date;
  CreatedAfter?: Date;
  LastModifiedBefore?: Date;
  LastModifiedAfter?: Date;
  Schema?: SchemaColumn[];
}
export type TransformSortColumnType =
  | "NAME"
  | "TRANSFORM_TYPE"
  | "STATUS"
  | "CREATED"
  | "LAST_MODIFIED"
  | (string & {});
export interface TransformSortCriteria {
  Column: TransformSortColumnType;
  SortDirection: SortDirectionType;
}
export interface GetMLTransformsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filter?: TransformFilterCriteria;
  Sort?: TransformSortCriteria;
}
export interface MLTransform {
  TransformId?: string;
  Name?: string;
  Description?: string;
  Status?: TransformStatusType;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  InputRecordTables?: GlueTable[];
  Parameters?: TransformParameters;
  EvaluationMetrics?: EvaluationMetrics;
  LabelCount?: number;
  Schema?: SchemaColumn[];
  Role?: string;
  GlueVersion?: string;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  Timeout?: number;
  MaxRetries?: number;
  TransformEncryption?: TransformEncryption;
}
export type TransformList = MLTransform[];
export interface GetMLTransformsResponse {
  Transforms: MLTransform[];
  NextToken?: string;
}
export interface GetPartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
  AuditContext?: AuditContext;
}
export interface GetPartitionResponse {
  Partition?: Partition;
}
export interface GetPartitionIndexesRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  NextToken?: string;
}
export interface KeySchemaElement {
  Name: string;
  Type: string;
}
export type KeySchemaElementList = KeySchemaElement[];
export type PartitionIndexStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type BackfillErrorCode =
  | "ENCRYPTED_PARTITION_ERROR"
  | "INTERNAL_ERROR"
  | "INVALID_PARTITION_TYPE_DATA_ERROR"
  | "MISSING_PARTITION_VALUE_ERROR"
  | "UNSUPPORTED_PARTITION_CHARACTER_ERROR"
  | (string & {});
export type BackfillErroredPartitionsList = PartitionValueList[];
export interface BackfillError {
  Code?: BackfillErrorCode;
  Partitions?: PartitionValueList[];
}
export type BackfillErrors = BackfillError[];
export interface PartitionIndexDescriptor {
  IndexName: string;
  Keys: KeySchemaElement[];
  IndexStatus: PartitionIndexStatus;
  BackfillErrors?: BackfillError[];
}
export type PartitionIndexDescriptorList = PartitionIndexDescriptor[];
export interface GetPartitionIndexesResponse {
  PartitionIndexDescriptorList?: PartitionIndexDescriptor[];
  NextToken?: string;
}
export type PredicateString = string;
export type TotalSegmentsInteger = number;
export interface Segment {
  SegmentNumber: number;
  TotalSegments: number;
}
export type BooleanNullable = boolean;
export interface GetPartitionsRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  Expression?: string;
  NextToken?: string;
  Segment?: Segment;
  MaxResults?: number;
  ExcludeColumnSchema?: boolean;
  TransactionId?: string;
  QueryAsOfTime?: Date;
  AuditContext?: AuditContext;
}
export interface GetPartitionsResponse {
  Partitions?: Partition[];
  NextToken?: string;
}
export type AdditionalPlanOptionsMap = { [key: string]: string | undefined };
export interface GetPlanRequest {
  Mapping: MappingEntry[];
  Source: CatalogEntry;
  Sinks?: CatalogEntry[];
  Location?: Location;
  Language?: Language;
  AdditionalPlanOptionsMap?: { [key: string]: string | undefined };
}
export interface GetPlanResponse {
  PythonScript?: string;
  ScalaCode?: string;
}
export interface GetRegistryInput {
  RegistryId: RegistryId;
}
export type CreatedTimestamp = string;
export type UpdatedTimestamp = string;
export interface GetRegistryResponse {
  RegistryName?: string;
  RegistryArn?: string;
  Description?: string;
  Status?: RegistryStatus;
  CreatedTime?: string;
  UpdatedTime?: string;
}
export interface GetResourcePoliciesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type PolicyJsonString = string;
export interface GluePolicy {
  PolicyInJson?: string;
  PolicyHash?: string;
  CreateTime?: Date;
  UpdateTime?: Date;
}
export type GetResourcePoliciesResponseList = GluePolicy[];
export interface GetResourcePoliciesResponse {
  GetResourcePoliciesResponseList?: GluePolicy[];
  NextToken?: string;
}
export interface GetResourcePolicyRequest {
  ResourceArn?: string;
}
export interface GetResourcePolicyResponse {
  PolicyInJson?: string;
  PolicyHash?: string;
  CreateTime?: Date;
  UpdateTime?: Date;
}
export interface GetSchemaInput {
  SchemaId: SchemaId;
}
export interface GetSchemaResponse {
  RegistryName?: string;
  RegistryArn?: string;
  SchemaName?: string;
  SchemaArn?: string;
  Description?: string;
  DataFormat?: DataFormat;
  Compatibility?: Compatibility;
  SchemaCheckpoint?: number;
  LatestSchemaVersion?: number;
  NextSchemaVersion?: number;
  SchemaStatus?: SchemaStatus;
  CreatedTime?: string;
  UpdatedTime?: string;
}
export interface GetSchemaByDefinitionInput {
  SchemaId: SchemaId;
  SchemaDefinition: string;
}
export interface GetSchemaByDefinitionResponse {
  SchemaVersionId?: string;
  SchemaArn?: string;
  DataFormat?: DataFormat;
  Status?: SchemaVersionStatus;
  CreatedTime?: string;
}
export type LatestSchemaVersionBoolean = boolean;
export interface SchemaVersionNumber {
  LatestVersion?: boolean;
  VersionNumber?: number;
}
export interface GetSchemaVersionInput {
  SchemaId?: SchemaId;
  SchemaVersionId?: string;
  SchemaVersionNumber?: SchemaVersionNumber;
}
export interface GetSchemaVersionResponse {
  SchemaVersionId?: string;
  SchemaDefinition?: string;
  DataFormat?: DataFormat;
  SchemaArn?: string;
  VersionNumber?: number;
  Status?: SchemaVersionStatus;
  CreatedTime?: string;
}
export type SchemaDiffType = "SYNTAX_DIFF" | (string & {});
export interface GetSchemaVersionsDiffInput {
  SchemaId: SchemaId;
  FirstSchemaVersionNumber: SchemaVersionNumber;
  SecondSchemaVersionNumber: SchemaVersionNumber;
  SchemaDiffType: SchemaDiffType;
}
export type SchemaDefinitionDiff = string;
export interface GetSchemaVersionsDiffResponse {
  Diff?: string;
}
export interface GetSecurityConfigurationRequest {
  Name: string;
}
export interface SecurityConfiguration {
  Name?: string;
  CreatedTimeStamp?: Date;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export interface GetSecurityConfigurationResponse {
  SecurityConfiguration?: SecurityConfiguration;
}
export interface GetSecurityConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type SecurityConfigurationList = SecurityConfiguration[];
export interface GetSecurityConfigurationsResponse {
  SecurityConfigurations?: SecurityConfiguration[];
  NextToken?: string;
}
export interface GetSessionRequest {
  Id: string;
  RequestOrigin?: string;
}
export interface GetSessionResponse {
  Session?: Session;
}
export interface GetSessionEndpointRequest {
  SessionId: string;
}
export type SparkConnectEndpointUrl = string;
export type SensitiveString = string | redacted.Redacted<string>;
export interface SessionEndpoint {
  Url: string;
  AuthToken: string | redacted.Redacted<string>;
  AuthTokenExpirationTime: Date;
}
export interface GetSessionEndpointResponse {
  SparkConnect: SessionEndpoint;
}
export interface GetStatementRequest {
  SessionId: string;
  Id: number;
  RequestOrigin?: string;
}
export type StatementState =
  | "WAITING"
  | "RUNNING"
  | "AVAILABLE"
  | "CANCELLING"
  | "CANCELLED"
  | "ERROR"
  | (string & {});
export interface StatementOutputData {
  TextPlain?: string;
}
export interface StatementOutput {
  Data?: StatementOutputData;
  ExecutionCount?: number;
  Status?: StatementState;
  ErrorName?: string;
  ErrorValue?: string;
  Traceback?: string[];
}
export type LongValue = number;
export interface Statement {
  Id?: number;
  Code?: string;
  State?: StatementState;
  Output?: StatementOutput;
  Progress?: number;
  StartedOn?: number;
  CompletedOn?: number;
}
export interface GetStatementResponse {
  Statement?: Statement;
}
export type TableAttributes =
  | "NAME"
  | "TABLE_TYPE"
  | "DEFAULT"
  | "LATEST_ICEBERG_METADATA"
  | (string & {});
export type TableAttributesList = TableAttributes[];
export interface GetTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  Name: string;
  TransactionId?: string;
  QueryAsOfTime?: Date;
  AuditContext?: AuditContext;
  IncludeStatusDetails?: boolean;
  AttributesToGet?: TableAttributes[];
}
export interface FederatedTable {
  Identifier?: string;
  DatabaseIdentifier?: string;
  ConnectionName?: string;
  ConnectionType?: string;
}
export interface ViewRepresentation {
  Dialect?: ViewDialect;
  DialectVersion?: string;
  ViewOriginalText?: string;
  ViewExpandedText?: string;
  ValidationConnection?: string;
  IsStale?: boolean;
}
export type ViewRepresentationList = ViewRepresentation[];
export interface ViewDefinition {
  IsProtected?: boolean;
  Definer?: string;
  ViewVersionId?: number;
  ViewVersionToken?: string;
  RefreshSeconds?: number;
  LastRefreshType?: LastRefreshType;
  SubObjects?: string[];
  SubObjectVersionIds?: number[];
  Representations?: ViewRepresentation[];
}
export type TableIdString = string;
export type IcebergSchemaList = IcebergSchema[];
export type IcebergPartitionSpecList = IcebergPartitionSpec[];
export type IcebergSortOrderList = IcebergSortOrder[];
export interface IcebergTableMetadata {
  FormatVersion?: string;
  TableUuid?: string;
  Location?: string;
  Properties?: { [key: string]: string | undefined };
  Schemas?: IcebergSchema[];
  CurrentSchemaId?: number;
  LastColumnId?: number;
  PartitionSpecs?: IcebergPartitionSpec[];
  DefaultSpecId?: number;
  LastPartitionId?: number;
  SortOrders?: IcebergSortOrder[];
  DefaultSortOrderId?: number;
}
export type ResourceAction = "UPDATE" | "CREATE" | (string & {});
export type ResourceState =
  | "QUEUED"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "STOPPED"
  | "FAILED"
  | (string & {});
export interface ViewValidation {
  Dialect?: ViewDialect;
  DialectVersion?: string;
  ViewValidationText?: string;
  UpdateTime?: Date;
  State?: ResourceState;
  Error?: ErrorDetail;
}
export type ViewValidationList = ViewValidation[];
export interface StatusDetails {
  RequestedChange?: Table;
  ViewValidations?: ViewValidation[];
}
export interface TableStatus {
  RequestedBy?: string;
  UpdatedBy?: string;
  RequestTime?: Date;
  UpdateTime?: Date;
  Action?: ResourceAction;
  State?: ResourceState;
  Error?: ErrorDetail;
  Details?: StatusDetails;
}
export interface Table {
  Name: string;
  DatabaseName?: string;
  Description?: string;
  Owner?: string;
  CreateTime?: Date;
  UpdateTime?: Date;
  LastAccessTime?: Date;
  LastAnalyzedTime?: Date;
  Retention?: number;
  StorageDescriptor?: StorageDescriptor;
  PartitionKeys?: Column[];
  ViewOriginalText?: string;
  ViewExpandedText?: string;
  TableType?: string;
  Parameters?: { [key: string]: string | undefined };
  CreatedBy?: string;
  IsRegisteredWithLakeFormation?: boolean;
  TargetTable?: TableIdentifier;
  CatalogId?: string;
  VersionId?: string;
  FederatedTable?: FederatedTable;
  ViewDefinition?: ViewDefinition;
  IsMultiDialectView?: boolean;
  IsMaterializedView?: boolean;
  IcebergTableMetadata?: IcebergTableMetadata;
  Status?: TableStatus;
}
export interface GetTableResponse {
  Table?: Table;
}
export interface GetTableOptimizerRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Type: TableOptimizerType;
}
export interface GetTableOptimizerResponse {
  CatalogId?: string;
  DatabaseName?: string;
  TableName?: string;
  TableOptimizer?: TableOptimizer;
}
export type FilterString = string;
export interface GetTablesRequest {
  CatalogId?: string;
  DatabaseName: string;
  Expression?: string;
  NextToken?: string;
  MaxResults?: number;
  TransactionId?: string;
  QueryAsOfTime?: Date;
  AuditContext?: AuditContext;
  IncludeStatusDetails?: boolean;
  AttributesToGet?: TableAttributes[];
}
export type TableList = Table[];
export interface GetTablesResponse {
  TableList?: Table[];
  NextToken?: string;
}
export interface GetTableVersionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  VersionId?: string;
  AuditContext?: AuditContext;
}
export interface TableVersion {
  Table?: Table;
  VersionId?: string;
}
export interface GetTableVersionResponse {
  TableVersion?: TableVersion;
}
export interface GetTableVersionsRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  NextToken?: string;
  MaxResults?: number;
  AuditContext?: AuditContext;
}
export type GetTableVersionsList = TableVersion[];
export interface GetTableVersionsResponse {
  TableVersions?: TableVersion[];
  NextToken?: string;
}
export interface GetTagsRequest {
  ResourceArn: string;
}
export interface GetTagsResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface GetTriggerRequest {
  Name: string;
}
export interface GetTriggerResponse {
  Trigger?: Trigger;
}
export interface GetTriggersRequest {
  NextToken?: string;
  DependentJobName?: string;
  MaxResults?: number;
}
export interface GetTriggersResponse {
  Triggers?: Trigger[];
  NextToken?: string;
}
export type PermissionType =
  | "COLUMN_PERMISSION"
  | "CELL_FILTER_PERMISSION"
  | "NESTED_PERMISSION"
  | "NESTED_CELL_PERMISSION"
  | (string & {});
export type PermissionTypeList = PermissionType[];
export interface GetUnfilteredPartitionMetadataRequest {
  Region?: string;
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
  AuditContext?: AuditContext;
  SupportedPermissionTypes: PermissionType[];
  QuerySessionContext?: QuerySessionContext;
}
export interface GetUnfilteredPartitionMetadataResponse {
  Partition?: Partition;
  AuthorizedColumns?: string[];
  IsRegisteredWithLakeFormation?: boolean;
}
export interface GetUnfilteredPartitionsMetadataRequest {
  Region?: string;
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Expression?: string;
  AuditContext?: AuditContext;
  SupportedPermissionTypes: PermissionType[];
  NextToken?: string;
  Segment?: Segment;
  MaxResults?: number;
  QuerySessionContext?: QuerySessionContext;
}
export interface UnfilteredPartition {
  Partition?: Partition;
  AuthorizedColumns?: string[];
  IsRegisteredWithLakeFormation?: boolean;
}
export type UnfilteredPartitionList = UnfilteredPartition[];
export interface GetUnfilteredPartitionsMetadataResponse {
  UnfilteredPartitions?: UnfilteredPartition[];
  NextToken?: string;
}
export interface SupportedDialect {
  Dialect?: ViewDialect;
  DialectVersion?: string;
}
export interface GetUnfilteredTableMetadataRequest {
  Region?: string;
  CatalogId: string;
  DatabaseName: string;
  Name: string;
  AuditContext?: AuditContext;
  SupportedPermissionTypes: PermissionType[];
  ParentResourceArn?: string;
  RootResourceArn?: string;
  SupportedDialect?: SupportedDialect;
  Permissions?: Permission[];
  QuerySessionContext?: QuerySessionContext;
}
export interface ColumnRowFilter {
  ColumnName?: string;
  RowFilterExpression?: string;
}
export type ColumnRowFilterList = ColumnRowFilter[];
export interface GetUnfilteredTableMetadataResponse {
  Table?: Table;
  AuthorizedColumns?: string[];
  IsRegisteredWithLakeFormation?: boolean;
  CellFilters?: ColumnRowFilter[];
  QueryAuthorizationId?: string;
  IsMultiDialectView?: boolean;
  IsMaterializedView?: boolean;
  ResourceArn?: string;
  IsProtected?: boolean;
  Permissions?: Permission[];
  RowFilter?: string;
}
export interface GetUsageProfileRequest {
  Name: string;
}
export interface GetUsageProfileResponse {
  Name?: string;
  Description?: string;
  Configuration?: ProfileConfiguration;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
}
export interface GetUserDefinedFunctionRequest {
  CatalogId?: string;
  DatabaseName: string;
  FunctionName: string;
}
export interface UserDefinedFunction {
  FunctionName?: string;
  DatabaseName?: string;
  ClassName?: string;
  OwnerName?: string;
  FunctionType?: FunctionType;
  OwnerType?: PrincipalType;
  CreateTime?: Date;
  ResourceUris?: ResourceUri[];
  CatalogId?: string;
}
export interface GetUserDefinedFunctionResponse {
  UserDefinedFunction?: UserDefinedFunction;
}
export interface GetUserDefinedFunctionsRequest {
  CatalogId?: string;
  DatabaseName?: string;
  Pattern: string;
  FunctionType?: FunctionType;
  NextToken?: string;
  MaxResults?: number;
}
export type UserDefinedFunctionList = UserDefinedFunction[];
export interface GetUserDefinedFunctionsResponse {
  UserDefinedFunctions?: UserDefinedFunction[];
  NextToken?: string;
}
export interface GetWorkflowRequest {
  Name: string;
  IncludeGraph?: boolean;
}
export interface GetWorkflowResponse {
  Workflow?: Workflow;
}
export interface GetWorkflowRunRequest {
  Name: string;
  RunId: string;
  IncludeGraph?: boolean;
}
export interface GetWorkflowRunResponse {
  Run?: WorkflowRun;
}
export interface GetWorkflowRunPropertiesRequest {
  Name: string;
  RunId: string;
}
export interface GetWorkflowRunPropertiesResponse {
  RunProperties?: { [key: string]: string | undefined };
}
export interface GetWorkflowRunsRequest {
  Name: string;
  IncludeGraph?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export type WorkflowRuns = WorkflowRun[];
export interface GetWorkflowRunsResponse {
  Runs?: WorkflowRun[];
  NextToken?: string;
}
export interface ImportCatalogToGlueRequest {
  CatalogId?: string;
}
export interface ImportCatalogToGlueResponse {}
export interface ListAssetTypesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface AssetTypeItem {
  Id?: string;
  Name?: string;
}
export type AssetTypeItemList = AssetTypeItem[];
export interface ListAssetTypesResponse {
  Items?: AssetTypeItem[];
  NextToken?: string;
}
export type OrchestrationPageSize25 = number;
export interface ListBlueprintsRequest {
  NextToken?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
}
export interface ListBlueprintsResponse {
  Blueprints?: string[];
  NextToken?: string;
}
export interface ListColumnStatisticsTaskRunsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type ColumnStatisticsTaskRunIdList = string[];
export interface ListColumnStatisticsTaskRunsResponse {
  ColumnStatisticsTaskRunIds?: string[];
  NextToken?: string;
}
export type MaxResults = number;
export interface ListConnectionTypesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type DisplayName = string;
export type Vendor = string;
export type UrlString = string;
export interface ConnectionTypeVariant {
  ConnectionTypeVariantName?: string;
  DisplayName?: string;
  Description?: string;
  LogoUrl?: string;
}
export type ConnectionTypeVariantList = ConnectionTypeVariant[];
export interface ConnectionTypeBrief {
  ConnectionType?: ConnectionType;
  DisplayName?: string;
  Vendor?: string;
  Description?: string;
  Categories?: string[];
  Capabilities?: Capabilities;
  LogoUrl?: string;
  ConnectionTypeVariants?: ConnectionTypeVariant[];
}
export type ConnectionTypeList = ConnectionTypeBrief[];
export interface ListConnectionTypesResponse {
  ConnectionTypes?: ConnectionTypeBrief[];
  NextToken?: string;
}
export interface ListCrawlersRequest {
  MaxResults?: number;
  NextToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface ListCrawlersResponse {
  CrawlerNames?: string[];
  NextToken?: string;
}
export type FieldName =
  | "CRAWL_ID"
  | "STATE"
  | "START_TIME"
  | "END_TIME"
  | "DPU_HOUR"
  | (string & {});
export type FilterOperator =
  | "GT"
  | "GE"
  | "LT"
  | "LE"
  | "EQ"
  | "NE"
  | (string & {});
export interface CrawlsFilter {
  FieldName?: FieldName;
  FilterOperator?: FilterOperator;
  FieldValue?: string;
}
export type CrawlsFilterList = CrawlsFilter[];
export interface ListCrawlsRequest {
  CrawlerName: string;
  MaxResults?: number;
  Filters?: CrawlsFilter[];
  NextToken?: string;
}
export type CrawlId = string;
export type CrawlerHistoryState =
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export interface CrawlerHistory {
  CrawlId?: string;
  State?: CrawlerHistoryState;
  StartTime?: Date;
  EndTime?: Date;
  Summary?: string;
  ErrorMessage?: string;
  LogGroup?: string;
  LogStream?: string;
  MessagePrefix?: string;
  DPUHour?: number;
}
export type CrawlerHistoryList = CrawlerHistory[];
export interface ListCrawlsResponse {
  Crawls?: CrawlerHistory[];
  NextToken?: string;
}
export interface ListCustomEntityTypesRequest {
  NextToken?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
}
export interface ListCustomEntityTypesResponse {
  CustomEntityTypes?: CustomEntityType[];
  NextToken?: string;
}
export interface DataQualityResultFilterCriteria {
  DataSource?: DataSource;
  JobName?: string;
  JobRunId?: string;
  StartedAfter?: Date;
  StartedBefore?: Date;
}
export interface ListDataQualityResultsRequest {
  Filter?: DataQualityResultFilterCriteria;
  NextToken?: string;
  MaxResults?: number;
}
export interface DataQualityResultDescription {
  ResultId?: string;
  DataSource?: DataSource;
  JobName?: string;
  JobRunId?: string;
  StartedOn?: Date;
}
export type DataQualityResultDescriptionList = DataQualityResultDescription[];
export interface ListDataQualityResultsResponse {
  Results: DataQualityResultDescription[];
  NextToken?: string;
}
export interface DataQualityRuleRecommendationRunFilter {
  DataSource: DataSource;
  StartedBefore?: Date;
  StartedAfter?: Date;
}
export interface ListDataQualityRuleRecommendationRunsRequest {
  Filter?: DataQualityRuleRecommendationRunFilter;
  NextToken?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
}
export interface DataQualityRuleRecommendationRunDescription {
  RunId?: string;
  Status?: TaskStatusType;
  StartedOn?: Date;
  DataSource?: DataSource;
  CreatedRulesetName?: string;
}
export type DataQualityRuleRecommendationRunList =
  DataQualityRuleRecommendationRunDescription[];
export interface ListDataQualityRuleRecommendationRunsResponse {
  Runs?: DataQualityRuleRecommendationRunDescription[];
  NextToken?: string;
}
export interface DataQualityRulesetEvaluationRunFilter {
  DataSource: DataSource;
  StartedBefore?: Date;
  StartedAfter?: Date;
  RulesetName?: string;
}
export interface ListDataQualityRulesetEvaluationRunsRequest {
  Filter?: DataQualityRulesetEvaluationRunFilter;
  NextToken?: string;
  MaxResults?: number;
}
export interface DataQualityRulesetEvaluationRunDescription {
  RunId?: string;
  Status?: TaskStatusType;
  StartedOn?: Date;
  DataSource?: DataSource;
}
export type DataQualityRulesetEvaluationRunList =
  DataQualityRulesetEvaluationRunDescription[];
export interface ListDataQualityRulesetEvaluationRunsResponse {
  Runs?: DataQualityRulesetEvaluationRunDescription[];
  NextToken?: string;
}
export interface DataQualityRulesetFilterCriteria {
  Name?: string;
  Description?: string;
  CreatedBefore?: Date;
  CreatedAfter?: Date;
  LastModifiedBefore?: Date;
  LastModifiedAfter?: Date;
  TargetTable?: DataQualityTargetTable;
}
export interface ListDataQualityRulesetsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filter?: DataQualityRulesetFilterCriteria;
  Tags?: { [key: string]: string | undefined };
}
export interface DataQualityRulesetListDetails {
  Name?: string;
  Description?: string;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  TargetTable?: DataQualityTargetTable;
  RecommendationRunId?: string;
  RuleCount?: number;
}
export type DataQualityRulesetList = DataQualityRulesetListDetails[];
export interface ListDataQualityRulesetsResponse {
  Rulesets?: DataQualityRulesetListDetails[];
  NextToken?: string;
}
export interface TimestampFilter {
  RecordedBefore?: Date;
  RecordedAfter?: Date;
}
export interface ListDataQualityStatisticAnnotationsRequest {
  StatisticId?: string;
  ProfileId?: string;
  TimestampFilter?: TimestampFilter;
  MaxResults?: number;
  NextToken?: string;
}
export interface TimestampedInclusionAnnotation {
  Value?: InclusionAnnotationValue;
  LastModifiedOn?: Date;
}
export interface StatisticAnnotation {
  ProfileId?: string;
  StatisticId?: string;
  StatisticRecordedOn?: Date;
  InclusionAnnotation?: TimestampedInclusionAnnotation;
}
export type AnnotationList = StatisticAnnotation[];
export interface ListDataQualityStatisticAnnotationsResponse {
  Annotations?: StatisticAnnotation[];
  NextToken?: string;
}
export interface ListDataQualityStatisticsRequest {
  StatisticId?: string;
  ProfileId?: string;
  TimestampFilter?: TimestampFilter;
  MaxResults?: number;
  NextToken?: string;
}
export interface RunIdentifier {
  RunId?: string;
  JobRunId?: string;
}
export type StatisticNameString = string;
export type StatisticEvaluationLevel =
  | "Dataset"
  | "Column"
  | "Multicolumn"
  | (string & {});
export type ReferenceDatasetsList = string[];
export type StatisticPropertiesMap = { [key: string]: string | undefined };
export interface StatisticSummary {
  StatisticId?: string;
  ProfileId?: string;
  RunIdentifier?: RunIdentifier;
  StatisticName?: string;
  DoubleValue?: number;
  DistributionValue?: DistributionData;
  EvaluationLevel?: StatisticEvaluationLevel;
  ColumnsReferenced?: string[];
  ReferencedDatasets?: string[];
  StatisticProperties?: { [key: string]: string | undefined };
  RecordedOn?: Date;
  InclusionAnnotation?: TimestampedInclusionAnnotation;
}
export type StatisticSummaryList = StatisticSummary[];
export interface ListDataQualityStatisticsResponse {
  Statistics?: StatisticSummary[];
  NextToken?: string;
}
export interface ListDevEndpointsRequest {
  NextToken?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
}
export type DevEndpointNameList = string[];
export interface ListDevEndpointsResponse {
  DevEndpointNames?: string[];
  NextToken?: string;
}
export interface ListEntitiesRequest {
  ConnectionName?: string;
  CatalogId?: string;
  ParentEntityName?: string;
  NextToken?: string;
  DataStoreApiVersion?: string;
}
export type EntityLabel = string;
export type IsParentEntity = boolean;
export type EntityDescription = string;
export type Category = string;
export interface Entity {
  EntityName?: string;
  Label?: string;
  IsParentEntity?: boolean;
  Description?: string;
  Category?: string;
  CustomProperties?: { [key: string]: string | undefined };
}
export type EntityList = Entity[];
export interface ListEntitiesResponse {
  Entities?: Entity[];
  NextToken?: string;
}
export interface ListFormTypesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface FormTypeItem {
  Id?: string;
  Name?: string;
}
export type FormTypeItemList = FormTypeItem[];
export interface ListFormTypesResponse {
  Items: FormTypeItem[];
  NextToken?: string;
}
export interface ListGlossariesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface GlossaryItem {
  Id?: string;
  Name?: string;
  Description?: string;
}
export type GlossaryItemList = GlossaryItem[];
export interface ListGlossariesResponse {
  Items?: GlossaryItem[];
  NextToken?: string;
}
export interface ListGlossaryTermsRequest {
  GlossaryIdentifier: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface GlossaryTermItem {
  Id?: string;
  Name?: string;
  ShortDescription?: string;
}
export type GlossaryTermItemList = GlossaryTermItem[];
export interface ListGlossaryTermsResponse {
  Items?: GlossaryTermItem[];
  NextToken?: string;
}
export type String1024 = string;
export type IntegrationResourcePropertyFilterValues = string[];
export interface IntegrationResourcePropertyFilter {
  Name?: string;
  Values?: string[];
}
export type IntegrationResourcePropertyFilterList =
  IntegrationResourcePropertyFilter[];
export interface ListIntegrationResourcePropertiesRequest {
  Marker?: string;
  Filters?: IntegrationResourcePropertyFilter[];
  MaxRecords?: number;
}
export interface IntegrationResourceProperty {
  ResourceArn: string;
  ResourcePropertyArn?: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
}
export type IntegrationResourcePropertyList = IntegrationResourceProperty[];
export interface ListIntegrationResourcePropertiesResponse {
  IntegrationResourcePropertyList?: IntegrationResourceProperty[];
  Marker?: string;
}
export interface ListIterableFormsRequest {
  AssetIdentifier: string;
  IterableFormName: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ItemDescription = string;
export interface IterableFormListItem {
  ItemId?: string;
  ItemName?: string;
  Description?: string;
  GlossaryTerms?: string[];
}
export type IterableFormListItemList = IterableFormListItem[];
export interface ListIterableFormsResponse {
  Items?: IterableFormListItem[];
  NextToken?: string;
}
export interface ListJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
}
export interface ListJobsResponse {
  JobNames?: string[];
  NextToken?: string;
}
export interface ListMaterializedViewRefreshTaskRunsRequest {
  CatalogId: string;
  DatabaseName?: string;
  TableName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type MaterializedViewRefreshTaskRunsList =
  MaterializedViewRefreshTaskRun[];
export interface ListMaterializedViewRefreshTaskRunsResponse {
  MaterializedViewRefreshTaskRuns?: MaterializedViewRefreshTaskRun[];
  NextToken?: string;
}
export interface ListMLTransformsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filter?: TransformFilterCriteria;
  Sort?: TransformSortCriteria;
  Tags?: { [key: string]: string | undefined };
}
export type TransformIdList = string[];
export interface ListMLTransformsResponse {
  TransformIds: string[];
  NextToken?: string;
}
export type MaxResultsNumber = number;
export type SchemaRegistryTokenString = string;
export interface ListRegistriesInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface RegistryListItem {
  RegistryName?: string;
  RegistryArn?: string;
  Description?: string;
  Status?: RegistryStatus;
  CreatedTime?: string;
  UpdatedTime?: string;
}
export type RegistryListDefinition = RegistryListItem[];
export interface ListRegistriesResponse {
  Registries?: RegistryListItem[];
  NextToken?: string;
}
export interface ListSchemasInput {
  RegistryId?: RegistryId;
  MaxResults?: number;
  NextToken?: string;
}
export interface SchemaListItem {
  RegistryName?: string;
  SchemaName?: string;
  SchemaArn?: string;
  Description?: string;
  SchemaStatus?: SchemaStatus;
  CreatedTime?: string;
  UpdatedTime?: string;
}
export type SchemaListDefinition = SchemaListItem[];
export interface ListSchemasResponse {
  Schemas?: SchemaListItem[];
  NextToken?: string;
}
export interface ListSchemaVersionsInput {
  SchemaId: SchemaId;
  MaxResults?: number;
  NextToken?: string;
}
export interface SchemaVersionListItem {
  SchemaArn?: string;
  SchemaVersionId?: string;
  VersionNumber?: number;
  Status?: SchemaVersionStatus;
  CreatedTime?: string;
}
export type SchemaVersionList = SchemaVersionListItem[];
export interface ListSchemaVersionsResponse {
  Schemas?: SchemaVersionListItem[];
  NextToken?: string;
}
export type OrchestrationToken = string;
export interface ListSessionsRequest {
  NextToken?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
  RequestOrigin?: string;
}
export type SessionIdList = string[];
export type SessionList = Session[];
export interface ListSessionsResponse {
  Ids?: string[];
  Sessions?: Session[];
  NextToken?: string;
}
export interface ListStatementsRequest {
  SessionId: string;
  RequestOrigin?: string;
  NextToken?: string;
}
export type StatementList = Statement[];
export interface ListStatementsResponse {
  Statements?: Statement[];
  NextToken?: string;
}
export type MaxListTableOptimizerRunsTokenResults = number;
export type ListTableOptimizerRunsToken = string;
export interface ListTableOptimizerRunsRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Type: TableOptimizerType;
  MaxResults?: number;
  NextToken?: string;
}
export type TableOptimizerRuns = TableOptimizerRun[];
export interface ListTableOptimizerRunsResponse {
  CatalogId?: string;
  DatabaseName?: string;
  TableName?: string;
  NextToken?: string;
  TableOptimizerRuns?: TableOptimizerRun[];
}
export interface ListTriggersRequest {
  NextToken?: string;
  DependentJobName?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
}
export interface ListTriggersResponse {
  TriggerNames?: string[];
  NextToken?: string;
}
export interface ListUsageProfilesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface UsageProfileDefinition {
  Name?: string;
  Description?: string;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
}
export type UsageProfileDefinitionList = UsageProfileDefinition[];
export interface ListUsageProfilesResponse {
  Profiles?: UsageProfileDefinition[];
  NextToken?: string;
}
export interface ListWorkflowsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ListWorkflowsResponse {
  Workflows?: string[];
  NextToken?: string;
}
export interface ModifyIntegrationRequest {
  IntegrationIdentifier: string;
  Description?: string;
  DataFilter?: string;
  IntegrationConfig?: IntegrationConfig;
  IntegrationName?: string;
}
export interface ModifyIntegrationResponse {
  SourceArn: string;
  TargetArn: string;
  IntegrationName: string;
  Description?: string;
  IntegrationArn: string;
  KmsKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
  Status: IntegrationStatus;
  CreateTime: Date;
  Errors?: IntegrationError[];
  DataFilter?: string;
  IntegrationConfig?: IntegrationConfig;
}
export interface PutAssetRequest {
  AssetTypeId: string;
  Identifier: string;
  Name: string;
  Description?: string;
  Forms: { [key: string]: AssetFormEntry | undefined };
  ClientToken?: string;
}
export interface PutAssetResponse {
  Id: string;
  Name: string;
  Description?: string;
  CreatedAt?: Date;
  Forms?: { [key: string]: AssetFormEntry | undefined };
}
export interface PutAssetTypeRequest {
  Name: string;
  Forms: { [key: string]: AssetTypeFormReference | undefined };
  ClientToken?: string;
}
export interface PutAssetTypeResponse {
  Id?: string;
  Name?: string;
  Forms?: { [key: string]: AssetTypeFormReference | undefined };
}
export interface PutAttachmentRequest {
  AssetIdentifier: string;
  IterableFormName?: string;
  ItemIdentifier?: string;
  AttachmentName: string;
  Content: string;
  FormTypeId: string;
  ClientToken?: string;
}
export interface PutAttachmentResponse {
  AssetIdentifier?: string;
  IterableFormName?: string;
  ItemIdentifier?: string;
  AttachmentName?: string;
  FormTypeId?: string;
}
export interface PutDataCatalogEncryptionSettingsRequest {
  CatalogId?: string;
  DataCatalogEncryptionSettings: DataCatalogEncryptionSettings;
}
export interface PutDataCatalogEncryptionSettingsResponse {}
export interface PutDataCatalogExportConfigurationInput {
  ExportSetting: ExportSetting;
  EncryptionConfiguration?: ExportEncryptionConfiguration;
  ClientToken?: string;
}
export interface PutDataCatalogExportConfigurationOutput {
  ExportSetting?: ExportSetting;
  EncryptionConfiguration?: ExportEncryptionConfiguration;
}
export interface PutDataQualityProfileAnnotationRequest {
  ProfileId: string;
  InclusionAnnotation: InclusionAnnotationValue;
}
export interface PutDataQualityProfileAnnotationResponse {}
export interface PutFormTypeRequest {
  Name: string;
  Schema: string;
  ClientToken?: string;
}
export interface PutFormTypeResponse {
  Id?: string;
  Name?: string;
  Schema?: string;
}
export type ExistCondition =
  | "MUST_EXIST"
  | "NOT_EXIST"
  | "NONE"
  | (string & {});
export type EnableHybridValues = "TRUE" | "FALSE" | (string & {});
export interface PutResourcePolicyRequest {
  PolicyInJson: string;
  ResourceArn?: string;
  PolicyHashCondition?: string;
  PolicyExistsCondition?: ExistCondition;
  EnableHybrid?: EnableHybridValues;
}
export interface PutResourcePolicyResponse {
  PolicyHash?: string;
}
export type MetadataKeyString = string;
export type MetadataValueString = string;
export interface MetadataKeyValuePair {
  MetadataKey?: string;
  MetadataValue?: string;
}
export interface PutSchemaVersionMetadataInput {
  SchemaId?: SchemaId;
  SchemaVersionNumber?: SchemaVersionNumber;
  SchemaVersionId?: string;
  MetadataKeyValue: MetadataKeyValuePair;
}
export interface PutSchemaVersionMetadataResponse {
  SchemaArn?: string;
  SchemaName?: string;
  RegistryName?: string;
  LatestVersion?: boolean;
  VersionNumber?: number;
  SchemaVersionId?: string;
  MetadataKey?: string;
  MetadataValue?: string;
}
export interface PutWorkflowRunPropertiesRequest {
  Name: string;
  RunId: string;
  RunProperties: { [key: string]: string | undefined };
}
export interface PutWorkflowRunPropertiesResponse {}
export type MetadataList = MetadataKeyValuePair[];
export type QuerySchemaVersionMetadataMaxResults = number;
export interface QuerySchemaVersionMetadataInput {
  SchemaId?: SchemaId;
  SchemaVersionNumber?: SchemaVersionNumber;
  SchemaVersionId?: string;
  MetadataList?: MetadataKeyValuePair[];
  MaxResults?: number;
  NextToken?: string;
}
export interface OtherMetadataValueListItem {
  MetadataValue?: string;
  CreatedTime?: string;
}
export type OtherMetadataValueList = OtherMetadataValueListItem[];
export interface MetadataInfo {
  MetadataValue?: string;
  CreatedTime?: string;
  OtherMetadataValueList?: OtherMetadataValueListItem[];
}
export type MetadataInfoMap = { [key: string]: MetadataInfo | undefined };
export interface QuerySchemaVersionMetadataResponse {
  MetadataInfoMap?: { [key: string]: MetadataInfo | undefined };
  SchemaVersionId?: string;
  NextToken?: string;
}
export type IntegrationType = "REST" | (string & {});
export interface ConnectionPropertiesConfiguration {
  Url?: ConnectorProperty;
  AdditionalRequestParameters?: ConnectorProperty[];
}
export type ConnectorOAuth2GrantType =
  | "CLIENT_CREDENTIALS"
  | "JWT_BEARER"
  | "AUTHORIZATION_CODE"
  | (string & {});
export type ContentType = "APPLICATION_JSON" | "URL_ENCODED" | (string & {});
export interface ClientCredentialsProperties {
  TokenUrl?: ConnectorProperty;
  RequestMethod?: HTTPMethod;
  ContentType?: ContentType;
  ClientId?: ConnectorProperty;
  ClientSecret?: ConnectorProperty;
  Scope?: ConnectorProperty;
  TokenUrlParameters?: ConnectorProperty[];
}
export interface JWTBearerProperties {
  TokenUrl?: ConnectorProperty;
  RequestMethod?: HTTPMethod;
  ContentType?: ContentType;
  JwtToken?: ConnectorProperty;
  TokenUrlParameters?: ConnectorProperty[];
}
export interface ConnectorAuthorizationCodeProperties {
  AuthorizationCodeUrl?: ConnectorProperty;
  AuthorizationCode?: ConnectorProperty;
  RedirectUri?: ConnectorProperty;
  TokenUrl?: ConnectorProperty;
  RequestMethod?: HTTPMethod;
  ContentType?: ContentType;
  ClientId?: ConnectorProperty;
  ClientSecret?: ConnectorProperty;
  Scope?: ConnectorProperty;
  Prompt?: ConnectorProperty;
  TokenUrlParameters?: ConnectorProperty[];
}
export interface ConnectorOAuth2Properties {
  OAuth2GrantType: ConnectorOAuth2GrantType;
  ClientCredentialsProperties?: ClientCredentialsProperties;
  JWTBearerProperties?: JWTBearerProperties;
  AuthorizationCodeProperties?: ConnectorAuthorizationCodeProperties;
}
export interface BasicAuthenticationProperties {
  Username?: ConnectorProperty;
  Password?: ConnectorProperty;
}
export interface CustomAuthenticationProperties {
  AuthenticationParameters: ConnectorProperty[];
}
export interface ConnectorAuthenticationConfiguration {
  AuthenticationTypes: AuthenticationType[];
  OAuth2Properties?: ConnectorOAuth2Properties;
  BasicAuthenticationProperties?: BasicAuthenticationProperties;
  CustomAuthenticationProperties?: CustomAuthenticationProperties;
}
export interface RegisterConnectionTypeRequest {
  ConnectionType: string;
  IntegrationType: IntegrationType;
  Description?: string;
  ConnectionProperties: ConnectionPropertiesConfiguration;
  ConnectorAuthenticationConfiguration: ConnectorAuthenticationConfiguration;
  RestConfiguration: RestConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export interface RegisterConnectionTypeResponse {
  ConnectionTypeArn?: string;
}
export interface RegisterSchemaVersionInput {
  SchemaId: SchemaId;
  SchemaDefinition: string;
}
export interface RegisterSchemaVersionResponse {
  SchemaVersionId?: string;
  VersionNumber?: number;
  Status?: SchemaVersionStatus;
}
export interface RemoveSchemaVersionMetadataInput {
  SchemaId?: SchemaId;
  SchemaVersionNumber?: SchemaVersionNumber;
  SchemaVersionId?: string;
  MetadataKeyValue: MetadataKeyValuePair;
}
export interface RemoveSchemaVersionMetadataResponse {
  SchemaArn?: string;
  SchemaName?: string;
  RegistryName?: string;
  LatestVersion?: boolean;
  VersionNumber?: number;
  SchemaVersionId?: string;
  MetadataKey?: string;
  MetadataValue?: string;
}
export interface ResetJobBookmarkRequest {
  JobName: string;
  RunId?: string;
}
export interface ResetJobBookmarkResponse {
  JobBookmarkEntry?: JobBookmarkEntry;
}
export type NodeIdList = string[];
export interface ResumeWorkflowRunRequest {
  Name: string;
  RunId: string;
  NodeIds: string[];
}
export interface ResumeWorkflowRunResponse {
  RunId?: string;
  NodeIds?: string[];
}
export type OrchestrationStatementCodeString = string;
export interface RunStatementRequest {
  SessionId: string;
  Code: string;
  RequestOrigin?: string;
}
export interface RunStatementResponse {
  Id?: number;
}
export type SearchText = string;
export type SearchMaxResults = number;
export type SearchNextToken = string;
export type SearchAttribute = string;
export type SearchSortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface SearchSort {
  Attribute: string;
  Order?: SearchSortOrder;
}
export type SearchFilterClauseList = SearchFilterClause[];
export type SearchFilterOperator =
  | "equals"
  | "greaterThan"
  | "greaterThanOrEquals"
  | "lessThan"
  | "lessThanOrEquals"
  | "notExists"
  | (string & {});
export type SearchFilterStringValue = string;
export type SearchFilterLongValue = number;
export type SearchFilterValue =
  | { StringValue: string; LongValue?: never }
  | { StringValue?: never; LongValue: number };
export interface SearchAttributeFilter {
  Attribute: string;
  Operator: SearchFilterOperator;
  Value?: SearchFilterValue;
}
export type SearchMapKey = string;
export type SearchMapFilterValue = { StringValue: string };
export interface SearchMapFilter {
  Attribute: string;
  Key: string;
  Value: SearchMapFilterValue;
}
export type SearchFilterClause =
  | {
      AndAllFilters: SearchFilterClause[];
      OrAnyFilters?: never;
      AttributeFilter?: never;
      MapFilter?: never;
    }
  | {
      AndAllFilters?: never;
      OrAnyFilters: SearchFilterClause[];
      AttributeFilter?: never;
      MapFilter?: never;
    }
  | {
      AndAllFilters?: never;
      OrAnyFilters?: never;
      AttributeFilter: SearchAttributeFilter;
      MapFilter?: never;
    }
  | {
      AndAllFilters?: never;
      OrAnyFilters?: never;
      AttributeFilter?: never;
      MapFilter: SearchMapFilter;
    };
export interface SearchAssetsInput {
  SearchText?: string;
  MaxResults?: number;
  NextToken?: string;
  Sort?: SearchSort;
  FilterClause?: SearchFilterClause;
}
export type SearchResultName = string;
export interface SearchResultItem {
  Id?: string;
  AssetName?: string;
  AssetDescription?: string;
  UpdatedAt?: Date;
  AssetTypeId?: string;
}
export type SearchResultItemList = SearchResultItem[];
export interface SearchAssetsOutput {
  Items?: SearchResultItem[];
  NextToken?: string;
}
export type Comparator =
  | "EQUALS"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "GREATER_THAN_EQUALS"
  | "LESS_THAN_EQUALS"
  | (string & {});
export interface PropertyPredicate {
  Key?: string;
  Value?: string;
  Comparator?: Comparator;
}
export type SearchPropertyPredicates = PropertyPredicate[];
export type Sort = "ASC" | "DESC" | (string & {});
export interface SortCriterion {
  FieldName?: string;
  Sort?: Sort;
}
export type SortCriteria = SortCriterion[];
export interface SearchTablesRequest {
  CatalogId?: string;
  NextToken?: string;
  Filters?: PropertyPredicate[];
  SearchText?: string;
  SortCriteria?: SortCriterion[];
  MaxResults?: number;
  ResourceShareType?: ResourceShareType;
  IncludeStatusDetails?: boolean;
}
export interface SearchTablesResponse {
  NextToken?: string;
  TableList?: Table[];
}
export interface StartBlueprintRunRequest {
  BlueprintName: string;
  Parameters?: string;
  RoleArn: string;
}
export interface StartBlueprintRunResponse {
  RunId?: string;
}
export interface StartColumnStatisticsTaskRunRequest {
  DatabaseName: string;
  TableName: string;
  ColumnNameList?: string[];
  Role: string;
  SampleSize?: number;
  CatalogID?: string;
  SecurityConfiguration?: string;
}
export interface StartColumnStatisticsTaskRunResponse {
  ColumnStatisticsTaskRunId?: string;
}
export interface StartColumnStatisticsTaskRunScheduleRequest {
  DatabaseName: string;
  TableName: string;
}
export interface StartColumnStatisticsTaskRunScheduleResponse {}
export interface StartCrawlerRequest {
  Name: string;
}
export interface StartCrawlerResponse {}
export interface StartCrawlerScheduleRequest {
  CrawlerName: string;
}
export interface StartCrawlerScheduleResponse {}
export interface StartDataQualityRuleRecommendationRunRequest {
  DataSource: DataSource;
  Role: string;
  NumberOfWorkers?: number;
  Timeout?: number;
  CreatedRulesetName?: string;
  DataQualitySecurityConfiguration?: string;
  ClientToken?: string;
  AdditionalRunOptions?: DataQualityRuleRecommendationRunAdditionalRunOptions;
}
export interface StartDataQualityRuleRecommendationRunResponse {
  RunId?: string;
}
export interface StartDataQualityRulesetEvaluationRunRequest {
  DataSource: DataSource;
  Role: string;
  NumberOfWorkers?: number;
  Timeout?: number;
  ClientToken?: string;
  AdditionalRunOptions?: DataQualityEvaluationRunAdditionalRunOptions;
  RulesetNames: string[];
  AdditionalDataSources?: { [key: string]: DataSource | undefined };
}
export interface StartDataQualityRulesetEvaluationRunResponse {
  RunId?: string;
}
export interface StartExportLabelsTaskRunRequest {
  TransformId: string;
  OutputS3Path: string;
}
export interface StartExportLabelsTaskRunResponse {
  TaskRunId?: string;
}
export interface StartImportLabelsTaskRunRequest {
  TransformId: string;
  InputS3Path: string;
  ReplaceAllLabels?: boolean;
}
export interface StartImportLabelsTaskRunResponse {
  TaskRunId?: string;
}
export interface StartJobRunRequest {
  JobName: string;
  JobRunQueuingEnabled?: boolean;
  JobRunId?: string;
  Arguments?: { [key: string]: string | undefined };
  AllocatedCapacity?: number;
  Timeout?: number;
  MaxCapacity?: number;
  SecurityConfiguration?: string;
  NotificationProperty?: NotificationProperty;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  ExecutionClass?: ExecutionClass;
  ExecutionRoleSessionPolicy?: string;
}
export interface StartJobRunResponse {
  JobRunId?: string;
}
export interface StartMaterializedViewRefreshTaskRunRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  FullRefresh?: boolean;
}
export interface StartMaterializedViewRefreshTaskRunResponse {
  MaterializedViewRefreshTaskRunId?: string;
}
export interface StartMLEvaluationTaskRunRequest {
  TransformId: string;
}
export interface StartMLEvaluationTaskRunResponse {
  TaskRunId?: string;
}
export interface StartMLLabelingSetGenerationTaskRunRequest {
  TransformId: string;
  OutputS3Path: string;
}
export interface StartMLLabelingSetGenerationTaskRunResponse {
  TaskRunId?: string;
}
export interface StartTriggerRequest {
  Name: string;
}
export interface StartTriggerResponse {
  Name?: string;
}
export interface StartWorkflowRunRequest {
  Name: string;
  RunProperties?: { [key: string]: string | undefined };
}
export interface StartWorkflowRunResponse {
  RunId?: string;
}
export interface StopColumnStatisticsTaskRunRequest {
  DatabaseName: string;
  TableName: string;
}
export interface StopColumnStatisticsTaskRunResponse {}
export interface StopColumnStatisticsTaskRunScheduleRequest {
  DatabaseName: string;
  TableName: string;
}
export interface StopColumnStatisticsTaskRunScheduleResponse {}
export interface StopCrawlerRequest {
  Name: string;
}
export interface StopCrawlerResponse {}
export interface StopCrawlerScheduleRequest {
  CrawlerName: string;
}
export interface StopCrawlerScheduleResponse {}
export interface StopMaterializedViewRefreshTaskRunRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
}
export interface StopMaterializedViewRefreshTaskRunResponse {}
export interface StopSessionRequest {
  Id: string;
  RequestOrigin?: string;
}
export interface StopSessionResponse {
  Id?: string;
}
export interface StopTriggerRequest {
  Name: string;
}
export interface StopTriggerResponse {
  Name?: string;
}
export interface StopWorkflowRunRequest {
  Name: string;
  RunId: string;
}
export interface StopWorkflowRunResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  TagsToAdd: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface TestConnectionInput {
  ConnectionType: ConnectionType;
  ConnectionProperties: { [key: string]: string | undefined };
  AuthenticationConfiguration?: AuthenticationConfigurationInput;
}
export interface TestConnectionRequest {
  ConnectionName?: string;
  CatalogId?: string;
  TestConnectionInput?: TestConnectionInput;
}
export interface TestConnectionResponse {}
export type TagKeysList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagsToRemove: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAssetRequest {
  Identifier: string;
  Name?: string;
  Description?: string;
  ClientToken?: string;
}
export interface UpdateAssetResponse {
  Id: string;
  Name?: string;
  Description?: string;
  UpdatedAt?: Date;
}
export interface UpdateBlueprintRequest {
  Name: string;
  Description?: string;
  BlueprintLocation: string;
}
export interface UpdateBlueprintResponse {
  Name?: string;
}
export interface UpdateCatalogRequest {
  CatalogId: string;
  CatalogInput: CatalogInput;
}
export interface UpdateCatalogResponse {}
export interface UpdateGrokClassifierRequest {
  Name: string;
  Classification?: string;
  GrokPattern?: string;
  CustomPatterns?: string;
}
export interface UpdateXMLClassifierRequest {
  Name: string;
  Classification?: string;
  RowTag?: string;
}
export interface UpdateJsonClassifierRequest {
  Name: string;
  JsonPath?: string;
}
export interface UpdateCsvClassifierRequest {
  Name: string;
  Delimiter?: string;
  QuoteSymbol?: string;
  ContainsHeader?: CsvHeaderOption;
  Header?: string[];
  DisableValueTrimming?: boolean;
  AllowSingleColumn?: boolean;
  CustomDatatypeConfigured?: boolean;
  CustomDatatypes?: string[];
  Serde?: CsvSerdeOption;
}
export interface UpdateClassifierRequest {
  GrokClassifier?: UpdateGrokClassifierRequest;
  XMLClassifier?: UpdateXMLClassifierRequest;
  JsonClassifier?: UpdateJsonClassifierRequest;
  CsvClassifier?: UpdateCsvClassifierRequest;
}
export interface UpdateClassifierResponse {}
export type UpdateColumnStatisticsList = ColumnStatistics[];
export interface UpdateColumnStatisticsForPartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
  ColumnStatisticsList: ColumnStatistics[];
}
export interface ColumnStatisticsError {
  ColumnStatistics?: ColumnStatistics;
  Error?: ErrorDetail;
}
export type ColumnStatisticsErrors = ColumnStatisticsError[];
export interface UpdateColumnStatisticsForPartitionResponse {
  Errors?: ColumnStatisticsError[];
}
export interface UpdateColumnStatisticsForTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  ColumnStatisticsList: ColumnStatistics[];
}
export interface UpdateColumnStatisticsForTableResponse {
  Errors?: ColumnStatisticsError[];
}
export interface UpdateColumnStatisticsTaskSettingsRequest {
  DatabaseName: string;
  TableName: string;
  Role?: string;
  Schedule?: string;
  ColumnNameList?: string[];
  SampleSize?: number;
  CatalogID?: string;
  SecurityConfiguration?: string;
}
export interface UpdateColumnStatisticsTaskSettingsResponse {}
export interface UpdateConnectionRequest {
  CatalogId?: string;
  Name: string;
  ConnectionInput: ConnectionInput;
}
export interface UpdateConnectionResponse {}
export type DescriptionStringRemovable = string;
export interface UpdateCrawlerRequest {
  Name: string;
  Role?: string;
  DatabaseName?: string;
  Description?: string;
  Targets?: CrawlerTargets;
  Schedule?: string;
  Classifiers?: string[];
  TablePrefix?: string;
  SchemaChangePolicy?: SchemaChangePolicy;
  RecrawlPolicy?: RecrawlPolicy;
  LineageConfiguration?: LineageConfiguration;
  LakeFormationConfiguration?: LakeFormationConfiguration;
  Configuration?: string;
  CrawlerSecurityConfiguration?: string;
}
export interface UpdateCrawlerResponse {}
export interface UpdateCrawlerScheduleRequest {
  CrawlerName: string;
  Schedule?: string;
}
export interface UpdateCrawlerScheduleResponse {}
export interface UpdateDatabaseRequest {
  CatalogId?: string;
  Name: string;
  DatabaseInput: DatabaseInput;
}
export interface UpdateDatabaseResponse {}
export interface UpdateDataQualityRulesetRequest {
  Name: string;
  Description?: string;
  Ruleset?: string;
}
export interface UpdateDataQualityRulesetResponse {
  Name?: string;
  Description?: string;
  Ruleset?: string;
}
export interface DevEndpointCustomLibraries {
  ExtraPythonLibsS3Path?: string;
  ExtraJarsS3Path?: string;
}
export interface UpdateDevEndpointRequest {
  EndpointName: string;
  PublicKey?: string;
  AddPublicKeys?: string[];
  DeletePublicKeys?: string[];
  CustomLibraries?: DevEndpointCustomLibraries;
  UpdateEtlLibraries?: boolean;
  DeleteArguments?: string[];
  AddArguments?: { [key: string]: string | undefined };
}
export interface UpdateDevEndpointResponse {}
export interface UpdateGlossaryRequest {
  Identifier: string;
  Name?: string;
  Description?: string;
  ClientToken?: string;
}
export interface UpdateGlossaryResponse {
  Id?: string;
  Name?: string;
  Description?: string;
}
export interface UpdateGlossaryTermRequest {
  Identifier: string;
  Name?: string;
  ShortDescription?: string;
  LongDescription?: string;
  ClientToken?: string;
}
export interface UpdateGlossaryTermResponse {
  Id?: string;
  GlossaryId?: string;
  Name?: string;
  ShortDescription?: string;
  LongDescription?: string;
}
export interface UpdateGlueIdentityCenterConfigurationRequest {
  Scopes?: string[];
  UserBackgroundSessionsEnabled?: boolean;
}
export interface UpdateGlueIdentityCenterConfigurationResponse {}
export interface UpdateIntegrationResourcePropertyRequest {
  ResourceArn: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
}
export interface UpdateIntegrationResourcePropertyResponse {
  ResourceArn?: string;
  ResourcePropertyArn?: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
}
export interface UpdateIntegrationTablePropertiesRequest {
  ResourceArn: string;
  TableName: string;
  SourceTableConfig?: SourceTableConfig;
  TargetTableConfig?: TargetTableConfig;
}
export interface UpdateIntegrationTablePropertiesResponse {}
export interface JobUpdate {
  JobMode?: JobMode;
  JobRunQueuingEnabled?: boolean;
  Description?: string;
  LogUri?: string;
  Role?: string;
  ExecutionProperty?: ExecutionProperty;
  Command?: JobCommand;
  DefaultArguments?: { [key: string]: string | undefined };
  NonOverridableArguments?: { [key: string]: string | undefined };
  Connections?: ConnectionsList;
  MaxRetries?: number;
  AllocatedCapacity?: number;
  Timeout?: number;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  SecurityConfiguration?: string;
  NotificationProperty?: NotificationProperty;
  GlueVersion?: string;
  CodeGenConfigurationNodes?: {
    [key: string]: CodeGenConfigurationNode | undefined;
  };
  ExecutionClass?: ExecutionClass;
  SourceControlDetails?: SourceControlDetails;
  MaintenanceWindow?: string;
}
export interface UpdateJobRequest {
  JobName: string;
  JobUpdate: JobUpdate;
}
export interface UpdateJobResponse {
  JobName?: string;
}
export type CommitIdString = string;
export type AuthTokenString = string;
export interface UpdateJobFromSourceControlRequest {
  JobName?: string;
  Provider?: SourceControlProvider;
  RepositoryName?: string;
  RepositoryOwner?: string;
  BranchName?: string;
  Folder?: string;
  CommitId?: string;
  AuthStrategy?: SourceControlAuthStrategy;
  AuthToken?: string;
}
export interface UpdateJobFromSourceControlResponse {
  JobName?: string;
}
export interface UpdateMLTransformRequest {
  TransformId: string;
  Name?: string;
  Description?: string;
  Parameters?: TransformParameters;
  Role?: string;
  GlueVersion?: string;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  Timeout?: number;
  MaxRetries?: number;
}
export interface UpdateMLTransformResponse {
  TransformId?: string;
}
export interface UpdatePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValueList: string[];
  PartitionInput: PartitionInput;
}
export interface UpdatePartitionResponse {}
export interface UpdateRegistryInput {
  RegistryId: RegistryId;
  Description: string;
}
export interface UpdateRegistryResponse {
  RegistryName?: string;
  RegistryArn?: string;
}
export interface UpdateSchemaInput {
  SchemaId: SchemaId;
  SchemaVersionNumber?: SchemaVersionNumber;
  Compatibility?: Compatibility;
  Description?: string;
}
export interface UpdateSchemaResponse {
  SchemaArn?: string;
  SchemaName?: string;
  RegistryName?: string;
}
export interface UpdateSourceControlFromJobRequest {
  JobName?: string;
  Provider?: SourceControlProvider;
  RepositoryName?: string;
  RepositoryOwner?: string;
  BranchName?: string;
  Folder?: string;
  CommitId?: string;
  AuthStrategy?: SourceControlAuthStrategy;
  AuthToken?: string;
}
export interface UpdateSourceControlFromJobResponse {
  JobName?: string;
}
export type ViewUpdateAction =
  | "ADD"
  | "REPLACE"
  | "ADD_OR_REPLACE"
  | "DROP"
  | (string & {});
export type IcebergUpdateAction =
  | "add-schema"
  | "set-current-schema"
  | "add-spec"
  | "set-default-spec"
  | "add-sort-order"
  | "set-default-sort-order"
  | "set-location"
  | "set-properties"
  | "remove-properties"
  | "add-encryption-key"
  | "remove-encryption-key"
  | (string & {});
export type EncryptionKeyIdString = string;
export type EncryptedKeyMetadataString = string;
export interface IcebergEncryptedKey {
  KeyId: string;
  EncryptedKeyMetadata: string;
  EncryptedById?: string;
  Properties?: { [key: string]: string | undefined };
}
export interface IcebergTableUpdate {
  Schema: IcebergSchema;
  PartitionSpec?: IcebergPartitionSpec;
  SortOrder?: IcebergSortOrder;
  Location: string;
  Properties?: { [key: string]: string | undefined };
  Action?: IcebergUpdateAction;
  EncryptionKey?: IcebergEncryptedKey;
  KeyId?: string;
}
export type IcebergTableUpdateList = IcebergTableUpdate[];
export interface UpdateIcebergTableInput {
  Updates: IcebergTableUpdate[];
}
export interface UpdateIcebergInput {
  UpdateIcebergTableInput: UpdateIcebergTableInput;
}
export interface UpdateOpenTableFormatInput {
  UpdateIcebergInput?: UpdateIcebergInput;
}
export interface UpdateTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  Name?: string;
  TableInput?: TableInput;
  SkipArchive?: boolean;
  TransactionId?: string;
  VersionId?: string;
  ViewUpdateAction?: ViewUpdateAction;
  Force?: boolean;
  UpdateOpenTableFormatInput?: UpdateOpenTableFormatInput;
}
export interface UpdateTableResponse {}
export interface UpdateTableOptimizerRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Type: TableOptimizerType;
  TableOptimizerConfiguration: TableOptimizerConfiguration;
}
export interface UpdateTableOptimizerResponse {}
export interface TriggerUpdate {
  Name?: string;
  Description?: string;
  Schedule?: string;
  Actions?: Action[];
  Predicate?: Predicate;
  EventBatchingCondition?: EventBatchingCondition;
}
export interface UpdateTriggerRequest {
  Name: string;
  TriggerUpdate: TriggerUpdate;
}
export interface UpdateTriggerResponse {
  Trigger?: Trigger;
}
export interface UpdateUsageProfileRequest {
  Name: string;
  Description?: string;
  Configuration: ProfileConfiguration;
}
export interface UpdateUsageProfileResponse {
  Name?: string;
}
export interface UpdateUserDefinedFunctionRequest {
  CatalogId?: string;
  DatabaseName: string;
  FunctionName: string;
  FunctionInput: UserDefinedFunctionInput;
}
export interface UpdateUserDefinedFunctionResponse {}
export interface UpdateWorkflowRequest {
  Name: string;
  Description?: string;
  DefaultRunProperties?: { [key: string]: string | undefined };
  MaxConcurrentRuns?: number;
}
export interface UpdateWorkflowResponse {
  Name?: string;
}
export type FederationSourceErrorCode =
  | "AccessDeniedException"
  | "EntityNotFoundException"
  | "InvalidCredentialsException"
  | "InvalidInputException"
  | "InvalidResponseException"
  | "OperationTimeoutException"
  | "OperationNotSupportedException"
  | "InternalServiceException"
  | "PartialFailureException"
  | "ThrottlingException"
  | (string & {});
export type IntegrationErrorMessage = string;
export type AssociateGlossaryTermsError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates one or more glossary terms with an asset in Glue Data Catalog.
 */
export const associateGlossaryTerms: API.OperationMethod<
  AssociateGlossaryTermsRequest,
  AssociateGlossaryTermsResponse,
  AssociateGlossaryTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AssetIdentifier: 0,
      IterableFormName: 0,
      ItemIdentifier: 0,
      GlossaryTermIdentifiers: 0,
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateGlossaryTerms",
})) as any;

export type BatchCreatePartitionError =
  | AlreadyExistsException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates one or more partitions in a batch operation.
 */
export const batchCreatePartition: API.OperationMethod<
  BatchCreatePartitionRequest,
  BatchCreatePartitionResponse,
  BatchCreatePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      PartitionInputList: D.list(i_PartitionInput),
    },
  },
  errors: [
    AlreadyExistsException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreatePartition",
})) as any;

export type BatchDeleteConnectionError =
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a list of connection definitions from the Data Catalog.
 */
export const batchDeleteConnection: API.OperationMethod<
  BatchDeleteConnectionRequest,
  BatchDeleteConnectionResponse,
  BatchDeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CatalogId: 0, ConnectionNameList: 0 } },
  errors: [InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteConnection",
})) as any;

export type BatchDeletePartitionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes one or more partitions in a batch operation.
 */
export const batchDeletePartition: API.OperationMethod<
  BatchDeletePartitionRequest,
  BatchDeletePartitionResponse,
  BatchDeletePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      PartitionsToDelete: D.list(i_PartitionValueList),
    },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeletePartition",
})) as any;

export type BatchDeleteTableError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Deletes multiple tables at once.
 *
 * After completing this operation, you no longer have access to the table versions and
 * partitions that belong to the deleted table. Glue deletes these "orphaned" resources
 * asynchronously in a timely manner, at the discretion of the service.
 *
 * To ensure the immediate deletion of all related resources, before calling
 * `BatchDeleteTable`, use `DeleteTableVersion` or
 * `BatchDeleteTableVersion`, and `DeletePartition` or
 * `BatchDeletePartition`, to delete any resources that belong to the
 * table.
 */
export const batchDeleteTable: API.OperationMethod<
  BatchDeleteTableRequest,
  BatchDeleteTableResponse,
  BatchDeleteTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TablesToDelete: 0,
      TransactionId: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteTable",
})) as any;

export type BatchDeleteTableVersionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified batch of versions of a table.
 */
export const batchDeleteTableVersion: API.OperationMethod<
  BatchDeleteTableVersionRequest,
  BatchDeleteTableVersionResponse,
  BatchDeleteTableVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, TableName: 0, VersionIds: 0 },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteTableVersion",
})) as any;

export type BatchGetBlueprintsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves information about a list of blueprints.
 */
export const batchGetBlueprints: API.OperationMethod<
  BatchGetBlueprintsRequest,
  BatchGetBlueprintsResponse,
  BatchGetBlueprintsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Names: 0, IncludeBlueprint: 0, IncludeParameterSpec: 0 },
    output: { Blueprints: D.list(o_Blueprint) },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetBlueprints",
})) as any;

export type BatchGetCrawlersError =
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a list of resource metadata for a given list of crawler names. After calling the `ListCrawlers` operation, you can call this operation to access the data to which you have been granted permissions. This operation supports all IAM permissions, including permission conditions that uses tags.
 */
export const batchGetCrawlers: API.OperationMethod<
  BatchGetCrawlersRequest,
  BatchGetCrawlersResponse,
  BatchGetCrawlersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CrawlerNames: 0 },
    output: { Crawlers: D.list(o_Crawler) },
  },
  errors: [InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCrawlers",
})) as any;

export type BatchGetCustomEntityTypesError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the details for the custom patterns specified by a list of names.
 */
export const batchGetCustomEntityTypes: API.OperationMethod<
  BatchGetCustomEntityTypesRequest,
  BatchGetCustomEntityTypesResponse,
  BatchGetCustomEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Names: 0 } },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCustomEntityTypes",
})) as any;

export type BatchGetDataQualityResultError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a list of data quality results for the specified result IDs.
 */
export const batchGetDataQualityResult: API.OperationMethod<
  BatchGetDataQualityResultRequest,
  BatchGetDataQualityResultResponse,
  BatchGetDataQualityResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResultIds: 0 },
    output: {
      Results: D.list({
        StartedOn: D.ts,
        CompletedOn: D.ts,
        RuleResults: D.list(o_DataQualityRuleResult),
        AnalyzerResults: D.list(o_DataQualityAnalyzerResult),
        Observations: D.list(o_DataQualityObservation),
      }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDataQualityResult",
})) as any;

export type BatchGetDataQualityRulesetEvaluationRunError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the details of multiple evaluation runs in a single request.
 */
export const batchGetDataQualityRulesetEvaluationRun: API.OperationMethod<
  BatchGetDataQualityRulesetEvaluationRunRequest,
  BatchGetDataQualityRulesetEvaluationRunResponse,
  BatchGetDataQualityRulesetEvaluationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RunIds: 0 },
    output: {
      Runs: D.list({
        StartedOn: D.ts,
        LastModifiedOn: D.ts,
        CompletedOn: D.ts,
      }),
    },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDataQualityRulesetEvaluationRun",
})) as any;

export type BatchGetDevEndpointsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a list of resource metadata for a given list of development endpoint names. After
 * calling the `ListDevEndpoints` operation, you can call this operation to access the
 * data to which you have been granted permissions. This operation supports all IAM permissions,
 * including permission conditions that uses tags.
 */
export const batchGetDevEndpoints: API.OperationMethod<
  BatchGetDevEndpointsRequest,
  BatchGetDevEndpointsResponse,
  BatchGetDevEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DevEndpointNames: 0 },
    output: { DevEndpoints: D.list(o_DevEndpoint) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDevEndpoints",
})) as any;

export type BatchGetIterableFormsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves multiple items from an iterable form on an asset in Glue Data Catalog in a single request.
 */
export const batchGetIterableForms: API.OperationMethod<
  BatchGetIterableFormsRequest,
  BatchGetIterableFormsResponse,
  BatchGetIterableFormsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AssetIdentifier: 0, IterableFormName: 0, ItemIdentifiers: 0 },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetIterableForms",
})) as any;

export type BatchGetJobsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a list of resource metadata for a given list of job names. After calling the `ListJobs` operation, you can call this operation to access the data to which you have been granted permissions. This operation supports all IAM permissions, including permission conditions that uses tags.
 */
export const batchGetJobs: API.OperationMethod<
  BatchGetJobsRequest,
  BatchGetJobsResponse,
  BatchGetJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobNames: 0 },
    output: { Jobs: D.list(o_Job) },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetJobs",
})) as any;

export type BatchGetPartitionError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | InvalidStateException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves partitions in a batch request.
 */
export const batchGetPartition: API.OperationMethod<
  BatchGetPartitionRequest,
  BatchGetPartitionResponse,
  BatchGetPartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      PartitionsToGet: D.list(i_PartitionValueList),
      AuditContext: i_AuditContext,
      QuerySessionContext: i_QuerySessionContext,
    },
    output: { Partitions: D.list(o_Partition) },
  },
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    InvalidStateException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPartition",
})) as any;

export type BatchGetTableOptimizerError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the configuration for the specified table optimizers.
 */
export const batchGetTableOptimizer: API.OperationMethod<
  BatchGetTableOptimizerRequest,
  BatchGetTableOptimizerResponse,
  BatchGetTableOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Entries: D.list({ catalogId: 0, databaseName: 0, tableName: 0, type: 0 }),
    },
    output: { TableOptimizers: D.list({ tableOptimizer: o_TableOptimizer }) },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTableOptimizer",
})) as any;

export type BatchGetTriggersError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a list of resource metadata for a given list of trigger names. After calling the `ListTriggers` operation, you can call this operation to access the data to which you have been granted permissions. This operation supports all IAM permissions, including permission conditions that uses tags.
 */
export const batchGetTriggers: API.OperationMethod<
  BatchGetTriggersRequest,
  BatchGetTriggersResponse,
  BatchGetTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TriggerNames: 0 } },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTriggers",
})) as any;

export type BatchGetWorkflowsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a list of resource metadata for a given list of workflow names. After calling the `ListWorkflows` operation, you can call this operation to access the data to which you have been granted permissions. This operation supports all IAM permissions, including permission conditions that uses tags.
 */
export const batchGetWorkflows: API.OperationMethod<
  BatchGetWorkflowsRequest,
  BatchGetWorkflowsResponse,
  BatchGetWorkflowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Names: 0, IncludeGraph: 0 },
    output: { Workflows: D.list(o_Workflow) },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetWorkflows",
})) as any;

export type BatchPutDataQualityStatisticAnnotationError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Annotate datapoints over time for a specific data quality statistic.
 * The API requires both profileID and statisticID as part of the InclusionAnnotation input.
 * The API only works for a single statisticId across multiple profiles.
 */
export const batchPutDataQualityStatisticAnnotation: API.OperationMethod<
  BatchPutDataQualityStatisticAnnotationRequest,
  BatchPutDataQualityStatisticAnnotationResponse,
  BatchPutDataQualityStatisticAnnotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InclusionAnnotations: D.list({
        ProfileId: 0,
        StatisticId: 0,
        InclusionAnnotation: 0,
      }),
      ClientToken: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutDataQualityStatisticAnnotation",
})) as any;

export type BatchStopJobRunError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops one or more job runs for a specified job definition.
 */
export const batchStopJobRun: API.OperationMethod<
  BatchStopJobRunRequest,
  BatchStopJobRunResponse,
  BatchStopJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobName: 0, JobRunIds: 0 } },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStopJobRun",
})) as any;

export type BatchUpdatePartitionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates one or more partitions in a batch operation.
 */
export const batchUpdatePartition: API.OperationMethod<
  BatchUpdatePartitionRequest,
  BatchUpdatePartitionResponse,
  BatchUpdatePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      Entries: D.list({
        PartitionValueList: 0,
        PartitionInput: i_PartitionInput,
      }),
    },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdatePartition",
})) as any;

export type CancelDataQualityRuleRecommendationRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Cancels the specified recommendation run that was being used to generate rules.
 */
export const cancelDataQualityRuleRecommendationRun: API.OperationMethod<
  CancelDataQualityRuleRecommendationRunRequest,
  CancelDataQualityRuleRecommendationRunResponse,
  CancelDataQualityRuleRecommendationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RunId: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDataQualityRuleRecommendationRun",
})) as any;

export type CancelDataQualityRulesetEvaluationRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Cancels a run where a ruleset is being evaluated against a data source.
 */
export const cancelDataQualityRulesetEvaluationRun: API.OperationMethod<
  CancelDataQualityRulesetEvaluationRunRequest,
  CancelDataQualityRulesetEvaluationRunResponse,
  CancelDataQualityRulesetEvaluationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RunId: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDataQualityRulesetEvaluationRun",
})) as any;

export type CancelMLTaskRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Cancels (stops) a task run. Machine learning task runs are asynchronous tasks that Glue runs on your behalf as part of various machine learning workflows. You can cancel a
 * machine learning task run at any time by calling `CancelMLTaskRun` with a task
 * run's parent transform's `TransformID` and the task run's `TaskRunId`.
 */
export const cancelMLTaskRun: API.OperationMethod<
  CancelMLTaskRunRequest,
  CancelMLTaskRunResponse,
  CancelMLTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TransformId: 0, TaskRunId: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMLTaskRun",
})) as any;

export type CancelStatementError =
  | AccessDeniedException
  | EntityNotFoundException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Cancels the statement.
 */
export const cancelStatement: API.OperationMethod<
  CancelStatementRequest,
  CancelStatementResponse,
  CancelStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SessionId: 0, Id: 0, RequestOrigin: 0 },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelStatement",
})) as any;

export type CheckSchemaVersionValidityError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Validates the supplied schema. This call has no side effects, it simply validates using the supplied schema using `DataFormat` as the format. Since it does not take a schema set name, no compatibility checks are performed.
 */
export const checkSchemaVersionValidity: API.OperationMethod<
  CheckSchemaVersionValidityInput,
  CheckSchemaVersionValidityResponse,
  CheckSchemaVersionValidityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DataFormat: 0, SchemaDefinition: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckSchemaVersionValidity",
})) as any;

export type CreateBlueprintError =
  | AlreadyExistsException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Registers a blueprint with Glue.
 */
export const createBlueprint: API.OperationMethod<
  CreateBlueprintRequest,
  CreateBlueprintResponse,
  CreateBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Description: 0, BlueprintLocation: 0, Tags: 0 },
  },
  errors: [
    AlreadyExistsException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBlueprint",
})) as any;

export type CreateCatalogError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederatedResourceAlreadyExistsException
  | FederationSourceException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new catalog in the Glue Data Catalog.
 */
export const createCatalog: API.OperationMethod<
  CreateCatalogRequest,
  CreateCatalogResponse,
  CreateCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, CatalogInput: i_CatalogInput, Tags: 0 },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederatedResourceAlreadyExistsException,
    FederationSourceException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCatalog",
})) as any;

export type CreateClassifierError =
  | AlreadyExistsException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates a classifier in the user's account. This can be a `GrokClassifier`, an
 * `XMLClassifier`, a `JsonClassifier`, or a `CsvClassifier`,
 * depending on which field of the request is present.
 */
export const createClassifier: API.OperationMethod<
  CreateClassifierRequest,
  CreateClassifierResponse,
  CreateClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GrokClassifier: {
        Classification: 0,
        Name: 0,
        GrokPattern: 0,
        CustomPatterns: 0,
      },
      XMLClassifier: { Classification: 0, Name: 0, RowTag: 0 },
      JsonClassifier: { Name: 0, JsonPath: 0 },
      CsvClassifier: {
        Name: 0,
        Delimiter: 0,
        QuoteSymbol: 0,
        ContainsHeader: 0,
        Header: 0,
        DisableValueTrimming: 0,
        AllowSingleColumn: 0,
        CustomDatatypeConfigured: 0,
        CustomDatatypes: 0,
        Serde: 0,
      },
    },
  },
  errors: [
    AlreadyExistsException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClassifier",
})) as any;

export type CreateColumnStatisticsTaskSettingsError =
  | AccessDeniedException
  | AlreadyExistsException
  | ColumnStatisticsTaskRunningException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates settings for a column statistics task.
 */
export const createColumnStatisticsTaskSettings: API.OperationMethod<
  CreateColumnStatisticsTaskSettingsRequest,
  CreateColumnStatisticsTaskSettingsResponse,
  CreateColumnStatisticsTaskSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DatabaseName: 0,
      TableName: 0,
      Role: 0,
      Schedule: 0,
      ColumnNameList: 0,
      SampleSize: 0,
      CatalogID: 0,
      SecurityConfiguration: 0,
      Tags: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ColumnStatisticsTaskRunningException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateColumnStatisticsTaskSettings",
})) as any;

export type CreateConnectionError =
  | AlreadyExistsException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a connection definition in the Data Catalog.
 *
 * Connections used for creating federated resources require the IAM `glue:PassConnection` permission.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionRequest,
  CreateConnectionResponse,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, ConnectionInput: i_ConnectionInput, Tags: 0 },
  },
  errors: [
    AlreadyExistsException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
})) as any;

export type CreateCrawlerError =
  | AlreadyExistsException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | GlueRoleNotAssumable
  | GlueS3TargetNotReady
  | CommonErrors;
/**
 * Creates a new crawler with specified targets, role, configuration, and optional schedule.
 * At least one crawl target must be specified, in the `s3Targets` field, the
 * `jdbcTargets` field, or the `DynamoDBTargets` field.
 */
export const createCrawler: API.OperationMethod<
  CreateCrawlerRequest,
  CreateCrawlerResponse,
  CreateCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Role: 0,
      DatabaseName: 0,
      Description: 0,
      Targets: i_CrawlerTargets,
      Schedule: 0,
      Classifiers: 0,
      TablePrefix: 0,
      SchemaChangePolicy: i_SchemaChangePolicy,
      RecrawlPolicy: i_RecrawlPolicy,
      LineageConfiguration: i_LineageConfiguration,
      LakeFormationConfiguration: i_LakeFormationConfiguration,
      Configuration: 0,
      CrawlerSecurityConfiguration: 0,
      Tags: 0,
    },
  },
  errors: [
    AlreadyExistsException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    GlueRoleNotAssumable,
    GlueS3TargetNotReady,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCrawler",
})) as any;

export type CreateCustomEntityTypeError =
  | AccessDeniedException
  | AlreadyExistsException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a custom pattern that is used to detect sensitive data across the columns and rows of your structured data.
 *
 * Each custom pattern you create specifies a regular expression and an optional list of context words. If no context words are passed only a regular expression is checked.
 */
export const createCustomEntityType: API.OperationMethod<
  CreateCustomEntityTypeRequest,
  CreateCustomEntityTypeResponse,
  CreateCustomEntityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, RegexString: 0, ContextWords: 0, Tags: 0 },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomEntityType",
})) as any;

export type CreateDatabaseError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | FederatedResourceAlreadyExistsException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new database in a Data Catalog.
 */
export const createDatabase: API.OperationMethod<
  CreateDatabaseRequest,
  CreateDatabaseResponse,
  CreateDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseInput: i_DatabaseInput, Tags: 0 },
  },
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    FederatedResourceAlreadyExistsException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatabase",
})) as any;

export type CreateDataQualityRulesetError =
  | AlreadyExistsException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a data quality ruleset with DQDL rules applied to a specified Glue table.
 *
 * You create the ruleset using the Data Quality Definition Language (DQDL). For more information, see the Glue developer guide.
 */
export const createDataQualityRuleset: API.OperationMethod<
  CreateDataQualityRulesetRequest,
  CreateDataQualityRulesetResponse,
  CreateDataQualityRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      Ruleset: 0,
      Tags: 0,
      TargetTable: i_DataQualityTargetTable,
      DataQualitySecurityConfiguration: 0,
      ClientToken: 0,
    },
  },
  errors: [
    AlreadyExistsException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataQualityRuleset",
})) as any;

export type CreateDevEndpointError =
  | AccessDeniedException
  | AlreadyExistsException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new development endpoint.
 */
export const createDevEndpoint: API.OperationMethod<
  CreateDevEndpointRequest,
  CreateDevEndpointResponse,
  CreateDevEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      RoleArn: 0,
      SecurityGroupIds: 0,
      SubnetId: 0,
      PublicKey: 0,
      PublicKeys: 0,
      NumberOfNodes: 0,
      WorkerType: 0,
      GlueVersion: 0,
      NumberOfWorkers: 0,
      ExtraPythonLibsS3Path: 0,
      ExtraJarsS3Path: 0,
      SecurityConfiguration: 0,
      Tags: 0,
      Arguments: 0,
    },
    output: { CreatedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDevEndpoint",
})) as any;

export type CreateGlossaryError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a business glossary in Glue Data Catalog. A glossary is a container for glossary terms that define business concepts.
 */
export const createGlossary: API.OperationMethod<
  CreateGlossaryRequest,
  CreateGlossaryResponse,
  CreateGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Description: 0, ClientToken: D.m({ idempotency: true }) },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlossary",
})) as any;

export type CreateGlossaryTermError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a glossary term within a business glossary in Glue Data Catalog.
 */
export const createGlossaryTerm: API.OperationMethod<
  CreateGlossaryTermRequest,
  CreateGlossaryTermResponse,
  CreateGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GlossaryIdentifier: 0,
      Name: 0,
      ShortDescription: 0,
      LongDescription: 0,
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlossaryTerm",
})) as any;

export type CreateGlueIdentityCenterConfigurationError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates a new Glue Identity Center configuration to enable integration between Glue and Amazon Web Services IAM
 * Identity Center for authentication and authorization.
 */
export const createGlueIdentityCenterConfiguration: API.OperationMethod<
  CreateGlueIdentityCenterConfigurationRequest,
  CreateGlueIdentityCenterConfigurationResponse,
  CreateGlueIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, Scopes: 0, UserBackgroundSessionsEnabled: 0 },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlueIdentityCenterConfiguration",
})) as any;

export type CreateIntegrationError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | IntegrationConflictOperationFault
  | IntegrationQuotaExceededFault
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | KMSKeyNotAccessibleFault
  | ResourceNotFoundException
  | ResourceNumberLimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Zero-ETL integration in the caller's account between two resources with Amazon Resource Names (ARNs): the `SourceArn` and `TargetArn`.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationRequest,
  CreateIntegrationResponse,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IntegrationName: 0,
      SourceArn: 0,
      TargetArn: 0,
      Description: 0,
      DataFilter: 0,
      KmsKeyId: 0,
      AdditionalEncryptionContext: 0,
      Tags: D.list(i_Tag),
      IntegrationConfig: i_IntegrationConfig,
    },
    output: { CreateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    IntegrationConflictOperationFault,
    IntegrationQuotaExceededFault,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    KMSKeyNotAccessibleFault,
    ResourceNotFoundException,
    ResourceNumberLimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegration",
})) as any;

export type CreateIntegrationResourcePropertyError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API can be used for setting up the `ResourceProperty` of the Glue connection (for the source) or Glue database ARN (for the target). These properties can include the role to access the connection or database. To set both source and target properties the same API needs to be invoked with the Glue connection ARN as `ResourceArn` with `SourceProcessingProperties` and the Glue database ARN as `ResourceArn` with `TargetProcessingProperties` respectively.
 */
export const createIntegrationResourceProperty: API.OperationMethod<
  CreateIntegrationResourcePropertyRequest,
  CreateIntegrationResourcePropertyResponse,
  CreateIntegrationResourcePropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceArn: 0,
      SourceProcessingProperties: i_SourceProcessingProperties,
      TargetProcessingProperties: i_TargetProcessingProperties,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegrationResourceProperty",
})) as any;

export type CreateIntegrationTablePropertiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API is used to provide optional override properties for the the tables that need to be replicated. These properties can include properties for filtering and partitioning for the source and target tables. To set both source and target properties the same API need to be invoked with the Glue connection ARN as `ResourceArn` with `SourceTableConfig`, and the Glue database ARN as `ResourceArn` with `TargetTableConfig` respectively.
 */
export const createIntegrationTableProperties: API.OperationMethod<
  CreateIntegrationTablePropertiesRequest,
  CreateIntegrationTablePropertiesResponse,
  CreateIntegrationTablePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceArn: 0,
      TableName: 0,
      SourceTableConfig: i_SourceTableConfig,
      TargetTableConfig: i_TargetTableConfig,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegrationTableProperties",
})) as any;

export type CreateJobError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | GlueRoleNotAssumable
  | CommonErrors;
/**
 * Creates a new job definition.
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      JobMode: 0,
      JobRunQueuingEnabled: 0,
      Description: 0,
      LogUri: 0,
      Role: 0,
      ExecutionProperty: i_ExecutionProperty,
      Command: i_JobCommand,
      DefaultArguments: 0,
      NonOverridableArguments: 0,
      Connections: i_ConnectionsList,
      MaxRetries: 0,
      AllocatedCapacity: 0,
      Timeout: 0,
      MaxCapacity: 0,
      SecurityConfiguration: 0,
      Tags: 0,
      NotificationProperty: i_NotificationProperty,
      GlueVersion: 0,
      NumberOfWorkers: 0,
      WorkerType: 0,
      CodeGenConfigurationNodes: D.map(i_CodeGenConfigurationNode),
      ExecutionClass: 0,
      SourceControlDetails: i_SourceControlDetails,
      MaintenanceWindow: 0,
    },
  },
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    GlueRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
})) as any;

export type CreateMLTransformError =
  | AccessDeniedException
  | AlreadyExistsException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates an Glue machine learning transform. This operation creates the transform and
 * all the necessary parameters to train it.
 *
 * Call this operation as the first step in the process of using a machine learning transform
 * (such as the `FindMatches` transform) for deduplicating data. You can provide an
 * optional `Description`, in addition to the parameters that you want to use for your
 * algorithm.
 *
 * You must also specify certain parameters for the tasks that Glue runs on your
 * behalf as part of learning from your data and creating a high-quality machine learning
 * transform. These parameters include `Role`, and optionally,
 * `AllocatedCapacity`, `Timeout`, and `MaxRetries`. For more
 * information, see Jobs.
 */
export const createMLTransform: API.OperationMethod<
  CreateMLTransformRequest,
  CreateMLTransformResponse,
  CreateMLTransformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      InputRecordTables: D.list(i_GlueTable),
      Parameters: i_TransformParameters,
      Role: 0,
      GlueVersion: 0,
      MaxCapacity: 0,
      WorkerType: 0,
      NumberOfWorkers: 0,
      Timeout: 0,
      MaxRetries: 0,
      Tags: 0,
      TransformEncryption: {
        MlUserDataEncryption: { MlUserDataEncryptionMode: 0, KmsKeyId: 0 },
        TaskRunSecurityConfigurationName: 0,
      },
    },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMLTransform",
})) as any;

export type CreatePartitionError =
  | AlreadyExistsException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new partition.
 */
export const createPartition: API.OperationMethod<
  CreatePartitionRequest,
  CreatePartitionResponse,
  CreatePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      PartitionInput: i_PartitionInput,
    },
  },
  errors: [
    AlreadyExistsException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePartition",
})) as any;

export type CreatePartitionIndexError =
  | AlreadyExistsException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a specified partition index in an existing table.
 */
export const createPartitionIndex: API.OperationMethod<
  CreatePartitionIndexRequest,
  CreatePartitionIndexResponse,
  CreatePartitionIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      PartitionIndex: i_PartitionIndex,
    },
  },
  errors: [
    AlreadyExistsException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePartitionIndex",
})) as any;

export type CreateRegistryError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new registry which may be used to hold a collection of schemas.
 */
export const createRegistry: API.OperationMethod<
  CreateRegistryInput,
  CreateRegistryResponse,
  CreateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RegistryName: 0, Description: 0, Tags: 0 },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegistry",
})) as any;

export type CreateSchemaError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new schema set and registers the schema definition. Returns an error if the schema set already exists without actually registering the version.
 *
 * When the schema set is created, a version checkpoint will be set to the first version. Compatibility mode "DISABLED" restricts any additional schema versions from being added after the first schema version. For all other compatibility modes, validation of compatibility settings will be applied only from the second version onwards when the `RegisterSchemaVersion` API is used.
 *
 * When this API is called without a `RegistryId`, this will create an entry for a "default-registry" in the registry database tables, if it is not already present.
 */
export const createSchema: API.OperationMethod<
  CreateSchemaInput,
  CreateSchemaResponse,
  CreateSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RegistryId: i_RegistryId,
      SchemaName: 0,
      DataFormat: 0,
      Compatibility: 0,
      Description: 0,
      Tags: 0,
      SchemaDefinition: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchema",
})) as any;

export type CreateScriptError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Transforms a directed acyclic graph (DAG) into code.
 */
export const createScript: API.OperationMethod<
  CreateScriptRequest,
  CreateScriptResponse,
  CreateScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DagNodes: D.list({
        Id: 0,
        NodeType: 0,
        Args: D.list(i_CodeGenNodeArg),
        LineNumber: 0,
      }),
      DagEdges: D.list({ Source: 0, Target: 0, TargetParameter: 0 }),
      Language: 0,
    },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScript",
})) as any;

export type CreateSecurityConfigurationError =
  | AlreadyExistsException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new security configuration. A security configuration is a set of security properties that can be used by Glue. You can use a security configuration to encrypt data at rest. For information about using security configurations in Glue, see Encrypting Data Written by Crawlers, Jobs, and Development Endpoints.
 */
export const createSecurityConfiguration: API.OperationMethod<
  CreateSecurityConfigurationRequest,
  CreateSecurityConfigurationResponse,
  CreateSecurityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      EncryptionConfiguration: {
        S3Encryption: D.list({ S3EncryptionMode: 0, KmsKeyArn: 0 }),
        CloudWatchEncryption: { CloudWatchEncryptionMode: 0, KmsKeyArn: 0 },
        JobBookmarksEncryption: { JobBookmarksEncryptionMode: 0, KmsKeyArn: 0 },
        DataQualityEncryption: { DataQualityEncryptionMode: 0, KmsKeyArn: 0 },
      },
    },
    output: { CreatedTimestamp: D.ts },
  },
  errors: [
    AlreadyExistsException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityConfiguration",
})) as any;

export type CreateSessionError =
  | AccessDeniedException
  | AlreadyExistsException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new session.
 */
export const createSession: API.OperationMethod<
  CreateSessionRequest,
  CreateSessionResponse,
  CreateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Id: 0,
      Description: 0,
      Role: 0,
      Command: { Name: 0, PythonVersion: 0 },
      Timeout: 0,
      IdleTimeout: 0,
      DefaultArguments: 0,
      Connections: i_ConnectionsList,
      MaxCapacity: 0,
      NumberOfWorkers: 0,
      WorkerType: 0,
      SecurityConfiguration: 0,
      GlueVersion: 0,
      Tags: 0,
      RequestOrigin: 0,
      SessionType: 0,
    },
    output: { Session: o_Session },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSession",
})) as any;

export type CreateTableError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new table definition in the Data Catalog.
 */
export const createTable: API.OperationMethod<
  CreateTableRequest,
  CreateTableResponse,
  CreateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      Name: 0,
      TableInput: i_TableInput,
      PartitionIndexes: D.list(i_PartitionIndex),
      TransactionId: 0,
      OpenTableFormatInput: {
        IcebergInput: {
          MetadataOperation: 0,
          Version: 0,
          CreateIcebergTableInput: {
            Location: 0,
            Schema: i_IcebergSchema,
            PartitionSpec: i_IcebergPartitionSpec,
            WriteOrder: i_IcebergSortOrder,
            Properties: 0,
          },
        },
      },
    },
  },
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTable",
})) as any;

export type CreateTableOptimizerError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new table optimizer for a specific function.
 */
export const createTableOptimizer: API.OperationMethod<
  CreateTableOptimizerRequest,
  CreateTableOptimizerResponse,
  CreateTableOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      Type: 0,
      TableOptimizerConfiguration: i_TableOptimizerConfiguration,
    },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTableOptimizer",
})) as any;

export type CreateTriggerError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new trigger.
 *
 * Job arguments may be logged. Do not pass plaintext secrets as arguments. Retrieve secrets from a Glue Connection, Amazon Web Services Secrets Manager or other secret management mechanism if you intend to keep them within the Job.
 */
export const createTrigger: API.OperationMethod<
  CreateTriggerRequest,
  CreateTriggerResponse,
  CreateTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      WorkflowName: 0,
      Type: 0,
      Schedule: 0,
      Predicate: i_Predicate,
      Actions: D.list(i_Action),
      Description: 0,
      StartOnCreation: 0,
      Tags: 0,
      EventBatchingCondition: i_EventBatchingCondition,
    },
  },
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrigger",
})) as any;

export type CreateUsageProfileError =
  | AlreadyExistsException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates an Glue usage profile.
 */
export const createUsageProfile: API.OperationMethod<
  CreateUsageProfileRequest,
  CreateUsageProfileResponse,
  CreateUsageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      Configuration: i_ProfileConfiguration,
      Tags: 0,
    },
  },
  errors: [
    AlreadyExistsException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsageProfile",
})) as any;

export type CreateUserDefinedFunctionError =
  | AlreadyExistsException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new function definition in the Data Catalog.
 */
export const createUserDefinedFunction: API.OperationMethod<
  CreateUserDefinedFunctionRequest,
  CreateUserDefinedFunctionResponse,
  CreateUserDefinedFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      FunctionInput: i_UserDefinedFunctionInput,
    },
  },
  errors: [
    AlreadyExistsException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserDefinedFunction",
})) as any;

export type CreateWorkflowError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new workflow.
 */
export const createWorkflow: API.OperationMethod<
  CreateWorkflowRequest,
  CreateWorkflowResponse,
  CreateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      DefaultRunProperties: 0,
      Tags: 0,
      MaxConcurrentRuns: 0,
    },
  },
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflow",
})) as any;

export type DeleteAssetError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an asset from Glue Data Catalog.
 */
export const deleteAsset: API.OperationMethod<
  DeleteAssetRequest,
  DeleteAssetResponse,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identifier: 0 } },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAsset",
})) as any;

export type DeleteAssetTypeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an asset type from Glue Data Catalog.
 */
export const deleteAssetType: API.OperationMethod<
  DeleteAssetTypeRequest,
  DeleteAssetTypeResponse,
  DeleteAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identifier: 0 } },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssetType",
})) as any;

export type DeleteAttachmentError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a form attachment from an asset in Glue Data Catalog.
 */
export const deleteAttachment: API.OperationMethod<
  DeleteAttachmentRequest,
  DeleteAttachmentResponse,
  DeleteAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AssetIdentifier: 0,
      IterableFormName: 0,
      ItemIdentifier: 0,
      AttachmentName: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttachment",
})) as any;

export type DeleteBlueprintError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes an existing blueprint.
 */
export const deleteBlueprint: API.OperationMethod<
  DeleteBlueprintRequest,
  DeleteBlueprintResponse,
  DeleteBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBlueprint",
})) as any;

export type DeleteCatalogError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Removes the specified catalog from the Glue Data Catalog.
 *
 * After completing this operation, you no longer have access to the databases, tables (and all table versions and partitions that might belong to the tables) and the user-defined functions in the deleted catalog. Glue deletes these "orphaned" resources asynchronously in a timely manner, at the discretion of the service.
 *
 * To ensure the immediate deletion of all related resources before calling the `DeleteCatalog` operation, use `DeleteTableVersion` (or `BatchDeleteTableVersion`), `DeletePartition` (or `BatchDeletePartition`), `DeleteTable` (or `BatchDeleteTable`), `DeleteUserDefinedFunction` and `DeleteDatabase` to delete any resources that belong to the catalog.
 */
export const deleteCatalog: API.OperationMethod<
  DeleteCatalogRequest,
  DeleteCatalogResponse,
  DeleteCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CatalogId: 0 } },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCatalog",
})) as any;

export type DeleteClassifierError =
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Removes a classifier from the Data Catalog.
 */
export const deleteClassifier: API.OperationMethod<
  DeleteClassifierRequest,
  DeleteClassifierResponse,
  DeleteClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClassifier",
})) as any;

export type DeleteColumnStatisticsForPartitionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Delete the partition column statistics of a column.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `DeletePartition`.
 */
export const deleteColumnStatisticsForPartition: API.OperationMethod<
  DeleteColumnStatisticsForPartitionRequest,
  DeleteColumnStatisticsForPartitionResponse,
  DeleteColumnStatisticsForPartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      PartitionValues: 0,
      ColumnName: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteColumnStatisticsForPartition",
})) as any;

export type DeleteColumnStatisticsForTableError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves table statistics of columns.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `DeleteTable`.
 */
export const deleteColumnStatisticsForTable: API.OperationMethod<
  DeleteColumnStatisticsForTableRequest,
  DeleteColumnStatisticsForTableResponse,
  DeleteColumnStatisticsForTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, TableName: 0, ColumnName: 0 },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteColumnStatisticsForTable",
})) as any;

export type DeleteColumnStatisticsTaskSettingsError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes settings for a column statistics task.
 */
export const deleteColumnStatisticsTaskSettings: API.OperationMethod<
  DeleteColumnStatisticsTaskSettingsRequest,
  DeleteColumnStatisticsTaskSettingsResponse,
  DeleteColumnStatisticsTaskSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatabaseName: 0, TableName: 0 } },
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteColumnStatisticsTaskSettings",
})) as any;

export type DeleteConnectionError =
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a connection from the Data Catalog.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CatalogId: 0, ConnectionName: 0 } },
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
})) as any;

export type DeleteConnectionTypeError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom connection type in Glue.
 *
 * The connection type must exist and be registered before it can be deleted. This operation supports cleanup of connection type resources and helps maintain proper lifecycle management of custom connection types.
 */
export const deleteConnectionType: API.OperationMethod<
  DeleteConnectionTypeRequest,
  DeleteConnectionTypeResponse,
  DeleteConnectionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ConnectionType: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectionType",
})) as any;

export type DeleteCrawlerError =
  | CrawlerRunningException
  | EntityNotFoundException
  | OperationTimeoutException
  | SchedulerTransitioningException
  | CommonErrors;
/**
 * Removes a specified crawler from the Glue Data Catalog, unless the crawler state is
 * `RUNNING`.
 */
export const deleteCrawler: API.OperationMethod<
  DeleteCrawlerRequest,
  DeleteCrawlerResponse,
  DeleteCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    CrawlerRunningException,
    EntityNotFoundException,
    OperationTimeoutException,
    SchedulerTransitioningException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCrawler",
})) as any;

export type DeleteCustomEntityTypeError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a custom pattern by specifying its name.
 */
export const deleteCustomEntityType: API.OperationMethod<
  DeleteCustomEntityTypeRequest,
  DeleteCustomEntityTypeResponse,
  DeleteCustomEntityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomEntityType",
})) as any;

export type DeleteDatabaseError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Removes a specified database from a Data Catalog.
 *
 * After completing this operation, you no longer have access to the tables (and all table
 * versions and partitions that might belong to the tables) and the user-defined functions in
 * the deleted database. Glue deletes these "orphaned" resources asynchronously in a timely
 * manner, at the discretion of the service.
 *
 * To ensure the immediate deletion of all related resources, before calling
 * `DeleteDatabase`, use `DeleteTableVersion` or
 * `BatchDeleteTableVersion`, `DeletePartition` or
 * `BatchDeletePartition`, `DeleteUserDefinedFunction`, and
 * `DeleteTable` or `BatchDeleteTable`, to delete any resources that
 * belong to the database.
 */
export const deleteDatabase: API.OperationMethod<
  DeleteDatabaseRequest,
  DeleteDatabaseResponse,
  DeleteDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CatalogId: 0, Name: 0 } },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatabase",
})) as any;

export type DeleteDataQualityRulesetError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a data quality ruleset.
 */
export const deleteDataQualityRuleset: API.OperationMethod<
  DeleteDataQualityRulesetRequest,
  DeleteDataQualityRulesetResponse,
  DeleteDataQualityRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataQualityRuleset",
})) as any;

export type DeleteDevEndpointError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified development endpoint.
 */
export const deleteDevEndpoint: API.OperationMethod<
  DeleteDevEndpointRequest,
  DeleteDevEndpointResponse,
  DeleteDevEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EndpointName: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevEndpoint",
})) as any;

export type DeleteFormTypeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | ConflictException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a form type from Glue Data Catalog. A form type cannot be deleted if it is still referenced by an asset type.
 */
export const deleteFormType: API.OperationMethod<
  DeleteFormTypeRequest,
  DeleteFormTypeResponse,
  DeleteFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identifier: 0 } },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    ConflictException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFormType",
})) as any;

export type DeleteGlossaryError =
  | AccessDeniedException
  | ConcurrentModificationException
  | ConflictException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a business glossary from Glue Data Catalog. A glossary cannot be deleted if it still contains glossary terms.
 */
export const deleteGlossary: API.OperationMethod<
  DeleteGlossaryRequest,
  DeleteGlossaryResponse,
  DeleteGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identifier: 0 } },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    ConflictException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlossary",
})) as any;

export type DeleteGlossaryTermError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a glossary term from Glue Data Catalog.
 */
export const deleteGlossaryTerm: API.OperationMethod<
  DeleteGlossaryTermRequest,
  DeleteGlossaryTermResponse,
  DeleteGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identifier: 0 } },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlossaryTerm",
})) as any;

export type DeleteGlueIdentityCenterConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes the existing Glue Identity Center configuration, removing the integration between Glue and
 * Amazon Web Services IAM Identity Center.
 */
export const deleteGlueIdentityCenterConfiguration: API.OperationMethod<
  DeleteGlueIdentityCenterConfigurationRequest,
  DeleteGlueIdentityCenterConfigurationResponse,
  DeleteGlueIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlueIdentityCenterConfiguration",
})) as any;

export type DeleteIntegrationError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | IntegrationConflictOperationFault
  | IntegrationNotFoundFault
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | InvalidIntegrationStateFault
  | InvalidStateException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Zero-ETL integration.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationRequest,
  DeleteIntegrationResponse,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IntegrationIdentifier: 0 },
    output: { CreateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    IntegrationConflictOperationFault,
    IntegrationNotFoundFault,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    InvalidIntegrationStateFault,
    InvalidStateException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
})) as any;

export type DeleteIntegrationResourcePropertyError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API is used for deleting the `ResourceProperty` of the Glue connection (for the source) or Glue database ARN (for the target).
 */
export const deleteIntegrationResourceProperty: API.OperationMethod<
  DeleteIntegrationResourcePropertyRequest,
  DeleteIntegrationResourcePropertyResponse,
  DeleteIntegrationResourcePropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegrationResourceProperty",
})) as any;

export type DeleteIntegrationTablePropertiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the table properties that have been created for the tables that need to be replicated.
 */
export const deleteIntegrationTableProperties: API.OperationMethod<
  DeleteIntegrationTablePropertiesRequest,
  DeleteIntegrationTablePropertiesResponse,
  DeleteIntegrationTablePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TableName: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegrationTableProperties",
})) as any;

export type DeleteJobError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified job definition. If the job definition
 * is not found, no exception is thrown.
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResponse,
  DeleteJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobName: 0 } },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
})) as any;

export type DeleteMLTransformError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes an Glue machine learning transform. Machine learning transforms are a special
 * type of transform that use machine learning to learn the details of the transformation to be
 * performed by learning from examples provided by humans. These transformations are then saved
 * by Glue. If you no longer need a transform, you can delete it by calling
 * `DeleteMLTransforms`. However, any Glue jobs that still reference the deleted
 * transform will no longer succeed.
 */
export const deleteMLTransform: API.OperationMethod<
  DeleteMLTransformRequest,
  DeleteMLTransformResponse,
  DeleteMLTransformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TransformId: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLTransform",
})) as any;

export type DeletePartitionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified partition.
 */
export const deletePartition: API.OperationMethod<
  DeletePartitionRequest,
  DeletePartitionResponse,
  DeletePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, TableName: 0, PartitionValues: 0 },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePartition",
})) as any;

export type DeletePartitionIndexError =
  | ConflictException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified partition index from an existing table.
 */
export const deletePartitionIndex: API.OperationMethod<
  DeletePartitionIndexRequest,
  DeletePartitionIndexResponse,
  DeletePartitionIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, TableName: 0, IndexName: 0 },
  },
  errors: [
    ConflictException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePartitionIndex",
})) as any;

export type DeleteRegistryError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InvalidInputException
  | CommonErrors;
/**
 * Delete the entire registry including schema and all of its versions. To get the status of the delete operation, you can call the `GetRegistry` API after the asynchronous call. Deleting a registry will deactivate all online operations for the registry such as the `UpdateRegistry`, `CreateSchema`, `UpdateSchema`, and `RegisterSchemaVersion` APIs.
 */
export const deleteRegistry: API.OperationMethod<
  DeleteRegistryInput,
  DeleteRegistryResponse,
  DeleteRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RegistryId: i_RegistryId } },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegistry",
})) as any;

export type DeleteResourcePolicyError =
  | ConditionCheckFailureException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified policy.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PolicyHashCondition: 0, ResourceArn: 0 },
  },
  errors: [
    ConditionCheckFailureException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteSchemaError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InvalidInputException
  | CommonErrors;
/**
 * Deletes the entire schema set, including the schema set and all of its versions. To get the status of the delete operation, you can call `GetSchema` API after the asynchronous call. Deleting a registry will deactivate all online operations for the schema, such as the `GetSchemaByDefinition`, and `RegisterSchemaVersion` APIs.
 */
export const deleteSchema: API.OperationMethod<
  DeleteSchemaInput,
  DeleteSchemaResponse,
  DeleteSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SchemaId: i_SchemaId } },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchema",
})) as any;

export type DeleteSchemaVersionsError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InvalidInputException
  | CommonErrors;
/**
 * Remove versions from the specified schema. A version number or range may be supplied. If the compatibility mode forbids deleting of a version that is necessary, such as BACKWARDS_FULL, an error is returned. Calling the `GetSchemaVersions` API after this call will list the status of the deleted versions.
 *
 * When the range of version numbers contain check pointed version, the API will return a 409 conflict and will not proceed with the deletion. You have to remove the checkpoint first using the `DeleteSchemaCheckpoint` API before using this API.
 *
 * You cannot use the `DeleteSchemaVersions` API to delete the first schema version in the schema set. The first schema version can only be deleted by the `DeleteSchema` API. This operation will also delete the attached `SchemaVersionMetadata` under the schema versions. Hard deletes will be enforced on the database.
 *
 * If the compatibility mode forbids deleting of a version that is necessary, such as BACKWARDS_FULL, an error is returned.
 */
export const deleteSchemaVersions: API.OperationMethod<
  DeleteSchemaVersionsInput,
  DeleteSchemaVersionsResponse,
  DeleteSchemaVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SchemaId: i_SchemaId, Versions: 0 } },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchemaVersions",
})) as any;

export type DeleteSecurityConfigurationError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified security configuration.
 */
export const deleteSecurityConfiguration: API.OperationMethod<
  DeleteSecurityConfigurationRequest,
  DeleteSecurityConfigurationResponse,
  DeleteSecurityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityConfiguration",
})) as any;

export type DeleteSessionError =
  | AccessDeniedException
  | ConcurrentModificationException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes the session.
 */
export const deleteSession: API.OperationMethod<
  DeleteSessionRequest,
  DeleteSessionResponse,
  DeleteSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Id: 0, RequestOrigin: 0 } },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSession",
})) as any;

export type DeleteTableError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Removes a table definition from the Data Catalog.
 *
 * After completing this operation, you no longer have access to the table versions and
 * partitions that belong to the deleted table. Glue deletes these "orphaned" resources
 * asynchronously in a timely manner, at the discretion of the service.
 *
 * To ensure the immediate deletion of all related resources, before calling
 * `DeleteTable`, use `DeleteTableVersion` or
 * `BatchDeleteTableVersion`, and `DeletePartition` or
 * `BatchDeletePartition`, to delete any resources that belong to the
 * table.
 */
export const deleteTable: API.OperationMethod<
  DeleteTableRequest,
  DeleteTableResponse,
  DeleteTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, Name: 0, TransactionId: 0 },
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTable",
})) as any;

export type DeleteTableOptimizerError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an optimizer and all associated metadata for a table. The optimization will no longer be performed on the table.
 */
export const deleteTableOptimizer: API.OperationMethod<
  DeleteTableOptimizerRequest,
  DeleteTableOptimizerResponse,
  DeleteTableOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, TableName: 0, Type: 0 },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTableOptimizer",
})) as any;

export type DeleteTableVersionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified version of a table.
 */
export const deleteTableVersion: API.OperationMethod<
  DeleteTableVersionRequest,
  DeleteTableVersionResponse,
  DeleteTableVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, TableName: 0, VersionId: 0 },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTableVersion",
})) as any;

export type DeleteTriggerError =
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified trigger. If the trigger is not found, no
 * exception is thrown.
 */
export const deleteTrigger: API.OperationMethod<
  DeleteTriggerRequest,
  DeleteTriggerResponse,
  DeleteTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrigger",
})) as any;

export type DeleteUsageProfileError =
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes the Glue specified usage profile.
 */
export const deleteUsageProfile: API.OperationMethod<
  DeleteUsageProfileRequest,
  DeleteUsageProfileResponse,
  DeleteUsageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageProfile",
})) as any;

export type DeleteUserDefinedFunctionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes an existing function definition from the Data Catalog.
 */
export const deleteUserDefinedFunction: API.OperationMethod<
  DeleteUserDefinedFunctionRequest,
  DeleteUserDefinedFunctionResponse,
  DeleteUserDefinedFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, FunctionName: 0 },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserDefinedFunction",
})) as any;

export type DeleteWorkflowError =
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a workflow.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflow",
})) as any;

export type DescribeConnectionTypeError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ValidationException
  | CommonErrors;
/**
 * The `DescribeConnectionType` API provides full details of the supported options for a given connection type in Glue. The response includes authentication configuration details that show supported authentication types and properties, and RestConfiguration for custom REST-based connection types registered via `RegisterConnectionType`.
 *
 * See also: `ListConnectionTypes`, `RegisterConnectionType`, `DeleteConnectionType`
 */
export const describeConnectionType: API.OperationMethod<
  DescribeConnectionTypeRequest,
  DescribeConnectionTypeResponse,
  DescribeConnectionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ConnectionType: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionType",
})) as any;

export type DescribeEntityError =
  | AccessDeniedException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Provides details regarding the entity used with the connection type, with a description of the data model for each field in the selected entity.
 *
 * The response includes all the fields which make up the entity.
 */
export const describeEntity: API.PaginatedOperationMethod<
  DescribeEntityRequest,
  DescribeEntityResponse,
  DescribeEntityError,
  Credentials | HttpClient.HttpClient,
  Field
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ConnectionName: 0,
      CatalogId: 0,
      EntityName: 0,
      NextToken: 0,
      DataStoreApiVersion: 0,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntity",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Fields",
  } as const,
})) as any;

export type DescribeInboundIntegrationsError =
  | AccessDeniedException
  | EntityNotFoundException
  | IntegrationNotFoundFault
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | TargetResourceNotFound
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of inbound integrations for the specified integration.
 */
export const describeInboundIntegrations: API.OperationMethod<
  DescribeInboundIntegrationsRequest,
  DescribeInboundIntegrationsResponse,
  DescribeInboundIntegrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IntegrationArn: 0, Marker: 0, MaxRecords: 0, TargetArn: 0 },
    output: { InboundIntegrations: D.list({ CreateTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IntegrationNotFoundFault,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    TargetResourceNotFound,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundIntegrations",
})) as any;

export type DescribeIntegrationsError =
  | AccessDeniedException
  | EntityNotFoundException
  | IntegrationNotFoundFault
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ValidationException
  | CommonErrors;
/**
 * The API is used to retrieve a list of integrations.
 */
export const describeIntegrations: API.OperationMethod<
  DescribeIntegrationsRequest,
  DescribeIntegrationsResponse,
  DescribeIntegrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IntegrationIdentifier: 0,
      Marker: 0,
      MaxRecords: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
    },
    output: { Integrations: D.list({ CreateTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IntegrationNotFoundFault,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIntegrations",
})) as any;

export type DisassociateGlossaryTermsError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the association of one or more glossary terms from an asset in Glue Data Catalog.
 */
export const disassociateGlossaryTerms: API.OperationMethod<
  DisassociateGlossaryTermsRequest,
  DisassociateGlossaryTermsResponse,
  DisassociateGlossaryTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AssetIdentifier: 0,
      IterableFormName: 0,
      ItemIdentifier: 0,
      GlossaryTermIdentifiers: 0,
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateGlossaryTerms",
})) as any;

export type GetAssetError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for an asset in Glue Data Catalog, including its forms, additional attachments, and associated glossary terms.
 */
export const getAsset: API.OperationMethod<
  GetAssetInput,
  GetAssetOutput,
  GetAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identifier: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAsset",
})) as any;

export type GetAssetTypeError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves an asset type in Glue Data Catalog by its identifier.
 */
export const getAssetType: API.OperationMethod<
  GetAssetTypeRequest,
  GetAssetTypeResponse,
  GetAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identifier: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetType",
})) as any;

export type GetBlueprintError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the details of a blueprint.
 */
export const getBlueprint: API.OperationMethod<
  GetBlueprintRequest,
  GetBlueprintResponse,
  GetBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, IncludeBlueprint: 0, IncludeParameterSpec: 0 },
    output: { Blueprint: o_Blueprint },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprint",
})) as any;

export type GetBlueprintRunError =
  | EntityNotFoundException
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the details of a blueprint run.
 */
export const getBlueprintRun: API.OperationMethod<
  GetBlueprintRunRequest,
  GetBlueprintRunResponse,
  GetBlueprintRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { BlueprintName: 0, RunId: 0 },
    output: { BlueprintRun: o_BlueprintRun },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprintRun",
})) as any;

export type GetBlueprintRunsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the details of blueprint runs for a specified blueprint.
 */
export const getBlueprintRuns: API.PaginatedOperationMethod<
  GetBlueprintRunsRequest,
  GetBlueprintRunsResponse,
  GetBlueprintRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { BlueprintName: 0, NextToken: 0, MaxResults: 0 },
    output: { BlueprintRuns: D.list(o_BlueprintRun) },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprintRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCatalogError =
  | AccessDeniedException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * The name of the Catalog to retrieve. This should be all lowercase.
 */
export const getCatalog: API.OperationMethod<
  GetCatalogRequest,
  GetCatalogResponse,
  GetCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0 },
    output: { Catalog: o_Catalog },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCatalog",
})) as any;

export type GetCatalogImportStatusError =
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the status of a migration operation.
 */
export const getCatalogImportStatus: API.OperationMethod<
  GetCatalogImportStatusRequest,
  GetCatalogImportStatusResponse,
  GetCatalogImportStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0 },
    output: { ImportStatus: { ImportTime: D.ts } },
  },
  errors: [InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCatalogImportStatus",
})) as any;

export type GetCatalogsError =
  | AccessDeniedException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves all catalogs defined in a catalog in the Glue Data Catalog. For a Redshift-federated catalog use case, this operation returns the list of catalogs mapped to Redshift databases in the Redshift namespace catalog.
 */
export const getCatalogs: API.OperationMethod<
  GetCatalogsRequest,
  GetCatalogsResponse,
  GetCatalogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ParentCatalogId: 0,
      NextToken: 0,
      MaxResults: 0,
      Recursive: 0,
      IncludeRoot: 0,
      HasDatabases: 0,
    },
    output: { CatalogList: D.list(o_Catalog) },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCatalogs",
})) as any;

export type GetClassifierError =
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieve a classifier by name.
 */
export const getClassifier: API.OperationMethod<
  GetClassifierRequest,
  GetClassifierResponse,
  GetClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { Classifier: o_Classifier },
  },
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClassifier",
})) as any;

export type GetClassifiersError = OperationTimeoutException | CommonErrors;
/**
 * Lists all classifier objects in the Data Catalog.
 */
export const getClassifiers: API.PaginatedOperationMethod<
  GetClassifiersRequest,
  GetClassifiersResponse,
  GetClassifiersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { Classifiers: D.list(o_Classifier) },
  },
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClassifiers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetColumnStatisticsForPartitionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves partition statistics of columns.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `GetPartition`.
 */
export const getColumnStatisticsForPartition: API.OperationMethod<
  GetColumnStatisticsForPartitionRequest,
  GetColumnStatisticsForPartitionResponse,
  GetColumnStatisticsForPartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      PartitionValues: 0,
      ColumnNames: 0,
    },
    output: { ColumnStatisticsList: D.list(o_ColumnStatistics) },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsForPartition",
})) as any;

export type GetColumnStatisticsForTableError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves table statistics of columns.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `GetTable`.
 */
export const getColumnStatisticsForTable: API.OperationMethod<
  GetColumnStatisticsForTableRequest,
  GetColumnStatisticsForTableResponse,
  GetColumnStatisticsForTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, TableName: 0, ColumnNames: 0 },
    output: { ColumnStatisticsList: D.list(o_ColumnStatistics) },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsForTable",
})) as any;

export type GetColumnStatisticsTaskRunError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Get the associated metadata/information for a task run, given a task run ID.
 */
export const getColumnStatisticsTaskRun: API.OperationMethod<
  GetColumnStatisticsTaskRunRequest,
  GetColumnStatisticsTaskRunResponse,
  GetColumnStatisticsTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ColumnStatisticsTaskRunId: 0 },
    output: { ColumnStatisticsTaskRun: o_ColumnStatisticsTaskRun },
  },
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsTaskRun",
})) as any;

export type GetColumnStatisticsTaskRunsError =
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves information about all runs associated with the specified table.
 */
export const getColumnStatisticsTaskRuns: API.PaginatedOperationMethod<
  GetColumnStatisticsTaskRunsRequest,
  GetColumnStatisticsTaskRunsResponse,
  GetColumnStatisticsTaskRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DatabaseName: 0, TableName: 0, MaxResults: 0, NextToken: 0 },
    output: { ColumnStatisticsTaskRuns: D.list(o_ColumnStatisticsTaskRun) },
  },
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsTaskRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetColumnStatisticsTaskSettingsError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets settings for a column statistics task.
 */
export const getColumnStatisticsTaskSettings: API.OperationMethod<
  GetColumnStatisticsTaskSettingsRequest,
  GetColumnStatisticsTaskSettingsResponse,
  GetColumnStatisticsTaskSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatabaseName: 0, TableName: 0 },
    output: {
      ColumnStatisticsTaskSettings: {
        LastExecutionAttempt: { ExecutionTimestamp: D.ts },
      },
    },
  },
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsTaskSettings",
})) as any;

export type GetConnectionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a connection definition from the Data Catalog.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      Name: 0,
      HidePassword: 0,
      ApplyOverrideForComputeEnvironment: 0,
    },
    output: { Connection: o_Connection },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
})) as any;

export type GetConnectionsError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a list of connection definitions from the Data Catalog.
 */
export const getConnections: API.PaginatedOperationMethod<
  GetConnectionsRequest,
  GetConnectionsResponse,
  GetConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      Filter: {
        MatchCriteria: 0,
        ConnectionType: 0,
        ConnectionSchemaVersion: 0,
      },
      HidePassword: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { ConnectionList: D.list(o_Connection) },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCrawlerError =
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves metadata for a specified crawler.
 */
export const getCrawler: API.OperationMethod<
  GetCrawlerRequest,
  GetCrawlerResponse,
  GetCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { Crawler: o_Crawler },
  },
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCrawler",
})) as any;

export type GetCrawlerMetricsError = OperationTimeoutException | CommonErrors;
/**
 * Retrieves metrics about specified crawlers.
 */
export const getCrawlerMetrics: API.PaginatedOperationMethod<
  GetCrawlerMetricsRequest,
  GetCrawlerMetricsResponse,
  GetCrawlerMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CrawlerNameList: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCrawlerMetrics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCrawlersError = OperationTimeoutException | CommonErrors;
/**
 * Retrieves metadata for all crawlers defined in the customer
 * account.
 */
export const getCrawlers: API.PaginatedOperationMethod<
  GetCrawlersRequest,
  GetCrawlersResponse,
  GetCrawlersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { Crawlers: D.list(o_Crawler) },
  },
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCrawlers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCustomEntityTypeError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the details of a custom pattern by specifying its name.
 */
export const getCustomEntityType: API.OperationMethod<
  GetCustomEntityTypeRequest,
  GetCustomEntityTypeResponse,
  GetCustomEntityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomEntityType",
})) as any;

export type GetDashboardUrlError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | CommonErrors;
/**
 * Retrieves the URL for the Spark monitoring dashboard for a Glue resource.
 */
export const getDashboardUrl: API.OperationMethod<
  GetDashboardUrlRequest,
  GetDashboardUrlResponse,
  GetDashboardUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceId: 0, ResourceType: 0, RequestOrigin: 0 },
    output: { Url: D.secret },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboardUrl",
})) as any;

export type GetDatabaseError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the definition of a specified database.
 */
export const getDatabase: API.OperationMethod<
  GetDatabaseRequest,
  GetDatabaseResponse,
  GetDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, Name: 0 },
    output: { Database: o_Database },
  },
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatabase",
})) as any;

export type GetDatabasesError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves all databases defined in a given Data Catalog.
 */
export const getDatabases: API.PaginatedOperationMethod<
  GetDatabasesRequest,
  GetDatabasesResponse,
  GetDatabasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      NextToken: 0,
      MaxResults: 0,
      ResourceShareType: 0,
      AttributesToGet: 0,
    },
    output: { DatabaseList: D.list(o_Database) },
  },
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatabases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetDataCatalogEncryptionSettingsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the security configuration for a specified catalog.
 */
export const getDataCatalogEncryptionSettings: API.OperationMethod<
  GetDataCatalogEncryptionSettingsRequest,
  GetDataCatalogEncryptionSettingsResponse,
  GetDataCatalogEncryptionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CatalogId: 0 } },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataCatalogEncryptionSettings",
})) as any;

export type GetDataCatalogExportConfigurationError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the current export configuration for the Glue Data Catalog. The export configuration controls whether catalog metadata is exported to S3 Tables.
 */
export const getDataCatalogExportConfiguration: API.OperationMethod<
  GetDataCatalogExportConfigurationInput,
  GetDataCatalogExportConfigurationOutput,
  GetDataCatalogExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataCatalogExportConfiguration",
})) as any;

export type GetDataflowGraphError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Transforms a Python script into a directed acyclic graph (DAG).
 */
export const getDataflowGraph: API.OperationMethod<
  GetDataflowGraphRequest,
  GetDataflowGraphResponse,
  GetDataflowGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PythonScript: 0 } },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataflowGraph",
})) as any;

export type GetDataQualityModelError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieve the training status of the model along with more information (CompletedOn, StartedOn, FailureReason).
 */
export const getDataQualityModel: API.OperationMethod<
  GetDataQualityModelRequest,
  GetDataQualityModelResponse,
  GetDataQualityModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StatisticId: 0, ProfileId: 0 },
    output: { StartedOn: D.ts, CompletedOn: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityModel",
})) as any;

export type GetDataQualityModelResultError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieve a statistic's predictions for a given Profile ID.
 */
export const getDataQualityModelResult: API.OperationMethod<
  GetDataQualityModelResultRequest,
  GetDataQualityModelResultResponse,
  GetDataQualityModelResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StatisticId: 0, ProfileId: 0 },
    output: { CompletedOn: D.ts, Model: D.list({ Date: D.ts }) },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityModelResult",
})) as any;

export type GetDataQualityResultError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the result of a data quality rule evaluation.
 */
export const getDataQualityResult: API.OperationMethod<
  GetDataQualityResultRequest,
  GetDataQualityResultResponse,
  GetDataQualityResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResultId: 0 },
    output: {
      StartedOn: D.ts,
      CompletedOn: D.ts,
      RuleResults: D.list(o_DataQualityRuleResult),
      AnalyzerResults: D.list(o_DataQualityAnalyzerResult),
      Observations: D.list(o_DataQualityObservation),
    },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityResult",
})) as any;

export type GetDataQualityRuleRecommendationRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets the specified recommendation run that was used to generate rules.
 */
export const getDataQualityRuleRecommendationRun: API.OperationMethod<
  GetDataQualityRuleRecommendationRunRequest,
  GetDataQualityRuleRecommendationRunResponse,
  GetDataQualityRuleRecommendationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RunId: 0 },
    output: { StartedOn: D.ts, LastModifiedOn: D.ts, CompletedOn: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityRuleRecommendationRun",
})) as any;

export type GetDataQualityRulesetError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns an existing ruleset by identifier or name.
 */
export const getDataQualityRuleset: API.OperationMethod<
  GetDataQualityRulesetRequest,
  GetDataQualityRulesetResponse,
  GetDataQualityRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { CreatedOn: D.ts, LastModifiedOn: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityRuleset",
})) as any;

export type GetDataQualityRulesetEvaluationRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a specific run where a ruleset is evaluated against a data source.
 */
export const getDataQualityRulesetEvaluationRun: API.OperationMethod<
  GetDataQualityRulesetEvaluationRunRequest,
  GetDataQualityRulesetEvaluationRunResponse,
  GetDataQualityRulesetEvaluationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RunId: 0 },
    output: { StartedOn: D.ts, LastModifiedOn: D.ts, CompletedOn: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityRulesetEvaluationRun",
})) as any;

export type GetDevEndpointError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves information about a specified development endpoint.
 *
 * When you create a development endpoint in a virtual private cloud (VPC), Glue returns only
 * a private IP address, and the public IP address field is not populated. When you create a
 * non-VPC development endpoint, Glue returns only a public IP address.
 */
export const getDevEndpoint: API.OperationMethod<
  GetDevEndpointRequest,
  GetDevEndpointResponse,
  GetDevEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EndpointName: 0 },
    output: { DevEndpoint: o_DevEndpoint },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevEndpoint",
})) as any;

export type GetDevEndpointsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves all the development endpoints in this Amazon Web Services account.
 *
 * When you create a development endpoint in a virtual private cloud (VPC), Glue returns only a private IP address
 * and the public IP address field is not populated. When you create a non-VPC development
 * endpoint, Glue returns only a public IP address.
 */
export const getDevEndpoints: API.PaginatedOperationMethod<
  GetDevEndpointsRequest,
  GetDevEndpointsResponse,
  GetDevEndpointsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { DevEndpoints: D.list(o_DevEndpoint) },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetEntityRecordsError =
  | AccessDeniedException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * This API is used to query preview data from a given connection type or from a native Amazon S3 based Glue Data Catalog.
 *
 * Returns records as an array of JSON blobs. Each record is formatted using Jackson JsonNode based on the field type defined by the `DescribeEntity` API.
 *
 * Spark connectors generate schemas according to the same data type mapping as in the `DescribeEntity` API. Spark connectors convert data to the appropriate data types matching the schema when returning rows.
 */
export const getEntityRecords: API.OperationMethod<
  GetEntityRecordsRequest,
  GetEntityRecordsResponse,
  GetEntityRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ConnectionName: 0,
      CatalogId: 0,
      EntityName: 0,
      NextToken: 0,
      DataStoreApiVersion: 0,
      ConnectionOptions: 0,
      FilterPredicate: 0,
      Limit: 0,
      OrderBy: 0,
      SelectedFields: 0,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEntityRecords",
})) as any;

export type GetFormTypeError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a form type in Glue Data Catalog by its identifier.
 */
export const getFormType: API.OperationMethod<
  GetFormTypeRequest,
  GetFormTypeResponse,
  GetFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identifier: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFormType",
})) as any;

export type GetGlossaryError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a business glossary in Glue Data Catalog by its identifier.
 */
export const getGlossary: API.OperationMethod<
  GetGlossaryRequest,
  GetGlossaryResponse,
  GetGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identifier: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlossary",
})) as any;

export type GetGlossaryTermError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a glossary term in Glue Data Catalog by its identifier.
 */
export const getGlossaryTerm: API.OperationMethod<
  GetGlossaryTermRequest,
  GetGlossaryTermResponse,
  GetGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identifier: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlossaryTerm",
})) as any;

export type GetGlueIdentityCenterConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the current Glue Identity Center configuration details, including the associated Identity Center instance and
 * application information.
 */
export const getGlueIdentityCenterConfiguration: API.OperationMethod<
  GetGlueIdentityCenterConfigurationRequest,
  GetGlueIdentityCenterConfigurationResponse,
  GetGlueIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlueIdentityCenterConfiguration",
})) as any;

export type GetIntegrationResourcePropertyError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API is used for fetching the `ResourceProperty` of the Glue connection (for the source) or Glue database ARN (for the target)
 */
export const getIntegrationResourceProperty: API.OperationMethod<
  GetIntegrationResourcePropertyRequest,
  GetIntegrationResourcePropertyResponse,
  GetIntegrationResourcePropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationResourceProperty",
})) as any;

export type GetIntegrationTablePropertiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API is used to retrieve optional override properties for the tables that need to be replicated. These properties can include properties for filtering and partition for source and target tables.
 */
export const getIntegrationTableProperties: API.OperationMethod<
  GetIntegrationTablePropertiesRequest,
  GetIntegrationTablePropertiesResponse,
  GetIntegrationTablePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TableName: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationTableProperties",
})) as any;

export type GetJobError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves an existing job definition.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobName: 0 }, output: { Job: o_Job } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
})) as any;

export type GetJobBookmarkError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Returns information on a job bookmark entry.
 *
 * For more information about enabling and using job bookmarks, see:
 *
 * - Tracking processed data using job bookmarks
 *
 * - Job parameters used by Glue
 *
 * - Job structure
 */
export const getJobBookmark: API.OperationMethod<
  GetJobBookmarkRequest,
  GetJobBookmarkResponse,
  GetJobBookmarkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobName: 0, RunId: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobBookmark",
})) as any;

export type GetJobRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the metadata for a given job run. Job run history is accessible for 365 days for your workflow and job run.
 */
export const getJobRun: API.OperationMethod<
  GetJobRunRequest,
  GetJobRunResponse,
  GetJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobName: 0, RunId: 0, PredecessorsIncluded: 0 },
    output: { JobRun: o_JobRun },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobRun",
})) as any;

export type GetJobRunsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves metadata for all runs of a given job definition.
 *
 * `GetJobRuns` returns the job runs in chronological order, with the newest jobs returned first.
 */
export const getJobRuns: API.PaginatedOperationMethod<
  GetJobRunsRequest,
  GetJobRunsResponse,
  GetJobRunsError,
  Credentials | HttpClient.HttpClient,
  JobRun
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { JobName: 0, NextToken: 0, MaxResults: 0 },
    output: { JobRuns: D.list(o_JobRun) },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobRuns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetJobsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves all current job definitions.
 */
export const getJobs: API.PaginatedOperationMethod<
  GetJobsRequest,
  GetJobsResponse,
  GetJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { Jobs: D.list(o_Job) },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Jobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetMappingError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates mappings.
 */
export const getMapping: API.OperationMethod<
  GetMappingRequest,
  GetMappingResponse,
  GetMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Source: i_CatalogEntry,
      Sinks: D.list(i_CatalogEntry),
      Location: i_Location,
    },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMapping",
})) as any;

export type GetMaterializedViewRefreshTaskRunError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Get the associated metadata/information for a task run, given a task run ID.
 */
export const getMaterializedViewRefreshTaskRun: API.OperationMethod<
  GetMaterializedViewRefreshTaskRunRequest,
  GetMaterializedViewRefreshTaskRunResponse,
  GetMaterializedViewRefreshTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, MaterializedViewRefreshTaskRunId: 0 },
    output: {
      MaterializedViewRefreshTaskRun: o_MaterializedViewRefreshTaskRun,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaterializedViewRefreshTaskRun",
})) as any;

export type GetMLTaskRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets details for a specific task run on a machine learning transform. Machine learning
 * task runs are asynchronous tasks that Glue runs on your behalf as part of various machine
 * learning workflows. You can check the stats of any task run by calling
 * `GetMLTaskRun` with the `TaskRunID` and its parent transform's
 * `TransformID`.
 */
export const getMLTaskRun: API.OperationMethod<
  GetMLTaskRunRequest,
  GetMLTaskRunResponse,
  GetMLTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TransformId: 0, TaskRunId: 0 },
    output: { StartedOn: D.ts, LastModifiedOn: D.ts, CompletedOn: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLTaskRun",
})) as any;

export type GetMLTaskRunsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets a list of runs for a machine learning transform. Machine learning task runs are
 * asynchronous tasks that Glue runs on your behalf as part of various machine learning
 * workflows. You can get a sortable, filterable list of machine learning task runs by calling
 * `GetMLTaskRuns` with their parent transform's `TransformID` and other
 * optional parameters as documented in this section.
 *
 * This operation returns a list of historic runs and must be paginated.
 */
export const getMLTaskRuns: API.PaginatedOperationMethod<
  GetMLTaskRunsRequest,
  GetMLTaskRunsResponse,
  GetMLTaskRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TransformId: 0,
      NextToken: 0,
      MaxResults: 0,
      Filter: { TaskRunType: 0, Status: 0, StartedBefore: 0, StartedAfter: 0 },
      Sort: { Column: 0, SortDirection: 0 },
    },
    output: {
      TaskRuns: D.list({
        StartedOn: D.ts,
        LastModifiedOn: D.ts,
        CompletedOn: D.ts,
      }),
    },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLTaskRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetMLTransformError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets an Glue machine learning transform artifact and all its corresponding metadata.
 * Machine learning transforms are a special type of transform that use machine learning to learn
 * the details of the transformation to be performed by learning from examples provided by
 * humans. These transformations are then saved by Glue. You can retrieve their metadata by
 * calling `GetMLTransform`.
 */
export const getMLTransform: API.OperationMethod<
  GetMLTransformRequest,
  GetMLTransformResponse,
  GetMLTransformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TransformId: 0 },
    output: { CreatedOn: D.ts, LastModifiedOn: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLTransform",
})) as any;

export type GetMLTransformsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets a sortable, filterable list of existing Glue machine learning transforms. Machine
 * learning transforms are a special type of transform that use machine learning to learn the
 * details of the transformation to be performed by learning from examples provided by humans.
 * These transformations are then saved by Glue, and you can retrieve their metadata by
 * calling `GetMLTransforms`.
 */
export const getMLTransforms: API.PaginatedOperationMethod<
  GetMLTransformsRequest,
  GetMLTransformsResponse,
  GetMLTransformsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      Filter: i_TransformFilterCriteria,
      Sort: i_TransformSortCriteria,
    },
    output: { Transforms: D.list({ CreatedOn: D.ts, LastModifiedOn: D.ts }) },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLTransforms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetPartitionError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves information about a specified partition.
 */
export const getPartition: API.OperationMethod<
  GetPartitionRequest,
  GetPartitionResponse,
  GetPartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      PartitionValues: 0,
      AuditContext: i_AuditContext,
    },
    output: { Partition: o_Partition },
  },
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPartition",
})) as any;

export type GetPartitionIndexesError =
  | ConflictException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the partition indexes associated with a table.
 */
export const getPartitionIndexes: API.PaginatedOperationMethod<
  GetPartitionIndexesRequest,
  GetPartitionIndexesResponse,
  GetPartitionIndexesError,
  Credentials | HttpClient.HttpClient,
  PartitionIndexDescriptor
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, TableName: 0, NextToken: 0 },
  },
  errors: [
    ConflictException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPartitionIndexes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PartitionIndexDescriptorList",
  } as const,
})) as any;

export type GetPartitionsError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | InvalidStateException
  | OperationTimeoutException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Retrieves information about the partitions in a table.
 */
export const getPartitions: API.PaginatedOperationMethod<
  GetPartitionsRequest,
  GetPartitionsResponse,
  GetPartitionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      Expression: 0,
      NextToken: 0,
      Segment: i_Segment,
      MaxResults: 0,
      ExcludeColumnSchema: 0,
      TransactionId: 0,
      QueryAsOfTime: 0,
      AuditContext: i_AuditContext,
    },
    output: { Partitions: D.list(o_Partition) },
  },
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    InvalidStateException,
    OperationTimeoutException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPartitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetPlanError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets code to perform a specified mapping.
 */
export const getPlan: API.OperationMethod<
  GetPlanRequest,
  GetPlanResponse,
  GetPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Mapping: D.list({
        SourceTable: 0,
        SourcePath: 0,
        SourceType: 0,
        TargetTable: 0,
        TargetPath: 0,
        TargetType: 0,
      }),
      Source: i_CatalogEntry,
      Sinks: D.list(i_CatalogEntry),
      Location: i_Location,
      Language: 0,
      AdditionalPlanOptionsMap: 0,
    },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlan",
})) as any;

export type GetRegistryError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the specified registry in detail.
 */
export const getRegistry: API.OperationMethod<
  GetRegistryInput,
  GetRegistryResponse,
  GetRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RegistryId: i_RegistryId } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistry",
})) as any;

export type GetResourcePoliciesError =
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the resource policies set on individual resources by Resource Access Manager
 * during cross-account permission grants. Also retrieves the Data Catalog resource
 * policy.
 *
 * If you enabled metadata encryption in Data Catalog settings, and you do not have
 * permission on the KMS key, the operation can't return the Data Catalog resource
 * policy.
 */
export const getResourcePolicies: API.PaginatedOperationMethod<
  GetResourcePoliciesRequest,
  GetResourcePoliciesResponse,
  GetResourcePoliciesError,
  Credentials | HttpClient.HttpClient,
  GluePolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      GetResourcePoliciesResponseList: D.list({
        CreateTime: D.ts,
        UpdateTime: D.ts,
      }),
    },
  },
  errors: [
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GetResourcePoliciesResponseList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetResourcePolicyError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a specified resource policy.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { CreateTime: D.ts, UpdateTime: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type GetSchemaError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the specified schema in detail.
 */
export const getSchema: API.OperationMethod<
  GetSchemaInput,
  GetSchemaResponse,
  GetSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SchemaId: i_SchemaId } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchema",
})) as any;

export type GetSchemaByDefinitionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Retrieves a schema by the `SchemaDefinition`. The schema definition is sent to the Schema Registry, canonicalized, and hashed. If the hash is matched within the scope of the `SchemaName` or ARN (or the default registry, if none is supplied), that schema’s metadata is returned. Otherwise, a 404 or NotFound error is returned. Schema versions in `Deleted` statuses will not be included in the results.
 */
export const getSchemaByDefinition: API.OperationMethod<
  GetSchemaByDefinitionInput,
  GetSchemaByDefinitionResponse,
  GetSchemaByDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SchemaId: i_SchemaId, SchemaDefinition: 0 },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaByDefinition",
})) as any;

export type GetSchemaVersionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Get the specified schema by its unique ID assigned when a version of the schema is created or registered. Schema versions in Deleted status will not be included in the results.
 */
export const getSchemaVersion: API.OperationMethod<
  GetSchemaVersionInput,
  GetSchemaVersionResponse,
  GetSchemaVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SchemaId: i_SchemaId,
      SchemaVersionId: 0,
      SchemaVersionNumber: i_SchemaVersionNumber,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaVersion",
})) as any;

export type GetSchemaVersionsDiffError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Fetches the schema version difference in the specified difference type between two stored schema versions in the Schema Registry.
 *
 * This API allows you to compare two schema versions between two schema definitions under the same schema.
 */
export const getSchemaVersionsDiff: API.OperationMethod<
  GetSchemaVersionsDiffInput,
  GetSchemaVersionsDiffResponse,
  GetSchemaVersionsDiffError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SchemaId: i_SchemaId,
      FirstSchemaVersionNumber: i_SchemaVersionNumber,
      SecondSchemaVersionNumber: i_SchemaVersionNumber,
      SchemaDiffType: 0,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaVersionsDiff",
})) as any;

export type GetSecurityConfigurationError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a specified security configuration.
 */
export const getSecurityConfiguration: API.OperationMethod<
  GetSecurityConfigurationRequest,
  GetSecurityConfigurationResponse,
  GetSecurityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { SecurityConfiguration: o_SecurityConfiguration },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityConfiguration",
})) as any;

export type GetSecurityConfigurationsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a list of all security configurations.
 */
export const getSecurityConfigurations: API.PaginatedOperationMethod<
  GetSecurityConfigurationsRequest,
  GetSecurityConfigurationsResponse,
  GetSecurityConfigurationsError,
  Credentials | HttpClient.HttpClient,
  SecurityConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { SecurityConfigurations: D.list(o_SecurityConfiguration) },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SecurityConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetSessionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the session.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Id: 0, RequestOrigin: 0 },
    output: { Session: o_Session },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
})) as any;

export type GetSessionEndpointError =
  | AccessDeniedException
  | EntityNotFoundException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the Spark Connect endpoint URL and authentication token for an interactive session.
 */
export const getSessionEndpoint: API.OperationMethod<
  GetSessionEndpointRequest,
  GetSessionEndpointResponse,
  GetSessionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SessionId: 0 },
    output: {
      SparkConnect: { AuthToken: D.secret, AuthTokenExpirationTime: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEndpoint",
})) as any;

export type GetStatementError =
  | AccessDeniedException
  | EntityNotFoundException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the statement.
 */
export const getStatement: API.OperationMethod<
  GetStatementRequest,
  GetStatementResponse,
  GetStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SessionId: 0, Id: 0, RequestOrigin: 0 },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStatement",
})) as any;

export type GetTableError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Retrieves the `Table` definition in a Data Catalog for
 * a specified table.
 */
export const getTable: API.OperationMethod<
  GetTableRequest,
  GetTableResponse,
  GetTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      Name: 0,
      TransactionId: 0,
      QueryAsOfTime: 0,
      AuditContext: i_AuditContext,
      IncludeStatusDetails: 0,
      AttributesToGet: 0,
    },
    output: { Table: o_Table },
  },
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTable",
})) as any;

export type GetTableOptimizerError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the configuration of all optimizers associated with a specified table.
 */
export const getTableOptimizer: API.OperationMethod<
  GetTableOptimizerRequest,
  GetTableOptimizerResponse,
  GetTableOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, TableName: 0, Type: 0 },
    output: { TableOptimizer: o_TableOptimizer },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableOptimizer",
})) as any;

export type GetTablesError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the definitions of some or all of the tables in a given
 * `Database`.
 */
export const getTables: API.PaginatedOperationMethod<
  GetTablesRequest,
  GetTablesResponse,
  GetTablesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      Expression: 0,
      NextToken: 0,
      MaxResults: 0,
      TransactionId: 0,
      QueryAsOfTime: 0,
      AuditContext: i_AuditContext,
      IncludeStatusDetails: 0,
      AttributesToGet: 0,
    },
    output: { TableList: D.list(o_Table) },
  },
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTables",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTableVersionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a specified version of a table.
 */
export const getTableVersion: API.OperationMethod<
  GetTableVersionRequest,
  GetTableVersionResponse,
  GetTableVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      VersionId: 0,
      AuditContext: i_AuditContext,
    },
    output: { TableVersion: o_TableVersion },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableVersion",
})) as any;

export type GetTableVersionsError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a list of strings that identify available versions of
 * a specified table.
 */
export const getTableVersions: API.PaginatedOperationMethod<
  GetTableVersionsRequest,
  GetTableVersionsResponse,
  GetTableVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      NextToken: 0,
      MaxResults: 0,
      AuditContext: i_AuditContext,
    },
    output: { TableVersions: D.list(o_TableVersion) },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTagsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a list of tags associated with a resource.
 */
export const getTags: API.OperationMethod<
  GetTagsRequest,
  GetTagsResponse,
  GetTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
})) as any;

export type GetTriggerError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the definition of a trigger.
 */
export const getTrigger: API.OperationMethod<
  GetTriggerRequest,
  GetTriggerResponse,
  GetTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrigger",
})) as any;

export type GetTriggersError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets all the triggers associated with a job.
 */
export const getTriggers: API.PaginatedOperationMethod<
  GetTriggersRequest,
  GetTriggersResponse,
  GetTriggersError,
  Credentials | HttpClient.HttpClient,
  Trigger
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, DependentJobName: 0, MaxResults: 0 },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTriggers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Triggers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetUnfilteredPartitionMetadataError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | PermissionTypeMismatchException
  | CommonErrors;
/**
 * Retrieves partition metadata from the Data Catalog that contains unfiltered
 * metadata.
 *
 * For IAM authorization, the public IAM action associated with this API is `glue:GetPartition`.
 */
export const getUnfilteredPartitionMetadata: API.OperationMethod<
  GetUnfilteredPartitionMetadataRequest,
  GetUnfilteredPartitionMetadataResponse,
  GetUnfilteredPartitionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Region: 0,
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      PartitionValues: 0,
      AuditContext: i_AuditContext,
      SupportedPermissionTypes: 0,
      QuerySessionContext: i_QuerySessionContext,
    },
    output: { Partition: o_Partition },
  },
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    PermissionTypeMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUnfilteredPartitionMetadata",
})) as any;

export type GetUnfilteredPartitionsMetadataError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | PermissionTypeMismatchException
  | CommonErrors;
/**
 * Retrieves partition metadata from the Data Catalog that contains unfiltered
 * metadata.
 *
 * For IAM authorization, the public IAM action associated with this API is `glue:GetPartitions`.
 */
export const getUnfilteredPartitionsMetadata: API.PaginatedOperationMethod<
  GetUnfilteredPartitionsMetadataRequest,
  GetUnfilteredPartitionsMetadataResponse,
  GetUnfilteredPartitionsMetadataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Region: 0,
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      Expression: 0,
      AuditContext: i_AuditContext,
      SupportedPermissionTypes: 0,
      NextToken: 0,
      Segment: i_Segment,
      MaxResults: 0,
      QuerySessionContext: i_QuerySessionContext,
    },
    output: { UnfilteredPartitions: D.list({ Partition: o_Partition }) },
  },
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    PermissionTypeMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUnfilteredPartitionsMetadata",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetUnfilteredTableMetadataError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | PermissionTypeMismatchException
  | CommonErrors;
/**
 * Allows a third-party analytical engine to retrieve unfiltered table metadata from the Data Catalog.
 *
 * For IAM authorization, the public IAM action associated with this API is `glue:GetTable`.
 */
export const getUnfilteredTableMetadata: API.OperationMethod<
  GetUnfilteredTableMetadataRequest,
  GetUnfilteredTableMetadataResponse,
  GetUnfilteredTableMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Region: 0,
      CatalogId: 0,
      DatabaseName: 0,
      Name: 0,
      AuditContext: i_AuditContext,
      SupportedPermissionTypes: 0,
      ParentResourceArn: 0,
      RootResourceArn: 0,
      SupportedDialect: { Dialect: 0, DialectVersion: 0 },
      Permissions: 0,
      QuerySessionContext: i_QuerySessionContext,
    },
    output: { Table: o_Table },
  },
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    PermissionTypeMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUnfilteredTableMetadata",
})) as any;

export type GetUsageProfileError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves information about the specified Glue usage profile.
 */
export const getUsageProfile: API.OperationMethod<
  GetUsageProfileRequest,
  GetUsageProfileResponse,
  GetUsageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { CreatedOn: D.ts, LastModifiedOn: D.ts },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsageProfile",
})) as any;

export type GetUserDefinedFunctionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a specified function definition from the Data Catalog.
 */
export const getUserDefinedFunction: API.OperationMethod<
  GetUserDefinedFunctionRequest,
  GetUserDefinedFunctionResponse,
  GetUserDefinedFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, FunctionName: 0 },
    output: { UserDefinedFunction: o_UserDefinedFunction },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserDefinedFunction",
})) as any;

export type GetUserDefinedFunctionsError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves multiple function definitions from the Data Catalog.
 */
export const getUserDefinedFunctions: API.PaginatedOperationMethod<
  GetUserDefinedFunctionsRequest,
  GetUserDefinedFunctionsResponse,
  GetUserDefinedFunctionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      Pattern: 0,
      FunctionType: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { UserDefinedFunctions: D.list(o_UserDefinedFunction) },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserDefinedFunctions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetWorkflowError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves resource metadata for a workflow.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, IncludeGraph: 0 },
    output: { Workflow: o_Workflow },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
})) as any;

export type GetWorkflowRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the metadata for a given workflow run. Job run history is accessible for 90 days for your workflow and job run.
 */
export const getWorkflowRun: API.OperationMethod<
  GetWorkflowRunRequest,
  GetWorkflowRunResponse,
  GetWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, RunId: 0, IncludeGraph: 0 },
    output: { Run: o_WorkflowRun },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRun",
})) as any;

export type GetWorkflowRunPropertiesError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the workflow run properties which were set during the run.
 */
export const getWorkflowRunProperties: API.OperationMethod<
  GetWorkflowRunPropertiesRequest,
  GetWorkflowRunPropertiesResponse,
  GetWorkflowRunPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, RunId: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRunProperties",
})) as any;

export type GetWorkflowRunsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves metadata for all runs of a given workflow.
 */
export const getWorkflowRuns: API.PaginatedOperationMethod<
  GetWorkflowRunsRequest,
  GetWorkflowRunsResponse,
  GetWorkflowRunsError,
  Credentials | HttpClient.HttpClient,
  WorkflowRun
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, IncludeGraph: 0, NextToken: 0, MaxResults: 0 },
    output: { Runs: D.list(o_WorkflowRun) },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Runs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ImportCatalogToGlueError =
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Imports an existing Amazon Athena Data Catalog to Glue.
 */
export const importCatalogToGlue: API.OperationMethod<
  ImportCatalogToGlueRequest,
  ImportCatalogToGlueResponse,
  ImportCatalogToGlueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CatalogId: 0 } },
  errors: [InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCatalogToGlue",
})) as any;

export type ListAssetTypesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the asset types defined in Glue Data Catalog.
 */
export const listAssetTypes: API.PaginatedOperationMethod<
  ListAssetTypesRequest,
  ListAssetTypesResponse,
  ListAssetTypesError,
  Credentials | HttpClient.HttpClient,
  AssetTypeItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBlueprintsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists all the blueprint names in an account.
 */
export const listBlueprints: API.PaginatedOperationMethod<
  ListBlueprintsRequest,
  ListBlueprintsResponse,
  ListBlueprintsError,
  Credentials | HttpClient.HttpClient,
  OrchestrationNameString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0, Tags: 0 } },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBlueprints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Blueprints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListColumnStatisticsTaskRunsError =
  | OperationTimeoutException
  | CommonErrors;
/**
 * List all task runs for a particular account.
 */
export const listColumnStatisticsTaskRuns: API.PaginatedOperationMethod<
  ListColumnStatisticsTaskRunsRequest,
  ListColumnStatisticsTaskRunsResponse,
  ListColumnStatisticsTaskRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListColumnStatisticsTaskRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectionTypesError =
  | AccessDeniedException
  | InternalServiceException
  | CommonErrors;
/**
 * The `ListConnectionTypes` API provides a discovery mechanism to learn available connection types in Glue. The response contains a list of connection types with high-level details of what is supported for each connection type, including both built-in connection types and custom connection types registered via `RegisterConnectionType`. The connection types listed are the set of supported options for the `ConnectionType` value in the `CreateConnection` API.
 *
 * See also: `DescribeConnectionType`, `RegisterConnectionType`, `DeleteConnectionType`
 */
export const listConnectionTypes: API.PaginatedOperationMethod<
  ListConnectionTypesRequest,
  ListConnectionTypesResponse,
  ListConnectionTypesError,
  Credentials | HttpClient.HttpClient,
  ConnectionTypeBrief
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [AccessDeniedException, InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectionTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectionTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCrawlersError = OperationTimeoutException | CommonErrors;
/**
 * Retrieves the names of all crawler resources in this Amazon Web Services account, or the
 * resources with the specified tag. This operation allows you to see which
 * resources are available in your account, and their names.
 *
 * This operation takes the optional `Tags` field, which you can use as a filter on
 * the response so that tagged resources can be retrieved as a group. If you choose to use tags
 * filtering, only resources with the tag are retrieved.
 */
export const listCrawlers: API.PaginatedOperationMethod<
  ListCrawlersRequest,
  ListCrawlersResponse,
  ListCrawlersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0, Tags: 0 } },
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrawlers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCrawlsError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns all the crawls of a specified crawler. Returns only the crawls that have occurred since the launch date of the crawler history feature, and only retains up to 12 months of crawls. Older crawls will not be returned.
 *
 * You may use this API to:
 *
 * - Retrive all the crawls of a specified crawler.
 *
 * - Retrieve all the crawls of a specified crawler within a limited count.
 *
 * - Retrieve all the crawls of a specified crawler in a specific time range.
 *
 * - Retrieve all the crawls of a specified crawler with a particular state, crawl ID, or DPU hour value.
 */
export const listCrawls: API.OperationMethod<
  ListCrawlsRequest,
  ListCrawlsResponse,
  ListCrawlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CrawlerName: 0,
      MaxResults: 0,
      Filters: D.list({ FieldName: 0, FilterOperator: 0, FieldValue: 0 }),
      NextToken: 0,
    },
    output: { Crawls: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrawls",
})) as any;

export type ListCustomEntityTypesError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists all the custom patterns that have been created.
 */
export const listCustomEntityTypes: API.PaginatedOperationMethod<
  ListCustomEntityTypesRequest,
  ListCustomEntityTypesResponse,
  ListCustomEntityTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0, Tags: 0 } },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomEntityTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataQualityResultsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns all data quality execution results for your account.
 */
export const listDataQualityResults: API.PaginatedOperationMethod<
  ListDataQualityResultsRequest,
  ListDataQualityResultsResponse,
  ListDataQualityResultsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        DataSource: i_DataSource,
        JobName: 0,
        JobRunId: 0,
        StartedAfter: 0,
        StartedBefore: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Results: D.list({ StartedOn: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataQualityRuleRecommendationRunsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists the recommendation runs meeting the filter criteria.
 */
export const listDataQualityRuleRecommendationRuns: API.PaginatedOperationMethod<
  ListDataQualityRuleRecommendationRunsRequest,
  ListDataQualityRuleRecommendationRunsResponse,
  ListDataQualityRuleRecommendationRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: { DataSource: i_DataSource, StartedBefore: 0, StartedAfter: 0 },
      NextToken: 0,
      MaxResults: 0,
      Tags: 0,
    },
    output: { Runs: D.list({ StartedOn: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityRuleRecommendationRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataQualityRulesetEvaluationRunsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists all the runs meeting the filter criteria, where a ruleset is evaluated against a data source.
 */
export const listDataQualityRulesetEvaluationRuns: API.PaginatedOperationMethod<
  ListDataQualityRulesetEvaluationRunsRequest,
  ListDataQualityRulesetEvaluationRunsResponse,
  ListDataQualityRulesetEvaluationRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: {
        DataSource: i_DataSource,
        StartedBefore: 0,
        StartedAfter: 0,
        RulesetName: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Runs: D.list({ StartedOn: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityRulesetEvaluationRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataQualityRulesetsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a paginated list of rulesets for the specified list of Glue tables.
 */
export const listDataQualityRulesets: API.PaginatedOperationMethod<
  ListDataQualityRulesetsRequest,
  ListDataQualityRulesetsResponse,
  ListDataQualityRulesetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      Filter: {
        Name: 0,
        Description: 0,
        CreatedBefore: 0,
        CreatedAfter: 0,
        LastModifiedBefore: 0,
        LastModifiedAfter: 0,
        TargetTable: i_DataQualityTargetTable,
      },
      Tags: 0,
    },
    output: { Rulesets: D.list({ CreatedOn: D.ts, LastModifiedOn: D.ts }) },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityRulesets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataQualityStatisticAnnotationsError =
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Retrieve annotations for a data quality statistic.
 */
export const listDataQualityStatisticAnnotations: API.OperationMethod<
  ListDataQualityStatisticAnnotationsRequest,
  ListDataQualityStatisticAnnotationsResponse,
  ListDataQualityStatisticAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StatisticId: 0,
      ProfileId: 0,
      TimestampFilter: i_TimestampFilter,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      Annotations: D.list({
        StatisticRecordedOn: D.ts,
        InclusionAnnotation: o_TimestampedInclusionAnnotation,
      }),
    },
  },
  errors: [InternalServiceException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityStatisticAnnotations",
})) as any;

export type ListDataQualityStatisticsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Retrieves a list of data quality statistics.
 */
export const listDataQualityStatistics: API.OperationMethod<
  ListDataQualityStatisticsRequest,
  ListDataQualityStatisticsResponse,
  ListDataQualityStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StatisticId: 0,
      ProfileId: 0,
      TimestampFilter: i_TimestampFilter,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      Statistics: D.list({
        RecordedOn: D.ts,
        InclusionAnnotation: o_TimestampedInclusionAnnotation,
      }),
    },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityStatistics",
})) as any;

export type ListDevEndpointsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the names of all `DevEndpoint` resources in this Amazon Web Services account, or the
 * resources with the specified tag. This operation allows you to see which resources are
 * available in your account, and their names.
 *
 * This operation takes the optional `Tags` field, which you can use as a filter on
 * the response so that tagged resources can be retrieved as a group. If you choose to use tags
 * filtering, only resources with the tag are retrieved.
 */
export const listDevEndpoints: API.PaginatedOperationMethod<
  ListDevEndpointsRequest,
  ListDevEndpointsResponse,
  ListDevEndpointsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0, Tags: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEntitiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Returns the available entities supported by the connection type.
 */
export const listEntities: API.PaginatedOperationMethod<
  ListEntitiesRequest,
  ListEntitiesResponse,
  ListEntitiesError,
  Credentials | HttpClient.HttpClient,
  Entity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ConnectionName: 0,
      CatalogId: 0,
      ParentEntityName: 0,
      NextToken: 0,
      DataStoreApiVersion: 0,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entities",
  } as const,
})) as any;

export type ListFormTypesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the form types defined in Glue Data Catalog.
 */
export const listFormTypes: API.PaginatedOperationMethod<
  ListFormTypesRequest,
  ListFormTypesResponse,
  ListFormTypesError,
  Credentials | HttpClient.HttpClient,
  FormTypeItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFormTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGlossariesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists business glossaries in Glue Data Catalog.
 */
export const listGlossaries: API.PaginatedOperationMethod<
  ListGlossariesRequest,
  ListGlossariesResponse,
  ListGlossariesError,
  Credentials | HttpClient.HttpClient,
  GlossaryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGlossaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGlossaryTermsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists glossary terms within a business glossary in Glue Data Catalog.
 */
export const listGlossaryTerms: API.PaginatedOperationMethod<
  ListGlossaryTermsRequest,
  ListGlossaryTermsResponse,
  ListGlossaryTermsError,
  Credentials | HttpClient.HttpClient,
  GlossaryTermItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { GlossaryIdentifier: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGlossaryTerms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIntegrationResourcePropertiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List integration resource properties for a single customer. It supports the filters, maxRecords and markers.
 */
export const listIntegrationResourceProperties: API.OperationMethod<
  ListIntegrationResourcePropertiesRequest,
  ListIntegrationResourcePropertiesResponse,
  ListIntegrationResourcePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Marker: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxRecords: 0,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegrationResourceProperties",
})) as any;

export type ListIterableFormsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the items in an iterable form on an asset in Glue Data Catalog. For example, lists the columns of a table asset.
 */
export const listIterableForms: API.PaginatedOperationMethod<
  ListIterableFormsRequest,
  ListIterableFormsResponse,
  ListIterableFormsError,
  Credentials | HttpClient.HttpClient,
  IterableFormListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AssetIdentifier: 0,
      IterableFormName: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIterableForms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the names of all job resources in this Amazon Web Services account, or the resources with the specified tag. This operation allows you to see which resources are available in your account, and their names.
 *
 * This operation takes the optional `Tags` field, which you can use as a filter on
 * the response so that tagged resources can be retrieved as a group. If you choose to use tags
 * filtering, only resources with the tag are retrieved.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  NameString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0, Tags: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobNames",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMaterializedViewRefreshTaskRunsError =
  | AccessDeniedException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * List all task runs for a particular account.
 */
export const listMaterializedViewRefreshTaskRuns: API.PaginatedOperationMethod<
  ListMaterializedViewRefreshTaskRunsRequest,
  ListMaterializedViewRefreshTaskRunsResponse,
  ListMaterializedViewRefreshTaskRunsError,
  Credentials | HttpClient.HttpClient,
  MaterializedViewRefreshTaskRun
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      MaterializedViewRefreshTaskRuns: D.list(o_MaterializedViewRefreshTaskRun),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMaterializedViewRefreshTaskRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MaterializedViewRefreshTaskRuns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMLTransformsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a sortable, filterable list of existing Glue machine learning transforms in this Amazon Web Services account,
 * or the resources with the specified tag. This operation takes the optional `Tags` field, which you can use as
 * a filter of the responses so that tagged resources can be retrieved as a group. If you choose to use tag
 * filtering, only resources with the tags are retrieved.
 */
export const listMLTransforms: API.PaginatedOperationMethod<
  ListMLTransformsRequest,
  ListMLTransformsResponse,
  ListMLTransformsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      Filter: i_TransformFilterCriteria,
      Sort: i_TransformSortCriteria,
      Tags: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLTransforms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRegistriesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of registries that you have created, with minimal registry information. Registries in the `Deleting` status will not be included in the results. Empty results will be returned if there are no registries available.
 */
export const listRegistries: API.PaginatedOperationMethod<
  ListRegistriesInput,
  ListRegistriesResponse,
  ListRegistriesError,
  Credentials | HttpClient.HttpClient,
  RegistryListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegistries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Registries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSchemasError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of schemas with minimal details. Schemas in Deleting status will not be included in the results. Empty results will be returned if there are no schemas available.
 *
 * When the `RegistryId` is not provided, all the schemas across registries will be part of the API response.
 */
export const listSchemas: API.PaginatedOperationMethod<
  ListSchemasInput,
  ListSchemasResponse,
  ListSchemasError,
  Credentials | HttpClient.HttpClient,
  SchemaListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { RegistryId: i_RegistryId, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schemas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSchemaVersionsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of schema versions that you have created, with minimal information. Schema versions in Deleted status will not be included in the results. Empty results will be returned if there are no schema versions available.
 */
export const listSchemaVersions: API.PaginatedOperationMethod<
  ListSchemaVersionsInput,
  ListSchemaVersionsResponse,
  ListSchemaVersionsError,
  Credentials | HttpClient.HttpClient,
  SchemaVersionListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { SchemaId: i_SchemaId, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemaVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schemas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieve a list of sessions.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Tags: 0, RequestOrigin: 0 },
    output: { Sessions: D.list(o_Session) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStatementsError =
  | AccessDeniedException
  | EntityNotFoundException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists statements for the session.
 */
export const listStatements: API.OperationMethod<
  ListStatementsRequest,
  ListStatementsResponse,
  ListStatementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SessionId: 0, RequestOrigin: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStatements",
})) as any;

export type ListTableOptimizerRunsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the history of previous optimizer runs for a specific table.
 */
export const listTableOptimizerRuns: API.PaginatedOperationMethod<
  ListTableOptimizerRunsRequest,
  ListTableOptimizerRunsResponse,
  ListTableOptimizerRunsError,
  Credentials | HttpClient.HttpClient,
  TableOptimizerRun
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      Type: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { TableOptimizerRuns: D.list(o_TableOptimizerRun) },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTableOptimizerRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TableOptimizerRuns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTriggersError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the names of all trigger resources in this Amazon Web Services account, or the resources with the specified tag. This operation allows you to see which resources are available in your account, and their names.
 *
 * This operation takes the optional `Tags` field, which you can use as a filter on
 * the response so that tagged resources can be retrieved as a group. If you choose to use tags
 * filtering, only resources with the tag are retrieved.
 */
export const listTriggers: API.PaginatedOperationMethod<
  ListTriggersRequest,
  ListTriggersResponse,
  ListTriggersError,
  Credentials | HttpClient.HttpClient,
  NameString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, DependentJobName: 0, MaxResults: 0, Tags: 0 },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTriggers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TriggerNames",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsageProfilesError =
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | CommonErrors;
/**
 * List all the Glue usage profiles.
 */
export const listUsageProfiles: API.PaginatedOperationMethod<
  ListUsageProfilesRequest,
  ListUsageProfilesResponse,
  ListUsageProfilesError,
  Credentials | HttpClient.HttpClient,
  UsageProfileDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { Profiles: D.list({ CreatedOn: D.ts, LastModifiedOn: D.ts }) },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsageProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Profiles",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkflowsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists names of workflows created in the account.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  NameString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Workflows",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ModifyIntegrationError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | IntegrationConflictOperationFault
  | IntegrationNotFoundFault
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | InvalidIntegrationStateFault
  | InvalidStateException
  | ValidationException
  | CommonErrors;
/**
 * Modifies a Zero-ETL integration in the caller's account.
 */
export const modifyIntegration: API.OperationMethod<
  ModifyIntegrationRequest,
  ModifyIntegrationResponse,
  ModifyIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IntegrationIdentifier: 0,
      Description: 0,
      DataFilter: 0,
      IntegrationConfig: i_IntegrationConfig,
      IntegrationName: 0,
    },
    output: { CreateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    IntegrationConflictOperationFault,
    IntegrationNotFoundFault,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    InvalidIntegrationStateFault,
    InvalidStateException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyIntegration",
})) as any;

export type PutAssetError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates an asset in Glue Data Catalog. If the asset already exists, this operation updates it; otherwise, a new asset is created.
 */
export const putAsset: API.OperationMethod<
  PutAssetRequest,
  PutAssetResponse,
  PutAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AssetTypeId: 0,
      Identifier: 0,
      Name: 0,
      Description: 0,
      Forms: D.map({ FormTypeId: 0, Content: 0 }),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CreatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAsset",
})) as any;

export type PutAssetTypeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates an asset type in Glue Data Catalog. An asset type defines the structure of assets by specifying which forms they include. If an asset type with the given name already exists, it is updated.
 */
export const putAssetType: API.OperationMethod<
  PutAssetTypeRequest,
  PutAssetTypeResponse,
  PutAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Forms: D.map({ FormTypeIdentifier: 0 }),
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAssetType",
})) as any;

export type PutAttachmentError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Attaches a form to an asset or an iterable form item in Glue Data Catalog. If an attachment with the same name already exists, it is overwritten.
 */
export const putAttachment: API.OperationMethod<
  PutAttachmentRequest,
  PutAttachmentResponse,
  PutAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AssetIdentifier: 0,
      IterableFormName: 0,
      ItemIdentifier: 0,
      AttachmentName: 0,
      Content: 0,
      FormTypeId: 0,
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAttachment",
})) as any;

export type PutDataCatalogEncryptionSettingsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Sets the security configuration for a specified catalog. After the configuration has been
 * set, the specified encryption is applied to every catalog write thereafter.
 */
export const putDataCatalogEncryptionSettings: API.OperationMethod<
  PutDataCatalogEncryptionSettingsRequest,
  PutDataCatalogEncryptionSettingsResponse,
  PutDataCatalogEncryptionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DataCatalogEncryptionSettings: {
        EncryptionAtRest: {
          CatalogEncryptionMode: 0,
          SseAwsKmsKeyId: 0,
          CatalogEncryptionServiceRole: 0,
        },
        ConnectionPasswordEncryption: {
          ReturnConnectionPasswordEncrypted: 0,
          AwsKmsKeyId: 0,
        },
      },
    },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataCatalogEncryptionSettings",
})) as any;

export type PutDataCatalogExportConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates the export configuration for the Glue Data Catalog. Use this operation to enable or disable the export of catalog metadata to S3 Tables.
 */
export const putDataCatalogExportConfiguration: API.OperationMethod<
  PutDataCatalogExportConfigurationInput,
  PutDataCatalogExportConfigurationOutput,
  PutDataCatalogExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ExportSetting: 0,
      EncryptionConfiguration: { SseAlgorithm: 0, KmsKeyArn: 0 },
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataCatalogExportConfiguration",
})) as any;

export type PutDataQualityProfileAnnotationError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Annotate all datapoints for a Profile.
 */
export const putDataQualityProfileAnnotation: API.OperationMethod<
  PutDataQualityProfileAnnotationRequest,
  PutDataQualityProfileAnnotationResponse,
  PutDataQualityProfileAnnotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ProfileId: 0, InclusionAnnotation: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataQualityProfileAnnotation",
})) as any;

export type PutFormTypeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates a form type in Glue Data Catalog. A form type defines the schema for structured metadata that can be attached to assets.
 */
export const putFormType: API.OperationMethod<
  PutFormTypeRequest,
  PutFormTypeResponse,
  PutFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Schema: 0, ClientToken: D.m({ idempotency: true }) },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFormType",
})) as any;

export type PutResourcePolicyError =
  | ConditionCheckFailureException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Sets the Data Catalog resource policy for access control.
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
      PolicyInJson: 0,
      ResourceArn: 0,
      PolicyHashCondition: 0,
      PolicyExistsCondition: 0,
      EnableHybrid: 0,
    },
  },
  errors: [
    ConditionCheckFailureException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type PutSchemaVersionMetadataError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InvalidInputException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Puts the metadata key value pair for a specified schema version ID. A maximum of 10 key value pairs will be allowed per schema version. They can be added over one or more calls.
 */
export const putSchemaVersionMetadata: API.OperationMethod<
  PutSchemaVersionMetadataInput,
  PutSchemaVersionMetadataResponse,
  PutSchemaVersionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SchemaId: i_SchemaId,
      SchemaVersionNumber: i_SchemaVersionNumber,
      SchemaVersionId: 0,
      MetadataKeyValue: i_MetadataKeyValuePair,
    },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InvalidInputException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSchemaVersionMetadata",
})) as any;

export type PutWorkflowRunPropertiesError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Puts the specified workflow run properties for the given workflow run. If a property already exists for the specified run, then it overrides the value otherwise adds the property to existing properties.
 */
export const putWorkflowRunProperties: API.OperationMethod<
  PutWorkflowRunPropertiesRequest,
  PutWorkflowRunPropertiesResponse,
  PutWorkflowRunPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, RunId: 0, RunProperties: 0 } },
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWorkflowRunProperties",
})) as any;

export type QuerySchemaVersionMetadataError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | CommonErrors;
/**
 * Queries for the schema version metadata information.
 */
export const querySchemaVersionMetadata: API.OperationMethod<
  QuerySchemaVersionMetadataInput,
  QuerySchemaVersionMetadataResponse,
  QuerySchemaVersionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SchemaId: i_SchemaId,
      SchemaVersionNumber: i_SchemaVersionNumber,
      SchemaVersionId: 0,
      MetadataList: D.list(i_MetadataKeyValuePair),
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QuerySchemaVersionMetadata",
})) as any;

export type RegisterConnectionTypeError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Registers a custom connection type in Glue based on the configuration provided. This operation enables customers to configure custom connectors for any data source with REST-based APIs, eliminating the need for building custom Lambda connectors.
 *
 * The registered connection type stores details about how requests and responses are interpreted by REST sources, including connection properties, authentication configuration, and REST configuration with entity definitions. Once registered, customers can create connections using this connection type and work with them the same way as natively supported Glue connectors.
 *
 * Supports multiple authentication types including Basic, OAuth2 (Client Credentials, JWT Bearer, Authorization Code), and Custom Auth configurations.
 */
export const registerConnectionType: API.OperationMethod<
  RegisterConnectionTypeRequest,
  RegisterConnectionTypeResponse,
  RegisterConnectionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ConnectionType: 0,
      IntegrationType: 0,
      Description: 0,
      ConnectionProperties: {
        Url: i_ConnectorProperty,
        AdditionalRequestParameters: D.list(i_ConnectorProperty),
      },
      ConnectorAuthenticationConfiguration: {
        AuthenticationTypes: 0,
        OAuth2Properties: {
          OAuth2GrantType: 0,
          ClientCredentialsProperties: {
            TokenUrl: i_ConnectorProperty,
            RequestMethod: 0,
            ContentType: 0,
            ClientId: i_ConnectorProperty,
            ClientSecret: i_ConnectorProperty,
            Scope: i_ConnectorProperty,
            TokenUrlParameters: D.list(i_ConnectorProperty),
          },
          JWTBearerProperties: {
            TokenUrl: i_ConnectorProperty,
            RequestMethod: 0,
            ContentType: 0,
            JwtToken: i_ConnectorProperty,
            TokenUrlParameters: D.list(i_ConnectorProperty),
          },
          AuthorizationCodeProperties: {
            AuthorizationCodeUrl: i_ConnectorProperty,
            AuthorizationCode: i_ConnectorProperty,
            RedirectUri: i_ConnectorProperty,
            TokenUrl: i_ConnectorProperty,
            RequestMethod: 0,
            ContentType: 0,
            ClientId: i_ConnectorProperty,
            ClientSecret: i_ConnectorProperty,
            Scope: i_ConnectorProperty,
            Prompt: i_ConnectorProperty,
            TokenUrlParameters: D.list(i_ConnectorProperty),
          },
        },
        BasicAuthenticationProperties: {
          Username: i_ConnectorProperty,
          Password: i_ConnectorProperty,
        },
        CustomAuthenticationProperties: {
          AuthenticationParameters: D.list(i_ConnectorProperty),
        },
      },
      RestConfiguration: {
        GlobalSourceConfiguration: i_SourceConfiguration,
        ValidationEndpointConfiguration: i_SourceConfiguration,
        EntityConfigurations: D.map({
          SourceConfiguration: i_SourceConfiguration,
          Schema: D.map({
            Name: 0,
            FieldDataType: 0,
            ResponseDateFormat: 0,
            IsPartitionable: 0,
            IsNullable: 0,
            IsQueryable: 0,
            IsOrderable: 0,
            FilterOverrides: {
              FieldName: 0,
              OperatorMappings: 0,
              BetweenConfiguration: i_BetweenConfiguration,
              DateTimeFormat: 0,
            },
          }),
        }),
      },
      Tags: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterConnectionType",
})) as any;

export type RegisterSchemaVersionError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Adds a new version to the existing schema. Returns an error if new version of schema does not meet the compatibility requirements of the schema set. This API will not create a new schema set and will return a 404 error if the schema set is not already present in the Schema Registry.
 *
 * If this is the first schema definition to be registered in the Schema Registry, this API will store the schema version and return immediately. Otherwise, this call has the potential to run longer than other operations due to compatibility modes. You can call the `GetSchemaVersion` API with the `SchemaVersionId` to check compatibility modes.
 *
 * If the same schema definition is already stored in Schema Registry as a version, the schema ID of the existing schema is returned to the caller.
 */
export const registerSchemaVersion: API.OperationMethod<
  RegisterSchemaVersionInput,
  RegisterSchemaVersionResponse,
  RegisterSchemaVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SchemaId: i_SchemaId, SchemaDefinition: 0 },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterSchemaVersion",
})) as any;

export type RemoveSchemaVersionMetadataError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | CommonErrors;
/**
 * Removes a key value pair from the schema version metadata for the specified schema version ID.
 */
export const removeSchemaVersionMetadata: API.OperationMethod<
  RemoveSchemaVersionMetadataInput,
  RemoveSchemaVersionMetadataResponse,
  RemoveSchemaVersionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SchemaId: i_SchemaId,
      SchemaVersionNumber: i_SchemaVersionNumber,
      SchemaVersionId: 0,
      MetadataKeyValue: i_MetadataKeyValuePair,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveSchemaVersionMetadata",
})) as any;

export type ResetJobBookmarkError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Resets a bookmark entry.
 *
 * For more information about enabling and using job bookmarks, see:
 *
 * - Tracking processed data using job bookmarks
 *
 * - Job parameters used by Glue
 *
 * - Job structure
 */
export const resetJobBookmark: API.OperationMethod<
  ResetJobBookmarkRequest,
  ResetJobBookmarkResponse,
  ResetJobBookmarkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobName: 0, RunId: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetJobBookmark",
})) as any;

export type ResumeWorkflowRunError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | IllegalWorkflowStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Restarts selected nodes of a previous partially completed workflow run and resumes the workflow run. The selected nodes and all nodes that are downstream from the selected nodes are run.
 */
export const resumeWorkflowRun: API.OperationMethod<
  ResumeWorkflowRunRequest,
  ResumeWorkflowRunResponse,
  ResumeWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, RunId: 0, NodeIds: 0 } },
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    IllegalWorkflowStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeWorkflowRun",
})) as any;

export type RunStatementError =
  | AccessDeniedException
  | EntityNotFoundException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | SessionBusyException
  | ValidationException
  | CommonErrors;
/**
 * Executes the statement.
 */
export const runStatement: API.OperationMethod<
  RunStatementRequest,
  RunStatementResponse,
  RunStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SessionId: 0, Code: 0, RequestOrigin: 0 },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    SessionBusyException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RunStatement",
})) as any;

export type SearchAssetsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for assets in Glue Data Catalog using full-text search, filters, sorting, and aggregations. Returns matching assets with relevance-ranked results.
 */
export const searchAssets: API.PaginatedOperationMethod<
  SearchAssetsInput,
  SearchAssetsOutput,
  SearchAssetsError,
  Credentials | HttpClient.HttpClient,
  SearchResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SearchText: 0,
      MaxResults: 0,
      NextToken: 0,
      Sort: { Attribute: 0, Order: 0 },
      FilterClause: i_SearchFilterClause,
    },
    output: { Items: D.list({ UpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAssets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchTablesError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Searches a set of tables based on properties in the table metadata as well as on the parent database. You can search against text or filter conditions.
 *
 * You can only get tables that you have access to based on the security policies defined in Lake Formation. You need at least a read-only access to the table for it to be returned. If you do not have access to all the columns in the table, these columns will not be searched against when returning the list of tables back to you. If you have access to the columns but not the data in the columns, those columns and the associated metadata for those columns will be included in the search.
 */
export const searchTables: API.PaginatedOperationMethod<
  SearchTablesRequest,
  SearchTablesResponse,
  SearchTablesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      NextToken: 0,
      Filters: D.list({ Key: 0, Value: 0, Comparator: 0 }),
      SearchText: 0,
      SortCriteria: D.list({ FieldName: 0, Sort: 0 }),
      MaxResults: 0,
      ResourceShareType: 0,
      IncludeStatusDetails: 0,
    },
    output: { TableList: D.list(o_Table) },
  },
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchTables",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartBlueprintRunError =
  | EntityNotFoundException
  | IllegalBlueprintStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Starts a new run of the specified blueprint.
 */
export const startBlueprintRun: API.OperationMethod<
  StartBlueprintRunRequest,
  StartBlueprintRunResponse,
  StartBlueprintRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { BlueprintName: 0, Parameters: 0, RoleArn: 0 },
  },
  errors: [
    EntityNotFoundException,
    IllegalBlueprintStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBlueprintRun",
})) as any;

export type StartColumnStatisticsTaskRunError =
  | AccessDeniedException
  | ColumnStatisticsTaskRunningException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Starts a column statistics task run, for a specified table and columns.
 */
export const startColumnStatisticsTaskRun: API.OperationMethod<
  StartColumnStatisticsTaskRunRequest,
  StartColumnStatisticsTaskRunResponse,
  StartColumnStatisticsTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DatabaseName: 0,
      TableName: 0,
      ColumnNameList: 0,
      Role: 0,
      SampleSize: 0,
      CatalogID: 0,
      SecurityConfiguration: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ColumnStatisticsTaskRunningException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartColumnStatisticsTaskRun",
})) as any;

export type StartColumnStatisticsTaskRunScheduleError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts a column statistics task run schedule.
 */
export const startColumnStatisticsTaskRunSchedule: API.OperationMethod<
  StartColumnStatisticsTaskRunScheduleRequest,
  StartColumnStatisticsTaskRunScheduleResponse,
  StartColumnStatisticsTaskRunScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatabaseName: 0, TableName: 0 } },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartColumnStatisticsTaskRunSchedule",
})) as any;

export type StartCrawlerError =
  | CrawlerRunningException
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts a crawl using the specified crawler, regardless
 * of what is scheduled. If the crawler is already running, returns a
 * CrawlerRunningException.
 */
export const startCrawler: API.OperationMethod<
  StartCrawlerRequest,
  StartCrawlerResponse,
  StartCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    CrawlerRunningException,
    EntityNotFoundException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCrawler",
})) as any;

export type StartCrawlerScheduleError =
  | EntityNotFoundException
  | NoScheduleException
  | OperationTimeoutException
  | SchedulerRunningException
  | SchedulerTransitioningException
  | CommonErrors;
/**
 * Changes the schedule state of the specified crawler to
 * `SCHEDULED`, unless the crawler is already running or the
 * schedule state is already `SCHEDULED`.
 */
export const startCrawlerSchedule: API.OperationMethod<
  StartCrawlerScheduleRequest,
  StartCrawlerScheduleResponse,
  StartCrawlerScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CrawlerName: 0 } },
  errors: [
    EntityNotFoundException,
    NoScheduleException,
    OperationTimeoutException,
    SchedulerRunningException,
    SchedulerTransitioningException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCrawlerSchedule",
})) as any;

export type StartDataQualityRuleRecommendationRunError =
  | ConflictException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts a recommendation run that is used to generate rules when you don't know what rules to write. Glue Data Quality analyzes the data and comes up with recommendations for a potential ruleset. You can then triage the ruleset and modify the generated ruleset to your liking.
 *
 * Recommendation runs are automatically deleted after 90 days.
 */
export const startDataQualityRuleRecommendationRun: API.OperationMethod<
  StartDataQualityRuleRecommendationRunRequest,
  StartDataQualityRuleRecommendationRunResponse,
  StartDataQualityRuleRecommendationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DataSource: i_DataSource,
      Role: 0,
      NumberOfWorkers: 0,
      Timeout: 0,
      CreatedRulesetName: 0,
      DataQualitySecurityConfiguration: 0,
      ClientToken: 0,
      AdditionalRunOptions: { CustomLogGroupPrefix: 0 },
    },
  },
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataQualityRuleRecommendationRun",
})) as any;

export type StartDataQualityRulesetEvaluationRunError =
  | ConflictException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Once you have a ruleset definition (either recommended or your own), you call this operation to evaluate the ruleset against a data source (Glue table). The evaluation computes results which you can retrieve with the `GetDataQualityResult` API.
 */
export const startDataQualityRulesetEvaluationRun: API.OperationMethod<
  StartDataQualityRulesetEvaluationRunRequest,
  StartDataQualityRulesetEvaluationRunResponse,
  StartDataQualityRulesetEvaluationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DataSource: i_DataSource,
      Role: 0,
      NumberOfWorkers: 0,
      Timeout: 0,
      ClientToken: 0,
      AdditionalRunOptions: {
        CloudWatchMetricsEnabled: 0,
        ResultsS3Prefix: 0,
        CompositeRuleEvaluationMethod: 0,
        CustomLogGroupPrefix: 0,
        RowLevelResults: {
          MaxRowsToWrite: 0,
          ResultType: 0,
          CatalogTableConfig: i_CatalogTableConfigOptions,
        },
        ProfilingResults: {
          WriteProfilingResultsEnabled: 0,
          CatalogTableConfig: i_CatalogTableConfigOptions,
          DistributionResults: {
            WriteDistributionResultsEnabled: 0,
            CatalogTableConfig: i_CatalogTableConfigOptions,
          },
        },
        ObservationScope: 0,
        ObservationMode: 0,
        DataQualityRuleResults: {
          WriteDataQualityRuleResultsEnabled: 0,
          CatalogTableConfig: i_CatalogTableConfigOptions,
        },
        ObservationResults: {
          WriteObservationResultsEnabled: 0,
          CatalogTableConfig: i_CatalogTableConfigOptions,
        },
      },
      RulesetNames: 0,
      AdditionalDataSources: D.map(i_DataSource),
    },
  },
  errors: [
    ConflictException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataQualityRulesetEvaluationRun",
})) as any;

export type StartExportLabelsTaskRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Begins an asynchronous task to export all labeled data for a particular transform. This
 * task is the only label-related API call that is not part of the typical active learning
 * workflow. You typically use `StartExportLabelsTaskRun` when you want to work with
 * all of your existing labels at the same time, such as when you want to remove or change labels
 * that were previously submitted as truth. This API operation accepts the
 * `TransformId` whose labels you want to export and an Amazon Simple Storage
 * Service (Amazon S3) path to export the labels to. The operation returns a
 * `TaskRunId`. You can check on the status of your task run by calling the
 * `GetMLTaskRun` API.
 */
export const startExportLabelsTaskRun: API.OperationMethod<
  StartExportLabelsTaskRunRequest,
  StartExportLabelsTaskRunResponse,
  StartExportLabelsTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TransformId: 0, OutputS3Path: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExportLabelsTaskRun",
})) as any;

export type StartImportLabelsTaskRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Enables you to provide additional labels (examples of truth) to be used to teach the
 * machine learning transform and improve its quality. This API operation is generally used as
 * part of the active learning workflow that starts with the
 * `StartMLLabelingSetGenerationTaskRun` call and that ultimately results in
 * improving the quality of your machine learning transform.
 *
 * After the `StartMLLabelingSetGenerationTaskRun` finishes, Glue machine learning
 * will have generated a series of questions for humans to answer. (Answering these questions is
 * often called 'labeling' in the machine learning workflows). In the case of the
 * `FindMatches` transform, these questions are of the form, “What is the correct
 * way to group these rows together into groups composed entirely of matching records?” After the
 * labeling process is finished, users upload their answers/labels with a call to
 * `StartImportLabelsTaskRun`. After `StartImportLabelsTaskRun` finishes,
 * all future runs of the machine learning transform use the new and improved labels and perform
 * a higher-quality transformation.
 *
 * By default, `StartMLLabelingSetGenerationTaskRun` continually learns from and
 * combines all labels that you upload unless you set `Replace` to true. If you set
 * `Replace` to true, `StartImportLabelsTaskRun` deletes and forgets all
 * previously uploaded labels and learns only from the exact set that you upload. Replacing
 * labels can be helpful if you realize that you previously uploaded incorrect labels, and you
 * believe that they are having a negative effect on your transform quality.
 *
 * You can check on the status of your task run by calling the `GetMLTaskRun`
 * operation.
 */
export const startImportLabelsTaskRun: API.OperationMethod<
  StartImportLabelsTaskRunRequest,
  StartImportLabelsTaskRunResponse,
  StartImportLabelsTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TransformId: 0, InputS3Path: 0, ReplaceAllLabels: 0 },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportLabelsTaskRun",
})) as any;

export type StartJobRunError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | GlueRoleNotAssumable
  | CommonErrors;
/**
 * Starts a job run using a job definition.
 */
export const startJobRun: API.OperationMethod<
  StartJobRunRequest,
  StartJobRunResponse,
  StartJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobName: 0,
      JobRunQueuingEnabled: 0,
      JobRunId: 0,
      Arguments: 0,
      AllocatedCapacity: 0,
      Timeout: 0,
      MaxCapacity: 0,
      SecurityConfiguration: 0,
      NotificationProperty: i_NotificationProperty,
      WorkerType: 0,
      NumberOfWorkers: 0,
      ExecutionClass: 0,
      ExecutionRoleSessionPolicy: 0,
    },
  },
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    GlueRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJobRun",
})) as any;

export type StartMaterializedViewRefreshTaskRunError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | MaterializedViewRefreshTaskRunningException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Starts a materialized view refresh task run for a specified materialized view.
 */
export const startMaterializedViewRefreshTaskRun: API.OperationMethod<
  StartMaterializedViewRefreshTaskRunRequest,
  StartMaterializedViewRefreshTaskRunResponse,
  StartMaterializedViewRefreshTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, TableName: 0, FullRefresh: 0 },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
    MaterializedViewRefreshTaskRunningException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMaterializedViewRefreshTaskRun",
})) as any;

export type StartMLEvaluationTaskRunError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | MLTransformNotReadyException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts a task to estimate the quality of the transform.
 *
 * When you provide label sets as examples of truth, Glue machine learning uses some of
 * those examples to learn from them. The rest of the labels are used as a test to estimate
 * quality.
 *
 * Returns a unique identifier for the run. You can call `GetMLTaskRun` to get more
 * information about the stats of the `EvaluationTaskRun`.
 */
export const startMLEvaluationTaskRun: API.OperationMethod<
  StartMLEvaluationTaskRunRequest,
  StartMLEvaluationTaskRunResponse,
  StartMLEvaluationTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TransformId: 0 } },
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    MLTransformNotReadyException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMLEvaluationTaskRun",
})) as any;

export type StartMLLabelingSetGenerationTaskRunError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts the active learning workflow for your machine learning transform to improve the
 * transform's quality by generating label sets and adding labels.
 *
 * When the `StartMLLabelingSetGenerationTaskRun` finishes, Glue will have
 * generated a "labeling set" or a set of questions for humans to answer.
 *
 * In the case of the `FindMatches` transform, these questions are of the form,
 * “What is the correct way to group these rows together into groups composed entirely of
 * matching records?”
 *
 * After the labeling process is finished, you can upload your labels with a call to
 * `StartImportLabelsTaskRun`. After `StartImportLabelsTaskRun` finishes,
 * all future runs of the machine learning transform will use the new and improved labels and
 * perform a higher-quality transformation.
 *
 * Note: The role used to write the generated labeling set to the `OutputS3Path` is the role
 * associated with the Machine Learning Transform, specified in the `CreateMLTransform` API.
 */
export const startMLLabelingSetGenerationTaskRun: API.OperationMethod<
  StartMLLabelingSetGenerationTaskRunRequest,
  StartMLLabelingSetGenerationTaskRunResponse,
  StartMLLabelingSetGenerationTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TransformId: 0, OutputS3Path: 0 } },
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMLLabelingSetGenerationTaskRun",
})) as any;

export type StartTriggerError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Starts an existing trigger. See Triggering
 * Jobs for information about how different types of trigger are
 * started.
 */
export const startTrigger: API.OperationMethod<
  StartTriggerRequest,
  StartTriggerResponse,
  StartTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTrigger",
})) as any;

export type StartWorkflowRunError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Starts a new run of the specified workflow.
 */
export const startWorkflowRun: API.OperationMethod<
  StartWorkflowRunRequest,
  StartWorkflowRunResponse,
  StartWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, RunProperties: 0 } },
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkflowRun",
})) as any;

export type StopColumnStatisticsTaskRunError =
  | ColumnStatisticsTaskNotRunningException
  | ColumnStatisticsTaskStoppingException
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops a task run for the specified table.
 */
export const stopColumnStatisticsTaskRun: API.OperationMethod<
  StopColumnStatisticsTaskRunRequest,
  StopColumnStatisticsTaskRunResponse,
  StopColumnStatisticsTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatabaseName: 0, TableName: 0 } },
  errors: [
    ColumnStatisticsTaskNotRunningException,
    ColumnStatisticsTaskStoppingException,
    EntityNotFoundException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopColumnStatisticsTaskRun",
})) as any;

export type StopColumnStatisticsTaskRunScheduleError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops a column statistics task run schedule.
 */
export const stopColumnStatisticsTaskRunSchedule: API.OperationMethod<
  StopColumnStatisticsTaskRunScheduleRequest,
  StopColumnStatisticsTaskRunScheduleResponse,
  StopColumnStatisticsTaskRunScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatabaseName: 0, TableName: 0 } },
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopColumnStatisticsTaskRunSchedule",
})) as any;

export type StopCrawlerError =
  | CrawlerNotRunningException
  | CrawlerStoppingException
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * If the specified crawler is running, stops the crawl.
 */
export const stopCrawler: API.OperationMethod<
  StopCrawlerRequest,
  StopCrawlerResponse,
  StopCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    CrawlerNotRunningException,
    CrawlerStoppingException,
    EntityNotFoundException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCrawler",
})) as any;

export type StopCrawlerScheduleError =
  | EntityNotFoundException
  | OperationTimeoutException
  | SchedulerNotRunningException
  | SchedulerTransitioningException
  | CommonErrors;
/**
 * Sets the schedule state of the specified crawler to
 * `NOT_SCHEDULED`, but does not stop the crawler if it is
 * already running.
 */
export const stopCrawlerSchedule: API.OperationMethod<
  StopCrawlerScheduleRequest,
  StopCrawlerScheduleResponse,
  StopCrawlerScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CrawlerName: 0 } },
  errors: [
    EntityNotFoundException,
    OperationTimeoutException,
    SchedulerNotRunningException,
    SchedulerTransitioningException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCrawlerSchedule",
})) as any;

export type StopMaterializedViewRefreshTaskRunError =
  | AccessDeniedException
  | InvalidInputException
  | MaterializedViewRefreshTaskNotRunningException
  | MaterializedViewRefreshTaskStoppingException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops a materialized view refresh task run for a specified materialized view.
 */
export const stopMaterializedViewRefreshTaskRun: API.OperationMethod<
  StopMaterializedViewRefreshTaskRunRequest,
  StopMaterializedViewRefreshTaskRunResponse,
  StopMaterializedViewRefreshTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, DatabaseName: 0, TableName: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    MaterializedViewRefreshTaskNotRunningException,
    MaterializedViewRefreshTaskStoppingException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMaterializedViewRefreshTaskRun",
})) as any;

export type StopSessionError =
  | AccessDeniedException
  | ConcurrentModificationException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops the session.
 */
export const stopSession: API.OperationMethod<
  StopSessionRequest,
  StopSessionResponse,
  StopSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Id: 0, RequestOrigin: 0 } },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSession",
})) as any;

export type StopTriggerError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops a specified trigger.
 */
export const stopTrigger: API.OperationMethod<
  StopTriggerRequest,
  StopTriggerResponse,
  StopTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTrigger",
})) as any;

export type StopWorkflowRunError =
  | EntityNotFoundException
  | IllegalWorkflowStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops the execution of the specified workflow run.
 */
export const stopWorkflowRun: API.OperationMethod<
  StopWorkflowRunRequest,
  StopWorkflowRunResponse,
  StopWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, RunId: 0 } },
  errors: [
    EntityNotFoundException,
    IllegalWorkflowStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopWorkflowRun",
})) as any;

export type TagResourceError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Adds tags to a resource. A tag is a label you can assign to an Amazon Web Services resource.
 * In Glue, you can tag only certain resources. For information about what
 * resources you can tag, see Amazon Web Services Tags in Glue.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagsToAdd: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestConnectionError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Tests a connection to a service to validate the service credentials that you provide.
 *
 * You can either provide an existing connection name or a `TestConnectionInput` for testing a non-existing connection input. Providing both at the same time will cause an error.
 *
 * If the action is successful, the service sends back an HTTP 200 response.
 */
export const testConnection: API.OperationMethod<
  TestConnectionRequest,
  TestConnectionResponse,
  TestConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ConnectionName: 0,
      CatalogId: 0,
      TestConnectionInput: {
        ConnectionType: 0,
        ConnectionProperties: 0,
        AuthenticationConfiguration: i_AuthenticationConfigurationInput,
      },
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestConnection",
})) as any;

export type UntagResourceError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagsToRemove: 0 } },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAssetError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the name and description of an existing asset in Glue Data Catalog. Only the fields that you provide are updated.
 */
export const updateAsset: API.OperationMethod<
  UpdateAssetRequest,
  UpdateAssetResponse,
  UpdateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Identifier: 0,
      Name: 0,
      Description: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { UpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAsset",
})) as any;

export type UpdateBlueprintError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | IllegalBlueprintStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates a registered blueprint.
 */
export const updateBlueprint: API.OperationMethod<
  UpdateBlueprintRequest,
  UpdateBlueprintResponse,
  UpdateBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Description: 0, BlueprintLocation: 0 },
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    IllegalBlueprintStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBlueprint",
})) as any;

export type UpdateCatalogError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates an existing catalog's properties in the Glue Data Catalog.
 */
export const updateCatalog: API.OperationMethod<
  UpdateCatalogRequest,
  UpdateCatalogResponse,
  UpdateCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, CatalogInput: i_CatalogInput },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCatalog",
})) as any;

export type UpdateClassifierError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | VersionMismatchException
  | CommonErrors;
/**
 * Modifies an existing classifier (a `GrokClassifier`,
 * an `XMLClassifier`, a `JsonClassifier`, or a `CsvClassifier`, depending on
 * which field is present).
 */
export const updateClassifier: API.OperationMethod<
  UpdateClassifierRequest,
  UpdateClassifierResponse,
  UpdateClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GrokClassifier: {
        Name: 0,
        Classification: 0,
        GrokPattern: 0,
        CustomPatterns: 0,
      },
      XMLClassifier: { Name: 0, Classification: 0, RowTag: 0 },
      JsonClassifier: { Name: 0, JsonPath: 0 },
      CsvClassifier: {
        Name: 0,
        Delimiter: 0,
        QuoteSymbol: 0,
        ContainsHeader: 0,
        Header: 0,
        DisableValueTrimming: 0,
        AllowSingleColumn: 0,
        CustomDatatypeConfigured: 0,
        CustomDatatypes: 0,
        Serde: 0,
      },
    },
  },
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClassifier",
})) as any;

export type UpdateColumnStatisticsForPartitionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates or updates partition statistics of columns.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `UpdatePartition`.
 */
export const updateColumnStatisticsForPartition: API.OperationMethod<
  UpdateColumnStatisticsForPartitionRequest,
  UpdateColumnStatisticsForPartitionResponse,
  UpdateColumnStatisticsForPartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      PartitionValues: 0,
      ColumnStatisticsList: D.list(i_ColumnStatistics),
    },
    output: { Errors: D.list(o_ColumnStatisticsError) },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateColumnStatisticsForPartition",
})) as any;

export type UpdateColumnStatisticsForTableError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates or updates table statistics of columns.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `UpdateTable`.
 */
export const updateColumnStatisticsForTable: API.OperationMethod<
  UpdateColumnStatisticsForTableRequest,
  UpdateColumnStatisticsForTableResponse,
  UpdateColumnStatisticsForTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      ColumnStatisticsList: D.list(i_ColumnStatistics),
    },
    output: { Errors: D.list(o_ColumnStatisticsError) },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateColumnStatisticsForTable",
})) as any;

export type UpdateColumnStatisticsTaskSettingsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | VersionMismatchException
  | CommonErrors;
/**
 * Updates settings for a column statistics task.
 */
export const updateColumnStatisticsTaskSettings: API.OperationMethod<
  UpdateColumnStatisticsTaskSettingsRequest,
  UpdateColumnStatisticsTaskSettingsResponse,
  UpdateColumnStatisticsTaskSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DatabaseName: 0,
      TableName: 0,
      Role: 0,
      Schedule: 0,
      ColumnNameList: 0,
      SampleSize: 0,
      CatalogID: 0,
      SecurityConfiguration: 0,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateColumnStatisticsTaskSettings",
})) as any;

export type UpdateConnectionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates a connection definition in the Data Catalog.
 */
export const updateConnection: API.OperationMethod<
  UpdateConnectionRequest,
  UpdateConnectionResponse,
  UpdateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, Name: 0, ConnectionInput: i_ConnectionInput },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
})) as any;

export type UpdateCrawlerError =
  | CrawlerRunningException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | VersionMismatchException
  | GlueRoleNotAssumable
  | GlueS3TargetNotReady
  | CommonErrors;
/**
 * Updates a crawler. If a crawler is
 * running, you must stop it using `StopCrawler` before updating
 * it.
 */
export const updateCrawler: API.OperationMethod<
  UpdateCrawlerRequest,
  UpdateCrawlerResponse,
  UpdateCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Role: 0,
      DatabaseName: 0,
      Description: 0,
      Targets: i_CrawlerTargets,
      Schedule: 0,
      Classifiers: 0,
      TablePrefix: 0,
      SchemaChangePolicy: i_SchemaChangePolicy,
      RecrawlPolicy: i_RecrawlPolicy,
      LineageConfiguration: i_LineageConfiguration,
      LakeFormationConfiguration: i_LakeFormationConfiguration,
      Configuration: 0,
      CrawlerSecurityConfiguration: 0,
    },
  },
  errors: [
    CrawlerRunningException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    VersionMismatchException,
    GlueRoleNotAssumable,
    GlueS3TargetNotReady,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCrawler",
})) as any;

export type UpdateCrawlerScheduleError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | SchedulerTransitioningException
  | VersionMismatchException
  | CommonErrors;
/**
 * Updates the schedule of a crawler using a `cron` expression.
 */
export const updateCrawlerSchedule: API.OperationMethod<
  UpdateCrawlerScheduleRequest,
  UpdateCrawlerScheduleResponse,
  UpdateCrawlerScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CrawlerName: 0, Schedule: 0 } },
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    SchedulerTransitioningException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCrawlerSchedule",
})) as any;

export type UpdateDatabaseError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates an existing database definition in a Data Catalog.
 */
export const updateDatabase: API.OperationMethod<
  UpdateDatabaseRequest,
  UpdateDatabaseResponse,
  UpdateDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CatalogId: 0, Name: 0, DatabaseInput: i_DatabaseInput },
  },
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDatabase",
})) as any;

export type UpdateDataQualityRulesetError =
  | AlreadyExistsException
  | EntityNotFoundException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Updates the specified data quality ruleset.
 */
export const updateDataQualityRuleset: API.OperationMethod<
  UpdateDataQualityRulesetRequest,
  UpdateDataQualityRulesetResponse,
  UpdateDataQualityRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, Description: 0, Ruleset: 0 } },
  errors: [
    AlreadyExistsException,
    EntityNotFoundException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataQualityRuleset",
})) as any;

export type UpdateDevEndpointError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified development endpoint.
 */
export const updateDevEndpoint: API.OperationMethod<
  UpdateDevEndpointRequest,
  UpdateDevEndpointResponse,
  UpdateDevEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      PublicKey: 0,
      AddPublicKeys: 0,
      DeletePublicKeys: 0,
      CustomLibraries: { ExtraPythonLibsS3Path: 0, ExtraJarsS3Path: 0 },
      UpdateEtlLibraries: 0,
      DeleteArguments: 0,
      AddArguments: 0,
    },
  },
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevEndpoint",
})) as any;

export type UpdateGlossaryError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a business glossary in Glue Data Catalog.
 */
export const updateGlossary: API.OperationMethod<
  UpdateGlossaryRequest,
  UpdateGlossaryResponse,
  UpdateGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Identifier: 0,
      Name: 0,
      Description: 0,
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlossary",
})) as any;

export type UpdateGlossaryTermError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a glossary term in Glue Data Catalog.
 */
export const updateGlossaryTerm: API.OperationMethod<
  UpdateGlossaryTermRequest,
  UpdateGlossaryTermResponse,
  UpdateGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Identifier: 0,
      Name: 0,
      ShortDescription: 0,
      LongDescription: 0,
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlossaryTerm",
})) as any;

export type UpdateGlueIdentityCenterConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates the existing Glue Identity Center configuration, allowing modification of scopes and permissions for the integration.
 */
export const updateGlueIdentityCenterConfiguration: API.OperationMethod<
  UpdateGlueIdentityCenterConfigurationRequest,
  UpdateGlueIdentityCenterConfigurationResponse,
  UpdateGlueIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Scopes: 0, UserBackgroundSessionsEnabled: 0 },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlueIdentityCenterConfiguration",
})) as any;

export type UpdateIntegrationResourcePropertyError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API can be used for updating the `ResourceProperty` of the Glue connection (for the source) or Glue database ARN (for the target). These properties can include the role to access the connection or database. Since the same resource can be used across multiple integrations, updating resource properties will impact all the integrations using it.
 */
export const updateIntegrationResourceProperty: API.OperationMethod<
  UpdateIntegrationResourcePropertyRequest,
  UpdateIntegrationResourcePropertyResponse,
  UpdateIntegrationResourcePropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceArn: 0,
      SourceProcessingProperties: i_SourceProcessingProperties,
      TargetProcessingProperties: i_TargetProcessingProperties,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegrationResourceProperty",
})) as any;

export type UpdateIntegrationTablePropertiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API is used to provide optional override properties for the tables that need to be replicated. These properties can include properties for filtering and partitioning for the source and target tables. To set both source and target properties the same API need to be invoked with the Glue connection ARN as `ResourceArn` with `SourceTableConfig`, and the Glue database ARN as `ResourceArn` with `TargetTableConfig` respectively.
 *
 * The override will be reflected across all the integrations using same `ResourceArn` and source table.
 */
export const updateIntegrationTableProperties: API.OperationMethod<
  UpdateIntegrationTablePropertiesRequest,
  UpdateIntegrationTablePropertiesResponse,
  UpdateIntegrationTablePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceArn: 0,
      TableName: 0,
      SourceTableConfig: i_SourceTableConfig,
      TargetTableConfig: i_TargetTableConfig,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegrationTableProperties",
})) as any;

export type UpdateJobError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | GlueRoleNotAssumable
  | CommonErrors;
/**
 * Updates an existing job definition. The previous job definition is completely overwritten by this information.
 */
export const updateJob: API.OperationMethod<
  UpdateJobRequest,
  UpdateJobResponse,
  UpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobName: 0,
      JobUpdate: {
        JobMode: 0,
        JobRunQueuingEnabled: 0,
        Description: 0,
        LogUri: 0,
        Role: 0,
        ExecutionProperty: i_ExecutionProperty,
        Command: i_JobCommand,
        DefaultArguments: 0,
        NonOverridableArguments: 0,
        Connections: i_ConnectionsList,
        MaxRetries: 0,
        AllocatedCapacity: 0,
        Timeout: 0,
        MaxCapacity: 0,
        WorkerType: 0,
        NumberOfWorkers: 0,
        SecurityConfiguration: 0,
        NotificationProperty: i_NotificationProperty,
        GlueVersion: 0,
        CodeGenConfigurationNodes: D.map(i_CodeGenConfigurationNode),
        ExecutionClass: 0,
        SourceControlDetails: i_SourceControlDetails,
        MaintenanceWindow: 0,
      },
    },
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    GlueRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJob",
})) as any;

export type UpdateJobFromSourceControlError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Synchronizes a job from the source control repository. This operation takes the job artifacts that are located in the remote repository and updates the Glue internal stores with these artifacts.
 *
 * This API supports optional parameters which take in the repository information.
 */
export const updateJobFromSourceControl: API.OperationMethod<
  UpdateJobFromSourceControlRequest,
  UpdateJobFromSourceControlResponse,
  UpdateJobFromSourceControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobName: 0,
      Provider: 0,
      RepositoryName: 0,
      RepositoryOwner: 0,
      BranchName: 0,
      Folder: 0,
      CommitId: 0,
      AuthStrategy: 0,
      AuthToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobFromSourceControl",
})) as any;

export type UpdateMLTransformError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates an existing machine learning transform. Call this operation to tune the algorithm parameters to achieve better results.
 *
 * After calling this operation, you can call the `StartMLEvaluationTaskRun`
 * operation to assess how well your new parameters achieved your goals (such as improving the
 * quality of your machine learning transform, or making it more cost-effective).
 */
export const updateMLTransform: API.OperationMethod<
  UpdateMLTransformRequest,
  UpdateMLTransformResponse,
  UpdateMLTransformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TransformId: 0,
      Name: 0,
      Description: 0,
      Parameters: i_TransformParameters,
      Role: 0,
      GlueVersion: 0,
      MaxCapacity: 0,
      WorkerType: 0,
      NumberOfWorkers: 0,
      Timeout: 0,
      MaxRetries: 0,
    },
  },
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMLTransform",
})) as any;

export type UpdatePartitionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates a partition.
 */
export const updatePartition: API.OperationMethod<
  UpdatePartitionRequest,
  UpdatePartitionResponse,
  UpdatePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      PartitionValueList: 0,
      PartitionInput: i_PartitionInput,
    },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePartition",
})) as any;

export type UpdateRegistryError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Updates an existing registry which is used to hold a collection of schemas. The updated properties relate to the registry, and do not modify any of the schemas within the registry.
 */
export const updateRegistry: API.OperationMethod<
  UpdateRegistryInput,
  UpdateRegistryResponse,
  UpdateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RegistryId: i_RegistryId, Description: 0 },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegistry",
})) as any;

export type UpdateSchemaError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Updates the description, compatibility setting, or version checkpoint for a schema set.
 *
 * For updating the compatibility setting, the call will not validate compatibility for the entire set of schema versions with the new compatibility setting. If the value for `Compatibility` is provided, the `VersionNumber` (a checkpoint) is also required. The API will validate the checkpoint version number for consistency.
 *
 * If the value for the `VersionNumber` (checkpoint) is provided, `Compatibility` is optional and this can be used to set/reset a checkpoint for the schema.
 *
 * This update will happen only if the schema is in the AVAILABLE state.
 */
export const updateSchema: API.OperationMethod<
  UpdateSchemaInput,
  UpdateSchemaResponse,
  UpdateSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SchemaId: i_SchemaId,
      SchemaVersionNumber: i_SchemaVersionNumber,
      Compatibility: 0,
      Description: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSchema",
})) as any;

export type UpdateSourceControlFromJobError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Synchronizes a job to the source control repository. This operation takes the job artifacts from the Glue internal stores and makes a commit to the remote repository that is configured on the job.
 *
 * This API supports optional parameters which take in the repository information.
 */
export const updateSourceControlFromJob: API.OperationMethod<
  UpdateSourceControlFromJobRequest,
  UpdateSourceControlFromJobResponse,
  UpdateSourceControlFromJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobName: 0,
      Provider: 0,
      RepositoryName: 0,
      RepositoryOwner: 0,
      BranchName: 0,
      Folder: 0,
      CommitId: 0,
      AuthStrategy: 0,
      AuthToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceControlFromJob",
})) as any;

export type UpdateTableError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Updates a metadata table in the Data Catalog.
 */
export const updateTable: API.OperationMethod<
  UpdateTableRequest,
  UpdateTableResponse,
  UpdateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      Name: 0,
      TableInput: i_TableInput,
      SkipArchive: 0,
      TransactionId: 0,
      VersionId: 0,
      ViewUpdateAction: 0,
      Force: 0,
      UpdateOpenTableFormatInput: {
        UpdateIcebergInput: {
          UpdateIcebergTableInput: {
            Updates: D.list({
              Schema: i_IcebergSchema,
              PartitionSpec: i_IcebergPartitionSpec,
              SortOrder: i_IcebergSortOrder,
              Location: 0,
              Properties: 0,
              Action: 0,
              EncryptionKey: {
                KeyId: 0,
                EncryptedKeyMetadata: 0,
                EncryptedById: 0,
                Properties: 0,
              },
              KeyId: 0,
            }),
          },
        },
      },
    },
  },
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTable",
})) as any;

export type UpdateTableOptimizerError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration for an existing table optimizer.
 */
export const updateTableOptimizer: API.OperationMethod<
  UpdateTableOptimizerRequest,
  UpdateTableOptimizerResponse,
  UpdateTableOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      TableName: 0,
      Type: 0,
      TableOptimizerConfiguration: i_TableOptimizerConfiguration,
    },
  },
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTableOptimizer",
})) as any;

export type UpdateTriggerError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates a trigger definition.
 *
 * Job arguments may be logged. Do not pass plaintext secrets as arguments. Retrieve secrets from a Glue Connection, Amazon Web Services Secrets Manager or other secret management mechanism if you intend to keep them within the Job.
 */
export const updateTrigger: API.OperationMethod<
  UpdateTriggerRequest,
  UpdateTriggerResponse,
  UpdateTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      TriggerUpdate: {
        Name: 0,
        Description: 0,
        Schedule: 0,
        Actions: D.list(i_Action),
        Predicate: i_Predicate,
        EventBatchingCondition: i_EventBatchingCondition,
      },
    },
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrigger",
})) as any;

export type UpdateUsageProfileError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Update an Glue usage profile.
 */
export const updateUsageProfile: API.OperationMethod<
  UpdateUsageProfileRequest,
  UpdateUsageProfileResponse,
  UpdateUsageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Description: 0, Configuration: i_ProfileConfiguration },
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUsageProfile",
})) as any;

export type UpdateUserDefinedFunctionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates an existing function definition in the Data Catalog.
 */
export const updateUserDefinedFunction: API.OperationMethod<
  UpdateUserDefinedFunctionRequest,
  UpdateUserDefinedFunctionResponse,
  UpdateUserDefinedFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CatalogId: 0,
      DatabaseName: 0,
      FunctionName: 0,
      FunctionInput: i_UserDefinedFunctionInput,
    },
  },
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserDefinedFunction",
})) as any;

export type UpdateWorkflowError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates an existing workflow.
 */
export const updateWorkflow: API.OperationMethod<
  UpdateWorkflowRequest,
  UpdateWorkflowResponse,
  UpdateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      DefaultRunProperties: 0,
      MaxConcurrentRuns: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkflow",
})) as any;

const i_Action: D.LazyStruct = () => ({
  JobName: 0,
  Arguments: 0,
  Timeout: 0,
  SecurityConfiguration: 0,
  NotificationProperty: i_NotificationProperty,
  CrawlerName: 0,
});
const i_AuditContext: D.LazyStruct = () => ({
  AdditionalAuditContext: 0,
  RequestedColumns: 0,
  AllColumnsRequested: 0,
});
const i_AuthenticationConfigurationInput: D.LazyStruct = () => ({
  AuthenticationType: 0,
  OAuth2Properties: {
    OAuth2GrantType: 0,
    OAuth2ClientApplication: {
      UserManagedClientApplicationClientId: 0,
      AWSManagedClientApplicationReference: 0,
    },
    TokenUrl: 0,
    TokenUrlParametersMap: 0,
    AuthorizationCodeProperties: { AuthorizationCode: 0, RedirectUri: 0 },
    OAuth2Credentials: {
      UserManagedClientApplicationClientSecret: 0,
      AccessToken: 0,
      RefreshToken: 0,
      JwtToken: 0,
    },
  },
  SecretArn: 0,
  KmsKeyArn: 0,
  BasicAuthenticationCredentials: { Username: 0, Password: 0 },
  CustomAuthenticationCredentials: 0,
});
const i_BetweenConfiguration: D.LazyStruct = () => ({
  LowBoundKey: 0,
  HighBoundKey: 0,
  Template: 0,
});
const i_CatalogEntry: D.LazyStruct = () => ({ DatabaseName: 0, TableName: 0 });
const i_CatalogInput: D.LazyStruct = () => ({
  Description: 0,
  FederatedCatalog: { Identifier: 0, ConnectionName: 0, ConnectionType: 0 },
  Parameters: 0,
  TargetRedshiftCatalog: { CatalogArn: 0 },
  CatalogProperties: {
    DataLakeAccessProperties: {
      DataLakeAccess: 0,
      DataTransferRole: 0,
      KmsKey: 0,
      CatalogType: 0,
    },
    IcebergOptimizationProperties: {
      RoleArn: 0,
      Compaction: 0,
      Retention: 0,
      OrphanFileDeletion: 0,
    },
    CustomProperties: 0,
  },
  CreateTableDefaultPermissions: D.list(i_PrincipalPermissions),
  CreateDatabaseDefaultPermissions: D.list(i_PrincipalPermissions),
  AllowFullTableExternalDataAccess: 0,
  OverwriteChildResourcePermissionsWithDefault: 0,
});
const i_CatalogTableConfigOptions: D.LazyStruct = () => ({
  DatabaseName: 0,
  TableName: 0,
  S3Location: 0,
  CatalogId: 0,
});
const i_CodeGenConfigurationNode: D.LazyStruct = () => ({
  AthenaConnectorSource: {
    Name: 0,
    ConnectionName: 0,
    ConnectorName: 0,
    ConnectionType: 0,
    ConnectionTable: 0,
    SchemaName: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  JDBCConnectorSource: {
    Name: 0,
    ConnectionName: 0,
    ConnectorName: 0,
    ConnectionType: 0,
    AdditionalOptions: {
      FilterPredicate: 0,
      PartitionColumn: 0,
      LowerBound: 0,
      UpperBound: 0,
      NumPartitions: 0,
      JobBookmarkKeys: 0,
      JobBookmarkKeysSortOrder: 0,
      DataTypeMapping: 0,
    },
    ConnectionTable: 0,
    Query: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  SparkConnectorSource: {
    Name: 0,
    ConnectionName: 0,
    ConnectorName: 0,
    ConnectionType: 0,
    AdditionalOptions: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  CatalogSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    PartitionPredicate: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  RedshiftSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    RedshiftTmpDir: 0,
    TmpDirIAMRole: 0,
  },
  S3CatalogSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    PartitionPredicate: 0,
    AdditionalOptions: i_S3SourceAdditionalOptions,
  },
  S3CsvSource: {
    Name: 0,
    Paths: 0,
    CompressionType: 0,
    Exclusions: 0,
    GroupSize: 0,
    GroupFiles: 0,
    Recurse: 0,
    MaxBand: 0,
    MaxFilesInBand: 0,
    AdditionalOptions: i_S3DirectSourceAdditionalOptions,
    Separator: 0,
    Escaper: 0,
    QuoteChar: 0,
    Multiline: 0,
    WithHeader: 0,
    WriteHeader: 0,
    SkipFirst: 0,
    OptimizePerformance: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3JsonSource: {
    Name: 0,
    Paths: 0,
    CompressionType: 0,
    Exclusions: 0,
    GroupSize: 0,
    GroupFiles: 0,
    Recurse: 0,
    MaxBand: 0,
    MaxFilesInBand: 0,
    AdditionalOptions: i_S3DirectSourceAdditionalOptions,
    JsonPath: 0,
    Multiline: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3ParquetSource: {
    Name: 0,
    Paths: 0,
    CompressionType: 0,
    Exclusions: 0,
    GroupSize: 0,
    GroupFiles: 0,
    Recurse: 0,
    MaxBand: 0,
    MaxFilesInBand: 0,
    AdditionalOptions: i_S3DirectSourceAdditionalOptions,
    OutputSchemas: D.list(i_GlueSchema),
  },
  RelationalCatalogSource: { Name: 0, Database: 0, Table: 0 },
  DynamoDBCatalogSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    PitrEnabled: 0,
    AdditionalOptions: { DynamodbExport: 0, DynamodbUnnestDDBJson: 0 },
  },
  JDBCConnectorTarget: {
    Name: 0,
    Inputs: 0,
    ConnectionName: 0,
    ConnectionTable: 0,
    ConnectorName: 0,
    ConnectionType: 0,
    AdditionalOptions: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  SparkConnectorTarget: {
    Name: 0,
    Inputs: 0,
    ConnectionName: 0,
    ConnectorName: 0,
    ConnectionType: 0,
    AdditionalOptions: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  CatalogTarget: {
    Name: 0,
    Inputs: 0,
    PartitionKeys: 0,
    Database: 0,
    Table: 0,
  },
  RedshiftTarget: {
    Name: 0,
    Inputs: 0,
    Database: 0,
    Table: 0,
    RedshiftTmpDir: 0,
    TmpDirIAMRole: 0,
    UpsertRedshiftOptions: {
      TableLocation: 0,
      ConnectionName: 0,
      UpsertKeys: 0,
    },
  },
  S3CatalogTarget: {
    Name: 0,
    Inputs: 0,
    PartitionKeys: 0,
    Table: 0,
    Database: 0,
    SchemaChangePolicy: i_CatalogSchemaChangePolicy,
    AutoDataQuality: i_AutoDataQuality,
  },
  S3GlueParquetTarget: {
    Name: 0,
    Inputs: 0,
    PartitionKeys: 0,
    Path: 0,
    Compression: 0,
    NumberTargetPartitions: 0,
    SchemaChangePolicy: i_DirectSchemaChangePolicy,
    AutoDataQuality: i_AutoDataQuality,
  },
  S3DirectTarget: {
    Name: 0,
    Inputs: 0,
    PartitionKeys: 0,
    Path: 0,
    Compression: 0,
    NumberTargetPartitions: 0,
    Format: 0,
    SchemaChangePolicy: i_DirectSchemaChangePolicy,
    AutoDataQuality: i_AutoDataQuality,
    OutputSchemas: D.list(i_GlueSchema),
  },
  ApplyMapping: { Name: 0, Inputs: 0, Mapping: D.list(i_Mapping) },
  SelectFields: { Name: 0, Inputs: 0, Paths: 0 },
  DropFields: { Name: 0, Inputs: 0, Paths: 0 },
  RenameField: { Name: 0, Inputs: 0, SourcePath: 0, TargetPath: 0 },
  Spigot: { Name: 0, Inputs: 0, Path: 0, Topk: 0, Prob: 0 },
  Join: {
    Name: 0,
    Inputs: 0,
    JoinType: 0,
    Columns: D.list({ From: 0, Keys: 0 }),
  },
  SplitFields: { Name: 0, Inputs: 0, Paths: 0 },
  SelectFromCollection: { Name: 0, Inputs: 0, Index: 0 },
  FillMissingValues: { Name: 0, Inputs: 0, ImputedPath: 0, FilledPath: 0 },
  Filter: {
    Name: 0,
    Inputs: 0,
    LogicalOperator: 0,
    Filters: D.list(i_FilterExpression),
  },
  CustomCode: {
    Name: 0,
    Inputs: 0,
    Code: 0,
    ClassName: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  SparkSQL: {
    Name: 0,
    Inputs: 0,
    SqlQuery: 0,
    SqlAliases: D.list({ From: 0, Alias: 0 }),
    OutputSchemas: D.list(i_GlueSchema),
  },
  DirectKinesisSource: {
    Name: 0,
    WindowSize: 0,
    DetectSchema: 0,
    StreamingOptions: i_KinesisStreamingSourceOptions,
    DataPreviewOptions: i_StreamingDataPreviewOptions,
  },
  DirectKafkaSource: {
    Name: 0,
    StreamingOptions: i_KafkaStreamingSourceOptions,
    WindowSize: 0,
    DetectSchema: 0,
    DataPreviewOptions: i_StreamingDataPreviewOptions,
  },
  CatalogKinesisSource: {
    Name: 0,
    WindowSize: 0,
    DetectSchema: 0,
    Table: 0,
    Database: 0,
    StreamingOptions: i_KinesisStreamingSourceOptions,
    DataPreviewOptions: i_StreamingDataPreviewOptions,
  },
  CatalogKafkaSource: {
    Name: 0,
    WindowSize: 0,
    DetectSchema: 0,
    Table: 0,
    Database: 0,
    StreamingOptions: i_KafkaStreamingSourceOptions,
    DataPreviewOptions: i_StreamingDataPreviewOptions,
  },
  DropNullFields: {
    Name: 0,
    Inputs: 0,
    NullCheckBoxList: { IsEmpty: 0, IsNullString: 0, IsNegOne: 0 },
    NullTextList: D.list({ Value: 0, Datatype: { Id: 0, Label: 0 } }),
  },
  Merge: { Name: 0, Inputs: 0, Source: 0, PrimaryKeys: 0 },
  Union: { Name: 0, Inputs: 0, UnionType: 0 },
  PIIDetection: {
    Name: 0,
    Inputs: 0,
    PiiType: 0,
    EntityTypesToDetect: 0,
    OutputColumnName: 0,
    SampleFraction: 0,
    ThresholdFraction: 0,
    MaskValue: 0,
    RedactText: 0,
    RedactChar: 0,
    MatchPattern: 0,
    NumLeftCharsToExclude: 0,
    NumRightCharsToExclude: 0,
    DetectionParameters: 0,
    DetectionSensitivity: 0,
  },
  Aggregate: {
    Name: 0,
    Inputs: 0,
    Groups: 0,
    Aggs: D.list({ Column: 0, AggFunc: 0 }),
  },
  DropDuplicates: { Name: 0, Inputs: 0, Columns: 0 },
  GovernedCatalogTarget: {
    Name: 0,
    Inputs: 0,
    PartitionKeys: 0,
    Table: 0,
    Database: 0,
    SchemaChangePolicy: i_CatalogSchemaChangePolicy,
  },
  GovernedCatalogSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    PartitionPredicate: 0,
    AdditionalOptions: i_S3SourceAdditionalOptions,
  },
  MicrosoftSQLServerCatalogSource: { Name: 0, Database: 0, Table: 0 },
  MySQLCatalogSource: { Name: 0, Database: 0, Table: 0 },
  OracleSQLCatalogSource: { Name: 0, Database: 0, Table: 0 },
  PostgreSQLCatalogSource: { Name: 0, Database: 0, Table: 0 },
  MicrosoftSQLServerCatalogTarget: {
    Name: 0,
    Inputs: 0,
    Database: 0,
    Table: 0,
  },
  MySQLCatalogTarget: { Name: 0, Inputs: 0, Database: 0, Table: 0 },
  OracleSQLCatalogTarget: { Name: 0, Inputs: 0, Database: 0, Table: 0 },
  PostgreSQLCatalogTarget: { Name: 0, Inputs: 0, Database: 0, Table: 0 },
  Route: {
    Name: 0,
    Inputs: 0,
    GroupFiltersList: D.list({
      GroupName: 0,
      Filters: D.list(i_FilterExpression),
      LogicalOperator: 0,
    }),
  },
  DynamicTransform: {
    Name: 0,
    TransformName: 0,
    Inputs: 0,
    Parameters: D.list({
      Name: 0,
      Type: 0,
      ValidationRule: 0,
      ValidationMessage: 0,
      Value: 0,
      ListType: 0,
      IsOptional: 0,
    }),
    FunctionName: 0,
    Path: 0,
    Version: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  EvaluateDataQuality: {
    Name: 0,
    Inputs: 0,
    Ruleset: 0,
    Output: 0,
    PublishingOptions: i_DQResultsPublishingOptions,
    StopJobOnFailureOptions: i_DQStopJobOnFailureOptions,
  },
  S3CatalogHudiSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    AdditionalHudiOptions: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  CatalogHudiSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    AdditionalHudiOptions: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3HudiSource: {
    Name: 0,
    Paths: 0,
    AdditionalHudiOptions: 0,
    AdditionalOptions: i_S3DirectSourceAdditionalOptions,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3HudiCatalogTarget: {
    Name: 0,
    Inputs: 0,
    PartitionKeys: 0,
    Table: 0,
    Database: 0,
    AdditionalOptions: 0,
    SchemaChangePolicy: i_CatalogSchemaChangePolicy,
    AutoDataQuality: i_AutoDataQuality,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3HudiDirectTarget: {
    Name: 0,
    Inputs: 0,
    Path: 0,
    Compression: 0,
    NumberTargetPartitions: 0,
    PartitionKeys: 0,
    Format: 0,
    AdditionalOptions: 0,
    SchemaChangePolicy: i_DirectSchemaChangePolicy,
    AutoDataQuality: i_AutoDataQuality,
  },
  DirectJDBCSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    ConnectionName: 0,
    ConnectionType: 0,
    RedshiftTmpDir: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3CatalogDeltaSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    AdditionalDeltaOptions: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  CatalogDeltaSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    AdditionalDeltaOptions: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3DeltaSource: {
    Name: 0,
    Paths: 0,
    AdditionalDeltaOptions: 0,
    AdditionalOptions: i_S3DirectSourceAdditionalOptions,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3DeltaCatalogTarget: {
    Name: 0,
    Inputs: 0,
    PartitionKeys: 0,
    Table: 0,
    Database: 0,
    AdditionalOptions: 0,
    SchemaChangePolicy: i_CatalogSchemaChangePolicy,
    AutoDataQuality: i_AutoDataQuality,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3DeltaDirectTarget: {
    Name: 0,
    Inputs: 0,
    PartitionKeys: 0,
    Path: 0,
    Compression: 0,
    NumberTargetPartitions: 0,
    Format: 0,
    AdditionalOptions: 0,
    SchemaChangePolicy: i_DirectSchemaChangePolicy,
    AutoDataQuality: i_AutoDataQuality,
  },
  AmazonRedshiftSource: { Name: 0, Data: i_AmazonRedshiftNodeData },
  AmazonRedshiftTarget: { Name: 0, Data: i_AmazonRedshiftNodeData, Inputs: 0 },
  EvaluateDataQualityMultiFrame: {
    Name: 0,
    Inputs: 0,
    AdditionalDataSources: 0,
    Ruleset: 0,
    PublishingOptions: i_DQResultsPublishingOptions,
    AdditionalOptions: 0,
    StopJobOnFailureOptions: i_DQStopJobOnFailureOptions,
  },
  Recipe: {
    Name: 0,
    Inputs: 0,
    RecipeReference: { RecipeArn: 0, RecipeVersion: 0 },
    RecipeSteps: D.list({
      Action: { Operation: 0, Parameters: 0 },
      ConditionExpressions: D.list({ Condition: 0, Value: 0, TargetColumn: 0 }),
    }),
  },
  SnowflakeSource: {
    Name: 0,
    Data: i_SnowflakeNodeData,
    OutputSchemas: D.list(i_GlueSchema),
  },
  SnowflakeTarget: { Name: 0, Data: i_SnowflakeNodeData, Inputs: 0 },
  ConnectorDataSource: {
    Name: 0,
    ConnectionType: 0,
    Data: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  ConnectorDataTarget: { Name: 0, ConnectionType: 0, Data: 0, Inputs: 0 },
  S3CatalogIcebergSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    AdditionalIcebergOptions: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  CatalogIcebergSource: {
    Name: 0,
    Database: 0,
    Table: 0,
    AdditionalIcebergOptions: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3IcebergCatalogTarget: {
    Name: 0,
    Inputs: 0,
    PartitionKeys: 0,
    Table: 0,
    Database: 0,
    AdditionalOptions: 0,
    SchemaChangePolicy: i_CatalogSchemaChangePolicy,
    AutoDataQuality: i_AutoDataQuality,
  },
  S3IcebergDirectTarget: {
    Name: 0,
    Inputs: 0,
    PartitionKeys: 0,
    Path: 0,
    Format: 0,
    AdditionalOptions: 0,
    SchemaChangePolicy: i_DirectSchemaChangePolicy,
    AutoDataQuality: i_AutoDataQuality,
    Compression: 0,
    NumberTargetPartitions: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3ExcelSource: {
    Name: 0,
    Paths: 0,
    CompressionType: 0,
    Exclusions: 0,
    GroupSize: 0,
    GroupFiles: 0,
    Recurse: 0,
    MaxBand: 0,
    MaxFilesInBand: 0,
    AdditionalOptions: i_S3DirectSourceAdditionalOptions,
    NumberRows: 0,
    SkipFooter: 0,
    OutputSchemas: D.list(i_GlueSchema),
  },
  S3HyperDirectTarget: {
    Name: 0,
    Inputs: 0,
    Format: 0,
    PartitionKeys: 0,
    Path: 0,
    Compression: 0,
    SchemaChangePolicy: i_DirectSchemaChangePolicy,
    AutoDataQuality: i_AutoDataQuality,
    OutputSchemas: D.list(i_GlueSchema),
  },
  DynamoDBELTConnectorSource: {
    Name: 0,
    ConnectionOptions: {
      DynamodbExport: 0,
      DynamodbUnnestDDBJson: 0,
      DynamodbTableArn: 0,
      DynamodbS3Bucket: 0,
      DynamodbS3Prefix: 0,
      DynamodbS3BucketOwner: 0,
      DynamodbStsRoleArn: 0,
    },
    OutputSchemas: D.list(i_GlueSchema),
  },
});
const i_CodeGenNodeArg: D.LazyStruct = () => ({ Name: 0, Value: 0, Param: 0 });
const i_ColumnStatistics: D.LazyStruct = () => ({
  ColumnName: 0,
  ColumnType: 0,
  AnalyzedTime: 0,
  StatisticsData: {
    Type: 0,
    BooleanColumnStatisticsData: {
      NumberOfTrues: 0,
      NumberOfFalses: 0,
      NumberOfNulls: 0,
    },
    DateColumnStatisticsData: {
      MinimumValue: 0,
      MaximumValue: 0,
      NumberOfNulls: 0,
      NumberOfDistinctValues: 0,
    },
    DecimalColumnStatisticsData: {
      MinimumValue: i_DecimalNumber,
      MaximumValue: i_DecimalNumber,
      NumberOfNulls: 0,
      NumberOfDistinctValues: 0,
    },
    DoubleColumnStatisticsData: {
      MinimumValue: 0,
      MaximumValue: 0,
      NumberOfNulls: 0,
      NumberOfDistinctValues: 0,
    },
    LongColumnStatisticsData: {
      MinimumValue: 0,
      MaximumValue: 0,
      NumberOfNulls: 0,
      NumberOfDistinctValues: 0,
    },
    StringColumnStatisticsData: {
      MaximumLength: 0,
      AverageLength: 0,
      NumberOfNulls: 0,
      NumberOfDistinctValues: 0,
    },
    BinaryColumnStatisticsData: {
      MaximumLength: 0,
      AverageLength: 0,
      NumberOfNulls: 0,
    },
  },
});
const i_ConnectionInput: D.LazyStruct = () => ({
  Name: 0,
  Description: 0,
  ConnectionType: 0,
  MatchCriteria: 0,
  ConnectionProperties: 0,
  SparkProperties: 0,
  AthenaProperties: 0,
  PythonProperties: 0,
  PhysicalConnectionRequirements: {
    SubnetId: 0,
    SecurityGroupIdList: 0,
    AvailabilityZone: 0,
  },
  AuthenticationConfiguration: i_AuthenticationConfigurationInput,
  ValidateCredentials: 0,
  ValidateForComputeEnvironments: 0,
});
const i_ConnectionsList: D.LazyStruct = () => ({ Connections: 0 });
const i_ConnectorProperty: D.LazyStruct = () => ({
  Name: 0,
  KeyOverride: 0,
  Required: 0,
  DefaultValue: 0,
  AllowedValues: 0,
  PropertyLocation: 0,
  PropertyType: 0,
  Format: 0,
});
const i_CrawlerTargets: D.LazyStruct = () => ({
  S3Targets: D.list({
    Path: 0,
    Exclusions: 0,
    ConnectionName: 0,
    SampleSize: 0,
    EventQueueArn: 0,
    DlqEventQueueArn: 0,
  }),
  JdbcTargets: D.list({
    ConnectionName: 0,
    Path: 0,
    Exclusions: 0,
    EnableAdditionalMetadata: 0,
  }),
  MongoDBTargets: D.list({ ConnectionName: 0, Path: 0, ScanAll: 0 }),
  DynamoDBTargets: D.list({ Path: 0, scanAll: 0, scanRate: 0 }),
  CatalogTargets: D.list({
    DatabaseName: 0,
    Tables: 0,
    ConnectionName: 0,
    EventQueueArn: 0,
    DlqEventQueueArn: 0,
  }),
  DeltaTargets: D.list({
    DeltaTables: 0,
    ConnectionName: 0,
    WriteManifest: 0,
    CreateNativeDeltaTable: 0,
  }),
  IcebergTargets: D.list({
    Paths: 0,
    ConnectionName: 0,
    Exclusions: 0,
    MaximumTraversalDepth: 0,
  }),
  HudiTargets: D.list({
    Paths: 0,
    ConnectionName: 0,
    Exclusions: 0,
    MaximumTraversalDepth: 0,
  }),
});
const i_DataQualityTargetTable: D.LazyStruct = () => ({
  TableName: 0,
  DatabaseName: 0,
  CatalogId: 0,
});
const i_DataSource: D.LazyStruct = () => ({
  GlueTable: i_GlueTable,
  DataQualityGlueTable: {
    DatabaseName: 0,
    TableName: 0,
    CatalogId: 0,
    ConnectionName: 0,
    AdditionalOptions: 0,
    PreProcessingQuery: 0,
  },
});
const i_DatabaseInput: D.LazyStruct = () => ({
  Name: 0,
  Description: 0,
  LocationUri: 0,
  Parameters: 0,
  CreateTableDefaultPermissions: D.list(i_PrincipalPermissions),
  TargetDatabase: { CatalogId: 0, DatabaseName: 0, Region: 0 },
  FederatedDatabase: { Identifier: 0, ConnectionName: 0, ConnectionType: 0 },
});
const i_EventBatchingCondition: D.LazyStruct = () => ({
  BatchSize: 0,
  BatchWindow: 0,
});
const i_ExecutionProperty: D.LazyStruct = () => ({ MaxConcurrentRuns: 0 });
const i_GlueTable: D.LazyStruct = () => ({
  DatabaseName: 0,
  TableName: 0,
  CatalogId: 0,
  ConnectionName: 0,
  AdditionalOptions: 0,
});
const i_IcebergPartitionSpec: D.LazyStruct = () => ({
  Fields: D.list({ SourceId: 0, Transform: 0, Name: 0, FieldId: 0 }),
  SpecId: 0,
});
const i_IcebergSchema: D.LazyStruct = () => ({
  SchemaId: 0,
  IdentifierFieldIds: 0,
  Type: 0,
  Fields: D.list({
    Id: 0,
    Name: 0,
    Type: 0,
    Required: 0,
    Doc: 0,
    InitialDefault: 0,
    WriteDefault: 0,
  }),
});
const i_IcebergSortOrder: D.LazyStruct = () => ({
  OrderId: 0,
  Fields: D.list({ SourceId: 0, Transform: 0, Direction: 0, NullOrder: 0 }),
});
const i_IntegrationConfig: D.LazyStruct = () => ({
  RefreshInterval: 0,
  SourceProperties: 0,
  ContinuousSync: 0,
});
const i_JobCommand: D.LazyStruct = () => ({
  Name: 0,
  ScriptLocation: 0,
  PythonVersion: 0,
  Runtime: 0,
});
const i_LakeFormationConfiguration: D.LazyStruct = () => ({
  UseLakeFormationCredentials: 0,
  AccountId: 0,
});
const i_LineageConfiguration: D.LazyStruct = () => ({
  CrawlerLineageSettings: 0,
});
const i_Location: D.LazyStruct = () => ({
  Jdbc: D.list(i_CodeGenNodeArg),
  S3: D.list(i_CodeGenNodeArg),
  DynamoDB: D.list(i_CodeGenNodeArg),
});
const i_MetadataKeyValuePair: D.LazyStruct = () => ({
  MetadataKey: 0,
  MetadataValue: 0,
});
const i_NotificationProperty: D.LazyStruct = () => ({ NotifyDelayAfter: 0 });
const i_PartitionIndex: D.LazyStruct = () => ({ Keys: 0, IndexName: 0 });
const i_PartitionInput: D.LazyStruct = () => ({
  Values: 0,
  LastAccessTime: 0,
  StorageDescriptor: i_StorageDescriptor,
  Parameters: 0,
  LastAnalyzedTime: 0,
});
const i_PartitionValueList: D.LazyStruct = () => ({ Values: 0 });
const i_Predicate: D.LazyStruct = () => ({
  Logical: 0,
  Conditions: D.list({
    LogicalOperator: 0,
    JobName: 0,
    State: 0,
    CrawlerName: 0,
    CrawlState: 0,
  }),
});
const i_ProfileConfiguration: D.LazyStruct = () => ({
  SessionConfiguration: D.map(i_ConfigurationObject),
  JobConfiguration: D.map(i_ConfigurationObject),
});
const i_QuerySessionContext: D.LazyStruct = () => ({
  QueryId: 0,
  QueryStartTime: 0,
  ClusterId: 0,
  QueryAuthorizationId: 0,
  AdditionalContext: 0,
});
const i_RecrawlPolicy: D.LazyStruct = () => ({ RecrawlBehavior: 0 });
const i_RegistryId: D.LazyStruct = () => ({ RegistryName: 0, RegistryArn: 0 });
const i_SchemaChangePolicy: D.LazyStruct = () => ({
  UpdateBehavior: 0,
  DeleteBehavior: 0,
});
const i_SchemaId: D.LazyStruct = () => ({
  SchemaArn: 0,
  SchemaName: 0,
  RegistryName: 0,
});
const i_SchemaVersionNumber: D.LazyStruct = () => ({
  LatestVersion: 0,
  VersionNumber: 0,
});
const i_SearchFilterClause: D.LazyStruct = () => ({
  AndAllFilters: D.list(i_SearchFilterClause),
  OrAnyFilters: D.list(i_SearchFilterClause),
  AttributeFilter: {
    Attribute: 0,
    Operator: 0,
    Value: { StringValue: 0, LongValue: 0 },
  },
  MapFilter: { Attribute: 0, Key: 0, Value: { StringValue: 0 } },
});
const i_Segment: D.LazyStruct = () => ({ SegmentNumber: 0, TotalSegments: 0 });
const i_SourceConfiguration: D.LazyStruct = () => ({
  RequestMethod: 0,
  RequestPath: 0,
  RequestParameters: D.list(i_ConnectorProperty),
  ResponseConfiguration: { ResultPath: 0, ErrorPath: 0 },
  PaginationConfiguration: {
    CursorConfiguration: {
      NextPage: i_ExtractedParameter,
      LimitParameter: i_ExtractedParameter,
    },
    OffsetConfiguration: {
      OffsetParameter: i_ExtractedParameter,
      LimitParameter: i_ExtractedParameter,
    },
  },
  FilterConfiguration: {
    FilterMode: 0,
    OperatorMappings: 0,
    DateTimeFormat: 0,
    StripQuotes: 0,
    BetweenConfiguration: i_BetweenConfiguration,
    FilterStringConfiguration: {
      QueryParameterName: 0,
      QuoteStringValues: 0,
      QuoteCharacter: 0,
    },
  },
});
const i_SourceControlDetails: D.LazyStruct = () => ({
  Provider: 0,
  Repository: 0,
  Owner: 0,
  Branch: 0,
  Folder: 0,
  LastCommitId: 0,
  AuthStrategy: 0,
  AuthToken: 0,
});
const i_SourceProcessingProperties: D.LazyStruct = () => ({ RoleArn: 0 });
const i_SourceTableConfig: D.LazyStruct = () => ({
  Fields: 0,
  FilterPredicate: 0,
  PrimaryKey: 0,
  RecordUpdateField: 0,
});
const i_TableInput: D.LazyStruct = () => ({
  Name: 0,
  Description: 0,
  Owner: 0,
  LastAccessTime: 0,
  LastAnalyzedTime: 0,
  Retention: 0,
  StorageDescriptor: i_StorageDescriptor,
  PartitionKeys: D.list(i_Column),
  ViewOriginalText: 0,
  ViewExpandedText: 0,
  TableType: 0,
  Parameters: 0,
  TargetTable: { CatalogId: 0, DatabaseName: 0, Name: 0, Region: 0 },
  ViewDefinition: {
    IsProtected: 0,
    Definer: 0,
    Representations: D.list({
      Dialect: 0,
      DialectVersion: 0,
      ViewOriginalText: 0,
      ValidationConnection: 0,
      ViewExpandedText: 0,
    }),
    ViewVersionId: 0,
    ViewVersionToken: 0,
    RefreshSeconds: 0,
    LastRefreshType: 0,
    SubObjects: 0,
    SubObjectVersionIds: 0,
  },
});
const i_TableOptimizerConfiguration: D.LazyStruct = () => ({
  roleArn: 0,
  enabled: 0,
  vpcConfiguration: { glueConnectionName: 0 },
  compactionConfiguration: {
    icebergConfiguration: {
      strategy: 0,
      minInputFiles: 0,
      deleteFileThreshold: 0,
    },
  },
  retentionConfiguration: {
    icebergConfiguration: {
      snapshotRetentionPeriodInDays: 0,
      numberOfSnapshotsToRetain: 0,
      cleanExpiredFiles: 0,
      runRateInHours: 0,
    },
  },
  orphanFileDeletionConfiguration: {
    icebergConfiguration: {
      orphanFileRetentionPeriodInDays: 0,
      location: 0,
      runRateInHours: 0,
    },
  },
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_TargetProcessingProperties: D.LazyStruct = () => ({
  RoleArn: 0,
  KmsArn: 0,
  ConnectionName: 0,
  EventBusArn: 0,
});
const i_TargetTableConfig: D.LazyStruct = () => ({
  UnnestSpec: 0,
  PartitionSpec: D.list({ FieldName: 0, FunctionSpec: 0, ConversionSpec: 0 }),
  TargetTableName: 0,
});
const i_TimestampFilter: D.LazyStruct = () => ({
  RecordedBefore: 0,
  RecordedAfter: 0,
});
const i_TransformFilterCriteria: D.LazyStruct = () => ({
  Name: 0,
  TransformType: 0,
  Status: 0,
  GlueVersion: 0,
  CreatedBefore: 0,
  CreatedAfter: 0,
  LastModifiedBefore: 0,
  LastModifiedAfter: 0,
  Schema: D.list({ Name: 0, DataType: 0 }),
});
const i_TransformParameters: D.LazyStruct = () => ({
  TransformType: 0,
  FindMatchesParameters: {
    PrimaryKeyColumnName: 0,
    PrecisionRecallTradeoff: 0,
    AccuracyCostTradeoff: 0,
    EnforceProvidedLabels: 0,
  },
});
const i_TransformSortCriteria: D.LazyStruct = () => ({
  Column: 0,
  SortDirection: 0,
});
const i_UserDefinedFunctionInput: D.LazyStruct = () => ({
  FunctionName: 0,
  ClassName: 0,
  OwnerName: 0,
  FunctionType: 0,
  OwnerType: 0,
  ResourceUris: D.list({ ResourceType: 0, Uri: 0 }),
});
const o_Blueprint: D.LazyStruct = () => ({
  CreatedOn: D.ts,
  LastModifiedOn: D.ts,
  LastActiveDefinition: { LastModifiedOn: D.ts },
});
const o_BlueprintRun: D.LazyStruct = () => ({
  StartedOn: D.ts,
  CompletedOn: D.ts,
});
const o_Catalog: D.LazyStruct = () => ({
  CreateTime: D.ts,
  UpdateTime: D.ts,
  CatalogProperties: {
    IcebergOptimizationProperties: { LastUpdatedTime: D.ts },
  },
});
const o_Classifier: D.LazyStruct = () => ({
  GrokClassifier: { CreationTime: D.ts, LastUpdated: D.ts },
  XMLClassifier: { CreationTime: D.ts, LastUpdated: D.ts },
  JsonClassifier: { CreationTime: D.ts, LastUpdated: D.ts },
  CsvClassifier: { CreationTime: D.ts, LastUpdated: D.ts },
});
const o_ColumnStatistics: D.LazyStruct = () => ({
  AnalyzedTime: D.ts,
  StatisticsData: {
    DateColumnStatisticsData: { MinimumValue: D.ts, MaximumValue: D.ts },
    DecimalColumnStatisticsData: {
      MinimumValue: o_DecimalNumber,
      MaximumValue: o_DecimalNumber,
    },
  },
});
const o_ColumnStatisticsError: D.LazyStruct = () => ({
  ColumnStatistics: o_ColumnStatistics,
});
const o_ColumnStatisticsTaskRun: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastUpdated: D.ts,
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_Connection: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastUpdatedTime: D.ts,
  LastConnectionValidationTime: D.ts,
});
const o_Crawler: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastUpdated: D.ts,
  LastCrawl: { StartTime: D.ts },
});
const o_DataQualityAnalyzerResult: D.LazyStruct = () => ({
  Description: D.secret,
  EvaluationMessage: D.secret,
});
const o_DataQualityObservation: D.LazyStruct = () => ({
  Description: D.secret,
});
const o_DataQualityRuleResult: D.LazyStruct = () => ({
  Description: D.secret,
  EvaluationMessage: D.secret,
  EvaluatedRule: D.secret,
});
const o_Database: D.LazyStruct = () => ({ CreateTime: D.ts });
const o_DevEndpoint: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
  LastModifiedTimestamp: D.ts,
});
const o_Job: D.LazyStruct = () => ({
  CreatedOn: D.ts,
  LastModifiedOn: D.ts,
  CodeGenConfigurationNodes: D.map({
    DirectKinesisSource: { StreamingOptions: o_KinesisStreamingSourceOptions },
    DirectKafkaSource: { StreamingOptions: o_KafkaStreamingSourceOptions },
    CatalogKinesisSource: { StreamingOptions: o_KinesisStreamingSourceOptions },
    CatalogKafkaSource: { StreamingOptions: o_KafkaStreamingSourceOptions },
  }),
});
const o_JobRun: D.LazyStruct = () => ({
  StartedOn: D.ts,
  LastModifiedOn: D.ts,
  CompletedOn: D.ts,
});
const o_MaterializedViewRefreshTaskRun: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastUpdated: D.ts,
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_Partition: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastAccessTime: D.ts,
  LastAnalyzedTime: D.ts,
});
const o_SecurityConfiguration: D.LazyStruct = () => ({
  CreatedTimeStamp: D.ts,
});
const o_Session: D.LazyStruct = () => ({ CreatedOn: D.ts, CompletedOn: D.ts });
const o_Table: D.LazyStruct = () => ({
  CreateTime: D.ts,
  UpdateTime: D.ts,
  LastAccessTime: D.ts,
  LastAnalyzedTime: D.ts,
  Status: {
    RequestTime: D.ts,
    UpdateTime: D.ts,
    Details: {
      RequestedChange: o_Table,
      ViewValidations: D.list({ UpdateTime: D.ts }),
    },
  },
});
const o_TableOptimizer: D.LazyStruct = () => ({ lastRun: o_TableOptimizerRun });
const o_TableOptimizerRun: D.LazyStruct = () => ({
  startTimestamp: D.ts,
  endTimestamp: D.ts,
});
const o_TableVersion: D.LazyStruct = () => ({ Table: o_Table });
const o_TimestampedInclusionAnnotation: D.LazyStruct = () => ({
  LastModifiedOn: D.ts,
});
const o_UserDefinedFunction: D.LazyStruct = () => ({ CreateTime: D.ts });
const o_Workflow: D.LazyStruct = () => ({
  CreatedOn: D.ts,
  LastModifiedOn: D.ts,
  LastRun: o_WorkflowRun,
  Graph: o_WorkflowGraph,
});
const o_WorkflowRun: D.LazyStruct = () => ({
  StartedOn: D.ts,
  CompletedOn: D.ts,
  Graph: o_WorkflowGraph,
});
const i_AmazonRedshiftNodeData: D.LazyStruct = () => ({
  AccessType: 0,
  SourceType: 0,
  Connection: i_Option,
  Schema: i_Option,
  Table: i_Option,
  CatalogDatabase: i_Option,
  CatalogTable: i_Option,
  CatalogRedshiftSchema: 0,
  CatalogRedshiftTable: 0,
  TempDir: 0,
  IamRole: i_Option,
  AdvancedOptions: D.list({ Key: 0, Value: 0 }),
  SampleQuery: 0,
  PreAction: 0,
  PostAction: 0,
  Action: 0,
  TablePrefix: 0,
  Upsert: 0,
  MergeAction: 0,
  MergeWhenMatched: 0,
  MergeWhenNotMatched: 0,
  MergeClause: 0,
  CrawlerConnection: 0,
  TableSchema: D.list(i_Option),
  StagingTable: 0,
  SelectedColumns: D.list(i_Option),
});
const i_AutoDataQuality: D.LazyStruct = () => ({
  IsEnabled: 0,
  EvaluationContext: 0,
});
const i_CatalogSchemaChangePolicy: D.LazyStruct = () => ({
  EnableUpdateCatalog: 0,
  UpdateBehavior: 0,
});
const i_Column: D.LazyStruct = () => ({
  Name: 0,
  Type: 0,
  Comment: 0,
  Parameters: 0,
});
const i_ConfigurationObject: D.LazyStruct = () => ({
  DefaultValue: 0,
  AllowedValues: 0,
  MinValue: 0,
  MaxValue: 0,
});
const i_DQResultsPublishingOptions: D.LazyStruct = () => ({
  EvaluationContext: 0,
  ResultsS3Prefix: 0,
  CloudWatchMetricsEnabled: 0,
  ResultsPublishingEnabled: 0,
});
const i_DQStopJobOnFailureOptions: D.LazyStruct = () => ({
  StopJobOnFailureTiming: 0,
});
const i_DecimalNumber: D.LazyStruct = () => ({ UnscaledValue: 0, Scale: 0 });
const i_DirectSchemaChangePolicy: D.LazyStruct = () => ({
  EnableUpdateCatalog: 0,
  UpdateBehavior: 0,
  Table: 0,
  Database: 0,
});
const i_ExtractedParameter: D.LazyStruct = () => ({
  Key: 0,
  DefaultValue: 0,
  PropertyLocation: 0,
  Value: { ContentPath: 0, HeaderKey: 0 },
});
const i_FilterExpression: D.LazyStruct = () => ({
  Operation: 0,
  Negated: 0,
  Values: D.list({ Type: 0, Value: 0 }),
});
const i_GlueSchema: D.LazyStruct = () => ({
  Columns: D.list({ Name: 0, Type: 0, GlueStudioType: 0 }),
});
const i_KafkaStreamingSourceOptions: D.LazyStruct = () => ({
  BootstrapServers: 0,
  SecurityProtocol: 0,
  ConnectionName: 0,
  TopicName: 0,
  Assign: 0,
  SubscribePattern: 0,
  Classification: 0,
  Delimiter: 0,
  StartingOffsets: 0,
  EndingOffsets: 0,
  PollTimeoutMs: 0,
  NumRetries: 0,
  RetryIntervalMs: 0,
  MaxOffsetsPerTrigger: 0,
  MinPartitions: 0,
  IncludeHeaders: 0,
  AddRecordTimestamp: 0,
  EmitConsumerLagMetrics: 0,
  StartingTimestamp: D.tsAs("date-time"),
});
const i_KinesisStreamingSourceOptions: D.LazyStruct = () => ({
  EndpointUrl: 0,
  StreamName: 0,
  Classification: 0,
  Delimiter: 0,
  StartingPosition: 0,
  MaxFetchTimeInMs: 0,
  MaxFetchRecordsPerShard: 0,
  MaxRecordPerRead: 0,
  AddIdleTimeBetweenReads: 0,
  IdleTimeBetweenReadsInMs: 0,
  DescribeShardInterval: 0,
  NumRetries: 0,
  RetryIntervalMs: 0,
  MaxRetryIntervalMs: 0,
  AvoidEmptyBatches: 0,
  StreamArn: 0,
  RoleArn: 0,
  RoleSessionName: 0,
  AddRecordTimestamp: 0,
  EmitConsumerLagMetrics: 0,
  StartingTimestamp: D.tsAs("date-time"),
  FanoutConsumerARN: 0,
});
const i_Mapping: D.LazyStruct = () => ({
  ToKey: 0,
  FromPath: 0,
  FromType: 0,
  ToType: 0,
  Dropped: 0,
  Children: D.list(i_Mapping),
});
const i_PrincipalPermissions: D.LazyStruct = () => ({
  Principal: { DataLakePrincipalIdentifier: 0 },
  Permissions: 0,
});
const i_S3DirectSourceAdditionalOptions: D.LazyStruct = () => ({
  BoundedSize: 0,
  BoundedFiles: 0,
  EnableSamplePath: 0,
  SamplePath: 0,
});
const i_S3SourceAdditionalOptions: D.LazyStruct = () => ({
  BoundedSize: 0,
  BoundedFiles: 0,
});
const i_SnowflakeNodeData: D.LazyStruct = () => ({
  SourceType: 0,
  Connection: i_Option,
  Schema: 0,
  Table: 0,
  Database: 0,
  TempDir: 0,
  IamRole: i_Option,
  AdditionalOptions: 0,
  SampleQuery: 0,
  PreAction: 0,
  PostAction: 0,
  Action: 0,
  Upsert: 0,
  MergeAction: 0,
  MergeWhenMatched: 0,
  MergeWhenNotMatched: 0,
  MergeClause: 0,
  StagingTable: 0,
  SelectedColumns: D.list(i_Option),
  AutoPushdown: 0,
  TableSchema: D.list(i_Option),
});
const i_StorageDescriptor: D.LazyStruct = () => ({
  Columns: D.list(i_Column),
  Location: 0,
  AdditionalLocations: 0,
  InputFormat: 0,
  OutputFormat: 0,
  Compressed: 0,
  NumberOfBuckets: 0,
  SerdeInfo: { Name: 0, SerializationLibrary: 0, Parameters: 0 },
  BucketColumns: 0,
  SortColumns: D.list({ Column: 0, SortOrder: 0 }),
  Parameters: 0,
  SkewedInfo: {
    SkewedColumnNames: 0,
    SkewedColumnValues: 0,
    SkewedColumnValueLocationMaps: 0,
  },
  StoredAsSubDirectories: 0,
  SchemaReference: {
    SchemaId: i_SchemaId,
    SchemaVersionId: 0,
    SchemaVersionNumber: 0,
  },
});
const i_StreamingDataPreviewOptions: D.LazyStruct = () => ({
  PollingTime: 0,
  RecordPollingLimit: 0,
});
const o_DecimalNumber: D.LazyStruct = () => ({ UnscaledValue: D.blob });
const o_KafkaStreamingSourceOptions: D.LazyStruct = () => ({
  StartingTimestamp: D.ts,
});
const o_KinesisStreamingSourceOptions: D.LazyStruct = () => ({
  StartingTimestamp: D.ts,
});
const o_WorkflowGraph: D.LazyStruct = () => ({
  Nodes: D.list({
    JobDetails: { JobRuns: D.list(o_JobRun) },
    CrawlerDetails: { Crawls: D.list({ StartedOn: D.ts, CompletedOn: D.ts }) },
  }),
});
const i_Option: D.LazyStruct = () => ({ Value: 0, Label: 0, Description: 0 });
