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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "S3Vectors", serviceShapeName: "S3Vectors" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "s3vectors" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-07-15");
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
  '{"url":"https://s3vectors.{R}.api.aws","properties":{},"headers":{}}',
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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class KmsDisabledException
  extends /*@__PURE__*/ S.TaggedError<KmsDisabledException>()(
    "KmsDisabledException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class KmsInvalidKeyUsageException
  extends /*@__PURE__*/ S.TaggedError<KmsInvalidKeyUsageException>()(
    "KmsInvalidKeyUsageException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class KmsInvalidStateException
  extends /*@__PURE__*/ S.TaggedError<KmsInvalidStateException>()(
    "KmsInvalidStateException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class KmsNotFoundException
  extends /*@__PURE__*/ S.TaggedError<KmsNotFoundException>()(
    "KmsNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(503), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
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
export type IndexMode = "CLASSIC" | "ENHANCED" | (string & {});
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
  indexMode?: IndexMode;
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
  defaultIndexMode?: IndexMode;
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
export interface PutVectorBucketDefaultIndexModeInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
  defaultIndexMode: IndexMode;
}
export interface PutVectorBucketDefaultIndexModeOutput {}
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
  queryMode?: IndexMode;
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
export interface UpdateIndexModeInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
  indexMode: IndexMode;
}
export interface UpdateIndexModeOutput {}
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
  input: __S(92, __c23, 0) as any as S.Schema<CreateIndexInput>,
  output: __S(93, __c23, 1) as any as S.Schema<CreateIndexOutput>,
  errors: [
    ConflictException,
    NotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIndex",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateVectorBucketInput>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateVectorBucketOutput>,
  errors: [ConflictException, ServiceQuotaExceededException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVectorBucket",
}));

export type DeleteIndexError = NotFoundException | ServiceUnavailableException | CommonErrors;
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
  input: __S(4, __c1, 0) as any as S.Schema<DeleteIndexInput>,
  output: __S(8, __c2, 0) as any as S.Schema<DeleteIndexOutput>,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIndex",
}));

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
  input: __S(12, __c3, 0) as any as S.Schema<DeleteVectorBucketInput>,
  output: __S(8, __c2, 0) as any as S.Schema<DeleteVectorBucketOutput>,
  errors: [ConflictException, NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVectorBucket",
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<DeleteVectorBucketPolicyInput>,
  output: __S(8, __c2, 0) as any as S.Schema<DeleteVectorBucketPolicyOutput>,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVectorBucketPolicy",
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<DeleteVectorsInput>,
  output: __S(8, __c2, 0) as any as S.Schema<DeleteVectorsOutput>,
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
}));

export type GetIndexError = NotFoundException | ServiceUnavailableException | CommonErrors;
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
  input: __S(24, __c6, 0) as any as S.Schema<GetIndexInput>,
  output: __S(26, __c6, 2) as any as S.Schema<GetIndexOutput>,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndex",
}));

export type GetVectorBucketError = NotFoundException | ServiceUnavailableException | CommonErrors;
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
  input: __S(28, __c7, 0) as any as S.Schema<GetVectorBucketInput>,
  output: __S(30, __c7, 2) as any as S.Schema<GetVectorBucketOutput>,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVectorBucket",
}));

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
  input: __S(32, __c8, 0) as any as S.Schema<GetVectorBucketPolicyInput>,
  output: __S(33, __c8, 1) as any as S.Schema<GetVectorBucketPolicyOutput>,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVectorBucketPolicy",
}));

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
  input: __S(36, __c9, 0) as any as S.Schema<GetVectorsInput>,
  output: __S(37, __c9, 1) as any as S.Schema<GetVectorsOutput>,
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
}));

