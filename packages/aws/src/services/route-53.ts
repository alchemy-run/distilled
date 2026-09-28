import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restXmlProtocol } from "../protocols/rest-xml.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Route 53",
  target: "AWSDnsV20130401",
  version: "2013-04-01",
  sigv4: "route53",
  protocol: restXmlProtocol,
  xmlns: "https://route53.amazonaws.com/doc/2013-04-01/",
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "us-east-1" }],
    });
    const _p1 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "cn-northwest-1" }],
    });
    const _p2 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "us-gov-west-1" }],
    });
    const _p3 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "eusc-de-east-1" }],
    });
    const _p4 = (_0: unknown) => ({
      authSchemes: [
        {
          name: "sigv4",
          signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
        },
      ],
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
            return e(
              "https://route53.global.api.amazonwebservices.com.cn",
              _p1(),
              {},
            );
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
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "us-iso-east-1" },
                ],
              },
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
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "us-isob-east-1" },
                ],
              },
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
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "eu-isoe-west-1" },
                ],
              },
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
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "us-isof-south-1" },
                ],
              },
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
            return e(
              "https://route53.global.api.amazonwebservices.eu",
              _p3(),
              {},
            );
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://route53.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p4(PartitionResult),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
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
};

export class CidrBlockInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "CidrBlockInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CidrCollectionAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("CidrCollectionAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class CidrCollectionInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "CidrCollectionInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CidrCollectionVersionMismatchException
  extends /*@__PURE__*/ TE.TaggedError(
    "CidrCollectionVersionMismatchException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ConcurrentModification
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModification",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictingDomainExists
  extends /*@__PURE__*/ TE.TaggedError("ConflictingDomainExists")<{
    readonly message?: string;
  }> {}
export class ConflictingTypes
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictingTypes",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DelegationSetAlreadyCreated
  extends /*@__PURE__*/ TE.TaggedError("DelegationSetAlreadyCreated")<{
    readonly message?: string;
  }> {}
export class DelegationSetAlreadyReusable
  extends /*@__PURE__*/ TE.TaggedError("DelegationSetAlreadyReusable")<{
    readonly message?: string;
  }> {}
export class DelegationSetInUse
  extends /*@__PURE__*/ TE.TaggedError("DelegationSetInUse", [
    "DependencyViolationError",
  ])<{ readonly message?: string }> {}
export class DelegationSetNotAvailable
  extends /*@__PURE__*/ TE.TaggedError("DelegationSetNotAvailable")<{
    readonly message?: string;
  }> {}
export class DelegationSetNotReusable
  extends /*@__PURE__*/ TE.TaggedError("DelegationSetNotReusable")<{
    readonly message?: string;
  }> {}
export class DNSSECNotFound
  extends /*@__PURE__*/ TE.TaggedError("DNSSECNotFound", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class HealthCheckAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "HealthCheckAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class HealthCheckInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "HealthCheckInUse",
    ["BadRequestError", "DependencyViolationError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class HealthCheckVersionMismatch
  extends /*@__PURE__*/ TE.TaggedError(
    "HealthCheckVersionMismatch",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class HostedZoneAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "HostedZoneAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class HostedZoneNotEmpty
  extends /*@__PURE__*/ TE.TaggedError(
    "HostedZoneNotEmpty",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class HostedZoneNotFound
  extends /*@__PURE__*/ TE.TaggedError("HostedZoneNotFound")<{
    readonly message?: string;
  }> {}
export class HostedZoneNotPrivate
  extends /*@__PURE__*/ TE.TaggedError("HostedZoneNotPrivate")<{
    readonly message?: string;
  }> {}
export class HostedZonePartiallyDelegated
  extends /*@__PURE__*/ TE.TaggedError("HostedZonePartiallyDelegated")<{
    readonly message?: string;
  }> {}
export class IncompatibleVersion
  extends /*@__PURE__*/ TE.TaggedError(
    "IncompatibleVersion",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientCloudWatchLogsResourcePolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientCloudWatchLogsResourcePolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidArgument
  extends /*@__PURE__*/ TE.TaggedError("InvalidArgument")<{
    readonly message?: string;
  }> {}
export class InvalidChangeBatch
  extends /*@__PURE__*/ TE.TaggedError("InvalidChangeBatch")<{
    readonly messages?: string[];
    readonly message?: string;
  }> {}
export class InvalidDomainName
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDomainName",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidInput
  extends /*@__PURE__*/ TE.TaggedError("InvalidInput", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidKeySigningKeyName
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidKeySigningKeyName",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidKeySigningKeyStatus
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidKeySigningKeyStatus",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidKMSArn
  extends /*@__PURE__*/ TE.TaggedError("InvalidKMSArn")<{
    readonly message?: string;
  }> {}
export class InvalidPaginationToken
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPaginationToken",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSigningStatus
  extends /*@__PURE__*/ TE.TaggedError("InvalidSigningStatus")<{
    readonly message?: string;
  }> {}
export class InvalidTrafficPolicyDocument
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTrafficPolicyDocument",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidVPCId
  extends /*@__PURE__*/ TE.TaggedError("InvalidVPCId", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class KeySigningKeyAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "KeySigningKeyAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class KeySigningKeyInParentDSRecord
  extends /*@__PURE__*/ TE.TaggedError(
    "KeySigningKeyInParentDSRecord",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class KeySigningKeyInUse
  extends /*@__PURE__*/ TE.TaggedError("KeySigningKeyInUse", [
    "DependencyViolationError",
  ])<{ readonly message?: string }> {}
export class KeySigningKeyWithActiveStatusNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "KeySigningKeyWithActiveStatusNotFound",
  )<{ readonly message?: string }> {}
export class LastVPCAssociation
  extends /*@__PURE__*/ TE.TaggedError(
    "LastVPCAssociation",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitsExceeded
  extends /*@__PURE__*/ TE.TaggedError("LimitsExceeded")<{
    readonly message?: string;
  }> {}
export class NoSuchChange
  extends /*@__PURE__*/ TE.TaggedError("NoSuchChange", ["BadRequestError"], {
    status: 404,
  })<{ readonly message?: string }> {}
export class NoSuchCidrCollectionException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchCidrCollectionException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchCidrLocationException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchCidrLocationException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchCloudWatchLogsLogGroup
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchCloudWatchLogsLogGroup",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchDelegationSet
  extends /*@__PURE__*/ TE.TaggedError("NoSuchDelegationSet")<{
    readonly message?: string;
  }> {}
export class NoSuchGeoLocation
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchGeoLocation",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchHealthCheck
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchHealthCheck",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchHostedZone
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchHostedZone",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchKeySigningKey
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchKeySigningKey",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchQueryLoggingConfig
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchQueryLoggingConfig",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchTrafficPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchTrafficPolicy",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchTrafficPolicyInstance
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchTrafficPolicyInstance",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NotAuthorizedException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotAuthorizedException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly message?: string }> {}
export class PriorRequestNotComplete
  extends /*@__PURE__*/ TE.TaggedError(
    "PriorRequestNotComplete",
    ["BadRequestError", "ConflictError", "RetryableError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class PublicZoneVPCAssociation
  extends /*@__PURE__*/ TE.TaggedError(
    "PublicZoneVPCAssociation",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class QueryLoggingConfigAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "QueryLoggingConfigAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["BadRequestError", "ThrottlingError", "RetryableError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyHealthChecks
  extends /*@__PURE__*/ TE.TaggedError("TooManyHealthChecks")<{
    readonly message?: string;
  }> {}
export class TooManyHostedZones
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyHostedZones",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyKeySigningKeys
  extends /*@__PURE__*/ TE.TaggedError("TooManyKeySigningKeys")<{
    readonly message?: string;
  }> {}
export class TooManyTrafficPolicies
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTrafficPolicies",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTrafficPolicyInstances
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTrafficPolicyInstances",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTrafficPolicyVersionsForCurrentPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTrafficPolicyVersionsForCurrentPolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyVPCAssociationAuthorizations
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyVPCAssociationAuthorizations",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TrafficPolicyAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "TrafficPolicyAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class TrafficPolicyInstanceAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "TrafficPolicyInstanceAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class TrafficPolicyInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "TrafficPolicyInUse",
    ["BadRequestError", "DependencyViolationError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class VPCAssociationAuthorizationNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "VPCAssociationAuthorizationNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class VPCAssociationNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "VPCAssociationNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
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
export type CidrCollectionChangeAction =
  | "PUT"
  | "DELETE_IF_EXISTS"
  | (string & {});
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
export type Statistic =
  | "Average"
  | "Sum"
  | "SampleCount"
  | "Maximum"
  | "Minimum"
  | (string & {});
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
export type ReusableDelegationSetLimitType =
  | "MAX_ZONES_BY_REUSABLE_DELEGATION_SET"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/keysigningkey/{HostedZoneId}/{Name}/activate",
    input: { HostedZoneId: 0, Name: 0 },
    output: { ChangeInfo: o_ChangeInfo },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/hostedzone/{HostedZoneId}/associatevpc",
    input: { HostedZoneId: 0, VPC: i_VPC, Comment: 0 },
    output: { ChangeInfo: o_ChangeInfo },
    body: "AssociateVPCWithHostedZoneRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/cidrcollection/{Id}",
    input: {
      Id: 0,
      CollectionVersion: 0,
      Changes: D.list({
        LocationName: 0,
        Action: 0,
        CidrList: D.list(0, { item: "Cidr" }),
      }),
    },
    body: "ChangeCidrCollectionRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/hostedzone/{HostedZoneId}/rrset",
    input: {
      HostedZoneId: 0,
      ChangeBatch: {
        Comment: 0,
        Changes: D.list(
          {
            Action: 0,
            ResourceRecordSet: {
              Name: 0,
              Type: 0,
              SetIdentifier: 0,
              Weight: 0,
              Region: 0,
              GeoLocation: {
                ContinentCode: 0,
                CountryCode: 0,
                SubdivisionCode: 0,
              },
              Failover: 0,
              MultiValueAnswer: 0,
              TTL: 0,
              ResourceRecords: D.list({ Value: 0 }, { item: "ResourceRecord" }),
              AliasTarget: {
                HostedZoneId: 0,
                DNSName: 0,
                EvaluateTargetHealth: 0,
              },
              HealthCheckId: 0,
              TrafficPolicyInstanceId: 0,
              CidrRoutingConfig: { CollectionId: 0, LocationName: 0 },
              GeoProximityLocation: {
                AWSRegion: 0,
                LocalZoneGroup: 0,
                Coordinates: { Latitude: 0, Longitude: 0 },
                Bias: 0,
              },
            },
          },
          { item: "Change" },
        ),
      },
    },
    output: { ChangeInfo: o_ChangeInfo },
    body: "ChangeResourceRecordSetsRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/tags/{ResourceType}/{ResourceId}",
    input: {
      ResourceType: 0,
      ResourceId: 0,
      AddTags: D.list({ Key: 0, Value: 0 }, { item: "Tag" }),
      RemoveTagKeys: D.list(0, { item: "Key" }),
    },
    body: "ChangeTagsForResourceRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/cidrcollection",
    input: { Name: 0, CallerReference: 0 },
    output: {
      Collection: { Version: D.num },
      Location: D.m({ header: "Location" }),
    },
    body: "CreateCidrCollectionRequest",
  },
  errors: [
    CidrCollectionAlreadyExistsException,
    ConcurrentModification,
    InvalidInput,
    LimitsExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCidrCollection",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/healthcheck",
    input: {
      CallerReference: 0,
      HealthCheckConfig: {
        IPAddress: 0,
        Port: 0,
        Type: 0,
        ResourcePath: 0,
        FullyQualifiedDomainName: 0,
        SearchString: 0,
        RequestInterval: 0,
        FailureThreshold: 0,
        MeasureLatency: 0,
        Inverted: 0,
        Disabled: 0,
        HealthThreshold: 0,
        ChildHealthChecks: D.list(0, { item: "ChildHealthCheck" }),
        EnableSNI: 0,
        Regions: D.list(0, { item: "Region" }),
        AlarmIdentifier: i_AlarmIdentifier,
        InsufficientDataHealthStatus: 0,
        RoutingControlArn: 0,
      },
    },
    output: {
      HealthCheck: o_HealthCheck,
      Location: D.m({ header: "Location" }),
    },
    body: "CreateHealthCheckRequest",
  },
  errors: [HealthCheckAlreadyExists, InvalidInput, TooManyHealthChecks],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHealthCheck",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/hostedzone",
    input: {
      Name: 0,
      VPC: i_VPC,
      CallerReference: 0,
      HostedZoneConfig: { Comment: 0, PrivateZone: 0 },
      DelegationSetId: 0,
    },
    output: {
      HostedZone: o_HostedZone,
      ChangeInfo: o_ChangeInfo,
      DelegationSet: o_DelegationSet,
      VPC: {},
      Location: D.m({ header: "Location" }),
    },
    body: "CreateHostedZoneRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/keysigningkey",
    input: {
      CallerReference: 0,
      HostedZoneId: 0,
      KeyManagementServiceArn: 0,
      Name: 0,
      Status: 0,
    },
    output: {
      ChangeInfo: o_ChangeInfo,
      KeySigningKey: o_KeySigningKey,
      Location: D.m({ header: "Location" }),
    },
    body: "CreateKeySigningKeyRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/queryloggingconfig",
    input: { HostedZoneId: 0, CloudWatchLogsLogGroupArn: 0 },
    output: { QueryLoggingConfig: {}, Location: D.m({ header: "Location" }) },
    body: "CreateQueryLoggingConfigRequest",
  },
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
})) as any;

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
 * - For small numbers of hosted zones—up to a few hundred—it's
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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/delegationset",
    input: { CallerReference: 0, HostedZoneId: 0 },
    output: {
      DelegationSet: o_DelegationSet,
      Location: D.m({ header: "Location" }),
    },
    body: "CreateReusableDelegationSetRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/trafficpolicy",
    input: { Name: 0, Document: 0, Comment: 0 },
    output: {
      TrafficPolicy: o_TrafficPolicy,
      Location: D.m({ header: "Location" }),
    },
    body: "CreateTrafficPolicyRequest",
  },
  errors: [
    InvalidInput,
    InvalidTrafficPolicyDocument,
    TooManyTrafficPolicies,
    TrafficPolicyAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrafficPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/trafficpolicyinstance",
    input: {
      HostedZoneId: 0,
      Name: 0,
      TTL: 0,
      TrafficPolicyId: 0,
      TrafficPolicyVersion: 0,
    },
    output: {
      TrafficPolicyInstance: o_TrafficPolicyInstance,
      Location: D.m({ header: "Location" }),
    },
    body: "CreateTrafficPolicyInstanceRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/trafficpolicy/{Id}",
    input: { Id: 0, Document: 0, Comment: 0 },
    output: {
      TrafficPolicy: o_TrafficPolicy,
      Location: D.m({ header: "Location" }),
    },
    body: "CreateTrafficPolicyVersionRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/hostedzone/{HostedZoneId}/authorizevpcassociation",
    input: { HostedZoneId: 0, VPC: i_VPC },
    output: { VPC: {} },
    body: "CreateVPCAssociationAuthorizationRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/keysigningkey/{HostedZoneId}/{Name}/deactivate",
    input: { HostedZoneId: 0, Name: 0 },
    output: { ChangeInfo: o_ChangeInfo },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2013-04-01/cidrcollection/{Id}",
    input: { Id: 0 },
  },
  errors: [
    CidrCollectionInUseException,
    ConcurrentModification,
    InvalidInput,
    NoSuchCidrCollectionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCidrCollection",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2013-04-01/healthcheck/{HealthCheckId}",
    input: { HealthCheckId: 0 },
  },
  errors: [HealthCheckInUse, InvalidInput, NoSuchHealthCheck],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHealthCheck",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2013-04-01/hostedzone/{Id}",
    input: { Id: 0 },
    output: { ChangeInfo: o_ChangeInfo },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2013-04-01/keysigningkey/{HostedZoneId}/{Name}",
    input: { HostedZoneId: 0, Name: 0 },
    output: { ChangeInfo: o_ChangeInfo },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2013-04-01/queryloggingconfig/{Id}",
    input: { Id: 0 },
  },
  errors: [ConcurrentModification, InvalidInput, NoSuchQueryLoggingConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueryLoggingConfig",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2013-04-01/delegationset/{Id}",
    input: { Id: 0 },
  },
  errors: [
    DelegationSetInUse,
    DelegationSetNotReusable,
    InvalidInput,
    NoSuchDelegationSet,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReusableDelegationSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2013-04-01/trafficpolicy/{Id}/{Version}",
    input: { Id: 0, Version: 0 },
  },
  errors: [
    ConcurrentModification,
    InvalidInput,
    NoSuchTrafficPolicy,
    TrafficPolicyInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrafficPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /2013-04-01/trafficpolicyinstance/{Id}",
    input: { Id: 0 },
  },
  errors: [InvalidInput, NoSuchTrafficPolicyInstance, PriorRequestNotComplete],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrafficPolicyInstance",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/hostedzone/{HostedZoneId}/deauthorizevpcassociation",
    input: { HostedZoneId: 0, VPC: i_VPC },
    body: "DeleteVPCAssociationAuthorizationRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/hostedzone/{HostedZoneId}/disable-dnssec",
    input: { HostedZoneId: 0 },
    output: { ChangeInfo: o_ChangeInfo },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/hostedzone/{HostedZoneId}/disassociatevpc",
    input: { HostedZoneId: 0, VPC: i_VPC, Comment: 0 },
    output: { ChangeInfo: o_ChangeInfo },
    body: "DisassociateVPCFromHostedZoneRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/hostedzone/{HostedZoneId}/enable-dnssec",
    input: { HostedZoneId: 0 },
    output: { ChangeInfo: o_ChangeInfo },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/accountlimit/{Type}",
    input: { Type: 0 },
    output: { Limit: { Value: D.num }, Count: D.num },
  },
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountLimit",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/change/{Id}",
    input: { Id: 0 },
    output: { ChangeInfo: o_ChangeInfo },
  },
  errors: [InvalidInput, NoSuchChange],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChange",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/checkeripranges",
    input: {},
    output: { CheckerIpRanges: D.list() },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCheckerIpRanges",
})) as any;

export type GetDNSSECError =
  | InvalidArgument
  | InvalidInput
  | NoSuchHostedZone
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/hostedzone/{HostedZoneId}/dnssec",
    input: { HostedZoneId: 0 },
    output: { Status: {}, KeySigningKeys: D.list(o_KeySigningKey) },
  },
  errors: [InvalidArgument, InvalidInput, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDNSSEC",
})) as any;

