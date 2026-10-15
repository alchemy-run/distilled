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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "DocDB", serviceShapeName: "AmazonRDSv19" });
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
export class NetworkTypeNotSupported
  extends /*@__PURE__*/ S.TaggedError<NetworkTypeNotSupported>()(
    "NetworkTypeNotSupported",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NetworkTypeNotSupported", httpResponseCode: 400 }),
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
  Status?: string;
  Port?: number;
  VpcId?: string;
  ClusterCreateTime?: Date;
  MasterUsername?: string;
  EngineVersion?: string;
  SnapshotType?: string;
  PercentProgress?: number;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DBClusterSnapshotArn?: string;
  SourceDBClusterSnapshotArn?: string;
  StorageType?: string;
}
export interface CopyDBClusterSnapshotResult {
  DBClusterSnapshot?: DBClusterSnapshot;
}
export type VpcSecurityGroupIdList = string[];
export type LogTypeList = string[];
export type GlobalClusterIdentifier = string;
export interface ServerlessV2ScalingConfiguration {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export interface CreateDBClusterMessage {
  AvailabilityZones?: string[];
  BackupRetentionPeriod?: number;
  DBClusterIdentifier?: string;
  DBClusterParameterGroupName?: string;
  VpcSecurityGroupIds?: string[];
  DBSubnetGroupName?: string;
  Engine?: string;
  EngineVersion?: string;
  Port?: number;
  MasterUsername?: string;
  MasterUserPassword?: string | redacted.Redacted<string>;
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  Tags?: Tag[];
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  PreSignedUrl?: string;
  EnableCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
  GlobalClusterIdentifier?: string;
  StorageType?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  ManageMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
  NetworkType?: string;
  CopyTagsToSnapshot?: boolean;
}
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
}
export type DBClusterRoles = DBClusterRole[];
export interface ServerlessV2ScalingConfigurationInfo {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export interface ClusterMasterUserSecret {
  SecretArn?: string;
  SecretStatus?: string;
  KmsKeyId?: string;
}
export interface DBCluster {
  AvailabilityZones?: string[];
  BackupRetentionPeriod?: number;
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
  CloneGroupId?: string;
  ClusterCreateTime?: Date;
  EnabledCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
  IOOptimizedNextAllowedModificationTime?: Date;
  StorageType?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfigurationInfo;
  MasterUserSecret?: ClusterMasterUserSecret;
  NetworkType?: string;
  CopyTagsToSnapshot?: boolean;
}
export interface CreateDBClusterResult {
  DBCluster?: DBCluster;
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
export interface CreateDBInstanceMessage {
  DBInstanceIdentifier?: string;
  DBInstanceClass?: string;
  Engine?: string;
  AvailabilityZone?: string;
  PreferredMaintenanceWindow?: string;
  AutoMinorVersionUpgrade?: boolean;
  Tags?: Tag[];
  DBClusterIdentifier?: string;
  CopyTagsToSnapshot?: boolean;
  PromotionTier?: number;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  CACertificateIdentifier?: string;
}
export interface Endpoint {
  Address?: string;
  Port?: number;
  HostedZoneId?: string;
}
const Endpoint = /*@__PURE__*/ __L.at(__c14, 0) as any as S.Schema<Endpoint>;
export interface AvailabilityZone {
  Name?: string;
}
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AvailabilityZone;
  SubnetStatus?: string;
}
export type SubnetList = Subnet[];
export type NetworkTypeList = string[];
export interface DBSubnetGroup {
  DBSubnetGroupName?: string;
  DBSubnetGroupDescription?: string;
  VpcId?: string;
  SubnetGroupStatus?: string;
  Subnets?: Subnet[];
  DBSubnetGroupArn?: string;
  SupportedNetworkTypes?: string[];
}
export interface PendingCloudwatchLogsExports {
  LogTypesToEnable?: string[];
  LogTypesToDisable?: string[];
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
export interface DBInstanceStatusInfo {
  StatusType?: string;
  Normal?: boolean;
  Status?: string;
  Message?: string;
}
export type DBInstanceStatusInfoList = DBInstanceStatusInfo[];
export interface CertificateDetails {
  CAIdentifier?: string;
  ValidTill?: Date;
}
export interface DBInstance {
  DBInstanceIdentifier?: string;
  DBInstanceClass?: string;
  Engine?: string;
  DBInstanceStatus?: string;
  Endpoint?: Endpoint;
  InstanceCreateTime?: Date;
  PreferredBackupWindow?: string;
  BackupRetentionPeriod?: number;
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  AvailabilityZone?: string;
  DBSubnetGroup?: DBSubnetGroup;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: PendingModifiedValues;
  LatestRestorableTime?: Date;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  PubliclyAccessible?: boolean;
  StatusInfos?: DBInstanceStatusInfo[];
  DBClusterIdentifier?: string;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DbiResourceId?: string;
  CACertificateIdentifier?: string;
  CopyTagsToSnapshot?: boolean;
  PromotionTier?: number;
  DBInstanceArn?: string;
  EnabledCloudwatchLogsExports?: string[];
  CertificateDetails?: CertificateDetails;
  PerformanceInsightsEnabled?: boolean;
  PerformanceInsightsKMSKeyId?: string;
}
export interface CreateDBInstanceResult {
  DBInstance?: DBInstance;
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
  StorageEncrypted?: boolean;
}
export type ReadersArnList = string[];
export type GlobalClusterMemberSynchronizationStatus =
  | "connected"
  | "pending-resync"
  | (string & {});
export interface GlobalClusterMember {
  DBClusterArn?: string;
  Readers?: string[];
  IsWriter?: boolean;
  SynchronizationStatus?: GlobalClusterMemberSynchronizationStatus;
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
}
export interface DeleteDBInstanceResult {
  DBInstance?: DBInstance;
}
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
export interface DescribeCertificatesMessage {
  CertificateIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface Certificate {
  CertificateIdentifier?: string;
  CertificateType?: string;
  Thumbprint?: string;
  ValidFrom?: Date;
  ValidTill?: Date;
  CertificateArn?: string;
}
export type CertificateList = Certificate[];
export interface CertificateMessage {
  Certificates?: Certificate[];
  Marker?: string;
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
export interface UpgradeTarget {
  Engine?: string;
  EngineVersion?: string;
  Description?: string;
  AutoUpgrade?: boolean;
  IsMajorVersionUpgrade?: boolean;
}
export type ValidUpgradeTargetList = UpgradeTarget[];
export type CACertificateIdentifiersList = string[];
export interface ServerlessV2FeaturesSupport {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export interface DBEngineVersion {
  Engine?: string;
  EngineVersion?: string;
  DBParameterGroupFamily?: string;
  DBEngineDescription?: string;
  DBEngineVersionDescription?: string;
  ValidUpgradeTarget?: UpgradeTarget[];
  ExportableLogTypes?: string[];
  SupportsLogExportsToCloudwatchLogs?: boolean;
  SupportedCACertificateIdentifiers?: string[];
  SupportsCertificateRotationWithoutRestart?: boolean;
  ServerlessV2FeaturesSupport?: ServerlessV2FeaturesSupport;
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
  Filters?: Filter[];
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
  Vpc?: boolean;
  StorageType?: string;
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
export interface FailoverDBClusterMessage {
  DBClusterIdentifier?: string;
  TargetDBInstanceIdentifier?: string;
}
export interface FailoverDBClusterResult {
  DBCluster?: DBCluster;
}
export type DBClusterIdentifier = string;
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
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  CloudwatchLogsExportConfiguration?: CloudwatchLogsExportConfiguration;
  EngineVersion?: string;
  AllowMajorVersionUpgrade?: boolean;
  DeletionProtection?: boolean;
  StorageType?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  ManageMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
  RotateMasterUserPassword?: boolean;
  NetworkType?: string;
  CopyTagsToSnapshot?: boolean;
}
export interface ModifyDBClusterResult {
  DBCluster?: DBCluster;
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
  DBInstanceClass?: string;
  ApplyImmediately?: boolean;
  PreferredMaintenanceWindow?: string;
  AutoMinorVersionUpgrade?: boolean;
  NewDBInstanceIdentifier?: string;
  CACertificateIdentifier?: string;
  CopyTagsToSnapshot?: boolean;
  PromotionTier?: number;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  CertificateRotationRestart?: boolean;
}
export interface ModifyDBInstanceResult {
  DBInstance?: DBInstance;
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
}
export interface ModifyGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
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
export interface RestoreDBClusterFromSnapshotMessage {
  AvailabilityZones?: string[];
  DBClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  Engine?: string;
  EngineVersion?: string;
  Port?: number;
  DBSubnetGroupName?: string;
  VpcSecurityGroupIds?: string[];
  Tags?: Tag[];
  KmsKeyId?: string;
  EnableCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
  DBClusterParameterGroupName?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  StorageType?: string;
  NetworkType?: string;
  CopyTagsToSnapshot?: boolean;
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
  VpcSecurityGroupIds?: string[];
  Tags?: Tag[];
  KmsKeyId?: string;
  EnableCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  StorageType?: string;
  NetworkType?: string;
  CopyTagsToSnapshot?: boolean;
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
export type AddSourceIdentifierToSubscriptionError =
  | SourceNotFoundFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Adds a source identifier to an existing event notification
 * subscription.
 */
export const addSourceIdentifierToSubscription: API.OperationMethod<
  AddSourceIdentifierToSubscriptionMessage,
  AddSourceIdentifierToSubscriptionResult,
  AddSourceIdentifierToSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<AddSourceIdentifierToSubscriptionMessage>,
  output: __S(105, __c13, 1) as any as S.Schema<AddSourceIdentifierToSubscriptionResult>,
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
 * Adds metadata tags to an Amazon DocumentDB resource. You can use these tags
 * with cost allocation reporting to track costs that are associated
 * with Amazon DocumentDB resources or in a `Condition` statement in
 * an Identity and Access Management (IAM) policy for Amazon DocumentDB.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceMessage,
  AddTagsToResourceResponse,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<AddTagsToResourceMessage>,
  output: __S(137, __c17, 1) as any as S.Schema<AddTagsToResourceResponse>,
  errors: [DBClusterNotFoundFault, DBInstanceNotFoundFault, DBSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
}));

export type ApplyPendingMaintenanceActionError =
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Applies a pending maintenance action to a resource (for example,
 * to an Amazon DocumentDB instance).
 */
export const applyPendingMaintenanceAction: API.OperationMethod<
  ApplyPendingMaintenanceActionMessage,
  ApplyPendingMaintenanceActionResult,
  ApplyPendingMaintenanceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<ApplyPendingMaintenanceActionMessage>,
  output: __S(153, __c19, 1) as any as S.Schema<ApplyPendingMaintenanceActionResult>,
  errors: [InvalidDBClusterStateFault, InvalidDBInstanceStateFault, ResourceNotFoundFault],
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
 * Copies the specified cluster parameter group.
 */
export const copyDBClusterParameterGroup: API.OperationMethod<
  CopyDBClusterParameterGroupMessage,
  CopyDBClusterParameterGroupResult,
  CopyDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<CopyDBClusterParameterGroupMessage>,
  output: __S(169, __c21, 1) as any as S.Schema<CopyDBClusterParameterGroupResult>,
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
 * Copies a snapshot of a cluster.
 *
 * To copy a cluster snapshot from a shared manual cluster snapshot,
 * `SourceDBClusterSnapshotIdentifier` must be the Amazon
 * Resource Name (ARN) of the shared cluster snapshot. You can only
 * copy a shared DB cluster snapshot, whether encrypted or not, in the
 * same Amazon Web Services Region.
 *
 * To cancel the copy operation after it is in progress, delete the
 * target cluster snapshot identified by
 * `TargetDBClusterSnapshotIdentifier` while that cluster
 * snapshot is in the *copying* status.
 */
export const copyDBClusterSnapshot: API.OperationMethod<
  CopyDBClusterSnapshotMessage,
  CopyDBClusterSnapshotResult,
  CopyDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<CopyDBClusterSnapshotMessage>,
  output: __S(185, __c23, 1) as any as S.Schema<CopyDBClusterSnapshotResult>,
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
  | NetworkTypeNotSupported
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new Amazon DocumentDB cluster.
 */
export const createDBCluster: API.OperationMethod<
  CreateDBClusterMessage,
  CreateDBClusterResult,
  CreateDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<CreateDBClusterMessage>,
  output: __S(209, __c26, 1) as any as S.Schema<CreateDBClusterResult>,
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
    NetworkTypeNotSupported,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBCluster",
}));

export type CreateDBClusterParameterGroupError =
  | DBParameterGroupAlreadyExistsFault
  | DBParameterGroupQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new cluster parameter group.
 *
 * Parameters in a cluster parameter group apply to all of the
 * instances in a cluster.
 *
 * A cluster parameter group is initially created with the default
 * parameters for the database engine used by instances in the cluster.
 * In Amazon DocumentDB, you cannot make modifications directly to the
 * `default.docdb3.6` cluster parameter group. If your
 * Amazon DocumentDB cluster is using the default cluster parameter group and you
 * want to modify a value in it, you must first
 * create a new parameter group
 * or
 * copy an existing parameter group,
 * modify it, and then apply the modified parameter group to your
 * cluster. For the new cluster parameter group and associated settings
 * to take effect, you must then reboot the instances in the cluster
 * without failover. For more information,
 * see
 * Modifying Amazon DocumentDB Cluster Parameter Groups.
 */
export const createDBClusterParameterGroup: API.OperationMethod<
  CreateDBClusterParameterGroupMessage,
  CreateDBClusterParameterGroupResult,
  CreateDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<CreateDBClusterParameterGroupMessage>,
  output: __S(249, __c31, 1) as any as S.Schema<CreateDBClusterParameterGroupResult>,
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
 * Creates a snapshot of a cluster.
 */
export const createDBClusterSnapshot: API.OperationMethod<
  CreateDBClusterSnapshotMessage,
  CreateDBClusterSnapshotResult,
  CreateDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<CreateDBClusterSnapshotMessage>,
  output: __S(257, __c32, 1) as any as S.Schema<CreateDBClusterSnapshotResult>,
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
  | InstanceQuotaExceededFault
  | InsufficientDBInstanceCapacityFault
  | InvalidDBClusterStateFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | CommonErrors;
/**
 * Creates a new instance.
 */
export const createDBInstance: API.OperationMethod<
  CreateDBInstanceMessage,
  CreateDBInstanceResult,
  CreateDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<CreateDBInstanceMessage>,
  output: __S(265, __c33, 1) as any as S.Schema<CreateDBInstanceResult>,
  errors: [
    AuthorizationNotFoundFault,
    DBClusterNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBSecurityGroupNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    InstanceQuotaExceededFault,
    InsufficientDBInstanceCapacityFault,
    InvalidDBClusterStateFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBInstance",
}));

