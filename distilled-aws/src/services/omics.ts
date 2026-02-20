import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({ sdkId: "Omics", serviceShapeName: "Omics" });
const auth = T.AwsAuthSigv4({ name: "omics" });
const ver = T.ServiceVersion("2022-11-28");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type S3AccessPointArn = string;
export type StoreId = string;
export type S3AccessPolicy = string;
export type StoreName = string;
export type Arn = string;
export type S3Uri = string;
export type VersionName = string;
export type Separator = string;
export type Encoding = string;
export type Quote = string;
export type QuoteAll = boolean;
export type EscapeChar = string;
export type EscapeQuotes = boolean;
export type CommentChar = string;
export type Header = boolean;
export type LineSep = string;
export type RunLeftNormalization = boolean;
export type ResourceId = string;
export type JobStatus = string;
export type JobStatusMsg = string;
export type CreationTime = Date;
export type UpdateTime = Date;
export type CompletionTime = Date;
export type ResourceIdentifier = string;
export type ReferenceArn = string;
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export type EncryptionType = string;
export type StoreFormat = string;
export type AnnotationType = string;
export type FormatToHeaderKey = string;
export type SchemaValueType = string;
export type StoreStatus = string;
export type StatusMessage = string;
export type VersionStatus = string;
export type ReferenceStoreName = string;
export type ReferenceStoreDescription = string;
export type ClientToken = string;
export type ReferenceStoreId = string;
export type ReferenceStoreArn = string;
export type NextToken = string;
export type ImportJobId = string;
export type RoleArn = string;
export type ReferenceImportJobStatus = string;
export type JobStatusMessage = string;
export type ReferenceImportJobItemStatus = string;
export type ReferenceName = string;
export type ReferenceDescription = string;
export type ReferenceId = string;
export type Md5 = string;
export type ReferenceStatus = string;
export type ReferenceCreationType = string;
export type CreationJobId = string;
export type Range = string;
export type ReferenceFile = string;
export type CacheBehavior = string;
export type S3UriForBucketOrObject = string;
export type UserCustomDescription = string;
export type UserCustomName = string;
export type RunCacheRequestId = string;
export type AwsAccountId = string;
export type RunCacheArn = string;
export type RunCacheId = string;
export type RunCacheStatus = string;
export type RunCacheTimestamp = Date;
export type ListToken = string;
export type RunGroupName = string;
export type RunGroupRequestId = string;
export type RunGroupArn = string;
export type RunGroupId = string;
export type RunGroupTimestamp = Date;
export type RunGroupListToken = string;
export type WorkflowId = string;
export type WorkflowType = string;
export type RunId = string;
export type RunRoleArn = string;
export type RunName = string;
export type NumericIdInArn = string;
export type RunParameters = unknown;
export type RunOutputUri = string;
export type RunLogLevel = string;
export type RunRequestId = string;
export type RunRetentionMode = string;
export type StorageType = string;
export type WorkflowOwnerId = string;
export type WorkflowVersionName = string;
export type RunArn = string;
export type RunStatus = string;
export type RunUuid = string;
export type RunExport = string;
export type EngineVersion = string;
export type WorkflowDefinition = string;
export type WorkflowDigest = string;
export type RunResourceDigestKey = string;
export type RunResourceDigest = string;
export type RunStartedBy = string;
export type RunTimestamp = Date;
export type RunStatusMessage = string;
export type Accelerators = string;
export type RunFailureReason = string;
export type EngineLogStream = string;
export type RunLogStream = string;
export type WorkflowUuid = string;
export type RunListToken = string;
export type TaskId = string;
export type TaskStatus = string;
export type TaskName = string;
export type TaskTimestamp = Date;
export type TaskStatusMessage = string;
export type TaskLogStream = string;
export type TaskInstanceType = string;
export type TaskFailureReason = string;
export type Uri = string;
export type TaskImageDigest = string;
export type TaskListToken = string;
export type SequenceStoreName = string;
export type SequenceStoreDescription = string;
export type FallbackLocation = string;
export type ETagAlgorithmFamily = string;
export type AccessLogLocation = string;
export type SequenceStoreId = string;
export type SequenceStoreArn = string;
export type SequenceStoreStatus = string;
export type SequenceStoreStatusMessage = string;
export type UploadId = string;
export type ReadSetPartSource = string;
export type ReadSetId = string;
export type FileType = string;
export type SubjectId = string;
export type SampleId = string;
export type GeneratedFrom = string;
export type ReadSetName = string;
export type ReadSetDescription = string;
export type ActivationJobId = string;
export type ReadSetActivationJobStatus = string;
export type ReadSetActivationJobItemStatus = string;
export type ExportJobId = string;
export type S3Destination = string;
export type ReadSetExportJobStatus = string;
export type ReadSetExportJobItemStatus = string;
export type ReadSetImportJobStatus = string;
export type ReadSetImportJobItemStatus = string;
export type ReadSetArn = string;
export type ReadSetStatus = string;
export type ReadSetStatusMessage = string;
export type CreationType = string;
export type ETagAlgorithm = string;
export type ReferenceArnFilter = string;
export type ReadSetFile = string;
export type ShareName = string;
export type ShareStatus = string;
export type ResourceOwner = string;
export type ShareResourceType = string;
export type TagArn = string;
export type WorkflowName = string;
export type WorkflowDescription = string;
export type WorkflowEngine = string;
export type WorkflowMain = string;
export type WorkflowParameterName = string;
export type WorkflowParameterDescription = string;
export type WorkflowRequestId = string;
export type EcrRepositoryPrefix = string;
export type UpstreamRepositoryPrefix = string;
export type ReadmeMarkdown = string;
export type ParameterTemplatePath = string;
export type ReadmePath = string;
export type ConnectionArn = string;
export type FullRepositoryId = string;
export type SourceReferenceType = string;
export type SourceReferenceValue = string;
export type WorkflowBucketOwnerId = string;
export type S3UriForObject = string;
export type WorkflowArn = string;
export type WorkflowStatus = string;
export type WorkflowExport = string;
export type WorkflowTimestamp = Date;
export type WorkflowStatusMessage = string;
export type WorkflowMetadataKey = string;
export type WorkflowMetadataValue = string;
export type ReadmeS3PresignedUrl = string;
export type WorkflowListToken = string;
export type WorkflowVersionDescription = string;
export type WorkflowVersionArn = string;
export type WorkflowVersionListToken = string;