export type GetGeoLocationError =
  | InvalidInput
  | NoSuchGeoLocation
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/geolocation",
    input: {
      ContinentCode: D.m({ query: "continentcode" }),
      CountryCode: D.m({ query: "countrycode" }),
      SubdivisionCode: D.m({ query: "subdivisioncode" }),
    },
    output: { GeoLocationDetails: {} },
  },
  errors: [InvalidInput, NoSuchGeoLocation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGeoLocation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/healthcheck/{HealthCheckId}",
    input: { HealthCheckId: 0 },
    output: { HealthCheck: o_HealthCheck },
  },
  errors: [IncompatibleVersion, InvalidInput, NoSuchHealthCheck],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHealthCheck",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/healthcheckcount",
    input: {},
    output: { HealthCheckCount: D.num },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHealthCheckCount",
})) as any;

export type GetHealthCheckLastFailureReasonError =
  | InvalidInput
  | NoSuchHealthCheck
  | CommonErrors;
/**
 * Gets the reason that a specified health check failed most recently.
 */
export const getHealthCheckLastFailureReason: API.OperationMethod<
  GetHealthCheckLastFailureReasonRequest,
  GetHealthCheckLastFailureReasonResponse,
  GetHealthCheckLastFailureReasonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/healthcheck/{HealthCheckId}/lastfailurereason",
    input: { HealthCheckId: 0 },
    output: {
      HealthCheckObservations: D.list(o_HealthCheckObservation, {
        item: "HealthCheckObservation",
      }),
    },
  },
  errors: [InvalidInput, NoSuchHealthCheck],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHealthCheckLastFailureReason",
})) as any;

