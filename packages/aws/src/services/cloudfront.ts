import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "CloudFront",
  target: "Cloudfront2020_05_31",
  version: "2020-05-31",
  sigv4: "cloudfront",
  protocol: restXmlProtocol,
  xmlns: "http://cloudfront.amazonaws.com/doc/2020-05-31/",
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
    const _p2 = (_0: unknown) => ({
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
            UseDualStack === true
          ) {
            return e("https://cloudfront.global.api.aws", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://cloudfront-fips.global.api.aws", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://cloudfront.cn-northwest-1.amazonaws.com.cn",
              _p1(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              "https://cloudfront-fips.cn-northwest-1.amazonaws.com.cn",
              _p1(),
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://cloudfront-fips.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p2(PartitionResult),
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
                `https://cloudfront-fips.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p2(PartitionResult),
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
                `https://cloudfront.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p2(PartitionResult),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cloudfront.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p2(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDenied
  extends /*@__PURE__*/ TE.TaggedError("AccessDenied", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class BatchTooLarge
  extends /*@__PURE__*/ TE.TaggedError("BatchTooLarge", ["BadRequestError"], {
    status: 413,
  })<{ readonly message?: string }> {}
export class CachePolicyAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "CachePolicyAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class CachePolicyInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "CachePolicyInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class CannotChangeImmutablePublicKeyFields
  extends /*@__PURE__*/ TE.TaggedError(
    "CannotChangeImmutablePublicKeyFields",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CannotDeleteEntityWhileInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "CannotDeleteEntityWhileInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class CannotUpdateEntityWhileInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "CannotUpdateEntityWhileInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class CloudFrontOriginAccessIdentityAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "CloudFrontOriginAccessIdentityAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class CloudFrontOriginAccessIdentityInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "CloudFrontOriginAccessIdentityInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class CNAMEAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "CNAMEAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ContinuousDeploymentPolicyAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "ContinuousDeploymentPolicyAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ContinuousDeploymentPolicyInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "ContinuousDeploymentPolicyInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class DistributionAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "DistributionAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class DistributionNotDisabled
  extends /*@__PURE__*/ TE.TaggedError(
    "DistributionNotDisabled",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class EntityAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "EntityAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class EntityLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "EntityLimitExceeded",
    ["BadRequestError", "ThrottlingError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class EntityNotFound
  extends /*@__PURE__*/ TE.TaggedError("EntityNotFound", ["BadRequestError"], {
    status: 404,
  })<{ readonly message?: string }> {}
export class EntitySizeLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "EntitySizeLimitExceeded",
    ["BadRequestError", "ThrottlingError"],
    { status: 413 },
  )<{ readonly message?: string }> {}
export class FieldLevelEncryptionConfigAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "FieldLevelEncryptionConfigAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class FieldLevelEncryptionConfigInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "FieldLevelEncryptionConfigInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class FieldLevelEncryptionProfileAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "FieldLevelEncryptionProfileAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class FieldLevelEncryptionProfileInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "FieldLevelEncryptionProfileInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class FieldLevelEncryptionProfileSizeExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "FieldLevelEncryptionProfileSizeExceeded",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class FunctionAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "FunctionAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class FunctionInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "FunctionInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class FunctionSizeLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "FunctionSizeLimitExceeded",
    ["BadRequestError", "ThrottlingError"],
    { status: 413 },
  )<{ readonly message?: string }> {}
export class IllegalDelete
  extends /*@__PURE__*/ TE.TaggedError("IllegalDelete", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior
  extends /*@__PURE__*/ TE.TaggedError(
    "IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IllegalOriginAccessConfiguration
  extends /*@__PURE__*/ TE.TaggedError(
    "IllegalOriginAccessConfiguration",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IllegalUpdate
  extends /*@__PURE__*/ TE.TaggedError("IllegalUpdate", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class InconsistentQuantities
  extends /*@__PURE__*/ TE.TaggedError(
    "InconsistentQuantities",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidArgument
  extends /*@__PURE__*/ TE.TaggedError("InvalidArgument", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidAssociation
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidAssociation",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class InvalidDefaultRootObject
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDefaultRootObject",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDomainNameForOriginAccessControl
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDomainNameForOriginAccessControl",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidErrorCode
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidErrorCode",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidForwardCookies
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidForwardCookies",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidFunctionAssociation
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidFunctionAssociation",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidGeoRestrictionParameter
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidGeoRestrictionParameter",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidHeadersForS3Origin
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidHeadersForS3Origin",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidIfMatchVersion
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidIfMatchVersion",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidLambdaFunctionAssociation
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidLambdaFunctionAssociation",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidLocationCode
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidLocationCode",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidMinimumProtocolVersion
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidMinimumProtocolVersion",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidOrigin
  extends /*@__PURE__*/ TE.TaggedError("InvalidOrigin", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidOriginAccessControl
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidOriginAccessControl",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidOriginAccessIdentity
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidOriginAccessIdentity",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidOriginKeepaliveTimeout
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidOriginKeepaliveTimeout",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidOriginReadTimeout
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidOriginReadTimeout",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidProtocolSettings
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidProtocolSettings",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidQueryStringParameters
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidQueryStringParameters",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRelativePath
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRelativePath",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRequiredProtocol
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequiredProtocol",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidResponseCode
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidResponseCode",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTagging
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagging", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidTTLOrder
  extends /*@__PURE__*/ TE.TaggedError("InvalidTTLOrder", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidViewerCertificate
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidViewerCertificate",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidWebACLId
  extends /*@__PURE__*/ TE.TaggedError("InvalidWebACLId", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class KeyGroupAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "KeyGroupAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class MissingBody
  extends /*@__PURE__*/ TE.TaggedError("MissingBody", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class MonitoringSubscriptionAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "MonitoringSubscriptionAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class NoSuchCachePolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchCachePolicy",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchCloudFrontOriginAccessIdentity
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchCloudFrontOriginAccessIdentity",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchContinuousDeploymentPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchContinuousDeploymentPolicy",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchDistribution
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchDistribution",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchFieldLevelEncryptionConfig
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchFieldLevelEncryptionConfig",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchFieldLevelEncryptionProfile
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchFieldLevelEncryptionProfile",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchFunctionExists
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchFunctionExists",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchInvalidation
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchInvalidation",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchMonitoringSubscription
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchMonitoringSubscription",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchOrigin
  extends /*@__PURE__*/ TE.TaggedError("NoSuchOrigin", ["BadRequestError"], {
    status: 404,
  })<{ readonly message?: string }> {}
export class NoSuchOriginAccessControl
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchOriginAccessControl",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchOriginRequestPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchOriginRequestPolicy",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchPublicKey
  extends /*@__PURE__*/ TE.TaggedError("NoSuchPublicKey", ["BadRequestError"], {
    status: 404,
  })<{ readonly message?: string }> {}
export class NoSuchRealtimeLogConfig
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchRealtimeLogConfig",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchResource
  extends /*@__PURE__*/ TE.TaggedError("NoSuchResource", ["BadRequestError"], {
    status: 404,
  })<{ readonly message?: string }> {}
export class NoSuchResponseHeadersPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchResponseHeadersPolicy",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NoSuchStreamingDistribution
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchStreamingDistribution",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class OriginAccessControlAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "OriginAccessControlAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class OriginAccessControlInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "OriginAccessControlInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class OriginRequestPolicyAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "OriginRequestPolicyAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class OriginRequestPolicyInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "OriginRequestPolicyInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class PreconditionFailed
  extends /*@__PURE__*/ TE.TaggedError("PreconditionFailed", [], {
    status: 412,
  })<{ readonly message?: string }> {}
export class PublicKeyAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "PublicKeyAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class PublicKeyInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "PublicKeyInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class QueryArgProfileEmpty
  extends /*@__PURE__*/ TE.TaggedError(
    "QueryArgProfileEmpty",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class RealtimeLogConfigAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "RealtimeLogConfigAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class RealtimeLogConfigInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "RealtimeLogConfigInUse",
    ["BadRequestError", "DependencyViolationError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class RealtimeLogConfigOwnerMismatch
  extends /*@__PURE__*/ TE.TaggedError(
    "RealtimeLogConfigOwnerMismatch",
    ["AuthError"],
    { status: 401 },
  )<{ readonly message?: string }> {}
export class ResourceInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceNotDisabled
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotDisabled",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResponseHeadersPolicyAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "ResponseHeadersPolicyAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResponseHeadersPolicyInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "ResponseHeadersPolicyInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class StagingDistributionInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "StagingDistributionInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class StreamingDistributionAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "StreamingDistributionAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class StreamingDistributionNotDisabled
  extends /*@__PURE__*/ TE.TaggedError(
    "StreamingDistributionNotDisabled",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class TestFunctionFailed
  extends /*@__PURE__*/ TE.TaggedError("TestFunctionFailed", ["ServerError"], {
    status: 500,
  })<{ readonly message?: string }> {}
export class TooLongCSPInResponseHeadersPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooLongCSPInResponseHeadersPolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyCacheBehaviors
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyCacheBehaviors",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyCachePolicies
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyCachePolicies",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyCertificates
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyCertificates",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyCloudFrontOriginAccessIdentities
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyCloudFrontOriginAccessIdentities",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyContinuousDeploymentPolicies
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyContinuousDeploymentPolicies",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyCookieNamesInWhiteList
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyCookieNamesInWhiteList",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyCookiesInCachePolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyCookiesInCachePolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyCookiesInOriginRequestPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyCookiesInOriginRequestPolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyCustomHeadersInResponseHeadersPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyCustomHeadersInResponseHeadersPolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyDistributionCNAMEs
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyDistributionCNAMEs",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyDistributions
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyDistributions",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyDistributionsAssociatedToCachePolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyDistributionsAssociatedToCachePolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyDistributionsAssociatedToFieldLevelEncryptionConfig
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyDistributionsAssociatedToFieldLevelEncryptionConfig",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyDistributionsAssociatedToKeyGroup
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyDistributionsAssociatedToKeyGroup",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyDistributionsAssociatedToOriginAccessControl
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyDistributionsAssociatedToOriginAccessControl",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyDistributionsAssociatedToOriginRequestPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyDistributionsAssociatedToOriginRequestPolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyDistributionsAssociatedToResponseHeadersPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyDistributionsAssociatedToResponseHeadersPolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyDistributionsWithFunctionAssociations
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyDistributionsWithFunctionAssociations",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyDistributionsWithLambdaAssociations
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyDistributionsWithLambdaAssociations",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyDistributionsWithSingleFunctionARN
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyDistributionsWithSingleFunctionARN",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyFieldLevelEncryptionConfigs
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyFieldLevelEncryptionConfigs",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyFieldLevelEncryptionContentTypeProfiles
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyFieldLevelEncryptionContentTypeProfiles",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyFieldLevelEncryptionEncryptionEntities
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyFieldLevelEncryptionEncryptionEntities",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyFieldLevelEncryptionFieldPatterns
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyFieldLevelEncryptionFieldPatterns",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyFieldLevelEncryptionProfiles
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyFieldLevelEncryptionProfiles",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyFieldLevelEncryptionQueryArgProfiles
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyFieldLevelEncryptionQueryArgProfiles",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyFunctionAssociations
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyFunctionAssociations",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyFunctions
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyFunctions",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyHeadersInCachePolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyHeadersInCachePolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyHeadersInForwardedValues
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyHeadersInForwardedValues",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyHeadersInOriginRequestPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyHeadersInOriginRequestPolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyInvalidationsInProgress
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyInvalidationsInProgress",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyKeyGroups
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyKeyGroups",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyKeyGroupsAssociatedToDistribution
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyKeyGroupsAssociatedToDistribution",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyLambdaFunctionAssociations
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyLambdaFunctionAssociations",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyOriginAccessControls
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyOriginAccessControls",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyOriginCustomHeaders
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyOriginCustomHeaders",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyOriginGroupsPerDistribution
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyOriginGroupsPerDistribution",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyOriginRequestPolicies
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyOriginRequestPolicies",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyOrigins
  extends /*@__PURE__*/ TE.TaggedError("TooManyOrigins", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class TooManyPublicKeys
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyPublicKeys",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyPublicKeysInKeyGroup
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyPublicKeysInKeyGroup",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyQueryStringParameters
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyQueryStringParameters",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyQueryStringsInCachePolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyQueryStringsInCachePolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyQueryStringsInOriginRequestPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyQueryStringsInOriginRequestPolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyRealtimeLogConfigs
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRealtimeLogConfigs",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyRemoveHeadersInResponseHeadersPolicy
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRemoveHeadersInResponseHeadersPolicy",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyResponseHeadersPolicies
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyResponseHeadersPolicies",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyStreamingDistributionCNAMEs
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyStreamingDistributionCNAMEs",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyStreamingDistributions
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyStreamingDistributions",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTrustedSigners
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTrustedSigners",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TrustedKeyGroupDoesNotExist
  extends /*@__PURE__*/ TE.TaggedError(
    "TrustedKeyGroupDoesNotExist",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TrustedSignerDoesNotExist
  extends /*@__PURE__*/ TE.TaggedError(
    "TrustedSignerDoesNotExist",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedOperation
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedOperation",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export interface AssociateAliasRequest {
  TargetDistributionId: string;
  Alias: string;
}
export interface AssociateAliasResponse {}
export interface AssociateDistributionTenantWebACLRequest {
  Id: string;
  WebACLArn: string;
  IfMatch?: string;
}
export interface AssociateDistributionTenantWebACLResult {
  Id?: string;
  WebACLArn?: string;
  ETag?: string;
}
export interface AssociateDistributionWebACLRequest {
  Id: string;
  WebACLArn: string;
  IfMatch?: string;
}
export interface AssociateDistributionWebACLResult {
  Id?: string;
  WebACLArn?: string;
  ETag?: string;
}
export interface CopyDistributionRequest {
  PrimaryDistributionId: string;
  Staging?: boolean;
  IfMatch?: string;
  CallerReference: string;
  Enabled?: boolean;
}
export type KeyPairIdList = string[];
export interface KeyPairIds {
  Quantity: number;
  Items?: string[];
}
export interface Signer {
  AwsAccountNumber?: string;
  KeyPairIds?: KeyPairIds;
}
export type SignerList = Signer[];
export interface ActiveTrustedSigners {
  Enabled: boolean;
  Quantity: number;
  Items?: Signer[];
}
export interface KGKeyPairIds {
  KeyGroupId?: string;
  KeyPairIds?: KeyPairIds;
}
export type KGKeyPairIdsList = KGKeyPairIds[];
export interface ActiveTrustedKeyGroups {
  Enabled: boolean;
  Quantity: number;
  Items?: KGKeyPairIds[];
}
export type AliasList = string[];
export interface Aliases {
  Quantity: number;
  Items?: string[];
}
export type SensitiveStringType = string | redacted.Redacted<string>;
export interface OriginCustomHeader {
  HeaderName: string;
  HeaderValue: string | redacted.Redacted<string>;
}
export type OriginCustomHeadersList = OriginCustomHeader[];
export interface CustomHeaders {
  Quantity: number;
  Items?: OriginCustomHeader[];
}
export interface S3OriginConfig {
  OriginAccessIdentity?: string;
  OriginReadTimeout?: number;
}
export type OriginProtocolPolicy =
  | "http-only"
  | "match-viewer"
  | "https-only"
  | (string & {});
export type SslProtocol =
  | "SSLv3"
  | "TLSv1"
  | "TLSv1.1"
  | "TLSv1.2"
  | (string & {});
export type SslProtocolsList = SslProtocol[];
export interface OriginSslProtocols {
  Quantity: number;
  Items: SslProtocol[];
}
export type IpAddressType = "ipv4" | "ipv6" | "dualstack" | (string & {});
export interface OriginMtlsConfig {
  ClientCertificateArn: string;
}
export interface CustomOriginConfig {
  HTTPPort: number;
  HTTPSPort: number;
  OriginProtocolPolicy: OriginProtocolPolicy;
  OriginSslProtocols?: OriginSslProtocols;
  OriginReadTimeout?: number;
  OriginKeepaliveTimeout?: number;
  IpAddressType?: IpAddressType;
  OriginMtlsConfig?: OriginMtlsConfig;
}
export interface VpcOriginConfig {
  VpcOriginId: string;
  OwnerAccountId?: string;
  OriginReadTimeout?: number;
  OriginKeepaliveTimeout?: number;
}
export type OriginShieldRegion = string;
export interface OriginShield {
  Enabled: boolean;
  OriginShieldRegion?: string;
}
export interface Origin {
  Id: string;
  DomainName: string;
  OriginPath?: string;
  CustomHeaders?: CustomHeaders;
  S3OriginConfig?: S3OriginConfig;
  CustomOriginConfig?: CustomOriginConfig;
  VpcOriginConfig?: VpcOriginConfig;
  ConnectionAttempts?: number;
  ConnectionTimeout?: number;
  ResponseCompletionTimeout?: number;
  OriginShield?: OriginShield;
  OriginAccessControlId?: string;
}
export type OriginList = Origin[];
export interface Origins {
  Quantity: number;
  Items: Origin[];
}
export type StatusCodeList = number[];
export interface StatusCodes {
  Quantity: number;
  Items: number[];
}
export interface OriginGroupFailoverCriteria {
  StatusCodes: StatusCodes;
}
export interface OriginGroupMember {
  OriginId: string;
}
export type OriginGroupMemberList = OriginGroupMember[];
export interface OriginGroupMembers {
  Quantity: number;
  Items: OriginGroupMember[];
}
export type OriginGroupSelectionCriteria =
  | "default"
  | "media-quality-based"
  | (string & {});
export interface OriginGroup {
  Id: string;
  FailoverCriteria: OriginGroupFailoverCriteria;
  Members: OriginGroupMembers;
  SelectionCriteria?: OriginGroupSelectionCriteria;
}
export type OriginGroupList = OriginGroup[];
export interface OriginGroups {
  Quantity: number;
  Items?: OriginGroup[];
}
export type AwsAccountNumberList = string[];
export interface TrustedSigners {
  Enabled: boolean;
  Quantity: number;
  Items?: string[];
}
export type TrustedKeyGroupIdList = string[];
export interface TrustedKeyGroups {
  Enabled: boolean;
  Quantity: number;
  Items?: string[];
}
export type ViewerProtocolPolicy =
  | "allow-all"
  | "https-only"
  | "redirect-to-https"
  | (string & {});
export type Method =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "PATCH"
  | "OPTIONS"
  | "DELETE"
  | (string & {});
export type MethodsList = Method[];
export interface CachedMethods {
  Quantity: number;
  Items: Method[];
}
export interface AllowedMethods {
  Quantity: number;
  Items: Method[];
  CachedMethods?: CachedMethods;
}
export type LambdaFunctionARN = string;
export type EventType =
  | "viewer-request"
  | "viewer-response"
  | "origin-request"
  | "origin-response"
  | (string & {});
export interface LambdaFunctionAssociation {
  LambdaFunctionARN: string;
  EventType: EventType;
  IncludeBody?: boolean;
}
export type LambdaFunctionAssociationList = LambdaFunctionAssociation[];
export interface LambdaFunctionAssociations {
  Quantity: number;
  Items?: LambdaFunctionAssociation[];
}
export type FunctionARN = string;
export interface FunctionAssociation {
  FunctionARN: string;
  EventType: EventType;
}
export type FunctionAssociationList = FunctionAssociation[];
export interface FunctionAssociations {
  Quantity: number;
  Items?: FunctionAssociation[];
}
export interface GrpcConfig {
  Enabled: boolean;
}
export type ItemSelection = "none" | "whitelist" | "all" | (string & {});
export type CookieNameList = string[];
export interface CookieNames {
  Quantity: number;
  Items?: string[];
}
export interface CookiePreference {
  Forward: ItemSelection;
  WhitelistedNames?: CookieNames;
}
export type HeaderList = string[];
export interface Headers {
  Quantity: number;
  Items?: string[];
}
export type QueryStringCacheKeysList = string[];
export interface QueryStringCacheKeys {
  Quantity: number;
  Items?: string[];
}
export interface ForwardedValues {
  QueryString: boolean;
  Cookies: CookiePreference;
  Headers?: Headers;
  QueryStringCacheKeys?: QueryStringCacheKeys;
}
export interface DefaultCacheBehavior {
  TargetOriginId: string;
  TrustedSigners?: TrustedSigners;
  TrustedKeyGroups?: TrustedKeyGroups;
  ViewerProtocolPolicy: ViewerProtocolPolicy;
  AllowedMethods?: AllowedMethods;
  SmoothStreaming?: boolean;
  Compress?: boolean;
  LambdaFunctionAssociations?: LambdaFunctionAssociations;
  FunctionAssociations?: FunctionAssociations;
  FieldLevelEncryptionId?: string;
  RealtimeLogConfigArn?: string;
  CachePolicyId?: string;
  OriginRequestPolicyId?: string;
  ResponseHeadersPolicyId?: string;
  GrpcConfig?: GrpcConfig;
  ForwardedValues?: ForwardedValues;
  MinTTL?: number;
  DefaultTTL?: number;
  MaxTTL?: number;
}
export interface CacheBehavior {
  PathPattern: string;
  TargetOriginId: string;
  TrustedSigners?: TrustedSigners;
  TrustedKeyGroups?: TrustedKeyGroups;
  ViewerProtocolPolicy: ViewerProtocolPolicy;
  AllowedMethods?: AllowedMethods;
  SmoothStreaming?: boolean;
  Compress?: boolean;
  LambdaFunctionAssociations?: LambdaFunctionAssociations;
  FunctionAssociations?: FunctionAssociations;
  FieldLevelEncryptionId?: string;
  RealtimeLogConfigArn?: string;
  CachePolicyId?: string;
  OriginRequestPolicyId?: string;
  ResponseHeadersPolicyId?: string;
  GrpcConfig?: GrpcConfig;
  ForwardedValues?: ForwardedValues;
  MinTTL?: number;
  DefaultTTL?: number;
  MaxTTL?: number;
}
export type CacheBehaviorList = CacheBehavior[];
export interface CacheBehaviors {
  Quantity: number;
  Items?: CacheBehavior[];
}
export interface CustomErrorResponse {
  ErrorCode: number;
  ResponsePagePath?: string;
  ResponseCode?: string;
  ErrorCachingMinTTL?: number;
}
export type CustomErrorResponseList = CustomErrorResponse[];
export interface CustomErrorResponses {
  Quantity: number;
  Items?: CustomErrorResponse[];
}
export type CommentType = string | redacted.Redacted<string>;
export interface LoggingConfig {
  Enabled?: boolean;
  IncludeCookies?: boolean;
  Bucket?: string;
  Prefix?: string;
}
export type PriceClass =
  | "PriceClass_100"
  | "PriceClass_200"
  | "PriceClass_All"
  | "None"
  | (string & {});
export type ServerCertificateId = string;
export type SSLSupportMethod = "sni-only" | "vip" | "static-ip" | (string & {});
export type MinimumProtocolVersion =
  | "SSLv3"
  | "TLSv1"
  | "TLSv1_2016"
  | "TLSv1.1_2016"
  | "TLSv1.2_2018"
  | "TLSv1.2_2019"
  | "TLSv1.2_2021"
  | "TLSv1.3_2025"
  | "TLSv1.2_2025"
  | (string & {});
export type CertificateSource = "cloudfront" | "iam" | "acm" | (string & {});
export interface ViewerCertificate {
  CloudFrontDefaultCertificate?: boolean;
  IAMCertificateId?: string;
  ACMCertificateArn?: string;
  SSLSupportMethod?: SSLSupportMethod;
  MinimumProtocolVersion?: MinimumProtocolVersion;
  Certificate?: string;
  CertificateSource?: CertificateSource;
}
export type GeoRestrictionType =
  | "blacklist"
  | "whitelist"
  | "none"
  | (string & {});
export type LocationList = string[];
export interface GeoRestriction {
  RestrictionType: GeoRestrictionType;
  Quantity: number;
  Items?: string[];
}
export interface Restrictions {
  GeoRestriction: GeoRestriction;
}
export type HttpVersion =
  | "http1.1"
  | "http2"
  | "http3"
  | "http2and3"
  | "HTTP1.1"
  | "HTTP2"
  | "HTTP3"
  | "HTTP2AND3"
  | (string & {});
export type ParameterName = string;
export type ParameterValue = string;
export interface StringSchemaConfig {
  Comment?: string | redacted.Redacted<string>;
  DefaultValue?: string;
  Required: boolean;
}
export interface ParameterDefinitionSchema {
  StringSchema?: StringSchemaConfig;
}
export interface ParameterDefinition {
  Name: string;
  Definition: ParameterDefinitionSchema;
}
export type ParameterDefinitions = ParameterDefinition[];
export interface TenantConfig {
  ParameterDefinitions?: ParameterDefinition[];
}
export type ConnectionMode = "direct" | "tenant-only" | (string & {});
export type ViewerMtlsMode =
  | "required"
  | "optional"
  | "passthrough"
  | (string & {});
export interface TrustStoreConfig {
  TrustStoreId: string;
  AdvertiseTrustStoreCaNames?: boolean;
  IgnoreCertificateExpiry?: boolean;
}
export interface ViewerMtlsConfig {
  Mode?: ViewerMtlsMode;
  TrustStoreConfig?: TrustStoreConfig;
}
export type ResourceId = string;
export interface ConnectionFunctionAssociation {
  Id: string;
}
export interface CacheTagConfig {
  HeaderName: string;
}
export interface DistributionConfig {
  CallerReference: string;
  Aliases?: Aliases;
  DefaultRootObject?: string;
  Origins: Origins;
  OriginGroups?: OriginGroups;
  DefaultCacheBehavior: DefaultCacheBehavior;
  CacheBehaviors?: CacheBehaviors;
  CustomErrorResponses?: CustomErrorResponses;
  Comment: string | redacted.Redacted<string>;
  Logging?: LoggingConfig;
  PriceClass?: PriceClass;
  Enabled: boolean;
  ViewerCertificate?: ViewerCertificate;
  Restrictions?: Restrictions;
  WebACLId?: string;
  HttpVersion?: HttpVersion;
  IsIPV6Enabled?: boolean;
  ContinuousDeploymentPolicyId?: string;
  Staging?: boolean;
  AnycastIpListId?: string;
  TenantConfig?: TenantConfig;
  ConnectionMode?: ConnectionMode;
  ViewerMtlsConfig?: ViewerMtlsConfig;
  ConnectionFunctionAssociation?: ConnectionFunctionAssociation;
  CacheTagConfig?: CacheTagConfig;
}
export type ICPRecordalStatus =
  | "APPROVED"
  | "SUSPENDED"
  | "PENDING"
  | (string & {});
export interface AliasICPRecordal {
  CNAME?: string;
  ICPRecordalStatus?: ICPRecordalStatus;
}
export type AliasICPRecordals = AliasICPRecordal[];
export interface Distribution {
  Id: string;
  ARN: string;
  Status: string;
  LastModifiedTime: Date;
  InProgressInvalidationBatches: number;
  DomainName: string;
  ActiveTrustedSigners?: ActiveTrustedSigners;
  ActiveTrustedKeyGroups?: ActiveTrustedKeyGroups;
  DistributionConfig: DistributionConfig;
  AliasICPRecordals?: AliasICPRecordal[];
}
export interface CopyDistributionResult {
  Distribution?: Distribution;
  Location?: string;
  ETag?: string;
}
export type AnycastIpListName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type TagList = Tag[];
export interface Tags {
  Items?: Tag[];
}
export type IpamCidrStatus =
  | "provisioned"
  | "failed-provision"
  | "provisioning"
  | "deprovisioned"
  | "failed-deprovision"
  | "deprovisioning"
  | "advertised"
  | "failed-advertise"
  | "advertising"
  | "withdrawn"
  | "failed-withdraw"
  | "withdrawing"
  | (string & {});
export interface IpamCidrConfig {
  Cidr: string;
  IpamPoolArn: string;
  AnycastIp?: string;
  Status?: IpamCidrStatus;
}
export type IpamCidrConfigList = IpamCidrConfig[];
export interface CreateAnycastIpListRequest {
  Name: string;
  IpCount: number;
  Tags?: Tags;
  IpAddressType?: IpAddressType;
  IpamCidrConfigs?: IpamCidrConfig[];
}
export interface IpamConfig {
  Quantity: number;
  IpamCidrConfigs: IpamCidrConfig[];
}
export type AnycastIps = string[];
export interface AnycastIpList {
  Id: string;
  Name: string;
  Status: string;
  Arn: string;
  IpAddressType?: IpAddressType;
  IpamConfig?: IpamConfig;
  AnycastIps: string[];
  IpCount: number;
  LastModifiedTime: Date;
}
export interface CreateAnycastIpListResult {
  AnycastIpList?: AnycastIpList;
  ETag?: string;
}
export type CachePolicyHeaderBehavior = "none" | "whitelist" | (string & {});
export interface CachePolicyHeadersConfig {
  HeaderBehavior: CachePolicyHeaderBehavior;
  Headers?: Headers;
}
export type CachePolicyCookieBehavior =
  | "none"
  | "whitelist"
  | "allExcept"
  | "all"
  | (string & {});
export interface CachePolicyCookiesConfig {
  CookieBehavior: CachePolicyCookieBehavior;
  Cookies?: CookieNames;
}
export type CachePolicyQueryStringBehavior =
  | "none"
  | "whitelist"
  | "allExcept"
  | "all"
  | (string & {});
export type QueryStringNamesList = string[];
export interface QueryStringNames {
  Quantity: number;
  Items?: string[];
}
export interface CachePolicyQueryStringsConfig {
  QueryStringBehavior: CachePolicyQueryStringBehavior;
  QueryStrings?: QueryStringNames;
}
export interface ParametersInCacheKeyAndForwardedToOrigin {
  EnableAcceptEncodingGzip: boolean;
  EnableAcceptEncodingBrotli?: boolean;
  HeadersConfig: CachePolicyHeadersConfig;
  CookiesConfig: CachePolicyCookiesConfig;
  QueryStringsConfig: CachePolicyQueryStringsConfig;
}
export interface CachePolicyConfig {
  Comment?: string;
  Name: string;
  DefaultTTL?: number;
  MaxTTL?: number;
  MinTTL: number;
  ParametersInCacheKeyAndForwardedToOrigin?: ParametersInCacheKeyAndForwardedToOrigin;
}
export interface CreateCachePolicyRequest {
  CachePolicyConfig: CachePolicyConfig;
}
export interface CachePolicy {
  Id: string;
  LastModifiedTime: Date;
  CachePolicyConfig: CachePolicyConfig;
}
export interface CreateCachePolicyResult {
  CachePolicy?: CachePolicy;
  Location?: string;
  ETag?: string;
}
export interface CloudFrontOriginAccessIdentityConfig {
  CallerReference: string;
  Comment: string;
}
export interface CreateCloudFrontOriginAccessIdentityRequest {
  CloudFrontOriginAccessIdentityConfig: CloudFrontOriginAccessIdentityConfig;
}
export interface CloudFrontOriginAccessIdentity {
  Id: string;
  S3CanonicalUserId: string;
  CloudFrontOriginAccessIdentityConfig?: CloudFrontOriginAccessIdentityConfig;
}
export interface CreateCloudFrontOriginAccessIdentityResult {
  CloudFrontOriginAccessIdentity?: CloudFrontOriginAccessIdentity;
  Location?: string;
  ETag?: string;
}
export type FunctionName = string;
export type FunctionRuntime =
  | "cloudfront-js-1.0"
  | "cloudfront-js-2.0"
  | (string & {});
export type KeyValueStoreARN = string;
export interface KeyValueStoreAssociation {
  KeyValueStoreARN: string;
}
export type KeyValueStoreAssociationList = KeyValueStoreAssociation[];
export interface KeyValueStoreAssociations {
  Quantity: number;
  Items?: KeyValueStoreAssociation[];
}
export interface FunctionConfig {
  Comment?: string;
  Runtime: FunctionRuntime;
  KeyValueStoreAssociations?: KeyValueStoreAssociations;
}
export type FunctionBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface CreateConnectionFunctionRequest {
  Name: string;
  ConnectionFunctionConfig: FunctionConfig;
  ConnectionFunctionCode: Uint8Array | redacted.Redacted<Uint8Array>;
  Tags?: Tags;
}
export type FunctionStage = "DEVELOPMENT" | "LIVE" | (string & {});
export interface ConnectionFunctionSummary {
  Name: string;
  Id: string;
  ConnectionFunctionConfig: FunctionConfig;
  ConnectionFunctionArn: string;
  Status: string;
  Stage: FunctionStage;
  CreatedTime: Date;
  LastModifiedTime: Date;
}
export interface CreateConnectionFunctionResult {
  ConnectionFunctionSummary?: ConnectionFunctionSummary;
  Location?: string;
  ETag?: string;
}
export interface CreateConnectionGroupRequest {
  Name: string;
  Ipv6Enabled?: boolean;
  Tags?: Tags;
  AnycastIpListId?: string;
  Enabled?: boolean;
}
export interface ConnectionGroup {
  Id?: string;
  Name?: string;
  Arn?: string;
  CreatedTime?: Date;
  LastModifiedTime?: Date;
  Tags?: Tags;
  Ipv6Enabled?: boolean;
  RoutingEndpoint?: string;
  AnycastIpListId?: string;
  Status?: string;
  Enabled?: boolean;
  IsDefault?: boolean;
}
export interface CreateConnectionGroupResult {
  ConnectionGroup?: ConnectionGroup;
  ETag?: string;
}
export type StagingDistributionDnsNameList = string[];
export interface StagingDistributionDnsNames {
  Quantity: number;
  Items?: string[];
}
export interface SessionStickinessConfig {
  IdleTTL: number;
  MaximumTTL: number;
}
export interface ContinuousDeploymentSingleWeightConfig {
  Weight: number;
  SessionStickinessConfig?: SessionStickinessConfig;
}
export interface ContinuousDeploymentSingleHeaderConfig {
  Header: string;
  Value: string;
}
export type ContinuousDeploymentPolicyType =
  | "SingleWeight"
  | "SingleHeader"
  | (string & {});
export interface TrafficConfig {
  SingleWeightConfig?: ContinuousDeploymentSingleWeightConfig;
  SingleHeaderConfig?: ContinuousDeploymentSingleHeaderConfig;
  Type: ContinuousDeploymentPolicyType;
}
export interface ContinuousDeploymentPolicyConfig {
  StagingDistributionDnsNames: StagingDistributionDnsNames;
  Enabled: boolean;
  TrafficConfig?: TrafficConfig;
}
export interface CreateContinuousDeploymentPolicyRequest {
  ContinuousDeploymentPolicyConfig: ContinuousDeploymentPolicyConfig;
}
export interface ContinuousDeploymentPolicy {
  Id: string;
  LastModifiedTime: Date;
  ContinuousDeploymentPolicyConfig: ContinuousDeploymentPolicyConfig;
}
export interface CreateContinuousDeploymentPolicyResult {
  ContinuousDeploymentPolicy?: ContinuousDeploymentPolicy;
  Location?: string;
  ETag?: string;
}
export interface CreateDistributionRequest {
  DistributionConfig: DistributionConfig;
}
export interface CreateDistributionResult {
  Distribution?: Distribution;
  Location?: string;
  ETag?: string;
}
export interface DomainItem {
  Domain: string;
}
export type DomainList = DomainItem[];
export type CustomizationActionType = "override" | "disable" | (string & {});
export interface WebAclCustomization {
  Action: CustomizationActionType;
  Arn?: string;
}
export interface Certificate {
  Arn: string;
}
export interface GeoRestrictionCustomization {
  RestrictionType: GeoRestrictionType;
  Locations?: string[];
}
export interface Customizations {
  WebAcl?: WebAclCustomization;
  Certificate?: Certificate;
  GeoRestrictions?: GeoRestrictionCustomization;
}
export interface Parameter {
  Name: string;
  Value: string;
}
export type Parameters = Parameter[];
export type ValidationTokenHost = "cloudfront" | "self-hosted" | (string & {});
export type CertificateTransparencyLoggingPreference =
  | "enabled"
  | "disabled"
  | (string & {});
export interface ManagedCertificateRequest {
  ValidationTokenHost: ValidationTokenHost;
  PrimaryDomainName?: string;
  CertificateTransparencyLoggingPreference?: CertificateTransparencyLoggingPreference;
}
export interface CreateDistributionTenantRequest {
  DistributionId: string;
  Name: string;
  Domains: DomainItem[];
  Tags?: Tags;
  Customizations?: Customizations;
  Parameters?: Parameter[];
  ConnectionGroupId?: string;
  ManagedCertificateRequest?: ManagedCertificateRequest;
  Enabled?: boolean;
}
export type DomainStatus = "active" | "inactive" | (string & {});
export interface DomainResult {
  Domain: string;
  Status?: DomainStatus;
}
export type DomainResultList = DomainResult[];
export interface DistributionTenant {
  Id?: string;
  DistributionId?: string;
  Name?: string;
  Arn?: string;
  Domains?: DomainResult[];
  Tags?: Tags;
  Customizations?: Customizations;
  Parameters?: Parameter[];
  ConnectionGroupId?: string;
  CreatedTime?: Date;
  LastModifiedTime?: Date;
  Enabled?: boolean;
  Status?: string;
}
export interface CreateDistributionTenantResult {
  DistributionTenant?: DistributionTenant;
  ETag?: string;
}
export interface DistributionConfigWithTags {
  DistributionConfig: DistributionConfig;
  Tags: Tags;
}
export interface CreateDistributionWithTagsRequest {
  DistributionConfigWithTags: DistributionConfigWithTags;
}
export interface CreateDistributionWithTagsResult {
  Distribution?: Distribution;
  Location?: string;
  ETag?: string;
}
export interface QueryArgProfile {
  QueryArg: string;
  ProfileId: string;
}
export type QueryArgProfileList = QueryArgProfile[];
export interface QueryArgProfiles {
  Quantity: number;
  Items?: QueryArgProfile[];
}
export interface QueryArgProfileConfig {
  ForwardWhenQueryArgProfileIsUnknown: boolean;
  QueryArgProfiles?: QueryArgProfiles;
}
export type Format = "URLEncoded" | (string & {});
export interface ContentTypeProfile {
  Format: Format;
  ProfileId?: string;
  ContentType: string;
}
export type ContentTypeProfileList = ContentTypeProfile[];
export interface ContentTypeProfiles {
  Quantity: number;
  Items?: ContentTypeProfile[];
}
export interface ContentTypeProfileConfig {
  ForwardWhenContentTypeIsUnknown: boolean;
  ContentTypeProfiles?: ContentTypeProfiles;
}
export interface FieldLevelEncryptionConfig {
  CallerReference: string;
  Comment?: string;
  QueryArgProfileConfig?: QueryArgProfileConfig;
  ContentTypeProfileConfig?: ContentTypeProfileConfig;
}
export interface CreateFieldLevelEncryptionConfigRequest {
  FieldLevelEncryptionConfig: FieldLevelEncryptionConfig;
}
export interface FieldLevelEncryption {
  Id: string;
  LastModifiedTime: Date;
  FieldLevelEncryptionConfig: FieldLevelEncryptionConfig;
}
export interface CreateFieldLevelEncryptionConfigResult {
  FieldLevelEncryption?: FieldLevelEncryption;
  Location?: string;
  ETag?: string;
}
export type FieldPatternList = string[];
export interface FieldPatterns {
  Quantity: number;
  Items?: string[];
}
export interface EncryptionEntity {
  PublicKeyId: string;
  ProviderId: string;
  FieldPatterns: FieldPatterns;
}
export type EncryptionEntityList = EncryptionEntity[];
export interface EncryptionEntities {
  Quantity: number;
  Items?: EncryptionEntity[];
}
export interface FieldLevelEncryptionProfileConfig {
  Name: string;
  CallerReference: string;
  Comment?: string;
  EncryptionEntities: EncryptionEntities;
}
export interface CreateFieldLevelEncryptionProfileRequest {
  FieldLevelEncryptionProfileConfig: FieldLevelEncryptionProfileConfig;
}
export interface FieldLevelEncryptionProfile {
  Id: string;
  LastModifiedTime: Date;
  FieldLevelEncryptionProfileConfig: FieldLevelEncryptionProfileConfig;
}
export interface CreateFieldLevelEncryptionProfileResult {
  FieldLevelEncryptionProfile?: FieldLevelEncryptionProfile;
  Location?: string;
  ETag?: string;
}
export interface CreateFunctionRequest {
  Name: string;
  FunctionConfig: FunctionConfig;
  FunctionCode: Uint8Array | redacted.Redacted<Uint8Array>;
  Tags?: Tags;
}
export interface FunctionMetadata {
  FunctionARN: string;
  Stage?: FunctionStage;
  CreatedTime?: Date;
  LastModifiedTime: Date;
}
export interface FunctionSummary {
  Name: string;
  Status?: string;
  FunctionConfig: FunctionConfig;
  FunctionMetadata: FunctionMetadata;
}
export interface CreateFunctionResult {
  FunctionSummary?: FunctionSummary;
  Location?: string;
  ETag?: string;
}
export type PathList = string[];
export interface Paths {
  Quantity: number;
  Items?: string[];
}
export interface InvalidationBatch {
  Paths: Paths;
  CallerReference: string;
}
export interface CreateInvalidationRequest {
  DistributionId: string;
  InvalidationBatch: InvalidationBatch;
}
export interface Invalidation {
  Id: string;
  Status: string;
  CreateTime: Date;
  InvalidationBatch: InvalidationBatch;
}
export interface CreateInvalidationResult {
  Location?: string;
  Invalidation?: Invalidation;
}
export interface CreateInvalidationForDistributionTenantRequest {
  Id: string;
  InvalidationBatch: InvalidationBatch;
}
export interface CreateInvalidationForDistributionTenantResult {
  Location?: string;
  Invalidation?: Invalidation;
}
export type PublicKeyIdList = string[];
export interface KeyGroupConfig {
  Name: string;
  Items: string[];
  Comment?: string;
}
export interface CreateKeyGroupRequest {
  KeyGroupConfig: KeyGroupConfig;
}
export interface KeyGroup {
  Id: string;
  LastModifiedTime: Date;
  KeyGroupConfig: KeyGroupConfig;
}
export interface CreateKeyGroupResult {
  KeyGroup?: KeyGroup;
  Location?: string;
  ETag?: string;
}
export type KeyValueStoreName = string;
export type KeyValueStoreComment = string;
export type ImportSourceType = "S3" | (string & {});
export interface ImportSource {
  SourceType: ImportSourceType;
  SourceARN: string;
}
export interface CreateKeyValueStoreRequest {
  Name: string;
  Comment?: string;
  ImportSource?: ImportSource;
  Tags?: Tags;
}
export interface KeyValueStore {
  Name: string;
  Id: string;
  Comment?: string;
  ARN: string;
  Status?: string;
  LastModifiedTime: Date;
}
export interface CreateKeyValueStoreResult {
  KeyValueStore?: KeyValueStore;
  ETag?: string;
  Location?: string;
}
export type RealtimeMetricsSubscriptionStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
export interface RealtimeMetricsSubscriptionConfig {
  RealtimeMetricsSubscriptionStatus: RealtimeMetricsSubscriptionStatus;
}
export interface MonitoringSubscription {
  RealtimeMetricsSubscriptionConfig?: RealtimeMetricsSubscriptionConfig;
}
export interface CreateMonitoringSubscriptionRequest {
  DistributionId: string;
  MonitoringSubscription: MonitoringSubscription;
}
export interface CreateMonitoringSubscriptionResult {
  MonitoringSubscription?: MonitoringSubscription;
}
export type OriginAccessControlSigningProtocols =
  | "sigv4"
  | "sigv4a"
  | (string & {});
export type OriginAccessControlSigningBehaviors =
  | "never"
  | "always"
  | "no-override"
  | (string & {});
export type OriginAccessControlOriginTypes =
  | "s3"
  | "mediastore"
  | "mediapackagev2"
  | "lambda"
  | (string & {});
export interface OriginAccessControlConfig {
  Name: string;
  Description?: string;
  SigningProtocol: OriginAccessControlSigningProtocols;
  SigningBehavior: OriginAccessControlSigningBehaviors;
  OriginAccessControlOriginType: OriginAccessControlOriginTypes;
}
export interface CreateOriginAccessControlRequest {
  OriginAccessControlConfig: OriginAccessControlConfig;
}
export interface OriginAccessControl {
  Id: string;
  OriginAccessControlConfig?: OriginAccessControlConfig;
}
export interface CreateOriginAccessControlResult {
  OriginAccessControl?: OriginAccessControl;
  Location?: string;
  ETag?: string;
}
export type OriginRequestPolicyHeaderBehavior =
  | "none"
  | "whitelist"
  | "allViewer"
  | "allViewerAndWhitelistCloudFront"
  | "allExcept"
  | (string & {});
export interface OriginRequestPolicyHeadersConfig {
  HeaderBehavior: OriginRequestPolicyHeaderBehavior;
  Headers?: Headers;
}
export type OriginRequestPolicyCookieBehavior =
  | "none"
  | "whitelist"
  | "all"
  | "allExcept"
  | (string & {});
export interface OriginRequestPolicyCookiesConfig {
  CookieBehavior: OriginRequestPolicyCookieBehavior;
  Cookies?: CookieNames;
}
export type OriginRequestPolicyQueryStringBehavior =
  | "none"
  | "whitelist"
  | "all"
  | "allExcept"
  | (string & {});
export interface OriginRequestPolicyQueryStringsConfig {
  QueryStringBehavior: OriginRequestPolicyQueryStringBehavior;
  QueryStrings?: QueryStringNames;
}
export interface OriginRequestPolicyConfig {
  Comment?: string;
  Name: string;
  HeadersConfig: OriginRequestPolicyHeadersConfig;
  CookiesConfig: OriginRequestPolicyCookiesConfig;
  QueryStringsConfig: OriginRequestPolicyQueryStringsConfig;
}
export interface CreateOriginRequestPolicyRequest {
  OriginRequestPolicyConfig: OriginRequestPolicyConfig;
}
export interface OriginRequestPolicy {
  Id: string;
  LastModifiedTime: Date;
  OriginRequestPolicyConfig: OriginRequestPolicyConfig;
}
export interface CreateOriginRequestPolicyResult {
  OriginRequestPolicy?: OriginRequestPolicy;
  Location?: string;
  ETag?: string;
}
export interface PublicKeyConfig {
  CallerReference: string;
  Name: string;
  EncodedKey: string;
  Comment?: string;
}
export interface CreatePublicKeyRequest {
  PublicKeyConfig: PublicKeyConfig;
}
export interface PublicKey {
  Id: string;
  CreatedTime: Date;
  PublicKeyConfig: PublicKeyConfig;
}
export interface CreatePublicKeyResult {
  PublicKey?: PublicKey;
  Location?: string;
  ETag?: string;
}
export interface KinesisStreamConfig {
  RoleARN: string;
  StreamARN: string;
}
export interface EndPoint {
  StreamType: string;
  KinesisStreamConfig?: KinesisStreamConfig;
}
export type EndPointList = EndPoint[];
export type FieldList = string[];
export interface CreateRealtimeLogConfigRequest {
  EndPoints: EndPoint[];
  Fields: string[];
  Name: string;
  SamplingRate: number;
}
export interface RealtimeLogConfig {
  ARN: string;
  Name: string;
  SamplingRate: number;
  EndPoints: EndPoint[];
  Fields: string[];
}
export interface CreateRealtimeLogConfigResult {
  RealtimeLogConfig?: RealtimeLogConfig;
}
export type AccessControlAllowOriginsList = string[];
export interface ResponseHeadersPolicyAccessControlAllowOrigins {
  Quantity: number;
  Items: string[];
}
export type AccessControlAllowHeadersList = string[];
export interface ResponseHeadersPolicyAccessControlAllowHeaders {
  Quantity: number;
  Items: string[];
}
export type ResponseHeadersPolicyAccessControlAllowMethodsValues =
  | "GET"
  | "POST"
  | "OPTIONS"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "ALL"
  | (string & {});
export type AccessControlAllowMethodsList =
  ResponseHeadersPolicyAccessControlAllowMethodsValues[];
export interface ResponseHeadersPolicyAccessControlAllowMethods {
  Quantity: number;
  Items: ResponseHeadersPolicyAccessControlAllowMethodsValues[];
}
export type AccessControlExposeHeadersList = string[];
export interface ResponseHeadersPolicyAccessControlExposeHeaders {
  Quantity: number;
  Items?: string[];
}
export interface ResponseHeadersPolicyCorsConfig {
  AccessControlAllowOrigins: ResponseHeadersPolicyAccessControlAllowOrigins;
  AccessControlAllowHeaders: ResponseHeadersPolicyAccessControlAllowHeaders;
  AccessControlAllowMethods: ResponseHeadersPolicyAccessControlAllowMethods;
  AccessControlAllowCredentials: boolean;
  AccessControlExposeHeaders?: ResponseHeadersPolicyAccessControlExposeHeaders;
  AccessControlMaxAgeSec?: number;
  OriginOverride: boolean;
}
export interface ResponseHeadersPolicyXSSProtection {
  Override: boolean;
  Protection: boolean;
  ModeBlock?: boolean;
  ReportUri?: string;
}
export type FrameOptionsList = "DENY" | "SAMEORIGIN" | (string & {});
export interface ResponseHeadersPolicyFrameOptions {
  Override: boolean;
  FrameOption: FrameOptionsList;
}
export type ReferrerPolicyList =
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url"
  | (string & {});
export interface ResponseHeadersPolicyReferrerPolicy {
  Override: boolean;
  ReferrerPolicy: ReferrerPolicyList;
}
export interface ResponseHeadersPolicyContentSecurityPolicy {
  Override: boolean;
  ContentSecurityPolicy: string;
}
export interface ResponseHeadersPolicyContentTypeOptions {
  Override: boolean;
}
export interface ResponseHeadersPolicyStrictTransportSecurity {
  Override: boolean;
  IncludeSubdomains?: boolean;
  Preload?: boolean;
  AccessControlMaxAgeSec: number;
}
export interface ResponseHeadersPolicySecurityHeadersConfig {
  XSSProtection?: ResponseHeadersPolicyXSSProtection;
  FrameOptions?: ResponseHeadersPolicyFrameOptions;
  ReferrerPolicy?: ResponseHeadersPolicyReferrerPolicy;
  ContentSecurityPolicy?: ResponseHeadersPolicyContentSecurityPolicy;
  ContentTypeOptions?: ResponseHeadersPolicyContentTypeOptions;
  StrictTransportSecurity?: ResponseHeadersPolicyStrictTransportSecurity;
}
export type SamplingRate = number;
export interface ResponseHeadersPolicyServerTimingHeadersConfig {
  Enabled: boolean;
  SamplingRate?: number;
}
export interface ResponseHeadersPolicyCustomHeader {
  Header: string;
  Value: string;
  Override: boolean;
}
export type ResponseHeadersPolicyCustomHeaderList =
  ResponseHeadersPolicyCustomHeader[];
export interface ResponseHeadersPolicyCustomHeadersConfig {
  Quantity: number;
  Items?: ResponseHeadersPolicyCustomHeader[];
}
export interface ResponseHeadersPolicyRemoveHeader {
  Header: string;
}
export type ResponseHeadersPolicyRemoveHeaderList =
  ResponseHeadersPolicyRemoveHeader[];
export interface ResponseHeadersPolicyRemoveHeadersConfig {
  Quantity: number;
  Items?: ResponseHeadersPolicyRemoveHeader[];
}
export interface ResponseHeadersPolicyConfig {
  Comment?: string;
  Name: string;
  CorsConfig?: ResponseHeadersPolicyCorsConfig;
  SecurityHeadersConfig?: ResponseHeadersPolicySecurityHeadersConfig;
  ServerTimingHeadersConfig?: ResponseHeadersPolicyServerTimingHeadersConfig;
  CustomHeadersConfig?: ResponseHeadersPolicyCustomHeadersConfig;
  RemoveHeadersConfig?: ResponseHeadersPolicyRemoveHeadersConfig;
}
export interface CreateResponseHeadersPolicyRequest {
  ResponseHeadersPolicyConfig: ResponseHeadersPolicyConfig;
}
export interface ResponseHeadersPolicy {
  Id: string;
  LastModifiedTime: Date;
  ResponseHeadersPolicyConfig: ResponseHeadersPolicyConfig;
}
export interface CreateResponseHeadersPolicyResult {
  ResponseHeadersPolicy?: ResponseHeadersPolicy;
  Location?: string;
  ETag?: string;
}
export interface S3Origin {
  DomainName: string;
  OriginAccessIdentity: string;
}
export interface StreamingLoggingConfig {
  Enabled: boolean;
  Bucket: string;
  Prefix: string;
}
export interface StreamingDistributionConfig {
  CallerReference: string;
  S3Origin: S3Origin;
  Aliases?: Aliases;
  Comment: string;
  Logging?: StreamingLoggingConfig;
  TrustedSigners: TrustedSigners;
  PriceClass?: PriceClass;
  Enabled: boolean;
}
export interface CreateStreamingDistributionRequest {
  StreamingDistributionConfig: StreamingDistributionConfig;
}
export interface StreamingDistribution {
  Id: string;
  ARN: string;
  Status: string;
  LastModifiedTime?: Date;
  DomainName: string;
  ActiveTrustedSigners: ActiveTrustedSigners;
  StreamingDistributionConfig: StreamingDistributionConfig;
}
export interface CreateStreamingDistributionResult {
  StreamingDistribution?: StreamingDistribution;
  Location?: string;
  ETag?: string;
}
export interface StreamingDistributionConfigWithTags {
  StreamingDistributionConfig: StreamingDistributionConfig;
  Tags: Tags;
}
export interface CreateStreamingDistributionWithTagsRequest {
  StreamingDistributionConfigWithTags: StreamingDistributionConfigWithTags;
}
export interface CreateStreamingDistributionWithTagsResult {
  StreamingDistribution?: StreamingDistribution;
  Location?: string;
  ETag?: string;
}
export interface CaCertificatesBundleS3Location {
  Bucket: string;
  Key: string;
  Region: string;
  Version?: string;
}
export type CaCertificatesBundleSource = {
  CaCertificatesBundleS3Location: CaCertificatesBundleS3Location;
};
export interface CreateTrustStoreRequest {
  Name: string;
  CaCertificatesBundleSource: CaCertificatesBundleSource;
  UseClientCertificateOCSPEndpoint?: boolean;
  Tags?: Tags;
}
export type TrustStoreStatus = "pending" | "active" | "failed" | (string & {});
export interface TrustStore {
  Id?: string;
  Arn?: string;
  Name?: string;
  Status?: TrustStoreStatus;
  NumberOfCaCertificates?: number;
  LastModifiedTime?: Date;
  Reason?: string;
  UseClientCertificateOCSPEndpoint?: boolean;
}
export interface CreateTrustStoreResult {
  TrustStore?: TrustStore;
  ETag?: string;
}
export interface VpcOriginEndpointConfig {
  Name: string;
  Arn: string;
  HTTPPort: number;
  HTTPSPort: number;
  OriginProtocolPolicy: OriginProtocolPolicy;
  OriginSslProtocols?: OriginSslProtocols;
}
export interface CreateVpcOriginRequest {
  VpcOriginEndpointConfig: VpcOriginEndpointConfig;
  Tags?: Tags;
}
export interface VpcOrigin {
  Id: string;
  Arn: string;
  AccountId?: string;
  Status: string;
  CreatedTime: Date;
  LastModifiedTime: Date;
  VpcOriginEndpointConfig: VpcOriginEndpointConfig;
}
export interface CreateVpcOriginResult {
  VpcOrigin?: VpcOrigin;
  Location?: string;
  ETag?: string;
}
export interface DeleteAnycastIpListRequest {
  Id: string;
  IfMatch: string;
}
export interface DeleteAnycastIpListResponse {}
export interface DeleteCachePolicyRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeleteCachePolicyResponse {}
export interface DeleteCloudFrontOriginAccessIdentityRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeleteCloudFrontOriginAccessIdentityResponse {}
export interface DeleteConnectionFunctionRequest {
  Id: string;
  IfMatch: string;
}
export interface DeleteConnectionFunctionResponse {}
export interface DeleteConnectionGroupRequest {
  Id: string;
  IfMatch: string;
}
export interface DeleteConnectionGroupResponse {}
export interface DeleteContinuousDeploymentPolicyRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeleteContinuousDeploymentPolicyResponse {}
export interface DeleteDistributionRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeleteDistributionResponse {}
export interface DeleteDistributionTenantRequest {
  Id: string;
  IfMatch: string;
}
export interface DeleteDistributionTenantResponse {}
export interface DeleteFieldLevelEncryptionConfigRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeleteFieldLevelEncryptionConfigResponse {}
export interface DeleteFieldLevelEncryptionProfileRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeleteFieldLevelEncryptionProfileResponse {}
export interface DeleteFunctionRequest {
  Name: string;
  IfMatch: string;
}
export interface DeleteFunctionResponse {}
export interface DeleteKeyGroupRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeleteKeyGroupResponse {}
export interface DeleteKeyValueStoreRequest {
  Name: string;
  IfMatch: string;
}
export interface DeleteKeyValueStoreResponse {}
export interface DeleteMonitoringSubscriptionRequest {
  DistributionId: string;
}
export interface DeleteMonitoringSubscriptionResult {}
export interface DeleteOriginAccessControlRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeleteOriginAccessControlResponse {}
export interface DeleteOriginRequestPolicyRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeleteOriginRequestPolicyResponse {}
export interface DeletePublicKeyRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeletePublicKeyResponse {}
export interface DeleteRealtimeLogConfigRequest {
  Name?: string;
  ARN?: string;
}
export interface DeleteRealtimeLogConfigResponse {}
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteResponseHeadersPolicyRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeleteResponseHeadersPolicyResponse {}
export interface DeleteStreamingDistributionRequest {
  Id: string;
  IfMatch?: string;
}
export interface DeleteStreamingDistributionResponse {}
export interface DeleteTrustStoreRequest {
  Id: string;
  IfMatch: string;
}
export interface DeleteTrustStoreResponse {}
export interface DeleteVpcOriginRequest {
  Id: string;
  IfMatch: string;
}
export interface DeleteVpcOriginResult {
  VpcOrigin?: VpcOrigin;
  ETag?: string;
}
export interface DescribeConnectionFunctionRequest {
  Identifier: string;
  Stage?: FunctionStage;
}
export interface DescribeConnectionFunctionResult {
  ConnectionFunctionSummary?: ConnectionFunctionSummary;
  ETag?: string;
}
export interface DescribeFunctionRequest {
  Name: string;
  Stage?: FunctionStage;
}
export interface DescribeFunctionResult {
  FunctionSummary?: FunctionSummary;
  ETag?: string;
}
export interface DescribeKeyValueStoreRequest {
  Name: string;
}
export interface DescribeKeyValueStoreResult {
  KeyValueStore?: KeyValueStore;
  ETag?: string;
}
export interface DisassociateDistributionTenantWebACLRequest {
  Id: string;
  IfMatch?: string;
}
export interface DisassociateDistributionTenantWebACLResult {
  Id?: string;
  ETag?: string;
}
export interface DisassociateDistributionWebACLRequest {
  Id: string;
  IfMatch?: string;
}
export interface DisassociateDistributionWebACLResult {
  Id?: string;
  ETag?: string;
}
export interface GetAnycastIpListRequest {
  Id: string;
}
export interface GetAnycastIpListResult {
  AnycastIpList?: AnycastIpList;
  ETag?: string;
}
export interface GetCachePolicyRequest {
  Id: string;
}
export interface GetCachePolicyResult {
  CachePolicy?: CachePolicy;
  ETag?: string;
}
export interface GetCachePolicyConfigRequest {
  Id: string;
}
export interface GetCachePolicyConfigResult {
  CachePolicyConfig?: CachePolicyConfig;
  ETag?: string;
}
export interface GetCloudFrontOriginAccessIdentityRequest {
  Id: string;
}
export interface GetCloudFrontOriginAccessIdentityResult {
  CloudFrontOriginAccessIdentity?: CloudFrontOriginAccessIdentity;
  ETag?: string;
}
export interface GetCloudFrontOriginAccessIdentityConfigRequest {
  Id: string;
}
export interface GetCloudFrontOriginAccessIdentityConfigResult {
  CloudFrontOriginAccessIdentityConfig?: CloudFrontOriginAccessIdentityConfig;
  ETag?: string;
}
export interface GetConnectionFunctionRequest {
  Identifier: string;
  Stage?: FunctionStage;
}
export interface GetConnectionFunctionResult {
  ConnectionFunctionCode?: T.StreamingOutputBody;
  ETag?: string;
  ContentType?: string;
}
export interface GetConnectionGroupRequest {
  Identifier: string;
}
export interface GetConnectionGroupResult {
  ConnectionGroup?: ConnectionGroup;
  ETag?: string;
}
export interface GetConnectionGroupByRoutingEndpointRequest {
  RoutingEndpoint: string;
}
export interface GetConnectionGroupByRoutingEndpointResult {
  ConnectionGroup?: ConnectionGroup;
  ETag?: string;
}
export interface GetContinuousDeploymentPolicyRequest {
  Id: string;
}
export interface GetContinuousDeploymentPolicyResult {
  ContinuousDeploymentPolicy?: ContinuousDeploymentPolicy;
  ETag?: string;
}
export interface GetContinuousDeploymentPolicyConfigRequest {
  Id: string;
}
export interface GetContinuousDeploymentPolicyConfigResult {
  ContinuousDeploymentPolicyConfig?: ContinuousDeploymentPolicyConfig;
  ETag?: string;
}
export interface GetDistributionRequest {
  Id: string;
}
export interface GetDistributionResult {
  Distribution?: Distribution;
  ETag?: string;
}
export interface GetDistributionConfigRequest {
  Id: string;
}
export interface GetDistributionConfigResult {
  DistributionConfig?: DistributionConfig;
  ETag?: string;
}
export interface GetDistributionTenantRequest {
  Identifier: string;
}
export interface GetDistributionTenantResult {
  DistributionTenant?: DistributionTenant;
  ETag?: string;
}
export interface GetDistributionTenantByDomainRequest {
  Domain: string;
}
export interface GetDistributionTenantByDomainResult {
  DistributionTenant?: DistributionTenant;
  ETag?: string;
}
export interface GetFieldLevelEncryptionRequest {
  Id: string;
}
export interface GetFieldLevelEncryptionResult {
  FieldLevelEncryption?: FieldLevelEncryption;
  ETag?: string;
}
export interface GetFieldLevelEncryptionConfigRequest {
  Id: string;
}
export interface GetFieldLevelEncryptionConfigResult {
  FieldLevelEncryptionConfig?: FieldLevelEncryptionConfig;
  ETag?: string;
}
export interface GetFieldLevelEncryptionProfileRequest {
  Id: string;
}
export interface GetFieldLevelEncryptionProfileResult {
  FieldLevelEncryptionProfile?: FieldLevelEncryptionProfile;
  ETag?: string;
}
export interface GetFieldLevelEncryptionProfileConfigRequest {
  Id: string;
}
export interface GetFieldLevelEncryptionProfileConfigResult {
  FieldLevelEncryptionProfileConfig?: FieldLevelEncryptionProfileConfig;
  ETag?: string;
}
export interface GetFunctionRequest {
  Name: string;
  Stage?: FunctionStage;
}
export interface GetFunctionResult {
  FunctionCode?: T.StreamingOutputBody;
  ETag?: string;
  ContentType?: string;
}
export interface GetInvalidationRequest {
  DistributionId: string;
  Id: string;
}
export interface GetInvalidationResult {
  Invalidation?: Invalidation;
}
export interface GetInvalidationForDistributionTenantRequest {
  DistributionTenantId: string;
  Id: string;
}
export interface GetInvalidationForDistributionTenantResult {
  Invalidation?: Invalidation;
}
export interface GetKeyGroupRequest {
  Id: string;
}
export interface GetKeyGroupResult {
  KeyGroup?: KeyGroup;
  ETag?: string;
}
export interface GetKeyGroupConfigRequest {
  Id: string;
}
export interface GetKeyGroupConfigResult {
  KeyGroupConfig?: KeyGroupConfig;
  ETag?: string;
}
export interface GetManagedCertificateDetailsRequest {
  Identifier: string;
}
export type ManagedCertificateStatus =
  | "pending-validation"
  | "issued"
  | "inactive"
  | "expired"
  | "validation-timed-out"
  | "revoked"
  | "failed"
  | (string & {});
export interface ValidationTokenDetail {
  Domain: string;
  RedirectTo?: string;
  RedirectFrom?: string;
}
export type ValidationTokenDetailList = ValidationTokenDetail[];
export interface ManagedCertificateDetails {
  CertificateArn?: string;
  CertificateStatus?: ManagedCertificateStatus;
  ValidationTokenHost?: ValidationTokenHost;
  ValidationTokenDetails?: ValidationTokenDetail[];
}
export interface GetManagedCertificateDetailsResult {
  ManagedCertificateDetails?: ManagedCertificateDetails;
}
export interface GetMonitoringSubscriptionRequest {
  DistributionId: string;
}
export interface GetMonitoringSubscriptionResult {
  MonitoringSubscription?: MonitoringSubscription;
}
export interface GetOriginAccessControlRequest {
  Id: string;
}
export interface GetOriginAccessControlResult {
  OriginAccessControl?: OriginAccessControl;
  ETag?: string;
}
export interface GetOriginAccessControlConfigRequest {
  Id: string;
}
export interface GetOriginAccessControlConfigResult {
  OriginAccessControlConfig?: OriginAccessControlConfig;
  ETag?: string;
}
export interface GetOriginRequestPolicyRequest {
  Id: string;
}
export interface GetOriginRequestPolicyResult {
  OriginRequestPolicy?: OriginRequestPolicy;
  ETag?: string;
}
export interface GetOriginRequestPolicyConfigRequest {
  Id: string;
}
export interface GetOriginRequestPolicyConfigResult {
  OriginRequestPolicyConfig?: OriginRequestPolicyConfig;
  ETag?: string;
}
export interface GetPublicKeyRequest {
  Id: string;
}
export interface GetPublicKeyResult {
  PublicKey?: PublicKey;
  ETag?: string;
}
export interface GetPublicKeyConfigRequest {
  Id: string;
}
export interface GetPublicKeyConfigResult {
  PublicKeyConfig?: PublicKeyConfig;
  ETag?: string;
}
export interface GetRealtimeLogConfigRequest {
  Name?: string;
  ARN?: string;
}
export interface GetRealtimeLogConfigResult {
  RealtimeLogConfig?: RealtimeLogConfig;
}
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export interface GetResourcePolicyResult {
  ResourceArn?: string;
  PolicyDocument?: string;
}
export interface GetResponseHeadersPolicyRequest {
  Id: string;
}
export interface GetResponseHeadersPolicyResult {
  ResponseHeadersPolicy?: ResponseHeadersPolicy;
  ETag?: string;
}
export interface GetResponseHeadersPolicyConfigRequest {
  Id: string;
}
export interface GetResponseHeadersPolicyConfigResult {
  ResponseHeadersPolicyConfig?: ResponseHeadersPolicyConfig;
  ETag?: string;
}
export interface GetStreamingDistributionRequest {
  Id: string;
}
export interface GetStreamingDistributionResult {
  StreamingDistribution?: StreamingDistribution;
  ETag?: string;
}
export interface GetStreamingDistributionConfigRequest {
  Id: string;
}
export interface GetStreamingDistributionConfigResult {
  StreamingDistributionConfig?: StreamingDistributionConfig;
  ETag?: string;
}
export interface GetTrustStoreRequest {
  Identifier: string;
}
export interface GetTrustStoreResult {
  TrustStore?: TrustStore;
  ETag?: string;
}
export interface GetVpcOriginRequest {
  Id: string;
}
export interface GetVpcOriginResult {
  VpcOrigin?: VpcOrigin;
  ETag?: string;
}
export interface ListAnycastIpListsRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface AnycastIpListSummary {
  Id: string;
  Name: string;
  Status: string;
  Arn: string;
  IpCount: number;
  LastModifiedTime: Date;
  IpAddressType?: IpAddressType;
  ETag?: string;
  IpamConfig?: IpamConfig;
}
export type AnycastIpListSummaries = AnycastIpListSummary[];
export interface AnycastIpListCollection {
  Items?: AnycastIpListSummary[];
  Marker?: string;
  NextMarker?: string;
  MaxItems: number;
  IsTruncated: boolean;
  Quantity: number;
}
export interface ListAnycastIpListsResult {
  AnycastIpLists?: AnycastIpListCollection;
}
export type CachePolicyType = "managed" | "custom" | (string & {});
export interface ListCachePoliciesRequest {
  Type?: CachePolicyType;
  Marker?: string;
  MaxItems?: number;
}
export interface CachePolicySummary {
  Type: CachePolicyType;
  CachePolicy: CachePolicy;
}
export type CachePolicySummaryList = CachePolicySummary[];
export interface CachePolicyList {
  NextMarker?: string;
  MaxItems: number;
  Quantity: number;
  Items?: CachePolicySummary[];
}
export interface ListCachePoliciesResult {
  CachePolicyList?: CachePolicyList;
}
export interface ListCloudFrontOriginAccessIdentitiesRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface CloudFrontOriginAccessIdentitySummary {
  Id: string;
  S3CanonicalUserId: string;
  Comment: string;
}
export type CloudFrontOriginAccessIdentitySummaryList =
  CloudFrontOriginAccessIdentitySummary[];
export interface CloudFrontOriginAccessIdentityList {
  Marker?: string;
  NextMarker?: string;
  MaxItems: number;
  IsTruncated: boolean;
  Quantity: number;
  Items?: CloudFrontOriginAccessIdentitySummary[];
}
export interface ListCloudFrontOriginAccessIdentitiesResult {
  CloudFrontOriginAccessIdentityList?: CloudFrontOriginAccessIdentityList;
}
export type DistributionIdString = string;
export type AliasString = string;
export type ListConflictingAliasesMaxItemsInteger = number;
export interface ListConflictingAliasesRequest {
  DistributionId: string;
  Alias: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ConflictingAlias {
  Alias?: string;
  DistributionId?: string;
  AccountId?: string;
}
export type ConflictingAliases = ConflictingAlias[];
export interface ConflictingAliasesList {
  NextMarker?: string;
  MaxItems?: number;
  Quantity?: number;
  Items?: ConflictingAlias[];
}
export interface ListConflictingAliasesResult {
  ConflictingAliasesList?: ConflictingAliasesList;
}
export interface ListConnectionFunctionsRequest {
  Marker?: string;
  MaxItems?: number;
  Stage?: FunctionStage;
}
export type ConnectionFunctionSummaryList = ConnectionFunctionSummary[];
export interface ListConnectionFunctionsResult {
  NextMarker?: string;
  ConnectionFunctions?: ConnectionFunctionSummary[];
}
export interface ConnectionGroupAssociationFilter {
  AnycastIpListId?: string;
}
export interface ListConnectionGroupsRequest {
  AssociationFilter?: ConnectionGroupAssociationFilter;
  Marker?: string;
  MaxItems?: number;
}
export interface ConnectionGroupSummary {
  Id: string;
  Name: string;
  Arn: string;
  RoutingEndpoint: string;
  CreatedTime: Date;
  LastModifiedTime: Date;
  ETag: string;
  AnycastIpListId?: string;
  Enabled?: boolean;
  Status?: string;
  IsDefault?: boolean;
}
export type ConnectionGroupSummaryList = ConnectionGroupSummary[];
export interface ListConnectionGroupsResult {
  NextMarker?: string;
  ConnectionGroups?: ConnectionGroupSummary[];
}
export interface ListContinuousDeploymentPoliciesRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface ContinuousDeploymentPolicySummary {
  ContinuousDeploymentPolicy: ContinuousDeploymentPolicy;
}
export type ContinuousDeploymentPolicySummaryList =
  ContinuousDeploymentPolicySummary[];
export interface ContinuousDeploymentPolicyList {
  NextMarker?: string;
  MaxItems: number;
  Quantity: number;
  Items?: ContinuousDeploymentPolicySummary[];
}
export interface ListContinuousDeploymentPoliciesResult {
  ContinuousDeploymentPolicyList?: ContinuousDeploymentPolicyList;
}
export interface ListDistributionsRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface DistributionSummary {
  Id: string;
  ARN: string;
  ETag?: string;
  Status: string;
  LastModifiedTime: Date;
  DomainName: string;
  Aliases: Aliases;
  Origins: Origins;
  OriginGroups?: OriginGroups;
  DefaultCacheBehavior: DefaultCacheBehavior;
  CacheBehaviors: CacheBehaviors;
  CustomErrorResponses: CustomErrorResponses;
  Comment: string | redacted.Redacted<string>;
  PriceClass: PriceClass;
  Enabled: boolean;
  ViewerCertificate: ViewerCertificate;
  Restrictions: Restrictions;
  WebACLId?: string;
  HttpVersion: HttpVersion;
  IsIPV6Enabled: boolean;
  AliasICPRecordals?: AliasICPRecordal[];
  Staging: boolean;
  ConnectionMode?: ConnectionMode;
  AnycastIpListId?: string;
  ViewerMtlsConfig?: ViewerMtlsConfig;
  ConnectionFunctionAssociation?: ConnectionFunctionAssociation;
}
export type DistributionSummaryList = DistributionSummary[];
export interface DistributionList {
  Marker?: string;
  NextMarker?: string;
  MaxItems: number;
  IsTruncated: boolean;
  Quantity: number;
  Items?: DistributionSummary[];
}
export interface ListDistributionsResult {
  DistributionList?: DistributionList;
}
export interface ListDistributionsByAnycastIpListIdRequest {
  Marker?: string;
  MaxItems?: number;
  AnycastIpListId: string;
}
export interface ListDistributionsByAnycastIpListIdResult {
  DistributionList?: DistributionList;
}
export interface ListDistributionsByCachePolicyIdRequest {
  Marker?: string;
  MaxItems?: number;
  CachePolicyId: string;
}
export type DistributionIdListSummary = string[];
export interface DistributionIdList {
  Marker?: string;
  NextMarker?: string;
  MaxItems: number;
  IsTruncated: boolean;
  Quantity: number;
  Items?: string[];
}
export interface ListDistributionsByCachePolicyIdResult {
  DistributionIdList?: DistributionIdList;
}
export interface ListDistributionsByConnectionFunctionRequest {
  Marker?: string;
  MaxItems?: number;
  ConnectionFunctionIdentifier: string;
}
export interface ListDistributionsByConnectionFunctionResult {
  DistributionList?: DistributionList;
}
export interface ListDistributionsByConnectionModeRequest {
  Marker?: string;
  MaxItems?: number;
  ConnectionMode: ConnectionMode;
}
export interface ListDistributionsByConnectionModeResult {
  DistributionList?: DistributionList;
}
export interface ListDistributionsByKeyGroupRequest {
  Marker?: string;
  MaxItems?: number;
  KeyGroupId: string;
}
export interface ListDistributionsByKeyGroupResult {
  DistributionIdList?: DistributionIdList;
}
export interface ListDistributionsByOriginRequestPolicyIdRequest {
  Marker?: string;
  MaxItems?: number;
  OriginRequestPolicyId: string;
}
export interface ListDistributionsByOriginRequestPolicyIdResult {
  DistributionIdList?: DistributionIdList;
}
export interface ListDistributionsByOwnedResourceRequest {
  ResourceArn: string;
  Marker?: string;
  MaxItems?: number;
}
export interface DistributionIdOwner {
  DistributionId: string;
  OwnerAccountId: string;
}
export type DistributionIdOwnerItemList = DistributionIdOwner[];
export interface DistributionIdOwnerList {
  Marker?: string;
  NextMarker?: string;
  MaxItems: number;
  IsTruncated: boolean;
  Quantity: number;
  Items?: DistributionIdOwner[];
}
export interface ListDistributionsByOwnedResourceResult {
  DistributionList?: DistributionIdOwnerList;
}
export interface ListDistributionsByRealtimeLogConfigRequest {
  Marker?: string;
  MaxItems?: number;
  RealtimeLogConfigName?: string;
  RealtimeLogConfigArn?: string;
}
export interface ListDistributionsByRealtimeLogConfigResult {
  DistributionList?: DistributionList;
}
export interface ListDistributionsByResponseHeadersPolicyIdRequest {
  Marker?: string;
  MaxItems?: number;
  ResponseHeadersPolicyId: string;
}
export interface ListDistributionsByResponseHeadersPolicyIdResult {
  DistributionIdList?: DistributionIdList;
}
export interface ListDistributionsByTrustStoreRequest {
  TrustStoreIdentifier: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListDistributionsByTrustStoreResult {
  DistributionList?: DistributionList;
}
export interface ListDistributionsByVpcOriginIdRequest {
  Marker?: string;
  MaxItems?: number;
  VpcOriginId: string;
}
export interface ListDistributionsByVpcOriginIdResult {
  DistributionIdList?: DistributionIdList;
}
export interface ListDistributionsByWebACLIdRequest {
  Marker?: string;
  MaxItems?: number;
  WebACLId: string;
}
export interface ListDistributionsByWebACLIdResult {
  DistributionList?: DistributionList;
}
export interface DistributionTenantAssociationFilter {
  DistributionId?: string;
  ConnectionGroupId?: string;
}
export interface ListDistributionTenantsRequest {
  AssociationFilter?: DistributionTenantAssociationFilter;
  Marker?: string;
  MaxItems?: number;
}
export interface DistributionTenantSummary {
  Id: string;
  DistributionId: string;
  Name: string;
  Arn: string;
  Domains: DomainResult[];
  ConnectionGroupId?: string;
  Customizations?: Customizations;
  CreatedTime: Date;
  LastModifiedTime: Date;
  ETag: string;
  Enabled?: boolean;
  Status?: string;
}
export type DistributionTenantList = DistributionTenantSummary[];
export interface ListDistributionTenantsResult {
  NextMarker?: string;
  DistributionTenantList?: DistributionTenantSummary[];
}
export interface ListDistributionTenantsByCustomizationRequest {
  WebACLArn?: string;
  CertificateArn?: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListDistributionTenantsByCustomizationResult {
  NextMarker?: string;
  DistributionTenantList?: DistributionTenantSummary[];
}
export interface DistributionResourceId {
  DistributionId?: string;
  DistributionTenantId?: string;
}
export interface ListDomainConflictsRequest {
  Domain: string;
  DomainControlValidationResource: DistributionResourceId;
  MaxItems?: number;
  Marker?: string;
}
export type DistributionResourceType =
  | "distribution"
  | "distribution-tenant"
  | (string & {});
export interface DomainConflict {
  Domain: string;
  ResourceType: DistributionResourceType;
  ResourceId: string;
  AccountId: string;
}
export type DomainConflictsList = DomainConflict[];
export interface ListDomainConflictsResult {
  DomainConflicts?: DomainConflict[];
  NextMarker?: string;
}
export interface ListFieldLevelEncryptionConfigsRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface FieldLevelEncryptionSummary {
  Id: string;
  LastModifiedTime: Date;
  Comment?: string;
  QueryArgProfileConfig?: QueryArgProfileConfig;
  ContentTypeProfileConfig?: ContentTypeProfileConfig;
}
export type FieldLevelEncryptionSummaryList = FieldLevelEncryptionSummary[];
export interface FieldLevelEncryptionList {
  NextMarker?: string;
  MaxItems: number;
  Quantity: number;
  Items?: FieldLevelEncryptionSummary[];
}
export interface ListFieldLevelEncryptionConfigsResult {
  FieldLevelEncryptionList?: FieldLevelEncryptionList;
}
export interface ListFieldLevelEncryptionProfilesRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface FieldLevelEncryptionProfileSummary {
  Id: string;
  LastModifiedTime: Date;
  Name: string;
  EncryptionEntities: EncryptionEntities;
  Comment?: string;
}
export type FieldLevelEncryptionProfileSummaryList =
  FieldLevelEncryptionProfileSummary[];
export interface FieldLevelEncryptionProfileList {
  NextMarker?: string;
  MaxItems: number;
  Quantity: number;
  Items?: FieldLevelEncryptionProfileSummary[];
}
export interface ListFieldLevelEncryptionProfilesResult {
  FieldLevelEncryptionProfileList?: FieldLevelEncryptionProfileList;
}
export interface ListFunctionsRequest {
  Marker?: string;
  MaxItems?: number;
  Stage?: FunctionStage;
}
export type FunctionSummaryList = FunctionSummary[];
export interface FunctionList {
  NextMarker?: string;
  MaxItems: number;
  Quantity: number;
  Items?: FunctionSummary[];
}
export interface ListFunctionsResult {
  FunctionList?: FunctionList;
}
export interface ListInvalidationsRequest {
  DistributionId: string;
  Marker?: string;
  MaxItems?: number;
}
export interface InvalidationSummary {
  Id: string;
  CreateTime: Date;
  Status: string;
}
export type InvalidationSummaryList = InvalidationSummary[];
export interface InvalidationList {
  Marker?: string;
  NextMarker?: string;
  MaxItems: number;
  IsTruncated: boolean;
  Quantity: number;
  Items?: InvalidationSummary[];
}
export interface ListInvalidationsResult {
  InvalidationList?: InvalidationList;
}
export interface ListInvalidationsForDistributionTenantRequest {
  Id: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListInvalidationsForDistributionTenantResult {
  InvalidationList?: InvalidationList;
}
export interface ListKeyGroupsRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface KeyGroupSummary {
  KeyGroup: KeyGroup;
}
export type KeyGroupSummaryList = KeyGroupSummary[];
export interface KeyGroupList {
  NextMarker?: string;
  MaxItems: number;
  Quantity: number;
  Items?: KeyGroupSummary[];
}
export interface ListKeyGroupsResult {
  KeyGroupList?: KeyGroupList;
}
export interface ListKeyValueStoresRequest {
  Marker?: string;
  MaxItems?: number;
  Status?: string;
}
export type KeyValueStoreSummaryList = KeyValueStore[];
export interface KeyValueStoreList {
  NextMarker?: string;
  MaxItems: number;
  Quantity: number;
  Items?: KeyValueStore[];
}
export interface ListKeyValueStoresResult {
  KeyValueStoreList?: KeyValueStoreList;
}
export interface ListOriginAccessControlsRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface OriginAccessControlSummary {
  Id: string;
  Description?: string;
  Name: string;
  SigningProtocol: OriginAccessControlSigningProtocols;
  SigningBehavior: OriginAccessControlSigningBehaviors;
  OriginAccessControlOriginType: OriginAccessControlOriginTypes;
}
export type OriginAccessControlSummaryList = OriginAccessControlSummary[];
export interface OriginAccessControlList {
  Marker?: string;
  NextMarker?: string;
  MaxItems: number;
  IsTruncated: boolean;
  Quantity: number;
  Items?: OriginAccessControlSummary[];
}
export interface ListOriginAccessControlsResult {
  OriginAccessControlList?: OriginAccessControlList;
}
export type OriginRequestPolicyType = "managed" | "custom" | (string & {});
export interface ListOriginRequestPoliciesRequest {
  Type?: OriginRequestPolicyType;
  Marker?: string;
  MaxItems?: number;
}
export interface OriginRequestPolicySummary {
  Type: OriginRequestPolicyType;
  OriginRequestPolicy: OriginRequestPolicy;
}
export type OriginRequestPolicySummaryList = OriginRequestPolicySummary[];
export interface OriginRequestPolicyList {
  NextMarker?: string;
  MaxItems: number;
  Quantity: number;
  Items?: OriginRequestPolicySummary[];
}
export interface ListOriginRequestPoliciesResult {
  OriginRequestPolicyList?: OriginRequestPolicyList;
}
export interface ListPublicKeysRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface PublicKeySummary {
  Id: string;
  Name: string;
  CreatedTime: Date;
  EncodedKey: string;
  Comment?: string;
}
export type PublicKeySummaryList = PublicKeySummary[];
export interface PublicKeyList {
  NextMarker?: string;
  MaxItems: number;
  Quantity: number;
  Items?: PublicKeySummary[];
}
export interface ListPublicKeysResult {
  PublicKeyList?: PublicKeyList;
}
export interface ListRealtimeLogConfigsRequest {
  MaxItems?: number;
  Marker?: string;
}
export type RealtimeLogConfigList = RealtimeLogConfig[];
export interface RealtimeLogConfigs {
  MaxItems: number;
  Items?: RealtimeLogConfig[];
  IsTruncated: boolean;
  Marker?: string;
  NextMarker?: string;
}
export interface ListRealtimeLogConfigsResult {
  RealtimeLogConfigs?: RealtimeLogConfigs;
}
export type ResponseHeadersPolicyType = "managed" | "custom" | (string & {});
export interface ListResponseHeadersPoliciesRequest {
  Type?: ResponseHeadersPolicyType;
  Marker?: string;
  MaxItems?: number;
}
export interface ResponseHeadersPolicySummary {
  Type: ResponseHeadersPolicyType;
  ResponseHeadersPolicy: ResponseHeadersPolicy;
}
export type ResponseHeadersPolicySummaryList = ResponseHeadersPolicySummary[];
export interface ResponseHeadersPolicyList {
  NextMarker?: string;
  MaxItems: number;
  Quantity: number;
  Items?: ResponseHeadersPolicySummary[];
}
export interface ListResponseHeadersPoliciesResult {
  ResponseHeadersPolicyList?: ResponseHeadersPolicyList;
}
export interface ListStreamingDistributionsRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface StreamingDistributionSummary {
  Id: string;
  ARN: string;
  Status: string;
  LastModifiedTime: Date;
  DomainName: string;
  S3Origin: S3Origin;
  Aliases: Aliases;
  TrustedSigners: TrustedSigners;
  Comment: string;
  PriceClass: PriceClass;
  Enabled: boolean;
}
export type StreamingDistributionSummaryList = StreamingDistributionSummary[];
export interface StreamingDistributionList {
  Marker?: string;
  NextMarker?: string;
  MaxItems: number;
  IsTruncated: boolean;
  Quantity: number;
  Items?: StreamingDistributionSummary[];
}
export interface ListStreamingDistributionsResult {
  StreamingDistributionList?: StreamingDistributionList;
}
export type ResourceARN = string;
export interface ListTagsForResourceRequest {
  Resource: string;
}
export interface ListTagsForResourceResult {
  Tags: Tags;
}
export interface ListTrustStoresRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface TrustStoreSummary {
  Id: string;
  Arn: string;
  Name: string;
  Status: TrustStoreStatus;
  NumberOfCaCertificates: number;
  LastModifiedTime: Date;
  Reason?: string;
  ETag: string;
}
export type TrustStoreList = TrustStoreSummary[];
export interface ListTrustStoresResult {
  NextMarker?: string;
  TrustStoreList?: TrustStoreSummary[];
}
export interface ListVpcOriginsRequest {
  Marker?: string;
  MaxItems?: number;
}
export interface VpcOriginSummary {
  Id: string;
  Name: string;
  Status: string;
  CreatedTime: Date;
  LastModifiedTime: Date;
  Arn: string;
  AccountId?: string;
  OriginEndpointArn: string;
}
export type VpcOriginSummaryList = VpcOriginSummary[];
export interface VpcOriginList {
  Marker?: string;
  NextMarker?: string;
  MaxItems?: number;
  IsTruncated?: boolean;
  Quantity?: number;
  Items?: VpcOriginSummary[];
}
export interface ListVpcOriginsResult {
  VpcOriginList?: VpcOriginList;
}
export interface PublishConnectionFunctionRequest {
  Id: string;
  IfMatch: string;
}
export interface PublishConnectionFunctionResult {
  ConnectionFunctionSummary?: ConnectionFunctionSummary;
}
export interface PublishFunctionRequest {
  Name: string;
  IfMatch: string;
}
export interface PublishFunctionResult {
  FunctionSummary?: FunctionSummary;
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  PolicyDocument: string;
}
export interface PutResourcePolicyResult {
  ResourceArn?: string;
}
export interface TagResourceRequest {
  Resource: string;
  Tags: Tags;
}
export interface TagResourceResponse {}
export type FunctionEventObject = Uint8Array | redacted.Redacted<Uint8Array>;
export interface TestConnectionFunctionRequest {
  Id: string;
  IfMatch: string;
  Stage?: FunctionStage;
  ConnectionObject: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type FunctionExecutionLogList = string[];
export interface ConnectionFunctionTestResult {
  ConnectionFunctionSummary?: ConnectionFunctionSummary;
  ComputeUtilization?: string;
  ConnectionFunctionExecutionLogs?: string[];
  ConnectionFunctionErrorMessage?: string | redacted.Redacted<string>;
  ConnectionFunctionOutput?: string | redacted.Redacted<string>;
}
export interface TestConnectionFunctionResult {
  ConnectionFunctionTestResult?: ConnectionFunctionTestResult;
}
export interface TestFunctionRequest {
  Name: string;
  IfMatch: string;
  Stage?: FunctionStage;
  EventObject: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface TestResult {
  FunctionSummary?: FunctionSummary;
  ComputeUtilization?: string;
  FunctionExecutionLogs?: string[];
  FunctionErrorMessage?: string | redacted.Redacted<string>;
  FunctionOutput?: string | redacted.Redacted<string>;
}
export interface TestFunctionResult {
  TestResult?: TestResult;
}
export type TagKeyList = string[];
export interface TagKeys {
  Items?: string[];
}
export interface UntagResourceRequest {
  Resource: string;
  TagKeys: TagKeys;
}
export interface UntagResourceResponse {}
export interface UpdateAnycastIpListRequest {
  Id: string;
  IpAddressType?: IpAddressType;
  IpamCidrConfigs?: IpamCidrConfig[];
  IfMatch: string;
}
export interface UpdateAnycastIpListResult {
  AnycastIpList?: AnycastIpList;
  ETag?: string;
}
export interface UpdateCachePolicyRequest {
  CachePolicyConfig: CachePolicyConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdateCachePolicyResult {
  CachePolicy?: CachePolicy;
  ETag?: string;
}
export interface UpdateCloudFrontOriginAccessIdentityRequest {
  CloudFrontOriginAccessIdentityConfig: CloudFrontOriginAccessIdentityConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdateCloudFrontOriginAccessIdentityResult {
  CloudFrontOriginAccessIdentity?: CloudFrontOriginAccessIdentity;
  ETag?: string;
}
export interface UpdateConnectionFunctionRequest {
  Id: string;
  IfMatch: string;
  ConnectionFunctionConfig: FunctionConfig;
  ConnectionFunctionCode: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface UpdateConnectionFunctionResult {
  ConnectionFunctionSummary?: ConnectionFunctionSummary;
  ETag?: string;
}
export interface UpdateConnectionGroupRequest {
  Id: string;
  Ipv6Enabled?: boolean;
  IfMatch: string;
  AnycastIpListId?: string;
  Enabled?: boolean;
}
export interface UpdateConnectionGroupResult {
  ConnectionGroup?: ConnectionGroup;
  ETag?: string;
}
export interface UpdateContinuousDeploymentPolicyRequest {
  ContinuousDeploymentPolicyConfig: ContinuousDeploymentPolicyConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdateContinuousDeploymentPolicyResult {
  ContinuousDeploymentPolicy?: ContinuousDeploymentPolicy;
  ETag?: string;
}
export interface UpdateDistributionRequest {
  DistributionConfig: DistributionConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdateDistributionResult {
  Distribution?: Distribution;
  ETag?: string;
}
export interface UpdateDistributionTenantRequest {
  Id: string;
  DistributionId?: string;
  Domains?: DomainItem[];
  Customizations?: Customizations;
  Parameters?: Parameter[];
  ConnectionGroupId?: string;
  IfMatch: string;
  ManagedCertificateRequest?: ManagedCertificateRequest;
  Enabled?: boolean;
}
export interface UpdateDistributionTenantResult {
  DistributionTenant?: DistributionTenant;
  ETag?: string;
}
export interface UpdateDistributionWithStagingConfigRequest {
  Id: string;
  StagingDistributionId?: string;
  IfMatch?: string;
}
export interface UpdateDistributionWithStagingConfigResult {
  Distribution?: Distribution;
  ETag?: string;
}
export interface UpdateDomainAssociationRequest {
  Domain: string;
  TargetResource: DistributionResourceId;
  IfMatch?: string;
}
export interface UpdateDomainAssociationResult {
  Domain?: string;
  ResourceId?: string;
  ETag?: string;
}
export interface UpdateFieldLevelEncryptionConfigRequest {
  FieldLevelEncryptionConfig: FieldLevelEncryptionConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdateFieldLevelEncryptionConfigResult {
  FieldLevelEncryption?: FieldLevelEncryption;
  ETag?: string;
}
export interface UpdateFieldLevelEncryptionProfileRequest {
  FieldLevelEncryptionProfileConfig: FieldLevelEncryptionProfileConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdateFieldLevelEncryptionProfileResult {
  FieldLevelEncryptionProfile?: FieldLevelEncryptionProfile;
  ETag?: string;
}
export interface UpdateFunctionRequest {
  Name: string;
  IfMatch: string;
  FunctionConfig: FunctionConfig;
  FunctionCode: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface UpdateFunctionResult {
  FunctionSummary?: FunctionSummary;
  ETag?: string;
}
export interface UpdateKeyGroupRequest {
  KeyGroupConfig: KeyGroupConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdateKeyGroupResult {
  KeyGroup?: KeyGroup;
  ETag?: string;
}
export interface UpdateKeyValueStoreRequest {
  Name: string;
  Comment: string;
  IfMatch: string;
}
export interface UpdateKeyValueStoreResult {
  KeyValueStore?: KeyValueStore;
  ETag?: string;
}
export interface UpdateOriginAccessControlRequest {
  OriginAccessControlConfig: OriginAccessControlConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdateOriginAccessControlResult {
  OriginAccessControl?: OriginAccessControl;
  ETag?: string;
}
export interface UpdateOriginRequestPolicyRequest {
  OriginRequestPolicyConfig: OriginRequestPolicyConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdateOriginRequestPolicyResult {
  OriginRequestPolicy?: OriginRequestPolicy;
  ETag?: string;
}
export interface UpdatePublicKeyRequest {
  PublicKeyConfig: PublicKeyConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdatePublicKeyResult {
  PublicKey?: PublicKey;
  ETag?: string;
}
export interface UpdateRealtimeLogConfigRequest {
  EndPoints?: EndPoint[];
  Fields?: string[];
  Name?: string;
  ARN?: string;
  SamplingRate?: number;
}
export interface UpdateRealtimeLogConfigResult {
  RealtimeLogConfig?: RealtimeLogConfig;
}
export interface UpdateResponseHeadersPolicyRequest {
  ResponseHeadersPolicyConfig: ResponseHeadersPolicyConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdateResponseHeadersPolicyResult {
  ResponseHeadersPolicy?: ResponseHeadersPolicy;
  ETag?: string;
}
export interface UpdateStreamingDistributionRequest {
  StreamingDistributionConfig: StreamingDistributionConfig;
  Id: string;
  IfMatch?: string;
}
export interface UpdateStreamingDistributionResult {
  StreamingDistribution?: StreamingDistribution;
  ETag?: string;
}
export interface UpdateTrustStoreRequest {
  Id: string;
  CaCertificatesBundleSource?: CaCertificatesBundleSource;
  UseClientCertificateOCSPEndpoint?: boolean;
  IfMatch: string;
}
export interface UpdateTrustStoreResult {
  TrustStore?: TrustStore;
  ETag?: string;
}
export interface UpdateVpcOriginRequest {
  VpcOriginEndpointConfig: VpcOriginEndpointConfig;
  Id: string;
  IfMatch: string;
}
export interface UpdateVpcOriginResult {
  VpcOrigin?: VpcOrigin;
  ETag?: string;
}
export interface VerifyDnsConfigurationRequest {
  Domain?: string;
  Identifier: string;
}
export type DnsConfigurationStatus =
  | "valid-configuration"
  | "invalid-configuration"
  | "unknown-configuration"
  | (string & {});
export interface DnsConfiguration {
  Domain: string;
  Status: DnsConfigurationStatus;
  Reason?: string;
}
export type DnsConfigurationList = DnsConfiguration[];
export interface VerifyDnsConfigurationResult {
  DnsConfigurationList?: DnsConfiguration[];
}
export type AssociateAliasError =
  | AccessDenied
  | IllegalUpdate
  | InvalidArgument
  | NoSuchDistribution
  | TooManyDistributionCNAMEs
  | CommonErrors;
/**
 * The `AssociateAlias` API operation only supports standard distributions. To move domains between distribution tenants and/or standard distributions, we recommend that you use the UpdateDomainAssociation API operation instead.
 *
 * Associates an alias with a CloudFront standard distribution. An alias is commonly known as a custom domain or vanity domain. It can also be called a CNAME or alternate domain name.
 *
 * With this operation, you can move an alias that's already used for a standard distribution to a different standard distribution. This prevents the downtime that could occur if you first remove the alias from one standard distribution and then separately add the alias to another standard distribution.
 *
 * To use this operation, specify the alias and the ID of the target standard distribution.
 *
 * For more information, including how to set up the target standard distribution, prerequisites that you must complete, and other restrictions, see Moving an alternate domain name to a different standard distribution or distribution tenant in the *Amazon CloudFront Developer Guide*.
 */
export const associateAlias: API.OperationMethod<
  AssociateAliasRequest,
  AssociateAliasResponse,
  AssociateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/distribution/{TargetDistributionId}/associate-alias",
    input: { TargetDistributionId: 0, Alias: D.m({ query: "Alias" }) },
  },
  errors: [
    AccessDenied,
    IllegalUpdate,
    InvalidArgument,
    NoSuchDistribution,
    TooManyDistributionCNAMEs,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAlias",
})) as any;

export type AssociateDistributionTenantWebACLError =
  | AccessDenied
  | EntityLimitExceeded
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | CommonErrors;
/**
 * Associates the WAF web ACL with a distribution tenant.
 */
export const associateDistributionTenantWebACL: API.OperationMethod<
  AssociateDistributionTenantWebACLRequest,
  AssociateDistributionTenantWebACLResult,
  AssociateDistributionTenantWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/distribution-tenant/{Id}/associate-web-acl",
    input: { Id: 0, WebACLArn: 0, IfMatch: D.m({ header: "If-Match" }) },
    output: { ETag: D.m({ header: "ETag" }) },
    body: "AssociateDistributionTenantWebACLRequest",
  },
  errors: [
    AccessDenied,
    EntityLimitExceeded,
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDistributionTenantWebACL",
})) as any;

export type AssociateDistributionWebACLError =
  | AccessDenied
  | EntityLimitExceeded
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | CommonErrors;
/**
 * Associates the WAF web ACL with a distribution.
 */
export const associateDistributionWebACL: API.OperationMethod<
  AssociateDistributionWebACLRequest,
  AssociateDistributionWebACLResult,
  AssociateDistributionWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/distribution/{Id}/associate-web-acl",
    input: { Id: 0, WebACLArn: 0, IfMatch: D.m({ header: "If-Match" }) },
    output: { ETag: D.m({ header: "ETag" }) },
    body: "AssociateDistributionWebACLRequest",
  },
  errors: [
    AccessDenied,
    EntityLimitExceeded,
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDistributionWebACL",
})) as any;

export type CopyDistributionError =
  | AccessDenied
  | CNAMEAlreadyExists
  | DistributionAlreadyExists
  | IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior
  | InconsistentQuantities
  | InvalidArgument
  | InvalidDefaultRootObject
  | InvalidErrorCode
  | InvalidForwardCookies
  | InvalidFunctionAssociation
  | InvalidGeoRestrictionParameter
  | InvalidHeadersForS3Origin
  | InvalidIfMatchVersion
  | InvalidLambdaFunctionAssociation
  | InvalidLocationCode
  | InvalidMinimumProtocolVersion
  | InvalidOrigin
  | InvalidOriginAccessControl
  | InvalidOriginAccessIdentity
  | InvalidOriginKeepaliveTimeout
  | InvalidOriginReadTimeout
  | InvalidProtocolSettings
  | InvalidQueryStringParameters
  | InvalidRelativePath
  | InvalidRequiredProtocol
  | InvalidResponseCode
  | InvalidTTLOrder
  | InvalidViewerCertificate
  | InvalidWebACLId
  | MissingBody
  | NoSuchCachePolicy
  | NoSuchDistribution
  | NoSuchFieldLevelEncryptionConfig
  | NoSuchOrigin
  | NoSuchOriginRequestPolicy
  | NoSuchRealtimeLogConfig
  | NoSuchResponseHeadersPolicy
  | PreconditionFailed
  | RealtimeLogConfigOwnerMismatch
  | TooManyCacheBehaviors
  | TooManyCertificates
  | TooManyCookieNamesInWhiteList
  | TooManyDistributionCNAMEs
  | TooManyDistributions
  | TooManyDistributionsAssociatedToCachePolicy
  | TooManyDistributionsAssociatedToFieldLevelEncryptionConfig
  | TooManyDistributionsAssociatedToKeyGroup
  | TooManyDistributionsAssociatedToOriginAccessControl
  | TooManyDistributionsAssociatedToOriginRequestPolicy
  | TooManyDistributionsAssociatedToResponseHeadersPolicy
  | TooManyDistributionsWithFunctionAssociations
  | TooManyDistributionsWithLambdaAssociations
  | TooManyDistributionsWithSingleFunctionARN
  | TooManyFunctionAssociations
  | TooManyHeadersInForwardedValues
  | TooManyKeyGroupsAssociatedToDistribution
  | TooManyLambdaFunctionAssociations
  | TooManyOriginCustomHeaders
  | TooManyOriginGroupsPerDistribution
  | TooManyOrigins
  | TooManyQueryStringParameters
  | TooManyTrustedSigners
  | TrustedKeyGroupDoesNotExist
  | TrustedSignerDoesNotExist
  | CommonErrors;
/**
 * Creates a staging distribution using the configuration of the provided primary distribution. A staging distribution is a copy of an existing distribution (called the primary distribution) that you can use in a continuous deployment workflow.
 *
 * After you create a staging distribution, you can use `UpdateDistribution` to modify the staging distribution's configuration. Then you can use `CreateContinuousDeploymentPolicy` to incrementally move traffic to the staging distribution.
 *
 * This API operation requires the following IAM permissions:
 *
 * - GetDistribution
 *
 * - CreateDistribution
 *
 * - CopyDistribution
 */
export const copyDistribution: API.OperationMethod<
  CopyDistributionRequest,
  CopyDistributionResult,
  CopyDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/distribution/{PrimaryDistributionId}/copy",
    input: {
      PrimaryDistributionId: 0,
      Staging: D.m({ header: "Staging" }),
      IfMatch: D.m({ header: "If-Match" }),
      CallerReference: 0,
      Enabled: 0,
    },
    output: {
      Distribution: D.m({ payload: true, shape: o_Distribution }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "CopyDistributionRequest",
  },
  errors: [
    AccessDenied,
    CNAMEAlreadyExists,
    DistributionAlreadyExists,
    IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior,
    InconsistentQuantities,
    InvalidArgument,
    InvalidDefaultRootObject,
    InvalidErrorCode,
    InvalidForwardCookies,
    InvalidFunctionAssociation,
    InvalidGeoRestrictionParameter,
    InvalidHeadersForS3Origin,
    InvalidIfMatchVersion,
    InvalidLambdaFunctionAssociation,
    InvalidLocationCode,
    InvalidMinimumProtocolVersion,
    InvalidOrigin,
    InvalidOriginAccessControl,
    InvalidOriginAccessIdentity,
    InvalidOriginKeepaliveTimeout,
    InvalidOriginReadTimeout,
    InvalidProtocolSettings,
    InvalidQueryStringParameters,
    InvalidRelativePath,
    InvalidRequiredProtocol,
    InvalidResponseCode,
    InvalidTTLOrder,
    InvalidViewerCertificate,
    InvalidWebACLId,
    MissingBody,
    NoSuchCachePolicy,
    NoSuchDistribution,
    NoSuchFieldLevelEncryptionConfig,
    NoSuchOrigin,
    NoSuchOriginRequestPolicy,
    NoSuchRealtimeLogConfig,
    NoSuchResponseHeadersPolicy,
    PreconditionFailed,
    RealtimeLogConfigOwnerMismatch,
    TooManyCacheBehaviors,
    TooManyCertificates,
    TooManyCookieNamesInWhiteList,
    TooManyDistributionCNAMEs,
    TooManyDistributions,
    TooManyDistributionsAssociatedToCachePolicy,
    TooManyDistributionsAssociatedToFieldLevelEncryptionConfig,
    TooManyDistributionsAssociatedToKeyGroup,
    TooManyDistributionsAssociatedToOriginAccessControl,
    TooManyDistributionsAssociatedToOriginRequestPolicy,
    TooManyDistributionsAssociatedToResponseHeadersPolicy,
    TooManyDistributionsWithFunctionAssociations,
    TooManyDistributionsWithLambdaAssociations,
    TooManyDistributionsWithSingleFunctionARN,
    TooManyFunctionAssociations,
    TooManyHeadersInForwardedValues,
    TooManyKeyGroupsAssociatedToDistribution,
    TooManyLambdaFunctionAssociations,
    TooManyOriginCustomHeaders,
    TooManyOriginGroupsPerDistribution,
    TooManyOrigins,
    TooManyQueryStringParameters,
    TooManyTrustedSigners,
    TrustedKeyGroupDoesNotExist,
    TrustedSignerDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyDistribution",
})) as any;

export type CreateAnycastIpListError =
  | AccessDenied
  | EntityAlreadyExists
  | EntityLimitExceeded
  | InvalidArgument
  | InvalidTagging
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates an Anycast static IP list.
 */
export const createAnycastIpList: API.OperationMethod<
  CreateAnycastIpListRequest,
  CreateAnycastIpListResult,
  CreateAnycastIpListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/anycast-ip-list",
    input: {
      Name: 0,
      IpCount: 0,
      Tags: i_Tags,
      IpAddressType: 0,
      IpamCidrConfigs: D.list(i_IpamCidrConfig, { item: "IpamCidrConfig" }),
    },
    output: {
      AnycastIpList: D.m({ payload: true, shape: o_AnycastIpList }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "CreateAnycastIpListRequest",
  },
  errors: [
    AccessDenied,
    EntityAlreadyExists,
    EntityLimitExceeded,
    InvalidArgument,
    InvalidTagging,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAnycastIpList",
})) as any;

export type CreateCachePolicyError =
  | AccessDenied
  | CachePolicyAlreadyExists
  | InconsistentQuantities
  | InvalidArgument
  | TooManyCachePolicies
  | TooManyCookiesInCachePolicy
  | TooManyHeadersInCachePolicy
  | TooManyQueryStringsInCachePolicy
  | CommonErrors;
/**
 * Creates a cache policy.
 *
 * After you create a cache policy, you can attach it to one or more cache behaviors. When it's attached to a cache behavior, the cache policy determines the following:
 *
 * - The values that CloudFront includes in the *cache key*. These values can include HTTP headers, cookies, and URL query strings. CloudFront uses the cache key to find an object in its cache that it can return to the viewer.
 *
 * - The default, minimum, and maximum time to live (TTL) values that you want objects to stay in the CloudFront cache.
 *
 * If your minimum TTL is greater than 0, CloudFront will cache content for at least the duration specified in the cache policy's minimum TTL, even if the `Cache-Control: no-cache`, `no-store`, or `private` directives are present in the origin headers.
 *
 * The headers, cookies, and query strings that are included in the cache key are also included in requests that CloudFront sends to the origin. CloudFront sends a request when it can't find an object in its cache that matches the request's cache key. If you want to send values to the origin but *not* include them in the cache key, use `OriginRequestPolicy`.
 *
 * For more information about cache policies, see Controlling the cache key in the *Amazon CloudFront Developer Guide*.
 */
export const createCachePolicy: API.OperationMethod<
  CreateCachePolicyRequest,
  CreateCachePolicyResult,
  CreateCachePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/cache-policy",
    input: {
      CachePolicyConfig: D.m({
        payload: true,
        wire: "CachePolicyConfig",
        shape: i_CachePolicyConfig,
      }),
    },
    output: {
      CachePolicy: D.m({ payload: true, shape: o_CachePolicy }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CachePolicyAlreadyExists,
    InconsistentQuantities,
    InvalidArgument,
    TooManyCachePolicies,
    TooManyCookiesInCachePolicy,
    TooManyHeadersInCachePolicy,
    TooManyQueryStringsInCachePolicy,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCachePolicy",
})) as any;

export type CreateCloudFrontOriginAccessIdentityError =
  | CloudFrontOriginAccessIdentityAlreadyExists
  | InconsistentQuantities
  | InvalidArgument
  | MissingBody
  | TooManyCloudFrontOriginAccessIdentities
  | CommonErrors;
/**
 * Creates a new origin access identity. If you're using Amazon S3 for your origin, you can use an origin access identity to require users to access your content using a CloudFront URL instead of the Amazon S3 URL. For more information about how to use origin access identities, see Serving Private Content through CloudFront in the *Amazon CloudFront Developer Guide*.
 */
export const createCloudFrontOriginAccessIdentity: API.OperationMethod<
  CreateCloudFrontOriginAccessIdentityRequest,
  CreateCloudFrontOriginAccessIdentityResult,
  CreateCloudFrontOriginAccessIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/origin-access-identity/cloudfront",
    input: {
      CloudFrontOriginAccessIdentityConfig: D.m({
        payload: true,
        wire: "CloudFrontOriginAccessIdentityConfig",
        shape: i_CloudFrontOriginAccessIdentityConfig,
      }),
    },
    output: {
      CloudFrontOriginAccessIdentity: D.m({
        payload: true,
        shape: o_CloudFrontOriginAccessIdentity,
      }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    CloudFrontOriginAccessIdentityAlreadyExists,
    InconsistentQuantities,
    InvalidArgument,
    MissingBody,
    TooManyCloudFrontOriginAccessIdentities,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudFrontOriginAccessIdentity",
})) as any;

export type CreateConnectionFunctionError =
  | AccessDenied
  | EntityAlreadyExists
  | EntityLimitExceeded
  | EntitySizeLimitExceeded
  | InvalidArgument
  | InvalidTagging
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates a connection function.
 */
export const createConnectionFunction: API.OperationMethod<
  CreateConnectionFunctionRequest,
  CreateConnectionFunctionResult,
  CreateConnectionFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/connection-function",
    input: {
      Name: 0,
      ConnectionFunctionConfig: i_FunctionConfig,
      ConnectionFunctionCode: 0,
      Tags: i_Tags,
    },
    output: {
      ConnectionFunctionSummary: D.m({
        payload: true,
        shape: o_ConnectionFunctionSummary,
      }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "CreateConnectionFunctionRequest",
  },
  errors: [
    AccessDenied,
    EntityAlreadyExists,
    EntityLimitExceeded,
    EntitySizeLimitExceeded,
    InvalidArgument,
    InvalidTagging,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectionFunction",
})) as any;

export type CreateConnectionGroupError =
  | AccessDenied
  | EntityAlreadyExists
  | EntityLimitExceeded
  | EntityNotFound
  | InvalidArgument
  | InvalidTagging
  | CommonErrors;
/**
 * Creates a connection group.
 */
export const createConnectionGroup: API.OperationMethod<
  CreateConnectionGroupRequest,
  CreateConnectionGroupResult,
  CreateConnectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/connection-group",
    input: {
      Name: 0,
      Ipv6Enabled: 0,
      Tags: i_Tags,
      AnycastIpListId: 0,
      Enabled: 0,
    },
    output: {
      ConnectionGroup: D.m({ payload: true, shape: o_ConnectionGroup }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "CreateConnectionGroupRequest",
  },
  errors: [
    AccessDenied,
    EntityAlreadyExists,
    EntityLimitExceeded,
    EntityNotFound,
    InvalidArgument,
    InvalidTagging,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectionGroup",
})) as any;

export type CreateContinuousDeploymentPolicyError =
  | AccessDenied
  | ContinuousDeploymentPolicyAlreadyExists
  | InconsistentQuantities
  | InvalidArgument
  | StagingDistributionInUse
  | TooManyContinuousDeploymentPolicies
  | CommonErrors;
/**
 * Creates a continuous deployment policy that distributes traffic for a custom domain name to two different CloudFront distributions.
 *
 * To use a continuous deployment policy, first use `CopyDistribution` to create a staging distribution, then use `UpdateDistribution` to modify the staging distribution's configuration.
 *
 * After you create and update a staging distribution, you can use a continuous deployment policy to incrementally move traffic to the staging distribution. This workflow enables you to test changes to a distribution's configuration before moving all of your domain's production traffic to the new configuration.
 */
export const createContinuousDeploymentPolicy: API.OperationMethod<
  CreateContinuousDeploymentPolicyRequest,
  CreateContinuousDeploymentPolicyResult,
  CreateContinuousDeploymentPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/continuous-deployment-policy",
    input: {
      ContinuousDeploymentPolicyConfig: D.m({
        payload: true,
        wire: "ContinuousDeploymentPolicyConfig",
        shape: i_ContinuousDeploymentPolicyConfig,
      }),
    },
    output: {
      ContinuousDeploymentPolicy: D.m({
        payload: true,
        shape: o_ContinuousDeploymentPolicy,
      }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    ContinuousDeploymentPolicyAlreadyExists,
    InconsistentQuantities,
    InvalidArgument,
    StagingDistributionInUse,
    TooManyContinuousDeploymentPolicies,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContinuousDeploymentPolicy",
})) as any;

export type CreateDistributionError =
  | AccessDenied
  | CNAMEAlreadyExists
  | ContinuousDeploymentPolicyInUse
  | DistributionAlreadyExists
  | EntityLimitExceeded
  | EntityNotFound
  | IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior
  | IllegalOriginAccessConfiguration
  | InconsistentQuantities
  | InvalidArgument
  | InvalidDefaultRootObject
  | InvalidDomainNameForOriginAccessControl
  | InvalidErrorCode
  | InvalidForwardCookies
  | InvalidFunctionAssociation
  | InvalidGeoRestrictionParameter
  | InvalidHeadersForS3Origin
  | InvalidLambdaFunctionAssociation
  | InvalidLocationCode
  | InvalidMinimumProtocolVersion
  | InvalidOrigin
  | InvalidOriginAccessControl
  | InvalidOriginAccessIdentity
  | InvalidOriginKeepaliveTimeout
  | InvalidOriginReadTimeout
  | InvalidProtocolSettings
  | InvalidQueryStringParameters
  | InvalidRelativePath
  | InvalidRequiredProtocol
  | InvalidResponseCode
  | InvalidTTLOrder
  | InvalidViewerCertificate
  | InvalidWebACLId
  | MissingBody
  | NoSuchCachePolicy
  | NoSuchContinuousDeploymentPolicy
  | NoSuchFieldLevelEncryptionConfig
  | NoSuchOrigin
  | NoSuchOriginRequestPolicy
  | NoSuchRealtimeLogConfig
  | NoSuchResponseHeadersPolicy
  | RealtimeLogConfigOwnerMismatch
  | TooManyCacheBehaviors
  | TooManyCertificates
  | TooManyCookieNamesInWhiteList
  | TooManyDistributionCNAMEs
  | TooManyDistributions
  | TooManyDistributionsAssociatedToCachePolicy
  | TooManyDistributionsAssociatedToFieldLevelEncryptionConfig
  | TooManyDistributionsAssociatedToKeyGroup
  | TooManyDistributionsAssociatedToOriginAccessControl
  | TooManyDistributionsAssociatedToOriginRequestPolicy
  | TooManyDistributionsAssociatedToResponseHeadersPolicy
  | TooManyDistributionsWithFunctionAssociations
  | TooManyDistributionsWithLambdaAssociations
  | TooManyDistributionsWithSingleFunctionARN
  | TooManyFunctionAssociations
  | TooManyHeadersInForwardedValues
  | TooManyKeyGroupsAssociatedToDistribution
  | TooManyLambdaFunctionAssociations
  | TooManyOriginCustomHeaders
  | TooManyOriginGroupsPerDistribution
  | TooManyOrigins
  | TooManyQueryStringParameters
  | TooManyTrustedSigners
  | TrustedKeyGroupDoesNotExist
  | TrustedSignerDoesNotExist
  | CommonErrors;
/**
 * Creates a CloudFront distribution.
 */
export const createDistribution: API.OperationMethod<
  CreateDistributionRequest,
  CreateDistributionResult,
  CreateDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/distribution",
    input: {
      DistributionConfig: D.m({
        payload: true,
        wire: "DistributionConfig",
        shape: i_DistributionConfig,
      }),
    },
    output: {
      Distribution: D.m({ payload: true, shape: o_Distribution }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CNAMEAlreadyExists,
    ContinuousDeploymentPolicyInUse,
    DistributionAlreadyExists,
    EntityLimitExceeded,
    EntityNotFound,
    IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior,
    IllegalOriginAccessConfiguration,
    InconsistentQuantities,
    InvalidArgument,
    InvalidDefaultRootObject,
    InvalidDomainNameForOriginAccessControl,
    InvalidErrorCode,
    InvalidForwardCookies,
    InvalidFunctionAssociation,
    InvalidGeoRestrictionParameter,
    InvalidHeadersForS3Origin,
    InvalidLambdaFunctionAssociation,
    InvalidLocationCode,
    InvalidMinimumProtocolVersion,
    InvalidOrigin,
    InvalidOriginAccessControl,
    InvalidOriginAccessIdentity,
    InvalidOriginKeepaliveTimeout,
    InvalidOriginReadTimeout,
    InvalidProtocolSettings,
    InvalidQueryStringParameters,
    InvalidRelativePath,
    InvalidRequiredProtocol,
    InvalidResponseCode,
    InvalidTTLOrder,
    InvalidViewerCertificate,
    InvalidWebACLId,
    MissingBody,
    NoSuchCachePolicy,
    NoSuchContinuousDeploymentPolicy,
    NoSuchFieldLevelEncryptionConfig,
    NoSuchOrigin,
    NoSuchOriginRequestPolicy,
    NoSuchRealtimeLogConfig,
    NoSuchResponseHeadersPolicy,
    RealtimeLogConfigOwnerMismatch,
    TooManyCacheBehaviors,
    TooManyCertificates,
    TooManyCookieNamesInWhiteList,
    TooManyDistributionCNAMEs,
    TooManyDistributions,
    TooManyDistributionsAssociatedToCachePolicy,
    TooManyDistributionsAssociatedToFieldLevelEncryptionConfig,
    TooManyDistributionsAssociatedToKeyGroup,
    TooManyDistributionsAssociatedToOriginAccessControl,
    TooManyDistributionsAssociatedToOriginRequestPolicy,
    TooManyDistributionsAssociatedToResponseHeadersPolicy,
    TooManyDistributionsWithFunctionAssociations,
    TooManyDistributionsWithLambdaAssociations,
    TooManyDistributionsWithSingleFunctionARN,
    TooManyFunctionAssociations,
    TooManyHeadersInForwardedValues,
    TooManyKeyGroupsAssociatedToDistribution,
    TooManyLambdaFunctionAssociations,
    TooManyOriginCustomHeaders,
    TooManyOriginGroupsPerDistribution,
    TooManyOrigins,
    TooManyQueryStringParameters,
    TooManyTrustedSigners,
    TrustedKeyGroupDoesNotExist,
    TrustedSignerDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDistribution",
})) as any;

export type CreateDistributionTenantError =
  | AccessDenied
  | CNAMEAlreadyExists
  | EntityAlreadyExists
  | EntityLimitExceeded
  | EntityNotFound
  | InvalidArgument
  | InvalidAssociation
  | InvalidTagging
  | CommonErrors;
/**
 * Creates a distribution tenant.
 */
export const createDistributionTenant: API.OperationMethod<
  CreateDistributionTenantRequest,
  CreateDistributionTenantResult,
  CreateDistributionTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/distribution-tenant",
    input: {
      DistributionId: 0,
      Name: 0,
      Domains: D.list(i_DomainItem),
      Tags: i_Tags,
      Customizations: i_Customizations,
      Parameters: D.list(i_Parameter),
      ConnectionGroupId: 0,
      ManagedCertificateRequest: i_ManagedCertificateRequest,
      Enabled: 0,
    },
    output: {
      DistributionTenant: D.m({ payload: true, shape: o_DistributionTenant }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "CreateDistributionTenantRequest",
  },
  errors: [
    AccessDenied,
    CNAMEAlreadyExists,
    EntityAlreadyExists,
    EntityLimitExceeded,
    EntityNotFound,
    InvalidArgument,
    InvalidAssociation,
    InvalidTagging,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDistributionTenant",
})) as any;

export type CreateDistributionWithTagsError =
  | AccessDenied
  | CNAMEAlreadyExists
  | ContinuousDeploymentPolicyInUse
  | DistributionAlreadyExists
  | EntityNotFound
  | IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior
  | IllegalOriginAccessConfiguration
  | InconsistentQuantities
  | InvalidArgument
  | InvalidDefaultRootObject
  | InvalidDomainNameForOriginAccessControl
  | InvalidErrorCode
  | InvalidForwardCookies
  | InvalidFunctionAssociation
  | InvalidGeoRestrictionParameter
  | InvalidHeadersForS3Origin
  | InvalidLambdaFunctionAssociation
  | InvalidLocationCode
  | InvalidMinimumProtocolVersion
  | InvalidOrigin
  | InvalidOriginAccessControl
  | InvalidOriginAccessIdentity
  | InvalidOriginKeepaliveTimeout
  | InvalidOriginReadTimeout
  | InvalidProtocolSettings
  | InvalidQueryStringParameters
  | InvalidRelativePath
  | InvalidRequiredProtocol
  | InvalidResponseCode
  | InvalidTagging
  | InvalidTTLOrder
  | InvalidViewerCertificate
  | InvalidWebACLId
  | MissingBody
  | NoSuchCachePolicy
  | NoSuchContinuousDeploymentPolicy
  | NoSuchFieldLevelEncryptionConfig
  | NoSuchOrigin
  | NoSuchOriginRequestPolicy
  | NoSuchRealtimeLogConfig
  | NoSuchResponseHeadersPolicy
  | RealtimeLogConfigOwnerMismatch
  | TooManyCacheBehaviors
  | TooManyCertificates
  | TooManyCookieNamesInWhiteList
  | TooManyDistributionCNAMEs
  | TooManyDistributions
  | TooManyDistributionsAssociatedToCachePolicy
  | TooManyDistributionsAssociatedToFieldLevelEncryptionConfig
  | TooManyDistributionsAssociatedToKeyGroup
  | TooManyDistributionsAssociatedToOriginAccessControl
  | TooManyDistributionsAssociatedToOriginRequestPolicy
  | TooManyDistributionsAssociatedToResponseHeadersPolicy
  | TooManyDistributionsWithFunctionAssociations
  | TooManyDistributionsWithLambdaAssociations
  | TooManyDistributionsWithSingleFunctionARN
  | TooManyFunctionAssociations
  | TooManyHeadersInForwardedValues
  | TooManyKeyGroupsAssociatedToDistribution
  | TooManyLambdaFunctionAssociations
  | TooManyOriginCustomHeaders
  | TooManyOriginGroupsPerDistribution
  | TooManyOrigins
  | TooManyQueryStringParameters
  | TooManyTrustedSigners
  | TrustedKeyGroupDoesNotExist
  | TrustedSignerDoesNotExist
  | CommonErrors;
/**
 * Create a new distribution with tags. This API operation requires the following IAM permissions:
 *
 * - CreateDistribution
 *
 * - TagResource
 */
export const createDistributionWithTags: API.OperationMethod<
  CreateDistributionWithTagsRequest,
  CreateDistributionWithTagsResult,
  CreateDistributionWithTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/distribution?WithTags",
    input: {
      DistributionConfigWithTags: D.m({
        payload: true,
        wire: "DistributionConfigWithTags",
        shape: { DistributionConfig: i_DistributionConfig, Tags: i_Tags },
      }),
    },
    output: {
      Distribution: D.m({ payload: true, shape: o_Distribution }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CNAMEAlreadyExists,
    ContinuousDeploymentPolicyInUse,
    DistributionAlreadyExists,
    EntityNotFound,
    IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior,
    IllegalOriginAccessConfiguration,
    InconsistentQuantities,
    InvalidArgument,
    InvalidDefaultRootObject,
    InvalidDomainNameForOriginAccessControl,
    InvalidErrorCode,
    InvalidForwardCookies,
    InvalidFunctionAssociation,
    InvalidGeoRestrictionParameter,
    InvalidHeadersForS3Origin,
    InvalidLambdaFunctionAssociation,
    InvalidLocationCode,
    InvalidMinimumProtocolVersion,
    InvalidOrigin,
    InvalidOriginAccessControl,
    InvalidOriginAccessIdentity,
    InvalidOriginKeepaliveTimeout,
    InvalidOriginReadTimeout,
    InvalidProtocolSettings,
    InvalidQueryStringParameters,
    InvalidRelativePath,
    InvalidRequiredProtocol,
    InvalidResponseCode,
    InvalidTagging,
    InvalidTTLOrder,
    InvalidViewerCertificate,
    InvalidWebACLId,
    MissingBody,
    NoSuchCachePolicy,
    NoSuchContinuousDeploymentPolicy,
    NoSuchFieldLevelEncryptionConfig,
    NoSuchOrigin,
    NoSuchOriginRequestPolicy,
    NoSuchRealtimeLogConfig,
    NoSuchResponseHeadersPolicy,
    RealtimeLogConfigOwnerMismatch,
    TooManyCacheBehaviors,
    TooManyCertificates,
    TooManyCookieNamesInWhiteList,
    TooManyDistributionCNAMEs,
    TooManyDistributions,
    TooManyDistributionsAssociatedToCachePolicy,
    TooManyDistributionsAssociatedToFieldLevelEncryptionConfig,
    TooManyDistributionsAssociatedToKeyGroup,
    TooManyDistributionsAssociatedToOriginAccessControl,
    TooManyDistributionsAssociatedToOriginRequestPolicy,
    TooManyDistributionsAssociatedToResponseHeadersPolicy,
    TooManyDistributionsWithFunctionAssociations,
    TooManyDistributionsWithLambdaAssociations,
    TooManyDistributionsWithSingleFunctionARN,
    TooManyFunctionAssociations,
    TooManyHeadersInForwardedValues,
    TooManyKeyGroupsAssociatedToDistribution,
    TooManyLambdaFunctionAssociations,
    TooManyOriginCustomHeaders,
    TooManyOriginGroupsPerDistribution,
    TooManyOrigins,
    TooManyQueryStringParameters,
    TooManyTrustedSigners,
    TrustedKeyGroupDoesNotExist,
    TrustedSignerDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDistributionWithTags",
})) as any;

export type CreateFieldLevelEncryptionConfigError =
  | FieldLevelEncryptionConfigAlreadyExists
  | InconsistentQuantities
  | InvalidArgument
  | NoSuchFieldLevelEncryptionProfile
  | QueryArgProfileEmpty
  | TooManyFieldLevelEncryptionConfigs
  | TooManyFieldLevelEncryptionContentTypeProfiles
  | TooManyFieldLevelEncryptionQueryArgProfiles
  | CommonErrors;
/**
 * Create a new field-level encryption configuration.
 */
export const createFieldLevelEncryptionConfig: API.OperationMethod<
  CreateFieldLevelEncryptionConfigRequest,
  CreateFieldLevelEncryptionConfigResult,
  CreateFieldLevelEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/field-level-encryption",
    input: {
      FieldLevelEncryptionConfig: D.m({
        payload: true,
        wire: "FieldLevelEncryptionConfig",
        shape: i_FieldLevelEncryptionConfig,
      }),
    },
    output: {
      FieldLevelEncryption: D.m({
        payload: true,
        shape: o_FieldLevelEncryption,
      }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    FieldLevelEncryptionConfigAlreadyExists,
    InconsistentQuantities,
    InvalidArgument,
    NoSuchFieldLevelEncryptionProfile,
    QueryArgProfileEmpty,
    TooManyFieldLevelEncryptionConfigs,
    TooManyFieldLevelEncryptionContentTypeProfiles,
    TooManyFieldLevelEncryptionQueryArgProfiles,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFieldLevelEncryptionConfig",
})) as any;

export type CreateFieldLevelEncryptionProfileError =
  | FieldLevelEncryptionProfileAlreadyExists
  | FieldLevelEncryptionProfileSizeExceeded
  | InconsistentQuantities
  | InvalidArgument
  | NoSuchPublicKey
  | TooManyFieldLevelEncryptionEncryptionEntities
  | TooManyFieldLevelEncryptionFieldPatterns
  | TooManyFieldLevelEncryptionProfiles
  | CommonErrors;
/**
 * Create a field-level encryption profile.
 */
export const createFieldLevelEncryptionProfile: API.OperationMethod<
  CreateFieldLevelEncryptionProfileRequest,
  CreateFieldLevelEncryptionProfileResult,
  CreateFieldLevelEncryptionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/field-level-encryption-profile",
    input: {
      FieldLevelEncryptionProfileConfig: D.m({
        payload: true,
        wire: "FieldLevelEncryptionProfileConfig",
        shape: i_FieldLevelEncryptionProfileConfig,
      }),
    },
    output: {
      FieldLevelEncryptionProfile: D.m({
        payload: true,
        shape: o_FieldLevelEncryptionProfile,
      }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    FieldLevelEncryptionProfileAlreadyExists,
    FieldLevelEncryptionProfileSizeExceeded,
    InconsistentQuantities,
    InvalidArgument,
    NoSuchPublicKey,
    TooManyFieldLevelEncryptionEncryptionEntities,
    TooManyFieldLevelEncryptionFieldPatterns,
    TooManyFieldLevelEncryptionProfiles,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFieldLevelEncryptionProfile",
})) as any;

export type CreateFunctionError =
  | FunctionAlreadyExists
  | FunctionSizeLimitExceeded
  | InvalidArgument
  | TooManyFunctions
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates a CloudFront function.
 *
 * To create a function, you provide the function code and some configuration information about the function. The response contains an Amazon Resource Name (ARN) that uniquely identifies the function.
 *
 * When you create a function, it's in the `DEVELOPMENT` stage. In this stage, you can test the function with `TestFunction`, and update it with `UpdateFunction`.
 *
 * When you're ready to use your function with a CloudFront distribution, use `PublishFunction` to copy the function from the `DEVELOPMENT` stage to `LIVE`. When it's live, you can attach the function to a distribution's cache behavior, using the function's ARN.
 */
export const createFunction: API.OperationMethod<
  CreateFunctionRequest,
  CreateFunctionResult,
  CreateFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/function",
    input: {
      Name: 0,
      FunctionConfig: i_FunctionConfig,
      FunctionCode: 0,
      Tags: i_Tags,
    },
    output: {
      FunctionSummary: D.m({ payload: true, shape: o_FunctionSummary }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "CreateFunctionRequest",
  },
  errors: [
    FunctionAlreadyExists,
    FunctionSizeLimitExceeded,
    InvalidArgument,
    TooManyFunctions,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunction",
})) as any;

export type CreateInvalidationError =
  | AccessDenied
  | BatchTooLarge
  | InconsistentQuantities
  | InvalidArgument
  | MissingBody
  | NoSuchDistribution
  | TooManyInvalidationsInProgress
  | CommonErrors;
/**
 * Create a new invalidation. For more information, see Invalidating files in the *Amazon CloudFront Developer Guide*.
 */
export const createInvalidation: API.OperationMethod<
  CreateInvalidationRequest,
  CreateInvalidationResult,
  CreateInvalidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/distribution/{DistributionId}/invalidation",
    input: {
      DistributionId: 0,
      InvalidationBatch: D.m({
        payload: true,
        wire: "InvalidationBatch",
        shape: i_InvalidationBatch,
      }),
    },
    output: {
      Location: D.m({ header: "Location" }),
      Invalidation: D.m({ payload: true, shape: o_Invalidation }),
    },
  },
  errors: [
    AccessDenied,
    BatchTooLarge,
    InconsistentQuantities,
    InvalidArgument,
    MissingBody,
    NoSuchDistribution,
    TooManyInvalidationsInProgress,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInvalidation",
})) as any;

export type CreateInvalidationForDistributionTenantError =
  | AccessDenied
  | BatchTooLarge
  | EntityNotFound
  | InconsistentQuantities
  | InvalidArgument
  | MissingBody
  | TooManyInvalidationsInProgress
  | CommonErrors;
/**
 * Creates an invalidation for a distribution tenant. For more information, see Invalidating files in the *Amazon CloudFront Developer Guide*.
 */
export const createInvalidationForDistributionTenant: API.OperationMethod<
  CreateInvalidationForDistributionTenantRequest,
  CreateInvalidationForDistributionTenantResult,
  CreateInvalidationForDistributionTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/distribution-tenant/{Id}/invalidation",
    input: {
      Id: 0,
      InvalidationBatch: D.m({
        payload: true,
        wire: "InvalidationBatch",
        shape: i_InvalidationBatch,
      }),
    },
    output: {
      Location: D.m({ header: "Location" }),
      Invalidation: D.m({ payload: true, shape: o_Invalidation }),
    },
  },
  errors: [
    AccessDenied,
    BatchTooLarge,
    EntityNotFound,
    InconsistentQuantities,
    InvalidArgument,
    MissingBody,
    TooManyInvalidationsInProgress,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInvalidationForDistributionTenant",
})) as any;

export type CreateKeyGroupError =
  | InvalidArgument
  | KeyGroupAlreadyExists
  | TooManyKeyGroups
  | TooManyPublicKeysInKeyGroup
  | CommonErrors;
/**
 * Creates a key group that you can use with CloudFront signed URLs and signed cookies.
 *
 * To create a key group, you must specify at least one public key for the key group. After you create a key group, you can reference it from one or more cache behaviors. When you reference a key group in a cache behavior, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with a private key whose corresponding public key is in the key group. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see Serving private content in the *Amazon CloudFront Developer Guide*.
 */
export const createKeyGroup: API.OperationMethod<
  CreateKeyGroupRequest,
  CreateKeyGroupResult,
  CreateKeyGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/key-group",
    input: {
      KeyGroupConfig: D.m({
        payload: true,
        wire: "KeyGroupConfig",
        shape: i_KeyGroupConfig,
      }),
    },
    output: {
      KeyGroup: D.m({ payload: true, shape: o_KeyGroup }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    InvalidArgument,
    KeyGroupAlreadyExists,
    TooManyKeyGroups,
    TooManyPublicKeysInKeyGroup,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKeyGroup",
})) as any;

export type CreateKeyValueStoreError =
  | AccessDenied
  | EntityAlreadyExists
  | EntityLimitExceeded
  | EntitySizeLimitExceeded
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Specifies the key value store resource to add to your account. In your account, the key value store names must be unique. You can also import key value store data in JSON format from an S3 bucket by providing a valid `ImportSource` that you own.
 */
export const createKeyValueStore: API.OperationMethod<
  CreateKeyValueStoreRequest,
  CreateKeyValueStoreResult,
  CreateKeyValueStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/key-value-store",
    input: {
      Name: 0,
      Comment: 0,
      ImportSource: { SourceType: 0, SourceARN: 0 },
      Tags: i_Tags,
    },
    output: {
      KeyValueStore: D.m({ payload: true, shape: o_KeyValueStore }),
      ETag: D.m({ header: "ETag" }),
      Location: D.m({ header: "Location" }),
    },
    body: "CreateKeyValueStoreRequest",
  },
  errors: [
    AccessDenied,
    EntityAlreadyExists,
    EntityLimitExceeded,
    EntitySizeLimitExceeded,
    InvalidArgument,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKeyValueStore",
})) as any;

export type CreateMonitoringSubscriptionError =
  | AccessDenied
  | MonitoringSubscriptionAlreadyExists
  | NoSuchDistribution
  | UnsupportedOperation
  | CommonErrors;
/**
 * Enables or disables additional Amazon CloudWatch metrics for the specified CloudFront distribution. The additional metrics incur an additional cost.
 *
 * For more information, see Viewing additional CloudFront distribution metrics in the *Amazon CloudFront Developer Guide*.
 */
export const createMonitoringSubscription: API.OperationMethod<
  CreateMonitoringSubscriptionRequest,
  CreateMonitoringSubscriptionResult,
  CreateMonitoringSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/distributions/{DistributionId}/monitoring-subscription",
    input: {
      DistributionId: 0,
      MonitoringSubscription: D.m({
        payload: true,
        wire: "MonitoringSubscription",
        shape: {
          RealtimeMetricsSubscriptionConfig: {
            RealtimeMetricsSubscriptionStatus: 0,
          },
        },
      }),
    },
    output: {
      MonitoringSubscription: D.m({
        payload: true,
        shape: o_MonitoringSubscription,
      }),
    },
  },
  errors: [
    AccessDenied,
    MonitoringSubscriptionAlreadyExists,
    NoSuchDistribution,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMonitoringSubscription",
})) as any;

export type CreateOriginAccessControlError =
  | InvalidArgument
  | OriginAccessControlAlreadyExists
  | TooManyOriginAccessControls
  | CommonErrors;
/**
 * Creates a new origin access control in CloudFront. After you create an origin access control, you can add it to an origin in a CloudFront distribution so that CloudFront sends authenticated (signed) requests to the origin.
 *
 * This makes it possible to block public access to the origin, allowing viewers (users) to access the origin's content only through CloudFront.
 *
 * For more information about using a CloudFront origin access control, see Restricting access to an Amazon Web Services origin in the *Amazon CloudFront Developer Guide*.
 */
export const createOriginAccessControl: API.OperationMethod<
  CreateOriginAccessControlRequest,
  CreateOriginAccessControlResult,
  CreateOriginAccessControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/origin-access-control",
    input: {
      OriginAccessControlConfig: D.m({
        payload: true,
        wire: "OriginAccessControlConfig",
        shape: i_OriginAccessControlConfig,
      }),
    },
    output: {
      OriginAccessControl: D.m({ payload: true, shape: o_OriginAccessControl }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    InvalidArgument,
    OriginAccessControlAlreadyExists,
    TooManyOriginAccessControls,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOriginAccessControl",
})) as any;

export type CreateOriginRequestPolicyError =
  | AccessDenied
  | InconsistentQuantities
  | InvalidArgument
  | OriginRequestPolicyAlreadyExists
  | TooManyCookiesInOriginRequestPolicy
  | TooManyHeadersInOriginRequestPolicy
  | TooManyOriginRequestPolicies
  | TooManyQueryStringsInOriginRequestPolicy
  | CommonErrors;
/**
 * Creates an origin request policy.
 *
 * After you create an origin request policy, you can attach it to one or more cache behaviors. When it's attached to a cache behavior, the origin request policy determines the values that CloudFront includes in requests that it sends to the origin. Each request that CloudFront sends to the origin includes the following:
 *
 * - The request body and the URL path (without the domain name) from the viewer request.
 *
 * - The headers that CloudFront automatically includes in every origin request, including `Host`, `User-Agent`, and `X-Amz-Cf-Id`.
 *
 * - All HTTP headers, cookies, and URL query strings that are specified in the cache policy or the origin request policy. These can include items from the viewer request and, in the case of headers, additional ones that are added by CloudFront.
 *
 * CloudFront sends a request when it can't find a valid object in its cache that matches the request. If you want to send values to the origin and also include them in the cache key, use `CachePolicy`.
 *
 * For more information about origin request policies, see Controlling origin requests in the *Amazon CloudFront Developer Guide*.
 */
export const createOriginRequestPolicy: API.OperationMethod<
  CreateOriginRequestPolicyRequest,
  CreateOriginRequestPolicyResult,
  CreateOriginRequestPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/origin-request-policy",
    input: {
      OriginRequestPolicyConfig: D.m({
        payload: true,
        wire: "OriginRequestPolicyConfig",
        shape: i_OriginRequestPolicyConfig,
      }),
    },
    output: {
      OriginRequestPolicy: D.m({ payload: true, shape: o_OriginRequestPolicy }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    InconsistentQuantities,
    InvalidArgument,
    OriginRequestPolicyAlreadyExists,
    TooManyCookiesInOriginRequestPolicy,
    TooManyHeadersInOriginRequestPolicy,
    TooManyOriginRequestPolicies,
    TooManyQueryStringsInOriginRequestPolicy,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOriginRequestPolicy",
})) as any;

export type CreatePublicKeyError =
  | InvalidArgument
  | PublicKeyAlreadyExists
  | TooManyPublicKeys
  | CommonErrors;
/**
 * Uploads a public key to CloudFront that you can use with signed URLs and signed cookies, or with field-level encryption.
 */
export const createPublicKey: API.OperationMethod<
  CreatePublicKeyRequest,
  CreatePublicKeyResult,
  CreatePublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/public-key",
    input: {
      PublicKeyConfig: D.m({
        payload: true,
        wire: "PublicKeyConfig",
        shape: i_PublicKeyConfig,
      }),
    },
    output: {
      PublicKey: D.m({ payload: true, shape: o_PublicKey }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [InvalidArgument, PublicKeyAlreadyExists, TooManyPublicKeys],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePublicKey",
})) as any;

export type CreateRealtimeLogConfigError =
  | AccessDenied
  | InvalidArgument
  | RealtimeLogConfigAlreadyExists
  | TooManyRealtimeLogConfigs
  | CommonErrors;
/**
 * Creates a real-time log configuration.
 *
 * After you create a real-time log configuration, you can attach it to one or more cache behaviors to send real-time log data to the specified Amazon Kinesis data stream.
 *
 * For more information about real-time log configurations, see Real-time logs in the *Amazon CloudFront Developer Guide*.
 */
export const createRealtimeLogConfig: API.OperationMethod<
  CreateRealtimeLogConfigRequest,
  CreateRealtimeLogConfigResult,
  CreateRealtimeLogConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/realtime-log-config",
    input: {
      EndPoints: D.list(i_EndPoint),
      Fields: D.list(0, { item: "Field" }),
      Name: 0,
      SamplingRate: 0,
    },
    output: { RealtimeLogConfig: o_RealtimeLogConfig },
    body: "CreateRealtimeLogConfigRequest",
  },
  errors: [
    AccessDenied,
    InvalidArgument,
    RealtimeLogConfigAlreadyExists,
    TooManyRealtimeLogConfigs,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRealtimeLogConfig",
})) as any;

