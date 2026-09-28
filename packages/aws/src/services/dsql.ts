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
  sdkId: "DSQL",
  target: "DSQL",
  version: "2018-05-10",
  sigv4: "dsql",
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
              `https://dsql-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://dsql.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
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
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type DeletionProtectionEnabled = boolean;
export type KmsEncryptionKey = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export type Region = string;
export type ClusterArn = string;
export type ClusterArnList = string[];
export interface MultiRegionProperties {
  witnessRegion?: string;
  clusters?: string[];
}
export type PolicyDocument = string;
export type BypassPolicyLockoutSafetyCheck = boolean;
export interface CreateClusterInput {
  deletionProtectionEnabled?: boolean;
  kmsEncryptionKey?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
  multiRegionProperties?: MultiRegionProperties;
  policy?: string;
  bypassPolicyLockoutSafetyCheck?: boolean;
}
export type ClusterId = string;
export type ClusterStatus =
  | "CREATING"
  | "ACTIVE"
  | "IDLE"
  | "INACTIVE"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "FAILED"
  | "PENDING_SETUP"
  | "PENDING_DELETE"
  | (string & {});
export type ClusterCreationTime = Date;
export type EncryptionType =
  | "AWS_OWNED_KMS_KEY"
  | "CUSTOMER_MANAGED_KMS_KEY"
  | (string & {});
export type KmsKeyArn = string;
export type EncryptionStatus =
  | "ENABLED"
  | "UPDATING"
  | "KMS_KEY_INACCESSIBLE"
  | "ENABLING"
  | (string & {});
export interface EncryptionDetails {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
  encryptionStatus: EncryptionStatus;
}
export type Endpoint = string;
export interface CreateClusterOutput {
  identifier: string;
  arn: string;
  status: ClusterStatus;
  creationTime: Date;
  multiRegionProperties?: MultiRegionProperties;
  encryptionDetails?: EncryptionDetails;
  deletionProtectionEnabled: boolean;
  endpoint?: string;
}
export type KinesisStreamArn = string;
export type RoleArn = string;
export interface KinesisTargetDefinition {
  streamArn: string;
  roleArn: string;
}
export type TargetDefinition = { kinesis: KinesisTargetDefinition };
export type StreamOrdering = "UNORDERED" | (string & {});
export type StreamFormat = "JSON" | (string & {});
export interface CreateStreamInput {
  clusterIdentifier: string;
  targetDefinition: TargetDefinition;
  ordering: StreamOrdering;
  format: StreamFormat;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type StreamId = string;
export type StreamArn = string;
export type StreamStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "DELETED"
  | "FAILED"
  | "IMPAIRED"
  | (string & {});
export type StreamCreationTime = Date;
export interface CreateStreamOutput {
  clusterIdentifier: string;
  streamIdentifier: string;
  arn: string;
  status: StreamStatus;
  creationTime: Date;
  ordering: StreamOrdering;
  format: StreamFormat;
}
export interface DeleteClusterInput {
  identifier: string;
  clientToken?: string;
}
export interface DeleteClusterOutput {
  identifier: string;
  arn: string;
  status: ClusterStatus;
  creationTime: Date;
}
export type PolicyVersion = string;
export interface DeleteClusterPolicyInput {
  identifier: string;
  expectedPolicyVersion?: string;
  clientToken?: string;
}
export interface DeleteClusterPolicyOutput {
  policyVersion: string;
}
export interface DeleteStreamInput {
  clusterIdentifier: string;
  streamIdentifier: string;
  clientToken?: string;
}
export interface DeleteStreamOutput {
  clusterIdentifier: string;
  streamIdentifier: string;
  arn: string;
  status: StreamStatus;
  creationTime: Date;
}
export interface GetClusterInput {
  identifier: string;
}
export interface GetClusterOutput {
  identifier: string;
  arn: string;
  status: ClusterStatus;
  creationTime: Date;
  deletionProtectionEnabled: boolean;
  multiRegionProperties?: MultiRegionProperties;
  tags?: { [key: string]: string | undefined };
  encryptionDetails?: EncryptionDetails;
  endpoint?: string;
}
export interface GetClusterPolicyInput {
  identifier: string;
}
export interface GetClusterPolicyOutput {
  policy: string;
  policyVersion: string;
}
export interface GetStreamInput {
  clusterIdentifier: string;
  streamIdentifier: string;
}
export type StreamFailureErrorCode =
  | "KINESIS_THROUGHPUT_EXCEEDED"
  | "KINESIS_STREAM_NOT_FOUND"
  | "ROLE_ACCESS_DENIED"
  | "KINESIS_ACCESS_DENIED"
  | "KINESIS_KMS_ACCESS_DENIED"
  | "KINESIS_OVERSIZE_RECORD"
  | "CLUSTER_CMK_INACCESSIBLE"
  | "INTERNAL_ERROR"
  | (string & {});
export interface StatusReason {
  error: StreamFailureErrorCode;
  updatedAt: Date;
}
export interface GetStreamOutput {
  clusterIdentifier: string;
  streamIdentifier: string;
  arn: string;
  status: StreamStatus;
  creationTime: Date;
  ordering: StreamOrdering;
  format: StreamFormat;
  targetDefinition?: TargetDefinition;
  statusReason?: StatusReason;
  tags?: { [key: string]: string | undefined };
}
export interface GetVpcEndpointServiceNameInput {
  identifier: string;
}
export type ServiceName = string;
export type ClusterVpcEndpoint = string;
export interface GetVpcEndpointServiceNameOutput {
  serviceName: string;
  clusterVpcEndpoint?: string;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListClustersInput {
  maxResults?: number;
  nextToken?: string;
}
export interface ClusterSummary {
  identifier: string;
  arn: string;
}
export type ClusterList = ClusterSummary[];
export interface ListClustersOutput {
  nextToken?: string;
  clusters: ClusterSummary[];
}
export interface ListStreamsInput {
  clusterIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface StreamSummary {
  clusterIdentifier: string;
  streamIdentifier: string;
  arn: string;
  creationTime: Date;
  status: StreamStatus;
}
export type StreamList = StreamSummary[];
export interface ListStreamsOutput {
  nextToken?: string;
  streams: StreamSummary[];
}
export type Arn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export interface PutClusterPolicyInput {
  identifier: string;
  policy: string;
  bypassPolicyLockoutSafetyCheck?: boolean;
  expectedPolicyVersion?: string;
  clientToken?: string;
}
export interface PutClusterPolicyOutput {
  policyVersion: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateClusterInput {
  identifier: string;
  deletionProtectionEnabled?: boolean;
  kmsEncryptionKey?: string;
  clientToken?: string;
  multiRegionProperties?: MultiRegionProperties;
}
export interface UpdateClusterOutput {
  identifier: string;
  arn: string;
  status: ClusterStatus;
  creationTime: Date;
}
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "deletionProtectionEnabled"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateClusterError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The CreateCluster API allows you to create both single-Region clusters and multi-Region clusters. With the addition of the *multiRegionProperties* parameter, you can create a cluster with witness Region support and establish peer relationships with clusters in other Regions during creation.
 *
 * Creating multi-Region clusters requires additional IAM permissions beyond those needed for single-Region clusters, as detailed in the **Required permissions** section below.
 *
 * **Required permissions**
 *
 * ### dsql:CreateCluster
 *
 * Required to create a cluster.
 *
 * Resources: `arn:aws:dsql:region:account-id:cluster/*`
 *
 * ### dsql:TagResource
 *
 * Permission to add tags to a resource.
 *
 * Resources: `arn:aws:dsql:region:account-id:cluster/*`
 *
 * ### dsql:PutMultiRegionProperties
 *
 * Permission to configure multi-Region properties for a cluster.
 *
 * Resources: `arn:aws:dsql:region:account-id:cluster/*`
 *
 * ### dsql:AddPeerCluster
 *
 * When specifying `multiRegionProperties.clusters`, permission to add peer clusters.
 *
 * Resources:
 *
 * - Local cluster: `arn:aws:dsql:region:account-id:cluster/*`
 *
 * - Each peer cluster: exact ARN of each specified peer cluster
 *
 * ### dsql:PutWitnessRegion
 *
 * When specifying `multiRegionProperties.witnessRegion`, permission to set a witness Region. This permission is checked both in the cluster Region and in the witness Region.
 *
 * Resources: `arn:aws:dsql:region:account-id:cluster/*`
 *
 * Condition Keys: `dsql:WitnessRegion` (matching the specified witness region)
 *
 * - The witness Region specified in `multiRegionProperties.witnessRegion` cannot be the same as the cluster's Region.
 */