export type GetHealthCheckStatusError =
  | InvalidInput
  | NoSuchHealthCheck
  | CommonErrors;
/**
 * Gets status of a specified health check.
 *
 * This API is intended for use during development to diagnose behavior. It doesn’t
 * support production use-cases with high query rates that require immediate and
 * actionable responses.
 */
export const getHealthCheckStatus: API.OperationMethod<
  GetHealthCheckStatusRequest,
  GetHealthCheckStatusResponse,
  GetHealthCheckStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/healthcheck/{HealthCheckId}/status",
    input: { HealthCheckId: 0 },
    output: {
      HealthCheckObservations: D.list(o_HealthCheckObservation, {
        item: "HealthCheckObservation",
      }),
    },
  },
  errors: [InvalidInput, NoSuchHealthCheck],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHealthCheckStatus",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/hostedzone/{Id}",
    input: { Id: 0 },
    output: {
      HostedZone: o_HostedZone,
      DelegationSet: o_DelegationSet,
      VPCs: D.list({}, { item: "VPC" }),
    },
  },
  errors: [InvalidInput, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHostedZone",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/hostedzonecount",
    input: {},
    output: { HostedZoneCount: D.num },
  },
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHostedZoneCount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/hostedzonelimit/{HostedZoneId}/{Type}",
    input: { Type: 0, HostedZoneId: 0 },
    output: { Limit: { Value: D.num }, Count: D.num },
  },
  errors: [HostedZoneNotPrivate, InvalidInput, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHostedZoneLimit",
})) as any;

