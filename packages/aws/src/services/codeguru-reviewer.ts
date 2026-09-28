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
  sdkId: "CodeGuru Reviewer",
  target: "AWSGuruFrontendService",
  version: "2019-09-19",
  sigv4: "codeguru-reviewer",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://codeguru-reviewer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://codeguru-reviewer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type EncryptionOption =
  | "AWS_OWNED_CMK"
  | "CUSTOMER_MANAGED_CMK"
  | (string & {});
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
export type JobState =
  | "Completed"
  | "Pending"
  | "Failed"
  | "Deleting"
  | (string & {});
export type Type = "PullRequest" | "RepositoryAnalysis" | (string & {});
export type PullRequestId = string;
export type LinesOfCodeCount = number;
export type FindingsCount = number;
export interface Metrics {
  MeteredLinesOfCodeCount?: number;
  SuppressedLinesOfCodeCount?: number;
  FindingsCount?: number;
}
export type ConfigFileState =
  | "Present"
  | "Absent"
  | "PresentWithErrors"
  | (string & {});
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
export type Severity =
  | "Info"
  | "Low"
  | "Medium"
  | "High"
  | "Critical"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /associations",
    input: {
      Repository: {
        CodeCommit: { Name: 0 },
        Bitbucket: i_ThirdPartySourceRepository,
        GitHubEnterpriseServer: i_ThirdPartySourceRepository,
        S3Bucket: { Name: 0, BucketName: 0 },
      },
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: 0,
      KMSKeyDetails: { KMSKeyId: 0, EncryptionOption: 0 },
    },
    output: { RepositoryAssociation: o_RepositoryAssociation },
    body: true,
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
  operationName: "AssociateRepository",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /codereviews",
    input: {
      Name: 0,
      RepositoryAssociationArn: 0,
      Type: {
        RepositoryAnalysis: {
          RepositoryHead: i_RepositoryHeadSourceCodeType,
          SourceCodeType: {
            CommitDiff: {
              SourceCommit: 0,
              DestinationCommit: 0,
              MergeBaseCommit: 0,
            },
            RepositoryHead: i_RepositoryHeadSourceCodeType,
            BranchDiff: { SourceBranchName: 0, DestinationBranchName: 0 },
            S3BucketRepository: {
              Name: 0,
              Details: {
                BucketName: 0,
                CodeArtifacts: {
                  SourceCodeArtifactsObjectKey: 0,
                  BuildArtifactsObjectKey: 0,
                },
              },
            },
            RequestMetadata: {
              RequestId: 0,
              Requester: 0,
              EventInfo: { Name: 0, State: 0 },
              VendorName: 0,
            },
          },
        },
        AnalysisTypes: 0,
      },
      ClientRequestToken: D.m({ idempotency: true }),
    },
    output: { CodeReview: o_CodeReview },
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
  operationName: "CreateCodeReview",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /codereviews/{CodeReviewArn}",
    input: { CodeReviewArn: 0 },
    output: { CodeReview: o_CodeReview },
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
  operationName: "DescribeCodeReview",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /feedback/{CodeReviewArn}",
    input: {
      CodeReviewArn: 0,
      RecommendationId: D.m({ query: "RecommendationId" }),
      UserId: D.m({ query: "UserId" }),
    },
    output: {
      RecommendationFeedback: {
        CreatedTimeStamp: D.ts,
        LastUpdatedTimeStamp: D.ts,
      },
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
  operationName: "DescribeRecommendationFeedback",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /associations/{AssociationArn}",
    input: { AssociationArn: 0 },
    output: { RepositoryAssociation: o_RepositoryAssociation },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /associations/{AssociationArn}",
    input: { AssociationArn: 0 },
    output: { RepositoryAssociation: o_RepositoryAssociation },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /codereviews",
    input: {
      ProviderTypes: D.m({ query: "ProviderTypes" }),
      States: D.m({ query: "States" }),
      RepositoryNames: D.m({ query: "RepositoryNames" }),
      Type: D.m({ query: "Type" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: {
      CodeReviewSummaries: D.list({
        CreatedTimeStamp: D.ts,
        LastUpdatedTimeStamp: D.ts,
      }),
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
  descriptor: {
    service: svc,
    http: "GET /feedback/{CodeReviewArn}/RecommendationFeedback",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      CodeReviewArn: 0,
      UserIds: D.m({ query: "UserIds" }),
      RecommendationIds: D.m({ query: "RecommendationIds" }),
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
  descriptor: {
    service: svc,
    http: "GET /codereviews/{CodeReviewArn}/Recommendations",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      CodeReviewArn: 0,
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
  descriptor: {
    service: svc,
    http: "GET /associations",
    input: {
      ProviderTypes: D.m({ query: "ProviderType" }),
      States: D.m({ query: "State" }),
      Names: D.m({ query: "Name" }),
      Owners: D.m({ query: "Owner" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: {
      RepositoryAssociationSummaries: D.list({ LastUpdatedTimeStamp: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /feedback",
    input: { CodeReviewArn: 0, RecommendationId: 0, Reactions: 0 },
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
  operationName: "PutRecommendationFeedback",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_RepositoryHeadSourceCodeType: D.LazyStruct = () => ({ BranchName: 0 });
const i_ThirdPartySourceRepository: D.LazyStruct = () => ({
  Name: 0,
  ConnectionArn: 0,
  Owner: 0,
});
const o_CodeReview: D.LazyStruct = () => ({
  CreatedTimeStamp: D.ts,
  LastUpdatedTimeStamp: D.ts,
});
const o_RepositoryAssociation: D.LazyStruct = () => ({
  LastUpdatedTimeStamp: D.ts,
  CreatedTimeStamp: D.ts,
});