export type CreateResponseHeadersPolicyError =
  | AccessDenied
  | InconsistentQuantities
  | InvalidArgument
  | ResponseHeadersPolicyAlreadyExists
  | TooLongCSPInResponseHeadersPolicy
  | TooManyCustomHeadersInResponseHeadersPolicy
  | TooManyRemoveHeadersInResponseHeadersPolicy
  | TooManyResponseHeadersPolicies
  | CommonErrors;
/**
 * Creates a response headers policy.
 *
 * A response headers policy contains information about a set of HTTP headers. To create a response headers policy, you provide some metadata about the policy and a set of configurations that specify the headers.
 *
 * After you create a response headers policy, you can use its ID to attach it to one or more cache behaviors in a CloudFront distribution. When it's attached to a cache behavior, the response headers policy affects the HTTP headers that CloudFront includes in HTTP responses to requests that match the cache behavior. CloudFront adds or removes response headers according to the configuration of the response headers policy.
 *
 * For more information, see Adding or removing HTTP headers in CloudFront responses in the *Amazon CloudFront Developer Guide*.
 */
export const createResponseHeadersPolicy: API.OperationMethod<
  CreateResponseHeadersPolicyRequest,
  CreateResponseHeadersPolicyResult,
  CreateResponseHeadersPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/response-headers-policy",
    input: {
      ResponseHeadersPolicyConfig: D.m({
        payload: true,
        wire: "ResponseHeadersPolicyConfig",
        shape: i_ResponseHeadersPolicyConfig,
      }),
    },
    output: {
      ResponseHeadersPolicy: D.m({
        payload: true,
        shape: o_ResponseHeadersPolicy,
      }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    InconsistentQuantities,
    InvalidArgument,
    ResponseHeadersPolicyAlreadyExists,
    TooLongCSPInResponseHeadersPolicy,
    TooManyCustomHeadersInResponseHeadersPolicy,
    TooManyRemoveHeadersInResponseHeadersPolicy,
    TooManyResponseHeadersPolicies,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResponseHeadersPolicy",
})) as any;

