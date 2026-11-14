import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Lambda Core",
  serviceShapeName: "LambdaCoreApiService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "lambda" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-04-30");
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "LambdaCore",
  service: "LambdaCore",
  propagate: TxXray.propagate,
} as const;

export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NetworkConnectorLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<NetworkConnectorLimitExceededException>()(
    "NetworkConnectorLimitExceededException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class OperatorRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<OperatorRoleNotAssumable>()(
    "OperatorRoleNotAssumable",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterValueException",
      message: {
        matches:
          "unable to assume the provided NetworkConnectorOperatorRole|invalid ConnectorOperatorRole permissions",
      },
    }),
  ) {}
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
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
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
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ThrottleReason" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export type NetworkConnectorName = string;
export type NetworkConnectorSubnetId = string;
export type NetworkConnectorSubnetIds = string[];
export type NetworkConnectorSecurityGroupId = string;
export type NetworkConnectorSecurityGroupIds = string[];
export type NetworkProtocol = "IPv4" | "DualStack" | (string & {});
export type ComputeResourceType = "MicroVm" | "WebFunction" | (string & {});
export type AssociatedComputeResourceTypesList = ComputeResourceType[];
export interface NetworkConnectorVpcEgressConfiguration {
  SubnetIds?: string[] | undefined;
  SecurityGroupIds?: string[] | undefined;
  NetworkProtocol?: NetworkProtocol | undefined;
  AssociatedComputeResourceTypes?: ComputeResourceType[] | undefined;
}
export type NetworkConnectorConfiguration = {
  VpcEgressConfiguration: NetworkConnectorVpcEgressConfiguration;
};
export type NetworkConnectorRoleArn = string;
export type ClientTokenString = string;
export type NetworkConnectorTagKey = string;
export type NetworkConnectorTagValue = string;
export type NetworkConnectorTags = { [key: string]: string | undefined };
export interface CreateNetworkConnectorRequest {
  Name: string;
  Configuration: NetworkConnectorConfiguration;
  OperatorRole?: string | undefined;
  ClientToken?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export type NetworkConnectorArn = string;
export type NetworkConnectorId = string;
export type NetworkConnectorVersion = number;
export type NetworkConnectorState =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | "FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export interface CreateNetworkConnectorResponse {
  Arn: string;
  Name: string;
  Id: string;
  VersionArn?: string | undefined;
  Version?: number | undefined;
  Configuration?: NetworkConnectorConfiguration | undefined;
  OperatorRole?: string | undefined;
  State?: NetworkConnectorState | undefined;
}
export type RuntimeName = string;
export type TagMap = { [key: string]: string | undefined };
export type RuntimeDescription = string;
export type RuntimeLicenseInfo = string;
export type RuntimeReleaseState = "PREVIEW" | "GA" | "DEPRECATED" | (string & {});
export type RuntimeLifecycleDate = string;
export interface RuntimeReleaseLifecycle {
  ReleaseState?: RuntimeReleaseState | undefined;
  DeprecationDate?: string | undefined;
  FunctionCreateBlockDate?: string | undefined;
  FunctionUpdateBlockDate?: string | undefined;
}
export interface CreateRuntimeRequest {
  Name: string;
  Tags?: { [key: string]: string | undefined } | undefined;
  Description?: string | undefined;
  LicenseInfo?: string | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
}
export type RuntimeArn = string;
export type RuntimeTimestamp = string;
export interface CreateRuntimeResponse {
  Arn: string;
  Name: string;
  Description?: string | undefined;
  LicenseInfo?: string | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
  Created: string;
  LastModified: string;
}
export type RuntimeIdentifier = string;
export type RuntimeVersionName = string;
export type RuntimeAliasName = string;
export type RuntimeAliasDescription = string;
export interface CreateRuntimeAliasRequest {
  RuntimeName: string;
  RuntimeVersion: string;
  Name: string;
  Description?: string | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
}
export type RuntimeAliasState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "PENDING_DELETION"
  | (string & {});
export interface CreateRuntimeAliasResponse {
  Name: string;
  Arn: string;
  RuntimeVersion: string;
  RuntimeVersionArn: string;
  State: RuntimeAliasState;
  Description?: string | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
  Created: string;
  LastModified: string;
}
export interface CreateRuntimeVersionRequest {
  RuntimeName: string;
  ImageUri: string;
  Name: string;
  ReleaseNotes?: string | undefined;
  DryRun?: boolean | undefined;
}
export type RuntimeVersionState =
  | "CREATING"
  | "ACTIVE"
  | "FAILED"
  | "DELETING"
  | "PENDING_DELETION"
  | (string & {});
