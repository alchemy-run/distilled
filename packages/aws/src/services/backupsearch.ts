import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "BackupSearch",
  serviceShapeName: "CryoBackupSearchService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "backup-search" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://backup-search-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://backup-search.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://backup-search.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "BackupSearch",
  service: "BackupSearch",
  propagate: TxXray.propagate,
} as const;

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
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type GenericId = string;
export interface GetSearchJobInput {
  SearchJobIdentifier: string;
}
export interface SearchScopeSummary {
  TotalRecoveryPointsToScanCount?: number | undefined;
  TotalItemsToScanCount?: number | undefined;
}
export interface CurrentSearchProgress {
  RecoveryPointsScannedCount?: number | undefined;
  ItemsScannedCount?: number | undefined;
  ItemsMatchedCount?: number | undefined;
}
export type EncryptionKeyArn = string;
export type SearchJobState =
  | "RUNNING"
  | "COMPLETED"
  | "STOPPING"
  | "STOPPED"
  | "FAILED"
  | (string & {});
export type ResourceType = "S3" | "EBS" | (string & {});
export type ResourceTypeList = ResourceType[];
export interface BackupCreationTimeFilter {
  CreatedAfter?: Date | undefined;
  CreatedBefore?: Date | undefined;
}
export type ResourceArnList = string[];
export type RecoveryPoint = string;
export type RecoveryPointArnList = string[];
export type TagMap = { [key: string]: string | undefined };
export interface SearchScope {
  BackupResourceTypes: ResourceType[];
  BackupResourceCreationTime?: BackupCreationTimeFilter | undefined;
  SourceResourceArns?: string[] | undefined;
  BackupResourceArns?: string[] | undefined;
  BackupResourceTags?: { [key: string]: string | undefined } | undefined;
}
export type StringConditionOperator =
  | "EQUALS_TO"
  | "NOT_EQUALS_TO"
  | "CONTAINS"
  | "DOES_NOT_CONTAIN"
  | "BEGINS_WITH"
  | "ENDS_WITH"
  | "DOES_NOT_BEGIN_WITH"
  | "DOES_NOT_END_WITH"
  | (string & {});
export interface StringCondition {
  Value: string;
  Operator?: StringConditionOperator | undefined;
}
export type StringConditionList = StringCondition[];
export type LongConditionOperator =
  | "EQUALS_TO"
  | "NOT_EQUALS_TO"
  | "LESS_THAN_EQUAL_TO"
  | "GREATER_THAN_EQUAL_TO"
  | (string & {});
export interface LongCondition {
  Value: number;
  Operator?: LongConditionOperator | undefined;
}
export type LongConditionList = LongCondition[];
export type TimeConditionOperator =
  | "EQUALS_TO"
  | "NOT_EQUALS_TO"
  | "LESS_THAN_EQUAL_TO"
  | "GREATER_THAN_EQUAL_TO"
  | (string & {});