export type CreateStreamingDistributionError =
  | AccessDenied
  | CNAMEAlreadyExists
  | InconsistentQuantities
  | InvalidArgument
  | InvalidOrigin
  | InvalidOriginAccessControl
  | InvalidOriginAccessIdentity
  | MissingBody
  | StreamingDistributionAlreadyExists
  | TooManyStreamingDistributionCNAMEs
  | TooManyStreamingDistributions
  | TooManyTrustedSigners
  | TrustedSignerDoesNotExist
  | CommonErrors;
/**
 * This API is deprecated. Amazon CloudFront is deprecating real-time messaging protocol (RTMP) distributions on December 31, 2020. For more information, read the announcement on the Amazon CloudFront discussion forum.
 */
export const createStreamingDistribution: API.OperationMethod<
  CreateStreamingDistributionRequest,
  CreateStreamingDistributionResult,
  CreateStreamingDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/streaming-distribution",
    input: {
      StreamingDistributionConfig: D.m({
        payload: true,
        wire: "StreamingDistributionConfig",
        shape: i_StreamingDistributionConfig,
      }),
    },
    output: {
      StreamingDistribution: D.m({
        payload: true,
        shape: o_StreamingDistribution,
      }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CNAMEAlreadyExists,
    InconsistentQuantities,
    InvalidArgument,
    InvalidOrigin,
    InvalidOriginAccessControl,
    InvalidOriginAccessIdentity,
    MissingBody,
    StreamingDistributionAlreadyExists,
    TooManyStreamingDistributionCNAMEs,
    TooManyStreamingDistributions,
    TooManyTrustedSigners,
    TrustedSignerDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStreamingDistribution",
})) as any;