export interface Platform {
  Architecture: string;
  Os: string;
  Digest: string;
}
export type PlatformList = Platform[];
export type IntegrationModel = "RuntimeAPI" | (string & {});
export type IntegrationModelList = IntegrationModel[];
export type RuntimeArchitecture = "x86_64" | "arm64" | (string & {});
export type RuntimeArchitectureList = RuntimeArchitecture[];
export type CompatibilityPolicy = "Supported" | "NotSupported" | (string & {});
export interface Compatibility {
  IntegrationModels?: IntegrationModel[] | undefined;
  Architectures?: RuntimeArchitecture[] | undefined;
  ManagedInstances?: CompatibilityPolicy | undefined;
}
export interface CreateRuntimeVersionResponse {
  Name: string;
  Arn: string;
  ResolvedUri: string;
  State: RuntimeVersionState;
  ReleaseNotes?: string | undefined;
  Platforms?: Platform[] | undefined;
  Compatibility?: Compatibility | undefined;
  Created: string;
  LastModified: string;
}
export type NetworkConnectorIdentifier = string;
export interface DeleteNetworkConnectorRequest {
  Identifier: string;
}
export interface DeleteNetworkConnectorResponse {
  Arn: string;
  Name: string;
  Id: string;
  VersionArn?: string | undefined;
  Version?: number | undefined;
  Configuration?: NetworkConnectorConfiguration | undefined;
  OperatorRole?: string | undefined;
  State?: NetworkConnectorState | undefined;
}
export interface DeleteRuntimeRequest {
  RuntimeName: string;
  RecoveryWindowInDays?: number | undefined;
}
export interface DeleteRuntimeResponse {}
export interface DeleteRuntimeAliasRequest {
  RuntimeName: string;
  Name: string;
  RecoveryWindowInDays?: number | undefined;
}
export interface DeleteRuntimeAliasResponse {}
export interface DeleteRuntimeVersionRequest {
  RuntimeName: string;
  Name: string;
  RecoveryWindowInDays?: number | undefined;
}
export interface DeleteRuntimeVersionResponse {}
export interface GetNetworkConnectorRequest {
  Identifier: string;
}
export type AwsGirApiString = string;
export type NetworkConnectorStateReasonCode =
  | "DisallowedByVpcEncryptionControl"
  | "Ec2RequestLimitExceeded"
  | "InsufficientRolePermissions"
  | "InternalError"
  | "InvalidSecurityGroup"
  | "InvalidSubnet"
  | "SecurityGroupsPerInterfaceLimitExceeded"
  | "SubnetOutOfIPAddresses"
  | (string & {});
export type NetworkConnectorLastUpdateStatus =
  | "Successful"
  | "Failed"
  | "InProgress"
  | (string & {});
export type NetworkConnectorLastUpdateStatusReason = string;
export type NetworkConnectorLastUpdateStatusReasonCode =
  | "DisallowedByVpcEncryptionControl"
  | "Ec2RequestLimitExceeded"
  | "InsufficientRolePermissions"
  | "InternalError"
  | "InvalidSecurityGroup"
  | "InvalidSubnet"
  | "SecurityGroupsPerInterfaceLimitExceeded"
  | "SubnetOutOfIPAddresses"
  | (string & {});
