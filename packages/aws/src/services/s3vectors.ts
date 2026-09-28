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
  sdkId: "S3Vectors",
  target: "S3Vectors",
  version: "2025-07-15",
  sigv4: "s3vectors",
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
              `https://s3vectors-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://s3vectors.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
export class KmsDisabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "KmsDisabledException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class KmsInvalidKeyUsageException
  extends /*@__PURE__*/ TE.TaggedError(
    "KmsInvalidKeyUsageException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class KmsInvalidStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "KmsInvalidStateException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class KmsNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "KmsNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError", "RetryableError"],
    { status: 503 },
  )<{ readonly message: string }> {}
export type VectorBucketName = string;
export type VectorBucketArn = string;
export type IndexName = string;
export type DataType = "float32" | (string & {});
export type Dimension = number;
export type DistanceMetric = "euclidean" | "cosine" | (string & {});
export type MetadataKey = string;
export type NonFilterableMetadataKeys = string[];
export interface MetadataConfiguration {
  nonFilterableMetadataKeys: string[];
}
export type SseType = "AES256" | "aws:kms" | (string & {});
export type KmsKeyArn = string;
export interface EncryptionConfiguration {
  sseType?: SseType;
  kmsKeyArn?: string;
}
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export interface CreateIndexInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
  indexName: string;
  dataType: DataType;
  dimension: number;
  distanceMetric: DistanceMetric;
  metadataConfiguration?: MetadataConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type IndexArn = string;
export interface CreateIndexOutput {
  indexArn: string;
}
export interface CreateVectorBucketInput {
  vectorBucketName: string;
  encryptionConfiguration?: EncryptionConfiguration;
  tags?: { [key: string]: string | undefined };
}
export interface CreateVectorBucketOutput {
  vectorBucketArn: string;
}
export interface DeleteIndexInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
}
export interface DeleteIndexOutput {}
export interface DeleteVectorBucketInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
}
export interface DeleteVectorBucketOutput {}
export interface DeleteVectorBucketPolicyInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
}
export interface DeleteVectorBucketPolicyOutput {}
export type VectorKey = string;
export type DeleteVectorsInputList = string[];
export interface DeleteVectorsInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
  keys: string[];
}
export interface DeleteVectorsOutput {}
export interface GetIndexInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
}
export interface Index {
  vectorBucketName: string;
  indexName: string;
  indexArn: string;
  creationTime: Date;
  dataType: DataType;
  dimension: number;
  distanceMetric: DistanceMetric;
  metadataConfiguration?: MetadataConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
}
export interface GetIndexOutput {
  index: Index;
}
export interface GetVectorBucketInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
}
export interface VectorBucket {
  vectorBucketName: string;
  vectorBucketArn: string;
  creationTime: Date;
  encryptionConfiguration?: EncryptionConfiguration;
}
export interface GetVectorBucketOutput {
  vectorBucket: VectorBucket;
}
export interface GetVectorBucketPolicyInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
}
export type VectorBucketPolicy = string;
export interface GetVectorBucketPolicyOutput {
  policy?: string;
}
export type GetVectorsInputList = string[];
export interface GetVectorsInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
  keys: string[];
  returnData?: boolean;
  returnMetadata?: boolean;
}
export type Float32VectorData = number[];
export type VectorData = { float32: number[] };
export type VectorMetadata = unknown;
export interface GetOutputVector {
  key: string;
  data?: VectorData;
  metadata?: any;
}
export type GetVectorsOutputList = GetOutputVector[];
export interface GetVectorsOutput {
  vectors: GetOutputVector[];
}
export type ListIndexesMaxResults = number;
export type ListIndexesNextToken = string;
export type ListIndexesPrefix = string;
export interface ListIndexesInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
  maxResults?: number;
  nextToken?: string;
  prefix?: string;
}
export interface IndexSummary {
  vectorBucketName: string;
  indexName: string;
  indexArn: string;
  creationTime: Date;
}
export type ListIndexesOutputList = IndexSummary[];
export interface ListIndexesOutput {
  nextToken?: string;
  indexes: IndexSummary[];
}
export type ResourceARN = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags: { [key: string]: string | undefined };
}
export type ListVectorBucketsMaxResults = number;
export type ListVectorBucketsNextToken = string;
export type ListVectorBucketsPrefix = string;
export interface ListVectorBucketsInput {
  maxResults?: number;
  nextToken?: string;
  prefix?: string;
}
export interface VectorBucketSummary {
  vectorBucketName: string;
  vectorBucketArn: string;
  creationTime: Date;
}
export type ListVectorBucketsOutputList = VectorBucketSummary[];
export interface ListVectorBucketsOutput {
  nextToken?: string;
  vectorBuckets: VectorBucketSummary[];
}
export type ListVectorsMaxResults = number;
export type ListVectorsNextToken = string;
export type ListVectorsSegmentCount = number;
export type ListVectorsSegmentIndex = number;
export interface ListVectorsInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
  maxResults?: number;
  nextToken?: string;
  segmentCount?: number;
  segmentIndex?: number;
  returnData?: boolean;
  returnMetadata?: boolean;
}
export interface ListOutputVector {
  key: string;
  data?: VectorData;
  metadata?: any;
}
export type ListVectorsOutputList = ListOutputVector[];
export interface ListVectorsOutput {
  nextToken?: string;
  vectors: ListOutputVector[];
}
export interface PutVectorBucketPolicyInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
  policy: string;
}
export interface PutVectorBucketPolicyOutput {}
export interface PutInputVector {
  key: string;
  data: VectorData;
  metadata?: any;
}
export type PutVectorsInputList = PutInputVector[];
export interface PutVectorsInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
  vectors: PutInputVector[];
}
export interface PutVectorsOutput {}
export type TopK = number;
export type QueryVectorsNextToken = string;
export interface QueryVectorsInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
  topK: number;
  queryVector: VectorData;
  filter?: any;
  returnMetadata?: boolean;
  returnDistance?: boolean;
  nextToken?: string;
}
export interface QueryOutputVector {
  distance?: number;
  key: string;
  metadata?: any;
}
export type QueryVectorsOutputList = QueryOutputVector[];
export interface QueryVectorsOutput {
  vectors: QueryOutputVector[];
  distanceMetric: DistanceMetric;
  nextToken?: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export type ExceptionMessage = string;
export type CreateIndexError =
  | ConflictException
  | NotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a vector index within a vector bucket. To specify the vector bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:CreateIndex` permission to use this operation.
 *
 * You must have the `s3vectors:TagResource` permission in addition to `s3vectors:CreateIndex` permission to create a vector index with tags.
 */
