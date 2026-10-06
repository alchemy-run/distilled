import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema";
import * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
const svc = T.AwsApiService({ sdkId: "Lambda Web", serviceShapeName: "LambdaWeb" });
const auth = T.AwsAuthSigv4({ name: "lambda" });
const ver = T.ServiceVersion("2025-03-07");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type FunctionName = string;
export type Description = string;
export type KmsKeyArn = string;
export interface S3Object {
  bucket: string;
  key: string;
  versionId?: string;
}
export const S3Object = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.String, key: S.String, versionId: S.optional(S.String) }),
).annotate({ identifier: "S3Object" }) as any as S.Schema<S3Object>;
export interface CodeConfig {
  s3Object: S3Object;
}
export const CodeConfig = /*@__PURE__*/ S.suspend(() => S.Struct({ s3Object: S3Object })).annotate({
  identifier: "CodeConfig",
}) as any as S.Schema<CodeConfig>;
export interface RuntimeConfig {
  runtime: string;
}
export const RuntimeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ runtime: S.String }),
).annotate({ identifier: "RuntimeConfig" }) as any as S.Schema<RuntimeConfig>;
export interface BuildConfig {
  codeConfig: CodeConfig;
  runtimeConfig: RuntimeConfig;
}
export const BuildConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ codeConfig: CodeConfig, runtimeConfig: RuntimeConfig }),
).annotate({ identifier: "BuildConfig" }) as any as S.Schema<BuildConfig>;
export type RoleArn = string;
export type EnvironmentVariables = { [key: string]: string | undefined };
export const EnvironmentVariables = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type ApplicationLogLevel =
  | "TRACE"
  | "DEBUG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | (string & {});
export const ApplicationLogLevel = S.String;

export type SystemLogLevel = "DEBUG" | "INFO" | "WARN" | (string & {});
export const SystemLogLevel = S.String;

export interface LoggingConfig {
  logGroup?: string;
  applicationLogLevel?: ApplicationLogLevel;
  systemLogLevel?: SystemLogLevel;
}
export const LoggingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logGroup: S.optional(S.String),
    applicationLogLevel: S.optional(ApplicationLogLevel),
    systemLogLevel: S.optional(SystemLogLevel),
  }),
).annotate({ identifier: "LoggingConfig" }) as any as S.Schema<LoggingConfig>;
export interface TelemetryConfig {
  loggingConfig?: LoggingConfig;
}
export const TelemetryConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ loggingConfig: S.optional(LoggingConfig) }),
).annotate({ identifier: "TelemetryConfig" }) as any as S.Schema<TelemetryConfig>;
export interface ServiceConfig {
  executionRoleArn: string;
  timeoutSeconds?: number;
  maxConcurrencyPerEnvironment?: number;
  environmentVariables?: { [key: string]: string | undefined };
  telemetryConfig?: TelemetryConfig;
}
export const ServiceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionRoleArn: S.String,
    timeoutSeconds: S.optional(S.Number),
    maxConcurrencyPerEnvironment: S.optional(S.Number),
    environmentVariables: S.optional(EnvironmentVariables),
    telemetryConfig: S.optional(TelemetryConfig),
  }),
).annotate({ identifier: "ServiceConfig" }) as any as S.Schema<ServiceConfig>;
export interface RevisionConfig {
  description?: string;
  kmsKeyArn?: string;
  buildConfig: BuildConfig;
  serviceConfig: ServiceConfig;
}
export const RevisionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    buildConfig: BuildConfig,
    serviceConfig: ServiceConfig,
  }),
).annotate({ identifier: "RevisionConfig" }) as any as S.Schema<RevisionConfig>;
export type EndpointName = string;
export type EndpointType = "HomeRegion" | "MultiRegion" | "PerRegion" | (string & {});
export const EndpointType = S.String;

export type AuthType = "ApplicationManaged" | "IamAuth" | (string & {});
export const AuthType = S.String;

