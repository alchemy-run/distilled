import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("https://mediastore.amazonaws.com/doc/2017-09-01");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "MediaStore",
  serviceShapeName: "MediaStore_20170901",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "mediastore" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-09-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://mediastore-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mediastore-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mediastore.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://mediastore.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://mediastore.{R}.{D}","properties":{},"headers":{}}');

export class ContainerInUseException
  extends /*@__PURE__*/ S.TaggedError<ContainerInUseException>()("ContainerInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ContainerNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ContainerNotFoundException>()("ContainerNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class CorsPolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<CorsPolicyNotFoundException>()(
    "CorsPolicyNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()("InternalServerError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PolicyNotFoundException>()("PolicyNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type ContainerName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type TagList = Tag[];
export interface CreateContainerInput {
  ContainerName: string;
  Tags?: Tag[];
}
export type Endpoint = string;
export type ContainerARN = string;
export type ContainerStatus = "ACTIVE" | "CREATING" | "DELETING" | (string & {});
export type ContainerAccessLoggingEnabled = boolean;
export interface Container {
  Endpoint?: string;
  CreationTime?: Date;
  ARN?: string;
  Name?: string;
  Status?: ContainerStatus;
  AccessLoggingEnabled?: boolean;
}
export interface CreateContainerOutput {
  Container: Container;
}
export interface DeleteContainerInput {
  ContainerName: string;
}
export interface DeleteContainerOutput {}
export interface DeleteContainerPolicyInput {
  ContainerName: string;
}
export interface DeleteContainerPolicyOutput {}
export interface DeleteCorsPolicyInput {
  ContainerName: string;
}
export interface DeleteCorsPolicyOutput {}
export interface DeleteLifecyclePolicyInput {
  ContainerName: string;
}
export interface DeleteLifecyclePolicyOutput {}
export interface DeleteMetricPolicyInput {
  ContainerName: string;
}
export interface DeleteMetricPolicyOutput {}
export interface DescribeContainerInput {
  ContainerName?: string;
}
export interface DescribeContainerOutput {
  Container?: Container;
}
export interface GetContainerPolicyInput {
  ContainerName: string;
}
export type ContainerPolicy = string;
export interface GetContainerPolicyOutput {
  Policy: string;
}
export interface GetCorsPolicyInput {
  ContainerName: string;
}
export type Origin = string;
export type AllowedOrigins = string[];
export type MethodName = "PUT" | "GET" | "DELETE" | "HEAD" | (string & {});
export type AllowedMethods = MethodName[];
export type Header = string;
export type AllowedHeaders = string[];
export type MaxAgeSeconds = number;
export type ExposeHeaders = string[];
export interface CorsRule {
  AllowedOrigins: string[];
  AllowedMethods?: MethodName[];
  AllowedHeaders: string[];
  MaxAgeSeconds?: number;
  ExposeHeaders?: string[];
}
export type CorsPolicy = CorsRule[];
export interface GetCorsPolicyOutput {
  CorsPolicy: CorsRule[];
}
export interface GetLifecyclePolicyInput {
  ContainerName: string;
}
export type LifecyclePolicy = string;
export interface GetLifecyclePolicyOutput {
  LifecyclePolicy: string;
}
export interface GetMetricPolicyInput {
  ContainerName: string;
}
export type ContainerLevelMetrics = "ENABLED" | "DISABLED" | (string & {});
export type ObjectGroup = string;
export type ObjectGroupName = string;
export interface MetricPolicyRule {
  ObjectGroup: string;
  ObjectGroupName: string;
}
export type MetricPolicyRules = MetricPolicyRule[];
export interface MetricPolicy {
  ContainerLevelMetrics: ContainerLevelMetrics;
  MetricPolicyRules?: MetricPolicyRule[];
}
export interface GetMetricPolicyOutput {
  MetricPolicy: MetricPolicy;
}
export type PaginationToken = string;
export type ContainerListLimit = number;
export interface ListContainersInput {
  NextToken?: string;
  MaxResults?: number;
}
export type ContainerList = Container[];
export interface ListContainersOutput {
  Containers: Container[];
  NextToken?: string;
}
export interface ListTagsForResourceInput {
  Resource: string;
}
export interface ListTagsForResourceOutput {
  Tags?: Tag[];
}
export interface PutContainerPolicyInput {
  ContainerName: string;
  Policy: string;
}
export interface PutContainerPolicyOutput {}
export interface PutCorsPolicyInput {
  ContainerName: string;
  CorsPolicy: CorsRule[];
}
export interface PutCorsPolicyOutput {}
export interface PutLifecyclePolicyInput {
  ContainerName: string;
  LifecyclePolicy: string;
}
export interface PutLifecyclePolicyOutput {}
export interface PutMetricPolicyInput {
  ContainerName: string;
  MetricPolicy: MetricPolicy;
}
export interface PutMetricPolicyOutput {}
export interface StartAccessLoggingInput {
  ContainerName: string;
}
export interface StartAccessLoggingOutput {}
export interface StopAccessLoggingInput {
  ContainerName: string;
}
export interface StopAccessLoggingOutput {}
export interface TagResourceInput {
  Resource: string;
  Tags: Tag[];
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  Resource: string;
  TagKeys: string[];
}
export interface UntagResourceOutput {}
export type ErrorMessage = string;
export type CreateContainerError =
  | ContainerInUseException
  | InternalServerError
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a storage container to hold objects. A container is similar to a bucket in
 * the Amazon S3 service.
 */
export const createContainer: API.OperationMethod<
  CreateContainerInput,
  CreateContainerOutput,
  CreateContainerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c20, 0) as any as S.Schema<CreateContainerInput>,
  output: __S(81, __c20, 1) as any as S.Schema<CreateContainerOutput>,
  errors: [ContainerInUseException, InternalServerError, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainer",
}));

