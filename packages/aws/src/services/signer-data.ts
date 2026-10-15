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
  sdkId: "Signer Data",
  serviceShapeName: "SignerDataPlane",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "signer" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-08-25");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
        return e(`https://data-signer-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
      if (UseDualStack === true) {
        return e(
          `https://data-signer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
      return e(`https://data-signer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
    }
  }
  return err("No matching endpoint rule");
}, '{"url":"https://data-signer.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(1, __c0, 1) as any as S.Schema<GetRevocationStatusRequest>,
  output: __S(2, __c0, 2) as any as S.Schema<GetRevocationStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevocationStatus",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          signatureTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
            T.HttpQuery("signatureTimestamp"),
          ),
          platformId: S.String.pipe(T.HttpQuery("platformId")),
          profileVersionArn: S.String.pipe(T.HttpQuery("profileVersionArn")),
          jobArn: S.String.pipe(T.HttpQuery("jobArn")),
          certificateHashes: __S(0, __c0, 0).pipe(T.HttpQuery("certificateHashes")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/revocations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRevocationStatusRequest" });
    case 2:
      return S.suspend(() => S.Struct({ revokedEntities: S.optional(__S(0, __c0, 0)) })).annotate({
        identifier: "GetRevocationStatusResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