export type AutoDeploymentMode = "LatestRevision" | "Disabled" | (string & {});
export const AutoDeploymentMode = S.String;

export type Region = string;
export type RegionList = string[];
export const RegionList = /*@__PURE__*/ S.Array(S.String);
export interface ScalingConfig {
  maxEnvironments?: number;
}
export const ScalingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxEnvironments: S.optional(S.Number) }),
).annotate({ identifier: "ScalingConfig" }) as any as S.Schema<ScalingConfig>;
export interface ThrottleConfig {
  rateLimit?: number;
}
export const ThrottleConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rateLimit: S.optional(S.Number) }),
).annotate({ identifier: "ThrottleConfig" }) as any as S.Schema<ThrottleConfig>;
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
export const EndpointConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpointName: S.String,
    description: S.optional(S.String),
    endpointType: EndpointType,
    authType: AuthType,
    autoDeploymentMode: S.optional(AutoDeploymentMode),
    regions: S.optional(RegionList),
    scalingConfig: S.optional(ScalingConfig),
    throttleConfig: S.optional(ThrottleConfig),
  }),
).annotate({ identifier: "EndpointConfig" }) as any as S.Schema<EndpointConfig>;
export type TagKey = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateWebFunctionRequest {
  functionName: string;
  revisionConfig?: RevisionConfig;
  endpointConfig?: EndpointConfig;
  tags?: { [key: string]: string | undefined };
}
export const CreateWebFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionName: S.String,
    revisionConfig: S.optional(RevisionConfig),
    endpointConfig: S.optional(EndpointConfig),
    tags: S.optional(Tags),
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
).annotate({ identifier: "CreateWebFunctionRequest" }) as any as S.Schema<CreateWebFunctionRequest>;
export type FunctionArn = string;
export type FunctionState = "Pending" | "Active" | "Failed" | "Deleting" | (string & {});
export const FunctionState = S.String;

export type RevisionArn = string;
export type RevisionId = string;
export type RevisionState = "Pending" | "Active" | "Failed" | (string & {});
export const RevisionState = S.String;

export interface FunctionRevisionSummary {
  revisionArn: string;
  revisionId: string;
  description?: string;
  state: RevisionState;
  stateReason: string;
  createdAt: Date;
}
export const FunctionRevisionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revisionArn: S.String,
    revisionId: S.String,
    description: S.optional(S.String),
    state: RevisionState,
    stateReason: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "FunctionRevisionSummary" }) as any as S.Schema<FunctionRevisionSummary>;
export type EndpointArn = string;
export type DomainName = string;
export interface RevisionWeight {
  revisionId: string;
  weight: number;
}
export const RevisionWeight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ revisionId: S.String, weight: S.Number }),
).annotate({ identifier: "RevisionWeight" }) as any as S.Schema<RevisionWeight>;
export type RevisionWeightList = RevisionWeight[];
export const RevisionWeightList = /*@__PURE__*/ S.Array(RevisionWeight);
export type EndpointState = "Pending" | "Active" | "Failed" | "Deleting" | (string & {});
export const EndpointState = S.String;

