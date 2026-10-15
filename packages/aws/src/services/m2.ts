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
  sdkId: "m2",
  serviceShapeName: "AwsSupernovaControlPlaneService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "m2" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-04-28");
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
              `https://m2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://m2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://m2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://m2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://m2.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ExecutionTimeoutException
  extends /*@__PURE__*/ S.TaggedError<ExecutionTimeoutException>()(
    "ExecutionTimeoutException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(504), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withTimeoutError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(503), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
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
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(S.String),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(785, __c49, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Identifier = string;
export type AuthSecretsManagerArn = string;
export interface CancelBatchJobExecutionRequest {
  applicationId: string;
  executionId: string;
  authSecretsManagerArn?: string;
}
export interface CancelBatchJobExecutionResponse {}
export type EntityName = string;
export type EntityDescription = string;
export type EngineType = string;
export type String2000 = string;
export type StringFree65000 = string;
export type Definition =
  | { s3Location: string; content?: never }
  | { s3Location?: never; content: string };
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export type Arn = string;
export interface CreateApplicationRequest {
  name: string;
  description?: string;
  engineType: string;
  definition: Definition;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
  kmsKeyId?: string;
  roleArn?: string;
}
export type Version = number;
export interface CreateApplicationResponse {
  applicationArn: string;
  applicationId: string;
  applicationVersion: number;
}
export type String200 = string;
export type ExternalLocation = { s3Location: string };
export interface DataSetExportItem {
  datasetName: string;
  externalLocation: ExternalLocation;
}
export type DataSetExportList = DataSetExportItem[];
export type DataSetExportConfig =
  | { s3Location: string; dataSets?: never }
  | { s3Location?: never; dataSets: DataSetExportItem[] };
export type KMSKeyId = string;
export interface CreateDataSetExportTaskRequest {
  applicationId: string;
  exportConfig: DataSetExportConfig;
  clientToken?: string;
  kmsKeyId?: string;
}
export interface CreateDataSetExportTaskResponse {
  taskId: string;
}
export interface PrimaryKey {
  name?: string;
  offset: number;
  length: number;
}
export interface AlternateKey {
  name?: string;
  offset: number;
  length: number;
  allowDuplicates?: boolean;
}
export type AlternateKeyList = AlternateKey[];
export interface VsamAttributes {
  format: string;
  encoding?: string;
  compressed?: boolean;
  primaryKey?: PrimaryKey;
  alternateKeys?: AlternateKey[];
}
export interface GdgAttributes {
  limit?: number;
  rollDisposition?: string;
}
export type String20 = string;
export type String20List = string[];
export interface PoAttributes {
  format: string;
  encoding?: string;
  memberFileExtensions: string[];
}
export interface PsAttributes {
  format: string;
  encoding?: string;
}
export type DatasetOrgAttributes =
  | { vsam: VsamAttributes; gdg?: never; po?: never; ps?: never }
  | { vsam?: never; gdg: GdgAttributes; po?: never; ps?: never }
  | { vsam?: never; gdg?: never; po: PoAttributes; ps?: never }
  | { vsam?: never; gdg?: never; po?: never; ps: PsAttributes };
export interface RecordLength {
  min: number;
  max: number;
}
export interface DataSet {
  storageType?: string;
  datasetName: string;
  datasetOrg: DatasetOrgAttributes;
  relativePath?: string;
  recordLength: RecordLength;
}
export interface DataSetImportItem {
  dataSet: DataSet;
  externalLocation: ExternalLocation;
}
export type DataSetImportList = DataSetImportItem[];
export type DataSetImportConfig =
  | { s3Location: string; dataSets?: never }
  | { s3Location?: never; dataSets: DataSetImportItem[] };
export interface CreateDataSetImportTaskRequest {
  applicationId: string;
  importConfig: DataSetImportConfig;
  clientToken?: string;
}
export interface CreateDataSetImportTaskResponse {
  taskId: string;
}
export interface CreateDeploymentRequest {
  environmentId: string;
  applicationId: string;
  applicationVersion: number;
  clientToken?: string;
}
export interface CreateDeploymentResponse {
  deploymentId: string;
}
export type EngineVersion = string;
export type String50 = string;
export type String50List = string[];
export interface EfsStorageConfiguration {
  fileSystemId: string;
  mountPoint: string;
}
export interface FsxStorageConfiguration {
  fileSystemId: string;
  mountPoint: string;
}
export type StorageConfiguration =
  | { efs: EfsStorageConfiguration; fsx?: never }
  | { efs?: never; fsx: FsxStorageConfiguration };
export type StorageConfigurationList = StorageConfiguration[];
export type CapacityValue = number;
export interface HighAvailabilityConfig {
  desiredCapacity: number;
}
export type NetworkType = string;
export interface CreateEnvironmentRequest {
  name: string;
  instanceType: string;
  description?: string;
  engineType: string;
  engineVersion?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  storageConfigurations?: StorageConfiguration[];
  publiclyAccessible?: boolean;
  highAvailabilityConfig?: HighAvailabilityConfig;
  tags?: { [key: string]: string | undefined };
  preferredMaintenanceWindow?: string;
  networkType?: string;
  clientToken?: string;
  kmsKeyId?: string;
}
export interface CreateEnvironmentResponse {
  environmentId: string;
}
export interface DeleteApplicationRequest {
  applicationId: string;
}
export interface DeleteApplicationResponse {}
export interface DeleteApplicationFromEnvironmentRequest {
  applicationId: string;
  environmentId: string;
}
export interface DeleteApplicationFromEnvironmentResponse {}
export interface DeleteEnvironmentRequest {
  environmentId: string;
}
export interface DeleteEnvironmentResponse {}
export interface GetApplicationRequest {
  applicationId: string;
}
export type ApplicationLifecycle = string;
export type ApplicationVersionLifecycle = string;
export interface ApplicationVersionSummary {
  applicationVersion: number;
  status: string;
  statusReason?: string;
  creationTime: Date;
}
export type DeploymentLifecycle = string;
export interface DeployedVersionSummary {
  applicationVersion: number;
  status: string;
  statusReason?: string;
}
export type LogGroupIdentifier = string;
export interface LogGroupSummary {
  logType: string;
  logGroupName: string;
}
export type LogGroupSummaries = LogGroupSummary[];
export type ArnList = string[];
export type PortList = number[];
export type String100 = string;
export interface GetApplicationResponse {
  name: string;
  description?: string;
  applicationId: string;
  applicationArn: string;
  status: string;
  latestVersion: ApplicationVersionSummary;
  deployedVersion?: DeployedVersionSummary;
  engineType: string;
  logGroups?: LogGroupSummary[];
  creationTime: Date;
  lastStartTime?: Date;
  tags?: { [key: string]: string | undefined };
  environmentId?: string;
  targetGroupArns?: string[];
  listenerArns?: string[];
  listenerPorts?: number[];
  loadBalancerDnsName?: string;
  statusReason?: string;
  kmsKeyId?: string;
  roleArn?: string;
}
export interface GetApplicationVersionRequest {
  applicationId: string;
  applicationVersion: number;
}
export interface GetApplicationVersionResponse {
  name: string;
  applicationVersion: number;
  description?: string;
  definitionContent: string;
  status: string;
  creationTime: Date;
  statusReason?: string;
}
export interface GetBatchJobExecutionRequest {
  applicationId: string;
  executionId: string;
}
export type BatchJobType = string;
export type BatchJobExecutionStatus = string;
export interface FileBatchJobIdentifier {
  fileName: string;
  folderPath?: string;
}
export interface ScriptBatchJobIdentifier {
  scriptName: string;
}
export type JobIdentifier =
  | { fileName: string; scriptName?: never }
  | { fileName?: never; scriptName: string };
export interface S3BatchJobIdentifier {
  bucket: string;
  keyPrefix?: string;
  identifier: JobIdentifier;
}
export interface JobStepRestartMarker {
  fromStep: string;
  fromProcStep?: string;
  toStep?: string;
  toProcStep?: string;
  stepCheckpoint?: number;
  skip?: boolean;
}
export interface RestartBatchJobIdentifier {
  executionId: string;
  jobStepRestartMarker: JobStepRestartMarker;
}
export type BatchJobIdentifier =
  | {
      fileBatchJobIdentifier: FileBatchJobIdentifier;
      scriptBatchJobIdentifier?: never;
      s3BatchJobIdentifier?: never;
      restartBatchJobIdentifier?: never;
    }
  | {
      fileBatchJobIdentifier?: never;
      scriptBatchJobIdentifier: ScriptBatchJobIdentifier;
      s3BatchJobIdentifier?: never;
      restartBatchJobIdentifier?: never;
    }
  | {
      fileBatchJobIdentifier?: never;
      scriptBatchJobIdentifier?: never;
      s3BatchJobIdentifier: S3BatchJobIdentifier;
      restartBatchJobIdentifier?: never;
    }
  | {
      fileBatchJobIdentifier?: never;
      scriptBatchJobIdentifier?: never;
      s3BatchJobIdentifier?: never;
      restartBatchJobIdentifier: RestartBatchJobIdentifier;
    };
export interface GetBatchJobExecutionResponse {
  executionId: string;
  applicationId: string;
  jobId?: string;
  jobName?: string;
  jobUser?: string;
  jobType?: string;
  status: string;
  startTime: Date;
  endTime?: Date;
  statusReason?: string;
  returnCode?: string;
  batchJobIdentifier?: BatchJobIdentifier;
  jobStepRestartMarker?: JobStepRestartMarker;
}
export interface GetDataSetDetailsRequest {
  applicationId: string;
  dataSetName: string;
}
export interface VsamDetailAttributes {
  encoding?: string;
  recordFormat?: string;
  compressed?: boolean;
  cacheAtStartup?: boolean;
  primaryKey?: PrimaryKey;
  alternateKeys?: AlternateKey[];
}
export interface GdgDetailAttributes {
  limit?: number;
  rollDisposition?: string;
}
export interface PoDetailAttributes {
  format: string;
  encoding: string;
}
export interface PsDetailAttributes {
  format: string;
  encoding: string;
}
export type DatasetDetailOrgAttributes =
  | { vsam: VsamDetailAttributes; gdg?: never; po?: never; ps?: never }
  | { vsam?: never; gdg: GdgDetailAttributes; po?: never; ps?: never }
  | { vsam?: never; gdg?: never; po: PoDetailAttributes; ps?: never }
  | { vsam?: never; gdg?: never; po?: never; ps: PsDetailAttributes };
export interface GetDataSetDetailsResponse {
  dataSetName: string;
  dataSetOrg?: DatasetDetailOrgAttributes;
  recordLength?: number;
  location?: string;
  blocksize?: number;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  lastReferencedTime?: Date;
  fileSize?: number;
}
export interface GetDataSetExportTaskRequest {
  applicationId: string;
  taskId: string;
}
export type DataSetTaskLifecycle = string;
export interface DataSetExportSummary {
  total: number;
  succeeded: number;
  failed: number;
  pending: number;
  inProgress: number;
}
export interface GetDataSetExportTaskResponse {
  taskId: string;
  status: string;
  summary?: DataSetExportSummary;
  statusReason?: string;
  kmsKeyArn?: string;
}
export interface GetDataSetImportTaskRequest {
  applicationId: string;
  taskId: string;
}
export interface DataSetImportSummary {
  total: number;
  succeeded: number;
  failed: number;
  pending: number;
  inProgress: number;
}
export interface GetDataSetImportTaskResponse {
  taskId: string;
  status: string;
  summary?: DataSetImportSummary;
}
export interface GetDeploymentRequest {
  deploymentId: string;
  applicationId: string;
}
export interface GetDeploymentResponse {
  deploymentId: string;
  applicationId: string;
  environmentId: string;
  applicationVersion: number;
  status: string;
  creationTime: Date;
  statusReason?: string;
}
export interface GetEnvironmentRequest {
  environmentId: string;
}
export type EnvironmentLifecycle = string;
export interface MaintenanceSchedule {
  startTime?: Date;
  endTime?: Date;
}
export interface PendingMaintenance {
  schedule?: MaintenanceSchedule;
  engineVersion?: string;
}
export interface GetEnvironmentResponse {
  name: string;
  description?: string;
  environmentArn: string;
  environmentId: string;
  instanceType: string;
  status: string;
  engineType: string;
  engineVersion: string;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  creationTime: Date;
  storageConfigurations?: StorageConfiguration[];
  tags?: { [key: string]: string | undefined };
  highAvailabilityConfig?: HighAvailabilityConfig;
  publiclyAccessible?: boolean;
  actualCapacity?: number;
  loadBalancerArn?: string;
  statusReason?: string;
  preferredMaintenanceWindow?: string;
  pendingMaintenance?: PendingMaintenance;
  kmsKeyId?: string;
  networkType?: string;
}
export interface GetSignedBluinsightsUrlRequest {}
export interface GetSignedBluinsightsUrlResponse {
  signedBiUrl: string;
}
export type NextToken = string;
export type MaxResults = number;
export type EntityNameList = string[];
export interface ListApplicationsRequest {
  nextToken?: string;
  maxResults?: number;
  names?: string[];
  environmentId?: string;
}
export type ApplicationDeploymentLifecycle = string;
export interface ApplicationSummary {
  name: string;
  description?: string;
  applicationId: string;
  applicationArn: string;
  applicationVersion: number;
  status: string;
  engineType: string;
  creationTime: Date;
  environmentId?: string;
  lastStartTime?: Date;
  versionStatus?: string;
  deploymentStatus?: string;
  roleArn?: string;
}
export type ApplicationSummaryList = ApplicationSummary[];
export interface ListApplicationsResponse {
  applications: ApplicationSummary[];
  nextToken?: string;
}
export interface ListApplicationVersionsRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
}
export type ApplicationVersionSummaryList = ApplicationVersionSummary[];
export interface ListApplicationVersionsResponse {
  applicationVersions: ApplicationVersionSummary[];
  nextToken?: string;
}
export interface ListBatchJobDefinitionsRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
  prefix?: string;
}
export interface FileBatchJobDefinition {
  fileName: string;
  folderPath?: string;
}
export interface ScriptBatchJobDefinition {
  scriptName: string;
}
export type BatchJobDefinition =
  | { fileBatchJobDefinition: FileBatchJobDefinition; scriptBatchJobDefinition?: never }
  | { fileBatchJobDefinition?: never; scriptBatchJobDefinition: ScriptBatchJobDefinition };
export type BatchJobDefinitions = BatchJobDefinition[];
export interface ListBatchJobDefinitionsResponse {
  batchJobDefinitions: BatchJobDefinition[];
  nextToken?: string;
}
export type IdentifierList = string[];
export interface ListBatchJobExecutionsRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
  executionIds?: string[];
  jobName?: string;
  status?: string;
  startedAfter?: Date;
  startedBefore?: Date;
}
export interface BatchJobExecutionSummary {
  executionId: string;
  applicationId: string;
  jobId?: string;
  jobName?: string;
  jobType?: string;
  status: string;
  startTime: Date;
  endTime?: Date;
  returnCode?: string;
  batchJobIdentifier?: BatchJobIdentifier;
}
export type BatchJobExecutionSummaryList = BatchJobExecutionSummary[];
export interface ListBatchJobExecutionsResponse {
  batchJobExecutions: BatchJobExecutionSummary[];
  nextToken?: string;
}
export interface ListBatchJobRestartPointsRequest {
  applicationId: string;
  executionId: string;
  authSecretsManagerArn?: string;
}
export interface JobStep {
  stepNumber?: number;
  stepName?: string;
  procStepNumber?: number;
  procStepName?: string;
  stepCondCode?: string;
  stepRestartable?: boolean;
  stepCheckpoint?: number;
  stepCheckpointStatus?: string;
  stepCheckpointTime?: Date;
}
export type BatchJobStepList = JobStep[];
export interface ListBatchJobRestartPointsResponse {
  batchJobSteps?: JobStep[];
}
export interface ListDataSetExportHistoryRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
}
export interface DataSetExportTask {
  taskId: string;
  status: string;
  summary: DataSetExportSummary;
  statusReason?: string;
}
export type DataSetExportTaskList = DataSetExportTask[];
export interface ListDataSetExportHistoryResponse {
  dataSetExportTasks: DataSetExportTask[];
  nextToken?: string;
}
export interface ListDataSetImportHistoryRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
}
export interface DataSetImportTask {
  taskId: string;
  status: string;
  summary: DataSetImportSummary;
  statusReason?: string;
}
export type DataSetImportTaskList = DataSetImportTask[];
export interface ListDataSetImportHistoryResponse {
  dataSetImportTasks: DataSetImportTask[];
  nextToken?: string;
}
export interface ListDataSetsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
  prefix?: string;
  nameFilter?: string;
}
export interface DataSetSummary {
  dataSetName: string;
  dataSetOrg?: string;
  format?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  lastReferencedTime?: Date;
}
export type DataSetsSummaryList = DataSetSummary[];
export interface ListDataSetsResponse {
  dataSets: DataSetSummary[];
  nextToken?: string;
}
export interface ListDeploymentsRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
}
export interface DeploymentSummary {
  deploymentId: string;
  applicationId: string;
  environmentId: string;
  applicationVersion: number;
  status: string;
  creationTime: Date;
  statusReason?: string;
}
export type DeploymentList = DeploymentSummary[];
export interface ListDeploymentsResponse {
  deployments: DeploymentSummary[];
  nextToken?: string;
}
export interface ListEngineVersionsRequest {
  engineType?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface EngineVersionsSummary {
  engineType: string;
  engineVersion: string;
}
export type EngineVersionsSummaryList = EngineVersionsSummary[];
export interface ListEngineVersionsResponse {
  engineVersions: EngineVersionsSummary[];
  nextToken?: string;
}
export interface ListEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
  names?: string[];
  engineType?: string;
}
export interface EnvironmentSummary {
  name: string;
  environmentArn: string;
  environmentId: string;
  instanceType: string;
  status: string;
  engineType: string;
  engineVersion: string;
  creationTime: Date;
  networkType?: string;
}
export type EnvironmentSummaryList = EnvironmentSummary[];
export interface ListEnvironmentsResponse {
  environments: EnvironmentSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export interface StartApplicationRequest {
  applicationId: string;
}
export interface StartApplicationResponse {}
export type BatchParamKey = string;
export type BatchParamValue = string;
export type BatchJobParametersMap = { [key: string]: string | undefined };
export interface StartBatchJobRequest {
  applicationId: string;
  batchJobIdentifier: BatchJobIdentifier;
  jobParams?: { [key: string]: string | undefined };
  authSecretsManagerArn?: string;
}
export interface StartBatchJobResponse {
  executionId: string;
}
export interface StopApplicationRequest {
  applicationId: string;
  forceStop?: boolean;
}
export interface StopApplicationResponse {}
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
export interface UpdateApplicationRequest {
  applicationId: string;
  description?: string;
  currentApplicationVersion: number;
  definition?: Definition;
}
export interface UpdateApplicationResponse {
  applicationVersion: number;
}
export interface UpdateEnvironmentRequest {
  environmentId: string;
  desiredCapacity?: number;
  instanceType?: string;
  engineVersion?: string;
  preferredMaintenanceWindow?: string;
  applyDuringMaintenanceWindow?: boolean;
  forceUpdate?: boolean;
}
export interface UpdateEnvironmentResponse {
  environmentId: string;
}
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CancelBatchJobExecutionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the running of a specific batch job execution.
 */
export const cancelBatchJobExecution: API.OperationMethod<
  CancelBatchJobExecutionRequest,
  CancelBatchJobExecutionResponse,
  CancelBatchJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<CancelBatchJobExecutionRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<CancelBatchJobExecutionResponse>,
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
  operationName: "CancelBatchJobExecution",
}));

export type CreateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new application with given parameters. Requires an existing runtime
 * environment and application definition file.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateApplicationRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateApplicationResponse>,
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
  operationName: "CreateApplication",
}));

export type CreateDataSetExportTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a data set export task for a specific application.
 */
export const createDataSetExportTask: API.OperationMethod<
  CreateDataSetExportTaskRequest,
  CreateDataSetExportTaskResponse,
  CreateDataSetExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(51, __c3, 3) as any as S.Schema<CreateDataSetExportTaskRequest>,
  output: __S(65, __c4, 1) as any as S.Schema<CreateDataSetExportTaskResponse>,
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
  operationName: "CreateDataSetExportTask",
}));

export type CreateDataSetImportTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a data set import task for a specific application.
 */
export const createDataSetImportTask: API.OperationMethod<
  CreateDataSetImportTaskRequest,
  CreateDataSetImportTaskResponse,
  CreateDataSetImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(89, __c5, 9) as any as S.Schema<CreateDataSetImportTaskRequest>,
  output: __S(65, __c4, 1) as any as S.Schema<CreateDataSetImportTaskResponse>,
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
  operationName: "CreateDataSetImportTask",
}));

export type CreateDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates and starts a deployment to deploy an application into a runtime
 * environment.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  CreateDeploymentResponse,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<CreateDeploymentRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<CreateDeploymentResponse>,
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
  operationName: "CreateDeployment",
}));

export type CreateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a runtime environment for a given runtime engine.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateEnvironmentRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<CreateEnvironmentResponse>,
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
  operationName: "CreateEnvironment",
}));

export type DeleteApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific application. You cannot delete a running application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<DeleteApplicationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteApplicationFromEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific application from the specific runtime environment where it was
 * previously deployed. You cannot delete a runtime environment using DeleteEnvironment if any
 * application has ever been deployed to it. This API removes the association of the
 * application with the runtime environment so you can delete the environment smoothly.
 */
export const deleteApplicationFromEnvironment: API.OperationMethod<
  DeleteApplicationFromEnvironmentRequest,
  DeleteApplicationFromEnvironmentResponse,
  DeleteApplicationFromEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DeleteApplicationFromEnvironmentRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<DeleteApplicationFromEnvironmentResponse>,
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
  operationName: "DeleteApplicationFromEnvironment",
}));

export type DeleteEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific runtime environment. The environment cannot contain deployed
 * applications. If it does, you must delete those applications before you delete the
 * environment.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteEnvironmentRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<DeleteEnvironmentResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
}));

export type GetApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the details of a specific application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<GetApplicationRequest>,
  output: __S(245, __c15, 5) as any as S.Schema<GetApplicationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetApplicationVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a specific version of a specific application.
 */
export const getApplicationVersion: API.OperationMethod<
  GetApplicationVersionRequest,
  GetApplicationVersionResponse,
  GetApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetApplicationVersionRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<GetApplicationVersionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationVersion",
}));

export type GetBatchJobExecutionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a specific batch job execution for a specific application.
 */
export const getBatchJobExecution: API.OperationMethod<
  GetBatchJobExecutionRequest,
  GetBatchJobExecutionResponse,
  GetBatchJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<GetBatchJobExecutionRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<GetBatchJobExecutionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBatchJobExecution",
}));

export type GetDataSetDetailsError =
  | AccessDeniedException
  | ConflictException
  | ExecutionTimeoutException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a specific data set.
 */
export const getDataSetDetails: API.OperationMethod<
  GetDataSetDetailsRequest,
  GetDataSetDetailsResponse,
  GetDataSetDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<GetDataSetDetailsRequest>,
  output: __S(340, __c21, 4) as any as S.Schema<GetDataSetDetailsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExecutionTimeoutException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSetDetails",
}));

export type GetDataSetExportTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the status of a data set import task initiated with the CreateDataSetExportTask operation.
 */
export const getDataSetExportTask: API.OperationMethod<
  GetDataSetExportTaskRequest,
  GetDataSetExportTaskResponse,
  GetDataSetExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetDataSetExportTaskRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<GetDataSetExportTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSetExportTask",
}));

export type GetDataSetImportTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the status of a data set import task initiated with the CreateDataSetImportTask operation.
 */
export const getDataSetImportTask: API.OperationMethod<
  GetDataSetImportTaskRequest,
  GetDataSetImportTaskResponse,
  GetDataSetImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<GetDataSetImportTaskRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<GetDataSetImportTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSetImportTask",
}));

export type GetDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details of a specific deployment with a given deployment identifier.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  GetDeploymentResponse,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetDeploymentRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<GetDeploymentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes a specific runtime environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<GetEnvironmentRequest>,
  output: __S(435, __c27, 3) as any as S.Schema<GetEnvironmentResponse>,
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
}));

export type GetSignedBluinsightsUrlError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a single sign-on URL that can be used to connect to AWS Blu Insights.
 */
export const getSignedBluinsightsUrl: API.OperationMethod<
  GetSignedBluinsightsUrlRequest,
  GetSignedBluinsightsUrlResponse,
  GetSignedBluinsightsUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<GetSignedBluinsightsUrlRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<GetSignedBluinsightsUrlResponse>,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSignedBluinsightsUrl",
}));

export type ListApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the applications associated with a specific Amazon Web Services account. You can provide the
 * unique identifier of a specific runtime environment in a query parameter to see all
 * applications associated with that environment.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<ListApplicationsRequest>,
  output: __S(467, __c29, 3) as any as S.Schema<ListApplicationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListApplicationVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the application versions for a specific application.
 */
export const listApplicationVersions: API.PaginatedOperationMethod<
  ListApplicationVersionsRequest,
  ListApplicationVersionsResponse,
  ListApplicationVersionsError,
  Credentials | HttpClient.HttpClient,
  ApplicationVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<ListApplicationVersionsRequest>,
  output: __S(482, __c30, 2) as any as S.Schema<ListApplicationVersionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applicationVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchJobDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the available batch job definitions based on the batch job resources uploaded
 * during the application creation. You can use the batch job definitions in the list to start
 * a batch job.
 */
export const listBatchJobDefinitions: API.PaginatedOperationMethod<
  ListBatchJobDefinitionsRequest,
  ListBatchJobDefinitionsResponse,
  ListBatchJobDefinitionsError,
  Credentials | HttpClient.HttpClient,
  BatchJobDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListBatchJobDefinitionsRequest>,
  output: __S(499, __c31, 3) as any as S.Schema<ListBatchJobDefinitionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatchJobDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "batchJobDefinitions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchJobExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists historical, current, and scheduled batch job executions for a specific
 * application.
 */
export const listBatchJobExecutions: API.PaginatedOperationMethod<
  ListBatchJobExecutionsRequest,
  ListBatchJobExecutionsResponse,
  ListBatchJobExecutionsError,
  Credentials | HttpClient.HttpClient,
  BatchJobExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListBatchJobExecutionsRequest>,
  output: __S(515, __c32, 3) as any as S.Schema<ListBatchJobExecutionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatchJobExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "batchJobExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchJobRestartPointsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the job steps for a JCL file to restart a batch job. This is only applicable for Micro Focus engine with versions 8.0.6 and above.
 */
export const listBatchJobRestartPoints: API.OperationMethod<
  ListBatchJobRestartPointsRequest,
  ListBatchJobRestartPointsResponse,
  ListBatchJobRestartPointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListBatchJobRestartPointsRequest>,
  output: __S(531, __c33, 3) as any as S.Schema<ListBatchJobRestartPointsResponse>,
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
  operationName: "ListBatchJobRestartPoints",
}));

export type ListDataSetExportHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the data set exports for the specified application.
 */
export const listDataSetExportHistory: API.PaginatedOperationMethod<
  ListDataSetExportHistoryRequest,
  ListDataSetExportHistoryResponse,
  ListDataSetExportHistoryError,
  Credentials | HttpClient.HttpClient,
  DataSetExportTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListDataSetExportHistoryRequest>,
  output: __S(545, __c34, 1) as any as S.Schema<ListDataSetExportHistoryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSetExportHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSetExportTasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSetImportHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the data set imports for the specified application.
 */
export const listDataSetImportHistory: API.PaginatedOperationMethod<
  ListDataSetImportHistoryRequest,
  ListDataSetImportHistoryResponse,
  ListDataSetImportHistoryError,
  Credentials | HttpClient.HttpClient,
  DataSetImportTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ListDataSetImportHistoryRequest>,
  output: __S(577, __c36, 1) as any as S.Schema<ListDataSetImportHistoryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSetImportHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSetImportTasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSetsError =
  | AccessDeniedException
  | ConflictException
  | ExecutionTimeoutException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the data sets imported for a specific application. In Amazon Web Services Mainframe Modernization, data sets are
 * associated with applications deployed on runtime environments. This is known as importing
 * data sets. Currently, Amazon Web Services Mainframe Modernization can import data sets into catalogs using CreateDataSetImportTask.
 */
export const listDataSets: API.PaginatedOperationMethod<
  ListDataSetsRequest,
  ListDataSetsResponse,
  ListDataSetsError,
  Credentials | HttpClient.HttpClient,
  DataSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListDataSetsRequest>,
  output: __S(595, __c37, 3) as any as S.Schema<ListDataSetsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExecutionTimeoutException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all deployments of a specific application. A deployment is a
 * combination of a specific application and a specific version of that application. Each
 * deployment is mapped to a particular application version.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsRequest,
  ListDeploymentsResponse,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  DeploymentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<ListDeploymentsRequest>,
  output: __S(610, __c38, 2) as any as S.Schema<ListDeploymentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deployments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEngineVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available engine versions.
 */
export const listEngineVersions: API.PaginatedOperationMethod<
  ListEngineVersionsRequest,
  ListEngineVersionsResponse,
  ListEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  EngineVersionsSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<ListEngineVersionsRequest>,
  output: __S(627, __c39, 3) as any as S.Schema<ListEngineVersionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngineVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "engineVersions",
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
 * Lists the runtime environments.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<ListEnvironmentsRequest>,
  output: __S(643, __c40, 3) as any as S.Schema<ListEnvironmentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environments",
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
 * Lists the tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type StartApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an application that is currently stopped.
 */
export const startApplication: API.OperationMethod<
  StartApplicationRequest,
  StartApplicationResponse,
  StartApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<StartApplicationRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<StartApplicationResponse>,
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
  operationName: "StartApplication",
}));

export type StartBatchJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a batch job and returns the unique identifier of this execution of the batch job.
 * The associated application must be running in order to start the batch job.
 */
export const startBatchJob: API.OperationMethod<
  StartBatchJobRequest,
  StartBatchJobResponse,
  StartBatchJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<StartBatchJobRequest>,
  output: __S(689, __c43, 1) as any as S.Schema<StartBatchJobResponse>,
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
  operationName: "StartBatchJob",
}));

export type StopApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a running application.
 */
export const stopApplication: API.OperationMethod<
  StopApplicationRequest,
  StopApplicationResponse,
  StopApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<StopApplicationRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<StopApplicationResponse>,
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
  operationName: "StopApplication",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
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
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<UntagResourceResponse>,
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

export type UpdateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an application and creates a new version.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(753, __c47, 1) as any as S.Schema<UpdateApplicationResponse>,
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
  operationName: "UpdateApplication",
}));

export type UpdateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration details for a specific runtime environment.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentRequest,
  UpdateEnvironmentResponse,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<UpdateEnvironmentRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<UpdateEnvironmentResponse>,
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
  operationName: "UpdateEnvironment",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          engineType: S.String,
          definition: __S(32, __c2, 0),
          tags: S.optional(__S(16, __c1, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          kmsKeyId: S.optional(S.String),
          roleArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateApplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationArn: S.String,
          applicationId: S.String,
          applicationVersion: S.Number,
        }),
      ).annotate({ identifier: "CreateApplicationResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3Location: S.String }),
        /*@__PURE__*/ S.Struct({ content: S.String }),
      ]);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datasetName: S.String, externalLocation: __S(64, __c4, 0) }),
      ).annotate({ identifier: "DataSetExportItem" });
    case 1:
      return S.Array(__S(48, __c3, 0));
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3Location: S.String }),
        /*@__PURE__*/ S.Struct({ dataSets: __S(49, __c3, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          exportConfig: __S(50, __c3, 2),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          kmsKeyId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/dataset-export-task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataSetExportTaskRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ s3Location: S.String })]);
    case 1:
      return S.suspend(() => S.Struct({ taskId: S.String })).annotate({
        identifier: "CreateDataSetExportTaskResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          format: S.String,
          encoding: S.optional(S.String),
          compressed: S.optional(S.Boolean),
          primaryKey: S.optional(__S(112, __c7, 0)),
          alternateKeys: S.optional(__S(114, __c7, 2)),
        }),
      ).annotate({ identifier: "VsamAttributes" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          format: S.String,
          encoding: S.optional(S.String),
          memberFileExtensions: __S(96, __c6, 0),
        }),
      ).annotate({ identifier: "PoAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({ format: S.String, encoding: S.optional(S.String) }),
      ).annotate({ identifier: "PsAttributes" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ vsam: __S(80, __c5, 0) }),
        /*@__PURE__*/ S.Struct({ gdg: __S(115, __c7, 3) }),
        /*@__PURE__*/ S.Struct({ po: __S(81, __c5, 1) }),
        /*@__PURE__*/ S.Struct({ ps: __S(82, __c5, 2) }),
      ]);
    case 4:
      return S.suspend(() => S.Struct({ min: S.Number, max: S.Number })).annotate({
        identifier: "RecordLength",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          storageType: S.optional(S.String),
          datasetName: S.String,
          datasetOrg: __S(83, __c5, 3),
          relativePath: S.optional(S.String),
          recordLength: __S(84, __c5, 4),
        }),
      ).annotate({ identifier: "DataSet" });
    case 6:
      return S.suspend(() =>
        S.Struct({ dataSet: __S(85, __c5, 5), externalLocation: __S(64, __c4, 0) }),
      ).annotate({ identifier: "DataSetImportItem" });
    case 7:
      return S.Array(__S(86, __c5, 6));
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3Location: S.String }),
        /*@__PURE__*/ S.Struct({ dataSets: __S(87, __c5, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          importConfig: __S(88, __c5, 8),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/dataset-import-task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataSetImportTaskRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), offset: S.Number, length: S.Number }),
      ).annotate({ identifier: "PrimaryKey" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          offset: S.Number,
          length: S.Number,
          allowDuplicates: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AlternateKey" });
    case 2:
      return S.Array(__S(113, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ limit: S.optional(S.Number), rollDisposition: S.optional(S.String) }),
      ).annotate({ identifier: "GdgAttributes" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String,
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          applicationVersion: S.Number,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDeploymentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ deploymentId: S.String })).annotate({
        identifier: "CreateDeploymentResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          instanceType: S.String,
          description: S.optional(S.String),
          engineType: S.String,
          engineVersion: S.optional(S.String),
          subnetIds: S.optional(__S(96, __c6, 0)),
          securityGroupIds: S.optional(__S(96, __c6, 0)),
          storageConfigurations: S.optional(__S(162, __c10, 2)),
          publiclyAccessible: S.optional(S.Boolean),
          highAvailabilityConfig: S.optional(__S(163, __c10, 3)),
          tags: S.optional(__S(16, __c1, 0)),
          preferredMaintenanceWindow: S.optional(S.String),
          networkType: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          kmsKeyId: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/environments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateEnvironmentRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fileSystemId: S.String, mountPoint: S.String }).pipe(
          S.encodeKeys({ fileSystemId: "file-system-id", mountPoint: "mount-point" }),
        ),
      ).annotate({ identifier: "EfsStorageConfiguration" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ efs: __S(160, __c10, 0) }),
        /*@__PURE__*/ S.Struct({ fsx: __S(160, __c10, 0) }),
      ]);
    case 2:
      return S.Array(__S(161, __c10, 1));
    case 3:
      return S.suspend(() => S.Struct({ desiredCapacity: S.Number })).annotate({
        identifier: "HighAvailabilityConfig",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ environmentId: S.String })).annotate({
        identifier: "CreateEnvironmentResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{applicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApplicationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/applications/{applicationId}/environment/{environmentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApplicationFromEnvironmentRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/environments/{environmentId}" }),
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
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationVersion: S.Number,
          status: S.String,
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeployedVersionSummary" });
    case 2:
      return S.suspend(() => S.Struct({ logType: S.String, logGroupName: S.String })).annotate({
        identifier: "LogGroupSummary",
      });
    case 3:
      return S.Array(__S(242, __c15, 2));
    case 4:
      return S.Array(S.Number);
    case 5:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          applicationId: S.String,
          applicationArn: S.String,
          status: S.String,
          latestVersion: __S(256, __c16, 0),
          deployedVersion: S.optional(__S(241, __c15, 1)),
          engineType: S.String,
          logGroups: S.optional(__S(243, __c15, 3)),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(16, __c1, 0)),
          environmentId: S.optional(S.String),
          targetGroupArns: S.optional(__S(96, __c6, 0)),
          listenerArns: S.optional(__S(96, __c6, 0)),
          listenerPorts: S.optional(__S(244, __c15, 4)),
          loadBalancerDnsName: S.optional(S.String),
          statusReason: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          roleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetApplicationResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationVersion: S.Number,
          status: S.String,
          statusReason: S.optional(S.String),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ApplicationVersionSummary" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          applicationVersion: S.Number.pipe(T.HttpLabel("applicationVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/versions/{applicationVersion}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          applicationVersion: S.Number,
          description: S.optional(S.String),
          definitionContent: S.String,
          status: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetApplicationVersionResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          executionId: S.String.pipe(T.HttpLabel("executionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/batch-job-executions/{executionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBatchJobExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          executionId: S.String,
          applicationId: S.String,
          jobId: S.optional(S.String),
          jobName: S.optional(S.String),
          jobUser: S.optional(S.String),
          jobType: S.optional(S.String),
          status: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          statusReason: S.optional(S.String),
          returnCode: S.optional(S.String),
          batchJobIdentifier: S.optional(__S(324, __c20, 4)),
          jobStepRestartMarker: S.optional(__S(322, __c20, 2)),
        }),
      ).annotate({ identifier: "GetBatchJobExecutionResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fileName: S.String, folderPath: S.optional(S.String) }),
      ).annotate({ identifier: "FileBatchJobIdentifier" });
    case 1:
      return S.suspend(() => S.Struct({ scriptName: S.String })).annotate({
        identifier: "ScriptBatchJobIdentifier",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ fileName: S.String }),
        /*@__PURE__*/ S.Struct({ scriptName: S.String }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          bucket: S.String,
          keyPrefix: S.optional(S.String),
          identifier: __S(320, __c20, 0),
        }),
      ).annotate({ identifier: "S3BatchJobIdentifier" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          fromStep: S.String,
          fromProcStep: S.optional(S.String),
          toStep: S.optional(S.String),
          toProcStep: S.optional(S.String),
          stepCheckpoint: S.optional(S.Number),
          skip: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "JobStepRestartMarker" });
    case 3:
      return S.suspend(() =>
        S.Struct({ executionId: S.String, jobStepRestartMarker: __S(322, __c20, 2) }),
      ).annotate({ identifier: "RestartBatchJobIdentifier" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ fileBatchJobIdentifier: __S(304, __c19, 0) }),
        /*@__PURE__*/ S.Struct({ scriptBatchJobIdentifier: __S(305, __c19, 1) }),
        /*@__PURE__*/ S.Struct({ s3BatchJobIdentifier: __S(321, __c20, 1) }),
        /*@__PURE__*/ S.Struct({ restartBatchJobIdentifier: __S(323, __c20, 3) }),
      ]);
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          dataSetName: S.String.pipe(T.HttpLabel("dataSetName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/datasets/{dataSetName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataSetDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          encoding: S.optional(S.String),
          recordFormat: S.optional(S.String),
          compressed: S.optional(S.Boolean),
          cacheAtStartup: S.optional(S.Boolean),
          primaryKey: S.optional(__S(112, __c7, 0)),
          alternateKeys: S.optional(__S(114, __c7, 2)),
        }),
      ).annotate({ identifier: "VsamDetailAttributes" });
    case 2:
      return S.suspend(() => S.Struct({ format: S.String, encoding: S.String })).annotate({
        identifier: "PoDetailAttributes",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ vsam: __S(337, __c21, 1) }),
        /*@__PURE__*/ S.Struct({ gdg: __S(115, __c7, 3) }),
        /*@__PURE__*/ S.Struct({ po: __S(338, __c21, 2) }),
        /*@__PURE__*/ S.Struct({ ps: __S(338, __c21, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          dataSetName: S.String,
          dataSetOrg: S.optional(__S(339, __c21, 3)),
          recordLength: S.optional(S.Number),
          location: S.optional(S.String),
          blocksize: S.optional(S.Number),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastReferencedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          fileSize: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetDataSetDetailsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          taskId: S.String.pipe(T.HttpLabel("taskId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/dataset-export-tasks/{taskId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataSetExportTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String,
          status: S.String,
          summary: S.optional(__S(368, __c23, 0)),
          statusReason: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDataSetExportTaskResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          total: S.Number,
          succeeded: S.Number,
          failed: S.Number,
          pending: S.Number,
          inProgress: S.Number,
        }),
      ).annotate({ identifier: "DataSetExportSummary" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          taskId: S.String.pipe(T.HttpLabel("taskId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/dataset-import-tasks/{taskId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataSetImportTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ taskId: S.String, status: S.String, summary: S.optional(__S(368, __c23, 0)) }),
      ).annotate({ identifier: "GetDataSetImportTaskResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.String.pipe(T.HttpLabel("deploymentId")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/deployments/{deploymentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.String,
          applicationId: S.String,
          environmentId: S.String,
          applicationVersion: S.Number,
          status: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDeploymentResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{environmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MaintenanceSchedule" });
    case 2:
      return S.suspend(() =>
        S.Struct({ schedule: S.optional(__S(433, __c27, 1)), engineVersion: S.optional(S.String) }),
      ).annotate({ identifier: "PendingMaintenance" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          environmentArn: S.String,
          environmentId: S.String,
          instanceType: S.String,
          status: S.String,
          engineType: S.String,
          engineVersion: S.String,
          vpcId: S.String,
          subnetIds: __S(96, __c6, 0),
          securityGroupIds: __S(96, __c6, 0),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          storageConfigurations: S.optional(__S(162, __c10, 2)),
          tags: S.optional(__S(16, __c1, 0)),
          highAvailabilityConfig: S.optional(__S(163, __c10, 3)),
          publiclyAccessible: S.optional(S.Boolean),
          actualCapacity: S.optional(S.Number),
          loadBalancerArn: S.optional(S.String),
          statusReason: S.optional(S.String),
          preferredMaintenanceWindow: S.optional(S.String),
          pendingMaintenance: S.optional(__S(434, __c27, 2)),
          kmsKeyId: S.optional(S.String),
          networkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetEnvironmentResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/signed-bi-url" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSignedBluinsightsUrlRequest" });
    case 1:
      return S.suspend(() => S.Struct({ signedBiUrl: S.String })).annotate({
        identifier: "GetSignedBluinsightsUrlResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          names: S.optional(__S(96, __c6, 0)).pipe(T.HttpQuery("names")),
          environmentId: S.optional(S.String).pipe(T.HttpQuery("environmentId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          applicationId: S.String,
          applicationArn: S.String,
          applicationVersion: S.Number,
          status: S.String,
          engineType: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          environmentId: S.optional(S.String),
          lastStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          versionStatus: S.optional(S.String),
          deploymentStatus: S.optional(S.String),
          roleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationSummary" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ applications: __S(466, __c29, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApplicationsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListApplicationVersionsRequest" });
    case 1:
      return S.Array(__S(256, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ applicationVersions: __S(481, __c30, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApplicationVersionsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          prefix: S.optional(S.String).pipe(T.HttpQuery("prefix")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/batch-job-definitions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBatchJobDefinitionsRequest" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ fileBatchJobDefinition: __S(304, __c19, 0) }),
        /*@__PURE__*/ S.Struct({ scriptBatchJobDefinition: __S(305, __c19, 1) }),
      ]);
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ batchJobDefinitions: __S(498, __c31, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBatchJobDefinitionsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          executionIds: S.optional(__S(96, __c6, 0)).pipe(T.HttpQuery("executionIds")),
          jobName: S.optional(S.String).pipe(T.HttpQuery("jobName")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          startedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startedAfter"),
          ),
          startedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startedBefore"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/batch-job-executions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBatchJobExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          executionId: S.String,
          applicationId: S.String,
          jobId: S.optional(S.String),
          jobName: S.optional(S.String),
          jobType: S.optional(S.String),
          status: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          returnCode: S.optional(S.String),
          batchJobIdentifier: S.optional(__S(324, __c20, 4)),
        }),
      ).annotate({ identifier: "BatchJobExecutionSummary" });
    case 2:
      return S.Array(__S(513, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ batchJobExecutions: __S(514, __c32, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBatchJobExecutionsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          executionId: S.String.pipe(T.HttpLabel("executionId")),
          authSecretsManagerArn: S.optional(S.String).pipe(T.HttpQuery("authSecretsManagerArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/batch-job-executions/{executionId}/steps",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBatchJobRestartPointsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          stepNumber: S.optional(S.Number),
          stepName: S.optional(S.String),
          procStepNumber: S.optional(S.Number),
          procStepName: S.optional(S.String),
          stepCondCode: S.optional(S.String),
          stepRestartable: S.optional(S.Boolean),
          stepCheckpoint: S.optional(S.Number),
          stepCheckpointStatus: S.optional(S.String),
          stepCheckpointTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "JobStep" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() => S.Struct({ batchJobSteps: S.optional(__S(530, __c33, 2)) })).annotate({
        identifier: "ListBatchJobRestartPointsResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/dataset-export-tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataSetExportHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ dataSetExportTasks: __S(561, __c35, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSetExportHistoryResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String,
          status: S.String,
          summary: __S(368, __c23, 0),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataSetExportTask" });
    case 1:
      return S.Array(__S(560, __c35, 0));
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/dataset-import-tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataSetImportHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ dataSetImportTasks: __S(561, __c35, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSetImportHistoryResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          prefix: S.optional(S.String).pipe(T.HttpQuery("prefix")),
          nameFilter: S.optional(S.String).pipe(T.HttpQuery("nameFilter")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/datasets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dataSetName: S.String,
          dataSetOrg: S.optional(S.String),
          format: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastReferencedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DataSetSummary" });
    case 2:
      return S.Array(__S(593, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ dataSets: __S(594, __c37, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSetsResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeploymentsRequest" });
    case 1:
      return S.Array(__S(416, __c26, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ deployments: __S(609, __c38, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDeploymentsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          engineType: S.optional(S.String).pipe(T.HttpQuery("engineType")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/engine-versions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEngineVersionsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ engineType: S.String, engineVersion: S.String })).annotate({
        identifier: "EngineVersionsSummary",
      });
    case 2:
      return S.Array(__S(625, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ engineVersions: __S(626, __c39, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEngineVersionsResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          names: S.optional(__S(96, __c6, 0)).pipe(T.HttpQuery("names")),
          engineType: S.optional(S.String).pipe(T.HttpQuery("engineType")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/environments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEnvironmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          environmentArn: S.String,
          environmentId: S.String,
          instanceType: S.String,
          status: S.String,
          engineType: S.String,
          engineVersion: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          networkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentSummary" });
    case 2:
      return S.Array(__S(641, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ environments: __S(642, __c40, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentsResponse" });
  }
}
function __c41(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: __S(16, __c1, 0) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartApplicationRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          batchJobIdentifier: __S(324, __c20, 4),
          jobParams: S.optional(__S(16, __c1, 0)),
          authSecretsManagerArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/batch-job" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartBatchJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ executionId: S.String })).annotate({
        identifier: "StartBatchJobResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          forceStop: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopApplicationRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(16, __c1, 0),
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
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(96, __c6, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          description: S.optional(S.String),
          currentApplicationVersion: S.Number,
          definition: S.optional(__S(32, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/applications/{applicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateApplicationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ applicationVersion: S.Number })).annotate({
        identifier: "UpdateApplicationResponse",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          desiredCapacity: S.optional(S.Number),
          instanceType: S.optional(S.String),
          engineVersion: S.optional(S.String),
          preferredMaintenanceWindow: S.optional(S.String),
          applyDuringMaintenanceWindow: S.optional(S.Boolean),
          forceUpdate: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/environments/{environmentId}" }),
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
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(784, __c49, 0));
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          executionId: S.String.pipe(T.HttpLabel("executionId")),
          authSecretsManagerArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/applications/{applicationId}/batch-job-executions/{executionId}/cancel",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelBatchJobExecutionRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CancelBatchJobExecutionResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