//# Schemas
export interface DeleteS3AccessPolicyRequest {
  s3AccessPointArn: string;
}
export const DeleteS3AccessPolicyRequest = S.suspend(() =>
  S.Struct({
    s3AccessPointArn: S.String.pipe(T.HttpLabel("s3AccessPointArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/s3accesspolicy/{s3AccessPointArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteS3AccessPolicyRequest",
}) as any as S.Schema<DeleteS3AccessPolicyRequest>;
export interface DeleteS3AccessPolicyResponse {}
export const DeleteS3AccessPolicyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteS3AccessPolicyResponse",
}) as any as S.Schema<DeleteS3AccessPolicyResponse>;
export interface GetS3AccessPolicyRequest {
  s3AccessPointArn: string;
}
export const GetS3AccessPolicyRequest = S.suspend(() =>
  S.Struct({
    s3AccessPointArn: S.String.pipe(T.HttpLabel("s3AccessPointArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/s3accesspolicy/{s3AccessPointArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetS3AccessPolicyRequest",
}) as any as S.Schema<GetS3AccessPolicyRequest>;
export type StoreType = "SEQUENCE_STORE" | "REFERENCE_STORE" | (string & {});
export const StoreType = S.String;
export interface GetS3AccessPolicyResponse {
  s3AccessPointArn?: string;
  storeId?: string;
  storeType?: StoreType;
  updateTime?: Date;
  s3AccessPolicy: string;
}
export const GetS3AccessPolicyResponse = S.suspend(() =>
  S.Struct({
    s3AccessPointArn: S.optional(S.String),
    storeId: S.optional(S.String),
    storeType: S.optional(StoreType),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    s3AccessPolicy: S.String,
  }),
).annotate({
  identifier: "GetS3AccessPolicyResponse",
}) as any as S.Schema<GetS3AccessPolicyResponse>;
export interface PutS3AccessPolicyRequest {
  s3AccessPointArn: string;
  s3AccessPolicy: string;
}
export const PutS3AccessPolicyRequest = S.suspend(() =>
  S.Struct({
    s3AccessPointArn: S.String.pipe(T.HttpLabel("s3AccessPointArn")),
    s3AccessPolicy: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/s3accesspolicy/{s3AccessPointArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutS3AccessPolicyRequest",
}) as any as S.Schema<PutS3AccessPolicyRequest>;
export interface PutS3AccessPolicyResponse {
  s3AccessPointArn?: string;
  storeId?: string;
  storeType?: StoreType;
}
export const PutS3AccessPolicyResponse = S.suspend(() =>
  S.Struct({
    s3AccessPointArn: S.optional(S.String),
    storeId: S.optional(S.String),
    storeType: S.optional(StoreType),
  }),
).annotate({
  identifier: "PutS3AccessPolicyResponse",
}) as any as S.Schema<PutS3AccessPolicyResponse>;
export interface AnnotationImportItemSource {
  source: string;
}
export const AnnotationImportItemSource = S.suspend(() =>
  S.Struct({ source: S.String }),
).annotate({
  identifier: "AnnotationImportItemSource",
}) as any as S.Schema<AnnotationImportItemSource>;
export type AnnotationImportItemSources = AnnotationImportItemSource[];
export const AnnotationImportItemSources = S.Array(AnnotationImportItemSource);
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
export const ReadOptions = S.suspend(() =>
  S.Struct({
    sep: S.optional(S.String),
    encoding: S.optional(S.String),
    quote: S.optional(S.String),
    quoteAll: S.optional(S.Boolean),
    escape: S.optional(S.String),
    escapeQuotes: S.optional(S.Boolean),
    comment: S.optional(S.String),
    header: S.optional(S.Boolean),
    lineSep: S.optional(S.String),
  }),
).annotate({ identifier: "ReadOptions" }) as any as S.Schema<ReadOptions>;
export interface TsvOptions {
  readOptions?: ReadOptions;
}
export const TsvOptions = S.suspend(() =>
  S.Struct({ readOptions: S.optional(ReadOptions) }),
).annotate({ identifier: "TsvOptions" }) as any as S.Schema<TsvOptions>;
export interface VcfOptions {
  ignoreQualField?: boolean;
  ignoreFilterField?: boolean;
}
export const VcfOptions = S.suspend(() =>
  S.Struct({
    ignoreQualField: S.optional(S.Boolean),
    ignoreFilterField: S.optional(S.Boolean),
  }),
).annotate({ identifier: "VcfOptions" }) as any as S.Schema<VcfOptions>;
export type FormatOptions =
  | { tsvOptions: TsvOptions; vcfOptions?: never }
  | { tsvOptions?: never; vcfOptions: VcfOptions };
export const FormatOptions = S.Union([
  S.Struct({ tsvOptions: TsvOptions }),
  S.Struct({ vcfOptions: VcfOptions }),
]);
export type AnnotationFieldMap = { [key: string]: string | undefined };
export const AnnotationFieldMap = S.Record(S.String, S.String.pipe(S.optional));
export interface StartAnnotationImportRequest {
  destinationName: string;
  roleArn: string;
  items: AnnotationImportItemSource[];
  versionName?: string;
  formatOptions?: FormatOptions;
  runLeftNormalization?: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export const StartAnnotationImportRequest = S.suspend(() =>
  S.Struct({
    destinationName: S.String,
    roleArn: S.String,
    items: AnnotationImportItemSources,
    versionName: S.optional(S.String),
    formatOptions: S.optional(FormatOptions),
    runLeftNormalization: S.optional(S.Boolean),
    annotationFields: S.optional(AnnotationFieldMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/import/annotation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartAnnotationImportRequest",
}) as any as S.Schema<StartAnnotationImportRequest>;
export interface StartAnnotationImportResponse {
  jobId: string;
}
export const StartAnnotationImportResponse = S.suspend(() =>
  S.Struct({ jobId: S.String }),
).annotate({
  identifier: "StartAnnotationImportResponse",
}) as any as S.Schema<StartAnnotationImportResponse>;
export interface GetAnnotationImportRequest {
  jobId: string;
}
export const GetAnnotationImportRequest = S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/import/annotation/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAnnotationImportRequest",
}) as any as S.Schema<GetAnnotationImportRequest>;
export interface AnnotationImportItemDetail {
  source: string;
  jobStatus: string;
}
export const AnnotationImportItemDetail = S.suspend(() =>
  S.Struct({ source: S.String, jobStatus: S.String }),
).annotate({
  identifier: "AnnotationImportItemDetail",
}) as any as S.Schema<AnnotationImportItemDetail>;
export type AnnotationImportItemDetails = AnnotationImportItemDetail[];
export const AnnotationImportItemDetails = S.Array(AnnotationImportItemDetail);
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
export const GetAnnotationImportResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    destinationName: S.String,
    versionName: S.String,
    roleArn: S.String,
    status: S.String,
    statusMessage: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    items: AnnotationImportItemDetails,
    runLeftNormalization: S.Boolean,
    formatOptions: FormatOptions,
    annotationFields: S.optional(AnnotationFieldMap),
  }),
).annotate({
  identifier: "GetAnnotationImportResponse",
}) as any as S.Schema<GetAnnotationImportResponse>;
export interface CancelAnnotationImportRequest {
  jobId: string;
}
export const CancelAnnotationImportRequest = S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/import/annotation/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelAnnotationImportRequest",
}) as any as S.Schema<CancelAnnotationImportRequest>;
export interface CancelAnnotationImportResponse {}
export const CancelAnnotationImportResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelAnnotationImportResponse",
}) as any as S.Schema<CancelAnnotationImportResponse>;
export type IdList = string[];
export const IdList = S.Array(S.String);
export interface ListAnnotationImportJobsFilter {
  status?: string;
  storeName?: string;
}
export const ListAnnotationImportJobsFilter = S.suspend(() =>
  S.Struct({ status: S.optional(S.String), storeName: S.optional(S.String) }),
).annotate({
  identifier: "ListAnnotationImportJobsFilter",
}) as any as S.Schema<ListAnnotationImportJobsFilter>;
export interface ListAnnotationImportJobsRequest {
  maxResults?: number;
  ids?: string[];
  nextToken?: string;
  filter?: ListAnnotationImportJobsFilter;
}
export const ListAnnotationImportJobsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ids: S.optional(IdList),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ListAnnotationImportJobsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/import/annotations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAnnotationImportJobsRequest",
}) as any as S.Schema<ListAnnotationImportJobsRequest>;
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
export const AnnotationImportJobItem = S.suspend(() =>
  S.Struct({
    id: S.String,
    destinationName: S.String,
    versionName: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    runLeftNormalization: S.optional(S.Boolean),
    annotationFields: S.optional(AnnotationFieldMap),
  }),
).annotate({
  identifier: "AnnotationImportJobItem",
}) as any as S.Schema<AnnotationImportJobItem>;
export type AnnotationImportJobItems = AnnotationImportJobItem[];
export const AnnotationImportJobItems = S.Array(AnnotationImportJobItem);
export interface ListAnnotationImportJobsResponse {
  annotationImportJobs?: AnnotationImportJobItem[];
  nextToken?: string;
}
export const ListAnnotationImportJobsResponse = S.suspend(() =>
  S.Struct({
    annotationImportJobs: S.optional(AnnotationImportJobItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAnnotationImportJobsResponse",
}) as any as S.Schema<ListAnnotationImportJobsResponse>;
export type ReferenceItem = { referenceArn: string };
export const ReferenceItem = S.Union([S.Struct({ referenceArn: S.String })]);
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface SseConfig {
  type: string;
  keyArn?: string;
}
export const SseConfig = S.suspend(() =>
  S.Struct({ type: S.String, keyArn: S.optional(S.String) }),
).annotate({ identifier: "SseConfig" }) as any as S.Schema<SseConfig>;
export type FormatToHeader = { [key: string]: string | undefined };
export const FormatToHeader = S.Record(S.String, S.String.pipe(S.optional));
export type SchemaItem = { [key: string]: string | undefined };
export const SchemaItem = S.Record(S.String, S.String.pipe(S.optional));
export type Schema = { [key: string]: string | undefined }[];
export const Schema = S.Array(SchemaItem);
export interface TsvStoreOptions {
  annotationType?: string;
  formatToHeader?: { [key: string]: string | undefined };
  schema?: { [key: string]: string | undefined }[];
}
export const TsvStoreOptions = S.suspend(() =>
  S.Struct({
    annotationType: S.optional(S.String),
    formatToHeader: S.optional(FormatToHeader),
    schema: S.optional(Schema),
  }),
).annotate({
  identifier: "TsvStoreOptions",
}) as any as S.Schema<TsvStoreOptions>;
export type StoreOptions = { tsvStoreOptions: TsvStoreOptions };
export const StoreOptions = S.Union([
  S.Struct({ tsvStoreOptions: TsvStoreOptions }),
]);
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
export const CreateAnnotationStoreRequest = S.suspend(() =>
  S.Struct({
    reference: S.optional(ReferenceItem),
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    versionName: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    storeFormat: S.String,
    storeOptions: S.optional(StoreOptions),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/annotationStore" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAnnotationStoreRequest",
}) as any as S.Schema<CreateAnnotationStoreRequest>;
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
export const CreateAnnotationStoreResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: S.optional(ReferenceItem),
    storeFormat: S.optional(S.String),
    storeOptions: S.optional(StoreOptions),
    status: S.String,
    name: S.String,
    versionName: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateAnnotationStoreResponse",
}) as any as S.Schema<CreateAnnotationStoreResponse>;
export interface GetAnnotationStoreRequest {
  name: string;
}
export const GetAnnotationStoreRequest = S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/annotationStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAnnotationStoreRequest",
}) as any as S.Schema<GetAnnotationStoreRequest>;
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
export const GetAnnotationStoreResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    storeArn: S.String,
    name: S.String,
    description: S.String,
    sseConfig: SseConfig,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    tags: TagMap,
    storeOptions: S.optional(StoreOptions),
    storeFormat: S.optional(S.String),
    statusMessage: S.String,
    storeSizeBytes: S.Number,
    numVersions: S.Number,
  }),
).annotate({
  identifier: "GetAnnotationStoreResponse",
}) as any as S.Schema<GetAnnotationStoreResponse>;
export interface UpdateAnnotationStoreRequest {
  name: string;
  description?: string;
}
export const UpdateAnnotationStoreRequest = S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/annotationStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAnnotationStoreRequest",
}) as any as S.Schema<UpdateAnnotationStoreRequest>;
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
export const UpdateAnnotationStoreResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    name: S.String,
    description: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    storeOptions: S.optional(StoreOptions),
    storeFormat: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateAnnotationStoreResponse",
}) as any as S.Schema<UpdateAnnotationStoreResponse>;
export interface DeleteAnnotationStoreRequest {
  name: string;
  force?: boolean;
}
export const DeleteAnnotationStoreRequest = S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/annotationStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAnnotationStoreRequest",
}) as any as S.Schema<DeleteAnnotationStoreRequest>;
export interface DeleteAnnotationStoreResponse {
  status: string;
}
export const DeleteAnnotationStoreResponse = S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "DeleteAnnotationStoreResponse",
}) as any as S.Schema<DeleteAnnotationStoreResponse>;
export interface ListAnnotationStoresFilter {
  status?: string;
}
export const ListAnnotationStoresFilter = S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "ListAnnotationStoresFilter",
}) as any as S.Schema<ListAnnotationStoresFilter>;
export interface ListAnnotationStoresRequest {
  ids?: string[];
  maxResults?: number;
  nextToken?: string;
  filter?: ListAnnotationStoresFilter;
}
export const ListAnnotationStoresRequest = S.suspend(() =>
  S.Struct({
    ids: S.optional(IdList),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ListAnnotationStoresFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/annotationStores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAnnotationStoresRequest",
}) as any as S.Schema<ListAnnotationStoresRequest>;
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
export const AnnotationStoreItem = S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    storeArn: S.String,
    name: S.String,
    storeFormat: S.String,
    description: S.String,
    sseConfig: SseConfig,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusMessage: S.String,
    storeSizeBytes: S.Number,
  }),
).annotate({
  identifier: "AnnotationStoreItem",
}) as any as S.Schema<AnnotationStoreItem>;
export type AnnotationStoreItems = AnnotationStoreItem[];
export const AnnotationStoreItems = S.Array(AnnotationStoreItem);
export interface ListAnnotationStoresResponse {
  annotationStores?: AnnotationStoreItem[];
  nextToken?: string;
}
export const ListAnnotationStoresResponse = S.suspend(() =>
  S.Struct({
    annotationStores: S.optional(AnnotationStoreItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAnnotationStoresResponse",
}) as any as S.Schema<ListAnnotationStoresResponse>;
export interface TsvVersionOptions {
  annotationType?: string;
  formatToHeader?: { [key: string]: string | undefined };
  schema?: { [key: string]: string | undefined }[];
}
export const TsvVersionOptions = S.suspend(() =>
  S.Struct({
    annotationType: S.optional(S.String),
    formatToHeader: S.optional(FormatToHeader),
    schema: S.optional(Schema),
  }),
).annotate({
  identifier: "TsvVersionOptions",
}) as any as S.Schema<TsvVersionOptions>;
export type VersionOptions = { tsvVersionOptions: TsvVersionOptions };
export const VersionOptions = S.Union([
  S.Struct({ tsvVersionOptions: TsvVersionOptions }),
]);
export interface CreateAnnotationStoreVersionRequest {
  name: string;
  versionName: string;
  description?: string;
  versionOptions?: VersionOptions;
  tags?: { [key: string]: string | undefined };
}
export const CreateAnnotationStoreVersionRequest = S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    versionName: S.String,
    description: S.optional(S.String),
    versionOptions: S.optional(VersionOptions),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/annotationStore/{name}/version" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAnnotationStoreVersionRequest",
}) as any as S.Schema<CreateAnnotationStoreVersionRequest>;
export interface CreateAnnotationStoreVersionResponse {
  id: string;
  versionName: string;
  storeId: string;
  versionOptions?: VersionOptions;
  name: string;
  status: string;
  creationTime: Date;
}
export const CreateAnnotationStoreVersionResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    versionName: S.String,
    storeId: S.String,
    versionOptions: S.optional(VersionOptions),
    name: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateAnnotationStoreVersionResponse",
}) as any as S.Schema<CreateAnnotationStoreVersionResponse>;
export interface GetAnnotationStoreVersionRequest {
  name: string;
  versionName: string;
}
export const GetAnnotationStoreVersionRequest = S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/annotationStore/{name}/version/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAnnotationStoreVersionRequest",
}) as any as S.Schema<GetAnnotationStoreVersionRequest>;
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
export const GetAnnotationStoreVersionResponse = S.suspend(() =>
  S.Struct({
    storeId: S.String,
    id: S.String,
    status: S.String,
    versionArn: S.String,
    name: S.String,
    versionName: S.String,
    description: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    tags: TagMap,
    versionOptions: S.optional(VersionOptions),
    statusMessage: S.String,
    versionSizeBytes: S.Number,
  }),
).annotate({
  identifier: "GetAnnotationStoreVersionResponse",
}) as any as S.Schema<GetAnnotationStoreVersionResponse>;
export interface UpdateAnnotationStoreVersionRequest {
  name: string;
  versionName: string;
  description?: string;
}
export const UpdateAnnotationStoreVersionRequest = S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/annotationStore/{name}/version/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAnnotationStoreVersionRequest",
}) as any as S.Schema<UpdateAnnotationStoreVersionRequest>;
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
export const UpdateAnnotationStoreVersionResponse = S.suspend(() =>
  S.Struct({
    storeId: S.String,
    id: S.String,
    status: S.String,
    name: S.String,
    versionName: S.String,
    description: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateAnnotationStoreVersionResponse",
}) as any as S.Schema<UpdateAnnotationStoreVersionResponse>;
export interface ListAnnotationStoreVersionsFilter {
  status?: string;
}
export const ListAnnotationStoreVersionsFilter = S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "ListAnnotationStoreVersionsFilter",
}) as any as S.Schema<ListAnnotationStoreVersionsFilter>;
export interface ListAnnotationStoreVersionsRequest {
  name: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ListAnnotationStoreVersionsFilter;
}
export const ListAnnotationStoreVersionsRequest = S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ListAnnotationStoreVersionsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/annotationStore/{name}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAnnotationStoreVersionsRequest",
}) as any as S.Schema<ListAnnotationStoreVersionsRequest>;
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
export const AnnotationStoreVersionItem = S.suspend(() =>
  S.Struct({
    storeId: S.String,
    id: S.String,
    status: S.String,
    versionArn: S.String,
    name: S.String,
    versionName: S.String,
    description: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusMessage: S.String,
    versionSizeBytes: S.Number,
  }),
).annotate({
  identifier: "AnnotationStoreVersionItem",
}) as any as S.Schema<AnnotationStoreVersionItem>;
export type AnnotationStoreVersionItems = AnnotationStoreVersionItem[];
export const AnnotationStoreVersionItems = S.Array(AnnotationStoreVersionItem);
export interface ListAnnotationStoreVersionsResponse {
  annotationStoreVersions?: AnnotationStoreVersionItem[];
  nextToken?: string;
}
export const ListAnnotationStoreVersionsResponse = S.suspend(() =>
  S.Struct({
    annotationStoreVersions: S.optional(AnnotationStoreVersionItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAnnotationStoreVersionsResponse",
}) as any as S.Schema<ListAnnotationStoreVersionsResponse>;
export type VersionList = string[];
export const VersionList = S.Array(S.String);
export interface DeleteAnnotationStoreVersionsRequest {
  name: string;
  versions: string[];
  force?: boolean;
}
export const DeleteAnnotationStoreVersionsRequest = S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    versions: VersionList,
    force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/annotationStore/{name}/versions/delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAnnotationStoreVersionsRequest",
}) as any as S.Schema<DeleteAnnotationStoreVersionsRequest>;
export interface VersionDeleteError {
  versionName: string;
  message: string;
}
export const VersionDeleteError = S.suspend(() =>
  S.Struct({ versionName: S.String, message: S.String }),
).annotate({
  identifier: "VersionDeleteError",
}) as any as S.Schema<VersionDeleteError>;
export type VersionDeleteErrorList = VersionDeleteError[];
export const VersionDeleteErrorList = S.Array(VersionDeleteError);
export interface DeleteAnnotationStoreVersionsResponse {
  errors?: VersionDeleteError[];
}
export const DeleteAnnotationStoreVersionsResponse = S.suspend(() =>
  S.Struct({ errors: S.optional(VersionDeleteErrorList) }),
).annotate({
  identifier: "DeleteAnnotationStoreVersionsResponse",
}) as any as S.Schema<DeleteAnnotationStoreVersionsResponse>;
export interface CreateReferenceStoreRequest {
  name: string;
  description?: string;
  sseConfig?: SseConfig;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateReferenceStoreRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/referencestore" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReferenceStoreRequest",
}) as any as S.Schema<CreateReferenceStoreRequest>;
export interface CreateReferenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
}
export const CreateReferenceStoreResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateReferenceStoreResponse",
}) as any as S.Schema<CreateReferenceStoreResponse>;
export interface GetReferenceStoreRequest {
  id: string;
}
export const GetReferenceStoreRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/referencestore/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReferenceStoreRequest",
}) as any as S.Schema<GetReferenceStoreRequest>;
export interface GetReferenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
}
export const GetReferenceStoreResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetReferenceStoreResponse",
}) as any as S.Schema<GetReferenceStoreResponse>;
export interface DeleteReferenceStoreRequest {
  id: string;
}
export const DeleteReferenceStoreRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/referencestore/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReferenceStoreRequest",
}) as any as S.Schema<DeleteReferenceStoreRequest>;
export interface DeleteReferenceStoreResponse {}
export const DeleteReferenceStoreResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteReferenceStoreResponse",
}) as any as S.Schema<DeleteReferenceStoreResponse>;
export interface ReferenceStoreFilter {
  name?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ReferenceStoreFilter = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ReferenceStoreFilter",
}) as any as S.Schema<ReferenceStoreFilter>;
export interface ListReferenceStoresRequest {
  maxResults?: number;
  nextToken?: string;
  filter?: ReferenceStoreFilter;
}
export const ListReferenceStoresRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ReferenceStoreFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/referencestores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReferenceStoresRequest",
}) as any as S.Schema<ListReferenceStoresRequest>;
export interface ReferenceStoreDetail {
  arn: string;
  id: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
}
export const ReferenceStoreDetail = S.suspend(() =>
  S.Struct({
    arn: S.String,
    id: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ReferenceStoreDetail",
}) as any as S.Schema<ReferenceStoreDetail>;
export type ReferenceStoreDetailList = ReferenceStoreDetail[];
export const ReferenceStoreDetailList = S.Array(ReferenceStoreDetail);
export interface ListReferenceStoresResponse {
  nextToken?: string;
  referenceStores: ReferenceStoreDetail[];
}
export const ListReferenceStoresResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    referenceStores: ReferenceStoreDetailList,
  }),
).annotate({
  identifier: "ListReferenceStoresResponse",
}) as any as S.Schema<ListReferenceStoresResponse>;
export interface GetReferenceImportJobRequest {
  id: string;
  referenceStoreId: string;
}
export const GetReferenceImportJobRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/referencestore/{referenceStoreId}/importjob/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReferenceImportJobRequest",
}) as any as S.Schema<GetReferenceImportJobRequest>;
export interface ImportReferenceSourceItem {
  sourceFile?: string;
  status: string;
  statusMessage?: string;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  referenceId?: string;
}
export const ImportReferenceSourceItem = S.suspend(() =>
  S.Struct({
    sourceFile: S.optional(S.String),
    status: S.String,
    statusMessage: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    referenceId: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportReferenceSourceItem",
}) as any as S.Schema<ImportReferenceSourceItem>;
export type ImportReferenceSourceList = ImportReferenceSourceItem[];
export const ImportReferenceSourceList = S.Array(ImportReferenceSourceItem);
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
export const GetReferenceImportJobResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    referenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sources: ImportReferenceSourceList,
  }),
).annotate({
  identifier: "GetReferenceImportJobResponse",
}) as any as S.Schema<GetReferenceImportJobResponse>;
export interface ImportReferenceFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ImportReferenceFilter = S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ImportReferenceFilter",
}) as any as S.Schema<ImportReferenceFilter>;
export interface ListReferenceImportJobsRequest {
  maxResults?: number;
  nextToken?: string;
  referenceStoreId: string;
  filter?: ImportReferenceFilter;
}
export const ListReferenceImportJobsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
    filter: S.optional(ImportReferenceFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/referencestore/{referenceStoreId}/importjobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReferenceImportJobsRequest",
}) as any as S.Schema<ListReferenceImportJobsRequest>;
export interface ImportReferenceJobItem {
  id: string;
  referenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export const ImportReferenceJobItem = S.suspend(() =>
  S.Struct({
    id: S.String,
    referenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ImportReferenceJobItem",
}) as any as S.Schema<ImportReferenceJobItem>;
export type ImportReferenceJobList = ImportReferenceJobItem[];
export const ImportReferenceJobList = S.Array(ImportReferenceJobItem);
export interface ListReferenceImportJobsResponse {
  nextToken?: string;
  importJobs?: ImportReferenceJobItem[];
}
export const ListReferenceImportJobsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    importJobs: S.optional(ImportReferenceJobList),
  }),
).annotate({
  identifier: "ListReferenceImportJobsResponse",
}) as any as S.Schema<ListReferenceImportJobsResponse>;
export interface StartReferenceImportJobSourceItem {
  sourceFile: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const StartReferenceImportJobSourceItem = S.suspend(() =>
  S.Struct({
    sourceFile: S.String,
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "StartReferenceImportJobSourceItem",
}) as any as S.Schema<StartReferenceImportJobSourceItem>;
export type StartReferenceImportJobSourceList =
  StartReferenceImportJobSourceItem[];
export const StartReferenceImportJobSourceList = S.Array(
  StartReferenceImportJobSourceItem,
);
export interface StartReferenceImportJobRequest {
  referenceStoreId: string;
  roleArn: string;
  clientToken?: string;
  sources: StartReferenceImportJobSourceItem[];
}
export const StartReferenceImportJobRequest = S.suspend(() =>
  S.Struct({
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
    roleArn: S.String,
    clientToken: S.optional(S.String),
    sources: StartReferenceImportJobSourceList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/referencestore/{referenceStoreId}/importjob",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReferenceImportJobRequest",
}) as any as S.Schema<StartReferenceImportJobRequest>;
export interface StartReferenceImportJobResponse {
  id: string;
  referenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
}
export const StartReferenceImportJobResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    referenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StartReferenceImportJobResponse",
}) as any as S.Schema<StartReferenceImportJobResponse>;
export interface GetReferenceMetadataRequest {
  id: string;
  referenceStoreId: string;
}
export const GetReferenceMetadataRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/referencestore/{referenceStoreId}/reference/{id}/metadata",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReferenceMetadataRequest",
}) as any as S.Schema<GetReferenceMetadataRequest>;
export interface ReadSetS3Access {
  s3Uri?: string;
}
export const ReadSetS3Access = S.suspend(() =>
  S.Struct({ s3Uri: S.optional(S.String) }),
).annotate({
  identifier: "ReadSetS3Access",
}) as any as S.Schema<ReadSetS3Access>;
export interface FileInformation {
  totalParts?: number;
  partSize?: number;
  contentLength?: number;
  s3Access?: ReadSetS3Access;
}
export const FileInformation = S.suspend(() =>
  S.Struct({
    totalParts: S.optional(S.Number),
    partSize: S.optional(S.Number),
    contentLength: S.optional(S.Number),
    s3Access: S.optional(ReadSetS3Access),
  }),
).annotate({
  identifier: "FileInformation",
}) as any as S.Schema<FileInformation>;
export interface ReferenceFiles {
  source?: FileInformation;
  index?: FileInformation;
}
export const ReferenceFiles = S.suspend(() =>
  S.Struct({
    source: S.optional(FileInformation),
    index: S.optional(FileInformation),
  }),
).annotate({ identifier: "ReferenceFiles" }) as any as S.Schema<ReferenceFiles>;
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
export const GetReferenceMetadataResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    referenceStoreId: S.String,
    md5: S.String,
    status: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    files: S.optional(ReferenceFiles),
    creationType: S.optional(S.String),
    creationJobId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetReferenceMetadataResponse",
}) as any as S.Schema<GetReferenceMetadataResponse>;
export interface DeleteReferenceRequest {
  id: string;
  referenceStoreId: string;
}
export const DeleteReferenceRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/referencestore/{referenceStoreId}/reference/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReferenceRequest",
}) as any as S.Schema<DeleteReferenceRequest>;
export interface DeleteReferenceResponse {}
export const DeleteReferenceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteReferenceResponse",
}) as any as S.Schema<DeleteReferenceResponse>;
export interface ReferenceFilter {
  name?: string;
  md5?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ReferenceFilter = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    md5: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ReferenceFilter",
}) as any as S.Schema<ReferenceFilter>;
export interface ListReferencesRequest {
  referenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ReferenceFilter;
}
export const ListReferencesRequest = S.suspend(() =>
  S.Struct({
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ReferenceFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/referencestore/{referenceStoreId}/references",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReferencesRequest",
}) as any as S.Schema<ListReferencesRequest>;
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
export const ReferenceListItem = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    referenceStoreId: S.String,
    md5: S.String,
    status: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ReferenceListItem",
}) as any as S.Schema<ReferenceListItem>;
export type ReferenceList = ReferenceListItem[];
export const ReferenceList = S.Array(ReferenceListItem);
export interface ListReferencesResponse {
  nextToken?: string;
  references: ReferenceListItem[];
}
export const ListReferencesResponse = S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), references: ReferenceList }),
).annotate({
  identifier: "ListReferencesResponse",
}) as any as S.Schema<ListReferencesResponse>;
export interface GetReferenceRequest {
  id: string;
  referenceStoreId: string;
  range?: string;
  partNumber: number;
  file?: string;
}
export const GetReferenceRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
    range: S.optional(S.String).pipe(T.HttpHeader("Range")),
    partNumber: S.Number.pipe(T.HttpQuery("partNumber")),
    file: S.optional(S.String).pipe(T.HttpQuery("file")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/referencestore/{referenceStoreId}/reference/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReferenceRequest",
}) as any as S.Schema<GetReferenceRequest>;
export interface GetReferenceResponse {
  payload?: T.StreamingOutputBody;
}
export const GetReferenceResponse = S.suspend(() =>
  S.Struct({ payload: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
).annotate({
  identifier: "GetReferenceResponse",
}) as any as S.Schema<GetReferenceResponse>;
export interface CreateRunCacheRequest {
  cacheBehavior?: string;
  cacheS3Location: string;
  description?: string;
  name?: string;
  requestId: string;
  tags?: { [key: string]: string | undefined };
  cacheBucketOwnerId?: string;
}
export const CreateRunCacheRequest = S.suspend(() =>
  S.Struct({
    cacheBehavior: S.optional(S.String),
    cacheS3Location: S.String,
    description: S.optional(S.String),
    name: S.optional(S.String),
    requestId: S.String.pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
    cacheBucketOwnerId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runCache" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRunCacheRequest",
}) as any as S.Schema<CreateRunCacheRequest>;
export interface CreateRunCacheResponse {
  arn?: string;
  id?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateRunCacheResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateRunCacheResponse",
}) as any as S.Schema<CreateRunCacheResponse>;
export interface GetRunCacheRequest {
  id: string;
}
export const GetRunCacheRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runCache/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRunCacheRequest",
}) as any as S.Schema<GetRunCacheRequest>;
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
export const GetRunCacheResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    cacheBehavior: S.optional(S.String),
    cacheBucketOwnerId: S.optional(S.String),
    cacheS3Uri: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetRunCacheResponse",
}) as any as S.Schema<GetRunCacheResponse>;
export interface UpdateRunCacheRequest {
  cacheBehavior?: string;
  description?: string;
  id: string;
  name?: string;
}
export const UpdateRunCacheRequest = S.suspend(() =>
  S.Struct({
    cacheBehavior: S.optional(S.String),
    description: S.optional(S.String),
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runCache/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRunCacheRequest",
}) as any as S.Schema<UpdateRunCacheRequest>;
export interface UpdateRunCacheResponse {}
export const UpdateRunCacheResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UpdateRunCacheResponse",
}) as any as S.Schema<UpdateRunCacheResponse>;
export interface DeleteRunCacheRequest {
  id: string;
}
export const DeleteRunCacheRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/runCache/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRunCacheRequest",
}) as any as S.Schema<DeleteRunCacheRequest>;
export interface DeleteRunCacheResponse {}
export const DeleteRunCacheResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteRunCacheResponse",
}) as any as S.Schema<DeleteRunCacheResponse>;
export interface ListRunCachesRequest {
  maxResults?: number;
  startingToken?: string;
}
export const ListRunCachesRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runCache" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRunCachesRequest",
}) as any as S.Schema<ListRunCachesRequest>;
export interface RunCacheListItem {
  arn?: string;
  cacheBehavior?: string;
  cacheS3Uri?: string;
  creationTime?: Date;
  id?: string;
  name?: string;
  status?: string;
}
export const RunCacheListItem = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    cacheBehavior: S.optional(S.String),
    cacheS3Uri: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    id: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "RunCacheListItem",
}) as any as S.Schema<RunCacheListItem>;
export type RunCacheList = RunCacheListItem[];
export const RunCacheList = S.Array(RunCacheListItem);
export interface ListRunCachesResponse {
  items?: RunCacheListItem[];
  nextToken?: string;
}
export const ListRunCachesResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(RunCacheList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRunCachesResponse",
}) as any as S.Schema<ListRunCachesResponse>;
export interface CreateRunGroupRequest {
  name?: string;
  maxCpus?: number;
  maxRuns?: number;
  maxDuration?: number;
  tags?: { [key: string]: string | undefined };
  requestId: string;
  maxGpus?: number;
}
export const CreateRunGroupRequest = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    maxCpus: S.optional(S.Number),
    maxRuns: S.optional(S.Number),
    maxDuration: S.optional(S.Number),
    tags: S.optional(TagMap),
    requestId: S.String.pipe(T.IdempotencyToken()),
    maxGpus: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRunGroupRequest",
}) as any as S.Schema<CreateRunGroupRequest>;
export interface CreateRunGroupResponse {
  arn?: string;
  id?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateRunGroupResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateRunGroupResponse",
}) as any as S.Schema<CreateRunGroupResponse>;
export interface GetRunGroupRequest {
  id: string;
}
export const GetRunGroupRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runGroup/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRunGroupRequest",
}) as any as S.Schema<GetRunGroupRequest>;
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
export const GetRunGroupResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    maxCpus: S.optional(S.Number),
    maxRuns: S.optional(S.Number),
    maxDuration: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(TagMap),
    maxGpus: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetRunGroupResponse",
}) as any as S.Schema<GetRunGroupResponse>;
export interface UpdateRunGroupRequest {
  id: string;
  name?: string;
  maxCpus?: number;
  maxRuns?: number;
  maxDuration?: number;
  maxGpus?: number;
}
export const UpdateRunGroupRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
    maxCpus: S.optional(S.Number),
    maxRuns: S.optional(S.Number),
    maxDuration: S.optional(S.Number),
    maxGpus: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runGroup/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRunGroupRequest",
}) as any as S.Schema<UpdateRunGroupRequest>;
export interface UpdateRunGroupResponse {}
export const UpdateRunGroupResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UpdateRunGroupResponse",
}) as any as S.Schema<UpdateRunGroupResponse>;
export interface DeleteRunGroupRequest {
  id: string;
}
export const DeleteRunGroupRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/runGroup/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRunGroupRequest",
}) as any as S.Schema<DeleteRunGroupRequest>;
export interface DeleteRunGroupResponse {}
export const DeleteRunGroupResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteRunGroupResponse",
}) as any as S.Schema<DeleteRunGroupResponse>;
export interface ListRunGroupsRequest {
  name?: string;
  startingToken?: string;
  maxResults?: number;
}
export const ListRunGroupsRequest = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRunGroupsRequest",
}) as any as S.Schema<ListRunGroupsRequest>;
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
export const RunGroupListItem = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    maxCpus: S.optional(S.Number),
    maxRuns: S.optional(S.Number),
    maxDuration: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    maxGpus: S.optional(S.Number),
  }),
).annotate({
  identifier: "RunGroupListItem",
}) as any as S.Schema<RunGroupListItem>;
export type RunGroupList = RunGroupListItem[];
export const RunGroupList = S.Array(RunGroupListItem);
export interface ListRunGroupsResponse {
  items?: RunGroupListItem[];
  nextToken?: string;
}
export const ListRunGroupsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(RunGroupList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRunGroupsResponse",
}) as any as S.Schema<ListRunGroupsResponse>;
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
}
export const StartRunRequest = S.suspend(() =>
  S.Struct({
    workflowId: S.optional(S.String),
    workflowType: S.optional(S.String),
    runId: S.optional(S.String),
    roleArn: S.String,
    name: S.optional(S.String),
    cacheId: S.optional(S.String),
    cacheBehavior: S.optional(S.String),
    runGroupId: S.optional(S.String),
    priority: S.optional(S.Number),
    parameters: S.optional(S.Top),
    storageCapacity: S.optional(S.Number),
    outputUri: S.String,
    logLevel: S.optional(S.String),
    tags: S.optional(TagMap),
    requestId: S.String.pipe(T.IdempotencyToken()),
    retentionMode: S.optional(S.String),
    storageType: S.optional(S.String),
    workflowOwnerId: S.optional(S.String),
    workflowVersionName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/run" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartRunRequest",
}) as any as S.Schema<StartRunRequest>;
export interface StartRunResponse {
  arn?: string;
  id?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
  uuid?: string;
  runOutputUri?: string;
}
export const StartRunResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(S.String),
    tags: S.optional(TagMap),
    uuid: S.optional(S.String),
    runOutputUri: S.optional(S.String),
  }),
).annotate({
  identifier: "StartRunResponse",
}) as any as S.Schema<StartRunResponse>;
export type RunExportList = string[];
export const RunExportList = S.Array(S.String);
export interface GetRunRequest {
  id: string;
  export?: string[];
}
export const GetRunRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    export: S.optional(RunExportList).pipe(T.HttpQuery("export")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/run/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetRunRequest" }) as any as S.Schema<GetRunRequest>;
export type RunResourceDigests = { [key: string]: string | undefined };
export const RunResourceDigests = S.Record(S.String, S.String.pipe(S.optional));
export interface RunLogLocation {
  engineLogStream?: string;
  runLogStream?: string;
}
export const RunLogLocation = S.suspend(() =>
  S.Struct({
    engineLogStream: S.optional(S.String),
    runLogStream: S.optional(S.String),
  }),
).annotate({ identifier: "RunLogLocation" }) as any as S.Schema<RunLogLocation>;
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
}
export const GetRunResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    cacheId: S.optional(S.String),
    cacheBehavior: S.optional(S.String),
    engineVersion: S.optional(S.String),
    status: S.optional(S.String),
    workflowId: S.optional(S.String),
    workflowType: S.optional(S.String),
    runId: S.optional(S.String),
    roleArn: S.optional(S.String),
    name: S.optional(S.String),
    runGroupId: S.optional(S.String),
    priority: S.optional(S.Number),
    definition: S.optional(S.String),
    digest: S.optional(S.String),
    parameters: S.optional(S.Top),
    storageCapacity: S.optional(S.Number),
    outputUri: S.optional(S.String),
    logLevel: S.optional(S.String),
    resourceDigests: S.optional(RunResourceDigests),
    startedBy: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    stopTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    statusMessage: S.optional(S.String),
    tags: S.optional(TagMap),
    accelerators: S.optional(S.String),
    retentionMode: S.optional(S.String),
    failureReason: S.optional(S.String),
    logLocation: S.optional(RunLogLocation),
    uuid: S.optional(S.String),
    runOutputUri: S.optional(S.String),
    storageType: S.optional(S.String),
    workflowOwnerId: S.optional(S.String),
    workflowVersionName: S.optional(S.String),
    workflowUuid: S.optional(S.String),
  }),
).annotate({ identifier: "GetRunResponse" }) as any as S.Schema<GetRunResponse>;
export interface DeleteRunRequest {
  id: string;
}
export const DeleteRunRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/run/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRunRequest",
}) as any as S.Schema<DeleteRunRequest>;
export interface DeleteRunResponse {}
export const DeleteRunResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteRunResponse",
}) as any as S.Schema<DeleteRunResponse>;
export interface ListRunsRequest {
  name?: string;
  runGroupId?: string;
  startingToken?: string;
  maxResults?: number;
  status?: string;
}
export const ListRunsRequest = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    runGroupId: S.optional(S.String).pipe(T.HttpQuery("runGroupId")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    status: S.optional(S.String).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(T.Http({ method: "GET", uri: "/run" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRunsRequest",
}) as any as S.Schema<ListRunsRequest>;
export interface RunListItem {
  arn?: string;
  id?: string;
  status?: string;
  workflowId?: string;
  name?: string;
  priority?: number;
  storageCapacity?: number;
  creationTime?: Date;
  startTime?: Date;
  stopTime?: Date;
  storageType?: string;
  workflowVersionName?: string;
}
export const RunListItem = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(S.String),
    workflowId: S.optional(S.String),
    name: S.optional(S.String),
    priority: S.optional(S.Number),
    storageCapacity: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    stopTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    storageType: S.optional(S.String),
    workflowVersionName: S.optional(S.String),
  }),
).annotate({ identifier: "RunListItem" }) as any as S.Schema<RunListItem>;
export type RunList = RunListItem[];
export const RunList = S.Array(RunListItem);
export interface ListRunsResponse {
  items?: RunListItem[];
  nextToken?: string;
}
export const ListRunsResponse = S.suspend(() =>
  S.Struct({ items: S.optional(RunList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRunsResponse",
}) as any as S.Schema<ListRunsResponse>;
export interface CancelRunRequest {
  id: string;
}
export const CancelRunRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/run/{id}/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelRunRequest",
}) as any as S.Schema<CancelRunRequest>;
export interface CancelRunResponse {}
export const CancelRunResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "CancelRunResponse",
}) as any as S.Schema<CancelRunResponse>;
export interface GetRunTaskRequest {
  id: string;
  taskId: string;
}
export const GetRunTaskRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    taskId: S.String.pipe(T.HttpLabel("taskId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/run/{id}/task/{taskId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRunTaskRequest",
}) as any as S.Schema<GetRunTaskRequest>;
export interface ImageDetails {
  image?: string;
  imageDigest?: string;
  sourceImage?: string;
}
export const ImageDetails = S.suspend(() =>
  S.Struct({
    image: S.optional(S.String),
    imageDigest: S.optional(S.String),
    sourceImage: S.optional(S.String),
  }),
).annotate({ identifier: "ImageDetails" }) as any as S.Schema<ImageDetails>;
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
}
export const GetRunTaskResponse = S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    status: S.optional(S.String),
    name: S.optional(S.String),
    cpus: S.optional(S.Number),
    cacheHit: S.optional(S.Boolean),
    cacheS3Uri: S.optional(S.String),
    memory: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    stopTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    statusMessage: S.optional(S.String),
    logStream: S.optional(S.String),
    gpus: S.optional(S.Number),
    instanceType: S.optional(S.String),
    failureReason: S.optional(S.String),
    imageDetails: S.optional(ImageDetails),
  }),
).annotate({
  identifier: "GetRunTaskResponse",
}) as any as S.Schema<GetRunTaskResponse>;
export interface ListRunTasksRequest {
  id: string;
  status?: string;
  startingToken?: string;
  maxResults?: number;
}
export const ListRunTasksRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    status: S.optional(S.String).pipe(T.HttpQuery("status")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/run/{id}/task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRunTasksRequest",
}) as any as S.Schema<ListRunTasksRequest>;
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
}
export const TaskListItem = S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    status: S.optional(S.String),
    name: S.optional(S.String),
    cpus: S.optional(S.Number),
    cacheHit: S.optional(S.Boolean),
    cacheS3Uri: S.optional(S.String),
    memory: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    stopTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    gpus: S.optional(S.Number),
    instanceType: S.optional(S.String),
  }),
).annotate({ identifier: "TaskListItem" }) as any as S.Schema<TaskListItem>;
export type TaskList = TaskListItem[];
export const TaskList = S.Array(TaskListItem);
export interface ListRunTasksResponse {
  items?: TaskListItem[];
  nextToken?: string;
}
export const ListRunTasksResponse = S.suspend(() =>
  S.Struct({ items: S.optional(TaskList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRunTasksResponse",
}) as any as S.Schema<ListRunTasksResponse>;
export type PropagatedSetLevelTags = string[];
export const PropagatedSetLevelTags = S.Array(S.String);
export interface S3AccessConfig {
  accessLogLocation?: string;
}
export const S3AccessConfig = S.suspend(() =>
  S.Struct({ accessLogLocation: S.optional(S.String) }),
).annotate({ identifier: "S3AccessConfig" }) as any as S.Schema<S3AccessConfig>;
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
export const CreateSequenceStoreRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    fallbackLocation: S.optional(S.String),
    eTagAlgorithmFamily: S.optional(S.String),
    propagatedSetLevelTags: S.optional(PropagatedSetLevelTags),
    s3AccessConfig: S.optional(S3AccessConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sequencestore" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSequenceStoreRequest",
}) as any as S.Schema<CreateSequenceStoreRequest>;
export interface SequenceStoreS3Access {
  s3Uri?: string;
  s3AccessPointArn?: string;
  accessLogLocation?: string;
}
export const SequenceStoreS3Access = S.suspend(() =>
  S.Struct({
    s3Uri: S.optional(S.String),
    s3AccessPointArn: S.optional(S.String),
    accessLogLocation: S.optional(S.String),
  }),
).annotate({
  identifier: "SequenceStoreS3Access",
}) as any as S.Schema<SequenceStoreS3Access>;
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
export const CreateSequenceStoreResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fallbackLocation: S.optional(S.String),
    eTagAlgorithmFamily: S.optional(S.String),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    propagatedSetLevelTags: S.optional(PropagatedSetLevelTags),
    s3Access: S.optional(SequenceStoreS3Access),
  }),
).annotate({
  identifier: "CreateSequenceStoreResponse",
}) as any as S.Schema<CreateSequenceStoreResponse>;
export interface GetSequenceStoreRequest {
  id: string;
}
export const GetSequenceStoreRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sequencestore/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSequenceStoreRequest",
}) as any as S.Schema<GetSequenceStoreRequest>;
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
export const GetSequenceStoreResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fallbackLocation: S.optional(S.String),
    s3Access: S.optional(SequenceStoreS3Access),
    eTagAlgorithmFamily: S.optional(S.String),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    propagatedSetLevelTags: S.optional(PropagatedSetLevelTags),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetSequenceStoreResponse",
}) as any as S.Schema<GetSequenceStoreResponse>;
export interface UpdateSequenceStoreRequest {
  id: string;
  name?: string;
  description?: string;
  clientToken?: string;
  fallbackLocation?: string;
  propagatedSetLevelTags?: string[];
  s3AccessConfig?: S3AccessConfig;
}
export const UpdateSequenceStoreRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    fallbackLocation: S.optional(S.String),
    propagatedSetLevelTags: S.optional(PropagatedSetLevelTags),
    s3AccessConfig: S.optional(S3AccessConfig),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/sequencestore/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSequenceStoreRequest",
}) as any as S.Schema<UpdateSequenceStoreRequest>;
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
export const UpdateSequenceStoreResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    propagatedSetLevelTags: S.optional(PropagatedSetLevelTags),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    fallbackLocation: S.optional(S.String),
    s3Access: S.optional(SequenceStoreS3Access),
    eTagAlgorithmFamily: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateSequenceStoreResponse",
}) as any as S.Schema<UpdateSequenceStoreResponse>;
export interface DeleteSequenceStoreRequest {
  id: string;
}
export const DeleteSequenceStoreRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/sequencestore/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSequenceStoreRequest",
}) as any as S.Schema<DeleteSequenceStoreRequest>;
export interface DeleteSequenceStoreResponse {}
export const DeleteSequenceStoreResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSequenceStoreResponse",
}) as any as S.Schema<DeleteSequenceStoreResponse>;
export interface SequenceStoreFilter {
  name?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  status?: string;
  updatedAfter?: Date;
  updatedBefore?: Date;
}
export const SequenceStoreFilter = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    status: S.optional(S.String),
    updatedAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "SequenceStoreFilter",
}) as any as S.Schema<SequenceStoreFilter>;
export interface ListSequenceStoresRequest {
  maxResults?: number;
  nextToken?: string;
  filter?: SequenceStoreFilter;
}
export const ListSequenceStoresRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(SequenceStoreFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sequencestores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSequenceStoresRequest",
}) as any as S.Schema<ListSequenceStoresRequest>;
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
export const SequenceStoreDetail = S.suspend(() =>
  S.Struct({
    arn: S.String,
    id: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fallbackLocation: S.optional(S.String),
    eTagAlgorithmFamily: S.optional(S.String),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "SequenceStoreDetail",
}) as any as S.Schema<SequenceStoreDetail>;
export type SequenceStoreDetailList = SequenceStoreDetail[];
export const SequenceStoreDetailList = S.Array(SequenceStoreDetail);
export interface ListSequenceStoresResponse {
  nextToken?: string;
  sequenceStores: SequenceStoreDetail[];
}
export const ListSequenceStoresResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    sequenceStores: SequenceStoreDetailList,
  }),
).annotate({
  identifier: "ListSequenceStoresResponse",
}) as any as S.Schema<ListSequenceStoresResponse>;
export interface AbortMultipartReadSetUploadRequest {
  sequenceStoreId: string;
  uploadId: string;
}
export const AbortMultipartReadSetUploadRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    uploadId: S.String.pipe(T.HttpLabel("uploadId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sequencestore/{sequenceStoreId}/upload/{uploadId}/abort",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AbortMultipartReadSetUploadRequest",
}) as any as S.Schema<AbortMultipartReadSetUploadRequest>;
export interface AbortMultipartReadSetUploadResponse {}
export const AbortMultipartReadSetUploadResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AbortMultipartReadSetUploadResponse",
}) as any as S.Schema<AbortMultipartReadSetUploadResponse>;
export interface CompleteReadSetUploadPartListItem {
  partNumber: number;
  partSource: string;
  checksum: string;
}
export const CompleteReadSetUploadPartListItem = S.suspend(() =>
  S.Struct({ partNumber: S.Number, partSource: S.String, checksum: S.String }),
).annotate({
  identifier: "CompleteReadSetUploadPartListItem",
}) as any as S.Schema<CompleteReadSetUploadPartListItem>;
export type CompleteReadSetUploadPartList = CompleteReadSetUploadPartListItem[];
export const CompleteReadSetUploadPartList = S.Array(
  CompleteReadSetUploadPartListItem,
);
export interface CompleteMultipartReadSetUploadRequest {
  sequenceStoreId: string;
  uploadId: string;
  parts: CompleteReadSetUploadPartListItem[];
}
export const CompleteMultipartReadSetUploadRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    uploadId: S.String.pipe(T.HttpLabel("uploadId")),
    parts: CompleteReadSetUploadPartList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/upload/{uploadId}/complete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CompleteMultipartReadSetUploadRequest",
}) as any as S.Schema<CompleteMultipartReadSetUploadRequest>;
export interface CompleteMultipartReadSetUploadResponse {
  readSetId: string;
}
export const CompleteMultipartReadSetUploadResponse = S.suspend(() =>
  S.Struct({ readSetId: S.String }),
).annotate({
  identifier: "CompleteMultipartReadSetUploadResponse",
}) as any as S.Schema<CompleteMultipartReadSetUploadResponse>;
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
export const CreateMultipartReadSetUploadRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    clientToken: S.optional(S.String),
    sourceFileType: S.String,
    subjectId: S.String,
    sampleId: S.String,
    generatedFrom: S.optional(S.String),
    referenceArn: S.optional(S.String),
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/upload",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMultipartReadSetUploadRequest",
}) as any as S.Schema<CreateMultipartReadSetUploadRequest>;
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
export const CreateMultipartReadSetUploadResponse = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String,
    uploadId: S.String,
    sourceFileType: S.String,
    subjectId: S.String,
    sampleId: S.String,
    generatedFrom: S.optional(S.String),
    referenceArn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateMultipartReadSetUploadResponse",
}) as any as S.Schema<CreateMultipartReadSetUploadResponse>;
export interface GetReadSetActivationJobRequest {
  id: string;
  sequenceStoreId: string;
}
export const GetReadSetActivationJobRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sequencestore/{sequenceStoreId}/activationjob/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadSetActivationJobRequest",
}) as any as S.Schema<GetReadSetActivationJobRequest>;
export interface ActivateReadSetSourceItem {
  readSetId: string;
  status: string;
  statusMessage?: string;
}
export const ActivateReadSetSourceItem = S.suspend(() =>
  S.Struct({
    readSetId: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ActivateReadSetSourceItem",
}) as any as S.Schema<ActivateReadSetSourceItem>;
export type ActivateReadSetSourceList = ActivateReadSetSourceItem[];
export const ActivateReadSetSourceList = S.Array(ActivateReadSetSourceItem);
export interface GetReadSetActivationJobResponse {
  id: string;
  sequenceStoreId: string;
  status: string;
  statusMessage?: string;
  creationTime: Date;
  completionTime?: Date;
  sources?: ActivateReadSetSourceItem[];
}
export const GetReadSetActivationJobResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sources: S.optional(ActivateReadSetSourceList),
  }),
).annotate({
  identifier: "GetReadSetActivationJobResponse",
}) as any as S.Schema<GetReadSetActivationJobResponse>;
export interface GetReadSetExportJobRequest {
  sequenceStoreId: string;
  id: string;
}
export const GetReadSetExportJobRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sequencestore/{sequenceStoreId}/exportjob/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadSetExportJobRequest",
}) as any as S.Schema<GetReadSetExportJobRequest>;
export interface ExportReadSetDetail {
  id: string;
  status: string;
  statusMessage?: string;
}
export const ExportReadSetDetail = S.suspend(() =>
  S.Struct({
    id: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ExportReadSetDetail",
}) as any as S.Schema<ExportReadSetDetail>;
export type ExportReadSetDetailList = ExportReadSetDetail[];
export const ExportReadSetDetailList = S.Array(ExportReadSetDetail);
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
export const GetReadSetExportJobResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    destination: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    readSets: S.optional(ExportReadSetDetailList),
  }),
).annotate({
  identifier: "GetReadSetExportJobResponse",
}) as any as S.Schema<GetReadSetExportJobResponse>;
export interface GetReadSetImportJobRequest {
  id: string;
  sequenceStoreId: string;
}
export const GetReadSetImportJobRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sequencestore/{sequenceStoreId}/importjob/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadSetImportJobRequest",
}) as any as S.Schema<GetReadSetImportJobRequest>;
export interface SourceFiles {
  source1: string;
  source2?: string;
}
export const SourceFiles = S.suspend(() =>
  S.Struct({ source1: S.String, source2: S.optional(S.String) }),
).annotate({ identifier: "SourceFiles" }) as any as S.Schema<SourceFiles>;
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
export const ImportReadSetSourceItem = S.suspend(() =>
  S.Struct({
    sourceFiles: SourceFiles,
    sourceFileType: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
    subjectId: S.String,
    sampleId: S.String,
    generatedFrom: S.optional(S.String),
    referenceArn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    readSetId: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportReadSetSourceItem",
}) as any as S.Schema<ImportReadSetSourceItem>;
export type ImportReadSetSourceList = ImportReadSetSourceItem[];
export const ImportReadSetSourceList = S.Array(ImportReadSetSourceItem);
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
export const GetReadSetImportJobResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sources: ImportReadSetSourceList,
  }),
).annotate({
  identifier: "GetReadSetImportJobResponse",
}) as any as S.Schema<GetReadSetImportJobResponse>;
export interface ListMultipartReadSetUploadsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListMultipartReadSetUploadsRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/uploads",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMultipartReadSetUploadsRequest",
}) as any as S.Schema<ListMultipartReadSetUploadsRequest>;
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
export const MultipartReadSetUploadListItem = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String,
    uploadId: S.String,
    sourceFileType: S.String,
    subjectId: S.String,
    sampleId: S.String,
    generatedFrom: S.String,
    referenceArn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "MultipartReadSetUploadListItem",
}) as any as S.Schema<MultipartReadSetUploadListItem>;
export type MultipartReadSetUploadList = MultipartReadSetUploadListItem[];
export const MultipartReadSetUploadList = S.Array(
  MultipartReadSetUploadListItem,
);
export interface ListMultipartReadSetUploadsResponse {
  nextToken?: string;
  uploads?: MultipartReadSetUploadListItem[];
}
export const ListMultipartReadSetUploadsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    uploads: S.optional(MultipartReadSetUploadList),
  }),
).annotate({
  identifier: "ListMultipartReadSetUploadsResponse",
}) as any as S.Schema<ListMultipartReadSetUploadsResponse>;
export interface ActivateReadSetFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ActivateReadSetFilter = S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ActivateReadSetFilter",
}) as any as S.Schema<ActivateReadSetFilter>;
export interface ListReadSetActivationJobsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ActivateReadSetFilter;
}
export const ListReadSetActivationJobsRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ActivateReadSetFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/activationjobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadSetActivationJobsRequest",
}) as any as S.Schema<ListReadSetActivationJobsRequest>;
export interface ActivateReadSetJobItem {
  id: string;
  sequenceStoreId: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export const ActivateReadSetJobItem = S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ActivateReadSetJobItem",
}) as any as S.Schema<ActivateReadSetJobItem>;
export type ActivateReadSetJobList = ActivateReadSetJobItem[];
export const ActivateReadSetJobList = S.Array(ActivateReadSetJobItem);
export interface ListReadSetActivationJobsResponse {
  nextToken?: string;
  activationJobs?: ActivateReadSetJobItem[];
}
export const ListReadSetActivationJobsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    activationJobs: S.optional(ActivateReadSetJobList),
  }),
).annotate({
  identifier: "ListReadSetActivationJobsResponse",
}) as any as S.Schema<ListReadSetActivationJobsResponse>;
export interface ExportReadSetFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ExportReadSetFilter = S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ExportReadSetFilter",
}) as any as S.Schema<ExportReadSetFilter>;
export interface ListReadSetExportJobsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ExportReadSetFilter;
}
export const ListReadSetExportJobsRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ExportReadSetFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/exportjobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadSetExportJobsRequest",
}) as any as S.Schema<ListReadSetExportJobsRequest>;
export interface ExportReadSetJobDetail {
  id: string;
  sequenceStoreId: string;
  destination: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export const ExportReadSetJobDetail = S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    destination: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ExportReadSetJobDetail",
}) as any as S.Schema<ExportReadSetJobDetail>;
export type ExportReadSetJobDetailList = ExportReadSetJobDetail[];
export const ExportReadSetJobDetailList = S.Array(ExportReadSetJobDetail);
export interface ListReadSetExportJobsResponse {
  nextToken?: string;
  exportJobs?: ExportReadSetJobDetail[];
}
export const ListReadSetExportJobsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    exportJobs: S.optional(ExportReadSetJobDetailList),
  }),
).annotate({
  identifier: "ListReadSetExportJobsResponse",
}) as any as S.Schema<ListReadSetExportJobsResponse>;
export interface ImportReadSetFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ImportReadSetFilter = S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ImportReadSetFilter",
}) as any as S.Schema<ImportReadSetFilter>;
export interface ListReadSetImportJobsRequest {
  maxResults?: number;
  nextToken?: string;
  sequenceStoreId: string;
  filter?: ImportReadSetFilter;
}
export const ListReadSetImportJobsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    filter: S.optional(ImportReadSetFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/importjobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadSetImportJobsRequest",
}) as any as S.Schema<ListReadSetImportJobsRequest>;
export interface ImportReadSetJobItem {
  id: string;
  sequenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export const ImportReadSetJobItem = S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ImportReadSetJobItem",
}) as any as S.Schema<ImportReadSetJobItem>;
export type ImportReadSetJobList = ImportReadSetJobItem[];
export const ImportReadSetJobList = S.Array(ImportReadSetJobItem);
export interface ListReadSetImportJobsResponse {
  nextToken?: string;
  importJobs?: ImportReadSetJobItem[];
}
export const ListReadSetImportJobsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    importJobs: S.optional(ImportReadSetJobList),
  }),
).annotate({
  identifier: "ListReadSetImportJobsResponse",
}) as any as S.Schema<ListReadSetImportJobsResponse>;
export interface ReadSetUploadPartListFilter {
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ReadSetUploadPartListFilter = S.suspend(() =>
  S.Struct({
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ReadSetUploadPartListFilter",
}) as any as S.Schema<ReadSetUploadPartListFilter>;
export interface ListReadSetUploadPartsRequest {
  sequenceStoreId: string;
  uploadId: string;
  partSource: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ReadSetUploadPartListFilter;
}
export const ListReadSetUploadPartsRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    uploadId: S.String.pipe(T.HttpLabel("uploadId")),
    partSource: S.String,
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ReadSetUploadPartListFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/upload/{uploadId}/parts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadSetUploadPartsRequest",
}) as any as S.Schema<ListReadSetUploadPartsRequest>;
export interface ReadSetUploadPartListItem {
  partNumber: number;
  partSize: number;
  partSource: string;
  checksum: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
}
export const ReadSetUploadPartListItem = S.suspend(() =>
  S.Struct({
    partNumber: S.Number,
    partSize: S.Number,
    partSource: S.String,
    checksum: S.String,
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ReadSetUploadPartListItem",
}) as any as S.Schema<ReadSetUploadPartListItem>;
export type ReadSetUploadPartList = ReadSetUploadPartListItem[];
export const ReadSetUploadPartList = S.Array(ReadSetUploadPartListItem);
export interface ListReadSetUploadPartsResponse {
  nextToken?: string;
  parts?: ReadSetUploadPartListItem[];
}
export const ListReadSetUploadPartsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    parts: S.optional(ReadSetUploadPartList),
  }),
).annotate({
  identifier: "ListReadSetUploadPartsResponse",
}) as any as S.Schema<ListReadSetUploadPartsResponse>;
export interface StartReadSetActivationJobSourceItem {
  readSetId: string;
}
export const StartReadSetActivationJobSourceItem = S.suspend(() =>
  S.Struct({ readSetId: S.String }),
).annotate({
  identifier: "StartReadSetActivationJobSourceItem",
}) as any as S.Schema<StartReadSetActivationJobSourceItem>;
export type StartReadSetActivationJobSourceList =
  StartReadSetActivationJobSourceItem[];
