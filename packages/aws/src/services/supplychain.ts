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
  sdkId: "SupplyChain",
  target: "GalaxyPublicAPIGateway",
  version: "2024-01-01",
  sigv4: "scn",
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
                `https://scn-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://scn-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://scn.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://scn.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type DataIntegrationFlowFileType =
  | "CSV"
  | "PARQUET"
  | "JSON"
  | (string & {});
export interface DataIntegrationFlowS3Options {
  fileType?: DataIntegrationFlowFileType;
}
export interface DataIntegrationFlowS3SourceConfiguration {
  bucketName: string;
  prefix: string;
  options?: DataIntegrationFlowS3Options;
}
export type DatasetIdentifier = string;
export type DataIntegrationFlowLoadType =
  | "INCREMENTAL"
  | "REPLACE"
  | (string & {});
export type DataIntegrationFlowDedupeStrategyType =
  | "FIELD_PRIORITY"
  | (string & {});
export type DataIntegrationFlowFieldPriorityDedupeFieldName = string;
export type DataIntegrationFlowFieldPriorityDedupeSortOrder =
  | "ASC"
  | "DESC"
  | (string & {});
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
export type DataIntegrationFlowTransformationType =
  | "SQL"
  | "NONE"
  | (string & {});
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
export type DataLakeDatasetPrimaryKeyFieldList =
  DataLakeDatasetPrimaryKeyField[];
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
  descriptor: {
    service: svc,
    http: "POST /api/configuration/instances/{instanceId}/bill-of-materials-import-jobs",
    input: { instanceId: 0, s3uri: 0, clientToken: D.m({ idempotency: true }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /api/data-integration/instance/{instanceId}/data-integration-flows/{name}",
    input: {
      instanceId: 0,
      name: 0,
      sources: D.list(i_DataIntegrationFlowSource),
      transformation: i_DataIntegrationFlowTransformation,
      target: i_DataIntegrationFlowTarget,
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /api/datalake/instance/{instanceId}/namespaces/{namespace}/datasets/{name}",
    input: {
      instanceId: 0,
      namespace: 0,
      name: 0,
      schema: {
        name: 0,
        fields: D.list({ name: 0, type: 0, isRequired: 0 }),
        primaryKeys: D.list({ name: 0 }),
      },
      description: 0,
      partitionSpec: { fields: D.list({ name: 0, transform: { type: 0 } }) },
      tags: 0,
    },
    output: { dataset: o_DataLakeDataset },
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
  operationName: "CreateDataLakeDataset",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /api/datalake/instance/{instanceId}/namespaces/{name}",
    input: { instanceId: 0, name: 0, description: 0, tags: 0 },
    output: { namespace: o_DataLakeNamespace },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /api/instance",
    input: {
      instanceName: 0,
      instanceDescription: 0,
      kmsKeyArn: 0,
      webAppDnsDomain: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { instance: o_Instance },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /api/data-integration/instance/{instanceId}/data-integration-flows/{name}",
    input: { instanceId: 0, name: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataIntegrationFlow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /api/datalake/instance/{instanceId}/namespaces/{namespace}/datasets/{name}",
    input: { instanceId: 0, namespace: 0, name: 0 },
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
  operationName: "DeleteDataLakeDataset",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /api/datalake/instance/{instanceId}/namespaces/{name}",
    input: { instanceId: 0, name: 0 },
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
  operationName: "DeleteDataLakeNamespace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /api/instance/{instanceId}",
    input: { instanceId: 0 },
    output: { instance: o_Instance },
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
  operationName: "DeleteInstance",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /api/configuration/instances/{instanceId}/bill-of-materials-import-jobs/{jobId}",
    input: { instanceId: 0, jobId: 0 },
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
  operationName: "GetBillOfMaterialsImportJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /api-data/data-integration/instance/{instanceId}/data-integration-events/{eventId}",
    input: { instanceId: 0, eventId: 0 },
    output: { event: o_DataIntegrationEvent },
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
  operationName: "GetDataIntegrationEvent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /api/data-integration/instance/{instanceId}/data-integration-flows/{name}",
    input: { instanceId: 0, name: 0 },
    output: { flow: o_DataIntegrationFlow },
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
  operationName: "GetDataIntegrationFlow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /api-data/data-integration/instance/{instanceId}/data-integration-flows/{flowName}/executions/{executionId}",
    input: { instanceId: 0, flowName: 0, executionId: 0 },
    output: { flowExecution: o_DataIntegrationFlowExecution },
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
  operationName: "GetDataIntegrationFlowExecution",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /api/datalake/instance/{instanceId}/namespaces/{namespace}/datasets/{name}",
    input: { instanceId: 0, namespace: 0, name: 0 },
    output: { dataset: o_DataLakeDataset },
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
  operationName: "GetDataLakeDataset",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /api/datalake/instance/{instanceId}/namespaces/{name}",
    input: { instanceId: 0, name: 0 },
    output: { namespace: o_DataLakeNamespace },
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
  operationName: "GetDataLakeNamespace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /api/instance/{instanceId}",
    input: { instanceId: 0 },
    output: { instance: o_Instance },
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
  operationName: "GetInstance",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /api-data/data-integration/instance/{instanceId}/data-integration-events",
    input: {
      instanceId: 0,
      eventType: D.m({ query: "eventType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { events: D.list(o_DataIntegrationEvent) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /api-data/data-integration/instance/{instanceId}/data-integration-flows/{flowName}/executions",
    input: {
      instanceId: 0,
      flowName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { flowExecutions: D.list(o_DataIntegrationFlowExecution) },
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
  descriptor: {
    service: svc,
    http: "GET /api/data-integration/instance/{instanceId}/data-integration-flows",
    input: {
      instanceId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { flows: D.list(o_DataIntegrationFlow) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /api/datalake/instance/{instanceId}/namespaces/{namespace}/datasets",
    input: {
      instanceId: 0,
      namespace: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { datasets: D.list(o_DataLakeDataset) },
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
  descriptor: {
    service: svc,
    http: "GET /api/datalake/instance/{instanceId}/namespaces",
    input: {
      instanceId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { namespaces: D.list(o_DataLakeNamespace) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /api/instance",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      instanceNameFilter: D.m({ query: "instanceNameFilter" }),
      instanceStateFilter: D.m({ query: "instanceStateFilter" }),
    },
    output: { instances: D.list(o_Instance) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /api/tags/{resourceArn}",
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /api-data/data-integration/instance/{instanceId}/data-integration-events",
    input: {
      instanceId: 0,
      eventType: 0,
      data: 0,
      eventGroupId: 0,
      eventTimestamp: 0,
      clientToken: D.m({ idempotency: true }),
      datasetTarget: { datasetIdentifier: 0, operationType: 0 },
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
  operationName: "SendDataIntegrationEvent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /api/tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
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
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /api/tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /api/data-integration/instance/{instanceId}/data-integration-flows/{name}",
    input: {
      instanceId: 0,
      name: 0,
      sources: D.list(i_DataIntegrationFlowSource),
      transformation: i_DataIntegrationFlowTransformation,
      target: i_DataIntegrationFlowTarget,
    },
    output: { flow: o_DataIntegrationFlow },
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
  operationName: "UpdateDataIntegrationFlow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /api/datalake/instance/{instanceId}/namespaces/{namespace}/datasets/{name}",
    input: { instanceId: 0, namespace: 0, name: 0, description: 0 },
    output: { dataset: o_DataLakeDataset },
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
  operationName: "UpdateDataLakeDataset",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /api/datalake/instance/{instanceId}/namespaces/{name}",
    input: { instanceId: 0, name: 0, description: 0 },
    output: { namespace: o_DataLakeNamespace },
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
  operationName: "UpdateDataLakeNamespace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /api/instance/{instanceId}",
    input: { instanceId: 0, instanceName: 0, instanceDescription: 0 },
    output: { instance: o_Instance },
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
  operationName: "UpdateInstance",
})) as any;

const i_DataIntegrationFlowSource: D.LazyStruct = () => ({
  sourceType: 0,
  sourceName: 0,
  s3Source: {
    bucketName: 0,
    prefix: 0,
    options: i_DataIntegrationFlowS3Options,
  },
  datasetSource: {
    datasetIdentifier: 0,
    options: i_DataIntegrationFlowDatasetOptions,
  },
});
const i_DataIntegrationFlowTarget: D.LazyStruct = () => ({
  targetType: 0,
  s3Target: {
    bucketName: 0,
    prefix: 0,
    options: i_DataIntegrationFlowS3Options,
  },
  datasetTarget: {
    datasetIdentifier: 0,
    options: i_DataIntegrationFlowDatasetOptions,
  },
});
const i_DataIntegrationFlowTransformation: D.LazyStruct = () => ({
  transformationType: 0,
  sqlTransformation: { query: 0 },
});
const o_DataIntegrationEvent: D.LazyStruct = () => ({ eventTimestamp: D.ts });
const o_DataIntegrationFlow: D.LazyStruct = () => ({
  transformation: { sqlTransformation: { query: D.secret } },
  createdTime: D.ts,
  lastModifiedTime: D.ts,
});
const o_DataIntegrationFlowExecution: D.LazyStruct = () => ({
  startTime: D.ts,
  endTime: D.ts,
});
const o_DataLakeDataset: D.LazyStruct = () => ({
  createdTime: D.ts,
  lastModifiedTime: D.ts,
});
const o_DataLakeNamespace: D.LazyStruct = () => ({
  createdTime: D.ts,
  lastModifiedTime: D.ts,
});
const o_Instance: D.LazyStruct = () => ({
  createdTime: D.ts,
  lastModifiedTime: D.ts,
});
const i_DataIntegrationFlowDatasetOptions: D.LazyStruct = () => ({
  loadType: 0,
  dedupeRecords: 0,
  dedupeStrategy: {
    type: 0,
    fieldPriority: { fields: D.list({ name: 0, sortOrder: 0 }) },
  },
});
const i_DataIntegrationFlowS3Options: D.LazyStruct = () => ({ fileType: 0 });