export type DeleteContainerError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Deletes the specified container. Before you make a `DeleteContainer`
 * request, delete any objects in the container or in any folders in the container. You can
 * delete only empty containers.
 */
export const deleteContainer: API.OperationMethod<
  DeleteContainerInput,
  DeleteContainerOutput,
  DeleteContainerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(92, __c23, 0) as any as S.Schema<DeleteContainerInput>,
  output: __S(96, __c24, 0) as any as S.Schema<DeleteContainerOutput>,
  errors: [ContainerInUseException, ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainer",
}));

export type DeleteContainerPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Deletes the access policy that is associated with the specified container.
 */
export const deleteContainerPolicy: API.OperationMethod<
  DeleteContainerPolicyInput,
  DeleteContainerPolicyOutput,
  DeleteContainerPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(100, __c25, 0) as any as S.Schema<DeleteContainerPolicyInput>,
  output: __S(96, __c24, 0) as any as S.Schema<DeleteContainerPolicyOutput>,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerPolicy",
}));

export type DeleteCorsPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | CorsPolicyNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Deletes the cross-origin resource sharing (CORS) configuration information that is
 * set for the container.
 *
 * To use this operation, you must have permission to perform the
 * `MediaStore:DeleteCorsPolicy` action. The container owner has this permission
 * by default and can grant this permission to others.
 */
export const deleteCorsPolicy: API.OperationMethod<
  DeleteCorsPolicyInput,
  DeleteCorsPolicyOutput,
  DeleteCorsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c26, 0) as any as S.Schema<DeleteCorsPolicyInput>,
  output: __S(96, __c24, 0) as any as S.Schema<DeleteCorsPolicyOutput>,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    CorsPolicyNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCorsPolicy",
}));

export type DeleteLifecyclePolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Removes an object lifecycle policy from a container. It takes up to 20 minutes for the change to take effect.
 */
export const deleteLifecyclePolicy: API.OperationMethod<
  DeleteLifecyclePolicyInput,
  DeleteLifecyclePolicyOutput,
  DeleteLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteLifecyclePolicyInput>,
  output: __S(96, __c24, 0) as any as S.Schema<DeleteLifecyclePolicyOutput>,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLifecyclePolicy",
}));

