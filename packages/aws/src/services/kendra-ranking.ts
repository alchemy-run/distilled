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
  sdkId: "Kendra Ranking",
  serviceShapeName: "AWSKendraRerankingFrontendService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "kendra-ranking" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-10-19");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
              return err("FIPS is enabled but this partition does not support FIPS");
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          return e(`https://kendra-ranking.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://kendra-ranking.{R}.api.aws","properties":{},"headers":{}}',
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceUnavailableException>()(
    "ResourceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
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
  input: __S(64, __c8, 0) as any as S.Schema<CreateRescoreExecutionPlanRequest>,
  output: __S(65, __c8, 1) as any as S.Schema<CreateRescoreExecutionPlanResponse>,
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
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<DeleteRescoreExecutionPlanRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<DeleteRescoreExecutionPlanResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DescribeRescoreExecutionPlanRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<DescribeRescoreExecutionPlanResponse>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<ListRescoreExecutionPlansRequest>,
  output: __S(11, __c1, 3) as any as S.Schema<ListRescoreExecutionPlansResponse>,
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
  input: __S(16, __c2, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(17, __c2, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(26, __c3, 2) as any as S.Schema<RescoreRequest>,
  output: __S(29, __c3, 5) as any as S.Schema<RescoreResult>,
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
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<UpdateRescoreExecutionPlanRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<UpdateRescoreExecutionPlanResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/rescore-execution-plans/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeRescoreExecutionPlanRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CapacityUnits: S.optional(__S(72, __c9, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRescoreExecutionPlanResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/rescore-execution-plans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRescoreExecutionPlansRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "RescoreExecutionPlanSummary" });
    case 2:
      return S.Array(__S(9, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ SummaryItems: S.optional(__S(10, __c1, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRescoreExecutionPlansResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(81, __c10, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          GroupId: S.optional(S.String),
          Title: S.optional(S.String),
          Body: S.optional(S.String),
          TokenizedTitle: S.optional(__S(32, __c4, 0)),
          TokenizedBody: S.optional(__S(32, __c4, 0)),
          OriginalScore: S.Number,
        }),
      ).annotate({ identifier: "Document" });
    case 1:
      return S.Array(__S(24, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RescoreExecutionPlanId: S.String.pipe(T.HttpLabel("RescoreExecutionPlanId")),
          SearchQuery: S.String,
          Documents: __S(25, __c3, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/rescore-execution-plans/{RescoreExecutionPlanId}/rescore",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RescoreRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ DocumentId: S.optional(S.String), Score: S.optional(S.Number) }),
      ).annotate({ identifier: "RescoreResultItem" });
    case 4:
      return S.Array(__S(27, __c3, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ RescoreId: S.optional(S.String), ResultItems: S.optional(__S(28, __c3, 4)) }),
      ).annotate({ identifier: "RescoreResult" });
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
        S.Struct({ ResourceARN: S.String, Tags: __S(81, __c10, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(32, __c4, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CapacityUnits: S.optional(__S(72, __c9, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/rescore-execution-plans/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRescoreExecutionPlanRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          CapacityUnits: S.optional(__S(72, __c9, 0)),
          Tags: S.optional(__S(81, __c10, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/rescore-execution-plans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRescoreExecutionPlanRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Id: S.String, Arn: S.String })).annotate({
        identifier: "CreateRescoreExecutionPlanResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RescoreCapacityUnits: S.Number })).annotate({
        identifier: "CapacityUnitsConfiguration",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(80, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/rescore-execution-plans/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRescoreExecutionPlanRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteRescoreExecutionPlanResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