export type CoreTimestamp = Date;
export interface GetNetworkConnectorResponse {
  Arn: string;
  Name: string;
  Id: string;
  VersionArn?: string | undefined;
  Version?: number | undefined;
  LatestVersionArn?: string | undefined;
  LatestVersion?: number | undefined;
  Configuration?: NetworkConnectorConfiguration | undefined;
  OperatorRole?: string | undefined;
  State?: NetworkConnectorState | undefined;
  StateReason?: string | undefined;
  StateReasonCode?: NetworkConnectorStateReasonCode | undefined;
  LastUpdateStatus?: NetworkConnectorLastUpdateStatus | undefined;
  LastUpdateStatusReason?: string | undefined;
  LastUpdateStatusReasonCode?: NetworkConnectorLastUpdateStatusReasonCode | undefined;
  LastModified?: Date | undefined;
}
export interface GetRuntimeRequest {
  RuntimeName: string;
}
export type RuntimeState = "ACTIVE" | "PENDING_DELETION" | "DELETING" | "FAILED" | (string & {});
export interface GetRuntimeResponse {
  Arn: string;
  Name: string;
  Description?: string | undefined;
  LicenseInfo?: string | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
  State?: RuntimeState | undefined;
  PendingDeletionAt?: string | undefined;
  Created: string;
  LastModified: string;
  Id?: string | undefined;
}
export interface GetRuntimeAliasRequest {
  RuntimeName: string;
  Name: string;
}
export interface GetRuntimeAliasResponse {
  Name: string;
  Arn: string;
  RuntimeVersion: string;
  RuntimeVersionArn: string;
  State: RuntimeAliasState;
  PendingDeletionAt?: string | undefined;
  Description?: string | undefined;
  Compatibility?: Compatibility | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
  Created: string;
  LastModified: string;
}
export interface GetRuntimeVersionRequest {
  RuntimeName: string;
  Name: string;
}
export interface GetRuntimeVersionResponse {
  Name: string;
  Arn: string;
  ResolvedUri: string;
  State: RuntimeVersionState;
  PendingDeletionAt?: string | undefined;
  ReleaseNotes?: string | undefined;
  Platforms?: Platform[] | undefined;
  Compatibility?: Compatibility | undefined;
  Created: string;
  LastModified: string;
}
export type MaxHundredListItems = number;
export interface ListNetworkConnectorsRequest {
  State?: NetworkConnectorState | undefined;
  Marker?: string | undefined;
  MaxItems?: number | undefined;
}
export type NetworkConnectorType = "VPC_EGRESS" | (string & {});
export interface NetworkConnectorSummary {
  Arn: string;
  Name: string;
  Id: string;
  Type: NetworkConnectorType;
  State?: NetworkConnectorState | undefined;
  LastModified?: Date | undefined;
  LatestVersionArn?: string | undefined;
  LatestVersion?: number | undefined;
}
export type NetworkConnectorsList = NetworkConnectorSummary[];
export interface ListNetworkConnectorsResponse {
  NetworkConnectors: NetworkConnectorSummary[];
  NextMarker?: string | undefined;
}
export interface ListNetworkConnectorVersionsRequest {
  Identifier: string;
  State?: NetworkConnectorState | undefined;
  Marker?: string | undefined;
  MaxItems?: number | undefined;
}
export interface NetworkConnectorVersionSummary {
  Arn: string;
  VersionArn: string;
  Name: string;
  Id: string;
  Version: number;
  State: NetworkConnectorState;
  StateReason?: string | undefined;
  StateReasonCode?: NetworkConnectorStateReasonCode | undefined;
  LastModified?: Date | undefined;
}
export type NetworkConnectorVersionsList = NetworkConnectorVersionSummary[];
export interface ListNetworkConnectorVersionsResponse {
  NetworkConnectorVersions: NetworkConnectorVersionSummary[];
  NextMarker?: string | undefined;
}
export interface ListRuntimeAliasesRequest {
  RuntimeName: string;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface RuntimeAliasInfo {
  Name: string;
  Arn: string;
  RuntimeVersion: string;
  RuntimeVersionArn: string;
  State: RuntimeAliasState;
  PendingDeletionAt?: string | undefined;
  Description?: string | undefined;
  Compatibility?: Compatibility | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
  Created: string;
  LastModified: string;
}
export type RuntimeAliasList = RuntimeAliasInfo[];
export interface ListRuntimeAliasesResponse {
  Items: RuntimeAliasInfo[];
  NextToken?: string | undefined;
}
export interface ListRuntimesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface RuntimeInfo {
  Arn: string;
  Name: string;
  Description?: string | undefined;
  LicenseInfo?: string | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
  State?: RuntimeState | undefined;
  PendingDeletionAt?: string | undefined;
  Created: string;
  LastModified: string;
}
export type RuntimeList = RuntimeInfo[];
export interface ListRuntimesResponse {
  NextToken?: string | undefined;
  Items: RuntimeInfo[];
}
export interface ListRuntimeVersionsRequest {
  RuntimeName: string;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface RuntimeVersionInfo {
  Name: string;
  Arn: string;
  ResolvedUri: string;
  State: RuntimeVersionState;
  PendingDeletionAt?: string | undefined;
  ReleaseNotes?: string | undefined;
  Compatibility?: Compatibility | undefined;
  Created: string;
  LastModified: string;
}
export type RuntimeVersionList = RuntimeVersionInfo[];
export interface ListRuntimeVersionsResponse {
  Items: RuntimeVersionInfo[];
  NextToken?: string | undefined;
}
export interface RestoreRuntimeRequest {
  RuntimeName: string;
  RuntimeVersion?: string | undefined;
  RuntimeAlias?: string | undefined;
}
export interface RestoreRuntimeResponse {
  RuntimeName: string;
  RuntimeVersion?: string | undefined;
  RuntimeAlias?: string | undefined;
  Arn: string;
  State: RuntimeState;
  LastModified: string;
}
export interface UpdateNetworkConnectorRequest {
  Identifier: string;
  Configuration?: NetworkConnectorConfiguration | undefined;
  OperatorRole?: string | undefined;
  ClientToken?: string | undefined;
}
export interface UpdateNetworkConnectorResponse {
  Arn: string;
  Name: string;
  Id: string;
  VersionArn?: string | undefined;
  Version?: number | undefined;
  OperatorRole?: string | undefined;
  Configuration?: NetworkConnectorConfiguration | undefined;
  State?: NetworkConnectorState | undefined;
  LastUpdateStatus?: NetworkConnectorLastUpdateStatus | undefined;
  LastUpdateStatusReason?: string | undefined;
  LastModified?: Date | undefined;
}
export interface UpdateRuntimeRequest {
  RuntimeName: string;
  Description?: string | undefined;
  LicenseInfo?: string | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
}
export interface UpdateRuntimeResponse {
  Arn: string;
  Name: string;
  Description?: string | undefined;
  LicenseInfo?: string | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
  Created: string;
  LastModified: string;
}
export interface UpdateRuntimeAliasRequest {
  RuntimeName: string;
  Name: string;
  RuntimeVersion: string;
  Description?: string | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
}
export interface UpdateRuntimeAliasResponse {
  RuntimeName: string;
  Name: string;
  Arn: string;
  RuntimeVersion: string;
  RuntimeVersionArn: string;
  State: RuntimeAliasState;
  Description?: string | undefined;
  Compatibility?: Compatibility | undefined;
  ReleaseLifecycle?: RuntimeReleaseLifecycle | undefined;
  Created: string;
  LastModified: string;
}
export interface UpdateRuntimeVersionRequest {
  RuntimeName: string;
  Name: string;
  ReleaseNotes: string;
}
export interface UpdateRuntimeVersionResponse {
  Name: string;
  Arn: string;
  ResolvedUri: string;
  State: RuntimeVersionState;
  ReleaseNotes?: string | undefined;
  Platforms?: Platform[] | undefined;
  Compatibility?: Compatibility | undefined;
  Created: string;
  LastModified: string;
}
export type ThrottleReason =
  | "ConcurrentInvocationLimitExceeded"
  | "FunctionInvocationRateLimitExceeded"
  | "ReservedFunctionConcurrentInvocationLimitExceeded"
  | "ReservedFunctionInvocationRateLimitExceeded"
  | "CallerRateLimitExceeded"
  | "ConcurrentSnapshotCreateLimitExceeded"
  | (string & {});
export type CreateNetworkConnectorError =
  | InvalidParameterValueException
  | NetworkConnectorLimitExceededException
  | ResourceConflictException
  | ServiceException
  | TooManyRequestsException
  | OperatorRoleNotAssumable
  | CommonErrors;
/**
 * Creates a network connector that enables Lambda compute resources to route outbound traffic through your Amazon VPC. The network connector provisions elastic network interfaces (ENIs) in the subnets you specify, providing a managed network path to private resources such as databases, caches, and internal APIs.
 *
 * This operation is asynchronous. The network connector starts in `PENDING` state while ENIs are provisioned in your VPC (provisioning typically takes up to 10 minutes). Use `GetNetworkConnector` to poll the connector state until it reaches `ACTIVE`. Once active, you can attach the connector to supported Lambda compute resources -- such as MicroVMs and WebFunctions -- at run time. For how to attach a connector, see the documentation for the specific compute type.
 *
 * This operation is idempotent when you provide a `ClientToken` -- if you retry a request that completed successfully using the same client token, the operation returns the existing connector without creating a duplicate.
 */
export const createNetworkConnector: API.OperationMethod<
  CreateNetworkConnectorRequest & RegionInput,
  CreateNetworkConnectorResponse,
  CreateNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(100, __c25, 0) as any as S.Schema<CreateNetworkConnectorRequest>,
  output: __S(108, __c27, 0) as any as S.Schema<CreateNetworkConnectorResponse>,
  errors: [
    InvalidParameterValueException,
    NetworkConnectorLimitExceededException,
    ResourceConflictException,
    ServiceException,
    TooManyRequestsException,
    OperatorRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetworkConnector",
  telemetry: TELEMETRY,
  span: "CreateNetworkConnector",
}));

