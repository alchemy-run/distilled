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
  sdkId: "SupplyChain",
  serviceShapeName: "GalaxyPublicAPIGateway",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "scn" });
const ver = /*@__PURE__*/ T.ServiceVersion("2024-01-01");
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
              `https://scn-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://scn-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://scn.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://scn.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://scn.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type UUID = string;
export type ConfigurationS3Uri = string;
export type ClientToken = string;
export interface CreateBillOfMaterialsImportJobRequest {
  instanceId: string;
  s3uri: string;
  clientToken?: string;
}
export interface CreateBillOfMaterialsImportJobResponse {
  jobId: string;
}
export type DataIntegrationFlowName = string;
export type DataIntegrationFlowSourceType = "S3" | "DATASET" | (string & {});
export type DataIntegrationFlowSourceName = string;
export type S3BucketName = string;
export type DataIntegrationFlowS3Prefix = string;
export type DataIntegrationFlowFileType = "CSV" | "PARQUET" | "JSON" | (string & {});
export interface DataIntegrationFlowS3Options {
  fileType?: DataIntegrationFlowFileType;
}
export interface DataIntegrationFlowS3SourceConfiguration {
  bucketName: string;
  prefix: string;
  options?: DataIntegrationFlowS3Options;
}
export type DatasetIdentifier = string;
export type DataIntegrationFlowLoadType = "INCREMENTAL" | "REPLACE" | (string & {});
export type DataIntegrationFlowDedupeStrategyType = "FIELD_PRIORITY" | (string & {});
export type DataIntegrationFlowFieldPriorityDedupeFieldName = string;
export type DataIntegrationFlowFieldPriorityDedupeSortOrder = "ASC" | "DESC" | (string & {});
export interface DataIntegrationFlowFieldPriorityDedupeField {
  name: string;
  sortOrder: DataIntegrationFlowFieldPriorityDedupeSortOrder;
}
export type DataIntegrationFlowFieldPriorityDedupeFieldList =
  DataIntegrationFlowFieldPriorityDedupeField[];
export interface DataIntegrationFlowFieldPriorityDedupeStrategyConfiguration {
  fields: DataIntegrationFlowFieldPriorityDedupeField[];
}
export interface DataIntegrationFlowDedupeStrategy {
  type: DataIntegrationFlowDedupeStrategyType;
  fieldPriority?: DataIntegrationFlowFieldPriorityDedupeStrategyConfiguration;
}
export interface DataIntegrationFlowDatasetOptions {
  loadType?: DataIntegrationFlowLoadType;
  dedupeRecords?: boolean;
  dedupeStrategy?: DataIntegrationFlowDedupeStrategy;
}
export interface DataIntegrationFlowDatasetSourceConfiguration {
  datasetIdentifier: string;
  options?: DataIntegrationFlowDatasetOptions;
}
export interface DataIntegrationFlowSource {
  sourceType: DataIntegrationFlowSourceType;
  sourceName: string;
  s3Source?: DataIntegrationFlowS3SourceConfiguration;
  datasetSource?: DataIntegrationFlowDatasetSourceConfiguration;
}
export type DataIntegrationFlowSourceList = DataIntegrationFlowSource[];
export type DataIntegrationFlowTransformationType = "SQL" | "NONE" | (string & {});
export type DataIntegrationFlowSQLQuery = string | redacted.Redacted<string>;
export interface DataIntegrationFlowSQLTransformationConfiguration {
  query: string | redacted.Redacted<string>;
}
export interface DataIntegrationFlowTransformation {
  transformationType: DataIntegrationFlowTransformationType;
  sqlTransformation?: DataIntegrationFlowSQLTransformationConfiguration;
}
export type DataIntegrationFlowTargetType = "S3" | "DATASET" | (string & {});
export interface DataIntegrationFlowS3TargetConfiguration {
  bucketName: string;
  prefix: string;
  options?: DataIntegrationFlowS3Options;
}
export interface DataIntegrationFlowDatasetTargetConfiguration {
  datasetIdentifier: string;
  options?: DataIntegrationFlowDatasetOptions;
}
export interface DataIntegrationFlowTarget {
  targetType: DataIntegrationFlowTargetType;
  s3Target?: DataIntegrationFlowS3TargetConfiguration;
  datasetTarget?: DataIntegrationFlowDatasetTargetConfiguration;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateDataIntegrationFlowRequest {
  instanceId: string;
  name: string;
  sources: DataIntegrationFlowSource[];
  transformation: DataIntegrationFlowTransformation;
  target: DataIntegrationFlowTarget;
  tags?: { [key: string]: string | undefined };
}
export interface CreateDataIntegrationFlowResponse {
  instanceId: string;
  name: string;
}
export type DataLakeNamespaceName = string;
export type DataLakeDatasetName = string;
export type DataLakeDatasetSchemaName = string;
export type DataLakeDatasetSchemaFieldName = string;
export type DataLakeDatasetSchemaFieldType =
  | "INT"
  | "DOUBLE"
  | "STRING"
  | "TIMESTAMP"
  | "LONG"
  | (string & {});
export interface DataLakeDatasetSchemaField {
  name: string;
  type: DataLakeDatasetSchemaFieldType;
  isRequired: boolean;
}
export type DataLakeDatasetSchemaFieldList = DataLakeDatasetSchemaField[];
export interface DataLakeDatasetPrimaryKeyField {
  name: string;
}
export type DataLakeDatasetPrimaryKeyFieldList = DataLakeDatasetPrimaryKeyField[];
export interface DataLakeDatasetSchema {
  name: string;
  fields: DataLakeDatasetSchemaField[];
  primaryKeys?: DataLakeDatasetPrimaryKeyField[];
}
export type DataLakeDatasetDescription = string;
export type DataLakeDatasetPartitionTransformType =
  | "YEAR"
  | "MONTH"
  | "DAY"
  | "HOUR"
  | "IDENTITY"
  | (string & {});
export interface DataLakeDatasetPartitionFieldTransform {
  type: DataLakeDatasetPartitionTransformType;
}
export interface DataLakeDatasetPartitionField {
  name: string;
  transform: DataLakeDatasetPartitionFieldTransform;
}
export type DataLakeDatasetPartitionFieldList = DataLakeDatasetPartitionField[];
export interface DataLakeDatasetPartitionSpec {
  fields: DataLakeDatasetPartitionField[];
}
export interface CreateDataLakeDatasetRequest {
  instanceId: string;
  namespace: string;
  name: string;
  schema?: DataLakeDatasetSchema;
  description?: string;
  partitionSpec?: DataLakeDatasetPartitionSpec;
  tags?: { [key: string]: string | undefined };
}
export type AscResourceArn = string;
export interface DataLakeDataset {
  instanceId: string;
  namespace: string;
  name: string;
  arn: string;
  schema: DataLakeDatasetSchema;
  description?: string;
  partitionSpec?: DataLakeDatasetPartitionSpec;
  createdTime: Date;
  lastModifiedTime: Date;
}
export interface CreateDataLakeDatasetResponse {
  dataset: DataLakeDataset;
}
export type DataLakeNamespaceDescription = string;
export interface CreateDataLakeNamespaceRequest {
  instanceId: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export interface DataLakeNamespace {
  instanceId: string;
  name: string;
  arn: string;
  description?: string;
  createdTime: Date;
  lastModifiedTime: Date;
}
export interface CreateDataLakeNamespaceResponse {
  namespace: DataLakeNamespace;
}
export type InstanceName = string;
export type InstanceDescription = string;
export type KmsKeyArn = string;
export type InstanceWebAppDnsDomain = string;
export interface CreateInstanceRequest {
  instanceName?: string;
  instanceDescription?: string;
  kmsKeyArn?: string;
  webAppDnsDomain?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type AwsAccountId = string;
export type InstanceState =
  | "Initializing"
  | "Active"
  | "CreateFailed"
  | "DeleteFailed"
  | "Deleting"
  | "Deleted"
  | (string & {});
export interface Instance {
  instanceId: string;
  awsAccountId: string;
  state: InstanceState;
  errorMessage?: string;
  webAppDnsDomain?: string;
  createdTime?: Date;
  lastModifiedTime?: Date;
  instanceName?: string;
  instanceDescription?: string;
  kmsKeyArn?: string;
  versionNumber?: number;
}
export interface CreateInstanceResponse {
  instance: Instance;
}
export interface DeleteDataIntegrationFlowRequest {
  instanceId: string;
  name: string;
}
export interface DeleteDataIntegrationFlowResponse {
  instanceId: string;
  name: string;
}
export interface DeleteDataLakeDatasetRequest {
  instanceId: string;
  namespace: string;
  name: string;
}
export interface DeleteDataLakeDatasetResponse {
  instanceId: string;
  namespace: string;
  name: string;
}
export interface DeleteDataLakeNamespaceRequest {
  instanceId: string;
  name: string;
}
export interface DeleteDataLakeNamespaceResponse {
  instanceId: string;
  name: string;
}
export interface DeleteInstanceRequest {
  instanceId: string;
}
export interface DeleteInstanceResponse {
  instance: Instance;
}
export interface GetBillOfMaterialsImportJobRequest {
  instanceId: string;
  jobId: string;
}
export type ConfigurationJobStatus =
  | "NEW"
  | "FAILED"
  | "IN_PROGRESS"
  | "QUEUED"
  | "SUCCESS"
  | (string & {});
export interface BillOfMaterialsImportJob {
  instanceId: string;
  jobId: string;
  status: ConfigurationJobStatus;
  s3uri: string;
  message?: string;
}
export interface GetBillOfMaterialsImportJobResponse {
  job: BillOfMaterialsImportJob;
}
export interface GetDataIntegrationEventRequest {
  instanceId: string;
  eventId: string;
}
export type DataIntegrationEventType =
  | "scn.data.forecast"
  | "scn.data.inventorylevel"
  | "scn.data.inboundorder"
  | "scn.data.inboundorderline"
  | "scn.data.inboundorderlineschedule"
  | "scn.data.outboundorderline"
  | "scn.data.outboundshipment"
  | "scn.data.processheader"
  | "scn.data.processoperation"
  | "scn.data.processproduct"
  | "scn.data.reservation"
  | "scn.data.shipment"
  | "scn.data.shipmentstop"
  | "scn.data.shipmentstoporder"
  | "scn.data.supplyplan"
  | "scn.data.dataset"
  | (string & {});
export type DataIntegrationEventGroupId = string;
export type DataIntegrationDatasetArn = string;
export type DataIntegrationEventDatasetOperationType =
  | "APPEND"
  | "UPSERT"
  | "DELETE"
  | (string & {});
export type DataIntegrationEventDatasetLoadStatus =
  | "SUCCEEDED"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export interface DataIntegrationEventDatasetLoadExecutionDetails {
  status: DataIntegrationEventDatasetLoadStatus;
  message?: string;
}
export interface DataIntegrationEventDatasetTargetDetails {
  datasetIdentifier: string;
  operationType: DataIntegrationEventDatasetOperationType;
  datasetLoadExecution: DataIntegrationEventDatasetLoadExecutionDetails;
}
export interface DataIntegrationEvent {
  instanceId: string;
  eventId: string;
  eventType: DataIntegrationEventType;
  eventGroupId: string;
  eventTimestamp: Date;
  datasetTargetDetails?: DataIntegrationEventDatasetTargetDetails;
}
export interface GetDataIntegrationEventResponse {
  event: DataIntegrationEvent;
}
export interface GetDataIntegrationFlowRequest {
  instanceId: string;
  name: string;
}
export interface DataIntegrationFlow {
  instanceId: string;
  name: string;
  sources: DataIntegrationFlowSource[];
  transformation: DataIntegrationFlowTransformation;
  target: DataIntegrationFlowTarget;
  createdTime: Date;
  lastModifiedTime: Date;
}
export interface GetDataIntegrationFlowResponse {
  flow: DataIntegrationFlow;
}
export interface GetDataIntegrationFlowExecutionRequest {
  instanceId: string;
  flowName: string;
  executionId: string;
}
export type DataIntegrationFlowExecutionStatus =
  | "SUCCEEDED"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export type DataIntegrationS3ObjectKey = string;
export interface DataIntegrationFlowS3Source {
  bucketName: string;
  key: string;
}
export interface DataIntegrationFlowDatasetSource {
  datasetIdentifier: string;
}
export interface DataIntegrationFlowExecutionSourceInfo {
  sourceType: DataIntegrationFlowSourceType;
  s3Source?: DataIntegrationFlowS3Source;
  datasetSource?: DataIntegrationFlowDatasetSource;
}
export type DataIntegrationFlowExecutionDiagnosticReportsRootS3URI = string;
export interface DataIntegrationFlowExecutionOutputMetadata {
  diagnosticReportsRootS3URI?: string;
}
export interface DataIntegrationFlowExecution {
  instanceId: string;
  flowName: string;
  executionId: string;
  status?: DataIntegrationFlowExecutionStatus;
  sourceInfo?: DataIntegrationFlowExecutionSourceInfo;
  message?: string;
  startTime?: Date;
  endTime?: Date;
  outputMetadata?: DataIntegrationFlowExecutionOutputMetadata;
}
export interface GetDataIntegrationFlowExecutionResponse {
  flowExecution: DataIntegrationFlowExecution;
}
export interface GetDataLakeDatasetRequest {
  instanceId: string;
  namespace: string;
  name: string;
}
export interface GetDataLakeDatasetResponse {
  dataset: DataLakeDataset;
}
export interface GetDataLakeNamespaceRequest {
  instanceId: string;
  name: string;
}
export interface GetDataLakeNamespaceResponse {
  namespace: DataLakeNamespace;
}
export interface GetInstanceRequest {
  instanceId: string;
}
export interface GetInstanceResponse {
  instance: Instance;
}
export type DataIntegrationEventNextToken = string;
export type DataIntegrationEventMaxResults = number;
export interface ListDataIntegrationEventsRequest {
  instanceId: string;
  eventType?: DataIntegrationEventType;
  nextToken?: string;
  maxResults?: number;
}
export type DataIntegrationEventList = DataIntegrationEvent[];
export interface ListDataIntegrationEventsResponse {
  events: DataIntegrationEvent[];
  nextToken?: string;
}
export type DataIntegrationFlowExecutionNextToken = string;
export type DataIntegrationFlowExecutionMaxResults = number;
export interface ListDataIntegrationFlowExecutionsRequest {
  instanceId: string;
  flowName: string;
  nextToken?: string;
  maxResults?: number;
}
export type DataIntegrationFlowExecutionList = DataIntegrationFlowExecution[];
export interface ListDataIntegrationFlowExecutionsResponse {
  flowExecutions: DataIntegrationFlowExecution[];
  nextToken?: string;
}
export type DataIntegrationFlowNextToken = string;
export type DataIntegrationFlowMaxResults = number;
export interface ListDataIntegrationFlowsRequest {
  instanceId: string;
  nextToken?: string;
  maxResults?: number;
}
export type DataIntegrationFlowList = DataIntegrationFlow[];
export interface ListDataIntegrationFlowsResponse {
  flows: DataIntegrationFlow[];
  nextToken?: string;
}
export type DataLakeDatasetNextToken = string;
export type DataLakeDatasetMaxResults = number;
export interface ListDataLakeDatasetsRequest {
  instanceId: string;
  namespace: string;
  nextToken?: string;
  maxResults?: number;
}
export type DataLakeDatasetList = DataLakeDataset[];
export interface ListDataLakeDatasetsResponse {
  datasets: DataLakeDataset[];
  nextToken?: string;
}
export type DataLakeNamespaceNextToken = string;
export type DataLakeNamespaceMaxResults = number;
export interface ListDataLakeNamespacesRequest {
  instanceId: string;
  nextToken?: string;
  maxResults?: number;
}
export type DataLakeNamespaceList = DataLakeNamespace[];
export interface ListDataLakeNamespacesResponse {
  namespaces: DataLakeNamespace[];
  nextToken?: string;
}
export type InstanceNextToken = string;
export type InstanceMaxResults = number;
export type InstanceNameList = string[];
export type InstanceStateList = InstanceState[];
export interface ListInstancesRequest {
  nextToken?: string;
  maxResults?: number;
  instanceNameFilter?: string[];
  instanceStateFilter?: InstanceState[];
}
export type InstanceList = Instance[];
export interface ListInstancesResponse {
  instances: Instance[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export type DataIntegrationEventData = string | redacted.Redacted<string>;
export interface DataIntegrationEventDatasetTargetConfiguration {
  datasetIdentifier: string;
  operationType: DataIntegrationEventDatasetOperationType;
}
export interface SendDataIntegrationEventRequest {
  instanceId: string;
  eventType: DataIntegrationEventType;
  data: string | redacted.Redacted<string>;
  eventGroupId: string;
  eventTimestamp?: Date;
  clientToken?: string;
  datasetTarget?: DataIntegrationEventDatasetTargetConfiguration;
}
export interface SendDataIntegrationEventResponse {
  eventId: string;
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
export interface UpdateDataIntegrationFlowRequest {
  instanceId: string;
  name: string;
  sources?: DataIntegrationFlowSource[];
  transformation?: DataIntegrationFlowTransformation;
  target?: DataIntegrationFlowTarget;
}
export interface UpdateDataIntegrationFlowResponse {
  flow: DataIntegrationFlow;
}
export interface UpdateDataLakeDatasetRequest {
  instanceId: string;
  namespace: string;
  name: string;
  description?: string;
}
export interface UpdateDataLakeDatasetResponse {
  dataset: DataLakeDataset;
}
export interface UpdateDataLakeNamespaceRequest {
  instanceId: string;
  name: string;
  description?: string;
}
export interface UpdateDataLakeNamespaceResponse {
  namespace: DataLakeNamespace;
}
export interface UpdateInstanceRequest {
  instanceId: string;
  instanceName?: string;
  instanceDescription?: string;
}
export interface UpdateInstanceResponse {
  instance: Instance;
}
export type CreateBillOfMaterialsImportJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * CreateBillOfMaterialsImportJob creates an import job for the Product Bill Of Materials (BOM) entity. For information on the product_bom entity, see the AWS Supply Chain User Guide.
 *
 * The CSV file must be located in an Amazon S3 location accessible to AWS Supply Chain. It is recommended to use the same Amazon S3 bucket created during your AWS Supply Chain instance creation.
 */
export const createBillOfMaterialsImportJob: API.OperationMethod<
  CreateBillOfMaterialsImportJobRequest,
  CreateBillOfMaterialsImportJobResponse,
  CreateBillOfMaterialsImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<CreateBillOfMaterialsImportJobRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<CreateBillOfMaterialsImportJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBillOfMaterialsImportJob",
}));

export type CreateDataIntegrationFlowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically create a data pipeline to ingest data from source systems such as Amazon S3 buckets, to a predefined Amazon Web Services Supply Chain dataset (product, inbound_order) or a temporary dataset along with the data transformation query provided with the API.
 */
export const createDataIntegrationFlow: API.OperationMethod<
  CreateDataIntegrationFlowRequest,
  CreateDataIntegrationFlowResponse,
  CreateDataIntegrationFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<CreateDataIntegrationFlowRequest>,
  output: __S(624, __c39, 0) as any as S.Schema<CreateDataIntegrationFlowResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataIntegrationFlow",
}));

export type CreateDataLakeDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically create an Amazon Web Services Supply Chain data lake dataset. Developers can create the datasets using their pre-defined or custom schema for a given instance ID, namespace, and dataset name.
 */
export const createDataLakeDataset: API.OperationMethod<
  CreateDataLakeDatasetRequest,
  CreateDataLakeDatasetResponse,
  CreateDataLakeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<CreateDataLakeDatasetRequest>,
  output: __S(704, __c44, 0) as any as S.Schema<CreateDataLakeDatasetResponse>,
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
  operationName: "CreateDataLakeDataset",
}));

export type CreateDataLakeNamespaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically create an Amazon Web Services Supply Chain data lake namespace. Developers can create the namespaces for a given instance ID.
 */
export const createDataLakeNamespace: API.OperationMethod<
  CreateDataLakeNamespaceRequest,
  CreateDataLakeNamespaceResponse,
  CreateDataLakeNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateDataLakeNamespaceRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<CreateDataLakeNamespaceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataLakeNamespace",
}));

export type CreateInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically create an Amazon Web Services Supply Chain instance by applying KMS keys and relevant information associated with the API without using the Amazon Web Services console.
 *
 * This is an asynchronous operation. Upon receiving a CreateInstance request, Amazon Web Services Supply Chain immediately returns the instance resource, instance ID, and the initializing state while simultaneously creating all required Amazon Web Services resources for an instance creation. You can use GetInstance to check the status of the instance. If the instance results in an unhealthy state, you need to check the error message, delete the current instance, and recreate a new one based on the mitigation from the error message.
 */
export const createInstance: API.OperationMethod<
  CreateInstanceRequest,
  CreateInstanceResponse,
  CreateInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<CreateInstanceRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<CreateInstanceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstance",
}));

export type DeleteDataIntegrationFlowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Enable you to programmatically delete an existing data pipeline for the provided Amazon Web Services Supply Chain instance and DataIntegrationFlow name.
 */
export const deleteDataIntegrationFlow: API.OperationMethod<
  DeleteDataIntegrationFlowRequest,
  DeleteDataIntegrationFlowResponse,
  DeleteDataIntegrationFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DeleteDataIntegrationFlowRequest>,
  output: __S(624, __c39, 0) as any as S.Schema<DeleteDataIntegrationFlowResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataIntegrationFlow",
}));

export type DeleteDataLakeDatasetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically delete an Amazon Web Services Supply Chain data lake dataset. Developers can delete the existing datasets for a given instance ID, namespace, and instance name.
 */
export const deleteDataLakeDataset: API.OperationMethod<
  DeleteDataLakeDatasetRequest,
  DeleteDataLakeDatasetResponse,
  DeleteDataLakeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteDataLakeDatasetRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<DeleteDataLakeDatasetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataLakeDataset",
}));

export type DeleteDataLakeNamespaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically delete an Amazon Web Services Supply Chain data lake namespace and its underling datasets. Developers can delete the existing namespaces for a given instance ID and namespace name.
 */
export const deleteDataLakeNamespace: API.OperationMethod<
  DeleteDataLakeNamespaceRequest,
  DeleteDataLakeNamespaceResponse,
  DeleteDataLakeNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DeleteDataLakeNamespaceRequest>,
  output: __S(624, __c39, 0) as any as S.Schema<DeleteDataLakeNamespaceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataLakeNamespace",
}));

export type DeleteInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically delete an Amazon Web Services Supply Chain instance by deleting the KMS keys and relevant information associated with the API without using the Amazon Web Services console.
 *
 * This is an asynchronous operation. Upon receiving a DeleteInstance request, Amazon Web Services Supply Chain immediately returns a response with the instance resource, delete state while cleaning up all Amazon Web Services resources created during the instance creation process. You can use the GetInstance action to check the instance status.
 */
export const deleteInstance: API.OperationMethod<
  DeleteInstanceRequest,
  DeleteInstanceResponse,
  DeleteInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteInstanceRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<DeleteInstanceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstance",
}));

export type GetBillOfMaterialsImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get status and details of a BillOfMaterialsImportJob.
 */
export const getBillOfMaterialsImportJob: API.OperationMethod<
  GetBillOfMaterialsImportJobRequest,
  GetBillOfMaterialsImportJobResponse,
  GetBillOfMaterialsImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<GetBillOfMaterialsImportJobRequest>,
  output: __S(162, __c10, 2) as any as S.Schema<GetBillOfMaterialsImportJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillOfMaterialsImportJob",
}));

export type GetDataIntegrationEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically view an Amazon Web Services Supply Chain Data Integration Event. Developers can view the eventType, eventGroupId, eventTimestamp, datasetTarget, datasetLoadExecution.
 */
export const getDataIntegrationEvent: API.OperationMethod<
  GetDataIntegrationEventRequest,
  GetDataIntegrationEventResponse,
  GetDataIntegrationEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<GetDataIntegrationEventRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<GetDataIntegrationEventResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataIntegrationEvent",
}));

export type GetDataIntegrationFlowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically view a specific data pipeline for the provided Amazon Web Services Supply Chain instance and DataIntegrationFlow name.
 */
export const getDataIntegrationFlow: API.OperationMethod<
  GetDataIntegrationFlowRequest,
  GetDataIntegrationFlowResponse,
  GetDataIntegrationFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<GetDataIntegrationFlowRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<GetDataIntegrationFlowResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataIntegrationFlow",
}));

export type GetDataIntegrationFlowExecutionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the flow execution.
 */
export const getDataIntegrationFlowExecution: API.OperationMethod<
  GetDataIntegrationFlowExecutionRequest,
  GetDataIntegrationFlowExecutionResponse,
  GetDataIntegrationFlowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<GetDataIntegrationFlowExecutionRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<GetDataIntegrationFlowExecutionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataIntegrationFlowExecution",
}));

export type GetDataLakeDatasetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically view an Amazon Web Services Supply Chain data lake dataset. Developers can view the data lake dataset information such as namespace, schema, and so on for a given instance ID, namespace, and dataset name.
 */
export const getDataLakeDataset: API.OperationMethod<
  GetDataLakeDatasetRequest,
  GetDataLakeDatasetResponse,
  GetDataLakeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<GetDataLakeDatasetRequest>,
  output: __S(704, __c44, 0) as any as S.Schema<GetDataLakeDatasetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakeDataset",
}));

export type GetDataLakeNamespaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically view an Amazon Web Services Supply Chain data lake namespace. Developers can view the data lake namespace information such as description for a given instance ID and namespace name.
 */
export const getDataLakeNamespace: API.OperationMethod<
  GetDataLakeNamespaceRequest,
  GetDataLakeNamespaceResponse,
  GetDataLakeNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<GetDataLakeNamespaceRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<GetDataLakeNamespaceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakeNamespace",
}));

export type GetInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically retrieve the information related to an Amazon Web Services Supply Chain instance ID.
 */
export const getInstance: API.OperationMethod<
  GetInstanceRequest,
  GetInstanceResponse,
  GetInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<GetInstanceRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<GetInstanceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstance",
}));

export type ListDataIntegrationEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically list all data integration events for the provided Amazon Web Services Supply Chain instance.
 */
export const listDataIntegrationEvents: API.PaginatedOperationMethod<
  ListDataIntegrationEventsRequest,
  ListDataIntegrationEventsResponse,
  ListDataIntegrationEventsError,
  Credentials | HttpClient.HttpClient,
  DataIntegrationEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<ListDataIntegrationEventsRequest>,
  output: __S(338, __c21, 2) as any as S.Schema<ListDataIntegrationEventsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataIntegrationEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataIntegrationFlowExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List flow executions.
 */
export const listDataIntegrationFlowExecutions: API.PaginatedOperationMethod<
  ListDataIntegrationFlowExecutionsRequest,
  ListDataIntegrationFlowExecutionsResponse,
  ListDataIntegrationFlowExecutionsError,
  Credentials | HttpClient.HttpClient,
  DataIntegrationFlowExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<ListDataIntegrationFlowExecutionsRequest>,
  output: __S(354, __c22, 2) as any as S.Schema<ListDataIntegrationFlowExecutionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataIntegrationFlowExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flowExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataIntegrationFlowsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically list all data pipelines for the provided Amazon Web Services Supply Chain instance.
 */
export const listDataIntegrationFlows: API.PaginatedOperationMethod<
  ListDataIntegrationFlowsRequest,
  ListDataIntegrationFlowsResponse,
  ListDataIntegrationFlowsError,
  Credentials | HttpClient.HttpClient,
  DataIntegrationFlow
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<ListDataIntegrationFlowsRequest>,
  output: __S(370, __c23, 2) as any as S.Schema<ListDataIntegrationFlowsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataIntegrationFlows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flows",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataLakeDatasetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically view the list of Amazon Web Services Supply Chain data lake datasets. Developers can view the datasets and the corresponding information such as namespace, schema, and so on for a given instance ID and namespace.
 */
export const listDataLakeDatasets: API.PaginatedOperationMethod<
  ListDataLakeDatasetsRequest,
  ListDataLakeDatasetsResponse,
  ListDataLakeDatasetsError,
  Credentials | HttpClient.HttpClient,
  DataLakeDataset
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<ListDataLakeDatasetsRequest>,
  output: __S(386, __c24, 2) as any as S.Schema<ListDataLakeDatasetsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataLakeDatasets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataLakeNamespacesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically view the list of Amazon Web Services Supply Chain data lake namespaces. Developers can view the namespaces and the corresponding information such as description for a given instance ID. Note that this API only return custom namespaces, instance pre-defined namespaces are not included.
 */
export const listDataLakeNamespaces: API.PaginatedOperationMethod<
  ListDataLakeNamespacesRequest,
  ListDataLakeNamespacesResponse,
  ListDataLakeNamespacesError,
  Credentials | HttpClient.HttpClient,
  DataLakeNamespace
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<ListDataLakeNamespacesRequest>,
  output: __S(402, __c25, 2) as any as S.Schema<ListDataLakeNamespacesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataLakeNamespaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "namespaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all Amazon Web Services Supply Chain instances for a specific account. Enables you to programmatically list all Amazon Web Services Supply Chain instances based on their account ID, instance name, and state of the instance (active or delete).
 */
export const listInstances: API.PaginatedOperationMethod<
  ListInstancesRequest,
  ListInstancesResponse,
  ListInstancesError,
  Credentials | HttpClient.HttpClient,
  Instance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(417, __c26, 1) as any as S.Schema<ListInstancesRequest>,
  output: __S(419, __c26, 3) as any as S.Schema<ListInstancesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "instances",
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
 * List all the tags for an Amazon Web ServicesSupply Chain resource. You can list all the tags added to a resource. By listing the tags, developers can view the tag level information on a resource and perform actions such as, deleting a resource associated with a particular tag.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

export type SendDataIntegrationEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Send the data payload for the event with real-time data for analysis or monitoring. The real-time data events are stored in an Amazon Web Services service before being processed and stored in data lake.
 */
export const sendDataIntegrationEvent: API.OperationMethod<
  SendDataIntegrationEventRequest,
  SendDataIntegrationEventResponse,
  SendDataIntegrationEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(465, __c29, 1) as any as S.Schema<SendDataIntegrationEventRequest>,
  output: __S(466, __c29, 2) as any as S.Schema<SendDataIntegrationEventResponse>,
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
  operationName: "SendDataIntegrationEvent",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * You can create tags during or after creating a resource such as instance, data flow, or dataset in AWS Supply chain. During the data ingestion process, you can add tags such as dev, test, or prod to data flows created during the data ingestion process in the AWS Supply Chain datasets. You can use these tags to identify a group of resources or a single resource used by the developer.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * You can delete tags for an Amazon Web Services Supply chain resource such as instance, data flow, or dataset in AWS Supply Chain. During the data ingestion process, you can delete tags such as dev, test, or prod to data flows created during the data ingestion process in the AWS Supply Chain datasets.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDataIntegrationFlowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically update an existing data pipeline to ingest data from the source systems such as, Amazon S3 buckets, to a predefined Amazon Web Services Supply Chain dataset (product, inbound_order) or a temporary dataset along with the data transformation query provided with the API.
 */
export const updateDataIntegrationFlow: API.OperationMethod<
  UpdateDataIntegrationFlowRequest,
  UpdateDataIntegrationFlowResponse,
  UpdateDataIntegrationFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<UpdateDataIntegrationFlowRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<UpdateDataIntegrationFlowResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataIntegrationFlow",
}));

export type UpdateDataLakeDatasetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically update an Amazon Web Services Supply Chain data lake dataset. Developers can update the description of a data lake dataset for a given instance ID, namespace, and dataset name.
 */
export const updateDataLakeDataset: API.OperationMethod<
  UpdateDataLakeDatasetRequest,
  UpdateDataLakeDatasetResponse,
  UpdateDataLakeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<UpdateDataLakeDatasetRequest>,
  output: __S(704, __c44, 0) as any as S.Schema<UpdateDataLakeDatasetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataLakeDataset",
}));

export type UpdateDataLakeNamespaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically update an Amazon Web Services Supply Chain data lake namespace. Developers can update the description of a data lake namespace for a given instance ID and namespace name.
 */
export const updateDataLakeNamespace: API.OperationMethod<
  UpdateDataLakeNamespaceRequest,
  UpdateDataLakeNamespaceResponse,
  UpdateDataLakeNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<UpdateDataLakeNamespaceRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<UpdateDataLakeNamespaceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataLakeNamespace",
}));

export type UpdateInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to programmatically update an Amazon Web Services Supply Chain instance description by providing all the relevant information such as account ID, instance ID and so on without using the AWS console.
 */
export const updateInstance: API.OperationMethod<
  UpdateInstanceRequest,
  UpdateInstanceResponse,
  UpdateInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<UpdateInstanceRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<UpdateInstanceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstance",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          tags: S.optional(__S(656, __c41, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/api/datalake/instance/{instanceId}/namespaces/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataLakeNamespaceRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String,
          name: S.String,
          arn: S.String,
          description: S.optional(S.String),
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DataLakeNamespace" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ namespace: __S(16, __c1, 0) })).annotate({
        identifier: "CreateDataLakeNamespaceResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceName: S.optional(S.String),
          instanceDescription: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          webAppDnsDomain: S.optional(S.String),
          tags: S.optional(__S(656, __c41, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/api/instance" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateInstanceRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String,
          awsAccountId: S.String,
          state: S.String,
          errorMessage: S.optional(S.String),
          webAppDnsDomain: S.optional(S.String),
          createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          instanceName: S.optional(S.String),
          instanceDescription: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          versionNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Instance" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ instance: __S(64, __c4, 0) })).annotate({
        identifier: "CreateInstanceResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/api/data-integration/instance/{instanceId}/data-integration-flows/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataIntegrationFlowRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/api/datalake/instance/{instanceId}/namespaces/{namespace}/datasets/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataLakeDatasetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ instanceId: S.String, namespace: S.String, name: S.String }),
      ).annotate({ identifier: "DeleteDataLakeDatasetResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/api/datalake/instance/{instanceId}/namespaces/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataLakeNamespaceRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceId: S.String.pipe(T.HttpLabel("instanceId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/api/instance/{instanceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInstanceRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/api/configuration/instances/{instanceId}/bill-of-materials-import-jobs/{jobId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBillOfMaterialsImportJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String,
          jobId: S.String,
          status: S.String,
          s3uri: S.String,
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "BillOfMaterialsImportJob" });
    case 2:
      return S.suspend(() => S.Struct({ job: __S(161, __c10, 1) })).annotate({
        identifier: "GetBillOfMaterialsImportJobResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          eventId: S.String.pipe(T.HttpLabel("eventId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/api-data/data-integration/instance/{instanceId}/data-integration-events/{eventId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataIntegrationEventRequest" });
    case 1:
      return S.suspend(() => S.Struct({ event: __S(194, __c12, 2) })).annotate({
        identifier: "GetDataIntegrationEventResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ status: S.String, message: S.optional(S.String) }),
      ).annotate({ identifier: "DataIntegrationEventDatasetLoadExecutionDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          datasetIdentifier: S.String,
          operationType: S.String,
          datasetLoadExecution: __S(192, __c12, 0),
        }),
      ).annotate({ identifier: "DataIntegrationEventDatasetTargetDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String,
          eventId: S.String,
          eventType: S.String,
          eventGroupId: S.String,
          eventTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          datasetTargetDetails: S.optional(__S(193, __c12, 1)),
        }),
      ).annotate({ identifier: "DataIntegrationEvent" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/api/data-integration/instance/{instanceId}/data-integration-flows/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataIntegrationFlowRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String,
          name: S.String,
          sources: __S(649, __c40, 9),
          transformation: __S(651, __c40, 11),
          target: __S(652, __c40, 12),
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DataIntegrationFlow" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ flow: __S(224, __c14, 0) })).annotate({
        identifier: "GetDataIntegrationFlowResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          flowName: S.String.pipe(T.HttpLabel("flowName")),
          executionId: S.String.pipe(T.HttpLabel("executionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/api-data/data-integration/instance/{instanceId}/data-integration-flows/{flowName}/executions/{executionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataIntegrationFlowExecutionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ flowExecution: __S(276, __c17, 4) })).annotate({
        identifier: "GetDataIntegrationFlowExecutionResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ bucketName: S.String, key: S.String })).annotate({
        identifier: "DataIntegrationFlowS3Source",
      });
    case 1:
      return S.suspend(() => S.Struct({ datasetIdentifier: S.String })).annotate({
        identifier: "DataIntegrationFlowDatasetSource",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          sourceType: S.String,
          s3Source: S.optional(__S(272, __c17, 0)),
          datasetSource: S.optional(__S(273, __c17, 1)),
        }),
      ).annotate({ identifier: "DataIntegrationFlowExecutionSourceInfo" });
    case 3:
      return S.suspend(() =>
        S.Struct({ diagnosticReportsRootS3URI: S.optional(S.String) }),
      ).annotate({ identifier: "DataIntegrationFlowExecutionOutputMetadata" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String,
          flowName: S.String,
          executionId: S.String,
          status: S.optional(S.String),
          sourceInfo: S.optional(__S(274, __c17, 2)),
          message: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          outputMetadata: S.optional(__S(275, __c17, 3)),
        }),
      ).annotate({ identifier: "DataIntegrationFlowExecution" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/api/datalake/instance/{instanceId}/namespaces/{namespace}/datasets/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataLakeDatasetRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/api/datalake/instance/{instanceId}/namespaces/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataLakeNamespaceRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceId: S.String.pipe(T.HttpLabel("instanceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/api/instance/{instanceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstanceRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          eventType: S.optional(S.String).pipe(T.HttpQuery("eventType")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/api-data/data-integration/instance/{instanceId}/data-integration-events",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataIntegrationEventsRequest" });
    case 1:
      return S.Array(__S(194, __c12, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ events: __S(337, __c21, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataIntegrationEventsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          flowName: S.String.pipe(T.HttpLabel("flowName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/api-data/data-integration/instance/{instanceId}/data-integration-flows/{flowName}/executions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataIntegrationFlowExecutionsRequest" });
    case 1:
      return S.Array(__S(276, __c17, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({ flowExecutions: __S(353, __c22, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataIntegrationFlowExecutionsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/api/data-integration/instance/{instanceId}/data-integration-flows",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataIntegrationFlowsRequest" });
    case 1:
      return S.Array(__S(224, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ flows: __S(369, __c23, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataIntegrationFlowsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/api/datalake/instance/{instanceId}/namespaces/{namespace}/datasets",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataLakeDatasetsRequest" });
    case 1:
      return S.Array(__S(697, __c43, 9));
    case 2:
      return S.suspend(() =>
        S.Struct({ datasets: __S(385, __c24, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataLakeDatasetsResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/api/datalake/instance/{instanceId}/namespaces" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataLakeNamespacesRequest" });
    case 1:
      return S.Array(__S(16, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ namespaces: __S(401, __c25, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataLakeNamespacesResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          instanceNameFilter: S.optional(__S(432, __c27, 0)).pipe(
            T.HttpQuery("instanceNameFilter"),
          ),
          instanceStateFilter: S.optional(__S(416, __c26, 0)).pipe(
            T.HttpQuery("instanceStateFilter"),
          ),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/api/instance" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListInstancesRequest" });
    case 2:
      return S.Array(__S(64, __c4, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({ instances: __S(418, __c26, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListInstancesResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/api/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: __S(656, __c41, 0) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datasetIdentifier: S.String, operationType: S.String }),
      ).annotate({ identifier: "DataIntegrationEventDatasetTargetConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          eventType: S.String,
          data: SensitiveString,
          eventGroupId: S.String,
          eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          datasetTarget: S.optional(__S(464, __c29, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/api-data/data-integration/instance/{instanceId}/data-integration-events",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendDataIntegrationEventRequest" });
    case 2:
      return S.suspend(() => S.Struct({ eventId: S.String })).annotate({
        identifier: "SendDataIntegrationEventResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(656, __c41, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/api/tags/{resourceArn}" }),
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
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(432, __c27, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/api/tags/{resourceArn}" }),
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
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          name: S.String.pipe(T.HttpLabel("name")),
          sources: S.optional(__S(649, __c40, 9)),
          transformation: S.optional(__S(651, __c40, 11)),
          target: S.optional(__S(652, __c40, 12)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/api/data-integration/instance/{instanceId}/data-integration-flows/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataIntegrationFlowRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/api/datalake/instance/{instanceId}/namespaces/{namespace}/datasets/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataLakeDatasetRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/api/datalake/instance/{instanceId}/namespaces/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataLakeNamespaceRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          instanceName: S.optional(S.String),
          instanceDescription: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/api/instance/{instanceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateInstanceRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          s3uri: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/api/configuration/instances/{instanceId}/bill-of-materials-import-jobs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBillOfMaterialsImportJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ jobId: S.String })).annotate({
        identifier: "CreateBillOfMaterialsImportJobResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          name: S.String.pipe(T.HttpLabel("name")),
          sources: __S(649, __c40, 9),
          transformation: __S(651, __c40, 11),
          target: __S(652, __c40, 12),
          tags: S.optional(__S(656, __c41, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/api/data-integration/instance/{instanceId}/data-integration-flows/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataIntegrationFlowRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ instanceId: S.String, name: S.String })).annotate({
        identifier: "CreateDataIntegrationFlowResponse",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ fileType: S.optional(S.String) })).annotate({
        identifier: "DataIntegrationFlowS3Options",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          bucketName: S.String,
          prefix: S.String,
          options: S.optional(__S(640, __c40, 0)),
        }),
      ).annotate({ identifier: "DataIntegrationFlowS3SourceConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ name: S.String, sortOrder: S.String })).annotate({
        identifier: "DataIntegrationFlowFieldPriorityDedupeField",
      });
    case 3:
      return S.Array(__S(642, __c40, 2));
    case 4:
      return S.suspend(() => S.Struct({ fields: __S(643, __c40, 3) })).annotate({
        identifier: "DataIntegrationFlowFieldPriorityDedupeStrategyConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ type: S.String, fieldPriority: S.optional(__S(644, __c40, 4)) }),
      ).annotate({ identifier: "DataIntegrationFlowDedupeStrategy" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          loadType: S.optional(S.String),
          dedupeRecords: S.optional(S.Boolean),
          dedupeStrategy: S.optional(__S(645, __c40, 5)),
        }),
      ).annotate({ identifier: "DataIntegrationFlowDatasetOptions" });
    case 7:
      return S.suspend(() =>
        S.Struct({ datasetIdentifier: S.String, options: S.optional(__S(646, __c40, 6)) }),
      ).annotate({ identifier: "DataIntegrationFlowDatasetSourceConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          sourceType: S.String,
          sourceName: S.String,
          s3Source: S.optional(__S(641, __c40, 1)),
          datasetSource: S.optional(__S(647, __c40, 7)),
        }),
      ).annotate({ identifier: "DataIntegrationFlowSource" });
    case 9:
      return S.Array(__S(648, __c40, 8));
    case 10:
      return S.suspend(() => S.Struct({ query: SensitiveString })).annotate({
        identifier: "DataIntegrationFlowSQLTransformationConfiguration",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          transformationType: S.String,
          sqlTransformation: S.optional(__S(650, __c40, 10)),
        }),
      ).annotate({ identifier: "DataIntegrationFlowTransformation" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          targetType: S.String,
          s3Target: S.optional(__S(641, __c40, 1)),
          datasetTarget: S.optional(__S(647, __c40, 7)),
        }),
      ).annotate({ identifier: "DataIntegrationFlowTarget" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String.pipe(T.HttpLabel("instanceId")),
          namespace: S.String.pipe(T.HttpLabel("namespace")),
          name: S.String.pipe(T.HttpLabel("name")),
          schema: S.optional(__S(692, __c43, 4)),
          description: S.optional(S.String),
          partitionSpec: S.optional(__S(696, __c43, 8)),
          tags: S.optional(__S(656, __c41, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/api/datalake/instance/{instanceId}/namespaces/{namespace}/datasets/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataLakeDatasetRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, type: S.String, isRequired: S.Boolean }),
      ).annotate({ identifier: "DataLakeDatasetSchemaField" });
    case 1:
      return S.Array(__S(688, __c43, 0));
    case 2:
      return S.suspend(() => S.Struct({ name: S.String })).annotate({
        identifier: "DataLakeDatasetPrimaryKeyField",
      });
    case 3:
      return S.Array(__S(690, __c43, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          fields: __S(689, __c43, 1),
          primaryKeys: S.optional(__S(691, __c43, 3)),
        }),
      ).annotate({ identifier: "DataLakeDatasetSchema" });
    case 5:
      return S.suspend(() => S.Struct({ type: S.String })).annotate({
        identifier: "DataLakeDatasetPartitionFieldTransform",
      });
    case 6:
      return S.suspend(() => S.Struct({ name: S.String, transform: __S(693, __c43, 5) })).annotate({
        identifier: "DataLakeDatasetPartitionField",
      });
    case 7:
      return S.Array(__S(694, __c43, 6));
    case 8:
      return S.suspend(() => S.Struct({ fields: __S(695, __c43, 7) })).annotate({
        identifier: "DataLakeDatasetPartitionSpec",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String,
          namespace: S.String,
          name: S.String,
          arn: S.String,
          schema: __S(692, __c43, 4),
          description: S.optional(S.String),
          partitionSpec: S.optional(__S(696, __c43, 8)),
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DataLakeDataset" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ dataset: __S(697, __c43, 9) })).annotate({
        identifier: "CreateDataLakeDatasetResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