export type CreateStreamingDistributionWithTagsError =
  | AccessDenied
  | CNAMEAlreadyExists
  | InconsistentQuantities
  | InvalidArgument
  | InvalidOrigin
  | InvalidOriginAccessControl
  | InvalidOriginAccessIdentity
  | InvalidTagging
  | MissingBody
  | StreamingDistributionAlreadyExists
  | TooManyStreamingDistributionCNAMEs
  | TooManyStreamingDistributions
  | TooManyTrustedSigners
  | TrustedSignerDoesNotExist
  | CommonErrors;
/**
 * This API is deprecated. Amazon CloudFront is deprecating real-time messaging protocol (RTMP) distributions on December 31, 2020. For more information, read the announcement on the Amazon CloudFront discussion forum.
 */
export const createStreamingDistributionWithTags: API.OperationMethod<
  CreateStreamingDistributionWithTagsRequest,
  CreateStreamingDistributionWithTagsResult,
  CreateStreamingDistributionWithTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/streaming-distribution?WithTags",
    input: {
      StreamingDistributionConfigWithTags: D.m({
        payload: true,
        wire: "StreamingDistributionConfigWithTags",
        shape: {
          StreamingDistributionConfig: i_StreamingDistributionConfig,
          Tags: i_Tags,
        },
      }),
    },
    output: {
      StreamingDistribution: D.m({
        payload: true,
        shape: o_StreamingDistribution,
      }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CNAMEAlreadyExists,
    InconsistentQuantities,
    InvalidArgument,
    InvalidOrigin,
    InvalidOriginAccessControl,
    InvalidOriginAccessIdentity,
    InvalidTagging,
    MissingBody,
    StreamingDistributionAlreadyExists,
    TooManyStreamingDistributionCNAMEs,
    TooManyStreamingDistributions,
    TooManyTrustedSigners,
    TrustedSignerDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStreamingDistributionWithTags",
})) as any;

export type CreateTrustStoreError =
  | AccessDenied
  | EntityAlreadyExists
  | EntityLimitExceeded
  | EntityNotFound
  | InvalidArgument
  | InvalidTagging
  | CommonErrors;
/**
 * Creates a trust store.
 */
export const createTrustStore: API.OperationMethod<
  CreateTrustStoreRequest,
  CreateTrustStoreResult,
  CreateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/trust-store",
    input: {
      Name: 0,
      CaCertificatesBundleSource: i_CaCertificatesBundleSource,
      UseClientCertificateOCSPEndpoint: 0,
      Tags: i_Tags,
    },
    output: {
      TrustStore: D.m({ payload: true, shape: o_TrustStore }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "CreateTrustStoreRequest",
  },
  errors: [
    AccessDenied,
    EntityAlreadyExists,
    EntityLimitExceeded,
    EntityNotFound,
    InvalidArgument,
    InvalidTagging,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustStore",
})) as any;

export type CreateVpcOriginError =
  | AccessDenied
  | EntityAlreadyExists
  | EntityLimitExceeded
  | InconsistentQuantities
  | InvalidArgument
  | InvalidTagging
  | UnsupportedOperation
  | CommonErrors;
/**
 * Create an Amazon CloudFront VPC origin.
 */
export const createVpcOrigin: API.OperationMethod<
  CreateVpcOriginRequest,
  CreateVpcOriginResult,
  CreateVpcOriginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/vpc-origin",
    input: { VpcOriginEndpointConfig: i_VpcOriginEndpointConfig, Tags: i_Tags },
    output: {
      VpcOrigin: D.m({ payload: true, shape: o_VpcOrigin }),
      Location: D.m({ header: "Location" }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "CreateVpcOriginRequest",
  },
  errors: [
    AccessDenied,
    EntityAlreadyExists,
    EntityLimitExceeded,
    InconsistentQuantities,
    InvalidArgument,
    InvalidTagging,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcOrigin",
})) as any;

export type DeleteAnycastIpListError =
  | AccessDenied
  | CannotDeleteEntityWhileInUse
  | EntityNotFound
  | IllegalDelete
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Deletes an Anycast static IP list.
 */
export const deleteAnycastIpList: API.OperationMethod<
  DeleteAnycastIpListRequest,
  DeleteAnycastIpListResponse,
  DeleteAnycastIpListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/anycast-ip-list/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    CannotDeleteEntityWhileInUse,
    EntityNotFound,
    IllegalDelete,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnycastIpList",
})) as any;

export type DeleteCachePolicyError =
  | AccessDenied
  | CachePolicyInUse
  | IllegalDelete
  | InvalidIfMatchVersion
  | NoSuchCachePolicy
  | PreconditionFailed
  | CommonErrors;
/**
 * Deletes a cache policy.
 *
 * You cannot delete a cache policy if it's attached to a cache behavior. First update your distributions to remove the cache policy from all cache behaviors, then delete the cache policy.
 *
 * To delete a cache policy, you must provide the policy's identifier and version. To get these values, you can use `ListCachePolicies` or `GetCachePolicy`.
 */
export const deleteCachePolicy: API.OperationMethod<
  DeleteCachePolicyRequest,
  DeleteCachePolicyResponse,
  DeleteCachePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/cache-policy/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    CachePolicyInUse,
    IllegalDelete,
    InvalidIfMatchVersion,
    NoSuchCachePolicy,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCachePolicy",
})) as any;

export type DeleteCloudFrontOriginAccessIdentityError =
  | AccessDenied
  | CloudFrontOriginAccessIdentityInUse
  | InvalidIfMatchVersion
  | NoSuchCloudFrontOriginAccessIdentity
  | PreconditionFailed
  | CommonErrors;
/**
 * Delete an origin access identity.
 */
export const deleteCloudFrontOriginAccessIdentity: API.OperationMethod<
  DeleteCloudFrontOriginAccessIdentityRequest,
  DeleteCloudFrontOriginAccessIdentityResponse,
  DeleteCloudFrontOriginAccessIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/origin-access-identity/cloudfront/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    CloudFrontOriginAccessIdentityInUse,
    InvalidIfMatchVersion,
    NoSuchCloudFrontOriginAccessIdentity,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudFrontOriginAccessIdentity",
})) as any;

export type DeleteConnectionFunctionError =
  | AccessDenied
  | CannotDeleteEntityWhileInUse
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Deletes a connection function.
 */
export const deleteConnectionFunction: API.OperationMethod<
  DeleteConnectionFunctionRequest,
  DeleteConnectionFunctionResponse,
  DeleteConnectionFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/connection-function/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    CannotDeleteEntityWhileInUse,
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectionFunction",
})) as any;

export type DeleteConnectionGroupError =
  | AccessDenied
  | CannotDeleteEntityWhileInUse
  | EntityNotFound
  | InvalidIfMatchVersion
  | PreconditionFailed
  | ResourceNotDisabled
  | CommonErrors;
/**
 * Deletes a connection group.
 */
export const deleteConnectionGroup: API.OperationMethod<
  DeleteConnectionGroupRequest,
  DeleteConnectionGroupResponse,
  DeleteConnectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/connection-group/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    CannotDeleteEntityWhileInUse,
    EntityNotFound,
    InvalidIfMatchVersion,
    PreconditionFailed,
    ResourceNotDisabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectionGroup",
})) as any;

