import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "EKS Auth",
  serviceShapeName: "EKSAuthFrontend",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "eks-auth" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-11-26");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
              return err("FIPS is enabled but this partition does not support FIPS");
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          return e(`https://eks-auth.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://eks-auth.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export class ExpiredTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredTokenException>()(
    "ExpiredTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidTokenException>()(
    "InvalidTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
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
  input: __S(0, __c0, 0) as any as S.Schema<AssumeRoleForPodIdentityRequest>,
  output: __S(5, __c0, 5) as any as S.Schema<AssumeRoleForPodIdentityResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          token: SensitiveString,
          eksNodeName: S.optional(S.String),
          instanceId: S.optional(S.String),
          zone: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clusters/{clusterName}/assume-role-for-pod-identity" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssumeRoleForPodIdentityRequest" });
    case 1:
      return S.suspend(() => S.Struct({ namespace: S.String, serviceAccount: S.String })).annotate({
        identifier: "Subject",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ associationArn: S.String, associationId: S.String }),
      ).annotate({ identifier: "PodIdentityAssociation" });
    case 3:
      return S.suspend(() => S.Struct({ arn: S.String, assumeRoleId: S.String })).annotate({
        identifier: "AssumedRoleUser",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          sessionToken: SensitiveString,
          secretAccessKey: SensitiveString,
          accessKeyId: S.String,
          expiration: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Credentials" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          subject: __S(1, __c0, 1),
          audience: S.String,
          podIdentityAssociation: __S(2, __c0, 2),
          assumedRoleUser: __S(3, __c0, 3),
          credentials: __S(4, __c0, 4),
        }),
      ).annotate({ identifier: "AssumeRoleForPodIdentityResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