export const StartReadSetActivationJobSourceList = S.Array(
  StartReadSetActivationJobSourceItem,
);
export interface StartReadSetActivationJobRequest {
  sequenceStoreId: string;
  clientToken?: string;
  sources: StartReadSetActivationJobSourceItem[];
}
export const StartReadSetActivationJobRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    clientToken: S.optional(S.String),
    sources: StartReadSetActivationJobSourceList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/activationjob",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReadSetActivationJobRequest",
}) as any as S.Schema<StartReadSetActivationJobRequest>;
export interface StartReadSetActivationJobResponse {
  id: string;
  sequenceStoreId: string;
  status: string;
  creationTime: Date;
}
export const StartReadSetActivationJobResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StartReadSetActivationJobResponse",
}) as any as S.Schema<StartReadSetActivationJobResponse>;
export interface ExportReadSet {
  readSetId: string;
}
export const ExportReadSet = S.suspend(() =>
  S.Struct({ readSetId: S.String }),
).annotate({ identifier: "ExportReadSet" }) as any as S.Schema<ExportReadSet>;
export type ExportReadSetList = ExportReadSet[];
export const ExportReadSetList = S.Array(ExportReadSet);
export interface StartReadSetExportJobRequest {
  sequenceStoreId: string;
  destination: string;
  roleArn: string;
  clientToken?: string;
  sources: ExportReadSet[];
}
export const StartReadSetExportJobRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    destination: S.String,
    roleArn: S.String,
    clientToken: S.optional(S.String),
    sources: ExportReadSetList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/exportjob",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReadSetExportJobRequest",
}) as any as S.Schema<StartReadSetExportJobRequest>;
export interface StartReadSetExportJobResponse {
  id: string;
  sequenceStoreId: string;
  destination: string;
  status: string;
  creationTime: Date;
}
export const StartReadSetExportJobResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    destination: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StartReadSetExportJobResponse",
}) as any as S.Schema<StartReadSetExportJobResponse>;
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
export const StartReadSetImportJobSourceItem = S.suspend(() =>
  S.Struct({
    sourceFiles: SourceFiles,
    sourceFileType: S.String,
    subjectId: S.String,
    sampleId: S.String,
    generatedFrom: S.optional(S.String),
    referenceArn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "StartReadSetImportJobSourceItem",
}) as any as S.Schema<StartReadSetImportJobSourceItem>;
export type StartReadSetImportJobSourceList = StartReadSetImportJobSourceItem[];
export const StartReadSetImportJobSourceList = S.Array(
  StartReadSetImportJobSourceItem,
);
export interface StartReadSetImportJobRequest {
  sequenceStoreId: string;
  roleArn: string;
  clientToken?: string;
  sources: StartReadSetImportJobSourceItem[];
}
export const StartReadSetImportJobRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    roleArn: S.String,
    clientToken: S.optional(S.String),
    sources: StartReadSetImportJobSourceList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/importjob",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReadSetImportJobRequest",
}) as any as S.Schema<StartReadSetImportJobRequest>;
export interface StartReadSetImportJobResponse {
  id: string;
  sequenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
}
export const StartReadSetImportJobResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StartReadSetImportJobResponse",
}) as any as S.Schema<StartReadSetImportJobResponse>;
export interface UploadReadSetPartRequest {
  sequenceStoreId: string;
  uploadId: string;
  partSource: string;
  partNumber: number;
  payload: T.StreamingInputBody;
}
export const UploadReadSetPartRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    uploadId: S.String.pipe(T.HttpLabel("uploadId")),
    partSource: S.String.pipe(T.HttpQuery("partSource")),
    partNumber: S.Number.pipe(T.HttpQuery("partNumber")),
    payload: T.StreamingInput.pipe(T.RequiresLength()).pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/sequencestore/{sequenceStoreId}/upload/{uploadId}/part",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UploadReadSetPartRequest",
}) as any as S.Schema<UploadReadSetPartRequest>;
export interface UploadReadSetPartResponse {
  checksum: string;
}
export const UploadReadSetPartResponse = S.suspend(() =>
  S.Struct({ checksum: S.String }),
).annotate({
  identifier: "UploadReadSetPartResponse",
}) as any as S.Schema<UploadReadSetPartResponse>;
export interface GetReadSetMetadataRequest {
  id: string;
  sequenceStoreId: string;
}
export const GetReadSetMetadataRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sequencestore/{sequenceStoreId}/readset/{id}/metadata",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadSetMetadataRequest",
}) as any as S.Schema<GetReadSetMetadataRequest>;
export interface SequenceInformation {
  totalReadCount?: number;
  totalBaseCount?: number;
  generatedFrom?: string;
  alignment?: string;
}
export const SequenceInformation = S.suspend(() =>
  S.Struct({
    totalReadCount: S.optional(S.Number),
    totalBaseCount: S.optional(S.Number),
    generatedFrom: S.optional(S.String),
    alignment: S.optional(S.String),
  }),
).annotate({
  identifier: "SequenceInformation",
}) as any as S.Schema<SequenceInformation>;
export interface ReadSetFiles {
  source1?: FileInformation;
  source2?: FileInformation;
  index?: FileInformation;
}
export const ReadSetFiles = S.suspend(() =>
  S.Struct({
    source1: S.optional(FileInformation),
    source2: S.optional(FileInformation),
    index: S.optional(FileInformation),
  }),
).annotate({ identifier: "ReadSetFiles" }) as any as S.Schema<ReadSetFiles>;
export interface ETag {
  algorithm?: string;
  source1?: string;
  source2?: string;
}
export const ETag = S.suspend(() =>
  S.Struct({
    algorithm: S.optional(S.String),
    source1: S.optional(S.String),
    source2: S.optional(S.String),
  }),
).annotate({ identifier: "ETag" }) as any as S.Schema<ETag>;
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
export const GetReadSetMetadataResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    sequenceStoreId: S.String,
    subjectId: S.optional(S.String),
    sampleId: S.optional(S.String),
    status: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    fileType: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    sequenceInformation: S.optional(SequenceInformation),
    referenceArn: S.optional(S.String),
    files: S.optional(ReadSetFiles),
    statusMessage: S.optional(S.String),
    creationType: S.optional(S.String),
    etag: S.optional(ETag),
    creationJobId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetReadSetMetadataResponse",
}) as any as S.Schema<GetReadSetMetadataResponse>;
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
export const ReadSetFilter = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    status: S.optional(S.String),
    referenceArn: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sampleId: S.optional(S.String),
    subjectId: S.optional(S.String),
    generatedFrom: S.optional(S.String),
    creationType: S.optional(S.String),
  }),
).annotate({ identifier: "ReadSetFilter" }) as any as S.Schema<ReadSetFilter>;
export interface ListReadSetsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ReadSetFilter;
}
export const ListReadSetsRequest = S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ReadSetFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/readsets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadSetsRequest",
}) as any as S.Schema<ListReadSetsRequest>;
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
export const ReadSetListItem = S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    sequenceStoreId: S.String,
    subjectId: S.optional(S.String),
    sampleId: S.optional(S.String),
    status: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    referenceArn: S.optional(S.String),
    fileType: S.String,
    sequenceInformation: S.optional(SequenceInformation),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusMessage: S.optional(S.String),
    creationType: S.optional(S.String),
    etag: S.optional(ETag),
  }),
).annotate({
  identifier: "ReadSetListItem",
}) as any as S.Schema<ReadSetListItem>;
export type ReadSetList = ReadSetListItem[];
export const ReadSetList = S.Array(ReadSetListItem);
export interface ListReadSetsResponse {
  nextToken?: string;
  readSets: ReadSetListItem[];
}
export const ListReadSetsResponse = S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), readSets: ReadSetList }),
).annotate({
  identifier: "ListReadSetsResponse",
}) as any as S.Schema<ListReadSetsResponse>;
export interface GetReadSetRequest {
  id: string;
  sequenceStoreId: string;
  file?: string;
  partNumber: number;
}
export const GetReadSetRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    file: S.optional(S.String).pipe(T.HttpQuery("file")),
    partNumber: S.Number.pipe(T.HttpQuery("partNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sequencestore/{sequenceStoreId}/readset/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadSetRequest",
}) as any as S.Schema<GetReadSetRequest>;
export interface GetReadSetResponse {
  payload?: T.StreamingOutputBody;
}
export const GetReadSetResponse = S.suspend(() =>
  S.Struct({ payload: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
).annotate({
  identifier: "GetReadSetResponse",
}) as any as S.Schema<GetReadSetResponse>;
export type ReadSetIdList = string[];
export const ReadSetIdList = S.Array(S.String);
export interface BatchDeleteReadSetRequest {
  ids: string[];
  sequenceStoreId: string;
}
export const BatchDeleteReadSetRequest = S.suspend(() =>
  S.Struct({
    ids: ReadSetIdList,
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/readset/batch/delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteReadSetRequest",
}) as any as S.Schema<BatchDeleteReadSetRequest>;
export interface ReadSetBatchError {
  id: string;
  code: string;
  message: string;
}
export const ReadSetBatchError = S.suspend(() =>
  S.Struct({ id: S.String, code: S.String, message: S.String }),
).annotate({
  identifier: "ReadSetBatchError",
}) as any as S.Schema<ReadSetBatchError>;
export type ReadSetBatchErrorList = ReadSetBatchError[];
export const ReadSetBatchErrorList = S.Array(ReadSetBatchError);
export interface BatchDeleteReadSetResponse {
  errors?: ReadSetBatchError[];
}
export const BatchDeleteReadSetResponse = S.suspend(() =>
  S.Struct({ errors: S.optional(ReadSetBatchErrorList) }),
).annotate({
  identifier: "BatchDeleteReadSetResponse",
}) as any as S.Schema<BatchDeleteReadSetResponse>;
export interface CreateShareRequest {
  resourceArn: string;
  principalSubscriber: string;
  shareName?: string;
}
export const CreateShareRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    principalSubscriber: S.String,
    shareName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/share" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateShareRequest",
}) as any as S.Schema<CreateShareRequest>;
export interface CreateShareResponse {
  shareId?: string;
  status?: string;
  shareName?: string;
}
export const CreateShareResponse = S.suspend(() =>
  S.Struct({
    shareId: S.optional(S.String),
    status: S.optional(S.String),
    shareName: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateShareResponse",
}) as any as S.Schema<CreateShareResponse>;
export interface GetShareRequest {
  shareId: string;
}
export const GetShareRequest = S.suspend(() =>
  S.Struct({ shareId: S.String.pipe(T.HttpLabel("shareId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/share/{shareId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetShareRequest",
}) as any as S.Schema<GetShareRequest>;
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
export const ShareDetails = S.suspend(() =>
  S.Struct({
    shareId: S.optional(S.String),
    resourceArn: S.optional(S.String),
    resourceId: S.optional(S.String),
    principalSubscriber: S.optional(S.String),
    ownerId: S.optional(S.String),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    shareName: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "ShareDetails" }) as any as S.Schema<ShareDetails>;
export interface GetShareResponse {
  share?: ShareDetails;
}
export const GetShareResponse = S.suspend(() =>
  S.Struct({ share: S.optional(ShareDetails) }),
).annotate({
  identifier: "GetShareResponse",
}) as any as S.Schema<GetShareResponse>;
export interface AcceptShareRequest {
  shareId: string;
}
export const AcceptShareRequest = S.suspend(() =>
  S.Struct({ shareId: S.String.pipe(T.HttpLabel("shareId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/share/{shareId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptShareRequest",
}) as any as S.Schema<AcceptShareRequest>;
export interface AcceptShareResponse {
  status?: string;
}
export const AcceptShareResponse = S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "AcceptShareResponse",
}) as any as S.Schema<AcceptShareResponse>;
export interface DeleteShareRequest {
  shareId: string;
}
export const DeleteShareRequest = S.suspend(() =>
  S.Struct({ shareId: S.String.pipe(T.HttpLabel("shareId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/share/{shareId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteShareRequest",
}) as any as S.Schema<DeleteShareRequest>;
export interface DeleteShareResponse {
  status?: string;
}
export const DeleteShareResponse = S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "DeleteShareResponse",
}) as any as S.Schema<DeleteShareResponse>;
export type ArnList = string[];
export const ArnList = S.Array(S.String);
export type StatusList = string[];
export const StatusList = S.Array(S.String);
export type TypeList = string[];
export const TypeList = S.Array(S.String);
export interface Filter {
  resourceArns?: string[];
  status?: string[];
  type?: string[];
}
export const Filter = S.suspend(() =>
  S.Struct({
    resourceArns: S.optional(ArnList),
    status: S.optional(StatusList),
    type: S.optional(TypeList),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export interface ListSharesRequest {
  resourceOwner: string;
  filter?: Filter;
  nextToken?: string;
  maxResults?: number;
}
export const ListSharesRequest = S.suspend(() =>
  S.Struct({
    resourceOwner: S.String,
    filter: S.optional(Filter),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/shares" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSharesRequest",
}) as any as S.Schema<ListSharesRequest>;
export type ShareDetailsList = ShareDetails[];
export const ShareDetailsList = S.Array(ShareDetails);
export interface ListSharesResponse {
  shares: ShareDetails[];
  nextToken?: string;
}
export const ListSharesResponse = S.suspend(() =>
  S.Struct({ shares: ShareDetailsList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSharesResponse",
}) as any as S.Schema<ListSharesResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: TagMap }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface VariantImportItemSource {
  source: string;
}
export const VariantImportItemSource = S.suspend(() =>
  S.Struct({ source: S.String }),
).annotate({
  identifier: "VariantImportItemSource",
}) as any as S.Schema<VariantImportItemSource>;
export type VariantImportItemSources = VariantImportItemSource[];
export const VariantImportItemSources = S.Array(VariantImportItemSource);
export interface StartVariantImportRequest {
  destinationName: string;
  roleArn: string;
  items: VariantImportItemSource[];
  runLeftNormalization?: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export const StartVariantImportRequest = S.suspend(() =>
  S.Struct({
    destinationName: S.String,
    roleArn: S.String,
    items: VariantImportItemSources,
    runLeftNormalization: S.optional(S.Boolean),
    annotationFields: S.optional(AnnotationFieldMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/import/variant" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartVariantImportRequest",
}) as any as S.Schema<StartVariantImportRequest>;
export interface StartVariantImportResponse {
  jobId: string;
}
export const StartVariantImportResponse = S.suspend(() =>
  S.Struct({ jobId: S.String }),
).annotate({
  identifier: "StartVariantImportResponse",
}) as any as S.Schema<StartVariantImportResponse>;
export interface GetVariantImportRequest {
  jobId: string;
}
export const GetVariantImportRequest = S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/import/variant/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVariantImportRequest",
}) as any as S.Schema<GetVariantImportRequest>;
export interface VariantImportItemDetail {
  source: string;
  jobStatus: string;
  statusMessage?: string;
}
export const VariantImportItemDetail = S.suspend(() =>
  S.Struct({
    source: S.String,
    jobStatus: S.String,
    statusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "VariantImportItemDetail",
}) as any as S.Schema<VariantImportItemDetail>;
export type VariantImportItemDetails = VariantImportItemDetail[];
export const VariantImportItemDetails = S.Array(VariantImportItemDetail);
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
export const GetVariantImportResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    destinationName: S.String,
    roleArn: S.String,
    status: S.String,
    statusMessage: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    items: VariantImportItemDetails,
    runLeftNormalization: S.Boolean,
    annotationFields: S.optional(AnnotationFieldMap),
  }),
).annotate({
  identifier: "GetVariantImportResponse",
}) as any as S.Schema<GetVariantImportResponse>;
export interface CancelVariantImportRequest {
  jobId: string;
}
export const CancelVariantImportRequest = S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/import/variant/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelVariantImportRequest",
}) as any as S.Schema<CancelVariantImportRequest>;
export interface CancelVariantImportResponse {}
export const CancelVariantImportResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelVariantImportResponse",
}) as any as S.Schema<CancelVariantImportResponse>;
export interface ListVariantImportJobsFilter {
  status?: string;
  storeName?: string;
}
export const ListVariantImportJobsFilter = S.suspend(() =>
  S.Struct({ status: S.optional(S.String), storeName: S.optional(S.String) }),
).annotate({
  identifier: "ListVariantImportJobsFilter",
}) as any as S.Schema<ListVariantImportJobsFilter>;
export interface ListVariantImportJobsRequest {
  maxResults?: number;
  ids?: string[];
  nextToken?: string;
  filter?: ListVariantImportJobsFilter;
}
export const ListVariantImportJobsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ids: S.optional(IdList),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ListVariantImportJobsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/import/variants" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVariantImportJobsRequest",
}) as any as S.Schema<ListVariantImportJobsRequest>;
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
export const VariantImportJobItem = S.suspend(() =>
  S.Struct({
    id: S.String,
    destinationName: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    runLeftNormalization: S.optional(S.Boolean),
    annotationFields: S.optional(AnnotationFieldMap),
  }),
).annotate({
  identifier: "VariantImportJobItem",
}) as any as S.Schema<VariantImportJobItem>;
export type VariantImportJobItems = VariantImportJobItem[];
export const VariantImportJobItems = S.Array(VariantImportJobItem);
export interface ListVariantImportJobsResponse {
  variantImportJobs?: VariantImportJobItem[];
  nextToken?: string;
}
export const ListVariantImportJobsResponse = S.suspend(() =>
  S.Struct({
    variantImportJobs: S.optional(VariantImportJobItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVariantImportJobsResponse",
}) as any as S.Schema<ListVariantImportJobsResponse>;
export interface CreateVariantStoreRequest {
  reference: ReferenceItem;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  sseConfig?: SseConfig;
}
export const CreateVariantStoreRequest = S.suspend(() =>
  S.Struct({
    reference: ReferenceItem,
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    sseConfig: S.optional(SseConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/variantStore" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVariantStoreRequest",
}) as any as S.Schema<CreateVariantStoreRequest>;
export interface CreateVariantStoreResponse {
  id: string;
  reference?: ReferenceItem;
  status: string;
  name: string;
  creationTime: Date;
}
export const CreateVariantStoreResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: S.optional(ReferenceItem),
    status: S.String,
    name: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateVariantStoreResponse",
}) as any as S.Schema<CreateVariantStoreResponse>;
export interface GetVariantStoreRequest {
  name: string;
}
export const GetVariantStoreRequest = S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/variantStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVariantStoreRequest",
}) as any as S.Schema<GetVariantStoreRequest>;
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
export const GetVariantStoreResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    storeArn: S.String,
    name: S.String,
    description: S.String,
    sseConfig: SseConfig,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    tags: TagMap,
    statusMessage: S.String,
    storeSizeBytes: S.Number,
  }),
).annotate({
  identifier: "GetVariantStoreResponse",
}) as any as S.Schema<GetVariantStoreResponse>;
export interface UpdateVariantStoreRequest {
  name: string;
  description?: string;
}
export const UpdateVariantStoreRequest = S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/variantStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVariantStoreRequest",
}) as any as S.Schema<UpdateVariantStoreRequest>;
export interface UpdateVariantStoreResponse {
  id: string;
  reference: ReferenceItem;
  status: string;
  name: string;
  description: string;
  creationTime: Date;
  updateTime: Date;
}
export const UpdateVariantStoreResponse = S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    name: S.String,
    description: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateVariantStoreResponse",
}) as any as S.Schema<UpdateVariantStoreResponse>;
export interface DeleteVariantStoreRequest {
  name: string;
  force?: boolean;
}
export const DeleteVariantStoreRequest = S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/variantStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVariantStoreRequest",
}) as any as S.Schema<DeleteVariantStoreRequest>;
export interface DeleteVariantStoreResponse {
  status: string;
}
export const DeleteVariantStoreResponse = S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "DeleteVariantStoreResponse",
}) as any as S.Schema<DeleteVariantStoreResponse>;
export interface ListVariantStoresFilter {
  status?: string;
}
export const ListVariantStoresFilter = S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "ListVariantStoresFilter",
}) as any as S.Schema<ListVariantStoresFilter>;
export interface ListVariantStoresRequest {
  maxResults?: number;
  ids?: string[];
  nextToken?: string;
  filter?: ListVariantStoresFilter;
}
export const ListVariantStoresRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ids: S.optional(IdList),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ListVariantStoresFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/variantStores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVariantStoresRequest",
}) as any as S.Schema<ListVariantStoresRequest>;
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
export const VariantStoreItem = S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    storeArn: S.String,
    name: S.String,
    description: S.String,
    sseConfig: SseConfig,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusMessage: S.String,
    storeSizeBytes: S.Number,
  }),
).annotate({
  identifier: "VariantStoreItem",
}) as any as S.Schema<VariantStoreItem>;
export type VariantStoreItems = VariantStoreItem[];
export const VariantStoreItems = S.Array(VariantStoreItem);
export interface ListVariantStoresResponse {
  variantStores?: VariantStoreItem[];
  nextToken?: string;
}
export const ListVariantStoresResponse = S.suspend(() =>
  S.Struct({
    variantStores: S.optional(VariantStoreItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVariantStoresResponse",
}) as any as S.Schema<ListVariantStoresResponse>;
export interface WorkflowParameter {
  description?: string;
  optional?: boolean;
}
export const WorkflowParameter = S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    optional: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "WorkflowParameter",
}) as any as S.Schema<WorkflowParameter>;
export type WorkflowParameterTemplate = {
  [key: string]: WorkflowParameter | undefined;
};
export const WorkflowParameterTemplate = S.Record(
  S.String,
  WorkflowParameter.pipe(S.optional),
);
export interface RegistryMapping {
  upstreamRegistryUrl?: string;
  ecrRepositoryPrefix?: string;
  upstreamRepositoryPrefix?: string;
  ecrAccountId?: string;
}
export const RegistryMapping = S.suspend(() =>
  S.Struct({
    upstreamRegistryUrl: S.optional(S.String),
    ecrRepositoryPrefix: S.optional(S.String),
    upstreamRepositoryPrefix: S.optional(S.String),
    ecrAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistryMapping",
}) as any as S.Schema<RegistryMapping>;
export type RegistryMappingsList = RegistryMapping[];
export const RegistryMappingsList = S.Array(RegistryMapping);
export interface ImageMapping {
  sourceImage?: string;
  destinationImage?: string;
}
export const ImageMapping = S.suspend(() =>
  S.Struct({
    sourceImage: S.optional(S.String),
    destinationImage: S.optional(S.String),
  }),
).annotate({ identifier: "ImageMapping" }) as any as S.Schema<ImageMapping>;
export type ImageMappingsList = ImageMapping[];
export const ImageMappingsList = S.Array(ImageMapping);
export interface ContainerRegistryMap {
  registryMappings?: RegistryMapping[];
  imageMappings?: ImageMapping[];
}
export const ContainerRegistryMap = S.suspend(() =>
  S.Struct({
    registryMappings: S.optional(RegistryMappingsList),
    imageMappings: S.optional(ImageMappingsList),
  }),
).annotate({
  identifier: "ContainerRegistryMap",
}) as any as S.Schema<ContainerRegistryMap>;
export interface SourceReference {
  type: string;
  value: string;
}
export const SourceReference = S.suspend(() =>
  S.Struct({ type: S.String, value: S.String }),
).annotate({
  identifier: "SourceReference",
}) as any as S.Schema<SourceReference>;
export type ExcludeFilePatternList = string[];
export const ExcludeFilePatternList = S.Array(S.String);
export interface DefinitionRepository {
  connectionArn: string;
  fullRepositoryId: string;
  sourceReference?: SourceReference;
  excludeFilePatterns?: string[];
}
export const DefinitionRepository = S.suspend(() =>
  S.Struct({
    connectionArn: S.String,
    fullRepositoryId: S.String,
    sourceReference: S.optional(SourceReference),
    excludeFilePatterns: S.optional(ExcludeFilePatternList),
  }),
).annotate({
  identifier: "DefinitionRepository",
}) as any as S.Schema<DefinitionRepository>;
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
export const CreateWorkflowRequest = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    engine: S.optional(S.String),
    definitionZip: S.optional(T.Blob),
    definitionUri: S.optional(S.String),
    main: S.optional(S.String),
    parameterTemplate: S.optional(WorkflowParameterTemplate),
    storageCapacity: S.optional(S.Number),
    tags: S.optional(TagMap),
    requestId: S.String.pipe(T.IdempotencyToken()),
    accelerators: S.optional(S.String),
    storageType: S.optional(S.String),
    containerRegistryMap: S.optional(ContainerRegistryMap),
    containerRegistryMapUri: S.optional(S.String),
    readmeMarkdown: S.optional(S.String),
    parameterTemplatePath: S.optional(S.String),
    readmePath: S.optional(S.String),
    definitionRepository: S.optional(DefinitionRepository),
    workflowBucketOwnerId: S.optional(S.String),
    readmeUri: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workflow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkflowRequest",
}) as any as S.Schema<CreateWorkflowRequest>;
export interface CreateWorkflowResponse {
  arn?: string;
  id?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
  uuid?: string;
}
export const CreateWorkflowResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(S.String),
    tags: S.optional(TagMap),
    uuid: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateWorkflowResponse",
}) as any as S.Schema<CreateWorkflowResponse>;
export type WorkflowExportList = string[];
export const WorkflowExportList = S.Array(S.String);
export interface GetWorkflowRequest {
  id: string;
  type?: string;
  export?: string[];
  workflowOwnerId?: string;
}
export const GetWorkflowRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    type: S.optional(S.String).pipe(T.HttpQuery("type")),
    export: S.optional(WorkflowExportList).pipe(T.HttpQuery("export")),
    workflowOwnerId: S.optional(S.String).pipe(T.HttpQuery("workflowOwnerId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workflow/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkflowRequest",
}) as any as S.Schema<GetWorkflowRequest>;
export type WorkflowMetadata = { [key: string]: string | undefined };
export const WorkflowMetadata = S.Record(S.String, S.String.pipe(S.optional));
export interface DefinitionRepositoryDetails {
  connectionArn?: string;
  fullRepositoryId?: string;
  sourceReference?: SourceReference;
  providerType?: string;
  providerEndpoint?: string;
}
export const DefinitionRepositoryDetails = S.suspend(() =>
  S.Struct({
    connectionArn: S.optional(S.String),
    fullRepositoryId: S.optional(S.String),
    sourceReference: S.optional(SourceReference),
    providerType: S.optional(S.String),
    providerEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "DefinitionRepositoryDetails",
}) as any as S.Schema<DefinitionRepositoryDetails>;
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
}
export const GetWorkflowResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(S.String),
    type: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    engine: S.optional(S.String),
    definition: S.optional(S.String),
    main: S.optional(S.String),
    digest: S.optional(S.String),
    parameterTemplate: S.optional(WorkflowParameterTemplate),
    storageCapacity: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    statusMessage: S.optional(S.String),
    tags: S.optional(TagMap),
    metadata: S.optional(WorkflowMetadata),
    accelerators: S.optional(S.String),
    storageType: S.optional(S.String),
    uuid: S.optional(S.String),
    containerRegistryMap: S.optional(ContainerRegistryMap),
    readme: S.optional(S.String),
    definitionRepositoryDetails: S.optional(DefinitionRepositoryDetails),
    readmePath: S.optional(S.String),
  }),
).annotate({
  identifier: "GetWorkflowResponse",
}) as any as S.Schema<GetWorkflowResponse>;
export interface UpdateWorkflowRequest {
  id: string;
  name?: string;
  description?: string;
  storageType?: string;
  storageCapacity?: number;
  readmeMarkdown?: string;
}
export const UpdateWorkflowRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    storageType: S.optional(S.String),
    storageCapacity: S.optional(S.Number),
    readmeMarkdown: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workflow/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkflowRequest",
}) as any as S.Schema<UpdateWorkflowRequest>;
export interface UpdateWorkflowResponse {}
export const UpdateWorkflowResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UpdateWorkflowResponse",
}) as any as S.Schema<UpdateWorkflowResponse>;
export interface DeleteWorkflowRequest {
  id: string;
}
export const DeleteWorkflowRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/workflow/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkflowRequest",
}) as any as S.Schema<DeleteWorkflowRequest>;
export interface DeleteWorkflowResponse {}
export const DeleteWorkflowResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteWorkflowResponse",
}) as any as S.Schema<DeleteWorkflowResponse>;
export interface ListWorkflowsRequest {
  type?: string;
  name?: string;
  startingToken?: string;
  maxResults?: number;
}
export const ListWorkflowsRequest = S.suspend(() =>
  S.Struct({
    type: S.optional(S.String).pipe(T.HttpQuery("type")),
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workflow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkflowsRequest",
}) as any as S.Schema<ListWorkflowsRequest>;
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
export const WorkflowListItem = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(S.String),
    type: S.optional(S.String),
    digest: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    metadata: S.optional(WorkflowMetadata),
  }),
).annotate({
  identifier: "WorkflowListItem",
}) as any as S.Schema<WorkflowListItem>;
export type WorkflowList = WorkflowListItem[];
export const WorkflowList = S.Array(WorkflowListItem);
export interface ListWorkflowsResponse {
  items?: WorkflowListItem[];
  nextToken?: string;
}
export const ListWorkflowsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(WorkflowList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkflowsResponse",
}) as any as S.Schema<ListWorkflowsResponse>;
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
export const CreateWorkflowVersionRequest = S.suspend(() =>
  S.Struct({
    workflowId: S.String.pipe(T.HttpLabel("workflowId")),
    versionName: S.String,
    definitionZip: S.optional(T.Blob),
    definitionUri: S.optional(S.String),
    accelerators: S.optional(S.String),
    description: S.optional(S.String),
    engine: S.optional(S.String),
    main: S.optional(S.String),
    parameterTemplate: S.optional(WorkflowParameterTemplate),
    requestId: S.String.pipe(T.IdempotencyToken()),
    storageType: S.optional(S.String),
    storageCapacity: S.optional(S.Number),
    tags: S.optional(TagMap),
    workflowBucketOwnerId: S.optional(S.String),
    containerRegistryMap: S.optional(ContainerRegistryMap),
    containerRegistryMapUri: S.optional(S.String),
    readmeMarkdown: S.optional(S.String),
    parameterTemplatePath: S.optional(S.String),
    readmePath: S.optional(S.String),
    definitionRepository: S.optional(DefinitionRepository),
    readmeUri: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workflow/{workflowId}/version" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkflowVersionRequest",
}) as any as S.Schema<CreateWorkflowVersionRequest>;
export interface CreateWorkflowVersionResponse {
  arn?: string;
  workflowId?: string;
  versionName?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
  uuid?: string;
}
export const CreateWorkflowVersionResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    workflowId: S.optional(S.String),
    versionName: S.optional(S.String),
    status: S.optional(S.String),
    tags: S.optional(TagMap),
    uuid: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateWorkflowVersionResponse",
}) as any as S.Schema<CreateWorkflowVersionResponse>;
export interface GetWorkflowVersionRequest {
  workflowId: string;
  versionName: string;
  type?: string;
  export?: string[];
  workflowOwnerId?: string;
}
export const GetWorkflowVersionRequest = S.suspend(() =>
  S.Struct({
    workflowId: S.String.pipe(T.HttpLabel("workflowId")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
    type: S.optional(S.String).pipe(T.HttpQuery("type")),
    export: S.optional(WorkflowExportList).pipe(T.HttpQuery("export")),
    workflowOwnerId: S.optional(S.String).pipe(T.HttpQuery("workflowOwnerId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workflow/{workflowId}/version/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkflowVersionRequest",
}) as any as S.Schema<GetWorkflowVersionRequest>;
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
}
export const GetWorkflowVersionResponse = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    workflowId: S.optional(S.String),
    versionName: S.optional(S.String),
    accelerators: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    definition: S.optional(S.String),
    digest: S.optional(S.String),
    engine: S.optional(S.String),
    main: S.optional(S.String),
    metadata: S.optional(WorkflowMetadata),
    parameterTemplate: S.optional(WorkflowParameterTemplate),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    storageType: S.optional(S.String),
    storageCapacity: S.optional(S.Number),
    type: S.optional(S.String),
    tags: S.optional(TagMap),
    uuid: S.optional(S.String),
    workflowBucketOwnerId: S.optional(S.String),
    containerRegistryMap: S.optional(ContainerRegistryMap),
    readme: S.optional(S.String),
    definitionRepositoryDetails: S.optional(DefinitionRepositoryDetails),
    readmePath: S.optional(S.String),
  }),
).annotate({
  identifier: "GetWorkflowVersionResponse",
}) as any as S.Schema<GetWorkflowVersionResponse>;
export interface UpdateWorkflowVersionRequest {
  workflowId: string;
  versionName: string;
  description?: string;
  storageType?: string;
  storageCapacity?: number;
  readmeMarkdown?: string;
}
export const UpdateWorkflowVersionRequest = S.suspend(() =>
  S.Struct({
    workflowId: S.String.pipe(T.HttpLabel("workflowId")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
    description: S.optional(S.String),
    storageType: S.optional(S.String),
    storageCapacity: S.optional(S.Number),
    readmeMarkdown: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workflow/{workflowId}/version/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkflowVersionRequest",
}) as any as S.Schema<UpdateWorkflowVersionRequest>;
export interface UpdateWorkflowVersionResponse {}
export const UpdateWorkflowVersionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateWorkflowVersionResponse",
}) as any as S.Schema<UpdateWorkflowVersionResponse>;
export interface DeleteWorkflowVersionRequest {
  workflowId: string;
  versionName: string;
}
export const DeleteWorkflowVersionRequest = S.suspend(() =>
  S.Struct({
    workflowId: S.String.pipe(T.HttpLabel("workflowId")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workflow/{workflowId}/version/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkflowVersionRequest",
}) as any as S.Schema<DeleteWorkflowVersionRequest>;
export interface DeleteWorkflowVersionResponse {}
export const DeleteWorkflowVersionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWorkflowVersionResponse",
}) as any as S.Schema<DeleteWorkflowVersionResponse>;
export interface ListWorkflowVersionsRequest {
  workflowId: string;
  type?: string;
  workflowOwnerId?: string;
  startingToken?: string;
  maxResults?: number;
}
export const ListWorkflowVersionsRequest = S.suspend(() =>
  S.Struct({
    workflowId: S.String.pipe(T.HttpLabel("workflowId")),
    type: S.optional(S.String).pipe(T.HttpQuery("type")),
    workflowOwnerId: S.optional(S.String).pipe(T.HttpQuery("workflowOwnerId")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workflow/{workflowId}/version" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkflowVersionsRequest",
}) as any as S.Schema<ListWorkflowVersionsRequest>;
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
export const WorkflowVersionListItem = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    workflowId: S.optional(S.String),
    versionName: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(S.String),
    type: S.optional(S.String),
    digest: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    metadata: S.optional(WorkflowMetadata),
  }),
).annotate({
  identifier: "WorkflowVersionListItem",
}) as any as S.Schema<WorkflowVersionListItem>;
export type WorkflowVersionList = WorkflowVersionListItem[];
export const WorkflowVersionList = S.Array(WorkflowVersionListItem);
export interface ListWorkflowVersionsResponse {
  items?: WorkflowVersionListItem[];
  nextToken?: string;
}
export const ListWorkflowVersionsResponse = S.suspend(() =>
  S.Struct({
    items: S.optional(WorkflowVersionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkflowVersionsResponse",
}) as any as S.Schema<ListWorkflowVersionsResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.String },
).pipe(C.withAuthError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.String },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class NotSupportedOperationException extends S.TaggedErrorClass<NotSupportedOperationException>()(
  "NotSupportedOperationException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class RequestTimeoutException extends S.TaggedErrorClass<RequestTimeoutException>()(
  "RequestTimeoutException",
  { message: S.String },
).pipe(C.withTimeoutError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.String },
  T.Retryable({ throttling: true }),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.String },
).pipe(C.withQuotaError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.String },
).pipe(C.withConflictError) {}
export class RangeNotSatisfiableException extends S.TaggedErrorClass<RangeNotSatisfiableException>()(
  "RangeNotSatisfiableException",
  { message: S.String },
  T.Retryable(),
).pipe(C.withRetryableError) {}