export const createCluster: API.OperationMethod<
  CreateClusterInput,
  CreateClusterOutput,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cluster",
    input: {
      deletionProtectionEnabled: 0,
      kmsEncryptionKey: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
      multiRegionProperties: i_MultiRegionProperties,
      policy: 0,
      bypassPolicyLockoutSafetyCheck: 0,
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
})) as any;

export type CreateStreamError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new change data capture (CDC) stream for a cluster. The stream captures database changes and delivers them to the specified target destination.
 *
 * **Required permissions**
 *
 * ### dsql:CreateStream
 *
 * Permission to create a new stream.
 *
 * Resources: `arn:aws:dsql:region:account-id:cluster/cluster-id`
 *
 * ### iam:PassRole
 *
 * Permission to pass the IAM role specified in the target definition to the service.
 *
 * Resources: ARN of the IAM role specified in `targetDefinition.kinesis.roleArn`
 *
 * ### kms:Decrypt
 *
 * Required when the cluster uses a customer managed KMS key (CMK). Permission to decrypt data using the cluster's CMK.
 *
 * Resources: ARN of the KMS key used by the cluster
 */
export const createStream: API.OperationMethod<
  CreateStreamInput,
  CreateStreamOutput,
  CreateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /stream/{clusterIdentifier}",
    input: {
      clusterIdentifier: 0,
      targetDefinition: { kinesis: { streamArn: 0, roleArn: 0 } },
      ordering: 0,
      format: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStream",
})) as any;