export type CreateDBSubnetGroupError =
  | DBSubnetGroupAlreadyExistsFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupQuotaExceededFault
  | DBSubnetQuotaExceededFault
  | InvalidSubnet
  | CommonErrors;
/**
 * Creates a new subnet group. subnet groups must contain at least one subnet in at
 * least two Availability Zones in the Amazon Web Services Region.
 */
export const createDBSubnetGroup: API.OperationMethod<
  CreateDBSubnetGroupMessage,
  CreateDBSubnetGroupResult,
  CreateDBSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<CreateDBSubnetGroupMessage>,
  output: __S(297, __c37, 1) as any as S.Schema<CreateDBSubnetGroupResult>,
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
 * Creates an Amazon DocumentDB event notification subscription. This action requires a topic Amazon Resource Name (ARN) created by using the Amazon DocumentDB console, the Amazon SNS console, or the Amazon SNS API. To obtain an ARN with Amazon SNS, you must create a topic in Amazon SNS and subscribe to the topic. The ARN is displayed in the Amazon SNS console.
 *
 * You can specify the type of source (`SourceType`) that you want to be notified of. You can also provide a list of Amazon DocumentDB sources (`SourceIds`) that trigger the events, and you can provide a list of event categories (`EventCategories`) for events that you want to be notified of. For example, you can specify `SourceType = db-instance`, `SourceIds = mydbinstance1, mydbinstance2` and `EventCategories = Availability, Backup`.
 *
 * If you specify both the `SourceType` and `SourceIds` (such as `SourceType = db-instance` and `SourceIdentifier = myDBInstance1`), you are notified of all the `db-instance` events for the specified source. If you specify a `SourceType` but do not specify a `SourceIdentifier`, you receive notice of the events for that source type for all your Amazon DocumentDB sources. If you do not specify either the `SourceType` or the `SourceIdentifier`, you are notified of events generated from all Amazon DocumentDB sources belonging to your customer account.
 */
export const createEventSubscription: API.OperationMethod<
  CreateEventSubscriptionMessage,
  CreateEventSubscriptionResult,
  CreateEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<CreateEventSubscriptionMessage>,
  output: __S(313, __c39, 1) as any as S.Schema<CreateEventSubscriptionResult>,
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
 * Creates an Amazon DocumentDB global cluster that can span multiple multiple Amazon Web Services Regions.
 * The global cluster contains one primary cluster with read-write capability, and up-to 10 read-only secondary clusters. Global clusters uses storage-based fast replication across regions with latencies less than one second, using dedicated infrastructure with no impact to your workload's performance.
 *
 * You can create a global cluster that is initially empty, and then add a primary and a secondary to it.
 * Or you can specify an existing cluster during the create operation, and this cluster becomes the primary of the global cluster.
 *
 * This action only applies to Amazon DocumentDB clusters.
 */
