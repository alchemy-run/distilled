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
  ).pipe(C.withServerError) {}
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
  ).pipe(C.withThrottlingError) {}
export type NetworkConnectorName = string;
export type NetworkConnectorSubnetId = string;
export type NetworkConnectorSubnetIds = string[];
export type NetworkConnectorSecurityGroupId = string;
export type NetworkConnectorSecurityGroupIds = string[];
export type NetworkProtocol = "IPv4" | "DualStack" | (string & {});
export type ComputeResourceType = "MicroVm" | "WebFunction" | (string & {});
export type AssociatedComputeResourceTypesList = ComputeResourceType[];
export interface NetworkConnectorVpcEgressConfiguration {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  NetworkProtocol?: NetworkProtocol;
  AssociatedComputeResourceTypes?: ComputeResourceType[];
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
  OperatorRole?: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
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
  VersionArn?: string;
  Version?: number;
  Configuration?: NetworkConnectorConfiguration;
  OperatorRole?: string;
  State?: NetworkConnectorState;
}
export type NetworkConnectorIdentifier = string;
export interface DeleteNetworkConnectorRequest {
  Identifier: string;
}
export interface DeleteNetworkConnectorResponse {
  Arn: string;
  Name: string;
  Id: string;
  VersionArn?: string;
  Version?: number;
  Configuration?: NetworkConnectorConfiguration;
  OperatorRole?: string;
  State?: NetworkConnectorState;
}
export interface GetNetworkConnectorRequest {
  Identifier: string;
}
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
  VersionArn?: string;
  Version?: number;
  LatestVersionArn?: string;
  LatestVersion?: number;
  Configuration?: NetworkConnectorConfiguration;
  OperatorRole?: string;
  State?: NetworkConnectorState;
  StateReason?: string;
  StateReasonCode?: NetworkConnectorStateReasonCode;
  LastUpdateStatus?: NetworkConnectorLastUpdateStatus;
  LastUpdateStatusReason?: string;
  LastUpdateStatusReasonCode?: NetworkConnectorLastUpdateStatusReasonCode;
  LastModified?: Date;
}
export type MaxHundredListItems = number;
export interface ListNetworkConnectorsRequest {
  State?: NetworkConnectorState;
  Marker?: string;
  MaxItems?: number;
}
export type NetworkConnectorType = "VPC_EGRESS" | (string & {});
export interface NetworkConnectorSummary {
  Arn: string;
  Name: string;
  Id: string;
  Type: NetworkConnectorType;
  State?: NetworkConnectorState;
  LastModified?: Date;
  LatestVersionArn?: string;
  LatestVersion?: number;
}
export type NetworkConnectorsList = NetworkConnectorSummary[];
export interface ListNetworkConnectorsResponse {
  NetworkConnectors: NetworkConnectorSummary[];
  NextMarker?: string;
}
export interface ListNetworkConnectorVersionsRequest {
  Identifier: string;
  State?: NetworkConnectorState;
  Marker?: string;
  MaxItems?: number;
}
export interface NetworkConnectorVersionSummary {
  Arn: string;
  VersionArn: string;
  Name: string;
  Id: string;
  Version: number;
  State: NetworkConnectorState;
  StateReason?: string;
  StateReasonCode?: NetworkConnectorStateReasonCode;
  LastModified?: Date;
}
export type NetworkConnectorVersionsList = NetworkConnectorVersionSummary[];
export interface ListNetworkConnectorVersionsResponse {
  NetworkConnectorVersions: NetworkConnectorVersionSummary[];
  NextMarker?: string;
}
export interface UpdateNetworkConnectorRequest {
  Identifier: string;
  Configuration?: NetworkConnectorConfiguration;
  OperatorRole?: string;
  ClientToken?: string;
}
export interface UpdateNetworkConnectorResponse {
  Arn: string;
  Name: string;
  Id: string;
  VersionArn?: string;
  Version?: number;
  OperatorRole?: string;
  Configuration?: NetworkConnectorConfiguration;
  State?: NetworkConnectorState;
  LastUpdateStatus?: NetworkConnectorLastUpdateStatus;
  LastUpdateStatusReason?: string;
  LastModified?: Date;
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
  CreateNetworkConnectorRequest,
  CreateNetworkConnectorResponse,
  CreateNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(13, __c3, 1) as any as S.Schema<CreateNetworkConnectorRequest>,
  output: __S(16, __c4, 0) as any as S.Schema<CreateNetworkConnectorResponse>,
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
  DeleteNetworkConnectorRequest,
  DeleteNetworkConnectorResponse,
  DeleteNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c6, 0) as any as S.Schema<DeleteNetworkConnectorRequest>,
  output: __S(16, __c4, 0) as any as S.Schema<DeleteNetworkConnectorResponse>,
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
  GetNetworkConnectorRequest,
  GetNetworkConnectorResponse,
  GetNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(28, __c7, 0) as any as S.Schema<GetNetworkConnectorRequest>,
  output: __S(29, __c7, 1) as any as S.Schema<GetNetworkConnectorResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkConnector",
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
  ListNetworkConnectorsRequest,
  ListNetworkConnectorsResponse,
  ListNetworkConnectorsError,
  Credentials | HttpClient.HttpClient,
  NetworkConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListNetworkConnectorsRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<ListNetworkConnectorsResponse>,
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
  ListNetworkConnectorVersionsRequest,
  ListNetworkConnectorVersionsResponse,
  ListNetworkConnectorVersionsError,
  Credentials | HttpClient.HttpClient,
  NetworkConnectorVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<ListNetworkConnectorVersionsRequest>,
  output: __S(7, __c1, 3) as any as S.Schema<ListNetworkConnectorVersionsResponse>,
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
})) as any;

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
  UpdateNetworkConnectorRequest,
  UpdateNetworkConnectorResponse,
  UpdateNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<UpdateNetworkConnectorRequest>,
  output: __S(9, __c2, 1) as any as S.Schema<UpdateNetworkConnectorResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
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
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NetworkConnectors: __S(2, __c0, 2), NextMarker: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkConnectorsResponse" });
  }
}
function __c1(j: number): any {
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
      return S.Array(__S(5, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NetworkConnectorVersions: __S(6, __c1, 2), NextMarker: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkConnectorVersionsResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Configuration: S.optional(__S(23, __c5, 3)),
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
          Configuration: S.optional(__S(23, __c5, 3)),
          State: S.optional(S.String),
          LastUpdateStatus: S.optional(S.String),
          LastUpdateStatusReason: S.optional(S.String),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "UpdateNetworkConnectorResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Configuration: __S(23, __c5, 3),
          OperatorRole: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(12, __c3, 0)),
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
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Id: S.String,
          VersionArn: S.optional(S.String),
          Version: S.optional(S.Number),
          Configuration: S.optional(__S(23, __c5, 3)),
          OperatorRole: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateNetworkConnectorResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__S(20, __c5, 0)),
          SecurityGroupIds: S.optional(__S(20, __c5, 0)),
          NetworkProtocol: S.optional(S.String),
          AssociatedComputeResourceTypes: S.optional(__S(21, __c5, 1)),
        }),
      ).annotate({ identifier: "NetworkConnectorVpcEgressConfiguration" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ VpcEgressConfiguration: __S(22, __c5, 2) })]);
  }
}
function __c6(j: number): any {
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
function __c7(j: number): any {
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
          Configuration: S.optional(__S(23, __c5, 3)),
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
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
