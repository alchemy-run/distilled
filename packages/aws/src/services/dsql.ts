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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "DSQL", serviceShapeName: "DSQL" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "dsql" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
              `https://dsql-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(`https://dsql.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://dsql.{R}.api.aws","properties":{},"headers":{}}',
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

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(53, __c13, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type EncryptionType = "AWS_OWNED_KMS_KEY" | "CUSTOMER_MANAGED_KMS_KEY" | (string & {});
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
  input: __S(56, __c14, 0) as any as S.Schema<CreateClusterInput>,
  output: __S(57, __c14, 1) as any as S.Schema<CreateClusterOutput>,
  errors: [ConflictException, ServiceQuotaExceededException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

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
  input: __S(76, __c19, 0) as any as S.Schema<CreateStreamInput>,
  output: __S(77, __c19, 1) as any as S.Schema<CreateStreamOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStream",
}));

export type DeleteClusterError = ConflictException | ResourceNotFoundException | CommonErrors;
/**
 * Deletes a cluster in Amazon Aurora DSQL.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterInput,
  DeleteClusterOutput,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(84, __c21, 0) as any as S.Schema<DeleteClusterInput>,
  output: __S(88, __c22, 0) as any as S.Schema<DeleteClusterOutput>,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

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
  input: __S(92, __c23, 0) as any as S.Schema<DeleteClusterPolicyInput>,
  output: __S(96, __c24, 0) as any as S.Schema<DeleteClusterPolicyOutput>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterPolicy",
}));

export type DeleteStreamError = ConflictException | ResourceNotFoundException | CommonErrors;
/**
 * Deletes a stream from a cluster.
 */
export const deleteStream: API.OperationMethod<
  DeleteStreamInput,
  DeleteStreamOutput,
  DeleteStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteStreamInput>,
  output: __S(1, __c0, 1) as any as S.Schema<DeleteStreamOutput>,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStream",
}));

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
  input: __S(4, __c1, 0) as any as S.Schema<GetClusterInput>,
  output: __S(5, __c1, 1) as any as S.Schema<GetClusterOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCluster",
}));

export type GetClusterPolicyError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Retrieves the resource-based policy document attached to a cluster. This policy defines the access permissions and conditions for the cluster.
 */