export interface TimeCondition {
  Value: Date;
  Operator?: TimeConditionOperator | undefined;
}
export type TimeConditionList = TimeCondition[];
export interface S3ItemFilter {
  ObjectKeys?: StringCondition[] | undefined;
  Sizes?: LongCondition[] | undefined;
  CreationTimes?: TimeCondition[] | undefined;
  VersionIds?: StringCondition[] | undefined;
  ETags?: StringCondition[] | undefined;
}
export type S3ItemFilters = S3ItemFilter[];
export interface EBSItemFilter {
  FilePaths?: StringCondition[] | undefined;
  Sizes?: LongCondition[] | undefined;
  CreationTimes?: TimeCondition[] | undefined;
  LastModificationTimes?: TimeCondition[] | undefined;
}
export type EBSItemFilters = EBSItemFilter[];
export interface ItemFilters {
  S3ItemFilters?: S3ItemFilter[] | undefined;
  EBSItemFilters?: EBSItemFilter[] | undefined;
}
export type SearchJobArn = string;
export interface GetSearchJobOutput {
  Name?: string | undefined;
  SearchScopeSummary?: SearchScopeSummary | undefined;
  CurrentSearchProgress?: CurrentSearchProgress | undefined;
  StatusMessage?: string | undefined;
  EncryptionKeyArn?: string | undefined;
  CompletionTime?: Date | undefined;
  Status: SearchJobState;
  SearchScope: SearchScope;
  ItemFilters: ItemFilters;
  CreationTime: Date;
  SearchJobIdentifier: string;
  SearchJobArn: string;
}
export interface GetSearchResultExportJobInput {
  ExportJobIdentifier: string;
}
export type ExportJobArn = string;
export type ExportJobStatus = "RUNNING" | "FAILED" | "COMPLETED" | (string & {});
export interface S3ExportSpecification {
  DestinationBucket: string;
  DestinationPrefix?: string | undefined;
}
export type ExportSpecification = { s3ExportSpecification: S3ExportSpecification };
export interface GetSearchResultExportJobOutput {
  ExportJobIdentifier: string;
  ExportJobArn?: string | undefined;
  Status?: ExportJobStatus | undefined;
  CreationTime?: Date | undefined;
  CompletionTime?: Date | undefined;
  StatusMessage?: string | undefined;
  ExportSpecification?: ExportSpecification | undefined;
  SearchJobArn?: string | undefined;
}
export interface ListSearchJobBackupsInput {
  SearchJobIdentifier: string;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface SearchJobBackupsResult {
  Status?: SearchJobState | undefined;
  StatusMessage?: string | undefined;
  ResourceType?: ResourceType | undefined;
  BackupResourceArn?: string | undefined;
  SourceResourceArn?: string | undefined;
  IndexCreationTime?: Date | undefined;
  BackupCreationTime?: Date | undefined;
}
export type SearchJobBackupsResults = SearchJobBackupsResult[];
export interface ListSearchJobBackupsOutput {
  Results: SearchJobBackupsResult[];
  NextToken?: string | undefined;
}
export interface ListSearchJobResultsInput {
  SearchJobIdentifier: string;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type ObjectKey = string | redacted.Redacted<string>;
export interface S3ResultItem {
  BackupResourceArn?: string | undefined;
  SourceResourceArn?: string | undefined;
  BackupVaultName?: string | undefined;
  ObjectKey?: string | redacted.Redacted<string> | undefined;
  ObjectSize?: number | undefined;
  CreationTime?: Date | undefined;
  ETag?: string | undefined;
  VersionId?: string | undefined;
}
export type FilePath = string | redacted.Redacted<string>;
export interface EBSResultItem {
  BackupResourceArn?: string | undefined;
  SourceResourceArn?: string | undefined;
  BackupVaultName?: string | undefined;
  FileSystemIdentifier?: string | undefined;
  FilePath?: string | redacted.Redacted<string> | undefined;
  FileSize?: number | undefined;
  CreationTime?: Date | undefined;
  LastModifiedTime?: Date | undefined;
}
export type ResultItem =
  | { S3ResultItem: S3ResultItem; EBSResultItem?: undefined }
  | { S3ResultItem?: undefined; EBSResultItem: EBSResultItem };
export type Results = ResultItem[];
export interface ListSearchJobResultsOutput {
  Results: ResultItem[];
  NextToken?: string | undefined;
}
export interface ListSearchJobsInput {
  ByStatus?: SearchJobState | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface SearchJobSummary {
  SearchJobIdentifier?: string | undefined;
  SearchJobArn?: string | undefined;
  Name?: string | undefined;
  Status?: SearchJobState | undefined;
  CreationTime?: Date | undefined;
  CompletionTime?: Date | undefined;
  SearchScopeSummary?: SearchScopeSummary | undefined;
  StatusMessage?: string | undefined;
}
export type SearchJobs = SearchJobSummary[];
export interface ListSearchJobsOutput {
  SearchJobs: SearchJobSummary[];
  NextToken?: string | undefined;
}
export interface ListSearchResultExportJobsInput {
  Status?: ExportJobStatus | undefined;
  SearchJobIdentifier?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ExportJobSummary {
  ExportJobIdentifier: string;
  ExportJobArn?: string | undefined;
  Status?: ExportJobStatus | undefined;
  CreationTime?: Date | undefined;
  CompletionTime?: Date | undefined;
  StatusMessage?: string | undefined;
  SearchJobArn?: string | undefined;
}
export type ExportJobSummaries = ExportJobSummary[];
export interface ListSearchResultExportJobsOutput {
  ExportJobs: ExportJobSummary[];
  NextToken?: string | undefined;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface StartSearchJobInput {
  Tags?: { [key: string]: string | undefined } | undefined;
  Name?: string | undefined;
  EncryptionKeyArn?: string | undefined;
  ClientToken?: string | undefined;
  SearchScope: SearchScope;
  ItemFilters?: ItemFilters | undefined;
}
export interface StartSearchJobOutput {
  SearchJobArn?: string | undefined;
  CreationTime?: Date | undefined;
  SearchJobIdentifier?: string | undefined;
}
export type IamRoleArn = string;
export interface StartSearchResultExportJobInput {
  SearchJobIdentifier: string;
  ExportSpecification: ExportSpecification;
  ClientToken?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  RoleArn?: string | undefined;
}
export interface StartSearchResultExportJobOutput {
  ExportJobArn?: string | undefined;
  ExportJobIdentifier: string;
}
export interface StopSearchJobInput {
  SearchJobIdentifier: string;
}
export interface StopSearchJobOutput {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type GetSearchJobError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation retrieves metadata of a search job, including its progress.
 */
export const getSearchJob: API.OperationMethod<
  GetSearchJobInput & RegionInput,
  GetSearchJobOutput,
  GetSearchJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<GetSearchJobInput>,
  output: __S(162, __c10, 2) as any as S.Schema<GetSearchJobOutput>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSearchJob",
  telemetry: TELEMETRY,
  span: "GetSearchJob",
}));

export type GetSearchResultExportJobError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation retrieves the metadata of an export job.
 *
 * An export job is an operation that transmits the results of a search job to a specified S3 bucket in a .csv file.
 *
 * An export job allows you to retain results of a search beyond the search job's scheduled retention of 7 days.
 */
export const getSearchResultExportJob: API.OperationMethod<
  GetSearchResultExportJobInput & RegionInput,
  GetSearchResultExportJobOutput,
  GetSearchResultExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<GetSearchResultExportJobInput>,
  output: __S(241, __c15, 1) as any as S.Schema<GetSearchResultExportJobOutput>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSearchResultExportJob",
  telemetry: TELEMETRY,
  span: "GetSearchResultExportJob",
}));

