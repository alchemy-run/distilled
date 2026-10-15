import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://cloudfront.amazonaws.com/doc/2020-05-31/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CloudFront",
  serviceShapeName: "Cloudfront2020_05_31",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cloudfront" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-05-31");
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
    const _p2 = (_0: unknown) => ({
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
            return e("https://cloudfront.cn-northwest-1.amazonaws.com.cn", _p1(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://cloudfront-fips.cn-northwest-1.amazonaws.com.cn", _p1(), {});
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cloudfront.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p2(PartitionResult),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
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
  '{"url":"https://cloudfront.{D}","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
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

export class AccessDenied
  extends /*@__PURE__*/ S.TaggedError<AccessDenied>()(
    "AccessDenied",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BatchTooLarge
  extends /*@__PURE__*/ S.TaggedError<BatchTooLarge>()(
    "BatchTooLarge",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class CachePolicyAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<CachePolicyAlreadyExists>()(
    "CachePolicyAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class CachePolicyInUse
  extends /*@__PURE__*/ S.TaggedError<CachePolicyInUse>()(
    "CachePolicyInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class CannotChangeImmutablePublicKeyFields
  extends /*@__PURE__*/ S.TaggedError<CannotChangeImmutablePublicKeyFields>()(
    "CannotChangeImmutablePublicKeyFields",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CannotDeleteEntityWhileInUse
  extends /*@__PURE__*/ S.TaggedError<CannotDeleteEntityWhileInUse>()(
    "CannotDeleteEntityWhileInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class CannotUpdateEntityWhileInUse
  extends /*@__PURE__*/ S.TaggedError<CannotUpdateEntityWhileInUse>()(
    "CannotUpdateEntityWhileInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class CloudFrontOriginAccessIdentityAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<CloudFrontOriginAccessIdentityAlreadyExists>()(
    "CloudFrontOriginAccessIdentityAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class CloudFrontOriginAccessIdentityInUse
  extends /*@__PURE__*/ S.TaggedError<CloudFrontOriginAccessIdentityInUse>()(
    "CloudFrontOriginAccessIdentityInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class CNAMEAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<CNAMEAlreadyExists>()(
    "CNAMEAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ContinuousDeploymentPolicyAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<ContinuousDeploymentPolicyAlreadyExists>()(
    "ContinuousDeploymentPolicyAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ContinuousDeploymentPolicyInUse
  extends /*@__PURE__*/ S.TaggedError<ContinuousDeploymentPolicyInUse>()(
    "ContinuousDeploymentPolicyInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class DistributionAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<DistributionAlreadyExists>()(
    "DistributionAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class DistributionNotDisabled
  extends /*@__PURE__*/ S.TaggedError<DistributionNotDisabled>()(
    "DistributionNotDisabled",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class EntityAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<EntityAlreadyExists>()(
    "EntityAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class EntityLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<EntityLimitExceeded>()(
    "EntityLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class EntityNotFound
  extends /*@__PURE__*/ S.TaggedError<EntityNotFound>()(
    "EntityNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class EntitySizeLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<EntitySizeLimitExceeded>()(
    "EntitySizeLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class FieldLevelEncryptionConfigAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<FieldLevelEncryptionConfigAlreadyExists>()(
    "FieldLevelEncryptionConfigAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class FieldLevelEncryptionConfigInUse
  extends /*@__PURE__*/ S.TaggedError<FieldLevelEncryptionConfigInUse>()(
    "FieldLevelEncryptionConfigInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class FieldLevelEncryptionProfileAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<FieldLevelEncryptionProfileAlreadyExists>()(
    "FieldLevelEncryptionProfileAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class FieldLevelEncryptionProfileInUse
  extends /*@__PURE__*/ S.TaggedError<FieldLevelEncryptionProfileInUse>()(
    "FieldLevelEncryptionProfileInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class FieldLevelEncryptionProfileSizeExceeded
  extends /*@__PURE__*/ S.TaggedError<FieldLevelEncryptionProfileSizeExceeded>()(
    "FieldLevelEncryptionProfileSizeExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class FunctionAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<FunctionAlreadyExists>()(
    "FunctionAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class FunctionInUse
  extends /*@__PURE__*/ S.TaggedError<FunctionInUse>()(
    "FunctionInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class FunctionSizeLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<FunctionSizeLimitExceeded>()(
    "FunctionSizeLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class IllegalDelete
  extends /*@__PURE__*/ S.TaggedError<IllegalDelete>()(
    "IllegalDelete",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior
  extends /*@__PURE__*/ S.TaggedError<IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior>()(
    "IllegalFieldLevelEncryptionConfigAssociationWithCacheBehavior",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class IllegalOriginAccessConfiguration
  extends /*@__PURE__*/ S.TaggedError<IllegalOriginAccessConfiguration>()(
    "IllegalOriginAccessConfiguration",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class IllegalUpdate
  extends /*@__PURE__*/ S.TaggedError<IllegalUpdate>()(
    "IllegalUpdate",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InconsistentQuantities
  extends /*@__PURE__*/ S.TaggedError<InconsistentQuantities>()(
    "InconsistentQuantities",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidArgument
  extends /*@__PURE__*/ S.TaggedError<InvalidArgument>()(
    "InvalidArgument",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidAssociation
  extends /*@__PURE__*/ S.TaggedError<InvalidAssociation>()(
    "InvalidAssociation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidDefaultRootObject
  extends /*@__PURE__*/ S.TaggedError<InvalidDefaultRootObject>()(
    "InvalidDefaultRootObject",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidDomainNameForOriginAccessControl
  extends /*@__PURE__*/ S.TaggedError<InvalidDomainNameForOriginAccessControl>()(
    "InvalidDomainNameForOriginAccessControl",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidErrorCode
  extends /*@__PURE__*/ S.TaggedError<InvalidErrorCode>()(
    "InvalidErrorCode",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidForwardCookies
  extends /*@__PURE__*/ S.TaggedError<InvalidForwardCookies>()(
    "InvalidForwardCookies",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidFunctionAssociation
  extends /*@__PURE__*/ S.TaggedError<InvalidFunctionAssociation>()(
    "InvalidFunctionAssociation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidGeoRestrictionParameter
  extends /*@__PURE__*/ S.TaggedError<InvalidGeoRestrictionParameter>()(
    "InvalidGeoRestrictionParameter",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidHeadersForS3Origin
  extends /*@__PURE__*/ S.TaggedError<InvalidHeadersForS3Origin>()(
    "InvalidHeadersForS3Origin",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidIfMatchVersion
  extends /*@__PURE__*/ S.TaggedError<InvalidIfMatchVersion>()(
    "InvalidIfMatchVersion",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidLambdaFunctionAssociation
  extends /*@__PURE__*/ S.TaggedError<InvalidLambdaFunctionAssociation>()(
    "InvalidLambdaFunctionAssociation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidLocationCode
  extends /*@__PURE__*/ S.TaggedError<InvalidLocationCode>()(
    "InvalidLocationCode",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidMinimumProtocolVersion
  extends /*@__PURE__*/ S.TaggedError<InvalidMinimumProtocolVersion>()(
    "InvalidMinimumProtocolVersion",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidOrigin
  extends /*@__PURE__*/ S.TaggedError<InvalidOrigin>()(
    "InvalidOrigin",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidOriginAccessControl
  extends /*@__PURE__*/ S.TaggedError<InvalidOriginAccessControl>()(
    "InvalidOriginAccessControl",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidOriginAccessIdentity
  extends /*@__PURE__*/ S.TaggedError<InvalidOriginAccessIdentity>()(
    "InvalidOriginAccessIdentity",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidOriginKeepaliveTimeout
  extends /*@__PURE__*/ S.TaggedError<InvalidOriginKeepaliveTimeout>()(
    "InvalidOriginKeepaliveTimeout",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidOriginReadTimeout
  extends /*@__PURE__*/ S.TaggedError<InvalidOriginReadTimeout>()(
    "InvalidOriginReadTimeout",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidProtocolSettings
  extends /*@__PURE__*/ S.TaggedError<InvalidProtocolSettings>()(
    "InvalidProtocolSettings",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidQueryStringParameters
  extends /*@__PURE__*/ S.TaggedError<InvalidQueryStringParameters>()(
    "InvalidQueryStringParameters",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRelativePath
  extends /*@__PURE__*/ S.TaggedError<InvalidRelativePath>()(
    "InvalidRelativePath",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequiredProtocol
  extends /*@__PURE__*/ S.TaggedError<InvalidRequiredProtocol>()(
    "InvalidRequiredProtocol",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidResponseCode
  extends /*@__PURE__*/ S.TaggedError<InvalidResponseCode>()(
    "InvalidResponseCode",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidTagging
  extends /*@__PURE__*/ S.TaggedError<InvalidTagging>()(
    "InvalidTagging",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidTTLOrder
  extends /*@__PURE__*/ S.TaggedError<InvalidTTLOrder>()(
    "InvalidTTLOrder",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidViewerCertificate
  extends /*@__PURE__*/ S.TaggedError<InvalidViewerCertificate>()(
    "InvalidViewerCertificate",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidWebACLId
  extends /*@__PURE__*/ S.TaggedError<InvalidWebACLId>()(
    "InvalidWebACLId",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class KeyGroupAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<KeyGroupAlreadyExists>()(
    "KeyGroupAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class MissingBody
  extends /*@__PURE__*/ S.TaggedError<MissingBody>()(
    "MissingBody",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MonitoringSubscriptionAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<MonitoringSubscriptionAlreadyExists>()(
    "MonitoringSubscriptionAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class NoSuchCachePolicy
  extends /*@__PURE__*/ S.TaggedError<NoSuchCachePolicy>()(
    "NoSuchCachePolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchCloudFrontOriginAccessIdentity
  extends /*@__PURE__*/ S.TaggedError<NoSuchCloudFrontOriginAccessIdentity>()(
    "NoSuchCloudFrontOriginAccessIdentity",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchContinuousDeploymentPolicy
  extends /*@__PURE__*/ S.TaggedError<NoSuchContinuousDeploymentPolicy>()(
    "NoSuchContinuousDeploymentPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchDistribution
  extends /*@__PURE__*/ S.TaggedError<NoSuchDistribution>()(
    "NoSuchDistribution",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchFieldLevelEncryptionConfig
  extends /*@__PURE__*/ S.TaggedError<NoSuchFieldLevelEncryptionConfig>()(
    "NoSuchFieldLevelEncryptionConfig",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchFieldLevelEncryptionProfile
  extends /*@__PURE__*/ S.TaggedError<NoSuchFieldLevelEncryptionProfile>()(
    "NoSuchFieldLevelEncryptionProfile",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchFunctionExists
  extends /*@__PURE__*/ S.TaggedError<NoSuchFunctionExists>()(
    "NoSuchFunctionExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchInvalidation
  extends /*@__PURE__*/ S.TaggedError<NoSuchInvalidation>()(
    "NoSuchInvalidation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchMonitoringSubscription
  extends /*@__PURE__*/ S.TaggedError<NoSuchMonitoringSubscription>()(
    "NoSuchMonitoringSubscription",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchOrigin
  extends /*@__PURE__*/ S.TaggedError<NoSuchOrigin>()(
    "NoSuchOrigin",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchOriginAccessControl
  extends /*@__PURE__*/ S.TaggedError<NoSuchOriginAccessControl>()(
    "NoSuchOriginAccessControl",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchOriginRequestPolicy
  extends /*@__PURE__*/ S.TaggedError<NoSuchOriginRequestPolicy>()(
    "NoSuchOriginRequestPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchPublicKey
  extends /*@__PURE__*/ S.TaggedError<NoSuchPublicKey>()(
    "NoSuchPublicKey",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchRealtimeLogConfig
  extends /*@__PURE__*/ S.TaggedError<NoSuchRealtimeLogConfig>()(
    "NoSuchRealtimeLogConfig",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchResource
  extends /*@__PURE__*/ S.TaggedError<NoSuchResource>()(
    "NoSuchResource",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchResponseHeadersPolicy
  extends /*@__PURE__*/ S.TaggedError<NoSuchResponseHeadersPolicy>()(
    "NoSuchResponseHeadersPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchStreamingDistribution
  extends /*@__PURE__*/ S.TaggedError<NoSuchStreamingDistribution>()(
    "NoSuchStreamingDistribution",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class OriginAccessControlAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<OriginAccessControlAlreadyExists>()(
    "OriginAccessControlAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class OriginAccessControlInUse
  extends /*@__PURE__*/ S.TaggedError<OriginAccessControlInUse>()(
    "OriginAccessControlInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class OriginRequestPolicyAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<OriginRequestPolicyAlreadyExists>()(
    "OriginRequestPolicyAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class OriginRequestPolicyInUse
  extends /*@__PURE__*/ S.TaggedError<OriginRequestPolicyInUse>()(
    "OriginRequestPolicyInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class PreconditionFailed
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailed>()(
    "PreconditionFailed",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(412),
  ) {}
export class PublicKeyAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<PublicKeyAlreadyExists>()(
    "PublicKeyAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class PublicKeyInUse
  extends /*@__PURE__*/ S.TaggedError<PublicKeyInUse>()(
    "PublicKeyInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class QueryArgProfileEmpty
  extends /*@__PURE__*/ S.TaggedError<QueryArgProfileEmpty>()(
    "QueryArgProfileEmpty",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RealtimeLogConfigAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<RealtimeLogConfigAlreadyExists>()(
    "RealtimeLogConfigAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class RealtimeLogConfigInUse
  extends /*@__PURE__*/ S.TaggedError<RealtimeLogConfigInUse>()(
    "RealtimeLogConfigInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class RealtimeLogConfigOwnerMismatch
  extends /*@__PURE__*/ S.TaggedError<RealtimeLogConfigOwnerMismatch>()(
    "RealtimeLogConfigOwnerMismatch",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ResourceInUse
  extends /*@__PURE__*/ S.TaggedError<ResourceInUse>()(
    "ResourceInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class ResourceNotDisabled
  extends /*@__PURE__*/ S.TaggedError<ResourceNotDisabled>()(
    "ResourceNotDisabled",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResponseHeadersPolicyAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<ResponseHeadersPolicyAlreadyExists>()(
    "ResponseHeadersPolicyAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResponseHeadersPolicyInUse
  extends /*@__PURE__*/ S.TaggedError<ResponseHeadersPolicyInUse>()(
    "ResponseHeadersPolicyInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class StagingDistributionInUse
  extends /*@__PURE__*/ S.TaggedError<StagingDistributionInUse>()(
    "StagingDistributionInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class StreamingDistributionAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<StreamingDistributionAlreadyExists>()(
    "StreamingDistributionAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class StreamingDistributionNotDisabled
  extends /*@__PURE__*/ S.TaggedError<StreamingDistributionNotDisabled>()(
    "StreamingDistributionNotDisabled",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class TestFunctionFailed
  extends /*@__PURE__*/ S.TaggedError<TestFunctionFailed>()(
    "TestFunctionFailed",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class TooLongCSPInResponseHeadersPolicy
  extends /*@__PURE__*/ S.TaggedError<TooLongCSPInResponseHeadersPolicy>()(
    "TooLongCSPInResponseHeadersPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyCacheBehaviors
  extends /*@__PURE__*/ S.TaggedError<TooManyCacheBehaviors>()(
    "TooManyCacheBehaviors",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyCachePolicies
  extends /*@__PURE__*/ S.TaggedError<TooManyCachePolicies>()(
    "TooManyCachePolicies",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyCertificates
  extends /*@__PURE__*/ S.TaggedError<TooManyCertificates>()(
    "TooManyCertificates",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyCloudFrontOriginAccessIdentities
  extends /*@__PURE__*/ S.TaggedError<TooManyCloudFrontOriginAccessIdentities>()(
    "TooManyCloudFrontOriginAccessIdentities",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyContinuousDeploymentPolicies
  extends /*@__PURE__*/ S.TaggedError<TooManyContinuousDeploymentPolicies>()(
    "TooManyContinuousDeploymentPolicies",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyCookieNamesInWhiteList
  extends /*@__PURE__*/ S.TaggedError<TooManyCookieNamesInWhiteList>()(
    "TooManyCookieNamesInWhiteList",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyCookiesInCachePolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyCookiesInCachePolicy>()(
    "TooManyCookiesInCachePolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyCookiesInOriginRequestPolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyCookiesInOriginRequestPolicy>()(
    "TooManyCookiesInOriginRequestPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyCustomHeadersInResponseHeadersPolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyCustomHeadersInResponseHeadersPolicy>()(
    "TooManyCustomHeadersInResponseHeadersPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyDistributionCNAMEs
  extends /*@__PURE__*/ S.TaggedError<TooManyDistributionCNAMEs>()(
    "TooManyDistributionCNAMEs",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyDistributions
  extends /*@__PURE__*/ S.TaggedError<TooManyDistributions>()(
    "TooManyDistributions",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyDistributionsAssociatedToCachePolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyDistributionsAssociatedToCachePolicy>()(
    "TooManyDistributionsAssociatedToCachePolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyDistributionsAssociatedToFieldLevelEncryptionConfig
  extends /*@__PURE__*/ S.TaggedError<TooManyDistributionsAssociatedToFieldLevelEncryptionConfig>()(
    "TooManyDistributionsAssociatedToFieldLevelEncryptionConfig",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyDistributionsAssociatedToKeyGroup
  extends /*@__PURE__*/ S.TaggedError<TooManyDistributionsAssociatedToKeyGroup>()(
    "TooManyDistributionsAssociatedToKeyGroup",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyDistributionsAssociatedToOriginAccessControl
  extends /*@__PURE__*/ S.TaggedError<TooManyDistributionsAssociatedToOriginAccessControl>()(
    "TooManyDistributionsAssociatedToOriginAccessControl",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyDistributionsAssociatedToOriginRequestPolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyDistributionsAssociatedToOriginRequestPolicy>()(
    "TooManyDistributionsAssociatedToOriginRequestPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyDistributionsAssociatedToResponseHeadersPolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyDistributionsAssociatedToResponseHeadersPolicy>()(
    "TooManyDistributionsAssociatedToResponseHeadersPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyDistributionsWithFunctionAssociations
  extends /*@__PURE__*/ S.TaggedError<TooManyDistributionsWithFunctionAssociations>()(
    "TooManyDistributionsWithFunctionAssociations",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyDistributionsWithLambdaAssociations
  extends /*@__PURE__*/ S.TaggedError<TooManyDistributionsWithLambdaAssociations>()(
    "TooManyDistributionsWithLambdaAssociations",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyDistributionsWithSingleFunctionARN
  extends /*@__PURE__*/ S.TaggedError<TooManyDistributionsWithSingleFunctionARN>()(
    "TooManyDistributionsWithSingleFunctionARN",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyFieldLevelEncryptionConfigs
  extends /*@__PURE__*/ S.TaggedError<TooManyFieldLevelEncryptionConfigs>()(
    "TooManyFieldLevelEncryptionConfigs",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyFieldLevelEncryptionContentTypeProfiles
  extends /*@__PURE__*/ S.TaggedError<TooManyFieldLevelEncryptionContentTypeProfiles>()(
    "TooManyFieldLevelEncryptionContentTypeProfiles",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyFieldLevelEncryptionEncryptionEntities
  extends /*@__PURE__*/ S.TaggedError<TooManyFieldLevelEncryptionEncryptionEntities>()(
    "TooManyFieldLevelEncryptionEncryptionEntities",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyFieldLevelEncryptionFieldPatterns
  extends /*@__PURE__*/ S.TaggedError<TooManyFieldLevelEncryptionFieldPatterns>()(
    "TooManyFieldLevelEncryptionFieldPatterns",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyFieldLevelEncryptionProfiles
  extends /*@__PURE__*/ S.TaggedError<TooManyFieldLevelEncryptionProfiles>()(
    "TooManyFieldLevelEncryptionProfiles",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyFieldLevelEncryptionQueryArgProfiles
  extends /*@__PURE__*/ S.TaggedError<TooManyFieldLevelEncryptionQueryArgProfiles>()(
    "TooManyFieldLevelEncryptionQueryArgProfiles",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyFunctionAssociations
  extends /*@__PURE__*/ S.TaggedError<TooManyFunctionAssociations>()(
    "TooManyFunctionAssociations",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyFunctions
  extends /*@__PURE__*/ S.TaggedError<TooManyFunctions>()(
    "TooManyFunctions",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyHeadersInCachePolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyHeadersInCachePolicy>()(
    "TooManyHeadersInCachePolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyHeadersInForwardedValues
  extends /*@__PURE__*/ S.TaggedError<TooManyHeadersInForwardedValues>()(
    "TooManyHeadersInForwardedValues",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyHeadersInOriginRequestPolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyHeadersInOriginRequestPolicy>()(
    "TooManyHeadersInOriginRequestPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyInvalidationsInProgress
  extends /*@__PURE__*/ S.TaggedError<TooManyInvalidationsInProgress>()(
    "TooManyInvalidationsInProgress",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyKeyGroups
  extends /*@__PURE__*/ S.TaggedError<TooManyKeyGroups>()(
    "TooManyKeyGroups",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyKeyGroupsAssociatedToDistribution
  extends /*@__PURE__*/ S.TaggedError<TooManyKeyGroupsAssociatedToDistribution>()(
    "TooManyKeyGroupsAssociatedToDistribution",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyLambdaFunctionAssociations
  extends /*@__PURE__*/ S.TaggedError<TooManyLambdaFunctionAssociations>()(
    "TooManyLambdaFunctionAssociations",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyOriginAccessControls
  extends /*@__PURE__*/ S.TaggedError<TooManyOriginAccessControls>()(
    "TooManyOriginAccessControls",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyOriginCustomHeaders
  extends /*@__PURE__*/ S.TaggedError<TooManyOriginCustomHeaders>()(
    "TooManyOriginCustomHeaders",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyOriginGroupsPerDistribution
  extends /*@__PURE__*/ S.TaggedError<TooManyOriginGroupsPerDistribution>()(
    "TooManyOriginGroupsPerDistribution",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyOriginRequestPolicies
  extends /*@__PURE__*/ S.TaggedError<TooManyOriginRequestPolicies>()(
    "TooManyOriginRequestPolicies",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyOrigins
  extends /*@__PURE__*/ S.TaggedError<TooManyOrigins>()(
    "TooManyOrigins",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyPublicKeys
  extends /*@__PURE__*/ S.TaggedError<TooManyPublicKeys>()(
    "TooManyPublicKeys",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyPublicKeysInKeyGroup
  extends /*@__PURE__*/ S.TaggedError<TooManyPublicKeysInKeyGroup>()(
    "TooManyPublicKeysInKeyGroup",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyQueryStringParameters
  extends /*@__PURE__*/ S.TaggedError<TooManyQueryStringParameters>()(
    "TooManyQueryStringParameters",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyQueryStringsInCachePolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyQueryStringsInCachePolicy>()(
    "TooManyQueryStringsInCachePolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyQueryStringsInOriginRequestPolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyQueryStringsInOriginRequestPolicy>()(
    "TooManyQueryStringsInOriginRequestPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyRealtimeLogConfigs
  extends /*@__PURE__*/ S.TaggedError<TooManyRealtimeLogConfigs>()(
    "TooManyRealtimeLogConfigs",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyRemoveHeadersInResponseHeadersPolicy
  extends /*@__PURE__*/ S.TaggedError<TooManyRemoveHeadersInResponseHeadersPolicy>()(
    "TooManyRemoveHeadersInResponseHeadersPolicy",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyResponseHeadersPolicies
  extends /*@__PURE__*/ S.TaggedError<TooManyResponseHeadersPolicies>()(
    "TooManyResponseHeadersPolicies",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyStreamingDistributionCNAMEs
  extends /*@__PURE__*/ S.TaggedError<TooManyStreamingDistributionCNAMEs>()(
    "TooManyStreamingDistributionCNAMEs",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyStreamingDistributions
  extends /*@__PURE__*/ S.TaggedError<TooManyStreamingDistributions>()(
    "TooManyStreamingDistributions",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyTrustedSigners
  extends /*@__PURE__*/ S.TaggedError<TooManyTrustedSigners>()(
    "TooManyTrustedSigners",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TrustedKeyGroupDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<TrustedKeyGroupDoesNotExist>()(
    "TrustedKeyGroupDoesNotExist",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TrustedSignerDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<TrustedSignerDoesNotExist>()(
    "TrustedSignerDoesNotExist",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperation
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperation>()(
    "UnsupportedOperation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type OriginProtocolPolicy = "http-only" | "match-viewer" | "https-only" | (string & {});
export type SslProtocol = "SSLv3" | "TLSv1" | "TLSv1.1" | "TLSv1.2" | (string & {});
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
export type OriginGroupSelectionCriteria = "default" | "media-quality-based" | (string & {});
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
export type ViewerProtocolPolicy = "allow-all" | "https-only" | "redirect-to-https" | (string & {});
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
export type GeoRestrictionType = "blacklist" | "whitelist" | "none" | (string & {});
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
export type ViewerMtlsMode = "required" | "optional" | "passthrough" | (string & {});
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
export type ICPRecordalStatus = "APPROVED" | "SUSPENDED" | "PENDING" | (string & {});
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
export type CachePolicyCookieBehavior = "none" | "whitelist" | "allExcept" | "all" | (string & {});
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
export type FunctionRuntime = "cloudfront-js-1.0" | "cloudfront-js-2.0" | (string & {});
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
export type ContinuousDeploymentPolicyType = "SingleWeight" | "SingleHeader" | (string & {});
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
export type CertificateTransparencyLoggingPreference = "enabled" | "disabled" | (string & {});
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
export type RealtimeMetricsSubscriptionStatus = "Enabled" | "Disabled" | (string & {});
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
export type OriginAccessControlSigningProtocols = "sigv4" | "sigv4a" | (string & {});
export type OriginAccessControlSigningBehaviors =
  | "never"
  | "always"
  | "no-override"
  | "always-amz-auth"
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
export type AccessControlAllowMethodsList = ResponseHeadersPolicyAccessControlAllowMethodsValues[];
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
export type ResponseHeadersPolicyCustomHeaderList = ResponseHeadersPolicyCustomHeader[];
export interface ResponseHeadersPolicyCustomHeadersConfig {
  Quantity: number;
  Items?: ResponseHeadersPolicyCustomHeader[];
}
export interface ResponseHeadersPolicyRemoveHeader {
  Header: string;
}
export type ResponseHeadersPolicyRemoveHeaderList = ResponseHeadersPolicyRemoveHeader[];
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
export type CloudFrontOriginAccessIdentitySummaryList = CloudFrontOriginAccessIdentitySummary[];
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
export type ContinuousDeploymentPolicySummaryList = ContinuousDeploymentPolicySummary[];
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
export type DistributionResourceType = "distribution" | "distribution-tenant" | (string & {});
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
export type FieldLevelEncryptionProfileSummaryList = FieldLevelEncryptionProfileSummary[];
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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateAliasRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<AssociateAliasResponse>,
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
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<AssociateDistributionTenantWebACLRequest>,
  output: __S(33, __c1, 1) as any as S.Schema<AssociateDistributionTenantWebACLResult>,
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
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<AssociateDistributionWebACLRequest>,
  output: __S(65, __c2, 1) as any as S.Schema<AssociateDistributionWebACLResult>,
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
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<CopyDistributionRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<CopyDistributionResult>,
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
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<CreateAnycastIpListRequest>,
  output: __S(449, __c14, 1) as any as S.Schema<CreateAnycastIpListResult>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<CreateCachePolicyRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<CreateCachePolicyResult>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<CreateCloudFrontOriginAccessIdentityRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<CreateCloudFrontOriginAccessIdentityResult>,
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
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<CreateConnectionFunctionRequest>,
  output: __S(801, __c25, 1) as any as S.Schema<CreateConnectionFunctionResult>,
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
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<CreateConnectionGroupRequest>,
  output: __S(897, __c28, 1) as any as S.Schema<CreateConnectionGroupResult>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<CreateContinuousDeploymentPolicyRequest>,
  output: __S(961, __c30, 1) as any as S.Schema<CreateContinuousDeploymentPolicyResult>,
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
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<CreateDistributionRequest>,
  output: __S(1057, __c33, 1) as any as S.Schema<CreateDistributionResult>,
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
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<CreateDistributionTenantRequest>,
  output: __S(1089, __c34, 1) as any as S.Schema<CreateDistributionTenantResult>,
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
}));

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
  input: __S(1217, __c38, 1) as any as S.Schema<CreateDistributionWithTagsRequest>,
  output: __S(1218, __c38, 2) as any as S.Schema<CreateDistributionWithTagsResult>,
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
}));

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
  input: __S(1248, __c39, 0) as any as S.Schema<CreateFieldLevelEncryptionConfigRequest>,
  output: __S(1249, __c39, 1) as any as S.Schema<CreateFieldLevelEncryptionConfigResult>,
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
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<CreateFieldLevelEncryptionProfileRequest>,
  output: __S(1377, __c43, 1) as any as S.Schema<CreateFieldLevelEncryptionProfileResult>,
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
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<CreateFunctionRequest>,
  output: __S(1505, __c47, 1) as any as S.Schema<CreateFunctionResult>,
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
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<CreateInvalidationRequest>,
  output: __S(1569, __c49, 1) as any as S.Schema<CreateInvalidationResult>,
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
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<CreateInvalidationForDistributionTenantRequest>,
  output: __S(1633, __c51, 1) as any as S.Schema<CreateInvalidationForDistributionTenantResult>,
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
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<CreateKeyGroupRequest>,
  output: __S(1665, __c52, 1) as any as S.Schema<CreateKeyGroupResult>,
  errors: [InvalidArgument, KeyGroupAlreadyExists, TooManyKeyGroups, TooManyPublicKeysInKeyGroup],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKeyGroup",
}));

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
  input: __S(1761, __c55, 1) as any as S.Schema<CreateKeyValueStoreRequest>,
  output: __S(1762, __c55, 2) as any as S.Schema<CreateKeyValueStoreResult>,
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
}));

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
  input: __S(1824, __c57, 0) as any as S.Schema<CreateMonitoringSubscriptionRequest>,
  output: __S(1825, __c57, 1) as any as S.Schema<CreateMonitoringSubscriptionResult>,
  errors: [
    AccessDenied,
    MonitoringSubscriptionAlreadyExists,
    NoSuchDistribution,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMonitoringSubscription",
}));

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
  input: __S(1888, __c59, 0) as any as S.Schema<CreateOriginAccessControlRequest>,
  output: __S(1889, __c59, 1) as any as S.Schema<CreateOriginAccessControlResult>,
  errors: [InvalidArgument, OriginAccessControlAlreadyExists, TooManyOriginAccessControls],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOriginAccessControl",
}));

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
  input: __S(1984, __c62, 0) as any as S.Schema<CreateOriginRequestPolicyRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<CreateOriginRequestPolicyResult>,
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
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<CreatePublicKeyRequest>,
  output: __S(2081, __c65, 1) as any as S.Schema<CreatePublicKeyResult>,
  errors: [InvalidArgument, PublicKeyAlreadyExists, TooManyPublicKeys],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePublicKey",
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<CreateRealtimeLogConfigRequest>,
  output: __S(2177, __c68, 1) as any as S.Schema<CreateRealtimeLogConfigResult>,
  errors: [
    AccessDenied,
    InvalidArgument,
    RealtimeLogConfigAlreadyExists,
    TooManyRealtimeLogConfigs,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRealtimeLogConfig",
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<CreateResponseHeadersPolicyRequest>,
  output: __S(2241, __c70, 1) as any as S.Schema<CreateResponseHeadersPolicyResult>,
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
}));

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
  input: __S(2336, __c73, 0) as any as S.Schema<CreateStreamingDistributionRequest>,
  output: __S(2337, __c73, 1) as any as S.Schema<CreateStreamingDistributionResult>,
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
}));

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
  input: __S(2465, __c77, 1) as any as S.Schema<CreateStreamingDistributionWithTagsRequest>,
  output: __S(2466, __c77, 2) as any as S.Schema<CreateStreamingDistributionWithTagsResult>,
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
}));

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
  input: __S(2496, __c78, 0) as any as S.Schema<CreateTrustStoreRequest>,
  output: __S(2497, __c78, 1) as any as S.Schema<CreateTrustStoreResult>,
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
}));

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
  input: __S(2592, __c81, 0) as any as S.Schema<CreateVpcOriginRequest>,
  output: __S(2593, __c81, 1) as any as S.Schema<CreateVpcOriginResult>,
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
}));

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
  input: __S(2656, __c83, 0) as any as S.Schema<DeleteAnycastIpListRequest>,
  output: __S(2657, __c83, 1) as any as S.Schema<DeleteAnycastIpListResponse>,
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
}));

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
  input: __S(2688, __c84, 0) as any as S.Schema<DeleteCachePolicyRequest>,
  output: __S(2689, __c84, 1) as any as S.Schema<DeleteCachePolicyResponse>,
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
}));

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
  input: __S(2720, __c85, 0) as any as S.Schema<DeleteCloudFrontOriginAccessIdentityRequest>,
  output: __S(2721, __c85, 1) as any as S.Schema<DeleteCloudFrontOriginAccessIdentityResponse>,
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
}));

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
  input: __S(2752, __c86, 0) as any as S.Schema<DeleteConnectionFunctionRequest>,
  output: __S(2753, __c86, 1) as any as S.Schema<DeleteConnectionFunctionResponse>,
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
}));

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
  input: __S(2784, __c87, 0) as any as S.Schema<DeleteConnectionGroupRequest>,
  output: __S(2785, __c87, 1) as any as S.Schema<DeleteConnectionGroupResponse>,
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
}));

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
  input: __S(2816, __c88, 0) as any as S.Schema<DeleteContinuousDeploymentPolicyRequest>,
  output: __S(2817, __c88, 1) as any as S.Schema<DeleteContinuousDeploymentPolicyResponse>,
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
}));

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
  input: __S(2848, __c89, 0) as any as S.Schema<DeleteDistributionRequest>,
  output: __S(2849, __c89, 1) as any as S.Schema<DeleteDistributionResponse>,
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
}));

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
  input: __S(2880, __c90, 0) as any as S.Schema<DeleteDistributionTenantRequest>,
  output: __S(2881, __c90, 1) as any as S.Schema<DeleteDistributionTenantResponse>,
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
}));

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
  input: __S(2912, __c91, 0) as any as S.Schema<DeleteFieldLevelEncryptionConfigRequest>,
  output: __S(2913, __c91, 1) as any as S.Schema<DeleteFieldLevelEncryptionConfigResponse>,
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
}));

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
  input: __S(2944, __c92, 0) as any as S.Schema<DeleteFieldLevelEncryptionProfileRequest>,
  output: __S(2945, __c92, 1) as any as S.Schema<DeleteFieldLevelEncryptionProfileResponse>,
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
}));

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
  input: __S(2976, __c93, 0) as any as S.Schema<DeleteFunctionRequest>,
  output: __S(2977, __c93, 1) as any as S.Schema<DeleteFunctionResponse>,
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
}));

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
  input: __S(3008, __c94, 0) as any as S.Schema<DeleteKeyGroupRequest>,
  output: __S(3009, __c94, 1) as any as S.Schema<DeleteKeyGroupResponse>,
  errors: [InvalidIfMatchVersion, NoSuchResource, PreconditionFailed, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKeyGroup",
}));

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
  input: __S(3040, __c95, 0) as any as S.Schema<DeleteKeyValueStoreRequest>,
  output: __S(3041, __c95, 1) as any as S.Schema<DeleteKeyValueStoreResponse>,
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
}));

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
  input: __S(3072, __c96, 0) as any as S.Schema<DeleteMonitoringSubscriptionRequest>,
  output: __S(3073, __c96, 1) as any as S.Schema<DeleteMonitoringSubscriptionResult>,
  errors: [AccessDenied, NoSuchDistribution, NoSuchMonitoringSubscription, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMonitoringSubscription",
}));

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
  input: __S(3104, __c97, 0) as any as S.Schema<DeleteOriginAccessControlRequest>,
  output: __S(3105, __c97, 1) as any as S.Schema<DeleteOriginAccessControlResponse>,
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
}));

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
  input: __S(3136, __c98, 0) as any as S.Schema<DeleteOriginRequestPolicyRequest>,
  output: __S(3137, __c98, 1) as any as S.Schema<DeleteOriginRequestPolicyResponse>,
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
}));

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
  input: __S(3168, __c99, 0) as any as S.Schema<DeletePublicKeyRequest>,
  output: __S(3169, __c99, 1) as any as S.Schema<DeletePublicKeyResponse>,
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
}));

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
  input: __S(3200, __c100, 0) as any as S.Schema<DeleteRealtimeLogConfigRequest>,
  output: __S(3201, __c100, 1) as any as S.Schema<DeleteRealtimeLogConfigResponse>,
  errors: [AccessDenied, InvalidArgument, NoSuchRealtimeLogConfig, RealtimeLogConfigInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRealtimeLogConfig",
}));

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
  input: __S(3232, __c101, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(3233, __c101, 1) as any as S.Schema<DeleteResourcePolicyResponse>,
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
}));

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
  input: __S(3264, __c102, 0) as any as S.Schema<DeleteResponseHeadersPolicyRequest>,
  output: __S(3265, __c102, 1) as any as S.Schema<DeleteResponseHeadersPolicyResponse>,
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
}));

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
  input: __S(3296, __c103, 0) as any as S.Schema<DeleteStreamingDistributionRequest>,
  output: __S(3297, __c103, 1) as any as S.Schema<DeleteStreamingDistributionResponse>,
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
}));

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
  input: __S(3328, __c104, 0) as any as S.Schema<DeleteTrustStoreRequest>,
  output: __S(3329, __c104, 1) as any as S.Schema<DeleteTrustStoreResponse>,
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
}));

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
  input: __S(3360, __c105, 0) as any as S.Schema<DeleteVpcOriginRequest>,
  output: __S(3361, __c105, 1) as any as S.Schema<DeleteVpcOriginResult>,
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
}));

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
  input: __S(3392, __c106, 0) as any as S.Schema<DescribeConnectionFunctionRequest>,
  output: __S(3393, __c106, 1) as any as S.Schema<DescribeConnectionFunctionResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionFunction",
}));

export type DescribeFunctionError = NoSuchFunctionExists | UnsupportedOperation | CommonErrors;
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
  input: __S(3424, __c107, 0) as any as S.Schema<DescribeFunctionRequest>,
  output: __S(3425, __c107, 1) as any as S.Schema<DescribeFunctionResult>,
  errors: [NoSuchFunctionExists, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFunction",
}));

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
  input: __S(3456, __c108, 0) as any as S.Schema<DescribeKeyValueStoreRequest>,
  output: __S(3457, __c108, 1) as any as S.Schema<DescribeKeyValueStoreResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKeyValueStore",
}));

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
  input: __S(3488, __c109, 0) as any as S.Schema<DisassociateDistributionTenantWebACLRequest>,
  output: __S(3489, __c109, 1) as any as S.Schema<DisassociateDistributionTenantWebACLResult>,
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
}));

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
  input: __S(3520, __c110, 0) as any as S.Schema<DisassociateDistributionWebACLRequest>,
  output: __S(3521, __c110, 1) as any as S.Schema<DisassociateDistributionWebACLResult>,
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
}));

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
  input: __S(3552, __c111, 0) as any as S.Schema<GetAnycastIpListRequest>,
  output: __S(3553, __c111, 1) as any as S.Schema<GetAnycastIpListResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnycastIpList",
}));

export type GetCachePolicyError = AccessDenied | NoSuchCachePolicy | CommonErrors;
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
  input: __S(3584, __c112, 0) as any as S.Schema<GetCachePolicyRequest>,
  output: __S(3585, __c112, 1) as any as S.Schema<GetCachePolicyResult>,
  errors: [AccessDenied, NoSuchCachePolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCachePolicy",
}));

export type GetCachePolicyConfigError = AccessDenied | NoSuchCachePolicy | CommonErrors;
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
  input: __S(3616, __c113, 0) as any as S.Schema<GetCachePolicyConfigRequest>,
  output: __S(3617, __c113, 1) as any as S.Schema<GetCachePolicyConfigResult>,
  errors: [AccessDenied, NoSuchCachePolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCachePolicyConfig",
}));

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
  input: __S(3648, __c114, 0) as any as S.Schema<GetCloudFrontOriginAccessIdentityRequest>,
  output: __S(3649, __c114, 1) as any as S.Schema<GetCloudFrontOriginAccessIdentityResult>,
  errors: [AccessDenied, NoSuchCloudFrontOriginAccessIdentity],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudFrontOriginAccessIdentity",
}));

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
  input: __S(3680, __c115, 0) as any as S.Schema<GetCloudFrontOriginAccessIdentityConfigRequest>,
  output: __S(3681, __c115, 1) as any as S.Schema<GetCloudFrontOriginAccessIdentityConfigResult>,
  errors: [AccessDenied, NoSuchCloudFrontOriginAccessIdentity],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudFrontOriginAccessIdentityConfig",
}));

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
  input: __S(3712, __c116, 0) as any as S.Schema<GetConnectionFunctionRequest>,
  output: __S(3713, __c116, 1) as any as S.Schema<GetConnectionFunctionResult>,
  errors: [AccessDenied, EntityNotFound, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionFunction",
}));

export type GetConnectionGroupError = AccessDenied | EntityNotFound | CommonErrors;
/**
 * Gets information about a connection group.
 */
export const getConnectionGroup: API.OperationMethod<
  GetConnectionGroupRequest,
  GetConnectionGroupResult,
  GetConnectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3744, __c117, 0) as any as S.Schema<GetConnectionGroupRequest>,
  output: __S(3745, __c117, 1) as any as S.Schema<GetConnectionGroupResult>,
  errors: [AccessDenied, EntityNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionGroup",
}));

export type GetConnectionGroupByRoutingEndpointError = AccessDenied | EntityNotFound | CommonErrors;
/**
 * Gets information about a connection group by using the endpoint that you specify.
 */
export const getConnectionGroupByRoutingEndpoint: API.OperationMethod<
  GetConnectionGroupByRoutingEndpointRequest,
  GetConnectionGroupByRoutingEndpointResult,
  GetConnectionGroupByRoutingEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3776, __c118, 0) as any as S.Schema<GetConnectionGroupByRoutingEndpointRequest>,
  output: __S(3777, __c118, 1) as any as S.Schema<GetConnectionGroupByRoutingEndpointResult>,
  errors: [AccessDenied, EntityNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionGroupByRoutingEndpoint",
}));

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
  input: __S(3808, __c119, 0) as any as S.Schema<GetContinuousDeploymentPolicyRequest>,
  output: __S(3809, __c119, 1) as any as S.Schema<GetContinuousDeploymentPolicyResult>,
  errors: [AccessDenied, NoSuchContinuousDeploymentPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContinuousDeploymentPolicy",
}));

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
  input: __S(3840, __c120, 0) as any as S.Schema<GetContinuousDeploymentPolicyConfigRequest>,
  output: __S(3841, __c120, 1) as any as S.Schema<GetContinuousDeploymentPolicyConfigResult>,
  errors: [AccessDenied, NoSuchContinuousDeploymentPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContinuousDeploymentPolicyConfig",
}));

export type GetDistributionError = AccessDenied | NoSuchDistribution | CommonErrors;
/**
 * Get the information about a distribution.
 */
export const getDistribution: API.OperationMethod<
  GetDistributionRequest,
  GetDistributionResult,
  GetDistributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3872, __c121, 0) as any as S.Schema<GetDistributionRequest>,
  output: __S(3873, __c121, 1) as any as S.Schema<GetDistributionResult>,
  errors: [AccessDenied, NoSuchDistribution],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistribution",
}));

