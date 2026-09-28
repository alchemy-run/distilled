import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
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
  sdkId: "Lambda",
  target: "AWSGirApiService",
  version: "2015-03-31",
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

export class AliasLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "AliasLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class CallbackTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "CallbackTimeoutException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class CapacityProviderLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "CapacityProviderLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class CodeArtifactUserDeletedException
  extends /*@__PURE__*/ TE.TaggedError(
    "CodeArtifactUserDeletedException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class CodeArtifactUserFailedException
  extends /*@__PURE__*/ TE.TaggedError(
    "CodeArtifactUserFailedException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class CodeArtifactUserPendingException
  extends /*@__PURE__*/ TE.TaggedError(
    "CodeArtifactUserPendingException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class CodeSigningConfigNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "CodeSigningConfigNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class CodeStorageExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "CodeStorageExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class CodeVerificationFailedException
  extends /*@__PURE__*/ TE.TaggedError(
    "CodeVerificationFailedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class DurableExecutionAlreadyStartedException
  extends /*@__PURE__*/ TE.TaggedError(
    "DurableExecutionAlreadyStartedException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class EC2AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError(
    "EC2AccessDeniedException",
    ["ServerError", "AuthError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class EC2ThrottledException
  extends /*@__PURE__*/ TE.TaggedError(
    "EC2ThrottledException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class EC2UnexpectedException
  extends /*@__PURE__*/ TE.TaggedError(
    "EC2UnexpectedException",
    ["ServerError"],
    { status: 502 },
  )<{
    readonly Type?: string;
    readonly message?: string;
    readonly EC2ErrorCode?: string;
  }> {}
export class EFSIOException
  extends /*@__PURE__*/ TE.TaggedError("EFSIOException", ["BadRequestError"], {
    status: 410,
  })<{ readonly Type?: string; readonly message?: string }> {}
export class EFSMountConnectivityException
  extends /*@__PURE__*/ TE.TaggedError(
    "EFSMountConnectivityException",
    ["TimeoutError"],
    { status: 408 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class EFSMountFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "EFSMountFailureException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class EFSMountTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "EFSMountTimeoutException",
    ["TimeoutError"],
    { status: 408 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ENILimitReachedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ENILimitReachedException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ENINotReadyException
  extends /*@__PURE__*/ TE.TaggedError(
    "ENINotReadyException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class FunctionVersionsPerCapacityProviderLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "FunctionVersionsPerCapacityProviderLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class InvalidCodeSignatureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCodeSignatureException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class InvalidRequestContentException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestContentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class InvalidRuntimeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRuntimeException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class InvalidSecurityGroupIDException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSecurityGroupIDException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class InvalidSubnetIDException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSubnetIDException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class InvalidZipFileException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidZipFileException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class KMSAccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError(
    "KMSAccessDeniedException",
    ["ServerError", "AuthError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class KMSDisabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "KMSDisabledException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class KMSInvalidStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "KMSInvalidStateException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class KMSNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "KMSNotFoundException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class LambdaInternalKmsError
  extends /*@__PURE__*/ TE.TaggedError(
    "LambdaInternalKmsError",
    ["RetryableError"],
    {
      synthetic: {
        from: "InvalidParameterValueException",
        message: "Internal KMS service error. Try again.",
      },
    },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ModeNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ModeNotSupportedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class NoPublishedVersionException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoPublishedVersionException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ParseError
  extends /*@__PURE__*/ TE.TaggedError("ParseError")<{
    readonly message?: string;
  }> {}
export class PolicyLengthExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "PolicyLengthExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class PreconditionFailedException
  extends /*@__PURE__*/ TE.TaggedError("PreconditionFailedException", [], {
    status: 412,
  })<{ readonly Type?: string; readonly message?: string }> {}
export class ProvisionedConcurrencyConfigNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ProvisionedConcurrencyConfigNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class PublicPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "PublicPolicyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class RecursiveInvocationException
  extends /*@__PURE__*/ TE.TaggedError(
    "RecursiveInvocationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("RequestLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class RequestTooLargeException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestTooLargeException",
    ["BadRequestError"],
    { status: 413 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ResourceConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceConflictException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotReadyException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class S3FilesMountConnectivityException
  extends /*@__PURE__*/ TE.TaggedError(
    "S3FilesMountConnectivityException",
    ["TimeoutError"],
    { status: 408 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class S3FilesMountFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "S3FilesMountFailureException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class S3FilesMountTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "S3FilesMountTimeoutException",
    ["TimeoutError"],
    { status: 408 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class SerializedRequestEntityTooLargeException
  extends /*@__PURE__*/ TE.TaggedError(
    "SerializedRequestEntityTooLargeException",
    ["BadRequestError"],
    { status: 413 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ServiceException
  extends /*@__PURE__*/ TE.TaggedError("ServiceException", ["ServerError"], {
    status: 500,
  })<{ readonly Type?: string; readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class SnapStartException
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapStartException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class SnapStartNotReadyException
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapStartNotReadyException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class SnapStartRegenerationFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapStartRegenerationFailureException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class SnapStartTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapStartTimeoutException",
    ["TimeoutError"],
    { status: 408 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class SubnetIPAddressLimitReachedException
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetIPAddressLimitReachedException",
    ["ServerError"],
    { status: 502 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: "Retry-After" } },
  )<{
    readonly retryAfterSeconds?: string;
    readonly Type?: string;
    readonly message?: string;
    readonly Reason?: ThrottleReason;
  }> {}
export class UnsupportedMediaTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedMediaTypeException",
    ["BadRequestError"],
    { status: 415 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export type LayerName = string;
export type LayerVersionNumber = number;
export type StatementId = string;
export type LayerPermissionAllowedAction = string;
export type LayerPermissionAllowedPrincipal = string;
export type OrganizationId = string;
export interface AddLayerVersionPermissionRequest {
  LayerName: string;
  VersionNumber: number;
  StatementId: string;
  Action: string;
  Principal: string;
  OrganizationId?: string;
  RevisionId?: string;
}
export interface AddLayerVersionPermissionResponse {
  Statement?: string;
  RevisionId?: string;
}
export type NamespacedFunctionName = string;
export type Action = string;
export type Principal = string;
export type Arn = string;
export type FunctionUrlAuthType = "NONE" | "AWS_IAM" | (string & {});
export type InvokedViaFunctionUrl = boolean;
export type SourceOwner = string;
export type EventSourceToken = string;
export type NumericLatestPublishedOrAliasQualifier = string;
export type PrincipalOrgID = string;
export interface AddPermissionRequest {
  FunctionName: string;
  StatementId: string;
  Action: string;
  Principal: string;
  SourceArn?: string;
  FunctionUrlAuthType?: FunctionUrlAuthType;
  InvokedViaFunctionUrl?: boolean;
  SourceAccount?: string;
  EventSourceToken?: string;
  Qualifier?: string;
  RevisionId?: string;
  PrincipalOrgID?: string;
}
export interface AddPermissionResponse {
  Statement?: string;
}
export type DurableExecutionArn = string;
export type CheckpointToken = string;
export type OperationId = string;
export type OperationName = string;
export type OperationType =
  | "EXECUTION"
  | "CONTEXT"
  | "STEP"
  | "WAIT"
  | "CALLBACK"
  | "CHAINED_INVOKE"
  | (string & {});
export type OperationSubType = string;
export type OperationAction =
  | "START"
  | "SUCCEED"
  | "FAIL"
  | "RETRY"
  | "CANCEL"
  | (string & {});
export type OperationPayload = string | redacted.Redacted<string>;
export type ErrorMessage = string | redacted.Redacted<string>;
export type ErrorType = string | redacted.Redacted<string>;
export type ErrorData = string | redacted.Redacted<string>;
export type StackTraceEntry = string | redacted.Redacted<string>;
export type StackTraceEntries = (string | redacted.Redacted<string>)[];
export interface ErrorObject {
  ErrorMessage?: string | redacted.Redacted<string>;
  ErrorType?: string | redacted.Redacted<string>;
  ErrorData?: string | redacted.Redacted<string>;
  StackTrace?: (string | redacted.Redacted<string>)[];
}
export type ReplayChildren = boolean;
export interface ContextOptions {
  ReplayChildren?: boolean;
}
export type DurationSeconds = number;
export interface StepOptions {
  NextAttemptDelaySeconds?: number;
}
export interface WaitOptions {
  WaitSeconds?: number;
}
export interface CallbackOptions {
  TimeoutSeconds?: number;
  HeartbeatTimeoutSeconds?: number;
}
export type TenantId = string;
export interface ChainedInvokeOptions {
  FunctionName: string;
  TenantId?: string;
}
export interface OperationUpdate {
  Id: string;
  ParentId?: string;
  Name?: string;
  Type: OperationType;
  SubType?: string;
  Action: OperationAction;
  Payload?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
  ContextOptions?: ContextOptions;
  StepOptions?: StepOptions;
  WaitOptions?: WaitOptions;
  CallbackOptions?: CallbackOptions;
  ChainedInvokeOptions?: ChainedInvokeOptions;
}
export type OperationUpdates = OperationUpdate[];
export type ClientToken = string;
export interface CheckpointDurableExecutionRequest {
  DurableExecutionArn: string;
  CheckpointToken: string;
  Updates?: OperationUpdate[];
  ClientToken?: string;
}
export type ExecutionTimestamp = Date;
export type OperationStatus =
  | "STARTED"
  | "PENDING"
  | "READY"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED"
  | "TIMED_OUT"
  | "STOPPED"
  | (string & {});
export type InputPayload = string | redacted.Redacted<string>;
export interface ExecutionDetails {
  InputPayload?: string | redacted.Redacted<string>;
}
export interface ContextDetails {
  ReplayChildren?: boolean;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export type AttemptCount = number;
export interface StepDetails {
  Attempt?: number;
  NextAttemptTimestamp?: Date;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export interface WaitDetails {
  ScheduledEndTimestamp?: Date;
}
export type CallbackId = string;
export interface CallbackDetails {
  CallbackId?: string;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export interface ChainedInvokeDetails {
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export interface Operation {
  Id: string;
  ParentId?: string;
  Name?: string;
  Type: OperationType;
  SubType?: string;
  StartTimestamp: Date;
  EndTimestamp?: Date;
  Status: OperationStatus;
  ExecutionDetails?: ExecutionDetails;
  ContextDetails?: ContextDetails;
  StepDetails?: StepDetails;
  WaitDetails?: WaitDetails;
  CallbackDetails?: CallbackDetails;
  ChainedInvokeDetails?: ChainedInvokeDetails;
}
export type Operations = Operation[];
export interface CheckpointUpdatedExecutionState {
  Operations?: Operation[];
  NextMarker?: string;
}
export interface CheckpointDurableExecutionResponse {
  CheckpointToken?: string;
  NewExecutionState: CheckpointUpdatedExecutionState;
}
export type FunctionName = string;
export type Alias = string;
export type VersionWithLatestPublished = string;
export type Description = string;
export type AdditionalVersion = string;
export type Weight = number;
export type AdditionalVersionWeights = { [key: string]: number | undefined };
export interface AliasRoutingConfiguration {
  AdditionalVersionWeights?: { [key: string]: number | undefined };
}
export interface CreateAliasRequest {
  FunctionName: string;
  Name: string;
  FunctionVersion: string;
  Description?: string;
  RoutingConfig?: AliasRoutingConfiguration;
}
export type FunctionArn = string;
export type Version = string;
export interface AliasConfiguration {
  AliasArn?: string;
  Name?: string;
  FunctionVersion?: string;
  Description?: string;
  RoutingConfig?: AliasRoutingConfiguration;
  RevisionId?: string;
}
export type CapacityProviderName = string;
export type SubnetId = string;
export type CapacityProviderSubnetIds = string[];
export type SecurityGroupId = string;
export type CapacityProviderSecurityGroupIds = string[];
export interface CapacityProviderVpcConfig {
  SubnetIds: string[];
  SecurityGroupIds: string[];
}
export type RoleArn = string;
export interface CapacityProviderPermissionsConfig {
  CapacityProviderOperatorRoleArn: string;
}
export type Architecture = "x86_64" | "arm64" | (string & {});
export type ArchitecturesList = Architecture[];
export type InstanceType = string;
export type InstanceTypeSet = string[];
export interface InstanceRequirements {
  Architectures?: Architecture[];
  AllowedInstanceTypes?: string[];
  ExcludedInstanceTypes?: string[];
}
export type CapacityProviderMaxVCpuCount = number;
export type CapacityProviderScalingMode = "Auto" | "Manual" | (string & {});
export type CapacityProviderPredefinedMetricType =
  | "LambdaCapacityProviderAverageCPUUtilization"
  | (string & {});
export type MetricTargetValue = number;
export interface TargetTrackingScalingPolicy {
  PredefinedMetricType: CapacityProviderPredefinedMetricType;
  TargetValue: number;
}
export type CapacityProviderScalingPoliciesList = TargetTrackingScalingPolicy[];
export interface CapacityProviderScalingConfig {
  MaxVCpuCount?: number;
  ScalingMode?: CapacityProviderScalingMode;
  ScalingPolicies?: TargetTrackingScalingPolicy[];
}
export type KMSKeyArnNonEmpty = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type PropagateTagsMode = "None" | "Explicit" | (string & {});
export interface PropagateTags {
  Mode?: PropagateTagsMode;
  ExplicitTags?: { [key: string]: string | undefined };
}
export type SystemLogLevel = "DEBUG" | "INFO" | "WARN" | (string & {});
export type LogGroup = string;
export interface CapacityProviderLoggingConfig {
  SystemLogLevel?: SystemLogLevel;
  LogGroup?: string;
}
export interface CapacityProviderTelemetryConfig {
  LoggingConfig?: CapacityProviderLoggingConfig;
}
export interface CreateCapacityProviderRequest {
  CapacityProviderName: string;
  VpcConfig: CapacityProviderVpcConfig;
  PermissionsConfig: CapacityProviderPermissionsConfig;
  InstanceRequirements?: InstanceRequirements;
  CapacityProviderScalingConfig?: CapacityProviderScalingConfig;
  KmsKeyArn?: string;
  Tags?: { [key: string]: string | undefined };
  PropagateTags?: PropagateTags;
  TelemetryConfig?: CapacityProviderTelemetryConfig;
}
export type CapacityProviderArn = string;
export type CapacityProviderState =
  | "Pending"
  | "Active"
  | "Failed"
  | "Deleting"
  | (string & {});
export type KMSKeyArn = string;
export interface CapacityProvider {
  CapacityProviderArn: string;
  State: CapacityProviderState;
  VpcConfig: CapacityProviderVpcConfig;
  PermissionsConfig: CapacityProviderPermissionsConfig;
  InstanceRequirements?: InstanceRequirements;
  CapacityProviderScalingConfig?: CapacityProviderScalingConfig;
  KmsKeyArn?: string;
  LastModified?: string;
  PropagateTags?: PropagateTags;
  TelemetryConfig?: CapacityProviderTelemetryConfig;
}
export interface CreateCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export type SigningProfileVersionArns = string[];
export interface AllowedPublishers {
  SigningProfileVersionArns: string[];
}
export type CodeSigningPolicy = "Warn" | "Enforce" | (string & {});
export interface CodeSigningPolicies {
  UntrustedArtifactOnDeployment?: CodeSigningPolicy;
}
export interface CreateCodeSigningConfigRequest {
  Description?: string;
  AllowedPublishers: AllowedPublishers;
  CodeSigningPolicies?: CodeSigningPolicies;
  Tags?: { [key: string]: string | undefined };
}
export type CodeSigningConfigId = string;
export type CodeSigningConfigArn = string;
export interface CodeSigningConfig {
  CodeSigningConfigId: string;
  CodeSigningConfigArn: string;
  Description?: string;
  AllowedPublishers: AllowedPublishers;
  CodeSigningPolicies: CodeSigningPolicies;
  LastModified: string;
}
export interface CreateCodeSigningConfigResponse {
  CodeSigningConfig: CodeSigningConfig;
}
export type Enabled = boolean;
export type BatchSize = number;
export type Pattern = string;
export interface Filter {
  Pattern?: string;
}
export type FilterList = Filter[];
export interface FilterCriteria {
  Filters?: Filter[];
}
export type EventSourceMappingMetric =
  | "EventCount"
  | "ErrorCount"
  | "KafkaMetrics"
  | (string & {});
export type EventSourceMappingMetricList = EventSourceMappingMetric[];
export interface EventSourceMappingMetricsConfig {
  Metrics?: EventSourceMappingMetric[];
}
export type EventSourceMappingSystemLogLevel =
  | "DEBUG"
  | "INFO"
  | "WARN"
  | (string & {});
export interface EventSourceMappingLoggingConfig {
  SystemLogLevel?: EventSourceMappingSystemLogLevel;
}
export type MaximumConcurrency = number;
export interface ScalingConfig {
  MaximumConcurrency?: number;
}
export type MaximumBatchingWindowInSeconds = number;
export type ParallelizationFactor = number;
export type EventSourcePosition =
  | "TRIM_HORIZON"
  | "LATEST"
  | "AT_TIMESTAMP"
  | (string & {});
export type DestinationArn = string;
export interface OnSuccess {
  Destination?: string;
}
export interface OnFailure {
  Destination?: string;
}
export interface DestinationConfig {
  OnSuccess?: OnSuccess;
  OnFailure?: OnFailure;
}
export type MaximumRecordAgeInSeconds = number;
export type BisectBatchOnFunctionError = boolean;
export type MaximumRetryAttemptsEventSourceMapping = number;
export type TumblingWindowInSeconds = number;
export type Topic = string;
export type Topics = string[];
export type Queue = string;
export type Queues = string[];
export type SourceAccessType =
  | "BASIC_AUTH"
  | "VPC_SUBNET"
  | "VPC_SECURITY_GROUP"
  | "SASL_SCRAM_512_AUTH"
  | "SASL_SCRAM_256_AUTH"
  | "VIRTUAL_HOST"
  | "CLIENT_CERTIFICATE_TLS_AUTH"
  | "SERVER_ROOT_CA_CERTIFICATE"
  | (string & {});
export type URI = string;
export interface SourceAccessConfiguration {
  Type?: SourceAccessType;
  URI?: string;
}
export type SourceAccessConfigurations = SourceAccessConfiguration[];
export type EndPointType = "KAFKA_BOOTSTRAP_SERVERS" | (string & {});
export type Endpoint = string;
export type EndpointLists = string[];
export type Endpoints = { [key in EndPointType]?: string[] };
export interface SelfManagedEventSource {
  Endpoints?: { [key: string]: string[] | undefined };
}
export type FunctionResponseType = "ReportBatchItemFailures" | (string & {});
export type FunctionResponseTypeList = FunctionResponseType[];
export type SchemaRegistryUri = string;
export type SchemaRegistryEventRecordFormat = "JSON" | "SOURCE" | (string & {});
export type KafkaSchemaRegistryAuthType =
  | "BASIC_AUTH"
  | "CLIENT_CERTIFICATE_TLS_AUTH"
  | "SERVER_ROOT_CA_CERTIFICATE"
  | (string & {});
export interface KafkaSchemaRegistryAccessConfig {
  Type?: KafkaSchemaRegistryAuthType;
  URI?: string;
}
export type KafkaSchemaRegistryAccessConfigList =
  KafkaSchemaRegistryAccessConfig[];
export type KafkaSchemaValidationAttribute = "KEY" | "VALUE" | (string & {});
export interface KafkaSchemaValidationConfig {
  Attribute?: KafkaSchemaValidationAttribute;
}
export type KafkaSchemaValidationConfigList = KafkaSchemaValidationConfig[];
export interface KafkaSchemaRegistryConfig {
  SchemaRegistryURI?: string;
  EventRecordFormat?: SchemaRegistryEventRecordFormat;
  AccessConfigs?: KafkaSchemaRegistryAccessConfig[];
  SchemaValidationConfigs?: KafkaSchemaValidationConfig[];
}
export interface AmazonManagedKafkaEventSourceConfig {
  ConsumerGroupId?: string;
  SchemaRegistryConfig?: KafkaSchemaRegistryConfig;
}
export interface SelfManagedKafkaEventSourceConfig {
  ConsumerGroupId?: string;
  SchemaRegistryConfig?: KafkaSchemaRegistryConfig;
}
export type DatabaseName = string;
export type CollectionName = string;
export type FullDocument = "UpdateLookup" | "Default" | (string & {});
export interface DocumentDBEventSourceConfig {
  DatabaseName?: string;
  CollectionName?: string;
  FullDocument?: FullDocument;
}
export type MinimumNumberOfPollers = number;
export type MaximumNumberOfPollers = number;
export type ProvisionedPollerGroupName = string;
export interface ProvisionedPollerConfig {
  MinimumPollers?: number;
  MaximumPollers?: number;
  PollerGroupName?: string;
}
export interface CreateEventSourceMappingRequest {
  EventSourceArn?: string;
  FunctionName: string;
  Enabled?: boolean;
  BatchSize?: number;
  FilterCriteria?: FilterCriteria;
  KMSKeyArn?: string;
  MetricsConfig?: EventSourceMappingMetricsConfig;
  LoggingConfig?: EventSourceMappingLoggingConfig;
  ScalingConfig?: ScalingConfig;
  MaximumBatchingWindowInSeconds?: number;
  ParallelizationFactor?: number;
  StartingPosition?: EventSourcePosition;
  StartingPositionTimestamp?: Date;
  DestinationConfig?: DestinationConfig;
  MaximumRecordAgeInSeconds?: number;
  BisectBatchOnFunctionError?: boolean;
  MaximumRetryAttempts?: number;
  Tags?: { [key: string]: string | undefined };
  TumblingWindowInSeconds?: number;
  Topics?: string[];
  Queues?: string[];
  SourceAccessConfigurations?: SourceAccessConfiguration[];
  SelfManagedEventSource?: SelfManagedEventSource;
  FunctionResponseTypes?: FunctionResponseType[];
  AmazonManagedKafkaEventSourceConfig?: AmazonManagedKafkaEventSourceConfig;
  SelfManagedKafkaEventSourceConfig?: SelfManagedKafkaEventSourceConfig;
  DocumentDBEventSourceConfig?: DocumentDBEventSourceConfig;
  ProvisionedPollerConfig?: ProvisionedPollerConfig;
}
export type UUIDString = string;
export type FilterCriteriaErrorCode = string;
export type FilterCriteriaErrorMessage = string;
export interface FilterCriteriaError {
  ErrorCode?: string;
  Message?: string;
}
export type EventSourceMappingArn = string;
export interface EventSourceMappingConfiguration {
  UUID?: string;
  StartingPosition?: EventSourcePosition;
  StartingPositionTimestamp?: Date;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
  ParallelizationFactor?: number;
  EventSourceArn?: string;
  FilterCriteria?: FilterCriteria;
  FilterCriteriaError?: FilterCriteriaError;
  KMSKeyArn?: string;
  MetricsConfig?: EventSourceMappingMetricsConfig;
  LoggingConfig?: EventSourceMappingLoggingConfig;
  ScalingConfig?: ScalingConfig;
  FunctionArn?: string;
  LastModified?: Date;
  LastProcessingResult?: string;
  State?: string;
  StateTransitionReason?: string;
  DestinationConfig?: DestinationConfig;
  Topics?: string[];
  Queues?: string[];
  SourceAccessConfigurations?: SourceAccessConfiguration[];
  SelfManagedEventSource?: SelfManagedEventSource;
  MaximumRecordAgeInSeconds?: number;
  BisectBatchOnFunctionError?: boolean;
  MaximumRetryAttempts?: number;
  TumblingWindowInSeconds?: number;
  FunctionResponseTypes?: FunctionResponseType[];
  AmazonManagedKafkaEventSourceConfig?: AmazonManagedKafkaEventSourceConfig;
  SelfManagedKafkaEventSourceConfig?: SelfManagedKafkaEventSourceConfig;
  DocumentDBEventSourceConfig?: DocumentDBEventSourceConfig;
  EventSourceMappingArn?: string;
  ProvisionedPollerConfig?: ProvisionedPollerConfig;
}
export type Runtime =
  | "nodejs"
  | "nodejs4.3"
  | "nodejs6.10"
  | "nodejs8.10"
  | "nodejs10.x"
  | "nodejs12.x"
  | "nodejs14.x"
  | "nodejs16.x"
  | "nodejs18.x"
  | "nodejs20.x"
  | "nodejs22.x"
  | "nodejs24.x"
  | "java8"
  | "java8.al2"
  | "java11"
  | "java17"
  | "java21"
  | "java25"
  | "python2.7"
  | "python3.6"
  | "python3.7"
  | "python3.8"
  | "python3.9"
  | "python3.10"
  | "python3.11"
  | "python3.12"
  | "python3.13"
  | "python3.14"
  | "dotnetcore1.0"
  | "dotnetcore2.0"
  | "dotnetcore2.1"
  | "dotnetcore3.1"
  | "dotnet6"
  | "dotnet8"
  | "dotnet10"
  | "nodejs4.3-edge"
  | "go1.x"
  | "ruby2.5"
  | "ruby2.7"
  | "ruby3.2"
  | "ruby3.3"
  | "ruby3.4"
  | "ruby4.0"
  | "provided"
  | "provided.al2"
  | "provided.al2023"
  | "nodejs26.x"
  | "python3.15"
  | "java8.al2023"
  | "java11.al2023"
  | "java17.al2023"
  | (string & {});
export type Handler = string;
export type S3Bucket = string;
export type S3Key = string;
export type S3ObjectVersion = string;
export type S3ObjectStorageMode = "COPY" | "REFERENCE" | (string & {});
export interface FunctionCode {
  ZipFile?: Uint8Array | redacted.Redacted<Uint8Array>;
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  S3ObjectStorageMode?: S3ObjectStorageMode;
  ImageUri?: string;
  SourceKMSKeyArn?: string;
}
export type Timeout = number;
export type MemorySize = number;
export type FunctionVersionLatestPublished = "LATEST_PUBLISHED" | (string & {});
export type SubnetIds = string[];
export type SecurityGroupIds = string[];
export interface VpcConfig {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Ipv6AllowedForDualStack?: boolean;
}
export type PackageType = "Zip" | "Image" | (string & {});
export type ResourceArn = string;
export interface DeadLetterConfig {
  TargetArn?: string;
}
export type EnvironmentVariableName = string | redacted.Redacted<string>;
export type EnvironmentVariableValue = string | redacted.Redacted<string>;
export type EnvironmentVariables = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface Environment {
  Variables?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type TracingMode = "Active" | "PassThrough" | (string & {});
export interface TracingConfig {
  Mode?: TracingMode;
}
export type LayerVersionArn = string;
export type LayerList = string[];
export type FileSystemArn = string;
export type LocalMountPath = string;
export interface FileSystemConfig {
  Arn: string;
  LocalMountPath: string;
}
export type FileSystemConfigList = FileSystemConfig[];
export type StringList = string[];
export type WorkingDirectory = string;
export interface ImageConfig {
  EntryPoint?: string[];
  Command?: string[];
  WorkingDirectory?: string;
}
export type EphemeralStorageSize = number;
export interface EphemeralStorage {
  Size: number;
}
export type SnapStartApplyOn = "PublishedVersions" | "None" | (string & {});
export interface SnapStart {
  ApplyOn?: SnapStartApplyOn;
}
export type LogFormat = "JSON" | "Text" | (string & {});
export type ApplicationLogLevel =
  | "TRACE"
  | "DEBUG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | (string & {});
export interface LoggingConfig {
  LogFormat?: LogFormat;
  ApplicationLogLevel?: ApplicationLogLevel;
  SystemLogLevel?: SystemLogLevel;
  LogGroup?: string;
}
export type TenantIsolationMode = "PER_TENANT" | (string & {});
export interface TenancyConfig {
  TenantIsolationMode: TenantIsolationMode;
}
export type PerExecutionEnvironmentMaxConcurrency = number;
export type ExecutionEnvironmentMemoryGiBPerVCpu = number;
export interface LambdaManagedInstancesCapacityProviderConfig {
  CapacityProviderArn: string;
  PerExecutionEnvironmentMaxConcurrency?: number;
  ExecutionEnvironmentMemoryGiBPerVCpu?: number;
}
export interface CapacityProviderConfig {
  LambdaManagedInstancesCapacityProviderConfig: LambdaManagedInstancesCapacityProviderConfig;
}
export type RetentionPeriodInDays = number;
export type ExecutionTimeout = number;
export interface DurableConfig {
  KMSKeyArn?: string;
  RetentionPeriodInDays?: number;
  ExecutionTimeout?: number;
}
export interface CreateFunctionRequest {
  FunctionName: string;
  Runtime?: Runtime;
  Role: string;
  Handler?: string;
  Code: FunctionCode;
  Description?: string;
  Timeout?: number;
  MemorySize?: number;
  Publish?: boolean;
  PublishTo?: FunctionVersionLatestPublished;
  VpcConfig?: VpcConfig;
  PackageType?: PackageType;
  DeadLetterConfig?: DeadLetterConfig;
  Environment?: Environment;
  KMSKeyArn?: string;
  TracingConfig?: TracingConfig;
  Tags?: { [key: string]: string | undefined };
  Layers?: string[];
  FileSystemConfigs?: FileSystemConfig[];
  CodeSigningConfigArn?: string;
  ImageConfig?: ImageConfig;
  Architectures?: Architecture[];
  EphemeralStorage?: EphemeralStorage;
  SnapStart?: SnapStart;
  LoggingConfig?: LoggingConfig;
  TenancyConfig?: TenancyConfig;
  CapacityProviderConfig?: CapacityProviderConfig;
  DurableConfig?: DurableConfig;
}
export type NameSpacedFunctionArn = string;
export type VpcId = string;
export interface VpcConfigResponse {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  VpcId?: string;
  Ipv6AllowedForDualStack?: boolean;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface EnvironmentError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export interface EnvironmentResponse {
  Variables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  Error?: EnvironmentError;
}
export interface TracingConfigResponse {
  Mode?: TracingMode;
}
export interface Layer {
  Arn?: string;
  CodeSize?: number;
  SigningProfileVersionArn?: string;
  SigningJobArn?: string;
}
export type LayersReferenceList = Layer[];
export type State =
  | "Pending"
  | "Active"
  | "Inactive"
  | "Failed"
  | "Deactivating"
  | "Deactivated"
  | "ActiveNonInvocable"
  | "Deleting"
  | (string & {});
export type StateReason = string;
export type StateReasonCode =
  | "Idle"
  | "Creating"
  | "Restoring"
  | "EniLimitExceeded"
  | "InsufficientRolePermissions"
  | "InvalidConfiguration"
  | "InternalError"
  | "SubnetOutOfIPAddresses"
  | "InvalidSubnet"
  | "InvalidSecurityGroup"
  | "ImageDeleted"
  | "ImageAccessDenied"
  | "InvalidImage"
  | "KMSKeyAccessDenied"
  | "KMSKeyNotFound"
  | "InvalidStateKMSKey"
  | "DisabledKMSKey"
  | "EFSIOError"
  | "EFSMountConnectivityError"
  | "EFSMountFailure"
  | "EFSMountTimeout"
  | "InvalidRuntime"
  | "InvalidZipFileException"
  | "FunctionError"
  | "ServiceQuotaExceededException"
  | "VcpuLimitExceeded"
  | "CapacityProviderScalingLimitExceeded"
  | "InsufficientCapacity"
  | "EC2RequestLimitExceeded"
  | "FunctionError.InitTimeout"
  | "FunctionError.RuntimeInitError"
  | "FunctionError.ExtensionInitError"
  | "FunctionError.InvalidEntryPoint"
  | "FunctionError.InvalidWorkingDirectory"
  | "FunctionError.PermissionDenied"
  | "FunctionError.TooManyExtensions"
  | "FunctionError.InitResourceExhausted"
  | "DisallowedByVpcEncryptionControl"
  | "DrainingDurableExecutions"
  | "DependencyError"
  | (string & {});
export type LastUpdateStatus =
  | "Successful"
  | "Failed"
  | "InProgress"
  | (string & {});
export type LastUpdateStatusReason = string;
export type LastUpdateStatusReasonCode =
  | "EniLimitExceeded"
  | "InsufficientRolePermissions"
  | "InvalidConfiguration"
  | "InternalError"
  | "SubnetOutOfIPAddresses"
  | "InvalidSubnet"
  | "InvalidSecurityGroup"
  | "ImageDeleted"
  | "ImageAccessDenied"
  | "InvalidImage"
  | "KMSKeyAccessDenied"
  | "KMSKeyNotFound"
  | "InvalidStateKMSKey"
  | "DisabledKMSKey"
  | "EFSIOError"
  | "EFSMountConnectivityError"
  | "EFSMountFailure"
  | "EFSMountTimeout"
  | "InvalidRuntime"
  | "InvalidZipFileException"
  | "FunctionError"
  | "ServiceQuotaExceededException"
  | "VcpuLimitExceeded"
  | "CapacityProviderScalingLimitExceeded"
  | "InsufficientCapacity"
  | "EC2RequestLimitExceeded"
  | "FunctionError.InitTimeout"
  | "FunctionError.RuntimeInitError"
  | "FunctionError.ExtensionInitError"
  | "FunctionError.InvalidEntryPoint"
  | "FunctionError.InvalidWorkingDirectory"
  | "FunctionError.PermissionDenied"
  | "FunctionError.TooManyExtensions"
  | "FunctionError.InitResourceExhausted"
  | "DisallowedByVpcEncryptionControl"
  | "DependencyError"
  | "Creating"
  | (string & {});
export interface ImageConfigError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export interface ImageConfigResponse {
  ImageConfig?: ImageConfig;
  Error?: ImageConfigError;
}
export type SnapStartOptimizationStatus = "On" | "Off" | (string & {});
export interface SnapStartResponse {
  ApplyOn?: SnapStartApplyOn;
  OptimizationStatus?: SnapStartOptimizationStatus;
}
export type RuntimeVersionArn = string;
export interface RuntimeVersionError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export interface RuntimeVersionConfig {
  RuntimeVersionArn?: string;
  Error?: RuntimeVersionError;
}
export interface FunctionConfiguration {
  FunctionName?: string;
  FunctionArn?: string;
  Runtime?: Runtime;
  Role?: string;
  Handler?: string;
  CodeSize?: number;
  Description?: string;
  Timeout?: number;
  MemorySize?: number;
  LastModified?: string;
  CodeSha256?: string;
  Version?: string;
  VpcConfig?: VpcConfigResponse;
  DeadLetterConfig?: DeadLetterConfig;
  Environment?: EnvironmentResponse;
  KMSKeyArn?: string;
  TracingConfig?: TracingConfigResponse;
  MasterArn?: string;
  RevisionId?: string;
  Layers?: Layer[];
  State?: State;
  StateReason?: string;
  StateReasonCode?: StateReasonCode;
  LastUpdateStatus?: LastUpdateStatus;
  LastUpdateStatusReason?: string;
  LastUpdateStatusReasonCode?: LastUpdateStatusReasonCode;
  FileSystemConfigs?: FileSystemConfig[];
  SigningProfileVersionArn?: string;
  SigningJobArn?: string;
  PackageType?: PackageType;
  ImageConfigResponse?: ImageConfigResponse;
  Architectures?: Architecture[];
  EphemeralStorage?: EphemeralStorage;
  SnapStart?: SnapStartResponse;
  RuntimeVersionConfig?: RuntimeVersionConfig;
  LoggingConfig?: LoggingConfig;
  TenancyConfig?: TenancyConfig;
  CapacityProviderConfig?: CapacityProviderConfig;
  ConfigSha256?: string;
  DurableConfig?: DurableConfig;
}
export type FunctionUrlFunctionName = string;
export type FunctionUrlQualifier = string;
export type AllowCredentials = boolean;
export type Header = string;
export type HeadersList = string[];
export type Method = string;
export type AllowMethodsList = string[];
export type Origin = string;
export type AllowOriginsList = string[];
export type MaxAge = number;
export interface Cors {
  AllowCredentials?: boolean;
  AllowHeaders?: string[];
  AllowMethods?: string[];
  AllowOrigins?: string[];
  ExposeHeaders?: string[];
  MaxAge?: number;
}
export type InvokeMode = "BUFFERED" | "RESPONSE_STREAM" | (string & {});
export interface CreateFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  InvokeMode?: InvokeMode;
}
export type FunctionUrl = string;
export interface CreateFunctionUrlConfigResponse {
  FunctionUrl: string;
  FunctionArn: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  CreationTime: string;
  InvokeMode?: InvokeMode;
}
export interface DeleteAliasRequest {
  FunctionName: string;
  Name: string;
}
export interface DeleteAliasResponse {}
export interface DeleteCapacityProviderRequest {
  CapacityProviderName: string;
}
export interface DeleteCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export interface DeleteCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
}
export interface DeleteCodeSigningConfigResponse {}
export interface DeleteEventSourceMappingRequest {
  UUID: string;
}
export interface DeleteFunctionRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface DeleteFunctionResponse {
  StatusCode?: number;
}
export interface DeleteFunctionCodeSigningConfigRequest {
  FunctionName: string;
}
export interface DeleteFunctionCodeSigningConfigResponse {}
export interface DeleteFunctionConcurrencyRequest {
  FunctionName: string;
}
export interface DeleteFunctionConcurrencyResponse {}
export interface DeleteFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface DeleteFunctionEventInvokeConfigResponse {}
export interface DeleteFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface DeleteFunctionUrlConfigResponse {}
export interface DeleteLayerVersionRequest {
  LayerName: string;
  VersionNumber: number;
}
export interface DeleteLayerVersionResponse {}
export type Qualifier = string;
export interface DeleteProvisionedConcurrencyConfigRequest {
  FunctionName: string;
  Qualifier: string;
}
export interface DeleteProvisionedConcurrencyConfigResponse {}
export type PolicyResourceArn = string;
export type RevisionId = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
  RevisionId?: string;
}
export interface DeleteResourcePolicyResponse {}
export interface GetAccountSettingsRequest {}
export type UnreservedConcurrentExecutions = number;
export interface AccountLimit {
  TotalCodeSize?: number;
  CodeSizeUnzipped?: number;
  CodeSizeZipped?: number;
  ConcurrentExecutions?: number;
  UnreservedConcurrentExecutions?: number;
}
export interface AccountUsage {
  TotalCodeSize?: number;
  FunctionCount?: number;
}
export interface GetAccountSettingsResponse {
  AccountLimit?: AccountLimit;
  AccountUsage?: AccountUsage;
}
export interface GetAliasRequest {
  FunctionName: string;
  Name: string;
}
export interface GetCapacityProviderRequest {
  CapacityProviderName: string;
}
export interface GetCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export interface GetCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
}
export interface GetCodeSigningConfigResponse {
  CodeSigningConfig: CodeSigningConfig;
}
export type IncludeExecutionData = boolean;
export interface GetDurableExecutionRequest {
  DurableExecutionArn: string;
  IncludeExecutionData?: boolean;
}
export type DurableExecutionName = string;
export type OutputPayload = string | redacted.Redacted<string>;
export type ExecutionStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | "STOPPED"
  | (string & {});
export type XAmznTraceId = string;
export interface TraceHeader {
  XAmznTraceId?: string;
}
export type ExecutionDataIncluded = boolean;
export interface GetDurableExecutionResponse {
  DurableExecutionArn: string;
  DurableExecutionName: string;
  FunctionArn: string;
  InputPayload?: string | redacted.Redacted<string>;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
  StartTimestamp: Date;
  Status: ExecutionStatus;
  EndTimestamp?: Date;
  Version?: string;
  TraceHeader?: TraceHeader;
  ExecutionDataIncluded?: boolean;
  DurableConfig?: DurableConfig;
}
export type ItemCount = number;
export type ReverseOrder = boolean;
export interface GetDurableExecutionHistoryRequest {
  DurableExecutionArn: string;
  IncludeExecutionData?: boolean;
  MaxItems?: number;
  Marker?: string;
  ReverseOrder?: boolean;
}
export type EventType =
  | "ExecutionStarted"
  | "ExecutionSucceeded"
  | "ExecutionFailed"
  | "ExecutionTimedOut"
  | "ExecutionStopped"
  | "ContextStarted"
  | "ContextSucceeded"
  | "ContextFailed"
  | "WaitStarted"
  | "WaitSucceeded"
  | "WaitCancelled"
  | "StepStarted"
  | "StepSucceeded"
  | "StepFailed"
  | "ChainedInvokeStarted"
  | "ChainedInvokeSucceeded"
  | "ChainedInvokeFailed"
  | "ChainedInvokeTimedOut"
  | "ChainedInvokeStopped"
  | "CallbackStarted"
  | "CallbackSucceeded"
  | "CallbackFailed"
  | "CallbackTimedOut"
  | "InvocationCompleted"
  | (string & {});
export type EventId = number;
export type Truncated = boolean;
export interface EventInput {
  Payload?: string | redacted.Redacted<string>;
  Truncated?: boolean;
}
export interface ExecutionStartedDetails {
  Input: EventInput;
  ExecutionTimeout: number;
}
export interface EventResult {
  Payload?: string | redacted.Redacted<string>;
  Truncated?: boolean;
}
export interface ExecutionSucceededDetails {
  Result: EventResult;
}
export interface EventError {
  Payload?: ErrorObject;
  Truncated?: boolean;
}
export interface ExecutionFailedDetails {
  Error: EventError;
}
export interface ExecutionTimedOutDetails {
  Error?: EventError;
}
export interface ExecutionStoppedDetails {
  Error: EventError;
}
export interface ContextStartedDetails {}
export interface ContextSucceededDetails {
  Result: EventResult;
}
export interface ContextFailedDetails {
  Error: EventError;
}
export interface WaitStartedDetails {
  Duration: number;
  ScheduledEndTimestamp: Date;
}
export interface WaitSucceededDetails {
  Duration?: number;
}
export interface WaitCancelledDetails {
  Error?: EventError;
}
export interface StepStartedDetails {}
export interface RetryDetails {
  CurrentAttempt?: number;
  NextAttemptDelaySeconds?: number;
}
export interface StepSucceededDetails {
  Result: EventResult;
  RetryDetails: RetryDetails;
}
export interface StepFailedDetails {
  Error: EventError;
  RetryDetails: RetryDetails;
}
export interface ChainedInvokeStartedDetails {
  FunctionName: string;
  TenantId?: string;
  Input?: EventInput;
  ExecutedVersion?: string;
  DurableExecutionArn?: string;
}
export interface ChainedInvokeSucceededDetails {
  Result: EventResult;
}
export interface ChainedInvokeFailedDetails {
  Error: EventError;
}
export interface ChainedInvokeTimedOutDetails {
  Error: EventError;
}
export interface ChainedInvokeStoppedDetails {
  Error: EventError;
}
export interface CallbackStartedDetails {
  CallbackId: string;
  HeartbeatTimeout?: number;
  Timeout?: number;
}
export interface CallbackSucceededDetails {
  Result: EventResult;
}
export interface CallbackFailedDetails {
  Error: EventError;
}
export interface CallbackTimedOutDetails {
  Error: EventError;
}
export interface InvocationCompletedDetails {
  StartTimestamp: Date;
  EndTimestamp: Date;
  RequestId: string;
  Error?: EventError;
}
export interface Event {
  EventType?: EventType;
  SubType?: string;
  EventId?: number;
  Id?: string;
  Name?: string;
  EventTimestamp?: Date;
  ParentId?: string;
  ExecutionStartedDetails?: ExecutionStartedDetails;
  ExecutionSucceededDetails?: ExecutionSucceededDetails;
  ExecutionFailedDetails?: ExecutionFailedDetails;
  ExecutionTimedOutDetails?: ExecutionTimedOutDetails;
  ExecutionStoppedDetails?: ExecutionStoppedDetails;
  ContextStartedDetails?: ContextStartedDetails;
  ContextSucceededDetails?: ContextSucceededDetails;
  ContextFailedDetails?: ContextFailedDetails;
  WaitStartedDetails?: WaitStartedDetails;
  WaitSucceededDetails?: WaitSucceededDetails;
  WaitCancelledDetails?: WaitCancelledDetails;
  StepStartedDetails?: StepStartedDetails;
  StepSucceededDetails?: StepSucceededDetails;
  StepFailedDetails?: StepFailedDetails;
  ChainedInvokeStartedDetails?: ChainedInvokeStartedDetails;
  ChainedInvokeSucceededDetails?: ChainedInvokeSucceededDetails;
  ChainedInvokeFailedDetails?: ChainedInvokeFailedDetails;
  ChainedInvokeTimedOutDetails?: ChainedInvokeTimedOutDetails;
  ChainedInvokeStoppedDetails?: ChainedInvokeStoppedDetails;
  CallbackStartedDetails?: CallbackStartedDetails;
  CallbackSucceededDetails?: CallbackSucceededDetails;
  CallbackFailedDetails?: CallbackFailedDetails;
  CallbackTimedOutDetails?: CallbackTimedOutDetails;
  InvocationCompletedDetails?: InvocationCompletedDetails;
}
export type Events = Event[];
export interface GetDurableExecutionHistoryResponse {
  Events: Event[];
  NextMarker?: string;
}
export interface GetDurableExecutionStateRequest {
  DurableExecutionArn: string;
  CheckpointToken: string;
  Marker?: string;
  MaxItems?: number;
}
export interface GetDurableExecutionStateResponse {
  Operations: Operation[];
  NextMarker?: string;
}
export interface GetEventSourceMappingRequest {
  UUID: string;
}
export interface GetFunctionRequest {
  FunctionName: string;
  Qualifier?: string;
}
export type SensitiveStringOnServerOnly = string;
export interface ResolvedS3Object {
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
}
export interface FunctionCodeLocationError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export interface FunctionCodeLocation {
  RepositoryType?: string;
  Location?: string;
  ImageUri?: string;
  ResolvedImageUri?: string;
  ResolvedS3Object?: ResolvedS3Object;
  SourceKMSKeyArn?: string;
  Error?: FunctionCodeLocationError;
}
export type TagsErrorCode = string;
export type TagsErrorMessage = string;
export interface TagsError {
  ErrorCode: string;
  Message: string;
}
export type ReservedConcurrentExecutions = number;
export interface Concurrency {
  ReservedConcurrentExecutions?: number;
}
export interface GetFunctionResponse {
  Configuration?: FunctionConfiguration;
  Code?: FunctionCodeLocation;
  Tags?: { [key: string]: string | undefined };
  TagsError?: TagsError;
  Concurrency?: Concurrency;
}
export interface GetFunctionCodeSigningConfigRequest {
  FunctionName: string;
}
export interface GetFunctionCodeSigningConfigResponse {
  CodeSigningConfigArn: string;
  FunctionName: string;
}
export interface GetFunctionConcurrencyRequest {
  FunctionName: string;
}
export interface GetFunctionConcurrencyResponse {
  ReservedConcurrentExecutions?: number;
}
export interface GetFunctionConfigurationRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface GetFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export type MaximumRetryAttempts = number;
export type MaximumEventAgeInSeconds = number;
export interface FunctionEventInvokeConfig {
  LastModified?: Date;
  FunctionArn?: string;
  MaximumRetryAttempts?: number;
  MaximumEventAgeInSeconds?: number;
  DestinationConfig?: DestinationConfig;
}
export type UnqualifiedFunctionName = string;
export interface GetFunctionRecursionConfigRequest {
  FunctionName: string;
}
export type RecursiveLoop = "Allow" | "Terminate" | (string & {});
export interface GetFunctionRecursionConfigResponse {
  RecursiveLoop?: RecursiveLoop;
}
export type PublishedFunctionQualifier = string;
export interface GetFunctionScalingConfigRequest {
  FunctionName: string;
  Qualifier: string;
}
export type FunctionScalingConfigExecutionEnvironments = number;
export interface FunctionScalingConfig {
  MinExecutionEnvironments?: number;
  MaxExecutionEnvironments?: number;
}
export interface GetFunctionScalingConfigResponse {
  FunctionArn?: string;
  AppliedFunctionScalingConfig?: FunctionScalingConfig;
  RequestedFunctionScalingConfig?: FunctionScalingConfig;
}
export interface GetFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface GetFunctionUrlConfigResponse {
  FunctionUrl: string;
  FunctionArn: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  CreationTime: string;
  LastModifiedTime: string;
  InvokeMode?: InvokeMode;
}
export interface GetLayerVersionRequest {
  LayerName: string;
  VersionNumber: number;
}
export interface LayerVersionContentOutput {
  Location?: string;
  CodeSha256?: string;
  CodeSize?: number;
  SigningProfileVersionArn?: string;
  SigningJobArn?: string;
  ResolvedS3Object?: ResolvedS3Object;
}
export type LayerArn = string;
export type CompatibleArchitectures = Architecture[];
export type CompatibleRuntimes = Runtime[];
export type LicenseInfo = string;
export interface GetLayerVersionResponse {
  Content?: LayerVersionContentOutput;
  LayerArn?: string;
  LayerVersionArn?: string;
  Description?: string;
  CreatedDate?: string;
  Version?: number;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export interface GetLayerVersionByArnRequest {
  Arn: string;
}
export interface GetLayerVersionPolicyRequest {
  LayerName: string;
  VersionNumber: number;
}
export interface GetLayerVersionPolicyResponse {
  Policy?: string;
  RevisionId?: string;
}
export interface GetPolicyRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface GetPolicyResponse {
  Policy?: string;
  RevisionId?: string;
}
export interface GetProvisionedConcurrencyConfigRequest {
  FunctionName: string;
  Qualifier: string;
}
export type PositiveInteger = number;
export type NonNegativeInteger = number;
export type ProvisionedConcurrencyStatusEnum =
  | "IN_PROGRESS"
  | "READY"
  | "FAILED"
  | (string & {});
export interface GetProvisionedConcurrencyConfigResponse {
  RequestedProvisionedConcurrentExecutions?: number;
  AvailableProvisionedConcurrentExecutions?: number;
  AllocatedProvisionedConcurrentExecutions?: number;
  Status?: ProvisionedConcurrencyStatusEnum;
  StatusReason?: string;
  LastModified?: string;
}
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export type ResourcePolicy = string;
export interface GetResourcePolicyResponse {
  Policy?: string;
  RevisionId?: string;
}
export interface GetRuntimeManagementConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export type UpdateRuntimeOn =
  | "Auto"
  | "Manual"
  | "FunctionUpdate"
  | (string & {});
export interface GetRuntimeManagementConfigResponse {
  UpdateRuntimeOn?: UpdateRuntimeOn;
  FunctionArn?: string;
  RuntimeVersionArn?: string;
}
export type InvocationType =
  | "Event"
  | "RequestResponse"
  | "DryRun"
  | (string & {});
export type LogType = "None" | "Tail" | (string & {});
export interface InvocationRequest {
  FunctionName: string;
  InvocationType?: InvocationType;
  LogType?: LogType;
  ClientContext?: string;
  DurableExecutionName?: string;
  Payload?: T.StreamingInputBody;
  Qualifier?: string;
  TenantId?: string;
}
export interface InvocationResponse {
  StatusCode?: number;
  FunctionError?: string;
  LogResult?: string;
  Payload?: T.StreamingOutputBody;
  ExecutedVersion?: string;
  DurableExecutionArn?: string;
}
export interface InvokeAsyncRequest {
  FunctionName: string;
  InvokeArgs: T.StreamingInputBody;
}
export type HttpStatus = number;
export interface InvokeAsyncResponse {
  Status?: number;
}
export type ResponseStreamingInvocationType =
  | "RequestResponse"
  | "DryRun"
  | (string & {});
export interface InvokeWithResponseStreamRequest {
  FunctionName: string;
  LogType?: LogType;
  ClientContext?: string;
  Qualifier?: string;
  Payload?: T.StreamingInputBody;
  TenantId?: string;
  InvocationType?: ResponseStreamingInvocationType;
}
export interface InvokeResponseStreamUpdate {
  Payload?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface InvokeWithResponseStreamCompleteEvent {
  ErrorCode?: string;
  ErrorDetails?: string;
  LogResult?: string;
}
export type InvokeWithResponseStreamResponseEvent =
  | { PayloadChunk: InvokeResponseStreamUpdate; InvokeComplete?: never }
  | {
      PayloadChunk?: never;
      InvokeComplete: InvokeWithResponseStreamCompleteEvent;
    };
export interface InvokeWithResponseStreamResponse {
  StatusCode?: number;
  ExecutedVersion?: string;
  EventStream?: stream.Stream<
    InvokeWithResponseStreamResponseEvent,
    Error,
    never
  >;
  ResponseStreamContentType?: string;
}
export type MaxListItems = number;
export interface ListAliasesRequest {
  FunctionName: string;
  FunctionVersion?: string;
  Marker?: string;
  MaxItems?: number;
}
export type AliasList = AliasConfiguration[];
export interface ListAliasesResponse {
  NextMarker?: string;
  Aliases?: AliasConfiguration[];
}
export type MaxFiftyListItems = number;
export interface ListCapacityProvidersRequest {
  State?: CapacityProviderState;
  Marker?: string;
  MaxItems?: number;
}
export type CapacityProvidersList = CapacityProvider[];
export interface ListCapacityProvidersResponse {
  CapacityProviders: CapacityProvider[];
  NextMarker?: string;
}
export interface ListCodeSigningConfigsRequest {
  Marker?: string;
  MaxItems?: number;
}
export type CodeSigningConfigList = CodeSigningConfig[];
export interface ListCodeSigningConfigsResponse {
  NextMarker?: string;
  CodeSigningConfigs?: CodeSigningConfig[];
}
export type ExecutionStatusList = ExecutionStatus[];
export interface ListDurableExecutionsByFunctionRequest {
  FunctionName: string;
  Qualifier?: string;
  DurableExecutionName?: string;
  Statuses?: ExecutionStatus[];
  StartedAfter?: Date;
  StartedBefore?: Date;
  ReverseOrder?: boolean;
  Marker?: string;
  MaxItems?: number;
}
export interface Execution {
  DurableExecutionArn: string;
  DurableExecutionName: string;
  FunctionArn: string;
  Status: ExecutionStatus;
  StartTimestamp: Date;
  EndTimestamp?: Date;
  KMSKeyArn?: string;
}
export type DurableExecutions = Execution[];
export interface ListDurableExecutionsByFunctionResponse {
  DurableExecutions?: Execution[];
  NextMarker?: string;
}
export interface ListEventSourceMappingsRequest {
  EventSourceArn?: string;
  FunctionName?: string;
  Marker?: string;
  MaxItems?: number;
}
export type EventSourceMappingsList = EventSourceMappingConfiguration[];
export interface ListEventSourceMappingsResponse {
  NextMarker?: string;
  EventSourceMappings?: EventSourceMappingConfiguration[];
}
export type MaxFunctionEventInvokeConfigListItems = number;
export interface ListFunctionEventInvokeConfigsRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export type FunctionEventInvokeConfigList = FunctionEventInvokeConfig[];
export interface ListFunctionEventInvokeConfigsResponse {
  FunctionEventInvokeConfigs?: FunctionEventInvokeConfig[];
  NextMarker?: string;
}
export type MasterRegion = string;
export type FunctionVersion = "ALL" | (string & {});
export interface ListFunctionsRequest {
  MasterRegion?: string;
  FunctionVersion?: FunctionVersion;
  Marker?: string;
  MaxItems?: number;
}
export type FunctionList = FunctionConfiguration[];
export interface ListFunctionsResponse {
  NextMarker?: string;
  Functions?: FunctionConfiguration[];
}
export interface ListFunctionsByCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
  Marker?: string;
  MaxItems?: number;
}
export type FunctionArnList = string[];
export interface ListFunctionsByCodeSigningConfigResponse {
  NextMarker?: string;
  FunctionArns?: string[];
}
export type MaxItems = number;
export interface ListFunctionUrlConfigsRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface FunctionUrlConfig {
  FunctionUrl: string;
  FunctionArn: string;
  CreationTime: string;
  LastModifiedTime: string;
  Cors?: Cors;
  AuthType: FunctionUrlAuthType;
  InvokeMode?: InvokeMode;
}
export type FunctionUrlConfigList = FunctionUrlConfig[];
export interface ListFunctionUrlConfigsResponse {
  FunctionUrlConfigs: FunctionUrlConfig[];
  NextMarker?: string;
}
export interface ListFunctionVersionsByCapacityProviderRequest {
  CapacityProviderName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface FunctionVersionsByCapacityProviderListItem {
  FunctionArn: string;
  State: State;
}
export type FunctionVersionsByCapacityProviderList =
  FunctionVersionsByCapacityProviderListItem[];
export interface ListFunctionVersionsByCapacityProviderResponse {
  CapacityProviderArn: string;
  FunctionVersions: FunctionVersionsByCapacityProviderListItem[];
  NextMarker?: string;
}
export type MaxLayerListItems = number;
export interface ListLayersRequest {
  CompatibleArchitecture?: Architecture;
  CompatibleRuntime?: Runtime;
  Marker?: string;
  MaxItems?: number;
}
export interface LayerVersionsListItem {
  LayerVersionArn?: string;
  Version?: number;
  Description?: string;
  CreatedDate?: string;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export interface LayersListItem {
  LayerName?: string;
  LayerArn?: string;
  LatestMatchingVersion?: LayerVersionsListItem;
}
export type LayersList = LayersListItem[];
export interface ListLayersResponse {
  NextMarker?: string;
  Layers?: LayersListItem[];
}
export interface ListLayerVersionsRequest {
  CompatibleArchitecture?: Architecture;
  CompatibleRuntime?: Runtime;
  LayerName: string;
  Marker?: string;
  MaxItems?: number;
}
export type LayerVersionsList = LayerVersionsListItem[];
export interface ListLayerVersionsResponse {
  NextMarker?: string;
  LayerVersions?: LayerVersionsListItem[];
}
export type MaxProvisionedConcurrencyConfigListItems = number;
export interface ListProvisionedConcurrencyConfigsRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ProvisionedConcurrencyConfigListItem {
  FunctionArn?: string;
  RequestedProvisionedConcurrentExecutions?: number;
  AvailableProvisionedConcurrentExecutions?: number;
  AllocatedProvisionedConcurrentExecutions?: number;
  Status?: ProvisionedConcurrencyStatusEnum;
  StatusReason?: string;
  LastModified?: string;
}
export type ProvisionedConcurrencyConfigList =
  ProvisionedConcurrencyConfigListItem[];
export interface ListProvisionedConcurrencyConfigsResponse {
  ProvisionedConcurrencyConfigs?: ProvisionedConcurrencyConfigListItem[];
  NextMarker?: string;
}
export type TaggableResource = string;
export interface ListTagsRequest {
  Resource: string;
}
export interface ListTagsResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListVersionsByFunctionRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListVersionsByFunctionResponse {
  NextMarker?: string;
  Versions?: FunctionConfiguration[];
}
export interface LayerVersionContentInput {
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  S3ObjectStorageMode?: S3ObjectStorageMode;
  ZipFile?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface PublishLayerVersionRequest {
  LayerName: string;
  Description?: string;
  Content: LayerVersionContentInput;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export interface PublishLayerVersionResponse {
  Content?: LayerVersionContentOutput;
  LayerArn?: string;
  LayerVersionArn?: string;
  Description?: string;
  CreatedDate?: string;
  Version?: number;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export interface PublishVersionRequest {
  FunctionName: string;
  CodeSha256?: string;
  Description?: string;
  RevisionId?: string;
  PublishTo?: FunctionVersionLatestPublished;
}
export interface PutFunctionCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
  FunctionName: string;
}
export interface PutFunctionCodeSigningConfigResponse {
  CodeSigningConfigArn: string;
  FunctionName: string;
}
export interface PutFunctionConcurrencyRequest {
  FunctionName: string;
  ReservedConcurrentExecutions: number;
}
export interface PutFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  MaximumRetryAttempts?: number;
  MaximumEventAgeInSeconds?: number;
  DestinationConfig?: DestinationConfig;
}
export interface PutFunctionRecursionConfigRequest {
  FunctionName: string;
  RecursiveLoop: RecursiveLoop;
}
export interface PutFunctionRecursionConfigResponse {
  RecursiveLoop?: RecursiveLoop;
}
export interface PutFunctionScalingConfigRequest {
  FunctionName: string;
  Qualifier: string;
  FunctionScalingConfig?: FunctionScalingConfig;
}
export interface PutFunctionScalingConfigResponse {
  FunctionState?: State;
}
export interface PutProvisionedConcurrencyConfigRequest {
  FunctionName: string;
  Qualifier: string;
  ProvisionedConcurrentExecutions: number;
}
export interface PutProvisionedConcurrencyConfigResponse {
  RequestedProvisionedConcurrentExecutions?: number;
  AllocatedProvisionedConcurrentExecutions?: number;
  AvailableProvisionedConcurrentExecutions?: number;
  Status?: ProvisionedConcurrencyStatusEnum;
  StatusReason?: string;
  LastModified?: string;
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
  RevisionId?: string;
}
export interface PutResourcePolicyResponse {
  Policy?: string;
  RevisionId?: string;
}
export interface PutRuntimeManagementConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  UpdateRuntimeOn: UpdateRuntimeOn;
  RuntimeVersionArn?: string;
}
export interface PutRuntimeManagementConfigResponse {
  UpdateRuntimeOn: UpdateRuntimeOn;
  FunctionArn: string;
  RuntimeVersionArn?: string;
}
export interface RemoveLayerVersionPermissionRequest {
  LayerName: string;
  VersionNumber: number;
  StatementId: string;
  RevisionId?: string;
}
export interface RemoveLayerVersionPermissionResponse {}
export type NamespacedStatementId = string;
export interface RemovePermissionRequest {
  FunctionName: string;
  StatementId: string;
  Qualifier?: string;
  RevisionId?: string;
}
export interface RemovePermissionResponse {}
export interface SendDurableExecutionCallbackFailureRequest {
  CallbackId: string;
  Error?: ErrorObject;
}
export interface SendDurableExecutionCallbackFailureResponse {}
export interface SendDurableExecutionCallbackHeartbeatRequest {
  CallbackId: string;
}
export interface SendDurableExecutionCallbackHeartbeatResponse {}
export interface SendDurableExecutionCallbackSuccessRequest {
  CallbackId: string;
  Result?: T.StreamingInputBody;
}
export interface SendDurableExecutionCallbackSuccessResponse {}
export interface StopDurableExecutionRequest {
  DurableExecutionArn: string;
  Error?: ErrorObject;
}
export interface StopDurableExecutionResponse {
  StopTimestamp: Date;
}
export interface TagResourceRequest {
  Resource: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  Resource: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAliasRequest {
  FunctionName: string;
  Name: string;
  FunctionVersion?: string;
  Description?: string;
  RoutingConfig?: AliasRoutingConfiguration;
  RevisionId?: string;
}
export interface UpdateCapacityProviderRequest {
  CapacityProviderName: string;
  CapacityProviderScalingConfig?: CapacityProviderScalingConfig;
  PropagateTags?: PropagateTags;
  TelemetryConfig?: CapacityProviderTelemetryConfig;
}
export interface UpdateCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export interface UpdateCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
  Description?: string;
  AllowedPublishers?: AllowedPublishers;
  CodeSigningPolicies?: CodeSigningPolicies;
}
export interface UpdateCodeSigningConfigResponse {
  CodeSigningConfig: CodeSigningConfig;
}
export interface UpdateEventSourceMappingRequest {
  UUID: string;
  FunctionName?: string;
  Enabled?: boolean;
  BatchSize?: number;
  FilterCriteria?: FilterCriteria;
  KMSKeyArn?: string;
  MetricsConfig?: EventSourceMappingMetricsConfig;
  LoggingConfig?: EventSourceMappingLoggingConfig;
  ScalingConfig?: ScalingConfig;
  MaximumBatchingWindowInSeconds?: number;
  ParallelizationFactor?: number;
  DestinationConfig?: DestinationConfig;
  MaximumRecordAgeInSeconds?: number;
  BisectBatchOnFunctionError?: boolean;
  MaximumRetryAttempts?: number;
  TumblingWindowInSeconds?: number;
  SourceAccessConfigurations?: SourceAccessConfiguration[];
  FunctionResponseTypes?: FunctionResponseType[];
  AmazonManagedKafkaEventSourceConfig?: AmazonManagedKafkaEventSourceConfig;
  SelfManagedKafkaEventSourceConfig?: SelfManagedKafkaEventSourceConfig;
  DocumentDBEventSourceConfig?: DocumentDBEventSourceConfig;
  ProvisionedPollerConfig?: ProvisionedPollerConfig;
}
export interface UpdateFunctionCodeRequest {
  FunctionName: string;
  ZipFile?: Uint8Array | redacted.Redacted<Uint8Array>;
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  S3ObjectStorageMode?: S3ObjectStorageMode;
  ImageUri?: string;
  Architectures?: Architecture[];
  Publish?: boolean;
  PublishTo?: FunctionVersionLatestPublished;
  DryRun?: boolean;
  RevisionId?: string;
  SourceKMSKeyArn?: string;
}
export interface UpdateFunctionConfigurationRequest {
  FunctionName: string;
  Role?: string;
  Handler?: string;
  Description?: string;
  Timeout?: number;
  MemorySize?: number;
  VpcConfig?: VpcConfig;
  Environment?: Environment;
  Runtime?: Runtime;
  DeadLetterConfig?: DeadLetterConfig;
  KMSKeyArn?: string;
  TracingConfig?: TracingConfig;
  RevisionId?: string;
  Layers?: string[];
  FileSystemConfigs?: FileSystemConfig[];
  ImageConfig?: ImageConfig;
  EphemeralStorage?: EphemeralStorage;
  SnapStart?: SnapStart;
  LoggingConfig?: LoggingConfig;
  CapacityProviderConfig?: CapacityProviderConfig;
  DurableConfig?: DurableConfig;
}
export interface UpdateFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  MaximumRetryAttempts?: number;
  MaximumEventAgeInSeconds?: number;
  DestinationConfig?: DestinationConfig;
}
export interface UpdateFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  AuthType?: FunctionUrlAuthType;
  Cors?: Cors;
  InvokeMode?: InvokeMode;
}
export interface UpdateFunctionUrlConfigResponse {
  FunctionUrl: string;
  FunctionArn: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  CreationTime: string;
  LastModifiedTime: string;
  InvokeMode?: InvokeMode;
}
export type ThrottleReason =
  | "ConcurrentInvocationLimitExceeded"
  | "FunctionInvocationRateLimitExceeded"
  | "ReservedFunctionConcurrentInvocationLimitExceeded"
  | "ReservedFunctionInvocationRateLimitExceeded"
  | "CallerRateLimitExceeded"
  | "ConcurrentSnapshotCreateLimitExceeded"
  | (string & {});
export type AddLayerVersionPermissionError =
  | InvalidParameterValueException
  | PolicyLengthExceededException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Adds permissions to the resource-based policy of a version of an Lambda layer. Use this action to grant layer usage permission to other accounts. You can grant permission to a single account, all accounts in an organization, or all Amazon Web Services accounts.
 *
 * To revoke permission, call RemoveLayerVersionPermission with the statement ID that you specified when you added it.
 */
export const addLayerVersionPermission: API.OperationMethod<
  AddLayerVersionPermissionRequest,
  AddLayerVersionPermissionResponse,
  AddLayerVersionPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2018-10-31/layers/{LayerName}/versions/{VersionNumber}/policy",
    input: {
      LayerName: 0,
      VersionNumber: 0,
      StatementId: 0,
      Action: 0,
      Principal: 0,
      OrganizationId: 0,
      RevisionId: D.m({ query: "RevisionId" }),
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    PolicyLengthExceededException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddLayerVersionPermission",
})) as any;

export type AddPermissionError =
  | InvalidParameterValueException
  | PolicyLengthExceededException
  | PreconditionFailedException
  | PublicPolicyException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Grants a principal permission to use a function. You can apply the policy at the function level, or specify a qualifier to restrict access to a single version or alias. If you use a qualifier, the invoker must use the full Amazon Resource Name (ARN) of that version or alias to invoke the function. Note: Lambda does not support adding policies to version $LATEST.
 *
 * To grant permission to another account, specify the account ID as the `Principal`. To grant permission to an organization defined in Organizations, specify the organization ID as the `PrincipalOrgID`. For Amazon Web Services services, the principal is a domain-style identifier that the service defines, such as `s3.amazonaws.com` or `sns.amazonaws.com`. For Amazon Web Services services, you can also specify the ARN of the associated resource as the `SourceArn`. If you grant permission to a service principal without specifying the source, other accounts could potentially configure resources in their account to invoke your Lambda function.
 *
 * This operation adds a statement to a resource-based permissions policy for the function. For more information about function policies, see Using resource-based policies for Lambda.
 */
export const addPermission: API.OperationMethod<
  AddPermissionRequest,
  AddPermissionResponse,
  AddPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-03-31/functions/{FunctionName}/policy",
    input: {
      FunctionName: 0,
      StatementId: 0,
      Action: 0,
      Principal: 0,
      SourceArn: 0,
      FunctionUrlAuthType: 0,
      InvokedViaFunctionUrl: 0,
      SourceAccount: 0,
      EventSourceToken: 0,
      Qualifier: D.m({ query: "Qualifier" }),
      RevisionId: 0,
      PrincipalOrgID: 0,
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    PolicyLengthExceededException,
    PreconditionFailedException,
    PublicPolicyException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddPermission",
})) as any;

export type CheckpointDurableExecutionError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Saves the progress of a durable function execution during runtime. This API is used by the Lambda durable functions SDK to checkpoint completed steps and schedule asynchronous operations. You typically don't need to call this API directly as the SDK handles checkpointing automatically.
 *
 * Each checkpoint operation consumes the current checkpoint token and returns a new one for the next checkpoint. This ensures that checkpoints are applied in the correct order and prevents duplicate or out-of-order state updates.
 */
export const checkpointDurableExecution: API.OperationMethod<
  CheckpointDurableExecutionRequest,
  CheckpointDurableExecutionResponse,
  CheckpointDurableExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2025-12-01/durable-executions/{DurableExecutionArn}/checkpoint",
    input: {
      DurableExecutionArn: 0,
      CheckpointToken: 0,
      Updates: D.list({
        Id: 0,
        ParentId: 0,
        Name: 0,
        Type: 0,
        SubType: 0,
        Action: 0,
        Payload: 0,
        Error: i_ErrorObject,
        ContextOptions: { ReplayChildren: 0 },
        StepOptions: { NextAttemptDelaySeconds: 0 },
        WaitOptions: { WaitSeconds: 0 },
        CallbackOptions: { TimeoutSeconds: 0, HeartbeatTimeoutSeconds: 0 },
        ChainedInvokeOptions: { FunctionName: 0, TenantId: 0 },
      }),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { NewExecutionState: { Operations: D.list(o_Operation) } },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckpointDurableExecution",
})) as any;

export type CreateAliasError =
  | AliasLimitExceededException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates an alias for a Lambda function version. Use aliases to provide clients with a function identifier that you can update to invoke a different version.
 *
 * You can also map an alias to split invocation requests between two versions. Use the `RoutingConfig` parameter to specify a second version and the percentage of invocation requests that it receives.
 */
export const createAlias: API.OperationMethod<
  CreateAliasRequest,
  AliasConfiguration,
  CreateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-03-31/functions/{FunctionName}/aliases",
    input: {
      FunctionName: 0,
      Name: 0,
      FunctionVersion: 0,
      Description: 0,
      RoutingConfig: i_AliasRoutingConfiguration,
    },
    body: true,
  },
  errors: [
    AliasLimitExceededException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAlias",
})) as any;

export type CreateCapacityProviderError =
  | CapacityProviderLimitExceededException
  | InvalidParameterValueException
  | ResourceConflictException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a capacity provider that manages compute resources for Lambda functions
 */
export const createCapacityProvider: API.OperationMethod<
  CreateCapacityProviderRequest,
  CreateCapacityProviderResponse,
  CreateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2025-11-30/capacity-providers",
    input: {
      CapacityProviderName: 0,
      VpcConfig: { SubnetIds: 0, SecurityGroupIds: 0 },
      PermissionsConfig: { CapacityProviderOperatorRoleArn: 0 },
      InstanceRequirements: {
        Architectures: 0,
        AllowedInstanceTypes: 0,
        ExcludedInstanceTypes: 0,
      },
      CapacityProviderScalingConfig: i_CapacityProviderScalingConfig,
      KmsKeyArn: 0,
      Tags: 0,
      PropagateTags: i_PropagateTags,
      TelemetryConfig: i_CapacityProviderTelemetryConfig,
    },
    body: true,
  },
  errors: [
    CapacityProviderLimitExceededException,
    InvalidParameterValueException,
    ResourceConflictException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapacityProvider",
})) as any;

export type CreateCodeSigningConfigError =
  | InvalidParameterValueException
  | ServiceException
  | CommonErrors;
/**
 * Creates a code signing configuration. A code signing configuration defines a list of allowed signing profiles and defines the code-signing validation policy (action to be taken if deployment validation checks fail).
 */
export const createCodeSigningConfig: API.OperationMethod<
  CreateCodeSigningConfigRequest,
  CreateCodeSigningConfigResponse,
  CreateCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-04-22/code-signing-configs",
    input: {
      Description: 0,
      AllowedPublishers: i_AllowedPublishers,
      CodeSigningPolicies: i_CodeSigningPolicies,
      Tags: 0,
    },
    body: true,
  },
  errors: [InvalidParameterValueException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCodeSigningConfig",
})) as any;

export type CreateEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ResourceInUseException
  | CommonErrors;
/**
 * Creates a mapping between an event source and an Lambda function. Lambda reads items from the event source and invokes the function.
 *
 * For details about how to configure different event sources, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 *
 * The following error handling options are available for stream sources (DynamoDB, Kinesis, Amazon MSK, and self-managed Apache Kafka):
 *
 * - `BisectBatchOnFunctionError` – If the function returns an error, split the batch in two and retry.
 *
 * - `MaximumRecordAgeInSeconds` – Discard records older than the specified age. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires
 *
 * - `MaximumRetryAttempts` – Discard records after the specified number of retries. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires.
 *
 * - `OnFailure` – Send discarded records to an Amazon SQS queue, Amazon SNS topic, Kafka topic, or Amazon S3 bucket. For more information, see Adding a destination.
 *
 * The following option is available only for DynamoDB and Kinesis event sources:
 *
 * - `ParallelizationFactor` – Process multiple batches from each shard concurrently.
 *
 * For information about which configuration parameters apply to each event source, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 */
export const createEventSourceMapping: API.OperationMethod<
  CreateEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  CreateEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-03-31/event-source-mappings",
    input: {
      EventSourceArn: 0,
      FunctionName: 0,
      Enabled: 0,
      BatchSize: 0,
      FilterCriteria: i_FilterCriteria,
      KMSKeyArn: 0,
      MetricsConfig: i_EventSourceMappingMetricsConfig,
      LoggingConfig: i_EventSourceMappingLoggingConfig,
      ScalingConfig: i_ScalingConfig,
      MaximumBatchingWindowInSeconds: 0,
      ParallelizationFactor: 0,
      StartingPosition: 0,
      StartingPositionTimestamp: 0,
      DestinationConfig: i_DestinationConfig,
      MaximumRecordAgeInSeconds: 0,
      BisectBatchOnFunctionError: 0,
      MaximumRetryAttempts: 0,
      Tags: 0,
      TumblingWindowInSeconds: 0,
      Topics: 0,
      Queues: 0,
      SourceAccessConfigurations: D.list(i_SourceAccessConfiguration),
      SelfManagedEventSource: { Endpoints: 0 },
      FunctionResponseTypes: 0,
      AmazonManagedKafkaEventSourceConfig:
        i_AmazonManagedKafkaEventSourceConfig,
      SelfManagedKafkaEventSourceConfig: i_SelfManagedKafkaEventSourceConfig,
      DocumentDBEventSourceConfig: i_DocumentDBEventSourceConfig,
      ProvisionedPollerConfig: i_ProvisionedPollerConfig,
    },
    output: { StartingPositionTimestamp: D.ts, LastModified: D.ts },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventSourceMapping",
})) as any;

export type CreateFunctionError =
  | CodeSigningConfigNotFoundException
  | CodeStorageExceededException
  | CodeVerificationFailedException
  | FunctionVersionsPerCapacityProviderLimitExceededException
  | InvalidCodeSignatureException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | LambdaInternalKmsError
  | CommonErrors;
/**
 * Creates a Lambda function. To create a function, you need a deployment package and an execution role. The deployment package is a .zip file archive or container image that contains your function code. The execution role grants the function permission to use Amazon Web Services services, such as Amazon CloudWatch Logs for log streaming and X-Ray for request tracing.
 *
 * If the deployment package is a container image, then you set the package type to `Image`. For a container image, the code property must include the URI of a container image in the Amazon ECR registry. You do not need to specify the handler and runtime properties.
 *
 * If the deployment package is a .zip file archive, then you set the package type to `Zip`. For a .zip file archive, the code property specifies the location of the .zip file. You must also specify the handler and runtime properties. The code in the deployment package must be compatible with the target instruction set architecture of the function (`x86-64` or `arm64`). If you do not specify the architecture, then the default value is `x86-64`.
 *
 * When you create a function, Lambda provisions an instance of the function and its supporting resources. If your function connects to a VPC, this process can take a minute or so. During this time, you can't invoke or modify the function. The `State`, `StateReason`, and `StateReasonCode` fields in the response from GetFunctionConfiguration indicate when the function is ready to invoke. For more information, see Lambda function states.
 *
 * A function has an unpublished version, and can have published versions and aliases. The unpublished version changes when you update your function's code and configuration. A published version is a snapshot of your function code and configuration that can't be changed. An alias is a named resource that maps to a version, and can be changed to map to a different version. Use the `Publish` parameter to create version `1` of your function from its initial configuration.
 *
 * The other parameters let you configure version-specific and function-level settings. You can modify version-specific settings later with UpdateFunctionConfiguration. Function-level settings apply to both the unpublished and published versions of the function, and include tags (TagResource) and per-function concurrency limits (PutFunctionConcurrency).
 *
 * You can use code signing if your deployment package is a .zip file archive. To enable code signing for this function, specify the ARN of a code-signing configuration. When a user attempts to deploy a code package with UpdateFunctionCode, Lambda checks that the code package has a valid signature from a trusted publisher. The code-signing configuration includes set of signing profiles, which define the trusted publishers for this function.
 *
 * If another Amazon Web Services account or an Amazon Web Services service invokes your function, use AddPermission to grant permission by creating a resource-based Identity and Access Management (IAM) policy. You can grant permissions at the function level, on a version, or on an alias.
 *
 * To invoke your function directly, use Invoke. To invoke your function in response to events in other Amazon Web Services services, create an event source mapping (CreateEventSourceMapping), or configure a function trigger in the other service. For more information, see Invoking Lambda functions.
 */
export const createFunction: API.OperationMethod<
  CreateFunctionRequest,
  FunctionConfiguration,
  CreateFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-03-31/functions",
    input: {
      FunctionName: 0,
      Runtime: 0,
      Role: 0,
      Handler: 0,
      Code: {
        ZipFile: 0,
        S3Bucket: 0,
        S3Key: 0,
        S3ObjectVersion: 0,
        S3ObjectStorageMode: 0,
        ImageUri: 0,
        SourceKMSKeyArn: 0,
      },
      Description: 0,
      Timeout: 0,
      MemorySize: 0,
      Publish: 0,
      PublishTo: 0,
      VpcConfig: i_VpcConfig,
      PackageType: 0,
      DeadLetterConfig: i_DeadLetterConfig,
      Environment: i_Environment,
      KMSKeyArn: 0,
      TracingConfig: i_TracingConfig,
      Tags: 0,
      Layers: 0,
      FileSystemConfigs: D.list(i_FileSystemConfig),
      CodeSigningConfigArn: 0,
      ImageConfig: i_ImageConfig,
      Architectures: 0,
      EphemeralStorage: i_EphemeralStorage,
      SnapStart: i_SnapStart,
      LoggingConfig: i_LoggingConfig,
      TenancyConfig: { TenantIsolationMode: 0 },
      CapacityProviderConfig: i_CapacityProviderConfig,
      DurableConfig: i_DurableConfig,
    },
    output: {
      Environment: o_EnvironmentResponse,
      ImageConfigResponse: o_ImageConfigResponse,
      RuntimeVersionConfig: o_RuntimeVersionConfig,
    },
    body: true,
  },
  errors: [
    CodeSigningConfigNotFoundException,
    CodeStorageExceededException,
    CodeVerificationFailedException,
    FunctionVersionsPerCapacityProviderLimitExceededException,
    InvalidCodeSignatureException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    LambdaInternalKmsError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunction",
})) as any;

export type CreateFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates a Lambda function URL with the specified configuration parameters. A function URL is a dedicated HTTP(S) endpoint that you can use to invoke your function.
 */
export const createFunctionUrlConfig: API.OperationMethod<
  CreateFunctionUrlConfigRequest,
  CreateFunctionUrlConfigResponse,
  CreateFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-10-31/functions/{FunctionName}/url",
    input: {
      FunctionName: 0,
      Qualifier: D.m({ query: "Qualifier" }),
      AuthType: 0,
      Cors: i_Cors,
      InvokeMode: 0,
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunctionUrlConfig",
})) as any;

export type DeleteAliasError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | CommonErrors;
/**
 * Deletes a Lambda function alias.
 */
export const deleteAlias: API.OperationMethod<
  DeleteAliasRequest,
  DeleteAliasResponse,
  DeleteAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-03-31/functions/{FunctionName}/aliases/{Name}",
    input: { FunctionName: 0, Name: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlias",
})) as any;