export type DeleteContinuousDeploymentPolicyError =
  | AccessDenied
  | ContinuousDeploymentPolicyInUse
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchContinuousDeploymentPolicy
  | PreconditionFailed
  | CommonErrors;
/**
 * Deletes a continuous deployment policy.
 *
 * You cannot delete a continuous deployment policy that's attached to a primary distribution. First update your distribution to remove the continuous deployment policy, then you can delete the policy.
 */
export const deleteContinuousDeploymentPolicy: API.OperationMethod<
  DeleteContinuousDeploymentPolicyRequest,
  DeleteContinuousDeploymentPolicyResponse,
  DeleteContinuousDeploymentPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/continuous-deployment-policy/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    ContinuousDeploymentPolicyInUse,
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchContinuousDeploymentPolicy,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContinuousDeploymentPolicy",
})) as any;

export type DeleteDistributionError =
  | AccessDenied
  | DistributionNotDisabled
  | InvalidIfMatchVersion
  | NoSuchDistribution
  | PreconditionFailed
  | ResourceInUse
  | CommonErrors;
/**
 * Delete a distribution.
 *
 * Before you can delete a distribution, you must disable it, which requires permission to update the distribution. Once deleted, a distribution cannot be recovered.
 */
export const deleteDistribution: API.OperationMethod<
  DeleteDistributionRequest,
  DeleteDistributionResponse,
  DeleteDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/distribution/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    DistributionNotDisabled,
    InvalidIfMatchVersion,
    NoSuchDistribution,
    PreconditionFailed,
    ResourceInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDistribution",
})) as any;

export type DeleteDistributionTenantError =
  | AccessDenied
  | EntityNotFound
  | InvalidIfMatchVersion
  | PreconditionFailed
  | ResourceNotDisabled
  | CommonErrors;
/**
 * Deletes a distribution tenant. If you use this API operation to delete a distribution tenant that is currently enabled, the request will fail.
 *
 * To delete a distribution tenant, you must first disable the distribution tenant by using the `UpdateDistributionTenant` API operation.
 */
export const deleteDistributionTenant: API.OperationMethod<
  DeleteDistributionTenantRequest,
  DeleteDistributionTenantResponse,
  DeleteDistributionTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/distribution-tenant/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    EntityNotFound,
    InvalidIfMatchVersion,
    PreconditionFailed,
    ResourceNotDisabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDistributionTenant",
})) as any;

export type DeleteFieldLevelEncryptionConfigError =
  | AccessDenied
  | FieldLevelEncryptionConfigInUse
  | InvalidIfMatchVersion
  | NoSuchFieldLevelEncryptionConfig
  | PreconditionFailed
  | CommonErrors;
/**
 * Remove a field-level encryption configuration.
 */
export const deleteFieldLevelEncryptionConfig: API.OperationMethod<
  DeleteFieldLevelEncryptionConfigRequest,
  DeleteFieldLevelEncryptionConfigResponse,
  DeleteFieldLevelEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/field-level-encryption/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    FieldLevelEncryptionConfigInUse,
    InvalidIfMatchVersion,
    NoSuchFieldLevelEncryptionConfig,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFieldLevelEncryptionConfig",
})) as any;

export type DeleteFieldLevelEncryptionProfileError =
  | AccessDenied
  | FieldLevelEncryptionProfileInUse
  | InvalidIfMatchVersion
  | NoSuchFieldLevelEncryptionProfile
  | PreconditionFailed
  | CommonErrors;
/**
 * Remove a field-level encryption profile.
 */
export const deleteFieldLevelEncryptionProfile: API.OperationMethod<
  DeleteFieldLevelEncryptionProfileRequest,
  DeleteFieldLevelEncryptionProfileResponse,
  DeleteFieldLevelEncryptionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/field-level-encryption-profile/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    FieldLevelEncryptionProfileInUse,
    InvalidIfMatchVersion,
    NoSuchFieldLevelEncryptionProfile,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFieldLevelEncryptionProfile",
})) as any;

export type DeleteFunctionError =
  | FunctionInUse
  | InvalidIfMatchVersion
  | NoSuchFunctionExists
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Deletes a CloudFront function.
 *
 * You cannot delete a function if it's associated with a cache behavior. First, update your distributions to remove the function association from all cache behaviors, then delete the function.
 *
 * To delete a function, you must provide the function's name and version (`ETag` value). To get these values, you can use `ListFunctions` and `DescribeFunction`.
 */
export const deleteFunction: API.OperationMethod<
  DeleteFunctionRequest,
  DeleteFunctionResponse,
  DeleteFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/function/{Name}",
    input: { Name: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    FunctionInUse,
    InvalidIfMatchVersion,
    NoSuchFunctionExists,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunction",
})) as any;

export type DeleteKeyGroupError =
  | InvalidIfMatchVersion
  | NoSuchResource
  | PreconditionFailed
  | ResourceInUse
  | CommonErrors;
/**
 * Deletes a key group.
 *
 * You cannot delete a key group that is referenced in a cache behavior. First update your distributions to remove the key group from all cache behaviors, then delete the key group.
 *
 * To delete a key group, you must provide the key group's identifier and version. To get these values, use `ListKeyGroups` followed by `GetKeyGroup` or `GetKeyGroupConfig`.
 */
export const deleteKeyGroup: API.OperationMethod<
  DeleteKeyGroupRequest,
  DeleteKeyGroupResponse,
  DeleteKeyGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/key-group/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    InvalidIfMatchVersion,
    NoSuchResource,
    PreconditionFailed,
    ResourceInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKeyGroup",
})) as any;

export type DeleteKeyValueStoreError =
  | AccessDenied
  | CannotDeleteEntityWhileInUse
  | EntityNotFound
  | InvalidIfMatchVersion
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Specifies the key value store to delete.
 */
export const deleteKeyValueStore: API.OperationMethod<
  DeleteKeyValueStoreRequest,
  DeleteKeyValueStoreResponse,
  DeleteKeyValueStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/key-value-store/{Name}",
    input: { Name: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    CannotDeleteEntityWhileInUse,
    EntityNotFound,
    InvalidIfMatchVersion,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKeyValueStore",
})) as any;

export type DeleteMonitoringSubscriptionError =
  | AccessDenied
  | NoSuchDistribution
  | NoSuchMonitoringSubscription
  | UnsupportedOperation
  | CommonErrors;
/**
 * Disables additional CloudWatch metrics for the specified CloudFront distribution.
 */
export const deleteMonitoringSubscription: API.OperationMethod<
  DeleteMonitoringSubscriptionRequest,
  DeleteMonitoringSubscriptionResult,
  DeleteMonitoringSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/distributions/{DistributionId}/monitoring-subscription",
    input: { DistributionId: 0 },
  },
  errors: [
    AccessDenied,
    NoSuchDistribution,
    NoSuchMonitoringSubscription,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMonitoringSubscription",
})) as any;

export type DeleteOriginAccessControlError =
  | AccessDenied
  | InvalidIfMatchVersion
  | NoSuchOriginAccessControl
  | OriginAccessControlInUse
  | PreconditionFailed
  | CommonErrors;
/**
 * Deletes a CloudFront origin access control.
 *
 * You cannot delete an origin access control if it's in use. First, update all distributions to remove the origin access control from all origins, then delete the origin access control.
 */
export const deleteOriginAccessControl: API.OperationMethod<
  DeleteOriginAccessControlRequest,
  DeleteOriginAccessControlResponse,
  DeleteOriginAccessControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/origin-access-control/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    InvalidIfMatchVersion,
    NoSuchOriginAccessControl,
    OriginAccessControlInUse,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOriginAccessControl",
})) as any;

export type DeleteOriginRequestPolicyError =
  | AccessDenied
  | IllegalDelete
  | InvalidIfMatchVersion
  | NoSuchOriginRequestPolicy
  | OriginRequestPolicyInUse
  | PreconditionFailed
  | CommonErrors;
/**
 * Deletes an origin request policy.
 *
 * You cannot delete an origin request policy if it's attached to any cache behaviors. First update your distributions to remove the origin request policy from all cache behaviors, then delete the origin request policy.
 *
 * To delete an origin request policy, you must provide the policy's identifier and version. To get the identifier, you can use `ListOriginRequestPolicies` or `GetOriginRequestPolicy`.
 */
export const deleteOriginRequestPolicy: API.OperationMethod<
  DeleteOriginRequestPolicyRequest,
  DeleteOriginRequestPolicyResponse,
  DeleteOriginRequestPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/origin-request-policy/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    IllegalDelete,
    InvalidIfMatchVersion,
    NoSuchOriginRequestPolicy,
    OriginRequestPolicyInUse,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOriginRequestPolicy",
})) as any;

export type DeletePublicKeyError =
  | AccessDenied
  | InvalidIfMatchVersion
  | NoSuchPublicKey
  | PreconditionFailed
  | PublicKeyInUse
  | CommonErrors;
/**
 * Remove a public key you previously added to CloudFront.
 */
export const deletePublicKey: API.OperationMethod<
  DeletePublicKeyRequest,
  DeletePublicKeyResponse,
  DeletePublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/public-key/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    InvalidIfMatchVersion,
    NoSuchPublicKey,
    PreconditionFailed,
    PublicKeyInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePublicKey",
})) as any;

export type DeleteRealtimeLogConfigError =
  | AccessDenied
  | InvalidArgument
  | NoSuchRealtimeLogConfig
  | RealtimeLogConfigInUse
  | CommonErrors;
/**
 * Deletes a real-time log configuration.
 *
 * You cannot delete a real-time log configuration if it's attached to a cache behavior. First update your distributions to remove the real-time log configuration from all cache behaviors, then delete the real-time log configuration.
 *
 * To delete a real-time log configuration, you can provide the configuration's name or its Amazon Resource Name (ARN). You must provide at least one. If you provide both, CloudFront uses the name to identify the real-time log configuration to delete.
 */
export const deleteRealtimeLogConfig: API.OperationMethod<
  DeleteRealtimeLogConfigRequest,
  DeleteRealtimeLogConfigResponse,
  DeleteRealtimeLogConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/delete-realtime-log-config",
    input: { Name: 0, ARN: 0 },
    body: "DeleteRealtimeLogConfigRequest",
  },
  errors: [
    AccessDenied,
    InvalidArgument,
    NoSuchRealtimeLogConfig,
    RealtimeLogConfigInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRealtimeLogConfig",
})) as any;

export type DeleteResourcePolicyError =
  | AccessDenied
  | EntityNotFound
  | IllegalDelete
  | InvalidArgument
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Deletes the resource policy attached to the CloudFront resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/delete-resource-policy",
    input: { ResourceArn: 0 },
    body: "DeleteResourcePolicyRequest",
  },
  errors: [
    AccessDenied,
    EntityNotFound,
    IllegalDelete,
    InvalidArgument,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteResponseHeadersPolicyError =
  | AccessDenied
  | IllegalDelete
  | InvalidIfMatchVersion
  | NoSuchResponseHeadersPolicy
  | PreconditionFailed
  | ResponseHeadersPolicyInUse
  | CommonErrors;
/**
 * Deletes a response headers policy.
 *
 * You cannot delete a response headers policy if it's attached to a cache behavior. First update your distributions to remove the response headers policy from all cache behaviors, then delete the response headers policy.
 *
 * To delete a response headers policy, you must provide the policy's identifier and version. To get these values, you can use `ListResponseHeadersPolicies` or `GetResponseHeadersPolicy`.
 */
export const deleteResponseHeadersPolicy: API.OperationMethod<
  DeleteResponseHeadersPolicyRequest,
  DeleteResponseHeadersPolicyResponse,
  DeleteResponseHeadersPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/response-headers-policy/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    IllegalDelete,
    InvalidIfMatchVersion,
    NoSuchResponseHeadersPolicy,
    PreconditionFailed,
    ResponseHeadersPolicyInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResponseHeadersPolicy",
})) as any;

export type DeleteStreamingDistributionError =
  | AccessDenied
  | InvalidIfMatchVersion
  | NoSuchStreamingDistribution
  | PreconditionFailed
  | StreamingDistributionNotDisabled
  | CommonErrors;
/**
 * Delete a streaming distribution. To delete an RTMP distribution using the CloudFront API, perform the following steps.
 *
 * **To delete an RTMP distribution using the CloudFront API**:
 *
 * - Disable the RTMP distribution.
 *
 * - Submit a `GET Streaming Distribution Config` request to get the current configuration and the `Etag` header for the distribution.
 *
 * - Update the XML document that was returned in the response to your `GET Streaming Distribution Config` request to change the value of `Enabled` to `false`.
 *
 * - Submit a `PUT Streaming Distribution Config` request to update the configuration for your distribution. In the request body, include the XML document that you updated in Step 3. Then set the value of the HTTP `If-Match` header to the value of the `ETag` header that CloudFront returned when you submitted the `GET Streaming Distribution Config` request in Step 2.
 *
 * - Review the response to the `PUT Streaming Distribution Config` request to confirm that the distribution was successfully disabled.
 *
 * - Submit a `GET Streaming Distribution Config` request to confirm that your changes have propagated. When propagation is complete, the value of `Status` is `Deployed`.
 *
 * - Submit a `DELETE Streaming Distribution` request. Set the value of the HTTP `If-Match` header to the value of the `ETag` header that CloudFront returned when you submitted the `GET Streaming Distribution Config` request in Step 2.
 *
 * - Review the response to your `DELETE Streaming Distribution` request to confirm that the distribution was successfully deleted.
 *
 * For information about deleting a distribution using the CloudFront console, see Deleting a Distribution in the *Amazon CloudFront Developer Guide*.
 */
export const deleteStreamingDistribution: API.OperationMethod<
  DeleteStreamingDistributionRequest,
  DeleteStreamingDistributionResponse,
  DeleteStreamingDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/streaming-distribution/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    InvalidIfMatchVersion,
    NoSuchStreamingDistribution,
    PreconditionFailed,
    StreamingDistributionNotDisabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStreamingDistribution",
})) as any;

export type DeleteTrustStoreError =
  | AccessDenied
  | CannotDeleteEntityWhileInUse
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | CommonErrors;
/**
 * Deletes a trust store.
 */
export const deleteTrustStore: API.OperationMethod<
  DeleteTrustStoreRequest,
  DeleteTrustStoreResponse,
  DeleteTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/trust-store/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
  },
  errors: [
    AccessDenied,
    CannotDeleteEntityWhileInUse,
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustStore",
})) as any;

export type DeleteVpcOriginError =
  | AccessDenied
  | CannotDeleteEntityWhileInUse
  | EntityNotFound
  | IllegalDelete
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Delete an Amazon CloudFront VPC origin.
 */
export const deleteVpcOrigin: API.OperationMethod<
  DeleteVpcOriginRequest,
  DeleteVpcOriginResult,
  DeleteVpcOriginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2020-05-31/vpc-origin/{Id}",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
    output: {
      VpcOrigin: D.m({ payload: true, shape: o_VpcOrigin }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CannotDeleteEntityWhileInUse,
    EntityNotFound,
    IllegalDelete,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcOrigin",
})) as any;

export type DescribeConnectionFunctionError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Describes a connection function.
 */
export const describeConnectionFunction: API.OperationMethod<
  DescribeConnectionFunctionRequest,
  DescribeConnectionFunctionResult,
  DescribeConnectionFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/connection-function/{Identifier}/describe",
    input: { Identifier: 0, Stage: D.m({ query: "Stage" }) },
    output: {
      ConnectionFunctionSummary: D.m({
        payload: true,
        shape: o_ConnectionFunctionSummary,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionFunction",
})) as any;

export type DescribeFunctionError =
  | NoSuchFunctionExists
  | UnsupportedOperation
  | CommonErrors;
/**
 * Gets configuration information and metadata about a CloudFront function, but not the function's code. To get a function's code, use `GetFunction`.
 *
 * To get configuration information and metadata about a function, you must provide the function's name and stage. To get these values, you can use `ListFunctions`.
 */
export const describeFunction: API.OperationMethod<
  DescribeFunctionRequest,
  DescribeFunctionResult,
  DescribeFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/function/{Name}/describe",
    input: { Name: 0, Stage: D.m({ query: "Stage" }) },
    output: {
      FunctionSummary: D.m({ payload: true, shape: o_FunctionSummary }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [NoSuchFunctionExists, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFunction",
})) as any;

export type DescribeKeyValueStoreError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Specifies the key value store and its configuration.
 */
export const describeKeyValueStore: API.OperationMethod<
  DescribeKeyValueStoreRequest,
  DescribeKeyValueStoreResult,
  DescribeKeyValueStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/key-value-store/{Name}",
    input: { Name: 0 },
    output: {
      KeyValueStore: D.m({ payload: true, shape: o_KeyValueStore }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKeyValueStore",
})) as any;

export type DisassociateDistributionTenantWebACLError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | CommonErrors;
/**
 * Disassociates a distribution tenant from the WAF web ACL.
 */
export const disassociateDistributionTenantWebACL: API.OperationMethod<
  DisassociateDistributionTenantWebACLRequest,
  DisassociateDistributionTenantWebACLResult,
  DisassociateDistributionTenantWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/distribution-tenant/{Id}/disassociate-web-acl",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
    output: { ETag: D.m({ header: "ETag" }) },
  },
  errors: [
    AccessDenied,
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDistributionTenantWebACL",
})) as any;

export type DisassociateDistributionWebACLError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | CommonErrors;
/**
 * Disassociates a distribution from the WAF web ACL.
 */
export const disassociateDistributionWebACL: API.OperationMethod<
  DisassociateDistributionWebACLRequest,
  DisassociateDistributionWebACLResult,
  DisassociateDistributionWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/distribution/{Id}/disassociate-web-acl",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
    output: { ETag: D.m({ header: "ETag" }) },
  },
  errors: [
    AccessDenied,
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDistributionWebACL",
})) as any;

export type GetAnycastIpListError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Gets an Anycast static IP list.
 */
export const getAnycastIpList: API.OperationMethod<
  GetAnycastIpListRequest,
  GetAnycastIpListResult,
  GetAnycastIpListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/anycast-ip-list/{Id}",
    input: { Id: 0 },
    output: {
      AnycastIpList: D.m({ payload: true, shape: o_AnycastIpList }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnycastIpList",
})) as any;

export type GetCachePolicyError =
  | AccessDenied
  | NoSuchCachePolicy
  | CommonErrors;
/**
 * Gets a cache policy, including the following metadata:
 *
 * - The policy's identifier.
 *
 * - The date and time when the policy was last modified.
 *
 * To get a cache policy, you must provide the policy's identifier. If the cache policy is attached to a distribution's cache behavior, you can get the policy's identifier using `ListDistributions` or `GetDistribution`. If the cache policy is not attached to a cache behavior, you can get the identifier using `ListCachePolicies`.
 */
export const getCachePolicy: API.OperationMethod<
  GetCachePolicyRequest,
  GetCachePolicyResult,
  GetCachePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/cache-policy/{Id}",
    input: { Id: 0 },
    output: {
      CachePolicy: D.m({ payload: true, shape: o_CachePolicy }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchCachePolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCachePolicy",
})) as any;

export type GetCachePolicyConfigError =
  | AccessDenied
  | NoSuchCachePolicy
  | CommonErrors;
/**
 * Gets a cache policy configuration.
 *
 * To get a cache policy configuration, you must provide the policy's identifier. If the cache policy is attached to a distribution's cache behavior, you can get the policy's identifier using `ListDistributions` or `GetDistribution`. If the cache policy is not attached to a cache behavior, you can get the identifier using `ListCachePolicies`.
 */
export const getCachePolicyConfig: API.OperationMethod<
  GetCachePolicyConfigRequest,
  GetCachePolicyConfigResult,
  GetCachePolicyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/cache-policy/{Id}/config",
    input: { Id: 0 },
    output: {
      CachePolicyConfig: D.m({ payload: true, shape: o_CachePolicyConfig }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchCachePolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCachePolicyConfig",
})) as any;

export type GetCloudFrontOriginAccessIdentityError =
  | AccessDenied
  | NoSuchCloudFrontOriginAccessIdentity
  | CommonErrors;
/**
 * Get the information about an origin access identity.
 */
export const getCloudFrontOriginAccessIdentity: API.OperationMethod<
  GetCloudFrontOriginAccessIdentityRequest,
  GetCloudFrontOriginAccessIdentityResult,
  GetCloudFrontOriginAccessIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/origin-access-identity/cloudfront/{Id}",
    input: { Id: 0 },
    output: {
      CloudFrontOriginAccessIdentity: D.m({
        payload: true,
        shape: o_CloudFrontOriginAccessIdentity,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchCloudFrontOriginAccessIdentity],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudFrontOriginAccessIdentity",
})) as any;

export type GetCloudFrontOriginAccessIdentityConfigError =
  | AccessDenied
  | NoSuchCloudFrontOriginAccessIdentity
  | CommonErrors;
/**
 * Get the configuration information about an origin access identity.
 */
export const getCloudFrontOriginAccessIdentityConfig: API.OperationMethod<
  GetCloudFrontOriginAccessIdentityConfigRequest,
  GetCloudFrontOriginAccessIdentityConfigResult,
  GetCloudFrontOriginAccessIdentityConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/origin-access-identity/cloudfront/{Id}/config",
    input: { Id: 0 },
    output: {
      CloudFrontOriginAccessIdentityConfig: D.m({ payload: true, shape: {} }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchCloudFrontOriginAccessIdentity],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudFrontOriginAccessIdentityConfig",
})) as any;

export type GetConnectionFunctionError =
  | AccessDenied
  | EntityNotFound
  | UnsupportedOperation
  | CommonErrors;
/**
 * Gets a connection function.
 */
export const getConnectionFunction: API.OperationMethod<
  GetConnectionFunctionRequest,
  GetConnectionFunctionResult,
  GetConnectionFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/connection-function/{Identifier}",
    input: { Identifier: 0, Stage: D.m({ query: "Stage" }) },
    output: {
      ConnectionFunctionCode: D.m({ payload: true, shape: D.stream }),
      ETag: D.m({ header: "ETag" }),
      ContentType: D.m({ header: "Content-Type" }),
    },
  },
  errors: [AccessDenied, EntityNotFound, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionFunction",
})) as any;

export type GetConnectionGroupError =
  | AccessDenied
  | EntityNotFound
  | CommonErrors;
/**
 * Gets information about a connection group.
 */
export const getConnectionGroup: API.OperationMethod<
  GetConnectionGroupRequest,
  GetConnectionGroupResult,
  GetConnectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/connection-group/{Identifier}",
    input: { Identifier: 0 },
    output: {
      ConnectionGroup: D.m({ payload: true, shape: o_ConnectionGroup }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, EntityNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionGroup",
})) as any;

export type GetConnectionGroupByRoutingEndpointError =
  | AccessDenied
  | EntityNotFound
  | CommonErrors;
/**
 * Gets information about a connection group by using the endpoint that you specify.
 */
export const getConnectionGroupByRoutingEndpoint: API.OperationMethod<
  GetConnectionGroupByRoutingEndpointRequest,
  GetConnectionGroupByRoutingEndpointResult,
  GetConnectionGroupByRoutingEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/connection-group",
    input: { RoutingEndpoint: D.m({ query: "RoutingEndpoint" }) },
    output: {
      ConnectionGroup: D.m({ payload: true, shape: o_ConnectionGroup }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, EntityNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionGroupByRoutingEndpoint",
})) as any;

export type GetContinuousDeploymentPolicyError =
  | AccessDenied
  | NoSuchContinuousDeploymentPolicy
  | CommonErrors;
/**
 * Gets a continuous deployment policy, including metadata (the policy's identifier and the date and time when the policy was last modified).
 */
export const getContinuousDeploymentPolicy: API.OperationMethod<
  GetContinuousDeploymentPolicyRequest,
  GetContinuousDeploymentPolicyResult,
  GetContinuousDeploymentPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/continuous-deployment-policy/{Id}",
    input: { Id: 0 },
    output: {
      ContinuousDeploymentPolicy: D.m({
        payload: true,
        shape: o_ContinuousDeploymentPolicy,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchContinuousDeploymentPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContinuousDeploymentPolicy",
})) as any;

export type GetContinuousDeploymentPolicyConfigError =
  | AccessDenied
  | NoSuchContinuousDeploymentPolicy
  | CommonErrors;
/**
 * Gets configuration information about a continuous deployment policy.
 */
export const getContinuousDeploymentPolicyConfig: API.OperationMethod<
  GetContinuousDeploymentPolicyConfigRequest,
  GetContinuousDeploymentPolicyConfigResult,
  GetContinuousDeploymentPolicyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/continuous-deployment-policy/{Id}/config",
    input: { Id: 0 },
    output: {
      ContinuousDeploymentPolicyConfig: D.m({
        payload: true,
        shape: o_ContinuousDeploymentPolicyConfig,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchContinuousDeploymentPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContinuousDeploymentPolicyConfig",
})) as any;

export type GetDistributionError =
  | AccessDenied
  | NoSuchDistribution
  | CommonErrors;
/**
 * Get the information about a distribution.
 */
export const getDistribution: API.OperationMethod<
  GetDistributionRequest,
  GetDistributionResult,
  GetDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distribution/{Id}",
    input: { Id: 0 },
    output: {
      Distribution: D.m({ payload: true, shape: o_Distribution }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchDistribution],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistribution",
})) as any;

export type GetDistributionConfigError =
  | AccessDenied
  | NoSuchDistribution
  | CommonErrors;
/**
 * Get the configuration information about a distribution.
 */
export const getDistributionConfig: API.OperationMethod<
  GetDistributionConfigRequest,
  GetDistributionConfigResult,
  GetDistributionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distribution/{Id}/config",
    input: { Id: 0 },
    output: {
      DistributionConfig: D.m({ payload: true, shape: o_DistributionConfig }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchDistribution],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionConfig",
})) as any;

export type GetDistributionTenantError =
  | AccessDenied
  | EntityNotFound
  | CommonErrors;
/**
 * Gets information about a distribution tenant.
 */
export const getDistributionTenant: API.OperationMethod<
  GetDistributionTenantRequest,
  GetDistributionTenantResult,
  GetDistributionTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distribution-tenant/{Identifier}",
    input: { Identifier: 0 },
    output: {
      DistributionTenant: D.m({ payload: true, shape: o_DistributionTenant }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, EntityNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionTenant",
})) as any;

export type GetDistributionTenantByDomainError =
  | AccessDenied
  | EntityNotFound
  | CommonErrors;
/**
 * Gets information about a distribution tenant by the associated domain.
 */
export const getDistributionTenantByDomain: API.OperationMethod<
  GetDistributionTenantByDomainRequest,
  GetDistributionTenantByDomainResult,
  GetDistributionTenantByDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distribution-tenant",
    input: { Domain: D.m({ query: "domain" }) },
    output: {
      DistributionTenant: D.m({ payload: true, shape: o_DistributionTenant }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, EntityNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionTenantByDomain",
})) as any;

export type GetFieldLevelEncryptionError =
  | AccessDenied
  | NoSuchFieldLevelEncryptionConfig
  | CommonErrors;
/**
 * Get the field-level encryption configuration information.
 */
export const getFieldLevelEncryption: API.OperationMethod<
  GetFieldLevelEncryptionRequest,
  GetFieldLevelEncryptionResult,
  GetFieldLevelEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/field-level-encryption/{Id}",
    input: { Id: 0 },
    output: {
      FieldLevelEncryption: D.m({
        payload: true,
        shape: o_FieldLevelEncryption,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchFieldLevelEncryptionConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFieldLevelEncryption",
})) as any;

export type GetFieldLevelEncryptionConfigError =
  | AccessDenied
  | NoSuchFieldLevelEncryptionConfig
  | CommonErrors;
/**
 * Get the field-level encryption configuration information.
 */
export const getFieldLevelEncryptionConfig: API.OperationMethod<
  GetFieldLevelEncryptionConfigRequest,
  GetFieldLevelEncryptionConfigResult,
  GetFieldLevelEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/field-level-encryption/{Id}/config",
    input: { Id: 0 },
    output: {
      FieldLevelEncryptionConfig: D.m({
        payload: true,
        shape: o_FieldLevelEncryptionConfig,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchFieldLevelEncryptionConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFieldLevelEncryptionConfig",
})) as any;

export type GetFieldLevelEncryptionProfileError =
  | AccessDenied
  | NoSuchFieldLevelEncryptionProfile
  | CommonErrors;
/**
 * Get the field-level encryption profile information.
 */
export const getFieldLevelEncryptionProfile: API.OperationMethod<
  GetFieldLevelEncryptionProfileRequest,
  GetFieldLevelEncryptionProfileResult,
  GetFieldLevelEncryptionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/field-level-encryption-profile/{Id}",
    input: { Id: 0 },
    output: {
      FieldLevelEncryptionProfile: D.m({
        payload: true,
        shape: o_FieldLevelEncryptionProfile,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchFieldLevelEncryptionProfile],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFieldLevelEncryptionProfile",
})) as any;

export type GetFieldLevelEncryptionProfileConfigError =
  | AccessDenied
  | NoSuchFieldLevelEncryptionProfile
  | CommonErrors;
/**
 * Get the field-level encryption profile configuration information.
 */
export const getFieldLevelEncryptionProfileConfig: API.OperationMethod<
  GetFieldLevelEncryptionProfileConfigRequest,
  GetFieldLevelEncryptionProfileConfigResult,
  GetFieldLevelEncryptionProfileConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/field-level-encryption-profile/{Id}/config",
    input: { Id: 0 },
    output: {
      FieldLevelEncryptionProfileConfig: D.m({
        payload: true,
        shape: o_FieldLevelEncryptionProfileConfig,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchFieldLevelEncryptionProfile],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFieldLevelEncryptionProfileConfig",
})) as any;

export type GetFunctionError =
  | NoSuchFunctionExists
  | UnsupportedOperation
  | CommonErrors;
/**
 * Gets the code of a CloudFront function. To get configuration information and metadata about a function, use `DescribeFunction`.
 *
 * To get a function's code, you must provide the function's name and stage. To get these values, you can use `ListFunctions`.
 */
export const getFunction: API.OperationMethod<
  GetFunctionRequest,
  GetFunctionResult,
  GetFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/function/{Name}",
    input: { Name: 0, Stage: D.m({ query: "Stage" }) },
    output: {
      FunctionCode: D.m({ payload: true, shape: D.stream }),
      ETag: D.m({ header: "ETag" }),
      ContentType: D.m({ header: "Content-Type" }),
    },
  },
  errors: [NoSuchFunctionExists, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunction",
})) as any;

export type GetInvalidationError =
  | AccessDenied
  | NoSuchDistribution
  | NoSuchInvalidation
  | CommonErrors;
/**
 * Get the information about an invalidation.
 */
export const getInvalidation: API.OperationMethod<
  GetInvalidationRequest,
  GetInvalidationResult,
  GetInvalidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distribution/{DistributionId}/invalidation/{Id}",
    input: { DistributionId: 0, Id: 0 },
    output: { Invalidation: D.m({ payload: true, shape: o_Invalidation }) },
  },
  errors: [AccessDenied, NoSuchDistribution, NoSuchInvalidation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvalidation",
})) as any;

export type GetInvalidationForDistributionTenantError =
  | AccessDenied
  | EntityNotFound
  | NoSuchInvalidation
  | CommonErrors;
/**
 * Gets information about a specific invalidation for a distribution tenant.
 */
export const getInvalidationForDistributionTenant: API.OperationMethod<
  GetInvalidationForDistributionTenantRequest,
  GetInvalidationForDistributionTenantResult,
  GetInvalidationForDistributionTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distribution-tenant/{DistributionTenantId}/invalidation/{Id}",
    input: { DistributionTenantId: 0, Id: 0 },
    output: { Invalidation: D.m({ payload: true, shape: o_Invalidation }) },
  },
  errors: [AccessDenied, EntityNotFound, NoSuchInvalidation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvalidationForDistributionTenant",
})) as any;

export type GetKeyGroupError = NoSuchResource | CommonErrors;
/**
 * Gets a key group, including the date and time when the key group was last modified.
 *
 * To get a key group, you must provide the key group's identifier. If the key group is referenced in a distribution's cache behavior, you can get the key group's identifier using `ListDistributions` or `GetDistribution`. If the key group is not referenced in a cache behavior, you can get the identifier using `ListKeyGroups`.
 */
export const getKeyGroup: API.OperationMethod<
  GetKeyGroupRequest,
  GetKeyGroupResult,
  GetKeyGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/key-group/{Id}",
    input: { Id: 0 },
    output: {
      KeyGroup: D.m({ payload: true, shape: o_KeyGroup }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKeyGroup",
})) as any;

export type GetKeyGroupConfigError = NoSuchResource | CommonErrors;
/**
 * Gets a key group configuration.
 *
 * To get a key group configuration, you must provide the key group's identifier. If the key group is referenced in a distribution's cache behavior, you can get the key group's identifier using `ListDistributions` or `GetDistribution`. If the key group is not referenced in a cache behavior, you can get the identifier using `ListKeyGroups`.
 */
export const getKeyGroupConfig: API.OperationMethod<
  GetKeyGroupConfigRequest,
  GetKeyGroupConfigResult,
  GetKeyGroupConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/key-group/{Id}/config",
    input: { Id: 0 },
    output: {
      KeyGroupConfig: D.m({ payload: true, shape: o_KeyGroupConfig }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKeyGroupConfig",
})) as any;

export type GetManagedCertificateDetailsError =
  | AccessDenied
  | EntityNotFound
  | CommonErrors;
/**
 * Gets details about the CloudFront managed ACM certificate.
 */
export const getManagedCertificateDetails: API.OperationMethod<
  GetManagedCertificateDetailsRequest,
  GetManagedCertificateDetailsResult,
  GetManagedCertificateDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/managed-certificate/{Identifier}",
    input: { Identifier: 0 },
    output: {
      ManagedCertificateDetails: D.m({
        payload: true,
        shape: { ValidationTokenDetails: D.list({}) },
      }),
    },
  },
  errors: [AccessDenied, EntityNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedCertificateDetails",
})) as any;

export type GetMonitoringSubscriptionError =
  | AccessDenied
  | NoSuchDistribution
  | NoSuchMonitoringSubscription
  | UnsupportedOperation
  | CommonErrors;
/**
 * Gets information about whether additional CloudWatch metrics are enabled for the specified CloudFront distribution.
 */
export const getMonitoringSubscription: API.OperationMethod<
  GetMonitoringSubscriptionRequest,
  GetMonitoringSubscriptionResult,
  GetMonitoringSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributions/{DistributionId}/monitoring-subscription",
    input: { DistributionId: 0 },
    output: {
      MonitoringSubscription: D.m({
        payload: true,
        shape: o_MonitoringSubscription,
      }),
    },
  },
  errors: [
    AccessDenied,
    NoSuchDistribution,
    NoSuchMonitoringSubscription,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMonitoringSubscription",
})) as any;

export type GetOriginAccessControlError =
  | AccessDenied
  | NoSuchOriginAccessControl
  | CommonErrors;
/**
 * Gets a CloudFront origin access control, including its unique identifier.
 */
export const getOriginAccessControl: API.OperationMethod<
  GetOriginAccessControlRequest,
  GetOriginAccessControlResult,
  GetOriginAccessControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/origin-access-control/{Id}",
    input: { Id: 0 },
    output: {
      OriginAccessControl: D.m({ payload: true, shape: o_OriginAccessControl }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchOriginAccessControl],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginAccessControl",
})) as any;

export type GetOriginAccessControlConfigError =
  | AccessDenied
  | NoSuchOriginAccessControl
  | CommonErrors;
/**
 * Gets a CloudFront origin access control configuration.
 */
export const getOriginAccessControlConfig: API.OperationMethod<
  GetOriginAccessControlConfigRequest,
  GetOriginAccessControlConfigResult,
  GetOriginAccessControlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/origin-access-control/{Id}/config",
    input: { Id: 0 },
    output: {
      OriginAccessControlConfig: D.m({ payload: true, shape: {} }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchOriginAccessControl],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginAccessControlConfig",
})) as any;

export type GetOriginRequestPolicyError =
  | AccessDenied
  | NoSuchOriginRequestPolicy
  | CommonErrors;
/**
 * Gets an origin request policy, including the following metadata:
 *
 * - The policy's identifier.
 *
 * - The date and time when the policy was last modified.
 *
 * To get an origin request policy, you must provide the policy's identifier. If the origin request policy is attached to a distribution's cache behavior, you can get the policy's identifier using `ListDistributions` or `GetDistribution`. If the origin request policy is not attached to a cache behavior, you can get the identifier using `ListOriginRequestPolicies`.
 */
export const getOriginRequestPolicy: API.OperationMethod<
  GetOriginRequestPolicyRequest,
  GetOriginRequestPolicyResult,
  GetOriginRequestPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/origin-request-policy/{Id}",
    input: { Id: 0 },
    output: {
      OriginRequestPolicy: D.m({ payload: true, shape: o_OriginRequestPolicy }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchOriginRequestPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginRequestPolicy",
})) as any;

export type GetOriginRequestPolicyConfigError =
  | AccessDenied
  | NoSuchOriginRequestPolicy
  | CommonErrors;
/**
 * Gets an origin request policy configuration.
 *
 * To get an origin request policy configuration, you must provide the policy's identifier. If the origin request policy is attached to a distribution's cache behavior, you can get the policy's identifier using `ListDistributions` or `GetDistribution`. If the origin request policy is not attached to a cache behavior, you can get the identifier using `ListOriginRequestPolicies`.
 */
export const getOriginRequestPolicyConfig: API.OperationMethod<
  GetOriginRequestPolicyConfigRequest,
  GetOriginRequestPolicyConfigResult,
  GetOriginRequestPolicyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/origin-request-policy/{Id}/config",
    input: { Id: 0 },
    output: {
      OriginRequestPolicyConfig: D.m({
        payload: true,
        shape: o_OriginRequestPolicyConfig,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchOriginRequestPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginRequestPolicyConfig",
})) as any;

export type GetPublicKeyError = AccessDenied | NoSuchPublicKey | CommonErrors;
/**
 * Gets a public key.
 */
export const getPublicKey: API.OperationMethod<
  GetPublicKeyRequest,
  GetPublicKeyResult,
  GetPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/public-key/{Id}",
    input: { Id: 0 },
    output: {
      PublicKey: D.m({ payload: true, shape: o_PublicKey }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchPublicKey],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPublicKey",
})) as any;

