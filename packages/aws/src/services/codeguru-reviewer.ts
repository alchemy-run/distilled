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
  sdkId: "CodeGuru Reviewer",
  serviceShapeName: "AWSGuruFrontendService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "codeguru-reviewer" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-09-19");
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
              `https://codeguru-reviewer-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://codeguru-reviewer-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codeguru-reviewer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://codeguru-reviewer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://codeguru-reviewer.{R}.{D}","properties":{},"headers":{}}');

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
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Name = string;
export interface CodeCommitRepository {
  Name: string;
}
export type ConnectionArn = string;
export type Owner = string;
export interface ThirdPartySourceRepository {
  Name: string;
  ConnectionArn: string;
  Owner: string;
}
export type S3BucketName = string;
export interface S3Repository {
  Name: string;
  BucketName: string;
}
export interface Repository {
  CodeCommit?: CodeCommitRepository;
  Bitbucket?: ThirdPartySourceRepository;
  GitHubEnterpriseServer?: ThirdPartySourceRepository;
  S3Bucket?: S3Repository;
}
export type ClientRequestToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type KMSKeyId = string;
export type EncryptionOption = "AWS_OWNED_CMK" | "CUSTOMER_MANAGED_CMK" | (string & {});
export interface KMSKeyDetails {
  KMSKeyId?: string;
  EncryptionOption?: EncryptionOption;
}
export interface AssociateRepositoryRequest {
  Repository: Repository;
  ClientRequestToken?: string;
  Tags?: { [key: string]: string | undefined };
  KMSKeyDetails?: KMSKeyDetails;
}
export type AssociationId = string;
export type Arn = string;
export type ProviderType =
  | "CodeCommit"
  | "GitHub"
  | "Bitbucket"
  | "GitHubEnterpriseServer"
  | "S3Bucket"
  | (string & {});
export type RepositoryAssociationState =
  | "Associated"
  | "Associating"
  | "Failed"
  | "Disassociating"
  | "Disassociated"
  | (string & {});
export type StateReason = string;
export type SourceCodeArtifactsObjectKey = string;
export type BuildArtifactsObjectKey = string;
export interface CodeArtifacts {
  SourceCodeArtifactsObjectKey: string;
  BuildArtifactsObjectKey?: string;
}
export interface S3RepositoryDetails {
  BucketName?: string;
  CodeArtifacts?: CodeArtifacts;
}
export interface RepositoryAssociation {
  AssociationId?: string;
  AssociationArn?: string;
  ConnectionArn?: string;
  Name?: string;
  Owner?: string;
  ProviderType?: ProviderType;
  State?: RepositoryAssociationState;
  StateReason?: string;
  LastUpdatedTimeStamp?: Date;
  CreatedTimeStamp?: Date;
  KMSKeyDetails?: KMSKeyDetails;
  S3RepositoryDetails?: S3RepositoryDetails;
}
export interface AssociateRepositoryResponse {
  RepositoryAssociation?: RepositoryAssociation;
  Tags?: { [key: string]: string | undefined };
}
export type CodeReviewName = string;
export type AssociationArn = string;
export type BranchName = string;
export interface RepositoryHeadSourceCodeType {
  BranchName: string;
}
export type CommitId = string;
export interface CommitDiffSourceCodeType {
  SourceCommit?: string;
  DestinationCommit?: string;
  MergeBaseCommit?: string;
}
export interface BranchDiffSourceCodeType {
  SourceBranchName: string;
  DestinationBranchName: string;
}
export interface S3BucketRepository {
  Name: string;
  Details?: S3RepositoryDetails;
}
export type RequestId = string;
export type Requester = string;
export type EventName = string;
export type EventState = string;
export interface EventInfo {
  Name?: string;
  State?: string;
}
export type VendorName = "GitHub" | "GitLab" | "NativeS3" | (string & {});
export interface RequestMetadata {
  RequestId?: string;
  Requester?: string;
  EventInfo?: EventInfo;
  VendorName?: VendorName;
}
export interface SourceCodeType {
  CommitDiff?: CommitDiffSourceCodeType;
  RepositoryHead?: RepositoryHeadSourceCodeType;
  BranchDiff?: BranchDiffSourceCodeType;
  S3BucketRepository?: S3BucketRepository;
  RequestMetadata?: RequestMetadata;
}
export interface RepositoryAnalysis {
  RepositoryHead?: RepositoryHeadSourceCodeType;
  SourceCodeType?: SourceCodeType;
}
export type AnalysisType = "Security" | "CodeQuality" | (string & {});
export type AnalysisTypes = AnalysisType[];
export interface CodeReviewType {
  RepositoryAnalysis: RepositoryAnalysis;
  AnalysisTypes?: AnalysisType[];
}
export interface CreateCodeReviewRequest {
  Name: string;
  RepositoryAssociationArn: string;
  Type: CodeReviewType;
  ClientRequestToken?: string;
}
export type JobState = "Completed" | "Pending" | "Failed" | "Deleting" | (string & {});
export type Type = "PullRequest" | "RepositoryAnalysis" | (string & {});
export type PullRequestId = string;
export type LinesOfCodeCount = number;
export type FindingsCount = number;
export interface Metrics {
  MeteredLinesOfCodeCount?: number;
  SuppressedLinesOfCodeCount?: number;
  FindingsCount?: number;
}
export type ConfigFileState = "Present" | "Absent" | "PresentWithErrors" | (string & {});
export interface CodeReview {
  Name?: string;
  CodeReviewArn?: string;
  RepositoryName?: string;
  Owner?: string;
  ProviderType?: ProviderType;
  State?: JobState;
  StateReason?: string;
  CreatedTimeStamp?: Date;
  LastUpdatedTimeStamp?: Date;
  Type?: Type;
  PullRequestId?: string;
  SourceCodeType?: SourceCodeType;
  AssociationArn?: string;
  Metrics?: Metrics;
  AnalysisTypes?: AnalysisType[];
  ConfigFileState?: ConfigFileState;
}
export interface CreateCodeReviewResponse {
  CodeReview?: CodeReview;
}
export interface DescribeCodeReviewRequest {
  CodeReviewArn: string;
}
export interface DescribeCodeReviewResponse {
  CodeReview?: CodeReview;
}
export type RecommendationId = string;
export type UserId = string;
export interface DescribeRecommendationFeedbackRequest {
  CodeReviewArn: string;
  RecommendationId: string;
  UserId?: string;
}
export type Reaction = "ThumbsUp" | "ThumbsDown" | (string & {});
export type Reactions = Reaction[];
export interface RecommendationFeedback {
  CodeReviewArn?: string;
  RecommendationId?: string;
  Reactions?: Reaction[];
  UserId?: string;
  CreatedTimeStamp?: Date;
  LastUpdatedTimeStamp?: Date;
}
export interface DescribeRecommendationFeedbackResponse {
  RecommendationFeedback?: RecommendationFeedback;
}
export interface DescribeRepositoryAssociationRequest {
  AssociationArn: string;
}
export interface DescribeRepositoryAssociationResponse {
  RepositoryAssociation?: RepositoryAssociation;
  Tags?: { [key: string]: string | undefined };
}
export interface DisassociateRepositoryRequest {
  AssociationArn: string;
}
export interface DisassociateRepositoryResponse {
  RepositoryAssociation?: RepositoryAssociation;
  Tags?: { [key: string]: string | undefined };
}
export type ProviderTypes = ProviderType[];
export type JobStates = JobState[];
export type RepositoryNames = string[];
export type ListCodeReviewsMaxResults = number;
export type NextToken = string;
export interface ListCodeReviewsRequest {
  ProviderTypes?: ProviderType[];
  States?: JobState[];
  RepositoryNames?: string[];
  Type: Type;
  MaxResults?: number;
  NextToken?: string;
}
export interface MetricsSummary {
  MeteredLinesOfCodeCount?: number;
  SuppressedLinesOfCodeCount?: number;
  FindingsCount?: number;
}
export interface CodeReviewSummary {
  Name?: string;
  CodeReviewArn?: string;
  RepositoryName?: string;
  Owner?: string;
  ProviderType?: ProviderType;
  State?: JobState;
  CreatedTimeStamp?: Date;
  LastUpdatedTimeStamp?: Date;
  Type?: Type;
  PullRequestId?: string;
  MetricsSummary?: MetricsSummary;
  SourceCodeType?: SourceCodeType;
}
export type CodeReviewSummaries = CodeReviewSummary[];
export interface ListCodeReviewsResponse {
  CodeReviewSummaries?: CodeReviewSummary[];
  NextToken?: string;
}
export type MaxResults = number;
export type UserIds = string[];
export type RecommendationIds = string[];
export interface ListRecommendationFeedbackRequest {
  NextToken?: string;
  MaxResults?: number;
  CodeReviewArn: string;
  UserIds?: string[];
  RecommendationIds?: string[];
}
export interface RecommendationFeedbackSummary {
  RecommendationId?: string;
  Reactions?: Reaction[];
  UserId?: string;
}
export type RecommendationFeedbackSummaries = RecommendationFeedbackSummary[];
export interface ListRecommendationFeedbackResponse {
  RecommendationFeedbackSummaries?: RecommendationFeedbackSummary[];
  NextToken?: string;
}
export type ListRecommendationsMaxResults = number;
export interface ListRecommendationsRequest {
  NextToken?: string;
  MaxResults?: number;
  CodeReviewArn: string;
}
export type FilePath = string;
export type LineNumber = number;
export type Text = string;
export type RecommendationCategory =
  | "AWSBestPractices"
  | "AWSCloudFormationIssues"
  | "DuplicateCode"
  | "CodeMaintenanceIssues"
  | "ConcurrencyIssues"
  | "InputValidations"
  | "PythonBestPractices"
  | "JavaBestPractices"
  | "ResourceLeaks"
  | "SecurityIssues"
  | "CodeInconsistencies"
  | (string & {});
export type RuleId = string;
export type RuleName = string;
export type ShortDescription = string;
export type LongDescription = string;
export type RuleTag = string;
export type RuleTags = string[];
export interface RuleMetadata {
  RuleId?: string;
  RuleName?: string;
  ShortDescription?: string;
  LongDescription?: string;
  RuleTags?: string[];
}
export type Severity = "Info" | "Low" | "Medium" | "High" | "Critical" | (string & {});
export interface RecommendationSummary {
  FilePath?: string;
  RecommendationId?: string;
  StartLine?: number;
  EndLine?: number;
  Description?: string;
  RecommendationCategory?: RecommendationCategory;
  RuleMetadata?: RuleMetadata;
  Severity?: Severity;
}
export type RecommendationSummaries = RecommendationSummary[];
export interface ListRecommendationsResponse {
  RecommendationSummaries?: RecommendationSummary[];
  NextToken?: string;
}
export type RepositoryAssociationStates = RepositoryAssociationState[];
export type Names = string[];
export type Owners = string[];
export interface ListRepositoryAssociationsRequest {
  ProviderTypes?: ProviderType[];
  States?: RepositoryAssociationState[];
  Names?: string[];
  Owners?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export interface RepositoryAssociationSummary {
  AssociationArn?: string;
  ConnectionArn?: string;
  LastUpdatedTimeStamp?: Date;
  AssociationId?: string;
  Name?: string;
  Owner?: string;
  ProviderType?: ProviderType;
  State?: RepositoryAssociationState;
}
export type RepositoryAssociationSummaries = RepositoryAssociationSummary[];
export interface ListRepositoryAssociationsResponse {
  RepositoryAssociationSummaries?: RepositoryAssociationSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface PutRecommendationFeedbackRequest {
  CodeReviewArn: string;
  RecommendationId: string;
  Reactions: Reaction[];
}
export interface PutRecommendationFeedbackResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type ErrorMessage = string;
export type AssociateRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use to associate an Amazon Web Services CodeCommit repository or a repository managed by Amazon Web Services
 * CodeStar Connections with Amazon CodeGuru Reviewer. When you associate a repository, CodeGuru Reviewer reviews
 * source code changes in the repository's pull requests and provides automatic
 * recommendations. You can view recommendations using the CodeGuru Reviewer console. For more
 * information, see Recommendations in
 * Amazon CodeGuru Reviewer in the *Amazon CodeGuru Reviewer User Guide.*
 *
 * If you associate a CodeCommit or S3 repository, it must be in the same Amazon Web Services Region and
 * Amazon Web Services account where its CodeGuru Reviewer code reviews are configured.
 *
 * Bitbucket and GitHub Enterprise Server repositories are managed by Amazon Web Services CodeStar
 * Connections to connect to CodeGuru Reviewer. For more information, see Associate a
 * repository in the *Amazon CodeGuru Reviewer User Guide.*
 *
 * You cannot use the CodeGuru Reviewer SDK or the Amazon Web Services CLI to associate a GitHub repository with
 * Amazon CodeGuru Reviewer. To associate a GitHub repository, use the console. For more information, see
 * Getting started with
 * CodeGuru Reviewer in the *CodeGuru Reviewer User Guide.*
 */
export const associateRepository: API.OperationMethod<
  AssociateRepositoryRequest,
  AssociateRepositoryResponse,
  AssociateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(108, __c13, 4) as any as S.Schema<AssociateRepositoryRequest>,
  output: __S(114, __c14, 2) as any as S.Schema<AssociateRepositoryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateRepository",
}));

export type CreateCodeReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use to create a code review with a CodeReviewType of
 * `RepositoryAnalysis`. This type of code review analyzes all code under a
 * specified branch in an associated repository. `PullRequest` code reviews are
 * automatically triggered by a pull request.
 */
export const createCodeReview: API.OperationMethod<
  CreateCodeReviewRequest,
  CreateCodeReviewResponse,
  CreateCodeReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(138, __c17, 2) as any as S.Schema<CreateCodeReviewRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<CreateCodeReviewResponse>,
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
  operationName: "CreateCodeReview",
}));

export type DescribeCodeReviewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the metadata associated with the code review along with its status.
 */
export const describeCodeReview: API.OperationMethod<
  DescribeCodeReviewRequest,
  DescribeCodeReviewResponse,
  DescribeCodeReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<DescribeCodeReviewRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<DescribeCodeReviewResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCodeReview",
}));

export type DescribeRecommendationFeedbackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the customer feedback for a CodeGuru Reviewer recommendation.
 */
export const describeRecommendationFeedback: API.OperationMethod<
  DescribeRecommendationFeedbackRequest,
  DescribeRecommendationFeedbackResponse,
  DescribeRecommendationFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DescribeRecommendationFeedbackRequest>,
  output: __S(2, __c0, 2) as any as S.Schema<DescribeRecommendationFeedbackResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecommendationFeedback",
}));

export type DescribeRepositoryAssociationError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a RepositoryAssociation object that contains information about the requested
 * repository association.
 */
export const describeRepositoryAssociation: API.OperationMethod<
  DescribeRepositoryAssociationRequest,
  DescribeRepositoryAssociationResponse,
  DescribeRepositoryAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<DescribeRepositoryAssociationRequest>,
  output: __S(114, __c14, 2) as any as S.Schema<DescribeRepositoryAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRepositoryAssociation",
}));

export type DisassociateRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between Amazon CodeGuru Reviewer and a repository.
 */
export const disassociateRepository: API.OperationMethod<
  DisassociateRepositoryRequest,
  DisassociateRepositoryResponse,
  DisassociateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<DisassociateRepositoryRequest>,
  output: __S(114, __c14, 2) as any as S.Schema<DisassociateRepositoryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateRepository",
}));

export type ListCodeReviewsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the code reviews that the customer has created in the past 90 days.
 */
export const listCodeReviews: API.PaginatedOperationMethod<
  ListCodeReviewsRequest,
  ListCodeReviewsResponse,
  ListCodeReviewsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<ListCodeReviewsRequest>,
  output: __S(27, __c3, 3) as any as S.Schema<ListCodeReviewsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeReviews",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecommendationFeedbackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of RecommendationFeedbackSummary objects that contain customer recommendation
 * feedback for all CodeGuru Reviewer users.
 */
export const listRecommendationFeedback: API.PaginatedOperationMethod<
  ListRecommendationFeedbackRequest,
  ListRecommendationFeedbackResponse,
  ListRecommendationFeedbackError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<ListRecommendationFeedbackRequest>,
  output: __S(43, __c5, 3) as any as S.Schema<ListRecommendationFeedbackResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendationFeedback",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of all recommendations for a completed code review.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<ListRecommendationsRequest>,
  output: __S(52, __c6, 4) as any as S.Schema<ListRecommendationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRepositoryAssociationsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of RepositoryAssociationSummary objects that contain summary information about a
 * repository association. You can filter the returned list by ProviderType, Name, State, and Owner.
 */
export const listRepositoryAssociations: API.PaginatedOperationMethod<
  ListRepositoryAssociationsRequest,
  ListRepositoryAssociationsResponse,
  ListRepositoryAssociationsError,
  Credentials | HttpClient.HttpClient,
  RepositoryAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<ListRepositoryAssociationsRequest>,
  output: __S(59, __c7, 3) as any as S.Schema<ListRepositoryAssociationsResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositoryAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RepositoryAssociationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of tags associated with an associated repository resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(65, __c8, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutRecommendationFeedbackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stores customer feedback for a CodeGuru Reviewer recommendation. When this API is called again with
 * different reactions the previous feedback is overwritten.
 */
export const putRecommendationFeedback: API.OperationMethod<
  PutRecommendationFeedbackRequest,
  PutRecommendationFeedbackResponse,
  PutRecommendationFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<PutRecommendationFeedbackRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<PutRecommendationFeedbackResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRecommendationFeedback",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to an associated repository.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from an associated repository.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CodeReviewArn: S.String.pipe(T.HttpLabel("CodeReviewArn")),
          RecommendationId: S.String.pipe(T.HttpQuery("RecommendationId")),
          UserId: S.optional(S.String).pipe(T.HttpQuery("UserId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/feedback/{CodeReviewArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeRecommendationFeedbackRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CodeReviewArn: S.optional(S.String),
          RecommendationId: S.optional(S.String),
          Reactions: S.optional(__S(152, __c19, 0)),
          UserId: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RecommendationFeedback" });
    case 2:
      return S.suspend(() =>
        S.Struct({ RecommendationFeedback: S.optional(__S(1, __c0, 1)) }),
      ).annotate({ identifier: "DescribeRecommendationFeedbackResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AssociationArn: S.String.pipe(T.HttpLabel("AssociationArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/associations/{AssociationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeRepositoryAssociationRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AssociationArn: S.String.pipe(T.HttpLabel("AssociationArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/associations/{AssociationArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateRepositoryRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProviderTypes: S.optional(__S(152, __c19, 0)).pipe(T.HttpQuery("ProviderTypes")),
          States: S.optional(__S(152, __c19, 0)).pipe(T.HttpQuery("States")),
          RepositoryNames: S.optional(__S(32, __c4, 0)).pipe(T.HttpQuery("RepositoryNames")),
          Type: S.String.pipe(T.HttpQuery("Type")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/codereviews" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCodeReviewsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CodeReviewArn: S.optional(S.String),
          RepositoryName: S.optional(S.String),
          Owner: S.optional(S.String),
          ProviderType: S.optional(S.String),
          State: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Type: S.optional(S.String),
          PullRequestId: S.optional(S.String),
          MetricsSummary: S.optional(__S(167, __c20, 7)),
          SourceCodeType: S.optional(__S(166, __c20, 6)),
        }),
      ).annotate({ identifier: "CodeReviewSummary" });
    case 2:
      return S.Array(__S(25, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CodeReviewSummaries: S.optional(__S(26, __c3, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCodeReviewsResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          CodeReviewArn: S.String.pipe(T.HttpLabel("CodeReviewArn")),
          UserIds: S.optional(__S(32, __c4, 0)).pipe(T.HttpQuery("UserIds")),
          RecommendationIds: S.optional(__S(32, __c4, 0)).pipe(T.HttpQuery("RecommendationIds")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/feedback/{CodeReviewArn}/RecommendationFeedback" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommendationFeedbackRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecommendationId: S.optional(S.String),
          Reactions: S.optional(__S(152, __c19, 0)),
          UserId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommendationFeedbackSummary" });
    case 2:
      return S.Array(__S(41, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RecommendationFeedbackSummaries: S.optional(__S(42, __c5, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRecommendationFeedbackResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          CodeReviewArn: S.String.pipe(T.HttpLabel("CodeReviewArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/codereviews/{CodeReviewArn}/Recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleId: S.optional(S.String),
          RuleName: S.optional(S.String),
          ShortDescription: S.optional(S.String),
          LongDescription: S.optional(S.String),
          RuleTags: S.optional(__S(32, __c4, 0)),
        }),
      ).annotate({ identifier: "RuleMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FilePath: S.optional(S.String),
          RecommendationId: S.optional(S.String),
          StartLine: S.optional(S.Number),
          EndLine: S.optional(S.Number),
          Description: S.optional(S.String),
          RecommendationCategory: S.optional(S.String),
          RuleMetadata: S.optional(__S(49, __c6, 1)),
          Severity: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommendationSummary" });
    case 3:
      return S.Array(__S(50, __c6, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          RecommendationSummaries: S.optional(__S(51, __c6, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRecommendationsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProviderTypes: S.optional(__S(152, __c19, 0)).pipe(T.HttpQuery("ProviderType")),
          States: S.optional(__S(152, __c19, 0)).pipe(T.HttpQuery("State")),
          Names: S.optional(__S(32, __c4, 0)).pipe(T.HttpQuery("Name")),
          Owners: S.optional(__S(32, __c4, 0)).pipe(T.HttpQuery("Owner")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/associations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRepositoryAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssociationArn: S.optional(S.String),
          ConnectionArn: S.optional(S.String),
          LastUpdatedTimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AssociationId: S.optional(S.String),
          Name: S.optional(S.String),
          Owner: S.optional(S.String),
          ProviderType: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "RepositoryAssociationSummary" });
    case 2:
      return S.Array(__S(57, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RepositoryAssociationSummaries: S.optional(__S(58, __c7, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRepositoryAssociationsResponse" });
  }
}
function __c8(j: number): any {
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
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(120, __c15, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CodeReviewArn: S.String,
          RecommendationId: S.String,
          Reactions: __S(152, __c19, 0),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/feedback" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutRecommendationFeedbackRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "PutRecommendationFeedbackResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          Tags: __S(120, __c15, 0),
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
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          TagKeys: __S(32, __c4, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String })).annotate({
        identifier: "CodeCommitRepository",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.String, ConnectionArn: S.String, Owner: S.String }),
      ).annotate({ identifier: "ThirdPartySourceRepository" });
    case 2:
      return S.suspend(() => S.Struct({ Name: S.String, BucketName: S.String })).annotate({
        identifier: "S3Repository",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CodeCommit: S.optional(__S(104, __c13, 0)),
          Bitbucket: S.optional(__S(105, __c13, 1)),
          GitHubEnterpriseServer: S.optional(__S(105, __c13, 1)),
          S3Bucket: S.optional(__S(106, __c13, 2)),
        }),
      ).annotate({ identifier: "Repository" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Repository: __S(107, __c13, 3),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(120, __c15, 0)),
          KMSKeyDetails: S.optional(__S(112, __c14, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/associations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateRepositoryRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KMSKeyId: S.optional(S.String), EncryptionOption: S.optional(S.String) }),
      ).annotate({ identifier: "KMSKeyDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          AssociationArn: S.optional(S.String),
          ConnectionArn: S.optional(S.String),
          Name: S.optional(S.String),
          Owner: S.optional(S.String),
          ProviderType: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          LastUpdatedTimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedTimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          KMSKeyDetails: S.optional(__S(112, __c14, 0)),
          S3RepositoryDetails: S.optional(__S(129, __c16, 1)),
        }),
      ).annotate({ identifier: "RepositoryAssociation" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RepositoryAssociation: S.optional(__S(113, __c14, 1)),
          Tags: S.optional(__S(120, __c15, 0)),
        }),
      ).annotate({ identifier: "AssociateRepositoryResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceCodeArtifactsObjectKey: S.String,
          BuildArtifactsObjectKey: S.optional(S.String),
        }),
      ).annotate({ identifier: "CodeArtifacts" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.optional(S.String),
          CodeArtifacts: S.optional(__S(128, __c16, 0)),
        }),
      ).annotate({ identifier: "S3RepositoryDetails" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RepositoryHead: S.optional(__S(160, __c20, 0)),
          SourceCodeType: S.optional(__S(166, __c20, 6)),
        }),
      ).annotate({ identifier: "RepositoryAnalysis" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RepositoryAnalysis: __S(136, __c17, 0),
          AnalysisTypes: S.optional(__S(152, __c19, 0)),
        }),
      ).annotate({ identifier: "CodeReviewType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          RepositoryAssociationArn: S.String,
          Type: __S(137, __c17, 1),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/codereviews" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateCodeReviewRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CodeReviewArn: S.optional(S.String),
          RepositoryName: S.optional(S.String),
          Owner: S.optional(S.String),
          ProviderType: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Type: S.optional(S.String),
          PullRequestId: S.optional(S.String),
          SourceCodeType: S.optional(__S(166, __c20, 6)),
          AssociationArn: S.optional(S.String),
          Metrics: S.optional(__S(167, __c20, 7)),
          AnalysisTypes: S.optional(__S(152, __c19, 0)),
          ConfigFileState: S.optional(S.String),
        }),
      ).annotate({ identifier: "CodeReview" });
    case 1:
      return S.suspend(() => S.Struct({ CodeReview: S.optional(__S(144, __c18, 0)) })).annotate({
        identifier: "CreateCodeReviewResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ BranchName: S.String })).annotate({
        identifier: "RepositoryHeadSourceCodeType",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceCommit: S.optional(S.String),
          DestinationCommit: S.optional(S.String),
          MergeBaseCommit: S.optional(S.String),
        }),
      ).annotate({ identifier: "CommitDiffSourceCodeType" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SourceBranchName: S.String, DestinationBranchName: S.String }),
      ).annotate({ identifier: "BranchDiffSourceCodeType" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Details: S.optional(__S(129, __c16, 1)) }),
      ).annotate({ identifier: "S3BucketRepository" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), State: S.optional(S.String) }),
      ).annotate({ identifier: "EventInfo" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          RequestId: S.optional(S.String),
          Requester: S.optional(S.String),
          EventInfo: S.optional(__S(164, __c20, 4)),
          VendorName: S.optional(S.String),
        }),
      ).annotate({ identifier: "RequestMetadata" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          CommitDiff: S.optional(__S(161, __c20, 1)),
          RepositoryHead: S.optional(__S(160, __c20, 0)),
          BranchDiff: S.optional(__S(162, __c20, 2)),
          S3BucketRepository: S.optional(__S(163, __c20, 3)),
          RequestMetadata: S.optional(__S(165, __c20, 5)),
        }),
      ).annotate({ identifier: "SourceCodeType" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          MeteredLinesOfCodeCount: S.optional(S.Number),
          SuppressedLinesOfCodeCount: S.optional(S.Number),
          FindingsCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Metrics" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CodeReviewArn: S.String.pipe(T.HttpLabel("CodeReviewArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/codereviews/{CodeReviewArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCodeReviewRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
