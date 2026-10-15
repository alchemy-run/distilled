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
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://redshift.amazonaws.com/doc/2012-12-01/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Redshift",
  serviceShapeName: "RedshiftServiceVersion20121201",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "redshift" });
const ver = /*@__PURE__*/ T.ServiceVersion("2012-12-01");
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
              `https://redshift-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://redshift.${Region}.amazonaws.com`);
            }
            return e(`https://redshift-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://redshift.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://redshift.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://redshift.{R}.{D}","properties":{},"headers":{}}');

export class AccessToClusterDeniedFault
  extends /*@__PURE__*/ S.TaggedError<AccessToClusterDeniedFault>()(
    "AccessToClusterDeniedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AccessToClusterDenied", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AccessToSnapshotDeniedFault
  extends /*@__PURE__*/ S.TaggedError<AccessToSnapshotDeniedFault>()(
    "AccessToSnapshotDeniedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AccessToSnapshotDenied", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AuthenticationProfileAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<AuthenticationProfileAlreadyExistsFault>()(
    "AuthenticationProfileAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AuthenticationProfileAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class AuthenticationProfileNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<AuthenticationProfileNotFoundFault>()(
    "AuthenticationProfileNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AuthenticationProfileNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class AuthenticationProfileQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<AuthenticationProfileQuotaExceededFault>()(
    "AuthenticationProfileQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "AuthenticationProfileQuotaExceededFault",
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
export class AuthorizationQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<AuthorizationQuotaExceededFault>()(
    "AuthorizationQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AuthorizationQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class BatchDeleteRequestSizeExceededFault
  extends /*@__PURE__*/ S.TaggedError<BatchDeleteRequestSizeExceededFault>()(
    "BatchDeleteRequestSizeExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "BatchDeleteRequestSizeExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class BatchModifyClusterSnapshotsLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<BatchModifyClusterSnapshotsLimitExceededFault>()(
    "BatchModifyClusterSnapshotsLimitExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "BatchModifyClusterSnapshotsLimitExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class BucketNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<BucketNotFoundFault>()(
    "BucketNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "BucketNotFoundFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterAlreadyExistsFault>()(
    "ClusterAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ClusterAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterNotFoundFault>()(
    "ClusterNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ClusterNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterOnLatestRevisionFault
  extends /*@__PURE__*/ S.TaggedError<ClusterOnLatestRevisionFault>()(
    "ClusterOnLatestRevisionFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ClusterOnLatestRevision", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterParameterGroupAlreadyExistsFault>()(
    "ClusterParameterGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterParameterGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterParameterGroupNotFoundFault>()(
    "ClusterParameterGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterParameterGroupNotFound",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterParameterGroupQuotaExceededFault>()(
    "ClusterParameterGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterParameterGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterQuotaExceededFault>()(
    "ClusterQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ClusterQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSecurityGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSecurityGroupAlreadyExistsFault>()(
    "ClusterSecurityGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterSecurityGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterSecurityGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSecurityGroupNotFoundFault>()(
    "ClusterSecurityGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterSecurityGroupNotFound",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSecurityGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSecurityGroupQuotaExceededFault>()(
    "ClusterSecurityGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "QuotaExceeded.ClusterSecurityGroup",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSnapshotAlreadyExistsFault>()(
    "ClusterSnapshotAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterSnapshotAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterSnapshotNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSnapshotNotFoundFault>()(
    "ClusterSnapshotNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ClusterSnapshotNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSnapshotQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSnapshotQuotaExceededFault>()(
    "ClusterSnapshotQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterSnapshotQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSubnetGroupAlreadyExistsFault>()(
    "ClusterSubnetGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterSubnetGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterSubnetGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSubnetGroupNotFoundFault>()(
    "ClusterSubnetGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterSubnetGroupNotFoundFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSubnetGroupQuotaExceededFault>()(
    "ClusterSubnetGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterSubnetGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSubnetQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSubnetQuotaExceededFault>()(
    "ClusterSubnetQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterSubnetQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConflictPolicyUpdateFault
  extends /*@__PURE__*/ S.TaggedError<ConflictPolicyUpdateFault>()(
    "ConflictPolicyUpdateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ConflictPolicyUpdateFault", httpResponseCode: 409 }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class CopyToRegionDisabledFault
  extends /*@__PURE__*/ S.TaggedError<CopyToRegionDisabledFault>()(
    "CopyToRegionDisabledFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CopyToRegionDisabledFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CustomCnameAssociationFault
  extends /*@__PURE__*/ S.TaggedError<CustomCnameAssociationFault>()(
    "CustomCnameAssociationFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CustomCnameAssociationFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CustomDomainAssociationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CustomDomainAssociationNotFoundFault>()(
    "CustomDomainAssociationNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CustomDomainAssociationNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DependentServiceAccessDeniedFault
  extends /*@__PURE__*/ S.TaggedError<DependentServiceAccessDeniedFault>()(
    "DependentServiceAccessDeniedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DependentServiceAccessDenied",
        httpResponseCode: 403,
      }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class DependentServiceRequestThrottlingFault
  extends /*@__PURE__*/ S.TaggedError<DependentServiceRequestThrottlingFault>()(
    "DependentServiceRequestThrottlingFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DependentServiceRequestThrottlingFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DependentServiceUnavailableFault
  extends /*@__PURE__*/ S.TaggedError<DependentServiceUnavailableFault>()(
    "DependentServiceUnavailableFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DependentServiceUnavailableFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withServerError) {}
export class EndpointAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<EndpointAlreadyExistsFault>()(
    "EndpointAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "EndpointAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EndpointAuthorizationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<EndpointAuthorizationAlreadyExistsFault>()(
    "EndpointAuthorizationAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EndpointAuthorizationAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EndpointAuthorizationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<EndpointAuthorizationNotFoundFault>()(
    "EndpointAuthorizationNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EndpointAuthorizationNotFound",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class EndpointAuthorizationsPerClusterLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<EndpointAuthorizationsPerClusterLimitExceededFault>()(
    "EndpointAuthorizationsPerClusterLimitExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EndpointAuthorizationsPerClusterLimitExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EndpointNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<EndpointNotFoundFault>()(
    "EndpointNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "EndpointNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class EndpointsPerAuthorizationLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<EndpointsPerAuthorizationLimitExceededFault>()(
    "EndpointsPerAuthorizationLimitExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EndpointsPerAuthorizationLimitExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EndpointsPerClusterLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<EndpointsPerClusterLimitExceededFault>()(
    "EndpointsPerClusterLimitExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EndpointsPerClusterLimitExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventSubscriptionQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<EventSubscriptionQuotaExceededFault>()(
    "EventSubscriptionQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "EventSubscriptionQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class HsmClientCertificateAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<HsmClientCertificateAlreadyExistsFault>()(
    "HsmClientCertificateAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "HsmClientCertificateAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class HsmClientCertificateNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<HsmClientCertificateNotFoundFault>()(
    "HsmClientCertificateNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "HsmClientCertificateNotFoundFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class HsmClientCertificateQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<HsmClientCertificateQuotaExceededFault>()(
    "HsmClientCertificateQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "HsmClientCertificateQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class HsmConfigurationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<HsmConfigurationAlreadyExistsFault>()(
    "HsmConfigurationAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "HsmConfigurationAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class HsmConfigurationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<HsmConfigurationNotFoundFault>()(
    "HsmConfigurationNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "HsmConfigurationNotFoundFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class HsmConfigurationQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<HsmConfigurationQuotaExceededFault>()(
    "HsmConfigurationQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "HsmConfigurationQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IncompatibleOrderableOptions
  extends /*@__PURE__*/ S.TaggedError<IncompatibleOrderableOptions>()(
    "IncompatibleOrderableOptions",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "IncompatibleOrderableOptions",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InProgressTableRestoreQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<InProgressTableRestoreQuotaExceededFault>()(
    "InProgressTableRestoreQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InProgressTableRestoreQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientClusterCapacityFault>()(
    "InsufficientClusterCapacityFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InsufficientClusterCapacity", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientS3BucketPolicyFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientS3BucketPolicyFault>()(
    "InsufficientS3BucketPolicyFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InsufficientS3BucketPolicyFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationAlreadyExistsFault>()(
    "IntegrationAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "IntegrationAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class IntegrationConflictOperationFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationConflictOperationFault>()(
    "IntegrationConflictOperationFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "IntegrationConflictOperationFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationConflictStateFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationConflictStateFault>()(
    "IntegrationConflictStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "IntegrationConflictStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationNotFoundFault>()(
    "IntegrationNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "IntegrationNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationQuotaExceededFault>()(
    "IntegrationQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "IntegrationQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationSourceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationSourceNotFoundFault>()(
    "IntegrationSourceNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "IntegrationSourceNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationTargetNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationTargetNotFoundFault>()(
    "IntegrationTargetNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "IntegrationTargetNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidAuthenticationProfileRequestFault
  extends /*@__PURE__*/ S.TaggedError<InvalidAuthenticationProfileRequestFault>()(
    "InvalidAuthenticationProfileRequestFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidAuthenticationProfileRequestFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidAuthorizationStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidAuthorizationStateFault>()(
    "InvalidAuthorizationStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidAuthorizationState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterParameterGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterParameterGroupStateFault>()(
    "InvalidClusterParameterGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidClusterParameterGroupState",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterSecurityGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterSecurityGroupStateFault>()(
    "InvalidClusterSecurityGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidClusterSecurityGroupState",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterSnapshotScheduleStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterSnapshotScheduleStateFault>()(
    "InvalidClusterSnapshotScheduleStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidClusterSnapshotScheduleState",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterSnapshotStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterSnapshotStateFault>()(
    "InvalidClusterSnapshotStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidClusterSnapshotState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterStateFault>()(
    "InvalidClusterStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidClusterState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterSubnetGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterSubnetGroupStateFault>()(
    "InvalidClusterSubnetGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidClusterSubnetGroupStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterSubnetStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterSubnetStateFault>()(
    "InvalidClusterSubnetStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidClusterSubnetStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterTrackFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterTrackFault>()(
    "InvalidClusterTrackFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidClusterTrack", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDataShareFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDataShareFault>()(
    "InvalidDataShareFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDataShareFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidElasticIpFault
  extends /*@__PURE__*/ S.TaggedError<InvalidElasticIpFault>()(
    "InvalidElasticIpFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidElasticIpFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEndpointStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidEndpointStateFault>()(
    "InvalidEndpointStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidEndpointState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidHsmClientCertificateStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidHsmClientCertificateStateFault>()(
    "InvalidHsmClientCertificateStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidHsmClientCertificateStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidHsmConfigurationStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidHsmConfigurationStateFault>()(
    "InvalidHsmConfigurationStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidHsmConfigurationStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidNamespaceFault
  extends /*@__PURE__*/ S.TaggedError<InvalidNamespaceFault>()(
    "InvalidNamespaceFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidNamespaceFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidPolicyFault
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyFault>()(
    "InvalidPolicyFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidPolicyFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidReservedNodeStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidReservedNodeStateFault>()(
    "InvalidReservedNodeStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidReservedNodeState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidRestoreFault
  extends /*@__PURE__*/ S.TaggedError<InvalidRestoreFault>()(
    "InvalidRestoreFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidRestore", httpResponseCode: 406 }),
      /*@__PURE__*/ T.HttpError(406),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidRetentionPeriodFault
  extends /*@__PURE__*/ S.TaggedError<InvalidRetentionPeriodFault>()(
    "InvalidRetentionPeriodFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidRetentionPeriodFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3BucketNameFault
  extends /*@__PURE__*/ S.TaggedError<InvalidS3BucketNameFault>()(
    "InvalidS3BucketNameFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidS3BucketNameFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3KeyPrefixFault
  extends /*@__PURE__*/ S.TaggedError<InvalidS3KeyPrefixFault>()(
    "InvalidS3KeyPrefixFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidS3KeyPrefixFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidScheduledActionFault
  extends /*@__PURE__*/ S.TaggedError<InvalidScheduledActionFault>()(
    "InvalidScheduledActionFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidScheduledAction", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidScheduleFault
  extends /*@__PURE__*/ S.TaggedError<InvalidScheduleFault>()(
    "InvalidScheduleFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSchedule", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSnapshotCopyGrantStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidSnapshotCopyGrantStateFault>()(
    "InvalidSnapshotCopyGrantStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidSnapshotCopyGrantStateFault",
        httpResponseCode: 400,
      }),
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
export class InvalidSubscriptionStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidSubscriptionStateFault>()(
    "InvalidSubscriptionStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidSubscriptionStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTableRestoreArgumentFault
  extends /*@__PURE__*/ S.TaggedError<InvalidTableRestoreArgumentFault>()(
    "InvalidTableRestoreArgumentFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidTableRestoreArgument", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTagFault
  extends /*@__PURE__*/ S.TaggedError<InvalidTagFault>()(
    "InvalidTagFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidTagFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidUsageLimitFault
  extends /*@__PURE__*/ S.TaggedError<InvalidUsageLimitFault>()(
    "InvalidUsageLimitFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidUsageLimit", httpResponseCode: 400 }),
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
export class Ipv6CidrBlockNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<Ipv6CidrBlockNotFoundFault>()(
    "Ipv6CidrBlockNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "Ipv6CidrBlockNotFoundFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<LimitExceededFault>()(
    "LimitExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "LimitExceededFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NumberOfNodesPerClusterLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<NumberOfNodesPerClusterLimitExceededFault>()(
    "NumberOfNodesPerClusterLimitExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "NumberOfNodesPerClusterLimitExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NumberOfNodesQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<NumberOfNodesQuotaExceededFault>()(
    "NumberOfNodesQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NumberOfNodesQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PartnerNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<PartnerNotFoundFault>()(
    "PartnerNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "PartnerNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class Qev2IdcApplicationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<Qev2IdcApplicationAlreadyExistsFault>()(
    "Qev2IdcApplicationAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "Qev2IdcApplicationAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class Qev2IdcApplicationNotExistsFault
  extends /*@__PURE__*/ S.TaggedError<Qev2IdcApplicationNotExistsFault>()(
    "Qev2IdcApplicationNotExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "Qev2IdcApplicationNotExists", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class RedshiftIdcApplicationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<RedshiftIdcApplicationAlreadyExistsFault>()(
    "RedshiftIdcApplicationAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "RedshiftIdcApplicationAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class RedshiftIdcApplicationNotExistsFault
  extends /*@__PURE__*/ S.TaggedError<RedshiftIdcApplicationNotExistsFault>()(
    "RedshiftIdcApplicationNotExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "RedshiftIdcApplicationNotExists",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class RedshiftIdcApplicationQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<RedshiftIdcApplicationQuotaExceededFault>()(
    "RedshiftIdcApplicationQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "RedshiftIdcApplicationQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class RedshiftInvalidParameterFault
  extends /*@__PURE__*/ S.TaggedError<RedshiftInvalidParameterFault>()(
    "RedshiftInvalidParameterFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "RedshiftInvalidParameter", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeAlreadyExistsFault>()(
    "ReservedNodeAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ReservedNodeAlreadyExists", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ReservedNodeAlreadyMigratedFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeAlreadyMigratedFault>()(
    "ReservedNodeAlreadyMigratedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ReservedNodeAlreadyMigrated", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeExchangeNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeExchangeNotFoundFault>()(
    "ReservedNodeExchangeNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ReservedNodeExchangeNotFond", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeNotFoundFault>()(
    "ReservedNodeNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ReservedNodeNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeOfferingNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeOfferingNotFoundFault>()(
    "ReservedNodeOfferingNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReservedNodeOfferingNotFound",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeQuotaExceededFault>()(
    "ReservedNodeQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ReservedNodeQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResizeNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ResizeNotFoundFault>()(
    "ResizeNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResizeNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundFault>()(
    "ResourceNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ScheduledActionAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ScheduledActionAlreadyExistsFault>()(
    "ScheduledActionAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ScheduledActionAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ScheduledActionNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ScheduledActionNotFoundFault>()(
    "ScheduledActionNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ScheduledActionNotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ScheduledActionQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ScheduledActionQuotaExceededFault>()(
    "ScheduledActionQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ScheduledActionQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ScheduledActionTypeUnsupportedFault
  extends /*@__PURE__*/ S.TaggedError<ScheduledActionTypeUnsupportedFault>()(
    "ScheduledActionTypeUnsupportedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ScheduledActionTypeUnsupported",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ScheduleDefinitionTypeUnsupportedFault
  extends /*@__PURE__*/ S.TaggedError<ScheduleDefinitionTypeUnsupportedFault>()(
    "ScheduleDefinitionTypeUnsupportedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ScheduleDefinitionTypeUnsupported",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotCopyAlreadyDisabledFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyAlreadyDisabledFault>()(
    "SnapshotCopyAlreadyDisabledFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SnapshotCopyAlreadyDisabledFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotCopyAlreadyEnabledFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyAlreadyEnabledFault>()(
    "SnapshotCopyAlreadyEnabledFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SnapshotCopyAlreadyEnabledFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotCopyDisabledFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyDisabledFault>()(
    "SnapshotCopyDisabledFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SnapshotCopyDisabledFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotCopyGrantAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyGrantAlreadyExistsFault>()(
    "SnapshotCopyGrantAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SnapshotCopyGrantAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SnapshotCopyGrantNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyGrantNotFoundFault>()(
    "SnapshotCopyGrantNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SnapshotCopyGrantNotFoundFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotCopyGrantQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyGrantQuotaExceededFault>()(
    "SnapshotCopyGrantQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SnapshotCopyGrantQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotScheduleAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotScheduleAlreadyExistsFault>()(
    "SnapshotScheduleAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SnapshotScheduleAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SnapshotScheduleNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotScheduleNotFoundFault>()(
    "SnapshotScheduleNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SnapshotScheduleNotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotScheduleQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotScheduleQuotaExceededFault>()(
    "SnapshotScheduleQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SnapshotScheduleQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotScheduleUpdateInProgressFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotScheduleUpdateInProgressFault>()(
    "SnapshotScheduleUpdateInProgressFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SnapshotScheduleUpdateInProgress",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SNSInvalidTopicFault
  extends /*@__PURE__*/ S.TaggedError<SNSInvalidTopicFault>()(
    "SNSInvalidTopicFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SNSInvalidTopic", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SNSNoAuthorizationFault
  extends /*@__PURE__*/ S.TaggedError<SNSNoAuthorizationFault>()(
    "SNSNoAuthorizationFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SNSNoAuthorization", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SNSTopicArnNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SNSTopicArnNotFoundFault>()(
    "SNSTopicArnNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SNSTopicArnNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SourceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SourceNotFoundFault>()(
    "SourceNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SourceNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetAlreadyInUse
  extends /*@__PURE__*/ S.TaggedError<SubnetAlreadyInUse>()(
    "SubnetAlreadyInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetAlreadyInUse", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class SubscriptionAlreadyExistFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionAlreadyExistFault>()(
    "SubscriptionAlreadyExistFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubscriptionAlreadyExist", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubscriptionCategoryNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionCategoryNotFoundFault>()(
    "SubscriptionCategoryNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SubscriptionCategoryNotFound",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubscriptionEventIdNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionEventIdNotFoundFault>()(
    "SubscriptionEventIdNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubscriptionEventIdNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubscriptionNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionNotFoundFault>()(
    "SubscriptionNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubscriptionNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubscriptionSeverityNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionSeverityNotFoundFault>()(
    "SubscriptionSeverityNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SubscriptionSeverityNotFound",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TableLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<TableLimitExceededFault>()(
    "TableLimitExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TableLimitExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TableRestoreNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<TableRestoreNotFoundFault>()(
    "TableRestoreNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TableRestoreNotFoundFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<TagLimitExceededFault>()(
    "TagLimitExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TagLimitExceededFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedOperation
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedOperation>()(
    "UnauthorizedOperation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UnauthorizedOperation", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export class UnauthorizedPartnerIntegrationFault
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedPartnerIntegrationFault>()(
    "UnauthorizedPartnerIntegrationFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "UnauthorizedPartnerIntegration",
        httpResponseCode: 401,
      }),
      /*@__PURE__*/ T.HttpError(401),
    ),
  ).pipe(C.withAuthError) {}
export class UnknownSnapshotCopyRegionFault
  extends /*@__PURE__*/ S.TaggedError<UnknownSnapshotCopyRegionFault>()(
    "UnknownSnapshotCopyRegionFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "UnknownSnapshotCopyRegionFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperationFault
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationFault>()(
    "UnsupportedOperationFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UnsupportedOperation", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOptionFault
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOptionFault>()(
    "UnsupportedOptionFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UnsupportedOptionFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UsageLimitAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<UsageLimitAlreadyExistsFault>()(
    "UsageLimitAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UsageLimitAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class UsageLimitNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<UsageLimitNotFoundFault>()(
    "UsageLimitNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UsageLimitNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export interface AcceptReservedNodeExchangeInputMessage {
  ReservedNodeId?: string;
  TargetReservedNodeOfferingId?: string;
}
export interface RecurringCharge {
  RecurringChargeAmount?: number;
  RecurringChargeFrequency?: string;
}
export type RecurringChargeList = RecurringCharge[];
export type ReservedNodeOfferingType = "Regular" | "Upgradable" | (string & {});
export interface ReservedNode {
  ReservedNodeId?: string;
  ReservedNodeOfferingId?: string;
  NodeType?: string;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  NodeCount?: number;
  State?: string;
  OfferingType?: string;
  RecurringCharges?: RecurringCharge[];
  ReservedNodeOfferingType?: ReservedNodeOfferingType;
}
export interface AcceptReservedNodeExchangeOutputMessage {
  ExchangedReservedNode?: ReservedNode;
}
export type PartnerIntegrationAccountId = string;
export type PartnerIntegrationClusterIdentifier = string;
export type PartnerIntegrationDatabaseName = string;
export type PartnerIntegrationPartnerName = string;
export interface PartnerIntegrationInputMessage {
  AccountId?: string;
  ClusterIdentifier?: string;
  DatabaseName?: string;
  PartnerName?: string;
}
export interface PartnerIntegrationOutputMessage {
  DatabaseName?: string;
  PartnerName?: string;
}
export interface AssociateDataShareConsumerMessage {
  DataShareArn?: string;
  AssociateEntireAccount?: boolean;
  ConsumerArn?: string;
  ConsumerRegion?: string;
  AllowWrites?: boolean;
}
export type DataShareStatus =
  | "ACTIVE"
  | "PENDING_AUTHORIZATION"
  | "AUTHORIZED"
  | "DEAUTHORIZED"
  | "REJECTED"
  | "AVAILABLE"
  | (string & {});
export interface DataShareAssociation {
  ConsumerIdentifier?: string;
  Status?: DataShareStatus;
  ConsumerRegion?: string;
  CreatedDate?: Date;
  StatusChangeDate?: Date;
  ProducerAllowedWrites?: boolean;
  ConsumerAcceptedWrites?: boolean;
}
export type DataShareAssociationList = DataShareAssociation[];
export type DataShareType = "INTERNAL" | (string & {});
export interface DataShare {
  DataShareArn?: string;
  ProducerArn?: string;
  AllowPubliclyAccessibleConsumers?: boolean;
  DataShareAssociations?: DataShareAssociation[];
  ManagedBy?: string;
  DataShareType?: DataShareType;
}
export interface AuthorizeClusterSecurityGroupIngressMessage {
  ClusterSecurityGroupName?: string;
  CIDRIP?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface EC2SecurityGroup {
  Status?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
  Tags?: Tag[];
}
export type EC2SecurityGroupList = EC2SecurityGroup[];
export interface IPRange {
  Status?: string;
  CIDRIP?: string;
  Tags?: Tag[];
}
export type IPRangeList = IPRange[];
export interface ClusterSecurityGroup {
  ClusterSecurityGroupName?: string;
  Description?: string;
  EC2SecurityGroups?: EC2SecurityGroup[];
  IPRanges?: IPRange[];
  Tags?: Tag[];
}
export interface AuthorizeClusterSecurityGroupIngressResult {
  ClusterSecurityGroup?: ClusterSecurityGroup;
}
export interface AuthorizeDataShareMessage {
  DataShareArn?: string;
  ConsumerIdentifier?: string;
  AllowWrites?: boolean;
}
export type VpcIdentifierList = string[];
export interface AuthorizeEndpointAccessMessage {
  ClusterIdentifier?: string;
  Account?: string;
  VpcIds?: string[];
}
export type AuthorizationStatus = "Authorized" | "Revoking" | (string & {});
export interface EndpointAuthorization {
  Grantor?: string;
  Grantee?: string;
  ClusterIdentifier?: string;
  AuthorizeTime?: Date;
  ClusterStatus?: string;
  Status?: AuthorizationStatus;
  AllowedAllVPCs?: boolean;
  AllowedVPCs?: string[];
  EndpointCount?: number;
}
export interface AuthorizeSnapshotAccessMessage {
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotClusterIdentifier?: string;
  AccountWithRestoreAccess?: string;
}
export interface AccountWithRestoreAccess {
  AccountId?: string;
  AccountAlias?: string;
}
export type AccountsWithRestoreAccessList = AccountWithRestoreAccess[];
export type RestorableNodeTypeList = string[];
export interface Snapshot {
  SnapshotIdentifier?: string;
  ClusterIdentifier?: string;
  SnapshotCreateTime?: Date;
  Status?: string;
  Port?: number;
  AvailabilityZone?: string;
  ClusterCreateTime?: Date;
  MasterUsername?: string;
  ClusterVersion?: string;
  EngineFullVersion?: string;
  SnapshotType?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  DBName?: string;
  VpcId?: string;
  Encrypted?: boolean;
  KmsKeyId?: string;
  EncryptedWithHSM?: boolean;
  AccountsWithRestoreAccess?: AccountWithRestoreAccess[];
  OwnerAccount?: string;
  TotalBackupSizeInMegaBytes?: number;
  ActualIncrementalBackupSizeInMegaBytes?: number;
  BackupProgressInMegaBytes?: number;
  CurrentBackupRateInMegaBytesPerSecond?: number;
  EstimatedSecondsToCompletion?: number;
  ElapsedTimeInSeconds?: number;
  SourceRegion?: string;
  Tags?: Tag[];
  RestorableNodeTypes?: string[];
  EnhancedVpcRouting?: boolean;
  MaintenanceTrackName?: string;
  ManualSnapshotRetentionPeriod?: number;
  ManualSnapshotRemainingDays?: number;
  SnapshotRetentionStartTime?: Date;
  MasterPasswordSecretArn?: string;
  MasterPasswordSecretKmsKeyId?: string;
  SnapshotArn?: string;
}
export interface AuthorizeSnapshotAccessResult {
  Snapshot?: Snapshot;
}
export interface DeleteClusterSnapshotMessage {
  SnapshotIdentifier?: string;
  SnapshotClusterIdentifier?: string;
}
export type DeleteClusterSnapshotMessageList = DeleteClusterSnapshotMessage[];
export interface BatchDeleteClusterSnapshotsRequest {
  Identifiers?: DeleteClusterSnapshotMessage[];
}
export type SnapshotIdentifierList = string[];
export interface SnapshotErrorMessage {
  SnapshotIdentifier?: string;
  SnapshotClusterIdentifier?: string;
  FailureCode?: string;
  FailureReason?: string;
}
export type BatchSnapshotOperationErrorList = SnapshotErrorMessage[];
export interface BatchDeleteClusterSnapshotsResult {
  Resources?: string[];
  Errors?: SnapshotErrorMessage[];
}
export interface BatchModifyClusterSnapshotsMessage {
  SnapshotIdentifierList?: string[];
  ManualSnapshotRetentionPeriod?: number;
  Force?: boolean;
}
export type BatchSnapshotOperationErrors = SnapshotErrorMessage[];
export interface BatchModifyClusterSnapshotsOutputMessage {
  Resources?: string[];
  Errors?: SnapshotErrorMessage[];
}
export interface CancelResizeMessage {
  ClusterIdentifier?: string;
}
export type ImportTablesCompleted = string[];
export type ImportTablesInProgress = string[];
export type ImportTablesNotStarted = string[];
export interface ResizeProgressMessage {
  TargetNodeType?: string;
  TargetNumberOfNodes?: number;
  TargetClusterType?: string;
  Status?: string;
  ImportTablesCompleted?: string[];
  ImportTablesInProgress?: string[];
  ImportTablesNotStarted?: string[];
  AvgResizeRateInMegaBytesPerSecond?: number;
  TotalResizeDataInMegaBytes?: number;
  ProgressInMegaBytes?: number;
  ElapsedTimeInSeconds?: number;
  EstimatedTimeToCompletionInSeconds?: number;
  ResizeType?: string;
  Message?: string;
  TargetEncryptionType?: string;
  DataTransferProgressPercent?: number;
}
export interface CopyClusterSnapshotMessage {
  SourceSnapshotIdentifier?: string;
  SourceSnapshotClusterIdentifier?: string;
  TargetSnapshotIdentifier?: string;
  ManualSnapshotRetentionPeriod?: number;
}
export interface CopyClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export type AuthenticationProfileNameString = string;
export interface CreateAuthenticationProfileMessage {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export interface CreateAuthenticationProfileResult {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export type SensitiveString = string | redacted.Redacted<string>;
export type ClusterSecurityGroupNameList = string[];
export type VpcSecurityGroupIdList = string[];
export type IamRoleArnList = string[];
export type AquaConfigurationStatus = "enabled" | "disabled" | "auto" | (string & {});
export type CatalogNameString = string;
export interface CreateClusterMessage {
  DBName?: string;
  ClusterIdentifier?: string;
  ClusterType?: string;
  NodeType?: string;
  MasterUsername?: string;
  MasterUserPassword?: string | redacted.Redacted<string>;
  ClusterSecurityGroups?: string[];
  VpcSecurityGroupIds?: string[];
  ClusterSubnetGroupName?: string;
  AvailabilityZone?: string;
  PreferredMaintenanceWindow?: string;
  ClusterParameterGroupName?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  Port?: number;
  ClusterVersion?: string;
  AllowVersionUpgrade?: boolean;
  NumberOfNodes?: number;
  PubliclyAccessible?: boolean;
  Encrypted?: boolean;
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  ElasticIp?: string;
  Tags?: Tag[];
  KmsKeyId?: string;
  EnhancedVpcRouting?: boolean;
  AdditionalInfo?: string;
  IamRoles?: string[];
  MaintenanceTrackName?: string;
  SnapshotScheduleIdentifier?: string;
  AvailabilityZoneRelocation?: boolean;
  AquaConfigurationStatus?: AquaConfigurationStatus;
  DefaultIamRoleArn?: string;
  LoadSampleData?: string;
  ManageMasterPassword?: boolean;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: boolean;
  RedshiftIdcApplicationArn?: string;
  CatalogName?: string;
  ExtraComputeForAutomaticOptimization?: boolean;
}
export interface NetworkInterface {
  NetworkInterfaceId?: string;
  SubnetId?: string;
  PrivateIpAddress?: string;
  AvailabilityZone?: string;
  Ipv6Address?: string;
}
export type NetworkInterfaceList = NetworkInterface[];
export interface VpcEndpoint {
  VpcEndpointId?: string;
  VpcId?: string;
  NetworkInterfaces?: NetworkInterface[];
}
export type VpcEndpointsList = VpcEndpoint[];
export interface Endpoint {
  Address?: string;
  Port?: number;
  VpcEndpoints?: VpcEndpoint[];
}
const Endpoint = /*@__PURE__*/ __L.at(__c1, 4) as any as S.Schema<Endpoint>;
export interface ClusterSecurityGroupMembership {
  ClusterSecurityGroupName?: string;
  Status?: string;
}
export type ClusterSecurityGroupMembershipList = ClusterSecurityGroupMembership[];
export interface VpcSecurityGroupMembership {
  VpcSecurityGroupId?: string;
  Status?: string;
}
export type VpcSecurityGroupMembershipList = VpcSecurityGroupMembership[];
export interface ClusterParameterStatus {
  ParameterName?: string;
  ParameterApplyStatus?: string;
  ParameterApplyErrorDescription?: string;
}
export type ClusterParameterStatusList = ClusterParameterStatus[];
export interface ClusterParameterGroupStatus {
  ParameterGroupName?: string;
  ParameterApplyStatus?: string;
  ClusterParameterStatusList?: ClusterParameterStatus[];
}
export type ClusterParameterGroupStatusList = ClusterParameterGroupStatus[];
export interface PendingModifiedValues {
  MasterUserPassword?: string | redacted.Redacted<string>;
  NodeType?: string;
  NumberOfNodes?: number;
  ClusterType?: string;
  ClusterVersion?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ClusterIdentifier?: string;
  PubliclyAccessible?: boolean;
  EnhancedVpcRouting?: boolean;
  MaintenanceTrackName?: string;
  EncryptionType?: string;
}
export interface RestoreStatus {
  Status?: string;
  CurrentRestoreRateInMegaBytesPerSecond?: number;
  SnapshotSizeInMegaBytes?: number;
  ProgressInMegaBytes?: number;
  ElapsedTimeInSeconds?: number;
  EstimatedTimeToCompletionInSeconds?: number;
}
export interface DataTransferProgress {
  Status?: string;
  CurrentRateInMegaBytesPerSecond?: number;
  TotalDataInMegaBytes?: number;
  DataTransferredInMegaBytes?: number;
  EstimatedTimeToCompletionInSeconds?: number;
  ElapsedTimeInSeconds?: number;
}
export interface HsmStatus {
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  Status?: string;
}
export interface ClusterSnapshotCopyStatus {
  DestinationRegion?: string;
  RetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  SnapshotCopyGrantName?: string;
}
export interface ClusterNode {
  NodeRole?: string;
  PrivateIPAddress?: string;
  PublicIPAddress?: string;
}
export type ClusterNodesList = ClusterNode[];
export interface ElasticIpStatus {
  ElasticIp?: string;
  Status?: string;
}
export interface ClusterIamRole {
  IamRoleArn?: string;
  ApplyStatus?: string;
}
export type ClusterIamRoleList = ClusterIamRole[];
export type PendingActionsList = string[];
export interface DeferredMaintenanceWindow {
  DeferMaintenanceIdentifier?: string;
  DeferMaintenanceStartTime?: Date;
  DeferMaintenanceEndTime?: Date;
}
export type DeferredMaintenanceWindowsList = DeferredMaintenanceWindow[];
export type ScheduleState = "MODIFYING" | "ACTIVE" | "FAILED" | (string & {});
export interface ResizeInfo {
  ResizeType?: string;
  AllowCancelResize?: boolean;
}
export type AquaStatus = "enabled" | "disabled" | "applying" | (string & {});
export interface AquaConfiguration {
  AquaStatus?: AquaStatus;
  AquaConfigurationStatus?: AquaConfigurationStatus;
}
export type ReservedNodeExchangeStatusType =
  | "REQUESTED"
  | "PENDING"
  | "IN_PROGRESS"
  | "RETRYING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export interface ReservedNodeExchangeStatus {
  ReservedNodeExchangeRequestId?: string;
  Status?: ReservedNodeExchangeStatusType;
  RequestTime?: Date;
  SourceReservedNodeId?: string;
  SourceReservedNodeType?: string;
  SourceReservedNodeCount?: number;
  TargetReservedNodeOfferingId?: string;
  TargetReservedNodeType?: string;
  TargetReservedNodeCount?: number;
}
export interface SecondaryClusterInfo {
  AvailabilityZone?: string;
  ClusterNodes?: ClusterNode[];
}
export type LogTypeList = string[];
export type S3TableLastIngestionTimeMap = { [key: string]: string | undefined };
export interface S3TablePublishStatus {
  S3Tables?: string[];
  S3TableNamespace?: string;
  S3TableGranularity?: string;
  EnabledAll?: boolean;
  LastIngestionTimes?: { [key: string]: string | undefined };
}
export interface LoggingPublishStatus {
  S3Tables?: S3TablePublishStatus;
}
export interface Cluster {
  ClusterIdentifier?: string;
  NodeType?: string;
  ClusterStatus?: string;
  ClusterAvailabilityStatus?: string;
  ModifyStatus?: string;
  MasterUsername?: string;
  DBName?: string;
  Endpoint?: Endpoint;
  ClusterCreateTime?: Date;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  ClusterSecurityGroups?: ClusterSecurityGroupMembership[];
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  ClusterParameterGroups?: ClusterParameterGroupStatus[];
  ClusterSubnetGroupName?: string;
  VpcId?: string;
  AvailabilityZone?: string;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: PendingModifiedValues;
  ClusterVersion?: string;
  AllowVersionUpgrade?: boolean;
  NumberOfNodes?: number;
  PubliclyAccessible?: boolean;
  Encrypted?: boolean;
  RestoreStatus?: RestoreStatus;
  DataTransferProgress?: DataTransferProgress;
  HsmStatus?: HsmStatus;
  ClusterSnapshotCopyStatus?: ClusterSnapshotCopyStatus;
  ClusterPublicKey?: string;
  ClusterNodes?: ClusterNode[];
  ElasticIpStatus?: ElasticIpStatus;
  ClusterRevisionNumber?: string;
  Tags?: Tag[];
  KmsKeyId?: string;
  EnhancedVpcRouting?: boolean;
  IamRoles?: ClusterIamRole[];
  PendingActions?: string[];
  MaintenanceTrackName?: string;
  ElasticResizeNumberOfNodeOptions?: string;
  DeferredMaintenanceWindows?: DeferredMaintenanceWindow[];
  SnapshotScheduleIdentifier?: string;
  SnapshotScheduleState?: ScheduleState;
  ExpectedNextSnapshotScheduleTime?: Date;
  ExpectedNextSnapshotScheduleTimeStatus?: string;
  NextMaintenanceWindowStartTime?: Date;
  ResizeInfo?: ResizeInfo;
  AvailabilityZoneRelocationStatus?: string;
  ClusterNamespaceArn?: string;
  TotalStorageCapacityInMegaBytes?: number;
  AquaConfiguration?: AquaConfiguration;
  DefaultIamRoleArn?: string;
  ReservedNodeExchangeStatus?: ReservedNodeExchangeStatus;
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  CustomDomainCertificateExpiryDate?: Date;
  MasterPasswordSecretArn?: string;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: string;
  MultiAZSecondary?: SecondaryClusterInfo;
  LakehouseRegistrationStatus?: string;
  CatalogArn?: string;
  ExtraComputeForAutomaticOptimization?: string;
  LoggingPublishStatus?: LoggingPublishStatus;
}
export interface CreateClusterResult {
  Cluster?: Cluster;
}
export interface CreateClusterParameterGroupMessage {
  ParameterGroupName?: string;
  ParameterGroupFamily?: string;
  Description?: string;
  Tags?: Tag[];
}
export interface ClusterParameterGroup {
  ParameterGroupName?: string;
  ParameterGroupFamily?: string;
  Description?: string;
  Tags?: Tag[];
}
export interface CreateClusterParameterGroupResult {
  ClusterParameterGroup?: ClusterParameterGroup;
}
export interface CreateClusterSecurityGroupMessage {
  ClusterSecurityGroupName?: string;
  Description?: string;
  Tags?: Tag[];
}
export interface CreateClusterSecurityGroupResult {
  ClusterSecurityGroup?: ClusterSecurityGroup;
}
export interface CreateClusterSnapshotMessage {
  SnapshotIdentifier?: string;
  ClusterIdentifier?: string;
  ManualSnapshotRetentionPeriod?: number;
  Tags?: Tag[];
}
export interface CreateClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export type SubnetIdentifierList = string[];
export interface CreateClusterSubnetGroupMessage {
  ClusterSubnetGroupName?: string;
  Description?: string;
  SubnetIds?: string[];
  Tags?: Tag[];
}
export interface SupportedPlatform {
  Name?: string;
}
export type SupportedPlatformsList = SupportedPlatform[];
export interface AvailabilityZone {
  Name?: string;
  SupportedPlatforms?: SupportedPlatform[];
}
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AvailabilityZone;
  SubnetStatus?: string;
}
export type SubnetList = Subnet[];
export type ValueStringList = string[];
export interface ClusterSubnetGroup {
  ClusterSubnetGroupName?: string;
  Description?: string;
  VpcId?: string;
  SubnetGroupStatus?: string;
  Subnets?: Subnet[];
  Tags?: Tag[];
  SupportedClusterIpAddressTypes?: string[];
}
export interface CreateClusterSubnetGroupResult {
  ClusterSubnetGroup?: ClusterSubnetGroup;
}
export type CustomDomainNameString = string;
export type CustomDomainCertificateArnString = string;
export interface CreateCustomDomainAssociationMessage {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
}
export interface CreateCustomDomainAssociationResult {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
  CustomDomainCertExpiryTime?: string;
}
export interface CreateEndpointAccessMessage {
  ClusterIdentifier?: string;
  ResourceOwner?: string;
  EndpointName?: string;
  SubnetGroupName?: string;
  VpcSecurityGroupIds?: string[];
}
export interface EndpointAccess {
  ClusterIdentifier?: string;
  ResourceOwner?: string;
  SubnetGroupName?: string;
  EndpointStatus?: string;
  EndpointName?: string;
  EndpointCreateTime?: Date;
  Port?: number;
  Address?: string;
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  VpcEndpoint?: VpcEndpoint;
}
export type SourceIdsList = string[];
export type EventCategoriesList = string[];
export interface CreateEventSubscriptionMessage {
  SubscriptionName?: string;
  SnsTopicArn?: string;
  SourceType?: string;
  SourceIds?: string[];
  EventCategories?: string[];
  Severity?: string;
  Enabled?: boolean;
  Tags?: Tag[];
}
export interface EventSubscription {
  CustomerAwsId?: string;
  CustSubscriptionId?: string;
  SnsTopicArn?: string;
  Status?: string;
  SubscriptionCreationTime?: Date;
  SourceType?: string;
  SourceIdsList?: string[];
  EventCategoriesList?: string[];
  Severity?: string;
  Enabled?: boolean;
  Tags?: Tag[];
}
export interface CreateEventSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export interface CreateHsmClientCertificateMessage {
  HsmClientCertificateIdentifier?: string;
  Tags?: Tag[];
}
export interface HsmClientCertificate {
  HsmClientCertificateIdentifier?: string;
  HsmClientCertificatePublicKey?: string;
  Tags?: Tag[];
}
export interface CreateHsmClientCertificateResult {
  HsmClientCertificate?: HsmClientCertificate;
}
export interface CreateHsmConfigurationMessage {
  HsmConfigurationIdentifier?: string;
  Description?: string;
  HsmIpAddress?: string;
  HsmPartitionName?: string;
  HsmPartitionPassword?: string;
  HsmServerPublicCertificate?: string;
  Tags?: Tag[];
}
export interface HsmConfiguration {
  HsmConfigurationIdentifier?: string;
  Description?: string;
  HsmIpAddress?: string;
  HsmPartitionName?: string;
  Tags?: Tag[];
}
export interface CreateHsmConfigurationResult {
  HsmConfiguration?: HsmConfiguration;
}
export type SourceArn = string;
export type TargetArn = string;
export type IntegrationName = string;
export type EncryptionContextMap = { [key: string]: string | undefined };
export type IntegrationDescription = string;
export interface CreateIntegrationMessage {
  SourceArn?: string;
  TargetArn?: string;
  IntegrationName?: string;
  KMSKeyId?: string;
  TagList?: Tag[];
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Description?: string;
}
export type IntegrationArn = string;
export type ZeroETLIntegrationStatus =
  | "creating"
  | "active"
  | "modifying"
  | "failed"
  | "deleting"
  | "syncing"
  | "needs_attention"
  | (string & {});
export interface IntegrationError {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type IntegrationErrorList = IntegrationError[];
export type Description = string;
export interface Integration {
  IntegrationArn?: string;
  IntegrationName?: string;
  SourceArn?: string;
  TargetArn?: string;
  Status?: ZeroETLIntegrationStatus;
  Errors?: (IntegrationError & { ErrorCode: string })[];
  CreateTime?: Date;
  Description?: string;
  KMSKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
}
export type Qev2IdcApplicationName = string;
export type IdcDisplayNameString = string;
export interface CreateQev2IdcApplicationMessage {
  IdcInstanceArn?: string;
  Qev2IdcApplicationName?: string;
  IdcDisplayName?: string;
  Tags?: Tag[];
}
export interface Qev2IdcApplication {
  IdcInstanceArn?: string;
  Qev2IdcApplicationName?: string;
  Qev2IdcApplicationArn?: string;
  IdcManagedApplicationArn?: string;
  IdcOnboardStatus?: string;
  IdcDisplayName?: string;
  Tags?: Tag[];
}
export interface CreateQev2IdcApplicationResult {
  Qev2IdcApplication?: Qev2IdcApplication;
}
export type RedshiftIdcApplicationName = string;
export type IdentityNamespaceString = string;
export type AuthorizedAudienceList = string[];
export interface AuthorizedTokenIssuer {
  TrustedTokenIssuerArn?: string;
  AuthorizedAudiencesList?: string[];
}
export type AuthorizedTokenIssuerList = AuthorizedTokenIssuer[];
export type ServiceAuthorization = "Enabled" | "Disabled" | (string & {});
export interface LakeFormationQuery {
  Authorization?: ServiceAuthorization;
}
export type LakeFormationScopeUnion = { LakeFormationQuery: LakeFormationQuery };
export type LakeFormationServiceIntegrations = LakeFormationScopeUnion[];
export interface ReadWriteAccess {
  Authorization?: ServiceAuthorization;
}
export type S3AccessGrantsScopeUnion = { ReadWriteAccess: ReadWriteAccess };
export type S3AccessGrantsServiceIntegrations = S3AccessGrantsScopeUnion[];
export interface Connect {
  Authorization?: ServiceAuthorization;
}
export type RedshiftScopeUnion = { Connect: Connect };
export type RedshiftServiceIntegrations = RedshiftScopeUnion[];
export type ServiceIntegrationsUnion =
  | { LakeFormation: LakeFormationScopeUnion[]; S3AccessGrants?: never; Redshift?: never }
  | { LakeFormation?: never; S3AccessGrants: S3AccessGrantsScopeUnion[]; Redshift?: never }
  | { LakeFormation?: never; S3AccessGrants?: never; Redshift: RedshiftScopeUnion[] };
export type ServiceIntegrationList = ServiceIntegrationsUnion[];
export type ApplicationType = "None" | "Lakehouse" | (string & {});
export type TagKeyList = string[];
export interface CreateRedshiftIdcApplicationMessage {
  IdcInstanceArn?: string;
  RedshiftIdcApplicationName?: string;
  IdentityNamespace?: string;
  IdcDisplayName?: string;
  IamRoleArn?: string;
  AuthorizedTokenIssuerList?: AuthorizedTokenIssuer[];
  ServiceIntegrations?: ServiceIntegrationsUnion[];
  ApplicationType?: ApplicationType;
  Tags?: Tag[];
  SsoTagKeys?: string[];
}
export interface RedshiftIdcApplication {
  IdcInstanceArn?: string;
  RedshiftIdcApplicationName?: string;
  RedshiftIdcApplicationArn?: string;
  IdentityNamespace?: string;
  IdcDisplayName?: string;
  IamRoleArn?: string;
  IdcManagedApplicationArn?: string;
  IdcOnboardStatus?: string;
  AuthorizedTokenIssuerList?: AuthorizedTokenIssuer[];
  ServiceIntegrations?: ServiceIntegrationsUnion[];
  ApplicationType?: ApplicationType;
  Tags?: Tag[];
  SsoTagKeys?: string[];
}
export interface CreateRedshiftIdcApplicationResult {
  RedshiftIdcApplication?: RedshiftIdcApplication;
}
export interface ResizeClusterMessage {
  ClusterIdentifier?: string;
  ClusterType?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  Classic?: boolean;
  ReservedNodeId?: string;
  TargetReservedNodeOfferingId?: string;
}
export interface PauseClusterMessage {
  ClusterIdentifier?: string;
}
export interface ResumeClusterMessage {
  ClusterIdentifier?: string;
}
export interface ScheduledActionType {
  ResizeCluster?: ResizeClusterMessage;
  PauseCluster?: PauseClusterMessage;
  ResumeCluster?: ResumeClusterMessage;
}
export interface CreateScheduledActionMessage {
  ScheduledActionName?: string;
  TargetAction?: ScheduledActionType;
  Schedule?: string;
  IamRole?: string;
  ScheduledActionDescription?: string;
  StartTime?: Date;
  EndTime?: Date;
  Enable?: boolean;
}
export type ScheduledActionState = "ACTIVE" | "DISABLED" | (string & {});
export type ScheduledActionTimeList = Date[];
export interface ScheduledAction {
  ScheduledActionName?: string;
  TargetAction?: ScheduledActionType & {
    ResizeCluster: ResizeClusterMessage & { ClusterIdentifier: string };
    PauseCluster: PauseClusterMessage & { ClusterIdentifier: string };
    ResumeCluster: ResumeClusterMessage & { ClusterIdentifier: string };
  };
  Schedule?: string;
  IamRole?: string;
  ScheduledActionDescription?: string;
  State?: ScheduledActionState;
  NextInvocations?: Date[];
  StartTime?: Date;
  EndTime?: Date;
}
export interface CreateSnapshotCopyGrantMessage {
  SnapshotCopyGrantName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export interface SnapshotCopyGrant {
  SnapshotCopyGrantName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export interface CreateSnapshotCopyGrantResult {
  SnapshotCopyGrant?: SnapshotCopyGrant;
}
export type ScheduleDefinitionList = string[];
export interface CreateSnapshotScheduleMessage {
  ScheduleDefinitions?: string[];
  ScheduleIdentifier?: string;
  ScheduleDescription?: string;
  Tags?: Tag[];
  DryRun?: boolean;
  NextInvocations?: number;
}
export type ScheduledSnapshotTimeList = Date[];
export interface ClusterAssociatedToSchedule {
  ClusterIdentifier?: string;
  ScheduleAssociationState?: ScheduleState;
}
export type AssociatedClusterList = ClusterAssociatedToSchedule[];
export interface SnapshotSchedule {
  ScheduleDefinitions?: string[];
  ScheduleIdentifier?: string;
  ScheduleDescription?: string;
  Tags?: Tag[];
  NextInvocations?: Date[];
  AssociatedClusterCount?: number;
  AssociatedClusters?: ClusterAssociatedToSchedule[];
}
export interface CreateTagsMessage {
  ResourceName?: string;
  Tags?: Tag[];
}
export interface CreateTagsResponse {}
export type UsageLimitFeatureType =
  | "spectrum"
  | "concurrency-scaling"
  | "cross-region-datasharing"
  | "extra-compute-for-automatic-optimization"
  | (string & {});
export type UsageLimitLimitType = "time" | "data-scanned" | (string & {});
export type UsageLimitPeriod = "daily" | "weekly" | "monthly" | (string & {});
export type UsageLimitBreachAction = "log" | "emit-metric" | "disable" | (string & {});
export interface CreateUsageLimitMessage {
  ClusterIdentifier?: string;
  FeatureType?: UsageLimitFeatureType;
  LimitType?: UsageLimitLimitType;
  Amount?: number;
  Period?: UsageLimitPeriod;
  BreachAction?: UsageLimitBreachAction;
  Tags?: Tag[];
}
export interface UsageLimit {
  UsageLimitId?: string;
  ClusterIdentifier?: string;
  FeatureType?: UsageLimitFeatureType;
  LimitType?: UsageLimitLimitType;
  Amount?: number;
  Period?: UsageLimitPeriod;
  BreachAction?: UsageLimitBreachAction;
  Tags?: Tag[];
}
export interface DeauthorizeDataShareMessage {
  DataShareArn?: string;
  ConsumerIdentifier?: string;
}
export interface DeleteAuthenticationProfileMessage {
  AuthenticationProfileName?: string;
}
export interface DeleteAuthenticationProfileResult {
  AuthenticationProfileName?: string;
}
export interface DeleteClusterMessage {
  ClusterIdentifier?: string;
  SkipFinalClusterSnapshot?: boolean;
  FinalClusterSnapshotIdentifier?: string;
  FinalClusterSnapshotRetentionPeriod?: number;
}
export interface DeleteClusterResult {
  Cluster?: Cluster;
}
export interface DeleteClusterParameterGroupMessage {
  ParameterGroupName?: string;
}
export interface DeleteClusterParameterGroupResponse {}
export interface DeleteClusterSecurityGroupMessage {
  ClusterSecurityGroupName?: string;
}
export interface DeleteClusterSecurityGroupResponse {}
export interface DeleteClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export interface DeleteClusterSubnetGroupMessage {
  ClusterSubnetGroupName?: string;
}
export interface DeleteClusterSubnetGroupResponse {}
export interface DeleteCustomDomainAssociationMessage {
  ClusterIdentifier?: string;
  CustomDomainName?: string;
}
export interface DeleteCustomDomainAssociationResponse {}
export interface DeleteEndpointAccessMessage {
  EndpointName?: string;
}
export interface DeleteEventSubscriptionMessage {
  SubscriptionName?: string;
}
export interface DeleteEventSubscriptionResponse {}
export interface DeleteHsmClientCertificateMessage {
  HsmClientCertificateIdentifier?: string;
}
export interface DeleteHsmClientCertificateResponse {}
export interface DeleteHsmConfigurationMessage {
  HsmConfigurationIdentifier?: string;
}
export interface DeleteHsmConfigurationResponse {}
export interface DeleteIntegrationMessage {
  IntegrationArn?: string;
}
export interface DeleteQev2IdcApplicationMessage {
  Qev2IdcApplicationArn?: string;
}
export interface DeleteQev2IdcApplicationResponse {}
export interface DeleteRedshiftIdcApplicationMessage {
  RedshiftIdcApplicationArn?: string;
}
export interface DeleteRedshiftIdcApplicationResponse {}
export interface DeleteResourcePolicyMessage {
  ResourceArn?: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteScheduledActionMessage {
  ScheduledActionName?: string;
}
export interface DeleteScheduledActionResponse {}
export interface DeleteSnapshotCopyGrantMessage {
  SnapshotCopyGrantName?: string;
}
export interface DeleteSnapshotCopyGrantResponse {}
export interface DeleteSnapshotScheduleMessage {
  ScheduleIdentifier?: string;
}
export interface DeleteSnapshotScheduleResponse {}
export interface DeleteTagsMessage {
  ResourceName?: string;
  TagKeys?: string[];
}
export interface DeleteTagsResponse {}
export interface DeleteUsageLimitMessage {
  UsageLimitId?: string;
}
export interface DeleteUsageLimitResponse {}
export interface ServerlessIdentifier {
  NamespaceIdentifier?: string;
  WorkgroupIdentifier?: string;
}
export interface ProvisionedIdentifier {
  ClusterIdentifier?: string;
}
export type NamespaceIdentifierUnion =
  | { ServerlessIdentifier: ServerlessIdentifier; ProvisionedIdentifier?: never }
  | { ServerlessIdentifier?: never; ProvisionedIdentifier: ProvisionedIdentifier };
export type ConsumerIdentifierList = string[];
export interface DeregisterNamespaceInputMessage {
  NamespaceIdentifier?: NamespaceIdentifierUnion;
  ConsumerIdentifiers?: string[];
}
export type NamespaceRegistrationStatus = "Registering" | "Deregistering" | (string & {});
export interface DeregisterNamespaceOutputMessage {
  Status?: NamespaceRegistrationStatus;
}
export type AttributeNameList = string[];
export interface DescribeAccountAttributesMessage {
  AttributeNames?: string[];
}
export interface AttributeValueTarget {
  AttributeValue?: string;
}
export type AttributeValueList = AttributeValueTarget[];
export interface AccountAttribute {
  AttributeName?: string;
  AttributeValues?: AttributeValueTarget[];
}
export type AttributeList = AccountAttribute[];
export interface AccountAttributeList {
  AccountAttributes?: AccountAttribute[];
}
export interface DescribeAuthenticationProfilesMessage {
  AuthenticationProfileName?: string;
}
export interface AuthenticationProfile {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export type AuthenticationProfileList = AuthenticationProfile[];
export interface DescribeAuthenticationProfilesResult {
  AuthenticationProfiles?: AuthenticationProfile[];
}
export interface DescribeClusterDbRevisionsMessage {
  ClusterIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface RevisionTarget {
  DatabaseRevision?: string;
  Description?: string;
  DatabaseRevisionReleaseDate?: Date;
}
export type RevisionTargetsList = RevisionTarget[];
export interface ClusterDbRevision {
  ClusterIdentifier?: string;
  CurrentDatabaseRevision?: string;
  DatabaseRevisionReleaseDate?: Date;
  RevisionTargets?: RevisionTarget[];
}
export type ClusterDbRevisionsList = ClusterDbRevision[];
export interface ClusterDbRevisionsMessage {
  Marker?: string;
  ClusterDbRevisions?: ClusterDbRevision[];
}
export type TagValueList = string[];
export interface DescribeClusterParameterGroupsMessage {
  ParameterGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type ParameterGroupList = ClusterParameterGroup[];
export interface ClusterParameterGroupsMessage {
  Marker?: string;
  ParameterGroups?: ClusterParameterGroup[];
}
export interface DescribeClusterParametersMessage {
  ParameterGroupName?: string;
  Source?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type ParameterApplyType = "static" | "dynamic" | (string & {});
export interface Parameter {
  ParameterName?: string;
  ParameterValue?: string;
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  ApplyType?: ParameterApplyType;
  IsModifiable?: boolean;
  MinimumEngineVersion?: string;
}
export type ParametersList = Parameter[];
export interface ClusterParameterGroupDetails {
  Parameters?: Parameter[];
  Marker?: string;
}
export interface DescribeClustersMessage {
  ClusterIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type ClusterList = Cluster[];
export interface ClustersMessage {
  Marker?: string;
  Clusters?: Cluster[];
}
export interface DescribeClusterSecurityGroupsMessage {
  ClusterSecurityGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type ClusterSecurityGroups = ClusterSecurityGroup[];
export interface ClusterSecurityGroupMessage {
  Marker?: string;
  ClusterSecurityGroups?: ClusterSecurityGroup[];
}
export type SnapshotAttributeToSortBy =
  | "SOURCE_TYPE"
  | "TOTAL_SIZE"
  | "CREATE_TIME"
  | (string & {});
export type SortByOrder = "ASC" | "DESC" | (string & {});
export interface SnapshotSortingEntity {
  Attribute?: SnapshotAttributeToSortBy;
  SortOrder?: SortByOrder;
}
export type SnapshotSortingEntityList = SnapshotSortingEntity[];
export interface DescribeClusterSnapshotsMessage {
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotType?: string;
  StartTime?: Date;
  EndTime?: Date;
  MaxRecords?: number;
  Marker?: string;
  OwnerAccount?: string;
  TagKeys?: string[];
  TagValues?: string[];
  ClusterExists?: boolean;
  SortingEntities?: SnapshotSortingEntity[];
}
export type SnapshotList = Snapshot[];
export interface SnapshotMessage {
  Marker?: string;
  Snapshots?: Snapshot[];
}
export interface DescribeClusterSubnetGroupsMessage {
  ClusterSubnetGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type ClusterSubnetGroups = ClusterSubnetGroup[];
export interface ClusterSubnetGroupMessage {
  Marker?: string;
  ClusterSubnetGroups?: ClusterSubnetGroup[];
}
export interface DescribeClusterTracksMessage {
  MaintenanceTrackName?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface SupportedOperation {
  OperationName?: string;
}
export type SupportedOperationList = SupportedOperation[];
export interface UpdateTarget {
  MaintenanceTrackName?: string;
  DatabaseVersion?: string;
  SupportedOperations?: SupportedOperation[];
}
export type EligibleTracksToUpdateList = UpdateTarget[];
export interface MaintenanceTrack {
  MaintenanceTrackName?: string;
  DatabaseVersion?: string;
  UpdateTargets?: UpdateTarget[];
}
export type TrackList = MaintenanceTrack[];
export interface TrackListMessage {
  MaintenanceTracks?: MaintenanceTrack[];
  Marker?: string;
}
export interface DescribeClusterVersionsMessage {
  ClusterVersion?: string;
  ClusterParameterGroupFamily?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface ClusterVersion {
  ClusterVersion?: string;
  ClusterParameterGroupFamily?: string;
  Description?: string;
}
export type ClusterVersionList = ClusterVersion[];
export interface ClusterVersionsMessage {
  Marker?: string;
  ClusterVersions?: ClusterVersion[];
}
export interface DescribeCustomDomainAssociationsMessage {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface CertificateAssociation {
  CustomDomainName?: string;
  ClusterIdentifier?: string;
}
export type CertificateAssociationList = CertificateAssociation[];
export interface Association {
  CustomDomainCertificateArn?: string;
  CustomDomainCertificateExpiryDate?: Date;
  CertificateAssociations?: CertificateAssociation[];
}
export type AssociationList = Association[];
export interface CustomDomainAssociationsMessage {
  Marker?: string;
  Associations?: Association[];
}
export interface DescribeDataSharesMessage {
  DataShareArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type DataShareList = DataShare[];
export interface DescribeDataSharesResult {
  DataShares?: DataShare[];
  Marker?: string;
}
export type DataShareStatusForConsumer = "ACTIVE" | "AVAILABLE" | (string & {});
export interface DescribeDataSharesForConsumerMessage {
  ConsumerArn?: string;
  Status?: DataShareStatusForConsumer;
  MaxRecords?: number;
  Marker?: string;
}
export interface DescribeDataSharesForConsumerResult {
  DataShares?: DataShare[];
  Marker?: string;
}
export type DataShareStatusForProducer =
  | "ACTIVE"
  | "AUTHORIZED"
  | "PENDING_AUTHORIZATION"
  | "DEAUTHORIZED"
  | "REJECTED"
  | (string & {});
export interface DescribeDataSharesForProducerMessage {
  ProducerArn?: string;
  Status?: DataShareStatusForProducer;
  MaxRecords?: number;
  Marker?: string;
}
export interface DescribeDataSharesForProducerResult {
  DataShares?: DataShare[];
  Marker?: string;
}
export interface DescribeDefaultClusterParametersMessage {
  ParameterGroupFamily?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface DefaultClusterParameters {
  ParameterGroupFamily?: string;
  Marker?: string;
  Parameters?: Parameter[];
}
export interface DescribeDefaultClusterParametersResult {
  DefaultClusterParameters?: DefaultClusterParameters;
}
export interface DescribeEndpointAccessMessage {
  ClusterIdentifier?: string;
  ResourceOwner?: string;
  EndpointName?: string;
  VpcId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type EndpointAccesses = EndpointAccess[];
export interface EndpointAccessList {
  EndpointAccessList?: EndpointAccess[];
  Marker?: string;
}
export interface DescribeEndpointAuthorizationMessage {
  ClusterIdentifier?: string;
  Account?: string;
  Grantee?: boolean;
  MaxRecords?: number;
  Marker?: string;
}
export type EndpointAuthorizations = EndpointAuthorization[];
export interface EndpointAuthorizationList {
  EndpointAuthorizationList?: EndpointAuthorization[];
  Marker?: string;
}
export interface DescribeEventCategoriesMessage {
  SourceType?: string;
}
export interface EventInfoMap {
  EventId?: string;
  EventCategories?: string[];
  EventDescription?: string;
  Severity?: string;
}
export type EventInfoMapList = EventInfoMap[];
export interface EventCategoriesMap {
  SourceType?: string;
  Events?: EventInfoMap[];
}
export type EventCategoriesMapList = EventCategoriesMap[];
export interface EventCategoriesMessage {
  EventCategoriesMapList?: EventCategoriesMap[];
}
export type SourceType =
  | "cluster"
  | "cluster-parameter-group"
  | "cluster-security-group"
  | "cluster-snapshot"
  | "scheduled-action"
  | (string & {});
export interface DescribeEventsMessage {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  MaxRecords?: number;
  Marker?: string;
}
export interface Event {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  Message?: string;
  EventCategories?: string[];
  Severity?: string;
  Date?: Date;
  EventId?: string;
}
export type EventList = Event[];
export interface EventsMessage {
  Marker?: string;
  Events?: Event[];
}
export interface DescribeEventSubscriptionsMessage {
  SubscriptionName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type EventSubscriptionsList = EventSubscription[];
export interface EventSubscriptionsMessage {
  Marker?: string;
  EventSubscriptionsList?: EventSubscription[];
}
export interface DescribeHsmClientCertificatesMessage {
  HsmClientCertificateIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type HsmClientCertificateList = HsmClientCertificate[];
export interface HsmClientCertificateMessage {
  Marker?: string;
  HsmClientCertificates?: HsmClientCertificate[];
}
export interface DescribeHsmConfigurationsMessage {
  HsmConfigurationIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type HsmConfigurationList = HsmConfiguration[];
export interface HsmConfigurationMessage {
  Marker?: string;
  HsmConfigurations?: HsmConfiguration[];
}
export type InboundIntegrationArn = string;
export interface DescribeInboundIntegrationsMessage {
  IntegrationArn?: string;
  TargetArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface InboundIntegration {
  IntegrationArn?: string;
  SourceArn?: string;
  TargetArn?: string;
  Status?: ZeroETLIntegrationStatus;
  Errors?: IntegrationError[];
  CreateTime?: Date;
}
export type InboundIntegrationList = InboundIntegration[];
export interface InboundIntegrationsMessage {
  Marker?: string;
  InboundIntegrations?: (InboundIntegration & {
    Errors: (IntegrationError & { ErrorCode: string })[];
  })[];
}
export type DescribeIntegrationsFilterName =
  | "integration-arn"
  | "source-arn"
  | "source-types"
  | "status"
  | (string & {});
export type DescribeIntegrationsFilterValueList = string[];
export interface DescribeIntegrationsFilter {
  Name?: DescribeIntegrationsFilterName;
  Values?: string[];
}
export type DescribeIntegrationsFilterList = DescribeIntegrationsFilter[];
export interface DescribeIntegrationsMessage {
  IntegrationArn?: string;
  MaxRecords?: number;
  Marker?: string;
  Filters?: DescribeIntegrationsFilter[];
}
export type IntegrationList = Integration[];
export interface IntegrationsMessage {
  Marker?: string;
  Integrations?: (Integration & { Errors: (IntegrationError & { ErrorCode: string })[] })[];
}
export interface DescribeLoggingStatusMessage {
  ClusterIdentifier?: string;
}
export type S3KeyPrefixValue = string;
export type LogDestinationType = "s3" | "cloudwatch" | "s3table" | (string & {});
export interface LoggingStatus {
  LoggingEnabled?: boolean;
  BucketName?: string;
  S3KeyPrefix?: string;
  LastSuccessfulDeliveryTime?: Date;
  LastFailureTime?: Date;
  LastFailureMessage?: string;
  LogDestinationType?: LogDestinationType;
  LogExports?: string[];
  S3Tables?: S3TablePublishStatus;
}
export type ActionType =
  | "restore-cluster"
  | "recommend-node-config"
  | "resize-cluster"
  | (string & {});
export type NodeConfigurationOptionsFilterName =
  | "NodeType"
  | "NumberOfNodes"
  | "EstimatedDiskUtilizationPercent"
  | "Mode"
  | (string & {});
export type OperatorType = "eq" | "lt" | "gt" | "le" | "ge" | "in" | "between" | (string & {});
export interface NodeConfigurationOptionsFilter {
  Name?: NodeConfigurationOptionsFilterName;
  Operator?: OperatorType;
  Values?: string[];
}
export type NodeConfigurationOptionsFilterList = NodeConfigurationOptionsFilter[];
export interface DescribeNodeConfigurationOptionsMessage {
  ActionType?: ActionType;
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  OwnerAccount?: string;
  Filters?: NodeConfigurationOptionsFilter[];
  Marker?: string;
  MaxRecords?: number;
}
export type Mode = "standard" | "high-performance" | (string & {});
export interface NodeConfigurationOption {
  NodeType?: string;
  NumberOfNodes?: number;
  EstimatedDiskUtilizationPercent?: number;
  Mode?: Mode;
}
export type NodeConfigurationOptionList = NodeConfigurationOption[];
export interface NodeConfigurationOptionsMessage {
  NodeConfigurationOptionList?: NodeConfigurationOption[];
  Marker?: string;
}
export interface DescribeOrderableClusterOptionsMessage {
  ClusterVersion?: string;
  NodeType?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type AvailabilityZoneList = AvailabilityZone[];
export interface OrderableClusterOption {
  ClusterVersion?: string;
  ClusterType?: string;
  NodeType?: string;
  AvailabilityZones?: AvailabilityZone[];
}
export type OrderableClusterOptionsList = OrderableClusterOption[];
export interface OrderableClusterOptionsMessage {
  OrderableClusterOptions?: OrderableClusterOption[];
  Marker?: string;
}
export interface DescribePartnersInputMessage {
  AccountId?: string;
  ClusterIdentifier?: string;
  DatabaseName?: string;
  PartnerName?: string;
}
export type PartnerIntegrationStatus =
  | "Active"
  | "Inactive"
  | "RuntimeFailure"
  | "ConnectionFailure"
  | (string & {});
export type PartnerIntegrationStatusMessage = string;
export interface PartnerIntegrationInfo {
  DatabaseName?: string;
  PartnerName?: string;
  Status?: PartnerIntegrationStatus;
  StatusMessage?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type PartnerIntegrationInfoList = PartnerIntegrationInfo[];
export interface DescribePartnersOutputMessage {
  PartnerIntegrationInfoList?: PartnerIntegrationInfo[];
}
export interface DescribeQev2IdcApplicationsMessage {
  Qev2IdcApplicationArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type Qev2IdcApplicationList = Qev2IdcApplication[];
export interface DescribeQev2IdcApplicationsResult {
  Qev2IdcApplications?: Qev2IdcApplication[];
  Marker?: string;
}
export interface DescribeRedshiftIdcApplicationsMessage {
  RedshiftIdcApplicationArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type RedshiftIdcApplicationList = RedshiftIdcApplication[];
export interface DescribeRedshiftIdcApplicationsResult {
  RedshiftIdcApplications?: RedshiftIdcApplication[];
  Marker?: string;
}
export interface DescribeReservedNodeExchangeStatusInputMessage {
  ReservedNodeId?: string;
  ReservedNodeExchangeRequestId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type ReservedNodeExchangeStatusList = ReservedNodeExchangeStatus[];
export interface DescribeReservedNodeExchangeStatusOutputMessage {
  ReservedNodeExchangeStatusDetails?: ReservedNodeExchangeStatus[];
  Marker?: string;
}
export interface DescribeReservedNodeOfferingsMessage {
  ReservedNodeOfferingId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface ReservedNodeOffering {
  ReservedNodeOfferingId?: string;
  NodeType?: string;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  OfferingType?: string;
  RecurringCharges?: RecurringCharge[];
  ReservedNodeOfferingType?: ReservedNodeOfferingType;
}
export type ReservedNodeOfferingList = ReservedNodeOffering[];
export interface ReservedNodeOfferingsMessage {
  Marker?: string;
  ReservedNodeOfferings?: ReservedNodeOffering[];
}
export interface DescribeReservedNodesMessage {
  ReservedNodeId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type ReservedNodeList = ReservedNode[];
export interface ReservedNodesMessage {
  Marker?: string;
  ReservedNodes?: ReservedNode[];
}
export interface DescribeResizeMessage {
  ClusterIdentifier?: string;
}
export type ScheduledActionTypeValues =
  | "ResizeCluster"
  | "PauseCluster"
  | "ResumeCluster"
  | (string & {});
export type ScheduledActionFilterName = "cluster-identifier" | "iam-role" | (string & {});
export interface ScheduledActionFilter {
  Name?: ScheduledActionFilterName;
  Values?: string[];
}
export type ScheduledActionFilterList = ScheduledActionFilter[];
export interface DescribeScheduledActionsMessage {
  ScheduledActionName?: string;
  TargetActionType?: ScheduledActionTypeValues;
  StartTime?: Date;
  EndTime?: Date;
  Active?: boolean;
  Filters?: ScheduledActionFilter[];
  Marker?: string;
  MaxRecords?: number;
}
export type ScheduledActionList = ScheduledAction[];
export interface ScheduledActionsMessage {
  Marker?: string;
  ScheduledActions?: (ScheduledAction & {
    TargetAction: ScheduledActionType & {
      ResizeCluster: ResizeClusterMessage & { ClusterIdentifier: string };
      PauseCluster: PauseClusterMessage & { ClusterIdentifier: string };
      ResumeCluster: ResumeClusterMessage & { ClusterIdentifier: string };
    };
  })[];
}
export interface DescribeSnapshotCopyGrantsMessage {
  SnapshotCopyGrantName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type SnapshotCopyGrantList = SnapshotCopyGrant[];
export interface SnapshotCopyGrantMessage {
  Marker?: string;
  SnapshotCopyGrants?: SnapshotCopyGrant[];
}
export interface DescribeSnapshotSchedulesMessage {
  ClusterIdentifier?: string;
  ScheduleIdentifier?: string;
  TagKeys?: string[];
  TagValues?: string[];
  Marker?: string;
  MaxRecords?: number;
}
export type SnapshotScheduleList = SnapshotSchedule[];
export interface DescribeSnapshotSchedulesOutputMessage {
  SnapshotSchedules?: SnapshotSchedule[];
  Marker?: string;
}
export interface DescribeStorageRequest {}
export interface CustomerStorageMessage {
  TotalBackupSizeInMegaBytes?: number;
  TotalProvisionedStorageInMegaBytes?: number;
}
export interface DescribeTableRestoreStatusMessage {
  ClusterIdentifier?: string;
  TableRestoreRequestId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type TableRestoreStatusType =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export interface TableRestoreStatus {
  TableRestoreRequestId?: string;
  Status?: TableRestoreStatusType;
  Message?: string;
  RequestTime?: Date;
  ProgressInMegaBytes?: number;
  TotalDataInMegaBytes?: number;
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SourceDatabaseName?: string;
  SourceSchemaName?: string;
  SourceTableName?: string;
  TargetDatabaseName?: string;
  TargetSchemaName?: string;
  NewTableName?: string;
}
export type TableRestoreStatusList = TableRestoreStatus[];
export interface TableRestoreStatusMessage {
  TableRestoreStatusDetails?: TableRestoreStatus[];
  Marker?: string;
}
export interface DescribeTagsMessage {
  ResourceName?: string;
  ResourceType?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export interface TaggedResource {
  Tag?: Tag;
  ResourceName?: string;
  ResourceType?: string;
}
export type TaggedResourceList = TaggedResource[];
export interface TaggedResourceListMessage {
  TaggedResources?: TaggedResource[];
  Marker?: string;
}
export interface DescribeUsageLimitsMessage {
  UsageLimitId?: string;
  ClusterIdentifier?: string;
  FeatureType?: UsageLimitFeatureType;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type UsageLimits = UsageLimit[];
export interface UsageLimitList {
  UsageLimits?: UsageLimit[];
  Marker?: string;
}
export interface DisableLoggingMessage {
  ClusterIdentifier?: string;
  LogDestinationType?: LogDestinationType;
  LogExports?: string[];
}
export interface DisableSnapshotCopyMessage {
  ClusterIdentifier?: string;
}
export interface DisableSnapshotCopyResult {
  Cluster?: Cluster;
}
export interface DisassociateDataShareConsumerMessage {
  DataShareArn?: string;
  DisassociateEntireAccount?: boolean;
  ConsumerArn?: string;
  ConsumerRegion?: string;
}
export interface EnableLoggingMessage {
  ClusterIdentifier?: string;
  BucketName?: string;
  S3KeyPrefix?: string;
  LogDestinationType?: LogDestinationType;
  LogExports?: string[];
  S3TableKmsKeyId?: string;
  S3TableGranularity?: string;
}
export interface EnableSnapshotCopyMessage {
  ClusterIdentifier?: string;
  DestinationRegion?: string;
  RetentionPeriod?: number;
  SnapshotCopyGrantName?: string;
  ManualSnapshotRetentionPeriod?: number;
}
export interface EnableSnapshotCopyResult {
  Cluster?: Cluster;
}
export interface FailoverPrimaryComputeInputMessage {
  ClusterIdentifier?: string;
}
export interface FailoverPrimaryComputeResult {
  Cluster?: Cluster;
}
export type DbGroupList = string[];
export interface GetClusterCredentialsMessage {
  DbUser?: string;
  DbName?: string;
  ClusterIdentifier?: string;
  DurationSeconds?: number;
  AutoCreate?: boolean;
  DbGroups?: string[];
  CustomDomainName?: string;
}
export interface ClusterCredentials {
  DbUser?: string;
  DbPassword?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export interface GetClusterCredentialsWithIAMMessage {
  DbName?: string;
  ClusterIdentifier?: string;
  DurationSeconds?: number;
  CustomDomainName?: string;
}
export interface ClusterExtendedCredentials {
  DbUser?: string;
  DbPassword?: string | redacted.Redacted<string>;
  Expiration?: Date;
  NextRefreshTime?: Date;
}
export type ClusterIdentifierList = string[];
export interface GetIdentityCenterAuthTokenRequest {
  ClusterIds?: string[];
}
export interface GetIdentityCenterAuthTokenResponse {
  Token?: string | redacted.Redacted<string>;
  ExpirationTime?: Date;
}
export type ReservedNodeExchangeActionType = "restore-cluster" | "resize-cluster" | (string & {});
export interface GetReservedNodeExchangeConfigurationOptionsInputMessage {
  ActionType?: ReservedNodeExchangeActionType;
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface ReservedNodeConfigurationOption {
  SourceReservedNode?: ReservedNode;
  TargetReservedNodeCount?: number;
  TargetReservedNodeOffering?: ReservedNodeOffering;
}
export type ReservedNodeConfigurationOptionList = ReservedNodeConfigurationOption[];
export interface GetReservedNodeExchangeConfigurationOptionsOutputMessage {
  Marker?: string;
  ReservedNodeConfigurationOptionList?: ReservedNodeConfigurationOption[];
}
export interface GetReservedNodeExchangeOfferingsInputMessage {
  ReservedNodeId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface GetReservedNodeExchangeOfferingsOutputMessage {
  Marker?: string;
  ReservedNodeOfferings?: ReservedNodeOffering[];
}
export interface GetResourcePolicyMessage {
  ResourceArn?: string;
}
export interface ResourcePolicy {
  ResourceArn?: string;
  Policy?: string;
}
export interface GetResourcePolicyResult {
  ResourcePolicy?: ResourcePolicy;
}
export interface ListRecommendationsMessage {
  ClusterIdentifier?: string;
  NamespaceArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type ImpactRankingType = "HIGH" | "MEDIUM" | "LOW" | (string & {});
export type RecommendedActionType = "SQL" | "CLI" | (string & {});
export interface RecommendedAction {
  Text?: string;
  Database?: string;
  Command?: string;
  Type?: RecommendedActionType;
}
export type RecommendedActionList = RecommendedAction[];
export interface ReferenceLink {
  Text?: string;
  Link?: string;
}
export type ReferenceLinkList = ReferenceLink[];
export interface Recommendation {
  Id?: string;
  ClusterIdentifier?: string;
  NamespaceArn?: string;
  CreatedAt?: Date;
  RecommendationType?: string;
  Title?: string;
  Description?: string;
  Observation?: string;
  ImpactRanking?: ImpactRankingType;
  RecommendationText?: string;
  RecommendedActions?: RecommendedAction[];
  ReferenceLinks?: ReferenceLink[];
}
export type RecommendationList = Recommendation[];
export interface ListRecommendationsResult {
  Recommendations?: Recommendation[];
  Marker?: string;
}
export interface ModifyAquaInputMessage {
  ClusterIdentifier?: string;
  AquaConfigurationStatus?: AquaConfigurationStatus;
}
export interface ModifyAquaOutputMessage {
  AquaConfiguration?: AquaConfiguration;
}
export interface ModifyAuthenticationProfileMessage {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export interface ModifyAuthenticationProfileResult {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export interface ModifyClusterMessage {
  ClusterIdentifier?: string;
  ClusterType?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  ClusterSecurityGroups?: string[];
  VpcSecurityGroupIds?: string[];
  MasterUserPassword?: string | redacted.Redacted<string>;
  ClusterParameterGroupName?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  PreferredMaintenanceWindow?: string;
  ClusterVersion?: string;
  AllowVersionUpgrade?: boolean;
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  NewClusterIdentifier?: string;
  PubliclyAccessible?: boolean;
  ElasticIp?: string;
  EnhancedVpcRouting?: boolean;
  MaintenanceTrackName?: string;
  Encrypted?: boolean;
  KmsKeyId?: string;
  AvailabilityZoneRelocation?: boolean;
  AvailabilityZone?: string;
  Port?: number;
  ManageMasterPassword?: boolean;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: boolean;
  ExtraComputeForAutomaticOptimization?: boolean;
}
export interface ModifyClusterResult {
  Cluster?: Cluster;
}
export interface ModifyClusterDbRevisionMessage {
  ClusterIdentifier?: string;
  RevisionTarget?: string;
}
export interface ModifyClusterDbRevisionResult {
  Cluster?: Cluster;
}
export interface ModifyClusterIamRolesMessage {
  ClusterIdentifier?: string;
  AddIamRoles?: string[];
  RemoveIamRoles?: string[];
  DefaultIamRoleArn?: string;
}
export interface ModifyClusterIamRolesResult {
  Cluster?: Cluster;
}
export interface ModifyClusterMaintenanceMessage {
  ClusterIdentifier?: string;
  DeferMaintenance?: boolean;
  DeferMaintenanceIdentifier?: string;
  DeferMaintenanceStartTime?: Date;
  DeferMaintenanceEndTime?: Date;
  DeferMaintenanceDuration?: number;
}
export interface ModifyClusterMaintenanceResult {
  Cluster?: Cluster;
}
export interface ModifyClusterParameterGroupMessage {
  ParameterGroupName?: string;
  Parameters?: Parameter[];
}
export interface ClusterParameterGroupNameMessage {
  ParameterGroupName?: string;
  ParameterGroupStatus?: string;
}
export interface ModifyClusterSnapshotMessage {
  SnapshotIdentifier?: string;
  ManualSnapshotRetentionPeriod?: number;
  Force?: boolean;
}
export interface ModifyClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export interface ModifyClusterSnapshotScheduleMessage {
  ClusterIdentifier?: string;
  ScheduleIdentifier?: string;
  DisassociateSchedule?: boolean;
}
export interface ModifyClusterSnapshotScheduleResponse {}
export interface ModifyClusterSubnetGroupMessage {
  ClusterSubnetGroupName?: string;
  Description?: string;
  SubnetIds?: string[];
}
export interface ModifyClusterSubnetGroupResult {
  ClusterSubnetGroup?: ClusterSubnetGroup;
}
export interface ModifyCustomDomainAssociationMessage {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
}
export interface ModifyCustomDomainAssociationResult {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
  CustomDomainCertExpiryTime?: string;
}
export interface ModifyEndpointAccessMessage {
  EndpointName?: string;
  VpcSecurityGroupIds?: string[];
}
export interface ModifyEventSubscriptionMessage {
  SubscriptionName?: string;
  SnsTopicArn?: string;
  SourceType?: string;
  SourceIds?: string[];
  EventCategories?: string[];
  Severity?: string;
  Enabled?: boolean;
}
export interface ModifyEventSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export interface ModifyIntegrationMessage {
  IntegrationArn?: string;
  Description?: string;
  IntegrationName?: string;
}
export type LakehouseRegistration = "Register" | "Deregister" | (string & {});
export type LakehouseIdcRegistration = "Associate" | "Disassociate" | (string & {});
export interface ModifyLakehouseConfigurationMessage {
  ClusterIdentifier?: string;
  LakehouseRegistration?: LakehouseRegistration;
  CatalogName?: string;
  LakehouseIdcRegistration?: LakehouseIdcRegistration;
  LakehouseIdcApplicationArn?: string;
  DryRun?: boolean;
}
export interface LakehouseConfiguration {
  ClusterIdentifier?: string;
  LakehouseIdcApplicationArn?: string;
  LakehouseRegistrationStatus?: string;
  CatalogArn?: string;
}
export interface ModifyQev2IdcApplicationMessage {
  Qev2IdcApplicationArn?: string;
  IdcDisplayName?: string;
}
export interface ModifyQev2IdcApplicationResult {
  Qev2IdcApplication?: Qev2IdcApplication;
}
export interface ModifyRedshiftIdcApplicationMessage {
  RedshiftIdcApplicationArn?: string;
  IdentityNamespace?: string;
  IamRoleArn?: string;
  IdcDisplayName?: string;
  AuthorizedTokenIssuerList?: AuthorizedTokenIssuer[];
  ServiceIntegrations?: ServiceIntegrationsUnion[];
}
export interface ModifyRedshiftIdcApplicationResult {
  RedshiftIdcApplication?: RedshiftIdcApplication;
}
export interface ModifyScheduledActionMessage {
  ScheduledActionName?: string;
  TargetAction?: ScheduledActionType;
  Schedule?: string;
  IamRole?: string;
  ScheduledActionDescription?: string;
  StartTime?: Date;
  EndTime?: Date;
  Enable?: boolean;
}
export interface ModifySnapshotCopyRetentionPeriodMessage {
  ClusterIdentifier?: string;
  RetentionPeriod?: number;
  Manual?: boolean;
}
export interface ModifySnapshotCopyRetentionPeriodResult {
  Cluster?: Cluster;
}
export interface ModifySnapshotScheduleMessage {
  ScheduleIdentifier?: string;
  ScheduleDefinitions?: string[];
}
export interface ModifyUsageLimitMessage {
  UsageLimitId?: string;
  Amount?: number;
  BreachAction?: UsageLimitBreachAction;
}
export interface PauseClusterResult {
  Cluster?: Cluster;
}
export interface PurchaseReservedNodeOfferingMessage {
  ReservedNodeOfferingId?: string;
  NodeCount?: number;
}
export interface PurchaseReservedNodeOfferingResult {
  ReservedNode?: ReservedNode;
}
export interface PutResourcePolicyMessage {
  ResourceArn?: string;
  Policy?: string;
}
export interface PutResourcePolicyResult {
  ResourcePolicy?: ResourcePolicy;
}
export interface RebootClusterMessage {
  ClusterIdentifier?: string;
}
export interface RebootClusterResult {
  Cluster?: Cluster;
}
export interface RegisterNamespaceInputMessage {
  NamespaceIdentifier?: NamespaceIdentifierUnion;
  ConsumerIdentifiers?: string[];
}
export interface RegisterNamespaceOutputMessage {
  Status?: NamespaceRegistrationStatus;
}
export interface RejectDataShareMessage {
  DataShareArn?: string;
}
export interface ResetClusterParameterGroupMessage {
  ParameterGroupName?: string;
  ResetAllParameters?: boolean;
  Parameters?: Parameter[];
}
export interface ResizeClusterResult {
  Cluster?: Cluster;
}
export interface RestoreFromClusterSnapshotMessage {
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotClusterIdentifier?: string;
  Port?: number;
  AvailabilityZone?: string;
  AllowVersionUpgrade?: boolean;
  ClusterSubnetGroupName?: string;
  PubliclyAccessible?: boolean;
  OwnerAccount?: string;
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  ElasticIp?: string;
  ClusterParameterGroupName?: string;
  ClusterSecurityGroups?: string[];
  VpcSecurityGroupIds?: string[];
  PreferredMaintenanceWindow?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  KmsKeyId?: string;
  NodeType?: string;
  EnhancedVpcRouting?: boolean;
  AdditionalInfo?: string;
  IamRoles?: string[];
  MaintenanceTrackName?: string;
  SnapshotScheduleIdentifier?: string;
  NumberOfNodes?: number;
  AvailabilityZoneRelocation?: boolean;
  AquaConfigurationStatus?: AquaConfigurationStatus;
  DefaultIamRoleArn?: string;
  ReservedNodeId?: string;
  TargetReservedNodeOfferingId?: string;
  Encrypted?: boolean;
  ManageMasterPassword?: boolean;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: boolean;
  CatalogName?: string;
  RedshiftIdcApplicationArn?: string;
}
export interface RestoreFromClusterSnapshotResult {
  Cluster?: Cluster;
}
export interface RestoreTableFromClusterSnapshotMessage {
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SourceDatabaseName?: string;
  SourceSchemaName?: string;
  SourceTableName?: string;
  TargetDatabaseName?: string;
  TargetSchemaName?: string;
  NewTableName?: string;
  EnableCaseSensitiveIdentifier?: boolean;
}
export interface RestoreTableFromClusterSnapshotResult {
  TableRestoreStatus?: TableRestoreStatus;
}
export interface ResumeClusterResult {
  Cluster?: Cluster;
}
export interface RevokeClusterSecurityGroupIngressMessage {
  ClusterSecurityGroupName?: string;
  CIDRIP?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export interface RevokeClusterSecurityGroupIngressResult {
  ClusterSecurityGroup?: ClusterSecurityGroup;
}
export interface RevokeEndpointAccessMessage {
  ClusterIdentifier?: string;
  Account?: string;
  VpcIds?: string[];
  Force?: boolean;
}
export interface RevokeSnapshotAccessMessage {
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotClusterIdentifier?: string;
  AccountWithRestoreAccess?: string;
}
export interface RevokeSnapshotAccessResult {
  Snapshot?: Snapshot;
}
export interface RotateEncryptionKeyMessage {
  ClusterIdentifier?: string;
}
export interface RotateEncryptionKeyResult {
  Cluster?: Cluster;
}
export interface UpdatePartnerStatusInputMessage {
  AccountId?: string;
  ClusterIdentifier?: string;
  DatabaseName?: string;
  PartnerName?: string;
  Status?: PartnerIntegrationStatus;
  StatusMessage?: string;
}
export type ExceptionMessage = string;
export type AcceptReservedNodeExchangeError =
  | DependentServiceUnavailableFault
  | InvalidReservedNodeStateFault
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Exchanges a DC1 Reserved Node for a DC2 Reserved Node with no changes to the
 * configuration (term, payment type, or number of nodes) and no additional costs.
 */
export const acceptReservedNodeExchange: API.OperationMethod<
  AcceptReservedNodeExchangeInputMessage,
  AcceptReservedNodeExchangeOutputMessage,
  AcceptReservedNodeExchangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AcceptReservedNodeExchangeInputMessage>,
  output: __S(1, __c0, 1) as any as S.Schema<AcceptReservedNodeExchangeOutputMessage>,
  errors: [
    DependentServiceUnavailableFault,
    InvalidReservedNodeStateFault,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptReservedNodeExchange",
}));

export type AddPartnerError =
  | ClusterNotFoundFault
  | PartnerNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Adds a partner integration to a cluster.
 * This operation authorizes a partner to push status updates for the specified database.
 * To complete the integration, you also set up the integration on the partner website.
 */
export const addPartner: API.OperationMethod<
  PartnerIntegrationInputMessage,
  PartnerIntegrationOutputMessage,
  AddPartnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<PartnerIntegrationInputMessage>,
  output: __S(160, __c5, 0) as any as S.Schema<PartnerIntegrationOutputMessage>,
  errors: [
    ClusterNotFoundFault,
    PartnerNotFoundFault,
    UnauthorizedPartnerIntegrationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddPartner",
}));

export type AssociateDataShareConsumerError =
  | InvalidDataShareFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * From a datashare consumer account, associates a datashare with the
 * account (AssociateEntireAccount) or the specified namespace (ConsumerArn). If you make this association, the consumer
 * can consume the datashare.
 */
export const associateDataShareConsumer: API.OperationMethod<
  AssociateDataShareConsumerMessage,
  DataShare,
  AssociateDataShareConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<AssociateDataShareConsumerMessage>,
  output: __S(226, __c7, 2) as any as S.Schema<DataShare>,
  errors: [InvalidDataShareFault, InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDataShareConsumer",
}));

export type AuthorizeClusterSecurityGroupIngressError =
  | AuthorizationAlreadyExistsFault
  | AuthorizationQuotaExceededFault
  | ClusterSecurityGroupNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | CommonErrors;
/**
 * Adds an inbound (ingress) rule to an Amazon Redshift security group. Depending on whether
 * the application accessing your cluster is running on the Internet or an Amazon EC2
 * instance, you can authorize inbound access to either a Classless Interdomain Routing
 * (CIDR)/Internet Protocol (IP) range or to an Amazon EC2 security group. You can add as
 * many as 20 ingress rules to an Amazon Redshift security group.
 *
 * If you authorize access to an Amazon EC2 security group, specify
 * *EC2SecurityGroupName* and
 * *EC2SecurityGroupOwnerId*. The Amazon EC2 security group and
 * Amazon Redshift cluster must be in the same Amazon Web Services Region.
 *
 * If you authorize access to a CIDR/IP address range, specify
 * *CIDRIP*. For an overview of CIDR blocks, see the Wikipedia
 * article on Classless Inter-Domain Routing.
 *
 * You must also associate the security group with a cluster so that clients running
 * on these IP addresses or the EC2 instance are authorized to connect to the cluster. For
 * information about managing security groups, go to Working with Security
 * Groups in the *Amazon Redshift Cluster Management Guide*.
 */
export const authorizeClusterSecurityGroupIngress: API.OperationMethod<
  AuthorizeClusterSecurityGroupIngressMessage,
  AuthorizeClusterSecurityGroupIngressResult,
  AuthorizeClusterSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<AuthorizeClusterSecurityGroupIngressMessage>,
  output: __S(257, __c8, 1) as any as S.Schema<AuthorizeClusterSecurityGroupIngressResult>,
  errors: [
    AuthorizationAlreadyExistsFault,
    AuthorizationQuotaExceededFault,
    ClusterSecurityGroupNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeClusterSecurityGroupIngress",
}));

export type AuthorizeDataShareError = InvalidDataShareFault | CommonErrors;
/**
 * From a data producer account, authorizes the sharing of a datashare with one or more
 * consumer accounts or managing entities. To authorize a datashare for a data consumer,
 * the producer account must have the correct access permissions.
 */
export const authorizeDataShare: API.OperationMethod<
  AuthorizeDataShareMessage,
  DataShare,
  AuthorizeDataShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<AuthorizeDataShareMessage>,
  output: __S(226, __c7, 2) as any as S.Schema<DataShare>,
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeDataShare",
}));

export type AuthorizeEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointAuthorizationAlreadyExistsFault
  | EndpointAuthorizationsPerClusterLimitExceededFault
  | InvalidAuthorizationStateFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Grants access to a cluster.
 */
export const authorizeEndpointAccess: API.OperationMethod<
  AuthorizeEndpointAccessMessage,
  EndpointAuthorization,
  AuthorizeEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<AuthorizeEndpointAccessMessage>,
  output: __S(449, __c14, 1) as any as S.Schema<EndpointAuthorization>,
  errors: [
    ClusterNotFoundFault,
    EndpointAuthorizationAlreadyExistsFault,
    EndpointAuthorizationsPerClusterLimitExceededFault,
    InvalidAuthorizationStateFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeEndpointAccess",
}));

export type AuthorizeSnapshotAccessError =
  | AuthorizationAlreadyExistsFault
  | AuthorizationQuotaExceededFault
  | ClusterSnapshotNotFoundFault
  | DependentServiceRequestThrottlingFault
  | InvalidClusterSnapshotStateFault
  | LimitExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Authorizes the specified Amazon Web Services account to restore the specified
 * snapshot.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const authorizeSnapshotAccess: API.OperationMethod<
  AuthorizeSnapshotAccessMessage,
  AuthorizeSnapshotAccessResult,
  AuthorizeSnapshotAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<AuthorizeSnapshotAccessMessage>,
  output: __S(481, __c15, 1) as any as S.Schema<AuthorizeSnapshotAccessResult>,
  errors: [
    AuthorizationAlreadyExistsFault,
    AuthorizationQuotaExceededFault,
    ClusterSnapshotNotFoundFault,
    DependentServiceRequestThrottlingFault,
    InvalidClusterSnapshotStateFault,
    LimitExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeSnapshotAccess",
}));

export type BatchDeleteClusterSnapshotsError = BatchDeleteRequestSizeExceededFault | CommonErrors;
/**
 * Deletes a set of cluster snapshots.
 */
export const batchDeleteClusterSnapshots: API.OperationMethod<
  BatchDeleteClusterSnapshotsRequest,
  BatchDeleteClusterSnapshotsResult,
  BatchDeleteClusterSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(545, __c17, 1) as any as S.Schema<BatchDeleteClusterSnapshotsRequest>,
  output: __S(547, __c17, 3) as any as S.Schema<BatchDeleteClusterSnapshotsResult>,
  errors: [BatchDeleteRequestSizeExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteClusterSnapshots",
}));

export type BatchModifyClusterSnapshotsError =
  | BatchModifyClusterSnapshotsLimitExceededFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Modifies the settings for a set of cluster snapshots.
 */
export const batchModifyClusterSnapshots: API.OperationMethod<
  BatchModifyClusterSnapshotsMessage,
  BatchModifyClusterSnapshotsOutputMessage,
  BatchModifyClusterSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<BatchModifyClusterSnapshotsMessage>,
  output: __S(642, __c20, 2) as any as S.Schema<BatchModifyClusterSnapshotsOutputMessage>,
  errors: [BatchModifyClusterSnapshotsLimitExceededFault, InvalidRetentionPeriodFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchModifyClusterSnapshots",
}));

export type CancelResizeError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | ResizeNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Cancels a resize operation for a cluster.
 */
export const cancelResize: API.OperationMethod<
  CancelResizeMessage,
  ResizeProgressMessage,
  CancelResizeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<CancelResizeMessage>,
  output: __S(707, __c22, 3) as any as S.Schema<ResizeProgressMessage>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    ResizeNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelResize",
}));

export type CopyClusterSnapshotError =
  | ClusterNotFoundFault
  | ClusterSnapshotAlreadyExistsFault
  | ClusterSnapshotNotFoundFault
  | ClusterSnapshotQuotaExceededFault
  | InvalidClusterSnapshotStateFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Copies the specified automated cluster snapshot to a new manual cluster snapshot.
 * The source must be an automated snapshot and it must be in the available
 * state.
 *
 * When you delete a cluster, Amazon Redshift deletes any automated snapshots of the
 * cluster. Also, when the retention period of the snapshot expires, Amazon Redshift
 * automatically deletes it. If you want to keep an automated snapshot for a longer period,
 * you can make a manual copy of the snapshot. Manual snapshots are retained until you
 * delete them.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const copyClusterSnapshot: API.OperationMethod<
  CopyClusterSnapshotMessage,
  CopyClusterSnapshotResult,
  CopyClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<CopyClusterSnapshotMessage>,
  output: __S(737, __c23, 1) as any as S.Schema<CopyClusterSnapshotResult>,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotAlreadyExistsFault,
    ClusterSnapshotNotFoundFault,
    ClusterSnapshotQuotaExceededFault,
    InvalidClusterSnapshotStateFault,
    InvalidRetentionPeriodFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyClusterSnapshot",
}));

export type CreateAuthenticationProfileError =
  | AuthenticationProfileAlreadyExistsFault
  | AuthenticationProfileQuotaExceededFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Creates an authentication profile with the specified parameters.
 */
export const createAuthenticationProfile: API.OperationMethod<
  CreateAuthenticationProfileMessage,
  CreateAuthenticationProfileResult,
  CreateAuthenticationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<CreateAuthenticationProfileMessage>,
  output: __S(769, __c24, 1) as any as S.Schema<CreateAuthenticationProfileResult>,
  errors: [
    AuthenticationProfileAlreadyExistsFault,
    AuthenticationProfileQuotaExceededFault,
    InvalidAuthenticationProfileRequestFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuthenticationProfile",
}));

export type CreateClusterError =
  | ClusterAlreadyExistsFault
  | ClusterParameterGroupNotFoundFault
  | ClusterQuotaExceededFault
  | ClusterSecurityGroupNotFoundFault
  | ClusterSubnetGroupNotFoundFault
  | DependentServiceAccessDeniedFault
  | DependentServiceRequestThrottlingFault
  | DependentServiceUnavailableFault
  | HsmClientCertificateNotFoundFault
  | HsmConfigurationNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterSubnetGroupStateFault
  | InvalidClusterTrackFault
  | InvalidElasticIpFault
  | InvalidRetentionPeriodFault
  | InvalidSubnet
  | InvalidTagFault
  | InvalidVPCNetworkStateFault
  | Ipv6CidrBlockNotFoundFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | RedshiftIdcApplicationNotExistsFault
  | SnapshotScheduleNotFoundFault
  | TagLimitExceededFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a new cluster with the specified parameters.
 *
 * To create a cluster in Virtual Private Cloud (VPC), you must provide a cluster
 * subnet group name. The cluster subnet group identifies the subnets of your VPC that
 * Amazon Redshift uses when creating the cluster.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 */
export const createCluster: API.OperationMethod<
  CreateClusterMessage,
  CreateClusterResult,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<CreateClusterMessage>,
  output: __S(801, __c25, 1) as any as S.Schema<CreateClusterResult>,
  errors: [
    ClusterAlreadyExistsFault,
    ClusterParameterGroupNotFoundFault,
    ClusterQuotaExceededFault,
    ClusterSecurityGroupNotFoundFault,
    ClusterSubnetGroupNotFoundFault,
    DependentServiceAccessDeniedFault,
    DependentServiceRequestThrottlingFault,
    DependentServiceUnavailableFault,
    HsmClientCertificateNotFoundFault,
    HsmConfigurationNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterSubnetGroupStateFault,
    InvalidClusterTrackFault,
    InvalidElasticIpFault,
    InvalidRetentionPeriodFault,
    InvalidSubnet,
    InvalidTagFault,
    InvalidVPCNetworkStateFault,
    Ipv6CidrBlockNotFoundFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    RedshiftIdcApplicationNotExistsFault,
    SnapshotScheduleNotFoundFault,
    TagLimitExceededFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateClusterParameterGroupError =
  | ClusterParameterGroupAlreadyExistsFault
  | ClusterParameterGroupQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift parameter group.
 *
 * Creating parameter groups is independent of creating clusters. You can associate a
 * cluster with a parameter group when you create the cluster. You can also associate an
 * existing cluster with a parameter group after the cluster is created by using ModifyCluster.
 *
 * Parameters in the parameter group define specific behavior that applies to the
 * databases you create on the cluster.
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterParameterGroup: API.OperationMethod<
  CreateClusterParameterGroupMessage,
  CreateClusterParameterGroupResult,
  CreateClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<CreateClusterParameterGroupMessage>,
  output: __S(1089, __c34, 1) as any as S.Schema<CreateClusterParameterGroupResult>,
  errors: [
    ClusterParameterGroupAlreadyExistsFault,
    ClusterParameterGroupQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterParameterGroup",
}));

export type CreateClusterSecurityGroupError =
  | ClusterSecurityGroupAlreadyExistsFault
  | ClusterSecurityGroupQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates a new Amazon Redshift security group. You use security groups to control access
 * to non-VPC clusters.
 *
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterSecurityGroup: API.OperationMethod<
  CreateClusterSecurityGroupMessage,
  CreateClusterSecurityGroupResult,
  CreateClusterSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<CreateClusterSecurityGroupMessage>,
  output: __S(1153, __c36, 1) as any as S.Schema<CreateClusterSecurityGroupResult>,
  errors: [
    ClusterSecurityGroupAlreadyExistsFault,
    ClusterSecurityGroupQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterSecurityGroup",
}));

export type CreateClusterSnapshotError =
  | ClusterNotFoundFault
  | ClusterSnapshotAlreadyExistsFault
  | ClusterSnapshotQuotaExceededFault
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates a manual snapshot of the specified cluster. The cluster must be in the
 * `available` state.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterSnapshot: API.OperationMethod<
  CreateClusterSnapshotMessage,
  CreateClusterSnapshotResult,
  CreateClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<CreateClusterSnapshotMessage>,
  output: __S(1185, __c37, 1) as any as S.Schema<CreateClusterSnapshotResult>,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotAlreadyExistsFault,
    ClusterSnapshotQuotaExceededFault,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterSnapshot",
}));

export type CreateClusterSubnetGroupError =
  | ClusterSubnetGroupAlreadyExistsFault
  | ClusterSubnetGroupQuotaExceededFault
  | ClusterSubnetQuotaExceededFault
  | DependentServiceRequestThrottlingFault
  | InvalidSubnet
  | InvalidTagFault
  | TagLimitExceededFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Creates a new Amazon Redshift subnet group. You must provide a list of one or more
 * subnets in your existing Amazon Virtual Private Cloud (Amazon VPC) when creating
 * Amazon Redshift subnet group.
 *
 * For information about subnet groups, go to
 * Amazon Redshift Cluster Subnet Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterSubnetGroup: API.OperationMethod<
  CreateClusterSubnetGroupMessage,
  CreateClusterSubnetGroupResult,
  CreateClusterSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<CreateClusterSubnetGroupMessage>,
  output: __S(1217, __c38, 1) as any as S.Schema<CreateClusterSubnetGroupResult>,
  errors: [
    ClusterSubnetGroupAlreadyExistsFault,
    ClusterSubnetGroupQuotaExceededFault,
    ClusterSubnetQuotaExceededFault,
    DependentServiceRequestThrottlingFault,
    InvalidSubnet,
    InvalidTagFault,
    TagLimitExceededFault,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterSubnetGroup",
}));

export type CreateCustomDomainAssociationError =
  | ClusterNotFoundFault
  | CustomCnameAssociationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Used to create a custom domain name for a cluster. Properties include the custom domain name, the
 * cluster the custom domain is associated with, and the certificate Amazon Resource Name (ARN).
 */
export const createCustomDomainAssociation: API.OperationMethod<
  CreateCustomDomainAssociationMessage,
  CreateCustomDomainAssociationResult,
  CreateCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<CreateCustomDomainAssociationMessage>,
  output: __S(1377, __c43, 1) as any as S.Schema<CreateCustomDomainAssociationResult>,
  errors: [ClusterNotFoundFault, CustomCnameAssociationFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomDomainAssociation",
}));

export type CreateEndpointAccessError =
  | AccessToClusterDeniedFault
  | ClusterNotFoundFault
  | ClusterSubnetGroupNotFoundFault
  | EndpointAlreadyExistsFault
  | EndpointsPerAuthorizationLimitExceededFault
  | EndpointsPerClusterLimitExceededFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a Redshift-managed VPC endpoint.
 */
export const createEndpointAccess: API.OperationMethod<
  CreateEndpointAccessMessage,
  EndpointAccess,
  CreateEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<CreateEndpointAccessMessage>,
  output: __S(1440, __c45, 0) as any as S.Schema<EndpointAccess>,
  errors: [
    AccessToClusterDeniedFault,
    ClusterNotFoundFault,
    ClusterSubnetGroupNotFoundFault,
    EndpointAlreadyExistsFault,
    EndpointsPerAuthorizationLimitExceededFault,
    EndpointsPerClusterLimitExceededFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpointAccess",
}));

export type CreateEventSubscriptionError =
  | EventSubscriptionQuotaExceededFault
  | InvalidTagFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | SNSTopicArnNotFoundFault
  | SourceNotFoundFault
  | SubscriptionAlreadyExistFault
  | SubscriptionCategoryNotFoundFault
  | SubscriptionEventIdNotFoundFault
  | SubscriptionSeverityNotFoundFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift event notification subscription. This action requires an ARN
 * (Amazon Resource Name) of an Amazon SNS topic created by either the Amazon Redshift console,
 * the Amazon SNS console, or the Amazon SNS API. To obtain an ARN with Amazon SNS, you
 * must create a topic in Amazon SNS and subscribe to the topic. The ARN is displayed in
 * the SNS console.
 *
 * You can specify the source type, and lists of Amazon Redshift source IDs, event
 * categories, and event severities. Notifications will be sent for all events you want
 * that match those criteria. For example, you can specify source type = cluster, source ID
 * = my-cluster-1 and mycluster2, event categories = Availability, Backup, and severity =
 * ERROR. The subscription will only send notifications for those ERROR events in the
 * Availability and Backup categories for the specified clusters.
 *
 * If you specify both the source type and source IDs, such as source type = cluster
 * and source identifier = my-cluster-1, notifications will be sent for all the cluster
 * events for my-cluster-1. If you specify a source type but do not specify a source
 * identifier, you will receive notice of the events for the objects of that type in your
 * Amazon Web Services account. If you do not specify either the SourceType nor the SourceIdentifier, you
 * will be notified of events generated from all Amazon Redshift sources belonging to your Amazon Web Services account. You must specify a source type if you specify a source ID.
 */
export const createEventSubscription: API.OperationMethod<
  CreateEventSubscriptionMessage,
  CreateEventSubscriptionResult,
  CreateEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<CreateEventSubscriptionMessage>,
  output: __S(1473, __c46, 1) as any as S.Schema<CreateEventSubscriptionResult>,
  errors: [
    EventSubscriptionQuotaExceededFault,
    InvalidTagFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
    SNSTopicArnNotFoundFault,
    SourceNotFoundFault,
    SubscriptionAlreadyExistFault,
    SubscriptionCategoryNotFoundFault,
    SubscriptionEventIdNotFoundFault,
    SubscriptionSeverityNotFoundFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventSubscription",
}));

export type CreateHsmClientCertificateError =
  | HsmClientCertificateAlreadyExistsFault
  | HsmClientCertificateQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an HSM client certificate that an Amazon Redshift cluster will use to connect to
 * the client's HSM in order to store and retrieve the keys used to encrypt the cluster
 * databases.
 *
 * The command returns a public key, which you must store in the HSM. In addition to
 * creating the HSM certificate, you must create an Amazon Redshift HSM configuration that
 * provides a cluster the information needed to store and use encryption keys in the HSM.
 * For more information, go to Hardware Security Modules
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createHsmClientCertificate: API.OperationMethod<
  CreateHsmClientCertificateMessage,
  CreateHsmClientCertificateResult,
  CreateHsmClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<CreateHsmClientCertificateMessage>,
  output: __S(1569, __c49, 1) as any as S.Schema<CreateHsmClientCertificateResult>,
  errors: [
    HsmClientCertificateAlreadyExistsFault,
    HsmClientCertificateQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHsmClientCertificate",
}));

export type CreateHsmConfigurationError =
  | HsmConfigurationAlreadyExistsFault
  | HsmConfigurationQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an HSM configuration that contains the information required by an Amazon Redshift
 * cluster to store and use database encryption keys in a Hardware Security Module (HSM).
 * After creating the HSM configuration, you can specify it as a parameter when creating a
 * cluster. The cluster will then store its encryption keys in the HSM.
 *
 * In addition to creating an HSM configuration, you must also create an HSM client
 * certificate. For more information, go to Hardware Security Modules
 * in the Amazon Redshift Cluster Management Guide.
 */
export const createHsmConfiguration: API.OperationMethod<
  CreateHsmConfigurationMessage,
  CreateHsmConfigurationResult,
  CreateHsmConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<CreateHsmConfigurationMessage>,
  output: __S(1633, __c51, 1) as any as S.Schema<CreateHsmConfigurationResult>,
  errors: [
    HsmConfigurationAlreadyExistsFault,
    HsmConfigurationQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHsmConfiguration",
}));

export type CreateIntegrationError =
  | IntegrationAlreadyExistsFault
  | IntegrationConflictOperationFault
  | IntegrationQuotaExceededFault
  | IntegrationSourceNotFoundFault
  | IntegrationTargetNotFoundFault
  | InvalidClusterStateFault
  | InvalidTagFault
  | TagLimitExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a zero-ETL integration or S3 event integration with Amazon Redshift.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationMessage,
  Integration,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<CreateIntegrationMessage>,
  output: __S(1761, __c55, 1) as any as S.Schema<Integration>,
  errors: [
    IntegrationAlreadyExistsFault,
    IntegrationConflictOperationFault,
    IntegrationQuotaExceededFault,
    IntegrationSourceNotFoundFault,
    IntegrationTargetNotFoundFault,
    InvalidClusterStateFault,
    InvalidTagFault,
    TagLimitExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegration",
}));

export type CreateQev2IdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationAlreadyExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift Query Editor (QEV2) IAM Identity Center application.
 */
export const createQev2IdcApplication: API.OperationMethod<
  CreateQev2IdcApplicationMessage,
  CreateQev2IdcApplicationResult,
  CreateQev2IdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<CreateQev2IdcApplicationMessage>,
  output: __S(1793, __c56, 1) as any as S.Schema<CreateQev2IdcApplicationResult>,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationAlreadyExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQev2IdcApplication",
}));

export type CreateRedshiftIdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | InvalidTagFault
  | RedshiftIdcApplicationAlreadyExistsFault
  | RedshiftIdcApplicationQuotaExceededFault
  | TagLimitExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift application for use with IAM Identity Center.
 */
export const createRedshiftIdcApplication: API.OperationMethod<
  CreateRedshiftIdcApplicationMessage,
  CreateRedshiftIdcApplicationResult,
  CreateRedshiftIdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<CreateRedshiftIdcApplicationMessage>,
  output: __S(1857, __c58, 1) as any as S.Schema<CreateRedshiftIdcApplicationResult>,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    InvalidTagFault,
    RedshiftIdcApplicationAlreadyExistsFault,
    RedshiftIdcApplicationQuotaExceededFault,
    TagLimitExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRedshiftIdcApplication",
}));

export type CreateScheduledActionError =
  | ClusterNotFoundFault
  | InvalidScheduledActionFault
  | InvalidScheduleFault
  | ScheduledActionAlreadyExistsFault
  | ScheduledActionQuotaExceededFault
  | ScheduledActionTypeUnsupportedFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a scheduled action. A scheduled action contains a schedule and an Amazon Redshift API action.
 * For example, you can create a schedule of when to run the `ResizeCluster` API operation.
 */
export const createScheduledAction: API.OperationMethod<
  CreateScheduledActionMessage,
  ScheduledAction,
  CreateScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<CreateScheduledActionMessage>,
  output: __S(1986, __c62, 2) as any as S.Schema<ScheduledAction>,
  errors: [
    ClusterNotFoundFault,
    InvalidScheduledActionFault,
    InvalidScheduleFault,
    ScheduledActionAlreadyExistsFault,
    ScheduledActionQuotaExceededFault,
    ScheduledActionTypeUnsupportedFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduledAction",
}));

export type CreateSnapshotCopyGrantError =
  | DependentServiceRequestThrottlingFault
  | InvalidTagFault
  | LimitExceededFault
  | SnapshotCopyGrantAlreadyExistsFault
  | SnapshotCopyGrantQuotaExceededFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates a snapshot copy grant that permits Amazon Redshift to use an encrypted symmetric key
 * from Key Management Service (KMS) to encrypt copied snapshots in a
 * destination region.
 *
 * For more information about managing snapshot copy grants, go to
 * Amazon Redshift Database Encryption
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createSnapshotCopyGrant: API.OperationMethod<
  CreateSnapshotCopyGrantMessage,
  CreateSnapshotCopyGrantResult,
  CreateSnapshotCopyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<CreateSnapshotCopyGrantMessage>,
  output: __S(2113, __c66, 1) as any as S.Schema<CreateSnapshotCopyGrantResult>,
  errors: [
    DependentServiceRequestThrottlingFault,
    InvalidTagFault,
    LimitExceededFault,
    SnapshotCopyGrantAlreadyExistsFault,
    SnapshotCopyGrantQuotaExceededFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshotCopyGrant",
}));

export type CreateSnapshotScheduleError =
  | InvalidScheduleFault
  | InvalidTagFault
  | ScheduleDefinitionTypeUnsupportedFault
  | SnapshotScheduleAlreadyExistsFault
  | SnapshotScheduleQuotaExceededFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Create a snapshot schedule that can be associated to a cluster and which overrides the default system backup schedule.
 */
export const createSnapshotSchedule: API.OperationMethod<
  CreateSnapshotScheduleMessage,
  SnapshotSchedule,
  CreateSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<CreateSnapshotScheduleMessage>,
  output: __S(2212, __c69, 4) as any as S.Schema<SnapshotSchedule>,
  errors: [
    InvalidScheduleFault,
    InvalidTagFault,
    ScheduleDefinitionTypeUnsupportedFault,
    SnapshotScheduleAlreadyExistsFault,
    SnapshotScheduleQuotaExceededFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshotSchedule",
}));

export type CreateTagsError =
  | InvalidClusterStateFault
  | InvalidTagFault
  | ResourceNotFoundFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Adds tags to a cluster.
 *
 * A resource can have up to 50 tags. If you try to create more than 50 tags for a
 * resource, you will receive an error and the attempt will fail.
 *
 * If you specify a key that already exists for the resource, the value for that key
 * will be updated with the new value.
 */
export const createTags: API.OperationMethod<
  CreateTagsMessage,
  CreateTagsResponse,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<CreateTagsMessage>,
  output: __S(2241, __c70, 1) as any as S.Schema<CreateTagsResponse>,
  errors: [InvalidClusterStateFault, InvalidTagFault, ResourceNotFoundFault, TagLimitExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
}));

export type CreateUsageLimitError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidUsageLimitFault
  | LimitExceededFault
  | TagLimitExceededFault
  | UnsupportedOperationFault
  | UsageLimitAlreadyExistsFault
  | CommonErrors;
/**
 * Creates a usage limit for a specified Amazon Redshift feature on a cluster.
 * The usage limit is identified by the returned usage limit identifier.
 */
export const createUsageLimit: API.OperationMethod<
  CreateUsageLimitMessage,
  UsageLimit,
  CreateUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<CreateUsageLimitMessage>,
  output: __S(2304, __c72, 0) as any as S.Schema<UsageLimit>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidUsageLimitFault,
    LimitExceededFault,
    TagLimitExceededFault,
    UnsupportedOperationFault,
    UsageLimitAlreadyExistsFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsageLimit",
}));

export type DeauthorizeDataShareError = InvalidDataShareFault | CommonErrors;
/**
 * From a datashare producer account, removes authorization from the specified datashare.
 */
export const deauthorizeDataShare: API.OperationMethod<
  DeauthorizeDataShareMessage,
  DataShare,
  DeauthorizeDataShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<DeauthorizeDataShareMessage>,
  output: __S(226, __c7, 2) as any as S.Schema<DataShare>,
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeauthorizeDataShare",
}));

export type DeleteAuthenticationProfileError =
  | AuthenticationProfileNotFoundFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Deletes an authentication profile.
 */
export const deleteAuthenticationProfile: API.OperationMethod<
  DeleteAuthenticationProfileMessage,
  DeleteAuthenticationProfileResult,
  DeleteAuthenticationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<DeleteAuthenticationProfileMessage>,
  output: __S(2369, __c74, 1) as any as S.Schema<DeleteAuthenticationProfileResult>,
  errors: [AuthenticationProfileNotFoundFault, InvalidAuthenticationProfileRequestFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuthenticationProfile",
}));

export type DeleteClusterError =
  | ClusterNotFoundFault
  | ClusterSnapshotAlreadyExistsFault
  | ClusterSnapshotQuotaExceededFault
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Deletes a previously provisioned cluster without its final snapshot being created. A successful response from the web
 * service indicates that the request was received correctly. Use DescribeClusters to monitor the status of the deletion. The delete
 * operation cannot be canceled or reverted once submitted.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * If you want to shut down the cluster and retain it for future use, set
 * *SkipFinalClusterSnapshot* to `false` and specify a
 * name for *FinalClusterSnapshotIdentifier*. You can later restore this
 * snapshot to resume using the cluster. If a final cluster snapshot is requested, the
 * status of the cluster will be "final-snapshot" while the snapshot is being taken, then
 * it's "deleting" once Amazon Redshift begins deleting the cluster.
 *
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterMessage,
  DeleteClusterResult,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<DeleteClusterMessage>,
  output: __S(2401, __c75, 1) as any as S.Schema<DeleteClusterResult>,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotAlreadyExistsFault,
    ClusterSnapshotQuotaExceededFault,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteClusterParameterGroupError =
  | ClusterParameterGroupNotFoundFault
  | InvalidClusterParameterGroupStateFault
  | CommonErrors;
/**
 * Deletes a specified Amazon Redshift parameter group.
 *
 * You cannot delete a parameter group if it is associated with a
 * cluster.
 */
export const deleteClusterParameterGroup: API.OperationMethod<
  DeleteClusterParameterGroupMessage,
  DeleteClusterParameterGroupResponse,
  DeleteClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<DeleteClusterParameterGroupMessage>,
  output: __S(2433, __c76, 1) as any as S.Schema<DeleteClusterParameterGroupResponse>,
  errors: [ClusterParameterGroupNotFoundFault, InvalidClusterParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterParameterGroup",
}));

export type DeleteClusterSecurityGroupError =
  | ClusterSecurityGroupNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift security group.
 *
 * You cannot delete a security group that is associated with any clusters. You
 * cannot delete the default security group.
 *
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const deleteClusterSecurityGroup: API.OperationMethod<
  DeleteClusterSecurityGroupMessage,
  DeleteClusterSecurityGroupResponse,
  DeleteClusterSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<DeleteClusterSecurityGroupMessage>,
  output: __S(2465, __c77, 1) as any as S.Schema<DeleteClusterSecurityGroupResponse>,
  errors: [ClusterSecurityGroupNotFoundFault, InvalidClusterSecurityGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterSecurityGroup",
}));

export type DeleteClusterSnapshotError =
  | ClusterSnapshotNotFoundFault
  | InvalidClusterSnapshotStateFault
  | CommonErrors;
/**
 * Deletes the specified manual snapshot. The snapshot must be in the
 * `available` state, with no other users authorized to access the snapshot.
 *
 * Unlike automated snapshots, manual snapshots are retained even after you delete
 * your cluster. Amazon Redshift does not delete your manual snapshots. You must delete manual
 * snapshot explicitly to avoid getting charged. If other accounts are authorized to access
 * the snapshot, you must revoke all of the authorizations before you can delete the
 * snapshot.
 */
export const deleteClusterSnapshot: API.OperationMethod<
  DeleteClusterSnapshotMessage,
  DeleteClusterSnapshotResult,
  DeleteClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<DeleteClusterSnapshotMessage>,
  output: __S(2496, __c78, 0) as any as S.Schema<DeleteClusterSnapshotResult>,
  errors: [ClusterSnapshotNotFoundFault, InvalidClusterSnapshotStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterSnapshot",
}));

export type DeleteClusterSubnetGroupError =
  | ClusterSubnetGroupNotFoundFault
  | InvalidClusterSubnetGroupStateFault
  | InvalidClusterSubnetStateFault
  | CommonErrors;
/**
 * Deletes the specified cluster subnet group.
 */
export const deleteClusterSubnetGroup: API.OperationMethod<
  DeleteClusterSubnetGroupMessage,
  DeleteClusterSubnetGroupResponse,
  DeleteClusterSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<DeleteClusterSubnetGroupMessage>,
  output: __S(2529, __c79, 1) as any as S.Schema<DeleteClusterSubnetGroupResponse>,
  errors: [
    ClusterSubnetGroupNotFoundFault,
    InvalidClusterSubnetGroupStateFault,
    InvalidClusterSubnetStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterSubnetGroup",
}));

export type DeleteCustomDomainAssociationError =
  | ClusterNotFoundFault
  | CustomCnameAssociationFault
  | CustomDomainAssociationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Contains information about deleting a custom domain association for a cluster.
 */
export const deleteCustomDomainAssociation: API.OperationMethod<
  DeleteCustomDomainAssociationMessage,
  DeleteCustomDomainAssociationResponse,
  DeleteCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<DeleteCustomDomainAssociationMessage>,
  output: __S(2561, __c80, 1) as any as S.Schema<DeleteCustomDomainAssociationResponse>,
  errors: [
    ClusterNotFoundFault,
    CustomCnameAssociationFault,
    CustomDomainAssociationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomDomainAssociation",
}));

export type DeleteEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidEndpointStateFault
  | CommonErrors;
/**
 * Deletes a Redshift-managed VPC endpoint.
 */
export const deleteEndpointAccess: API.OperationMethod<
  DeleteEndpointAccessMessage,
  EndpointAccess,
  DeleteEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<DeleteEndpointAccessMessage>,
  output: __S(1440, __c45, 0) as any as S.Schema<EndpointAccess>,
  errors: [
    ClusterNotFoundFault,
    EndpointNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidEndpointStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpointAccess",
}));

export type DeleteEventSubscriptionError =
  | InvalidSubscriptionStateFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift event notification subscription.
 */
export const deleteEventSubscription: API.OperationMethod<
  DeleteEventSubscriptionMessage,
  DeleteEventSubscriptionResponse,
  DeleteEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<DeleteEventSubscriptionMessage>,
  output: __S(2625, __c82, 1) as any as S.Schema<DeleteEventSubscriptionResponse>,
  errors: [InvalidSubscriptionStateFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSubscription",
}));

export type DeleteHsmClientCertificateError =
  | HsmClientCertificateNotFoundFault
  | InvalidHsmClientCertificateStateFault
  | CommonErrors;
/**
 * Deletes the specified HSM client certificate.
 */
export const deleteHsmClientCertificate: API.OperationMethod<
  DeleteHsmClientCertificateMessage,
  DeleteHsmClientCertificateResponse,
  DeleteHsmClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<DeleteHsmClientCertificateMessage>,
  output: __S(2657, __c83, 1) as any as S.Schema<DeleteHsmClientCertificateResponse>,
  errors: [HsmClientCertificateNotFoundFault, InvalidHsmClientCertificateStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHsmClientCertificate",
}));

export type DeleteHsmConfigurationError =
  | HsmConfigurationNotFoundFault
  | InvalidHsmConfigurationStateFault
  | CommonErrors;
/**
 * Deletes the specified Amazon Redshift HSM configuration.
 */
export const deleteHsmConfiguration: API.OperationMethod<
  DeleteHsmConfigurationMessage,
  DeleteHsmConfigurationResponse,
  DeleteHsmConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<DeleteHsmConfigurationMessage>,
  output: __S(2689, __c84, 1) as any as S.Schema<DeleteHsmConfigurationResponse>,
  errors: [HsmConfigurationNotFoundFault, InvalidHsmConfigurationStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHsmConfiguration",
}));

export type DeleteIntegrationError =
  | IntegrationConflictOperationFault
  | IntegrationConflictStateFault
  | IntegrationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes a zero-ETL integration or S3 event integration with Amazon Redshift.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationMessage,
  Integration,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<DeleteIntegrationMessage>,
  output: __S(1761, __c55, 1) as any as S.Schema<Integration>,
  errors: [
    IntegrationConflictOperationFault,
    IntegrationConflictStateFault,
    IntegrationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
}));

export type DeletePartnerError =
  | ClusterNotFoundFault
  | PartnerNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes a partner integration from a cluster. Data can still flow to the cluster until the integration is deleted at the partner's website.
 */
export const deletePartner: API.OperationMethod<
  PartnerIntegrationInputMessage,
  PartnerIntegrationOutputMessage,
  DeletePartnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<PartnerIntegrationInputMessage>,
  output: __S(160, __c5, 0) as any as S.Schema<PartnerIntegrationOutputMessage>,
  errors: [
    ClusterNotFoundFault,
    PartnerNotFoundFault,
    UnauthorizedPartnerIntegrationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePartner",
}));

export type DeleteQev2IdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift Query Editor (QEV2) IAM Identity Center application.
 */
export const deleteQev2IdcApplication: API.OperationMethod<
  DeleteQev2IdcApplicationMessage,
  DeleteQev2IdcApplicationResponse,
  DeleteQev2IdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<DeleteQev2IdcApplicationMessage>,
  output: __S(2753, __c86, 1) as any as S.Schema<DeleteQev2IdcApplicationResponse>,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQev2IdcApplication",
}));

export type DeleteRedshiftIdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | RedshiftIdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift IAM Identity Center application.
 */
export const deleteRedshiftIdcApplication: API.OperationMethod<
  DeleteRedshiftIdcApplicationMessage,
  DeleteRedshiftIdcApplicationResponse,
  DeleteRedshiftIdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<DeleteRedshiftIdcApplicationMessage>,
  output: __S(2785, __c87, 1) as any as S.Schema<DeleteRedshiftIdcApplicationResponse>,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    RedshiftIdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRedshiftIdcApplication",
}));

export type DeleteResourcePolicyError =
  | ResourceNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes the resource policy for a specified resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyMessage,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<DeleteResourcePolicyMessage>,
  output: __S(2817, __c88, 1) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [ResourceNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteScheduledActionError =
  | ScheduledActionNotFoundFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Deletes a scheduled action.
 */
export const deleteScheduledAction: API.OperationMethod<
  DeleteScheduledActionMessage,
  DeleteScheduledActionResponse,
  DeleteScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<DeleteScheduledActionMessage>,
  output: __S(2849, __c89, 1) as any as S.Schema<DeleteScheduledActionResponse>,
  errors: [ScheduledActionNotFoundFault, UnauthorizedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAction",
}));

export type DeleteSnapshotCopyGrantError =
  | InvalidSnapshotCopyGrantStateFault
  | SnapshotCopyGrantNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified snapshot copy grant.
 */
export const deleteSnapshotCopyGrant: API.OperationMethod<
  DeleteSnapshotCopyGrantMessage,
  DeleteSnapshotCopyGrantResponse,
  DeleteSnapshotCopyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2880, __c90, 0) as any as S.Schema<DeleteSnapshotCopyGrantMessage>,
  output: __S(2881, __c90, 1) as any as S.Schema<DeleteSnapshotCopyGrantResponse>,
  errors: [InvalidSnapshotCopyGrantStateFault, SnapshotCopyGrantNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshotCopyGrant",
}));

export type DeleteSnapshotScheduleError =
  | InvalidClusterSnapshotScheduleStateFault
  | SnapshotScheduleNotFoundFault
  | CommonErrors;
/**
 * Deletes a snapshot schedule.
 */
export const deleteSnapshotSchedule: API.OperationMethod<
  DeleteSnapshotScheduleMessage,
  DeleteSnapshotScheduleResponse,
  DeleteSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<DeleteSnapshotScheduleMessage>,
  output: __S(2913, __c91, 1) as any as S.Schema<DeleteSnapshotScheduleResponse>,
  errors: [InvalidClusterSnapshotScheduleStateFault, SnapshotScheduleNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshotSchedule",
}));

export type DeleteTagsError = InvalidTagFault | ResourceNotFoundFault | CommonErrors;
/**
 * Deletes tags from a resource. You must provide the ARN of the resource
 * from which you want to delete the tag or tags.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsMessage,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<DeleteTagsMessage>,
  output: __S(2945, __c92, 1) as any as S.Schema<DeleteTagsResponse>,
  errors: [InvalidTagFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

export type DeleteUsageLimitError =
  | UnsupportedOperationFault
  | UsageLimitNotFoundFault
  | CommonErrors;
/**
 * Deletes a usage limit from a cluster.
 */
export const deleteUsageLimit: API.OperationMethod<
  DeleteUsageLimitMessage,
  DeleteUsageLimitResponse,
  DeleteUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<DeleteUsageLimitMessage>,
  output: __S(2977, __c93, 1) as any as S.Schema<DeleteUsageLimitResponse>,
  errors: [UnsupportedOperationFault, UsageLimitNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageLimit",
}));

export type DeregisterNamespaceError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * Deregisters a cluster or serverless namespace from the Amazon Web Services Glue Data Catalog.
 */
export const deregisterNamespace: API.OperationMethod<
  DeregisterNamespaceInputMessage,
  DeregisterNamespaceOutputMessage,
  DeregisterNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<DeregisterNamespaceInputMessage>,
  output: __S(3009, __c94, 1) as any as S.Schema<DeregisterNamespaceOutputMessage>,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault, InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterNamespace",
}));

export type DescribeAccountAttributesError = CommonErrors;
/**
 * Returns a list of attributes attached to an account
 */
export const describeAccountAttributes: API.OperationMethod<
  DescribeAccountAttributesMessage,
  AccountAttributeList,
  DescribeAccountAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3073, __c96, 1) as any as S.Schema<DescribeAccountAttributesMessage>,
  output: __S(3078, __c96, 6) as any as S.Schema<AccountAttributeList>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAttributes",
}));

export type DescribeAuthenticationProfilesError =
  | AuthenticationProfileNotFoundFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Describes an authentication profile.
 */
export const describeAuthenticationProfiles: API.OperationMethod<
  DescribeAuthenticationProfilesMessage,
  DescribeAuthenticationProfilesResult,
  DescribeAuthenticationProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<DescribeAuthenticationProfilesMessage>,
  output: __S(3107, __c97, 3) as any as S.Schema<DescribeAuthenticationProfilesResult>,
  errors: [AuthenticationProfileNotFoundFault, InvalidAuthenticationProfileRequestFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuthenticationProfiles",
}));

export type DescribeClusterDbRevisionsError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Returns an array of `ClusterDbRevision` objects.
 */
export const describeClusterDbRevisions: API.PaginatedOperationMethod<
  DescribeClusterDbRevisionsMessage,
  ClusterDbRevisionsMessage,
  DescribeClusterDbRevisionsError,
  Credentials | HttpClient.HttpClient,
  ClusterDbRevision
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<DescribeClusterDbRevisionsMessage>,
  output: __S(3141, __c98, 5) as any as S.Schema<ClusterDbRevisionsMessage>,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterDbRevisions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterDbRevisions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterParameterGroupsError =
  | ClusterParameterGroupNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns a list of Amazon Redshift parameter groups, including parameter groups you
 * created and the default parameter group. For each parameter group, the response includes
 * the parameter group name, description, and parameter group family name. You can
 * optionally specify a name to retrieve the description of a specific parameter
 * group.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all parameter groups that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all parameter groups that
 * have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, parameter groups are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeClusterParameterGroups: API.PaginatedOperationMethod<
  DescribeClusterParameterGroupsMessage,
  ClusterParameterGroupsMessage,
  DescribeClusterParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  ClusterParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3168, __c99, 0) as any as S.Schema<DescribeClusterParameterGroupsMessage>,
  output: __S(3170, __c99, 2) as any as S.Schema<ClusterParameterGroupsMessage>,
  errors: [ClusterParameterGroupNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterParameterGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ParameterGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterParametersError = ClusterParameterGroupNotFoundFault | CommonErrors;
/**
 * Returns a detailed list of parameters contained within the specified Amazon Redshift
 * parameter group. For each parameter the response includes information such as parameter
 * name, description, data type, value, whether the parameter value is modifiable, and so
 * on.
 *
 * You can specify *source* filter to retrieve parameters of only
 * specific type. For example, to retrieve parameters that were modified by a user action
 * such as from ModifyClusterParameterGroup, you can specify
 * *source* equal to *user*.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeClusterParameters: API.PaginatedOperationMethod<
  DescribeClusterParametersMessage,
  ClusterParameterGroupDetails,
  DescribeClusterParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<DescribeClusterParametersMessage>,
  output: __S(3233, __c101, 1) as any as S.Schema<ClusterParameterGroupDetails>,
  errors: [ClusterParameterGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClustersError = ClusterNotFoundFault | InvalidTagFault | CommonErrors;
/**
 * Returns properties of provisioned clusters including general cluster properties,
 * cluster database properties, maintenance and backup properties, and security and access
 * properties. This operation supports pagination.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all clusters that match any combination of the specified keys and values. For example,
 * if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all clusters that have any
 * combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, clusters are returned
 * regardless of whether they have tag keys or values associated with them.
 */
export const describeClusters: API.PaginatedOperationMethod<
  DescribeClustersMessage,
  ClustersMessage,
  DescribeClustersError,
  Credentials | HttpClient.HttpClient,
  Cluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<DescribeClustersMessage>,
  output: __S(3298, __c103, 2) as any as S.Schema<ClustersMessage>,
  errors: [ClusterNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Clusters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterSecurityGroupsError =
  | ClusterSecurityGroupNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns information about Amazon Redshift security groups. If the name of a security
 * group is specified, the response will contain only information about only that security
 * group.
 *
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all security groups that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all security groups that
 * have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, security groups are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeClusterSecurityGroups: API.PaginatedOperationMethod<
  DescribeClusterSecurityGroupsMessage,
  ClusterSecurityGroupMessage,
  DescribeClusterSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  ClusterSecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<DescribeClusterSecurityGroupsMessage>,
  output: __S(3330, __c104, 2) as any as S.Schema<ClusterSecurityGroupMessage>,
  errors: [ClusterSecurityGroupNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterSecurityGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterSecurityGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterSnapshotsError =
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | InvalidTagFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns one or more snapshot objects, which contain metadata about your cluster
 * snapshots. By default, this operation returns information about all snapshots of all
 * clusters that are owned by your Amazon Web Services account. No information is returned for
 * snapshots owned by inactive Amazon Web Services accounts.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all snapshots that match any combination of the specified keys and values. For example,
 * if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all snapshots that have any
 * combination of those values are returned. Only snapshots that you own are returned in
 * the response; shared snapshots are not returned with the tag key and tag value request
 * parameters.
 *
 * If both tag keys and values are omitted from the request, snapshots are returned
 * regardless of whether they have tag keys or values associated with them.
 */
export const describeClusterSnapshots: API.PaginatedOperationMethod<
  DescribeClusterSnapshotsMessage,
  SnapshotMessage,
  DescribeClusterSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3362, __c105, 2) as any as S.Schema<DescribeClusterSnapshotsMessage>,
  output: __S(3364, __c105, 4) as any as S.Schema<SnapshotMessage>,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    InvalidTagFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterSnapshots",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Snapshots",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterSubnetGroupsError =
  | ClusterSubnetGroupNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns one or more cluster subnet group objects, which contain metadata about your
 * cluster subnet groups. By default, this operation returns information about all cluster
 * subnet groups that are defined in your Amazon Web Services account.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all subnet groups that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all subnet groups that have
 * any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, subnet groups are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeClusterSubnetGroups: API.PaginatedOperationMethod<
  DescribeClusterSubnetGroupsMessage,
  ClusterSubnetGroupMessage,
  DescribeClusterSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  ClusterSubnetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3392, __c106, 0) as any as S.Schema<DescribeClusterSubnetGroupsMessage>,
  output: __S(3394, __c106, 2) as any as S.Schema<ClusterSubnetGroupMessage>,
  errors: [ClusterSubnetGroupNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterSubnetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterSubnetGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterTracksError =
  | InvalidClusterTrackFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Returns a list of all the available maintenance tracks.
 */
export const describeClusterTracks: API.PaginatedOperationMethod<
  DescribeClusterTracksMessage,
  TrackListMessage,
  DescribeClusterTracksError,
  Credentials | HttpClient.HttpClient,
  MaintenanceTrack
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<DescribeClusterTracksMessage>,
  output: __S(3431, __c107, 7) as any as S.Schema<TrackListMessage>,
  errors: [InvalidClusterTrackFault, UnauthorizedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterTracks",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "MaintenanceTracks",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterVersionsError = CommonErrors;
/**
 * Returns descriptions of the available Amazon Redshift cluster versions. You can call this
 * operation even before creating any clusters to learn more about the Amazon Redshift versions.
 *
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeClusterVersions: API.PaginatedOperationMethod<
  DescribeClusterVersionsMessage,
  ClusterVersionsMessage,
  DescribeClusterVersionsError,
  Credentials | HttpClient.HttpClient,
  ClusterVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<DescribeClusterVersionsMessage>,
  output: __S(3459, __c108, 3) as any as S.Schema<ClusterVersionsMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterVersions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeCustomDomainAssociationsError =
  | CustomDomainAssociationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Contains information about custom domain associations for a cluster.
 */
export const describeCustomDomainAssociations: API.PaginatedOperationMethod<
  DescribeCustomDomainAssociationsMessage,
  CustomDomainAssociationsMessage,
  DescribeCustomDomainAssociationsError,
  Credentials | HttpClient.HttpClient,
  Association
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<DescribeCustomDomainAssociationsMessage>,
  output: __S(3493, __c109, 5) as any as S.Schema<CustomDomainAssociationsMessage>,
  errors: [CustomDomainAssociationNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomDomainAssociations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Associations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDataSharesError = InvalidDataShareFault | CommonErrors;
/**
 * Shows the status of any inbound or outbound datashares available in the specified
 * account.
 */
export const describeDataShares: API.PaginatedOperationMethod<
  DescribeDataSharesMessage,
  DescribeDataSharesResult,
  DescribeDataSharesError,
  Credentials | HttpClient.HttpClient,
  DataShare
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<DescribeDataSharesMessage>,
  output: __S(3521, __c110, 1) as any as S.Schema<DescribeDataSharesResult>,
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataShares",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DataShares",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDataSharesForConsumerError = InvalidNamespaceFault | CommonErrors;
/**
 * Returns a list of datashares where the account identifier being called is a consumer account identifier.
 */
export const describeDataSharesForConsumer: API.PaginatedOperationMethod<
  DescribeDataSharesForConsumerMessage,
  DescribeDataSharesForConsumerResult,
  DescribeDataSharesForConsumerError,
  Credentials | HttpClient.HttpClient,
  DataShare
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<DescribeDataSharesForConsumerMessage>,
  output: __S(3585, __c112, 1) as any as S.Schema<DescribeDataSharesForConsumerResult>,
  errors: [InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSharesForConsumer",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DataShares",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDataSharesForProducerError = InvalidNamespaceFault | CommonErrors;
/**
 * Returns a list of datashares when the account identifier being called is a producer account identifier.
 */
export const describeDataSharesForProducer: API.PaginatedOperationMethod<
  DescribeDataSharesForProducerMessage,
  DescribeDataSharesForProducerResult,
  DescribeDataSharesForProducerError,
  Credentials | HttpClient.HttpClient,
  DataShare
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<DescribeDataSharesForProducerMessage>,
  output: __S(3617, __c113, 1) as any as S.Schema<DescribeDataSharesForProducerResult>,
  errors: [InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSharesForProducer",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DataShares",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDefaultClusterParametersError = CommonErrors;
/**
 * Returns a list of parameter settings for the specified parameter group
 * family.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeDefaultClusterParameters: API.PaginatedOperationMethod<
  DescribeDefaultClusterParametersMessage,
  DescribeDefaultClusterParametersResult,
  DescribeDefaultClusterParametersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3648, __c114, 0) as any as S.Schema<DescribeDefaultClusterParametersMessage>,
  output: __S(3650, __c114, 2) as any as S.Schema<DescribeDefaultClusterParametersResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDefaultClusterParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "DefaultClusterParameters.Marker",
    items: "DefaultClusterParameters.Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Describes a Redshift-managed VPC endpoint.
 */
export const describeEndpointAccess: API.PaginatedOperationMethod<
  DescribeEndpointAccessMessage,
  EndpointAccessList,
  DescribeEndpointAccessError,
  Credentials | HttpClient.HttpClient,
  EndpointAccess
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3680, __c115, 0) as any as S.Schema<DescribeEndpointAccessMessage>,
  output: __S(3682, __c115, 2) as any as S.Schema<EndpointAccessList>,
  errors: [ClusterNotFoundFault, EndpointNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointAccess",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "EndpointAccessList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointAuthorizationError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Describes an endpoint authorization.
 */
export const describeEndpointAuthorization: API.PaginatedOperationMethod<
  DescribeEndpointAuthorizationMessage,
  EndpointAuthorizationList,
  DescribeEndpointAuthorizationError,
  Credentials | HttpClient.HttpClient,
  EndpointAuthorization
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3712, __c116, 0) as any as S.Schema<DescribeEndpointAuthorizationMessage>,
  output: __S(3714, __c116, 2) as any as S.Schema<EndpointAuthorizationList>,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointAuthorization",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "EndpointAuthorizationList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventCategoriesError = CommonErrors;
/**
 * Displays a list of event categories for all event source types, or for a specified
 * source type. For a list of the event categories and source types, go to Amazon Redshift Event
 * Notifications.
 */
export const describeEventCategories: API.OperationMethod<
  DescribeEventCategoriesMessage,
  EventCategoriesMessage,
  DescribeEventCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3744, __c117, 0) as any as S.Schema<DescribeEventCategoriesMessage>,
  output: __S(3749, __c117, 5) as any as S.Schema<EventCategoriesMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventCategories",
}));

export type DescribeEventsError = CommonErrors;
/**
 * Returns events related to clusters, security groups, snapshots, and parameter
 * groups for the past 14 days. Events specific to a particular cluster, security group,
 * snapshot or parameter group can be obtained by providing the name as a parameter. By
 * default, the past hour of events are returned.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsMessage,
  EventsMessage,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3776, __c118, 0) as any as S.Schema<DescribeEventsMessage>,
  output: __S(3779, __c118, 3) as any as S.Schema<EventsMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Events",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventSubscriptionsError =
  | InvalidTagFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Lists descriptions of all the Amazon Redshift event notification subscriptions for a
 * customer account. If you specify a subscription name, lists the description for that
 * subscription.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all event notification subscriptions that match any combination of the specified keys
 * and values. For example, if you have `owner` and `environment` for
 * tag keys, and `admin` and `test` for tag values, all subscriptions
 * that have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, subscriptions are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeEventSubscriptions: API.PaginatedOperationMethod<
  DescribeEventSubscriptionsMessage,
  EventSubscriptionsMessage,
  DescribeEventSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  EventSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<DescribeEventSubscriptionsMessage>,
  output: __S(3810, __c119, 2) as any as S.Schema<EventSubscriptionsMessage>,
  errors: [InvalidTagFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventSubscriptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "EventSubscriptionsList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeHsmClientCertificatesError =
  | HsmClientCertificateNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns information about the specified HSM client certificate. If no certificate
 * ID is specified, returns information about all the HSM certificates owned by your Amazon Web Services account.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all HSM client certificates that match any combination of the specified keys and values.
 * For example, if you have `owner` and `environment` for tag keys,
 * and `admin` and `test` for tag values, all HSM client certificates
 * that have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, HSM client certificates
 * are returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeHsmClientCertificates: API.PaginatedOperationMethod<
  DescribeHsmClientCertificatesMessage,
  HsmClientCertificateMessage,
  DescribeHsmClientCertificatesError,
  Credentials | HttpClient.HttpClient,
  HsmClientCertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3840, __c120, 0) as any as S.Schema<DescribeHsmClientCertificatesMessage>,
  output: __S(3842, __c120, 2) as any as S.Schema<HsmClientCertificateMessage>,
  errors: [HsmClientCertificateNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHsmClientCertificates",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "HsmClientCertificates",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeHsmConfigurationsError =
  | HsmConfigurationNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns information about the specified Amazon Redshift HSM configuration. If no
 * configuration ID is specified, returns information about all the HSM configurations
 * owned by your Amazon Web Services account.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all HSM connections that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all HSM connections that
 * have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, HSM connections are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeHsmConfigurations: API.PaginatedOperationMethod<
  DescribeHsmConfigurationsMessage,
  HsmConfigurationMessage,
  DescribeHsmConfigurationsError,
  Credentials | HttpClient.HttpClient,
  HsmConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3872, __c121, 0) as any as S.Schema<DescribeHsmConfigurationsMessage>,
  output: __S(3874, __c121, 2) as any as S.Schema<HsmConfigurationMessage>,
  errors: [HsmConfigurationNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHsmConfigurations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "HsmConfigurations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeInboundIntegrationsError =
  | IntegrationNotFoundFault
  | InvalidNamespaceFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a list of inbound integrations.
 */
export const describeInboundIntegrations: API.PaginatedOperationMethod<
  DescribeInboundIntegrationsMessage,
  InboundIntegrationsMessage,
  DescribeInboundIntegrationsError,
  Credentials | HttpClient.HttpClient,
  InboundIntegration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3904, __c122, 0) as any as S.Schema<DescribeInboundIntegrationsMessage>,
  output: __S(3907, __c122, 3) as any as S.Schema<InboundIntegrationsMessage>,
  errors: [IntegrationNotFoundFault, InvalidNamespaceFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundIntegrations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "InboundIntegrations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeIntegrationsError =
  | IntegrationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Describes one or more zero-ETL or S3 event integrations with Amazon Redshift.
 */
export const describeIntegrations: API.PaginatedOperationMethod<
  DescribeIntegrationsMessage,
  IntegrationsMessage,
  DescribeIntegrationsError,
  Credentials | HttpClient.HttpClient,
  Integration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3939, __c123, 3) as any as S.Schema<DescribeIntegrationsMessage>,
  output: __S(3941, __c123, 5) as any as S.Schema<IntegrationsMessage>,
  errors: [IntegrationNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIntegrations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Integrations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeLoggingStatusError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Describes whether information, such as queries and connection attempts, is being
 * logged for the specified Amazon Redshift cluster.
 */
export const describeLoggingStatus: API.OperationMethod<
  DescribeLoggingStatusMessage,
  LoggingStatus,
  DescribeLoggingStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3968, __c124, 0) as any as S.Schema<DescribeLoggingStatusMessage>,
  output: __S(4000, __c125, 0) as any as S.Schema<LoggingStatus>,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoggingStatus",
}));

export type DescribeNodeConfigurationOptionsError =
  | AccessToSnapshotDeniedFault
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | InvalidClusterSnapshotStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns properties of possible node configurations such as node type, number of nodes, and
 * disk usage for the specified action type.
 */
export const describeNodeConfigurationOptions: API.PaginatedOperationMethod<
  DescribeNodeConfigurationOptionsMessage,
  NodeConfigurationOptionsMessage,
  DescribeNodeConfigurationOptionsError,
  Credentials | HttpClient.HttpClient,
  NodeConfigurationOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4034, __c126, 2) as any as S.Schema<DescribeNodeConfigurationOptionsMessage>,
  output: __S(4037, __c126, 5) as any as S.Schema<NodeConfigurationOptionsMessage>,
  errors: [
    AccessToSnapshotDeniedFault,
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    InvalidClusterSnapshotStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNodeConfigurationOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "NodeConfigurationOptionList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeOrderableClusterOptionsError = CommonErrors;
/**
 * Returns a list of orderable cluster options. Before you create a new cluster you
 * can use this operation to find what options are available, such as the EC2 Availability
 * Zones (AZ) in the specific Amazon Web Services Region that you can specify, and the node types you can
 * request. The node types differ by available storage, memory, CPU and price. With the
 * cost involved you might want to obtain a list of cluster options in the specific region
 * and specify values when creating a cluster.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeOrderableClusterOptions: API.PaginatedOperationMethod<
  DescribeOrderableClusterOptionsMessage,
  OrderableClusterOptionsMessage,
  DescribeOrderableClusterOptionsError,
  Credentials | HttpClient.HttpClient,
  OrderableClusterOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4064, __c127, 0) as any as S.Schema<DescribeOrderableClusterOptionsMessage>,
  output: __S(4068, __c127, 4) as any as S.Schema<OrderableClusterOptionsMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrderableClusterOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "OrderableClusterOptions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribePartnersError =
  | ClusterNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns information about the partner integrations defined for a cluster.
 */
export const describePartners: API.OperationMethod<
  DescribePartnersInputMessage,
  DescribePartnersOutputMessage,
  DescribePartnersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4096, __c128, 0) as any as S.Schema<DescribePartnersInputMessage>,
  output: __S(4099, __c128, 3) as any as S.Schema<DescribePartnersOutputMessage>,
  errors: [ClusterNotFoundFault, UnauthorizedPartnerIntegrationFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePartners",
}));

export type DescribeQev2IdcApplicationsError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Lists the Amazon Redshift Query Editor (QEV2) IAM Identity Center applications. To retrieve additional results, use the MaxRecords and Marker parameters.
 */
export const describeQev2IdcApplications: API.PaginatedOperationMethod<
  DescribeQev2IdcApplicationsMessage,
  DescribeQev2IdcApplicationsResult,
  DescribeQev2IdcApplicationsError,
  Credentials | HttpClient.HttpClient,
  Qev2IdcApplication
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4128, __c129, 0) as any as S.Schema<DescribeQev2IdcApplicationsMessage>,
  output: __S(4130, __c129, 2) as any as S.Schema<DescribeQev2IdcApplicationsResult>,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQev2IdcApplications",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Qev2IdcApplications",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeRedshiftIdcApplicationsError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | RedshiftIdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Lists the Amazon Redshift IAM Identity Center applications.
 */
export const describeRedshiftIdcApplications: API.PaginatedOperationMethod<
  DescribeRedshiftIdcApplicationsMessage,
  DescribeRedshiftIdcApplicationsResult,
  DescribeRedshiftIdcApplicationsError,
  Credentials | HttpClient.HttpClient,
  RedshiftIdcApplication
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4160, __c130, 0) as any as S.Schema<DescribeRedshiftIdcApplicationsMessage>,
  output: __S(4162, __c130, 2) as any as S.Schema<DescribeRedshiftIdcApplicationsResult>,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    RedshiftIdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRedshiftIdcApplications",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "RedshiftIdcApplications",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedNodeExchangeStatusError =
  | ReservedNodeExchangeNotFoundFault
  | ReservedNodeNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns exchange status details and associated metadata for a reserved-node
 * exchange. Statuses include such values as in progress and requested.
 */
export const describeReservedNodeExchangeStatus: API.PaginatedOperationMethod<
  DescribeReservedNodeExchangeStatusInputMessage,
  DescribeReservedNodeExchangeStatusOutputMessage,
  DescribeReservedNodeExchangeStatusError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeExchangeStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4192, __c131, 0) as any as S.Schema<DescribeReservedNodeExchangeStatusInputMessage>,
  output: __S(4194, __c131, 2) as any as S.Schema<DescribeReservedNodeExchangeStatusOutputMessage>,
  errors: [ReservedNodeExchangeNotFoundFault, ReservedNodeNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodeExchangeStatus",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeExchangeStatusDetails",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedNodeOfferingsError =
  | DependentServiceUnavailableFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a list of the available reserved node offerings by Amazon Redshift with their
 * descriptions including the node type, the fixed and recurring costs of reserving the
 * node and duration the node will be reserved for you. These descriptions help you
 * determine which reserve node offering you want to purchase. You then use the unique
 * offering ID in you call to PurchaseReservedNodeOffering to reserve one
 * or more nodes for your Amazon Redshift cluster.
 *
 * For more information about reserved node offerings, go to
 * Purchasing Reserved Nodes
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeReservedNodeOfferings: API.PaginatedOperationMethod<
  DescribeReservedNodeOfferingsMessage,
  ReservedNodeOfferingsMessage,
  DescribeReservedNodeOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4224, __c132, 0) as any as S.Schema<DescribeReservedNodeOfferingsMessage>,
  output: __S(4225, __c132, 1) as any as S.Schema<ReservedNodeOfferingsMessage>,
  errors: [
    DependentServiceUnavailableFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodeOfferings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeOfferings",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedNodesError =
  | DependentServiceUnavailableFault
  | ReservedNodeNotFoundFault
  | CommonErrors;
/**
 * Returns the descriptions of the reserved nodes.
 */
export const describeReservedNodes: API.PaginatedOperationMethod<
  DescribeReservedNodesMessage,
  ReservedNodesMessage,
  DescribeReservedNodesError,
  Credentials | HttpClient.HttpClient,
  ReservedNode
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4320, __c135, 0) as any as S.Schema<DescribeReservedNodesMessage>,
  output: __S(4322, __c135, 2) as any as S.Schema<ReservedNodesMessage>,
  errors: [DependentServiceUnavailableFault, ReservedNodeNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodes",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodes",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeResizeError =
  | ClusterNotFoundFault
  | ResizeNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns information about the last resize operation for the specified cluster. If
 * no resize operation has ever been initiated for the specified cluster, a HTTP
 * 404 error is returned. If a resize operation was initiated and completed, the
 * status of the resize remains as `SUCCEEDED` until the next resize.
 *
 * A resize operation can be requested using ModifyCluster and
 * specifying a different number or type of nodes for the cluster.
 */
export const describeResize: API.OperationMethod<
  DescribeResizeMessage,
  ResizeProgressMessage,
  DescribeResizeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<DescribeResizeMessage>,
  output: __S(707, __c22, 3) as any as S.Schema<ResizeProgressMessage>,
  errors: [ClusterNotFoundFault, ResizeNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResize",
}));

export type DescribeScheduledActionsError =
  | ScheduledActionNotFoundFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Describes properties of scheduled actions.
 */
export const describeScheduledActions: API.PaginatedOperationMethod<
  DescribeScheduledActionsMessage,
  ScheduledActionsMessage,
  DescribeScheduledActionsError,
  Credentials | HttpClient.HttpClient,
  ScheduledAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4386, __c137, 2) as any as S.Schema<DescribeScheduledActionsMessage>,
  output: __S(4388, __c137, 4) as any as S.Schema<ScheduledActionsMessage>,
  errors: [ScheduledActionNotFoundFault, UnauthorizedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScheduledActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ScheduledActions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeSnapshotCopyGrantsError =
  | InvalidTagFault
  | SnapshotCopyGrantNotFoundFault
  | CommonErrors;
/**
 * Returns a list of snapshot copy grants owned by the Amazon Web Services account in the destination
 * region.
 *
 * For more information about managing snapshot copy grants, go to
 * Amazon Redshift Database Encryption
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeSnapshotCopyGrants: API.PaginatedOperationMethod<
  DescribeSnapshotCopyGrantsMessage,
  SnapshotCopyGrantMessage,
  DescribeSnapshotCopyGrantsError,
  Credentials | HttpClient.HttpClient,
  SnapshotCopyGrant
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4416, __c138, 0) as any as S.Schema<DescribeSnapshotCopyGrantsMessage>,
  output: __S(4418, __c138, 2) as any as S.Schema<SnapshotCopyGrantMessage>,
  errors: [InvalidTagFault, SnapshotCopyGrantNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshotCopyGrants",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SnapshotCopyGrants",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeSnapshotSchedulesError = CommonErrors;
/**
 * Returns a list of snapshot schedules.
 */
export const describeSnapshotSchedules: API.PaginatedOperationMethod<
  DescribeSnapshotSchedulesMessage,
  DescribeSnapshotSchedulesOutputMessage,
  DescribeSnapshotSchedulesError,
  Credentials | HttpClient.HttpClient,
  SnapshotSchedule
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4448, __c139, 0) as any as S.Schema<DescribeSnapshotSchedulesMessage>,
  output: __S(4450, __c139, 2) as any as S.Schema<DescribeSnapshotSchedulesOutputMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshotSchedules",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SnapshotSchedules",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeStorageError = CommonErrors;
/**
 * Returns account level backups storage size and provisional storage.
 */
export const describeStorage: API.OperationMethod<
  DescribeStorageRequest,
  CustomerStorageMessage,
  DescribeStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4480, __c140, 0) as any as S.Schema<DescribeStorageRequest>,
  output: __S(4481, __c140, 1) as any as S.Schema<CustomerStorageMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStorage",
}));

export type DescribeTableRestoreStatusError =
  | ClusterNotFoundFault
  | TableRestoreNotFoundFault
  | CommonErrors;
/**
 * Lists the status of one or more table restore requests made using the RestoreTableFromClusterSnapshot API action. If you don't specify a value
 * for the `TableRestoreRequestId` parameter, then
 * `DescribeTableRestoreStatus` returns the status of all table restore
 * requests ordered by the date and time of the request in ascending order. Otherwise
 * `DescribeTableRestoreStatus` returns the status of the table specified by
 * `TableRestoreRequestId`.
 */
export const describeTableRestoreStatus: API.PaginatedOperationMethod<
  DescribeTableRestoreStatusMessage,
  TableRestoreStatusMessage,
  DescribeTableRestoreStatusError,
  Credentials | HttpClient.HttpClient,
  TableRestoreStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4512, __c141, 0) as any as S.Schema<DescribeTableRestoreStatusMessage>,
  output: __S(4514, __c141, 2) as any as S.Schema<TableRestoreStatusMessage>,
  errors: [ClusterNotFoundFault, TableRestoreNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTableRestoreStatus",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "TableRestoreStatusDetails",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeTagsError = InvalidTagFault | ResourceNotFoundFault | CommonErrors;
/**
 * Returns a list of tags. You can return tags from a specific resource by specifying
 * an ARN, or you can return all tags for a given type of resource, such as clusters,
 * snapshots, and so on.
 *
 * The following are limitations for `DescribeTags`:
 *
 * - You cannot specify an ARN and a resource-type value together in the same
 * request.
 *
 * - You cannot use the `MaxRecords` and `Marker`
 * parameters together with the ARN parameter.
 *
 * - The `MaxRecords` parameter can be a range from 10 to 50 results
 * to return in a request.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all resources that match any combination of the specified keys and values. For example,
 * if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all resources that have any
 * combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, resources are returned
 * regardless of whether they have tag keys or values associated with them.
 */
export const describeTags: API.PaginatedOperationMethod<
  DescribeTagsMessage,
  TaggedResourceListMessage,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient,
  TaggedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4576, __c143, 0) as any as S.Schema<DescribeTagsMessage>,
  output: __S(4579, __c143, 3) as any as S.Schema<TaggedResourceListMessage>,
  errors: [InvalidTagFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "TaggedResources",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeUsageLimitsError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Shows usage limits on a cluster.
 * Results are filtered based on the combination of input usage limit identifier, cluster identifier, and feature type parameters:
 *
 * - If usage limit identifier, cluster identifier, and feature type are not provided,
 * then all usage limit objects for the current account in the current region are returned.
 *
 * - If usage limit identifier is provided,
 * then the corresponding usage limit object is returned.
 *
 * - If cluster identifier is provided,
 * then all usage limit objects for the specified cluster are returned.
 *
 * - If cluster identifier and feature type are provided,
 * then all usage limit objects for the combination of cluster and feature are returned.
 */
export const describeUsageLimits: API.PaginatedOperationMethod<
  DescribeUsageLimitsMessage,
  UsageLimitList,
  DescribeUsageLimitsError,
  Credentials | HttpClient.HttpClient,
  UsageLimit
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4608, __c144, 0) as any as S.Schema<DescribeUsageLimitsMessage>,
  output: __S(4610, __c144, 2) as any as S.Schema<UsageLimitList>,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsageLimits",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "UsageLimits",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DisableLoggingError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Stops logging information, such as queries and connection attempts, for the
 * specified Amazon Redshift cluster.
 */
export const disableLogging: API.OperationMethod<
  DisableLoggingMessage,
  LoggingStatus,
  DisableLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4640, __c145, 0) as any as S.Schema<DisableLoggingMessage>,
  output: __S(4000, __c125, 0) as any as S.Schema<LoggingStatus>,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableLogging",
}));

export type DisableSnapshotCopyError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | SnapshotCopyAlreadyDisabledFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Disables the automatic copying of snapshots from one region to another region for a
 * specified cluster.
 *
 * If your cluster and its snapshots are encrypted using an encrypted symmetric key
 * from Key Management Service, use DeleteSnapshotCopyGrant to delete the grant that
 * grants Amazon Redshift permission to the key in the destination region.
 */
export const disableSnapshotCopy: API.OperationMethod<
  DisableSnapshotCopyMessage,
  DisableSnapshotCopyResult,
  DisableSnapshotCopyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4672, __c146, 0) as any as S.Schema<DisableSnapshotCopyMessage>,
  output: __S(4673, __c146, 1) as any as S.Schema<DisableSnapshotCopyResult>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    SnapshotCopyAlreadyDisabledFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableSnapshotCopy",
}));

export type DisassociateDataShareConsumerError =
  | InvalidDataShareFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * From a datashare consumer account, remove association for the specified datashare.
 */
export const disassociateDataShareConsumer: API.OperationMethod<
  DisassociateDataShareConsumerMessage,
  DataShare,
  DisassociateDataShareConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4704, __c147, 0) as any as S.Schema<DisassociateDataShareConsumerMessage>,
  output: __S(226, __c7, 2) as any as S.Schema<DataShare>,
  errors: [InvalidDataShareFault, InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDataShareConsumer",
}));

export type EnableLoggingError =
  | BucketNotFoundFault
  | ClusterNotFoundFault
  | InsufficientS3BucketPolicyFault
  | InvalidClusterStateFault
  | InvalidS3BucketNameFault
  | InvalidS3KeyPrefixFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Starts logging information, such as queries and connection attempts, for the
 * specified Amazon Redshift cluster.
 */
export const enableLogging: API.OperationMethod<
  EnableLoggingMessage,
  LoggingStatus,
  EnableLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4736, __c148, 0) as any as S.Schema<EnableLoggingMessage>,
  output: __S(4000, __c125, 0) as any as S.Schema<LoggingStatus>,
  errors: [
    BucketNotFoundFault,
    ClusterNotFoundFault,
    InsufficientS3BucketPolicyFault,
    InvalidClusterStateFault,
    InvalidS3BucketNameFault,
    InvalidS3KeyPrefixFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableLogging",
}));

export type EnableSnapshotCopyError =
  | ClusterNotFoundFault
  | CopyToRegionDisabledFault
  | DependentServiceRequestThrottlingFault
  | IncompatibleOrderableOptions
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | LimitExceededFault
  | SnapshotCopyAlreadyEnabledFault
  | SnapshotCopyGrantNotFoundFault
  | UnauthorizedOperation
  | UnknownSnapshotCopyRegionFault
  | CommonErrors;
/**
 * Enables the automatic copy of snapshots from one region to another region for a
 * specified cluster.
 */
export const enableSnapshotCopy: API.OperationMethod<
  EnableSnapshotCopyMessage,
  EnableSnapshotCopyResult,
  EnableSnapshotCopyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4768, __c149, 0) as any as S.Schema<EnableSnapshotCopyMessage>,
  output: __S(4769, __c149, 1) as any as S.Schema<EnableSnapshotCopyResult>,
  errors: [
    ClusterNotFoundFault,
    CopyToRegionDisabledFault,
    DependentServiceRequestThrottlingFault,
    IncompatibleOrderableOptions,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
    LimitExceededFault,
    SnapshotCopyAlreadyEnabledFault,
    SnapshotCopyGrantNotFoundFault,
    UnauthorizedOperation,
    UnknownSnapshotCopyRegionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSnapshotCopy",
}));

export type FailoverPrimaryComputeError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Fails over the primary compute unit of the specified Multi-AZ cluster to another Availability Zone.
 */
export const failoverPrimaryCompute: API.OperationMethod<
  FailoverPrimaryComputeInputMessage,
  FailoverPrimaryComputeResult,
  FailoverPrimaryComputeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4800, __c150, 0) as any as S.Schema<FailoverPrimaryComputeInputMessage>,
  output: __S(4801, __c150, 1) as any as S.Schema<FailoverPrimaryComputeResult>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverPrimaryCompute",
}));

export type GetClusterCredentialsError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a database user name and temporary password with temporary authorization to
 * log on to an Amazon Redshift database. The action returns the database user name
 * prefixed with `IAM:` if `AutoCreate` is `False` or
 * `IAMA:` if `AutoCreate` is `True`. You can
 * optionally specify one or more database user groups that the user will join at log on.
 * By default, the temporary credentials expire in 900 seconds. You can optionally specify
 * a duration between 900 seconds (15 minutes) and 3600 seconds (60 minutes). For more
 * information, see Using IAM Authentication
 * to Generate Database User Credentials in the Amazon Redshift Cluster Management Guide.
 *
 * The Identity and Access Management (IAM) user or role that runs
 * GetClusterCredentials must have an IAM policy attached that allows access to all
 * necessary actions and resources. For more information about permissions, see Resource Policies for GetClusterCredentials in the
 * Amazon Redshift Cluster Management Guide.
 *
 * If the `DbGroups` parameter is specified, the IAM policy must allow the
 * `redshift:JoinGroup` action with access to the listed
 * `dbgroups`.
 *
 * In addition, if the `AutoCreate` parameter is set to `True`,
 * then the policy must include the `redshift:CreateClusterUser`
 * permission.
 *
 * If the `DbName` parameter is specified, the IAM policy must allow access
 * to the resource `dbname` for the specified database name.
 */
export const getClusterCredentials: API.OperationMethod<
  GetClusterCredentialsMessage,
  ClusterCredentials,
  GetClusterCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4833, __c151, 1) as any as S.Schema<GetClusterCredentialsMessage>,
  output: __S(4834, __c151, 2) as any as S.Schema<ClusterCredentials>,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterCredentials",
}));

export type GetClusterCredentialsWithIAMError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a database user name and temporary password with temporary authorization to
 * log in to an Amazon Redshift database.
 * The database user is mapped 1:1 to the source Identity and Access Management (IAM) identity.
 * For more information about IAM identities, see IAM Identities (users, user groups, and roles) in the
 * Amazon Web Services Identity and Access Management User Guide.
 *
 * The Identity and Access Management (IAM) identity that runs
 * this operation must have an IAM policy attached that allows access to all
 * necessary actions and resources.
 * For more information about permissions, see Using identity-based policies (IAM policies) in the
 * Amazon Redshift Cluster Management Guide.
 */
export const getClusterCredentialsWithIAM: API.OperationMethod<
  GetClusterCredentialsWithIAMMessage,
  ClusterExtendedCredentials,
  GetClusterCredentialsWithIAMError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4864, __c152, 0) as any as S.Schema<GetClusterCredentialsWithIAMMessage>,
  output: __S(4865, __c152, 1) as any as S.Schema<ClusterExtendedCredentials>,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterCredentialsWithIAM",
}));

export type GetIdentityCenterAuthTokenError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | RedshiftInvalidParameterFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Generates an encrypted authentication token that propagates the caller's
 * Amazon Web Services IAM Identity Center identity to Amazon Redshift clusters. This API extracts the
 * Amazon Web Services IAM Identity Center identity from enhanced credentials and creates a secure token
 * that Amazon Redshift drivers can use for authentication.
 *
 * The token is encrypted using Key Management Service (KMS) and can only be
 * decrypted by the specified Amazon Redshift clusters. The token contains the caller's
 * Amazon Web Services IAM Identity Center identity information and is valid for a limited time period.
 *
 * This API is exclusively for use with Amazon Web Services IAM Identity Center enhanced credentials. If the
 * caller is not using enhanced credentials with embedded Amazon Web Services IAM Identity Center identity, the API will
 * return an error.
 */
export const getIdentityCenterAuthToken: API.OperationMethod<
  GetIdentityCenterAuthTokenRequest,
  GetIdentityCenterAuthTokenResponse,
  GetIdentityCenterAuthTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4897, __c153, 1) as any as S.Schema<GetIdentityCenterAuthTokenRequest>,
  output: __S(4898, __c153, 2) as any as S.Schema<GetIdentityCenterAuthTokenResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    RedshiftInvalidParameterFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityCenterAuthToken",
}));

export type GetReservedNodeExchangeConfigurationOptionsError =
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | DependentServiceUnavailableFault
  | InvalidReservedNodeStateFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Gets the configuration options for the reserved-node exchange. These options
 * include information about the source reserved node and target reserved node offering.
 * Details include the node type, the price, the node count, and the offering type.
 */
export const getReservedNodeExchangeConfigurationOptions: API.PaginatedOperationMethod<
  GetReservedNodeExchangeConfigurationOptionsInputMessage,
  GetReservedNodeExchangeConfigurationOptionsOutputMessage,
  GetReservedNodeExchangeConfigurationOptionsError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeConfigurationOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(
    4928,
    __c154,
    0,
  ) as any as S.Schema<GetReservedNodeExchangeConfigurationOptionsInputMessage>,
  output: __S(
    4931,
    __c154,
    3,
  ) as any as S.Schema<GetReservedNodeExchangeConfigurationOptionsOutputMessage>,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    DependentServiceUnavailableFault,
    InvalidReservedNodeStateFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservedNodeExchangeConfigurationOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeConfigurationOptionList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type GetReservedNodeExchangeOfferingsError =
  | DependentServiceUnavailableFault
  | InvalidReservedNodeStateFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns an array of DC2 ReservedNodeOfferings that matches the payment type, term,
 * and usage price of the given DC1 reserved node.
 */
export const getReservedNodeExchangeOfferings: API.PaginatedOperationMethod<
  GetReservedNodeExchangeOfferingsInputMessage,
  GetReservedNodeExchangeOfferingsOutputMessage,
  GetReservedNodeExchangeOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4960, __c155, 0) as any as S.Schema<GetReservedNodeExchangeOfferingsInputMessage>,
  output: __S(4961, __c155, 1) as any as S.Schema<GetReservedNodeExchangeOfferingsOutputMessage>,
  errors: [
    DependentServiceUnavailableFault,
    InvalidReservedNodeStateFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservedNodeExchangeOfferings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeOfferings",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type GetResourcePolicyError =
  | InvalidPolicyFault
  | ResourceNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Get the resource policy for a specified resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyMessage,
  GetResourcePolicyResult,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4992, __c156, 0) as any as S.Schema<GetResourcePolicyMessage>,
  output: __S(4993, __c156, 1) as any as S.Schema<GetResourcePolicyResult>,
  errors: [InvalidPolicyFault, ResourceNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ListRecommendationsError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * List the Amazon Redshift Advisor recommendations for one or multiple Amazon Redshift clusters in an Amazon Web Services account.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsMessage,
  ListRecommendationsResult,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  Recommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5056, __c158, 0) as any as S.Schema<ListRecommendationsMessage>,
  output: __S(5063, __c158, 7) as any as S.Schema<ListRecommendationsResult>,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Recommendations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type ModifyAquaConfigurationError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * This operation is retired. Calling this operation does not change AQUA configuration. Amazon Redshift automatically determines whether to use AQUA (Advanced Query Accelerator).
 */
export const modifyAquaConfiguration: API.OperationMethod<
  ModifyAquaInputMessage,
  ModifyAquaOutputMessage,
  ModifyAquaConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5088, __c159, 0) as any as S.Schema<ModifyAquaInputMessage>,
  output: __S(5089, __c159, 1) as any as S.Schema<ModifyAquaOutputMessage>,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyAquaConfiguration",
}));

export type ModifyAuthenticationProfileError =
  | AuthenticationProfileNotFoundFault
  | AuthenticationProfileQuotaExceededFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Modifies an authentication profile.
 */
export const modifyAuthenticationProfile: API.OperationMethod<
  ModifyAuthenticationProfileMessage,
  ModifyAuthenticationProfileResult,
  ModifyAuthenticationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5120, __c160, 0) as any as S.Schema<ModifyAuthenticationProfileMessage>,
  output: __S(5121, __c160, 1) as any as S.Schema<ModifyAuthenticationProfileResult>,
  errors: [
    AuthenticationProfileNotFoundFault,
    AuthenticationProfileQuotaExceededFault,
    InvalidAuthenticationProfileRequestFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyAuthenticationProfile",
}));

export type ModifyClusterError =
  | ClusterAlreadyExistsFault
  | ClusterNotFoundFault
  | ClusterParameterGroupNotFoundFault
  | ClusterSecurityGroupNotFoundFault
  | CustomCnameAssociationFault
  | DependentServiceRequestThrottlingFault
  | HsmClientCertificateNotFoundFault
  | HsmConfigurationNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidClusterTrackFault
  | InvalidElasticIpFault
  | InvalidRetentionPeriodFault
  | Ipv6CidrBlockNotFoundFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | TableLimitExceededFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | UnsupportedOptionFault
  | CommonErrors;
/**
 * Modifies the settings for a cluster.
 *
 * You can also change node type and the number of nodes to scale up or down the
 * cluster. When resizing a cluster, you must specify both the number of nodes and the node
 * type even if one of the parameters does not change.
 *
 * You can add another security or
 * parameter group, or change the admin user password. Resetting a cluster password or modifying the security groups associated with a cluster do not need a reboot. However, modifying a parameter group requires a reboot for parameters to take effect.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 */
export const modifyCluster: API.OperationMethod<
  ModifyClusterMessage,
  ModifyClusterResult,
  ModifyClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5152, __c161, 0) as any as S.Schema<ModifyClusterMessage>,
  output: __S(5153, __c161, 1) as any as S.Schema<ModifyClusterResult>,
  errors: [
    ClusterAlreadyExistsFault,
    ClusterNotFoundFault,
    ClusterParameterGroupNotFoundFault,
    ClusterSecurityGroupNotFoundFault,
    CustomCnameAssociationFault,
    DependentServiceRequestThrottlingFault,
    HsmClientCertificateNotFoundFault,
    HsmConfigurationNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidClusterTrackFault,
    InvalidElasticIpFault,
    InvalidRetentionPeriodFault,
    Ipv6CidrBlockNotFoundFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    TableLimitExceededFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
    UnsupportedOptionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCluster",
}));

export type ModifyClusterDbRevisionError =
  | ClusterNotFoundFault
  | ClusterOnLatestRevisionFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies the database revision of a cluster. The database revision is a unique
 * revision of the database running in a cluster.
 */
export const modifyClusterDbRevision: API.OperationMethod<
  ModifyClusterDbRevisionMessage,
  ModifyClusterDbRevisionResult,
  ModifyClusterDbRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5184, __c162, 0) as any as S.Schema<ModifyClusterDbRevisionMessage>,
  output: __S(5185, __c162, 1) as any as S.Schema<ModifyClusterDbRevisionResult>,
  errors: [
    ClusterNotFoundFault,
    ClusterOnLatestRevisionFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterDbRevision",
}));

export type ModifyClusterIamRolesError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Modifies the list of Identity and Access Management (IAM) roles that can be
 * used by the cluster to access other Amazon Web Services services.
 *
 * The maximum number of IAM roles that you can associate is subject to a quota.
 * For more information, go to Quotas and limits
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const modifyClusterIamRoles: API.OperationMethod<
  ModifyClusterIamRolesMessage,
  ModifyClusterIamRolesResult,
  ModifyClusterIamRolesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5216, __c163, 0) as any as S.Schema<ModifyClusterIamRolesMessage>,
  output: __S(5217, __c163, 1) as any as S.Schema<ModifyClusterIamRolesResult>,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterIamRoles",
}));

export type ModifyClusterMaintenanceError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Modifies the maintenance settings of a cluster.
 */
export const modifyClusterMaintenance: API.OperationMethod<
  ModifyClusterMaintenanceMessage,
  ModifyClusterMaintenanceResult,
  ModifyClusterMaintenanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5248, __c164, 0) as any as S.Schema<ModifyClusterMaintenanceMessage>,
  output: __S(5249, __c164, 1) as any as S.Schema<ModifyClusterMaintenanceResult>,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterMaintenance",
}));

export type ModifyClusterParameterGroupError =
  | ClusterParameterGroupNotFoundFault
  | InvalidClusterParameterGroupStateFault
  | CommonErrors;
/**
 * Modifies the parameters of a parameter group. For the parameters parameter, it can't contain ASCII characters.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const modifyClusterParameterGroup: API.OperationMethod<
  ModifyClusterParameterGroupMessage,
  ClusterParameterGroupNameMessage,
  ModifyClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5280, __c165, 0) as any as S.Schema<ModifyClusterParameterGroupMessage>,
  output: __S(5312, __c166, 0) as any as S.Schema<ClusterParameterGroupNameMessage>,
  errors: [ClusterParameterGroupNotFoundFault, InvalidClusterParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterParameterGroup",
}));

export type ModifyClusterSnapshotError =
  | ClusterSnapshotNotFoundFault
  | InvalidClusterSnapshotStateFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Modifies the settings for a snapshot.
 *
 * This exanmple modifies the manual retention period setting for a cluster snapshot.
 */
export const modifyClusterSnapshot: API.OperationMethod<
  ModifyClusterSnapshotMessage,
  ModifyClusterSnapshotResult,
  ModifyClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5344, __c167, 0) as any as S.Schema<ModifyClusterSnapshotMessage>,
  output: __S(5345, __c167, 1) as any as S.Schema<ModifyClusterSnapshotResult>,
  errors: [
    ClusterSnapshotNotFoundFault,
    InvalidClusterSnapshotStateFault,
    InvalidRetentionPeriodFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterSnapshot",
}));

export type ModifyClusterSnapshotScheduleError =
  | ClusterNotFoundFault
  | InvalidClusterSnapshotScheduleStateFault
  | SnapshotScheduleNotFoundFault
  | CommonErrors;
/**
 * Modifies a snapshot schedule for a cluster.
 */
export const modifyClusterSnapshotSchedule: API.OperationMethod<
  ModifyClusterSnapshotScheduleMessage,
  ModifyClusterSnapshotScheduleResponse,
  ModifyClusterSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5376, __c168, 0) as any as S.Schema<ModifyClusterSnapshotScheduleMessage>,
  output: __S(5377, __c168, 1) as any as S.Schema<ModifyClusterSnapshotScheduleResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterSnapshotScheduleStateFault,
    SnapshotScheduleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterSnapshotSchedule",
}));

export type ModifyClusterSubnetGroupError =
  | ClusterSubnetGroupNotFoundFault
  | ClusterSubnetQuotaExceededFault
  | DependentServiceRequestThrottlingFault
  | InvalidSubnet
  | SubnetAlreadyInUse
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Modifies a cluster subnet group to include the specified list of VPC subnets. The
 * operation replaces the existing list of subnets with the new list of subnets.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 */
export const modifyClusterSubnetGroup: API.OperationMethod<
  ModifyClusterSubnetGroupMessage,
  ModifyClusterSubnetGroupResult,
  ModifyClusterSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5408, __c169, 0) as any as S.Schema<ModifyClusterSubnetGroupMessage>,
  output: __S(5409, __c169, 1) as any as S.Schema<ModifyClusterSubnetGroupResult>,
  errors: [
    ClusterSubnetGroupNotFoundFault,
    ClusterSubnetQuotaExceededFault,
    DependentServiceRequestThrottlingFault,
    InvalidSubnet,
    SubnetAlreadyInUse,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterSubnetGroup",
}));

export type ModifyCustomDomainAssociationError =
  | ClusterNotFoundFault
  | CustomCnameAssociationFault
  | CustomDomainAssociationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Contains information for changing a custom domain association.
 */
export const modifyCustomDomainAssociation: API.OperationMethod<
  ModifyCustomDomainAssociationMessage,
  ModifyCustomDomainAssociationResult,
  ModifyCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5440, __c170, 0) as any as S.Schema<ModifyCustomDomainAssociationMessage>,
  output: __S(5441, __c170, 1) as any as S.Schema<ModifyCustomDomainAssociationResult>,
  errors: [
    ClusterNotFoundFault,
    CustomCnameAssociationFault,
    CustomDomainAssociationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCustomDomainAssociation",
}));

export type ModifyEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidEndpointStateFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Modifies a Redshift-managed VPC endpoint.
 */
export const modifyEndpointAccess: API.OperationMethod<
  ModifyEndpointAccessMessage,
  EndpointAccess,
  ModifyEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5472, __c171, 0) as any as S.Schema<ModifyEndpointAccessMessage>,
  output: __S(1440, __c45, 0) as any as S.Schema<EndpointAccess>,
  errors: [
    ClusterNotFoundFault,
    EndpointNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidEndpointStateFault,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEndpointAccess",
}));

export type ModifyEventSubscriptionError =
  | InvalidSubscriptionStateFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | SNSTopicArnNotFoundFault
  | SourceNotFoundFault
  | SubscriptionCategoryNotFoundFault
  | SubscriptionEventIdNotFoundFault
  | SubscriptionNotFoundFault
  | SubscriptionSeverityNotFoundFault
  | CommonErrors;
/**
 * Modifies an existing Amazon Redshift event notification subscription.
 */
export const modifyEventSubscription: API.OperationMethod<
  ModifyEventSubscriptionMessage,
  ModifyEventSubscriptionResult,
  ModifyEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5504, __c172, 0) as any as S.Schema<ModifyEventSubscriptionMessage>,
  output: __S(5505, __c172, 1) as any as S.Schema<ModifyEventSubscriptionResult>,
  errors: [
    InvalidSubscriptionStateFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
    SNSTopicArnNotFoundFault,
    SourceNotFoundFault,
    SubscriptionCategoryNotFoundFault,
    SubscriptionEventIdNotFoundFault,
    SubscriptionNotFoundFault,
    SubscriptionSeverityNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEventSubscription",
}));

export type ModifyIntegrationError =
  | IntegrationAlreadyExistsFault
  | IntegrationConflictOperationFault
  | IntegrationConflictStateFault
  | IntegrationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies a zero-ETL integration or S3 event integration with Amazon Redshift.
 */
export const modifyIntegration: API.OperationMethod<
  ModifyIntegrationMessage,
  Integration,
  ModifyIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5536, __c173, 0) as any as S.Schema<ModifyIntegrationMessage>,
  output: __S(1761, __c55, 1) as any as S.Schema<Integration>,
  errors: [
    IntegrationAlreadyExistsFault,
    IntegrationConflictOperationFault,
    IntegrationConflictStateFault,
    IntegrationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyIntegration",
}));

export type ModifyLakehouseConfigurationError =
  | ClusterNotFoundFault
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | InvalidClusterStateFault
  | RedshiftIdcApplicationNotExistsFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies the lakehouse configuration for a cluster. This operation allows you to manage Amazon Redshift federated permissions and Amazon Web Services IAM Identity Center trusted identity propagation.
 */
export const modifyLakehouseConfiguration: API.OperationMethod<
  ModifyLakehouseConfigurationMessage,
  LakehouseConfiguration,
  ModifyLakehouseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5568, __c174, 0) as any as S.Schema<ModifyLakehouseConfigurationMessage>,
  output: __S(5569, __c174, 1) as any as S.Schema<LakehouseConfiguration>,
  errors: [
    ClusterNotFoundFault,
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    InvalidClusterStateFault,
    RedshiftIdcApplicationNotExistsFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyLakehouseConfiguration",
}));

export type ModifyQev2IdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies an Amazon Redshift Query Editor (QEV2) IAM Identity Center application.
 */
export const modifyQev2IdcApplication: API.OperationMethod<
  ModifyQev2IdcApplicationMessage,
  ModifyQev2IdcApplicationResult,
  ModifyQev2IdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5600, __c175, 0) as any as S.Schema<ModifyQev2IdcApplicationMessage>,
  output: __S(5601, __c175, 1) as any as S.Schema<ModifyQev2IdcApplicationResult>,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyQev2IdcApplication",
}));

export type ModifyRedshiftIdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | RedshiftIdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Changes an existing Amazon Redshift IAM Identity Center application.
 */
export const modifyRedshiftIdcApplication: API.OperationMethod<
  ModifyRedshiftIdcApplicationMessage,
  ModifyRedshiftIdcApplicationResult,
  ModifyRedshiftIdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5632, __c176, 0) as any as S.Schema<ModifyRedshiftIdcApplicationMessage>,
  output: __S(5633, __c176, 1) as any as S.Schema<ModifyRedshiftIdcApplicationResult>,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    RedshiftIdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyRedshiftIdcApplication",
}));

export type ModifyScheduledActionError =
  | ClusterNotFoundFault
  | InvalidScheduledActionFault
  | InvalidScheduleFault
  | ScheduledActionNotFoundFault
  | ScheduledActionTypeUnsupportedFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies a scheduled action.
 */
export const modifyScheduledAction: API.OperationMethod<
  ModifyScheduledActionMessage,
  ScheduledAction,
  ModifyScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5664, __c177, 0) as any as S.Schema<ModifyScheduledActionMessage>,
  output: __S(1986, __c62, 2) as any as S.Schema<ScheduledAction>,
  errors: [
    ClusterNotFoundFault,
    InvalidScheduledActionFault,
    InvalidScheduleFault,
    ScheduledActionNotFoundFault,
    ScheduledActionTypeUnsupportedFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyScheduledAction",
}));

export type ModifySnapshotCopyRetentionPeriodError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | SnapshotCopyDisabledFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Modifies the number of days to retain snapshots in the destination Amazon Web Services Region after
 * they are copied from the source Amazon Web Services Region. By default, this operation only changes the
 * retention period of copied automated snapshots. The retention periods for both new and
 * existing copied automated snapshots are updated with the new retention period. You can
 * set the manual option to change only the retention periods of copied manual snapshots.
 * If you set this option, only newly copied manual snapshots have the new retention
 * period.
 */
export const modifySnapshotCopyRetentionPeriod: API.OperationMethod<
  ModifySnapshotCopyRetentionPeriodMessage,
  ModifySnapshotCopyRetentionPeriodResult,
  ModifySnapshotCopyRetentionPeriodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5696, __c178, 0) as any as S.Schema<ModifySnapshotCopyRetentionPeriodMessage>,
  output: __S(5697, __c178, 1) as any as S.Schema<ModifySnapshotCopyRetentionPeriodResult>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
    SnapshotCopyDisabledFault,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifySnapshotCopyRetentionPeriod",
}));

export type ModifySnapshotScheduleError =
  | InvalidScheduleFault
  | SnapshotScheduleNotFoundFault
  | SnapshotScheduleUpdateInProgressFault
  | CommonErrors;
/**
 * Modifies a snapshot schedule. Any schedule associated with a cluster is modified
 * asynchronously.
 */
export const modifySnapshotSchedule: API.OperationMethod<
  ModifySnapshotScheduleMessage,
  SnapshotSchedule,
  ModifySnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5728, __c179, 0) as any as S.Schema<ModifySnapshotScheduleMessage>,
  output: __S(2212, __c69, 4) as any as S.Schema<SnapshotSchedule>,
  errors: [
    InvalidScheduleFault,
    SnapshotScheduleNotFoundFault,
    SnapshotScheduleUpdateInProgressFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifySnapshotSchedule",
}));

export type ModifyUsageLimitError =
  | InvalidUsageLimitFault
  | UnsupportedOperationFault
  | UsageLimitNotFoundFault
  | CommonErrors;
/**
 * Modifies a usage limit in a cluster.
 * You can't modify the feature type or period of a usage limit.
 */
export const modifyUsageLimit: API.OperationMethod<
  ModifyUsageLimitMessage,
  UsageLimit,
  ModifyUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5760, __c180, 0) as any as S.Schema<ModifyUsageLimitMessage>,
  output: __S(2304, __c72, 0) as any as S.Schema<UsageLimit>,
  errors: [InvalidUsageLimitFault, UnsupportedOperationFault, UsageLimitNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyUsageLimit",
}));

export type PauseClusterError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Pauses a cluster.
 */
export const pauseCluster: API.OperationMethod<
  PauseClusterMessage,
  PauseClusterResult,
  PauseClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<PauseClusterMessage>,
  output: __S(5792, __c181, 0) as any as S.Schema<PauseClusterResult>,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseCluster",
}));

export type PurchaseReservedNodeOfferingError =
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeOfferingNotFoundFault
  | ReservedNodeQuotaExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Allows you to purchase reserved nodes. Amazon Redshift offers a predefined set of
 * reserved node offerings. You can purchase one or more of the offerings. You can call the
 * DescribeReservedNodeOfferings API to obtain the available reserved
 * node offerings. You can call this API by providing a specific reserved node offering and
 * the number of nodes you want to reserve.
 *
 * For more information about reserved node offerings, go to
 * Purchasing Reserved Nodes
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const purchaseReservedNodeOffering: API.OperationMethod<
  PurchaseReservedNodeOfferingMessage,
  PurchaseReservedNodeOfferingResult,
  PurchaseReservedNodeOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5824, __c182, 0) as any as S.Schema<PurchaseReservedNodeOfferingMessage>,
  output: __S(5825, __c182, 1) as any as S.Schema<PurchaseReservedNodeOfferingResult>,
  errors: [
    ReservedNodeAlreadyExistsFault,
    ReservedNodeOfferingNotFoundFault,
    ReservedNodeQuotaExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseReservedNodeOffering",
}));

export type PutResourcePolicyError =
  | ConflictPolicyUpdateFault
  | InvalidPolicyFault
  | ResourceNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Updates the resource policy for a specified resource.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyMessage,
  PutResourcePolicyResult,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5856, __c183, 0) as any as S.Schema<PutResourcePolicyMessage>,
  output: __S(5857, __c183, 1) as any as S.Schema<PutResourcePolicyResult>,
  errors: [
    ConflictPolicyUpdateFault,
    InvalidPolicyFault,
    ResourceNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RebootClusterError = ClusterNotFoundFault | InvalidClusterStateFault | CommonErrors;
/**
 * Reboots a cluster. This action is taken as soon as possible. It results in a
 * momentary outage to the cluster, during which the cluster status is set to
 * `rebooting`. A cluster event is created when the reboot is completed. Any
 * pending cluster modifications (see ModifyCluster) are applied at this
 * reboot.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const rebootCluster: API.OperationMethod<
  RebootClusterMessage,
  RebootClusterResult,
  RebootClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5888, __c184, 0) as any as S.Schema<RebootClusterMessage>,
  output: __S(5889, __c184, 1) as any as S.Schema<RebootClusterResult>,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootCluster",
}));

export type RegisterNamespaceError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * Registers a cluster or serverless namespace to the Amazon Web Services Glue Data Catalog.
 */
export const registerNamespace: API.OperationMethod<
  RegisterNamespaceInputMessage,
  RegisterNamespaceOutputMessage,
  RegisterNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5920, __c185, 0) as any as S.Schema<RegisterNamespaceInputMessage>,
  output: __S(5921, __c185, 1) as any as S.Schema<RegisterNamespaceOutputMessage>,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault, InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterNamespace",
}));

export type RejectDataShareError = InvalidDataShareFault | CommonErrors;
/**
 * From a datashare consumer account, rejects the specified datashare.
 */
export const rejectDataShare: API.OperationMethod<
  RejectDataShareMessage,
  DataShare,
  RejectDataShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5952, __c186, 0) as any as S.Schema<RejectDataShareMessage>,
  output: __S(226, __c7, 2) as any as S.Schema<DataShare>,
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectDataShare",
}));

export type ResetClusterParameterGroupError =
  | ClusterParameterGroupNotFoundFault
  | InvalidClusterParameterGroupStateFault
  | CommonErrors;
/**
 * Sets one or more parameters of the specified parameter group to their default
 * values and sets the source values of the parameters to "engine-default". To reset the
 * entire parameter group specify the *ResetAllParameters* parameter.
 * For parameter changes to take effect you must reboot any associated clusters.
 */
export const resetClusterParameterGroup: API.OperationMethod<
  ResetClusterParameterGroupMessage,
  ClusterParameterGroupNameMessage,
  ResetClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5984, __c187, 0) as any as S.Schema<ResetClusterParameterGroupMessage>,
  output: __S(5312, __c166, 0) as any as S.Schema<ClusterParameterGroupNameMessage>,
  errors: [ClusterParameterGroupNotFoundFault, InvalidClusterParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetClusterParameterGroup",
}));

export type ResizeClusterError =
  | ClusterNotFoundFault
  | DependentServiceUnavailableFault
  | InsufficientClusterCapacityFault
  | InvalidClusterStateFault
  | InvalidReservedNodeStateFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | UnsupportedOptionFault
  | CommonErrors;
/**
 * Changes the size of the cluster. You can change the cluster's type, or change the
 * number or type of nodes. The default behavior is to use the elastic resize method. With
 * an elastic resize, your cluster is available for read and write operations more quickly
 * than with the classic resize method.
 *
 * Elastic resize operations have the following restrictions:
 *
 * - You can only resize clusters of the following types:
 *
 * - dc2.large
 *
 * - dc2.8xlarge
 *
 * - rg.large
 *
 * - rg.xlarge
 *
 * - rg.4xlarge
 *
 * - rg.12xlarge
 *
 * - ra3.large
 *
 * - ra3.xlplus
 *
 * - ra3.4xlarge
 *
 * - ra3.16xlarge
 *
 * - The type of nodes that you add must match the node type for the
 * cluster.
 */
export const resizeCluster: API.OperationMethod<
  ResizeClusterMessage,
  ResizeClusterResult,
  ResizeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<ResizeClusterMessage>,
  output: __S(6016, __c188, 0) as any as S.Schema<ResizeClusterResult>,
  errors: [
    ClusterNotFoundFault,
    DependentServiceUnavailableFault,
    InsufficientClusterCapacityFault,
    InvalidClusterStateFault,
    InvalidReservedNodeStateFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
    UnsupportedOptionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResizeCluster",
}));

export type RestoreFromClusterSnapshotError =
  | AccessToSnapshotDeniedFault
  | ClusterAlreadyExistsFault
  | ClusterParameterGroupNotFoundFault
  | ClusterQuotaExceededFault
  | ClusterSecurityGroupNotFoundFault
  | ClusterSnapshotNotFoundFault
  | ClusterSubnetGroupNotFoundFault
  | DependentServiceAccessDeniedFault
  | DependentServiceRequestThrottlingFault
  | DependentServiceUnavailableFault
  | HsmClientCertificateNotFoundFault
  | HsmConfigurationNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterSnapshotStateFault
  | InvalidClusterSubnetGroupStateFault
  | InvalidClusterTrackFault
  | InvalidElasticIpFault
  | InvalidReservedNodeStateFault
  | InvalidRestoreFault
  | InvalidSubnet
  | InvalidTagFault
  | InvalidVPCNetworkStateFault
  | Ipv6CidrBlockNotFoundFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | RedshiftIdcApplicationNotExistsFault
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | SnapshotScheduleNotFoundFault
  | TagLimitExceededFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a new cluster from a snapshot. By default, Amazon Redshift creates the resulting
 * cluster with the same configuration as the original cluster from which the snapshot was
 * created, except that the new cluster is created with the default cluster security and
 * parameter groups. After Amazon Redshift creates the cluster, you can use the ModifyCluster API to associate a different security group and different
 * parameter group with the restored cluster. If you are using a DS node type, you can also
 * choose to change to another DS node type of the same size during restore.
 *
 * If you restore a cluster into a VPC, you must provide a cluster subnet group where
 * you want the cluster restored.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const restoreFromClusterSnapshot: API.OperationMethod<
  RestoreFromClusterSnapshotMessage,
  RestoreFromClusterSnapshotResult,
  RestoreFromClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6048, __c189, 0) as any as S.Schema<RestoreFromClusterSnapshotMessage>,
  output: __S(6049, __c189, 1) as any as S.Schema<RestoreFromClusterSnapshotResult>,
  errors: [
    AccessToSnapshotDeniedFault,
    ClusterAlreadyExistsFault,
    ClusterParameterGroupNotFoundFault,
    ClusterQuotaExceededFault,
    ClusterSecurityGroupNotFoundFault,
    ClusterSnapshotNotFoundFault,
    ClusterSubnetGroupNotFoundFault,
    DependentServiceAccessDeniedFault,
    DependentServiceRequestThrottlingFault,
    DependentServiceUnavailableFault,
    HsmClientCertificateNotFoundFault,
    HsmConfigurationNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterSnapshotStateFault,
    InvalidClusterSubnetGroupStateFault,
    InvalidClusterTrackFault,
    InvalidElasticIpFault,
    InvalidReservedNodeStateFault,
    InvalidRestoreFault,
    InvalidSubnet,
    InvalidTagFault,
    InvalidVPCNetworkStateFault,
    Ipv6CidrBlockNotFoundFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    RedshiftIdcApplicationNotExistsFault,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    SnapshotScheduleNotFoundFault,
    TagLimitExceededFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromClusterSnapshot",
}));

export type RestoreTableFromClusterSnapshotError =
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | InProgressTableRestoreQuotaExceededFault
  | InvalidClusterSnapshotStateFault
  | InvalidClusterStateFault
  | InvalidTableRestoreArgumentFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a new table from a table in an Amazon Redshift cluster snapshot. You must
 * create the new table within the Amazon Redshift cluster that the snapshot was taken
 * from.
 *
 * You cannot use `RestoreTableFromClusterSnapshot` to restore a table with
 * the same name as an existing table in an Amazon Redshift cluster. That is, you cannot
 * overwrite an existing table in a cluster with a restored table. If you want to replace
 * your original table with a new, restored table, then rename or drop your original table
 * before you call `RestoreTableFromClusterSnapshot`. When you have renamed your
 * original table, then you can pass the original name of the table as the
 * `NewTableName` parameter value in the call to
 * `RestoreTableFromClusterSnapshot`. This way, you can replace the original
 * table with the table created from the snapshot.
 *
 * You can't use this operation to restore tables with
 * interleaved sort keys.
 */
export const restoreTableFromClusterSnapshot: API.OperationMethod<
  RestoreTableFromClusterSnapshotMessage,
  RestoreTableFromClusterSnapshotResult,
  RestoreTableFromClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6080, __c190, 0) as any as S.Schema<RestoreTableFromClusterSnapshotMessage>,
  output: __S(6081, __c190, 1) as any as S.Schema<RestoreTableFromClusterSnapshotResult>,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    InProgressTableRestoreQuotaExceededFault,
    InvalidClusterSnapshotStateFault,
    InvalidClusterStateFault,
    InvalidTableRestoreArgumentFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableFromClusterSnapshot",
}));

export type ResumeClusterError =
  | ClusterNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Resumes a paused cluster.
 */
export const resumeCluster: API.OperationMethod<
  ResumeClusterMessage,
  ResumeClusterResult,
  ResumeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<ResumeClusterMessage>,
  output: __S(6112, __c191, 0) as any as S.Schema<ResumeClusterResult>,
  errors: [
    ClusterNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeCluster",
}));

export type RevokeClusterSecurityGroupIngressError =
  | AuthorizationNotFoundFault
  | ClusterSecurityGroupNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | CommonErrors;
/**
 * Revokes an ingress rule in an Amazon Redshift security group for a previously authorized
 * IP range or Amazon EC2 security group. To add an ingress rule, see AuthorizeClusterSecurityGroupIngress.
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const revokeClusterSecurityGroupIngress: API.OperationMethod<
  RevokeClusterSecurityGroupIngressMessage,
  RevokeClusterSecurityGroupIngressResult,
  RevokeClusterSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6144, __c192, 0) as any as S.Schema<RevokeClusterSecurityGroupIngressMessage>,
  output: __S(6145, __c192, 1) as any as S.Schema<RevokeClusterSecurityGroupIngressResult>,
  errors: [
    AuthorizationNotFoundFault,
    ClusterSecurityGroupNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeClusterSecurityGroupIngress",
}));

export type RevokeEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointAuthorizationNotFoundFault
  | EndpointNotFoundFault
  | InvalidAuthorizationStateFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidEndpointStateFault
  | CommonErrors;
/**
 * Revokes access to a cluster.
 */
export const revokeEndpointAccess: API.OperationMethod<
  RevokeEndpointAccessMessage,
  EndpointAuthorization,
  RevokeEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6176, __c193, 0) as any as S.Schema<RevokeEndpointAccessMessage>,
  output: __S(449, __c14, 1) as any as S.Schema<EndpointAuthorization>,
  errors: [
    ClusterNotFoundFault,
    EndpointAuthorizationNotFoundFault,
    EndpointNotFoundFault,
    InvalidAuthorizationStateFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidEndpointStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeEndpointAccess",
}));

export type RevokeSnapshotAccessError =
  | AccessToSnapshotDeniedFault
  | AuthorizationNotFoundFault
  | ClusterSnapshotNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Removes the ability of the specified Amazon Web Services account to restore the specified
 * snapshot. If the account is currently restoring the snapshot, the restore will run to
 * completion.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const revokeSnapshotAccess: API.OperationMethod<
  RevokeSnapshotAccessMessage,
  RevokeSnapshotAccessResult,
  RevokeSnapshotAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6208, __c194, 0) as any as S.Schema<RevokeSnapshotAccessMessage>,
  output: __S(6209, __c194, 1) as any as S.Schema<RevokeSnapshotAccessResult>,
  errors: [
    AccessToSnapshotDeniedFault,
    AuthorizationNotFoundFault,
    ClusterSnapshotNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeSnapshotAccess",
}));

export type RotateEncryptionKeyError =
  | ClusterNotFoundFault
  | DependentServiceRequestThrottlingFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Rotates the encryption keys for a cluster.
 */
export const rotateEncryptionKey: API.OperationMethod<
  RotateEncryptionKeyMessage,
  RotateEncryptionKeyResult,
  RotateEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6240, __c195, 0) as any as S.Schema<RotateEncryptionKeyMessage>,
  output: __S(6241, __c195, 1) as any as S.Schema<RotateEncryptionKeyResult>,
  errors: [
    ClusterNotFoundFault,
    DependentServiceRequestThrottlingFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RotateEncryptionKey",
}));

export type UpdatePartnerStatusError =
  | ClusterNotFoundFault
  | PartnerNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Updates the status of a partner integration.
 */
export const updatePartnerStatus: API.OperationMethod<
  UpdatePartnerStatusInputMessage,
  PartnerIntegrationOutputMessage,
  UpdatePartnerStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6272, __c196, 0) as any as S.Schema<UpdatePartnerStatusInputMessage>,
  output: __S(160, __c5, 0) as any as S.Schema<PartnerIntegrationOutputMessage>,
  errors: [
    ClusterNotFoundFault,
    PartnerNotFoundFault,
    UnauthorizedPartnerIntegrationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePartnerStatus",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedNodeId: S.optional(S.String),
          TargetReservedNodeOfferingId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AcceptReservedNodeExchangeInputMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ExchangedReservedNode: S.optional(__S(96, __c3, 0)) }).pipe(ns),
      ).annotate({ identifier: "AcceptReservedNodeExchangeOutputMessage" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NetworkInterfaceId: S.optional(S.String),
          SubnetId: S.optional(S.String),
          PrivateIpAddress: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          Ipv6Address: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkInterface" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(32, __c1, 0)
          .pipe(/*@__PURE__*/ T.XmlName("NetworkInterface"))
          .annotate({ identifier: "NetworkInterface" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          VpcEndpointId: S.optional(S.String),
          VpcId: S.optional(S.String),
          NetworkInterfaces: S.optional(__S(33, __c1, 1)),
        }),
      ).annotate({ identifier: "VpcEndpoint" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(34, __c1, 2)
          .pipe(/*@__PURE__*/ T.XmlName("VpcEndpoint"))
          .annotate({ identifier: "VpcEndpoint" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          Address: S.optional(S.String),
          Port: S.optional(S.Number),
          VpcEndpoints: S.optional(__S(35, __c1, 3)),
        }),
      ).annotate({ identifier: "Endpoint" });
  }
}
function __c2(j: number): any {
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
        /*@__PURE__*/ __S(64, __c2, 0)
          .pipe(/*@__PURE__*/ T.XmlName("RecurringCharge"))
          .annotate({ identifier: "RecurringCharge" }),
      );
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedNodeId: S.optional(S.String),
          ReservedNodeOfferingId: S.optional(S.String),
          NodeType: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Duration: S.optional(S.Number),
          FixedPrice: S.optional(S.Number),
          UsagePrice: S.optional(S.Number),
          CurrencyCode: S.optional(S.String),
          NodeCount: S.optional(S.Number),
          State: S.optional(S.String),
          OfferingType: S.optional(S.String),
          RecurringCharges: S.optional(__S(65, __c2, 1)),
          ReservedNodeOfferingType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReservedNode" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          PartnerName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PartnerIntegrationInputMessage" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatabaseName: S.optional(S.String), PartnerName: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "PartnerIntegrationOutputMessage" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataShareArn: S.optional(S.String),
          AssociateEntireAccount: S.optional(S.Boolean),
          ConsumerArn: S.optional(S.String),
          ConsumerRegion: S.optional(S.String),
          AllowWrites: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateDataShareConsumerMessage" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConsumerIdentifier: S.optional(S.String),
          Status: S.optional(S.String),
          ConsumerRegion: S.optional(S.String),
          CreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StatusChangeDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ProducerAllowedWrites: S.optional(S.Boolean),
          ConsumerAcceptedWrites: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DataShareAssociation" });
    case 1:
      return S.Array(__S(224, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DataShareArn: S.optional(S.String),
          ProducerArn: S.optional(S.String),
          AllowPubliclyAccessibleConsumers: S.optional(S.Boolean),
          DataShareAssociations: S.optional(__S(225, __c7, 1)),
          ManagedBy: S.optional(S.String),
          DataShareType: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DataShare" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterSecurityGroupName: S.optional(S.String),
          CIDRIP: S.optional(S.String),
          EC2SecurityGroupName: S.optional(S.String),
          EC2SecurityGroupOwnerId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AuthorizeClusterSecurityGroupIngressMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterSecurityGroup: S.optional(__S(356, __c11, 4)) }).pipe(ns),
      ).annotate({ identifier: "AuthorizeClusterSecurityGroupIngressResult" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(288, __c9, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "Tag" }),
      );
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          EC2SecurityGroupName: S.optional(S.String),
          EC2SecurityGroupOwnerId: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "EC2SecurityGroup" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(352, __c11, 0)
          .pipe(/*@__PURE__*/ T.XmlName("EC2SecurityGroup"))
          .annotate({ identifier: "EC2SecurityGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          CIDRIP: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "IPRange" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(354, __c11, 2)
          .pipe(/*@__PURE__*/ T.XmlName("IPRange"))
          .annotate({ identifier: "IPRange" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          ClusterSecurityGroupName: S.optional(S.String),
          Description: S.optional(S.String),
          EC2SecurityGroups: S.optional(__S(353, __c11, 1)),
          IPRanges: S.optional(__S(355, __c11, 3)),
          Tags: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "ClusterSecurityGroup" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataShareArn: S.optional(S.String),
          ConsumerIdentifier: S.optional(S.String),
          AllowWrites: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AuthorizeDataShareMessage" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          Account: S.optional(S.String),
          VpcIds: S.optional(__S(448, __c14, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AuthorizeEndpointAccessMessage" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("VpcIdentifier")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Grantor: S.optional(S.String),
          Grantee: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          AuthorizeTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ClusterStatus: S.optional(S.String),
          Status: S.optional(S.String),
          AllowedAllVPCs: S.optional(S.Boolean),
          AllowedVPCs: S.optional(__S(448, __c14, 0)),
          EndpointCount: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "EndpointAuthorization" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotIdentifier: S.optional(S.String),
          SnapshotArn: S.optional(S.String),
          SnapshotClusterIdentifier: S.optional(S.String),
          AccountWithRestoreAccess: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AuthorizeSnapshotAccessMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Snapshot: S.optional(__S(515, __c16, 3)) }).pipe(ns),
      ).annotate({ identifier: "AuthorizeSnapshotAccessResult" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), AccountAlias: S.optional(S.String) }),
      ).annotate({ identifier: "AccountWithRestoreAccess" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(512, __c16, 0)
          .pipe(/*@__PURE__*/ T.XmlName("AccountWithRestoreAccess"))
          .annotate({ identifier: "AccountWithRestoreAccess" }),
      );
    case 2:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("NodeType")));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SnapshotIdentifier: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          SnapshotCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Status: S.optional(S.String),
          Port: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          ClusterCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MasterUsername: S.optional(S.String),
          ClusterVersion: S.optional(S.String),
          EngineFullVersion: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          NodeType: S.optional(S.String),
          NumberOfNodes: S.optional(S.Number),
          DBName: S.optional(S.String),
          VpcId: S.optional(S.String),
          Encrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          EncryptedWithHSM: S.optional(S.Boolean),
          AccountsWithRestoreAccess: S.optional(__S(513, __c16, 1)),
          OwnerAccount: S.optional(S.String),
          TotalBackupSizeInMegaBytes: S.optional(S.Number),
          ActualIncrementalBackupSizeInMegaBytes: S.optional(S.Number),
          BackupProgressInMegaBytes: S.optional(S.Number),
          CurrentBackupRateInMegaBytesPerSecond: S.optional(S.Number),
          EstimatedSecondsToCompletion: S.optional(S.Number),
          ElapsedTimeInSeconds: S.optional(S.Number),
          SourceRegion: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
          RestorableNodeTypes: S.optional(__S(514, __c16, 2)),
          EnhancedVpcRouting: S.optional(S.Boolean),
          MaintenanceTrackName: S.optional(S.String),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
          ManualSnapshotRemainingDays: S.optional(S.Number),
          SnapshotRetentionStartTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          MasterPasswordSecretArn: S.optional(S.String),
          MasterPasswordSecretKmsKeyId: S.optional(S.String),
          SnapshotArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Snapshot" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(608, __c19, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DeleteClusterSnapshotMessage"))
          .annotate({ identifier: "DeleteClusterSnapshotMessage" }),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({ Identifiers: S.optional(__S(544, __c17, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchDeleteClusterSnapshotsRequest" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(577, __c18, 1)
          .pipe(/*@__PURE__*/ T.XmlName("SnapshotErrorMessage"))
          .annotate({ identifier: "SnapshotErrorMessage" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Resources: S.optional(__S(576, __c18, 0)),
          Errors: S.optional(__S(546, __c17, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "BatchDeleteClusterSnapshotsResult" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("String")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          SnapshotIdentifier: S.optional(S.String),
          SnapshotClusterIdentifier: S.optional(S.String),
          FailureCode: S.optional(S.String),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "SnapshotErrorMessage" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotIdentifier: S.optional(S.String),
          SnapshotClusterIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteClusterSnapshotMessage" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotIdentifierList: S.optional(__S(576, __c18, 0)),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
          Force: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchModifyClusterSnapshotsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(577, __c18, 1)
          .pipe(/*@__PURE__*/ T.XmlName("SnapshotErrorMessage"))
          .annotate({ identifier: "SnapshotErrorMessage" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Resources: S.optional(__S(576, __c18, 0)),
          Errors: S.optional(__S(641, __c20, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "BatchModifyClusterSnapshotsOutputMessage" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelResizeMessage" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Array(S.String);
    case 2:
      return S.Array(S.String);
    case 3:
      return S.suspend(() =>
        S.Struct({
          TargetNodeType: S.optional(S.String),
          TargetNumberOfNodes: S.optional(S.Number),
          TargetClusterType: S.optional(S.String),
          Status: S.optional(S.String),
          ImportTablesCompleted: S.optional(__S(704, __c22, 0)),
          ImportTablesInProgress: S.optional(__S(705, __c22, 1)),
          ImportTablesNotStarted: S.optional(__S(706, __c22, 2)),
          AvgResizeRateInMegaBytesPerSecond: S.optional(S.Number),
          TotalResizeDataInMegaBytes: S.optional(S.Number),
          ProgressInMegaBytes: S.optional(S.Number),
          ElapsedTimeInSeconds: S.optional(S.Number),
          EstimatedTimeToCompletionInSeconds: S.optional(S.Number),
          ResizeType: S.optional(S.String),
          Message: S.optional(S.String),
          TargetEncryptionType: S.optional(S.String),
          DataTransferProgressPercent: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "ResizeProgressMessage" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceSnapshotIdentifier: S.optional(S.String),
          SourceSnapshotClusterIdentifier: S.optional(S.String),
          TargetSnapshotIdentifier: S.optional(S.String),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Snapshot: S.optional(__S(515, __c16, 3)) }).pipe(ns),
      ).annotate({ identifier: "CopyClusterSnapshotResult" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationProfileName: S.optional(S.String),
          AuthenticationProfileContent: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAuthenticationProfileMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AuthenticationProfileName: S.optional(S.String),
          AuthenticationProfileContent: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateAuthenticationProfileResult" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBName: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          ClusterType: S.optional(S.String),
          NodeType: S.optional(S.String),
          MasterUsername: S.optional(S.String),
          MasterUserPassword: S.optional(SensitiveString),
          ClusterSecurityGroups: S.optional(__S(1024, __c32, 0)),
          VpcSecurityGroupIds: S.optional(__S(864, __c27, 0)),
          ClusterSubnetGroupName: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          ClusterParameterGroupName: S.optional(S.String),
          AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
          Port: S.optional(S.Number),
          ClusterVersion: S.optional(S.String),
          AllowVersionUpgrade: S.optional(S.Boolean),
          NumberOfNodes: S.optional(S.Number),
          PubliclyAccessible: S.optional(S.Boolean),
          Encrypted: S.optional(S.Boolean),
          HsmClientCertificateIdentifier: S.optional(S.String),
          HsmConfigurationIdentifier: S.optional(S.String),
          ElasticIp: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
          KmsKeyId: S.optional(S.String),
          EnhancedVpcRouting: S.optional(S.Boolean),
          AdditionalInfo: S.optional(S.String),
          IamRoles: S.optional(__S(1056, __c33, 0)),
          MaintenanceTrackName: S.optional(S.String),
          SnapshotScheduleIdentifier: S.optional(S.String),
          AvailabilityZoneRelocation: S.optional(S.Boolean),
          AquaConfigurationStatus: S.optional(S.String),
          DefaultIamRoleArn: S.optional(S.String),
          LoadSampleData: S.optional(S.String),
          ManageMasterPassword: S.optional(S.Boolean),
          MasterPasswordSecretKmsKeyId: S.optional(S.String),
          IpAddressType: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          RedshiftIdcApplicationArn: S.optional(S.String),
          CatalogName: S.optional(S.String),
          ExtraComputeForAutomaticOptimization: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "CreateClusterResult" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcSecurityGroupId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "VpcSecurityGroupMembership" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(832, __c26, 0)
          .pipe(/*@__PURE__*/ T.XmlName("VpcSecurityGroup"))
          .annotate({ identifier: "VpcSecurityGroupMembership" }),
      );
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("VpcSecurityGroupId")));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          S3Tables: S.optional(__S(896, __c28, 0)),
          S3TableNamespace: S.optional(S.String),
          S3TableGranularity: S.optional(S.String),
          EnabledAll: S.optional(S.Boolean),
          LastIngestionTimes: S.optional(__S(897, __c28, 1)),
        }),
      ).annotate({ identifier: "S3TablePublishStatus" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedNodeExchangeRequestId: S.optional(S.String),
          Status: S.optional(S.String),
          RequestTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SourceReservedNodeId: S.optional(S.String),
          SourceReservedNodeType: S.optional(S.String),
          SourceReservedNodeCount: S.optional(S.Number),
          TargetReservedNodeOfferingId: S.optional(S.String),
          TargetReservedNodeType: S.optional(S.String),
          TargetReservedNodeCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ReservedNodeExchangeStatus" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AquaStatus: S.optional(S.String),
          AquaConfigurationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AquaConfiguration" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterSecurityGroupName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "ClusterSecurityGroupMembership" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(992, __c31, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ClusterSecurityGroup"))
          .annotate({ identifier: "ClusterSecurityGroupMembership" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ParameterName: S.optional(S.String),
          ParameterApplyStatus: S.optional(S.String),
          ParameterApplyErrorDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClusterParameterStatus" });
    case 3:
      return S.Array(__S(994, __c31, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.optional(S.String),
          ParameterApplyStatus: S.optional(S.String),
          ClusterParameterStatusList: S.optional(__S(995, __c31, 3)),
        }),
      ).annotate({ identifier: "ClusterParameterGroupStatus" });
    case 5:
      return S.Array(
        /*@__PURE__*/ __S(996, __c31, 4)
          .pipe(/*@__PURE__*/ T.XmlName("ClusterParameterGroup"))
          .annotate({ identifier: "ClusterParameterGroupStatus" }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          MasterUserPassword: S.optional(SensitiveString),
          NodeType: S.optional(S.String),
          NumberOfNodes: S.optional(S.Number),
          ClusterType: S.optional(S.String),
          ClusterVersion: S.optional(S.String),
          AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
          ClusterIdentifier: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          EnhancedVpcRouting: S.optional(S.Boolean),
          MaintenanceTrackName: S.optional(S.String),
          EncryptionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "PendingModifiedValues" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          CurrentRestoreRateInMegaBytesPerSecond: S.optional(S.Number),
          SnapshotSizeInMegaBytes: S.optional(S.Number),
          ProgressInMegaBytes: S.optional(S.Number),
          ElapsedTimeInSeconds: S.optional(S.Number),
          EstimatedTimeToCompletionInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RestoreStatus" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          CurrentRateInMegaBytesPerSecond: S.optional(S.Number),
          TotalDataInMegaBytes: S.optional(S.Number),
          DataTransferredInMegaBytes: S.optional(S.Number),
          EstimatedTimeToCompletionInSeconds: S.optional(S.Number),
          ElapsedTimeInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DataTransferProgress" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          HsmClientCertificateIdentifier: S.optional(S.String),
          HsmConfigurationIdentifier: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "HsmStatus" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          DestinationRegion: S.optional(S.String),
          RetentionPeriod: S.optional(S.Number),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
          SnapshotCopyGrantName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClusterSnapshotCopyStatus" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          NodeRole: S.optional(S.String),
          PrivateIPAddress: S.optional(S.String),
          PublicIPAddress: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClusterNode" });
    case 12:
      return S.Array(__S(1003, __c31, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({ ElasticIp: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "ElasticIpStatus" });
    case 14:
      return S.suspend(() =>
        S.Struct({ IamRoleArn: S.optional(S.String), ApplyStatus: S.optional(S.String) }),
      ).annotate({ identifier: "ClusterIamRole" });
    case 15:
      return S.Array(
        /*@__PURE__*/ __S(1006, __c31, 14)
          .pipe(/*@__PURE__*/ T.XmlName("ClusterIamRole"))
          .annotate({ identifier: "ClusterIamRole" }),
      );
    case 16:
      return S.Array(S.String);
    case 17:
      return S.suspend(() =>
        S.Struct({
          DeferMaintenanceIdentifier: S.optional(S.String),
          DeferMaintenanceStartTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          DeferMaintenanceEndTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "DeferredMaintenanceWindow" });
    case 18:
      return S.Array(
        /*@__PURE__*/ __S(1009, __c31, 17)
          .pipe(/*@__PURE__*/ T.XmlName("DeferredMaintenanceWindow"))
          .annotate({ identifier: "DeferredMaintenanceWindow" }),
      );
    case 19:
      return S.suspend(() =>
        S.Struct({ ResizeType: S.optional(S.String), AllowCancelResize: S.optional(S.Boolean) }),
      ).annotate({ identifier: "ResizeInfo" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZone: S.optional(S.String),
          ClusterNodes: S.optional(__S(1004, __c31, 12)),
        }),
      ).annotate({ identifier: "SecondaryClusterInfo" });
    case 21:
      return S.suspend(() => S.Struct({ S3Tables: S.optional(__S(898, __c28, 2)) })).annotate({
        identifier: "LoggingPublishStatus",
      });
    case 22:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          NodeType: S.optional(S.String),
          ClusterStatus: S.optional(S.String),
          ClusterAvailabilityStatus: S.optional(S.String),
          ModifyStatus: S.optional(S.String),
          MasterUsername: S.optional(S.String),
          DBName: S.optional(S.String),
          Endpoint: S.optional(Endpoint),
          ClusterCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
          ClusterSecurityGroups: S.optional(__S(993, __c31, 1)),
          VpcSecurityGroups: S.optional(__S(833, __c26, 1)),
          ClusterParameterGroups: S.optional(__S(997, __c31, 5)),
          ClusterSubnetGroupName: S.optional(S.String),
          VpcId: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          PendingModifiedValues: S.optional(__S(998, __c31, 6)),
          ClusterVersion: S.optional(S.String),
          AllowVersionUpgrade: S.optional(S.Boolean),
          NumberOfNodes: S.optional(S.Number),
          PubliclyAccessible: S.optional(S.Boolean),
          Encrypted: S.optional(S.Boolean),
          RestoreStatus: S.optional(__S(999, __c31, 7)),
          DataTransferProgress: S.optional(__S(1000, __c31, 8)),
          HsmStatus: S.optional(__S(1001, __c31, 9)),
          ClusterSnapshotCopyStatus: S.optional(__S(1002, __c31, 10)),
          ClusterPublicKey: S.optional(S.String),
          ClusterNodes: S.optional(__S(1004, __c31, 12)),
          ElasticIpStatus: S.optional(__S(1005, __c31, 13)),
          ClusterRevisionNumber: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
          KmsKeyId: S.optional(S.String),
          EnhancedVpcRouting: S.optional(S.Boolean),
          IamRoles: S.optional(__S(1007, __c31, 15)),
          PendingActions: S.optional(__S(1008, __c31, 16)),
          MaintenanceTrackName: S.optional(S.String),
          ElasticResizeNumberOfNodeOptions: S.optional(S.String),
          DeferredMaintenanceWindows: S.optional(__S(1010, __c31, 18)),
          SnapshotScheduleIdentifier: S.optional(S.String),
          SnapshotScheduleState: S.optional(S.String),
          ExpectedNextSnapshotScheduleTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          ExpectedNextSnapshotScheduleTimeStatus: S.optional(S.String),
          NextMaintenanceWindowStartTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          ResizeInfo: S.optional(__S(1011, __c31, 19)),
          AvailabilityZoneRelocationStatus: S.optional(S.String),
          ClusterNamespaceArn: S.optional(S.String),
          TotalStorageCapacityInMegaBytes: S.optional(S.Number),
          AquaConfiguration: S.optional(__S(960, __c30, 0)),
          DefaultIamRoleArn: S.optional(S.String),
          ReservedNodeExchangeStatus: S.optional(__S(928, __c29, 0)),
          CustomDomainName: S.optional(S.String),
          CustomDomainCertificateArn: S.optional(S.String),
          CustomDomainCertificateExpiryDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          MasterPasswordSecretArn: S.optional(S.String),
          MasterPasswordSecretKmsKeyId: S.optional(S.String),
          IpAddressType: S.optional(S.String),
          MultiAZ: S.optional(S.String),
          MultiAZSecondary: S.optional(__S(1012, __c31, 20)),
          LakehouseRegistrationStatus: S.optional(S.String),
          CatalogArn: S.optional(S.String),
          ExtraComputeForAutomaticOptimization: S.optional(S.String),
          LoggingPublishStatus: S.optional(__S(1013, __c31, 21)),
        }),
      ).annotate({ identifier: "Cluster" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ClusterSecurityGroupName")),
      );
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("IamRoleArn")));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.optional(S.String),
          ParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterParameterGroup: S.optional(__S(1120, __c35, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateClusterParameterGroupResult" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.optional(S.String),
          ParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "ClusterParameterGroup" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterSecurityGroupName: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterSecurityGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterSecurityGroup: S.optional(__S(356, __c11, 4)) }).pipe(ns),
      ).annotate({ identifier: "CreateClusterSecurityGroupResult" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotIdentifier: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Snapshot: S.optional(__S(515, __c16, 3)) }).pipe(ns),
      ).annotate({ identifier: "CreateClusterSnapshotResult" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterSubnetGroupName: S.optional(S.String),
          Description: S.optional(S.String),
          SubnetIds: S.optional(__S(1344, __c42, 0)),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterSubnetGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterSubnetGroup: S.optional(__S(1314, __c41, 2)) }).pipe(ns),
      ).annotate({ identifier: "CreateClusterSubnetGroupResult" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("item")));
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "SupportedPlatform",
      });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1280, __c40, 0)
          .pipe(/*@__PURE__*/ T.XmlName("SupportedPlatform"))
          .annotate({ identifier: "SupportedPlatform" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          SupportedPlatforms: S.optional(__S(1281, __c40, 1)),
        }),
      ).annotate({ identifier: "AvailabilityZone" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetIdentifier: S.optional(S.String),
          SubnetAvailabilityZone: S.optional(__S(1282, __c40, 2)),
          SubnetStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Subnet" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1312, __c41, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Subnet"))
          .annotate({ identifier: "Subnet" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterSubnetGroupName: S.optional(S.String),
          Description: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetGroupStatus: S.optional(S.String),
          Subnets: S.optional(__S(1313, __c41, 1)),
          Tags: S.optional(__S(320, __c10, 0)),
          SupportedClusterIpAddressTypes: S.optional(__S(1248, __c39, 0)),
        }),
      ).annotate({ identifier: "ClusterSubnetGroup" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SubnetIdentifier")));
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CustomDomainName: S.optional(S.String),
          CustomDomainCertificateArn: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCustomDomainAssociationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CustomDomainName: S.optional(S.String),
          CustomDomainCertificateArn: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          CustomDomainCertExpiryTime: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateCustomDomainAssociationResult" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          ResourceOwner: S.optional(S.String),
          EndpointName: S.optional(S.String),
          SubnetGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(864, __c27, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEndpointAccessMessage" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          ResourceOwner: S.optional(S.String),
          SubnetGroupName: S.optional(S.String),
          EndpointStatus: S.optional(S.String),
          EndpointName: S.optional(S.String),
          EndpointCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Port: S.optional(S.Number),
          Address: S.optional(S.String),
          VpcSecurityGroups: S.optional(__S(833, __c26, 1)),
          VpcEndpoint: S.optional(__S(34, __c1, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "EndpointAccess" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SourceType: S.optional(S.String),
          SourceIds: S.optional(__S(1536, __c48, 0)),
          EventCategories: S.optional(__S(1504, __c47, 0)),
          Severity: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEventSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(1537, __c48, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateEventSubscriptionResult" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("EventCategory")));
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SourceId")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          CustomerAwsId: S.optional(S.String),
          CustSubscriptionId: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          Status: S.optional(S.String),
          SubscriptionCreationTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          SourceType: S.optional(S.String),
          SourceIdsList: S.optional(__S(1536, __c48, 0)),
          EventCategoriesList: S.optional(__S(1504, __c47, 0)),
          Severity: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
          Tags: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "EventSubscription" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HsmClientCertificateIdentifier: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateHsmClientCertificateMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ HsmClientCertificate: S.optional(__S(1600, __c50, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateHsmClientCertificateResult" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HsmClientCertificateIdentifier: S.optional(S.String),
          HsmClientCertificatePublicKey: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "HsmClientCertificate" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HsmConfigurationIdentifier: S.optional(S.String),
          Description: S.optional(S.String),
          HsmIpAddress: S.optional(S.String),
          HsmPartitionName: S.optional(S.String),
          HsmPartitionPassword: S.optional(S.String),
          HsmServerPublicCertificate: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateHsmConfigurationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ HsmConfiguration: S.optional(__S(1664, __c52, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateHsmConfigurationResult" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HsmConfigurationIdentifier: S.optional(S.String),
          Description: S.optional(S.String),
          HsmIpAddress: S.optional(S.String),
          HsmPartitionName: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "HsmConfiguration" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceArn: S.optional(S.String),
          TargetArn: S.optional(S.String),
          IntegrationName: S.optional(S.String),
          KMSKeyId: S.optional(S.String),
          TagList: S.optional(__S(320, __c10, 0)),
          AdditionalEncryptionContext: S.optional(__S(1760, __c55, 0)),
          Description: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateIntegrationMessage" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "IntegrationError" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1728, __c54, 0)
          .pipe(/*@__PURE__*/ T.XmlName("IntegrationError"))
          .annotate({ identifier: "IntegrationError" }),
      );
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          IntegrationArn: S.optional(S.String),
          IntegrationName: S.optional(S.String),
          SourceArn: S.optional(S.String),
          TargetArn: S.optional(S.String),
          Status: S.optional(S.String),
          Errors: S.optional(__S(1729, __c54, 1)),
          CreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          KMSKeyId: S.optional(S.String),
          AdditionalEncryptionContext: S.optional(__S(1760, __c55, 0)),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "Integration" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdcInstanceArn: S.optional(S.String),
          Qev2IdcApplicationName: S.optional(S.String),
          IdcDisplayName: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateQev2IdcApplicationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Qev2IdcApplication: S.optional(__S(1824, __c57, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateQev2IdcApplicationResult" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdcInstanceArn: S.optional(S.String),
          Qev2IdcApplicationName: S.optional(S.String),
          Qev2IdcApplicationArn: S.optional(S.String),
          IdcManagedApplicationArn: S.optional(S.String),
          IdcOnboardStatus: S.optional(S.String),
          IdcDisplayName: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "Qev2IdcApplication" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdcInstanceArn: S.optional(S.String),
          RedshiftIdcApplicationName: S.optional(S.String),
          IdentityNamespace: S.optional(S.String),
          IdcDisplayName: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
          AuthorizedTokenIssuerList: S.optional(__S(1922, __c60, 2)),
          ServiceIntegrations: S.optional(__S(1933, __c60, 13)),
          ApplicationType: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
          SsoTagKeys: S.optional(__S(1888, __c59, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRedshiftIdcApplicationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RedshiftIdcApplication: S.optional(__S(1934, __c60, 14)) }).pipe(ns),
      ).annotate({ identifier: "CreateRedshiftIdcApplicationResult" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("TagKey")));
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrustedTokenIssuerArn: S.optional(S.String),
          AuthorizedAudiencesList: S.optional(__S(1920, __c60, 0)),
        }),
      ).annotate({ identifier: "AuthorizedTokenIssuer" });
    case 2:
      return S.Array(__S(1921, __c60, 1));
    case 3:
      return S.suspend(() => S.Struct({ Authorization: S.optional(S.String) })).annotate({
        identifier: "LakeFormationQuery",
      });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ LakeFormationQuery: __S(1923, __c60, 3) })]);
    case 5:
      return S.Array(__S(1924, __c60, 4));
    case 6:
      return S.suspend(() => S.Struct({ Authorization: S.optional(S.String) })).annotate({
        identifier: "ReadWriteAccess",
      });
    case 7:
      return S.Union([/*@__PURE__*/ S.Struct({ ReadWriteAccess: __S(1926, __c60, 6) })]);
    case 8:
      return S.Array(__S(1927, __c60, 7));
    case 9:
      return S.suspend(() => S.Struct({ Authorization: S.optional(S.String) })).annotate({
        identifier: "Connect",
      });
    case 10:
      return S.Union([/*@__PURE__*/ S.Struct({ Connect: __S(1929, __c60, 9) })]);
    case 11:
      return S.Array(__S(1930, __c60, 10));
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ LakeFormation: __S(1925, __c60, 5) }),
        /*@__PURE__*/ S.Struct({ S3AccessGrants: __S(1928, __c60, 8) }),
        /*@__PURE__*/ S.Struct({ Redshift: __S(1931, __c60, 11) }),
      ]);
    case 13:
      return S.Array(__S(1932, __c60, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          IdcInstanceArn: S.optional(S.String),
          RedshiftIdcApplicationName: S.optional(S.String),
          RedshiftIdcApplicationArn: S.optional(S.String),
          IdentityNamespace: S.optional(S.String),
          IdcDisplayName: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
          IdcManagedApplicationArn: S.optional(S.String),
          IdcOnboardStatus: S.optional(S.String),
          AuthorizedTokenIssuerList: S.optional(__S(1922, __c60, 2)),
          ServiceIntegrations: S.optional(__S(1933, __c60, 13)),
          ApplicationType: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
          SsoTagKeys: S.optional(__S(1888, __c59, 0)),
        }),
      ).annotate({ identifier: "RedshiftIdcApplication" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScheduledActionName: S.optional(S.String),
          TargetAction: S.optional(__S(1984, __c62, 0)),
          Schedule: S.optional(S.String),
          IamRole: S.optional(S.String),
          ScheduledActionDescription: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Enable: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScheduledActionMessage" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResizeCluster: S.optional(__S(2048, __c64, 0)),
          PauseCluster: S.optional(__S(2016, __c63, 0)),
          ResumeCluster: S.optional(__S(2080, __c65, 0)),
        }),
      ).annotate({ identifier: "ScheduledActionType" });
    case 1:
      return S.Array(
        /*@__PURE__*/ T.DateFromString.pipe(/*@__PURE__*/ T.TimestampFormat("date-time")).pipe(
          /*@__PURE__*/ T.XmlName("ScheduledActionTime"),
        ),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ScheduledActionName: S.optional(S.String),
          TargetAction: S.optional(__S(1984, __c62, 0)),
          Schedule: S.optional(S.String),
          IamRole: S.optional(S.String),
          ScheduledActionDescription: S.optional(S.String),
          State: S.optional(S.String),
          NextInvocations: S.optional(__S(1985, __c62, 1)),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(ns),
      ).annotate({ identifier: "ScheduledAction" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PauseClusterMessage" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          ClusterType: S.optional(S.String),
          NodeType: S.optional(S.String),
          NumberOfNodes: S.optional(S.Number),
          Classic: S.optional(S.Boolean),
          ReservedNodeId: S.optional(S.String),
          TargetReservedNodeOfferingId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ResizeClusterMessage" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResumeClusterMessage" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotCopyGrantName: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotCopyGrantMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SnapshotCopyGrant: S.optional(__S(2144, __c67, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateSnapshotCopyGrantResult" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotCopyGrantName: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "SnapshotCopyGrant" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScheduleDefinitions: S.optional(__S(2208, __c69, 0)),
          ScheduleIdentifier: S.optional(S.String),
          ScheduleDescription: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
          DryRun: S.optional(S.Boolean),
          NextInvocations: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotScheduleMessage" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ScheduleDefinition")));
    case 1:
      return S.Array(
        /*@__PURE__*/ T.DateFromString.pipe(/*@__PURE__*/ T.TimestampFormat("date-time")).pipe(
          /*@__PURE__*/ T.XmlName("SnapshotTime"),
        ),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          ScheduleAssociationState: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClusterAssociatedToSchedule" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(2210, __c69, 2)
          .pipe(/*@__PURE__*/ T.XmlName("ClusterAssociatedToSchedule"))
          .annotate({ identifier: "ClusterAssociatedToSchedule" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          ScheduleDefinitions: S.optional(__S(2208, __c69, 0)),
          ScheduleIdentifier: S.optional(S.String),
          ScheduleDescription: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
          NextInvocations: S.optional(__S(2209, __c69, 1)),
          AssociatedClusterCount: S.optional(S.Number),
          AssociatedClusters: S.optional(__S(2211, __c69, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "SnapshotSchedule" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceName: S.optional(S.String), Tags: S.optional(__S(320, __c10, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTagsMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "CreateTagsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          FeatureType: S.optional(S.String),
          LimitType: S.optional(S.String),
          Amount: S.optional(S.Number),
          Period: S.optional(S.String),
          BreachAction: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUsageLimitMessage" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UsageLimitId: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          FeatureType: S.optional(S.String),
          LimitType: S.optional(S.String),
          Amount: S.optional(S.Number),
          Period: S.optional(S.String),
          BreachAction: S.optional(S.String),
          Tags: S.optional(__S(320, __c10, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "UsageLimit" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataShareArn: S.optional(S.String),
          ConsumerIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeauthorizeDataShareMessage" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AuthenticationProfileName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAuthenticationProfileMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AuthenticationProfileName: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DeleteAuthenticationProfileResult" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          SkipFinalClusterSnapshot: S.optional(S.Boolean),
          FinalClusterSnapshotIdentifier: S.optional(S.String),
          FinalClusterSnapshotRetentionPeriod: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "DeleteClusterResult" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteClusterParameterGroupMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteClusterParameterGroupResponse",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterSecurityGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteClusterSecurityGroupMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteClusterSecurityGroupResponse",
      });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Snapshot: S.optional(__S(515, __c16, 3)) }).pipe(ns),
      ).annotate({ identifier: "DeleteClusterSnapshotResult" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterSubnetGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteClusterSubnetGroupMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteClusterSubnetGroupResponse",
      });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          CustomDomainName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteCustomDomainAssociationMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteCustomDomainAssociationResponse",
      });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EndpointName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEndpointAccessMessage" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubscriptionName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventSubscriptionMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteEventSubscriptionResponse",
      });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HsmClientCertificateIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteHsmClientCertificateMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteHsmClientCertificateResponse",
      });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HsmConfigurationIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteHsmConfigurationMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteHsmConfigurationResponse",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IntegrationArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIntegrationMessage" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Qev2IdcApplicationArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteQev2IdcApplicationMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteQev2IdcApplicationResponse",
      });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RedshiftIdcApplicationArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRedshiftIdcApplicationMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteRedshiftIdcApplicationResponse",
      });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteResourcePolicyResponse",
      });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScheduledActionName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteScheduledActionMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteScheduledActionResponse",
      });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SnapshotCopyGrantName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSnapshotCopyGrantMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteSnapshotCopyGrantResponse",
      });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScheduleIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSnapshotScheduleMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteSnapshotScheduleResponse",
      });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceName: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteTagsMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "DeleteTagsResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UsageLimitId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUsageLimitMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteUsageLimitResponse",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamespaceIdentifier: S.optional(__S(3042, __c95, 2)),
          ConsumerIdentifiers: S.optional(__S(3043, __c95, 3)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeregisterNamespaceInputMessage" });
    case 1:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "DeregisterNamespaceOutputMessage",
      });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamespaceIdentifier: S.optional(S.String),
          WorkgroupIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServerlessIdentifier" });
    case 1:
      return S.suspend(() => S.Struct({ ClusterIdentifier: S.optional(S.String) })).annotate({
        identifier: "ProvisionedIdentifier",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ServerlessIdentifier: __S(3040, __c95, 0) }),
        /*@__PURE__*/ S.Struct({ ProvisionedIdentifier: __S(3041, __c95, 1) }),
      ]);
    case 3:
      return S.Array(S.String);
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AttributeName")));
    case 1:
      return S.suspend(() =>
        S.Struct({ AttributeNames: S.optional(__S(3072, __c96, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccountAttributesMessage" });
    case 2:
      return S.suspend(() => S.Struct({ AttributeValue: S.optional(S.String) })).annotate({
        identifier: "AttributeValueTarget",
      });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(3074, __c96, 2)
          .pipe(/*@__PURE__*/ T.XmlName("AttributeValueTarget"))
          .annotate({ identifier: "AttributeValueTarget" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          AttributeName: S.optional(S.String),
          AttributeValues: S.optional(__S(3075, __c96, 3)),
        }),
      ).annotate({ identifier: "AccountAttribute" });
    case 5:
      return S.Array(
        /*@__PURE__*/ __S(3076, __c96, 4)
          .pipe(/*@__PURE__*/ T.XmlName("AccountAttribute"))
          .annotate({ identifier: "AccountAttribute" }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({ AccountAttributes: S.optional(__S(3077, __c96, 5)) }).pipe(ns),
      ).annotate({ identifier: "AccountAttributeList" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AuthenticationProfileName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAuthenticationProfilesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AuthenticationProfileName: S.optional(S.String),
          AuthenticationProfileContent: S.optional(S.String),
        }),
      ).annotate({ identifier: "AuthenticationProfile" });
    case 2:
      return S.Array(__S(3105, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ AuthenticationProfiles: S.optional(__S(3106, __c97, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeAuthenticationProfilesResult" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClusterDbRevisionsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DatabaseRevision: S.optional(S.String),
          Description: S.optional(S.String),
          DatabaseRevisionReleaseDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "RevisionTarget" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3137, __c98, 1)
          .pipe(/*@__PURE__*/ T.XmlName("RevisionTarget"))
          .annotate({ identifier: "RevisionTarget" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          CurrentDatabaseRevision: S.optional(S.String),
          DatabaseRevisionReleaseDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          RevisionTargets: S.optional(__S(3138, __c98, 2)),
        }),
      ).annotate({ identifier: "ClusterDbRevision" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(3139, __c98, 3)
          .pipe(/*@__PURE__*/ T.XmlName("ClusterDbRevision"))
          .annotate({ identifier: "ClusterDbRevision" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ClusterDbRevisions: S.optional(__S(3140, __c98, 4)),
        }).pipe(ns),
      ).annotate({ identifier: "ClusterDbRevisionsMessage" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClusterParameterGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1120, __c35, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ClusterParameterGroup"))
          .annotate({ identifier: "ClusterParameterGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ParameterGroups: S.optional(__S(3169, __c99, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ClusterParameterGroupsMessage" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("TagValue")));
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.optional(S.String),
          Source: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClusterParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Parameters: S.optional(__S(3265, __c102, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ClusterParameterGroupDetails" });
  }
}
function __c102(j: number): any {
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
          ApplyType: S.optional(S.String),
          IsModifiable: S.optional(S.Boolean),
          MinimumEngineVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Parameter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(3264, __c102, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Parameter"))
          .annotate({ identifier: "Parameter" }),
      );
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClustersMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1014, __c31, 22)
          .pipe(/*@__PURE__*/ T.XmlName("Cluster"))
          .annotate({ identifier: "Cluster" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), Clusters: S.optional(__S(3297, __c103, 1)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ClustersMessage" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterSecurityGroupName: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClusterSecurityGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(356, __c11, 4)
          .pipe(/*@__PURE__*/ T.XmlName("ClusterSecurityGroup"))
          .annotate({ identifier: "ClusterSecurityGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ClusterSecurityGroups: S.optional(__S(3329, __c104, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ClusterSecurityGroupMessage" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Attribute: S.optional(S.String), SortOrder: S.optional(S.String) }),
      ).annotate({ identifier: "SnapshotSortingEntity" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(3360, __c105, 0)
          .pipe(/*@__PURE__*/ T.XmlName("SnapshotSortingEntity"))
          .annotate({ identifier: "SnapshotSortingEntity" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          SnapshotIdentifier: S.optional(S.String),
          SnapshotArn: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          OwnerAccount: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
          ClusterExists: S.optional(S.Boolean),
          SortingEntities: S.optional(__S(3361, __c105, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClusterSnapshotsMessage" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(515, __c16, 3)
          .pipe(/*@__PURE__*/ T.XmlName("Snapshot"))
          .annotate({ identifier: "Snapshot" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          Snapshots: S.optional(__S(3363, __c105, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "SnapshotMessage" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterSubnetGroupName: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClusterSubnetGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1314, __c41, 2)
          .pipe(/*@__PURE__*/ T.XmlName("ClusterSubnetGroup"))
          .annotate({ identifier: "ClusterSubnetGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ClusterSubnetGroups: S.optional(__S(3393, __c106, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ClusterSubnetGroupMessage" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaintenanceTrackName: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClusterTracksMessage" });
    case 1:
      return S.suspend(() => S.Struct({ OperationName: S.optional(S.String) })).annotate({
        identifier: "SupportedOperation",
      });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3425, __c107, 1)
          .pipe(/*@__PURE__*/ T.XmlName("SupportedOperation"))
          .annotate({ identifier: "SupportedOperation" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          MaintenanceTrackName: S.optional(S.String),
          DatabaseVersion: S.optional(S.String),
          SupportedOperations: S.optional(__S(3426, __c107, 2)),
        }),
      ).annotate({ identifier: "UpdateTarget" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(3427, __c107, 3)
          .pipe(/*@__PURE__*/ T.XmlName("UpdateTarget"))
          .annotate({ identifier: "UpdateTarget" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          MaintenanceTrackName: S.optional(S.String),
          DatabaseVersion: S.optional(S.String),
          UpdateTargets: S.optional(__S(3428, __c107, 4)),
        }),
      ).annotate({ identifier: "MaintenanceTrack" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(3429, __c107, 5)
          .pipe(/*@__PURE__*/ T.XmlName("MaintenanceTrack"))
          .annotate({ identifier: "MaintenanceTrack" }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({
          MaintenanceTracks: S.optional(__S(3430, __c107, 6)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "TrackListMessage" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterVersion: S.optional(S.String),
          ClusterParameterGroupFamily: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClusterVersionsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterVersion: S.optional(S.String),
          ClusterParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClusterVersion" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3457, __c108, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ClusterVersion"))
          .annotate({ identifier: "ClusterVersion" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ClusterVersions: S.optional(__S(3458, __c108, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ClusterVersionsMessage" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CustomDomainName: S.optional(S.String),
          CustomDomainCertificateArn: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCustomDomainAssociationsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CustomDomainName: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "CertificateAssociation" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3489, __c109, 1)
          .pipe(/*@__PURE__*/ T.XmlName("CertificateAssociation"))
          .annotate({ identifier: "CertificateAssociation" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          CustomDomainCertificateArn: S.optional(S.String),
          CustomDomainCertificateExpiryDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          CertificateAssociations: S.optional(__S(3490, __c109, 2)),
        }),
      ).annotate({ identifier: "Association" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(3491, __c109, 3)
          .pipe(/*@__PURE__*/ T.XmlName("Association"))
          .annotate({ identifier: "Association" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          Associations: S.optional(__S(3492, __c109, 4)),
        }).pipe(ns),
      ).annotate({ identifier: "CustomDomainAssociationsMessage" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataShareArn: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDataSharesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataShares: S.optional(__S(3552, __c111, 0)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDataSharesResult" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(226, __c7, 2));
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConsumerArn: S.optional(S.String),
          Status: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDataSharesForConsumerMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataShares: S.optional(__S(3552, __c111, 0)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDataSharesForConsumerResult" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProducerArn: S.optional(S.String),
          Status: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDataSharesForProducerMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataShares: S.optional(__S(3552, __c111, 0)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDataSharesForProducerResult" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupFamily: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDefaultClusterParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupFamily: S.optional(S.String),
          Marker: S.optional(S.String),
          Parameters: S.optional(__S(3265, __c102, 1)),
        }),
      ).annotate({ identifier: "DefaultClusterParameters" });
    case 2:
      return S.suspend(() =>
        S.Struct({ DefaultClusterParameters: S.optional(__S(3649, __c114, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeDefaultClusterParametersResult" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          ResourceOwner: S.optional(S.String),
          EndpointName: S.optional(S.String),
          VpcId: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEndpointAccessMessage" });
    case 1:
      return S.Array(__S(1440, __c45, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EndpointAccessList: S.optional(__S(3681, __c115, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "EndpointAccessList" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          Account: S.optional(S.String),
          Grantee: S.optional(S.Boolean),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEndpointAuthorizationMessage" });
    case 1:
      return S.Array(__S(449, __c14, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EndpointAuthorizationList: S.optional(__S(3713, __c116, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "EndpointAuthorizationList" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceType: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEventCategoriesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventId: S.optional(S.String),
          EventCategories: S.optional(__S(1504, __c47, 0)),
          EventDescription: S.optional(S.String),
          Severity: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventInfoMap" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3745, __c117, 1)
          .pipe(/*@__PURE__*/ T.XmlName("EventInfoMap"))
          .annotate({ identifier: "EventInfoMap" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ SourceType: S.optional(S.String), Events: S.optional(__S(3746, __c117, 2)) }),
      ).annotate({ identifier: "EventCategoriesMap" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(3747, __c117, 3)
          .pipe(/*@__PURE__*/ T.XmlName("EventCategoriesMap"))
          .annotate({ identifier: "EventCategoriesMap" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({ EventCategoriesMapList: S.optional(__S(3748, __c117, 4)) }).pipe(ns),
      ).annotate({ identifier: "EventCategoriesMessage" });
  }
}
function __c118(j: number): any {
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
          EventCategories: S.optional(__S(1504, __c47, 0)),
          Severity: S.optional(S.String),
          Date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EventId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Event" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3777, __c118, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Event"))
          .annotate({ identifier: "Event" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), Events: S.optional(__S(3778, __c118, 2)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "EventsMessage" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventSubscriptionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1537, __c48, 1)
          .pipe(/*@__PURE__*/ T.XmlName("EventSubscription"))
          .annotate({ identifier: "EventSubscription" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          EventSubscriptionsList: S.optional(__S(3809, __c119, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "EventSubscriptionsMessage" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HsmClientCertificateIdentifier: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeHsmClientCertificatesMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1600, __c50, 0)
          .pipe(/*@__PURE__*/ T.XmlName("HsmClientCertificate"))
          .annotate({ identifier: "HsmClientCertificate" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          HsmClientCertificates: S.optional(__S(3841, __c120, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "HsmClientCertificateMessage" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HsmConfigurationIdentifier: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeHsmConfigurationsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1664, __c52, 0)
          .pipe(/*@__PURE__*/ T.XmlName("HsmConfiguration"))
          .annotate({ identifier: "HsmConfiguration" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          HsmConfigurations: S.optional(__S(3873, __c121, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "HsmConfigurationMessage" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IntegrationArn: S.optional(S.String),
          TargetArn: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInboundIntegrationsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IntegrationArn: S.optional(S.String),
          SourceArn: S.optional(S.String),
          TargetArn: S.optional(S.String),
          Status: S.optional(S.String),
          Errors: S.optional(__S(1729, __c54, 1)),
          CreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "InboundIntegration" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3905, __c122, 1)
          .pipe(/*@__PURE__*/ T.XmlName("InboundIntegration"))
          .annotate({ identifier: "InboundIntegration" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          InboundIntegrations: S.optional(__S(3906, __c122, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "InboundIntegrationsMessage" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Value")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(3936, __c123, 0)) }),
      ).annotate({ identifier: "DescribeIntegrationsFilter" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3937, __c123, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DescribeIntegrationsFilter"))
          .annotate({ identifier: "DescribeIntegrationsFilter" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          IntegrationArn: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          Filters: S.optional(__S(3938, __c123, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeIntegrationsMessage" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(1761, __c55, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Integration"))
          .annotate({ identifier: "Integration" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          Integrations: S.optional(__S(3940, __c123, 4)),
        }).pipe(ns),
      ).annotate({ identifier: "IntegrationsMessage" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLoggingStatusMessage" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LoggingEnabled: S.optional(S.Boolean),
          BucketName: S.optional(S.String),
          S3KeyPrefix: S.optional(S.String),
          LastSuccessfulDeliveryTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          LastFailureTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastFailureMessage: S.optional(S.String),
          LogDestinationType: S.optional(S.String),
          LogExports: S.optional(__S(896, __c28, 0)),
          S3Tables: S.optional(__S(898, __c28, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "LoggingStatus" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Operator: S.optional(S.String),
          Values: S.optional(__S(1248, __c39, 0)).pipe(T.XmlName("Value")),
        }),
      ).annotate({ identifier: "NodeConfigurationOptionsFilter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(4032, __c126, 0)
          .pipe(/*@__PURE__*/ T.XmlName("NodeConfigurationOptionsFilter"))
          .annotate({ identifier: "NodeConfigurationOptionsFilter" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ActionType: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          SnapshotIdentifier: S.optional(S.String),
          SnapshotArn: S.optional(S.String),
          OwnerAccount: S.optional(S.String),
          Filters: S.optional(__S(4033, __c126, 1)).pipe(T.XmlName("Filter")),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeNodeConfigurationOptionsMessage" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          NodeType: S.optional(S.String),
          NumberOfNodes: S.optional(S.Number),
          EstimatedDiskUtilizationPercent: S.optional(S.Number),
          Mode: S.optional(S.String),
        }),
      ).annotate({ identifier: "NodeConfigurationOption" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(4035, __c126, 3)
          .pipe(/*@__PURE__*/ T.XmlName("NodeConfigurationOption"))
          .annotate({ identifier: "NodeConfigurationOption" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          NodeConfigurationOptionList: S.optional(__S(4036, __c126, 4)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "NodeConfigurationOptionsMessage" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterVersion: S.optional(S.String),
          NodeType: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOrderableClusterOptionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1282, __c40, 2)
          .pipe(/*@__PURE__*/ T.XmlName("AvailabilityZone"))
          .annotate({ identifier: "AvailabilityZone" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterVersion: S.optional(S.String),
          ClusterType: S.optional(S.String),
          NodeType: S.optional(S.String),
          AvailabilityZones: S.optional(__S(4065, __c127, 1)),
        }),
      ).annotate({ identifier: "OrderableClusterOption" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(4066, __c127, 2)
          .pipe(/*@__PURE__*/ T.XmlName("OrderableClusterOption"))
          .annotate({ identifier: "OrderableClusterOption" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          OrderableClusterOptions: S.optional(__S(4067, __c127, 3)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "OrderableClusterOptionsMessage" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          PartnerName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePartnersInputMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.optional(S.String),
          PartnerName: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "PartnerIntegrationInfo" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(4097, __c128, 1)
          .pipe(/*@__PURE__*/ T.XmlName("PartnerIntegrationInfo"))
          .annotate({ identifier: "PartnerIntegrationInfo" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ PartnerIntegrationInfoList: S.optional(__S(4098, __c128, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribePartnersOutputMessage" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Qev2IdcApplicationArn: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeQev2IdcApplicationsMessage" });
    case 1:
      return S.Array(__S(1824, __c57, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Qev2IdcApplications: S.optional(__S(4129, __c129, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeQev2IdcApplicationsResult" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RedshiftIdcApplicationArn: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRedshiftIdcApplicationsMessage" });
    case 1:
      return S.Array(__S(1934, __c60, 14));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RedshiftIdcApplications: S.optional(__S(4161, __c130, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeRedshiftIdcApplicationsResult" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedNodeId: S.optional(S.String),
          ReservedNodeExchangeRequestId: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeReservedNodeExchangeStatusInputMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(928, __c29, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ReservedNodeExchangeStatus"))
          .annotate({ identifier: "ReservedNodeExchangeStatus" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReservedNodeExchangeStatusDetails: S.optional(__S(4193, __c131, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeReservedNodeExchangeStatusOutputMessage" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedNodeOfferingId: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeReservedNodeOfferingsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ReservedNodeOfferings: S.optional(__S(4288, __c134, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "ReservedNodeOfferingsMessage" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedNodeOfferingId: S.optional(S.String),
          NodeType: S.optional(S.String),
          Duration: S.optional(S.Number),
          FixedPrice: S.optional(S.Number),
          UsagePrice: S.optional(S.Number),
          CurrencyCode: S.optional(S.String),
          OfferingType: S.optional(S.String),
          RecurringCharges: S.optional(__S(65, __c2, 1)),
          ReservedNodeOfferingType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReservedNodeOffering" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(4256, __c133, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ReservedNodeOffering"))
          .annotate({ identifier: "ReservedNodeOffering" }),
      );
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedNodeId: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeReservedNodesMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(96, __c3, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ReservedNode"))
          .annotate({ identifier: "ReservedNode" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ReservedNodes: S.optional(__S(4321, __c135, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ReservedNodesMessage" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeResizeMessage" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(1248, __c39, 0)) }),
      ).annotate({ identifier: "ScheduledActionFilter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(4384, __c137, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ScheduledActionFilter"))
          .annotate({ identifier: "ScheduledActionFilter" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ScheduledActionName: S.optional(S.String),
          TargetActionType: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Active: S.optional(S.Boolean),
          Filters: S.optional(__S(4385, __c137, 1)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeScheduledActionsMessage" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(1986, __c62, 2)
          .pipe(/*@__PURE__*/ T.XmlName("ScheduledAction"))
          .annotate({ identifier: "ScheduledAction" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ScheduledActions: S.optional(__S(4387, __c137, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "ScheduledActionsMessage" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotCopyGrantName: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSnapshotCopyGrantsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2144, __c67, 0)
          .pipe(/*@__PURE__*/ T.XmlName("SnapshotCopyGrant"))
          .annotate({ identifier: "SnapshotCopyGrant" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          SnapshotCopyGrants: S.optional(__S(4417, __c138, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "SnapshotCopyGrantMessage" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          ScheduleIdentifier: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSnapshotSchedulesMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2212, __c69, 4)
          .pipe(/*@__PURE__*/ T.XmlName("SnapshotSchedule"))
          .annotate({ identifier: "SnapshotSchedule" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          SnapshotSchedules: S.optional(__S(4449, __c139, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSnapshotSchedulesOutputMessage" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeStorageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TotalBackupSizeInMegaBytes: S.optional(S.Number),
          TotalProvisionedStorageInMegaBytes: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "CustomerStorageMessage" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          TableRestoreRequestId: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTableRestoreStatusMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(4544, __c142, 0)
          .pipe(/*@__PURE__*/ T.XmlName("TableRestoreStatus"))
          .annotate({ identifier: "TableRestoreStatus" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          TableRestoreStatusDetails: S.optional(__S(4513, __c141, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "TableRestoreStatusMessage" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TableRestoreRequestId: S.optional(S.String),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
          RequestTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ProgressInMegaBytes: S.optional(S.Number),
          TotalDataInMegaBytes: S.optional(S.Number),
          ClusterIdentifier: S.optional(S.String),
          SnapshotIdentifier: S.optional(S.String),
          SourceDatabaseName: S.optional(S.String),
          SourceSchemaName: S.optional(S.String),
          SourceTableName: S.optional(S.String),
          TargetDatabaseName: S.optional(S.String),
          TargetSchemaName: S.optional(S.String),
          NewTableName: S.optional(S.String),
        }),
      ).annotate({ identifier: "TableRestoreStatus" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceName: S.optional(S.String),
          ResourceType: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTagsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Tag: S.optional(__S(288, __c9, 0)),
          ResourceName: S.optional(S.String),
          ResourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaggedResource" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(4577, __c143, 1)
          .pipe(/*@__PURE__*/ T.XmlName("TaggedResource"))
          .annotate({ identifier: "TaggedResource" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          TaggedResources: S.optional(__S(4578, __c143, 2)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "TaggedResourceListMessage" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UsageLimitId: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          FeatureType: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          TagKeys: S.optional(__S(1888, __c59, 0)),
          TagValues: S.optional(__S(3200, __c100, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeUsageLimitsMessage" });
    case 1:
      return S.Array(__S(2304, __c72, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          UsageLimits: S.optional(__S(4609, __c144, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "UsageLimitList" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          LogDestinationType: S.optional(S.String),
          LogExports: S.optional(__S(896, __c28, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisableLoggingMessage" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableSnapshotCopyMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "DisableSnapshotCopyResult" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataShareArn: S.optional(S.String),
          DisassociateEntireAccount: S.optional(S.Boolean),
          ConsumerArn: S.optional(S.String),
          ConsumerRegion: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateDataShareConsumerMessage" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          BucketName: S.optional(S.String),
          S3KeyPrefix: S.optional(S.String),
          LogDestinationType: S.optional(S.String),
          LogExports: S.optional(__S(896, __c28, 0)),
          S3TableKmsKeyId: S.optional(S.String),
          S3TableGranularity: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "EnableLoggingMessage" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          DestinationRegion: S.optional(S.String),
          RetentionPeriod: S.optional(S.Number),
          SnapshotCopyGrantName: S.optional(S.String),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "EnableSnapshotCopyMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "EnableSnapshotCopyResult" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "FailoverPrimaryComputeInputMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "FailoverPrimaryComputeResult" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("DbGroup")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          DbUser: S.optional(S.String),
          DbName: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          DurationSeconds: S.optional(S.Number),
          AutoCreate: S.optional(S.Boolean),
          DbGroups: S.optional(__S(4832, __c151, 0)),
          CustomDomainName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetClusterCredentialsMessage" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DbUser: S.optional(S.String),
          DbPassword: S.optional(SensitiveString),
          Expiration: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(ns),
      ).annotate({ identifier: "ClusterCredentials" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DbName: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          DurationSeconds: S.optional(S.Number),
          CustomDomainName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetClusterCredentialsWithIAMMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DbUser: S.optional(S.String),
          DbPassword: S.optional(SensitiveString),
          Expiration: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NextRefreshTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(ns),
      ).annotate({ identifier: "ClusterExtendedCredentials" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ClusterIdentifier")));
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterIds: S.optional(__S(4896, __c153, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIdentityCenterAuthTokenRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Token: S.optional(SensitiveString),
          ExpirationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(ns),
      ).annotate({ identifier: "GetIdentityCenterAuthTokenResponse" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActionType: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          SnapshotIdentifier: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetReservedNodeExchangeConfigurationOptionsInputMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceReservedNode: S.optional(__S(96, __c3, 0)),
          TargetReservedNodeCount: S.optional(S.Number),
          TargetReservedNodeOffering: S.optional(__S(4256, __c133, 0)),
        }),
      ).annotate({ identifier: "ReservedNodeConfigurationOption" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(4929, __c154, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ReservedNodeConfigurationOption"))
          .annotate({ identifier: "ReservedNodeConfigurationOption" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ReservedNodeConfigurationOptionList: S.optional(__S(4930, __c154, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "GetReservedNodeExchangeConfigurationOptionsOutputMessage" });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedNodeId: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetReservedNodeExchangeOfferingsInputMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ReservedNodeOfferings: S.optional(__S(4288, __c134, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetReservedNodeExchangeOfferingsOutputMessage" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePolicyMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourcePolicy: S.optional(__S(5024, __c157, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetResourcePolicyResult" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), Policy: S.optional(S.String) }),
      ).annotate({ identifier: "ResourcePolicy" });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          NamespaceArn: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRecommendationsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Text: S.optional(S.String),
          Database: S.optional(S.String),
          Command: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommendedAction" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(5057, __c158, 1)
          .pipe(/*@__PURE__*/ T.XmlName("RecommendedAction"))
          .annotate({ identifier: "RecommendedAction" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ Text: S.optional(S.String), Link: S.optional(S.String) }),
      ).annotate({ identifier: "ReferenceLink" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(5059, __c158, 3)
          .pipe(/*@__PURE__*/ T.XmlName("ReferenceLink"))
          .annotate({ identifier: "ReferenceLink" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          NamespaceArn: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          RecommendationType: S.optional(S.String),
          Title: S.optional(S.String),
          Description: S.optional(S.String),
          Observation: S.optional(S.String),
          ImpactRanking: S.optional(S.String),
          RecommendationText: S.optional(S.String),
          RecommendedActions: S.optional(__S(5058, __c158, 2)),
          ReferenceLinks: S.optional(__S(5060, __c158, 4)),
        }),
      ).annotate({ identifier: "Recommendation" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(5061, __c158, 5)
          .pipe(/*@__PURE__*/ T.XmlName("Recommendation"))
          .annotate({ identifier: "Recommendation" }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({
          Recommendations: S.optional(__S(5062, __c158, 6)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListRecommendationsResult" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          AquaConfigurationStatus: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyAquaInputMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AquaConfiguration: S.optional(__S(960, __c30, 0)) }).pipe(ns),
      ).annotate({ identifier: "ModifyAquaOutputMessage" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationProfileName: S.optional(S.String),
          AuthenticationProfileContent: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyAuthenticationProfileMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AuthenticationProfileName: S.optional(S.String),
          AuthenticationProfileContent: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ModifyAuthenticationProfileResult" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          ClusterType: S.optional(S.String),
          NodeType: S.optional(S.String),
          NumberOfNodes: S.optional(S.Number),
          ClusterSecurityGroups: S.optional(__S(1024, __c32, 0)),
          VpcSecurityGroupIds: S.optional(__S(864, __c27, 0)),
          MasterUserPassword: S.optional(SensitiveString),
          ClusterParameterGroupName: S.optional(S.String),
          AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
          PreferredMaintenanceWindow: S.optional(S.String),
          ClusterVersion: S.optional(S.String),
          AllowVersionUpgrade: S.optional(S.Boolean),
          HsmClientCertificateIdentifier: S.optional(S.String),
          HsmConfigurationIdentifier: S.optional(S.String),
          NewClusterIdentifier: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          ElasticIp: S.optional(S.String),
          EnhancedVpcRouting: S.optional(S.Boolean),
          MaintenanceTrackName: S.optional(S.String),
          Encrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          AvailabilityZoneRelocation: S.optional(S.Boolean),
          AvailabilityZone: S.optional(S.String),
          Port: S.optional(S.Number),
          ManageMasterPassword: S.optional(S.Boolean),
          MasterPasswordSecretKmsKeyId: S.optional(S.String),
          IpAddressType: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          ExtraComputeForAutomaticOptimization: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "ModifyClusterResult" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          RevisionTarget: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyClusterDbRevisionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "ModifyClusterDbRevisionResult" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          AddIamRoles: S.optional(__S(1056, __c33, 0)),
          RemoveIamRoles: S.optional(__S(1056, __c33, 0)),
          DefaultIamRoleArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyClusterIamRolesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "ModifyClusterIamRolesResult" });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          DeferMaintenance: S.optional(S.Boolean),
          DeferMaintenanceIdentifier: S.optional(S.String),
          DeferMaintenanceStartTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          DeferMaintenanceEndTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          DeferMaintenanceDuration: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyClusterMaintenanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "ModifyClusterMaintenanceResult" });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.optional(S.String),
          Parameters: S.optional(__S(3265, __c102, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyClusterParameterGroupMessage" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.optional(S.String),
          ParameterGroupStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ClusterParameterGroupNameMessage" });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotIdentifier: S.optional(S.String),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
          Force: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Snapshot: S.optional(__S(515, __c16, 3)) }).pipe(ns),
      ).annotate({ identifier: "ModifyClusterSnapshotResult" });
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          ScheduleIdentifier: S.optional(S.String),
          DisassociateSchedule: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyClusterSnapshotScheduleMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "ModifyClusterSnapshotScheduleResponse",
      });
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterSubnetGroupName: S.optional(S.String),
          Description: S.optional(S.String),
          SubnetIds: S.optional(__S(1344, __c42, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyClusterSubnetGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterSubnetGroup: S.optional(__S(1314, __c41, 2)) }).pipe(ns),
      ).annotate({ identifier: "ModifyClusterSubnetGroupResult" });
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CustomDomainName: S.optional(S.String),
          CustomDomainCertificateArn: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyCustomDomainAssociationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CustomDomainName: S.optional(S.String),
          CustomDomainCertificateArn: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          CustomDomainCertExpiryTime: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ModifyCustomDomainAssociationResult" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EndpointName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(864, __c27, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyEndpointAccessMessage" });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SourceType: S.optional(S.String),
          SourceIds: S.optional(__S(1536, __c48, 0)),
          EventCategories: S.optional(__S(1504, __c47, 0)),
          Severity: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyEventSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(1537, __c48, 1)) }).pipe(ns),
      ).annotate({ identifier: "ModifyEventSubscriptionResult" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IntegrationArn: S.optional(S.String),
          Description: S.optional(S.String),
          IntegrationName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyIntegrationMessage" });
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          LakehouseRegistration: S.optional(S.String),
          CatalogName: S.optional(S.String),
          LakehouseIdcRegistration: S.optional(S.String),
          LakehouseIdcApplicationArn: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyLakehouseConfigurationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          LakehouseIdcApplicationArn: S.optional(S.String),
          LakehouseRegistrationStatus: S.optional(S.String),
          CatalogArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "LakehouseConfiguration" });
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Qev2IdcApplicationArn: S.optional(S.String),
          IdcDisplayName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyQev2IdcApplicationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Qev2IdcApplication: S.optional(__S(1824, __c57, 0)) }).pipe(ns),
      ).annotate({ identifier: "ModifyQev2IdcApplicationResult" });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RedshiftIdcApplicationArn: S.optional(S.String),
          IdentityNamespace: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
          IdcDisplayName: S.optional(S.String),
          AuthorizedTokenIssuerList: S.optional(__S(1922, __c60, 2)),
          ServiceIntegrations: S.optional(__S(1933, __c60, 13)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyRedshiftIdcApplicationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RedshiftIdcApplication: S.optional(__S(1934, __c60, 14)) }).pipe(ns),
      ).annotate({ identifier: "ModifyRedshiftIdcApplicationResult" });
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScheduledActionName: S.optional(S.String),
          TargetAction: S.optional(__S(1984, __c62, 0)),
          Schedule: S.optional(S.String),
          IamRole: S.optional(S.String),
          ScheduledActionDescription: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Enable: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyScheduledActionMessage" });
  }
}
function __c178(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          RetentionPeriod: S.optional(S.Number),
          Manual: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifySnapshotCopyRetentionPeriodMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "ModifySnapshotCopyRetentionPeriodResult" });
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScheduleIdentifier: S.optional(S.String),
          ScheduleDefinitions: S.optional(__S(2208, __c69, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifySnapshotScheduleMessage" });
  }
}
function __c180(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UsageLimitId: S.optional(S.String),
          Amount: S.optional(S.Number),
          BreachAction: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyUsageLimitMessage" });
  }
}
function __c181(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "PauseClusterResult" });
  }
}
function __c182(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedNodeOfferingId: S.optional(S.String),
          NodeCount: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PurchaseReservedNodeOfferingMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReservedNode: S.optional(__S(96, __c3, 0)) }).pipe(ns),
      ).annotate({ identifier: "PurchaseReservedNodeOfferingResult" });
  }
}
function __c183(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), Policy: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourcePolicy: S.optional(__S(5024, __c157, 0)) }).pipe(ns),
      ).annotate({ identifier: "PutResourcePolicyResult" });
  }
}
function __c184(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RebootClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "RebootClusterResult" });
  }
}
function __c185(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamespaceIdentifier: S.optional(__S(3042, __c95, 2)),
          ConsumerIdentifiers: S.optional(__S(3043, __c95, 3)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterNamespaceInputMessage" });
    case 1:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "RegisterNamespaceOutputMessage",
      });
  }
}
function __c186(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataShareArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RejectDataShareMessage" });
  }
}
function __c187(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.optional(S.String),
          ResetAllParameters: S.optional(S.Boolean),
          Parameters: S.optional(__S(3265, __c102, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ResetClusterParameterGroupMessage" });
  }
}
function __c188(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "ResizeClusterResult" });
  }
}
function __c189(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          SnapshotIdentifier: S.optional(S.String),
          SnapshotArn: S.optional(S.String),
          SnapshotClusterIdentifier: S.optional(S.String),
          Port: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          AllowVersionUpgrade: S.optional(S.Boolean),
          ClusterSubnetGroupName: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          OwnerAccount: S.optional(S.String),
          HsmClientCertificateIdentifier: S.optional(S.String),
          HsmConfigurationIdentifier: S.optional(S.String),
          ElasticIp: S.optional(S.String),
          ClusterParameterGroupName: S.optional(S.String),
          ClusterSecurityGroups: S.optional(__S(1024, __c32, 0)),
          VpcSecurityGroupIds: S.optional(__S(864, __c27, 0)),
          PreferredMaintenanceWindow: S.optional(S.String),
          AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
          ManualSnapshotRetentionPeriod: S.optional(S.Number),
          KmsKeyId: S.optional(S.String),
          NodeType: S.optional(S.String),
          EnhancedVpcRouting: S.optional(S.Boolean),
          AdditionalInfo: S.optional(S.String),
          IamRoles: S.optional(__S(1056, __c33, 0)),
          MaintenanceTrackName: S.optional(S.String),
          SnapshotScheduleIdentifier: S.optional(S.String),
          NumberOfNodes: S.optional(S.Number),
          AvailabilityZoneRelocation: S.optional(S.Boolean),
          AquaConfigurationStatus: S.optional(S.String),
          DefaultIamRoleArn: S.optional(S.String),
          ReservedNodeId: S.optional(S.String),
          TargetReservedNodeOfferingId: S.optional(S.String),
          Encrypted: S.optional(S.Boolean),
          ManageMasterPassword: S.optional(S.Boolean),
          MasterPasswordSecretKmsKeyId: S.optional(S.String),
          IpAddressType: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          CatalogName: S.optional(S.String),
          RedshiftIdcApplicationArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreFromClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "RestoreFromClusterSnapshotResult" });
  }
}
function __c190(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          SnapshotIdentifier: S.optional(S.String),
          SourceDatabaseName: S.optional(S.String),
          SourceSchemaName: S.optional(S.String),
          SourceTableName: S.optional(S.String),
          TargetDatabaseName: S.optional(S.String),
          TargetSchemaName: S.optional(S.String),
          NewTableName: S.optional(S.String),
          EnableCaseSensitiveIdentifier: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreTableFromClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TableRestoreStatus: S.optional(__S(4544, __c142, 0)) }).pipe(ns),
      ).annotate({ identifier: "RestoreTableFromClusterSnapshotResult" });
  }
}
function __c191(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "ResumeClusterResult" });
  }
}
function __c192(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterSecurityGroupName: S.optional(S.String),
          CIDRIP: S.optional(S.String),
          EC2SecurityGroupName: S.optional(S.String),
          EC2SecurityGroupOwnerId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RevokeClusterSecurityGroupIngressMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterSecurityGroup: S.optional(__S(356, __c11, 4)) }).pipe(ns),
      ).annotate({ identifier: "RevokeClusterSecurityGroupIngressResult" });
  }
}
function __c193(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterIdentifier: S.optional(S.String),
          Account: S.optional(S.String),
          VpcIds: S.optional(__S(448, __c14, 0)),
          Force: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RevokeEndpointAccessMessage" });
  }
}
function __c194(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotIdentifier: S.optional(S.String),
          SnapshotArn: S.optional(S.String),
          SnapshotClusterIdentifier: S.optional(S.String),
          AccountWithRestoreAccess: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RevokeSnapshotAccessMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Snapshot: S.optional(__S(515, __c16, 3)) }).pipe(ns),
      ).annotate({ identifier: "RevokeSnapshotAccessResult" });
  }
}
function __c195(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RotateEncryptionKeyMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(1014, __c31, 22)) }).pipe(ns),
      ).annotate({ identifier: "RotateEncryptionKeyResult" });
  }
}
function __c196(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          ClusterIdentifier: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          PartnerName: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePartnerStatusInputMessage" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