export type DeleteCapacityProviderError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a capacity provider. You cannot delete a capacity provider that is currently being used by Lambda functions.
 */
export const deleteCapacityProvider: API.OperationMethod<
  DeleteCapacityProviderRequest,
  DeleteCapacityProviderResponse,
  DeleteCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2025-11-30/capacity-providers/{CapacityProviderName}",
    input: { CapacityProviderName: 0 },
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
  operationName: "DeleteCapacityProvider",
})) as any;

export type DeleteCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes the code signing configuration. You can delete the code signing configuration only if no function is using it.
 */
export const deleteCodeSigningConfig: API.OperationMethod<
  DeleteCodeSigningConfigRequest,
  DeleteCodeSigningConfigResponse,
  DeleteCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-04-22/code-signing-configs/{CodeSigningConfigArn}",
    input: { CodeSigningConfigArn: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCodeSigningConfig",
})) as any;

export type DeleteEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an event source mapping. You can get the identifier of a mapping from the output of ListEventSourceMappings.
 *
 * When you delete an event source mapping, it enters a `Deleting` state and might not be completely deleted for several seconds.
 */
export const deleteEventSourceMapping: API.OperationMethod<
  DeleteEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  DeleteEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-03-31/event-source-mappings/{UUID}",
    input: { UUID: 0 },
    output: { StartingPositionTimestamp: D.ts, LastModified: D.ts },
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSourceMapping",
})) as any;