export const createIndex: API.OperationMethod<
  CreateIndexInput,
  CreateIndexOutput,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateIndex",
    input: {
      vectorBucketName: 0,
      vectorBucketArn: 0,
      indexName: 0,
      dataType: 0,
      dimension: 0,
      distanceMetric: 0,
      metadataConfiguration: { nonFilterableMetadataKeys: 0 },
      encryptionConfiguration: i_EncryptionConfiguration,
      tags: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    NotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIndex",
})) as any;

export type CreateVectorBucketError =
  | ConflictException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a vector bucket in the Amazon Web Services Region that you want your bucket to be in.
 *
 * ### Permissions
 *
 * You must have the `s3vectors:CreateVectorBucket` permission to use this operation.
 *
 * You must have the `s3vectors:TagResource` permission in addition to `s3vectors:CreateVectorBucket` permission to create a vector bucket with tags.
 */
export const createVectorBucket: API.OperationMethod<
  CreateVectorBucketInput,
  CreateVectorBucketOutput,
  CreateVectorBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateVectorBucket",
    input: {
      vectorBucketName: 0,
      encryptionConfiguration: i_EncryptionConfiguration,
      tags: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVectorBucket",
})) as any;

export type DeleteIndexError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a vector index. To specify the vector index, you can either use both the vector bucket name and vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:DeleteIndex` permission to use this operation.
 */
export const deleteIndex: API.OperationMethod<
  DeleteIndexInput,
  DeleteIndexOutput,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteIndex",
    input: { vectorBucketName: 0, indexName: 0, indexArn: 0 },
    body: true,
  },
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIndex",
})) as any;

export type DeleteVectorBucketError =
  | ConflictException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a vector bucket. All vector indexes in the vector bucket must be deleted before the vector bucket can be deleted. To perform this operation, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:DeleteVectorBucket` permission to use this operation.
 */
