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
const ns = /*@__PURE__*/ T.XmlNamespace("https://route53.amazonaws.com/doc/2013-04-01/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Route 53",
  serviceShapeName: "AWSDnsV20130401",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "route53" });
const ver = /*@__PURE__*/ T.ServiceVersion("2013-04-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestXml();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({ authSchemes: [{ name: "sigv4", signingRegion: "us-east-1" }] });
    const _p1 = () => ({ authSchemes: [{ name: "sigv4", signingRegion: "cn-northwest-1" }] });
    const _p2 = () => ({ authSchemes: [{ name: "sigv4", signingRegion: "us-gov-west-1" }] });
    const _p3 = () => ({ authSchemes: [{ name: "sigv4", signingRegion: "eusc-de-east-1" }] });
    const _p4 = (_0: unknown) => ({
      authSchemes: [{ name: "sigv4", signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}` }],
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://route53.amazonaws.com", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://route53-fips.amazonaws.com", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://route53.global.api.aws", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://route53-fips.global.api.aws", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://route53.amazonaws.com.cn", _p1(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://route53.global.api.amazonwebservices.com.cn", _p1(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://route53.us-gov.amazonaws.com", _p2(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://route53.us-gov.amazonaws.com", _p2(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://route53.us-gov.api.aws", _p2(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://route53.us-gov.api.aws", _p2(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://route53.c2s.ic.gov",
              { authSchemes: [{ name: "sigv4", signingRegion: "us-iso-east-1" }] },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://route53.sc2s.sgov.gov",
              { authSchemes: [{ name: "sigv4", signingRegion: "us-isob-east-1" }] },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://route53.cloud.adc-e.uk",
              { authSchemes: [{ name: "sigv4", signingRegion: "eu-isoe-west-1" }] },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://route53.csp.hci.ic.gov",
              { authSchemes: [{ name: "sigv4", signingRegion: "us-isof-south-1" }] },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://route53.amazonaws.eu", _p3(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://route53.global.api.amazonwebservices.eu", _p3(), {});
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://route53-fips.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p4(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://route53-fips.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p4(PartitionResult),
                {},
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://route53.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p4(PartitionResult),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(
            `https://route53.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p4(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://route53.{D}","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
  [
    "us-gov-west-1",
    "us-gov-east-1",
    "aws-us-gov-global",
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

export class CidrBlockInUseException
  extends /*@__PURE__*/ S.TaggedError<CidrBlockInUseException>()(
    "CidrBlockInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CidrCollectionAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<CidrCollectionAlreadyExistsException>()(
    "CidrCollectionAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class CidrCollectionInUseException
  extends /*@__PURE__*/ S.TaggedError<CidrCollectionInUseException>()(
    "CidrCollectionInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CidrCollectionVersionMismatchException
  extends /*@__PURE__*/ S.TaggedError<CidrCollectionVersionMismatchException>()(
    "CidrCollectionVersionMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConcurrentModification
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModification>()(
    "ConcurrentModification",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictingDomainExists
  extends /*@__PURE__*/ S.TaggedError<ConflictingDomainExists>()("ConflictingDomainExists", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ConflictingTypes
  extends /*@__PURE__*/ S.TaggedError<ConflictingTypes>()(
    "ConflictingTypes",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DelegationSetAlreadyCreated
  extends /*@__PURE__*/ S.TaggedError<DelegationSetAlreadyCreated>()(
    "DelegationSetAlreadyCreated",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DelegationSetAlreadyReusable
  extends /*@__PURE__*/ S.TaggedError<DelegationSetAlreadyReusable>()(
    "DelegationSetAlreadyReusable",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DelegationSetInUse
  extends /*@__PURE__*/ S.TaggedError<DelegationSetInUse>()("DelegationSetInUse", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withDependencyViolationError) {}
export class DelegationSetNotAvailable
  extends /*@__PURE__*/ S.TaggedError<DelegationSetNotAvailable>()("DelegationSetNotAvailable", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class DelegationSetNotReusable
  extends /*@__PURE__*/ S.TaggedError<DelegationSetNotReusable>()("DelegationSetNotReusable", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class DNSSECNotFound
  extends /*@__PURE__*/ S.TaggedError<DNSSECNotFound>()(
    "DNSSECNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class HealthCheckAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<HealthCheckAlreadyExists>()(
    "HealthCheckAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class HealthCheckInUse
  extends /*@__PURE__*/ S.TaggedError<HealthCheckInUse>()(
    "HealthCheckInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class HealthCheckVersionMismatch
  extends /*@__PURE__*/ S.TaggedError<HealthCheckVersionMismatch>()(
    "HealthCheckVersionMismatch",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class HostedZoneAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<HostedZoneAlreadyExists>()(
    "HostedZoneAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class HostedZoneNotEmpty
  extends /*@__PURE__*/ S.TaggedError<HostedZoneNotEmpty>()(
    "HostedZoneNotEmpty",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class HostedZoneNotFound
  extends /*@__PURE__*/ S.TaggedError<HostedZoneNotFound>()("HostedZoneNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class HostedZoneNotPrivate
  extends /*@__PURE__*/ S.TaggedError<HostedZoneNotPrivate>()("HostedZoneNotPrivate", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class HostedZonePartiallyDelegated
  extends /*@__PURE__*/ S.TaggedError<HostedZonePartiallyDelegated>()(
    "HostedZonePartiallyDelegated",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class IncompatibleVersion
  extends /*@__PURE__*/ S.TaggedError<IncompatibleVersion>()(
    "IncompatibleVersion",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InsufficientCloudWatchLogsResourcePolicy
  extends /*@__PURE__*/ S.TaggedError<InsufficientCloudWatchLogsResourcePolicy>()(
    "InsufficientCloudWatchLogsResourcePolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidArgument
  extends /*@__PURE__*/ S.TaggedError<InvalidArgument>()("InvalidArgument", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidChangeBatch
  extends /*@__PURE__*/ S.TaggedError<InvalidChangeBatch>()("InvalidChangeBatch", {
    messages: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(368, __c46, 0)).annotate({ identifier: "ErrorMessages" }),
    ),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidDomainName
  extends /*@__PURE__*/ S.TaggedError<InvalidDomainName>()(
    "InvalidDomainName",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidInput
  extends /*@__PURE__*/ S.TaggedError<InvalidInput>()(
    "InvalidInput",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidKeySigningKeyName
  extends /*@__PURE__*/ S.TaggedError<InvalidKeySigningKeyName>()(
    "InvalidKeySigningKeyName",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidKeySigningKeyStatus
  extends /*@__PURE__*/ S.TaggedError<InvalidKeySigningKeyStatus>()(
    "InvalidKeySigningKeyStatus",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidKMSArn
  extends /*@__PURE__*/ S.TaggedError<InvalidKMSArn>()("InvalidKMSArn", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidPaginationToken
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationToken>()(
    "InvalidPaginationToken",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSigningStatus
  extends /*@__PURE__*/ S.TaggedError<InvalidSigningStatus>()("InvalidSigningStatus", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTrafficPolicyDocument
  extends /*@__PURE__*/ S.TaggedError<InvalidTrafficPolicyDocument>()(
    "InvalidTrafficPolicyDocument",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidVPCId
  extends /*@__PURE__*/ S.TaggedError<InvalidVPCId>()(
    "InvalidVPCId",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class KeySigningKeyAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<KeySigningKeyAlreadyExists>()(
    "KeySigningKeyAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class KeySigningKeyInParentDSRecord
  extends /*@__PURE__*/ S.TaggedError<KeySigningKeyInParentDSRecord>()(
    "KeySigningKeyInParentDSRecord",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class KeySigningKeyInUse
  extends /*@__PURE__*/ S.TaggedError<KeySigningKeyInUse>()("KeySigningKeyInUse", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withDependencyViolationError) {}
export class KeySigningKeyWithActiveStatusNotFound
  extends /*@__PURE__*/ S.TaggedError<KeySigningKeyWithActiveStatusNotFound>()(
    "KeySigningKeyWithActiveStatusNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class LastVPCAssociation
  extends /*@__PURE__*/ S.TaggedError<LastVPCAssociation>()(
    "LastVPCAssociation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitsExceeded
  extends /*@__PURE__*/ S.TaggedError<LimitsExceeded>()("LimitsExceeded", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NoSuchChange
  extends /*@__PURE__*/ S.TaggedError<NoSuchChange>()(
    "NoSuchChange",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchCidrCollectionException
  extends /*@__PURE__*/ S.TaggedError<NoSuchCidrCollectionException>()(
    "NoSuchCidrCollectionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchCidrLocationException
  extends /*@__PURE__*/ S.TaggedError<NoSuchCidrLocationException>()(
    "NoSuchCidrLocationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchCloudWatchLogsLogGroup
  extends /*@__PURE__*/ S.TaggedError<NoSuchCloudWatchLogsLogGroup>()(
    "NoSuchCloudWatchLogsLogGroup",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchDelegationSet
  extends /*@__PURE__*/ S.TaggedError<NoSuchDelegationSet>()("NoSuchDelegationSet", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NoSuchGeoLocation
  extends /*@__PURE__*/ S.TaggedError<NoSuchGeoLocation>()(
    "NoSuchGeoLocation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchHealthCheck
  extends /*@__PURE__*/ S.TaggedError<NoSuchHealthCheck>()(
    "NoSuchHealthCheck",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchHostedZone
  extends /*@__PURE__*/ S.TaggedError<NoSuchHostedZone>()(
    "NoSuchHostedZone",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchKeySigningKey
  extends /*@__PURE__*/ S.TaggedError<NoSuchKeySigningKey>()(
    "NoSuchKeySigningKey",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchQueryLoggingConfig
  extends /*@__PURE__*/ S.TaggedError<NoSuchQueryLoggingConfig>()(
    "NoSuchQueryLoggingConfig",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchTrafficPolicy
  extends /*@__PURE__*/ S.TaggedError<NoSuchTrafficPolicy>()(
    "NoSuchTrafficPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchTrafficPolicyInstance
  extends /*@__PURE__*/ S.TaggedError<NoSuchTrafficPolicyInstance>()(
    "NoSuchTrafficPolicyInstance",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NotAuthorizedException
  extends /*@__PURE__*/ S.TaggedError<NotAuthorizedException>()(
    "NotAuthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class PriorRequestNotComplete
  extends /*@__PURE__*/ S.TaggedError<PriorRequestNotComplete>()(
    "PriorRequestNotComplete",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withConflictError, C.withRetryableError) {}
export class PublicZoneVPCAssociation
  extends /*@__PURE__*/ S.TaggedError<PublicZoneVPCAssociation>()(
    "PublicZoneVPCAssociation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class QueryLoggingConfigAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<QueryLoggingConfigAlreadyExists>()(
    "QueryLoggingConfigAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError, C.withRetryableError) {}
export class TooManyHealthChecks
  extends /*@__PURE__*/ S.TaggedError<TooManyHealthChecks>()("TooManyHealthChecks", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TooManyHostedZones
  extends /*@__PURE__*/ S.TaggedError<TooManyHostedZones>()(
    "TooManyHostedZones",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyKeySigningKeys
  extends /*@__PURE__*/ S.TaggedError<TooManyKeySigningKeys>()("TooManyKeySigningKeys", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TooManyTrafficPolicies
  extends /*@__PURE__*/ S.TaggedError<TooManyTrafficPolicies>()(
    "TooManyTrafficPolicies",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyTrafficPolicyInstances
  extends /*@__PURE__*/ S.TaggedError<TooManyTrafficPolicyInstances>()(
    "TooManyTrafficPolicyInstances",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyTrafficPolicyVersionsForCurrentPolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyTrafficPolicyVersionsForCurrentPolicy>()(
    "TooManyTrafficPolicyVersionsForCurrentPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyVPCAssociationAuthorizations
  extends /*@__PURE__*/ S.TaggedError<TooManyVPCAssociationAuthorizations>()(
    "TooManyVPCAssociationAuthorizations",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TrafficPolicyAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<TrafficPolicyAlreadyExists>()(
    "TrafficPolicyAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class TrafficPolicyInstanceAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<TrafficPolicyInstanceAlreadyExists>()(
    "TrafficPolicyInstanceAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class TrafficPolicyInUse
  extends /*@__PURE__*/ S.TaggedError<TrafficPolicyInUse>()(
    "TrafficPolicyInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class VPCAssociationAuthorizationNotFound
  extends /*@__PURE__*/ S.TaggedError<VPCAssociationAuthorizationNotFound>()(
    "VPCAssociationAuthorizationNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class VPCAssociationNotFound
  extends /*@__PURE__*/ S.TaggedError<VPCAssociationNotFound>()(
    "VPCAssociationNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type ResourceId = string;
export type SigningKeyName = string;
export interface ActivateKeySigningKeyRequest {
  HostedZoneId: string;
  Name: string;
}
export type ChangeStatus = "PENDING" | "INSYNC" | (string & {});
export type ResourceDescription = string;
export interface ChangeInfo {
  Id: string;
  Status: ChangeStatus;
  SubmittedAt: Date;
  Comment?: string;
}
export interface ActivateKeySigningKeyResponse {
  ChangeInfo: ChangeInfo;
}
export type VPCRegion =
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "eu-central-1"
  | "eu-central-2"
  | "ap-east-1"
  | "me-south-1"
  | "us-gov-west-1"
  | "us-gov-east-1"
  | "us-iso-east-1"
  | "us-iso-west-1"
  | "us-isob-east-1"
  | "me-central-1"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-south-1"
  | "ap-south-2"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-northeast-3"
  | "eu-north-1"
  | "sa-east-1"
  | "ca-central-1"
  | "cn-north-1"
  | "cn-northwest-1"
  | "af-south-1"
  | "eu-south-1"
  | "eu-south-2"
  | "ap-southeast-4"
  | "il-central-1"
  | "ca-west-1"
  | "ap-southeast-5"
  | "mx-central-1"
  | "us-isof-south-1"
  | "us-isof-east-1"
  | "ap-southeast-7"
  | "ap-east-2"
  | "eu-isoe-west-1"
  | "ap-southeast-6"
  | "us-isob-west-1"
  | "eusc-de-east-1"
  | (string & {});
export type VPCId = string;
export interface VPC {
  VPCRegion?: VPCRegion;
  VPCId?: string;
}
export type AssociateVPCComment = string;
export interface AssociateVPCWithHostedZoneRequest {
  HostedZoneId: string;
  VPC: VPC;
  Comment?: string;
}
export interface AssociateVPCWithHostedZoneResponse {
  ChangeInfo: ChangeInfo;
}
export type UUID = string;
export type CollectionVersion = number;
export type CidrLocationNameDefaultNotAllowed = string;
export type CidrCollectionChangeAction = "PUT" | "DELETE_IF_EXISTS" | (string & {});
export type Cidr = string;
export type CidrList = string[];
export interface CidrCollectionChange {
  LocationName: string;
  Action: CidrCollectionChangeAction;
  CidrList: string[];
}
export type CidrCollectionChanges = CidrCollectionChange[];
export interface ChangeCidrCollectionRequest {
  Id: string;
  CollectionVersion?: number;
  Changes: CidrCollectionChange[];
}
export type ChangeId = string;
export interface ChangeCidrCollectionResponse {
  Id: string;
}
export type ChangeAction = "CREATE" | "DELETE" | "UPSERT" | (string & {});
export type DNSName = string;
export type RRType =
  | "SOA"
  | "A"
  | "TXT"
  | "NS"
  | "CNAME"
  | "MX"
  | "NAPTR"
  | "PTR"
  | "SRV"
  | "SPF"
  | "AAAA"
  | "CAA"
  | "DS"
  | "TLSA"
  | "SSHFP"
  | "SVCB"
  | "HTTPS"
  | (string & {});
export type ResourceRecordSetIdentifier = string;
export type ResourceRecordSetWeight = number;
export type ResourceRecordSetRegion =
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "ca-central-1"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "eu-central-1"
  | "eu-central-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-northeast-3"
  | "eu-north-1"
  | "sa-east-1"
  | "cn-north-1"
  | "cn-northwest-1"
  | "ap-east-1"
  | "me-south-1"
  | "me-central-1"
  | "ap-south-1"
  | "ap-south-2"
  | "af-south-1"
  | "eu-south-1"
  | "eu-south-2"
  | "ap-southeast-4"
  | "il-central-1"
  | "ca-west-1"
  | "ap-southeast-5"
  | "mx-central-1"
  | "ap-southeast-7"
  | "us-gov-east-1"
  | "us-gov-west-1"
  | "ap-east-2"
  | "ap-southeast-6"
  | "eusc-de-east-1"
  | (string & {});
export type GeoLocationContinentCode = string;
export type GeoLocationCountryCode = string;
export type GeoLocationSubdivisionCode = string;
export interface GeoLocation {
  ContinentCode?: string;
  CountryCode?: string;
  SubdivisionCode?: string;
}
export type ResourceRecordSetFailover = "PRIMARY" | "SECONDARY" | (string & {});
export type ResourceRecordSetMultiValueAnswer = boolean;
export type TTL = number;
export type RData = string;
export interface ResourceRecord {
  Value: string;
}
export type ResourceRecords = ResourceRecord[];
export type AliasHealthEnabled = boolean;
export interface AliasTarget {
  HostedZoneId: string;
  DNSName: string;
  EvaluateTargetHealth: boolean;
}
export type HealthCheckId = string;
export type TrafficPolicyInstanceId = string;
export type CidrLocationNameDefaultAllowed = string;
export interface CidrRoutingConfig {
  CollectionId: string;
  LocationName: string;
}
export type AWSRegion = string;
export type LocalZoneGroup = string;
export type Latitude = string;
export type Longitude = string;
export interface Coordinates {
  Latitude: string;
  Longitude: string;
}
export type Bias = number;
export interface GeoProximityLocation {
  AWSRegion?: string;
  LocalZoneGroup?: string;
  Coordinates?: Coordinates;
  Bias?: number;
}
export interface ResourceRecordSet {
  Name: string;
  Type: RRType;
  SetIdentifier?: string;
  Weight?: number;
  Region?: ResourceRecordSetRegion;
  GeoLocation?: GeoLocation;
  Failover?: ResourceRecordSetFailover;
  MultiValueAnswer?: boolean;
  TTL?: number;
  ResourceRecords?: ResourceRecord[];
  AliasTarget?: AliasTarget;
  HealthCheckId?: string;
  TrafficPolicyInstanceId?: string;
  CidrRoutingConfig?: CidrRoutingConfig;
  GeoProximityLocation?: GeoProximityLocation;
}
export interface Change {
  Action: ChangeAction;
  ResourceRecordSet: ResourceRecordSet;
}
export type Changes = Change[];
export interface ChangeBatch {
  Comment?: string;
  Changes: Change[];
}
export interface ChangeResourceRecordSetsRequest {
  HostedZoneId: string;
  ChangeBatch: ChangeBatch;
}
export interface ChangeResourceRecordSetsResponse {
  ChangeInfo: ChangeInfo;
}
export type TagResourceType = "healthcheck" | "hostedzone" | (string & {});
export type TagResourceId = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export type TagKeyList = string[];
export interface ChangeTagsForResourceRequest {
  ResourceType: TagResourceType;
  ResourceId: string;
  AddTags?: Tag[];
  RemoveTagKeys?: string[];
}
export interface ChangeTagsForResourceResponse {}
export type CollectionName = string;
export type CidrNonce = string;
export interface CreateCidrCollectionRequest {
  Name: string;
  CallerReference: string;
}
export type ARN = string;
export interface CidrCollection {
  Arn?: string;
  Id?: string;
  Name?: string;
  Version?: number;
}
export type ResourceURI = string;
export interface CreateCidrCollectionResponse {
  Collection?: CidrCollection;
  Location?: string;
}
export type HealthCheckNonce = string;
export type IPAddress = string;
export type Port = number;
export type HealthCheckType =
  | "HTTP"
  | "HTTPS"
  | "HTTP_STR_MATCH"
  | "HTTPS_STR_MATCH"
  | "TCP"
  | "CALCULATED"
  | "CLOUDWATCH_METRIC"
  | "RECOVERY_CONTROL"
  | (string & {});
export type ResourcePath = string;
export type FullyQualifiedDomainName = string;
export type SearchString = string;
export type RequestInterval = number;
export type FailureThreshold = number;
export type MeasureLatency = boolean;
export type Inverted = boolean;
export type Disabled = boolean;
export type HealthThreshold = number;
export type ChildHealthCheckList = string[];
export type EnableSNI = boolean;
export type HealthCheckRegion =
  | "us-east-1"
  | "us-west-1"
  | "us-west-2"
  | "eu-west-1"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-northeast-1"
  | "sa-east-1"
  | (string & {});
export type HealthCheckRegionList = HealthCheckRegion[];
export type CloudWatchRegion =
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "ca-central-1"
  | "eu-central-1"
  | "eu-central-2"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "ap-east-1"
  | "me-south-1"
  | "me-central-1"
  | "ap-south-1"
  | "ap-south-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-northeast-3"
  | "eu-north-1"
  | "sa-east-1"
  | "cn-northwest-1"
  | "cn-north-1"
  | "af-south-1"
  | "eu-south-1"
  | "eu-south-2"
  | "us-gov-west-1"
  | "us-gov-east-1"
  | "us-iso-east-1"
  | "us-iso-west-1"
  | "us-isob-east-1"
  | "ap-southeast-4"
  | "il-central-1"
  | "ca-west-1"
  | "ap-southeast-5"
  | "mx-central-1"
  | "us-isof-south-1"
  | "us-isof-east-1"
  | "ap-southeast-7"
  | "ap-east-2"
  | "eu-isoe-west-1"
  | "ap-southeast-6"
  | "us-isob-west-1"
  | "eusc-de-east-1"
  | (string & {});
export type AlarmName = string;
export interface AlarmIdentifier {
  Region: CloudWatchRegion;
  Name: string;
}
export type InsufficientDataHealthStatus =
  | "Healthy"
  | "Unhealthy"
  | "LastKnownStatus"
  | (string & {});
export type RoutingControlArn = string;
export interface HealthCheckConfig {
  IPAddress?: string;
  Port?: number;
  Type: HealthCheckType;
  ResourcePath?: string;
  FullyQualifiedDomainName?: string;
  SearchString?: string;
  RequestInterval?: number;
  FailureThreshold?: number;
  MeasureLatency?: boolean;
  Inverted?: boolean;
  Disabled?: boolean;
  HealthThreshold?: number;
  ChildHealthChecks?: string[];
  EnableSNI?: boolean;
  Regions?: HealthCheckRegion[];
  AlarmIdentifier?: AlarmIdentifier;
  InsufficientDataHealthStatus?: InsufficientDataHealthStatus;
  RoutingControlArn?: string;
}
export interface CreateHealthCheckRequest {
  CallerReference: string;
  HealthCheckConfig: HealthCheckConfig;
}
export type ServicePrincipal = string;
export interface LinkedService {
  ServicePrincipal?: string;
  Description?: string;
}
export type HealthCheckVersion = number;
export type EvaluationPeriods = number;
export type Threshold = number;
export type ComparisonOperator =
  | "GreaterThanOrEqualToThreshold"
  | "GreaterThanThreshold"
  | "LessThanThreshold"
  | "LessThanOrEqualToThreshold"
  | (string & {});
export type Period = number;
export type MetricName = string;
export type Namespace = string;
export type Statistic = "Average" | "Sum" | "SampleCount" | "Maximum" | "Minimum" | (string & {});
export type DimensionField = string;
export interface Dimension {
  Name: string;
  Value: string;
}
export type DimensionList = Dimension[];
export interface CloudWatchAlarmConfiguration {
  EvaluationPeriods: number;
  Threshold: number;
  ComparisonOperator: ComparisonOperator;
  Period: number;
  MetricName: string;
  Namespace: string;
  Statistic: Statistic;
  Dimensions?: Dimension[];
}
export interface HealthCheck {
  Id: string;
  CallerReference: string;
  LinkedService?: LinkedService;
  HealthCheckConfig: HealthCheckConfig;
  HealthCheckVersion: number;
  CloudWatchAlarmConfiguration?: CloudWatchAlarmConfiguration;
}
export interface CreateHealthCheckResponse {
  HealthCheck: HealthCheck;
  Location: string;
}
export type Nonce = string;
export type IsPrivateZone = boolean;
export interface HostedZoneConfig {
  Comment?: string;
  PrivateZone?: boolean;
}
export interface CreateHostedZoneRequest {
  Name: string;
  VPC?: VPC;
  CallerReference: string;
  HostedZoneConfig?: HostedZoneConfig;
  DelegationSetId?: string;
}
export type HostedZoneRRSetCount = number;
export type AcceleratedRecoveryStatus =
  | "ENABLING"
  | "ENABLE_FAILED"
  | "ENABLING_HOSTED_ZONE_LOCKED"
  | "ENABLED"
  | "DISABLING"
  | "DISABLE_FAILED"
  | "DISABLED"
  | "DISABLING_HOSTED_ZONE_LOCKED"
  | (string & {});
export type FailureReason = string;
export interface HostedZoneFailureReasons {
  AcceleratedRecovery?: string;
}
export interface HostedZoneFeatures {
  AcceleratedRecoveryStatus?: AcceleratedRecoveryStatus;
  FailureReasons?: HostedZoneFailureReasons;
}
export interface HostedZone {
  Id: string;
  Name: string;
  CallerReference: string;
  Config?: HostedZoneConfig;
  ResourceRecordSetCount?: number;
  LinkedService?: LinkedService;
  Features?: HostedZoneFeatures;
}
export type DelegationSetNameServers = string[];
export interface DelegationSet {
  Id?: string;
  CallerReference?: string;
  NameServers: string[];
}
export interface CreateHostedZoneResponse {
  HostedZone: HostedZone;
  ChangeInfo: ChangeInfo;
  DelegationSet?: DelegationSet;
  VPC?: VPC;
  Location: string;
}
export type SigningKeyString = string;
export type SigningKeyStatus = string;
export interface CreateKeySigningKeyRequest {
  CallerReference: string;
  HostedZoneId: string;
  KeyManagementServiceArn: string;
  Name: string;
  Status: string;
}
export type SigningKeyInteger = number;
export type SigningKeyTag = number;
export type SigningKeyStatusMessage = string;
export interface KeySigningKey {
  Name?: string;
  KmsArn?: string;
  Flag?: number;
  SigningAlgorithmMnemonic?: string;
  SigningAlgorithmType?: number;
  DigestAlgorithmMnemonic?: string;
  DigestAlgorithmType?: number;
  KeyTag?: number;
  DigestValue?: string;
  PublicKey?: string;
  DSRecord?: string;
  DNSKEYRecord?: string;
  Status?: string;
  StatusMessage?: string;
  CreatedDate?: Date;
  LastModifiedDate?: Date;
}
export interface CreateKeySigningKeyResponse {
  ChangeInfo: ChangeInfo;
  KeySigningKey: KeySigningKey;
  Location: string;
}
export type CloudWatchLogsLogGroupArn = string;
export interface CreateQueryLoggingConfigRequest {
  HostedZoneId: string;
  CloudWatchLogsLogGroupArn: string;
}
export type QueryLoggingConfigId = string;
export interface QueryLoggingConfig {
  Id: string;
  HostedZoneId: string;
  CloudWatchLogsLogGroupArn: string;
}
export interface CreateQueryLoggingConfigResponse {
  QueryLoggingConfig: QueryLoggingConfig;
  Location: string;
}
export interface CreateReusableDelegationSetRequest {
  CallerReference: string;
  HostedZoneId?: string;
}
export interface CreateReusableDelegationSetResponse {
  DelegationSet: DelegationSet;
  Location: string;
}
export type TrafficPolicyName = string;
export type TrafficPolicyDocument = string;
export type TrafficPolicyComment = string;
export interface CreateTrafficPolicyRequest {
  Name: string;
  Document: string;
  Comment?: string;
}
export type TrafficPolicyId = string;
export type TrafficPolicyVersion = number;
export interface TrafficPolicy {
  Id: string;
  Version: number;
  Name: string;
  Type: RRType;
  Document: string;
  Comment?: string;
}
export interface CreateTrafficPolicyResponse {
  TrafficPolicy: TrafficPolicy;
  Location: string;
}
export interface CreateTrafficPolicyInstanceRequest {
  HostedZoneId: string;
  Name: string;
  TTL: number;
  TrafficPolicyId: string;
  TrafficPolicyVersion: number;
}
export type TrafficPolicyInstanceState = string;
export type Message = string;
export interface TrafficPolicyInstance {
  Id: string;
  HostedZoneId: string;
  Name: string;
  TTL: number;
  State: string;
  Message: string;
  TrafficPolicyId: string;
  TrafficPolicyVersion: number;
  TrafficPolicyType: RRType;
}
export interface CreateTrafficPolicyInstanceResponse {
  TrafficPolicyInstance: TrafficPolicyInstance;
  Location: string;
}
export interface CreateTrafficPolicyVersionRequest {
  Id: string;
  Document: string;
  Comment?: string;
}
export interface CreateTrafficPolicyVersionResponse {
  TrafficPolicy: TrafficPolicy;
  Location: string;
}
export interface CreateVPCAssociationAuthorizationRequest {
  HostedZoneId: string;
  VPC: VPC;
}
export interface CreateVPCAssociationAuthorizationResponse {
  HostedZoneId: string;
  VPC: VPC;
}
export interface DeactivateKeySigningKeyRequest {
  HostedZoneId: string;
  Name: string;
}
export interface DeactivateKeySigningKeyResponse {
  ChangeInfo: ChangeInfo;
}
export interface DeleteCidrCollectionRequest {
  Id: string;
}
export interface DeleteCidrCollectionResponse {}
export interface DeleteHealthCheckRequest {
  HealthCheckId: string;
}
export interface DeleteHealthCheckResponse {}
export interface DeleteHostedZoneRequest {
  Id: string;
}
export interface DeleteHostedZoneResponse {
  ChangeInfo: ChangeInfo;
}
export interface DeleteKeySigningKeyRequest {
  HostedZoneId: string;
  Name: string;
}
export interface DeleteKeySigningKeyResponse {
  ChangeInfo: ChangeInfo;
}
export interface DeleteQueryLoggingConfigRequest {
  Id: string;
}
export interface DeleteQueryLoggingConfigResponse {}
export interface DeleteReusableDelegationSetRequest {
  Id: string;
}
export interface DeleteReusableDelegationSetResponse {}
export interface DeleteTrafficPolicyRequest {
  Id: string;
  Version: number;
}
export interface DeleteTrafficPolicyResponse {}
export interface DeleteTrafficPolicyInstanceRequest {
  Id: string;
}
export interface DeleteTrafficPolicyInstanceResponse {}
export interface DeleteVPCAssociationAuthorizationRequest {
  HostedZoneId: string;
  VPC: VPC;
}
export interface DeleteVPCAssociationAuthorizationResponse {}
export interface DisableHostedZoneDNSSECRequest {
  HostedZoneId: string;
}
export interface DisableHostedZoneDNSSECResponse {
  ChangeInfo: ChangeInfo;
}
export type DisassociateVPCComment = string;
export interface DisassociateVPCFromHostedZoneRequest {
  HostedZoneId: string;
  VPC: VPC;
  Comment?: string;
}
export interface DisassociateVPCFromHostedZoneResponse {
  ChangeInfo: ChangeInfo;
}
export interface EnableHostedZoneDNSSECRequest {
  HostedZoneId: string;
}
export interface EnableHostedZoneDNSSECResponse {
  ChangeInfo: ChangeInfo;
}
export type AccountLimitType =
  | "MAX_HEALTH_CHECKS_BY_OWNER"
  | "MAX_HOSTED_ZONES_BY_OWNER"
  | "MAX_TRAFFIC_POLICY_INSTANCES_BY_OWNER"
  | "MAX_REUSABLE_DELEGATION_SETS_BY_OWNER"
  | "MAX_TRAFFIC_POLICIES_BY_OWNER"
  | (string & {});
export interface GetAccountLimitRequest {
  Type: AccountLimitType;
}
export type LimitValue = number;
export interface AccountLimit {
  Type: AccountLimitType;
  Value: number;
}
export type UsageCount = number;
export interface GetAccountLimitResponse {
  Limit: AccountLimit;
  Count: number;
}
export interface GetChangeRequest {
  Id: string;
}
export interface GetChangeResponse {
  ChangeInfo: ChangeInfo;
}
export interface GetCheckerIpRangesRequest {}
export type IPAddressCidr = string;
export type CheckerIpRanges = string[];
export interface GetCheckerIpRangesResponse {
  CheckerIpRanges: string[];
}
export interface GetDNSSECRequest {
  HostedZoneId: string;
}
export type ServeSignature = string;
export interface DNSSECStatus {
  ServeSignature?: string;
  StatusMessage?: string;
}
export type KeySigningKeys = KeySigningKey[];
export interface GetDNSSECResponse {
  Status: DNSSECStatus;
  KeySigningKeys: KeySigningKey[];
}
export interface GetGeoLocationRequest {
  ContinentCode?: string;
  CountryCode?: string;
  SubdivisionCode?: string;
}
export type GeoLocationContinentName = string;
export type GeoLocationCountryName = string;
export type GeoLocationSubdivisionName = string;
export interface GeoLocationDetails {
  ContinentCode?: string;
  ContinentName?: string;
  CountryCode?: string;
  CountryName?: string;
  SubdivisionCode?: string;
  SubdivisionName?: string;
}
export interface GetGeoLocationResponse {
  GeoLocationDetails: GeoLocationDetails;
}
export interface GetHealthCheckRequest {
  HealthCheckId: string;
}
export interface GetHealthCheckResponse {
  HealthCheck: HealthCheck;
}
export interface GetHealthCheckCountRequest {}
export type HealthCheckCount = number;
export interface GetHealthCheckCountResponse {
  HealthCheckCount: number;
}
export interface GetHealthCheckLastFailureReasonRequest {
  HealthCheckId: string;
}
export type Status = string;
export interface StatusReport {
  Status?: string;
  CheckedTime?: Date;
}
export interface HealthCheckObservation {
  Region?: HealthCheckRegion;
  IPAddress?: string;
  StatusReport?: StatusReport;
}
export type HealthCheckObservations = HealthCheckObservation[];
export interface GetHealthCheckLastFailureReasonResponse {
  HealthCheckObservations: HealthCheckObservation[];
}
export interface GetHealthCheckStatusRequest {
  HealthCheckId: string;
}
export interface GetHealthCheckStatusResponse {
  HealthCheckObservations: HealthCheckObservation[];
}
export interface GetHostedZoneRequest {
  Id: string;
}
export type VPCs = VPC[];
export interface GetHostedZoneResponse {
  HostedZone: HostedZone;
  DelegationSet?: DelegationSet;
  VPCs?: VPC[];
}
export interface GetHostedZoneCountRequest {}
export type HostedZoneCount = number;
export interface GetHostedZoneCountResponse {
  HostedZoneCount: number;
}
export type HostedZoneLimitType =
  | "MAX_RRSETS_BY_ZONE"
  | "MAX_VPCS_ASSOCIATED_BY_ZONE"
  | (string & {});
export interface GetHostedZoneLimitRequest {
  Type: HostedZoneLimitType;
  HostedZoneId: string;
}
export interface HostedZoneLimit {
  Type: HostedZoneLimitType;
  Value: number;
}
export interface GetHostedZoneLimitResponse {
  Limit: HostedZoneLimit;
  Count: number;
}
export interface GetQueryLoggingConfigRequest {
  Id: string;
}
export interface GetQueryLoggingConfigResponse {
  QueryLoggingConfig: QueryLoggingConfig;
}
export interface GetReusableDelegationSetRequest {
  Id: string;
}
export interface GetReusableDelegationSetResponse {
  DelegationSet: DelegationSet;
}
export type ReusableDelegationSetLimitType = "MAX_ZONES_BY_REUSABLE_DELEGATION_SET" | (string & {});
export interface GetReusableDelegationSetLimitRequest {
  Type: ReusableDelegationSetLimitType;
  DelegationSetId: string;
}
export interface ReusableDelegationSetLimit {
  Type: ReusableDelegationSetLimitType;
  Value: number;
}
export interface GetReusableDelegationSetLimitResponse {
  Limit: ReusableDelegationSetLimit;
  Count: number;
}
export interface GetTrafficPolicyRequest {
  Id: string;
  Version: number;
}
export interface GetTrafficPolicyResponse {
  TrafficPolicy: TrafficPolicy;
}
export interface GetTrafficPolicyInstanceRequest {
  Id: string;
}
export interface GetTrafficPolicyInstanceResponse {
  TrafficPolicyInstance: TrafficPolicyInstance;
}
export interface GetTrafficPolicyInstanceCountRequest {}
export type TrafficPolicyInstanceCount = number;
export interface GetTrafficPolicyInstanceCountResponse {
  TrafficPolicyInstanceCount: number;
}
export type PaginationToken = string;
export interface ListCidrBlocksRequest {
  CollectionId: string;
  LocationName?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface CidrBlockSummary {
  CidrBlock?: string;
  LocationName?: string;
}
export type CidrBlockSummaries = CidrBlockSummary[];
export interface ListCidrBlocksResponse {
  NextToken?: string;
  CidrBlocks?: CidrBlockSummary[];
}
export interface ListCidrCollectionsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface CollectionSummary {
  Arn?: string;
  Id?: string;
  Name?: string;
  Version?: number;
}
export type CollectionSummaries = CollectionSummary[];
export interface ListCidrCollectionsResponse {
  NextToken?: string;
  CidrCollections?: CollectionSummary[];
}
export interface ListCidrLocationsRequest {
  CollectionId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface LocationSummary {
  LocationName?: string;
}
export type LocationSummaries = LocationSummary[];
export interface ListCidrLocationsResponse {
  NextToken?: string;
  CidrLocations?: LocationSummary[];
}
export interface ListGeoLocationsRequest {
  StartContinentCode?: string;
  StartCountryCode?: string;
  StartSubdivisionCode?: string;
  MaxItems?: number;
}
export type GeoLocationDetailsList = GeoLocationDetails[];
export type PageTruncated = boolean;
export interface ListGeoLocationsResponse {
  GeoLocationDetailsList: GeoLocationDetails[];
  IsTruncated: boolean;
  NextContinentCode?: string;
  NextCountryCode?: string;
  NextSubdivisionCode?: string;
  MaxItems: number;
}
export type PageMarker = string;
export interface ListHealthChecksRequest {
  Marker?: string;
  MaxItems?: number;
}
export type HealthChecks = HealthCheck[];
export interface ListHealthChecksResponse {
  HealthChecks?: HealthCheck[];
  Marker?: string;
  IsTruncated: boolean;
  NextMarker?: string;
  MaxItems: number;
}
export type HostedZoneType = "PrivateHostedZone" | (string & {});
export interface ListHostedZonesRequest {
  Marker?: string;
  MaxItems?: number;
  DelegationSetId?: string;
  HostedZoneType?: HostedZoneType;
}
export type HostedZones = HostedZone[];
export interface ListHostedZonesResponse {
  HostedZones?: HostedZone[];
  Marker?: string;
  IsTruncated: boolean;
  NextMarker?: string;
  MaxItems: number;
}
export interface ListHostedZonesByNameRequest {
  DNSName?: string;
  HostedZoneId?: string;
  MaxItems?: number;
}
export interface ListHostedZonesByNameResponse {
  HostedZones?: HostedZone[];
  DNSName?: string;
  HostedZoneId?: string;
  IsTruncated: boolean;
  NextDNSName?: string;
  NextHostedZoneId?: string;
  MaxItems: number;
}
export interface ListHostedZonesByVPCRequest {
  VPCId: string;
  VPCRegion: VPCRegion;
  MaxItems?: number;
  NextToken?: string;
}
export type AWSAccountID = string;
export type HostedZoneOwningService = string;
export interface HostedZoneOwner {
  OwningAccount?: string;
  OwningService?: string;
}
export interface HostedZoneSummary {
  HostedZoneId: string;
  Name: string;
  Owner: HostedZoneOwner;
}
export type HostedZoneSummaries = HostedZoneSummary[];
export interface ListHostedZonesByVPCResponse {
  HostedZoneSummaries: HostedZoneSummary[];
  MaxItems: number;
  NextToken?: string;
}
export interface ListQueryLoggingConfigsRequest {
  HostedZoneId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type QueryLoggingConfigs = QueryLoggingConfig[];
export interface ListQueryLoggingConfigsResponse {
  QueryLoggingConfigs?: QueryLoggingConfig[];
  NextToken?: string;
}
export interface ListResourceRecordSetsRequest {
  HostedZoneId: string;
  StartRecordName?: string;
  StartRecordType?: RRType;
  StartRecordIdentifier?: string;
  MaxItems?: number;
}
export type ResourceRecordSets = ResourceRecordSet[];
export interface ListResourceRecordSetsResponse {
  ResourceRecordSets?: ResourceRecordSet[];
  IsTruncated: boolean;
  NextRecordName?: string;
  NextRecordType?: RRType;
  NextRecordIdentifier?: string;
  MaxItems: number;
}
export interface ListReusableDelegationSetsRequest {
  Marker?: string;
  MaxItems?: number;
}
export type DelegationSets = DelegationSet[];
export interface ListReusableDelegationSetsResponse {
  DelegationSets: DelegationSet[];
  Marker: string;
  IsTruncated: boolean;
  NextMarker?: string;
  MaxItems: number;
}
export interface ListTagsForResourceRequest {
  ResourceType: TagResourceType;
  ResourceId: string;
}
export interface ResourceTagSet {
  ResourceType?: TagResourceType;
  ResourceId?: string;
  Tags?: Tag[];
}
export interface ListTagsForResourceResponse {
  ResourceTagSet: ResourceTagSet;
}
export type TagResourceIdList = string[];
export interface ListTagsForResourcesRequest {
  ResourceType: TagResourceType;
  ResourceIds: string[];
}
export type ResourceTagSetList = ResourceTagSet[];
export interface ListTagsForResourcesResponse {
  ResourceTagSets: ResourceTagSet[];
}
export interface ListTrafficPoliciesRequest {
  TrafficPolicyIdMarker?: string;
  MaxItems?: number;
}
export interface TrafficPolicySummary {
  Id: string;
  Name: string;
  Type: RRType;
  LatestVersion: number;
  TrafficPolicyCount: number;
}
export type TrafficPolicySummaries = TrafficPolicySummary[];
export interface ListTrafficPoliciesResponse {
  TrafficPolicySummaries: TrafficPolicySummary[];
  IsTruncated: boolean;
  TrafficPolicyIdMarker: string;
  MaxItems: number;
}
export interface ListTrafficPolicyInstancesRequest {
  HostedZoneIdMarker?: string;
  TrafficPolicyInstanceNameMarker?: string;
  TrafficPolicyInstanceTypeMarker?: RRType;
  MaxItems?: number;
}
export type TrafficPolicyInstances = TrafficPolicyInstance[];
export interface ListTrafficPolicyInstancesResponse {
  TrafficPolicyInstances: TrafficPolicyInstance[];
  HostedZoneIdMarker?: string;
  TrafficPolicyInstanceNameMarker?: string;
  TrafficPolicyInstanceTypeMarker?: RRType;
  IsTruncated: boolean;
  MaxItems: number;
}
export interface ListTrafficPolicyInstancesByHostedZoneRequest {
  HostedZoneId: string;
  TrafficPolicyInstanceNameMarker?: string;
  TrafficPolicyInstanceTypeMarker?: RRType;
  MaxItems?: number;
}
export interface ListTrafficPolicyInstancesByHostedZoneResponse {
  TrafficPolicyInstances: TrafficPolicyInstance[];
  TrafficPolicyInstanceNameMarker?: string;
  TrafficPolicyInstanceTypeMarker?: RRType;
  IsTruncated: boolean;
  MaxItems: number;
}
export interface ListTrafficPolicyInstancesByPolicyRequest {
  TrafficPolicyId: string;
  TrafficPolicyVersion: number;
  HostedZoneIdMarker?: string;
  TrafficPolicyInstanceNameMarker?: string;
  TrafficPolicyInstanceTypeMarker?: RRType;
  MaxItems?: number;
}
export interface ListTrafficPolicyInstancesByPolicyResponse {
  TrafficPolicyInstances: TrafficPolicyInstance[];
  HostedZoneIdMarker?: string;
  TrafficPolicyInstanceNameMarker?: string;
  TrafficPolicyInstanceTypeMarker?: RRType;
  IsTruncated: boolean;
  MaxItems: number;
}
export type TrafficPolicyVersionMarker = string;
export interface ListTrafficPolicyVersionsRequest {
  Id: string;
  TrafficPolicyVersionMarker?: string;
  MaxItems?: number;
}
export type TrafficPolicies = TrafficPolicy[];
export interface ListTrafficPolicyVersionsResponse {
  TrafficPolicies: TrafficPolicy[];
  IsTruncated: boolean;
  TrafficPolicyVersionMarker: string;
  MaxItems: number;
}
export interface ListVPCAssociationAuthorizationsRequest {
  HostedZoneId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListVPCAssociationAuthorizationsResponse {
  HostedZoneId: string;
  NextToken?: string;
  VPCs?: VPC[];
}
export type SubnetMask = string;
export interface TestDNSAnswerRequest {
  HostedZoneId: string;
  RecordName: string;
  RecordType: RRType;
  ResolverIP?: string;
  EDNS0ClientSubnetIP?: string;
  EDNS0ClientSubnetMask?: string;
}
export type Nameserver = string;
export type RecordDataEntry = string;
export type RecordData = string[];
export type DNSRCode = string;
export type TransportProtocol = string;
export interface TestDNSAnswerResponse {
  Nameserver: string;
  RecordName: string;
  RecordType: RRType;
  RecordData: string[];
  ResponseCode: string;
  Protocol: string;
}
export type ResettableElementName =
  | "FullyQualifiedDomainName"
  | "Regions"
  | "ResourcePath"
  | "ChildHealthChecks"
  | (string & {});
export type ResettableElementNameList = ResettableElementName[];
export interface UpdateHealthCheckRequest {
  HealthCheckId: string;
  HealthCheckVersion?: number;
  IPAddress?: string;
  Port?: number;
  ResourcePath?: string;
  FullyQualifiedDomainName?: string;
  SearchString?: string;
  FailureThreshold?: number;
  Inverted?: boolean;
  Disabled?: boolean;
  HealthThreshold?: number;
  ChildHealthChecks?: string[];
  EnableSNI?: boolean;
  Regions?: HealthCheckRegion[];
  AlarmIdentifier?: AlarmIdentifier;
  InsufficientDataHealthStatus?: InsufficientDataHealthStatus;
  ResetElements?: ResettableElementName[];
}
export interface UpdateHealthCheckResponse {
  HealthCheck: HealthCheck;
}
export interface UpdateHostedZoneCommentRequest {
  Id: string;
  Comment?: string;
}
export interface UpdateHostedZoneCommentResponse {
  HostedZone: HostedZone;
}
export type AcceleratedRecoveryEnabled = boolean;
export interface UpdateHostedZoneFeaturesRequest {
  HostedZoneId: string;
  EnableAcceleratedRecovery?: boolean;
}
export interface UpdateHostedZoneFeaturesResponse {}
export interface UpdateTrafficPolicyCommentRequest {
  Id: string;
  Version: number;
  Comment: string;
}
export interface UpdateTrafficPolicyCommentResponse {
  TrafficPolicy: TrafficPolicy;
}
export interface UpdateTrafficPolicyInstanceRequest {
  Id: string;
  TTL: number;
  TrafficPolicyId: string;
  TrafficPolicyVersion: number;
}
export interface UpdateTrafficPolicyInstanceResponse {
  TrafficPolicyInstance: TrafficPolicyInstance;
}
export type ErrorMessage = string;
export type ErrorMessages = string[];
export type ActivateKeySigningKeyError =
  | ConcurrentModification
  | InvalidInput
  | InvalidKeySigningKeyStatus
  | InvalidKMSArn
  | InvalidSigningStatus
  | NoSuchKeySigningKey
  | CommonErrors;
/**
 * Activates a key-signing key (KSK) so that it can be used for signing by DNSSEC. This
 * operation changes the KSK status to `ACTIVE`.
 */
export const activateKeySigningKey: API.OperationMethod<
  ActivateKeySigningKeyRequest,
  ActivateKeySigningKeyResponse,
  ActivateKeySigningKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<ActivateKeySigningKeyRequest>,
  output: __S(377, __c47, 1) as any as S.Schema<ActivateKeySigningKeyResponse>,
  errors: [
    ConcurrentModification,
    InvalidInput,
    InvalidKeySigningKeyStatus,
    InvalidKMSArn,
    InvalidSigningStatus,
    NoSuchKeySigningKey,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateKeySigningKey",
}));

export type AssociateVPCWithHostedZoneError =
  | ConflictingDomainExists
  | InvalidInput
  | InvalidVPCId
  | LimitsExceeded
  | NoSuchHostedZone
  | NotAuthorizedException
  | PriorRequestNotComplete
  | PublicZoneVPCAssociation
  | CommonErrors;
/**
 * Associates an Amazon VPC with a private hosted zone.
 *
 * To perform the association, the VPC and the private hosted zone must already
 * exist. You can't convert a public hosted zone into a private hosted zone.
 *
 * If you want to associate a VPC that was created by using one Amazon Web Services account with a private hosted zone that was created by using a
 * different account, the Amazon Web Services account that created the private hosted
 * zone must first submit a `CreateVPCAssociationAuthorization` request.
 * Then the account that created the VPC must submit an
 * `AssociateVPCWithHostedZone` request.
 *
 * When granting access, the hosted zone and the Amazon VPC must belong to
 * the same partition. A partition is a group of Amazon Web Services Regions. Each
 * Amazon Web Services account is scoped to one partition.
 *
 * The following are the supported partitions:
 *
 * - `aws` - Amazon Web Services Regions
 *
 * - `aws-cn` - China Regions
 *
 * - `aws-us-gov` - Amazon Web Services GovCloud (US) Region
 *
 * For more information, see Access Management
 * in the *Amazon Web Services General Reference*.
 */
export const associateVPCWithHostedZone: API.OperationMethod<
  AssociateVPCWithHostedZoneRequest,
  AssociateVPCWithHostedZoneResponse,
  AssociateVPCWithHostedZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<AssociateVPCWithHostedZoneRequest>,
  output: __S(393, __c49, 1) as any as S.Schema<AssociateVPCWithHostedZoneResponse>,
  errors: [
    ConflictingDomainExists,
    InvalidInput,
    InvalidVPCId,
    LimitsExceeded,
    NoSuchHostedZone,
    NotAuthorizedException,
    PriorRequestNotComplete,
    PublicZoneVPCAssociation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateVPCWithHostedZone",
}));

export type ChangeCidrCollectionError =
  | CidrBlockInUseException
  | CidrCollectionVersionMismatchException
  | ConcurrentModification
  | InvalidInput
  | LimitsExceeded
  | NoSuchCidrCollectionException
  | CommonErrors;
/**
 * Creates, changes, or deletes CIDR blocks within a collection. Contains authoritative
 * IP information mapping blocks to one or multiple locations.
 *
 * A change request can update multiple locations in a collection at a time, which is
 * helpful if you want to move one or more CIDR blocks from one location to another in one
 * transaction, without downtime.
 *
 * **Limits**
 *
 * The max number of CIDR blocks included in the request is 1000. As a result, big updates
 * require multiple API calls.
 *
 * ** PUT and DELETE_IF_EXISTS**
 *
 * Use `ChangeCidrCollection` to perform the following actions:
 *
 * - `PUT`: Create a CIDR block within the specified collection.
 *
 * - ` DELETE_IF_EXISTS`: Delete an existing CIDR block from the
 * collection.
 */
export const changeCidrCollection: API.OperationMethod<
  ChangeCidrCollectionRequest,
  ChangeCidrCollectionResponse,
  ChangeCidrCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(411, __c51, 3) as any as S.Schema<ChangeCidrCollectionRequest>,
  output: __S(412, __c51, 4) as any as S.Schema<ChangeCidrCollectionResponse>,
  errors: [
    CidrBlockInUseException,
    CidrCollectionVersionMismatchException,
    ConcurrentModification,
    InvalidInput,
    LimitsExceeded,
    NoSuchCidrCollectionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChangeCidrCollection",
}));

export type ChangeResourceRecordSetsError =
  | InvalidChangeBatch
  | InvalidInput
  | NoSuchHealthCheck
  | NoSuchHostedZone
  | PriorRequestNotComplete
  | CommonErrors;
/**
 * Creates, changes, or deletes a resource record set, which contains authoritative DNS
 * information for a specified domain name or subdomain name. For example, you can use
 * `ChangeResourceRecordSets` to create a resource record set that routes
 * traffic for test.example.com to a web server that has an IP address of
 * 192.0.2.44.
 *
 * **Deleting Resource Record Sets**
 *
 * To delete a resource record set, you must specify all the same values that you
 * specified when you created it.
 *
 * **Change Batches and Transactional Changes**
 *
 * The request body must include a document with a
 * `ChangeResourceRecordSetsRequest` element. The request body contains a
 * list of change items, known as a change batch. Change batches are considered
 * transactional changes. Route 53 validates the changes in the request and then either
 * makes all or none of the changes in the change batch request. This ensures that DNS
 * routing isn't adversely affected by partial changes to the resource record sets in a
 * hosted zone.
 *
 * For example, suppose a change batch request contains two changes: it deletes the
 * `CNAME` resource record set for www.example.com and creates an alias
 * resource record set for www.example.com. If validation for both records succeeds, Route
 * 53 deletes the first resource record set and creates the second resource record set in a
 * single operation. If validation for either the `DELETE` or the
 * `CREATE` action fails, then the request is canceled, and the original
 * `CNAME` record continues to exist.
 *
 * If you try to delete the same resource record set more than once in a single
 * change batch, Route 53 returns an `InvalidChangeBatch` error.
 *
 * **Traffic Flow**
 *
 * To create resource record sets for complex routing configurations, use either the
 * traffic flow visual editor in the Route 53 console or the API actions for traffic
 * policies and traffic policy instances. Save the configuration as a traffic policy, then
 * associate the traffic policy with one or more domain names (such as example.com) or
 * subdomain names (such as www.example.com), in the same hosted zone or in multiple hosted
 * zones. You can roll back the updates if the new configuration isn't performing as
 * expected. For more information, see Using Traffic Flow to Route
 * DNS Traffic in the Amazon Route 53 Developer
 * Guide.
 *
 * **Create, Delete, and Upsert**
 *
 * Use `ChangeResourceRecordsSetsRequest` to perform the following
 * actions:
 *
 * - `CREATE`: Creates a resource record set that has the specified
 * values.
 *
 * - `DELETE`: Deletes an existing resource record set that has the
 * specified values.
 *
 * - `UPSERT`: If a resource set doesn't exist, Route 53 creates it. If a resource
 * set exists Route 53 updates it with the values in the request.
 *
 * Syntaxes for Creating, Updating, and Deleting Resource Record
 * Sets
 *
 * The syntax for a request depends on the type of resource record set that you want to
 * create, delete, or update, such as weighted, alias, or failover. The XML elements in
 * your request must appear in the order listed in the syntax.
 *
 * For an example for each type of resource record set, see "Examples."
 *
 * Don't refer to the syntax in the "Parameter Syntax" section, which includes
 * all of the elements for every kind of resource record set that you can create, delete,
 * or update by using `ChangeResourceRecordSets`.
 *
 * **Change Propagation to Route 53 DNS Servers**
 *
 * When you submit a `ChangeResourceRecordSets` request, Route 53 propagates your
 * changes to all of the Route 53 authoritative DNS servers managing the hosted zone. While
 * your changes are propagating, `GetChange` returns a status of
 * `PENDING`. When propagation is complete, `GetChange` returns a
 * status of `INSYNC`. Changes generally propagate to all Route 53 name servers
 * managing the hosted zone within 60 seconds. For more information, see GetChange.
 *
 * **Limits on ChangeResourceRecordSets Requests**
 *
 * For information about the limits on a `ChangeResourceRecordSets` request,
 * see Limits in the *Amazon Route 53 Developer Guide*.
 */
export const changeResourceRecordSets: API.OperationMethod<
  ChangeResourceRecordSetsRequest,
  ChangeResourceRecordSetsResponse,
  ChangeResourceRecordSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(419, __c52, 3) as any as S.Schema<ChangeResourceRecordSetsRequest>,
  output: __S(420, __c52, 4) as any as S.Schema<ChangeResourceRecordSetsResponse>,
  errors: [
    InvalidChangeBatch,
    InvalidInput,
    NoSuchHealthCheck,
    NoSuchHostedZone,
    PriorRequestNotComplete,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChangeResourceRecordSets",
}));

export type ChangeTagsForResourceError =
  | InvalidInput
  | NoSuchHealthCheck
  | NoSuchHostedZone
  | PriorRequestNotComplete
  | ThrottlingException
  | CommonErrors;
/**
 * Adds, edits, or deletes tags for a health check or a hosted zone.
 *
 * For information about using tags for cost allocation, see Using Cost Allocation
 * Tags in the *Billing and Cost Management User Guide*.
 */
export const changeTagsForResource: API.OperationMethod<
  ChangeTagsForResourceRequest,
  ChangeTagsForResourceResponse,
  ChangeTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(433, __c54, 1) as any as S.Schema<ChangeTagsForResourceRequest>,
  output: __S(434, __c54, 2) as any as S.Schema<ChangeTagsForResourceResponse>,
  errors: [
    InvalidInput,
    NoSuchHealthCheck,
    NoSuchHostedZone,
    PriorRequestNotComplete,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChangeTagsForResource",
}));

export type CreateCidrCollectionError =
  | CidrCollectionAlreadyExistsException
  | ConcurrentModification
  | InvalidInput
  | LimitsExceeded
  | CommonErrors;
/**
 * Creates a CIDR collection in the current Amazon Web Services account.
 */
export const createCidrCollection: API.OperationMethod<
  CreateCidrCollectionRequest,
  CreateCidrCollectionResponse,
  CreateCidrCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c56, 0) as any as S.Schema<CreateCidrCollectionRequest>,
  output: __S(450, __c56, 2) as any as S.Schema<CreateCidrCollectionResponse>,
  errors: [
    CidrCollectionAlreadyExistsException,
    ConcurrentModification,
    InvalidInput,
    LimitsExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCidrCollection",
}));

export type CreateHealthCheckError =
  | HealthCheckAlreadyExists
  | InvalidInput
  | TooManyHealthChecks
  | CommonErrors;
/**
 * Creates a new health check.
 *
 * For information about adding health checks to resource record sets, see HealthCheckId in ChangeResourceRecordSets.
 *
 * **ELB Load Balancers**
 *
 * If you're registering EC2 instances with an Elastic Load Balancing (ELB) load
 * balancer, do not create Amazon Route 53 health checks for the EC2 instances. When you
 * register an EC2 instance with a load balancer, you configure settings for an ELB health
 * check, which performs a similar function to a Route 53 health check.
 *
 * **Private Hosted Zones**
 *
 * You can associate health checks with failover resource record sets in a private hosted
 * zone. Note the following:
 *
 * - Route 53 health checkers are outside the VPC. To check the health of an
 * endpoint within a VPC by IP address, you must assign a public IP address to the
 * instance in the VPC.
 *
 * - You can configure a health checker to check the health of an external resource
 * that the instance relies on, such as a database server.
 *
 * - You can create a CloudWatch metric, associate an alarm with the metric, and
 * then create a health check that is based on the state of the alarm. For example,
 * you might create a CloudWatch metric that checks the status of the Amazon EC2
 * `StatusCheckFailed` metric, add an alarm to the metric, and then
 * create a health check that is based on the state of the alarm. For information
 * about creating CloudWatch metrics and alarms by using the CloudWatch console,
 * see the Amazon
 * CloudWatch User Guide.
 */
export const createHealthCheck: API.OperationMethod<
  CreateHealthCheckRequest,
  CreateHealthCheckResponse,
  CreateHealthCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(456, __c57, 0) as any as S.Schema<CreateHealthCheckRequest>,
  output: __S(457, __c57, 1) as any as S.Schema<CreateHealthCheckResponse>,
  errors: [HealthCheckAlreadyExists, InvalidInput, TooManyHealthChecks],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHealthCheck",
}));

export type CreateHostedZoneError =
  | ConflictingDomainExists
  | DelegationSetNotAvailable
  | DelegationSetNotReusable
  | HostedZoneAlreadyExists
  | InvalidDomainName
  | InvalidInput
  | InvalidVPCId
  | NoSuchDelegationSet
  | TooManyHostedZones
  | CommonErrors;
/**
 * Creates a new public or private hosted zone. You create records in a public hosted
 * zone to define how you want to route traffic on the internet for a domain, such as
 * example.com, and its subdomains (apex.example.com, acme.example.com). You create records
 * in a private hosted zone to define how you want to route traffic for a domain and its
 * subdomains within one or more Amazon Virtual Private Clouds (Amazon VPCs).
 *
 * You can't convert a public hosted zone to a private hosted zone or vice versa.
 * Instead, you must create a new hosted zone with the same name and create new
 * resource record sets.
 *
 * For more information about charges for hosted zones, see Amazon Route 53 Pricing.
 *
 * Note the following:
 *
 * - You can't create a hosted zone for a top-level domain (TLD) such as
 * .com.
 *
 * - For public hosted zones, Route 53 automatically creates a default SOA record
 * and four NS records for the zone. For more information about SOA and NS records,
 * see NS and SOA Records
 * that Route 53 Creates for a Hosted Zone in the
 * *Amazon Route 53 Developer Guide*.
 *
 * If you want to use the same name servers for multiple public hosted zones, you
 * can optionally associate a reusable delegation set with the hosted zone. See the
 * `DelegationSetId` element.
 *
 * - If your domain is registered with a registrar other than Route 53,
 * you must update the name servers with your registrar to make Route 53 the DNS
 * service for the domain. For more information, see Migrating DNS Service
 * for an Existing Domain to Amazon Route 53 in the
 * *Amazon Route 53 Developer Guide*.
 *
 * When you submit a `CreateHostedZone` request, the initial status of the
 * hosted zone is `PENDING`. For public hosted zones, this means that the NS and
 * SOA records are not yet available on all Route 53 DNS servers. When the NS and
 * SOA records are available, the status of the zone changes to `INSYNC`.
 *
 * The `CreateHostedZone` request requires the caller to have an
 * `ec2:DescribeVpcs` permission.
 *
 * When creating private hosted zones, the Amazon VPC must belong to the same
 * partition where the hosted zone is created. A partition is a group of Amazon Web Services Regions. Each Amazon Web Services account is scoped to one
 * partition.
 *
 * The following are the supported partitions:
 *
 * - `aws` - Amazon Web Services Regions
 *
 * - `aws-cn` - China Regions
 *
 * - `aws-us-gov` - Amazon Web Services GovCloud (US) Region
 *
 * For more information, see Access Management
 * in the *Amazon Web Services General Reference*.
 */
export const createHostedZone: API.OperationMethod<
  CreateHostedZoneRequest,
  CreateHostedZoneResponse,
  CreateHostedZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c60, 0) as any as S.Schema<CreateHostedZoneRequest>,
  output: __S(481, __c60, 1) as any as S.Schema<CreateHostedZoneResponse>,
  errors: [
    ConflictingDomainExists,
    DelegationSetNotAvailable,
    DelegationSetNotReusable,
    HostedZoneAlreadyExists,
    InvalidDomainName,
    InvalidInput,
    InvalidVPCId,
    NoSuchDelegationSet,
    TooManyHostedZones,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHostedZone",
}));

export type CreateKeySigningKeyError =
  | ConcurrentModification
  | InvalidArgument
  | InvalidInput
  | InvalidKeySigningKeyName
  | InvalidKeySigningKeyStatus
  | InvalidKMSArn
  | InvalidSigningStatus
  | KeySigningKeyAlreadyExists
  | NoSuchHostedZone
  | TooManyKeySigningKeys
  | CommonErrors;
/**
 * Creates a new key-signing key (KSK) associated with a hosted zone. You can only have
 * two KSKs per hosted zone.
 */
export const createKeySigningKey: API.OperationMethod<
  CreateKeySigningKeyRequest,
  CreateKeySigningKeyResponse,
  CreateKeySigningKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(504, __c63, 0) as any as S.Schema<CreateKeySigningKeyRequest>,
  output: __S(505, __c63, 1) as any as S.Schema<CreateKeySigningKeyResponse>,
  errors: [
    ConcurrentModification,
    InvalidArgument,
    InvalidInput,
    InvalidKeySigningKeyName,
    InvalidKeySigningKeyStatus,
    InvalidKMSArn,
    InvalidSigningStatus,
    KeySigningKeyAlreadyExists,
    NoSuchHostedZone,
    TooManyKeySigningKeys,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKeySigningKey",
}));

export type CreateQueryLoggingConfigError =
  | ConcurrentModification
  | InsufficientCloudWatchLogsResourcePolicy
  | InvalidInput
  | NoSuchCloudWatchLogsLogGroup
  | NoSuchHostedZone
  | QueryLoggingConfigAlreadyExists
  | CommonErrors;
/**
 * Creates a configuration for DNS query logging. After you create a query logging
 * configuration, Amazon Route 53 begins to publish log data to an Amazon CloudWatch Logs
 * log group.
 *
 * DNS query logs contain information about the queries that Route 53 receives for a
 * specified public hosted zone, such as the following:
 *
 * - Route 53 edge location that responded to the DNS query
 *
 * - Domain or subdomain that was requested
 *
 * - DNS record type, such as A or AAAA
 *
 * - DNS response code, such as `NoError` or
 * `ServFail`
 *
 * ### Log Group and Resource Policy
 *
 * Before you create a query logging configuration, perform the following
 * operations.
 *
 * If you create a query logging configuration using the Route 53
 * console, Route 53 performs these operations automatically.
 *
 * - Create a CloudWatch Logs log group, and make note of the ARN,
 * which you specify when you create a query logging configuration.
 * Note the following:
 *
 * - You must create the log group in the us-east-1
 * region.
 *
 * - You must use the same Amazon Web Services account to create
 * the log group and the hosted zone that you want to configure
 * query logging for.
 *
 * - When you create log groups for query logging, we recommend
 * that you use a consistent prefix, for example:
 *
 * /aws/route53/hosted zone
 * name
 *
 * In the next step, you'll create a resource policy, which
 * controls access to one or more log groups and the associated
 * Amazon Web Services resources, such as Route 53 hosted
 * zones. There's a limit on the number of resource policies
 * that you can create, so we recommend that you use a
 * consistent prefix so you can use the same resource policy
 * for all the log groups that you create for query
 * logging.
 *
 * - Create a CloudWatch Logs resource policy, and give it the
 * permissions that Route 53 needs to create log streams and to send
 * query logs to log streams. You must create the CloudWatch Logs resource policy in the us-east-1
 * region. For the value of `Resource`,
 * specify the ARN for the log group that you created in the previous
 * step. To use the same resource policy for all the CloudWatch Logs
 * log groups that you created for query logging configurations,
 * replace the hosted zone name with `*`, for
 * example:
 *
 * `arn:aws:logs:us-east-1:123412341234:log-group:/aws/route53/*`
 *
 * To avoid the confused deputy problem, a security issue where an
 * entity without a permission for an action can coerce a
 * more-privileged entity to perform it, you can optionally limit the
 * permissions that a service has to a resource in a resource-based
 * policy by supplying the following values:
 *
 * - For `aws:SourceArn`, supply the hosted zone ARN
 * used in creating the query logging configuration. For
 * example, aws:SourceArn:
 * arn:aws:route53:::hostedzone/hosted zone
 * ID.
 *
 * - For `aws:SourceAccount`, supply the account ID
 * for the account that creates the query logging
 * configuration. For example,
 * `aws:SourceAccount:111111111111`.
 *
 * For more information, see The confused
 * deputy problem in the Amazon Web Services
 * IAM User Guide.
 *
 * You can't use the CloudWatch console to create or edit a
 * resource policy. You must use the CloudWatch API, one of the
 * Amazon Web Services SDKs, or the CLI.
 *
 * ### Log Streams and Edge Locations
 *
 * When Route 53 finishes creating the configuration for DNS query logging,
 * it does the following:
 *
 * - Creates a log stream for an edge location the first time that the
 * edge location responds to DNS queries for the specified hosted zone.
 * That log stream is used to log all queries that Route 53 responds to
 * for that edge location.
 *
 * - Begins to send query logs to the applicable log stream.
 *
 * The name of each log stream is in the following format:
 *
 * *hosted zone ID*\/edge location
 * code
 *
 * The edge location code is a three-letter code and an arbitrarily assigned
 * number, for example, DFW3. The three-letter code typically corresponds with
 * the International Air Transport Association airport code for an airport near
 * the edge location. (These abbreviations might change in the future.) For a
 * list of edge locations, see "The Route 53 Global Network" on the Route 53 Product Details
 * page.
 *
 * ### Queries That Are Logged
 *
 * Query logs contain only the queries that DNS resolvers forward to Route
 * 53. If a DNS resolver has already cached the response to a query (such as
 * the IP address for a load balancer for example.com), the resolver will
 * continue to return the cached response. It doesn't forward another query to
 * Route 53 until the TTL for the corresponding resource record set expires.
 * Depending on how many DNS queries are submitted for a resource record set,
 * and depending on the TTL for that resource record set, query logs might
 * contain information about only one query out of every several thousand
 * queries that are submitted to DNS. For more information about how DNS works,
 * see Routing
 * Internet Traffic to Your Website or Web Application in the
 * *Amazon Route 53 Developer Guide*.
 *
 * ### Log File Format
 *
 * For a list of the values in each query log and the format of each value,
 * see Logging DNS
 * Queries in the Amazon Route 53 Developer
 * Guide.
 *
 * ### Pricing
 *
 * For information about charges for query logs, see Amazon CloudWatch Pricing.
 *
 * ### How to Stop Logging
 *
 * If you want Route 53 to stop sending query logs to CloudWatch Logs, delete
 * the query logging configuration. For more information, see DeleteQueryLoggingConfig.
 */
export const createQueryLoggingConfig: API.OperationMethod<
  CreateQueryLoggingConfigRequest,
  CreateQueryLoggingConfigResponse,
  CreateQueryLoggingConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(520, __c65, 0) as any as S.Schema<CreateQueryLoggingConfigRequest>,
  output: __S(521, __c65, 1) as any as S.Schema<CreateQueryLoggingConfigResponse>,
  errors: [
    ConcurrentModification,
    InsufficientCloudWatchLogsResourcePolicy,
    InvalidInput,
    NoSuchCloudWatchLogsLogGroup,
    NoSuchHostedZone,
    QueryLoggingConfigAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueryLoggingConfig",
}));

export type CreateReusableDelegationSetError =
  | DelegationSetAlreadyCreated
  | DelegationSetAlreadyReusable
  | DelegationSetNotAvailable
  | HostedZoneNotFound
  | InvalidArgument
  | InvalidInput
  | LimitsExceeded
  | CommonErrors;
/**
 * Creates a delegation set (a group of four name servers) that can be reused by multiple
 * hosted zones that were created by the same Amazon Web Services account.
 *
 * You can also create a reusable delegation set that uses the four name servers that are
 * associated with an existing hosted zone. Specify the hosted zone ID in the
 * `CreateReusableDelegationSet` request.
 *
 * You can't associate a reusable delegation set with a private hosted zone.
 *
 * For information about using a reusable delegation set to configure white label name
 * servers, see Configuring White
 * Label Name Servers.
 *
 * The process for migrating existing hosted zones to use a reusable delegation set is
 * comparable to the process for configuring white label name servers. You need to perform
 * the following steps:
 *
 * - Create a reusable delegation set.
 *
 * - Recreate hosted zones, and reduce the TTL to 60 seconds or less.
 *
 * - Recreate resource record sets in the new hosted zones.
 *
 * - Change the registrar's name servers to use the name servers for the new hosted
 * zones.
 *
 * - Monitor traffic for the website or application.
 *
 * - Change TTLs back to their original values.
 *
 * If you want to migrate existing hosted zones to use a reusable delegation set, the
 * existing hosted zones can't use any of the name servers that are assigned to the
 * reusable delegation set. If one or more hosted zones do use one or more name servers
 * that are assigned to the reusable delegation set, you can do one of the
 * following:
 *
 * - For small numbers of hosted zones--up to a few hundred--it's
 * relatively easy to create reusable delegation sets until you get one that has
 * four name servers that don't overlap with any of the name servers in your hosted
 * zones.
 *
 * - For larger numbers of hosted zones, the easiest solution is to use more than
 * one reusable delegation set.
 *
 * - For larger numbers of hosted zones, you can also migrate hosted zones that
 * have overlapping name servers to hosted zones that don't have overlapping name
 * servers, then migrate the hosted zones again to use the reusable delegation
 * set.
 */
export const createReusableDelegationSet: API.OperationMethod<
  CreateReusableDelegationSetRequest,
  CreateReusableDelegationSetResponse,
  CreateReusableDelegationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(536, __c67, 0) as any as S.Schema<CreateReusableDelegationSetRequest>,
  output: __S(537, __c67, 1) as any as S.Schema<CreateReusableDelegationSetResponse>,
  errors: [
    DelegationSetAlreadyCreated,
    DelegationSetAlreadyReusable,
    DelegationSetNotAvailable,
    HostedZoneNotFound,
    InvalidArgument,
    InvalidInput,
    LimitsExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReusableDelegationSet",
}));

export type CreateTrafficPolicyError =
  | InvalidInput
  | InvalidTrafficPolicyDocument
  | TooManyTrafficPolicies
  | TrafficPolicyAlreadyExists
  | CommonErrors;
/**
 * Creates a traffic policy, which you use to create multiple DNS resource record sets
 * for one domain name (such as example.com) or one subdomain name (such as
 * www.example.com).
 */
export const createTrafficPolicy: API.OperationMethod<
  CreateTrafficPolicyRequest,
  CreateTrafficPolicyResponse,
  CreateTrafficPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c68, 0) as any as S.Schema<CreateTrafficPolicyRequest>,
  output: __S(545, __c68, 1) as any as S.Schema<CreateTrafficPolicyResponse>,
  errors: [
    InvalidInput,
    InvalidTrafficPolicyDocument,
    TooManyTrafficPolicies,
    TrafficPolicyAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrafficPolicy",
}));

export type CreateTrafficPolicyInstanceError =
  | InvalidInput
  | NoSuchHostedZone
  | NoSuchTrafficPolicy
  | TooManyTrafficPolicyInstances
  | TrafficPolicyInstanceAlreadyExists
  | CommonErrors;
/**
 * Creates resource record sets in a specified hosted zone based on the settings in a
 * specified traffic policy version. In addition, `CreateTrafficPolicyInstance`
 * associates the resource record sets with a specified domain name (such as example.com)
 * or subdomain name (such as www.example.com). Amazon Route 53 responds to DNS queries for
 * the domain or subdomain name by using the resource record sets that
 * `CreateTrafficPolicyInstance` created.
 *
 * After you submit an `CreateTrafficPolicyInstance` request, there's a
 * brief delay while Amazon Route 53 creates the resource record sets that are
 * specified in the traffic policy definition.
 * Use `GetTrafficPolicyInstance` with the `id` of new traffic policy instance to confirm that the `CreateTrafficPolicyInstance`
 * request completed successfully. For more information, see the
 * `State` response element.
 */
export const createTrafficPolicyInstance: API.OperationMethod<
  CreateTrafficPolicyInstanceRequest,
  CreateTrafficPolicyInstanceResponse,
  CreateTrafficPolicyInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c70, 0) as any as S.Schema<CreateTrafficPolicyInstanceRequest>,
  output: __S(561, __c70, 1) as any as S.Schema<CreateTrafficPolicyInstanceResponse>,
  errors: [
    InvalidInput,
    NoSuchHostedZone,
    NoSuchTrafficPolicy,
    TooManyTrafficPolicyInstances,
    TrafficPolicyInstanceAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrafficPolicyInstance",
}));

export type CreateTrafficPolicyVersionError =
  | ConcurrentModification
  | InvalidInput
  | InvalidTrafficPolicyDocument
  | NoSuchTrafficPolicy
  | TooManyTrafficPolicyVersionsForCurrentPolicy
  | CommonErrors;
/**
 * Creates a new version of an existing traffic policy. When you create a new version of
 * a traffic policy, you specify the ID of the traffic policy that you want to update and a
 * JSON-formatted document that describes the new version. You use traffic policies to
 * create multiple DNS resource record sets for one domain name (such as example.com) or
 * one subdomain name (such as www.example.com). You can create a maximum of 1000 versions
 * of a traffic policy. If you reach the limit and need to create another version, you'll
 * need to start a new traffic policy.
 */
export const createTrafficPolicyVersion: API.OperationMethod<
  CreateTrafficPolicyVersionRequest,
  CreateTrafficPolicyVersionResponse,
  CreateTrafficPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c72, 0) as any as S.Schema<CreateTrafficPolicyVersionRequest>,
  output: __S(577, __c72, 1) as any as S.Schema<CreateTrafficPolicyVersionResponse>,
  errors: [
    ConcurrentModification,
    InvalidInput,
    InvalidTrafficPolicyDocument,
    NoSuchTrafficPolicy,
    TooManyTrafficPolicyVersionsForCurrentPolicy,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrafficPolicyVersion",
}));

export type CreateVPCAssociationAuthorizationError =
  | ConcurrentModification
  | InvalidInput
  | InvalidVPCId
  | NoSuchHostedZone
  | TooManyVPCAssociationAuthorizations
  | CommonErrors;
/**
 * Authorizes the Amazon Web Services account that created a specified VPC to submit an
 * `AssociateVPCWithHostedZone` request to associate the VPC with a
 * specified hosted zone that was created by a different account. To submit a
 * `CreateVPCAssociationAuthorization` request, you must use the account
 * that created the hosted zone. After you authorize the association, use the account that
 * created the VPC to submit an `AssociateVPCWithHostedZone` request.
 *
 * If you want to associate multiple VPCs that you created by using one account with
 * a hosted zone that you created by using a different account, you must submit one
 * authorization request for each VPC.
 */
export const createVPCAssociationAuthorization: API.OperationMethod<
  CreateVPCAssociationAuthorizationRequest,
  CreateVPCAssociationAuthorizationResponse,
  CreateVPCAssociationAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(584, __c73, 0) as any as S.Schema<CreateVPCAssociationAuthorizationRequest>,
  output: __S(585, __c73, 1) as any as S.Schema<CreateVPCAssociationAuthorizationResponse>,
  errors: [
    ConcurrentModification,
    InvalidInput,
    InvalidVPCId,
    NoSuchHostedZone,
    TooManyVPCAssociationAuthorizations,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVPCAssociationAuthorization",
}));

export type DeactivateKeySigningKeyError =
  | ConcurrentModification
  | InvalidInput
  | InvalidKeySigningKeyStatus
  | InvalidSigningStatus
  | KeySigningKeyInParentDSRecord
  | KeySigningKeyInUse
  | NoSuchKeySigningKey
  | CommonErrors;
/**
 * Deactivates a key-signing key (KSK) so that it will not be used for signing by DNSSEC.
 * This operation changes the KSK status to `INACTIVE`.
 */
export const deactivateKeySigningKey: API.OperationMethod<
  DeactivateKeySigningKeyRequest,
  DeactivateKeySigningKeyResponse,
  DeactivateKeySigningKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c74, 0) as any as S.Schema<DeactivateKeySigningKeyRequest>,
  output: __S(593, __c74, 1) as any as S.Schema<DeactivateKeySigningKeyResponse>,
  errors: [
    ConcurrentModification,
    InvalidInput,
    InvalidKeySigningKeyStatus,
    InvalidSigningStatus,
    KeySigningKeyInParentDSRecord,
    KeySigningKeyInUse,
    NoSuchKeySigningKey,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateKeySigningKey",
}));

export type DeleteCidrCollectionError =
  | CidrCollectionInUseException
  | ConcurrentModification
  | InvalidInput
  | NoSuchCidrCollectionException
  | CommonErrors;
/**
 * Deletes a CIDR collection in the current Amazon Web Services account. The collection
 * must be empty before it can be deleted.
 */
export const deleteCidrCollection: API.OperationMethod<
  DeleteCidrCollectionRequest,
  DeleteCidrCollectionResponse,
  DeleteCidrCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(600, __c75, 0) as any as S.Schema<DeleteCidrCollectionRequest>,
  output: __S(601, __c75, 1) as any as S.Schema<DeleteCidrCollectionResponse>,
  errors: [
    CidrCollectionInUseException,
    ConcurrentModification,
    InvalidInput,
    NoSuchCidrCollectionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCidrCollection",
}));

export type DeleteHealthCheckError =
  | HealthCheckInUse
  | InvalidInput
  | NoSuchHealthCheck
  | CommonErrors;
/**
 * Deletes a health check.
 *
 * Amazon Route 53 does not prevent you from deleting a health check even if the
 * health check is associated with one or more resource record sets. If you delete a
 * health check and you don't update the associated resource record sets, the future
 * status of the health check can't be predicted and may change. This will affect the
 * routing of DNS queries for your DNS failover configuration. For more information,
 * see Replacing and Deleting Health Checks in the Amazon Route 53
 * Developer Guide.
 *
 * If you're using Cloud Map and you configured Cloud Map to create a Route 53
 * health check when you register an instance, you can't use the Route 53
 * `DeleteHealthCheck` command to delete the health check. The health check
 * is deleted automatically when you deregister the instance; there can be a delay of
 * several hours before the health check is deleted from Route 53.
 */
export const deleteHealthCheck: API.OperationMethod<
  DeleteHealthCheckRequest,
  DeleteHealthCheckResponse,
  DeleteHealthCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c76, 0) as any as S.Schema<DeleteHealthCheckRequest>,
  output: __S(609, __c76, 1) as any as S.Schema<DeleteHealthCheckResponse>,
  errors: [HealthCheckInUse, InvalidInput, NoSuchHealthCheck],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHealthCheck",
}));

export type DeleteHostedZoneError =
  | HostedZoneNotEmpty
  | InvalidDomainName
  | InvalidInput
  | NoSuchHostedZone
  | PriorRequestNotComplete
  | CommonErrors;
/**
 * Deletes a hosted zone.
 *
 * If the hosted zone was created by another service, such as Cloud Map, see
 * Deleting Public Hosted Zones That Were Created by Another Service in the
 * *Amazon Route 53 Developer Guide* for information
 * about how to delete it. (The process is the same for public and private hosted zones
 * that were created by another service.)
 *
 * If you want to keep your domain registration but you want to stop routing internet
 * traffic to your website or web application, we recommend that you delete resource record
 * sets in the hosted zone instead of deleting the hosted zone.
 *
 * If you delete a hosted zone, you can't undelete it. You must create a new hosted
 * zone and update the name servers for your domain registration, which can require up
 * to 48 hours to take effect. (If you delegated responsibility for a subdomain to a
 * hosted zone and you delete the child hosted zone, you must update the name servers
 * in the parent hosted zone.) In addition, if you delete a hosted zone, someone could
 * hijack the domain and route traffic to their own resources using your domain
 * name.
 *
 * If you want to avoid the monthly charge for the hosted zone, you can transfer DNS
 * service for the domain to a free DNS service. When you transfer DNS service, you have to
 * update the name servers for the domain registration. If the domain is registered with
 * Route 53, see UpdateDomainNameservers for information about how to replace Route 53 name servers with name servers for the new DNS service. If the domain is
 * registered with another registrar, use the method provided by the registrar to update
 * name servers for the domain registration. For more information, perform an internet
 * search on "free DNS service."
 *
 * You can delete a hosted zone only if it contains only the default SOA and NS records
 * and has DNSSEC signing disabled. If the hosted zone contains other records or has DNSSEC
 * enabled, you must delete the records and disable DNSSEC before deletion. Attempting to
 * delete a hosted zone with additional records or DNSSEC enabled returns a
 * `HostedZoneNotEmpty` error. For information about deleting records, see
 * ChangeResourceRecordSets.
 *
 * To verify that the hosted zone has been deleted, do one of the following:
 *
 * - Use the `GetHostedZone` action to request information about the
 * hosted zone.
 *
 * - Use the `ListHostedZones` action to get a list of the hosted zones
 * associated with the current Amazon Web Services account.
 */
export const deleteHostedZone: API.OperationMethod<
  DeleteHostedZoneRequest,
  DeleteHostedZoneResponse,
  DeleteHostedZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(616, __c77, 0) as any as S.Schema<DeleteHostedZoneRequest>,
  output: __S(617, __c77, 1) as any as S.Schema<DeleteHostedZoneResponse>,
  errors: [
    HostedZoneNotEmpty,
    InvalidDomainName,
    InvalidInput,
    NoSuchHostedZone,
    PriorRequestNotComplete,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHostedZone",
}));

export type DeleteKeySigningKeyError =
  | ConcurrentModification
  | InvalidInput
  | InvalidKeySigningKeyStatus
  | InvalidKMSArn
  | InvalidSigningStatus
  | NoSuchKeySigningKey
  | CommonErrors;
/**
 * Deletes a key-signing key (KSK). Before you can delete a KSK, you must deactivate it.
 * The KSK must be deactivated before you can delete it regardless of whether the hosted
 * zone is enabled for DNSSEC signing.
 *
 * You can use DeactivateKeySigningKey to deactivate the key before you delete it.
 *
 * Use GetDNSSEC to verify that the KSK is in an `INACTIVE`
 * status.
 */
export const deleteKeySigningKey: API.OperationMethod<
  DeleteKeySigningKeyRequest,
  DeleteKeySigningKeyResponse,
  DeleteKeySigningKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c78, 0) as any as S.Schema<DeleteKeySigningKeyRequest>,
  output: __S(625, __c78, 1) as any as S.Schema<DeleteKeySigningKeyResponse>,
  errors: [
    ConcurrentModification,
    InvalidInput,
    InvalidKeySigningKeyStatus,
    InvalidKMSArn,
    InvalidSigningStatus,
    NoSuchKeySigningKey,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKeySigningKey",
}));

export type DeleteQueryLoggingConfigError =
  | ConcurrentModification
  | InvalidInput
  | NoSuchQueryLoggingConfig
  | CommonErrors;
/**
 * Deletes a configuration for DNS query logging. If you delete a configuration, Amazon
 * Route 53 stops sending query logs to CloudWatch Logs. Route 53 doesn't delete any logs
 * that are already in CloudWatch Logs.
 *
 * For more information about DNS query logs, see CreateQueryLoggingConfig.
 */
export const deleteQueryLoggingConfig: API.OperationMethod<
  DeleteQueryLoggingConfigRequest,
  DeleteQueryLoggingConfigResponse,
  DeleteQueryLoggingConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(632, __c79, 0) as any as S.Schema<DeleteQueryLoggingConfigRequest>,
  output: __S(633, __c79, 1) as any as S.Schema<DeleteQueryLoggingConfigResponse>,
  errors: [ConcurrentModification, InvalidInput, NoSuchQueryLoggingConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueryLoggingConfig",
}));

export type DeleteReusableDelegationSetError =
  | DelegationSetInUse
  | DelegationSetNotReusable
  | InvalidInput
  | NoSuchDelegationSet
  | CommonErrors;
/**
 * Deletes a reusable delegation set.
 *
 * You can delete a reusable delegation set only if it isn't associated with any
 * hosted zones.
 *
 * To verify that the reusable delegation set is not associated with any hosted zones,
 * submit a GetReusableDelegationSet request and specify the ID of the reusable
 * delegation set that you want to delete.
 */
export const deleteReusableDelegationSet: API.OperationMethod<
  DeleteReusableDelegationSetRequest,
  DeleteReusableDelegationSetResponse,
  DeleteReusableDelegationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c80, 0) as any as S.Schema<DeleteReusableDelegationSetRequest>,
  output: __S(641, __c80, 1) as any as S.Schema<DeleteReusableDelegationSetResponse>,
  errors: [DelegationSetInUse, DelegationSetNotReusable, InvalidInput, NoSuchDelegationSet],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReusableDelegationSet",
}));

export type DeleteTrafficPolicyError =
  | ConcurrentModification
  | InvalidInput
  | NoSuchTrafficPolicy
  | TrafficPolicyInUse
  | CommonErrors;
/**
 * Deletes a traffic policy.
 *
 * When you delete a traffic policy, Route 53 sets a flag on the policy to indicate that
 * it has been deleted. However, Route 53 never fully deletes the traffic policy. Note the
 * following:
 *
 * - Deleted traffic policies aren't listed if you run ListTrafficPolicies.
 *
 * - There's no way to get a list of deleted policies.
 *
 * - If you retain the ID of the policy, you can get information about the policy,
 * including the traffic policy document, by running GetTrafficPolicy.
 */
export const deleteTrafficPolicy: API.OperationMethod<
  DeleteTrafficPolicyRequest,
  DeleteTrafficPolicyResponse,
  DeleteTrafficPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(648, __c81, 0) as any as S.Schema<DeleteTrafficPolicyRequest>,
  output: __S(649, __c81, 1) as any as S.Schema<DeleteTrafficPolicyResponse>,
  errors: [ConcurrentModification, InvalidInput, NoSuchTrafficPolicy, TrafficPolicyInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrafficPolicy",
}));

export type DeleteTrafficPolicyInstanceError =
  | InvalidInput
  | NoSuchTrafficPolicyInstance
  | PriorRequestNotComplete
  | CommonErrors;
/**
 * Deletes a traffic policy instance and all of the resource record sets that Amazon
 * Route 53 created when you created the instance.
 *
 * In the Route 53 console, traffic policy instances are known as policy
 * records.
 */
export const deleteTrafficPolicyInstance: API.OperationMethod<
  DeleteTrafficPolicyInstanceRequest,
  DeleteTrafficPolicyInstanceResponse,
  DeleteTrafficPolicyInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c82, 0) as any as S.Schema<DeleteTrafficPolicyInstanceRequest>,
  output: __S(657, __c82, 1) as any as S.Schema<DeleteTrafficPolicyInstanceResponse>,
  errors: [InvalidInput, NoSuchTrafficPolicyInstance, PriorRequestNotComplete],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrafficPolicyInstance",
}));

export type DeleteVPCAssociationAuthorizationError =
  | ConcurrentModification
  | InvalidInput
  | InvalidVPCId
  | NoSuchHostedZone
  | VPCAssociationAuthorizationNotFound
  | CommonErrors;
/**
 * Removes authorization to submit an `AssociateVPCWithHostedZone` request to
 * associate a specified VPC with a hosted zone that was created by a different account.
 * You must use the account that created the hosted zone to submit a
 * `DeleteVPCAssociationAuthorization` request.
 *
 * Sending this request only prevents the Amazon Web Services account that created the
 * VPC from associating the VPC with the Amazon Route 53 hosted zone in the future. If
 * the VPC is already associated with the hosted zone,
 * `DeleteVPCAssociationAuthorization` won't disassociate the VPC from
 * the hosted zone. If you want to delete an existing association, use
 * `DisassociateVPCFromHostedZone`.
 */
export const deleteVPCAssociationAuthorization: API.OperationMethod<
  DeleteVPCAssociationAuthorizationRequest,
  DeleteVPCAssociationAuthorizationResponse,
  DeleteVPCAssociationAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(664, __c83, 0) as any as S.Schema<DeleteVPCAssociationAuthorizationRequest>,
  output: __S(665, __c83, 1) as any as S.Schema<DeleteVPCAssociationAuthorizationResponse>,
  errors: [
    ConcurrentModification,
    InvalidInput,
    InvalidVPCId,
    NoSuchHostedZone,
    VPCAssociationAuthorizationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVPCAssociationAuthorization",
}));

export type DisableHostedZoneDNSSECError =
  | ConcurrentModification
  | DNSSECNotFound
  | InvalidArgument
  | InvalidInput
  | InvalidKeySigningKeyStatus
  | InvalidKMSArn
  | KeySigningKeyInParentDSRecord
  | NoSuchHostedZone
  | CommonErrors;
/**
 * Disables DNSSEC signing in a specific hosted zone. This action does not deactivate any
 * key-signing keys (KSKs) that are active in the hosted zone.
 */
export const disableHostedZoneDNSSEC: API.OperationMethod<
  DisableHostedZoneDNSSECRequest,
  DisableHostedZoneDNSSECResponse,
  DisableHostedZoneDNSSECError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c84, 0) as any as S.Schema<DisableHostedZoneDNSSECRequest>,
  output: __S(673, __c84, 1) as any as S.Schema<DisableHostedZoneDNSSECResponse>,
  errors: [
    ConcurrentModification,
    DNSSECNotFound,
    InvalidArgument,
    InvalidInput,
    InvalidKeySigningKeyStatus,
    InvalidKMSArn,
    KeySigningKeyInParentDSRecord,
    NoSuchHostedZone,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableHostedZoneDNSSEC",
}));

export type DisassociateVPCFromHostedZoneError =
  | InvalidInput
  | InvalidVPCId
  | LastVPCAssociation
  | NoSuchHostedZone
  | VPCAssociationNotFound
  | CommonErrors;
/**
 * Disassociates an Amazon Virtual Private Cloud (Amazon VPC) from an Amazon Route 53
 * private hosted zone. Note the following:
 *
 * - You can't disassociate the last Amazon VPC from a private hosted zone.
 *
 * - You can't convert a private hosted zone into a public hosted zone.
 *
 * - You can submit a `DisassociateVPCFromHostedZone` request using
 * either the account that created the hosted zone or the account that created the
 * Amazon VPC.
 *
 * - Some services, such as Cloud Map and Amazon Elastic File System
 * (Amazon EFS) automatically create hosted zones and associate VPCs with the
 * hosted zones. A service can create a hosted zone using your account or using its
 * own account. You can disassociate a VPC from a hosted zone only if the service
 * created the hosted zone using your account.
 *
 * When you run DisassociateVPCFromHostedZone, if the hosted zone has a value for
 * `OwningAccount`, you can use
 * `DisassociateVPCFromHostedZone`. If the hosted zone has a value
 * for `OwningService`, you can't use
 * `DisassociateVPCFromHostedZone`.
 *
 * When revoking access, the hosted zone and the Amazon VPC must belong to
 * the same partition. A partition is a group of Amazon Web Services Regions. Each
 * Amazon Web Services account is scoped to one partition.
 *
 * The following are the supported partitions:
 *
 * - `aws` - Amazon Web Services Regions
 *
 * - `aws-cn` - China Regions
 *
 * - `aws-us-gov` - Amazon Web Services GovCloud (US) Region
 *
 * For more information, see Access Management
 * in the *Amazon Web Services General Reference*.
 */
export const disassociateVPCFromHostedZone: API.OperationMethod<
  DisassociateVPCFromHostedZoneRequest,
  DisassociateVPCFromHostedZoneResponse,
  DisassociateVPCFromHostedZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(680, __c85, 0) as any as S.Schema<DisassociateVPCFromHostedZoneRequest>,
  output: __S(681, __c85, 1) as any as S.Schema<DisassociateVPCFromHostedZoneResponse>,
  errors: [
    InvalidInput,
    InvalidVPCId,
    LastVPCAssociation,
    NoSuchHostedZone,
    VPCAssociationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateVPCFromHostedZone",
}));