//# Operations
/**
 * Deletes an access policy for the specified store.
 */
export const deleteS3AccessPolicy: (
  input: DeleteS3AccessPolicyRequest,
) => effect.Effect<
  DeleteS3AccessPolicyResponse,
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteS3AccessPolicyRequest,
  output: DeleteS3AccessPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves details about an access policy on a given store.
 */
export const getS3AccessPolicy: (
  input: GetS3AccessPolicyRequest,
) => effect.Effect<
  GetS3AccessPolicyResponse,
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetS3AccessPolicyRequest,
  output: GetS3AccessPolicyResponse,
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
}));
/**
 * Adds an access policy to the specified store.
 */
export const putS3AccessPolicy: (
  input: PutS3AccessPolicyRequest,
) => effect.Effect<
  PutS3AccessPolicyResponse,
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutS3AccessPolicyRequest,
  output: PutS3AccessPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Starts an annotation import job.
 */
export const startAnnotationImportJob: (
  input: StartAnnotationImportRequest,
) => effect.Effect<
  StartAnnotationImportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartAnnotationImportRequest,
  output: StartAnnotationImportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about an annotation import job.
 */
export const getAnnotationImportJob: (
  input: GetAnnotationImportRequest,
) => effect.Effect<
  GetAnnotationImportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAnnotationImportRequest,
  output: GetAnnotationImportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Cancels an annotation import job.
 */
