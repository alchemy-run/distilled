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
  sdkId: "Lambda Microvms",
  target: "LambdaMicrovms",
  version: "2025-09-09",
  sigv4: "lambda",
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
                `https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://lambda.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://lambda.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class InsufficientCapacityException
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientCapacityException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message?: string; readonly retryAfterSeconds?: number }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ResourceConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceType?: string;
    readonly resourceId?: string;
  }> {}
export class ServiceException
  extends /*@__PURE__*/ TE.TaggedError("ServiceException", ["ServerError"], {
    status: 500,
  })<{ readonly Type?: string; readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type TokenParts = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
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
  environmentVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
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
  environmentVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
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
export type BuildState =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | (string & {});
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
  environmentVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
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
export type ManagedMicrovmImageVersionStatus =
  | "AVAILABLE"
  | "DEPRECATED"
  | (string & {});
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
  environmentVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
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
  environmentVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
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
  environmentVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
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
  environmentVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
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
  descriptor: {
    service: svc,
    http: "POST /2025-09-09/microvms/{microvmIdentifier}/auth-token",
    input: {
      microvmIdentifier: 0,
      expirationInMinutes: 0,
      allowedPorts: D.list({
        port: 0,
        range: { startPort: 0, endPort: 0 },
        allPorts: {},
      }),
    },
    output: { authToken: D.map(D.secret) },
    body: true,
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
  operationName: "CreateMicrovmAuthToken",
})) as any;

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
 * Creates a MicroVM image from the specified code artifact and base image. The build is asynchronous — the image transitions from CREATING to CREATED on success, or CREATE_FAILED on failure. Use GetMicrovmImage to poll for completion.
 */
export const createMicrovmImage: API.OperationMethod<
  CreateMicrovmImageRequest,
  CreateMicrovmImageResponse,
  CreateMicrovmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2025-09-09/microvm-images",
    input: {
      baseImageArn: 0,
      baseImageVersion: 0,
      buildRoleArn: 0,
      description: 0,
      codeArtifact: i_CodeArtifact,
      logging: i_Logging,
      egressNetworkConnectors: 0,
      cpuConfigurations: D.list(i_CpuConfiguration),
      resources: D.list(i_Resources),
      additionalOsCapabilities: 0,
      hooks: i_Hooks,
      environmentVariables: 0,
      name: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      createdAt: D.ts,
      environmentVariables: D.map(D.secret),
      updatedAt: D.ts,
    },
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
  operationName: "CreateMicrovmImage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2025-09-09/microvms/{microvmIdentifier}/shell-auth-token",
    input: { microvmIdentifier: 0, expirationInMinutes: 0 },
    output: { authToken: D.map(D.secret) },
    body: true,
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
  operationName: "CreateMicrovmShellAuthToken",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2025-09-09/microvm-images/{imageIdentifier}",
    input: { imageIdentifier: 0 },
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
  operationName: "DeleteMicrovmImage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}",
    input: { imageIdentifier: 0, imageVersion: 0 },
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
  operationName: "DeleteMicrovmImageVersion",
})) as any;

export type GetMicrovmError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific MicroVM, including its state, endpoint, image information, and configuration. The state field is eventually consistent — determine readiness by connecting to the endpoint.
 */
export const getMicrovm: API.OperationMethod<
  GetMicrovmRequest,
  GetMicrovmResponse,
  GetMicrovmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2025-09-09/microvms/{microvmIdentifier}",
    input: { microvmIdentifier: 0 },
    output: { startedAt: D.ts, terminatedAt: D.ts },
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
  operationName: "GetMicrovm",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2025-09-09/microvm-images/{imageIdentifier}",
    input: { imageIdentifier: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetMicrovmImage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}/builds/{buildId}",
    input: { imageIdentifier: 0, imageVersion: 0, buildId: 0 },
    output: { createdAt: D.ts },
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
  operationName: "GetMicrovmImageBuild",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}",
    input: { imageIdentifier: 0, imageVersion: 0 },
    output: {
      environmentVariables: D.map(D.secret),
      createdAt: D.ts,
      updatedAt: D.ts,
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
  operationName: "GetMicrovmImageVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2025-09-09/managed-microvm-images",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /2025-09-09/managed-microvm-images/{imageIdentifier}/versions",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      imageIdentifier: 0,
    },
    output: { items: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}/builds",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      imageIdentifier: 0,
      imageVersion: 0,
      architecture: D.m({ query: "architecture" }),
      chipset: D.m({ query: "chipset" }),
      chipsetGeneration: D.m({ query: "chipsetGeneration" }),
    },
    output: { items: D.list({ createdAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /2025-09-09/microvm-images",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      nameFilter: D.m({ query: "nameFilter" }),
    },
    output: { items: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /2025-09-09/microvm-images/{imageIdentifier}/versions",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      imageIdentifier: 0,
    },
    output: {
      items: D.list({
        environmentVariables: D.map(D.secret),
        createdAt: D.ts,
        updatedAt: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /2025-09-09/microvms",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      imageIdentifier: D.m({ query: "imageIdentifier" }),
      imageVersion: D.m({ query: "imageVersion" }),
    },
    output: { items: D.list({ startedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /2017-03-31/tags/{Resource}",
    input: { Resource: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2025-09-09/microvms/{microvmIdentifier}/resume",
    input: { microvmIdentifier: 0 },
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
  operationName: "ResumeMicrovm",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2025-09-09/microvms",
    input: {
      ingressNetworkConnectors: 0,
      egressNetworkConnectors: 0,
      imageIdentifier: 0,
      imageVersion: 0,
      executionRoleArn: 0,
      idlePolicy: {
        maxIdleDurationSeconds: 0,
        suspendedDurationSeconds: 0,
        autoResumeEnabled: 0,
      },
      logging: i_Logging,
      runHookPayload: 0,
      maximumDurationInSeconds: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { startedAt: D.ts, terminatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2025-09-09/microvms/{microvmIdentifier}/suspend",
    input: { microvmIdentifier: 0 },
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
  operationName: "SuspendMicrovm",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2017-03-31/tags/{Resource}",
    input: { Resource: 0, Tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2025-09-09/microvms/{microvmIdentifier}",
    input: { microvmIdentifier: 0 },
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
  operationName: "TerminateMicrovm",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2017-03-31/tags/{Resource}",
    input: { Resource: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

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
 * Updates the configuration of a MicroVM image and triggers a new version build. This operation uses PUT semantics — all required fields (codeArtifact, baseImageArn, buildRoleArn) must be provided with every request.
 */
export const updateMicrovmImage: API.OperationMethod<
  UpdateMicrovmImageRequest,
  UpdateMicrovmImageResponse,
  UpdateMicrovmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2025-09-09/microvm-images/{imageIdentifier}",
    input: {
      baseImageArn: 0,
      baseImageVersion: 0,
      buildRoleArn: 0,
      description: 0,
      codeArtifact: i_CodeArtifact,
      logging: i_Logging,
      egressNetworkConnectors: 0,
      cpuConfigurations: D.list(i_CpuConfiguration),
      resources: D.list(i_Resources),
      additionalOsCapabilities: 0,
      hooks: i_Hooks,
      environmentVariables: 0,
      imageIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      createdAt: D.ts,
      environmentVariables: D.map(D.secret),
      updatedAt: D.ts,
    },
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
  operationName: "UpdateMicrovmImage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}",
    input: { imageIdentifier: 0, imageVersion: 0, status: 0 },
    output: {
      environmentVariables: D.map(D.secret),
      createdAt: D.ts,
      updatedAt: D.ts,
    },
    body: true,
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
  operationName: "UpdateMicrovmImageVersion",
})) as any;

const i_CodeArtifact: D.LazyStruct = () => ({ uri: 0 });
const i_CpuConfiguration: D.LazyStruct = () => ({ architecture: 0 });
const i_Hooks: D.LazyStruct = () => ({
  port: 0,
  microvmHooks: {
    run: 0,
    runTimeoutInSeconds: 0,
    resume: 0,
    resumeTimeoutInSeconds: 0,
    suspend: 0,
    suspendTimeoutInSeconds: 0,
    terminate: 0,
    terminateTimeoutInSeconds: 0,
  },
  microvmImageHooks: {
    ready: 0,
    readyTimeoutInSeconds: 0,
    validate: 0,
    validateTimeoutInSeconds: 0,
  },
});
const i_Logging: D.LazyStruct = () => ({
  disabled: {},
  cloudWatch: { logGroup: 0, logStream: 0 },
});
const i_Resources: D.LazyStruct = () => ({ minimumMemoryInMiB: 0 });