export const getClusterPolicy: API.OperationMethod<
  GetClusterPolicyInput,
  GetClusterPolicyOutput,
  GetClusterPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<GetClusterPolicyInput>,
  output: __S(9, __c2, 1) as any as S.Schema<GetClusterPolicyOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterPolicy",
}));

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
  input: __S(12, __c3, 0) as any as S.Schema<GetStreamInput>,
  output: __S(14, __c3, 2) as any as S.Schema<GetStreamOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStream",
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<GetVpcEndpointServiceNameInput>,
  output: __S(17, __c4, 1) as any as S.Schema<GetVpcEndpointServiceNameOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcEndpointServiceName",
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<ListClustersInput>,
  output: __S(23, __c5, 3) as any as S.Schema<ListClustersOutput>,
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
  input: __S(24, __c6, 0) as any as S.Schema<ListStreamsInput>,
  output: __S(27, __c6, 3) as any as S.Schema<ListStreamsOutput>,
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
  input: __S(28, __c7, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(29, __c7, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(32, __c8, 0) as any as S.Schema<PutClusterPolicyInput>,
  output: __S(96, __c24, 0) as any as S.Schema<PutClusterPolicyOutput>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutClusterPolicy",
}));

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
  input: __S(36, __c9, 0) as any as S.Schema<TagResourceInput>,
  output: __S(40, __c10, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(44, __c11, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(40, __c10, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(48, __c12, 0) as any as S.Schema<UpdateClusterInput>,
  output: __S(88, __c22, 0) as any as S.Schema<UpdateClusterOutput>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String.pipe(T.HttpLabel("clusterIdentifier")),
          streamIdentifier: S.String.pipe(T.HttpLabel("streamIdentifier")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("client-token"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/stream/{clusterIdentifier}/{streamIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteStreamInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          streamIdentifier: S.String,
          arn: S.String,
          status: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DeleteStreamOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/cluster/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetClusterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          arn: S.String,
          status: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          deletionProtectionEnabled: S.Boolean,
          multiRegionProperties: S.optional(__S(68, __c17, 0)),
          tags: S.optional(__S(72, __c18, 0)),
          encryptionDetails: S.optional(__S(60, __c15, 0)),
          endpoint: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetClusterOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/cluster/{identifier}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetClusterPolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ policy: S.String, policyVersion: S.String })).annotate({
        identifier: "GetClusterPolicyOutput",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String.pipe(T.HttpLabel("clusterIdentifier")),
          streamIdentifier: S.String.pipe(T.HttpLabel("streamIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/stream/{clusterIdentifier}/{streamIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStreamInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ error: S.String, updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
      ).annotate({ identifier: "StatusReason" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          streamIdentifier: S.String,
          arn: S.String,
          status: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ordering: S.String,
          format: S.String,
          targetDefinition: S.optional(__S(81, __c20, 1)),
          statusReason: S.optional(__S(13, __c3, 1)),
          tags: S.optional(__S(72, __c18, 0)),
        }),
      ).annotate({ identifier: "GetStreamOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clusters/{identifier}/vpc-endpoint-service-name" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVpcEndpointServiceNameInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ serviceName: S.String, clusterVpcEndpoint: S.optional(S.String) }),
      ).annotate({ identifier: "GetVpcEndpointServiceNameOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/cluster" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListClustersInput" });
    case 1:
      return S.suspend(() => S.Struct({ identifier: S.String, arn: S.String })).annotate({
        identifier: "ClusterSummary",
      });
    case 2:
      return S.Array(__S(21, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), clusters: __S(22, __c5, 2) }),
      ).annotate({ identifier: "ListClustersOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String.pipe(T.HttpLabel("clusterIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/stream/{clusterIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListStreamsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          streamIdentifier: S.String,
          arn: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
        }),
      ).annotate({ identifier: "StreamSummary" });
    case 2:
      return S.Array(__S(25, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), streams: __S(26, __c6, 2) }),
      ).annotate({ identifier: "ListStreamsOutput" });
  }
}
function __c7(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(72, __c18, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          policy: S.String,
          bypassPolicyLockoutSafetyCheck: S.optional(S.Boolean),
          expectedPolicyVersion: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cluster/{identifier}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutClusterPolicyInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(72, __c18, 0),
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
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(64, __c16, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          deletionProtectionEnabled: S.optional(S.Boolean),
          kmsEncryptionKey: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          multiRegionProperties: S.optional(__S(68, __c17, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cluster/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateClusterInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(52, __c13, 0));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deletionProtectionEnabled: S.optional(S.Boolean),
          kmsEncryptionKey: S.optional(S.String),
          tags: S.optional(__S(72, __c18, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          multiRegionProperties: S.optional(__S(68, __c17, 0)),
          policy: S.optional(S.String),
          bypassPolicyLockoutSafetyCheck: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/cluster" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          arn: S.String,
          status: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          multiRegionProperties: S.optional(__S(68, __c17, 0)),
          encryptionDetails: S.optional(__S(60, __c15, 0)),
          deletionProtectionEnabled: S.Boolean,
          endpoint: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateClusterOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          encryptionType: S.String,
          kmsKeyArn: S.optional(S.String),
          encryptionStatus: S.String,
        }),
      ).annotate({ identifier: "EncryptionDetails" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ witnessRegion: S.optional(S.String), clusters: S.optional(__S(64, __c16, 0)) }),
      ).annotate({ identifier: "MultiRegionProperties" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String.pipe(T.HttpLabel("clusterIdentifier")),
          targetDefinition: __S(81, __c20, 1),
          ordering: S.String,
          format: S.String,
          tags: S.optional(__S(72, __c18, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/stream/{clusterIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateStreamInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          streamIdentifier: S.String,
          arn: S.String,
          status: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ordering: S.String,
          format: S.String,
        }),
      ).annotate({ identifier: "CreateStreamOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ streamArn: S.String, roleArn: S.String })).annotate({
        identifier: "KinesisTargetDefinition",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ kinesis: __S(80, __c20, 0) })]);
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("client-token"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/cluster/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteClusterInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          arn: S.String,
          status: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DeleteClusterOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          expectedPolicyVersion: S.optional(S.String).pipe(T.HttpQuery("expected-policy-version")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("client-token"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/cluster/{identifier}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteClusterPolicyInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ policyVersion: S.String })).annotate({
        identifier: "DeleteClusterPolicyOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