export const createGlobalCluster: API.OperationMethod<
  CreateGlobalClusterMessage,
  CreateGlobalClusterResult,
  CreateGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<CreateGlobalClusterMessage>,
  output: __S(321, __c40, 1) as any as S.Schema<CreateGlobalClusterResult>,
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
 * Deletes a previously provisioned cluster. When you delete a cluster, all automated backups for that cluster are deleted and can't be recovered. Manual DB cluster snapshots of the specified cluster are not deleted.
 */
export const deleteDBCluster: API.OperationMethod<
  DeleteDBClusterMessage,
  DeleteDBClusterResult,
  DeleteDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<DeleteDBClusterMessage>,
  output: __S(337, __c42, 1) as any as S.Schema<DeleteDBClusterResult>,
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

export type DeleteDBClusterParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Deletes a specified cluster parameter group. The cluster parameter group to be deleted can't be associated with any clusters.
 */
export const deleteDBClusterParameterGroup: API.OperationMethod<
  DeleteDBClusterParameterGroupMessage,
  DeleteDBClusterParameterGroupResponse,
  DeleteDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<DeleteDBClusterParameterGroupMessage>,
  output: __S(345, __c43, 1) as any as S.Schema<DeleteDBClusterParameterGroupResponse>,
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
 * Deletes a cluster snapshot. If the snapshot is being copied, the copy operation is terminated.
 *
 * The cluster snapshot must be in the `available` state to be deleted.
 */
export const deleteDBClusterSnapshot: API.OperationMethod<
  DeleteDBClusterSnapshotMessage,
  DeleteDBClusterSnapshotResult,
  DeleteDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<DeleteDBClusterSnapshotMessage>,
  output: __S(353, __c44, 1) as any as S.Schema<DeleteDBClusterSnapshotResult>,
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
 * Deletes a previously provisioned instance.
 */
export const deleteDBInstance: API.OperationMethod<
  DeleteDBInstanceMessage,
  DeleteDBInstanceResult,
  DeleteDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<DeleteDBInstanceMessage>,
  output: __S(361, __c45, 1) as any as S.Schema<DeleteDBInstanceResult>,
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

export type DeleteDBSubnetGroupError =
  | DBSubnetGroupNotFoundFault
  | InvalidDBSubnetGroupStateFault
  | InvalidDBSubnetStateFault
  | CommonErrors;
/**
 * Deletes a subnet group.
 *
 * The specified database subnet group must not be associated with any DB
 * instances.
 */
export const deleteDBSubnetGroup: API.OperationMethod<
  DeleteDBSubnetGroupMessage,
  DeleteDBSubnetGroupResponse,
  DeleteDBSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<DeleteDBSubnetGroupMessage>,
  output: __S(369, __c46, 1) as any as S.Schema<DeleteDBSubnetGroupResponse>,
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
 * Deletes an Amazon DocumentDB event notification subscription.
 */
export const deleteEventSubscription: API.OperationMethod<
  DeleteEventSubscriptionMessage,
  DeleteEventSubscriptionResult,
  DeleteEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<DeleteEventSubscriptionMessage>,
  output: __S(377, __c47, 1) as any as S.Schema<DeleteEventSubscriptionResult>,
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
 * Deletes a global cluster. The primary and secondary clusters must already be detached or deleted before attempting to delete a global cluster.
 *
 * This action only applies to Amazon DocumentDB clusters.
 */
export const deleteGlobalCluster: API.OperationMethod<
  DeleteGlobalClusterMessage,
  DeleteGlobalClusterResult,
  DeleteGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<DeleteGlobalClusterMessage>,
  output: __S(385, __c48, 1) as any as S.Schema<DeleteGlobalClusterResult>,
  errors: [GlobalClusterNotFoundFault, InvalidGlobalClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlobalCluster",
}));

export type DescribeCertificatesError = CertificateNotFoundFault | CommonErrors;
/**
 * Returns a list of certificate authority (CA) certificates provided by Amazon DocumentDB for this Amazon Web Services account.
 */
export const describeCertificates: API.PaginatedOperationMethod<
  DescribeCertificatesMessage,
  CertificateMessage,
  DescribeCertificatesError,
  Credentials | HttpClient.HttpClient,
  Certificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<DescribeCertificatesMessage>,
  output: __S(395, __c49, 3) as any as S.Schema<CertificateMessage>,
  errors: [CertificateNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificates",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Certificates",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBClusterParameterGroupsError = DBParameterGroupNotFoundFault | CommonErrors;
/**
 * Returns a list of `DBClusterParameterGroup` descriptions. If a `DBClusterParameterGroupName` parameter is specified, the list contains only the description of the specified cluster parameter group.
 */
export const describeDBClusterParameterGroups: API.PaginatedOperationMethod<
  DescribeDBClusterParameterGroupsMessage,
  DBClusterParameterGroupsMessage,
  DescribeDBClusterParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  DBClusterParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(408, __c51, 0) as any as S.Schema<DescribeDBClusterParameterGroupsMessage>,
  output: __S(410, __c51, 2) as any as S.Schema<DBClusterParameterGroupsMessage>,
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
 * Returns the detailed parameter list for a particular cluster parameter
 * group.
 */
export const describeDBClusterParameters: API.PaginatedOperationMethod<
  DescribeDBClusterParametersMessage,
  DBClusterParameterGroupDetails,
  DescribeDBClusterParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(416, __c52, 0) as any as S.Schema<DescribeDBClusterParametersMessage>,
  output: __S(417, __c52, 1) as any as S.Schema<DBClusterParameterGroupDetails>,
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
 * Returns information about provisioned Amazon DocumentDB clusters. This API
 * operation supports pagination. For certain management features
 * such as cluster and instance lifecycle management, Amazon DocumentDB leverages
 * operational technology that is shared with Amazon RDS and Amazon
 * Neptune. Use the `filterName=engine,Values=docdb` filter
 * parameter to return only Amazon DocumentDB clusters.
 */
export const describeDBClusters: API.PaginatedOperationMethod<
  DescribeDBClustersMessage,
  DBClusterMessage,
  DescribeDBClustersError,
  Credentials | HttpClient.HttpClient,
  DBCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(432, __c54, 0) as any as S.Schema<DescribeDBClustersMessage>,
  output: __S(434, __c54, 2) as any as S.Schema<DBClusterMessage>,
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
 * Returns a list of cluster snapshot attribute names and values for a manual DB
 * cluster snapshot.
 *
 * When you share snapshots with other Amazon Web Services accounts,
 * `DescribeDBClusterSnapshotAttributes` returns the `restore` attribute and a list of IDs for the Amazon Web Services accounts that are authorized to copy or restore the manual cluster snapshot. If `all` is included in the list of values for the `restore` attribute, then the manual cluster snapshot is public and can be copied or restored by all Amazon Web Services accounts.
 */
export const describeDBClusterSnapshotAttributes: API.OperationMethod<
  DescribeDBClusterSnapshotAttributesMessage,
  DescribeDBClusterSnapshotAttributesResult,
  DescribeDBClusterSnapshotAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(440, __c55, 0) as any as S.Schema<DescribeDBClusterSnapshotAttributesMessage>,
  output: __S(441, __c55, 1) as any as S.Schema<DescribeDBClusterSnapshotAttributesResult>,
  errors: [DBClusterSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterSnapshotAttributes",
}));

export type DescribeDBClusterSnapshotsError = DBClusterSnapshotNotFoundFault | CommonErrors;
/**
 * Returns information about cluster snapshots. This API operation supports pagination.
 */
export const describeDBClusterSnapshots: API.PaginatedOperationMethod<
  DescribeDBClusterSnapshotsMessage,
  DBClusterSnapshotMessage,
  DescribeDBClusterSnapshotsError,
  Credentials | HttpClient.HttpClient,
  DBClusterSnapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(456, __c57, 0) as any as S.Schema<DescribeDBClusterSnapshotsMessage>,
  output: __S(458, __c57, 2) as any as S.Schema<DBClusterSnapshotMessage>,
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
 * Returns a list of the available engines.
 */
export const describeDBEngineVersions: API.PaginatedOperationMethod<
  DescribeDBEngineVersionsMessage,
  DBEngineVersionMessage,
  DescribeDBEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  DBEngineVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c58, 0) as any as S.Schema<DescribeDBEngineVersionsMessage>,
  output: __S(471, __c58, 7) as any as S.Schema<DBEngineVersionMessage>,
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
 * Returns information about provisioned Amazon DocumentDB instances. This API supports pagination.
 */
export const describeDBInstances: API.PaginatedOperationMethod<
  DescribeDBInstancesMessage,
  DBInstanceMessage,
  DescribeDBInstancesError,
  Credentials | HttpClient.HttpClient,
  DBInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(472, __c59, 0) as any as S.Schema<DescribeDBInstancesMessage>,
  output: __S(474, __c59, 2) as any as S.Schema<DBInstanceMessage>,
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

