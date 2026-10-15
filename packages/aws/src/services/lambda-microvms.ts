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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Lambda Microvms",
  serviceShapeName: "LambdaMicrovms",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "lambda" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-09-09");
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
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InsufficientCapacityException
  extends /*@__PURE__*/ S.TaggedError<InsufficientCapacityException>()(
    "InsufficientCapacityException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      resourceId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
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
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
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
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type MicrovmIdentifier = string;
export type PositiveInteger = number;
export type PortNumber = number;
export interface PortRange {
  startPort: number;
  endPort: number;
}
export type PortSpecification =
  | { port: number; range?: never; allPorts?: never }
  | { port?: never; range: PortRange; allPorts?: never }
  | { port?: never; range?: never; allPorts: Record<string, never> };
export type ListOfPortSpecification = PortSpecification[];
export interface CreateMicrovmAuthTokenRequest {
  microvmIdentifier: string;
  expirationInMinutes: number;
  allowedPorts: PortSpecification[];
}
export type AuthTokenKey = string;
export type AuthTokenValue = string | redacted.Redacted<string>;
export type TokenParts = { [key: string]: string | redacted.Redacted<string> | undefined };
export interface CreateMicrovmAuthTokenResponse {
  authToken: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type NonBlankString = string;
export type Version = string;
export type RoleArn = string;
export type CodeArtifact = { uri: string };
export interface LoggingDisabled {}
export interface CloudWatchLogging {
  logGroup?: string;
  logStream?: string;
}
export type Logging =
  | { disabled: LoggingDisabled; cloudWatch?: never }
  | { disabled?: never; cloudWatch: CloudWatchLogging };
export type NetworkConnector = string;
export type NetworkConnectorList = string[];
export type Architecture = "ARM_64" | (string & {});
export interface CpuConfiguration {
  architecture: Architecture;
}
export type CpuConfigurationList = CpuConfiguration[];
export interface Resources {
  minimumMemoryInMiB: number;
}
export type ResourcesList = Resources[];
export type Capability = "ALL" | (string & {});
export type CapabilityList = Capability[];
export type HookState = "DISABLED" | "ENABLED" | (string & {});
export interface MicrovmHooks {
  run?: HookState;
  runTimeoutInSeconds?: number;
  resume?: HookState;
  resumeTimeoutInSeconds?: number;
  suspend?: HookState;
  suspendTimeoutInSeconds?: number;
  terminate?: HookState;
  terminateTimeoutInSeconds?: number;
}
export interface MicrovmImageHooks {
  ready?: HookState;
  readyTimeoutInSeconds?: number;
  validate?: HookState;
  validateTimeoutInSeconds?: number;
}
export interface Hooks {
  port?: number;
  microvmHooks?: MicrovmHooks;
  microvmImageHooks?: MicrovmImageHooks;
}
export type EnvironmentVariableKey = string;
export type EnvironmentVariableValue = string | redacted.Redacted<string>;
export type EnvironmentVariableMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type ImageName = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateMicrovmImageRequest {
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  name: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type MicrovmImageState =
  | "CREATING"
  | "CREATED"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATED"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETED"
  | (string & {});
export interface CreateMicrovmImageResponse {
  imageArn: string;
  name: string;
  state: MicrovmImageState;
  latestActiveImageVersion?: string;
  latestFailedImageVersion?: string;
  createdAt: Date;
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
  imageVersion: string;
}
export interface CreateMicrovmShellAuthTokenRequest {
  microvmIdentifier: string;
  expirationInMinutes: number;
}
export interface CreateMicrovmShellAuthTokenResponse {
  authToken: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type MicrovmImageIdentifier = string;
export interface DeleteMicrovmImageInput {
  imageIdentifier: string;
}
export interface DeleteMicrovmImageOutput {
  imageIdentifier: string;
  state: MicrovmImageState;
}
export interface DeleteMicrovmImageVersionInput {
  imageIdentifier: string;
  imageVersion: string;
}
export type MicrovmImageVersionState =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "DELETING"
  | "DELETED"
  | "DELETE_FAILED"
  | (string & {});
export interface DeleteMicrovmImageVersionOutput {
  imageIdentifier: string;
  imageVersion: string;
  state: MicrovmImageVersionState;
}
export interface GetMicrovmRequest {
  microvmIdentifier: string;
}
export type MicrovmState =
  | "PENDING"
  | "RUNNING"
  | "SUSPENDING"
  | "SUSPENDED"
  | "TERMINATING"
  | "TERMINATED"
  | (string & {});
export type MicrovmImageArn = string;
export interface IdlePolicy {
  maxIdleDurationSeconds: number;
  suspendedDurationSeconds: number;
  autoResumeEnabled: boolean;
}
export interface GetMicrovmResponse {
  microvmId: string;
  state: MicrovmState;
  endpoint: string;
  imageArn: string;
  imageVersion: string;
  executionRoleArn?: string;
  idlePolicy?: IdlePolicy;
  maximumDurationInSeconds: number;
  startedAt: Date;
  terminatedAt?: Date;
  stateReason?: string;
  ingressNetworkConnectors?: string[];
  egressNetworkConnectors?: string[];
}
export interface GetMicrovmImageInput {
  imageIdentifier: string;
}
export interface GetMicrovmImageOutput {
  imageArn: string;
  name: string;
  state: MicrovmImageState;
  latestActiveImageVersion?: string;
  latestFailedImageVersion?: string;
  createdAt: Date;
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
}
export interface GetMicrovmImageBuildInput {
  imageIdentifier: string;
  imageVersion: string;
  buildId: string;
}
export type BuildState = "PENDING" | "IN_PROGRESS" | "SUCCESSFUL" | "FAILED" | (string & {});
export type Chipset = "GRAVITON" | (string & {});
export interface SnapshotBuild {
  memorySnapshotSizeInBytes?: number;
  codeInstallSizeInBytes?: number;
  diskSnapshotSizeInBytes?: number;
}
export interface GetMicrovmImageBuildOutput {
  imageArn: string;
  imageVersion: string;
  buildId: string;
  buildState: BuildState;
  architecture: Architecture;
  chipset: Chipset;
  chipsetGeneration: string;
  stateReason?: string;
  createdAt: Date;
  snapshotBuild?: SnapshotBuild;
}
export interface GetMicrovmImageVersionInput {
  imageIdentifier: string;
  imageVersion: string;
}
export type MicrovmImageVersionStatus = "ACTIVE" | "INACTIVE" | (string & {});
export interface GetMicrovmImageVersionOutput {
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  imageArn: string;
  imageVersion: string;
  state: MicrovmImageVersionState;
  status: MicrovmImageVersionStatus;
  createdAt: Date;
  updatedAt?: Date;
  stateReason?: string;
  tags?: { [key: string]: string | undefined };
}
export interface ListManagedMicrovmImagesInput {
  maxResults?: number;
  nextToken?: string;
}
export interface ManagedMicrovmImageSummary {
  imageArn: string;
  createdAt: Date;
  updatedAt?: Date;
}
export type ManagedMicrovmImageSummaryList = ManagedMicrovmImageSummary[];
export interface ListManagedMicrovmImagesOutput {
  nextToken?: string;
  items: ManagedMicrovmImageSummary[];
}
export interface ListManagedMicrovmImageVersionsInput {
  maxResults?: number;
  nextToken?: string;
  imageIdentifier: string;
}
export type ManagedMicrovmImageVersionStatus = "AVAILABLE" | "DEPRECATED" | (string & {});
export interface ManagedMicrovmImageVersion {
  imageArn: string;
  imageVersion: string;
  status?: ManagedMicrovmImageVersionStatus;
  createdAt: Date;
  updatedAt?: Date;
}
export type ManagedMicrovmImageVersionList = ManagedMicrovmImageVersion[];
export interface ListManagedMicrovmImageVersionsOutput {
  nextToken?: string;
  items: ManagedMicrovmImageVersion[];
}
export interface ListMicrovmImageBuildsInput {
  maxResults?: number;
  nextToken?: string;
  imageIdentifier: string;
  imageVersion: string;
  architecture?: Architecture;
  chipset?: Chipset;
  chipsetGeneration?: string;
}
export interface MicrovmImageBuildSummary {
  imageArn: string;
  imageVersion: string;
  buildId: string;
  buildState: BuildState;
  architecture: Architecture;
  chipset: Chipset;
  chipsetGeneration: string;
  stateReason?: string;
  createdAt: Date;
}
export type MicrovmImageBuildSummaries = MicrovmImageBuildSummary[];
export interface ListMicrovmImageBuildsOutput {
  nextToken?: string;
  items: MicrovmImageBuildSummary[];
}
export interface ListMicrovmImagesRequest {
  maxResults?: number;
  nextToken?: string;
  nameFilter?: string;
}
export interface MicrovmImageSummary {
  imageArn: string;
  name: string;
  state: MicrovmImageState;
  latestActiveImageVersion?: string;
  latestFailedImageVersion?: string;
  createdAt: Date;
}
export type MicrovmImageSummaries = MicrovmImageSummary[];
export interface ListMicrovmImagesResponse {
  nextToken?: string;
  items: MicrovmImageSummary[];
}
export interface ListMicrovmImageVersionsInput {
  maxResults?: number;
  nextToken?: string;
  imageIdentifier: string;
}
export interface MicrovmImageVersionSummary {
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  imageArn: string;
  imageVersion: string;
  state: MicrovmImageVersionState;
  status: MicrovmImageVersionStatus;
  createdAt: Date;
  updatedAt?: Date;
  stateReason?: string;
  tags?: { [key: string]: string | undefined };
}
export type MicrovmImageVersionSummaryList = MicrovmImageVersionSummary[];
export interface ListMicrovmImageVersionsOutput {
  nextToken?: string;
  items: MicrovmImageVersionSummary[];
}
export interface ListMicrovmsRequest {
  maxResults?: number;
  nextToken?: string;
  imageIdentifier?: string;
  imageVersion?: string;
}
export interface MicrovmItem {
  microvmId: string;
  state: MicrovmState;
  imageArn: string;
  imageVersion: string;
  startedAt: Date;
}
export type MicrovmItemList = MicrovmItem[];
export interface ListMicrovmsResponse {
  nextToken?: string;
  items: MicrovmItem[];
}
export type TaggableResource = string;
export interface ListTagsRequest {
  Resource: string;
}
export interface ListTagsResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ResumeMicrovmRequest {
  microvmIdentifier: string;
}
export interface ResumeMicrovmResponse {}
export type RunHookPayload = string | redacted.Redacted<string>;
export interface RunMicrovmRequest {
  ingressNetworkConnectors?: string[];
  egressNetworkConnectors?: string[];
  imageIdentifier: string;
  imageVersion?: string;
  executionRoleArn?: string;
  idlePolicy?: IdlePolicy;
  logging?: Logging;
  runHookPayload?: string | redacted.Redacted<string>;
  maximumDurationInSeconds?: number;
  clientToken?: string;
}
export interface RunMicrovmResponse {
  microvmId: string;
  state: MicrovmState;
  endpoint: string;
  imageArn: string;
  imageVersion: string;
  executionRoleArn?: string;
  idlePolicy?: IdlePolicy;
  maximumDurationInSeconds: number;
  startedAt: Date;
  terminatedAt?: Date;
  stateReason?: string;
  ingressNetworkConnectors?: string[];
  egressNetworkConnectors?: string[];
}
export interface SuspendMicrovmRequest {
  microvmIdentifier: string;
}
export interface SuspendMicrovmResponse {}
export interface TagResourceRequest {
  Resource: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface TerminateMicrovmRequest {
  microvmIdentifier: string;
}
export interface TerminateMicrovmResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  Resource: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateMicrovmImageRequest {
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  imageIdentifier: string;
  clientToken?: string;
}
export interface UpdateMicrovmImageResponse {
  imageArn: string;
  name: string;
  state: MicrovmImageState;
  latestActiveImageVersion?: string;
  latestFailedImageVersion?: string;
  createdAt: Date;
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  updatedAt: Date;
  imageVersion: string;
}
export interface UpdateMicrovmImageVersionRequest {
  imageIdentifier: string;
  imageVersion: string;
  status: MicrovmImageVersionStatus;
}
export interface UpdateMicrovmImageVersionResponse {
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  imageArn: string;
  imageVersion: string;
  state: MicrovmImageVersionState;
  status: MicrovmImageVersionStatus;
  createdAt: Date;
  updatedAt?: Date;
  stateReason?: string;
  tags?: { [key: string]: string | undefined };
}
export type CreateMicrovmAuthTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an authentication token for accessing a running MicroVM. The token grants access to the specified ports on the MicroVM endpoint.
 */
export const createMicrovmAuthToken: API.OperationMethod<
  CreateMicrovmAuthTokenRequest,
  CreateMicrovmAuthTokenResponse,
  CreateMicrovmAuthTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3, __c0, 3) as any as S.Schema<CreateMicrovmAuthTokenRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<CreateMicrovmAuthTokenResponse>,
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
  operationName: "CreateMicrovmAuthToken",
}));

export type CreateMicrovmImageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a MicroVM image from the specified code artifact and base image. The build is asynchronous -- the image transitions from CREATING to CREATED on success, or CREATE_FAILED on failure. Use GetMicrovmImage to poll for completion.
 */
export const createMicrovmImage: API.OperationMethod<
  CreateMicrovmImageRequest,
  CreateMicrovmImageResponse,
  CreateMicrovmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<CreateMicrovmImageRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<CreateMicrovmImageResponse>,
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
  operationName: "CreateMicrovmImage",
}));

export type CreateMicrovmShellAuthTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a shell authentication token for interactive shell access to a running MicroVM. The MicroVM must have been run with the SHELL_INGRESS network connector attached.
 */
export const createMicrovmShellAuthToken: API.OperationMethod<
  CreateMicrovmShellAuthTokenRequest,
  CreateMicrovmShellAuthTokenResponse,
  CreateMicrovmShellAuthTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateMicrovmShellAuthTokenRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<CreateMicrovmShellAuthTokenResponse>,
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
  operationName: "CreateMicrovmShellAuthToken",
}));

export type DeleteMicrovmImageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a MicroVM image. This operation is idempotent; deleting an image that has already been deleted succeeds without error.
 */
export const deleteMicrovmImage: API.OperationMethod<
  DeleteMicrovmImageInput,
  DeleteMicrovmImageOutput,
  DeleteMicrovmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DeleteMicrovmImageInput>,
  output: __S(161, __c10, 1) as any as S.Schema<DeleteMicrovmImageOutput>,
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
  operationName: "DeleteMicrovmImage",
}));

export type DeleteMicrovmImageVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific version of a MicroVM image. This operation is idempotent; deleting a version that has already been deleted succeeds without error.
 */
export const deleteMicrovmImageVersion: API.OperationMethod<
  DeleteMicrovmImageVersionInput,
  DeleteMicrovmImageVersionOutput,
  DeleteMicrovmImageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DeleteMicrovmImageVersionInput>,
  output: __S(177, __c11, 1) as any as S.Schema<DeleteMicrovmImageVersionOutput>,
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
  operationName: "DeleteMicrovmImageVersion",
}));

