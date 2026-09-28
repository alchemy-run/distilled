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
  sdkId: "S3Outposts",
  target: "S3Outposts",
  version: "2017-07-25",
  sigv4: "s3-outposts",
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
                `https://s3-outposts-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://s3-outposts-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://s3-outposts.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://s3-outposts.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class OutpostOfflineException
  extends /*@__PURE__*/ TE.TaggedError(
    "OutpostOfflineException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type OutpostId = string;
export type SubnetId = string;
export type SecurityGroupId = string;
export type EndpointAccessType = "Private" | "CustomerOwnedIp" | (string & {});
export type CustomerOwnedIpv4Pool = string;
export interface CreateEndpointRequest {
  OutpostId: string;
  SubnetId: string;
  SecurityGroupId: string;
  AccessType?: EndpointAccessType;
  CustomerOwnedIpv4Pool?: string;
}
export type EndpointArn = string;
export interface CreateEndpointResult {
  EndpointArn?: string;
}
export type EndpointId = string;
export interface DeleteEndpointRequest {
  EndpointId: string;
  OutpostId: string;
}
export interface DeleteEndpointResponse {}
export type NextToken = string;
export type MaxResults = number;
export interface ListEndpointsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type CidrBlock = string;
export type EndpointStatus =
  | "Pending"
  | "Available"
  | "Deleting"
  | "Create_Failed"
  | "Delete_Failed"
  | (string & {});
export type CreationTime = Date;
export type NetworkInterfaceId = string;
export interface NetworkInterface {
  NetworkInterfaceId?: string;
}
export type NetworkInterfaces = NetworkInterface[];
export type VpcId = string;
export type ErrorCode = string;
export type Message = string;
export interface FailedReason {
  ErrorCode?: string;
  Message?: string;
}
export interface Endpoint {
  EndpointArn?: string;
  OutpostsId?: string;
  CidrBlock?: string;
  Status?: EndpointStatus;
  CreationTime?: Date;
  NetworkInterfaces?: NetworkInterface[];
  VpcId?: string;
  SubnetId?: string;
  SecurityGroupId?: string;
  AccessType?: EndpointAccessType;
  CustomerOwnedIpv4Pool?: string;
  FailedReason?: FailedReason;
}
export type Endpoints = Endpoint[];
export interface ListEndpointsResult {
  Endpoints?: Endpoint[];
  NextToken?: string;
}
export interface ListOutpostsWithS3Request {
  NextToken?: string;
  MaxResults?: number;
}
export type OutpostArn = string;
export type S3OutpostArn = string;
export type AwsAccountId = string;
export type CapacityInBytes = number;
export interface Outpost {
  OutpostArn?: string;
  S3OutpostArn?: string;
  OutpostId?: string;
  OwnerId?: string;
  CapacityInBytes?: number;
}
export type Outposts = Outpost[];
export interface ListOutpostsWithS3Result {
  Outposts?: Outpost[];
  NextToken?: string;
}
export interface ListSharedEndpointsRequest {
  NextToken?: string;
  MaxResults?: number;
  OutpostId: string;
}
export interface ListSharedEndpointsResult {
  Endpoints?: Endpoint[];
  NextToken?: string;
}
export type ErrorMessage = string;
export type CreateEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OutpostOfflineException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an endpoint and associates it with the specified Outpost.
 *
 * It can take up to 5 minutes for this action to finish.
 *
 * Related actions include:
 *
 * - DeleteEndpoint
 *
 * - ListEndpoints
 */
export const createEndpoint: API.OperationMethod<
  CreateEndpointRequest,
  CreateEndpointResult,
  CreateEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /S3Outposts/CreateEndpoint",
    input: {
      OutpostId: 0,
      SubnetId: 0,
      SecurityGroupId: 0,
      AccessType: 0,
      CustomerOwnedIpv4Pool: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OutpostOfflineException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpoint",
})) as any;

export type DeleteEndpointError =
  | AccessDeniedException
  | InternalServerException
  | OutpostOfflineException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an endpoint.
 *
 * It can take up to 5 minutes for this action to finish.
 *
 * Related actions include:
 *
 * - CreateEndpoint
 *
 * - ListEndpoints
 */
export const deleteEndpoint: API.OperationMethod<
  DeleteEndpointRequest,
  DeleteEndpointResponse,
  DeleteEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /S3Outposts/DeleteEndpoint",
    input: {
      EndpointId: D.m({ query: "endpointId" }),
      OutpostId: D.m({ query: "outpostId" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OutpostOfflineException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpoint",
})) as any;

export type ListEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists endpoints associated with the specified Outpost.
 *
 * Related actions include:
 *
 * - CreateEndpoint
 *
 * - DeleteEndpoint
 */
export const listEndpoints: API.PaginatedOperationMethod<
  ListEndpointsRequest,
  ListEndpointsResult,
  ListEndpointsError,
  Credentials | HttpClient.HttpClient,
  Endpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /S3Outposts/ListEndpoints",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { Endpoints: D.list(o_Endpoint) },
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
  operationName: "ListEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Endpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOutpostsWithS3Error =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Outposts with S3 on Outposts capacity for your Amazon Web Services account.
 * Includes S3 on Outposts that you have access to as the Outposts owner, or as a shared user
 * from Resource Access Manager (RAM).
 */
export const listOutpostsWithS3: API.PaginatedOperationMethod<
  ListOutpostsWithS3Request,
  ListOutpostsWithS3Result,
  ListOutpostsWithS3Error,
  Credentials | HttpClient.HttpClient,
  Outpost
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /S3Outposts/ListOutpostsWithS3",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOutpostsWithS3",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Outposts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSharedEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all endpoints associated with an Outpost that has been shared by Amazon Web Services Resource Access Manager (RAM).
 *
 * Related actions include:
 *
 * - CreateEndpoint
 *
 * - DeleteEndpoint
 */
export const listSharedEndpoints: API.PaginatedOperationMethod<
  ListSharedEndpointsRequest,
  ListSharedEndpointsResult,
  ListSharedEndpointsError,
  Credentials | HttpClient.HttpClient,
  Endpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /S3Outposts/ListSharedEndpoints",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      OutpostId: D.m({ query: "outpostId" }),
    },
    output: { Endpoints: D.list(o_Endpoint) },
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
  operationName: "ListSharedEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Endpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

const o_Endpoint: D.LazyStruct = () => ({ CreationTime: D.ts });