export type GetQueryLoggingConfigError =
  | InvalidInput
  | NoSuchQueryLoggingConfig
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/queryloggingconfig/{Id}",
    input: { Id: 0 },
    output: { QueryLoggingConfig: {} },
  },
  errors: [InvalidInput, NoSuchQueryLoggingConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryLoggingConfig",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/delegationset/{Id}",
    input: { Id: 0 },
    output: { DelegationSet: o_DelegationSet },
  },
  errors: [DelegationSetNotReusable, InvalidInput, NoSuchDelegationSet],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReusableDelegationSet",
})) as any;

export type GetReusableDelegationSetLimitError =
  | InvalidInput
  | NoSuchDelegationSet
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/reusabledelegationsetlimit/{DelegationSetId}/{Type}",
    input: { Type: 0, DelegationSetId: 0 },
    output: { Limit: { Value: D.num }, Count: D.num },
  },
  errors: [InvalidInput, NoSuchDelegationSet],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReusableDelegationSetLimit",
})) as any;

export type GetTrafficPolicyError =
  | InvalidInput
  | NoSuchTrafficPolicy
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/trafficpolicy/{Id}/{Version}",
    input: { Id: 0, Version: 0 },
    output: { TrafficPolicy: o_TrafficPolicy },
  },
  errors: [InvalidInput, NoSuchTrafficPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrafficPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/trafficpolicyinstance/{Id}",
    input: { Id: 0 },
    output: { TrafficPolicyInstance: o_TrafficPolicyInstance },
  },
  errors: [InvalidInput, NoSuchTrafficPolicyInstance],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrafficPolicyInstance",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/trafficpolicyinstancecount",
    input: {},
    output: { TrafficPolicyInstanceCount: D.num },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrafficPolicyInstanceCount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/cidrcollection/{CollectionId}/cidrblocks",
    input: {
      CollectionId: 0,
      LocationName: D.m({ query: "location" }),
      NextToken: D.m({ query: "nexttoken" }),
      MaxResults: D.m({ query: "maxresults" }),
    },
    output: { CidrBlocks: D.list({}) },
  },
  errors: [
    InvalidInput,
    NoSuchCidrCollectionException,
    NoSuchCidrLocationException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/cidrcollection",
    input: {
      NextToken: D.m({ query: "nexttoken" }),
      MaxResults: D.m({ query: "maxresults" }),
    },
    output: { CidrCollections: D.list({ Version: D.num }) },
  },
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