export type DeleteFunctionError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Lambda function. To delete a specific function version, use the `Qualifier` parameter. Otherwise, all versions and aliases are deleted. This doesn't require the user to have explicit permissions for DeleteAlias.
 *
 * A deleted Lambda function cannot be recovered. Ensure that you specify the correct function name and version before deleting.
 *
 * To delete Lambda event source mappings that invoke a function, use DeleteEventSourceMapping. For Amazon Web Services services and resources that invoke your function directly, delete the trigger in the service where you originally configured it.
 */
export const deleteFunction: API.OperationMethod<
  DeleteFunctionRequest,
  DeleteFunctionResponse,
  DeleteFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-03-31/functions/{FunctionName}",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
    output: { StatusCode: D.m({ status: true }) },
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
  operationName: "DeleteFunction",
})) as any;

export type DeleteFunctionCodeSigningConfigError =
  | CodeSigningConfigNotFoundException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the code signing configuration from the function.
 */
export const deleteFunctionCodeSigningConfig: API.OperationMethod<
  DeleteFunctionCodeSigningConfigRequest,
  DeleteFunctionCodeSigningConfigResponse,
  DeleteFunctionCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-06-30/functions/{FunctionName}/code-signing-config",
    input: { FunctionName: 0 },
  },
  errors: [
    CodeSigningConfigNotFoundException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionCodeSigningConfig",
})) as any;

