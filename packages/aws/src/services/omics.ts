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
  sdkId: "Omics",
  target: "Omics",
  version: "2022-11-28",
  sigv4: "omics",
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
                `https://omics-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://omics-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://omics.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://omics.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class NotSupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotSupportedOperationException",
    ["BadRequestError"],
    { status: 405 },
  )<{ readonly message: string }> {}
export class RangeNotSatisfiableException
  extends /*@__PURE__*/ TE.TaggedError(
    "RangeNotSatisfiableException",
    ["RetryableError"],
    { status: 416 },
  )<{ readonly message: string }> {}
export class RequestTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestTimeoutException",
    ["TimeoutError"],
    { status: 408 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyRequestsException", [
    "ThrottlingError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type SequenceStoreId = string;
export type UploadId = string;
export interface AbortMultipartReadSetUploadRequest {
  sequenceStoreId: string;
  uploadId: string;
}
export interface AbortMultipartReadSetUploadResponse {}
export interface AcceptShareRequest {
  shareId: string;
}
export type ShareStatus = string;
export interface AcceptShareResponse {
  status?: string;
}
export type ReadSetId = string;
export type ReadSetIdList = string[];
export interface BatchDeleteReadSetRequest {
  ids: string[];
  sequenceStoreId: string;
}
export interface ReadSetBatchError {
  id: string;
  code: string;
  message: string;
}
export type ReadSetBatchErrorList = ReadSetBatchError[];
export interface BatchDeleteReadSetResponse {
  errors?: ReadSetBatchError[];
}
export type ResourceId = string;
export interface CancelAnnotationImportRequest {
  jobId: string;
}
export interface CancelAnnotationImportResponse {}
export type RunId = string;
export interface CancelRunRequest {
  id: string;
}
export interface CancelRunResponse {}
export type BatchId = string;
export interface CancelRunBatchRequest {
  batchId: string;
}
export interface CancelRunBatchResponse {}
export interface CancelVariantImportRequest {
  jobId: string;
}
export interface CancelVariantImportResponse {}
export type ReadSetPartSource = string;
export interface CompleteReadSetUploadPartListItem {
  partNumber: number;
  partSource: string;
  checksum: string;
}
export type CompleteReadSetUploadPartList = CompleteReadSetUploadPartListItem[];
export interface CompleteMultipartReadSetUploadRequest {
  sequenceStoreId: string;
  uploadId: string;
  parts: CompleteReadSetUploadPartListItem[];
}
export interface CompleteMultipartReadSetUploadResponse {
  readSetId: string;
}
export type ReferenceArn = string;
export type ReferenceItem = { referenceArn: string };
export type StoreName = string;
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type VersionName = string;
export type EncryptionType = string;
export interface SseConfig {
  type: string;
  keyArn?: string;
}
export type StoreFormat = string;
export type AnnotationType = string;
export type FormatToHeaderKey = string;
export type FormatToHeader = { [key: string]: string | undefined };
export type SchemaValueType = string;
export type SchemaItem = { [key: string]: string | undefined };
export type Schema = { [key: string]: string | undefined }[];
export interface TsvStoreOptions {
  annotationType?: string;
  formatToHeader?: { [key: string]: string | undefined };
  schema?: { [key: string]: string | undefined }[];
}
export type StoreOptions = { tsvStoreOptions: TsvStoreOptions };
export interface CreateAnnotationStoreRequest {
  reference?: ReferenceItem;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  versionName?: string;
  sseConfig?: SseConfig;
  storeFormat: string;
  storeOptions?: StoreOptions;
}
export type StoreStatus = string;
export type CreationTime = Date;
export interface CreateAnnotationStoreResponse {
  id: string;
  reference?: ReferenceItem;
  storeFormat?: string;
  storeOptions?: StoreOptions;
  status: string;
  name: string;
  versionName: string;
  creationTime: Date;
}
export interface TsvVersionOptions {
  annotationType?: string;
  formatToHeader?: { [key: string]: string | undefined };
  schema?: { [key: string]: string | undefined }[];
}
export type VersionOptions = { tsvVersionOptions: TsvVersionOptions };
export interface CreateAnnotationStoreVersionRequest {
  name: string;
  versionName: string;
  description?: string;
  versionOptions?: VersionOptions;
  tags?: { [key: string]: string | undefined };
}
export type VersionStatus = string;
export interface CreateAnnotationStoreVersionResponse {
  id: string;
  versionName: string;
  storeId: string;
  versionOptions?: VersionOptions;
  name: string;
  status: string;
  creationTime: Date;
}
export type ConfigurationName = string;
export type ConfigurationDescription = string;
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export type SubnetId = string;
export type SubnetIds = string[];
export interface VpcConfig {
  securityGroupIds?: string[];
  subnetIds?: string[];
}
export interface RunConfigurations {
  vpcConfig?: VpcConfig;
}
export type ConfigurationRequestId = string;
export interface CreateConfigurationRequest {
  name: string;
  description?: string;
  runConfigurations: RunConfigurations;
  tags?: { [key: string]: string | undefined };
  requestId: string;
}
export type ConfigurationArn = string;
export type ConfigurationUuid = string;
export type VpcId = string;
export interface VpcConfigResponse {
  securityGroupIds?: string[];
  subnetIds?: string[];
  vpcId?: string;
}
export interface RunConfigurationsResponse {
  vpcConfig?: VpcConfigResponse;
}
export type ConfigurationStatus = string;
export type ConfigurationTimestamp = Date;
export interface CreateConfigurationResponse {
  arn?: string;
  uuid?: string;
  name?: string;
  description?: string;
  runConfigurations?: RunConfigurationsResponse;
  status?: string;
  creationTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export type ClientToken = string;
export type FileType = string;
export type SubjectId = string;
export type SampleId = string;
export type GeneratedFrom = string;
export type ReadSetName = string;
export type ReadSetDescription = string;
export interface CreateMultipartReadSetUploadRequest {
  sequenceStoreId: string;
  clientToken?: string;
  sourceFileType: string;
  subjectId: string;
  sampleId: string;
  generatedFrom?: string;
  referenceArn?: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateMultipartReadSetUploadResponse {
  sequenceStoreId: string;
  uploadId: string;
  sourceFileType: string;
  subjectId: string;
  sampleId: string;
  generatedFrom?: string;
  referenceArn: string;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  creationTime: Date;
}
export type ReferenceStoreName = string;
export type ReferenceStoreDescription = string;
export interface CreateReferenceStoreRequest {
  name: string;
  description?: string;
  sseConfig?: SseConfig;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type ReferenceStoreId = string;
export type ReferenceStoreArn = string;
export interface CreateReferenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
}
export type CacheBehavior = string;
export type S3UriForBucketOrObject = string;
export type UserCustomDescription = string;
export type UserCustomName = string;
export type RunCacheRequestId = string;
export type AwsAccountId = string;
export interface CreateRunCacheRequest {
  cacheBehavior?: string;
  cacheS3Location: string;
  description?: string;
  name?: string;
  requestId: string;
  tags?: { [key: string]: string | undefined };
  cacheBucketOwnerId?: string;
}
export type RunCacheArn = string;
export type RunCacheId = string;
export type RunCacheStatus = string;
export interface CreateRunCacheResponse {
  arn?: string;
  id?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
}
export type RunGroupName = string;
export type RunGroupRequestId = string;
export interface CreateRunGroupRequest {
  name?: string;
  maxCpus?: number;
  maxRuns?: number;
  maxDuration?: number;
  tags?: { [key: string]: string | undefined };
  requestId: string;
  maxGpus?: number;
}
export type RunGroupArn = string;
export type RunGroupId = string;
export interface CreateRunGroupResponse {
  arn?: string;
  id?: string;
  tags?: { [key: string]: string | undefined };
}
export type SequenceStoreName = string;
export type SequenceStoreDescription = string;
export type FallbackLocation = string;
export type ETagAlgorithmFamily = string;
export type PropagatedSetLevelTags = string[];
export type AccessLogLocation = string;
export interface S3AccessConfig {
  accessLogLocation?: string;
}
export interface CreateSequenceStoreRequest {
  name: string;
  description?: string;
  sseConfig?: SseConfig;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
  fallbackLocation?: string;
  eTagAlgorithmFamily?: string;
  propagatedSetLevelTags?: string[];
  s3AccessConfig?: S3AccessConfig;
}
export type SequenceStoreArn = string;
export type SequenceStoreStatus = string;
export type SequenceStoreStatusMessage = string;
export type S3Uri = string;
export type S3AccessPointArn = string;
export interface SequenceStoreS3Access {
  s3Uri?: string;
  s3AccessPointArn?: string;
  accessLogLocation?: string;
}
export interface CreateSequenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
  fallbackLocation?: string;
  eTagAlgorithmFamily?: string;
  status?: string;
  statusMessage?: string;
  propagatedSetLevelTags?: string[];
  s3Access?: SequenceStoreS3Access;
}
export type ShareName = string;
export interface CreateShareRequest {
  resourceArn: string;
  principalSubscriber: string;
  shareName?: string;
}
export interface CreateShareResponse {
  shareId?: string;
  status?: string;
  shareName?: string;
}
export interface CreateVariantStoreRequest {
  reference: ReferenceItem;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  sseConfig?: SseConfig;
}
export interface CreateVariantStoreResponse {
  id: string;
  reference?: ReferenceItem;
  status: string;
  name: string;
  creationTime: Date;
}
export type WorkflowName = string;
export type WorkflowDescription = string;
export type WorkflowEngine = string;
export type WorkflowDefinition = string;
export type WorkflowMain = string;
export type WorkflowParameterName = string;
export type WorkflowParameterDescription = string;
export interface WorkflowParameter {
  description?: string;
  optional?: boolean;
}
export type WorkflowParameterTemplate = {
  [key: string]: WorkflowParameter | undefined;
};
export type WorkflowRequestId = string;
export type Accelerators = string;
export type StorageType = string;
export type Uri = string;
export type EcrRepositoryPrefix = string;
export type UpstreamRepositoryPrefix = string;
export interface RegistryMapping {
  upstreamRegistryUrl?: string;
  ecrRepositoryPrefix?: string;
  upstreamRepositoryPrefix?: string;
  ecrAccountId?: string;
}
export type RegistryMappingsList = RegistryMapping[];
export interface ImageMapping {
  sourceImage?: string;
  destinationImage?: string;
}
export type ImageMappingsList = ImageMapping[];
export interface ContainerRegistryMap {
  registryMappings?: RegistryMapping[];
  imageMappings?: ImageMapping[];
}
export type ReadmeMarkdown = string;
export type ParameterTemplatePath = string;
export type ReadmePath = string;
export type ConnectionArn = string;
export type FullRepositoryId = string;
export type SourceReferenceType = string;
export type SourceReferenceValue = string;
export interface SourceReference {
  type: string;
  value: string;
}
export type ExcludeFilePatternList = string[];
export interface DefinitionRepository {
  connectionArn: string;
  fullRepositoryId: string;
  sourceReference?: SourceReference;
  excludeFilePatterns?: string[];
}
export type WorkflowBucketOwnerId = string;
export type S3UriForObject = string;
export interface CreateWorkflowRequest {
  name?: string;
  description?: string;
  engine?: string;
  definitionZip?: Uint8Array;
  definitionUri?: string;
  main?: string;
  parameterTemplate?: { [key: string]: WorkflowParameter | undefined };
  storageCapacity?: number;
  tags?: { [key: string]: string | undefined };
  requestId: string;
  accelerators?: string;
  storageType?: string;
  containerRegistryMap?: ContainerRegistryMap;
  containerRegistryMapUri?: string;
  readmeMarkdown?: string;
  parameterTemplatePath?: string;
  readmePath?: string;
  definitionRepository?: DefinitionRepository;
  workflowBucketOwnerId?: string;
  readmeUri?: string;
}
export type WorkflowArn = string;
export type WorkflowId = string;
export type WorkflowStatus = string;
export type WorkflowUuid = string;
export interface CreateWorkflowResponse {
  arn?: string;
  id?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
  uuid?: string;
}
export type WorkflowVersionName = string;
export type WorkflowVersionDescription = string;
export interface CreateWorkflowVersionRequest {
  workflowId: string;
  versionName: string;
  definitionZip?: Uint8Array;
  definitionUri?: string;
  accelerators?: string;
  description?: string;
  engine?: string;
  main?: string;
  parameterTemplate?: { [key: string]: WorkflowParameter | undefined };
  requestId: string;
  storageType?: string;
  storageCapacity?: number;
  tags?: { [key: string]: string | undefined };
  workflowBucketOwnerId?: string;
  containerRegistryMap?: ContainerRegistryMap;
  containerRegistryMapUri?: string;
  readmeMarkdown?: string;
  parameterTemplatePath?: string;
  readmePath?: string;
  definitionRepository?: DefinitionRepository;
  readmeUri?: string;
}
export type WorkflowVersionArn = string;
export interface CreateWorkflowVersionResponse {
  arn?: string;
  workflowId?: string;
  versionName?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
  uuid?: string;
}
export interface DeleteAnnotationStoreRequest {
  name: string;
  force?: boolean;
}
export interface DeleteAnnotationStoreResponse {
  status: string;
}
export type VersionList = string[];
export interface DeleteAnnotationStoreVersionsRequest {
  name: string;
  versions: string[];
  force?: boolean;
}
export interface VersionDeleteError {
  versionName: string;
  message: string;
}
export type VersionDeleteErrorList = VersionDeleteError[];
export interface DeleteAnnotationStoreVersionsResponse {
  errors?: VersionDeleteError[];
}
export interface DeleteBatchRequest {
  batchId: string;
}
export interface DeleteBatchResponse {}
export interface DeleteConfigurationRequest {
  name: string;
}
export interface DeleteConfigurationResponse {}
export type ReferenceId = string;
export interface DeleteReferenceRequest {
  id: string;
  referenceStoreId: string;
}
export interface DeleteReferenceResponse {}
export interface DeleteReferenceStoreRequest {
  id: string;
}
export interface DeleteReferenceStoreResponse {}
export interface DeleteRunRequest {
  id: string;
}
export interface DeleteRunResponse {}
export interface DeleteRunBatchRequest {
  batchId: string;
}
export interface DeleteRunBatchResponse {}
export interface DeleteRunCacheRequest {
  id: string;
}
export interface DeleteRunCacheResponse {}
export interface DeleteRunGroupRequest {
  id: string;
}
export interface DeleteRunGroupResponse {}
export interface DeleteS3AccessPolicyRequest {
  s3AccessPointArn: string;
}
export interface DeleteS3AccessPolicyResponse {}
export interface DeleteSequenceStoreRequest {
  id: string;
}
export interface DeleteSequenceStoreResponse {}
export interface DeleteShareRequest {
  shareId: string;
}
export interface DeleteShareResponse {
  status?: string;
}
export interface DeleteVariantStoreRequest {
  name: string;
  force?: boolean;
}
export interface DeleteVariantStoreResponse {
  status: string;
}
export interface DeleteWorkflowRequest {
  id: string;
}
export interface DeleteWorkflowResponse {}
export interface DeleteWorkflowVersionRequest {
  workflowId: string;
  versionName: string;
}
export interface DeleteWorkflowVersionResponse {}
export interface GetAnnotationImportRequest {
  jobId: string;
}
export type Arn = string;
export type JobStatus = string;
export type JobStatusMsg = string;
export type UpdateTime = Date;
export type CompletionTime = Date;
export interface AnnotationImportItemDetail {
  source: string;
  jobStatus: string;
}
export type AnnotationImportItemDetails = AnnotationImportItemDetail[];
export type RunLeftNormalization = boolean;
export type Separator = string;
export type Encoding = string;
export type Quote = string;
export type QuoteAll = boolean;
export type EscapeChar = string;
export type EscapeQuotes = boolean;
export type CommentChar = string;
export type Header = boolean;
export type LineSep = string;
export interface ReadOptions {
  sep?: string;
  encoding?: string;
  quote?: string;
  quoteAll?: boolean;
  escape?: string;
  escapeQuotes?: boolean;
  comment?: string;
  header?: boolean;
  lineSep?: string;
}
export interface TsvOptions {
  readOptions?: ReadOptions;
}
export interface VcfOptions {
  ignoreQualField?: boolean;
  ignoreFilterField?: boolean;
}
export type FormatOptions =
  | { tsvOptions: TsvOptions; vcfOptions?: never }
  | { tsvOptions?: never; vcfOptions: VcfOptions };
export type AnnotationFieldMap = { [key: string]: string | undefined };
export interface GetAnnotationImportResponse {
  id: string;
  destinationName: string;
  versionName: string;
  roleArn: string;
  status: string;
  statusMessage: string;
  creationTime: Date;
  updateTime: Date;
  completionTime: Date;
  items: AnnotationImportItemDetail[];
  runLeftNormalization: boolean;
  formatOptions: FormatOptions;
  annotationFields?: { [key: string]: string | undefined };
}
export interface GetAnnotationStoreRequest {
  name: string;
}
export type StatusMessage = string;
export interface GetAnnotationStoreResponse {
  id: string;
  reference: ReferenceItem;
  status: string;
  storeArn: string;
  name: string;
  description: string;
  sseConfig: SseConfig;
  creationTime: Date;
  updateTime: Date;
  tags: { [key: string]: string | undefined };
  storeOptions?: StoreOptions;
  storeFormat?: string;
  statusMessage: string;
  storeSizeBytes: number;
  numVersions: number;
}
export interface GetAnnotationStoreVersionRequest {
  name: string;
  versionName: string;
}
export interface GetAnnotationStoreVersionResponse {
  storeId: string;
  id: string;
  status: string;
  versionArn: string;
  name: string;
  versionName: string;
  description: string;
  creationTime: Date;
  updateTime: Date;
  tags: { [key: string]: string | undefined };
  versionOptions?: VersionOptions;
  statusMessage: string;
  versionSizeBytes: number;
}
export interface GetBatchRequest {
  batchId: string;
}
export type BatchArn = string;
export type BatchUuid = string;
export type BatchName = string;
export type BatchStatus = string;
export type WorkflowType = string;
export type RunRoleArn = string;
export type RunName = string;
export type NumericIdInArn = string;
export type RunParameters = unknown;
export type RunOutputUri = string;
export type RunLogLevel = string;
export type RunRetentionMode = string;
export type WorkflowOwnerId = string;
export type NetworkingMode = string;
export type EngineSettings = unknown;
export type ScratchStorageMode = string;
export interface DefaultRunSetting {
  workflowId: string;
  workflowType?: string;
  roleArn: string;
  name?: string;
  cacheId?: string;
  cacheBehavior?: string;
  runGroupId?: string;
  priority?: number;
  parameters?: any;
  storageCapacity?: number;
  outputUri?: string;
  logLevel?: string;
  runTags?: { [key: string]: string | undefined };
  retentionMode?: string;
  storageType?: string;
  workflowOwnerId?: string;
  outputBucketOwnerId?: string;
  workflowVersionName?: string;
  networkingMode?: string;
  configurationName?: string;
  engineSettings?: any;
  scratchStorageMode?: string;
}
export interface SubmissionSummary {
  successfulStartSubmissionCount?: number;
  failedStartSubmissionCount?: number;
  pendingStartSubmissionCount?: number;
  successfulCancelSubmissionCount?: number;
  failedCancelSubmissionCount?: number;
  successfulDeleteSubmissionCount?: number;
  failedDeleteSubmissionCount?: number;
}
export interface RunSummary {
  pendingRunCount?: number;
  startingRunCount?: number;
  runningRunCount?: number;
  stoppingRunCount?: number;
  completedRunCount?: number;
  deletedRunCount?: number;
  failedRunCount?: number;
  cancelledRunCount?: number;
}
export type BatchTimestamp = Date;
export interface GetBatchResponse {
  id?: string;
  arn?: string;
  uuid?: string;
  name?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
  totalRuns?: number;
  defaultRunSetting?: DefaultRunSetting;
  submissionSummary?: SubmissionSummary;
  runSummary?: RunSummary;
  creationTime?: Date;
  submittedTime?: Date;
  processedTime?: Date;
  failedTime?: Date;
  failureReason?: string;
}
export interface GetConfigurationRequest {
  name: string;
}
export interface GetConfigurationResponse {
  arn?: string;
  uuid?: string;
  name?: string;
  description?: string;
  runConfigurations?: RunConfigurationsResponse;
  status?: string;
  creationTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export type ReadSetFile = string;
export interface GetReadSetRequest {
  id: string;
  sequenceStoreId: string;
  file?: string;
  partNumber: number;
}
export interface GetReadSetResponse {
  payload?: T.StreamingOutputBody;
}
export type ActivationJobId = string;
export interface GetReadSetActivationJobRequest {
  id: string;
  sequenceStoreId: string;
}
export type ReadSetActivationJobStatus = string;
export type JobStatusMessage = string;
export type ReadSetActivationJobItemStatus = string;
export interface ActivateReadSetSourceItem {
  readSetId: string;
  status: string;
  statusMessage?: string;
}
export type ActivateReadSetSourceList = ActivateReadSetSourceItem[];
export interface GetReadSetActivationJobResponse {
  id: string;
  sequenceStoreId: string;
  status: string;
  statusMessage?: string;
  creationTime: Date;
  completionTime?: Date;
  sources?: ActivateReadSetSourceItem[];
}
export type ExportJobId = string;
export interface GetReadSetExportJobRequest {
  sequenceStoreId: string;
  id: string;
}
export type S3Destination = string;
export type ReadSetExportJobStatus = string;
export type ReadSetExportJobItemStatus = string;
export interface ExportReadSetDetail {
  id: string;
  status: string;
  statusMessage?: string;
}
export type ExportReadSetDetailList = ExportReadSetDetail[];
export interface GetReadSetExportJobResponse {
  id: string;
  sequenceStoreId: string;
  destination: string;
  status: string;
  statusMessage?: string;
  creationTime: Date;
  completionTime?: Date;
  readSets?: ExportReadSetDetail[];
}
export type ImportJobId = string;
export interface GetReadSetImportJobRequest {
  id: string;
  sequenceStoreId: string;
}
export type RoleArn = string;
export type ReadSetImportJobStatus = string;
export interface SourceFiles {
  source1: string;
  source2?: string;
}
export type ReadSetImportJobItemStatus = string;
export interface ImportReadSetSourceItem {
  sourceFiles: SourceFiles;
  sourceFileType: string;
  status: string;
  statusMessage?: string;
  subjectId: string;
  sampleId: string;
  generatedFrom?: string;
  referenceArn?: string;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  readSetId?: string;
}
export type ImportReadSetSourceList = ImportReadSetSourceItem[];
export interface GetReadSetImportJobResponse {
  id: string;
  sequenceStoreId: string;
  roleArn: string;
  status: string;
  statusMessage?: string;
  creationTime: Date;
  completionTime?: Date;
  sources: ImportReadSetSourceItem[];
}
export interface GetReadSetMetadataRequest {
  id: string;
  sequenceStoreId: string;
}
export type ReadSetArn = string;
export type ReadSetStatus = string;
export interface SequenceInformation {
  totalReadCount?: number;
  totalBaseCount?: number;
  generatedFrom?: string;
  alignment?: string;
}
export interface ReadSetS3Access {
  s3Uri?: string;
}
export interface FileInformation {
  totalParts?: number;
  partSize?: number;
  contentLength?: number;
  s3Access?: ReadSetS3Access;
}
export interface ReadSetFiles {
  source1?: FileInformation;
  source2?: FileInformation;
  index?: FileInformation;
}
export type ReadSetStatusMessage = string;
export type CreationType = string;
export type ETagAlgorithm = string;
export interface ETag {
  algorithm?: string;
  source1?: string;
  source2?: string;
}
export type CreationJobId = string;
export interface GetReadSetMetadataResponse {
  id: string;
  arn: string;
  sequenceStoreId: string;
  subjectId?: string;
  sampleId?: string;
  status: string;
  name?: string;
  description?: string;
  fileType: string;
  creationTime: Date;
  sequenceInformation?: SequenceInformation;
  referenceArn?: string;
  files?: ReadSetFiles;
  statusMessage?: string;
  creationType?: string;
  etag?: ETag;
  creationJobId?: string;
}
export type Range = string;
export type ReferenceFile = string;
export interface GetReferenceRequest {
  id: string;
  referenceStoreId: string;
  range?: string;
  partNumber: number;
  file?: string;
}
export interface GetReferenceResponse {
  payload?: T.StreamingOutputBody;
}
export interface GetReferenceImportJobRequest {
  id: string;
  referenceStoreId: string;
}
export type ReferenceImportJobStatus = string;
export type ReferenceImportJobItemStatus = string;
export type ReferenceName = string;
export type ReferenceDescription = string;
export interface ImportReferenceSourceItem {
  sourceFile?: string;
  status: string;
  statusMessage?: string;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  referenceId?: string;
}
export type ImportReferenceSourceList = ImportReferenceSourceItem[];
export interface GetReferenceImportJobResponse {
  id: string;
  referenceStoreId: string;
  roleArn: string;
  status: string;
  statusMessage?: string;
  creationTime: Date;
  completionTime?: Date;
  sources: ImportReferenceSourceItem[];
}
export interface GetReferenceMetadataRequest {
  id: string;
  referenceStoreId: string;
}
export type Md5 = string;
export type ReferenceStatus = string;
export interface ReferenceFiles {
  source?: FileInformation;
  index?: FileInformation;
}
export type ReferenceCreationType = string;
export interface GetReferenceMetadataResponse {
  id: string;
  arn: string;
  referenceStoreId: string;
  md5: string;
  status?: string;
  name?: string;
  description?: string;
  creationTime: Date;
  updateTime: Date;
  files?: ReferenceFiles;
  creationType?: string;
  creationJobId?: string;
}
export interface GetReferenceStoreRequest {
  id: string;
}
export interface GetReferenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
}
export type RunExport = string;
export type RunExportList = string[];
export interface GetRunRequest {
  id: string;
  export?: string[];
}
export type RunArn = string;
export type EngineVersion = string;
export type RunStatus = string;
export type WorkflowDigest = string;
export type RunResourceDigestKey = string;
export type RunResourceDigest = string;
export type RunResourceDigests = { [key: string]: string | undefined };
export type RunStartedBy = string;
export type RunTimestamp = Date;
export type RunStatusMessage = string;
export type RunFailureReason = string;
export type EngineLogStream = string;
export type RunLogStream = string;
export interface RunLogLocation {
  engineLogStream?: string;
  runLogStream?: string;
}
export type RunUuid = string;
export interface ConfigurationDetails {
  name?: string;
  arn?: string;
  uuid?: string;
}
export interface GetRunResponse {
  arn?: string;
  id?: string;
  cacheId?: string;
  cacheBehavior?: string;
  engineVersion?: string;
  status?: string;
  workflowId?: string;
  workflowType?: string;
  runId?: string;
  roleArn?: string;
  name?: string;
  runGroupId?: string;
  batchId?: string;
  priority?: number;
  definition?: string;
  digest?: string;
  parameters?: any;
  storageCapacity?: number;
  outputUri?: string;
  logLevel?: string;
  resourceDigests?: { [key: string]: string | undefined };
  startedBy?: string;
  creationTime?: Date;
  startTime?: Date;
  stopTime?: Date;
  statusMessage?: string;
  tags?: { [key: string]: string | undefined };
  accelerators?: string;
  retentionMode?: string;
  failureReason?: string;
  logLocation?: RunLogLocation;
  uuid?: string;
  runOutputUri?: string;
  storageType?: string;
  workflowOwnerId?: string;
  workflowVersionName?: string;
  workflowUuid?: string;
  networkingMode?: string;
  scratchStorageMode?: string;
  configuration?: ConfigurationDetails;
  vpcConfig?: VpcConfigResponse;
  engineSettings?: any;
}
export interface GetRunCacheRequest {
  id: string;
}
export type RunCacheTimestamp = Date;
export interface GetRunCacheResponse {
  arn?: string;
  cacheBehavior?: string;
  cacheBucketOwnerId?: string;
  cacheS3Uri?: string;
  creationTime?: Date;
  description?: string;
  id?: string;
  name?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetRunGroupRequest {
  id: string;
}
export type RunGroupTimestamp = Date;
export interface GetRunGroupResponse {
  arn?: string;
  id?: string;
  name?: string;
  maxCpus?: number;
  maxRuns?: number;
  maxDuration?: number;
  creationTime?: Date;
  tags?: { [key: string]: string | undefined };
  maxGpus?: number;
}
export type TaskId = string;
export interface GetRunTaskRequest {
  id: string;
  taskId: string;
}
export type TaskStatus = string;
export type TaskName = string;
export type TaskTimestamp = Date;
export type TaskStatusMessage = string;
export type TaskLogStream = string;
export type TaskInstanceType = string;
export type TaskFailureReason = string;
export type TaskImageDigest = string;
export interface ImageDetails {
  image?: string;
  imageDigest?: string;
  sourceImage?: string;
}
export type TaskUuid = string;
export interface GetRunTaskResponse {
  taskId?: string;
  status?: string;
  name?: string;
  cpus?: number;
  cacheHit?: boolean;
  cacheS3Uri?: string;
  memory?: number;
  creationTime?: Date;
  startTime?: Date;
  stopTime?: Date;
  statusMessage?: string;
  logStream?: string;
  gpus?: number;
  instanceType?: string;
  failureReason?: string;
  imageDetails?: ImageDetails;
  uuid?: string;
}
export interface GetS3AccessPolicyRequest {
  s3AccessPointArn: string;
}
export type StoreId = string;
export type StoreType = "SEQUENCE_STORE" | "REFERENCE_STORE" | (string & {});
export type S3AccessPolicy = string;
export interface GetS3AccessPolicyResponse {
  s3AccessPointArn?: string;
  storeId?: string;
  storeType?: StoreType;
  updateTime?: Date;
  s3AccessPolicy: string;
}
export interface GetSequenceStoreRequest {
  id: string;
}
export interface GetSequenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
  fallbackLocation?: string;
  s3Access?: SequenceStoreS3Access;
  eTagAlgorithmFamily?: string;
  status?: string;
  statusMessage?: string;
  propagatedSetLevelTags?: string[];
  updateTime?: Date;
}
export interface GetShareRequest {
  shareId: string;
}
export interface ShareDetails {
  shareId?: string;
  resourceArn?: string;
  resourceId?: string;
  principalSubscriber?: string;
  ownerId?: string;
  status?: string;
  statusMessage?: string;
  shareName?: string;
  creationTime?: Date;
  updateTime?: Date;
}
export interface GetShareResponse {
  share?: ShareDetails;
}
export interface GetVariantImportRequest {
  jobId: string;
}
export interface VariantImportItemDetail {
  source: string;
  jobStatus: string;
  statusMessage?: string;
}
export type VariantImportItemDetails = VariantImportItemDetail[];
export interface GetVariantImportResponse {
  id: string;
  destinationName: string;
  roleArn: string;
  status: string;
  statusMessage: string;
  creationTime: Date;
  updateTime: Date;
  completionTime?: Date;
  items: VariantImportItemDetail[];
  runLeftNormalization: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export interface GetVariantStoreRequest {
  name: string;
}
export interface GetVariantStoreResponse {
  id: string;
  reference: ReferenceItem;
  status: string;
  storeArn: string;
  name: string;
  description: string;
  sseConfig: SseConfig;
  creationTime: Date;
  updateTime: Date;
  tags: { [key: string]: string | undefined };
  statusMessage: string;
  storeSizeBytes: number;
}
export type WorkflowExport = string;
export type WorkflowExportList = string[];
export interface GetWorkflowRequest {
  id: string;
  type?: string;
  export?: string[];
  workflowOwnerId?: string;
}
export type WorkflowTimestamp = Date;
export type WorkflowStatusMessage = string;
export type WorkflowMetadataKey = string;
export type WorkflowMetadataValue = string;
export type WorkflowMetadata = { [key: string]: string | undefined };
export type ReadmeS3PresignedUrl = string;
export interface DefinitionRepositoryDetails {
  connectionArn?: string;
  fullRepositoryId?: string;
  sourceReference?: SourceReference;
  providerType?: string;
  providerEndpoint?: string;
}
export type WorkflowProfileName = string;
export type WorkflowProfileList = string[];
export type WorkflowProfileParameterTemplates = {
  [key: string]: { [key: string]: WorkflowParameter | undefined } | undefined;
};
export interface GetWorkflowResponse {
  arn?: string;
  id?: string;
  status?: string;
  type?: string;
  name?: string;
  description?: string;
  engine?: string;
  definition?: string;
  main?: string;
  digest?: string;
  parameterTemplate?: { [key: string]: WorkflowParameter | undefined };
  storageCapacity?: number;
  creationTime?: Date;
  statusMessage?: string;
  tags?: { [key: string]: string | undefined };
  metadata?: { [key: string]: string | undefined };
  accelerators?: string;
  storageType?: string;
  uuid?: string;
  containerRegistryMap?: ContainerRegistryMap;
  readme?: string;
  definitionRepositoryDetails?: DefinitionRepositoryDetails;
  readmePath?: string;
  profiles?: string[];
  profileParameterTemplates?: {
    [key: string]: { [key: string]: WorkflowParameter | undefined } | undefined;
  };
}
export interface GetWorkflowVersionRequest {
  workflowId: string;
  versionName: string;
  type?: string;
  export?: string[];
  workflowOwnerId?: string;
}
export interface GetWorkflowVersionResponse {
  arn?: string;
  workflowId?: string;
  versionName?: string;
  accelerators?: string;
  creationTime?: Date;
  description?: string;
  definition?: string;
  digest?: string;
  engine?: string;
  main?: string;
  metadata?: { [key: string]: string | undefined };
  parameterTemplate?: { [key: string]: WorkflowParameter | undefined };
  status?: string;
  statusMessage?: string;
  storageType?: string;
  storageCapacity?: number;
  type?: string;
  tags?: { [key: string]: string | undefined };
  uuid?: string;
  workflowBucketOwnerId?: string;
  containerRegistryMap?: ContainerRegistryMap;
  readme?: string;
  definitionRepositoryDetails?: DefinitionRepositoryDetails;
  readmePath?: string;
  profiles?: string[];
  profileParameterTemplates?: {
    [key: string]: { [key: string]: WorkflowParameter | undefined } | undefined;
  };
}
export type ResourceIdentifier = string;
export type IdList = string[];
export interface ListAnnotationImportJobsFilter {
  status?: string;
  storeName?: string;
}
export interface ListAnnotationImportJobsRequest {
  maxResults?: number;
  ids?: string[];
  nextToken?: string;
  filter?: ListAnnotationImportJobsFilter;
}
export interface AnnotationImportJobItem {
  id: string;
  destinationName: string;
  versionName: string;
  roleArn: string;
  status: string;
  creationTime: Date;
  updateTime: Date;
  completionTime?: Date;
  runLeftNormalization?: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export type AnnotationImportJobItems = AnnotationImportJobItem[];
export interface ListAnnotationImportJobsResponse {
  annotationImportJobs?: AnnotationImportJobItem[];
  nextToken?: string;
}
export interface ListAnnotationStoresFilter {
  status?: string;
}
export interface ListAnnotationStoresRequest {
  ids?: string[];
  maxResults?: number;
  nextToken?: string;
  filter?: ListAnnotationStoresFilter;
}
export interface AnnotationStoreItem {
  id: string;
  reference: ReferenceItem;
  status: string;
  storeArn: string;
  name: string;
  storeFormat: string;
  description: string;
  sseConfig: SseConfig;
  creationTime: Date;
  updateTime: Date;
  statusMessage: string;
  storeSizeBytes: number;
}
export type AnnotationStoreItems = AnnotationStoreItem[];
export interface ListAnnotationStoresResponse {
  annotationStores?: AnnotationStoreItem[];
  nextToken?: string;
}
export interface ListAnnotationStoreVersionsFilter {
  status?: string;
}
export interface ListAnnotationStoreVersionsRequest {
  name: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ListAnnotationStoreVersionsFilter;
}
export interface AnnotationStoreVersionItem {
  storeId: string;
  id: string;
  status: string;
  versionArn: string;
  name: string;
  versionName: string;
  description: string;
  creationTime: Date;
  updateTime: Date;
  statusMessage: string;
  versionSizeBytes: number;
}
export type AnnotationStoreVersionItems = AnnotationStoreVersionItem[];
export interface ListAnnotationStoreVersionsResponse {
  annotationStoreVersions?: AnnotationStoreVersionItem[];
  nextToken?: string;
}
export type ListToken = string;
export interface ListBatchRequest {
  maxItems?: number;
  startingToken?: string;
  status?: string;
  name?: string;
  runGroupId?: string;
}
export interface BatchListItem {
  id?: string;
  name?: string;
  status?: string;
  createdAt?: Date;
  totalRuns?: number;
  workflowId?: string;
}
export type BatchList = BatchListItem[];
export interface ListBatchResponse {
  items?: BatchListItem[];
  nextToken?: string;
}
export type ConfigurationListToken = string;
export interface ListConfigurationsRequest {
  maxResults?: number;
  startingToken?: string;
}
export interface ConfigurationListItem {
  arn?: string;
  name?: string;
  description?: string;
  status?: string;
  creationTime?: Date;
}
export type ConfigurationList = ConfigurationListItem[];
export interface ListConfigurationsResponse {
  items?: ConfigurationListItem[];
  nextToken?: string;
}
export type NextToken = string;
export interface ListMultipartReadSetUploadsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface MultipartReadSetUploadListItem {
  sequenceStoreId: string;
  uploadId: string;
  sourceFileType: string;
  subjectId: string;
  sampleId: string;
  generatedFrom: string;
  referenceArn: string;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  creationTime: Date;
}
export type MultipartReadSetUploadList = MultipartReadSetUploadListItem[];
export interface ListMultipartReadSetUploadsResponse {
  nextToken?: string;
  uploads?: MultipartReadSetUploadListItem[];
}
export interface ActivateReadSetFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export interface ListReadSetActivationJobsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ActivateReadSetFilter;
}
export interface ActivateReadSetJobItem {
  id: string;
  sequenceStoreId: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export type ActivateReadSetJobList = ActivateReadSetJobItem[];
export interface ListReadSetActivationJobsResponse {
  nextToken?: string;
  activationJobs?: ActivateReadSetJobItem[];
}
export interface ExportReadSetFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export interface ListReadSetExportJobsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ExportReadSetFilter;
}
export interface ExportReadSetJobDetail {
  id: string;
  sequenceStoreId: string;
  destination: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export type ExportReadSetJobDetailList = ExportReadSetJobDetail[];
export interface ListReadSetExportJobsResponse {
  nextToken?: string;
  exportJobs?: ExportReadSetJobDetail[];
}
export interface ImportReadSetFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export interface ListReadSetImportJobsRequest {
  maxResults?: number;
  nextToken?: string;
  sequenceStoreId: string;
  filter?: ImportReadSetFilter;
}
export interface ImportReadSetJobItem {
  id: string;
  sequenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export type ImportReadSetJobList = ImportReadSetJobItem[];
export interface ListReadSetImportJobsResponse {
  nextToken?: string;
  importJobs?: ImportReadSetJobItem[];
}
export type ReferenceArnFilter = string;
export interface ReadSetFilter {
  name?: string;
  status?: string;
  referenceArn?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  sampleId?: string;
  subjectId?: string;
  generatedFrom?: string;
  creationType?: string;
}
export interface ListReadSetsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ReadSetFilter;
}
export interface ReadSetListItem {
  id: string;
  arn: string;
  sequenceStoreId: string;
  subjectId?: string;
  sampleId?: string;
  status: string;
  name?: string;
  description?: string;
  referenceArn?: string;
  fileType: string;
  sequenceInformation?: SequenceInformation;
  creationTime: Date;
  statusMessage?: string;
  creationType?: string;
  etag?: ETag;
}
export type ReadSetList = ReadSetListItem[];
export interface ListReadSetsResponse {
  nextToken?: string;
  readSets: ReadSetListItem[];
}
export interface ReadSetUploadPartListFilter {
  createdAfter?: Date;
  createdBefore?: Date;
}
export interface ListReadSetUploadPartsRequest {
  sequenceStoreId: string;
  uploadId: string;
  partSource: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ReadSetUploadPartListFilter;
}
export interface ReadSetUploadPartListItem {
  partNumber: number;
  partSize: number;
  partSource: string;
  checksum: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
}
export type ReadSetUploadPartList = ReadSetUploadPartListItem[];
export interface ListReadSetUploadPartsResponse {
  nextToken?: string;
  parts?: ReadSetUploadPartListItem[];
}
export interface ImportReferenceFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export interface ListReferenceImportJobsRequest {
  maxResults?: number;
  nextToken?: string;
  referenceStoreId: string;
  filter?: ImportReferenceFilter;
}
export interface ImportReferenceJobItem {
  id: string;
  referenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export type ImportReferenceJobList = ImportReferenceJobItem[];
export interface ListReferenceImportJobsResponse {
  nextToken?: string;
  importJobs?: ImportReferenceJobItem[];
}
export interface ReferenceFilter {
  name?: string;
  md5?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export interface ListReferencesRequest {
  referenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ReferenceFilter;
}
export interface ReferenceListItem {
  id: string;
  arn: string;
  referenceStoreId: string;
  md5: string;
  status?: string;
  name?: string;
  description?: string;
  creationTime: Date;
  updateTime: Date;
}
export type ReferenceList = ReferenceListItem[];
export interface ListReferencesResponse {
  nextToken?: string;
  references: ReferenceListItem[];
}
export interface ReferenceStoreFilter {
  name?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export interface ListReferenceStoresRequest {
  maxResults?: number;
  nextToken?: string;
  filter?: ReferenceStoreFilter;
}
export interface ReferenceStoreDetail {
  arn: string;
  id: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
}
export type ReferenceStoreDetailList = ReferenceStoreDetail[];
export interface ListReferenceStoresResponse {
  nextToken?: string;
  referenceStores: ReferenceStoreDetail[];
}
export interface ListRunCachesRequest {
  maxResults?: number;
  startingToken?: string;
}
export interface RunCacheListItem {
  arn?: string;
  cacheBehavior?: string;
  cacheS3Uri?: string;
  creationTime?: Date;
  id?: string;
  name?: string;
  status?: string;
}
export type RunCacheList = RunCacheListItem[];
export interface ListRunCachesResponse {
  items?: RunCacheListItem[];
  nextToken?: string;
}
export type RunGroupListToken = string;
export interface ListRunGroupsRequest {
  name?: string;
  startingToken?: string;
  maxResults?: number;
}
export interface RunGroupListItem {
  arn?: string;
  id?: string;
  name?: string;
  maxCpus?: number;
  maxRuns?: number;
  maxDuration?: number;
  creationTime?: Date;
  maxGpus?: number;
}
export type RunGroupList = RunGroupListItem[];
export interface ListRunGroupsResponse {
  items?: RunGroupListItem[];
  nextToken?: string;
}
export type RunListToken = string;
export interface ListRunsRequest {
  name?: string;
  runGroupId?: string;
  batchId?: string;
  startingToken?: string;
  maxResults?: number;
  status?: string;
}
export interface RunListItem {
  arn?: string;
  id?: string;
  status?: string;
  workflowId?: string;
  batchId?: string;
  name?: string;
  priority?: number;
  storageCapacity?: number;
  creationTime?: Date;
  startTime?: Date;
  stopTime?: Date;
  storageType?: string;
  workflowVersionName?: string;
  workflowName?: string;
}
export type RunList = RunListItem[];
export interface ListRunsResponse {
  items?: RunListItem[];
  nextToken?: string;
}
export type SubmissionStatus = string;
export interface ListRunsInBatchRequest {
  batchId: string;
  maxItems?: number;
  startingToken?: string;
  submissionStatus?: string;
  runSettingId?: string;
  runId?: string;
}
export type RunSettingId = string;
export type SubmissionFailureReason = string;
export type SubmissionFailureMessage = string;
export interface RunBatchListItem {
  runSettingId?: string;
  runId?: string;
  runInternalUuid?: string;
  runArn?: string;
  submissionStatus?: string;
  submissionFailureReason?: string;
  submissionFailureMessage?: string;
}
export type RunBatchList = RunBatchListItem[];
export interface ListRunsInBatchResponse {
  runs?: RunBatchListItem[];
  nextToken?: string;
}
export type TaskListToken = string;
export interface ListRunTasksRequest {
  id: string;
  status?: string;
  startingToken?: string;
  maxResults?: number;
}
export interface TaskListItem {
  taskId?: string;
  status?: string;
  name?: string;
  cpus?: number;
  cacheHit?: boolean;
  cacheS3Uri?: string;
  memory?: number;
  creationTime?: Date;
  startTime?: Date;
  stopTime?: Date;
  gpus?: number;
  instanceType?: string;
  uuid?: string;
}
export type TaskList = TaskListItem[];
export interface ListRunTasksResponse {
  items?: TaskListItem[];
  nextToken?: string;
}
export interface SequenceStoreFilter {
  name?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  status?: string;
  updatedAfter?: Date;
  updatedBefore?: Date;
}
export interface ListSequenceStoresRequest {
  maxResults?: number;
  nextToken?: string;
  filter?: SequenceStoreFilter;
}
export interface SequenceStoreDetail {
  arn: string;
  id: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
  fallbackLocation?: string;
  eTagAlgorithmFamily?: string;
  status?: string;
  statusMessage?: string;
  updateTime?: Date;
}
export type SequenceStoreDetailList = SequenceStoreDetail[];
export interface ListSequenceStoresResponse {
  nextToken?: string;
  sequenceStores: SequenceStoreDetail[];
}
export type ResourceOwner = string;
export type ArnList = string[];
export type StatusList = string[];
export type ShareResourceType = string;
export type TypeList = string[];
export interface Filter {
  resourceArns?: string[];
  status?: string[];
  type?: string[];
}
export interface ListSharesRequest {
  resourceOwner: string;
  filter?: Filter;
  nextToken?: string;
  maxResults?: number;
}
export type ShareDetailsList = ShareDetails[];
export interface ListSharesResponse {
  shares: ShareDetails[];
  nextToken?: string;
}
export type TagArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export interface ListVariantImportJobsFilter {
  status?: string;
  storeName?: string;
}
export interface ListVariantImportJobsRequest {
  maxResults?: number;
  ids?: string[];
  nextToken?: string;
  filter?: ListVariantImportJobsFilter;
}
export interface VariantImportJobItem {
  id: string;
  destinationName: string;
  roleArn: string;
  status: string;
  creationTime: Date;
  updateTime: Date;
  completionTime?: Date;
  runLeftNormalization?: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export type VariantImportJobItems = VariantImportJobItem[];
export interface ListVariantImportJobsResponse {
  variantImportJobs?: VariantImportJobItem[];
  nextToken?: string;
}
export interface ListVariantStoresFilter {
  status?: string;
}
export interface ListVariantStoresRequest {
  maxResults?: number;
  ids?: string[];
  nextToken?: string;
  filter?: ListVariantStoresFilter;
}
export interface VariantStoreItem {
  id: string;
  reference: ReferenceItem;
  status: string;
  storeArn: string;
  name: string;
  description: string;
  sseConfig: SseConfig;
  creationTime: Date;
  updateTime: Date;
  statusMessage: string;
  storeSizeBytes: number;
}
export type VariantStoreItems = VariantStoreItem[];
export interface ListVariantStoresResponse {
  variantStores?: VariantStoreItem[];
  nextToken?: string;
}
export type WorkflowListToken = string;
export interface ListWorkflowsRequest {
  type?: string;
  name?: string;
  startingToken?: string;
  maxResults?: number;
}
export interface WorkflowListItem {
  arn?: string;
  id?: string;
  name?: string;
  status?: string;
  type?: string;
  digest?: string;
  creationTime?: Date;
  metadata?: { [key: string]: string | undefined };
}
export type WorkflowList = WorkflowListItem[];
export interface ListWorkflowsResponse {
  items?: WorkflowListItem[];
  nextToken?: string;
}
export type WorkflowVersionListToken = string;
export interface ListWorkflowVersionsRequest {
  workflowId: string;
  type?: string;
  workflowOwnerId?: string;
  startingToken?: string;
  maxResults?: number;
}
export interface WorkflowVersionListItem {
  arn?: string;
  workflowId?: string;
  versionName?: string;
  description?: string;
  status?: string;
  type?: string;
  digest?: string;
  creationTime?: Date;
  metadata?: { [key: string]: string | undefined };
}
export type WorkflowVersionList = WorkflowVersionListItem[];
export interface ListWorkflowVersionsResponse {
  items?: WorkflowVersionListItem[];
  nextToken?: string;
}
export interface PutS3AccessPolicyRequest {
  s3AccessPointArn: string;
  s3AccessPolicy: string;
}
export interface PutS3AccessPolicyResponse {
  s3AccessPointArn?: string;
  storeId?: string;
  storeType?: StoreType;
}
export interface AnnotationImportItemSource {
  source: string;
}
export type AnnotationImportItemSources = AnnotationImportItemSource[];
export interface StartAnnotationImportRequest {
  destinationName: string;
  roleArn: string;
  items: AnnotationImportItemSource[];
  versionName?: string;
  formatOptions?: FormatOptions;
  runLeftNormalization?: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export interface StartAnnotationImportResponse {
  jobId: string;
}
export interface StartReadSetActivationJobSourceItem {
  readSetId: string;
}
export type StartReadSetActivationJobSourceList =
  StartReadSetActivationJobSourceItem[];
export interface StartReadSetActivationJobRequest {
  sequenceStoreId: string;
  clientToken?: string;
  sources: StartReadSetActivationJobSourceItem[];
}
export interface StartReadSetActivationJobResponse {
  id: string;
  sequenceStoreId: string;
  status: string;
  creationTime: Date;
}
export interface ExportReadSet {
  readSetId: string;
}
export type ExportReadSetList = ExportReadSet[];
export interface StartReadSetExportJobRequest {
  sequenceStoreId: string;
  destination: string;
  roleArn: string;
  clientToken?: string;
  sources: ExportReadSet[];
}
export interface StartReadSetExportJobResponse {
  id: string;
  sequenceStoreId: string;
  destination: string;
  status: string;
  creationTime: Date;
}
export interface StartReadSetImportJobSourceItem {
  sourceFiles: SourceFiles;
  sourceFileType: string;
  subjectId: string;
  sampleId: string;
  generatedFrom?: string;
  referenceArn?: string;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export type StartReadSetImportJobSourceList = StartReadSetImportJobSourceItem[];
export interface StartReadSetImportJobRequest {
  sequenceStoreId: string;
  roleArn: string;
  clientToken?: string;
  sources: StartReadSetImportJobSourceItem[];
}
export interface StartReadSetImportJobResponse {
  id: string;
  sequenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
}
export interface StartReferenceImportJobSourceItem {
  sourceFile: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export type StartReferenceImportJobSourceList =
  StartReferenceImportJobSourceItem[];
export interface StartReferenceImportJobRequest {
  referenceStoreId: string;
  roleArn: string;
  clientToken?: string;
  sources: StartReferenceImportJobSourceItem[];
}
export interface StartReferenceImportJobResponse {
  id: string;
  referenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
}
export type RunRequestId = string;
export interface StartRunRequest {
  workflowId?: string;
  workflowType?: string;
  runId?: string;
  roleArn: string;
  name?: string;
  cacheId?: string;
  cacheBehavior?: string;
  runGroupId?: string;
  priority?: number;
  parameters?: any;
  storageCapacity?: number;
  outputUri: string;
  logLevel?: string;
  tags?: { [key: string]: string | undefined };
  requestId: string;
  retentionMode?: string;
  storageType?: string;
  workflowOwnerId?: string;
  workflowVersionName?: string;
  networkingMode?: string;
  scratchStorageMode?: string;
  configurationName?: string;
  engineSettings?: any;
}
export interface StartRunResponse {
  arn?: string;
  id?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
  uuid?: string;
  runOutputUri?: string;
  configuration?: ConfigurationDetails;
  networkingMode?: string;
}
export type BatchRequestId = string;
export interface InlineSetting {
  runSettingId: string;
  name?: string;
  outputUri?: string;
  priority?: number;
  parameters?: any;
  outputBucketOwnerId?: string;
  runTags?: { [key: string]: string | undefined };
  engineSettings?: any;
}
export type InlineSettings = InlineSetting[];
export type S3UriSettings = string;
export type BatchRunSettings =
  | { inlineSettings: InlineSetting[]; s3UriSettings?: never }
  | { inlineSettings?: never; s3UriSettings: string };
export interface StartRunBatchRequest {
  batchName?: string;
  requestId: string;
  tags?: { [key: string]: string | undefined };
  defaultRunSetting: DefaultRunSetting;
  batchRunSettings: BatchRunSettings;
}
export interface StartRunBatchResponse {
  id?: string;
  arn?: string;
  status?: string;
  uuid?: string;
  tags?: { [key: string]: string | undefined };
}
export interface VariantImportItemSource {
  source: string;
}
export type VariantImportItemSources = VariantImportItemSource[];
export interface StartVariantImportRequest {
  destinationName: string;
  roleArn: string;
  items: VariantImportItemSource[];
  runLeftNormalization?: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export interface StartVariantImportResponse {
  jobId: string;
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
export interface UpdateAnnotationStoreRequest {
  name: string;
  description?: string;
}
export interface UpdateAnnotationStoreResponse {
  id: string;
  reference: ReferenceItem;
  status: string;
  name: string;
  description: string;
  creationTime: Date;
  updateTime: Date;
  storeOptions?: StoreOptions;
  storeFormat?: string;
}
export interface UpdateAnnotationStoreVersionRequest {
  name: string;
  versionName: string;
  description?: string;
}
export interface UpdateAnnotationStoreVersionResponse {
  storeId: string;
  id: string;
  status: string;
  name: string;
  versionName: string;
  description: string;
  creationTime: Date;
  updateTime: Date;
}
export interface UpdateRunCacheRequest {
  cacheBehavior?: string;
  description?: string;
  id: string;
  name?: string;
}
export interface UpdateRunCacheResponse {}
export interface UpdateRunGroupRequest {
  id: string;
  name?: string;
  maxCpus?: number;
  maxRuns?: number;
  maxDuration?: number;
  maxGpus?: number;
}
export interface UpdateRunGroupResponse {}
export interface UpdateSequenceStoreRequest {
  id: string;
  name?: string;
  description?: string;
  clientToken?: string;
  fallbackLocation?: string;
  propagatedSetLevelTags?: string[];
  s3AccessConfig?: S3AccessConfig;
}
export interface UpdateSequenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
  updateTime?: Date;
  propagatedSetLevelTags?: string[];
  status?: string;
  statusMessage?: string;
  fallbackLocation?: string;
  s3Access?: SequenceStoreS3Access;
  eTagAlgorithmFamily?: string;
}
export interface UpdateVariantStoreRequest {
  name: string;
  description?: string;
}
export interface UpdateVariantStoreResponse {
  id: string;
  reference: ReferenceItem;
  status: string;
  name: string;
  description: string;
  creationTime: Date;
  updateTime: Date;
}
export interface UpdateWorkflowRequest {
  id: string;
  name?: string;
  description?: string;
  storageType?: string;
  storageCapacity?: number;
  readmeMarkdown?: string;
}
export interface UpdateWorkflowResponse {}
export interface UpdateWorkflowVersionRequest {
  workflowId: string;
  versionName: string;
  description?: string;
  storageType?: string;
  storageCapacity?: number;
  readmeMarkdown?: string;
}
export interface UpdateWorkflowVersionResponse {}
export interface UploadReadSetPartRequest {
  sequenceStoreId: string;
  uploadId: string;
  partSource: string;
  partNumber: number;
  payload: T.StreamingInputBody;
}
export interface UploadReadSetPartResponse {
  checksum: string;
}
export type AbortMultipartReadSetUploadError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a multipart read set upload into a sequence store and returns a response with no body if the operation is successful. To confirm that a multipart read set upload has been stopped, use the `ListMultipartReadSetUploads` API operation to view all active multipart read set uploads.
 */
export const abortMultipartReadSetUpload: API.OperationMethod<
  AbortMultipartReadSetUploadRequest,
  AbortMultipartReadSetUploadResponse,
  AbortMultipartReadSetUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sequencestore/{sequenceStoreId}/upload/{uploadId}/abort",
    input: { sequenceStoreId: 0, uploadId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AbortMultipartReadSetUpload",
  endpointHostPrefix: "control-storage-",
})) as any;

export type AcceptShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accept a resource share request.
 */
export const acceptShare: API.OperationMethod<
  AcceptShareRequest,
  AcceptShareResponse,
  AcceptShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /share/{shareId}",
    input: { shareId: 0 },
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
  operationName: "AcceptShare",
  endpointHostPrefix: "analytics-",
})) as any;

export type BatchDeleteReadSetError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes one or more read sets. If the operation is successful, it returns a response with no body. If there is an error with deleting one of the read sets, the operation returns an error list. If the operation successfully deletes only a subset of files, it will return an error list for the remaining files that fail to be deleted. There is a limit of 100 read sets that can be deleted in each `BatchDeleteReadSet` API call.
 */
export const batchDeleteReadSet: API.OperationMethod<
  BatchDeleteReadSetRequest,
  BatchDeleteReadSetResponse,
  BatchDeleteReadSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/readset/batch/delete",
    input: { ids: 0, sequenceStoreId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteReadSet",
  endpointHostPrefix: "control-storage-",
})) as any;

export type CancelAnnotationImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Cancels an annotation import job.
 */
export const cancelAnnotationImportJob: API.OperationMethod<
  CancelAnnotationImportRequest,
  CancelAnnotationImportResponse,
  CancelAnnotationImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /import/annotation/{jobId}",
    input: { jobId: 0 },
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
  operationName: "CancelAnnotationImportJob",
  endpointHostPrefix: "analytics-",
})) as any;

export type CancelRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a run using its ID and returns a response with no body if the operation is successful. To confirm that the run has been cancelled, use the `ListRuns` API operation to check that it is no longer listed.
 */
export const cancelRun: API.OperationMethod<
  CancelRunRequest,
  CancelRunResponse,
  CancelRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /run/{id}/cancel", input: { id: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelRun",
  endpointHostPrefix: "workflows-",
})) as any;

export type CancelRunBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels all runs within a specified batch. This operation prevents not-yet-submitted runs from starting and submits `CancelRun` requests for runs that have already started.
 *
 * Cancel is only allowed on batches in `PENDING`, `SUBMITTING`, or `INPROGRESS` state. Cancel operations are non-atomic and may be partially successful. Use `GetBatch` to review `successfulCancelSubmissionCount` and `failedCancelSubmissionCount` in the `submissionSummary`. Only one cancel or delete operation per batch is allowed at a time.
 */
export const cancelRunBatch: API.OperationMethod<
  CancelRunBatchRequest,
  CancelRunBatchResponse,
  CancelRunBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /runBatch/cancel",
    input: { batchId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelRunBatch",
  endpointHostPrefix: "workflows-",
})) as any;

export type CancelVariantImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Cancels a variant import job.
 */
export const cancelVariantImportJob: API.OperationMethod<
  CancelVariantImportRequest,
  CancelVariantImportResponse,
  CancelVariantImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /import/variant/{jobId}",
    input: { jobId: 0 },
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
  operationName: "CancelVariantImportJob",
  endpointHostPrefix: "analytics-",
})) as any;

export type CompleteMultipartReadSetUploadError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Completes a multipart read set upload into a sequence store after you have initiated the upload process with `CreateMultipartReadSetUpload` and uploaded all read set parts using `UploadReadSetPart`. You must specify the parts you uploaded using the parts parameter. If the operation is successful, it returns the read set ID(s) of the uploaded read set(s).
 *
 * For more information, see Direct upload to a sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const completeMultipartReadSetUpload: API.OperationMethod<
  CompleteMultipartReadSetUploadRequest,
  CompleteMultipartReadSetUploadResponse,
  CompleteMultipartReadSetUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/upload/{uploadId}/complete",
    input: {
      sequenceStoreId: 0,
      uploadId: 0,
      parts: D.list({ partNumber: 0, partSource: 0, checksum: 0 }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteMultipartReadSetUpload",
  endpointHostPrefix: "storage-",
})) as any;

export type CreateAnnotationStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Creates an annotation store.
 */
export const createAnnotationStore: API.OperationMethod<
  CreateAnnotationStoreRequest,
  CreateAnnotationStoreResponse,
  CreateAnnotationStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /annotationStore",
    input: {
      reference: i_ReferenceItem,
      name: 0,
      description: 0,
      tags: 0,
      versionName: 0,
      sseConfig: i_SseConfig,
      storeFormat: 0,
      storeOptions: {
        tsvStoreOptions: { annotationType: 0, formatToHeader: 0, schema: 0 },
      },
    },
    output: { creationTime: D.ts },
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
  operationName: "CreateAnnotationStore",
  endpointHostPrefix: "analytics-",
})) as any;

export type CreateAnnotationStoreVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version of an annotation store.
 */
export const createAnnotationStoreVersion: API.OperationMethod<
  CreateAnnotationStoreVersionRequest,
  CreateAnnotationStoreVersionResponse,
  CreateAnnotationStoreVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /annotationStore/{name}/version",
    input: {
      name: 0,
      versionName: 0,
      description: 0,
      versionOptions: {
        tsvVersionOptions: { annotationType: 0, formatToHeader: 0, schema: 0 },
      },
      tags: 0,
    },
    output: { creationTime: D.ts },
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
  operationName: "CreateAnnotationStoreVersion",
  endpointHostPrefix: "analytics-",
})) as any;

export type CreateConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new configuration.
 */
export const createConfiguration: API.OperationMethod<
  CreateConfigurationRequest,
  CreateConfigurationResponse,
  CreateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configuration",
    input: {
      name: 0,
      description: 0,
      runConfigurations: { vpcConfig: { securityGroupIds: 0, subnetIds: 0 } },
      tags: 0,
      requestId: D.m({ idempotency: true }),
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguration",
  endpointHostPrefix: "workflows-",
})) as any;

export type CreateMultipartReadSetUploadError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a multipart read set upload for uploading partitioned source files into a sequence store. You can directly import source files from an EC2 instance and other local compute, or from an S3 bucket. To separate these source files into parts, use the `split` operation. Each part cannot be larger than 100 MB. If the operation is successful, it provides an `uploadId` which is required by the `UploadReadSetPart` API operation to upload parts into a sequence store.
 *
 * To continue uploading a multipart read set into your sequence store, you must use the `UploadReadSetPart` API operation to upload each part individually following the steps below:
 *
 * - Specify the `uploadId` obtained from the previous call to `CreateMultipartReadSetUpload`.
 *
 * - Upload parts for that `uploadId`.
 *
 * When you have finished uploading parts, use the `CompleteMultipartReadSetUpload` API to complete the multipart read set upload and to retrieve the final read set IDs in the response.
 *
 * To learn more about creating parts and the `split` operation, see Direct upload to a sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createMultipartReadSetUpload: API.OperationMethod<
  CreateMultipartReadSetUploadRequest,
  CreateMultipartReadSetUploadResponse,
  CreateMultipartReadSetUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/upload",
    input: {
      sequenceStoreId: 0,
      clientToken: 0,
      sourceFileType: 0,
      subjectId: 0,
      sampleId: 0,
      generatedFrom: 0,
      referenceArn: 0,
      name: 0,
      description: 0,
      tags: 0,
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultipartReadSetUpload",
  endpointHostPrefix: "control-storage-",
})) as any;

export type CreateReferenceStoreError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a reference store and returns metadata in JSON format. Reference stores are used to store reference genomes in FASTA format. A reference store is created when the first reference genome is imported. To import additional reference genomes from an Amazon S3 bucket, use the `StartReferenceImportJob` API operation.
 *
 * For more information, see Creating a HealthOmics reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createReferenceStore: API.OperationMethod<
  CreateReferenceStoreRequest,
  CreateReferenceStoreResponse,
  CreateReferenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /referencestore",
    input: {
      name: 0,
      description: 0,
      sseConfig: i_SseConfig,
      tags: 0,
      clientToken: 0,
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReferenceStore",
  endpointHostPrefix: "control-storage-",
})) as any;

export type CreateRunCacheError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a run cache to store and reference task outputs from completed private runs. Specify an Amazon S3 location where Amazon Web Services HealthOmics saves the cached data. This data must be immediately accessible and not in an archived state. You can save intermediate task files to a run cache if they are declared as task outputs in the workflow definition file.
 *
 * For more information, see Call caching and Creating a run cache in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createRunCache: API.OperationMethod<
  CreateRunCacheRequest,
  CreateRunCacheResponse,
  CreateRunCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /runCache",
    input: {
      cacheBehavior: 0,
      cacheS3Location: 0,
      description: 0,
      name: 0,
      requestId: D.m({ idempotency: true }),
      tags: 0,
      cacheBucketOwnerId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRunCache",
  endpointHostPrefix: "workflows-",
})) as any;

export type CreateRunGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a run group to limit the compute resources for the runs that are added to the group. Returns an ARN, ID, and tags for the run group.
 */
export const createRunGroup: API.OperationMethod<
  CreateRunGroupRequest,
  CreateRunGroupResponse,
  CreateRunGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /runGroup",
    input: {
      name: 0,
      maxCpus: 0,
      maxRuns: 0,
      maxDuration: 0,
      tags: 0,
      requestId: D.m({ idempotency: true }),
      maxGpus: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRunGroup",
  endpointHostPrefix: "workflows-",
})) as any;

export type CreateSequenceStoreError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a sequence store and returns its metadata. Sequence stores are used to store sequence data files called read sets that are saved in FASTQ, BAM, uBAM, or CRAM formats. For aligned formats (BAM and CRAM), a sequence store can only use one reference genome. For unaligned formats (FASTQ and uBAM), a reference genome is not required. You can create multiple sequence stores per region per account.
 *
 * The following are optional parameters you can specify for your sequence store:
 *
 * - Use `s3AccessConfig` to configure your sequence store with S3 access logs (recommended).
 *
 * - Use `sseConfig` to define your own KMS key for encryption.
 *
 * - Use `eTagAlgorithmFamily` to define which algorithm to use for the HealthOmics eTag on objects.
 *
 * - Use `fallbackLocation` to define a backup location for storing files that have failed a direct upload.
 *
 * - Use `propagatedSetLevelTags` to configure tags that propagate to all objects in your store.
 *
 * For more information, see Creating a HealthOmics sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createSequenceStore: API.OperationMethod<
  CreateSequenceStoreRequest,
  CreateSequenceStoreResponse,
  CreateSequenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore",
    input: {
      name: 0,
      description: 0,
      sseConfig: i_SseConfig,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
      fallbackLocation: 0,
      eTagAlgorithmFamily: 0,
      propagatedSetLevelTags: 0,
      s3AccessConfig: i_S3AccessConfig,
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSequenceStore",
  endpointHostPrefix: "control-storage-",
})) as any;

export type CreateShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a cross-account shared resource. The resource owner makes an offer to share the resource with the principal subscriber (an AWS user with a different account than the resource owner).
 *
 * The following resources support cross-account sharing:
 *
 * - HealthOmics variant stores
 *
 * - HealthOmics annotation stores
 *
 * - Private workflows
 */
export const createShare: API.OperationMethod<
  CreateShareRequest,
  CreateShareResponse,
  CreateShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /share",
    input: { resourceArn: 0, principalSubscriber: 0, shareName: 0 },
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
  operationName: "CreateShare",
  endpointHostPrefix: "analytics-",
})) as any;

export type CreateVariantStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Creates a variant store.
 */
export const createVariantStore: API.OperationMethod<
  CreateVariantStoreRequest,
  CreateVariantStoreResponse,
  CreateVariantStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /variantStore",
    input: {
      reference: i_ReferenceItem,
      name: 0,
      description: 0,
      tags: 0,
      sseConfig: i_SseConfig,
    },
    output: { creationTime: D.ts },
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
  operationName: "CreateVariantStore",
  endpointHostPrefix: "analytics-",
})) as any;

export type CreateWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a private workflow. Before you create a private workflow, you must create and configure these required resources:
 *
 * - *Workflow definition file:* A workflow definition file written in WDL, Nextflow, or CWL. The workflow definition specifies the inputs and outputs for runs that use the workflow. It also includes specifications for the runs and run tasks for your workflow, including compute and memory requirements. The workflow definition file must be in `.zip` format. For more information, see Workflow definition files in Amazon Web Services HealthOmics.
 *
 * - You can use Amazon Q CLI to build and validate your workflow definition files in WDL, Nextflow, and CWL. For more information, see Example prompts for Amazon Q CLI and the Amazon Web Services HealthOmics Agentic generative AI tutorial on GitHub.
 *
 * - *(Optional) Parameter template file:* A parameter template file written in JSON. Create the file to define the run parameters, or Amazon Web Services HealthOmics generates the parameter template for you. For more information, see Parameter template files for HealthOmics workflows.
 *
 * - *ECR container images:* Create container images for the workflow in a private ECR repository, or synchronize images from a supported upstream registry with your Amazon ECR private repository.
 *
 * - *(Optional) Sentieon licenses:* Request a Sentieon license to use the Sentieon software in private workflows.
 *
 * For more information, see Creating or updating a private workflow in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createWorkflow: API.OperationMethod<
  CreateWorkflowRequest,
  CreateWorkflowResponse,
  CreateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workflow",
    input: {
      name: 0,
      description: 0,
      engine: 0,
      definitionZip: 0,
      definitionUri: 0,
      main: 0,
      parameterTemplate: D.map(i_WorkflowParameter),
      storageCapacity: 0,
      tags: 0,
      requestId: D.m({ idempotency: true }),
      accelerators: 0,
      storageType: 0,
      containerRegistryMap: i_ContainerRegistryMap,
      containerRegistryMapUri: 0,
      readmeMarkdown: 0,
      parameterTemplatePath: 0,
      readmePath: 0,
      definitionRepository: i_DefinitionRepository,
      workflowBucketOwnerId: 0,
      readmeUri: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflow",
  endpointHostPrefix: "workflows-",
})) as any;

export type CreateWorkflowVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new workflow version for the workflow that you specify with the `workflowId` parameter.
 *
 * When you create a new version of a workflow, you need to specify the configuration for the new version. It doesn't inherit any configuration values from the workflow.
 *
 * Provide a version name that is unique for this workflow. You cannot change the name after HealthOmics creates the version.
 *
 * Don't include any personally identifiable information (PII) in the version name. Version names appear in the workflow version ARN.
 *
 * For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createWorkflowVersion: API.OperationMethod<
  CreateWorkflowVersionRequest,
  CreateWorkflowVersionResponse,
  CreateWorkflowVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workflow/{workflowId}/version",
    input: {
      workflowId: 0,
      versionName: 0,
      definitionZip: 0,
      definitionUri: 0,
      accelerators: 0,
      description: 0,
      engine: 0,
      main: 0,
      parameterTemplate: D.map(i_WorkflowParameter),
      requestId: D.m({ idempotency: true }),
      storageType: 0,
      storageCapacity: 0,
      tags: 0,
      workflowBucketOwnerId: 0,
      containerRegistryMap: i_ContainerRegistryMap,
      containerRegistryMapUri: 0,
      readmeMarkdown: 0,
      parameterTemplatePath: 0,
      readmePath: 0,
      definitionRepository: i_DefinitionRepository,
      readmeUri: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflowVersion",
  endpointHostPrefix: "workflows-",
})) as any;

export type DeleteAnnotationStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Deletes an annotation store.
 */
export const deleteAnnotationStore: API.OperationMethod<
  DeleteAnnotationStoreRequest,
  DeleteAnnotationStoreResponse,
  DeleteAnnotationStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /annotationStore/{name}",
    input: { name: 0, force: D.m({ query: "force" }) },
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
  operationName: "DeleteAnnotationStore",
  endpointHostPrefix: "analytics-",
})) as any;

export type DeleteAnnotationStoreVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes one or multiple versions of an annotation store.
 */
export const deleteAnnotationStoreVersions: API.OperationMethod<
  DeleteAnnotationStoreVersionsRequest,
  DeleteAnnotationStoreVersionsResponse,
  DeleteAnnotationStoreVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /annotationStore/{name}/versions/delete",
    input: { name: 0, versions: 0, force: D.m({ query: "force" }) },
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
  operationName: "DeleteAnnotationStoreVersions",
  endpointHostPrefix: "analytics-",
})) as any;

export type DeleteBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a run batch resource and its associated metadata. This operation does not delete the individual workflow runs. To delete the runs, call `DeleteRunBatch` before calling `DeleteBatch`.
 *
 * `DeleteBatch` requires the batch to be in a terminal state: `PROCESSED`, `FAILED`, `CANCELLED`, or `RUNS_DELETED`. After `DeleteBatch` completes, the batch metadata is no longer accessible. You cannot call `GetBatch`, `ListRunsInBatch`, `DeleteRunBatch`, or `CancelRunBatch` on a deleted batch.
 */
export const deleteBatch: API.OperationMethod<
  DeleteBatchRequest,
  DeleteBatchResponse,
  DeleteBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /runBatch/{batchId}",
    input: { batchId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatch",
  endpointHostPrefix: "workflows-",
})) as any;

export type DeleteConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an existing configuration.
 */
export const deleteConfiguration: API.OperationMethod<
  DeleteConfigurationRequest,
  DeleteConfigurationResponse,
  DeleteConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /configuration/{name}",
    input: { name: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguration",
  endpointHostPrefix: "workflows-",
})) as any;

export type DeleteReferenceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a reference genome and returns a response with no body if the operation is successful. The read set associated with the reference genome must first be deleted before deleting the reference genome. After the reference genome is deleted, you can delete the reference store using the `DeleteReferenceStore` API operation.
 *
 * For more information, see Deleting HealthOmics reference and sequence stores in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteReference: API.OperationMethod<
  DeleteReferenceRequest,
  DeleteReferenceResponse,
  DeleteReferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /referencestore/{referenceStoreId}/reference/{id}",
    input: { id: 0, referenceStoreId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReference",
  endpointHostPrefix: "control-storage-",
})) as any;

export type DeleteReferenceStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a reference store and returns a response with no body if the operation is successful. You can only delete a reference store when it does not contain any reference genomes. To empty a reference store, use `DeleteReference`.
 *
 * For more information about your workflow status, see Deleting HealthOmics reference and sequence stores in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteReferenceStore: API.OperationMethod<
  DeleteReferenceStoreRequest,
  DeleteReferenceStoreResponse,
  DeleteReferenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /referencestore/{id}",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReferenceStore",
  endpointHostPrefix: "control-storage-",
})) as any;

export type DeleteRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a run and returns a response with no body if the operation is successful. You can only delete a run that has reached a `COMPLETED`, `FAILED`, or `CANCELLED` stage. A completed run has delivered an output, or was cancelled and resulted in no output. When you delete a run, only the metadata associated with the run is deleted. The run outputs remain in Amazon S3 and logs remain in CloudWatch.
 *
 * To verify that the workflow is deleted:
 *
 * - Use `ListRuns` to confirm the workflow no longer appears in the list.
 *
 * - Use `GetRun` to verify the workflow cannot be found.
 */
export const deleteRun: API.OperationMethod<
  DeleteRunRequest,
  DeleteRunResponse,
  DeleteRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /run/{id}", input: { id: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRun",
  endpointHostPrefix: "workflows-",
})) as any;

export type DeleteRunBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the individual workflow runs within a batch. This operation is separate from `DeleteBatch`, which removes the batch metadata.
 *
 * Delete is only allowed on batches in `PROCESSED` or `CANCELLED` state. Delete operations are non-atomic and may be partially successful. Use `GetBatch` to review `successfulDeleteSubmissionCount` and `failedDeleteSubmissionCount` in the `submissionSummary`. Only one cancel or delete operation per batch is allowed at a time.
 */
export const deleteRunBatch: API.OperationMethod<
  DeleteRunBatchRequest,
  DeleteRunBatchResponse,
  DeleteRunBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /runBatch/delete",
    input: { batchId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRunBatch",
  endpointHostPrefix: "workflows-",
})) as any;

export type DeleteRunCacheError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a run cache and returns a response with no body if the operation is successful. This action removes the cache metadata stored in the service account, but does not delete the data in Amazon S3. You can access the cache data in Amazon S3, for inspection or to troubleshoot issues. You can remove old cache data using standard S3 `Delete` operations.
 *
 * For more information, see Deleting a run cache in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteRunCache: API.OperationMethod<
  DeleteRunCacheRequest,
  DeleteRunCacheResponse,
  DeleteRunCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /runCache/{id}", input: { id: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRunCache",
  endpointHostPrefix: "workflows-",
})) as any;

export type DeleteRunGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a run group and returns a response with no body if the operation is successful.
 *
 * To verify that the run group is deleted:
 *
 * - Use `ListRunGroups` to confirm the workflow no longer appears in the list.
 *
 * - Use `GetRunGroup` to verify the workflow cannot be found.
 */
export const deleteRunGroup: API.OperationMethod<
  DeleteRunGroupRequest,
  DeleteRunGroupResponse,
  DeleteRunGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /runGroup/{id}", input: { id: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRunGroup",
  endpointHostPrefix: "workflows-",
})) as any;

export type DeleteS3AccessPolicyError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an access policy for the specified store.
 */
export const deleteS3AccessPolicy: API.OperationMethod<
  DeleteS3AccessPolicyRequest,
  DeleteS3AccessPolicyResponse,
  DeleteS3AccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /s3accesspolicy/{s3AccessPointArn}",
    input: { s3AccessPointArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteS3AccessPolicy",
  endpointHostPrefix: "control-storage-",
})) as any;

export type DeleteSequenceStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a sequence store and returns a response with no body if the operation is successful. You can only delete a sequence store when it does not contain any read sets.
 *
 * Use the `BatchDeleteReadSet` API operation to ensure that all read sets in the sequence store are deleted. When a sequence store is deleted, all tags associated with the store are also deleted.
 *
 * For more information, see Deleting HealthOmics reference and sequence stores in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteSequenceStore: API.OperationMethod<
  DeleteSequenceStoreRequest,
  DeleteSequenceStoreResponse,
  DeleteSequenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sequencestore/{id}",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSequenceStore",
  endpointHostPrefix: "control-storage-",
})) as any;

export type DeleteShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource share. If you are the resource owner, the subscriber will no longer have access to the shared resource. If you are the subscriber, this operation deletes your access to the share.
 */
export const deleteShare: API.OperationMethod<
  DeleteShareRequest,
  DeleteShareResponse,
  DeleteShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /share/{shareId}",
    input: { shareId: 0 },
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
  operationName: "DeleteShare",
  endpointHostPrefix: "analytics-",
})) as any;

export type DeleteVariantStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Deletes a variant store.
 */
export const deleteVariantStore: API.OperationMethod<
  DeleteVariantStoreRequest,
  DeleteVariantStoreResponse,
  DeleteVariantStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /variantStore/{name}",
    input: { name: 0, force: D.m({ query: "force" }) },
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
  operationName: "DeleteVariantStore",
  endpointHostPrefix: "analytics-",
})) as any;

export type DeleteWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workflow by specifying its ID. This operation returns a response with no body if the deletion is successful.
 *
 * To verify that the workflow is deleted:
 *
 * - Use `ListWorkflows` to confirm the workflow no longer appears in the list.
 *
 * - Use `GetWorkflow` to verify the workflow cannot be found.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /workflow/{id}", input: { id: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflow",
  endpointHostPrefix: "workflows-",
})) as any;

export type DeleteWorkflowVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workflow version. Deleting a workflow version doesn't affect any ongoing runs that are using the workflow version.
 *
 * For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteWorkflowVersion: API.OperationMethod<
  DeleteWorkflowVersionRequest,
  DeleteWorkflowVersionResponse,
  DeleteWorkflowVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workflow/{workflowId}/version/{versionName}",
    input: { workflowId: 0, versionName: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflowVersion",
  endpointHostPrefix: "workflows-",
})) as any;

export type GetAnnotationImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about an annotation import job.
 */
export const getAnnotationImportJob: API.OperationMethod<
  GetAnnotationImportRequest,
  GetAnnotationImportResponse,
  GetAnnotationImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /import/annotation/{jobId}",
    input: { jobId: 0 },
    output: { creationTime: D.ts, updateTime: D.ts, completionTime: D.ts },
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
  operationName: "GetAnnotationImportJob",
  endpointHostPrefix: "analytics-",
})) as any;

export type GetAnnotationStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about an annotation store.
 */
export const getAnnotationStore: API.OperationMethod<
  GetAnnotationStoreRequest,
  GetAnnotationStoreResponse,
  GetAnnotationStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /annotationStore/{name}",
    input: { name: 0 },
    output: { creationTime: D.ts, updateTime: D.ts },
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
  operationName: "GetAnnotationStore",
  endpointHostPrefix: "analytics-",
})) as any;

export type GetAnnotationStoreVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata for an annotation store version.
 */
export const getAnnotationStoreVersion: API.OperationMethod<
  GetAnnotationStoreVersionRequest,
  GetAnnotationStoreVersionResponse,
  GetAnnotationStoreVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /annotationStore/{name}/version/{versionName}",
    input: { name: 0, versionName: 0 },
    output: { creationTime: D.ts, updateTime: D.ts },
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
  operationName: "GetAnnotationStoreVersion",
  endpointHostPrefix: "analytics-",
})) as any;

export type GetBatchError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details and current status for a specific run batch, including submission progress and run execution counts.
 */
export const getBatch: API.OperationMethod<
  GetBatchRequest,
  GetBatchResponse,
  GetBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /runBatch/{batchId}",
    input: { batchId: 0 },
    output: {
      creationTime: D.ts,
      submittedTime: D.ts,
      processedTime: D.ts,
      failedTime: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBatch",
  endpointHostPrefix: "workflows-",
})) as any;

export type GetConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve configuration details for specified name.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  GetConfigurationResponse,
  GetConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /configuration/{name}",
    input: { name: 0 },
    output: { creationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguration",
  endpointHostPrefix: "workflows-",
})) as any;

export type GetReadSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RangeNotSatisfiableException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information from parts of a read set and returns the read set in the same format that it was uploaded. You must have read sets uploaded to your sequence store in order to run this operation.
 */
export const getReadSet: API.OperationMethod<
  GetReadSetRequest,
  GetReadSetResponse,
  GetReadSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sequencestore/{sequenceStoreId}/readset/{id}",
    input: {
      id: 0,
      sequenceStoreId: 0,
      file: D.m({ query: "file" }),
      partNumber: D.m({ query: "partNumber" }),
    },
    output: { payload: D.m({ payload: true, shape: D.stream }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RangeNotSatisfiableException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadSet",
  endpointHostPrefix: "storage-",
})) as any;

export type GetReadSetActivationJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed information about the status of a read set activation job in JSON format.
 */
export const getReadSetActivationJob: API.OperationMethod<
  GetReadSetActivationJobRequest,
  GetReadSetActivationJobResponse,
  GetReadSetActivationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sequencestore/{sequenceStoreId}/activationjob/{id}",
    input: { id: 0, sequenceStoreId: 0 },
    output: { creationTime: D.ts, completionTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadSetActivationJob",
  endpointHostPrefix: "control-storage-",
})) as any;

export type GetReadSetExportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves status information about a read set export job and returns the data in JSON format. Use this operation to actively monitor the progress of an export job.
 */
export const getReadSetExportJob: API.OperationMethod<
  GetReadSetExportJobRequest,
  GetReadSetExportJobResponse,
  GetReadSetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sequencestore/{sequenceStoreId}/exportjob/{id}",
    input: { sequenceStoreId: 0, id: 0 },
    output: { creationTime: D.ts, completionTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadSetExportJob",
  endpointHostPrefix: "control-storage-",
})) as any;

export type GetReadSetImportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed and status information about a read set import job and returns the data in JSON format.
 */
export const getReadSetImportJob: API.OperationMethod<
  GetReadSetImportJobRequest,
  GetReadSetImportJobResponse,
  GetReadSetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sequencestore/{sequenceStoreId}/importjob/{id}",
    input: { id: 0, sequenceStoreId: 0 },
    output: { creationTime: D.ts, completionTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadSetImportJob",
  endpointHostPrefix: "control-storage-",
})) as any;

export type GetReadSetMetadataError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata for a read set from a sequence store in JSON format. This operation does not return tags. To retrieve the list of tags for a read set, use the `ListTagsForResource` API operation.
 */
export const getReadSetMetadata: API.OperationMethod<
  GetReadSetMetadataRequest,
  GetReadSetMetadataResponse,
  GetReadSetMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sequencestore/{sequenceStoreId}/readset/{id}/metadata",
    input: { id: 0, sequenceStoreId: 0 },
    output: { creationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadSetMetadata",
  endpointHostPrefix: "control-storage-",
})) as any;

export type GetReferenceError =
  | AccessDeniedException
  | InternalServerException
  | RangeNotSatisfiableException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Downloads parts of data from a reference genome and returns the reference file in the same format that it was uploaded.
 *
 * For more information, see Creating a HealthOmics reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getReference: API.OperationMethod<
  GetReferenceRequest,
  GetReferenceResponse,
  GetReferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /referencestore/{referenceStoreId}/reference/{id}",
    input: {
      id: 0,
      referenceStoreId: 0,
      range: D.m({ header: "Range" }),
      partNumber: D.m({ query: "partNumber" }),
      file: D.m({ query: "file" }),
    },
    output: { payload: D.m({ payload: true, shape: D.stream }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RangeNotSatisfiableException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReference",
  endpointHostPrefix: "storage-",
})) as any;

export type GetReferenceImportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Monitors the status of a reference import job. This operation can be called after calling the `StartReferenceImportJob` operation.
 */
export const getReferenceImportJob: API.OperationMethod<
  GetReferenceImportJobRequest,
  GetReferenceImportJobResponse,
  GetReferenceImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /referencestore/{referenceStoreId}/importjob/{id}",
    input: { id: 0, referenceStoreId: 0 },
    output: { creationTime: D.ts, completionTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReferenceImportJob",
  endpointHostPrefix: "control-storage-",
})) as any;

export type GetReferenceMetadataError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata for a reference genome. This operation returns the number of parts, part size, and MD5 of an entire file. This operation does not return tags. To retrieve the list of tags for a read set, use the `ListTagsForResource` API operation.
 */
export const getReferenceMetadata: API.OperationMethod<
  GetReferenceMetadataRequest,
  GetReferenceMetadataResponse,
  GetReferenceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /referencestore/{referenceStoreId}/reference/{id}/metadata",
    input: { id: 0, referenceStoreId: 0 },
    output: { creationTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReferenceMetadata",
  endpointHostPrefix: "control-storage-",
})) as any;

export type GetReferenceStoreError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a reference store.
 */
export const getReferenceStore: API.OperationMethod<
  GetReferenceStoreRequest,
  GetReferenceStoreResponse,
  GetReferenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /referencestore/{id}",
    input: { id: 0 },
    output: { creationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReferenceStore",
  endpointHostPrefix: "control-storage-",
})) as any;

export type GetRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed information about a specific run using its ID.
 *
 * Amazon Web Services HealthOmics stores a configurable number of runs, as determined by service limits, that are available to the console and API. If `GetRun` does not return the requested run, you can find all run logs in the CloudWatch logs. For more information about viewing the run logs, see CloudWatch logs in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getRun: API.OperationMethod<
  GetRunRequest,
  GetRunResponse,
  GetRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /run/{id}",
    input: { id: 0, export: D.m({ query: "export" }) },
    output: { creationTime: D.ts, startTime: D.ts, stopTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRun",
  endpointHostPrefix: "workflows-",
})) as any;

export type GetRunCacheError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about the specified run cache using its ID.
 *
 * For more information, see Call caching for Amazon Web Services HealthOmics runs in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getRunCache: API.OperationMethod<
  GetRunCacheRequest,
  GetRunCacheResponse,
  GetRunCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /runCache/{id}",
    input: { id: 0 },
    output: { creationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRunCache",
  endpointHostPrefix: "workflows-",
})) as any;

export type GetRunGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a run group and returns its metadata.
 */
export const getRunGroup: API.OperationMethod<
  GetRunGroupRequest,
  GetRunGroupResponse,
  GetRunGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /runGroup/{id}",
    input: { id: 0 },
    output: { creationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRunGroup",
  endpointHostPrefix: "workflows-",
})) as any;

export type GetRunTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed information about a run task using its ID.
 */
export const getRunTask: API.OperationMethod<
  GetRunTaskRequest,
  GetRunTaskResponse,
  GetRunTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /run/{id}/task/{taskId}",
    input: { id: 0, taskId: 0 },
    output: { creationTime: D.ts, startTime: D.ts, stopTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRunTask",
  endpointHostPrefix: "workflows-",
})) as any;

export type GetS3AccessPolicyError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an access policy on a given store.
 */
export const getS3AccessPolicy: API.OperationMethod<
  GetS3AccessPolicyRequest,
  GetS3AccessPolicyResponse,
  GetS3AccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /s3accesspolicy/{s3AccessPointArn}",
    input: { s3AccessPointArn: 0 },
    output: { updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetS3AccessPolicy",
  endpointHostPrefix: "control-storage-",
})) as any;

export type GetSequenceStoreError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata for a sequence store using its ID and returns it in JSON format.
 */
export const getSequenceStore: API.OperationMethod<
  GetSequenceStoreRequest,
  GetSequenceStoreResponse,
  GetSequenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sequencestore/{id}",
    input: { id: 0 },
    output: { creationTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSequenceStore",
  endpointHostPrefix: "control-storage-",
})) as any;

export type GetShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata for the specified resource share.
 */
export const getShare: API.OperationMethod<
  GetShareRequest,
  GetShareResponse,
  GetShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /share/{shareId}",
    input: { shareId: 0 },
    output: { share: o_ShareDetails },
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
  operationName: "GetShare",
  endpointHostPrefix: "analytics-",
})) as any;

export type GetVariantImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about a variant import job.
 */
export const getVariantImportJob: API.OperationMethod<
  GetVariantImportRequest,
  GetVariantImportResponse,
  GetVariantImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /import/variant/{jobId}",
    input: { jobId: 0 },
    output: { creationTime: D.ts, updateTime: D.ts, completionTime: D.ts },
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
  operationName: "GetVariantImportJob",
  endpointHostPrefix: "analytics-",
})) as any;

export type GetVariantStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about a variant store.
 */
export const getVariantStore: API.OperationMethod<
  GetVariantStoreRequest,
  GetVariantStoreResponse,
  GetVariantStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /variantStore/{name}",
    input: { name: 0 },
    output: { creationTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVariantStore",
  endpointHostPrefix: "analytics-",
})) as any;

export type GetWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all information about a workflow using its ID.
 *
 * If a workflow is shared with you, you cannot export the workflow.
 *
 * For more information about your workflow status, see Verify the workflow status in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workflow/{id}",
    input: {
      id: 0,
      type: D.m({ query: "type" }),
      export: D.m({ query: "export" }),
      workflowOwnerId: D.m({ query: "workflowOwnerId" }),
    },
    output: { creationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
  endpointHostPrefix: "workflows-",
})) as any;

export type GetWorkflowVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a workflow version. For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getWorkflowVersion: API.OperationMethod<
  GetWorkflowVersionRequest,
  GetWorkflowVersionResponse,
  GetWorkflowVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workflow/{workflowId}/version/{versionName}",
    input: {
      workflowId: 0,
      versionName: 0,
      type: D.m({ query: "type" }),
      export: D.m({ query: "export" }),
      workflowOwnerId: D.m({ query: "workflowOwnerId" }),
    },
    output: { creationTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowVersion",
  endpointHostPrefix: "workflows-",
})) as any;

export type ListAnnotationImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of annotation import jobs.
 */
export const listAnnotationImportJobs: API.PaginatedOperationMethod<
  ListAnnotationImportJobsRequest,
  ListAnnotationImportJobsResponse,
  ListAnnotationImportJobsError,
  Credentials | HttpClient.HttpClient,
  AnnotationImportJobItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /import/annotations",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      ids: 0,
      nextToken: D.m({ query: "nextToken" }),
      filter: { status: 0, storeName: 0 },
    },
    output: {
      annotationImportJobs: D.list({
        creationTime: D.ts,
        updateTime: D.ts,
        completionTime: D.ts,
      }),
    },
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
  operationName: "ListAnnotationImportJobs",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "annotationImportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAnnotationStoresError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of annotation stores.
 */
export const listAnnotationStores: API.PaginatedOperationMethod<
  ListAnnotationStoresRequest,
  ListAnnotationStoresResponse,
  ListAnnotationStoresError,
  Credentials | HttpClient.HttpClient,
  AnnotationStoreItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /annotationStores",
    input: {
      ids: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      filter: { status: 0 },
    },
    output: {
      annotationStores: D.list({ creationTime: D.ts, updateTime: D.ts }),
    },
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
  operationName: "ListAnnotationStores",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "annotationStores",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAnnotationStoreVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the versions of an annotation store.
 */
export const listAnnotationStoreVersions: API.PaginatedOperationMethod<
  ListAnnotationStoreVersionsRequest,
  ListAnnotationStoreVersionsResponse,
  ListAnnotationStoreVersionsError,
  Credentials | HttpClient.HttpClient,
  AnnotationStoreVersionItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /annotationStore/{name}/versions",
    input: {
      name: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      filter: { status: 0 },
    },
    output: {
      annotationStoreVersions: D.list({ creationTime: D.ts, updateTime: D.ts }),
    },
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
  operationName: "ListAnnotationStoreVersions",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "annotationStoreVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of run batches in your account, with optional filtering by status, name, or run group. Results are paginated. Only one filter per call is supported.
 */
export const listBatch: API.PaginatedOperationMethod<
  ListBatchRequest,
  ListBatchResponse,
  ListBatchError,
  Credentials | HttpClient.HttpClient,
  BatchListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /runBatch",
    input: {
      maxItems: D.m({ query: "maxItems" }),
      startingToken: D.m({ query: "startingToken" }),
      status: D.m({ query: "status" }),
      name: D.m({ query: "name" }),
      runGroupId: D.m({ query: "runGroupId" }),
    },
    output: { items: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatch",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxItems",
  } as const,
})) as any;

export type ListConfigurationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all configurations for the account.
 */
export const listConfigurations: API.PaginatedOperationMethod<
  ListConfigurationsRequest,
  ListConfigurationsResponse,
  ListConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /configuration",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      startingToken: D.m({ query: "startingToken" }),
    },
    output: { items: D.list({ creationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurations",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMultipartReadSetUploadsError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists in-progress multipart read set uploads for a sequence store and returns it in a JSON formatted output. Multipart read set uploads are initiated by the `CreateMultipartReadSetUploads` API operation. This operation returns a response with no body when the upload is complete.
 */
export const listMultipartReadSetUploads: API.PaginatedOperationMethod<
  ListMultipartReadSetUploadsRequest,
  ListMultipartReadSetUploadsResponse,
  ListMultipartReadSetUploadsError,
  Credentials | HttpClient.HttpClient,
  MultipartReadSetUploadListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/uploads",
    input: {
      sequenceStoreId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { uploads: D.list({ creationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultipartReadSetUploads",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "uploads",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReadSetActivationJobsError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of read set activation jobs and returns the metadata in a JSON formatted output. To extract metadata from a read set activation job, use the `GetReadSetActivationJob` API operation.
 */
export const listReadSetActivationJobs: API.PaginatedOperationMethod<
  ListReadSetActivationJobsRequest,
  ListReadSetActivationJobsResponse,
  ListReadSetActivationJobsError,
  Credentials | HttpClient.HttpClient,
  ActivateReadSetJobItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/activationjobs",
    input: {
      sequenceStoreId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      filter: {
        status: 0,
        createdAfter: D.tsAs("date-time"),
        createdBefore: D.tsAs("date-time"),
      },
    },
    output: {
      activationJobs: D.list({ creationTime: D.ts, completionTime: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadSetActivationJobs",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "activationJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReadSetExportJobsError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of read set export jobs in a JSON formatted response. This API operation is used to check the status of a read set export job initiated by the `StartReadSetExportJob` API operation.
 */
export const listReadSetExportJobs: API.PaginatedOperationMethod<
  ListReadSetExportJobsRequest,
  ListReadSetExportJobsResponse,
  ListReadSetExportJobsError,
  Credentials | HttpClient.HttpClient,
  ExportReadSetJobDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/exportjobs",
    input: {
      sequenceStoreId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      filter: {
        status: 0,
        createdAfter: D.tsAs("date-time"),
        createdBefore: D.tsAs("date-time"),
      },
    },
    output: {
      exportJobs: D.list({ creationTime: D.ts, completionTime: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadSetExportJobs",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReadSetImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of read set import jobs and returns the data in JSON format.
 */
export const listReadSetImportJobs: API.PaginatedOperationMethod<
  ListReadSetImportJobsRequest,
  ListReadSetImportJobsResponse,
  ListReadSetImportJobsError,
  Credentials | HttpClient.HttpClient,
  ImportReadSetJobItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/importjobs",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sequenceStoreId: 0,
      filter: {
        status: 0,
        createdAfter: D.tsAs("date-time"),
        createdBefore: D.tsAs("date-time"),
      },
    },
    output: {
      importJobs: D.list({ creationTime: D.ts, completionTime: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadSetImportJobs",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "importJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReadSetsError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of read sets from a sequence store ID and returns the metadata in JSON format.
 */
export const listReadSets: API.PaginatedOperationMethod<
  ListReadSetsRequest,
  ListReadSetsResponse,
  ListReadSetsError,
  Credentials | HttpClient.HttpClient,
  ReadSetListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/readsets",
    input: {
      sequenceStoreId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      filter: {
        name: 0,
        status: 0,
        referenceArn: 0,
        createdAfter: D.tsAs("date-time"),
        createdBefore: D.tsAs("date-time"),
        sampleId: 0,
        subjectId: 0,
        generatedFrom: 0,
        creationType: 0,
      },
    },
    output: { readSets: D.list({ creationTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadSets",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "readSets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReadSetUploadPartsError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all parts in a multipart read set upload for a sequence store and returns the metadata in a JSON formatted output.
 */
export const listReadSetUploadParts: API.PaginatedOperationMethod<
  ListReadSetUploadPartsRequest,
  ListReadSetUploadPartsResponse,
  ListReadSetUploadPartsError,
  Credentials | HttpClient.HttpClient,
  ReadSetUploadPartListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/upload/{uploadId}/parts",
    input: {
      sequenceStoreId: 0,
      uploadId: 0,
      partSource: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      filter: {
        createdAfter: D.tsAs("date-time"),
        createdBefore: D.tsAs("date-time"),
      },
    },
    output: { parts: D.list({ creationTime: D.ts, lastUpdatedTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadSetUploadParts",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "parts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReferenceImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata of one or more reference import jobs for a reference store.
 */
export const listReferenceImportJobs: API.PaginatedOperationMethod<
  ListReferenceImportJobsRequest,
  ListReferenceImportJobsResponse,
  ListReferenceImportJobsError,
  Credentials | HttpClient.HttpClient,
  ImportReferenceJobItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /referencestore/{referenceStoreId}/importjobs",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      referenceStoreId: 0,
      filter: {
        status: 0,
        createdAfter: D.tsAs("date-time"),
        createdBefore: D.tsAs("date-time"),
      },
    },
    output: {
      importJobs: D.list({ creationTime: D.ts, completionTime: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReferenceImportJobs",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "importJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReferencesError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata of one or more reference genomes in a reference store.
 *
 * For more information, see Creating a reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listReferences: API.PaginatedOperationMethod<
  ListReferencesRequest,
  ListReferencesResponse,
  ListReferencesError,
  Credentials | HttpClient.HttpClient,
  ReferenceListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /referencestore/{referenceStoreId}/references",
    input: {
      referenceStoreId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      filter: {
        name: 0,
        md5: 0,
        createdAfter: D.tsAs("date-time"),
        createdBefore: D.tsAs("date-time"),
      },
    },
    output: { references: D.list({ creationTime: D.ts, updateTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReferences",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "references",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReferenceStoresError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of reference stores linked to your account and returns their metadata in JSON format.
 *
 * For more information, see Creating a reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listReferenceStores: API.PaginatedOperationMethod<
  ListReferenceStoresRequest,
  ListReferenceStoresResponse,
  ListReferenceStoresError,
  Credentials | HttpClient.HttpClient,
  ReferenceStoreDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /referencestores",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      filter: {
        name: 0,
        createdAfter: D.tsAs("date-time"),
        createdBefore: D.tsAs("date-time"),
      },
    },
    output: { referenceStores: D.list({ creationTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReferenceStores",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "referenceStores",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRunCachesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of your run caches and the metadata for each cache.
 */
export const listRunCaches: API.PaginatedOperationMethod<
  ListRunCachesRequest,
  ListRunCachesResponse,
  ListRunCachesError,
  Credentials | HttpClient.HttpClient,
  RunCacheListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /runCache",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      startingToken: D.m({ query: "startingToken" }),
    },
    output: { items: D.list({ creationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRunCaches",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRunGroupsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all run groups and returns the metadata for each run group.
 */
export const listRunGroups: API.PaginatedOperationMethod<
  ListRunGroupsRequest,
  ListRunGroupsResponse,
  ListRunGroupsError,
  Credentials | HttpClient.HttpClient,
  RunGroupListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /runGroup",
    input: {
      name: D.m({ query: "name" }),
      startingToken: D.m({ query: "startingToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { items: D.list({ creationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRunGroups",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRunsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of runs and returns each run's metadata and status.
 *
 * Amazon Web Services HealthOmics stores a configurable number of runs, as determined by service limits, that are available to the console and API. If the `ListRuns` response doesn't include specific runs that you expected, you can find all run logs in the CloudWatch logs. For more information about viewing the run logs, see CloudWatch logs in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listRuns: API.PaginatedOperationMethod<
  ListRunsRequest,
  ListRunsResponse,
  ListRunsError,
  Credentials | HttpClient.HttpClient,
  RunListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /run",
    input: {
      name: D.m({ query: "name" }),
      runGroupId: D.m({ query: "runGroupId" }),
      batchId: D.m({ query: "batchId" }),
      startingToken: D.m({ query: "startingToken" }),
      maxResults: D.m({ query: "maxResults" }),
      status: D.m({ query: "status" }),
    },
    output: {
      items: D.list({ creationTime: D.ts, startTime: D.ts, stopTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuns",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRunsInBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of individual workflow runs within a specific batch. Use this operation to map each `runSettingId` to its HealthOmics-generated `runId`, and to check the submission status of each run. Only one filter per call is supported.
 */
export const listRunsInBatch: API.PaginatedOperationMethod<
  ListRunsInBatchRequest,
  ListRunsInBatchResponse,
  ListRunsInBatchError,
  Credentials | HttpClient.HttpClient,
  RunBatchListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /runBatch/{batchId}/run",
    input: {
      batchId: 0,
      maxItems: D.m({ query: "maxItems" }),
      startingToken: D.m({ query: "startingToken" }),
      submissionStatus: D.m({ query: "submissionStatus" }),
      runSettingId: D.m({ query: "runSettingId" }),
      runId: D.m({ query: "runId" }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRunsInBatch",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "runs",
    pageSize: "maxItems",
  } as const,
})) as any;

export type ListRunTasksError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tasks and status information within their specified run. Use this operation to monitor runs and to identify which specific tasks have failed.
 */
export const listRunTasks: API.PaginatedOperationMethod<
  ListRunTasksRequest,
  ListRunTasksResponse,
  ListRunTasksError,
  Credentials | HttpClient.HttpClient,
  TaskListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /run/{id}/task",
    input: {
      id: 0,
      status: D.m({ query: "status" }),
      startingToken: D.m({ query: "startingToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      items: D.list({ creationTime: D.ts, startTime: D.ts, stopTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRunTasks",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSequenceStoresError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of sequence stores and returns each sequence store's metadata.
 *
 * For more information, see Creating a HealthOmics sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listSequenceStores: API.PaginatedOperationMethod<
  ListSequenceStoresRequest,
  ListSequenceStoresResponse,
  ListSequenceStoresError,
  Credentials | HttpClient.HttpClient,
  SequenceStoreDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestores",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      filter: {
        name: 0,
        createdAfter: D.tsAs("date-time"),
        createdBefore: D.tsAs("date-time"),
        status: 0,
        updatedAfter: D.tsAs("date-time"),
        updatedBefore: D.tsAs("date-time"),
      },
    },
    output: {
      sequenceStores: D.list({ creationTime: D.ts, updateTime: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSequenceStores",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sequenceStores",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSharesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource shares associated with an account. Use the filter parameter to retrieve a specific subset of the shares.
 */
export const listShares: API.PaginatedOperationMethod<
  ListSharesRequest,
  ListSharesResponse,
  ListSharesError,
  Credentials | HttpClient.HttpClient,
  ShareDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /shares",
    input: {
      resourceOwner: 0,
      filter: { resourceArns: 0, status: 0, type: 0 },
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { shares: D.list(o_ShareDetails) },
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
  operationName: "ListShares",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "shares",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of tags for a resource.
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
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "tags-",
})) as any;

export type ListVariantImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of variant import jobs.
 */
export const listVariantImportJobs: API.PaginatedOperationMethod<
  ListVariantImportJobsRequest,
  ListVariantImportJobsResponse,
  ListVariantImportJobsError,
  Credentials | HttpClient.HttpClient,
  VariantImportJobItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /import/variants",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      ids: 0,
      nextToken: D.m({ query: "nextToken" }),
      filter: { status: 0, storeName: 0 },
    },
    output: {
      variantImportJobs: D.list({
        creationTime: D.ts,
        updateTime: D.ts,
        completionTime: D.ts,
      }),
    },
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
  operationName: "ListVariantImportJobs",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "variantImportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListVariantStoresError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of variant stores.
 */
export const listVariantStores: API.PaginatedOperationMethod<
  ListVariantStoresRequest,
  ListVariantStoresResponse,
  ListVariantStoresError,
  Credentials | HttpClient.HttpClient,
  VariantStoreItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /variantStores",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      ids: 0,
      nextToken: D.m({ query: "nextToken" }),
      filter: { status: 0 },
    },
    output: { variantStores: D.list({ creationTime: D.ts, updateTime: D.ts }) },
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
  operationName: "ListVariantStores",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "variantStores",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of existing workflows. You can filter for specific workflows by their name and type. Using the type parameter, specify `PRIVATE` to retrieve a list of private workflows or specify `READY2RUN` for a list of all Ready2Run workflows. If you do not specify the type of workflow, this operation returns a list of existing workflows.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  WorkflowListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workflow",
    input: {
      type: D.m({ query: "type" }),
      name: D.m({ query: "name" }),
      startingToken: D.m({ query: "startingToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { items: D.list({ creationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the workflow versions for the specified workflow. For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listWorkflowVersions: API.PaginatedOperationMethod<
  ListWorkflowVersionsRequest,
  ListWorkflowVersionsResponse,
  ListWorkflowVersionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowVersionListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workflow/{workflowId}/version",
    input: {
      workflowId: 0,
      type: D.m({ query: "type" }),
      workflowOwnerId: D.m({ query: "workflowOwnerId" }),
      startingToken: D.m({ query: "startingToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { items: D.list({ creationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowVersions",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutS3AccessPolicyError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds an access policy to the specified store.
 */
export const putS3AccessPolicy: API.OperationMethod<
  PutS3AccessPolicyRequest,
  PutS3AccessPolicyResponse,
  PutS3AccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /s3accesspolicy/{s3AccessPointArn}",
    input: { s3AccessPointArn: 0, s3AccessPolicy: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutS3AccessPolicy",
  endpointHostPrefix: "control-storage-",
})) as any;

export type StartAnnotationImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Starts an annotation import job.
 */
export const startAnnotationImportJob: API.OperationMethod<
  StartAnnotationImportRequest,
  StartAnnotationImportResponse,
  StartAnnotationImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /import/annotation",
    input: {
      destinationName: 0,
      roleArn: 0,
      items: D.list({ source: 0 }),
      versionName: 0,
      formatOptions: {
        tsvOptions: {
          readOptions: {
            sep: 0,
            encoding: 0,
            quote: 0,
            quoteAll: 0,
            escape: 0,
            escapeQuotes: 0,
            comment: 0,
            header: 0,
            lineSep: 0,
          },
        },
        vcfOptions: { ignoreQualField: 0, ignoreFilterField: 0 },
      },
      runLeftNormalization: 0,
      annotationFields: 0,
    },
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
  operationName: "StartAnnotationImportJob",
  endpointHostPrefix: "analytics-",
})) as any;

export type StartReadSetActivationJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Activates an archived read set and returns its metadata in a JSON formatted output. AWS HealthOmics automatically archives unused read sets after 30 days. To monitor the status of your read set activation job, use the `GetReadSetActivationJob` operation.
 *
 * To learn more, see Activating read sets in the *Amazon Web Services HealthOmics User Guide*.
 */
export const startReadSetActivationJob: API.OperationMethod<
  StartReadSetActivationJobRequest,
  StartReadSetActivationJobResponse,
  StartReadSetActivationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/activationjob",
    input: {
      sequenceStoreId: 0,
      clientToken: 0,
      sources: D.list({ readSetId: 0 }),
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReadSetActivationJob",
  endpointHostPrefix: "control-storage-",
})) as any;

export type StartReadSetExportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a read set export job. When the export job is finished, the read set is exported to an Amazon S3 bucket which can be retrieved using the `GetReadSetExportJob` API operation.
 *
 * To monitor the status of the export job, use the `ListReadSetExportJobs` API operation.
 */
export const startReadSetExportJob: API.OperationMethod<
  StartReadSetExportJobRequest,
  StartReadSetExportJobResponse,
  StartReadSetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/exportjob",
    input: {
      sequenceStoreId: 0,
      destination: 0,
      roleArn: 0,
      clientToken: 0,
      sources: D.list({ readSetId: 0 }),
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReadSetExportJob",
  endpointHostPrefix: "control-storage-",
})) as any;

export type StartReadSetImportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports a read set from the sequence store. Read set import jobs support a maximum of 100 read sets of different types. Monitor the progress of your read set import job by calling the `GetReadSetImportJob` API operation.
 */
export const startReadSetImportJob: API.OperationMethod<
  StartReadSetImportJobRequest,
  StartReadSetImportJobResponse,
  StartReadSetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sequencestore/{sequenceStoreId}/importjob",
    input: {
      sequenceStoreId: 0,
      roleArn: 0,
      clientToken: 0,
      sources: D.list({
        sourceFiles: { source1: 0, source2: 0 },
        sourceFileType: 0,
        subjectId: 0,
        sampleId: 0,
        generatedFrom: 0,
        referenceArn: 0,
        name: 0,
        description: 0,
        tags: 0,
      }),
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReadSetImportJob",
  endpointHostPrefix: "control-storage-",
})) as any;

export type StartReferenceImportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports a reference genome from Amazon S3 into a specified reference store. You can have multiple reference genomes in a reference store. You can only import reference genomes one at a time into each reference store. Monitor the status of your reference import job by using the `GetReferenceImportJob` API operation.
 */
export const startReferenceImportJob: API.OperationMethod<
  StartReferenceImportJobRequest,
  StartReferenceImportJobResponse,
  StartReferenceImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /referencestore/{referenceStoreId}/importjob",
    input: {
      referenceStoreId: 0,
      roleArn: 0,
      clientToken: 0,
      sources: D.list({ sourceFile: 0, name: 0, description: 0, tags: 0 }),
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReferenceImportJob",
  endpointHostPrefix: "control-storage-",
})) as any;

export type StartRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new run and returns details about the run, or duplicates an existing run. A run is a single invocation of a workflow. If you provide request IDs, Amazon Web Services HealthOmics identifies duplicate requests and starts the run only once. Monitor the progress of the run by calling the `GetRun` API operation.
 *
 * To start a new run, the following inputs are required:
 *
 * - A service role ARN (`roleArn`).
 *
 * - The run's workflow ID (`workflowId`, not the `uuid` or `runId`).
 *
 * - An Amazon S3 location (`outputUri`) where the run outputs will be saved.
 *
 * - All required workflow parameters (`parameter`), which can include optional parameters from the parameter template. The run cannot include any parameters that are not defined in the parameter template. To see all possible parameters, use the `GetRun` API operation.
 *
 * - For runs with a `STATIC` (default) storage type, specify the required storage capacity (in gibibytes). A storage capacity value is not required for runs that use `DYNAMIC` storage.
 *
 * `StartRun` can also duplicate an existing run using the run's default values. You can modify these default values and/or add other optional inputs. To duplicate a run, the following inputs are required:
 *
 * - A service role ARN (`roleArn`).
 *
 * - The ID of the run to duplicate (`runId`).
 *
 * - An Amazon S3 location where the run outputs will be saved (`outputUri`).
 *
 * To learn more about the optional parameters for `StartRun`, see Starting a run in the *Amazon Web Services HealthOmics User Guide*.
 *
 * Use the `retentionMode` input to control how long the metadata for each run is stored in CloudWatch. There are two retention modes:
 *
 * - Specify `REMOVE` to automatically remove the oldest runs when you reach the maximum service retention limit for runs. It is recommended that you use the `REMOVE` mode to initiate major run requests so that your runs do not fail when you reach the limit.
 *
 * - The `retentionMode` is set to the `RETAIN` mode by default, which allows you to manually remove runs after reaching the maximum service retention limit. Under this setting, you cannot create additional runs until you remove the excess runs.
 *
 * To learn more about the retention modes, see Run retention mode in the *Amazon Web Services HealthOmics User Guide*.
 *
 * You can use Amazon Q CLI to analyze run logs and make performance optimization recommendations. To get started, see the Amazon Web Services HealthOmics MCP server on GitHub.
 */
export const startRun: API.OperationMethod<
  StartRunRequest,
  StartRunResponse,
  StartRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /run",
    input: {
      workflowId: 0,
      workflowType: 0,
      runId: 0,
      roleArn: 0,
      name: 0,
      cacheId: 0,
      cacheBehavior: 0,
      runGroupId: 0,
      priority: 0,
      parameters: 0,
      storageCapacity: 0,
      outputUri: 0,
      logLevel: 0,
      tags: 0,
      requestId: D.m({ idempotency: true }),
      retentionMode: 0,
      storageType: 0,
      workflowOwnerId: 0,
      workflowVersionName: 0,
      networkingMode: 0,
      scratchStorageMode: 0,
      configurationName: 0,
      engineSettings: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRun",
  endpointHostPrefix: "workflows-",
})) as any;

export type StartRunBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a batch of workflow runs. You can group up to 100,000 runs into a single batch that share a common configuration defined in `defaultRunSetting`. Per-run overrides can be provided either inline via `inlineSettings` (up to 100 runs) or via a JSON file stored in Amazon S3 via `s3UriSettings` (up to 100,000 runs).
 *
 * `StartRunBatch` validates common fields synchronously and returns immediately with a batch ID and status `CREATING`. The batch transitions to `PENDING` once initial setup completes. Runs are then submitted gradually and asynchronously at a rate governed by your `StartRun` throughput quota.
 */
export const startRunBatch: API.OperationMethod<
  StartRunBatchRequest,
  StartRunBatchResponse,
  StartRunBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /runBatch",
    input: {
      batchName: 0,
      requestId: D.m({ idempotency: true }),
      tags: 0,
      defaultRunSetting: {
        workflowId: 0,
        workflowType: 0,
        roleArn: 0,
        name: 0,
        cacheId: 0,
        cacheBehavior: 0,
        runGroupId: 0,
        priority: 0,
        parameters: 0,
        storageCapacity: 0,
        outputUri: 0,
        logLevel: 0,
        runTags: 0,
        retentionMode: 0,
        storageType: 0,
        workflowOwnerId: 0,
        outputBucketOwnerId: 0,
        workflowVersionName: 0,
        networkingMode: 0,
        configurationName: 0,
        engineSettings: 0,
        scratchStorageMode: 0,
      },
      batchRunSettings: {
        inlineSettings: D.list({
          runSettingId: 0,
          name: 0,
          outputUri: 0,
          priority: 0,
          parameters: 0,
          outputBucketOwnerId: 0,
          runTags: 0,
          engineSettings: 0,
        }),
        s3UriSettings: 0,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRunBatch",
  endpointHostPrefix: "workflows-",
})) as any;

export type StartVariantImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Starts a variant import job.
 */
export const startVariantImportJob: API.OperationMethod<
  StartVariantImportRequest,
  StartVariantImportResponse,
  StartVariantImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /import/variant",
    input: {
      destinationName: 0,
      roleArn: 0,
      items: D.list({ source: 0 }),
      runLeftNormalization: 0,
      annotationFields: 0,
    },
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
  operationName: "StartVariantImportJob",
  endpointHostPrefix: "analytics-",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource.
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
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "tags-",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "tags-",
})) as any;

export type UpdateAnnotationStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Updates an annotation store.
 */
export const updateAnnotationStore: API.OperationMethod<
  UpdateAnnotationStoreRequest,
  UpdateAnnotationStoreResponse,
  UpdateAnnotationStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /annotationStore/{name}",
    input: { name: 0, description: 0 },
    output: { creationTime: D.ts, updateTime: D.ts },
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
  operationName: "UpdateAnnotationStore",
  endpointHostPrefix: "analytics-",
})) as any;

export type UpdateAnnotationStoreVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the description of an annotation store version.
 */
export const updateAnnotationStoreVersion: API.OperationMethod<
  UpdateAnnotationStoreVersionRequest,
  UpdateAnnotationStoreVersionResponse,
  UpdateAnnotationStoreVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /annotationStore/{name}/version/{versionName}",
    input: { name: 0, versionName: 0, description: 0 },
    output: { creationTime: D.ts, updateTime: D.ts },
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
  operationName: "UpdateAnnotationStoreVersion",
  endpointHostPrefix: "analytics-",
})) as any;

export type UpdateRunCacheError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a run cache using its ID and returns a response with no body if the operation is successful. You can update the run cache description, name, or the default run cache behavior with `CACHE_ON_FAILURE` or `CACHE_ALWAYS`. To confirm that your run cache settings have been properly updated, use the `GetRunCache` API operation.
 *
 * For more information, see How call caching works in the *Amazon Web Services HealthOmics User Guide*.
 */
export const updateRunCache: API.OperationMethod<
  UpdateRunCacheRequest,
  UpdateRunCacheResponse,
  UpdateRunCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /runCache/{id}",
    input: { cacheBehavior: 0, description: 0, id: 0, name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRunCache",
  endpointHostPrefix: "workflows-",
})) as any;

export type UpdateRunGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings of a run group and returns a response with no body if the operation is successful.
 *
 * You can update the following settings with `UpdateRunGroup`:
 *
 * - Maximum number of CPUs
 *
 * - Run time (measured in minutes)
 *
 * - Number of GPUs
 *
 * - Number of concurrent runs
 *
 * - Group name
 *
 * To confirm that the settings have been successfully updated, use the `ListRunGroups` or `GetRunGroup` API operations to verify that the desired changes have been made.
 */
export const updateRunGroup: API.OperationMethod<
  UpdateRunGroupRequest,
  UpdateRunGroupResponse,
  UpdateRunGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /runGroup/{id}",
    input: {
      id: 0,
      name: 0,
      maxCpus: 0,
      maxRuns: 0,
      maxDuration: 0,
      maxGpus: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRunGroup",
  endpointHostPrefix: "workflows-",
})) as any;

export type UpdateSequenceStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update one or more parameters for the sequence store.
 */
export const updateSequenceStore: API.OperationMethod<
  UpdateSequenceStoreRequest,
  UpdateSequenceStoreResponse,
  UpdateSequenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /sequencestore/{id}",
    input: {
      id: 0,
      name: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
      fallbackLocation: 0,
      propagatedSetLevelTags: 0,
      s3AccessConfig: i_S3AccessConfig,
    },
    output: { creationTime: D.ts, updateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSequenceStore",
  endpointHostPrefix: "control-storage-",
})) as any;

export type UpdateVariantStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Updates a variant store.
 */
export const updateVariantStore: API.OperationMethod<
  UpdateVariantStoreRequest,
  UpdateVariantStoreResponse,
  UpdateVariantStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /variantStore/{name}",
    input: { name: 0, description: 0 },
    output: { creationTime: D.ts, updateTime: D.ts },
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
  operationName: "UpdateVariantStore",
  endpointHostPrefix: "analytics-",
})) as any;

export type UpdateWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates information about a workflow.
 *
 * You can update the following workflow information:
 *
 * - Name
 *
 * - Description
 *
 * - Default storage type
 *
 * - Default storage capacity (with workflow ID)
 *
 * This operation returns a response with no body if the operation is successful. You can check the workflow updates by calling the `GetWorkflow` API operation.
 *
 * For more information, see Update a private workflow in the *Amazon Web Services HealthOmics User Guide*.
 */
export const updateWorkflow: API.OperationMethod<
  UpdateWorkflowRequest,
  UpdateWorkflowResponse,
  UpdateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workflow/{id}",
    input: {
      id: 0,
      name: 0,
      description: 0,
      storageType: 0,
      storageCapacity: 0,
      readmeMarkdown: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkflow",
  endpointHostPrefix: "workflows-",
})) as any;

export type UpdateWorkflowVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates information about the workflow version. For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const updateWorkflowVersion: API.OperationMethod<
  UpdateWorkflowVersionRequest,
  UpdateWorkflowVersionResponse,
  UpdateWorkflowVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workflow/{workflowId}/version/{versionName}",
    input: {
      workflowId: 0,
      versionName: 0,
      description: 0,
      storageType: 0,
      storageCapacity: 0,
      readmeMarkdown: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkflowVersion",
  endpointHostPrefix: "workflows-",
})) as any;

export type UploadReadSetPartError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Uploads a specific part of a read set into a sequence store. When you a upload a read set part with a part number that already exists, the new part replaces the existing one. This operation returns a JSON formatted response containing a string identifier that is used to confirm that parts are being added to the intended upload.
 *
 * For more information, see Direct upload to a sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const uploadReadSetPart: API.OperationMethod<
  UploadReadSetPartRequest,
  UploadReadSetPartResponse,
  UploadReadSetPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sequencestore/{sequenceStoreId}/upload/{uploadId}/part",
    input: {
      sequenceStoreId: 0,
      uploadId: 0,
      partSource: D.m({ query: "partSource" }),
      partNumber: D.m({ query: "partNumber" }),
      payload: D.m({ payload: true, requiresLength: true, shape: D.stream }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadReadSetPart",
  endpointHostPrefix: "storage-",
})) as any;

const i_ContainerRegistryMap: D.LazyStruct = () => ({
  registryMappings: D.list({
    upstreamRegistryUrl: 0,
    ecrRepositoryPrefix: 0,
    upstreamRepositoryPrefix: 0,
    ecrAccountId: 0,
  }),
  imageMappings: D.list({ sourceImage: 0, destinationImage: 0 }),
});
const i_DefinitionRepository: D.LazyStruct = () => ({
  connectionArn: 0,
  fullRepositoryId: 0,
  sourceReference: { type: 0, value: 0 },
  excludeFilePatterns: 0,
});
const i_ReferenceItem: D.LazyStruct = () => ({ referenceArn: 0 });
const i_S3AccessConfig: D.LazyStruct = () => ({ accessLogLocation: 0 });
const i_SseConfig: D.LazyStruct = () => ({ type: 0, keyArn: 0 });
const i_WorkflowParameter: D.LazyStruct = () => ({
  description: 0,
  optional: 0,
});
const o_ShareDetails: D.LazyStruct = () => ({
  creationTime: D.ts,
  updateTime: D.ts,
});