export type ListCidrLocationsError =
  | InvalidInput
  | NoSuchCidrCollectionException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/cidrcollection/{CollectionId}",
    input: {
      CollectionId: 0,
      NextToken: D.m({ query: "nexttoken" }),
      MaxResults: D.m({ query: "maxresults" }),
    },
    output: { CidrLocations: D.list({}) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/geolocations",
    input: {
      StartContinentCode: D.m({ query: "startcontinentcode" }),
      StartCountryCode: D.m({ query: "startcountrycode" }),
      StartSubdivisionCode: D.m({ query: "startsubdivisioncode" }),
      MaxItems: D.m({ query: "maxitems" }),
    },
    output: {
      GeoLocationDetailsList: D.list({}, { item: "GeoLocationDetails" }),
      IsTruncated: D.bool,
      MaxItems: D.num,
    },
  },
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGeoLocations",
})) as any;

export type ListHealthChecksError =
  | IncompatibleVersion
  | InvalidInput
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/healthcheck",
    input: {
      Marker: D.m({ query: "marker" }),
      MaxItems: D.m({ query: "maxitems" }),
    },
    output: {
      HealthChecks: D.list(o_HealthCheck, { item: "HealthCheck" }),
      IsTruncated: D.bool,
      MaxItems: D.num,
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/hostedzone",
    input: {
      Marker: D.m({ query: "marker" }),
      MaxItems: D.m({ query: "maxitems" }),
      DelegationSetId: D.m({ query: "delegationsetid" }),
      HostedZoneType: D.m({ query: "hostedzonetype" }),
    },
    output: {
      HostedZones: D.list(o_HostedZone, { item: "HostedZone" }),
      IsTruncated: D.bool,
      MaxItems: D.num,
    },
  },
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