export type DeleteFunctionConcurrencyError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Removes a concurrent execution limit from a function.
 */
export const deleteFunctionConcurrency: API.OperationMethod<
  DeleteFunctionConcurrencyRequest,
  DeleteFunctionConcurrencyResponse,
  DeleteFunctionConcurrencyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2017-10-31/functions/{FunctionName}/concurrency",
    input: { FunctionName: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionConcurrency",
})) as any;

export type DeleteFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes the configuration for asynchronous invocation for a function, version, or alias.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const deleteFunctionEventInvokeConfig: API.OperationMethod<
  DeleteFunctionEventInvokeConfigRequest,
  DeleteFunctionEventInvokeConfigResponse,
  DeleteFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2019-09-25/functions/{FunctionName}/event-invoke-config",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionEventInvokeConfig",
})) as any;

export type DeleteFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes a Lambda function URL. When you delete a function URL, you can't recover it. Creating a new function URL results in a different URL address.
 */
export const deleteFunctionUrlConfig: API.OperationMethod<
  DeleteFunctionUrlConfigRequest,
  DeleteFunctionUrlConfigResponse,
  DeleteFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2021-10-31/functions/{FunctionName}/url",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionUrlConfig",
})) as any;

export type DeleteLayerVersionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes a version of an Lambda layer. Deleted versions can no longer be viewed or added to functions. To avoid breaking functions, a copy of the version remains in Lambda until no functions refer to it.
 */
