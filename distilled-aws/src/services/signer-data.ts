import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Signer Data",
  serviceShapeName: "SignerDataPlane",
});
const auth = T.AwsAuthSigv4({ name: "signer" });
const ver = T.ServiceVersion("2017-08-25");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { Region, UseFIPS = false, UseDualStack = false, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    return e(Endpoint);
  }
  {
    const PartitionResult = _.partition(Region);
    if (PartitionResult != null && PartitionResult !== false) {
      if (UseFIPS === true && UseDualStack === true) {
        return e(
          `https://data-signer-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
      if (UseFIPS === true) {
        return e(
          `https://data-signer-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
      if (UseDualStack === true) {
        return e(
          `https://data-signer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
      return e(
        `https://data-signer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
      );
    }
  }
  return err("No matching endpoint rule");
});

//# Newtypes
export type PlatformId = string;
export type Arn = string;
export type CertificateHash = string;
export type RevokedEntity = string;

//# Schemas
export type CertificateHashes = string[];
export const CertificateHashes = S.Array(S.String);
export interface GetRevocationStatusRequest {
  signatureTimestamp: Date;
  platformId: string;
  profileVersionArn: string;
  jobArn: string;
  certificateHashes: string[];
}
export const GetRevocationStatusRequest = S.suspend(() =>
  S.Struct({
    signatureTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("signatureTimestamp"),
    ),
    platformId: S.String.pipe(T.HttpQuery("platformId")),
    profileVersionArn: S.String.pipe(T.HttpQuery("profileVersionArn")),
    jobArn: S.String.pipe(T.HttpQuery("jobArn")),
    certificateHashes: CertificateHashes.pipe(T.HttpQuery("certificateHashes")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/revocations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRevocationStatusRequest",
}) as any as S.Schema<GetRevocationStatusRequest>;
export type RevokedEntities = string[];
export const RevokedEntities = S.Array(S.String);
export interface GetRevocationStatusResponse {
  revokedEntities?: string[];
}
export const GetRevocationStatusResponse = S.suspend(() =>
  S.Struct({ revokedEntities: S.optional(RevokedEntities) }),
).annotate({
  identifier: "GetRevocationStatusResponse",
}) as any as S.Schema<GetRevocationStatusResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.optional(S.String), code: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class InternalServiceErrorException extends S.TaggedErrorClass<InternalServiceErrorException>()(
  "InternalServiceErrorException",
  { message: S.optional(S.String), code: S.optional(S.String) },
).pipe(C.withServerError) {}
export class TooManyRequestsException extends S.TaggedErrorClass<TooManyRequestsException>()(
  "TooManyRequestsException",
  { message: S.optional(S.String), code: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String), code: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
export type GetRevocationStatusError =
  | AccessDeniedException
  | InternalServiceErrorException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the revocation status for a signed artifact by checking if the signing profile, job, or certificate has been revoked.
 */
export const getRevocationStatus: API.OperationMethod<
  GetRevocationStatusRequest,
  GetRevocationStatusResponse,
  GetRevocationStatusError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRevocationStatusRequest,
  output: GetRevocationStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    TooManyRequestsException,
    ValidationException,
  ],
}));
