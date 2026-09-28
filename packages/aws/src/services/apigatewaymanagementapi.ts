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
  sdkId: "ApiGatewayManagementApi",
  target: "ApiGatewayManagementApi",
  version: "2018-11-29",
  sigv4: "execute-api",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://execute-api.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://execute-api.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class GoneException
  extends /*@__PURE__*/ TE.TaggedError("GoneException", ["BadRequestError"], {
    status: 410,
  })<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class PayloadTooLargeException
  extends /*@__PURE__*/ TE.TaggedError(
    "PayloadTooLargeException",
    ["BadRequestError"],
    { status: 413, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
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
  descriptor: {
    service: svc,
    http: "DELETE /@connections/{ConnectionId}",
    input: { ConnectionId: 0 },
  },
  errors: [ForbiddenException, GoneException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /@connections/{ConnectionId}",
    input: { ConnectionId: 0 },
    output: {
      ConnectedAt: D.m({ wire: "connectedAt", shape: D.ts }),
      Identity: D.m({
        wire: "identity",
        shape: {
          SourceIp: D.m({ wire: "sourceIp" }),
          UserAgent: D.m({ wire: "userAgent" }),
        },
      }),
      LastActiveAt: D.m({ wire: "lastActiveAt", shape: D.ts }),
    },
  },
  errors: [ForbiddenException, GoneException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /@connections/{ConnectionId}",
    input: { Data: D.m({ payload: true, shape: D.stream }), ConnectionId: 0 },
  },
  errors: [
    ForbiddenException,
    GoneException,
    LimitExceededException,
    PayloadTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostToConnection",
})) as any;
