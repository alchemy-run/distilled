import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "EKS Auth",
  target: "EKSAuthFrontend",
  version: "2023-11-26",
  sigv4: "eks-auth",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { Region, UseFIPS = false, Endpoint } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if (UseFIPS === true) {
              if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                return e(
                  `https://eks-auth-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              return err(
                "FIPS is enabled but this partition does not support FIPS",
              );
            }
            return e(
              `https://eks-auth.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://eks-auth-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          return e(
            `https://eks-auth.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessDeniedException",
    ["BadRequestError", "AuthError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ExpiredTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "ExpiredTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export type ClusterName = string;
export type JwtToken = string | redacted.Redacted<string>;
export interface AssumeRoleForPodIdentityRequest {
  clusterName: string;
  token: string | redacted.Redacted<string>;
  eksNodeName?: string;
  instanceId?: string;
  zone?: string;
}
export interface Subject {
  namespace: string;
  serviceAccount: string;
}
export interface PodIdentityAssociation {
  associationArn: string;
  associationId: string;
}
export interface AssumedRoleUser {
  arn: string;
  assumeRoleId: string;
}
export interface Credentials {
  sessionToken: string | redacted.Redacted<string>;
  secretAccessKey: string | redacted.Redacted<string>;
  accessKeyId: string;
  expiration: Date;
}
export interface AssumeRoleForPodIdentityResponse {
  subject: Subject;
  audience: string;
  podIdentityAssociation: PodIdentityAssociation;
  assumedRoleUser: AssumedRoleUser;
  credentials: Credentials;
}
export type AssumeRoleForPodIdentityError =
  | AccessDeniedException
  | ExpiredTokenException
  | InternalServerException
  | InvalidParameterException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * The Amazon EKS Auth API and the `AssumeRoleForPodIdentity` action are only used by the EKS Pod Identity Agent.
 *
 * We recommend that applications use the Amazon Web Services SDKs to connect to Amazon Web Services services; if credentials from an EKS Pod Identity association are available in the pod, the latest versions of the SDKs use them automatically.
 */
export const assumeRoleForPodIdentity: API.OperationMethod<
  AssumeRoleForPodIdentityRequest,
  AssumeRoleForPodIdentityResponse,
  AssumeRoleForPodIdentityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clusters/{clusterName}/assume-role-for-pod-identity",
    input: { clusterName: 0, token: 0, eksNodeName: 0, instanceId: 0, zone: 0 },
    output: {
      credentials: {
        sessionToken: D.secret,
        secretAccessKey: D.secret,
        expiration: D.ts,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ExpiredTokenException,
    InternalServerException,
    InvalidParameterException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeRoleForPodIdentity",
})) as any;