export type DescribeDBSubnetGroupsError = DBSubnetGroupNotFoundFault | CommonErrors;
/**
 * Returns a list of `DBSubnetGroup` descriptions. If a
 * `DBSubnetGroupName` is specified, the list will contain only the descriptions of the specified `DBSubnetGroup`.
 */
export const describeDBSubnetGroups: API.PaginatedOperationMethod<
  DescribeDBSubnetGroupsMessage,
  DBSubnetGroupMessage,
  DescribeDBSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  DBSubnetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c60, 0) as any as S.Schema<DescribeDBSubnetGroupsMessage>,
  output: __S(482, __c60, 2) as any as S.Schema<DBSubnetGroupMessage>,
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
  input: __S(488, __c61, 0) as any as S.Schema<DescribeEngineDefaultClusterParametersMessage>,
  output: __S(490, __c61, 2) as any as S.Schema<DescribeEngineDefaultClusterParametersResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineDefaultClusterParameters",
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<DescribeEventCategoriesMessage>,
  output: __S(499, __c62, 3) as any as S.Schema<EventCategoriesMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventCategories",
}));

export type DescribeEventsError = CommonErrors;
/**
 * Returns events related to instances, security groups, snapshots, and DB parameter groups for the past 14 days. You can obtain events specific to a particular DB instance, security group, snapshot, or parameter group by providing the name as a parameter. By default, the events of the past hour are returned.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsMessage,
  EventsMessage,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(504, __c63, 0) as any as S.Schema<DescribeEventsMessage>,
  output: __S(507, __c63, 3) as any as S.Schema<EventsMessage>,
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
 * Lists all the subscription descriptions for a customer account. The description for a subscription includes `SubscriptionName`, `SNSTopicARN`, `CustomerID`, `SourceType`, `SourceID`, `CreationTime`, and `Status`.
 *
 * If you specify a `SubscriptionName`, lists the description for that subscription.
 */
export const describeEventSubscriptions: API.PaginatedOperationMethod<
  DescribeEventSubscriptionsMessage,
  EventSubscriptionsMessage,
  DescribeEventSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  EventSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c64, 0) as any as S.Schema<DescribeEventSubscriptionsMessage>,
  output: __S(514, __c64, 2) as any as S.Schema<EventSubscriptionsMessage>,
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
 * Returns information about Amazon DocumentDB global clusters. This API supports pagination.
 *
 * This action only applies to Amazon DocumentDB clusters.
 */
export const describeGlobalClusters: API.PaginatedOperationMethod<
  DescribeGlobalClustersMessage,
  GlobalClustersMessage,
  DescribeGlobalClustersError,
  Credentials | HttpClient.HttpClient,
  GlobalCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(520, __c65, 0) as any as S.Schema<DescribeGlobalClustersMessage>,
  output: __S(522, __c65, 2) as any as S.Schema<GlobalClustersMessage>,
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
 * Returns a list of orderable instance options for the specified engine.
 */
export const describeOrderableDBInstanceOptions: API.PaginatedOperationMethod<
  DescribeOrderableDBInstanceOptionsMessage,
  OrderableDBInstanceOptionsMessage,
  DescribeOrderableDBInstanceOptionsError,
  Credentials | HttpClient.HttpClient,
  OrderableDBInstanceOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c66, 0) as any as S.Schema<DescribeOrderableDBInstanceOptionsMessage>,
  output: __S(532, __c66, 4) as any as S.Schema<OrderableDBInstanceOptionsMessage>,
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
 * Returns a list of resources (for example, instances) that have at least one pending
 * maintenance action.
 */
export const describePendingMaintenanceActions: API.PaginatedOperationMethod<
  DescribePendingMaintenanceActionsMessage,
  PendingMaintenanceActionsMessage,
  DescribePendingMaintenanceActionsError,
  Credentials | HttpClient.HttpClient,
  ResourcePendingMaintenanceActions
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(536, __c67, 0) as any as S.Schema<DescribePendingMaintenanceActionsMessage>,
  output: __S(538, __c67, 2) as any as S.Schema<PendingMaintenanceActionsMessage>,
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

export type FailoverDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Forces a failover for a cluster.
 *
 * A failover for a cluster promotes one of the Amazon DocumentDB replicas (read-only instances) in the cluster to be the primary instance (the cluster writer).
 *
 * If the primary instance fails, Amazon DocumentDB automatically fails over to an Amazon DocumentDB replica, if one exists. You can force a failover when you want to simulate a failure of a primary instance for testing.
 */
export const failoverDBCluster: API.OperationMethod<
  FailoverDBClusterMessage,
  FailoverDBClusterResult,
  FailoverDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c68, 0) as any as S.Schema<FailoverDBClusterMessage>,
  output: __S(545, __c68, 1) as any as S.Schema<FailoverDBClusterResult>,
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
 * Promotes the specified secondary DB cluster to be the primary DB cluster in the global cluster when failing over a global cluster occurs.
 *
 * Use this operation to respond to an unplanned event, such as a regional disaster in the primary region.
 * Failing over can result in a loss of write transaction data that wasn't replicated to the chosen secondary before the failover event occurred.
 * However, the recovery process that promotes a DB instance on the chosen seconday DB cluster to be the primary writer DB instance guarantees that the data is in a transactionally consistent state.
 */
export const failoverGlobalCluster: API.OperationMethod<
  FailoverGlobalClusterMessage,
  FailoverGlobalClusterResult,
  FailoverGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(552, __c69, 0) as any as S.Schema<FailoverGlobalClusterMessage>,
  output: __S(553, __c69, 1) as any as S.Schema<FailoverGlobalClusterResult>,
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
 * Lists all tags on an Amazon DocumentDB resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceMessage,
  TagListMessage,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c70, 0) as any as S.Schema<ListTagsForResourceMessage>,
  output: __S(561, __c70, 1) as any as S.Schema<TagListMessage>,
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
  | NetworkTypeNotSupported
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Modifies a setting for an Amazon DocumentDB cluster. You can change one or more database
 * configuration parameters by specifying these parameters and the new values in the
 * request.
 */
export const modifyDBCluster: API.OperationMethod<
  ModifyDBClusterMessage,
  ModifyDBClusterResult,
  ModifyDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(569, __c71, 1) as any as S.Schema<ModifyDBClusterMessage>,
  output: __S(570, __c71, 2) as any as S.Schema<ModifyDBClusterResult>,
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
    NetworkTypeNotSupported,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBCluster",
}));

export type ModifyDBClusterParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Modifies the parameters of a cluster parameter group. To modify more than one
 * parameter, submit a list of the following: `ParameterName`,
 * `ParameterValue`, and `ApplyMethod`. A maximum of 20
 * parameters can be modified in a single request.
 *
 * Changes to dynamic parameters are applied immediately. Changes to static
 * parameters require a reboot or maintenance window
 *
 * before the change can take effect.
 *
 * After you create a cluster parameter group, you should wait at least 5 minutes
 * before creating your first cluster that uses that cluster parameter group as
 * the default parameter group. This allows Amazon DocumentDB to fully complete the create action
 * before the parameter group is used as the default for a new cluster. This step is
 * especially important for parameters that are critical when creating the default
 * database for a cluster, such as the character set for the default database
 * defined by the `character_set_database` parameter.
 */
export const modifyDBClusterParameterGroup: API.OperationMethod<
  ModifyDBClusterParameterGroupMessage,
  DBClusterParameterGroupNameMessage,
  ModifyDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c72, 0) as any as S.Schema<ModifyDBClusterParameterGroupMessage>,
  output: __S(584, __c73, 0) as any as S.Schema<DBClusterParameterGroupNameMessage>,
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
 * Adds an attribute and values to, or removes an attribute and values from, a manual cluster snapshot.
 *
 * To share a manual cluster snapshot with other Amazon Web Services accounts, specify `restore` as the `AttributeName`, and use the `ValuesToAdd` parameter to add a list of IDs of the Amazon Web Services accounts that are authorized to restore the manual cluster snapshot. Use the value `all` to make the manual cluster snapshot public, which means that it can be copied or restored by all Amazon Web Services accounts. Do not add the `all` value for any manual cluster snapshots that contain private information that you don't want available to all Amazon Web Services accounts. If a manual cluster snapshot is encrypted, it can be shared, but only by specifying a list of authorized Amazon Web Services account IDs for the `ValuesToAdd` parameter. You can't use `all` as a value for that parameter in this case.
 */