export const cancelAnnotationImportJob: (
  input: CancelAnnotationImportRequest,
) => effect.Effect<
  CancelAnnotationImportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelAnnotationImportRequest,
  output: CancelAnnotationImportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of annotation import jobs.
 */
export const listAnnotationImportJobs: {
  (
    input: ListAnnotationImportJobsRequest,
  ): effect.Effect<
    ListAnnotationImportJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListAnnotationImportJobsRequest,
  ) => stream.Stream<
    ListAnnotationImportJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAnnotationImportJobsRequest,
  ) => stream.Stream<
    AnnotationImportJobItem,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAnnotationImportJobsRequest,
  output: ListAnnotationImportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "annotationImportJobs",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Creates an annotation store.
 */
export const createAnnotationStore: (
  input: CreateAnnotationStoreRequest,
) => effect.Effect<
  CreateAnnotationStoreResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAnnotationStoreRequest,
  output: CreateAnnotationStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about an annotation store.
 */
export const getAnnotationStore: (
  input: GetAnnotationStoreRequest,
) => effect.Effect<
  GetAnnotationStoreResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAnnotationStoreRequest,
  output: GetAnnotationStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Updates an annotation store.
 */
export const updateAnnotationStore: (
  input: UpdateAnnotationStoreRequest,
) => effect.Effect<
  UpdateAnnotationStoreResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAnnotationStoreRequest,
  output: UpdateAnnotationStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Deletes an annotation store.
 */
