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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Migration Hub Refactor Spaces",
  serviceShapeName: "RefactorSpaces",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "refactor-spaces" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-10-26");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://refactor-spaces.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://refactor-spaces.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://refactor-spaces.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidResourcePolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourcePolicyException>()(
    "InvalidResourcePolicyException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
      ServiceCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
      ServiceCode: /*@__PURE__*/ S.optional(S.String),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(121, __c30, 1) as any as S.Schema<CreateApplicationRequest>,
  output: __S(122, __c30, 2) as any as S.Schema<CreateApplicationResponse>,
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
}));

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
  input: __S(128, __c32, 0) as any as S.Schema<CreateEnvironmentRequest>,
  output: __S(129, __c32, 1) as any as S.Schema<CreateEnvironmentResponse>,
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
}));

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
  input: __S(2, __c0, 2) as any as S.Schema<CreateRouteRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<CreateRouteResponse>,
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
}));

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
 * accessible to all of an environment's services with VPCs and routes, apply the
 * `RefactorSpacesSecurityGroup` to the resource. Alternatively, to add more
 * cross-account constraints, apply your own security group.
 */
export const createService: API.OperationMethod<
  CreateServiceRequest,
  CreateServiceResponse,
  CreateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(10, __c2, 2) as any as S.Schema<CreateServiceRequest>,
  output: __S(11, __c2, 3) as any as S.Schema<CreateServiceResponse>,
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
}));

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
  input: __S(12, __c3, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(13, __c3, 1) as any as S.Schema<DeleteApplicationResponse>,
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
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<DeleteEnvironmentRequest>,
  output: __S(17, __c4, 1) as any as S.Schema<DeleteEnvironmentResponse>,
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
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
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
}));

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
  input: __S(28, __c7, 0) as any as S.Schema<DeleteRouteRequest>,
  output: __S(32, __c8, 0) as any as S.Schema<DeleteRouteResponse>,
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
}));

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
  input: __S(36, __c9, 0) as any as S.Schema<DeleteServiceRequest>,
  output: __S(37, __c9, 1) as any as S.Schema<DeleteServiceResponse>,
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
}));

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
  input: __S(40, __c10, 0) as any as S.Schema<GetApplicationRequest>,
  output: __S(49, __c12, 1) as any as S.Schema<GetApplicationResponse>,
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
}));

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
  input: __S(52, __c13, 0) as any as S.Schema<GetEnvironmentRequest>,
  output: __S(56, __c14, 0) as any as S.Schema<GetEnvironmentResponse>,
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
}));

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
  input: __S(60, __c15, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(61, __c15, 1) as any as S.Schema<GetResourcePolicyResponse>,
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
}));

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
  input: __S(64, __c16, 0) as any as S.Schema<GetRouteRequest>,
  output: __S(68, __c17, 0) as any as S.Schema<GetRouteResponse>,
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
}));

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
  input: __S(72, __c18, 0) as any as S.Schema<GetServiceRequest>,
  output: __S(78, __c19, 2) as any as S.Schema<GetServiceResponse>,
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
}));

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
  input: __S(80, __c20, 0) as any as S.Schema<ListApplicationsRequest>,
  output: __S(82, __c20, 2) as any as S.Schema<ListApplicationsResponse>,
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
  input: __S(84, __c21, 0) as any as S.Schema<ListEnvironmentsRequest>,
  output: __S(86, __c21, 2) as any as S.Schema<ListEnvironmentsResponse>,
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
  input: __S(88, __c22, 0) as any as S.Schema<ListEnvironmentVpcsRequest>,
  output: __S(91, __c22, 3) as any as S.Schema<ListEnvironmentVpcsResponse>,
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
  input: __S(92, __c23, 0) as any as S.Schema<ListRoutesRequest>,
  output: __S(94, __c23, 2) as any as S.Schema<ListRoutesResponse>,
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
  input: __S(96, __c24, 0) as any as S.Schema<ListServicesRequest>,
  output: __S(98, __c24, 2) as any as S.Schema<ListServicesResponse>,
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
 * Lists the tags of a resource. The caller account must be the same as the resource's
 * `OwnerAccountId`. Listing tags in other accounts is not supported.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(100, __c25, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(101, __c25, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(104, __c26, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<PutResourcePolicyResponse>,
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
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the tags of a given resource. Tags are metadata which can be used to manage a
 * resource. To tag a resource, the caller account must be the same as the resource's
 * `OwnerAccountId`. Tagging resources in other accounts is not supported.
 *
 * Amazon Web Services Migration Hub Refactor Spaces does not propagate tags to orchestrated resources, such as an
 * environment's transit gateway.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(108, __c27, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata which can be used to
 * manage a resource. To untag a resource, the caller account must be the same as the resource's
 * `OwnerAccountId`. Untagging resources across accounts is not supported.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c28, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(116, __c29, 0) as any as S.Schema<UpdateRouteRequest>,
  output: __S(32, __c8, 0) as any as S.Schema<UpdateRouteResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ActivationState: S.optional(S.String) })).annotate({
        identifier: "DefaultRouteInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourcePath: S.String,
          ActivationState: S.String,
          Methods: S.optional(__S(4, __c1, 0)),
          IncludeChildPaths: S.optional(S.Boolean),
          AppendSourcePath: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UriPathRouteInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ServiceIdentifier: S.String,
          RouteType: S.String,
          DefaultRoute: S.optional(__S(0, __c0, 0)),
          UriPathRoute: S.optional(__S(1, __c0, 1)),
          Tags: S.optional(__S(124, __c31, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/routes",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRouteRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          RouteId: S.optional(S.String),
          Arn: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          CreatedByAccountId: S.optional(S.String),
          RouteType: S.optional(S.String),
          ServiceId: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          UriPathRoute: S.optional(__S(1, __c0, 1)),
          State: S.optional(S.String),
          Tags: S.optional(__S(124, __c31, 0)),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateRouteResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Url: S.String, HealthUrl: S.optional(S.String) })).annotate(
        { identifier: "UrlEndpointInput" },
      );
    case 1:
      return S.suspend(() => S.Struct({ Arn: S.String })).annotate({
        identifier: "LambdaEndpointInput",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          VpcId: S.optional(S.String),
          EndpointType: S.String,
          UrlEndpoint: S.optional(__S(8, __c2, 0)),
          LambdaEndpoint: S.optional(__S(9, __c2, 1)),
          Tags: S.optional(__S(124, __c31, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/services",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateServiceRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ServiceId: S.optional(S.String),
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          CreatedByAccountId: S.optional(S.String),
          Description: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          VpcId: S.optional(S.String),
          EndpointType: S.optional(S.String),
          UrlEndpoint: S.optional(__S(8, __c2, 0)),
          LambdaEndpoint: S.optional(__S(9, __c2, 1)),
          State: S.optional(S.String),
          Tags: S.optional(__S(124, __c31, 0)),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateServiceResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          State: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DeleteApplicationResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/environments/{EnvironmentIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnvironmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          State: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DeleteEnvironmentResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/resourcepolicy/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteResourcePolicyResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          RouteIdentifier: S.String.pipe(T.HttpLabel("RouteIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/routes/{RouteIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRouteRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RouteId: S.optional(S.String),
          Arn: S.optional(S.String),
          ServiceId: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          State: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DeleteRouteResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ServiceIdentifier: S.String.pipe(T.HttpLabel("ServiceIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/services/{ServiceIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteServiceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServiceId: S.optional(S.String),
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          State: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DeleteServiceResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Code: S.optional(S.String),
          Message: S.optional(S.String),
          AccountId: S.optional(S.String),
          ResourceIdentifier: S.optional(S.String),
          ResourceType: S.optional(S.String),
          AdditionalDetails: S.optional(__S(124, __c31, 0)),
        }),
      ).annotate({ identifier: "ErrorResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyUrl: S.optional(S.String),
          ApiGatewayId: S.optional(S.String),
          VpcLinkId: S.optional(S.String),
          NlbArn: S.optional(S.String),
          NlbName: S.optional(S.String),
          EndpointType: S.optional(S.String),
          StageName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApiGatewayProxyConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          CreatedByAccountId: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          VpcId: S.optional(S.String),
          ProxyType: S.optional(S.String),
          ApiGatewayProxy: S.optional(__S(48, __c12, 0)),
          State: S.optional(S.String),
          Tags: S.optional(__S(124, __c31, 0)),
          Error: S.optional(__S(44, __c11, 0)),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetApplicationResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{EnvironmentIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Description: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          NetworkFabricType: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          TransitGatewayId: S.optional(S.String),
          State: S.optional(S.String),
          Tags: S.optional(__S(124, __c31, 0)),
          Error: S.optional(__S(44, __c11, 0)),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetEnvironmentResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resourcepolicy/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Policy: S.optional(S.String) })).annotate({
        identifier: "GetResourcePolicyResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          RouteIdentifier: S.String.pipe(T.HttpLabel("RouteIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/routes/{RouteIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRouteRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RouteId: S.optional(S.String),
          Arn: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          CreatedByAccountId: S.optional(S.String),
          RouteType: S.optional(S.String),
          ServiceId: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          SourcePath: S.optional(S.String),
          Methods: S.optional(__S(4, __c1, 0)),
          IncludeChildPaths: S.optional(S.Boolean),
          PathResourceToId: S.optional(__S(124, __c31, 0)),
          State: S.optional(S.String),
          Tags: S.optional(__S(124, __c31, 0)),
          Error: S.optional(__S(44, __c11, 0)),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AppendSourcePath: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetRouteResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          ServiceIdentifier: S.String.pipe(T.HttpLabel("ServiceIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/services/{ServiceIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetServiceRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Url: S.optional(S.String), HealthUrl: S.optional(S.String) }),
      ).annotate({ identifier: "UrlEndpointConfig" });
    case 1:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "LambdaEndpointConfig",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ServiceId: S.optional(S.String),
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          CreatedByAccountId: S.optional(S.String),
          Description: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          VpcId: S.optional(S.String),
          EndpointType: S.optional(S.String),
          UrlEndpoint: S.optional(__S(76, __c19, 0)),
          LambdaEndpoint: S.optional(__S(77, __c19, 1)),
          State: S.optional(S.String),
          Tags: S.optional(__S(124, __c31, 0)),
          Error: S.optional(__S(44, __c11, 0)),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetServiceResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{EnvironmentIdentifier}/applications" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 1:
      return S.Array(__S(49, __c12, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationSummaryList: S.optional(__S(81, __c20, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListApplicationsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/environments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEnvironmentsRequest" });
    case 1:
      return S.Array(__S(56, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EnvironmentSummaryList: S.optional(__S(85, __c21, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEnvironmentsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{EnvironmentIdentifier}/vpcs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEnvironmentVpcsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EnvironmentId: S.optional(S.String),
          VpcId: S.optional(S.String),
          AccountId: S.optional(S.String),
          CidrBlocks: S.optional(__S(4, __c1, 0)),
          VpcName: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "EnvironmentVpc" });
    case 2:
      return S.Array(__S(89, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EnvironmentVpcList: S.optional(__S(90, __c22, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEnvironmentVpcsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/routes",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRoutesRequest" });
    case 1:
      return S.Array(__S(68, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RouteSummaryList: S.optional(__S(93, __c23, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRoutesResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/services",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListServicesRequest" });
    case 1:
      return S.Array(__S(78, __c19, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ServiceSummaryList: S.optional(__S(97, __c24, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListServicesResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(124, __c31, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Policy: S.String }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/resourcepolicy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(124, __c31, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(4, __c1, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
          RouteIdentifier: S.String.pipe(T.HttpLabel("RouteIdentifier")),
          ActivationState: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/environments/{EnvironmentIdentifier}/applications/{ApplicationIdentifier}/routes/{RouteIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRouteRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EndpointType: S.optional(S.String), StageName: S.optional(S.String) }),
      ).annotate({ identifier: "ApiGatewayProxyInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          EnvironmentIdentifier: S.String.pipe(T.HttpLabel("EnvironmentIdentifier")),
          VpcId: S.String,
          ProxyType: S.String,
          ApiGatewayProxy: S.optional(__S(120, __c30, 0)),
          Tags: S.optional(__S(124, __c31, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/environments/{EnvironmentIdentifier}/applications" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateApplicationRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          CreatedByAccountId: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          VpcId: S.optional(S.String),
          ProxyType: S.optional(S.String),
          ApiGatewayProxy: S.optional(__S(120, __c30, 0)),
          State: S.optional(S.String),
          Tags: S.optional(__S(124, __c31, 0)),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateApplicationResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          NetworkFabricType: S.String,
          Tags: S.optional(__S(124, __c31, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/environments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateEnvironmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Description: S.optional(S.String),
          EnvironmentId: S.optional(S.String),
          NetworkFabricType: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          State: S.optional(S.String),
          Tags: S.optional(__S(124, __c31, 0)),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateEnvironmentResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