export type GetDistributionConfigError = AccessDenied | NoSuchDistribution | CommonErrors;
/**
 * Get the configuration information about a distribution.
 */
export const getDistributionConfig: API.OperationMethod<
  GetDistributionConfigRequest,
  GetDistributionConfigResult,
  GetDistributionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3904, __c122, 0) as any as S.Schema<GetDistributionConfigRequest>,
  output: __S(3905, __c122, 1) as any as S.Schema<GetDistributionConfigResult>,
  errors: [AccessDenied, NoSuchDistribution],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionConfig",
}));

export type GetDistributionTenantError = AccessDenied | EntityNotFound | CommonErrors;
/**
 * Gets information about a distribution tenant.
 */
export const getDistributionTenant: API.OperationMethod<
  GetDistributionTenantRequest,
  GetDistributionTenantResult,
  GetDistributionTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3936, __c123, 0) as any as S.Schema<GetDistributionTenantRequest>,
  output: __S(3937, __c123, 1) as any as S.Schema<GetDistributionTenantResult>,
  errors: [AccessDenied, EntityNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionTenant",
}));

export type GetDistributionTenantByDomainError = AccessDenied | EntityNotFound | CommonErrors;
/**
 * Gets information about a distribution tenant by the associated domain.
 */
export const getDistributionTenantByDomain: API.OperationMethod<
  GetDistributionTenantByDomainRequest,
  GetDistributionTenantByDomainResult,
  GetDistributionTenantByDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3968, __c124, 0) as any as S.Schema<GetDistributionTenantByDomainRequest>,
  output: __S(3969, __c124, 1) as any as S.Schema<GetDistributionTenantByDomainResult>,
  errors: [AccessDenied, EntityNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionTenantByDomain",
}));

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
  input: __S(4000, __c125, 0) as any as S.Schema<GetFieldLevelEncryptionRequest>,
  output: __S(4001, __c125, 1) as any as S.Schema<GetFieldLevelEncryptionResult>,
  errors: [AccessDenied, NoSuchFieldLevelEncryptionConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFieldLevelEncryption",
}));

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
  input: __S(4032, __c126, 0) as any as S.Schema<GetFieldLevelEncryptionConfigRequest>,
  output: __S(4033, __c126, 1) as any as S.Schema<GetFieldLevelEncryptionConfigResult>,
  errors: [AccessDenied, NoSuchFieldLevelEncryptionConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFieldLevelEncryptionConfig",
}));

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
  input: __S(4064, __c127, 0) as any as S.Schema<GetFieldLevelEncryptionProfileRequest>,
  output: __S(4065, __c127, 1) as any as S.Schema<GetFieldLevelEncryptionProfileResult>,
  errors: [AccessDenied, NoSuchFieldLevelEncryptionProfile],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFieldLevelEncryptionProfile",
}));

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
  input: __S(4096, __c128, 0) as any as S.Schema<GetFieldLevelEncryptionProfileConfigRequest>,
  output: __S(4097, __c128, 1) as any as S.Schema<GetFieldLevelEncryptionProfileConfigResult>,
  errors: [AccessDenied, NoSuchFieldLevelEncryptionProfile],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFieldLevelEncryptionProfileConfig",
}));