export type GetPublicKeyConfigError =
  | AccessDenied
  | NoSuchPublicKey
  | CommonErrors;
/**
 * Gets a public key configuration.
 */
export const getPublicKeyConfig: API.OperationMethod<
  GetPublicKeyConfigRequest,
  GetPublicKeyConfigResult,
  GetPublicKeyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/public-key/{Id}/config",
    input: { Id: 0 },
    output: {
      PublicKeyConfig: D.m({ payload: true, shape: {} }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchPublicKey],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPublicKeyConfig",
})) as any;

export type GetRealtimeLogConfigError =
  | AccessDenied
  | InvalidArgument
  | NoSuchRealtimeLogConfig
  | CommonErrors;
/**
 * Gets a real-time log configuration.
 *
 * To get a real-time log configuration, you can provide the configuration's name or its Amazon Resource Name (ARN). You must provide at least one. If you provide both, CloudFront uses the name to identify the real-time log configuration to get.
 */
export const getRealtimeLogConfig: API.OperationMethod<
  GetRealtimeLogConfigRequest,
  GetRealtimeLogConfigResult,
  GetRealtimeLogConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/get-realtime-log-config",
    input: { Name: 0, ARN: 0 },
    output: { RealtimeLogConfig: o_RealtimeLogConfig },
    body: "GetRealtimeLogConfigRequest",
  },
  errors: [AccessDenied, InvalidArgument, NoSuchRealtimeLogConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRealtimeLogConfig",
})) as any;

export type GetResourcePolicyError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Retrieves the resource policy for the specified CloudFront resource that you own and have shared.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResult,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/get-resource-policy",
    input: { ResourceArn: 0 },
    body: "GetResourcePolicyRequest",
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type GetResponseHeadersPolicyError =
  | AccessDenied
  | NoSuchResponseHeadersPolicy
  | CommonErrors;
/**
 * Gets a response headers policy, including metadata (the policy's identifier and the date and time when the policy was last modified).
 *
 * To get a response headers policy, you must provide the policy's identifier. If the response headers policy is attached to a distribution's cache behavior, you can get the policy's identifier using `ListDistributions` or `GetDistribution`. If the response headers policy is not attached to a cache behavior, you can get the identifier using `ListResponseHeadersPolicies`.
 */
export const getResponseHeadersPolicy: API.OperationMethod<
  GetResponseHeadersPolicyRequest,
  GetResponseHeadersPolicyResult,
  GetResponseHeadersPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/response-headers-policy/{Id}",
    input: { Id: 0 },
    output: {
      ResponseHeadersPolicy: D.m({
        payload: true,
        shape: o_ResponseHeadersPolicy,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchResponseHeadersPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResponseHeadersPolicy",
})) as any;

export type GetResponseHeadersPolicyConfigError =
  | AccessDenied
  | NoSuchResponseHeadersPolicy
  | CommonErrors;
/**
 * Gets a response headers policy configuration.
 *
 * To get a response headers policy configuration, you must provide the policy's identifier. If the response headers policy is attached to a distribution's cache behavior, you can get the policy's identifier using `ListDistributions` or `GetDistribution`. If the response headers policy is not attached to a cache behavior, you can get the identifier using `ListResponseHeadersPolicies`.
 */
export const getResponseHeadersPolicyConfig: API.OperationMethod<
  GetResponseHeadersPolicyConfigRequest,
  GetResponseHeadersPolicyConfigResult,
  GetResponseHeadersPolicyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/response-headers-policy/{Id}/config",
    input: { Id: 0 },
    output: {
      ResponseHeadersPolicyConfig: D.m({
        payload: true,
        shape: o_ResponseHeadersPolicyConfig,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchResponseHeadersPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResponseHeadersPolicyConfig",
})) as any;

export type GetStreamingDistributionError =
  | AccessDenied
  | NoSuchStreamingDistribution
  | CommonErrors;
/**
 * Gets information about a specified RTMP distribution, including the distribution configuration.
 */
export const getStreamingDistribution: API.OperationMethod<
  GetStreamingDistributionRequest,
  GetStreamingDistributionResult,
  GetStreamingDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/streaming-distribution/{Id}",
    input: { Id: 0 },
    output: {
      StreamingDistribution: D.m({
        payload: true,
        shape: o_StreamingDistribution,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchStreamingDistribution],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStreamingDistribution",
})) as any;

export type GetStreamingDistributionConfigError =
  | AccessDenied
  | NoSuchStreamingDistribution
  | CommonErrors;
/**
 * Get the configuration information about a streaming distribution.
 */
export const getStreamingDistributionConfig: API.OperationMethod<
  GetStreamingDistributionConfigRequest,
  GetStreamingDistributionConfigResult,
  GetStreamingDistributionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/streaming-distribution/{Id}/config",
    input: { Id: 0 },
    output: {
      StreamingDistributionConfig: D.m({
        payload: true,
        shape: o_StreamingDistributionConfig,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, NoSuchStreamingDistribution],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStreamingDistributionConfig",
})) as any;

export type GetTrustStoreError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | CommonErrors;
/**
 * Gets a trust store.
 */
export const getTrustStore: API.OperationMethod<
  GetTrustStoreRequest,
  GetTrustStoreResult,
  GetTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/trust-store/{Identifier}",
    input: { Identifier: 0 },
    output: {
      TrustStore: D.m({ payload: true, shape: o_TrustStore }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustStore",
})) as any;

export type GetVpcOriginError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Get the details of an Amazon CloudFront VPC origin.
 */
export const getVpcOrigin: API.OperationMethod<
  GetVpcOriginRequest,
  GetVpcOriginResult,
  GetVpcOriginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/vpc-origin/{Id}",
    input: { Id: 0 },
    output: {
      VpcOrigin: D.m({ payload: true, shape: o_VpcOrigin }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcOrigin",
})) as any;

export type ListAnycastIpListsError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Lists your Anycast static IP lists.
 */
export const listAnycastIpLists: API.OperationMethod<
  ListAnycastIpListsRequest,
  ListAnycastIpListsResult,
  ListAnycastIpListsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/anycast-ip-list",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      AnycastIpLists: D.m({
        payload: true,
        wire: "AnycastIpListCollection",
        shape: {
          Items: D.list(
            {
              IpCount: D.num,
              LastModifiedTime: D.ts,
              IpamConfig: o_IpamConfig,
            },
            { item: "AnycastIpListSummary" },
          ),
          MaxItems: D.num,
          IsTruncated: D.bool,
          Quantity: D.num,
        },
      }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnycastIpLists",
})) as any;

export type ListCachePoliciesError =
  | AccessDenied
  | InvalidArgument
  | NoSuchCachePolicy
  | CommonErrors;
/**
 * Gets a list of cache policies.
 *
 * You can optionally apply a filter to return only the managed policies created by Amazon Web Services, or only the custom policies created in your Amazon Web Services account.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listCachePolicies: API.OperationMethod<
  ListCachePoliciesRequest,
  ListCachePoliciesResult,
  ListCachePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/cache-policy",
    input: {
      Type: D.m({ query: "Type" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      CachePolicyList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Quantity: D.num,
          Items: D.list(
            { CachePolicy: o_CachePolicy },
            { item: "CachePolicySummary" },
          ),
        },
      }),
    },
  },
  errors: [AccessDenied, InvalidArgument, NoSuchCachePolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCachePolicies",
})) as any;

export type ListCloudFrontOriginAccessIdentitiesError =
  | InvalidArgument
  | CommonErrors;
/**
 * Lists origin access identities.
 */
export const listCloudFrontOriginAccessIdentities: API.PaginatedOperationMethod<
  ListCloudFrontOriginAccessIdentitiesRequest,
  ListCloudFrontOriginAccessIdentitiesResult,
  ListCloudFrontOriginAccessIdentitiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/origin-access-identity/cloudfront",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      CloudFrontOriginAccessIdentityList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          IsTruncated: D.bool,
          Quantity: D.num,
          Items: D.list({}, { item: "CloudFrontOriginAccessIdentitySummary" }),
        },
      }),
    },
  },
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudFrontOriginAccessIdentities",
  pagination: {
    inputToken: "Marker",
    outputToken: "CloudFrontOriginAccessIdentityList.NextMarker",
    items: "CloudFrontOriginAccessIdentityList.Items",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListConflictingAliasesError =
  | InvalidArgument
  | NoSuchDistribution
  | CommonErrors;
/**
 * The `ListConflictingAliases` API operation only supports standard distributions. To list domain conflicts for both standard distributions and distribution tenants, we recommend that you use the ListDomainConflicts API operation instead.
 *
 * Gets a list of aliases that conflict or overlap with the provided alias, and the associated CloudFront standard distribution and Amazon Web Services accounts for each conflicting alias. An alias is commonly known as a custom domain or vanity domain. It can also be called a CNAME or alternate domain name.
 *
 * In the returned list, the standard distribution and account IDs are partially hidden, which allows you to identify the standard distribution and accounts that you own, and helps to protect the information of ones that you don't own.
 *
 * Use this operation to find aliases that are in use in CloudFront that conflict or overlap with the provided alias. For example, if you provide `www.example.com` as input, the returned list can include `www.example.com` and the overlapping wildcard alternate domain name (`*.example.com`), if they exist. If you provide `*.example.com` as input, the returned list can include `*.example.com` and any alternate domain names covered by that wildcard (for example, `www.example.com`, `test.example.com`, `dev.example.com`, and so on), if they exist.
 *
 * To list conflicting aliases, specify the alias to search and the ID of a standard distribution in your account that has an attached TLS certificate that includes the provided alias. For more information, including how to set up the standard distribution and certificate, see Moving an alternate domain name to a different standard distribution or distribution tenant in the *Amazon CloudFront Developer Guide*.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listConflictingAliases: API.OperationMethod<
  ListConflictingAliasesRequest,
  ListConflictingAliasesResult,
  ListConflictingAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/conflicting-alias",
    input: {
      DistributionId: D.m({ query: "DistributionId" }),
      Alias: D.m({ query: "Alias" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      ConflictingAliasesList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Quantity: D.num,
          Items: D.list({}, { item: "ConflictingAlias" }),
        },
      }),
    },
  },
  errors: [InvalidArgument, NoSuchDistribution],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConflictingAliases",
})) as any;

export type ListConnectionFunctionsError =
  | AccessDenied
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Lists connection functions.
 */
export const listConnectionFunctions: API.PaginatedOperationMethod<
  ListConnectionFunctionsRequest,
  ListConnectionFunctionsResult,
  ListConnectionFunctionsError,
  Credentials | HttpClient.HttpClient,
  ConnectionFunctionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/connection-functions",
    input: { Marker: 0, MaxItems: 0, Stage: 0 },
    output: {
      ConnectionFunctions: D.list(o_ConnectionFunctionSummary, {
        item: "ConnectionFunctionSummary",
      }),
    },
    body: "ListConnectionFunctionsRequest",
  },
  errors: [AccessDenied, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectionFunctions",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "ConnectionFunctions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListConnectionGroupsError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | CommonErrors;
/**
 * Lists the connection groups in your Amazon Web Services account.
 */
export const listConnectionGroups: API.PaginatedOperationMethod<
  ListConnectionGroupsRequest,
  ListConnectionGroupsResult,
  ListConnectionGroupsError,
  Credentials | HttpClient.HttpClient,
  ConnectionGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/connection-groups",
    input: {
      AssociationFilter: { AnycastIpListId: 0 },
      Marker: 0,
      MaxItems: 0,
    },
    output: {
      ConnectionGroups: D.list(
        {
          CreatedTime: D.ts,
          LastModifiedTime: D.ts,
          Enabled: D.bool,
          IsDefault: D.bool,
        },
        { item: "ConnectionGroupSummary" },
      ),
    },
    body: "ListConnectionGroupsRequest",
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectionGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "ConnectionGroups",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListContinuousDeploymentPoliciesError =
  | AccessDenied
  | InvalidArgument
  | NoSuchContinuousDeploymentPolicy
  | CommonErrors;
/**
 * Gets a list of the continuous deployment policies in your Amazon Web Services account.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listContinuousDeploymentPolicies: API.OperationMethod<
  ListContinuousDeploymentPoliciesRequest,
  ListContinuousDeploymentPoliciesResult,
  ListContinuousDeploymentPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/continuous-deployment-policy",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      ContinuousDeploymentPolicyList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Quantity: D.num,
          Items: D.list(
            { ContinuousDeploymentPolicy: o_ContinuousDeploymentPolicy },
            { item: "ContinuousDeploymentPolicySummary" },
          ),
        },
      }),
    },
  },
  errors: [AccessDenied, InvalidArgument, NoSuchContinuousDeploymentPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContinuousDeploymentPolicies",
})) as any;

export type ListDistributionsError = InvalidArgument | CommonErrors;
/**
 * List CloudFront distributions.
 */
export const listDistributions: API.PaginatedOperationMethod<
  ListDistributionsRequest,
  ListDistributionsResult,
  ListDistributionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distribution",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      DistributionList: D.m({ payload: true, shape: o_DistributionList }),
    },
  },
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributions",
  pagination: {
    inputToken: "Marker",
    outputToken: "DistributionList.NextMarker",
    items: "DistributionList.Items",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListDistributionsByAnycastIpListIdError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Lists the distributions in your account that are associated with the specified `AnycastIpListId`.
 */
export const listDistributionsByAnycastIpListId: API.OperationMethod<
  ListDistributionsByAnycastIpListIdRequest,
  ListDistributionsByAnycastIpListIdResult,
  ListDistributionsByAnycastIpListIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributionsByAnycastIpListId/{AnycastIpListId}",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
      AnycastIpListId: 0,
    },
    output: {
      DistributionList: D.m({ payload: true, shape: o_DistributionList }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByAnycastIpListId",
})) as any;

export type ListDistributionsByCachePolicyIdError =
  | AccessDenied
  | InvalidArgument
  | NoSuchCachePolicy
  | CommonErrors;
/**
 * Gets a list of distribution IDs for distributions that have a cache behavior that's associated with the specified cache policy.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listDistributionsByCachePolicyId: API.OperationMethod<
  ListDistributionsByCachePolicyIdRequest,
  ListDistributionsByCachePolicyIdResult,
  ListDistributionsByCachePolicyIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributionsByCachePolicyId/{CachePolicyId}",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
      CachePolicyId: 0,
    },
    output: {
      DistributionIdList: D.m({ payload: true, shape: o_DistributionIdList }),
    },
  },
  errors: [AccessDenied, InvalidArgument, NoSuchCachePolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByCachePolicyId",
})) as any;

export type ListDistributionsByConnectionFunctionError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | CommonErrors;
/**
 * Lists distributions by connection function.
 */
export const listDistributionsByConnectionFunction: API.PaginatedOperationMethod<
  ListDistributionsByConnectionFunctionRequest,
  ListDistributionsByConnectionFunctionResult,
  ListDistributionsByConnectionFunctionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributionsByConnectionFunction",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
      ConnectionFunctionIdentifier: D.m({
        query: "ConnectionFunctionIdentifier",
      }),
    },
    output: {
      DistributionList: D.m({ payload: true, shape: o_DistributionList }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByConnectionFunction",
  pagination: {
    inputToken: "Marker",
    outputToken: "DistributionList.NextMarker",
    items: "DistributionList.Items",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListDistributionsByConnectionModeError =
  | AccessDenied
  | InvalidArgument
  | CommonErrors;
/**
 * Lists the distributions by the connection mode that you specify.
 */
export const listDistributionsByConnectionMode: API.PaginatedOperationMethod<
  ListDistributionsByConnectionModeRequest,
  ListDistributionsByConnectionModeResult,
  ListDistributionsByConnectionModeError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributionsByConnectionMode/{ConnectionMode}",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
      ConnectionMode: 0,
    },
    output: {
      DistributionList: D.m({ payload: true, shape: o_DistributionList }),
    },
  },
  errors: [AccessDenied, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByConnectionMode",
  pagination: {
    inputToken: "Marker",
    outputToken: "DistributionList.NextMarker",
    items: "DistributionList.Items",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListDistributionsByKeyGroupError =
  | InvalidArgument
  | NoSuchResource
  | CommonErrors;
/**
 * Gets a list of distribution IDs for distributions that have a cache behavior that references the specified key group.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listDistributionsByKeyGroup: API.OperationMethod<
  ListDistributionsByKeyGroupRequest,
  ListDistributionsByKeyGroupResult,
  ListDistributionsByKeyGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributionsByKeyGroupId/{KeyGroupId}",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
      KeyGroupId: 0,
    },
    output: {
      DistributionIdList: D.m({ payload: true, shape: o_DistributionIdList }),
    },
  },
  errors: [InvalidArgument, NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByKeyGroup",
})) as any;

export type ListDistributionsByOriginRequestPolicyIdError =
  | AccessDenied
  | InvalidArgument
  | NoSuchOriginRequestPolicy
  | CommonErrors;
/**
 * Gets a list of distribution IDs for distributions that have a cache behavior that's associated with the specified origin request policy.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listDistributionsByOriginRequestPolicyId: API.OperationMethod<
  ListDistributionsByOriginRequestPolicyIdRequest,
  ListDistributionsByOriginRequestPolicyIdResult,
  ListDistributionsByOriginRequestPolicyIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributionsByOriginRequestPolicyId/{OriginRequestPolicyId}",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
      OriginRequestPolicyId: 0,
    },
    output: {
      DistributionIdList: D.m({ payload: true, shape: o_DistributionIdList }),
    },
  },
  errors: [AccessDenied, InvalidArgument, NoSuchOriginRequestPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByOriginRequestPolicyId",
})) as any;

export type ListDistributionsByOwnedResourceError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Lists the CloudFront distributions that are associated with the specified resource that you own.
 */
export const listDistributionsByOwnedResource: API.OperationMethod<
  ListDistributionsByOwnedResourceRequest,
  ListDistributionsByOwnedResourceResult,
  ListDistributionsByOwnedResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributionsByOwnedResource/{ResourceArn}",
    input: {
      ResourceArn: 0,
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      DistributionList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          IsTruncated: D.bool,
          Quantity: D.num,
          Items: D.list({}, { item: "DistributionIdOwner" }),
        },
      }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByOwnedResource",
})) as any;

export type ListDistributionsByRealtimeLogConfigError =
  | InvalidArgument
  | CommonErrors;
/**
 * Gets a list of distributions that have a cache behavior that's associated with the specified real-time log configuration.
 *
 * You can specify the real-time log configuration by its name or its Amazon Resource Name (ARN). You must provide at least one. If you provide both, CloudFront uses the name to identify the real-time log configuration to list distributions for.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listDistributionsByRealtimeLogConfig: API.OperationMethod<
  ListDistributionsByRealtimeLogConfigRequest,
  ListDistributionsByRealtimeLogConfigResult,
  ListDistributionsByRealtimeLogConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/distributionsByRealtimeLogConfig",
    input: {
      Marker: 0,
      MaxItems: 0,
      RealtimeLogConfigName: 0,
      RealtimeLogConfigArn: 0,
    },
    output: {
      DistributionList: D.m({ payload: true, shape: o_DistributionList }),
    },
    body: "ListDistributionsByRealtimeLogConfigRequest",
  },
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByRealtimeLogConfig",
})) as any;

export type ListDistributionsByResponseHeadersPolicyIdError =
  | AccessDenied
  | InvalidArgument
  | NoSuchResponseHeadersPolicy
  | CommonErrors;
/**
 * Gets a list of distribution IDs for distributions that have a cache behavior that's associated with the specified response headers policy.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listDistributionsByResponseHeadersPolicyId: API.OperationMethod<
  ListDistributionsByResponseHeadersPolicyIdRequest,
  ListDistributionsByResponseHeadersPolicyIdResult,
  ListDistributionsByResponseHeadersPolicyIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributionsByResponseHeadersPolicyId/{ResponseHeadersPolicyId}",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
      ResponseHeadersPolicyId: 0,
    },
    output: {
      DistributionIdList: D.m({ payload: true, shape: o_DistributionIdList }),
    },
  },
  errors: [AccessDenied, InvalidArgument, NoSuchResponseHeadersPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByResponseHeadersPolicyId",
})) as any;

export type ListDistributionsByTrustStoreError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | CommonErrors;
/**
 * Lists distributions by trust store.
 */
export const listDistributionsByTrustStore: API.PaginatedOperationMethod<
  ListDistributionsByTrustStoreRequest,
  ListDistributionsByTrustStoreResult,
  ListDistributionsByTrustStoreError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributionsByTrustStore",
    input: {
      TrustStoreIdentifier: D.m({ query: "TrustStoreIdentifier" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      DistributionList: D.m({ payload: true, shape: o_DistributionList }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByTrustStore",
  pagination: {
    inputToken: "Marker",
    outputToken: "DistributionList.NextMarker",
    items: "DistributionList.Items",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListDistributionsByVpcOriginIdError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * List CloudFront distributions by their VPC origin ID.
 */
export const listDistributionsByVpcOriginId: API.OperationMethod<
  ListDistributionsByVpcOriginIdRequest,
  ListDistributionsByVpcOriginIdResult,
  ListDistributionsByVpcOriginIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributionsByVpcOriginId/{VpcOriginId}",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
      VpcOriginId: 0,
    },
    output: {
      DistributionIdList: D.m({ payload: true, shape: o_DistributionIdList }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByVpcOriginId",
})) as any;

export type ListDistributionsByWebACLIdError =
  | InvalidArgument
  | InvalidWebACLId
  | CommonErrors;
/**
 * List the distributions that are associated with a specified WAF web ACL.
 */
export const listDistributionsByWebACLId: API.OperationMethod<
  ListDistributionsByWebACLIdRequest,
  ListDistributionsByWebACLIdResult,
  ListDistributionsByWebACLIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distributionsByWebACLId/{WebACLId}",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
      WebACLId: 0,
    },
    output: {
      DistributionList: D.m({ payload: true, shape: o_DistributionList }),
    },
  },
  errors: [InvalidArgument, InvalidWebACLId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByWebACLId",
})) as any;

export type ListDistributionTenantsError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | CommonErrors;
/**
 * Lists the distribution tenants in your Amazon Web Services account.
 */
export const listDistributionTenants: API.PaginatedOperationMethod<
  ListDistributionTenantsRequest,
  ListDistributionTenantsResult,
  ListDistributionTenantsError,
  Credentials | HttpClient.HttpClient,
  DistributionTenantSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/distribution-tenants",
    input: {
      AssociationFilter: { DistributionId: 0, ConnectionGroupId: 0 },
      Marker: 0,
      MaxItems: 0,
    },
    output: {
      DistributionTenantList: D.list(o_DistributionTenantSummary, {
        item: "DistributionTenantSummary",
      }),
    },
    body: "ListDistributionTenantsRequest",
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionTenants",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "DistributionTenantList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListDistributionTenantsByCustomizationError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | CommonErrors;
/**
 * Lists distribution tenants by the customization that you specify.
 *
 * You must specify either the `CertificateArn` parameter or `WebACLArn` parameter, but not both in the same request.
 */
export const listDistributionTenantsByCustomization: API.PaginatedOperationMethod<
  ListDistributionTenantsByCustomizationRequest,
  ListDistributionTenantsByCustomizationResult,
  ListDistributionTenantsByCustomizationError,
  Credentials | HttpClient.HttpClient,
  DistributionTenantSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/distribution-tenants-by-customization",
    input: { WebACLArn: 0, CertificateArn: 0, Marker: 0, MaxItems: 0 },
    output: {
      DistributionTenantList: D.list(o_DistributionTenantSummary, {
        item: "DistributionTenantSummary",
      }),
    },
    body: "ListDistributionTenantsByCustomizationRequest",
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionTenantsByCustomization",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "DistributionTenantList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListDomainConflictsError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | CommonErrors;
/**
 * We recommend that you use the `ListDomainConflicts` API operation to check for domain conflicts, as it supports both standard distributions and distribution tenants. ListConflictingAliases performs similar checks but only supports standard distributions.
 *
 * Lists existing domain associations that conflict with the domain that you specify.
 *
 * You can use this API operation to identify potential domain conflicts when moving domains between standard distributions and/or distribution tenants. Domain conflicts must be resolved first before they can be moved.
 *
 * For example, if you provide `www.example.com` as input, the returned list can include `www.example.com` and the overlapping wildcard alternate domain name (`*.example.com`), if they exist. If you provide `*.example.com` as input, the returned list can include `*.example.com` and any alternate domain names covered by that wildcard (for example, `www.example.com`, `test.example.com`, `dev.example.com`, and so on), if they exist.
 *
 * To list conflicting domains, specify the following:
 *
 * - The domain to search for
 *
 * - The ID of a standard distribution or distribution tenant in your account that has an attached TLS certificate, which covers the specified domain
 *
 * For more information, including how to set up the standard distribution or distribution tenant, and the certificate, see Moving an alternate domain name to a different standard distribution or distribution tenant in the *Amazon CloudFront Developer Guide*.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listDomainConflicts: API.PaginatedOperationMethod<
  ListDomainConflictsRequest,
  ListDomainConflictsResult,
  ListDomainConflictsError,
  Credentials | HttpClient.HttpClient,
  DomainConflict
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/domain-conflicts",
    input: {
      Domain: 0,
      DomainControlValidationResource: i_DistributionResourceId,
      MaxItems: 0,
      Marker: 0,
    },
    output: { DomainConflicts: D.list({}, { item: "DomainConflicts" }) },
    body: "ListDomainConflictsRequest",
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainConflicts",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "DomainConflicts",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFieldLevelEncryptionConfigsError =
  | InvalidArgument
  | CommonErrors;
/**
 * List all field-level encryption configurations that have been created in CloudFront for this account.
 */
export const listFieldLevelEncryptionConfigs: API.OperationMethod<
  ListFieldLevelEncryptionConfigsRequest,
  ListFieldLevelEncryptionConfigsResult,
  ListFieldLevelEncryptionConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/field-level-encryption",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      FieldLevelEncryptionList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Quantity: D.num,
          Items: D.list(
            {
              LastModifiedTime: D.ts,
              QueryArgProfileConfig: o_QueryArgProfileConfig,
              ContentTypeProfileConfig: o_ContentTypeProfileConfig,
            },
            { item: "FieldLevelEncryptionSummary" },
          ),
        },
      }),
    },
  },
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFieldLevelEncryptionConfigs",
})) as any;

export type ListFieldLevelEncryptionProfilesError =
  | InvalidArgument
  | CommonErrors;
/**
 * Request a list of field-level encryption profiles that have been created in CloudFront for this account.
 */
export const listFieldLevelEncryptionProfiles: API.OperationMethod<
  ListFieldLevelEncryptionProfilesRequest,
  ListFieldLevelEncryptionProfilesResult,
  ListFieldLevelEncryptionProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/field-level-encryption-profile",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      FieldLevelEncryptionProfileList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Quantity: D.num,
          Items: D.list(
            {
              LastModifiedTime: D.ts,
              EncryptionEntities: o_EncryptionEntities,
            },
            { item: "FieldLevelEncryptionProfileSummary" },
          ),
        },
      }),
    },
  },
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFieldLevelEncryptionProfiles",
})) as any;

export type ListFunctionsError =
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Gets a list of all CloudFront functions in your Amazon Web Services account.
 *
 * You can optionally apply a filter to return only the functions that are in the specified stage, either `DEVELOPMENT` or `LIVE`.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listFunctions: API.OperationMethod<
  ListFunctionsRequest,
  ListFunctionsResult,
  ListFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/function",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
      Stage: D.m({ query: "Stage" }),
    },
    output: {
      FunctionList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Quantity: D.num,
          Items: D.list(o_FunctionSummary, { item: "FunctionSummary" }),
        },
      }),
    },
  },
  errors: [InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctions",
})) as any;

export type ListInvalidationsError =
  | AccessDenied
  | InvalidArgument
  | NoSuchDistribution
  | CommonErrors;
/**
 * Lists invalidation batches.
 */
export const listInvalidations: API.PaginatedOperationMethod<
  ListInvalidationsRequest,
  ListInvalidationsResult,
  ListInvalidationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distribution/{DistributionId}/invalidation",
    input: {
      DistributionId: 0,
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      InvalidationList: D.m({ payload: true, shape: o_InvalidationList }),
    },
  },
  errors: [AccessDenied, InvalidArgument, NoSuchDistribution],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvalidations",
  pagination: {
    inputToken: "Marker",
    outputToken: "InvalidationList.NextMarker",
    items: "InvalidationList.Items",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListInvalidationsForDistributionTenantError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | CommonErrors;
/**
 * Lists the invalidations for a distribution tenant.
 */
export const listInvalidationsForDistributionTenant: API.PaginatedOperationMethod<
  ListInvalidationsForDistributionTenantRequest,
  ListInvalidationsForDistributionTenantResult,
  ListInvalidationsForDistributionTenantError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/distribution-tenant/{Id}/invalidation",
    input: {
      Id: 0,
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      InvalidationList: D.m({ payload: true, shape: o_InvalidationList }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvalidationsForDistributionTenant",
  pagination: {
    inputToken: "Marker",
    outputToken: "InvalidationList.NextMarker",
    items: "InvalidationList.Items",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListKeyGroupsError = InvalidArgument | CommonErrors;
/**
 * Gets a list of key groups.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listKeyGroups: API.OperationMethod<
  ListKeyGroupsRequest,
  ListKeyGroupsResult,
  ListKeyGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/key-group",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      KeyGroupList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Quantity: D.num,
          Items: D.list({ KeyGroup: o_KeyGroup }, { item: "KeyGroupSummary" }),
        },
      }),
    },
  },
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKeyGroups",
})) as any;

export type ListKeyValueStoresError =
  | AccessDenied
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * Specifies the key value stores to list.
 */
export const listKeyValueStores: API.PaginatedOperationMethod<
  ListKeyValueStoresRequest,
  ListKeyValueStoresResult,
  ListKeyValueStoresError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/key-value-store",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
      Status: D.m({ query: "Status" }),
    },
    output: {
      KeyValueStoreList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Quantity: D.num,
          Items: D.list(o_KeyValueStore, { item: "KeyValueStore" }),
        },
      }),
    },
  },
  errors: [AccessDenied, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKeyValueStores",
  pagination: {
    inputToken: "Marker",
    outputToken: "KeyValueStoreList.NextMarker",
    items: "KeyValueStoreList.Items",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListOriginAccessControlsError = InvalidArgument | CommonErrors;
/**
 * Gets the list of CloudFront origin access controls (OACs) in this Amazon Web Services account.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send another request that specifies the `NextMarker` value from the current response as the `Marker` value in the next request.
 *
 * If you're not using origin access controls for your Amazon Web Services account, the `ListOriginAccessControls` operation doesn't return the `Items` element in the response.
 */
export const listOriginAccessControls: API.PaginatedOperationMethod<
  ListOriginAccessControlsRequest,
  ListOriginAccessControlsResult,
  ListOriginAccessControlsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/origin-access-control",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      OriginAccessControlList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          IsTruncated: D.bool,
          Quantity: D.num,
          Items: D.list({}, { item: "OriginAccessControlSummary" }),
        },
      }),
    },
  },
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOriginAccessControls",
  pagination: {
    inputToken: "Marker",
    outputToken: "OriginAccessControlList.NextMarker",
    items: "OriginAccessControlList.Items",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListOriginRequestPoliciesError =
  | AccessDenied
  | InvalidArgument
  | NoSuchOriginRequestPolicy
  | CommonErrors;
/**
 * Gets a list of origin request policies.
 *
 * You can optionally apply a filter to return only the managed policies created by Amazon Web Services, or only the custom policies created in your Amazon Web Services account.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listOriginRequestPolicies: API.OperationMethod<
  ListOriginRequestPoliciesRequest,
  ListOriginRequestPoliciesResult,
  ListOriginRequestPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/origin-request-policy",
    input: {
      Type: D.m({ query: "Type" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      OriginRequestPolicyList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Quantity: D.num,
          Items: D.list(
            { OriginRequestPolicy: o_OriginRequestPolicy },
            { item: "OriginRequestPolicySummary" },
          ),
        },
      }),
    },
  },
  errors: [AccessDenied, InvalidArgument, NoSuchOriginRequestPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOriginRequestPolicies",
})) as any;

export type ListPublicKeysError = InvalidArgument | CommonErrors;
/**
 * List all public keys that have been added to CloudFront for this account.
 */
export const listPublicKeys: API.PaginatedOperationMethod<
  ListPublicKeysRequest,
  ListPublicKeysResult,
  ListPublicKeysError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/public-key",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      PublicKeyList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Quantity: D.num,
          Items: D.list({ CreatedTime: D.ts }, { item: "PublicKeySummary" }),
        },
      }),
    },
  },
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPublicKeys",
  pagination: {
    inputToken: "Marker",
    outputToken: "PublicKeyList.NextMarker",
    items: "PublicKeyList.Items",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListRealtimeLogConfigsError =
  | AccessDenied
  | InvalidArgument
  | NoSuchRealtimeLogConfig
  | CommonErrors;
/**
 * Gets a list of real-time log configurations.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listRealtimeLogConfigs: API.OperationMethod<
  ListRealtimeLogConfigsRequest,
  ListRealtimeLogConfigsResult,
  ListRealtimeLogConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/realtime-log-config",
    input: {
      MaxItems: D.m({ query: "MaxItems" }),
      Marker: D.m({ query: "Marker" }),
    },
    output: {
      RealtimeLogConfigs: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Items: D.list(o_RealtimeLogConfig),
          IsTruncated: D.bool,
        },
      }),
    },
  },
  errors: [AccessDenied, InvalidArgument, NoSuchRealtimeLogConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRealtimeLogConfigs",
})) as any;

export type ListResponseHeadersPoliciesError =
  | AccessDenied
  | InvalidArgument
  | NoSuchResponseHeadersPolicy
  | CommonErrors;
/**
 * Gets a list of response headers policies.
 *
 * You can optionally apply a filter to get only the managed policies created by Amazon Web Services, or only the custom policies created in your Amazon Web Services account.
 *
 * You can optionally specify the maximum number of items to receive in the response. If the total number of items in the list exceeds the maximum that you specify, or the default maximum, the response is paginated. To get the next page of items, send a subsequent request that specifies the `NextMarker` value from the current response as the `Marker` value in the subsequent request.
 */
export const listResponseHeadersPolicies: API.OperationMethod<
  ListResponseHeadersPoliciesRequest,
  ListResponseHeadersPoliciesResult,
  ListResponseHeadersPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/response-headers-policy",
    input: {
      Type: D.m({ query: "Type" }),
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      ResponseHeadersPolicyList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          Quantity: D.num,
          Items: D.list(
            { ResponseHeadersPolicy: o_ResponseHeadersPolicy },
            { item: "ResponseHeadersPolicySummary" },
          ),
        },
      }),
    },
  },
  errors: [AccessDenied, InvalidArgument, NoSuchResponseHeadersPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResponseHeadersPolicies",
})) as any;

export type ListStreamingDistributionsError = InvalidArgument | CommonErrors;
/**
 * List streaming distributions.
 */
export const listStreamingDistributions: API.PaginatedOperationMethod<
  ListStreamingDistributionsRequest,
  ListStreamingDistributionsResult,
  ListStreamingDistributionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/streaming-distribution",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      StreamingDistributionList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          IsTruncated: D.bool,
          Quantity: D.num,
          Items: D.list(
            {
              LastModifiedTime: D.ts,
              S3Origin: {},
              Aliases: o_Aliases,
              TrustedSigners: o_TrustedSigners,
              Enabled: D.bool,
            },
            { item: "StreamingDistributionSummary" },
          ),
        },
      }),
    },
  },
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreamingDistributions",
  pagination: {
    inputToken: "Marker",
    outputToken: "StreamingDistributionList.NextMarker",
    items: "StreamingDistributionList.Items",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDenied
  | InvalidArgument
  | InvalidTagging
  | NoSuchResource
  | CommonErrors;
/**
 * List tags for a CloudFront resource. For more information, see Tagging a distribution in the *Amazon CloudFront Developer Guide*.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/tagging",
    input: { Resource: D.m({ query: "Resource" }) },
    output: { Tags: D.m({ payload: true, shape: o_Tags }) },
  },
  errors: [AccessDenied, InvalidArgument, InvalidTagging, NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTrustStoresError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | CommonErrors;
/**
 * Lists trust stores.
 */
export const listTrustStores: API.PaginatedOperationMethod<
  ListTrustStoresRequest,
  ListTrustStoresResult,
  ListTrustStoresError,
  Credentials | HttpClient.HttpClient,
  TrustStoreSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/trust-stores",
    input: { Marker: 0, MaxItems: 0 },
    output: {
      TrustStoreList: D.list(
        { NumberOfCaCertificates: D.num, LastModifiedTime: D.ts },
        { item: "TrustStoreSummary" },
      ),
    },
    body: "ListTrustStoresRequest",
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrustStores",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "TrustStoreList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListVpcOriginsError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | UnsupportedOperation
  | CommonErrors;
/**
 * List the CloudFront VPC origins in your account.
 */
export const listVpcOrigins: API.OperationMethod<
  ListVpcOriginsRequest,
  ListVpcOriginsResult,
  ListVpcOriginsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2020-05-31/vpc-origin",
    input: {
      Marker: D.m({ query: "Marker" }),
      MaxItems: D.m({ query: "MaxItems" }),
    },
    output: {
      VpcOriginList: D.m({
        payload: true,
        shape: {
          MaxItems: D.num,
          IsTruncated: D.bool,
          Quantity: D.num,
          Items: D.list(
            { CreatedTime: D.ts, LastModifiedTime: D.ts },
            { item: "VpcOriginSummary" },
          ),
        },
      }),
    },
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcOrigins",
})) as any;

export type PublishConnectionFunctionError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Publishes a connection function.
 */
export const publishConnectionFunction: API.OperationMethod<
  PublishConnectionFunctionRequest,
  PublishConnectionFunctionResult,
  PublishConnectionFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/connection-function/{Id}/publish",
    input: { Id: 0, IfMatch: D.m({ header: "If-Match" }) },
    output: {
      ConnectionFunctionSummary: D.m({
        payload: true,
        shape: o_ConnectionFunctionSummary,
      }),
    },
  },
  errors: [
    AccessDenied,
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishConnectionFunction",
})) as any;