export type EnableHostedZoneDNSSECError =
  | ConcurrentModification
  | DNSSECNotFound
  | HostedZonePartiallyDelegated
  | InvalidArgument
  | InvalidInput
  | InvalidKeySigningKeyStatus
  | InvalidKMSArn
  | KeySigningKeyWithActiveStatusNotFound
  | NoSuchHostedZone
  | CommonErrors;
/**
 * Enables DNSSEC signing in a specific hosted zone.
 */
export const enableHostedZoneDNSSEC: API.OperationMethod<
  EnableHostedZoneDNSSECRequest,
  EnableHostedZoneDNSSECResponse,
  EnableHostedZoneDNSSECError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c86, 0) as any as S.Schema<EnableHostedZoneDNSSECRequest>,
  output: __S(689, __c86, 1) as any as S.Schema<EnableHostedZoneDNSSECResponse>,
  errors: [
    ConcurrentModification,
    DNSSECNotFound,
    HostedZonePartiallyDelegated,
    InvalidArgument,
    InvalidInput,
    InvalidKeySigningKeyStatus,
    InvalidKMSArn,
    KeySigningKeyWithActiveStatusNotFound,
    NoSuchHostedZone,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableHostedZoneDNSSEC",
}));

export type GetAccountLimitError = InvalidInput | CommonErrors;
/**
 * Gets the specified limit for the current account, for example, the maximum number of
 * health checks that you can create using the account.
 *
 * For the default limit, see Limits in the
 * *Amazon Route 53 Developer Guide*. To request a higher limit,
 * open a case.
 *
 * You can also view account limits in Amazon Web Services Trusted Advisor. Sign in to
 * the Amazon Web Services Management Console and open the Trusted Advisor console at https://console.aws.amazon.com/trustedadvisor/. Then choose **Service limits** in the navigation pane.
 */