export type DeleteMetricPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Deletes the metric policy that is associated with the specified container. If there is no metric policy associated with the container, MediaStore doesn't send metrics to CloudWatch.
 */
export const deleteMetricPolicy: API.OperationMethod<
  DeleteMetricPolicyInput,
  DeleteMetricPolicyOutput,
  DeleteMetricPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<DeleteMetricPolicyInput>,
  output: __S(96, __c24, 0) as any as S.Schema<DeleteMetricPolicyOutput>,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetricPolicy",
}));

export type DescribeContainerError =
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the properties of the requested container. This request is commonly used to
 * retrieve the endpoint of a container. An endpoint is a value assigned by the service when a
 * new container is created. A container's endpoint does not change after it has been
 * assigned. The `DescribeContainer` request returns a single
 * `Container` object based on `ContainerName`. To return all
 * `Container` objects that are associated with a specified AWS account, use
 * ListContainers.
 */
export const describeContainer: API.OperationMethod<
  DescribeContainerInput,
  DescribeContainerOutput,
  DescribeContainerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<DescribeContainerInput>,
  output: __S(9, __c2, 1) as any as S.Schema<DescribeContainerOutput>,
  errors: [ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainer",
}));

export type GetContainerPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Retrieves the access policy for the specified container. For information about the
 * data that is included in an access policy, see the AWS Identity and Access Management User
 * Guide.
 */
export const getContainerPolicy: API.OperationMethod<
  GetContainerPolicyInput,
  GetContainerPolicyOutput,
  GetContainerPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<GetContainerPolicyInput>,
  output: __S(13, __c3, 1) as any as S.Schema<GetContainerPolicyOutput>,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerPolicy",
}));

export type GetCorsPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | CorsPolicyNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Returns the cross-origin resource sharing (CORS) configuration information that is
 * set for the container.
 *
 * To use this operation, you must have permission to perform the
 * `MediaStore:GetCorsPolicy` action. By default, the container owner has this
 * permission and can grant it to others.
 */
export const getCorsPolicy: API.OperationMethod<
  GetCorsPolicyInput,
  GetCorsPolicyOutput,
  GetCorsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c4, 0) as any as S.Schema<GetCorsPolicyInput>,
  output: __S(17, __c4, 1) as any as S.Schema<GetCorsPolicyOutput>,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    CorsPolicyNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCorsPolicy",
}));

export type GetLifecyclePolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Retrieves the object lifecycle policy that is assigned to a container.
 */
export const getLifecyclePolicy: API.OperationMethod<
  GetLifecyclePolicyInput,
  GetLifecyclePolicyOutput,
  GetLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(28, __c7, 0) as any as S.Schema<GetLifecyclePolicyInput>,
  output: __S(29, __c7, 1) as any as S.Schema<GetLifecyclePolicyOutput>,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLifecyclePolicy",
}));

export type GetMetricPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Returns the metric policy for the specified container.
 */
export const getMetricPolicy: API.OperationMethod<
  GetMetricPolicyInput,
  GetMetricPolicyOutput,
  GetMetricPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<GetMetricPolicyInput>,
  output: __S(33, __c8, 1) as any as S.Schema<GetMetricPolicyOutput>,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricPolicy",
}));

export type ListContainersError = InternalServerError | CommonErrors;
/**
 * Lists the properties of all containers in AWS Elemental MediaStore.
 *
 * You can query to receive all the containers in one response. Or you can include the
 * `MaxResults` parameter to receive a limited number of containers in each
 * response. In this case, the response includes a token. To get the next set of containers,
 * send the command again, this time with the `NextToken` parameter (with the
 * returned token as its value). The next set of responses appears, with a token if there are
 * still more containers to receive.
 *
 * See also DescribeContainer, which gets the properties of one
 * container.
 */