export type CreateRuntimeError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ServiceException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a customer-managed runtime, a resource providing a centrally managed execution environment for your Lambda functions. The runtime resource is the parent of the runtime version and runtime alias child resources.
 */
export const createRuntime: API.OperationMethod<
  CreateRuntimeRequest & RegionInput,
  CreateRuntimeResponse,
  CreateRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c30, 0) as any as S.Schema<CreateRuntimeRequest>,
  output: __S(128, __c32, 0) as any as S.Schema<CreateRuntimeResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ServiceException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuntime",
  telemetry: TELEMETRY,
  span: "CreateRuntime",
}));

export type CreateRuntimeAliasError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new customer-managed runtime alias. The alias is a named pointer to a runtime version. Functions consume the customer-managed runtime through the runtime alias.
 */
export const createRuntimeAlias: API.OperationMethod<
  CreateRuntimeAliasRequest & RegionInput,
  CreateRuntimeAliasResponse,
  CreateRuntimeAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateRuntimeAliasRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateRuntimeAliasResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuntimeAlias",
  telemetry: TELEMETRY,
  span: "CreateRuntimeAlias",
}));

export type CreateRuntimeVersionError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new runtime version. A runtime version defines the function execution environment by referencing a container image. Runtime versions are immutable. To update the runtime, create a new runtime version and migrate functions by updating the runtime aliases to point to the new runtime version.
 */
export const createRuntimeVersion: API.OperationMethod<
  CreateRuntimeVersionRequest & RegionInput,
  CreateRuntimeVersionResponse,
  CreateRuntimeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<CreateRuntimeVersionRequest>,
  output: __S(16, __c4, 0) as any as S.Schema<CreateRuntimeVersionResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuntimeVersion",
  telemetry: TELEMETRY,
  span: "CreateRuntimeVersion",
}));

export type DeleteNetworkConnectorError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates deletion of a network connector. The connector transitions to `DELETING` state while elastic network interfaces are cleaned up asynchronously. After deletion completes, subsequent calls to `GetNetworkConnector` return `ResourceNotFoundException`.
 *
 * This operation is idempotent -- calling delete on a connector that is already deleting or has been deleted succeeds without error. You can delete connectors in `ACTIVE` or `FAILED` states. Before deleting a connector, ensure that no Lambda compute resources are using it, as they will lose VPC egress connectivity immediately.
 *
 * Deleting with an unqualified identifier removes the connector and all of its versions. To remove a single historical version, supply its version-qualified ARN; the connector and its remaining versions are unaffected. You can't delete the latest version on its own -- delete the connector to remove it.
 */
export const deleteNetworkConnector: API.OperationMethod<
  DeleteNetworkConnectorRequest & RegionInput,
  DeleteNetworkConnectorResponse,
  DeleteNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<DeleteNetworkConnectorRequest>,
  output: __S(108, __c27, 0) as any as S.Schema<DeleteNetworkConnectorResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkConnector",
  telemetry: TELEMETRY,
  span: "DeleteNetworkConnector",
}));

export type DeleteRuntimeError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Schedules a customer-managed runtime to be deleted. Runtimes scheduled for deletion enter the PENDING_DELETION state and can be restored during the scheduled deletion window. Runtime versions and aliases must be deleted or scheduled for deletion before deleting the runtime. Function invokes fail for functions using runtime versions or aliases that are deleted or pending deletion.
 */
export const deleteRuntime: API.OperationMethod<
  DeleteRuntimeRequest & RegionInput,
  DeleteRuntimeResponse,
  DeleteRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c6, 0) as any as S.Schema<DeleteRuntimeRequest>,
  output: __S(28, __c7, 0) as any as S.Schema<DeleteRuntimeResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuntime",
  telemetry: TELEMETRY,
  span: "DeleteRuntime",
}));

export type DeleteRuntimeAliasError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Schedules a runtime alias to be deleted. Runtime aliases scheduled for deletion enter the PENDING_DELETION state and can be restored during the scheduled deletion window. Function invokes fail for functions using runtime aliases that are deleted or pending deletion.
 */