export const getAccountLimit: API.OperationMethod<
  GetAccountLimitRequest,
  GetAccountLimitResponse,
  GetAccountLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(696, __c87, 0) as any as S.Schema<GetAccountLimitRequest>,
  output: __S(698, __c87, 2) as any as S.Schema<GetAccountLimitResponse>,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountLimit",
}));

export type GetChangeError = InvalidInput | NoSuchChange | CommonErrors;
/**
 * Returns the current status of a change batch request. The status is one of the
 * following values:
 *
 * - `PENDING` indicates that the changes in this request have not
 * propagated to all Amazon Route 53 DNS servers managing the hosted zone. This is the initial status of all
 * change batch requests.
 *
 * - `INSYNC` indicates that the changes have propagated to all Route 53
 * DNS servers managing the hosted zone.
 */
export const getChange: API.OperationMethod<
  GetChangeRequest,
  GetChangeResponse,
  GetChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c88, 0) as any as S.Schema<GetChangeRequest>,
  output: __S(705, __c88, 1) as any as S.Schema<GetChangeResponse>,
  errors: [InvalidInput, NoSuchChange],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChange",
}));

export type GetCheckerIpRangesError = CommonErrors;
/**
 * Route 53 does not perform authorization for this API because it retrieves information
 * that is already available to the public.
 *
 * `GetCheckerIpRanges` still works, but we recommend that you download
 * ip-ranges.json, which includes IP address ranges for all Amazon Web Services
 * services. For more information, see IP Address Ranges
 * of Amazon Route 53 Servers in the Amazon Route 53 Developer
 * Guide.
 */