export type EndpointUpdateStatus = "InProgress" | "Successful" | "Failed" | (string & {});
export const EndpointUpdateStatus = S.String;

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
export const FunctionEndpointSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpointArn: S.String,
    endpointName: S.String,
    description: S.optional(S.String),
    endpointType: EndpointType,
    domainName: S.String,
    authType: AuthType,
    autoDeploymentMode: AutoDeploymentMode,
    revisionWeights: RevisionWeightList,
    regions: RegionList,
    scalingConfig: S.optional(ScalingConfig),
    throttleConfig: S.optional(ThrottleConfig),
    state: EndpointState,
    stateReason: S.String,
    updateStatus: S.optional(EndpointUpdateStatus),
    updateStatusReason: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "FunctionEndpointSummary" }) as any as S.Schema<FunctionEndpointSummary>;
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
export const CreateWebFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionName: S.String,
    functionArn: S.String,
    state: FunctionState,
    stateReason: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    revision: S.optional(FunctionRevisionSummary),
    endpoint: S.optional(FunctionEndpointSummary),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "CreateWebFunctionResponse",
}) as any as S.Schema<CreateWebFunctionResponse>;
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
export const CreateWebFunctionEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionName: S.String.pipe(T.HttpLabel("functionName")),
    endpointName: S.String,
    description: S.optional(S.String),
    endpointType: EndpointType,
    authType: AuthType,
    autoDeploymentMode: S.optional(AutoDeploymentMode),
    revisionWeights: S.optional(RevisionWeightList),
    regions: S.optional(RegionList),
    scalingConfig: S.optional(ScalingConfig),
    throttleConfig: S.optional(ThrottleConfig),
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
).annotate({
  identifier: "CreateWebFunctionEndpointRequest",
}) as any as S.Schema<CreateWebFunctionEndpointRequest>;
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
export const RegionalEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    authType: AuthType,
    revisionWeights: RevisionWeightList,
    scalingConfig: S.optional(ScalingConfig),
    throttleConfig: S.optional(ThrottleConfig),
    state: EndpointState,
    stateReason: S.String,
    updateStatus: S.optional(EndpointUpdateStatus),
    updateStatusReason: S.optional(S.String),
  }),
).annotate({ identifier: "RegionalEndpoint" }) as any as S.Schema<RegionalEndpoint>;
export type RegionalEndpoints = { [key: string]: RegionalEndpoint | undefined };
export const RegionalEndpoints = /*@__PURE__*/ S.Record(
  S.String,
  RegionalEndpoint.pipe(S.optional),
);
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
export const CreateWebFunctionEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionArn: S.String,
    endpointArn: S.String,
    endpointName: S.String,
    description: S.optional(S.String),
    endpointType: EndpointType,
    domainName: S.String,
    authType: AuthType,
    autoDeploymentMode: AutoDeploymentMode,
    revisionWeights: RevisionWeightList,
    regions: RegionList,
    scalingConfig: S.optional(ScalingConfig),
    throttleConfig: S.optional(ThrottleConfig),
    state: EndpointState,
    stateReason: S.String,
    updateStatus: S.optional(EndpointUpdateStatus),
    updateStatusReason: S.optional(S.String),
    regionalEndpoints: RegionalEndpoints,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateWebFunctionEndpointResponse",
}) as any as S.Schema<CreateWebFunctionEndpointResponse>;
export interface CreateWebFunctionRevisionRequest {
  functionName: string;
  description?: string;
  kmsKeyArn?: string;
  buildConfig: BuildConfig;
  serviceConfig: ServiceConfig;
}
export const CreateWebFunctionRevisionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionName: S.String.pipe(T.HttpLabel("functionName")),
    description: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    buildConfig: BuildConfig,
    serviceConfig: ServiceConfig,
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
).annotate({
  identifier: "CreateWebFunctionRevisionRequest",
}) as any as S.Schema<CreateWebFunctionRevisionRequest>;
export interface RevisionError {
  attribute: string;
  errorCode: string;
  errorMessage: string;
}
export const RevisionError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: S.String, errorCode: S.String, errorMessage: S.String }),
).annotate({ identifier: "RevisionError" }) as any as S.Schema<RevisionError>;
export type RevisionErrors = RevisionError[];
export const RevisionErrors = /*@__PURE__*/ S.Array(RevisionError);
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
export const CreateWebFunctionRevisionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionArn: S.String,
    revisionArn: S.String,
    revisionId: S.String,
    description: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    buildConfig: BuildConfig,
    serviceConfig: ServiceConfig,
    state: RevisionState,
    stateReason: S.String,
    errors: S.optional(RevisionErrors),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateWebFunctionRevisionResponse",
}) as any as S.Schema<CreateWebFunctionRevisionResponse>;
export type ResourceArn = string;
export type PolicyRevisionId = string;
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
  revisionId?: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface DeleteWebFunctionRequest {
  functionName: string;
}
export const DeleteWebFunctionRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "DeleteWebFunctionRequest" }) as any as S.Schema<DeleteWebFunctionRequest>;
export interface DeleteWebFunctionResponse {}
export const DeleteWebFunctionResponse = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteWebFunctionResponse",
}) as any as S.Schema<DeleteWebFunctionResponse>;
export interface DeleteWebFunctionEndpointRequest {
  functionName: string;
  endpointName: string;
}
export const DeleteWebFunctionEndpointRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({
  identifier: "DeleteWebFunctionEndpointRequest",
}) as any as S.Schema<DeleteWebFunctionEndpointRequest>;
export interface DeleteWebFunctionEndpointResponse {}
export const DeleteWebFunctionEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWebFunctionEndpointResponse",
}) as any as S.Schema<DeleteWebFunctionEndpointResponse>;
export interface DeleteWebFunctionRevisionRequest {
  functionName: string;
  revisionId: string;
}
export const DeleteWebFunctionRevisionRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({
  identifier: "DeleteWebFunctionRevisionRequest",
}) as any as S.Schema<DeleteWebFunctionRevisionRequest>;
export interface DeleteWebFunctionRevisionResponse {}
export const DeleteWebFunctionRevisionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWebFunctionRevisionResponse",
}) as any as S.Schema<DeleteWebFunctionRevisionResponse>;
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "GetResourcePolicyRequest" }) as any as S.Schema<GetResourcePolicyRequest>;
export type ResourcePolicy = string;
export interface GetResourcePolicyResponse {
  policy: string;
  revisionId: string;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: S.String, revisionId: S.String }).pipe(
    S.encodeKeys({ policy: "Policy", revisionId: "RevisionId" }),
  ),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface GetWebAccountSettingsRequest {}