export const deleteRuntimeAlias: API.OperationMethod<
  DeleteRuntimeAliasRequest & RegionInput,
  DeleteRuntimeAliasResponse,
  DeleteRuntimeAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<DeleteRuntimeAliasRequest>,
  output: __S(28, __c7, 0) as any as S.Schema<DeleteRuntimeAliasResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuntimeAlias",
  telemetry: TELEMETRY,
  span: "DeleteRuntimeAlias",
}));

export type DeleteRuntimeVersionError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Schedules a runtime version to be deleted. Runtime versions scheduled for deletion enter the PENDING_DELETION state and can be restored during the scheduled deletion window. Function invokes fail for functions using a runtime version that is deleted or pending deletion.
 */
export const deleteRuntimeVersion: API.OperationMethod<
  DeleteRuntimeVersionRequest & RegionInput,
  DeleteRuntimeVersionResponse,
  DeleteRuntimeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(36, __c9, 0) as any as S.Schema<DeleteRuntimeVersionRequest>,
  output: __S(28, __c7, 0) as any as S.Schema<DeleteRuntimeVersionResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuntimeVersion",
  telemetry: TELEMETRY,
  span: "DeleteRuntimeVersion",
}));

export type GetNetworkConnectorError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the current configuration, state, and metadata of a network connector. The `Identifier` parameter accepts the connector ID, name, or full ARN. Use this operation to poll connector state after creation or update, or to inspect the current VPC configuration and any failure reasons.
 *
 * The response includes the full connector configuration, current state, and -- if the connector has been updated -- the `LastUpdateStatus` and `LastUpdateStatusReasonCode` fields that indicate whether the most recent update succeeded or failed.
 */
export const getNetworkConnector: API.OperationMethod<
  GetNetworkConnectorRequest & RegionInput,
  GetNetworkConnectorResponse,
  GetNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c10, 0) as any as S.Schema<GetNetworkConnectorRequest>,
  output: __S(41, __c10, 1) as any as S.Schema<GetNetworkConnectorResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkConnector",
  telemetry: TELEMETRY,
  span: "GetNetworkConnector",
}));

export type GetRuntimeError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the configuration and metadata of a runtime.
 */
export const getRuntime: API.OperationMethod<
  GetRuntimeRequest & RegionInput,
  GetRuntimeResponse,
  GetRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(44, __c11, 0) as any as S.Schema<GetRuntimeRequest>,
  output: __S(45, __c11, 1) as any as S.Schema<GetRuntimeResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuntime",
  telemetry: TELEMETRY,
  span: "GetRuntime",
}));

export type GetRuntimeAliasError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the configuration, state, and metadata of a runtime alias.
 */
export const getRuntimeAlias: API.OperationMethod<
  GetRuntimeAliasRequest & RegionInput,
  GetRuntimeAliasResponse,
  GetRuntimeAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c12, 0) as any as S.Schema<GetRuntimeAliasRequest>,
  output: __S(52, __c13, 0) as any as S.Schema<GetRuntimeAliasResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuntimeAlias",
  telemetry: TELEMETRY,
  span: "GetRuntimeAlias",
}));

export type GetRuntimeVersionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the configuration, state, and metadata of a runtime version.
 */
export const getRuntimeVersion: API.OperationMethod<
  GetRuntimeVersionRequest & RegionInput,
  GetRuntimeVersionResponse,
  GetRuntimeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c14, 0) as any as S.Schema<GetRuntimeVersionRequest>,
  output: __S(57, __c14, 1) as any as S.Schema<GetRuntimeVersionResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuntimeVersion",
  telemetry: TELEMETRY,
  span: "GetRuntimeVersion",
}));

export type ListNetworkConnectorsError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of network connectors in your account for the current Region. You can optionally filter results by connector state. Use the `Marker` parameter from a previous response to retrieve the next page of results.
 *
 * Each item in the response includes the connector ARN, name, ID, type, current state, and last modified timestamp. To retrieve full configuration details for a specific connector, use `GetNetworkConnector`.
 */
export const listNetworkConnectors: API.PaginatedOperationMethod<
  ListNetworkConnectorsRequest & RegionInput,
  ListNetworkConnectorsResponse,
  ListNetworkConnectorsError,
  Credentials | HttpClient.HttpClient,
  NetworkConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(60, __c15, 0) as any as S.Schema<ListNetworkConnectorsRequest>,
  output: __S(63, __c15, 3) as any as S.Schema<ListNetworkConnectorsResponse>,
  errors: [InvalidParameterValueException, ServiceException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkConnectors",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "NetworkConnectors",
    pageSize: "MaxItems",
  } as const,
  telemetry: TELEMETRY,
  span: "ListNetworkConnectors",
})) as any;

export type ListNetworkConnectorVersionsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of the versions of a network connector. Each configuration update creates a new immutable version; this operation lists those versions for the connector you specify. You can optionally filter results by version state. Use the `Marker` parameter from a previous response to retrieve the next page of results.
 *
 * Each item in the response includes the version-qualified ARN, version number, current state, and last modified timestamp for that version. To retrieve the current (latest) configuration of the connector, use `GetNetworkConnector`; to inspect a specific version, call `GetNetworkConnector` with a version-qualified identifier.
 */
export const listNetworkConnectorVersions: API.PaginatedOperationMethod<
  ListNetworkConnectorVersionsRequest & RegionInput,
  ListNetworkConnectorVersionsResponse,
  ListNetworkConnectorVersionsError,
  Credentials | HttpClient.HttpClient,
  NetworkConnectorVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(64, __c16, 0) as any as S.Schema<ListNetworkConnectorVersionsRequest>,
  output: __S(67, __c16, 3) as any as S.Schema<ListNetworkConnectorVersionsResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkConnectorVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "NetworkConnectorVersions",
    pageSize: "MaxItems",
  } as const,
  telemetry: TELEMETRY,
  span: "ListNetworkConnectorVersions",
})) as any;