export const deleteVectorBucket: API.OperationMethod<
  DeleteVectorBucketInput,
  DeleteVectorBucketOutput,
  DeleteVectorBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteVectorBucket",
    input: { vectorBucketName: 0, vectorBucketArn: 0 },
    body: true,
  },
  errors: [ConflictException, NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVectorBucket",
})) as any;

export type DeleteVectorBucketPolicyError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a vector bucket policy. To specify the bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:DeleteVectorBucketPolicy` permission to use this operation.
 */
export const deleteVectorBucketPolicy: API.OperationMethod<
  DeleteVectorBucketPolicyInput,
  DeleteVectorBucketPolicyOutput,
  DeleteVectorBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteVectorBucketPolicy",
    input: { vectorBucketName: 0, vectorBucketArn: 0 },
    body: true,
  },
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVectorBucketPolicy",
})) as any;

export type DeleteVectorsError =
  | AccessDeniedException
  | KmsDisabledException
  | KmsInvalidKeyUsageException
  | KmsInvalidStateException
  | KmsNotFoundException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes one or more vectors in a vector index. To specify the vector index, you can either use both the vector bucket name and vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:DeleteVectors` permission to use this operation.
 */
export const deleteVectors: API.OperationMethod<
  DeleteVectorsInput,
  DeleteVectorsOutput,
  DeleteVectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteVectors",
    input: { vectorBucketName: 0, indexName: 0, indexArn: 0, keys: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    KmsDisabledException,
    KmsInvalidKeyUsageException,
    KmsInvalidStateException,
    KmsNotFoundException,
    NotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVectors",
})) as any;

export type GetIndexError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns vector index attributes. To specify the vector index, you can either use both the vector bucket name and the vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:GetIndex` permission to use this operation.
 */
export const getIndex: API.OperationMethod<
  GetIndexInput,
  GetIndexOutput,
  GetIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetIndex",
    input: { vectorBucketName: 0, indexName: 0, indexArn: 0 },
    output: { index: { creationTime: D.ts } },
    body: true,
  },
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndex",
})) as any;

export type GetVectorBucketError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns vector bucket attributes. To specify the bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:GetVectorBucket` permission to use this operation.
 */
export const getVectorBucket: API.OperationMethod<
  GetVectorBucketInput,
  GetVectorBucketOutput,
  GetVectorBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetVectorBucket",
    input: { vectorBucketName: 0, vectorBucketArn: 0 },
    output: { vectorBucket: { creationTime: D.ts } },
    body: true,
  },
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVectorBucket",
})) as any;

export type GetVectorBucketPolicyError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets details about a vector bucket policy. To specify the bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:GetVectorBucketPolicy` permission to use this operation.
 */
export const getVectorBucketPolicy: API.OperationMethod<
  GetVectorBucketPolicyInput,
  GetVectorBucketPolicyOutput,
  GetVectorBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetVectorBucketPolicy",
    input: { vectorBucketName: 0, vectorBucketArn: 0 },
    body: true,
  },
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVectorBucketPolicy",
})) as any;

export type GetVectorsError =
  | KmsDisabledException
  | KmsInvalidKeyUsageException
  | KmsInvalidStateException
  | KmsNotFoundException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns vector attributes. To specify the vector index, you can either use both the vector bucket name and the vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:GetVectors` permission to use this operation.
 */
export const getVectors: API.OperationMethod<
  GetVectorsInput,
  GetVectorsOutput,
  GetVectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetVectors",
    input: {
      vectorBucketName: 0,
      indexName: 0,
      indexArn: 0,
      keys: 0,
      returnData: 0,
      returnMetadata: 0,
    },
    body: true,
  },
  errors: [
    KmsDisabledException,
    KmsInvalidKeyUsageException,
    KmsInvalidStateException,
    KmsNotFoundException,
    NotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVectors",
})) as any;

