import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "MediaStore",
  target: "MediaStore_20170901",
  version: "2017-09-01",
  sigv4: "mediastore",
  protocol: awsJson1_1Protocol,
  xmlns: "https://mediastore.amazonaws.com/doc/2017-09-01",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mediastore.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://mediastore.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ContainerInUseException
  extends /*@__PURE__*/ TE.TaggedError("ContainerInUseException")<{
    readonly message?: string;
  }> {}
export class ContainerNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ContainerNotFoundException")<{
    readonly message?: string;
  }> {}
export class CorsPolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("CorsPolicyNotFoundException")<{
    readonly message?: string;
  }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class PolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("PolicyNotFoundException")<{
    readonly message?: string;
  }> {}
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
export type ContainerStatus =
  | "ACTIVE"
  | "CREATING"
  | "DELETING"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: { ContainerName: 0, Tags: D.list(i_Tag) },
    output: { Container: o_Container },
  },
  errors: [
    ContainerInUseException,
    InternalServerError,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainer",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainer",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerPolicy",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    CorsPolicyNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCorsPolicy",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLifecyclePolicy",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetricPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ContainerName: 0 },
    output: { Container: o_Container },
  },
  errors: [ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainer",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerPolicy",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    CorsPolicyNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCorsPolicy",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLifecyclePolicy",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { Containers: D.list(o_Container) },
  },
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
  descriptor: { service: svc, input: { Resource: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0, Policy: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutContainerPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ContainerName: 0,
      CorsPolicy: D.list({
        AllowedOrigins: 0,
        AllowedMethods: 0,
        AllowedHeaders: 0,
        MaxAgeSeconds: 0,
        ExposeHeaders: 0,
      }),
    },
  },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCorsPolicy",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0, LifecyclePolicy: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLifecyclePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ContainerName: 0,
      MetricPolicy: {
        ContainerLevelMetrics: 0,
        MetricPolicyRules: D.list({ ObjectGroup: 0, ObjectGroupName: 0 }),
      },
    },
  },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricPolicy",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAccessLogging",
})) as any;

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
  descriptor: { service: svc, input: { ContainerName: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAccessLogging",
})) as any;

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
  descriptor: { service: svc, input: { Resource: 0, Tags: D.list(i_Tag) } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: { service: svc, input: { Resource: 0, TagKeys: 0 } },
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Container: D.LazyStruct = () => ({ CreationTime: D.ts });