export const GetWebAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({
  identifier: "GetWebAccountSettingsRequest",
}) as any as S.Schema<GetWebAccountSettingsRequest>;
export interface AccountQuotas {
  maxTotalArmVCpus: number;
  maxTotalRateLimit: number;
  maxRevisionsPerFunction: number;
  maxEndpointsPerFunction: number;
}
export const AccountQuotas = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxTotalArmVCpus: S.Number,
    maxTotalRateLimit: S.Number,
    maxRevisionsPerFunction: S.Number,
    maxEndpointsPerFunction: S.Number,
  }),
).annotate({ identifier: "AccountQuotas" }) as any as S.Schema<AccountQuotas>;
export interface AccountUsage {
  functionCount: number;
}
export const AccountUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ functionCount: S.Number }),
).annotate({ identifier: "AccountUsage" }) as any as S.Schema<AccountUsage>;
export interface GetWebAccountSettingsResponse {
  accountQuotas: AccountQuotas;
  accountUsage: AccountUsage;
}
export const GetWebAccountSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountQuotas: AccountQuotas, accountUsage: AccountUsage }),
).annotate({
  identifier: "GetWebAccountSettingsResponse",
}) as any as S.Schema<GetWebAccountSettingsResponse>;
export interface GetWebFunctionRequest {
  functionName: string;
}
export const GetWebFunctionRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "GetWebFunctionRequest" }) as any as S.Schema<GetWebFunctionRequest>;
export interface GetWebFunctionResponse {
  functionName: string;
  functionArn: string;
  state: FunctionState;
  stateReason: string;
  createdAt: Date;
  updatedAt: Date;
}
export const GetWebFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionName: S.String,
    functionArn: S.String,
    state: FunctionState,
    stateReason: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "GetWebFunctionResponse" }) as any as S.Schema<GetWebFunctionResponse>;