export const modifyDBClusterSnapshotAttribute: API.OperationMethod<
  ModifyDBClusterSnapshotAttributeMessage,
  ModifyDBClusterSnapshotAttributeResult,
  ModifyDBClusterSnapshotAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c74, 0) as any as S.Schema<ModifyDBClusterSnapshotAttributeMessage>,
  output: __S(593, __c74, 1) as any as S.Schema<ModifyDBClusterSnapshotAttributeResult>,
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
  | InsufficientDBInstanceCapacityFault
  | InvalidDBInstanceStateFault
  | InvalidDBSecurityGroupStateFault
  | InvalidVPCNetworkStateFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | CommonErrors;
/**
 * Modifies settings for an instance. You can change one or more database configuration parameters by specifying these parameters and the new values in the request.
 */
export const modifyDBInstance: API.OperationMethod<
  ModifyDBInstanceMessage,
  ModifyDBInstanceResult,
  ModifyDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(600, __c75, 0) as any as S.Schema<ModifyDBInstanceMessage>,
  output: __S(601, __c75, 1) as any as S.Schema<ModifyDBInstanceResult>,
  errors: [
    AuthorizationNotFoundFault,
    CertificateNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBInstanceNotFoundFault,
    DBParameterGroupNotFoundFault,
    DBSecurityGroupNotFoundFault,
    DBUpgradeDependencyFailureFault,
    InsufficientDBInstanceCapacityFault,
    InvalidDBInstanceStateFault,
    InvalidDBSecurityGroupStateFault,
    InvalidVPCNetworkStateFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBInstance",
}));

export type ModifyDBSubnetGroupError =
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | DBSubnetQuotaExceededFault
  | InvalidSubnet
  | SubnetAlreadyInUse
  | CommonErrors;
/**
 * Modifies an existing subnet group. subnet groups must contain at least one subnet in at least two Availability Zones in the Amazon Web Services Region.
 */
export const modifyDBSubnetGroup: API.OperationMethod<
  ModifyDBSubnetGroupMessage,
  ModifyDBSubnetGroupResult,
  ModifyDBSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ModifyDBSubnetGroupMessage>,
  output: __S(1, __c0, 1) as any as S.Schema<ModifyDBSubnetGroupResult>,
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
 * Modifies an existing Amazon DocumentDB event notification subscription.
 */
export const modifyEventSubscription: API.OperationMethod<
  ModifyEventSubscriptionMessage,
  ModifyEventSubscriptionResult,
  ModifyEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<ModifyEventSubscriptionMessage>,
  output: __S(9, __c1, 1) as any as S.Schema<ModifyEventSubscriptionResult>,
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
  | GlobalClusterNotFoundFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Modify a setting for an Amazon DocumentDB global cluster. You can change one or more configuration parameters (for example: deletion protection), or the global cluster identifier by specifying these parameters and the new values in the request.
 *
 * This action only applies to Amazon DocumentDB clusters.
 */
export const modifyGlobalCluster: API.OperationMethod<
  ModifyGlobalClusterMessage,
  ModifyGlobalClusterResult,
  ModifyGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<ModifyGlobalClusterMessage>,
  output: __S(17, __c2, 1) as any as S.Schema<ModifyGlobalClusterResult>,
  errors: [GlobalClusterNotFoundFault, InvalidGlobalClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyGlobalCluster",
}));

export type RebootDBInstanceError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * You might need to reboot your instance, usually for maintenance reasons. For
 * example, if you make certain changes, or if you change the cluster parameter group
 * that is associated with the instance, you must reboot the instance for the changes to
 * take effect.
 *
 * Rebooting an instance restarts the database engine service. Rebooting an instance
 * results in a momentary outage, during which the instance status is set to
 * *rebooting*.
 */
export const rebootDBInstance: API.OperationMethod<
  RebootDBInstanceMessage,
  RebootDBInstanceResult,
  RebootDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<RebootDBInstanceMessage>,
  output: __S(25, __c3, 1) as any as S.Schema<RebootDBInstanceResult>,
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
 * Detaches an Amazon DocumentDB secondary cluster from a global cluster. The cluster becomes a standalone cluster with read-write capability instead of being read-only and receiving data from a primary in a different region.
 *
 * This action only applies to Amazon DocumentDB clusters.
 */
export const removeFromGlobalCluster: API.OperationMethod<
  RemoveFromGlobalClusterMessage,
  RemoveFromGlobalClusterResult,
  RemoveFromGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<RemoveFromGlobalClusterMessage>,
  output: __S(33, __c4, 1) as any as S.Schema<RemoveFromGlobalClusterResult>,
  errors: [DBClusterNotFoundFault, GlobalClusterNotFoundFault, InvalidGlobalClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFromGlobalCluster",
}));

export type RemoveSourceIdentifierFromSubscriptionError =
  | SourceNotFoundFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Removes a source identifier from an existing Amazon DocumentDB event notification
 * subscription.
 */
export const removeSourceIdentifierFromSubscription: API.OperationMethod<
  RemoveSourceIdentifierFromSubscriptionMessage,
  RemoveSourceIdentifierFromSubscriptionResult,
  RemoveSourceIdentifierFromSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<RemoveSourceIdentifierFromSubscriptionMessage>,
  output: __S(41, __c5, 1) as any as S.Schema<RemoveSourceIdentifierFromSubscriptionResult>,
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
 * Removes metadata tags from an Amazon DocumentDB resource.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceMessage,
  RemoveTagsFromResourceResponse,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(49, __c6, 1) as any as S.Schema<RemoveTagsFromResourceMessage>,
  output: __S(50, __c6, 2) as any as S.Schema<RemoveTagsFromResourceResponse>,
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
 * Modifies the parameters of a cluster parameter group to the default value. To
 * reset specific parameters, submit a list of the following: `ParameterName`
 * and `ApplyMethod`. To reset the entire cluster parameter group, specify
 * the `DBClusterParameterGroupName` and `ResetAllParameters`
 * parameters.
 *
 * When you reset the entire group, dynamic parameters are updated immediately and
 * static parameters are set to `pending-reboot` to take effect on the next DB
 * instance reboot.
 */
export const resetDBClusterParameterGroup: API.OperationMethod<
  ResetDBClusterParameterGroupMessage,
  DBClusterParameterGroupNameMessage,
  ResetDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<ResetDBClusterParameterGroupMessage>,
  output: __S(584, __c73, 0) as any as S.Schema<DBClusterParameterGroupNameMessage>,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDBClusterParameterGroup",
}));

export type RestoreDBClusterFromSnapshotError =
  | DBClusterAlreadyExistsFault
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
  | NetworkTypeNotSupported
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new cluster from a snapshot or cluster snapshot.
 *
 * If a snapshot is specified, the target cluster is created from the source DB snapshot with a default configuration and default security group.
 *
 * If a cluster snapshot is specified, the target cluster is created from the source cluster restore point with the same configuration as the original source DB cluster, except that the new cluster is created with the default security group.
 */
export const restoreDBClusterFromSnapshot: API.OperationMethod<
  RestoreDBClusterFromSnapshotMessage,
  RestoreDBClusterFromSnapshotResult,
  RestoreDBClusterFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<RestoreDBClusterFromSnapshotMessage>,
  output: __S(65, __c8, 1) as any as S.Schema<RestoreDBClusterFromSnapshotResult>,
  errors: [
    DBClusterAlreadyExistsFault,
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
    NetworkTypeNotSupported,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDBClusterFromSnapshot",
}));

export type RestoreDBClusterToPointInTimeError =
  | DBClusterAlreadyExistsFault
  | DBClusterNotFoundFault
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
  | NetworkTypeNotSupported
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Restores a cluster to an arbitrary point in time. Users can restore to any point in
 * time before `LatestRestorableTime` for up to
 * `BackupRetentionPeriod` days. The target cluster is created from the
 * source cluster with the same configuration as the original cluster, except that
 * the new cluster is created with the default security group.
 */
export const restoreDBClusterToPointInTime: API.OperationMethod<
  RestoreDBClusterToPointInTimeMessage,
  RestoreDBClusterToPointInTimeResult,
  RestoreDBClusterToPointInTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<RestoreDBClusterToPointInTimeMessage>,
  output: __S(73, __c9, 1) as any as S.Schema<RestoreDBClusterToPointInTimeResult>,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterNotFoundFault,
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
    NetworkTypeNotSupported,
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
 * Restarts the stopped cluster that is specified by `DBClusterIdentifier`.
 * For more information, see Stopping and
 * Starting an Amazon DocumentDB Cluster.
 */
export const startDBCluster: API.OperationMethod<
  StartDBClusterMessage,
  StartDBClusterResult,
  StartDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<StartDBClusterMessage>,
  output: __S(81, __c10, 1) as any as S.Schema<StartDBClusterResult>,
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
 * Stops the running cluster that is specified by `DBClusterIdentifier`. The
 * cluster must be in the *available* state. For more information, see
 * Stopping and
 * Starting an Amazon DocumentDB Cluster.
 */
