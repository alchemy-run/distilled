import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Kendra Ranking",
  target: "AWSKendraRerankingFrontendService",
  version: "2022-10-19",
  sigv4: "kendra-ranking",
  protocol: awsJson1_0Protocol,
  rules: (p, _) => {
    const { Region, UseFIPS = false, Endpoint } = p;
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
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if (UseFIPS === true) {
              if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                return e(
                  `https://kendra-ranking-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              return err(
                "FIPS is enabled but this partition does not support FIPS",
              );
            }
            return e(
              `https://kendra-ranking.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://kendra-ranking-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          return e(
            `https://kendra-ranking.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceUnavailableException",
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
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type RescoreExecutionPlanName = string;
export type Description = string;
export type RescoreCapacityUnit = number;
export interface CapacityUnitsConfiguration {
  RescoreCapacityUnits: number;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type ClientTokenName = string;
export interface CreateRescoreExecutionPlanRequest {
  Name: string;
  Description?: string;
  CapacityUnits?: CapacityUnitsConfiguration;
  Tags?: Tag[];
  ClientToken?: string;
}
export type RescoreExecutionPlanId = string;
export type RescoreExecutionPlanArn = string;
export interface CreateRescoreExecutionPlanResponse {
  Id: string;
  Arn: string;
}
export interface DeleteRescoreExecutionPlanRequest {
  Id: string;
}
export interface DeleteRescoreExecutionPlanResponse {}
export interface DescribeRescoreExecutionPlanRequest {
  Id: string;
}
export type RescoreExecutionPlanStatus =
  | "CREATING"
  | "UPDATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type ErrorMessage = string;
export interface DescribeRescoreExecutionPlanResponse {
  Id?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  CapacityUnits?: CapacityUnitsConfiguration;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Status?: RescoreExecutionPlanStatus;
  ErrorMessage?: string;
}
export type NextToken = string;
export type MaxResultsIntegerForListRescoreExecutionPlansRequest = number;
export interface ListRescoreExecutionPlansRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface RescoreExecutionPlanSummary {
  Name?: string;
  Id?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Status?: RescoreExecutionPlanStatus;
}
export type RescoreExecutionPlanSummaryList = RescoreExecutionPlanSummary[];
export interface ListRescoreExecutionPlansResponse {
  SummaryItems?: RescoreExecutionPlanSummary[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export type SearchQuery = string;
export type DocumentId = string;
export type GroupId = string;
export type DocumentTitle = string;
export type DocumentBody = string;
export type Tokens = string;
export type TitleTokensList = string[];
export type BodyTokensList = string[];
export interface Document {
  Id: string;
  GroupId?: string;
  Title?: string;
  Body?: string;
  TokenizedTitle?: string[];
  TokenizedBody?: string[];
  OriginalScore: number;
}
export type DocumentList = Document[];
export interface RescoreRequest {
  RescoreExecutionPlanId: string;
  SearchQuery: string;
  Documents: Document[];
}
export type RescoreId = string;
export interface RescoreResultItem {
  DocumentId?: string;
  Score?: number;
}
export type RescoreResultItemList = RescoreResultItem[];
export interface RescoreResult {
  RescoreId?: string;
  ResultItems?: RescoreResultItem[];
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateRescoreExecutionPlanRequest {
  Id: string;
  Name?: string;
  Description?: string;
  CapacityUnits?: CapacityUnitsConfiguration;
}
export interface UpdateRescoreExecutionPlanResponse {}
export type CreateRescoreExecutionPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a rescore execution plan. A rescore execution
 * plan is an Amazon Kendra Intelligent Ranking resource
 * used for provisioning the `Rescore` API. You set
 * the number of capacity units that you require for
 * Amazon Kendra Intelligent Ranking to rescore or re-rank
 * a search service's results.
 *
 * For an example of using the
 * `CreateRescoreExecutionPlan` API, including using
 * the Python and Java SDKs, see Semantically
 * ranking a search service's results.
 */
export const createRescoreExecutionPlan: API.OperationMethod<
  CreateRescoreExecutionPlanRequest,
  CreateRescoreExecutionPlanResponse,
  CreateRescoreExecutionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      CapacityUnits: i_CapacityUnitsConfiguration,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "CreateRescoreExecutionPlan",
})) as any;

export type DeleteRescoreExecutionPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a rescore execution plan. A rescore execution
 * plan is an Amazon Kendra Intelligent Ranking resource
 * used for provisioning the `Rescore` API.
 */
export const deleteRescoreExecutionPlan: API.OperationMethod<
  DeleteRescoreExecutionPlanRequest,
  DeleteRescoreExecutionPlanResponse,
  DeleteRescoreExecutionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Id: 0 } },
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
  operationName: "DeleteRescoreExecutionPlan",
})) as any;

export type DescribeRescoreExecutionPlanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a rescore execution plan. A rescore
 * execution plan is an Amazon Kendra Intelligent Ranking
 * resource used for provisioning the `Rescore` API.
 */
export const describeRescoreExecutionPlan: API.OperationMethod<
  DescribeRescoreExecutionPlanRequest,
  DescribeRescoreExecutionPlanResponse,
  DescribeRescoreExecutionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Id: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "DescribeRescoreExecutionPlan",
})) as any;

export type ListRescoreExecutionPlansError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists your rescore execution plans. A rescore execution plan
 * is an Amazon Kendra Intelligent Ranking resource used for
 * provisioning the `Rescore` API.
 */
export const listRescoreExecutionPlans: API.PaginatedOperationMethod<
  ListRescoreExecutionPlansRequest,
  ListRescoreExecutionPlansResponse,
  ListRescoreExecutionPlansError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { SummaryItems: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRescoreExecutionPlans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of tags associated with a specified resource.
 * A rescore execution plan is an example of a resource that
 * can have tags associated with it.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RescoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rescores or re-ranks search results from a search service
 * such as OpenSearch (self managed). You use the semantic search
 * capabilities of Amazon Kendra Intelligent Ranking to
 * improve the search service's results.
 */
export const rescore: API.OperationMethod<
  RescoreRequest,
  RescoreResult,
  RescoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RescoreExecutionPlanId: 0,
      SearchQuery: 0,
      Documents: D.list({
        Id: 0,
        GroupId: 0,
        Title: 0,
        Body: 0,
        TokenizedTitle: 0,
        TokenizedBody: 0,
        OriginalScore: 0,
      }),
    },
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
  operationName: "Rescore",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a specified tag to a specified rescore execution
 * plan. A rescore execution plan is an Amazon Kendra
 * Intelligent Ranking resource used for provisioning the
 * `Rescore` API. If the tag already exists,
 * the existing value is replaced with the new value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceUnavailableException,
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
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from a rescore execution plan. A rescore
 * execution plan is an Amazon Kendra Intelligent
 * Ranking resource used for provisioning the
 * `Rescore` operation.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateRescoreExecutionPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a rescore execution plan. A rescore execution plan
 * is an Amazon Kendra Intelligent Ranking resource used for
 * provisioning the `Rescore` API. You can update the
 * number of capacity units you require for Amazon Kendra
 * Intelligent Ranking to rescore or re-rank a search service's
 * results.
 */
export const updateRescoreExecutionPlan: API.OperationMethod<
  UpdateRescoreExecutionPlanRequest,
  UpdateRescoreExecutionPlanResponse,
  UpdateRescoreExecutionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Id: 0,
      Name: 0,
      Description: 0,
      CapacityUnits: i_CapacityUnitsConfiguration,
    },
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
  operationName: "UpdateRescoreExecutionPlan",
})) as any;

const i_CapacityUnitsConfiguration: D.LazyStruct = () => ({
  RescoreCapacityUnits: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
