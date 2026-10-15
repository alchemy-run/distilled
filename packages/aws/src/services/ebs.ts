import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "EBS", serviceShapeName: "Ebs" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ebs" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-11-02");
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
              `https://ebs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://ebs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://ebs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://ebs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ebs.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "AccessDeniedExceptionReason",
      }),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConcurrentLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentLimitExceededException>()(
    "ConcurrentLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export class InvalidSignatureException
  extends /*@__PURE__*/ S.TaggedError<InvalidSignatureException>()("InvalidSignatureException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class RequestThrottledException
  extends /*@__PURE__*/ S.TaggedError<RequestThrottledException>()(
    "RequestThrottledException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "RequestThrottledExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ResourceNotFoundExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ServiceQuotaExceededExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SnapshotId = string;
export type ChangedBlocksCount = number;
export type Checksum = string;
export type ChecksumAlgorithm = "SHA256" | (string & {});
export type ChecksumAggregationMethod = "LINEAR" | (string & {});
export interface CompleteSnapshotRequest {
  SnapshotId: string;
  ChangedBlocksCount: number;
  Checksum?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ChecksumAggregationMethod?: ChecksumAggregationMethod;
}
export type Status = "completed" | "pending" | "error" | (string & {});
export interface CompleteSnapshotResponse {
  Status?: Status;
}
export type BlockIndex = number;
export type BlockToken = string;
export interface GetSnapshotBlockRequest {
  SnapshotId: string;
  BlockIndex: number;
  BlockToken: string;
}
export type DataLength = number;
export interface GetSnapshotBlockResponse {
  DataLength?: number;
  BlockData?: T.StreamingOutputBody;
  Checksum?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
}
export type PageToken = string;
export type MaxResults = number;
export interface ListChangedBlocksRequest {
  FirstSnapshotId?: string;
  SecondSnapshotId: string;
  NextToken?: string;
  MaxResults?: number;
  StartingBlockIndex?: number;
}
export interface ChangedBlock {
  BlockIndex?: number;
  FirstBlockToken?: string;
  SecondBlockToken?: string;
}
export type ChangedBlocks = ChangedBlock[];
export type VolumeSize = number;
export type BlockSize = number;
export interface ListChangedBlocksResponse {
  ChangedBlocks?: ChangedBlock[];
  ExpiryTime?: Date;
  VolumeSize?: number;
  BlockSize?: number;
  NextToken?: string;
}
export interface ListSnapshotBlocksRequest {
  SnapshotId: string;
  NextToken?: string;
  MaxResults?: number;
  StartingBlockIndex?: number;
}
export interface Block {
  BlockIndex?: number;
  BlockToken?: string;
}
export type Blocks = Block[];
export interface ListSnapshotBlocksResponse {
  Blocks?: Block[];
  ExpiryTime?: Date;
  VolumeSize?: number;
  BlockSize?: number;
  NextToken?: string;
}
export type Progress = number;
export interface PutSnapshotBlockRequest {
  SnapshotId: string;
  BlockIndex: number;
  BlockData: T.StreamingInputBody;
  DataLength: number;
  Progress?: number;
  Checksum: string;
  ChecksumAlgorithm: ChecksumAlgorithm;
}
export interface PutSnapshotBlockResponse {
  Checksum?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type Tags = Tag[];
export type Description = string;
export type IdempotencyToken = string;
export type KmsKeyArn = string | redacted.Redacted<string>;
export type Timeout = number;
export interface StartSnapshotRequest {
  VolumeSize: number;
  ParentSnapshotId?: string;
  Tags?: Tag[];
  Description?: string;
  ClientToken?: string;
  Encrypted?: boolean;
  KmsKeyArn?: string | redacted.Redacted<string>;
  Timeout?: number;
}
export type OwnerId = string;
export type SSEType = "sse-ebs" | "sse-kms" | "none" | (string & {});
export interface StartSnapshotResponse {
  Description?: string;
  SnapshotId?: string;
  OwnerId?: string;
  Status?: Status;
  StartTime?: Date;
  VolumeSize?: number;
  BlockSize?: number;
  Tags?: Tag[];
  ParentSnapshotId?: string;
  KmsKeyArn?: string | redacted.Redacted<string>;
  SseType?: SSEType;
}
export type ErrorMessage = string;
export type AccessDeniedExceptionReason =
  | "UNAUTHORIZED_ACCOUNT"
  | "DEPENDENCY_ACCESS_DENIED"
  | (string & {});
export type RequestThrottledExceptionReason =
  | "ACCOUNT_THROTTLED"
  | "DEPENDENCY_REQUEST_THROTTLED"
  | "RESOURCE_LEVEL_THROTTLE"
  | (string & {});
export type ResourceNotFoundExceptionReason =
  | "SNAPSHOT_NOT_FOUND"
  | "GRANT_NOT_FOUND"
  | "DEPENDENCY_RESOURCE_NOT_FOUND"
  | "IMAGE_NOT_FOUND"
  | (string & {});
export type ServiceQuotaExceededExceptionReason =
  | "DEPENDENCY_SERVICE_QUOTA_EXCEEDED"
  | (string & {});
export type ValidationExceptionReason =
  | "INVALID_CUSTOMER_KEY"
  | "INVALID_PAGE_TOKEN"
  | "INVALID_BLOCK_TOKEN"
  | "INVALID_GRANT_TOKEN"
  | "INVALID_SNAPSHOT_ID"
  | "UNRELATED_SNAPSHOTS"
  | "INVALID_BLOCK"
  | "INVALID_CONTENT_ENCODING"
  | "INVALID_TAG"
  | "INVALID_DEPENDENCY_REQUEST"
  | "INVALID_PARAMETER_VALUE"
  | "INVALID_VOLUME_SIZE"
  | "CONFLICTING_BLOCK_UPDATE"
  | "INVALID_IMAGE_ID"
  | "WRITE_REQUEST_TIMEOUT"
  | (string & {});
export type CompleteSnapshotError =
  | AccessDeniedException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | InvalidSignatureException
  | CommonErrors;
/**
 * Seals and completes the snapshot after all of the required blocks of data have been
 * written to it. Completing the snapshot changes the status to `completed`. You
 * cannot write new blocks to a snapshot after it has been completed.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const completeSnapshot: API.OperationMethod<
  CompleteSnapshotRequest,
  CompleteSnapshotResponse,
  CompleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<CompleteSnapshotRequest>,
  output: __S(21, __c5, 1) as any as S.Schema<CompleteSnapshotResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    InvalidSignatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteSnapshot",
}));

export type GetSnapshotBlockError =
  | AccessDeniedException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns the data in a block in an Amazon Elastic Block Store snapshot.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const getSnapshotBlock: API.OperationMethod<
  GetSnapshotBlockRequest,
  GetSnapshotBlockResponse,
  GetSnapshotBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetSnapshotBlockRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<GetSnapshotBlockResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSnapshotBlock",
}));

export type ListChangedBlocksError =
  | AccessDeniedException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the blocks that are different between two
 * Amazon Elastic Block Store snapshots of the same volume/snapshot lineage.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const listChangedBlocks: API.PaginatedOperationMethod<
  ListChangedBlocksRequest,
  ListChangedBlocksResponse,
  ListChangedBlocksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<ListChangedBlocksRequest>,
  output: __S(7, __c1, 3) as any as S.Schema<ListChangedBlocksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChangedBlocks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSnapshotBlocksError =
  | AccessDeniedException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the blocks in an Amazon Elastic Block Store snapshot.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const listSnapshotBlocks: API.PaginatedOperationMethod<
  ListSnapshotBlocksRequest,
  ListSnapshotBlocksResponse,
  ListSnapshotBlocksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<ListSnapshotBlocksRequest>,
  output: __S(11, __c2, 3) as any as S.Schema<ListSnapshotBlocksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSnapshotBlocks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutSnapshotBlockError =
  | AccessDeniedException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | InvalidSignatureException
  | CommonErrors;
/**
 * Writes a block of data to a snapshot. If the specified block contains
 * data, the existing data is overwritten. The target snapshot must be in the
 * `pending` state.
 *
 * Data written to a snapshot must be aligned with 512-KiB sectors.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const putSnapshotBlock: API.OperationMethod<
  PutSnapshotBlockRequest,
  PutSnapshotBlockResponse,
  PutSnapshotBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<PutSnapshotBlockRequest>,
  output: __S(13, __c3, 1) as any as S.Schema<PutSnapshotBlockResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    InvalidSignatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSnapshotBlock",
}));

export type StartSnapshotError =
  | AccessDeniedException
  | ConcurrentLimitExceededException
  | ConflictException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Amazon EBS snapshot. The new snapshot enters the `pending` state
 * after the request completes.
 *
 * After creating the snapshot, use PutSnapshotBlock to
 * write blocks of data to the snapshot.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const startSnapshot: API.OperationMethod<
  StartSnapshotRequest,
  StartSnapshotResponse,
  StartSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(18, __c4, 2) as any as S.Schema<StartSnapshotRequest>,
  output: __S(19, __c4, 3) as any as S.Schema<StartSnapshotResponse>,
  errors: [
    AccessDeniedException,
    ConcurrentLimitExceededException,
    ConflictException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSnapshot",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotId: S.String.pipe(T.HttpLabel("SnapshotId")),
          BlockIndex: S.Number.pipe(T.HttpLabel("BlockIndex")),
          BlockToken: S.String.pipe(T.HttpQuery("blockToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/snapshots/{SnapshotId}/blocks/{BlockIndex}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSnapshotBlockRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataLength: S.optional(S.Number).pipe(T.HttpHeader("x-amz-Data-Length")),
          BlockData: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          Checksum: S.optional(S.String).pipe(T.HttpHeader("x-amz-Checksum")),
          ChecksumAlgorithm: S.optional(S.String).pipe(T.HttpHeader("x-amz-Checksum-Algorithm")),
        }),
      ).annotate({ identifier: "GetSnapshotBlockResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirstSnapshotId: S.optional(S.String).pipe(T.HttpQuery("firstSnapshotId")),
          SecondSnapshotId: S.String.pipe(T.HttpLabel("SecondSnapshotId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("pageToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          StartingBlockIndex: S.optional(S.Number).pipe(T.HttpQuery("startingBlockIndex")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/snapshots/{SecondSnapshotId}/changedblocks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChangedBlocksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BlockIndex: S.optional(S.Number),
          FirstBlockToken: S.optional(S.String),
          SecondBlockToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChangedBlock" });
    case 2:
      return S.Array(__S(5, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ChangedBlocks: S.optional(__S(6, __c1, 2)),
          ExpiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VolumeSize: S.optional(S.Number),
          BlockSize: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListChangedBlocksResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotId: S.String.pipe(T.HttpLabel("SnapshotId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("pageToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          StartingBlockIndex: S.optional(S.Number).pipe(T.HttpQuery("startingBlockIndex")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/snapshots/{SnapshotId}/blocks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSnapshotBlocksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BlockIndex: S.optional(S.Number), BlockToken: S.optional(S.String) }),
      ).annotate({ identifier: "Block" });
    case 2:
      return S.Array(__S(9, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Blocks: S.optional(__S(10, __c2, 2)),
          ExpiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VolumeSize: S.optional(S.Number),
          BlockSize: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSnapshotBlocksResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotId: S.String.pipe(T.HttpLabel("SnapshotId")),
          BlockIndex: S.Number.pipe(T.HttpLabel("BlockIndex")),
          BlockData: T.StreamingInput.pipe(T.HttpPayload()),
          DataLength: S.Number.pipe(T.HttpHeader("x-amz-Data-Length")),
          Progress: S.optional(S.Number).pipe(T.HttpHeader("x-amz-Progress")),
          Checksum: S.String.pipe(T.HttpHeader("x-amz-Checksum")),
          ChecksumAlgorithm: S.String.pipe(T.HttpHeader("x-amz-Checksum-Algorithm")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/snapshots/{SnapshotId}/blocks/{BlockIndex}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSnapshotBlockRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Checksum: S.optional(S.String).pipe(T.HttpHeader("x-amz-Checksum")),
          ChecksumAlgorithm: S.optional(S.String).pipe(T.HttpHeader("x-amz-Checksum-Algorithm")),
        }),
      ).annotate({ identifier: "PutSnapshotBlockResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(16, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          VolumeSize: S.Number,
          ParentSnapshotId: S.optional(S.String),
          Tags: S.optional(__S(17, __c4, 1)),
          Description: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Encrypted: S.optional(S.Boolean),
          KmsKeyArn: S.optional(SensitiveString),
          Timeout: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/snapshots" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartSnapshotRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          SnapshotId: S.optional(S.String),
          OwnerId: S.optional(S.String),
          Status: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VolumeSize: S.optional(S.Number),
          BlockSize: S.optional(S.Number),
          Tags: S.optional(__S(17, __c4, 1)),
          ParentSnapshotId: S.optional(S.String),
          KmsKeyArn: S.optional(SensitiveString),
          SseType: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartSnapshotResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotId: S.String.pipe(T.HttpLabel("SnapshotId")),
          ChangedBlocksCount: S.Number.pipe(T.HttpHeader("x-amz-ChangedBlocksCount")),
          Checksum: S.optional(S.String).pipe(T.HttpHeader("x-amz-Checksum")),
          ChecksumAlgorithm: S.optional(S.String).pipe(T.HttpHeader("x-amz-Checksum-Algorithm")),
          ChecksumAggregationMethod: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-Checksum-Aggregation-Method"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/snapshots/completion/{SnapshotId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CompleteSnapshotRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "CompleteSnapshotResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