export type ListHostedZonesByNameError =
  | InvalidDomainName
  | InvalidInput
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/hostedzonesbyname",
    input: {
      DNSName: D.m({ query: "dnsname" }),
      HostedZoneId: D.m({ query: "hostedzoneid" }),
      MaxItems: D.m({ query: "maxitems" }),
    },
    output: {
      HostedZones: D.list(o_HostedZone, { item: "HostedZone" }),
      IsTruncated: D.bool,
      MaxItems: D.num,
    },
  },
  errors: [InvalidDomainName, InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHostedZonesByName",
})) as any;

export type ListHostedZonesByVPCError =
  | InvalidInput
  | InvalidPaginationToken
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/hostedzonesbyvpc",
    input: {
      VPCId: D.m({ query: "vpcid" }),
      VPCRegion: D.m({ query: "vpcregion" }),
      MaxItems: D.m({ query: "maxitems" }),
      NextToken: D.m({ query: "nexttoken" }),
    },
    output: {
      HostedZoneSummaries: D.list({ Owner: {} }, { item: "HostedZoneSummary" }),
      MaxItems: D.num,
    },
  },
  errors: [InvalidInput, InvalidPaginationToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHostedZonesByVPC",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/queryloggingconfig",
    input: {
      HostedZoneId: D.m({ query: "hostedzoneid" }),
      NextToken: D.m({ query: "nexttoken" }),
      MaxResults: D.m({ query: "maxresults" }),
    },
    output: { QueryLoggingConfigs: D.list({}, { item: "QueryLoggingConfig" }) },
  },
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