export const getCheckerIpRanges: API.OperationMethod<
  GetCheckerIpRangesRequest,
  GetCheckerIpRangesResponse,
  GetCheckerIpRangesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(712, __c89, 0) as any as S.Schema<GetCheckerIpRangesRequest>,
  output: __S(714, __c89, 2) as any as S.Schema<GetCheckerIpRangesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCheckerIpRanges",
}));

export type GetDNSSECError = InvalidArgument | InvalidInput | NoSuchHostedZone | CommonErrors;
/**
 * Returns information about DNSSEC for a specific hosted zone, including the key-signing
 * keys (KSKs) in the hosted zone.
 */
export const getDNSSEC: API.OperationMethod<
  GetDNSSECRequest,
  GetDNSSECResponse,
  GetDNSSECError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetDNSSECRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<GetDNSSECResponse>,
  errors: [InvalidArgument, InvalidInput, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDNSSEC",
}));

export type GetGeoLocationError = InvalidInput | NoSuchGeoLocation | CommonErrors;
/**
 * Gets information about whether a specified geographic location is supported for Amazon
 * Route 53 geolocation resource record sets.
 *
 * Route 53 does not perform authorization for this API because it retrieves information
 * that is already available to the public.
 *
 * Use the following syntax to determine whether a continent is supported for
 * geolocation:
 *
 * GET /2013-04-01/geolocation?continentcode=two-letter abbreviation for
 * a continent
 *
 * Use the following syntax to determine whether a country is supported for
 * geolocation:
 *
 * GET /2013-04-01/geolocation?countrycode=two-character country
 * code
 *
 * Use the following syntax to determine whether a subdivision of a country is supported
 * for geolocation:
 *
 * GET /2013-04-01/geolocation?countrycode=two-character country
 * code&subdivisioncode=subdivision
 * code
 */