export type PublishFunctionError =
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchFunctionExists
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Publishes a CloudFront function by copying the function code from the `DEVELOPMENT` stage to `LIVE`. This automatically updates all cache behaviors that are using this function to use the newly published copy in the `LIVE` stage.
 *
 * When a function is published to the `LIVE` stage, you can attach the function to a distribution's cache behavior, using the function's Amazon Resource Name (ARN).
 *
 * To publish a function, you must provide the function's name and version (`ETag` value). To get these values, you can use `ListFunctions` and `DescribeFunction`.
 */
export const publishFunction: API.OperationMethod<
  PublishFunctionRequest,
  PublishFunctionResult,
  PublishFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/function/{Name}/publish",
    input: { Name: 0, IfMatch: D.m({ header: "If-Match" }) },
    output: {
      FunctionSummary: D.m({ payload: true, shape: o_FunctionSummary }),
    },
  },
  errors: [
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchFunctionExists,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishFunction",
})) as any;

export type PutResourcePolicyError =
  | AccessDenied
  | EntityNotFound
  | IllegalUpdate
  | InvalidArgument
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates a resource control policy for a given CloudFront resource.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResult,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/put-resource-policy",
    input: { ResourceArn: 0, PolicyDocument: 0 },
    body: "PutResourcePolicyRequest",
  },
  errors: [
    AccessDenied,
    EntityNotFound,
    IllegalUpdate,
    InvalidArgument,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type TagResourceError =
  | AccessDenied
  | InvalidArgument
  | InvalidTagging
  | NoSuchResource
  | CommonErrors;
/**
 * Add tags to a CloudFront resource. For more information, see Tagging a distribution in the *Amazon CloudFront Developer Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/tagging?Operation=Tag",
    input: {
      Resource: D.m({ query: "Resource" }),
      Tags: D.m({ payload: true, wire: "Tags", shape: i_Tags }),
    },
  },
  errors: [AccessDenied, InvalidArgument, InvalidTagging, NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestConnectionFunctionError =
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | TestFunctionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Tests a connection function.
 */
export const testConnectionFunction: API.OperationMethod<
  TestConnectionFunctionRequest,
  TestConnectionFunctionResult,
  TestConnectionFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/connection-function/{Id}/test",
    input: {
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
      Stage: 0,
      ConnectionObject: 0,
    },
    output: {
      ConnectionFunctionTestResult: D.m({
        payload: true,
        shape: {
          ConnectionFunctionSummary: o_ConnectionFunctionSummary,
          ConnectionFunctionExecutionLogs: D.list(),
          ConnectionFunctionErrorMessage: D.secret,
          ConnectionFunctionOutput: D.secret,
        },
      }),
    },
    body: "TestConnectionFunctionRequest",
  },
  errors: [
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
    TestFunctionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestConnectionFunction",
})) as any;

export type TestFunctionError =
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchFunctionExists
  | TestFunctionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Tests a CloudFront function.
 *
 * To test a function, you provide an *event object* that represents an HTTP request or response that your CloudFront distribution could receive in production. CloudFront runs the function, passing it the event object that you provided, and returns the function's result (the modified event object) in the response. The response also contains function logs and error messages, if any exist. For more information about testing functions, see Testing functions in the *Amazon CloudFront Developer Guide*.
 *
 * To test a function, you provide the function's name and version (`ETag` value) along with the event object. To get the function's name and version, you can use `ListFunctions` and `DescribeFunction`.
 */
export const testFunction: API.OperationMethod<
  TestFunctionRequest,
  TestFunctionResult,
  TestFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/function/{Name}/test",
    input: {
      Name: 0,
      IfMatch: D.m({ header: "If-Match" }),
      Stage: 0,
      EventObject: 0,
    },
    output: {
      TestResult: D.m({
        payload: true,
        shape: {
          FunctionSummary: o_FunctionSummary,
          FunctionExecutionLogs: D.list(),
          FunctionErrorMessage: D.secret,
          FunctionOutput: D.secret,
        },
      }),
    },
    body: "TestFunctionRequest",
  },
  errors: [
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchFunctionExists,
    TestFunctionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestFunction",
})) as any;

export type UntagResourceError =
  | AccessDenied
  | InvalidArgument
  | InvalidTagging
  | NoSuchResource
  | CommonErrors;
/**
 * Remove tags from a CloudFront resource. For more information, see Tagging a distribution in the *Amazon CloudFront Developer Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/tagging?Operation=Untag",
    input: {
      Resource: D.m({ query: "Resource" }),
      TagKeys: D.m({
        payload: true,
        wire: "TagKeys",
        shape: { Items: D.list(0, { item: "Key" }) },
      }),
    },
  },
  errors: [AccessDenied, InvalidArgument, InvalidTagging, NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAnycastIpListError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Updates an Anycast static IP list.
 */
export const updateAnycastIpList: API.OperationMethod<
  UpdateAnycastIpListRequest,
  UpdateAnycastIpListResult,
  UpdateAnycastIpListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/anycast-ip-list/{Id}",
    input: {
      Id: 0,
      IpAddressType: 0,
      IpamCidrConfigs: D.list(i_IpamCidrConfig, { item: "IpamCidrConfig" }),
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      AnycastIpList: D.m({ payload: true, shape: o_AnycastIpList }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "UpdateAnycastIpListRequest",
  },
  errors: [
    AccessDenied,
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnycastIpList",
})) as any;

export type UpdateCachePolicyError =
  | AccessDenied
  | CachePolicyAlreadyExists
  | IllegalUpdate
  | InconsistentQuantities
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchCachePolicy
  | PreconditionFailed
  | TooManyCookiesInCachePolicy
  | TooManyHeadersInCachePolicy
  | TooManyQueryStringsInCachePolicy
  | CommonErrors;
/**
 * Updates a cache policy configuration.
 *
 * When you update a cache policy configuration, all the fields are updated with the values provided in the request. You cannot update some fields independent of others. To update a cache policy configuration:
 *
 * - Use `GetCachePolicyConfig` to get the current configuration.
 *
 * - Locally modify the fields in the cache policy configuration that you want to update.
 *
 * - Call `UpdateCachePolicy` by providing the entire cache policy configuration, including the fields that you modified and those that you didn't.
 *
 * If your minimum TTL is greater than 0, CloudFront will cache content for at least the duration specified in the cache policy's minimum TTL, even if the `Cache-Control: no-cache`, `no-store`, or `private` directives are present in the origin headers.
 */
export const updateCachePolicy: API.OperationMethod<
  UpdateCachePolicyRequest,
  UpdateCachePolicyResult,
  UpdateCachePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/cache-policy/{Id}",
    input: {
      CachePolicyConfig: D.m({
        payload: true,
        wire: "CachePolicyConfig",
        shape: i_CachePolicyConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      CachePolicy: D.m({ payload: true, shape: o_CachePolicy }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CachePolicyAlreadyExists,
    IllegalUpdate,
    InconsistentQuantities,
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchCachePolicy,
    PreconditionFailed,
    TooManyCookiesInCachePolicy,
    TooManyHeadersInCachePolicy,
    TooManyQueryStringsInCachePolicy,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCachePolicy",
})) as any;

export type UpdateCloudFrontOriginAccessIdentityError =
  | AccessDenied
  | IllegalUpdate
  | InconsistentQuantities
  | InvalidArgument
  | InvalidIfMatchVersion
  | MissingBody
  | NoSuchCloudFrontOriginAccessIdentity
  | PreconditionFailed
  | CommonErrors;
/**
 * Update an origin access identity.
 */
export const updateCloudFrontOriginAccessIdentity: API.OperationMethod<
  UpdateCloudFrontOriginAccessIdentityRequest,
  UpdateCloudFrontOriginAccessIdentityResult,
  UpdateCloudFrontOriginAccessIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/origin-access-identity/cloudfront/{Id}/config",
    input: {
      CloudFrontOriginAccessIdentityConfig: D.m({
        payload: true,
        wire: "CloudFrontOriginAccessIdentityConfig",
        shape: i_CloudFrontOriginAccessIdentityConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      CloudFrontOriginAccessIdentity: D.m({
        payload: true,
        shape: o_CloudFrontOriginAccessIdentity,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    IllegalUpdate,
    InconsistentQuantities,
    InvalidArgument,
    InvalidIfMatchVersion,
    MissingBody,
    NoSuchCloudFrontOriginAccessIdentity,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCloudFrontOriginAccessIdentity",
})) as any;

export type UpdateConnectionFunctionError =
  | AccessDenied
  | EntityNotFound
  | EntitySizeLimitExceeded
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Updates a connection function.
 */
export const updateConnectionFunction: API.OperationMethod<
  UpdateConnectionFunctionRequest,
  UpdateConnectionFunctionResult,
  UpdateConnectionFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/connection-function/{Id}",
    input: {
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
      ConnectionFunctionConfig: i_FunctionConfig,
      ConnectionFunctionCode: 0,
    },
    output: {
      ConnectionFunctionSummary: D.m({
        payload: true,
        shape: o_ConnectionFunctionSummary,
      }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "UpdateConnectionFunctionRequest",
  },
  errors: [
    AccessDenied,
    EntityNotFound,
    EntitySizeLimitExceeded,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectionFunction",
})) as any;

export type UpdateConnectionGroupError =
  | AccessDenied
  | EntityAlreadyExists
  | EntityLimitExceeded
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | ResourceInUse
  | CommonErrors;
/**
 * Updates a connection group.
 */
export const updateConnectionGroup: API.OperationMethod<
  UpdateConnectionGroupRequest,
  UpdateConnectionGroupResult,
  UpdateConnectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/connection-group/{Id}",
    input: {
      Id: 0,
      Ipv6Enabled: 0,
      IfMatch: D.m({ header: "If-Match" }),
      AnycastIpListId: 0,
      Enabled: 0,
    },
    output: {
      ConnectionGroup: D.m({ payload: true, shape: o_ConnectionGroup }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "UpdateConnectionGroupRequest",
  },
  errors: [
    AccessDenied,
    EntityAlreadyExists,
    EntityLimitExceeded,
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
    ResourceInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectionGroup",
})) as any;

export type UpdateContinuousDeploymentPolicyError =
  | AccessDenied
  | InconsistentQuantities
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchContinuousDeploymentPolicy
  | PreconditionFailed
  | StagingDistributionInUse
  | CommonErrors;
/**
 * Updates a continuous deployment policy. You can update a continuous deployment policy to enable or disable it, to change the percentage of traffic that it sends to the staging distribution, or to change the staging distribution that it sends traffic to.
 *
 * When you update a continuous deployment policy configuration, all the fields are updated with the values that are provided in the request. You cannot update some fields independent of others. To update a continuous deployment policy configuration:
 *
 * - Use `GetContinuousDeploymentPolicyConfig` to get the current configuration.
 *
 * - Locally modify the fields in the continuous deployment policy configuration that you want to update.
 *
 * - Use `UpdateContinuousDeploymentPolicy`, providing the entire continuous deployment policy configuration, including the fields that you modified and those that you didn't.
 */
export const updateContinuousDeploymentPolicy: API.OperationMethod<
  UpdateContinuousDeploymentPolicyRequest,
  UpdateContinuousDeploymentPolicyResult,
  UpdateContinuousDeploymentPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/continuous-deployment-policy/{Id}",
    input: {
      ContinuousDeploymentPolicyConfig: D.m({
        payload: true,
        wire: "ContinuousDeploymentPolicyConfig",
        shape: i_ContinuousDeploymentPolicyConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      ContinuousDeploymentPolicy: D.m({
        payload: true,
        shape: o_ContinuousDeploymentPolicy,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    InconsistentQuantities,
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchContinuousDeploymentPolicy,
    PreconditionFailed,
    StagingDistributionInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContinuousDeploymentPolicy",
})) as any;

export type UpdateDistributionError =
  | AccessDenied
  | CNAMEAlreadyExists
  | ContinuousDeploymentPolicyInUse
  | EntityNotFound
  | IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior
  | IllegalOriginAccessConfiguration
  | IllegalUpdate
  | InconsistentQuantities
  | InvalidArgument
  | InvalidDefaultRootObject
  | InvalidDomainNameForOriginAccessControl
  | InvalidErrorCode
  | InvalidForwardCookies
  | InvalidFunctionAssociation
  | InvalidGeoRestrictionParameter
  | InvalidHeadersForS3Origin
  | InvalidIfMatchVersion
  | InvalidLambdaFunctionAssociation
  | InvalidLocationCode
  | InvalidMinimumProtocolVersion
  | InvalidOriginAccessControl
  | InvalidOriginAccessIdentity
  | InvalidOriginKeepaliveTimeout
  | InvalidOriginReadTimeout
  | InvalidQueryStringParameters
  | InvalidRelativePath
  | InvalidRequiredProtocol
  | InvalidResponseCode
  | InvalidTTLOrder
  | InvalidViewerCertificate
  | InvalidWebACLId
  | MissingBody
  | NoSuchCachePolicy
  | NoSuchContinuousDeploymentPolicy
  | NoSuchDistribution
  | NoSuchFieldLevelEncryptionConfig
  | NoSuchOrigin
  | NoSuchOriginRequestPolicy
  | NoSuchRealtimeLogConfig
  | NoSuchResponseHeadersPolicy
  | PreconditionFailed
  | RealtimeLogConfigOwnerMismatch
  | StagingDistributionInUse
  | TooManyCacheBehaviors
  | TooManyCertificates
  | TooManyCookieNamesInWhiteList
  | TooManyDistributionCNAMEs
  | TooManyDistributionsAssociatedToCachePolicy
  | TooManyDistributionsAssociatedToFieldLevelEncryptionConfig
  | TooManyDistributionsAssociatedToKeyGroup
  | TooManyDistributionsAssociatedToOriginAccessControl
  | TooManyDistributionsAssociatedToOriginRequestPolicy
  | TooManyDistributionsAssociatedToResponseHeadersPolicy
  | TooManyDistributionsWithFunctionAssociations
  | TooManyDistributionsWithLambdaAssociations
  | TooManyDistributionsWithSingleFunctionARN
  | TooManyFunctionAssociations
  | TooManyHeadersInForwardedValues
  | TooManyKeyGroupsAssociatedToDistribution
  | TooManyLambdaFunctionAssociations
  | TooManyOriginCustomHeaders
  | TooManyOriginGroupsPerDistribution
  | TooManyOrigins
  | TooManyQueryStringParameters
  | TooManyTrustedSigners
  | TrustedKeyGroupDoesNotExist
  | TrustedSignerDoesNotExist
  | CommonErrors;
/**
 * Updates the configuration for a CloudFront distribution.
 *
 * The update process includes getting the current distribution configuration, updating it to make your changes, and then submitting an `UpdateDistribution` request to make the updates.
 *
 * **To update a web distribution using the CloudFront API**
 *
 * - Use `GetDistributionConfig` to get the current configuration, including the version identifier (`ETag`).
 *
 * - Update the distribution configuration that was returned in the response. Note the following important requirements and restrictions:
 *
 * - You must copy the `ETag` field value from the response. (You'll use it for the `IfMatch` parameter in your request.) Then, remove the `ETag` field from the distribution configuration.
 *
 * - You can't change the value of `CallerReference`.
 *
 * - Submit an `UpdateDistribution` request, providing the updated distribution configuration. The new configuration replaces the existing configuration. The values that you specify in an `UpdateDistribution` request are not merged into your existing configuration. Make sure to include all fields: the ones that you modified and also the ones that you didn't.
 */
export const updateDistribution: API.OperationMethod<
  UpdateDistributionRequest,
  UpdateDistributionResult,
  UpdateDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/distribution/{Id}/config",
    input: {
      DistributionConfig: D.m({
        payload: true,
        wire: "DistributionConfig",
        shape: i_DistributionConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      Distribution: D.m({ payload: true, shape: o_Distribution }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CNAMEAlreadyExists,
    ContinuousDeploymentPolicyInUse,
    EntityNotFound,
    IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior,
    IllegalOriginAccessConfiguration,
    IllegalUpdate,
    InconsistentQuantities,
    InvalidArgument,
    InvalidDefaultRootObject,
    InvalidDomainNameForOriginAccessControl,
    InvalidErrorCode,
    InvalidForwardCookies,
    InvalidFunctionAssociation,
    InvalidGeoRestrictionParameter,
    InvalidHeadersForS3Origin,
    InvalidIfMatchVersion,
    InvalidLambdaFunctionAssociation,
    InvalidLocationCode,
    InvalidMinimumProtocolVersion,
    InvalidOriginAccessControl,
    InvalidOriginAccessIdentity,
    InvalidOriginKeepaliveTimeout,
    InvalidOriginReadTimeout,
    InvalidQueryStringParameters,
    InvalidRelativePath,
    InvalidRequiredProtocol,
    InvalidResponseCode,
    InvalidTTLOrder,
    InvalidViewerCertificate,
    InvalidWebACLId,
    MissingBody,
    NoSuchCachePolicy,
    NoSuchContinuousDeploymentPolicy,
    NoSuchDistribution,
    NoSuchFieldLevelEncryptionConfig,
    NoSuchOrigin,
    NoSuchOriginRequestPolicy,
    NoSuchRealtimeLogConfig,
    NoSuchResponseHeadersPolicy,
    PreconditionFailed,
    RealtimeLogConfigOwnerMismatch,
    StagingDistributionInUse,
    TooManyCacheBehaviors,
    TooManyCertificates,
    TooManyCookieNamesInWhiteList,
    TooManyDistributionCNAMEs,
    TooManyDistributionsAssociatedToCachePolicy,
    TooManyDistributionsAssociatedToFieldLevelEncryptionConfig,
    TooManyDistributionsAssociatedToKeyGroup,
    TooManyDistributionsAssociatedToOriginAccessControl,
    TooManyDistributionsAssociatedToOriginRequestPolicy,
    TooManyDistributionsAssociatedToResponseHeadersPolicy,
    TooManyDistributionsWithFunctionAssociations,
    TooManyDistributionsWithLambdaAssociations,
    TooManyDistributionsWithSingleFunctionARN,
    TooManyFunctionAssociations,
    TooManyHeadersInForwardedValues,
    TooManyKeyGroupsAssociatedToDistribution,
    TooManyLambdaFunctionAssociations,
    TooManyOriginCustomHeaders,
    TooManyOriginGroupsPerDistribution,
    TooManyOrigins,
    TooManyQueryStringParameters,
    TooManyTrustedSigners,
    TrustedKeyGroupDoesNotExist,
    TrustedSignerDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDistribution",
})) as any;

export type UpdateDistributionTenantError =
  | AccessDenied
  | CNAMEAlreadyExists
  | EntityAlreadyExists
  | EntityLimitExceeded
  | EntityNotFound
  | InvalidArgument
  | InvalidAssociation
  | InvalidIfMatchVersion
  | PreconditionFailed
  | CommonErrors;
/**
 * Updates a distribution tenant.
 */
export const updateDistributionTenant: API.OperationMethod<
  UpdateDistributionTenantRequest,
  UpdateDistributionTenantResult,
  UpdateDistributionTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/distribution-tenant/{Id}",
    input: {
      Id: 0,
      DistributionId: 0,
      Domains: D.list(i_DomainItem),
      Customizations: i_Customizations,
      Parameters: D.list(i_Parameter),
      ConnectionGroupId: 0,
      IfMatch: D.m({ header: "If-Match" }),
      ManagedCertificateRequest: i_ManagedCertificateRequest,
      Enabled: 0,
    },
    output: {
      DistributionTenant: D.m({ payload: true, shape: o_DistributionTenant }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "UpdateDistributionTenantRequest",
  },
  errors: [
    AccessDenied,
    CNAMEAlreadyExists,
    EntityAlreadyExists,
    EntityLimitExceeded,
    EntityNotFound,
    InvalidArgument,
    InvalidAssociation,
    InvalidIfMatchVersion,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDistributionTenant",
})) as any;

export type UpdateDistributionWithStagingConfigError =
  | AccessDenied
  | CNAMEAlreadyExists
  | EntityLimitExceeded
  | EntityNotFound
  | IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior
  | IllegalUpdate
  | InconsistentQuantities
  | InvalidArgument
  | InvalidDefaultRootObject
  | InvalidErrorCode
  | InvalidForwardCookies
  | InvalidFunctionAssociation
  | InvalidGeoRestrictionParameter
  | InvalidHeadersForS3Origin
  | InvalidIfMatchVersion
  | InvalidLambdaFunctionAssociation
  | InvalidLocationCode
  | InvalidMinimumProtocolVersion
  | InvalidOriginAccessControl
  | InvalidOriginAccessIdentity
  | InvalidOriginKeepaliveTimeout
  | InvalidOriginReadTimeout
  | InvalidQueryStringParameters
  | InvalidRelativePath
  | InvalidRequiredProtocol
  | InvalidResponseCode
  | InvalidTTLOrder
  | InvalidViewerCertificate
  | InvalidWebACLId
  | MissingBody
  | NoSuchCachePolicy
  | NoSuchDistribution
  | NoSuchFieldLevelEncryptionConfig
  | NoSuchOrigin
  | NoSuchOriginRequestPolicy
  | NoSuchRealtimeLogConfig
  | NoSuchResponseHeadersPolicy
  | PreconditionFailed
  | RealtimeLogConfigOwnerMismatch
  | TooManyCacheBehaviors
  | TooManyCertificates
  | TooManyCookieNamesInWhiteList
  | TooManyDistributionCNAMEs
  | TooManyDistributionsAssociatedToCachePolicy
  | TooManyDistributionsAssociatedToFieldLevelEncryptionConfig
  | TooManyDistributionsAssociatedToKeyGroup
  | TooManyDistributionsAssociatedToOriginAccessControl
  | TooManyDistributionsAssociatedToOriginRequestPolicy
  | TooManyDistributionsAssociatedToResponseHeadersPolicy
  | TooManyDistributionsWithFunctionAssociations
  | TooManyDistributionsWithLambdaAssociations
  | TooManyDistributionsWithSingleFunctionARN
  | TooManyFunctionAssociations
  | TooManyHeadersInForwardedValues
  | TooManyKeyGroupsAssociatedToDistribution
  | TooManyLambdaFunctionAssociations
  | TooManyOriginCustomHeaders
  | TooManyOriginGroupsPerDistribution
  | TooManyOrigins
  | TooManyQueryStringParameters
  | TooManyTrustedSigners
  | TrustedKeyGroupDoesNotExist
  | TrustedSignerDoesNotExist
  | CommonErrors;
/**
 * Copies the staging distribution's configuration to its corresponding primary distribution. The primary distribution retains its `Aliases` (also known as alternate domain names or CNAMEs) and `ContinuousDeploymentPolicyId` value, but otherwise its configuration is overwritten to match the staging distribution.
 *
 * You can use this operation in a continuous deployment workflow after you have tested configuration changes on the staging distribution. After using a continuous deployment policy to move a portion of your domain name's traffic to the staging distribution and verifying that it works as intended, you can use this operation to copy the staging distribution's configuration to the primary distribution. This action will disable the continuous deployment policy and move your domain's traffic back to the primary distribution.
 *
 * This API operation requires the following IAM permissions:
 *
 * - GetDistribution
 *
 * - UpdateDistribution
 */
export const updateDistributionWithStagingConfig: API.OperationMethod<
  UpdateDistributionWithStagingConfigRequest,
  UpdateDistributionWithStagingConfigResult,
  UpdateDistributionWithStagingConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/distribution/{Id}/promote-staging-config",
    input: {
      Id: 0,
      StagingDistributionId: D.m({ query: "StagingDistributionId" }),
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      Distribution: D.m({ payload: true, shape: o_Distribution }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CNAMEAlreadyExists,
    EntityLimitExceeded,
    EntityNotFound,
    IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior,
    IllegalUpdate,
    InconsistentQuantities,
    InvalidArgument,
    InvalidDefaultRootObject,
    InvalidErrorCode,
    InvalidForwardCookies,
    InvalidFunctionAssociation,
    InvalidGeoRestrictionParameter,
    InvalidHeadersForS3Origin,
    InvalidIfMatchVersion,
    InvalidLambdaFunctionAssociation,
    InvalidLocationCode,
    InvalidMinimumProtocolVersion,
    InvalidOriginAccessControl,
    InvalidOriginAccessIdentity,
    InvalidOriginKeepaliveTimeout,
    InvalidOriginReadTimeout,
    InvalidQueryStringParameters,
    InvalidRelativePath,
    InvalidRequiredProtocol,
    InvalidResponseCode,
    InvalidTTLOrder,
    InvalidViewerCertificate,
    InvalidWebACLId,
    MissingBody,
    NoSuchCachePolicy,
    NoSuchDistribution,
    NoSuchFieldLevelEncryptionConfig,
    NoSuchOrigin,
    NoSuchOriginRequestPolicy,
    NoSuchRealtimeLogConfig,
    NoSuchResponseHeadersPolicy,
    PreconditionFailed,
    RealtimeLogConfigOwnerMismatch,
    TooManyCacheBehaviors,
    TooManyCertificates,
    TooManyCookieNamesInWhiteList,
    TooManyDistributionCNAMEs,
    TooManyDistributionsAssociatedToCachePolicy,
    TooManyDistributionsAssociatedToFieldLevelEncryptionConfig,
    TooManyDistributionsAssociatedToKeyGroup,
    TooManyDistributionsAssociatedToOriginAccessControl,
    TooManyDistributionsAssociatedToOriginRequestPolicy,
    TooManyDistributionsAssociatedToResponseHeadersPolicy,
    TooManyDistributionsWithFunctionAssociations,
    TooManyDistributionsWithLambdaAssociations,
    TooManyDistributionsWithSingleFunctionARN,
    TooManyFunctionAssociations,
    TooManyHeadersInForwardedValues,
    TooManyKeyGroupsAssociatedToDistribution,
    TooManyLambdaFunctionAssociations,
    TooManyOriginCustomHeaders,
    TooManyOriginGroupsPerDistribution,
    TooManyOrigins,
    TooManyQueryStringParameters,
    TooManyTrustedSigners,
    TrustedKeyGroupDoesNotExist,
    TrustedSignerDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDistributionWithStagingConfig",
})) as any;

export type UpdateDomainAssociationError =
  | AccessDenied
  | EntityNotFound
  | IllegalUpdate
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | CommonErrors;
/**
 * We recommend that you use the `UpdateDomainAssociation` API operation to move a domain association, as it supports both standard distributions and distribution tenants. AssociateAlias performs similar checks but only supports standard distributions.
 *
 * Moves a domain from its current standard distribution or distribution tenant to another one.
 *
 * You must first disable the source distribution (standard distribution or distribution tenant) and then separately call this operation to move the domain to another target distribution (standard distribution or distribution tenant).
 *
 * To use this operation, specify the domain and the ID of the target resource (standard distribution or distribution tenant). For more information, including how to set up the target resource, prerequisites that you must complete, and other restrictions, see Moving an alternate domain name to a different standard distribution or distribution tenant in the *Amazon CloudFront Developer Guide*.
 */
export const updateDomainAssociation: API.OperationMethod<
  UpdateDomainAssociationRequest,
  UpdateDomainAssociationResult,
  UpdateDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/domain-association",
    input: {
      Domain: 0,
      TargetResource: i_DistributionResourceId,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: { ETag: D.m({ header: "ETag" }) },
    body: "UpdateDomainAssociationRequest",
  },
  errors: [
    AccessDenied,
    EntityNotFound,
    IllegalUpdate,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainAssociation",
})) as any;

export type UpdateFieldLevelEncryptionConfigError =
  | AccessDenied
  | IllegalUpdate
  | InconsistentQuantities
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchFieldLevelEncryptionConfig
  | NoSuchFieldLevelEncryptionProfile
  | PreconditionFailed
  | QueryArgProfileEmpty
  | TooManyFieldLevelEncryptionContentTypeProfiles
  | TooManyFieldLevelEncryptionQueryArgProfiles
  | CommonErrors;
/**
 * Update a field-level encryption configuration.
 */
export const updateFieldLevelEncryptionConfig: API.OperationMethod<
  UpdateFieldLevelEncryptionConfigRequest,
  UpdateFieldLevelEncryptionConfigResult,
  UpdateFieldLevelEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/field-level-encryption/{Id}/config",
    input: {
      FieldLevelEncryptionConfig: D.m({
        payload: true,
        wire: "FieldLevelEncryptionConfig",
        shape: i_FieldLevelEncryptionConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      FieldLevelEncryption: D.m({
        payload: true,
        shape: o_FieldLevelEncryption,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    IllegalUpdate,
    InconsistentQuantities,
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchFieldLevelEncryptionConfig,
    NoSuchFieldLevelEncryptionProfile,
    PreconditionFailed,
    QueryArgProfileEmpty,
    TooManyFieldLevelEncryptionContentTypeProfiles,
    TooManyFieldLevelEncryptionQueryArgProfiles,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFieldLevelEncryptionConfig",
})) as any;

export type UpdateFieldLevelEncryptionProfileError =
  | AccessDenied
  | FieldLevelEncryptionProfileAlreadyExists
  | FieldLevelEncryptionProfileSizeExceeded
  | IllegalUpdate
  | InconsistentQuantities
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchFieldLevelEncryptionProfile
  | NoSuchPublicKey
  | PreconditionFailed
  | TooManyFieldLevelEncryptionEncryptionEntities
  | TooManyFieldLevelEncryptionFieldPatterns
  | CommonErrors;
/**
 * Update a field-level encryption profile.
 */
export const updateFieldLevelEncryptionProfile: API.OperationMethod<
  UpdateFieldLevelEncryptionProfileRequest,
  UpdateFieldLevelEncryptionProfileResult,
  UpdateFieldLevelEncryptionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/field-level-encryption-profile/{Id}/config",
    input: {
      FieldLevelEncryptionProfileConfig: D.m({
        payload: true,
        wire: "FieldLevelEncryptionProfileConfig",
        shape: i_FieldLevelEncryptionProfileConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      FieldLevelEncryptionProfile: D.m({
        payload: true,
        shape: o_FieldLevelEncryptionProfile,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    FieldLevelEncryptionProfileAlreadyExists,
    FieldLevelEncryptionProfileSizeExceeded,
    IllegalUpdate,
    InconsistentQuantities,
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchFieldLevelEncryptionProfile,
    NoSuchPublicKey,
    PreconditionFailed,
    TooManyFieldLevelEncryptionEncryptionEntities,
    TooManyFieldLevelEncryptionFieldPatterns,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFieldLevelEncryptionProfile",
})) as any;

export type UpdateFunctionError =
  | FunctionSizeLimitExceeded
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchFunctionExists
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Updates a CloudFront function.
 *
 * You can update a function's code or the comment that describes the function. You cannot update a function's name.
 *
 * To update a function, you provide the function's name and version (`ETag` value) along with the updated function code. To get the name and version, you can use `ListFunctions` and `DescribeFunction`.
 */
export const updateFunction: API.OperationMethod<
  UpdateFunctionRequest,
  UpdateFunctionResult,
  UpdateFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/function/{Name}",
    input: {
      Name: 0,
      IfMatch: D.m({ header: "If-Match" }),
      FunctionConfig: i_FunctionConfig,
      FunctionCode: 0,
    },
    output: {
      FunctionSummary: D.m({ payload: true, shape: o_FunctionSummary }),
      ETag: D.m({ header: "ETtag" }),
    },
    body: "UpdateFunctionRequest",
  },
  errors: [
    FunctionSizeLimitExceeded,
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchFunctionExists,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunction",
})) as any;

export type UpdateKeyGroupError =
  | InvalidArgument
  | InvalidIfMatchVersion
  | KeyGroupAlreadyExists
  | NoSuchResource
  | PreconditionFailed
  | TooManyPublicKeysInKeyGroup
  | CommonErrors;
/**
 * Updates a key group.
 *
 * When you update a key group, all the fields are updated with the values provided in the request. You cannot update some fields independent of others. To update a key group:
 *
 * - Get the current key group with `GetKeyGroup` or `GetKeyGroupConfig`.
 *
 * - Locally modify the fields in the key group that you want to update. For example, add or remove public key IDs.
 *
 * - Call `UpdateKeyGroup` with the entire key group object, including the fields that you modified and those that you didn't.
 */
export const updateKeyGroup: API.OperationMethod<
  UpdateKeyGroupRequest,
  UpdateKeyGroupResult,
  UpdateKeyGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/key-group/{Id}",
    input: {
      KeyGroupConfig: D.m({
        payload: true,
        wire: "KeyGroupConfig",
        shape: i_KeyGroupConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      KeyGroup: D.m({ payload: true, shape: o_KeyGroup }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    InvalidArgument,
    InvalidIfMatchVersion,
    KeyGroupAlreadyExists,
    NoSuchResource,
    PreconditionFailed,
    TooManyPublicKeysInKeyGroup,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKeyGroup",
})) as any;

export type UpdateKeyValueStoreError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Specifies the key value store to update.
 */
export const updateKeyValueStore: API.OperationMethod<
  UpdateKeyValueStoreRequest,
  UpdateKeyValueStoreResult,
  UpdateKeyValueStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/key-value-store/{Name}",
    input: { Name: 0, Comment: 0, IfMatch: D.m({ header: "If-Match" }) },
    output: {
      KeyValueStore: D.m({ payload: true, shape: o_KeyValueStore }),
      ETag: D.m({ header: "ETag" }),
    },
    body: "UpdateKeyValueStoreRequest",
  },
  errors: [
    AccessDenied,
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKeyValueStore",
})) as any;

export type UpdateOriginAccessControlError =
  | AccessDenied
  | IllegalUpdate
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchOriginAccessControl
  | OriginAccessControlAlreadyExists
  | PreconditionFailed
  | CommonErrors;
/**
 * Updates a CloudFront origin access control.
 */
export const updateOriginAccessControl: API.OperationMethod<
  UpdateOriginAccessControlRequest,
  UpdateOriginAccessControlResult,
  UpdateOriginAccessControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/origin-access-control/{Id}/config",
    input: {
      OriginAccessControlConfig: D.m({
        payload: true,
        wire: "OriginAccessControlConfig",
        shape: i_OriginAccessControlConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      OriginAccessControl: D.m({ payload: true, shape: o_OriginAccessControl }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    IllegalUpdate,
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchOriginAccessControl,
    OriginAccessControlAlreadyExists,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOriginAccessControl",
})) as any;

export type UpdateOriginRequestPolicyError =
  | AccessDenied
  | IllegalUpdate
  | InconsistentQuantities
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchOriginRequestPolicy
  | OriginRequestPolicyAlreadyExists
  | PreconditionFailed
  | TooManyCookiesInOriginRequestPolicy
  | TooManyHeadersInOriginRequestPolicy
  | TooManyQueryStringsInOriginRequestPolicy
  | CommonErrors;
/**
 * Updates an origin request policy configuration.
 *
 * When you update an origin request policy configuration, all the fields are updated with the values provided in the request. You cannot update some fields independent of others. To update an origin request policy configuration:
 *
 * - Use `GetOriginRequestPolicyConfig` to get the current configuration.
 *
 * - Locally modify the fields in the origin request policy configuration that you want to update.
 *
 * - Call `UpdateOriginRequestPolicy` by providing the entire origin request policy configuration, including the fields that you modified and those that you didn't.
 */
export const updateOriginRequestPolicy: API.OperationMethod<
  UpdateOriginRequestPolicyRequest,
  UpdateOriginRequestPolicyResult,
  UpdateOriginRequestPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/origin-request-policy/{Id}",
    input: {
      OriginRequestPolicyConfig: D.m({
        payload: true,
        wire: "OriginRequestPolicyConfig",
        shape: i_OriginRequestPolicyConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      OriginRequestPolicy: D.m({ payload: true, shape: o_OriginRequestPolicy }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    IllegalUpdate,
    InconsistentQuantities,
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchOriginRequestPolicy,
    OriginRequestPolicyAlreadyExists,
    PreconditionFailed,
    TooManyCookiesInOriginRequestPolicy,
    TooManyHeadersInOriginRequestPolicy,
    TooManyQueryStringsInOriginRequestPolicy,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOriginRequestPolicy",
})) as any;

export type UpdatePublicKeyError =
  | AccessDenied
  | CannotChangeImmutablePublicKeyFields
  | IllegalUpdate
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchPublicKey
  | PreconditionFailed
  | CommonErrors;
/**
 * Update public key information. Note that the only value you can change is the comment.
 */
export const updatePublicKey: API.OperationMethod<
  UpdatePublicKeyRequest,
  UpdatePublicKeyResult,
  UpdatePublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/public-key/{Id}/config",
    input: {
      PublicKeyConfig: D.m({
        payload: true,
        wire: "PublicKeyConfig",
        shape: i_PublicKeyConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      PublicKey: D.m({ payload: true, shape: o_PublicKey }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CannotChangeImmutablePublicKeyFields,
    IllegalUpdate,
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchPublicKey,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePublicKey",
})) as any;

export type UpdateRealtimeLogConfigError =
  | AccessDenied
  | InvalidArgument
  | NoSuchRealtimeLogConfig
  | CommonErrors;
/**
 * Updates a real-time log configuration.
 *
 * When you update a real-time log configuration, all the parameters are updated with the values provided in the request. You cannot update some parameters independent of others. To update a real-time log configuration:
 *
 * - Call `GetRealtimeLogConfig` to get the current real-time log configuration.
 *
 * - Locally modify the parameters in the real-time log configuration that you want to update.
 *
 * - Call this API (`UpdateRealtimeLogConfig`) by providing the entire real-time log configuration, including the parameters that you modified and those that you didn't.
 *
 * You cannot update a real-time log configuration's `Name` or `ARN`.
 */
export const updateRealtimeLogConfig: API.OperationMethod<
  UpdateRealtimeLogConfigRequest,
  UpdateRealtimeLogConfigResult,
  UpdateRealtimeLogConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/realtime-log-config",
    input: {
      EndPoints: D.list(i_EndPoint),
      Fields: D.list(0, { item: "Field" }),
      Name: 0,
      ARN: 0,
      SamplingRate: 0,
    },
    output: { RealtimeLogConfig: o_RealtimeLogConfig },
    body: "UpdateRealtimeLogConfigRequest",
  },
  errors: [AccessDenied, InvalidArgument, NoSuchRealtimeLogConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRealtimeLogConfig",
})) as any;