export const listContainers: API.PaginatedOperationMethod<
  ListContainersInput,
  ListContainersOutput,
  ListContainersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(40, __c10, 0) as any as S.Schema<ListContainersInput>,
  output: __S(42, __c10, 2) as any as S.Schema<ListContainersOutput>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Returns a list of the tags assigned to the specified container.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(44, __c11, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(45, __c11, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [ContainerInUseException, ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutContainerPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Creates an access policy for the specified container to restrict the users and
 * clients that can access it. For information about the data that is included in an access
 * policy, see the AWS Identity and
 * Access Management User Guide.
 *
 * For this release of the REST API, you can create only one policy for a container. If
 * you enter `PutContainerPolicy` twice, the second command modifies the existing
 * policy.
 */
export const putContainerPolicy: API.OperationMethod<
  PutContainerPolicyInput,
  PutContainerPolicyOutput,
  PutContainerPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c12, 0) as any as S.Schema<PutContainerPolicyInput>,
  output: __S(96, __c24, 0) as any as S.Schema<PutContainerPolicyOutput>,
  errors: [ContainerInUseException, ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutContainerPolicy",
}));

export type PutCorsPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Sets the cross-origin resource sharing (CORS) configuration on a container so that
 * the container can service cross-origin requests. For example, you might want to enable a
 * request whose origin is http://www.example.com to access your AWS Elemental MediaStore
 * container at my.example.container.com by using the browser's XMLHttpRequest
 * capability.
 *
 * To enable CORS on a container, you attach a CORS policy to the container. In the CORS
 * policy, you configure rules that identify origins and the HTTP methods that can be executed
 * on your container. The policy can contain up to 398,000 characters. You can add up to 100
 * rules to a CORS policy. If more than one rule applies, the service uses the first
 * applicable rule listed.
 *
 * To learn more about CORS, see Cross-Origin Resource Sharing (CORS) in AWS Elemental MediaStore.
 */
export const putCorsPolicy: API.OperationMethod<
  PutCorsPolicyInput,
  PutCorsPolicyOutput,
  PutCorsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(52, __c13, 0) as any as S.Schema<PutCorsPolicyInput>,
  output: __S(96, __c24, 0) as any as S.Schema<PutCorsPolicyOutput>,
  errors: [ContainerInUseException, ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCorsPolicy",
}));

export type PutLifecyclePolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Writes an object lifecycle policy to a container. If the container already has an object lifecycle policy, the service replaces the existing policy with the new policy. It takes up to 20 minutes for the change to take effect.
 *
 * For information about how to construct an object lifecycle policy, see Components of an Object Lifecycle Policy.
 */
export const putLifecyclePolicy: API.OperationMethod<
  PutLifecyclePolicyInput,
  PutLifecyclePolicyOutput,
  PutLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c14, 0) as any as S.Schema<PutLifecyclePolicyInput>,
  output: __S(96, __c24, 0) as any as S.Schema<PutLifecyclePolicyOutput>,
  errors: [ContainerInUseException, ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLifecyclePolicy",
}));

export type PutMetricPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * The metric policy that you want to add to the container. A metric policy allows AWS Elemental MediaStore to send metrics to Amazon CloudWatch. It takes up to 20 minutes for the new policy to take effect.
 */
export const putMetricPolicy: API.OperationMethod<
  PutMetricPolicyInput,
  PutMetricPolicyOutput,
  PutMetricPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(60, __c15, 0) as any as S.Schema<PutMetricPolicyInput>,
  output: __S(96, __c24, 0) as any as S.Schema<PutMetricPolicyOutput>,
  errors: [ContainerInUseException, ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricPolicy",
}));

export type StartAccessLoggingError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Starts access logging on the specified container. When you enable access logging on a container, MediaStore delivers access logs for objects stored in that container to Amazon CloudWatch Logs.
 */
export const startAccessLogging: API.OperationMethod<
  StartAccessLoggingInput,
  StartAccessLoggingOutput,
  StartAccessLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c16, 0) as any as S.Schema<StartAccessLoggingInput>,
  output: __S(96, __c24, 0) as any as S.Schema<StartAccessLoggingOutput>,
  errors: [ContainerInUseException, ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAccessLogging",
}));

