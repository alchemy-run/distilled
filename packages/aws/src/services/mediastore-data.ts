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
  sdkId: "MediaStore Data",
  target: "MediaStoreObject_20170901",
  version: "2017-09-01",
  sigv4: "mediastore",
  protocol: restJson1Protocol,
  xmlns: "https://object.mediastore.amazonaws.com/doc/2017-09-01",
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
                `https://data.mediastore-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://data.mediastore-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://data.mediastore.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://data.mediastore.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ContainerNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ContainerNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError")<{
    readonly message?: string;
  }> {}
export class ObjectNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ObjectNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class RequestedRangeNotSatisfiableException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestedRangeNotSatisfiableException",
    [],
    { status: 416 },
  )<{ readonly message?: string }> {}
export type PathNaming = string;
export interface DeleteObjectRequest {
  Path: string;
}
export interface DeleteObjectResponse {}
export interface DescribeObjectRequest {
  Path: string;
}
export type ETag = string;
export type ContentType = string;
export type NonNegativeLong = number;
export type StringPrimitive = string;
export interface DescribeObjectResponse {
  ETag?: string;
  ContentType?: string;
  ContentLength?: number;
  CacheControl?: string;
  LastModified?: Date;
}
export type RangePattern = string;
export interface GetObjectRequest {
  Path: string;
  Range?: string;
}
export type ContentRangePattern = string;
export type StatusCode = number;
export interface GetObjectResponse {
  Body?: T.StreamingOutputBody;
  CacheControl?: string;
  ContentRange?: string;
  ContentLength?: number;
  ContentType?: string;
  ETag?: string;
  LastModified?: Date;
  StatusCode: number;
}
export type ListPathNaming = string;
export type ListLimit = number;
export type PaginationToken = string;
export interface ListItemsRequest {
  Path?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ItemName = string;
export type ItemType = "OBJECT" | "FOLDER" | (string & {});
export interface Item {
  Name?: string;
  Type?: ItemType;
  ETag?: string;
  LastModified?: Date;
  ContentType?: string;
  ContentLength?: number;
}
export type ItemList = Item[];
export interface ListItemsResponse {
  Items?: Item[];
  NextToken?: string;
}
export type StorageClass = "TEMPORAL" | (string & {});
export type UploadAvailability = "STANDARD" | "STREAMING" | (string & {});
export interface PutObjectRequest {
  Body: T.StreamingInputBody;
  Path: string;
  ContentType?: string;
  CacheControl?: string;
  StorageClass?: StorageClass;
  UploadAvailability?: UploadAvailability;
}
export type SHA256Hash = string;
export interface PutObjectResponse {
  ContentSHA256?: string;
  ETag?: string;
  StorageClass?: StorageClass;
}
export type ErrorMessage = string;
export type DeleteObjectError =
  | ContainerNotFoundException
  | InternalServerError
  | ObjectNotFoundException
  | CommonErrors;
/**
 * Deletes an object at the specified path.
 */
export const deleteObject: API.OperationMethod<
  DeleteObjectRequest,
  DeleteObjectResponse,
  DeleteObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /{Path+}", input: { Path: 0 } },
  errors: [
    ContainerNotFoundException,
    InternalServerError,
    ObjectNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObject",
})) as any;

export type DescribeObjectError =
  | ContainerNotFoundException
  | InternalServerError
  | ObjectNotFoundException
  | CommonErrors;
/**
 * Gets the headers for an object at the specified path.
 */
export const describeObject: API.OperationMethod<
  DescribeObjectRequest,
  DescribeObjectResponse,
  DescribeObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "HEAD /{Path+}",
    input: { Path: 0 },
    output: {
      ETag: D.m({ header: "ETag" }),
      ContentType: D.m({ header: "Content-Type" }),
      ContentLength: D.m({ header: "Content-Length", shape: D.num }),
      CacheControl: D.m({ header: "Cache-Control" }),
      LastModified: D.m({ header: "Last-Modified", shape: D.ts }),
    },
  },
  errors: [
    ContainerNotFoundException,
    InternalServerError,
    ObjectNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeObject",
})) as any;

export type GetObjectError =
  | ContainerNotFoundException
  | InternalServerError
  | ObjectNotFoundException
  | RequestedRangeNotSatisfiableException
  | CommonErrors;
/**
 * Downloads the object at the specified path. If the object’s upload availability is set to `streaming`, AWS Elemental MediaStore downloads the object even if it’s still uploading the object.
 */
export const getObject: API.OperationMethod<
  GetObjectRequest,
  GetObjectResponse,
  GetObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /{Path+}",
    input: { Path: 0, Range: D.m({ header: "Range" }) },
    output: {
      Body: D.m({ payload: true, shape: D.stream }),
      CacheControl: D.m({ header: "Cache-Control" }),
      ContentRange: D.m({ header: "Content-Range" }),
      ContentLength: D.m({ header: "Content-Length", shape: D.num }),
      ContentType: D.m({ header: "Content-Type" }),
      ETag: D.m({ header: "ETag" }),
      LastModified: D.m({ header: "Last-Modified", shape: D.ts }),
      StatusCode: D.m({ status: true }),
    },
  },
  errors: [
    ContainerNotFoundException,
    InternalServerError,
    ObjectNotFoundException,
    RequestedRangeNotSatisfiableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObject",
})) as any;

export type ListItemsError =
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Provides a list of metadata entries about folders and objects in the specified
 * folder.
 */
export const listItems: API.PaginatedOperationMethod<
  ListItemsRequest,
  ListItemsResponse,
  ListItemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /",
    input: {
      Path: D.m({ query: "Path" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Items: D.list({ LastModified: D.ts }) },
  },
  errors: [ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutObjectError =
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Uploads an object to the specified path. Object sizes are limited to 25 MB for standard upload availability and 10 MB for streaming upload availability.
 */
export const putObject: API.OperationMethod<
  PutObjectRequest,
  PutObjectResponse,
  PutObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /{Path+}",
    input: {
      Body: D.m({ payload: true, shape: D.stream }),
      Path: 0,
      ContentType: D.m({ header: "Content-Type" }),
      CacheControl: D.m({ header: "Cache-Control" }),
      StorageClass: D.m({ header: "x-amz-storage-class" }),
      UploadAvailability: D.m({ header: "x-amz-upload-availability" }),
    },
  },
  errors: [ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutObject",
})) as any;
