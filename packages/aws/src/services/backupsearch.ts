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
  sdkId: "BackupSearch",
  target: "CryoBackupSearchService",
  version: "2018-05-10",
  sigv4: "backup-search",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
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
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export type GenericId = string;
export interface GetSearchJobInput {
  SearchJobIdentifier: string;
}
export interface SearchScopeSummary {
  TotalRecoveryPointsToScanCount?: number;
  TotalItemsToScanCount?: number;
}
export interface CurrentSearchProgress {
  RecoveryPointsScannedCount?: number;
  ItemsScannedCount?: number;
  ItemsMatchedCount?: number;
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
  CreatedAfter?: Date;
  CreatedBefore?: Date;
}
export type ResourceArnList = string[];
export type RecoveryPoint = string;
export type RecoveryPointArnList = string[];
export type TagMap = { [key: string]: string | undefined };
export interface SearchScope {
  BackupResourceTypes: ResourceType[];
  BackupResourceCreationTime?: BackupCreationTimeFilter;
  SourceResourceArns?: string[];
  BackupResourceArns?: string[];
  BackupResourceTags?: { [key: string]: string | undefined };
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
  Operator?: StringConditionOperator;
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
  Operator?: LongConditionOperator;
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
  Operator?: TimeConditionOperator;
}
export type TimeConditionList = TimeCondition[];
export interface S3ItemFilter {
  ObjectKeys?: StringCondition[];
  Sizes?: LongCondition[];
  CreationTimes?: TimeCondition[];
  VersionIds?: StringCondition[];
  ETags?: StringCondition[];
}
export type S3ItemFilters = S3ItemFilter[];
export interface EBSItemFilter {
  FilePaths?: StringCondition[];
  Sizes?: LongCondition[];
  CreationTimes?: TimeCondition[];
  LastModificationTimes?: TimeCondition[];
}
export type EBSItemFilters = EBSItemFilter[];
export interface ItemFilters {
  S3ItemFilters?: S3ItemFilter[];
  EBSItemFilters?: EBSItemFilter[];
}
export type SearchJobArn = string;
export interface GetSearchJobOutput {
  Name?: string;
  SearchScopeSummary?: SearchScopeSummary;
  CurrentSearchProgress?: CurrentSearchProgress;
  StatusMessage?: string;
  EncryptionKeyArn?: string;
  CompletionTime?: Date;
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
export type ExportJobStatus =
  | "RUNNING"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export interface S3ExportSpecification {
  DestinationBucket: string;
  DestinationPrefix?: string;
}
export type ExportSpecification = {
  s3ExportSpecification: S3ExportSpecification;
};
export interface GetSearchResultExportJobOutput {
  ExportJobIdentifier: string;
  ExportJobArn?: string;
  Status?: ExportJobStatus;
  CreationTime?: Date;
  CompletionTime?: Date;
  StatusMessage?: string;
  ExportSpecification?: ExportSpecification;
  SearchJobArn?: string;
}
export interface ListSearchJobBackupsInput {
  SearchJobIdentifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface SearchJobBackupsResult {
  Status?: SearchJobState;
  StatusMessage?: string;
  ResourceType?: ResourceType;
  BackupResourceArn?: string;
  SourceResourceArn?: string;
  IndexCreationTime?: Date;
  BackupCreationTime?: Date;
}
export type SearchJobBackupsResults = SearchJobBackupsResult[];
export interface ListSearchJobBackupsOutput {
  Results: SearchJobBackupsResult[];
  NextToken?: string;
}
export interface ListSearchJobResultsInput {
  SearchJobIdentifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ObjectKey = string | redacted.Redacted<string>;
export interface S3ResultItem {
  BackupResourceArn?: string;
  SourceResourceArn?: string;
  BackupVaultName?: string;
  ObjectKey?: string | redacted.Redacted<string>;
  ObjectSize?: number;
  CreationTime?: Date;
  ETag?: string;
  VersionId?: string;
}
export type FilePath = string | redacted.Redacted<string>;
export interface EBSResultItem {
  BackupResourceArn?: string;
  SourceResourceArn?: string;
  BackupVaultName?: string;
  FileSystemIdentifier?: string;
  FilePath?: string | redacted.Redacted<string>;
  FileSize?: number;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type ResultItem =
  | { S3ResultItem: S3ResultItem; EBSResultItem?: never }
  | { S3ResultItem?: never; EBSResultItem: EBSResultItem };
export type Results = ResultItem[];
export interface ListSearchJobResultsOutput {
  Results: ResultItem[];
  NextToken?: string;
}
export interface ListSearchJobsInput {
  ByStatus?: SearchJobState;
  NextToken?: string;
  MaxResults?: number;
}
export interface SearchJobSummary {
  SearchJobIdentifier?: string;
  SearchJobArn?: string;
  Name?: string;
  Status?: SearchJobState;
  CreationTime?: Date;
  CompletionTime?: Date;
  SearchScopeSummary?: SearchScopeSummary;
  StatusMessage?: string;
}
export type SearchJobs = SearchJobSummary[];
export interface ListSearchJobsOutput {
  SearchJobs: SearchJobSummary[];
  NextToken?: string;
}
export interface ListSearchResultExportJobsInput {
  Status?: ExportJobStatus;
  SearchJobIdentifier?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ExportJobSummary {
  ExportJobIdentifier: string;
  ExportJobArn?: string;
  Status?: ExportJobStatus;
  CreationTime?: Date;
  CompletionTime?: Date;
  StatusMessage?: string;
  SearchJobArn?: string;
}
export type ExportJobSummaries = ExportJobSummary[];
export interface ListSearchResultExportJobsOutput {
  ExportJobs: ExportJobSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface StartSearchJobInput {
  Tags?: { [key: string]: string | undefined };
  Name?: string;
  EncryptionKeyArn?: string;
  ClientToken?: string;
  SearchScope: SearchScope;
  ItemFilters?: ItemFilters;
}
export interface StartSearchJobOutput {
  SearchJobArn?: string;
  CreationTime?: Date;
  SearchJobIdentifier?: string;
}
export type IamRoleArn = string;
export interface StartSearchResultExportJobInput {
  SearchJobIdentifier: string;
  ExportSpecification: ExportSpecification;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  RoleArn?: string;
}
export interface StartSearchResultExportJobOutput {
  ExportJobArn?: string;
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
export type GetSearchJobError = ResourceNotFoundException | CommonErrors;
/**
 * This operation retrieves metadata of a search job, including its progress.
 */
export const getSearchJob: API.OperationMethod<
  GetSearchJobInput,
  GetSearchJobOutput,
  GetSearchJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /search-jobs/{SearchJobIdentifier}",
    input: { SearchJobIdentifier: 0 },
    output: {
      CompletionTime: D.ts,
      SearchScope: {
        BackupResourceCreationTime: { CreatedAfter: D.ts, CreatedBefore: D.ts },
      },
      ItemFilters: {
        S3ItemFilters: D.list({ CreationTimes: D.list(o_TimeCondition) }),
        EBSItemFilters: D.list({
          CreationTimes: D.list(o_TimeCondition),
          LastModificationTimes: D.list(o_TimeCondition),
        }),
      },
      CreationTime: D.ts,
    },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSearchJob",
})) as any;

export type GetSearchResultExportJobError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation retrieves the metadata of an export job.
 *
 * An export job is an operation that transmits the results of a search job to a specified S3 bucket in a .csv file.
 *
 * An export job allows you to retain results of a search beyond the search job's scheduled retention of 7 days.
 */
export const getSearchResultExportJob: API.OperationMethod<
  GetSearchResultExportJobInput,
  GetSearchResultExportJobOutput,
  GetSearchResultExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /export-search-jobs/{ExportJobIdentifier}",
    input: { ExportJobIdentifier: 0 },
    output: { CreationTime: D.ts, CompletionTime: D.ts },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSearchResultExportJob",
})) as any;

export type ListSearchJobBackupsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation returns a list of all backups (recovery points) in a paginated format that were included in the search job.
 *
 * If a search does not display an expected backup in the results, you can call this operation to display each backup included in the search. Any backups that were not included because they have a `FAILED` status from a permissions issue will be displayed, along with a status message.
 *
 * Only recovery points with a backup index that has a status of `ACTIVE` will be included in search results. If the index has any other status, its status will be displayed along with a status message.
 */
export const listSearchJobBackups: API.PaginatedOperationMethod<
  ListSearchJobBackupsInput,
  ListSearchJobBackupsOutput,
  ListSearchJobBackupsError,
  Credentials | HttpClient.HttpClient,
  SearchJobBackupsResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /search-jobs/{SearchJobIdentifier}/backups",
    input: {
      SearchJobIdentifier: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      Results: D.list({ IndexCreationTime: D.ts, BackupCreationTime: D.ts }),
    },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchJobBackups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSearchJobResultsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation returns a list of a specified search job.
 */
export const listSearchJobResults: API.PaginatedOperationMethod<
  ListSearchJobResultsInput,
  ListSearchJobResultsOutput,
  ListSearchJobResultsError,
  Credentials | HttpClient.HttpClient,
  ResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /search-jobs/{SearchJobIdentifier}/search-results",
    input: {
      SearchJobIdentifier: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      Results: D.list({
        S3ResultItem: { ObjectKey: D.secret, CreationTime: D.ts },
        EBSResultItem: {
          FilePath: D.secret,
          CreationTime: D.ts,
          LastModifiedTime: D.ts,
        },
      }),
    },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchJobResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSearchJobsError = CommonErrors;
/**
 * This operation returns a list of search jobs belonging to an account.
 */
export const listSearchJobs: API.PaginatedOperationMethod<
  ListSearchJobsInput,
  ListSearchJobsOutput,
  ListSearchJobsError,
  Credentials | HttpClient.HttpClient,
  SearchJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /search-jobs",
    input: {
      ByStatus: D.m({ query: "Status" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      SearchJobs: D.list({ CreationTime: D.ts, CompletionTime: D.ts }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SearchJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSearchResultExportJobsError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * This operation exports search results of a search job to a specified destination S3 bucket.
 */
export const listSearchResultExportJobs: API.PaginatedOperationMethod<
  ListSearchResultExportJobsInput,
  ListSearchResultExportJobsOutput,
  ListSearchResultExportJobsError,
  Credentials | HttpClient.HttpClient,
  ExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /export-search-jobs",
    input: {
      Status: D.m({ query: "Status" }),
      SearchJobIdentifier: D.m({ query: "SearchJobIdentifier" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      ExportJobs: D.list({ CreationTime: D.ts, CompletionTime: D.ts }),
    },
  },
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSearchResultExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExportJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * This operation returns the tags for a resource type.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type StartSearchJobError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * This operation creates a search job which returns recovery points filtered by SearchScope and items filtered by ItemFilters.
 *
 * You can optionally include ClientToken, EncryptionKeyArn, Name, and/or Tags.
 */
export const startSearchJob: API.OperationMethod<
  StartSearchJobInput,
  StartSearchJobOutput,
  StartSearchJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /search-jobs",
    input: {
      Tags: 0,
      Name: 0,
      EncryptionKeyArn: 0,
      ClientToken: 0,
      SearchScope: {
        BackupResourceTypes: 0,
        BackupResourceCreationTime: { CreatedAfter: 0, CreatedBefore: 0 },
        SourceResourceArns: 0,
        BackupResourceArns: 0,
        BackupResourceTags: 0,
      },
      ItemFilters: {
        S3ItemFilters: D.list({
          ObjectKeys: D.list(i_StringCondition),
          Sizes: D.list(i_LongCondition),
          CreationTimes: D.list(i_TimeCondition),
          VersionIds: D.list(i_StringCondition),
          ETags: D.list(i_StringCondition),
        }),
        EBSItemFilters: D.list({
          FilePaths: D.list(i_StringCondition),
          Sizes: D.list(i_LongCondition),
          CreationTimes: D.list(i_TimeCondition),
          LastModificationTimes: D.list(i_TimeCondition),
        }),
      },
    },
    output: { CreationTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSearchJob",
})) as any;

export type StartSearchResultExportJobError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * This operations starts a job to export the results of search job to a designated S3 bucket.
 */
export const startSearchResultExportJob: API.OperationMethod<
  StartSearchResultExportJobInput,
  StartSearchResultExportJobOutput,
  StartSearchResultExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /export-search-jobs",
    input: {
      SearchJobIdentifier: 0,
      ExportSpecification: {
        s3ExportSpecification: { DestinationBucket: 0, DestinationPrefix: 0 },
      },
      ClientToken: 0,
      Tags: 0,
      RoleArn: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSearchResultExportJob",
})) as any;

export type StopSearchJobError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operations ends a search job.
 *
 * Only a search job with a status of `RUNNING` can be stopped.
 */
export const stopSearchJob: API.OperationMethod<
  StopSearchJobInput,
  StopSearchJobOutput,
  StopSearchJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /search-jobs/{SearchJobIdentifier}/actions/cancel",
    input: { SearchJobIdentifier: 0 },
  },
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSearchJob",
})) as any;

export type TagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * This operation puts tags on the resource you indicate.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * This operation removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_LongCondition: D.LazyStruct = () => ({ Value: 0, Operator: 0 });
const i_StringCondition: D.LazyStruct = () => ({ Value: 0, Operator: 0 });
const i_TimeCondition: D.LazyStruct = () => ({ Value: 0, Operator: 0 });
const o_TimeCondition: D.LazyStruct = () => ({ Value: D.ts });