export type UpdateResponseHeadersPolicyError =
  | AccessDenied
  | IllegalUpdate
  | InconsistentQuantities
  | InvalidArgument
  | InvalidIfMatchVersion
  | NoSuchResponseHeadersPolicy
  | PreconditionFailed
  | ResponseHeadersPolicyAlreadyExists
  | TooLongCSPInResponseHeadersPolicy
  | TooManyCustomHeadersInResponseHeadersPolicy
  | TooManyRemoveHeadersInResponseHeadersPolicy
  | CommonErrors;
/**
 * Updates a response headers policy.
 *
 * When you update a response headers policy, the entire policy is replaced. You cannot update some policy fields independent of others. To update a response headers policy configuration:
 *
 * - Use `GetResponseHeadersPolicyConfig` to get the current policy's configuration.
 *
 * - Modify the fields in the response headers policy configuration that you want to update.
 *
 * - Call `UpdateResponseHeadersPolicy`, providing the entire response headers policy configuration, including the fields that you modified and those that you didn't.
 */
export const updateResponseHeadersPolicy: API.OperationMethod<
  UpdateResponseHeadersPolicyRequest,
  UpdateResponseHeadersPolicyResult,
  UpdateResponseHeadersPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/response-headers-policy/{Id}",
    input: {
      ResponseHeadersPolicyConfig: D.m({
        payload: true,
        wire: "ResponseHeadersPolicyConfig",
        shape: i_ResponseHeadersPolicyConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      ResponseHeadersPolicy: D.m({
        payload: true,
        shape: o_ResponseHeadersPolicy,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    IllegalUpdate,
    InconsistentQuantities,
    InvalidArgument,
    InvalidIfMatchVersion,
    NoSuchResponseHeadersPolicy,
    PreconditionFailed,
    ResponseHeadersPolicyAlreadyExists,
    TooLongCSPInResponseHeadersPolicy,
    TooManyCustomHeadersInResponseHeadersPolicy,
    TooManyRemoveHeadersInResponseHeadersPolicy,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResponseHeadersPolicy",
})) as any;

export type UpdateStreamingDistributionError =
  | AccessDenied
  | CNAMEAlreadyExists
  | IllegalUpdate
  | InconsistentQuantities
  | InvalidArgument
  | InvalidIfMatchVersion
  | InvalidOriginAccessControl
  | InvalidOriginAccessIdentity
  | MissingBody
  | NoSuchStreamingDistribution
  | PreconditionFailed
  | TooManyStreamingDistributionCNAMEs
  | TooManyTrustedSigners
  | TrustedSignerDoesNotExist
  | CommonErrors;
/**
 * Update a streaming distribution.
 */
export const updateStreamingDistribution: API.OperationMethod<
  UpdateStreamingDistributionRequest,
  UpdateStreamingDistributionResult,
  UpdateStreamingDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/streaming-distribution/{Id}/config",
    input: {
      StreamingDistributionConfig: D.m({
        payload: true,
        wire: "StreamingDistributionConfig",
        shape: i_StreamingDistributionConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      StreamingDistribution: D.m({
        payload: true,
        shape: o_StreamingDistribution,
      }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CNAMEAlreadyExists,
    IllegalUpdate,
    InconsistentQuantities,
    InvalidArgument,
    InvalidIfMatchVersion,
    InvalidOriginAccessControl,
    InvalidOriginAccessIdentity,
    MissingBody,
    NoSuchStreamingDistribution,
    PreconditionFailed,
    TooManyStreamingDistributionCNAMEs,
    TooManyTrustedSigners,
    TrustedSignerDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStreamingDistribution",
})) as any;

export type UpdateTrustStoreError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | CommonErrors;
/**
 * Updates a trust store.
 */
export const updateTrustStore: API.OperationMethod<
  UpdateTrustStoreRequest,
  UpdateTrustStoreResult,
  UpdateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/trust-store/{Id}",
    input: {
      Id: 0,
      CaCertificatesBundleSource: D.m({
        payload: true,
        wire: "CaCertificatesBundleSource",
        shape: i_CaCertificatesBundleSource,
      }),
      UseClientCertificateOCSPEndpoint: D.m({
        header: "UseClientCertificateOCSPEndpoint",
      }),
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      TrustStore: D.m({ payload: true, shape: o_TrustStore }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    EntityNotFound,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrustStore",
})) as any;

export type UpdateVpcOriginError =
  | AccessDenied
  | CannotUpdateEntityWhileInUse
  | EntityAlreadyExists
  | EntityLimitExceeded
  | EntityNotFound
  | IllegalUpdate
  | InconsistentQuantities
  | InvalidArgument
  | InvalidIfMatchVersion
  | PreconditionFailed
  | UnsupportedOperation
  | CommonErrors;
/**
 * Update an Amazon CloudFront VPC origin in your account.
 */
export const updateVpcOrigin: API.OperationMethod<
  UpdateVpcOriginRequest,
  UpdateVpcOriginResult,
  UpdateVpcOriginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2020-05-31/vpc-origin/{Id}",
    input: {
      VpcOriginEndpointConfig: D.m({
        payload: true,
        wire: "VpcOriginEndpointConfig",
        shape: i_VpcOriginEndpointConfig,
      }),
      Id: 0,
      IfMatch: D.m({ header: "If-Match" }),
    },
    output: {
      VpcOrigin: D.m({ payload: true, shape: o_VpcOrigin }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [
    AccessDenied,
    CannotUpdateEntityWhileInUse,
    EntityAlreadyExists,
    EntityLimitExceeded,
    EntityNotFound,
    IllegalUpdate,
    InconsistentQuantities,
    InvalidArgument,
    InvalidIfMatchVersion,
    PreconditionFailed,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcOrigin",
})) as any;

export type VerifyDnsConfigurationError =
  | AccessDenied
  | EntityNotFound
  | InvalidArgument
  | CommonErrors;
/**
 * Verify the DNS configuration for your domain names. This API operation checks whether your domain name points to the correct routing endpoint of the connection group, such as d111111abcdef8.cloudfront.net. You can use this API operation to troubleshoot and resolve DNS configuration issues.
 */
export const verifyDnsConfiguration: API.OperationMethod<
  VerifyDnsConfigurationRequest,
  VerifyDnsConfigurationResult,
  VerifyDnsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2020-05-31/verify-dns-configuration",
    input: { Domain: 0, Identifier: 0 },
    output: { DnsConfigurationList: D.list({}, { item: "DnsConfiguration" }) },
    body: "VerifyDnsConfigurationRequest",
  },
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyDnsConfiguration",
})) as any;

const i_CaCertificatesBundleSource: D.LazyStruct = () => ({
  CaCertificatesBundleS3Location: { Bucket: 0, Key: 0, Region: 0, Version: 0 },
});
const i_CachePolicyConfig: D.LazyStruct = () => ({
  Comment: 0,
  Name: 0,
  DefaultTTL: 0,
  MaxTTL: 0,
  MinTTL: 0,
  ParametersInCacheKeyAndForwardedToOrigin: {
    EnableAcceptEncodingGzip: 0,
    EnableAcceptEncodingBrotli: 0,
    HeadersConfig: { HeaderBehavior: 0, Headers: i_Headers },
    CookiesConfig: { CookieBehavior: 0, Cookies: i_CookieNames },
    QueryStringsConfig: {
      QueryStringBehavior: 0,
      QueryStrings: i_QueryStringNames,
    },
  },
});
const i_CloudFrontOriginAccessIdentityConfig: D.LazyStruct = () => ({
  CallerReference: 0,
  Comment: 0,
});
const i_ContinuousDeploymentPolicyConfig: D.LazyStruct = () => ({
  StagingDistributionDnsNames: {
    Quantity: 0,
    Items: D.list(0, { item: "DnsName" }),
  },
  Enabled: 0,
  TrafficConfig: {
    SingleWeightConfig: {
      Weight: 0,
      SessionStickinessConfig: { IdleTTL: 0, MaximumTTL: 0 },
    },
    SingleHeaderConfig: { Header: 0, Value: 0 },
    Type: 0,
  },
});
const i_Customizations: D.LazyStruct = () => ({
  WebAcl: { Action: 0, Arn: 0 },
  Certificate: { Arn: 0 },
  GeoRestrictions: {
    RestrictionType: 0,
    Locations: D.list(0, { item: "Location" }),
  },
});
const i_DistributionConfig: D.LazyStruct = () => ({
  CallerReference: 0,
  Aliases: i_Aliases,
  DefaultRootObject: 0,
  Origins: {
    Quantity: 0,
    Items: D.list(
      {
        Id: 0,
        DomainName: 0,
        OriginPath: 0,
        CustomHeaders: {
          Quantity: 0,
          Items: D.list(
            { HeaderName: 0, HeaderValue: 0 },
            { item: "OriginCustomHeader" },
          ),
        },
        S3OriginConfig: { OriginAccessIdentity: 0, OriginReadTimeout: 0 },
        CustomOriginConfig: {
          HTTPPort: 0,
          HTTPSPort: 0,
          OriginProtocolPolicy: 0,
          OriginSslProtocols: i_OriginSslProtocols,
          OriginReadTimeout: 0,
          OriginKeepaliveTimeout: 0,
          IpAddressType: 0,
          OriginMtlsConfig: { ClientCertificateArn: 0 },
        },
        VpcOriginConfig: {
          VpcOriginId: 0,
          OwnerAccountId: 0,
          OriginReadTimeout: 0,
          OriginKeepaliveTimeout: 0,
        },
        ConnectionAttempts: 0,
        ConnectionTimeout: 0,
        ResponseCompletionTimeout: 0,
        OriginShield: { Enabled: 0, OriginShieldRegion: 0 },
        OriginAccessControlId: 0,
      },
      { item: "Origin" },
    ),
  },
  OriginGroups: {
    Quantity: 0,
    Items: D.list(
      {
        Id: 0,
        FailoverCriteria: {
          StatusCodes: {
            Quantity: 0,
            Items: D.list(0, { item: "StatusCode" }),
          },
        },
        Members: {
          Quantity: 0,
          Items: D.list({ OriginId: 0 }, { item: "OriginGroupMember" }),
        },
        SelectionCriteria: 0,
      },
      { item: "OriginGroup" },
    ),
  },
  DefaultCacheBehavior: {
    TargetOriginId: 0,
    TrustedSigners: i_TrustedSigners,
    TrustedKeyGroups: i_TrustedKeyGroups,
    ViewerProtocolPolicy: 0,
    AllowedMethods: i_AllowedMethods,
    SmoothStreaming: 0,
    Compress: 0,
    LambdaFunctionAssociations: i_LambdaFunctionAssociations,
    FunctionAssociations: i_FunctionAssociations,
    FieldLevelEncryptionId: 0,
    RealtimeLogConfigArn: 0,
    CachePolicyId: 0,
    OriginRequestPolicyId: 0,
    ResponseHeadersPolicyId: 0,
    GrpcConfig: i_GrpcConfig,
    ForwardedValues: i_ForwardedValues,
    MinTTL: 0,
    DefaultTTL: 0,
    MaxTTL: 0,
  },
  CacheBehaviors: {
    Quantity: 0,
    Items: D.list(
      {
        PathPattern: 0,
        TargetOriginId: 0,
        TrustedSigners: i_TrustedSigners,
        TrustedKeyGroups: i_TrustedKeyGroups,
        ViewerProtocolPolicy: 0,
        AllowedMethods: i_AllowedMethods,
        SmoothStreaming: 0,
        Compress: 0,
        LambdaFunctionAssociations: i_LambdaFunctionAssociations,
        FunctionAssociations: i_FunctionAssociations,
        FieldLevelEncryptionId: 0,
        RealtimeLogConfigArn: 0,
        CachePolicyId: 0,
        OriginRequestPolicyId: 0,
        ResponseHeadersPolicyId: 0,
        GrpcConfig: i_GrpcConfig,
        ForwardedValues: i_ForwardedValues,
        MinTTL: 0,
        DefaultTTL: 0,
        MaxTTL: 0,
      },
      { item: "CacheBehavior" },
    ),
  },
  CustomErrorResponses: {
    Quantity: 0,
    Items: D.list(
      {
        ErrorCode: 0,
        ResponsePagePath: 0,
        ResponseCode: 0,
        ErrorCachingMinTTL: 0,
      },
      { item: "CustomErrorResponse" },
    ),
  },
  Comment: 0,
  Logging: { Enabled: 0, IncludeCookies: 0, Bucket: 0, Prefix: 0 },
  PriceClass: 0,
  Enabled: 0,
  ViewerCertificate: {
    CloudFrontDefaultCertificate: 0,
    IAMCertificateId: 0,
    ACMCertificateArn: 0,
    SSLSupportMethod: 0,
    MinimumProtocolVersion: 0,
    Certificate: 0,
    CertificateSource: 0,
  },
  Restrictions: {
    GeoRestriction: {
      RestrictionType: 0,
      Quantity: 0,
      Items: D.list(0, { item: "Location" }),
    },
  },
  WebACLId: 0,
  HttpVersion: 0,
  IsIPV6Enabled: 0,
  ContinuousDeploymentPolicyId: 0,
  Staging: 0,
  AnycastIpListId: 0,
  TenantConfig: {
    ParameterDefinitions: D.list({
      Name: 0,
      Definition: {
        StringSchema: { Comment: 0, DefaultValue: 0, Required: 0 },
      },
    }),
  },
  ConnectionMode: 0,
  ViewerMtlsConfig: {
    Mode: 0,
    TrustStoreConfig: {
      TrustStoreId: 0,
      AdvertiseTrustStoreCaNames: 0,
      IgnoreCertificateExpiry: 0,
    },
  },
  ConnectionFunctionAssociation: { Id: 0 },
  CacheTagConfig: { HeaderName: 0 },
});
const i_DistributionResourceId: D.LazyStruct = () => ({
  DistributionId: 0,
  DistributionTenantId: 0,
});
const i_DomainItem: D.LazyStruct = () => ({ Domain: 0 });
const i_EndPoint: D.LazyStruct = () => ({
  StreamType: 0,
  KinesisStreamConfig: { RoleARN: 0, StreamARN: 0 },
});
const i_FieldLevelEncryptionConfig: D.LazyStruct = () => ({
  CallerReference: 0,
  Comment: 0,
  QueryArgProfileConfig: {
    ForwardWhenQueryArgProfileIsUnknown: 0,
    QueryArgProfiles: {
      Quantity: 0,
      Items: D.list({ QueryArg: 0, ProfileId: 0 }, { item: "QueryArgProfile" }),
    },
  },
  ContentTypeProfileConfig: {
    ForwardWhenContentTypeIsUnknown: 0,
    ContentTypeProfiles: {
      Quantity: 0,
      Items: D.list(
        { Format: 0, ProfileId: 0, ContentType: 0 },
        { item: "ContentTypeProfile" },
      ),
    },
  },
});
const i_FieldLevelEncryptionProfileConfig: D.LazyStruct = () => ({
  Name: 0,
  CallerReference: 0,
  Comment: 0,
  EncryptionEntities: {
    Quantity: 0,
    Items: D.list(
      {
        PublicKeyId: 0,
        ProviderId: 0,
        FieldPatterns: {
          Quantity: 0,
          Items: D.list(0, { item: "FieldPattern" }),
        },
      },
      { item: "EncryptionEntity" },
    ),
  },
});
const i_FunctionConfig: D.LazyStruct = () => ({
  Comment: 0,
  Runtime: 0,
  KeyValueStoreAssociations: {
    Quantity: 0,
    Items: D.list(
      { KeyValueStoreARN: 0 },
      { item: "KeyValueStoreAssociation" },
    ),
  },
});
const i_InvalidationBatch: D.LazyStruct = () => ({
  Paths: { Quantity: 0, Items: D.list(0, { item: "Path" }) },
  CallerReference: 0,
});
const i_IpamCidrConfig: D.LazyStruct = () => ({
  Cidr: 0,
  IpamPoolArn: 0,
  AnycastIp: 0,
  Status: 0,
});
const i_KeyGroupConfig: D.LazyStruct = () => ({
  Name: 0,
  Items: D.list(0, { item: "PublicKey" }),
  Comment: 0,
});
const i_ManagedCertificateRequest: D.LazyStruct = () => ({
  ValidationTokenHost: 0,
  PrimaryDomainName: 0,
  CertificateTransparencyLoggingPreference: 0,
});
const i_OriginAccessControlConfig: D.LazyStruct = () => ({
  Name: 0,
  Description: 0,
  SigningProtocol: 0,
  SigningBehavior: 0,
  OriginAccessControlOriginType: 0,
});
const i_OriginRequestPolicyConfig: D.LazyStruct = () => ({
  Comment: 0,
  Name: 0,
  HeadersConfig: { HeaderBehavior: 0, Headers: i_Headers },
  CookiesConfig: { CookieBehavior: 0, Cookies: i_CookieNames },
  QueryStringsConfig: {
    QueryStringBehavior: 0,
    QueryStrings: i_QueryStringNames,
  },
});
const i_Parameter: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_PublicKeyConfig: D.LazyStruct = () => ({
  CallerReference: 0,
  Name: 0,
  EncodedKey: 0,
  Comment: 0,
});
const i_ResponseHeadersPolicyConfig: D.LazyStruct = () => ({
  Comment: 0,
  Name: 0,
  CorsConfig: {
    AccessControlAllowOrigins: {
      Quantity: 0,
      Items: D.list(0, { item: "Origin" }),
    },
    AccessControlAllowHeaders: {
      Quantity: 0,
      Items: D.list(0, { item: "Header" }),
    },
    AccessControlAllowMethods: {
      Quantity: 0,
      Items: D.list(0, { item: "Method" }),
    },
    AccessControlAllowCredentials: 0,
    AccessControlExposeHeaders: {
      Quantity: 0,
      Items: D.list(0, { item: "Header" }),
    },
    AccessControlMaxAgeSec: 0,
    OriginOverride: 0,
  },
  SecurityHeadersConfig: {
    XSSProtection: { Override: 0, Protection: 0, ModeBlock: 0, ReportUri: 0 },
    FrameOptions: { Override: 0, FrameOption: 0 },
    ReferrerPolicy: { Override: 0, ReferrerPolicy: 0 },
    ContentSecurityPolicy: { Override: 0, ContentSecurityPolicy: 0 },
    ContentTypeOptions: { Override: 0 },
    StrictTransportSecurity: {
      Override: 0,
      IncludeSubdomains: 0,
      Preload: 0,
      AccessControlMaxAgeSec: 0,
    },
  },
  ServerTimingHeadersConfig: { Enabled: 0, SamplingRate: 0 },
  CustomHeadersConfig: {
    Quantity: 0,
    Items: D.list(
      { Header: 0, Value: 0, Override: 0 },
      { item: "ResponseHeadersPolicyCustomHeader" },
    ),
  },
  RemoveHeadersConfig: {
    Quantity: 0,
    Items: D.list({ Header: 0 }, { item: "ResponseHeadersPolicyRemoveHeader" }),
  },
});
const i_StreamingDistributionConfig: D.LazyStruct = () => ({
  CallerReference: 0,
  S3Origin: { DomainName: 0, OriginAccessIdentity: 0 },
  Aliases: i_Aliases,
  Comment: 0,
  Logging: { Enabled: 0, Bucket: 0, Prefix: 0 },
  TrustedSigners: i_TrustedSigners,
  PriceClass: 0,
  Enabled: 0,
});
const i_Tags: D.LazyStruct = () => ({
  Items: D.list({ Key: 0, Value: 0 }, { item: "Tag" }),
});
const i_VpcOriginEndpointConfig: D.LazyStruct = () => ({
  Name: 0,
  Arn: 0,
  HTTPPort: 0,
  HTTPSPort: 0,
  OriginProtocolPolicy: 0,
  OriginSslProtocols: i_OriginSslProtocols,
});
const o_Aliases: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(0, { item: "CNAME" }),
});
const o_AnycastIpList: D.LazyStruct = () => ({
  IpamConfig: o_IpamConfig,
  AnycastIps: D.list(0, { item: "AnycastIp" }),
  IpCount: D.num,
  LastModifiedTime: D.ts,
});
const o_CachePolicy: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
  CachePolicyConfig: o_CachePolicyConfig,
});
const o_CachePolicyConfig: D.LazyStruct = () => ({
  DefaultTTL: D.num,
  MaxTTL: D.num,
  MinTTL: D.num,
  ParametersInCacheKeyAndForwardedToOrigin: {
    EnableAcceptEncodingGzip: D.bool,
    EnableAcceptEncodingBrotli: D.bool,
    HeadersConfig: { Headers: o_Headers },
    CookiesConfig: { Cookies: o_CookieNames },
    QueryStringsConfig: { QueryStrings: o_QueryStringNames },
  },
});
const o_CloudFrontOriginAccessIdentity: D.LazyStruct = () => ({
  CloudFrontOriginAccessIdentityConfig: {},
});
const o_ConnectionFunctionSummary: D.LazyStruct = () => ({
  ConnectionFunctionConfig: o_FunctionConfig,
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
});
const o_ConnectionGroup: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
  Tags: o_Tags,
  Ipv6Enabled: D.bool,
  Enabled: D.bool,
  IsDefault: D.bool,
});
const o_ContentTypeProfileConfig: D.LazyStruct = () => ({
  ForwardWhenContentTypeIsUnknown: D.bool,
  ContentTypeProfiles: {
    Quantity: D.num,
    Items: D.list({}, { item: "ContentTypeProfile" }),
  },
});
const o_ContinuousDeploymentPolicy: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
  ContinuousDeploymentPolicyConfig: o_ContinuousDeploymentPolicyConfig,
});
const o_ContinuousDeploymentPolicyConfig: D.LazyStruct = () => ({
  StagingDistributionDnsNames: {
    Quantity: D.num,
    Items: D.list(0, { item: "DnsName" }),
  },
  Enabled: D.bool,
  TrafficConfig: {
    SingleWeightConfig: {
      Weight: D.num,
      SessionStickinessConfig: { IdleTTL: D.num, MaximumTTL: D.num },
    },
    SingleHeaderConfig: {},
  },
});
const o_Distribution: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
  InProgressInvalidationBatches: D.num,
  ActiveTrustedSigners: o_ActiveTrustedSigners,
  ActiveTrustedKeyGroups: {
    Enabled: D.bool,
    Quantity: D.num,
    Items: D.list({ KeyPairIds: o_KeyPairIds }, { item: "KeyGroup" }),
  },
  DistributionConfig: o_DistributionConfig,
  AliasICPRecordals: D.list({}, { item: "AliasICPRecordal" }),
});
const o_DistributionConfig: D.LazyStruct = () => ({
  Aliases: o_Aliases,
  Origins: o_Origins,
  OriginGroups: o_OriginGroups,
  DefaultCacheBehavior: o_DefaultCacheBehavior,
  CacheBehaviors: o_CacheBehaviors,
  CustomErrorResponses: o_CustomErrorResponses,
  Comment: D.secret,
  Logging: { Enabled: D.bool, IncludeCookies: D.bool },
  Enabled: D.bool,
  ViewerCertificate: o_ViewerCertificate,
  Restrictions: o_Restrictions,
  IsIPV6Enabled: D.bool,
  Staging: D.bool,
  TenantConfig: {
    ParameterDefinitions: D.list({
      Definition: { StringSchema: { Comment: D.secret, Required: D.bool } },
    }),
  },
  ViewerMtlsConfig: o_ViewerMtlsConfig,
  ConnectionFunctionAssociation: {},
  CacheTagConfig: {},
});
const o_DistributionIdList: D.LazyStruct = () => ({
  MaxItems: D.num,
  IsTruncated: D.bool,
  Quantity: D.num,
  Items: D.list(0, { item: "DistributionId" }),
});
const o_DistributionList: D.LazyStruct = () => ({
  MaxItems: D.num,
  IsTruncated: D.bool,
  Quantity: D.num,
  Items: D.list(
    {
      LastModifiedTime: D.ts,
      Aliases: o_Aliases,
      Origins: o_Origins,
      OriginGroups: o_OriginGroups,
      DefaultCacheBehavior: o_DefaultCacheBehavior,
      CacheBehaviors: o_CacheBehaviors,
      CustomErrorResponses: o_CustomErrorResponses,
      Comment: D.secret,
      Enabled: D.bool,
      ViewerCertificate: o_ViewerCertificate,
      Restrictions: o_Restrictions,
      IsIPV6Enabled: D.bool,
      AliasICPRecordals: D.list({}, { item: "AliasICPRecordal" }),
      Staging: D.bool,
      ViewerMtlsConfig: o_ViewerMtlsConfig,
      ConnectionFunctionAssociation: {},
    },
    { item: "DistributionSummary" },
  ),
});
const o_DistributionTenant: D.LazyStruct = () => ({
  Domains: D.list({}),
  Tags: o_Tags,
  Customizations: o_Customizations,
  Parameters: D.list({}),
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
  Enabled: D.bool,
});
const o_DistributionTenantSummary: D.LazyStruct = () => ({
  Domains: D.list({}),
  Customizations: o_Customizations,
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
  Enabled: D.bool,
});
const o_EncryptionEntities: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(
    {
      FieldPatterns: {
        Quantity: D.num,
        Items: D.list(0, { item: "FieldPattern" }),
      },
    },
    { item: "EncryptionEntity" },
  ),
});
const o_FieldLevelEncryption: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
  FieldLevelEncryptionConfig: o_FieldLevelEncryptionConfig,
});
const o_FieldLevelEncryptionConfig: D.LazyStruct = () => ({
  QueryArgProfileConfig: o_QueryArgProfileConfig,
  ContentTypeProfileConfig: o_ContentTypeProfileConfig,
});
const o_FieldLevelEncryptionProfile: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
  FieldLevelEncryptionProfileConfig: o_FieldLevelEncryptionProfileConfig,
});
const o_FieldLevelEncryptionProfileConfig: D.LazyStruct = () => ({
  EncryptionEntities: o_EncryptionEntities,
});
const o_FunctionSummary: D.LazyStruct = () => ({
  FunctionConfig: o_FunctionConfig,
  FunctionMetadata: { CreatedTime: D.ts, LastModifiedTime: D.ts },
});
const o_Invalidation: D.LazyStruct = () => ({
  CreateTime: D.ts,
  InvalidationBatch: {
    Paths: { Quantity: D.num, Items: D.list(0, { item: "Path" }) },
  },
});
const o_InvalidationList: D.LazyStruct = () => ({
  MaxItems: D.num,
  IsTruncated: D.bool,
  Quantity: D.num,
  Items: D.list({ CreateTime: D.ts }, { item: "InvalidationSummary" }),
});
const o_IpamConfig: D.LazyStruct = () => ({
  Quantity: D.num,
  IpamCidrConfigs: D.list({}, { item: "IpamCidrConfig" }),
});
const o_KeyGroup: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
  KeyGroupConfig: o_KeyGroupConfig,
});
const o_KeyGroupConfig: D.LazyStruct = () => ({
  Items: D.list(0, { item: "PublicKey" }),
});
const o_KeyValueStore: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_MonitoringSubscription: D.LazyStruct = () => ({
  RealtimeMetricsSubscriptionConfig: {},
});
const o_OriginAccessControl: D.LazyStruct = () => ({
  OriginAccessControlConfig: {},
});
const o_OriginRequestPolicy: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
  OriginRequestPolicyConfig: o_OriginRequestPolicyConfig,
});
const o_OriginRequestPolicyConfig: D.LazyStruct = () => ({
  HeadersConfig: { Headers: o_Headers },
  CookiesConfig: { Cookies: o_CookieNames },
  QueryStringsConfig: { QueryStrings: o_QueryStringNames },
});
const o_PublicKey: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  PublicKeyConfig: {},
});
const o_QueryArgProfileConfig: D.LazyStruct = () => ({
  ForwardWhenQueryArgProfileIsUnknown: D.bool,
  QueryArgProfiles: {
    Quantity: D.num,
    Items: D.list({}, { item: "QueryArgProfile" }),
  },
});
const o_RealtimeLogConfig: D.LazyStruct = () => ({
  SamplingRate: D.num,
  EndPoints: D.list({ KinesisStreamConfig: {} }),
  Fields: D.list(0, { item: "Field" }),
});
const o_ResponseHeadersPolicy: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
  ResponseHeadersPolicyConfig: o_ResponseHeadersPolicyConfig,
});
const o_ResponseHeadersPolicyConfig: D.LazyStruct = () => ({
  CorsConfig: {
    AccessControlAllowOrigins: {
      Quantity: D.num,
      Items: D.list(0, { item: "Origin" }),
    },
    AccessControlAllowHeaders: {
      Quantity: D.num,
      Items: D.list(0, { item: "Header" }),
    },
    AccessControlAllowMethods: {
      Quantity: D.num,
      Items: D.list(0, { item: "Method" }),
    },
    AccessControlAllowCredentials: D.bool,
    AccessControlExposeHeaders: {
      Quantity: D.num,
      Items: D.list(0, { item: "Header" }),
    },
    AccessControlMaxAgeSec: D.num,
    OriginOverride: D.bool,
  },
  SecurityHeadersConfig: {
    XSSProtection: { Override: D.bool, Protection: D.bool, ModeBlock: D.bool },
    FrameOptions: { Override: D.bool },
    ReferrerPolicy: { Override: D.bool },
    ContentSecurityPolicy: { Override: D.bool },
    ContentTypeOptions: { Override: D.bool },
    StrictTransportSecurity: {
      Override: D.bool,
      IncludeSubdomains: D.bool,
      Preload: D.bool,
      AccessControlMaxAgeSec: D.num,
    },
  },
  ServerTimingHeadersConfig: { Enabled: D.bool, SamplingRate: D.num },
  CustomHeadersConfig: {
    Quantity: D.num,
    Items: D.list(
      { Override: D.bool },
      { item: "ResponseHeadersPolicyCustomHeader" },
    ),
  },
  RemoveHeadersConfig: {
    Quantity: D.num,
    Items: D.list({}, { item: "ResponseHeadersPolicyRemoveHeader" }),
  },
});
const o_StreamingDistribution: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
  ActiveTrustedSigners: o_ActiveTrustedSigners,
  StreamingDistributionConfig: o_StreamingDistributionConfig,
});
const o_StreamingDistributionConfig: D.LazyStruct = () => ({
  S3Origin: {},
  Aliases: o_Aliases,
  Logging: { Enabled: D.bool },
  TrustedSigners: o_TrustedSigners,
  Enabled: D.bool,
});
const o_Tags: D.LazyStruct = () => ({ Items: D.list({}, { item: "Tag" }) });
const o_TrustStore: D.LazyStruct = () => ({
  NumberOfCaCertificates: D.num,
  LastModifiedTime: D.ts,
  UseClientCertificateOCSPEndpoint: D.bool,
});
const o_TrustedSigners: D.LazyStruct = () => ({
  Enabled: D.bool,
  Quantity: D.num,
  Items: D.list(0, { item: "AwsAccountNumber" }),
});
const o_VpcOrigin: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
  VpcOriginEndpointConfig: {
    HTTPPort: D.num,
    HTTPSPort: D.num,
    OriginSslProtocols: o_OriginSslProtocols,
  },
});
const i_Aliases: D.LazyStruct = () => ({
  Quantity: 0,
  Items: D.list(0, { item: "CNAME" }),
});
const i_AllowedMethods: D.LazyStruct = () => ({
  Quantity: 0,
  Items: D.list(0, { item: "Method" }),
  CachedMethods: { Quantity: 0, Items: D.list(0, { item: "Method" }) },
});
const i_CookieNames: D.LazyStruct = () => ({
  Quantity: 0,
  Items: D.list(0, { item: "Name" }),
});
const i_ForwardedValues: D.LazyStruct = () => ({
  QueryString: 0,
  Cookies: { Forward: 0, WhitelistedNames: i_CookieNames },
  Headers: i_Headers,
  QueryStringCacheKeys: { Quantity: 0, Items: D.list(0, { item: "Name" }) },
});
const i_FunctionAssociations: D.LazyStruct = () => ({
  Quantity: 0,
  Items: D.list(
    { FunctionARN: 0, EventType: 0 },
    { item: "FunctionAssociation" },
  ),
});
const i_GrpcConfig: D.LazyStruct = () => ({ Enabled: 0 });
const i_Headers: D.LazyStruct = () => ({
  Quantity: 0,
  Items: D.list(0, { item: "Name" }),
});
const i_LambdaFunctionAssociations: D.LazyStruct = () => ({
  Quantity: 0,
  Items: D.list(
    { LambdaFunctionARN: 0, EventType: 0, IncludeBody: 0 },
    { item: "LambdaFunctionAssociation" },
  ),
});
const i_OriginSslProtocols: D.LazyStruct = () => ({
  Quantity: 0,
  Items: D.list(0, { item: "SslProtocol" }),
});
const i_QueryStringNames: D.LazyStruct = () => ({
  Quantity: 0,
  Items: D.list(0, { item: "Name" }),
});
const i_TrustedKeyGroups: D.LazyStruct = () => ({
  Enabled: 0,
  Quantity: 0,
  Items: D.list(0, { item: "KeyGroup" }),
});
const i_TrustedSigners: D.LazyStruct = () => ({
  Enabled: 0,
  Quantity: 0,
  Items: D.list(0, { item: "AwsAccountNumber" }),
});
const o_ActiveTrustedSigners: D.LazyStruct = () => ({
  Enabled: D.bool,
  Quantity: D.num,
  Items: D.list({ KeyPairIds: o_KeyPairIds }, { item: "Signer" }),
});
const o_CacheBehaviors: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(
    {
      TrustedSigners: o_TrustedSigners,
      TrustedKeyGroups: o_TrustedKeyGroups,
      AllowedMethods: o_AllowedMethods,
      SmoothStreaming: D.bool,
      Compress: D.bool,
      LambdaFunctionAssociations: o_LambdaFunctionAssociations,
      FunctionAssociations: o_FunctionAssociations,
      GrpcConfig: o_GrpcConfig,
      ForwardedValues: o_ForwardedValues,
      MinTTL: D.num,
      DefaultTTL: D.num,
      MaxTTL: D.num,
    },
    { item: "CacheBehavior" },
  ),
});
const o_CookieNames: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(0, { item: "Name" }),
});
const o_CustomErrorResponses: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(
    { ErrorCode: D.num, ErrorCachingMinTTL: D.num },
    { item: "CustomErrorResponse" },
  ),
});
const o_Customizations: D.LazyStruct = () => ({
  WebAcl: {},
  Certificate: {},
  GeoRestrictions: { Locations: D.list(0, { item: "Location" }) },
});
const o_DefaultCacheBehavior: D.LazyStruct = () => ({
  TrustedSigners: o_TrustedSigners,
  TrustedKeyGroups: o_TrustedKeyGroups,
  AllowedMethods: o_AllowedMethods,
  SmoothStreaming: D.bool,
  Compress: D.bool,
  LambdaFunctionAssociations: o_LambdaFunctionAssociations,
  FunctionAssociations: o_FunctionAssociations,
  GrpcConfig: o_GrpcConfig,
  ForwardedValues: o_ForwardedValues,
  MinTTL: D.num,
  DefaultTTL: D.num,
  MaxTTL: D.num,
});
const o_FunctionConfig: D.LazyStruct = () => ({
  KeyValueStoreAssociations: {
    Quantity: D.num,
    Items: D.list({}, { item: "KeyValueStoreAssociation" }),
  },
});
const o_Headers: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(0, { item: "Name" }),
});
const o_KeyPairIds: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(0, { item: "KeyPairId" }),
});
const o_OriginGroups: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(
    {
      FailoverCriteria: {
        StatusCodes: {
          Quantity: D.num,
          Items: D.list(D.num, { item: "StatusCode" }),
        },
      },
      Members: {
        Quantity: D.num,
        Items: D.list({}, { item: "OriginGroupMember" }),
      },
    },
    { item: "OriginGroup" },
  ),
});
const o_OriginSslProtocols: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(0, { item: "SslProtocol" }),
});
const o_Origins: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(
    {
      CustomHeaders: {
        Quantity: D.num,
        Items: D.list(
          { HeaderValue: D.secret },
          { item: "OriginCustomHeader" },
        ),
      },
      S3OriginConfig: { OriginReadTimeout: D.num },
      CustomOriginConfig: {
        HTTPPort: D.num,
        HTTPSPort: D.num,
        OriginSslProtocols: o_OriginSslProtocols,
        OriginReadTimeout: D.num,
        OriginKeepaliveTimeout: D.num,
        OriginMtlsConfig: {},
      },
      VpcOriginConfig: {
        OriginReadTimeout: D.num,
        OriginKeepaliveTimeout: D.num,
      },
      ConnectionAttempts: D.num,
      ConnectionTimeout: D.num,
      ResponseCompletionTimeout: D.num,
      OriginShield: { Enabled: D.bool },
    },
    { item: "Origin" },
  ),
});
const o_QueryStringNames: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(0, { item: "Name" }),
});
const o_Restrictions: D.LazyStruct = () => ({
  GeoRestriction: { Quantity: D.num, Items: D.list(0, { item: "Location" }) },
});
const o_ViewerCertificate: D.LazyStruct = () => ({
  CloudFrontDefaultCertificate: D.bool,
});
const o_ViewerMtlsConfig: D.LazyStruct = () => ({
  TrustStoreConfig: {
    AdvertiseTrustStoreCaNames: D.bool,
    IgnoreCertificateExpiry: D.bool,
  },
});
const o_AllowedMethods: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list(0, { item: "Method" }),
  CachedMethods: { Quantity: D.num, Items: D.list(0, { item: "Method" }) },
});
const o_ForwardedValues: D.LazyStruct = () => ({
  QueryString: D.bool,
  Cookies: { WhitelistedNames: o_CookieNames },
  Headers: o_Headers,
  QueryStringCacheKeys: { Quantity: D.num, Items: D.list(0, { item: "Name" }) },
});
const o_FunctionAssociations: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list({}, { item: "FunctionAssociation" }),
});
const o_GrpcConfig: D.LazyStruct = () => ({ Enabled: D.bool });
const o_LambdaFunctionAssociations: D.LazyStruct = () => ({
  Quantity: D.num,
  Items: D.list({ IncludeBody: D.bool }, { item: "LambdaFunctionAssociation" }),
});
const o_TrustedKeyGroups: D.LazyStruct = () => ({
  Enabled: D.bool,
  Quantity: D.num,
  Items: D.list(0, { item: "KeyGroup" }),
});