export const stopDBCluster: API.OperationMethod<
  StopDBClusterMessage,
  StopDBClusterResult,
  StopDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<StopDBClusterMessage>,
  output: __S(89, __c11, 1) as any as S.Schema<StopDBClusterResult>,
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
 * Switches over the specified secondary Amazon DocumentDB cluster to be the new primary Amazon DocumentDB cluster in the global database cluster.
 */
export const switchoverGlobalCluster: API.OperationMethod<
  SwitchoverGlobalClusterMessage,
  SwitchoverGlobalClusterResult,
  SwitchoverGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<SwitchoverGlobalClusterMessage>,
  output: __S(97, __c12, 1) as any as S.Schema<SwitchoverGlobalClusterResult>,
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
          DBSubnetGroupName: S.optional(S.String),
          DBSubnetGroupDescription: S.optional(S.String),
          SubnetIds: S.optional(__S(304, __c38, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBSubnetGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSubnetGroup: S.optional(__S(283, __c35, 3)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBSubnetGroupResult" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SourceType: S.optional(S.String),
          EventCategories: S.optional(__S(120, __c15, 0)),
          Enabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyEventSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(129, __c16, 1)) }).pipe(ns),
      ).annotate({ identifier: "ModifyEventSubscriptionResult" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalClusterIdentifier: S.optional(S.String),
          NewGlobalClusterIdentifier: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyGlobalClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalCluster: S.optional(__S(332, __c41, 4)) }).pipe(ns),
      ).annotate({ identifier: "ModifyGlobalClusterResult" });
  }
}
function __c3(j: number): any {
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
        S.Struct({ DBInstance: S.optional(__S(293, __c36, 5)) }).pipe(ns),
      ).annotate({ identifier: "RebootDBInstanceResult" });
  }
}
function __c4(j: number): any {
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
        S.Struct({ GlobalCluster: S.optional(__S(332, __c41, 4)) }).pipe(ns),
      ).annotate({ identifier: "RemoveFromGlobalClusterResult" });
  }
}
function __c5(j: number): any {
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
        S.Struct({ EventSubscription: S.optional(__S(129, __c16, 1)) }).pipe(ns),
      ).annotate({ identifier: "RemoveSourceIdentifierFromSubscriptionResult" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceName: S.optional(S.String),
          TagKeys: S.optional(__S(48, __c6, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveTagsFromResourceMessage" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "RemoveTagsFromResourceResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          ResetAllParameters: S.optional(S.Boolean),
          Parameters: S.optional(__S(425, __c53, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ResetDBClusterParameterGroupMessage" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(192, __c24, 0)),
          DBClusterIdentifier: S.optional(S.String),
          SnapshotIdentifier: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Port: S.optional(S.Number),
          DBSubnetGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(240, __c30, 0)),
          Tags: S.optional(__S(145, __c18, 1)),
          KmsKeyId: S.optional(S.String),
          EnableCloudwatchLogsExports: S.optional(__S(216, __c27, 0)),
          DeletionProtection: S.optional(S.Boolean),
          DBClusterParameterGroupName: S.optional(S.String),
          ServerlessV2ScalingConfiguration: S.optional(__S(241, __c30, 1)),
          StorageType: S.optional(S.String),
          NetworkType: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreDBClusterFromSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(239, __c29, 7)) }).pipe(ns),
      ).annotate({ identifier: "RestoreDBClusterFromSnapshotResult" });
  }
}
function __c9(j: number): any {
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
          VpcSecurityGroupIds: S.optional(__S(240, __c30, 0)),
          Tags: S.optional(__S(145, __c18, 1)),
          KmsKeyId: S.optional(S.String),
          EnableCloudwatchLogsExports: S.optional(__S(216, __c27, 0)),
          DeletionProtection: S.optional(S.Boolean),
          ServerlessV2ScalingConfiguration: S.optional(__S(241, __c30, 1)),
          StorageType: S.optional(S.String),
          NetworkType: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreDBClusterToPointInTimeMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(239, __c29, 7)) }).pipe(ns),
      ).annotate({ identifier: "RestoreDBClusterToPointInTimeResult" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(239, __c29, 7)) }).pipe(ns),
      ).annotate({ identifier: "StartDBClusterResult" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(239, __c29, 7)) }).pipe(ns),
      ).annotate({ identifier: "StopDBClusterResult" });
  }
}
function __c12(j: number): any {
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
        S.Struct({ GlobalCluster: S.optional(__S(332, __c41, 4)) }).pipe(ns),
      ).annotate({ identifier: "SwitchoverGlobalClusterResult" });
  }
}
function __c13(j: number): any {
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
        S.Struct({ EventSubscription: S.optional(__S(129, __c16, 1)) }).pipe(ns),
      ).annotate({ identifier: "AddSourceIdentifierToSubscriptionResult" });
  }
}
function __c14(j: number): any {
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
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("EventCategory")));
  }
}
function __c16(j: number): any {
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
          SourceIdsList: S.optional(__S(128, __c16, 0)),
          EventCategoriesList: S.optional(__S(120, __c15, 0)),
          Enabled: S.optional(S.Boolean),
          EventSubscriptionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventSubscription" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceName: S.optional(S.String), Tags: S.optional(__S(145, __c18, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsToResourceMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AddTagsToResourceResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(144, __c18, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "Tag" }),
      );
  }
}
function __c19(j: number): any {
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
        S.Struct({ ResourcePendingMaintenanceActions: S.optional(__S(162, __c20, 2)) }).pipe(ns),
      ).annotate({ identifier: "ApplyPendingMaintenanceActionResult" });
  }
}
function __c20(j: number): any {
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
        /*@__PURE__*/ __S(160, __c20, 0)
          .pipe(/*@__PURE__*/ T.XmlName("PendingMaintenanceAction"))
          .annotate({ identifier: "PendingMaintenanceAction" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.optional(S.String),
          PendingMaintenanceActionDetails: S.optional(__S(161, __c20, 1)),
        }),
      ).annotate({ identifier: "ResourcePendingMaintenanceActions" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDBClusterParameterGroupIdentifier: S.optional(S.String),
          TargetDBClusterParameterGroupIdentifier: S.optional(S.String),
          TargetDBClusterParameterGroupDescription: S.optional(S.String),
          Tags: S.optional(__S(145, __c18, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyDBClusterParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterParameterGroup: S.optional(__S(176, __c22, 0)) }).pipe(ns),
      ).annotate({ identifier: "CopyDBClusterParameterGroupResult" });
  }
}
function __c22(j: number): any {
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
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDBClusterSnapshotIdentifier: S.optional(S.String),
          TargetDBClusterSnapshotIdentifier: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          PreSignedUrl: S.optional(S.String),
          CopyTags: S.optional(S.Boolean),
          Tags: S.optional(__S(145, __c18, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyDBClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshot: S.optional(__S(200, __c25, 0)) }).pipe(ns),
      ).annotate({ identifier: "CopyDBClusterSnapshotResult" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AvailabilityZone")));
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(192, __c24, 0)),
          DBClusterSnapshotIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          SnapshotCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Engine: S.optional(S.String),
          Status: S.optional(S.String),
          Port: S.optional(S.Number),
          VpcId: S.optional(S.String),
          ClusterCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MasterUsername: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          PercentProgress: S.optional(S.Number),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          DBClusterSnapshotArn: S.optional(S.String),
          SourceDBClusterSnapshotArn: S.optional(S.String),
          StorageType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBClusterSnapshot" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(192, __c24, 0)),
          BackupRetentionPeriod: S.optional(S.Number),
          DBClusterIdentifier: S.optional(S.String),
          DBClusterParameterGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(240, __c30, 0)),
          DBSubnetGroupName: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Port: S.optional(S.Number),
          MasterUsername: S.optional(S.String),
          MasterUserPassword: S.optional(SensitiveString),
          PreferredBackupWindow: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          Tags: S.optional(__S(145, __c18, 1)),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          PreSignedUrl: S.optional(S.String),
          EnableCloudwatchLogsExports: S.optional(__S(216, __c27, 0)),
          DeletionProtection: S.optional(S.Boolean),
          GlobalClusterIdentifier: S.optional(S.String),
          StorageType: S.optional(S.String),
          ServerlessV2ScalingConfiguration: S.optional(__S(241, __c30, 1)),
          ManageMasterUserPassword: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
          NetworkType: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(239, __c29, 7)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBClusterResult" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcSecurityGroupId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "VpcSecurityGroupMembership" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(224, __c28, 0)
          .pipe(/*@__PURE__*/ T.XmlName("VpcSecurityGroupMembership"))
          .annotate({ identifier: "VpcSecurityGroupMembership" }),
      );
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ReadReplicaIdentifier")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          IsClusterWriter: S.optional(S.Boolean),
          DBClusterParameterGroupStatus: S.optional(S.String),
          PromotionTier: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DBClusterMember" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(233, __c29, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterMember"))
          .annotate({ identifier: "DBClusterMember" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ RoleArn: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "DBClusterRole" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(235, __c29, 3)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterRole"))
          .annotate({ identifier: "DBClusterRole" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({ MinCapacity: S.optional(S.Number), MaxCapacity: S.optional(S.Number) }),
      ).annotate({ identifier: "ServerlessV2ScalingConfigurationInfo" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          SecretArn: S.optional(S.String),
          SecretStatus: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClusterMasterUserSecret" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(192, __c24, 0)),
          BackupRetentionPeriod: S.optional(S.Number),
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
          PreferredBackupWindow: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          ReplicationSourceIdentifier: S.optional(S.String),
          ReadReplicaIdentifiers: S.optional(__S(232, __c29, 0)),
          DBClusterMembers: S.optional(__S(234, __c29, 2)),
          VpcSecurityGroups: S.optional(__S(225, __c28, 1)),
          HostedZoneId: S.optional(S.String),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          DbClusterResourceId: S.optional(S.String),
          DBClusterArn: S.optional(S.String),
          AssociatedRoles: S.optional(__S(236, __c29, 4)),
          CloneGroupId: S.optional(S.String),
          ClusterCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EnabledCloudwatchLogsExports: S.optional(__S(216, __c27, 0)),
          DeletionProtection: S.optional(S.Boolean),
          IOOptimizedNextAllowedModificationTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          StorageType: S.optional(S.String),
          ServerlessV2ScalingConfiguration: S.optional(__S(237, __c29, 5)),
          MasterUserSecret: S.optional(__S(238, __c29, 6)),
          NetworkType: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DBCluster" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("VpcSecurityGroupId")));
    case 1:
      return S.suspend(() =>
        S.Struct({ MinCapacity: S.optional(S.Number), MaxCapacity: S.optional(S.Number) }),
      ).annotate({ identifier: "ServerlessV2ScalingConfiguration" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(145, __c18, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBClusterParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterParameterGroup: S.optional(__S(176, __c22, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBClusterParameterGroupResult" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterSnapshotIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          Tags: S.optional(__S(145, __c18, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshot: S.optional(__S(200, __c25, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBClusterSnapshotResult" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          Engine: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          Tags: S.optional(__S(145, __c18, 1)),
          DBClusterIdentifier: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          PromotionTier: S.optional(S.Number),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          CACertificateIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBInstanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(293, __c36, 5)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBInstanceResult" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "AvailabilityZone",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetIdentifier: S.optional(S.String),
          SubnetAvailabilityZone: S.optional(__S(272, __c34, 0)),
          SubnetStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Subnet" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(280, __c35, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Subnet"))
          .annotate({ identifier: "Subnet" }),
      );
    case 2:
      return S.Array(S.String);
    case 3:
      return S.suspend(() =>
        S.Struct({
          DBSubnetGroupName: S.optional(S.String),
          DBSubnetGroupDescription: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetGroupStatus: S.optional(S.String),
          Subnets: S.optional(__S(281, __c35, 1)),
          DBSubnetGroupArn: S.optional(S.String),
          SupportedNetworkTypes: S.optional(__S(282, __c35, 2)),
        }),
      ).annotate({ identifier: "DBSubnetGroup" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LogTypesToEnable: S.optional(__S(216, __c27, 0)),
          LogTypesToDisable: S.optional(__S(216, __c27, 0)),
        }),
      ).annotate({ identifier: "PendingCloudwatchLogsExports" });
    case 1:
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
          PendingCloudwatchLogsExports: S.optional(__S(288, __c36, 0)),
        }),
      ).annotate({ identifier: "PendingModifiedValues" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          StatusType: S.optional(S.String),
          Normal: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBInstanceStatusInfo" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(290, __c36, 2)
          .pipe(/*@__PURE__*/ T.XmlName("DBInstanceStatusInfo"))
          .annotate({ identifier: "DBInstanceStatusInfo" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          CAIdentifier: S.optional(S.String),
          ValidTill: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CertificateDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          Engine: S.optional(S.String),
          DBInstanceStatus: S.optional(S.String),
          Endpoint: S.optional(Endpoint),
          InstanceCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          PreferredBackupWindow: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          VpcSecurityGroups: S.optional(__S(225, __c28, 1)),
          AvailabilityZone: S.optional(S.String),
          DBSubnetGroup: S.optional(__S(283, __c35, 3)),
          PreferredMaintenanceWindow: S.optional(S.String),
          PendingModifiedValues: S.optional(__S(289, __c36, 1)),
          LatestRestorableTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EngineVersion: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          PubliclyAccessible: S.optional(S.Boolean),
          StatusInfos: S.optional(__S(291, __c36, 3)),
          DBClusterIdentifier: S.optional(S.String),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          DbiResourceId: S.optional(S.String),
          CACertificateIdentifier: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          PromotionTier: S.optional(S.Number),
          DBInstanceArn: S.optional(S.String),
          EnabledCloudwatchLogsExports: S.optional(__S(216, __c27, 0)),
          CertificateDetails: S.optional(__S(292, __c36, 4)),
          PerformanceInsightsEnabled: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBInstance" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSubnetGroupName: S.optional(S.String),
          DBSubnetGroupDescription: S.optional(S.String),
          SubnetIds: S.optional(__S(304, __c38, 0)),
          Tags: S.optional(__S(145, __c18, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBSubnetGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSubnetGroup: S.optional(__S(283, __c35, 3)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBSubnetGroupResult" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SubnetIdentifier")));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SourceType: S.optional(S.String),
          EventCategories: S.optional(__S(120, __c15, 0)),
          SourceIds: S.optional(__S(128, __c16, 0)),
          Enabled: S.optional(S.Boolean),
          Tags: S.optional(__S(145, __c18, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEventSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(129, __c16, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateEventSubscriptionResult" });
  }
}
function __c40(j: number): any {
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
          StorageEncrypted: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGlobalClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalCluster: S.optional(__S(332, __c41, 4)) }).pipe(ns),
      ).annotate({ identifier: "CreateGlobalClusterResult" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBClusterArn: S.optional(S.String),
          Readers: S.optional(__S(328, __c41, 0)),
          IsWriter: S.optional(S.Boolean),
          SynchronizationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GlobalClusterMember" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(329, __c41, 1)
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
          GlobalClusterMembers: S.optional(__S(330, __c41, 2)),
          FailoverState: S.optional(__S(331, __c41, 3)),
          TagList: S.optional(__S(145, __c18, 1)),
        }),
      ).annotate({ identifier: "GlobalCluster" });
  }
}
function __c42(j: number): any {
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
        S.Struct({ DBCluster: S.optional(__S(239, __c29, 7)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBClusterResult" });
  }
}
function __c43(j: number): any {
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
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshot: S.optional(__S(200, __c25, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBClusterSnapshotResult" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBInstanceIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBInstanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(293, __c36, 5)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBInstanceResult" });
  }
}
function __c46(j: number): any {
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
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubscriptionName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(129, __c16, 1)) }).pipe(ns),
      ).annotate({ identifier: "DeleteEventSubscriptionResult" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GlobalClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGlobalClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalCluster: S.optional(__S(332, __c41, 4)) }).pipe(ns),
      ).annotate({ identifier: "DeleteGlobalClusterResult" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateIdentifier: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCertificatesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CertificateIdentifier: S.optional(S.String),
          CertificateType: S.optional(S.String),
          Thumbprint: S.optional(S.String),
          ValidFrom: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ValidTill: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CertificateArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Certificate" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(393, __c49, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Certificate"))
          .annotate({ identifier: "Certificate" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Certificates: S.optional(__S(394, __c49, 2)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CertificateMessage" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Value")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(400, __c50, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(401, __c50, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Filter"))
          .annotate({ identifier: "Filter" }),
      );
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterParameterGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(176, __c22, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterParameterGroup"))
          .annotate({ identifier: "DBClusterParameterGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusterParameterGroups: S.optional(__S(409, __c51, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterParameterGroupsMessage" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          Source: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Parameters: S.optional(__S(425, __c53, 1)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DBClusterParameterGroupDetails" });
  }
}
function __c53(j: number): any {
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
        /*@__PURE__*/ __S(424, __c53, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Parameter"))
          .annotate({ identifier: "Parameter" }),
      );
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClustersMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(239, __c29, 7)
          .pipe(/*@__PURE__*/ T.XmlName("DBCluster"))
          .annotate({ identifier: "DBCluster" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), DBClusters: S.optional(__S(433, __c54, 1)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DBClusterMessage" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDBClusterSnapshotAttributesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotAttributesResult: S.optional(__S(451, __c56, 3)) }).pipe(ns),
      ).annotate({ identifier: "DescribeDBClusterSnapshotAttributesResult" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AttributeValue")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          AttributeName: S.optional(S.String),
          AttributeValues: S.optional(__S(448, __c56, 0)),
        }),
      ).annotate({ identifier: "DBClusterSnapshotAttribute" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(449, __c56, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterSnapshotAttribute"))
          .annotate({ identifier: "DBClusterSnapshotAttribute" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          DBClusterSnapshotIdentifier: S.optional(S.String),
          DBClusterSnapshotAttributes: S.optional(__S(450, __c56, 2)),
        }),
      ).annotate({ identifier: "DBClusterSnapshotAttributesResult" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          DBClusterSnapshotIdentifier: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          IncludeShared: S.optional(S.Boolean),
          IncludePublic: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterSnapshotsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(200, __c25, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterSnapshot"))
          .annotate({ identifier: "DBClusterSnapshot" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusterSnapshots: S.optional(__S(457, __c57, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterSnapshotMessage" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
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
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Description: S.optional(S.String),
          AutoUpgrade: S.optional(S.Boolean),
          IsMajorVersionUpgrade: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpgradeTarget" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(465, __c58, 1)
          .pipe(/*@__PURE__*/ T.XmlName("UpgradeTarget"))
          .annotate({ identifier: "UpgradeTarget" }),
      );
    case 3:
      return S.Array(S.String);
    case 4:
      return S.suspend(() =>
        S.Struct({ MinCapacity: S.optional(S.Number), MaxCapacity: S.optional(S.Number) }),
      ).annotate({ identifier: "ServerlessV2FeaturesSupport" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          DBEngineDescription: S.optional(S.String),
          DBEngineVersionDescription: S.optional(S.String),
          ValidUpgradeTarget: S.optional(__S(466, __c58, 2)),
          ExportableLogTypes: S.optional(__S(216, __c27, 0)),
          SupportsLogExportsToCloudwatchLogs: S.optional(S.Boolean),
          SupportedCACertificateIdentifiers: S.optional(__S(467, __c58, 3)),
          SupportsCertificateRotationWithoutRestart: S.optional(S.Boolean),
          ServerlessV2FeaturesSupport: S.optional(__S(468, __c58, 4)),
        }),
      ).annotate({ identifier: "DBEngineVersion" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(469, __c58, 5)
          .pipe(/*@__PURE__*/ T.XmlName("DBEngineVersion"))
          .annotate({ identifier: "DBEngineVersion" }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBEngineVersions: S.optional(__S(470, __c58, 6)),
        }).pipe(ns),
      ).annotate({ identifier: "DBEngineVersionMessage" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBInstancesMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(293, __c36, 5)
          .pipe(/*@__PURE__*/ T.XmlName("DBInstance"))
          .annotate({ identifier: "DBInstance" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBInstances: S.optional(__S(473, __c59, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBInstanceMessage" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSubnetGroupName: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBSubnetGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(283, __c35, 3)
          .pipe(/*@__PURE__*/ T.XmlName("DBSubnetGroup"))
          .annotate({ identifier: "DBSubnetGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBSubnetGroups: S.optional(__S(481, __c60, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBSubnetGroupMessage" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupFamily: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEngineDefaultClusterParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupFamily: S.optional(S.String),
          Marker: S.optional(S.String),
          Parameters: S.optional(__S(425, __c53, 1)),
        }),
      ).annotate({ identifier: "EngineDefaults" });
    case 2:
      return S.suspend(() =>
        S.Struct({ EngineDefaults: S.optional(__S(489, __c61, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeEngineDefaultClusterParametersResult" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventCategoriesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.optional(S.String),
          EventCategories: S.optional(__S(120, __c15, 0)),
        }),
      ).annotate({ identifier: "EventCategoriesMap" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(497, __c62, 1)
          .pipe(/*@__PURE__*/ T.XmlName("EventCategoriesMap"))
          .annotate({ identifier: "EventCategoriesMap" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ EventCategoriesMapList: S.optional(__S(498, __c62, 2)) }).pipe(ns),
      ).annotate({ identifier: "EventCategoriesMessage" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceIdentifier: S.optional(S.String),
          SourceType: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Duration: S.optional(S.Number),
          EventCategories: S.optional(__S(120, __c15, 0)),
          Filters: S.optional(__S(402, __c50, 2)),
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
          EventCategories: S.optional(__S(120, __c15, 0)),
          Date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SourceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Event" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(505, __c63, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Event"))
          .annotate({ identifier: "Event" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), Events: S.optional(__S(506, __c63, 2)) }).pipe(ns),
      ).annotate({ identifier: "EventsMessage" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventSubscriptionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(129, __c16, 1)
          .pipe(/*@__PURE__*/ T.XmlName("EventSubscription"))
          .annotate({ identifier: "EventSubscription" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          EventSubscriptionsList: S.optional(__S(513, __c64, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "EventSubscriptionsMessage" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalClusterIdentifier: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeGlobalClustersMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(332, __c41, 4)
          .pipe(/*@__PURE__*/ T.XmlName("GlobalClusterMember"))
          .annotate({ identifier: "GlobalCluster" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          GlobalClusters: S.optional(__S(521, __c65, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GlobalClustersMessage" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          Vpc: S.optional(S.Boolean),
          Filters: S.optional(__S(402, __c50, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOrderableDBInstanceOptionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(272, __c34, 0)
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
          AvailabilityZones: S.optional(__S(529, __c66, 1)),
          Vpc: S.optional(S.Boolean),
          StorageType: S.optional(S.String),
        }),
      ).annotate({ identifier: "OrderableDBInstanceOption" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(530, __c66, 2)
          .pipe(/*@__PURE__*/ T.XmlName("OrderableDBInstanceOption"))
          .annotate({ identifier: "OrderableDBInstanceOption" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          OrderableDBInstanceOptions: S.optional(__S(531, __c66, 3)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "OrderableDBInstanceOptionsMessage" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePendingMaintenanceActionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(162, __c20, 2)
          .pipe(/*@__PURE__*/ T.XmlName("ResourcePendingMaintenanceActions"))
          .annotate({ identifier: "ResourcePendingMaintenanceActions" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          PendingMaintenanceActions: S.optional(__S(537, __c67, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PendingMaintenanceActionsMessage" });
  }
}
function __c68(j: number): any {
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
        S.Struct({ DBCluster: S.optional(__S(239, __c29, 7)) }).pipe(ns),
      ).annotate({ identifier: "FailoverDBClusterResult" });
  }
}
function __c69(j: number): any {
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
        S.Struct({ GlobalCluster: S.optional(__S(332, __c41, 4)) }).pipe(ns),
      ).annotate({ identifier: "FailoverGlobalClusterResult" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceName: S.optional(S.String),
          Filters: S.optional(__S(402, __c50, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TagList: S.optional(__S(145, __c18, 1)) }).pipe(ns),
      ).annotate({ identifier: "TagListMessage" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnableLogTypes: S.optional(__S(216, __c27, 0)),
          DisableLogTypes: S.optional(__S(216, __c27, 0)),
        }),
      ).annotate({ identifier: "CloudwatchLogsExportConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          NewDBClusterIdentifier: S.optional(S.String),
          ApplyImmediately: S.optional(S.Boolean),
          BackupRetentionPeriod: S.optional(S.Number),
          DBClusterParameterGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(240, __c30, 0)),
          Port: S.optional(S.Number),
          MasterUserPassword: S.optional(SensitiveString),
          PreferredBackupWindow: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          CloudwatchLogsExportConfiguration: S.optional(__S(568, __c71, 0)),
          EngineVersion: S.optional(S.String),
          AllowMajorVersionUpgrade: S.optional(S.Boolean),
          DeletionProtection: S.optional(S.Boolean),
          StorageType: S.optional(S.String),
          ServerlessV2ScalingConfiguration: S.optional(__S(241, __c30, 1)),
          ManageMasterUserPassword: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
          RotateMasterUserPassword: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBClusterMessage" });
    case 2:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(239, __c29, 7)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBClusterResult" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          Parameters: S.optional(__S(425, __c53, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBClusterParameterGroupMessage" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterParameterGroupName: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DBClusterParameterGroupNameMessage" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterSnapshotIdentifier: S.optional(S.String),
          AttributeName: S.optional(S.String),
          ValuesToAdd: S.optional(__S(448, __c56, 0)),
          ValuesToRemove: S.optional(__S(448, __c56, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBClusterSnapshotAttributeMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotAttributesResult: S.optional(__S(451, __c56, 3)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBClusterSnapshotAttributeResult" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          ApplyImmediately: S.optional(S.Boolean),
          PreferredMaintenanceWindow: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          NewDBInstanceIdentifier: S.optional(S.String),
          CACertificateIdentifier: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          PromotionTier: S.optional(S.Number),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          CertificateRotationRestart: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBInstanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(293, __c36, 5)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBInstanceResult" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