export type ListResourceRecordSetsError =
  | InvalidInput
  | NoSuchHostedZone
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/hostedzone/{HostedZoneId}/rrset",
    input: {
      HostedZoneId: 0,
      StartRecordName: D.m({ query: "name" }),
      StartRecordType: D.m({ query: "type" }),
      StartRecordIdentifier: D.m({ query: "identifier" }),
      MaxItems: D.m({ query: "maxitems" }),
    },
    output: {
      ResourceRecordSets: D.list(
        {
          Weight: D.num,
          GeoLocation: {},
          MultiValueAnswer: D.bool,
          TTL: D.num,
          ResourceRecords: D.list({}, { item: "ResourceRecord" }),
          AliasTarget: { EvaluateTargetHealth: D.bool },
          CidrRoutingConfig: {},
          GeoProximityLocation: { Coordinates: {}, Bias: D.num },
        },
        { item: "ResourceRecordSet" },
      ),
      IsTruncated: D.bool,
      MaxItems: D.num,
    },
  },
  errors: [InvalidInput, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceRecordSets",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/delegationset",
    input: {
      Marker: D.m({ query: "marker" }),
      MaxItems: D.m({ query: "maxitems" }),
    },
    output: {
      DelegationSets: D.list(o_DelegationSet, { item: "DelegationSet" }),
      IsTruncated: D.bool,
      MaxItems: D.num,
    },
  },
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReusableDelegationSets",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/tags/{ResourceType}/{ResourceId}",
    input: { ResourceType: 0, ResourceId: 0 },
    output: { ResourceTagSet: o_ResourceTagSet },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/tags/{ResourceType}",
    input: { ResourceType: 0, ResourceIds: D.list(0, { item: "ResourceId" }) },
    output: {
      ResourceTagSets: D.list(o_ResourceTagSet, { item: "ResourceTagSet" }),
    },
    body: "ListTagsForResourcesRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/trafficpolicies",
    input: {
      TrafficPolicyIdMarker: D.m({ query: "trafficpolicyid" }),
      MaxItems: D.m({ query: "maxitems" }),
    },
    output: {
      TrafficPolicySummaries: D.list(
        { LatestVersion: D.num, TrafficPolicyCount: D.num },
        { item: "TrafficPolicySummary" },
      ),
      IsTruncated: D.bool,
      MaxItems: D.num,
    },
  },
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicies",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/trafficpolicyinstances",
    input: {
      HostedZoneIdMarker: D.m({ query: "hostedzoneid" }),
      TrafficPolicyInstanceNameMarker: D.m({
        query: "trafficpolicyinstancename",
      }),
      TrafficPolicyInstanceTypeMarker: D.m({
        query: "trafficpolicyinstancetype",
      }),
      MaxItems: D.m({ query: "maxitems" }),
    },
    output: {
      TrafficPolicyInstances: D.list(o_TrafficPolicyInstance, {
        item: "TrafficPolicyInstance",
      }),
      IsTruncated: D.bool,
      MaxItems: D.num,
    },
  },
  errors: [InvalidInput, NoSuchTrafficPolicyInstance],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicyInstances",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/trafficpolicyinstances/hostedzone",
    input: {
      HostedZoneId: D.m({ query: "id" }),
      TrafficPolicyInstanceNameMarker: D.m({
        query: "trafficpolicyinstancename",
      }),
      TrafficPolicyInstanceTypeMarker: D.m({
        query: "trafficpolicyinstancetype",
      }),
      MaxItems: D.m({ query: "maxitems" }),
    },
    output: {
      TrafficPolicyInstances: D.list(o_TrafficPolicyInstance, {
        item: "TrafficPolicyInstance",
      }),
      IsTruncated: D.bool,
      MaxItems: D.num,
    },
  },
  errors: [InvalidInput, NoSuchHostedZone, NoSuchTrafficPolicyInstance],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicyInstancesByHostedZone",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/trafficpolicyinstances/trafficpolicy",
    input: {
      TrafficPolicyId: D.m({ query: "id" }),
      TrafficPolicyVersion: D.m({ query: "version" }),
      HostedZoneIdMarker: D.m({ query: "hostedzoneid" }),
      TrafficPolicyInstanceNameMarker: D.m({
        query: "trafficpolicyinstancename",
      }),
      TrafficPolicyInstanceTypeMarker: D.m({
        query: "trafficpolicyinstancetype",
      }),
      MaxItems: D.m({ query: "maxitems" }),
    },
    output: {
      TrafficPolicyInstances: D.list(o_TrafficPolicyInstance, {
        item: "TrafficPolicyInstance",
      }),
      IsTruncated: D.bool,
      MaxItems: D.num,
    },
  },
  errors: [InvalidInput, NoSuchTrafficPolicy, NoSuchTrafficPolicyInstance],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicyInstancesByPolicy",
})) as any;