export interface GetWebFunctionEndpointRequest {
  functionName: string;
  endpointName: string;
}
export const GetWebFunctionEndpointRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({
  identifier: "GetWebFunctionEndpointRequest",
}) as any as S.Schema<GetWebFunctionEndpointRequest>;
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
export const GetWebFunctionEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionArn: S.String,
    endpointArn: S.String,
    endpointName: S.String,
    description: S.optional(S.String),
    endpointType: EndpointType,
    domainName: S.String,
    authType: AuthType,
    autoDeploymentMode: AutoDeploymentMode,
    revisionWeights: RevisionWeightList,
    regions: RegionList,
    scalingConfig: S.optional(ScalingConfig),
    throttleConfig: S.optional(ThrottleConfig),
    state: EndpointState,
    stateReason: S.String,
    updateStatus: S.optional(EndpointUpdateStatus),
    updateStatusReason: S.optional(S.String),
    regionalEndpoints: RegionalEndpoints,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetWebFunctionEndpointResponse",
}) as any as S.Schema<GetWebFunctionEndpointResponse>;
export interface GetWebFunctionRevisionRequest {
  functionName: string;
  revisionId: string;
}
export const GetWebFunctionRevisionRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({
  identifier: "GetWebFunctionRevisionRequest",
}) as any as S.Schema<GetWebFunctionRevisionRequest>;
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
export const GetWebFunctionRevisionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionArn: S.String,
    revisionArn: S.String,
    revisionId: S.String,
    description: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    buildConfig: BuildConfig,
    serviceConfig: ServiceConfig,
    state: RevisionState,
    stateReason: S.String,
    errors: S.optional(RevisionErrors),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetWebFunctionRevisionResponse",
}) as any as S.Schema<GetWebFunctionRevisionResponse>;
export interface ListTagsRequest {
  resource: string;
}
export const ListTagsRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "ListTagsRequest" }) as any as S.Schema<ListTagsRequest>;
export interface ListTagsResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(Tags) }).pipe(S.encodeKeys({ tags: "Tags" })),
).annotate({ identifier: "ListTagsResponse" }) as any as S.Schema<ListTagsResponse>;
export type FilterValueList = string[];
export const FilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  name: string;
  values: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: FilterValueList }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export type MaxResults = number;
export type NextToken = string;
export interface ListWebFunctionEndpointsRequest {
  functionName: string;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListWebFunctionEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionName: S.String.pipe(T.HttpLabel("functionName")),
    filters: S.optional(FilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2025-03-07/web-functions/{functionName}/list-endpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWebFunctionEndpointsRequest",
}) as any as S.Schema<ListWebFunctionEndpointsRequest>;
export type FunctionEndpointSummaryList = FunctionEndpointSummary[];
export const FunctionEndpointSummaryList = /*@__PURE__*/ S.Array(FunctionEndpointSummary);
export interface ListWebFunctionEndpointsResponse {
  endpoints: FunctionEndpointSummary[];
  nextToken?: string;
}
export const ListWebFunctionEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoints: FunctionEndpointSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListWebFunctionEndpointsResponse",
}) as any as S.Schema<ListWebFunctionEndpointsResponse>;
export interface ListWebFunctionRevisionsRequest {
  functionName: string;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListWebFunctionRevisionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionName: S.String.pipe(T.HttpLabel("functionName")),
    filters: S.optional(FilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2025-03-07/web-functions/{functionName}/list-revisions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWebFunctionRevisionsRequest",
}) as any as S.Schema<ListWebFunctionRevisionsRequest>;
export type FunctionRevisionSummaryList = FunctionRevisionSummary[];
export const FunctionRevisionSummaryList = /*@__PURE__*/ S.Array(FunctionRevisionSummary);
export interface ListWebFunctionRevisionsResponse {
  revisions: FunctionRevisionSummary[];
  nextToken?: string;
}
export const ListWebFunctionRevisionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ revisions: FunctionRevisionSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListWebFunctionRevisionsResponse",
}) as any as S.Schema<ListWebFunctionRevisionsResponse>;
export interface ListWebFunctionsRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListWebFunctionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(FilterList),
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
).annotate({ identifier: "ListWebFunctionsRequest" }) as any as S.Schema<ListWebFunctionsRequest>;
export interface FunctionSummary {
  functionName: string;
  functionArn: string;
  state: FunctionState;
  stateReason: string;
  createdAt: Date;
  updatedAt: Date;
}
export const FunctionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionName: S.String,
    functionArn: S.String,
    state: FunctionState,
    stateReason: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "FunctionSummary" }) as any as S.Schema<FunctionSummary>;