export type DeleteClusterError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a cluster in Amazon Aurora DSQL.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterInput,
  DeleteClusterOutput,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /cluster/{identifier}",
    input: {
      identifier: 0,
      clientToken: D.m({ query: "client-token", idempotency: true }),
    },
    output: { creationTime: D.ts },
  },
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
})) as any;

export type DeleteClusterPolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource-based policy attached to a cluster. This removes all access permissions defined by the policy, reverting to default access controls.
 */
export const deleteClusterPolicy: API.OperationMethod<
  DeleteClusterPolicyInput,
  DeleteClusterPolicyOutput,
  DeleteClusterPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /cluster/{identifier}/policy",
    input: {
      identifier: 0,
      expectedPolicyVersion: D.m({ query: "expected-policy-version" }),
      clientToken: D.m({ query: "client-token", idempotency: true }),
    },
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterPolicy",
})) as any;

export type DeleteStreamError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a stream from a cluster.
 */
export const deleteStream: API.OperationMethod<
  DeleteStreamInput,
  DeleteStreamOutput,
  DeleteStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /stream/{clusterIdentifier}/{streamIdentifier}",
    input: {
      clusterIdentifier: 0,
      streamIdentifier: 0,
      clientToken: D.m({ query: "client-token", idempotency: true }),
    },
    output: { creationTime: D.ts },
  },
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStream",
})) as any;

export type GetClusterError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves information about a cluster.
 */
export const getCluster: API.OperationMethod<
  GetClusterInput,
  GetClusterOutput,
  GetClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /cluster/{identifier}",
    input: { identifier: 0 },
    output: { creationTime: D.ts },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCluster",
})) as any;

export type GetClusterPolicyError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource-based policy document attached to a cluster. This policy defines the access permissions and conditions for the cluster.
 */
export const getClusterPolicy: API.OperationMethod<
  GetClusterPolicyInput,
  GetClusterPolicyOutput,
  GetClusterPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /cluster/{identifier}/policy",
    input: { identifier: 0 },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterPolicy",
})) as any;

export type GetStreamError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves information about a stream.
 */
export const getStream: API.OperationMethod<
  GetStreamInput,
  GetStreamOutput,
  GetStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /stream/{clusterIdentifier}/{streamIdentifier}",
    input: { clusterIdentifier: 0, streamIdentifier: 0 },
    output: { creationTime: D.ts, statusReason: { updatedAt: D.ts } },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStream",
})) as any;

export type GetVpcEndpointServiceNameError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the VPC endpoint service name.
 */
export const getVpcEndpointServiceName: API.OperationMethod<
  GetVpcEndpointServiceNameInput,
  GetVpcEndpointServiceNameOutput,
  GetVpcEndpointServiceNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /clusters/{identifier}/vpc-endpoint-service-name",
    input: { identifier: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcEndpointServiceName",
})) as any;

