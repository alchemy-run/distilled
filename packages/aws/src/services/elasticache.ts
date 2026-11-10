import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://elasticache.amazonaws.com/doc/2015-02-02/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "ElastiCache",
  serviceShapeName: "AmazonElastiCacheV9",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "elasticache" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-02-02");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsQuery();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://elasticache-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://elasticache.${Region}.amazonaws.com`);
            }
            return e(
              `https://elasticache-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://elasticache.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://elasticache.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://elasticache.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "ElastiCache",
  service: "ElastiCache",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class APICallRateForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<APICallRateForCustomerExceededFault>()(
    "APICallRateForCustomerExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "APICallRateForCustomerExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AuthorizationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<AuthorizationAlreadyExistsFault>()(
    "AuthorizationAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AuthorizationAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class AuthorizationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<AuthorizationNotFoundFault>()(
    "AuthorizationNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AuthorizationNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<CacheClusterAlreadyExistsFault>()(
    "CacheClusterAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CacheClusterAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CacheClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CacheClusterNotFoundFault>()(
    "CacheClusterNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CacheClusterNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<CacheParameterGroupAlreadyExistsFault>()(
    "CacheParameterGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CacheParameterGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CacheParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CacheParameterGroupNotFoundFault>()(
    "CacheParameterGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CacheParameterGroupNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<CacheParameterGroupQuotaExceededFault>()(
    "CacheParameterGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CacheParameterGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheSecurityGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<CacheSecurityGroupAlreadyExistsFault>()(
    "CacheSecurityGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CacheSecurityGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CacheSecurityGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CacheSecurityGroupNotFoundFault>()(
    "CacheSecurityGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CacheSecurityGroupNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheSecurityGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<CacheSecurityGroupQuotaExceededFault>()(
    "CacheSecurityGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "QuotaExceeded.CacheSecurityGroup",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheSubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<CacheSubnetGroupAlreadyExistsFault>()(
    "CacheSubnetGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CacheSubnetGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CacheSubnetGroupInUse
  extends /*@__PURE__*/ S.TaggedError<CacheSubnetGroupInUse>()(
    "CacheSubnetGroupInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CacheSubnetGroupInUse", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class CacheSubnetGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CacheSubnetGroupNotFoundFault>()(
    "CacheSubnetGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CacheSubnetGroupNotFoundFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheSubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<CacheSubnetGroupQuotaExceededFault>()(
    "CacheSubnetGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CacheSubnetGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheSubnetQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<CacheSubnetQuotaExceededFault>()(
    "CacheSubnetQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CacheSubnetQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterQuotaForCustomerExceededFault>()(
    "ClusterQuotaForCustomerExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterQuotaForCustomerExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DefaultUserAssociatedToUserGroupFault
  extends /*@__PURE__*/ S.TaggedError<DefaultUserAssociatedToUserGroupFault>()(
    "DefaultUserAssociatedToUserGroupFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DefaultUserAssociatedToUserGroup",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DefaultUserRequired
  extends /*@__PURE__*/ S.TaggedError<DefaultUserRequired>()(
    "DefaultUserRequired",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DefaultUserRequired", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateUserNameFault
  extends /*@__PURE__*/ S.TaggedError<DuplicateUserNameFault>()(
    "DuplicateUserNameFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DuplicateUserName", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class GlobalReplicationGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<GlobalReplicationGroupAlreadyExistsFault>()(
    "GlobalReplicationGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "GlobalReplicationGroupAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class GlobalReplicationGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<GlobalReplicationGroupNotFoundFault>()(
    "GlobalReplicationGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "GlobalReplicationGroupNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientCacheClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientCacheClusterCapacityFault>()(
    "InsufficientCacheClusterCapacityFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InsufficientCacheClusterCapacity",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidARNFault
  extends /*@__PURE__*/ S.TaggedError<InvalidARNFault>()(
    "InvalidARNFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidARN", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCacheClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidCacheClusterStateFault>()(
    "InvalidCacheClusterStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidCacheClusterState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCacheParameterGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidCacheParameterGroupStateFault>()(
    "InvalidCacheParameterGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidCacheParameterGroupState",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCacheSecurityGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidCacheSecurityGroupStateFault>()(
    "InvalidCacheSecurityGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidCacheSecurityGroupState",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCredentialsException
  extends /*@__PURE__*/ S.TaggedError<InvalidCredentialsException>()(
    "InvalidCredentialsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidCredentialsException", httpResponseCode: 408 }),
      /*@__PURE__*/ T.HttpError(408),
    ),
  ).pipe(C.withTimeoutError) {}
export class InvalidGlobalReplicationGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidGlobalReplicationGroupStateFault>()(
    "InvalidGlobalReplicationGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidGlobalReplicationGroupState",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidKMSKeyFault
  extends /*@__PURE__*/ S.TaggedError<InvalidKMSKeyFault>()(
    "InvalidKMSKeyFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidKMSKeyFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameterCombination", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameterValue", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidReplicationGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidReplicationGroupStateFault>()(
    "InvalidReplicationGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidReplicationGroupState",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidServerlessCacheSnapshotStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidServerlessCacheSnapshotStateFault>()(
    "InvalidServerlessCacheSnapshotStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidServerlessCacheSnapshotStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidServerlessCacheStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidServerlessCacheStateFault>()(
    "InvalidServerlessCacheStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidServerlessCacheStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSnapshotStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidSnapshotStateFault>()(
    "InvalidSnapshotStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSnapshotState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSubnet
  extends /*@__PURE__*/ S.TaggedError<InvalidSubnet>()(
    "InvalidSubnet",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSubnet", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidUserGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidUserGroupStateFault>()(
    "InvalidUserGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidUserGroupState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidUserStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidUserStateFault>()(
    "InvalidUserStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidUserState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidVPCNetworkStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidVPCNetworkStateFault>()(
    "InvalidVPCNetworkStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidVPCNetworkStateFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<NodeGroupNotFoundFault>()(
    "NodeGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NodeGroupNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeGroupsPerReplicationGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeGroupsPerReplicationGroupQuotaExceededFault>()(
    "NodeGroupsPerReplicationGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "NodeGroupsPerReplicationGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeQuotaForClusterExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeQuotaForClusterExceededFault>()(
    "NodeQuotaForClusterExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NodeQuotaForClusterExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeQuotaForCustomerExceededFault>()(
    "NodeQuotaForCustomerExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "NodeQuotaForCustomerExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NoOperationFault
  extends /*@__PURE__*/ S.TaggedError<NoOperationFault>()(
    "NoOperationFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NoOperationFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReplicationGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ReplicationGroupAlreadyExistsFault>()(
    "ReplicationGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReplicationGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ReplicationGroupAlreadyUnderMigrationFault
  extends /*@__PURE__*/ S.TaggedError<ReplicationGroupAlreadyUnderMigrationFault>()(
    "ReplicationGroupAlreadyUnderMigrationFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReplicationGroupAlreadyUnderMigrationFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReplicationGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReplicationGroupNotFoundFault>()(
    "ReplicationGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReplicationGroupNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReplicationGroupNotUnderMigrationFault
  extends /*@__PURE__*/ S.TaggedError<ReplicationGroupNotUnderMigrationFault>()(
    "ReplicationGroupNotUnderMigrationFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReplicationGroupNotUnderMigrationFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedCacheNodeAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ReservedCacheNodeAlreadyExistsFault>()(
    "ReservedCacheNodeAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReservedCacheNodeAlreadyExists",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ReservedCacheNodeNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedCacheNodeNotFoundFault>()(
    "ReservedCacheNodeNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ReservedCacheNodeNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedCacheNodeQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ReservedCacheNodeQuotaExceededFault>()(
    "ReservedCacheNodeQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReservedCacheNodeQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedCacheNodesOfferingNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedCacheNodesOfferingNotFoundFault>()(
    "ReservedCacheNodesOfferingNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReservedCacheNodesOfferingNotFound",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerlessCacheAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheAlreadyExistsFault>()(
    "ServerlessCacheAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ServerlessCacheAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ServerlessCacheNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheNotFoundFault>()(
    "ServerlessCacheNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ServerlessCacheNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerlessCacheQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheQuotaForCustomerExceededFault>()(
    "ServerlessCacheQuotaForCustomerExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ServerlessCacheQuotaForCustomerExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerlessCacheSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheSnapshotAlreadyExistsFault>()(
    "ServerlessCacheSnapshotAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ServerlessCacheSnapshotAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ServerlessCacheSnapshotNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheSnapshotNotFoundFault>()(
    "ServerlessCacheSnapshotNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ServerlessCacheSnapshotNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerlessCacheSnapshotQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheSnapshotQuotaExceededFault>()(
    "ServerlessCacheSnapshotQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ServerlessCacheSnapshotQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceLinkedRoleNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServiceLinkedRoleNotFoundFault>()(
    "ServiceLinkedRoleNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ServiceLinkedRoleNotFoundFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceUpdateNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServiceUpdateNotFoundFault>()(
    "ServiceUpdateNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ServiceUpdateNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotAlreadyExistsFault>()(
    "SnapshotAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SnapshotAlreadyExistsFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SnapshotFeatureNotSupportedFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotFeatureNotSupportedFault>()(
    "SnapshotFeatureNotSupportedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SnapshotFeatureNotSupportedFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotNotFoundFault>()(
    "SnapshotNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SnapshotNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotQuotaExceededFault>()(
    "SnapshotQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SnapshotQuotaExceededFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetInUse
  extends /*@__PURE__*/ S.TaggedError<SubnetInUse>()(
    "SubnetInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetInUse", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class SubnetNotAllowedFault
  extends /*@__PURE__*/ S.TaggedError<SubnetNotAllowedFault>()(
    "SubnetNotAllowedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetNotAllowedFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<TagNotFoundFault>()(
    "TagNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TagNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagQuotaPerResourceExceeded
  extends /*@__PURE__*/ S.TaggedError<TagQuotaPerResourceExceeded>()(
    "TagQuotaPerResourceExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TagQuotaPerResourceExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TestFailoverNotAvailableFault
  extends /*@__PURE__*/ S.TaggedError<TestFailoverNotAvailableFault>()(
    "TestFailoverNotAvailableFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "TestFailoverNotAvailableFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UserAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<UserAlreadyExistsFault>()(
    "UserAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UserAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class UserGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<UserGroupAlreadyExistsFault>()(
    "UserGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UserGroupAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class UserGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<UserGroupNotFoundFault>()(
    "UserGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UserGroupNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UserGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<UserGroupQuotaExceededFault>()(
    "UserGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UserGroupQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UserNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<UserNotFoundFault>()(
    "UserNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UserNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UserQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<UserQuotaExceededFault>()(
    "UserQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UserQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export interface Tag {
  Key?: string | undefined;
  Value?: string | undefined;
}
export type TagList = Tag[];
export interface AddTagsToResourceMessage {
  ResourceName?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface TagListMessage {
  TagList?: Tag[] | undefined;
}
export interface AuthorizeCacheSecurityGroupIngressMessage {
  CacheSecurityGroupName?: string | undefined;
  EC2SecurityGroupName?: string | undefined;
  EC2SecurityGroupOwnerId?: string | undefined;
}
export interface EC2SecurityGroup {
  Status?: string | undefined;
  EC2SecurityGroupName?: string | undefined;
  EC2SecurityGroupOwnerId?: string | undefined;
}
export type EC2SecurityGroupList = EC2SecurityGroup[];
export interface CacheSecurityGroup {
  OwnerId?: string | undefined;
  CacheSecurityGroupName?: string | undefined;
  Description?: string | undefined;
  EC2SecurityGroups?: EC2SecurityGroup[] | undefined;
  ARN?: string | undefined;
}
export interface AuthorizeCacheSecurityGroupIngressResult {
  CacheSecurityGroup?: CacheSecurityGroup | undefined;
}
export type ReplicationGroupIdList = string[];
export type CacheClusterIdList = string[];
export interface BatchApplyUpdateActionMessage {
  ReplicationGroupIds?: string[] | undefined;
  CacheClusterIds?: string[] | undefined;
  ServiceUpdateName?: string | undefined;
}
export type UpdateActionStatus =
  | "not-applied"
  | "waiting-to-start"
  | "in-progress"
  | "stopping"
  | "stopped"
  | "complete"
  | "scheduling"
  | "scheduled"
  | "not-applicable"
  | (string & {});
export interface ProcessedUpdateAction {
  ReplicationGroupId?: string | undefined;
  CacheClusterId?: string | undefined;
  ServiceUpdateName?: string | undefined;
  UpdateActionStatus?: UpdateActionStatus | undefined;
}
export type ProcessedUpdateActionList = ProcessedUpdateAction[];
export interface UnprocessedUpdateAction {
  ReplicationGroupId?: string | undefined;
  CacheClusterId?: string | undefined;
  ServiceUpdateName?: string | undefined;
  ErrorType?: string | undefined;
  ErrorMessage?: string | undefined;
}
export type UnprocessedUpdateActionList = UnprocessedUpdateAction[];
export interface UpdateActionResultsMessage {
  ProcessedUpdateActions?: ProcessedUpdateAction[] | undefined;
  UnprocessedUpdateActions?: UnprocessedUpdateAction[] | undefined;
}
export interface BatchStopUpdateActionMessage {
  ReplicationGroupIds?: string[] | undefined;
  CacheClusterIds?: string[] | undefined;
  ServiceUpdateName?: string | undefined;
}
export interface CompleteMigrationMessage {
  ReplicationGroupId?: string | undefined;
  Force?: boolean | undefined;
}
export interface GlobalReplicationGroupInfo {
  GlobalReplicationGroupId?: string | undefined;
  GlobalReplicationGroupMemberRole?: string | undefined;
}
export type PendingAutomaticFailoverStatus = "enabled" | "disabled" | (string & {});
export interface SlotMigration {
  ProgressPercentage?: number | undefined;
}
export interface ReshardingStatus {
  SlotMigration?: SlotMigration | undefined;
}
export type AuthTokenUpdateStatus = "SETTING" | "ROTATING" | (string & {});
export type UserGroupId = string;
export type UserGroupIdList = string[];
export interface UserGroupsUpdateStatus {
  UserGroupIdsToAdd?: string[] | undefined;
  UserGroupIdsToRemove?: string[] | undefined;
}
export type LogType = "slow-log" | "engine-log" | (string & {});
export type DestinationType = "cloudwatch-logs" | "kinesis-firehose" | (string & {});
export interface CloudWatchLogsDestinationDetails {
  LogGroup?: string | undefined;
}
export interface KinesisFirehoseDestinationDetails {
  DeliveryStream?: string | undefined;
}
export interface DestinationDetails {
  CloudWatchLogsDetails?: CloudWatchLogsDestinationDetails | undefined;
  KinesisFirehoseDetails?: KinesisFirehoseDestinationDetails | undefined;
}
export type LogFormat = "text" | "json" | (string & {});
export interface PendingLogDeliveryConfiguration {
  LogType?: LogType | undefined;
  DestinationType?: DestinationType | undefined;
  DestinationDetails?: DestinationDetails | undefined;
  LogFormat?: LogFormat | undefined;
}
export type PendingLogDeliveryConfigurationList = PendingLogDeliveryConfiguration[];
export type TransitEncryptionMode = "preferred" | "required" | (string & {});
export type ClusterMode = "enabled" | "disabled" | "compatible" | (string & {});
export interface ReplicationGroupPendingModifiedValues {
  PrimaryClusterId?: string | undefined;
  AutomaticFailoverStatus?: PendingAutomaticFailoverStatus | undefined;
  Resharding?: ReshardingStatus | undefined;
  AuthTokenStatus?: AuthTokenUpdateStatus | undefined;
  UserGroups?: UserGroupsUpdateStatus | undefined;
  LogDeliveryConfigurations?: PendingLogDeliveryConfiguration[] | undefined;
  TransitEncryptionEnabled?: boolean | undefined;
  TransitEncryptionMode?: TransitEncryptionMode | undefined;
  ClusterMode?: ClusterMode | undefined;
}
export type ClusterIdList = string[];
export interface Endpoint {
  Address?: string | undefined;
  Port?: number | undefined;
}
const Endpoint = /*@__PURE__*/ __L.at(__c60, 0) as any as S.Schema<Endpoint>;
export interface NodeGroupMember {
  CacheClusterId?: string | undefined;
  CacheNodeId?: string | undefined;
  ReadEndpoint?: Endpoint | undefined;
  PreferredAvailabilityZone?: string | undefined;
  PreferredOutpostArn?: string | undefined;
  CurrentRole?: string | undefined;
}
export type NodeGroupMemberList = NodeGroupMember[];
export interface NodeGroup {
  NodeGroupId?: string | undefined;
  Status?: string | undefined;
  PrimaryEndpoint?: Endpoint | undefined;
  ReaderEndpoint?: Endpoint | undefined;
  Slots?: string | undefined;
  NodeGroupMembers?: NodeGroupMember[] | undefined;
}
export type NodeGroupList = NodeGroup[];
export type AutomaticFailoverStatus =
  | "enabled"
  | "disabled"
  | "enabling"
  | "disabling"
  | (string & {});
export type MultiAZStatus = "enabled" | "disabled" | (string & {});
export type ReplicationGroupOutpostArnList = string[];
export type StorageEncryptionType = "none" | "sse-elasticache" | "sse-kms" | (string & {});
export type LogDeliveryConfigurationStatus =
  | "active"
  | "enabling"
  | "modifying"
  | "disabling"
  | "error"
  | (string & {});
export interface LogDeliveryConfiguration {
  LogType?: LogType | undefined;
  DestinationType?: DestinationType | undefined;
  DestinationDetails?: DestinationDetails | undefined;
  LogFormat?: LogFormat | undefined;
  Status?: LogDeliveryConfigurationStatus | undefined;
  Message?: string | undefined;
}
export type LogDeliveryConfigurationList = LogDeliveryConfiguration[];
export type DataTieringStatus = "enabled" | "disabled" | (string & {});
export type NetworkType = "ipv4" | "ipv6" | "dual_stack" | (string & {});
export type IpDiscovery = "ipv4" | "ipv6" | (string & {});
export type Durability = "default" | "async" | "sync" | "disabled" | (string & {});
export type EffectiveDurability = "async" | "sync" | "disabled" | (string & {});
export interface ReplicationGroup {
  ReplicationGroupId?: string | undefined;
  Description?: string | undefined;
  GlobalReplicationGroupInfo?: GlobalReplicationGroupInfo | undefined;
  Status?: string | undefined;
  PendingModifiedValues?: ReplicationGroupPendingModifiedValues | undefined;
  MemberClusters?: string[] | undefined;
  NodeGroups?: NodeGroup[] | undefined;
  SnapshottingClusterId?: string | undefined;
  AutomaticFailover?: AutomaticFailoverStatus | undefined;
  MultiAZ?: MultiAZStatus | undefined;
  ConfigurationEndpoint?: Endpoint | undefined;
  SnapshotRetentionLimit?: number | undefined;
  SnapshotWindow?: string | undefined;
  ClusterEnabled?: boolean | undefined;
  CacheNodeType?: string | undefined;
  AuthTokenEnabled?: boolean | undefined;
  AuthTokenLastModifiedDate?: Date | undefined;
  TransitEncryptionEnabled?: boolean | undefined;
  AtRestEncryptionEnabled?: boolean | undefined;
  MemberClustersOutpostArns?: string[] | undefined;
  KmsKeyId?: string | undefined;
  StorageEncryptionType?: StorageEncryptionType | undefined;
  ARN?: string | undefined;
  UserGroupIds?: string[] | undefined;
  LogDeliveryConfigurations?: LogDeliveryConfiguration[] | undefined;
  ReplicationGroupCreateTime?: Date | undefined;
  DataTiering?: DataTieringStatus | undefined;
  AutoMinorVersionUpgrade?: boolean | undefined;
  NetworkType?: NetworkType | undefined;
  IpDiscovery?: IpDiscovery | undefined;
  TransitEncryptionMode?: TransitEncryptionMode | undefined;
  ClusterMode?: ClusterMode | undefined;
  Engine?: string | undefined;
  Durability?: Durability | undefined;
  EffectiveDurability?: EffectiveDurability | undefined;
}
export interface CompleteMigrationResponse {
  ReplicationGroup?: ReplicationGroup | undefined;
}
export interface CopyServerlessCacheSnapshotRequest {
  SourceServerlessCacheSnapshotName?: string | undefined;
  TargetServerlessCacheSnapshotName?: string | undefined;
  KmsKeyId?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface ServerlessCacheConfiguration {
  ServerlessCacheName?: string | undefined;
  Engine?: string | undefined;
  MajorEngineVersion?: string | undefined;
}
export interface ServerlessCacheSnapshot {
  ServerlessCacheSnapshotName?: string | undefined;
  ARN?: string | undefined;
  KmsKeyId?: string | undefined;
  SnapshotType?: string | undefined;
  Status?: string | undefined;
  CreateTime?: Date | undefined;
  ExpiryTime?: Date | undefined;
  BytesUsedForCache?: string | undefined;
  ServerlessCacheConfiguration?: ServerlessCacheConfiguration | undefined;
}
export interface CopyServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot | undefined;
}
export interface CopySnapshotMessage {
  SourceSnapshotName?: string | undefined;
  TargetSnapshotName?: string | undefined;
  TargetBucket?: string | undefined;
  KmsKeyId?: string | undefined;
  Tags?: Tag[] | undefined;
}
export type AllowedNodeGroupId = string;
export type AvailabilityZonesList = string[];
export type OutpostArnsList = string[];
export interface NodeGroupConfiguration {
  NodeGroupId?: string | undefined;
  Slots?: string | undefined;
  ReplicaCount?: number | undefined;
  PrimaryAvailabilityZone?: string | undefined;
  ReplicaAvailabilityZones?: string[] | undefined;
  PrimaryOutpostArn?: string | undefined;
  ReplicaOutpostArns?: string[] | undefined;
}
export interface NodeSnapshot {
  CacheClusterId?: string | undefined;
  NodeGroupId?: string | undefined;
  CacheNodeId?: string | undefined;
  NodeGroupConfiguration?: NodeGroupConfiguration | undefined;
  CacheSize?: string | undefined;
  CacheNodeCreateTime?: Date | undefined;
  SnapshotCreateTime?: Date | undefined;
}
export type NodeSnapshotList = NodeSnapshot[];
export interface Snapshot {
  SnapshotName?: string | undefined;
  ReplicationGroupId?: string | undefined;
  ReplicationGroupDescription?: string | undefined;
  CacheClusterId?: string | undefined;
  SnapshotStatus?: string | undefined;
  SnapshotSource?: string | undefined;
  CacheNodeType?: string | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  NumCacheNodes?: number | undefined;
  PreferredAvailabilityZone?: string | undefined;
  PreferredOutpostArn?: string | undefined;
  CacheClusterCreateTime?: Date | undefined;
  PreferredMaintenanceWindow?: string | undefined;
  TopicArn?: string | undefined;
  Port?: number | undefined;
  CacheParameterGroupName?: string | undefined;
  CacheSubnetGroupName?: string | undefined;
  VpcId?: string | undefined;
  AutoMinorVersionUpgrade?: boolean | undefined;
  SnapshotRetentionLimit?: number | undefined;
  SnapshotWindow?: string | undefined;
  NumNodeGroups?: number | undefined;
  AutomaticFailover?: AutomaticFailoverStatus | undefined;
  NodeSnapshots?: NodeSnapshot[] | undefined;
  KmsKeyId?: string | undefined;
  ARN?: string | undefined;
  DataTiering?: DataTieringStatus | undefined;
  Durability?: Durability | undefined;
}
export interface CopySnapshotResult {
  Snapshot?: Snapshot | undefined;
}
export type AZMode = "single-az" | "cross-az" | (string & {});
export type PreferredAvailabilityZoneList = string[];
export type CacheSecurityGroupNameList = string[];
export type SecurityGroupIdsList = string[];
export type SnapshotArnsList = string[];
export type OutpostMode = "single-outpost" | "cross-outpost" | (string & {});
export type PreferredOutpostArnList = string[];
export interface LogDeliveryConfigurationRequest {
  LogType?: LogType | undefined;
  DestinationType?: DestinationType | undefined;
  DestinationDetails?: DestinationDetails | undefined;
  LogFormat?: LogFormat | undefined;
  Enabled?: boolean | undefined;
}
export type LogDeliveryConfigurationRequestList = LogDeliveryConfigurationRequest[];
export interface CreateCacheClusterMessage {
  CacheClusterId?: string | undefined;
  ReplicationGroupId?: string | undefined;
  AZMode?: AZMode | undefined;
  PreferredAvailabilityZone?: string | undefined;
  PreferredAvailabilityZones?: string[] | undefined;
  NumCacheNodes?: number | undefined;
  CacheNodeType?: string | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  CacheParameterGroupName?: string | undefined;
  CacheSubnetGroupName?: string | undefined;
  CacheSecurityGroupNames?: string[] | undefined;
  SecurityGroupIds?: string[] | undefined;
  Tags?: Tag[] | undefined;
  SnapshotArns?: string[] | undefined;
  SnapshotName?: string | undefined;
  PreferredMaintenanceWindow?: string | undefined;
  Port?: number | undefined;
  NotificationTopicArn?: string | undefined;
  AutoMinorVersionUpgrade?: boolean | undefined;
  SnapshotRetentionLimit?: number | undefined;
  SnapshotWindow?: string | undefined;
  AuthToken?: string | redacted.Redacted<string> | undefined;
  OutpostMode?: OutpostMode | undefined;
  PreferredOutpostArn?: string | undefined;
  PreferredOutpostArns?: string[] | undefined;
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[] | undefined;
  TransitEncryptionEnabled?: boolean | undefined;
  NetworkType?: NetworkType | undefined;
  IpDiscovery?: IpDiscovery | undefined;
}
export type CacheNodeIdsList = string[];
export interface ScaleConfig {
  ScalePercentage?: number | undefined;
  ScaleIntervalMinutes?: number | undefined;
}
export interface PendingModifiedValues {
  NumCacheNodes?: number | undefined;
  CacheNodeIdsToRemove?: string[] | undefined;
  EngineVersion?: string | undefined;
  CacheNodeType?: string | undefined;
  AuthTokenStatus?: AuthTokenUpdateStatus | undefined;
  LogDeliveryConfigurations?: PendingLogDeliveryConfiguration[] | undefined;
  TransitEncryptionEnabled?: boolean | undefined;
  TransitEncryptionMode?: TransitEncryptionMode | undefined;
  ScaleConfig?: ScaleConfig | undefined;
}
export interface NotificationConfiguration {
  TopicArn?: string | undefined;
  TopicStatus?: string | undefined;
}
export interface CacheSecurityGroupMembership {
  CacheSecurityGroupName?: string | undefined;
  Status?: string | undefined;
}
export type CacheSecurityGroupMembershipList = CacheSecurityGroupMembership[];
export interface CacheParameterGroupStatus {
  CacheParameterGroupName?: string | undefined;
  ParameterApplyStatus?: string | undefined;
  CacheNodeIdsToReboot?: string[] | undefined;
}
export interface CacheNode {
  CacheNodeId?: string | undefined;
  CacheNodeStatus?: string | undefined;
  CacheNodeCreateTime?: Date | undefined;
  Endpoint?: Endpoint | undefined;
  ParameterGroupStatus?: string | undefined;
  SourceCacheNodeId?: string | undefined;
  CustomerAvailabilityZone?: string | undefined;
  CustomerOutpostArn?: string | undefined;
}
export type CacheNodeList = CacheNode[];
export interface SecurityGroupMembership {
  SecurityGroupId?: string | undefined;
  Status?: string | undefined;
}
export type SecurityGroupMembershipList = SecurityGroupMembership[];
export interface CacheCluster {
  CacheClusterId?: string | undefined;
  ConfigurationEndpoint?: Endpoint | undefined;
  ClientDownloadLandingPage?: string | undefined;
  CacheNodeType?: string | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  CacheClusterStatus?: string | undefined;
  NumCacheNodes?: number | undefined;
  PreferredAvailabilityZone?: string | undefined;
  PreferredOutpostArn?: string | undefined;
  CacheClusterCreateTime?: Date | undefined;
  PreferredMaintenanceWindow?: string | undefined;
  PendingModifiedValues?: PendingModifiedValues | undefined;
  NotificationConfiguration?: NotificationConfiguration | undefined;
  CacheSecurityGroups?: CacheSecurityGroupMembership[] | undefined;
  CacheParameterGroup?: CacheParameterGroupStatus | undefined;
  CacheSubnetGroupName?: string | undefined;
  CacheNodes?: CacheNode[] | undefined;
  AutoMinorVersionUpgrade?: boolean | undefined;
  SecurityGroups?: SecurityGroupMembership[] | undefined;
  ReplicationGroupId?: string | undefined;
  SnapshotRetentionLimit?: number | undefined;
  SnapshotWindow?: string | undefined;
  AuthTokenEnabled?: boolean | undefined;
  AuthTokenLastModifiedDate?: Date | undefined;
  TransitEncryptionEnabled?: boolean | undefined;
  AtRestEncryptionEnabled?: boolean | undefined;
  ARN?: string | undefined;
  ReplicationGroupLogDeliveryEnabled?: boolean | undefined;
  LogDeliveryConfigurations?: LogDeliveryConfiguration[] | undefined;
  NetworkType?: NetworkType | undefined;
  IpDiscovery?: IpDiscovery | undefined;
  TransitEncryptionMode?: TransitEncryptionMode | undefined;
}
export interface CreateCacheClusterResult {
  CacheCluster?: CacheCluster | undefined;
}
export interface CreateCacheParameterGroupMessage {
  CacheParameterGroupName?: string | undefined;
  CacheParameterGroupFamily?: string | undefined;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface CacheParameterGroup {
  CacheParameterGroupName?: string | undefined;
  CacheParameterGroupFamily?: string | undefined;
  Description?: string | undefined;
  IsGlobal?: boolean | undefined;
  ARN?: string | undefined;
}
export interface CreateCacheParameterGroupResult {
  CacheParameterGroup?: CacheParameterGroup | undefined;
}
export interface CreateCacheSecurityGroupMessage {
  CacheSecurityGroupName?: string | undefined;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateCacheSecurityGroupResult {
  CacheSecurityGroup?: CacheSecurityGroup | undefined;
}
export type SubnetIdentifierList = string[];
export interface CreateCacheSubnetGroupMessage {
  CacheSubnetGroupName?: string | undefined;
  CacheSubnetGroupDescription?: string | undefined;
  SubnetIds?: string[] | undefined;
  Tags?: Tag[] | undefined;
}
export interface AvailabilityZone {
  Name?: string | undefined;
}
export interface SubnetOutpost {
  SubnetOutpostArn?: string | undefined;
}
export type NetworkTypeList = NetworkType[];
export interface Subnet {
  SubnetIdentifier?: string | undefined;
  SubnetAvailabilityZone?: AvailabilityZone | undefined;
  SubnetOutpost?: SubnetOutpost | undefined;
  SupportedNetworkTypes?: NetworkType[] | undefined;
}
export type SubnetList = Subnet[];
export interface CacheSubnetGroup {
  CacheSubnetGroupName?: string | undefined;
  CacheSubnetGroupDescription?: string | undefined;
  VpcId?: string | undefined;
  Subnets?: Subnet[] | undefined;
  ARN?: string | undefined;
  SupportedNetworkTypes?: NetworkType[] | undefined;
}
export interface CreateCacheSubnetGroupResult {
  CacheSubnetGroup?: CacheSubnetGroup | undefined;
}
export interface CreateGlobalReplicationGroupMessage {
  GlobalReplicationGroupIdSuffix?: string | undefined;
  GlobalReplicationGroupDescription?: string | undefined;
  PrimaryReplicationGroupId?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface GlobalReplicationGroupMember {
  ReplicationGroupId?: string | undefined;
  ReplicationGroupRegion?: string | undefined;
  Role?: string | undefined;
  AutomaticFailover?: AutomaticFailoverStatus | undefined;
  Status?: string | undefined;
}
export type GlobalReplicationGroupMemberList = GlobalReplicationGroupMember[];
export interface GlobalNodeGroup {
  GlobalNodeGroupId?: string | undefined;
  Slots?: string | undefined;
}
export type GlobalNodeGroupList = GlobalNodeGroup[];
export interface GlobalReplicationGroup {
  GlobalReplicationGroupId?: string | undefined;
  GlobalReplicationGroupDescription?: string | undefined;
  Status?: string | undefined;
  CacheNodeType?: string | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  Members?: GlobalReplicationGroupMember[] | undefined;
  ClusterEnabled?: boolean | undefined;
  GlobalNodeGroups?: GlobalNodeGroup[] | undefined;
  AuthTokenEnabled?: boolean | undefined;
  TransitEncryptionEnabled?: boolean | undefined;
  AtRestEncryptionEnabled?: boolean | undefined;
  ARN?: string | undefined;
}
export interface CreateGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup | undefined;
}
export type NodeGroupConfigurationList = NodeGroupConfiguration[];
export type UserGroupIdListInput = string[];
export interface CreateReplicationGroupMessage {
  ReplicationGroupId?: string | undefined;
  ReplicationGroupDescription?: string | undefined;
  GlobalReplicationGroupId?: string | undefined;
  PrimaryClusterId?: string | undefined;
  AutomaticFailoverEnabled?: boolean | undefined;
  MultiAZEnabled?: boolean | undefined;
  NumCacheClusters?: number | undefined;
  PreferredCacheClusterAZs?: string[] | undefined;
  NumNodeGroups?: number | undefined;
  ReplicasPerNodeGroup?: number | undefined;
  NodeGroupConfiguration?: NodeGroupConfiguration[] | undefined;
  CacheNodeType?: string | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  CacheParameterGroupName?: string | undefined;
  CacheSubnetGroupName?: string | undefined;
  CacheSecurityGroupNames?: string[] | undefined;
  SecurityGroupIds?: string[] | undefined;
  Tags?: Tag[] | undefined;
  SnapshotArns?: string[] | undefined;
  SnapshotName?: string | undefined;
  PreferredMaintenanceWindow?: string | undefined;
  Port?: number | undefined;
  NotificationTopicArn?: string | undefined;
  AutoMinorVersionUpgrade?: boolean | undefined;
  SnapshotRetentionLimit?: number | undefined;
  SnapshotWindow?: string | undefined;
  AuthToken?: string | redacted.Redacted<string> | undefined;
  TransitEncryptionEnabled?: boolean | undefined;
  AtRestEncryptionEnabled?: boolean | undefined;
  KmsKeyId?: string | undefined;
  UserGroupIds?: string[] | undefined;
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[] | undefined;
  DataTieringEnabled?: boolean | undefined;
  NetworkType?: NetworkType | undefined;
  IpDiscovery?: IpDiscovery | undefined;
  TransitEncryptionMode?: TransitEncryptionMode | undefined;
  ClusterMode?: ClusterMode | undefined;
  ServerlessCacheSnapshotName?: string | undefined;
  Durability?: Durability | undefined;
}
export interface CreateReplicationGroupResult {
  ReplicationGroup?: ReplicationGroup | undefined;
}
export type DataStorageUnit = "GB" | (string & {});
export interface DataStorage {
  Maximum?: number | undefined;
  Minimum?: number | undefined;
  Unit?: DataStorageUnit | undefined;
}
export interface ECPUPerSecond {
  Maximum?: number | undefined;
  Minimum?: number | undefined;
}
export interface CacheUsageLimits {
  DataStorage?: DataStorage | undefined;
  ECPUPerSecond?: ECPUPerSecond | undefined;
}
export type SubnetIdsList = string[];
export type ConnectionType = "vpc" | "public" | (string & {});
export interface CreateServerlessCacheRequest {
  ServerlessCacheName?: string | undefined;
  Description?: string | undefined;
  Engine?: string | undefined;
  MajorEngineVersion?: string | undefined;
  CacheUsageLimits?: CacheUsageLimits | undefined;
  KmsKeyId?: string | undefined;
  SecurityGroupIds?: string[] | undefined;
  SnapshotArnsToRestore?: string[] | undefined;
  Tags?: Tag[] | undefined;
  UserGroupId?: string | undefined;
  SubnetIds?: string[] | undefined;
  SnapshotRetentionLimit?: number | undefined;
  DailySnapshotTime?: string | undefined;
  NetworkType?: NetworkType | undefined;
  ConnectionType?: ConnectionType | undefined;
}
export interface ServerlessCache {
  ServerlessCacheName?: string | undefined;
  Description?: string | undefined;
  CreateTime?: Date | undefined;
  Status?: string | undefined;
  Engine?: string | undefined;
  MajorEngineVersion?: string | undefined;
  FullEngineVersion?: string | undefined;
  CacheUsageLimits?: CacheUsageLimits | undefined;
  KmsKeyId?: string | undefined;
  StorageEncryptionType?: StorageEncryptionType | undefined;
  SecurityGroupIds?: string[] | undefined;
  Endpoint?: Endpoint | undefined;
  ReaderEndpoint?: Endpoint | undefined;
  ARN?: string | undefined;
  UserGroupId?: string | undefined;
  SubnetIds?: string[] | undefined;
  SnapshotRetentionLimit?: number | undefined;
  DailySnapshotTime?: string | undefined;
  NetworkType?: NetworkType | undefined;
  ConnectionType?: ConnectionType | undefined;
}
export interface CreateServerlessCacheResponse {
  ServerlessCache?:
    | (ServerlessCache & {
        CacheUsageLimits: CacheUsageLimits & {
          DataStorage: DataStorage & { Unit: DataStorageUnit };
        };
      })
    | undefined;
}
export interface CreateServerlessCacheSnapshotRequest {
  ServerlessCacheSnapshotName?: string | undefined;
  ServerlessCacheName?: string | undefined;
  KmsKeyId?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot | undefined;
}
export interface CreateSnapshotMessage {
  ReplicationGroupId?: string | undefined;
  CacheClusterId?: string | undefined;
  SnapshotName?: string | undefined;
  KmsKeyId?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateSnapshotResult {
  Snapshot?: Snapshot | undefined;
}
export type UserId = string;
export type UserName = string;
export type EngineType = string;
export type PasswordListInput = string[];
export type AccessString = string;
export type InputAuthenticationType = "password" | "no-password-required" | "iam" | (string & {});
export interface AuthenticationMode {
  Type?: InputAuthenticationType | undefined;
  Passwords?: Array<string | redacted.Redacted<string>> | undefined;
}
export interface CreateUserMessage {
  UserId?: string | undefined;
  UserName?: string | undefined;
  Engine?: string | undefined;
  Passwords?: Array<string | redacted.Redacted<string>> | undefined;
  AccessString?: string | undefined;
  NoPasswordRequired?: boolean | undefined;
  Tags?: Tag[] | undefined;
  AuthenticationMode?: AuthenticationMode | undefined;
}
export type AuthenticationType = "password" | "no-password" | "iam" | (string & {});
export interface Authentication {
  Type?: AuthenticationType | undefined;
  PasswordCount?: number | undefined;
}
export interface User {
  UserId?: string | undefined;
  UserName?: string | undefined;
  Status?: string | undefined;
  Engine?: string | undefined;
  MinimumEngineVersion?: string | undefined;
  AccessString?: string | undefined;
  UserGroupIds?: string[] | undefined;
  Authentication?: Authentication | undefined;
  ARN?: string | undefined;
}
export type UserIdListInput = string[];
export interface CreateUserGroupMessage {
  UserGroupId?: string | undefined;
  Engine?: string | undefined;
  UserIds?: string[] | undefined;
  Tags?: Tag[] | undefined;
}
export type UserIdList = string[];
export interface UserGroupPendingChanges {
  UserIdsToRemove?: string[] | undefined;
  UserIdsToAdd?: string[] | undefined;
}
export type UGReplicationGroupIdList = string[];
export type UGServerlessCacheIdList = string[];
export interface UserGroup {
  UserGroupId?: string | undefined;
  Status?: string | undefined;
  Engine?: string | undefined;
  UserIds?: string[] | undefined;
  MinimumEngineVersion?: string | undefined;
  PendingChanges?: UserGroupPendingChanges | undefined;
  ReplicationGroups?: string[] | undefined;
  ServerlessCaches?: string[] | undefined;
  ARN?: string | undefined;
}
export type GlobalNodeGroupIdList = string[];
export interface DecreaseNodeGroupsInGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string | undefined;
  NodeGroupCount?: number | undefined;
  GlobalNodeGroupsToRemove?: string[] | undefined;
  GlobalNodeGroupsToRetain?: string[] | undefined;
  ApplyImmediately?: boolean | undefined;
}
export interface DecreaseNodeGroupsInGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup | undefined;
}
export interface ConfigureShard {
  NodeGroupId?: string | undefined;
  NewReplicaCount?: number | undefined;
  PreferredAvailabilityZones?: string[] | undefined;
  PreferredOutpostArns?: string[] | undefined;
}
export type ReplicaConfigurationList = ConfigureShard[];
export type RemoveReplicasList = string[];
export interface DecreaseReplicaCountMessage {
  ReplicationGroupId?: string | undefined;
  NewReplicaCount?: number | undefined;
  ReplicaConfiguration?: ConfigureShard[] | undefined;
  ReplicasToRemove?: string[] | undefined;
  ApplyImmediately?: boolean | undefined;
}
export interface DecreaseReplicaCountResult {
  ReplicationGroup?: ReplicationGroup | undefined;
}
export interface DeleteCacheClusterMessage {
  CacheClusterId?: string | undefined;
  FinalSnapshotIdentifier?: string | undefined;
}
export interface DeleteCacheClusterResult {
  CacheCluster?: CacheCluster | undefined;
}
export interface DeleteCacheParameterGroupMessage {
  CacheParameterGroupName?: string | undefined;
}
export interface DeleteCacheParameterGroupResponse {}
export interface DeleteCacheSecurityGroupMessage {
  CacheSecurityGroupName?: string | undefined;
}
export interface DeleteCacheSecurityGroupResponse {}
export interface DeleteCacheSubnetGroupMessage {
  CacheSubnetGroupName?: string | undefined;
}
export interface DeleteCacheSubnetGroupResponse {}
export interface DeleteGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string | undefined;
  RetainPrimaryReplicationGroup?: boolean | undefined;
}
export interface DeleteGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup | undefined;
}
export interface DeleteReplicationGroupMessage {
  ReplicationGroupId?: string | undefined;
  RetainPrimaryCluster?: boolean | undefined;
  FinalSnapshotIdentifier?: string | undefined;
}
export interface DeleteReplicationGroupResult {
  ReplicationGroup?: ReplicationGroup | undefined;
}
export interface DeleteServerlessCacheRequest {
  ServerlessCacheName?: string | undefined;
  FinalSnapshotName?: string | undefined;
}
export interface DeleteServerlessCacheResponse {
  ServerlessCache?:
    | (ServerlessCache & {
        CacheUsageLimits: CacheUsageLimits & {
          DataStorage: DataStorage & { Unit: DataStorageUnit };
        };
      })
    | undefined;
}
export interface DeleteServerlessCacheSnapshotRequest {
  ServerlessCacheSnapshotName?: string | undefined;
}
export interface DeleteServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot | undefined;
}
export interface DeleteSnapshotMessage {
  SnapshotName?: string | undefined;
}
export interface DeleteSnapshotResult {
  Snapshot?: Snapshot | undefined;
}
export interface DeleteUserMessage {
  UserId?: string | undefined;
}
export interface DeleteUserGroupMessage {
  UserGroupId?: string | undefined;
}
export interface DescribeCacheClustersMessage {
  CacheClusterId?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
  ShowCacheNodeInfo?: boolean | undefined;
  ShowCacheClustersNotInReplicationGroups?: boolean | undefined;
}
export type CacheClusterList = CacheCluster[];
export interface CacheClusterMessage {
  Marker?: string | undefined;
  CacheClusters?: CacheCluster[] | undefined;
}
export interface DescribeCacheEngineVersionsMessage {
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  CacheParameterGroupFamily?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
  DefaultOnly?: boolean | undefined;
}
export interface CacheEngineVersion {
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  CacheParameterGroupFamily?: string | undefined;
  CacheEngineDescription?: string | undefined;
  CacheEngineVersionDescription?: string | undefined;
}
export type CacheEngineVersionList = CacheEngineVersion[];
export interface CacheEngineVersionMessage {
  Marker?: string | undefined;
  CacheEngineVersions?: CacheEngineVersion[] | undefined;
}
export interface DescribeCacheParameterGroupsMessage {
  CacheParameterGroupName?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export type CacheParameterGroupList = CacheParameterGroup[];
export interface CacheParameterGroupsMessage {
  Marker?: string | undefined;
  CacheParameterGroups?: CacheParameterGroup[] | undefined;
}
export interface DescribeCacheParametersMessage {
  CacheParameterGroupName?: string | undefined;
  Source?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export type ChangeType = "immediate" | "requires-reboot" | (string & {});
export interface Parameter {
  ParameterName?: string | undefined;
  ParameterValue?: string | undefined;
  Description?: string | undefined;
  Source?: string | undefined;
  DataType?: string | undefined;
  AllowedValues?: string | undefined;
  IsModifiable?: boolean | undefined;
  MinimumEngineVersion?: string | undefined;
  ChangeType?: ChangeType | undefined;
}
export type ParametersList = Parameter[];
export interface CacheNodeTypeSpecificValue {
  CacheNodeType?: string | undefined;
  Value?: string | undefined;
}
export type CacheNodeTypeSpecificValueList = CacheNodeTypeSpecificValue[];
export interface CacheNodeTypeSpecificParameter {
  ParameterName?: string | undefined;
  Description?: string | undefined;
  Source?: string | undefined;
  DataType?: string | undefined;
  AllowedValues?: string | undefined;
  IsModifiable?: boolean | undefined;
  MinimumEngineVersion?: string | undefined;
  CacheNodeTypeSpecificValues?: CacheNodeTypeSpecificValue[] | undefined;
  ChangeType?: ChangeType | undefined;
}
export type CacheNodeTypeSpecificParametersList = CacheNodeTypeSpecificParameter[];
export interface CacheParameterGroupDetails {
  Marker?: string | undefined;
  Parameters?: Parameter[] | undefined;
  CacheNodeTypeSpecificParameters?: CacheNodeTypeSpecificParameter[] | undefined;
}
export interface DescribeCacheSecurityGroupsMessage {
  CacheSecurityGroupName?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export type CacheSecurityGroups = CacheSecurityGroup[];
export interface CacheSecurityGroupMessage {
  Marker?: string | undefined;
  CacheSecurityGroups?: CacheSecurityGroup[] | undefined;
}
export interface DescribeCacheSubnetGroupsMessage {
  CacheSubnetGroupName?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export type CacheSubnetGroups = CacheSubnetGroup[];
export interface CacheSubnetGroupMessage {
  Marker?: string | undefined;
  CacheSubnetGroups?: CacheSubnetGroup[] | undefined;
}
export interface DescribeEngineDefaultParametersMessage {
  CacheParameterGroupFamily?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export interface EngineDefaults {
  CacheParameterGroupFamily?: string | undefined;
  Marker?: string | undefined;
  Parameters?: Parameter[] | undefined;
  CacheNodeTypeSpecificParameters?: CacheNodeTypeSpecificParameter[] | undefined;
}
export interface DescribeEngineDefaultParametersResult {
  EngineDefaults?: EngineDefaults | undefined;
}
export type SourceType =
  | "cache-cluster"
  | "cache-parameter-group"
  | "cache-security-group"
  | "cache-subnet-group"
  | "replication-group"
  | "serverless-cache"
  | "serverless-cache-snapshot"
  | "user"
  | "user-group"
  | (string & {});
export interface DescribeEventsMessage {
  SourceIdentifier?: string | undefined;
  SourceType?: SourceType | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  Duration?: number | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export interface Event {
  SourceIdentifier?: string | undefined;
  SourceType?: SourceType | undefined;
  Message?: string | undefined;
  Date?: Date | undefined;
}
export type EventList = Event[];
export interface EventsMessage {
  Marker?: string | undefined;
  Events?: Event[] | undefined;
}
export interface DescribeGlobalReplicationGroupsMessage {
  GlobalReplicationGroupId?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
  ShowMemberInfo?: boolean | undefined;
}
export type GlobalReplicationGroupList = GlobalReplicationGroup[];
export interface DescribeGlobalReplicationGroupsResult {
  Marker?: string | undefined;
  GlobalReplicationGroups?: GlobalReplicationGroup[] | undefined;
}
export interface DescribeReplicationGroupsMessage {
  ReplicationGroupId?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export type ReplicationGroupList = ReplicationGroup[];
export interface ReplicationGroupMessage {
  Marker?: string | undefined;
  ReplicationGroups?: ReplicationGroup[] | undefined;
}
export interface DescribeReservedCacheNodesMessage {
  ReservedCacheNodeId?: string | undefined;
  ReservedCacheNodesOfferingId?: string | undefined;
  CacheNodeType?: string | undefined;
  Duration?: string | undefined;
  ProductDescription?: string | undefined;
  OfferingType?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export interface RecurringCharge {
  RecurringChargeAmount?: number | undefined;
  RecurringChargeFrequency?: string | undefined;
}
export type RecurringChargeList = RecurringCharge[];
export interface ReservedCacheNode {
  ReservedCacheNodeId?: string | undefined;
  ReservedCacheNodesOfferingId?: string | undefined;
  CacheNodeType?: string | undefined;
  StartTime?: Date | undefined;
  Duration?: number | undefined;
  FixedPrice?: number | undefined;
  UsagePrice?: number | undefined;
  CacheNodeCount?: number | undefined;
  ProductDescription?: string | undefined;
  OfferingType?: string | undefined;
  State?: string | undefined;
  RecurringCharges?: RecurringCharge[] | undefined;
  ReservationARN?: string | undefined;
}
export type ReservedCacheNodeList = ReservedCacheNode[];
export interface ReservedCacheNodeMessage {
  Marker?: string | undefined;
  ReservedCacheNodes?: ReservedCacheNode[] | undefined;
}
export interface DescribeReservedCacheNodesOfferingsMessage {
  ReservedCacheNodesOfferingId?: string | undefined;
  CacheNodeType?: string | undefined;
  Duration?: string | undefined;
  ProductDescription?: string | undefined;
  OfferingType?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export interface ReservedCacheNodesOffering {
  ReservedCacheNodesOfferingId?: string | undefined;
  CacheNodeType?: string | undefined;
  Duration?: number | undefined;
  FixedPrice?: number | undefined;
  UsagePrice?: number | undefined;
  ProductDescription?: string | undefined;
  OfferingType?: string | undefined;
  RecurringCharges?: RecurringCharge[] | undefined;
}
export type ReservedCacheNodesOfferingList = ReservedCacheNodesOffering[];
export interface ReservedCacheNodesOfferingMessage {
  Marker?: string | undefined;
  ReservedCacheNodesOfferings?: ReservedCacheNodesOffering[] | undefined;
}
export interface DescribeServerlessCachesRequest {
  ServerlessCacheName?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type ServerlessCacheList = ServerlessCache[];
export interface DescribeServerlessCachesResponse {
  NextToken?: string | undefined;
  ServerlessCaches?:
    | (ServerlessCache & {
        CacheUsageLimits: CacheUsageLimits & {
          DataStorage: DataStorage & { Unit: DataStorageUnit };
        };
      })[]
    | undefined;
}
export interface DescribeServerlessCacheSnapshotsRequest {
  ServerlessCacheName?: string | undefined;
  ServerlessCacheSnapshotName?: string | undefined;
  SnapshotType?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type ServerlessCacheSnapshotList = ServerlessCacheSnapshot[];
export interface DescribeServerlessCacheSnapshotsResponse {
  NextToken?: string | undefined;
  ServerlessCacheSnapshots?: ServerlessCacheSnapshot[] | undefined;
}
export type ServiceUpdateStatus = "available" | "cancelled" | "expired" | (string & {});
export type ServiceUpdateStatusList = ServiceUpdateStatus[];
export interface DescribeServiceUpdatesMessage {
  ServiceUpdateName?: string | undefined;
  ServiceUpdateStatus?: ServiceUpdateStatus[] | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export type ServiceUpdateSeverity = "critical" | "important" | "medium" | "low" | (string & {});
export type ServiceUpdateType = "security-update" | (string & {});
export interface ServiceUpdate {
  ServiceUpdateName?: string | undefined;
  ServiceUpdateReleaseDate?: Date | undefined;
  ServiceUpdateEndDate?: Date | undefined;
  ServiceUpdateSeverity?: ServiceUpdateSeverity | undefined;
  ServiceUpdateRecommendedApplyByDate?: Date | undefined;
  ServiceUpdateStatus?: ServiceUpdateStatus | undefined;
  ServiceUpdateDescription?: string | undefined;
  ServiceUpdateType?: ServiceUpdateType | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  AutoUpdateAfterRecommendedApplyByDate?: boolean | undefined;
  EstimatedUpdateTime?: string | undefined;
}
export type ServiceUpdateList = ServiceUpdate[];
export interface ServiceUpdatesMessage {
  Marker?: string | undefined;
  ServiceUpdates?: ServiceUpdate[] | undefined;
}
export interface DescribeSnapshotsMessage {
  ReplicationGroupId?: string | undefined;
  CacheClusterId?: string | undefined;
  SnapshotName?: string | undefined;
  SnapshotSource?: string | undefined;
  Marker?: string | undefined;
  MaxRecords?: number | undefined;
  ShowNodeGroupConfig?: boolean | undefined;
}
export type SnapshotList = Snapshot[];
export interface DescribeSnapshotsListMessage {
  Marker?: string | undefined;
  Snapshots?: Snapshot[] | undefined;
}
export interface TimeRangeFilter {
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
}
export type UpdateActionStatusList = UpdateActionStatus[];
export interface DescribeUpdateActionsMessage {
  ServiceUpdateName?: string | undefined;
  ReplicationGroupIds?: string[] | undefined;
  CacheClusterIds?: string[] | undefined;
  Engine?: string | undefined;
  ServiceUpdateStatus?: ServiceUpdateStatus[] | undefined;
  ServiceUpdateTimeRange?: TimeRangeFilter | undefined;
  UpdateActionStatus?: UpdateActionStatus[] | undefined;
  ShowNodeLevelUpdateStatus?: boolean | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export type SlaMet = "yes" | "no" | "n/a" | (string & {});
export type NodeUpdateStatus =
  | "not-applied"
  | "waiting-to-start"
  | "in-progress"
  | "stopping"
  | "stopped"
  | "complete"
  | (string & {});
export type NodeUpdateInitiatedBy = "system" | "customer" | (string & {});
export interface NodeGroupMemberUpdateStatus {
  CacheClusterId?: string | undefined;
  CacheNodeId?: string | undefined;
  NodeUpdateStatus?: NodeUpdateStatus | undefined;
  NodeDeletionDate?: Date | undefined;
  NodeUpdateStartDate?: Date | undefined;
  NodeUpdateEndDate?: Date | undefined;
  NodeUpdateInitiatedBy?: NodeUpdateInitiatedBy | undefined;
  NodeUpdateInitiatedDate?: Date | undefined;
  NodeUpdateStatusModifiedDate?: Date | undefined;
}
export type NodeGroupMemberUpdateStatusList = NodeGroupMemberUpdateStatus[];
export interface NodeGroupUpdateStatus {
  NodeGroupId?: string | undefined;
  NodeGroupMemberUpdateStatus?: NodeGroupMemberUpdateStatus[] | undefined;
}
export type NodeGroupUpdateStatusList = NodeGroupUpdateStatus[];
export interface CacheNodeUpdateStatus {
  CacheNodeId?: string | undefined;
  NodeUpdateStatus?: NodeUpdateStatus | undefined;
  NodeDeletionDate?: Date | undefined;
  NodeUpdateStartDate?: Date | undefined;
  NodeUpdateEndDate?: Date | undefined;
  NodeUpdateInitiatedBy?: NodeUpdateInitiatedBy | undefined;
  NodeUpdateInitiatedDate?: Date | undefined;
  NodeUpdateStatusModifiedDate?: Date | undefined;
}
export type CacheNodeUpdateStatusList = CacheNodeUpdateStatus[];
export interface UpdateAction {
  ReplicationGroupId?: string | undefined;
  CacheClusterId?: string | undefined;
  ServiceUpdateName?: string | undefined;
  ServiceUpdateReleaseDate?: Date | undefined;
  ServiceUpdateSeverity?: ServiceUpdateSeverity | undefined;
  ServiceUpdateStatus?: ServiceUpdateStatus | undefined;
  ServiceUpdateRecommendedApplyByDate?: Date | undefined;
  ServiceUpdateType?: ServiceUpdateType | undefined;
  UpdateActionAvailableDate?: Date | undefined;
  UpdateActionStatus?: UpdateActionStatus | undefined;
  NodesUpdated?: string | undefined;
  UpdateActionStatusModifiedDate?: Date | undefined;
  SlaMet?: SlaMet | undefined;
  NodeGroupUpdateStatus?: NodeGroupUpdateStatus[] | undefined;
  CacheNodeUpdateStatus?: CacheNodeUpdateStatus[] | undefined;
  EstimatedUpdateTime?: string | undefined;
  Engine?: string | undefined;
}
export type UpdateActionList = UpdateAction[];
export interface UpdateActionsMessage {
  Marker?: string | undefined;
  UpdateActions?: UpdateAction[] | undefined;
}
export interface DescribeUserGroupsMessage {
  UserGroupId?: string | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export type UserGroupList = UserGroup[];
export interface DescribeUserGroupsResult {
  UserGroups?: UserGroup[] | undefined;
  Marker?: string | undefined;
}
export type FilterName = string;
export type FilterValue = string;
export type FilterValueList = string[];
export interface Filter {
  Name?: string | undefined;
  Values?: string[] | undefined;
}
export type FilterList = Filter[];
export interface DescribeUsersMessage {
  Engine?: string | undefined;
  UserId?: string | undefined;
  Filters?: Filter[] | undefined;
  MaxRecords?: number | undefined;
  Marker?: string | undefined;
}
export type UserList = User[];
export interface DescribeUsersResult {
  Users?: User[] | undefined;
  Marker?: string | undefined;
}
export interface DisassociateGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string | undefined;
  ReplicationGroupId?: string | undefined;
  ReplicationGroupRegion?: string | undefined;
}
export interface DisassociateGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup | undefined;
}
export interface ExportServerlessCacheSnapshotRequest {
  ServerlessCacheSnapshotName?: string | undefined;
  S3BucketName?: string | undefined;
}
export interface ExportServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot | undefined;
}
export interface FailoverGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string | undefined;
  PrimaryRegion?: string | undefined;
  PrimaryReplicationGroupId?: string | undefined;
}
export interface FailoverGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup | undefined;
}
export interface ReshardingConfiguration {
  NodeGroupId?: string | undefined;
  PreferredAvailabilityZones?: string[] | undefined;
}
export type ReshardingConfigurationList = ReshardingConfiguration[];
export interface RegionalConfiguration {
  ReplicationGroupId?: string | undefined;
  ReplicationGroupRegion?: string | undefined;
  ReshardingConfiguration?: ReshardingConfiguration[] | undefined;
}
export type RegionalConfigurationList = RegionalConfiguration[];
export interface IncreaseNodeGroupsInGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string | undefined;
  NodeGroupCount?: number | undefined;
  RegionalConfigurations?: RegionalConfiguration[] | undefined;
  ApplyImmediately?: boolean | undefined;
}
export interface IncreaseNodeGroupsInGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup | undefined;
}
export interface IncreaseReplicaCountMessage {
  ReplicationGroupId?: string | undefined;
  NewReplicaCount?: number | undefined;
  ReplicaConfiguration?: ConfigureShard[] | undefined;
  ApplyImmediately?: boolean | undefined;
}
export interface IncreaseReplicaCountResult {
  ReplicationGroup?: ReplicationGroup | undefined;
}
export interface ListAllowedNodeTypeModificationsMessage {
  CacheClusterId?: string | undefined;
  ReplicationGroupId?: string | undefined;
}
export type NodeTypeList = string[];
export interface AllowedNodeTypeModificationsMessage {
  ScaleUpModifications?: string[] | undefined;
  ScaleDownModifications?: string[] | undefined;
}
export interface ListTagsForResourceMessage {
  ResourceName?: string | undefined;
}
export type AuthTokenUpdateStrategyType = "SET" | "ROTATE" | "DELETE" | (string & {});
export interface ModifyCacheClusterMessage {
  CacheClusterId?: string | undefined;
  NumCacheNodes?: number | undefined;
  CacheNodeIdsToRemove?: string[] | undefined;
  AZMode?: AZMode | undefined;
  NewAvailabilityZones?: string[] | undefined;
  CacheSecurityGroupNames?: string[] | undefined;
  SecurityGroupIds?: string[] | undefined;
  PreferredMaintenanceWindow?: string | undefined;
  NotificationTopicArn?: string | undefined;
  CacheParameterGroupName?: string | undefined;
  NotificationTopicStatus?: string | undefined;
  ApplyImmediately?: boolean | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  AutoMinorVersionUpgrade?: boolean | undefined;
  SnapshotRetentionLimit?: number | undefined;
  SnapshotWindow?: string | undefined;
  CacheNodeType?: string | undefined;
  AuthToken?: string | redacted.Redacted<string> | undefined;
  AuthTokenUpdateStrategy?: AuthTokenUpdateStrategyType | undefined;
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[] | undefined;
  IpDiscovery?: IpDiscovery | undefined;
  ScaleConfig?: ScaleConfig | undefined;
}
export interface ModifyCacheClusterResult {
  CacheCluster?: CacheCluster | undefined;
}
export interface ParameterNameValue {
  ParameterName?: string | undefined;
  ParameterValue?: string | undefined;
}
export type ParameterNameValueList = ParameterNameValue[];
export interface ModifyCacheParameterGroupMessage {
  CacheParameterGroupName?: string | undefined;
  ParameterNameValues?: ParameterNameValue[] | undefined;
}
export interface CacheParameterGroupNameMessage {
  CacheParameterGroupName?: string | undefined;
}
export interface ModifyCacheSubnetGroupMessage {
  CacheSubnetGroupName?: string | undefined;
  CacheSubnetGroupDescription?: string | undefined;
  SubnetIds?: string[] | undefined;
}
export interface ModifyCacheSubnetGroupResult {
  CacheSubnetGroup?: CacheSubnetGroup | undefined;
}
export interface ModifyGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string | undefined;
  ApplyImmediately?: boolean | undefined;
  CacheNodeType?: string | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  CacheParameterGroupName?: string | undefined;
  GlobalReplicationGroupDescription?: string | undefined;
  AutomaticFailoverEnabled?: boolean | undefined;
}
export interface ModifyGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup | undefined;
}
export interface ModifyReplicationGroupMessage {
  ReplicationGroupId?: string | undefined;
  ReplicationGroupDescription?: string | undefined;
  PrimaryClusterId?: string | undefined;
  SnapshottingClusterId?: string | undefined;
  AutomaticFailoverEnabled?: boolean | undefined;
  MultiAZEnabled?: boolean | undefined;
  NodeGroupId?: string | undefined;
  CacheSecurityGroupNames?: string[] | undefined;
  SecurityGroupIds?: string[] | undefined;
  PreferredMaintenanceWindow?: string | undefined;
  NotificationTopicArn?: string | undefined;
  CacheParameterGroupName?: string | undefined;
  NotificationTopicStatus?: string | undefined;
  ApplyImmediately?: boolean | undefined;
  Engine?: string | undefined;
  EngineVersion?: string | undefined;
  AutoMinorVersionUpgrade?: boolean | undefined;
  SnapshotRetentionLimit?: number | undefined;
  SnapshotWindow?: string | undefined;
  CacheNodeType?: string | undefined;
  AuthToken?: string | redacted.Redacted<string> | undefined;
  AuthTokenUpdateStrategy?: AuthTokenUpdateStrategyType | undefined;
  UserGroupIdsToAdd?: string[] | undefined;
  UserGroupIdsToRemove?: string[] | undefined;
  RemoveUserGroups?: boolean | undefined;
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[] | undefined;
  IpDiscovery?: IpDiscovery | undefined;
  TransitEncryptionEnabled?: boolean | undefined;
  TransitEncryptionMode?: TransitEncryptionMode | undefined;
  ClusterMode?: ClusterMode | undefined;
  Durability?: Durability | undefined;
}
export interface ModifyReplicationGroupResult {
  ReplicationGroup?: ReplicationGroup | undefined;
}
export type NodeGroupsToRemoveList = string[];
export type NodeGroupsToRetainList = string[];
export interface ModifyReplicationGroupShardConfigurationMessage {
  ReplicationGroupId?: string | undefined;
  NodeGroupCount?: number | undefined;
  ApplyImmediately?: boolean | undefined;
  ReshardingConfiguration?: ReshardingConfiguration[] | undefined;
  NodeGroupsToRemove?: string[] | undefined;
  NodeGroupsToRetain?: string[] | undefined;
}
export interface ModifyReplicationGroupShardConfigurationResult {
  ReplicationGroup?: ReplicationGroup | undefined;
}
export interface ModifyServerlessCacheRequest {
  ServerlessCacheName?: string | undefined;
  Description?: string | undefined;
  CacheUsageLimits?: CacheUsageLimits | undefined;
  RemoveUserGroup?: boolean | undefined;
  UserGroupId?: string | undefined;
  SecurityGroupIds?: string[] | undefined;
  SnapshotRetentionLimit?: number | undefined;
  DailySnapshotTime?: string | undefined;
  Engine?: string | undefined;
  MajorEngineVersion?: string | undefined;
}
export interface ModifyServerlessCacheResponse {
  ServerlessCache?:
    | (ServerlessCache & {
        CacheUsageLimits: CacheUsageLimits & {
          DataStorage: DataStorage & { Unit: DataStorageUnit };
        };
      })
    | undefined;
}
export interface ModifyUserMessage {
  UserId?: string | undefined;
  AccessString?: string | undefined;
  AppendAccessString?: string | undefined;
  Passwords?: Array<string | redacted.Redacted<string>> | undefined;
  NoPasswordRequired?: boolean | undefined;
  AuthenticationMode?: AuthenticationMode | undefined;
  Engine?: string | undefined;
}
export interface ModifyUserGroupMessage {
  UserGroupId?: string | undefined;
  UserIdsToAdd?: string[] | undefined;
  UserIdsToRemove?: string[] | undefined;
  Engine?: string | undefined;
}
export interface PurchaseReservedCacheNodesOfferingMessage {
  ReservedCacheNodesOfferingId?: string | undefined;
  ReservedCacheNodeId?: string | undefined;
  CacheNodeCount?: number | undefined;
  Tags?: Tag[] | undefined;
}
export interface PurchaseReservedCacheNodesOfferingResult {
  ReservedCacheNode?: ReservedCacheNode | undefined;
}
export interface RebalanceSlotsInGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string | undefined;
  ApplyImmediately?: boolean | undefined;
}
export interface RebalanceSlotsInGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup | undefined;
}
export interface RebootCacheClusterMessage {
  CacheClusterId?: string | undefined;
  CacheNodeIdsToReboot?: string[] | undefined;
}
export interface RebootCacheClusterResult {
  CacheCluster?: CacheCluster | undefined;
}
export type KeyList = string[];
export interface RemoveTagsFromResourceMessage {
  ResourceName?: string | undefined;
  TagKeys?: string[] | undefined;
}
export interface ResetCacheParameterGroupMessage {
  CacheParameterGroupName?: string | undefined;
  ResetAllParameters?: boolean | undefined;
  ParameterNameValues?: ParameterNameValue[] | undefined;
}
export interface RevokeCacheSecurityGroupIngressMessage {
  CacheSecurityGroupName?: string | undefined;
  EC2SecurityGroupName?: string | undefined;
  EC2SecurityGroupOwnerId?: string | undefined;
}
export interface RevokeCacheSecurityGroupIngressResult {
  CacheSecurityGroup?: CacheSecurityGroup | undefined;
}
export interface CustomerNodeEndpoint {
  Address?: string | undefined;
  Port?: number | undefined;
}
export type CustomerNodeEndpointList = CustomerNodeEndpoint[];
export interface StartMigrationMessage {
  ReplicationGroupId?: string | undefined;
  CustomerNodeEndpointList?: CustomerNodeEndpoint[] | undefined;
}
export interface StartMigrationResponse {
  ReplicationGroup?: ReplicationGroup | undefined;
}
export interface TestFailoverMessage {
  ReplicationGroupId?: string | undefined;
  NodeGroupId?: string | undefined;
}
export interface TestFailoverResult {
  ReplicationGroup?: ReplicationGroup | undefined;
}
export interface TestMigrationMessage {
  ReplicationGroupId?: string | undefined;
  CustomerNodeEndpointList?: CustomerNodeEndpoint[] | undefined;
}
export interface TestMigrationResponse {
  ReplicationGroup?: ReplicationGroup | undefined;
}
export type ExceptionMessage = string;
export type AwsQueryErrorMessage = string;
export type AddTagsToResourceError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | GlobalReplicationGroupNotFoundFault
  | InvalidARNFault
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidServerlessCacheSnapshotStateFault
  | InvalidServerlessCacheStateFault
  | ReplicationGroupNotFoundFault
  | ReservedCacheNodeNotFoundFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotNotFoundFault
  | SnapshotNotFoundFault
  | TagQuotaPerResourceExceeded
  | UserGroupNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * A tag is a key-value pair where the key and value are case-sensitive. You can use tags
 * to categorize and track all your ElastiCache resources.
 * When you add or remove tags on replication groups, those actions will
 * be replicated to all nodes in the replication group. For more information, see Resource-level permissions.
 *
 * For example, you can use cost-allocation tags to your ElastiCache resources, Amazon
 * generates a cost allocation report as a comma-separated value (CSV) file with your usage
 * and costs aggregated by your tags. You can apply tags that represent business categories
 * (such as cost centers, application names, or owners) to organize your costs across
 * multiple services.
 *
 * For more information, see Using Cost Allocation Tags in
 * Amazon ElastiCache in the ElastiCache User
 * Guide.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceMessage & RegionInput,
  TagListMessage,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<AddTagsToResourceMessage>,
  output: __S(944, __c59, 0) as any as S.Schema<TagListMessage>,
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    GlobalReplicationGroupNotFoundFault,
    InvalidARNFault,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidServerlessCacheSnapshotStateFault,
    InvalidServerlessCacheStateFault,
    ReplicationGroupNotFoundFault,
    ReservedCacheNodeNotFoundFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotNotFoundFault,
    SnapshotNotFoundFault,
    TagQuotaPerResourceExceeded,
    UserGroupNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
  telemetry: TELEMETRY,
  span: "AddTagsToResource",
}));

export type AuthorizeCacheSecurityGroupIngressError =
  | AuthorizationAlreadyExistsFault
  | CacheSecurityGroupNotFoundFault
  | InvalidCacheSecurityGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Allows network ingress to a cache security group. Applications using ElastiCache must
 * be running on Amazon EC2, and Amazon EC2 security groups are used as the authorization
 * mechanism.
 *
 * You cannot authorize ingress from an Amazon EC2 security group in one region to an
 * ElastiCache cluster in another region.
 */
export const authorizeCacheSecurityGroupIngress: API.OperationMethod<
  AuthorizeCacheSecurityGroupIngressMessage & RegionInput,
  AuthorizeCacheSecurityGroupIngressResult,
  AuthorizeCacheSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<AuthorizeCacheSecurityGroupIngressMessage>,
  output: __S(993, __c62, 1) as any as S.Schema<AuthorizeCacheSecurityGroupIngressResult>,
  errors: [
    AuthorizationAlreadyExistsFault,
    CacheSecurityGroupNotFoundFault,
    InvalidCacheSecurityGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeCacheSecurityGroupIngress",
  telemetry: TELEMETRY,
  span: "AuthorizeCacheSecurityGroupIngress",
}));

export type BatchApplyUpdateActionError =
  | InvalidParameterValueException
  | ServiceUpdateNotFoundFault
  | CommonErrors;
/**
 * Apply the service update. For more information on service updates and applying them,
 * see Applying Service
 * Updates.
 */
export const batchApplyUpdateAction: API.OperationMethod<
  BatchApplyUpdateActionMessage & RegionInput,
  UpdateActionResultsMessage,
  BatchApplyUpdateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<BatchApplyUpdateActionMessage>,
  output: __S(1044, __c65, 4) as any as S.Schema<UpdateActionResultsMessage>,
  errors: [InvalidParameterValueException, ServiceUpdateNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchApplyUpdateAction",
  telemetry: TELEMETRY,
  span: "BatchApplyUpdateAction",
}));

export type BatchStopUpdateActionError =
  | InvalidParameterValueException
  | ServiceUpdateNotFoundFault
  | CommonErrors;
/**
 * Stop the service update. For more information on service updates and stopping them,
 * see Stopping
 * Service Updates.
 */
export const batchStopUpdateAction: API.OperationMethod<
  BatchStopUpdateActionMessage & RegionInput,
  UpdateActionResultsMessage,
  BatchStopUpdateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<BatchStopUpdateActionMessage>,
  output: __S(1044, __c65, 4) as any as S.Schema<UpdateActionResultsMessage>,
  errors: [InvalidParameterValueException, ServiceUpdateNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStopUpdateAction",
  telemetry: TELEMETRY,
  span: "BatchStopUpdateAction",
}));

export type CompleteMigrationError =
  | InvalidReplicationGroupStateFault
  | ReplicationGroupNotFoundFault
  | ReplicationGroupNotUnderMigrationFault
  | CommonErrors;
/**
 * Complete the migration of data.
 */
export const completeMigration: API.OperationMethod<
  CompleteMigrationMessage & RegionInput,
  CompleteMigrationResponse,
  CompleteMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<CompleteMigrationMessage>,
  output: __S(1089, __c68, 1) as any as S.Schema<CompleteMigrationResponse>,
  errors: [
    InvalidReplicationGroupStateFault,
    ReplicationGroupNotFoundFault,
    ReplicationGroupNotUnderMigrationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteMigration",
  telemetry: TELEMETRY,
  span: "CompleteMigration",
}));

export type CopyServerlessCacheSnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidServerlessCacheSnapshotStateFault
  | ServerlessCacheSnapshotAlreadyExistsFault
  | ServerlessCacheSnapshotNotFoundFault
  | ServerlessCacheSnapshotQuotaExceededFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a copy of an existing serverless cache's snapshot. Available for Valkey, Redis OSS and Serverless Memcached only.
 */
export const copyServerlessCacheSnapshot: API.OperationMethod<
  CopyServerlessCacheSnapshotRequest & RegionInput,
  CopyServerlessCacheSnapshotResponse,
  CopyServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<CopyServerlessCacheSnapshotRequest>,
  output: __S(1153, __c72, 1) as any as S.Schema<CopyServerlessCacheSnapshotResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidServerlessCacheSnapshotStateFault,
    ServerlessCacheSnapshotAlreadyExistsFault,
    ServerlessCacheSnapshotNotFoundFault,
    ServerlessCacheSnapshotQuotaExceededFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyServerlessCacheSnapshot",
  telemetry: TELEMETRY,
  span: "CopyServerlessCacheSnapshot",
}));

export type CopySnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidSnapshotStateFault
  | SnapshotAlreadyExistsFault
  | SnapshotNotFoundFault
  | SnapshotQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Makes a copy of an existing snapshot.
 *
 * This operation is valid for Valkey or Redis OSS only.
 *
 * Users or groups that have permissions to use the `CopySnapshot`
 * operation can create their own Amazon S3 buckets and copy snapshots to it. To
 * control access to your snapshots, use an IAM policy to control who has the ability
 * to use the `CopySnapshot` operation. For more information about using IAM
 * to control the use of ElastiCache operations, see Exporting
 * Snapshots and Authentication & Access
 * Control.
 *
 * You could receive the following error messages.
 *
 * **Error Messages**
 *
 * - **Error Message:** The S3 bucket %s is outside of
 * the region.
 *
 * **Solution:** Create an Amazon S3 bucket in the
 * same region as your snapshot. For more information, see Step 1: Create an Amazon S3 Bucket in the ElastiCache User
 * Guide.
 *
 * - **Error Message:** The S3 bucket %s does not
 * exist.
 *
 * **Solution:** Create an Amazon S3 bucket in the
 * same region as your snapshot. For more information, see Step 1: Create an Amazon S3 Bucket in the ElastiCache User
 * Guide.
 *
 * - **Error Message:** The S3 bucket %s is not owned
 * by the authenticated user.
 *
 * **Solution:** Create an Amazon S3 bucket in the
 * same region as your snapshot. For more information, see Step 1: Create an Amazon S3 Bucket in the ElastiCache User
 * Guide.
 *
 * - **Error Message:** The authenticated user does
 * not have sufficient permissions to perform the desired activity.
 *
 * **Solution:** Contact your system administrator
 * to get the needed permissions.
 *
 * - **Error Message:** The S3 bucket %s already
 * contains an object with key %s.
 *
 * **Solution:** Give the
 * `TargetSnapshotName` a new and unique value. If exporting a
 * snapshot, you could alternatively create a new Amazon S3 bucket and use this
 * same value for `TargetSnapshotName`.
 *
 * - **Error Message: ** ElastiCache has not been
 * granted READ permissions %s on the S3 Bucket.
 *
 * **Solution:** Add List and Read permissions on
 * the bucket. For more information, see Step 2: Grant ElastiCache Access to Your Amazon S3 Bucket in the
 * ElastiCache User Guide.
 *
 * - **Error Message: ** ElastiCache has not been
 * granted WRITE permissions %s on the S3 Bucket.
 *
 * **Solution:** Add Upload/Delete permissions on
 * the bucket. For more information, see Step 2: Grant ElastiCache Access to Your Amazon S3 Bucket in the
 * ElastiCache User Guide.
 *
 * - **Error Message: ** ElastiCache has not been
 * granted READ_ACP permissions %s on the S3 Bucket.
 *
 * **Solution:** Add View Permissions on the bucket.
 * For more information, see Step 2: Grant ElastiCache Access to Your Amazon S3 Bucket in the
 * ElastiCache User Guide.
 */
export const copySnapshot: API.OperationMethod<
  CopySnapshotMessage & RegionInput,
  CopySnapshotResult,
  CopySnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<CopySnapshotMessage>,
  output: __S(1185, __c74, 1) as any as S.Schema<CopySnapshotResult>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidSnapshotStateFault,
    SnapshotAlreadyExistsFault,
    SnapshotNotFoundFault,
    SnapshotQuotaExceededFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopySnapshot",
  telemetry: TELEMETRY,
  span: "CopySnapshot",
}));

export type CreateCacheClusterError =
  | CacheClusterAlreadyExistsFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | ClusterQuotaForCustomerExceededFault
  | InsufficientCacheClusterCapacityFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ReplicationGroupNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a cluster. All nodes in the cluster run the same protocol-compliant cache
 * engine software, either Memcached, Valkey or Redis OSS.
 *
 * This operation is not supported for Valkey or Redis OSS (cluster mode enabled) clusters.
 */
export const createCacheCluster: API.OperationMethod<
  CreateCacheClusterMessage & RegionInput,
  CreateCacheClusterResult,
  CreateCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<CreateCacheClusterMessage>,
  output: __S(1249, __c78, 1) as any as S.Schema<CreateCacheClusterResult>,
  errors: [
    CacheClusterAlreadyExistsFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    ClusterQuotaForCustomerExceededFault,
    InsufficientCacheClusterCapacityFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ReplicationGroupNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCacheCluster",
  telemetry: TELEMETRY,
  span: "CreateCacheCluster",
}));

export type CreateCacheParameterGroupError =
  | CacheParameterGroupAlreadyExistsFault
  | CacheParameterGroupQuotaExceededFault
  | InvalidCacheParameterGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a new Amazon ElastiCache cache parameter group. An ElastiCache cache parameter
 * group is a collection of parameters and their values that are applied to all of the
 * nodes in any cluster or replication group using the CacheParameterGroup.
 *
 * A newly created CacheParameterGroup is an exact duplicate of the default parameter
 * group for the CacheParameterGroupFamily. To customize the newly created
 * CacheParameterGroup you can change the values of specific parameters. For more
 * information, see:
 *
 * - ModifyCacheParameterGroup in the ElastiCache API Reference.
 *
 * - Parameters and
 * Parameter Groups in the ElastiCache User Guide.
 */
export const createCacheParameterGroup: API.OperationMethod<
  CreateCacheParameterGroupMessage & RegionInput,
  CreateCacheParameterGroupResult,
  CreateCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<CreateCacheParameterGroupMessage>,
  output: __S(1361, __c85, 1) as any as S.Schema<CreateCacheParameterGroupResult>,
  errors: [
    CacheParameterGroupAlreadyExistsFault,
    CacheParameterGroupQuotaExceededFault,
    InvalidCacheParameterGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCacheParameterGroup",
  telemetry: TELEMETRY,
  span: "CreateCacheParameterGroup",
}));

export type CreateCacheSecurityGroupError =
  | CacheSecurityGroupAlreadyExistsFault
  | CacheSecurityGroupQuotaExceededFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a new cache security group. Use a cache security group to control access to
 * one or more clusters.
 *
 * Cache security groups are only used when you are creating a cluster outside of an
 * Amazon Virtual Private Cloud (Amazon VPC). If you are creating a cluster inside of a
 * VPC, use a cache subnet group instead. For more information, see CreateCacheSubnetGroup.
 */
export const createCacheSecurityGroup: API.OperationMethod<
  CreateCacheSecurityGroupMessage & RegionInput,
  CreateCacheSecurityGroupResult,
  CreateCacheSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1392, __c87, 0) as any as S.Schema<CreateCacheSecurityGroupMessage>,
  output: __S(1393, __c87, 1) as any as S.Schema<CreateCacheSecurityGroupResult>,
  errors: [
    CacheSecurityGroupAlreadyExistsFault,
    CacheSecurityGroupQuotaExceededFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCacheSecurityGroup",
  telemetry: TELEMETRY,
  span: "CreateCacheSecurityGroup",
}));

export type CreateCacheSubnetGroupError =
  | CacheSubnetGroupAlreadyExistsFault
  | CacheSubnetGroupQuotaExceededFault
  | CacheSubnetQuotaExceededFault
  | InvalidSubnet
  | SubnetNotAllowedFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a new cache subnet group.
 *
 * Use this parameter only when you are creating a cluster in an Amazon Virtual Private
 * Cloud (Amazon VPC).
 */
export const createCacheSubnetGroup: API.OperationMethod<
  CreateCacheSubnetGroupMessage & RegionInput,
  CreateCacheSubnetGroupResult,
  CreateCacheSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<CreateCacheSubnetGroupMessage>,
  output: __S(1409, __c88, 1) as any as S.Schema<CreateCacheSubnetGroupResult>,
  errors: [
    CacheSubnetGroupAlreadyExistsFault,
    CacheSubnetGroupQuotaExceededFault,
    CacheSubnetQuotaExceededFault,
    InvalidSubnet,
    SubnetNotAllowedFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCacheSubnetGroup",
  telemetry: TELEMETRY,
  span: "CreateCacheSubnetGroup",
}));

export type CreateGlobalReplicationGroupError =
  | GlobalReplicationGroupAlreadyExistsFault
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | ReplicationGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Global Datastore offers fully managed, fast, reliable and secure
 * cross-region replication. Using Global Datastore with Valkey or Redis OSS, you can create cross-region
 * read replica clusters for ElastiCache to enable low-latency reads and disaster
 * recovery across regions. For more information, see Replication
 * Across Regions Using Global Datastore.
 *
 * - The **GlobalReplicationGroupIdSuffix** is the
 * name of the Global datastore.
 *
 * - The **PrimaryReplicationGroupId** represents the
 * name of the primary cluster that accepts writes and will replicate updates to
 * the secondary cluster.
 */
export const createGlobalReplicationGroup: API.OperationMethod<
  CreateGlobalReplicationGroupMessage & RegionInput,
  CreateGlobalReplicationGroupResult,
  CreateGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1456, __c91, 0) as any as S.Schema<CreateGlobalReplicationGroupMessage>,
  output: __S(1457, __c91, 1) as any as S.Schema<CreateGlobalReplicationGroupResult>,
  errors: [
    GlobalReplicationGroupAlreadyExistsFault,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlobalReplicationGroup",
  telemetry: TELEMETRY,
  span: "CreateGlobalReplicationGroup",
}));

export type CreateReplicationGroupError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | ClusterQuotaForCustomerExceededFault
  | GlobalReplicationGroupNotFoundFault
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidUserGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeGroupsPerReplicationGroupQuotaExceededFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ReplicationGroupAlreadyExistsFault
  | TagQuotaPerResourceExceeded
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * Creates a Valkey or Redis OSS (cluster mode disabled) or a Valkey or Redis OSS (cluster mode enabled) replication
 * group.
 *
 * This API can be used to create a standalone regional replication group or a secondary
 * replication group associated with a Global datastore.
 *
 * A Valkey or Redis OSS (cluster mode disabled) replication group is a collection of nodes, where
 * one of the nodes is a read/write primary and the others are read-only replicas.
 * Writes to the primary are asynchronously propagated to the replicas.
 *
 * A Valkey or Redis OSS cluster-mode enabled cluster is comprised of from 1 to 90 shards (API/CLI:
 * node groups). Each shard has a primary node and up to 5 read-only replica nodes. The
 * configuration can range from 90 shards and 0 replicas to 15 shards and 5 replicas, which
 * is the maximum number or replicas allowed.
 *
 * The node or shard limit can be increased to a maximum of 500 per cluster if the Valkey or Redis OSS
 * engine version is 5.0.6 or higher. For example, you can choose to configure a 500 node
 * cluster that ranges between 83 shards (one primary and 5 replicas per shard) and 500
 * shards (single primary and no replicas). Make sure there are enough available IP
 * addresses to accommodate the increase. Common pitfalls include the subnets in the subnet
 * group have too small a CIDR range or the subnets are shared and heavily used by other
 * clusters. For more information, see Creating a Subnet
 * Group. For versions below 5.0.6, the limit is 250 per cluster.
 *
 * To request a limit increase, see Amazon Service Limits and
 * choose the limit type Nodes per cluster per instance
 * type.
 *
 * When a Valkey or Redis OSS (cluster mode disabled) replication group has been successfully created,
 * you can add one or more read replicas to it, up to a total of 5 read replicas. If you
 * need to increase or decrease the number of node groups (console: shards), you can use scaling.
 * For more information, see Scaling self-designed clusters in the ElastiCache User
 * Guide.
 *
 * This operation is valid for Valkey and Redis OSS only.
 */
export const createReplicationGroup: API.OperationMethod<
  CreateReplicationGroupMessage & RegionInput,
  CreateReplicationGroupResult,
  CreateReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1490, __c93, 2) as any as S.Schema<CreateReplicationGroupMessage>,
  output: __S(1491, __c93, 3) as any as S.Schema<CreateReplicationGroupResult>,
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    ClusterQuotaForCustomerExceededFault,
    GlobalReplicationGroupNotFoundFault,
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidUserGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeGroupsPerReplicationGroupQuotaExceededFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ReplicationGroupAlreadyExistsFault,
    TagQuotaPerResourceExceeded,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationGroup",
  telemetry: TELEMETRY,
  span: "CreateReplicationGroup",
}));

export type CreateServerlessCacheError =
  | InvalidCredentialsException
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidServerlessCacheStateFault
  | InvalidUserGroupStateFault
  | ServerlessCacheAlreadyExistsFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheQuotaForCustomerExceededFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * Creates a serverless cache.
 */
export const createServerlessCache: API.OperationMethod<
  CreateServerlessCacheRequest & RegionInput,
  CreateServerlessCacheResponse,
  CreateServerlessCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c94, 0) as any as S.Schema<CreateServerlessCacheRequest>,
  output: __S(1505, __c94, 1) as any as S.Schema<CreateServerlessCacheResponse>,
  errors: [
    InvalidCredentialsException,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidServerlessCacheStateFault,
    InvalidUserGroupStateFault,
    ServerlessCacheAlreadyExistsFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheQuotaForCustomerExceededFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServerlessCache",
  telemetry: TELEMETRY,
  span: "CreateServerlessCache",
}));

export type CreateServerlessCacheSnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidServerlessCacheStateFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotAlreadyExistsFault
  | ServerlessCacheSnapshotQuotaExceededFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * This API creates a copy of an entire ServerlessCache at a specific moment in time. Available for Valkey, Redis OSS and Serverless Memcached only.
 */
export const createServerlessCacheSnapshot: API.OperationMethod<
  CreateServerlessCacheSnapshotRequest & RegionInput,
  CreateServerlessCacheSnapshotResponse,
  CreateServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<CreateServerlessCacheSnapshotRequest>,
  output: __S(1537, __c96, 1) as any as S.Schema<CreateServerlessCacheSnapshotResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidServerlessCacheStateFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotAlreadyExistsFault,
    ServerlessCacheSnapshotQuotaExceededFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServerlessCacheSnapshot",
  telemetry: TELEMETRY,
  span: "CreateServerlessCacheSnapshot",
}));

export type CreateSnapshotError =
  | CacheClusterNotFoundFault
  | InvalidCacheClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | ReplicationGroupNotFoundFault
  | SnapshotAlreadyExistsFault
  | SnapshotFeatureNotSupportedFault
  | SnapshotQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a copy of an entire cluster or replication group at a specific moment in
 * time.
 *
 * This operation is valid for Valkey or Redis OSS only.
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotMessage & RegionInput,
  CreateSnapshotResult,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<CreateSnapshotMessage>,
  output: __S(1553, __c97, 1) as any as S.Schema<CreateSnapshotResult>,
  errors: [
    CacheClusterNotFoundFault,
    InvalidCacheClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupNotFoundFault,
    SnapshotAlreadyExistsFault,
    SnapshotFeatureNotSupportedFault,
    SnapshotQuotaExceededFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
  telemetry: TELEMETRY,
  span: "CreateSnapshot",
}));

export type CreateUserError =
  | DuplicateUserNameFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | UserAlreadyExistsFault
  | UserQuotaExceededFault
  | CommonErrors;
/**
 * For Valkey engine version 7.2 onwards and Redis OSS 6.0 to 7.1: Creates a user. For more information, see
 * Using Role Based Access Control (RBAC).
 */
export const createUser: API.OperationMethod<
  CreateUserMessage & RegionInput,
  User,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<CreateUserMessage>,
  output: __S(1585, __c99, 1) as any as S.Schema<User>,
  errors: [
    DuplicateUserNameFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
    UserAlreadyExistsFault,
    UserQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
  telemetry: TELEMETRY,
  span: "CreateUser",
}));

export type CreateUserGroupError =
  | DefaultUserRequired
  | DuplicateUserNameFault
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | UserGroupAlreadyExistsFault
  | UserGroupQuotaExceededFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * For Valkey engine version 7.2 onwards and Redis OSS 6.0 to 7.1: Creates a user group. For more
 * information, see Using Role Based Access Control (RBAC)
 */
export const createUserGroup: API.OperationMethod<
  CreateUserGroupMessage & RegionInput,
  UserGroup,
  CreateUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<CreateUserGroupMessage>,
  output: __S(1636, __c102, 4) as any as S.Schema<UserGroup>,
  errors: [
    DefaultUserRequired,
    DuplicateUserNameFault,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
    UserGroupAlreadyExistsFault,
    UserGroupQuotaExceededFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserGroup",
  telemetry: TELEMETRY,
  span: "CreateUserGroup",
}));

export type DecreaseNodeGroupsInGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Decreases the number of node groups in a Global datastore
 */
export const decreaseNodeGroupsInGlobalReplicationGroup: API.OperationMethod<
  DecreaseNodeGroupsInGlobalReplicationGroupMessage & RegionInput,
  DecreaseNodeGroupsInGlobalReplicationGroupResult,
  DecreaseNodeGroupsInGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1665, __c104, 1) as any as S.Schema<DecreaseNodeGroupsInGlobalReplicationGroupMessage>,
  output: __S(1666, __c104, 2) as any as S.Schema<DecreaseNodeGroupsInGlobalReplicationGroupResult>,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DecreaseNodeGroupsInGlobalReplicationGroup",
  telemetry: TELEMETRY,
  span: "DecreaseNodeGroupsInGlobalReplicationGroup",
}));

export type DecreaseReplicaCountError =
  | ClusterQuotaForCustomerExceededFault
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeGroupsPerReplicationGroupQuotaExceededFault
  | NodeQuotaForCustomerExceededFault
  | NoOperationFault
  | ReplicationGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Dynamically decreases the number of replicas in a Valkey or Redis OSS (cluster mode disabled)
 * replication group or the number of replica nodes in one or more node groups (shards) of
 * a Valkey or Redis OSS (cluster mode enabled) replication group. This operation is performed with no
 * cluster down time.
 */
export const decreaseReplicaCount: API.OperationMethod<
  DecreaseReplicaCountMessage & RegionInput,
  DecreaseReplicaCountResult,
  DecreaseReplicaCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1681, __c105, 1) as any as S.Schema<DecreaseReplicaCountMessage>,
  output: __S(1682, __c105, 2) as any as S.Schema<DecreaseReplicaCountResult>,
  errors: [
    ClusterQuotaForCustomerExceededFault,
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeGroupsPerReplicationGroupQuotaExceededFault,
    NodeQuotaForCustomerExceededFault,
    NoOperationFault,
    ReplicationGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DecreaseReplicaCount",
  telemetry: TELEMETRY,
  span: "DecreaseReplicaCount",
}));

export type DeleteCacheClusterError =
  | CacheClusterNotFoundFault
  | InvalidCacheClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | SnapshotAlreadyExistsFault
  | SnapshotFeatureNotSupportedFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Deletes a previously provisioned cluster. `DeleteCacheCluster` deletes all
 * associated cache nodes, node endpoints and the cluster itself. When you receive a
 * successful response from this operation, Amazon ElastiCache immediately begins deleting
 * the cluster; you cannot cancel or revert this operation.
 *
 * This operation is not valid for:
 *
 * - Valkey or Redis OSS (cluster mode enabled) clusters
 *
 * - Valkey or Redis OSS (cluster mode disabled) clusters
 *
 * - A cluster that is the last read replica of a replication group
 *
 * - A cluster that is the primary node of a replication group
 *
 * - A node group (shard) that has Multi-AZ mode enabled
 *
 * - A cluster from a Valkey or Redis OSS (cluster mode enabled) replication group
 *
 * - A cluster that is not in the `available` state
 */
export const deleteCacheCluster: API.OperationMethod<
  DeleteCacheClusterMessage & RegionInput,
  DeleteCacheClusterResult,
  DeleteCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1712, __c107, 0) as any as S.Schema<DeleteCacheClusterMessage>,
  output: __S(1713, __c107, 1) as any as S.Schema<DeleteCacheClusterResult>,
  errors: [
    CacheClusterNotFoundFault,
    InvalidCacheClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    SnapshotAlreadyExistsFault,
    SnapshotFeatureNotSupportedFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheCluster",
  telemetry: TELEMETRY,
  span: "DeleteCacheCluster",
}));

export type DeleteCacheParameterGroupError =
  | CacheParameterGroupNotFoundFault
  | InvalidCacheParameterGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Deletes the specified cache parameter group. You cannot delete a cache parameter group
 * if it is associated with any cache clusters. You cannot delete the default cache
 * parameter groups in your account.
 */
export const deleteCacheParameterGroup: API.OperationMethod<
  DeleteCacheParameterGroupMessage & RegionInput,
  DeleteCacheParameterGroupResponse,
  DeleteCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c108, 0) as any as S.Schema<DeleteCacheParameterGroupMessage>,
  output: __S(1729, __c108, 1) as any as S.Schema<DeleteCacheParameterGroupResponse>,
  errors: [
    CacheParameterGroupNotFoundFault,
    InvalidCacheParameterGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheParameterGroup",
  telemetry: TELEMETRY,
  span: "DeleteCacheParameterGroup",
}));

export type DeleteCacheSecurityGroupError =
  | CacheSecurityGroupNotFoundFault
  | InvalidCacheSecurityGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Deletes a cache security group.
 *
 * You cannot delete a cache security group if it is associated with any
 * clusters.
 */
export const deleteCacheSecurityGroup: API.OperationMethod<
  DeleteCacheSecurityGroupMessage & RegionInput,
  DeleteCacheSecurityGroupResponse,
  DeleteCacheSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1744, __c109, 0) as any as S.Schema<DeleteCacheSecurityGroupMessage>,
  output: __S(1745, __c109, 1) as any as S.Schema<DeleteCacheSecurityGroupResponse>,
  errors: [
    CacheSecurityGroupNotFoundFault,
    InvalidCacheSecurityGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheSecurityGroup",
  telemetry: TELEMETRY,
  span: "DeleteCacheSecurityGroup",
}));

export type DeleteCacheSubnetGroupError =
  | CacheSubnetGroupInUse
  | CacheSubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Deletes a cache subnet group.
 *
 * You cannot delete a default cache subnet group or one that is associated with any
 * clusters.
 */
export const deleteCacheSubnetGroup: API.OperationMethod<
  DeleteCacheSubnetGroupMessage & RegionInput,
  DeleteCacheSubnetGroupResponse,
  DeleteCacheSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c110, 0) as any as S.Schema<DeleteCacheSubnetGroupMessage>,
  output: __S(1761, __c110, 1) as any as S.Schema<DeleteCacheSubnetGroupResponse>,
  errors: [CacheSubnetGroupInUse, CacheSubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheSubnetGroup",
  telemetry: TELEMETRY,
  span: "DeleteCacheSubnetGroup",
}));

export type DeleteGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Deleting a Global datastore is a two-step process:
 *
 * - First, you must DisassociateGlobalReplicationGroup to remove
 * the secondary clusters in the Global datastore.
 *
 * - Once the Global datastore contains only the primary cluster, you can use the
 * `DeleteGlobalReplicationGroup` API to delete the Global datastore
 * while retainining the primary cluster using
 * `RetainPrimaryReplicationGroup=true`.
 *
 * Since the Global Datastore has only a primary cluster, you can delete the Global
 * Datastore while retaining the primary by setting
 * `RetainPrimaryReplicationGroup=true`. The primary cluster is never
 * deleted when deleting a Global Datastore. It can only be deleted when it no longer is
 * associated with any Global Datastore.
 *
 * When you receive a successful response from this operation, Amazon ElastiCache
 * immediately begins deleting the selected resources; you cannot cancel or revert this
 * operation.
 */
export const deleteGlobalReplicationGroup: API.OperationMethod<
  DeleteGlobalReplicationGroupMessage & RegionInput,
  DeleteGlobalReplicationGroupResult,
  DeleteGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteGlobalReplicationGroupMessage>,
  output: __S(1, __c0, 1) as any as S.Schema<DeleteGlobalReplicationGroupResult>,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlobalReplicationGroup",
  telemetry: TELEMETRY,
  span: "DeleteGlobalReplicationGroup",
}));

export type DeleteReplicationGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | ReplicationGroupNotFoundFault
  | SnapshotAlreadyExistsFault
  | SnapshotFeatureNotSupportedFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Deletes an existing replication group. By default, this operation deletes the entire
 * replication group, including the primary/primaries and all of the read replicas. If the
 * replication group has only one primary, you can optionally delete only the read
 * replicas, while retaining the primary by setting
 * `RetainPrimaryCluster=true`.
 *
 * When you receive a successful response from this operation, Amazon ElastiCache
 * immediately begins deleting the selected resources; you cannot cancel or revert this
 * operation.
 *
 * - `CreateSnapshot` permission is required to create a final snapshot.
 * Without this permission, the API call will fail with an `Access Denied` exception.
 *
 * - This operation is valid for Redis OSS only.
 */
export const deleteReplicationGroup: API.OperationMethod<
  DeleteReplicationGroupMessage & RegionInput,
  DeleteReplicationGroupResult,
  DeleteReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<DeleteReplicationGroupMessage>,
  output: __S(17, __c1, 1) as any as S.Schema<DeleteReplicationGroupResult>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupNotFoundFault,
    SnapshotAlreadyExistsFault,
    SnapshotFeatureNotSupportedFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationGroup",
  telemetry: TELEMETRY,
  span: "DeleteReplicationGroup",
}));

export type DeleteServerlessCacheError =
  | InvalidCredentialsException
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidServerlessCacheStateFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotAlreadyExistsFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Deletes a specified existing serverless cache.
 *
 * `CreateServerlessCacheSnapshot` permission is required to create a final snapshot.
 * Without this permission, the API call will fail with an `Access Denied` exception.
 */
export const deleteServerlessCache: API.OperationMethod<
  DeleteServerlessCacheRequest & RegionInput,
  DeleteServerlessCacheResponse,
  DeleteServerlessCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<DeleteServerlessCacheRequest>,
  output: __S(33, __c2, 1) as any as S.Schema<DeleteServerlessCacheResponse>,
  errors: [
    InvalidCredentialsException,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidServerlessCacheStateFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotAlreadyExistsFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServerlessCache",
  telemetry: TELEMETRY,
  span: "DeleteServerlessCache",
}));

export type DeleteServerlessCacheSnapshotError =
  | InvalidParameterValueException
  | InvalidServerlessCacheSnapshotStateFault
  | ServerlessCacheSnapshotNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Deletes an existing serverless cache snapshot. Available for Valkey, Redis OSS and Serverless Memcached only.
 */
export const deleteServerlessCacheSnapshot: API.OperationMethod<
  DeleteServerlessCacheSnapshotRequest & RegionInput,
  DeleteServerlessCacheSnapshotResponse,
  DeleteServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DeleteServerlessCacheSnapshotRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<DeleteServerlessCacheSnapshotResponse>,
  errors: [
    InvalidParameterValueException,
    InvalidServerlessCacheSnapshotStateFault,
    ServerlessCacheSnapshotNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServerlessCacheSnapshot",
  telemetry: TELEMETRY,
  span: "DeleteServerlessCacheSnapshot",
}));

export type DeleteSnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidSnapshotStateFault
  | SnapshotNotFoundFault
  | CommonErrors;
/**
 * Deletes an existing snapshot. When you receive a successful response from this
 * operation, ElastiCache immediately begins deleting the snapshot; you cannot cancel or
 * revert this operation.
 *
 * This operation is valid for Valkey or Redis OSS only.
 */
export const deleteSnapshot: API.OperationMethod<
  DeleteSnapshotMessage & RegionInput,
  DeleteSnapshotResult,
  DeleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<DeleteSnapshotMessage>,
  output: __S(65, __c4, 1) as any as S.Schema<DeleteSnapshotResult>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidSnapshotStateFault,
    SnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
  telemetry: TELEMETRY,
  span: "DeleteSnapshot",
}));

export type DeleteUserError =
  | DefaultUserAssociatedToUserGroupFault
  | InvalidParameterValueException
  | InvalidUserStateFault
  | ServiceLinkedRoleNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * For Valkey engine version 7.2 onwards and Redis OSS 6.0 onwards: Deletes a user. The user will be removed from
 * all user groups and in turn removed from all replication groups. For more information,
 * see Using Role Based Access Control (RBAC).
 */
export const deleteUser: API.OperationMethod<
  DeleteUserMessage & RegionInput,
  User,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<DeleteUserMessage>,
  output: __S(1585, __c99, 1) as any as S.Schema<User>,
  errors: [
    DefaultUserAssociatedToUserGroupFault,
    InvalidParameterValueException,
    InvalidUserStateFault,
    ServiceLinkedRoleNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
  telemetry: TELEMETRY,
  span: "DeleteUser",
}));

export type DeleteUserGroupError =
  | InvalidParameterValueException
  | InvalidUserGroupStateFault
  | ServiceLinkedRoleNotFoundFault
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * For Valkey engine version 7.2 onwards and Redis OSS 6.0 onwards: Deletes a user group. The user group must first
 * be disassociated from the replication group before it can be deleted. For more
 * information, see Using Role Based Access Control (RBAC).
 */
export const deleteUserGroup: API.OperationMethod<
  DeleteUserGroupMessage & RegionInput,
  UserGroup,
  DeleteUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DeleteUserGroupMessage>,
  output: __S(1636, __c102, 4) as any as S.Schema<UserGroup>,
  errors: [
    InvalidParameterValueException,
    InvalidUserGroupStateFault,
    ServiceLinkedRoleNotFoundFault,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserGroup",
  telemetry: TELEMETRY,
  span: "DeleteUserGroup",
}));

export type DescribeCacheClustersError =
  | CacheClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns information about all provisioned clusters if no cluster identifier is
 * specified, or about a specific cache cluster if a cluster identifier is supplied.
 *
 * By default, abbreviated information about the clusters is returned. You can use the
 * optional *ShowCacheNodeInfo* flag to retrieve detailed information
 * about the cache nodes associated with the clusters. These details include the DNS
 * address and port for the cache node endpoint.
 *
 * If the cluster is in the *creating* state, only cluster-level
 * information is displayed until all of the nodes are successfully provisioned.
 *
 * If the cluster is in the *deleting* state, only cluster-level
 * information is displayed.
 *
 * If cache nodes are currently being added to the cluster, node endpoint information and
 * creation time for the additional nodes are not displayed until they are completely
 * provisioned. When the cluster state is *available*, the cluster is
 * ready for use.
 *
 * If cache nodes are currently being removed from the cluster, no endpoint information
 * for the removed nodes is displayed.
 */
export const describeCacheClusters: API.PaginatedOperationMethod<
  DescribeCacheClustersMessage & RegionInput,
  CacheClusterMessage,
  DescribeCacheClustersError,
  Credentials | HttpClient.HttpClient,
  CacheCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DescribeCacheClustersMessage>,
  output: __S(114, __c7, 2) as any as S.Schema<CacheClusterMessage>,
  errors: [
    CacheClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheClusters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "CacheClusters",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeCacheClusters",
})) as any;

export type DescribeCacheEngineVersionsError = CommonErrors;
/**
 * Returns a list of the available cache engines and their versions.
 */
export const describeCacheEngineVersions: API.PaginatedOperationMethod<
  DescribeCacheEngineVersionsMessage & RegionInput,
  CacheEngineVersionMessage,
  DescribeCacheEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  CacheEngineVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DescribeCacheEngineVersionsMessage>,
  output: __S(131, __c8, 3) as any as S.Schema<CacheEngineVersionMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheEngineVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "CacheEngineVersions",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeCacheEngineVersions",
})) as any;

export type DescribeCacheParameterGroupsError =
  | CacheParameterGroupNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns a list of cache parameter group descriptions. If a cache parameter group name
 * is specified, the list contains only the descriptions for that group.
 */
export const describeCacheParameterGroups: API.PaginatedOperationMethod<
  DescribeCacheParameterGroupsMessage & RegionInput,
  CacheParameterGroupsMessage,
  DescribeCacheParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  CacheParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DescribeCacheParameterGroupsMessage>,
  output: __S(146, __c9, 2) as any as S.Schema<CacheParameterGroupsMessage>,
  errors: [
    CacheParameterGroupNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheParameterGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "CacheParameterGroups",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeCacheParameterGroups",
})) as any;

export type DescribeCacheParametersError =
  | CacheParameterGroupNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns the detailed parameter list for a particular cache parameter group.
 */
export const describeCacheParameters: API.PaginatedOperationMethod<
  DescribeCacheParametersMessage & RegionInput,
  CacheParameterGroupDetails,
  DescribeCacheParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DescribeCacheParametersMessage>,
  output: __S(161, __c10, 1) as any as S.Schema<CacheParameterGroupDetails>,
  errors: [
    CacheParameterGroupNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Parameters",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeCacheParameters",
})) as any;

export type DescribeCacheSecurityGroupsError =
  | CacheSecurityGroupNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns a list of cache security group descriptions. If a cache security group name is
 * specified, the list contains only the description of that group. This applicable only
 * when you have ElastiCache in Classic setup
 */
export const describeCacheSecurityGroups: API.PaginatedOperationMethod<
  DescribeCacheSecurityGroupsMessage & RegionInput,
  CacheSecurityGroupMessage,
  DescribeCacheSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  CacheSecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DescribeCacheSecurityGroupsMessage>,
  output: __S(194, __c12, 2) as any as S.Schema<CacheSecurityGroupMessage>,
  errors: [
    CacheSecurityGroupNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheSecurityGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "CacheSecurityGroups",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeCacheSecurityGroups",
})) as any;

export type DescribeCacheSubnetGroupsError = CacheSubnetGroupNotFoundFault | CommonErrors;
/**
 * Returns a list of cache subnet group descriptions. If a subnet group name is
 * specified, the list contains only the description of that group. This is applicable only
 * when you have ElastiCache in VPC setup. All ElastiCache clusters now launch in VPC by
 * default.
 */
export const describeCacheSubnetGroups: API.PaginatedOperationMethod<
  DescribeCacheSubnetGroupsMessage & RegionInput,
  CacheSubnetGroupMessage,
  DescribeCacheSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  CacheSubnetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DescribeCacheSubnetGroupsMessage>,
  output: __S(210, __c13, 2) as any as S.Schema<CacheSubnetGroupMessage>,
  errors: [CacheSubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheSubnetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "CacheSubnetGroups",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeCacheSubnetGroups",
})) as any;

export type DescribeEngineDefaultParametersError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns the default engine and system parameter information for the specified cache
 * engine.
 */
export const describeEngineDefaultParameters: API.PaginatedOperationMethod<
  DescribeEngineDefaultParametersMessage & RegionInput,
  DescribeEngineDefaultParametersResult,
  DescribeEngineDefaultParametersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DescribeEngineDefaultParametersMessage>,
  output: __S(226, __c14, 2) as any as S.Schema<DescribeEngineDefaultParametersResult>,
  errors: [InvalidParameterCombinationException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineDefaultParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "EngineDefaults.Marker",
    items: "EngineDefaults.Parameters",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeEngineDefaultParameters",
})) as any;

export type DescribeEventsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns events related to clusters, cache security groups, and cache parameter groups.
 * You can obtain events specific to a particular cluster, cache security group, or cache
 * parameter group by providing the name as a parameter.
 *
 * By default, only the events occurring within the last hour are returned; however, you
 * can retrieve up to 14 days' worth of events if necessary.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsMessage & RegionInput,
  EventsMessage,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DescribeEventsMessage>,
  output: __S(243, __c15, 3) as any as S.Schema<EventsMessage>,
  errors: [InvalidParameterCombinationException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Events",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeEvents",
})) as any;

export type DescribeGlobalReplicationGroupsError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns information about a particular global replication group. If no identifier is
 * specified, returns information about all Global datastores.
 */
export const describeGlobalReplicationGroups: API.PaginatedOperationMethod<
  DescribeGlobalReplicationGroupsMessage & RegionInput,
  DescribeGlobalReplicationGroupsResult,
  DescribeGlobalReplicationGroupsError,
  Credentials | HttpClient.HttpClient,
  GlobalReplicationGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DescribeGlobalReplicationGroupsMessage>,
  output: __S(258, __c16, 2) as any as S.Schema<DescribeGlobalReplicationGroupsResult>,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGlobalReplicationGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "GlobalReplicationGroups",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeGlobalReplicationGroups",
})) as any;

export type DescribeReplicationGroupsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Returns information about a particular replication group. If no identifier is
 * specified, `DescribeReplicationGroups` returns information about all
 * replication groups.
 *
 * This operation is valid for Valkey or Redis OSS only.
 */
export const describeReplicationGroups: API.PaginatedOperationMethod<
  DescribeReplicationGroupsMessage & RegionInput,
  ReplicationGroupMessage,
  DescribeReplicationGroupsError,
  Credentials | HttpClient.HttpClient,
  ReplicationGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DescribeReplicationGroupsMessage>,
  output: __S(274, __c17, 2) as any as S.Schema<ReplicationGroupMessage>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReplicationGroups",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeReplicationGroups",
})) as any;

export type DescribeReservedCacheNodesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedCacheNodeNotFoundFault
  | CommonErrors;
/**
 * Returns information about reserved cache nodes for this account, or about a specified
 * reserved cache node.
 */
export const describeReservedCacheNodes: API.PaginatedOperationMethod<
  DescribeReservedCacheNodesMessage & RegionInput,
  ReservedCacheNodeMessage,
  DescribeReservedCacheNodesError,
  Credentials | HttpClient.HttpClient,
  ReservedCacheNode
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<DescribeReservedCacheNodesMessage>,
  output: __S(290, __c18, 2) as any as S.Schema<ReservedCacheNodeMessage>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedCacheNodeNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedCacheNodes",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedCacheNodes",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeReservedCacheNodes",
})) as any;

export type DescribeReservedCacheNodesOfferingsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedCacheNodesOfferingNotFoundFault
  | CommonErrors;
/**
 * Lists available reserved cache node offerings.
 */
export const describeReservedCacheNodesOfferings: API.PaginatedOperationMethod<
  DescribeReservedCacheNodesOfferingsMessage & RegionInput,
  ReservedCacheNodesOfferingMessage,
  DescribeReservedCacheNodesOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedCacheNodesOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<DescribeReservedCacheNodesOfferingsMessage>,
  output: __S(339, __c21, 3) as any as S.Schema<ReservedCacheNodesOfferingMessage>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedCacheNodesOfferingNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedCacheNodesOfferings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedCacheNodesOfferings",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeReservedCacheNodesOfferings",
})) as any;

export type DescribeServerlessCachesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServerlessCacheNotFoundFault
  | CommonErrors;
/**
 * Returns information about a specific serverless cache.
 * If no identifier is specified, then the API returns information on all the serverless caches belonging to
 * this Amazon Web Services account.
 */
export const describeServerlessCaches: API.PaginatedOperationMethod<
  DescribeServerlessCachesRequest & RegionInput,
  DescribeServerlessCachesResponse,
  DescribeServerlessCachesError,
  Credentials | HttpClient.HttpClient,
  ServerlessCache
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<DescribeServerlessCachesRequest>,
  output: __S(354, __c22, 2) as any as S.Schema<DescribeServerlessCachesResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServerlessCacheNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServerlessCaches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServerlessCaches",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeServerlessCaches",
})) as any;

export type DescribeServerlessCacheSnapshotsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotNotFoundFault
  | CommonErrors;
/**
 * Returns information about serverless cache snapshots.
 * By default, this API lists all of the customer's serverless cache snapshots.
 * It can also describe a single serverless cache snapshot, or the snapshots associated with
 * a particular serverless cache. Available for Valkey, Redis OSS and Serverless Memcached only.
 */
export const describeServerlessCacheSnapshots: API.PaginatedOperationMethod<
  DescribeServerlessCacheSnapshotsRequest & RegionInput,
  DescribeServerlessCacheSnapshotsResponse,
  DescribeServerlessCacheSnapshotsError,
  Credentials | HttpClient.HttpClient,
  ServerlessCacheSnapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<DescribeServerlessCacheSnapshotsRequest>,
  output: __S(370, __c23, 2) as any as S.Schema<DescribeServerlessCacheSnapshotsResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServerlessCacheSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServerlessCacheSnapshots",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeServerlessCacheSnapshots",
})) as any;

export type DescribeServiceUpdatesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceUpdateNotFoundFault
  | CommonErrors;
/**
 * Returns details of the service updates
 */
export const describeServiceUpdates: API.PaginatedOperationMethod<
  DescribeServiceUpdatesMessage & RegionInput,
  ServiceUpdatesMessage,
  DescribeServiceUpdatesError,
  Credentials | HttpClient.HttpClient,
  ServiceUpdate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<DescribeServiceUpdatesMessage>,
  output: __S(387, __c24, 3) as any as S.Schema<ServiceUpdatesMessage>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceUpdateNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceUpdates",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ServiceUpdates",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeServiceUpdates",
})) as any;

export type DescribeSnapshotsError =
  | CacheClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | SnapshotNotFoundFault
  | CommonErrors;
/**
 * Returns information about cluster or replication group snapshots. By default,
 * `DescribeSnapshots` lists all of your snapshots; it can optionally
 * describe a single snapshot, or just the snapshots associated with a particular cache
 * cluster.
 *
 * This operation is valid for Valkey or Redis OSS only.
 */
export const describeSnapshots: API.PaginatedOperationMethod<
  DescribeSnapshotsMessage & RegionInput,
  DescribeSnapshotsListMessage,
  DescribeSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DescribeSnapshotsMessage>,
  output: __S(418, __c26, 2) as any as S.Schema<DescribeSnapshotsListMessage>,
  errors: [
    CacheClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    SnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshots",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Snapshots",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeSnapshots",
})) as any;

export type DescribeUpdateActionsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns details of the update actions
 */
export const describeUpdateActions: API.PaginatedOperationMethod<
  DescribeUpdateActionsMessage & RegionInput,
  UpdateActionsMessage,
  DescribeUpdateActionsError,
  Credentials | HttpClient.HttpClient,
  UpdateAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(434, __c27, 2) as any as S.Schema<DescribeUpdateActionsMessage>,
  output: __S(443, __c27, 11) as any as S.Schema<UpdateActionsMessage>,
  errors: [InvalidParameterCombinationException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUpdateActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "UpdateActions",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeUpdateActions",
})) as any;

export type DescribeUserGroupsError =
  | InvalidParameterCombinationException
  | ServiceLinkedRoleNotFoundFault
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a list of user groups.
 */
export const describeUserGroups: API.PaginatedOperationMethod<
  DescribeUserGroupsMessage & RegionInput,
  DescribeUserGroupsResult,
  DescribeUserGroupsError,
  Credentials | HttpClient.HttpClient,
  UserGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DescribeUserGroupsMessage>,
  output: __S(450, __c28, 2) as any as S.Schema<DescribeUserGroupsResult>,
  errors: [
    InvalidParameterCombinationException,
    ServiceLinkedRoleNotFoundFault,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "UserGroups",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeUserGroups",
})) as any;

export type DescribeUsersError =
  | InvalidParameterCombinationException
  | ServiceLinkedRoleNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Returns a list of users.
 */
export const describeUsers: API.PaginatedOperationMethod<
  DescribeUsersMessage & RegionInput,
  DescribeUsersResult,
  DescribeUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(467, __c29, 3) as any as S.Schema<DescribeUsersMessage>,
  output: __S(469, __c29, 5) as any as S.Schema<DescribeUsersResult>,
  errors: [InvalidParameterCombinationException, ServiceLinkedRoleNotFoundFault, UserNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsers",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Users",
    pageSize: "MaxRecords",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeUsers",
})) as any;

export type DisassociateGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Remove a secondary cluster from the Global datastore using the Global datastore name.
 * The secondary cluster will no longer receive updates from the primary cluster, but will
 * remain as a standalone cluster in that Amazon region.
 */
export const disassociateGlobalReplicationGroup: API.OperationMethod<
  DisassociateGlobalReplicationGroupMessage & RegionInput,
  DisassociateGlobalReplicationGroupResult,
  DisassociateGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DisassociateGlobalReplicationGroupMessage>,
  output: __S(481, __c30, 1) as any as S.Schema<DisassociateGlobalReplicationGroupResult>,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateGlobalReplicationGroup",
  telemetry: TELEMETRY,
  span: "DisassociateGlobalReplicationGroup",
}));

export type ExportServerlessCacheSnapshotError =
  | InvalidParameterValueException
  | InvalidServerlessCacheSnapshotStateFault
  | ServerlessCacheSnapshotNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Provides the functionality to export the serverless cache snapshot data to Amazon S3. Available for Valkey and Redis OSS only.
 */
export const exportServerlessCacheSnapshot: API.OperationMethod<
  ExportServerlessCacheSnapshotRequest & RegionInput,
  ExportServerlessCacheSnapshotResponse,
  ExportServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ExportServerlessCacheSnapshotRequest>,
  output: __S(497, __c31, 1) as any as S.Schema<ExportServerlessCacheSnapshotResponse>,
  errors: [
    InvalidParameterValueException,
    InvalidServerlessCacheSnapshotStateFault,
    ServerlessCacheSnapshotNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportServerlessCacheSnapshot",
  telemetry: TELEMETRY,
  span: "ExportServerlessCacheSnapshot",
}));

export type FailoverGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Used to failover the primary region to a secondary region. The secondary region will
 * become primary, and all other clusters will become secondary.
 */
export const failoverGlobalReplicationGroup: API.OperationMethod<
  FailoverGlobalReplicationGroupMessage & RegionInput,
  FailoverGlobalReplicationGroupResult,
  FailoverGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<FailoverGlobalReplicationGroupMessage>,
  output: __S(513, __c32, 1) as any as S.Schema<FailoverGlobalReplicationGroupResult>,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverGlobalReplicationGroup",
  telemetry: TELEMETRY,
  span: "FailoverGlobalReplicationGroup",
}));

export type IncreaseNodeGroupsInGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Increase the number of node groups in the Global datastore
 */
export const increaseNodeGroupsInGlobalReplicationGroup: API.OperationMethod<
  IncreaseNodeGroupsInGlobalReplicationGroupMessage & RegionInput,
  IncreaseNodeGroupsInGlobalReplicationGroupResult,
  IncreaseNodeGroupsInGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(530, __c33, 2) as any as S.Schema<IncreaseNodeGroupsInGlobalReplicationGroupMessage>,
  output: __S(531, __c33, 3) as any as S.Schema<IncreaseNodeGroupsInGlobalReplicationGroupResult>,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IncreaseNodeGroupsInGlobalReplicationGroup",
  telemetry: TELEMETRY,
  span: "IncreaseNodeGroupsInGlobalReplicationGroup",
}));

export type IncreaseReplicaCountError =
  | ClusterQuotaForCustomerExceededFault
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidKMSKeyFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeGroupsPerReplicationGroupQuotaExceededFault
  | NodeQuotaForCustomerExceededFault
  | NoOperationFault
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Dynamically increases the number of replicas in a Valkey or Redis OSS (cluster mode disabled)
 * replication group or the number of replica nodes in one or more node groups (shards) of
 * a Valkey or Redis OSS (cluster mode enabled) replication group. This operation is performed with no
 * cluster down time.
 */
export const increaseReplicaCount: API.OperationMethod<
  IncreaseReplicaCountMessage & RegionInput,
  IncreaseReplicaCountResult,
  IncreaseReplicaCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<IncreaseReplicaCountMessage>,
  output: __S(561, __c35, 1) as any as S.Schema<IncreaseReplicaCountResult>,
  errors: [
    ClusterQuotaForCustomerExceededFault,
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidKMSKeyFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeGroupsPerReplicationGroupQuotaExceededFault,
    NodeQuotaForCustomerExceededFault,
    NoOperationFault,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IncreaseReplicaCount",
  telemetry: TELEMETRY,
  span: "IncreaseReplicaCount",
}));

export type ListAllowedNodeTypeModificationsError =
  | CacheClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Lists all available node types that you can scale with your cluster's replication
 * group's current node type.
 *
 * When you use the `ModifyCacheCluster` or
 * `ModifyReplicationGroup` operations to scale your cluster or replication
 * group, the value of the `CacheNodeType` parameter must be one of the node
 * types returned by this operation.
 */
export const listAllowedNodeTypeModifications: API.OperationMethod<
  ListAllowedNodeTypeModificationsMessage & RegionInput,
  AllowedNodeTypeModificationsMessage,
  ListAllowedNodeTypeModificationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ListAllowedNodeTypeModificationsMessage>,
  output: __S(578, __c36, 2) as any as S.Schema<AllowedNodeTypeModificationsMessage>,
  errors: [
    CacheClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAllowedNodeTypeModifications",
  telemetry: TELEMETRY,
  span: "ListAllowedNodeTypeModifications",
}));

export type ListTagsForResourceError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | GlobalReplicationGroupNotFoundFault
  | InvalidARNFault
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidServerlessCacheSnapshotStateFault
  | InvalidServerlessCacheStateFault
  | ReplicationGroupNotFoundFault
  | ReservedCacheNodeNotFoundFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotNotFoundFault
  | SnapshotNotFoundFault
  | UserGroupNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Lists all tags currently on a named resource.
 *
 * A tag is a key-value pair where the key and value are case-sensitive. You can use
 * tags to categorize and track all your ElastiCache resources.
 * When you add or remove tags on replication groups, those
 * actions will be replicated to all nodes in the replication group. For more information,
 * see Resource-level permissions.
 *
 * If the cluster is not in the *available* state,
 * `ListTagsForResource` returns an error.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceMessage & RegionInput,
  TagListMessage,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListTagsForResourceMessage>,
  output: __S(944, __c59, 0) as any as S.Schema<TagListMessage>,
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    GlobalReplicationGroupNotFoundFault,
    InvalidARNFault,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidServerlessCacheSnapshotStateFault,
    InvalidServerlessCacheStateFault,
    ReplicationGroupNotFoundFault,
    ReservedCacheNodeNotFoundFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotNotFoundFault,
    SnapshotNotFoundFault,
    UserGroupNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type ModifyCacheClusterError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidCacheSecurityGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | CommonErrors;
/**
 * Modifies the settings for a cluster. You can use this operation to change one or more
 * cluster configuration parameters by specifying the parameters and the new values.
 */
export const modifyCacheCluster: API.OperationMethod<
  ModifyCacheClusterMessage & RegionInput,
  ModifyCacheClusterResult,
  ModifyCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<ModifyCacheClusterMessage>,
  output: __S(609, __c38, 1) as any as S.Schema<ModifyCacheClusterResult>,
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidCacheSecurityGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCacheCluster",
  telemetry: TELEMETRY,
  span: "ModifyCacheCluster",
}));

export type ModifyCacheParameterGroupError =
  | CacheParameterGroupNotFoundFault
  | InvalidCacheParameterGroupStateFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Modifies the parameters of a cache parameter group. You can modify up to 20 parameters
 * in a single request by submitting a list parameter name and value pairs.
 */
export const modifyCacheParameterGroup: API.OperationMethod<
  ModifyCacheParameterGroupMessage & RegionInput,
  CacheParameterGroupNameMessage,
  ModifyCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<ModifyCacheParameterGroupMessage>,
  output: __S(642, __c40, 2) as any as S.Schema<CacheParameterGroupNameMessage>,
  errors: [
    CacheParameterGroupNotFoundFault,
    InvalidCacheParameterGroupStateFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCacheParameterGroup",
  telemetry: TELEMETRY,
  span: "ModifyCacheParameterGroup",
}));

export type ModifyCacheSubnetGroupError =
  | CacheSubnetGroupNotFoundFault
  | CacheSubnetQuotaExceededFault
  | InvalidSubnet
  | SubnetInUse
  | SubnetNotAllowedFault
  | CommonErrors;
/**
 * Modifies an existing cache subnet group.
 */
export const modifyCacheSubnetGroup: API.OperationMethod<
  ModifyCacheSubnetGroupMessage & RegionInput,
  ModifyCacheSubnetGroupResult,
  ModifyCacheSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<ModifyCacheSubnetGroupMessage>,
  output: __S(657, __c41, 1) as any as S.Schema<ModifyCacheSubnetGroupResult>,
  errors: [
    CacheSubnetGroupNotFoundFault,
    CacheSubnetQuotaExceededFault,
    InvalidSubnet,
    SubnetInUse,
    SubnetNotAllowedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCacheSubnetGroup",
  telemetry: TELEMETRY,
  span: "ModifyCacheSubnetGroup",
}));

export type ModifyGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Modifies the settings for a Global datastore.
 */
export const modifyGlobalReplicationGroup: API.OperationMethod<
  ModifyGlobalReplicationGroupMessage & RegionInput,
  ModifyGlobalReplicationGroupResult,
  ModifyGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<ModifyGlobalReplicationGroupMessage>,
  output: __S(673, __c42, 1) as any as S.Schema<ModifyGlobalReplicationGroupResult>,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyGlobalReplicationGroup",
  telemetry: TELEMETRY,
  span: "ModifyGlobalReplicationGroup",
}));

export type ModifyReplicationGroupError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidCacheSecurityGroupStateFault
  | InvalidKMSKeyFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidUserGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ReplicationGroupNotFoundFault
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * Modifies the settings for a replication group. This is limited to Valkey and Redis OSS 7 and above.
 *
 * - Scaling for Valkey or Redis OSS (cluster mode enabled) in
 * the ElastiCache User Guide
 *
 * - ModifyReplicationGroupShardConfiguration in the ElastiCache API
 * Reference
 *
 * This operation is valid for Valkey or Redis OSS only.
 */
export const modifyReplicationGroup: API.OperationMethod<
  ModifyReplicationGroupMessage & RegionInput,
  ModifyReplicationGroupResult,
  ModifyReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<ModifyReplicationGroupMessage>,
  output: __S(689, __c43, 1) as any as S.Schema<ModifyReplicationGroupResult>,
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidCacheSecurityGroupStateFault,
    InvalidKMSKeyFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidUserGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ReplicationGroupNotFoundFault,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationGroup",
  telemetry: TELEMETRY,
  span: "ModifyReplicationGroup",
}));

export type ModifyReplicationGroupShardConfigurationError =
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidKMSKeyFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeGroupsPerReplicationGroupQuotaExceededFault
  | NodeQuotaForCustomerExceededFault
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Modifies a replication group's shards (node groups) by allowing you to add shards,
 * remove shards, or rebalance the keyspaces among existing shards.
 */
export const modifyReplicationGroupShardConfiguration: API.OperationMethod<
  ModifyReplicationGroupShardConfigurationMessage & RegionInput,
  ModifyReplicationGroupShardConfigurationResult,
  ModifyReplicationGroupShardConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(706, __c44, 2) as any as S.Schema<ModifyReplicationGroupShardConfigurationMessage>,
  output: __S(707, __c44, 3) as any as S.Schema<ModifyReplicationGroupShardConfigurationResult>,
  errors: [
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidKMSKeyFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeGroupsPerReplicationGroupQuotaExceededFault,
    NodeQuotaForCustomerExceededFault,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationGroupShardConfiguration",
  telemetry: TELEMETRY,
  span: "ModifyReplicationGroupShardConfiguration",
}));

export type ModifyServerlessCacheError =
  | InvalidCredentialsException
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidServerlessCacheStateFault
  | InvalidUserGroupStateFault
  | ServerlessCacheNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * This API modifies the attributes of a serverless cache.
 */
export const modifyServerlessCache: API.OperationMethod<
  ModifyServerlessCacheRequest & RegionInput,
  ModifyServerlessCacheResponse,
  ModifyServerlessCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<ModifyServerlessCacheRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<ModifyServerlessCacheResponse>,
  errors: [
    InvalidCredentialsException,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidServerlessCacheStateFault,
    InvalidUserGroupStateFault,
    ServerlessCacheNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyServerlessCache",
  telemetry: TELEMETRY,
  span: "ModifyServerlessCache",
}));

export type ModifyUserError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidUserStateFault
  | ServiceLinkedRoleNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Changes user password(s) and/or access string.
 */
export const modifyUser: API.OperationMethod<
  ModifyUserMessage & RegionInput,
  User,
  ModifyUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<ModifyUserMessage>,
  output: __S(1585, __c99, 1) as any as S.Schema<User>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidUserStateFault,
    ServiceLinkedRoleNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyUser",
  telemetry: TELEMETRY,
  span: "ModifyUser",
}));

export type ModifyUserGroupError =
  | DefaultUserRequired
  | DuplicateUserNameFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidUserGroupStateFault
  | ServiceLinkedRoleNotFoundFault
  | UserGroupNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Changes the list of users that belong to the user group.
 */
export const modifyUserGroup: API.OperationMethod<
  ModifyUserGroupMessage & RegionInput,
  UserGroup,
  ModifyUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<ModifyUserGroupMessage>,
  output: __S(1636, __c102, 4) as any as S.Schema<UserGroup>,
  errors: [
    DefaultUserRequired,
    DuplicateUserNameFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidUserGroupStateFault,
    ServiceLinkedRoleNotFoundFault,
    UserGroupNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyUserGroup",
  telemetry: TELEMETRY,
  span: "ModifyUserGroup",
}));

export type PurchaseReservedCacheNodesOfferingError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedCacheNodeAlreadyExistsFault
  | ReservedCacheNodeQuotaExceededFault
  | ReservedCacheNodesOfferingNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Allows you to purchase a reserved cache node offering. Reserved nodes are not eligible
 * for cancellation and are non-refundable. For more information, see Managing Costs with Reserved Nodes.
 */
export const purchaseReservedCacheNodesOffering: API.OperationMethod<
  PurchaseReservedCacheNodesOfferingMessage & RegionInput,
  PurchaseReservedCacheNodesOfferingResult,
  PurchaseReservedCacheNodesOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<PurchaseReservedCacheNodesOfferingMessage>,
  output: __S(769, __c48, 1) as any as S.Schema<PurchaseReservedCacheNodesOfferingResult>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedCacheNodeAlreadyExistsFault,
    ReservedCacheNodeQuotaExceededFault,
    ReservedCacheNodesOfferingNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseReservedCacheNodesOffering",
  telemetry: TELEMETRY,
  span: "PurchaseReservedCacheNodesOffering",
}));

export type RebalanceSlotsInGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Redistribute slots to ensure uniform distribution across existing shards in the
 * cluster.
 */
export const rebalanceSlotsInGlobalReplicationGroup: API.OperationMethod<
  RebalanceSlotsInGlobalReplicationGroupMessage & RegionInput,
  RebalanceSlotsInGlobalReplicationGroupResult,
  RebalanceSlotsInGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<RebalanceSlotsInGlobalReplicationGroupMessage>,
  output: __S(785, __c49, 1) as any as S.Schema<RebalanceSlotsInGlobalReplicationGroupResult>,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebalanceSlotsInGlobalReplicationGroup",
  telemetry: TELEMETRY,
  span: "RebalanceSlotsInGlobalReplicationGroup",
}));

export type RebootCacheClusterError =
  | CacheClusterNotFoundFault
  | InvalidCacheClusterStateFault
  | CommonErrors;
/**
 * Reboots some, or all, of the cache nodes within a provisioned cluster. This operation
 * applies any modified cache parameter groups to the cluster. The reboot operation takes
 * place as soon as possible, and results in a momentary outage to the cluster. During the
 * reboot, the cluster status is set to REBOOTING.
 *
 * The reboot causes the contents of the cache (for each cache node being rebooted) to be
 * lost.
 *
 * When the reboot is complete, a cluster event is created.
 *
 * Rebooting a cluster is currently supported on Memcached, Valkey and Redis OSS (cluster mode
 * disabled) clusters. Rebooting is not supported on Valkey or Redis OSS (cluster mode enabled)
 * clusters.
 *
 * If you make changes to parameters that require a Valkey or Redis OSS (cluster mode enabled) cluster
 * reboot for the changes to be applied, see Rebooting a Cluster for an alternate process.
 */
export const rebootCacheCluster: API.OperationMethod<
  RebootCacheClusterMessage & RegionInput,
  RebootCacheClusterResult,
  RebootCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<RebootCacheClusterMessage>,
  output: __S(801, __c50, 1) as any as S.Schema<RebootCacheClusterResult>,
  errors: [CacheClusterNotFoundFault, InvalidCacheClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootCacheCluster",
  telemetry: TELEMETRY,
  span: "RebootCacheCluster",
}));

export type RemoveTagsFromResourceError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | GlobalReplicationGroupNotFoundFault
  | InvalidARNFault
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidServerlessCacheSnapshotStateFault
  | InvalidServerlessCacheStateFault
  | ReplicationGroupNotFoundFault
  | ReservedCacheNodeNotFoundFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotNotFoundFault
  | SnapshotNotFoundFault
  | TagNotFoundFault
  | UserGroupNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Removes the tags identified by the `TagKeys` list from the named resource.
 * A tag is a key-value pair where the key and value are case-sensitive. You can use tags
 * to categorize and track all your ElastiCache resources.
 * When you add or remove tags on replication groups, those actions will
 * be replicated to all nodes in the replication group. For more information, see Resource-level permissions.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceMessage & RegionInput,
  TagListMessage,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(817, __c51, 1) as any as S.Schema<RemoveTagsFromResourceMessage>,
  output: __S(944, __c59, 0) as any as S.Schema<TagListMessage>,
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    GlobalReplicationGroupNotFoundFault,
    InvalidARNFault,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidServerlessCacheSnapshotStateFault,
    InvalidServerlessCacheStateFault,
    ReplicationGroupNotFoundFault,
    ReservedCacheNodeNotFoundFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotNotFoundFault,
    SnapshotNotFoundFault,
    TagNotFoundFault,
    UserGroupNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
  telemetry: TELEMETRY,
  span: "RemoveTagsFromResource",
}));

export type ResetCacheParameterGroupError =
  | CacheParameterGroupNotFoundFault
  | InvalidCacheParameterGroupStateFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Modifies the parameters of a cache parameter group to the engine or system default
 * value. You can reset specific parameters by submitting a list of parameter names. To
 * reset the entire cache parameter group, specify the `ResetAllParameters` and
 * `CacheParameterGroupName` parameters.
 */
export const resetCacheParameterGroup: API.OperationMethod<
  ResetCacheParameterGroupMessage & RegionInput,
  CacheParameterGroupNameMessage,
  ResetCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<ResetCacheParameterGroupMessage>,
  output: __S(642, __c40, 2) as any as S.Schema<CacheParameterGroupNameMessage>,
  errors: [
    CacheParameterGroupNotFoundFault,
    InvalidCacheParameterGroupStateFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetCacheParameterGroup",
  telemetry: TELEMETRY,
  span: "ResetCacheParameterGroup",
}));

export type RevokeCacheSecurityGroupIngressError =
  | AuthorizationNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | InvalidCacheSecurityGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Revokes ingress from a cache security group. Use this operation to disallow access
 * from an Amazon EC2 security group that had been previously authorized.
 */
export const revokeCacheSecurityGroupIngress: API.OperationMethod<
  RevokeCacheSecurityGroupIngressMessage & RegionInput,
  RevokeCacheSecurityGroupIngressResult,
  RevokeCacheSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<RevokeCacheSecurityGroupIngressMessage>,
  output: __S(849, __c53, 1) as any as S.Schema<RevokeCacheSecurityGroupIngressResult>,
  errors: [
    AuthorizationNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    InvalidCacheSecurityGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeCacheSecurityGroupIngress",
  telemetry: TELEMETRY,
  span: "RevokeCacheSecurityGroupIngress",
}));

export type StartMigrationError =
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | ReplicationGroupAlreadyUnderMigrationFault
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Start the migration of data.
 */
export const startMigration: API.OperationMethod<
  StartMigrationMessage & RegionInput,
  StartMigrationResponse,
  StartMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<StartMigrationMessage>,
  output: __S(865, __c54, 1) as any as S.Schema<StartMigrationResponse>,
  errors: [
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupAlreadyUnderMigrationFault,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMigration",
  telemetry: TELEMETRY,
  span: "StartMigration",
}));

export type TestFailoverError =
  | APICallRateForCustomerExceededFault
  | InvalidCacheClusterStateFault
  | InvalidKMSKeyFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | NodeGroupNotFoundFault
  | ReplicationGroupNotFoundFault
  | TestFailoverNotAvailableFault
  | CommonErrors;
/**
 * Represents the input of a `TestFailover` operation which tests automatic
 * failover on a specified node group (called shard in the console) in a replication group
 * (called cluster in the console).
 *
 * This API is designed for testing the behavior of your application in case of
 * ElastiCache failover. It is not designed to be an operational tool for initiating a
 * failover to overcome a problem you may have with the cluster. Moreover, in certain
 * conditions such as large-scale operational events, Amazon may block this API.
 *
 * **Note the following**
 *
 * - A customer can use this operation to test automatic failover on up to 15 shards
 * (called node groups in the ElastiCache API and Amazon CLI) in any rolling
 * 24-hour period.
 *
 * - If calling this operation on shards in different clusters (called replication
 * groups in the API and CLI), the calls can be made concurrently.
 *
 * - If calling this operation multiple times on different shards in the same Valkey or Redis OSS (cluster mode enabled) replication group, the first node replacement must
 * complete before a subsequent call can be made.
 *
 * - To determine whether the node replacement is complete you can check Events
 * using the Amazon ElastiCache console, the Amazon CLI, or the ElastiCache API.
 * Look for the following automatic failover related events, listed here in order
 * of occurrance:
 *
 * - Replication group message: Test Failover API called for node
 * group
 *
 * - Cache cluster message: Failover from primary node
 * to replica node
 * completed
 *
 * - Replication group message: Failover from primary node
 * to replica node
 * completed
 *
 * - Cache cluster message: Recovering cache nodes
 *
 * - Cache cluster message: Finished recovery for cache nodes
 *
 * For more information see:
 *
 * - Viewing
 * ElastiCache Events in the ElastiCache User
 * Guide
 *
 * - DescribeEvents in the ElastiCache API Reference
 *
 * Also see, Testing
 * Multi-AZ in the *ElastiCache User Guide*.
 */
export const testFailover: API.OperationMethod<
  TestFailoverMessage & RegionInput,
  TestFailoverResult,
  TestFailoverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<TestFailoverMessage>,
  output: __S(897, __c56, 1) as any as S.Schema<TestFailoverResult>,
  errors: [
    APICallRateForCustomerExceededFault,
    InvalidCacheClusterStateFault,
    InvalidKMSKeyFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    NodeGroupNotFoundFault,
    ReplicationGroupNotFoundFault,
    TestFailoverNotAvailableFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestFailover",
  telemetry: TELEMETRY,
  span: "TestFailover",
}));

export type TestMigrationError =
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | ReplicationGroupAlreadyUnderMigrationFault
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Async API to test connection between source and target replication group.
 */
export const testMigration: API.OperationMethod<
  TestMigrationMessage & RegionInput,
  TestMigrationResponse,
  TestMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<TestMigrationMessage>,
  output: __S(913, __c57, 1) as any as S.Schema<TestMigrationResponse>,
  errors: [
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupAlreadyUnderMigrationFault,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestMigration",
  telemetry: TELEMETRY,
  span: "TestMigration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalReplicationGroupId: S.optional(S.String),
          RetainPrimaryReplicationGroup: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteGlobalReplicationGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalReplicationGroup: S.optional(__S(1476, __c92, 4)) }).pipe(ns),
      ).annotate({ identifier: "DeleteGlobalReplicationGroupResult" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          RetainPrimaryCluster: S.optional(S.Boolean),
          FinalSnapshotIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteReplicationGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReplicationGroup: S.optional(__S(1147, __c71, 11)) }).pipe(ns),
      ).annotate({ identifier: "DeleteReplicationGroupResult" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerlessCacheName: S.optional(S.String),
          FinalSnapshotName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteServerlessCacheRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServerlessCache: S.optional(__S(1524, __c95, 4)) }).pipe(ns),
      ).annotate({ identifier: "DeleteServerlessCacheResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServerlessCacheSnapshotName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteServerlessCacheSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServerlessCacheSnapshot: S.optional(__S(1169, __c73, 1)) }).pipe(ns),
      ).annotate({ identifier: "DeleteServerlessCacheSnapshotResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SnapshotName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Snapshot: S.optional(__S(1234, __c77, 2)) }).pipe(ns),
      ).annotate({ identifier: "DeleteSnapshotResult" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUserMessage" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserGroupId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUserGroupMessage" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheClusterId: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          ShowCacheNodeInfo: S.optional(S.Boolean),
          ShowCacheClustersNotInReplicationGroups: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCacheClustersMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1355, __c84, 11)
          .pipe(/*@__PURE__*/ T.XmlName("CacheCluster"))
          .annotate({ identifier: "CacheCluster" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          CacheClusters: S.optional(__S(113, __c7, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "CacheClusterMessage" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          CacheParameterGroupFamily: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          DefaultOnly: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCacheEngineVersionsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          CacheParameterGroupFamily: S.optional(S.String),
          CacheEngineDescription: S.optional(S.String),
          CacheEngineVersionDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "CacheEngineVersion" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(129, __c8, 1)
          .pipe(/*@__PURE__*/ T.XmlName("CacheEngineVersion"))
          .annotate({ identifier: "CacheEngineVersion" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          CacheEngineVersions: S.optional(__S(130, __c8, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "CacheEngineVersionMessage" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheParameterGroupName: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCacheParameterGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1376, __c86, 0)
          .pipe(/*@__PURE__*/ T.XmlName("CacheParameterGroup"))
          .annotate({ identifier: "CacheParameterGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          CacheParameterGroups: S.optional(__S(145, __c9, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "CacheParameterGroupsMessage" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheParameterGroupName: S.optional(S.String),
          Source: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCacheParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          Parameters: S.optional(__S(177, __c11, 1)),
          CacheNodeTypeSpecificParameters: S.optional(__S(181, __c11, 5)),
        }).pipe(ns),
      ).annotate({ identifier: "CacheParameterGroupDetails" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterName: S.optional(S.String),
          ParameterValue: S.optional(S.String),
          Description: S.optional(S.String),
          Source: S.optional(S.String),
          DataType: S.optional(S.String),
          AllowedValues: S.optional(S.String),
          IsModifiable: S.optional(S.Boolean),
          MinimumEngineVersion: S.optional(S.String),
          ChangeType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Parameter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(176, __c11, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Parameter"))
          .annotate({ identifier: "Parameter" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ CacheNodeType: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "CacheNodeTypeSpecificValue" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(178, __c11, 2)
          .pipe(/*@__PURE__*/ T.XmlName("CacheNodeTypeSpecificValue"))
          .annotate({ identifier: "CacheNodeTypeSpecificValue" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          ParameterName: S.optional(S.String),
          Description: S.optional(S.String),
          Source: S.optional(S.String),
          DataType: S.optional(S.String),
          AllowedValues: S.optional(S.String),
          IsModifiable: S.optional(S.Boolean),
          MinimumEngineVersion: S.optional(S.String),
          CacheNodeTypeSpecificValues: S.optional(__S(179, __c11, 3)),
          ChangeType: S.optional(S.String),
        }),
      ).annotate({ identifier: "CacheNodeTypeSpecificParameter" });
    case 5:
      return S.Array(
        /*@__PURE__*/ __S(180, __c11, 4)
          .pipe(/*@__PURE__*/ T.XmlName("CacheNodeTypeSpecificParameter"))
          .annotate({ identifier: "CacheNodeTypeSpecificParameter" }),
      );
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheSecurityGroupName: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCacheSecurityGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1010, __c63, 2)
          .pipe(/*@__PURE__*/ T.XmlName("CacheSecurityGroup"))
          .annotate({ identifier: "CacheSecurityGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          CacheSecurityGroups: S.optional(__S(193, __c12, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "CacheSecurityGroupMessage" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheSubnetGroupName: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCacheSubnetGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1429, __c89, 5)
          .pipe(/*@__PURE__*/ T.XmlName("CacheSubnetGroup"))
          .annotate({ identifier: "CacheSubnetGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          CacheSubnetGroups: S.optional(__S(209, __c13, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "CacheSubnetGroupMessage" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheParameterGroupFamily: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEngineDefaultParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CacheParameterGroupFamily: S.optional(S.String),
          Marker: S.optional(S.String),
          Parameters: S.optional(__S(177, __c11, 1)),
          CacheNodeTypeSpecificParameters: S.optional(__S(181, __c11, 5)),
        }),
      ).annotate({ identifier: "EngineDefaults" });
    case 2:
      return S.suspend(() =>
        S.Struct({ EngineDefaults: S.optional(__S(225, __c14, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeEngineDefaultParametersResult" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceIdentifier: S.optional(S.String),
          SourceType: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Duration: S.optional(S.Number),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceIdentifier: S.optional(S.String),
          SourceType: S.optional(S.String),
          Message: S.optional(S.String),
          Date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Event" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(241, __c15, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Event"))
          .annotate({ identifier: "Event" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), Events: S.optional(__S(242, __c15, 2)) }).pipe(ns),
      ).annotate({ identifier: "EventsMessage" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalReplicationGroupId: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          ShowMemberInfo: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeGlobalReplicationGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1476, __c92, 4)
          .pipe(/*@__PURE__*/ T.XmlName("GlobalReplicationGroup"))
          .annotate({ identifier: "GlobalReplicationGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          GlobalReplicationGroups: S.optional(__S(257, __c16, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeGlobalReplicationGroupsResult" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeReplicationGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1147, __c71, 11)
          .pipe(/*@__PURE__*/ T.XmlName("ReplicationGroup"))
          .annotate({ identifier: "ReplicationGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ReplicationGroups: S.optional(__S(273, __c17, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ReplicationGroupMessage" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedCacheNodeId: S.optional(S.String),
          ReservedCacheNodesOfferingId: S.optional(S.String),
          CacheNodeType: S.optional(S.String),
          Duration: S.optional(S.String),
          ProductDescription: S.optional(S.String),
          OfferingType: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeReservedCacheNodesMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(320, __c20, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ReservedCacheNode"))
          .annotate({ identifier: "ReservedCacheNode" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ReservedCacheNodes: S.optional(__S(289, __c18, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ReservedCacheNodeMessage" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecurringChargeAmount: S.optional(S.Number),
          RecurringChargeFrequency: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecurringCharge" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(304, __c19, 0)
          .pipe(/*@__PURE__*/ T.XmlName("RecurringCharge"))
          .annotate({ identifier: "RecurringCharge" }),
      );
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedCacheNodeId: S.optional(S.String),
          ReservedCacheNodesOfferingId: S.optional(S.String),
          CacheNodeType: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Duration: S.optional(S.Number),
          FixedPrice: S.optional(S.Number),
          UsagePrice: S.optional(S.Number),
          CacheNodeCount: S.optional(S.Number),
          ProductDescription: S.optional(S.String),
          OfferingType: S.optional(S.String),
          State: S.optional(S.String),
          RecurringCharges: S.optional(__S(305, __c19, 1)),
          ReservationARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReservedCacheNode" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedCacheNodesOfferingId: S.optional(S.String),
          CacheNodeType: S.optional(S.String),
          Duration: S.optional(S.String),
          ProductDescription: S.optional(S.String),
          OfferingType: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeReservedCacheNodesOfferingsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReservedCacheNodesOfferingId: S.optional(S.String),
          CacheNodeType: S.optional(S.String),
          Duration: S.optional(S.Number),
          FixedPrice: S.optional(S.Number),
          UsagePrice: S.optional(S.Number),
          ProductDescription: S.optional(S.String),
          OfferingType: S.optional(S.String),
          RecurringCharges: S.optional(__S(305, __c19, 1)),
        }),
      ).annotate({ identifier: "ReservedCacheNodesOffering" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(337, __c21, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ReservedCacheNodesOffering"))
          .annotate({ identifier: "ReservedCacheNodesOffering" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ReservedCacheNodesOfferings: S.optional(__S(338, __c21, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ReservedCacheNodesOfferingMessage" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerlessCacheName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeServerlessCachesRequest" });
    case 1:
      return S.Array(__S(1524, __c95, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ServerlessCaches: S.optional(__S(353, __c22, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeServerlessCachesResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerlessCacheName: S.optional(S.String),
          ServerlessCacheSnapshotName: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeServerlessCacheSnapshotsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1169, __c73, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ServerlessCacheSnapshot"))
          .annotate({ identifier: "ServerlessCacheSnapshot" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ServerlessCacheSnapshots: S.optional(__S(369, __c23, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeServerlessCacheSnapshotsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceUpdateName: S.optional(S.String),
          ServiceUpdateStatus: S.optional(__S(400, __c25, 0)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeServiceUpdatesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServiceUpdateName: S.optional(S.String),
          ServiceUpdateReleaseDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          ServiceUpdateEndDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ServiceUpdateSeverity: S.optional(S.String),
          ServiceUpdateRecommendedApplyByDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          ServiceUpdateStatus: S.optional(S.String),
          ServiceUpdateDescription: S.optional(S.String),
          ServiceUpdateType: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          AutoUpdateAfterRecommendedApplyByDate: S.optional(S.Boolean),
          EstimatedUpdateTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceUpdate" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(385, __c24, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ServiceUpdate"))
          .annotate({ identifier: "ServiceUpdate" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ServiceUpdates: S.optional(__S(386, __c24, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ServiceUpdatesMessage" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          CacheClusterId: S.optional(S.String),
          SnapshotName: S.optional(S.String),
          SnapshotSource: S.optional(S.String),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          ShowNodeGroupConfig: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSnapshotsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1234, __c77, 2)
          .pipe(/*@__PURE__*/ T.XmlName("Snapshot"))
          .annotate({ identifier: "Snapshot" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), Snapshots: S.optional(__S(417, __c26, 1)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeSnapshotsListMessage" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "TimeRangeFilter" });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          ServiceUpdateName: S.optional(S.String),
          ReplicationGroupIds: S.optional(__S(1056, __c66, 0)),
          CacheClusterIds: S.optional(__S(1057, __c66, 1)),
          Engine: S.optional(S.String),
          ServiceUpdateStatus: S.optional(__S(400, __c25, 0)),
          ServiceUpdateTimeRange: S.optional(__S(432, __c27, 0)),
          UpdateActionStatus: S.optional(__S(433, __c27, 1)),
          ShowNodeLevelUpdateStatus: S.optional(S.Boolean),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeUpdateActionsMessage" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CacheClusterId: S.optional(S.String),
          CacheNodeId: S.optional(S.String),
          NodeUpdateStatus: S.optional(S.String),
          NodeDeletionDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NodeUpdateStartDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NodeUpdateEndDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NodeUpdateInitiatedBy: S.optional(S.String),
          NodeUpdateInitiatedDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          NodeUpdateStatusModifiedDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "NodeGroupMemberUpdateStatus" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(435, __c27, 3)
          .pipe(/*@__PURE__*/ T.XmlName("NodeGroupMemberUpdateStatus"))
          .annotate({ identifier: "NodeGroupMemberUpdateStatus" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          NodeGroupId: S.optional(S.String),
          NodeGroupMemberUpdateStatus: S.optional(__S(436, __c27, 4)),
        }),
      ).annotate({ identifier: "NodeGroupUpdateStatus" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(437, __c27, 5)
          .pipe(/*@__PURE__*/ T.XmlName("NodeGroupUpdateStatus"))
          .annotate({ identifier: "NodeGroupUpdateStatus" }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({
          CacheNodeId: S.optional(S.String),
          NodeUpdateStatus: S.optional(S.String),
          NodeDeletionDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NodeUpdateStartDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NodeUpdateEndDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NodeUpdateInitiatedBy: S.optional(S.String),
          NodeUpdateInitiatedDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          NodeUpdateStatusModifiedDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "CacheNodeUpdateStatus" });
    case 8:
      return S.Array(
        /*@__PURE__*/ __S(439, __c27, 7)
          .pipe(/*@__PURE__*/ T.XmlName("CacheNodeUpdateStatus"))
          .annotate({ identifier: "CacheNodeUpdateStatus" }),
      );
    case 9:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          CacheClusterId: S.optional(S.String),
          ServiceUpdateName: S.optional(S.String),
          ServiceUpdateReleaseDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          ServiceUpdateSeverity: S.optional(S.String),
          ServiceUpdateStatus: S.optional(S.String),
          ServiceUpdateRecommendedApplyByDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          ServiceUpdateType: S.optional(S.String),
          UpdateActionAvailableDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          UpdateActionStatus: S.optional(S.String),
          NodesUpdated: S.optional(S.String),
          UpdateActionStatusModifiedDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          SlaMet: S.optional(S.String),
          NodeGroupUpdateStatus: S.optional(__S(438, __c27, 6)),
          CacheNodeUpdateStatus: S.optional(__S(440, __c27, 8)),
          EstimatedUpdateTime: S.optional(S.String),
          Engine: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateAction" });
    case 10:
      return S.Array(
        /*@__PURE__*/ __S(441, __c27, 9)
          .pipe(/*@__PURE__*/ T.XmlName("UpdateAction"))
          .annotate({ identifier: "UpdateAction" }),
      );
    case 11:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          UpdateActions: S.optional(__S(442, __c27, 10)),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateActionsMessage" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserGroupId: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeUserGroupsMessage" });
    case 1:
      return S.Array(__S(1636, __c102, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({ UserGroups: S.optional(__S(449, __c28, 1)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeUserGroupsResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(464, __c29, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          UserId: S.optional(S.String),
          Filters: S.optional(__S(466, __c29, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeUsersMessage" });
    case 4:
      return S.Array(__S(1585, __c99, 1));
    case 5:
      return S.suspend(() =>
        S.Struct({ Users: S.optional(__S(468, __c29, 4)), Marker: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DescribeUsersResult" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalReplicationGroupId: S.optional(S.String),
          ReplicationGroupId: S.optional(S.String),
          ReplicationGroupRegion: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateGlobalReplicationGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalReplicationGroup: S.optional(__S(1476, __c92, 4)) }).pipe(ns),
      ).annotate({ identifier: "DisassociateGlobalReplicationGroupResult" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerlessCacheSnapshotName: S.optional(S.String),
          S3BucketName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExportServerlessCacheSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServerlessCacheSnapshot: S.optional(__S(1169, __c73, 1)) }).pipe(ns),
      ).annotate({ identifier: "ExportServerlessCacheSnapshotResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalReplicationGroupId: S.optional(S.String),
          PrimaryRegion: S.optional(S.String),
          PrimaryReplicationGroupId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "FailoverGlobalReplicationGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalReplicationGroup: S.optional(__S(1476, __c92, 4)) }).pipe(ns),
      ).annotate({ identifier: "FailoverGlobalReplicationGroupResult" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          ReplicationGroupRegion: S.optional(S.String),
          ReshardingConfiguration: S.optional(__S(545, __c34, 1)),
        }),
      ).annotate({ identifier: "RegionalConfiguration" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(528, __c33, 0)
          .pipe(/*@__PURE__*/ T.XmlName("RegionalConfiguration"))
          .annotate({ identifier: "RegionalConfiguration" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          GlobalReplicationGroupId: S.optional(S.String),
          NodeGroupCount: S.optional(S.Number),
          RegionalConfigurations: S.optional(__S(529, __c33, 1)),
          ApplyImmediately: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "IncreaseNodeGroupsInGlobalReplicationGroupMessage" });
    case 3:
      return S.suspend(() =>
        S.Struct({ GlobalReplicationGroup: S.optional(__S(1476, __c92, 4)) }).pipe(ns),
      ).annotate({ identifier: "IncreaseNodeGroupsInGlobalReplicationGroupResult" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NodeGroupId: S.optional(S.String),
          PreferredAvailabilityZones: S.optional(__S(1216, __c76, 0)),
        }),
      ).annotate({ identifier: "ReshardingConfiguration" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(544, __c34, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ReshardingConfiguration"))
          .annotate({ identifier: "ReshardingConfiguration" }),
      );
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          NewReplicaCount: S.optional(S.Number),
          ReplicaConfiguration: S.optional(__S(1697, __c106, 1)),
          ApplyImmediately: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "IncreaseReplicaCountMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReplicationGroup: S.optional(__S(1147, __c71, 11)) }).pipe(ns),
      ).annotate({ identifier: "IncreaseReplicaCountResult" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheClusterId: S.optional(S.String),
          ReplicationGroupId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAllowedNodeTypeModificationsMessage" });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          ScaleUpModifications: S.optional(__S(577, __c36, 1)),
          ScaleDownModifications: S.optional(__S(577, __c36, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "AllowedNodeTypeModificationsMessage" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceMessage" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheClusterId: S.optional(S.String),
          NumCacheNodes: S.optional(S.Number),
          CacheNodeIdsToRemove: S.optional(__S(1344, __c84, 0)),
          AZMode: S.optional(S.String),
          NewAvailabilityZones: S.optional(__S(1328, __c83, 0)),
          CacheSecurityGroupNames: S.optional(__S(1264, __c79, 0)),
          SecurityGroupIds: S.optional(__S(1296, __c81, 0)),
          PreferredMaintenanceWindow: S.optional(S.String),
          NotificationTopicArn: S.optional(S.String),
          CacheParameterGroupName: S.optional(S.String),
          NotificationTopicStatus: S.optional(S.String),
          ApplyImmediately: S.optional(S.Boolean),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          SnapshotRetentionLimit: S.optional(S.Number),
          SnapshotWindow: S.optional(S.String),
          CacheNodeType: S.optional(S.String),
          AuthToken: S.optional(SensitiveString),
          AuthTokenUpdateStrategy: S.optional(S.String),
          LogDeliveryConfigurations: S.optional(__S(1266, __c79, 2)),
          IpDiscovery: S.optional(S.String),
          ScaleConfig: S.optional(__S(1345, __c84, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyCacheClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CacheCluster: S.optional(__S(1355, __c84, 11)) }).pipe(ns),
      ).annotate({ identifier: "ModifyCacheClusterResult" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheParameterGroupName: S.optional(S.String),
          ParameterNameValues: S.optional(__S(641, __c40, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyCacheParameterGroupMessage" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterName: S.optional(S.String), ParameterValue: S.optional(S.String) }),
      ).annotate({ identifier: "ParameterNameValue" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(640, __c40, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ParameterNameValue"))
          .annotate({ identifier: "ParameterNameValue" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ CacheParameterGroupName: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CacheParameterGroupNameMessage" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheSubnetGroupName: S.optional(S.String),
          CacheSubnetGroupDescription: S.optional(S.String),
          SubnetIds: S.optional(__S(1440, __c90, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyCacheSubnetGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CacheSubnetGroup: S.optional(__S(1429, __c89, 5)) }).pipe(ns),
      ).annotate({ identifier: "ModifyCacheSubnetGroupResult" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalReplicationGroupId: S.optional(S.String),
          ApplyImmediately: S.optional(S.Boolean),
          CacheNodeType: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          CacheParameterGroupName: S.optional(S.String),
          GlobalReplicationGroupDescription: S.optional(S.String),
          AutomaticFailoverEnabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyGlobalReplicationGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalReplicationGroup: S.optional(__S(1476, __c92, 4)) }).pipe(ns),
      ).annotate({ identifier: "ModifyGlobalReplicationGroupResult" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          ReplicationGroupDescription: S.optional(S.String),
          PrimaryClusterId: S.optional(S.String),
          SnapshottingClusterId: S.optional(S.String),
          AutomaticFailoverEnabled: S.optional(S.Boolean),
          MultiAZEnabled: S.optional(S.Boolean),
          NodeGroupId: S.optional(S.String),
          CacheSecurityGroupNames: S.optional(__S(1264, __c79, 0)),
          SecurityGroupIds: S.optional(__S(1296, __c81, 0)),
          PreferredMaintenanceWindow: S.optional(S.String),
          NotificationTopicArn: S.optional(S.String),
          CacheParameterGroupName: S.optional(S.String),
          NotificationTopicStatus: S.optional(S.String),
          ApplyImmediately: S.optional(S.Boolean),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          SnapshotRetentionLimit: S.optional(S.Number),
          SnapshotWindow: S.optional(S.String),
          CacheNodeType: S.optional(S.String),
          AuthToken: S.optional(SensitiveString),
          AuthTokenUpdateStrategy: S.optional(S.String),
          UserGroupIdsToAdd: S.optional(__S(1120, __c70, 0)),
          UserGroupIdsToRemove: S.optional(__S(1120, __c70, 0)),
          RemoveUserGroups: S.optional(S.Boolean),
          LogDeliveryConfigurations: S.optional(__S(1266, __c79, 2)),
          IpDiscovery: S.optional(S.String),
          TransitEncryptionEnabled: S.optional(S.Boolean),
          TransitEncryptionMode: S.optional(S.String),
          ClusterMode: S.optional(S.String),
          Durability: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyReplicationGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReplicationGroup: S.optional(__S(1147, __c71, 11)) }).pipe(ns),
      ).annotate({ identifier: "ModifyReplicationGroupResult" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("NodeGroupToRemove")));
    case 1:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("NodeGroupToRetain")));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          NodeGroupCount: S.optional(S.Number),
          ApplyImmediately: S.optional(S.Boolean),
          ReshardingConfiguration: S.optional(__S(545, __c34, 1)),
          NodeGroupsToRemove: S.optional(__S(704, __c44, 0)),
          NodeGroupsToRetain: S.optional(__S(705, __c44, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyReplicationGroupShardConfigurationMessage" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ReplicationGroup: S.optional(__S(1147, __c71, 11)) }).pipe(ns),
      ).annotate({ identifier: "ModifyReplicationGroupShardConfigurationResult" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerlessCacheName: S.optional(S.String),
          Description: S.optional(S.String),
          CacheUsageLimits: S.optional(__S(1522, __c95, 2)),
          RemoveUserGroup: S.optional(S.Boolean),
          UserGroupId: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(1296, __c81, 0)),
          SnapshotRetentionLimit: S.optional(S.Number),
          DailySnapshotTime: S.optional(S.String),
          Engine: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyServerlessCacheRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServerlessCache: S.optional(__S(1524, __c95, 4)) }).pipe(ns),
      ).annotate({ identifier: "ModifyServerlessCacheResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserId: S.optional(S.String),
          AccessString: S.optional(S.String),
          AppendAccessString: S.optional(S.String),
          Passwords: S.optional(S.Array(SensitiveString)),
          NoPasswordRequired: S.optional(S.Boolean),
          AuthenticationMode: S.optional(__S(1600, __c100, 0)),
          Engine: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyUserMessage" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserGroupId: S.optional(S.String),
          UserIdsToAdd: S.optional(__S(1648, __c103, 0)),
          UserIdsToRemove: S.optional(__S(1648, __c103, 0)),
          Engine: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyUserGroupMessage" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedCacheNodesOfferingId: S.optional(S.String),
          ReservedCacheNodeId: S.optional(S.String),
          CacheNodeCount: S.optional(S.Number),
          Tags: S.optional(__S(977, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PurchaseReservedCacheNodesOfferingMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReservedCacheNode: S.optional(__S(320, __c20, 0)) }).pipe(ns),
      ).annotate({ identifier: "PurchaseReservedCacheNodesOfferingResult" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalReplicationGroupId: S.optional(S.String),
          ApplyImmediately: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RebalanceSlotsInGlobalReplicationGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalReplicationGroup: S.optional(__S(1476, __c92, 4)) }).pipe(ns),
      ).annotate({ identifier: "RebalanceSlotsInGlobalReplicationGroupResult" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheClusterId: S.optional(S.String),
          CacheNodeIdsToReboot: S.optional(__S(1344, __c84, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RebootCacheClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CacheCluster: S.optional(__S(1355, __c84, 11)) }).pipe(ns),
      ).annotate({ identifier: "RebootCacheClusterResult" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceName: S.optional(S.String),
          TagKeys: S.optional(__S(816, __c51, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveTagsFromResourceMessage" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheParameterGroupName: S.optional(S.String),
          ResetAllParameters: S.optional(S.Boolean),
          ParameterNameValues: S.optional(__S(641, __c40, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ResetCacheParameterGroupMessage" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheSecurityGroupName: S.optional(S.String),
          EC2SecurityGroupName: S.optional(S.String),
          EC2SecurityGroupOwnerId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RevokeCacheSecurityGroupIngressMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CacheSecurityGroup: S.optional(__S(1010, __c63, 2)) }).pipe(ns),
      ).annotate({ identifier: "RevokeCacheSecurityGroupIngressResult" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          CustomerNodeEndpointList: S.optional(__S(881, __c55, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartMigrationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReplicationGroup: S.optional(__S(1147, __c71, 11)) }).pipe(ns),
      ).annotate({ identifier: "StartMigrationResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Address: S.optional(S.String), Port: S.optional(S.Number) }),
      ).annotate({ identifier: "CustomerNodeEndpoint" });
    case 1:
      return S.Array(__S(880, __c55, 0));
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          NodeGroupId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TestFailoverMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReplicationGroup: S.optional(__S(1147, __c71, 11)) }).pipe(ns),
      ).annotate({ identifier: "TestFailoverResult" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          CustomerNodeEndpointList: S.optional(__S(881, __c55, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TestMigrationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReplicationGroup: S.optional(__S(1147, __c71, 11)) }).pipe(ns),
      ).annotate({ identifier: "TestMigrationResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceName: S.optional(S.String), Tags: S.optional(__S(977, __c61, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsToResourceMessage" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TagList: S.optional(__S(977, __c61, 1)) }).pipe(ns),
      ).annotate({ identifier: "TagListMessage" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Address: S.optional(S.String), Port: S.optional(S.Number) }),
      ).annotate({ identifier: "Endpoint" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(976, __c61, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "Tag" }),
      );
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheSecurityGroupName: S.optional(S.String),
          EC2SecurityGroupName: S.optional(S.String),
          EC2SecurityGroupOwnerId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AuthorizeCacheSecurityGroupIngressMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CacheSecurityGroup: S.optional(__S(1010, __c63, 2)) }).pipe(ns),
      ).annotate({ identifier: "AuthorizeCacheSecurityGroupIngressResult" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          EC2SecurityGroupName: S.optional(S.String),
          EC2SecurityGroupOwnerId: S.optional(S.String),
        }),
      ).annotate({ identifier: "EC2SecurityGroup" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1008, __c63, 0)
          .pipe(/*@__PURE__*/ T.XmlName("EC2SecurityGroup"))
          .annotate({ identifier: "EC2SecurityGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          OwnerId: S.optional(S.String),
          CacheSecurityGroupName: S.optional(S.String),
          Description: S.optional(S.String),
          EC2SecurityGroups: S.optional(__S(1009, __c63, 1)),
          ARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "CacheSecurityGroup" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupIds: S.optional(__S(1056, __c66, 0)),
          CacheClusterIds: S.optional(__S(1057, __c66, 1)),
          ServiceUpdateName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchApplyUpdateActionMessage" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          CacheClusterId: S.optional(S.String),
          ServiceUpdateName: S.optional(S.String),
          UpdateActionStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProcessedUpdateAction" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1040, __c65, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ProcessedUpdateAction"))
          .annotate({ identifier: "ProcessedUpdateAction" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          CacheClusterId: S.optional(S.String),
          ServiceUpdateName: S.optional(S.String),
          ErrorType: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedUpdateAction" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(1042, __c65, 2)
          .pipe(/*@__PURE__*/ T.XmlName("UnprocessedUpdateAction"))
          .annotate({ identifier: "UnprocessedUpdateAction" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          ProcessedUpdateActions: S.optional(__S(1041, __c65, 1)),
          UnprocessedUpdateActions: S.optional(__S(1043, __c65, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateActionResultsMessage" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Array(S.String);
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupIds: S.optional(__S(1056, __c66, 0)),
          CacheClusterIds: S.optional(__S(1057, __c66, 1)),
          ServiceUpdateName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchStopUpdateActionMessage" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReplicationGroupId: S.optional(S.String), Force: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CompleteMigrationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReplicationGroup: S.optional(__S(1147, __c71, 11)) }).pipe(ns),
      ).annotate({ identifier: "CompleteMigrationResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LogGroup: S.optional(S.String) })).annotate({
        identifier: "CloudWatchLogsDestinationDetails",
      });
    case 1:
      return S.suspend(() => S.Struct({ DeliveryStream: S.optional(S.String) })).annotate({
        identifier: "KinesisFirehoseDestinationDetails",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogsDetails: S.optional(__S(1104, __c69, 0)),
          KinesisFirehoseDetails: S.optional(__S(1105, __c69, 1)),
        }),
      ).annotate({ identifier: "DestinationDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          LogType: S.optional(S.String),
          DestinationType: S.optional(S.String),
          DestinationDetails: S.optional(__S(1106, __c69, 2)),
          LogFormat: S.optional(S.String),
        }),
      ).annotate({ identifier: "PendingLogDeliveryConfiguration" });
    case 4:
      return S.Array(__S(1107, __c69, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          LogType: S.optional(S.String),
          DestinationType: S.optional(S.String),
          DestinationDetails: S.optional(__S(1106, __c69, 2)),
          LogFormat: S.optional(S.String),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "LogDeliveryConfiguration" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(1109, __c69, 5)
          .pipe(/*@__PURE__*/ T.XmlName("LogDeliveryConfiguration"))
          .annotate({ identifier: "LogDeliveryConfiguration" }),
      );
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalReplicationGroupId: S.optional(S.String),
          GlobalReplicationGroupMemberRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "GlobalReplicationGroupInfo" });
    case 1:
      return S.suspend(() => S.Struct({ ProgressPercentage: S.optional(S.Number) })).annotate({
        identifier: "SlotMigration",
      });
    case 2:
      return S.suspend(() => S.Struct({ SlotMigration: S.optional(__S(1137, __c71, 1)) })).annotate(
        { identifier: "ReshardingStatus" },
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          UserGroupIdsToAdd: S.optional(__S(1120, __c70, 0)),
          UserGroupIdsToRemove: S.optional(__S(1120, __c70, 0)),
        }),
      ).annotate({ identifier: "UserGroupsUpdateStatus" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          PrimaryClusterId: S.optional(S.String),
          AutomaticFailoverStatus: S.optional(S.String),
          Resharding: S.optional(__S(1138, __c71, 2)),
          AuthTokenStatus: S.optional(S.String),
          UserGroups: S.optional(__S(1139, __c71, 3)),
          LogDeliveryConfigurations: S.optional(__S(1108, __c69, 4)),
          TransitEncryptionEnabled: S.optional(S.Boolean),
          TransitEncryptionMode: S.optional(S.String),
          ClusterMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReplicationGroupPendingModifiedValues" });
    case 5:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ClusterId")));
    case 6:
      return S.suspend(() =>
        S.Struct({
          CacheClusterId: S.optional(S.String),
          CacheNodeId: S.optional(S.String),
          ReadEndpoint: S.optional(Endpoint),
          PreferredAvailabilityZone: S.optional(S.String),
          PreferredOutpostArn: S.optional(S.String),
          CurrentRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "NodeGroupMember" });
    case 7:
      return S.Array(
        /*@__PURE__*/ __S(1142, __c71, 6)
          .pipe(/*@__PURE__*/ T.XmlName("NodeGroupMember"))
          .annotate({ identifier: "NodeGroupMember" }),
      );
    case 8:
      return S.suspend(() =>
        S.Struct({
          NodeGroupId: S.optional(S.String),
          Status: S.optional(S.String),
          PrimaryEndpoint: S.optional(Endpoint),
          ReaderEndpoint: S.optional(Endpoint),
          Slots: S.optional(S.String),
          NodeGroupMembers: S.optional(__S(1143, __c71, 7)),
        }),
      ).annotate({ identifier: "NodeGroup" });
    case 9:
      return S.Array(
        /*@__PURE__*/ __S(1144, __c71, 8)
          .pipe(/*@__PURE__*/ T.XmlName("NodeGroup"))
          .annotate({ identifier: "NodeGroup" }),
      );
    case 10:
      return S.Array(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ReplicationGroupOutpostArn")),
      );
    case 11:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          Description: S.optional(S.String),
          GlobalReplicationGroupInfo: S.optional(__S(1136, __c71, 0)),
          Status: S.optional(S.String),
          PendingModifiedValues: S.optional(__S(1140, __c71, 4)),
          MemberClusters: S.optional(__S(1141, __c71, 5)),
          NodeGroups: S.optional(__S(1145, __c71, 9)),
          SnapshottingClusterId: S.optional(S.String),
          AutomaticFailover: S.optional(S.String),
          MultiAZ: S.optional(S.String),
          ConfigurationEndpoint: S.optional(Endpoint),
          SnapshotRetentionLimit: S.optional(S.Number),
          SnapshotWindow: S.optional(S.String),
          ClusterEnabled: S.optional(S.Boolean),
          CacheNodeType: S.optional(S.String),
          AuthTokenEnabled: S.optional(S.Boolean),
          AuthTokenLastModifiedDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          TransitEncryptionEnabled: S.optional(S.Boolean),
          AtRestEncryptionEnabled: S.optional(S.Boolean),
          MemberClustersOutpostArns: S.optional(__S(1146, __c71, 10)),
          KmsKeyId: S.optional(S.String),
          StorageEncryptionType: S.optional(S.String),
          ARN: S.optional(S.String),
          UserGroupIds: S.optional(__S(1120, __c70, 0)),
          LogDeliveryConfigurations: S.optional(__S(1110, __c69, 6)),
          ReplicationGroupCreateTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          DataTiering: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          IpDiscovery: S.optional(S.String),
          TransitEncryptionMode: S.optional(S.String),
          ClusterMode: S.optional(S.String),
          Engine: S.optional(S.String),
          Durability: S.optional(S.String),
          EffectiveDurability: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReplicationGroup" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceServerlessCacheSnapshotName: S.optional(S.String),
          TargetServerlessCacheSnapshotName: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(977, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyServerlessCacheSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServerlessCacheSnapshot: S.optional(__S(1169, __c73, 1)) }).pipe(ns),
      ).annotate({ identifier: "CopyServerlessCacheSnapshotResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerlessCacheName: S.optional(S.String),
          Engine: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServerlessCacheConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServerlessCacheSnapshotName: S.optional(S.String),
          ARN: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          Status: S.optional(S.String),
          CreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ExpiryTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          BytesUsedForCache: S.optional(S.String),
          ServerlessCacheConfiguration: S.optional(__S(1168, __c73, 0)),
        }),
      ).annotate({ identifier: "ServerlessCacheSnapshot" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceSnapshotName: S.optional(S.String),
          TargetSnapshotName: S.optional(S.String),
          TargetBucket: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(977, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopySnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Snapshot: S.optional(__S(1234, __c77, 2)) }).pipe(ns),
      ).annotate({ identifier: "CopySnapshotResult" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("OutpostArn")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          NodeGroupId: S.optional(S.String),
          Slots: S.optional(S.String),
          ReplicaCount: S.optional(S.Number),
          PrimaryAvailabilityZone: S.optional(S.String),
          ReplicaAvailabilityZones: S.optional(__S(1216, __c76, 0)),
          PrimaryOutpostArn: S.optional(S.String),
          ReplicaOutpostArns: S.optional(__S(1200, __c75, 0)),
        }),
      ).annotate({ identifier: "NodeGroupConfiguration" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AvailabilityZone")));
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheClusterId: S.optional(S.String),
          NodeGroupId: S.optional(S.String),
          CacheNodeId: S.optional(S.String),
          NodeGroupConfiguration: S.optional(__S(1201, __c75, 1)),
          CacheSize: S.optional(S.String),
          CacheNodeCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SnapshotCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "NodeSnapshot" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1232, __c77, 0)
          .pipe(/*@__PURE__*/ T.XmlName("NodeSnapshot"))
          .annotate({ identifier: "NodeSnapshot" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          SnapshotName: S.optional(S.String),
          ReplicationGroupId: S.optional(S.String),
          ReplicationGroupDescription: S.optional(S.String),
          CacheClusterId: S.optional(S.String),
          SnapshotStatus: S.optional(S.String),
          SnapshotSource: S.optional(S.String),
          CacheNodeType: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          NumCacheNodes: S.optional(S.Number),
          PreferredAvailabilityZone: S.optional(S.String),
          PreferredOutpostArn: S.optional(S.String),
          CacheClusterCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          PreferredMaintenanceWindow: S.optional(S.String),
          TopicArn: S.optional(S.String),
          Port: S.optional(S.Number),
          CacheParameterGroupName: S.optional(S.String),
          CacheSubnetGroupName: S.optional(S.String),
          VpcId: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          SnapshotRetentionLimit: S.optional(S.Number),
          SnapshotWindow: S.optional(S.String),
          NumNodeGroups: S.optional(S.Number),
          AutomaticFailover: S.optional(S.String),
          NodeSnapshots: S.optional(__S(1233, __c77, 1)),
          KmsKeyId: S.optional(S.String),
          ARN: S.optional(S.String),
          DataTiering: S.optional(S.String),
          Durability: S.optional(S.String),
        }),
      ).annotate({ identifier: "Snapshot" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheClusterId: S.optional(S.String),
          ReplicationGroupId: S.optional(S.String),
          AZMode: S.optional(S.String),
          PreferredAvailabilityZone: S.optional(S.String),
          PreferredAvailabilityZones: S.optional(__S(1328, __c83, 0)),
          NumCacheNodes: S.optional(S.Number),
          CacheNodeType: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          CacheParameterGroupName: S.optional(S.String),
          CacheSubnetGroupName: S.optional(S.String),
          CacheSecurityGroupNames: S.optional(__S(1264, __c79, 0)),
          SecurityGroupIds: S.optional(__S(1296, __c81, 0)),
          Tags: S.optional(__S(977, __c61, 1)),
          SnapshotArns: S.optional(__S(1280, __c80, 0)),
          SnapshotName: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          Port: S.optional(S.Number),
          NotificationTopicArn: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          SnapshotRetentionLimit: S.optional(S.Number),
          SnapshotWindow: S.optional(S.String),
          AuthToken: S.optional(SensitiveString),
          OutpostMode: S.optional(S.String),
          PreferredOutpostArn: S.optional(S.String),
          PreferredOutpostArns: S.optional(__S(1312, __c82, 0)),
          LogDeliveryConfigurations: S.optional(__S(1266, __c79, 2)),
          TransitEncryptionEnabled: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          IpDiscovery: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCacheClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CacheCluster: S.optional(__S(1355, __c84, 11)) }).pipe(ns),
      ).annotate({ identifier: "CreateCacheClusterResult" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("CacheSecurityGroupName")),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          LogType: S.optional(S.String),
          DestinationType: S.optional(S.String),
          DestinationDetails: S.optional(__S(1106, __c69, 2)),
          LogFormat: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LogDeliveryConfigurationRequest" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1265, __c79, 1)
          .pipe(/*@__PURE__*/ T.XmlName("LogDeliveryConfigurationRequest"))
          .annotate({ identifier: "LogDeliveryConfigurationRequest" }),
      );
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SnapshotArn")));
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SecurityGroupId")));
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("PreferredOutpostArn")));
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("PreferredAvailabilityZone")),
      );
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("CacheNodeId")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ScalePercentage: S.optional(S.Number),
          ScaleIntervalMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ScaleConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          NumCacheNodes: S.optional(S.Number),
          CacheNodeIdsToRemove: S.optional(__S(1344, __c84, 0)),
          EngineVersion: S.optional(S.String),
          CacheNodeType: S.optional(S.String),
          AuthTokenStatus: S.optional(S.String),
          LogDeliveryConfigurations: S.optional(__S(1108, __c69, 4)),
          TransitEncryptionEnabled: S.optional(S.Boolean),
          TransitEncryptionMode: S.optional(S.String),
          ScaleConfig: S.optional(__S(1345, __c84, 1)),
        }),
      ).annotate({ identifier: "PendingModifiedValues" });
    case 3:
      return S.suspend(() =>
        S.Struct({ TopicArn: S.optional(S.String), TopicStatus: S.optional(S.String) }),
      ).annotate({ identifier: "NotificationConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ CacheSecurityGroupName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "CacheSecurityGroupMembership" });
    case 5:
      return S.Array(
        /*@__PURE__*/ __S(1348, __c84, 4)
          .pipe(/*@__PURE__*/ T.XmlName("CacheSecurityGroup"))
          .annotate({ identifier: "CacheSecurityGroupMembership" }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          CacheParameterGroupName: S.optional(S.String),
          ParameterApplyStatus: S.optional(S.String),
          CacheNodeIdsToReboot: S.optional(__S(1344, __c84, 0)),
        }),
      ).annotate({ identifier: "CacheParameterGroupStatus" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          CacheNodeId: S.optional(S.String),
          CacheNodeStatus: S.optional(S.String),
          CacheNodeCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Endpoint: S.optional(Endpoint),
          ParameterGroupStatus: S.optional(S.String),
          SourceCacheNodeId: S.optional(S.String),
          CustomerAvailabilityZone: S.optional(S.String),
          CustomerOutpostArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CacheNode" });
    case 8:
      return S.Array(
        /*@__PURE__*/ __S(1351, __c84, 7)
          .pipe(/*@__PURE__*/ T.XmlName("CacheNode"))
          .annotate({ identifier: "CacheNode" }),
      );
    case 9:
      return S.suspend(() =>
        S.Struct({ SecurityGroupId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "SecurityGroupMembership" });
    case 10:
      return S.Array(__S(1353, __c84, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          CacheClusterId: S.optional(S.String),
          ConfigurationEndpoint: S.optional(Endpoint),
          ClientDownloadLandingPage: S.optional(S.String),
          CacheNodeType: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          CacheClusterStatus: S.optional(S.String),
          NumCacheNodes: S.optional(S.Number),
          PreferredAvailabilityZone: S.optional(S.String),
          PreferredOutpostArn: S.optional(S.String),
          CacheClusterCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          PreferredMaintenanceWindow: S.optional(S.String),
          PendingModifiedValues: S.optional(__S(1346, __c84, 2)),
          NotificationConfiguration: S.optional(__S(1347, __c84, 3)),
          CacheSecurityGroups: S.optional(__S(1349, __c84, 5)),
          CacheParameterGroup: S.optional(__S(1350, __c84, 6)),
          CacheSubnetGroupName: S.optional(S.String),
          CacheNodes: S.optional(__S(1352, __c84, 8)),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          SecurityGroups: S.optional(__S(1354, __c84, 10)),
          ReplicationGroupId: S.optional(S.String),
          SnapshotRetentionLimit: S.optional(S.Number),
          SnapshotWindow: S.optional(S.String),
          AuthTokenEnabled: S.optional(S.Boolean),
          AuthTokenLastModifiedDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          TransitEncryptionEnabled: S.optional(S.Boolean),
          AtRestEncryptionEnabled: S.optional(S.Boolean),
          ARN: S.optional(S.String),
          ReplicationGroupLogDeliveryEnabled: S.optional(S.Boolean),
          LogDeliveryConfigurations: S.optional(__S(1110, __c69, 6)),
          NetworkType: S.optional(S.String),
          IpDiscovery: S.optional(S.String),
          TransitEncryptionMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "CacheCluster" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheParameterGroupName: S.optional(S.String),
          CacheParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(977, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCacheParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CacheParameterGroup: S.optional(__S(1376, __c86, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateCacheParameterGroupResult" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheParameterGroupName: S.optional(S.String),
          CacheParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
          IsGlobal: S.optional(S.Boolean),
          ARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "CacheParameterGroup" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheSecurityGroupName: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(977, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCacheSecurityGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CacheSecurityGroup: S.optional(__S(1010, __c63, 2)) }).pipe(ns),
      ).annotate({ identifier: "CreateCacheSecurityGroupResult" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheSubnetGroupName: S.optional(S.String),
          CacheSubnetGroupDescription: S.optional(S.String),
          SubnetIds: S.optional(__S(1440, __c90, 0)),
          Tags: S.optional(__S(977, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCacheSubnetGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CacheSubnetGroup: S.optional(__S(1429, __c89, 5)) }).pipe(ns),
      ).annotate({ identifier: "CreateCacheSubnetGroupResult" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "AvailabilityZone",
      });
    case 1:
      return S.suspend(() => S.Struct({ SubnetOutpostArn: S.optional(S.String) })).annotate({
        identifier: "SubnetOutpost",
      });
    case 2:
      return S.Array(S.String);
    case 3:
      return S.suspend(() =>
        S.Struct({
          SubnetIdentifier: S.optional(S.String),
          SubnetAvailabilityZone: S.optional(__S(1424, __c89, 0)),
          SubnetOutpost: S.optional(__S(1425, __c89, 1)),
          SupportedNetworkTypes: S.optional(__S(1426, __c89, 2)),
        }),
      ).annotate({ identifier: "Subnet" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(1427, __c89, 3)
          .pipe(/*@__PURE__*/ T.XmlName("Subnet"))
          .annotate({ identifier: "Subnet" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          CacheSubnetGroupName: S.optional(S.String),
          CacheSubnetGroupDescription: S.optional(S.String),
          VpcId: S.optional(S.String),
          Subnets: S.optional(__S(1428, __c89, 4)),
          ARN: S.optional(S.String),
          SupportedNetworkTypes: S.optional(__S(1426, __c89, 2)),
        }),
      ).annotate({ identifier: "CacheSubnetGroup" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SubnetIdentifier")));
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalReplicationGroupIdSuffix: S.optional(S.String),
          GlobalReplicationGroupDescription: S.optional(S.String),
          PrimaryReplicationGroupId: S.optional(S.String),
          Tags: S.optional(__S(977, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGlobalReplicationGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalReplicationGroup: S.optional(__S(1476, __c92, 4)) }).pipe(ns),
      ).annotate({ identifier: "CreateGlobalReplicationGroupResult" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          ReplicationGroupRegion: S.optional(S.String),
          Role: S.optional(S.String),
          AutomaticFailover: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "GlobalReplicationGroupMember" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1472, __c92, 0)
          .pipe(/*@__PURE__*/ T.XmlName("GlobalReplicationGroupMember"))
          .annotate({ identifier: "GlobalReplicationGroupMember" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ GlobalNodeGroupId: S.optional(S.String), Slots: S.optional(S.String) }),
      ).annotate({ identifier: "GlobalNodeGroup" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(1474, __c92, 2)
          .pipe(/*@__PURE__*/ T.XmlName("GlobalNodeGroup"))
          .annotate({ identifier: "GlobalNodeGroup" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          GlobalReplicationGroupId: S.optional(S.String),
          GlobalReplicationGroupDescription: S.optional(S.String),
          Status: S.optional(S.String),
          CacheNodeType: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Members: S.optional(__S(1473, __c92, 1)),
          ClusterEnabled: S.optional(S.Boolean),
          GlobalNodeGroups: S.optional(__S(1475, __c92, 3)),
          AuthTokenEnabled: S.optional(S.Boolean),
          TransitEncryptionEnabled: S.optional(S.Boolean),
          AtRestEncryptionEnabled: S.optional(S.Boolean),
          ARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "GlobalReplicationGroup" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(1201, __c75, 1)
          .pipe(/*@__PURE__*/ T.XmlName("NodeGroupConfiguration"))
          .annotate({ identifier: "NodeGroupConfiguration" }),
      );
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          ReplicationGroupDescription: S.optional(S.String),
          GlobalReplicationGroupId: S.optional(S.String),
          PrimaryClusterId: S.optional(S.String),
          AutomaticFailoverEnabled: S.optional(S.Boolean),
          MultiAZEnabled: S.optional(S.Boolean),
          NumCacheClusters: S.optional(S.Number),
          PreferredCacheClusterAZs: S.optional(__S(1216, __c76, 0)),
          NumNodeGroups: S.optional(S.Number),
          ReplicasPerNodeGroup: S.optional(S.Number),
          NodeGroupConfiguration: S.optional(__S(1488, __c93, 0)),
          CacheNodeType: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          CacheParameterGroupName: S.optional(S.String),
          CacheSubnetGroupName: S.optional(S.String),
          CacheSecurityGroupNames: S.optional(__S(1264, __c79, 0)),
          SecurityGroupIds: S.optional(__S(1296, __c81, 0)),
          Tags: S.optional(__S(977, __c61, 1)),
          SnapshotArns: S.optional(__S(1280, __c80, 0)),
          SnapshotName: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          Port: S.optional(S.Number),
          NotificationTopicArn: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          SnapshotRetentionLimit: S.optional(S.Number),
          SnapshotWindow: S.optional(S.String),
          AuthToken: S.optional(SensitiveString),
          TransitEncryptionEnabled: S.optional(S.Boolean),
          AtRestEncryptionEnabled: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          UserGroupIds: S.optional(__S(1489, __c93, 1)),
          LogDeliveryConfigurations: S.optional(__S(1266, __c79, 2)),
          DataTieringEnabled: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          IpDiscovery: S.optional(S.String),
          TransitEncryptionMode: S.optional(S.String),
          ClusterMode: S.optional(S.String),
          ServerlessCacheSnapshotName: S.optional(S.String),
          Durability: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateReplicationGroupMessage" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ReplicationGroup: S.optional(__S(1147, __c71, 11)) }).pipe(ns),
      ).annotate({ identifier: "CreateReplicationGroupResult" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerlessCacheName: S.optional(S.String),
          Description: S.optional(S.String),
          Engine: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
          CacheUsageLimits: S.optional(__S(1522, __c95, 2)),
          KmsKeyId: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(1296, __c81, 0)),
          SnapshotArnsToRestore: S.optional(__S(1280, __c80, 0)),
          Tags: S.optional(__S(977, __c61, 1)),
          UserGroupId: S.optional(S.String),
          SubnetIds: S.optional(__S(1523, __c95, 3)),
          SnapshotRetentionLimit: S.optional(S.Number),
          DailySnapshotTime: S.optional(S.String),
          NetworkType: S.optional(S.String),
          ConnectionType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServerlessCacheRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServerlessCache: S.optional(__S(1524, __c95, 4)) }).pipe(ns),
      ).annotate({ identifier: "CreateServerlessCacheResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Maximum: S.optional(S.Number),
          Minimum: S.optional(S.Number),
          Unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataStorage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Maximum: S.optional(S.Number), Minimum: S.optional(S.Number) }),
      ).annotate({ identifier: "ECPUPerSecond" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DataStorage: S.optional(__S(1520, __c95, 0)),
          ECPUPerSecond: S.optional(__S(1521, __c95, 1)),
        }),
      ).annotate({ identifier: "CacheUsageLimits" });
    case 3:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SubnetId")));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ServerlessCacheName: S.optional(S.String),
          Description: S.optional(S.String),
          CreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Status: S.optional(S.String),
          Engine: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
          FullEngineVersion: S.optional(S.String),
          CacheUsageLimits: S.optional(__S(1522, __c95, 2)),
          KmsKeyId: S.optional(S.String),
          StorageEncryptionType: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(1296, __c81, 0)),
          Endpoint: S.optional(Endpoint),
          ReaderEndpoint: S.optional(Endpoint),
          ARN: S.optional(S.String),
          UserGroupId: S.optional(S.String),
          SubnetIds: S.optional(__S(1523, __c95, 3)),
          SnapshotRetentionLimit: S.optional(S.Number),
          DailySnapshotTime: S.optional(S.String),
          NetworkType: S.optional(S.String),
          ConnectionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServerlessCache" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerlessCacheSnapshotName: S.optional(S.String),
          ServerlessCacheName: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(977, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServerlessCacheSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServerlessCacheSnapshot: S.optional(__S(1169, __c73, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateServerlessCacheSnapshotResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          CacheClusterId: S.optional(S.String),
          SnapshotName: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(977, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Snapshot: S.optional(__S(1234, __c77, 2)) }).pipe(ns),
      ).annotate({ identifier: "CreateSnapshotResult" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserId: S.optional(S.String),
          UserName: S.optional(S.String),
          Engine: S.optional(S.String),
          Passwords: S.optional(S.Array(SensitiveString)),
          AccessString: S.optional(S.String),
          NoPasswordRequired: S.optional(S.Boolean),
          Tags: S.optional(__S(977, __c61, 1)),
          AuthenticationMode: S.optional(__S(1600, __c100, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserMessage" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), PasswordCount: S.optional(S.Number) }),
      ).annotate({ identifier: "Authentication" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UserId: S.optional(S.String),
          UserName: S.optional(S.String),
          Status: S.optional(S.String),
          Engine: S.optional(S.String),
          MinimumEngineVersion: S.optional(S.String),
          AccessString: S.optional(S.String),
          UserGroupIds: S.optional(__S(1120, __c70, 0)),
          Authentication: S.optional(__S(1584, __c99, 0)),
          ARN: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "User" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Passwords: S.optional(S.Array(SensitiveString)) }),
      ).annotate({ identifier: "AuthenticationMode" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserGroupId: S.optional(S.String),
          Engine: S.optional(S.String),
          UserIds: S.optional(__S(1648, __c103, 0)),
          Tags: S.optional(__S(977, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserGroupMessage" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          UserIdsToRemove: S.optional(__S(1632, __c102, 0)),
          UserIdsToAdd: S.optional(__S(1632, __c102, 0)),
        }),
      ).annotate({ identifier: "UserGroupPendingChanges" });
    case 2:
      return S.Array(S.String);
    case 3:
      return S.Array(S.String);
    case 4:
      return S.suspend(() =>
        S.Struct({
          UserGroupId: S.optional(S.String),
          Status: S.optional(S.String),
          Engine: S.optional(S.String),
          UserIds: S.optional(__S(1632, __c102, 0)),
          MinimumEngineVersion: S.optional(S.String),
          PendingChanges: S.optional(__S(1633, __c102, 1)),
          ReplicationGroups: S.optional(__S(1634, __c102, 2)),
          ServerlessCaches: S.optional(__S(1635, __c102, 3)),
          ARN: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "UserGroup" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("GlobalNodeGroupId")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          GlobalReplicationGroupId: S.optional(S.String),
          NodeGroupCount: S.optional(S.Number),
          GlobalNodeGroupsToRemove: S.optional(__S(1664, __c104, 0)),
          GlobalNodeGroupsToRetain: S.optional(__S(1664, __c104, 0)),
          ApplyImmediately: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DecreaseNodeGroupsInGlobalReplicationGroupMessage" });
    case 2:
      return S.suspend(() =>
        S.Struct({ GlobalReplicationGroup: S.optional(__S(1476, __c92, 4)) }).pipe(ns),
      ).annotate({ identifier: "DecreaseNodeGroupsInGlobalReplicationGroupResult" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReplicationGroupId: S.optional(S.String),
          NewReplicaCount: S.optional(S.Number),
          ReplicaConfiguration: S.optional(__S(1697, __c106, 1)),
          ReplicasToRemove: S.optional(__S(1680, __c105, 0)),
          ApplyImmediately: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DecreaseReplicaCountMessage" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ReplicationGroup: S.optional(__S(1147, __c71, 11)) }).pipe(ns),
      ).annotate({ identifier: "DecreaseReplicaCountResult" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NodeGroupId: S.optional(S.String),
          NewReplicaCount: S.optional(S.Number),
          PreferredAvailabilityZones: S.optional(__S(1328, __c83, 0)),
          PreferredOutpostArns: S.optional(__S(1312, __c82, 0)),
        }),
      ).annotate({ identifier: "ConfigureShard" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1696, __c106, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ConfigureShard"))
          .annotate({ identifier: "ConfigureShard" }),
      );
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheClusterId: S.optional(S.String),
          FinalSnapshotIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteCacheClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CacheCluster: S.optional(__S(1355, __c84, 11)) }).pipe(ns),
      ).annotate({ identifier: "DeleteCacheClusterResult" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CacheParameterGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCacheParameterGroupMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteCacheParameterGroupResponse",
      });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CacheSecurityGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCacheSecurityGroupMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteCacheSecurityGroupResponse",
      });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CacheSubnetGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCacheSubnetGroupMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteCacheSubnetGroupResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
