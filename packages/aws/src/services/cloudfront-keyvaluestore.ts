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
  sdkId: "CloudFront KeyValueStore",
  serviceShapeName: "CloudFrontKeyValueStore",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cloudfront-keyvaluestore" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-07-26");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
      { name: "sigv4a", signingName: "cloudfront-keyvaluestore", signingRegionSet: ["*"] },
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
                            if (partitionResult != null && partitionResult !== false) {
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
                                  return err("Provided endpoint is not a valid URL");
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
  return err("Invalid Configuration: FIPS is not supported with CloudFront-KeyValueStore.");
});

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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(8, __c2, 0) as any as S.Schema<DeleteKeyRequest>,
  output: __S(12, __c3, 0) as any as S.Schema<DeleteKeyResponse>,
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
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<DescribeKeyValueStoreRequest>,
  output: __S(17, __c4, 1) as any as S.Schema<DescribeKeyValueStoreResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKeyValueStore",
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<GetKeyRequest>,
  output: __S(21, __c5, 1) as any as S.Schema<GetKeyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKey",
}));

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
  input: __S(24, __c6, 0) as any as S.Schema<ListKeysRequest>,
  output: __S(25, __c6, 1) as any as S.Schema<ListKeysResponse>,
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
  input: __S(0, __c0, 0) as any as S.Schema<PutKeyRequest>,
  output: __S(12, __c3, 0) as any as S.Schema<PutKeyResponse>,
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
}));

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
  input: __S(6, __c1, 2) as any as S.Schema<UpdateKeysRequest>,
  output: __S(12, __c3, 0) as any as S.Schema<UpdateKeysResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.String.pipe(T.HttpLabel("Key")),
          Value: SensitiveString,
          KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/key-value-stores/{KvsARN}/keys/{Key}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutKeyRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String })).annotate({
        identifier: "DeleteKeyRequestListItem",
      });
    case 1:
      return S.Array(__S(4, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
          Puts: S.optional(__S(29, __c7, 1)),
          Deletes: S.optional(__S(5, __c1, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/key-value-stores/{KvsARN}/keys" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKeysRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/key-value-stores/{KvsARN}/keys/{Key}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKeyRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ItemCount: S.Number,
          TotalSizeInBytes: S.Number,
          ETag: S.String.pipe(T.HttpHeader("ETag")),
        }),
      ).annotate({ identifier: "DeleteKeyResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/key-value-stores/{KvsARN}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeKeyValueStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ItemCount: S.Number,
          TotalSizeInBytes: S.Number,
          KvsARN: S.String,
          Created: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ETag: S.String.pipe(T.HttpHeader("ETag")),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeKeyValueStoreResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")),
          Key: S.String.pipe(T.HttpLabel("Key")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/key-value-stores/{KvsARN}/keys/{Key}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Key: S.String,
          Value: SensitiveString,
          ItemCount: S.Number,
          TotalSizeInBytes: S.Number,
        }),
      ).annotate({ identifier: "GetKeyResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/key-value-stores/{KvsARN}/keys" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKeysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Items: S.optional(__S(29, __c7, 1)) }),
      ).annotate({ identifier: "ListKeysResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: SensitiveString })).annotate({
        identifier: "ListKeysResponseListItem",
      });
    case 1:
      return S.Array(__S(28, __c7, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