export const deleteAnnotationStore: (
  input: DeleteAnnotationStoreRequest,
) => effect.Effect<
  DeleteAnnotationStoreResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAnnotationStoreRequest,
  output: DeleteAnnotationStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of annotation stores.
 */
export const listAnnotationStores: {
  (
    input: ListAnnotationStoresRequest,
  ): effect.Effect<
    ListAnnotationStoresResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListAnnotationStoresRequest,
  ) => stream.Stream<
    ListAnnotationStoresResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAnnotationStoresRequest,
  ) => stream.Stream<
    AnnotationStoreItem,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAnnotationStoresRequest,
  output: ListAnnotationStoresResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "annotationStores",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Creates a new version of an annotation store.
 */
export const createAnnotationStoreVersion: (
  input: CreateAnnotationStoreVersionRequest,
) => effect.Effect<
  CreateAnnotationStoreVersionResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAnnotationStoreVersionRequest,
  output: CreateAnnotationStoreVersionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the metadata for an annotation store version.
 */
export const getAnnotationStoreVersion: (
  input: GetAnnotationStoreVersionRequest,
) => effect.Effect<
  GetAnnotationStoreVersionResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAnnotationStoreVersionRequest,
  output: GetAnnotationStoreVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the description of an annotation store version.
 */
