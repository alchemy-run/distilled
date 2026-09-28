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
  sdkId: "m2",
  target: "AwsSupernovaControlPlaneService",
  version: "2021-04-28",
  sigv4: "m2",
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
                `https://m2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://m2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://m2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://m2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class ExecutionTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "ExecutionTimeoutException",
    ["TimeoutError", "RetryableError"],
    { status: 504 },
  )<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError", "RetryableError"],
    { status: 503 },
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
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason?: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
  | {
      fileBatchJobDefinition: FileBatchJobDefinition;
      scriptBatchJobDefinition?: never;
    }
  | {
      fileBatchJobDefinition?: never;
      scriptBatchJobDefinition: ScriptBatchJobDefinition;
    };
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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/batch-job-executions/{executionId}/cancel",
    input: { applicationId: 0, executionId: 0, authSecretsManagerArn: 0 },
    body: true,
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
  operationName: "CancelBatchJobExecution",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications",
    input: {
      name: 0,
      description: 0,
      engineType: 0,
      definition: i_Definition,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
      kmsKeyId: 0,
      roleArn: 0,
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
  operationName: "CreateApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/dataset-export-task",
    input: {
      applicationId: 0,
      exportConfig: {
        s3Location: 0,
        dataSets: D.list({
          datasetName: 0,
          externalLocation: i_ExternalLocation,
        }),
      },
      clientToken: D.m({ idempotency: true }),
      kmsKeyId: 0,
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
  operationName: "CreateDataSetExportTask",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/dataset-import-task",
    input: {
      applicationId: 0,
      importConfig: {
        s3Location: 0,
        dataSets: D.list({
          dataSet: {
            storageType: 0,
            datasetName: 0,
            datasetOrg: {
              vsam: {
                format: 0,
                encoding: 0,
                compressed: 0,
                primaryKey: { name: 0, offset: 0, length: 0 },
                alternateKeys: D.list({
                  name: 0,
                  offset: 0,
                  length: 0,
                  allowDuplicates: 0,
                }),
              },
              gdg: { limit: 0, rollDisposition: 0 },
              po: { format: 0, encoding: 0, memberFileExtensions: 0 },
              ps: { format: 0, encoding: 0 },
            },
            relativePath: 0,
            recordLength: { min: 0, max: 0 },
          },
          externalLocation: i_ExternalLocation,
        }),
      },
      clientToken: D.m({ idempotency: true }),
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
  operationName: "CreateDataSetImportTask",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/deployments",
    input: {
      environmentId: 0,
      applicationId: 0,
      applicationVersion: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "CreateDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /environments",
    input: {
      name: 0,
      instanceType: 0,
      description: 0,
      engineType: 0,
      engineVersion: 0,
      subnetIds: 0,
      securityGroupIds: 0,
      storageConfigurations: D.list({
        efs: {
          fileSystemId: D.m({ wire: "file-system-id" }),
          mountPoint: D.m({ wire: "mount-point" }),
        },
        fsx: {
          fileSystemId: D.m({ wire: "file-system-id" }),
          mountPoint: D.m({ wire: "mount-point" }),
        },
      }),
      publiclyAccessible: 0,
      highAvailabilityConfig: { desiredCapacity: 0 },
      tags: 0,
      preferredMaintenanceWindow: 0,
      networkType: 0,
      clientToken: D.m({ idempotency: true }),
      kmsKeyId: 0,
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
  operationName: "CreateEnvironment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}",
    input: { applicationId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/environment/{environmentId}",
    input: { applicationId: 0, environmentId: 0 },
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
  operationName: "DeleteApplicationFromEnvironment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /environments/{environmentId}",
    input: { environmentId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}",
    input: { applicationId: 0 },
    output: {
      latestVersion: o_ApplicationVersionSummary,
      creationTime: D.ts,
      lastStartTime: D.ts,
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
  operationName: "GetApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/versions/{applicationVersion}",
    input: { applicationId: 0, applicationVersion: 0 },
    output: { creationTime: D.ts },
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
  operationName: "GetApplicationVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/batch-job-executions/{executionId}",
    input: { applicationId: 0, executionId: 0 },
    output: { startTime: D.ts, endTime: D.ts },
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
  operationName: "GetBatchJobExecution",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/datasets/{dataSetName}",
    input: { applicationId: 0, dataSetName: 0 },
    output: {
      creationTime: D.ts,
      lastUpdatedTime: D.ts,
      lastReferencedTime: D.ts,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/dataset-export-tasks/{taskId}",
    input: { applicationId: 0, taskId: 0 },
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
  operationName: "GetDataSetExportTask",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/dataset-import-tasks/{taskId}",
    input: { applicationId: 0, taskId: 0 },
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
  operationName: "GetDataSetImportTask",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/deployments/{deploymentId}",
    input: { deploymentId: 0, applicationId: 0 },
    output: { creationTime: D.ts },
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
  operationName: "GetDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /environments/{environmentId}",
    input: { environmentId: 0 },
    output: {
      creationTime: D.ts,
      storageConfigurations: D.list({
        efs: {
          fileSystemId: D.m({ wire: "file-system-id" }),
          mountPoint: D.m({ wire: "mount-point" }),
        },
        fsx: {
          fileSystemId: D.m({ wire: "file-system-id" }),
          mountPoint: D.m({ wire: "mount-point" }),
        },
      }),
      pendingMaintenance: { schedule: { startTime: D.ts, endTime: D.ts } },
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
  operationName: "GetEnvironment",
})) as any;

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
  descriptor: { service: svc, http: "GET /signed-bi-url" },
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSignedBluinsightsUrl",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      names: D.m({ query: "names" }),
      environmentId: D.m({ query: "environmentId" }),
    },
    output: {
      applications: D.list({ creationTime: D.ts, lastStartTime: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/versions",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      applicationId: 0,
    },
    output: { applicationVersions: D.list(o_ApplicationVersionSummary) },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/batch-job-definitions",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      applicationId: 0,
      prefix: D.m({ query: "prefix" }),
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/batch-job-executions",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      applicationId: 0,
      executionIds: D.m({ query: "executionIds" }),
      jobName: D.m({ query: "jobName" }),
      status: D.m({ query: "status" }),
      startedAfter: D.m({
        query: "startedAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      startedBefore: D.m({
        query: "startedBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
    },
    output: { batchJobExecutions: D.list({ startTime: D.ts, endTime: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/batch-job-executions/{executionId}/steps",
    input: {
      applicationId: 0,
      executionId: 0,
      authSecretsManagerArn: D.m({ query: "authSecretsManagerArn" }),
    },
    output: { batchJobSteps: D.list({ stepCheckpointTime: D.ts }) },
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
  operationName: "ListBatchJobRestartPoints",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/dataset-export-tasks",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      applicationId: 0,
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/dataset-import-tasks",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      applicationId: 0,
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/datasets",
    input: {
      applicationId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      prefix: D.m({ query: "prefix" }),
      nameFilter: D.m({ query: "nameFilter" }),
    },
    output: {
      dataSets: D.list({
        creationTime: D.ts,
        lastUpdatedTime: D.ts,
        lastReferencedTime: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/deployments",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      applicationId: 0,
    },
    output: { deployments: D.list({ creationTime: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /engine-versions",
    input: {
      engineType: D.m({ query: "engineType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /environments",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      names: D.m({ query: "names" }),
      engineType: D.m({ query: "engineType" }),
    },
    output: { environments: D.list({ creationTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/start",
    input: { applicationId: 0 },
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
  operationName: "StartApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/batch-job",
    input: {
      applicationId: 0,
      batchJobIdentifier: {
        fileBatchJobIdentifier: { fileName: 0, folderPath: 0 },
        scriptBatchJobIdentifier: { scriptName: 0 },
        s3BatchJobIdentifier: {
          bucket: 0,
          keyPrefix: 0,
          identifier: { fileName: 0, scriptName: 0 },
        },
        restartBatchJobIdentifier: {
          executionId: 0,
          jobStepRestartMarker: {
            fromStep: 0,
            fromProcStep: 0,
            toStep: 0,
            toProcStep: 0,
            stepCheckpoint: 0,
            skip: 0,
          },
        },
      },
      jobParams: 0,
      authSecretsManagerArn: 0,
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
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBatchJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/stop",
    input: { applicationId: 0, forceStop: 0 },
    body: true,
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
  operationName: "StopApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
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
  descriptor: {
    service: svc,
    http: "PATCH /applications/{applicationId}",
    input: {
      applicationId: 0,
      description: 0,
      currentApplicationVersion: 0,
      definition: i_Definition,
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
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /environments/{environmentId}",
    input: {
      environmentId: 0,
      desiredCapacity: 0,
      instanceType: 0,
      engineVersion: 0,
      preferredMaintenanceWindow: 0,
      applyDuringMaintenanceWindow: 0,
      forceUpdate: 0,
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
  operationName: "UpdateEnvironment",
})) as any;

const i_Definition: D.LazyStruct = () => ({ s3Location: 0, content: 0 });
const i_ExternalLocation: D.LazyStruct = () => ({ s3Location: 0 });
const o_ApplicationVersionSummary: D.LazyStruct = () => ({
  creationTime: D.ts,
});