export const getGeoLocation: API.OperationMethod<
  GetGeoLocationRequest,
  GetGeoLocationResponse,
  GetGeoLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<GetGeoLocationRequest>,
  output: __S(9, __c1, 1) as any as S.Schema<GetGeoLocationResponse>,
  errors: [InvalidInput, NoSuchGeoLocation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGeoLocation",
}));

export type GetHealthCheckError =
  | IncompatibleVersion
  | InvalidInput
  | NoSuchHealthCheck
  | CommonErrors;
/**
 * Gets information about a specified health check.
 */
export const getHealthCheck: API.OperationMethod<
  GetHealthCheckRequest,
  GetHealthCheckResponse,
  GetHealthCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<GetHealthCheckRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<GetHealthCheckResponse>,
  errors: [IncompatibleVersion, InvalidInput, NoSuchHealthCheck],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHealthCheck",
}));

export type GetHealthCheckCountError = CommonErrors;
/**
 * Retrieves the number of health checks that are associated with the current Amazon Web Services account.
 */
export const getHealthCheckCount: API.OperationMethod<
  GetHealthCheckCountRequest,
  GetHealthCheckCountResponse,
  GetHealthCheckCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<GetHealthCheckCountRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<GetHealthCheckCountResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHealthCheckCount",
}));

export type GetHealthCheckLastFailureReasonError = InvalidInput | NoSuchHealthCheck | CommonErrors;
/**
 * Gets the reason that a specified health check failed most recently.
 */
export const getHealthCheckLastFailureReason: API.OperationMethod<
  GetHealthCheckLastFailureReasonRequest,
  GetHealthCheckLastFailureReasonResponse,
  GetHealthCheckLastFailureReasonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<GetHealthCheckLastFailureReasonRequest>,
  output: __S(41, __c5, 1) as any as S.Schema<GetHealthCheckLastFailureReasonResponse>,
  errors: [InvalidInput, NoSuchHealthCheck],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHealthCheckLastFailureReason",
}));

export type GetHealthCheckStatusError = InvalidInput | NoSuchHealthCheck | CommonErrors;
/**
 * Gets status of a specified health check.
 *
 * This API is intended for use during development to diagnose behavior. It doesn't
 * support production use-cases with high query rates that require immediate and
 * actionable responses.
 */
export const getHealthCheckStatus: API.OperationMethod<
  GetHealthCheckStatusRequest,
  GetHealthCheckStatusResponse,
  GetHealthCheckStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<GetHealthCheckStatusRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<GetHealthCheckStatusResponse>,
  errors: [InvalidInput, NoSuchHealthCheck],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHealthCheckStatus",
}));

export type GetHostedZoneError = InvalidInput | NoSuchHostedZone | CommonErrors;
/**
 * Gets information about a specified hosted zone including the four name servers
 * assigned to the hosted zone.
 *
 * `` returns the VPCs associated with the specified hosted zone and does not reflect the VPC
 * associations by Route 53 Profiles. To get the associations to a Profile, call the ListProfileAssociations API.
 */
export const getHostedZone: API.OperationMethod<
  GetHostedZoneRequest,
  GetHostedZoneResponse,
  GetHostedZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<GetHostedZoneRequest>,
  output: __S(65, __c8, 1) as any as S.Schema<GetHostedZoneResponse>,
  errors: [InvalidInput, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHostedZone",
}));

export type GetHostedZoneCountError = InvalidInput | CommonErrors;
/**
 * Retrieves the number of hosted zones that are associated with the current Amazon Web Services account.
 */
export const getHostedZoneCount: API.OperationMethod<
  GetHostedZoneCountRequest,
  GetHostedZoneCountResponse,
  GetHostedZoneCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetHostedZoneCountRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<GetHostedZoneCountResponse>,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHostedZoneCount",
}));

export type GetHostedZoneLimitError =
  | HostedZoneNotPrivate
  | InvalidInput
  | NoSuchHostedZone
  | CommonErrors;
/**
 * Gets the specified limit for a specified hosted zone, for example, the maximum number
 * of records that you can create in the hosted zone.
 *
 * For the default limit, see Limits in the
 * *Amazon Route 53 Developer Guide*. To request a higher limit,
 * open a case.
 */
export const getHostedZoneLimit: API.OperationMethod<
  GetHostedZoneLimitRequest,
  GetHostedZoneLimitResponse,
  GetHostedZoneLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<GetHostedZoneLimitRequest>,
  output: __S(90, __c11, 2) as any as S.Schema<GetHostedZoneLimitResponse>,
  errors: [HostedZoneNotPrivate, InvalidInput, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHostedZoneLimit",
}));

export type GetQueryLoggingConfigError = InvalidInput | NoSuchQueryLoggingConfig | CommonErrors;
/**
 * Gets information about a specified configuration for DNS query logging.
 *
 * For more information about DNS query logs, see CreateQueryLoggingConfig and Logging DNS
 * Queries.
 */
export const getQueryLoggingConfig: API.OperationMethod<
  GetQueryLoggingConfigRequest,
  GetQueryLoggingConfigResponse,
  GetQueryLoggingConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<GetQueryLoggingConfigRequest>,
  output: __S(97, __c12, 1) as any as S.Schema<GetQueryLoggingConfigResponse>,
  errors: [InvalidInput, NoSuchQueryLoggingConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryLoggingConfig",
}));

export type GetReusableDelegationSetError =
  | DelegationSetNotReusable
  | InvalidInput
  | NoSuchDelegationSet
  | CommonErrors;
/**
 * Retrieves information about a specified reusable delegation set, including the four
 * name servers that are assigned to the delegation set.
 */
export const getReusableDelegationSet: API.OperationMethod<
  GetReusableDelegationSetRequest,
  GetReusableDelegationSetResponse,
  GetReusableDelegationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<GetReusableDelegationSetRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<GetReusableDelegationSetResponse>,
  errors: [DelegationSetNotReusable, InvalidInput, NoSuchDelegationSet],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReusableDelegationSet",
}));

export type GetReusableDelegationSetLimitError = InvalidInput | NoSuchDelegationSet | CommonErrors;
/**
 * Gets the maximum number of hosted zones that you can associate with the specified
 * reusable delegation set.
 *
 * For the default limit, see Limits in the
 * *Amazon Route 53 Developer Guide*. To request a higher limit,
 * open a case.
 */
export const getReusableDelegationSetLimit: API.OperationMethod<
  GetReusableDelegationSetLimitRequest,
  GetReusableDelegationSetLimitResponse,
  GetReusableDelegationSetLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<GetReusableDelegationSetLimitRequest>,
  output: __S(114, __c14, 2) as any as S.Schema<GetReusableDelegationSetLimitResponse>,
  errors: [InvalidInput, NoSuchDelegationSet],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReusableDelegationSetLimit",
}));

