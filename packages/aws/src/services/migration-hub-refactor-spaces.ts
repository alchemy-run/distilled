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
  sdkId: "Migration Hub Refactor Spaces",
  target: "RefactorSpaces",
  version: "2021-10-26",
  sigv4: "refactor-spaces",
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
                `https://refactor-spaces-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://refactor-spaces-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://refactor-spaces.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://refactor-spaces.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class InvalidResourcePolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidResourcePolicyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
    readonly QuotaCode?: string;
    readonly ServiceCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly QuotaCode?: string;
    readonly ServiceCode?: string;
    readonly RetryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type ApplicationName = string;
export type EnvironmentId = string;
export type VpcId = string;
export type ProxyType = string;
export type ApiGatewayEndpointType = string;
export type StageName = string;
export interface ApiGatewayProxyInput {
  EndpointType?: string;
  StageName?: string;
}
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export interface CreateApplicationRequest {
  Name: string;
  EnvironmentIdentifier: string;
  VpcId: string;
  ProxyType: string;
  ApiGatewayProxy?: ApiGatewayProxyInput;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export type ResourceArn = string;
export type AccountId = string;
export type ApplicationId = string;
export type ApplicationState = string;
export interface CreateApplicationResponse {
  Name?: string;
  Arn?: string;
  OwnerAccountId?: string;
  CreatedByAccountId?: string;
  ApplicationId?: string;
  EnvironmentId?: string;
  VpcId?: string;
  ProxyType?: string;
  ApiGatewayProxy?: ApiGatewayProxyInput;
  State?: string;
  Tags?: { [key: string]: string | undefined };
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export type EnvironmentName = string;
export type Description = string;
export type NetworkFabricType = string;
export interface CreateEnvironmentRequest {
  Name: string;
  Description?: string;
  NetworkFabricType: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export type EnvironmentState = string;
export interface CreateEnvironmentResponse {
  Name?: string;
  Arn?: string;
  Description?: string;
  EnvironmentId?: string;
  NetworkFabricType?: string;
  OwnerAccountId?: string;
  State?: string;
  Tags?: { [key: string]: string | undefined };
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export type ServiceId = string;
export type RouteType = string;
export type RouteActivationState = string;
export interface DefaultRouteInput {
  ActivationState?: string;
}
export type UriPath = string;
export type HttpMethod = string;
export type HttpMethods = string[];
export interface UriPathRouteInput {
  SourcePath: string;
  ActivationState: string;
  Methods?: string[];
  IncludeChildPaths?: boolean;
  AppendSourcePath?: boolean;
}
export interface CreateRouteRequest {
  EnvironmentIdentifier: string;
  ApplicationIdentifier: string;
  ServiceIdentifier: string;
  RouteType: string;
  DefaultRoute?: DefaultRouteInput;
  UriPathRoute?: UriPathRouteInput;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export type RouteId = string;
export type RouteState = string;
export interface CreateRouteResponse {
  RouteId?: string;
  Arn?: string;
  OwnerAccountId?: string;
  CreatedByAccountId?: string;
  RouteType?: string;
  ServiceId?: string;
  ApplicationId?: string;
  UriPathRoute?: UriPathRouteInput;
  State?: string;
  Tags?: { [key: string]: string | undefined };
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export type ServiceName = string;
export type ServiceEndpointType = string;
export type Uri = string;
export interface UrlEndpointInput {
  Url: string;
  HealthUrl?: string;
}
export type LambdaArn = string;
export interface LambdaEndpointInput {
  Arn: string;
}
export interface CreateServiceRequest {
  Name: string;
  Description?: string;
  EnvironmentIdentifier: string;
  ApplicationIdentifier: string;
  VpcId?: string;
  EndpointType: string;
  UrlEndpoint?: UrlEndpointInput;
  LambdaEndpoint?: LambdaEndpointInput;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export type ServiceState = string;
export interface CreateServiceResponse {
  ServiceId?: string;
  Name?: string;
  Arn?: string;
  OwnerAccountId?: string;
  CreatedByAccountId?: string;
  Description?: string;
  EnvironmentId?: string;
  ApplicationId?: string;
  VpcId?: string;
  EndpointType?: string;
  UrlEndpoint?: UrlEndpointInput;
  LambdaEndpoint?: LambdaEndpointInput;
  State?: string;
  Tags?: { [key: string]: string | undefined };
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export interface DeleteApplicationRequest {
  EnvironmentIdentifier: string;
  ApplicationIdentifier: string;
}
export interface DeleteApplicationResponse {
  Name?: string;
  Arn?: string;
  ApplicationId?: string;
  EnvironmentId?: string;
  State?: string;
  LastUpdatedTime?: Date;
}
export interface DeleteEnvironmentRequest {
  EnvironmentIdentifier: string;
}
export interface DeleteEnvironmentResponse {
  Name?: string;
  Arn?: string;
  EnvironmentId?: string;
  State?: string;
  LastUpdatedTime?: Date;
}
export type ResourcePolicyIdentifier = string;
export interface DeleteResourcePolicyRequest {
  Identifier: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteRouteRequest {
  EnvironmentIdentifier: string;
  ApplicationIdentifier: string;
  RouteIdentifier: string;
}
export interface DeleteRouteResponse {
  RouteId?: string;
  Arn?: string;
  ServiceId?: string;
  ApplicationId?: string;
  State?: string;
  LastUpdatedTime?: Date;
}
export interface DeleteServiceRequest {
  EnvironmentIdentifier: string;
  ApplicationIdentifier: string;
  ServiceIdentifier: string;
}
export interface DeleteServiceResponse {
  ServiceId?: string;
  Name?: string;
  Arn?: string;
  EnvironmentId?: string;
  ApplicationId?: string;
  State?: string;
  LastUpdatedTime?: Date;
}
export interface GetApplicationRequest {
  EnvironmentIdentifier: string;
  ApplicationIdentifier: string;
}
export type ApiGatewayId = string;
export type VpcLinkId = string;
export type NlbArn = string;
export type NlbName = string;
export interface ApiGatewayProxyConfig {
  ProxyUrl?: string;
  ApiGatewayId?: string;
  VpcLinkId?: string;
  NlbArn?: string;
  NlbName?: string;
  EndpointType?: string;
  StageName?: string;
}
export type ErrorCode = string;
export type ErrorMessage = string;
export type ResourceIdentifier = string;
export type ErrorResourceType = string;
export type AdditionalDetailsKey = string;
export type AdditionalDetailsValue = string;
export type AdditionalDetails = { [key: string]: string | undefined };
export interface ErrorResponse {
  Code?: string;
  Message?: string;
  AccountId?: string;
  ResourceIdentifier?: string;
  ResourceType?: string;
  AdditionalDetails?: { [key: string]: string | undefined };
}
export interface GetApplicationResponse {
  Name?: string;
  Arn?: string;
  OwnerAccountId?: string;
  CreatedByAccountId?: string;
  ApplicationId?: string;
  EnvironmentId?: string;
  VpcId?: string;
  ProxyType?: string;
  ApiGatewayProxy?: ApiGatewayProxyConfig;
  State?: string;
  Tags?: { [key: string]: string | undefined };
  Error?: ErrorResponse;
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export interface GetEnvironmentRequest {
  EnvironmentIdentifier: string;
}
export type TransitGatewayId = string;
export interface GetEnvironmentResponse {
  Name?: string;
  Arn?: string;
  Description?: string;
  EnvironmentId?: string;
  NetworkFabricType?: string;
  OwnerAccountId?: string;
  TransitGatewayId?: string;
  State?: string;
  Tags?: { [key: string]: string | undefined };
  Error?: ErrorResponse;
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export interface GetResourcePolicyRequest {
  Identifier: string;
}
export type PolicyString = string;
export interface GetResourcePolicyResponse {
  Policy?: string;
}
export interface GetRouteRequest {
  EnvironmentIdentifier: string;
  ApplicationIdentifier: string;
  RouteIdentifier: string;
}
export type PathResourceToIdKey = string;
export type PathResourceToIdValue = string;
export type PathResourceToId = { [key: string]: string | undefined };
export interface GetRouteResponse {
  RouteId?: string;
  Arn?: string;
  OwnerAccountId?: string;
  CreatedByAccountId?: string;
  RouteType?: string;
  ServiceId?: string;
  ApplicationId?: string;
  EnvironmentId?: string;
  SourcePath?: string;
  Methods?: string[];
  IncludeChildPaths?: boolean;
  PathResourceToId?: { [key: string]: string | undefined };
  State?: string;
  Tags?: { [key: string]: string | undefined };
  Error?: ErrorResponse;
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
  AppendSourcePath?: boolean;
}
export interface GetServiceRequest {
  EnvironmentIdentifier: string;
  ApplicationIdentifier: string;
  ServiceIdentifier: string;
}
export interface UrlEndpointConfig {
  Url?: string;
  HealthUrl?: string;
}
export interface LambdaEndpointConfig {
  Arn?: string;
}
export interface GetServiceResponse {
  ServiceId?: string;
  Name?: string;
  Arn?: string;
  OwnerAccountId?: string;
  CreatedByAccountId?: string;
  Description?: string;
  EnvironmentId?: string;
  ApplicationId?: string;
  VpcId?: string;
  EndpointType?: string;
  UrlEndpoint?: UrlEndpointConfig;
  LambdaEndpoint?: LambdaEndpointConfig;
  State?: string;
  Tags?: { [key: string]: string | undefined };
  Error?: ErrorResponse;
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListApplicationsRequest {
  EnvironmentIdentifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ApiGatewayProxySummary {
  ProxyUrl?: string;
  ApiGatewayId?: string;
  VpcLinkId?: string;
  NlbArn?: string;
  NlbName?: string;
  EndpointType?: string;
  StageName?: string;
}
export interface ApplicationSummary {
  Name?: string;
  Arn?: string;
  OwnerAccountId?: string;
  CreatedByAccountId?: string;
  ApplicationId?: string;
  EnvironmentId?: string;
  VpcId?: string;
  ProxyType?: string;
  ApiGatewayProxy?: ApiGatewayProxySummary;
  State?: string;
  Tags?: { [key: string]: string | undefined };
  Error?: ErrorResponse;
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export type ApplicationSummaries = ApplicationSummary[];
export interface ListApplicationsResponse {
  ApplicationSummaryList?: ApplicationSummary[];
  NextToken?: string;
}
export interface ListEnvironmentsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface EnvironmentSummary {
  Name?: string;
  Arn?: string;
  Description?: string;
  EnvironmentId?: string;
  NetworkFabricType?: string;
  OwnerAccountId?: string;
  TransitGatewayId?: string;
  State?: string;
  Tags?: { [key: string]: string | undefined };
  Error?: ErrorResponse;
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export type EnvironmentSummaries = EnvironmentSummary[];
export interface ListEnvironmentsResponse {
  EnvironmentSummaryList?: EnvironmentSummary[];
  NextToken?: string;
}
export interface ListEnvironmentVpcsRequest {
  EnvironmentIdentifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export type CidrBlock = string;
export type CidrBlocks = string[];
export type Ec2TagValue = string;
export interface EnvironmentVpc {
  EnvironmentId?: string;
  VpcId?: string;
  AccountId?: string;
  CidrBlocks?: string[];
  VpcName?: string;
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export type EnvironmentVpcs = EnvironmentVpc[];
export interface ListEnvironmentVpcsResponse {
  EnvironmentVpcList?: EnvironmentVpc[];
  NextToken?: string;
}
export interface ListRoutesRequest {
  EnvironmentIdentifier: string;
  ApplicationIdentifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface RouteSummary {
  RouteId?: string;
  Arn?: string;
  OwnerAccountId?: string;
  CreatedByAccountId?: string;
  RouteType?: string;
  ServiceId?: string;
  ApplicationId?: string;
  EnvironmentId?: string;
  SourcePath?: string;
  Methods?: string[];
  IncludeChildPaths?: boolean;
  PathResourceToId?: { [key: string]: string | undefined };
  State?: string;
  Tags?: { [key: string]: string | undefined };
  Error?: ErrorResponse;
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
  AppendSourcePath?: boolean;
}
export type RouteSummaries = RouteSummary[];
export interface ListRoutesResponse {
  RouteSummaryList?: RouteSummary[];
  NextToken?: string;
}
export interface ListServicesRequest {
  EnvironmentIdentifier: string;
  ApplicationIdentifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface UrlEndpointSummary {
  Url?: string;
  HealthUrl?: string;
}
export interface LambdaEndpointSummary {
  Arn?: string;
}
export interface ServiceSummary {
  ServiceId?: string;
  Name?: string;
  Arn?: string;
  OwnerAccountId?: string;
  CreatedByAccountId?: string;
  Description?: string;
  EnvironmentId?: string;
  ApplicationId?: string;
  VpcId?: string;
  EndpointType?: string;
  UrlEndpoint?: UrlEndpointSummary;
  LambdaEndpoint?: LambdaEndpointSummary;
  State?: string;
  Tags?: { [key: string]: string | undefined };
  Error?: ErrorResponse;
  LastUpdatedTime?: Date;
  CreatedTime?: Date;
}
export type ServiceSummaries = ServiceSummary[];
export interface ListServicesResponse {
  ServiceSummaryList?: ServiceSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export interface PutResourcePolicyResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateRouteRequest {
  EnvironmentIdentifier: string;
  ApplicationIdentifier: string;
  RouteIdentifier: string;
  ActivationState: string;
}
export interface UpdateRouteResponse {
  RouteId?: string;
  Arn?: string;
  ServiceId?: string;
  ApplicationId?: string;
  State?: string;
  LastUpdatedTime?: Date;
}
export type RetryAfterSeconds = number;
export type CreateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Web Services Migration Hub Refactor Spaces application. The account that owns the environment also owns the
 * applications created inside the environment, regardless of the account that creates the
 * application. Refactor Spaces provisions an Amazon API Gateway, API Gateway VPC link, and
 * Network Load Balancer for the application proxy inside your account.
 *
 * In environments created with a CreateEnvironment:NetworkFabricType of `NONE` you need to configure
 * VPC to VPC connectivity between your service VPC and the application proxy VPC to
 * route traffic through the application proxy to a service with a private URL endpoint. For more
 * information, see
 * Create an application in the *Refactor Spaces User Guide*.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /environments/{EnvironmentIdentifier}/applications",
    input: {
      Name: 0,
      EnvironmentIdentifier: 0,
      VpcId: 0,
      ProxyType: 0,
      ApiGatewayProxy: { EndpointType: 0, StageName: 0 },
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { LastUpdatedTime: D.ts, CreatedTime: D.ts },
    body: true,
  },
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
  operationName: "CreateApplication",
})) as any;

export type CreateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Web Services Migration Hub Refactor Spaces environment. The caller owns the environment resource, and all
 * Refactor Spaces applications, services, and routes created within the environment. They are referred
 * to as the *environment owner*. The environment owner has cross-account
 * visibility and control of Refactor Spaces resources that are added to the environment by other
 * accounts that the environment is shared with.
 *
 * When creating an environment with a CreateEnvironment:NetworkFabricType of `TRANSIT_GATEWAY`, Refactor Spaces
 * provisions a transit gateway to enable services in VPCs to communicate directly across
 * accounts. If CreateEnvironment:NetworkFabricType is `NONE`, Refactor Spaces does not create
 * a transit gateway and you must use your network infrastructure to route traffic to services
 * with private URL endpoints.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /environments",
    input: {
      Name: 0,
      Description: 0,
      NetworkFabricType: 0,
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { LastUpdatedTime: D.ts, CreatedTime: D.ts },
    body: true,
  },
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
  operationName: "CreateEnvironment",
})) as any;

export type CreateRouteError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Web Services Migration Hub Refactor Spaces route. The account owner of the service resource is always the
 * environment owner, regardless of which account creates the route. Routes target a service in
 * the application. If an application does not have any routes, then the first route must be
 * created as a `DEFAULT`
 * `RouteType`.
 *
 * When created, the default route defaults to an active state so state is not a required
 * input. However, like all other state values the state of the default route can be updated
 * after creation, but only when all other routes are also inactive. Conversely, no route can be
 * active without the default route also being active.
 *
 * When you create a route, Refactor Spaces configures the Amazon API Gateway to send traffic
 * to the target service as follows:
 *
 * - **URL Endpoints**
 *
 * If the service has a URL endpoint, and the endpoint resolves to a private IP address,
 * Refactor Spaces routes traffic using the API Gateway VPC link. If a service endpoint
 * resolves to a public IP address, Refactor Spaces routes traffic over the public internet.
 * Services can have HTTP or HTTPS URL endpoints. For HTTPS URLs, publicly-signed
 * certificates are supported. Private Certificate Authorities (CAs) are permitted only if
 * the CA's domain is also publicly resolvable.
 *
 * Refactor Spaces automatically resolves the public Domain Name System (DNS) names that are
 * set in `CreateService:UrlEndpoint `when you create a service. The DNS names
 * resolve when the DNS time-to-live (TTL) expires, or every 60 seconds for TTLs less than 60
 * seconds. This periodic DNS resolution ensures that the route configuration remains
 * up-to-date.
 *
 * **One-time health check**
 *
 * A one-time health check is performed on the service when either the route is updated
 * from inactive to active, or when it is created with an active state. If the health check
 * fails, the route transitions the route state to `FAILED`, an error code of
 * `SERVICE_ENDPOINT_HEALTH_CHECK_FAILURE` is provided, and no traffic is sent
 * to the service.
 *
 * For private URLs, a target group is created on the Network Load Balancer and the load
 * balancer target group runs default target health checks. By default, the health check is
 * run against the service endpoint URL. Optionally, the health check can be performed
 * against a different protocol, port, and/or path using the CreateService:UrlEndpoint parameter. All other health check settings for the
 * load balancer use the default values described in the Health
 * checks for your target groups in the Elastic Load Balancing
 * guide. The health check is considered successful if at least one target
 * within the target group transitions to a healthy state.
 *
 * - **Lambda function endpoints**
 *
 * If the service has an Lambda function endpoint, then Refactor Spaces
 * configures the Lambda function's resource policy to allow the application's
 * API Gateway to invoke the function.
 *
 * The Lambda function state is checked. If the function is not active, the
 * function configuration is updated so that Lambda resources are provisioned. If
 * the Lambda state is `Failed`, then the route creation fails. For
 * more information, see the GetFunctionConfiguration's State response parameter in the *Lambda Developer Guide*.
 *
 * A check is performed to determine that a Lambda function with the specified ARN
 * exists. If it does not exist, the health check fails. For public URLs, a connection is
 * opened to the public endpoint. If the URL is not reachable, the health check fails.
 *
 * **Environments without a network bridge**
 *
 * When you create environments without a network bridge (CreateEnvironment:NetworkFabricType is `NONE)` and you use your own
 * networking infrastructure, you need to configure VPC to VPC connectivity between your network and the application proxy VPC. Route
 * creation from the application proxy to service endpoints will fail if your network is not
 * configured to connect to the application proxy VPC. For more information, see Create
 * a route in the *Refactor Spaces User Guide*.
 */
export const createRoute: API.OperationMethod<
  CreateRouteRequest,
  CreateRouteResponse,
  CreateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/routes",
    input: {
      EnvironmentIdentifier: 0,
      ApplicationIdentifier: 0,
      ServiceIdentifier: 0,
      RouteType: 0,
      DefaultRoute: { ActivationState: 0 },
      UriPathRoute: {
        SourcePath: 0,
        ActivationState: 0,
        Methods: 0,
        IncludeChildPaths: 0,
        AppendSourcePath: 0,
      },
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { LastUpdatedTime: D.ts, CreatedTime: D.ts },
    body: true,
  },
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
  operationName: "CreateRoute",
})) as any;

export type CreateServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Web Services Migration Hub Refactor Spaces service. The account owner of the service is always the
 * environment owner, regardless of which account in the environment creates the service.
 * Services have either a URL endpoint in a virtual private cloud (VPC), or a Lambda
 * function endpoint.
 *
 * If an Amazon Web Services resource is launched in a service VPC, and you want it to be
 * accessible to all of an environment’s services with VPCs and routes, apply the
 * `RefactorSpacesSecurityGroup` to the resource. Alternatively, to add more
 * cross-account constraints, apply your own security group.
 */
export const createService: API.OperationMethod<
  CreateServiceRequest,
  CreateServiceResponse,
  CreateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/services",
    input: {
      Name: 0,
      Description: 0,
      EnvironmentIdentifier: 0,
      ApplicationIdentifier: 0,
      VpcId: 0,
      EndpointType: 0,
      UrlEndpoint: { Url: 0, HealthUrl: 0 },
      LambdaEndpoint: { Arn: 0 },
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { LastUpdatedTime: D.ts, CreatedTime: D.ts },
    body: true,
  },
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
  operationName: "CreateService",
})) as any;

export type DeleteApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Web Services Migration Hub Refactor Spaces application. Before you can delete an application, you must first
 * delete any services or routes within the application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}",
    input: { EnvironmentIdentifier: 0, ApplicationIdentifier: 0 },
    output: { LastUpdatedTime: D.ts },
  },
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
  operationName: "DeleteApplication",
})) as any;

export type DeleteEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Web Services Migration Hub Refactor Spaces environment. Before you can delete an environment, you must first
 * delete any applications and services within the environment.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /environments/{EnvironmentIdentifier}",
    input: { EnvironmentIdentifier: 0 },
    output: { LastUpdatedTime: D.ts },
  },
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
  operationName: "DeleteEnvironment",
})) as any;

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource policy set for the environment.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /resourcepolicy/{Identifier}",
    input: { Identifier: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteRouteError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Web Services Migration Hub Refactor Spaces route.
 */
export const deleteRoute: API.OperationMethod<
  DeleteRouteRequest,
  DeleteRouteResponse,
  DeleteRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/routes/{RouteIdentifier}",
    input: {
      EnvironmentIdentifier: 0,
      ApplicationIdentifier: 0,
      RouteIdentifier: 0,
    },
    output: { LastUpdatedTime: D.ts },
  },
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
  operationName: "DeleteRoute",
})) as any;

export type DeleteServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Web Services Migration Hub Refactor Spaces service.
 */
export const deleteService: API.OperationMethod<
  DeleteServiceRequest,
  DeleteServiceResponse,
  DeleteServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/services/{ServiceIdentifier}",
    input: {
      EnvironmentIdentifier: 0,
      ApplicationIdentifier: 0,
      ServiceIdentifier: 0,
    },
    output: { LastUpdatedTime: D.ts },
  },
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
  operationName: "DeleteService",
})) as any;

export type GetApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon Web Services Migration Hub Refactor Spaces application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}",
    input: { EnvironmentIdentifier: 0, ApplicationIdentifier: 0 },
    output: { LastUpdatedTime: D.ts, CreatedTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
})) as any;

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon Web Services Migration Hub Refactor Spaces environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments/{EnvironmentIdentifier}",
    input: { EnvironmentIdentifier: 0 },
    output: { LastUpdatedTime: D.ts, CreatedTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
})) as any;

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the resource-based permission policy that is set for the given environment.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /resourcepolicy/{Identifier}",
    input: { Identifier: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type GetRouteError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon Web Services Migration Hub Refactor Spaces route.
 */
export const getRoute: API.OperationMethod<
  GetRouteRequest,
  GetRouteResponse,
  GetRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/routes/{RouteIdentifier}",
    input: {
      EnvironmentIdentifier: 0,
      ApplicationIdentifier: 0,
      RouteIdentifier: 0,
    },
    output: { LastUpdatedTime: D.ts, CreatedTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoute",
})) as any;

export type GetServiceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon Web Services Migration Hub Refactor Spaces service.
 */
export const getService: API.OperationMethod<
  GetServiceRequest,
  GetServiceResponse,
  GetServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/services/{ServiceIdentifier}",
    input: {
      EnvironmentIdentifier: 0,
      ApplicationIdentifier: 0,
      ServiceIdentifier: 0,
    },
    output: { LastUpdatedTime: D.ts, CreatedTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
})) as any;

export type ListApplicationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the Amazon Web Services Migration Hub Refactor Spaces applications within an environment.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments/{EnvironmentIdentifier}/applications",
    input: {
      EnvironmentIdentifier: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      ApplicationSummaryList: D.list({
        LastUpdatedTime: D.ts,
        CreatedTime: D.ts,
      }),
    },
  },
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
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon Web Services Migration Hub Refactor Spaces environments owned by a caller account or shared with the caller
 * account.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      EnvironmentSummaryList: D.list({
        LastUpdatedTime: D.ts,
        CreatedTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EnvironmentSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEnvironmentVpcsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Amazon Web Services Migration Hub Refactor Spaces service virtual private clouds (VPCs) that are part of the
 * environment.
 */
export const listEnvironmentVpcs: API.PaginatedOperationMethod<
  ListEnvironmentVpcsRequest,
  ListEnvironmentVpcsResponse,
  ListEnvironmentVpcsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentVpc
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments/{EnvironmentIdentifier}/vpcs",
    input: {
      EnvironmentIdentifier: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      EnvironmentVpcList: D.list({ LastUpdatedTime: D.ts, CreatedTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentVpcs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EnvironmentVpcList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRoutesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the Amazon Web Services Migration Hub Refactor Spaces routes within an application.
 */
export const listRoutes: API.PaginatedOperationMethod<
  ListRoutesRequest,
  ListRoutesResponse,
  ListRoutesError,
  Credentials | HttpClient.HttpClient,
  RouteSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/routes",
    input: {
      EnvironmentIdentifier: 0,
      ApplicationIdentifier: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      RouteSummaryList: D.list({ LastUpdatedTime: D.ts, CreatedTime: D.ts }),
    },
  },
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
  operationName: "ListRoutes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RouteSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the Amazon Web Services Migration Hub Refactor Spaces services within an application.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  ServiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/services",
    input: {
      EnvironmentIdentifier: 0,
      ApplicationIdentifier: 0,
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      ServiceSummaryList: D.list({ LastUpdatedTime: D.ts, CreatedTime: D.ts }),
    },
  },
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
  operationName: "ListServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags of a resource. The caller account must be the same as the resource’s
 * `OwnerAccountId`. Listing tags in other accounts is not supported.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | InvalidResourcePolicyException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a resource-based permission policy to the Amazon Web Services Migration Hub Refactor Spaces environment. The policy
 * must contain the same actions and condition statements as the
 * `arn:aws:ram::aws:permission/AWSRAMDefaultPermissionRefactorSpacesEnvironment`
 * permission in Resource Access Manager. The policy must not contain new lines or blank lines.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /resourcepolicy",
    input: { ResourceArn: 0, Policy: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidResourcePolicyException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the tags of a given resource. Tags are metadata which can be used to manage a
 * resource. To tag a resource, the caller account must be the same as the resource’s
 * `OwnerAccountId`. Tagging resources in other accounts is not supported.
 *
 * Amazon Web Services Migration Hub Refactor Spaces does not propagate tags to orchestrated resources, such as an
 * environment’s transit gateway.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata which can be used to
 * manage a resource. To untag a resource, the caller account must be the same as the resource’s
 * `OwnerAccountId`. Untagging resources across accounts is not supported.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateRouteError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Web Services Migration Hub Refactor Spaces route.
 */
export const updateRoute: API.OperationMethod<
  UpdateRouteRequest,
  UpdateRouteResponse,
  UpdateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/routes/{RouteIdentifier}",
    input: {
      EnvironmentIdentifier: 0,
      ApplicationIdentifier: 0,
      RouteIdentifier: 0,
      ActivationState: 0,
    },
    output: { LastUpdatedTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoute",
})) as any;