export const deleteLayerVersion: API.OperationMethod<
  DeleteLayerVersionRequest,
  DeleteLayerVersionResponse,
  DeleteLayerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2018-10-31/layers/{LayerName}/versions/{VersionNumber}",
    input: { LayerName: 0, VersionNumber: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLayerVersion",
})) as any;

export type DeleteProvisionedConcurrencyConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes the provisioned concurrency configuration for a function.
 */
export const deleteProvisionedConcurrencyConfig: API.OperationMethod<
  DeleteProvisionedConcurrencyConfigRequest,
  DeleteProvisionedConcurrencyConfigResponse,
  DeleteProvisionedConcurrencyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2019-09-30/functions/{FunctionName}/provisioned-concurrency",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisionedConcurrencyConfig",
})) as any;

export type DeleteResourcePolicyError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a resource-based policy from a Lambda resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2026-07-09/resource-policy/{ResourceArn}",
    input: { ResourceArn: 0, RevisionId: D.m({ query: "RevisionId" }) },
  },
  errors: [
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type GetAccountSettingsError =
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves details about your account's limits and usage in an Amazon Web Services Region.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsResponse,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2016-08-19/account-settings",
    input: {},
  },
  errors: [ServiceException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
})) as any;

export type GetAliasError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details about a Lambda function alias.
 */
export const getAlias: API.OperationMethod<
  GetAliasRequest,
  AliasConfiguration,
  GetAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-03-31/functions/{FunctionName}/aliases/{Name}",
    input: { FunctionName: 0, Name: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAlias",
})) as any;

export type GetCapacityProviderError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a specific capacity provider, including its configuration, state, and associated resources.
 */
export const getCapacityProvider: API.OperationMethod<
  GetCapacityProviderRequest,
  GetCapacityProviderResponse,
  GetCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2025-11-30/capacity-providers/{CapacityProviderName}",
    input: { CapacityProviderName: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityProvider",
})) as any;

export type GetCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns information about the specified code signing configuration.
 */
export const getCodeSigningConfig: API.OperationMethod<
  GetCodeSigningConfigRequest,
  GetCodeSigningConfigResponse,
  GetCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-04-22/code-signing-configs/{CodeSigningConfigArn}",
    input: { CodeSigningConfigArn: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodeSigningConfig",
})) as any;

export type GetDurableExecutionError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific durable execution, including its current status, input payload, result or error information, and execution metadata such as start time and usage statistics.
 */
export const getDurableExecution: API.OperationMethod<
  GetDurableExecutionRequest,
  GetDurableExecutionResponse,
  GetDurableExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2025-12-01/durable-executions/{DurableExecutionArn}",
    input: {
      DurableExecutionArn: 0,
      IncludeExecutionData: D.m({ query: "IncludeExecutionData" }),
    },
    output: {
      InputPayload: D.secret,
      Result: D.secret,
      Error: o_ErrorObject,
      StartTimestamp: D.ts,
      EndTimestamp: D.ts,
    },
  },
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDurableExecution",
})) as any;

export type GetDurableExecutionHistoryError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the execution history for a durable execution, showing all the steps, callbacks, and events that occurred during the execution. This provides a detailed audit trail of the execution's progress over time.
 *
 * The history is available while the execution is running and for a retention period after it completes (1-90 days, default 30 days). You can control whether to include execution data such as step results and callback payloads.
 */
export const getDurableExecutionHistory: API.PaginatedOperationMethod<
  GetDurableExecutionHistoryRequest,
  GetDurableExecutionHistoryResponse,
  GetDurableExecutionHistoryError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2025-12-01/durable-executions/{DurableExecutionArn}/history",
    input: {
      DurableExecutionArn: 0,
      IncludeExecutionData: D.m({ query: "IncludeExecutionData" }),
      MaxItems: D.m({ query: "MaxItems" }),
      Marker: D.m({ query: "Marker" }),
      ReverseOrder: D.m({ query: "ReverseOrder" }),
    },
    output: {
      Events: D.list({
        EventTimestamp: D.ts,
        ExecutionStartedDetails: { Input: o_EventInput },
        ExecutionSucceededDetails: { Result: o_EventResult },
        ExecutionFailedDetails: { Error: o_EventError },
        ExecutionTimedOutDetails: { Error: o_EventError },
        ExecutionStoppedDetails: { Error: o_EventError },
        ContextSucceededDetails: { Result: o_EventResult },
        ContextFailedDetails: { Error: o_EventError },
        WaitStartedDetails: { ScheduledEndTimestamp: D.ts },
        WaitCancelledDetails: { Error: o_EventError },
        StepSucceededDetails: { Result: o_EventResult },
        StepFailedDetails: { Error: o_EventError },
        ChainedInvokeStartedDetails: { Input: o_EventInput },
        ChainedInvokeSucceededDetails: { Result: o_EventResult },
        ChainedInvokeFailedDetails: { Error: o_EventError },
        ChainedInvokeTimedOutDetails: { Error: o_EventError },
        ChainedInvokeStoppedDetails: { Error: o_EventError },
        CallbackSucceededDetails: { Result: o_EventResult },
        CallbackFailedDetails: { Error: o_EventError },
        CallbackTimedOutDetails: { Error: o_EventError },
        InvocationCompletedDetails: {
          StartTimestamp: D.ts,
          EndTimestamp: D.ts,
          Error: o_EventError,
        },
      }),
    },
  },
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDurableExecutionHistory",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Events",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type GetDurableExecutionStateError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the current execution state required for the replay process during durable function execution. This API is used by the Lambda durable functions SDK to get state information needed for replay. You typically don't need to call this API directly as the SDK handles state management automatically.
 *
 * The response contains operations ordered by start sequence number in ascending order. Completed operations with children don't include child operation details since they don't need to be replayed.
 */
export const getDurableExecutionState: API.PaginatedOperationMethod<
  GetDurableExecutionStateRequest,
  GetDurableExecutionStateResponse,
  GetDurableExecutionStateError,
  Credentials | HttpClient.HttpClient,
  Operation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2025-12-01/durable-executions/{DurableExecutionArn}/state",
    input: {
      DurableExecutionArn: 0,
      CheckpointToken: D.m({ query: "CheckpointToken" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: { Operations: D.list(o_Operation) },
  },
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDurableExecutionState",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Operations",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type GetEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details about an event source mapping. You can get the identifier of a mapping from the output of ListEventSourceMappings.
 */
export const getEventSourceMapping: API.OperationMethod<
  GetEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  GetEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-03-31/event-source-mappings/{UUID}",
    input: { UUID: 0 },
    output: { StartingPositionTimestamp: D.ts, LastModified: D.ts },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventSourceMapping",
})) as any;

export type GetFunctionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about the function or function version, with a link to download the deployment package that's valid for 10 minutes. If you specify a function version, only details that are specific to that version are returned.
 */
export const getFunction: API.OperationMethod<
  GetFunctionRequest,
  GetFunctionResponse,
  GetFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-03-31/functions/{FunctionName}",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
    output: {
      Configuration: o_FunctionConfiguration,
      Code: { Error: { Message: D.secret } },
    },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunction",
})) as any;