export type GetFunctionError = NoSuchFunctionExists | UnsupportedOperation | CommonErrors;
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
  input: __S(4128, __c129, 0) as any as S.Schema<GetFunctionRequest>,
  output: __S(4129, __c129, 1) as any as S.Schema<GetFunctionResult>,
  errors: [NoSuchFunctionExists, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunction",
}));

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
  input: __S(4160, __c130, 0) as any as S.Schema<GetInvalidationRequest>,
  output: __S(4161, __c130, 1) as any as S.Schema<GetInvalidationResult>,
  errors: [AccessDenied, NoSuchDistribution, NoSuchInvalidation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvalidation",
}));

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
  input: __S(4192, __c131, 0) as any as S.Schema<GetInvalidationForDistributionTenantRequest>,
  output: __S(4193, __c131, 1) as any as S.Schema<GetInvalidationForDistributionTenantResult>,
  errors: [AccessDenied, EntityNotFound, NoSuchInvalidation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvalidationForDistributionTenant",
}));

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
  input: __S(4224, __c132, 0) as any as S.Schema<GetKeyGroupRequest>,
  output: __S(4225, __c132, 1) as any as S.Schema<GetKeyGroupResult>,
  errors: [NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKeyGroup",
}));

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
  input: __S(4256, __c133, 0) as any as S.Schema<GetKeyGroupConfigRequest>,
  output: __S(4257, __c133, 1) as any as S.Schema<GetKeyGroupConfigResult>,
  errors: [NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKeyGroupConfig",
}));

export type GetManagedCertificateDetailsError = AccessDenied | EntityNotFound | CommonErrors;
/**
 * Gets details about the CloudFront managed ACM certificate.
 */
export const getManagedCertificateDetails: API.OperationMethod<
  GetManagedCertificateDetailsRequest,
  GetManagedCertificateDetailsResult,
  GetManagedCertificateDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4288, __c134, 0) as any as S.Schema<GetManagedCertificateDetailsRequest>,
  output: __S(4292, __c134, 4) as any as S.Schema<GetManagedCertificateDetailsResult>,
  errors: [AccessDenied, EntityNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedCertificateDetails",
}));

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
  input: __S(4320, __c135, 0) as any as S.Schema<GetMonitoringSubscriptionRequest>,
  output: __S(4321, __c135, 1) as any as S.Schema<GetMonitoringSubscriptionResult>,
  errors: [AccessDenied, NoSuchDistribution, NoSuchMonitoringSubscription, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMonitoringSubscription",
}));

export type GetOriginAccessControlError = AccessDenied | NoSuchOriginAccessControl | CommonErrors;
/**
 * Gets a CloudFront origin access control, including its unique identifier.
 */
export const getOriginAccessControl: API.OperationMethod<
  GetOriginAccessControlRequest,
  GetOriginAccessControlResult,
  GetOriginAccessControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<GetOriginAccessControlRequest>,
  output: __S(4353, __c136, 1) as any as S.Schema<GetOriginAccessControlResult>,
  errors: [AccessDenied, NoSuchOriginAccessControl],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginAccessControl",
}));

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
  input: __S(4384, __c137, 0) as any as S.Schema<GetOriginAccessControlConfigRequest>,
  output: __S(4385, __c137, 1) as any as S.Schema<GetOriginAccessControlConfigResult>,
  errors: [AccessDenied, NoSuchOriginAccessControl],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginAccessControlConfig",
}));

export type GetOriginRequestPolicyError = AccessDenied | NoSuchOriginRequestPolicy | CommonErrors;
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
  input: __S(4416, __c138, 0) as any as S.Schema<GetOriginRequestPolicyRequest>,
  output: __S(4417, __c138, 1) as any as S.Schema<GetOriginRequestPolicyResult>,
  errors: [AccessDenied, NoSuchOriginRequestPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginRequestPolicy",
}));

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
  input: __S(4448, __c139, 0) as any as S.Schema<GetOriginRequestPolicyConfigRequest>,
  output: __S(4449, __c139, 1) as any as S.Schema<GetOriginRequestPolicyConfigResult>,
  errors: [AccessDenied, NoSuchOriginRequestPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginRequestPolicyConfig",
}));

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
  input: __S(4480, __c140, 0) as any as S.Schema<GetPublicKeyRequest>,
  output: __S(4481, __c140, 1) as any as S.Schema<GetPublicKeyResult>,
  errors: [AccessDenied, NoSuchPublicKey],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPublicKey",
}));

export type GetPublicKeyConfigError = AccessDenied | NoSuchPublicKey | CommonErrors;
/**
 * Gets a public key configuration.
 */
export const getPublicKeyConfig: API.OperationMethod<
  GetPublicKeyConfigRequest,
  GetPublicKeyConfigResult,
  GetPublicKeyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4512, __c141, 0) as any as S.Schema<GetPublicKeyConfigRequest>,
  output: __S(4513, __c141, 1) as any as S.Schema<GetPublicKeyConfigResult>,
  errors: [AccessDenied, NoSuchPublicKey],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPublicKeyConfig",
}));

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
  input: __S(4544, __c142, 0) as any as S.Schema<GetRealtimeLogConfigRequest>,
  output: __S(4545, __c142, 1) as any as S.Schema<GetRealtimeLogConfigResult>,
  errors: [AccessDenied, InvalidArgument, NoSuchRealtimeLogConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRealtimeLogConfig",
}));

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
  input: __S(4576, __c143, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(4577, __c143, 1) as any as S.Schema<GetResourcePolicyResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

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
  input: __S(4608, __c144, 0) as any as S.Schema<GetResponseHeadersPolicyRequest>,
  output: __S(4609, __c144, 1) as any as S.Schema<GetResponseHeadersPolicyResult>,
  errors: [AccessDenied, NoSuchResponseHeadersPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResponseHeadersPolicy",
}));

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
  input: __S(4640, __c145, 0) as any as S.Schema<GetResponseHeadersPolicyConfigRequest>,
  output: __S(4641, __c145, 1) as any as S.Schema<GetResponseHeadersPolicyConfigResult>,
  errors: [AccessDenied, NoSuchResponseHeadersPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResponseHeadersPolicyConfig",
}));

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
  input: __S(4672, __c146, 0) as any as S.Schema<GetStreamingDistributionRequest>,
  output: __S(4673, __c146, 1) as any as S.Schema<GetStreamingDistributionResult>,
  errors: [AccessDenied, NoSuchStreamingDistribution],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStreamingDistribution",
}));

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
  input: __S(4704, __c147, 0) as any as S.Schema<GetStreamingDistributionConfigRequest>,
  output: __S(4705, __c147, 1) as any as S.Schema<GetStreamingDistributionConfigResult>,
  errors: [AccessDenied, NoSuchStreamingDistribution],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStreamingDistributionConfig",
}));

export type GetTrustStoreError = AccessDenied | EntityNotFound | InvalidArgument | CommonErrors;
/**
 * Gets a trust store.
 */
export const getTrustStore: API.OperationMethod<
  GetTrustStoreRequest,
  GetTrustStoreResult,
  GetTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4736, __c148, 0) as any as S.Schema<GetTrustStoreRequest>,
  output: __S(4737, __c148, 1) as any as S.Schema<GetTrustStoreResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustStore",
}));

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
  input: __S(4768, __c149, 0) as any as S.Schema<GetVpcOriginRequest>,
  output: __S(4769, __c149, 1) as any as S.Schema<GetVpcOriginResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcOrigin",
}));

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
  input: __S(4800, __c150, 0) as any as S.Schema<ListAnycastIpListsRequest>,
  output: __S(4804, __c150, 4) as any as S.Schema<ListAnycastIpListsResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnycastIpLists",
}));

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
  input: __S(4832, __c151, 0) as any as S.Schema<ListCachePoliciesRequest>,
  output: __S(4836, __c151, 4) as any as S.Schema<ListCachePoliciesResult>,
  errors: [AccessDenied, InvalidArgument, NoSuchCachePolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCachePolicies",
}));

export type ListCloudFrontOriginAccessIdentitiesError = InvalidArgument | CommonErrors;
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
  input: __S(4864, __c152, 0) as any as S.Schema<ListCloudFrontOriginAccessIdentitiesRequest>,
  output: __S(4868, __c152, 4) as any as S.Schema<ListCloudFrontOriginAccessIdentitiesResult>,
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

export type ListConflictingAliasesError = InvalidArgument | NoSuchDistribution | CommonErrors;
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
  input: __S(4896, __c153, 0) as any as S.Schema<ListConflictingAliasesRequest>,
  output: __S(4900, __c153, 4) as any as S.Schema<ListConflictingAliasesResult>,
  errors: [InvalidArgument, NoSuchDistribution],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConflictingAliases",
}));

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
  input: __S(4928, __c154, 0) as any as S.Schema<ListConnectionFunctionsRequest>,
  output: __S(4930, __c154, 2) as any as S.Schema<ListConnectionFunctionsResult>,
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
  input: __S(4961, __c155, 1) as any as S.Schema<ListConnectionGroupsRequest>,
  output: __S(4964, __c155, 4) as any as S.Schema<ListConnectionGroupsResult>,
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
  input: __S(4992, __c156, 0) as any as S.Schema<ListContinuousDeploymentPoliciesRequest>,
  output: __S(4996, __c156, 4) as any as S.Schema<ListContinuousDeploymentPoliciesResult>,
  errors: [AccessDenied, InvalidArgument, NoSuchContinuousDeploymentPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContinuousDeploymentPolicies",
}));

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
  input: __S(5024, __c157, 0) as any as S.Schema<ListDistributionsRequest>,
  output: __S(5025, __c157, 1) as any as S.Schema<ListDistributionsResult>,
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
  input: __S(5088, __c159, 0) as any as S.Schema<ListDistributionsByAnycastIpListIdRequest>,
  output: __S(5089, __c159, 1) as any as S.Schema<ListDistributionsByAnycastIpListIdResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByAnycastIpListId",
}));

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
  input: __S(5120, __c160, 0) as any as S.Schema<ListDistributionsByCachePolicyIdRequest>,
  output: __S(5121, __c160, 1) as any as S.Schema<ListDistributionsByCachePolicyIdResult>,
  errors: [AccessDenied, InvalidArgument, NoSuchCachePolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByCachePolicyId",
}));

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
  input: __S(5184, __c162, 0) as any as S.Schema<ListDistributionsByConnectionFunctionRequest>,
  output: __S(5185, __c162, 1) as any as S.Schema<ListDistributionsByConnectionFunctionResult>,
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

export type ListDistributionsByConnectionModeError = AccessDenied | InvalidArgument | CommonErrors;
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
  input: __S(5216, __c163, 0) as any as S.Schema<ListDistributionsByConnectionModeRequest>,
  output: __S(5217, __c163, 1) as any as S.Schema<ListDistributionsByConnectionModeResult>,
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

export type ListDistributionsByKeyGroupError = InvalidArgument | NoSuchResource | CommonErrors;
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
  input: __S(5248, __c164, 0) as any as S.Schema<ListDistributionsByKeyGroupRequest>,
  output: __S(5249, __c164, 1) as any as S.Schema<ListDistributionsByKeyGroupResult>,
  errors: [InvalidArgument, NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByKeyGroup",
}));

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
  input: __S(5280, __c165, 0) as any as S.Schema<ListDistributionsByOriginRequestPolicyIdRequest>,
  output: __S(5281, __c165, 1) as any as S.Schema<ListDistributionsByOriginRequestPolicyIdResult>,
  errors: [AccessDenied, InvalidArgument, NoSuchOriginRequestPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByOriginRequestPolicyId",
}));

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
  input: __S(5312, __c166, 0) as any as S.Schema<ListDistributionsByOwnedResourceRequest>,
  output: __S(5316, __c166, 4) as any as S.Schema<ListDistributionsByOwnedResourceResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByOwnedResource",
}));

export type ListDistributionsByRealtimeLogConfigError = InvalidArgument | CommonErrors;
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
  input: __S(5344, __c167, 0) as any as S.Schema<ListDistributionsByRealtimeLogConfigRequest>,
  output: __S(5345, __c167, 1) as any as S.Schema<ListDistributionsByRealtimeLogConfigResult>,
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByRealtimeLogConfig",
}));

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
  input: __S(5376, __c168, 0) as any as S.Schema<ListDistributionsByResponseHeadersPolicyIdRequest>,
  output: __S(5377, __c168, 1) as any as S.Schema<ListDistributionsByResponseHeadersPolicyIdResult>,
  errors: [AccessDenied, InvalidArgument, NoSuchResponseHeadersPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByResponseHeadersPolicyId",
}));

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
  input: __S(5408, __c169, 0) as any as S.Schema<ListDistributionsByTrustStoreRequest>,
  output: __S(5409, __c169, 1) as any as S.Schema<ListDistributionsByTrustStoreResult>,
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
  input: __S(5440, __c170, 0) as any as S.Schema<ListDistributionsByVpcOriginIdRequest>,
  output: __S(5441, __c170, 1) as any as S.Schema<ListDistributionsByVpcOriginIdResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByVpcOriginId",
}));

export type ListDistributionsByWebACLIdError = InvalidArgument | InvalidWebACLId | CommonErrors;
/**
 * List the distributions that are associated with a specified WAF web ACL.
 */
export const listDistributionsByWebACLId: API.OperationMethod<
  ListDistributionsByWebACLIdRequest,
  ListDistributionsByWebACLIdResult,
  ListDistributionsByWebACLIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5472, __c171, 0) as any as S.Schema<ListDistributionsByWebACLIdRequest>,
  output: __S(5473, __c171, 1) as any as S.Schema<ListDistributionsByWebACLIdResult>,
  errors: [InvalidArgument, InvalidWebACLId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionsByWebACLId",
}));

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
  input: __S(5505, __c172, 1) as any as S.Schema<ListDistributionTenantsRequest>,
  output: __S(5506, __c172, 2) as any as S.Schema<ListDistributionTenantsResult>,
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
  input: __S(5568, __c174, 0) as any as S.Schema<ListDistributionTenantsByCustomizationRequest>,
  output: __S(5569, __c174, 1) as any as S.Schema<ListDistributionTenantsByCustomizationResult>,
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
  input: __S(5600, __c175, 0) as any as S.Schema<ListDomainConflictsRequest>,
  output: __S(5603, __c175, 3) as any as S.Schema<ListDomainConflictsResult>,
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

export type ListFieldLevelEncryptionConfigsError = InvalidArgument | CommonErrors;
/**
 * List all field-level encryption configurations that have been created in CloudFront for this account.
 */
export const listFieldLevelEncryptionConfigs: API.OperationMethod<
  ListFieldLevelEncryptionConfigsRequest,
  ListFieldLevelEncryptionConfigsResult,
  ListFieldLevelEncryptionConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5664, __c177, 0) as any as S.Schema<ListFieldLevelEncryptionConfigsRequest>,
  output: __S(5668, __c177, 4) as any as S.Schema<ListFieldLevelEncryptionConfigsResult>,
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFieldLevelEncryptionConfigs",
}));

export type ListFieldLevelEncryptionProfilesError = InvalidArgument | CommonErrors;
/**
 * Request a list of field-level encryption profiles that have been created in CloudFront for this account.
 */
export const listFieldLevelEncryptionProfiles: API.OperationMethod<
  ListFieldLevelEncryptionProfilesRequest,
  ListFieldLevelEncryptionProfilesResult,
  ListFieldLevelEncryptionProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5696, __c178, 0) as any as S.Schema<ListFieldLevelEncryptionProfilesRequest>,
  output: __S(5700, __c178, 4) as any as S.Schema<ListFieldLevelEncryptionProfilesResult>,
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFieldLevelEncryptionProfiles",
}));