export const updateAnnotationStoreVersion: (
  input: UpdateAnnotationStoreVersionRequest,
) => effect.Effect<
  UpdateAnnotationStoreVersionResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAnnotationStoreVersionRequest,
  output: UpdateAnnotationStoreVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists the versions of an annotation store.
 */
export const listAnnotationStoreVersions: {
  (
    input: ListAnnotationStoreVersionsRequest,
  ): effect.Effect<
    ListAnnotationStoreVersionsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListAnnotationStoreVersionsRequest,
  ) => stream.Stream<
    ListAnnotationStoreVersionsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAnnotationStoreVersionsRequest,
  ) => stream.Stream<
    AnnotationStoreVersionItem,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAnnotationStoreVersionsRequest,
  output: ListAnnotationStoreVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "annotationStoreVersions",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Deletes one or multiple versions of an annotation store.
 */
export const deleteAnnotationStoreVersions: (
  input: DeleteAnnotationStoreVersionsRequest,
) => effect.Effect<
  DeleteAnnotationStoreVersionsResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAnnotationStoreVersionsRequest,
  output: DeleteAnnotationStoreVersionsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a reference store and returns metadata in JSON format. Reference stores are used to store reference genomes in FASTA format. A reference store is created when the first reference genome is imported. To import additional reference genomes from an Amazon S3 bucket, use the `StartReferenceImportJob` API operation.
 *
 * For more information, see Creating a HealthOmics reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createReferenceStore: (
  input: CreateReferenceStoreRequest,
) => effect.Effect<
  CreateReferenceStoreResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateReferenceStoreRequest,
  output: CreateReferenceStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets information about a reference store.
 */
export const getReferenceStore: (
  input: GetReferenceStoreRequest,
) => effect.Effect<
  GetReferenceStoreResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReferenceStoreRequest,
  output: GetReferenceStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a reference store and returns a response with no body if the operation is successful. You can only delete a reference store when it does not contain any reference genomes. To empty a reference store, use `DeleteReference`.
 *
 * For more information about your workflow status, see Deleting HealthOmics reference and sequence stores in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteReferenceStore: (
  input: DeleteReferenceStoreRequest,
) => effect.Effect<
  DeleteReferenceStoreResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteReferenceStoreRequest,
  output: DeleteReferenceStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves a list of reference stores linked to your account and returns their metadata in JSON format.
 *
 * For more information, see Creating a reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listReferenceStores: {
  (
    input: ListReferenceStoresRequest,
  ): effect.Effect<
    ListReferenceStoresResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListReferenceStoresRequest,
  ) => stream.Stream<
    ListReferenceStoresResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListReferenceStoresRequest,
  ) => stream.Stream<
    ReferenceStoreDetail,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReferenceStoresRequest,
  output: ListReferenceStoresResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "referenceStores",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Monitors the status of a reference import job. This operation can be called after calling the `StartReferenceImportJob` operation.
 */
export const getReferenceImportJob: (
  input: GetReferenceImportJobRequest,
) => effect.Effect<
  GetReferenceImportJobResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReferenceImportJobRequest,
  output: GetReferenceImportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the metadata of one or more reference import jobs for a reference store.
 */
export const listReferenceImportJobs: {
  (
    input: ListReferenceImportJobsRequest,
  ): effect.Effect<
    ListReferenceImportJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListReferenceImportJobsRequest,
  ) => stream.Stream<
    ListReferenceImportJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListReferenceImportJobsRequest,
  ) => stream.Stream<
    ImportReferenceJobItem,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReferenceImportJobsRequest,
  output: ListReferenceImportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "importJobs",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Imports a reference genome from Amazon S3 into a specified reference store. You can have multiple reference genomes in a reference store. You can only import reference genomes one at a time into each reference store. Monitor the status of your reference import job by using the `GetReferenceImportJob` API operation.
 */
export const startReferenceImportJob: (
  input: StartReferenceImportJobRequest,
) => effect.Effect<
  StartReferenceImportJobResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartReferenceImportJobRequest,
  output: StartReferenceImportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves metadata for a reference genome. This operation returns the number of parts, part size, and MD5 of an entire file. This operation does not return tags. To retrieve the list of tags for a read set, use the `ListTagsForResource` API operation.
 */
export const getReferenceMetadata: (
  input: GetReferenceMetadataRequest,
) => effect.Effect<
  GetReferenceMetadataResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReferenceMetadataRequest,
  output: GetReferenceMetadataResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a reference genome and returns a response with no body if the operation is successful. The read set associated with the reference genome must first be deleted before deleting the reference genome. After the reference genome is deleted, you can delete the reference store using the `DeleteReferenceStore` API operation.
 *
 * For more information, see Deleting HealthOmics reference and sequence stores in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteReference: (
  input: DeleteReferenceRequest,
) => effect.Effect<
  DeleteReferenceResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteReferenceRequest,
  output: DeleteReferenceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the metadata of one or more reference genomes in a reference store.
 *
 * For more information, see Creating a reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listReferences: {
  (
    input: ListReferencesRequest,
  ): effect.Effect<
    ListReferencesResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListReferencesRequest,
  ) => stream.Stream<
    ListReferencesResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListReferencesRequest,
  ) => stream.Stream<
    ReferenceListItem,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReferencesRequest,
  output: ListReferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "references",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Downloads parts of data from a reference genome and returns the reference file in the same format that it was uploaded.
 *
 * For more information, see Creating a HealthOmics reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getReference: (
  input: GetReferenceRequest,
) => effect.Effect<
  GetReferenceResponse,
  | AccessDeniedException
  | InternalServerException
  | RangeNotSatisfiableException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReferenceRequest,
  output: GetReferenceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RangeNotSatisfiableException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a run cache to store and reference task outputs from completed private runs. Specify an Amazon S3 location where Amazon Web Services HealthOmics saves the cached data. This data must be immediately accessible and not in an archived state. You can save intermediate task files to a run cache if they are declared as task outputs in the workflow definition file.
 *
 * For more information, see Call caching and Creating a run cache in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createRunCache: (
  input: CreateRunCacheRequest,
) => effect.Effect<
  CreateRunCacheResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRunCacheRequest,
  output: CreateRunCacheResponse,
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
}));
/**
 * Retrieves detailed information about the specified run cache using its ID.
 *
 * For more information, see Call caching for Amazon Web Services HealthOmics runs in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getRunCache: (
  input: GetRunCacheRequest,
) => effect.Effect<
  GetRunCacheResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRunCacheRequest,
  output: GetRunCacheResponse,
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
}));
/**
 * Updates a run cache using its ID and returns a response with no body if the operation is successful. You can update the run cache description, name, or the default run cache behavior with `CACHE_ON_FAILURE` or `CACHE_ALWAYS`. To confirm that your run cache settings have been properly updated, use the `GetRunCache` API operation.
 *
 * For more information, see How call caching works in the *Amazon Web Services HealthOmics User Guide*.
 */
export const updateRunCache: (
  input: UpdateRunCacheRequest,
) => effect.Effect<
  UpdateRunCacheResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRunCacheRequest,
  output: UpdateRunCacheResponse,
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
}));
/**
 * Deletes a run cache and returns a response with no body if the operation is successful. This action removes the cache metadata stored in the service account, but does not delete the data in Amazon S3. You can access the cache data in Amazon S3, for inspection or to troubleshoot issues. You can remove old cache data using standard S3 `Delete` operations.
 *
 * For more information, see Deleting a run cache in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteRunCache: (
  input: DeleteRunCacheRequest,
) => effect.Effect<
  DeleteRunCacheResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRunCacheRequest,
  output: DeleteRunCacheResponse,
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
}));
/**
 * Retrieves a list of your run caches and the metadata for each cache.
 */
export const listRunCaches: {
  (
    input: ListRunCachesRequest,
  ): effect.Effect<
    ListRunCachesResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListRunCachesRequest,
  ) => stream.Stream<
    ListRunCachesResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRunCachesRequest,
  ) => stream.Stream<
    RunCacheListItem,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRunCachesRequest,
  output: ListRunCachesResponse,
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
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Creates a run group to limit the compute resources for the runs that are added to the group. Returns an ARN, ID, and tags for the run group.
 */
export const createRunGroup: (
  input: CreateRunGroupRequest,
) => effect.Effect<
  CreateRunGroupResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRunGroupRequest,
  output: CreateRunGroupResponse,
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
}));
/**
 * Gets information about a run group and returns its metadata.
 */
export const getRunGroup: (
  input: GetRunGroupRequest,
) => effect.Effect<
  GetRunGroupResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRunGroupRequest,
  output: GetRunGroupResponse,
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
}));
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
export const updateRunGroup: (
  input: UpdateRunGroupRequest,
) => effect.Effect<
  UpdateRunGroupResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRunGroupRequest,
  output: UpdateRunGroupResponse,
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
}));
/**
 * Deletes a run group and returns a response with no body if the operation is successful.
 *
 * To verify that the run group is deleted:
 *
 * - Use `ListRunGroups` to confirm the workflow no longer appears in the list.
 *
 * - Use `GetRunGroup` to verify the workflow cannot be found.
 */
export const deleteRunGroup: (
  input: DeleteRunGroupRequest,
) => effect.Effect<
  DeleteRunGroupResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRunGroupRequest,
  output: DeleteRunGroupResponse,
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
}));
/**
 * Retrieves a list of all run groups and returns the metadata for each run group.
 */
export const listRunGroups: {
  (
    input: ListRunGroupsRequest,
  ): effect.Effect<
    ListRunGroupsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListRunGroupsRequest,
  ) => stream.Stream<
    ListRunGroupsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRunGroupsRequest,
  ) => stream.Stream<
    RunGroupListItem,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRunGroupsRequest,
  output: ListRunGroupsResponse,
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
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
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
export const startRun: (
  input: StartRunRequest,
) => effect.Effect<
  StartRunResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartRunRequest,
  output: StartRunResponse,
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
}));
/**
 * Gets detailed information about a specific run using its ID.
 *
 * Amazon Web Services HealthOmics stores a configurable number of runs, as determined by service limits, that are available to the console and API. If `GetRun` does not return the requested run, you can find all run logs in the CloudWatch logs. For more information about viewing the run logs, see CloudWatch logs in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getRun: (
  input: GetRunRequest,
) => effect.Effect<
  GetRunResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRunRequest,
  output: GetRunResponse,
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
}));
/**
 * Deletes a run and returns a response with no body if the operation is successful. You can only delete a run that has reached a `COMPLETED`, `FAILED`, or `CANCELLED` stage. A completed run has delivered an output, or was cancelled and resulted in no output. When you delete a run, only the metadata associated with the run is deleted. The run outputs remain in Amazon S3 and logs remain in CloudWatch.
 *
 * To verify that the workflow is deleted:
 *
 * - Use `ListRuns` to confirm the workflow no longer appears in the list.
 *
 * - Use `GetRun` to verify the workflow cannot be found.
 */
export const deleteRun: (
  input: DeleteRunRequest,
) => effect.Effect<
  DeleteRunResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRunRequest,
  output: DeleteRunResponse,
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
}));
/**
 * Retrieves a list of runs and returns each run's metadata and status.
 *
 * Amazon Web Services HealthOmics stores a configurable number of runs, as determined by service limits, that are available to the console and API. If the `ListRuns` response doesn't include specific runs that you expected, you can find all run logs in the CloudWatch logs. For more information about viewing the run logs, see CloudWatch logs in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listRuns: {
  (
    input: ListRunsRequest,
  ): effect.Effect<
    ListRunsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListRunsRequest,
  ) => stream.Stream<
    ListRunsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRunsRequest,
  ) => stream.Stream<
    RunListItem,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRunsRequest,
  output: ListRunsResponse,
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
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Cancels a run using its ID and returns a response with no body if the operation is successful. To confirm that the run has been cancelled, use the `ListRuns` API operation to check that it is no longer listed.
 */
export const cancelRun: (
  input: CancelRunRequest,
) => effect.Effect<
  CancelRunResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelRunRequest,
  output: CancelRunResponse,
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
}));
/**
 * Gets detailed information about a run task using its ID.
 */
export const getRunTask: (
  input: GetRunTaskRequest,
) => effect.Effect<
  GetRunTaskResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRunTaskRequest,
  output: GetRunTaskResponse,
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
}));
/**
 * Returns a list of tasks and status information within their specified run. Use this operation to monitor runs and to identify which specific tasks have failed.
 */
export const listRunTasks: {
  (
    input: ListRunTasksRequest,
  ): effect.Effect<
    ListRunTasksResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListRunTasksRequest,
  ) => stream.Stream<
    ListRunTasksResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRunTasksRequest,
  ) => stream.Stream<
    TaskListItem,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRunTasksRequest,
  output: ListRunTasksResponse,
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
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
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
export const createSequenceStore: (
  input: CreateSequenceStoreRequest,
) => effect.Effect<
  CreateSequenceStoreResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSequenceStoreRequest,
  output: CreateSequenceStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves metadata for a sequence store using its ID and returns it in JSON format.
 */
export const getSequenceStore: (
  input: GetSequenceStoreRequest,
) => effect.Effect<
  GetSequenceStoreResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSequenceStoreRequest,
  output: GetSequenceStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Update one or more parameters for the sequence store.
 */
export const updateSequenceStore: (
  input: UpdateSequenceStoreRequest,
) => effect.Effect<
  UpdateSequenceStoreResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSequenceStoreRequest,
  output: UpdateSequenceStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a sequence store and returns a response with no body if the operation is successful. You can only delete a sequence store when it does not contain any read sets.
 *
 * Use the `BatchDeleteReadSet` API operation to ensure that all read sets in the sequence store are deleted. When a sequence store is deleted, all tags associated with the store are also deleted.
 *
 * For more information, see Deleting HealthOmics reference and sequence stores in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteSequenceStore: (
  input: DeleteSequenceStoreRequest,
) => effect.Effect<
  DeleteSequenceStoreResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSequenceStoreRequest,
  output: DeleteSequenceStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves a list of sequence stores and returns each sequence store's metadata.
 *
 * For more information, see Creating a HealthOmics sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listSequenceStores: {
  (
    input: ListSequenceStoresRequest,
  ): effect.Effect<
    ListSequenceStoresResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListSequenceStoresRequest,
  ) => stream.Stream<
    ListSequenceStoresResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSequenceStoresRequest,
  ) => stream.Stream<
    SequenceStoreDetail,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSequenceStoresRequest,
  output: ListSequenceStoresResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sequenceStores",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Stops a multipart read set upload into a sequence store and returns a response with no body if the operation is successful. To confirm that a multipart read set upload has been stopped, use the `ListMultipartReadSetUploads` API operation to view all active multipart read set uploads.
 */