export type ListSearchJobBackupsError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns a list of all backups (recovery points) in a paginated format that were included in the search job.
 *
 * If a search does not display an expected backup in the results, you can call this operation to display each backup included in the search. Any backups that were not included because they have a `FAILED` status from a permissions issue will be displayed, along with a status message.
 *
 * Only recovery points with a backup index that has a status of `ACTIVE` will be included in search results. If the index has any other status, its status will be displayed along with a status message.
 */
export const listSearchJobBackups: API.PaginatedOperationMethod<
  ListSearchJobBackupsInput & RegionInput,
  ListSearchJobBackupsOutput,
  ListSearchJobBackupsError,
  Credentials | HttpClient.HttpClient,
  SearchJobBackupsResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<ListSearchJobBackupsInput>,
  output: __S(275, __c17, 3) as any as S.Schema<ListSearchJobBackupsOutput>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchJobBackups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSearchJobBackups",
})) as any;

export type ListSearchJobResultsError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns a list of a specified search job.
 */
export const listSearchJobResults: API.PaginatedOperationMethod<
  ListSearchJobResultsInput & RegionInput,
  ListSearchJobResultsOutput,
  ListSearchJobResultsError,
  Credentials | HttpClient.HttpClient,
  ResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListSearchJobResultsInput>,
  output: __S(5, __c0, 5) as any as S.Schema<ListSearchJobResultsOutput>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchJobResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSearchJobResults",
})) as any;

export type ListSearchJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns a list of search jobs belonging to an account.
 */
export const listSearchJobs: API.PaginatedOperationMethod<
  ListSearchJobsInput & RegionInput,
  ListSearchJobsOutput,
  ListSearchJobsError,
  Credentials | HttpClient.HttpClient,
  SearchJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<ListSearchJobsInput>,
  output: __S(19, __c1, 3) as any as S.Schema<ListSearchJobsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SearchJobs",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSearchJobs",
})) as any;

export type ListSearchResultExportJobsError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation exports search results of a search job to a specified destination S3 bucket.
 */
export const listSearchResultExportJobs: API.PaginatedOperationMethod<
  ListSearchResultExportJobsInput & RegionInput,
  ListSearchResultExportJobsOutput,
  ListSearchResultExportJobsError,
  Credentials | HttpClient.HttpClient,
  ExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<ListSearchResultExportJobsInput>,
  output: __S(35, __c2, 3) as any as S.Schema<ListSearchResultExportJobsOutput>,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchResultExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExportJobs",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSearchResultExportJobs",
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns the tags for a resource type.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type StartSearchJobError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates a search job which returns recovery points filtered by SearchScope and items filtered by ItemFilters.
 *
 * You can optionally include ClientToken, EncryptionKeyArn, Name, and/or Tags.
 */