export type GetFunctionCodeSigningConfigError =
  | CodeSigningConfigNotFoundException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the code signing configuration for the specified function.
 */
export const getFunctionCodeSigningConfig: API.OperationMethod<
  GetFunctionCodeSigningConfigRequest,
  GetFunctionCodeSigningConfigResponse,
  GetFunctionCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-06-30/functions/{FunctionName}/code-signing-config",
    input: { FunctionName: 0 },
  },
  errors: [
    CodeSigningConfigNotFoundException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionCodeSigningConfig",
})) as any;

export type GetFunctionConcurrencyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns details about the reserved concurrency configuration for a function. To set a concurrency limit for a function, use PutFunctionConcurrency.
 */
export const getFunctionConcurrency: API.OperationMethod<
  GetFunctionConcurrencyRequest,
  GetFunctionConcurrencyResponse,
  GetFunctionConcurrencyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2019-09-30/functions/{FunctionName}/concurrency",
    input: { FunctionName: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionConcurrency",
})) as any;

export type GetFunctionConfigurationError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the version-specific settings of a Lambda function or version. The output includes only options that can vary between versions of a function. To modify these settings, use UpdateFunctionConfiguration.
 *
 * To get all of a function's details, including function-level settings, use GetFunction.
 */
export const getFunctionConfiguration: API.OperationMethod<
  GetFunctionConfigurationRequest,
  FunctionConfiguration,
  GetFunctionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-03-31/functions/{FunctionName}/configuration",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
    output: {
      Environment: o_EnvironmentResponse,
      ImageConfigResponse: o_ImageConfigResponse,
      RuntimeVersionConfig: o_RuntimeVersionConfig,
    },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionConfiguration",
})) as any;

export type GetFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves the configuration for asynchronous invocation for a function, version, or alias.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const getFunctionEventInvokeConfig: API.OperationMethod<
  GetFunctionEventInvokeConfigRequest,
  FunctionEventInvokeConfig,
  GetFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2019-09-25/functions/{FunctionName}/event-invoke-config",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
    output: { LastModified: D.ts },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionEventInvokeConfig",
})) as any;

export type GetFunctionRecursionConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns your function's recursive loop detection configuration.
 */
export const getFunctionRecursionConfig: API.OperationMethod<
  GetFunctionRecursionConfigRequest,
  GetFunctionRecursionConfigResponse,
  GetFunctionRecursionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2024-08-31/functions/{FunctionName}/recursion-config",
    input: { FunctionName: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionRecursionConfig",
})) as any;

export type GetFunctionScalingConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the scaling configuration for a Lambda Managed Instances function.
 */
export const getFunctionScalingConfig: API.OperationMethod<
  GetFunctionScalingConfigRequest,
  GetFunctionScalingConfigResponse,
  GetFunctionScalingConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2025-11-30/functions/{FunctionName}/function-scaling-config",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionScalingConfig",
})) as any;

export type GetFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details about a Lambda function URL.
 */
export const getFunctionUrlConfig: API.OperationMethod<
  GetFunctionUrlConfigRequest,
  GetFunctionUrlConfigResponse,
  GetFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-10-31/functions/{FunctionName}/url",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionUrlConfig",
})) as any;

export type GetLayerVersionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns information about a version of an Lambda layer, with a link to download the layer archive that's valid for 10 minutes.
 */
export const getLayerVersion: API.OperationMethod<
  GetLayerVersionRequest,
  GetLayerVersionResponse,
  GetLayerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2018-10-31/layers/{LayerName}/versions/{VersionNumber}",
    input: { LayerName: 0, VersionNumber: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLayerVersion",
})) as any;

export type GetLayerVersionByArnError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about a version of an Lambda layer, with a link to download the layer archive that's valid for 10 minutes.
 */
export const getLayerVersionByArn: API.OperationMethod<
  GetLayerVersionByArnRequest,
  GetLayerVersionResponse,
  GetLayerVersionByArnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2018-10-31/layers?find=LayerVersion",
    input: { Arn: D.m({ query: "Arn" }) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLayerVersionByArn",
})) as any;

export type GetLayerVersionPolicyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns the permission policy for a version of an Lambda layer. For more information, see AddLayerVersionPermission.
 */
export const getLayerVersionPolicy: API.OperationMethod<
  GetLayerVersionPolicyRequest,
  GetLayerVersionPolicyResponse,
  GetLayerVersionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2018-10-31/layers/{LayerName}/versions/{VersionNumber}/policy",
    input: { LayerName: 0, VersionNumber: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLayerVersionPolicy",
})) as any;

export type GetPolicyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the resource-based IAM policy for a function, version, or alias.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-03-31/functions/{FunctionName}/policy",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
})) as any;

export type GetProvisionedConcurrencyConfigError =
  | InvalidParameterValueException
  | ProvisionedConcurrencyConfigNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves the provisioned concurrency configuration for a function's alias or version.
 */
export const getProvisionedConcurrencyConfig: API.OperationMethod<
  GetProvisionedConcurrencyConfigRequest,
  GetProvisionedConcurrencyConfigResponse,
  GetProvisionedConcurrencyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2019-09-30/functions/{FunctionName}/provisioned-concurrency",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
  },
  errors: [
    InvalidParameterValueException,
    ProvisionedConcurrencyConfigNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProvisionedConcurrencyConfig",
})) as any;

export type GetResourcePolicyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the resource-based policy attached to a Lambda resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2026-07-09/resource-policy/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type GetRuntimeManagementConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the runtime management configuration for a function's version. If the runtime update mode is **Manual**, this includes the ARN of the runtime version and the runtime update mode. If the runtime update mode is **Auto** or **Function update**, this includes the runtime update mode and `null` is returned for the ARN. For more information, see Runtime updates.
 */
export const getRuntimeManagementConfig: API.OperationMethod<
  GetRuntimeManagementConfigRequest,
  GetRuntimeManagementConfigResponse,
  GetRuntimeManagementConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-07-20/functions/{FunctionName}/runtime-management-config",
    input: { FunctionName: 0, Qualifier: D.m({ query: "Qualifier" }) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuntimeManagementConfig",
})) as any;

export type InvokeError =
  | CodeArtifactUserDeletedException
  | CodeArtifactUserFailedException
  | CodeArtifactUserPendingException
  | DurableExecutionAlreadyStartedException
  | EC2AccessDeniedException
  | EC2ThrottledException
  | EC2UnexpectedException
  | EFSIOException
  | EFSMountConnectivityException
  | EFSMountFailureException
  | EFSMountTimeoutException
  | ENILimitReachedException
  | ENINotReadyException
  | InvalidParameterValueException
  | InvalidRequestContentException
  | InvalidRuntimeException
  | InvalidSecurityGroupIDException
  | InvalidSubnetIDException
  | InvalidZipFileException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ModeNotSupportedException
  | NoPublishedVersionException
  | RecursiveInvocationException
  | RequestTooLargeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | S3FilesMountConnectivityException
  | S3FilesMountFailureException
  | S3FilesMountTimeoutException
  | SerializedRequestEntityTooLargeException
  | ServiceException
  | ServiceQuotaExceededException
  | SnapStartException
  | SnapStartNotReadyException
  | SnapStartRegenerationFailureException
  | SnapStartTimeoutException
  | SubnetIPAddressLimitReachedException
  | TooManyRequestsException
  | UnsupportedMediaTypeException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Invokes a Lambda function. You can invoke a function synchronously (and wait for the response), or asynchronously. By default, Lambda invokes your function synchronously (i.e. the`InvocationType` is `RequestResponse`). To invoke a function asynchronously, set `InvocationType` to `Event`. Lambda passes the `ClientContext` object to your function for synchronous invocations only.
 *
 * For synchronous invocations, the maximum payload size is 6 MB. For asynchronous invocations, the maximum payload size is 1 MB.
 *
 * For synchronous invocation, details about the function response, including errors, are included in the response body and headers. For either invocation type, you can find more information in the execution log and trace.
 *
 * When an error occurs, your function may be invoked multiple times. Retry behavior varies by error type, client, event source, and invocation type. For example, if you invoke a function asynchronously and it returns an error, Lambda executes the function up to two more times. For more information, see Error handling and automatic retries in Lambda.
 *
 * For asynchronous invocation, Lambda adds events to a queue before sending them to your function. If your function does not have enough capacity to keep up with the queue, events may be lost. Occasionally, your function may receive the same event multiple times, even if no error occurs. To retain events that were not processed, configure your function with a dead-letter queue.
 *
 * The status code in the API response doesn't reflect function errors. Error codes are reserved for errors that prevent your function from executing, such as permissions errors, quota errors, or issues with your function's code and configuration. For example, Lambda returns `TooManyRequestsException` if running the function would cause you to exceed a concurrency limit at either the account level (`ConcurrentInvocationLimitExceeded`) or function level (`ReservedFunctionConcurrentInvocationLimitExceeded`).
 *
 * For functions with a long timeout, your client might disconnect during synchronous invocation while it waits for a response. Configure your HTTP client, SDK, firewall, proxy, or operating system to allow for long connections with timeout or keep-alive settings.
 *
 * This operation requires permission for the lambda:InvokeFunction action. For details on how to set up permissions for cross-account invocations, see Granting function access to other accounts.
 */
export const invoke: API.OperationMethod<
  InvocationRequest,
  InvocationResponse,
  InvokeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-03-31/functions/{FunctionName}/invocations",
    input: {
      FunctionName: 0,
      InvocationType: D.m({ header: "X-Amz-Invocation-Type" }),
      LogType: D.m({ header: "X-Amz-Log-Type" }),
      ClientContext: D.m({ header: "X-Amz-Client-Context" }),
      DurableExecutionName: D.m({ header: "X-Amz-Durable-Execution-Name" }),
      Payload: D.m({ payload: true, shape: D.stream }),
      Qualifier: D.m({ query: "Qualifier" }),
      TenantId: D.m({ header: "X-Amz-Tenant-Id" }),
    },
    output: {
      StatusCode: D.m({ status: true }),
      FunctionError: D.m({ header: "X-Amz-Function-Error" }),
      LogResult: D.m({ header: "X-Amz-Log-Result" }),
      Payload: D.m({ payload: true, shape: D.stream }),
      ExecutedVersion: D.m({ header: "X-Amz-Executed-Version" }),
      DurableExecutionArn: D.m({ header: "X-Amz-Durable-Execution-Arn" }),
    },
  },
  errors: [
    CodeArtifactUserDeletedException,
    CodeArtifactUserFailedException,
    CodeArtifactUserPendingException,
    DurableExecutionAlreadyStartedException,
    EC2AccessDeniedException,
    EC2ThrottledException,
    EC2UnexpectedException,
    EFSIOException,
    EFSMountConnectivityException,
    EFSMountFailureException,
    EFSMountTimeoutException,
    ENILimitReachedException,
    ENINotReadyException,
    InvalidParameterValueException,
    InvalidRequestContentException,
    InvalidRuntimeException,
    InvalidSecurityGroupIDException,
    InvalidSubnetIDException,
    InvalidZipFileException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ModeNotSupportedException,
    NoPublishedVersionException,
    RecursiveInvocationException,
    RequestTooLargeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    S3FilesMountConnectivityException,
    S3FilesMountFailureException,
    S3FilesMountTimeoutException,
    SerializedRequestEntityTooLargeException,
    ServiceException,
    ServiceQuotaExceededException,
    SnapStartException,
    SnapStartNotReadyException,
    SnapStartRegenerationFailureException,
    SnapStartTimeoutException,
    SubnetIPAddressLimitReachedException,
    TooManyRequestsException,
    UnsupportedMediaTypeException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Invoke",
})) as any;

export type InvokeAsyncError =
  | EC2AccessDeniedException
  | EC2ThrottledException
  | EC2UnexpectedException
  | EFSIOException
  | EFSMountConnectivityException
  | EFSMountFailureException
  | EFSMountTimeoutException
  | ENILimitReachedException
  | InvalidRequestContentException
  | InvalidRuntimeException
  | InvalidSecurityGroupIDException
  | InvalidSubnetIDException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ModeNotSupportedException
  | ResourceConflictException
  | ResourceNotFoundException
  | S3FilesMountConnectivityException
  | S3FilesMountFailureException
  | S3FilesMountTimeoutException
  | ServiceException
  | ServiceQuotaExceededException
  | SnapStartException
  | SnapStartNotReadyException
  | SnapStartRegenerationFailureException
  | SnapStartTimeoutException
  | SubnetIPAddressLimitReachedException
  | CommonErrors;
/**
 * For asynchronous function invocation, use Invoke.
 *
 * Invokes a function asynchronously.
 *
 * The payload limit is 256KB. For larger payloads, for up to 1MB, use Invoke.
 *
 * If you do use the InvokeAsync action, note that it doesn't support the use of X-Ray active tracing. Trace ID is not propagated to the function, even if X-Ray active tracing is turned on.
 */
export const invokeAsync: API.OperationMethod<
  InvokeAsyncRequest,
  InvokeAsyncResponse,
  InvokeAsyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2014-11-13/functions/{FunctionName}/invoke-async",
    input: {
      FunctionName: 0,
      InvokeArgs: D.m({ payload: true, shape: D.stream }),
    },
    output: { Status: D.m({ status: true }) },
  },
  errors: [
    EC2AccessDeniedException,
    EC2ThrottledException,
    EC2UnexpectedException,
    EFSIOException,
    EFSMountConnectivityException,
    EFSMountFailureException,
    EFSMountTimeoutException,
    ENILimitReachedException,
    InvalidRequestContentException,
    InvalidRuntimeException,
    InvalidSecurityGroupIDException,
    InvalidSubnetIDException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ModeNotSupportedException,
    ResourceConflictException,
    ResourceNotFoundException,
    S3FilesMountConnectivityException,
    S3FilesMountFailureException,
    S3FilesMountTimeoutException,
    ServiceException,
    ServiceQuotaExceededException,
    SnapStartException,
    SnapStartNotReadyException,
    SnapStartRegenerationFailureException,
    SnapStartTimeoutException,
    SubnetIPAddressLimitReachedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeAsync",
})) as any;

export type InvokeWithResponseStreamError =
  | EC2AccessDeniedException
  | EC2ThrottledException
  | EC2UnexpectedException
  | EFSIOException
  | EFSMountConnectivityException
  | EFSMountFailureException
  | EFSMountTimeoutException
  | ENILimitReachedException
  | InvalidParameterValueException
  | InvalidRequestContentException
  | InvalidRuntimeException
  | InvalidSecurityGroupIDException
  | InvalidSubnetIDException
  | InvalidZipFileException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | NoPublishedVersionException
  | RecursiveInvocationException
  | RequestTooLargeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | S3FilesMountConnectivityException
  | S3FilesMountFailureException
  | S3FilesMountTimeoutException
  | SerializedRequestEntityTooLargeException
  | ServiceException
  | ServiceQuotaExceededException
  | SnapStartException
  | SnapStartNotReadyException
  | SnapStartRegenerationFailureException
  | SnapStartTimeoutException
  | SubnetIPAddressLimitReachedException
  | TooManyRequestsException
  | UnsupportedMediaTypeException
  | CommonErrors;
/**
 * Configure your Lambda functions to stream response payloads back to clients. For more information, see Configuring a Lambda function to stream responses.
 *
 * This operation requires permission for the lambda:InvokeFunction action. For details on how to set up permissions for cross-account invocations, see Granting function access to other accounts.
 */
export const invokeWithResponseStream: API.OperationMethod<
  InvokeWithResponseStreamRequest,
  InvokeWithResponseStreamResponse,
  InvokeWithResponseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-11-15/functions/{FunctionName}/response-streaming-invocations",
    input: {
      FunctionName: 0,
      LogType: D.m({ header: "X-Amz-Log-Type" }),
      ClientContext: D.m({ header: "X-Amz-Client-Context" }),
      Qualifier: D.m({ query: "Qualifier" }),
      Payload: D.m({ payload: true, shape: D.stream }),
      TenantId: D.m({ header: "X-Amz-Tenant-Id" }),
      InvocationType: D.m({ header: "X-Amz-Invocation-Type" }),
    },
    output: {
      StatusCode: D.m({ status: true }),
      ExecutedVersion: D.m({ header: "X-Amz-Executed-Version" }),
      EventStream: D.m({
        payload: true,
        shape: D.events(
          { PayloadChunk: { Payload: D.secretBlob }, InvokeComplete: 0 },
          { PayloadChunk: "Payload" },
        ),
      }),
      ResponseStreamContentType: D.m({ header: "Content-Type" }),
    },
  },
  errors: [
    EC2AccessDeniedException,
    EC2ThrottledException,
    EC2UnexpectedException,
    EFSIOException,
    EFSMountConnectivityException,
    EFSMountFailureException,
    EFSMountTimeoutException,
    ENILimitReachedException,
    InvalidParameterValueException,
    InvalidRequestContentException,
    InvalidRuntimeException,
    InvalidSecurityGroupIDException,
    InvalidSubnetIDException,
    InvalidZipFileException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    NoPublishedVersionException,
    RecursiveInvocationException,
    RequestTooLargeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    S3FilesMountConnectivityException,
    S3FilesMountFailureException,
    S3FilesMountTimeoutException,
    SerializedRequestEntityTooLargeException,
    ServiceException,
    ServiceQuotaExceededException,
    SnapStartException,
    SnapStartNotReadyException,
    SnapStartRegenerationFailureException,
    SnapStartTimeoutException,
    SubnetIPAddressLimitReachedException,
    TooManyRequestsException,
    UnsupportedMediaTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeWithResponseStream",
})) as any;

export type ListAliasesError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of aliases for a Lambda function.
 */