export type GetTrafficPolicyError = InvalidInput | NoSuchTrafficPolicy | CommonErrors;
/**
 * Gets information about a specific traffic policy version.
 *
 * For information about how of deleting a traffic policy affects the response from
 * `GetTrafficPolicy`, see DeleteTrafficPolicy.
 */
export const getTrafficPolicy: API.OperationMethod<
  GetTrafficPolicyRequest,
  GetTrafficPolicyResponse,
  GetTrafficPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<GetTrafficPolicyRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<GetTrafficPolicyResponse>,
  errors: [InvalidInput, NoSuchTrafficPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrafficPolicy",
}));

export type GetTrafficPolicyInstanceError =
  | InvalidInput
  | NoSuchTrafficPolicyInstance
  | CommonErrors;
/**
 * Gets information about a specified traffic policy instance.
 *
 * Use `GetTrafficPolicyInstance` with the `id` of new traffic policy instance to confirm that the
 * `CreateTrafficPolicyInstance` or an `UpdateTrafficPolicyInstance` request completed successfully.
 * For more information, see the `State` response
 * element.
 *
 * In the Route 53 console, traffic policy instances are known as policy
 * records.
 */
export const getTrafficPolicyInstance: API.OperationMethod<
  GetTrafficPolicyInstanceRequest,
  GetTrafficPolicyInstanceResponse,
  GetTrafficPolicyInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<GetTrafficPolicyInstanceRequest>,
  output: __S(129, __c16, 1) as any as S.Schema<GetTrafficPolicyInstanceResponse>,
  errors: [InvalidInput, NoSuchTrafficPolicyInstance],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrafficPolicyInstance",
}));

export type GetTrafficPolicyInstanceCountError = CommonErrors;
/**
 * Gets the number of traffic policy instances that are associated with the current
 * Amazon Web Services account.
 */
export const getTrafficPolicyInstanceCount: API.OperationMethod<
  GetTrafficPolicyInstanceCountRequest,
  GetTrafficPolicyInstanceCountResponse,
  GetTrafficPolicyInstanceCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<GetTrafficPolicyInstanceCountRequest>,
  output: __S(137, __c17, 1) as any as S.Schema<GetTrafficPolicyInstanceCountResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrafficPolicyInstanceCount",
}));

export type ListCidrBlocksError =
  | InvalidInput
  | NoSuchCidrCollectionException
  | NoSuchCidrLocationException
  | CommonErrors;
/**
 * Returns a paginated list of location objects and their CIDR blocks.
 */
export const listCidrBlocks: API.PaginatedOperationMethod<
  ListCidrBlocksRequest,
  ListCidrBlocksResponse,
  ListCidrBlocksError,
  Credentials | HttpClient.HttpClient,
  CidrBlockSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<ListCidrBlocksRequest>,
  output: __S(147, __c18, 3) as any as S.Schema<ListCidrBlocksResponse>,
  errors: [InvalidInput, NoSuchCidrCollectionException, NoSuchCidrLocationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCidrBlocks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CidrBlocks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCidrCollectionsError = InvalidInput | CommonErrors;
/**
 * Returns a paginated list of CIDR collections in the Amazon Web Services account
 * (metadata only).
 */
export const listCidrCollections: API.PaginatedOperationMethod<
  ListCidrCollectionsRequest,
  ListCidrCollectionsResponse,
  ListCidrCollectionsError,
  Credentials | HttpClient.HttpClient,
  CollectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<ListCidrCollectionsRequest>,
  output: __S(155, __c19, 3) as any as S.Schema<ListCidrCollectionsResponse>,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCidrCollections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CidrCollections",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCidrLocationsError = InvalidInput | NoSuchCidrCollectionException | CommonErrors;
/**
 * Returns a paginated list of CIDR locations for the given collection (metadata only,
 * does not include CIDR blocks).
 */
export const listCidrLocations: API.PaginatedOperationMethod<
  ListCidrLocationsRequest,
  ListCidrLocationsResponse,
  ListCidrLocationsError,
  Credentials | HttpClient.HttpClient,
  LocationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<ListCidrLocationsRequest>,
  output: __S(163, __c20, 3) as any as S.Schema<ListCidrLocationsResponse>,
  errors: [InvalidInput, NoSuchCidrCollectionException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCidrLocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CidrLocations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGeoLocationsError = InvalidInput | CommonErrors;
/**
 * Retrieves a list of supported geographic locations.
 *
 * Countries are listed first, and continents are listed last. If Amazon Route 53
 * supports subdivisions for a country (for example, states or provinces), the subdivisions
 * for that country are listed in alphabetical order immediately after the corresponding
 * country.
 *
 * Route 53 does not perform authorization for this API because it retrieves information
 * that is already available to the public.
 *
 * For a list of supported geolocation codes, see the GeoLocation data
 * type.
 */
export const listGeoLocations: API.OperationMethod<
  ListGeoLocationsRequest,
  ListGeoLocationsResponse,
  ListGeoLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<ListGeoLocationsRequest>,
  output: __S(170, __c21, 2) as any as S.Schema<ListGeoLocationsResponse>,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGeoLocations",
}));

export type ListHealthChecksError = IncompatibleVersion | InvalidInput | CommonErrors;
/**
 * Retrieve a list of the health checks that are associated with the current Amazon Web Services account.
 */
export const listHealthChecks: API.PaginatedOperationMethod<
  ListHealthChecksRequest,
  ListHealthChecksResponse,
  ListHealthChecksError,
  Credentials | HttpClient.HttpClient,
  HealthCheck
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<ListHealthChecksRequest>,
  output: __S(178, __c22, 2) as any as S.Schema<ListHealthChecksResponse>,
  errors: [IncompatibleVersion, InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHealthChecks",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "HealthChecks",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListHostedZonesError =
  | DelegationSetNotReusable
  | InvalidInput
  | NoSuchDelegationSet
  | CommonErrors;
/**
 * Retrieves a list of the public and private hosted zones that are associated with the
 * current Amazon Web Services account. The response includes a `HostedZones`
 * child element for each hosted zone.
 *
 * Amazon Route 53 returns a maximum of 100 items in each response. If you have a lot of
 * hosted zones, you can use the `maxitems` parameter to list them in groups of
 * up to 100.
 */
export const listHostedZones: API.PaginatedOperationMethod<
  ListHostedZonesRequest,
  ListHostedZonesResponse,
  ListHostedZonesError,
  Credentials | HttpClient.HttpClient,
  HostedZone
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<ListHostedZonesRequest>,
  output: __S(185, __c23, 1) as any as S.Schema<ListHostedZonesResponse>,
  errors: [DelegationSetNotReusable, InvalidInput, NoSuchDelegationSet],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHostedZones",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "HostedZones",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListHostedZonesByNameError = InvalidDomainName | InvalidInput | CommonErrors;
/**
 * Retrieves a list of your hosted zones in lexicographic order. The response includes a
 * `HostedZones` child element for each hosted zone created by the current
 * Amazon Web Services account.
 *
 * `ListHostedZonesByName` sorts hosted zones by name with the labels
 * reversed. For example:
 *
 * `com.example.www.`
 *
 * Note the trailing dot, which can change the sort order in some circumstances.
 *
 * If the domain name includes escape characters or Punycode,
 * `ListHostedZonesByName` alphabetizes the domain name using the escaped or
 * Punycoded value, which is the format that Amazon Route 53 saves in its database. For
 * example, to create a hosted zone for exämple.com, you specify ex\344mple.com for
 * the domain name. `ListHostedZonesByName` alphabetizes it as:
 *
 * `com.ex\344mple.`
 *
 * The labels are reversed and alphabetized using the escaped value. For more information
 * about valid domain name formats, including internationalized domain names, see DNS
 * Domain Name Format in the Amazon Route 53 Developer
 * Guide.
 *
 * Route 53 returns up to 100 items in each response. If you have a lot of hosted zones,
 * use the `MaxItems` parameter to list them in groups of up to 100. The
 * response includes values that help navigate from one group of `MaxItems`
 * hosted zones to the next:
 *
 * - The `DNSName` and `HostedZoneId` elements in the
 * response contain the values, if any, specified for the `dnsname` and
 * `hostedzoneid` parameters in the request that produced the
 * current response.
 *
 * - The `MaxItems` element in the response contains the value, if any,
 * that you specified for the `maxitems` parameter in the request that
 * produced the current response.
 *
 * - If the value of `IsTruncated` in the response is true, there are
 * more hosted zones associated with the current Amazon Web Services account.
 *
 * If `IsTruncated` is false, this response includes the last hosted
 * zone that is associated with the current account. The `NextDNSName`
 * element and `NextHostedZoneId` elements are omitted from the
 * response.
 *
 * - The `NextDNSName` and `NextHostedZoneId` elements in the
 * response contain the domain name and the hosted zone ID of the next hosted zone
 * that is associated with the current Amazon Web Services account. If you want to
 * list more hosted zones, make another call to `ListHostedZonesByName`,
 * and specify the value of `NextDNSName` and
 * `NextHostedZoneId` in the `dnsname` and
 * `hostedzoneid` parameters, respectively.
 */
export const listHostedZonesByName: API.OperationMethod<
  ListHostedZonesByNameRequest,
  ListHostedZonesByNameResponse,
  ListHostedZonesByNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<ListHostedZonesByNameRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<ListHostedZonesByNameResponse>,
  errors: [InvalidDomainName, InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHostedZonesByName",
}));

export type ListHostedZonesByVPCError = InvalidInput | InvalidPaginationToken | CommonErrors;
/**
 * Lists all the private hosted zones that a specified VPC is associated with, regardless
 * of which Amazon Web Services account or Amazon Web Services service owns the hosted zones.
 * The `HostedZoneOwner` structure in the response contains one of the following
 * values:
 *
 * - An `OwningAccount` element, which contains the account number of
 * either the current Amazon Web Services account or another Amazon Web Services account. Some services, such as Cloud Map, create
 * hosted zones using the current account.
 *
 * - An `OwningService` element, which identifies the Amazon Web Services
 * service that created and owns the hosted zone. For example, if a hosted zone was
 * created by Amazon Elastic File System (Amazon EFS), the value of
 * `Owner` is `efs.amazonaws.com`.
 *
 * `ListHostedZonesByVPC` returns the hosted zones associated with the specified VPC and does not reflect the hosted zone
 * associations to VPCs via Route 53 Profiles. To get the associations to a Profile, call the ListProfileResourceAssociations API.
 *
 * When listing private hosted zones, the hosted zone and the Amazon VPC must
 * belong to the same partition where the hosted zones were created. A partition is a
 * group of Amazon Web Services Regions. Each Amazon Web Services account is scoped to
 * one partition.
 *
 * The following are the supported partitions:
 *
 * - `aws` - Amazon Web Services Regions
 *
 * - `aws-cn` - China Regions
 *
 * - `aws-us-gov` - Amazon Web Services GovCloud (US) Region
 *
 * For more information, see Access Management
 * in the *Amazon Web Services General Reference*.
 */
export const listHostedZonesByVPC: API.OperationMethod<
  ListHostedZonesByVPCRequest,
  ListHostedZonesByVPCResponse,
  ListHostedZonesByVPCError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<ListHostedZonesByVPCRequest>,
  output: __S(212, __c26, 4) as any as S.Schema<ListHostedZonesByVPCResponse>,
  errors: [InvalidInput, InvalidPaginationToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHostedZonesByVPC",
}));

export type ListQueryLoggingConfigsError =
  | InvalidInput
  | InvalidPaginationToken
  | NoSuchHostedZone
  | CommonErrors;
/**
 * Lists the configurations for DNS query logging that are associated with the current
 * Amazon Web Services account or the configuration that is associated with a specified
 * hosted zone.
 *
 * For more information about DNS query logs, see CreateQueryLoggingConfig. Additional information, including the format of
 * DNS query logs, appears in Logging DNS Queries in
 * the *Amazon Route 53 Developer Guide*.
 */
export const listQueryLoggingConfigs: API.PaginatedOperationMethod<
  ListQueryLoggingConfigsRequest,
  ListQueryLoggingConfigsResponse,
  ListQueryLoggingConfigsError,
  Credentials | HttpClient.HttpClient,
  QueryLoggingConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<ListQueryLoggingConfigsRequest>,
  output: __S(218, __c27, 2) as any as S.Schema<ListQueryLoggingConfigsResponse>,
  errors: [InvalidInput, InvalidPaginationToken, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueryLoggingConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "QueryLoggingConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceRecordSetsError = InvalidInput | NoSuchHostedZone | CommonErrors;
/**
 * Lists the resource record sets in a specified hosted zone.
 *
 * `ListResourceRecordSets` returns up to 300 resource record sets at a time
 * in ASCII order, beginning at a position specified by the `name` and
 * `type` elements.
 *
 * **Sort order**
 *
 * `ListResourceRecordSets` sorts results first by DNS name with the labels
 * reversed, for example:
 *
 * `com.example.www.`
 *
 * Note the trailing dot, which can change the sort order when the record name contains
 * characters that appear before `.` (decimal 46) in the ASCII table. These
 * characters include the following: `! " # $ % & ' ( ) * + , -`
 *
 * When multiple records have the same DNS name, `ListResourceRecordSets`
 * sorts results by the record type.
 *
 * **Specifying where to start listing records**
 *
 * You can use the name and type elements to specify the resource record set that the
 * list begins with:
 *
 * ### If you do not specify Name or Type
 *
 * The results begin with the first resource record set that the hosted zone
 * contains.
 *
 * ### If you specify Name but not Type
 *
 * The results begin with the first resource record set in the list whose
 * name is greater than or equal to `Name`.
 *
 * ### If you specify Type but not Name
 *
 * Amazon Route 53 returns the `InvalidInput` error.
 *
 * ### If you specify both Name and Type
 *
 * The results begin with the first resource record set in the list whose
 * name is greater than or equal to `Name`, and whose type is
 * greater than or equal to `Type`.
 *
 * Type is only used to sort between records with the same record Name.
 *
 * **Resource record sets that are PENDING**
 *
 * This action returns the most current version of the records. This includes records
 * that are `PENDING`, and that are not yet available on all Route 53 DNS
 * servers.
 *
 * **Changing resource record sets**
 *
 * To ensure that you get an accurate listing of the resource record sets for a hosted
 * zone at a point in time, do not submit a `ChangeResourceRecordSets` request
 * while you're paging through the results of a `ListResourceRecordSets`
 * request. If you do, some pages may display results without the latest changes while
 * other pages display results with the latest changes.
 *
 * **Displaying the next page of results**
 *
 * If a `ListResourceRecordSets` command returns more than one page of
 * results, the value of `IsTruncated` is `true`. To display the next
 * page of results, get the values of `NextRecordName`,
 * `NextRecordType`, and `NextRecordIdentifier` (if any) from the
 * response. Then submit another `ListResourceRecordSets` request, and specify
 * those values for `StartRecordName`, `StartRecordType`, and
 * `StartRecordIdentifier`.
 */
export const listResourceRecordSets: API.OperationMethod<
  ListResourceRecordSetsRequest,
  ListResourceRecordSetsResponse,
  ListResourceRecordSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<ListResourceRecordSetsRequest>,
  output: __S(226, __c28, 2) as any as S.Schema<ListResourceRecordSetsResponse>,
  errors: [InvalidInput, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceRecordSets",
}));

export type ListReusableDelegationSetsError = InvalidInput | CommonErrors;
/**
 * Retrieves a list of the reusable delegation sets that are associated with the current
 * Amazon Web Services account.
 */
export const listReusableDelegationSets: API.OperationMethod<
  ListReusableDelegationSetsRequest,
  ListReusableDelegationSetsResponse,
  ListReusableDelegationSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<ListReusableDelegationSetsRequest>,
  output: __S(234, __c29, 2) as any as S.Schema<ListReusableDelegationSetsResponse>,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReusableDelegationSets",
}));

export type ListTagsForResourceError =
  | InvalidInput
  | NoSuchHealthCheck
  | NoSuchHostedZone
  | PriorRequestNotComplete
  | ThrottlingException
  | CommonErrors;
/**
 * Lists tags for one health check or hosted zone.
 *
 * For information about using tags for cost allocation, see Using Cost Allocation
 * Tags in the *Billing and Cost Management User Guide*.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InvalidInput,
    NoSuchHealthCheck,
    NoSuchHostedZone,
    PriorRequestNotComplete,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTagsForResourcesError =
  | InvalidInput
  | NoSuchHealthCheck
  | NoSuchHostedZone
  | PriorRequestNotComplete
  | ThrottlingException
  | CommonErrors;
/**
 * Lists tags for up to 10 health checks or hosted zones.
 *
 * For information about using tags for cost allocation, see Using Cost Allocation
 * Tags in the *Billing and Cost Management User Guide*.
 */
export const listTagsForResources: API.OperationMethod<
  ListTagsForResourcesRequest,
  ListTagsForResourcesResponse,
  ListTagsForResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(257, __c32, 1) as any as S.Schema<ListTagsForResourcesRequest>,
  output: __S(259, __c32, 3) as any as S.Schema<ListTagsForResourcesResponse>,
  errors: [
    InvalidInput,
    NoSuchHealthCheck,
    NoSuchHostedZone,
    PriorRequestNotComplete,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResources",
}));

export type ListTrafficPoliciesError = InvalidInput | CommonErrors;
/**
 * Gets information about the latest version for every traffic policy that is associated
 * with the current Amazon Web Services account. Policies are listed in the order that they
 * were created in.
 *
 * For information about how of deleting a traffic policy affects the response from
 * `ListTrafficPolicies`, see DeleteTrafficPolicy.
 */
export const listTrafficPolicies: API.OperationMethod<
  ListTrafficPoliciesRequest,
  ListTrafficPoliciesResponse,
  ListTrafficPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<ListTrafficPoliciesRequest>,
  output: __S(267, __c33, 3) as any as S.Schema<ListTrafficPoliciesResponse>,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicies",
}));

export type ListTrafficPolicyInstancesError =
  | InvalidInput
  | NoSuchTrafficPolicyInstance
  | CommonErrors;
/**
 * Gets information about the traffic policy instances that you created by using the
 * current Amazon Web Services account.
 *
 * After you submit an `UpdateTrafficPolicyInstance` request, there's a
 * brief delay while Amazon Route 53 creates the resource record sets that are
 * specified in the traffic policy definition. For more information, see the
 * `State` response element.
 *
 * Route 53 returns a maximum of 100 items in each response. If you have a lot of traffic
 * policy instances, you can use the `MaxItems` parameter to list them in groups
 * of up to 100.
 */
export const listTrafficPolicyInstances: API.OperationMethod<
  ListTrafficPolicyInstancesRequest,
  ListTrafficPolicyInstancesResponse,
  ListTrafficPolicyInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<ListTrafficPolicyInstancesRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<ListTrafficPolicyInstancesResponse>,
  errors: [InvalidInput, NoSuchTrafficPolicyInstance],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicyInstances",
}));

export type ListTrafficPolicyInstancesByHostedZoneError =
  | InvalidInput
  | NoSuchHostedZone
  | NoSuchTrafficPolicyInstance
  | CommonErrors;
/**
 * Gets information about the traffic policy instances that you created in a specified
 * hosted zone.
 *
 * After you submit a `CreateTrafficPolicyInstance` or an
 * `UpdateTrafficPolicyInstance` request, there's a brief delay while
 * Amazon Route 53 creates the resource record sets that are specified in the traffic
 * policy definition. For more information, see the `State` response
 * element.
 *
 * Route 53 returns a maximum of 100 items in each response. If you have a lot of traffic
 * policy instances, you can use the `MaxItems` parameter to list them in groups
 * of up to 100.
 */
export const listTrafficPolicyInstancesByHostedZone: API.OperationMethod<
  ListTrafficPolicyInstancesByHostedZoneRequest,
  ListTrafficPolicyInstancesByHostedZoneResponse,
  ListTrafficPolicyInstancesByHostedZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<ListTrafficPolicyInstancesByHostedZoneRequest>,
  output: __S(289, __c36, 1) as any as S.Schema<ListTrafficPolicyInstancesByHostedZoneResponse>,
  errors: [InvalidInput, NoSuchHostedZone, NoSuchTrafficPolicyInstance],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicyInstancesByHostedZone",
}));

export type ListTrafficPolicyInstancesByPolicyError =
  | InvalidInput
  | NoSuchTrafficPolicy
  | NoSuchTrafficPolicyInstance
  | CommonErrors;
/**
 * Gets information about the traffic policy instances that you created by using a
 * specify traffic policy version.
 *
 * After you submit a `CreateTrafficPolicyInstance` or an
 * `UpdateTrafficPolicyInstance` request, there's a brief delay while
 * Amazon Route 53 creates the resource record sets that are specified in the traffic
 * policy definition. For more information, see the `State` response
 * element.
 *
 * Route 53 returns a maximum of 100 items in each response. If you have a lot of traffic
 * policy instances, you can use the `MaxItems` parameter to list them in groups
 * of up to 100.
 */
export const listTrafficPolicyInstancesByPolicy: API.OperationMethod<
  ListTrafficPolicyInstancesByPolicyRequest,
  ListTrafficPolicyInstancesByPolicyResponse,
  ListTrafficPolicyInstancesByPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<ListTrafficPolicyInstancesByPolicyRequest>,
  output: __S(297, __c37, 1) as any as S.Schema<ListTrafficPolicyInstancesByPolicyResponse>,
  errors: [InvalidInput, NoSuchTrafficPolicy, NoSuchTrafficPolicyInstance],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicyInstancesByPolicy",
}));