export type ListTrafficPolicyVersionsError =
  | InvalidInput
  | NoSuchTrafficPolicy
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/trafficpolicies/{Id}/versions",
    input: {
      Id: 0,
      TrafficPolicyVersionMarker: D.m({ query: "trafficpolicyversion" }),
      MaxItems: D.m({ query: "maxitems" }),
    },
    output: {
      TrafficPolicies: D.list(o_TrafficPolicy, { item: "TrafficPolicy" }),
      IsTruncated: D.bool,
      MaxItems: D.num,
    },
  },
  errors: [InvalidInput, NoSuchTrafficPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicyVersions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/hostedzone/{HostedZoneId}/authorizevpcassociation",
    input: {
      HostedZoneId: 0,
      NextToken: D.m({ query: "nexttoken" }),
      MaxResults: D.m({ query: "maxresults" }),
    },
    output: { VPCs: D.list({}, { item: "VPC" }) },
  },
  errors: [InvalidInput, InvalidPaginationToken, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVPCAssociationAuthorizations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /2013-04-01/testdnsanswer",
    input: {
      HostedZoneId: D.m({ query: "hostedzoneid" }),
      RecordName: D.m({ query: "recordname" }),
      RecordType: D.m({ query: "recordtype" }),
      ResolverIP: D.m({ query: "resolverip" }),
      EDNS0ClientSubnetIP: D.m({ query: "edns0clientsubnetip" }),
      EDNS0ClientSubnetMask: D.m({ query: "edns0clientsubnetmask" }),
    },
    output: { RecordData: D.list(0, { item: "RecordDataEntry" }) },
  },
  errors: [InvalidInput, NoSuchHostedZone],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestDNSAnswer",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/healthcheck/{HealthCheckId}",
    input: {
      HealthCheckId: 0,
      HealthCheckVersion: 0,
      IPAddress: 0,
      Port: 0,
      ResourcePath: 0,
      FullyQualifiedDomainName: 0,
      SearchString: 0,
      FailureThreshold: 0,
      Inverted: 0,
      Disabled: 0,
      HealthThreshold: 0,
      ChildHealthChecks: D.list(0, { item: "ChildHealthCheck" }),
      EnableSNI: 0,
      Regions: D.list(0, { item: "Region" }),
      AlarmIdentifier: i_AlarmIdentifier,
      InsufficientDataHealthStatus: 0,
      ResetElements: D.list(0, { item: "ResettableElementName" }),
    },
    output: { HealthCheck: o_HealthCheck },
    body: "UpdateHealthCheckRequest",
  },
  errors: [HealthCheckVersionMismatch, InvalidInput, NoSuchHealthCheck],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHealthCheck",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/hostedzone/{Id}",
    input: { Id: 0, Comment: 0 },
    output: { HostedZone: o_HostedZone },
    body: "UpdateHostedZoneCommentRequest",
  },
  errors: [InvalidInput, NoSuchHostedZone, PriorRequestNotComplete],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHostedZoneComment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/hostedzone/{HostedZoneId}/features",
    input: { HostedZoneId: 0, EnableAcceleratedRecovery: 0 },
    body: "UpdateHostedZoneFeaturesRequest",
  },
  errors: [
    InvalidInput,
    LimitsExceeded,
    NoSuchHostedZone,
    PriorRequestNotComplete,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHostedZoneFeatures",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/trafficpolicy/{Id}/{Version}",
    input: { Id: 0, Version: 0, Comment: 0 },
    output: { TrafficPolicy: o_TrafficPolicy },
    body: "UpdateTrafficPolicyCommentRequest",
  },
  errors: [ConcurrentModification, InvalidInput, NoSuchTrafficPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrafficPolicyComment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /2013-04-01/trafficpolicyinstance/{Id}",
    input: { Id: 0, TTL: 0, TrafficPolicyId: 0, TrafficPolicyVersion: 0 },
    output: { TrafficPolicyInstance: o_TrafficPolicyInstance },
    body: "UpdateTrafficPolicyInstanceRequest",
  },
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
})) as any;

const i_AlarmIdentifier: D.LazyStruct = () => ({ Region: 0, Name: 0 });
const i_VPC: D.LazyStruct = () => ({ VPCRegion: 0, VPCId: 0 });
const o_ChangeInfo: D.LazyStruct = () => ({ SubmittedAt: D.ts });
const o_DelegationSet: D.LazyStruct = () => ({
  NameServers: D.list(0, { item: "NameServer" }),
});
const o_HealthCheck: D.LazyStruct = () => ({
  LinkedService: {},
  HealthCheckConfig: {
    Port: D.num,
    RequestInterval: D.num,
    FailureThreshold: D.num,
    MeasureLatency: D.bool,
    Inverted: D.bool,
    Disabled: D.bool,
    HealthThreshold: D.num,
    ChildHealthChecks: D.list(0, { item: "ChildHealthCheck" }),
    EnableSNI: D.bool,
    Regions: D.list(0, { item: "Region" }),
    AlarmIdentifier: {},
  },
  HealthCheckVersion: D.num,
  CloudWatchAlarmConfiguration: {
    EvaluationPeriods: D.num,
    Threshold: D.num,
    Period: D.num,
    Dimensions: D.list({}, { item: "Dimension" }),
  },
});
const o_HealthCheckObservation: D.LazyStruct = () => ({
  StatusReport: { CheckedTime: D.ts },
});
const o_HostedZone: D.LazyStruct = () => ({
  Config: { PrivateZone: D.bool },
  ResourceRecordSetCount: D.num,
  LinkedService: {},
  Features: { FailureReasons: {} },
});
const o_KeySigningKey: D.LazyStruct = () => ({
  Flag: D.num,
  SigningAlgorithmType: D.num,
  DigestAlgorithmType: D.num,
  KeyTag: D.num,
  CreatedDate: D.ts,
  LastModifiedDate: D.ts,
});
const o_ResourceTagSet: D.LazyStruct = () => ({
  Tags: D.list({}, { item: "Tag" }),
});
const o_TrafficPolicy: D.LazyStruct = () => ({ Version: D.num });
const o_TrafficPolicyInstance: D.LazyStruct = () => ({
  TTL: D.num,
  TrafficPolicyVersion: D.num,
});