export const listAliases: API.PaginatedOperationMethod<
  ListAliasesRequest,
  ListAliasesResponse,
  ListAliasesError,
  Credentials | HttpClient.HttpClient,
  AliasConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-03-31/functions/{FunctionName}/aliases",
    input: {
      FunctionName: 0,
      FunctionVersion: D.m({ query: "FunctionVersion" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAliases",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Aliases",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListCapacityProvidersError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of capacity providers in your account.
 */
export const listCapacityProviders: API.PaginatedOperationMethod<
  ListCapacityProvidersRequest,
  ListCapacityProvidersResponse,
  ListCapacityProvidersError,
  Credentials | HttpClient.HttpClient,
  CapacityProvider
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2025-11-30/capacity-providers",
    input: {
      State: D.m({ query: "State" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapacityProviders",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "CapacityProviders",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListCodeSigningConfigsError =
  | InvalidParameterValueException
  | ServiceException
  | CommonErrors;
/**
 * Returns a list of code signing configurations. A request returns up to 10,000 configurations per call. You can use the `MaxItems` parameter to return fewer configurations per call.
 */
export const listCodeSigningConfigs: API.PaginatedOperationMethod<
  ListCodeSigningConfigsRequest,
  ListCodeSigningConfigsResponse,
  ListCodeSigningConfigsError,
  Credentials | HttpClient.HttpClient,
  CodeSigningConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-04-22/code-signing-configs",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
  },
  errors: [InvalidParameterValueException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeSigningConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "CodeSigningConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListDurableExecutionsByFunctionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of durable executions for a specified Lambda function. You can filter the results by execution name, status, and start time range. This API supports pagination for large result sets.
 */
export const listDurableExecutionsByFunction: API.PaginatedOperationMethod<
  ListDurableExecutionsByFunctionRequest,
  ListDurableExecutionsByFunctionResponse,
  ListDurableExecutionsByFunctionError,
  Credentials | HttpClient.HttpClient,
  Execution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2025-12-01/functions/{FunctionName}/durable-executions",
    input: {
      FunctionName: 0,
      Qualifier: D.m({ query: "Qualifier" }),
      DurableExecutionName: D.m({ query: "DurableExecutionName" }),
      Statuses: D.m({ query: "Statuses" }),
      StartedAfter: D.m({
        query: "StartedAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      StartedBefore: D.m({
        query: "StartedBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      ReverseOrder: D.m({ query: "ReverseOrder" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      DurableExecutions: D.list({ StartTimestamp: D.ts, EndTimestamp: D.ts }),
    },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDurableExecutionsByFunction",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "DurableExecutions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListEventSourceMappingsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists event source mappings. Specify an `EventSourceArn` to show only event source mappings for a single event source.
 */
export const listEventSourceMappings: API.PaginatedOperationMethod<
  ListEventSourceMappingsRequest,
  ListEventSourceMappingsResponse,
  ListEventSourceMappingsError,
  Credentials | HttpClient.HttpClient,
  EventSourceMappingConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-03-31/event-source-mappings",
    input: {
      EventSourceArn: D.m({ query: "EventSourceArn" }),
      FunctionName: D.m({ query: "FunctionName" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      EventSourceMappings: D.list({
        StartingPositionTimestamp: D.ts,
        LastModified: D.ts,
      }),
    },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventSourceMappings",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "EventSourceMappings",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionEventInvokeConfigsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves a list of configurations for asynchronous invocation for a function.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const listFunctionEventInvokeConfigs: API.PaginatedOperationMethod<
  ListFunctionEventInvokeConfigsRequest,
  ListFunctionEventInvokeConfigsResponse,
  ListFunctionEventInvokeConfigsError,
  Credentials | HttpClient.HttpClient,
  FunctionEventInvokeConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2019-09-25/functions/{FunctionName}/event-invoke-config/list",
    input: {
      FunctionName: 0,
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: { FunctionEventInvokeConfigs: D.list({ LastModified: D.ts }) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionEventInvokeConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionEventInvokeConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionsError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of Lambda functions, with the version-specific configuration of each. Lambda returns up to 50 functions per call.
 *
 * Set `FunctionVersion` to `ALL` to include all published versions of each function in addition to the unpublished version.
 *
 * The `ListFunctions` operation returns a subset of the FunctionConfiguration fields. To get the additional fields (State, StateReasonCode, StateReason, LastUpdateStatus, LastUpdateStatusReason, LastUpdateStatusReasonCode, RuntimeVersionConfig) for a function or version, use GetFunction.
 */
export const listFunctions: API.PaginatedOperationMethod<
  ListFunctionsRequest,
  ListFunctionsResponse,
  ListFunctionsError,
  Credentials | HttpClient.HttpClient,
  FunctionConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-03-31/functions",
    input: {
      MasterRegion: D.m({ query: "MasterRegion" }),
      FunctionVersion: D.m({ query: "FunctionVersion" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: { Functions: D.list(o_FunctionConfiguration) },
  },
  errors: [
    InvalidParameterValueException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctions",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Functions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionsByCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | CommonErrors;
/**
 * List the functions that use the specified code signing configuration. You can use this method prior to deleting a code signing configuration, to verify that no functions are using it.
 */
export const listFunctionsByCodeSigningConfig: API.PaginatedOperationMethod<
  ListFunctionsByCodeSigningConfigRequest,
  ListFunctionsByCodeSigningConfigResponse,
  ListFunctionsByCodeSigningConfigError,
  Credentials | HttpClient.HttpClient,
  FunctionArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-04-22/code-signing-configs/{CodeSigningConfigArn}/functions",
    input: {
      CodeSigningConfigArn: 0,
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionsByCodeSigningConfig",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionArns",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionUrlConfigsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of Lambda function URLs for the specified function.
 */
export const listFunctionUrlConfigs: API.PaginatedOperationMethod<
  ListFunctionUrlConfigsRequest,
  ListFunctionUrlConfigsResponse,
  ListFunctionUrlConfigsError,
  Credentials | HttpClient.HttpClient,
  FunctionUrlConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-10-31/functions/{FunctionName}/urls",
    input: {
      FunctionName: 0,
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionUrlConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionUrlConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionVersionsByCapacityProviderError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of function versions that are configured to use a specific capacity provider.
 */
export const listFunctionVersionsByCapacityProvider: API.PaginatedOperationMethod<
  ListFunctionVersionsByCapacityProviderRequest,
  ListFunctionVersionsByCapacityProviderResponse,
  ListFunctionVersionsByCapacityProviderError,
  Credentials | HttpClient.HttpClient,
  FunctionVersionsByCapacityProviderListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2025-11-30/capacity-providers/{CapacityProviderName}/function-versions",
    input: {
      CapacityProviderName: 0,
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionVersionsByCapacityProvider",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionVersions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListLayersError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists Lambda layers and shows information about the latest version of each. Specify a runtime identifier to list only layers that indicate that they're compatible with that runtime. Specify a compatible architecture to include only layers that are compatible with that instruction set architecture.
 */
export const listLayers: API.PaginatedOperationMethod<
  ListLayersRequest,
  ListLayersResponse,
  ListLayersError,
  Credentials | HttpClient.HttpClient,
  LayersListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2018-10-31/layers",
    input: {
      CompatibleArchitecture: D.m({ query: "CompatibleArchitecture" }),
      CompatibleRuntime: D.m({ query: "CompatibleRuntime" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLayers",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Layers",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListLayerVersionsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Lists the versions of an Lambda layer. Versions that have been deleted aren't listed. Specify a runtime identifier to list only versions that indicate that they're compatible with that runtime. Specify a compatible architecture to include only layer versions that are compatible with that architecture.
 */
export const listLayerVersions: API.PaginatedOperationMethod<
  ListLayerVersionsRequest,
  ListLayerVersionsResponse,
  ListLayerVersionsError,
  Credentials | HttpClient.HttpClient,
  LayerVersionsListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2018-10-31/layers/{LayerName}/versions",
    input: {
      CompatibleArchitecture: D.m({ query: "CompatibleArchitecture" }),
      CompatibleRuntime: D.m({ query: "CompatibleRuntime" }),
      LayerName: 0,
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLayerVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "LayerVersions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListProvisionedConcurrencyConfigsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves a list of provisioned concurrency configurations for a function.
 */
export const listProvisionedConcurrencyConfigs: API.PaginatedOperationMethod<
  ListProvisionedConcurrencyConfigsRequest,
  ListProvisionedConcurrencyConfigsResponse,
  ListProvisionedConcurrencyConfigsError,
  Credentials | HttpClient.HttpClient,
  ProvisionedConcurrencyConfigListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2019-09-30/functions/{FunctionName}/provisioned-concurrency?List=ALL",
    input: {
      FunctionName: 0,
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisionedConcurrencyConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "ProvisionedConcurrencyConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListTagsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns a function, event source mapping, or code signing configuration's tags. You can also view function tags with GetFunction.
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
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
})) as any;

export type ListVersionsByFunctionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of versions, with the version-specific configuration of each. Lambda returns up to 50 versions per call.
 */
export const listVersionsByFunction: API.PaginatedOperationMethod<
  ListVersionsByFunctionRequest,
  ListVersionsByFunctionResponse,
  ListVersionsByFunctionError,
  Credentials | HttpClient.HttpClient,
  FunctionConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-03-31/functions/{FunctionName}/versions",
    input: {
      FunctionName: 0,
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: { Versions: D.list(o_FunctionConfiguration) },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVersionsByFunction",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Versions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type PublishLayerVersionError =
  | CodeStorageExceededException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates an Lambda layer from a ZIP archive. Each time you call `PublishLayerVersion` with the same layer name, a new version is created.
 *
 * Add layers to your function with CreateFunction or UpdateFunctionConfiguration.
 */
export const publishLayerVersion: API.OperationMethod<
  PublishLayerVersionRequest,
  PublishLayerVersionResponse,
  PublishLayerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2018-10-31/layers/{LayerName}/versions",
    input: {
      LayerName: 0,
      Description: 0,
      Content: {
        S3Bucket: 0,
        S3Key: 0,
        S3ObjectVersion: 0,
        S3ObjectStorageMode: 0,
        ZipFile: 0,
      },
      CompatibleArchitectures: 0,
      CompatibleRuntimes: 0,
      LicenseInfo: 0,
    },
    body: true,
  },
  errors: [
    CodeStorageExceededException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishLayerVersion",
})) as any;

export type PublishVersionError =
  | CodeStorageExceededException
  | FunctionVersionsPerCapacityProviderLimitExceededException
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates a version from the current code and configuration of a function. Use versions to create a snapshot of your function code and configuration that doesn't change.
 *
 * Lambda doesn't publish a version if the function's configuration and code haven't changed since the last version. Use UpdateFunctionCode or UpdateFunctionConfiguration to update the function before publishing a version.
 *
 * Clients can invoke versions directly or with an alias. To create an alias, use CreateAlias.
 */
export const publishVersion: API.OperationMethod<
  PublishVersionRequest,
  FunctionConfiguration,
  PublishVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-03-31/functions/{FunctionName}/versions",
    input: {
      FunctionName: 0,
      CodeSha256: 0,
      Description: 0,
      RevisionId: 0,
      PublishTo: 0,
    },
    output: {
      Environment: o_EnvironmentResponse,
      ImageConfigResponse: o_ImageConfigResponse,
      RuntimeVersionConfig: o_RuntimeVersionConfig,
    },
    body: true,
  },
  errors: [
    CodeStorageExceededException,
    FunctionVersionsPerCapacityProviderLimitExceededException,
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishVersion",
})) as any;

export type PutFunctionCodeSigningConfigError =
  | CodeSigningConfigNotFoundException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Update the code signing configuration for the function. Changes to the code signing configuration take effect the next time a user tries to deploy a code package to the function.
 */
export const putFunctionCodeSigningConfig: API.OperationMethod<
  PutFunctionCodeSigningConfigRequest,
  PutFunctionCodeSigningConfigResponse,
  PutFunctionCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-06-30/functions/{FunctionName}/code-signing-config",
    input: { CodeSigningConfigArn: 0, FunctionName: 0 },
    body: true,
  },
  errors: [
    CodeSigningConfigNotFoundException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionCodeSigningConfig",
})) as any;

export type PutFunctionConcurrencyError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Sets the maximum number of simultaneous executions for a function, and reserves capacity for that concurrency level.
 *
 * Concurrency settings apply to the function as a whole, including all published versions and the unpublished version. Reserving concurrency both ensures that your function has capacity to process the specified number of events simultaneously, and prevents it from scaling beyond that level. Use GetFunction to see the current setting for a function.
 *
 * Use GetAccountSettings to see your Regional concurrency limit. You can reserve concurrency for as many functions as you like, as long as you leave at least 100 simultaneous executions unreserved for functions that aren't configured with a per-function limit. For more information, see Lambda function scaling.
 */
export const putFunctionConcurrency: API.OperationMethod<
  PutFunctionConcurrencyRequest,
  Concurrency,
  PutFunctionConcurrencyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2017-10-31/functions/{FunctionName}/concurrency",
    input: { FunctionName: 0, ReservedConcurrentExecutions: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionConcurrency",
})) as any;

export type PutFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Configures options for asynchronous invocation on a function, version, or alias. If a configuration already exists for a function, version, or alias, this operation overwrites it. If you exclude any settings, they are removed. To set one option without affecting existing settings for other options, use UpdateFunctionEventInvokeConfig.
 *
 * By default, Lambda retries an asynchronous invocation twice if the function returns an error. It retains events in a queue for up to six hours. When an event fails all processing attempts or stays in the asynchronous invocation queue for too long, Lambda discards it. To retain discarded events, configure a dead-letter queue with UpdateFunctionConfiguration.
 *
 * To send an invocation record to a queue, topic, S3 bucket, function, or event bus, specify a destination. You can configure separate destinations for successful invocations (on-success) and events that fail all processing attempts (on-failure). You can configure destinations in addition to or instead of a dead-letter queue.
 *
 * S3 buckets are supported only for on-failure destinations. To retain records of successful invocations, use another destination type.
 */
export const putFunctionEventInvokeConfig: API.OperationMethod<
  PutFunctionEventInvokeConfigRequest,
  FunctionEventInvokeConfig,
  PutFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2019-09-25/functions/{FunctionName}/event-invoke-config",
    input: {
      FunctionName: 0,
      Qualifier: D.m({ query: "Qualifier" }),
      MaximumRetryAttempts: 0,
      MaximumEventAgeInSeconds: 0,
      DestinationConfig: i_DestinationConfig,
    },
    output: { LastModified: D.ts },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionEventInvokeConfig",
})) as any;

export type PutFunctionRecursionConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Sets your function's recursive loop detection configuration.
 *
 * When you configure a Lambda function to output to the same service or resource that invokes the function, it's possible to create an infinite recursive loop. For example, a Lambda function might write a message to an Amazon Simple Queue Service (Amazon SQS) queue, which then invokes the same function. This invocation causes the function to write another message to the queue, which in turn invokes the function again.
 *
 * Lambda can detect certain types of recursive loops shortly after they occur. When Lambda detects a recursive loop and your function's recursive loop detection configuration is set to `Terminate`, it stops your function being invoked and notifies you.
 */
export const putFunctionRecursionConfig: API.OperationMethod<
  PutFunctionRecursionConfigRequest,
  PutFunctionRecursionConfigResponse,
  PutFunctionRecursionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2024-08-31/functions/{FunctionName}/recursion-config",
    input: { FunctionName: 0, RecursiveLoop: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionRecursionConfig",
})) as any;

export type PutFunctionScalingConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the scaling configuration for a Lambda Managed Instances function. The scaling configuration defines the minimum and maximum number of execution environments that can be provisioned for the function, allowing you to control scaling behavior and resource allocation.
 */
export const putFunctionScalingConfig: API.OperationMethod<
  PutFunctionScalingConfigRequest,
  PutFunctionScalingConfigResponse,
  PutFunctionScalingConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2025-11-30/functions/{FunctionName}/function-scaling-config",
    input: {
      FunctionName: 0,
      Qualifier: D.m({ query: "Qualifier" }),
      FunctionScalingConfig: {
        MinExecutionEnvironments: 0,
        MaxExecutionEnvironments: 0,
      },
    },
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
  operationName: "PutFunctionScalingConfig",
})) as any;

export type PutProvisionedConcurrencyConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Adds a provisioned concurrency configuration to a function's alias or version.
 */
export const putProvisionedConcurrencyConfig: API.OperationMethod<
  PutProvisionedConcurrencyConfigRequest,
  PutProvisionedConcurrencyConfigResponse,
  PutProvisionedConcurrencyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2019-09-30/functions/{FunctionName}/provisioned-concurrency",
    input: {
      FunctionName: 0,
      Qualifier: D.m({ query: "Qualifier" }),
      ProvisionedConcurrentExecutions: 0,
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProvisionedConcurrencyConfig",
})) as any;

export type PutResourcePolicyError =
  | InvalidParameterValueException
  | PolicyLengthExceededException
  | PreconditionFailedException
  | PublicPolicyException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds a resource-based policy to a Lambda resource. Resource-based policies grant access to other Amazon Web Services accounts, organizations, or services. Resource-based policies apply to a single Lambda resource (for example, a function, function version, or function alias).
 *
 * This operation replaces any existing policy on the Lambda resource. If you previously added permissions using the AddPermission operation, the new policy overwrites those permissions.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2026-07-09/resource-policy/{ResourceArn}",
    input: { ResourceArn: 0, Policy: 0, RevisionId: 0 },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    PolicyLengthExceededException,
    PreconditionFailedException,
    PublicPolicyException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type PutRuntimeManagementConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the runtime management configuration for a function's version. For more information, see Runtime updates.
 */
export const putRuntimeManagementConfig: API.OperationMethod<
  PutRuntimeManagementConfigRequest,
  PutRuntimeManagementConfigResponse,
  PutRuntimeManagementConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2021-07-20/functions/{FunctionName}/runtime-management-config",
    input: {
      FunctionName: 0,
      Qualifier: D.m({ query: "Qualifier" }),
      UpdateRuntimeOn: 0,
      RuntimeVersionArn: 0,
    },
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
  operationName: "PutRuntimeManagementConfig",
})) as any;

export type RemoveLayerVersionPermissionError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Removes a statement from the permissions policy for a version of an Lambda layer. For more information, see AddLayerVersionPermission.
 */
export const removeLayerVersionPermission: API.OperationMethod<
  RemoveLayerVersionPermissionRequest,
  RemoveLayerVersionPermissionResponse,
  RemoveLayerVersionPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2018-10-31/layers/{LayerName}/versions/{VersionNumber}/policy/{StatementId}",
    input: {
      LayerName: 0,
      VersionNumber: 0,
      StatementId: 0,
      RevisionId: D.m({ query: "RevisionId" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveLayerVersionPermission",
})) as any;

export type RemovePermissionError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | PublicPolicyException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Revokes function-use permission from an Amazon Web Services service or another Amazon Web Services account. You can get the ID of the statement from the output of GetPolicy.
 */
export const removePermission: API.OperationMethod<
  RemovePermissionRequest,
  RemovePermissionResponse,
  RemovePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-03-31/functions/{FunctionName}/policy/{StatementId}",
    input: {
      FunctionName: 0,
      StatementId: 0,
      Qualifier: D.m({ query: "Qualifier" }),
      RevisionId: D.m({ query: "RevisionId" }),
    },
  },
  errors: [
    InvalidParameterValueException,
    PreconditionFailedException,
    PublicPolicyException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemovePermission",
})) as any;

export type SendDurableExecutionCallbackFailureError =
  | CallbackTimeoutException
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends a failure response for a callback operation in a durable execution. Use this API when an external system cannot complete a callback operation successfully.
 */
