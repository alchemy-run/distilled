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
const ns = /*@__PURE__*/ T.XmlNamespace("http://rds.amazonaws.com/doc/2014-10-31/");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Neptune", serviceShapeName: "AmazonRDSv19" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "rds" });
const ver = /*@__PURE__*/ T.ServiceVersion("2014-10-31");
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
              `https://rds-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://rds.${Region}.amazonaws.com`);
            }
            return e(`https://rds-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://rds.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://rds.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://rds.{R}.{D}","properties":{},"headers":{}}');

export class AuthorizationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<AuthorizationNotFoundFault>()(
    "AuthorizationNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AuthorizationNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CertificateNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CertificateNotFoundFault>()(
    "CertificateNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CertificateNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterAlreadyExistsFault>()(
    "DBClusterAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBClusterAlreadyExistsFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBClusterEndpointAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterEndpointAlreadyExistsFault>()(
    "DBClusterEndpointAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBClusterEndpointAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBClusterEndpointNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterEndpointNotFoundFault>()(
    "DBClusterEndpointNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBClusterEndpointNotFoundFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBClusterEndpointQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterEndpointQuotaExceededFault>()(
    "DBClusterEndpointQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBClusterEndpointQuotaExceededFault",
        httpResponseCode: 403,
      }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class DBClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterNotFoundFault>()(
    "DBClusterNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBClusterNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBClusterParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterParameterGroupNotFoundFault>()(
    "DBClusterParameterGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBClusterParameterGroupNotFound",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBClusterQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterQuotaExceededFault>()(
    "DBClusterQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBClusterQuotaExceededFault", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class DBClusterRoleAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterRoleAlreadyExistsFault>()(
    "DBClusterRoleAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBClusterRoleAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBClusterRoleNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterRoleNotFoundFault>()(
    "DBClusterRoleNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBClusterRoleNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBClusterRoleQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterRoleQuotaExceededFault>()(
    "DBClusterRoleQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBClusterRoleQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBClusterSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterSnapshotAlreadyExistsFault>()(
    "DBClusterSnapshotAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBClusterSnapshotAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBClusterSnapshotNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterSnapshotNotFoundFault>()(
    "DBClusterSnapshotNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBClusterSnapshotNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBInstanceAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBInstanceAlreadyExistsFault>()(
    "DBInstanceAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBInstanceAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBInstanceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBInstanceNotFoundFault>()(
    "DBInstanceNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBInstanceNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBParameterGroupAlreadyExistsFault>()(
    "DBParameterGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBParameterGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBParameterGroupNotFoundFault>()(
    "DBParameterGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBParameterGroupNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBParameterGroupQuotaExceededFault>()(
    "DBParameterGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBParameterGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSecurityGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBSecurityGroupNotFoundFault>()(
    "DBSecurityGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBSecurityGroupNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBSnapshotAlreadyExistsFault>()(
    "DBSnapshotAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBSnapshotAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBSnapshotNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBSnapshotNotFoundFault>()(
    "DBSnapshotNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBSnapshotNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBSubnetGroupAlreadyExistsFault>()(
    "DBSubnetGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBSubnetGroupAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBSubnetGroupDoesNotCoverEnoughAZs
  extends /*@__PURE__*/ S.TaggedError<DBSubnetGroupDoesNotCoverEnoughAZs>()(
    "DBSubnetGroupDoesNotCoverEnoughAZs",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBSubnetGroupDoesNotCoverEnoughAZs",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSubnetGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBSubnetGroupNotFoundFault>()(
    "DBSubnetGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBSubnetGroupNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBSubnetGroupQuotaExceededFault>()(
    "DBSubnetGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBSubnetGroupQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSubnetQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBSubnetQuotaExceededFault>()(
    "DBSubnetQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBSubnetQuotaExceededFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBUpgradeDependencyFailureFault
  extends /*@__PURE__*/ S.TaggedError<DBUpgradeDependencyFailureFault>()(
    "DBUpgradeDependencyFailureFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBUpgradeDependencyFailure", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DomainNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DomainNotFoundFault>()(
    "DomainNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DomainNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
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
export class GlobalClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<GlobalClusterAlreadyExistsFault>()(
    "GlobalClusterAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "GlobalClusterAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class GlobalClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<GlobalClusterNotFoundFault>()(
    "GlobalClusterNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "GlobalClusterNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class GlobalClusterQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<GlobalClusterQuotaExceededFault>()(
    "GlobalClusterQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "GlobalClusterQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InstanceQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<InstanceQuotaExceededFault>()(
    "InstanceQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InstanceQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientDBClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientDBClusterCapacityFault>()(
    "InsufficientDBClusterCapacityFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InsufficientDBClusterCapacityFault",
        httpResponseCode: 403,
      }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class InsufficientDBInstanceCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientDBInstanceCapacityFault>()(
    "InsufficientDBInstanceCapacityFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InsufficientDBInstanceCapacity",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientStorageClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientStorageClusterCapacityFault>()(
    "InsufficientStorageClusterCapacityFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InsufficientStorageClusterCapacity",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBClusterEndpointStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBClusterEndpointStateFault>()(
    "InvalidDBClusterEndpointStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidDBClusterEndpointStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBClusterSnapshotStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBClusterSnapshotStateFault>()(
    "InvalidDBClusterSnapshotStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidDBClusterSnapshotStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBClusterStateFault>()(
    "InvalidDBClusterStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDBClusterStateFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBInstanceStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBInstanceStateFault>()(
    "InvalidDBInstanceStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDBInstanceState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBParameterGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBParameterGroupStateFault>()(
    "InvalidDBParameterGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidDBParameterGroupState",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBSecurityGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBSecurityGroupStateFault>()(
    "InvalidDBSecurityGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDBSecurityGroupState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBSnapshotStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBSnapshotStateFault>()(
    "InvalidDBSnapshotStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDBSnapshotState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBSubnetGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBSubnetGroupStateFault>()(
    "InvalidDBSubnetGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidDBSubnetGroupStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBSubnetStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBSubnetStateFault>()(
    "InvalidDBSubnetStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDBSubnetStateFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEventSubscriptionStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidEventSubscriptionStateFault>()(
    "InvalidEventSubscriptionStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidEventSubscriptionState",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidGlobalClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidGlobalClusterStateFault>()(
    "InvalidGlobalClusterStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidGlobalClusterStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidRestoreFault
  extends /*@__PURE__*/ S.TaggedError<InvalidRestoreFault>()(
    "InvalidRestoreFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidRestoreFault", httpResponseCode: 400 }),
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
export class InvalidVPCNetworkStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidVPCNetworkStateFault>()(
    "InvalidVPCNetworkStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidVPCNetworkStateFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KMSKeyNotAccessibleFault
  extends /*@__PURE__*/ S.TaggedError<KMSKeyNotAccessibleFault>()(
    "KMSKeyNotAccessibleFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "KMSKeyNotAccessibleFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NetworkTypeNotSupportedFault
  extends /*@__PURE__*/ S.TaggedError<NetworkTypeNotSupportedFault>()(
    "NetworkTypeNotSupportedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NetworkTypeNotSupported", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OptionGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<OptionGroupNotFoundFault>()(
    "OptionGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "OptionGroupNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ProvisionedIopsNotAvailableInAZFault
  extends /*@__PURE__*/ S.TaggedError<ProvisionedIopsNotAvailableInAZFault>()(
    "ProvisionedIopsNotAvailableInAZFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ProvisionedIopsNotAvailableInAZFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
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
export class SharedSnapshotQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SharedSnapshotQuotaExceededFault>()(
    "SharedSnapshotQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SharedSnapshotQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotQuotaExceededFault>()(
    "SnapshotQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SnapshotQuotaExceeded", httpResponseCode: 400 }),
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
export class StorageQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<StorageQuotaExceededFault>()(
    "StorageQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "StorageQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class StorageTypeNotSupportedFault
  extends /*@__PURE__*/ S.TaggedError<StorageTypeNotSupportedFault>()(
    "StorageTypeNotSupportedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "StorageTypeNotSupported", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
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
export class SubscriptionNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionNotFoundFault>()(
    "SubscriptionNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubscriptionNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export interface AddRoleToDBClusterMessage {
  DBClusterIdentifier?: string;
  RoleArn?: string;
  FeatureName?: string;
}
export interface AddRoleToDBClusterResponse {}
export interface AddSourceIdentifierToSubscriptionMessage {
  SubscriptionName?: string;
  SourceIdentifier?: string;
}
export type SourceIdsList = string[];
export type EventCategoriesList = string[];
export interface EventSubscription {
  CustomerAwsId?: string;
  CustSubscriptionId?: string;
  SnsTopicArn?: string;
  Status?: string;
  SubscriptionCreationTime?: string;
  SourceType?: string;
  SourceIdsList?: string[];
  EventCategoriesList?: string[];
  Enabled?: boolean;
  EventSubscriptionArn?: string;
}
export interface AddSourceIdentifierToSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface AddTagsToResourceMessage {
  ResourceName?: string;
  Tags?: Tag[];
}
export interface AddTagsToResourceResponse {}
export interface ApplyPendingMaintenanceActionMessage {
  ResourceIdentifier?: string;
  ApplyAction?: string;
  OptInType?: string;
}
export interface PendingMaintenanceAction {
  Action?: string;
  AutoAppliedAfterDate?: Date;
  ForcedApplyDate?: Date;
  OptInStatus?: string;
  CurrentApplyDate?: Date;
  Description?: string;
}
export type PendingMaintenanceActionDetails = PendingMaintenanceAction[];
export interface ResourcePendingMaintenanceActions {
  ResourceIdentifier?: string;
  PendingMaintenanceActionDetails?: PendingMaintenanceAction[];
}
export interface ApplyPendingMaintenanceActionResult {
  ResourcePendingMaintenanceActions?: ResourcePendingMaintenanceActions;
}
export interface CopyDBClusterParameterGroupMessage {
  SourceDBClusterParameterGroupIdentifier?: string;
  TargetDBClusterParameterGroupIdentifier?: string;
  TargetDBClusterParameterGroupDescription?: string;
  Tags?: Tag[];
}
export interface DBClusterParameterGroup {
  DBClusterParameterGroupName?: string;
  DBParameterGroupFamily?: string;
  Description?: string;
  DBClusterParameterGroupArn?: string;
}
export interface CopyDBClusterParameterGroupResult {
  DBClusterParameterGroup?: DBClusterParameterGroup;
}
export interface CopyDBClusterSnapshotMessage {
  SourceDBClusterSnapshotIdentifier?: string;
  TargetDBClusterSnapshotIdentifier?: string;
  KmsKeyId?: string;
  PreSignedUrl?: string;
  CopyTags?: boolean;
  Tags?: Tag[];
}
export type AvailabilityZones = string[];
export interface DBClusterSnapshot {
  AvailabilityZones?: string[];
  DBClusterSnapshotIdentifier?: string;
  DBClusterIdentifier?: string;
  SnapshotCreateTime?: Date;
  Engine?: string;
  AllocatedStorage?: number;
  Status?: string;
  Port?: number;
  VpcId?: string;
  ClusterCreateTime?: Date;
  MasterUsername?: string;
  EngineVersion?: string;
  LicenseModel?: string;
  SnapshotType?: string;
  PercentProgress?: number;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DBClusterSnapshotArn?: string;
  SourceDBClusterSnapshotArn?: string;
  IAMDatabaseAuthenticationEnabled?: boolean;
  StorageType?: string;
}
export interface CopyDBClusterSnapshotResult {
  DBClusterSnapshot?: DBClusterSnapshot;
}
export interface CopyDBParameterGroupMessage {
  SourceDBParameterGroupIdentifier?: string;
  TargetDBParameterGroupIdentifier?: string;
  TargetDBParameterGroupDescription?: string;
  Tags?: Tag[];
}
export interface DBParameterGroup {
  DBParameterGroupName?: string;
  DBParameterGroupFamily?: string;
  Description?: string;
  DBParameterGroupArn?: string;
}
export interface CopyDBParameterGroupResult {
  DBParameterGroup?: DBParameterGroup;
}
export type VpcSecurityGroupIdList = string[];
export type LogTypeList = string[];
export interface ServerlessV2ScalingConfiguration {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export type GlobalClusterIdentifier = string;
export interface CreateDBClusterMessage {
  AvailabilityZones?: string[];
  BackupRetentionPeriod?: number;
  CharacterSetName?: string;
  CopyTagsToSnapshot?: boolean;
  DatabaseName?: string;
  DBClusterIdentifier?: string;
  DBClusterParameterGroupName?: string;
  VpcSecurityGroupIds?: string[];
  DBSubnetGroupName?: string;
  Engine?: string;
  EngineVersion?: string;
  Port?: number;
  MasterUsername?: string;
  MasterUserPassword?: string | redacted.Redacted<string>;
  OptionGroupName?: string;
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  ReplicationSourceIdentifier?: string;
  Tags?: Tag[];
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  PreSignedUrl?: string;
  EnableIAMDatabaseAuthentication?: boolean;
  EnableCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  GlobalClusterIdentifier?: string;
  StorageType?: string;
  NetworkType?: string;
}
export interface DBClusterOptionGroupStatus {
  DBClusterOptionGroupName?: string;
  Status?: string;
}
export type DBClusterOptionGroupMemberships = DBClusterOptionGroupStatus[];
export type ReadReplicaIdentifierList = string[];
export interface DBClusterMember {
  DBInstanceIdentifier?: string;
  IsClusterWriter?: boolean;
  DBClusterParameterGroupStatus?: string;
  PromotionTier?: number;
}
export type DBClusterMemberList = DBClusterMember[];
export interface VpcSecurityGroupMembership {
  VpcSecurityGroupId?: string;
  Status?: string;
}
export type VpcSecurityGroupMembershipList = VpcSecurityGroupMembership[];
export interface DBClusterRole {
  RoleArn?: string;
  Status?: string;
  FeatureName?: string;
}
export type DBClusterRoles = DBClusterRole[];
export interface PendingCloudwatchLogsExports {
  LogTypesToEnable?: string[];
  LogTypesToDisable?: string[];
}
export interface ClusterPendingModifiedValues {
  PendingCloudwatchLogsExports?: PendingCloudwatchLogsExports;
  DBClusterIdentifier?: string;
  IAMDatabaseAuthenticationEnabled?: boolean;
  EngineVersion?: string;
  BackupRetentionPeriod?: number;
  StorageType?: string;
  AllocatedStorage?: number;
  Iops?: number;
  NetworkType?: string;
}
export interface ServerlessV2ScalingConfigurationInfo {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export interface DBCluster {
  AllocatedStorage?: number;
  AvailabilityZones?: string[];
  BackupRetentionPeriod?: number;
  CharacterSetName?: string;
  DatabaseName?: string;
  DBClusterIdentifier?: string;
  DBClusterParameterGroup?: string;
  DBSubnetGroup?: string;
  Status?: string;
  PercentProgress?: string;
  EarliestRestorableTime?: Date;
  Endpoint?: string;
  ReaderEndpoint?: string;
  MultiAZ?: boolean;
  Engine?: string;
  EngineVersion?: string;
  LatestRestorableTime?: Date;
  Port?: number;
  MasterUsername?: string;
  DBClusterOptionGroupMemberships?: DBClusterOptionGroupStatus[];
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  ReplicationSourceIdentifier?: string;
  ReadReplicaIdentifiers?: string[];
  DBClusterMembers?: DBClusterMember[];
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  HostedZoneId?: string;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DbClusterResourceId?: string;
  DBClusterArn?: string;
  AssociatedRoles?: DBClusterRole[];
  IAMDatabaseAuthenticationEnabled?: boolean;
  CloneGroupId?: string;
  ClusterCreateTime?: Date;
  CopyTagsToSnapshot?: boolean;
  EnabledCloudwatchLogsExports?: string[];
  PendingModifiedValues?: ClusterPendingModifiedValues;
  DeletionProtection?: boolean;
  CrossAccountClone?: boolean;
  AutomaticRestartTime?: Date;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfigurationInfo;
  GlobalClusterIdentifier?: string;
  IOOptimizedNextAllowedModificationTime?: Date;
  StorageType?: string;
  NetworkType?: string;
}
export interface CreateDBClusterResult {
  DBCluster?: DBCluster;
}
export type StringList = string[];
export interface CreateDBClusterEndpointMessage {
  DBClusterIdentifier?: string;
  DBClusterEndpointIdentifier?: string;
  EndpointType?: string;
  StaticMembers?: string[];
  ExcludedMembers?: string[];
  Tags?: Tag[];
}
export interface CreateDBClusterEndpointOutput {
  DBClusterEndpointIdentifier?: string;
  DBClusterIdentifier?: string;
  DBClusterEndpointResourceIdentifier?: string;
  Endpoint?: string;
  Status?: string;
  EndpointType?: string;
  CustomEndpointType?: string;
  StaticMembers?: string[];
  ExcludedMembers?: string[];
  DBClusterEndpointArn?: string;
}
export interface CreateDBClusterParameterGroupMessage {
  DBClusterParameterGroupName?: string;
  DBParameterGroupFamily?: string;
  Description?: string;
  Tags?: Tag[];
}
export interface CreateDBClusterParameterGroupResult {
  DBClusterParameterGroup?: DBClusterParameterGroup;
}
export interface CreateDBClusterSnapshotMessage {
  DBClusterSnapshotIdentifier?: string;
  DBClusterIdentifier?: string;
  Tags?: Tag[];
}
export interface CreateDBClusterSnapshotResult {
  DBClusterSnapshot?: DBClusterSnapshot;
}
export type DBSecurityGroupNameList = string[];
export type SensitiveString = string | redacted.Redacted<string>;
export interface CreateDBInstanceMessage {
  DBName?: string;
  DBInstanceIdentifier?: string;
  AllocatedStorage?: number;
  DBInstanceClass?: string;
  Engine?: string;
  MasterUsername?: string;
  MasterUserPassword?: string | redacted.Redacted<string>;
  DBSecurityGroups?: string[];
  VpcSecurityGroupIds?: string[];
  AvailabilityZone?: string;
  DBSubnetGroupName?: string;
  PreferredMaintenanceWindow?: string;
  DBParameterGroupName?: string;
  BackupRetentionPeriod?: number;
  PreferredBackupWindow?: string;
  Port?: number;
  MultiAZ?: boolean;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  LicenseModel?: string;
  Iops?: number;
  OptionGroupName?: string;
  CharacterSetName?: string;
  PubliclyAccessible?: boolean;
  Tags?: Tag[];
  DBClusterIdentifier?: string;
  StorageType?: string;
  TdeCredentialArn?: string;
  TdeCredentialPassword?: string | redacted.Redacted<string>;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  Domain?: string;
  CopyTagsToSnapshot?: boolean;
  MonitoringInterval?: number;
  MonitoringRoleArn?: string;
  DomainIAMRoleName?: string;
  PromotionTier?: number;
  Timezone?: string;
  EnableIAMDatabaseAuthentication?: boolean;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  EnableCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
}
export interface Endpoint {
  Address?: string;
  Port?: number;
  HostedZoneId?: string;
}
const Endpoint = /*@__PURE__*/ __L.at(__c43, 0) as any as S.Schema<Endpoint>;
export interface DBSecurityGroupMembership {
  DBSecurityGroupName?: string;
  Status?: string;
}
export type DBSecurityGroupMembershipList = DBSecurityGroupMembership[];
export interface DBParameterGroupStatus {
  DBParameterGroupName?: string;
  ParameterApplyStatus?: string;
}
export type DBParameterGroupStatusList = DBParameterGroupStatus[];
export interface AvailabilityZone {
  Name?: string;
}
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AvailabilityZone;
  SubnetStatus?: string;
}
export type SubnetList = Subnet[];
export interface DBSubnetGroup {
  DBSubnetGroupName?: string;
  DBSubnetGroupDescription?: string;
  VpcId?: string;
  SubnetGroupStatus?: string;
  Subnets?: Subnet[];
  DBSubnetGroupArn?: string;
  SupportedNetworkTypes?: string[];
}
export interface PendingModifiedValues {
  DBInstanceClass?: string;
  AllocatedStorage?: number;
  MasterUserPassword?: string | redacted.Redacted<string>;
  Port?: number;
  BackupRetentionPeriod?: number;
  MultiAZ?: boolean;
  EngineVersion?: string;
  LicenseModel?: string;
  Iops?: number;
  DBInstanceIdentifier?: string;
  StorageType?: string;
  CACertificateIdentifier?: string;
  DBSubnetGroupName?: string;
  PendingCloudwatchLogsExports?: PendingCloudwatchLogsExports;
}
export type ReadReplicaDBInstanceIdentifierList = string[];
export type ReadReplicaDBClusterIdentifierList = string[];
export interface OptionGroupMembership {
  OptionGroupName?: string;
  Status?: string;
}
export type OptionGroupMembershipList = OptionGroupMembership[];
export interface DBInstanceStatusInfo {
  StatusType?: string;
  Normal?: boolean;
  Status?: string;
  Message?: string;
}
export type DBInstanceStatusInfoList = DBInstanceStatusInfo[];
export interface DomainMembership {
  Domain?: string;
  Status?: string;
  FQDN?: string;
  IAMRoleName?: string;
}
export type DomainMembershipList = DomainMembership[];
export interface DBInstance {
  DBInstanceIdentifier?: string;
  DBInstanceClass?: string;
  Engine?: string;
  DBInstanceStatus?: string;
  MasterUsername?: string;
  DBName?: string;
  Endpoint?: Endpoint;
  AllocatedStorage?: number;
  InstanceCreateTime?: Date;
  PreferredBackupWindow?: string;
  BackupRetentionPeriod?: number;
  DBSecurityGroups?: DBSecurityGroupMembership[];
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  DBParameterGroups?: DBParameterGroupStatus[];
  AvailabilityZone?: string;
  DBSubnetGroup?: DBSubnetGroup;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: PendingModifiedValues;
  LatestRestorableTime?: Date;
  MultiAZ?: boolean;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  ReadReplicaSourceDBInstanceIdentifier?: string;
  ReadReplicaDBInstanceIdentifiers?: string[];
  ReadReplicaDBClusterIdentifiers?: string[];
  LicenseModel?: string;
  Iops?: number;
  OptionGroupMemberships?: OptionGroupMembership[];
  CharacterSetName?: string;
  SecondaryAvailabilityZone?: string;
  PubliclyAccessible?: boolean;
  StatusInfos?: DBInstanceStatusInfo[];
  StorageType?: string;
  TdeCredentialArn?: string;
  DbInstancePort?: number;
  DBClusterIdentifier?: string;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DbiResourceId?: string;
  CACertificateIdentifier?: string;
  DomainMemberships?: DomainMembership[];
  CopyTagsToSnapshot?: boolean;
  MonitoringInterval?: number;
  EnhancedMonitoringResourceArn?: string;
  MonitoringRoleArn?: string;
  PromotionTier?: number;
  DBInstanceArn?: string;
  Timezone?: string;
  IAMDatabaseAuthenticationEnabled?: boolean;
  PerformanceInsightsEnabled?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  EnabledCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
  NetworkType?: string;
}
export interface CreateDBInstanceResult {
  DBInstance?: DBInstance;
}
export interface CreateDBParameterGroupMessage {
  DBParameterGroupName?: string;
  DBParameterGroupFamily?: string;
  Description?: string;
  Tags?: Tag[];
}
export interface CreateDBParameterGroupResult {
  DBParameterGroup?: DBParameterGroup;
}
export type SubnetIdentifierList = string[];
export interface CreateDBSubnetGroupMessage {
  DBSubnetGroupName?: string;
  DBSubnetGroupDescription?: string;
  SubnetIds?: string[];
  Tags?: Tag[];
}
export interface CreateDBSubnetGroupResult {
  DBSubnetGroup?: DBSubnetGroup;
}
export interface CreateEventSubscriptionMessage {
  SubscriptionName?: string;
  SnsTopicArn?: string;
  SourceType?: string;
  EventCategories?: string[];
  SourceIds?: string[];
  Enabled?: boolean;
  Tags?: Tag[];
}
export interface CreateEventSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export interface CreateGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
  SourceDBClusterIdentifier?: string;
  Engine?: string;
  EngineVersion?: string;
  DeletionProtection?: boolean;
  DatabaseName?: string;
  Tags?: Tag[];
  StorageEncrypted?: boolean;
}
export type ReadersArnList = string[];
export interface GlobalClusterMember {
  DBClusterArn?: string;
  Readers?: string[];
  IsWriter?: boolean;
}
export type GlobalClusterMemberList = GlobalClusterMember[];
export type FailoverStatus = "pending" | "failing-over" | "cancelling" | (string & {});
export interface FailoverState {
  Status?: FailoverStatus;
  FromDbClusterArn?: string;
  ToDbClusterArn?: string;
  IsDataLossAllowed?: boolean;
}
export interface GlobalCluster {
  GlobalClusterIdentifier?: string;
  GlobalClusterResourceId?: string;
  GlobalClusterArn?: string;
  Status?: string;
  Engine?: string;
  EngineVersion?: string;
  DatabaseName?: string;
  StorageEncrypted?: boolean;
  DeletionProtection?: boolean;
  GlobalClusterMembers?: GlobalClusterMember[];
  FailoverState?: FailoverState;
  TagList?: Tag[];
}
export interface CreateGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export interface DeleteDBClusterMessage {
  DBClusterIdentifier?: string;
  SkipFinalSnapshot?: boolean;
  FinalDBSnapshotIdentifier?: string;
}
export interface DeleteDBClusterResult {
  DBCluster?: DBCluster;
}
export interface DeleteDBClusterEndpointMessage {
  DBClusterEndpointIdentifier?: string;
}
export interface DeleteDBClusterEndpointOutput {
  DBClusterEndpointIdentifier?: string;
  DBClusterIdentifier?: string;
  DBClusterEndpointResourceIdentifier?: string;
  Endpoint?: string;
  Status?: string;
  EndpointType?: string;
  CustomEndpointType?: string;
  StaticMembers?: string[];
  ExcludedMembers?: string[];
  DBClusterEndpointArn?: string;
}
export interface DeleteDBClusterParameterGroupMessage {
  DBClusterParameterGroupName?: string;
}
export interface DeleteDBClusterParameterGroupResponse {}
export interface DeleteDBClusterSnapshotMessage {
  DBClusterSnapshotIdentifier?: string;
}
export interface DeleteDBClusterSnapshotResult {
  DBClusterSnapshot?: DBClusterSnapshot;
}
export interface DeleteDBInstanceMessage {
  DBInstanceIdentifier?: string;
  SkipFinalSnapshot?: boolean;
  FinalDBSnapshotIdentifier?: string;
}
export interface DeleteDBInstanceResult {
  DBInstance?: DBInstance;
}
export interface DeleteDBParameterGroupMessage {
  DBParameterGroupName?: string;
}
export interface DeleteDBParameterGroupResponse {}
export interface DeleteDBSubnetGroupMessage {
  DBSubnetGroupName?: string;
}
export interface DeleteDBSubnetGroupResponse {}
export interface DeleteEventSubscriptionMessage {
  SubscriptionName?: string;
}
export interface DeleteEventSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export interface DeleteGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
}
export interface DeleteGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export type FilterValueList = string[];
export interface Filter {
  Name?: string;
  Values?: string[];
}
export type FilterList = Filter[];
export interface DescribeDBClusterEndpointsMessage {
  DBClusterIdentifier?: string;
  DBClusterEndpointIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface DBClusterEndpoint {
  DBClusterEndpointIdentifier?: string;
  DBClusterIdentifier?: string;
  DBClusterEndpointResourceIdentifier?: string;
  Endpoint?: string;
  Status?: string;
  EndpointType?: string;
  CustomEndpointType?: string;
  StaticMembers?: string[];
  ExcludedMembers?: string[];
  DBClusterEndpointArn?: string;
}
export type DBClusterEndpointList = DBClusterEndpoint[];
export interface DBClusterEndpointMessage {
  Marker?: string;
  DBClusterEndpoints?: DBClusterEndpoint[];
}
export interface DescribeDBClusterParameterGroupsMessage {
  DBClusterParameterGroupName?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type DBClusterParameterGroupList = DBClusterParameterGroup[];
export interface DBClusterParameterGroupsMessage {
  Marker?: string;
  DBClusterParameterGroups?: DBClusterParameterGroup[];
}
export interface DescribeDBClusterParametersMessage {
  DBClusterParameterGroupName?: string;
  Source?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type ApplyMethod = "immediate" | "pending-reboot" | (string & {});
export interface Parameter {
  ParameterName?: string;
  ParameterValue?: string;
  Description?: string;
  Source?: string;
  ApplyType?: string;
  DataType?: string;
  AllowedValues?: string;
  IsModifiable?: boolean;
  MinimumEngineVersion?: string;
  ApplyMethod?: ApplyMethod;
}
export type ParametersList = Parameter[];
export interface DBClusterParameterGroupDetails {
  Parameters?: Parameter[];
  Marker?: string;
}
export interface DescribeDBClustersMessage {
  DBClusterIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type DBClusterList = DBCluster[];
export interface DBClusterMessage {
  Marker?: string;
  DBClusters?: DBCluster[];
}
export interface DescribeDBClusterSnapshotAttributesMessage {
  DBClusterSnapshotIdentifier?: string;
}
export type AttributeValueList = string[];
export interface DBClusterSnapshotAttribute {
  AttributeName?: string;
  AttributeValues?: string[];
}
export type DBClusterSnapshotAttributeList = DBClusterSnapshotAttribute[];
export interface DBClusterSnapshotAttributesResult {
  DBClusterSnapshotIdentifier?: string;
  DBClusterSnapshotAttributes?: DBClusterSnapshotAttribute[];
}
export interface DescribeDBClusterSnapshotAttributesResult {
  DBClusterSnapshotAttributesResult?: DBClusterSnapshotAttributesResult;
}
export interface DescribeDBClusterSnapshotsMessage {
  DBClusterIdentifier?: string;
  DBClusterSnapshotIdentifier?: string;
  SnapshotType?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
  IncludeShared?: boolean;
  IncludePublic?: boolean;
}
export type DBClusterSnapshotList = DBClusterSnapshot[];
export interface DBClusterSnapshotMessage {
  Marker?: string;
  DBClusterSnapshots?: DBClusterSnapshot[];
}
export interface DescribeDBEngineVersionsMessage {
  Engine?: string;
  EngineVersion?: string;
  DBParameterGroupFamily?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
  DefaultOnly?: boolean;
  ListSupportedCharacterSets?: boolean;
  ListSupportedTimezones?: boolean;
}
export interface CharacterSet {
  CharacterSetName?: string;
  CharacterSetDescription?: string;
}
export type SupportedCharacterSetsList = CharacterSet[];
export interface UpgradeTarget {
  Engine?: string;
  EngineVersion?: string;
  Description?: string;
  AutoUpgrade?: boolean;
  IsMajorVersionUpgrade?: boolean;
  SupportsGlobalDatabases?: boolean;
}
export type ValidUpgradeTargetList = UpgradeTarget[];
export interface Timezone {
  TimezoneName?: string;
}
export type SupportedTimezonesList = Timezone[];
export interface DBEngineVersion {
  Engine?: string;
  EngineVersion?: string;
  DBParameterGroupFamily?: string;
  DBEngineDescription?: string;
  DBEngineVersionDescription?: string;
  DefaultCharacterSet?: CharacterSet;
  SupportedCharacterSets?: CharacterSet[];
  ValidUpgradeTarget?: UpgradeTarget[];
  SupportedTimezones?: Timezone[];
  ExportableLogTypes?: string[];
  SupportsLogExportsToCloudwatchLogs?: boolean;
  SupportsReadReplica?: boolean;
  SupportsGlobalDatabases?: boolean;
}
export type DBEngineVersionList = DBEngineVersion[];
export interface DBEngineVersionMessage {
  Marker?: string;
  DBEngineVersions?: DBEngineVersion[];
}
export interface DescribeDBInstancesMessage {
  DBInstanceIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type DBInstanceList = DBInstance[];
export interface DBInstanceMessage {
  Marker?: string;
  DBInstances?: DBInstance[];
}
export interface DescribeDBParameterGroupsMessage {
  DBParameterGroupName?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type DBParameterGroupList = DBParameterGroup[];
export interface DBParameterGroupsMessage {
  Marker?: string;
  DBParameterGroups?: DBParameterGroup[];
}
export interface DescribeDBParametersMessage {
  DBParameterGroupName?: string;
  Source?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface DBParameterGroupDetails {
  Parameters?: Parameter[];
  Marker?: string;
}
export interface DescribeDBSubnetGroupsMessage {
  DBSubnetGroupName?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type DBSubnetGroups = DBSubnetGroup[];
export interface DBSubnetGroupMessage {
  Marker?: string;
  DBSubnetGroups?: DBSubnetGroup[];
}
export interface DescribeEngineDefaultClusterParametersMessage {
  DBParameterGroupFamily?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface EngineDefaults {
  DBParameterGroupFamily?: string;
  Marker?: string;
  Parameters?: Parameter[];
}
export interface DescribeEngineDefaultClusterParametersResult {
  EngineDefaults?: EngineDefaults;
}
export interface DescribeEngineDefaultParametersMessage {
  DBParameterGroupFamily?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface DescribeEngineDefaultParametersResult {
  EngineDefaults?: EngineDefaults;
}
export interface DescribeEventCategoriesMessage {
  SourceType?: string;
  Filters?: Filter[];
}
export interface EventCategoriesMap {
  SourceType?: string;
  EventCategories?: string[];
}
export type EventCategoriesMapList = EventCategoriesMap[];
export interface EventCategoriesMessage {
  EventCategoriesMapList?: EventCategoriesMap[];
}
export type SourceType =
  | "db-instance"
  | "db-parameter-group"
  | "db-security-group"
  | "db-snapshot"
  | "db-cluster"
  | "db-cluster-snapshot"
  | (string & {});
export interface DescribeEventsMessage {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  EventCategories?: string[];
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface Event {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  Message?: string;
  EventCategories?: string[];
  Date?: Date;
  SourceArn?: string;
}
export type EventList = Event[];
export interface EventsMessage {
  Marker?: string;
  Events?: Event[];
}
export interface DescribeEventSubscriptionsMessage {
  SubscriptionName?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type EventSubscriptionsList = EventSubscription[];
export interface EventSubscriptionsMessage {
  Marker?: string;
  EventSubscriptionsList?: EventSubscription[];
}
export interface DescribeGlobalClustersMessage {
  GlobalClusterIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type GlobalClusterList = GlobalCluster[];
export interface GlobalClustersMessage {
  Marker?: string;
  GlobalClusters?: GlobalCluster[];
}
export interface DescribeOrderableDBInstanceOptionsMessage {
  Engine?: string;
  EngineVersion?: string;
  DBInstanceClass?: string;
  LicenseModel?: string;
  Vpc?: boolean;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type AvailabilityZoneList = AvailabilityZone[];
export interface OrderableDBInstanceOption {
  Engine?: string;
  EngineVersion?: string;
  DBInstanceClass?: string;
  LicenseModel?: string;
  AvailabilityZones?: AvailabilityZone[];
  MultiAZCapable?: boolean;
  ReadReplicaCapable?: boolean;
  Vpc?: boolean;
  SupportsStorageEncryption?: boolean;
  StorageType?: string;
  SupportsIops?: boolean;
  SupportsEnhancedMonitoring?: boolean;
  SupportsIAMDatabaseAuthentication?: boolean;
  SupportsPerformanceInsights?: boolean;
  MinStorageSize?: number;
  MaxStorageSize?: number;
  MinIopsPerDbInstance?: number;
  MaxIopsPerDbInstance?: number;
  MinIopsPerGib?: number;
  MaxIopsPerGib?: number;
  SupportsGlobalDatabases?: boolean;
  SupportedNetworkTypes?: string[];
}
export type OrderableDBInstanceOptionsList = OrderableDBInstanceOption[];
export interface OrderableDBInstanceOptionsMessage {
  OrderableDBInstanceOptions?: OrderableDBInstanceOption[];
  Marker?: string;
}
export interface DescribePendingMaintenanceActionsMessage {
  ResourceIdentifier?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export type PendingMaintenanceActions = ResourcePendingMaintenanceActions[];
export interface PendingMaintenanceActionsMessage {
  PendingMaintenanceActions?: ResourcePendingMaintenanceActions[];
  Marker?: string;
}
export interface DescribeValidDBInstanceModificationsMessage {
  DBInstanceIdentifier?: string;
}
export interface Range {
  From?: number;
  To?: number;
  Step?: number;
}
export type RangeList = Range[];
export interface DoubleRange {
  From?: number;
  To?: number;
}
export type DoubleRangeList = DoubleRange[];
export interface ValidStorageOptions {
  StorageType?: string;
  StorageSize?: Range[];
  ProvisionedIops?: Range[];
  IopsToStorageRatio?: DoubleRange[];
}
export type ValidStorageOptionsList = ValidStorageOptions[];
export interface ValidDBInstanceModificationsMessage {
  Storage?: ValidStorageOptions[];
}
export interface DescribeValidDBInstanceModificationsResult {
  ValidDBInstanceModificationsMessage?: ValidDBInstanceModificationsMessage;
}
export interface FailoverDBClusterMessage {
  DBClusterIdentifier?: string;
  TargetDBInstanceIdentifier?: string;
}
export interface FailoverDBClusterResult {
  DBCluster?: DBCluster;
}
export interface FailoverGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
  TargetDbClusterIdentifier?: string;
  AllowDataLoss?: boolean;
  Switchover?: boolean;
}
export interface FailoverGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export interface ListTagsForResourceMessage {
  ResourceName?: string;
  Filters?: Filter[];
}
export interface TagListMessage {
  TagList?: Tag[];
}
export interface CloudwatchLogsExportConfiguration {
  EnableLogTypes?: string[];
  DisableLogTypes?: string[];
}
export interface ModifyDBClusterMessage {
  DBClusterIdentifier?: string;
  NewDBClusterIdentifier?: string;
  ApplyImmediately?: boolean;
  BackupRetentionPeriod?: number;
  DBClusterParameterGroupName?: string;
  VpcSecurityGroupIds?: string[];
  Port?: number;
  MasterUserPassword?: string | redacted.Redacted<string>;
  OptionGroupName?: string;
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  EnableIAMDatabaseAuthentication?: boolean;
  CloudwatchLogsExportConfiguration?: CloudwatchLogsExportConfiguration;
  EngineVersion?: string;
  AllowMajorVersionUpgrade?: boolean;
  DBInstanceParameterGroupName?: string;
  DeletionProtection?: boolean;
  CopyTagsToSnapshot?: boolean;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  StorageType?: string;
  NetworkType?: string;
}
export interface ModifyDBClusterResult {
  DBCluster?: DBCluster;
}
export interface ModifyDBClusterEndpointMessage {
  DBClusterEndpointIdentifier?: string;
  EndpointType?: string;
  StaticMembers?: string[];
  ExcludedMembers?: string[];
}
export interface ModifyDBClusterEndpointOutput {
  DBClusterEndpointIdentifier?: string;
  DBClusterIdentifier?: string;
  DBClusterEndpointResourceIdentifier?: string;
  Endpoint?: string;
  Status?: string;
  EndpointType?: string;
  CustomEndpointType?: string;
  StaticMembers?: string[];
  ExcludedMembers?: string[];
  DBClusterEndpointArn?: string;
}
export interface ModifyDBClusterParameterGroupMessage {
  DBClusterParameterGroupName?: string;
  Parameters?: Parameter[];
}
export interface DBClusterParameterGroupNameMessage {
  DBClusterParameterGroupName?: string;
}
export interface ModifyDBClusterSnapshotAttributeMessage {
  DBClusterSnapshotIdentifier?: string;
  AttributeName?: string;
  ValuesToAdd?: string[];
  ValuesToRemove?: string[];
}
export interface ModifyDBClusterSnapshotAttributeResult {
  DBClusterSnapshotAttributesResult?: DBClusterSnapshotAttributesResult;
}
export interface ModifyDBInstanceMessage {
  DBInstanceIdentifier?: string;
  AllocatedStorage?: number;
  DBInstanceClass?: string;
  DBSubnetGroupName?: string;
  DBSecurityGroups?: string[];
  VpcSecurityGroupIds?: string[];
  ApplyImmediately?: boolean;
  MasterUserPassword?: string | redacted.Redacted<string>;
  DBParameterGroupName?: string;
  BackupRetentionPeriod?: number;
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  MultiAZ?: boolean;
  EngineVersion?: string;
  AllowMajorVersionUpgrade?: boolean;
  AutoMinorVersionUpgrade?: boolean;
  LicenseModel?: string;
  Iops?: number;
  OptionGroupName?: string;
  NewDBInstanceIdentifier?: string;
  StorageType?: string;
  TdeCredentialArn?: string;
  TdeCredentialPassword?: string | redacted.Redacted<string>;
  CACertificateIdentifier?: string;
  Domain?: string;
  CopyTagsToSnapshot?: boolean;
  MonitoringInterval?: number;
  DBPortNumber?: number;
  PubliclyAccessible?: boolean;
  MonitoringRoleArn?: string;
  DomainIAMRoleName?: string;
  PromotionTier?: number;
  EnableIAMDatabaseAuthentication?: boolean;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  CloudwatchLogsExportConfiguration?: CloudwatchLogsExportConfiguration;
  DeletionProtection?: boolean;
}
export interface ModifyDBInstanceResult {
  DBInstance?: DBInstance;
}
export interface ModifyDBParameterGroupMessage {
  DBParameterGroupName?: string;
  Parameters?: Parameter[];
}
export interface DBParameterGroupNameMessage {
  DBParameterGroupName?: string;
}
export interface ModifyDBSubnetGroupMessage {
  DBSubnetGroupName?: string;
  DBSubnetGroupDescription?: string;
  SubnetIds?: string[];
}
export interface ModifyDBSubnetGroupResult {
  DBSubnetGroup?: DBSubnetGroup;
}
export interface ModifyEventSubscriptionMessage {
  SubscriptionName?: string;
  SnsTopicArn?: string;
  SourceType?: string;
  EventCategories?: string[];
  Enabled?: boolean;
}
export interface ModifyEventSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export interface ModifyGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
  NewGlobalClusterIdentifier?: string;
  DeletionProtection?: boolean;
  EngineVersion?: string;
  AllowMajorVersionUpgrade?: boolean;
}
export interface ModifyGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export interface PromoteReadReplicaDBClusterMessage {
  DBClusterIdentifier?: string;
}
export interface PromoteReadReplicaDBClusterResult {
  DBCluster?: DBCluster;
}
export interface RebootDBInstanceMessage {
  DBInstanceIdentifier?: string;
  ForceFailover?: boolean;
}
export interface RebootDBInstanceResult {
  DBInstance?: DBInstance;
}
export interface RemoveFromGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
  DbClusterIdentifier?: string;
}
export interface RemoveFromGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export interface RemoveRoleFromDBClusterMessage {
  DBClusterIdentifier?: string;
  RoleArn?: string;
  FeatureName?: string;
}
export interface RemoveRoleFromDBClusterResponse {}
export interface RemoveSourceIdentifierFromSubscriptionMessage {
  SubscriptionName?: string;
  SourceIdentifier?: string;
}
export interface RemoveSourceIdentifierFromSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export type KeyList = string[];
export interface RemoveTagsFromResourceMessage {
  ResourceName?: string;
  TagKeys?: string[];
}
export interface RemoveTagsFromResourceResponse {}
export interface ResetDBClusterParameterGroupMessage {
  DBClusterParameterGroupName?: string;
  ResetAllParameters?: boolean;
  Parameters?: Parameter[];
}
export interface ResetDBParameterGroupMessage {
  DBParameterGroupName?: string;
  ResetAllParameters?: boolean;
  Parameters?: Parameter[];
}
export interface RestoreDBClusterFromSnapshotMessage {
  AvailabilityZones?: string[];
  DBClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  Engine?: string;
  EngineVersion?: string;
  Port?: number;
  DBSubnetGroupName?: string;
  DatabaseName?: string;
  OptionGroupName?: string;
  VpcSecurityGroupIds?: string[];
  Tags?: Tag[];
  KmsKeyId?: string;
  EnableIAMDatabaseAuthentication?: boolean;
  EnableCloudwatchLogsExports?: string[];
  DBClusterParameterGroupName?: string;
  DeletionProtection?: boolean;
  CopyTagsToSnapshot?: boolean;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  StorageType?: string;
  NetworkType?: string;
}
export interface RestoreDBClusterFromSnapshotResult {
  DBCluster?: DBCluster;
}
export interface RestoreDBClusterToPointInTimeMessage {
  DBClusterIdentifier?: string;
  RestoreType?: string;
  SourceDBClusterIdentifier?: string;
  RestoreToTime?: Date;
  UseLatestRestorableTime?: boolean;
  Port?: number;
  DBSubnetGroupName?: string;
  OptionGroupName?: string;
  VpcSecurityGroupIds?: string[];
  Tags?: Tag[];
  KmsKeyId?: string;
  EnableIAMDatabaseAuthentication?: boolean;
  EnableCloudwatchLogsExports?: string[];
  DBClusterParameterGroupName?: string;
  DeletionProtection?: boolean;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  StorageType?: string;
  NetworkType?: string;
}
export interface RestoreDBClusterToPointInTimeResult {
  DBCluster?: DBCluster;
}
export interface StartDBClusterMessage {
  DBClusterIdentifier?: string;
}
export interface StartDBClusterResult {
  DBCluster?: DBCluster;
}
export interface StopDBClusterMessage {
  DBClusterIdentifier?: string;
}
export interface StopDBClusterResult {
  DBCluster?: DBCluster;
}
export interface SwitchoverGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
  TargetDbClusterIdentifier?: string;
}
export interface SwitchoverGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export type ExceptionMessage = string;
export type AddRoleToDBClusterError =
  | DBClusterNotFoundFault
  | DBClusterRoleAlreadyExistsFault
  | DBClusterRoleQuotaExceededFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Associates an Identity and Access Management (IAM) role with an
 * Neptune DB cluster.
 */
export const addRoleToDBCluster: API.OperationMethod<
  AddRoleToDBClusterMessage,
  AddRoleToDBClusterResponse,
  AddRoleToDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<AddRoleToDBClusterMessage>,
  output: __S(673, __c42, 1) as any as S.Schema<AddRoleToDBClusterResponse>,
  errors: [
    DBClusterNotFoundFault,
    DBClusterRoleAlreadyExistsFault,
    DBClusterRoleQuotaExceededFault,
    InvalidDBClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddRoleToDBCluster",
}));

export type AddSourceIdentifierToSubscriptionError =
  | SourceNotFoundFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Adds a source identifier to an existing event notification subscription.
 */
export const addSourceIdentifierToSubscription: API.OperationMethod<
  AddSourceIdentifierToSubscriptionMessage,
  AddSourceIdentifierToSubscriptionResult,
  AddSourceIdentifierToSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<AddSourceIdentifierToSubscriptionMessage>,
  output: __S(705, __c44, 1) as any as S.Schema<AddSourceIdentifierToSubscriptionResult>,
  errors: [SourceNotFoundFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddSourceIdentifierToSubscription",
}));

export type AddTagsToResourceError =
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | DBSnapshotNotFoundFault
  | CommonErrors;
/**
 * Adds metadata tags to an Amazon Neptune resource. These tags can also be used with cost
 * allocation reporting to track cost associated with Amazon Neptune resources, or used in a
 * Condition statement in an IAM policy for Amazon Neptune.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceMessage,
  AddTagsToResourceResponse,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<AddTagsToResourceMessage>,
  output: __S(753, __c47, 1) as any as S.Schema<AddTagsToResourceResponse>,
  errors: [DBClusterNotFoundFault, DBInstanceNotFoundFault, DBSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
}));

export type ApplyPendingMaintenanceActionError = ResourceNotFoundFault | CommonErrors;
/**
 * Applies a pending maintenance action to a resource (for example, to a DB instance).
 */
export const applyPendingMaintenanceAction: API.OperationMethod<
  ApplyPendingMaintenanceActionMessage,
  ApplyPendingMaintenanceActionResult,
  ApplyPendingMaintenanceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<ApplyPendingMaintenanceActionMessage>,
  output: __S(785, __c49, 1) as any as S.Schema<ApplyPendingMaintenanceActionResult>,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyPendingMaintenanceAction",
}));

export type CopyDBClusterParameterGroupError =
  | DBParameterGroupAlreadyExistsFault
  | DBParameterGroupNotFoundFault
  | DBParameterGroupQuotaExceededFault
  | CommonErrors;
/**
 * Copies the specified DB cluster parameter group.
 */
export const copyDBClusterParameterGroup: API.OperationMethod<
  CopyDBClusterParameterGroupMessage,
  CopyDBClusterParameterGroupResult,
  CopyDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<CopyDBClusterParameterGroupMessage>,
  output: __S(817, __c51, 1) as any as S.Schema<CopyDBClusterParameterGroupResult>,
  errors: [
    DBParameterGroupAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBParameterGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyDBClusterParameterGroup",
}));

export type CopyDBClusterSnapshotError =
  | DBClusterSnapshotAlreadyExistsFault
  | DBClusterSnapshotNotFoundFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBClusterStateFault
  | KMSKeyNotAccessibleFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Copies a snapshot of a DB cluster.
 *
 * To copy a DB cluster snapshot from a shared manual DB cluster snapshot,
 * `SourceDBClusterSnapshotIdentifier` must be the Amazon Resource Name (ARN) of the
 * shared DB cluster snapshot.
 */
export const copyDBClusterSnapshot: API.OperationMethod<
  CopyDBClusterSnapshotMessage,
  CopyDBClusterSnapshotResult,
  CopyDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<CopyDBClusterSnapshotMessage>,
  output: __S(849, __c53, 1) as any as S.Schema<CopyDBClusterSnapshotResult>,
  errors: [
    DBClusterSnapshotAlreadyExistsFault,
    DBClusterSnapshotNotFoundFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBClusterStateFault,
    KMSKeyNotAccessibleFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyDBClusterSnapshot",
}));

export type CopyDBParameterGroupError =
  | DBParameterGroupAlreadyExistsFault
  | DBParameterGroupNotFoundFault
  | DBParameterGroupQuotaExceededFault
  | CommonErrors;
/**
 * Copies the specified DB parameter group.
 */
export const copyDBParameterGroup: API.OperationMethod<
  CopyDBParameterGroupMessage,
  CopyDBParameterGroupResult,
  CopyDBParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<CopyDBParameterGroupMessage>,
  output: __S(897, __c56, 1) as any as S.Schema<CopyDBParameterGroupResult>,
  errors: [
    DBParameterGroupAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBParameterGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyDBParameterGroup",
}));

export type CreateDBClusterError =
  | DBClusterAlreadyExistsFault
  | DBClusterNotFoundFault
  | DBClusterParameterGroupNotFoundFault
  | DBClusterQuotaExceededFault
  | DBInstanceNotFoundFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | GlobalClusterNotFoundFault
  | InsufficientStorageClusterCapacityFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBSubnetGroupStateFault
  | InvalidGlobalClusterStateFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupportedFault
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new Amazon Neptune DB cluster.
 *
 * You can use the `ReplicationSourceIdentifier` parameter to create the DB
 * cluster as a Read Replica of another DB cluster or Amazon Neptune DB instance.
 *
 * Note that when you create a new cluster using `CreateDBCluster` directly,
 * deletion protection is disabled by default (when you create a new production cluster in
 * the console, deletion protection is enabled by default). You can only delete a DB
 * cluster if its `DeletionProtection` field is set to `false`.
 */
export const createDBCluster: API.OperationMethod<
  CreateDBClusterMessage,
  CreateDBClusterResult,
  CreateDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<CreateDBClusterMessage>,
  output: __S(929, __c58, 1) as any as S.Schema<CreateDBClusterResult>,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterNotFoundFault,
    DBClusterParameterGroupNotFoundFault,
    DBClusterQuotaExceededFault,
    DBInstanceNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    GlobalClusterNotFoundFault,
    InsufficientStorageClusterCapacityFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBSubnetGroupStateFault,
    InvalidGlobalClusterStateFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupportedFault,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBCluster",
}));

export type CreateDBClusterEndpointError =
  | DBClusterEndpointAlreadyExistsFault
  | DBClusterEndpointQuotaExceededFault
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Creates a new custom endpoint and associates it with an Amazon Neptune DB cluster.
 */
export const createDBClusterEndpoint: API.OperationMethod<
  CreateDBClusterEndpointMessage,
  CreateDBClusterEndpointOutput,
  CreateDBClusterEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<CreateDBClusterEndpointMessage>,
  output: __S(1025, __c64, 1) as any as S.Schema<CreateDBClusterEndpointOutput>,
  errors: [
    DBClusterEndpointAlreadyExistsFault,
    DBClusterEndpointQuotaExceededFault,
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBClusterEndpoint",
}));

export type CreateDBClusterParameterGroupError =
  | DBParameterGroupAlreadyExistsFault
  | DBParameterGroupQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new DB cluster parameter group.
 *
 * Parameters in a DB cluster parameter group apply to all of the instances in a DB
 * cluster.
 *
 * A DB cluster parameter group is initially created with the default
 * parameters for the database engine used by instances in the DB cluster.
 * To provide custom values for any of the parameters, you must modify the
 * group after creating it using ModifyDBClusterParameterGroup.
 * Once you've created a DB cluster parameter group, you need to associate it
 * with your DB cluster using ModifyDBCluster.
 * When you associate a new DB cluster parameter group with a running DB cluster,
 * you need to reboot the DB instances in the DB cluster without failover for the
 * new DB cluster parameter group and associated settings to take effect.
 *
 * After you create a DB cluster parameter group, you should wait at least
 * 5 minutes before creating your first DB cluster that uses that DB cluster
 * parameter group as the default parameter group. This allows Amazon Neptune
 * to fully complete the create action before the DB cluster parameter group
 * is used as the default for a new DB cluster. This is especially important for
 * parameters that are critical when creating the default database for a DB
 * cluster, such as the character set for the default database defined by the
 * `character_set_database` parameter. You can use the Parameter
 * Groups option of the Amazon Neptune
 * console or the DescribeDBClusterParameters
 * command to verify that your DB cluster parameter group has been created or modified.
 */
export const createDBClusterParameterGroup: API.OperationMethod<
  CreateDBClusterParameterGroupMessage,
  CreateDBClusterParameterGroupResult,
  CreateDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<CreateDBClusterParameterGroupMessage>,
  output: __S(1057, __c66, 1) as any as S.Schema<CreateDBClusterParameterGroupResult>,
  errors: [DBParameterGroupAlreadyExistsFault, DBParameterGroupQuotaExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBClusterParameterGroup",
}));

export type CreateDBClusterSnapshotError =
  | DBClusterNotFoundFault
  | DBClusterSnapshotAlreadyExistsFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBClusterStateFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Creates a snapshot of a DB cluster.
 */
export const createDBClusterSnapshot: API.OperationMethod<
  CreateDBClusterSnapshotMessage,
  CreateDBClusterSnapshotResult,
  CreateDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<CreateDBClusterSnapshotMessage>,
  output: __S(1073, __c67, 1) as any as S.Schema<CreateDBClusterSnapshotResult>,
  errors: [
    DBClusterNotFoundFault,
    DBClusterSnapshotAlreadyExistsFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBClusterStateFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBClusterSnapshot",
}));

export type CreateDBInstanceError =
  | AuthorizationNotFoundFault
  | DBClusterNotFoundFault
  | DBInstanceAlreadyExistsFault
  | DBParameterGroupNotFoundFault
  | DBSecurityGroupNotFoundFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | DomainNotFoundFault
  | InstanceQuotaExceededFault
  | InsufficientDBInstanceCapacityFault
  | InvalidDBClusterStateFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | OptionGroupNotFoundFault
  | ProvisionedIopsNotAvailableInAZFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | CommonErrors;
/**
 * Creates a new DB instance.
 */
export const createDBInstance: API.OperationMethod<
  CreateDBInstanceMessage,
  CreateDBInstanceResult,
  CreateDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<CreateDBInstanceMessage>,
  output: __S(1089, __c68, 1) as any as S.Schema<CreateDBInstanceResult>,
  errors: [
    AuthorizationNotFoundFault,
    DBClusterNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBSecurityGroupNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    DomainNotFoundFault,
    InstanceQuotaExceededFault,
    InsufficientDBInstanceCapacityFault,
    InvalidDBClusterStateFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    OptionGroupNotFoundFault,
    ProvisionedIopsNotAvailableInAZFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBInstance",
}));

export type CreateDBParameterGroupError =
  | DBParameterGroupAlreadyExistsFault
  | DBParameterGroupQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new DB parameter group.
 *
 * A DB parameter group is initially created with the default parameters for the database
 * engine used by the DB instance. To provide custom values for any of the parameters, you must
 * modify the group after creating it using *ModifyDBParameterGroup*. Once
 * you've created a DB parameter group, you need to associate it with your DB instance using
 * *ModifyDBInstance*. When you associate a new DB parameter group with a
 * running DB instance, you need to reboot the DB instance without failover for the new DB
 * parameter group and associated settings to take effect.
 *
 * After you create a DB parameter group, you should wait at least 5 minutes before
 * creating your first DB instance that uses that DB parameter group as the default parameter
 * group. This allows Amazon Neptune to fully complete the create action before the parameter
 * group is used as the default for a new DB instance. This is especially important for
 * parameters that are critical when creating the default database for a DB instance, such as
 * the character set for the default database defined by the
 * `character_set_database` parameter. You can use the Parameter
 * Groups option of the Amazon Neptune console or the
 * *DescribeDBParameters* command to verify that your DB parameter group has
 * been created or modified.
 */
export const createDBParameterGroup: API.OperationMethod<
  CreateDBParameterGroupMessage,
  CreateDBParameterGroupResult,
  CreateDBParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<CreateDBParameterGroupMessage>,
  output: __S(1169, __c73, 1) as any as S.Schema<CreateDBParameterGroupResult>,
  errors: [DBParameterGroupAlreadyExistsFault, DBParameterGroupQuotaExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBParameterGroup",
}));

export type CreateDBSubnetGroupError =
  | DBSubnetGroupAlreadyExistsFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupQuotaExceededFault
  | DBSubnetQuotaExceededFault
  | InvalidSubnet
  | CommonErrors;
/**
 * Creates a new DB subnet group. DB subnet groups must contain at least one subnet in at
 * least two AZs in the Amazon Region.
 */
export const createDBSubnetGroup: API.OperationMethod<
  CreateDBSubnetGroupMessage,
  CreateDBSubnetGroupResult,
  CreateDBSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<CreateDBSubnetGroupMessage>,
  output: __S(1185, __c74, 1) as any as S.Schema<CreateDBSubnetGroupResult>,
  errors: [
    DBSubnetGroupAlreadyExistsFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupQuotaExceededFault,
    DBSubnetQuotaExceededFault,
    InvalidSubnet,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBSubnetGroup",
}));

export type CreateEventSubscriptionError =
  | EventSubscriptionQuotaExceededFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | SNSTopicArnNotFoundFault
  | SourceNotFoundFault
  | SubscriptionAlreadyExistFault
  | SubscriptionCategoryNotFoundFault
  | CommonErrors;
/**
 * Creates an event notification subscription. This action requires a topic ARN (Amazon
 * Resource Name) created by either the Neptune console, the SNS console, or the SNS API. To
 * obtain an ARN with SNS, you must create a topic in Amazon SNS and subscribe to the topic. The
 * ARN is displayed in the SNS console.
 *
 * You can specify the type of source (SourceType) you want to be notified of, provide a list
 * of Neptune sources (SourceIds) that triggers the events, and provide a list of event
 * categories (EventCategories) for events you want to be notified of. For example, you can
 * specify SourceType = db-instance, SourceIds = mydbinstance1, mydbinstance2 and EventCategories
 * = Availability, Backup.
 *
 * If you specify both the SourceType and SourceIds, such as SourceType = db-instance and
 * SourceIdentifier = myDBInstance1, you are notified of all the db-instance events for the
 * specified source. If you specify a SourceType but do not specify a SourceIdentifier, you
 * receive notice of the events for that source type for all your Neptune sources. If you do not
 * specify either the SourceType nor the SourceIdentifier, you are notified of events generated
 * from all Neptune sources belonging to your customer account.
 */
export const createEventSubscription: API.OperationMethod<
  CreateEventSubscriptionMessage,
  CreateEventSubscriptionResult,
  CreateEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<CreateEventSubscriptionMessage>,
  output: __S(1217, __c76, 1) as any as S.Schema<CreateEventSubscriptionResult>,
  errors: [
    EventSubscriptionQuotaExceededFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
    SNSTopicArnNotFoundFault,
    SourceNotFoundFault,
    SubscriptionAlreadyExistFault,
    SubscriptionCategoryNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventSubscription",
}));

export type CreateGlobalClusterError =
  | DBClusterNotFoundFault
  | GlobalClusterAlreadyExistsFault
  | GlobalClusterQuotaExceededFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Creates a Neptune global database spread across multiple Amazon Regions.
 * The global database contains a single primary cluster with read-write
 * capability, and read-only secondary clusters that receive data from the
 * primary cluster through high-speed replication performed by the Neptune
 * storage subsystem.
 *
 * You can create a global database that is initially empty, and then
 * add a primary cluster and secondary clusters to it, or you can specify
 * an existing Neptune cluster during the create operation to become the
 * primary cluster of the global database.
 */
export const createGlobalCluster: API.OperationMethod<
  CreateGlobalClusterMessage,
  CreateGlobalClusterResult,
  CreateGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<CreateGlobalClusterMessage>,
  output: __S(1233, __c77, 1) as any as S.Schema<CreateGlobalClusterResult>,
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterAlreadyExistsFault,
    GlobalClusterQuotaExceededFault,
    InvalidDBClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlobalCluster",
}));

export type DeleteDBClusterError =
  | DBClusterNotFoundFault
  | DBClusterSnapshotAlreadyExistsFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBClusterStateFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * The DeleteDBCluster action deletes a previously provisioned DB cluster. When you delete a
 * DB cluster, all automated backups for that DB cluster are deleted and can't be recovered.
 * Manual DB cluster snapshots of the specified DB cluster are not deleted.
 *
 * Note that the DB Cluster cannot be deleted if deletion protection is enabled. To
 * delete it, you must first set its `DeletionProtection` field to
 * `False`.
 */
export const deleteDBCluster: API.OperationMethod<
  DeleteDBClusterMessage,
  DeleteDBClusterResult,
  DeleteDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<DeleteDBClusterMessage>,
  output: __S(1265, __c79, 1) as any as S.Schema<DeleteDBClusterResult>,
  errors: [
    DBClusterNotFoundFault,
    DBClusterSnapshotAlreadyExistsFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBClusterStateFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBCluster",
}));

export type DeleteDBClusterEndpointError =
  | DBClusterEndpointNotFoundFault
  | InvalidDBClusterEndpointStateFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Deletes a custom endpoint and removes it from an Amazon Neptune DB cluster.
 */
export const deleteDBClusterEndpoint: API.OperationMethod<
  DeleteDBClusterEndpointMessage,
  DeleteDBClusterEndpointOutput,
  DeleteDBClusterEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<DeleteDBClusterEndpointMessage>,
  output: __S(1281, __c80, 1) as any as S.Schema<DeleteDBClusterEndpointOutput>,
  errors: [
    DBClusterEndpointNotFoundFault,
    InvalidDBClusterEndpointStateFault,
    InvalidDBClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBClusterEndpoint",
}));

export type DeleteDBClusterParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Deletes a specified DB cluster parameter group. The DB cluster parameter group to be
 * deleted can't be associated with any DB clusters.
 */
export const deleteDBClusterParameterGroup: API.OperationMethod<
  DeleteDBClusterParameterGroupMessage,
  DeleteDBClusterParameterGroupResponse,
  DeleteDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<DeleteDBClusterParameterGroupMessage>,
  output: __S(1297, __c81, 1) as any as S.Schema<DeleteDBClusterParameterGroupResponse>,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBClusterParameterGroup",
}));

export type DeleteDBClusterSnapshotError =
  | DBClusterSnapshotNotFoundFault
  | InvalidDBClusterSnapshotStateFault
  | CommonErrors;
/**
 * Deletes a DB cluster snapshot. If the snapshot is being copied, the copy operation is
 * terminated.
 *
 * The DB cluster snapshot must be in the `available` state to be
 * deleted.
 */
export const deleteDBClusterSnapshot: API.OperationMethod<
  DeleteDBClusterSnapshotMessage,
  DeleteDBClusterSnapshotResult,
  DeleteDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<DeleteDBClusterSnapshotMessage>,
  output: __S(1313, __c82, 1) as any as S.Schema<DeleteDBClusterSnapshotResult>,
  errors: [DBClusterSnapshotNotFoundFault, InvalidDBClusterSnapshotStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBClusterSnapshot",
}));

export type DeleteDBInstanceError =
  | DBInstanceNotFoundFault
  | DBSnapshotAlreadyExistsFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * The DeleteDBInstance action deletes a previously provisioned DB instance. When you delete
 * a DB instance, all automated backups for that instance are deleted and can't be recovered.
 * Manual DB snapshots of the DB instance to be deleted by `DeleteDBInstance` are not
 * deleted.
 *
 * If you request a final DB snapshot the status of the Amazon Neptune DB instance is
 * `deleting` until the DB snapshot is created. The API action
 * `DescribeDBInstance` is used to monitor the status of this operation. The action
 * can't be canceled or reverted once submitted.
 *
 * Note that when a DB instance is in a failure state and has a status of
 * `failed`, `incompatible-restore`, or `incompatible-network`,
 * you can only delete it when the `SkipFinalSnapshot` parameter is set to
 * `true`.
 *
 * You can't delete a DB instance if it is the only instance in the DB cluster, or
 * if it has deletion protection enabled.
 */
export const deleteDBInstance: API.OperationMethod<
  DeleteDBInstanceMessage,
  DeleteDBInstanceResult,
  DeleteDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<DeleteDBInstanceMessage>,
  output: __S(1329, __c83, 1) as any as S.Schema<DeleteDBInstanceResult>,
  errors: [
    DBInstanceNotFoundFault,
    DBSnapshotAlreadyExistsFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBInstance",
}));

export type DeleteDBParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Deletes a specified DBParameterGroup. The DBParameterGroup to be deleted can't be
 * associated with any DB instances.
 */
export const deleteDBParameterGroup: API.OperationMethod<
  DeleteDBParameterGroupMessage,
  DeleteDBParameterGroupResponse,
  DeleteDBParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<DeleteDBParameterGroupMessage>,
  output: __S(1345, __c84, 1) as any as S.Schema<DeleteDBParameterGroupResponse>,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBParameterGroup",
}));

export type DeleteDBSubnetGroupError =
  | DBSubnetGroupNotFoundFault
  | InvalidDBSubnetGroupStateFault
  | InvalidDBSubnetStateFault
  | CommonErrors;
/**
 * Deletes a DB subnet group.
 *
 * The specified database subnet group must not be associated with any DB instances.
 */
export const deleteDBSubnetGroup: API.OperationMethod<
  DeleteDBSubnetGroupMessage,
  DeleteDBSubnetGroupResponse,
  DeleteDBSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<DeleteDBSubnetGroupMessage>,
  output: __S(1361, __c85, 1) as any as S.Schema<DeleteDBSubnetGroupResponse>,
  errors: [DBSubnetGroupNotFoundFault, InvalidDBSubnetGroupStateFault, InvalidDBSubnetStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBSubnetGroup",
}));

export type DeleteEventSubscriptionError =
  | InvalidEventSubscriptionStateFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Deletes an event notification subscription.
 */
export const deleteEventSubscription: API.OperationMethod<
  DeleteEventSubscriptionMessage,
  DeleteEventSubscriptionResult,
  DeleteEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c86, 0) as any as S.Schema<DeleteEventSubscriptionMessage>,
  output: __S(1377, __c86, 1) as any as S.Schema<DeleteEventSubscriptionResult>,
  errors: [InvalidEventSubscriptionStateFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSubscription",
}));

export type DeleteGlobalClusterError =
  | GlobalClusterNotFoundFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Deletes a global database. The primary and all secondary clusters must
 * already be detached or deleted first.
 */
export const deleteGlobalCluster: API.OperationMethod<
  DeleteGlobalClusterMessage,
  DeleteGlobalClusterResult,
  DeleteGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1392, __c87, 0) as any as S.Schema<DeleteGlobalClusterMessage>,
  output: __S(1393, __c87, 1) as any as S.Schema<DeleteGlobalClusterResult>,
  errors: [GlobalClusterNotFoundFault, InvalidGlobalClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlobalCluster",
}));

export type DescribeDBClusterEndpointsError = DBClusterNotFoundFault | CommonErrors;
/**
 * Returns information about endpoints for an Amazon Neptune DB cluster.
 *
 * This operation can also return information for Amazon RDS clusters
 * and Amazon DocDB clusters.
 */
export const describeDBClusterEndpoints: API.PaginatedOperationMethod<
  DescribeDBClusterEndpointsMessage,
  DBClusterEndpointMessage,
  DescribeDBClusterEndpointsError,
  Credentials | HttpClient.HttpClient,
  DBClusterEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<DescribeDBClusterEndpointsMessage>,
  output: __S(1411, __c88, 3) as any as S.Schema<DBClusterEndpointMessage>,
  errors: [DBClusterNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterEndpoints",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBClusterEndpoints",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBClusterParameterGroupsError = DBParameterGroupNotFoundFault | CommonErrors;
/**
 * Returns a list of `DBClusterParameterGroup` descriptions. If a
 * `DBClusterParameterGroupName` parameter is specified, the list will contain only
 * the description of the specified DB cluster parameter group.
 */
export const describeDBClusterParameterGroups: API.PaginatedOperationMethod<
  DescribeDBClusterParameterGroupsMessage,
  DBClusterParameterGroupsMessage,
  DescribeDBClusterParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  DBClusterParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<DescribeDBClusterParameterGroupsMessage>,
  output: __S(1442, __c90, 2) as any as S.Schema<DBClusterParameterGroupsMessage>,
  errors: [DBParameterGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterParameterGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBClusterParameterGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBClusterParametersError = DBParameterGroupNotFoundFault | CommonErrors;
/**
 * Returns the detailed parameter list for a particular DB cluster parameter group.
 */
export const describeDBClusterParameters: API.PaginatedOperationMethod<
  DescribeDBClusterParametersMessage,
  DBClusterParameterGroupDetails,
  DescribeDBClusterParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1456, __c91, 0) as any as S.Schema<DescribeDBClusterParametersMessage>,
  output: __S(1457, __c91, 1) as any as S.Schema<DBClusterParameterGroupDetails>,
  errors: [DBParameterGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBClustersError = DBClusterNotFoundFault | CommonErrors;
/**
 * Returns information about provisioned DB clusters, and supports
 * pagination.
 *
 * This operation can also return information for Amazon RDS clusters
 * and Amazon DocDB clusters.
 */
export const describeDBClusters: API.PaginatedOperationMethod<
  DescribeDBClustersMessage,
  DBClusterMessage,
  DescribeDBClustersError,
  Credentials | HttpClient.HttpClient,
  DBCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1488, __c93, 0) as any as S.Schema<DescribeDBClustersMessage>,
  output: __S(1490, __c93, 2) as any as S.Schema<DBClusterMessage>,
  errors: [DBClusterNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBClusters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBClusterSnapshotAttributesError =
  | DBClusterSnapshotNotFoundFault
  | CommonErrors;
/**
 * Returns a list of DB cluster snapshot attribute names and values for a manual DB cluster
 * snapshot.
 *
 * When sharing snapshots with other Amazon accounts,
 * `DescribeDBClusterSnapshotAttributes` returns the `restore` attribute
 * and a list of IDs for the Amazon accounts that are authorized to copy or restore the manual DB
 * cluster snapshot. If `all` is included in the list of values for the
 * `restore` attribute, then the manual DB cluster snapshot is public and can be
 * copied or restored by all Amazon accounts.
 *
 * To add or remove access for an Amazon account to copy or restore a manual DB cluster
 * snapshot, or to make the manual DB cluster snapshot public or private, use the ModifyDBClusterSnapshotAttribute API action.
 */
export const describeDBClusterSnapshotAttributes: API.OperationMethod<
  DescribeDBClusterSnapshotAttributesMessage,
  DescribeDBClusterSnapshotAttributesResult,
  DescribeDBClusterSnapshotAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c94, 0) as any as S.Schema<DescribeDBClusterSnapshotAttributesMessage>,
  output: __S(1505, __c94, 1) as any as S.Schema<DescribeDBClusterSnapshotAttributesResult>,
  errors: [DBClusterSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterSnapshotAttributes",
}));

export type DescribeDBClusterSnapshotsError = DBClusterSnapshotNotFoundFault | CommonErrors;
/**
 * Returns information about DB cluster snapshots. This API action supports
 * pagination.
 */
export const describeDBClusterSnapshots: API.PaginatedOperationMethod<
  DescribeDBClusterSnapshotsMessage,
  DBClusterSnapshotMessage,
  DescribeDBClusterSnapshotsError,
  Credentials | HttpClient.HttpClient,
  DBClusterSnapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<DescribeDBClusterSnapshotsMessage>,
  output: __S(1538, __c96, 2) as any as S.Schema<DBClusterSnapshotMessage>,
  errors: [DBClusterSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterSnapshots",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBClusterSnapshots",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBEngineVersionsError = CommonErrors;
/**
 * Returns a list of the available DB engines.
 */
export const describeDBEngineVersions: API.PaginatedOperationMethod<
  DescribeDBEngineVersionsMessage,
  DBEngineVersionMessage,
  DescribeDBEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  DBEngineVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<DescribeDBEngineVersionsMessage>,
  output: __S(1561, __c97, 9) as any as S.Schema<DBEngineVersionMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBEngineVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBEngineVersions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBInstancesError = DBInstanceNotFoundFault | CommonErrors;
/**
 * Returns information about provisioned instances, and supports pagination.
 *
 * This operation can also return information for Amazon RDS instances
 * and Amazon DocDB instances.
 */
export const describeDBInstances: API.PaginatedOperationMethod<
  DescribeDBInstancesMessage,
  DBInstanceMessage,
  DescribeDBInstancesError,
  Credentials | HttpClient.HttpClient,
  DBInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DescribeDBInstancesMessage>,
  output: __S(2, __c0, 2) as any as S.Schema<DBInstanceMessage>,
  errors: [DBInstanceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBInstances",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBInstances",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBParameterGroupsError = DBParameterGroupNotFoundFault | CommonErrors;
/**
 * Returns a list of `DBParameterGroup` descriptions. If a
 * `DBParameterGroupName` is specified, the list will contain only the description of
 * the specified DB parameter group.
 */
export const describeDBParameterGroups: API.PaginatedOperationMethod<
  DescribeDBParameterGroupsMessage,
  DBParameterGroupsMessage,
  DescribeDBParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  DBParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<DescribeDBParameterGroupsMessage>,
  output: __S(18, __c1, 2) as any as S.Schema<DBParameterGroupsMessage>,
  errors: [DBParameterGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBParameterGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBParameterGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBParametersError = DBParameterGroupNotFoundFault | CommonErrors;
/**
 * Returns the detailed parameter list for a particular DB parameter group.
 */
export const describeDBParameters: API.PaginatedOperationMethod<
  DescribeDBParametersMessage,
  DBParameterGroupDetails,
  DescribeDBParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<DescribeDBParametersMessage>,
  output: __S(33, __c2, 1) as any as S.Schema<DBParameterGroupDetails>,
  errors: [DBParameterGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBSubnetGroupsError = DBSubnetGroupNotFoundFault | CommonErrors;
/**
 * Returns a list of DBSubnetGroup descriptions. If a DBSubnetGroupName is specified, the
 * list will contain only the descriptions of the specified DBSubnetGroup.
 *
 * For an overview of CIDR ranges, go to the Wikipedia Tutorial.
 */
export const describeDBSubnetGroups: API.PaginatedOperationMethod<
  DescribeDBSubnetGroupsMessage,
  DBSubnetGroupMessage,
  DescribeDBSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  DBSubnetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DescribeDBSubnetGroupsMessage>,
  output: __S(50, __c3, 2) as any as S.Schema<DBSubnetGroupMessage>,
  errors: [DBSubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBSubnetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBSubnetGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEngineDefaultClusterParametersError = CommonErrors;
/**
 * Returns the default engine and system parameter information for the cluster database
 * engine.
 */
export const describeEngineDefaultClusterParameters: API.OperationMethod<
  DescribeEngineDefaultClusterParametersMessage,
  DescribeEngineDefaultClusterParametersResult,
  DescribeEngineDefaultClusterParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<DescribeEngineDefaultClusterParametersMessage>,
  output: __S(65, __c4, 1) as any as S.Schema<DescribeEngineDefaultClusterParametersResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineDefaultClusterParameters",
}));

export type DescribeEngineDefaultParametersError = CommonErrors;
/**
 * Returns the default engine and system parameter information for the specified database
 * engine.
 */
export const describeEngineDefaultParameters: API.PaginatedOperationMethod<
  DescribeEngineDefaultParametersMessage,
  DescribeEngineDefaultParametersResult,
  DescribeEngineDefaultParametersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DescribeEngineDefaultParametersMessage>,
  output: __S(97, __c6, 1) as any as S.Schema<DescribeEngineDefaultParametersResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineDefaultParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "EngineDefaults.Marker",
    items: "EngineDefaults.Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventCategoriesError = CommonErrors;
/**
 * Displays a list of categories for all event source types, or, if specified, for a
 * specified source type.
 */
export const describeEventCategories: API.OperationMethod<
  DescribeEventCategoriesMessage,
  EventCategoriesMessage,
  DescribeEventCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DescribeEventCategoriesMessage>,
  output: __S(115, __c7, 3) as any as S.Schema<EventCategoriesMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventCategories",
}));

export type DescribeEventsError = CommonErrors;
/**
 * Returns events related to DB instances, DB security groups, DB snapshots, and DB parameter
 * groups for the past 14 days. Events specific to a particular DB instance, DB security group,
 * database snapshot, or DB parameter group can be obtained by providing the name as a parameter.
 * By default, the past hour of events are returned.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsMessage,
  EventsMessage,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DescribeEventsMessage>,
  output: __S(131, __c8, 3) as any as S.Schema<EventsMessage>,
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

export type DescribeEventSubscriptionsError = SubscriptionNotFoundFault | CommonErrors;
/**
 * Lists all the subscription descriptions for a customer account. The description for a
 * subscription includes SubscriptionName, SNSTopicARN, CustomerID, SourceType, SourceID,
 * CreationTime, and Status.
 *
 * If you specify a SubscriptionName, lists the description for that subscription.
 */
export const describeEventSubscriptions: API.PaginatedOperationMethod<
  DescribeEventSubscriptionsMessage,
  EventSubscriptionsMessage,
  DescribeEventSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  EventSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DescribeEventSubscriptionsMessage>,
  output: __S(146, __c9, 2) as any as S.Schema<EventSubscriptionsMessage>,
  errors: [SubscriptionNotFoundFault],
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

export type DescribeGlobalClustersError = GlobalClusterNotFoundFault | CommonErrors;
/**
 * Returns information about Neptune global database clusters. This API
 * supports pagination.
 */
export const describeGlobalClusters: API.PaginatedOperationMethod<
  DescribeGlobalClustersMessage,
  GlobalClustersMessage,
  DescribeGlobalClustersError,
  Credentials | HttpClient.HttpClient,
  GlobalCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DescribeGlobalClustersMessage>,
  output: __S(162, __c10, 2) as any as S.Schema<GlobalClustersMessage>,
  errors: [GlobalClusterNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGlobalClusters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "GlobalClusters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeOrderableDBInstanceOptionsError = CommonErrors;
/**
 * Returns a list of orderable DB instance options for the specified engine.
 */
export const describeOrderableDBInstanceOptions: API.PaginatedOperationMethod<
  DescribeOrderableDBInstanceOptionsMessage,
  OrderableDBInstanceOptionsMessage,
  DescribeOrderableDBInstanceOptionsError,
  Credentials | HttpClient.HttpClient,
  OrderableDBInstanceOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DescribeOrderableDBInstanceOptionsMessage>,
  output: __S(180, __c11, 4) as any as S.Schema<OrderableDBInstanceOptionsMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrderableDBInstanceOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "OrderableDBInstanceOptions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribePendingMaintenanceActionsError = ResourceNotFoundFault | CommonErrors;
/**
 * Returns a list of resources (for example, DB instances) that have at least one pending
 * maintenance action.
 */
export const describePendingMaintenanceActions: API.PaginatedOperationMethod<
  DescribePendingMaintenanceActionsMessage,
  PendingMaintenanceActionsMessage,
  DescribePendingMaintenanceActionsError,
  Credentials | HttpClient.HttpClient,
  ResourcePendingMaintenanceActions
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DescribePendingMaintenanceActionsMessage>,
  output: __S(194, __c12, 2) as any as S.Schema<PendingMaintenanceActionsMessage>,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePendingMaintenanceActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "PendingMaintenanceActions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeValidDBInstanceModificationsError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * You can call DescribeValidDBInstanceModifications
 * to learn what modifications you can make to your DB instance. You can use this
 * information when you call ModifyDBInstance.
 */
export const describeValidDBInstanceModifications: API.OperationMethod<
  DescribeValidDBInstanceModificationsMessage,
  DescribeValidDBInstanceModificationsResult,
  DescribeValidDBInstanceModificationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DescribeValidDBInstanceModificationsMessage>,
  output: __S(216, __c13, 8) as any as S.Schema<DescribeValidDBInstanceModificationsResult>,
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeValidDBInstanceModifications",
}));

export type FailoverDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Forces a failover for a DB cluster.
 *
 * A failover for a DB cluster promotes one of the Read Replicas (read-only instances) in the
 * DB cluster to be the primary instance (the cluster writer).
 *
 * Amazon Neptune will automatically fail over to a Read Replica, if one exists, when the
 * primary instance fails. You can force a failover when you want to simulate a failure of a
 * primary instance for testing. Because each instance in a DB cluster has its own endpoint
 * address, you will need to clean up and re-establish any existing connections that use those
 * endpoint addresses when the failover is complete.
 */
export const failoverDBCluster: API.OperationMethod<
  FailoverDBClusterMessage,
  FailoverDBClusterResult,
  FailoverDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<FailoverDBClusterMessage>,
  output: __S(225, __c14, 1) as any as S.Schema<FailoverDBClusterResult>,
  errors: [DBClusterNotFoundFault, InvalidDBClusterStateFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverDBCluster",
}));

export type FailoverGlobalClusterError =
  | DBClusterNotFoundFault
  | GlobalClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Initiates the failover process for a Neptune global database.
 *
 * A failover for a Neptune global database promotes one of secondary
 * read-only DB clusters to be the primary DB cluster and demotes the
 * primary DB cluster to being a secondary (read-only) DB cluster. In other
 * words, the role of the current primary DB cluster and the selected
 * target secondary DB cluster are switched. The selected secondary DB cluster
 * assumes full read/write capabilities for the Neptune global database.
 *
 * This action applies **only** to
 * Neptune global databases. This action is only intended for use on healthy
 * Neptune global databases with healthy Neptune DB clusters and no region-wide
 * outages, to test disaster recovery scenarios or to reconfigure the global
 * database topology.
 */
export const failoverGlobalCluster: API.OperationMethod<
  FailoverGlobalClusterMessage,
  FailoverGlobalClusterResult,
  FailoverGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<FailoverGlobalClusterMessage>,
  output: __S(241, __c15, 1) as any as S.Schema<FailoverGlobalClusterResult>,
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidGlobalClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverGlobalCluster",
}));

export type ListTagsForResourceError =
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | DBSnapshotNotFoundFault
  | CommonErrors;
/**
 * Lists all tags on an Amazon Neptune resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceMessage,
  TagListMessage,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<ListTagsForResourceMessage>,
  output: __S(257, __c16, 1) as any as S.Schema<TagListMessage>,
  errors: [DBClusterNotFoundFault, DBInstanceNotFoundFault, DBSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ModifyDBClusterError =
  | DBClusterAlreadyExistsFault
  | DBClusterNotFoundFault
  | DBClusterParameterGroupNotFoundFault
  | DBSubnetGroupNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBSecurityGroupStateFault
  | InvalidDBSubnetGroupStateFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | NetworkTypeNotSupportedFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | CommonErrors;
/**
 * Modify a setting for a DB cluster. You can change one or more database configuration
 * parameters by specifying these parameters and the new values in the request.
 */
export const modifyDBCluster: API.OperationMethod<
  ModifyDBClusterMessage,
  ModifyDBClusterResult,
  ModifyDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<ModifyDBClusterMessage>,
  output: __S(273, __c17, 1) as any as S.Schema<ModifyDBClusterResult>,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterNotFoundFault,
    DBClusterParameterGroupNotFoundFault,
    DBSubnetGroupNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBSecurityGroupStateFault,
    InvalidDBSubnetGroupStateFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    NetworkTypeNotSupportedFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBCluster",
}));

export type ModifyDBClusterEndpointError =
  | DBClusterEndpointNotFoundFault
  | DBInstanceNotFoundFault
  | InvalidDBClusterEndpointStateFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Modifies the properties of an endpoint in an Amazon Neptune DB cluster.
 */
export const modifyDBClusterEndpoint: API.OperationMethod<
  ModifyDBClusterEndpointMessage,
  ModifyDBClusterEndpointOutput,
  ModifyDBClusterEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ModifyDBClusterEndpointMessage>,
  output: __S(305, __c19, 1) as any as S.Schema<ModifyDBClusterEndpointOutput>,
  errors: [
    DBClusterEndpointNotFoundFault,
    DBInstanceNotFoundFault,
    InvalidDBClusterEndpointStateFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBClusterEndpoint",
}));

export type ModifyDBClusterParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Modifies the parameters of a DB cluster parameter group. To modify more than one
 * parameter, submit a list of the following: `ParameterName`,
 * `ParameterValue`, and `ApplyMethod`. A maximum of 20 parameters can be
 * modified in a single request.
 *
 * Changes to dynamic parameters are applied immediately. Changes to static parameters
 * require a reboot without failover to the DB cluster associated with the parameter group
 * before the change can take effect.
 *
 * After you create a DB cluster parameter group, you should wait at least 5 minutes before
 * creating your first DB cluster that uses that DB cluster parameter group as the default
 * parameter group. This allows Amazon Neptune to fully complete the create action before the
 * parameter group is used as the default for a new DB cluster. This is especially important
 * for parameters that are critical when creating the default database for a DB cluster, such
 * as the character set for the default database defined by the
 * `character_set_database` parameter. You can use the Parameter
 * Groups option of the Amazon Neptune console or the DescribeDBClusterParameters command to verify that your DB cluster parameter
 * group has been created or modified.
 */
export const modifyDBClusterParameterGroup: API.OperationMethod<
  ModifyDBClusterParameterGroupMessage,
  DBClusterParameterGroupNameMessage,
  ModifyDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<ModifyDBClusterParameterGroupMessage>,
  output: __S(336, __c21, 0) as any as S.Schema<DBClusterParameterGroupNameMessage>,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBClusterParameterGroup",
}));

export type ModifyDBClusterSnapshotAttributeError =
  | DBClusterSnapshotNotFoundFault
  | InvalidDBClusterSnapshotStateFault
  | SharedSnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Adds an attribute and values to, or removes an attribute and values from, a manual DB
 * cluster snapshot.
 *
 * To share a manual DB cluster snapshot with other Amazon accounts, specify
 * `restore` as the `AttributeName` and use the `ValuesToAdd`
 * parameter to add a list of IDs of the Amazon accounts that are authorized to restore the manual
 * DB cluster snapshot. Use the value `all` to make the manual DB cluster snapshot
 * public, which means that it can be copied or restored by all Amazon accounts. Do not add the
 * `all` value for any manual DB cluster snapshots that contain private information
 * that you don't want available to all Amazon accounts. If a manual DB cluster snapshot is
 * encrypted, it can be shared, but only by specifying a list of authorized Amazon account IDs for
 * the `ValuesToAdd` parameter. You can't use `all` as a value for that
 * parameter in this case.
 *
 * To view which Amazon accounts have access to copy or restore a manual DB cluster snapshot, or
 * whether a manual DB cluster snapshot public or private, use the DescribeDBClusterSnapshotAttributes API action.
 */
export const modifyDBClusterSnapshotAttribute: API.OperationMethod<
  ModifyDBClusterSnapshotAttributeMessage,
  ModifyDBClusterSnapshotAttributeResult,
  ModifyDBClusterSnapshotAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<ModifyDBClusterSnapshotAttributeMessage>,
  output: __S(353, __c22, 1) as any as S.Schema<ModifyDBClusterSnapshotAttributeResult>,
  errors: [
    DBClusterSnapshotNotFoundFault,
    InvalidDBClusterSnapshotStateFault,
    SharedSnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBClusterSnapshotAttribute",
}));

export type ModifyDBInstanceError =
  | AuthorizationNotFoundFault
  | CertificateNotFoundFault
  | DBInstanceAlreadyExistsFault
  | DBInstanceNotFoundFault
  | DBParameterGroupNotFoundFault
  | DBSecurityGroupNotFoundFault
  | DBUpgradeDependencyFailureFault
  | DomainNotFoundFault
  | InsufficientDBInstanceCapacityFault
  | InvalidDBInstanceStateFault
  | InvalidDBSecurityGroupStateFault
  | InvalidVPCNetworkStateFault
  | OptionGroupNotFoundFault
  | ProvisionedIopsNotAvailableInAZFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | CommonErrors;
/**
 * Modifies settings for a DB instance. You can change one or more database configuration
 * parameters by specifying these parameters and the new values in the request. To learn what
 * modifications you can make to your DB instance, call DescribeValidDBInstanceModifications before you call ModifyDBInstance.
 */
export const modifyDBInstance: API.OperationMethod<
  ModifyDBInstanceMessage,
  ModifyDBInstanceResult,
  ModifyDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<ModifyDBInstanceMessage>,
  output: __S(369, __c23, 1) as any as S.Schema<ModifyDBInstanceResult>,
  errors: [
    AuthorizationNotFoundFault,
    CertificateNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBInstanceNotFoundFault,
    DBParameterGroupNotFoundFault,
    DBSecurityGroupNotFoundFault,
    DBUpgradeDependencyFailureFault,
    DomainNotFoundFault,
    InsufficientDBInstanceCapacityFault,
    InvalidDBInstanceStateFault,
    InvalidDBSecurityGroupStateFault,
    InvalidVPCNetworkStateFault,
    OptionGroupNotFoundFault,
    ProvisionedIopsNotAvailableInAZFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBInstance",
}));

export type ModifyDBParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Modifies the parameters of a DB parameter group. To modify more than one parameter,
 * submit a list of the following: `ParameterName`, `ParameterValue`, and
 * `ApplyMethod`. A maximum of 20 parameters can be modified in a single request.
 *
 * Changes to dynamic parameters are applied immediately. Changes to static parameters
 * require a reboot without failover to the DB instance associated with the parameter group
 * before the change can take effect.
 *
 * After you modify a DB parameter group, you should wait at least 5 minutes before
 * creating your first DB instance that uses that DB parameter group as the default parameter
 * group. This allows Amazon Neptune to fully complete the modify action before the parameter
 * group is used as the default for a new DB instance. This is especially important for
 * parameters that are critical when creating the default database for a DB instance, such as
 * the character set for the default database defined by the
 * `character_set_database` parameter. You can use the Parameter
 * Groups option of the Amazon Neptune console or the
 * *DescribeDBParameters* command to verify that your DB parameter group has
 * been created or modified.
 */
export const modifyDBParameterGroup: API.OperationMethod<
  ModifyDBParameterGroupMessage,
  DBParameterGroupNameMessage,
  ModifyDBParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<ModifyDBParameterGroupMessage>,
  output: __S(400, __c25, 0) as any as S.Schema<DBParameterGroupNameMessage>,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBParameterGroup",
}));

export type ModifyDBSubnetGroupError =
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | DBSubnetQuotaExceededFault
  | InvalidSubnet
  | SubnetAlreadyInUse
  | CommonErrors;
/**
 * Modifies an existing DB subnet group. DB subnet groups must contain at least one subnet in
 * at least two AZs in the Amazon Region.
 */
export const modifyDBSubnetGroup: API.OperationMethod<
  ModifyDBSubnetGroupMessage,
  ModifyDBSubnetGroupResult,
  ModifyDBSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<ModifyDBSubnetGroupMessage>,
  output: __S(417, __c26, 1) as any as S.Schema<ModifyDBSubnetGroupResult>,
  errors: [
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    DBSubnetQuotaExceededFault,
    InvalidSubnet,
    SubnetAlreadyInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBSubnetGroup",
}));

export type ModifyEventSubscriptionError =
  | EventSubscriptionQuotaExceededFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | SNSTopicArnNotFoundFault
  | SubscriptionCategoryNotFoundFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Modifies an existing event notification subscription. Note that you can't modify the
 * source identifiers using this call; to change source identifiers for a subscription, use the
 * AddSourceIdentifierToSubscription and RemoveSourceIdentifierFromSubscription calls.
 *
 * You can see a list of the event categories for a given SourceType
 * by using the **DescribeEventCategories** action.
 */
export const modifyEventSubscription: API.OperationMethod<
  ModifyEventSubscriptionMessage,
  ModifyEventSubscriptionResult,
  ModifyEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<ModifyEventSubscriptionMessage>,
  output: __S(433, __c27, 1) as any as S.Schema<ModifyEventSubscriptionResult>,
  errors: [
    EventSubscriptionQuotaExceededFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
    SNSTopicArnNotFoundFault,
    SubscriptionCategoryNotFoundFault,
    SubscriptionNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEventSubscription",
}));

export type ModifyGlobalClusterError =
  | GlobalClusterAlreadyExistsFault
  | GlobalClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Modify a setting for an Amazon Neptune global cluster. You can change one
 * or more database configuration parameters by specifying these parameters
 * and their new values in the request.
 */
export const modifyGlobalCluster: API.OperationMethod<
  ModifyGlobalClusterMessage,
  ModifyGlobalClusterResult,
  ModifyGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<ModifyGlobalClusterMessage>,
  output: __S(449, __c28, 1) as any as S.Schema<ModifyGlobalClusterResult>,
  errors: [
    GlobalClusterAlreadyExistsFault,
    GlobalClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidGlobalClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyGlobalCluster",
}));

export type PromoteReadReplicaDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Not supported.
 */
export const promoteReadReplicaDBCluster: API.OperationMethod<
  PromoteReadReplicaDBClusterMessage,
  PromoteReadReplicaDBClusterResult,
  PromoteReadReplicaDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<PromoteReadReplicaDBClusterMessage>,
  output: __S(465, __c29, 1) as any as S.Schema<PromoteReadReplicaDBClusterResult>,
  errors: [DBClusterNotFoundFault, InvalidDBClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PromoteReadReplicaDBCluster",
}));

export type RebootDBInstanceError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * You might need to reboot your DB instance, usually for maintenance reasons. For example,
 * if you make certain modifications, or if you change the DB parameter group associated with the
 * DB instance, you must reboot the instance for the changes to take effect.
 *
 * Rebooting a DB instance restarts the database engine service. Rebooting a DB instance
 * results in a momentary outage, during which the DB instance status is set to rebooting.
 */
export const rebootDBInstance: API.OperationMethod<
  RebootDBInstanceMessage,
  RebootDBInstanceResult,
  RebootDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<RebootDBInstanceMessage>,
  output: __S(481, __c30, 1) as any as S.Schema<RebootDBInstanceResult>,
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDBInstance",
}));

export type RemoveFromGlobalClusterError =
  | DBClusterNotFoundFault
  | GlobalClusterNotFoundFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Detaches a Neptune DB cluster from a Neptune global database. A secondary
 * cluster becomes a normal standalone cluster with read-write capability
 * instead of being read-only, and no longer receives data from the
 * primary cluster.
 */
export const removeFromGlobalCluster: API.OperationMethod<
  RemoveFromGlobalClusterMessage,
  RemoveFromGlobalClusterResult,
  RemoveFromGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<RemoveFromGlobalClusterMessage>,
  output: __S(497, __c31, 1) as any as S.Schema<RemoveFromGlobalClusterResult>,
  errors: [DBClusterNotFoundFault, GlobalClusterNotFoundFault, InvalidGlobalClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFromGlobalCluster",
}));

export type RemoveRoleFromDBClusterError =
  | DBClusterNotFoundFault
  | DBClusterRoleNotFoundFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Disassociates an Identity and Access Management (IAM) role from a DB cluster.
 */
export const removeRoleFromDBCluster: API.OperationMethod<
  RemoveRoleFromDBClusterMessage,
  RemoveRoleFromDBClusterResponse,
  RemoveRoleFromDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<RemoveRoleFromDBClusterMessage>,
  output: __S(513, __c32, 1) as any as S.Schema<RemoveRoleFromDBClusterResponse>,
  errors: [DBClusterNotFoundFault, DBClusterRoleNotFoundFault, InvalidDBClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveRoleFromDBCluster",
}));

export type RemoveSourceIdentifierFromSubscriptionError =
  | SourceNotFoundFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Removes a source identifier from an existing event notification subscription.
 */
export const removeSourceIdentifierFromSubscription: API.OperationMethod<
  RemoveSourceIdentifierFromSubscriptionMessage,
  RemoveSourceIdentifierFromSubscriptionResult,
  RemoveSourceIdentifierFromSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<RemoveSourceIdentifierFromSubscriptionMessage>,
  output: __S(529, __c33, 1) as any as S.Schema<RemoveSourceIdentifierFromSubscriptionResult>,
  errors: [SourceNotFoundFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveSourceIdentifierFromSubscription",
}));

export type RemoveTagsFromResourceError =
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | DBSnapshotNotFoundFault
  | CommonErrors;
/**
 * Removes metadata tags from an Amazon Neptune resource.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceMessage,
  RemoveTagsFromResourceResponse,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(545, __c34, 1) as any as S.Schema<RemoveTagsFromResourceMessage>,
  output: __S(546, __c34, 2) as any as S.Schema<RemoveTagsFromResourceResponse>,
  errors: [DBClusterNotFoundFault, DBInstanceNotFoundFault, DBSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
}));

export type ResetDBClusterParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Modifies the parameters of a DB cluster parameter group to the default value. To reset
 * specific parameters submit a list of the following: `ParameterName` and
 * `ApplyMethod`. To reset the entire DB cluster parameter group, specify the
 * `DBClusterParameterGroupName` and `ResetAllParameters` parameters.
 *
 * When resetting the entire group, dynamic parameters are updated immediately and static
 * parameters are set to `pending-reboot` to take effect on the next DB instance
 * restart or RebootDBInstance request. You must call RebootDBInstance for every DB instance in your DB cluster
 * that you want the updated static parameter to apply to.
 */
export const resetDBClusterParameterGroup: API.OperationMethod<
  ResetDBClusterParameterGroupMessage,
  DBClusterParameterGroupNameMessage,
  ResetDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ResetDBClusterParameterGroupMessage>,
  output: __S(336, __c21, 0) as any as S.Schema<DBClusterParameterGroupNameMessage>,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDBClusterParameterGroup",
}));

export type ResetDBParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Modifies the parameters of a DB parameter group to the engine/system default value. To
 * reset specific parameters, provide a list of the following: `ParameterName` and
 * `ApplyMethod`. To reset the entire DB parameter group, specify the
 * `DBParameterGroup` name and `ResetAllParameters` parameters. When
 * resetting the entire group, dynamic parameters are updated immediately and static parameters
 * are set to `pending-reboot` to take effect on the next DB instance restart or
 * `RebootDBInstance` request.
 */
export const resetDBParameterGroup: API.OperationMethod<
  ResetDBParameterGroupMessage,
  DBParameterGroupNameMessage,
  ResetDBParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ResetDBParameterGroupMessage>,
  output: __S(400, __c25, 0) as any as S.Schema<DBParameterGroupNameMessage>,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDBParameterGroup",
}));

export type RestoreDBClusterFromSnapshotError =
  | DBClusterAlreadyExistsFault
  | DBClusterParameterGroupNotFoundFault
  | DBClusterQuotaExceededFault
  | DBClusterSnapshotNotFoundFault
  | DBSnapshotNotFoundFault
  | DBSubnetGroupNotFoundFault
  | InsufficientDBClusterCapacityFault
  | InsufficientStorageClusterCapacityFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBSnapshotStateFault
  | InvalidRestoreFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupportedFault
  | OptionGroupNotFoundFault
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new DB cluster from a DB snapshot or DB cluster snapshot.
 *
 * If a DB snapshot is specified, the target DB cluster is created from the source DB
 * snapshot with a default configuration and default security group.
 *
 * If a DB cluster snapshot is specified, the target DB cluster is created from the source DB
 * cluster restore point with the same configuration as the original source DB cluster, except
 * that the new DB cluster is created with the default security group.
 */
export const restoreDBClusterFromSnapshot: API.OperationMethod<
  RestoreDBClusterFromSnapshotMessage,
  RestoreDBClusterFromSnapshotResult,
  RestoreDBClusterFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<RestoreDBClusterFromSnapshotMessage>,
  output: __S(593, __c37, 1) as any as S.Schema<RestoreDBClusterFromSnapshotResult>,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterParameterGroupNotFoundFault,
    DBClusterQuotaExceededFault,
    DBClusterSnapshotNotFoundFault,
    DBSnapshotNotFoundFault,
    DBSubnetGroupNotFoundFault,
    InsufficientDBClusterCapacityFault,
    InsufficientStorageClusterCapacityFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBSnapshotStateFault,
    InvalidRestoreFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupportedFault,
    OptionGroupNotFoundFault,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDBClusterFromSnapshot",
}));

export type RestoreDBClusterToPointInTimeError =
  | DBClusterAlreadyExistsFault
  | DBClusterNotFoundFault
  | DBClusterParameterGroupNotFoundFault
  | DBClusterQuotaExceededFault
  | DBClusterSnapshotNotFoundFault
  | DBSubnetGroupNotFoundFault
  | InsufficientDBClusterCapacityFault
  | InsufficientStorageClusterCapacityFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBClusterStateFault
  | InvalidDBSnapshotStateFault
  | InvalidRestoreFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupportedFault
  | OptionGroupNotFoundFault
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Restores a DB cluster to an arbitrary point in time. Users can restore to any point in
 * time before `LatestRestorableTime` for up to `BackupRetentionPeriod`
 * days. The target DB cluster is created from the source DB cluster with the same configuration
 * as the original DB cluster, except that the new DB cluster is created with the default DB
 * security group.
 *
 * This action only restores the DB cluster, not the DB instances for that DB cluster. You
 * must invoke the CreateDBInstance action to create DB instances for the
 * restored DB cluster, specifying the identifier of the restored DB cluster in
 * `DBClusterIdentifier`. You can create DB instances only after the
 * `RestoreDBClusterToPointInTime` action has completed and the DB cluster is
 * available.
 */
export const restoreDBClusterToPointInTime: API.OperationMethod<
  RestoreDBClusterToPointInTimeMessage,
  RestoreDBClusterToPointInTimeResult,
  RestoreDBClusterToPointInTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<RestoreDBClusterToPointInTimeMessage>,
  output: __S(609, __c38, 1) as any as S.Schema<RestoreDBClusterToPointInTimeResult>,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterNotFoundFault,
    DBClusterParameterGroupNotFoundFault,
    DBClusterQuotaExceededFault,
    DBClusterSnapshotNotFoundFault,
    DBSubnetGroupNotFoundFault,
    InsufficientDBClusterCapacityFault,
    InsufficientStorageClusterCapacityFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBClusterStateFault,
    InvalidDBSnapshotStateFault,
    InvalidRestoreFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupportedFault,
    OptionGroupNotFoundFault,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDBClusterToPointInTime",
}));

export type StartDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Starts an Amazon Neptune DB cluster that was stopped using the Amazon
 * console, the Amazon CLI stop-db-cluster command, or the StopDBCluster API.
 */
export const startDBCluster: API.OperationMethod<
  StartDBClusterMessage,
  StartDBClusterResult,
  StartDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<StartDBClusterMessage>,
  output: __S(625, __c39, 1) as any as S.Schema<StartDBClusterResult>,
  errors: [DBClusterNotFoundFault, InvalidDBClusterStateFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDBCluster",
}));

export type StopDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Stops an Amazon Neptune DB cluster. When you stop a DB cluster, Neptune
 * retains the DB cluster's metadata, including its endpoints and DB parameter
 * groups.
 *
 * Neptune also retains the transaction logs so you can do a point-in-time
 * restore if necessary.
 */
export const stopDBCluster: API.OperationMethod<
  StopDBClusterMessage,
  StopDBClusterResult,
  StopDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<StopDBClusterMessage>,
  output: __S(641, __c40, 1) as any as S.Schema<StopDBClusterResult>,
  errors: [DBClusterNotFoundFault, InvalidDBClusterStateFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDBCluster",
}));

export type SwitchoverGlobalClusterError =
  | DBClusterNotFoundFault
  | GlobalClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Switches over the specified secondary DB cluster to be the new primary DB cluster in the global
 * database cluster. Switchover operations were previously called "managed planned failovers."
 *
 * Promotes the specified secondary cluster to assume full read/write capabilities and demotes the current
 * primary cluster to a secondary (read-only) cluster, maintaining the original replication topology. All secondary
 * clusters are synchronized with the primary at the beginning of the process so the new primary continues operations
 * for the global database without losing any data. Your database is unavailable for a short time while the primary
 * and selected secondary clusters are assuming their new roles.
 *
 * This operation is intended for controlled environments, for operations such as "regional rotation" or
 * to fall back to the original primary after a global database failover.
 */
export const switchoverGlobalCluster: API.OperationMethod<
  SwitchoverGlobalClusterMessage,
  SwitchoverGlobalClusterResult,
  SwitchoverGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<SwitchoverGlobalClusterMessage>,
  output: __S(657, __c41, 1) as any as S.Schema<SwitchoverGlobalClusterResult>,
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidGlobalClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SwitchoverGlobalCluster",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBInstancesMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1165, __c72, 13)
          .pipe(/*@__PURE__*/ T.XmlName("DBInstance"))
          .annotate({ identifier: "DBInstance" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), DBInstances: S.optional(__S(1, __c0, 1)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DBInstanceMessage" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBParameterGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(912, __c57, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBParameterGroup"))
          .annotate({ identifier: "DBParameterGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBParameterGroups: S.optional(__S(17, __c1, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBParameterGroupsMessage" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          Source: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Parameters: S.optional(__S(1473, __c92, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DBParameterGroupDetails" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSubnetGroupName: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBSubnetGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1138, __c71, 2)
          .pipe(/*@__PURE__*/ T.XmlName("DBSubnetGroup"))
          .annotate({ identifier: "DBSubnetGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBSubnetGroups: S.optional(__S(49, __c3, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBSubnetGroupMessage" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupFamily: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEngineDefaultClusterParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EngineDefaults: S.optional(__S(80, __c5, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeEngineDefaultClusterParametersResult" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupFamily: S.optional(S.String),
          Marker: S.optional(S.String),
          Parameters: S.optional(__S(1473, __c92, 1)),
        }),
      ).annotate({ identifier: "EngineDefaults" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupFamily: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEngineDefaultParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EngineDefaults: S.optional(__S(80, __c5, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeEngineDefaultParametersResult" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventCategoriesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.optional(S.String),
          EventCategories: S.optional(__S(720, __c45, 0)),
        }),
      ).annotate({ identifier: "EventCategoriesMap" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(113, __c7, 1)
          .pipe(/*@__PURE__*/ T.XmlName("EventCategoriesMap"))
          .annotate({ identifier: "EventCategoriesMap" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ EventCategoriesMapList: S.optional(__S(114, __c7, 2)) }).pipe(ns),
      ).annotate({ identifier: "EventCategoriesMessage" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceIdentifier: S.optional(S.String),
          SourceType: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Duration: S.optional(S.Number),
          EventCategories: S.optional(__S(720, __c45, 0)),
          Filters: S.optional(__S(1426, __c89, 2)),
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
          EventCategories: S.optional(__S(720, __c45, 0)),
          Date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SourceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Event" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(129, __c8, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Event"))
          .annotate({ identifier: "Event" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), Events: S.optional(__S(130, __c8, 2)) }).pipe(ns),
      ).annotate({ identifier: "EventsMessage" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventSubscriptionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(737, __c46, 1)
          .pipe(/*@__PURE__*/ T.XmlName("EventSubscription"))
          .annotate({ identifier: "EventSubscription" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          EventSubscriptionsList: S.optional(__S(145, __c9, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "EventSubscriptionsMessage" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalClusterIdentifier: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeGlobalClustersMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1252, __c78, 4)
          .pipe(/*@__PURE__*/ T.XmlName("GlobalClusterMember"))
          .annotate({ identifier: "GlobalCluster" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          GlobalClusters: S.optional(__S(161, __c10, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GlobalClustersMessage" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          Vpc: S.optional(S.Boolean),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOrderableDBInstanceOptionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1120, __c70, 0)
          .pipe(/*@__PURE__*/ T.XmlName("AvailabilityZone"))
          .annotate({ identifier: "AvailabilityZone" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          AvailabilityZones: S.optional(__S(177, __c11, 1)),
          MultiAZCapable: S.optional(S.Boolean),
          ReadReplicaCapable: S.optional(S.Boolean),
          Vpc: S.optional(S.Boolean),
          SupportsStorageEncryption: S.optional(S.Boolean),
          StorageType: S.optional(S.String),
          SupportsIops: S.optional(S.Boolean),
          SupportsEnhancedMonitoring: S.optional(S.Boolean),
          SupportsIAMDatabaseAuthentication: S.optional(S.Boolean),
          SupportsPerformanceInsights: S.optional(S.Boolean),
          MinStorageSize: S.optional(S.Number),
          MaxStorageSize: S.optional(S.Number),
          MinIopsPerDbInstance: S.optional(S.Number),
          MaxIopsPerDbInstance: S.optional(S.Number),
          MinIopsPerGib: S.optional(S.Number),
          MaxIopsPerGib: S.optional(S.Number),
          SupportsGlobalDatabases: S.optional(S.Boolean),
          SupportedNetworkTypes: S.optional(__S(1040, __c65, 0)),
        }),
      ).annotate({ identifier: "OrderableDBInstanceOption" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(178, __c11, 2)
          .pipe(/*@__PURE__*/ T.XmlName("OrderableDBInstanceOption"))
          .annotate({ identifier: "OrderableDBInstanceOption" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          OrderableDBInstanceOptions: S.optional(__S(179, __c11, 3)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "OrderableDBInstanceOptionsMessage" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePendingMaintenanceActionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(802, __c50, 2)
          .pipe(/*@__PURE__*/ T.XmlName("ResourcePendingMaintenanceActions"))
          .annotate({ identifier: "ResourcePendingMaintenanceActions" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          PendingMaintenanceActions: S.optional(__S(193, __c12, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PendingMaintenanceActionsMessage" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBInstanceIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeValidDBInstanceModificationsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          From: S.optional(S.Number),
          To: S.optional(S.Number),
          Step: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Range" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(209, __c13, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Range"))
          .annotate({ identifier: "Range" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ From: S.optional(S.Number), To: S.optional(S.Number) }),
      ).annotate({ identifier: "DoubleRange" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(211, __c13, 3)
          .pipe(/*@__PURE__*/ T.XmlName("DoubleRange"))
          .annotate({ identifier: "DoubleRange" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          StorageType: S.optional(S.String),
          StorageSize: S.optional(__S(210, __c13, 2)),
          ProvisionedIops: S.optional(__S(210, __c13, 2)),
          IopsToStorageRatio: S.optional(__S(212, __c13, 4)),
        }),
      ).annotate({ identifier: "ValidStorageOptions" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(213, __c13, 5)
          .pipe(/*@__PURE__*/ T.XmlName("ValidStorageOptions"))
          .annotate({ identifier: "ValidStorageOptions" }),
      );
    case 7:
      return S.suspend(() => S.Struct({ Storage: S.optional(__S(214, __c13, 6)) })).annotate({
        identifier: "ValidDBInstanceModificationsMessage",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({ ValidDBInstanceModificationsMessage: S.optional(__S(215, __c13, 7)) }).pipe(ns),
      ).annotate({ identifier: "DescribeValidDBInstanceModificationsResult" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          TargetDBInstanceIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "FailoverDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1017, __c63, 9)) }).pipe(ns),
      ).annotate({ identifier: "FailoverDBClusterResult" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalClusterIdentifier: S.optional(S.String),
          TargetDbClusterIdentifier: S.optional(S.String),
          AllowDataLoss: S.optional(S.Boolean),
          Switchover: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "FailoverGlobalClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalCluster: S.optional(__S(1252, __c78, 4)) }).pipe(ns),
      ).annotate({ identifier: "FailoverGlobalClusterResult" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceName: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TagList: S.optional(__S(769, __c48, 1)) }).pipe(ns),
      ).annotate({ identifier: "TagListMessage" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          NewDBClusterIdentifier: S.optional(S.String),
          ApplyImmediately: S.optional(S.Boolean),
          BackupRetentionPeriod: S.optional(S.Number),
          DBClusterParameterGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(960, __c60, 0)),
          Port: S.optional(S.Number),
          MasterUserPassword: S.optional(SensitiveString),
          OptionGroupName: S.optional(S.String),
          PreferredBackupWindow: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          CloudwatchLogsExportConfiguration: S.optional(__S(288, __c18, 0)),
          EngineVersion: S.optional(S.String),
          AllowMajorVersionUpgrade: S.optional(S.Boolean),
          DBInstanceParameterGroupName: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          ServerlessV2ScalingConfiguration: S.optional(__S(944, __c59, 0)),
          StorageType: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1017, __c63, 9)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBClusterResult" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnableLogTypes: S.optional(__S(992, __c62, 0)),
          DisableLogTypes: S.optional(__S(992, __c62, 0)),
        }),
      ).annotate({ identifier: "CloudwatchLogsExportConfiguration" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterEndpointIdentifier: S.optional(S.String),
          EndpointType: S.optional(S.String),
          StaticMembers: S.optional(__S(1040, __c65, 0)),
          ExcludedMembers: S.optional(__S(1040, __c65, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBClusterEndpointMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBClusterEndpointIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          DBClusterEndpointResourceIdentifier: S.optional(S.String),
          Endpoint: S.optional(S.String),
          Status: S.optional(S.String),
          EndpointType: S.optional(S.String),
          CustomEndpointType: S.optional(S.String),
          StaticMembers: S.optional(__S(1040, __c65, 0)),
          ExcludedMembers: S.optional(__S(1040, __c65, 0)),
          DBClusterEndpointArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ModifyDBClusterEndpointOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          Parameters: S.optional(__S(1473, __c92, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBClusterParameterGroupMessage" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterParameterGroupName: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DBClusterParameterGroupNameMessage" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterSnapshotIdentifier: S.optional(S.String),
          AttributeName: S.optional(S.String),
          ValuesToAdd: S.optional(__S(1520, __c95, 0)),
          ValuesToRemove: S.optional(__S(1520, __c95, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBClusterSnapshotAttributeMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotAttributesResult: S.optional(__S(1523, __c95, 3)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBClusterSnapshotAttributeResult" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          DBInstanceClass: S.optional(S.String),
          DBSubnetGroupName: S.optional(S.String),
          DBSecurityGroups: S.optional(__S(1104, __c69, 0)),
          VpcSecurityGroupIds: S.optional(__S(960, __c60, 0)),
          ApplyImmediately: S.optional(S.Boolean),
          MasterUserPassword: S.optional(SensitiveString),
          DBParameterGroupName: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          EngineVersion: S.optional(S.String),
          AllowMajorVersionUpgrade: S.optional(S.Boolean),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          LicenseModel: S.optional(S.String),
          Iops: S.optional(S.Number),
          OptionGroupName: S.optional(S.String),
          NewDBInstanceIdentifier: S.optional(S.String),
          StorageType: S.optional(S.String),
          TdeCredentialArn: S.optional(S.String),
          TdeCredentialPassword: S.optional(SensitiveString),
          CACertificateIdentifier: S.optional(S.String),
          Domain: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          MonitoringInterval: S.optional(S.Number),
          DBPortNumber: S.optional(S.Number),
          PubliclyAccessible: S.optional(S.Boolean),
          MonitoringRoleArn: S.optional(S.String),
          DomainIAMRoleName: S.optional(S.String),
          PromotionTier: S.optional(S.Number),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          CloudwatchLogsExportConfiguration: S.optional(__S(288, __c18, 0)),
          DeletionProtection: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBInstanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1165, __c72, 13)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBInstanceResult" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          Parameters: S.optional(__S(1473, __c92, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBParameterGroupMessage" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBParameterGroupName: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DBParameterGroupNameMessage" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSubnetGroupName: S.optional(S.String),
          DBSubnetGroupDescription: S.optional(S.String),
          SubnetIds: S.optional(__S(1200, __c75, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBSubnetGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSubnetGroup: S.optional(__S(1138, __c71, 2)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBSubnetGroupResult" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SourceType: S.optional(S.String),
          EventCategories: S.optional(__S(720, __c45, 0)),
          Enabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyEventSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(737, __c46, 1)) }).pipe(ns),
      ).annotate({ identifier: "ModifyEventSubscriptionResult" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalClusterIdentifier: S.optional(S.String),
          NewGlobalClusterIdentifier: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          EngineVersion: S.optional(S.String),
          AllowMajorVersionUpgrade: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyGlobalClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalCluster: S.optional(__S(1252, __c78, 4)) }).pipe(ns),
      ).annotate({ identifier: "ModifyGlobalClusterResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PromoteReadReplicaDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1017, __c63, 9)) }).pipe(ns),
      ).annotate({ identifier: "PromoteReadReplicaDBClusterResult" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          ForceFailover: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RebootDBInstanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1165, __c72, 13)) }).pipe(ns),
      ).annotate({ identifier: "RebootDBInstanceResult" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalClusterIdentifier: S.optional(S.String),
          DbClusterIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveFromGlobalClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalCluster: S.optional(__S(1252, __c78, 4)) }).pipe(ns),
      ).annotate({ identifier: "RemoveFromGlobalClusterResult" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          RoleArn: S.optional(S.String),
          FeatureName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveRoleFromDBClusterMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "RemoveRoleFromDBClusterResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          SourceIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveSourceIdentifierFromSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(737, __c46, 1)) }).pipe(ns),
      ).annotate({ identifier: "RemoveSourceIdentifierFromSubscriptionResult" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceName: S.optional(S.String),
          TagKeys: S.optional(__S(544, __c34, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveTagsFromResourceMessage" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "RemoveTagsFromResourceResponse",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          ResetAllParameters: S.optional(S.Boolean),
          Parameters: S.optional(__S(1473, __c92, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ResetDBClusterParameterGroupMessage" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          ResetAllParameters: S.optional(S.Boolean),
          Parameters: S.optional(__S(1473, __c92, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ResetDBParameterGroupMessage" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(864, __c54, 0)),
          DBClusterIdentifier: S.optional(S.String),
          SnapshotIdentifier: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Port: S.optional(S.Number),
          DBSubnetGroupName: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          OptionGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(960, __c60, 0)),
          Tags: S.optional(__S(769, __c48, 1)),
          KmsKeyId: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          EnableCloudwatchLogsExports: S.optional(__S(992, __c62, 0)),
          DBClusterParameterGroupName: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          ServerlessV2ScalingConfiguration: S.optional(__S(944, __c59, 0)),
          StorageType: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreDBClusterFromSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1017, __c63, 9)) }).pipe(ns),
      ).annotate({ identifier: "RestoreDBClusterFromSnapshotResult" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          RestoreType: S.optional(S.String),
          SourceDBClusterIdentifier: S.optional(S.String),
          RestoreToTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UseLatestRestorableTime: S.optional(S.Boolean),
          Port: S.optional(S.Number),
          DBSubnetGroupName: S.optional(S.String),
          OptionGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(960, __c60, 0)),
          Tags: S.optional(__S(769, __c48, 1)),
          KmsKeyId: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          EnableCloudwatchLogsExports: S.optional(__S(992, __c62, 0)),
          DBClusterParameterGroupName: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          ServerlessV2ScalingConfiguration: S.optional(__S(944, __c59, 0)),
          StorageType: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreDBClusterToPointInTimeMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1017, __c63, 9)) }).pipe(ns),
      ).annotate({ identifier: "RestoreDBClusterToPointInTimeResult" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1017, __c63, 9)) }).pipe(ns),
      ).annotate({ identifier: "StartDBClusterResult" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1017, __c63, 9)) }).pipe(ns),
      ).annotate({ identifier: "StopDBClusterResult" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalClusterIdentifier: S.optional(S.String),
          TargetDbClusterIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SwitchoverGlobalClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalCluster: S.optional(__S(1252, __c78, 4)) }).pipe(ns),
      ).annotate({ identifier: "SwitchoverGlobalClusterResult" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          RoleArn: S.optional(S.String),
          FeatureName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddRoleToDBClusterMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AddRoleToDBClusterResponse",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Address: S.optional(S.String),
          Port: S.optional(S.Number),
          HostedZoneId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Endpoint" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          SourceIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddSourceIdentifierToSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(737, __c46, 1)) }).pipe(ns),
      ).annotate({ identifier: "AddSourceIdentifierToSubscriptionResult" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("EventCategory")));
  }
}
function __c46(j: number): any {
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
          SubscriptionCreationTime: S.optional(S.String),
          SourceType: S.optional(S.String),
          SourceIdsList: S.optional(__S(736, __c46, 0)),
          EventCategoriesList: S.optional(__S(720, __c45, 0)),
          Enabled: S.optional(S.Boolean),
          EventSubscriptionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventSubscription" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceName: S.optional(S.String), Tags: S.optional(__S(769, __c48, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsToResourceMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AddTagsToResourceResponse",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(768, __c48, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "Tag" }),
      );
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.optional(S.String),
          ApplyAction: S.optional(S.String),
          OptInType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ApplyPendingMaintenanceActionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourcePendingMaintenanceActions: S.optional(__S(802, __c50, 2)) }).pipe(ns),
      ).annotate({ identifier: "ApplyPendingMaintenanceActionResult" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(S.String),
          AutoAppliedAfterDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ForcedApplyDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          OptInStatus: S.optional(S.String),
          CurrentApplyDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "PendingMaintenanceAction" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(800, __c50, 0)
          .pipe(/*@__PURE__*/ T.XmlName("PendingMaintenanceAction"))
          .annotate({ identifier: "PendingMaintenanceAction" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.optional(S.String),
          PendingMaintenanceActionDetails: S.optional(__S(801, __c50, 1)),
        }),
      ).annotate({ identifier: "ResourcePendingMaintenanceActions" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDBClusterParameterGroupIdentifier: S.optional(S.String),
          TargetDBClusterParameterGroupIdentifier: S.optional(S.String),
          TargetDBClusterParameterGroupDescription: S.optional(S.String),
          Tags: S.optional(__S(769, __c48, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyDBClusterParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterParameterGroup: S.optional(__S(832, __c52, 0)) }).pipe(ns),
      ).annotate({ identifier: "CopyDBClusterParameterGroupResult" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
          DBClusterParameterGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBClusterParameterGroup" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDBClusterSnapshotIdentifier: S.optional(S.String),
          TargetDBClusterSnapshotIdentifier: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          PreSignedUrl: S.optional(S.String),
          CopyTags: S.optional(S.Boolean),
          Tags: S.optional(__S(769, __c48, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyDBClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshot: S.optional(__S(880, __c55, 0)) }).pipe(ns),
      ).annotate({ identifier: "CopyDBClusterSnapshotResult" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AvailabilityZone")));
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(864, __c54, 0)),
          DBClusterSnapshotIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          SnapshotCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Engine: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          Status: S.optional(S.String),
          Port: S.optional(S.Number),
          VpcId: S.optional(S.String),
          ClusterCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MasterUsername: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          PercentProgress: S.optional(S.Number),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          DBClusterSnapshotArn: S.optional(S.String),
          SourceDBClusterSnapshotArn: S.optional(S.String),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          StorageType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBClusterSnapshot" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDBParameterGroupIdentifier: S.optional(S.String),
          TargetDBParameterGroupIdentifier: S.optional(S.String),
          TargetDBParameterGroupDescription: S.optional(S.String),
          Tags: S.optional(__S(769, __c48, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyDBParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBParameterGroup: S.optional(__S(912, __c57, 0)) }).pipe(ns),
      ).annotate({ identifier: "CopyDBParameterGroupResult" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
          DBParameterGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBParameterGroup" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(864, __c54, 0)),
          BackupRetentionPeriod: S.optional(S.Number),
          CharacterSetName: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          DatabaseName: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          DBClusterParameterGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(960, __c60, 0)),
          DBSubnetGroupName: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Port: S.optional(S.Number),
          MasterUsername: S.optional(S.String),
          MasterUserPassword: S.optional(SensitiveString),
          OptionGroupName: S.optional(S.String),
          PreferredBackupWindow: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          ReplicationSourceIdentifier: S.optional(S.String),
          Tags: S.optional(__S(769, __c48, 1)),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          PreSignedUrl: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          EnableCloudwatchLogsExports: S.optional(__S(992, __c62, 0)),
          DeletionProtection: S.optional(S.Boolean),
          ServerlessV2ScalingConfiguration: S.optional(__S(944, __c59, 0)),
          GlobalClusterIdentifier: S.optional(S.String),
          StorageType: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1017, __c63, 9)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBClusterResult" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MinCapacity: S.optional(S.Number), MaxCapacity: S.optional(S.Number) }),
      ).annotate({ identifier: "ServerlessV2ScalingConfiguration" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("VpcSecurityGroupId")));
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcSecurityGroupId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "VpcSecurityGroupMembership" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(976, __c61, 0)
          .pipe(/*@__PURE__*/ T.XmlName("VpcSecurityGroupMembership"))
          .annotate({ identifier: "VpcSecurityGroupMembership" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          LogTypesToEnable: S.optional(__S(992, __c62, 0)),
          LogTypesToDisable: S.optional(__S(992, __c62, 0)),
        }),
      ).annotate({ identifier: "PendingCloudwatchLogsExports" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterOptionGroupName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "DBClusterOptionGroupStatus" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1008, __c63, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterOptionGroup"))
          .annotate({ identifier: "DBClusterOptionGroupStatus" }),
      );
    case 2:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ReadReplicaIdentifier")));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          IsClusterWriter: S.optional(S.Boolean),
          DBClusterParameterGroupStatus: S.optional(S.String),
          PromotionTier: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DBClusterMember" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(1011, __c63, 3)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterMember"))
          .annotate({ identifier: "DBClusterMember" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          RoleArn: S.optional(S.String),
          Status: S.optional(S.String),
          FeatureName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBClusterRole" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(1013, __c63, 5)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterRole"))
          .annotate({ identifier: "DBClusterRole" }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({
          PendingCloudwatchLogsExports: S.optional(__S(978, __c61, 2)),
          DBClusterIdentifier: S.optional(S.String),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          EngineVersion: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          StorageType: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          Iops: S.optional(S.Number),
          NetworkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClusterPendingModifiedValues" });
    case 8:
      return S.suspend(() =>
        S.Struct({ MinCapacity: S.optional(S.Number), MaxCapacity: S.optional(S.Number) }),
      ).annotate({ identifier: "ServerlessV2ScalingConfigurationInfo" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          AllocatedStorage: S.optional(S.Number),
          AvailabilityZones: S.optional(__S(864, __c54, 0)),
          BackupRetentionPeriod: S.optional(S.Number),
          CharacterSetName: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          DBClusterParameterGroup: S.optional(S.String),
          DBSubnetGroup: S.optional(S.String),
          Status: S.optional(S.String),
          PercentProgress: S.optional(S.String),
          EarliestRestorableTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Endpoint: S.optional(S.String),
          ReaderEndpoint: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          LatestRestorableTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Port: S.optional(S.Number),
          MasterUsername: S.optional(S.String),
          DBClusterOptionGroupMemberships: S.optional(__S(1009, __c63, 1)),
          PreferredBackupWindow: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          ReplicationSourceIdentifier: S.optional(S.String),
          ReadReplicaIdentifiers: S.optional(__S(1010, __c63, 2)),
          DBClusterMembers: S.optional(__S(1012, __c63, 4)),
          VpcSecurityGroups: S.optional(__S(977, __c61, 1)),
          HostedZoneId: S.optional(S.String),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          DbClusterResourceId: S.optional(S.String),
          DBClusterArn: S.optional(S.String),
          AssociatedRoles: S.optional(__S(1014, __c63, 6)),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          CloneGroupId: S.optional(S.String),
          ClusterCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          EnabledCloudwatchLogsExports: S.optional(__S(992, __c62, 0)),
          PendingModifiedValues: S.optional(__S(1015, __c63, 7)),
          DeletionProtection: S.optional(S.Boolean),
          CrossAccountClone: S.optional(S.Boolean),
          AutomaticRestartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ServerlessV2ScalingConfiguration: S.optional(__S(1016, __c63, 8)),
          GlobalClusterIdentifier: S.optional(S.String),
          IOOptimizedNextAllowedModificationTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          StorageType: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBCluster" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          DBClusterEndpointIdentifier: S.optional(S.String),
          EndpointType: S.optional(S.String),
          StaticMembers: S.optional(__S(1040, __c65, 0)),
          ExcludedMembers: S.optional(__S(1040, __c65, 0)),
          Tags: S.optional(__S(769, __c48, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBClusterEndpointMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBClusterEndpointIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          DBClusterEndpointResourceIdentifier: S.optional(S.String),
          Endpoint: S.optional(S.String),
          Status: S.optional(S.String),
          EndpointType: S.optional(S.String),
          CustomEndpointType: S.optional(S.String),
          StaticMembers: S.optional(__S(1040, __c65, 0)),
          ExcludedMembers: S.optional(__S(1040, __c65, 0)),
          DBClusterEndpointArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateDBClusterEndpointOutput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(769, __c48, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBClusterParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterParameterGroup: S.optional(__S(832, __c52, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBClusterParameterGroupResult" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterSnapshotIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          Tags: S.optional(__S(769, __c48, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshot: S.optional(__S(880, __c55, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBClusterSnapshotResult" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBName: S.optional(S.String),
          DBInstanceIdentifier: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          DBInstanceClass: S.optional(S.String),
          Engine: S.optional(S.String),
          MasterUsername: S.optional(S.String),
          MasterUserPassword: S.optional(SensitiveString),
          DBSecurityGroups: S.optional(__S(1104, __c69, 0)),
          VpcSecurityGroupIds: S.optional(__S(960, __c60, 0)),
          AvailabilityZone: S.optional(S.String),
          DBSubnetGroupName: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          DBParameterGroupName: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          Port: S.optional(S.Number),
          MultiAZ: S.optional(S.Boolean),
          EngineVersion: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          LicenseModel: S.optional(S.String),
          Iops: S.optional(S.Number),
          OptionGroupName: S.optional(S.String),
          CharacterSetName: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          Tags: S.optional(__S(769, __c48, 1)),
          DBClusterIdentifier: S.optional(S.String),
          StorageType: S.optional(S.String),
          TdeCredentialArn: S.optional(S.String),
          TdeCredentialPassword: S.optional(SensitiveString),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          Domain: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          MonitoringInterval: S.optional(S.Number),
          MonitoringRoleArn: S.optional(S.String),
          DomainIAMRoleName: S.optional(S.String),
          PromotionTier: S.optional(S.Number),
          Timezone: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          EnableCloudwatchLogsExports: S.optional(__S(992, __c62, 0)),
          DeletionProtection: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBInstanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1165, __c72, 13)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBInstanceResult" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("DBSecurityGroupName")));
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "AvailabilityZone",
      });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetIdentifier: S.optional(S.String),
          SubnetAvailabilityZone: S.optional(__S(1120, __c70, 0)),
          SubnetStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Subnet" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1136, __c71, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Subnet"))
          .annotate({ identifier: "Subnet" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          DBSubnetGroupName: S.optional(S.String),
          DBSubnetGroupDescription: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetGroupStatus: S.optional(S.String),
          Subnets: S.optional(__S(1137, __c71, 1)),
          DBSubnetGroupArn: S.optional(S.String),
          SupportedNetworkTypes: S.optional(__S(1040, __c65, 0)),
        }),
      ).annotate({ identifier: "DBSubnetGroup" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBSecurityGroupName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "DBSecurityGroupMembership" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1152, __c72, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBSecurityGroup"))
          .annotate({ identifier: "DBSecurityGroupMembership" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          ParameterApplyStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBParameterGroupStatus" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(1154, __c72, 2)
          .pipe(/*@__PURE__*/ T.XmlName("DBParameterGroup"))
          .annotate({ identifier: "DBParameterGroupStatus" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          DBInstanceClass: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          MasterUserPassword: S.optional(SensitiveString),
          Port: S.optional(S.Number),
          BackupRetentionPeriod: S.optional(S.Number),
          MultiAZ: S.optional(S.Boolean),
          EngineVersion: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          Iops: S.optional(S.Number),
          DBInstanceIdentifier: S.optional(S.String),
          StorageType: S.optional(S.String),
          CACertificateIdentifier: S.optional(S.String),
          DBSubnetGroupName: S.optional(S.String),
          PendingCloudwatchLogsExports: S.optional(__S(978, __c61, 2)),
        }),
      ).annotate({ identifier: "PendingModifiedValues" });
    case 5:
      return S.Array(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ReadReplicaDBInstanceIdentifier")),
      );
    case 6:
      return S.Array(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ReadReplicaDBClusterIdentifier")),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({ OptionGroupName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "OptionGroupMembership" });
    case 8:
      return S.Array(
        /*@__PURE__*/ __S(1159, __c72, 7)
          .pipe(/*@__PURE__*/ T.XmlName("OptionGroupMembership"))
          .annotate({ identifier: "OptionGroupMembership" }),
      );
    case 9:
      return S.suspend(() =>
        S.Struct({
          StatusType: S.optional(S.String),
          Normal: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBInstanceStatusInfo" });
    case 10:
      return S.Array(
        /*@__PURE__*/ __S(1161, __c72, 9)
          .pipe(/*@__PURE__*/ T.XmlName("DBInstanceStatusInfo"))
          .annotate({ identifier: "DBInstanceStatusInfo" }),
      );
    case 11:
      return S.suspend(() =>
        S.Struct({
          Domain: S.optional(S.String),
          Status: S.optional(S.String),
          FQDN: S.optional(S.String),
          IAMRoleName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainMembership" });
    case 12:
      return S.Array(
        /*@__PURE__*/ __S(1163, __c72, 11)
          .pipe(/*@__PURE__*/ T.XmlName("DomainMembership"))
          .annotate({ identifier: "DomainMembership" }),
      );
    case 13:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          Engine: S.optional(S.String),
          DBInstanceStatus: S.optional(S.String),
          MasterUsername: S.optional(S.String),
          DBName: S.optional(S.String),
          Endpoint: S.optional(Endpoint),
          AllocatedStorage: S.optional(S.Number),
          InstanceCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          PreferredBackupWindow: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          DBSecurityGroups: S.optional(__S(1153, __c72, 1)),
          VpcSecurityGroups: S.optional(__S(977, __c61, 1)),
          DBParameterGroups: S.optional(__S(1155, __c72, 3)),
          AvailabilityZone: S.optional(S.String),
          DBSubnetGroup: S.optional(__S(1138, __c71, 2)),
          PreferredMaintenanceWindow: S.optional(S.String),
          PendingModifiedValues: S.optional(__S(1156, __c72, 4)),
          LatestRestorableTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MultiAZ: S.optional(S.Boolean),
          EngineVersion: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          ReadReplicaSourceDBInstanceIdentifier: S.optional(S.String),
          ReadReplicaDBInstanceIdentifiers: S.optional(__S(1157, __c72, 5)),
          ReadReplicaDBClusterIdentifiers: S.optional(__S(1158, __c72, 6)),
          LicenseModel: S.optional(S.String),
          Iops: S.optional(S.Number),
          OptionGroupMemberships: S.optional(__S(1160, __c72, 8)),
          CharacterSetName: S.optional(S.String),
          SecondaryAvailabilityZone: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          StatusInfos: S.optional(__S(1162, __c72, 10)),
          StorageType: S.optional(S.String),
          TdeCredentialArn: S.optional(S.String),
          DbInstancePort: S.optional(S.Number),
          DBClusterIdentifier: S.optional(S.String),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          DbiResourceId: S.optional(S.String),
          CACertificateIdentifier: S.optional(S.String),
          DomainMemberships: S.optional(__S(1164, __c72, 12)),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          MonitoringInterval: S.optional(S.Number),
          EnhancedMonitoringResourceArn: S.optional(S.String),
          MonitoringRoleArn: S.optional(S.String),
          PromotionTier: S.optional(S.Number),
          DBInstanceArn: S.optional(S.String),
          Timezone: S.optional(S.String),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          PerformanceInsightsEnabled: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          EnabledCloudwatchLogsExports: S.optional(__S(992, __c62, 0)),
          DeletionProtection: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBInstance" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(769, __c48, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBParameterGroup: S.optional(__S(912, __c57, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBParameterGroupResult" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSubnetGroupName: S.optional(S.String),
          DBSubnetGroupDescription: S.optional(S.String),
          SubnetIds: S.optional(__S(1200, __c75, 0)),
          Tags: S.optional(__S(769, __c48, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBSubnetGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSubnetGroup: S.optional(__S(1138, __c71, 2)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBSubnetGroupResult" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SubnetIdentifier")));
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SourceType: S.optional(S.String),
          EventCategories: S.optional(__S(720, __c45, 0)),
          SourceIds: S.optional(__S(736, __c46, 0)),
          Enabled: S.optional(S.Boolean),
          Tags: S.optional(__S(769, __c48, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEventSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(737, __c46, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateEventSubscriptionResult" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalClusterIdentifier: S.optional(S.String),
          SourceDBClusterIdentifier: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          DatabaseName: S.optional(S.String),
          Tags: S.optional(__S(769, __c48, 1)),
          StorageEncrypted: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGlobalClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalCluster: S.optional(__S(1252, __c78, 4)) }).pipe(ns),
      ).annotate({ identifier: "CreateGlobalClusterResult" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBClusterArn: S.optional(S.String),
          Readers: S.optional(__S(1248, __c78, 0)),
          IsWriter: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GlobalClusterMember" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1249, __c78, 1)
          .pipe(/*@__PURE__*/ T.XmlName("GlobalClusterMember"))
          .annotate({ identifier: "GlobalClusterMember" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          FromDbClusterArn: S.optional(S.String),
          ToDbClusterArn: S.optional(S.String),
          IsDataLossAllowed: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FailoverState" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          GlobalClusterIdentifier: S.optional(S.String),
          GlobalClusterResourceId: S.optional(S.String),
          GlobalClusterArn: S.optional(S.String),
          Status: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          StorageEncrypted: S.optional(S.Boolean),
          DeletionProtection: S.optional(S.Boolean),
          GlobalClusterMembers: S.optional(__S(1250, __c78, 2)),
          FailoverState: S.optional(__S(1251, __c78, 3)),
          TagList: S.optional(__S(769, __c48, 1)),
        }),
      ).annotate({ identifier: "GlobalCluster" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          SkipFinalSnapshot: S.optional(S.Boolean),
          FinalDBSnapshotIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1017, __c63, 9)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBClusterResult" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterEndpointIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBClusterEndpointMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBClusterEndpointIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          DBClusterEndpointResourceIdentifier: S.optional(S.String),
          Endpoint: S.optional(S.String),
          Status: S.optional(S.String),
          EndpointType: S.optional(S.String),
          CustomEndpointType: S.optional(S.String),
          StaticMembers: S.optional(__S(1040, __c65, 0)),
          ExcludedMembers: S.optional(__S(1040, __c65, 0)),
          DBClusterEndpointArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteDBClusterEndpointOutput" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterParameterGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBClusterParameterGroupMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteDBClusterParameterGroupResponse",
      });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshot: S.optional(__S(880, __c55, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBClusterSnapshotResult" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          SkipFinalSnapshot: S.optional(S.Boolean),
          FinalDBSnapshotIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteDBInstanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1165, __c72, 13)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBInstanceResult" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBParameterGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBParameterGroupMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteDBParameterGroupResponse",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBSubnetGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBSubnetGroupMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteDBSubnetGroupResponse",
      });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubscriptionName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(737, __c46, 1)) }).pipe(ns),
      ).annotate({ identifier: "DeleteEventSubscriptionResult" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GlobalClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGlobalClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalCluster: S.optional(__S(1252, __c78, 4)) }).pipe(ns),
      ).annotate({ identifier: "DeleteGlobalClusterResult" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          DBClusterEndpointIdentifier: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterEndpointsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBClusterEndpointIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          DBClusterEndpointResourceIdentifier: S.optional(S.String),
          Endpoint: S.optional(S.String),
          Status: S.optional(S.String),
          EndpointType: S.optional(S.String),
          CustomEndpointType: S.optional(S.String),
          StaticMembers: S.optional(__S(1040, __c65, 0)),
          ExcludedMembers: S.optional(__S(1040, __c65, 0)),
          DBClusterEndpointArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBClusterEndpoint" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1409, __c88, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterEndpointList"))
          .annotate({ identifier: "DBClusterEndpoint" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusterEndpoints: S.optional(__S(1410, __c88, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterEndpointMessage" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Value")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(1424, __c89, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1425, __c89, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Filter"))
          .annotate({ identifier: "Filter" }),
      );
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterParameterGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(832, __c52, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterParameterGroup"))
          .annotate({ identifier: "DBClusterParameterGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusterParameterGroups: S.optional(__S(1441, __c90, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterParameterGroupsMessage" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          Source: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Parameters: S.optional(__S(1473, __c92, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterParameterGroupDetails" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterName: S.optional(S.String),
          ParameterValue: S.optional(S.String),
          Description: S.optional(S.String),
          Source: S.optional(S.String),
          ApplyType: S.optional(S.String),
          DataType: S.optional(S.String),
          AllowedValues: S.optional(S.String),
          IsModifiable: S.optional(S.Boolean),
          MinimumEngineVersion: S.optional(S.String),
          ApplyMethod: S.optional(S.String),
        }),
      ).annotate({ identifier: "Parameter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1472, __c92, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Parameter"))
          .annotate({ identifier: "Parameter" }),
      );
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClustersMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1017, __c63, 9)
          .pipe(/*@__PURE__*/ T.XmlName("DBCluster"))
          .annotate({ identifier: "DBCluster" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusters: S.optional(__S(1489, __c93, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterMessage" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDBClusterSnapshotAttributesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotAttributesResult: S.optional(__S(1523, __c95, 3)) }).pipe(ns),
      ).annotate({ identifier: "DescribeDBClusterSnapshotAttributesResult" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AttributeValue")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          AttributeName: S.optional(S.String),
          AttributeValues: S.optional(__S(1520, __c95, 0)),
        }),
      ).annotate({ identifier: "DBClusterSnapshotAttribute" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1521, __c95, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterSnapshotAttribute"))
          .annotate({ identifier: "DBClusterSnapshotAttribute" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          DBClusterSnapshotIdentifier: S.optional(S.String),
          DBClusterSnapshotAttributes: S.optional(__S(1522, __c95, 2)),
        }),
      ).annotate({ identifier: "DBClusterSnapshotAttributesResult" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          DBClusterSnapshotIdentifier: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          IncludeShared: S.optional(S.Boolean),
          IncludePublic: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterSnapshotsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(880, __c55, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterSnapshot"))
          .annotate({ identifier: "DBClusterSnapshot" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusterSnapshots: S.optional(__S(1537, __c96, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterSnapshotMessage" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          Filters: S.optional(__S(1426, __c89, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          DefaultOnly: S.optional(S.Boolean),
          ListSupportedCharacterSets: S.optional(S.Boolean),
          ListSupportedTimezones: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBEngineVersionsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CharacterSetName: S.optional(S.String),
          CharacterSetDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "CharacterSet" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1553, __c97, 1)
          .pipe(/*@__PURE__*/ T.XmlName("CharacterSet"))
          .annotate({ identifier: "CharacterSet" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Description: S.optional(S.String),
          AutoUpgrade: S.optional(S.Boolean),
          IsMajorVersionUpgrade: S.optional(S.Boolean),
          SupportsGlobalDatabases: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpgradeTarget" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(1555, __c97, 3)
          .pipe(/*@__PURE__*/ T.XmlName("UpgradeTarget"))
          .annotate({ identifier: "UpgradeTarget" }),
      );
    case 5:
      return S.suspend(() => S.Struct({ TimezoneName: S.optional(S.String) })).annotate({
        identifier: "Timezone",
      });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(1557, __c97, 5)
          .pipe(/*@__PURE__*/ T.XmlName("Timezone"))
          .annotate({ identifier: "Timezone" }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          DBEngineDescription: S.optional(S.String),
          DBEngineVersionDescription: S.optional(S.String),
          DefaultCharacterSet: S.optional(__S(1553, __c97, 1)),
          SupportedCharacterSets: S.optional(__S(1554, __c97, 2)),
          ValidUpgradeTarget: S.optional(__S(1556, __c97, 4)),
          SupportedTimezones: S.optional(__S(1558, __c97, 6)),
          ExportableLogTypes: S.optional(__S(992, __c62, 0)),
          SupportsLogExportsToCloudwatchLogs: S.optional(S.Boolean),
          SupportsReadReplica: S.optional(S.Boolean),
          SupportsGlobalDatabases: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DBEngineVersion" });
    case 8:
      return S.Array(
        /*@__PURE__*/ __S(1559, __c97, 7)
          .pipe(/*@__PURE__*/ T.XmlName("DBEngineVersion"))
          .annotate({ identifier: "DBEngineVersion" }),
      );
    case 9:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBEngineVersions: S.optional(__S(1560, __c97, 8)),
        }).pipe(ns),
      ).annotate({ identifier: "DBEngineVersionMessage" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
