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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "S3Outposts", serviceShapeName: "S3Outposts" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "s3-outposts" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-07-25");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://s3-outposts.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://s3-outposts.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://s3-outposts.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class OutpostOfflineException
  extends /*@__PURE__*/ S.TaggedError<OutpostOfflineException>()(
    "OutpostOfflineException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
const Endpoint = /*@__PURE__*/ __L.at(__c3, 3) as any as S.Schema<Endpoint>;
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
  input: __S(8, __c2, 0) as any as S.Schema<CreateEndpointRequest>,
  output: __S(9, __c2, 1) as any as S.Schema<CreateEndpointResult>,
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
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<DeleteEndpointRequest>,
  output: __S(17, __c4, 1) as any as S.Schema<DeleteEndpointResponse>,
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
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<ListEndpointsRequest>,
  output: __S(25, __c6, 1) as any as S.Schema<ListEndpointsResult>,
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
  input: __S(0, __c0, 0) as any as S.Schema<ListOutpostsWithS3Request>,
  output: __S(3, __c0, 3) as any as S.Schema<ListOutpostsWithS3Result>,
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
  input: __S(4, __c1, 0) as any as S.Schema<ListSharedEndpointsRequest>,
  output: __S(25, __c6, 1) as any as S.Schema<ListSharedEndpointsResult>,
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

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/S3Outposts/ListOutpostsWithS3" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOutpostsWithS3Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OutpostArn: S.optional(S.String),
          S3OutpostArn: S.optional(S.String),
          OutpostId: S.optional(S.String),
          OwnerId: S.optional(S.String),
          CapacityInBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Outpost" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Outposts: S.optional(__S(2, __c0, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListOutpostsWithS3Result" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          OutpostId: S.String.pipe(T.HttpQuery("outpostId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/S3Outposts/ListSharedEndpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSharedEndpointsRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OutpostId: S.String,
          SubnetId: S.String,
          SecurityGroupId: S.String,
          AccessType: S.optional(S.String),
          CustomerOwnedIpv4Pool: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/S3Outposts/CreateEndpoint" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ EndpointArn: S.optional(S.String) })).annotate({
        identifier: "CreateEndpointResult",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ NetworkInterfaceId: S.optional(S.String) })).annotate({
        identifier: "NetworkInterface",
      });
    case 1:
      return S.Array(__S(12, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "FailedReason" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          EndpointArn: S.optional(S.String),
          OutpostsId: S.optional(S.String),
          CidrBlock: S.optional(S.String),
          Status: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NetworkInterfaces: S.optional(__S(13, __c3, 1)),
          VpcId: S.optional(S.String),
          SubnetId: S.optional(S.String),
          SecurityGroupId: S.optional(S.String),
          AccessType: S.optional(S.String),
          CustomerOwnedIpv4Pool: S.optional(S.String),
          FailedReason: S.optional(__S(14, __c3, 2)),
        }),
      ).annotate({ identifier: "Endpoint" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EndpointId: S.String.pipe(T.HttpQuery("endpointId")),
          OutpostId: S.String.pipe(T.HttpQuery("outpostId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/S3Outposts/DeleteEndpoint" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteEndpointResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/S3Outposts/ListEndpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEndpointsRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(Endpoint);
    case 1:
      return S.suspend(() =>
        S.Struct({ Endpoints: S.optional(__S(24, __c6, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEndpointsResult" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