export type ListTrafficPolicyVersionsError = InvalidInput | NoSuchTrafficPolicy | CommonErrors;
/**
 * Gets information about all of the versions for a specified traffic policy.
 *
 * Traffic policy versions are listed in numerical order by
 * `VersionNumber`.
 */
export const listTrafficPolicyVersions: API.OperationMethod<
  ListTrafficPolicyVersionsRequest,
  ListTrafficPolicyVersionsResponse,
  ListTrafficPolicyVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<ListTrafficPolicyVersionsRequest>,
  output: __S(306, __c38, 2) as any as S.Schema<ListTrafficPolicyVersionsResponse>,
  errors: [InvalidInput, NoSuchTrafficPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicyVersions",
}));

export type ListVPCAssociationAuthorizationsError =
  | InvalidInput
  | InvalidPaginationToken
  | NoSuchHostedZone
  | CommonErrors;
/**
 * Gets a list of the VPCs that were created by other accounts and that can be associated
 * with a specified hosted zone because you've submitted one or more
 * `CreateVPCAssociationAuthorization` requests.
 *
 * The response includes a `VPCs` element with a `VPC` child
 * element for each VPC that can be associated with the hosted zone.
 */
export const listVPCAssociationAuthorizations: API.OperationMethod<
  ListVPCAssociationAuthorizationsRequest,
  ListVPCAssociationAuthorizationsResponse,
  ListVPCAssociationAuthorizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<ListVPCAssociationAuthorizationsRequest>,
  output: __S(313, __c39, 1) as any as S.Schema<ListVPCAssociationAuthorizationsResponse>,
  errors: [InvalidInput, InvalidPaginationToken, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVPCAssociationAuthorizations",
}));

export type TestDNSAnswerError = InvalidInput | NoSuchHostedZone | CommonErrors;
/**
 * Gets the value that Amazon Route 53 returns in response to a DNS request for a
 * specified record name and type. You can optionally specify the IP address of a DNS
 * resolver, an EDNS0 client subnet IP address, and a subnet mask.
 *
 * This call only supports querying public hosted zones.
 *
 * The `TestDnsAnswer ` returns information similar to what you would expect from the answer
 * section of the `dig` command. Therefore, if you query for the name
 * servers of a subdomain that point to the parent name servers, those will not be
 * returned.
 */
export const testDNSAnswer: API.OperationMethod<
  TestDNSAnswerRequest,
  TestDNSAnswerResponse,
  TestDNSAnswerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<TestDNSAnswerRequest>,
  output: __S(322, __c40, 2) as any as S.Schema<TestDNSAnswerResponse>,
  errors: [InvalidInput, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestDNSAnswer",
}));

export type UpdateHealthCheckError =
  | HealthCheckVersionMismatch
  | InvalidInput
  | NoSuchHealthCheck
  | CommonErrors;
/**
 * Updates an existing health check. Note that some values can't be updated.
 *
 * For more information about updating health checks, see Creating,
 * Updating, and Deleting Health Checks in the Amazon Route 53
 * Developer Guide.
 */
export const updateHealthCheck: API.OperationMethod<
  UpdateHealthCheckRequest,
  UpdateHealthCheckResponse,
  UpdateHealthCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(329, __c41, 1) as any as S.Schema<UpdateHealthCheckRequest>,
  output: __S(330, __c41, 2) as any as S.Schema<UpdateHealthCheckResponse>,
  errors: [HealthCheckVersionMismatch, InvalidInput, NoSuchHealthCheck],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHealthCheck",
}));

export type UpdateHostedZoneCommentError =
  | InvalidInput
  | NoSuchHostedZone
  | PriorRequestNotComplete
  | CommonErrors;
/**
 * Updates the comment for a specified hosted zone.
 */
export const updateHostedZoneComment: API.OperationMethod<
  UpdateHostedZoneCommentRequest,
  UpdateHostedZoneCommentResponse,
  UpdateHostedZoneCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<UpdateHostedZoneCommentRequest>,
  output: __S(337, __c42, 1) as any as S.Schema<UpdateHostedZoneCommentResponse>,
  errors: [InvalidInput, NoSuchHostedZone, PriorRequestNotComplete],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHostedZoneComment",
}));

export type UpdateHostedZoneFeaturesError =
  | InvalidInput
  | LimitsExceeded
  | NoSuchHostedZone
  | PriorRequestNotComplete
  | CommonErrors;
/**
 * Updates the features configuration for a hosted zone. This operation allows you to enable or disable specific features for your hosted zone, such as accelerated recovery.
 *
 * Accelerated recovery enables you to update DNS records in your public hosted zone even when the us-east-1 region is unavailable.
 */
export const updateHostedZoneFeatures: API.OperationMethod<
  UpdateHostedZoneFeaturesRequest,
  UpdateHostedZoneFeaturesResponse,
  UpdateHostedZoneFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<UpdateHostedZoneFeaturesRequest>,
  output: __S(345, __c43, 1) as any as S.Schema<UpdateHostedZoneFeaturesResponse>,
  errors: [InvalidInput, LimitsExceeded, NoSuchHostedZone, PriorRequestNotComplete],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHostedZoneFeatures",
}));

export type UpdateTrafficPolicyCommentError =
  | ConcurrentModification
  | InvalidInput
  | NoSuchTrafficPolicy
  | CommonErrors;
/**
 * Updates the comment for a specified traffic policy version.
 */
export const updateTrafficPolicyComment: API.OperationMethod<
  UpdateTrafficPolicyCommentRequest,
  UpdateTrafficPolicyCommentResponse,
  UpdateTrafficPolicyCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<UpdateTrafficPolicyCommentRequest>,
  output: __S(353, __c44, 1) as any as S.Schema<UpdateTrafficPolicyCommentResponse>,
  errors: [ConcurrentModification, InvalidInput, NoSuchTrafficPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrafficPolicyComment",
}));

export type UpdateTrafficPolicyInstanceError =
  | ConflictingTypes
  | InvalidInput
  | NoSuchTrafficPolicy
  | NoSuchTrafficPolicyInstance
  | PriorRequestNotComplete
  | CommonErrors;
/**
 * After you submit a `UpdateTrafficPolicyInstance` request, there's a brief delay while Route 53 creates the resource record sets
 * that are specified in the traffic policy definition. Use `GetTrafficPolicyInstance` with the `id` of updated traffic policy instance confirm
 * that the
 * `UpdateTrafficPolicyInstance` request completed successfully. For more information, see the `State` response element.
 *
 * Updates the resource record sets in a specified hosted zone that were created based on
 * the settings in a specified traffic policy version.
 *
 * When you update a traffic policy instance, Amazon Route 53 continues to respond to DNS
 * queries for the root resource record set name (such as example.com) while it replaces
 * one group of resource record sets with another. Route 53 performs the following
 * operations:
 *
 * - Route 53 creates a new group of resource record sets based on the specified
 * traffic policy. This is true regardless of how significant the differences are
 * between the existing resource record sets and the new resource record sets.
 *
 * - When all of the new resource record sets have been created, Route 53 starts to
 * respond to DNS queries for the root resource record set name (such as
 * example.com) by using the new resource record sets.
 *
 * - Route 53 deletes the old group of resource record sets that are associated
 * with the root resource record set name.
 */