export type ListIndexesError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of all the vector indexes within the specified vector bucket. To specify the bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:ListIndexes` permission to use this operation.
 */
export const listIndexes: API.PaginatedOperationMethod<
  ListIndexesInput,
  ListIndexesOutput,
  ListIndexesError,
  Credentials | HttpClient.HttpClient,
  IndexSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListIndexes",
    input: {
      vectorBucketName: 0,
      vectorBucketArn: 0,
      maxResults: 0,
      nextToken: 0,
      prefix: 0,
    },
    output: { indexes: D.list({ creationTime: D.ts }) },
    body: true,
  },
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndexes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "indexes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists all of the tags applied to a specified Amazon S3 Vectors resource. Each tag is a label consisting of a key and value pair. Tags can help you organize, track costs for, and control access to resources.
 *
 * For a list of S3 resources that support tagging, see Managing tags for Amazon S3 resources.
 *
 * ### Permissions
 *
 * For vector buckets and vector indexes, you must have the `s3vectors:ListTagsForResource` permission to use this operation.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListVectorBucketsError = ServiceUnavailableException | CommonErrors;
/**
 * Returns a list of all the vector buckets that are owned by the authenticated sender of the request.
 *
 * ### Permissions
 *
 * You must have the `s3vectors:ListVectorBuckets` permission to use this operation.
 */
export const listVectorBuckets: API.PaginatedOperationMethod<
  ListVectorBucketsInput,
  ListVectorBucketsOutput,
  ListVectorBucketsError,
  Credentials | HttpClient.HttpClient,
  VectorBucketSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListVectorBuckets",
    input: { maxResults: 0, nextToken: 0, prefix: 0 },
    output: { vectorBuckets: D.list({ creationTime: D.ts }) },
    body: true,
  },
  errors: [ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVectorBuckets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vectorBuckets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListVectorsError =
  | AccessDeniedException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * List vectors in the specified vector index. To specify the vector index, you can either use both the vector bucket name and the vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * `ListVectors` operations proceed sequentially; however, for faster performance on a large number of vectors in a vector index, applications can request a parallel `ListVectors` operation by providing the `segmentCount` and `segmentIndex` parameters.
 *
 * ### Permissions
 *
 * You must have the `s3vectors:ListVectors` permission to use this operation. Additional permissions are required based on the request parameters you specify:
 *
 * - With only `s3vectors:ListVectors` permission, you can list vector keys when `returnData` and `returnMetadata` are both set to false or not specified..
 *
 * - If you set `returnData` or `returnMetadata` to true, you must have both `s3vectors:ListVectors` and `s3vectors:GetVectors` permissions. The request fails with a `403 Forbidden` error if you request vector data or metadata without the `s3vectors:GetVectors` permission.
 */
export const listVectors: API.PaginatedOperationMethod<
  ListVectorsInput,
  ListVectorsOutput,
  ListVectorsError,
  Credentials | HttpClient.HttpClient,
  ListOutputVector
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListVectors",
    input: {
      vectorBucketName: 0,
      indexName: 0,
      indexArn: 0,
      maxResults: 0,
      nextToken: 0,
      segmentCount: 0,
      segmentIndex: 0,
      returnData: 0,
      returnMetadata: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    NotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vectors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutVectorBucketPolicyError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a bucket policy for a vector bucket. To specify the bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:PutVectorBucketPolicy` permission to use this operation.
 */
export const putVectorBucketPolicy: API.OperationMethod<
  PutVectorBucketPolicyInput,
  PutVectorBucketPolicyOutput,
  PutVectorBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutVectorBucketPolicy",
    input: { vectorBucketName: 0, vectorBucketArn: 0, policy: 0 },
    body: true,
  },
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVectorBucketPolicy",
})) as any;