export const abortMultipartReadSetUpload: (
  input: AbortMultipartReadSetUploadRequest,
) => effect.Effect<
  AbortMultipartReadSetUploadResponse,
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AbortMultipartReadSetUploadRequest,
  output: AbortMultipartReadSetUploadResponse,
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
}));
/**
 * Completes a multipart read set upload into a sequence store after you have initiated the upload process with `CreateMultipartReadSetUpload` and uploaded all read set parts using `UploadReadSetPart`. You must specify the parts you uploaded using the parts parameter. If the operation is successful, it returns the read set ID(s) of the uploaded read set(s).
 *
 * For more information, see Direct upload to a sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const completeMultipartReadSetUpload: (
  input: CompleteMultipartReadSetUploadRequest,
) => effect.Effect<
  CompleteMultipartReadSetUploadResponse,
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CompleteMultipartReadSetUploadRequest,
  output: CompleteMultipartReadSetUploadResponse,
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
}));
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
export const createMultipartReadSetUpload: (
  input: CreateMultipartReadSetUploadRequest,
) => effect.Effect<
  CreateMultipartReadSetUploadResponse,
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMultipartReadSetUploadRequest,
  output: CreateMultipartReadSetUploadResponse,
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
}));
/**
 * Returns detailed information about the status of a read set activation job in JSON format.
 */
export const getReadSetActivationJob: (
  input: GetReadSetActivationJobRequest,
) => effect.Effect<
  GetReadSetActivationJobResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReadSetActivationJobRequest,
  output: GetReadSetActivationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves status information about a read set export job and returns the data in JSON format. Use this operation to actively monitor the progress of an export job.
 */
export const getReadSetExportJob: (
  input: GetReadSetExportJobRequest,
) => effect.Effect<
  GetReadSetExportJobResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReadSetExportJobRequest,
  output: GetReadSetExportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets detailed and status information about a read set import job and returns the data in JSON format.
 */
export const getReadSetImportJob: (
  input: GetReadSetImportJobRequest,
) => effect.Effect<
  GetReadSetImportJobResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReadSetImportJobRequest,
  output: GetReadSetImportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists in-progress multipart read set uploads for a sequence store and returns it in a JSON formatted output. Multipart read set uploads are initiated by the `CreateMultipartReadSetUploads` API operation. This operation returns a response with no body when the upload is complete.
 */
export const listMultipartReadSetUploads: {
  (
    input: ListMultipartReadSetUploadsRequest,
  ): effect.Effect<
    ListMultipartReadSetUploadsResponse,
    | AccessDeniedException
    | InternalServerException
    | NotSupportedOperationException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListMultipartReadSetUploadsRequest,
  ) => stream.Stream<
    ListMultipartReadSetUploadsResponse,
    | AccessDeniedException
    | InternalServerException
    | NotSupportedOperationException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMultipartReadSetUploadsRequest,
  ) => stream.Stream<
    MultipartReadSetUploadListItem,
    | AccessDeniedException
    | InternalServerException
    | NotSupportedOperationException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMultipartReadSetUploadsRequest,
  output: ListMultipartReadSetUploadsResponse,
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
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "uploads",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves a list of read set activation jobs and returns the metadata in a JSON formatted output. To extract metadata from a read set activation job, use the `GetReadSetActivationJob` API operation.
 */
export const listReadSetActivationJobs: {
  (
    input: ListReadSetActivationJobsRequest,
  ): effect.Effect<
    ListReadSetActivationJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListReadSetActivationJobsRequest,
  ) => stream.Stream<
    ListReadSetActivationJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListReadSetActivationJobsRequest,
  ) => stream.Stream<
    ActivateReadSetJobItem,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReadSetActivationJobsRequest,
  output: ListReadSetActivationJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "activationJobs",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves a list of read set export jobs in a JSON formatted response. This API operation is used to check the status of a read set export job initiated by the `StartReadSetExportJob` API operation.
 */
export const listReadSetExportJobs: {
  (
    input: ListReadSetExportJobsRequest,
  ): effect.Effect<
    ListReadSetExportJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListReadSetExportJobsRequest,
  ) => stream.Stream<
    ListReadSetExportJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListReadSetExportJobsRequest,
  ) => stream.Stream<
    ExportReadSetJobDetail,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReadSetExportJobsRequest,
  output: ListReadSetExportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exportJobs",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves a list of read set import jobs and returns the data in JSON format.
 */
export const listReadSetImportJobs: {
  (
    input: ListReadSetImportJobsRequest,
  ): effect.Effect<
    ListReadSetImportJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListReadSetImportJobsRequest,
  ) => stream.Stream<
    ListReadSetImportJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListReadSetImportJobsRequest,
  ) => stream.Stream<
    ImportReadSetJobItem,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReadSetImportJobsRequest,
  output: ListReadSetImportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "importJobs",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists all parts in a multipart read set upload for a sequence store and returns the metadata in a JSON formatted output.
 */
export const listReadSetUploadParts: {
  (
    input: ListReadSetUploadPartsRequest,
  ): effect.Effect<
    ListReadSetUploadPartsResponse,
    | AccessDeniedException
    | InternalServerException
    | NotSupportedOperationException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListReadSetUploadPartsRequest,
  ) => stream.Stream<
    ListReadSetUploadPartsResponse,
    | AccessDeniedException
    | InternalServerException
    | NotSupportedOperationException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListReadSetUploadPartsRequest,
  ) => stream.Stream<
    ReadSetUploadPartListItem,
    | AccessDeniedException
    | InternalServerException
    | NotSupportedOperationException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReadSetUploadPartsRequest,
  output: ListReadSetUploadPartsResponse,
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
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "parts",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Activates an archived read set and returns its metadata in a JSON formatted output. AWS HealthOmics automatically archives unused read sets after 30 days. To monitor the status of your read set activation job, use the `GetReadSetActivationJob` operation.
 *
 * To learn more, see Activating read sets in the *Amazon Web Services HealthOmics User Guide*.
 */
export const startReadSetActivationJob: (
  input: StartReadSetActivationJobRequest,
) => effect.Effect<
  StartReadSetActivationJobResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartReadSetActivationJobRequest,
  output: StartReadSetActivationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Starts a read set export job. When the export job is finished, the read set is exported to an Amazon S3 bucket which can be retrieved using the `GetReadSetExportJob` API operation.
 *
 * To monitor the status of the export job, use the `ListReadSetExportJobs` API operation.
 */
export const startReadSetExportJob: (
  input: StartReadSetExportJobRequest,
) => effect.Effect<
  StartReadSetExportJobResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartReadSetExportJobRequest,
  output: StartReadSetExportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Imports a read set from the sequence store. Read set import jobs support a maximum of 100 read sets of different types. Monitor the progress of your read set import job by calling the `GetReadSetImportJob` API operation.
 */
export const startReadSetImportJob: (
  input: StartReadSetImportJobRequest,
) => effect.Effect<
  StartReadSetImportJobResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartReadSetImportJobRequest,
  output: StartReadSetImportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Uploads a specific part of a read set into a sequence store. When you a upload a read set part with a part number that already exists, the new part replaces the existing one. This operation returns a JSON formatted response containing a string identifier that is used to confirm that parts are being added to the intended upload.
 *
 * For more information, see Direct upload to a sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const uploadReadSetPart: (
  input: UploadReadSetPartRequest,
) => effect.Effect<
  UploadReadSetPartResponse,
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UploadReadSetPartRequest,
  output: UploadReadSetPartResponse,
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
}));
/**
 * Retrieves the metadata for a read set from a sequence store in JSON format. This operation does not return tags. To retrieve the list of tags for a read set, use the `ListTagsForResource` API operation.
 */
export const getReadSetMetadata: (
  input: GetReadSetMetadataRequest,
) => effect.Effect<
  GetReadSetMetadataResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReadSetMetadataRequest,
  output: GetReadSetMetadataResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves a list of read sets from a sequence store ID and returns the metadata in JSON format.
 */
export const listReadSets: {
  (
    input: ListReadSetsRequest,
  ): effect.Effect<
    ListReadSetsResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListReadSetsRequest,
  ) => stream.Stream<
    ListReadSetsResponse,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListReadSetsRequest,
  ) => stream.Stream<
    ReadSetListItem,
    | AccessDeniedException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReadSetsRequest,
  output: ListReadSetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "readSets",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves detailed information from parts of a read set and returns the read set in the same format that it was uploaded. You must have read sets uploaded to your sequence store in order to run this operation.
 */
export const getReadSet: (
  input: GetReadSetRequest,
) => effect.Effect<
  GetReadSetResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RangeNotSatisfiableException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReadSetRequest,
  output: GetReadSetResponse,
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
}));
/**
 * Deletes one or more read sets. If the operation is successful, it returns a response with no body. If there is an error with deleting one of the read sets, the operation returns an error list. If the operation successfully deletes only a subset of files, it will return an error list for the remaining files that fail to be deleted. There is a limit of 100 read sets that can be deleted in each `BatchDeleteReadSet` API call.
 */
export const batchDeleteReadSet: (
  input: BatchDeleteReadSetRequest,
) => effect.Effect<
  BatchDeleteReadSetResponse,
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDeleteReadSetRequest,
  output: BatchDeleteReadSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
export const createShare: (
  input: CreateShareRequest,
) => effect.Effect<
  CreateShareResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateShareRequest,
  output: CreateShareResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the metadata for the specified resource share.
 */
export const getShare: (
  input: GetShareRequest,
) => effect.Effect<
  GetShareResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetShareRequest,
  output: GetShareResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Accept a resource share request.
 */
export const acceptShare: (
  input: AcceptShareRequest,
) => effect.Effect<
  AcceptShareResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AcceptShareRequest,
  output: AcceptShareResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a resource share. If you are the resource owner, the subscriber will no longer have access to the shared resource. If you are the subscriber, this operation deletes your access to the share.
 */
export const deleteShare: (
  input: DeleteShareRequest,
) => effect.Effect<
  DeleteShareResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteShareRequest,
  output: DeleteShareResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the resource shares associated with an account. Use the filter parameter to retrieve a specific subset of the shares.
 */
export const listShares: {
  (
    input: ListSharesRequest,
  ): effect.Effect<
    ListSharesResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListSharesRequest,
  ) => stream.Stream<
    ListSharesResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSharesRequest,
  ) => stream.Stream<
    ShareDetails,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSharesRequest,
  output: ListSharesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "shares",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves a list of tags for a resource.
 */
export const listTagsForResource: (
  input: ListTagsForResourceRequest,
) => effect.Effect<
  ListTagsForResourceResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
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
}));
/**
 * Tags a resource.
 */
export const tagResource: (
  input: TagResourceRequest,
) => effect.Effect<
  TagResourceResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
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
}));
/**
 * Removes tags from a resource.
 */
export const untagResource: (
  input: UntagResourceRequest,
) => effect.Effect<
  UntagResourceResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
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
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Starts a variant import job.
 */
export const startVariantImportJob: (
  input: StartVariantImportRequest,
) => effect.Effect<
  StartVariantImportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartVariantImportRequest,
  output: StartVariantImportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about a variant import job.
 */
export const getVariantImportJob: (
  input: GetVariantImportRequest,
) => effect.Effect<
  GetVariantImportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVariantImportRequest,
  output: GetVariantImportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Cancels a variant import job.
 */
export const cancelVariantImportJob: (
  input: CancelVariantImportRequest,
) => effect.Effect<
  CancelVariantImportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelVariantImportRequest,
  output: CancelVariantImportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of variant import jobs.
 */
export const listVariantImportJobs: {
  (
    input: ListVariantImportJobsRequest,
  ): effect.Effect<
    ListVariantImportJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListVariantImportJobsRequest,
  ) => stream.Stream<
    ListVariantImportJobsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListVariantImportJobsRequest,
  ) => stream.Stream<
    VariantImportJobItem,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVariantImportJobsRequest,
  output: ListVariantImportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "variantImportJobs",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Creates a variant store.
 */
export const createVariantStore: (
  input: CreateVariantStoreRequest,
) => effect.Effect<
  CreateVariantStoreResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVariantStoreRequest,
  output: CreateVariantStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about a variant store.
 */
export const getVariantStore: (
  input: GetVariantStoreRequest,
) => effect.Effect<
  GetVariantStoreResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVariantStoreRequest,
  output: GetVariantStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Updates a variant store.
 */
export const updateVariantStore: (
  input: UpdateVariantStoreRequest,
) => effect.Effect<
  UpdateVariantStoreResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVariantStoreRequest,
  output: UpdateVariantStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Deletes a variant store.
 */
export const deleteVariantStore: (
  input: DeleteVariantStoreRequest,
) => effect.Effect<
  DeleteVariantStoreResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVariantStoreRequest,
  output: DeleteVariantStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores will no longer be open to new customers starting November 7, 2025. If you would like to use variant stores or annotation stores, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of variant stores.
 */
export const listVariantStores: {
  (
    input: ListVariantStoresRequest,
  ): effect.Effect<
    ListVariantStoresResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListVariantStoresRequest,
  ) => stream.Stream<
    ListVariantStoresResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListVariantStoresRequest,
  ) => stream.Stream<
    VariantStoreItem,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVariantStoresRequest,
  output: ListVariantStoresResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "variantStores",
    pageSize: "maxResults",
  } as const,
}));
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
export const createWorkflow: (
  input: CreateWorkflowRequest,
) => effect.Effect<
  CreateWorkflowResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWorkflowRequest,
  output: CreateWorkflowResponse,
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
}));
/**
 * Gets all information about a workflow using its ID.
 *
 * If a workflow is shared with you, you cannot export the workflow.
 *
 * For more information about your workflow status, see Verify the workflow status in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getWorkflow: (
  input: GetWorkflowRequest,
) => effect.Effect<
  GetWorkflowResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWorkflowRequest,
  output: GetWorkflowResponse,
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
}));
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
export const updateWorkflow: (
  input: UpdateWorkflowRequest,
) => effect.Effect<
  UpdateWorkflowResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateWorkflowRequest,
  output: UpdateWorkflowResponse,
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
}));
/**
 * Deletes a workflow by specifying its ID. This operation returns a response with no body if the deletion is successful.
 *
 * To verify that the workflow is deleted:
 *
 * - Use `ListWorkflows` to confirm the workflow no longer appears in the list.
 *
 * - Use `GetWorkflow` to verify the workflow cannot be found.
 */
export const deleteWorkflow: (
  input: DeleteWorkflowRequest,
) => effect.Effect<
  DeleteWorkflowResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWorkflowRequest,
  output: DeleteWorkflowResponse,
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
}));
/**
 * Retrieves a list of existing workflows. You can filter for specific workflows by their name and type. Using the type parameter, specify `PRIVATE` to retrieve a list of private workflows or specify `READY2RUN` for a list of all Ready2Run workflows. If you do not specify the type of workflow, this operation returns a list of existing workflows.
 */
export const listWorkflows: {
  (
    input: ListWorkflowsRequest,
  ): effect.Effect<
    ListWorkflowsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListWorkflowsRequest,
  ) => stream.Stream<
    ListWorkflowsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWorkflowsRequest,
  ) => stream.Stream<
    WorkflowListItem,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowsRequest,
  output: ListWorkflowsResponse,
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
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
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
export const createWorkflowVersion: (
  input: CreateWorkflowVersionRequest,
) => effect.Effect<
  CreateWorkflowVersionResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWorkflowVersionRequest,
  output: CreateWorkflowVersionResponse,
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
}));
/**
 * Gets information about a workflow version. For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getWorkflowVersion: (
  input: GetWorkflowVersionRequest,
) => effect.Effect<
  GetWorkflowVersionResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWorkflowVersionRequest,
  output: GetWorkflowVersionResponse,
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
}));
/**
 * Updates information about the workflow version. For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const updateWorkflowVersion: (
  input: UpdateWorkflowVersionRequest,
) => effect.Effect<
  UpdateWorkflowVersionResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateWorkflowVersionRequest,
  output: UpdateWorkflowVersionResponse,
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
}));
/**
 * Deletes a workflow version. Deleting a workflow version doesn't affect any ongoing runs that are using the workflow version.
 *
 * For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteWorkflowVersion: (
  input: DeleteWorkflowVersionRequest,
) => effect.Effect<
  DeleteWorkflowVersionResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWorkflowVersionRequest,
  output: DeleteWorkflowVersionResponse,
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
}));
/**
 * Lists the workflow versions for the specified workflow. For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listWorkflowVersions: {
  (
    input: ListWorkflowVersionsRequest,
  ): effect.Effect<
    ListWorkflowVersionsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListWorkflowVersionsRequest,
  ) => stream.Stream<
    ListWorkflowVersionsResponse,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWorkflowVersionsRequest,
  ) => stream.Stream<
    WorkflowVersionListItem,
    | AccessDeniedException
    | ConflictException
    | InternalServerException
    | RequestTimeoutException
    | ResourceNotFoundException
    | ServiceQuotaExceededException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowVersionsRequest,
  output: ListWorkflowVersionsResponse,
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
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
}));