export type ListRuntimeAliasesError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of aliases for the specified runtime.
 */
export const listRuntimeAliases: API.PaginatedOperationMethod<
  ListRuntimeAliasesRequest & RegionInput,
  ListRuntimeAliasesResponse,
  ListRuntimeAliasesError,
  Credentials | HttpClient.HttpClient,
  RuntimeAliasInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(68, __c17, 0) as any as S.Schema<ListRuntimeAliasesRequest>,
  output: __S(70, __c17, 2) as any as S.Schema<ListRuntimeAliasesResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuntimeAliases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListRuntimeAliases",
})) as any;

export type ListRuntimesError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of runtimes in your account for the current Region.
 */
export const listRuntimes: API.PaginatedOperationMethod<
  ListRuntimesRequest & RegionInput,
  ListRuntimesResponse,
  ListRuntimesError,
  Credentials | HttpClient.HttpClient,
  RuntimeInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(72, __c18, 0) as any as S.Schema<ListRuntimesRequest>,
  output: __S(75, __c18, 3) as any as S.Schema<ListRuntimesResponse>,
  errors: [InvalidParameterValueException, ServiceException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuntimes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListRuntimes",
})) as any;

export type ListRuntimeVersionsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of versions for the specified runtime.
 */
export const listRuntimeVersions: API.PaginatedOperationMethod<
  ListRuntimeVersionsRequest & RegionInput,
  ListRuntimeVersionsResponse,
  ListRuntimeVersionsError,
  Credentials | HttpClient.HttpClient,
  RuntimeVersionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(76, __c19, 0) as any as S.Schema<ListRuntimeVersionsRequest>,
  output: __S(79, __c19, 3) as any as S.Schema<ListRuntimeVersionsResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuntimeVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListRuntimeVersions",
})) as any;

export type RestoreRuntimeError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Cancels a pending scheduled deletion, returning the resource to the ACTIVE state. Scope is
 * determined by the RuntimeName path parameter plus an optional, mutually exclusive RuntimeVersion
 * or RuntimeAlias query parameter: with neither, the runtime itself is restored; with RuntimeVersion,
 * the named runtime version; with RuntimeAlias, the named runtime alias. Restoring a resource that is
 * already ACTIVE is a no-op success. Restore only works while the target is PENDING_DELETION; once the
 * scheduled deletion has begun executing (DELETING) or has completed, the call fails.
 */
export const restoreRuntime: API.OperationMethod<
  RestoreRuntimeRequest & RegionInput,
  RestoreRuntimeResponse,
  RestoreRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c20, 0) as any as S.Schema<RestoreRuntimeRequest>,
  output: __S(81, __c20, 1) as any as S.Schema<RestoreRuntimeResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreRuntime",
  telemetry: TELEMETRY,
  span: "RestoreRuntime",
}));

export type UpdateNetworkConnectorError =
  | InvalidParameterValueException
  | NetworkConnectorLimitExceededException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | OperatorRoleNotAssumable
  | CommonErrors;
/**
 * Updates the VPC configuration or operator role of an existing network connector. You can modify the subnet IDs, security group IDs, network protocol, or operator role. The connector must be in `ACTIVE` state to accept updates.
 *
 * This operation is asynchronous. The connector remains in `ACTIVE` state during the update -- existing workloads that reference this connector are not disrupted. Use `GetNetworkConnector` to monitor the `LastUpdateStatus` field, which transitions through `InProgress` to `Successful` or `Failed`. If the update fails, the `LastUpdateStatusReasonCode` field provides a specific error code for troubleshooting. This operation is idempotent when you provide a `ClientToken`.
 *
 * Each successful configuration change creates a new immutable version. A connector can have a limited number of versions; once that limit is reached, further updates fail with `NetworkConnectorLimitExceededException` until you delete older versions.
 */
export const updateNetworkConnector: API.OperationMethod<
  UpdateNetworkConnectorRequest & RegionInput,
  UpdateNetworkConnectorResponse,
  UpdateNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(84, __c21, 0) as any as S.Schema<UpdateNetworkConnectorRequest>,
  output: __S(85, __c21, 1) as any as S.Schema<UpdateNetworkConnectorResponse>,
  errors: [
    InvalidParameterValueException,
    NetworkConnectorLimitExceededException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    OperatorRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkConnector",
  telemetry: TELEMETRY,
  span: "UpdateNetworkConnector",
}));

export type UpdateRuntimeError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the properties of an existing customer-managed runtime, such as its description, license information, or lifecycle information.
 */
export const updateRuntime: API.OperationMethod<
  UpdateRuntimeRequest & RegionInput,
  UpdateRuntimeResponse,
  UpdateRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c22, 0) as any as S.Schema<UpdateRuntimeRequest>,
  output: __S(128, __c32, 0) as any as S.Schema<UpdateRuntimeResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuntime",
  telemetry: TELEMETRY,
  span: "UpdateRuntime",
}));

export type UpdateRuntimeAliasError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing runtime alias to point to a different runtime version or to change its description or lifecycle information.
 */
