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
  sdkId: "CloudFront KeyValueStore",
  target: "CloudFrontKeyValueStore",
  version: "2022-07-26",
  sigv4: "cloudfront-keyvaluestore",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { KvsARN, Region, UseFIPS = false, Endpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({
      authSchemes: [
        {
          name: "sigv4a",
          signingName: "cloudfront-keyvaluestore",
          signingRegionSet: ["*"],
        },
      ],
    });
    if (UseFIPS === false) {
      if (KvsARN != null) {
        {
          const parsedArn = _.parseArn(KvsARN);
          if (parsedArn != null && parsedArn !== false) {
            if (_.getAttr(parsedArn, "service") === "cloudfront") {
              if (_.getAttr(parsedArn, "region") === "") {
                {
                  const arnType = _.getAttr(parsedArn, "resourceId[0]");
                  if (arnType != null && arnType !== false) {
                    if (!(arnType === "")) {
                      if (arnType === "key-value-store") {
                        if (_.getAttr(parsedArn, "partition") === "aws") {
                          if (Region != null) {
                            {
                              const partitionResult = _.partition(Region);
                              if (
                                partitionResult != null &&
                                partitionResult !== false
                              ) {
                                if (
                                  _.getAttr(partitionResult, "name") ===
                                  `${_.getAttr(parsedArn, "partition")}`
                                ) {
                                  if (Endpoint != null) {
                                    {
                                      const url = _.parseURL(Endpoint);
                                      if (url != null && url !== false) {
                                        return e(
                                          `${_.getAttr(url, "scheme")}://${_.getAttr(parsedArn, "accountId")}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                                          _p0(),
                                          {},
                                        );
                                      }
                                    }
                                    return err(
                                      "Provided endpoint is not a valid URL",
                                    );
                                  }
                                  return e(
                                    `https://${_.getAttr(parsedArn, "accountId")}.cloudfront-kvs.global.api.aws`,
                                    _p0(),
                                    {},
                                  );
                                }
                                return err(
                                  `Client was configured for partition \`${_.getAttr(partitionResult, "name")}\` but Kvs ARN has \`${_.getAttr(parsedArn, "partition")}\``,
                                );
                              }
                            }
                          }
                          if (Endpoint != null) {
                            {
                              const url = _.parseURL(Endpoint);
                              if (url != null && url !== false) {
                                return e(
                                  `${_.getAttr(url, "scheme")}://${_.getAttr(parsedArn, "accountId")}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                                  _p0(),
                                  {},
                                );
                              }
                            }
                            return err("Provided endpoint is not a valid URL");
                          }
                          return e(
                            `https://${_.getAttr(parsedArn, "accountId")}.cloudfront-kvs.global.api.aws`,
                            _p0(),
                            {},
                          );
                        }
                        return err(
                          `CloudFront-KeyValueStore is not supported in partition \`${_.getAttr(parsedArn, "partition")}\``,
                        );
                      }
                      return err(
                        `ARN resource type is invalid. Expected \`key-value-store\`, found: \`${arnType}\``,
                      );
                    }
                    return err(
                      "No resource type found in the KVS ARN. Resource type must be `key-value-store`.",
                    );
                  }
                }
                return err(
                  "No resource type found in the KVS ARN. Resource type must be `key-value-store`.",
                );
              }
              return err(
                `Provided ARN must be a global resource ARN. Found: \`${_.getAttr(parsedArn, "region")}\``,
              );
            }
            return err(
              `Provided ARN is not a valid CloudFront Service ARN. Found: \`${_.getAttr(parsedArn, "service")}\``,
            );
          }
        }
        return err("KVS ARN must be a valid ARN");
      }
      return err("KVS ARN must be provided to use this service");
    }
    return err(
      "Invalid Configuration: FIPS is not supported with CloudFront-KeyValueStore.",
    );
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type KvsARN = string;
export type Key = string;
export type Etag = string;
export interface DeleteKeyRequest {
  KvsARN: string;
  Key: string;
  IfMatch: string;
}
export interface DeleteKeyResponse {
  ItemCount: number;
  TotalSizeInBytes: number;
  ETag: string;
}
export interface DescribeKeyValueStoreRequest {
  KvsARN: string;
}
export interface DescribeKeyValueStoreResponse {
  ItemCount: number;
  TotalSizeInBytes: number;
  KvsARN: string;
  Created: Date;
  ETag: string;
  LastModified?: Date;
  Status?: string;
  FailureReason?: string;
}
export interface GetKeyRequest {
  KvsARN: string;
  Key: string;
}
export type Value = string | redacted.Redacted<string>;
export interface GetKeyResponse {
  Key: string;
  Value: string | redacted.Redacted<string>;
  ItemCount: number;
  TotalSizeInBytes: number;
}
export interface ListKeysRequest {
  KvsARN: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListKeysResponseListItem {
  Key: string;
  Value: string | redacted.Redacted<string>;
}
export type ListKeysResponseList = ListKeysResponseListItem[];
export interface ListKeysResponse {
  NextToken?: string;
  Items?: ListKeysResponseListItem[];
}
export interface PutKeyRequest {
  Key: string;
  Value: string | redacted.Redacted<string>;
  KvsARN: string;
  IfMatch: string;
}
export interface PutKeyResponse {
  ItemCount: number;
  TotalSizeInBytes: number;
  ETag: string;
}
export interface PutKeyRequestListItem {
  Key: string;
  Value: string | redacted.Redacted<string>;
}
export type PutKeyRequestsList = PutKeyRequestListItem[];
export interface DeleteKeyRequestListItem {
  Key: string;
}
export type DeleteKeyRequestsList = DeleteKeyRequestListItem[];
export interface UpdateKeysRequest {
  KvsARN: string;
  IfMatch: string;
  Puts?: PutKeyRequestListItem[];
  Deletes?: DeleteKeyRequestListItem[];
}
export interface UpdateKeysResponse {
  ItemCount: number;
  TotalSizeInBytes: number;
  ETag: string;
}
export type DeleteKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the key value pair specified by the key.
 */
export const deleteKey: API.OperationMethod<
  DeleteKeyRequest,
  DeleteKeyResponse,
  DeleteKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /key-value-stores/{KvsARN}/keys/{Key}",
    input: {
      KvsARN: D.m({ context: "KvsARN" }),
      Key: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: { ETag: D.m({ header: "ETag" }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKey",
})) as any;

export type DescribeKeyValueStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns metadata information about Key Value Store.
 */
export const describeKeyValueStore: API.OperationMethod<
  DescribeKeyValueStoreRequest,
  DescribeKeyValueStoreResponse,
  DescribeKeyValueStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /key-value-stores/{KvsARN}",
    input: { KvsARN: D.m({ context: "KvsARN" }) },
    output: {
      Created: D.ts,
      ETag: D.m({ header: "ETag" }),
      LastModified: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKeyValueStore",
})) as any;

export type GetKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a key value pair.
 */
export const getKey: API.OperationMethod<
  GetKeyRequest,
  GetKeyResponse,
  GetKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /key-value-stores/{KvsARN}/keys/{Key}",
    input: { KvsARN: D.m({ context: "KvsARN" }), Key: 0 },
    output: { Value: D.secret },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKey",
})) as any;

export type ListKeysError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of key value pairs.
 */
export const listKeys: API.PaginatedOperationMethod<
  ListKeysRequest,
  ListKeysResponse,
  ListKeysError,
  Credentials | HttpClient.HttpClient,
  ListKeysResponseListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /key-value-stores/{KvsARN}/keys",
    input: {
      KvsARN: D.m({ context: "KvsARN" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { Items: D.list({ Value: D.secret }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKeys",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new key value pair or replaces the value of an existing key.
 */
export const putKey: API.OperationMethod<
  PutKeyRequest,
  PutKeyResponse,
  PutKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /key-value-stores/{KvsARN}/keys/{Key}",
    input: {
      Key: 0,
      Value: 0,
      KvsARN: D.m({ context: "KvsARN" }),
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: { ETag: D.m({ header: "ETag" }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutKey",
})) as any;

export type UpdateKeysError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Puts or Deletes multiple key value pairs in a single, all-or-nothing operation.
 */
export const updateKeys: API.OperationMethod<
  UpdateKeysRequest,
  UpdateKeysResponse,
  UpdateKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /key-value-stores/{KvsARN}/keys",
    input: {
      KvsARN: D.m({ context: "KvsARN" }),
      IfMatch: D.m({ header: "If-Match" }),
      Puts: D.list({ Key: 0, Value: 0 }),
      Deletes: D.list({ Key: 0 }),
    },
    output: { ETag: D.m({ header: "ETag" }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKeys",
})) as any;