export type PutVectorsError =
  | AccessDeniedException
  | KmsDisabledException
  | KmsInvalidKeyUsageException
  | KmsInvalidStateException
  | KmsNotFoundException
  | NotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Adds one or more vectors to a vector index. To specify the vector index, you can either use both the vector bucket name and the vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * For more information about limits, see Limitations and restrictions in the *Amazon S3 User Guide*.
 *
 * When inserting vector data into your vector index, you must provide the vector data as `float32` (32-bit floating point) values. If you pass higher-precision values to an Amazon Web Services SDK, S3 Vectors converts the values to 32-bit floating point before storing them, and `GetVectors`, `ListVectors`, and `QueryVectors` operations return the float32 values. Different Amazon Web Services SDKs may have different default numeric types, so ensure your vectors are properly formatted as `float32` values regardless of which SDK you're using. For example, in Python, use `numpy.float32` or explicitly cast your values.
 *
 * ### Permissions
 *
 * You must have the `s3vectors:PutVectors` permission to use this operation.
 */
export const putVectors: API.OperationMethod<
  PutVectorsInput,
  PutVectorsOutput,
  PutVectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutVectors",
    input: {
      vectorBucketName: 0,
      indexName: 0,
      indexArn: 0,
      vectors: D.list({ key: 0, data: i_VectorData, metadata: 0 }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    KmsDisabledException,
    KmsInvalidKeyUsageException,
    KmsInvalidStateException,
    KmsNotFoundException,
    NotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVectors",
})) as any;

export type QueryVectorsError =
  | KmsDisabledException
  | KmsInvalidKeyUsageException
  | KmsInvalidStateException
  | KmsNotFoundException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Performs an approximate nearest neighbor search query in a vector index using a query vector. By default, it returns the keys of approximate nearest neighbors. You can optionally include the computed distance (between the query vector and each vector in the response) and metadata of each vector in the response.
 *
 * To specify the vector index, you can either use both the vector bucket name and the vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:QueryVectors` permission to use this operation. Additional permissions are required based on the request parameters you specify:
 *
 * - With only `s3vectors:QueryVectors` permission, you can retrieve vector keys of approximate nearest neighbors and computed distances between these vectors. This permission is sufficient only when you don't set any metadata filters and don't request metadata (by keeping the `returnMetadata` parameter set to `false` or not specified).
 *
 * - If you specify a metadata filter or set `returnMetadata` to true, you must have both `s3vectors:QueryVectors` and `s3vectors:GetVectors` permissions. The request fails with a `403 Forbidden error` if you request metadata filtering or metadata without the `s3vectors:GetVectors` permission.
 */
export const queryVectors: API.PaginatedOperationMethod<
  QueryVectorsInput,
  QueryVectorsOutput,
  QueryVectorsError,
  Credentials | HttpClient.HttpClient,
  QueryOutputVector
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /QueryVectors",
    input: {
      vectorBucketName: 0,
      indexName: 0,
      indexArn: 0,
      topK: 0,
      queryVector: i_VectorData,
      filter: 0,
      returnMetadata: 0,
      returnDistance: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    KmsDisabledException,
    KmsInvalidKeyUsageException,
    KmsInvalidStateException,
    KmsNotFoundException,
    NotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QueryVectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vectors",
  } as const,
})) as any;

export type TagResourceError =
  | ConflictException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Applies one or more user-defined tags to an Amazon S3 Vectors resource or updates existing tags. Each tag is a label consisting of a key and value pair. Tags can help you organize, track costs for, and control access to your resources. You can add up to 50 tags for each resource.
 *
 * For a list of S3 resources that support tagging, see Managing tags for Amazon S3 resources.
 *
 * ### Permissions
 *
 * For vector buckets and vector indexes, you must have the `s3vectors:TagResource` permission to use this operation.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [ConflictException, NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ConflictException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Removes the specified user-defined tags from an Amazon S3 Vectors resource. You can pass one or more tag keys.
 *
 * For a list of S3 resources that support tagging, see Managing tags for Amazon S3 resources.
 *
 * ### Permissions
 *
 * For vector buckets and vector indexes, you must have the `s3vectors:UntagResource` permission to use this operation.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [ConflictException, NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_EncryptionConfiguration: D.LazyStruct = () => ({
  sseType: 0,
  kmsKeyArn: 0,
});
const i_VectorData: D.LazyStruct = () => ({ float32: 0 });