export type GetMicrovmError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific MicroVM, including its state, endpoint, image information, and configuration. The state field is eventually consistent -- determine readiness by connecting to the endpoint.
 */
export const getMicrovm: API.OperationMethod<
  GetMicrovmRequest,
  GetMicrovmResponse,
  GetMicrovmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<GetMicrovmRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<GetMicrovmResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMicrovm",
}));

export type GetMicrovmImageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a MicroVM image, including its state, versions, and configuration.
 */
export const getMicrovmImage: API.OperationMethod<
  GetMicrovmImageInput,
  GetMicrovmImageOutput,
  GetMicrovmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<GetMicrovmImageInput>,
  output: __S(225, __c14, 1) as any as S.Schema<GetMicrovmImageOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMicrovmImage",
}));

export type GetMicrovmImageBuildError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific MicroVM image build, including its state, target architecture, and snapshot information.
 */
export const getMicrovmImageBuild: API.OperationMethod<
  GetMicrovmImageBuildInput,
  GetMicrovmImageBuildOutput,
  GetMicrovmImageBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<GetMicrovmImageBuildInput>,
  output: __S(242, __c15, 2) as any as S.Schema<GetMicrovmImageBuildOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMicrovmImageBuild",
}));

export type GetMicrovmImageVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific version of a MicroVM image, including its configuration, state, and build information.
 */
