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
  sdkId: "Lambda Core",
  target: "LambdaCoreApiService",
  version: "2026-04-30",
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

export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Type?: string; readonly message?: string }> {}
export class NetworkConnectorLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "NetworkConnectorLimitExceededException",
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
  )<{ readonly Type?: string; readonly message?: string }> {}
export class ServiceException
  extends /*@__PURE__*/ TE.TaggedError("ServiceException", ["ServerError"], {
    status: 500,
  })<{ readonly Type?: string; readonly message?: string }> {}
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
export type NetworkConnectorName = string;
export type NetworkConnectorSubnetId = string;
export type NetworkConnectorSubnetIds = string[];
export type NetworkConnectorSecurityGroupId = string;
export type NetworkConnectorSecurityGroupIds = string[];
export type NetworkProtocol = "IPv4" | "DualStack" | (string & {});
export type ComputeResourceType = "MicroVm" | (string & {});
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
  Configuration?: NetworkConnectorConfiguration;
  OperatorRole?: string;
  State?: NetworkConnectorState;
}
export interface GetNetworkConnectorRequest {
  Identifier: string;
}
export type NetworkConnectorVersion = number;
export type NetworkConnectorStateReasonCode =
  | "DisallowedByVpcEncryptionControl"
  | "Ec2RequestLimitExceeded"
  | "InsufficientRolePermissions"
  | "InternalError"
  | "InvalidSecurityGroup"
  | "InvalidSubnet"
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
  | "SubnetOutOfIPAddresses"
  | (string & {});
export type CoreTimestamp = Date;
export interface GetNetworkConnectorResponse {
  Arn: string;
  Name: string;
  Id: string;
  Version?: number;
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
}
export type NetworkConnectorsList = NetworkConnectorSummary[];
export interface ListNetworkConnectorsResponse {
  NetworkConnectors: NetworkConnectorSummary[];
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
  | CommonErrors;
/**
 * Creates a network connector that enables Lambda compute resources to route outbound traffic through your Amazon VPC. The network connector provisions elastic network interfaces (ENIs) in the subnets you specify, providing a managed network path to private resources such as databases, caches, and internal APIs.
 *
 * This operation is asynchronous. The network connector starts in `PENDING` state while ENIs are provisioned in your VPC (provisioning typically takes up to 10 minutes). Use `GetNetworkConnector` to poll the connector state until it reaches `ACTIVE`. Once active, you can attach the connector to Lambda MicroVMs at run time using the `egressNetworkConnectors` parameter on `RunMicroVm`.
 *
 * This operation is idempotent when you provide a `ClientToken` — if you retry a request that completed successfully using the same client token, the operation returns the existing connector without creating a duplicate.
 */
export const createNetworkConnector: API.OperationMethod<
  CreateNetworkConnectorRequest,
  CreateNetworkConnectorResponse,
  CreateNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2026-04-04/network-connectors",
    input: {
      Name: 0,
      Configuration: i_NetworkConnectorConfiguration,
      OperatorRole: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
    },
    body: true,
  },
  errors: [
    InvalidParameterValueException,
    NetworkConnectorLimitExceededException,
    ResourceConflictException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetworkConnector",
})) as any;

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
 * This operation is idempotent — calling delete on a connector that is already deleting or has been deleted succeeds without error. You can delete connectors in `ACTIVE` or `FAILED` states. Before deleting a connector, ensure that no Lambda MicroVMs are using it, as they will lose VPC egress connectivity immediately.
 */
export const deleteNetworkConnector: API.OperationMethod<
  DeleteNetworkConnectorRequest,
  DeleteNetworkConnectorResponse,
  DeleteNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2026-04-04/network-connectors/{Identifier}",
    input: { Identifier: 0 },
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
  operationName: "DeleteNetworkConnector",
})) as any;

export type GetNetworkConnectorError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the current configuration, state, and metadata of a network connector. The `Identifier` parameter accepts the connector ID, name, or full ARN. Use this operation to poll connector state after creation or update, or to inspect the current VPC configuration and any failure reasons.
 *
 * The response includes the full connector configuration, current state, and — if the connector has been updated — the `LastUpdateStatus` and `LastUpdateStatusReasonCode` fields that indicate whether the most recent update succeeded or failed.
 */
export const getNetworkConnector: API.OperationMethod<
  GetNetworkConnectorRequest,
  GetNetworkConnectorResponse,
  GetNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2026-04-04/network-connectors/{Identifier}",
    input: { Identifier: 0 },
    output: { LastModified: D.ts },
  },
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkConnector",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2026-04-04/network-connectors",
    input: {
      State: D.m({ query: "State" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: { NetworkConnectors: D.list({ LastModified: D.ts }) },
  },
  errors: [
    InvalidParameterValueException,
    ServiceException,
    TooManyRequestsException,
  ],
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

export type UpdateNetworkConnectorError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the VPC configuration or operator role of an existing network connector. You can modify the subnet IDs, security group IDs, network protocol, or operator role. The connector must be in `ACTIVE` state to accept updates.
 *
 * This operation is asynchronous. The connector remains in `ACTIVE` state during the update — existing workloads that reference this connector are not disrupted. Use `GetNetworkConnector` to monitor the `LastUpdateStatus` field, which transitions through `InProgress` to `Successful` or `Failed`. If the update fails, the `LastUpdateStatusReasonCode` field provides a specific error code for troubleshooting. This operation is idempotent when you provide a `ClientToken`.
 */
export const updateNetworkConnector: API.OperationMethod<
  UpdateNetworkConnectorRequest,
  UpdateNetworkConnectorResponse,
  UpdateNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2026-04-04/network-connectors/{Identifier}",
    input: {
      Identifier: 0,
      Configuration: i_NetworkConnectorConfiguration,
      OperatorRole: 0,
      ClientToken: D.m({ idempotency: true }),
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
  operationName: "UpdateNetworkConnector",
})) as any;

const i_NetworkConnectorConfiguration: D.LazyStruct = () => ({
  VpcEgressConfiguration: {
    SubnetIds: 0,
    SecurityGroupIds: 0,
    NetworkProtocol: 0,
    AssociatedComputeResourceTypes: 0,
  },
});