export const updateRuntimeAlias: API.OperationMethod<
  UpdateRuntimeAliasRequest & RegionInput,
  UpdateRuntimeAliasResponse,
  UpdateRuntimeAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(92, __c23, 0) as any as S.Schema<UpdateRuntimeAliasRequest>,
  output: __S(93, __c23, 1) as any as S.Schema<UpdateRuntimeAliasResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuntimeAlias",
  telemetry: TELEMETRY,
  span: "UpdateRuntimeAlias",
}));

export type UpdateRuntimeVersionError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the runtime version release notes. The runtime version must be in the ACTIVE state. The runtime version image is immutable. To change the runtime contents, create a new runtime version.
 */
export const updateRuntimeVersion: API.OperationMethod<
  UpdateRuntimeVersionRequest & RegionInput,
  UpdateRuntimeVersionResponse,
  UpdateRuntimeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c24, 0) as any as S.Schema<UpdateRuntimeVersionRequest>,
  output: __S(16, __c4, 0) as any as S.Schema<UpdateRuntimeVersionResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuntimeVersion",
  telemetry: TELEMETRY,
  span: "UpdateRuntimeVersion",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          RuntimeVersion: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          ReleaseLifecycle: S.optional(__S(124, __c31, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-10-01/runtimes/{RuntimeName}/aliases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRuntimeAliasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          RuntimeVersion: S.String,
          RuntimeVersionArn: S.String,
          State: S.String,
          Description: S.optional(S.String),
          ReleaseLifecycle: S.optional(__S(124, __c31, 0)),
          Created: S.String,
          LastModified: S.String,
        }),
      ).annotate({ identifier: "CreateRuntimeAliasResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          ImageUri: S.String,
          Name: S.String,
          ReleaseNotes: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-10-01/runtimes/{RuntimeName}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRuntimeVersionRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IntegrationModels: S.optional(__S(104, __c26, 0)),
          Architectures: S.optional(__S(104, __c26, 0)),
          ManagedInstances: S.optional(S.String),
        }),
      ).annotate({ identifier: "Compatibility" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Architecture: S.String, Os: S.String, Digest: S.String }),
      ).annotate({ identifier: "Platform" });
    case 1:
      return S.Array(__S(12, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          ResolvedUri: S.String,
          State: S.String,
          ReleaseNotes: S.optional(S.String),
          Platforms: S.optional(__S(13, __c3, 1)),
          Compatibility: S.optional(__S(8, __c2, 0)),
          Created: S.String,
          LastModified: S.String,
        }),
      ).annotate({ identifier: "CreateRuntimeVersionResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2026-04-04/network-connectors/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNetworkConnectorRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          RecoveryWindowInDays: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-runtime-recovery-window-in-days"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2026-10-01/runtimes/{RuntimeName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRuntimeRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteRuntimeResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          Name: S.String.pipe(T.HttpLabel("Name")),
          RecoveryWindowInDays: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-runtime-recovery-window-in-days"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2026-10-01/runtimes/{RuntimeName}/aliases/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRuntimeAliasRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          Name: S.String.pipe(T.HttpLabel("Name")),
          RecoveryWindowInDays: S.optional(S.Number).pipe(
            T.HttpHeader("x-amzn-runtime-recovery-window-in-days"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2026-10-01/runtimes/{RuntimeName}/versions/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRuntimeVersionRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2026-04-04/network-connectors/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkConnectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Id: S.String,
          VersionArn: S.optional(S.String),
          Version: S.optional(S.Number),
          LatestVersionArn: S.optional(S.String),
          LatestVersion: S.optional(S.Number),
          Configuration: S.optional(__S(114, __c28, 2)),
          OperatorRole: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          StateReasonCode: S.optional(S.String),
          LastUpdateStatus: S.optional(S.String),
          LastUpdateStatusReason: S.optional(S.String),
          LastUpdateStatusReasonCode: S.optional(S.String),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetNetworkConnectorResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2026-10-01/runtimes/{RuntimeName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRuntimeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          LicenseInfo: S.optional(S.String),
          ReleaseLifecycle: S.optional(__S(124, __c31, 0)),
          State: S.optional(S.String),
          PendingDeletionAt: S.optional(S.String),
          Created: S.String,
          LastModified: S.String,
          Id: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRuntimeResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2026-10-01/runtimes/{RuntimeName}/aliases/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRuntimeAliasRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          RuntimeVersion: S.String,
          RuntimeVersionArn: S.String,
          State: S.String,
          PendingDeletionAt: S.optional(S.String),
          Description: S.optional(S.String),
          Compatibility: S.optional(__S(8, __c2, 0)),
          ReleaseLifecycle: S.optional(__S(124, __c31, 0)),
          Created: S.String,
          LastModified: S.String,
        }),
      ).annotate({ identifier: "GetRuntimeAliasResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2026-10-01/runtimes/{RuntimeName}/versions/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRuntimeVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          ResolvedUri: S.String,
          State: S.String,
          PendingDeletionAt: S.optional(S.String),
          ReleaseNotes: S.optional(S.String),
          Platforms: S.optional(__S(13, __c3, 1)),
          Compatibility: S.optional(__S(8, __c2, 0)),
          Created: S.String,
          LastModified: S.String,
        }),
      ).annotate({ identifier: "GetRuntimeVersionResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String).pipe(T.HttpQuery("State")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2026-04-04/network-connectors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkConnectorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Id: S.String,
          Type: S.String,
          State: S.optional(S.String),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LatestVersionArn: S.optional(S.String),
          LatestVersion: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NetworkConnectorSummary" });
    case 2:
      return S.Array(__S(61, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NetworkConnectors: __S(62, __c15, 2), NextMarker: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkConnectorsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          State: S.optional(S.String).pipe(T.HttpQuery("State")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2026-04-04/network-connectors/{Identifier}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkConnectorVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          VersionArn: S.String,
          Name: S.String,
          Id: S.String,
          Version: S.Number,
          State: S.String,
          StateReason: S.optional(S.String),
          StateReasonCode: S.optional(S.String),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "NetworkConnectorVersionSummary" });
    case 2:
      return S.Array(__S(65, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NetworkConnectorVersions: __S(66, __c16, 2), NextMarker: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkConnectorVersionsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2026-10-01/runtimes/{RuntimeName}/aliases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRuntimeAliasesRequest" });
    case 1:
      return S.Array(__S(52, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: __S(69, __c17, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRuntimeAliasesResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2026-10-01/runtimes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRuntimesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          LicenseInfo: S.optional(S.String),
          ReleaseLifecycle: S.optional(__S(124, __c31, 0)),
          State: S.optional(S.String),
          PendingDeletionAt: S.optional(S.String),
          Created: S.String,
          LastModified: S.String,
        }),
      ).annotate({ identifier: "RuntimeInfo" });
    case 2:
      return S.Array(__S(73, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Items: __S(74, __c18, 2) }),
      ).annotate({ identifier: "ListRuntimesResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2026-10-01/runtimes/{RuntimeName}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRuntimeVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          ResolvedUri: S.String,
          State: S.String,
          PendingDeletionAt: S.optional(S.String),
          ReleaseNotes: S.optional(S.String),
          Compatibility: S.optional(__S(8, __c2, 0)),
          Created: S.String,
          LastModified: S.String,
        }),
      ).annotate({ identifier: "RuntimeVersionInfo" });
    case 2:
      return S.Array(__S(77, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: __S(78, __c19, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRuntimeVersionsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          RuntimeVersion: S.optional(S.String).pipe(T.HttpQuery("RuntimeVersion")),
          RuntimeAlias: S.optional(S.String).pipe(T.HttpQuery("RuntimeAlias")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-10-01/runtimes/{RuntimeName}/restore" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RestoreRuntimeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String,
          RuntimeVersion: S.optional(S.String),
          RuntimeAlias: S.optional(S.String),
          Arn: S.String,
          State: S.String,
          LastModified: S.String,
        }),
      ).annotate({ identifier: "RestoreRuntimeResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Configuration: S.optional(__S(114, __c28, 2)),
          OperatorRole: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2026-04-04/network-connectors/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNetworkConnectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Id: S.String,
          VersionArn: S.optional(S.String),
          Version: S.optional(S.Number),
          OperatorRole: S.optional(S.String),
          Configuration: S.optional(__S(114, __c28, 2)),
          State: S.optional(S.String),
          LastUpdateStatus: S.optional(S.String),
          LastUpdateStatusReason: S.optional(S.String),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "UpdateNetworkConnectorResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          Description: S.optional(S.String),
          LicenseInfo: S.optional(S.String),
          ReleaseLifecycle: S.optional(__S(124, __c31, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2026-10-01/runtimes/{RuntimeName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRuntimeRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          Name: S.String.pipe(T.HttpLabel("Name")),
          RuntimeVersion: S.String,
          Description: S.optional(S.String),
          ReleaseLifecycle: S.optional(__S(124, __c31, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2026-10-01/runtimes/{RuntimeName}/aliases/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRuntimeAliasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String,
          Name: S.String,
          Arn: S.String,
          RuntimeVersion: S.String,
          RuntimeVersionArn: S.String,
          State: S.String,
          Description: S.optional(S.String),
          Compatibility: S.optional(__S(8, __c2, 0)),
          ReleaseLifecycle: S.optional(__S(124, __c31, 0)),
          Created: S.String,
          LastModified: S.String,
        }),
      ).annotate({ identifier: "UpdateRuntimeAliasResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuntimeName: S.String.pipe(T.HttpLabel("RuntimeName")),
          Name: S.String.pipe(T.HttpLabel("Name")),
          ReleaseNotes: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/2026-10-01/runtimes/{RuntimeName}/versions/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRuntimeVersionRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Configuration: __S(114, __c28, 2),
          OperatorRole: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(116, __c29, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-04-04/network-connectors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateNetworkConnectorRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Id: S.String,
          VersionArn: S.optional(S.String),
          Version: S.optional(S.Number),
          Configuration: S.optional(__S(114, __c28, 2)),
          OperatorRole: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateNetworkConnectorResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__S(112, __c28, 0)),
          SecurityGroupIds: S.optional(__S(112, __c28, 0)),
          NetworkProtocol: S.optional(S.String),
          AssociatedComputeResourceTypes: S.optional(__S(104, __c26, 0)),
        }),
      ).annotate({ identifier: "NetworkConnectorVpcEgressConfiguration" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ VpcEgressConfiguration: __S(113, __c28, 1) })]);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Tags: S.optional(__S(116, __c29, 0)),
          Description: S.optional(S.String),
          LicenseInfo: S.optional(S.String),
          ReleaseLifecycle: S.optional(__S(124, __c31, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-10-01/runtimes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRuntimeRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReleaseState: S.optional(S.String),
          DeprecationDate: S.optional(S.String),
          FunctionCreateBlockDate: S.optional(S.String),
          FunctionUpdateBlockDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuntimeReleaseLifecycle" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          LicenseInfo: S.optional(S.String),
          ReleaseLifecycle: S.optional(__S(124, __c31, 0)),
          Created: S.String,
          LastModified: S.String,
        }),
      ).annotate({ identifier: "CreateRuntimeResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