export const getMicrovmImageVersion: API.OperationMethod<
  GetMicrovmImageVersionInput,
  GetMicrovmImageVersionOutput,
  GetMicrovmImageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<GetMicrovmImageVersionInput>,
  output: __S(272, __c17, 0) as any as S.Schema<GetMicrovmImageVersionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMicrovmImageVersion",
}));

export type ListManagedMicrovmImagesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists AWS managed MicroVM images available for use as base images. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listManagedMicrovmImages: API.PaginatedOperationMethod<
  ListManagedMicrovmImagesInput,
  ListManagedMicrovmImagesOutput,
  ListManagedMicrovmImagesError,
  Credentials | HttpClient.HttpClient,
  ManagedMicrovmImageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListManagedMicrovmImagesInput>,
  output: __S(291, __c18, 3) as any as S.Schema<ListManagedMicrovmImagesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedMicrovmImages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedMicrovmImageVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists versions of a managed MicroVM image. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listManagedMicrovmImageVersions: API.PaginatedOperationMethod<
  ListManagedMicrovmImageVersionsInput,
  ListManagedMicrovmImageVersionsOutput,
  ListManagedMicrovmImageVersionsError,
  Credentials | HttpClient.HttpClient,
  ManagedMicrovmImageVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ListManagedMicrovmImageVersionsInput>,
  output: __S(307, __c19, 3) as any as S.Schema<ListManagedMicrovmImageVersionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedMicrovmImageVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMicrovmImageBuildsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists builds for a MicroVM image version with optional filtering by architecture and chipset. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listMicrovmImageBuilds: API.PaginatedOperationMethod<
  ListMicrovmImageBuildsInput,
  ListMicrovmImageBuildsOutput,
  ListMicrovmImageBuildsError,
  Credentials | HttpClient.HttpClient,
  MicrovmImageBuildSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<ListMicrovmImageBuildsInput>,
  output: __S(323, __c20, 3) as any as S.Schema<ListMicrovmImageBuildsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrovmImageBuilds",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMicrovmImagesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists MicroVM images in the account with optional name filtering. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listMicrovmImages: API.PaginatedOperationMethod<
  ListMicrovmImagesRequest,
  ListMicrovmImagesResponse,
  ListMicrovmImagesError,
  Credentials | HttpClient.HttpClient,
  MicrovmImageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<ListMicrovmImagesRequest>,
  output: __S(339, __c21, 3) as any as S.Schema<ListMicrovmImagesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrovmImages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMicrovmImageVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists versions of a MicroVM image. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listMicrovmImageVersions: API.PaginatedOperationMethod<
  ListMicrovmImageVersionsInput,
  ListMicrovmImageVersionsOutput,
  ListMicrovmImageVersionsError,
  Credentials | HttpClient.HttpClient,
  MicrovmImageVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<ListMicrovmImageVersionsInput>,
  output: __S(354, __c22, 2) as any as S.Schema<ListMicrovmImageVersionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrovmImageVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMicrovmsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists MicroVMs in the account with optional filtering by image and version. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listMicrovms: API.PaginatedOperationMethod<
  ListMicrovmsRequest,
  ListMicrovmsResponse,
  ListMicrovmsError,
  Credentials | HttpClient.HttpClient,
  MicrovmItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<ListMicrovmsRequest>,
  output: __S(371, __c23, 3) as any as S.Schema<ListMicrovmsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrovms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the tags associated with a Lambda MicroVM resource.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<ListTagsRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<ListTagsResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

