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
  sdkId: "SSM GuiConnect",
  target: "SSMGuiConnect",
  version: "2021-05-01",
  sigv4: "ssm-guiconnect",
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
                `https://ssm-guiconnect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ssm-guiconnect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ssm-guiconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ssm-guiconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type ClientToken = string;
export interface DeleteConnectionRecordingPreferencesRequest {
  ClientToken?: string;
}
export interface DeleteConnectionRecordingPreferencesResponse {
  ClientToken?: string;
}
export interface GetConnectionRecordingPreferencesRequest {}
export type AccountId = string;
export type BucketName = string;
export interface S3Bucket {
  BucketOwner: string;
  BucketName: string;
}
export type S3Buckets = S3Bucket[];
export interface RecordingDestinations {
  S3Buckets: S3Bucket[];
}
export interface ConnectionRecordingPreferences {
  RecordingDestinations: RecordingDestinations;
  KMSKeyArn: string;
}
export interface GetConnectionRecordingPreferencesResponse {
  ClientToken?: string;
  ConnectionRecordingPreferences?: ConnectionRecordingPreferences;
}
export interface UpdateConnectionRecordingPreferencesRequest {
  ConnectionRecordingPreferences: ConnectionRecordingPreferences;
  ClientToken?: string;
}
export interface UpdateConnectionRecordingPreferencesResponse {
  ClientToken?: string;
  ConnectionRecordingPreferences?: ConnectionRecordingPreferences;
}
export type ErrorMessage = string;
export type DeleteConnectionRecordingPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the preferences for recording RDP connections.
 */
export const deleteConnectionRecordingPreferences: API.OperationMethod<
  DeleteConnectionRecordingPreferencesRequest,
  DeleteConnectionRecordingPreferencesResponse,
  DeleteConnectionRecordingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteConnectionRecordingPreferences",
    input: { ClientToken: D.m({ idempotency: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectionRecordingPreferences",
})) as any;

export type GetConnectionRecordingPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the preferences specified for recording RDP connections in the requesting Amazon Web Services account and Amazon Web Services Region.
 */
export const getConnectionRecordingPreferences: API.OperationMethod<
  GetConnectionRecordingPreferencesRequest,
  GetConnectionRecordingPreferencesResponse,
  GetConnectionRecordingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /GetConnectionRecordingPreferences" },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionRecordingPreferences",
})) as any;

export type UpdateConnectionRecordingPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the preferences for recording RDP connections.
 */
export const updateConnectionRecordingPreferences: API.OperationMethod<
  UpdateConnectionRecordingPreferencesRequest,
  UpdateConnectionRecordingPreferencesResponse,
  UpdateConnectionRecordingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateConnectionRecordingPreferences",
    input: {
      ConnectionRecordingPreferences: {
        RecordingDestinations: {
          S3Buckets: D.list({ BucketOwner: 0, BucketName: 0 }),
        },
        KMSKeyArn: 0,
      },
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectionRecordingPreferences",
})) as any;
