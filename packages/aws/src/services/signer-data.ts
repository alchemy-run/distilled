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
  sdkId: "Signer Data",
  target: "SignerDataPlane",
  version: "2017-08-25",
  sigv4: "signer",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string; readonly code?: string }> {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string; readonly code?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string; readonly code?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly code?: string }> {}
export type PlatformId = string;
export type Arn = string;
export type CertificateHash = string;
export type CertificateHashes = string[];
export interface GetRevocationStatusRequest {
  signatureTimestamp: Date;
  platformId: string;
  profileVersionArn: string;
  jobArn: string;
  certificateHashes: string[];
}
export type RevokedEntity = string;
export type RevokedEntities = string[];
export interface GetRevocationStatusResponse {
  revokedEntities?: string[];
}
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /revocations",
    input: {
      signatureTimestamp: D.m({
        query: "signatureTimestamp",
        shape: D.tsAs("epoch-seconds"),
      }),
      platformId: D.m({ query: "platformId" }),
      profileVersionArn: D.m({ query: "profileVersionArn" }),
      jobArn: D.m({ query: "jobArn" }),
      certificateHashes: D.m({ query: "certificateHashes" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevocationStatus",
})) as any;