export type ResumeMicrovmError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resumes a suspended MicroVM, restoring it to RUNNING state with all state intact. The MicroVM must be in SUSPENDED state.
 */
export const resumeMicrovm: API.OperationMethod<
  ResumeMicrovmRequest,
  ResumeMicrovmResponse,
  ResumeMicrovmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<ResumeMicrovmRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<ResumeMicrovmResponse>,
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
  operationName: "ResumeMicrovm",
}));

export type RunMicrovmError =
  | AccessDeniedException
  | ConflictException
  | InsufficientCapacityException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Runs a new MicroVM from the specified image. The MicroVM starts in PENDING state and transitions to RUNNING once provisioning completes. To connect, generate an authentication token using CreateMicrovmAuthToken.
 */
export const runMicrovm: API.OperationMethod<
  RunMicrovmRequest,
  RunMicrovmResponse,
  RunMicrovmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<RunMicrovmRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<RunMicrovmResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InsufficientCapacityException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RunMicrovm",
}));

export type SuspendMicrovmError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Suspends a running MicroVM, preserving its full memory and disk state. The MicroVM transitions through SUSPENDING to SUSPENDED. To restore, call ResumeMicrovm or send traffic to the endpoint if autoResumeEnabled is true.
 */
export const suspendMicrovm: API.OperationMethod<
  SuspendMicrovmRequest,
  SuspendMicrovmResponse,
  SuspendMicrovmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<SuspendMicrovmRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<SuspendMicrovmResponse>,
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
  operationName: "SuspendMicrovm",
}));

export type TagResourceError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds tags to a Lambda MicroVM resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateMicrovmError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Terminates a MicroVM. This operation is idempotent; terminating a MicroVM that has already been terminated succeeds without error.
 */
export const terminateMicrovm: API.OperationMethod<
  TerminateMicrovmRequest,
  TerminateMicrovmResponse,
  TerminateMicrovmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<TerminateMicrovmRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<TerminateMicrovmResponse>,
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
  operationName: "TerminateMicrovm",
}));

export type UntagResourceError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes tags from a Lambda MicroVM resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(481, __c30, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateMicrovmImageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a MicroVM image and triggers a new version build. This operation uses PUT semantics -- all required fields (codeArtifact, baseImageArn, buildRoleArn) must be provided with every request.
 */
export const updateMicrovmImage: API.OperationMethod<
  UpdateMicrovmImageRequest,
  UpdateMicrovmImageResponse,
  UpdateMicrovmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<UpdateMicrovmImageRequest>,
  output: __S(497, __c31, 1) as any as S.Schema<UpdateMicrovmImageResponse>,
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
  operationName: "UpdateMicrovmImage",
}));