export type StopAccessLoggingError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Stops access logging on the specified container. When you stop access logging on a container, MediaStore stops sending access logs to Amazon CloudWatch Logs. These access logs are not saved and are not retrievable.
 */
export const stopAccessLogging: API.OperationMethod<
  StopAccessLoggingInput,
  StopAccessLoggingOutput,
  StopAccessLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(68, __c17, 0) as any as S.Schema<StopAccessLoggingInput>,
  output: __S(96, __c24, 0) as any as S.Schema<StopAccessLoggingOutput>,
  errors: [ContainerInUseException, ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAccessLogging",
}));

export type TagResourceError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Adds tags to the specified AWS Elemental MediaStore container. Tags are key:value pairs that you can associate with AWS resources. For example, the
 * tag key might be "customer" and the tag value might be "companyA." You can specify one or more tags to add to each container. You can add up to 50
 * tags to each container. For more information about tagging, including naming and usage conventions, see Tagging Resources in MediaStore.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c18, 0) as any as S.Schema<TagResourceInput>,
  output: __S(96, __c24, 0) as any as S.Schema<TagResourceOutput>,
  errors: [ContainerInUseException, ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Removes tags from the specified container. You can specify one or more tags to remove.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(76, __c19, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(96, __c24, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [ContainerInUseException, ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLifecyclePolicyInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMetricPolicyInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeContainerInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Container: S.optional(__S(84, __c21, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeContainerOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetContainerPolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ Policy: S.String }).pipe(ns)).annotate({
        identifier: "GetContainerPolicyOutput",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCorsPolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ CorsPolicy: __S(22, __c5, 2) }).pipe(ns)).annotate({
        identifier: "GetCorsPolicyOutput",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          AllowedOrigins: __S(24, __c6, 0),
          AllowedMethods: S.optional(__S(20, __c5, 0)),
          AllowedHeaders: __S(24, __c6, 0),
          MaxAgeSeconds: S.optional(S.Number),
          ExposeHeaders: S.optional(__S(24, __c6, 0)),
        }),
      ).annotate({ identifier: "CorsRule" });
    case 2:
      return S.Array(__S(21, __c5, 1));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLifecyclePolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ LifecyclePolicy: S.String }).pipe(ns)).annotate({
        identifier: "GetLifecyclePolicyOutput",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMetricPolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ MetricPolicy: __S(38, __c9, 2) }).pipe(ns)).annotate({
        identifier: "GetMetricPolicyOutput",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ObjectGroup: S.String, ObjectGroupName: S.String }),
      ).annotate({ identifier: "MetricPolicyRule" });
    case 1:
      return S.Array(__S(36, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ContainerLevelMetrics: S.String,
          MetricPolicyRules: S.optional(__S(37, __c9, 1)),
        }),
      ).annotate({ identifier: "MetricPolicy" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListContainersInput" });
    case 1:
      return S.Array(__S(84, __c21, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Containers: __S(41, __c10, 1), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListContainersOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Resource: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(89, __c22, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String, Policy: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutContainerPolicyInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String, CorsPolicy: __S(22, __c5, 2) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutCorsPolicyInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String, LifecyclePolicy: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutLifecyclePolicyInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String, MetricPolicy: __S(38, __c9, 2) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutMetricPolicyInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartAccessLoggingInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopAccessLoggingInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Resource: S.String, Tags: __S(89, __c22, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Resource: S.String, TagKeys: __S(24, __c6, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String, Tags: S.optional(__S(89, __c22, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateContainerInput" });
    case 1:
      return S.suspend(() => S.Struct({ Container: __S(84, __c21, 0) }).pipe(ns)).annotate({
        identifier: "CreateContainerOutput",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Endpoint: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ARN: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          AccessLoggingEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Container" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(88, __c22, 0));
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteContainerInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteContainerOutput",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteContainerPolicyInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCorsPolicyInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