export const updateTrafficPolicyInstance: API.OperationMethod<
  UpdateTrafficPolicyInstanceRequest,
  UpdateTrafficPolicyInstanceResponse,
  UpdateTrafficPolicyInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<UpdateTrafficPolicyInstanceRequest>,
  output: __S(361, __c45, 1) as any as S.Schema<UpdateTrafficPolicyInstanceResponse>,
  errors: [
    ConflictingTypes,
    InvalidInput,
    NoSuchTrafficPolicy,
    NoSuchTrafficPolicyInstance,
    PriorRequestNotComplete,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrafficPolicyInstance",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/hostedzone/{HostedZoneId}/dnssec" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDNSSECRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServeSignature: S.optional(S.String), StatusMessage: S.optional(S.String) }),
      ).annotate({ identifier: "DNSSECStatus" });
    case 2:
      return S.Array(__S(512, __c64, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({ Status: __S(1, __c0, 1), KeySigningKeys: __S(2, __c0, 2) }).pipe(ns),
      ).annotate({ identifier: "GetDNSSECResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContinentCode: S.optional(S.String).pipe(T.HttpQuery("continentcode")),
          CountryCode: S.optional(S.String).pipe(T.HttpQuery("countrycode")),
          SubdivisionCode: S.optional(S.String).pipe(T.HttpQuery("subdivisioncode")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/geolocation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGeoLocationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ GeoLocationDetails: __S(16, __c2, 0) }).pipe(ns)).annotate({
        identifier: "GetGeoLocationResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContinentCode: S.optional(S.String),
          ContinentName: S.optional(S.String),
          CountryCode: S.optional(S.String),
          CountryName: S.optional(S.String),
          SubdivisionCode: S.optional(S.String),
          SubdivisionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GeoLocationDetails" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HealthCheckId: S.String.pipe(T.HttpLabel("HealthCheckId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/healthcheck/{HealthCheckId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetHealthCheckRequest" });
    case 1:
      return S.suspend(() => S.Struct({ HealthCheck: __S(471, __c58, 7) }).pipe(ns)).annotate({
        identifier: "GetHealthCheckResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/healthcheckcount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetHealthCheckCountRequest" });
    case 1:
      return S.suspend(() => S.Struct({ HealthCheckCount: S.Number }).pipe(ns)).annotate({
        identifier: "GetHealthCheckCountResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HealthCheckId: S.String.pipe(T.HttpLabel("HealthCheckId")) }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2013-04-01/healthcheck/{HealthCheckId}/lastfailurereason",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetHealthCheckLastFailureReasonRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ HealthCheckObservations: __S(50, __c6, 2) }).pipe(ns),
      ).annotate({ identifier: "GetHealthCheckLastFailureReasonResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String), CheckedTime: S.optional(T.DateFromString) }),
      ).annotate({ identifier: "StatusReport" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Region: S.optional(S.String),
          IPAddress: S.optional(S.String),
          StatusReport: S.optional(__S(48, __c6, 0)),
        }),
      ).annotate({ identifier: "HealthCheckObservation" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(49, __c6, 1)
          .pipe(/*@__PURE__*/ T.XmlName("HealthCheckObservation"))
          .annotate({ identifier: "HealthCheckObservation" }),
      );
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HealthCheckId: S.String.pipe(T.HttpLabel("HealthCheckId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/healthcheck/{HealthCheckId}/status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetHealthCheckStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ HealthCheckObservations: __S(50, __c6, 2) }).pipe(ns),
      ).annotate({ identifier: "GetHealthCheckStatusResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/hostedzone/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetHostedZoneRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HostedZone: __S(491, __c61, 3),
          DelegationSet: S.optional(__S(497, __c62, 1)),
          VPCs: S.optional(__S(72, __c9, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetHostedZoneResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(400, __c50, 0)
          .pipe(/*@__PURE__*/ T.XmlName("VPC"))
          .annotate({ identifier: "VPC" }),
      );
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/hostedzonecount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetHostedZoneCountRequest" });
    case 1:
      return S.suspend(() => S.Struct({ HostedZoneCount: S.Number }).pipe(ns)).annotate({
        identifier: "GetHostedZoneCountResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.String.pipe(T.HttpLabel("Type")),
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/hostedzonelimit/{HostedZoneId}/{Type}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetHostedZoneLimitRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Type: S.String, Value: S.Number })).annotate({
        identifier: "HostedZoneLimit",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ Limit: __S(89, __c11, 1), Count: S.Number }).pipe(ns),
      ).annotate({ identifier: "GetHostedZoneLimitResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/queryloggingconfig/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueryLoggingConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ QueryLoggingConfig: __S(528, __c66, 0) }).pipe(ns),
      ).annotate({ identifier: "GetQueryLoggingConfigResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/delegationset/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetReusableDelegationSetRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DelegationSet: __S(497, __c62, 1) }).pipe(ns)).annotate({
        identifier: "GetReusableDelegationSetResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.String.pipe(T.HttpLabel("Type")),
          DelegationSetId: S.String.pipe(T.HttpLabel("DelegationSetId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2013-04-01/reusabledelegationsetlimit/{DelegationSetId}/{Type}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetReusableDelegationSetLimitRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Type: S.String, Value: S.Number })).annotate({
        identifier: "ReusableDelegationSetLimit",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ Limit: __S(113, __c14, 1), Count: S.Number }).pipe(ns),
      ).annotate({ identifier: "GetReusableDelegationSetLimitResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          Version: S.Number.pipe(T.HttpLabel("Version")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/trafficpolicy/{Id}/{Version}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTrafficPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TrafficPolicy: __S(552, __c69, 0) }).pipe(ns)).annotate({
        identifier: "GetTrafficPolicyResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/trafficpolicyinstance/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTrafficPolicyInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TrafficPolicyInstance: __S(568, __c71, 0) }).pipe(ns),
      ).annotate({ identifier: "GetTrafficPolicyInstanceResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/trafficpolicyinstancecount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTrafficPolicyInstanceCountRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TrafficPolicyInstanceCount: S.Number }).pipe(ns)).annotate({
        identifier: "GetTrafficPolicyInstanceCountResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CollectionId: S.String.pipe(T.HttpLabel("CollectionId")),
          LocationName: S.optional(S.String).pipe(T.HttpQuery("location")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nexttoken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxresults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/cidrcollection/{CollectionId}/cidrblocks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCidrBlocksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CidrBlock: S.optional(S.String), LocationName: S.optional(S.String) }),
      ).annotate({ identifier: "CidrBlockSummary" });
    case 2:
      return S.Array(__S(145, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          CidrBlocks: S.optional(__S(146, __c18, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListCidrBlocksResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nexttoken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxresults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/cidrcollection" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCidrCollectionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Version: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CollectionSummary" });
    case 2:
      return S.Array(__S(153, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          CidrCollections: S.optional(__S(154, __c19, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListCidrCollectionsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CollectionId: S.String.pipe(T.HttpLabel("CollectionId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nexttoken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxresults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/cidrcollection/{CollectionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCidrLocationsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ LocationName: S.optional(S.String) })).annotate({
        identifier: "LocationSummary",
      });
    case 2:
      return S.Array(__S(161, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          CidrLocations: S.optional(__S(162, __c20, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListCidrLocationsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartContinentCode: S.optional(S.String).pipe(T.HttpQuery("startcontinentcode")),
          StartCountryCode: S.optional(S.String).pipe(T.HttpQuery("startcountrycode")),
          StartSubdivisionCode: S.optional(S.String).pipe(T.HttpQuery("startsubdivisioncode")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/geolocations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGeoLocationsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(16, __c2, 0)
          .pipe(/*@__PURE__*/ T.XmlName("GeoLocationDetails"))
          .annotate({ identifier: "GeoLocationDetails" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          GeoLocationDetailsList: __S(169, __c21, 1),
          IsTruncated: S.Boolean,
          NextContinentCode: S.optional(S.String),
          NextCountryCode: S.optional(S.String),
          NextSubdivisionCode: S.optional(S.String),
          MaxItems: S.Number,
        }).pipe(ns),
      ).annotate({ identifier: "ListGeoLocationsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/healthcheck" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListHealthChecksRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(471, __c58, 7)
          .pipe(/*@__PURE__*/ T.XmlName("HealthCheck"))
          .annotate({ identifier: "HealthCheck" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          HealthChecks: S.optional(__S(177, __c22, 1)),
          Marker: S.optional(S.String),
          IsTruncated: S.Boolean,
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
        }).pipe(ns),
      ).annotate({ identifier: "ListHealthChecksResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
          DelegationSetId: S.optional(S.String).pipe(T.HttpQuery("delegationsetid")),
          HostedZoneType: S.optional(S.String).pipe(T.HttpQuery("hostedzonetype")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/hostedzone" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListHostedZonesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HostedZones: S.optional(__S(192, __c24, 0)),
          Marker: S.optional(S.String),
          IsTruncated: S.Boolean,
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
        }).pipe(ns),
      ).annotate({ identifier: "ListHostedZonesResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(491, __c61, 3)
          .pipe(/*@__PURE__*/ T.XmlName("HostedZone"))
          .annotate({ identifier: "HostedZone" }),
      );
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DNSName: S.optional(S.String).pipe(T.HttpQuery("dnsname")),
          HostedZoneId: S.optional(S.String).pipe(T.HttpQuery("hostedzoneid")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/hostedzonesbyname" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListHostedZonesByNameRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HostedZones: S.optional(__S(192, __c24, 0)),
          DNSName: S.optional(S.String),
          HostedZoneId: S.optional(S.String),
          IsTruncated: S.Boolean,
          NextDNSName: S.optional(S.String),
          NextHostedZoneId: S.optional(S.String),
          MaxItems: S.Number,
        }).pipe(ns),
      ).annotate({ identifier: "ListHostedZonesByNameResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VPCId: S.String.pipe(T.HttpQuery("vpcid")),
          VPCRegion: S.String.pipe(T.HttpQuery("vpcregion")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nexttoken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/hostedzonesbyvpc" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListHostedZonesByVPCRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ OwningAccount: S.optional(S.String), OwningService: S.optional(S.String) }),
      ).annotate({ identifier: "HostedZoneOwner" });
    case 2:
      return S.suspend(() =>
        S.Struct({ HostedZoneId: S.String, Name: S.String, Owner: __S(209, __c26, 1) }),
      ).annotate({ identifier: "HostedZoneSummary" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(210, __c26, 2)
          .pipe(/*@__PURE__*/ T.XmlName("HostedZoneSummary"))
          .annotate({ identifier: "HostedZoneSummary" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          HostedZoneSummaries: __S(211, __c26, 3),
          MaxItems: S.Number,
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListHostedZonesByVPCResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.optional(S.String).pipe(T.HttpQuery("hostedzoneid")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nexttoken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxresults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/queryloggingconfig" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQueryLoggingConfigsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(528, __c66, 0)
          .pipe(/*@__PURE__*/ T.XmlName("QueryLoggingConfig"))
          .annotate({ identifier: "QueryLoggingConfig" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          QueryLoggingConfigs: S.optional(__S(217, __c27, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListQueryLoggingConfigsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
          StartRecordName: S.optional(S.String).pipe(T.HttpQuery("name")),
          StartRecordType: S.optional(S.String).pipe(T.HttpQuery("type")),
          StartRecordIdentifier: S.optional(S.String).pipe(T.HttpQuery("identifier")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/hostedzone/{HostedZoneId}/rrset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceRecordSetsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(431, __c53, 7)
          .pipe(/*@__PURE__*/ T.XmlName("ResourceRecordSet"))
          .annotate({ identifier: "ResourceRecordSet" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceRecordSets: S.optional(__S(225, __c28, 1)),
          IsTruncated: S.Boolean,
          NextRecordName: S.optional(S.String),
          NextRecordType: S.optional(S.String),
          NextRecordIdentifier: S.optional(S.String),
          MaxItems: S.Number,
        }).pipe(ns),
      ).annotate({ identifier: "ListResourceRecordSetsResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/delegationset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListReusableDelegationSetsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(497, __c62, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DelegationSet"))
          .annotate({ identifier: "DelegationSet" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          DelegationSets: __S(233, __c29, 1),
          Marker: S.String,
          IsTruncated: S.Boolean,
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
        }).pipe(ns),
      ).annotate({ identifier: "ListReusableDelegationSetsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.String.pipe(T.HttpLabel("ResourceType")),
          ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/tags/{ResourceType}/{ResourceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ResourceTagSet: __S(248, __c31, 0) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          Tags: S.optional(__S(441, __c55, 1)),
        }),
      ).annotate({ identifier: "ResourceTagSet" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ResourceId")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.String.pipe(T.HttpLabel("ResourceType")),
          ResourceIds: __S(256, __c32, 0),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/tags/{ResourceType}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourcesRequest" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(248, __c31, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ResourceTagSet"))
          .annotate({ identifier: "ResourceTagSet" }),
      );
    case 3:
      return S.suspend(() => S.Struct({ ResourceTagSets: __S(258, __c32, 2) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourcesResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrafficPolicyIdMarker: S.optional(S.String).pipe(T.HttpQuery("trafficpolicyid")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/trafficpolicies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrafficPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.String,
          Type: S.String,
          LatestVersion: S.Number,
          TrafficPolicyCount: S.Number,
        }),
      ).annotate({ identifier: "TrafficPolicySummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(265, __c33, 1)
          .pipe(/*@__PURE__*/ T.XmlName("TrafficPolicySummary"))
          .annotate({ identifier: "TrafficPolicySummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          TrafficPolicySummaries: __S(266, __c33, 2),
          IsTruncated: S.Boolean,
          TrafficPolicyIdMarker: S.String,
          MaxItems: S.Number,
        }).pipe(ns),
      ).annotate({ identifier: "ListTrafficPoliciesResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneIdMarker: S.optional(S.String).pipe(T.HttpQuery("hostedzoneid")),
          TrafficPolicyInstanceNameMarker: S.optional(S.String).pipe(
            T.HttpQuery("trafficpolicyinstancename"),
          ),
          TrafficPolicyInstanceTypeMarker: S.optional(S.String).pipe(
            T.HttpQuery("trafficpolicyinstancetype"),
          ),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/trafficpolicyinstances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrafficPolicyInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrafficPolicyInstances: __S(280, __c35, 0),
          HostedZoneIdMarker: S.optional(S.String),
          TrafficPolicyInstanceNameMarker: S.optional(S.String),
          TrafficPolicyInstanceTypeMarker: S.optional(S.String),
          IsTruncated: S.Boolean,
          MaxItems: S.Number,
        }).pipe(ns),
      ).annotate({ identifier: "ListTrafficPolicyInstancesResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(568, __c71, 0)
          .pipe(/*@__PURE__*/ T.XmlName("TrafficPolicyInstance"))
          .annotate({ identifier: "TrafficPolicyInstance" }),
      );
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpQuery("id")),
          TrafficPolicyInstanceNameMarker: S.optional(S.String).pipe(
            T.HttpQuery("trafficpolicyinstancename"),
          ),
          TrafficPolicyInstanceTypeMarker: S.optional(S.String).pipe(
            T.HttpQuery("trafficpolicyinstancetype"),
          ),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/trafficpolicyinstances/hostedzone" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrafficPolicyInstancesByHostedZoneRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrafficPolicyInstances: __S(280, __c35, 0),
          TrafficPolicyInstanceNameMarker: S.optional(S.String),
          TrafficPolicyInstanceTypeMarker: S.optional(S.String),
          IsTruncated: S.Boolean,
          MaxItems: S.Number,
        }).pipe(ns),
      ).annotate({ identifier: "ListTrafficPolicyInstancesByHostedZoneResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrafficPolicyId: S.String.pipe(T.HttpQuery("id")),
          TrafficPolicyVersion: S.Number.pipe(T.HttpQuery("version")),
          HostedZoneIdMarker: S.optional(S.String).pipe(T.HttpQuery("hostedzoneid")),
          TrafficPolicyInstanceNameMarker: S.optional(S.String).pipe(
            T.HttpQuery("trafficpolicyinstancename"),
          ),
          TrafficPolicyInstanceTypeMarker: S.optional(S.String).pipe(
            T.HttpQuery("trafficpolicyinstancetype"),
          ),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/trafficpolicyinstances/trafficpolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrafficPolicyInstancesByPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrafficPolicyInstances: __S(280, __c35, 0),
          HostedZoneIdMarker: S.optional(S.String),
          TrafficPolicyInstanceNameMarker: S.optional(S.String),
          TrafficPolicyInstanceTypeMarker: S.optional(S.String),
          IsTruncated: S.Boolean,
          MaxItems: S.Number,
        }).pipe(ns),
      ).annotate({ identifier: "ListTrafficPolicyInstancesByPolicyResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          TrafficPolicyVersionMarker: S.optional(S.String).pipe(
            T.HttpQuery("trafficpolicyversion"),
          ),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxitems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/trafficpolicies/{Id}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrafficPolicyVersionsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(552, __c69, 0)
          .pipe(/*@__PURE__*/ T.XmlName("TrafficPolicy"))
          .annotate({ identifier: "TrafficPolicy" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          TrafficPolicies: __S(305, __c38, 1),
          IsTruncated: S.Boolean,
          TrafficPolicyVersionMarker: S.String,
          MaxItems: S.Number,
        }).pipe(ns),
      ).annotate({ identifier: "ListTrafficPolicyVersionsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nexttoken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxresults")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2013-04-01/hostedzone/{HostedZoneId}/authorizevpcassociation",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVPCAssociationAuthorizationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String,
          NextToken: S.optional(S.String),
          VPCs: S.optional(__S(72, __c9, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "ListVPCAssociationAuthorizationsResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpQuery("hostedzoneid")),
          RecordName: S.String.pipe(T.HttpQuery("recordname")),
          RecordType: S.String.pipe(T.HttpQuery("recordtype")),
          ResolverIP: S.optional(S.String).pipe(T.HttpQuery("resolverip")),
          EDNS0ClientSubnetIP: S.optional(S.String).pipe(T.HttpQuery("edns0clientsubnetip")),
          EDNS0ClientSubnetMask: S.optional(S.String).pipe(T.HttpQuery("edns0clientsubnetmask")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/testdnsanswer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TestDNSAnswerRequest" });
    case 1:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("RecordDataEntry")));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Nameserver: S.String,
          RecordName: S.String,
          RecordType: S.String,
          RecordData: __S(321, __c40, 1),
          ResponseCode: S.String,
          Protocol: S.String,
        }).pipe(ns),
      ).annotate({ identifier: "TestDNSAnswerResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ResettableElementName")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          HealthCheckId: S.String.pipe(T.HttpLabel("HealthCheckId")),
          HealthCheckVersion: S.optional(S.Number),
          IPAddress: S.optional(S.String),
          Port: S.optional(S.Number),
          ResourcePath: S.optional(S.String),
          FullyQualifiedDomainName: S.optional(S.String),
          SearchString: S.optional(S.String),
          FailureThreshold: S.optional(S.Number),
          Inverted: S.optional(S.Boolean),
          Disabled: S.optional(S.Boolean),
          HealthThreshold: S.optional(S.Number),
          ChildHealthChecks: S.optional(__S(464, __c58, 0)),
          EnableSNI: S.optional(S.Boolean),
          Regions: S.optional(__S(465, __c58, 1)),
          AlarmIdentifier: S.optional(__S(466, __c58, 2)),
          InsufficientDataHealthStatus: S.optional(S.String),
          ResetElements: S.optional(__S(328, __c41, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/healthcheck/{HealthCheckId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateHealthCheckRequest" });
    case 2:
      return S.suspend(() => S.Struct({ HealthCheck: __S(471, __c58, 7) }).pipe(ns)).annotate({
        identifier: "UpdateHealthCheckResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")), Comment: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/hostedzone/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateHostedZoneCommentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ HostedZone: __S(491, __c61, 3) }).pipe(ns)).annotate({
        identifier: "UpdateHostedZoneCommentResponse",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
          EnableAcceleratedRecovery: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/hostedzone/{HostedZoneId}/features" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateHostedZoneFeaturesRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateHostedZoneFeaturesResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          Version: S.Number.pipe(T.HttpLabel("Version")),
          Comment: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/trafficpolicy/{Id}/{Version}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTrafficPolicyCommentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TrafficPolicy: __S(552, __c69, 0) }).pipe(ns)).annotate({
        identifier: "UpdateTrafficPolicyCommentResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          TTL: S.Number,
          TrafficPolicyId: S.String,
          TrafficPolicyVersion: S.Number,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/trafficpolicyinstance/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTrafficPolicyInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TrafficPolicyInstance: __S(568, __c71, 0) }).pipe(ns),
      ).annotate({ identifier: "UpdateTrafficPolicyInstanceResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Message")));
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2013-04-01/keysigningkey/{HostedZoneId}/{Name}/activate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ActivateKeySigningKeyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ChangeInfo: __S(384, __c48, 0) }).pipe(ns)).annotate({
        identifier: "ActivateKeySigningKeyResponse",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Status: S.String,
          SubmittedAt: T.DateFromString,
          Comment: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChangeInfo" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
          VPC: __S(400, __c50, 0),
          Comment: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/hostedzone/{HostedZoneId}/associatevpc" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateVPCWithHostedZoneRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ChangeInfo: __S(384, __c48, 0) }).pipe(ns)).annotate({
        identifier: "AssociateVPCWithHostedZoneResponse",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VPCRegion: S.optional(S.String), VPCId: S.optional(S.String) }),
      ).annotate({ identifier: "VPC" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Cidr")));
    case 1:
      return S.suspend(() =>
        S.Struct({ LocationName: S.String, Action: S.String, CidrList: __S(408, __c51, 0) }),
      ).annotate({ identifier: "CidrCollectionChange" });
    case 2:
      return S.Array(__S(409, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          CollectionVersion: S.optional(S.Number),
          Changes: __S(410, __c51, 2),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/cidrcollection/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ChangeCidrCollectionRequest" });
    case 4:
      return S.suspend(() => S.Struct({ Id: S.String }).pipe(ns)).annotate({
        identifier: "ChangeCidrCollectionResponse",
      });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String, ResourceRecordSet: __S(431, __c53, 7) }),
      ).annotate({ identifier: "Change" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(416, __c52, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Change"))
          .annotate({ identifier: "Change" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Comment: S.optional(S.String), Changes: __S(417, __c52, 1) }),
      ).annotate({ identifier: "ChangeBatch" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
          ChangeBatch: __S(418, __c52, 2),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/hostedzone/{HostedZoneId}/rrset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ChangeResourceRecordSetsRequest" });
    case 4:
      return S.suspend(() => S.Struct({ ChangeInfo: __S(384, __c48, 0) }).pipe(ns)).annotate({
        identifier: "ChangeResourceRecordSetsResponse",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContinentCode: S.optional(S.String),
          CountryCode: S.optional(S.String),
          SubdivisionCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "GeoLocation" });
    case 1:
      return S.suspend(() => S.Struct({ Value: S.String })).annotate({
        identifier: "ResourceRecord",
      });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(425, __c53, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ResourceRecord"))
          .annotate({ identifier: "ResourceRecord" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ HostedZoneId: S.String, DNSName: S.String, EvaluateTargetHealth: S.Boolean }),
      ).annotate({ identifier: "AliasTarget" });
    case 4:
      return S.suspend(() => S.Struct({ CollectionId: S.String, LocationName: S.String })).annotate(
        { identifier: "CidrRoutingConfig" },
      );
    case 5:
      return S.suspend(() => S.Struct({ Latitude: S.String, Longitude: S.String })).annotate({
        identifier: "Coordinates",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          AWSRegion: S.optional(S.String),
          LocalZoneGroup: S.optional(S.String),
          Coordinates: S.optional(__S(429, __c53, 5)),
          Bias: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GeoProximityLocation" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Type: S.String,
          SetIdentifier: S.optional(S.String),
          Weight: S.optional(S.Number),
          Region: S.optional(S.String),
          GeoLocation: S.optional(__S(424, __c53, 0)),
          Failover: S.optional(S.String),
          MultiValueAnswer: S.optional(S.Boolean),
          TTL: S.optional(S.Number),
          ResourceRecords: S.optional(__S(426, __c53, 2)),
          AliasTarget: S.optional(__S(427, __c53, 3)),
          HealthCheckId: S.optional(S.String),
          TrafficPolicyInstanceId: S.optional(S.String),
          CidrRoutingConfig: S.optional(__S(428, __c53, 4)),
          GeoProximityLocation: S.optional(__S(430, __c53, 6)),
        }),
      ).annotate({ identifier: "ResourceRecordSet" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Key")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.String.pipe(T.HttpLabel("ResourceType")),
          ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
          AddTags: S.optional(__S(441, __c55, 1)),
          RemoveTagKeys: S.optional(__S(432, __c54, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/tags/{ResourceType}/{ResourceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ChangeTagsForResourceRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "ChangeTagsForResourceResponse",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(440, __c55, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "Tag" }),
      );
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, CallerReference: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/cidrcollection" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCidrCollectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Version: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CidrCollection" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Collection: S.optional(__S(449, __c56, 1)),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateCidrCollectionResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CallerReference: S.String, HealthCheckConfig: __S(467, __c58, 3) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/healthcheck" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateHealthCheckRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HealthCheck: __S(471, __c58, 7),
          Location: S.String.pipe(T.HttpHeader("Location")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateHealthCheckResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ChildHealthCheck")));
    case 1:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Region")));
    case 2:
      return S.suspend(() => S.Struct({ Region: S.String, Name: S.String })).annotate({
        identifier: "AlarmIdentifier",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          IPAddress: S.optional(S.String),
          Port: S.optional(S.Number),
          Type: S.String,
          ResourcePath: S.optional(S.String),
          FullyQualifiedDomainName: S.optional(S.String),
          SearchString: S.optional(S.String),
          RequestInterval: S.optional(S.Number),
          FailureThreshold: S.optional(S.Number),
          MeasureLatency: S.optional(S.Boolean),
          Inverted: S.optional(S.Boolean),
          Disabled: S.optional(S.Boolean),
          HealthThreshold: S.optional(S.Number),
          ChildHealthChecks: S.optional(__S(464, __c58, 0)),
          EnableSNI: S.optional(S.Boolean),
          Regions: S.optional(__S(465, __c58, 1)),
          AlarmIdentifier: S.optional(__S(466, __c58, 2)),
          InsufficientDataHealthStatus: S.optional(S.String),
          RoutingControlArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "HealthCheckConfig" });
    case 4:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "Dimension",
      });
    case 5:
      return S.Array(
        /*@__PURE__*/ __S(468, __c58, 4)
          .pipe(/*@__PURE__*/ T.XmlName("Dimension"))
          .annotate({ identifier: "Dimension" }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          EvaluationPeriods: S.Number,
          Threshold: S.Number,
          ComparisonOperator: S.String,
          Period: S.Number,
          MetricName: S.String,
          Namespace: S.String,
          Statistic: S.String,
          Dimensions: S.optional(__S(469, __c58, 5)),
        }),
      ).annotate({ identifier: "CloudWatchAlarmConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          CallerReference: S.String,
          LinkedService: S.optional(__S(472, __c59, 0)),
          HealthCheckConfig: __S(467, __c58, 3),
          HealthCheckVersion: S.Number,
          CloudWatchAlarmConfiguration: S.optional(__S(470, __c58, 6)),
        }),
      ).annotate({ identifier: "HealthCheck" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServicePrincipal: S.optional(S.String), Description: S.optional(S.String) }),
      ).annotate({ identifier: "LinkedService" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          VPC: S.optional(__S(400, __c50, 0)),
          CallerReference: S.String,
          HostedZoneConfig: S.optional(__S(488, __c61, 0)),
          DelegationSetId: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/hostedzone" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateHostedZoneRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HostedZone: __S(491, __c61, 3),
          ChangeInfo: __S(384, __c48, 0),
          DelegationSet: S.optional(__S(497, __c62, 1)),
          VPC: S.optional(__S(400, __c50, 0)),
          Location: S.String.pipe(T.HttpHeader("Location")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateHostedZoneResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Comment: S.optional(S.String), PrivateZone: S.optional(S.Boolean) }),
      ).annotate({ identifier: "HostedZoneConfig" });
    case 1:
      return S.suspend(() => S.Struct({ AcceleratedRecovery: S.optional(S.String) })).annotate({
        identifier: "HostedZoneFailureReasons",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AcceleratedRecoveryStatus: S.optional(S.String),
          FailureReasons: S.optional(__S(489, __c61, 1)),
        }),
      ).annotate({ identifier: "HostedZoneFeatures" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.String,
          CallerReference: S.String,
          Config: S.optional(__S(488, __c61, 0)),
          ResourceRecordSetCount: S.optional(S.Number),
          LinkedService: S.optional(__S(472, __c59, 0)),
          Features: S.optional(__S(490, __c61, 2)),
        }),
      ).annotate({ identifier: "HostedZone" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("NameServer")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          CallerReference: S.optional(S.String),
          NameServers: __S(496, __c62, 0),
        }),
      ).annotate({ identifier: "DelegationSet" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CallerReference: S.String,
          HostedZoneId: S.String,
          KeyManagementServiceArn: S.String,
          Name: S.String,
          Status: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/keysigningkey" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKeySigningKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChangeInfo: __S(384, __c48, 0),
          KeySigningKey: __S(512, __c64, 0),
          Location: S.String.pipe(T.HttpHeader("Location")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateKeySigningKeyResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          KmsArn: S.optional(S.String),
          Flag: S.optional(S.Number),
          SigningAlgorithmMnemonic: S.optional(S.String),
          SigningAlgorithmType: S.optional(S.Number),
          DigestAlgorithmMnemonic: S.optional(S.String),
          DigestAlgorithmType: S.optional(S.Number),
          KeyTag: S.optional(S.Number),
          DigestValue: S.optional(S.String),
          PublicKey: S.optional(S.String),
          DSRecord: S.optional(S.String),
          DNSKEYRecord: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CreatedDate: S.optional(T.DateFromString),
          LastModifiedDate: S.optional(T.DateFromString),
        }),
      ).annotate({ identifier: "KeySigningKey" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HostedZoneId: S.String, CloudWatchLogsLogGroupArn: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/queryloggingconfig" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateQueryLoggingConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryLoggingConfig: __S(528, __c66, 0),
          Location: S.String.pipe(T.HttpHeader("Location")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateQueryLoggingConfigResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, HostedZoneId: S.String, CloudWatchLogsLogGroupArn: S.String }),
      ).annotate({ identifier: "QueryLoggingConfig" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CallerReference: S.String, HostedZoneId: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/delegationset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateReusableDelegationSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DelegationSet: __S(497, __c62, 1),
          Location: S.String.pipe(T.HttpHeader("Location")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateReusableDelegationSetResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Document: S.String, Comment: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/trafficpolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTrafficPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrafficPolicy: __S(552, __c69, 0),
          Location: S.String.pipe(T.HttpHeader("Location")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateTrafficPolicyResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Version: S.Number,
          Name: S.String,
          Type: S.String,
          Document: S.String,
          Comment: S.optional(S.String),
        }),
      ).annotate({ identifier: "TrafficPolicy" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String,
          Name: S.String,
          TTL: S.Number,
          TrafficPolicyId: S.String,
          TrafficPolicyVersion: S.Number,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/trafficpolicyinstance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTrafficPolicyInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrafficPolicyInstance: __S(568, __c71, 0),
          Location: S.String.pipe(T.HttpHeader("Location")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateTrafficPolicyInstanceResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          HostedZoneId: S.String,
          Name: S.String,
          TTL: S.Number,
          State: S.String,
          Message: S.String,
          TrafficPolicyId: S.String,
          TrafficPolicyVersion: S.Number,
          TrafficPolicyType: S.String,
        }),
      ).annotate({ identifier: "TrafficPolicyInstance" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          Document: S.String,
          Comment: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/trafficpolicy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTrafficPolicyVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrafficPolicy: __S(552, __c69, 0),
          Location: S.String.pipe(T.HttpHeader("Location")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateTrafficPolicyVersionResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
          VPC: __S(400, __c50, 0),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2013-04-01/hostedzone/{HostedZoneId}/authorizevpcassociation",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVPCAssociationAuthorizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ HostedZoneId: S.String, VPC: __S(400, __c50, 0) }).pipe(ns),
      ).annotate({ identifier: "CreateVPCAssociationAuthorizationResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2013-04-01/keysigningkey/{HostedZoneId}/{Name}/deactivate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeactivateKeySigningKeyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ChangeInfo: __S(384, __c48, 0) }).pipe(ns)).annotate({
        identifier: "DeactivateKeySigningKeyResponse",
      });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2013-04-01/cidrcollection/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCidrCollectionRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteCidrCollectionResponse",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HealthCheckId: S.String.pipe(T.HttpLabel("HealthCheckId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2013-04-01/healthcheck/{HealthCheckId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteHealthCheckRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteHealthCheckResponse",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2013-04-01/hostedzone/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteHostedZoneRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ChangeInfo: __S(384, __c48, 0) }).pipe(ns)).annotate({
        identifier: "DeleteHostedZoneResponse",
      });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2013-04-01/keysigningkey/{HostedZoneId}/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKeySigningKeyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ChangeInfo: __S(384, __c48, 0) }).pipe(ns)).annotate({
        identifier: "DeleteKeySigningKeyResponse",
      });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2013-04-01/queryloggingconfig/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQueryLoggingConfigRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteQueryLoggingConfigResponse",
      });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2013-04-01/delegationset/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteReusableDelegationSetRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteReusableDelegationSetResponse",
      });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          Version: S.Number.pipe(T.HttpLabel("Version")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2013-04-01/trafficpolicy/{Id}/{Version}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTrafficPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteTrafficPolicyResponse",
      });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2013-04-01/trafficpolicyinstance/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTrafficPolicyInstanceRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteTrafficPolicyInstanceResponse",
      });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
          VPC: __S(400, __c50, 0),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2013-04-01/hostedzone/{HostedZoneId}/deauthorizevpcassociation",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVPCAssociationAuthorizationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteVPCAssociationAuthorizationResponse",
      });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/hostedzone/{HostedZoneId}/disable-dnssec" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableHostedZoneDNSSECRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ChangeInfo: __S(384, __c48, 0) }).pipe(ns)).annotate({
        identifier: "DisableHostedZoneDNSSECResponse",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")),
          VPC: __S(400, __c50, 0),
          Comment: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2013-04-01/hostedzone/{HostedZoneId}/disassociatevpc",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateVPCFromHostedZoneRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ChangeInfo: __S(384, __c48, 0) }).pipe(ns)).annotate({
        identifier: "DisassociateVPCFromHostedZoneResponse",
      });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HostedZoneId: S.String.pipe(T.HttpLabel("HostedZoneId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2013-04-01/hostedzone/{HostedZoneId}/enable-dnssec" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableHostedZoneDNSSECRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ChangeInfo: __S(384, __c48, 0) }).pipe(ns)).annotate({
        identifier: "EnableHostedZoneDNSSECResponse",
      });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.String.pipe(T.HttpLabel("Type")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/accountlimit/{Type}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountLimitRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Type: S.String, Value: S.Number })).annotate({
        identifier: "AccountLimit",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ Limit: __S(697, __c87, 1), Count: S.Number }).pipe(ns),
      ).annotate({ identifier: "GetAccountLimitResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/change/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChangeRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ChangeInfo: __S(384, __c48, 0) }).pipe(ns)).annotate({
        identifier: "GetChangeResponse",
      });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2013-04-01/checkeripranges" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCheckerIpRangesRequest" });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() => S.Struct({ CheckerIpRanges: __S(713, __c89, 1) }).pipe(ns)).annotate({
        identifier: "GetCheckerIpRangesResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