export type FunctionSummaryList = FunctionSummary[];
export const FunctionSummaryList = /*@__PURE__*/ S.Array(FunctionSummary);
export interface ListWebFunctionsResponse {
  functions: FunctionSummary[];
  nextToken?: string;
}
export const ListWebFunctionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ functions: FunctionSummaryList, nextToken: S.optional(S.String) }),
).annotate({ identifier: "ListWebFunctionsResponse" }) as any as S.Schema<ListWebFunctionsResponse>;
export interface PutResourcePolicyRequest {
  resourceArn: string;
  policy: string;
  revisionId?: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "PutResourcePolicyRequest" }) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  policy: string;
  revisionId: string;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: S.String, revisionId: S.String }).pipe(
    S.encodeKeys({ policy: "Policy", revisionId: "RevisionId" }),
  ),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface TagResourceRequest {
  resource: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resource: S.String.pipe(T.HttpLabel("resource")), tags: Tags })
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
).annotate({ identifier: "TagResourceRequest" }) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resource: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resource: S.String.pipe(T.HttpLabel("resource")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
).annotate({ identifier: "UntagResourceRequest" }) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
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
export const UpdateWebFunctionEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionName: S.String.pipe(T.HttpLabel("functionName")),
    endpointName: S.String.pipe(T.HttpLabel("endpointName")),
    description: S.optional(S.String),
    authType: S.optional(AuthType),
    autoDeploymentMode: S.optional(AutoDeploymentMode),
    revisionWeights: S.optional(RevisionWeightList),
    scalingConfig: S.optional(ScalingConfig),
    throttleConfig: S.optional(ThrottleConfig),
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
).annotate({
  identifier: "UpdateWebFunctionEndpointRequest",
}) as any as S.Schema<UpdateWebFunctionEndpointRequest>;
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
export const UpdateWebFunctionEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionArn: S.String,
    endpointArn: S.String,
    endpointName: S.String,
    description: S.optional(S.String),
    endpointType: EndpointType,
    domainName: S.String,
    authType: AuthType,
    autoDeploymentMode: AutoDeploymentMode,
    revisionWeights: RevisionWeightList,
    regions: RegionList,
    scalingConfig: S.optional(ScalingConfig),
    throttleConfig: S.optional(ThrottleConfig),
    state: EndpointState,
    stateReason: S.String,
    updateStatus: S.optional(EndpointUpdateStatus),
    updateStatusReason: S.optional(S.String),
    regionalEndpoints: RegionalEndpoints,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateWebFunctionEndpointResponse",
}) as any as S.Schema<UpdateWebFunctionEndpointResponse>;
export type CreateWebFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a web function with an initial revision and endpoint. To create a web function, you provide the function name, revision configuration (code and service settings), and endpoint configuration.
 *
 * To use this operation, you must have the `CreateWebFunction` permission on the web function. You don't need separate permissions for the initial revision or endpoint.
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const createWebFunction: API.OperationMethod<
  CreateWebFunctionRequest,
  CreateWebFunctionResponse,
  CreateWebFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWebFunctionRequest,
  output: CreateWebFunctionResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const createWebFunctionEndpoint: API.OperationMethod<
  CreateWebFunctionEndpointRequest,
  CreateWebFunctionEndpointResponse,
  CreateWebFunctionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWebFunctionEndpointRequest,
  output: CreateWebFunctionEndpointResponse,
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
  | CommonErrors;