export type ListFunctionsError = InvalidArgument | UnsupportedOperation | CommonErrors;
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
  input: __S(5728, __c179, 0) as any as S.Schema<ListFunctionsRequest>,
  output: __S(5731, __c179, 3) as any as S.Schema<ListFunctionsResult>,
  errors: [InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctions",
}));

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
  input: __S(5760, __c180, 0) as any as S.Schema<ListInvalidationsRequest>,
  output: __S(5761, __c180, 1) as any as S.Schema<ListInvalidationsResult>,
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
  input: __S(5824, __c182, 0) as any as S.Schema<ListInvalidationsForDistributionTenantRequest>,
  output: __S(5825, __c182, 1) as any as S.Schema<ListInvalidationsForDistributionTenantResult>,
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
  input: __S(5856, __c183, 0) as any as S.Schema<ListKeyGroupsRequest>,
  output: __S(5860, __c183, 4) as any as S.Schema<ListKeyGroupsResult>,
  errors: [InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKeyGroups",
}));

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
  input: __S(5888, __c184, 0) as any as S.Schema<ListKeyValueStoresRequest>,
  output: __S(5891, __c184, 3) as any as S.Schema<ListKeyValueStoresResult>,
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
  input: __S(5920, __c185, 0) as any as S.Schema<ListOriginAccessControlsRequest>,
  output: __S(5924, __c185, 4) as any as S.Schema<ListOriginAccessControlsResult>,
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
  input: __S(5952, __c186, 0) as any as S.Schema<ListOriginRequestPoliciesRequest>,
  output: __S(5956, __c186, 4) as any as S.Schema<ListOriginRequestPoliciesResult>,
  errors: [AccessDenied, InvalidArgument, NoSuchOriginRequestPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOriginRequestPolicies",
}));

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
  input: __S(5984, __c187, 0) as any as S.Schema<ListPublicKeysRequest>,
  output: __S(5988, __c187, 4) as any as S.Schema<ListPublicKeysResult>,
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
  input: __S(6016, __c188, 0) as any as S.Schema<ListRealtimeLogConfigsRequest>,
  output: __S(6019, __c188, 3) as any as S.Schema<ListRealtimeLogConfigsResult>,
  errors: [AccessDenied, InvalidArgument, NoSuchRealtimeLogConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRealtimeLogConfigs",
}));

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
  input: __S(6048, __c189, 0) as any as S.Schema<ListResponseHeadersPoliciesRequest>,
  output: __S(6052, __c189, 4) as any as S.Schema<ListResponseHeadersPoliciesResult>,
  errors: [AccessDenied, InvalidArgument, NoSuchResponseHeadersPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResponseHeadersPolicies",
}));

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
  input: __S(6080, __c190, 0) as any as S.Schema<ListStreamingDistributionsRequest>,
  output: __S(6084, __c190, 4) as any as S.Schema<ListStreamingDistributionsResult>,
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
  input: __S(6112, __c191, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(6113, __c191, 1) as any as S.Schema<ListTagsForResourceResult>,
  errors: [AccessDenied, InvalidArgument, InvalidTagging, NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTrustStoresError = AccessDenied | EntityNotFound | InvalidArgument | CommonErrors;
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
  input: __S(6144, __c192, 0) as any as S.Schema<ListTrustStoresRequest>,
  output: __S(6147, __c192, 3) as any as S.Schema<ListTrustStoresResult>,
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
  input: __S(6176, __c193, 0) as any as S.Schema<ListVpcOriginsRequest>,
  output: __S(6180, __c193, 4) as any as S.Schema<ListVpcOriginsResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcOrigins",
}));

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
  input: __S(6208, __c194, 0) as any as S.Schema<PublishConnectionFunctionRequest>,
  output: __S(6209, __c194, 1) as any as S.Schema<PublishConnectionFunctionResult>,
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
}));

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
  input: __S(6240, __c195, 0) as any as S.Schema<PublishFunctionRequest>,
  output: __S(6241, __c195, 1) as any as S.Schema<PublishFunctionResult>,
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
}));

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
  input: __S(6272, __c196, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(6273, __c196, 1) as any as S.Schema<PutResourcePolicyResult>,
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
}));

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
  input: __S(6304, __c197, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(6305, __c197, 1) as any as S.Schema<TagResourceResponse>,
  errors: [AccessDenied, InvalidArgument, InvalidTagging, NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(6336, __c198, 0) as any as S.Schema<TestConnectionFunctionRequest>,
  output: __S(6338, __c198, 2) as any as S.Schema<TestConnectionFunctionResult>,
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
}));

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
  input: __S(6400, __c200, 0) as any as S.Schema<TestFunctionRequest>,
  output: __S(6402, __c200, 2) as any as S.Schema<TestFunctionResult>,
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
}));

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
  input: __S(6434, __c201, 2) as any as S.Schema<UntagResourceRequest>,
  output: __S(6435, __c201, 3) as any as S.Schema<UntagResourceResponse>,
  errors: [AccessDenied, InvalidArgument, InvalidTagging, NoSuchResource],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(6464, __c202, 0) as any as S.Schema<UpdateAnycastIpListRequest>,
  output: __S(6465, __c202, 1) as any as S.Schema<UpdateAnycastIpListResult>,
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
}));

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
  input: __S(6496, __c203, 0) as any as S.Schema<UpdateCachePolicyRequest>,
  output: __S(6497, __c203, 1) as any as S.Schema<UpdateCachePolicyResult>,
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
}));

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
  input: __S(6528, __c204, 0) as any as S.Schema<UpdateCloudFrontOriginAccessIdentityRequest>,
  output: __S(6529, __c204, 1) as any as S.Schema<UpdateCloudFrontOriginAccessIdentityResult>,
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
}));

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
  input: __S(6560, __c205, 0) as any as S.Schema<UpdateConnectionFunctionRequest>,
  output: __S(6561, __c205, 1) as any as S.Schema<UpdateConnectionFunctionResult>,
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
}));

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
  input: __S(6592, __c206, 0) as any as S.Schema<UpdateConnectionGroupRequest>,
  output: __S(6593, __c206, 1) as any as S.Schema<UpdateConnectionGroupResult>,
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
}));

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
  input: __S(6624, __c207, 0) as any as S.Schema<UpdateContinuousDeploymentPolicyRequest>,
  output: __S(6625, __c207, 1) as any as S.Schema<UpdateContinuousDeploymentPolicyResult>,
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
}));

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
  input: __S(6656, __c208, 0) as any as S.Schema<UpdateDistributionRequest>,
  output: __S(6657, __c208, 1) as any as S.Schema<UpdateDistributionResult>,
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
}));

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
  input: __S(6688, __c209, 0) as any as S.Schema<UpdateDistributionTenantRequest>,
  output: __S(6689, __c209, 1) as any as S.Schema<UpdateDistributionTenantResult>,
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
}));

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
  input: __S(6720, __c210, 0) as any as S.Schema<UpdateDistributionWithStagingConfigRequest>,
  output: __S(6721, __c210, 1) as any as S.Schema<UpdateDistributionWithStagingConfigResult>,
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
}));

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
  input: __S(6752, __c211, 0) as any as S.Schema<UpdateDomainAssociationRequest>,
  output: __S(6753, __c211, 1) as any as S.Schema<UpdateDomainAssociationResult>,
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
}));

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
  input: __S(6784, __c212, 0) as any as S.Schema<UpdateFieldLevelEncryptionConfigRequest>,
  output: __S(6785, __c212, 1) as any as S.Schema<UpdateFieldLevelEncryptionConfigResult>,
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
}));

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
  input: __S(6816, __c213, 0) as any as S.Schema<UpdateFieldLevelEncryptionProfileRequest>,
  output: __S(6817, __c213, 1) as any as S.Schema<UpdateFieldLevelEncryptionProfileResult>,
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
}));

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
  input: __S(6848, __c214, 0) as any as S.Schema<UpdateFunctionRequest>,
  output: __S(6849, __c214, 1) as any as S.Schema<UpdateFunctionResult>,
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
}));

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
  input: __S(6880, __c215, 0) as any as S.Schema<UpdateKeyGroupRequest>,
  output: __S(6881, __c215, 1) as any as S.Schema<UpdateKeyGroupResult>,
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
}));

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
  input: __S(6912, __c216, 0) as any as S.Schema<UpdateKeyValueStoreRequest>,
  output: __S(6913, __c216, 1) as any as S.Schema<UpdateKeyValueStoreResult>,
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
}));

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
  input: __S(6944, __c217, 0) as any as S.Schema<UpdateOriginAccessControlRequest>,
  output: __S(6945, __c217, 1) as any as S.Schema<UpdateOriginAccessControlResult>,
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
}));

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
  input: __S(6976, __c218, 0) as any as S.Schema<UpdateOriginRequestPolicyRequest>,
  output: __S(6977, __c218, 1) as any as S.Schema<UpdateOriginRequestPolicyResult>,
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
}));

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
  input: __S(7008, __c219, 0) as any as S.Schema<UpdatePublicKeyRequest>,
  output: __S(7009, __c219, 1) as any as S.Schema<UpdatePublicKeyResult>,
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
}));

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
  input: __S(7040, __c220, 0) as any as S.Schema<UpdateRealtimeLogConfigRequest>,
  output: __S(7041, __c220, 1) as any as S.Schema<UpdateRealtimeLogConfigResult>,
  errors: [AccessDenied, InvalidArgument, NoSuchRealtimeLogConfig],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRealtimeLogConfig",
}));

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
  input: __S(7072, __c221, 0) as any as S.Schema<UpdateResponseHeadersPolicyRequest>,
  output: __S(7073, __c221, 1) as any as S.Schema<UpdateResponseHeadersPolicyResult>,
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
}));

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
  input: __S(7104, __c222, 0) as any as S.Schema<UpdateStreamingDistributionRequest>,
  output: __S(7105, __c222, 1) as any as S.Schema<UpdateStreamingDistributionResult>,
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
}));

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
  input: __S(7136, __c223, 0) as any as S.Schema<UpdateTrustStoreRequest>,
  output: __S(7137, __c223, 1) as any as S.Schema<UpdateTrustStoreResult>,
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
}));

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
  input: __S(7168, __c224, 0) as any as S.Schema<UpdateVpcOriginRequest>,
  output: __S(7169, __c224, 1) as any as S.Schema<UpdateVpcOriginResult>,
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
}));

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
  input: __S(7200, __c225, 0) as any as S.Schema<VerifyDnsConfigurationRequest>,
  output: __S(7203, __c225, 3) as any as S.Schema<VerifyDnsConfigurationResult>,
  errors: [AccessDenied, EntityNotFound, InvalidArgument],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyDnsConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetDistributionId: S.String.pipe(T.HttpLabel("TargetDistributionId")),
          Alias: S.String.pipe(T.HttpQuery("Alias")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "PUT",
              uri: "/2020-05-31/distribution/{TargetDistributionId}/associate-alias",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateAliasRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AssociateAliasResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          WebACLArn: S.String,
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "PUT",
              uri: "/2020-05-31/distribution-tenant/{Id}/associate-web-acl",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateDistributionTenantWebACLRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          WebACLArn: S.optional(S.String),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "AssociateDistributionTenantWebACLResult" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          WebACLArn: S.String,
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/distribution/{Id}/associate-web-acl" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateDistributionWebACLRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          WebACLArn: S.optional(S.String),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "AssociateDistributionWebACLResult" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PrimaryDistributionId: S.String.pipe(T.HttpLabel("PrimaryDistributionId")),
          Staging: S.optional(S.Boolean).pipe(T.HttpHeader("Staging")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
          CallerReference: S.String,
          Enabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2020-05-31/distribution/{PrimaryDistributionId}/copy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CopyDistributionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Distribution: S.optional(__S(419, __c13, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "Distribution" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CopyDistributionResult" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Name")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(128, __c4, 0)) }),
      ).annotate({ identifier: "CookieNames" });
    case 2:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Name")));
    case 3:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(130, __c4, 2)) }),
      ).annotate({ identifier: "Headers" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Location")));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("CNAME")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(192, __c6, 0)) }),
      ).annotate({ identifier: "Aliases" });
    case 2:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AwsAccountNumber")));
    case 3:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, Quantity: S.Number, Items: S.optional(__S(194, __c6, 2)) }),
      ).annotate({ identifier: "TrustedSigners" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("KeyPairId")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(224, __c7, 0)) }),
      ).annotate({ identifier: "KeyPairIds" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AwsAccountNumber: S.optional(S.String),
          KeyPairIds: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "Signer" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(226, __c7, 2)
          .pipe(/*@__PURE__*/ T.XmlName("Signer"))
          .annotate({ identifier: "Signer" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, Quantity: S.Number, Items: S.optional(__S(227, __c7, 3)) }),
      ).annotate({ identifier: "ActiveTrustedSigners" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SslProtocol")));
    case 1:
      return S.suspend(() => S.Struct({ Quantity: S.Number, Items: __S(256, __c8, 0) })).annotate({
        identifier: "OriginSslProtocols",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HeaderName: S.String, HeaderValue: SensitiveString }),
      ).annotate({ identifier: "OriginCustomHeader" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(288, __c9, 0)
          .pipe(/*@__PURE__*/ T.XmlName("OriginCustomHeader"))
          .annotate({ identifier: "OriginCustomHeader" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(289, __c9, 1)) }),
      ).annotate({ identifier: "CustomHeaders" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          OriginAccessIdentity: S.optional(S.String),
          OriginReadTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "S3OriginConfig" });
    case 4:
      return S.suspend(() => S.Struct({ ClientCertificateArn: S.String })).annotate({
        identifier: "OriginMtlsConfig",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          HTTPPort: S.Number,
          HTTPSPort: S.Number,
          OriginProtocolPolicy: S.String,
          OriginSslProtocols: S.optional(__S(257, __c8, 1)),
          OriginReadTimeout: S.optional(S.Number),
          OriginKeepaliveTimeout: S.optional(S.Number),
          IpAddressType: S.optional(S.String),
          OriginMtlsConfig: S.optional(__S(292, __c9, 4)),
        }),
      ).annotate({ identifier: "CustomOriginConfig" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          VpcOriginId: S.String,
          OwnerAccountId: S.optional(S.String),
          OriginReadTimeout: S.optional(S.Number),
          OriginKeepaliveTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "VpcOriginConfig" });
    case 7:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, OriginShieldRegion: S.optional(S.String) }),
      ).annotate({ identifier: "OriginShield" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          DomainName: S.String,
          OriginPath: S.optional(S.String),
          CustomHeaders: S.optional(__S(290, __c9, 2)),
          S3OriginConfig: S.optional(__S(291, __c9, 3)),
          CustomOriginConfig: S.optional(__S(293, __c9, 5)),
          VpcOriginConfig: S.optional(__S(294, __c9, 6)),
          ConnectionAttempts: S.optional(S.Number),
          ConnectionTimeout: S.optional(S.Number),
          ResponseCompletionTimeout: S.optional(S.Number),
          OriginShield: S.optional(__S(295, __c9, 7)),
          OriginAccessControlId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Origin" });
    case 9:
      return S.Array(
        /*@__PURE__*/ __S(296, __c9, 8)
          .pipe(/*@__PURE__*/ T.XmlName("Origin"))
          .annotate({ identifier: "Origin" }),
      );
    case 10:
      return S.suspend(() => S.Struct({ Quantity: S.Number, Items: __S(297, __c9, 9) })).annotate({
        identifier: "Origins",
      });
    case 11:
      return S.Array(/*@__PURE__*/ S.Number.pipe(/*@__PURE__*/ T.XmlName("StatusCode")));
    case 12:
      return S.suspend(() => S.Struct({ Quantity: S.Number, Items: __S(299, __c9, 11) })).annotate({
        identifier: "StatusCodes",
      });
    case 13:
      return S.suspend(() => S.Struct({ StatusCodes: __S(300, __c9, 12) })).annotate({
        identifier: "OriginGroupFailoverCriteria",
      });
    case 14:
      return S.suspend(() => S.Struct({ OriginId: S.String })).annotate({
        identifier: "OriginGroupMember",
      });
    case 15:
      return S.Array(
        /*@__PURE__*/ __S(302, __c9, 14)
          .pipe(/*@__PURE__*/ T.XmlName("OriginGroupMember"))
          .annotate({ identifier: "OriginGroupMember" }),
      );
    case 16:
      return S.suspend(() => S.Struct({ Quantity: S.Number, Items: __S(303, __c9, 15) })).annotate({
        identifier: "OriginGroupMembers",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          FailoverCriteria: __S(301, __c9, 13),
          Members: __S(304, __c9, 16),
          SelectionCriteria: S.optional(S.String),
        }),
      ).annotate({ identifier: "OriginGroup" });
    case 18:
      return S.Array(
        /*@__PURE__*/ __S(305, __c9, 17)
          .pipe(/*@__PURE__*/ T.XmlName("OriginGroup"))
          .annotate({ identifier: "OriginGroup" }),
      );
    case 19:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(306, __c9, 18)) }),
      ).annotate({ identifier: "OriginGroups" });
    case 20:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("KeyGroup")));
    case 21:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, Quantity: S.Number, Items: S.optional(__S(308, __c9, 20)) }),
      ).annotate({ identifier: "TrustedKeyGroups" });
    case 22:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Method")));
    case 23:
      return S.suspend(() => S.Struct({ Quantity: S.Number, Items: __S(310, __c9, 22) })).annotate({
        identifier: "CachedMethods",
      });
    case 24:
      return S.suspend(() =>
        S.Struct({
          Quantity: S.Number,
          Items: __S(310, __c9, 22),
          CachedMethods: S.optional(__S(311, __c9, 23)),
        }),
      ).annotate({ identifier: "AllowedMethods" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          LambdaFunctionARN: S.String,
          EventType: S.String,
          IncludeBody: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LambdaFunctionAssociation" });
    case 26:
      return S.Array(
        /*@__PURE__*/ __S(313, __c9, 25)
          .pipe(/*@__PURE__*/ T.XmlName("LambdaFunctionAssociation"))
          .annotate({ identifier: "LambdaFunctionAssociation" }),
      );
    case 27:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(314, __c9, 26)) }),
      ).annotate({ identifier: "LambdaFunctionAssociations" });
    case 28:
      return S.suspend(() => S.Struct({ FunctionARN: S.String, EventType: S.String })).annotate({
        identifier: "FunctionAssociation",
      });
    case 29:
      return S.Array(
        /*@__PURE__*/ __S(316, __c9, 28)
          .pipe(/*@__PURE__*/ T.XmlName("FunctionAssociation"))
          .annotate({ identifier: "FunctionAssociation" }),
      );
    case 30:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(317, __c9, 29)) }),
      ).annotate({ identifier: "FunctionAssociations" });
    case 31:
      return S.suspend(() => S.Struct({ Enabled: S.Boolean })).annotate({
        identifier: "GrpcConfig",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Forward: S.String, WhitelistedNames: S.optional(__S(129, __c4, 1)) }),
      ).annotate({ identifier: "CookiePreference" });
    case 1:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Name")));
    case 2:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(321, __c10, 1)) }),
      ).annotate({ identifier: "QueryStringCacheKeys" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          QueryString: S.Boolean,
          Cookies: __S(320, __c10, 0),
          Headers: S.optional(__S(131, __c4, 3)),
          QueryStringCacheKeys: S.optional(__S(322, __c10, 2)),
        }),
      ).annotate({ identifier: "ForwardedValues" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          TargetOriginId: S.String,
          TrustedSigners: S.optional(__S(195, __c6, 3)),
          TrustedKeyGroups: S.optional(__S(309, __c9, 21)),
          ViewerProtocolPolicy: S.String,
          AllowedMethods: S.optional(__S(312, __c9, 24)),
          SmoothStreaming: S.optional(S.Boolean),
          Compress: S.optional(S.Boolean),
          LambdaFunctionAssociations: S.optional(__S(315, __c9, 27)),
          FunctionAssociations: S.optional(__S(318, __c9, 30)),
          FieldLevelEncryptionId: S.optional(S.String),
          RealtimeLogConfigArn: S.optional(S.String),
          CachePolicyId: S.optional(S.String),
          OriginRequestPolicyId: S.optional(S.String),
          ResponseHeadersPolicyId: S.optional(S.String),
          GrpcConfig: S.optional(__S(319, __c9, 31)),
          ForwardedValues: S.optional(__S(323, __c10, 3)),
          MinTTL: S.optional(S.Number),
          DefaultTTL: S.optional(S.Number),
          MaxTTL: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DefaultCacheBehavior" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          PathPattern: S.String,
          TargetOriginId: S.String,
          TrustedSigners: S.optional(__S(195, __c6, 3)),
          TrustedKeyGroups: S.optional(__S(309, __c9, 21)),
          ViewerProtocolPolicy: S.String,
          AllowedMethods: S.optional(__S(312, __c9, 24)),
          SmoothStreaming: S.optional(S.Boolean),
          Compress: S.optional(S.Boolean),
          LambdaFunctionAssociations: S.optional(__S(315, __c9, 27)),
          FunctionAssociations: S.optional(__S(318, __c9, 30)),
          FieldLevelEncryptionId: S.optional(S.String),
          RealtimeLogConfigArn: S.optional(S.String),
          CachePolicyId: S.optional(S.String),
          OriginRequestPolicyId: S.optional(S.String),
          ResponseHeadersPolicyId: S.optional(S.String),
          GrpcConfig: S.optional(__S(319, __c9, 31)),
          ForwardedValues: S.optional(__S(323, __c10, 3)),
          MinTTL: S.optional(S.Number),
          DefaultTTL: S.optional(S.Number),
          MaxTTL: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CacheBehavior" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(325, __c10, 5)
          .pipe(/*@__PURE__*/ T.XmlName("CacheBehavior"))
          .annotate({ identifier: "CacheBehavior" }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(326, __c10, 6)) }),
      ).annotate({ identifier: "CacheBehaviors" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ErrorCode: S.Number,
          ResponsePagePath: S.optional(S.String),
          ResponseCode: S.optional(S.String),
          ErrorCachingMinTTL: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CustomErrorResponse" });
    case 9:
      return S.Array(
        /*@__PURE__*/ __S(328, __c10, 8)
          .pipe(/*@__PURE__*/ T.XmlName("CustomErrorResponse"))
          .annotate({ identifier: "CustomErrorResponse" }),
      );
    case 10:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(329, __c10, 9)) }),
      ).annotate({ identifier: "CustomErrorResponses" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          CloudFrontDefaultCertificate: S.optional(S.Boolean),
          IAMCertificateId: S.optional(S.String),
          ACMCertificateArn: S.optional(S.String),
          SSLSupportMethod: S.optional(S.String),
          MinimumProtocolVersion: S.optional(S.String),
          Certificate: S.optional(S.String),
          CertificateSource: S.optional(S.String),
        }),
      ).annotate({ identifier: "ViewerCertificate" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          RestrictionType: S.String,
          Quantity: S.Number,
          Items: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "GeoRestriction" });
    case 13:
      return S.suspend(() => S.Struct({ GeoRestriction: __S(332, __c10, 12) })).annotate({
        identifier: "Restrictions",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          TrustStoreId: S.String,
          AdvertiseTrustStoreCaNames: S.optional(S.Boolean),
          IgnoreCertificateExpiry: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TrustStoreConfig" });
    case 15:
      return S.suspend(() =>
        S.Struct({ Mode: S.optional(S.String), TrustStoreConfig: S.optional(__S(334, __c10, 14)) }),
      ).annotate({ identifier: "ViewerMtlsConfig" });
    case 16:
      return S.suspend(() => S.Struct({ Id: S.String })).annotate({
        identifier: "ConnectionFunctionAssociation",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          IncludeCookies: S.optional(S.Boolean),
          Bucket: S.optional(S.String),
          Prefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "LoggingConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Comment: S.optional(SensitiveString),
          DefaultValue: S.optional(S.String),
          Required: S.Boolean,
        }),
      ).annotate({ identifier: "StringSchemaConfig" });
    case 2:
      return S.suspend(() => S.Struct({ StringSchema: S.optional(__S(353, __c11, 1)) })).annotate({
        identifier: "ParameterDefinitionSchema",
      });
    case 3:
      return S.suspend(() => S.Struct({ Name: S.String, Definition: __S(354, __c11, 2) })).annotate(
        { identifier: "ParameterDefinition" },
      );
    case 4:
      return S.Array(__S(355, __c11, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ ParameterDefinitions: S.optional(__S(356, __c11, 4)) }),
      ).annotate({ identifier: "TenantConfig" });
    case 6:
      return S.suspend(() => S.Struct({ HeaderName: S.String })).annotate({
        identifier: "CacheTagConfig",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          CallerReference: S.String,
          Aliases: S.optional(__S(193, __c6, 1)),
          DefaultRootObject: S.optional(S.String),
          Origins: __S(298, __c9, 10),
          OriginGroups: S.optional(__S(307, __c9, 19)),
          DefaultCacheBehavior: __S(324, __c10, 4),
          CacheBehaviors: S.optional(__S(327, __c10, 7)),
          CustomErrorResponses: S.optional(__S(330, __c10, 10)),
          Comment: SensitiveString,
          Logging: S.optional(__S(352, __c11, 0)),
          PriceClass: S.optional(S.String),
          Enabled: S.Boolean,
          ViewerCertificate: S.optional(__S(331, __c10, 11)),
          Restrictions: S.optional(__S(333, __c10, 13)),
          WebACLId: S.optional(S.String),
          HttpVersion: S.optional(S.String),
          IsIPV6Enabled: S.optional(S.Boolean),
          ContinuousDeploymentPolicyId: S.optional(S.String),
          Staging: S.optional(S.Boolean),
          AnycastIpListId: S.optional(S.String),
          TenantConfig: S.optional(__S(357, __c11, 5)),
          ConnectionMode: S.optional(S.String),
          ViewerMtlsConfig: S.optional(__S(335, __c10, 15)),
          ConnectionFunctionAssociation: S.optional(__S(336, __c10, 16)),
          CacheTagConfig: S.optional(__S(358, __c11, 6)),
        }),
      ).annotate({ identifier: "DistributionConfig" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CNAME: S.optional(S.String), ICPRecordalStatus: S.optional(S.String) }),
      ).annotate({ identifier: "AliasICPRecordal" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(384, __c12, 0)
          .pipe(/*@__PURE__*/ T.XmlName("AliasICPRecordal"))
          .annotate({ identifier: "AliasICPRecordal" }),
      );
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KeyGroupId: S.optional(S.String), KeyPairIds: S.optional(__S(225, __c7, 1)) }),
      ).annotate({ identifier: "KGKeyPairIds" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(416, __c13, 0)
          .pipe(/*@__PURE__*/ T.XmlName("KeyGroup"))
          .annotate({ identifier: "KGKeyPairIds" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, Quantity: S.Number, Items: S.optional(__S(417, __c13, 1)) }),
      ).annotate({ identifier: "ActiveTrustedKeyGroups" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          ARN: S.String,
          Status: S.String,
          LastModifiedTime: T.DateFromString,
          InProgressInvalidationBatches: S.Number,
          DomainName: S.String,
          ActiveTrustedSigners: S.optional(__S(228, __c7, 4)),
          ActiveTrustedKeyGroups: S.optional(__S(418, __c13, 2)),
          DistributionConfig: __S(359, __c11, 7),
          AliasICPRecordals: S.optional(__S(385, __c12, 1)),
        }),
      ).annotate({ identifier: "Distribution" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          IpCount: S.Number,
          Tags: S.optional(__S(482, __c15, 2)),
          IpAddressType: S.optional(S.String),
          IpamCidrConfigs: S.optional(__S(513, __c16, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/anycast-ip-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAnycastIpListRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AnycastIpList: S.optional(__S(545, __c17, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "AnycastIpList" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateAnycastIpListResult" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(480, __c15, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "Tag" }),
      );
    case 2:
      return S.suspend(() => S.Struct({ Items: S.optional(__S(481, __c15, 1)) })).annotate({
        identifier: "Tags",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Cidr: S.String,
          IpamPoolArn: S.String,
          AnycastIp: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "IpamCidrConfig" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(512, __c16, 0)
          .pipe(/*@__PURE__*/ T.XmlName("IpamCidrConfig"))
          .annotate({ identifier: "IpamCidrConfig" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, IpamCidrConfigs: __S(513, __c16, 1) }),
      ).annotate({ identifier: "IpamConfig" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AnycastIp")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.String,
          Status: S.String,
          Arn: S.String,
          IpAddressType: S.optional(S.String),
          IpamConfig: S.optional(__S(514, __c16, 2)),
          AnycastIps: __S(544, __c17, 0),
          IpCount: S.Number,
          LastModifiedTime: T.DateFromString,
        }),
      ).annotate({ identifier: "AnycastIpList" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CachePolicyConfig: __S(644, __c20, 4)
            .pipe(T.HttpPayload(), T.XmlName("CachePolicyConfig"))
            .annotate({ identifier: "CachePolicyConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/cache-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCachePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CachePolicy: S.optional(__S(672, __c21, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CachePolicy" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateCachePolicyResult" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Name")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(608, __c19, 0)) }),
      ).annotate({ identifier: "QueryStringNames" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HeaderBehavior: S.String, Headers: S.optional(__S(131, __c4, 3)) }),
      ).annotate({ identifier: "CachePolicyHeadersConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CookieBehavior: S.String, Cookies: S.optional(__S(129, __c4, 1)) }),
      ).annotate({ identifier: "CachePolicyCookiesConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({ QueryStringBehavior: S.String, QueryStrings: S.optional(__S(609, __c19, 1)) }),
      ).annotate({ identifier: "CachePolicyQueryStringsConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          EnableAcceptEncodingGzip: S.Boolean,
          EnableAcceptEncodingBrotli: S.optional(S.Boolean),
          HeadersConfig: __S(640, __c20, 0),
          CookiesConfig: __S(641, __c20, 1),
          QueryStringsConfig: __S(642, __c20, 2),
        }),
      ).annotate({ identifier: "ParametersInCacheKeyAndForwardedToOrigin" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Comment: S.optional(S.String),
          Name: S.String,
          DefaultTTL: S.optional(S.Number),
          MaxTTL: S.optional(S.Number),
          MinTTL: S.Number,
          ParametersInCacheKeyAndForwardedToOrigin: S.optional(__S(643, __c20, 3)),
        }),
      ).annotate({ identifier: "CachePolicyConfig" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          LastModifiedTime: T.DateFromString,
          CachePolicyConfig: __S(644, __c20, 4),
        }),
      ).annotate({ identifier: "CachePolicy" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudFrontOriginAccessIdentityConfig: __S(736, __c23, 0)
            .pipe(T.HttpPayload(), T.XmlName("CloudFrontOriginAccessIdentityConfig"))
            .annotate({ identifier: "CloudFrontOriginAccessIdentityConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/origin-access-identity/cloudfront" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCloudFrontOriginAccessIdentityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CloudFrontOriginAccessIdentity: S.optional(__S(768, __c24, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CloudFrontOriginAccessIdentity" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateCloudFrontOriginAccessIdentityResult" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CallerReference: S.String, Comment: S.String })).annotate({
        identifier: "CloudFrontOriginAccessIdentityConfig",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          S3CanonicalUserId: S.String,
          CloudFrontOriginAccessIdentityConfig: S.optional(__S(736, __c23, 0)),
        }),
      ).annotate({ identifier: "CloudFrontOriginAccessIdentity" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ConnectionFunctionConfig: __S(835, __c26, 3),
          ConnectionFunctionCode: SensitiveBlob,
          Tags: S.optional(__S(482, __c15, 2)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/connection-function" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConnectionFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionFunctionSummary: S.optional(__S(864, __c27, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ConnectionFunctionSummary" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateConnectionFunctionResult" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ KeyValueStoreARN: S.String })).annotate({
        identifier: "KeyValueStoreAssociation",
      });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(832, __c26, 0)
          .pipe(/*@__PURE__*/ T.XmlName("KeyValueStoreAssociation"))
          .annotate({ identifier: "KeyValueStoreAssociation" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(833, __c26, 1)) }),
      ).annotate({ identifier: "KeyValueStoreAssociations" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Comment: S.optional(S.String),
          Runtime: S.String,
          KeyValueStoreAssociations: S.optional(__S(834, __c26, 2)),
        }),
      ).annotate({ identifier: "FunctionConfig" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Id: S.String,
          ConnectionFunctionConfig: __S(835, __c26, 3),
          ConnectionFunctionArn: S.String,
          Status: S.String,
          Stage: S.String,
          CreatedTime: T.DateFromString,
          LastModifiedTime: T.DateFromString,
        }),
      ).annotate({ identifier: "ConnectionFunctionSummary" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Ipv6Enabled: S.optional(S.Boolean),
          Tags: S.optional(__S(482, __c15, 2)),
          AnycastIpListId: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/connection-group" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConnectionGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionGroup: S.optional(__S(928, __c29, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ConnectionGroup" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateConnectionGroupResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          CreatedTime: S.optional(T.DateFromString),
          LastModifiedTime: S.optional(T.DateFromString),
          Tags: S.optional(__S(482, __c15, 2)),
          Ipv6Enabled: S.optional(S.Boolean),
          RoutingEndpoint: S.optional(S.String),
          AnycastIpListId: S.optional(S.String),
          Status: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
          IsDefault: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ConnectionGroup" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContinuousDeploymentPolicyConfig: __S(998, __c31, 6)
            .pipe(T.HttpPayload(), T.XmlName("ContinuousDeploymentPolicyConfig"))
            .annotate({ identifier: "ContinuousDeploymentPolicyConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/continuous-deployment-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateContinuousDeploymentPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContinuousDeploymentPolicy: S.optional(__S(1024, __c32, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ContinuousDeploymentPolicy" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateContinuousDeploymentPolicyResult" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("DnsName")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(992, __c31, 0)) }),
      ).annotate({ identifier: "StagingDistributionDnsNames" });
    case 2:
      return S.suspend(() => S.Struct({ IdleTTL: S.Number, MaximumTTL: S.Number })).annotate({
        identifier: "SessionStickinessConfig",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ Weight: S.Number, SessionStickinessConfig: S.optional(__S(994, __c31, 2)) }),
      ).annotate({ identifier: "ContinuousDeploymentSingleWeightConfig" });
    case 4:
      return S.suspend(() => S.Struct({ Header: S.String, Value: S.String })).annotate({
        identifier: "ContinuousDeploymentSingleHeaderConfig",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          SingleWeightConfig: S.optional(__S(995, __c31, 3)),
          SingleHeaderConfig: S.optional(__S(996, __c31, 4)),
          Type: S.String,
        }),
      ).annotate({ identifier: "TrafficConfig" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          StagingDistributionDnsNames: __S(993, __c31, 1),
          Enabled: S.Boolean,
          TrafficConfig: S.optional(__S(997, __c31, 5)),
        }),
      ).annotate({ identifier: "ContinuousDeploymentPolicyConfig" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          LastModifiedTime: T.DateFromString,
          ContinuousDeploymentPolicyConfig: __S(998, __c31, 6),
        }),
      ).annotate({ identifier: "ContinuousDeploymentPolicy" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DistributionConfig: __S(359, __c11, 7)
            .pipe(T.HttpPayload(), T.XmlName("DistributionConfig"))
            .annotate({ identifier: "DistributionConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/distribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDistributionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Distribution: S.optional(__S(419, __c13, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "Distribution" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateDistributionResult" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DistributionId: S.String,
          Name: S.String,
          Domains: __S(1185, __c37, 1),
          Tags: S.optional(__S(482, __c15, 2)),
          Customizations: S.optional(__S(1123, __c35, 3)),
          Parameters: S.optional(__S(1153, __c36, 1)),
          ConnectionGroupId: S.optional(S.String),
          ManagedCertificateRequest: S.optional(__S(1186, __c37, 2)),
          Enabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/distribution-tenant" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDistributionTenantRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionTenant: S.optional(__S(1154, __c36, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionTenant" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateDistributionTenantResult" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Action: S.String, Arn: S.optional(S.String) })).annotate({
        identifier: "WebAclCustomization",
      });
    case 1:
      return S.suspend(() => S.Struct({ Arn: S.String })).annotate({ identifier: "Certificate" });
    case 2:
      return S.suspend(() =>
        S.Struct({ RestrictionType: S.String, Locations: S.optional(__S(160, __c5, 0)) }),
      ).annotate({ identifier: "GeoRestrictionCustomization" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          WebAcl: S.optional(__S(1120, __c35, 0)),
          Certificate: S.optional(__S(1121, __c35, 1)),
          GeoRestrictions: S.optional(__S(1122, __c35, 2)),
        }),
      ).annotate({ identifier: "Customizations" });
    case 4:
      return S.suspend(() => S.Struct({ Domain: S.String, Status: S.optional(S.String) })).annotate(
        { identifier: "DomainResult" },
      );
    case 5:
      return S.Array(__S(1124, __c35, 4));
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "Parameter",
      });
    case 1:
      return S.Array(__S(1152, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          DistributionId: S.optional(S.String),
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Domains: S.optional(__S(1125, __c35, 5)),
          Tags: S.optional(__S(482, __c15, 2)),
          Customizations: S.optional(__S(1123, __c35, 3)),
          Parameters: S.optional(__S(1153, __c36, 1)),
          ConnectionGroupId: S.optional(S.String),
          CreatedTime: S.optional(T.DateFromString),
          LastModifiedTime: S.optional(T.DateFromString),
          Enabled: S.optional(S.Boolean),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DistributionTenant" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Domain: S.String })).annotate({ identifier: "DomainItem" });
    case 1:
      return S.Array(__S(1184, __c37, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ValidationTokenHost: S.String,
          PrimaryDomainName: S.optional(S.String),
          CertificateTransparencyLoggingPreference: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedCertificateRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DistributionConfig: __S(359, __c11, 7), Tags: __S(482, __c15, 2) }),
      ).annotate({ identifier: "DistributionConfigWithTags" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionConfigWithTags: __S(1216, __c38, 0)
            .pipe(T.HttpPayload(), T.XmlName("DistributionConfigWithTags"))
            .annotate({ identifier: "DistributionConfigWithTags" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/distribution?WithTags" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDistributionWithTagsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Distribution: S.optional(__S(419, __c13, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "Distribution" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateDistributionWithTagsResult" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryptionConfig: __S(1312, __c41, 0)
            .pipe(T.HttpPayload(), T.XmlName("FieldLevelEncryptionConfig"))
            .annotate({ identifier: "FieldLevelEncryptionConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/field-level-encryption" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFieldLevelEncryptionConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryption: S.optional(__S(1344, __c42, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FieldLevelEncryption" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateFieldLevelEncryptionConfigResult" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ QueryArg: S.String, ProfileId: S.String })).annotate({
        identifier: "QueryArgProfile",
      });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1280, __c40, 0)
          .pipe(/*@__PURE__*/ T.XmlName("QueryArgProfile"))
          .annotate({ identifier: "QueryArgProfile" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(1281, __c40, 1)) }),
      ).annotate({ identifier: "QueryArgProfiles" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ForwardWhenQueryArgProfileIsUnknown: S.Boolean,
          QueryArgProfiles: S.optional(__S(1282, __c40, 2)),
        }),
      ).annotate({ identifier: "QueryArgProfileConfig" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Format: S.String, ProfileId: S.optional(S.String), ContentType: S.String }),
      ).annotate({ identifier: "ContentTypeProfile" });
    case 5:
      return S.Array(
        /*@__PURE__*/ __S(1284, __c40, 4)
          .pipe(/*@__PURE__*/ T.XmlName("ContentTypeProfile"))
          .annotate({ identifier: "ContentTypeProfile" }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(1285, __c40, 5)) }),
      ).annotate({ identifier: "ContentTypeProfiles" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          ForwardWhenContentTypeIsUnknown: S.Boolean,
          ContentTypeProfiles: S.optional(__S(1286, __c40, 6)),
        }),
      ).annotate({ identifier: "ContentTypeProfileConfig" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CallerReference: S.String,
          Comment: S.optional(S.String),
          QueryArgProfileConfig: S.optional(__S(1283, __c40, 3)),
          ContentTypeProfileConfig: S.optional(__S(1287, __c40, 7)),
        }),
      ).annotate({ identifier: "FieldLevelEncryptionConfig" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          LastModifiedTime: T.DateFromString,
          FieldLevelEncryptionConfig: __S(1312, __c41, 0),
        }),
      ).annotate({ identifier: "FieldLevelEncryption" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryptionProfileConfig: __S(1440, __c45, 0)
            .pipe(T.HttpPayload(), T.XmlName("FieldLevelEncryptionProfileConfig"))
            .annotate({ identifier: "FieldLevelEncryptionProfileConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/field-level-encryption-profile" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFieldLevelEncryptionProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryptionProfile: S.optional(__S(1472, __c46, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FieldLevelEncryptionProfile" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateFieldLevelEncryptionProfileResult" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("FieldPattern")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(1408, __c44, 0)) }),
      ).annotate({ identifier: "FieldPatterns" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          PublicKeyId: S.String,
          ProviderId: S.String,
          FieldPatterns: __S(1409, __c44, 1),
        }),
      ).annotate({ identifier: "EncryptionEntity" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(1410, __c44, 2)
          .pipe(/*@__PURE__*/ T.XmlName("EncryptionEntity"))
          .annotate({ identifier: "EncryptionEntity" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(1411, __c44, 3)) }),
      ).annotate({ identifier: "EncryptionEntities" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          CallerReference: S.String,
          Comment: S.optional(S.String),
          EncryptionEntities: __S(1412, __c44, 4),
        }),
      ).annotate({ identifier: "FieldLevelEncryptionProfileConfig" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          LastModifiedTime: T.DateFromString,
          FieldLevelEncryptionProfileConfig: __S(1440, __c45, 0),
        }),
      ).annotate({ identifier: "FieldLevelEncryptionProfile" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          FunctionConfig: __S(835, __c26, 3),
          FunctionCode: SensitiveBlob,
          Tags: S.optional(__S(482, __c15, 2)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/function" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionSummary: S.optional(__S(1537, __c48, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FunctionSummary" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateFunctionResult" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionARN: S.String,
          Stage: S.optional(S.String),
          CreatedTime: S.optional(T.DateFromString),
          LastModifiedTime: T.DateFromString,
        }),
      ).annotate({ identifier: "FunctionMetadata" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Status: S.optional(S.String),
          FunctionConfig: __S(835, __c26, 3),
          FunctionMetadata: __S(1536, __c48, 0),
        }),
      ).annotate({ identifier: "FunctionSummary" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DistributionId: S.String.pipe(T.HttpLabel("DistributionId")),
          InvalidationBatch: __S(1602, __c50, 2)
            .pipe(T.HttpPayload(), T.XmlName("InvalidationBatch"))
            .annotate({ identifier: "InvalidationBatch" }),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2020-05-31/distribution/{DistributionId}/invalidation",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateInvalidationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          Invalidation: S.optional(__S(1603, __c50, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "Invalidation" }),
        }).pipe(ns),
      ).annotate({ identifier: "CreateInvalidationResult" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Path")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(1600, __c50, 0)) }),
      ).annotate({ identifier: "Paths" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Paths: __S(1601, __c50, 1), CallerReference: S.String }),
      ).annotate({ identifier: "InvalidationBatch" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Status: S.String,
          CreateTime: T.DateFromString,
          InvalidationBatch: __S(1602, __c50, 2),
        }),
      ).annotate({ identifier: "Invalidation" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          InvalidationBatch: __S(1602, __c50, 2)
            .pipe(T.HttpPayload(), T.XmlName("InvalidationBatch"))
            .annotate({ identifier: "InvalidationBatch" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/distribution-tenant/{Id}/invalidation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateInvalidationForDistributionTenantRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          Invalidation: S.optional(__S(1603, __c50, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "Invalidation" }),
        }).pipe(ns),
      ).annotate({ identifier: "CreateInvalidationForDistributionTenantResult" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyGroupConfig: __S(1697, __c53, 1)
            .pipe(T.HttpPayload(), T.XmlName("KeyGroupConfig"))
            .annotate({ identifier: "KeyGroupConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/key-group" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKeyGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyGroup: S.optional(__S(1728, __c54, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "KeyGroup" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateKeyGroupResult" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("PublicKey")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Items: __S(1696, __c53, 0), Comment: S.optional(S.String) }),
      ).annotate({ identifier: "KeyGroupConfig" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          LastModifiedTime: T.DateFromString,
          KeyGroupConfig: __S(1697, __c53, 1),
        }),
      ).annotate({ identifier: "KeyGroup" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SourceType: S.String, SourceARN: S.String })).annotate({
        identifier: "ImportSource",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Comment: S.optional(S.String),
          ImportSource: S.optional(__S(1760, __c55, 0)),
          Tags: S.optional(__S(482, __c15, 2)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/key-value-store" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKeyValueStoreRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          KeyValueStore: S.optional(__S(1792, __c56, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "KeyValueStore" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateKeyValueStoreResult" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Id: S.String,
          Comment: S.optional(S.String),
          ARN: S.String,
          Status: S.optional(S.String),
          LastModifiedTime: T.DateFromString,
        }),
      ).annotate({ identifier: "KeyValueStore" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DistributionId: S.String.pipe(T.HttpLabel("DistributionId")),
          MonitoringSubscription: __S(1857, __c58, 1)
            .pipe(T.HttpPayload(), T.XmlName("MonitoringSubscription"))
            .annotate({ identifier: "MonitoringSubscription" }),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2020-05-31/distributions/{DistributionId}/monitoring-subscription",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMonitoringSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MonitoringSubscription: S.optional(__S(1857, __c58, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "MonitoringSubscription" }),
        }).pipe(ns),
      ).annotate({ identifier: "CreateMonitoringSubscriptionResult" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RealtimeMetricsSubscriptionStatus: S.String })).annotate({
        identifier: "RealtimeMetricsSubscriptionConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ RealtimeMetricsSubscriptionConfig: S.optional(__S(1856, __c58, 0)) }),
      ).annotate({ identifier: "MonitoringSubscription" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OriginAccessControlConfig: __S(1920, __c60, 0)
            .pipe(T.HttpPayload(), T.XmlName("OriginAccessControlConfig"))
            .annotate({ identifier: "OriginAccessControlConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/origin-access-control" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateOriginAccessControlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OriginAccessControl: S.optional(__S(1952, __c61, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "OriginAccessControl" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateOriginAccessControlResult" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          SigningProtocol: S.String,
          SigningBehavior: S.String,
          OriginAccessControlOriginType: S.String,
        }),
      ).annotate({ identifier: "OriginAccessControlConfig" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, OriginAccessControlConfig: S.optional(__S(1920, __c60, 0)) }),
      ).annotate({ identifier: "OriginAccessControl" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OriginRequestPolicyConfig: __S(2019, __c63, 3)
            .pipe(T.HttpPayload(), T.XmlName("OriginRequestPolicyConfig"))
            .annotate({ identifier: "OriginRequestPolicyConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/origin-request-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateOriginRequestPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OriginRequestPolicy: S.optional(__S(2048, __c64, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "OriginRequestPolicy" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateOriginRequestPolicyResult" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HeaderBehavior: S.String, Headers: S.optional(__S(131, __c4, 3)) }),
      ).annotate({ identifier: "OriginRequestPolicyHeadersConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CookieBehavior: S.String, Cookies: S.optional(__S(129, __c4, 1)) }),
      ).annotate({ identifier: "OriginRequestPolicyCookiesConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({ QueryStringBehavior: S.String, QueryStrings: S.optional(__S(609, __c19, 1)) }),
      ).annotate({ identifier: "OriginRequestPolicyQueryStringsConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Comment: S.optional(S.String),
          Name: S.String,
          HeadersConfig: __S(2016, __c63, 0),
          CookiesConfig: __S(2017, __c63, 1),
          QueryStringsConfig: __S(2018, __c63, 2),
        }),
      ).annotate({ identifier: "OriginRequestPolicyConfig" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          LastModifiedTime: T.DateFromString,
          OriginRequestPolicyConfig: __S(2019, __c63, 3),
        }),
      ).annotate({ identifier: "OriginRequestPolicy" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PublicKeyConfig: __S(2112, __c66, 0)
            .pipe(T.HttpPayload(), T.XmlName("PublicKeyConfig"))
            .annotate({ identifier: "PublicKeyConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/public-key" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePublicKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PublicKey: S.optional(__S(2144, __c67, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "PublicKey" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreatePublicKeyResult" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CallerReference: S.String,
          Name: S.String,
          EncodedKey: S.String,
          Comment: S.optional(S.String),
        }),
      ).annotate({ identifier: "PublicKeyConfig" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          CreatedTime: T.DateFromString,
          PublicKeyConfig: __S(2112, __c66, 0),
        }),
      ).annotate({ identifier: "PublicKey" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EndPoints: __S(2210, __c69, 2),
          Fields: __S(2211, __c69, 3),
          Name: S.String,
          SamplingRate: S.Number,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/realtime-log-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRealtimeLogConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RealtimeLogConfig: S.optional(__S(2212, __c69, 4)) }).pipe(ns),
      ).annotate({ identifier: "CreateRealtimeLogConfigResult" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RoleARN: S.String, StreamARN: S.String })).annotate({
        identifier: "KinesisStreamConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ StreamType: S.String, KinesisStreamConfig: S.optional(__S(2208, __c69, 0)) }),
      ).annotate({ identifier: "EndPoint" });
    case 2:
      return S.Array(__S(2209, __c69, 1));
    case 3:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Field")));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ARN: S.String,
          Name: S.String,
          SamplingRate: S.Number,
          EndPoints: __S(2210, __c69, 2),
          Fields: __S(2211, __c69, 3),
        }),
      ).annotate({ identifier: "RealtimeLogConfig" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResponseHeadersPolicyConfig: __S(2295, __c71, 23)
            .pipe(T.HttpPayload(), T.XmlName("ResponseHeadersPolicyConfig"))
            .annotate({ identifier: "ResponseHeadersPolicyConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/response-headers-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateResponseHeadersPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResponseHeadersPolicy: S.optional(__S(2304, __c72, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ResponseHeadersPolicy" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateResponseHeadersPolicyResult" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Origin")));
    case 1:
      return S.suspend(() => S.Struct({ Quantity: S.Number, Items: __S(2272, __c71, 0) })).annotate(
        { identifier: "ResponseHeadersPolicyAccessControlAllowOrigins" },
      );
    case 2:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Header")));
    case 3:
      return S.suspend(() => S.Struct({ Quantity: S.Number, Items: __S(2274, __c71, 2) })).annotate(
        { identifier: "ResponseHeadersPolicyAccessControlAllowHeaders" },
      );
    case 4:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Method")));
    case 5:
      return S.suspend(() => S.Struct({ Quantity: S.Number, Items: __S(2276, __c71, 4) })).annotate(
        { identifier: "ResponseHeadersPolicyAccessControlAllowMethods" },
      );
    case 6:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Header")));
    case 7:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(2278, __c71, 6)) }),
      ).annotate({ identifier: "ResponseHeadersPolicyAccessControlExposeHeaders" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          AccessControlAllowOrigins: __S(2273, __c71, 1),
          AccessControlAllowHeaders: __S(2275, __c71, 3),
          AccessControlAllowMethods: __S(2277, __c71, 5),
          AccessControlAllowCredentials: S.Boolean,
          AccessControlExposeHeaders: S.optional(__S(2279, __c71, 7)),
          AccessControlMaxAgeSec: S.optional(S.Number),
          OriginOverride: S.Boolean,
        }),
      ).annotate({ identifier: "ResponseHeadersPolicyCorsConfig" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Override: S.Boolean,
          Protection: S.Boolean,
          ModeBlock: S.optional(S.Boolean),
          ReportUri: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResponseHeadersPolicyXSSProtection" });
    case 10:
      return S.suspend(() => S.Struct({ Override: S.Boolean, FrameOption: S.String })).annotate({
        identifier: "ResponseHeadersPolicyFrameOptions",
      });
    case 11:
      return S.suspend(() => S.Struct({ Override: S.Boolean, ReferrerPolicy: S.String })).annotate({
        identifier: "ResponseHeadersPolicyReferrerPolicy",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({ Override: S.Boolean, ContentSecurityPolicy: S.String }),
      ).annotate({ identifier: "ResponseHeadersPolicyContentSecurityPolicy" });
    case 13:
      return S.suspend(() => S.Struct({ Override: S.Boolean })).annotate({
        identifier: "ResponseHeadersPolicyContentTypeOptions",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Override: S.Boolean,
          IncludeSubdomains: S.optional(S.Boolean),
          Preload: S.optional(S.Boolean),
          AccessControlMaxAgeSec: S.Number,
        }),
      ).annotate({ identifier: "ResponseHeadersPolicyStrictTransportSecurity" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          XSSProtection: S.optional(__S(2281, __c71, 9)),
          FrameOptions: S.optional(__S(2282, __c71, 10)),
          ReferrerPolicy: S.optional(__S(2283, __c71, 11)),
          ContentSecurityPolicy: S.optional(__S(2284, __c71, 12)),
          ContentTypeOptions: S.optional(__S(2285, __c71, 13)),
          StrictTransportSecurity: S.optional(__S(2286, __c71, 14)),
        }),
      ).annotate({ identifier: "ResponseHeadersPolicySecurityHeadersConfig" });
    case 16:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, SamplingRate: S.optional(S.Number) }),
      ).annotate({ identifier: "ResponseHeadersPolicyServerTimingHeadersConfig" });
    case 17:
      return S.suspend(() =>
        S.Struct({ Header: S.String, Value: S.String, Override: S.Boolean }),
      ).annotate({ identifier: "ResponseHeadersPolicyCustomHeader" });
    case 18:
      return S.Array(
        /*@__PURE__*/ __S(2289, __c71, 17)
          .pipe(/*@__PURE__*/ T.XmlName("ResponseHeadersPolicyCustomHeader"))
          .annotate({ identifier: "ResponseHeadersPolicyCustomHeader" }),
      );
    case 19:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(2290, __c71, 18)) }),
      ).annotate({ identifier: "ResponseHeadersPolicyCustomHeadersConfig" });
    case 20:
      return S.suspend(() => S.Struct({ Header: S.String })).annotate({
        identifier: "ResponseHeadersPolicyRemoveHeader",
      });
    case 21:
      return S.Array(
        /*@__PURE__*/ __S(2292, __c71, 20)
          .pipe(/*@__PURE__*/ T.XmlName("ResponseHeadersPolicyRemoveHeader"))
          .annotate({ identifier: "ResponseHeadersPolicyRemoveHeader" }),
      );
    case 22:
      return S.suspend(() =>
        S.Struct({ Quantity: S.Number, Items: S.optional(__S(2293, __c71, 21)) }),
      ).annotate({ identifier: "ResponseHeadersPolicyRemoveHeadersConfig" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          Comment: S.optional(S.String),
          Name: S.String,
          CorsConfig: S.optional(__S(2280, __c71, 8)),
          SecurityHeadersConfig: S.optional(__S(2287, __c71, 15)),
          ServerTimingHeadersConfig: S.optional(__S(2288, __c71, 16)),
          CustomHeadersConfig: S.optional(__S(2291, __c71, 19)),
          RemoveHeadersConfig: S.optional(__S(2294, __c71, 22)),
        }),
      ).annotate({ identifier: "ResponseHeadersPolicyConfig" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          LastModifiedTime: T.DateFromString,
          ResponseHeadersPolicyConfig: __S(2295, __c71, 23),
        }),
      ).annotate({ identifier: "ResponseHeadersPolicy" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamingDistributionConfig: __S(2401, __c75, 1)
            .pipe(T.HttpPayload(), T.XmlName("StreamingDistributionConfig"))
            .annotate({ identifier: "StreamingDistributionConfig" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/streaming-distribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateStreamingDistributionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamingDistribution: S.optional(__S(2432, __c76, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "StreamingDistribution" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateStreamingDistributionResult" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String, OriginAccessIdentity: S.String }),
      ).annotate({ identifier: "S3Origin" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, Bucket: S.String, Prefix: S.String }),
      ).annotate({ identifier: "StreamingLoggingConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CallerReference: S.String,
          S3Origin: __S(2368, __c74, 0),
          Aliases: S.optional(__S(193, __c6, 1)),
          Comment: S.String,
          Logging: S.optional(__S(2400, __c75, 0)),
          TrustedSigners: __S(195, __c6, 3),
          PriceClass: S.optional(S.String),
          Enabled: S.Boolean,
        }),
      ).annotate({ identifier: "StreamingDistributionConfig" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          ARN: S.String,
          Status: S.String,
          LastModifiedTime: S.optional(T.DateFromString),
          DomainName: S.String,
          ActiveTrustedSigners: __S(228, __c7, 4),
          StreamingDistributionConfig: __S(2401, __c75, 1),
        }),
      ).annotate({ identifier: "StreamingDistribution" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StreamingDistributionConfig: __S(2401, __c75, 1), Tags: __S(482, __c15, 2) }),
      ).annotate({ identifier: "StreamingDistributionConfigWithTags" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamingDistributionConfigWithTags: __S(2464, __c77, 0)
            .pipe(T.HttpPayload(), T.XmlName("StreamingDistributionConfigWithTags"))
            .annotate({ identifier: "StreamingDistributionConfigWithTags" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/streaming-distribution?WithTags" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateStreamingDistributionWithTagsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          StreamingDistribution: S.optional(__S(2432, __c76, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "StreamingDistribution" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateStreamingDistributionWithTagsResult" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          CaCertificatesBundleSource: __S(2561, __c80, 1),
          UseClientCertificateOCSPEndpoint: S.optional(S.Boolean),
          Tags: S.optional(__S(482, __c15, 2)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/trust-store" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTrustStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrustStore: S.optional(__S(2528, __c79, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "TrustStore" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateTrustStoreResult" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          NumberOfCaCertificates: S.optional(S.Number),
          LastModifiedTime: S.optional(T.DateFromString),
          Reason: S.optional(S.String),
          UseClientCertificateOCSPEndpoint: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TrustStore" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String,
          Key: S.String,
          Region: S.String,
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "CaCertificatesBundleS3Location" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ CaCertificatesBundleS3Location: __S(2560, __c80, 0) }),
      ]);
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcOriginEndpointConfig: __S(2624, __c82, 0),
          Tags: S.optional(__S(482, __c15, 2)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/vpc-origin" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVpcOriginRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcOrigin: S.optional(__S(2625, __c82, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "VpcOrigin" }),
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateVpcOriginResult" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Arn: S.String,
          HTTPPort: S.Number,
          HTTPSPort: S.Number,
          OriginProtocolPolicy: S.String,
          OriginSslProtocols: S.optional(__S(257, __c8, 1)),
        }),
      ).annotate({ identifier: "VpcOriginEndpointConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Arn: S.String,
          AccountId: S.optional(S.String),
          Status: S.String,
          CreatedTime: T.DateFromString,
          LastModifiedTime: T.DateFromString,
          VpcOriginEndpointConfig: __S(2624, __c82, 0),
        }),
      ).annotate({ identifier: "VpcOrigin" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/anycast-ip-list/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAnycastIpListRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAnycastIpListResponse",
      });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/cache-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCachePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteCachePolicyResponse",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/origin-access-identity/cloudfront/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCloudFrontOriginAccessIdentityRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteCloudFrontOriginAccessIdentityResponse",
      });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/connection-function/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectionFunctionRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteConnectionFunctionResponse",
      });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/connection-group/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectionGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteConnectionGroupResponse",
      });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/continuous-deployment-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteContinuousDeploymentPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteContinuousDeploymentPolicyResponse",
      });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/distribution/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDistributionRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteDistributionResponse",
      });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/distribution-tenant/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDistributionTenantRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteDistributionTenantResponse",
      });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/field-level-encryption/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFieldLevelEncryptionConfigRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteFieldLevelEncryptionConfigResponse",
      });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/field-level-encryption-profile/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFieldLevelEncryptionProfileRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteFieldLevelEncryptionProfileResponse",
      });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/function/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFunctionRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteFunctionResponse",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/key-group/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKeyGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteKeyGroupResponse",
      });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/key-value-store/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKeyValueStoreRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteKeyValueStoreResponse",
      });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DistributionId: S.String.pipe(T.HttpLabel("DistributionId")) }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/2020-05-31/distributions/{DistributionId}/monitoring-subscription",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMonitoringSubscriptionRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteMonitoringSubscriptionResult",
      });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/origin-access-control/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteOriginAccessControlRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteOriginAccessControlResponse",
      });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/origin-request-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteOriginRequestPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteOriginRequestPolicyResponse",
      });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/public-key/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePublicKeyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeletePublicKeyResponse",
      });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), ARN: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/delete-realtime-log-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRealtimeLogConfigRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteRealtimeLogConfigResponse",
      });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/delete-resource-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteResourcePolicyResponse",
      });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/response-headers-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResponseHeadersPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteResponseHeadersPolicyResponse",
      });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/streaming-distribution/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteStreamingDistributionRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteStreamingDistributionResponse",
      });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/trust-store/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTrustStoreRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteTrustStoreResponse",
      });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2020-05-31/vpc-origin/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVpcOriginRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcOrigin: S.optional(__S(2625, __c82, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "VpcOrigin" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteVpcOriginResult" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Stage: S.optional(S.String).pipe(T.HttpQuery("Stage")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/connection-function/{Identifier}/describe" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeConnectionFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionFunctionSummary: S.optional(__S(864, __c27, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ConnectionFunctionSummary" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConnectionFunctionResult" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Stage: S.optional(S.String).pipe(T.HttpQuery("Stage")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/function/{Name}/describe" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionSummary: S.optional(__S(1537, __c48, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FunctionSummary" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeFunctionResult" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/key-value-store/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeKeyValueStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyValueStore: S.optional(__S(1792, __c56, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "KeyValueStore" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeKeyValueStoreResult" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "PUT",
              uri: "/2020-05-31/distribution-tenant/{Id}/disassociate-web-acl",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateDistributionTenantWebACLRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "DisassociateDistributionTenantWebACLResult" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/distribution/{Id}/disassociate-web-acl" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateDistributionWebACLRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "DisassociateDistributionWebACLResult" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/anycast-ip-list/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAnycastIpListRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AnycastIpList: S.optional(__S(545, __c17, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "AnycastIpList" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetAnycastIpListResult" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/cache-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCachePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CachePolicy: S.optional(__S(672, __c21, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CachePolicy" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetCachePolicyResult" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/cache-policy/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCachePolicyConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CachePolicyConfig: S.optional(__S(644, __c20, 4))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CachePolicyConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetCachePolicyConfigResult" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/origin-access-identity/cloudfront/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCloudFrontOriginAccessIdentityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CloudFrontOriginAccessIdentity: S.optional(__S(768, __c24, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CloudFrontOriginAccessIdentity" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetCloudFrontOriginAccessIdentityResult" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/origin-access-identity/cloudfront/{Id}/config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCloudFrontOriginAccessIdentityConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CloudFrontOriginAccessIdentityConfig: S.optional(__S(736, __c23, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CloudFrontOriginAccessIdentityConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetCloudFrontOriginAccessIdentityConfigResult" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          Stage: S.optional(S.String).pipe(T.HttpQuery("Stage")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/connection-function/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectionFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionFunctionCode: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
        }).pipe(ns),
      ).annotate({ identifier: "GetConnectionFunctionResult" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/connection-group/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectionGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionGroup: S.optional(__S(928, __c29, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ConnectionGroup" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetConnectionGroupResult" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RoutingEndpoint: S.String.pipe(T.HttpQuery("RoutingEndpoint")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/connection-group" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectionGroupByRoutingEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionGroup: S.optional(__S(928, __c29, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ConnectionGroup" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetConnectionGroupByRoutingEndpointResult" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/continuous-deployment-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContinuousDeploymentPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContinuousDeploymentPolicy: S.optional(__S(1024, __c32, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ContinuousDeploymentPolicy" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetContinuousDeploymentPolicyResult" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/continuous-deployment-policy/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContinuousDeploymentPolicyConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContinuousDeploymentPolicyConfig: S.optional(__S(998, __c31, 6))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ContinuousDeploymentPolicyConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetContinuousDeploymentPolicyConfigResult" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/distribution/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDistributionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Distribution: S.optional(__S(419, __c13, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "Distribution" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetDistributionResult" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/distribution/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDistributionConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionConfig: S.optional(__S(359, __c11, 7))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetDistributionConfigResult" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/distribution-tenant/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDistributionTenantRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionTenant: S.optional(__S(1154, __c36, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionTenant" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetDistributionTenantResult" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Domain: S.String.pipe(T.HttpQuery("domain")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/distribution-tenant" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDistributionTenantByDomainRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionTenant: S.optional(__S(1154, __c36, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionTenant" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetDistributionTenantByDomainResult" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/field-level-encryption/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFieldLevelEncryptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryption: S.optional(__S(1344, __c42, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FieldLevelEncryption" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetFieldLevelEncryptionResult" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/field-level-encryption/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFieldLevelEncryptionConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryptionConfig: S.optional(__S(1312, __c41, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FieldLevelEncryptionConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetFieldLevelEncryptionConfigResult" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/field-level-encryption-profile/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFieldLevelEncryptionProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryptionProfile: S.optional(__S(1472, __c46, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FieldLevelEncryptionProfile" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetFieldLevelEncryptionProfileResult" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/field-level-encryption-profile/{Id}/config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFieldLevelEncryptionProfileConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryptionProfileConfig: S.optional(__S(1440, __c45, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FieldLevelEncryptionProfileConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetFieldLevelEncryptionProfileConfigResult" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Stage: S.optional(S.String).pipe(T.HttpQuery("Stage")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/function/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionCode: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
        }).pipe(ns),
      ).annotate({ identifier: "GetFunctionResult" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DistributionId: S.String.pipe(T.HttpLabel("DistributionId")),
          Id: S.String.pipe(T.HttpLabel("Id")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/distribution/{DistributionId}/invalidation/{Id}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInvalidationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Invalidation: S.optional(__S(1603, __c50, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "Invalidation" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetInvalidationResult" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DistributionTenantId: S.String.pipe(T.HttpLabel("DistributionTenantId")),
          Id: S.String.pipe(T.HttpLabel("Id")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/distribution-tenant/{DistributionTenantId}/invalidation/{Id}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInvalidationForDistributionTenantRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Invalidation: S.optional(__S(1603, __c50, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "Invalidation" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetInvalidationForDistributionTenantResult" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/key-group/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKeyGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyGroup: S.optional(__S(1728, __c54, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "KeyGroup" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetKeyGroupResult" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/key-group/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKeyGroupConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyGroupConfig: S.optional(__S(1697, __c53, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "KeyGroupConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetKeyGroupConfigResult" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/managed-certificate/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedCertificateDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Domain: S.String,
          RedirectTo: S.optional(S.String),
          RedirectFrom: S.optional(S.String),
        }),
      ).annotate({ identifier: "ValidationTokenDetail" });
    case 2:
      return S.Array(__S(4289, __c134, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          CertificateStatus: S.optional(S.String),
          ValidationTokenHost: S.optional(S.String),
          ValidationTokenDetails: S.optional(__S(4290, __c134, 2)),
        }),
      ).annotate({ identifier: "ManagedCertificateDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ManagedCertificateDetails: S.optional(__S(4291, __c134, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ManagedCertificateDetails" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetManagedCertificateDetailsResult" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DistributionId: S.String.pipe(T.HttpLabel("DistributionId")) }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/distributions/{DistributionId}/monitoring-subscription",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMonitoringSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MonitoringSubscription: S.optional(__S(1857, __c58, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "MonitoringSubscription" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetMonitoringSubscriptionResult" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/origin-access-control/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOriginAccessControlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OriginAccessControl: S.optional(__S(1952, __c61, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "OriginAccessControl" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetOriginAccessControlResult" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/origin-access-control/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOriginAccessControlConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OriginAccessControlConfig: S.optional(__S(1920, __c60, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "OriginAccessControlConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetOriginAccessControlConfigResult" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/origin-request-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOriginRequestPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OriginRequestPolicy: S.optional(__S(2048, __c64, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "OriginRequestPolicy" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetOriginRequestPolicyResult" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/origin-request-policy/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOriginRequestPolicyConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OriginRequestPolicyConfig: S.optional(__S(2019, __c63, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "OriginRequestPolicyConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetOriginRequestPolicyConfigResult" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/public-key/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPublicKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PublicKey: S.optional(__S(2144, __c67, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "PublicKey" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetPublicKeyResult" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/public-key/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPublicKeyConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PublicKeyConfig: S.optional(__S(2112, __c66, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "PublicKeyConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetPublicKeyConfigResult" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), ARN: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/get-realtime-log-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRealtimeLogConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RealtimeLogConfig: S.optional(__S(2212, __c69, 4)) }).pipe(ns),
      ).annotate({ identifier: "GetRealtimeLogConfigResult" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/get-resource-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), PolicyDocument: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "GetResourcePolicyResult" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/response-headers-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResponseHeadersPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResponseHeadersPolicy: S.optional(__S(2304, __c72, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ResponseHeadersPolicy" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetResponseHeadersPolicyResult" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/response-headers-policy/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResponseHeadersPolicyConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResponseHeadersPolicyConfig: S.optional(__S(2295, __c71, 23))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ResponseHeadersPolicyConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetResponseHeadersPolicyConfigResult" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/streaming-distribution/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStreamingDistributionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamingDistribution: S.optional(__S(2432, __c76, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "StreamingDistribution" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetStreamingDistributionResult" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/streaming-distribution/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStreamingDistributionConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamingDistributionConfig: S.optional(__S(2401, __c75, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "StreamingDistributionConfig" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetStreamingDistributionConfigResult" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/trust-store/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTrustStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrustStore: S.optional(__S(2528, __c79, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "TrustStore" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetTrustStoreResult" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/vpc-origin/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVpcOriginRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcOrigin: S.optional(__S(2625, __c82, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "VpcOrigin" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "GetVpcOriginResult" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/anycast-ip-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAnycastIpListsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.String,
          Status: S.String,
          Arn: S.String,
          IpCount: S.Number,
          LastModifiedTime: T.DateFromString,
          IpAddressType: S.optional(S.String),
          ETag: S.optional(S.String),
          IpamConfig: S.optional(__S(514, __c16, 2)),
        }),
      ).annotate({ identifier: "AnycastIpListSummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(4801, __c150, 1)
          .pipe(/*@__PURE__*/ T.XmlName("AnycastIpListSummary"))
          .annotate({ identifier: "AnycastIpListSummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Items: S.optional(__S(4802, __c150, 2)),
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          IsTruncated: S.Boolean,
          Quantity: S.Number,
        }),
      ).annotate({ identifier: "AnycastIpListCollection" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          AnycastIpLists: S.optional(__S(4803, __c150, 3))
            .pipe(T.HttpPayload(), T.XmlName("AnycastIpListCollection"))
            .annotate({ identifier: "AnycastIpListCollection" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListAnycastIpListsResult" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String).pipe(T.HttpQuery("Type")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/cache-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCachePoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Type: S.String, CachePolicy: __S(672, __c21, 0) }),
      ).annotate({ identifier: "CachePolicySummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(4833, __c151, 1)
          .pipe(/*@__PURE__*/ T.XmlName("CachePolicySummary"))
          .annotate({ identifier: "CachePolicySummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          Quantity: S.Number,
          Items: S.optional(__S(4834, __c151, 2)),
        }),
      ).annotate({ identifier: "CachePolicyList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CachePolicyList: S.optional(__S(4835, __c151, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CachePolicyList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListCachePoliciesResult" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/origin-access-identity/cloudfront" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCloudFrontOriginAccessIdentitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Id: S.String, S3CanonicalUserId: S.String, Comment: S.String }),
      ).annotate({ identifier: "CloudFrontOriginAccessIdentitySummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(4865, __c152, 1)
          .pipe(/*@__PURE__*/ T.XmlName("CloudFrontOriginAccessIdentitySummary"))
          .annotate({ identifier: "CloudFrontOriginAccessIdentitySummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          IsTruncated: S.Boolean,
          Quantity: S.Number,
          Items: S.optional(__S(4866, __c152, 2)),
        }),
      ).annotate({ identifier: "CloudFrontOriginAccessIdentityList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CloudFrontOriginAccessIdentityList: S.optional(__S(4867, __c152, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CloudFrontOriginAccessIdentityList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListCloudFrontOriginAccessIdentitiesResult" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DistributionId: S.String.pipe(T.HttpQuery("DistributionId")),
          Alias: S.String.pipe(T.HttpQuery("Alias")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/conflicting-alias" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConflictingAliasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Alias: S.optional(S.String),
          DistributionId: S.optional(S.String),
          AccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConflictingAlias" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(4897, __c153, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ConflictingAlias"))
          .annotate({ identifier: "ConflictingAlias" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          MaxItems: S.optional(S.Number),
          Quantity: S.optional(S.Number),
          Items: S.optional(__S(4898, __c153, 2)),
        }),
      ).annotate({ identifier: "ConflictingAliasesList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ConflictingAliasesList: S.optional(__S(4899, __c153, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ConflictingAliasesList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListConflictingAliasesResult" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          MaxItems: S.optional(S.Number),
          Stage: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/connection-functions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConnectionFunctionsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(864, __c27, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ConnectionFunctionSummary"))
          .annotate({ identifier: "ConnectionFunctionSummary" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          ConnectionFunctions: S.optional(__S(4929, __c154, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ListConnectionFunctionsResult" });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AnycastIpListId: S.optional(S.String) })).annotate({
        identifier: "ConnectionGroupAssociationFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssociationFilter: S.optional(__S(4960, __c155, 0)),
          Marker: S.optional(S.String),
          MaxItems: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/connection-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConnectionGroupsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.String,
          Arn: S.String,
          RoutingEndpoint: S.String,
          CreatedTime: T.DateFromString,
          LastModifiedTime: T.DateFromString,
          ETag: S.String,
          AnycastIpListId: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
          Status: S.optional(S.String),
          IsDefault: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ConnectionGroupSummary" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(4962, __c155, 2)
          .pipe(/*@__PURE__*/ T.XmlName("ConnectionGroupSummary"))
          .annotate({ identifier: "ConnectionGroupSummary" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          ConnectionGroups: S.optional(__S(4963, __c155, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "ListConnectionGroupsResult" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/continuous-deployment-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListContinuousDeploymentPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ContinuousDeploymentPolicy: __S(1024, __c32, 0) }),
      ).annotate({ identifier: "ContinuousDeploymentPolicySummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(4993, __c156, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ContinuousDeploymentPolicySummary"))
          .annotate({ identifier: "ContinuousDeploymentPolicySummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          Quantity: S.Number,
          Items: S.optional(__S(4994, __c156, 2)),
        }),
      ).annotate({ identifier: "ContinuousDeploymentPolicyList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ContinuousDeploymentPolicyList: S.optional(__S(4995, __c156, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ContinuousDeploymentPolicyList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListContinuousDeploymentPoliciesResult" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/distribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionList: S.optional(__S(5058, __c158, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsResult" });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          ARN: S.String,
          ETag: S.optional(S.String),
          Status: S.String,
          LastModifiedTime: T.DateFromString,
          DomainName: S.String,
          Aliases: __S(193, __c6, 1),
          Origins: __S(298, __c9, 10),
          OriginGroups: S.optional(__S(307, __c9, 19)),
          DefaultCacheBehavior: __S(324, __c10, 4),
          CacheBehaviors: __S(327, __c10, 7),
          CustomErrorResponses: __S(330, __c10, 10),
          Comment: SensitiveString,
          PriceClass: S.String,
          Enabled: S.Boolean,
          ViewerCertificate: __S(331, __c10, 11),
          Restrictions: __S(333, __c10, 13),
          WebACLId: S.optional(S.String),
          HttpVersion: S.String,
          IsIPV6Enabled: S.Boolean,
          AliasICPRecordals: S.optional(__S(385, __c12, 1)),
          Staging: S.Boolean,
          ConnectionMode: S.optional(S.String),
          AnycastIpListId: S.optional(S.String),
          ViewerMtlsConfig: S.optional(__S(335, __c10, 15)),
          ConnectionFunctionAssociation: S.optional(__S(336, __c10, 16)),
        }),
      ).annotate({ identifier: "DistributionSummary" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(5056, __c158, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DistributionSummary"))
          .annotate({ identifier: "DistributionSummary" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          IsTruncated: S.Boolean,
          Quantity: S.Number,
          Items: S.optional(__S(5057, __c158, 1)),
        }),
      ).annotate({ identifier: "DistributionList" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          AnycastIpListId: S.String.pipe(T.HttpLabel("AnycastIpListId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/distributionsByAnycastIpListId/{AnycastIpListId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByAnycastIpListIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionList: S.optional(__S(5058, __c158, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByAnycastIpListIdResult" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          CachePolicyId: S.String.pipe(T.HttpLabel("CachePolicyId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/distributionsByCachePolicyId/{CachePolicyId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByCachePolicyIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionIdList: S.optional(__S(5153, __c161, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionIdList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByCachePolicyIdResult" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("DistributionId")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          IsTruncated: S.Boolean,
          Quantity: S.Number,
          Items: S.optional(__S(5152, __c161, 0)),
        }),
      ).annotate({ identifier: "DistributionIdList" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          ConnectionFunctionIdentifier: S.String.pipe(T.HttpQuery("ConnectionFunctionIdentifier")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/distributionsByConnectionFunction" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByConnectionFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionList: S.optional(__S(5058, __c158, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByConnectionFunctionResult" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          ConnectionMode: S.String.pipe(T.HttpLabel("ConnectionMode")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/distributionsByConnectionMode/{ConnectionMode}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByConnectionModeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionList: S.optional(__S(5058, __c158, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByConnectionModeResult" });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          KeyGroupId: S.String.pipe(T.HttpLabel("KeyGroupId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/distributionsByKeyGroupId/{KeyGroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByKeyGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionIdList: S.optional(__S(5153, __c161, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionIdList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByKeyGroupResult" });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          OriginRequestPolicyId: S.String.pipe(T.HttpLabel("OriginRequestPolicyId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/distributionsByOriginRequestPolicyId/{OriginRequestPolicyId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByOriginRequestPolicyIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionIdList: S.optional(__S(5153, __c161, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionIdList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByOriginRequestPolicyIdResult" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/distributionsByOwnedResource/{ResourceArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByOwnedResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DistributionId: S.String, OwnerAccountId: S.String }),
      ).annotate({ identifier: "DistributionIdOwner" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(5313, __c166, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DistributionIdOwner"))
          .annotate({ identifier: "DistributionIdOwner" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          IsTruncated: S.Boolean,
          Quantity: S.Number,
          Items: S.optional(__S(5314, __c166, 2)),
        }),
      ).annotate({ identifier: "DistributionIdOwnerList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          DistributionList: S.optional(__S(5315, __c166, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionIdOwnerList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByOwnedResourceResult" });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          MaxItems: S.optional(S.Number),
          RealtimeLogConfigName: S.optional(S.String),
          RealtimeLogConfigArn: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/distributionsByRealtimeLogConfig" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByRealtimeLogConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionList: S.optional(__S(5058, __c158, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByRealtimeLogConfigResult" });
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          ResponseHeadersPolicyId: S.String.pipe(T.HttpLabel("ResponseHeadersPolicyId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/distributionsByResponseHeadersPolicyId/{ResponseHeadersPolicyId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByResponseHeadersPolicyIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionIdList: S.optional(__S(5153, __c161, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionIdList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByResponseHeadersPolicyIdResult" });
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrustStoreIdentifier: S.String.pipe(T.HttpQuery("TrustStoreIdentifier")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/distributionsByTrustStore" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByTrustStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionList: S.optional(__S(5058, __c158, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByTrustStoreResult" });
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          VpcOriginId: S.String.pipe(T.HttpLabel("VpcOriginId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/distributionsByVpcOriginId/{VpcOriginId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByVpcOriginIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionIdList: S.optional(__S(5153, __c161, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionIdList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByVpcOriginIdResult" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          WebACLId: S.String.pipe(T.HttpLabel("WebACLId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/distributionsByWebACLId/{WebACLId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionsByWebACLIdRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionList: S.optional(__S(5058, __c158, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionsByWebACLIdResult" });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DistributionId: S.optional(S.String), ConnectionGroupId: S.optional(S.String) }),
      ).annotate({ identifier: "DistributionTenantAssociationFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssociationFilter: S.optional(__S(5504, __c172, 0)),
          Marker: S.optional(S.String),
          MaxItems: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/distribution-tenants" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionTenantsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          DistributionTenantList: S.optional(__S(5537, __c173, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionTenantsResult" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          DistributionId: S.String,
          Name: S.String,
          Arn: S.String,
          Domains: __S(1125, __c35, 5),
          ConnectionGroupId: S.optional(S.String),
          Customizations: S.optional(__S(1123, __c35, 3)),
          CreatedTime: T.DateFromString,
          LastModifiedTime: T.DateFromString,
          ETag: S.String,
          Enabled: S.optional(S.Boolean),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DistributionTenantSummary" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(5536, __c173, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DistributionTenantSummary"))
          .annotate({ identifier: "DistributionTenantSummary" }),
      );
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WebACLArn: S.optional(S.String),
          CertificateArn: S.optional(S.String),
          Marker: S.optional(S.String),
          MaxItems: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/distribution-tenants-by-customization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionTenantsByCustomizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          DistributionTenantList: S.optional(__S(5537, __c173, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ListDistributionTenantsByCustomizationResult" });
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Domain: S.String,
          DomainControlValidationResource: __S(5632, __c176, 0),
          MaxItems: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/domain-conflicts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDomainConflictsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Domain: S.String,
          ResourceType: S.String,
          ResourceId: S.String,
          AccountId: S.String,
        }),
      ).annotate({ identifier: "DomainConflict" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(5601, __c175, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DomainConflicts"))
          .annotate({ identifier: "DomainConflict" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          DomainConflicts: S.optional(__S(5602, __c175, 2)),
          NextMarker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDomainConflictsResult" });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DistributionId: S.optional(S.String),
          DistributionTenantId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DistributionResourceId" });
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/field-level-encryption" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFieldLevelEncryptionConfigsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          LastModifiedTime: T.DateFromString,
          Comment: S.optional(S.String),
          QueryArgProfileConfig: S.optional(__S(1283, __c40, 3)),
          ContentTypeProfileConfig: S.optional(__S(1287, __c40, 7)),
        }),
      ).annotate({ identifier: "FieldLevelEncryptionSummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(5665, __c177, 1)
          .pipe(/*@__PURE__*/ T.XmlName("FieldLevelEncryptionSummary"))
          .annotate({ identifier: "FieldLevelEncryptionSummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          Quantity: S.Number,
          Items: S.optional(__S(5666, __c177, 2)),
        }),
      ).annotate({ identifier: "FieldLevelEncryptionList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryptionList: S.optional(__S(5667, __c177, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FieldLevelEncryptionList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListFieldLevelEncryptionConfigsResult" });
  }
}
function __c178(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/field-level-encryption-profile" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFieldLevelEncryptionProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          LastModifiedTime: T.DateFromString,
          Name: S.String,
          EncryptionEntities: __S(1412, __c44, 4),
          Comment: S.optional(S.String),
        }),
      ).annotate({ identifier: "FieldLevelEncryptionProfileSummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(5697, __c178, 1)
          .pipe(/*@__PURE__*/ T.XmlName("FieldLevelEncryptionProfileSummary"))
          .annotate({ identifier: "FieldLevelEncryptionProfileSummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          Quantity: S.Number,
          Items: S.optional(__S(5698, __c178, 2)),
        }),
      ).annotate({ identifier: "FieldLevelEncryptionProfileList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryptionProfileList: S.optional(__S(5699, __c178, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FieldLevelEncryptionProfileList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListFieldLevelEncryptionProfilesResult" });
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          Stage: S.optional(S.String).pipe(T.HttpQuery("Stage")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/function" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFunctionsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1537, __c48, 1)
          .pipe(/*@__PURE__*/ T.XmlName("FunctionSummary"))
          .annotate({ identifier: "FunctionSummary" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          Quantity: S.Number,
          Items: S.optional(__S(5729, __c179, 1)),
        }),
      ).annotate({ identifier: "FunctionList" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FunctionList: S.optional(__S(5730, __c179, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FunctionList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListFunctionsResult" });
  }
}
function __c180(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DistributionId: S.String.pipe(T.HttpLabel("DistributionId")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2020-05-31/distribution/{DistributionId}/invalidation",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInvalidationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InvalidationList: S.optional(__S(5794, __c181, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "InvalidationList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListInvalidationsResult" });
  }
}
function __c181(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, CreateTime: T.DateFromString, Status: S.String }),
      ).annotate({ identifier: "InvalidationSummary" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(5792, __c181, 0)
          .pipe(/*@__PURE__*/ T.XmlName("InvalidationSummary"))
          .annotate({ identifier: "InvalidationSummary" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          IsTruncated: S.Boolean,
          Quantity: S.Number,
          Items: S.optional(__S(5793, __c181, 1)),
        }),
      ).annotate({ identifier: "InvalidationList" });
  }
}
function __c182(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/distribution-tenant/{Id}/invalidation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInvalidationsForDistributionTenantRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InvalidationList: S.optional(__S(5794, __c181, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "InvalidationList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListInvalidationsForDistributionTenantResult" });
  }
}
function __c183(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/key-group" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKeyGroupsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ KeyGroup: __S(1728, __c54, 0) })).annotate({
        identifier: "KeyGroupSummary",
      });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(5857, __c183, 1)
          .pipe(/*@__PURE__*/ T.XmlName("KeyGroupSummary"))
          .annotate({ identifier: "KeyGroupSummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          Quantity: S.Number,
          Items: S.optional(__S(5858, __c183, 2)),
        }),
      ).annotate({ identifier: "KeyGroupList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          KeyGroupList: S.optional(__S(5859, __c183, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "KeyGroupList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListKeyGroupsResult" });
  }
}
function __c184(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          Status: S.optional(S.String).pipe(T.HttpQuery("Status")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/key-value-store" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKeyValueStoresRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1792, __c56, 0)
          .pipe(/*@__PURE__*/ T.XmlName("KeyValueStore"))
          .annotate({ identifier: "KeyValueStore" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          Quantity: S.Number,
          Items: S.optional(__S(5889, __c184, 1)),
        }),
      ).annotate({ identifier: "KeyValueStoreList" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          KeyValueStoreList: S.optional(__S(5890, __c184, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "KeyValueStoreList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListKeyValueStoresResult" });
  }
}
function __c185(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/origin-access-control" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOriginAccessControlsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Description: S.optional(S.String),
          Name: S.String,
          SigningProtocol: S.String,
          SigningBehavior: S.String,
          OriginAccessControlOriginType: S.String,
        }),
      ).annotate({ identifier: "OriginAccessControlSummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(5921, __c185, 1)
          .pipe(/*@__PURE__*/ T.XmlName("OriginAccessControlSummary"))
          .annotate({ identifier: "OriginAccessControlSummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          IsTruncated: S.Boolean,
          Quantity: S.Number,
          Items: S.optional(__S(5922, __c185, 2)),
        }),
      ).annotate({ identifier: "OriginAccessControlList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          OriginAccessControlList: S.optional(__S(5923, __c185, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "OriginAccessControlList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListOriginAccessControlsResult" });
  }
}
function __c186(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String).pipe(T.HttpQuery("Type")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/origin-request-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOriginRequestPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Type: S.String, OriginRequestPolicy: __S(2048, __c64, 0) }),
      ).annotate({ identifier: "OriginRequestPolicySummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(5953, __c186, 1)
          .pipe(/*@__PURE__*/ T.XmlName("OriginRequestPolicySummary"))
          .annotate({ identifier: "OriginRequestPolicySummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          Quantity: S.Number,
          Items: S.optional(__S(5954, __c186, 2)),
        }),
      ).annotate({ identifier: "OriginRequestPolicyList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          OriginRequestPolicyList: S.optional(__S(5955, __c186, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "OriginRequestPolicyList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListOriginRequestPoliciesResult" });
  }
}
function __c187(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/public-key" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPublicKeysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.String,
          CreatedTime: T.DateFromString,
          EncodedKey: S.String,
          Comment: S.optional(S.String),
        }),
      ).annotate({ identifier: "PublicKeySummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(5985, __c187, 1)
          .pipe(/*@__PURE__*/ T.XmlName("PublicKeySummary"))
          .annotate({ identifier: "PublicKeySummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          Quantity: S.Number,
          Items: S.optional(__S(5986, __c187, 2)),
        }),
      ).annotate({ identifier: "PublicKeyList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          PublicKeyList: S.optional(__S(5987, __c187, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "PublicKeyList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListPublicKeysResult" });
  }
}
function __c188(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/realtime-log-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRealtimeLogConfigsRequest" });
    case 1:
      return S.Array(__S(2212, __c69, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxItems: S.Number,
          Items: S.optional(__S(6017, __c188, 1)),
          IsTruncated: S.Boolean,
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "RealtimeLogConfigs" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          RealtimeLogConfigs: S.optional(__S(6018, __c188, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "RealtimeLogConfigs" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListRealtimeLogConfigsResult" });
  }
}
function __c189(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String).pipe(T.HttpQuery("Type")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/response-headers-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResponseHeadersPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Type: S.String, ResponseHeadersPolicy: __S(2304, __c72, 0) }),
      ).annotate({ identifier: "ResponseHeadersPolicySummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(6049, __c189, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ResponseHeadersPolicySummary"))
          .annotate({ identifier: "ResponseHeadersPolicySummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          Quantity: S.Number,
          Items: S.optional(__S(6050, __c189, 2)),
        }),
      ).annotate({ identifier: "ResponseHeadersPolicyList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ResponseHeadersPolicyList: S.optional(__S(6051, __c189, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ResponseHeadersPolicyList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListResponseHeadersPoliciesResult" });
  }
}
function __c190(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/streaming-distribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListStreamingDistributionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          ARN: S.String,
          Status: S.String,
          LastModifiedTime: T.DateFromString,
          DomainName: S.String,
          S3Origin: __S(2368, __c74, 0),
          Aliases: __S(193, __c6, 1),
          TrustedSigners: __S(195, __c6, 3),
          Comment: S.String,
          PriceClass: S.String,
          Enabled: S.Boolean,
        }),
      ).annotate({ identifier: "StreamingDistributionSummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(6081, __c190, 1)
          .pipe(/*@__PURE__*/ T.XmlName("StreamingDistributionSummary"))
          .annotate({ identifier: "StreamingDistributionSummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          MaxItems: S.Number,
          IsTruncated: S.Boolean,
          Quantity: S.Number,
          Items: S.optional(__S(6082, __c190, 2)),
        }),
      ).annotate({ identifier: "StreamingDistributionList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          StreamingDistributionList: S.optional(__S(6083, __c190, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "StreamingDistributionList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListStreamingDistributionsResult" });
  }
}
function __c191(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Resource: S.String.pipe(T.HttpQuery("Resource")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Tags: __S(482, __c15, 2).pipe(T.HttpPayload()).annotate({ identifier: "Tags" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListTagsForResourceResult" });
  }
}
function __c192(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), MaxItems: S.optional(S.Number) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/trust-stores" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrustStoresRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Arn: S.String,
          Name: S.String,
          Status: S.String,
          NumberOfCaCertificates: S.Number,
          LastModifiedTime: T.DateFromString,
          Reason: S.optional(S.String),
          ETag: S.String,
        }),
      ).annotate({ identifier: "TrustStoreSummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(6145, __c192, 1)
          .pipe(/*@__PURE__*/ T.XmlName("TrustStoreSummary"))
          .annotate({ identifier: "TrustStoreSummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          TrustStoreList: S.optional(__S(6146, __c192, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListTrustStoresResult" });
  }
}
function __c193(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2020-05-31/vpc-origin" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVpcOriginsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.String,
          Status: S.String,
          CreatedTime: T.DateFromString,
          LastModifiedTime: T.DateFromString,
          Arn: S.String,
          AccountId: S.optional(S.String),
          OriginEndpointArn: S.String,
        }),
      ).annotate({ identifier: "VpcOriginSummary" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(6177, __c193, 1)
          .pipe(/*@__PURE__*/ T.XmlName("VpcOriginSummary"))
          .annotate({ identifier: "VpcOriginSummary" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          MaxItems: S.optional(S.Number),
          IsTruncated: S.optional(S.Boolean),
          Quantity: S.optional(S.Number),
          Items: S.optional(__S(6178, __c193, 2)),
        }),
      ).annotate({ identifier: "VpcOriginList" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          VpcOriginList: S.optional(__S(6179, __c193, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "VpcOriginList" }),
        }).pipe(ns),
      ).annotate({ identifier: "ListVpcOriginsResult" });
  }
}
function __c194(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/connection-function/{Id}/publish" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PublishConnectionFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionFunctionSummary: S.optional(__S(864, __c27, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ConnectionFunctionSummary" }),
        }).pipe(ns),
      ).annotate({ identifier: "PublishConnectionFunctionResult" });
  }
}
function __c195(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/function/{Name}/publish" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PublishFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionSummary: S.optional(__S(1537, __c48, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FunctionSummary" }),
        }).pipe(ns),
      ).annotate({ identifier: "PublishFunctionResult" });
  }
}
function __c196(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, PolicyDocument: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/put-resource-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ResourceArn: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "PutResourcePolicyResult",
      });
  }
}
function __c197(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Resource: S.String.pipe(T.HttpQuery("Resource")),
          Tags: __S(482, __c15, 2)
            .pipe(T.HttpPayload(), T.XmlName("Tags"))
            .annotate({ identifier: "Tags" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/tagging?Operation=Tag" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c198(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
          Stage: S.optional(S.String),
          ConnectionObject: SensitiveBlob,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/connection-function/{Id}/test" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TestConnectionFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionFunctionSummary: S.optional(__S(864, __c27, 0)),
          ComputeUtilization: S.optional(S.String),
          ConnectionFunctionExecutionLogs: S.optional(__S(6368, __c199, 0)),
          ConnectionFunctionErrorMessage: S.optional(SensitiveString),
          ConnectionFunctionOutput: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ConnectionFunctionTestResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectionFunctionTestResult: S.optional(__S(6337, __c198, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ConnectionFunctionTestResult" }),
        }).pipe(ns),
      ).annotate({ identifier: "TestConnectionFunctionResult" });
  }
}
function __c199(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c200(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
          Stage: S.optional(S.String),
          EventObject: SensitiveBlob,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/function/{Name}/test" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TestFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionSummary: S.optional(__S(1537, __c48, 1)),
          ComputeUtilization: S.optional(S.String),
          FunctionExecutionLogs: S.optional(__S(6368, __c199, 0)),
          FunctionErrorMessage: S.optional(SensitiveString),
          FunctionOutput: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "TestResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TestResult: S.optional(__S(6401, __c200, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "TestResult" }),
        }).pipe(ns),
      ).annotate({ identifier: "TestFunctionResult" });
  }
}
function __c201(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Key")));
    case 1:
      return S.suspend(() => S.Struct({ Items: S.optional(__S(6432, __c201, 0)) })).annotate({
        identifier: "TagKeys",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Resource: S.String.pipe(T.HttpQuery("Resource")),
          TagKeys: __S(6433, __c201, 1)
            .pipe(T.HttpPayload(), T.XmlName("TagKeys"))
            .annotate({ identifier: "TagKeys" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/tagging?Operation=Untag" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
    case 3:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UntagResourceResponse",
      });
  }
}
function __c202(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IpAddressType: S.optional(S.String),
          IpamCidrConfigs: S.optional(__S(513, __c16, 1)),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/anycast-ip-list/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAnycastIpListRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AnycastIpList: S.optional(__S(545, __c17, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "AnycastIpList" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateAnycastIpListResult" });
  }
}
function __c203(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CachePolicyConfig: __S(644, __c20, 4)
            .pipe(T.HttpPayload(), T.XmlName("CachePolicyConfig"))
            .annotate({ identifier: "CachePolicyConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/cache-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCachePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CachePolicy: S.optional(__S(672, __c21, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CachePolicy" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateCachePolicyResult" });
  }
}
function __c204(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudFrontOriginAccessIdentityConfig: __S(736, __c23, 0)
            .pipe(T.HttpPayload(), T.XmlName("CloudFrontOriginAccessIdentityConfig"))
            .annotate({ identifier: "CloudFrontOriginAccessIdentityConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "PUT",
              uri: "/2020-05-31/origin-access-identity/cloudfront/{Id}/config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCloudFrontOriginAccessIdentityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CloudFrontOriginAccessIdentity: S.optional(__S(768, __c24, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CloudFrontOriginAccessIdentity" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateCloudFrontOriginAccessIdentityResult" });
  }
}
function __c205(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
          ConnectionFunctionConfig: __S(835, __c26, 3),
          ConnectionFunctionCode: SensitiveBlob,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/connection-function/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectionFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionFunctionSummary: S.optional(__S(864, __c27, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ConnectionFunctionSummary" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateConnectionFunctionResult" });
  }
}
function __c206(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          Ipv6Enabled: S.optional(S.Boolean),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
          AnycastIpListId: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/connection-group/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectionGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionGroup: S.optional(__S(928, __c29, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ConnectionGroup" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateConnectionGroupResult" });
  }
}
function __c207(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContinuousDeploymentPolicyConfig: __S(998, __c31, 6)
            .pipe(T.HttpPayload(), T.XmlName("ContinuousDeploymentPolicyConfig"))
            .annotate({ identifier: "ContinuousDeploymentPolicyConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/continuous-deployment-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateContinuousDeploymentPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContinuousDeploymentPolicy: S.optional(__S(1024, __c32, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ContinuousDeploymentPolicy" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateContinuousDeploymentPolicyResult" });
  }
}
function __c208(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DistributionConfig: __S(359, __c11, 7)
            .pipe(T.HttpPayload(), T.XmlName("DistributionConfig"))
            .annotate({ identifier: "DistributionConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/distribution/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDistributionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Distribution: S.optional(__S(419, __c13, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "Distribution" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateDistributionResult" });
  }
}
function __c209(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          DistributionId: S.optional(S.String),
          Domains: S.optional(__S(1185, __c37, 1)),
          Customizations: S.optional(__S(1123, __c35, 3)),
          Parameters: S.optional(__S(1153, __c36, 1)),
          ConnectionGroupId: S.optional(S.String),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
          ManagedCertificateRequest: S.optional(__S(1186, __c37, 2)),
          Enabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/distribution-tenant/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDistributionTenantRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DistributionTenant: S.optional(__S(1154, __c36, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "DistributionTenant" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateDistributionTenantResult" });
  }
}
function __c210(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          StagingDistributionId: S.optional(S.String).pipe(T.HttpQuery("StagingDistributionId")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/distribution/{Id}/promote-staging-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDistributionWithStagingConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Distribution: S.optional(__S(419, __c13, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "Distribution" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateDistributionWithStagingConfigResult" });
  }
}
function __c211(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Domain: S.String,
          TargetResource: __S(5632, __c176, 0),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/domain-association" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDomainAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Domain: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateDomainAssociationResult" });
  }
}
function __c212(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryptionConfig: __S(1312, __c41, 0)
            .pipe(T.HttpPayload(), T.XmlName("FieldLevelEncryptionConfig"))
            .annotate({ identifier: "FieldLevelEncryptionConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/field-level-encryption/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFieldLevelEncryptionConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryption: S.optional(__S(1344, __c42, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FieldLevelEncryption" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateFieldLevelEncryptionConfigResult" });
  }
}
function __c213(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryptionProfileConfig: __S(1440, __c45, 0)
            .pipe(T.HttpPayload(), T.XmlName("FieldLevelEncryptionProfileConfig"))
            .annotate({ identifier: "FieldLevelEncryptionProfileConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "PUT",
              uri: "/2020-05-31/field-level-encryption-profile/{Id}/config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFieldLevelEncryptionProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FieldLevelEncryptionProfile: S.optional(__S(1472, __c46, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FieldLevelEncryptionProfile" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateFieldLevelEncryptionProfileResult" });
  }
}
function __c214(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
          FunctionConfig: __S(835, __c26, 3),
          FunctionCode: SensitiveBlob,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/function/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionSummary: S.optional(__S(1537, __c48, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "FunctionSummary" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETtag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateFunctionResult" });
  }
}
function __c215(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyGroupConfig: __S(1697, __c53, 1)
            .pipe(T.HttpPayload(), T.XmlName("KeyGroupConfig"))
            .annotate({ identifier: "KeyGroupConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/key-group/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKeyGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyGroup: S.optional(__S(1728, __c54, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "KeyGroup" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateKeyGroupResult" });
  }
}
function __c216(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Comment: S.String,
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/key-value-store/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKeyValueStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyValueStore: S.optional(__S(1792, __c56, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "KeyValueStore" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateKeyValueStoreResult" });
  }
}
function __c217(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OriginAccessControlConfig: __S(1920, __c60, 0)
            .pipe(T.HttpPayload(), T.XmlName("OriginAccessControlConfig"))
            .annotate({ identifier: "OriginAccessControlConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/origin-access-control/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateOriginAccessControlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OriginAccessControl: S.optional(__S(1952, __c61, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "OriginAccessControl" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateOriginAccessControlResult" });
  }
}
function __c218(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OriginRequestPolicyConfig: __S(2019, __c63, 3)
            .pipe(T.HttpPayload(), T.XmlName("OriginRequestPolicyConfig"))
            .annotate({ identifier: "OriginRequestPolicyConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/origin-request-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateOriginRequestPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OriginRequestPolicy: S.optional(__S(2048, __c64, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "OriginRequestPolicy" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateOriginRequestPolicyResult" });
  }
}
function __c219(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PublicKeyConfig: __S(2112, __c66, 0)
            .pipe(T.HttpPayload(), T.XmlName("PublicKeyConfig"))
            .annotate({ identifier: "PublicKeyConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/public-key/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePublicKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PublicKey: S.optional(__S(2144, __c67, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "PublicKey" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdatePublicKeyResult" });
  }
}
function __c220(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EndPoints: S.optional(__S(2210, __c69, 2)),
          Fields: S.optional(__S(2211, __c69, 3)),
          Name: S.optional(S.String),
          ARN: S.optional(S.String),
          SamplingRate: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/realtime-log-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRealtimeLogConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RealtimeLogConfig: S.optional(__S(2212, __c69, 4)) }).pipe(ns),
      ).annotate({ identifier: "UpdateRealtimeLogConfigResult" });
  }
}
function __c221(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResponseHeadersPolicyConfig: __S(2295, __c71, 23)
            .pipe(T.HttpPayload(), T.XmlName("ResponseHeadersPolicyConfig"))
            .annotate({ identifier: "ResponseHeadersPolicyConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/response-headers-policy/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateResponseHeadersPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResponseHeadersPolicy: S.optional(__S(2304, __c72, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ResponseHeadersPolicy" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateResponseHeadersPolicyResult" });
  }
}
function __c222(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamingDistributionConfig: __S(2401, __c75, 1)
            .pipe(T.HttpPayload(), T.XmlName("StreamingDistributionConfig"))
            .annotate({ identifier: "StreamingDistributionConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/streaming-distribution/{Id}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateStreamingDistributionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamingDistribution: S.optional(__S(2432, __c76, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "StreamingDistribution" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateStreamingDistributionResult" });
  }
}
function __c223(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          CaCertificatesBundleSource: S.optional(__S(2561, __c80, 1)).pipe(T.HttpPayload()),
          UseClientCertificateOCSPEndpoint: S.optional(S.Boolean).pipe(
            T.HttpHeader("UseClientCertificateOCSPEndpoint"),
          ),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/trust-store/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTrustStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrustStore: S.optional(__S(2528, __c79, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "TrustStore" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateTrustStoreResult" });
  }
}
function __c224(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcOriginEndpointConfig: __S(2624, __c82, 0)
            .pipe(T.HttpPayload(), T.XmlName("VpcOriginEndpointConfig"))
            .annotate({ identifier: "VpcOriginEndpointConfig" }),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/2020-05-31/vpc-origin/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVpcOriginRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcOrigin: S.optional(__S(2625, __c82, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "VpcOrigin" }),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateVpcOriginResult" });
  }
}
function __c225(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Domain: S.optional(S.String), Identifier: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2020-05-31/verify-dns-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "VerifyDnsConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Domain: S.String, Status: S.String, Reason: S.optional(S.String) }),
      ).annotate({ identifier: "DnsConfiguration" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(7201, __c225, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DnsConfiguration"))
          .annotate({ identifier: "DnsConfiguration" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ DnsConfigurationList: S.optional(__S(7202, __c225, 2)) }).pipe(ns),
      ).annotate({ identifier: "VerifyDnsConfigurationResult" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
