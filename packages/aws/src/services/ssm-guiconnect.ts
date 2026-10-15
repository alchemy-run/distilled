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
  sdkId: "SSM GuiConnect",
  serviceShapeName: "SSMGuiConnect",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ssm-guiconnect" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-05-01");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ssm-guiconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://ssm-guiconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ssm-guiconnect.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteConnectionRecordingPreferencesRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<DeleteConnectionRecordingPreferencesResponse>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<GetConnectionRecordingPreferencesRequest>,
  output: __S(20, __c2, 4) as any as S.Schema<GetConnectionRecordingPreferencesResponse>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<UpdateConnectionRecordingPreferencesRequest>,
  output: __S(20, __c2, 4) as any as S.Schema<UpdateConnectionRecordingPreferencesResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteConnectionRecordingPreferences" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectionRecordingPreferencesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ClientToken: S.optional(S.String) })).annotate({
        identifier: "DeleteConnectionRecordingPreferencesResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetConnectionRecordingPreferences" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectionRecordingPreferencesRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ BucketOwner: S.String, BucketName: S.String })).annotate({
        identifier: "S3Bucket",
      });
    case 1:
      return S.Array(__S(16, __c2, 0));
    case 2:
      return S.suspend(() => S.Struct({ S3Buckets: __S(17, __c2, 1) })).annotate({
        identifier: "RecordingDestinations",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ RecordingDestinations: __S(18, __c2, 2), KMSKeyArn: S.String }),
      ).annotate({ identifier: "ConnectionRecordingPreferences" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String),
          ConnectionRecordingPreferences: S.optional(__S(19, __c2, 3)),
        }),
      ).annotate({ identifier: "GetConnectionRecordingPreferencesResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionRecordingPreferences: __S(19, __c2, 3),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateConnectionRecordingPreferences" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectionRecordingPreferencesRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
