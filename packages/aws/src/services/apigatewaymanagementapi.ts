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
  sdkId: "ApiGatewayManagementApi",
  serviceShapeName: "ApiGatewayManagementApi",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "execute-api" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-11-29");
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
              `https://execute-api-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://execute-api-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://execute-api.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://execute-api.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://execute-api.{R}.{D}","properties":{},"headers":{}}');

export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GoneException
  extends /*@__PURE__*/ S.TaggedError<GoneException>()(
    "GoneException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class PayloadTooLargeException
  extends /*@__PURE__*/ S.TaggedError<PayloadTooLargeException>()(
    "PayloadTooLargeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export interface DeleteConnectionRequest {
  ConnectionId: string;
}
export interface DeleteConnectionResponse {}
export interface GetConnectionRequest {
  ConnectionId: string;
}
export type __timestampIso8601 = Date;
export interface Identity {
  SourceIp?: string;
  UserAgent?: string;
}
export interface GetConnectionResponse {
  ConnectedAt?: Date;
  Identity?: Identity & { SourceIp: string; UserAgent: string };
  LastActiveAt?: Date;
}
export interface PostToConnectionRequest {
  Data?: T.StreamingInputBody;
  ConnectionId: string;
}
export interface PostToConnectionResponse {}
export type DeleteConnectionError =
  | ForbiddenException
  | GoneException
  | LimitExceededException
  | CommonErrors;
/**
 * Delete the connection with the provided id.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteConnectionRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<DeleteConnectionResponse>,
  errors: [ForbiddenException, GoneException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

export type GetConnectionError =
  | ForbiddenException
  | GoneException
  | LimitExceededException
  | CommonErrors;
/**
 * Get information about the connection with the provided id.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<GetConnectionRequest>,
  output: __S(10, __c2, 2) as any as S.Schema<GetConnectionResponse>,
  errors: [ForbiddenException, GoneException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

export type PostToConnectionError =
  | ForbiddenException
  | GoneException
  | LimitExceededException
  | PayloadTooLargeException
  | CommonErrors;
/**
 * Sends the provided data to the specified connection.
 */
export const postToConnection: API.OperationMethod<
  PostToConnectionRequest,
  PostToConnectionResponse,
  PostToConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<PostToConnectionRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<PostToConnectionResponse>,
  errors: [ForbiddenException, GoneException, LimitExceededException, PayloadTooLargeException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostToConnection",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/@connections/{ConnectionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteConnectionResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/@connections/{ConnectionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SourceIp: S.optional(S.String), UserAgent: S.optional(S.String) }).pipe(
          S.encodeKeys({ SourceIp: "sourceIp", UserAgent: "userAgent" }),
        ),
      ).annotate({ identifier: "Identity" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Identity: S.optional(__S(9, __c2, 1)),
          LastActiveAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(
          S.encodeKeys({
            ConnectedAt: "connectedAt",
            Identity: "identity",
            LastActiveAt: "lastActiveAt",
          }),
        ),
      ).annotate({ identifier: "GetConnectionResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Data: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
          ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/@connections/{ConnectionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PostToConnectionRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
