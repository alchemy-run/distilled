import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "EC2 Instance Connect",
  target: "AWSEC2InstanceConnectService",
  version: "2018-04-02",
  sigv4: "ec2-instance-connect",
  protocol: awsJson1_1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ec2-instance-connect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ec2-instance-connect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AuthException
  extends /*@__PURE__*/ TE.TaggedError("AuthException", ["AuthError"], {
    code: "Forbidden",
    status: 403,
  })<{ readonly message?: string }> {}
export class EC2InstanceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "EC2InstanceNotFoundException",
    ["BadRequestError"],
    { code: "EC2InstanceNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class EC2InstanceStateInvalidException
  extends /*@__PURE__*/ TE.TaggedError(
    "EC2InstanceStateInvalidException",
    ["BadRequestError"],
    { code: "EC2InstanceStateInvalid", status: 400 },
  )<{ readonly message?: string }> {}
export class EC2InstanceTypeInvalidException
  extends /*@__PURE__*/ TE.TaggedError(
    "EC2InstanceTypeInvalidException",
    ["BadRequestError"],
    { code: "EC2InstanceTypeInvalid", status: 400 },
  )<{ readonly message?: string }> {}
export class EC2InstanceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "EC2InstanceUnavailableException",
    ["ServerError"],
    { code: "EC2InstanceUnavailable", status: 503 },
  )<{ readonly message?: string }> {}
export class InvalidArgsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidArgsException",
    ["BadRequestError"],
    { code: "InvalidArguments", status: 400 },
  )<{ readonly message?: string }> {}
export class SerialConsoleAccessDisabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "SerialConsoleAccessDisabledException",
    ["AuthError"],
    { code: "SerialConsoleAccessDisabled", status: 403 },
  )<{ readonly message?: string }> {}
export class SerialConsoleSessionLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "SerialConsoleSessionLimitExceededException",
    ["BadRequestError"],
    { code: "SerialConsoleSessionLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class SerialConsoleSessionUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "SerialConsoleSessionUnavailableException",
    ["ServerError"],
    { code: "SerialConsoleSessionUnavailable", status: 500 },
  )<{ readonly message?: string }> {}
export class SerialConsoleSessionUnsupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "SerialConsoleSessionUnsupportedException",
    ["BadRequestError"],
    { code: "SerialConsoleSessionUnsupported", status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceException
  extends /*@__PURE__*/ TE.TaggedError("ServiceException", ["ServerError"], {
    code: "InternalServerError",
    status: 500,
  })<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { code: "TooManyRequests", status: 429 },
  )<{ readonly message?: string }> {}
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
  descriptor: {
    service: svc,
    input: { InstanceId: 0, SerialPort: 0, SSHPublicKey: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      InstanceId: 0,
      InstanceOSUser: 0,
      SSHPublicKey: 0,
      AvailabilityZone: 0,
    },
  },
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
})) as any;
