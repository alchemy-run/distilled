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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Lambda Web", serviceShapeName: "LambdaWeb" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "lambda" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-03-07");
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
              `https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://lambda.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://lambda.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://lambda.{R}.{D}","properties":{},"headers":{}}');

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
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ExecutionRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<ExecutionRoleNotAssumable>()(
    "ExecutionRoleNotAssumable",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "cannot be assumed by lambda.amazonaws.com" },
    }),
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type FunctionName = string;
export type Description = string;
export type KmsKeyArn = string;
export interface S3Object {
  bucket: string;
  key: string;
  versionId?: string;
}
export interface CodeConfig {
  s3Object: S3Object;
}
export interface RuntimeConfig {
  runtime: string;
}
export interface BuildConfig {
  codeConfig: CodeConfig;
  runtimeConfig: RuntimeConfig;
}
export type RoleArn = string;
export type EnvironmentVariables = { [key: string]: string | undefined };
export type ApplicationLogLevel =
  | "TRACE"
  | "DEBUG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | (string & {});
export type SystemLogLevel = "DEBUG" | "INFO" | "WARN" | (string & {});
export interface LoggingConfig {
  logGroup?: string;
  applicationLogLevel?: ApplicationLogLevel;
  systemLogLevel?: SystemLogLevel;
}
export interface TelemetryConfig {
  loggingConfig?: LoggingConfig;
}
export interface ServiceConfig {
  executionRoleArn: string;
  timeoutSeconds?: number;
  egressNetworkConnectorArn?: string;
  maxConcurrencyPerEnvironment?: number;
  environmentVariables?: { [key: string]: string | undefined };
  telemetryConfig?: TelemetryConfig;
}
export interface RevisionConfig {
  description?: string;
  kmsKeyArn?: string;
  buildConfig: BuildConfig;
  serviceConfig: ServiceConfig;
}
export type EndpointName = string;
export type EndpointType = "HomeRegion" | "MultiRegion" | "PerRegion" | (string & {});
export type AuthType = "ApplicationManaged" | "IamAuth" | (string & {});
export type AutoDeploymentMode = "LatestRevision" | "Disabled" | (string & {});
export type Region = string;
export type RegionList = string[];
export interface ScalingConfig {
  maxEnvironments?: number;
}
export interface ThrottleConfig {
  rateLimit?: number;
}
export interface EndpointConfig {
  endpointName: string;
  description?: string;
  endpointType: EndpointType;
  authType: AuthType;
  autoDeploymentMode?: AutoDeploymentMode;
  regions?: string[];
  scalingConfig?: ScalingConfig;
  throttleConfig?: ThrottleConfig;
}
export type TagKey = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateWebFunctionRequest {
  functionName: string;
  revisionConfig?: RevisionConfig;
  endpointConfig?: EndpointConfig;
  tags?: { [key: string]: string | undefined };
}
export type FunctionArn = string;
export type FunctionState = "Pending" | "Active" | "Failed" | "Deleting" | (string & {});
export type RevisionArn = string;
export type RevisionId = string;
export type RevisionState = "Pending" | "Active" | "Failed" | (string & {});
export interface FunctionRevisionSummary {
  revisionArn: string;
  revisionId: string;
  description?: string;
  state: RevisionState;
  stateReason: string;
  createdAt: Date;
}
export type EndpointArn = string;
export type DomainName = string;
export interface RevisionWeight {
  revisionId: string;
  weight: number;
}
export type RevisionWeightList = RevisionWeight[];
export type EndpointState = "Pending" | "Active" | "Failed" | "Deleting" | (string & {});
export type EndpointUpdateStatus = "InProgress" | "Successful" | "Failed" | (string & {});
export interface FunctionEndpointSummary {
  endpointArn: string;
  endpointName: string;
  description?: string;
  endpointType: EndpointType;
  domainName: string;
  authType: AuthType;
  autoDeploymentMode: AutoDeploymentMode;
  revisionWeights: RevisionWeight[];
  regions: string[];
  scalingConfig?: ScalingConfig;
  throttleConfig?: ThrottleConfig;
  state: EndpointState;
  stateReason: string;
  updateStatus?: EndpointUpdateStatus;
  updateStatusReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateWebFunctionResponse {
  functionName: string;
  functionArn: string;
  state: FunctionState;
  stateReason: string;
  createdAt: Date;
  updatedAt: Date;
  revision?: FunctionRevisionSummary;
  endpoint?: FunctionEndpointSummary;
  tags?: { [key: string]: string | undefined };
}
export interface CreateWebFunctionEndpointRequest {
  functionName: string;
  endpointName: string;
  description?: string;
  endpointType: EndpointType;
  authType: AuthType;
  autoDeploymentMode?: AutoDeploymentMode;
  revisionWeights?: RevisionWeight[];
  regions?: string[];
  scalingConfig?: ScalingConfig;
  throttleConfig?: ThrottleConfig;
}
export interface RegionalEndpoint {
  domainName?: string;
  authType: AuthType;
  revisionWeights: RevisionWeight[];
  scalingConfig?: ScalingConfig;
  throttleConfig?: ThrottleConfig;
  state: EndpointState;
  stateReason: string;
  updateStatus?: EndpointUpdateStatus;
  updateStatusReason?: string;
}
export type RegionalEndpoints = { [key: string]: RegionalEndpoint | undefined };
export interface CreateWebFunctionEndpointResponse {
  functionArn: string;
  endpointArn: string;
  endpointName: string;
  description?: string;
  endpointType: EndpointType;
  domainName: string;
  authType: AuthType;
  autoDeploymentMode: AutoDeploymentMode;
  revisionWeights: RevisionWeight[];
  regions: string[];
  scalingConfig?: ScalingConfig;
  throttleConfig?: ThrottleConfig;
  state: EndpointState;
  stateReason: string;
  updateStatus?: EndpointUpdateStatus;
  updateStatusReason?: string;
  regionalEndpoints: { [key: string]: RegionalEndpoint | undefined };
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateWebFunctionRevisionRequest {
  functionName: string;
  description?: string;
  kmsKeyArn?: string;
  buildConfig: BuildConfig;
  serviceConfig: ServiceConfig;
}
export interface RevisionError {
  attribute: string;
  errorCode: string;
  errorMessage: string;
}
export type RevisionErrors = RevisionError[];
export interface CreateWebFunctionRevisionResponse {
  functionArn: string;
  revisionArn: string;
  revisionId: string;
  description?: string;
  kmsKeyArn?: string;
  buildConfig: BuildConfig;
  serviceConfig: ServiceConfig;
  state: RevisionState;
  stateReason: string;
  errors?: RevisionError[];
  createdAt: Date;
}
export type ResourceArn = string;
export type PolicyRevisionId = string;
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
  revisionId?: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteWebFunctionRequest {
  functionName: string;
}
export interface DeleteWebFunctionResponse {}
export interface DeleteWebFunctionEndpointRequest {
  functionName: string;
  endpointName: string;
}
export interface DeleteWebFunctionEndpointResponse {}
export interface DeleteWebFunctionRevisionRequest {
  functionName: string;
  revisionId: string;
}
export interface DeleteWebFunctionRevisionResponse {}
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export type ResourcePolicy = string;
export interface GetResourcePolicyResponse {
  policy: string;
  revisionId: string;
}
export interface GetWebAccountSettingsRequest {}
export interface AccountQuotas {
  maxTotalArmVCpus: number;
  maxTotalRateLimit: number;
  maxRevisionsPerFunction: number;
  maxEndpointsPerFunction: number;
}
export interface AccountUsage {
  functionCount: number;
}
export interface GetWebAccountSettingsResponse {
  accountQuotas: AccountQuotas;
  accountUsage: AccountUsage;
}
export interface GetWebFunctionRequest {
  functionName: string;
}
export interface GetWebFunctionResponse {
  functionName: string;
  functionArn: string;
  state: FunctionState;
  stateReason: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetWebFunctionEndpointRequest {
  functionName: string;
  endpointName: string;
}
export interface GetWebFunctionEndpointResponse {
  functionArn: string;
  endpointArn: string;
  endpointName: string;
  description?: string;
  endpointType: EndpointType;
  domainName: string;
  authType: AuthType;
  autoDeploymentMode: AutoDeploymentMode;
  revisionWeights: RevisionWeight[];
  regions: string[];
  scalingConfig?: ScalingConfig;
  throttleConfig?: ThrottleConfig;
  state: EndpointState;
  stateReason: string;
  updateStatus?: EndpointUpdateStatus;
  updateStatusReason?: string;
  regionalEndpoints: { [key: string]: RegionalEndpoint | undefined };
  createdAt: Date;
  updatedAt: Date;
}
export interface GetWebFunctionRevisionRequest {
  functionName: string;
  revisionId: string;
}
export interface GetWebFunctionRevisionResponse {
  functionArn: string;
  revisionArn: string;
  revisionId: string;
  description?: string;
  kmsKeyArn?: string;
  buildConfig: BuildConfig;
  serviceConfig: ServiceConfig;
  state: RevisionState;
  stateReason: string;
  errors?: RevisionError[];
  createdAt: Date;
}
export interface ListTagsRequest {
  resource: string;
}
export interface ListTagsResponse {
  tags?: { [key: string]: string | undefined };
}
export type FilterValueList = string[];
export interface Filter {
  name: string;
  values: string[];
}
export type FilterList = Filter[];
export type MaxResults = number;
export type NextToken = string;
export interface ListWebFunctionEndpointsRequest {
  functionName: string;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export type FunctionEndpointSummaryList = FunctionEndpointSummary[];
export interface ListWebFunctionEndpointsResponse {
  endpoints: FunctionEndpointSummary[];
  nextToken?: string;
}
export interface ListWebFunctionRevisionsRequest {
  functionName: string;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export type FunctionRevisionSummaryList = FunctionRevisionSummary[];
export interface ListWebFunctionRevisionsResponse {
  revisions: FunctionRevisionSummary[];
  nextToken?: string;
}
export interface ListWebFunctionsRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export interface FunctionSummary {
  functionName: string;
  functionArn: string;
  state: FunctionState;
  stateReason: string;
  createdAt: Date;
  updatedAt: Date;
}
export type FunctionSummaryList = FunctionSummary[];
export interface ListWebFunctionsResponse {
  functions: FunctionSummary[];
  nextToken?: string;
}
export interface PutResourcePolicyRequest {
  resourceArn: string;
  policy: string;
  revisionId?: string;
}
export interface PutResourcePolicyResponse {
  policy: string;
  revisionId: string;
}
export interface TagResourceRequest {
  resource: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resource: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateWebFunctionEndpointRequest {
  functionName: string;
  endpointName: string;
  description?: string;
  authType?: AuthType;
  autoDeploymentMode?: AutoDeploymentMode;
  revisionWeights?: RevisionWeight[];
  scalingConfig?: ScalingConfig;
  throttleConfig?: ThrottleConfig;
}
export interface UpdateWebFunctionEndpointResponse {
  functionArn: string;
  endpointArn: string;
  endpointName: string;
  description?: string;
  endpointType: EndpointType;
  domainName: string;
  authType: AuthType;
  autoDeploymentMode: AutoDeploymentMode;
  revisionWeights: RevisionWeight[];
  regions: string[];
  scalingConfig?: ScalingConfig;
  throttleConfig?: ThrottleConfig;
  state: EndpointState;
  stateReason: string;
  updateStatus?: EndpointUpdateStatus;
  updateStatusReason?: string;
  regionalEndpoints: { [key: string]: RegionalEndpoint | undefined };
  createdAt: Date;
  updatedAt: Date;
}
export type CreateWebFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ExecutionRoleNotAssumable
  | CommonErrors;
/**
 * Creates a web function with an initial revision and endpoint. To create a web function, you provide the function name, revision configuration (code and service settings), and endpoint configuration.
 *
 * To use this operation, you must have the `CreateWebFunction` permission on the web function. You don't need separate permissions for the initial revision or endpoint.
 */
export const createWebFunction: API.OperationMethod<
  CreateWebFunctionRequest,
  CreateWebFunctionResponse,
  CreateWebFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(186, __c23, 2) as any as S.Schema<CreateWebFunctionRequest>,
  output: __S(187, __c23, 3) as any as S.Schema<CreateWebFunctionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ExecutionRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebFunction",
}));

export type CreateWebFunctionEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an endpoint for a web function. An endpoint exposes the web function over HTTPS and routes traffic to one or more revisions.
 *
 * To use this operation, you must have the `CreateWebFunctionEndpoint` permission on the web function, not on the endpoint being created.
 */
export const createWebFunctionEndpoint: API.OperationMethod<
  CreateWebFunctionEndpointRequest,
  CreateWebFunctionEndpointResponse,
  CreateWebFunctionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<CreateWebFunctionEndpointRequest>,
  output: __S(250, __c31, 2) as any as S.Schema<CreateWebFunctionEndpointResponse>,
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
  operationName: "CreateWebFunctionEndpoint",
}));

export type CreateWebFunctionRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ExecutionRoleNotAssumable
  | CommonErrors;
/**
 * Creates an immutable revision for a web function. A revision represents a specific version of the function code and configuration.
 *
 * To use this operation, you must have the `CreateWebFunctionRevision` permission on the web function, not on the revision being created.
 */
export const createWebFunctionRevision: API.OperationMethod<
  CreateWebFunctionRevisionRequest,
  CreateWebFunctionRevisionResponse,
  CreateWebFunctionRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateWebFunctionRevisionRequest>,
  output: __S(10, __c1, 2) as any as S.Schema<CreateWebFunctionRevisionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ExecutionRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebFunctionRevision",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the resource-based policy from a web function.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
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
  operationName: "DeleteResourcePolicy",
}));

export type DeleteWebFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a web function and all of its associated revisions and endpoints.
 *
 * To use this operation, you must have the `DeleteWebFunction` permission on the web function. You don't need the `DeleteWebFunctionRevision` or `DeleteWebFunctionEndpoint` permission.
 */
export const deleteWebFunction: API.OperationMethod<
  DeleteWebFunctionRequest,
  DeleteWebFunctionResponse,
  DeleteWebFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<DeleteWebFunctionRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteWebFunctionResponse>,
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
  operationName: "DeleteWebFunction",
}));

export type DeleteWebFunctionEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a web function endpoint.
 */
export const deleteWebFunctionEndpoint: API.OperationMethod<
  DeleteWebFunctionEndpointRequest,
  DeleteWebFunctionEndpointResponse,
  DeleteWebFunctionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DeleteWebFunctionEndpointRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteWebFunctionEndpointResponse>,
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
  operationName: "DeleteWebFunctionEndpoint",
}));

export type DeleteWebFunctionRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a web function revision. You cannot delete a revision that is currently serving traffic on an endpoint.
 */
export const deleteWebFunctionRevision: API.OperationMethod<
  DeleteWebFunctionRevisionRequest,
  DeleteWebFunctionRevisionResponse,
  DeleteWebFunctionRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<DeleteWebFunctionRevisionRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteWebFunctionRevisionResponse>,
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
  operationName: "DeleteWebFunctionRevision",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource-based policy attached to a web function.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<GetResourcePolicyResponse>,
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

export type GetWebAccountSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves details about your AWS Lambda Web Functions account settings for the current AWS Region, including the quotas that apply to web functions and your current usage.
 */
export const getWebAccountSettings: API.OperationMethod<
  GetWebAccountSettingsRequest,
  GetWebAccountSettingsResponse,
  GetWebAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<GetWebAccountSettingsRequest>,
  output: __S(75, __c9, 3) as any as S.Schema<GetWebAccountSettingsResponse>,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebAccountSettings",
}));

export type GetWebFunctionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a web function, including its current state and configuration.
 */
export const getWebFunction: API.OperationMethod<
  GetWebFunctionRequest,
  GetWebFunctionResponse,
  GetWebFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetWebFunctionRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<GetWebFunctionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebFunction",
}));

export type GetWebFunctionEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a web function endpoint, including its current state, configuration, and domain name.
 */
export const getWebFunctionEndpoint: API.OperationMethod<
  GetWebFunctionEndpointRequest,
  GetWebFunctionEndpointResponse,
  GetWebFunctionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<GetWebFunctionEndpointRequest>,
  output: __S(250, __c31, 2) as any as S.Schema<GetWebFunctionEndpointResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebFunctionEndpoint",
}));

export type GetWebFunctionRevisionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a web function revision, including its state and configuration.
 */
export const getWebFunctionRevision: API.OperationMethod<
  GetWebFunctionRevisionRequest,
  GetWebFunctionRevisionResponse,
  GetWebFunctionRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<GetWebFunctionRevisionRequest>,
  output: __S(10, __c1, 2) as any as S.Schema<GetWebFunctionRevisionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebFunctionRevision",
}));

export type ListTagsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags applied to a web function.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<ListTagsRequest>,
  output: __S(113, __c14, 1) as any as S.Schema<ListTagsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

export type ListWebFunctionEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists endpoints for a web function. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listWebFunctionEndpoints: API.PaginatedOperationMethod<
  ListWebFunctionEndpointsRequest,
  ListWebFunctionEndpointsResponse,
  ListWebFunctionEndpointsError,
  Credentials | HttpClient.HttpClient,
  FunctionEndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<ListWebFunctionEndpointsRequest>,
  output: __S(122, __c15, 2) as any as S.Schema<ListWebFunctionEndpointsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebFunctionEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "endpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWebFunctionRevisionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists revisions for a web function. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listWebFunctionRevisions: API.PaginatedOperationMethod<
  ListWebFunctionRevisionsRequest,
  ListWebFunctionRevisionsResponse,
  ListWebFunctionRevisionsError,
  Credentials | HttpClient.HttpClient,
  FunctionRevisionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<ListWebFunctionRevisionsRequest>,
  output: __S(138, __c17, 2) as any as S.Schema<ListWebFunctionRevisionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebFunctionRevisions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "revisions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWebFunctionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists web functions in your account. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listWebFunctions: API.PaginatedOperationMethod<
  ListWebFunctionsRequest,
  ListWebFunctionsResponse,
  ListWebFunctionsError,
  Credentials | HttpClient.HttpClient,
  FunctionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<ListWebFunctionsRequest>,
  output: __S(146, __c18, 2) as any as S.Schema<ListWebFunctionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebFunctions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "functions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates a resource-based policy on a web function. A resource-based policy grants permissions to other AWS accounts or services to perform actions on the web function.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<PutResourcePolicyResponse>,
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
  operationName: "PutResourcePolicy",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to a web function. If a tag key already exists, the existing value is overwritten with the new value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<TagResourceResponse>,
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
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a web function.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<UntagResourceResponse>,
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
  operationName: "UntagResource",
}));

export type UpdateWebFunctionEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a web function endpoint. You can modify the authorization type, auto-deployment mode, revision weights, scaling, and throttling settings.
 */
export const updateWebFunctionEndpoint: API.OperationMethod<
  UpdateWebFunctionEndpointRequest,
  UpdateWebFunctionEndpointResponse,
  UpdateWebFunctionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<UpdateWebFunctionEndpointRequest>,
  output: __S(250, __c31, 2) as any as S.Schema<UpdateWebFunctionEndpointResponse>,
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
  operationName: "UpdateWebFunctionEndpoint",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String.pipe(T.HttpLabel("functionName")),
          description: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          buildConfig: __S(195, __c24, 3),
          serviceConfig: __S(198, __c24, 6),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2025-03-07/web-functions/{functionName}/revisions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWebFunctionRevisionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attribute: S.String, errorCode: S.String, errorMessage: S.String }),
      ).annotate({ identifier: "RevisionError" });
    case 1:
      return S.Array(__S(8, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          functionArn: S.String,
          revisionArn: S.String,
          revisionId: S.String,
          description: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          buildConfig: __S(195, __c24, 3),
          serviceConfig: __S(198, __c24, 6),
          state: S.String,
          stateReason: S.String,
          errors: S.optional(__S(9, __c1, 1)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateWebFunctionRevisionResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          revisionId: S.optional(S.String).pipe(T.HttpQuery("RevisionId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2025-03-07/resource-policy/{resourceArn}" }),
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
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteResourcePolicyResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ functionName: S.String.pipe(T.HttpLabel("functionName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2025-03-07/web-functions/{functionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWebFunctionRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String.pipe(T.HttpLabel("functionName")),
          endpointName: S.String.pipe(T.HttpLabel("endpointName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2025-03-07/web-functions/{functionName}/endpoints/{endpointName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWebFunctionEndpointRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String.pipe(T.HttpLabel("functionName")),
          revisionId: S.String.pipe(T.HttpLabel("revisionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2025-03-07/web-functions/{functionName}/revisions/{revisionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWebFunctionRevisionRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-03-07/resource-policy/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policy: S.String, revisionId: S.String }).pipe(
          S.encodeKeys({ policy: "Policy", revisionId: "RevisionId" }),
        ),
      ).annotate({ identifier: "GetResourcePolicyResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-03-07/web-account-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWebAccountSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          maxTotalArmVCpus: S.Number,
          maxTotalRateLimit: S.Number,
          maxRevisionsPerFunction: S.Number,
          maxEndpointsPerFunction: S.Number,
        }),
      ).annotate({ identifier: "AccountQuotas" });
    case 2:
      return S.suspend(() => S.Struct({ functionCount: S.Number })).annotate({
        identifier: "AccountUsage",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ accountQuotas: __S(73, __c9, 1), accountUsage: __S(74, __c9, 2) }),
      ).annotate({ identifier: "GetWebAccountSettingsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ functionName: S.String.pipe(T.HttpLabel("functionName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-03-07/web-functions/{functionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWebFunctionRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String,
          functionArn: S.String,
          state: S.String,
          stateReason: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetWebFunctionResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String.pipe(T.HttpLabel("functionName")),
          endpointName: S.String.pipe(T.HttpLabel("endpointName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2025-03-07/web-functions/{functionName}/endpoints/{endpointName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWebFunctionEndpointRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String.pipe(T.HttpLabel("functionName")),
          revisionId: S.String.pipe(T.HttpLabel("revisionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2025-03-07/web-functions/{functionName}/revisions/{revisionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWebFunctionRevisionRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resource: S.String.pipe(T.HttpLabel("resource")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-03-07/tags/{resource}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tags: S.optional(__S(200, __c25, 0)) }).pipe(S.encodeKeys({ tags: "Tags" })),
      ).annotate({ identifier: "ListTagsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String.pipe(T.HttpLabel("functionName")),
          filters: S.optional(__S(129, __c16, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2025-03-07/web-functions/{functionName}/list-endpoints",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWebFunctionEndpointsRequest" });
    case 1:
      return S.Array(__S(208, __c26, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ endpoints: __S(121, __c15, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWebFunctionEndpointsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, values: __S(224, __c28, 0) })).annotate({
        identifier: "Filter",
      });
    case 1:
      return S.Array(__S(128, __c16, 0));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String.pipe(T.HttpLabel("functionName")),
          filters: S.optional(__S(129, __c16, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2025-03-07/web-functions/{functionName}/list-revisions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWebFunctionRevisionsRequest" });
    case 1:
      return S.Array(__S(216, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ revisions: __S(137, __c17, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWebFunctionRevisionsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(129, __c16, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2025-03-07/web-functions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWebFunctionsRequest" });
    case 1:
      return S.Array(__S(88, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ functions: __S(145, __c18, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWebFunctionsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          policy: S.String,
          revisionId: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ policy: "Policy", revisionId: "RevisionId" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/2025-03-07/resource-policy/{resourceArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resource: S.String.pipe(T.HttpLabel("resource")), tags: __S(200, __c25, 0) })
          .pipe(S.encodeKeys({ tags: "Tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/2025-03-07/tags/{resource}" }),
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
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resource: S.String.pipe(T.HttpLabel("resource")),
          tagKeys: __S(224, __c28, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2025-03-07/tags/{resource}" }),
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
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String.pipe(T.HttpLabel("functionName")),
          endpointName: S.String.pipe(T.HttpLabel("endpointName")),
          description: S.optional(S.String),
          authType: S.optional(S.String),
          autoDeploymentMode: S.optional(S.String),
          revisionWeights: S.optional(__S(235, __c29, 3)),
          scalingConfig: S.optional(__S(232, __c29, 0)),
          throttleConfig: S.optional(__S(233, __c29, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2025-03-07/web-functions/{functionName}/endpoints/{endpointName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWebFunctionEndpointRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          buildConfig: __S(195, __c24, 3),
          serviceConfig: __S(198, __c24, 6),
        }),
      ).annotate({ identifier: "RevisionConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          endpointName: S.String,
          description: S.optional(S.String),
          endpointType: S.String,
          authType: S.String,
          autoDeploymentMode: S.optional(S.String),
          regions: S.optional(__S(224, __c28, 0)),
          scalingConfig: S.optional(__S(232, __c29, 0)),
          throttleConfig: S.optional(__S(233, __c29, 1)),
        }),
      ).annotate({ identifier: "EndpointConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String,
          revisionConfig: S.optional(__S(184, __c23, 0)),
          endpointConfig: S.optional(__S(185, __c23, 1)),
          tags: S.optional(__S(200, __c25, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2025-03-07/web-functions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWebFunctionRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String,
          functionArn: S.String,
          state: S.String,
          stateReason: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          revision: S.optional(__S(216, __c27, 0)),
          endpoint: S.optional(__S(208, __c26, 0)),
          tags: S.optional(__S(200, __c25, 0)),
        }),
      ).annotate({ identifier: "CreateWebFunctionResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucket: S.String, key: S.String, versionId: S.optional(S.String) }),
      ).annotate({ identifier: "S3Object" });
    case 1:
      return S.suspend(() => S.Struct({ s3Object: __S(192, __c24, 0) })).annotate({
        identifier: "CodeConfig",
      });
    case 2:
      return S.suspend(() => S.Struct({ runtime: S.String })).annotate({
        identifier: "RuntimeConfig",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ codeConfig: __S(193, __c24, 1), runtimeConfig: __S(194, __c24, 2) }),
      ).annotate({ identifier: "BuildConfig" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          logGroup: S.optional(S.String),
          applicationLogLevel: S.optional(S.String),
          systemLogLevel: S.optional(S.String),
        }),
      ).annotate({ identifier: "LoggingConfig" });
    case 5:
      return S.suspend(() => S.Struct({ loggingConfig: S.optional(__S(196, __c24, 4)) })).annotate({
        identifier: "TelemetryConfig",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          executionRoleArn: S.String,
          timeoutSeconds: S.optional(S.Number),
          egressNetworkConnectorArn: S.optional(S.String),
          maxConcurrencyPerEnvironment: S.optional(S.Number),
          environmentVariables: S.optional(__S(200, __c25, 0)),
          telemetryConfig: S.optional(__S(197, __c24, 5)),
        }),
      ).annotate({ identifier: "ServiceConfig" });
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
      return S.suspend(() =>
        S.Struct({
          endpointArn: S.String,
          endpointName: S.String,
          description: S.optional(S.String),
          endpointType: S.String,
          domainName: S.String,
          authType: S.String,
          autoDeploymentMode: S.String,
          revisionWeights: __S(235, __c29, 3),
          regions: __S(224, __c28, 0),
          scalingConfig: S.optional(__S(232, __c29, 0)),
          throttleConfig: S.optional(__S(233, __c29, 1)),
          state: S.String,
          stateReason: S.String,
          updateStatus: S.optional(S.String),
          updateStatusReason: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "FunctionEndpointSummary" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          revisionArn: S.String,
          revisionId: S.String,
          description: S.optional(S.String),
          state: S.String,
          stateReason: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "FunctionRevisionSummary" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ maxEnvironments: S.optional(S.Number) })).annotate({
        identifier: "ScalingConfig",
      });
    case 1:
      return S.suspend(() => S.Struct({ rateLimit: S.optional(S.Number) })).annotate({
        identifier: "ThrottleConfig",
      });
    case 2:
      return S.suspend(() => S.Struct({ revisionId: S.String, weight: S.Number })).annotate({
        identifier: "RevisionWeight",
      });
    case 3:
      return S.Array(__S(234, __c29, 2));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String.pipe(T.HttpLabel("functionName")),
          endpointName: S.String,
          description: S.optional(S.String),
          endpointType: S.String,
          authType: S.String,
          autoDeploymentMode: S.optional(S.String),
          revisionWeights: S.optional(__S(235, __c29, 3)),
          regions: S.optional(__S(224, __c28, 0)),
          scalingConfig: S.optional(__S(232, __c29, 0)),
          throttleConfig: S.optional(__S(233, __c29, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2025-03-07/web-functions/{functionName}/endpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWebFunctionEndpointRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainName: S.optional(S.String),
          authType: S.String,
          revisionWeights: __S(235, __c29, 3),
          scalingConfig: S.optional(__S(232, __c29, 0)),
          throttleConfig: S.optional(__S(233, __c29, 1)),
          state: S.String,
          stateReason: S.String,
          updateStatus: S.optional(S.String),
          updateStatusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegionalEndpoint" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(248, __c31, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          functionArn: S.String,
          endpointArn: S.String,
          endpointName: S.String,
          description: S.optional(S.String),
          endpointType: S.String,
          domainName: S.String,
          authType: S.String,
          autoDeploymentMode: S.String,
          revisionWeights: __S(235, __c29, 3),
          regions: __S(224, __c28, 0),
          scalingConfig: S.optional(__S(232, __c29, 0)),
          throttleConfig: S.optional(__S(233, __c29, 1)),
          state: S.String,
          stateReason: S.String,
          updateStatus: S.optional(S.String),
          updateStatusReason: S.optional(S.String),
          regionalEndpoints: __S(249, __c31, 1),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateWebFunctionEndpointResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