/**
 * Creates an immutable revision for a web function. A revision represents a specific version of the function code and configuration.
 *
 * To use this operation, you must have the `CreateWebFunctionRevision` permission on the web function, not on the revision being created.
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const createWebFunctionRevision: API.OperationMethod<
  CreateWebFunctionRevisionRequest,
  CreateWebFunctionRevisionResponse,
  CreateWebFunctionRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWebFunctionRevisionRequest,
  output: CreateWebFunctionRevisionResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const deleteWebFunction: API.OperationMethod<
  DeleteWebFunctionRequest,
  DeleteWebFunctionResponse,
  DeleteWebFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWebFunctionRequest,
  output: DeleteWebFunctionResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const deleteWebFunctionEndpoint: API.OperationMethod<
  DeleteWebFunctionEndpointRequest,
  DeleteWebFunctionEndpointResponse,
  DeleteWebFunctionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWebFunctionEndpointRequest,
  output: DeleteWebFunctionEndpointResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const deleteWebFunctionRevision: API.OperationMethod<
  DeleteWebFunctionRevisionRequest,
  DeleteWebFunctionRevisionResponse,
  DeleteWebFunctionRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWebFunctionRevisionRequest,
  output: DeleteWebFunctionRevisionResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const getWebAccountSettings: API.OperationMethod<
  GetWebAccountSettingsRequest,
  GetWebAccountSettingsResponse,
  GetWebAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWebAccountSettingsRequest,
  output: GetWebAccountSettingsResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const getWebFunction: API.OperationMethod<
  GetWebFunctionRequest,
  GetWebFunctionResponse,
  GetWebFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWebFunctionRequest,
  output: GetWebFunctionResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const getWebFunctionEndpoint: API.OperationMethod<
  GetWebFunctionEndpointRequest,
  GetWebFunctionEndpointResponse,
  GetWebFunctionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWebFunctionEndpointRequest,
  output: GetWebFunctionEndpointResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const getWebFunctionRevision: API.OperationMethod<
  GetWebFunctionRevisionRequest,
  GetWebFunctionRevisionResponse,
  GetWebFunctionRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWebFunctionRevisionRequest,
  output: GetWebFunctionRevisionResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsRequest,
  output: ListTagsResponse,
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
 * Lists endpoints for a web function. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const listWebFunctionEndpoints: API.PaginatedOperationMethod<
  ListWebFunctionEndpointsRequest,
  ListWebFunctionEndpointsResponse,
  ListWebFunctionEndpointsError,
  Credentials | HttpClient.HttpClient,
  FunctionEndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWebFunctionEndpointsRequest,
  output: ListWebFunctionEndpointsResponse,
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
 * Lists revisions for a web function. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const listWebFunctionRevisions: API.PaginatedOperationMethod<
  ListWebFunctionRevisionsRequest,
  ListWebFunctionRevisionsResponse,
  ListWebFunctionRevisionsError,
  Credentials | HttpClient.HttpClient,
  FunctionRevisionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWebFunctionRevisionsRequest,
  output: ListWebFunctionRevisionsResponse,
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
 * Lists web functions in your account. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const listWebFunctions: API.PaginatedOperationMethod<
  ListWebFunctionsRequest,
  ListWebFunctionsResponse,
  ListWebFunctionsError,
  Credentials | HttpClient.HttpClient,
  FunctionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWebFunctionsRequest,
  output: ListWebFunctionsResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
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
 *
 * This API is experimental and for internal AWS use only. It is not yet available to external customers.
 */
export const updateWebFunctionEndpoint: API.OperationMethod<
  UpdateWebFunctionEndpointRequest,
  UpdateWebFunctionEndpointResponse,
  UpdateWebFunctionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWebFunctionEndpointRequest,
  output: UpdateWebFunctionEndpointResponse,
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