export type ListIndexesError = NotFoundException | ServiceUnavailableException | CommonErrors;
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
  input: __S(48, __c12, 0) as any as S.Schema<ListIndexesInput>,
  output: __S(51, __c12, 3) as any as S.Schema<ListIndexesOutput>,
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
  input: __S(52, __c13, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(53, __c13, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(56, __c14, 0) as any as S.Schema<ListVectorBucketsInput>,
  output: __S(59, __c14, 3) as any as S.Schema<ListVectorBucketsOutput>,
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
  input: __S(60, __c15, 0) as any as S.Schema<ListVectorsInput>,
  output: __S(61, __c15, 1) as any as S.Schema<ListVectorsOutput>,
  errors: [AccessDeniedException, NotFoundException, ServiceUnavailableException],
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

export type PutVectorBucketDefaultIndexModeError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Updates the default index mode for a vector bucket. The updated default applies to vector indexes that you create after the request succeeds. The operation doesn't change existing vector indexes. To specify the vector bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:PutVectorBucketDefaultIndexMode` permission to use this operation.
 */
export const putVectorBucketDefaultIndexMode: API.OperationMethod<
  PutVectorBucketDefaultIndexModeInput,
  PutVectorBucketDefaultIndexModeOutput,
  PutVectorBucketDefaultIndexModeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c16, 0) as any as S.Schema<PutVectorBucketDefaultIndexModeInput>,
  output: __S(8, __c2, 0) as any as S.Schema<PutVectorBucketDefaultIndexModeOutput>,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVectorBucketDefaultIndexMode",
}));

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
  input: __S(68, __c17, 0) as any as S.Schema<PutVectorBucketPolicyInput>,
  output: __S(8, __c2, 0) as any as S.Schema<PutVectorBucketPolicyOutput>,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVectorBucketPolicy",
}));

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
  input: __S(74, __c18, 2) as any as S.Schema<PutVectorsInput>,
  output: __S(8, __c2, 0) as any as S.Schema<PutVectorsOutput>,
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
}));

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
  input: __S(76, __c19, 0) as any as S.Schema<QueryVectorsInput>,
  output: __S(79, __c19, 3) as any as S.Schema<QueryVectorsOutput>,
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
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "vectors" } as const,
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
  input: __S(80, __c20, 0) as any as S.Schema<TagResourceInput>,
  output: __S(8, __c2, 0) as any as S.Schema<TagResourceOutput>,
  errors: [ConflictException, NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(84, __c21, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(8, __c2, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [ConflictException, NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateIndexModeError = NotFoundException | ServiceUnavailableException | CommonErrors;
/**
 * Updates the mode for an existing vector index. You can set the mode to `ENHANCED` for any vector index. You can set the mode to `CLASSIC` only for a vector index in a vector bucket created before September 30, 2026. This operation doesn't change the default index mode of the vector bucket or the mode of other vector indexes. Specify the vector index by using its Amazon Resource Name (ARN) or both the vector bucket name and vector index name.
 *
 * ### Permissions
 *
 * You must have the `s3vectors:UpdateIndexMode` permission to use this operation.
 */
export const updateIndexMode: API.OperationMethod<
  UpdateIndexModeInput,
  UpdateIndexModeOutput,
  UpdateIndexModeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c22, 0) as any as S.Schema<UpdateIndexModeInput>,
  output: __S(8, __c2, 0) as any as S.Schema<UpdateIndexModeOutput>,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIndexMode",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.String,
          encryptionConfiguration: S.optional(__S(96, __c24, 0)),
          tags: S.optional(__S(100, __c25, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateVectorBucket" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVectorBucketInput" });
    case 1:
      return S.suspend(() => S.Struct({ vectorBucketArn: S.optional(S.String) })).annotate({
        identifier: "CreateVectorBucketOutput",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          indexName: S.optional(S.String),
          indexArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/DeleteIndex" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIndexInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteIndexOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          vectorBucketArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteVectorBucket" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVectorBucketInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          vectorBucketArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteVectorBucketPolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVectorBucketPolicyInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          indexName: S.optional(S.String),
          indexArn: S.optional(S.String),
          keys: __S(104, __c26, 0),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/DeleteVectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVectorsInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          indexName: S.optional(S.String),
          indexArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/GetIndex" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetIndexInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.String,
          indexName: S.String,
          indexArn: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          dataType: S.String,
          dimension: S.Number,
          distanceMetric: S.String,
          metadataConfiguration: S.optional(__S(108, __c27, 0)),
          encryptionConfiguration: S.optional(__S(96, __c24, 0)),
          indexMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "Index" });
    case 2:
      return S.suspend(() => S.Struct({ index: __S(25, __c6, 1) })).annotate({
        identifier: "GetIndexOutput",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          vectorBucketArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetVectorBucket" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetVectorBucketInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.String,
          vectorBucketArn: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          encryptionConfiguration: S.optional(__S(96, __c24, 0)),
          defaultIndexMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "VectorBucket" });
    case 2:
      return S.suspend(() => S.Struct({ vectorBucket: __S(29, __c7, 1) })).annotate({
        identifier: "GetVectorBucketOutput",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          vectorBucketArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetVectorBucketPolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVectorBucketPolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ policy: S.optional(S.String) })).annotate({
        identifier: "GetVectorBucketPolicyOutput",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          indexName: S.optional(S.String),
          indexArn: S.optional(S.String),
          keys: __S(104, __c26, 0),
          returnData: S.optional(S.Boolean),
          returnMetadata: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetVectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetVectorsInput" });
    case 1:
      return S.suspend(() => S.Struct({ vectors: __S(41, __c10, 1) })).annotate({
        identifier: "GetVectorsOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          key: S.String,
          data: S.optional(__S(45, __c11, 1)),
          metadata: S.optional(S.Any),
        }),
      ).annotate({ identifier: "GetOutputVector" });
    case 1:
      return S.Array(__S(40, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ float32: __S(44, __c11, 0) })]);
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          vectorBucketArn: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          prefix: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListIndexes" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListIndexesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.String,
          indexName: S.String,
          indexArn: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "IndexSummary" });
    case 2:
      return S.Array(__S(49, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), indexes: __S(50, __c12, 2) }),
      ).annotate({ identifier: "ListIndexesOutput" });
  }
}
function __c13(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: __S(100, __c25, 0) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          prefix: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListVectorBuckets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVectorBucketsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.String,
          vectorBucketArn: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "VectorBucketSummary" });
    case 2:
      return S.Array(__S(57, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), vectorBuckets: __S(58, __c14, 2) }),
      ).annotate({ identifier: "ListVectorBucketsOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          indexName: S.optional(S.String),
          indexArn: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          segmentCount: S.optional(S.Number),
          segmentIndex: S.optional(S.Number),
          returnData: S.optional(S.Boolean),
          returnMetadata: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListVectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVectorsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), vectors: __S(41, __c10, 1) }),
      ).annotate({ identifier: "ListVectorsOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          vectorBucketArn: S.optional(S.String),
          defaultIndexMode: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/PutVectorBucketDefaultIndexMode" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutVectorBucketDefaultIndexModeInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          vectorBucketArn: S.optional(S.String),
          policy: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/PutVectorBucketPolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutVectorBucketPolicyInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.String, data: __S(45, __c11, 1), metadata: S.optional(S.Any) }),
      ).annotate({ identifier: "PutInputVector" });
    case 1:
      return S.Array(__S(72, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          indexName: S.optional(S.String),
          indexArn: S.optional(S.String),
          vectors: __S(73, __c18, 1),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/PutVectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutVectorsInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          indexName: S.optional(S.String),
          indexArn: S.optional(S.String),
          topK: S.Number,
          queryVector: __S(45, __c11, 1),
          filter: S.optional(S.Any),
          queryMode: S.optional(S.String),
          returnMetadata: S.optional(S.Boolean),
          returnDistance: S.optional(S.Boolean),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/QueryVectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "QueryVectorsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ distance: S.optional(S.Number), key: S.String, metadata: S.optional(S.Any) }),
      ).annotate({ identifier: "QueryOutputVector" });
    case 2:
      return S.Array(__S(77, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          vectors: __S(78, __c19, 2),
          distanceMetric: S.optional(S.String),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "QueryVectorsOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(100, __c25, 0),
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
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(104, __c26, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          indexName: S.optional(S.String),
          indexArn: S.optional(S.String),
          indexMode: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UpdateIndexMode" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateIndexModeInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vectorBucketName: S.optional(S.String),
          vectorBucketArn: S.optional(S.String),
          indexName: S.String,
          dataType: S.String,
          dimension: S.Number,
          distanceMetric: S.String,
          metadataConfiguration: S.optional(__S(108, __c27, 0)),
          encryptionConfiguration: S.optional(__S(96, __c24, 0)),
          tags: S.optional(__S(100, __c25, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/CreateIndex" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateIndexInput" });
    case 1:
      return S.suspend(() => S.Struct({ indexArn: S.optional(S.String) })).annotate({
        identifier: "CreateIndexOutput",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sseType: S.optional(S.String), kmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ nonFilterableMetadataKeys: __S(104, __c26, 0) })).annotate({
        identifier: "MetadataConfiguration",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
