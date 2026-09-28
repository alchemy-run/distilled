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
  sdkId: "EBS",
  target: "Ebs",
  version: "2019-11-02",
  sigv4: "ebs",
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
                `https://ebs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ebs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ebs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ebs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{
    readonly message?: string;
    readonly Reason: AccessDeniedExceptionReason;
  }> {}
export class ConcurrentLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export class InvalidSignatureException
  extends /*@__PURE__*/ TE.TaggedError("InvalidSignatureException")<{
    readonly message?: string;
  }> {}
export class RequestThrottledException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestThrottledException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly Reason?: RequestThrottledExceptionReason;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly Reason?: ResourceNotFoundExceptionReason;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message?: string;
    readonly Reason?: ServiceQuotaExceededExceptionReason;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly Reason?: ValidationExceptionReason;
  }> {}
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
  descriptor: {
    service: svc,
    http: "POST /snapshots/completion/{SnapshotId}",
    input: {
      SnapshotId: 0,
      ChangedBlocksCount: D.m({ header: "x-amz-ChangedBlocksCount" }),
      Checksum: D.m({ header: "x-amz-Checksum" }),
      ChecksumAlgorithm: D.m({ header: "x-amz-Checksum-Algorithm" }),
      ChecksumAggregationMethod: D.m({
        header: "x-amz-Checksum-Aggregation-Method",
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /snapshots/{SnapshotId}/blocks/{BlockIndex}",
    input: {
      SnapshotId: 0,
      BlockIndex: 0,
      BlockToken: D.m({ query: "blockToken" }),
    },
    output: {
      DataLength: D.m({ header: "x-amz-Data-Length", shape: D.num }),
      BlockData: D.m({ payload: true, shape: D.stream }),
      Checksum: D.m({ header: "x-amz-Checksum" }),
      ChecksumAlgorithm: D.m({ header: "x-amz-Checksum-Algorithm" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /snapshots/{SecondSnapshotId}/changedblocks",
    input: {
      FirstSnapshotId: D.m({ query: "firstSnapshotId" }),
      SecondSnapshotId: 0,
      NextToken: D.m({ query: "pageToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      StartingBlockIndex: D.m({ query: "startingBlockIndex" }),
    },
    output: { ExpiryTime: D.ts },
  },
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
  descriptor: {
    service: svc,
    http: "GET /snapshots/{SnapshotId}/blocks",
    input: {
      SnapshotId: 0,
      NextToken: D.m({ query: "pageToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      StartingBlockIndex: D.m({ query: "startingBlockIndex" }),
    },
    output: { ExpiryTime: D.ts },
  },
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
  descriptor: {
    service: svc,
    http: "PUT /snapshots/{SnapshotId}/blocks/{BlockIndex}",
    input: {
      SnapshotId: 0,
      BlockIndex: 0,
      BlockData: D.m({ payload: true, shape: D.stream }),
      DataLength: D.m({ header: "x-amz-Data-Length" }),
      Progress: D.m({ header: "x-amz-Progress" }),
      Checksum: D.m({ header: "x-amz-Checksum" }),
      ChecksumAlgorithm: D.m({ header: "x-amz-Checksum-Algorithm" }),
    },
    output: {
      Checksum: D.m({ header: "x-amz-Checksum" }),
      ChecksumAlgorithm: D.m({ header: "x-amz-Checksum-Algorithm" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /snapshots",
    input: {
      VolumeSize: 0,
      ParentSnapshotId: 0,
      Tags: D.list({ Key: 0, Value: 0 }),
      Description: 0,
      ClientToken: D.m({ idempotency: true }),
      Encrypted: 0,
      KmsKeyArn: 0,
      Timeout: 0,
    },
    output: { StartTime: D.ts, KmsKeyArn: D.secret },
    body: true,
  },
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
})) as any;