export const sendDurableExecutionCallbackFailure: API.OperationMethod<
  SendDurableExecutionCallbackFailureRequest,
  SendDurableExecutionCallbackFailureResponse,
  SendDurableExecutionCallbackFailureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2025-12-01/durable-execution-callbacks/{CallbackId}/fail",
    input: {
      CallbackId: 0,
      Error: D.m({ payload: true, shape: i_ErrorObject }),
    },
  },
  errors: [
    CallbackTimeoutException,
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDurableExecutionCallbackFailure",
})) as any;

export type SendDurableExecutionCallbackHeartbeatError =
  | CallbackTimeoutException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends a heartbeat signal for a long-running callback operation to prevent timeout. Use this API to extend the callback timeout period while the external operation is still in progress.
 */
export const sendDurableExecutionCallbackHeartbeat: API.OperationMethod<
  SendDurableExecutionCallbackHeartbeatRequest,
  SendDurableExecutionCallbackHeartbeatResponse,
  SendDurableExecutionCallbackHeartbeatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2025-12-01/durable-execution-callbacks/{CallbackId}/heartbeat",
    input: { CallbackId: 0 },
  },
  errors: [
    CallbackTimeoutException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDurableExecutionCallbackHeartbeat",
})) as any;

export type SendDurableExecutionCallbackSuccessError =
  | CallbackTimeoutException
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends a successful completion response for a callback operation in a durable execution. Use this API when an external system has successfully completed a callback operation.
 */
export const sendDurableExecutionCallbackSuccess: API.OperationMethod<
  SendDurableExecutionCallbackSuccessRequest,
  SendDurableExecutionCallbackSuccessResponse,
  SendDurableExecutionCallbackSuccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2025-12-01/durable-execution-callbacks/{CallbackId}/succeed",
    input: { CallbackId: 0, Result: D.m({ payload: true, shape: D.stream }) },
  },
  errors: [
    CallbackTimeoutException,
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDurableExecutionCallbackSuccess",
})) as any;

export type StopDurableExecutionError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a running durable execution. The execution transitions to STOPPED status and cannot be resumed. Any in-progress operations are terminated.
 */
export const stopDurableExecution: API.OperationMethod<
  StopDurableExecutionRequest,
  StopDurableExecutionResponse,
  StopDurableExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2025-12-01/durable-executions/{DurableExecutionArn}/stop",
    input: {
      DurableExecutionArn: 0,
      Error: D.m({ payload: true, shape: i_ErrorObject }),
    },
    output: { StopTimestamp: D.ts },
  },
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDurableExecution",
})) as any;

export type TagResourceError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Adds tags to a function, event source mapping, or code signing configuration.
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
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Removes tags from a function, event source mapping, or code signing configuration.
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
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAliasError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Updates the configuration of a Lambda function alias.
 */
export const updateAlias: API.OperationMethod<
  UpdateAliasRequest,
  AliasConfiguration,
  UpdateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-03-31/functions/{FunctionName}/aliases/{Name}",
    input: {
      FunctionName: 0,
      Name: 0,
      FunctionVersion: 0,
      Description: 0,
      RoutingConfig: i_AliasRoutingConfiguration,
      RevisionId: 0,
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAlias",
})) as any;

export type UpdateCapacityProviderError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of an existing capacity provider.
 */
export const updateCapacityProvider: API.OperationMethod<
  UpdateCapacityProviderRequest,
  UpdateCapacityProviderResponse,
  UpdateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2025-11-30/capacity-providers/{CapacityProviderName}",
    input: {
      CapacityProviderName: 0,
      CapacityProviderScalingConfig: i_CapacityProviderScalingConfig,
      PropagateTags: i_PropagateTags,
      TelemetryConfig: i_CapacityProviderTelemetryConfig,
    },
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
  operationName: "UpdateCapacityProvider",
})) as any;

export type UpdateCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | CommonErrors;
/**
 * Update the code signing configuration. Changes to the code signing configuration take effect the next time a user tries to deploy a code package to the function.
 */
export const updateCodeSigningConfig: API.OperationMethod<
  UpdateCodeSigningConfigRequest,
  UpdateCodeSigningConfigResponse,
  UpdateCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-04-22/code-signing-configs/{CodeSigningConfigArn}",
    input: {
      CodeSigningConfigArn: 0,
      Description: 0,
      AllowedPublishers: i_AllowedPublishers,
      CodeSigningPolicies: i_CodeSigningPolicies,
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCodeSigningConfig",
})) as any;

export type UpdateEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Updates an event source mapping. You can change the function that Lambda invokes, or pause invocation and resume later from the same location.
 *
 * For details about how to configure different event sources, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 *
 * The following error handling options are available for stream sources (DynamoDB, Kinesis, Amazon MSK, and self-managed Apache Kafka):
 *
 * - `BisectBatchOnFunctionError` – If the function returns an error, split the batch in two and retry.
 *
 * - `MaximumRecordAgeInSeconds` – Discard records older than the specified age. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires
 *
 * - `MaximumRetryAttempts` – Discard records after the specified number of retries. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires.
 *
 * - `OnFailure` – Send discarded records to an Amazon SQS queue, Amazon SNS topic, Kafka topic, or Amazon S3 bucket. For more information, see Adding a destination.
 *
 * The following option is available only for DynamoDB and Kinesis event sources:
 *
 * - `ParallelizationFactor` – Process multiple batches from each shard concurrently.
 *
 * For information about which configuration parameters apply to each event source, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 */
export const updateEventSourceMapping: API.OperationMethod<
  UpdateEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  UpdateEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-03-31/event-source-mappings/{UUID}",
    input: {
      UUID: 0,
      FunctionName: 0,
      Enabled: 0,
      BatchSize: 0,
      FilterCriteria: i_FilterCriteria,
      KMSKeyArn: 0,
      MetricsConfig: i_EventSourceMappingMetricsConfig,
      LoggingConfig: i_EventSourceMappingLoggingConfig,
      ScalingConfig: i_ScalingConfig,
      MaximumBatchingWindowInSeconds: 0,
      ParallelizationFactor: 0,
      DestinationConfig: i_DestinationConfig,
      MaximumRecordAgeInSeconds: 0,
      BisectBatchOnFunctionError: 0,
      MaximumRetryAttempts: 0,
      TumblingWindowInSeconds: 0,
      SourceAccessConfigurations: D.list(i_SourceAccessConfiguration),
      FunctionResponseTypes: 0,
      AmazonManagedKafkaEventSourceConfig:
        i_AmazonManagedKafkaEventSourceConfig,
      SelfManagedKafkaEventSourceConfig: i_SelfManagedKafkaEventSourceConfig,
      DocumentDBEventSourceConfig: i_DocumentDBEventSourceConfig,
      ProvisionedPollerConfig: i_ProvisionedPollerConfig,
    },
    output: { StartingPositionTimestamp: D.ts, LastModified: D.ts },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventSourceMapping",
})) as any;

export type UpdateFunctionCodeError =
  | CodeSigningConfigNotFoundException
  | CodeStorageExceededException
  | CodeVerificationFailedException
  | InvalidCodeSignatureException
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Updates a Lambda function's code. If code signing is enabled for the function, the code package must be signed by a trusted publisher. For more information, see Configuring code signing for Lambda.
 *
 * If the function's package type is `Image`, then you must specify the code package in `ImageUri` as the URI of a container image in the Amazon ECR registry.
 *
 * If the function's package type is `Zip`, then you must specify the deployment package as a .zip file archive. Enter the Amazon S3 bucket and key of the code .zip file location. You can also provide the function code inline using the `ZipFile` field.
 *
 * The code in the deployment package must be compatible with the target instruction set architecture of the function (`x86-64` or `arm64`).
 *
 * The function's code is locked when you publish a version. You can't modify the code of a published version, only the unpublished version.
 *
 * For a function defined as a container image, Lambda resolves the image tag to an image digest. In Amazon ECR, if you update the image tag to a new image, Lambda does not automatically update the function.
 */
export const updateFunctionCode: API.OperationMethod<
  UpdateFunctionCodeRequest,
  FunctionConfiguration,
  UpdateFunctionCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-03-31/functions/{FunctionName}/code",
    input: {
      FunctionName: 0,
      ZipFile: 0,
      S3Bucket: 0,
      S3Key: 0,
      S3ObjectVersion: 0,
      S3ObjectStorageMode: 0,
      ImageUri: 0,
      Architectures: 0,
      Publish: 0,
      PublishTo: 0,
      DryRun: 0,
      RevisionId: 0,
      SourceKMSKeyArn: 0,
    },
    output: {
      Environment: o_EnvironmentResponse,
      ImageConfigResponse: o_ImageConfigResponse,
      RuntimeVersionConfig: o_RuntimeVersionConfig,
    },
    body: true,
  },
  errors: [
    CodeSigningConfigNotFoundException,
    CodeStorageExceededException,
    CodeVerificationFailedException,
    InvalidCodeSignatureException,
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionCode",
})) as any;

export type UpdateFunctionConfigurationError =
  | CodeSigningConfigNotFoundException
  | CodeVerificationFailedException
  | InvalidCodeSignatureException
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Modify the version-specific settings of a Lambda function.
 *
 * When you update a function, Lambda provisions an instance of the function and its supporting resources. If your function connects to a VPC, this process can take a minute. During this time, you can't modify the function, but you can still invoke it. The `LastUpdateStatus`, `LastUpdateStatusReason`, and `LastUpdateStatusReasonCode` fields in the response from GetFunctionConfiguration indicate when the update is complete and the function is processing events with the new configuration. For more information, see Lambda function states.
 *
 * These settings can vary between versions of a function and are locked when you publish a version. You can't modify the configuration of a published version, only the unpublished version.
 *
 * To configure function concurrency, use PutFunctionConcurrency. To grant invoke permissions to an Amazon Web Services account or Amazon Web Services service, use AddPermission.
 */
export const updateFunctionConfiguration: API.OperationMethod<
  UpdateFunctionConfigurationRequest,
  FunctionConfiguration,
  UpdateFunctionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-03-31/functions/{FunctionName}/configuration",
    input: {
      FunctionName: 0,
      Role: 0,
      Handler: 0,
      Description: 0,
      Timeout: 0,
      MemorySize: 0,
      VpcConfig: i_VpcConfig,
      Environment: i_Environment,
      Runtime: 0,
      DeadLetterConfig: i_DeadLetterConfig,
      KMSKeyArn: 0,
      TracingConfig: i_TracingConfig,
      RevisionId: 0,
      Layers: 0,
      FileSystemConfigs: D.list(i_FileSystemConfig),
      ImageConfig: i_ImageConfig,
      EphemeralStorage: i_EphemeralStorage,
      SnapStart: i_SnapStart,
      LoggingConfig: i_LoggingConfig,
      CapacityProviderConfig: i_CapacityProviderConfig,
      DurableConfig: i_DurableConfig,
    },
    output: {
      Environment: o_EnvironmentResponse,
      ImageConfigResponse: o_ImageConfigResponse,
      RuntimeVersionConfig: o_RuntimeVersionConfig,
    },
    body: true,
  },
  errors: [
    CodeSigningConfigNotFoundException,
    CodeVerificationFailedException,
    InvalidCodeSignatureException,
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionConfiguration",
})) as any;

export type UpdateFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration for asynchronous invocation for a function, version, or alias.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const updateFunctionEventInvokeConfig: API.OperationMethod<
  UpdateFunctionEventInvokeConfigRequest,
  FunctionEventInvokeConfig,
  UpdateFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2019-09-25/functions/{FunctionName}/event-invoke-config",
    input: {
      FunctionName: 0,
      Qualifier: D.m({ query: "Qualifier" }),
      MaximumRetryAttempts: 0,
      MaximumEventAgeInSeconds: 0,
      DestinationConfig: i_DestinationConfig,
    },
    output: { LastModified: D.ts },
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
  operationName: "UpdateFunctionEventInvokeConfig",
})) as any;

export type UpdateFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Updates the configuration for a Lambda function URL.
 */
export const updateFunctionUrlConfig: API.OperationMethod<
  UpdateFunctionUrlConfigRequest,
  UpdateFunctionUrlConfigResponse,
  UpdateFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2021-10-31/functions/{FunctionName}/url",
    input: {
      FunctionName: 0,
      Qualifier: D.m({ query: "Qualifier" }),
      AuthType: 0,
      Cors: i_Cors,
      InvokeMode: 0,
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionUrlConfig",
})) as any;

const i_AliasRoutingConfiguration: D.LazyStruct = () => ({
  AdditionalVersionWeights: 0,
});
const i_AllowedPublishers: D.LazyStruct = () => ({
  SigningProfileVersionArns: 0,
});
const i_AmazonManagedKafkaEventSourceConfig: D.LazyStruct = () => ({
  ConsumerGroupId: 0,
  SchemaRegistryConfig: i_KafkaSchemaRegistryConfig,
});
const i_CapacityProviderConfig: D.LazyStruct = () => ({
  LambdaManagedInstancesCapacityProviderConfig: {
    CapacityProviderArn: 0,
    PerExecutionEnvironmentMaxConcurrency: 0,
    ExecutionEnvironmentMemoryGiBPerVCpu: 0,
  },
});
const i_CapacityProviderScalingConfig: D.LazyStruct = () => ({
  MaxVCpuCount: 0,
  ScalingMode: 0,
  ScalingPolicies: D.list({ PredefinedMetricType: 0, TargetValue: 0 }),
});
const i_CapacityProviderTelemetryConfig: D.LazyStruct = () => ({
  LoggingConfig: { SystemLogLevel: 0, LogGroup: 0 },
});
const i_CodeSigningPolicies: D.LazyStruct = () => ({
  UntrustedArtifactOnDeployment: 0,
});
const i_Cors: D.LazyStruct = () => ({
  AllowCredentials: 0,
  AllowHeaders: 0,
  AllowMethods: 0,
  AllowOrigins: 0,
  ExposeHeaders: 0,
  MaxAge: 0,
});
const i_DeadLetterConfig: D.LazyStruct = () => ({ TargetArn: 0 });
const i_DestinationConfig: D.LazyStruct = () => ({
  OnSuccess: { Destination: 0 },
  OnFailure: { Destination: 0 },
});
const i_DocumentDBEventSourceConfig: D.LazyStruct = () => ({
  DatabaseName: 0,
  CollectionName: 0,
  FullDocument: 0,
});
const i_DurableConfig: D.LazyStruct = () => ({
  KMSKeyArn: 0,
  RetentionPeriodInDays: 0,
  ExecutionTimeout: 0,
});
const i_Environment: D.LazyStruct = () => ({ Variables: 0 });
const i_EphemeralStorage: D.LazyStruct = () => ({ Size: 0 });
const i_ErrorObject: D.LazyStruct = () => ({
  ErrorMessage: 0,
  ErrorType: 0,
  ErrorData: 0,
  StackTrace: 0,
});
const i_EventSourceMappingLoggingConfig: D.LazyStruct = () => ({
  SystemLogLevel: 0,
});
const i_EventSourceMappingMetricsConfig: D.LazyStruct = () => ({ Metrics: 0 });
const i_FileSystemConfig: D.LazyStruct = () => ({ Arn: 0, LocalMountPath: 0 });
const i_FilterCriteria: D.LazyStruct = () => ({
  Filters: D.list({ Pattern: 0 }),
});
const i_ImageConfig: D.LazyStruct = () => ({
  EntryPoint: 0,
  Command: 0,
  WorkingDirectory: 0,
});
const i_LoggingConfig: D.LazyStruct = () => ({
  LogFormat: 0,
  ApplicationLogLevel: 0,
  SystemLogLevel: 0,
  LogGroup: 0,
});
const i_PropagateTags: D.LazyStruct = () => ({ Mode: 0, ExplicitTags: 0 });
const i_ProvisionedPollerConfig: D.LazyStruct = () => ({
  MinimumPollers: 0,
  MaximumPollers: 0,
  PollerGroupName: 0,
});
const i_ScalingConfig: D.LazyStruct = () => ({ MaximumConcurrency: 0 });
const i_SelfManagedKafkaEventSourceConfig: D.LazyStruct = () => ({
  ConsumerGroupId: 0,
  SchemaRegistryConfig: i_KafkaSchemaRegistryConfig,
});
const i_SnapStart: D.LazyStruct = () => ({ ApplyOn: 0 });
const i_SourceAccessConfiguration: D.LazyStruct = () => ({ Type: 0, URI: 0 });
const i_TracingConfig: D.LazyStruct = () => ({ Mode: 0 });
const i_VpcConfig: D.LazyStruct = () => ({
  SubnetIds: 0,
  SecurityGroupIds: 0,
  Ipv6AllowedForDualStack: 0,
});
const o_EnvironmentResponse: D.LazyStruct = () => ({
  Variables: D.map(D.secret),
  Error: { Message: D.secret },
});
const o_ErrorObject: D.LazyStruct = () => ({
  ErrorMessage: D.secret,
  ErrorType: D.secret,
  ErrorData: D.secret,
  StackTrace: D.list(D.secret),
});
const o_EventError: D.LazyStruct = () => ({ Payload: o_ErrorObject });
const o_EventInput: D.LazyStruct = () => ({ Payload: D.secret });
const o_EventResult: D.LazyStruct = () => ({ Payload: D.secret });
const o_FunctionConfiguration: D.LazyStruct = () => ({
  Environment: o_EnvironmentResponse,
  ImageConfigResponse: o_ImageConfigResponse,
  RuntimeVersionConfig: o_RuntimeVersionConfig,
});
const o_ImageConfigResponse: D.LazyStruct = () => ({
  Error: { Message: D.secret },
});
const o_Operation: D.LazyStruct = () => ({
  StartTimestamp: D.ts,
  EndTimestamp: D.ts,
  ExecutionDetails: { InputPayload: D.secret },
  ContextDetails: { Result: D.secret, Error: o_ErrorObject },
  StepDetails: {
    NextAttemptTimestamp: D.ts,
    Result: D.secret,
    Error: o_ErrorObject,
  },
  WaitDetails: { ScheduledEndTimestamp: D.ts },
  CallbackDetails: { Result: D.secret, Error: o_ErrorObject },
  ChainedInvokeDetails: { Result: D.secret, Error: o_ErrorObject },
});
const o_RuntimeVersionConfig: D.LazyStruct = () => ({
  Error: { Message: D.secret },
});
const i_KafkaSchemaRegistryConfig: D.LazyStruct = () => ({
  SchemaRegistryURI: 0,
  EventRecordFormat: 0,
  AccessConfigs: D.list({ Type: 0, URI: 0 }),
  SchemaValidationConfigs: D.list({ Attribute: 0 }),
});