export const startSearchJob: API.OperationMethod<
  StartSearchJobInput & RegionInput,
  StartSearchJobOutput,
  StartSearchJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<StartSearchJobInput>,
  output: __S(65, __c4, 1) as any as S.Schema<StartSearchJobOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSearchJob",
  telemetry: TELEMETRY,
  span: "StartSearchJob",
}));

export type StartSearchResultExportJobError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operations starts a job to export the results of search job to a designated S3 bucket.
 */
export const startSearchResultExportJob: API.OperationMethod<
  StartSearchResultExportJobInput & RegionInput,
  StartSearchResultExportJobOutput,
  StartSearchResultExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<StartSearchResultExportJobInput>,
  output: __S(81, __c5, 1) as any as S.Schema<StartSearchResultExportJobOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSearchResultExportJob",
  telemetry: TELEMETRY,
  span: "StartSearchResultExportJob",
}));

export type StopSearchJobError =
  | ConflictException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operations ends a search job.
 *
 * Only a search job with a status of `RUNNING` can be stopped.
 */
export const stopSearchJob: API.OperationMethod<
  StopSearchJobInput & RegionInput,
  StopSearchJobOutput,
  StopSearchJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<StopSearchJobInput>,
  output: __S(112, __c7, 0) as any as S.Schema<StopSearchJobOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSearchJob",
  telemetry: TELEMETRY,
  span: "StopSearchJob",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation puts tags on the resource you indicate.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SearchJobIdentifier: S.String.pipe(T.HttpLabel("SearchJobIdentifier")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/search-jobs/{SearchJobIdentifier}/search-results" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSearchJobResultsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupResourceArn: S.optional(S.String),
          SourceResourceArn: S.optional(S.String),
          BackupVaultName: S.optional(S.String),
          ObjectKey: S.optional(SensitiveString),
          ObjectSize: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ETag: S.optional(S.String),
          VersionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3ResultItem" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BackupResourceArn: S.optional(S.String),
          SourceResourceArn: S.optional(S.String),
          BackupVaultName: S.optional(S.String),
          FileSystemIdentifier: S.optional(S.String),
          FilePath: S.optional(SensitiveString),
          FileSize: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "EBSResultItem" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ S3ResultItem: __S(1, __c0, 1) }),
        /*@__PURE__*/ S.Struct({ EBSResultItem: __S(2, __c0, 2) }),
      ]);
    case 4:
      return S.Array(__S(3, __c0, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Results: __S(4, __c0, 4), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSearchJobResultsOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ByStatus: S.optional(S.String).pipe(T.HttpQuery("Status")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/search-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSearchJobsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SearchJobIdentifier: S.optional(S.String),
          SearchJobArn: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SearchScopeSummary: S.optional(__S(176, __c11, 0)),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchJobSummary" });
    case 2:
      return S.Array(__S(17, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ SearchJobs: __S(18, __c1, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSearchJobsOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String).pipe(T.HttpQuery("Status")),
          SearchJobIdentifier: S.optional(S.String).pipe(T.HttpQuery("SearchJobIdentifier")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/export-search-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSearchResultExportJobsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExportJobIdentifier: S.String,
          ExportJobArn: S.optional(S.String),
          Status: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StatusMessage: S.optional(S.String),
          SearchJobArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExportJobSummary" });
    case 2:
      return S.Array(__S(33, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ExportJobs: __S(34, __c2, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSearchResultExportJobsOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(192, __c12, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Tags: S.optional(__S(192, __c12, 0)),
          Name: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          ClientToken: S.optional(S.String),
          SearchScope: __S(210, __c13, 2),
          ItemFilters: S.optional(__S(221, __c13, 13)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/search-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartSearchJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SearchJobArn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SearchJobIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartSearchJobOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SearchJobIdentifier: S.String,
          ExportSpecification: __S(257, __c16, 1),
          ClientToken: S.optional(S.String),
          Tags: S.optional(__S(192, __c12, 0)),
          RoleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/export-search-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartSearchResultExportJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ExportJobArn: S.optional(S.String), ExportJobIdentifier: S.String }),
      ).annotate({ identifier: "StartSearchResultExportJobOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SearchJobIdentifier: S.String.pipe(T.HttpLabel("SearchJobIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/search-jobs/{SearchJobIdentifier}/actions/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopSearchJobInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "StopSearchJobOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(192, __c12, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(224, __c14, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SearchJobIdentifier: S.String.pipe(T.HttpLabel("SearchJobIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/search-jobs/{SearchJobIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSearchJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecoveryPointsScannedCount: S.optional(S.Number),
          ItemsScannedCount: S.optional(S.Number),
          ItemsMatchedCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CurrentSearchProgress" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          SearchScopeSummary: S.optional(__S(176, __c11, 0)),
          CurrentSearchProgress: S.optional(__S(161, __c10, 1)),
          StatusMessage: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.String,
          SearchScope: __S(210, __c13, 2),
          ItemFilters: __S(221, __c13, 13),
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          SearchJobIdentifier: S.String,
          SearchJobArn: S.String,
        }),
      ).annotate({ identifier: "GetSearchJobOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TotalRecoveryPointsToScanCount: S.optional(S.Number),
          TotalItemsToScanCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SearchScopeSummary" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional)).pipe(
        /*@__PURE__*/ T.Sparse(),
      );
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "BackupCreationTimeFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BackupResourceTypes: __S(208, __c13, 0),
          BackupResourceCreationTime: S.optional(__S(209, __c13, 1)),
          SourceResourceArns: S.optional(__S(224, __c14, 0)),
          BackupResourceArns: S.optional(__S(224, __c14, 0)),
          BackupResourceTags: S.optional(__S(192, __c12, 0)),
        }),
      ).annotate({ identifier: "SearchScope" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Value: S.String, Operator: S.optional(S.String) }),
      ).annotate({ identifier: "StringCondition" });
    case 4:
      return S.Array(__S(211, __c13, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Value: S.Number, Operator: S.optional(S.String) }),
      ).annotate({ identifier: "LongCondition" });
    case 6:
      return S.Array(__S(213, __c13, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Value: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Operator: S.optional(S.String),
        }),
      ).annotate({ identifier: "TimeCondition" });
    case 8:
      return S.Array(__S(215, __c13, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          ObjectKeys: S.optional(__S(212, __c13, 4)),
          Sizes: S.optional(__S(214, __c13, 6)),
          CreationTimes: S.optional(__S(216, __c13, 8)),
          VersionIds: S.optional(__S(212, __c13, 4)),
          ETags: S.optional(__S(212, __c13, 4)),
        }),
      ).annotate({ identifier: "S3ItemFilter" });
    case 10:
      return S.Array(__S(217, __c13, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          FilePaths: S.optional(__S(212, __c13, 4)),
          Sizes: S.optional(__S(214, __c13, 6)),
          CreationTimes: S.optional(__S(216, __c13, 8)),
          LastModificationTimes: S.optional(__S(216, __c13, 8)),
        }),
      ).annotate({ identifier: "EBSItemFilter" });
    case 12:
      return S.Array(__S(219, __c13, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          S3ItemFilters: S.optional(__S(218, __c13, 10)),
          EBSItemFilters: S.optional(__S(220, __c13, 12)),
        }),
      ).annotate({ identifier: "ItemFilters" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExportJobIdentifier: S.String.pipe(T.HttpLabel("ExportJobIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/export-search-jobs/{ExportJobIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSearchResultExportJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExportJobIdentifier: S.String,
          ExportJobArn: S.optional(S.String),
          Status: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StatusMessage: S.optional(S.String),
          ExportSpecification: S.optional(__S(257, __c16, 1)),
          SearchJobArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSearchResultExportJobOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DestinationBucket: S.String, DestinationPrefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3ExportSpecification" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ s3ExportSpecification: __S(256, __c16, 0) })]);
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SearchJobIdentifier: S.String.pipe(T.HttpLabel("SearchJobIdentifier")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/search-jobs/{SearchJobIdentifier}/backups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSearchJobBackupsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          ResourceType: S.optional(S.String),
          BackupResourceArn: S.optional(S.String),
          SourceResourceArn: S.optional(S.String),
          IndexCreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          BackupCreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SearchJobBackupsResult" });
    case 2:
      return S.Array(__S(273, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Results: __S(274, __c17, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSearchJobBackupsOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
