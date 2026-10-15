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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Glue", serviceShapeName: "AWSGlue" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "glue" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-03-31");
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
              `https://glue-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://glue-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://glue.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://glue.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://glue.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()("AlreadyExistsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAlreadyExistsError) {}
export class ColumnStatisticsTaskNotRunningException
  extends /*@__PURE__*/ S.TaggedError<ColumnStatisticsTaskNotRunningException>()(
    "ColumnStatisticsTaskNotRunningException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ColumnStatisticsTaskRunningException
  extends /*@__PURE__*/ S.TaggedError<ColumnStatisticsTaskRunningException>()(
    "ColumnStatisticsTaskRunningException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ColumnStatisticsTaskStoppingException
  extends /*@__PURE__*/ S.TaggedError<ColumnStatisticsTaskStoppingException>()(
    "ColumnStatisticsTaskStoppingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ConcurrentRunsExceededException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentRunsExceededException>()(
    "ConcurrentRunsExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ConditionCheckFailureException
  extends /*@__PURE__*/ S.TaggedError<ConditionCheckFailureException>()(
    "ConditionCheckFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class CrawlerNotRunningException
  extends /*@__PURE__*/ S.TaggedError<CrawlerNotRunningException>()("CrawlerNotRunningException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class CrawlerRunningException
  extends /*@__PURE__*/ S.TaggedError<CrawlerRunningException>()("CrawlerRunningException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class CrawlerStoppingException
  extends /*@__PURE__*/ S.TaggedError<CrawlerStoppingException>()("CrawlerStoppingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class EntityNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EntityNotFoundException>()("EntityNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    FromFederationSource: /*@__PURE__*/ S.optional(S.Boolean),
  }) {}
export class FederatedResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<FederatedResourceAlreadyExistsException>()(
    "FederatedResourceAlreadyExistsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      AssociatedGlueResource: /*@__PURE__*/ S.optional(S.String),
    },
  ).pipe(C.withAlreadyExistsError) {}
export class FederationSourceException
  extends /*@__PURE__*/ S.TaggedError<FederationSourceException>()("FederationSourceException", {
    FederationSourceErrorCode: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "FederationSourceErrorCode" }),
    ),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class FederationSourceRetryableException
  extends /*@__PURE__*/ S.TaggedError<FederationSourceRetryableException>()(
    "FederationSourceRetryableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class GlueEncryptionException
  extends /*@__PURE__*/ S.TaggedError<GlueEncryptionException>()("GlueEncryptionException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class GlueRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<GlueRoleNotAssumable>()(
    "GlueRoleNotAssumable",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      FromFederationSource: /*@__PURE__*/ S.optional(S.Boolean),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidInputException",
      message: { includes: "unable to assume" },
    }),
  ).pipe(C.withRetryableError) {}
export class GlueS3TargetNotReady
  extends /*@__PURE__*/ S.TaggedError<GlueS3TargetNotReady>()(
    "GlueS3TargetNotReady",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      FromFederationSource: /*@__PURE__*/ S.optional(S.Boolean),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidInputException",
      message: { includes: "InvalidAccessKeyId" },
    }),
  ).pipe(C.withRetryableError) {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class IllegalBlueprintStateException
  extends /*@__PURE__*/ S.TaggedError<IllegalBlueprintStateException>()(
    "IllegalBlueprintStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class IllegalSessionStateException
  extends /*@__PURE__*/ S.TaggedError<IllegalSessionStateException>()(
    "IllegalSessionStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class IllegalWorkflowStateException
  extends /*@__PURE__*/ S.TaggedError<IllegalWorkflowStateException>()(
    "IllegalWorkflowStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class IntegrationConflictOperationFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationConflictOperationFault>()(
    "IntegrationConflictOperationFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class IntegrationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationNotFoundFault>()(
    "IntegrationNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class IntegrationQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationQuotaExceededFault>()(
    "IntegrationQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()("InternalServiceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()("InvalidInputException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    FromFederationSource: /*@__PURE__*/ S.optional(S.Boolean),
  }) {}
export class InvalidIntegrationStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidIntegrationStateFault>()(
    "InvalidIntegrationStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()("InvalidStateException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class KMSKeyNotAccessibleFault
  extends /*@__PURE__*/ S.TaggedError<KMSKeyNotAccessibleFault>()(
    "KMSKeyNotAccessibleFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MaterializedViewRefreshTaskNotRunningException
  extends /*@__PURE__*/ S.TaggedError<MaterializedViewRefreshTaskNotRunningException>()(
    "MaterializedViewRefreshTaskNotRunningException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaterializedViewRefreshTaskRunningException
  extends /*@__PURE__*/ S.TaggedError<MaterializedViewRefreshTaskRunningException>()(
    "MaterializedViewRefreshTaskRunningException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaterializedViewRefreshTaskStoppingException
  extends /*@__PURE__*/ S.TaggedError<MaterializedViewRefreshTaskStoppingException>()(
    "MaterializedViewRefreshTaskStoppingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MLTransformNotReadyException
  extends /*@__PURE__*/ S.TaggedError<MLTransformNotReadyException>()(
    "MLTransformNotReadyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoScheduleException
  extends /*@__PURE__*/ S.TaggedError<NoScheduleException>()("NoScheduleException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class OperationNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotSupportedException>()(
    "OperationNotSupportedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class OperationTimeoutException
  extends /*@__PURE__*/ S.TaggedError<OperationTimeoutException>()("OperationTimeoutException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PermissionTypeMismatchException
  extends /*@__PURE__*/ S.TaggedError<PermissionTypeMismatchException>()(
    "PermissionTypeMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotReadyException>()("ResourceNotReadyException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNumberLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceNumberLimitExceededException>()(
    "ResourceNumberLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class SchedulerNotRunningException
  extends /*@__PURE__*/ S.TaggedError<SchedulerNotRunningException>()(
    "SchedulerNotRunningException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class SchedulerRunningException
  extends /*@__PURE__*/ S.TaggedError<SchedulerRunningException>()("SchedulerRunningException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class SchedulerTransitioningException
  extends /*@__PURE__*/ S.TaggedError<SchedulerTransitioningException>()(
    "SchedulerTransitioningException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class SessionBusyException
  extends /*@__PURE__*/ S.TaggedError<SessionBusyException>()("SessionBusyException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TargetResourceNotFound
  extends /*@__PURE__*/ S.TaggedError<TargetResourceNotFound>()(
    "TargetResourceNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class VersionMismatchException
  extends /*@__PURE__*/ S.TaggedError<VersionMismatchException>()("VersionMismatchException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
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
export type BlueprintStatus = "CREATING" | "ACTIVE" | "UPDATING" | "FAILED" | (string & {});
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
export type ScheduleState = "SCHEDULED" | "NOT_SCHEDULED" | "TRANSITIONING" | (string & {});
export interface Schedule {
  ScheduleExpression?: string;
  State?: ScheduleState;
}
export type MillisecondsCount = number;
export type LastCrawlStatus = "SUCCEEDED" | "CANCELLED" | "FAILED" | (string & {});
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
  CatalogId?: string;
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
export type DataQualityRuleResultDescription = string | redacted.Redacted<string>;
export type DataQualityRuleResultStatus = "PASS" | "FAIL" | "ERROR" | (string & {});
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
export type EvaluatedDistributionsMap = { [key: string]: DistributionData | undefined };
export interface DataQualityAnalyzerResult {
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  EvaluationMessage?: string | redacted.Redacted<string>;
  EvaluatedMetrics?: { [key: string]: number | undefined };
  EvaluatedDistributions?: { [key: string]: DistributionData | undefined };
}
export type DataQualityAnalyzerResults = DataQualityAnalyzerResult[];
export type DataQualityObservationDescription = string | redacted.Redacted<string>;
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
export type ResultTypeEnum = "ALL" | "PASSED_ONLY" | "FAILED_ONLY" | (string & {});
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
export type DataQualityRulesetEvaluationRunsList = DataQualityRulesetEvaluationRun[];
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
export type Separator = "comma" | "ctrla" | "pipe" | "semicolon" | "tab" | (string & {});
export type QuoteChar = "quote" | "quillemet" | "single_quote" | "disabled" | (string & {});
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
export type UpdateCatalogBehavior = "UPDATE_IN_DATABASE" | "LOG" | (string & {});
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
export type StartingPosition = "latest" | "trim_horizon" | "earliest" | "timestamp" | (string & {});
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
export type DQTransformOutput = "PrimaryInput" | "EvaluationResults" | (string & {});
export interface DQResultsPublishingOptions {
  EvaluationContext?: string;
  ResultsS3Prefix?: string;
  CloudWatchMetricsEnabled?: boolean;
  ResultsPublishingEnabled?: boolean;
}
export type DQStopJobOnFailureTiming = "Immediate" | "AfterDataLoad" | (string & {});
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
export type HudiTargetCompressionType = "gzip" | "lzo" | "uncompressed" | "snappy" | (string & {});
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
export type DeltaTargetCompressionType = "uncompressed" | "snappy" | (string & {});
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
export type CodeGenConfigurationNodes = { [key: string]: CodeGenConfigurationNode | undefined };
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
  CodeGenConfigurationNodes?: { [key: string]: CodeGenConfigurationNode | undefined };
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
export type TriggerType = "SCHEDULED" | "CONDITIONAL" | "ON_DEMAND" | "EVENT" | (string & {});
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
export type BatchStopJobRunSuccessfulSubmissionList = BatchStopJobRunSuccessfulSubmission[];
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
export type BatchUpdatePartitionRequestEntryList = BatchUpdatePartitionRequestEntry[];
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
export type BatchUpdatePartitionFailureList = BatchUpdatePartitionFailureEntry[];
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
export type AllowFullTableExternalDataAccessEnum = "True" | "False" | (string & {});
export type OverwriteChildResourcePermissionsWithDefaultEnum = "Accept" | "Deny" | (string & {});
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
export type CsvSerdeOption = "OpenCSVSerDe" | "LazySimpleSerDe" | "None" | (string & {});
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
export type AuthenticationType = "BASIC" | "OAUTH2" | "CUSTOM" | "IAM" | (string & {});
export type OAuth2GrantType =
  | "AUTHORIZATION_CODE"
  | "CLIENT_CREDENTIALS"
  | "JWT_BEARER"
  | "REFRESH_TOKEN"
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
export type UserManagedClientApplicationClientSecret = string | redacted.Redacted<string>;
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
export type ConnectionStatus = "READY" | "IN_PROGRESS" | "FAILED" | (string & {});
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
  CatalogId?: string;
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
export type IntegrationAdditionalEncryptionContextMap = { [key: string]: string | undefined };
export interface Tag {
  key?: string;
  value?: string;
}
export type IntegrationTagsList = Tag[];
export type IntegrationSourcePropertiesMap = { [key: string]: string | undefined };
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
  IntegrationArn?: string;
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
  CodeGenConfigurationNodes?: { [key: string]: CodeGenConfigurationNode | undefined };
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
export type MLUserDataEncryptionModeString = "DISABLED" | "SSE-KMS" | (string & {});
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
export type SchemaVersionStatus = "AVAILABLE" | "PENDING" | "FAILURE" | "DELETING" | (string & {});
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
export type S3EncryptionMode = "DISABLED" | "SSE-KMS" | "SSE-S3" | (string & {});
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
export interface FederatedTable {
  Identifier?: string;
  DatabaseIdentifier?: string;
  ConnectionName?: string;
  ConnectionType?: string;
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
export type SubObjectSourceType =
  | "HIVE_PARQUET"
  | "HIVE_ORC"
  | "HIVE_CSV"
  | "HIVE_JSON"
  | "PLAIN_PARQUET"
  | "ICEBERG"
  | (string & {});
export interface SubObjectStatistics {
  SourceType?: SubObjectSourceType;
  GlueVersionId?: string;
  PartitionCount?: number;
  FileCount?: number;
  TotalFileBytes?: number;
}
export type SubObjectsStatisticsList = SubObjectStatistics[];
export type SparkPipelineInfoKey = string;
export type SparkPipelineInfoValue = string;
export type SparkPipelineInfoMap = { [key: string]: string | undefined };
export interface ViewDefinitionInput {
  IsProtected?: boolean;
  IsManaged?: boolean;
  Definer?: string;
  Representations?: ViewRepresentationInput[];
  ViewVersionId?: number;
  ViewVersionToken?: string;
  RefreshSeconds?: number;
  LastRefreshType?: LastRefreshType;
  SubObjects?: string[];
  SubObjectVersionIds?: number[];
  SubObjectsStatistics?: SubObjectStatistics[];
  SparkPipelineInfo?: { [key: string]: string | undefined };
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
  FederatedTable?: FederatedTable;
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
export type ConfigurationMap = { [key: string]: ConfigurationObject | undefined };
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
  CatalogID?: string;
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
export type PropertyLocation = "HEADER" | "BODY" | "QUERY_PARAM" | "PATH" | (string & {});
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
export type EntityConfigurationMap = { [key: string]: EntityConfiguration | undefined };
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
  ComputeEnvironmentConfigurations?: { [key: string]: ComputeEnvironmentConfiguration | undefined };
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
export type AssetTypeFormsMap = { [key: string]: AssetTypeFormReference | undefined };
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
export type BlueprintRunState = "RUNNING" | "SUCCEEDED" | "FAILED" | "ROLLING_BACK" | (string & {});
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
  CatalogID?: string;
}
export type ColumnStatisticsTaskRunsList = ColumnStatisticsTaskRun[];
export interface GetColumnStatisticsTaskRunsResponse {
  ColumnStatisticsTaskRuns?: ColumnStatisticsTaskRun[];
  NextToken?: string;
}
export interface GetColumnStatisticsTaskSettingsRequest {
  DatabaseName: string;
  TableName: string;
  CatalogID?: string;
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
export type DataQualityModelStatus = "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
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
export type RecommendationMode = "BASIC" | "ADVANCED" | (string & {});
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
  RecommendationMode?: RecommendationMode;
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
export type MaterializedViewRefreshType = "FULL" | "INCREMENTAL" | (string & {});
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
export type TaskRunSortColumnType = "TASK_RUN_TYPE" | "STATUS" | "STARTED" | (string & {});
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
export type TransformStatusType = "NOT_READY" | "READY" | "DELETING" | (string & {});
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
export type PartitionIndexStatus = "CREATING" | "ACTIVE" | "DELETING" | "FAILED" | (string & {});
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
  IsManaged?: boolean;
  Definer?: string;
  ViewVersionId?: number;
  ViewVersionToken?: string;
  RefreshSeconds?: number;
  LastRefreshType?: LastRefreshType;
  SubObjects?: string[];
  SubObjectVersionIds?: number[];
  SubObjectsStatistics?: SubObjectStatistics[];
  Representations?: ViewRepresentation[];
  SparkPipelineInfo?: { [key: string]: string | undefined };
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
export type TableResourceShareType = "FEDERATED" | "ALL" | (string & {});
export interface GetTablesRequest {
  CatalogId?: string;
  DatabaseName: string;
  Expression?: string;
  NextToken?: string;
  MaxResults?: number;
  TransactionId?: string;
  QueryAsOfTime?: Date;
  AuditContext?: AuditContext;
  ResourceShareType?: TableResourceShareType;
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
export type FilterOperator = "GT" | "GE" | "LT" | "LE" | "EQ" | "NE" | (string & {});
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
export type CrawlerHistoryState = "RUNNING" | "COMPLETED" | "FAILED" | "STOPPED" | (string & {});
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
  RecommendationMode?: RecommendationMode;
}
export type DataQualityRuleRecommendationRunList = DataQualityRuleRecommendationRunDescription[];
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
export type DataQualityRulesetEvaluationRunList = DataQualityRulesetEvaluationRunDescription[];
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
export type StatisticEvaluationLevel = "Dataset" | "Column" | "Multicolumn" | (string & {});
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
export type String4096 = string;
export type IntegrationResourcePropertyFilterValues = string[];
export interface IntegrationResourcePropertyFilter {
  Name?: string;
  Values?: string[];
}
export type IntegrationResourcePropertyFilterList = IntegrationResourcePropertyFilter[];
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
export type IntegrationTablePropertiesFilterValues = string[];
export interface IntegrationTablePropertiesFilter {
  Name?: string;
  Values?: string[];
}
export type IntegrationTablePropertiesFilterList = IntegrationTablePropertiesFilter[];
export interface ListIntegrationTablePropertiesRequest {
  Marker?: string;
  Filters?: IntegrationTablePropertiesFilter[];
  MaxRecords?: number;
}
export interface IntegrationTableProperties {
  ResourceArn: string;
  TableName: string;
  SourceTableConfig?: SourceTableConfig;
  TargetTableConfig?: TargetTableConfig;
}
export type IntegrationTablePropertiesList = IntegrationTableProperties[];
export interface ListIntegrationTablePropertiesResponse {
  IntegrationTablePropertiesList?: IntegrationTableProperties[];
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
export type MaterializedViewRefreshTaskRunsList = MaterializedViewRefreshTaskRun[];
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
export type ExistCondition = "MUST_EXIST" | "NOT_EXIST" | "NONE" | (string & {});
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
  CatalogID?: string;
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
  RecommendationMode?: RecommendationMode;
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
  CatalogID?: string;
}
export interface StopColumnStatisticsTaskRunResponse {}
export interface StopColumnStatisticsTaskRunScheduleRequest {
  DatabaseName: string;
  TableName: string;
  CatalogID?: string;
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
  CatalogId?: string;
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
  CodeGenConfigurationNodes?: { [key: string]: CodeGenConfigurationNode | undefined };
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
export type ViewUpdateAction = "ADD" | "REPLACE" | "ADD_OR_REPLACE" | "DROP" | (string & {});
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
  input: __S(9728, __c304, 0) as any as S.Schema<AssociateGlossaryTermsRequest>,
  output: __S(9760, __c305, 0) as any as S.Schema<AssociateGlossaryTermsResponse>,
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
}));

export type BatchCreatePartitionError =
  | AlreadyExistsException
  | ConcurrentModificationException
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
  input: __S(9825, __c307, 1) as any as S.Schema<BatchCreatePartitionRequest>,
  output: __S(9890, __c309, 2) as any as S.Schema<BatchCreatePartitionResponse>,
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
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
}));

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
  input: __S(10048, __c314, 0) as any as S.Schema<BatchDeleteConnectionRequest>,
  output: __S(10050, __c314, 2) as any as S.Schema<BatchDeleteConnectionResponse>,
  errors: [InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteConnection",
}));

export type BatchDeletePartitionError =
  | ConcurrentModificationException
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
  input: __S(10080, __c315, 0) as any as S.Schema<BatchDeletePartitionRequest>,
  output: __S(9890, __c309, 2) as any as S.Schema<BatchDeletePartitionResponse>,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeletePartition",
}));

export type BatchDeleteTableError =
  | ConcurrentModificationException
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
  input: __S(10144, __c317, 0) as any as S.Schema<BatchDeleteTableRequest>,
  output: __S(10147, __c317, 3) as any as S.Schema<BatchDeleteTableResponse>,
  errors: [
    ConcurrentModificationException,
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
}));

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
  input: __S(10176, __c318, 0) as any as S.Schema<BatchDeleteTableVersionRequest>,
  output: __S(10179, __c318, 3) as any as S.Schema<BatchDeleteTableVersionResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteTableVersion",
}));

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
  input: __S(10208, __c319, 0) as any as S.Schema<BatchGetBlueprintsRequest>,
  output: __S(10210, __c319, 2) as any as S.Schema<BatchGetBlueprintsResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetBlueprints",
}));

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
  input: __S(10272, __c321, 0) as any as S.Schema<BatchGetCrawlersRequest>,
  output: __S(10273, __c321, 1) as any as S.Schema<BatchGetCrawlersResponse>,
  errors: [InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCrawlers",
}));

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
  input: __S(10464, __c327, 0) as any as S.Schema<BatchGetCustomEntityTypesRequest>,
  output: __S(10465, __c327, 1) as any as S.Schema<BatchGetCustomEntityTypesResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCustomEntityTypes",
}));

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
  input: __S(10528, __c329, 0) as any as S.Schema<BatchGetDataQualityResultRequest>,
  output: __S(10530, __c329, 2) as any as S.Schema<BatchGetDataQualityResultResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDataQualityResult",
}));

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
  input: __S(10720, __c335, 0) as any as S.Schema<BatchGetDataQualityRulesetEvaluationRunRequest>,
  output: __S(10722, __c335, 2) as any as S.Schema<BatchGetDataQualityRulesetEvaluationRunResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDataQualityRulesetEvaluationRun",
}));

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
  input: __S(10816, __c338, 0) as any as S.Schema<BatchGetDevEndpointsRequest>,
  output: __S(10817, __c338, 1) as any as S.Schema<BatchGetDevEndpointsResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDevEndpoints",
}));

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
  input: __S(10912, __c341, 0) as any as S.Schema<BatchGetIterableFormsRequest>,
  output: __S(10917, __c341, 5) as any as S.Schema<BatchGetIterableFormsResponse>,
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
}));

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
  input: __S(10976, __c343, 0) as any as S.Schema<BatchGetJobsRequest>,
  output: __S(10977, __c343, 1) as any as S.Schema<BatchGetJobsResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetJobs",
}));

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
  input: __S(11296, __c353, 0) as any as S.Schema<BatchGetPartitionRequest>,
  output: __S(11297, __c353, 1) as any as S.Schema<BatchGetPartitionResponse>,
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
}));

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
  input: __S(11458, __c358, 2) as any as S.Schema<BatchGetTableOptimizerRequest>,
  output: __S(11463, __c358, 7) as any as S.Schema<BatchGetTableOptimizerResponse>,
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
}));

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
  input: __S(11584, __c362, 0) as any as S.Schema<BatchGetTriggersRequest>,
  output: __S(11585, __c362, 1) as any as S.Schema<BatchGetTriggersResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTriggers",
}));

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
  input: __S(11712, __c366, 0) as any as S.Schema<BatchGetWorkflowsRequest>,
  output: __S(11714, __c366, 2) as any as S.Schema<BatchGetWorkflowsResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetWorkflows",
}));

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
  input: __S(11906, __c372, 2) as any as S.Schema<BatchPutDataQualityStatisticAnnotationRequest>,
  output: __S(11909, __c372, 5) as any as S.Schema<BatchPutDataQualityStatisticAnnotationResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutDataQualityStatisticAnnotation",
}));

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
  input: __S(11936, __c373, 0) as any as S.Schema<BatchStopJobRunRequest>,
  output: __S(11941, __c373, 5) as any as S.Schema<BatchStopJobRunResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStopJobRun",
}));

export type BatchUpdatePartitionError =
  | ConcurrentModificationException
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
  input: __S(11970, __c374, 2) as any as S.Schema<BatchUpdatePartitionRequest>,
  output: __S(11973, __c374, 5) as any as S.Schema<BatchUpdatePartitionResponse>,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdatePartition",
}));

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
  input: __S(12000, __c375, 0) as any as S.Schema<CancelDataQualityRuleRecommendationRunRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CancelDataQualityRuleRecommendationRunResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDataQualityRuleRecommendationRun",
}));

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
  input: __S(12064, __c377, 0) as any as S.Schema<CancelDataQualityRulesetEvaluationRunRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CancelDataQualityRulesetEvaluationRunResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDataQualityRulesetEvaluationRun",
}));

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
  input: __S(12096, __c378, 0) as any as S.Schema<CancelMLTaskRunRequest>,
  output: __S(12097, __c378, 1) as any as S.Schema<CancelMLTaskRunResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMLTaskRun",
}));

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
  input: __S(12128, __c379, 0) as any as S.Schema<CancelStatementRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CancelStatementResponse>,
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
}));

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
  input: __S(12160, __c380, 0) as any as S.Schema<CheckSchemaVersionValidityInput>,
  output: __S(12161, __c380, 1) as any as S.Schema<CheckSchemaVersionValidityResponse>,
  errors: [AccessDeniedException, InternalServiceException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckSchemaVersionValidity",
}));

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
  input: __S(12192, __c381, 0) as any as S.Schema<CreateBlueprintRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<CreateBlueprintResponse>,
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
}));

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
  input: __S(12256, __c383, 0) as any as S.Schema<CreateCatalogRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CreateCatalogResponse>,
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
}));

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
  input: __S(12387, __c387, 3) as any as S.Schema<CreateClassifierRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CreateClassifierResponse>,
  errors: [AlreadyExistsException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClassifier",
}));

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
  input: __S(12448, __c389, 0) as any as S.Schema<CreateColumnStatisticsTaskSettingsRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CreateColumnStatisticsTaskSettingsResponse>,
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
}));

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
  input: __S(12480, __c390, 0) as any as S.Schema<CreateConnectionRequest>,
  output: __S(12481, __c390, 1) as any as S.Schema<CreateConnectionResponse>,
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
}));

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
  input: __S(12640, __c395, 0) as any as S.Schema<CreateCrawlerRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CreateCrawlerResponse>,
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
}));

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
  input: __S(12672, __c396, 0) as any as S.Schema<CreateCustomEntityTypeRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<CreateCustomEntityTypeResponse>,
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
}));

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
  input: __S(12704, __c397, 0) as any as S.Schema<CreateDatabaseRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CreateDatabaseResponse>,
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
}));

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
  input: __S(12800, __c400, 0) as any as S.Schema<CreateDataQualityRulesetRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<CreateDataQualityRulesetResponse>,
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
}));

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
  input: __S(12864, __c402, 0) as any as S.Schema<CreateDevEndpointRequest>,
  output: __S(12865, __c402, 1) as any as S.Schema<CreateDevEndpointResponse>,
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
}));

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
  input: __S(12896, __c403, 0) as any as S.Schema<CreateGlossaryRequest>,
  output: __S(12928, __c404, 0) as any as S.Schema<CreateGlossaryResponse>,
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
}));

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
  input: __S(12960, __c405, 0) as any as S.Schema<CreateGlossaryTermRequest>,
  output: __S(12992, __c406, 0) as any as S.Schema<CreateGlossaryTermResponse>,
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
}));

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
  input: __S(13024, __c407, 0) as any as S.Schema<CreateGlueIdentityCenterConfigurationRequest>,
  output: __S(13025, __c407, 1) as any as S.Schema<CreateGlueIdentityCenterConfigurationResponse>,
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
}));

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
  input: __S(13056, __c408, 0) as any as S.Schema<CreateIntegrationRequest>,
  output: __S(13152, __c411, 0) as any as S.Schema<CreateIntegrationResponse>,
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
}));

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
  input: __S(13216, __c413, 0) as any as S.Schema<CreateIntegrationResourcePropertyRequest>,
  output: __S(13280, __c415, 0) as any as S.Schema<CreateIntegrationResourcePropertyResponse>,
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
}));

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
  input: __S(13312, __c416, 0) as any as S.Schema<CreateIntegrationTablePropertiesRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CreateIntegrationTablePropertiesResponse>,
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
}));

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
  input: __S(13376, __c418, 0) as any as S.Schema<CreateJobRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<CreateJobResponse>,
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
}));

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
  input: __S(13408, __c419, 0) as any as S.Schema<CreateMLTransformRequest>,
  output: __S(13440, __c420, 0) as any as S.Schema<CreateMLTransformResponse>,
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
}));

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
  input: __S(13536, __c423, 0) as any as S.Schema<CreatePartitionRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CreatePartitionResponse>,
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
}));

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
  input: __S(13568, __c424, 0) as any as S.Schema<CreatePartitionIndexRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CreatePartitionIndexResponse>,
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
}));

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
  input: __S(13632, __c426, 0) as any as S.Schema<CreateRegistryInput>,
  output: __S(13633, __c426, 1) as any as S.Schema<CreateRegistryResponse>,
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
}));

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
  input: __S(13664, __c427, 0) as any as S.Schema<CreateSchemaInput>,
  output: __S(13665, __c427, 1) as any as S.Schema<CreateSchemaResponse>,
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
}));

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
  input: __S(13728, __c429, 0) as any as S.Schema<CreateScriptRequest>,
  output: __S(13824, __c432, 0) as any as S.Schema<CreateScriptResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScript",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateSecurityConfigurationRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateSecurityConfigurationResponse>,
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
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<CreateSessionRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<CreateSessionResponse>,
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
}));

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
  input: __S(164, __c5, 4) as any as S.Schema<CreateTableRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CreateTableResponse>,
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
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<CreateTableOptimizerRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CreateTableOptimizerResponse>,
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
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<CreateTriggerRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<CreateTriggerResponse>,
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
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<CreateUsageProfileRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<CreateUsageProfileResponse>,
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
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<CreateUserDefinedFunctionRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<CreateUserDefinedFunctionResponse>,
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
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<CreateWorkflowRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<CreateWorkflowResponse>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DeleteAssetRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteAssetResponse>,
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
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<DeleteAssetTypeRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteAssetTypeResponse>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<DeleteAttachmentRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<DeleteAttachmentResponse>,
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
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<DeleteBlueprintRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<DeleteBlueprintResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBlueprint",
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<DeleteCatalogRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteCatalogResponse>,
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
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<DeleteClassifierRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteClassifierResponse>,
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClassifier",
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<DeleteColumnStatisticsForPartitionRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteColumnStatisticsForPartitionResponse>,
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
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<DeleteColumnStatisticsForTableRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteColumnStatisticsForTableResponse>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<DeleteColumnStatisticsTaskSettingsRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteColumnStatisticsTaskSettingsResponse>,
  errors: [EntityNotFoundException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteColumnStatisticsTaskSettings",
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<DeleteConnectionRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteConnectionResponse>,
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<DeleteConnectionTypeRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteConnectionTypeResponse>,
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
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<DeleteCrawlerRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteCrawlerResponse>,
  errors: [
    CrawlerRunningException,
    EntityNotFoundException,
    OperationTimeoutException,
    SchedulerTransitioningException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCrawler",
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<DeleteCustomEntityTypeRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<DeleteCustomEntityTypeResponse>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<DeleteDatabaseRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteDatabaseResponse>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<DeleteDataQualityRulesetRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteDataQualityRulesetResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataQualityRuleset",
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<DeleteDevEndpointRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteDevEndpointResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevEndpoint",
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<DeleteFormTypeRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteFormTypeResponse>,
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
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<DeleteGlossaryRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteGlossaryResponse>,
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
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<DeleteGlossaryTermRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteGlossaryTermResponse>,
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
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<DeleteGlueIdentityCenterConfigurationRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteGlueIdentityCenterConfigurationResponse>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<DeleteIntegrationRequest>,
  output: __S(1153, __c36, 1) as any as S.Schema<DeleteIntegrationResponse>,
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
}));

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
  input: __S(1184, __c37, 0) as any as S.Schema<DeleteIntegrationResourcePropertyRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteIntegrationResourcePropertyResponse>,
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
}));

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
  input: __S(1216, __c38, 0) as any as S.Schema<DeleteIntegrationTablePropertiesRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteIntegrationTablePropertiesResponse>,
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
}));

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
  input: __S(1248, __c39, 0) as any as S.Schema<DeleteJobRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<DeleteJobResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<DeleteMLTransformRequest>,
  output: __S(13440, __c420, 0) as any as S.Schema<DeleteMLTransformResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLTransform",
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<DeletePartitionRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeletePartitionResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePartition",
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<DeletePartitionIndexRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeletePartitionIndexResponse>,
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
}));

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
  input: __S(1408, __c44, 0) as any as S.Schema<DeleteRegistryInput>,
  output: __S(1409, __c44, 1) as any as S.Schema<DeleteRegistryResponse>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegistry",
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
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
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<DeleteSchemaInput>,
  output: __S(1473, __c46, 1) as any as S.Schema<DeleteSchemaResponse>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchema",
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<DeleteSchemaVersionsInput>,
  output: __S(1507, __c47, 3) as any as S.Schema<DeleteSchemaVersionsResponse>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchemaVersions",
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<DeleteSecurityConfigurationRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteSecurityConfigurationResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityConfiguration",
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<DeleteSessionRequest>,
  output: __S(1600, __c50, 0) as any as S.Schema<DeleteSessionResponse>,
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
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<DeleteTableRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteTableResponse>,
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
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<DeleteTableOptimizerRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteTableOptimizerResponse>,
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
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<DeleteTableVersionRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteTableVersionResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTableVersion",
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<DeleteTriggerRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<DeleteTriggerResponse>,
  errors: [
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrigger",
}));

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
  input: __S(1760, __c55, 0) as any as S.Schema<DeleteUsageProfileRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteUsageProfileResponse>,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageProfile",
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<DeleteUserDefinedFunctionRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<DeleteUserDefinedFunctionResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserDefinedFunction",
}));

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
  input: __S(1824, __c57, 0) as any as S.Schema<DeleteWorkflowRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<DeleteWorkflowResponse>,
  errors: [
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflow",
}));

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
  input: __S(1856, __c58, 0) as any as S.Schema<DescribeConnectionTypeRequest>,
  output: __S(1864, __c58, 8) as any as S.Schema<DescribeConnectionTypeResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionType",
}));

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
  input: __S(1952, __c61, 0) as any as S.Schema<DescribeEntityRequest>,
  output: __S(1955, __c61, 3) as any as S.Schema<DescribeEntityResponse>,
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
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Fields" } as const,
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
  input: __S(1984, __c62, 0) as any as S.Schema<DescribeInboundIntegrationsRequest>,
  output: __S(1987, __c62, 3) as any as S.Schema<DescribeInboundIntegrationsResponse>,
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
}));

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
  input: __S(2016, __c63, 0) as any as S.Schema<DescribeIntegrationsRequest>,
  output: __S(2019, __c63, 3) as any as S.Schema<DescribeIntegrationsResponse>,
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
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<DisassociateGlossaryTermsRequest>,
  output: __S(9760, __c305, 0) as any as S.Schema<DisassociateGlossaryTermsResponse>,
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
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<GetAssetInput>,
  output: __S(2115, __c66, 3) as any as S.Schema<GetAssetOutput>,
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
}));

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
  input: __S(2144, __c67, 0) as any as S.Schema<GetAssetTypeRequest>,
  output: __S(2178, __c68, 2) as any as S.Schema<GetAssetTypeResponse>,
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
}));

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
  input: __S(2208, __c69, 0) as any as S.Schema<GetBlueprintRequest>,
  output: __S(2209, __c69, 1) as any as S.Schema<GetBlueprintResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprint",
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<GetBlueprintRunRequest>,
  output: __S(2241, __c70, 1) as any as S.Schema<GetBlueprintRunResponse>,
  errors: [EntityNotFoundException, InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprintRun",
}));

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
  input: __S(2304, __c72, 0) as any as S.Schema<GetBlueprintRunsRequest>,
  output: __S(2306, __c72, 2) as any as S.Schema<GetBlueprintRunsResponse>,
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
  input: __S(2336, __c73, 0) as any as S.Schema<GetCatalogRequest>,
  output: __S(2337, __c73, 1) as any as S.Schema<GetCatalogResponse>,
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
}));

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
  input: __S(2400, __c75, 0) as any as S.Schema<GetCatalogImportStatusRequest>,
  output: __S(2402, __c75, 2) as any as S.Schema<GetCatalogImportStatusResponse>,
  errors: [InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCatalogImportStatus",
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<GetCatalogsRequest>,
  output: __S(2434, __c76, 2) as any as S.Schema<GetCatalogsResponse>,
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
}));

export type GetClassifierError = EntityNotFoundException | OperationTimeoutException | CommonErrors;
/**
 * Retrieve a classifier by name.
 */
export const getClassifier: API.OperationMethod<
  GetClassifierRequest,
  GetClassifierResponse,
  GetClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<GetClassifierRequest>,
  output: __S(2465, __c77, 1) as any as S.Schema<GetClassifierResponse>,
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClassifier",
}));

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
  input: __S(2528, __c79, 0) as any as S.Schema<GetClassifiersRequest>,
  output: __S(2530, __c79, 2) as any as S.Schema<GetClassifiersResponse>,
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
  input: __S(2560, __c80, 0) as any as S.Schema<GetColumnStatisticsForPartitionRequest>,
  output: __S(2594, __c81, 2) as any as S.Schema<GetColumnStatisticsForPartitionResponse>,
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
}));

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
  input: __S(2656, __c83, 0) as any as S.Schema<GetColumnStatisticsForTableRequest>,
  output: __S(2594, __c81, 2) as any as S.Schema<GetColumnStatisticsForTableResponse>,
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
}));

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
  input: __S(2688, __c84, 0) as any as S.Schema<GetColumnStatisticsTaskRunRequest>,
  output: __S(2689, __c84, 1) as any as S.Schema<GetColumnStatisticsTaskRunResponse>,
  errors: [EntityNotFoundException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsTaskRun",
}));

export type GetColumnStatisticsTaskRunsError = OperationTimeoutException | CommonErrors;
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
  input: __S(2752, __c86, 0) as any as S.Schema<GetColumnStatisticsTaskRunsRequest>,
  output: __S(2754, __c86, 2) as any as S.Schema<GetColumnStatisticsTaskRunsResponse>,
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
  input: __S(2784, __c87, 0) as any as S.Schema<GetColumnStatisticsTaskSettingsRequest>,
  output: __S(2787, __c87, 3) as any as S.Schema<GetColumnStatisticsTaskSettingsResponse>,
  errors: [EntityNotFoundException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsTaskSettings",
}));

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
  input: __S(2816, __c88, 0) as any as S.Schema<GetConnectionRequest>,
  output: __S(2817, __c88, 1) as any as S.Schema<GetConnectionResponse>,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

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
  input: __S(2881, __c90, 1) as any as S.Schema<GetConnectionsRequest>,
  output: __S(2883, __c90, 3) as any as S.Schema<GetConnectionsResponse>,
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

export type GetCrawlerError = EntityNotFoundException | OperationTimeoutException | CommonErrors;
/**
 * Retrieves metadata for a specified crawler.
 */
export const getCrawler: API.OperationMethod<
  GetCrawlerRequest,
  GetCrawlerResponse,
  GetCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<GetCrawlerRequest>,
  output: __S(2913, __c91, 1) as any as S.Schema<GetCrawlerResponse>,
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCrawler",
}));

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
  input: __S(2944, __c92, 0) as any as S.Schema<GetCrawlerMetricsRequest>,
  output: __S(2947, __c92, 3) as any as S.Schema<GetCrawlerMetricsResponse>,
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
  input: __S(2976, __c93, 0) as any as S.Schema<GetCrawlersRequest>,
  output: __S(2977, __c93, 1) as any as S.Schema<GetCrawlersResponse>,
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
  input: __S(3008, __c94, 0) as any as S.Schema<GetCustomEntityTypeRequest>,
  output: __S(3009, __c94, 1) as any as S.Schema<GetCustomEntityTypeResponse>,
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
}));

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
  input: __S(3040, __c95, 0) as any as S.Schema<GetDashboardUrlRequest>,
  output: __S(3041, __c95, 1) as any as S.Schema<GetDashboardUrlResponse>,
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
}));

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
  input: __S(3072, __c96, 0) as any as S.Schema<GetDatabaseRequest>,
  output: __S(3073, __c96, 1) as any as S.Schema<GetDatabaseResponse>,
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
}));

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
  input: __S(3136, __c98, 0) as any as S.Schema<GetDatabasesRequest>,
  output: __S(3138, __c98, 2) as any as S.Schema<GetDatabasesResponse>,
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
  input: __S(3168, __c99, 0) as any as S.Schema<GetDataCatalogEncryptionSettingsRequest>,
  output: __S(3169, __c99, 1) as any as S.Schema<GetDataCatalogEncryptionSettingsResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataCatalogEncryptionSettings",
}));

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
  input: __S(3232, __c101, 0) as any as S.Schema<GetDataCatalogExportConfigurationInput>,
  output: __S(3233, __c101, 1) as any as S.Schema<GetDataCatalogExportConfigurationOutput>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataCatalogExportConfiguration",
}));

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
  input: __S(3296, __c103, 0) as any as S.Schema<GetDataflowGraphRequest>,
  output: __S(3297, __c103, 1) as any as S.Schema<GetDataflowGraphResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataflowGraph",
}));

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
  input: __S(3328, __c104, 0) as any as S.Schema<GetDataQualityModelRequest>,
  output: __S(3329, __c104, 1) as any as S.Schema<GetDataQualityModelResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityModel",
}));

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
  input: __S(3360, __c105, 0) as any as S.Schema<GetDataQualityModelResultRequest>,
  output: __S(3363, __c105, 3) as any as S.Schema<GetDataQualityModelResultResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityModelResult",
}));

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
  input: __S(3392, __c106, 0) as any as S.Schema<GetDataQualityResultRequest>,
  output: __S(10603, __c331, 11) as any as S.Schema<GetDataQualityResultResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityResult",
}));

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
  input: __S(3424, __c107, 0) as any as S.Schema<GetDataQualityRuleRecommendationRunRequest>,
  output: __S(3425, __c107, 1) as any as S.Schema<GetDataQualityRuleRecommendationRunResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityRuleRecommendationRun",
}));

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
  input: __S(3488, __c109, 0) as any as S.Schema<GetDataQualityRulesetRequest>,
  output: __S(3489, __c109, 1) as any as S.Schema<GetDataQualityRulesetResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityRuleset",
}));

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
  input: __S(3520, __c110, 0) as any as S.Schema<GetDataQualityRulesetEvaluationRunRequest>,
  output: __S(10752, __c336, 0) as any as S.Schema<GetDataQualityRulesetEvaluationRunResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityRulesetEvaluationRun",
}));

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
  input: __S(3552, __c111, 0) as any as S.Schema<GetDevEndpointRequest>,
  output: __S(3553, __c111, 1) as any as S.Schema<GetDevEndpointResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevEndpoint",
}));

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
  input: __S(3584, __c112, 0) as any as S.Schema<GetDevEndpointsRequest>,
  output: __S(3585, __c112, 1) as any as S.Schema<GetDevEndpointsResponse>,
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
  input: __S(3616, __c113, 0) as any as S.Schema<GetEntityRecordsRequest>,
  output: __S(3618, __c113, 2) as any as S.Schema<GetEntityRecordsResponse>,
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
}));

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
  input: __S(3648, __c114, 0) as any as S.Schema<GetFormTypeRequest>,
  output: __S(3680, __c115, 0) as any as S.Schema<GetFormTypeResponse>,
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
}));

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
  input: __S(3712, __c116, 0) as any as S.Schema<GetGlossaryRequest>,
  output: __S(12928, __c404, 0) as any as S.Schema<GetGlossaryResponse>,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlossary",
}));

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
  input: __S(3744, __c117, 0) as any as S.Schema<GetGlossaryTermRequest>,
  output: __S(12992, __c406, 0) as any as S.Schema<GetGlossaryTermResponse>,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlossaryTerm",
}));

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
  input: __S(3776, __c118, 0) as any as S.Schema<GetGlueIdentityCenterConfigurationRequest>,
  output: __S(3777, __c118, 1) as any as S.Schema<GetGlueIdentityCenterConfigurationResponse>,
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
}));

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
  input: __S(3808, __c119, 0) as any as S.Schema<GetIntegrationResourcePropertyRequest>,
  output: __S(3840, __c120, 0) as any as S.Schema<GetIntegrationResourcePropertyResponse>,
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
}));

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
  input: __S(3872, __c121, 0) as any as S.Schema<GetIntegrationTablePropertiesRequest>,
  output: __S(3873, __c121, 1) as any as S.Schema<GetIntegrationTablePropertiesResponse>,
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
}));

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
  input: __S(3904, __c122, 0) as any as S.Schema<GetJobRequest>,
  output: __S(3905, __c122, 1) as any as S.Schema<GetJobResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
}));

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
  input: __S(3936, __c123, 0) as any as S.Schema<GetJobBookmarkRequest>,
  output: __S(3969, __c124, 1) as any as S.Schema<GetJobBookmarkResponse>,
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
}));

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
  input: __S(4000, __c125, 0) as any as S.Schema<GetJobRunRequest>,
  output: __S(4001, __c125, 1) as any as S.Schema<GetJobRunResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobRun",
}));

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
  input: __S(4032, __c126, 0) as any as S.Schema<GetJobRunsRequest>,
  output: __S(4033, __c126, 1) as any as S.Schema<GetJobRunsResponse>,
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
  input: __S(4064, __c127, 0) as any as S.Schema<GetJobsRequest>,
  output: __S(4065, __c127, 1) as any as S.Schema<GetJobsResponse>,
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
  input: __S(4096, __c128, 0) as any as S.Schema<GetMappingRequest>,
  output: __S(4097, __c128, 1) as any as S.Schema<GetMappingResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMapping",
}));

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
  input: __S(4160, __c130, 0) as any as S.Schema<GetMaterializedViewRefreshTaskRunRequest>,
  output: __S(4161, __c130, 1) as any as S.Schema<GetMaterializedViewRefreshTaskRunResponse>,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaterializedViewRefreshTaskRun",
}));

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
  input: __S(4224, __c132, 0) as any as S.Schema<GetMLTaskRunRequest>,
  output: __S(4260, __c133, 4) as any as S.Schema<GetMLTaskRunResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLTaskRun",
}));

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
  input: __S(4289, __c134, 1) as any as S.Schema<GetMLTaskRunsRequest>,
  output: __S(4291, __c134, 3) as any as S.Schema<GetMLTaskRunsResponse>,
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
  input: __S(4352, __c136, 0) as any as S.Schema<GetMLTransformRequest>,
  output: __S(4389, __c137, 5) as any as S.Schema<GetMLTransformResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLTransform",
}));

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
  input: __S(4448, __c139, 0) as any as S.Schema<GetMLTransformsRequest>,
  output: __S(4450, __c139, 2) as any as S.Schema<GetMLTransformsResponse>,
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
  input: __S(4512, __c141, 0) as any as S.Schema<GetPartitionRequest>,
  output: __S(4513, __c141, 1) as any as S.Schema<GetPartitionResponse>,
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
}));

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
  input: __S(4544, __c142, 0) as any as S.Schema<GetPartitionIndexesRequest>,
  output: __S(4551, __c142, 7) as any as S.Schema<GetPartitionIndexesResponse>,
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
  input: __S(4576, __c143, 0) as any as S.Schema<GetPartitionsRequest>,
  output: __S(4577, __c143, 1) as any as S.Schema<GetPartitionsResponse>,
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
  input: __S(4640, __c145, 0) as any as S.Schema<GetPlanRequest>,
  output: __S(13824, __c432, 0) as any as S.Schema<GetPlanResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlan",
}));

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
  input: __S(4672, __c146, 0) as any as S.Schema<GetRegistryInput>,
  output: __S(4704, __c147, 0) as any as S.Schema<GetRegistryResponse>,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistry",
}));

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
  input: __S(4736, __c148, 0) as any as S.Schema<GetResourcePoliciesRequest>,
  output: __S(4738, __c148, 2) as any as S.Schema<GetResourcePoliciesResponse>,
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
  input: __S(4800, __c150, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(4768, __c149, 0) as any as S.Schema<GetResourcePolicyResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

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
  input: __S(4832, __c151, 0) as any as S.Schema<GetSchemaInput>,
  output: __S(4833, __c151, 1) as any as S.Schema<GetSchemaResponse>,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchema",
}));

export type GetSchemaByDefinitionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Retrieves a schema by the `SchemaDefinition`. The schema definition is sent to the Schema Registry, canonicalized, and hashed. If the hash is matched within the scope of the `SchemaName` or ARN (or the default registry, if none is supplied), that schema's metadata is returned. Otherwise, a 404 or NotFound error is returned. Schema versions in `Deleted` statuses will not be included in the results.
 */
export const getSchemaByDefinition: API.OperationMethod<
  GetSchemaByDefinitionInput,
  GetSchemaByDefinitionResponse,
  GetSchemaByDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4864, __c152, 0) as any as S.Schema<GetSchemaByDefinitionInput>,
  output: __S(4865, __c152, 1) as any as S.Schema<GetSchemaByDefinitionResponse>,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaByDefinition",
}));

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
  input: __S(4896, __c153, 0) as any as S.Schema<GetSchemaVersionInput>,
  output: __S(4897, __c153, 1) as any as S.Schema<GetSchemaVersionResponse>,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaVersion",
}));

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
  input: __S(4960, __c155, 0) as any as S.Schema<GetSchemaVersionsDiffInput>,
  output: __S(4961, __c155, 1) as any as S.Schema<GetSchemaVersionsDiffResponse>,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaVersionsDiff",
}));

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
  input: __S(4992, __c156, 0) as any as S.Schema<GetSecurityConfigurationRequest>,
  output: __S(4993, __c156, 1) as any as S.Schema<GetSecurityConfigurationResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityConfiguration",
}));

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
  input: __S(5056, __c158, 0) as any as S.Schema<GetSecurityConfigurationsRequest>,
  output: __S(5058, __c158, 2) as any as S.Schema<GetSecurityConfigurationsResponse>,
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
  input: __S(5088, __c159, 0) as any as S.Schema<GetSessionRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<GetSessionResponse>,
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
}));

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
  input: __S(5120, __c160, 0) as any as S.Schema<GetSessionEndpointRequest>,
  output: __S(5122, __c160, 2) as any as S.Schema<GetSessionEndpointResponse>,
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
}));

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
  input: __S(5152, __c161, 0) as any as S.Schema<GetStatementRequest>,
  output: __S(5153, __c161, 1) as any as S.Schema<GetStatementResponse>,
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
}));

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
  input: __S(5216, __c163, 0) as any as S.Schema<GetTableRequest>,
  output: __S(5217, __c163, 1) as any as S.Schema<GetTableResponse>,
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
}));

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
  input: __S(5280, __c165, 0) as any as S.Schema<GetTableOptimizerRequest>,
  output: __S(5281, __c165, 1) as any as S.Schema<GetTableOptimizerResponse>,
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
}));

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
  input: __S(5312, __c166, 0) as any as S.Schema<GetTablesRequest>,
  output: __S(5313, __c166, 1) as any as S.Schema<GetTablesResponse>,
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
  input: __S(5376, __c168, 0) as any as S.Schema<GetTableVersionRequest>,
  output: __S(5377, __c168, 1) as any as S.Schema<GetTableVersionResponse>,
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
}));

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
  input: __S(5440, __c170, 0) as any as S.Schema<GetTableVersionsRequest>,
  output: __S(5442, __c170, 2) as any as S.Schema<GetTableVersionsResponse>,
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
  input: __S(5472, __c171, 0) as any as S.Schema<GetTagsRequest>,
  output: __S(5473, __c171, 1) as any as S.Schema<GetTagsResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
}));

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
  input: __S(5504, __c172, 0) as any as S.Schema<GetTriggerRequest>,
  output: __S(11808, __c369, 0) as any as S.Schema<GetTriggerResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrigger",
}));

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
  input: __S(5536, __c173, 0) as any as S.Schema<GetTriggersRequest>,
  output: __S(5537, __c173, 1) as any as S.Schema<GetTriggersResponse>,
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
  input: __S(5568, __c174, 0) as any as S.Schema<GetUnfilteredPartitionMetadataRequest>,
  output: __S(5600, __c175, 0) as any as S.Schema<GetUnfilteredPartitionMetadataResponse>,
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
}));

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
  input: __S(5632, __c176, 0) as any as S.Schema<GetUnfilteredPartitionsMetadataRequest>,
  output: __S(5634, __c176, 2) as any as S.Schema<GetUnfilteredPartitionsMetadataResponse>,
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
  input: __S(5665, __c177, 1) as any as S.Schema<GetUnfilteredTableMetadataRequest>,
  output: __S(5668, __c177, 4) as any as S.Schema<GetUnfilteredTableMetadataResponse>,
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
}));

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
  input: __S(5696, __c178, 0) as any as S.Schema<GetUsageProfileRequest>,
  output: __S(5697, __c178, 1) as any as S.Schema<GetUsageProfileResponse>,
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
}));

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
  input: __S(5728, __c179, 0) as any as S.Schema<GetUserDefinedFunctionRequest>,
  output: __S(5729, __c179, 1) as any as S.Schema<GetUserDefinedFunctionResponse>,
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
}));

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
  input: __S(5792, __c181, 0) as any as S.Schema<GetUserDefinedFunctionsRequest>,
  output: __S(5794, __c181, 2) as any as S.Schema<GetUserDefinedFunctionsResponse>,
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
  input: __S(5824, __c182, 0) as any as S.Schema<GetWorkflowRequest>,
  output: __S(5825, __c182, 1) as any as S.Schema<GetWorkflowResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
}));

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
  input: __S(5856, __c183, 0) as any as S.Schema<GetWorkflowRunRequest>,
  output: __S(5857, __c183, 1) as any as S.Schema<GetWorkflowRunResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRun",
}));

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
  input: __S(5888, __c184, 0) as any as S.Schema<GetWorkflowRunPropertiesRequest>,
  output: __S(5889, __c184, 1) as any as S.Schema<GetWorkflowRunPropertiesResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRunProperties",
}));

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
  input: __S(5920, __c185, 0) as any as S.Schema<GetWorkflowRunsRequest>,
  output: __S(5922, __c185, 2) as any as S.Schema<GetWorkflowRunsResponse>,
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
  input: __S(5952, __c186, 0) as any as S.Schema<ImportCatalogToGlueRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<ImportCatalogToGlueResponse>,
  errors: [InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCatalogToGlue",
}));

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
  input: __S(5984, __c187, 0) as any as S.Schema<ListAssetTypesRequest>,
  output: __S(5985, __c187, 1) as any as S.Schema<ListAssetTypesResponse>,
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
  input: __S(6048, __c189, 0) as any as S.Schema<ListBlueprintsRequest>,
  output: __S(6049, __c189, 1) as any as S.Schema<ListBlueprintsResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
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

export type ListColumnStatisticsTaskRunsError = OperationTimeoutException | CommonErrors;
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
  input: __S(6080, __c190, 0) as any as S.Schema<ListColumnStatisticsTaskRunsRequest>,
  output: __S(6081, __c190, 1) as any as S.Schema<ListColumnStatisticsTaskRunsResponse>,
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
  input: __S(6112, __c191, 0) as any as S.Schema<ListConnectionTypesRequest>,
  output: __S(6117, __c191, 5) as any as S.Schema<ListConnectionTypesResponse>,
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
  input: __S(6144, __c192, 0) as any as S.Schema<ListCrawlersRequest>,
  output: __S(6145, __c192, 1) as any as S.Schema<ListCrawlersResponse>,
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
  input: __S(6178, __c193, 2) as any as S.Schema<ListCrawlsRequest>,
  output: __S(6181, __c193, 5) as any as S.Schema<ListCrawlsResponse>,
  errors: [EntityNotFoundException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrawls",
}));

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
  input: __S(6208, __c194, 0) as any as S.Schema<ListCustomEntityTypesRequest>,
  output: __S(6209, __c194, 1) as any as S.Schema<ListCustomEntityTypesResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
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
  input: __S(6241, __c195, 1) as any as S.Schema<ListDataQualityResultsRequest>,
  output: __S(6244, __c195, 4) as any as S.Schema<ListDataQualityResultsResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
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
  input: __S(6273, __c196, 1) as any as S.Schema<ListDataQualityRuleRecommendationRunsRequest>,
  output: __S(6276, __c196, 4) as any as S.Schema<ListDataQualityRuleRecommendationRunsResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
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
  input: __S(6305, __c197, 1) as any as S.Schema<ListDataQualityRulesetEvaluationRunsRequest>,
  output: __S(6308, __c197, 4) as any as S.Schema<ListDataQualityRulesetEvaluationRunsResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
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
  input: __S(6337, __c198, 1) as any as S.Schema<ListDataQualityRulesetsRequest>,
  output: __S(6340, __c198, 4) as any as S.Schema<ListDataQualityRulesetsResponse>,
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
  input: __S(6368, __c199, 0) as any as S.Schema<ListDataQualityStatisticAnnotationsRequest>,
  output: __S(6371, __c199, 3) as any as S.Schema<ListDataQualityStatisticAnnotationsResponse>,
  errors: [InternalServiceException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityStatisticAnnotations",
}));

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
  input: __S(6432, __c201, 0) as any as S.Schema<ListDataQualityStatisticsRequest>,
  output: __S(6436, __c201, 4) as any as S.Schema<ListDataQualityStatisticsResponse>,
  errors: [EntityNotFoundException, InternalServiceException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityStatistics",
}));

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
  input: __S(6464, __c202, 0) as any as S.Schema<ListDevEndpointsRequest>,
  output: __S(6465, __c202, 1) as any as S.Schema<ListDevEndpointsResponse>,
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
  input: __S(6496, __c203, 0) as any as S.Schema<ListEntitiesRequest>,
  output: __S(6499, __c203, 3) as any as S.Schema<ListEntitiesResponse>,
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
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Entities" } as const,
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
  input: __S(6528, __c204, 0) as any as S.Schema<ListFormTypesRequest>,
  output: __S(6529, __c204, 1) as any as S.Schema<ListFormTypesResponse>,
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
  input: __S(6560, __c205, 0) as any as S.Schema<ListGlossariesRequest>,
  output: __S(6562, __c205, 2) as any as S.Schema<ListGlossariesResponse>,
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
  input: __S(6592, __c206, 0) as any as S.Schema<ListGlossaryTermsRequest>,
  output: __S(6595, __c206, 3) as any as S.Schema<ListGlossaryTermsResponse>,
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
  input: __S(6624, __c207, 0) as any as S.Schema<ListIntegrationResourcePropertiesRequest>,
  output: __S(6626, __c207, 2) as any as S.Schema<ListIntegrationResourcePropertiesResponse>,
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
}));

export type ListIntegrationTablePropertiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the integration table properties in your account. This operation supports filtering and pagination.
 */
export const listIntegrationTableProperties: API.OperationMethod<
  ListIntegrationTablePropertiesRequest,
  ListIntegrationTablePropertiesResponse,
  ListIntegrationTablePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6656, __c208, 0) as any as S.Schema<ListIntegrationTablePropertiesRequest>,
  output: __S(6659, __c208, 3) as any as S.Schema<ListIntegrationTablePropertiesResponse>,
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
  operationName: "ListIntegrationTableProperties",
}));

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
  input: __S(6688, __c209, 0) as any as S.Schema<ListIterableFormsRequest>,
  output: __S(6691, __c209, 3) as any as S.Schema<ListIterableFormsResponse>,
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
  input: __S(6720, __c210, 0) as any as S.Schema<ListJobsRequest>,
  output: __S(6721, __c210, 1) as any as S.Schema<ListJobsResponse>,
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
  input: __S(6752, __c211, 0) as any as S.Schema<ListMaterializedViewRefreshTaskRunsRequest>,
  output: __S(6754, __c211, 2) as any as S.Schema<ListMaterializedViewRefreshTaskRunsResponse>,
  errors: [AccessDeniedException, InvalidInputException, OperationTimeoutException],
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
  input: __S(6784, __c212, 0) as any as S.Schema<ListMLTransformsRequest>,
  output: __S(6785, __c212, 1) as any as S.Schema<ListMLTransformsResponse>,
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
  input: __S(6816, __c213, 0) as any as S.Schema<ListRegistriesInput>,
  output: __S(6818, __c213, 2) as any as S.Schema<ListRegistriesResponse>,
  errors: [AccessDeniedException, InternalServiceException, InvalidInputException],
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
  input: __S(6848, __c214, 0) as any as S.Schema<ListSchemasInput>,
  output: __S(6851, __c214, 3) as any as S.Schema<ListSchemasResponse>,
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
  input: __S(6880, __c215, 0) as any as S.Schema<ListSchemaVersionsInput>,
  output: __S(6883, __c215, 3) as any as S.Schema<ListSchemaVersionsResponse>,
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
  input: __S(6912, __c216, 0) as any as S.Schema<ListSessionsRequest>,
  output: __S(6914, __c216, 2) as any as S.Schema<ListSessionsResponse>,
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
  input: __S(6944, __c217, 0) as any as S.Schema<ListStatementsRequest>,
  output: __S(6946, __c217, 2) as any as S.Schema<ListStatementsResponse>,
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
}));

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
  input: __S(6976, __c218, 0) as any as S.Schema<ListTableOptimizerRunsRequest>,
  output: __S(6978, __c218, 2) as any as S.Schema<ListTableOptimizerRunsResponse>,
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
  input: __S(7008, __c219, 0) as any as S.Schema<ListTriggersRequest>,
  output: __S(7009, __c219, 1) as any as S.Schema<ListTriggersResponse>,
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
  input: __S(7040, __c220, 0) as any as S.Schema<ListUsageProfilesRequest>,
  output: __S(7043, __c220, 3) as any as S.Schema<ListUsageProfilesResponse>,
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
  input: __S(7072, __c221, 0) as any as S.Schema<ListWorkflowsRequest>,
  output: __S(7073, __c221, 1) as any as S.Schema<ListWorkflowsResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
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
  input: __S(7104, __c222, 0) as any as S.Schema<ModifyIntegrationRequest>,
  output: __S(13152, __c411, 0) as any as S.Schema<ModifyIntegrationResponse>,
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
}));

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
  input: __S(7136, __c223, 0) as any as S.Schema<PutAssetRequest>,
  output: __S(7137, __c223, 1) as any as S.Schema<PutAssetResponse>,
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
}));

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
  input: __S(7168, __c224, 0) as any as S.Schema<PutAssetTypeRequest>,
  output: __S(2178, __c68, 2) as any as S.Schema<PutAssetTypeResponse>,
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
}));

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
  input: __S(7200, __c225, 0) as any as S.Schema<PutAttachmentRequest>,
  output: __S(7201, __c225, 1) as any as S.Schema<PutAttachmentResponse>,
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
}));

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
  input: __S(7232, __c226, 0) as any as S.Schema<PutDataCatalogEncryptionSettingsRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<PutDataCatalogEncryptionSettingsResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataCatalogEncryptionSettings",
}));

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
  input: __S(7264, __c227, 0) as any as S.Schema<PutDataCatalogExportConfigurationInput>,
  output: __S(7265, __c227, 1) as any as S.Schema<PutDataCatalogExportConfigurationOutput>,
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
}));

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
  input: __S(7296, __c228, 0) as any as S.Schema<PutDataQualityProfileAnnotationRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<PutDataQualityProfileAnnotationResponse>,
  errors: [EntityNotFoundException, InternalServiceException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataQualityProfileAnnotation",
}));

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
  input: __S(7328, __c229, 0) as any as S.Schema<PutFormTypeRequest>,
  output: __S(3680, __c115, 0) as any as S.Schema<PutFormTypeResponse>,
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
}));

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
  input: __S(7360, __c230, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(7361, __c230, 1) as any as S.Schema<PutResourcePolicyResponse>,
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
}));

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
  input: __S(7392, __c231, 0) as any as S.Schema<PutSchemaVersionMetadataInput>,
  output: __S(7456, __c233, 0) as any as S.Schema<PutSchemaVersionMetadataResponse>,
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
}));

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
  input: __S(7488, __c234, 0) as any as S.Schema<PutWorkflowRunPropertiesRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<PutWorkflowRunPropertiesResponse>,
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
}));

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
  input: __S(7521, __c235, 1) as any as S.Schema<QuerySchemaVersionMetadataInput>,
  output: __S(7526, __c235, 6) as any as S.Schema<QuerySchemaVersionMetadataResponse>,
  errors: [AccessDeniedException, EntityNotFoundException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QuerySchemaVersionMetadata",
}));

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
  input: __S(7560, __c236, 8) as any as S.Schema<RegisterConnectionTypeRequest>,
  output: __S(7561, __c236, 9) as any as S.Schema<RegisterConnectionTypeResponse>,
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
}));

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
  input: __S(7584, __c237, 0) as any as S.Schema<RegisterSchemaVersionInput>,
  output: __S(7585, __c237, 1) as any as S.Schema<RegisterSchemaVersionResponse>,
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
}));

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
  input: __S(7616, __c238, 0) as any as S.Schema<RemoveSchemaVersionMetadataInput>,
  output: __S(7456, __c233, 0) as any as S.Schema<RemoveSchemaVersionMetadataResponse>,
  errors: [AccessDeniedException, EntityNotFoundException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveSchemaVersionMetadata",
}));

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
  input: __S(7648, __c239, 0) as any as S.Schema<ResetJobBookmarkRequest>,
  output: __S(3969, __c124, 1) as any as S.Schema<ResetJobBookmarkResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetJobBookmark",
}));

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
  input: __S(7680, __c240, 0) as any as S.Schema<ResumeWorkflowRunRequest>,
  output: __S(7681, __c240, 1) as any as S.Schema<ResumeWorkflowRunResponse>,
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
}));

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
  input: __S(7712, __c241, 0) as any as S.Schema<RunStatementRequest>,
  output: __S(7713, __c241, 1) as any as S.Schema<RunStatementResponse>,
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
}));

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
  input: __S(7751, __c242, 7) as any as S.Schema<SearchAssetsInput>,
  output: __S(7754, __c242, 10) as any as S.Schema<SearchAssetsOutput>,
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
  input: __S(7780, __c243, 4) as any as S.Schema<SearchTablesRequest>,
  output: __S(7781, __c243, 5) as any as S.Schema<SearchTablesResponse>,
  errors: [InternalServiceException, InvalidInputException, OperationTimeoutException],
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
  input: __S(7808, __c244, 0) as any as S.Schema<StartBlueprintRunRequest>,
  output: __S(7840, __c245, 0) as any as S.Schema<StartBlueprintRunResponse>,
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
}));

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
  input: __S(7872, __c246, 0) as any as S.Schema<StartColumnStatisticsTaskRunRequest>,
  output: __S(7873, __c246, 1) as any as S.Schema<StartColumnStatisticsTaskRunResponse>,
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
}));

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
  input: __S(7904, __c247, 0) as any as S.Schema<StartColumnStatisticsTaskRunScheduleRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<StartColumnStatisticsTaskRunScheduleResponse>,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartColumnStatisticsTaskRunSchedule",
}));

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
  input: __S(7936, __c248, 0) as any as S.Schema<StartCrawlerRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<StartCrawlerResponse>,
  errors: [CrawlerRunningException, EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCrawler",
}));

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
  input: __S(7968, __c249, 0) as any as S.Schema<StartCrawlerScheduleRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<StartCrawlerScheduleResponse>,
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
}));

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
  input: __S(8000, __c250, 0) as any as S.Schema<StartDataQualityRuleRecommendationRunRequest>,
  output: __S(7840, __c245, 0) as any as S.Schema<StartDataQualityRuleRecommendationRunResponse>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataQualityRuleRecommendationRun",
}));

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
  input: __S(8032, __c251, 0) as any as S.Schema<StartDataQualityRulesetEvaluationRunRequest>,
  output: __S(7840, __c245, 0) as any as S.Schema<StartDataQualityRulesetEvaluationRunResponse>,
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
}));

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
  input: __S(8064, __c252, 0) as any as S.Schema<StartExportLabelsTaskRunRequest>,
  output: __S(8096, __c253, 0) as any as S.Schema<StartExportLabelsTaskRunResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExportLabelsTaskRun",
}));

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
 * `FindMatches` transform, these questions are of the form, "What is the correct
 * way to group these rows together into groups composed entirely of matching records?" After the
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
  input: __S(8128, __c254, 0) as any as S.Schema<StartImportLabelsTaskRunRequest>,
  output: __S(8096, __c253, 0) as any as S.Schema<StartImportLabelsTaskRunResponse>,
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
}));

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
  input: __S(8160, __c255, 0) as any as S.Schema<StartJobRunRequest>,
  output: __S(8161, __c255, 1) as any as S.Schema<StartJobRunResponse>,
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
}));

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
  input: __S(8192, __c256, 0) as any as S.Schema<StartMaterializedViewRefreshTaskRunRequest>,
  output: __S(8193, __c256, 1) as any as S.Schema<StartMaterializedViewRefreshTaskRunResponse>,
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
}));

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
  input: __S(8224, __c257, 0) as any as S.Schema<StartMLEvaluationTaskRunRequest>,
  output: __S(8096, __c253, 0) as any as S.Schema<StartMLEvaluationTaskRunResponse>,
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
}));

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
 * "What is the correct way to group these rows together into groups composed entirely of
 * matching records?"
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
  input: __S(8256, __c258, 0) as any as S.Schema<StartMLLabelingSetGenerationTaskRunRequest>,
  output: __S(8096, __c253, 0) as any as S.Schema<StartMLLabelingSetGenerationTaskRunResponse>,
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
}));

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
  input: __S(8288, __c259, 0) as any as S.Schema<StartTriggerRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<StartTriggerResponse>,
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
}));

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
  input: __S(8320, __c260, 0) as any as S.Schema<StartWorkflowRunRequest>,
  output: __S(7840, __c245, 0) as any as S.Schema<StartWorkflowRunResponse>,
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
}));

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
  input: __S(8352, __c261, 0) as any as S.Schema<StopColumnStatisticsTaskRunRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<StopColumnStatisticsTaskRunResponse>,
  errors: [
    ColumnStatisticsTaskNotRunningException,
    ColumnStatisticsTaskStoppingException,
    EntityNotFoundException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopColumnStatisticsTaskRun",
}));

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
  input: __S(8384, __c262, 0) as any as S.Schema<StopColumnStatisticsTaskRunScheduleRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<StopColumnStatisticsTaskRunScheduleResponse>,
  errors: [EntityNotFoundException, InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopColumnStatisticsTaskRunSchedule",
}));

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
  input: __S(8416, __c263, 0) as any as S.Schema<StopCrawlerRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<StopCrawlerResponse>,
  errors: [
    CrawlerNotRunningException,
    CrawlerStoppingException,
    EntityNotFoundException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCrawler",
}));

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
  input: __S(8448, __c264, 0) as any as S.Schema<StopCrawlerScheduleRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<StopCrawlerScheduleResponse>,
  errors: [
    EntityNotFoundException,
    OperationTimeoutException,
    SchedulerNotRunningException,
    SchedulerTransitioningException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCrawlerSchedule",
}));

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
  input: __S(8480, __c265, 0) as any as S.Schema<StopMaterializedViewRefreshTaskRunRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<StopMaterializedViewRefreshTaskRunResponse>,
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
}));

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
  input: __S(8512, __c266, 0) as any as S.Schema<StopSessionRequest>,
  output: __S(1600, __c50, 0) as any as S.Schema<StopSessionResponse>,
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
}));

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
  input: __S(8544, __c267, 0) as any as S.Schema<StopTriggerRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<StopTriggerResponse>,
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
}));

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
  input: __S(8576, __c268, 0) as any as S.Schema<StopWorkflowRunRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<StopWorkflowRunResponse>,
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
}));

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
  input: __S(8608, __c269, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(8641, __c270, 1) as any as S.Schema<TestConnectionRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<TestConnectionResponse>,
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
}));

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
  input: __S(8672, __c271, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(8704, __c272, 0) as any as S.Schema<UpdateAssetRequest>,
  output: __S(8705, __c272, 1) as any as S.Schema<UpdateAssetResponse>,
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
}));

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
  input: __S(8736, __c273, 0) as any as S.Schema<UpdateBlueprintRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<UpdateBlueprintResponse>,
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
}));

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
  input: __S(8768, __c274, 0) as any as S.Schema<UpdateCatalogRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateCatalogResponse>,
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
}));

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
  input: __S(8803, __c275, 3) as any as S.Schema<UpdateClassifierRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateClassifierResponse>,
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClassifier",
}));

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
  input: __S(8832, __c276, 0) as any as S.Schema<UpdateColumnStatisticsForPartitionRequest>,
  output: __S(8866, __c277, 2) as any as S.Schema<UpdateColumnStatisticsForPartitionResponse>,
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
}));

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
  input: __S(8896, __c278, 0) as any as S.Schema<UpdateColumnStatisticsForTableRequest>,
  output: __S(8866, __c277, 2) as any as S.Schema<UpdateColumnStatisticsForTableResponse>,
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
}));

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
  input: __S(8928, __c279, 0) as any as S.Schema<UpdateColumnStatisticsTaskSettingsRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateColumnStatisticsTaskSettingsResponse>,
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
}));

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
  input: __S(8960, __c280, 0) as any as S.Schema<UpdateConnectionRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateConnectionResponse>,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
}));

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
  input: __S(8992, __c281, 0) as any as S.Schema<UpdateCrawlerRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateCrawlerResponse>,
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
}));

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
  input: __S(9024, __c282, 0) as any as S.Schema<UpdateCrawlerScheduleRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateCrawlerScheduleResponse>,
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
}));

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
  input: __S(9056, __c283, 0) as any as S.Schema<UpdateDatabaseRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateDatabaseResponse>,
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
}));

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
  input: __S(9088, __c284, 0) as any as S.Schema<UpdateDataQualityRulesetRequest>,
  output: __S(9089, __c284, 1) as any as S.Schema<UpdateDataQualityRulesetResponse>,
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
}));

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
  input: __S(9121, __c285, 1) as any as S.Schema<UpdateDevEndpointRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateDevEndpointResponse>,
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
}));

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
  input: __S(9152, __c286, 0) as any as S.Schema<UpdateGlossaryRequest>,
  output: __S(12928, __c404, 0) as any as S.Schema<UpdateGlossaryResponse>,
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
}));

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
  input: __S(9184, __c287, 0) as any as S.Schema<UpdateGlossaryTermRequest>,
  output: __S(12992, __c406, 0) as any as S.Schema<UpdateGlossaryTermResponse>,
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
}));

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
  input: __S(9216, __c288, 0) as any as S.Schema<UpdateGlueIdentityCenterConfigurationRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateGlueIdentityCenterConfigurationResponse>,
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
}));

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
  input: __S(9248, __c289, 0) as any as S.Schema<UpdateIntegrationResourcePropertyRequest>,
  output: __S(3840, __c120, 0) as any as S.Schema<UpdateIntegrationResourcePropertyResponse>,
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
}));

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
  input: __S(9280, __c290, 0) as any as S.Schema<UpdateIntegrationTablePropertiesRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateIntegrationTablePropertiesResponse>,
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
}));

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
  input: __S(9313, __c291, 1) as any as S.Schema<UpdateJobRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<UpdateJobResponse>,
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
}));

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
  input: __S(9344, __c292, 0) as any as S.Schema<UpdateJobFromSourceControlRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<UpdateJobFromSourceControlResponse>,
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
}));

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
  input: __S(9376, __c293, 0) as any as S.Schema<UpdateMLTransformRequest>,
  output: __S(13440, __c420, 0) as any as S.Schema<UpdateMLTransformResponse>,
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
}));

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
  input: __S(9408, __c294, 0) as any as S.Schema<UpdatePartitionRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdatePartitionResponse>,
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
}));

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
  input: __S(9440, __c295, 0) as any as S.Schema<UpdateRegistryInput>,
  output: __S(13696, __c428, 0) as any as S.Schema<UpdateRegistryResponse>,
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
}));

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
  input: __S(9472, __c296, 0) as any as S.Schema<UpdateSchemaInput>,
  output: __S(9952, __c311, 0) as any as S.Schema<UpdateSchemaResponse>,
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
}));

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
  input: __S(9504, __c297, 0) as any as S.Schema<UpdateSourceControlFromJobRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<UpdateSourceControlFromJobResponse>,
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
}));

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
  input: __S(9542, __c298, 6) as any as S.Schema<UpdateTableRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateTableResponse>,
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
}));

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
  input: __S(9568, __c299, 0) as any as S.Schema<UpdateTableOptimizerRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateTableOptimizerResponse>,
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
}));

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
  input: __S(9601, __c300, 1) as any as S.Schema<UpdateTriggerRequest>,
  output: __S(11808, __c369, 0) as any as S.Schema<UpdateTriggerResponse>,
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
}));

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
  input: __S(9632, __c301, 0) as any as S.Schema<UpdateUsageProfileRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<UpdateUsageProfileResponse>,
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
}));

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
  input: __S(9664, __c302, 0) as any as S.Schema<UpdateUserDefinedFunctionRequest>,
  output: __S(12032, __c376, 0) as any as S.Schema<UpdateUserDefinedFunctionResponse>,
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
}));

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
  input: __S(9696, __c303, 0) as any as S.Schema<UpdateWorkflowRequest>,
  output: __S(12224, __c382, 0) as any as S.Schema<UpdateWorkflowResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, EncryptionConfiguration: __S(37, __c1, 5) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSecurityConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateSecurityConfigurationResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3EncryptionMode: S.optional(S.String), KmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "S3Encryption" });
    case 1:
      return S.Array(__S(32, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CloudWatchEncryptionMode: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudWatchEncryption" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          JobBookmarksEncryptionMode: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobBookmarksEncryption" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          DataQualityEncryptionMode: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataQualityEncryption" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          S3Encryption: S.optional(__S(33, __c1, 1)),
          CloudWatchEncryption: S.optional(__S(34, __c1, 2)),
          JobBookmarksEncryption: S.optional(__S(35, __c1, 3)),
          DataQualityEncryption: S.optional(__S(36, __c1, 4)),
        }),
      ).annotate({ identifier: "EncryptionConfiguration" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Description: S.optional(S.String),
          Role: S.String,
          Command: __S(128, __c4, 0),
          Timeout: S.optional(S.Number),
          IdleTimeout: S.optional(S.Number),
          DefaultArguments: S.optional(__S(9920, __c310, 0)),
          Connections: S.optional(__S(11136, __c348, 0)),
          MaxCapacity: S.optional(S.Number),
          NumberOfWorkers: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          SecurityConfiguration: S.optional(S.String),
          GlueVersion: S.optional(S.String),
          Tags: S.optional(__S(9920, __c310, 0)),
          RequestOrigin: S.optional(S.String),
          SessionType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSessionRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Session: S.optional(__S(129, __c4, 1)) })).annotate({
        identifier: "CreateSessionResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), PythonVersion: S.optional(S.String) }),
      ).annotate({ identifier: "SessionCommand" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          Description: S.optional(S.String),
          Role: S.optional(S.String),
          Command: S.optional(__S(128, __c4, 0)),
          DefaultArguments: S.optional(__S(9920, __c310, 0)),
          Connections: S.optional(__S(11136, __c348, 0)),
          Progress: S.optional(S.Number),
          MaxCapacity: S.optional(S.Number),
          SecurityConfiguration: S.optional(S.String),
          GlueVersion: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExecutionTime: S.optional(S.Number),
          DPUSeconds: S.optional(S.Number),
          IdleTimeout: S.optional(S.Number),
          ProfileName: S.optional(S.String),
          SessionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Session" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(13600, __c425, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Location: S.String,
          Schema: __S(198, __c6, 6),
          PartitionSpec: S.optional(__S(201, __c6, 9)),
          WriteOrder: S.optional(__S(204, __c6, 12)),
          Properties: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "CreateIcebergTableInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MetadataOperation: S.String,
          Version: S.optional(S.String),
          CreateIcebergTableInput: S.optional(__S(161, __c5, 1)),
        }),
      ).annotate({ identifier: "IcebergInput" });
    case 3:
      return S.suspend(() => S.Struct({ IcebergInput: S.optional(__S(162, __c5, 2)) })).annotate({
        identifier: "OpenTableFormatInput",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          Name: S.optional(S.String),
          TableInput: S.optional(__S(227, __c7, 3)),
          PartitionIndexes: S.optional(__S(160, __c5, 0)),
          TransactionId: S.optional(S.String),
          OpenTableFormatInput: S.optional(__S(163, __c5, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTableRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          Name: S.optional(S.String),
          Region: S.optional(S.String),
        }),
      ).annotate({ identifier: "TableIdentifier" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(S.String),
          DatabaseIdentifier: S.optional(S.String),
          ConnectionName: S.optional(S.String),
          ConnectionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "FederatedTable" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.optional(S.String),
          GlueVersionId: S.optional(S.String),
          PartitionCount: S.optional(S.Number),
          FileCount: S.optional(S.Number),
          TotalFileBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SubObjectStatistics" });
    case 3:
      return S.Array(__S(194, __c6, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Id: S.Number,
          Name: S.String,
          Type: S.Any,
          Required: S.Boolean,
          Doc: S.optional(S.String),
          InitialDefault: S.optional(S.Any),
          WriteDefault: S.optional(S.Any),
        }),
      ).annotate({ identifier: "IcebergStructField" });
    case 5:
      return S.Array(__S(196, __c6, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          SchemaId: S.optional(S.Number),
          IdentifierFieldIds: S.optional(__S(10560, __c330, 0)),
          Type: S.optional(S.String),
          Fields: __S(197, __c6, 5),
        }),
      ).annotate({ identifier: "IcebergSchema" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          SourceId: S.Number,
          Transform: S.String,
          Name: S.String,
          FieldId: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IcebergPartitionField" });
    case 8:
      return S.Array(__S(199, __c6, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ Fields: __S(200, __c6, 8), SpecId: S.optional(S.Number) }),
      ).annotate({ identifier: "IcebergPartitionSpec" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          SourceId: S.Number,
          Transform: S.String,
          Direction: S.String,
          NullOrder: S.String,
        }),
      ).annotate({ identifier: "IcebergSortField" });
    case 11:
      return S.Array(__S(202, __c6, 10));
    case 12:
      return S.suspend(() => S.Struct({ OrderId: S.Number, Fields: __S(203, __c6, 11) })).annotate({
        identifier: "IcebergSortOrder",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Dialect: S.optional(S.String),
          DialectVersion: S.optional(S.String),
          ViewOriginalText: S.optional(S.String),
          ValidationConnection: S.optional(S.String),
          ViewExpandedText: S.optional(S.String),
        }),
      ).annotate({ identifier: "ViewRepresentationInput" });
    case 1:
      return S.Array(__S(224, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IsProtected: S.optional(S.Boolean),
          IsManaged: S.optional(S.Boolean),
          Definer: S.optional(S.String),
          Representations: S.optional(__S(225, __c7, 1)),
          ViewVersionId: S.optional(S.Number),
          ViewVersionToken: S.optional(S.String),
          RefreshSeconds: S.optional(S.Number),
          LastRefreshType: S.optional(S.String),
          SubObjects: S.optional(__S(9792, __c306, 0)),
          SubObjectVersionIds: S.optional(__S(10560, __c330, 0)),
          SubObjectsStatistics: S.optional(__S(195, __c6, 3)),
          SparkPipelineInfo: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "ViewDefinitionInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Owner: S.optional(S.String),
          LastAccessTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastAnalyzedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Retention: S.optional(S.Number),
          StorageDescriptor: S.optional(__S(9991, __c312, 7)),
          PartitionKeys: S.optional(__S(9985, __c312, 1)),
          ViewOriginalText: S.optional(S.String),
          ViewExpandedText: S.optional(S.String),
          TableType: S.optional(S.String),
          Parameters: S.optional(__S(9920, __c310, 0)),
          TargetTable: S.optional(__S(192, __c6, 0)),
          FederatedTable: S.optional(__S(193, __c6, 1)),
          ViewDefinition: S.optional(__S(226, __c7, 2)),
        }),
      ).annotate({ identifier: "TableInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.String,
          DatabaseName: S.String,
          TableName: S.String,
          Type: S.String,
          TableOptimizerConfiguration: __S(11495, __c359, 7),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTableOptimizerRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          WorkflowName: S.optional(S.String),
          Type: S.String,
          Schedule: S.optional(S.String),
          Predicate: S.optional(__S(11652, __c364, 4)),
          Actions: __S(11649, __c364, 1),
          Description: S.optional(S.String),
          StartOnCreation: S.optional(S.Boolean),
          Tags: S.optional(__S(9920, __c310, 0)),
          EventBatchingCondition: S.optional(__S(11653, __c364, 5)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTriggerRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Configuration: __S(354, __c11, 2),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUsageProfileRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DefaultValue: S.optional(S.String),
          AllowedValues: S.optional(__S(9792, __c306, 0)),
          MinValue: S.optional(S.String),
          MaxValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigurationObject" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(352, __c11, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SessionConfiguration: S.optional(__S(353, __c11, 1)),
          JobConfiguration: S.optional(__S(353, __c11, 1)),
        }),
      ).annotate({ identifier: "ProfileConfiguration" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          FunctionInput: __S(448, __c14, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserDefinedFunctionRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.optional(S.String), Uri: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceUri" });
    case 1:
      return S.Array(__S(416, __c13, 0));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.optional(S.String),
          ClassName: S.optional(S.String),
          OwnerName: S.optional(S.String),
          FunctionType: S.optional(S.String),
          OwnerType: S.optional(S.String),
          ResourceUris: S.optional(__S(417, __c13, 1)),
        }),
      ).annotate({ identifier: "UserDefinedFunctionInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          DefaultRunProperties: S.optional(__S(9920, __c310, 0)),
          Tags: S.optional(__S(9920, __c310, 0)),
          MaxConcurrentRuns: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateWorkflowRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/assets/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssetRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/asset-types/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssetTypeRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
          IterableFormName: S.optional(S.String).pipe(T.HttpQuery("iterableFormName")),
          ItemIdentifier: S.optional(S.String).pipe(T.HttpQuery("itemIdentifier")),
          AttachmentName: S.String.pipe(T.HttpLabel("AttachmentName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/assets/{AssetIdentifier}/attachments/{AttachmentName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAttachmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssetIdentifier: S.optional(S.String),
          IterableFormName: S.optional(S.String),
          ItemIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteAttachmentResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBlueprintRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CatalogId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCatalogRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteClassifierRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          PartitionValues: __S(9792, __c306, 0),
          ColumnName: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteColumnStatisticsForPartitionRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          ColumnName: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteColumnStatisticsForTableRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          CatalogID: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteColumnStatisticsTaskSettingsRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CatalogId: S.optional(S.String), ConnectionName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConnectionRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectionType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConnectionTypeRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCrawlerRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCustomEntityTypeRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CatalogId: S.optional(S.String), Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDatabaseRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDataQualityRulesetRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EndpointName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDevEndpointRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/form-types/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFormTypeRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/glossaries/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGlossaryRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/glossary-terms/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGlossaryTermRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGlueIdentityCenterConfigurationRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IntegrationIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIntegrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceArn: S.String,
          TargetArn: S.String,
          IntegrationName: S.String,
          Description: S.optional(S.String),
          IntegrationArn: S.String,
          KmsKeyId: S.optional(S.String),
          AdditionalEncryptionContext: S.optional(__S(9920, __c310, 0)),
          Tags: S.optional(__S(13185, __c412, 1)),
          Status: S.String,
          CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Errors: S.optional(__S(13088, __c409, 0)),
          DataFilter: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteIntegrationResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIntegrationResourcePropertyRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TableName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIntegrationTablePropertiesRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteJobRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ JobName: S.optional(S.String) })).annotate({
        identifier: "DeleteJobResponse",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransformId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMLTransformRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          PartitionValues: __S(9792, __c306, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeletePartitionRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          IndexName: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeletePartitionIndexRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistryId: __S(13696, __c428, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRegistryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistryName: S.optional(S.String),
          RegistryArn: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteRegistryResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyHashCondition: S.optional(S.String),
          ResourceArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SchemaId: __S(9952, __c311, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSchemaInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SchemaArn: S.optional(S.String),
          SchemaName: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteSchemaResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SchemaId: __S(9952, __c311, 0), Versions: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSchemaVersionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VersionNumber: S.optional(S.Number),
          ErrorDetails: S.optional(__S(9856, __c308, 0)),
        }),
      ).annotate({ identifier: "SchemaVersionErrorItem" });
    case 2:
      return S.Array(__S(1505, __c47, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ SchemaVersionErrors: S.optional(__S(1506, __c47, 2)) }),
      ).annotate({ identifier: "DeleteSchemaVersionsResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSecurityConfigurationRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, RequestOrigin: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSessionRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Id: S.optional(S.String) })).annotate({
        identifier: "DeleteSessionResponse",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          Name: S.String,
          TransactionId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteTableRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.String,
          DatabaseName: S.String,
          TableName: S.String,
          Type: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteTableOptimizerRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          VersionId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteTableVersionRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTriggerRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUsageProfileRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          FunctionName: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteUserDefinedFunctionRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWorkflowRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectionType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeConnectionTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Description: S.optional(S.String), Value: S.String }),
      ).annotate({ identifier: "AllowedValue" });
    case 2:
      return S.Array(__S(1857, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.String,
          Required: S.Boolean,
          DefaultValue: S.optional(S.String),
          PropertyTypes: __S(10400, __c325, 0),
          AllowedValues: S.optional(__S(1858, __c58, 2)),
          DataOperationScopes: S.optional(__S(10400, __c325, 0)),
          KeyOverride: S.optional(S.String),
          PropertyLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "Property" });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(1859, __c58, 3).pipe(S.optional));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AuthenticationType: __S(1859, __c58, 3),
          SecretArn: S.optional(__S(1859, __c58, 3)),
          OAuth2Properties: S.optional(__S(1860, __c58, 4)),
          BasicAuthenticationProperties: S.optional(__S(1860, __c58, 4)),
          CustomAuthenticationProperties: S.optional(__S(1860, __c58, 4)),
        }),
      ).annotate({ identifier: "AuthConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.String,
          ComputeEnvironment: S.String,
          SupportedAuthenticationTypes: __S(10400, __c325, 0),
          ConnectionOptions: __S(1860, __c58, 4),
          ConnectionPropertyNameOverrides: __S(9920, __c310, 0),
          ConnectionOptionNameOverrides: __S(9920, __c310, 0),
          ConnectionPropertiesRequiredOverrides: __S(9792, __c306, 0),
          PhysicalConnectionPropertiesRequired: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ComputeEnvironmentConfiguration" });
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(1862, __c58, 6).pipe(S.optional));
    case 8:
      return S.suspend(() =>
        S.Struct({
          ConnectionType: S.optional(S.String),
          Description: S.optional(S.String),
          Capabilities: S.optional(__S(1888, __c59, 0)),
          ConnectionProperties: S.optional(__S(1860, __c58, 4)),
          ConnectionOptions: S.optional(__S(1860, __c58, 4)),
          AuthenticationConfiguration: S.optional(__S(1861, __c58, 5)),
          ComputeEnvironmentConfigurations: S.optional(__S(1863, __c58, 7)),
          PhysicalConnectionRequirements: S.optional(__S(1860, __c58, 4)),
          AthenaConnectionProperties: S.optional(__S(1860, __c58, 4)),
          PythonConnectionProperties: S.optional(__S(1860, __c58, 4)),
          SparkConnectionProperties: S.optional(__S(1860, __c58, 4)),
          RestConfiguration: S.optional(__S(1937, __c60, 17)),
        }),
      ).annotate({ identifier: "DescribeConnectionTypeResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SupportedAuthenticationTypes: __S(10400, __c325, 0),
          SupportedDataOperations: __S(10400, __c325, 0),
          SupportedComputeEnvironments: __S(10400, __c325, 0),
        }),
      ).annotate({ identifier: "Capabilities" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          KeyOverride: S.optional(S.String),
          Required: S.Boolean,
          DefaultValue: S.optional(S.String),
          AllowedValues: S.optional(__S(9792, __c306, 0)),
          PropertyLocation: S.optional(S.String),
          PropertyType: S.String,
          Format: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectorProperty" });
    case 1:
      return S.Array(__S(1920, __c60, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ResultPath: S.String, ErrorPath: S.optional(S.String) }),
      ).annotate({ identifier: "ResponseConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ContentPath: S.optional(S.String), HeaderKey: S.optional(S.String) }),
      ).annotate({ identifier: "ResponseExtractionMapping" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          DefaultValue: S.optional(S.String),
          PropertyLocation: S.optional(S.String),
          Value: S.optional(__S(1923, __c60, 3)),
        }),
      ).annotate({ identifier: "ExtractedParameter" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          NextPage: __S(1924, __c60, 4),
          LimitParameter: S.optional(__S(1924, __c60, 4)),
        }),
      ).annotate({ identifier: "CursorConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({ OffsetParameter: __S(1924, __c60, 4), LimitParameter: __S(1924, __c60, 4) }),
      ).annotate({ identifier: "OffsetConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          CursorConfiguration: S.optional(__S(1925, __c60, 5)),
          OffsetConfiguration: S.optional(__S(1926, __c60, 6)),
        }),
      ).annotate({ identifier: "PaginationConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          LowBoundKey: S.optional(S.String),
          HighBoundKey: S.optional(S.String),
          Template: S.optional(S.String),
        }),
      ).annotate({ identifier: "BetweenConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          QueryParameterName: S.String,
          QuoteStringValues: S.optional(S.Boolean),
          QuoteCharacter: S.optional(S.String),
        }),
      ).annotate({ identifier: "FilterStringConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          FilterMode: S.String,
          OperatorMappings: S.optional(__S(9920, __c310, 0)),
          DateTimeFormat: S.optional(S.String),
          StripQuotes: S.optional(S.Boolean),
          BetweenConfiguration: S.optional(__S(1928, __c60, 8)),
          FilterStringConfiguration: S.optional(__S(1929, __c60, 9)),
        }),
      ).annotate({ identifier: "FilterConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          RequestMethod: S.optional(S.String),
          RequestPath: S.optional(S.String),
          RequestParameters: S.optional(__S(1921, __c60, 1)),
          ResponseConfiguration: S.optional(__S(1922, __c60, 2)),
          PaginationConfiguration: S.optional(__S(1927, __c60, 7)),
          FilterConfiguration: S.optional(__S(1930, __c60, 10)),
        }),
      ).annotate({ identifier: "SourceConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          FieldName: S.optional(S.String),
          OperatorMappings: S.optional(__S(9920, __c310, 0)),
          BetweenConfiguration: S.optional(__S(1928, __c60, 8)),
          DateTimeFormat: S.optional(S.String),
        }),
      ).annotate({ identifier: "FilterOverrides" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          FieldDataType: S.String,
          ResponseDateFormat: S.optional(S.String),
          IsPartitionable: S.optional(S.Boolean),
          IsNullable: S.optional(S.Boolean),
          IsQueryable: S.optional(S.Boolean),
          IsOrderable: S.optional(S.Boolean),
          FilterOverrides: S.optional(__S(1932, __c60, 12)),
        }),
      ).annotate({ identifier: "FieldDefinition" });
    case 14:
      return S.Record(S.String, /*@__PURE__*/ __S(1933, __c60, 13).pipe(S.optional));
    case 15:
      return S.suspend(() =>
        S.Struct({
          SourceConfiguration: S.optional(__S(1931, __c60, 11)),
          Schema: S.optional(__S(1934, __c60, 14)),
        }),
      ).annotate({ identifier: "EntityConfiguration" });
    case 16:
      return S.Record(S.String, /*@__PURE__*/ __S(1935, __c60, 15).pipe(S.optional));
    case 17:
      return S.suspend(() =>
        S.Struct({
          GlobalSourceConfiguration: S.optional(__S(1931, __c60, 11)),
          ValidationEndpointConfiguration: S.optional(__S(1931, __c60, 11)),
          EntityConfigurations: S.optional(__S(1936, __c60, 16)),
        }),
      ).annotate({ identifier: "RestConfiguration" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionName: S.String,
          CatalogId: S.optional(S.String),
          EntityName: S.String,
          NextToken: S.optional(S.String),
          DataStoreApiVersion: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEntityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FieldName: S.optional(S.String),
          Label: S.optional(S.String),
          Description: S.optional(S.String),
          FieldType: S.optional(S.String),
          IsPrimaryKey: S.optional(S.Boolean),
          IsNullable: S.optional(S.Boolean),
          IsRetrievable: S.optional(S.Boolean),
          IsFilterable: S.optional(S.Boolean),
          IsPartitionable: S.optional(S.Boolean),
          IsCreateable: S.optional(S.Boolean),
          IsUpdateable: S.optional(S.Boolean),
          IsUpsertable: S.optional(S.Boolean),
          IsDefaultOnCreate: S.optional(S.Boolean),
          SupportedValues: S.optional(__S(9792, __c306, 0)),
          SupportedFilterOperators: S.optional(__S(10400, __c325, 0)),
          ParentField: S.optional(S.String),
          NativeDataType: S.optional(S.String),
          CustomProperties: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "Field" });
    case 2:
      return S.Array(__S(1953, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Fields: S.optional(__S(1954, __c61, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeEntityResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IntegrationArn: S.optional(S.String),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          TargetArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInboundIntegrationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceArn: S.String,
          TargetArn: S.String,
          IntegrationArn: S.String,
          Status: S.String,
          CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          IntegrationConfig: S.optional(__S(13120, __c410, 0)),
          Errors: S.optional(__S(13088, __c409, 0)),
        }),
      ).annotate({ identifier: "InboundIntegration" });
    case 2:
      return S.Array(__S(1985, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          InboundIntegrations: S.optional(__S(1986, __c62, 2)),
          Marker: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeInboundIntegrationsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IntegrationIdentifier: S.optional(S.String),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Filters: S.optional(__S(2049, __c64, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeIntegrationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceArn: S.String,
          TargetArn: S.String,
          Description: S.optional(S.String),
          IntegrationName: S.String,
          IntegrationArn: S.String,
          KmsKeyId: S.optional(S.String),
          AdditionalEncryptionContext: S.optional(__S(9920, __c310, 0)),
          Tags: S.optional(__S(13185, __c412, 1)),
          Status: S.String,
          CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          IntegrationConfig: S.optional(__S(13120, __c410, 0)),
          Errors: S.optional(__S(13088, __c409, 0)),
          DataFilter: S.optional(S.String),
        }),
      ).annotate({ identifier: "Integration" });
    case 2:
      return S.Array(__S(2017, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Integrations: S.optional(__S(2018, __c63, 2)), Marker: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeIntegrationsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(9792, __c306, 0)) }),
      ).annotate({ identifier: "IntegrationFilter" });
    case 1:
      return S.Array(__S(2048, __c64, 0));
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
          IterableFormName: S.optional(S.String),
          ItemIdentifier: S.optional(S.String),
          GlossaryTermIdentifiers: __S(9792, __c306, 0),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/assets/{AssetIdentifier}/disassociate-glossary-terms",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateGlossaryTermsRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assets/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssetInput" });
    case 1:
      return S.suspend(() => S.Struct({ FormTypeId: S.optional(S.String) })).annotate({
        identifier: "IterableFormEntry",
      });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(2113, __c66, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AssetTypeId: S.String,
          GlossaryTerms: S.optional(__S(9792, __c306, 0)),
          Forms: S.optional(__S(10945, __c342, 1)),
          Attachments: S.optional(__S(10945, __c342, 1)),
          IterableForms: S.optional(__S(2114, __c66, 2)),
        }),
      ).annotate({ identifier: "GetAssetOutput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/asset-types/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssetTypeRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ FormTypeIdentifier: S.String })).annotate({
        identifier: "AssetTypeFormReference",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(2176, __c68, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Forms: S.optional(__S(2177, __c68, 1)),
        }),
      ).annotate({ identifier: "GetAssetTypeResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          IncludeBlueprint: S.optional(S.Boolean),
          IncludeParameterSpec: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetBlueprintRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Blueprint: S.optional(__S(10241, __c320, 1)) })).annotate({
        identifier: "GetBlueprintResponse",
      });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BlueprintName: S.String, RunId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBlueprintRunRequest" });
    case 1:
      return S.suspend(() => S.Struct({ BlueprintRun: S.optional(__S(2272, __c71, 0)) })).annotate({
        identifier: "GetBlueprintRunResponse",
      });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlueprintName: S.optional(S.String),
          RunId: S.optional(S.String),
          WorkflowName: S.optional(S.String),
          State: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ErrorMessage: S.optional(S.String),
          RollbackErrorMessage: S.optional(S.String),
          Parameters: S.optional(S.String),
          RoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "BlueprintRun" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlueprintName: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetBlueprintRunsRequest" });
    case 1:
      return S.Array(__S(2272, __c71, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          BlueprintRuns: S.optional(__S(2305, __c72, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetBlueprintRunsResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CatalogId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCatalogRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Catalog: S.optional(__S(2371, __c74, 3)) })).annotate({
        identifier: "GetCatalogResponse",
      });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataLakeAccess: S.optional(S.Boolean),
          DataTransferRole: S.optional(S.String),
          KmsKey: S.optional(S.String),
          ManagedWorkgroupName: S.optional(S.String),
          ManagedWorkgroupStatus: S.optional(S.String),
          RedshiftDatabaseName: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CatalogType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataLakeAccessPropertiesOutput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RoleArn: S.optional(S.String),
          Compaction: S.optional(__S(9920, __c310, 0)),
          Retention: S.optional(__S(9920, __c310, 0)),
          OrphanFileDeletion: S.optional(__S(9920, __c310, 0)),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "IcebergOptimizationPropertiesOutput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DataLakeAccessProperties: S.optional(__S(2368, __c74, 0)),
          IcebergOptimizationProperties: S.optional(__S(2369, __c74, 1)),
          CustomProperties: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "CatalogPropertiesOutput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          Name: S.String,
          ResourceArn: S.optional(S.String),
          Description: S.optional(S.String),
          Parameters: S.optional(__S(9920, __c310, 0)),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TargetRedshiftCatalog: S.optional(__S(12288, __c384, 0)),
          FederatedCatalog: S.optional(__S(12352, __c386, 0)),
          CatalogProperties: S.optional(__S(2370, __c74, 2)),
          CreateTableDefaultPermissions: S.optional(__S(12355, __c386, 3)),
          CreateDatabaseDefaultPermissions: S.optional(__S(12355, __c386, 3)),
          AllowFullTableExternalDataAccess: S.optional(S.String),
        }),
      ).annotate({ identifier: "Catalog" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CatalogId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCatalogImportStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ImportCompleted: S.optional(S.Boolean),
          ImportTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImportedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "CatalogImportStatus" });
    case 2:
      return S.suspend(() => S.Struct({ ImportStatus: S.optional(__S(2401, __c75, 1)) })).annotate({
        identifier: "GetCatalogImportStatusResponse",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParentCatalogId: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Recursive: S.optional(S.Boolean),
          IncludeRoot: S.optional(S.Boolean),
          HasDatabases: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCatalogsRequest" });
    case 1:
      return S.Array(__S(2371, __c74, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ CatalogList: __S(2433, __c76, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetCatalogsResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetClassifierRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Classifier: S.optional(__S(2500, __c78, 4)) })).annotate({
        identifier: "GetClassifierResponse",
      });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Classification: S.String,
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Version: S.optional(S.Number),
          GrokPattern: S.String,
          CustomPatterns: S.optional(S.String),
        }),
      ).annotate({ identifier: "GrokClassifier" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Classification: S.String,
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Version: S.optional(S.Number),
          RowTag: S.optional(S.String),
        }),
      ).annotate({ identifier: "XMLClassifier" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Version: S.optional(S.Number),
          JsonPath: S.String,
        }),
      ).annotate({ identifier: "JsonClassifier" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Version: S.optional(S.Number),
          Delimiter: S.optional(S.String),
          QuoteSymbol: S.optional(S.String),
          ContainsHeader: S.optional(S.String),
          Header: S.optional(__S(9792, __c306, 0)),
          DisableValueTrimming: S.optional(S.Boolean),
          AllowSingleColumn: S.optional(S.Boolean),
          CustomDatatypeConfigured: S.optional(S.Boolean),
          CustomDatatypes: S.optional(__S(9792, __c306, 0)),
          Serde: S.optional(S.String),
        }),
      ).annotate({ identifier: "CsvClassifier" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          GrokClassifier: S.optional(__S(2496, __c78, 0)),
          XMLClassifier: S.optional(__S(2497, __c78, 1)),
          JsonClassifier: S.optional(__S(2498, __c78, 2)),
          CsvClassifier: S.optional(__S(2499, __c78, 3)),
        }),
      ).annotate({ identifier: "Classifier" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetClassifiersRequest" });
    case 1:
      return S.Array(__S(2500, __c78, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({ Classifiers: S.optional(__S(2529, __c79, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetClassifiersResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          PartitionValues: __S(9792, __c306, 0),
          ColumnNames: __S(9792, __c306, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetColumnStatisticsForPartitionRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ColumnName: S.optional(S.String), Error: S.optional(__S(9856, __c308, 0)) }),
      ).annotate({ identifier: "ColumnError" });
    case 1:
      return S.Array(__S(2592, __c81, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ColumnStatisticsList: S.optional(__S(2633, __c82, 9)),
          Errors: S.optional(__S(2593, __c81, 1)),
        }),
      ).annotate({ identifier: "GetColumnStatisticsForPartitionResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NumberOfTrues: S.Number, NumberOfFalses: S.Number, NumberOfNulls: S.Number }),
      ).annotate({ identifier: "BooleanColumnStatisticsData" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MinimumValue: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MaximumValue: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NumberOfNulls: S.Number,
          NumberOfDistinctValues: S.Number,
        }),
      ).annotate({ identifier: "DateColumnStatisticsData" });
    case 2:
      return S.suspend(() => S.Struct({ UnscaledValue: T.Blob, Scale: S.Number })).annotate({
        identifier: "DecimalNumber",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MinimumValue: S.optional(__S(2626, __c82, 2)),
          MaximumValue: S.optional(__S(2626, __c82, 2)),
          NumberOfNulls: S.Number,
          NumberOfDistinctValues: S.Number,
        }),
      ).annotate({ identifier: "DecimalColumnStatisticsData" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          MinimumValue: S.optional(S.Number),
          MaximumValue: S.optional(S.Number),
          NumberOfNulls: S.Number,
          NumberOfDistinctValues: S.Number,
        }),
      ).annotate({ identifier: "DoubleColumnStatisticsData" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          MaximumLength: S.Number,
          AverageLength: S.Number,
          NumberOfNulls: S.Number,
          NumberOfDistinctValues: S.Number,
        }),
      ).annotate({ identifier: "StringColumnStatisticsData" });
    case 6:
      return S.suspend(() =>
        S.Struct({ MaximumLength: S.Number, AverageLength: S.Number, NumberOfNulls: S.Number }),
      ).annotate({ identifier: "BinaryColumnStatisticsData" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          BooleanColumnStatisticsData: S.optional(__S(2624, __c82, 0)),
          DateColumnStatisticsData: S.optional(__S(2625, __c82, 1)),
          DecimalColumnStatisticsData: S.optional(__S(2627, __c82, 3)),
          DoubleColumnStatisticsData: S.optional(__S(2628, __c82, 4)),
          LongColumnStatisticsData: S.optional(__S(2628, __c82, 4)),
          StringColumnStatisticsData: S.optional(__S(2629, __c82, 5)),
          BinaryColumnStatisticsData: S.optional(__S(2630, __c82, 6)),
        }),
      ).annotate({ identifier: "ColumnStatisticsData" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ColumnName: S.String,
          ColumnType: S.String,
          AnalyzedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          StatisticsData: __S(2631, __c82, 7),
        }),
      ).annotate({ identifier: "ColumnStatistics" });
    case 9:
      return S.Array(__S(2632, __c82, 8));
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          ColumnNames: __S(9792, __c306, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetColumnStatisticsForTableRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ColumnStatisticsTaskRunId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetColumnStatisticsTaskRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ColumnStatisticsTaskRun: S.optional(__S(2720, __c85, 0)) }),
      ).annotate({ identifier: "GetColumnStatisticsTaskRunResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CustomerId: S.optional(S.String),
          ColumnStatisticsTaskRunId: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          TableName: S.optional(S.String),
          ColumnNameList: S.optional(__S(9792, __c306, 0)),
          CatalogID: S.optional(S.String),
          Role: S.optional(S.String),
          SampleSize: S.optional(S.Number),
          SecurityConfiguration: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          ComputationType: S.optional(S.String),
          Status: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ErrorMessage: S.optional(S.String),
          DPUSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ColumnStatisticsTaskRun" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          CatalogID: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetColumnStatisticsTaskRunsRequest" });
    case 1:
      return S.Array(__S(2720, __c85, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ColumnStatisticsTaskRuns: S.optional(__S(2753, __c86, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetColumnStatisticsTaskRunsResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          CatalogID: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetColumnStatisticsTaskSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          ColumnStatisticsTaskRunId: S.optional(S.String),
          ExecutionTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExecutionAttempt" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.optional(S.String),
          TableName: S.optional(S.String),
          Schedule: S.optional(__S(10304, __c322, 0)),
          ColumnNameList: S.optional(__S(9792, __c306, 0)),
          CatalogID: S.optional(S.String),
          Role: S.optional(S.String),
          SampleSize: S.optional(S.Number),
          SecurityConfiguration: S.optional(S.String),
          ScheduleType: S.optional(S.String),
          SettingSource: S.optional(S.String),
          LastExecutionAttempt: S.optional(__S(2785, __c87, 1)),
        }),
      ).annotate({ identifier: "ColumnStatisticsTaskSettings" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ColumnStatisticsTaskSettings: S.optional(__S(2786, __c87, 2)) }),
      ).annotate({ identifier: "GetColumnStatisticsTaskSettingsResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          Name: S.String,
          HidePassword: S.optional(S.Boolean),
          ApplyOverrideForComputeEnvironment: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetConnectionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Connection: S.optional(__S(2850, __c89, 2)) })).annotate({
        identifier: "GetConnectionResponse",
      });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OAuth2GrantType: S.optional(S.String),
          OAuth2ClientApplication: S.optional(__S(12512, __c391, 0)),
          TokenUrl: S.optional(S.String),
          TokenUrlParametersMap: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "OAuth2Properties" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AuthenticationType: S.optional(S.String),
          SecretArn: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          OAuth2Properties: S.optional(__S(2848, __c89, 0)),
        }),
      ).annotate({ identifier: "AuthenticationConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ConnectionType: S.optional(S.String),
          MatchCriteria: S.optional(__S(9792, __c306, 0)),
          ConnectionProperties: S.optional(__S(11104, __c347, 0)),
          SparkProperties: S.optional(__S(9920, __c310, 0)),
          AthenaProperties: S.optional(__S(9920, __c310, 0)),
          PythonProperties: S.optional(__S(9920, __c310, 0)),
          PhysicalConnectionRequirements: S.optional(__S(12544, __c392, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedBy: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          LastConnectionValidationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AuthenticationConfiguration: S.optional(__S(2849, __c89, 1)),
          ConnectionSchemaVersion: S.optional(S.Number),
          CompatibleComputeEnvironments: S.optional(__S(10400, __c325, 0)),
        }),
      ).annotate({ identifier: "Connection" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MatchCriteria: S.optional(__S(9792, __c306, 0)),
          ConnectionType: S.optional(S.String),
          ConnectionSchemaVersion: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetConnectionsFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          Filter: S.optional(__S(2880, __c90, 0)),
          HidePassword: S.optional(S.Boolean),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetConnectionsRequest" });
    case 2:
      return S.Array(__S(2850, __c89, 2));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConnectionList: S.optional(__S(2882, __c90, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetConnectionsResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCrawlerRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Crawler: S.optional(__S(10337, __c323, 1)) })).annotate({
        identifier: "GetCrawlerResponse",
      });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CrawlerNameList: S.optional(__S(9792, __c306, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCrawlerMetricsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CrawlerName: S.optional(S.String),
          TimeLeftSeconds: S.optional(S.Number),
          StillEstimating: S.optional(S.Boolean),
          LastRuntimeSeconds: S.optional(S.Number),
          MedianRuntimeSeconds: S.optional(S.Number),
          TablesCreated: S.optional(S.Number),
          TablesUpdated: S.optional(S.Number),
          TablesDeleted: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CrawlerMetrics" });
    case 2:
      return S.Array(__S(2945, __c92, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CrawlerMetricsList: S.optional(__S(2946, __c92, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCrawlerMetricsResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCrawlersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Crawlers: S.optional(__S(10368, __c324, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetCrawlersResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCustomEntityTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          RegexString: S.optional(S.String),
          ContextWords: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "GetCustomEntityTypeResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.String,
          ResourceType: S.String,
          RequestOrigin: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDashboardUrlRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Url: SensitiveString })).annotate({
        identifier: "GetDashboardUrlResponse",
      });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CatalogId: S.optional(S.String), Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDatabaseRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Database: S.optional(__S(3104, __c97, 0)) })).annotate({
        identifier: "GetDatabaseResponse",
      });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          LocationUri: S.optional(S.String),
          Parameters: S.optional(__S(9920, __c310, 0)),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreateTableDefaultPermissions: S.optional(__S(12355, __c386, 3)),
          TargetDatabase: S.optional(__S(12736, __c398, 0)),
          CatalogId: S.optional(S.String),
          FederatedDatabase: S.optional(__S(12352, __c386, 0)),
        }),
      ).annotate({ identifier: "Database" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          ResourceShareType: S.optional(S.String),
          AttributesToGet: S.optional(__S(10400, __c325, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDatabasesRequest" });
    case 1:
      return S.Array(__S(3104, __c97, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ DatabaseList: __S(3137, __c98, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetDatabasesResponse" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CatalogId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDataCatalogEncryptionSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DataCatalogEncryptionSettings: S.optional(__S(3202, __c100, 2)) }),
      ).annotate({ identifier: "GetDataCatalogEncryptionSettingsResponse" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogEncryptionMode: S.String,
          SseAwsKmsKeyId: S.optional(S.String),
          CatalogEncryptionServiceRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "EncryptionAtRest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReturnConnectionPasswordEncrypted: S.Boolean,
          AwsKmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectionPasswordEncryption" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          EncryptionAtRest: S.optional(__S(3200, __c100, 0)),
          ConnectionPasswordEncryption: S.optional(__S(3201, __c100, 1)),
        }),
      ).annotate({ identifier: "DataCatalogEncryptionSettings" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-data-catalog-export-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataCatalogExportConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExportSetting: S.optional(S.String),
          Status: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(3264, __c102, 0)),
          S3TableBucketArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetDataCatalogExportConfigurationOutput" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SseAlgorithm: S.optional(S.String), KmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "ExportEncryptionConfiguration" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PythonScript: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDataflowGraphRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DagNodes: S.optional(__S(13761, __c430, 1)),
          DagEdges: S.optional(__S(13763, __c430, 3)),
        }),
      ).annotate({ identifier: "GetDataflowGraphResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StatisticId: S.optional(S.String), ProfileId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDataQualityModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDataQualityModelResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StatisticId: S.String, ProfileId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDataQualityModelResultRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LowerBound: S.optional(S.Number),
          UpperBound: S.optional(S.Number),
          PredictedValue: S.optional(S.Number),
          ActualValue: S.optional(S.Number),
          Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InclusionAnnotation: S.optional(S.String),
        }),
      ).annotate({ identifier: "StatisticModelResult" });
    case 2:
      return S.Array(__S(3361, __c105, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Model: S.optional(__S(3362, __c105, 2)),
        }),
      ).annotate({ identifier: "GetDataQualityModelResultResponse" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResultId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDataQualityResultRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RunId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDataQualityRuleRecommendationRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RunId: S.optional(S.String),
          DataSource: S.optional(__S(10657, __c333, 1)),
          Role: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          Status: S.optional(S.String),
          ErrorString: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExecutionTime: S.optional(S.Number),
          RecommendedRuleset: S.optional(S.String),
          CreatedRulesetName: S.optional(S.String),
          DataQualitySecurityConfiguration: S.optional(S.String),
          AdditionalRunOptions: S.optional(__S(3456, __c108, 0)),
          RecommendationMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDataQualityRuleRecommendationRunResponse" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CustomLogGroupPrefix: S.optional(S.String) })).annotate({
        identifier: "DataQualityRuleRecommendationRunAdditionalRunOptions",
      });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDataQualityRulesetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Ruleset: S.optional(S.String),
          TargetTable: S.optional(__S(12832, __c401, 0)),
          CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RecommendationRunId: S.optional(S.String),
          DataQualitySecurityConfiguration: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDataQualityRulesetResponse" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RunId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDataQualityRulesetEvaluationRunRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EndpointName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDevEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DevEndpoint: S.optional(__S(10848, __c339, 0)) })).annotate(
        { identifier: "GetDevEndpointResponse" },
      );
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDevEndpointsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DevEndpoints: S.optional(__S(10880, __c340, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDevEndpointsResponse" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionName: S.optional(S.String),
          CatalogId: S.optional(S.String),
          EntityName: S.String,
          NextToken: S.optional(S.String),
          DataStoreApiVersion: S.optional(S.String),
          ConnectionOptions: S.optional(__S(9920, __c310, 0)),
          FilterPredicate: S.optional(S.String),
          Limit: S.Number,
          OrderBy: S.optional(S.String),
          SelectedFields: S.optional(__S(9792, __c306, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEntityRecordsRequest" });
    case 1:
      return S.Array(S.Any);
    case 2:
      return S.suspend(() =>
        S.Struct({ Records: S.optional(__S(3617, __c113, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetEntityRecordsResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/form-types/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFormTypeRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Schema: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetFormTypeResponse" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/glossaries/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGlossaryRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/glossary-terms/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGlossaryTermRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGlueIdentityCenterConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationArn: S.optional(S.String),
          InstanceArn: S.optional(S.String),
          Scopes: S.optional(__S(9792, __c306, 0)),
          UserBackgroundSessionsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetGlueIdentityCenterConfigurationResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIntegrationResourcePropertyRequest" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ResourcePropertyArn: S.optional(S.String),
          SourceProcessingProperties: S.optional(__S(13248, __c414, 0)),
          TargetProcessingProperties: S.optional(__S(13249, __c414, 1)),
        }),
      ).annotate({ identifier: "GetIntegrationResourcePropertyResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TableName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIntegrationTablePropertiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          TableName: S.optional(S.String),
          SourceTableConfig: S.optional(__S(13344, __c417, 0)),
          TargetTableConfig: S.optional(__S(13347, __c417, 3)),
        }),
      ).annotate({ identifier: "GetIntegrationTablePropertiesResponse" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Job: S.optional(__S(11008, __c344, 0)) })).annotate({
        identifier: "GetJobResponse",
      });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobName: S.String, RunId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetJobBookmarkRequest" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.optional(S.String),
          Version: S.optional(S.Number),
          Run: S.optional(S.Number),
          Attempt: S.optional(S.Number),
          PreviousRunId: S.optional(S.String),
          RunId: S.optional(S.String),
          JobBookmark: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobBookmarkEntry" });
    case 1:
      return S.suspend(() =>
        S.Struct({ JobBookmarkEntry: S.optional(__S(3968, __c124, 0)) }),
      ).annotate({ identifier: "GetJobBookmarkResponse" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.String,
          RunId: S.String,
          PredecessorsIncluded: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetJobRunRequest" });
    case 1:
      return S.suspend(() => S.Struct({ JobRun: S.optional(__S(11746, __c367, 2)) })).annotate({
        identifier: "GetJobRunResponse",
      });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetJobRunsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ JobRuns: S.optional(__S(11776, __c368, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetJobRunsResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Jobs: S.optional(__S(11040, __c345, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetJobsResponse" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Source: __S(4128, __c129, 0),
          Sinks: S.optional(__S(4129, __c129, 1)),
          Location: S.optional(__S(4130, __c129, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetMappingRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Mapping: __S(4132, __c129, 4) })).annotate({
        identifier: "GetMappingResponse",
      });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DatabaseName: S.String, TableName: S.String })).annotate({
        identifier: "CatalogEntry",
      });
    case 1:
      return S.Array(__S(4128, __c129, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Jdbc: S.optional(__S(13793, __c431, 1)),
          S3: S.optional(__S(13793, __c431, 1)),
          DynamoDB: S.optional(__S(13793, __c431, 1)),
        }),
      ).annotate({ identifier: "Location" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SourceTable: S.optional(S.String),
          SourcePath: S.optional(S.String),
          SourceType: S.optional(S.String),
          TargetTable: S.optional(S.String),
          TargetPath: S.optional(S.String),
          TargetType: S.optional(S.String),
        }),
      ).annotate({ identifier: "MappingEntry" });
    case 4:
      return S.Array(__S(4131, __c129, 3));
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CatalogId: S.String, MaterializedViewRefreshTaskRunId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMaterializedViewRefreshTaskRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MaterializedViewRefreshTaskRun: S.optional(__S(4192, __c131, 0)) }),
      ).annotate({ identifier: "GetMaterializedViewRefreshTaskRunResponse" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CustomerId: S.optional(S.String),
          MaterializedViewRefreshTaskRunId: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          TableName: S.optional(S.String),
          CatalogId: S.optional(S.String),
          Role: S.optional(S.String),
          Status: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ErrorMessage: S.optional(S.String),
          DPUSeconds: S.optional(S.Number),
          RefreshType: S.optional(S.String),
          ProcessedBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MaterializedViewRefreshTaskRun" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransformId: S.String, TaskRunId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMLTaskRunRequest" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputS3Path: S.optional(S.String), Replace: S.optional(S.Boolean) }),
      ).annotate({ identifier: "ImportLabelsTaskRunProperties" });
    case 1:
      return S.suspend(() => S.Struct({ OutputS3Path: S.optional(S.String) })).annotate({
        identifier: "ExportLabelsTaskRunProperties",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          JobName: S.optional(S.String),
          JobRunId: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindMatchesTaskRunProperties" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          TaskType: S.optional(S.String),
          ImportLabelsTaskRunProperties: S.optional(__S(4256, __c133, 0)),
          ExportLabelsTaskRunProperties: S.optional(__S(4257, __c133, 1)),
          LabelingSetGenerationTaskRunProperties: S.optional(__S(4257, __c133, 1)),
          FindMatchesTaskRunProperties: S.optional(__S(4258, __c133, 2)),
        }),
      ).annotate({ identifier: "TaskRunProperties" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          TransformId: S.optional(S.String),
          TaskRunId: S.optional(S.String),
          Status: S.optional(S.String),
          LogGroupName: S.optional(S.String),
          Properties: S.optional(__S(4259, __c133, 3)),
          ErrorString: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExecutionTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetMLTaskRunResponse" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TaskRunType: S.optional(S.String),
          Status: S.optional(S.String),
          StartedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TaskRunFilterCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TransformId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filter: S.optional(__S(4288, __c134, 0)),
          Sort: S.optional(__S(4320, __c135, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetMLTaskRunsRequest" });
    case 2:
      return S.Array(__S(4260, __c133, 4));
    case 3:
      return S.suspend(() =>
        S.Struct({ TaskRuns: S.optional(__S(4290, __c134, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetMLTaskRunsResponse" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Column: S.String, SortDirection: S.String })).annotate({
        identifier: "TaskRunSortCriteria",
      });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransformId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMLTransformRequest" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NumTruePositives: S.optional(S.Number),
          NumFalsePositives: S.optional(S.Number),
          NumTrueNegatives: S.optional(S.Number),
          NumFalseNegatives: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ConfusionMatrix" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ColumnName: S.optional(S.String), Importance: S.optional(S.Number) }),
      ).annotate({ identifier: "ColumnImportance" });
    case 2:
      return S.Array(__S(4385, __c137, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AreaUnderPRCurve: S.optional(S.Number),
          Precision: S.optional(S.Number),
          Recall: S.optional(S.Number),
          F1: S.optional(S.Number),
          ConfusionMatrix: S.optional(__S(4384, __c137, 0)),
          ColumnImportances: S.optional(__S(4386, __c137, 2)),
        }),
      ).annotate({ identifier: "FindMatchesMetrics" });
    case 4:
      return S.suspend(() =>
        S.Struct({ TransformType: S.String, FindMatchesMetrics: S.optional(__S(4387, __c137, 3)) }),
      ).annotate({ identifier: "EvaluationMetrics" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          TransformId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InputRecordTables: S.optional(__S(13472, __c421, 0)),
          Parameters: S.optional(__S(13505, __c422, 1)),
          EvaluationMetrics: S.optional(__S(4388, __c137, 4)),
          LabelCount: S.optional(S.Number),
          Schema: S.optional(__S(4417, __c138, 1)),
          Role: S.optional(S.String),
          GlueVersion: S.optional(S.String),
          MaxCapacity: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          MaxRetries: S.optional(S.Number),
          TransformEncryption: S.optional(__S(13474, __c421, 2)),
        }),
      ).annotate({ identifier: "GetMLTransformResponse" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), DataType: S.optional(S.String) }),
      ).annotate({ identifier: "SchemaColumn" });
    case 1:
      return S.Array(__S(4416, __c138, 0));
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filter: S.optional(__S(4480, __c140, 0)),
          Sort: S.optional(__S(4320, __c135, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetMLTransformsRequest" });
    case 1:
      return S.Array(__S(4389, __c137, 5));
    case 2:
      return S.suspend(() =>
        S.Struct({ Transforms: __S(4449, __c139, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetMLTransformsResponse" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          TransformType: S.optional(S.String),
          Status: S.optional(S.String),
          GlueVersion: S.optional(S.String),
          CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Schema: S.optional(__S(4417, __c138, 1)),
        }),
      ).annotate({ identifier: "TransformFilterCriteria" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          PartitionValues: __S(9792, __c306, 0),
          AuditContext: S.optional(__S(11328, __c354, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetPartitionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Partition: S.optional(__S(11360, __c355, 0)) })).annotate({
        identifier: "GetPartitionResponse",
      });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetPartitionIndexesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.String, Type: S.String })).annotate({
        identifier: "KeySchemaElement",
      });
    case 2:
      return S.Array(__S(4545, __c142, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Partitions: S.optional(__S(10113, __c316, 1)) }),
      ).annotate({ identifier: "BackfillError" });
    case 4:
      return S.Array(__S(4547, __c142, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.String,
          Keys: __S(4546, __c142, 2),
          IndexStatus: S.String,
          BackfillErrors: S.optional(__S(4548, __c142, 4)),
        }),
      ).annotate({ identifier: "PartitionIndexDescriptor" });
    case 6:
      return S.Array(__S(4549, __c142, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          PartitionIndexDescriptorList: S.optional(__S(4550, __c142, 6)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPartitionIndexesResponse" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          Expression: S.optional(S.String),
          NextToken: S.optional(S.String),
          Segment: S.optional(__S(4608, __c144, 0)),
          MaxResults: S.optional(S.Number),
          ExcludeColumnSchema: S.optional(S.Boolean),
          TransactionId: S.optional(S.String),
          QueryAsOfTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AuditContext: S.optional(__S(11328, __c354, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetPartitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Partitions: S.optional(__S(11392, __c356, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPartitionsResponse" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SegmentNumber: S.Number, TotalSegments: S.Number }),
      ).annotate({ identifier: "Segment" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Mapping: __S(4132, __c129, 4),
          Source: __S(4128, __c129, 0),
          Sinks: S.optional(__S(4129, __c129, 1)),
          Location: S.optional(__S(4130, __c129, 2)),
          Language: S.optional(S.String),
          AdditionalPlanOptionsMap: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetPlanRequest" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistryId: __S(13696, __c428, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRegistryInput" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistryName: S.optional(S.String),
          RegistryArn: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedTime: S.optional(S.String),
          UpdatedTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRegistryResponse" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePoliciesRequest" });
    case 1:
      return S.Array(__S(4768, __c149, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GetResourcePoliciesResponseList: S.optional(__S(4737, __c148, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetResourcePoliciesResponse" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyInJson: S.optional(S.String),
          PolicyHash: S.optional(S.String),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GluePolicy" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SchemaId: __S(9952, __c311, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSchemaInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistryName: S.optional(S.String),
          RegistryArn: S.optional(S.String),
          SchemaName: S.optional(S.String),
          SchemaArn: S.optional(S.String),
          Description: S.optional(S.String),
          DataFormat: S.optional(S.String),
          Compatibility: S.optional(S.String),
          SchemaCheckpoint: S.optional(S.Number),
          LatestSchemaVersion: S.optional(S.Number),
          NextSchemaVersion: S.optional(S.Number),
          SchemaStatus: S.optional(S.String),
          CreatedTime: S.optional(S.String),
          UpdatedTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSchemaResponse" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SchemaId: __S(9952, __c311, 0), SchemaDefinition: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSchemaByDefinitionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SchemaVersionId: S.optional(S.String),
          SchemaArn: S.optional(S.String),
          DataFormat: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSchemaByDefinitionResponse" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SchemaId: S.optional(__S(9952, __c311, 0)),
          SchemaVersionId: S.optional(S.String),
          SchemaVersionNumber: S.optional(__S(4928, __c154, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSchemaVersionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SchemaVersionId: S.optional(S.String),
          SchemaDefinition: S.optional(S.String),
          DataFormat: S.optional(S.String),
          SchemaArn: S.optional(S.String),
          VersionNumber: S.optional(S.Number),
          Status: S.optional(S.String),
          CreatedTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSchemaVersionResponse" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LatestVersion: S.optional(S.Boolean), VersionNumber: S.optional(S.Number) }),
      ).annotate({ identifier: "SchemaVersionNumber" });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SchemaId: __S(9952, __c311, 0),
          FirstSchemaVersionNumber: __S(4928, __c154, 0),
          SecondSchemaVersionNumber: __S(4928, __c154, 0),
          SchemaDiffType: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSchemaVersionsDiffInput" });
    case 1:
      return S.suspend(() => S.Struct({ Diff: S.optional(S.String) })).annotate({
        identifier: "GetSchemaVersionsDiffResponse",
      });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSecurityConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SecurityConfiguration: S.optional(__S(5024, __c157, 0)) }),
      ).annotate({ identifier: "GetSecurityConfigurationResponse" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EncryptionConfiguration: S.optional(__S(37, __c1, 5)),
        }),
      ).annotate({ identifier: "SecurityConfiguration" });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSecurityConfigurationsRequest" });
    case 1:
      return S.Array(__S(5024, __c157, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SecurityConfigurations: S.optional(__S(5057, __c158, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSecurityConfigurationsResponse" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, RequestOrigin: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSessionRequest" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSessionEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Url: S.String,
          AuthToken: SensitiveString,
          AuthTokenExpirationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "SessionEndpoint" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SparkConnect: __S(5121, __c160, 1) }).pipe(
          S.encodeKeys({ SparkConnect: "SPARK_CONNECT" }),
        ),
      ).annotate({ identifier: "GetSessionEndpointResponse" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String, Id: S.Number, RequestOrigin: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetStatementRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Statement: S.optional(__S(5186, __c162, 2)) })).annotate({
        identifier: "GetStatementResponse",
      });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TextPlain: S.optional(S.String) })).annotate({
        identifier: "StatementOutputData",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Data: S.optional(__S(5184, __c162, 0)),
          ExecutionCount: S.optional(S.Number),
          Status: S.optional(S.String),
          ErrorName: S.optional(S.String),
          ErrorValue: S.optional(S.String),
          Traceback: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "StatementOutput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.Number),
          Code: S.optional(S.String),
          State: S.optional(S.String),
          Output: S.optional(__S(5185, __c162, 1)),
          Progress: S.optional(S.Number),
          StartedOn: S.optional(S.Number),
          CompletedOn: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Statement" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          Name: S.String,
          TransactionId: S.optional(S.String),
          QueryAsOfTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AuditContext: S.optional(__S(11328, __c354, 0)),
          IncludeStatusDetails: S.optional(S.Boolean),
          AttributesToGet: S.optional(__S(10400, __c325, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTableRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Table: S.optional(__S(5259, __c164, 11)) })).annotate({
        identifier: "GetTableResponse",
      });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Dialect: S.optional(S.String),
          DialectVersion: S.optional(S.String),
          ViewOriginalText: S.optional(S.String),
          ViewExpandedText: S.optional(S.String),
          ValidationConnection: S.optional(S.String),
          IsStale: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ViewRepresentation" });
    case 1:
      return S.Array(__S(5248, __c164, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IsProtected: S.optional(S.Boolean),
          IsManaged: S.optional(S.Boolean),
          Definer: S.optional(S.String),
          ViewVersionId: S.optional(S.Number),
          ViewVersionToken: S.optional(S.String),
          RefreshSeconds: S.optional(S.Number),
          LastRefreshType: S.optional(S.String),
          SubObjects: S.optional(__S(9792, __c306, 0)),
          SubObjectVersionIds: S.optional(__S(10560, __c330, 0)),
          SubObjectsStatistics: S.optional(__S(195, __c6, 3)),
          Representations: S.optional(__S(5249, __c164, 1)),
          SparkPipelineInfo: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "ViewDefinition" });
    case 3:
      return S.Array(__S(198, __c6, 6));
    case 4:
      return S.Array(__S(201, __c6, 9));
    case 5:
      return S.Array(__S(204, __c6, 12));
    case 6:
      return S.suspend(() =>
        S.Struct({
          FormatVersion: S.optional(S.String),
          TableUuid: S.optional(S.String),
          Location: S.optional(S.String),
          Properties: S.optional(__S(9920, __c310, 0)),
          Schemas: S.optional(__S(5251, __c164, 3)),
          CurrentSchemaId: S.optional(S.Number),
          LastColumnId: S.optional(S.Number),
          PartitionSpecs: S.optional(__S(5252, __c164, 4)),
          DefaultSpecId: S.optional(S.Number),
          LastPartitionId: S.optional(S.Number),
          SortOrders: S.optional(__S(5253, __c164, 5)),
          DefaultSortOrderId: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IcebergTableMetadata" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Dialect: S.optional(S.String),
          DialectVersion: S.optional(S.String),
          ViewValidationText: S.optional(S.String),
          UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          Error: S.optional(__S(9856, __c308, 0)),
        }),
      ).annotate({ identifier: "ViewValidation" });
    case 8:
      return S.Array(__S(5255, __c164, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          RequestedChange: S.optional(
            S.suspend((): S.Schema<Table> => __S(5259, __c164, 11)).annotate({
              identifier: "Table",
            }),
          ),
          ViewValidations: S.optional(__S(5256, __c164, 8)),
        }),
      ).annotate({ identifier: "StatusDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          RequestedBy: S.optional(S.String),
          UpdatedBy: S.optional(S.String),
          RequestTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Action: S.optional(S.String),
          State: S.optional(S.String),
          Error: S.optional(__S(9856, __c308, 0)),
          Details: S.optional(
            S.suspend((): S.Schema<StatusDetails> => __S(5257, __c164, 9)).annotate({
              identifier: "StatusDetails",
            }),
          ),
        }),
      ).annotate({ identifier: "TableStatus" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DatabaseName: S.optional(S.String),
          Description: S.optional(S.String),
          Owner: S.optional(S.String),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastAccessTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastAnalyzedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Retention: S.optional(S.Number),
          StorageDescriptor: S.optional(__S(9991, __c312, 7)),
          PartitionKeys: S.optional(__S(9985, __c312, 1)),
          ViewOriginalText: S.optional(S.String),
          ViewExpandedText: S.optional(S.String),
          TableType: S.optional(S.String),
          Parameters: S.optional(__S(9920, __c310, 0)),
          CreatedBy: S.optional(S.String),
          IsRegisteredWithLakeFormation: S.optional(S.Boolean),
          TargetTable: S.optional(__S(192, __c6, 0)),
          CatalogId: S.optional(S.String),
          VersionId: S.optional(S.String),
          FederatedTable: S.optional(__S(193, __c6, 1)),
          ViewDefinition: S.optional(__S(5250, __c164, 2)),
          IsMultiDialectView: S.optional(S.Boolean),
          IsMaterializedView: S.optional(S.Boolean),
          IcebergTableMetadata: S.optional(__S(5254, __c164, 6)),
          Status: S.optional(
            S.suspend((): S.Schema<TableStatus> => __S(5258, __c164, 10)).annotate({
              identifier: "TableStatus",
            }),
          ),
        }),
      ).annotate({ identifier: "Table" });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.String,
          DatabaseName: S.String,
          TableName: S.String,
          Type: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTableOptimizerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          TableName: S.optional(S.String),
          TableOptimizer: S.optional(__S(11520, __c360, 0)),
        }),
      ).annotate({ identifier: "GetTableOptimizerResponse" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          Expression: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          TransactionId: S.optional(S.String),
          QueryAsOfTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AuditContext: S.optional(__S(11328, __c354, 0)),
          ResourceShareType: S.optional(S.String),
          IncludeStatusDetails: S.optional(S.Boolean),
          AttributesToGet: S.optional(__S(10400, __c325, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTablesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TableList: S.optional(__S(5344, __c167, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetTablesResponse" });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Table> => __S(5259, __c164, 11)).annotate({
          identifier: "Table",
        }),
      );
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          VersionId: S.optional(S.String),
          AuditContext: S.optional(__S(11328, __c354, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTableVersionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TableVersion: S.optional(__S(5408, __c169, 0)) })).annotate(
        { identifier: "GetTableVersionResponse" },
      );
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Table: S.optional(__S(5259, __c164, 11)), VersionId: S.optional(S.String) }),
      ).annotate({ identifier: "TableVersion" });
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          AuditContext: S.optional(__S(11328, __c354, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTableVersionsRequest" });
    case 1:
      return S.Array(__S(5408, __c169, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TableVersions: S.optional(__S(5441, __c170, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTableVersionsResponse" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTagsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(9920, __c310, 0)) })).annotate({
        identifier: "GetTagsResponse",
      });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTriggerRequest" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          DependentJobName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTriggersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Triggers: S.optional(__S(11616, __c363, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetTriggersResponse" });
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Region: S.optional(S.String),
          CatalogId: S.String,
          DatabaseName: S.String,
          TableName: S.String,
          PartitionValues: __S(9792, __c306, 0),
          AuditContext: S.optional(__S(11328, __c354, 0)),
          SupportedPermissionTypes: __S(10400, __c325, 0),
          QuerySessionContext: S.optional(__S(11424, __c357, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetUnfilteredPartitionMetadataRequest" });
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Partition: S.optional(__S(11360, __c355, 0)),
          AuthorizedColumns: S.optional(__S(9792, __c306, 0)),
          IsRegisteredWithLakeFormation: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetUnfilteredPartitionMetadataResponse" });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Region: S.optional(S.String),
          CatalogId: S.String,
          DatabaseName: S.String,
          TableName: S.String,
          Expression: S.optional(S.String),
          AuditContext: S.optional(__S(11328, __c354, 0)),
          SupportedPermissionTypes: __S(10400, __c325, 0),
          NextToken: S.optional(S.String),
          Segment: S.optional(__S(4608, __c144, 0)),
          MaxResults: S.optional(S.Number),
          QuerySessionContext: S.optional(__S(11424, __c357, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetUnfilteredPartitionsMetadataRequest" });
    case 1:
      return S.Array(__S(5600, __c175, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          UnfilteredPartitions: S.optional(__S(5633, __c176, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetUnfilteredPartitionsMetadataResponse" });
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Dialect: S.optional(S.String), DialectVersion: S.optional(S.String) }),
      ).annotate({ identifier: "SupportedDialect" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Region: S.optional(S.String),
          CatalogId: S.String,
          DatabaseName: S.String,
          Name: S.String,
          AuditContext: S.optional(__S(11328, __c354, 0)),
          SupportedPermissionTypes: __S(10400, __c325, 0),
          ParentResourceArn: S.optional(S.String),
          RootResourceArn: S.optional(S.String),
          SupportedDialect: S.optional(__S(5664, __c177, 0)),
          Permissions: S.optional(__S(10400, __c325, 0)),
          QuerySessionContext: S.optional(__S(11424, __c357, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetUnfilteredTableMetadataRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ColumnName: S.optional(S.String), RowFilterExpression: S.optional(S.String) }),
      ).annotate({ identifier: "ColumnRowFilter" });
    case 3:
      return S.Array(__S(5666, __c177, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Table: S.optional(__S(5259, __c164, 11)),
          AuthorizedColumns: S.optional(__S(9792, __c306, 0)),
          IsRegisteredWithLakeFormation: S.optional(S.Boolean),
          CellFilters: S.optional(__S(5667, __c177, 3)),
          QueryAuthorizationId: S.optional(S.String),
          IsMultiDialectView: S.optional(S.Boolean),
          IsMaterializedView: S.optional(S.Boolean),
          ResourceArn: S.optional(S.String),
          IsProtected: S.optional(S.Boolean),
          Permissions: S.optional(__S(10400, __c325, 0)),
          RowFilter: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetUnfilteredTableMetadataResponse" });
  }
}
function __c178(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetUsageProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Configuration: S.optional(__S(354, __c11, 2)),
          CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetUsageProfileResponse" });
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          FunctionName: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetUserDefinedFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ UserDefinedFunction: S.optional(__S(5760, __c180, 0)) }),
      ).annotate({ identifier: "GetUserDefinedFunctionResponse" });
  }
}
function __c180(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          ClassName: S.optional(S.String),
          OwnerName: S.optional(S.String),
          FunctionType: S.optional(S.String),
          OwnerType: S.optional(S.String),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceUris: S.optional(__S(417, __c13, 1)),
          CatalogId: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserDefinedFunction" });
  }
}
function __c181(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          Pattern: S.String,
          FunctionType: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetUserDefinedFunctionsRequest" });
    case 1:
      return S.Array(__S(5760, __c180, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          UserDefinedFunctions: S.optional(__S(5793, __c181, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetUserDefinedFunctionsResponse" });
  }
}
function __c182(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, IncludeGraph: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetWorkflowRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Workflow: S.optional(__S(11841, __c370, 1)) })).annotate({
        identifier: "GetWorkflowResponse",
      });
  }
}
function __c183(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, RunId: S.String, IncludeGraph: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetWorkflowRunRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Run: S.optional(__S(11883, __c371, 11)) })).annotate({
        identifier: "GetWorkflowRunResponse",
      });
  }
}
function __c184(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, RunId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetWorkflowRunPropertiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RunProperties: S.optional(__S(9920, __c310, 0)) }),
      ).annotate({ identifier: "GetWorkflowRunPropertiesResponse" });
  }
}
function __c185(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          IncludeGraph: S.optional(S.Boolean),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetWorkflowRunsRequest" });
    case 1:
      return S.Array(__S(11883, __c371, 11));
    case 2:
      return S.suspend(() =>
        S.Struct({ Runs: S.optional(__S(5921, __c185, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetWorkflowRunsResponse" });
  }
}
function __c186(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CatalogId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ImportCatalogToGlueRequest" });
  }
}
function __c187(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/asset-types" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAssetTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(6017, __c188, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssetTypesResponse" });
  }
}
function __c188(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "AssetTypeItem" });
    case 1:
      return S.Array(__S(6016, __c188, 0));
  }
}
function __c189(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBlueprintsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Blueprints: S.optional(__S(9792, __c306, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBlueprintsResponse" });
  }
}
function __c190(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListColumnStatisticsTaskRunsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ColumnStatisticsTaskRunIds: S.optional(__S(9792, __c306, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListColumnStatisticsTaskRunsResponse" });
  }
}
function __c191(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListConnectionTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionTypeVariantName: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(S.String),
          LogoUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectionTypeVariant" });
    case 2:
      return S.Array(__S(6113, __c191, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConnectionType: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Vendor: S.optional(S.String),
          Description: S.optional(S.String),
          Categories: S.optional(__S(9792, __c306, 0)),
          Capabilities: S.optional(__S(1888, __c59, 0)),
          LogoUrl: S.optional(S.String),
          ConnectionTypeVariants: S.optional(__S(6114, __c191, 2)),
        }),
      ).annotate({ identifier: "ConnectionTypeBrief" });
    case 4:
      return S.Array(__S(6115, __c191, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ConnectionTypes: S.optional(__S(6116, __c191, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConnectionTypesResponse" });
  }
}
function __c192(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCrawlersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CrawlerNames: S.optional(__S(9792, __c306, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCrawlersResponse" });
  }
}
function __c193(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FieldName: S.optional(S.String),
          FilterOperator: S.optional(S.String),
          FieldValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "CrawlsFilter" });
    case 1:
      return S.Array(__S(6176, __c193, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CrawlerName: S.String,
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(6177, __c193, 1)),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCrawlsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CrawlId: S.optional(S.String),
          State: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Summary: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          LogGroup: S.optional(S.String),
          LogStream: S.optional(S.String),
          MessagePrefix: S.optional(S.String),
          DPUHour: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CrawlerHistory" });
    case 4:
      return S.Array(__S(6179, __c193, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Crawls: S.optional(__S(6180, __c193, 4)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCrawlsResponse" });
  }
}
function __c194(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCustomEntityTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CustomEntityTypes: S.optional(__S(10497, __c328, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCustomEntityTypesResponse" });
  }
}
function __c195(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSource: S.optional(__S(10657, __c333, 1)),
          JobName: S.optional(S.String),
          JobRunId: S.optional(S.String),
          StartedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DataQualityResultFilterCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(6240, __c195, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDataQualityResultsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResultId: S.optional(S.String),
          DataSource: S.optional(__S(10657, __c333, 1)),
          JobName: S.optional(S.String),
          JobRunId: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DataQualityResultDescription" });
    case 3:
      return S.Array(__S(6242, __c195, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Results: __S(6243, __c195, 3), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataQualityResultsResponse" });
  }
}
function __c196(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSource: __S(10657, __c333, 1),
          StartedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DataQualityRuleRecommendationRunFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(6272, __c196, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDataQualityRuleRecommendationRunsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RunId: S.optional(S.String),
          Status: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataSource: S.optional(__S(10657, __c333, 1)),
          CreatedRulesetName: S.optional(S.String),
          RecommendationMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataQualityRuleRecommendationRunDescription" });
    case 3:
      return S.Array(__S(6274, __c196, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Runs: S.optional(__S(6275, __c196, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataQualityRuleRecommendationRunsResponse" });
  }
}
function __c197(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSource: __S(10657, __c333, 1),
          StartedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RulesetName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataQualityRulesetEvaluationRunFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(6304, __c197, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDataQualityRulesetEvaluationRunsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RunId: S.optional(S.String),
          Status: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataSource: S.optional(__S(10657, __c333, 1)),
        }),
      ).annotate({ identifier: "DataQualityRulesetEvaluationRunDescription" });
    case 3:
      return S.Array(__S(6306, __c197, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Runs: S.optional(__S(6307, __c197, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataQualityRulesetEvaluationRunsResponse" });
  }
}
function __c198(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TargetTable: S.optional(__S(12832, __c401, 0)),
        }),
      ).annotate({ identifier: "DataQualityRulesetFilterCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filter: S.optional(__S(6336, __c198, 0)),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDataQualityRulesetsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TargetTable: S.optional(__S(12832, __c401, 0)),
          RecommendationRunId: S.optional(S.String),
          RuleCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DataQualityRulesetListDetails" });
    case 3:
      return S.Array(__S(6338, __c198, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Rulesets: S.optional(__S(6339, __c198, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataQualityRulesetsResponse" });
  }
}
function __c199(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StatisticId: S.optional(S.String),
          ProfileId: S.optional(S.String),
          TimestampFilter: S.optional(__S(6400, __c200, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDataQualityStatisticAnnotationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.optional(S.String),
          StatisticId: S.optional(S.String),
          StatisticRecordedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InclusionAnnotation: S.optional(__S(6401, __c200, 1)),
        }),
      ).annotate({ identifier: "StatisticAnnotation" });
    case 2:
      return S.Array(__S(6369, __c199, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Annotations: S.optional(__S(6370, __c199, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDataQualityStatisticAnnotationsResponse" });
  }
}
function __c200(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecordedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RecordedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimestampFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(S.String),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimestampedInclusionAnnotation" });
  }
}
function __c201(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StatisticId: S.optional(S.String),
          ProfileId: S.optional(S.String),
          TimestampFilter: S.optional(__S(6400, __c200, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDataQualityStatisticsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RunId: S.optional(S.String), JobRunId: S.optional(S.String) }),
      ).annotate({ identifier: "RunIdentifier" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          StatisticId: S.optional(S.String),
          ProfileId: S.optional(S.String),
          RunIdentifier: S.optional(__S(6433, __c201, 1)),
          StatisticName: S.optional(S.String),
          DoubleValue: S.optional(S.Number),
          DistributionValue: S.optional(__S(10624, __c332, 0)),
          EvaluationLevel: S.optional(S.String),
          ColumnsReferenced: S.optional(__S(9792, __c306, 0)),
          ReferencedDatasets: S.optional(__S(9792, __c306, 0)),
          StatisticProperties: S.optional(__S(9920, __c310, 0)),
          RecordedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InclusionAnnotation: S.optional(__S(6401, __c200, 1)),
        }),
      ).annotate({ identifier: "StatisticSummary" });
    case 3:
      return S.Array(__S(6434, __c201, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Statistics: S.optional(__S(6435, __c201, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataQualityStatisticsResponse" });
  }
}
function __c202(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDevEndpointsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DevEndpointNames: S.optional(__S(9792, __c306, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDevEndpointsResponse" });
  }
}
function __c203(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionName: S.optional(S.String),
          CatalogId: S.optional(S.String),
          ParentEntityName: S.optional(S.String),
          NextToken: S.optional(S.String),
          DataStoreApiVersion: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEntitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EntityName: S.optional(S.String),
          Label: S.optional(S.String),
          IsParentEntity: S.optional(S.Boolean),
          Description: S.optional(S.String),
          Category: S.optional(S.String),
          CustomProperties: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "Entity" });
    case 2:
      return S.Array(__S(6497, __c203, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Entities: S.optional(__S(6498, __c203, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEntitiesResponse" });
  }
}
function __c204(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/form-types" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFormTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Items: __S(6017, __c188, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFormTypesResponse" });
  }
}
function __c205(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/glossaries" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGlossariesRequest" });
    case 1:
      return S.Array(__S(12928, __c404, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(6561, __c205, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGlossariesResponse" });
  }
}
function __c206(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlossaryIdentifier: S.String.pipe(T.HttpQuery("glossaryIdentifier")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/glossary-terms" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGlossaryTermsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          ShortDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "GlossaryTermItem" });
    case 2:
      return S.Array(__S(6593, __c206, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(6594, __c206, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGlossaryTermsResponse" });
  }
}
function __c207(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          Filters: S.optional(__S(2049, __c64, 1)),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListIntegrationResourcePropertiesRequest" });
    case 1:
      return S.Array(__S(13280, __c415, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IntegrationResourcePropertyList: S.optional(__S(6625, __c207, 1)),
          Marker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListIntegrationResourcePropertiesResponse" });
  }
}
function __c208(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          Filters: S.optional(__S(2049, __c64, 1)),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListIntegrationTablePropertiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          TableName: S.String,
          SourceTableConfig: S.optional(__S(13344, __c417, 0)),
          TargetTableConfig: S.optional(__S(13347, __c417, 3)),
        }),
      ).annotate({ identifier: "IntegrationTableProperties" });
    case 2:
      return S.Array(__S(6657, __c208, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IntegrationTablePropertiesList: S.optional(__S(6658, __c208, 2)),
          Marker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListIntegrationTablePropertiesResponse" });
  }
}
function __c209(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
          IterableFormName: S.String.pipe(T.HttpLabel("IterableFormName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/assets/{AssetIdentifier}/iterable-forms/{IterableFormName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIterableFormsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ItemId: S.optional(S.String),
          ItemName: S.optional(S.String),
          Description: S.optional(S.String),
          GlossaryTerms: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "IterableFormListItem" });
    case 2:
      return S.Array(__S(6689, __c209, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(6690, __c209, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIterableFormsResponse" });
  }
}
function __c210(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ JobNames: S.optional(__S(9792, __c306, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobsResponse" });
  }
}
function __c211(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.String,
          DatabaseName: S.optional(S.String),
          TableName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMaterializedViewRefreshTaskRunsRequest" });
    case 1:
      return S.Array(__S(4192, __c131, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaterializedViewRefreshTaskRuns: S.optional(__S(6753, __c211, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMaterializedViewRefreshTaskRunsResponse" });
  }
}
function __c212(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filter: S.optional(__S(4480, __c140, 0)),
          Sort: S.optional(__S(4320, __c135, 0)),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMLTransformsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TransformIds: __S(9792, __c306, 0), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMLTransformsResponse" });
  }
}
function __c213(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRegistriesInput" });
    case 1:
      return S.Array(__S(4704, __c147, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Registries: S.optional(__S(6817, __c213, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRegistriesResponse" });
  }
}
function __c214(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistryId: S.optional(__S(13696, __c428, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSchemasInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistryName: S.optional(S.String),
          SchemaName: S.optional(S.String),
          SchemaArn: S.optional(S.String),
          Description: S.optional(S.String),
          SchemaStatus: S.optional(S.String),
          CreatedTime: S.optional(S.String),
          UpdatedTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "SchemaListItem" });
    case 2:
      return S.Array(__S(6849, __c214, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Schemas: S.optional(__S(6850, __c214, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSchemasResponse" });
  }
}
function __c215(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SchemaId: __S(9952, __c311, 0),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSchemaVersionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SchemaArn: S.optional(S.String),
          SchemaVersionId: S.optional(S.String),
          VersionNumber: S.optional(S.Number),
          Status: S.optional(S.String),
          CreatedTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "SchemaVersionListItem" });
    case 2:
      return S.Array(__S(6881, __c215, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Schemas: S.optional(__S(6882, __c215, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSchemaVersionsResponse" });
  }
}
function __c216(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Tags: S.optional(__S(9920, __c310, 0)),
          RequestOrigin: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSessionsRequest" });
    case 1:
      return S.Array(__S(129, __c4, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Ids: S.optional(__S(9792, __c306, 0)),
          Sessions: S.optional(__S(6913, __c216, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSessionsResponse" });
  }
}
function __c217(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.String,
          RequestOrigin: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListStatementsRequest" });
    case 1:
      return S.Array(__S(5186, __c162, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ Statements: S.optional(__S(6945, __c217, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListStatementsResponse" });
  }
}
function __c218(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.String,
          DatabaseName: S.String,
          TableName: S.String,
          Type: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTableOptimizerRunsRequest" });
    case 1:
      return S.Array(__S(11559, __c361, 7));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          TableName: S.optional(S.String),
          NextToken: S.optional(S.String),
          TableOptimizerRuns: S.optional(__S(6977, __c218, 1)),
        }),
      ).annotate({ identifier: "ListTableOptimizerRunsResponse" });
  }
}
function __c219(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          DependentJobName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTriggersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TriggerNames: S.optional(__S(9792, __c306, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTriggersResponse" });
  }
}
function __c220(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListUsageProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UsageProfileDefinition" });
    case 2:
      return S.Array(__S(7041, __c220, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Profiles: S.optional(__S(7042, __c220, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListUsageProfilesResponse" });
  }
}
function __c221(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListWorkflowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Workflows: S.optional(__S(9792, __c306, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWorkflowsResponse" });
  }
}
function __c222(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IntegrationIdentifier: S.String,
          Description: S.optional(S.String),
          DataFilter: S.optional(S.String),
          IntegrationConfig: S.optional(__S(13120, __c410, 0)),
          IntegrationName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyIntegrationRequest" });
  }
}
function __c223(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetTypeId: S.String,
          Identifier: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          Forms: __S(10945, __c342, 1),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/assets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutAssetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Forms: S.optional(__S(10945, __c342, 1)),
        }),
      ).annotate({ identifier: "PutAssetResponse" });
  }
}
function __c224(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Forms: __S(2177, __c68, 1),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/asset-types" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutAssetTypeRequest" });
  }
}
function __c225(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
          IterableFormName: S.optional(S.String),
          ItemIdentifier: S.optional(S.String),
          AttachmentName: S.String,
          Content: S.String,
          FormTypeId: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assets/{AssetIdentifier}/attachment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAttachmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssetIdentifier: S.optional(S.String),
          IterableFormName: S.optional(S.String),
          ItemIdentifier: S.optional(S.String),
          AttachmentName: S.optional(S.String),
          FormTypeId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutAttachmentResponse" });
  }
}
function __c226(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DataCatalogEncryptionSettings: __S(3202, __c100, 2),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutDataCatalogEncryptionSettingsRequest" });
  }
}
function __c227(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExportSetting: S.String,
          EncryptionConfiguration: S.optional(__S(3264, __c102, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/put-data-catalog-export-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDataCatalogExportConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExportSetting: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(3264, __c102, 0)),
        }),
      ).annotate({ identifier: "PutDataCatalogExportConfigurationOutput" });
  }
}
function __c228(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProfileId: S.String, InclusionAnnotation: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutDataQualityProfileAnnotationRequest" });
  }
}
function __c229(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Schema: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/form-types" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutFormTypeRequest" });
  }
}
function __c230(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyInJson: S.String,
          ResourceArn: S.optional(S.String),
          PolicyHashCondition: S.optional(S.String),
          PolicyExistsCondition: S.optional(S.String),
          EnableHybrid: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ PolicyHash: S.optional(S.String) })).annotate({
        identifier: "PutResourcePolicyResponse",
      });
  }
}
function __c231(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SchemaId: S.optional(__S(9952, __c311, 0)),
          SchemaVersionNumber: S.optional(__S(4928, __c154, 0)),
          SchemaVersionId: S.optional(S.String),
          MetadataKeyValue: __S(7424, __c232, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutSchemaVersionMetadataInput" });
  }
}
function __c232(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MetadataKey: S.optional(S.String), MetadataValue: S.optional(S.String) }),
      ).annotate({ identifier: "MetadataKeyValuePair" });
  }
}
function __c233(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SchemaArn: S.optional(S.String),
          SchemaName: S.optional(S.String),
          RegistryName: S.optional(S.String),
          LatestVersion: S.optional(S.Boolean),
          VersionNumber: S.optional(S.Number),
          SchemaVersionId: S.optional(S.String),
          MetadataKey: S.optional(S.String),
          MetadataValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutSchemaVersionMetadataResponse" });
  }
}
function __c234(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, RunId: S.String, RunProperties: __S(9920, __c310, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutWorkflowRunPropertiesRequest" });
  }
}
function __c235(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(7424, __c232, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          SchemaId: S.optional(__S(9952, __c311, 0)),
          SchemaVersionNumber: S.optional(__S(4928, __c154, 0)),
          SchemaVersionId: S.optional(S.String),
          MetadataList: S.optional(__S(7520, __c235, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "QuerySchemaVersionMetadataInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ MetadataValue: S.optional(S.String), CreatedTime: S.optional(S.String) }),
      ).annotate({ identifier: "OtherMetadataValueListItem" });
    case 3:
      return S.Array(__S(7522, __c235, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          MetadataValue: S.optional(S.String),
          CreatedTime: S.optional(S.String),
          OtherMetadataValueList: S.optional(__S(7523, __c235, 3)),
        }),
      ).annotate({ identifier: "MetadataInfo" });
    case 5:
      return S.Record(S.String, /*@__PURE__*/ __S(7524, __c235, 4).pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          MetadataInfoMap: S.optional(__S(7525, __c235, 5)),
          SchemaVersionId: S.optional(S.String),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "QuerySchemaVersionMetadataResponse" });
  }
}
function __c236(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Url: S.optional(__S(1920, __c60, 0)),
          AdditionalRequestParameters: S.optional(__S(1921, __c60, 1)),
        }),
      ).annotate({ identifier: "ConnectionPropertiesConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TokenUrl: S.optional(__S(1920, __c60, 0)),
          RequestMethod: S.optional(S.String),
          ContentType: S.optional(S.String),
          ClientId: S.optional(__S(1920, __c60, 0)),
          ClientSecret: S.optional(__S(1920, __c60, 0)),
          Scope: S.optional(__S(1920, __c60, 0)),
          TokenUrlParameters: S.optional(__S(1921, __c60, 1)),
        }),
      ).annotate({ identifier: "ClientCredentialsProperties" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TokenUrl: S.optional(__S(1920, __c60, 0)),
          RequestMethod: S.optional(S.String),
          ContentType: S.optional(S.String),
          JwtToken: S.optional(__S(1920, __c60, 0)),
          TokenUrlParameters: S.optional(__S(1921, __c60, 1)),
        }),
      ).annotate({ identifier: "JWTBearerProperties" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AuthorizationCodeUrl: S.optional(__S(1920, __c60, 0)),
          AuthorizationCode: S.optional(__S(1920, __c60, 0)),
          RedirectUri: S.optional(__S(1920, __c60, 0)),
          TokenUrl: S.optional(__S(1920, __c60, 0)),
          RequestMethod: S.optional(S.String),
          ContentType: S.optional(S.String),
          ClientId: S.optional(__S(1920, __c60, 0)),
          ClientSecret: S.optional(__S(1920, __c60, 0)),
          Scope: S.optional(__S(1920, __c60, 0)),
          Prompt: S.optional(__S(1920, __c60, 0)),
          TokenUrlParameters: S.optional(__S(1921, __c60, 1)),
        }),
      ).annotate({ identifier: "ConnectorAuthorizationCodeProperties" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          OAuth2GrantType: S.String,
          ClientCredentialsProperties: S.optional(__S(7553, __c236, 1)),
          JWTBearerProperties: S.optional(__S(7554, __c236, 2)),
          AuthorizationCodeProperties: S.optional(__S(7555, __c236, 3)),
        }),
      ).annotate({ identifier: "ConnectorOAuth2Properties" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Username: S.optional(__S(1920, __c60, 0)),
          Password: S.optional(__S(1920, __c60, 0)),
        }),
      ).annotate({ identifier: "BasicAuthenticationProperties" });
    case 6:
      return S.suspend(() => S.Struct({ AuthenticationParameters: __S(1921, __c60, 1) })).annotate({
        identifier: "CustomAuthenticationProperties",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AuthenticationTypes: __S(10400, __c325, 0),
          OAuth2Properties: S.optional(__S(7556, __c236, 4)),
          BasicAuthenticationProperties: S.optional(__S(7557, __c236, 5)),
          CustomAuthenticationProperties: S.optional(__S(7558, __c236, 6)),
        }),
      ).annotate({ identifier: "ConnectorAuthenticationConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ConnectionType: S.String,
          IntegrationType: S.String,
          Description: S.optional(S.String),
          ConnectionProperties: __S(7552, __c236, 0),
          ConnectorAuthenticationConfiguration: __S(7559, __c236, 7),
          RestConfiguration: __S(1937, __c60, 17),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterConnectionTypeRequest" });
    case 9:
      return S.suspend(() => S.Struct({ ConnectionTypeArn: S.optional(S.String) })).annotate({
        identifier: "RegisterConnectionTypeResponse",
      });
  }
}
function __c237(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SchemaId: __S(9952, __c311, 0), SchemaDefinition: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterSchemaVersionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SchemaVersionId: S.optional(S.String),
          VersionNumber: S.optional(S.Number),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegisterSchemaVersionResponse" });
  }
}
function __c238(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SchemaId: S.optional(__S(9952, __c311, 0)),
          SchemaVersionNumber: S.optional(__S(4928, __c154, 0)),
          SchemaVersionId: S.optional(S.String),
          MetadataKeyValue: __S(7424, __c232, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveSchemaVersionMetadataInput" });
  }
}
function __c239(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobName: S.String, RunId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResetJobBookmarkRequest" });
  }
}
function __c240(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, RunId: S.String, NodeIds: __S(9792, __c306, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResumeWorkflowRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RunId: S.optional(S.String), NodeIds: S.optional(__S(9792, __c306, 0)) }),
      ).annotate({ identifier: "ResumeWorkflowRunResponse" });
  }
}
function __c241(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String, Code: S.String, RequestOrigin: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RunStatementRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Id: S.optional(S.Number) })).annotate({
        identifier: "RunStatementResponse",
      });
  }
}
function __c242(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Attribute: S.String, Order: S.optional(S.String) }),
      ).annotate({ identifier: "SearchSort" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(7750, __c242, 6)).annotate({
          identifier: "SearchFilterClause",
        }),
      );
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ StringValue: S.String }),
        /*@__PURE__*/ S.Struct({ LongValue: S.Number }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          Attribute: S.String,
          Operator: S.String,
          Value: S.optional(__S(7746, __c242, 2)),
        }),
      ).annotate({ identifier: "SearchAttributeFilter" });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ StringValue: S.String })]);
    case 5:
      return S.suspend(() =>
        S.Struct({ Attribute: S.String, Key: S.String, Value: __S(7748, __c242, 4) }),
      ).annotate({ identifier: "SearchMapFilter" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({
          AndAllFilters: /*@__PURE__*/ S.suspend(() => __S(7745, __c242, 1)).annotate({
            identifier: "SearchFilterClauseList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          OrAnyFilters: /*@__PURE__*/ S.suspend(() => __S(7745, __c242, 1)).annotate({
            identifier: "SearchFilterClauseList",
          }),
        }),
        /*@__PURE__*/ S.Struct({ AttributeFilter: __S(7747, __c242, 3) }),
        /*@__PURE__*/ S.Struct({ MapFilter: __S(7749, __c242, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          SearchText: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Sort: S.optional(__S(7744, __c242, 0)),
          FilterClause: S.optional(__S(7750, __c242, 6)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/search-assets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SearchAssetsInput" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          AssetName: S.optional(S.String),
          AssetDescription: S.optional(S.String),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AssetTypeId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchResultItem" });
    case 9:
      return S.Array(__S(7752, __c242, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(7753, __c242, 9)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchAssetsOutput" });
  }
}
function __c243(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Value: S.optional(S.String),
          Comparator: S.optional(S.String),
        }),
      ).annotate({ identifier: "PropertyPredicate" });
    case 1:
      return S.Array(__S(7776, __c243, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ FieldName: S.optional(S.String), Sort: S.optional(S.String) }),
      ).annotate({ identifier: "SortCriterion" });
    case 3:
      return S.Array(__S(7778, __c243, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(7777, __c243, 1)),
          SearchText: S.optional(S.String),
          SortCriteria: S.optional(__S(7779, __c243, 3)),
          MaxResults: S.optional(S.Number),
          ResourceShareType: S.optional(S.String),
          IncludeStatusDetails: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchTablesRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), TableList: S.optional(__S(5344, __c167, 0)) }),
      ).annotate({ identifier: "SearchTablesResponse" });
  }
}
function __c244(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlueprintName: S.String,
          Parameters: S.optional(S.String),
          RoleArn: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartBlueprintRunRequest" });
  }
}
function __c245(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RunId: S.optional(S.String) })).annotate({
        identifier: "StartBlueprintRunResponse",
      });
  }
}
function __c246(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          ColumnNameList: S.optional(__S(9792, __c306, 0)),
          Role: S.String,
          SampleSize: S.optional(S.Number),
          CatalogID: S.optional(S.String),
          SecurityConfiguration: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartColumnStatisticsTaskRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ColumnStatisticsTaskRunId: S.optional(S.String) }),
      ).annotate({ identifier: "StartColumnStatisticsTaskRunResponse" });
  }
}
function __c247(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          CatalogID: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartColumnStatisticsTaskRunScheduleRequest" });
  }
}
function __c248(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartCrawlerRequest" });
  }
}
function __c249(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CrawlerName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartCrawlerScheduleRequest" });
  }
}
function __c250(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSource: __S(10657, __c333, 1),
          Role: S.String,
          NumberOfWorkers: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          CreatedRulesetName: S.optional(S.String),
          DataQualitySecurityConfiguration: S.optional(S.String),
          ClientToken: S.optional(S.String),
          AdditionalRunOptions: S.optional(__S(3456, __c108, 0)),
          RecommendationMode: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDataQualityRuleRecommendationRunRequest" });
  }
}
function __c251(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataSource: __S(10657, __c333, 1),
          Role: S.String,
          NumberOfWorkers: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          ClientToken: S.optional(S.String),
          AdditionalRunOptions: S.optional(__S(10790, __c337, 6)),
          RulesetNames: __S(9792, __c306, 0),
          AdditionalDataSources: S.optional(__S(10791, __c337, 7)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDataQualityRulesetEvaluationRunRequest" });
  }
}
function __c252(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransformId: S.String, OutputS3Path: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartExportLabelsTaskRunRequest" });
  }
}
function __c253(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TaskRunId: S.optional(S.String) })).annotate({
        identifier: "StartExportLabelsTaskRunResponse",
      });
  }
}
function __c254(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TransformId: S.String,
          InputS3Path: S.String,
          ReplaceAllLabels: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartImportLabelsTaskRunRequest" });
  }
}
function __c255(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.String,
          JobRunQueuingEnabled: S.optional(S.Boolean),
          JobRunId: S.optional(S.String),
          Arguments: S.optional(__S(9920, __c310, 0)),
          AllocatedCapacity: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          MaxCapacity: S.optional(S.Number),
          SecurityConfiguration: S.optional(S.String),
          NotificationProperty: S.optional(__S(11072, __c346, 0)),
          WorkerType: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          ExecutionClass: S.optional(S.String),
          ExecutionRoleSessionPolicy: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartJobRunRequest" });
    case 1:
      return S.suspend(() => S.Struct({ JobRunId: S.optional(S.String) })).annotate({
        identifier: "StartJobRunResponse",
      });
  }
}
function __c256(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.String,
          DatabaseName: S.String,
          TableName: S.String,
          FullRefresh: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartMaterializedViewRefreshTaskRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MaterializedViewRefreshTaskRunId: S.optional(S.String) }),
      ).annotate({ identifier: "StartMaterializedViewRefreshTaskRunResponse" });
  }
}
function __c257(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransformId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartMLEvaluationTaskRunRequest" });
  }
}
function __c258(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransformId: S.String, OutputS3Path: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartMLLabelingSetGenerationTaskRunRequest" });
  }
}
function __c259(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartTriggerRequest" });
  }
}
function __c260(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, RunProperties: S.optional(__S(9920, __c310, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartWorkflowRunRequest" });
  }
}
function __c261(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          CatalogID: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StopColumnStatisticsTaskRunRequest" });
  }
}
function __c262(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          CatalogID: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StopColumnStatisticsTaskRunScheduleRequest" });
  }
}
function __c263(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopCrawlerRequest" });
  }
}
function __c264(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CrawlerName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopCrawlerScheduleRequest" });
  }
}
function __c265(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CatalogId: S.String, DatabaseName: S.String, TableName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopMaterializedViewRefreshTaskRunRequest" });
  }
}
function __c266(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, RequestOrigin: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopSessionRequest" });
  }
}
function __c267(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopTriggerRequest" });
  }
}
function __c268(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, RunId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopWorkflowRunRequest" });
  }
}
function __c269(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagsToAdd: __S(9920, __c310, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c270(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionType: S.String,
          ConnectionProperties: __S(11104, __c347, 0),
          AuthenticationConfiguration: S.optional(__S(12580, __c393, 4)),
        }),
      ).annotate({ identifier: "TestConnectionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionName: S.optional(S.String),
          CatalogId: S.optional(S.String),
          TestConnectionInput: S.optional(__S(8640, __c270, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TestConnectionRequest" });
  }
}
function __c271(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagsToRemove: __S(9792, __c306, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c272(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/assets/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAssetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateAssetResponse" });
  }
}
function __c273(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          BlueprintLocation: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateBlueprintRequest" });
  }
}
function __c274(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CatalogId: S.String, CatalogInput: __S(12323, __c385, 3) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateCatalogRequest" });
  }
}
function __c275(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Classification: S.optional(S.String),
          GrokPattern: S.optional(S.String),
          CustomPatterns: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateGrokClassifierRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Classification: S.optional(S.String),
          RowTag: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateXMLClassifierRequest" });
    case 2:
      return S.suspend(() => S.Struct({ Name: S.String, JsonPath: S.optional(S.String) })).annotate(
        { identifier: "UpdateJsonClassifierRequest" },
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          GrokClassifier: S.optional(__S(8800, __c275, 0)),
          XMLClassifier: S.optional(__S(8801, __c275, 1)),
          JsonClassifier: S.optional(__S(8802, __c275, 2)),
          CsvClassifier: S.optional(__S(12416, __c388, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateClassifierRequest" });
  }
}
function __c276(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          PartitionValues: __S(9792, __c306, 0),
          ColumnStatisticsList: __S(2633, __c82, 9),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateColumnStatisticsForPartitionRequest" });
  }
}
function __c277(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ColumnStatistics: S.optional(__S(2632, __c82, 8)),
          Error: S.optional(__S(9856, __c308, 0)),
        }),
      ).annotate({ identifier: "ColumnStatisticsError" });
    case 1:
      return S.Array(__S(8864, __c277, 0));
    case 2:
      return S.suspend(() => S.Struct({ Errors: S.optional(__S(8865, __c277, 1)) })).annotate({
        identifier: "UpdateColumnStatisticsForPartitionResponse",
      });
  }
}
function __c278(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          ColumnStatisticsList: __S(2633, __c82, 9),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateColumnStatisticsForTableRequest" });
  }
}
function __c279(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          Role: S.optional(S.String),
          Schedule: S.optional(S.String),
          ColumnNameList: S.optional(__S(9792, __c306, 0)),
          SampleSize: S.optional(S.Number),
          CatalogID: S.optional(S.String),
          SecurityConfiguration: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateColumnStatisticsTaskSettingsRequest" });
  }
}
function __c280(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          Name: S.String,
          ConnectionInput: __S(12608, __c394, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateConnectionRequest" });
  }
}
function __c281(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Role: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          Description: S.optional(S.String),
          Targets: S.optional(__S(10446, __c326, 14)),
          Schedule: S.optional(S.String),
          Classifiers: S.optional(__S(9792, __c306, 0)),
          TablePrefix: S.optional(S.String),
          SchemaChangePolicy: S.optional(__S(10448, __c326, 16)),
          RecrawlPolicy: S.optional(__S(10447, __c326, 15)),
          LineageConfiguration: S.optional(__S(10449, __c326, 17)),
          LakeFormationConfiguration: S.optional(__S(10450, __c326, 18)),
          Configuration: S.optional(S.String),
          CrawlerSecurityConfiguration: S.optional(S.String),
          CatalogId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateCrawlerRequest" });
  }
}
function __c282(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CrawlerName: S.String, Schedule: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateCrawlerScheduleRequest" });
  }
}
function __c283(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          Name: S.String,
          DatabaseInput: __S(12768, __c399, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDatabaseRequest" });
  }
}
function __c284(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Ruleset: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDataQualityRulesetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Ruleset: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateDataQualityRulesetResponse" });
  }
}
function __c285(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExtraPythonLibsS3Path: S.optional(S.String),
          ExtraJarsS3Path: S.optional(S.String),
        }),
      ).annotate({ identifier: "DevEndpointCustomLibraries" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EndpointName: S.String,
          PublicKey: S.optional(S.String),
          AddPublicKeys: S.optional(__S(9792, __c306, 0)),
          DeletePublicKeys: S.optional(__S(9792, __c306, 0)),
          CustomLibraries: S.optional(__S(9120, __c285, 0)),
          UpdateEtlLibraries: S.optional(S.Boolean),
          DeleteArguments: S.optional(__S(9792, __c306, 0)),
          AddArguments: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDevEndpointRequest" });
  }
}
function __c286(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/glossaries/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGlossaryRequest" });
  }
}
function __c287(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Name: S.optional(S.String),
          ShortDescription: S.optional(S.String),
          LongDescription: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/glossary-terms/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGlossaryTermRequest" });
  }
}
function __c288(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Scopes: S.optional(__S(9792, __c306, 0)),
          UserBackgroundSessionsEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateGlueIdentityCenterConfigurationRequest" });
  }
}
function __c289(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          SourceProcessingProperties: S.optional(__S(13248, __c414, 0)),
          TargetProcessingProperties: S.optional(__S(13249, __c414, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateIntegrationResourcePropertyRequest" });
  }
}
function __c290(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          TableName: S.String,
          SourceTableConfig: S.optional(__S(13344, __c417, 0)),
          TargetTableConfig: S.optional(__S(13347, __c417, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateIntegrationTablePropertiesRequest" });
  }
}
function __c291(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobMode: S.optional(S.String),
          JobRunQueuingEnabled: S.optional(S.Boolean),
          Description: S.optional(S.String),
          LogUri: S.optional(S.String),
          Role: S.optional(S.String),
          ExecutionProperty: S.optional(__S(11168, __c349, 0)),
          Command: S.optional(__S(11169, __c349, 1)),
          DefaultArguments: S.optional(__S(9920, __c310, 0)),
          NonOverridableArguments: S.optional(__S(9920, __c310, 0)),
          Connections: S.optional(__S(11136, __c348, 0)),
          MaxRetries: S.optional(S.Number),
          AllocatedCapacity: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          MaxCapacity: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          SecurityConfiguration: S.optional(S.String),
          NotificationProperty: S.optional(__S(11072, __c346, 0)),
          GlueVersion: S.optional(S.String),
          CodeGenConfigurationNodes: S.optional(__S(11289, __c352, 25)),
          ExecutionClass: S.optional(S.String),
          SourceControlDetails: S.optional(__S(11290, __c352, 26)),
          MaintenanceWindow: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({ JobName: S.String, JobUpdate: __S(9312, __c291, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateJobRequest" });
  }
}
function __c292(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.optional(S.String),
          Provider: S.optional(S.String),
          RepositoryName: S.optional(S.String),
          RepositoryOwner: S.optional(S.String),
          BranchName: S.optional(S.String),
          Folder: S.optional(S.String),
          CommitId: S.optional(S.String),
          AuthStrategy: S.optional(S.String),
          AuthToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateJobFromSourceControlRequest" });
  }
}
function __c293(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TransformId: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Parameters: S.optional(__S(13505, __c422, 1)),
          Role: S.optional(S.String),
          GlueVersion: S.optional(S.String),
          MaxCapacity: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          MaxRetries: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateMLTransformRequest" });
  }
}
function __c294(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          PartitionValueList: __S(9792, __c306, 0),
          PartitionInput: __S(10016, __c313, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePartitionRequest" });
  }
}
function __c295(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistryId: __S(13696, __c428, 0), Description: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRegistryInput" });
  }
}
function __c296(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SchemaId: __S(9952, __c311, 0),
          SchemaVersionNumber: S.optional(__S(4928, __c154, 0)),
          Compatibility: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSchemaInput" });
  }
}
function __c297(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.optional(S.String),
          Provider: S.optional(S.String),
          RepositoryName: S.optional(S.String),
          RepositoryOwner: S.optional(S.String),
          BranchName: S.optional(S.String),
          Folder: S.optional(S.String),
          CommitId: S.optional(S.String),
          AuthStrategy: S.optional(S.String),
          AuthToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSourceControlFromJobRequest" });
  }
}
function __c298(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyId: S.String,
          EncryptedKeyMetadata: S.String,
          EncryptedById: S.optional(S.String),
          Properties: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "IcebergEncryptedKey" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Schema: __S(198, __c6, 6),
          PartitionSpec: S.optional(__S(201, __c6, 9)),
          SortOrder: S.optional(__S(204, __c6, 12)),
          Location: S.String,
          Properties: S.optional(__S(9920, __c310, 0)),
          Action: S.optional(S.String),
          EncryptionKey: S.optional(__S(9536, __c298, 0)),
          KeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "IcebergTableUpdate" });
    case 2:
      return S.Array(__S(9537, __c298, 1));
    case 3:
      return S.suspend(() => S.Struct({ Updates: __S(9538, __c298, 2) })).annotate({
        identifier: "UpdateIcebergTableInput",
      });
    case 4:
      return S.suspend(() => S.Struct({ UpdateIcebergTableInput: __S(9539, __c298, 3) })).annotate({
        identifier: "UpdateIcebergInput",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ UpdateIcebergInput: S.optional(__S(9540, __c298, 4)) }),
      ).annotate({ identifier: "UpdateOpenTableFormatInput" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          Name: S.optional(S.String),
          TableInput: S.optional(__S(227, __c7, 3)),
          SkipArchive: S.optional(S.Boolean),
          TransactionId: S.optional(S.String),
          VersionId: S.optional(S.String),
          ViewUpdateAction: S.optional(S.String),
          Force: S.optional(S.Boolean),
          UpdateOpenTableFormatInput: S.optional(__S(9541, __c298, 5)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTableRequest" });
  }
}
function __c299(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.String,
          DatabaseName: S.String,
          TableName: S.String,
          Type: S.String,
          TableOptimizerConfiguration: __S(11495, __c359, 7),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTableOptimizerRequest" });
  }
}
function __c300(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Schedule: S.optional(S.String),
          Actions: S.optional(__S(11649, __c364, 1)),
          Predicate: S.optional(__S(11652, __c364, 4)),
          EventBatchingCondition: S.optional(__S(11653, __c364, 5)),
        }),
      ).annotate({ identifier: "TriggerUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.String, TriggerUpdate: __S(9600, __c300, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateTriggerRequest" });
  }
}
function __c301(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Configuration: __S(354, __c11, 2),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUsageProfileRequest" });
  }
}
function __c302(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          FunctionName: S.String,
          FunctionInput: __S(448, __c14, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUserDefinedFunctionRequest" });
  }
}
function __c303(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          DefaultRunProperties: S.optional(__S(9920, __c310, 0)),
          MaxConcurrentRuns: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateWorkflowRequest" });
  }
}
function __c304(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
          IterableFormName: S.optional(S.String),
          ItemIdentifier: S.optional(S.String),
          GlossaryTermIdentifiers: __S(9792, __c306, 0),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assets/{AssetIdentifier}/associate-glossary-terms" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateGlossaryTermsRequest" });
  }
}
function __c305(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetIdentifier: S.optional(S.String),
          IterableFormName: S.optional(S.String),
          ItemIdentifier: S.optional(S.String),
          GlossaryTerms: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "AssociateGlossaryTermsResponse" });
  }
}
function __c306(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c307(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(10016, __c313, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          PartitionInputList: __S(9824, __c307, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchCreatePartitionRequest" });
  }
}
function __c308(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorDetail" });
  }
}
function __c309(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PartitionValues: S.optional(__S(9792, __c306, 0)),
          ErrorDetail: S.optional(__S(9856, __c308, 0)),
        }),
      ).annotate({ identifier: "PartitionError" });
    case 1:
      return S.Array(__S(9888, __c309, 0));
    case 2:
      return S.suspend(() => S.Struct({ Errors: S.optional(__S(9889, __c309, 1)) })).annotate({
        identifier: "BatchCreatePartitionResponse",
      });
  }
}
function __c310(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c311(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SchemaArn: S.optional(S.String),
          SchemaName: S.optional(S.String),
          RegistryName: S.optional(S.String),
        }),
      ).annotate({ identifier: "SchemaId" });
  }
}
function __c312(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Type: S.optional(S.String),
          Comment: S.optional(S.String),
          Parameters: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "Column" });
    case 1:
      return S.Array(__S(9984, __c312, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          SerializationLibrary: S.optional(S.String),
          Parameters: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "SerDeInfo" });
    case 3:
      return S.suspend(() => S.Struct({ Column: S.String, SortOrder: S.Number })).annotate({
        identifier: "Order",
      });
    case 4:
      return S.Array(__S(9987, __c312, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          SkewedColumnNames: S.optional(__S(9792, __c306, 0)),
          SkewedColumnValues: S.optional(__S(9792, __c306, 0)),
          SkewedColumnValueLocationMaps: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "SkewedInfo" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          SchemaId: S.optional(__S(9952, __c311, 0)),
          SchemaVersionId: S.optional(S.String),
          SchemaVersionNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SchemaReference" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Columns: S.optional(__S(9985, __c312, 1)),
          Location: S.optional(S.String),
          AdditionalLocations: S.optional(__S(9792, __c306, 0)),
          InputFormat: S.optional(S.String),
          OutputFormat: S.optional(S.String),
          Compressed: S.optional(S.Boolean),
          NumberOfBuckets: S.optional(S.Number),
          SerdeInfo: S.optional(__S(9986, __c312, 2)),
          BucketColumns: S.optional(__S(9792, __c306, 0)),
          SortColumns: S.optional(__S(9988, __c312, 4)),
          Parameters: S.optional(__S(9920, __c310, 0)),
          SkewedInfo: S.optional(__S(9989, __c312, 5)),
          StoredAsSubDirectories: S.optional(S.Boolean),
          SchemaReference: S.optional(__S(9990, __c312, 6)),
        }),
      ).annotate({ identifier: "StorageDescriptor" });
  }
}
function __c313(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Values: S.optional(__S(9792, __c306, 0)),
          LastAccessTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StorageDescriptor: S.optional(__S(9991, __c312, 7)),
          Parameters: S.optional(__S(9920, __c310, 0)),
          LastAnalyzedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PartitionInput" });
  }
}
function __c314(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          ConnectionNameList: __S(9792, __c306, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchDeleteConnectionRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(9856, __c308, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Succeeded: S.optional(__S(9792, __c306, 0)),
          Errors: S.optional(__S(10049, __c314, 1)),
        }),
      ).annotate({ identifier: "BatchDeleteConnectionResponse" });
  }
}
function __c315(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          PartitionsToDelete: __S(10113, __c316, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchDeletePartitionRequest" });
  }
}
function __c316(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Values: __S(9792, __c306, 0) })).annotate({
        identifier: "PartitionValueList",
      });
    case 1:
      return S.Array(__S(10112, __c316, 0));
  }
}
function __c317(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TablesToDelete: __S(9792, __c306, 0),
          TransactionId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchDeleteTableRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TableName: S.optional(S.String),
          ErrorDetail: S.optional(__S(9856, __c308, 0)),
        }),
      ).annotate({ identifier: "TableError" });
    case 2:
      return S.Array(__S(10145, __c317, 1));
    case 3:
      return S.suspend(() => S.Struct({ Errors: S.optional(__S(10146, __c317, 2)) })).annotate({
        identifier: "BatchDeleteTableResponse",
      });
  }
}
function __c318(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          VersionIds: __S(9792, __c306, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchDeleteTableVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TableName: S.optional(S.String),
          VersionId: S.optional(S.String),
          ErrorDetail: S.optional(__S(9856, __c308, 0)),
        }),
      ).annotate({ identifier: "TableVersionError" });
    case 2:
      return S.Array(__S(10177, __c318, 1));
    case 3:
      return S.suspend(() => S.Struct({ Errors: S.optional(__S(10178, __c318, 2)) })).annotate({
        identifier: "BatchDeleteTableVersionResponse",
      });
  }
}
function __c319(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Names: __S(9792, __c306, 0),
          IncludeBlueprint: S.optional(S.Boolean),
          IncludeParameterSpec: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchGetBlueprintsRequest" });
    case 1:
      return S.Array(__S(10241, __c320, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Blueprints: S.optional(__S(10209, __c319, 1)),
          MissingBlueprints: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "BatchGetBlueprintsResponse" });
  }
}
function __c320(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ParameterSpec: S.optional(S.String),
          BlueprintLocation: S.optional(S.String),
          BlueprintServiceLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "LastActiveDefinition" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ParameterSpec: S.optional(S.String),
          BlueprintLocation: S.optional(S.String),
          BlueprintServiceLocation: S.optional(S.String),
          Status: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          LastActiveDefinition: S.optional(__S(10240, __c320, 0)),
        }),
      ).annotate({ identifier: "Blueprint" });
  }
}
function __c321(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CrawlerNames: __S(9792, __c306, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetCrawlersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Crawlers: S.optional(__S(10368, __c324, 0)),
          CrawlersNotFound: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "BatchGetCrawlersResponse" });
  }
}
function __c322(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScheduleExpression: S.optional(S.String), State: S.optional(S.String) }),
      ).annotate({ identifier: "Schedule" });
  }
}
function __c323(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          LogGroup: S.optional(S.String),
          LogStream: S.optional(S.String),
          MessagePrefix: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LastCrawlInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Role: S.optional(S.String),
          Targets: S.optional(__S(10446, __c326, 14)),
          DatabaseName: S.optional(S.String),
          Description: S.optional(S.String),
          Classifiers: S.optional(__S(9792, __c306, 0)),
          RecrawlPolicy: S.optional(__S(10447, __c326, 15)),
          SchemaChangePolicy: S.optional(__S(10448, __c326, 16)),
          LineageConfiguration: S.optional(__S(10449, __c326, 17)),
          State: S.optional(S.String),
          TablePrefix: S.optional(S.String),
          Schedule: S.optional(__S(10304, __c322, 0)),
          CrawlElapsedTime: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastCrawl: S.optional(__S(10336, __c323, 0)),
          Version: S.optional(S.Number),
          Configuration: S.optional(S.String),
          CrawlerSecurityConfiguration: S.optional(S.String),
          LakeFormationConfiguration: S.optional(__S(10450, __c326, 18)),
          CatalogId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Crawler" });
  }
}
function __c324(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(10337, __c323, 1));
  }
}
function __c325(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c326(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Path: S.optional(S.String),
          Exclusions: S.optional(__S(9792, __c306, 0)),
          ConnectionName: S.optional(S.String),
          SampleSize: S.optional(S.Number),
          EventQueueArn: S.optional(S.String),
          DlqEventQueueArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Target" });
    case 1:
      return S.Array(__S(10432, __c326, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectionName: S.optional(S.String),
          Path: S.optional(S.String),
          Exclusions: S.optional(__S(9792, __c306, 0)),
          EnableAdditionalMetadata: S.optional(__S(10400, __c325, 0)),
        }),
      ).annotate({ identifier: "JdbcTarget" });
    case 3:
      return S.Array(__S(10434, __c326, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ConnectionName: S.optional(S.String),
          Path: S.optional(S.String),
          ScanAll: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MongoDBTarget" });
    case 5:
      return S.Array(__S(10436, __c326, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Path: S.optional(S.String),
          scanAll: S.optional(S.Boolean),
          scanRate: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DynamoDBTarget" });
    case 7:
      return S.Array(__S(10438, __c326, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          Tables: __S(9792, __c306, 0),
          ConnectionName: S.optional(S.String),
          EventQueueArn: S.optional(S.String),
          DlqEventQueueArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CatalogTarget" });
    case 9:
      return S.Array(__S(10440, __c326, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          DeltaTables: S.optional(__S(9792, __c306, 0)),
          ConnectionName: S.optional(S.String),
          WriteManifest: S.optional(S.Boolean),
          CreateNativeDeltaTable: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeltaTarget" });
    case 11:
      return S.Array(__S(10442, __c326, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          Paths: S.optional(__S(9792, __c306, 0)),
          ConnectionName: S.optional(S.String),
          Exclusions: S.optional(__S(9792, __c306, 0)),
          MaximumTraversalDepth: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IcebergTarget" });
    case 13:
      return S.Array(__S(10444, __c326, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          S3Targets: S.optional(__S(10433, __c326, 1)),
          JdbcTargets: S.optional(__S(10435, __c326, 3)),
          MongoDBTargets: S.optional(__S(10437, __c326, 5)),
          DynamoDBTargets: S.optional(__S(10439, __c326, 7)),
          CatalogTargets: S.optional(__S(10441, __c326, 9)),
          DeltaTargets: S.optional(__S(10443, __c326, 11)),
          IcebergTargets: S.optional(__S(10445, __c326, 13)),
          HudiTargets: S.optional(__S(10445, __c326, 13)),
        }),
      ).annotate({ identifier: "CrawlerTargets" });
    case 15:
      return S.suspend(() => S.Struct({ RecrawlBehavior: S.optional(S.String) })).annotate({
        identifier: "RecrawlPolicy",
      });
    case 16:
      return S.suspend(() =>
        S.Struct({ UpdateBehavior: S.optional(S.String), DeleteBehavior: S.optional(S.String) }),
      ).annotate({ identifier: "SchemaChangePolicy" });
    case 17:
      return S.suspend(() => S.Struct({ CrawlerLineageSettings: S.optional(S.String) })).annotate({
        identifier: "LineageConfiguration",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({
          UseLakeFormationCredentials: S.optional(S.Boolean),
          AccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LakeFormationConfiguration" });
  }
}
function __c327(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Names: __S(9792, __c306, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetCustomEntityTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CustomEntityTypes: S.optional(__S(10497, __c328, 1)),
          CustomEntityTypesNotFound: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "BatchGetCustomEntityTypesResponse" });
  }
}
function __c328(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          RegexString: S.String,
          ContextWords: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "CustomEntityType" });
    case 1:
      return S.Array(__S(10496, __c328, 0));
  }
}
function __c329(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResultIds: __S(9792, __c306, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetDataQualityResultRequest" });
    case 1:
      return S.Array(__S(10603, __c331, 11));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Results: __S(10529, __c329, 1),
          ResultsNotFound: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "BatchGetDataQualityResultResponse" });
  }
}
function __c330(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
  }
}
function __c331(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          EvaluationMessage: S.optional(SensitiveString),
          Result: S.optional(S.String),
          EvaluatedMetrics: S.optional(__S(10592, __c331, 0)),
          EvaluatedRule: S.optional(SensitiveString),
          RuleMetrics: S.optional(__S(10592, __c331, 0)),
          Labels: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "DataQualityRuleResult" });
    case 2:
      return S.Array(__S(10593, __c331, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(10624, __c332, 0).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          EvaluationMessage: S.optional(SensitiveString),
          EvaluatedMetrics: S.optional(__S(10592, __c331, 0)),
          EvaluatedDistributions: S.optional(__S(10595, __c331, 3)),
        }),
      ).annotate({ identifier: "DataQualityAnalyzerResult" });
    case 5:
      return S.Array(__S(10596, __c331, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          ActualValue: S.optional(S.Number),
          ExpectedValue: S.optional(S.Number),
          LowerLimit: S.optional(S.Number),
          UpperLimit: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DataQualityMetricValues" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.optional(S.String),
          StatisticId: S.optional(S.String),
          MetricValues: S.optional(__S(10598, __c331, 6)),
          NewRules: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "MetricBasedObservation" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(SensitiveString),
          MetricBasedObservation: S.optional(__S(10599, __c331, 7)),
        }),
      ).annotate({ identifier: "DataQualityObservation" });
    case 9:
      return S.Array(__S(10600, __c331, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          TotalRowsProcessed: S.optional(S.Number),
          TotalRowsPassed: S.optional(S.Number),
          TotalRowsFailed: S.optional(S.Number),
          TotalRulesProcessed: S.optional(S.Number),
          TotalRulesPassed: S.optional(S.Number),
          TotalRulesFailed: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DataQualityAggregatedMetrics" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          ResultId: S.optional(S.String),
          ProfileId: S.optional(S.String),
          Score: S.optional(S.Number),
          DataSource: S.optional(__S(10657, __c333, 1)),
          RulesetName: S.optional(S.String),
          EvaluationContext: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          JobName: S.optional(S.String),
          JobRunId: S.optional(S.String),
          RulesetEvaluationRunId: S.optional(S.String),
          RuleResults: S.optional(__S(10594, __c331, 2)),
          AnalyzerResults: S.optional(__S(10597, __c331, 5)),
          Observations: S.optional(__S(10601, __c331, 9)),
          AggregatedMetrics: S.optional(__S(10602, __c331, 10)),
        }),
      ).annotate({ identifier: "DataQualityResult" });
  }
}
function __c332(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BinEdges: S.optional(__S(9792, __c306, 0)),
          Count: S.optional(__S(10560, __c330, 0)),
          DataType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DistributionData" });
  }
}
function __c333(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          CatalogId: S.optional(S.String),
          ConnectionName: S.optional(S.String),
          AdditionalOptions: S.optional(__S(9920, __c310, 0)),
          PreProcessingQuery: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataQualityGlueTable" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GlueTable: S.optional(__S(10688, __c334, 0)),
          DataQualityGlueTable: S.optional(__S(10656, __c333, 0)),
        }),
      ).annotate({ identifier: "DataSource" });
  }
}
function __c334(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          CatalogId: S.optional(S.String),
          ConnectionName: S.optional(S.String),
          AdditionalOptions: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "GlueTable" });
  }
}
function __c335(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RunIds: __S(9792, __c306, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetDataQualityRulesetEvaluationRunRequest" });
    case 1:
      return S.Array(__S(10752, __c336, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Runs: S.optional(__S(10721, __c335, 1)),
          RunsNotFound: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "BatchGetDataQualityRulesetEvaluationRunResponse" });
  }
}
function __c336(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RunId: S.optional(S.String),
          DataSource: S.optional(__S(10657, __c333, 1)),
          Role: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          AdditionalRunOptions: S.optional(__S(10790, __c337, 6)),
          Status: S.optional(S.String),
          ErrorString: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExecutionTime: S.optional(S.Number),
          RulesetNames: S.optional(__S(9792, __c306, 0)),
          ResultIds: S.optional(__S(9792, __c306, 0)),
          AdditionalDataSources: S.optional(__S(10791, __c337, 7)),
        }),
      ).annotate({ identifier: "DataQualityRulesetEvaluationRun" });
  }
}
function __c337(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.optional(S.String),
          TableName: S.optional(S.String),
          S3Location: S.optional(S.String),
          CatalogId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CatalogTableConfigOptions" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MaxRowsToWrite: S.optional(S.Number),
          ResultType: S.optional(S.String),
          CatalogTableConfig: S.optional(__S(10784, __c337, 0)),
        }),
      ).annotate({ identifier: "RowLevelResultsOptions" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          WriteDistributionResultsEnabled: S.optional(S.Boolean),
          CatalogTableConfig: S.optional(__S(10784, __c337, 0)),
        }),
      ).annotate({ identifier: "DistributionResultsOptions" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          WriteProfilingResultsEnabled: S.optional(S.Boolean),
          CatalogTableConfig: S.optional(__S(10784, __c337, 0)),
          DistributionResults: S.optional(__S(10786, __c337, 2)),
        }),
      ).annotate({ identifier: "ProfilingResultsOptions" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          WriteDataQualityRuleResultsEnabled: S.optional(S.Boolean),
          CatalogTableConfig: S.optional(__S(10784, __c337, 0)),
        }),
      ).annotate({ identifier: "DataQualityRuleResultsOptions" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          WriteObservationResultsEnabled: S.optional(S.Boolean),
          CatalogTableConfig: S.optional(__S(10784, __c337, 0)),
        }),
      ).annotate({ identifier: "ObservationResultsOptions" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          CloudWatchMetricsEnabled: S.optional(S.Boolean),
          ResultsS3Prefix: S.optional(S.String),
          CompositeRuleEvaluationMethod: S.optional(S.String),
          CustomLogGroupPrefix: S.optional(S.String),
          RowLevelResults: S.optional(__S(10785, __c337, 1)),
          ProfilingResults: S.optional(__S(10787, __c337, 3)),
          ObservationScope: S.optional(S.String),
          ObservationMode: S.optional(S.String),
          DataQualityRuleResults: S.optional(__S(10788, __c337, 4)),
          ObservationResults: S.optional(__S(10789, __c337, 5)),
        }),
      ).annotate({ identifier: "DataQualityEvaluationRunAdditionalRunOptions" });
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(10657, __c333, 1).pipe(S.optional));
  }
}
function __c338(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DevEndpointNames: __S(9792, __c306, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetDevEndpointsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DevEndpoints: S.optional(__S(10880, __c340, 0)),
          DevEndpointsNotFound: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "BatchGetDevEndpointsResponse" });
  }
}
function __c339(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EndpointName: S.optional(S.String),
          RoleArn: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(9792, __c306, 0)),
          SubnetId: S.optional(S.String),
          YarnEndpointAddress: S.optional(S.String),
          PrivateAddress: S.optional(S.String),
          ZeppelinRemoteSparkInterpreterPort: S.optional(S.Number),
          PublicAddress: S.optional(S.String),
          Status: S.optional(S.String),
          WorkerType: S.optional(S.String),
          GlueVersion: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          NumberOfNodes: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          VpcId: S.optional(S.String),
          ExtraPythonLibsS3Path: S.optional(S.String),
          ExtraJarsS3Path: S.optional(S.String),
          FailureReason: S.optional(S.String),
          LastUpdateStatus: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PublicKey: S.optional(S.String),
          PublicKeys: S.optional(__S(9792, __c306, 0)),
          SecurityConfiguration: S.optional(S.String),
          Arguments: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "DevEndpoint" });
  }
}
function __c340(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(10848, __c339, 0));
  }
}
function __c341(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
          IterableFormName: S.String.pipe(T.HttpLabel("IterableFormName")),
          ItemIdentifiers: __S(9792, __c306, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/assets/{AssetIdentifier}/iterable-forms/{IterableFormName}/batch-get",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetIterableFormsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ItemId: S.optional(S.String),
          ItemName: S.optional(S.String),
          GlossaryTerms: S.optional(__S(9792, __c306, 0)),
          Forms: S.optional(__S(10945, __c342, 1)),
          Attachments: S.optional(__S(10945, __c342, 1)),
        }),
      ).annotate({ identifier: "IterableFormItem" });
    case 2:
      return S.Array(__S(10913, __c341, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ItemIdentifier: S.optional(S.String),
          Code: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "ItemError" });
    case 4:
      return S.Array(__S(10915, __c341, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Items: S.optional(__S(10914, __c341, 2)),
          Errors: S.optional(__S(10916, __c341, 4)),
        }),
      ).annotate({ identifier: "BatchGetIterableFormsResponse" });
  }
}
function __c342(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FormTypeId: S.optional(S.String), Content: S.optional(S.String) }),
      ).annotate({ identifier: "AssetFormEntry" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(10944, __c342, 0).pipe(S.optional));
  }
}
function __c343(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobNames: __S(9792, __c306, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Jobs: S.optional(__S(11040, __c345, 0)),
          JobsNotFound: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "BatchGetJobsResponse" });
  }
}
function __c344(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          JobMode: S.optional(S.String),
          JobRunQueuingEnabled: S.optional(S.Boolean),
          Description: S.optional(S.String),
          LogUri: S.optional(S.String),
          Role: S.optional(S.String),
          CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExecutionProperty: S.optional(__S(11168, __c349, 0)),
          Command: S.optional(__S(11169, __c349, 1)),
          DefaultArguments: S.optional(__S(9920, __c310, 0)),
          NonOverridableArguments: S.optional(__S(9920, __c310, 0)),
          Connections: S.optional(__S(11136, __c348, 0)),
          MaxRetries: S.optional(S.Number),
          AllocatedCapacity: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          MaxCapacity: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          SecurityConfiguration: S.optional(S.String),
          NotificationProperty: S.optional(__S(11072, __c346, 0)),
          GlueVersion: S.optional(S.String),
          CodeGenConfigurationNodes: S.optional(__S(11289, __c352, 25)),
          ExecutionClass: S.optional(S.String),
          SourceControlDetails: S.optional(__S(11290, __c352, 26)),
          MaintenanceWindow: S.optional(S.String),
          ProfileName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Job" });
  }
}
function __c345(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(11008, __c344, 0));
  }
}
function __c346(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ NotifyDelayAfter: S.optional(S.Number) })).annotate({
        identifier: "NotificationProperty",
      });
  }
}
function __c347(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c348(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Connections: S.optional(__S(9792, __c306, 0)) })).annotate({
        identifier: "ConnectionsList",
      });
  }
}
function __c349(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MaxConcurrentRuns: S.optional(S.Number) })).annotate({
        identifier: "ExecutionProperty",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ScriptLocation: S.optional(S.String),
          PythonVersion: S.optional(S.String),
          Runtime: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobCommand" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Type: S.optional(S.String),
          GlueStudioType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GlueStudioSchemaColumn" });
    case 3:
      return S.Array(__S(11170, __c349, 2));
    case 4:
      return S.suspend(() => S.Struct({ Columns: S.optional(__S(11171, __c349, 3)) })).annotate({
        identifier: "GlueSchema",
      });
    case 5:
      return S.Array(__S(11172, __c349, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ConnectionName: S.String,
          ConnectorName: S.String,
          ConnectionType: S.String,
          ConnectionTable: S.optional(S.String),
          SchemaName: S.String,
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "AthenaConnectorSource" });
    case 7:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 8:
      return S.suspend(() =>
        S.Struct({
          FilterPredicate: S.optional(S.String),
          PartitionColumn: S.optional(S.String),
          LowerBound: S.optional(S.Number),
          UpperBound: S.optional(S.Number),
          NumPartitions: S.optional(S.Number),
          JobBookmarkKeys: S.optional(__S(9792, __c306, 0)),
          JobBookmarkKeysSortOrder: S.optional(S.String),
          DataTypeMapping: S.optional(__S(11175, __c349, 7)),
        }),
      ).annotate({ identifier: "JDBCConnectorOptions" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ConnectionName: S.String,
          ConnectorName: S.String,
          ConnectionType: S.String,
          AdditionalOptions: S.optional(__S(11176, __c349, 8)),
          ConnectionTable: S.optional(S.String),
          Query: S.optional(S.String),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "JDBCConnectorSource" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ConnectionName: S.String,
          ConnectorName: S.String,
          ConnectionType: S.String,
          AdditionalOptions: S.optional(__S(9920, __c310, 0)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "SparkConnectorSource" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Database: S.String,
          Table: S.String,
          PartitionPredicate: S.optional(S.String),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "CatalogSource" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Database: S.String,
          Table: S.String,
          RedshiftTmpDir: S.optional(S.String),
          TmpDirIAMRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "RedshiftSource" });
    case 13:
      return S.suspend(() =>
        S.Struct({ BoundedSize: S.optional(S.Number), BoundedFiles: S.optional(S.Number) }),
      ).annotate({ identifier: "S3SourceAdditionalOptions" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Database: S.String,
          Table: S.String,
          PartitionPredicate: S.optional(S.String),
          AdditionalOptions: S.optional(__S(11181, __c349, 13)),
        }),
      ).annotate({ identifier: "S3CatalogSource" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          BoundedSize: S.optional(S.Number),
          BoundedFiles: S.optional(S.Number),
          EnableSamplePath: S.optional(S.Boolean),
          SamplePath: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3DirectSourceAdditionalOptions" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Paths: __S(9792, __c306, 0),
          CompressionType: S.optional(S.String),
          Exclusions: S.optional(__S(9792, __c306, 0)),
          GroupSize: S.optional(S.String),
          GroupFiles: S.optional(S.String),
          Recurse: S.optional(S.Boolean),
          MaxBand: S.optional(S.Number),
          MaxFilesInBand: S.optional(S.Number),
          AdditionalOptions: S.optional(__S(11183, __c349, 15)),
          Separator: S.String,
          Escaper: S.optional(S.String),
          QuoteChar: S.String,
          Multiline: S.optional(S.Boolean),
          WithHeader: S.optional(S.Boolean),
          WriteHeader: S.optional(S.Boolean),
          SkipFirst: S.optional(S.Boolean),
          OptimizePerformance: S.optional(S.Boolean),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3CsvSource" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Paths: __S(9792, __c306, 0),
          CompressionType: S.optional(S.String),
          Exclusions: S.optional(__S(9792, __c306, 0)),
          GroupSize: S.optional(S.String),
          GroupFiles: S.optional(S.String),
          Recurse: S.optional(S.Boolean),
          MaxBand: S.optional(S.Number),
          MaxFilesInBand: S.optional(S.Number),
          AdditionalOptions: S.optional(__S(11183, __c349, 15)),
          JsonPath: S.optional(S.String),
          Multiline: S.optional(S.Boolean),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3JsonSource" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Paths: __S(9792, __c306, 0),
          CompressionType: S.optional(S.String),
          Exclusions: S.optional(__S(9792, __c306, 0)),
          GroupSize: S.optional(S.String),
          GroupFiles: S.optional(S.String),
          Recurse: S.optional(S.Boolean),
          MaxBand: S.optional(S.Number),
          MaxFilesInBand: S.optional(S.Number),
          AdditionalOptions: S.optional(__S(11183, __c349, 15)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3ParquetSource" });
    case 19:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Database: S.String, Table: S.String }),
      ).annotate({ identifier: "RelationalCatalogSource" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          DynamodbExport: S.optional(S.String),
          DynamodbUnnestDDBJson: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DDBELTCatalogAdditionalOptions" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Database: S.String,
          Table: S.String,
          PitrEnabled: S.optional(S.Boolean),
          AdditionalOptions: S.optional(__S(11188, __c349, 20)),
        }),
      ).annotate({ identifier: "DynamoDBCatalogSource" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          ConnectionName: S.String,
          ConnectionTable: S.String,
          ConnectorName: S.String,
          ConnectionType: S.String,
          AdditionalOptions: S.optional(__S(9920, __c310, 0)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "JDBCConnectorTarget" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          ConnectionName: S.String,
          ConnectorName: S.String,
          ConnectionType: S.String,
          AdditionalOptions: S.optional(__S(9920, __c310, 0)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "SparkConnectorTarget" });
    case 24:
      return S.Array(__S(9792, __c306, 0));
    case 25:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Database: S.String,
          Table: S.String,
        }),
      ).annotate({ identifier: "BasicCatalogTarget" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          TableLocation: S.optional(S.String),
          ConnectionName: S.optional(S.String),
          UpsertKeys: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "UpsertRedshiftTargetOptions" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          Database: S.String,
          Table: S.String,
          RedshiftTmpDir: S.optional(S.String),
          TmpDirIAMRole: S.optional(S.String),
          UpsertRedshiftOptions: S.optional(__S(11194, __c349, 26)),
        }),
      ).annotate({ identifier: "RedshiftTarget" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          EnableUpdateCatalog: S.optional(S.Boolean),
          UpdateBehavior: S.optional(S.String),
        }),
      ).annotate({ identifier: "CatalogSchemaChangePolicy" });
    case 29:
      return S.suspend(() =>
        S.Struct({ IsEnabled: S.optional(S.Boolean), EvaluationContext: S.optional(S.String) }),
      ).annotate({ identifier: "AutoDataQuality" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Table: S.String,
          Database: S.String,
          SchemaChangePolicy: S.optional(__S(11196, __c349, 28)),
          AutoDataQuality: S.optional(__S(11197, __c349, 29)),
        }),
      ).annotate({ identifier: "S3CatalogTarget" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          EnableUpdateCatalog: S.optional(S.Boolean),
          UpdateBehavior: S.optional(S.String),
          Table: S.optional(S.String),
          Database: S.optional(S.String),
        }),
      ).annotate({ identifier: "DirectSchemaChangePolicy" });
  }
}
function __c350(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Path: S.String,
          Compression: S.optional(S.String),
          NumberTargetPartitions: S.optional(S.String),
          SchemaChangePolicy: S.optional(__S(11199, __c349, 31)),
          AutoDataQuality: S.optional(__S(11197, __c349, 29)),
        }),
      ).annotate({ identifier: "S3GlueParquetTarget" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Path: S.String,
          Compression: S.optional(S.String),
          NumberTargetPartitions: S.optional(S.String),
          Format: S.String,
          SchemaChangePolicy: S.optional(__S(11199, __c349, 31)),
          AutoDataQuality: S.optional(__S(11197, __c349, 29)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3DirectTarget" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ToKey: S.optional(S.String),
          FromPath: S.optional(__S(9792, __c306, 0)),
          FromType: S.optional(S.String),
          ToType: S.optional(S.String),
          Dropped: S.optional(S.Boolean),
          Children: S.optional(
            S.suspend(() => __S(11203, __c350, 3)).annotate({ identifier: "Mappings" }),
          ),
        }),
      ).annotate({ identifier: "Mapping" });
    case 3:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Mapping> => __S(11202, __c350, 2)).annotate({
          identifier: "Mapping",
        }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Inputs: __S(9792, __c306, 0), Mapping: __S(11203, __c350, 3) }),
      ).annotate({ identifier: "ApplyMapping" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Inputs: __S(9792, __c306, 0), Paths: __S(11192, __c349, 24) }),
      ).annotate({ identifier: "SelectFields" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          SourcePath: __S(9792, __c306, 0),
          TargetPath: __S(9792, __c306, 0),
        }),
      ).annotate({ identifier: "RenameField" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          Path: S.String,
          Topk: S.optional(S.Number),
          Prob: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Spigot" });
    case 8:
      return S.suspend(() => S.Struct({ From: S.String, Keys: __S(11192, __c349, 24) })).annotate({
        identifier: "JoinColumn",
      });
    case 9:
      return S.Array(__S(11208, __c350, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          JoinType: S.String,
          Columns: __S(11209, __c350, 9),
        }),
      ).annotate({ identifier: "Join" });
    case 11:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Inputs: __S(9792, __c306, 0), Index: S.Number }),
      ).annotate({ identifier: "SelectFromCollection" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          ImputedPath: S.String,
          FilledPath: S.optional(S.String),
        }),
      ).annotate({ identifier: "FillMissingValues" });
    case 13:
      return S.suspend(() => S.Struct({ Type: S.String, Value: __S(9792, __c306, 0) })).annotate({
        identifier: "FilterValue",
      });
    case 14:
      return S.Array(__S(11213, __c350, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          Operation: S.String,
          Negated: S.optional(S.Boolean),
          Values: __S(11214, __c350, 14),
        }),
      ).annotate({ identifier: "FilterExpression" });
    case 16:
      return S.Array(__S(11215, __c350, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          LogicalOperator: S.String,
          Filters: __S(11216, __c350, 16),
        }),
      ).annotate({ identifier: "Filter" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          Code: S.String,
          ClassName: S.String,
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "CustomCode" });
    case 19:
      return S.suspend(() => S.Struct({ From: S.String, Alias: S.String })).annotate({
        identifier: "SqlAlias",
      });
    case 20:
      return S.Array(__S(11219, __c350, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          SqlQuery: S.String,
          SqlAliases: __S(11220, __c350, 20),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "SparkSQL" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          EndpointUrl: S.optional(S.String),
          StreamName: S.optional(S.String),
          Classification: S.optional(S.String),
          Delimiter: S.optional(S.String),
          StartingPosition: S.optional(S.String),
          MaxFetchTimeInMs: S.optional(S.Number),
          MaxFetchRecordsPerShard: S.optional(S.Number),
          MaxRecordPerRead: S.optional(S.Number),
          AddIdleTimeBetweenReads: S.optional(S.Boolean),
          IdleTimeBetweenReadsInMs: S.optional(S.Number),
          DescribeShardInterval: S.optional(S.Number),
          NumRetries: S.optional(S.Number),
          RetryIntervalMs: S.optional(S.Number),
          MaxRetryIntervalMs: S.optional(S.Number),
          AvoidEmptyBatches: S.optional(S.Boolean),
          StreamArn: S.optional(S.String),
          RoleArn: S.optional(S.String),
          RoleSessionName: S.optional(S.String),
          AddRecordTimestamp: S.optional(S.String),
          EmitConsumerLagMetrics: S.optional(S.String),
          StartingTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          FanoutConsumerARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "KinesisStreamingSourceOptions" });
    case 23:
      return S.suspend(() =>
        S.Struct({ PollingTime: S.optional(S.Number), RecordPollingLimit: S.optional(S.Number) }),
      ).annotate({ identifier: "StreamingDataPreviewOptions" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          WindowSize: S.optional(S.Number),
          DetectSchema: S.optional(S.Boolean),
          StreamingOptions: S.optional(__S(11222, __c350, 22)),
          DataPreviewOptions: S.optional(__S(11223, __c350, 23)),
        }),
      ).annotate({ identifier: "DirectKinesisSource" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          BootstrapServers: S.optional(S.String),
          SecurityProtocol: S.optional(S.String),
          ConnectionName: S.optional(S.String),
          TopicName: S.optional(S.String),
          Assign: S.optional(S.String),
          SubscribePattern: S.optional(S.String),
          Classification: S.optional(S.String),
          Delimiter: S.optional(S.String),
          StartingOffsets: S.optional(S.String),
          EndingOffsets: S.optional(S.String),
          PollTimeoutMs: S.optional(S.Number),
          NumRetries: S.optional(S.Number),
          RetryIntervalMs: S.optional(S.Number),
          MaxOffsetsPerTrigger: S.optional(S.Number),
          MinPartitions: S.optional(S.Number),
          IncludeHeaders: S.optional(S.Boolean),
          AddRecordTimestamp: S.optional(S.String),
          EmitConsumerLagMetrics: S.optional(S.String),
          StartingTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "KafkaStreamingSourceOptions" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          StreamingOptions: S.optional(__S(11225, __c350, 25)),
          WindowSize: S.optional(S.Number),
          DetectSchema: S.optional(S.Boolean),
          DataPreviewOptions: S.optional(__S(11223, __c350, 23)),
        }),
      ).annotate({ identifier: "DirectKafkaSource" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          WindowSize: S.optional(S.Number),
          DetectSchema: S.optional(S.Boolean),
          Table: S.String,
          Database: S.String,
          StreamingOptions: S.optional(__S(11222, __c350, 22)),
          DataPreviewOptions: S.optional(__S(11223, __c350, 23)),
        }),
      ).annotate({ identifier: "CatalogKinesisSource" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          WindowSize: S.optional(S.Number),
          DetectSchema: S.optional(S.Boolean),
          Table: S.String,
          Database: S.String,
          StreamingOptions: S.optional(__S(11225, __c350, 25)),
          DataPreviewOptions: S.optional(__S(11223, __c350, 23)),
        }),
      ).annotate({ identifier: "CatalogKafkaSource" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          IsEmpty: S.optional(S.Boolean),
          IsNullString: S.optional(S.Boolean),
          IsNegOne: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "NullCheckBoxList" });
    case 30:
      return S.suspend(() => S.Struct({ Id: S.String, Label: S.String })).annotate({
        identifier: "Datatype",
      });
    case 31:
      return S.suspend(() =>
        S.Struct({ Value: S.String, Datatype: __S(11230, __c350, 30) }),
      ).annotate({ identifier: "NullValueField" });
  }
}
function __c351(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(11231, __c350, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          NullCheckBoxList: S.optional(__S(11229, __c350, 29)),
          NullTextList: S.optional(__S(11232, __c351, 0)),
        }),
      ).annotate({ identifier: "DropNullFields" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          Source: S.String,
          PrimaryKeys: __S(11192, __c349, 24),
        }),
      ).annotate({ identifier: "Merge" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Inputs: __S(9792, __c306, 0), UnionType: S.String }),
      ).annotate({ identifier: "Union" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          PiiType: S.String,
          EntityTypesToDetect: __S(9792, __c306, 0),
          OutputColumnName: S.optional(S.String),
          SampleFraction: S.optional(S.Number),
          ThresholdFraction: S.optional(S.Number),
          MaskValue: S.optional(S.String),
          RedactText: S.optional(S.String),
          RedactChar: S.optional(S.String),
          MatchPattern: S.optional(S.String),
          NumLeftCharsToExclude: S.optional(S.Number),
          NumRightCharsToExclude: S.optional(S.Number),
          DetectionParameters: S.optional(S.String),
          DetectionSensitivity: S.optional(S.String),
        }),
      ).annotate({ identifier: "PIIDetection" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Column: __S(9792, __c306, 0), AggFunc: S.String }),
      ).annotate({ identifier: "AggregateOperation" });
    case 6:
      return S.Array(__S(11237, __c351, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          Groups: __S(11192, __c349, 24),
          Aggs: __S(11238, __c351, 6),
        }),
      ).annotate({ identifier: "Aggregate" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          Columns: S.optional(__S(11192, __c349, 24)),
        }),
      ).annotate({ identifier: "DropDuplicates" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Table: S.String,
          Database: S.String,
          SchemaChangePolicy: S.optional(__S(11196, __c349, 28)),
        }),
      ).annotate({ identifier: "GovernedCatalogTarget" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          Database: S.String,
          Table: S.String,
        }),
      ).annotate({ identifier: "MicrosoftSQLServerCatalogTarget" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.String,
          Filters: __S(11216, __c350, 16),
          LogicalOperator: S.String,
        }),
      ).annotate({ identifier: "GroupFilters" });
    case 12:
      return S.Array(__S(11243, __c351, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          GroupFiltersList: __S(11244, __c351, 12),
        }),
      ).annotate({ identifier: "Route" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Type: S.String,
          ValidationRule: S.optional(S.String),
          ValidationMessage: S.optional(S.String),
          Value: S.optional(__S(9792, __c306, 0)),
          ListType: S.optional(S.String),
          IsOptional: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TransformConfigParameter" });
    case 15:
      return S.Array(__S(11246, __c351, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          TransformName: S.String,
          Inputs: __S(9792, __c306, 0),
          Parameters: S.optional(__S(11247, __c351, 15)),
          FunctionName: S.String,
          Path: S.String,
          Version: S.optional(S.String),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "DynamicTransform" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          EvaluationContext: S.optional(S.String),
          ResultsS3Prefix: S.optional(S.String),
          CloudWatchMetricsEnabled: S.optional(S.Boolean),
          ResultsPublishingEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DQResultsPublishingOptions" });
    case 18:
      return S.suspend(() => S.Struct({ StopJobOnFailureTiming: S.optional(S.String) })).annotate({
        identifier: "DQStopJobOnFailureOptions",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          Ruleset: S.String,
          Output: S.optional(S.String),
          PublishingOptions: S.optional(__S(11249, __c351, 17)),
          StopJobOnFailureOptions: S.optional(__S(11250, __c351, 18)),
        }),
      ).annotate({ identifier: "EvaluateDataQuality" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Database: S.String,
          Table: S.String,
          AdditionalHudiOptions: S.optional(__S(9920, __c310, 0)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3CatalogHudiSource" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Paths: __S(9792, __c306, 0),
          AdditionalHudiOptions: S.optional(__S(9920, __c310, 0)),
          AdditionalOptions: S.optional(__S(11183, __c349, 15)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3HudiSource" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Table: S.String,
          Database: S.String,
          AdditionalOptions: __S(9920, __c310, 0),
          SchemaChangePolicy: S.optional(__S(11196, __c349, 28)),
          AutoDataQuality: S.optional(__S(11197, __c349, 29)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3HudiCatalogTarget" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          Path: S.String,
          Compression: S.String,
          NumberTargetPartitions: S.optional(S.String),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Format: S.String,
          AdditionalOptions: __S(9920, __c310, 0),
          SchemaChangePolicy: S.optional(__S(11199, __c349, 31)),
          AutoDataQuality: S.optional(__S(11197, __c349, 29)),
        }),
      ).annotate({ identifier: "S3HudiDirectTarget" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Database: S.String,
          Table: S.String,
          ConnectionName: S.String,
          ConnectionType: S.String,
          RedshiftTmpDir: S.optional(S.String),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "DirectJDBCSource" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Database: S.String,
          Table: S.String,
          AdditionalDeltaOptions: S.optional(__S(9920, __c310, 0)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3CatalogDeltaSource" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Paths: __S(9792, __c306, 0),
          AdditionalDeltaOptions: S.optional(__S(9920, __c310, 0)),
          AdditionalOptions: S.optional(__S(11183, __c349, 15)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3DeltaSource" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Table: S.String,
          Database: S.String,
          AdditionalOptions: S.optional(__S(9920, __c310, 0)),
          SchemaChangePolicy: S.optional(__S(11196, __c349, 28)),
          AutoDataQuality: S.optional(__S(11197, __c349, 29)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3DeltaCatalogTarget" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Path: S.String,
          Compression: S.String,
          NumberTargetPartitions: S.optional(S.String),
          Format: S.String,
          AdditionalOptions: S.optional(__S(9920, __c310, 0)),
          SchemaChangePolicy: S.optional(__S(11199, __c349, 31)),
          AutoDataQuality: S.optional(__S(11197, __c349, 29)),
        }),
      ).annotate({ identifier: "S3DeltaDirectTarget" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(S.String),
          Label: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "Option" });
    case 30:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "AmazonRedshiftAdvancedOption" });
    case 31:
      return S.Array(__S(11262, __c351, 30));
  }
}
function __c352(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(11261, __c351, 29));
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessType: S.optional(S.String),
          SourceType: S.optional(S.String),
          Connection: S.optional(__S(11261, __c351, 29)),
          Schema: S.optional(__S(11261, __c351, 29)),
          Table: S.optional(__S(11261, __c351, 29)),
          CatalogDatabase: S.optional(__S(11261, __c351, 29)),
          CatalogTable: S.optional(__S(11261, __c351, 29)),
          CatalogRedshiftSchema: S.optional(S.String),
          CatalogRedshiftTable: S.optional(S.String),
          TempDir: S.optional(S.String),
          IamRole: S.optional(__S(11261, __c351, 29)),
          AdvancedOptions: S.optional(__S(11263, __c351, 31)),
          SampleQuery: S.optional(S.String),
          PreAction: S.optional(S.String),
          PostAction: S.optional(S.String),
          Action: S.optional(S.String),
          TablePrefix: S.optional(S.String),
          Upsert: S.optional(S.Boolean),
          MergeAction: S.optional(S.String),
          MergeWhenMatched: S.optional(S.String),
          MergeWhenNotMatched: S.optional(S.String),
          MergeClause: S.optional(S.String),
          CrawlerConnection: S.optional(S.String),
          TableSchema: S.optional(__S(11264, __c352, 0)),
          StagingTable: S.optional(S.String),
          SelectedColumns: S.optional(__S(11264, __c352, 0)),
        }),
      ).annotate({ identifier: "AmazonRedshiftNodeData" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Data: S.optional(__S(11265, __c352, 1)) }),
      ).annotate({ identifier: "AmazonRedshiftSource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Data: S.optional(__S(11265, __c352, 1)),
          Inputs: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "AmazonRedshiftTarget" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          AdditionalDataSources: S.optional(__S(9920, __c310, 0)),
          Ruleset: S.String,
          PublishingOptions: S.optional(__S(11249, __c351, 17)),
          AdditionalOptions: S.optional(__S(11104, __c347, 0)),
          StopJobOnFailureOptions: S.optional(__S(11250, __c351, 18)),
        }),
      ).annotate({ identifier: "EvaluateDataQualityMultiFrame" });
    case 5:
      return S.suspend(() => S.Struct({ RecipeArn: S.String, RecipeVersion: S.String })).annotate({
        identifier: "RecipeReference",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ Operation: S.String, Parameters: S.optional(__S(9920, __c310, 0)) }),
      ).annotate({ identifier: "RecipeAction" });
    case 7:
      return S.suspend(() =>
        S.Struct({ Condition: S.String, Value: S.optional(S.String), TargetColumn: S.String }),
      ).annotate({ identifier: "ConditionExpression" });
    case 8:
      return S.Array(__S(11271, __c352, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Action: __S(11270, __c352, 6),
          ConditionExpressions: S.optional(__S(11272, __c352, 8)),
        }),
      ).annotate({ identifier: "RecipeStep" });
    case 10:
      return S.Array(__S(11273, __c352, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          RecipeReference: S.optional(__S(11269, __c352, 5)),
          RecipeSteps: S.optional(__S(11274, __c352, 10)),
        }),
      ).annotate({ identifier: "Recipe" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.optional(S.String),
          Connection: S.optional(__S(11261, __c351, 29)),
          Schema: S.optional(S.String),
          Table: S.optional(S.String),
          Database: S.optional(S.String),
          TempDir: S.optional(S.String),
          IamRole: S.optional(__S(11261, __c351, 29)),
          AdditionalOptions: S.optional(__S(9920, __c310, 0)),
          SampleQuery: S.optional(S.String),
          PreAction: S.optional(S.String),
          PostAction: S.optional(S.String),
          Action: S.optional(S.String),
          Upsert: S.optional(S.Boolean),
          MergeAction: S.optional(S.String),
          MergeWhenMatched: S.optional(S.String),
          MergeWhenNotMatched: S.optional(S.String),
          MergeClause: S.optional(S.String),
          StagingTable: S.optional(S.String),
          SelectedColumns: S.optional(__S(11264, __c352, 0)),
          AutoPushdown: S.optional(S.Boolean),
          TableSchema: S.optional(__S(11264, __c352, 0)),
        }),
      ).annotate({ identifier: "SnowflakeNodeData" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Data: __S(11276, __c352, 12),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "SnowflakeSource" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Data: __S(11276, __c352, 12),
          Inputs: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "SnowflakeTarget" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ConnectionType: S.String,
          Data: __S(9920, __c310, 0),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "ConnectorDataSource" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ConnectionType: S.String,
          Data: __S(9920, __c310, 0),
          Inputs: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "ConnectorDataTarget" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Database: S.String,
          Table: S.String,
          AdditionalIcebergOptions: S.optional(__S(9920, __c310, 0)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3CatalogIcebergSource" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Table: S.String,
          Database: S.String,
          AdditionalOptions: S.optional(__S(9920, __c310, 0)),
          SchemaChangePolicy: S.optional(__S(11196, __c349, 28)),
          AutoDataQuality: S.optional(__S(11197, __c349, 29)),
        }),
      ).annotate({ identifier: "S3IcebergCatalogTarget" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Path: S.String,
          Format: S.String,
          AdditionalOptions: S.optional(__S(9920, __c310, 0)),
          SchemaChangePolicy: S.optional(__S(11199, __c349, 31)),
          AutoDataQuality: S.optional(__S(11197, __c349, 29)),
          Compression: S.String,
          NumberTargetPartitions: S.optional(S.String),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3IcebergDirectTarget" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Paths: __S(9792, __c306, 0),
          CompressionType: S.optional(S.String),
          Exclusions: S.optional(__S(9792, __c306, 0)),
          GroupSize: S.optional(S.String),
          GroupFiles: S.optional(S.String),
          Recurse: S.optional(S.Boolean),
          MaxBand: S.optional(S.Number),
          MaxFilesInBand: S.optional(S.Number),
          AdditionalOptions: S.optional(__S(11183, __c349, 15)),
          NumberRows: S.optional(S.Number),
          SkipFooter: S.optional(S.Number),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3ExcelSource" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Inputs: __S(9792, __c306, 0),
          Format: S.optional(S.String),
          PartitionKeys: S.optional(__S(11192, __c349, 24)),
          Path: S.String,
          Compression: S.optional(S.String),
          SchemaChangePolicy: S.optional(__S(11199, __c349, 31)),
          AutoDataQuality: S.optional(__S(11197, __c349, 29)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "S3HyperDirectTarget" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          DynamodbExport: S.optional(S.String),
          DynamodbUnnestDDBJson: S.optional(S.Boolean),
          DynamodbTableArn: S.String,
          DynamodbS3Bucket: S.optional(S.String),
          DynamodbS3Prefix: S.optional(S.String),
          DynamodbS3BucketOwner: S.optional(S.String),
          DynamodbStsRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DDBELTConnectionOptions" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ConnectionOptions: S.optional(__S(11286, __c352, 22)),
          OutputSchemas: S.optional(__S(11173, __c349, 5)),
        }),
      ).annotate({ identifier: "DynamoDBELTConnectorSource" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          AthenaConnectorSource: S.optional(__S(11174, __c349, 6)),
          JDBCConnectorSource: S.optional(__S(11177, __c349, 9)),
          SparkConnectorSource: S.optional(__S(11178, __c349, 10)),
          CatalogSource: S.optional(__S(11179, __c349, 11)),
          RedshiftSource: S.optional(__S(11180, __c349, 12)),
          S3CatalogSource: S.optional(__S(11182, __c349, 14)),
          S3CsvSource: S.optional(__S(11184, __c349, 16)),
          S3JsonSource: S.optional(__S(11185, __c349, 17)),
          S3ParquetSource: S.optional(__S(11186, __c349, 18)),
          RelationalCatalogSource: S.optional(__S(11187, __c349, 19)),
          DynamoDBCatalogSource: S.optional(__S(11189, __c349, 21)),
          JDBCConnectorTarget: S.optional(__S(11190, __c349, 22)),
          SparkConnectorTarget: S.optional(__S(11191, __c349, 23)),
          CatalogTarget: S.optional(__S(11193, __c349, 25)),
          RedshiftTarget: S.optional(__S(11195, __c349, 27)),
          S3CatalogTarget: S.optional(__S(11198, __c349, 30)),
          S3GlueParquetTarget: S.optional(__S(11200, __c350, 0)),
          S3DirectTarget: S.optional(__S(11201, __c350, 1)),
          ApplyMapping: S.optional(__S(11204, __c350, 4)),
          SelectFields: S.optional(__S(11205, __c350, 5)),
          DropFields: S.optional(__S(11205, __c350, 5)),
          RenameField: S.optional(__S(11206, __c350, 6)),
          Spigot: S.optional(__S(11207, __c350, 7)),
          Join: S.optional(__S(11210, __c350, 10)),
          SplitFields: S.optional(__S(11205, __c350, 5)),
          SelectFromCollection: S.optional(__S(11211, __c350, 11)),
          FillMissingValues: S.optional(__S(11212, __c350, 12)),
          Filter: S.optional(__S(11217, __c350, 17)),
          CustomCode: S.optional(__S(11218, __c350, 18)),
          SparkSQL: S.optional(__S(11221, __c350, 21)),
          DirectKinesisSource: S.optional(__S(11224, __c350, 24)),
          DirectKafkaSource: S.optional(__S(11226, __c350, 26)),
          CatalogKinesisSource: S.optional(__S(11227, __c350, 27)),
          CatalogKafkaSource: S.optional(__S(11228, __c350, 28)),
          DropNullFields: S.optional(__S(11233, __c351, 1)),
          Merge: S.optional(__S(11234, __c351, 2)),
          Union: S.optional(__S(11235, __c351, 3)),
          PIIDetection: S.optional(__S(11236, __c351, 4)),
          Aggregate: S.optional(__S(11239, __c351, 7)),
          DropDuplicates: S.optional(__S(11240, __c351, 8)),
          GovernedCatalogTarget: S.optional(__S(11241, __c351, 9)),
          GovernedCatalogSource: S.optional(__S(11182, __c349, 14)),
          MicrosoftSQLServerCatalogSource: S.optional(__S(11187, __c349, 19)),
          MySQLCatalogSource: S.optional(__S(11187, __c349, 19)),
          OracleSQLCatalogSource: S.optional(__S(11187, __c349, 19)),
          PostgreSQLCatalogSource: S.optional(__S(11187, __c349, 19)),
          MicrosoftSQLServerCatalogTarget: S.optional(__S(11242, __c351, 10)),
          MySQLCatalogTarget: S.optional(__S(11242, __c351, 10)),
          OracleSQLCatalogTarget: S.optional(__S(11242, __c351, 10)),
          PostgreSQLCatalogTarget: S.optional(__S(11242, __c351, 10)),
          Route: S.optional(__S(11245, __c351, 13)),
          DynamicTransform: S.optional(__S(11248, __c351, 16)),
          EvaluateDataQuality: S.optional(__S(11251, __c351, 19)),
          S3CatalogHudiSource: S.optional(__S(11252, __c351, 20)),
          CatalogHudiSource: S.optional(__S(11252, __c351, 20)),
          S3HudiSource: S.optional(__S(11253, __c351, 21)),
          S3HudiCatalogTarget: S.optional(__S(11254, __c351, 22)),
          S3HudiDirectTarget: S.optional(__S(11255, __c351, 23)),
          DirectJDBCSource: S.optional(__S(11256, __c351, 24)),
          S3CatalogDeltaSource: S.optional(__S(11257, __c351, 25)),
          CatalogDeltaSource: S.optional(__S(11257, __c351, 25)),
          S3DeltaSource: S.optional(__S(11258, __c351, 26)),
          S3DeltaCatalogTarget: S.optional(__S(11259, __c351, 27)),
          S3DeltaDirectTarget: S.optional(__S(11260, __c351, 28)),
          AmazonRedshiftSource: S.optional(__S(11266, __c352, 2)),
          AmazonRedshiftTarget: S.optional(__S(11267, __c352, 3)),
          EvaluateDataQualityMultiFrame: S.optional(__S(11268, __c352, 4)),
          Recipe: S.optional(__S(11275, __c352, 11)),
          SnowflakeSource: S.optional(__S(11277, __c352, 13)),
          SnowflakeTarget: S.optional(__S(11278, __c352, 14)),
          ConnectorDataSource: S.optional(__S(11279, __c352, 15)),
          ConnectorDataTarget: S.optional(__S(11280, __c352, 16)),
          S3CatalogIcebergSource: S.optional(__S(11281, __c352, 17)),
          CatalogIcebergSource: S.optional(__S(11281, __c352, 17)),
          S3IcebergCatalogTarget: S.optional(__S(11282, __c352, 18)),
          S3IcebergDirectTarget: S.optional(__S(11283, __c352, 19)),
          S3ExcelSource: S.optional(__S(11284, __c352, 20)),
          S3HyperDirectTarget: S.optional(__S(11285, __c352, 21)),
          DynamoDBELTConnectorSource: S.optional(__S(11287, __c352, 23)),
        }),
      ).annotate({ identifier: "CodeGenConfigurationNode" });
    case 25:
      return S.Record(S.String, /*@__PURE__*/ __S(11288, __c352, 24).pipe(S.optional));
    case 26:
      return S.suspend(() =>
        S.Struct({
          Provider: S.optional(S.String),
          Repository: S.optional(S.String),
          Owner: S.optional(S.String),
          Branch: S.optional(S.String),
          Folder: S.optional(S.String),
          LastCommitId: S.optional(S.String),
          AuthStrategy: S.optional(S.String),
          AuthToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceControlDetails" });
  }
}
function __c353(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          PartitionsToGet: __S(10113, __c316, 1),
          AuditContext: S.optional(__S(11328, __c354, 0)),
          QuerySessionContext: S.optional(__S(11424, __c357, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchGetPartitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Partitions: S.optional(__S(11392, __c356, 0)),
          UnprocessedKeys: S.optional(__S(10113, __c316, 1)),
        }),
      ).annotate({ identifier: "BatchGetPartitionResponse" });
  }
}
function __c354(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AdditionalAuditContext: S.optional(S.String),
          RequestedColumns: S.optional(__S(9792, __c306, 0)),
          AllColumnsRequested: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AuditContext" });
  }
}
function __c355(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Values: S.optional(__S(9792, __c306, 0)),
          DatabaseName: S.optional(S.String),
          TableName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastAccessTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StorageDescriptor: S.optional(__S(9991, __c312, 7)),
          Parameters: S.optional(__S(9920, __c310, 0)),
          LastAnalyzedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CatalogId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Partition" });
  }
}
function __c356(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(11360, __c355, 0));
  }
}
function __c357(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueryId: S.optional(S.String),
          QueryStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ClusterId: S.optional(S.String),
          QueryAuthorizationId: S.optional(S.String),
          AdditionalContext: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "QuerySessionContext" });
  }
}
function __c358(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalogId: S.optional(S.String),
          databaseName: S.optional(S.String),
          tableName: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetTableOptimizerEntry" });
    case 1:
      return S.Array(__S(11456, __c358, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Entries: __S(11457, __c358, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetTableOptimizerRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          catalogId: S.optional(S.String),
          databaseName: S.optional(S.String),
          tableName: S.optional(S.String),
          tableOptimizer: S.optional(__S(11520, __c360, 0)),
        }),
      ).annotate({ identifier: "BatchTableOptimizer" });
    case 4:
      return S.Array(__S(11459, __c358, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          error: S.optional(__S(9856, __c308, 0)),
          catalogId: S.optional(S.String),
          databaseName: S.optional(S.String),
          tableName: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetTableOptimizerError" });
    case 6:
      return S.Array(__S(11461, __c358, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          TableOptimizers: S.optional(__S(11460, __c358, 4)),
          Failures: S.optional(__S(11462, __c358, 6)),
        }),
      ).annotate({ identifier: "BatchGetTableOptimizerResponse" });
  }
}
function __c359(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ glueConnectionName: S.String })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          strategy: S.optional(S.String),
          minInputFiles: S.optional(S.Number),
          deleteFileThreshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IcebergCompactionConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ icebergConfiguration: S.optional(__S(11489, __c359, 1)) }),
      ).annotate({ identifier: "CompactionConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          snapshotRetentionPeriodInDays: S.optional(S.Number),
          numberOfSnapshotsToRetain: S.optional(S.Number),
          cleanExpiredFiles: S.optional(S.Boolean),
          runRateInHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IcebergRetentionConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ icebergConfiguration: S.optional(__S(11491, __c359, 3)) }),
      ).annotate({ identifier: "RetentionConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          orphanFileRetentionPeriodInDays: S.optional(S.Number),
          location: S.optional(S.String),
          runRateInHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IcebergOrphanFileDeletionConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({ icebergConfiguration: S.optional(__S(11493, __c359, 5)) }),
      ).annotate({ identifier: "OrphanFileDeletionConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          vpcConfiguration: S.optional(__S(11488, __c359, 0)),
          compactionConfiguration: S.optional(__S(11490, __c359, 2)),
          retentionConfiguration: S.optional(__S(11492, __c359, 4)),
          orphanFileDeletionConfiguration: S.optional(__S(11494, __c359, 6)),
        }),
      ).annotate({ identifier: "TableOptimizerConfiguration" });
  }
}
function __c360(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          configuration: S.optional(__S(11495, __c359, 7)),
          lastRun: S.optional(__S(11559, __c361, 7)),
          configurationSource: S.optional(S.String),
        }),
      ).annotate({ identifier: "TableOptimizer" });
  }
}
function __c361(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NumberOfBytesCompacted: S.optional(S.String),
          NumberOfFilesCompacted: S.optional(S.String),
          NumberOfDpus: S.optional(S.String),
          JobDurationInHour: S.optional(S.String),
        }),
      ).annotate({ identifier: "RunMetrics" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NumberOfBytesCompacted: S.optional(S.Number),
          NumberOfFilesCompacted: S.optional(S.Number),
          DpuHours: S.optional(S.Number),
          NumberOfDpus: S.optional(S.Number),
          JobDurationInHour: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IcebergCompactionMetrics" });
    case 2:
      return S.suspend(() =>
        S.Struct({ IcebergMetrics: S.optional(__S(11553, __c361, 1)) }),
      ).annotate({ identifier: "CompactionMetrics" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          NumberOfDataFilesDeleted: S.optional(S.Number),
          NumberOfManifestFilesDeleted: S.optional(S.Number),
          NumberOfManifestListsDeleted: S.optional(S.Number),
          DpuHours: S.optional(S.Number),
          NumberOfDpus: S.optional(S.Number),
          JobDurationInHour: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IcebergRetentionMetrics" });
    case 4:
      return S.suspend(() =>
        S.Struct({ IcebergMetrics: S.optional(__S(11555, __c361, 3)) }),
      ).annotate({ identifier: "RetentionMetrics" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          NumberOfOrphanFilesDeleted: S.optional(S.Number),
          DpuHours: S.optional(S.Number),
          NumberOfDpus: S.optional(S.Number),
          JobDurationInHour: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IcebergOrphanFileDeletionMetrics" });
    case 6:
      return S.suspend(() =>
        S.Struct({ IcebergMetrics: S.optional(__S(11557, __c361, 5)) }),
      ).annotate({ identifier: "OrphanFileDeletionMetrics" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          eventType: S.optional(S.String),
          startTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          metrics: S.optional(__S(11552, __c361, 0)),
          error: S.optional(S.String),
          compactionMetrics: S.optional(__S(11554, __c361, 2)),
          compactionStrategy: S.optional(S.String),
          retentionMetrics: S.optional(__S(11556, __c361, 4)),
          orphanFileDeletionMetrics: S.optional(__S(11558, __c361, 6)),
        }),
      ).annotate({ identifier: "TableOptimizerRun" });
  }
}
function __c362(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TriggerNames: __S(9792, __c306, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetTriggersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Triggers: S.optional(__S(11616, __c363, 0)),
          TriggersNotFound: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "BatchGetTriggersResponse" });
  }
}
function __c363(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(11680, __c365, 0));
  }
}
function __c364(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.optional(S.String),
          Arguments: S.optional(__S(9920, __c310, 0)),
          Timeout: S.optional(S.Number),
          SecurityConfiguration: S.optional(S.String),
          NotificationProperty: S.optional(__S(11072, __c346, 0)),
          CrawlerName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Action" });
    case 1:
      return S.Array(__S(11648, __c364, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          LogicalOperator: S.optional(S.String),
          JobName: S.optional(S.String),
          State: S.optional(S.String),
          CrawlerName: S.optional(S.String),
          CrawlState: S.optional(S.String),
        }),
      ).annotate({ identifier: "Condition" });
    case 3:
      return S.Array(__S(11650, __c364, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Logical: S.optional(S.String), Conditions: S.optional(__S(11651, __c364, 3)) }),
      ).annotate({ identifier: "Predicate" });
    case 5:
      return S.suspend(() =>
        S.Struct({ BatchSize: S.Number, BatchWindow: S.optional(S.Number) }),
      ).annotate({ identifier: "EventBatchingCondition" });
  }
}
function __c365(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          WorkflowName: S.optional(S.String),
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          State: S.optional(S.String),
          Description: S.optional(S.String),
          Schedule: S.optional(S.String),
          Actions: S.optional(__S(11649, __c364, 1)),
          Predicate: S.optional(__S(11652, __c364, 4)),
          EventBatchingCondition: S.optional(__S(11653, __c364, 5)),
        }),
      ).annotate({ identifier: "Trigger" });
  }
}
function __c366(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Names: __S(9792, __c306, 0), IncludeGraph: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetWorkflowsRequest" });
    case 1:
      return S.Array(__S(11841, __c370, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Workflows: S.optional(__S(11713, __c366, 1)),
          MissingWorkflows: S.optional(__S(9792, __c306, 0)),
        }),
      ).annotate({ identifier: "BatchGetWorkflowsResponse" });
  }
}
function __c367(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobName: S.optional(S.String), RunId: S.optional(S.String) }),
      ).annotate({ identifier: "Predecessor" });
    case 1:
      return S.Array(__S(11744, __c367, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Attempt: S.optional(S.Number),
          PreviousRunId: S.optional(S.String),
          TriggerName: S.optional(S.String),
          JobName: S.optional(S.String),
          JobMode: S.optional(S.String),
          JobRunQueuingEnabled: S.optional(S.Boolean),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          JobRunState: S.optional(S.String),
          Arguments: S.optional(__S(9920, __c310, 0)),
          ErrorMessage: S.optional(S.String),
          PredecessorRuns: S.optional(__S(11745, __c367, 1)),
          AllocatedCapacity: S.optional(S.Number),
          ExecutionTime: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          MaxCapacity: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          SecurityConfiguration: S.optional(S.String),
          LogGroupName: S.optional(S.String),
          NotificationProperty: S.optional(__S(11072, __c346, 0)),
          GlueVersion: S.optional(S.String),
          DPUSeconds: S.optional(S.Number),
          ExecutionClass: S.optional(S.String),
          MaintenanceWindow: S.optional(S.String),
          ProfileName: S.optional(S.String),
          StateDetail: S.optional(S.String),
          ExecutionRoleSessionPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobRun" });
  }
}
function __c368(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(11746, __c367, 2));
  }
}
function __c369(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Trigger: S.optional(__S(11680, __c365, 0)) })).annotate({
        identifier: "TriggerNodeDetails",
      });
  }
}
function __c370(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BlueprintName: S.optional(S.String), RunId: S.optional(S.String) }),
      ).annotate({ identifier: "BlueprintDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          DefaultRunProperties: S.optional(__S(9920, __c310, 0)),
          CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastRun: S.optional(__S(11883, __c371, 11)),
          Graph: S.optional(__S(11881, __c371, 9)),
          MaxConcurrentRuns: S.optional(S.Number),
          BlueprintDetails: S.optional(__S(11840, __c370, 0)),
        }),
      ).annotate({ identifier: "Workflow" });
  }
}
function __c371(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TotalActions: S.optional(S.Number),
          TimeoutActions: S.optional(S.Number),
          FailedActions: S.optional(S.Number),
          StoppedActions: S.optional(S.Number),
          SucceededActions: S.optional(S.Number),
          RunningActions: S.optional(S.Number),
          ErroredActions: S.optional(S.Number),
          WaitingActions: S.optional(S.Number),
        }),
      ).annotate({ identifier: "WorkflowRunStatistics" });
    case 1:
      return S.suspend(() => S.Struct({ JobRuns: S.optional(__S(11776, __c368, 0)) })).annotate({
        identifier: "JobNodeDetails",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ErrorMessage: S.optional(S.String),
          LogGroup: S.optional(S.String),
          LogStream: S.optional(S.String),
        }),
      ).annotate({ identifier: "Crawl" });
    case 3:
      return S.Array(__S(11874, __c371, 2));
    case 4:
      return S.suspend(() => S.Struct({ Crawls: S.optional(__S(11875, __c371, 3)) })).annotate({
        identifier: "CrawlerNodeDetails",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Name: S.optional(S.String),
          UniqueId: S.optional(S.String),
          TriggerDetails: S.optional(__S(11808, __c369, 0)),
          JobDetails: S.optional(__S(11873, __c371, 1)),
          CrawlerDetails: S.optional(__S(11876, __c371, 4)),
        }),
      ).annotate({ identifier: "Node" });
    case 6:
      return S.Array(__S(11877, __c371, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ SourceId: S.optional(S.String), DestinationId: S.optional(S.String) }),
      ).annotate({ identifier: "Edge" });
    case 8:
      return S.Array(__S(11879, __c371, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Nodes: S.optional(__S(11878, __c371, 6)),
          Edges: S.optional(__S(11880, __c371, 8)),
        }),
      ).annotate({ identifier: "WorkflowGraph" });
    case 10:
      return S.suspend(() =>
        S.Struct({ BatchSize: S.optional(S.Number), BatchWindow: S.optional(S.Number) }),
      ).annotate({ identifier: "StartingEventBatchCondition" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          WorkflowRunId: S.optional(S.String),
          PreviousRunId: S.optional(S.String),
          WorkflowRunProperties: S.optional(__S(9920, __c310, 0)),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          Statistics: S.optional(__S(11872, __c371, 0)),
          Graph: S.optional(__S(11881, __c371, 9)),
          StartingEventBatchCondition: S.optional(__S(11882, __c371, 10)),
        }),
      ).annotate({ identifier: "WorkflowRun" });
  }
}
function __c372(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.optional(S.String),
          StatisticId: S.optional(S.String),
          InclusionAnnotation: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatapointInclusionAnnotation" });
    case 1:
      return S.Array(__S(11904, __c372, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          InclusionAnnotations: __S(11905, __c372, 1),
          ClientToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchPutDataQualityStatisticAnnotationRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.optional(S.String),
          StatisticId: S.optional(S.String),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnnotationError" });
    case 4:
      return S.Array(__S(11907, __c372, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ FailedInclusionAnnotations: S.optional(__S(11908, __c372, 4)) }),
      ).annotate({ identifier: "BatchPutDataQualityStatisticAnnotationResponse" });
  }
}
function __c373(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobName: S.String, JobRunIds: __S(9792, __c306, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchStopJobRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ JobName: S.optional(S.String), JobRunId: S.optional(S.String) }),
      ).annotate({ identifier: "BatchStopJobRunSuccessfulSubmission" });
    case 2:
      return S.Array(__S(11937, __c373, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          JobName: S.optional(S.String),
          JobRunId: S.optional(S.String),
          ErrorDetail: S.optional(__S(9856, __c308, 0)),
        }),
      ).annotate({ identifier: "BatchStopJobRunError" });
    case 4:
      return S.Array(__S(11939, __c373, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          SuccessfulSubmissions: S.optional(__S(11938, __c373, 2)),
          Errors: S.optional(__S(11940, __c373, 4)),
        }),
      ).annotate({ identifier: "BatchStopJobRunResponse" });
  }
}
function __c374(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PartitionValueList: __S(9792, __c306, 0),
          PartitionInput: __S(10016, __c313, 0),
        }),
      ).annotate({ identifier: "BatchUpdatePartitionRequestEntry" });
    case 1:
      return S.Array(__S(11968, __c374, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          Entries: __S(11969, __c374, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchUpdatePartitionRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          PartitionValueList: S.optional(__S(9792, __c306, 0)),
          ErrorDetail: S.optional(__S(9856, __c308, 0)),
        }),
      ).annotate({ identifier: "BatchUpdatePartitionFailureEntry" });
    case 4:
      return S.Array(__S(11971, __c374, 3));
    case 5:
      return S.suspend(() => S.Struct({ Errors: S.optional(__S(11972, __c374, 4)) })).annotate({
        identifier: "BatchUpdatePartitionResponse",
      });
  }
}
function __c375(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RunId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelDataQualityRuleRecommendationRunRequest" });
  }
}
function __c376(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CancelDataQualityRuleRecommendationRunResponse",
      });
  }
}
function __c377(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RunId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelDataQualityRulesetEvaluationRunRequest" });
  }
}
function __c378(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransformId: S.String, TaskRunId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelMLTaskRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TransformId: S.optional(S.String),
          TaskRunId: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "CancelMLTaskRunResponse" });
  }
}
function __c379(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String, Id: S.Number, RequestOrigin: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelStatementRequest" });
  }
}
function __c380(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataFormat: S.String, SchemaDefinition: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CheckSchemaVersionValidityInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Valid: S.optional(S.Boolean), Error: S.optional(S.String) }),
      ).annotate({ identifier: "CheckSchemaVersionValidityResponse" });
  }
}
function __c381(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          BlueprintLocation: S.String,
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBlueprintRequest" });
  }
}
function __c382(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "CreateBlueprintResponse",
      });
  }
}
function __c383(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          CatalogInput: __S(12323, __c385, 3),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCatalogRequest" });
  }
}
function __c384(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CatalogArn: S.String })).annotate({
        identifier: "TargetRedshiftCatalog",
      });
  }
}
function __c385(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataLakeAccess: S.optional(S.Boolean),
          DataTransferRole: S.optional(S.String),
          KmsKey: S.optional(S.String),
          CatalogType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataLakeAccessProperties" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RoleArn: S.optional(S.String),
          Compaction: S.optional(__S(9920, __c310, 0)),
          Retention: S.optional(__S(9920, __c310, 0)),
          OrphanFileDeletion: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "IcebergOptimizationProperties" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DataLakeAccessProperties: S.optional(__S(12320, __c385, 0)),
          IcebergOptimizationProperties: S.optional(__S(12321, __c385, 1)),
          CustomProperties: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "CatalogProperties" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          FederatedCatalog: S.optional(__S(12352, __c386, 0)),
          Parameters: S.optional(__S(9920, __c310, 0)),
          TargetRedshiftCatalog: S.optional(__S(12288, __c384, 0)),
          CatalogProperties: S.optional(__S(12322, __c385, 2)),
          CreateTableDefaultPermissions: S.optional(__S(12355, __c386, 3)),
          CreateDatabaseDefaultPermissions: S.optional(__S(12355, __c386, 3)),
          AllowFullTableExternalDataAccess: S.optional(S.String),
          OverwriteChildResourcePermissionsWithDefault: S.optional(S.String),
        }),
      ).annotate({ identifier: "CatalogInput" });
  }
}
function __c386(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(S.String),
          ConnectionName: S.optional(S.String),
          ConnectionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "FederatedCatalog" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DataLakePrincipalIdentifier: S.optional(S.String) }),
      ).annotate({ identifier: "DataLakePrincipal" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Principal: S.optional(__S(12353, __c386, 1)),
          Permissions: S.optional(__S(10400, __c325, 0)),
        }),
      ).annotate({ identifier: "PrincipalPermissions" });
    case 3:
      return S.Array(__S(12354, __c386, 2));
  }
}
function __c387(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Classification: S.String,
          Name: S.String,
          GrokPattern: S.String,
          CustomPatterns: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateGrokClassifierRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Classification: S.String, Name: S.String, RowTag: S.optional(S.String) }),
      ).annotate({ identifier: "CreateXMLClassifierRequest" });
    case 2:
      return S.suspend(() => S.Struct({ Name: S.String, JsonPath: S.String })).annotate({
        identifier: "CreateJsonClassifierRequest",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          GrokClassifier: S.optional(__S(12384, __c387, 0)),
          XMLClassifier: S.optional(__S(12385, __c387, 1)),
          JsonClassifier: S.optional(__S(12386, __c387, 2)),
          CsvClassifier: S.optional(__S(12416, __c388, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClassifierRequest" });
  }
}
function __c388(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Delimiter: S.optional(S.String),
          QuoteSymbol: S.optional(S.String),
          ContainsHeader: S.optional(S.String),
          Header: S.optional(__S(9792, __c306, 0)),
          DisableValueTrimming: S.optional(S.Boolean),
          AllowSingleColumn: S.optional(S.Boolean),
          CustomDatatypeConfigured: S.optional(S.Boolean),
          CustomDatatypes: S.optional(__S(9792, __c306, 0)),
          Serde: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateCsvClassifierRequest" });
  }
}
function __c389(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          Role: S.String,
          Schedule: S.optional(S.String),
          ColumnNameList: S.optional(__S(9792, __c306, 0)),
          SampleSize: S.optional(S.Number),
          CatalogID: S.optional(S.String),
          SecurityConfiguration: S.optional(S.String),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateColumnStatisticsTaskSettingsRequest" });
  }
}
function __c390(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          ConnectionInput: __S(12608, __c394, 0),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateConnectionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ CreateConnectionStatus: S.optional(S.String) })).annotate({
        identifier: "CreateConnectionResponse",
      });
  }
}
function __c391(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserManagedClientApplicationClientId: S.optional(S.String),
          AWSManagedClientApplicationReference: S.optional(S.String),
        }),
      ).annotate({ identifier: "OAuth2ClientApplication" });
  }
}
function __c392(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetId: S.optional(S.String),
          SecurityGroupIdList: S.optional(__S(9792, __c306, 0)),
          AvailabilityZone: S.optional(S.String),
        }),
      ).annotate({ identifier: "PhysicalConnectionRequirements" });
  }
}
function __c393(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthorizationCode: S.optional(SensitiveString),
          RedirectUri: S.optional(S.String),
        }),
      ).annotate({ identifier: "AuthorizationCodeProperties" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UserManagedClientApplicationClientSecret: S.optional(SensitiveString),
          AccessToken: S.optional(SensitiveString),
          RefreshToken: S.optional(SensitiveString),
          JwtToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "OAuth2Credentials" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          OAuth2GrantType: S.optional(S.String),
          OAuth2ClientApplication: S.optional(__S(12512, __c391, 0)),
          TokenUrl: S.optional(S.String),
          TokenUrlParametersMap: S.optional(__S(9920, __c310, 0)),
          AuthorizationCodeProperties: S.optional(__S(12576, __c393, 0)),
          OAuth2Credentials: S.optional(__S(12577, __c393, 1)),
        }),
      ).annotate({ identifier: "OAuth2PropertiesInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Username: S.optional(S.String), Password: S.optional(SensitiveString) }),
      ).annotate({ identifier: "BasicAuthenticationCredentials" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          AuthenticationType: S.optional(S.String),
          OAuth2Properties: S.optional(__S(12578, __c393, 2)),
          SecretArn: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          BasicAuthenticationCredentials: S.optional(__S(12579, __c393, 3)),
          CustomAuthenticationCredentials: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "AuthenticationConfigurationInput" });
  }
}
function __c394(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          ConnectionType: S.String,
          MatchCriteria: S.optional(__S(9792, __c306, 0)),
          ConnectionProperties: __S(11104, __c347, 0),
          SparkProperties: S.optional(__S(9920, __c310, 0)),
          AthenaProperties: S.optional(__S(9920, __c310, 0)),
          PythonProperties: S.optional(__S(9920, __c310, 0)),
          PhysicalConnectionRequirements: S.optional(__S(12544, __c392, 0)),
          AuthenticationConfiguration: S.optional(__S(12580, __c393, 4)),
          ValidateCredentials: S.optional(S.Boolean),
          ValidateForComputeEnvironments: S.optional(__S(10400, __c325, 0)),
        }),
      ).annotate({ identifier: "ConnectionInput" });
  }
}
function __c395(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Role: S.String,
          DatabaseName: S.optional(S.String),
          Description: S.optional(S.String),
          Targets: __S(10446, __c326, 14),
          Schedule: S.optional(S.String),
          Classifiers: S.optional(__S(9792, __c306, 0)),
          TablePrefix: S.optional(S.String),
          SchemaChangePolicy: S.optional(__S(10448, __c326, 16)),
          RecrawlPolicy: S.optional(__S(10447, __c326, 15)),
          LineageConfiguration: S.optional(__S(10449, __c326, 17)),
          LakeFormationConfiguration: S.optional(__S(10450, __c326, 18)),
          Configuration: S.optional(S.String),
          CrawlerSecurityConfiguration: S.optional(S.String),
          Tags: S.optional(__S(9920, __c310, 0)),
          CatalogId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCrawlerRequest" });
  }
}
function __c396(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          RegexString: S.String,
          ContextWords: S.optional(__S(9792, __c306, 0)),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCustomEntityTypeRequest" });
  }
}
function __c397(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseInput: __S(12768, __c399, 0),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDatabaseRequest" });
  }
}
function __c398(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          Region: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatabaseIdentifier" });
  }
}
function __c399(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          LocationUri: S.optional(S.String),
          Parameters: S.optional(__S(9920, __c310, 0)),
          CreateTableDefaultPermissions: S.optional(__S(12355, __c386, 3)),
          TargetDatabase: S.optional(__S(12736, __c398, 0)),
          FederatedDatabase: S.optional(__S(12352, __c386, 0)),
        }),
      ).annotate({ identifier: "DatabaseInput" });
  }
}
function __c400(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Ruleset: S.String,
          Tags: S.optional(__S(9920, __c310, 0)),
          TargetTable: S.optional(__S(12832, __c401, 0)),
          DataQualitySecurityConfiguration: S.optional(S.String),
          ClientToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDataQualityRulesetRequest" });
  }
}
function __c401(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TableName: S.String, DatabaseName: S.String, CatalogId: S.optional(S.String) }),
      ).annotate({ identifier: "DataQualityTargetTable" });
  }
}
function __c402(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EndpointName: S.String,
          RoleArn: S.String,
          SecurityGroupIds: S.optional(__S(9792, __c306, 0)),
          SubnetId: S.optional(S.String),
          PublicKey: S.optional(S.String),
          PublicKeys: S.optional(__S(9792, __c306, 0)),
          NumberOfNodes: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          GlueVersion: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          ExtraPythonLibsS3Path: S.optional(S.String),
          ExtraJarsS3Path: S.optional(S.String),
          SecurityConfiguration: S.optional(S.String),
          Tags: S.optional(__S(9920, __c310, 0)),
          Arguments: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDevEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EndpointName: S.optional(S.String),
          Status: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(9792, __c306, 0)),
          SubnetId: S.optional(S.String),
          RoleArn: S.optional(S.String),
          YarnEndpointAddress: S.optional(S.String),
          ZeppelinRemoteSparkInterpreterPort: S.optional(S.Number),
          NumberOfNodes: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          GlueVersion: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          VpcId: S.optional(S.String),
          ExtraPythonLibsS3Path: S.optional(S.String),
          ExtraJarsS3Path: S.optional(S.String),
          FailureReason: S.optional(S.String),
          SecurityConfiguration: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Arguments: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "CreateDevEndpointResponse" });
  }
}
function __c403(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/glossaries" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateGlossaryRequest" });
  }
}
function __c404(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateGlossaryResponse" });
  }
}
function __c405(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlossaryIdentifier: S.String,
          Name: S.String,
          ShortDescription: S.optional(S.String),
          LongDescription: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/glossary-terms" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateGlossaryTermRequest" });
  }
}
function __c406(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          GlossaryId: S.optional(S.String),
          Name: S.optional(S.String),
          ShortDescription: S.optional(S.String),
          LongDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateGlossaryTermResponse" });
  }
}
function __c407(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          Scopes: S.optional(__S(9792, __c306, 0)),
          UserBackgroundSessionsEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGlueIdentityCenterConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ApplicationArn: S.optional(S.String) })).annotate({
        identifier: "CreateGlueIdentityCenterConfigurationResponse",
      });
  }
}
function __c408(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IntegrationName: S.String,
          SourceArn: S.String,
          TargetArn: S.String,
          Description: S.optional(S.String),
          DataFilter: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          AdditionalEncryptionContext: S.optional(__S(9920, __c310, 0)),
          Tags: S.optional(__S(13185, __c412, 1)),
          IntegrationConfig: S.optional(__S(13120, __c410, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateIntegrationRequest" });
  }
}
function __c409(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(9856, __c308, 0));
  }
}
function __c410(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RefreshInterval: S.optional(S.String),
          SourceProperties: S.optional(__S(9920, __c310, 0)),
          ContinuousSync: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "IntegrationConfig" });
  }
}
function __c411(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceArn: S.String,
          TargetArn: S.String,
          IntegrationName: S.String,
          Description: S.optional(S.String),
          IntegrationArn: S.String,
          KmsKeyId: S.optional(S.String),
          AdditionalEncryptionContext: S.optional(__S(9920, __c310, 0)),
          Tags: S.optional(__S(13185, __c412, 1)),
          Status: S.String,
          CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Errors: S.optional(__S(13088, __c409, 0)),
          DataFilter: S.optional(S.String),
          IntegrationConfig: S.optional(__S(13120, __c410, 0)),
        }),
      ).annotate({ identifier: "CreateIntegrationResponse" });
  }
}
function __c412(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(13184, __c412, 0));
  }
}
function __c413(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          SourceProcessingProperties: S.optional(__S(13248, __c414, 0)),
          TargetProcessingProperties: S.optional(__S(13249, __c414, 1)),
          Tags: S.optional(__S(13185, __c412, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateIntegrationResourcePropertyRequest" });
  }
}
function __c414(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RoleArn: S.optional(S.String) })).annotate({
        identifier: "SourceProcessingProperties",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RoleArn: S.optional(S.String),
          KmsArn: S.optional(S.String),
          ConnectionName: S.optional(S.String),
          EventBusArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetProcessingProperties" });
  }
}
function __c415(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          ResourcePropertyArn: S.optional(S.String),
          SourceProcessingProperties: S.optional(__S(13248, __c414, 0)),
          TargetProcessingProperties: S.optional(__S(13249, __c414, 1)),
        }),
      ).annotate({ identifier: "CreateIntegrationResourcePropertyResponse" });
  }
}
function __c416(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          TableName: S.String,
          SourceTableConfig: S.optional(__S(13344, __c417, 0)),
          TargetTableConfig: S.optional(__S(13347, __c417, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateIntegrationTablePropertiesRequest" });
  }
}
function __c417(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Fields: S.optional(__S(9792, __c306, 0)),
          FilterPredicate: S.optional(S.String),
          PrimaryKey: S.optional(__S(9792, __c306, 0)),
          RecordUpdateField: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceTableConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FieldName: S.optional(S.String),
          FunctionSpec: S.optional(S.String),
          ConversionSpec: S.optional(S.String),
        }),
      ).annotate({ identifier: "IntegrationPartition" });
    case 2:
      return S.Array(__S(13345, __c417, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          UnnestSpec: S.optional(S.String),
          PartitionSpec: S.optional(__S(13346, __c417, 2)),
          TargetTableName: S.optional(S.String),
          IntegrationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetTableConfig" });
  }
}
function __c418(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          JobMode: S.optional(S.String),
          JobRunQueuingEnabled: S.optional(S.Boolean),
          Description: S.optional(S.String),
          LogUri: S.optional(S.String),
          Role: S.String,
          ExecutionProperty: S.optional(__S(11168, __c349, 0)),
          Command: __S(11169, __c349, 1),
          DefaultArguments: S.optional(__S(9920, __c310, 0)),
          NonOverridableArguments: S.optional(__S(9920, __c310, 0)),
          Connections: S.optional(__S(11136, __c348, 0)),
          MaxRetries: S.optional(S.Number),
          AllocatedCapacity: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          MaxCapacity: S.optional(S.Number),
          SecurityConfiguration: S.optional(S.String),
          Tags: S.optional(__S(9920, __c310, 0)),
          NotificationProperty: S.optional(__S(11072, __c346, 0)),
          GlueVersion: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          CodeGenConfigurationNodes: S.optional(__S(11289, __c352, 25)),
          ExecutionClass: S.optional(S.String),
          SourceControlDetails: S.optional(__S(11290, __c352, 26)),
          MaintenanceWindow: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateJobRequest" });
  }
}
function __c419(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          InputRecordTables: __S(13472, __c421, 0),
          Parameters: __S(13505, __c422, 1),
          Role: S.String,
          GlueVersion: S.optional(S.String),
          MaxCapacity: S.optional(S.Number),
          WorkerType: S.optional(S.String),
          NumberOfWorkers: S.optional(S.Number),
          Timeout: S.optional(S.Number),
          MaxRetries: S.optional(S.Number),
          Tags: S.optional(__S(9920, __c310, 0)),
          TransformEncryption: S.optional(__S(13474, __c421, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMLTransformRequest" });
  }
}
function __c420(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TransformId: S.optional(S.String) })).annotate({
        identifier: "CreateMLTransformResponse",
      });
  }
}
function __c421(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(10688, __c334, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ MlUserDataEncryptionMode: S.String, KmsKeyId: S.optional(S.String) }),
      ).annotate({ identifier: "MLUserDataEncryption" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MlUserDataEncryption: S.optional(__S(13473, __c421, 1)),
          TaskRunSecurityConfigurationName: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransformEncryption" });
  }
}
function __c422(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PrimaryKeyColumnName: S.optional(S.String),
          PrecisionRecallTradeoff: S.optional(S.Number),
          AccuracyCostTradeoff: S.optional(S.Number),
          EnforceProvidedLabels: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FindMatchesParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TransformType: S.String,
          FindMatchesParameters: S.optional(__S(13504, __c422, 0)),
        }),
      ).annotate({ identifier: "TransformParameters" });
  }
}
function __c423(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          PartitionInput: __S(10016, __c313, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePartitionRequest" });
  }
}
function __c424(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          PartitionIndex: __S(13600, __c425, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePartitionIndexRequest" });
  }
}
function __c425(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Keys: __S(9792, __c306, 0), IndexName: S.String }),
      ).annotate({ identifier: "PartitionIndex" });
  }
}
function __c426(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistryName: S.String,
          Description: S.optional(S.String),
          Tags: S.optional(__S(9920, __c310, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRegistryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistryArn: S.optional(S.String),
          RegistryName: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(9920, __c310, 0)),
        }),
      ).annotate({ identifier: "CreateRegistryResponse" });
  }
}
function __c427(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistryId: S.optional(__S(13696, __c428, 0)),
          SchemaName: S.String,
          DataFormat: S.String,
          Compatibility: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(9920, __c310, 0)),
          SchemaDefinition: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSchemaInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistryName: S.optional(S.String),
          RegistryArn: S.optional(S.String),
          SchemaName: S.optional(S.String),
          SchemaArn: S.optional(S.String),
          Description: S.optional(S.String),
          DataFormat: S.optional(S.String),
          Compatibility: S.optional(S.String),
          SchemaCheckpoint: S.optional(S.Number),
          LatestSchemaVersion: S.optional(S.Number),
          NextSchemaVersion: S.optional(S.Number),
          SchemaStatus: S.optional(S.String),
          Tags: S.optional(__S(9920, __c310, 0)),
          SchemaVersionId: S.optional(S.String),
          SchemaVersionStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateSchemaResponse" });
  }
}
function __c428(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistryName: S.optional(S.String), RegistryArn: S.optional(S.String) }),
      ).annotate({ identifier: "RegistryId" });
  }
}
function __c429(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DagNodes: S.optional(__S(13761, __c430, 1)),
          DagEdges: S.optional(__S(13763, __c430, 3)),
          Language: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScriptRequest" });
  }
}
function __c430(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          NodeType: S.String,
          Args: __S(13793, __c431, 1),
          LineNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CodeGenNode" });
    case 1:
      return S.Array(__S(13760, __c430, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Source: S.String, Target: S.String, TargetParameter: S.optional(S.String) }),
      ).annotate({ identifier: "CodeGenEdge" });
    case 3:
      return S.Array(__S(13762, __c430, 2));
  }
}
function __c431(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Value: S.String, Param: S.optional(S.Boolean) }),
      ).annotate({ identifier: "CodeGenNodeArg" });
    case 1:
      return S.Array(__S(13792, __c431, 0));
  }
}
function __c432(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PythonScript: S.optional(S.String), ScalaCode: S.optional(S.String) }),
      ).annotate({ identifier: "CreateScriptResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
