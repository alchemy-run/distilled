import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Marketplace Deployment",
  serviceShapeName: "AWSMPDeploymentParametersService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "aws-marketplace" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-01-25");
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
              `https://deployment-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://deployment-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://deployment-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://deployment-marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://deployment-marketplace.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "MarketplaceDeployment",
  service: "MarketplaceDeployment",
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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), resourceId: S.String },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), fieldName: S.String },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Catalog = string;
export type ResourceId = string;
export type DeliveryOptionType = "data-as-a-service" | (string & {});
export interface GetDeploymentConfigurationRequest {
  catalog: string;
  productId: string;
  deliveryOptionType: DeliveryOptionType;
}
export type DeploymentConfigurationFulfillmentUrl = string;
export interface DataAsAServiceConfigurationDetail {
  fulfillmentUrl: string;
}
export type DeploymentConfigurationDetail = { dataAsAService: DataAsAServiceConfigurationDetail };
export interface GetDeploymentConfigurationResponse {
  configuration: DeploymentConfigurationDetail;
}
export type DeploymentConfigurationJobId = string;
export interface GetDeploymentConfigurationJobRequest {
  catalog: string;
  productId: string;
  deliveryOptionType: DeliveryOptionType;
  jobId: string;
}
export type DeploymentConfigurationJobStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type ResourceArn = string;
export type DeploymentConfigurationJobErrorCode =
  | "FULFILLMENT_URL_UNREACHABLE"
  | "INTERNAL_ERROR"
  | "ENDPOINT_INVALID"
  | (string & {});
export interface GetDeploymentConfigurationJobResponse {
  jobId: string;
  configuration: DeploymentConfigurationDetail;
  status: DeploymentConfigurationJobStatus;
  createdAt: Date;
  configurationArn?: string | undefined;
  endedAt?: Date | undefined;
  errorCode?: DeploymentConfigurationJobErrorCode | undefined;
  message?: string | undefined;
}
export type DeploymentConfigurationMaxResults = number;
export type DeploymentConfigurationNextToken = string;
export interface ListDeploymentConfigurationJobsRequest {
  catalog: string;
  productId: string;
  deliveryOptionType: DeliveryOptionType;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface DeploymentConfigurationJobSummary {
  jobId: string;
  status: DeploymentConfigurationJobStatus;
  configuration: DeploymentConfigurationDetail;
  createdAt: Date;
}
export type DeploymentConfigurationJobSummaries = DeploymentConfigurationJobSummary[];
export interface ListDeploymentConfigurationJobsResponse {
  jobs: DeploymentConfigurationJobSummary[];
  nextToken?: string | undefined;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export type Tags = { [key: string]: string | undefined };
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined } | undefined;
}
export type DeploymentParameterName = string;
export type SecretString = string | redacted.Redacted<string>;
export interface DeploymentParameterInput {
  name: string;
  secretString: string | redacted.Redacted<string>;
}
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export type ClientToken = string;
export interface PutDeploymentParameterRequest {
  catalog: string;
  productId: string;
  agreementId: string;
  deploymentParameter: DeploymentParameterInput;
  tags?: { [key: string]: string | undefined } | undefined;
  expirationDate?: Date | undefined;
  clientToken?: string | undefined;
}
export type DeploymentParameterResourceIdentifier = string;
export interface PutDeploymentParameterResponse {
  resourceArn: string;
  agreementId: string;
  deploymentParameterId: string;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface StartDeploymentConfigurationJobRequest {
  catalog: string;
  productId: string;
  deliveryOptionType: DeliveryOptionType;
  configuration: DeploymentConfigurationDetail;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export interface StartDeploymentConfigurationJobResponse {
  jobId: string;
  configuration: DeploymentConfigurationDetail;
  status: DeploymentConfigurationJobStatus;
  createdAt: Date;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface TagResourceResponse {}
export type StringList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type GetDeploymentConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the active deployment configuration for a product and delivery option. The active deployment configuration is the configuration from the most recent successful deployment configuration job. The seller that owns the product and buyers entitled to the product can call this operation.
 *
 * If the product and delivery option have no active deployment configuration, the operation returns a `ResourceNotFoundException`.
 */
export const getDeploymentConfiguration: API.OperationMethod<
  GetDeploymentConfigurationRequest & RegionInput,
  GetDeploymentConfigurationResponse,
  GetDeploymentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(28, __c7, 0) as any as S.Schema<GetDeploymentConfigurationRequest>,
  output: __S(29, __c7, 1) as any as S.Schema<GetDeploymentConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentConfiguration",
  telemetry: TELEMETRY,
  span: "GetDeploymentConfiguration",
}));

export type GetDeploymentConfigurationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details of a deployment configuration job. Only the seller that started the job can call this operation.
 *
 * If the job doesn't belong to the product and delivery option in the request path, the operation returns a `ResourceNotFoundException`.
 */
export const getDeploymentConfigurationJob: API.OperationMethod<
  GetDeploymentConfigurationJobRequest & RegionInput,
  GetDeploymentConfigurationJobResponse,
  GetDeploymentConfigurationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(36, __c9, 0) as any as S.Schema<GetDeploymentConfigurationJobRequest>,
  output: __S(37, __c9, 1) as any as S.Schema<GetDeploymentConfigurationJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentConfigurationJob",
  telemetry: TELEMETRY,
  span: "GetDeploymentConfigurationJob",
}));

export type ListDeploymentConfigurationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the deployment configuration jobs that you started for a product and delivery option, ordered from newest to oldest. Results are paginated. Use the `nextToken` parameter to retrieve additional results.
 *
 * If you haven't started any jobs for the product and delivery option, the operation returns an empty `jobs` list.
 */
export const listDeploymentConfigurationJobs: API.PaginatedOperationMethod<
  ListDeploymentConfigurationJobsRequest & RegionInput,
  ListDeploymentConfigurationJobsResponse,
  ListDeploymentConfigurationJobsError,
  Credentials | HttpClient.HttpClient,
  DeploymentConfigurationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(40, __c10, 0) as any as S.Schema<ListDeploymentConfigurationJobsRequest>,
  output: __S(43, __c10, 3) as any as S.Schema<ListDeploymentConfigurationJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentConfigurationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDeploymentConfigurationJobs",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags that have been added to a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type PutDeploymentParameterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a deployment parameter and is targeted by `catalog` and `agreementId`.
 */
export const putDeploymentParameter: API.OperationMethod<
  PutDeploymentParameterRequest & RegionInput,
  PutDeploymentParameterResponse,
  PutDeploymentParameterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(9, __c2, 1) as any as S.Schema<PutDeploymentParameterRequest>,
  output: __S(10, __c2, 2) as any as S.Schema<PutDeploymentParameterResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDeploymentParameter",
  telemetry: TELEMETRY,
  span: "PutDeploymentParameter",
}));

export type StartDeploymentConfigurationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a job that publishes a deployment configuration for a product and delivery option. The job runs asynchronously. Use `GetDeploymentConfigurationJob` to track its status. When the job reaches the `SUCCEEDED` status, its configuration becomes the active deployment configuration for the product and delivery option.
 *
 * The populated member of `configuration` must match the `deliveryOptionType` in the request path.
 */
export const startDeploymentConfigurationJob: API.OperationMethod<
  StartDeploymentConfigurationJobRequest & RegionInput,
  StartDeploymentConfigurationJobResponse,
  StartDeploymentConfigurationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<StartDeploymentConfigurationJobRequest>,
  output: __S(13, __c3, 1) as any as S.Schema<StartDeploymentConfigurationJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeploymentConfigurationJob",
  telemetry: TELEMETRY,
  span: "StartDeploymentConfigurationJob",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c4, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(20, __c5, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or list of tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(25, __c6, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(20, __c5, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(4, __c1, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
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
      return S.suspend(() => S.Struct({ name: S.String, secretString: SensitiveString })).annotate({
        identifier: "DeploymentParameterInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String.pipe(T.HttpLabel("catalog")),
          productId: S.String.pipe(T.HttpLabel("productId")),
          agreementId: S.String,
          deploymentParameter: __S(8, __c2, 0),
          tags: S.optional(__S(4, __c1, 0)),
          expirationDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/catalogs/{catalog}/products/{productId}/deployment-parameters",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDeploymentParameterRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          agreementId: S.String,
          deploymentParameterId: S.String,
          tags: S.optional(__S(4, __c1, 0)),
        }),
      ).annotate({ identifier: "PutDeploymentParameterResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String.pipe(T.HttpLabel("catalog")),
          productId: S.String.pipe(T.HttpLabel("productId")),
          deliveryOptionType: S.String.pipe(T.HttpLabel("deliveryOptionType")),
          configuration: __S(33, __c8, 1),
          tags: S.optional(__S(4, __c1, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/catalogs/{catalog}/products/{productId}/delivery-options/{deliveryOptionType}/deployment-configuration/jobs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDeploymentConfigurationJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          configuration: __S(33, __c8, 1),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "StartDeploymentConfigurationJobResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: S.optional(__S(4, __c1, 0)),
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
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(24, __c6, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String.pipe(T.HttpLabel("catalog")),
          productId: S.String.pipe(T.HttpLabel("productId")),
          deliveryOptionType: S.String.pipe(T.HttpLabel("deliveryOptionType")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/catalogs/{catalog}/products/{productId}/delivery-options/{deliveryOptionType}/deployment-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ configuration: __S(33, __c8, 1) })).annotate({
        identifier: "GetDeploymentConfigurationResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ fulfillmentUrl: S.String })).annotate({
        identifier: "DataAsAServiceConfigurationDetail",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ dataAsAService: __S(32, __c8, 0) })]);
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String.pipe(T.HttpLabel("catalog")),
          productId: S.String.pipe(T.HttpLabel("productId")),
          deliveryOptionType: S.String.pipe(T.HttpLabel("deliveryOptionType")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/catalogs/{catalog}/products/{productId}/delivery-options/{deliveryOptionType}/deployment-configuration/jobs/{jobId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentConfigurationJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          configuration: __S(33, __c8, 1),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          configurationArn: S.optional(S.String),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          errorCode: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDeploymentConfigurationJobResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String.pipe(T.HttpLabel("catalog")),
          productId: S.String.pipe(T.HttpLabel("productId")),
          deliveryOptionType: S.String.pipe(T.HttpLabel("deliveryOptionType")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/catalogs/{catalog}/products/{productId}/delivery-options/{deliveryOptionType}/deployment-configuration/jobs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeploymentConfigurationJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          status: S.String,
          configuration: __S(33, __c8, 1),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DeploymentConfigurationJobSummary" });
    case 2:
      return S.Array(__S(41, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ jobs: __S(42, __c10, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDeploymentConfigurationJobsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
