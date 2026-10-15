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
  sdkId: "EC2 Instance Connect",
  serviceShapeName: "AWSEC2InstanceConnectService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ec2-instance-connect" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-04-02");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://ec2-instance-connect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ec2-instance-connect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ec2-instance-connect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://ec2-instance-connect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ec2-instance-connect.{R}.{D}","properties":{},"headers":{}}');

export class AuthException
  extends /*@__PURE__*/ S.TaggedError<AuthException>()(
    "AuthException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "Forbidden", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class EC2InstanceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EC2InstanceNotFoundException>()(
    "EC2InstanceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "EC2InstanceNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class EC2InstanceStateInvalidException
  extends /*@__PURE__*/ S.TaggedError<EC2InstanceStateInvalidException>()(
    "EC2InstanceStateInvalidException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "EC2InstanceStateInvalid", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EC2InstanceTypeInvalidException
  extends /*@__PURE__*/ S.TaggedError<EC2InstanceTypeInvalidException>()(
    "EC2InstanceTypeInvalidException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "EC2InstanceTypeInvalid", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EC2InstanceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<EC2InstanceUnavailableException>()(
    "EC2InstanceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "EC2InstanceUnavailable", httpResponseCode: 503 }),
      /*@__PURE__*/ T.HttpError(503),
    ),
  ).pipe(C.withServerError) {}
export class InvalidArgsException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgsException>()(
    "InvalidArgsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidArguments", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SerialConsoleAccessDisabledException
  extends /*@__PURE__*/ S.TaggedError<SerialConsoleAccessDisabledException>()(
    "SerialConsoleAccessDisabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SerialConsoleAccessDisabled", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class SerialConsoleSessionLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<SerialConsoleSessionLimitExceededException>()(
    "SerialConsoleSessionLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SerialConsoleSessionLimitExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SerialConsoleSessionUnavailableException
  extends /*@__PURE__*/ S.TaggedError<SerialConsoleSessionUnavailableException>()(
    "SerialConsoleSessionUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SerialConsoleSessionUnavailable",
        httpResponseCode: 500,
      }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class SerialConsoleSessionUnsupportedException
  extends /*@__PURE__*/ S.TaggedError<SerialConsoleSessionUnsupportedException>()(
    "SerialConsoleSessionUnsupportedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SerialConsoleSessionUnsupported",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InternalServerError", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TooManyRequests", httpResponseCode: 429 }),
      /*@__PURE__*/ T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export type InstanceId = string;
export type SerialPort = number;
export type SSHPublicKey = string;
export interface SendSerialConsoleSSHPublicKeyRequest {
  InstanceId: string;
  SerialPort?: number;
  SSHPublicKey: string;
}
export type RequestId = string;
export type Success = boolean;
export interface SendSerialConsoleSSHPublicKeyResponse {
  RequestId?: string;
  Success?: boolean;
}
export type InstanceOSUser = string;
export type AvailabilityZone = string;
export interface SendSSHPublicKeyRequest {
  InstanceId: string;
  InstanceOSUser: string;
  SSHPublicKey: string;
  AvailabilityZone?: string;
}
export interface SendSSHPublicKeyResponse {
  RequestId?: string;
  Success?: boolean;
}
export type SendSerialConsoleSSHPublicKeyError =
  | AuthException
  | EC2InstanceNotFoundException
  | EC2InstanceStateInvalidException
  | EC2InstanceTypeInvalidException
  | EC2InstanceUnavailableException
  | InvalidArgsException
  | SerialConsoleAccessDisabledException
  | SerialConsoleSessionLimitExceededException
  | SerialConsoleSessionUnavailableException
  | SerialConsoleSessionUnsupportedException
  | ServiceException
  | ThrottlingException
  | CommonErrors;
/**
 * Pushes an SSH public key to the specified EC2 instance. The key remains for 60
 * seconds, which gives you 60 seconds to establish a serial console connection to the
 * instance using SSH. For more information, see EC2 Serial Console in
 * the *Amazon EC2 User Guide*.
 */
export const sendSerialConsoleSSHPublicKey: API.OperationMethod<
  SendSerialConsoleSSHPublicKeyRequest,
  SendSerialConsoleSSHPublicKeyResponse,
  SendSerialConsoleSSHPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<SendSerialConsoleSSHPublicKeyRequest>,
  output: __S(2, __c1, 0) as any as S.Schema<SendSerialConsoleSSHPublicKeyResponse>,
  errors: [
    AuthException,
    EC2InstanceNotFoundException,
    EC2InstanceStateInvalidException,
    EC2InstanceTypeInvalidException,
    EC2InstanceUnavailableException,
    InvalidArgsException,
    SerialConsoleAccessDisabledException,
    SerialConsoleSessionLimitExceededException,
    SerialConsoleSessionUnavailableException,
    SerialConsoleSessionUnsupportedException,
    ServiceException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendSerialConsoleSSHPublicKey",
}));

export type SendSSHPublicKeyError =
  | AuthException
  | EC2InstanceNotFoundException
  | EC2InstanceStateInvalidException
  | EC2InstanceUnavailableException
  | InvalidArgsException
  | ServiceException
  | ThrottlingException
  | CommonErrors;
/**
 * Pushes an SSH public key to the specified EC2 instance for use by the specified user.
 * The key remains for 60 seconds. For more information, see Connect to
 * your Linux instance using EC2 Instance Connect in the Amazon EC2
 * User Guide.
 */
export const sendSSHPublicKey: API.OperationMethod<
  SendSSHPublicKeyRequest,
  SendSSHPublicKeyResponse,
  SendSSHPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c2, 0) as any as S.Schema<SendSSHPublicKeyRequest>,
  output: __S(2, __c1, 0) as any as S.Schema<SendSSHPublicKeyResponse>,
  errors: [
    AuthException,
    EC2InstanceNotFoundException,
    EC2InstanceStateInvalidException,
    EC2InstanceUnavailableException,
    InvalidArgsException,
    ServiceException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendSSHPublicKey",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String,
          SerialPort: S.optional(S.Number),
          SSHPublicKey: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendSerialConsoleSSHPublicKeyRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RequestId: S.optional(S.String), Success: S.optional(S.Boolean) }),
      ).annotate({ identifier: "SendSerialConsoleSSHPublicKeyResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String,
          InstanceOSUser: S.String,
          SSHPublicKey: S.String,
          AvailabilityZone: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendSSHPublicKeyRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