export type ListClustersError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves information about a list of clusters.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersInput,
  ListClustersOutput,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  ClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /cluster",
    input: {
      maxResults: D.m({ query: "max-results" }),
      nextToken: D.m({ query: "next-token" }),
    },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "clusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStreamsError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves information about a list of streams for a cluster.
 */
export const listStreams: API.PaginatedOperationMethod<
  ListStreamsInput,
  ListStreamsOutput,
  ListStreamsError,
  Credentials | HttpClient.HttpClient,
  StreamSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /stream/{clusterIdentifier}",
    input: {
      clusterIdentifier: 0,
      maxResults: D.m({ query: "max-results" }),
      nextToken: D.m({ query: "next-token" }),
    },
    output: { streams: D.list({ creationTime: D.ts }) },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "streams",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists all of the tags for a resource.
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
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutClusterPolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a resource-based policy to a cluster. This policy defines access permissions and conditions for the cluster, allowing you to control which principals can perform actions on the cluster.
 */
export const putClusterPolicy: API.OperationMethod<
  PutClusterPolicyInput,
  PutClusterPolicyOutput,
  PutClusterPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cluster/{identifier}/policy",
    input: {
      identifier: 0,
      policy: 0,
      bypassPolicyLockoutSafetyCheck: 0,
      expectedPolicyVersion: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutClusterPolicy",
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Tags a resource with a map of key and value pairs.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes a tag from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateClusterError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * The *UpdateCluster* API allows you to modify both single-Region and multi-Region cluster configurations. With the *multiRegionProperties* parameter, you can add or modify witness Region support and manage peer relationships with clusters in other Regions.
 *
 * Note that updating multi-Region clusters requires additional IAM permissions beyond those needed for standard cluster updates, as detailed in the Permissions section.
 *
 * **Required permissions**
 *
 * ### dsql:UpdateCluster
 *
 * Permission to update a DSQL cluster.
 *
 * Resources: `arn:aws:dsql:*region*:*account-id*:cluster/*cluster-id* `
 *
 * ### dsql:PutMultiRegionProperties
 *
 * Permission to configure multi-Region properties for a cluster.
 *
 * Resources: `arn:aws:dsql:*region*:*account-id*:cluster/*cluster-id* `
 *
 * ### dsql:GetCluster
 *
 * Permission to retrieve cluster information.
 *
 * Resources: `arn:aws:dsql:*region*:*account-id*:cluster/*cluster-id* `
 *
 * ### dsql:AddPeerCluster
 *
 * Permission to add peer clusters.
 *
 * Resources:
 *
 * - Local cluster: `arn:aws:dsql:*region*:*account-id*:cluster/*cluster-id* `
 *
 * - Each peer cluster: exact ARN of each specified peer cluster
 *
 * ### dsql:RemovePeerCluster
 *
 * Permission to remove peer clusters. When you list peer clusters in `multiRegionProperties.clusters`, you need this permission for each current peer cluster that your list omits.
 *
 * Resources:
 *
 * - Each removed peer cluster: exact ARN of each removed peer cluster, in its own Region
 *
 * ### dsql:PutWitnessRegion
 *
 * Permission to set a witness Region.
 *
 * Resources: `arn:aws:dsql:*region*:*account-id*:cluster/*cluster-id* `
 *
 * Condition Keys: dsql:WitnessRegion (matching the specified witness Region)
 *
 * **This permission is checked both in the cluster Region and in the witness Region.**
 *
 * - The witness Region specified in `multiRegionProperties.witnessRegion` cannot be the same as the cluster's Region.
 *
 * - When you list peer clusters in `multiRegionProperties.clusters`, you need `dsql:AddPeerCluster` for every peer cluster in your request. You need `dsql:RemovePeerCluster` only for the peer clusters that the update removes.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterInput,
  UpdateClusterOutput,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cluster/{identifier}",
    input: {
      identifier: 0,
      deletionProtectionEnabled: 0,
      kmsEncryptionKey: 0,
      clientToken: D.m({ idempotency: true }),
      multiRegionProperties: i_MultiRegionProperties,
    },
    output: { creationTime: D.ts },
    body: true,
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
})) as any;

const i_MultiRegionProperties: D.LazyStruct = () => ({
  witnessRegion: 0,
  clusters: 0,
});