export type UpdateMicrovmImageVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of a specific MicroVM image version.
 */
export const updateMicrovmImageVersion: API.OperationMethod<
  UpdateMicrovmImageVersionRequest,
  UpdateMicrovmImageVersionResponse,
  UpdateMicrovmImageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<UpdateMicrovmImageVersionRequest>,
  output: __S(272, __c17, 0) as any as S.Schema<UpdateMicrovmImageVersionResponse>,
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
  operationName: "UpdateMicrovmImageVersion",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ startPort: S.Number, endPort: S.Number })).annotate({
        identifier: "PortRange",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ port: S.Number }),
        /*@__PURE__*/ S.Struct({ range: __S(0, __c0, 0) }),
        /*@__PURE__*/ S.Struct({ allPorts: /*@__PURE__*/ S.Struct({}) }),
      ]);
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")),
          expirationInMinutes: S.Number,
          allowedPorts: __S(2, __c0, 2),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2025-09-09/microvms/{microvmIdentifier}/auth-token" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMicrovmAuthTokenRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ authToken: __S(16, __c1, 0) })).annotate({
        identifier: "CreateMicrovmAuthTokenResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          baseImageArn: S.String,
          baseImageVersion: S.optional(S.String),
          buildRoleArn: S.String,
          description: S.optional(S.String),
          codeArtifact: __S(128, __c8, 0),
          logging: S.optional(__S(113, __c7, 1)),
          egressNetworkConnectors: S.optional(__S(64, __c4, 0)),
          cpuConfigurations: S.optional(__S(130, __c8, 2)),
          resources: S.optional(__S(132, __c8, 4)),
          additionalOsCapabilities: S.optional(__S(133, __c8, 5)),
          hooks: S.optional(__S(136, __c8, 8)),
          environmentVariables: S.optional(__S(16, __c1, 0)),
          name: S.String,
          tags: S.optional(__S(80, __c5, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2025-09-09/microvm-images" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMicrovmImageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          imageArn: S.String,
          name: S.String,
          state: S.String,
          latestActiveImageVersion: S.optional(S.String),
          latestFailedImageVersion: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          baseImageArn: S.String,
          baseImageVersion: S.optional(S.String),
          buildRoleArn: S.String,
          description: S.optional(S.String),
          codeArtifact: __S(128, __c8, 0),
          logging: S.optional(__S(113, __c7, 1)),
          egressNetworkConnectors: S.optional(__S(64, __c4, 0)),
          cpuConfigurations: S.optional(__S(130, __c8, 2)),
          resources: S.optional(__S(132, __c8, 4)),
          additionalOsCapabilities: S.optional(__S(133, __c8, 5)),
          hooks: S.optional(__S(136, __c8, 8)),
          environmentVariables: S.optional(__S(16, __c1, 0)),
          tags: S.optional(__S(80, __c5, 0)),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          imageVersion: S.String,
        }),
      ).annotate({ identifier: "CreateMicrovmImageResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "LoggingDisabled" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroup: S.optional(S.String), logStream: S.optional(S.String) }),
      ).annotate({ identifier: "CloudWatchLogging" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ disabled: __S(96, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ cloudWatch: __S(112, __c7, 0) }),
      ]);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ uri: S.String })]);
    case 1:
      return S.suspend(() => S.Struct({ architecture: S.String })).annotate({
        identifier: "CpuConfiguration",
      });
    case 2:
      return S.Array(__S(129, __c8, 1));
    case 3:
      return S.suspend(() => S.Struct({ minimumMemoryInMiB: S.Number })).annotate({
        identifier: "Resources",
      });
    case 4:
      return S.Array(__S(131, __c8, 3));
    case 5:
      return S.Array(S.String);
    case 6:
      return S.suspend(() =>
        S.Struct({
          run: S.optional(S.String),
          runTimeoutInSeconds: S.optional(S.Number),
          resume: S.optional(S.String),
          resumeTimeoutInSeconds: S.optional(S.Number),
          suspend: S.optional(S.String),
          suspendTimeoutInSeconds: S.optional(S.Number),
          terminate: S.optional(S.String),
          terminateTimeoutInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MicrovmHooks" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          ready: S.optional(S.String),
          readyTimeoutInSeconds: S.optional(S.Number),
          validate: S.optional(S.String),
          validateTimeoutInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MicrovmImageHooks" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          port: S.optional(S.Number),
          microvmHooks: S.optional(__S(134, __c8, 6)),
          microvmImageHooks: S.optional(__S(135, __c8, 7)),
        }),
      ).annotate({ identifier: "Hooks" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")),
          expirationInMinutes: S.Number,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2025-09-09/microvms/{microvmIdentifier}/shell-auth-token",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMicrovmShellAuthTokenRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2025-09-09/microvm-images/{imageIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMicrovmImageInput" });
    case 1:
      return S.suspend(() => S.Struct({ imageIdentifier: S.String, state: S.String })).annotate({
        identifier: "DeleteMicrovmImageOutput",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
          imageVersion: S.String.pipe(T.HttpLabel("imageVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMicrovmImageVersionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ imageIdentifier: S.String, imageVersion: S.String, state: S.String }),
      ).annotate({ identifier: "DeleteMicrovmImageVersionOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-09-09/microvms/{microvmIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMicrovmRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxIdleDurationSeconds: S.Number,
          suspendedDurationSeconds: S.Number,
          autoResumeEnabled: S.Boolean,
        }),
      ).annotate({ identifier: "IdlePolicy" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          microvmId: S.String,
          state: S.String,
          endpoint: S.String,
          imageArn: S.String,
          imageVersion: S.String,
          executionRoleArn: S.optional(S.String),
          idlePolicy: S.optional(__S(208, __c13, 0)),
          maximumDurationInSeconds: S.Number,
          startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          terminatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stateReason: S.optional(S.String),
          ingressNetworkConnectors: S.optional(__S(64, __c4, 0)),
          egressNetworkConnectors: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "GetMicrovmResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-09-09/microvm-images/{imageIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMicrovmImageInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          imageArn: S.String,
          name: S.String,
          state: S.String,
          latestActiveImageVersion: S.optional(S.String),
          latestFailedImageVersion: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(80, __c5, 0)),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetMicrovmImageOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
          imageVersion: S.String.pipe(T.HttpLabel("imageVersion")),
          buildId: S.String.pipe(T.HttpLabel("buildId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}/builds/{buildId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMicrovmImageBuildInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          memorySnapshotSizeInBytes: S.optional(S.Number),
          codeInstallSizeInBytes: S.optional(S.Number),
          diskSnapshotSizeInBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SnapshotBuild" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          imageArn: S.String,
          imageVersion: S.String,
          buildId: S.String,
          buildState: S.String,
          architecture: S.String,
          chipset: S.String,
          chipsetGeneration: S.String,
          stateReason: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          snapshotBuild: S.optional(__S(241, __c15, 1)),
        }),
      ).annotate({ identifier: "GetMicrovmImageBuildOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
          imageVersion: S.String.pipe(T.HttpLabel("imageVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMicrovmImageVersionInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          baseImageArn: S.String,
          baseImageVersion: S.optional(S.String),
          buildRoleArn: S.String,
          description: S.optional(S.String),
          codeArtifact: __S(128, __c8, 0),
          logging: S.optional(__S(113, __c7, 1)),
          egressNetworkConnectors: S.optional(__S(64, __c4, 0)),
          cpuConfigurations: S.optional(__S(130, __c8, 2)),
          resources: S.optional(__S(132, __c8, 4)),
          additionalOsCapabilities: S.optional(__S(133, __c8, 5)),
          hooks: S.optional(__S(136, __c8, 8)),
          environmentVariables: S.optional(__S(16, __c1, 0)),
          imageArn: S.String,
          imageVersion: S.String,
          state: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stateReason: S.optional(S.String),
          tags: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "GetMicrovmImageVersionOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-09-09/managed-microvm-images" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedMicrovmImagesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          imageArn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ManagedMicrovmImageSummary" });
    case 2:
      return S.Array(__S(289, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(290, __c18, 2) }),
      ).annotate({ identifier: "ListManagedMicrovmImagesOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2025-09-09/managed-microvm-images/{imageIdentifier}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedMicrovmImageVersionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          imageArn: S.String,
          imageVersion: S.String,
          status: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ManagedMicrovmImageVersion" });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(306, __c19, 2) }),
      ).annotate({ identifier: "ListManagedMicrovmImageVersionsOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
          imageVersion: S.String.pipe(T.HttpLabel("imageVersion")),
          architecture: S.optional(S.String).pipe(T.HttpQuery("architecture")),
          chipset: S.optional(S.String).pipe(T.HttpQuery("chipset")),
          chipsetGeneration: S.optional(S.String).pipe(T.HttpQuery("chipsetGeneration")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}/builds",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMicrovmImageBuildsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          imageArn: S.String,
          imageVersion: S.String,
          buildId: S.String,
          buildState: S.String,
          architecture: S.String,
          chipset: S.String,
          chipsetGeneration: S.String,
          stateReason: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "MicrovmImageBuildSummary" });
    case 2:
      return S.Array(__S(321, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(322, __c20, 2) }),
      ).annotate({ identifier: "ListMicrovmImageBuildsOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          nameFilter: S.optional(S.String).pipe(T.HttpQuery("nameFilter")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-09-09/microvm-images" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMicrovmImagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          imageArn: S.String,
          name: S.String,
          state: S.String,
          latestActiveImageVersion: S.optional(S.String),
          latestFailedImageVersion: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "MicrovmImageSummary" });
    case 2:
      return S.Array(__S(337, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(338, __c21, 2) }),
      ).annotate({ identifier: "ListMicrovmImagesResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMicrovmImageVersionsInput" });
    case 1:
      return S.Array(__S(272, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(353, __c22, 1) }),
      ).annotate({ identifier: "ListMicrovmImageVersionsOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          imageIdentifier: S.optional(S.String).pipe(T.HttpQuery("imageIdentifier")),
          imageVersion: S.optional(S.String).pipe(T.HttpQuery("imageVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-09-09/microvms" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMicrovmsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          microvmId: S.String,
          state: S.String,
          imageArn: S.String,
          imageVersion: S.String,
          startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "MicrovmItem" });
    case 2:
      return S.Array(__S(369, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(370, __c23, 2) }),
      ).annotate({ identifier: "ListMicrovmsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Resource: S.String.pipe(T.HttpLabel("Resource")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2017-03-31/tags/{Resource}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(80, __c5, 0)) })).annotate({
        identifier: "ListTagsResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2025-09-09/microvms/{microvmIdentifier}/resume" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResumeMicrovmRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ingressNetworkConnectors: S.optional(__S(64, __c4, 0)),
          egressNetworkConnectors: S.optional(__S(64, __c4, 0)),
          imageIdentifier: S.String,
          imageVersion: S.optional(S.String),
          executionRoleArn: S.optional(S.String),
          idlePolicy: S.optional(__S(208, __c13, 0)),
          logging: S.optional(__S(113, __c7, 1)),
          runHookPayload: S.optional(SensitiveString),
          maximumDurationInSeconds: S.optional(S.Number),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2025-09-09/microvms" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RunMicrovmRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2025-09-09/microvms/{microvmIdentifier}/suspend" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SuspendMicrovmRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Resource: S.String.pipe(T.HttpLabel("Resource")), Tags: __S(80, __c5, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2017-03-31/tags/{Resource}" }),
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
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2025-09-09/microvms/{microvmIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TerminateMicrovmRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Key")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Resource: S.String.pipe(T.HttpLabel("Resource")),
          TagKeys: __S(480, __c30, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2017-03-31/tags/{Resource}" }),
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
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          baseImageArn: S.String,
          baseImageVersion: S.optional(S.String),
          buildRoleArn: S.String,
          description: S.optional(S.String),
          codeArtifact: __S(128, __c8, 0),
          logging: S.optional(__S(113, __c7, 1)),
          egressNetworkConnectors: S.optional(__S(64, __c4, 0)),
          cpuConfigurations: S.optional(__S(130, __c8, 2)),
          resources: S.optional(__S(132, __c8, 4)),
          additionalOsCapabilities: S.optional(__S(133, __c8, 5)),
          hooks: S.optional(__S(136, __c8, 8)),
          environmentVariables: S.optional(__S(16, __c1, 0)),
          imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2025-09-09/microvm-images/{imageIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMicrovmImageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          imageArn: S.String,
          name: S.String,
          state: S.String,
          latestActiveImageVersion: S.optional(S.String),
          latestFailedImageVersion: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          baseImageArn: S.String,
          baseImageVersion: S.optional(S.String),
          buildRoleArn: S.String,
          description: S.optional(S.String),
          codeArtifact: __S(128, __c8, 0),
          logging: S.optional(__S(113, __c7, 1)),
          egressNetworkConnectors: S.optional(__S(64, __c4, 0)),
          cpuConfigurations: S.optional(__S(130, __c8, 2)),
          resources: S.optional(__S(132, __c8, 4)),
          additionalOsCapabilities: S.optional(__S(133, __c8, 5)),
          hooks: S.optional(__S(136, __c8, 8)),
          environmentVariables: S.optional(__S(16, __c1, 0)),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          imageVersion: S.String,
        }),
      ).annotate({ identifier: "UpdateMicrovmImageResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
          imageVersion: S.String.pipe(T.HttpLabel("imageVersion")),
          status: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMicrovmImageVersionRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
