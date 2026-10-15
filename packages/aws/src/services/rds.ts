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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "RDS", serviceShapeName: "AmazonRDSv19" });
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
export class BackupPolicyNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<BackupPolicyNotFoundFault>()(
    "BackupPolicyNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "BackupPolicyNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class BlueGreenDeploymentAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<BlueGreenDeploymentAlreadyExistsFault>()(
    "BlueGreenDeploymentAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "BlueGreenDeploymentAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class BlueGreenDeploymentNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<BlueGreenDeploymentNotFoundFault>()(
    "BlueGreenDeploymentNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "BlueGreenDeploymentNotFoundFault",
        httpResponseCode: 404,
      }),
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
export class CreateCustomDBEngineVersionFault
  extends /*@__PURE__*/ S.TaggedError<CreateCustomDBEngineVersionFault>()(
    "CreateCustomDBEngineVersionFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CreateCustomDBEngineVersionFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CustomAvailabilityZoneNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CustomAvailabilityZoneNotFoundFault>()(
    "CustomAvailabilityZoneNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CustomAvailabilityZoneNotFound",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CustomDBEngineVersionAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<CustomDBEngineVersionAlreadyExistsFault>()(
    "CustomDBEngineVersionAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CustomDBEngineVersionAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CustomDBEngineVersionNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CustomDBEngineVersionNotFoundFault>()(
    "CustomDBEngineVersionNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CustomDBEngineVersionNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CustomDBEngineVersionQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<CustomDBEngineVersionQuotaExceededFault>()(
    "CustomDBEngineVersionQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "CustomDBEngineVersionQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
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
  ).pipe(C.withBadRequestError, C.withConflictError, C.withAlreadyExistsError) {}
export class DBClusterAutomatedBackupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterAutomatedBackupNotFoundFault>()(
    "DBClusterAutomatedBackupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBClusterAutomatedBackupNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBClusterAutomatedBackupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterAutomatedBackupQuotaExceededFault>()(
    "DBClusterAutomatedBackupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBClusterAutomatedBackupQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBClusterBacktrackNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterBacktrackNotFoundFault>()(
    "DBClusterBacktrackNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBClusterBacktrackNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
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
  ).pipe(C.withBadRequestError, C.withNotFoundError) {}
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
  ).pipe(C.withAuthError, C.withQuotaError) {}
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
export class DBInstanceAutomatedBackupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBInstanceAutomatedBackupNotFoundFault>()(
    "DBInstanceAutomatedBackupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBInstanceAutomatedBackupNotFound",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBInstanceAutomatedBackupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBInstanceAutomatedBackupQuotaExceededFault>()(
    "DBInstanceAutomatedBackupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBInstanceAutomatedBackupQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBInstanceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBInstanceNotFoundFault>()(
    "DBInstanceNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBInstanceNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBInstanceNotReadyFault
  extends /*@__PURE__*/ S.TaggedError<DBInstanceNotReadyFault>()(
    "DBInstanceNotReadyFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBInstanceNotReady", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBInstanceRoleAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBInstanceRoleAlreadyExistsFault>()(
    "DBInstanceRoleAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBInstanceRoleAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBInstanceRoleNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBInstanceRoleNotFoundFault>()(
    "DBInstanceRoleNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBInstanceRoleNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBInstanceRoleQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBInstanceRoleQuotaExceededFault>()(
    "DBInstanceRoleQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBInstanceRoleQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBLogFileNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBLogFileNotFoundFault>()(
    "DBLogFileNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBLogFileNotFoundFault", httpResponseCode: 404 }),
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
  ).pipe(C.withBadRequestError, C.withNotFoundError) {}
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
export class DBProxyAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBProxyAlreadyExistsFault>()(
    "DBProxyAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBProxyAlreadyExistsFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBProxyEndpointAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBProxyEndpointAlreadyExistsFault>()(
    "DBProxyEndpointAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBProxyEndpointAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBProxyEndpointNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBProxyEndpointNotFoundFault>()(
    "DBProxyEndpointNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBProxyEndpointNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBProxyEndpointQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBProxyEndpointQuotaExceededFault>()(
    "DBProxyEndpointQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBProxyEndpointQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBProxyNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBProxyNotFoundFault>()(
    "DBProxyNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBProxyNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBProxyQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBProxyQuotaExceededFault>()(
    "DBProxyQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBProxyQuotaExceededFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBProxyTargetAlreadyRegisteredFault
  extends /*@__PURE__*/ S.TaggedError<DBProxyTargetAlreadyRegisteredFault>()(
    "DBProxyTargetAlreadyRegisteredFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBProxyTargetAlreadyRegisteredFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBProxyTargetGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBProxyTargetGroupNotFoundFault>()(
    "DBProxyTargetGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBProxyTargetGroupNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBProxyTargetNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBProxyTargetNotFoundFault>()(
    "DBProxyTargetNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBProxyTargetNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSecurityGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBSecurityGroupAlreadyExistsFault>()(
    "DBSecurityGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBSecurityGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBSecurityGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBSecurityGroupNotFoundFault>()(
    "DBSecurityGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBSecurityGroupNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError, C.withNotFoundError) {}
export class DBSecurityGroupNotSupportedFault
  extends /*@__PURE__*/ S.TaggedError<DBSecurityGroupNotSupportedFault>()(
    "DBSecurityGroupNotSupportedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBSecurityGroupNotSupported", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSecurityGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBSecurityGroupQuotaExceededFault>()(
    "DBSecurityGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "QuotaExceeded.DBSecurityGroup",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBShardGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBShardGroupAlreadyExistsFault>()(
    "DBShardGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBShardGroupAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBShardGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBShardGroupNotFoundFault>()(
    "DBShardGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBShardGroupNotFound", httpResponseCode: 404 }),
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
export class DBSnapshotTenantDatabaseNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBSnapshotTenantDatabaseNotFoundFault>()(
    "DBSnapshotTenantDatabaseNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBSnapshotTenantDatabaseNotFoundFault",
        httpResponseCode: 404,
      }),
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
export class DBSubnetGroupNotAllowedFault
  extends /*@__PURE__*/ S.TaggedError<DBSubnetGroupNotAllowedFault>()(
    "DBSubnetGroupNotAllowedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "DBSubnetGroupNotAllowedFault",
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
  ).pipe(C.withBadRequestError, C.withNotFoundError) {}
export class DBSubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBSubnetGroupQuotaExceededFault>()(
    "DBSubnetGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DBSubnetGroupQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withQuotaError) {}
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
export class Ec2ImagePropertiesNotSupportedFault
  extends /*@__PURE__*/ S.TaggedError<Ec2ImagePropertiesNotSupportedFault>()(
    "Ec2ImagePropertiesNotSupportedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "Ec2ImagePropertiesNotSupportedFault",
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
export class ExportTaskAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ExportTaskAlreadyExistsFault>()(
    "ExportTaskAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ExportTaskAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ExportTaskNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ExportTaskNotFoundFault>()(
    "ExportTaskNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ExportTaskNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
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
export class IamRoleMissingPermissionsFault
  extends /*@__PURE__*/ S.TaggedError<IamRoleMissingPermissionsFault>()(
    "IamRoleMissingPermissionsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "IamRoleMissingPermissions", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IamRoleNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<IamRoleNotFoundFault>()(
    "IamRoleNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "IamRoleNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
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
export class InsufficientAvailableIPsInSubnetFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientAvailableIPsInSubnetFault>()(
    "InsufficientAvailableIPsInSubnetFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InsufficientAvailableIPsInSubnetFault",
        httpResponseCode: 400,
      }),
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
  ).pipe(C.withAuthError, C.withQuotaError) {}
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
export class InvalidBlueGreenDeploymentStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidBlueGreenDeploymentStateFault>()(
    "InvalidBlueGreenDeploymentStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidBlueGreenDeploymentStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCustomDBEngineVersionStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidCustomDBEngineVersionStateFault>()(
    "InvalidCustomDBEngineVersionStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidCustomDBEngineVersionStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBClusterAutomatedBackupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBClusterAutomatedBackupStateFault>()(
    "InvalidDBClusterAutomatedBackupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidDBClusterAutomatedBackupStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBClusterCapacityFault>()(
    "InvalidDBClusterCapacityFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidDBClusterCapacityFault",
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
  ).pipe(C.withBadRequestError, C.withConflictError, C.withRetryableError) {}
export class InvalidDBInstanceAutomatedBackupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBInstanceAutomatedBackupStateFault>()(
    "InvalidDBInstanceAutomatedBackupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidDBInstanceAutomatedBackupState",
        httpResponseCode: 400,
      }),
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
export class InvalidDBProxyEndpointStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBProxyEndpointStateFault>()(
    "InvalidDBProxyEndpointStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidDBProxyEndpointStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBProxyStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBProxyStateFault>()(
    "InvalidDBProxyStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDBProxyStateFault", httpResponseCode: 400 }),
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
export class InvalidDBShardGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBShardGroupStateFault>()(
    "InvalidDBShardGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDBShardGroupState", httpResponseCode: 400 }),
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
export class InvalidDBSubnetGroupFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBSubnetGroupFault>()(
    "InvalidDBSubnetGroupFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDBSubnetGroupFault", httpResponseCode: 400 }),
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
export class InvalidExportOnlyFault
  extends /*@__PURE__*/ S.TaggedError<InvalidExportOnlyFault>()(
    "InvalidExportOnlyFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidExportOnly", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidExportSourceStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidExportSourceStateFault>()(
    "InvalidExportSourceStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidExportSourceState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidExportTaskStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidExportTaskStateFault>()(
    "InvalidExportTaskStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidExportTaskStateFault", httpResponseCode: 400 }),
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
export class InvalidIntegrationStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidIntegrationStateFault>()(
    "InvalidIntegrationStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidIntegrationStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidOptionGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidOptionGroupStateFault>()(
    "InvalidOptionGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidOptionGroupStateFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombination
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombination>()(
    "InvalidParameterCombination",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValue
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValue>()("InvalidParameterValue", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidResourceStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceStateFault>()(
    "InvalidResourceStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidResourceStateFault", httpResponseCode: 400 }),
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
export class InvalidS3BucketFault
  extends /*@__PURE__*/ S.TaggedError<InvalidS3BucketFault>()(
    "InvalidS3BucketFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidS3BucketFault", httpResponseCode: 400 }),
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
export class MaxDBShardGroupLimitReached
  extends /*@__PURE__*/ S.TaggedError<MaxDBShardGroupLimitReached>()(
    "MaxDBShardGroupLimitReached",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "MaxDBShardGroupLimitReached", httpResponseCode: 400 }),
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
export class OptionGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<OptionGroupAlreadyExistsFault>()(
    "OptionGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "OptionGroupAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class OptionGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<OptionGroupNotFoundFault>()(
    "OptionGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "OptionGroupNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class OptionGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<OptionGroupQuotaExceededFault>()(
    "OptionGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "OptionGroupQuotaExceededFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PointInTimeRestoreNotEnabledFault
  extends /*@__PURE__*/ S.TaggedError<PointInTimeRestoreNotEnabledFault>()(
    "PointInTimeRestoreNotEnabledFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "PointInTimeRestoreNotEnabled",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
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
  ).pipe(C.withBadRequestError, C.withQuotaError) {}
export class ReservedDBInstanceAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ReservedDBInstanceAlreadyExistsFault>()(
    "ReservedDBInstanceAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReservedDBInstanceAlreadyExists",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ReservedDBInstanceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedDBInstanceNotFoundFault>()(
    "ReservedDBInstanceNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ReservedDBInstanceNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedDBInstanceQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ReservedDBInstanceQuotaExceededFault>()(
    "ReservedDBInstanceQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReservedDBInstanceQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedDBInstancesOfferingNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedDBInstancesOfferingNotFoundFault>()(
    "ReservedDBInstancesOfferingNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReservedDBInstancesOfferingNotFound",
        httpResponseCode: 404,
      }),
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
export class SourceClusterNotSupportedFault
  extends /*@__PURE__*/ S.TaggedError<SourceClusterNotSupportedFault>()(
    "SourceClusterNotSupportedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SourceClusterNotSupportedFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SourceDatabaseNotSupportedFault
  extends /*@__PURE__*/ S.TaggedError<SourceDatabaseNotSupportedFault>()(
    "SourceDatabaseNotSupportedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "SourceDatabaseNotSupportedFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
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
export class StorageTypeNotAvailableFault
  extends /*@__PURE__*/ S.TaggedError<StorageTypeNotAvailableFault>()(
    "StorageTypeNotAvailableFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "StorageTypeNotAvailableFault",
        httpResponseCode: 400,
      }),
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
export class TenantDatabaseAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<TenantDatabaseAlreadyExistsFault>()(
    "TenantDatabaseAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TenantDatabaseAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class TenantDatabaseNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<TenantDatabaseNotFoundFault>()(
    "TenantDatabaseNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TenantDatabaseNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TenantDatabaseQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<TenantDatabaseQuotaExceededFault>()(
    "TenantDatabaseQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TenantDatabaseQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedDBEngineVersionFault
  extends /*@__PURE__*/ S.TaggedError<UnsupportedDBEngineVersionFault>()(
    "UnsupportedDBEngineVersionFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UnsupportedDBEngineVersion", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class VpcEncryptionControlViolationException
  extends /*@__PURE__*/ S.TaggedError<VpcEncryptionControlViolationException>()(
    "VpcEncryptionControlViolationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "VpcEncryptionControlViolationException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type IAMRoleArn = string;
export interface AddRoleToDBClusterMessage {
  DBClusterIdentifier?: string;
  RoleArn?: string;
  FeatureName?: string;
}
export interface AddRoleToDBClusterResponse {}
export interface AddRoleToDBInstanceMessage {
  DBInstanceIdentifier?: string;
  RoleArn?: string;
  FeatureName?: string;
}
export interface AddRoleToDBInstanceResponse {}
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
export interface AuthorizeDBSecurityGroupIngressMessage {
  DBSecurityGroupName?: string;
  CIDRIP?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupId?: string;
  EC2SecurityGroupOwnerId?: string;
}
export interface EC2SecurityGroup {
  Status?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupId?: string;
  EC2SecurityGroupOwnerId?: string;
}
export type EC2SecurityGroupList = EC2SecurityGroup[];
export interface IPRange {
  Status?: string;
  CIDRIP?: string;
}
export type IPRangeList = IPRange[];
export interface DBSecurityGroup {
  OwnerId?: string;
  DBSecurityGroupName?: string;
  DBSecurityGroupDescription?: string;
  VpcId?: string;
  EC2SecurityGroups?: EC2SecurityGroup[];
  IPRanges?: IPRange[];
  DBSecurityGroupArn?: string;
}
export interface AuthorizeDBSecurityGroupIngressResult {
  DBSecurityGroup?: DBSecurityGroup;
}
export interface BacktrackDBClusterMessage {
  DBClusterIdentifier?: string;
  BacktrackTo?: Date;
  Force?: boolean;
  UseEarliestTimeOnPointInTimeUnavailable?: boolean;
}
export interface DBClusterBacktrack {
  DBClusterIdentifier?: string;
  BacktrackIdentifier?: string;
  BacktrackTo?: Date;
  BacktrackedFrom?: Date;
  BacktrackRequestCreationTime?: Date;
  Status?: string;
}
export interface CancelExportTaskMessage {
  ExportTaskIdentifier?: string;
}
export type StringList = string[];
export type ExportSourceType = "SNAPSHOT" | "CLUSTER" | (string & {});
export interface ExportTask {
  ExportTaskIdentifier?: string;
  SourceArn?: string;
  ExportOnly?: string[];
  SnapshotTime?: Date;
  TaskStartTime?: Date;
  TaskEndTime?: Date;
  S3Bucket?: string;
  S3Prefix?: string;
  IamRoleArn?: string;
  KmsKeyId?: string;
  Status?: string;
  PercentProgress?: number;
  TotalExtractedDataInGB?: number;
  FailureCause?: string;
  WarningMessage?: string;
  SourceType?: ExportSourceType;
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
export type SensitiveString = string | redacted.Redacted<string>;
export interface CopyDBClusterSnapshotMessage {
  SourceDBClusterSnapshotIdentifier?: string;
  TargetDBClusterSnapshotIdentifier?: string;
  KmsKeyId?: string;
  PreSignedUrl?: string | redacted.Redacted<string>;
  CopyTags?: boolean;
  Tags?: Tag[];
}
export type AvailabilityZones = string[];
export type StorageEncryptionType = "none" | "sse-kms" | "sse-rds" | (string & {});
export interface DBClusterSnapshot {
  AvailabilityZones?: string[];
  DBClusterSnapshotIdentifier?: string;
  DBClusterIdentifier?: string;
  SnapshotCreateTime?: Date;
  Engine?: string;
  EngineMode?: string;
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
  StorageEncryptionType?: StorageEncryptionType;
  BackupRetentionPeriod?: number;
  PreferredBackupWindow?: string;
  KmsKeyId?: string;
  DBClusterSnapshotArn?: string;
  SourceDBClusterSnapshotArn?: string;
  IAMDatabaseAuthenticationEnabled?: boolean;
  TagList?: Tag[];
  StorageType?: string;
  StorageThroughput?: number;
  DbClusterResourceId?: string;
  DBSystemId?: string;
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
export interface CopyDBSnapshotMessage {
  SourceDBSnapshotIdentifier?: string;
  TargetDBSnapshotIdentifier?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
  CopyTags?: boolean;
  PreSignedUrl?: string | redacted.Redacted<string>;
  OptionGroupName?: string;
  TargetCustomAvailabilityZone?: string;
  SnapshotTarget?: string;
  CopyOptionGroup?: boolean;
  SnapshotAvailabilityZone?: string;
}
export interface ProcessorFeature {
  Name?: string;
  Value?: string;
}
export type ProcessorFeatureList = ProcessorFeature[];
export interface AdditionalStorageVolume {
  VolumeName?: string;
  AllocatedStorage?: number;
  IOPS?: number;
  MaxAllocatedStorage?: number;
  StorageThroughput?: number;
  StorageType?: string;
}
export type AdditionalStorageVolumesList = AdditionalStorageVolume[];
export interface DBSnapshot {
  DBSnapshotIdentifier?: string;
  DBInstanceIdentifier?: string;
  SnapshotCreateTime?: Date;
  Engine?: string;
  AllocatedStorage?: number;
  Status?: string;
  Port?: number;
  AvailabilityZone?: string;
  VpcId?: string;
  InstanceCreateTime?: Date;
  MasterUsername?: string;
  EngineVersion?: string;
  LicenseModel?: string;
  SnapshotType?: string;
  Iops?: number;
  StorageThroughput?: number;
  OptionGroupName?: string;
  PercentProgress?: number;
  SourceRegion?: string;
  SourceDBSnapshotIdentifier?: string;
  StorageType?: string;
  TdeCredentialArn?: string;
  Encrypted?: boolean;
  StorageEncryptionType?: StorageEncryptionType;
  BackupRetentionPeriod?: number;
  PreferredBackupWindow?: string;
  KmsKeyId?: string;
  DBSnapshotArn?: string;
  Timezone?: string;
  IAMDatabaseAuthenticationEnabled?: boolean;
  ProcessorFeatures?: ProcessorFeature[];
  DbiResourceId?: string;
  TagList?: Tag[];
  SnapshotTarget?: string;
  OriginalSnapshotCreateTime?: Date;
  SnapshotDatabaseTime?: Date;
  DBSystemId?: string;
  MultiTenant?: boolean;
  DedicatedLogVolume?: boolean;
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
  SnapshotAvailabilityZone?: string;
  FullSnapshotSizeInBytes?: number;
}
export interface CopyDBSnapshotResult {
  DBSnapshot?: DBSnapshot & {
    AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
  };
}
export interface CopyOptionGroupMessage {
  SourceOptionGroupIdentifier?: string;
  TargetOptionGroupIdentifier?: string;
  TargetOptionGroupDescription?: string;
  Tags?: Tag[];
}
export type PotentiallySensitiveOptionSettingValue = string | redacted.Redacted<string>;
export interface OptionSetting {
  Name?: string;
  Value?: string | redacted.Redacted<string>;
  DefaultValue?: string;
  Description?: string;
  ApplyType?: string;
  DataType?: string;
  AllowedValues?: string;
  IsModifiable?: boolean;
  IsCollection?: boolean;
}
export type OptionSettingConfigurationList = OptionSetting[];
export interface DBSecurityGroupMembership {
  DBSecurityGroupName?: string;
  Status?: string;
}
export type DBSecurityGroupMembershipList = DBSecurityGroupMembership[];
export interface VpcSecurityGroupMembership {
  VpcSecurityGroupId?: string;
  Status?: string;
}
export type VpcSecurityGroupMembershipList = VpcSecurityGroupMembership[];
export interface Option {
  OptionName?: string;
  OptionDescription?: string;
  Persistent?: boolean;
  Permanent?: boolean;
  Port?: number;
  OptionVersion?: string;
  OptionSettings?: OptionSetting[];
  DBSecurityGroupMemberships?: DBSecurityGroupMembership[];
  VpcSecurityGroupMemberships?: VpcSecurityGroupMembership[];
}
export type OptionsList = Option[];
export interface OptionGroup {
  OptionGroupName?: string;
  OptionGroupDescription?: string;
  EngineName?: string;
  MajorEngineVersion?: string;
  Options?: Option[];
  AllowsVpcAndNonVpcInstanceMemberships?: boolean;
  VpcId?: string;
  OptionGroupArn?: string;
  SourceOptionGroup?: string;
  SourceAccountId?: string;
  CopyTimestamp?: Date;
}
export interface CopyOptionGroupResult {
  OptionGroup?: OptionGroup;
}
export type BlueGreenDeploymentName = string;
export type DatabaseArn = string;
export type TargetEngineVersion = string;
export type TargetDBParameterGroupName = string;
export type TargetDBClusterParameterGroupName = string;
export type TargetDBInstanceClass = string;
export type TargetStorageType = string;
export type DBAndClusterArn = string;
export type KmsKeyIdOrArn = string;
export interface TargetResourceConfiguration {
  SourceArn: string;
  TargetKmsKeyId?: string;
}
export type TargetResourceConfigurationList = TargetResourceConfiguration[];
export interface CreateBlueGreenDeploymentRequest {
  BlueGreenDeploymentName?: string;
  Source?: string;
  TargetEngineVersion?: string;
  TargetDBParameterGroupName?: string;
  TargetDBClusterParameterGroupName?: string;
  Tags?: Tag[];
  TargetDBInstanceClass?: string;
  UpgradeTargetStorageConfig?: boolean;
  TargetIops?: number;
  TargetStorageType?: string;
  TargetAllocatedStorage?: number;
  TargetStorageThroughput?: number;
  TargetResourceConfigurations?: TargetResourceConfiguration[];
}
export type BlueGreenDeploymentIdentifier = string;
export type SwitchoverDetailStatus = string;
export interface SwitchoverDetail {
  SourceMember?: string;
  TargetMember?: string;
  Status?: string;
}
export type SwitchoverDetailList = SwitchoverDetail[];
export type BlueGreenDeploymentTaskName = string;
export type BlueGreenDeploymentTaskStatus = string;
export interface BlueGreenDeploymentTask {
  Name?: string;
  Status?: string;
}
export type BlueGreenDeploymentTaskList = BlueGreenDeploymentTask[];
export type BlueGreenDeploymentStatus = string;
export type BlueGreenDeploymentStatusDetails = string;
export interface BlueGreenDeployment {
  BlueGreenDeploymentIdentifier?: string;
  BlueGreenDeploymentName?: string;
  Source?: string;
  Target?: string;
  SwitchoverDetails?: SwitchoverDetail[];
  Tasks?: BlueGreenDeploymentTask[];
  Status?: string;
  StatusDetails?: string;
  CreateTime?: Date;
  DeleteTime?: Date;
  TagList?: Tag[];
}
export interface CreateBlueGreenDeploymentResponse {
  BlueGreenDeployment?: BlueGreenDeployment;
}
export type CustomEngineName = string;
export type CustomEngineVersion = string;
export type BucketName = string;
export type String255 = string;
export type Description = string;
export type CustomDBEngineVersionManifest = string;
export interface CreateCustomDBEngineVersionMessage {
  Engine?: string;
  EngineVersion?: string;
  DatabaseInstallationFilesS3BucketName?: string;
  DatabaseInstallationFilesS3Prefix?: string;
  DatabaseInstallationFiles?: string[];
  ImageId?: string;
  KMSKeyId?: string;
  SourceCustomDbEngineVersionIdentifier?: string;
  UseAwsProvidedLatestImage?: boolean;
  Description?: string;
  Manifest?: string;
  Tags?: Tag[];
}
export interface CharacterSet {
  CharacterSetName?: string;
  CharacterSetDescription?: string;
}
export interface CustomDBEngineVersionAMI {
  ImageId?: string;
  Status?: string;
}
export type SupportedCharacterSetsList = CharacterSet[];
export type EngineModeList = string[];
export interface UpgradeTarget {
  Engine?: string;
  EngineVersion?: string;
  Description?: string;
  AutoUpgrade?: boolean;
  IsMajorVersionUpgrade?: boolean;
  SupportedEngineModes?: string[];
  SupportsParallelQuery?: boolean;
  SupportsGlobalDatabases?: boolean;
  SupportsBabelfish?: boolean;
  SupportsLimitlessDatabase?: boolean;
  SupportsLocalWriteForwarding?: boolean;
  SupportsIntegrations?: boolean;
}
export type ValidUpgradeTargetList = UpgradeTarget[];
export interface Timezone {
  TimezoneName?: string;
}
export type SupportedTimezonesList = Timezone[];
export type LogTypeList = string[];
export type FeatureNameList = string[];
export type CACertificateIdentifiersList = string[];
export interface ServerlessV2FeaturesSupport {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export interface DBEngineVersion {
  Engine?: string;
  MajorEngineVersion?: string;
  EngineVersion?: string;
  DatabaseInstallationFilesS3BucketName?: string;
  DatabaseInstallationFilesS3Prefix?: string;
  DatabaseInstallationFiles?: string[];
  CustomDBEngineVersionManifest?: string;
  DBParameterGroupFamily?: string;
  DBEngineDescription?: string;
  DBEngineVersionArn?: string;
  DBEngineVersionDescription?: string;
  DefaultCharacterSet?: CharacterSet;
  FailureReason?: string;
  Image?: CustomDBEngineVersionAMI;
  DBEngineMediaType?: string;
  KMSKeyId?: string;
  CreateTime?: Date;
  SupportedCharacterSets?: CharacterSet[];
  SupportedNcharCharacterSets?: CharacterSet[];
  ValidUpgradeTarget?: UpgradeTarget[];
  SupportedTimezones?: Timezone[];
  ExportableLogTypes?: string[];
  SupportsLogExportsToCloudwatchLogs?: boolean;
  SupportsReadReplica?: boolean;
  SupportedEngineModes?: string[];
  SupportedFeatureNames?: string[];
  Status?: string;
  SupportsParallelQuery?: boolean;
  SupportsGlobalDatabases?: boolean;
  TagList?: Tag[];
  SupportsBabelfish?: boolean;
  SupportsLimitlessDatabase?: boolean;
  SupportsCertificateRotationWithoutRestart?: boolean;
  SupportedCACertificateIdentifiers?: string[];
  SupportsLocalWriteForwarding?: boolean;
  SupportsIntegrations?: boolean;
  ServerlessV2FeaturesSupport?: ServerlessV2FeaturesSupport;
}
export type VpcSecurityGroupIdList = string[];
export interface ScalingConfiguration {
  MinCapacity?: number;
  MaxCapacity?: number;
  AutoPause?: boolean;
  SecondsUntilAutoPause?: number;
  TimeoutAction?: string;
  SecondsBeforeTimeout?: number;
}
export type ReplicaMode = "open-read-only" | "mounted" | (string & {});
export interface RdsCustomClusterConfiguration {
  InterconnectSubnetId?: string;
  TransitGatewayMulticastDomainId?: string;
  ReplicaMode?: ReplicaMode;
}
export type GlobalClusterIdentifier = string;
export interface ServerlessV2ScalingConfiguration {
  MinCapacity?: number;
  MaxCapacity?: number;
  SecondsUntilAutoPause?: number;
}
export type DatabaseInsightsMode = "standard" | "advanced" | (string & {});
export type ClusterScalabilityType = "standard" | "limitless" | (string & {});
export interface TagSpecification {
  ResourceType?: string;
  Tags?: Tag[];
}
export type TagSpecificationList = TagSpecification[];
export type MasterUserAuthenticationType = "password" | "iam-db-auth" | (string & {});
export interface DBClusterAssociatedRole {
  RoleArn: string;
  FeatureName?: string;
}
export type DBClusterAssociatedRoles = DBClusterAssociatedRole[];
export interface CreateDBClusterMessage {
  AvailabilityZones?: string[];
  BackupRetentionPeriod?: number;
  CharacterSetName?: string;
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
  PreSignedUrl?: string | redacted.Redacted<string>;
  EnableIAMDatabaseAuthentication?: boolean;
  BacktrackWindow?: number;
  EnableCloudwatchLogsExports?: string[];
  EngineMode?: string;
  ScalingConfiguration?: ScalingConfiguration;
  RdsCustomClusterConfiguration?: RdsCustomClusterConfiguration;
  DBClusterInstanceClass?: string;
  AllocatedStorage?: number;
  StorageType?: string;
  Iops?: number;
  PubliclyAccessible?: boolean;
  AutoMinorVersionUpgrade?: boolean;
  DeletionProtection?: boolean;
  GlobalClusterIdentifier?: string;
  EnableHttpEndpoint?: boolean;
  CopyTagsToSnapshot?: boolean;
  Domain?: string;
  DomainIAMRoleName?: string;
  EnableGlobalWriteForwarding?: boolean;
  NetworkType?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  MonitoringInterval?: number;
  MonitoringRoleArn?: string;
  DatabaseInsightsMode?: DatabaseInsightsMode;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  EnableLimitlessDatabase?: boolean;
  ClusterScalabilityType?: ClusterScalabilityType;
  DBSystemId?: string;
  ManageMasterUserPassword?: boolean;
  EnableLocalWriteForwarding?: boolean;
  MasterUserSecretKmsKeyId?: string;
  CACertificateIdentifier?: string;
  EngineLifecycleSupport?: string;
  TagSpecifications?: TagSpecification[];
  MasterUserAuthenticationType?: MasterUserAuthenticationType;
  WithExpressConfiguration?: boolean;
  AssociatedRoles?: DBClusterAssociatedRole[];
}
export interface DBClusterOptionGroupStatus {
  DBClusterOptionGroupName?: string;
  Status?: string;
}
export type DBClusterOptionGroupMemberships = DBClusterOptionGroupStatus[];
export type UpgradeRolloutOrder = "first" | "second" | "last" | (string & {});
export type ReadReplicaIdentifierList = string[];
export interface DBClusterStatusInfo {
  StatusType?: string;
  Normal?: boolean;
  Status?: string;
  Message?: string;
}
export type DBClusterStatusInfoList = DBClusterStatusInfo[];
export interface DBClusterMember {
  DBInstanceIdentifier?: string;
  IsClusterWriter?: boolean;
  DBClusterParameterGroupStatus?: string;
  PromotionTier?: number;
}
export type DBClusterMemberList = DBClusterMember[];
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
export interface CertificateDetails {
  CAIdentifier?: string;
  ValidTill?: Date;
}
export interface ClusterPendingModifiedValues {
  PendingCloudwatchLogsExports?: PendingCloudwatchLogsExports;
  DBClusterIdentifier?: string;
  MasterUserPassword?: string | redacted.Redacted<string>;
  IAMDatabaseAuthenticationEnabled?: boolean;
  EngineVersion?: string;
  BackupRetentionPeriod?: number;
  StorageType?: string;
  AllocatedStorage?: number;
  RdsCustomClusterConfiguration?: RdsCustomClusterConfiguration;
  Iops?: number;
  CertificateDetails?: CertificateDetails;
}
export interface ScalingConfigurationInfo {
  MinCapacity?: number;
  MaxCapacity?: number;
  AutoPause?: boolean;
  SecondsUntilAutoPause?: number;
  TimeoutAction?: string;
  SecondsBeforeTimeout?: number;
}
export type ActivityStreamMode = "sync" | "async" | (string & {});
export type ActivityStreamStatus = "stopped" | "starting" | "started" | "stopping" | (string & {});
export interface DomainMembership {
  Domain?: string;
  Status?: string;
  FQDN?: string;
  IAMRoleName?: string;
  OU?: string;
  AuthSecretArn?: string;
  DnsIps?: string[];
}
export type DomainMembershipList = DomainMembership[];
export type WriteForwardingStatus =
  | "enabled"
  | "disabled"
  | "enabling"
  | "disabling"
  | "unknown"
  | (string & {});
export interface ServerlessV2ScalingConfigurationInfo {
  MinCapacity?: number;
  MaxCapacity?: number;
  SecondsUntilAutoPause?: number;
}
export interface MasterUserSecret {
  SecretArn?: string;
  SecretStatus?: string;
  KmsKeyId?: string;
}
export type LocalWriteForwardingStatus =
  | "enabled"
  | "disabled"
  | "enabling"
  | "disabling"
  | "requested"
  | (string & {});
export type LimitlessDatabaseStatus =
  | "active"
  | "not-in-use"
  | "enabled"
  | "disabled"
  | "enabling"
  | "disabling"
  | "modifying-max-capacity"
  | "error"
  | (string & {});
export interface LimitlessDatabase {
  Status?: LimitlessDatabaseStatus;
  MinRequiredACU?: number;
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
  CustomEndpoints?: string[];
  MultiAZ?: boolean;
  Engine?: string;
  EngineVersion?: string;
  LatestRestorableTime?: Date;
  Port?: number;
  MasterUsername?: string;
  DBClusterOptionGroupMemberships?: DBClusterOptionGroupStatus[];
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  UpgradeRolloutOrder?: UpgradeRolloutOrder;
  ReplicationSourceIdentifier?: string;
  ReadReplicaIdentifiers?: string[];
  StatusInfos?: DBClusterStatusInfo[];
  DBClusterMembers?: DBClusterMember[];
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  HostedZoneId?: string;
  StorageEncrypted?: boolean;
  StorageEncryptionType?: StorageEncryptionType;
  KmsKeyId?: string;
  DbClusterResourceId?: string;
  DBClusterArn?: string;
  AssociatedRoles?: DBClusterRole[];
  IAMDatabaseAuthenticationEnabled?: boolean;
  CloneGroupId?: string;
  ClusterCreateTime?: Date;
  EarliestBacktrackTime?: Date;
  BacktrackWindow?: number;
  BacktrackConsumedChangeRecords?: number;
  EnabledCloudwatchLogsExports?: string[];
  Capacity?: number;
  PendingModifiedValues?: ClusterPendingModifiedValues;
  EngineMode?: string;
  ScalingConfigurationInfo?: ScalingConfigurationInfo;
  RdsCustomClusterConfiguration?: RdsCustomClusterConfiguration;
  DBClusterInstanceClass?: string;
  StorageType?: string;
  Iops?: number;
  StorageThroughput?: number;
  IOOptimizedNextAllowedModificationTime?: Date;
  PubliclyAccessible?: boolean;
  AutoMinorVersionUpgrade?: boolean;
  DeletionProtection?: boolean;
  HttpEndpointEnabled?: boolean;
  ActivityStreamMode?: ActivityStreamMode;
  ActivityStreamStatus?: ActivityStreamStatus;
  ActivityStreamKmsKeyId?: string;
  ActivityStreamKinesisStreamName?: string;
  CopyTagsToSnapshot?: boolean;
  CrossAccountClone?: boolean;
  DomainMemberships?: DomainMembership[];
  TagList?: Tag[];
  GlobalClusterIdentifier?: string;
  GlobalWriteForwardingStatus?: WriteForwardingStatus;
  GlobalWriteForwardingRequested?: boolean;
  NetworkType?: string;
  AutomaticRestartTime?: Date;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfigurationInfo;
  ServerlessV2PlatformVersion?: string;
  MonitoringInterval?: number;
  MonitoringRoleArn?: string;
  DatabaseInsightsMode?: DatabaseInsightsMode;
  PerformanceInsightsEnabled?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  DBSystemId?: string;
  MasterUserSecret?: MasterUserSecret;
  LocalWriteForwardingStatus?: LocalWriteForwardingStatus;
  AwsBackupRecoveryPointArn?: string;
  LimitlessDatabase?: LimitlessDatabase;
  ClusterScalabilityType?: ClusterScalabilityType;
  CertificateDetails?: CertificateDetails;
  EngineLifecycleSupport?: string;
  VPCNetworkingEnabled?: boolean;
  InternetAccessGatewayEnabled?: boolean;
}
export interface CreateDBClusterResult {
  DBCluster?: DBCluster;
}
export interface CreateDBClusterEndpointMessage {
  DBClusterIdentifier?: string;
  DBClusterEndpointIdentifier?: string;
  EndpointType?: string;
  StaticMembers?: string[];
  ExcludedMembers?: string[];
  Tags?: Tag[];
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
  StorageThroughput?: number;
  OptionGroupName?: string;
  CharacterSetName?: string;
  NcharCharacterSetName?: string;
  PubliclyAccessible?: boolean;
  Tags?: Tag[];
  DBClusterIdentifier?: string;
  StorageType?: string;
  TdeCredentialArn?: string;
  TdeCredentialPassword?: string | redacted.Redacted<string>;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  Domain?: string;
  DomainFqdn?: string;
  DomainOu?: string;
  DomainAuthSecretArn?: string;
  DomainDnsIps?: string[];
  CopyTagsToSnapshot?: boolean;
  MonitoringInterval?: number;
  MonitoringRoleArn?: string;
  DomainIAMRoleName?: string;
  PromotionTier?: number;
  Timezone?: string;
  EnableIAMDatabaseAuthentication?: boolean;
  DatabaseInsightsMode?: DatabaseInsightsMode;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  EnableCloudwatchLogsExports?: string[];
  ProcessorFeatures?: ProcessorFeature[];
  DeletionProtection?: boolean;
  MaxAllocatedStorage?: number;
  EnableCustomerOwnedIp?: boolean;
  NetworkType?: string;
  BackupTarget?: string;
  CustomIamInstanceProfile?: string;
  DBSystemId?: string;
  CACertificateIdentifier?: string;
  ManageMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
  MultiTenant?: boolean;
  DedicatedLogVolume?: boolean;
  EngineLifecycleSupport?: string;
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
  TagSpecifications?: TagSpecification[];
  MasterUserAuthenticationType?: MasterUserAuthenticationType;
}
export interface Endpoint {
  Address?: string;
  Port?: number;
  HostedZoneId?: string;
}
const Endpoint = /*@__PURE__*/ __L.at(__c1, 0) as any as S.Schema<Endpoint>;
export interface DBParameterGroupStatus {
  DBParameterGroupName?: string;
  ParameterApplyStatus?: string;
}
export type DBParameterGroupStatusList = DBParameterGroupStatus[];
export interface AvailabilityZone {
  Name?: string;
}
export interface Outpost {
  Arn?: string;
}
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AvailabilityZone;
  SubnetOutpost?: Outpost;
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
export type AutomationMode = "full" | "all-paused" | (string & {});
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
  StorageThroughput?: number;
  DBInstanceIdentifier?: string;
  StorageType?: string;
  CACertificateIdentifier?: string;
  DBSubnetGroupName?: string;
  PendingCloudwatchLogsExports?: PendingCloudwatchLogsExports;
  ProcessorFeatures?: ProcessorFeature[];
  AutomationMode?: AutomationMode;
  ResumeFullAutomationModeTime?: Date;
  MultiTenant?: boolean;
  IAMDatabaseAuthenticationEnabled?: boolean;
  DedicatedLogVolume?: boolean;
  Engine?: string;
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
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
export interface DBInstanceRole {
  RoleArn?: string;
  FeatureName?: string;
  Status?: string;
}
export type DBInstanceRoles = DBInstanceRole[];
export interface DBInstanceAutomatedBackupsReplication {
  DBInstanceAutomatedBackupsArn?: string;
}
export type DBInstanceAutomatedBackupsReplicationList = DBInstanceAutomatedBackupsReplication[];
export type ActivityStreamPolicyStatus =
  | "locked"
  | "unlocked"
  | "locking-policy"
  | "unlocking-policy"
  | (string & {});
export interface AdditionalStorageVolumeOutput {
  VolumeName?: string;
  StorageVolumeStatus?: string;
  StorageOperationStatus?: string;
  StorageOperationPercentProgress?: number;
  AllocatedStorage?: number;
  IOPS?: number;
  MaxAllocatedStorage?: number;
  StorageThroughput?: number;
  StorageType?: string;
}
export type AdditionalStorageVolumesOutputList = AdditionalStorageVolumeOutput[];
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
  UpgradeRolloutOrder?: UpgradeRolloutOrder;
  PendingModifiedValues?: PendingModifiedValues;
  LatestRestorableTime?: Date;
  MultiAZ?: boolean;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  ReadReplicaSourceDBInstanceIdentifier?: string;
  ReadReplicaDBInstanceIdentifiers?: string[];
  ReadReplicaDBClusterIdentifiers?: string[];
  ReplicaMode?: ReplicaMode;
  LicenseModel?: string;
  Iops?: number;
  StorageThroughput?: number;
  OptionGroupMemberships?: OptionGroupMembership[];
  CharacterSetName?: string;
  NcharCharacterSetName?: string;
  SecondaryAvailabilityZone?: string;
  PubliclyAccessible?: boolean;
  StatusInfos?: DBInstanceStatusInfo[];
  StorageType?: string;
  StorageEncryptionType?: StorageEncryptionType;
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
  DatabaseInsightsMode?: DatabaseInsightsMode;
  PerformanceInsightsEnabled?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  EnabledCloudwatchLogsExports?: string[];
  ProcessorFeatures?: ProcessorFeature[];
  DeletionProtection?: boolean;
  AssociatedRoles?: DBInstanceRole[];
  ListenerEndpoint?: Endpoint;
  MaxAllocatedStorage?: number;
  TagList?: Tag[];
  AutomationMode?: AutomationMode;
  ResumeFullAutomationModeTime?: Date;
  CustomerOwnedIpEnabled?: boolean;
  NetworkType?: string;
  ActivityStreamStatus?: ActivityStreamStatus;
  ActivityStreamKmsKeyId?: string;
  ActivityStreamKinesisStreamName?: string;
  ActivityStreamMode?: ActivityStreamMode;
  ActivityStreamEngineNativeAuditFieldsIncluded?: boolean;
  AwsBackupRecoveryPointArn?: string;
  DBInstanceAutomatedBackupsReplications?: DBInstanceAutomatedBackupsReplication[];
  BackupTarget?: string;
  AutomaticRestartTime?: Date;
  CustomIamInstanceProfile?: string;
  ActivityStreamPolicyStatus?: ActivityStreamPolicyStatus;
  CertificateDetails?: CertificateDetails;
  DBSystemId?: string;
  MasterUserSecret?: MasterUserSecret;
  ReadReplicaSourceDBClusterIdentifier?: string;
  PercentProgress?: string;
  MultiTenant?: boolean;
  DedicatedLogVolume?: boolean;
  IsStorageConfigUpgradeAvailable?: boolean;
  EngineLifecycleSupport?: string;
  AdditionalStorageVolumes?: AdditionalStorageVolumeOutput[];
  StorageVolumeStatus?: string;
  StorageOperationStatus?: string;
  StorageOperationPercentProgress?: number;
}
export interface CreateDBInstanceResult {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
}
export interface CreateDBInstanceReadReplicaMessage {
  DBInstanceIdentifier?: string;
  SourceDBInstanceIdentifier?: string;
  DBInstanceClass?: string;
  AvailabilityZone?: string;
  Port?: number;
  MultiAZ?: boolean;
  AutoMinorVersionUpgrade?: boolean;
  Iops?: number;
  StorageThroughput?: number;
  OptionGroupName?: string;
  DBParameterGroupName?: string;
  PubliclyAccessible?: boolean;
  Tags?: Tag[];
  DBSubnetGroupName?: string;
  VpcSecurityGroupIds?: string[];
  StorageType?: string;
  CopyTagsToSnapshot?: boolean;
  MonitoringInterval?: number;
  MonitoringRoleArn?: string;
  KmsKeyId?: string;
  PreSignedUrl?: string | redacted.Redacted<string>;
  EnableIAMDatabaseAuthentication?: boolean;
  DatabaseInsightsMode?: DatabaseInsightsMode;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  EnableCloudwatchLogsExports?: string[];
  ProcessorFeatures?: ProcessorFeature[];
  UseDefaultProcessorFeatures?: boolean;
  DeletionProtection?: boolean;
  Domain?: string;
  DomainIAMRoleName?: string;
  DomainFqdn?: string;
  DomainOu?: string;
  DomainAuthSecretArn?: string;
  DomainDnsIps?: string[];
  ReplicaMode?: ReplicaMode;
  EnableCustomerOwnedIp?: boolean;
  NetworkType?: string;
  MaxAllocatedStorage?: number;
  BackupTarget?: string;
  CustomIamInstanceProfile?: string;
  AllocatedStorage?: number;
  SourceDBClusterIdentifier?: string;
  DedicatedLogVolume?: boolean;
  UpgradeStorageConfig?: boolean;
  CACertificateIdentifier?: string;
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
  TagSpecifications?: TagSpecification[];
}
export interface CreateDBInstanceReadReplicaResult {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
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
export type DBProxyName = string;
export type EngineFamily = "MYSQL" | "POSTGRESQL" | "SQLSERVER" | (string & {});
export type DefaultAuthScheme = "IAM_AUTH" | "NONE" | (string & {});
export type AuthUserName = string;
export type AuthScheme = "SECRETS" | (string & {});
export type Arn = string;
export type IAMAuthMode = "DISABLED" | "REQUIRED" | "ENABLED" | (string & {});
export type ClientPasswordAuthType =
  | "MYSQL_NATIVE_PASSWORD"
  | "MYSQL_CACHING_SHA2_PASSWORD"
  | "POSTGRES_SCRAM_SHA_256"
  | "POSTGRES_MD5"
  | "SQL_SERVER_AUTHENTICATION"
  | (string & {});
export interface UserAuthConfig {
  Description?: string;
  UserName?: string;
  AuthScheme?: AuthScheme;
  SecretArn?: string;
  IAMAuth?: IAMAuthMode;
  ClientPasswordAuthType?: ClientPasswordAuthType;
}
export type UserAuthConfigList = UserAuthConfig[];
export type EndpointNetworkType = "IPV4" | "IPV6" | "DUAL" | (string & {});
export type TargetConnectionNetworkType = "IPV4" | "IPV6" | (string & {});
export interface CreateDBProxyRequest {
  DBProxyName?: string;
  EngineFamily?: EngineFamily;
  DefaultAuthScheme?: DefaultAuthScheme;
  Auth?: UserAuthConfig[];
  RoleArn?: string;
  VpcSubnetIds?: string[];
  VpcSecurityGroupIds?: string[];
  RequireTLS?: boolean;
  IdleClientTimeout?: number;
  DebugLogging?: boolean;
  Tags?: Tag[];
  EndpointNetworkType?: EndpointNetworkType;
  TargetConnectionNetworkType?: TargetConnectionNetworkType;
}
export type DBProxyStatus =
  | "available"
  | "modifying"
  | "incompatible-network"
  | "insufficient-resource-limits"
  | "creating"
  | "deleting"
  | "suspended"
  | "suspending"
  | "reactivating"
  | (string & {});
export interface UserAuthConfigInfo {
  Description?: string;
  UserName?: string;
  AuthScheme?: AuthScheme;
  SecretArn?: string;
  IAMAuth?: IAMAuthMode;
  ClientPasswordAuthType?: ClientPasswordAuthType;
}
export type UserAuthConfigInfoList = UserAuthConfigInfo[];
export interface DBProxy {
  DBProxyName?: string;
  DBProxyArn?: string;
  Status?: DBProxyStatus;
  EngineFamily?: string;
  VpcId?: string;
  VpcSecurityGroupIds?: string[];
  VpcSubnetIds?: string[];
  DefaultAuthScheme?: string;
  Auth?: UserAuthConfigInfo[];
  RoleArn?: string;
  Endpoint?: string;
  RequireTLS?: boolean;
  IdleClientTimeout?: number;
  DebugLogging?: boolean;
  CreatedDate?: Date;
  UpdatedDate?: Date;
  EndpointNetworkType?: EndpointNetworkType;
  TargetConnectionNetworkType?: TargetConnectionNetworkType;
}
export interface CreateDBProxyResponse {
  DBProxy?: DBProxy;
}
export type DBProxyEndpointName = string;
export type DBProxyEndpointTargetRole = "READ_WRITE" | "READ_ONLY" | (string & {});
export interface CreateDBProxyEndpointRequest {
  DBProxyName?: string;
  DBProxyEndpointName?: string;
  VpcSubnetIds?: string[];
  VpcSecurityGroupIds?: string[];
  TargetRole?: DBProxyEndpointTargetRole;
  Tags?: Tag[];
  EndpointNetworkType?: EndpointNetworkType;
}
export type DBProxyEndpointStatus =
  | "available"
  | "modifying"
  | "incompatible-network"
  | "insufficient-resource-limits"
  | "creating"
  | "deleting"
  | (string & {});
export interface DBProxyEndpoint {
  DBProxyEndpointName?: string;
  DBProxyEndpointArn?: string;
  DBProxyName?: string;
  Status?: DBProxyEndpointStatus;
  VpcId?: string;
  VpcSecurityGroupIds?: string[];
  VpcSubnetIds?: string[];
  Endpoint?: string;
  CreatedDate?: Date;
  TargetRole?: DBProxyEndpointTargetRole;
  IsDefault?: boolean;
  EndpointNetworkType?: EndpointNetworkType;
}
export interface CreateDBProxyEndpointResponse {
  DBProxyEndpoint?: DBProxyEndpoint;
}
export interface CreateDBSecurityGroupMessage {
  DBSecurityGroupName?: string;
  DBSecurityGroupDescription?: string;
  Tags?: Tag[];
}
export interface CreateDBSecurityGroupResult {
  DBSecurityGroup?: DBSecurityGroup;
}
export interface CreateDBShardGroupMessage {
  DBShardGroupIdentifier?: string;
  DBClusterIdentifier?: string;
  ComputeRedundancy?: number;
  MaxACU?: number;
  MinACU?: number;
  PubliclyAccessible?: boolean;
  Tags?: Tag[];
}
export type DBShardGroupIdentifier = string;
export interface DBShardGroup {
  DBShardGroupResourceId?: string;
  DBShardGroupIdentifier?: string;
  DBClusterIdentifier?: string;
  MaxACU?: number;
  MinACU?: number;
  ComputeRedundancy?: number;
  Status?: string;
  PubliclyAccessible?: boolean;
  Endpoint?: string;
  DBShardGroupArn?: string;
  TagList?: Tag[];
}
export interface CreateDBSnapshotMessage {
  DBSnapshotIdentifier?: string;
  DBInstanceIdentifier?: string;
  Tags?: Tag[];
}
export interface CreateDBSnapshotResult {
  DBSnapshot?: DBSnapshot & {
    AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
  };
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
  EngineLifecycleSupport?: string;
  DeletionProtection?: boolean;
  DatabaseName?: string;
  StorageEncrypted?: boolean;
  Tags?: Tag[];
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
  GlobalWriteForwardingStatus?: WriteForwardingStatus;
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
  EngineLifecycleSupport?: string;
  DatabaseName?: string;
  StorageEncrypted?: boolean;
  StorageEncryptionType?: StorageEncryptionType;
  DeletionProtection?: boolean;
  GlobalClusterMembers?: GlobalClusterMember[];
  Endpoint?: string;
  FailoverState?: FailoverState;
  TagList?: Tag[];
}
export interface CreateGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export type SourceArn = string;
export type IntegrationName = string;
export type EncryptionContextMap = { [key: string]: string | undefined };
export type DataFilter = string;
export type IntegrationDescription = string;
export interface CreateIntegrationMessage {
  SourceArn?: string;
  TargetArn?: string;
  IntegrationName?: string;
  KMSKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
  DataFilter?: string;
  Description?: string;
}
export type IntegrationArn = string;
export type IntegrationStatus =
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
export interface Integration {
  SourceArn?: string;
  TargetArn?: string;
  IntegrationName?: string;
  IntegrationArn?: string;
  KMSKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Status?: IntegrationStatus;
  Tags?: Tag[];
  DataFilter?: string;
  Description?: string;
  CreateTime?: Date;
  Errors?: (IntegrationError & { ErrorCode: string })[];
}
export interface CreateOptionGroupMessage {
  OptionGroupName?: string;
  EngineName?: string;
  MajorEngineVersion?: string;
  OptionGroupDescription?: string;
  Tags?: Tag[];
}
export interface CreateOptionGroupResult {
  OptionGroup?: OptionGroup;
}
export interface CreateTenantDatabaseMessage {
  DBInstanceIdentifier?: string;
  TenantDBName?: string;
  MasterUsername?: string;
  MasterUserPassword?: string | redacted.Redacted<string>;
  CharacterSetName?: string;
  NcharCharacterSetName?: string;
  ManageMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
  Tags?: Tag[];
}
export interface TenantDatabasePendingModifiedValues {
  MasterUserPassword?: string | redacted.Redacted<string>;
  TenantDBName?: string;
}
export interface TenantDatabase {
  TenantDatabaseCreateTime?: Date;
  DBInstanceIdentifier?: string;
  TenantDBName?: string;
  Status?: string;
  MasterUsername?: string;
  DbiResourceId?: string;
  TenantDatabaseResourceId?: string;
  TenantDatabaseARN?: string;
  CharacterSetName?: string;
  NcharCharacterSetName?: string;
  DeletionProtection?: boolean;
  PendingModifiedValues?: TenantDatabasePendingModifiedValues;
  MasterUserSecret?: MasterUserSecret;
  TagList?: Tag[];
}
export interface CreateTenantDatabaseResult {
  TenantDatabase?: TenantDatabase;
}
export interface DeleteBlueGreenDeploymentRequest {
  BlueGreenDeploymentIdentifier?: string;
  DeleteTarget?: boolean;
}
export interface DeleteBlueGreenDeploymentResponse {
  BlueGreenDeployment?: BlueGreenDeployment;
}
export interface DeleteCustomDBEngineVersionMessage {
  Engine?: string;
  EngineVersion?: string;
}
export interface DeleteDBClusterMessage {
  DBClusterIdentifier?: string;
  SkipFinalSnapshot?: boolean;
  FinalDBSnapshotIdentifier?: string;
  DeleteAutomatedBackups?: boolean;
}
export interface DeleteDBClusterResult {
  DBCluster?: DBCluster;
}
export interface DeleteDBClusterAutomatedBackupMessage {
  DbClusterResourceId?: string;
}
export interface RestoreWindow {
  EarliestTime?: Date;
  LatestTime?: Date;
}
export interface DBClusterAutomatedBackup {
  Engine?: string;
  VpcId?: string;
  DBClusterAutomatedBackupsArn?: string;
  DBClusterIdentifier?: string;
  RestoreWindow?: RestoreWindow;
  MasterUsername?: string;
  DbClusterResourceId?: string;
  Region?: string;
  LicenseModel?: string;
  Status?: string;
  IAMDatabaseAuthenticationEnabled?: boolean;
  ClusterCreateTime?: Date;
  StorageEncrypted?: boolean;
  StorageEncryptionType?: StorageEncryptionType;
  AllocatedStorage?: number;
  EngineVersion?: string;
  DBClusterArn?: string;
  BackupRetentionPeriod?: number;
  PreferredBackupWindow?: string;
  EngineMode?: string;
  AvailabilityZones?: string[];
  Port?: number;
  KmsKeyId?: string;
  StorageType?: string;
  Iops?: number;
  StorageThroughput?: number;
  AwsBackupRecoveryPointArn?: string;
  TagList?: Tag[];
}
export interface DeleteDBClusterAutomatedBackupResult {
  DBClusterAutomatedBackup?: DBClusterAutomatedBackup;
}
export interface DeleteDBClusterEndpointMessage {
  DBClusterEndpointIdentifier?: string;
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
  DeleteAutomatedBackups?: boolean;
}
export interface DeleteDBInstanceResult {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
}
export interface DeleteDBInstanceAutomatedBackupMessage {
  DbiResourceId?: string;
  DBInstanceAutomatedBackupsArn?: string;
}
export interface DBInstanceAutomatedBackup {
  DBInstanceArn?: string;
  DbiResourceId?: string;
  Region?: string;
  DBInstanceIdentifier?: string;
  RestoreWindow?: RestoreWindow;
  AllocatedStorage?: number;
  Status?: string;
  Port?: number;
  AvailabilityZone?: string;
  VpcId?: string;
  InstanceCreateTime?: Date;
  MasterUsername?: string;
  Engine?: string;
  EngineVersion?: string;
  LicenseModel?: string;
  Iops?: number;
  StorageThroughput?: number;
  OptionGroupName?: string;
  TdeCredentialArn?: string;
  Encrypted?: boolean;
  StorageEncryptionType?: StorageEncryptionType;
  StorageType?: string;
  KmsKeyId?: string;
  Timezone?: string;
  IAMDatabaseAuthenticationEnabled?: boolean;
  BackupRetentionPeriod?: number;
  PreferredBackupWindow?: string;
  DBInstanceAutomatedBackupsArn?: string;
  DBInstanceAutomatedBackupsReplications?: DBInstanceAutomatedBackupsReplication[];
  BackupTarget?: string;
  MultiTenant?: boolean;
  AwsBackupRecoveryPointArn?: string;
  TagList?: Tag[];
  DedicatedLogVolume?: boolean;
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
}
export interface DeleteDBInstanceAutomatedBackupResult {
  DBInstanceAutomatedBackup?: DBInstanceAutomatedBackup & {
    AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
  };
}
export interface DeleteDBParameterGroupMessage {
  DBParameterGroupName?: string;
}
export interface DeleteDBParameterGroupResponse {}
export interface DeleteDBProxyRequest {
  DBProxyName?: string;
}
export interface DeleteDBProxyResponse {
  DBProxy?: DBProxy;
}
export interface DeleteDBProxyEndpointRequest {
  DBProxyEndpointName?: string;
}
export interface DeleteDBProxyEndpointResponse {
  DBProxyEndpoint?: DBProxyEndpoint;
}
export interface DeleteDBSecurityGroupMessage {
  DBSecurityGroupName?: string;
}
export interface DeleteDBSecurityGroupResponse {}
export interface DeleteDBShardGroupMessage {
  DBShardGroupIdentifier?: string;
}
export interface DeleteDBSnapshotMessage {
  DBSnapshotIdentifier?: string;
}
export interface DeleteDBSnapshotResult {
  DBSnapshot?: DBSnapshot & {
    AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
  };
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
export type IntegrationIdentifier = string;
export interface DeleteIntegrationMessage {
  IntegrationIdentifier?: string;
}
export interface DeleteOptionGroupMessage {
  OptionGroupName?: string;
}
export interface DeleteOptionGroupResponse {}
export interface DeleteTenantDatabaseMessage {
  DBInstanceIdentifier?: string;
  TenantDBName?: string;
  SkipFinalSnapshot?: boolean;
  FinalDBSnapshotIdentifier?: string;
}
export interface DeleteTenantDatabaseResult {
  TenantDatabase?: TenantDatabase;
}
export type DBProxyTargetGroupName = string;
export interface DeregisterDBProxyTargetsRequest {
  DBProxyName?: string;
  TargetGroupName?: string;
  DBInstanceIdentifiers?: string[];
  DBClusterIdentifiers?: string[];
}
export interface DeregisterDBProxyTargetsResponse {}
export interface DescribeAccountAttributesMessage {}
export interface AccountQuota {
  AccountQuotaName?: string;
  Used?: number;
  Max?: number;
}
export type AccountQuotaList = AccountQuota[];
export interface AccountAttributesMessage {
  AccountQuotas?: AccountQuota[];
}
export type FilterValueList = string[];
export interface Filter {
  Name?: string;
  Values?: string[];
}
export type FilterList = Filter[];
export type MaxRecords = number;
export interface DescribeBlueGreenDeploymentsRequest {
  BlueGreenDeploymentIdentifier?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export type BlueGreenDeploymentList = BlueGreenDeployment[];
export interface DescribeBlueGreenDeploymentsResponse {
  BlueGreenDeployments?: BlueGreenDeployment[];
  Marker?: string;
}
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
  CustomerOverride?: boolean;
  CustomerOverrideValidTill?: Date;
}
export type CertificateList = Certificate[];
export interface CertificateMessage {
  DefaultCertificateForNewLaunches?: string;
  Certificates?: Certificate[];
  Marker?: string;
}
export interface DescribeDBClusterAutomatedBackupsMessage {
  DbClusterResourceId?: string;
  DBClusterIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type DBClusterAutomatedBackupList = DBClusterAutomatedBackup[];
export interface DBClusterAutomatedBackupMessage {
  Marker?: string;
  DBClusterAutomatedBackups?: DBClusterAutomatedBackup[];
}
export interface DescribeDBClusterBacktracksMessage {
  DBClusterIdentifier?: string;
  BacktrackIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type DBClusterBacktrackList = DBClusterBacktrack[];
export interface DBClusterBacktrackMessage {
  Marker?: string;
  DBClusterBacktracks?: DBClusterBacktrack[];
}
export interface DescribeDBClusterEndpointsMessage {
  DBClusterIdentifier?: string;
  DBClusterEndpointIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
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
export type PotentiallySensitiveParameterValue = string;
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
  SupportedEngineModes?: string[];
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
  IncludeShared?: boolean;
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
  DbClusterResourceId?: string;
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
  IncludeAll?: boolean;
}
export type DBEngineVersionList = DBEngineVersion[];
export interface DBEngineVersionMessage {
  Marker?: string;
  DBEngineVersions?: DBEngineVersion[];
}
export interface DescribeDBInstanceAutomatedBackupsMessage {
  DbiResourceId?: string;
  DBInstanceIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
  DBInstanceAutomatedBackupsArn?: string;
}
export type DBInstanceAutomatedBackupList = DBInstanceAutomatedBackup[];
export interface DBInstanceAutomatedBackupMessage {
  Marker?: string;
  DBInstanceAutomatedBackups?: (DBInstanceAutomatedBackup & {
    AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
  })[];
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
  DBInstances?: (DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  })[];
}
export interface DescribeDBLogFilesMessage {
  DBInstanceIdentifier?: string;
  FilenameContains?: string;
  FileLastWritten?: number;
  FileSize?: number;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface DescribeDBLogFilesDetails {
  LogFileName?: string;
  LastWritten?: number;
  Size?: number;
}
export type DescribeDBLogFilesList = DescribeDBLogFilesDetails[];
export interface DescribeDBLogFilesResponse {
  DescribeDBLogFiles?: DescribeDBLogFilesDetails[];
  Marker?: string;
}
export type Engine = string;
export type MajorEngineVersion = string;
export type Marker = string;
export interface DescribeDBMajorEngineVersionsRequest {
  Engine?: string;
  MajorEngineVersion?: string;
  Marker?: string;
  MaxRecords?: number;
}
export type LifecycleSupportName =
  | "open-source-rds-standard-support"
  | "open-source-rds-extended-support"
  | (string & {});
export interface SupportedEngineLifecycle {
  LifecycleSupportName?: LifecycleSupportName;
  LifecycleSupportStartDate?: Date;
  LifecycleSupportEndDate?: Date;
}
export type SupportedEngineLifecycleList = SupportedEngineLifecycle[];
export interface DBMajorEngineVersion {
  Engine?: string;
  MajorEngineVersion?: string;
  SupportedEngineLifecycles?: SupportedEngineLifecycle[];
}
export type DBMajorEngineVersionsList = DBMajorEngineVersion[];
export interface DescribeDBMajorEngineVersionsResponse {
  DBMajorEngineVersions?: (DBMajorEngineVersion & {
    SupportedEngineLifecycles: (SupportedEngineLifecycle & {
      LifecycleSupportName: LifecycleSupportName;
      LifecycleSupportStartDate: Date;
      LifecycleSupportEndDate: Date;
    })[];
  })[];
  Marker?: string;
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
export interface DescribeDBProxiesRequest {
  DBProxyName?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export type DBProxyList = DBProxy[];
export interface DescribeDBProxiesResponse {
  DBProxies?: DBProxy[];
  Marker?: string;
}
export interface DescribeDBProxyEndpointsRequest {
  DBProxyName?: string;
  DBProxyEndpointName?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export type DBProxyEndpointList = DBProxyEndpoint[];
export interface DescribeDBProxyEndpointsResponse {
  DBProxyEndpoints?: DBProxyEndpoint[];
  Marker?: string;
}
export interface DescribeDBProxyTargetGroupsRequest {
  DBProxyName?: string;
  TargetGroupName?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export type OperatorSensitiveString = string | redacted.Redacted<string>;
export interface ConnectionPoolConfigurationInfo {
  MaxConnectionsPercent?: number;
  MaxIdleConnectionsPercent?: number;
  ConnectionBorrowTimeout?: number;
  SessionPinningFilters?: string[];
  InitQuery?: string | redacted.Redacted<string>;
}
export interface DBProxyTargetGroup {
  DBProxyName?: string;
  TargetGroupName?: string;
  TargetGroupArn?: string;
  IsDefault?: boolean;
  Status?: string;
  ConnectionPoolConfig?: ConnectionPoolConfigurationInfo;
  CreatedDate?: Date;
  UpdatedDate?: Date;
}
export type TargetGroupList = DBProxyTargetGroup[];
export interface DescribeDBProxyTargetGroupsResponse {
  TargetGroups?: DBProxyTargetGroup[];
  Marker?: string;
}
export interface DescribeDBProxyTargetsRequest {
  DBProxyName?: string;
  TargetGroupName?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export type TargetType =
  | "RDS_INSTANCE"
  | "RDS_SERVERLESS_ENDPOINT"
  | "TRACKED_CLUSTER"
  | (string & {});
export type TargetRole = "READ_WRITE" | "READ_ONLY" | "UNKNOWN" | (string & {});
export type TargetState = "REGISTERING" | "AVAILABLE" | "UNAVAILABLE" | "UNUSED" | (string & {});
export type TargetHealthReason =
  | "UNREACHABLE"
  | "CONNECTION_FAILED"
  | "AUTH_FAILURE"
  | "PENDING_PROXY_CAPACITY"
  | "INVALID_REPLICATION_STATE"
  | "PROMOTED"
  | (string & {});
export interface TargetHealth {
  State?: TargetState;
  Reason?: TargetHealthReason;
  Description?: string;
}
export interface DBProxyTarget {
  TargetArn?: string;
  Endpoint?: string;
  TrackedClusterId?: string;
  RdsResourceId?: string;
  Port?: number;
  Type?: TargetType;
  Role?: TargetRole;
  TargetHealth?: TargetHealth;
}
export type TargetList = DBProxyTarget[];
export interface DescribeDBProxyTargetsResponse {
  Targets?: DBProxyTarget[];
  Marker?: string;
}
export interface DescribeDBRecommendationsMessage {
  LastUpdatedAfter?: Date;
  LastUpdatedBefore?: Date;
  Locale?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface RecommendedActionParameter {
  Key?: string;
  Value?: string;
}
export type RecommendedActionParameterList = RecommendedActionParameter[];
export interface ScalarReferenceDetails {
  Value?: number;
}
export interface ReferenceDetails {
  ScalarReferenceDetails?: ScalarReferenceDetails;
}
export interface MetricReference {
  Name?: string;
  ReferenceDetails?: ReferenceDetails;
}
export type MetricReferenceList = MetricReference[];
export interface PerformanceInsightsMetricDimensionGroup {
  Dimensions?: string[];
  Group?: string;
  Limit?: number;
}
export interface PerformanceInsightsMetricQuery {
  GroupBy?: PerformanceInsightsMetricDimensionGroup;
  Metric?: string;
}
export interface MetricQuery {
  PerformanceInsightsMetricQuery?: PerformanceInsightsMetricQuery;
}
export interface Metric {
  Name?: string;
  References?: MetricReference[];
  StatisticsDetails?: string;
  MetricQuery?: MetricQuery;
}
export type MetricList = Metric[];
export interface PerformanceIssueDetails {
  StartTime?: Date;
  EndTime?: Date;
  Metrics?: Metric[];
  Analysis?: string;
}
export interface IssueDetails {
  PerformanceIssueDetails?: PerformanceIssueDetails;
}
export interface ContextAttribute {
  Key?: string;
  Value?: string;
}
export type ContextAttributeList = ContextAttribute[];
export interface RecommendedAction {
  ActionId?: string;
  Title?: string;
  Description?: string;
  Operation?: string;
  Parameters?: RecommendedActionParameter[];
  ApplyModes?: string[];
  Status?: string;
  IssueDetails?: IssueDetails;
  ContextAttributes?: ContextAttribute[];
}
export type RecommendedActionList = RecommendedAction[];
export interface DocLink {
  Text?: string;
  Url?: string;
}
export type DocLinkList = DocLink[];
export interface DBRecommendation {
  RecommendationId?: string;
  TypeId?: string;
  Severity?: string;
  ResourceArn?: string;
  Status?: string;
  CreatedTime?: Date;
  UpdatedTime?: Date;
  Detection?: string;
  Recommendation?: string;
  Description?: string;
  Reason?: string;
  RecommendedActions?: RecommendedAction[];
  Category?: string;
  Source?: string;
  TypeDetection?: string;
  TypeRecommendation?: string;
  Impact?: string;
  AdditionalInfo?: string;
  Links?: DocLink[];
  IssueDetails?: IssueDetails;
}
export type DBRecommendationList = DBRecommendation[];
export interface DBRecommendationsMessage {
  DBRecommendations?: DBRecommendation[];
  Marker?: string;
}
export interface DescribeDBSecurityGroupsMessage {
  DBSecurityGroupName?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type DBSecurityGroups = DBSecurityGroup[];
export interface DBSecurityGroupMessage {
  Marker?: string;
  DBSecurityGroups?: DBSecurityGroup[];
}
export interface DescribeDBShardGroupsMessage {
  DBShardGroupIdentifier?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export type DBShardGroupsList = DBShardGroup[];
export interface DescribeDBShardGroupsResponse {
  DBShardGroups?: DBShardGroup[];
  Marker?: string;
}
export interface DescribeDBSnapshotAttributesMessage {
  DBSnapshotIdentifier?: string;
}
export interface DBSnapshotAttribute {
  AttributeName?: string;
  AttributeValues?: string[];
}
export type DBSnapshotAttributeList = DBSnapshotAttribute[];
export interface DBSnapshotAttributesResult {
  DBSnapshotIdentifier?: string;
  DBSnapshotAttributes?: DBSnapshotAttribute[];
}
export interface DescribeDBSnapshotAttributesResult {
  DBSnapshotAttributesResult?: DBSnapshotAttributesResult;
}
export interface DescribeDBSnapshotsMessage {
  DBInstanceIdentifier?: string;
  DBSnapshotIdentifier?: string;
  SnapshotType?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
  IncludeShared?: boolean;
  IncludePublic?: boolean;
  DbiResourceId?: string;
}
export type DBSnapshotList = DBSnapshot[];
export interface DBSnapshotMessage {
  Marker?: string;
  DBSnapshots?: (DBSnapshot & {
    AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
  })[];
}
export interface DescribeDBSnapshotTenantDatabasesMessage {
  DBInstanceIdentifier?: string;
  DBSnapshotIdentifier?: string;
  SnapshotType?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
  DbiResourceId?: string;
}
export interface DBSnapshotTenantDatabase {
  DBSnapshotIdentifier?: string;
  DBInstanceIdentifier?: string;
  DbiResourceId?: string;
  EngineName?: string;
  SnapshotType?: string;
  TenantDatabaseCreateTime?: Date;
  TenantDBName?: string;
  MasterUsername?: string;
  TenantDatabaseResourceId?: string;
  CharacterSetName?: string;
  DBSnapshotTenantDatabaseARN?: string;
  NcharCharacterSetName?: string;
  TagList?: Tag[];
}
export type DBSnapshotTenantDatabasesList = DBSnapshotTenantDatabase[];
export interface DBSnapshotTenantDatabasesMessage {
  Marker?: string;
  DBSnapshotTenantDatabases?: DBSnapshotTenantDatabase[];
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
  | "custom-engine-version"
  | "db-proxy"
  | "blue-green-deployment"
  | "db-shard-group"
  | "zero-etl"
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
export interface DescribeExportTasksMessage {
  ExportTaskIdentifier?: string;
  SourceArn?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
  SourceType?: ExportSourceType;
}
export type ExportTasksList = ExportTask[];
export interface ExportTasksMessage {
  Marker?: string;
  ExportTasks?: ExportTask[];
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
export interface DescribeIntegrationsMessage {
  IntegrationIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type IntegrationList = Integration[];
export interface DescribeIntegrationsResponse {
  Marker?: string;
  Integrations?: (Integration & { Errors: (IntegrationError & { ErrorCode: string })[] })[];
}
export interface DescribeOptionGroupOptionsMessage {
  EngineName?: string;
  MajorEngineVersion?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type OptionsDependedOn = string[];
export type OptionsConflictsWith = string[];
export interface MinimumEngineVersionPerAllowedValue {
  AllowedValue?: string;
  MinimumEngineVersion?: string;
}
export type MinimumEngineVersionPerAllowedValueList = MinimumEngineVersionPerAllowedValue[];
export interface OptionGroupOptionSetting {
  SettingName?: string;
  SettingDescription?: string;
  DefaultValue?: string;
  ApplyType?: string;
  AllowedValues?: string;
  IsModifiable?: boolean;
  IsRequired?: boolean;
  MinimumEngineVersionPerAllowedValue?: MinimumEngineVersionPerAllowedValue[];
}
export type OptionGroupOptionSettingsList = OptionGroupOptionSetting[];
export interface OptionVersion {
  Version?: string;
  IsDefault?: boolean;
}
export type OptionGroupOptionVersionsList = OptionVersion[];
export interface OptionGroupOption {
  Name?: string;
  Description?: string;
  EngineName?: string;
  MajorEngineVersion?: string;
  MinimumRequiredMinorEngineVersion?: string;
  PortRequired?: boolean;
  DefaultPort?: number;
  OptionsDependedOn?: string[];
  OptionsConflictsWith?: string[];
  Persistent?: boolean;
  Permanent?: boolean;
  RequiresAutoMinorEngineVersionUpgrade?: boolean;
  VpcOnly?: boolean;
  SupportsOptionVersionDowngrade?: boolean;
  OptionGroupOptionSettings?: OptionGroupOptionSetting[];
  OptionGroupOptionVersions?: OptionVersion[];
  CopyableCrossAccount?: boolean;
}
export type OptionGroupOptionsList = OptionGroupOption[];
export interface OptionGroupOptionsMessage {
  OptionGroupOptions?: OptionGroupOption[];
  Marker?: string;
}
export interface DescribeOptionGroupsMessage {
  OptionGroupName?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
  EngineName?: string;
  MajorEngineVersion?: string;
}
export type OptionGroupsList = OptionGroup[];
export interface OptionGroups {
  OptionGroupsList?: OptionGroup[];
  Marker?: string;
}
export interface DescribeOrderableDBInstanceOptionsMessage {
  Engine?: string;
  EngineVersion?: string;
  DBInstanceClass?: string;
  LicenseModel?: string;
  AvailabilityZoneGroup?: string;
  Vpc?: boolean;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type AvailabilityZoneList = AvailabilityZone[];
export interface AvailableProcessorFeature {
  Name?: string;
  DefaultValue?: string;
  AllowedValues?: string;
}
export type AvailableProcessorFeatureList = AvailableProcessorFeature[];
export type ActivityStreamModeList = string[];
export interface AvailableAdditionalStorageVolumesOption {
  SupportsStorageAutoscaling?: boolean;
  SupportsStorageThroughput?: boolean;
  SupportsIops?: boolean;
  StorageType?: string;
  MinStorageSize?: number;
  MaxStorageSize?: number;
  MinIops?: number;
  MaxIops?: number;
  MinIopsPerGib?: number;
  MaxIopsPerGib?: number;
  MinStorageThroughput?: number;
  MaxStorageThroughput?: number;
}
export type AvailableAdditionalStorageVolumesOptionList = AvailableAdditionalStorageVolumesOption[];
export interface OrderableDBInstanceOption {
  Engine?: string;
  EngineVersion?: string;
  DBInstanceClass?: string;
  LicenseModel?: string;
  AvailabilityZoneGroup?: string;
  AvailabilityZones?: AvailabilityZone[];
  MultiAZCapable?: boolean;
  ReadReplicaCapable?: boolean;
  Vpc?: boolean;
  SupportsStorageEncryption?: boolean;
  StorageType?: string;
  SupportsIops?: boolean;
  SupportsStorageThroughput?: boolean;
  SupportsEnhancedMonitoring?: boolean;
  SupportsIAMDatabaseAuthentication?: boolean;
  SupportsPerformanceInsights?: boolean;
  MinStorageSize?: number;
  MaxStorageSize?: number;
  MinIopsPerDbInstance?: number;
  MaxIopsPerDbInstance?: number;
  MinIopsPerGib?: number;
  MaxIopsPerGib?: number;
  MinStorageThroughputPerDbInstance?: number;
  MaxStorageThroughputPerDbInstance?: number;
  MinStorageThroughputPerIops?: number;
  MaxStorageThroughputPerIops?: number;
  AvailableProcessorFeatures?: AvailableProcessorFeature[];
  SupportedEngineModes?: string[];
  SupportsStorageAutoscaling?: boolean;
  SupportsKerberosAuthentication?: boolean;
  OutpostCapable?: boolean;
  SupportedActivityStreamModes?: string[];
  SupportsGlobalDatabases?: boolean;
  SupportedNetworkTypes?: string[];
  SupportsClusters?: boolean;
  SupportsDedicatedLogVolume?: boolean;
  SupportsAdditionalStorageVolumes?: boolean;
  SupportsHttpEndpoint?: boolean;
  AvailableAdditionalStorageVolumesOptions?: AvailableAdditionalStorageVolumesOption[];
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
export interface DescribeReservedDBInstancesMessage {
  ReservedDBInstanceId?: string;
  ReservedDBInstancesOfferingId?: string;
  DBInstanceClass?: string;
  Duration?: string;
  ProductDescription?: string;
  OfferingType?: string;
  MultiAZ?: boolean;
  LeaseId?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface RecurringCharge {
  RecurringChargeAmount?: number;
  RecurringChargeFrequency?: string;
}
export type RecurringChargeList = RecurringCharge[];
export interface ReservedDBInstance {
  ReservedDBInstanceId?: string;
  ReservedDBInstancesOfferingId?: string;
  DBInstanceClass?: string;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  DBInstanceCount?: number;
  ProductDescription?: string;
  OfferingType?: string;
  MultiAZ?: boolean;
  State?: string;
  RecurringCharges?: RecurringCharge[];
  ReservedDBInstanceArn?: string;
  LeaseId?: string;
}
export type ReservedDBInstanceList = ReservedDBInstance[];
export interface ReservedDBInstanceMessage {
  Marker?: string;
  ReservedDBInstances?: ReservedDBInstance[];
}
export interface DescribeReservedDBInstancesOfferingsMessage {
  ReservedDBInstancesOfferingId?: string;
  DBInstanceClass?: string;
  Duration?: string;
  ProductDescription?: string;
  OfferingType?: string;
  MultiAZ?: boolean;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export interface ReservedDBInstancesOffering {
  ReservedDBInstancesOfferingId?: string;
  DBInstanceClass?: string;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  ProductDescription?: string;
  OfferingType?: string;
  MultiAZ?: boolean;
  RecurringCharges?: RecurringCharge[];
}
export type ReservedDBInstancesOfferingList = ReservedDBInstancesOffering[];
export interface ReservedDBInstancesOfferingMessage {
  Marker?: string;
  ReservedDBInstancesOfferings?: ReservedDBInstancesOffering[];
}
export interface DescribeServerlessV2PlatformVersionsMessage {
  ServerlessV2PlatformVersion?: string;
  Engine?: string;
  Filters?: Filter[];
  DefaultOnly?: boolean;
  IncludeAll?: boolean;
  MaxRecords?: number;
  Marker?: string;
}
export interface ServerlessV2PlatformVersionInfo {
  ServerlessV2PlatformVersion?: string;
  ServerlessV2PlatformVersionDescription?: string;
  Engine?: string;
  ServerlessV2FeaturesSupport?: ServerlessV2FeaturesSupport;
  Status?: string;
  IsDefault?: boolean;
}
export type ServerlessV2PlatformVersionList = ServerlessV2PlatformVersionInfo[];
export interface ServerlessV2PlatformVersionsMessage {
  Marker?: string;
  ServerlessV2PlatformVersions?: ServerlessV2PlatformVersionInfo[];
}
export interface DescribeSourceRegionsMessage {
  RegionName?: string;
  MaxRecords?: number;
  Marker?: string;
  Filters?: Filter[];
}
export interface SourceRegion {
  RegionName?: string;
  Endpoint?: string;
  Status?: string;
  SupportsDBInstanceAutomatedBackupsReplication?: boolean;
}
export type SourceRegionList = SourceRegion[];
export interface SourceRegionMessage {
  Marker?: string;
  SourceRegions?: SourceRegion[];
}
export interface DescribeTenantDatabasesMessage {
  DBInstanceIdentifier?: string;
  TenantDBName?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export type TenantDatabasesList = TenantDatabase[];
export interface TenantDatabasesMessage {
  Marker?: string;
  TenantDatabases?: TenantDatabase[];
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
  ProvisionedStorageThroughput?: Range[];
  StorageThroughputToIopsRatio?: DoubleRange[];
  SupportsStorageAutoscaling?: boolean;
}
export type ValidStorageOptionsList = ValidStorageOptions[];
export interface ValidVolumeOptions {
  VolumeName?: string;
  Storage?: ValidStorageOptions[];
}
export type ValidVolumeOptionsList = ValidVolumeOptions[];
export interface ValidAdditionalStorageOptions {
  SupportsAdditionalStorageVolumes?: boolean;
  Volumes?: ValidVolumeOptions[];
}
export interface ValidDBInstanceModificationsMessage {
  Storage?: ValidStorageOptions[];
  ValidProcessorFeatures?: AvailableProcessorFeature[];
  SupportsDedicatedLogVolume?: boolean;
  AdditionalStorage?: ValidAdditionalStorageOptions;
}
export interface DescribeValidDBInstanceModificationsResult {
  ValidDBInstanceModificationsMessage?: ValidDBInstanceModificationsMessage;
}
export interface DisableHttpEndpointRequest {
  ResourceArn?: string;
}
export interface DisableHttpEndpointResponse {
  ResourceArn?: string;
  HttpEndpointEnabled?: boolean;
}
export interface DownloadDBLogFilePortionMessage {
  DBInstanceIdentifier?: string;
  LogFileName?: string;
  Marker?: string;
  NumberOfLines?: number;
}
export interface DownloadDBLogFilePortionDetails {
  LogFileData?: string | redacted.Redacted<string>;
  Marker?: string;
  AdditionalDataPending?: boolean;
}
export interface EnableHttpEndpointRequest {
  ResourceArn?: string;
}
export interface EnableHttpEndpointResponse {
  ResourceArn?: string;
  HttpEndpointEnabled?: boolean;
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
export type AuditPolicyState = "locked" | "unlocked" | (string & {});
export interface ModifyActivityStreamRequest {
  ResourceArn?: string;
  AuditPolicyState?: AuditPolicyState;
}
export interface ModifyActivityStreamResponse {
  KmsKeyId?: string;
  KinesisStreamName?: string;
  Status?: ActivityStreamStatus;
  Mode?: ActivityStreamMode;
  EngineNativeAuditFieldsIncluded?: boolean;
  PolicyStatus?: ActivityStreamPolicyStatus;
}
export interface ModifyCertificatesMessage {
  CertificateIdentifier?: string;
  RemoveCustomerOverride?: boolean;
}
export interface ModifyCertificatesResult {
  Certificate?: Certificate;
}
export interface ModifyCurrentDBClusterCapacityMessage {
  DBClusterIdentifier?: string;
  Capacity?: number;
  SecondsBeforeTimeout?: number;
  TimeoutAction?: string;
}
export interface DBClusterCapacityInfo {
  DBClusterIdentifier?: string;
  PendingCapacity?: number;
  CurrentCapacity?: number;
  SecondsBeforeTimeout?: number;
  TimeoutAction?: string;
}
export type CustomEngineVersionStatus =
  | "available"
  | "inactive"
  | "inactive-except-restore"
  | (string & {});
export interface ModifyCustomDBEngineVersionMessage {
  Engine?: string;
  EngineVersion?: string;
  Description?: string;
  Status?: CustomEngineVersionStatus;
}
export interface CloudwatchLogsExportConfiguration {
  EnableLogTypes?: string[];
  DisableLogTypes?: string[];
}
export type AwsBackupRecoveryPointArn = string;
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
  BacktrackWindow?: number;
  CloudwatchLogsExportConfiguration?: CloudwatchLogsExportConfiguration;
  EngineVersion?: string;
  AllowMajorVersionUpgrade?: boolean;
  DBInstanceParameterGroupName?: string;
  Domain?: string;
  DomainIAMRoleName?: string;
  ScalingConfiguration?: ScalingConfiguration;
  DeletionProtection?: boolean;
  EnableHttpEndpoint?: boolean;
  CopyTagsToSnapshot?: boolean;
  EnableGlobalWriteForwarding?: boolean;
  DBClusterInstanceClass?: string;
  AllocatedStorage?: number;
  StorageType?: string;
  Iops?: number;
  AutoMinorVersionUpgrade?: boolean;
  NetworkType?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  MonitoringInterval?: number;
  MonitoringRoleArn?: string;
  DatabaseInsightsMode?: DatabaseInsightsMode;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  ManageMasterUserPassword?: boolean;
  RotateMasterUserPassword?: boolean;
  EnableLocalWriteForwarding?: boolean;
  MasterUserSecretKmsKeyId?: string;
  EngineMode?: string;
  AllowEngineModeChange?: boolean;
  AwsBackupRecoveryPointArn?: string;
  EnableLimitlessDatabase?: boolean;
  CACertificateIdentifier?: string;
  MasterUserAuthenticationType?: MasterUserAuthenticationType;
  EngineLifecycleSupport?: string;
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
export interface ModifyAdditionalStorageVolume {
  VolumeName?: string;
  AllocatedStorage?: number;
  IOPS?: number;
  MaxAllocatedStorage?: number;
  StorageThroughput?: number;
  StorageType?: string;
  SetForDelete?: boolean;
}
export type ModifyAdditionalStorageVolumesList = ModifyAdditionalStorageVolume[];
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
  StorageThroughput?: number;
  OptionGroupName?: string;
  NewDBInstanceIdentifier?: string;
  StorageType?: string;
  TdeCredentialArn?: string;
  TdeCredentialPassword?: string | redacted.Redacted<string>;
  CACertificateIdentifier?: string;
  Domain?: string;
  DomainFqdn?: string;
  DomainOu?: string;
  DomainAuthSecretArn?: string;
  DomainDnsIps?: string[];
  DisableDomain?: boolean;
  CopyTagsToSnapshot?: boolean;
  MonitoringInterval?: number;
  DBPortNumber?: number;
  PubliclyAccessible?: boolean;
  MonitoringRoleArn?: string;
  DomainIAMRoleName?: string;
  PromotionTier?: number;
  EnableIAMDatabaseAuthentication?: boolean;
  DatabaseInsightsMode?: DatabaseInsightsMode;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  CloudwatchLogsExportConfiguration?: CloudwatchLogsExportConfiguration;
  ProcessorFeatures?: ProcessorFeature[];
  UseDefaultProcessorFeatures?: boolean;
  DeletionProtection?: boolean;
  MaxAllocatedStorage?: number;
  CertificateRotationRestart?: boolean;
  ReplicaMode?: ReplicaMode;
  AutomationMode?: AutomationMode;
  ResumeFullAutomationModeMinutes?: number;
  EnableCustomerOwnedIp?: boolean;
  NetworkType?: string;
  AwsBackupRecoveryPointArn?: string;
  ManageMasterUserPassword?: boolean;
  RotateMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
  MultiTenant?: boolean;
  DedicatedLogVolume?: boolean;
  Engine?: string;
  AdditionalStorageVolumes?: ModifyAdditionalStorageVolume[];
  TagSpecifications?: TagSpecification[];
  MasterUserAuthenticationType?: MasterUserAuthenticationType;
  EngineLifecycleSupport?: string;
}
export interface ModifyDBInstanceResult {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
}
export interface ModifyDBParameterGroupMessage {
  DBParameterGroupName?: string;
  Parameters?: Parameter[];
}
export interface DBParameterGroupNameMessage {
  DBParameterGroupName?: string;
}
export interface ModifyDBProxyRequest {
  DBProxyName?: string;
  NewDBProxyName?: string;
  DefaultAuthScheme?: DefaultAuthScheme;
  Auth?: UserAuthConfig[];
  RequireTLS?: boolean;
  IdleClientTimeout?: number;
  DebugLogging?: boolean;
  RoleArn?: string;
  SecurityGroups?: string[];
}
export interface ModifyDBProxyResponse {
  DBProxy?: DBProxy;
}
export interface ModifyDBProxyEndpointRequest {
  DBProxyEndpointName?: string;
  NewDBProxyEndpointName?: string;
  VpcSecurityGroupIds?: string[];
}
export interface ModifyDBProxyEndpointResponse {
  DBProxyEndpoint?: DBProxyEndpoint;
}
export interface ConnectionPoolConfiguration {
  MaxConnectionsPercent?: number;
  MaxIdleConnectionsPercent?: number;
  ConnectionBorrowTimeout?: number;
  SessionPinningFilters?: string[];
  InitQuery?: string | redacted.Redacted<string>;
}
export interface ModifyDBProxyTargetGroupRequest {
  TargetGroupName?: string;
  DBProxyName?: string;
  ConnectionPoolConfig?: ConnectionPoolConfiguration;
  NewName?: string;
}
export interface ModifyDBProxyTargetGroupResponse {
  DBProxyTargetGroup?: DBProxyTargetGroup;
}
export interface RecommendedActionUpdate {
  ActionId?: string;
  Status?: string;
}
export type RecommendedActionUpdateList = RecommendedActionUpdate[];
export interface ModifyDBRecommendationMessage {
  RecommendationId?: string;
  Locale?: string;
  Status?: string;
  RecommendedActionUpdates?: RecommendedActionUpdate[];
}
export interface DBRecommendationMessage {
  DBRecommendation?: DBRecommendation;
}
export interface ModifyDBShardGroupMessage {
  DBShardGroupIdentifier?: string;
  MaxACU?: number;
  MinACU?: number;
  ComputeRedundancy?: number;
}
export interface ModifyDBSnapshotMessage {
  DBSnapshotIdentifier?: string;
  EngineVersion?: string;
  OptionGroupName?: string;
}
export interface ModifyDBSnapshotResult {
  DBSnapshot?: DBSnapshot & {
    AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
  };
}
export interface ModifyDBSnapshotAttributeMessage {
  DBSnapshotIdentifier?: string;
  AttributeName?: string;
  ValuesToAdd?: string[];
  ValuesToRemove?: string[];
}
export interface ModifyDBSnapshotAttributeResult {
  DBSnapshotAttributesResult?: DBSnapshotAttributesResult;
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
export interface ModifyIntegrationMessage {
  IntegrationIdentifier?: string;
  IntegrationName?: string;
  DataFilter?: string;
  Description?: string;
}
export type OptionSettingsList = OptionSetting[];
export interface OptionConfiguration {
  OptionName?: string;
  Port?: number;
  OptionVersion?: string;
  DBSecurityGroupMemberships?: string[];
  VpcSecurityGroupMemberships?: string[];
  OptionSettings?: OptionSetting[];
}
export type OptionConfigurationList = OptionConfiguration[];
export type OptionNamesList = string[];
export interface ModifyOptionGroupMessage {
  OptionGroupName?: string;
  OptionsToInclude?: OptionConfiguration[];
  OptionsToRemove?: string[];
  ApplyImmediately?: boolean;
}
export interface ModifyOptionGroupResult {
  OptionGroup?: OptionGroup;
}
export interface ModifyTenantDatabaseMessage {
  DBInstanceIdentifier?: string;
  TenantDBName?: string;
  MasterUserPassword?: string | redacted.Redacted<string>;
  NewTenantDBName?: string;
  ManageMasterUserPassword?: boolean;
  RotateMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
}
export interface ModifyTenantDatabaseResult {
  TenantDatabase?: TenantDatabase;
}
export interface PromoteReadReplicaMessage {
  DBInstanceIdentifier?: string;
  BackupRetentionPeriod?: number;
  PreferredBackupWindow?: string;
  TagSpecifications?: TagSpecification[];
}
export interface PromoteReadReplicaResult {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
}
export interface PromoteReadReplicaDBClusterMessage {
  DBClusterIdentifier?: string;
}
export interface PromoteReadReplicaDBClusterResult {
  DBCluster?: DBCluster;
}
export interface PurchaseReservedDBInstancesOfferingMessage {
  ReservedDBInstancesOfferingId?: string;
  ReservedDBInstanceId?: string;
  DBInstanceCount?: number;
  Tags?: Tag[];
}
export interface PurchaseReservedDBInstancesOfferingResult {
  ReservedDBInstance?: ReservedDBInstance;
}
export interface RebootDBClusterMessage {
  DBClusterIdentifier?: string;
}
export interface RebootDBClusterResult {
  DBCluster?: DBCluster;
}
export interface RebootDBInstanceMessage {
  DBInstanceIdentifier?: string;
  ForceFailover?: boolean;
}
export interface RebootDBInstanceResult {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
}
export interface RebootDBShardGroupMessage {
  DBShardGroupIdentifier?: string;
}
export interface RegisterDBProxyTargetsRequest {
  DBProxyName?: string;
  TargetGroupName?: string;
  DBInstanceIdentifiers?: string[];
  DBClusterIdentifiers?: string[];
}
export interface RegisterDBProxyTargetsResponse {
  DBProxyTargets?: DBProxyTarget[];
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
export interface RemoveRoleFromDBInstanceMessage {
  DBInstanceIdentifier?: string;
  RoleArn?: string;
  FeatureName?: string;
}
export interface RemoveRoleFromDBInstanceResponse {}
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
export interface RestoreDBClusterFromS3Message {
  AvailabilityZones?: string[];
  BackupRetentionPeriod?: number;
  CharacterSetName?: string;
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
  Tags?: Tag[];
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  EnableIAMDatabaseAuthentication?: boolean;
  SourceEngine?: string;
  SourceEngineVersion?: string;
  S3BucketName?: string;
  S3Prefix?: string;
  S3IngestionRoleArn?: string;
  BacktrackWindow?: number;
  EnableCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
  CopyTagsToSnapshot?: boolean;
  Domain?: string;
  DomainIAMRoleName?: string;
  StorageType?: string;
  NetworkType?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  ManageMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
  EngineLifecycleSupport?: string;
  TagSpecifications?: TagSpecification[];
  AssociatedRoles?: DBClusterAssociatedRole[];
}
export interface RestoreDBClusterFromS3Result {
  DBCluster?: DBCluster;
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
  BacktrackWindow?: number;
  EnableCloudwatchLogsExports?: string[];
  EngineMode?: string;
  ScalingConfiguration?: ScalingConfiguration;
  DBClusterParameterGroupName?: string;
  DeletionProtection?: boolean;
  CopyTagsToSnapshot?: boolean;
  Domain?: string;
  DomainIAMRoleName?: string;
  DBClusterInstanceClass?: string;
  StorageType?: string;
  Iops?: number;
  PubliclyAccessible?: boolean;
  NetworkType?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  RdsCustomClusterConfiguration?: RdsCustomClusterConfiguration;
  MonitoringInterval?: number;
  MonitoringRoleArn?: string;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  BackupRetentionPeriod?: number;
  PreferredBackupWindow?: string;
  EngineLifecycleSupport?: string;
  TagSpecifications?: TagSpecification[];
  EnableVPCNetworking?: boolean;
  EnableInternetAccessGateway?: boolean;
  AssociatedRoles?: DBClusterAssociatedRole[];
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
  BacktrackWindow?: number;
  EnableCloudwatchLogsExports?: string[];
  DBClusterParameterGroupName?: string;
  DeletionProtection?: boolean;
  CopyTagsToSnapshot?: boolean;
  Domain?: string;
  DomainIAMRoleName?: string;
  DBClusterInstanceClass?: string;
  StorageType?: string;
  PubliclyAccessible?: boolean;
  Iops?: number;
  NetworkType?: string;
  SourceDbClusterResourceId?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  ScalingConfiguration?: ScalingConfiguration;
  EngineMode?: string;
  RdsCustomClusterConfiguration?: RdsCustomClusterConfiguration;
  MonitoringInterval?: number;
  MonitoringRoleArn?: string;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  BackupRetentionPeriod?: number;
  PreferredBackupWindow?: string;
  EngineLifecycleSupport?: string;
  TagSpecifications?: TagSpecification[];
  EnableVPCNetworking?: boolean;
  EnableInternetAccessGateway?: boolean;
  AssociatedRoles?: DBClusterAssociatedRole[];
}
export interface RestoreDBClusterToPointInTimeResult {
  DBCluster?: DBCluster;
}
export interface RestoreDBInstanceFromDBSnapshotMessage {
  DBInstanceIdentifier?: string;
  DBSnapshotIdentifier?: string;
  DBInstanceClass?: string;
  Port?: number;
  AvailabilityZone?: string;
  DBSubnetGroupName?: string;
  MultiAZ?: boolean;
  PubliclyAccessible?: boolean;
  AutoMinorVersionUpgrade?: boolean;
  LicenseModel?: string;
  DBName?: string;
  Engine?: string;
  Iops?: number;
  StorageThroughput?: number;
  OptionGroupName?: string;
  Tags?: Tag[];
  StorageType?: string;
  TdeCredentialArn?: string;
  TdeCredentialPassword?: string | redacted.Redacted<string>;
  VpcSecurityGroupIds?: string[];
  Domain?: string;
  DomainFqdn?: string;
  DomainOu?: string;
  DomainAuthSecretArn?: string;
  DomainDnsIps?: string[];
  CopyTagsToSnapshot?: boolean;
  DomainIAMRoleName?: string;
  EnableIAMDatabaseAuthentication?: boolean;
  EnableCloudwatchLogsExports?: string[];
  ProcessorFeatures?: ProcessorFeature[];
  UseDefaultProcessorFeatures?: boolean;
  DBParameterGroupName?: string;
  DeletionProtection?: boolean;
  EnableCustomerOwnedIp?: boolean;
  NetworkType?: string;
  BackupTarget?: string;
  CustomIamInstanceProfile?: string;
  AllocatedStorage?: number;
  DBClusterSnapshotIdentifier?: string;
  BackupRetentionPeriod?: number;
  PreferredBackupWindow?: string;
  DedicatedLogVolume?: boolean;
  CACertificateIdentifier?: string;
  EngineLifecycleSupport?: string;
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
  TagSpecifications?: TagSpecification[];
  ManageMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
}
export interface RestoreDBInstanceFromDBSnapshotResult {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
}
export interface RestoreDBInstanceFromS3Message {
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
  StorageThroughput?: number;
  OptionGroupName?: string;
  PubliclyAccessible?: boolean;
  Tags?: Tag[];
  StorageType?: string;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  CopyTagsToSnapshot?: boolean;
  MonitoringInterval?: number;
  MonitoringRoleArn?: string;
  EnableIAMDatabaseAuthentication?: boolean;
  SourceEngine?: string;
  SourceEngineVersion?: string;
  S3BucketName?: string;
  S3Prefix?: string;
  S3IngestionRoleArn?: string;
  DatabaseInsightsMode?: DatabaseInsightsMode;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  PerformanceInsightsRetentionPeriod?: number;
  EnableCloudwatchLogsExports?: string[];
  ProcessorFeatures?: ProcessorFeature[];
  UseDefaultProcessorFeatures?: boolean;
  DeletionProtection?: boolean;
  MaxAllocatedStorage?: number;
  NetworkType?: string;
  ManageMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
  DedicatedLogVolume?: boolean;
  CACertificateIdentifier?: string;
  EngineLifecycleSupport?: string;
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
  TagSpecifications?: TagSpecification[];
}
export interface RestoreDBInstanceFromS3Result {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
}
export interface RestoreDBInstanceToPointInTimeMessage {
  SourceDBInstanceIdentifier?: string;
  TargetDBInstanceIdentifier?: string;
  RestoreTime?: Date;
  UseLatestRestorableTime?: boolean;
  DBInstanceClass?: string;
  Port?: number;
  AvailabilityZone?: string;
  DBSubnetGroupName?: string;
  MultiAZ?: boolean;
  PubliclyAccessible?: boolean;
  AutoMinorVersionUpgrade?: boolean;
  LicenseModel?: string;
  DBName?: string;
  Engine?: string;
  Iops?: number;
  StorageThroughput?: number;
  OptionGroupName?: string;
  CopyTagsToSnapshot?: boolean;
  Tags?: Tag[];
  StorageType?: string;
  TdeCredentialArn?: string;
  TdeCredentialPassword?: string | redacted.Redacted<string>;
  VpcSecurityGroupIds?: string[];
  Domain?: string;
  DomainIAMRoleName?: string;
  DomainFqdn?: string;
  DomainOu?: string;
  DomainAuthSecretArn?: string;
  DomainDnsIps?: string[];
  EnableIAMDatabaseAuthentication?: boolean;
  EnableCloudwatchLogsExports?: string[];
  ProcessorFeatures?: ProcessorFeature[];
  UseDefaultProcessorFeatures?: boolean;
  DBParameterGroupName?: string;
  DeletionProtection?: boolean;
  SourceDbiResourceId?: string;
  MaxAllocatedStorage?: number;
  EnableCustomerOwnedIp?: boolean;
  NetworkType?: string;
  SourceDBInstanceAutomatedBackupsArn?: string;
  BackupTarget?: string;
  CustomIamInstanceProfile?: string;
  AllocatedStorage?: number;
  BackupRetentionPeriod?: number;
  PreferredBackupWindow?: string;
  DedicatedLogVolume?: boolean;
  CACertificateIdentifier?: string;
  EngineLifecycleSupport?: string;
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
  TagSpecifications?: TagSpecification[];
  ManageMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
}
export interface RestoreDBInstanceToPointInTimeResult {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
}
export interface RevokeDBSecurityGroupIngressMessage {
  DBSecurityGroupName?: string;
  CIDRIP?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupId?: string;
  EC2SecurityGroupOwnerId?: string;
}
export interface RevokeDBSecurityGroupIngressResult {
  DBSecurityGroup?: DBSecurityGroup;
}
export interface StartActivityStreamRequest {
  ResourceArn?: string;
  Mode?: ActivityStreamMode;
  KmsKeyId?: string;
  ApplyImmediately?: boolean;
  EngineNativeAuditFieldsIncluded?: boolean;
}
export interface StartActivityStreamResponse {
  KmsKeyId?: string;
  KinesisStreamName?: string;
  Status?: ActivityStreamStatus;
  Mode?: ActivityStreamMode;
  EngineNativeAuditFieldsIncluded?: boolean;
  ApplyImmediately?: boolean;
}
export interface StartDBClusterMessage {
  DBClusterIdentifier?: string;
}
export interface StartDBClusterResult {
  DBCluster?: DBCluster;
}
export interface StartDBInstanceMessage {
  DBInstanceIdentifier?: string;
}
export interface StartDBInstanceResult {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
}
export interface StartDBInstanceAutomatedBackupsReplicationMessage {
  SourceDBInstanceArn?: string;
  BackupRetentionPeriod?: number;
  KmsKeyId?: string;
  PreSignedUrl?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export interface StartDBInstanceAutomatedBackupsReplicationResult {
  DBInstanceAutomatedBackup?: DBInstanceAutomatedBackup & {
    AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
  };
}
export interface StartExportTaskMessage {
  ExportTaskIdentifier?: string;
  SourceArn?: string;
  S3BucketName?: string;
  IamRoleArn?: string;
  KmsKeyId?: string;
  S3Prefix?: string;
  ExportOnly?: string[];
}
export interface StopActivityStreamRequest {
  ResourceArn?: string;
  ApplyImmediately?: boolean;
}
export interface StopActivityStreamResponse {
  KmsKeyId?: string;
  KinesisStreamName?: string;
  Status?: ActivityStreamStatus;
}
export interface StopDBClusterMessage {
  DBClusterIdentifier?: string;
}
export interface StopDBClusterResult {
  DBCluster?: DBCluster;
}
export interface StopDBInstanceMessage {
  DBInstanceIdentifier?: string;
  DBSnapshotIdentifier?: string;
}
export interface StopDBInstanceResult {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
}
export interface StopDBInstanceAutomatedBackupsReplicationMessage {
  SourceDBInstanceArn?: string;
}
export interface StopDBInstanceAutomatedBackupsReplicationResult {
  DBInstanceAutomatedBackup?: DBInstanceAutomatedBackup & {
    AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
  };
}
export type SwitchoverTimeout = number;
export interface SwitchoverBlueGreenDeploymentRequest {
  BlueGreenDeploymentIdentifier?: string;
  SwitchoverTimeout?: number;
}
export interface SwitchoverBlueGreenDeploymentResponse {
  BlueGreenDeployment?: BlueGreenDeployment;
}
export interface SwitchoverGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
  TargetDbClusterIdentifier?: string;
}
export interface SwitchoverGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export interface SwitchoverReadReplicaMessage {
  DBInstanceIdentifier?: string;
}
export interface SwitchoverReadReplicaResult {
  DBInstance?: DBInstance & {
    PendingModifiedValues: PendingModifiedValues & {
      AdditionalStorageVolumes: (AdditionalStorageVolume & { VolumeName: string })[];
    };
  };
}
export type ExceptionMessage = string;
export type AddRoleToDBClusterError =
  | DBClusterNotFoundFault
  | DBClusterRoleAlreadyExistsFault
  | DBClusterRoleQuotaExceededFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Associates an Identity and Access Management (IAM) role with a DB cluster.
 */
export const addRoleToDBCluster: API.OperationMethod<
  AddRoleToDBClusterMessage,
  AddRoleToDBClusterResponse,
  AddRoleToDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AddRoleToDBClusterMessage>,
  output: __S(1, __c0, 1) as any as S.Schema<AddRoleToDBClusterResponse>,
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

export type AddRoleToDBInstanceError =
  | DBInstanceNotFoundFault
  | DBInstanceRoleAlreadyExistsFault
  | DBInstanceRoleQuotaExceededFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Associates an Amazon Web Services Identity and Access Management (IAM) role with a DB instance.
 *
 * To add a role to a DB instance, the status of the DB instance must be `available`.
 *
 * This command doesn't apply to RDS Custom.
 */
export const addRoleToDBInstance: API.OperationMethod<
  AddRoleToDBInstanceMessage,
  AddRoleToDBInstanceResponse,
  AddRoleToDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<AddRoleToDBInstanceMessage>,
  output: __S(65, __c2, 1) as any as S.Schema<AddRoleToDBInstanceResponse>,
  errors: [
    DBInstanceNotFoundFault,
    DBInstanceRoleAlreadyExistsFault,
    DBInstanceRoleQuotaExceededFault,
    InvalidDBInstanceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddRoleToDBInstance",
}));

export type AddSourceIdentifierToSubscriptionError =
  | SourceNotFoundFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Adds a source identifier to an existing RDS event notification subscription.
 */
export const addSourceIdentifierToSubscription: API.OperationMethod<
  AddSourceIdentifierToSubscriptionMessage,
  AddSourceIdentifierToSubscriptionResult,
  AddSourceIdentifierToSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<AddSourceIdentifierToSubscriptionMessage>,
  output: __S(97, __c3, 1) as any as S.Schema<AddSourceIdentifierToSubscriptionResult>,
  errors: [SourceNotFoundFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddSourceIdentifierToSubscription",
}));

export type AddTagsToResourceError =
  | BlueGreenDeploymentNotFoundFault
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | DBProxyEndpointNotFoundFault
  | DBProxyNotFoundFault
  | DBProxyTargetGroupNotFoundFault
  | DBShardGroupNotFoundFault
  | DBSnapshotNotFoundFault
  | DBSnapshotTenantDatabaseNotFoundFault
  | IntegrationNotFoundFault
  | InvalidDBClusterEndpointStateFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | TenantDatabaseNotFoundFault
  | CommonErrors;
/**
 * Adds metadata tags to an Amazon RDS resource. These tags can also be used with cost allocation reporting to track cost associated with Amazon RDS resources, or used in a Condition statement in an IAM policy for Amazon RDS.
 *
 * For an overview on tagging your relational database resources, see Tagging Amazon RDS Resources or Tagging Amazon Aurora and Amazon RDS Resources.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceMessage,
  AddTagsToResourceResponse,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<AddTagsToResourceMessage>,
  output: __S(193, __c6, 1) as any as S.Schema<AddTagsToResourceResponse>,
  errors: [
    BlueGreenDeploymentNotFoundFault,
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    DBProxyEndpointNotFoundFault,
    DBProxyNotFoundFault,
    DBProxyTargetGroupNotFoundFault,
    DBShardGroupNotFoundFault,
    DBSnapshotNotFoundFault,
    DBSnapshotTenantDatabaseNotFoundFault,
    IntegrationNotFoundFault,
    InvalidDBClusterEndpointStateFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    TenantDatabaseNotFoundFault,
  ],
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
 * Applies a pending maintenance action to a resource (for example, to a DB instance).
 */
export const applyPendingMaintenanceAction: API.OperationMethod<
  ApplyPendingMaintenanceActionMessage,
  ApplyPendingMaintenanceActionResult,
  ApplyPendingMaintenanceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<ApplyPendingMaintenanceActionMessage>,
  output: __S(257, __c8, 1) as any as S.Schema<ApplyPendingMaintenanceActionResult>,
  errors: [InvalidDBClusterStateFault, InvalidDBInstanceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyPendingMaintenanceAction",
}));

export type AuthorizeDBSecurityGroupIngressError =
  | AuthorizationAlreadyExistsFault
  | AuthorizationQuotaExceededFault
  | DBSecurityGroupNotFoundFault
  | InvalidDBSecurityGroupStateFault
  | CommonErrors;
/**
 * Enables ingress to a DBSecurityGroup using one of two forms of authorization. First, EC2 or VPC security groups can be added to the DBSecurityGroup if the application using the database is running on EC2 or VPC instances. Second, IP ranges are available if the application accessing your database is running on the internet. Required parameters for this API are one of CIDR range, EC2SecurityGroupId for VPC, or (EC2SecurityGroupOwnerId and either EC2SecurityGroupName or EC2SecurityGroupId for non-VPC).
 *
 * You can't authorize ingress from an EC2 security group in one Amazon Web Services Region to an Amazon RDS DB instance in another. You can't authorize ingress from a VPC security group in one VPC to an Amazon RDS DB instance in another.
 *
 * For an overview of CIDR ranges, go to the Wikipedia Tutorial.
 *
 * EC2-Classic was retired on August 15, 2022. If you haven't migrated from EC2-Classic to a VPC, we recommend that you migrate as soon as possible. For more information, see Migrate from EC2-Classic to a VPC in the *Amazon EC2 User Guide*, the blog EC2-Classic Networking is Retiring - Here's How to Prepare, and Moving a DB instance not in a VPC into a VPC in the *Amazon RDS User Guide*.
 */
export const authorizeDBSecurityGroupIngress: API.OperationMethod<
  AuthorizeDBSecurityGroupIngressMessage,
  AuthorizeDBSecurityGroupIngressResult,
  AuthorizeDBSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<AuthorizeDBSecurityGroupIngressMessage>,
  output: __S(321, __c10, 1) as any as S.Schema<AuthorizeDBSecurityGroupIngressResult>,
  errors: [
    AuthorizationAlreadyExistsFault,
    AuthorizationQuotaExceededFault,
    DBSecurityGroupNotFoundFault,
    InvalidDBSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeDBSecurityGroupIngress",
}));

export type BacktrackDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Backtracks a DB cluster to a specific time, without creating a new DB cluster.
 *
 * For more information on backtracking, see Backtracking an Aurora DB Cluster in the *Amazon Aurora User Guide*.
 *
 * This action applies only to Aurora MySQL DB clusters.
 */
export const backtrackDBCluster: API.OperationMethod<
  BacktrackDBClusterMessage,
  DBClusterBacktrack,
  BacktrackDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<BacktrackDBClusterMessage>,
  output: __S(416, __c13, 0) as any as S.Schema<DBClusterBacktrack>,
  errors: [DBClusterNotFoundFault, InvalidDBClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BacktrackDBCluster",
}));

export type CancelExportTaskError =
  | ExportTaskNotFoundFault
  | InvalidExportTaskStateFault
  | CommonErrors;
/**
 * Cancels an export task in progress that is exporting a snapshot or cluster to Amazon S3. Any data that has already been written to the S3 bucket isn't removed.
 */
export const cancelExportTask: API.OperationMethod<
  CancelExportTaskMessage,
  ExportTask,
  CancelExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<CancelExportTaskMessage>,
  output: __S(512, __c16, 0) as any as S.Schema<ExportTask>,
  errors: [ExportTaskNotFoundFault, InvalidExportTaskStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelExportTask",
}));

export type CopyDBClusterParameterGroupError =
  | DBParameterGroupAlreadyExistsFault
  | DBParameterGroupNotFoundFault
  | DBParameterGroupQuotaExceededFault
  | CommonErrors;
/**
 * Copies the specified DB cluster parameter group.
 *
 * You can't copy a default DB cluster parameter group. Instead, create a new custom DB cluster parameter group, which copies the default parameters and values for the specified DB cluster parameter group family.
 */
export const copyDBClusterParameterGroup: API.OperationMethod<
  CopyDBClusterParameterGroupMessage,
  CopyDBClusterParameterGroupResult,
  CopyDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<CopyDBClusterParameterGroupMessage>,
  output: __S(545, __c17, 1) as any as S.Schema<CopyDBClusterParameterGroupResult>,
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
 * To copy a DB cluster snapshot from a shared manual DB cluster snapshot, `SourceDBClusterSnapshotIdentifier` must be the Amazon Resource Name (ARN) of the shared DB cluster snapshot.
 *
 * You can copy an encrypted DB cluster snapshot from another Amazon Web Services Region. In that case, the Amazon Web Services Region where you call the `CopyDBClusterSnapshot` operation is the destination Amazon Web Services Region for the encrypted DB cluster snapshot to be copied to. To copy an encrypted DB cluster snapshot from another Amazon Web Services Region, you must provide the following values:
 *
 * - `KmsKeyId` - The Amazon Web Services Key Management System (Amazon Web Services KMS) key identifier for the key to use to encrypt the copy of the DB cluster snapshot in the destination Amazon Web Services Region.
 *
 * - `TargetDBClusterSnapshotIdentifier` - The identifier for the new copy of the DB cluster snapshot in the destination Amazon Web Services Region.
 *
 * - `SourceDBClusterSnapshotIdentifier` - The DB cluster snapshot identifier for the encrypted DB cluster snapshot to be copied. This identifier must be in the ARN format for the source Amazon Web Services Region and is the same value as the `SourceDBClusterSnapshotIdentifier` in the presigned URL.
 *
 * To cancel the copy operation once it is in progress, delete the target DB cluster snapshot identified by `TargetDBClusterSnapshotIdentifier` while that DB cluster snapshot is in "copying" status.
 *
 * For more information on copying encrypted Amazon Aurora DB cluster snapshots from one Amazon Web Services Region to another, see Copying a Snapshot in the *Amazon Aurora User Guide*.
 *
 * For more information on Amazon Aurora DB clusters, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 */
export const copyDBClusterSnapshot: API.OperationMethod<
  CopyDBClusterSnapshotMessage,
  CopyDBClusterSnapshotResult,
  CopyDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<CopyDBClusterSnapshotMessage>,
  output: __S(609, __c19, 1) as any as S.Schema<CopyDBClusterSnapshotResult>,
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
 *
 * You can't copy a default DB parameter group. Instead, create a new custom DB parameter group, which copies the default parameters and values for the specified DB parameter group family.
 */
export const copyDBParameterGroup: API.OperationMethod<
  CopyDBParameterGroupMessage,
  CopyDBParameterGroupResult,
  CopyDBParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<CopyDBParameterGroupMessage>,
  output: __S(705, __c22, 1) as any as S.Schema<CopyDBParameterGroupResult>,
  errors: [
    DBParameterGroupAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBParameterGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyDBParameterGroup",
}));

export type CopyDBSnapshotError =
  | CustomAvailabilityZoneNotFoundFault
  | DBSnapshotAlreadyExistsFault
  | DBSnapshotNotFoundFault
  | InvalidDBSnapshotStateFault
  | KMSKeyNotAccessibleFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Copies the specified DB snapshot. The source DB snapshot must be in the `available` state.
 *
 * You can copy a snapshot from one Amazon Web Services Region to another. In that case, the Amazon Web Services Region where you call the `CopyDBSnapshot` operation is the destination Amazon Web Services Region for the DB snapshot copy.
 *
 * This command doesn't apply to RDS Custom.
 *
 * For more information about copying snapshots, see Copying a DB Snapshot in the *Amazon RDS User Guide*.
 */
export const copyDBSnapshot: API.OperationMethod<
  CopyDBSnapshotMessage,
  CopyDBSnapshotResult,
  CopyDBSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<CopyDBSnapshotMessage>,
  output: __S(769, __c24, 1) as any as S.Schema<CopyDBSnapshotResult>,
  errors: [
    CustomAvailabilityZoneNotFoundFault,
    DBSnapshotAlreadyExistsFault,
    DBSnapshotNotFoundFault,
    InvalidDBSnapshotStateFault,
    KMSKeyNotAccessibleFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyDBSnapshot",
}));

export type CopyOptionGroupError =
  | OptionGroupAlreadyExistsFault
  | OptionGroupNotFoundFault
  | OptionGroupQuotaExceededFault
  | CommonErrors;
/**
 * Copies the specified option group.
 */
export const copyOptionGroup: API.OperationMethod<
  CopyOptionGroupMessage,
  CopyOptionGroupResult,
  CopyOptionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<CopyOptionGroupMessage>,
  output: __S(897, __c28, 1) as any as S.Schema<CopyOptionGroupResult>,
  errors: [OptionGroupAlreadyExistsFault, OptionGroupNotFoundFault, OptionGroupQuotaExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyOptionGroup",
}));

export type CreateBlueGreenDeploymentError =
  | BlueGreenDeploymentAlreadyExistsFault
  | DBClusterNotFoundFault
  | DBClusterParameterGroupNotFoundFault
  | DBClusterQuotaExceededFault
  | DBInstanceNotFoundFault
  | DBParameterGroupNotFoundFault
  | InstanceQuotaExceededFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | SourceClusterNotSupportedFault
  | SourceDatabaseNotSupportedFault
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Creates a blue/green deployment.
 *
 * A blue/green deployment creates a staging environment that copies the production environment. In a blue/green deployment, the blue environment is the current production environment. The green environment is the staging environment, and it stays in sync with the current production environment.
 *
 * You can make changes to the databases in the green environment without affecting production workloads. For example, you can upgrade the major or minor DB engine version, change database parameters, or make schema changes in the staging environment. You can thoroughly test changes in the green environment. When ready, you can switch over the environments to promote the green environment to be the new production environment. The switchover typically takes under a minute.
 *
 * For more information, see Using Amazon RDS Blue/Green Deployments for database updates in the *Amazon RDS User Guide* and Using Amazon RDS Blue/Green Deployments for database updates in the *Amazon Aurora User Guide*.
 */
export const createBlueGreenDeployment: API.OperationMethod<
  CreateBlueGreenDeploymentRequest,
  CreateBlueGreenDeploymentResponse,
  CreateBlueGreenDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1026, __c32, 2) as any as S.Schema<CreateBlueGreenDeploymentRequest>,
  output: __S(1027, __c32, 3) as any as S.Schema<CreateBlueGreenDeploymentResponse>,
  errors: [
    BlueGreenDeploymentAlreadyExistsFault,
    DBClusterNotFoundFault,
    DBClusterParameterGroupNotFoundFault,
    DBClusterQuotaExceededFault,
    DBInstanceNotFoundFault,
    DBParameterGroupNotFoundFault,
    InstanceQuotaExceededFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    SourceClusterNotSupportedFault,
    SourceDatabaseNotSupportedFault,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBlueGreenDeployment",
}));

export type CreateCustomDBEngineVersionError =
  | CreateCustomDBEngineVersionFault
  | CustomDBEngineVersionAlreadyExistsFault
  | CustomDBEngineVersionNotFoundFault
  | CustomDBEngineVersionQuotaExceededFault
  | Ec2ImagePropertiesNotSupportedFault
  | InvalidCustomDBEngineVersionStateFault
  | KMSKeyNotAccessibleFault
  | CommonErrors;
/**
 * Creates a custom DB engine version (CEV).
 */
export const createCustomDBEngineVersion: API.OperationMethod<
  CreateCustomDBEngineVersionMessage,
  DBEngineVersion,
  CreateCustomDBEngineVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<CreateCustomDBEngineVersionMessage>,
  output: __S(1225, __c38, 9) as any as S.Schema<DBEngineVersion>,
  errors: [
    CreateCustomDBEngineVersionFault,
    CustomDBEngineVersionAlreadyExistsFault,
    CustomDBEngineVersionNotFoundFault,
    CustomDBEngineVersionQuotaExceededFault,
    Ec2ImagePropertiesNotSupportedFault,
    InvalidCustomDBEngineVersionStateFault,
    KMSKeyNotAccessibleFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomDBEngineVersion",
}));

export type CreateDBClusterError =
  | DBClusterAlreadyExistsFault
  | DBClusterNotFoundFault
  | DBClusterParameterGroupNotFoundFault
  | DBClusterQuotaExceededFault
  | DBClusterRoleQuotaExceededFault
  | DBInstanceNotFoundFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | DomainNotFoundFault
  | GlobalClusterNotFoundFault
  | InsufficientDBInstanceCapacityFault
  | InsufficientStorageClusterCapacityFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBSubnetGroupFault
  | InvalidDBSubnetGroupStateFault
  | InvalidGlobalClusterStateFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | OptionGroupNotFoundFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | VpcEncryptionControlViolationException
  | InvalidParameterCombination
  | InvalidParameterValue
  | CommonErrors;
/**
 * Creates a new Amazon Aurora DB cluster or Multi-AZ DB cluster.
 *
 * If you create an Aurora DB cluster, the request creates an empty cluster. You must explicitly create the writer instance for your DB cluster using the CreateDBInstance operation. If you create a Multi-AZ DB cluster, the request creates a writer and two reader DB instances for you, each in a different Availability Zone.
 *
 * You can use the `ReplicationSourceIdentifier` parameter to create an Amazon Aurora DB cluster as a read replica of another DB cluster or Amazon RDS for MySQL or PostgreSQL DB instance. For more information about Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * You can also use the `ReplicationSourceIdentifier` parameter to create a Multi-AZ DB cluster read replica with an RDS for MySQL or PostgreSQL DB instance as the source. For more information about Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 *
 * You can use the `WithExpressConfiguration` parameter to create an Aurora DB Cluster with express configuration and create cluster in seconds. Express configuration provides a cluster with a writer instance and feature specific values set to all other input parameters of this API.
 *
 * You can use the `AssociatedRoles` parameter to associate one or more Amazon Web Services Identity and Access Management (IAM) roles with an Aurora DB cluster. Each associated role lets the DB cluster access other Amazon Web Services on your behalf, such as Amazon S3 for data import and export, or Amazon Web Services Lambda for invoking functions.
 */
export const createDBCluster: API.OperationMethod<
  CreateDBClusterMessage,
  CreateDBClusterResult,
  CreateDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<CreateDBClusterMessage>,
  output: __S(1249, __c39, 1) as any as S.Schema<CreateDBClusterResult>,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterNotFoundFault,
    DBClusterParameterGroupNotFoundFault,
    DBClusterQuotaExceededFault,
    DBClusterRoleQuotaExceededFault,
    DBInstanceNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    DomainNotFoundFault,
    GlobalClusterNotFoundFault,
    InsufficientDBInstanceCapacityFault,
    InsufficientStorageClusterCapacityFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBSubnetGroupFault,
    InvalidDBSubnetGroupStateFault,
    InvalidGlobalClusterStateFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    OptionGroupNotFoundFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
    VpcEncryptionControlViolationException,
    InvalidParameterCombination,
    InvalidParameterValue,
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
 * Creates a new custom endpoint and associates it with an Amazon Aurora DB cluster.
 *
 * This action applies only to Aurora DB clusters.
 */
export const createDBClusterEndpoint: API.OperationMethod<
  CreateDBClusterEndpointMessage,
  DBClusterEndpoint,
  CreateDBClusterEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<CreateDBClusterEndpointMessage>,
  output: __S(1568, __c49, 0) as any as S.Schema<DBClusterEndpoint>,
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
 * Parameters in a DB cluster parameter group apply to all of the instances in a DB cluster.
 *
 * A DB cluster parameter group is initially created with the default parameters for the database engine used by instances in the DB cluster. To provide custom values for any of the parameters, you must modify the group after creating it using `ModifyDBClusterParameterGroup`. Once you've created a DB cluster parameter group, you need to associate it with your DB cluster using `ModifyDBCluster`.
 *
 * When you associate a new DB cluster parameter group with a running Aurora DB cluster, reboot the DB instances in the DB cluster without failover for the new DB cluster parameter group and associated settings to take effect.
 *
 * When you associate a new DB cluster parameter group with a running Multi-AZ DB cluster, reboot the DB cluster without failover for the new DB cluster parameter group and associated settings to take effect.
 *
 * After you create a DB cluster parameter group, you should wait at least 5 minutes before creating your first DB cluster that uses that DB cluster parameter group as the default parameter group. This allows Amazon RDS to fully complete the create action before the DB cluster parameter group is used as the default for a new DB cluster. This is especially important for parameters that are critical when creating the default database for a DB cluster, such as the character set for the default database defined by the `character_set_database` parameter. You can use the *Parameter Groups* option of the Amazon RDS console or the `DescribeDBClusterParameters` operation to verify that your DB cluster parameter group has been created or modified.
 *
 * For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 */
export const createDBClusterParameterGroup: API.OperationMethod<
  CreateDBClusterParameterGroupMessage,
  CreateDBClusterParameterGroupResult,
  CreateDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<CreateDBClusterParameterGroupMessage>,
  output: __S(1601, __c50, 1) as any as S.Schema<CreateDBClusterParameterGroupResult>,
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
 *
 * For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 */
export const createDBClusterSnapshot: API.OperationMethod<
  CreateDBClusterSnapshotMessage,
  CreateDBClusterSnapshotResult,
  CreateDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<CreateDBClusterSnapshotMessage>,
  output: __S(1633, __c51, 1) as any as S.Schema<CreateDBClusterSnapshotResult>,
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
  | BackupPolicyNotFoundFault
  | CertificateNotFoundFault
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
  | NetworkTypeNotSupported
  | OptionGroupNotFoundFault
  | ProvisionedIopsNotAvailableInAZFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | TenantDatabaseQuotaExceededFault
  | VpcEncryptionControlViolationException
  | InvalidParameterCombination
  | InvalidParameterValue
  | CommonErrors;
/**
 * Creates a new DB instance.
 *
 * The new DB instance can be an RDS DB instance, or it can be a DB instance in an Aurora DB cluster. For an Aurora DB cluster, you can call this operation multiple times to add more than one DB instance to the cluster.
 *
 * For more information about creating an RDS DB instance, see Creating an Amazon RDS DB instance in the *Amazon RDS User Guide*.
 *
 * For more information about creating a DB instance in an Aurora DB cluster, see Creating an Amazon Aurora DB cluster in the *Amazon Aurora User Guide*.
 */
export const createDBInstance: API.OperationMethod<
  CreateDBInstanceMessage,
  CreateDBInstanceResult,
  CreateDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<CreateDBInstanceMessage>,
  output: __S(1665, __c52, 1) as any as S.Schema<CreateDBInstanceResult>,
  errors: [
    AuthorizationNotFoundFault,
    BackupPolicyNotFoundFault,
    CertificateNotFoundFault,
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
    NetworkTypeNotSupported,
    OptionGroupNotFoundFault,
    ProvisionedIopsNotAvailableInAZFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
    TenantDatabaseQuotaExceededFault,
    VpcEncryptionControlViolationException,
    InvalidParameterCombination,
    InvalidParameterValue,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBInstance",
}));

export type CreateDBInstanceReadReplicaError =
  | CertificateNotFoundFault
  | DBClusterNotFoundFault
  | DBInstanceAlreadyExistsFault
  | DBInstanceNotFoundFault
  | DBParameterGroupNotFoundFault
  | DBSecurityGroupNotFoundFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotAllowedFault
  | DBSubnetGroupNotFoundFault
  | DomainNotFoundFault
  | InstanceQuotaExceededFault
  | InsufficientDBInstanceCapacityFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBSubnetGroupFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | OptionGroupNotFoundFault
  | ProvisionedIopsNotAvailableInAZFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | TenantDatabaseQuotaExceededFault
  | VpcEncryptionControlViolationException
  | CommonErrors;
/**
 * Creates a new DB instance that acts as a read replica for an existing source DB instance or Multi-AZ DB cluster. You can create a read replica for a DB instance running Db2, MariaDB, MySQL, Oracle, PostgreSQL, or SQL Server. You can create a read replica for a Multi-AZ DB cluster running MySQL or PostgreSQL. For more information, see Working with read replicas and Migrating from a Multi-AZ DB cluster to a DB instance using a read replica in the *Amazon RDS User Guide*.
 *
 * Amazon Aurora doesn't support this operation. To create a DB instance for an Aurora DB cluster, use the `CreateDBInstance` operation.
 *
 * RDS creates read replicas with backups disabled. All other attributes (including DB security groups and DB parameter groups) are inherited from the source DB instance or cluster, except as specified.
 *
 * Your source DB instance or cluster must have backup retention enabled.
 */
export const createDBInstanceReadReplica: API.OperationMethod<
  CreateDBInstanceReadReplicaMessage,
  CreateDBInstanceReadReplicaResult,
  CreateDBInstanceReadReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<CreateDBInstanceReadReplicaMessage>,
  output: __S(1857, __c58, 1) as any as S.Schema<CreateDBInstanceReadReplicaResult>,
  errors: [
    CertificateNotFoundFault,
    DBClusterNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBInstanceNotFoundFault,
    DBParameterGroupNotFoundFault,
    DBSecurityGroupNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotAllowedFault,
    DBSubnetGroupNotFoundFault,
    DomainNotFoundFault,
    InstanceQuotaExceededFault,
    InsufficientDBInstanceCapacityFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBSubnetGroupFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    OptionGroupNotFoundFault,
    ProvisionedIopsNotAvailableInAZFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
    TenantDatabaseQuotaExceededFault,
    VpcEncryptionControlViolationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBInstanceReadReplica",
}));

export type CreateDBParameterGroupError =
  | DBParameterGroupAlreadyExistsFault
  | DBParameterGroupQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new DB parameter group.
 *
 * A DB parameter group is initially created with the default parameters for the database engine used by the DB instance. To provide custom values for any of the parameters, you must modify the group after creating it using `ModifyDBParameterGroup`. Once you've created a DB parameter group, you need to associate it with your DB instance using `ModifyDBInstance`. When you associate a new DB parameter group with a running DB instance, you need to reboot the DB instance without failover for the new DB parameter group and associated settings to take effect.
 *
 * This command doesn't apply to RDS Custom.
 */
export const createDBParameterGroup: API.OperationMethod<
  CreateDBParameterGroupMessage,
  CreateDBParameterGroupResult,
  CreateDBParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<CreateDBParameterGroupMessage>,
  output: __S(1889, __c59, 1) as any as S.Schema<CreateDBParameterGroupResult>,
  errors: [DBParameterGroupAlreadyExistsFault, DBParameterGroupQuotaExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBParameterGroup",
}));

export type CreateDBProxyError =
  | DBProxyAlreadyExistsFault
  | DBProxyQuotaExceededFault
  | InvalidSubnet
  | CommonErrors;
/**
 * Creates a new DB proxy.
 */
export const createDBProxy: API.OperationMethod<
  CreateDBProxyRequest,
  CreateDBProxyResponse,
  CreateDBProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<CreateDBProxyRequest>,
  output: __S(1921, __c60, 1) as any as S.Schema<CreateDBProxyResponse>,
  errors: [DBProxyAlreadyExistsFault, DBProxyQuotaExceededFault, InvalidSubnet],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBProxy",
}));

export type CreateDBProxyEndpointError =
  | DBProxyEndpointAlreadyExistsFault
  | DBProxyEndpointQuotaExceededFault
  | DBProxyNotFoundFault
  | InvalidDBProxyStateFault
  | InvalidSubnet
  | CommonErrors;
/**
 * Creates a `DBProxyEndpoint`. Only applies to proxies that are associated with Aurora DB clusters. You can use DB proxy endpoints to specify read/write or read-only access to the DB cluster. You can also use DB proxy endpoints to access a DB proxy through a different VPC than the proxy's default VPC.
 */
export const createDBProxyEndpoint: API.OperationMethod<
  CreateDBProxyEndpointRequest,
  CreateDBProxyEndpointResponse,
  CreateDBProxyEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<CreateDBProxyEndpointRequest>,
  output: __S(2017, __c63, 1) as any as S.Schema<CreateDBProxyEndpointResponse>,
  errors: [
    DBProxyEndpointAlreadyExistsFault,
    DBProxyEndpointQuotaExceededFault,
    DBProxyNotFoundFault,
    InvalidDBProxyStateFault,
    InvalidSubnet,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBProxyEndpoint",
}));

export type CreateDBSecurityGroupError =
  | DBSecurityGroupAlreadyExistsFault
  | DBSecurityGroupNotSupportedFault
  | DBSecurityGroupQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new DB security group. DB security groups control access to a DB instance.
 *
 * A DB security group controls access to EC2-Classic DB instances that are not in a VPC.
 *
 * EC2-Classic was retired on August 15, 2022. If you haven't migrated from EC2-Classic to a VPC, we recommend that you migrate as soon as possible. For more information, see Migrate from EC2-Classic to a VPC in the *Amazon EC2 User Guide*, the blog EC2-Classic Networking is Retiring - Here's How to Prepare, and Moving a DB instance not in a VPC into a VPC in the *Amazon RDS User Guide*.
 */
export const createDBSecurityGroup: API.OperationMethod<
  CreateDBSecurityGroupMessage,
  CreateDBSecurityGroupResult,
  CreateDBSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<CreateDBSecurityGroupMessage>,
  output: __S(2081, __c65, 1) as any as S.Schema<CreateDBSecurityGroupResult>,
  errors: [
    DBSecurityGroupAlreadyExistsFault,
    DBSecurityGroupNotSupportedFault,
    DBSecurityGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBSecurityGroup",
}));

export type CreateDBShardGroupError =
  | DBClusterNotFoundFault
  | DBShardGroupAlreadyExistsFault
  | InvalidDBClusterStateFault
  | InvalidVPCNetworkStateFault
  | MaxDBShardGroupLimitReached
  | NetworkTypeNotSupported
  | UnsupportedDBEngineVersionFault
  | CommonErrors;
/**
 * Creates a new DB shard group for Aurora Limitless Database. You must enable Aurora Limitless Database to create a DB shard group.
 *
 * Valid for: Aurora DB clusters only
 */
export const createDBShardGroup: API.OperationMethod<
  CreateDBShardGroupMessage,
  DBShardGroup,
  CreateDBShardGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<CreateDBShardGroupMessage>,
  output: __S(2144, __c67, 0) as any as S.Schema<DBShardGroup>,
  errors: [
    DBClusterNotFoundFault,
    DBShardGroupAlreadyExistsFault,
    InvalidDBClusterStateFault,
    InvalidVPCNetworkStateFault,
    MaxDBShardGroupLimitReached,
    NetworkTypeNotSupported,
    UnsupportedDBEngineVersionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBShardGroup",
}));

export type CreateDBSnapshotError =
  | DBInstanceNotFoundFault
  | DBSnapshotAlreadyExistsFault
  | InvalidDBInstanceStateFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Creates a snapshot of a DB instance. The source DB instance must be in the `available` or `storage-optimization` state.
 */
export const createDBSnapshot: API.OperationMethod<
  CreateDBSnapshotMessage,
  CreateDBSnapshotResult,
  CreateDBSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<CreateDBSnapshotMessage>,
  output: __S(2177, __c68, 1) as any as S.Schema<CreateDBSnapshotResult>,
  errors: [
    DBInstanceNotFoundFault,
    DBSnapshotAlreadyExistsFault,
    InvalidDBInstanceStateFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBSnapshot",
}));

export type CreateDBSubnetGroupError =
  | DBSubnetGroupAlreadyExistsFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupQuotaExceededFault
  | DBSubnetQuotaExceededFault
  | InvalidSubnet
  | CommonErrors;
/**
 * Creates a new DB subnet group. DB subnet groups must contain at least one subnet in at least two AZs in the Amazon Web Services Region.
 */
export const createDBSubnetGroup: API.OperationMethod<
  CreateDBSubnetGroupMessage,
  CreateDBSubnetGroupResult,
  CreateDBSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<CreateDBSubnetGroupMessage>,
  output: __S(2209, __c69, 1) as any as S.Schema<CreateDBSubnetGroupResult>,
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
 * Creates an RDS event notification subscription. This operation requires a topic Amazon Resource Name (ARN) created by either the RDS console, the SNS console, or the SNS API. To obtain an ARN with SNS, you must create a topic in Amazon SNS and subscribe to the topic. The ARN is displayed in the SNS console.
 *
 * You can specify the type of source (`SourceType`) that you want to be notified of and provide a list of RDS sources (`SourceIds`) that triggers the events. You can also provide a list of event categories (`EventCategories`) for events that you want to be notified of. For example, you can specify `SourceType` = `db-instance`, `SourceIds` = `mydbinstance1`, `mydbinstance2` and `EventCategories` = `Availability`, `Backup`.
 *
 * If you specify both the `SourceType` and `SourceIds`, such as `SourceType` = `db-instance` and `SourceIds` = `myDBInstance1`, you are notified of all the `db-instance` events for the specified source. If you specify a `SourceType` but do not specify `SourceIds`, you receive notice of the events for that source type for all your RDS sources. If you don't specify either the SourceType or the `SourceIds`, you are notified of events generated from all RDS sources belonging to your customer account.
 *
 * For more information about subscribing to an event for RDS DB engines, see Subscribing to Amazon RDS event notification in the *Amazon RDS User Guide*.
 *
 * For more information about subscribing to an event for Aurora DB engines, see Subscribing to Amazon RDS event notification in the *Amazon Aurora User Guide*.
 */
export const createEventSubscription: API.OperationMethod<
  CreateEventSubscriptionMessage,
  CreateEventSubscriptionResult,
  CreateEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<CreateEventSubscriptionMessage>,
  output: __S(2273, __c71, 1) as any as S.Schema<CreateEventSubscriptionResult>,
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
  | InvalidDBShardGroupStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Creates an Aurora global database spread across multiple Amazon Web Services Regions. The global database contains a single primary cluster with read-write capability, and a read-only secondary cluster that receives data from the primary cluster through high-speed replication performed by the Aurora storage subsystem.
 *
 * You can create a global database that is initially empty, and then create the primary and secondary DB clusters in the global database. Or you can specify an existing Aurora cluster during the create operation, and this cluster becomes the primary cluster of the global database.
 *
 * This operation applies only to Aurora DB clusters.
 */
export const createGlobalCluster: API.OperationMethod<
  CreateGlobalClusterMessage,
  CreateGlobalClusterResult,
  CreateGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<CreateGlobalClusterMessage>,
  output: __S(2305, __c72, 1) as any as S.Schema<CreateGlobalClusterResult>,
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterAlreadyExistsFault,
    GlobalClusterQuotaExceededFault,
    InvalidDBClusterStateFault,
    InvalidDBShardGroupStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlobalCluster",
}));

export type CreateIntegrationError =
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | IntegrationAlreadyExistsFault
  | IntegrationConflictOperationFault
  | IntegrationQuotaExceededFault
  | KMSKeyNotAccessibleFault
  | CommonErrors;
/**
 * Creates a zero-ETL integration with Amazon Redshift.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationMessage,
  Integration,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<CreateIntegrationMessage>,
  output: __S(2403, __c75, 3) as any as S.Schema<Integration>,
  errors: [
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    IntegrationAlreadyExistsFault,
    IntegrationConflictOperationFault,
    IntegrationQuotaExceededFault,
    KMSKeyNotAccessibleFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegration",
}));

export type CreateOptionGroupError =
  | OptionGroupAlreadyExistsFault
  | OptionGroupQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new option group. You can create up to 20 option groups.
 *
 * This command doesn't apply to RDS Custom.
 */
export const createOptionGroup: API.OperationMethod<
  CreateOptionGroupMessage,
  CreateOptionGroupResult,
  CreateOptionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<CreateOptionGroupMessage>,
  output: __S(2433, __c76, 1) as any as S.Schema<CreateOptionGroupResult>,
  errors: [OptionGroupAlreadyExistsFault, OptionGroupQuotaExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOptionGroup",
}));

export type CreateTenantDatabaseError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | KMSKeyNotAccessibleFault
  | TenantDatabaseAlreadyExistsFault
  | TenantDatabaseQuotaExceededFault
  | CommonErrors;
/**
 * Creates a tenant database in a DB instance that uses the multi-tenant configuration. Only RDS for Oracle container database (CDB) instances are supported.
 */
export const createTenantDatabase: API.OperationMethod<
  CreateTenantDatabaseMessage,
  CreateTenantDatabaseResult,
  CreateTenantDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<CreateTenantDatabaseMessage>,
  output: __S(2465, __c77, 1) as any as S.Schema<CreateTenantDatabaseResult>,
  errors: [
    DBInstanceNotFoundFault,
    InvalidDBInstanceStateFault,
    KMSKeyNotAccessibleFault,
    TenantDatabaseAlreadyExistsFault,
    TenantDatabaseQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTenantDatabase",
}));

export type DeleteBlueGreenDeploymentError =
  | BlueGreenDeploymentNotFoundFault
  | InvalidBlueGreenDeploymentStateFault
  | CommonErrors;
/**
 * Deletes a blue/green deployment.
 *
 * For more information, see Using Amazon RDS Blue/Green Deployments for database updates in the *Amazon RDS User Guide* and Using Amazon RDS Blue/Green Deployments for database updates in the *Amazon Aurora User Guide*.
 */
export const deleteBlueGreenDeployment: API.OperationMethod<
  DeleteBlueGreenDeploymentRequest,
  DeleteBlueGreenDeploymentResponse,
  DeleteBlueGreenDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<DeleteBlueGreenDeploymentRequest>,
  output: __S(2529, __c79, 1) as any as S.Schema<DeleteBlueGreenDeploymentResponse>,
  errors: [BlueGreenDeploymentNotFoundFault, InvalidBlueGreenDeploymentStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBlueGreenDeployment",
}));

export type DeleteCustomDBEngineVersionError =
  | CustomDBEngineVersionNotFoundFault
  | InvalidCustomDBEngineVersionStateFault
  | CommonErrors;
/**
 * Deletes a custom engine version. To run this command, make sure you meet the following prerequisites:
 *
 * - The CEV must not be the default for RDS Custom. If it is, change the default before running this command.
 *
 * - The CEV must not be associated with an RDS Custom DB instance, RDS Custom instance snapshot, or automated backup of your RDS Custom instance.
 *
 * Typically, deletion takes a few minutes.
 *
 * The MediaImport service that imports files from Amazon S3 to create CEVs isn't integrated with Amazon Web Services CloudTrail. If you turn on data logging for Amazon RDS in CloudTrail, calls to the `DeleteCustomDbEngineVersion` event aren't logged. However, you might see calls from the API gateway that accesses your Amazon S3 bucket. These calls originate from the MediaImport service for the `DeleteCustomDbEngineVersion` event.
 *
 * For more information, see Deleting a CEV in the *Amazon RDS User Guide*.
 */
export const deleteCustomDBEngineVersion: API.OperationMethod<
  DeleteCustomDBEngineVersionMessage,
  DBEngineVersion,
  DeleteCustomDBEngineVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<DeleteCustomDBEngineVersionMessage>,
  output: __S(1225, __c38, 9) as any as S.Schema<DBEngineVersion>,
  errors: [CustomDBEngineVersionNotFoundFault, InvalidCustomDBEngineVersionStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomDBEngineVersion",
}));

export type DeleteDBClusterError =
  | DBClusterAutomatedBackupQuotaExceededFault
  | DBClusterNotFoundFault
  | DBClusterSnapshotAlreadyExistsFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBClusterStateFault
  | InvalidGlobalClusterStateFault
  | KMSKeyNotAccessibleFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * The DeleteDBCluster action deletes a previously provisioned DB cluster. When you delete a DB cluster, all automated backups for that DB cluster are deleted and can't be recovered. Manual DB cluster snapshots of the specified DB cluster are not deleted.
 *
 * If you're deleting a Multi-AZ DB cluster with read replicas, all cluster members are terminated and read replicas are promoted to standalone instances.
 *
 * For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 */
export const deleteDBCluster: API.OperationMethod<
  DeleteDBClusterMessage,
  DeleteDBClusterResult,
  DeleteDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<DeleteDBClusterMessage>,
  output: __S(2593, __c81, 1) as any as S.Schema<DeleteDBClusterResult>,
  errors: [
    DBClusterAutomatedBackupQuotaExceededFault,
    DBClusterNotFoundFault,
    DBClusterSnapshotAlreadyExistsFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBClusterStateFault,
    InvalidGlobalClusterStateFault,
    KMSKeyNotAccessibleFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBCluster",
}));

export type DeleteDBClusterAutomatedBackupError =
  | DBClusterAutomatedBackupNotFoundFault
  | InvalidDBClusterAutomatedBackupStateFault
  | CommonErrors;
/**
 * Deletes automated backups using the `DbClusterResourceId` value of the source DB cluster or the Amazon Resource Name (ARN) of the automated backups.
 */
export const deleteDBClusterAutomatedBackup: API.OperationMethod<
  DeleteDBClusterAutomatedBackupMessage,
  DeleteDBClusterAutomatedBackupResult,
  DeleteDBClusterAutomatedBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<DeleteDBClusterAutomatedBackupMessage>,
  output: __S(2625, __c82, 1) as any as S.Schema<DeleteDBClusterAutomatedBackupResult>,
  errors: [DBClusterAutomatedBackupNotFoundFault, InvalidDBClusterAutomatedBackupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBClusterAutomatedBackup",
}));

export type DeleteDBClusterEndpointError =
  | DBClusterEndpointNotFoundFault
  | InvalidDBClusterEndpointStateFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Deletes a custom endpoint and removes it from an Amazon Aurora DB cluster.
 *
 * This action only applies to Aurora DB clusters.
 */
export const deleteDBClusterEndpoint: API.OperationMethod<
  DeleteDBClusterEndpointMessage,
  DBClusterEndpoint,
  DeleteDBClusterEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<DeleteDBClusterEndpointMessage>,
  output: __S(1568, __c49, 0) as any as S.Schema<DBClusterEndpoint>,
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
 * Deletes a specified DB cluster parameter group. The DB cluster parameter group to be deleted can't be associated with any DB clusters.
 *
 * For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 */
export const deleteDBClusterParameterGroup: API.OperationMethod<
  DeleteDBClusterParameterGroupMessage,
  DeleteDBClusterParameterGroupResponse,
  DeleteDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<DeleteDBClusterParameterGroupMessage>,
  output: __S(2753, __c86, 1) as any as S.Schema<DeleteDBClusterParameterGroupResponse>,
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
 * Deletes a DB cluster snapshot. If the snapshot is being copied, the copy operation is terminated.
 *
 * The DB cluster snapshot must be in the `available` state to be deleted.
 *
 * For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 */
export const deleteDBClusterSnapshot: API.OperationMethod<
  DeleteDBClusterSnapshotMessage,
  DeleteDBClusterSnapshotResult,
  DeleteDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<DeleteDBClusterSnapshotMessage>,
  output: __S(2785, __c87, 1) as any as S.Schema<DeleteDBClusterSnapshotResult>,
  errors: [DBClusterSnapshotNotFoundFault, InvalidDBClusterSnapshotStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBClusterSnapshot",
}));

export type DeleteDBInstanceError =
  | DBInstanceAutomatedBackupQuotaExceededFault
  | DBInstanceNotFoundFault
  | DBSnapshotAlreadyExistsFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | KMSKeyNotAccessibleFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Deletes a previously provisioned DB instance. When you delete a DB instance, all automated backups for that instance are deleted and can't be recovered. However, manual DB snapshots of the DB instance aren't deleted.
 *
 * If you request a final DB snapshot, the status of the Amazon RDS DB instance is `deleting` until the DB snapshot is created. This operation can't be canceled or reverted after it begins. To monitor the status of this operation, use `DescribeDBInstance`.
 *
 * When a DB instance is in a failure state and has a status of `failed`, `incompatible-restore`, or `incompatible-network`, you can only delete it when you skip creation of the final snapshot with the `SkipFinalSnapshot` parameter.
 *
 * If the specified DB instance is part of an Amazon Aurora DB cluster, you can't delete the DB instance if both of the following conditions are true:
 *
 * - The DB cluster is a read replica of another Amazon Aurora DB cluster.
 *
 * - The DB instance is the only instance in the DB cluster.
 *
 * To delete a DB instance in this case, first use the `PromoteReadReplicaDBCluster` operation to promote the DB cluster so that it's no longer a read replica. After the promotion completes, use the `DeleteDBInstance` operation to delete the final instance in the DB cluster.
 *
 * For RDS Custom DB instances, deleting the DB instance permanently deletes the EC2 instance and the associated EBS volumes. Make sure that you don't terminate or delete these resources before you delete the DB instance. Otherwise, deleting the DB instance and creation of the final snapshot might fail.
 */
export const deleteDBInstance: API.OperationMethod<
  DeleteDBInstanceMessage,
  DeleteDBInstanceResult,
  DeleteDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<DeleteDBInstanceMessage>,
  output: __S(2817, __c88, 1) as any as S.Schema<DeleteDBInstanceResult>,
  errors: [
    DBInstanceAutomatedBackupQuotaExceededFault,
    DBInstanceNotFoundFault,
    DBSnapshotAlreadyExistsFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    KMSKeyNotAccessibleFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBInstance",
}));

export type DeleteDBInstanceAutomatedBackupError =
  | DBInstanceAutomatedBackupNotFoundFault
  | InvalidDBInstanceAutomatedBackupStateFault
  | CommonErrors;
/**
 * Deletes automated backups using the `DbiResourceId` value of the source DB instance or the Amazon Resource Name (ARN) of the automated backups.
 */
export const deleteDBInstanceAutomatedBackup: API.OperationMethod<
  DeleteDBInstanceAutomatedBackupMessage,
  DeleteDBInstanceAutomatedBackupResult,
  DeleteDBInstanceAutomatedBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<DeleteDBInstanceAutomatedBackupMessage>,
  output: __S(2849, __c89, 1) as any as S.Schema<DeleteDBInstanceAutomatedBackupResult>,
  errors: [DBInstanceAutomatedBackupNotFoundFault, InvalidDBInstanceAutomatedBackupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBInstanceAutomatedBackup",
}));

export type DeleteDBParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Deletes a specified DB parameter group. The DB parameter group to be deleted can't be associated with any DB instances.
 */
export const deleteDBParameterGroup: API.OperationMethod<
  DeleteDBParameterGroupMessage,
  DeleteDBParameterGroupResponse,
  DeleteDBParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<DeleteDBParameterGroupMessage>,
  output: __S(2913, __c91, 1) as any as S.Schema<DeleteDBParameterGroupResponse>,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBParameterGroup",
}));

export type DeleteDBProxyError = DBProxyNotFoundFault | InvalidDBProxyStateFault | CommonErrors;
/**
 * Deletes an existing DB proxy.
 */
export const deleteDBProxy: API.OperationMethod<
  DeleteDBProxyRequest,
  DeleteDBProxyResponse,
  DeleteDBProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<DeleteDBProxyRequest>,
  output: __S(2945, __c92, 1) as any as S.Schema<DeleteDBProxyResponse>,
  errors: [DBProxyNotFoundFault, InvalidDBProxyStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBProxy",
}));

export type DeleteDBProxyEndpointError =
  | DBProxyEndpointNotFoundFault
  | InvalidDBProxyEndpointStateFault
  | CommonErrors;
/**
 * Deletes a `DBProxyEndpoint`. Doing so removes the ability to access the DB proxy using the endpoint that you defined. The endpoint that you delete might have provided capabilities such as read/write or read-only operations, or using a different VPC than the DB proxy's default VPC.
 */
export const deleteDBProxyEndpoint: API.OperationMethod<
  DeleteDBProxyEndpointRequest,
  DeleteDBProxyEndpointResponse,
  DeleteDBProxyEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<DeleteDBProxyEndpointRequest>,
  output: __S(2977, __c93, 1) as any as S.Schema<DeleteDBProxyEndpointResponse>,
  errors: [DBProxyEndpointNotFoundFault, InvalidDBProxyEndpointStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBProxyEndpoint",
}));

export type DeleteDBSecurityGroupError =
  | DBSecurityGroupNotFoundFault
  | InvalidDBSecurityGroupStateFault
  | CommonErrors;
/**
 * Deletes a DB security group.
 *
 * The specified DB security group must not be associated with any DB instances.
 *
 * EC2-Classic was retired on August 15, 2022. If you haven't migrated from EC2-Classic to a VPC, we recommend that you migrate as soon as possible. For more information, see Migrate from EC2-Classic to a VPC in the *Amazon EC2 User Guide*, the blog EC2-Classic Networking is Retiring - Here's How to Prepare, and Moving a DB instance not in a VPC into a VPC in the *Amazon RDS User Guide*.
 */
export const deleteDBSecurityGroup: API.OperationMethod<
  DeleteDBSecurityGroupMessage,
  DeleteDBSecurityGroupResponse,
  DeleteDBSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<DeleteDBSecurityGroupMessage>,
  output: __S(3009, __c94, 1) as any as S.Schema<DeleteDBSecurityGroupResponse>,
  errors: [DBSecurityGroupNotFoundFault, InvalidDBSecurityGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBSecurityGroup",
}));

export type DeleteDBShardGroupError =
  | DBShardGroupNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBShardGroupStateFault
  | CommonErrors;
/**
 * Deletes an Aurora Limitless Database DB shard group.
 */
export const deleteDBShardGroup: API.OperationMethod<
  DeleteDBShardGroupMessage,
  DBShardGroup,
  DeleteDBShardGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<DeleteDBShardGroupMessage>,
  output: __S(2144, __c67, 0) as any as S.Schema<DBShardGroup>,
  errors: [DBShardGroupNotFoundFault, InvalidDBClusterStateFault, InvalidDBShardGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBShardGroup",
}));

export type DeleteDBSnapshotError =
  | DBSnapshotNotFoundFault
  | InvalidDBSnapshotStateFault
  | CommonErrors;
/**
 * Deletes a DB snapshot. If the snapshot is being copied, the copy operation is terminated.
 *
 * The DB snapshot must be in the `available` state to be deleted.
 */
export const deleteDBSnapshot: API.OperationMethod<
  DeleteDBSnapshotMessage,
  DeleteDBSnapshotResult,
  DeleteDBSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<DeleteDBSnapshotMessage>,
  output: __S(3073, __c96, 1) as any as S.Schema<DeleteDBSnapshotResult>,
  errors: [DBSnapshotNotFoundFault, InvalidDBSnapshotStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBSnapshot",
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
  input: __S(3104, __c97, 0) as any as S.Schema<DeleteDBSubnetGroupMessage>,
  output: __S(3105, __c97, 1) as any as S.Schema<DeleteDBSubnetGroupResponse>,
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
 * Deletes an RDS event notification subscription.
 */
export const deleteEventSubscription: API.OperationMethod<
  DeleteEventSubscriptionMessage,
  DeleteEventSubscriptionResult,
  DeleteEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<DeleteEventSubscriptionMessage>,
  output: __S(3137, __c98, 1) as any as S.Schema<DeleteEventSubscriptionResult>,
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
 * Deletes a global database cluster. The primary and secondary clusters must already be detached or destroyed first.
 *
 * This action only applies to Aurora DB clusters.
 */
export const deleteGlobalCluster: API.OperationMethod<
  DeleteGlobalClusterMessage,
  DeleteGlobalClusterResult,
  DeleteGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3168, __c99, 0) as any as S.Schema<DeleteGlobalClusterMessage>,
  output: __S(3169, __c99, 1) as any as S.Schema<DeleteGlobalClusterResult>,
  errors: [GlobalClusterNotFoundFault, InvalidGlobalClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlobalCluster",
}));

export type DeleteIntegrationError =
  | IntegrationConflictOperationFault
  | IntegrationNotFoundFault
  | InvalidIntegrationStateFault
  | CommonErrors;
/**
 * Deletes a zero-ETL integration with Amazon Redshift.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationMessage,
  Integration,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<DeleteIntegrationMessage>,
  output: __S(2403, __c75, 3) as any as S.Schema<Integration>,
  errors: [
    IntegrationConflictOperationFault,
    IntegrationNotFoundFault,
    InvalidIntegrationStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
}));

export type DeleteOptionGroupError =
  | InvalidOptionGroupStateFault
  | OptionGroupNotFoundFault
  | CommonErrors;
/**
 * Deletes an existing option group.
 */
export const deleteOptionGroup: API.OperationMethod<
  DeleteOptionGroupMessage,
  DeleteOptionGroupResponse,
  DeleteOptionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<DeleteOptionGroupMessage>,
  output: __S(3233, __c101, 1) as any as S.Schema<DeleteOptionGroupResponse>,
  errors: [InvalidOptionGroupStateFault, OptionGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOptionGroup",
}));

export type DeleteTenantDatabaseError =
  | DBInstanceNotFoundFault
  | DBSnapshotAlreadyExistsFault
  | InvalidDBInstanceStateFault
  | TenantDatabaseNotFoundFault
  | CommonErrors;
/**
 * Deletes a tenant database from your DB instance. This command only applies to RDS for Oracle container database (CDB) instances.
 *
 * You can't delete a tenant database when it is the only tenant in the DB instance.
 */
export const deleteTenantDatabase: API.OperationMethod<
  DeleteTenantDatabaseMessage,
  DeleteTenantDatabaseResult,
  DeleteTenantDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3264, __c102, 0) as any as S.Schema<DeleteTenantDatabaseMessage>,
  output: __S(3265, __c102, 1) as any as S.Schema<DeleteTenantDatabaseResult>,
  errors: [
    DBInstanceNotFoundFault,
    DBSnapshotAlreadyExistsFault,
    InvalidDBInstanceStateFault,
    TenantDatabaseNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTenantDatabase",
}));

export type DeregisterDBProxyTargetsError =
  | DBProxyNotFoundFault
  | DBProxyTargetGroupNotFoundFault
  | DBProxyTargetNotFoundFault
  | InvalidDBProxyStateFault
  | CommonErrors;
/**
 * Remove the association between one or more `DBProxyTarget` data structures and a `DBProxyTargetGroup`.
 */
export const deregisterDBProxyTargets: API.OperationMethod<
  DeregisterDBProxyTargetsRequest,
  DeregisterDBProxyTargetsResponse,
  DeregisterDBProxyTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<DeregisterDBProxyTargetsRequest>,
  output: __S(3297, __c103, 1) as any as S.Schema<DeregisterDBProxyTargetsResponse>,
  errors: [
    DBProxyNotFoundFault,
    DBProxyTargetGroupNotFoundFault,
    DBProxyTargetNotFoundFault,
    InvalidDBProxyStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterDBProxyTargets",
}));

export type DescribeAccountAttributesError = CommonErrors;
/**
 * Lists all of the attributes for a customer account. The attributes include Amazon RDS quotas for the account, such as the number of DB instances allowed. The description for a quota includes the quota name, current usage toward that quota, and the quota's maximum value.
 *
 * This command doesn't take any parameters.
 */
export const describeAccountAttributes: API.OperationMethod<
  DescribeAccountAttributesMessage,
  AccountAttributesMessage,
  DescribeAccountAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<DescribeAccountAttributesMessage>,
  output: __S(3331, __c104, 3) as any as S.Schema<AccountAttributesMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAttributes",
}));

export type DescribeBlueGreenDeploymentsError = BlueGreenDeploymentNotFoundFault | CommonErrors;
/**
 * Describes one or more blue/green deployments.
 *
 * For more information, see Using Amazon RDS Blue/Green Deployments for database updates in the *Amazon RDS User Guide* and Using Amazon RDS Blue/Green Deployments for database updates in the *Amazon Aurora User Guide*.
 */
export const describeBlueGreenDeployments: API.PaginatedOperationMethod<
  DescribeBlueGreenDeploymentsRequest,
  DescribeBlueGreenDeploymentsResponse,
  DescribeBlueGreenDeploymentsError,
  Credentials | HttpClient.HttpClient,
  BlueGreenDeployment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3360, __c105, 0) as any as S.Schema<DescribeBlueGreenDeploymentsRequest>,
  output: __S(3362, __c105, 2) as any as S.Schema<DescribeBlueGreenDeploymentsResponse>,
  errors: [BlueGreenDeploymentNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBlueGreenDeployments",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "BlueGreenDeployments",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeCertificatesError = CertificateNotFoundFault | CommonErrors;
/**
 * Lists the set of certificate authority (CA) certificates provided by Amazon RDS for this Amazon Web Services account.
 *
 * For more information, see Using SSL/TLS to encrypt a connection to a DB instance in the *Amazon RDS User Guide* and Using SSL/TLS to encrypt a connection to a DB cluster in the *Amazon Aurora User Guide*.
 */
export const describeCertificates: API.PaginatedOperationMethod<
  DescribeCertificatesMessage,
  CertificateMessage,
  DescribeCertificatesError,
  Credentials | HttpClient.HttpClient,
  Certificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<DescribeCertificatesMessage>,
  output: __S(3426, __c107, 2) as any as S.Schema<CertificateMessage>,
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

export type DescribeDBClusterAutomatedBackupsError =
  | DBClusterAutomatedBackupNotFoundFault
  | CommonErrors;
/**
 * Displays backups for both current and deleted DB clusters. For example, use this operation to find details about automated backups for previously deleted clusters. Current clusters are returned for both the `DescribeDBClusterAutomatedBackups` and `DescribeDBClusters` operations.
 *
 * All parameters are optional.
 */
export const describeDBClusterAutomatedBackups: API.PaginatedOperationMethod<
  DescribeDBClusterAutomatedBackupsMessage,
  DBClusterAutomatedBackupMessage,
  DescribeDBClusterAutomatedBackupsError,
  Credentials | HttpClient.HttpClient,
  DBClusterAutomatedBackup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<DescribeDBClusterAutomatedBackupsMessage>,
  output: __S(3490, __c109, 2) as any as S.Schema<DBClusterAutomatedBackupMessage>,
  errors: [DBClusterAutomatedBackupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterAutomatedBackups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBClusterAutomatedBackups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBClusterBacktracksError =
  | DBClusterBacktrackNotFoundFault
  | DBClusterNotFoundFault
  | CommonErrors;
/**
 * Returns information about backtracks for a DB cluster.
 *
 * For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * This action only applies to Aurora MySQL DB clusters.
 */
export const describeDBClusterBacktracks: API.PaginatedOperationMethod<
  DescribeDBClusterBacktracksMessage,
  DBClusterBacktrackMessage,
  DescribeDBClusterBacktracksError,
  Credentials | HttpClient.HttpClient,
  DBClusterBacktrack
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<DescribeDBClusterBacktracksMessage>,
  output: __S(3522, __c110, 2) as any as S.Schema<DBClusterBacktrackMessage>,
  errors: [DBClusterBacktrackNotFoundFault, DBClusterNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterBacktracks",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBClusterBacktracks",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBClusterEndpointsError = DBClusterNotFoundFault | CommonErrors;
/**
 * Returns information about endpoints for an Amazon Aurora DB cluster.
 *
 * This action only applies to Aurora DB clusters.
 */
export const describeDBClusterEndpoints: API.PaginatedOperationMethod<
  DescribeDBClusterEndpointsMessage,
  DBClusterEndpointMessage,
  DescribeDBClusterEndpointsError,
  Credentials | HttpClient.HttpClient,
  DBClusterEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3552, __c111, 0) as any as S.Schema<DescribeDBClusterEndpointsMessage>,
  output: __S(3554, __c111, 2) as any as S.Schema<DBClusterEndpointMessage>,
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
 * Returns a list of `DBClusterParameterGroup` descriptions. If a `DBClusterParameterGroupName` parameter is specified, the list will contain only the description of the specified DB cluster parameter group.
 *
 * For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 */
export const describeDBClusterParameterGroups: API.PaginatedOperationMethod<
  DescribeDBClusterParameterGroupsMessage,
  DBClusterParameterGroupsMessage,
  DescribeDBClusterParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  DBClusterParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<DescribeDBClusterParameterGroupsMessage>,
  output: __S(3586, __c112, 2) as any as S.Schema<DBClusterParameterGroupsMessage>,
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
 *
 * For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 */
export const describeDBClusterParameters: API.PaginatedOperationMethod<
  DescribeDBClusterParametersMessage,
  DBClusterParameterGroupDetails,
  DescribeDBClusterParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<DescribeDBClusterParametersMessage>,
  output: __S(3617, __c113, 1) as any as S.Schema<DBClusterParameterGroupDetails>,
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
 * Describes existing Amazon Aurora DB clusters and Multi-AZ DB clusters. This API supports pagination.
 *
 * For more information on Amazon Aurora DB clusters, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 *
 * This operation can also return information for Amazon Neptune DB instances and Amazon DocumentDB instances.
 */
export const describeDBClusters: API.PaginatedOperationMethod<
  DescribeDBClustersMessage,
  DBClusterMessage,
  DescribeDBClustersError,
  Credentials | HttpClient.HttpClient,
  DBCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3680, __c115, 0) as any as S.Schema<DescribeDBClustersMessage>,
  output: __S(3682, __c115, 2) as any as S.Schema<DBClusterMessage>,
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
 * Returns a list of DB cluster snapshot attribute names and values for a manual DB cluster snapshot.
 *
 * When sharing snapshots with other Amazon Web Services accounts, `DescribeDBClusterSnapshotAttributes` returns the `restore` attribute and a list of IDs for the Amazon Web Services accounts that are authorized to copy or restore the manual DB cluster snapshot. If `all` is included in the list of values for the `restore` attribute, then the manual DB cluster snapshot is public and can be copied or restored by all Amazon Web Services accounts.
 *
 * To add or remove access for an Amazon Web Services account to copy or restore a manual DB cluster snapshot, or to make the manual DB cluster snapshot public or private, use the `ModifyDBClusterSnapshotAttribute` API action.
 */
export const describeDBClusterSnapshotAttributes: API.OperationMethod<
  DescribeDBClusterSnapshotAttributesMessage,
  DescribeDBClusterSnapshotAttributesResult,
  DescribeDBClusterSnapshotAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3712, __c116, 0) as any as S.Schema<DescribeDBClusterSnapshotAttributesMessage>,
  output: __S(3713, __c116, 1) as any as S.Schema<DescribeDBClusterSnapshotAttributesResult>,
  errors: [DBClusterSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterSnapshotAttributes",
}));

export type DescribeDBClusterSnapshotsError = DBClusterSnapshotNotFoundFault | CommonErrors;
/**
 * Returns information about DB cluster snapshots. This API action supports pagination.
 *
 * For more information on Amazon Aurora DB clusters, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 */
export const describeDBClusterSnapshots: API.PaginatedOperationMethod<
  DescribeDBClusterSnapshotsMessage,
  DBClusterSnapshotMessage,
  DescribeDBClusterSnapshotsError,
  Credentials | HttpClient.HttpClient,
  DBClusterSnapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<DescribeDBClusterSnapshotsMessage>,
  output: __S(3810, __c119, 2) as any as S.Schema<DBClusterSnapshotMessage>,
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

export type DescribeDBEngineVersionsError = InvalidParameterCombination | CommonErrors;
/**
 * Describes the properties of specific versions of DB engines.
 */
export const describeDBEngineVersions: API.PaginatedOperationMethod<
  DescribeDBEngineVersionsMessage,
  DBEngineVersionMessage,
  DescribeDBEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  DBEngineVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3840, __c120, 0) as any as S.Schema<DescribeDBEngineVersionsMessage>,
  output: __S(3842, __c120, 2) as any as S.Schema<DBEngineVersionMessage>,
  errors: [InvalidParameterCombination],
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

export type DescribeDBInstanceAutomatedBackupsError =
  | DBInstanceAutomatedBackupNotFoundFault
  | CommonErrors;
/**
 * Displays backups for both current and deleted instances. For example, use this operation to find details about automated backups for previously deleted instances. Current instances with retention periods greater than zero (0) are returned for both the `DescribeDBInstanceAutomatedBackups` and `DescribeDBInstances` operations.
 *
 * All parameters are optional.
 */
export const describeDBInstanceAutomatedBackups: API.PaginatedOperationMethod<
  DescribeDBInstanceAutomatedBackupsMessage,
  DBInstanceAutomatedBackupMessage,
  DescribeDBInstanceAutomatedBackupsError,
  Credentials | HttpClient.HttpClient,
  DBInstanceAutomatedBackup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3872, __c121, 0) as any as S.Schema<DescribeDBInstanceAutomatedBackupsMessage>,
  output: __S(3874, __c121, 2) as any as S.Schema<DBInstanceAutomatedBackupMessage>,
  errors: [DBInstanceAutomatedBackupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBInstanceAutomatedBackups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBInstanceAutomatedBackups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBInstancesError = DBInstanceNotFoundFault | CommonErrors;
/**
 * Describes provisioned RDS instances. This API supports pagination.
 *
 * This operation can also return information for Amazon Neptune DB instances and Amazon DocumentDB instances.
 */
export const describeDBInstances: API.PaginatedOperationMethod<
  DescribeDBInstancesMessage,
  DBInstanceMessage,
  DescribeDBInstancesError,
  Credentials | HttpClient.HttpClient,
  DBInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3904, __c122, 0) as any as S.Schema<DescribeDBInstancesMessage>,
  output: __S(3906, __c122, 2) as any as S.Schema<DBInstanceMessage>,
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

export type DescribeDBLogFilesError =
  | DBInstanceNotFoundFault
  | DBInstanceNotReadyFault
  | CommonErrors;
/**
 * Returns a list of DB log files for the DB instance.
 *
 * This command doesn't apply to RDS Custom.
 */
export const describeDBLogFiles: API.PaginatedOperationMethod<
  DescribeDBLogFilesMessage,
  DescribeDBLogFilesResponse,
  DescribeDBLogFilesError,
  Credentials | HttpClient.HttpClient,
  DescribeDBLogFilesDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3936, __c123, 0) as any as S.Schema<DescribeDBLogFilesMessage>,
  output: __S(3939, __c123, 3) as any as S.Schema<DescribeDBLogFilesResponse>,
  errors: [DBInstanceNotFoundFault, DBInstanceNotReadyFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBLogFiles",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DescribeDBLogFiles",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBMajorEngineVersionsError = CommonErrors;
/**
 * Describes the properties of specific major versions of DB engines.
 */
export const describeDBMajorEngineVersions: API.PaginatedOperationMethod<
  DescribeDBMajorEngineVersionsRequest,
  DescribeDBMajorEngineVersionsResponse,
  DescribeDBMajorEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  DBMajorEngineVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3968, __c124, 0) as any as S.Schema<DescribeDBMajorEngineVersionsRequest>,
  output: __S(3973, __c124, 5) as any as S.Schema<DescribeDBMajorEngineVersionsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBMajorEngineVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBMajorEngineVersions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBParameterGroupsError = DBParameterGroupNotFoundFault | CommonErrors;
/**
 * Returns a list of `DBParameterGroup` descriptions. If a `DBParameterGroupName` is specified, the list will contain only the description of the specified DB parameter group.
 */
export const describeDBParameterGroups: API.PaginatedOperationMethod<
  DescribeDBParameterGroupsMessage,
  DBParameterGroupsMessage,
  DescribeDBParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  DBParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4000, __c125, 0) as any as S.Schema<DescribeDBParameterGroupsMessage>,
  output: __S(4002, __c125, 2) as any as S.Schema<DBParameterGroupsMessage>,
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
  input: __S(4032, __c126, 0) as any as S.Schema<DescribeDBParametersMessage>,
  output: __S(4033, __c126, 1) as any as S.Schema<DBParameterGroupDetails>,
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

export type DescribeDBProxiesError = DBProxyNotFoundFault | CommonErrors;
/**
 * Returns information about DB proxies.
 */
export const describeDBProxies: API.PaginatedOperationMethod<
  DescribeDBProxiesRequest,
  DescribeDBProxiesResponse,
  DescribeDBProxiesError,
  Credentials | HttpClient.HttpClient,
  DBProxy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4064, __c127, 0) as any as S.Schema<DescribeDBProxiesRequest>,
  output: __S(4066, __c127, 2) as any as S.Schema<DescribeDBProxiesResponse>,
  errors: [DBProxyNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBProxies",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBProxies",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBProxyEndpointsError =
  | DBProxyEndpointNotFoundFault
  | DBProxyNotFoundFault
  | CommonErrors;
/**
 * Returns information about DB proxy endpoints.
 */
export const describeDBProxyEndpoints: API.PaginatedOperationMethod<
  DescribeDBProxyEndpointsRequest,
  DescribeDBProxyEndpointsResponse,
  DescribeDBProxyEndpointsError,
  Credentials | HttpClient.HttpClient,
  DBProxyEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4096, __c128, 0) as any as S.Schema<DescribeDBProxyEndpointsRequest>,
  output: __S(4098, __c128, 2) as any as S.Schema<DescribeDBProxyEndpointsResponse>,
  errors: [DBProxyEndpointNotFoundFault, DBProxyNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBProxyEndpoints",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBProxyEndpoints",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBProxyTargetGroupsError =
  | DBProxyNotFoundFault
  | DBProxyTargetGroupNotFoundFault
  | InvalidDBProxyStateFault
  | CommonErrors;
/**
 * Returns information about DB proxy target groups, represented by `DBProxyTargetGroup` data structures.
 */
export const describeDBProxyTargetGroups: API.PaginatedOperationMethod<
  DescribeDBProxyTargetGroupsRequest,
  DescribeDBProxyTargetGroupsResponse,
  DescribeDBProxyTargetGroupsError,
  Credentials | HttpClient.HttpClient,
  DBProxyTargetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4128, __c129, 0) as any as S.Schema<DescribeDBProxyTargetGroupsRequest>,
  output: __S(4130, __c129, 2) as any as S.Schema<DescribeDBProxyTargetGroupsResponse>,
  errors: [DBProxyNotFoundFault, DBProxyTargetGroupNotFoundFault, InvalidDBProxyStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBProxyTargetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "TargetGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBProxyTargetsError =
  | DBProxyNotFoundFault
  | DBProxyTargetGroupNotFoundFault
  | DBProxyTargetNotFoundFault
  | InvalidDBProxyStateFault
  | CommonErrors;
/**
 * Returns information about `DBProxyTarget` objects. This API supports pagination.
 */
export const describeDBProxyTargets: API.PaginatedOperationMethod<
  DescribeDBProxyTargetsRequest,
  DescribeDBProxyTargetsResponse,
  DescribeDBProxyTargetsError,
  Credentials | HttpClient.HttpClient,
  DBProxyTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4192, __c131, 0) as any as S.Schema<DescribeDBProxyTargetsRequest>,
  output: __S(4193, __c131, 1) as any as S.Schema<DescribeDBProxyTargetsResponse>,
  errors: [
    DBProxyNotFoundFault,
    DBProxyTargetGroupNotFoundFault,
    DBProxyTargetNotFoundFault,
    InvalidDBProxyStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBProxyTargets",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Targets",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBRecommendationsError = CommonErrors;
/**
 * Describes the recommendations to resolve the issues for your DB instances, DB clusters, and DB parameter groups.
 */
export const describeDBRecommendations: API.PaginatedOperationMethod<
  DescribeDBRecommendationsMessage,
  DBRecommendationsMessage,
  DescribeDBRecommendationsError,
  Credentials | HttpClient.HttpClient,
  DBRecommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4256, __c133, 0) as any as S.Schema<DescribeDBRecommendationsMessage>,
  output: __S(4258, __c133, 2) as any as S.Schema<DBRecommendationsMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBRecommendations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBRecommendations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBSecurityGroupsError = DBSecurityGroupNotFoundFault | CommonErrors;
/**
 * Returns a list of `DBSecurityGroup` descriptions. If a `DBSecurityGroupName` is specified, the list will contain only the descriptions of the specified DB security group.
 *
 * EC2-Classic was retired on August 15, 2022. If you haven't migrated from EC2-Classic to a VPC, we recommend that you migrate as soon as possible. For more information, see Migrate from EC2-Classic to a VPC in the *Amazon EC2 User Guide*, the blog EC2-Classic Networking is Retiring - Here's How to Prepare, and Moving a DB instance not in a VPC into a VPC in the *Amazon RDS User Guide*.
 */
export const describeDBSecurityGroups: API.PaginatedOperationMethod<
  DescribeDBSecurityGroupsMessage,
  DBSecurityGroupMessage,
  DescribeDBSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  DBSecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4320, __c135, 0) as any as S.Schema<DescribeDBSecurityGroupsMessage>,
  output: __S(4322, __c135, 2) as any as S.Schema<DBSecurityGroupMessage>,
  errors: [DBSecurityGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBSecurityGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBSecurityGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBShardGroupsError =
  | DBClusterNotFoundFault
  | DBShardGroupNotFoundFault
  | CommonErrors;
/**
 * Describes existing Aurora Limitless Database DB shard groups.
 */
export const describeDBShardGroups: API.OperationMethod<
  DescribeDBShardGroupsMessage,
  DescribeDBShardGroupsResponse,
  DescribeDBShardGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<DescribeDBShardGroupsMessage>,
  output: __S(4354, __c136, 2) as any as S.Schema<DescribeDBShardGroupsResponse>,
  errors: [DBClusterNotFoundFault, DBShardGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBShardGroups",
}));

export type DescribeDBSnapshotAttributesError = DBSnapshotNotFoundFault | CommonErrors;
/**
 * Returns a list of DB snapshot attribute names and values for a manual DB snapshot.
 *
 * When sharing snapshots with other Amazon Web Services accounts, `DescribeDBSnapshotAttributes` returns the `restore` attribute and a list of IDs for the Amazon Web Services accounts that are authorized to copy or restore the manual DB snapshot. If `all` is included in the list of values for the `restore` attribute, then the manual DB snapshot is public and can be copied or restored by all Amazon Web Services accounts.
 *
 * To add or remove access for an Amazon Web Services account to copy or restore a manual DB snapshot, or to make the manual DB snapshot public or private, use the `ModifyDBSnapshotAttribute` API action.
 */
export const describeDBSnapshotAttributes: API.OperationMethod<
  DescribeDBSnapshotAttributesMessage,
  DescribeDBSnapshotAttributesResult,
  DescribeDBSnapshotAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4384, __c137, 0) as any as S.Schema<DescribeDBSnapshotAttributesMessage>,
  output: __S(4385, __c137, 1) as any as S.Schema<DescribeDBSnapshotAttributesResult>,
  errors: [DBSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBSnapshotAttributes",
}));

export type DescribeDBSnapshotsError = DBSnapshotNotFoundFault | CommonErrors;
/**
 * Returns information about DB snapshots. This API action supports pagination.
 */
export const describeDBSnapshots: API.PaginatedOperationMethod<
  DescribeDBSnapshotsMessage,
  DBSnapshotMessage,
  DescribeDBSnapshotsError,
  Credentials | HttpClient.HttpClient,
  DBSnapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4448, __c139, 0) as any as S.Schema<DescribeDBSnapshotsMessage>,
  output: __S(4450, __c139, 2) as any as S.Schema<DBSnapshotMessage>,
  errors: [DBSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBSnapshots",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBSnapshots",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBSnapshotTenantDatabasesError = DBSnapshotNotFoundFault | CommonErrors;
/**
 * Describes the tenant databases that exist in a DB snapshot. This command only applies to RDS for Oracle DB instances in the multi-tenant configuration.
 *
 * You can use this command to inspect the tenant databases within a snapshot before restoring it. You can't directly interact with the tenant databases in a DB snapshot. If you restore a snapshot that was taken from DB instance using the multi-tenant configuration, you restore all its tenant databases.
 */
export const describeDBSnapshotTenantDatabases: API.PaginatedOperationMethod<
  DescribeDBSnapshotTenantDatabasesMessage,
  DBSnapshotTenantDatabasesMessage,
  DescribeDBSnapshotTenantDatabasesError,
  Credentials | HttpClient.HttpClient,
  DBSnapshotTenantDatabase
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4480, __c140, 0) as any as S.Schema<DescribeDBSnapshotTenantDatabasesMessage>,
  output: __S(4483, __c140, 3) as any as S.Schema<DBSnapshotTenantDatabasesMessage>,
  errors: [DBSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBSnapshotTenantDatabases",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBSnapshotTenantDatabases",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBSubnetGroupsError = DBSubnetGroupNotFoundFault | CommonErrors;
/**
 * Returns a list of DBSubnetGroup descriptions. If a DBSubnetGroupName is specified, the list will contain only the descriptions of the specified DBSubnetGroup.
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
  input: __S(4512, __c141, 0) as any as S.Schema<DescribeDBSubnetGroupsMessage>,
  output: __S(4514, __c141, 2) as any as S.Schema<DBSubnetGroupMessage>,
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
 * Returns the default engine and system parameter information for the cluster database engine.
 *
 * For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 */
export const describeEngineDefaultClusterParameters: API.PaginatedOperationMethod<
  DescribeEngineDefaultClusterParametersMessage,
  DescribeEngineDefaultClusterParametersResult,
  DescribeEngineDefaultClusterParametersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4544, __c142, 0) as any as S.Schema<DescribeEngineDefaultClusterParametersMessage>,
  output: __S(4545, __c142, 1) as any as S.Schema<DescribeEngineDefaultClusterParametersResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineDefaultClusterParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "EngineDefaults.Marker",
    items: "EngineDefaults.Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEngineDefaultParametersError = CommonErrors;
/**
 * Returns the default engine and system parameter information for the specified database engine.
 */
export const describeEngineDefaultParameters: API.PaginatedOperationMethod<
  DescribeEngineDefaultParametersMessage,
  DescribeEngineDefaultParametersResult,
  DescribeEngineDefaultParametersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4608, __c144, 0) as any as S.Schema<DescribeEngineDefaultParametersMessage>,
  output: __S(4609, __c144, 1) as any as S.Schema<DescribeEngineDefaultParametersResult>,
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
 * Displays a list of categories for all event source types, or, if specified, for a specified source type. You can also see this list in the "Amazon RDS event categories and event messages" section of the *Amazon RDS User Guide* or the *Amazon Aurora User Guide* .
 */
export const describeEventCategories: API.OperationMethod<
  DescribeEventCategoriesMessage,
  EventCategoriesMessage,
  DescribeEventCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4640, __c145, 0) as any as S.Schema<DescribeEventCategoriesMessage>,
  output: __S(4643, __c145, 3) as any as S.Schema<EventCategoriesMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventCategories",
}));

export type DescribeEventsError = CommonErrors;
/**
 * Returns events related to DB instances, DB clusters, DB parameter groups, DB security groups, DB snapshots, DB cluster snapshots, and RDS Proxies for the past 14 days. Events specific to a particular DB instance, DB cluster, DB parameter group, DB security group, DB snapshot, DB cluster snapshot group, or RDS Proxy can be obtained by providing the name as a parameter.
 *
 * For more information on working with events, see Monitoring Amazon RDS events in the *Amazon RDS User Guide* and Monitoring Amazon Aurora events in the *Amazon Aurora User Guide*.
 *
 * By default, RDS returns events that were generated in the past hour.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsMessage,
  EventsMessage,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4672, __c146, 0) as any as S.Schema<DescribeEventsMessage>,
  output: __S(4675, __c146, 3) as any as S.Schema<EventsMessage>,
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
  input: __S(4704, __c147, 0) as any as S.Schema<DescribeEventSubscriptionsMessage>,
  output: __S(4706, __c147, 2) as any as S.Schema<EventSubscriptionsMessage>,
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

export type DescribeExportTasksError = ExportTaskNotFoundFault | CommonErrors;
/**
 * Returns information about a snapshot or cluster export to Amazon S3. This API operation supports pagination.
 */
export const describeExportTasks: API.PaginatedOperationMethod<
  DescribeExportTasksMessage,
  ExportTasksMessage,
  DescribeExportTasksError,
  Credentials | HttpClient.HttpClient,
  ExportTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4736, __c148, 0) as any as S.Schema<DescribeExportTasksMessage>,
  output: __S(4738, __c148, 2) as any as S.Schema<ExportTasksMessage>,
  errors: [ExportTaskNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExportTasks",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ExportTasks",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeGlobalClustersError = GlobalClusterNotFoundFault | CommonErrors;
/**
 * Returns information about Aurora global database clusters. This API supports pagination.
 *
 * For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * This action only applies to Aurora DB clusters.
 */
export const describeGlobalClusters: API.PaginatedOperationMethod<
  DescribeGlobalClustersMessage,
  GlobalClustersMessage,
  DescribeGlobalClustersError,
  Credentials | HttpClient.HttpClient,
  GlobalCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4768, __c149, 0) as any as S.Schema<DescribeGlobalClustersMessage>,
  output: __S(4770, __c149, 2) as any as S.Schema<GlobalClustersMessage>,
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

export type DescribeIntegrationsError = IntegrationNotFoundFault | CommonErrors;
/**
 * Describe one or more zero-ETL integrations with Amazon Redshift.
 */
export const describeIntegrations: API.PaginatedOperationMethod<
  DescribeIntegrationsMessage,
  DescribeIntegrationsResponse,
  DescribeIntegrationsError,
  Credentials | HttpClient.HttpClient,
  Integration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4800, __c150, 0) as any as S.Schema<DescribeIntegrationsMessage>,
  output: __S(4802, __c150, 2) as any as S.Schema<DescribeIntegrationsResponse>,
  errors: [IntegrationNotFoundFault],
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

export type DescribeOptionGroupOptionsError = CommonErrors;
/**
 * Describes all available options for the specified engine.
 */
export const describeOptionGroupOptions: API.PaginatedOperationMethod<
  DescribeOptionGroupOptionsMessage,
  OptionGroupOptionsMessage,
  DescribeOptionGroupOptionsError,
  Credentials | HttpClient.HttpClient,
  OptionGroupOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4832, __c151, 0) as any as S.Schema<DescribeOptionGroupOptionsMessage>,
  output: __S(4843, __c151, 11) as any as S.Schema<OptionGroupOptionsMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOptionGroupOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "OptionGroupOptions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeOptionGroupsError = OptionGroupNotFoundFault | CommonErrors;
/**
 * Describes the available option groups.
 */
export const describeOptionGroups: API.PaginatedOperationMethod<
  DescribeOptionGroupsMessage,
  OptionGroups,
  DescribeOptionGroupsError,
  Credentials | HttpClient.HttpClient,
  OptionGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4864, __c152, 0) as any as S.Schema<DescribeOptionGroupsMessage>,
  output: __S(4866, __c152, 2) as any as S.Schema<OptionGroups>,
  errors: [OptionGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOptionGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "OptionGroupsList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeOrderableDBInstanceOptionsError = CommonErrors;
/**
 * Describes the orderable DB instance options for a specified DB engine.
 */
export const describeOrderableDBInstanceOptions: API.PaginatedOperationMethod<
  DescribeOrderableDBInstanceOptionsMessage,
  OrderableDBInstanceOptionsMessage,
  DescribeOrderableDBInstanceOptionsError,
  Credentials | HttpClient.HttpClient,
  OrderableDBInstanceOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4896, __c153, 0) as any as S.Schema<DescribeOrderableDBInstanceOptionsMessage>,
  output: __S(4903, __c153, 7) as any as S.Schema<OrderableDBInstanceOptionsMessage>,
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
 * Returns a list of resources (for example, DB instances) that have at least one pending maintenance action.
 *
 * This API follows an eventual consistency model. This means that the result of the `DescribePendingMaintenanceActions` command might not be immediately visible to all subsequent RDS commands. Keep this in mind when you use `DescribePendingMaintenanceActions` immediately after using a previous API command such as `ApplyPendingMaintenanceActions`.
 */
export const describePendingMaintenanceActions: API.PaginatedOperationMethod<
  DescribePendingMaintenanceActionsMessage,
  PendingMaintenanceActionsMessage,
  DescribePendingMaintenanceActionsError,
  Credentials | HttpClient.HttpClient,
  ResourcePendingMaintenanceActions
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4960, __c155, 0) as any as S.Schema<DescribePendingMaintenanceActionsMessage>,
  output: __S(4962, __c155, 2) as any as S.Schema<PendingMaintenanceActionsMessage>,
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

export type DescribeReservedDBInstancesError = ReservedDBInstanceNotFoundFault | CommonErrors;
/**
 * Returns information about reserved DB instances for this account, or about a specified reserved DB instance.
 */
export const describeReservedDBInstances: API.PaginatedOperationMethod<
  DescribeReservedDBInstancesMessage,
  ReservedDBInstanceMessage,
  DescribeReservedDBInstancesError,
  Credentials | HttpClient.HttpClient,
  ReservedDBInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4992, __c156, 0) as any as S.Schema<DescribeReservedDBInstancesMessage>,
  output: __S(4994, __c156, 2) as any as S.Schema<ReservedDBInstanceMessage>,
  errors: [ReservedDBInstanceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedDBInstances",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedDBInstances",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedDBInstancesOfferingsError =
  | ReservedDBInstancesOfferingNotFoundFault
  | CommonErrors;
/**
 * Lists available reserved DB instance offerings.
 */
export const describeReservedDBInstancesOfferings: API.PaginatedOperationMethod<
  DescribeReservedDBInstancesOfferingsMessage,
  ReservedDBInstancesOfferingMessage,
  DescribeReservedDBInstancesOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedDBInstancesOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5088, __c159, 0) as any as S.Schema<DescribeReservedDBInstancesOfferingsMessage>,
  output: __S(5091, __c159, 3) as any as S.Schema<ReservedDBInstancesOfferingMessage>,
  errors: [ReservedDBInstancesOfferingNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedDBInstancesOfferings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedDBInstancesOfferings",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeServerlessV2PlatformVersionsError = CommonErrors;
/**
 * Describes the properties of specific platform versions for Aurora Serverless v2.
 */
export const describeServerlessV2PlatformVersions: API.PaginatedOperationMethod<
  DescribeServerlessV2PlatformVersionsMessage,
  ServerlessV2PlatformVersionsMessage,
  DescribeServerlessV2PlatformVersionsError,
  Credentials | HttpClient.HttpClient,
  ServerlessV2PlatformVersionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5120, __c160, 0) as any as S.Schema<DescribeServerlessV2PlatformVersionsMessage>,
  output: __S(5123, __c160, 3) as any as S.Schema<ServerlessV2PlatformVersionsMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServerlessV2PlatformVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ServerlessV2PlatformVersions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeSourceRegionsError = CommonErrors;
/**
 * Returns a list of the source Amazon Web Services Regions where the current Amazon Web Services Region can create a read replica, copy a DB snapshot from, or replicate automated backups from.
 *
 * Use this operation to determine whether cross-Region features are supported between other Regions and your current Region. This operation supports pagination.
 *
 * To return information about the Regions that are enabled for your account, or all Regions, use the EC2 operation `DescribeRegions`. For more information, see DescribeRegions in the *Amazon EC2 API Reference*.
 */
export const describeSourceRegions: API.PaginatedOperationMethod<
  DescribeSourceRegionsMessage,
  SourceRegionMessage,
  DescribeSourceRegionsError,
  Credentials | HttpClient.HttpClient,
  SourceRegion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5152, __c161, 0) as any as S.Schema<DescribeSourceRegionsMessage>,
  output: __S(5155, __c161, 3) as any as S.Schema<SourceRegionMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSourceRegions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SourceRegions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeTenantDatabasesError = DBInstanceNotFoundFault | CommonErrors;
/**
 * Describes the tenant databases in a DB instance that uses the multi-tenant configuration. Only RDS for Oracle CDB instances are supported.
 */
export const describeTenantDatabases: API.PaginatedOperationMethod<
  DescribeTenantDatabasesMessage,
  TenantDatabasesMessage,
  DescribeTenantDatabasesError,
  Credentials | HttpClient.HttpClient,
  TenantDatabase
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5184, __c162, 0) as any as S.Schema<DescribeTenantDatabasesMessage>,
  output: __S(5186, __c162, 2) as any as S.Schema<TenantDatabasesMessage>,
  errors: [DBInstanceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTenantDatabases",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "TenantDatabases",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeValidDBInstanceModificationsError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * You can call `DescribeValidDBInstanceModifications` to learn what modifications you can make to your DB instance. You can use this information when you call `ModifyDBInstance`.
 *
 * This command doesn't apply to RDS Custom.
 */
export const describeValidDBInstanceModifications: API.OperationMethod<
  DescribeValidDBInstanceModificationsMessage,
  DescribeValidDBInstanceModificationsResult,
  DescribeValidDBInstanceModificationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5216, __c163, 0) as any as S.Schema<DescribeValidDBInstanceModificationsMessage>,
  output: __S(5227, __c163, 11) as any as S.Schema<DescribeValidDBInstanceModificationsResult>,
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeValidDBInstanceModifications",
}));

export type DisableHttpEndpointError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Disables the HTTP endpoint for the specified DB cluster. Disabling this endpoint disables RDS Data API.
 *
 * For more information, see Using RDS Data API in the *Amazon Aurora User Guide*.
 *
 * This operation applies only to Aurora Serverless v2 and provisioned DB clusters. To disable the HTTP endpoint for Aurora Serverless v1 DB clusters, use the `EnableHttpEndpoint` parameter of the `ModifyDBCluster` operation.
 */
export const disableHttpEndpoint: API.OperationMethod<
  DisableHttpEndpointRequest,
  DisableHttpEndpointResponse,
  DisableHttpEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5248, __c164, 0) as any as S.Schema<DisableHttpEndpointRequest>,
  output: __S(5249, __c164, 1) as any as S.Schema<DisableHttpEndpointResponse>,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableHttpEndpoint",
}));

export type DownloadDBLogFilePortionError =
  | DBInstanceNotFoundFault
  | DBInstanceNotReadyFault
  | DBLogFileNotFoundFault
  | CommonErrors;
/**
 * Downloads all or a portion of the specified log file, up to 1 MB in size.
 *
 * This command doesn't apply to RDS Custom.
 *
 * This operation uses resources on database instances. Because of this, we recommend publishing database logs to CloudWatch and then using the GetLogEvents operation. For more information, see GetLogEvents in the *Amazon CloudWatch Logs API Reference*.
 */
export const downloadDBLogFilePortion: API.PaginatedOperationMethod<
  DownloadDBLogFilePortionMessage,
  DownloadDBLogFilePortionDetails,
  DownloadDBLogFilePortionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(5280, __c165, 0) as any as S.Schema<DownloadDBLogFilePortionMessage>,
  output: __S(5281, __c165, 1) as any as S.Schema<DownloadDBLogFilePortionDetails>,
  errors: [DBInstanceNotFoundFault, DBInstanceNotReadyFault, DBLogFileNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DownloadDBLogFilePortion",
  pagination: { inputToken: "Marker", outputToken: "Marker", pageSize: "NumberOfLines" } as const,
})) as any;

export type EnableHttpEndpointError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Enables the HTTP endpoint for the DB cluster. By default, the HTTP endpoint isn't enabled.
 *
 * When enabled, this endpoint provides a connectionless web service API (RDS Data API) for running SQL queries on the Aurora DB cluster. You can also query your database from inside the RDS console with the RDS query editor.
 *
 * For more information, see Using RDS Data API in the *Amazon Aurora User Guide*.
 *
 * This operation applies only to Aurora Serverless v2 and provisioned DB clusters. To enable the HTTP endpoint for Aurora Serverless v1 DB clusters, use the `EnableHttpEndpoint` parameter of the `ModifyDBCluster` operation.
 */
export const enableHttpEndpoint: API.OperationMethod<
  EnableHttpEndpointRequest,
  EnableHttpEndpointResponse,
  EnableHttpEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5312, __c166, 0) as any as S.Schema<EnableHttpEndpointRequest>,
  output: __S(5313, __c166, 1) as any as S.Schema<EnableHttpEndpointResponse>,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableHttpEndpoint",
}));

export type FailoverDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Forces a failover for a DB cluster.
 *
 * For an Aurora DB cluster, failover for a DB cluster promotes one of the Aurora Replicas (read-only instances) in the DB cluster to be the primary DB instance (the cluster writer).
 *
 * For a Multi-AZ DB cluster, after RDS terminates the primary DB instance, the internal monitoring system detects that the primary DB instance is unhealthy and promotes a readable standby (read-only instances) in the DB cluster to be the primary DB instance (the cluster writer). Failover times are typically less than 35 seconds.
 *
 * An Amazon Aurora DB cluster automatically fails over to an Aurora Replica, if one exists, when the primary DB instance fails. A Multi-AZ DB cluster automatically fails over to a readable standby DB instance when the primary DB instance fails.
 *
 * To simulate a failure of a primary instance for testing, you can force a failover. Because each instance in a DB cluster has its own endpoint address, make sure to clean up and re-establish any existing connections that use those endpoint addresses when the failover is complete.
 *
 * For more information on Amazon Aurora DB clusters, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 */
export const failoverDBCluster: API.OperationMethod<
  FailoverDBClusterMessage,
  FailoverDBClusterResult,
  FailoverDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5344, __c167, 0) as any as S.Schema<FailoverDBClusterMessage>,
  output: __S(5345, __c167, 1) as any as S.Schema<FailoverDBClusterResult>,
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
 * Promotes the specified secondary DB cluster to be the primary DB cluster in the global database cluster to fail over or switch over a global database. Switchover operations were previously called "managed planned failovers."
 *
 * Although this operation can be used either to fail over or to switch over a global database cluster, its intended use is for global database failover. To switch over a global database cluster, we recommend that you use the SwitchoverGlobalCluster operation instead.
 *
 * How you use this operation depends on whether you are failing over or switching over your global database cluster:
 *
 * - Failing over - Specify the `AllowDataLoss` parameter and don't specify the `Switchover` parameter.
 *
 * - Switching over - Specify the `Switchover` parameter or omit it, but don't specify the `AllowDataLoss` parameter.
 *
 * **About failing over and switching over**
 *
 * While failing over and switching over a global database cluster both change the primary DB cluster, you use these operations for different reasons:
 *
 * - *Failing over* - Use this operation to respond to an unplanned event, such as a Regional disaster in the primary Region. Failing over can result in a loss of write transaction data that wasn't replicated to the chosen secondary before the failover event occurred. However, the recovery process that promotes a DB instance on the chosen seconday DB cluster to be the primary writer DB instance guarantees that the data is in a transactionally consistent state.
 *
 * For more information about failing over an Amazon Aurora global database, see Performing managed failovers for Aurora global databases in the *Amazon Aurora User Guide*.
 *
 * - *Switching over* - Use this operation on a healthy global database cluster for planned events, such as Regional rotation or to fail back to the original primary DB cluster after a failover operation. With this operation, there is no data loss.
 *
 * For more information about switching over an Amazon Aurora global database, see Performing switchovers for Aurora global databases in the *Amazon Aurora User Guide*.
 */
export const failoverGlobalCluster: API.OperationMethod<
  FailoverGlobalClusterMessage,
  FailoverGlobalClusterResult,
  FailoverGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5376, __c168, 0) as any as S.Schema<FailoverGlobalClusterMessage>,
  output: __S(5377, __c168, 1) as any as S.Schema<FailoverGlobalClusterResult>,
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
  | BlueGreenDeploymentNotFoundFault
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | DBProxyEndpointNotFoundFault
  | DBProxyNotFoundFault
  | DBProxyTargetGroupNotFoundFault
  | DBShardGroupNotFoundFault
  | DBSnapshotNotFoundFault
  | DBSnapshotTenantDatabaseNotFoundFault
  | IntegrationNotFoundFault
  | TenantDatabaseNotFoundFault
  | CommonErrors;
/**
 * Lists all tags on an Amazon RDS resource.
 *
 * For an overview on tagging an Amazon RDS resource, see Tagging Amazon RDS Resources in the *Amazon RDS User Guide* or Tagging Amazon Aurora and Amazon RDS Resources in the *Amazon Aurora User Guide*.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceMessage,
  TagListMessage,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5408, __c169, 0) as any as S.Schema<ListTagsForResourceMessage>,
  output: __S(5409, __c169, 1) as any as S.Schema<TagListMessage>,
  errors: [
    BlueGreenDeploymentNotFoundFault,
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    DBProxyEndpointNotFoundFault,
    DBProxyNotFoundFault,
    DBProxyTargetGroupNotFoundFault,
    DBShardGroupNotFoundFault,
    DBSnapshotNotFoundFault,
    DBSnapshotTenantDatabaseNotFoundFault,
    IntegrationNotFoundFault,
    TenantDatabaseNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ModifyActivityStreamError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Changes the audit policy state of a database activity stream to either locked (default) or unlocked. A locked policy is read-only, whereas an unlocked policy is read/write. If your activity stream is started and locked, you can unlock it, customize your audit policy, and then lock your activity stream. Restarting the activity stream isn't required. For more information, see Modifying a database activity stream in the *Amazon RDS User Guide*.
 *
 * This operation is supported for RDS for Oracle and Microsoft SQL Server.
 */
export const modifyActivityStream: API.OperationMethod<
  ModifyActivityStreamRequest,
  ModifyActivityStreamResponse,
  ModifyActivityStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5440, __c170, 0) as any as S.Schema<ModifyActivityStreamRequest>,
  output: __S(5441, __c170, 1) as any as S.Schema<ModifyActivityStreamResponse>,
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyActivityStream",
}));

export type ModifyCertificatesError = CertificateNotFoundFault | CommonErrors;
/**
 * Override the system-default Secure Sockets Layer/Transport Layer Security (SSL/TLS) certificate for Amazon RDS for new DB instances, or remove the override.
 *
 * By using this operation, you can specify an RDS-approved SSL/TLS certificate for new DB instances that is different from the default certificate provided by RDS. You can also use this operation to remove the override, so that new DB instances use the default certificate provided by RDS.
 *
 * You might need to override the default certificate in the following situations:
 *
 * - You already migrated your applications to support the latest certificate authority (CA) certificate, but the new CA certificate is not yet the RDS default CA certificate for the specified Amazon Web Services Region.
 *
 * - RDS has already moved to a new default CA certificate for the specified Amazon Web Services Region, but you are still in the process of supporting the new CA certificate. In this case, you temporarily need additional time to finish your application changes.
 *
 * For more information about rotating your SSL/TLS certificate for RDS DB engines, see Rotating Your SSL/TLS Certificate in the *Amazon RDS User Guide*.
 *
 * For more information about rotating your SSL/TLS certificate for Aurora DB engines, see Rotating Your SSL/TLS Certificate in the *Amazon Aurora User Guide*.
 */
export const modifyCertificates: API.OperationMethod<
  ModifyCertificatesMessage,
  ModifyCertificatesResult,
  ModifyCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5472, __c171, 0) as any as S.Schema<ModifyCertificatesMessage>,
  output: __S(5473, __c171, 1) as any as S.Schema<ModifyCertificatesResult>,
  errors: [CertificateNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCertificates",
}));

export type ModifyCurrentDBClusterCapacityError =
  | DBClusterNotFoundFault
  | InvalidDBClusterCapacityFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Set the capacity of an Aurora Serverless v1 DB cluster to a specific value.
 *
 * Aurora Serverless v1 scales seamlessly based on the workload on the DB cluster. In some cases, the capacity might not scale fast enough to meet a sudden change in workload, such as a large number of new transactions. Call `ModifyCurrentDBClusterCapacity` to set the capacity explicitly.
 *
 * After this call sets the DB cluster capacity, Aurora Serverless v1 can automatically scale the DB cluster based on the cooldown period for scaling up and the cooldown period for scaling down.
 *
 * For more information about Aurora Serverless v1, see Using Amazon Aurora Serverless v1 in the *Amazon Aurora User Guide*.
 *
 * If you call `ModifyCurrentDBClusterCapacity` with the default `TimeoutAction`, connections that prevent Aurora Serverless v1 from finding a scaling point might be dropped. For more information about scaling points, see Autoscaling for Aurora Serverless v1 in the *Amazon Aurora User Guide*.
 *
 * This operation only applies to Aurora Serverless v1 DB clusters.
 */
export const modifyCurrentDBClusterCapacity: API.OperationMethod<
  ModifyCurrentDBClusterCapacityMessage,
  DBClusterCapacityInfo,
  ModifyCurrentDBClusterCapacityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5504, __c172, 0) as any as S.Schema<ModifyCurrentDBClusterCapacityMessage>,
  output: __S(5505, __c172, 1) as any as S.Schema<DBClusterCapacityInfo>,
  errors: [DBClusterNotFoundFault, InvalidDBClusterCapacityFault, InvalidDBClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCurrentDBClusterCapacity",
}));

export type ModifyCustomDBEngineVersionError =
  | CustomDBEngineVersionNotFoundFault
  | InvalidCustomDBEngineVersionStateFault
  | CommonErrors;
/**
 * Modifies the status of a custom engine version (CEV). You can find CEVs to modify by calling `DescribeDBEngineVersions`.
 *
 * The MediaImport service that imports files from Amazon S3 to create CEVs isn't integrated with Amazon Web Services CloudTrail. If you turn on data logging for Amazon RDS in CloudTrail, calls to the `ModifyCustomDbEngineVersion` event aren't logged. However, you might see calls from the API gateway that accesses your Amazon S3 bucket. These calls originate from the MediaImport service for the `ModifyCustomDbEngineVersion` event.
 *
 * For more information, see Modifying CEV status in the *Amazon RDS User Guide*.
 */
export const modifyCustomDBEngineVersion: API.OperationMethod<
  ModifyCustomDBEngineVersionMessage,
  DBEngineVersion,
  ModifyCustomDBEngineVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5536, __c173, 0) as any as S.Schema<ModifyCustomDBEngineVersionMessage>,
  output: __S(1225, __c38, 9) as any as S.Schema<DBEngineVersion>,
  errors: [CustomDBEngineVersionNotFoundFault, InvalidCustomDBEngineVersionStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCustomDBEngineVersion",
}));

export type ModifyDBClusterError =
  | DBClusterAlreadyExistsFault
  | DBClusterNotFoundFault
  | DBClusterParameterGroupNotFoundFault
  | DBInstanceAlreadyExistsFault
  | DBParameterGroupNotFoundFault
  | DBSubnetGroupNotFoundFault
  | DomainNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBSecurityGroupStateFault
  | InvalidDBSubnetGroupStateFault
  | InvalidGlobalClusterStateFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | OptionGroupNotFoundFault
  | StorageQuotaExceededFault
  | StorageTypeNotAvailableFault
  | StorageTypeNotSupportedFault
  | VpcEncryptionControlViolationException
  | InvalidParameterCombination
  | InvalidParameterValue
  | CommonErrors;
/**
 * Modifies the settings of an Amazon Aurora DB cluster or a Multi-AZ DB cluster. You can change one or more settings by specifying these parameters and the new values in the request.
 *
 * For more information on Amazon Aurora DB clusters, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide*.
 */
export const modifyDBCluster: API.OperationMethod<
  ModifyDBClusterMessage,
  ModifyDBClusterResult,
  ModifyDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5568, __c174, 0) as any as S.Schema<ModifyDBClusterMessage>,
  output: __S(5569, __c174, 1) as any as S.Schema<ModifyDBClusterResult>,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterNotFoundFault,
    DBClusterParameterGroupNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBSubnetGroupNotFoundFault,
    DomainNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBSecurityGroupStateFault,
    InvalidDBSubnetGroupStateFault,
    InvalidGlobalClusterStateFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    OptionGroupNotFoundFault,
    StorageQuotaExceededFault,
    StorageTypeNotAvailableFault,
    StorageTypeNotSupportedFault,
    VpcEncryptionControlViolationException,
    InvalidParameterCombination,
    InvalidParameterValue,
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
 * Modifies the properties of an endpoint in an Amazon Aurora DB cluster.
 *
 * This operation only applies to Aurora DB clusters.
 */
export const modifyDBClusterEndpoint: API.OperationMethod<
  ModifyDBClusterEndpointMessage,
  DBClusterEndpoint,
  ModifyDBClusterEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5632, __c176, 0) as any as S.Schema<ModifyDBClusterEndpointMessage>,
  output: __S(1568, __c49, 0) as any as S.Schema<DBClusterEndpoint>,
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
 * Modifies the parameters of a DB cluster parameter group. To modify more than one parameter, submit a list of the following: `ParameterName`, `ParameterValue`, and `ApplyMethod`. A maximum of 20 parameters can be modified in a single request.
 *
 * There are two types of parameters - dynamic parameters and static parameters. Changes to dynamic parameters are applied to the DB cluster immediately without a reboot. Changes to static parameters are applied only after the DB cluster is rebooted, which can be done using `RebootDBCluster` operation. You can use the *Parameter Groups* option of the Amazon RDS console or the `DescribeDBClusterParameters` operation to verify that your DB cluster parameter group has been created or modified.
 *
 * For more information on Amazon Aurora DB clusters, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide.*
 */
export const modifyDBClusterParameterGroup: API.OperationMethod<
  ModifyDBClusterParameterGroupMessage,
  DBClusterParameterGroupNameMessage,
  ModifyDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5664, __c177, 0) as any as S.Schema<ModifyDBClusterParameterGroupMessage>,
  output: __S(5696, __c178, 0) as any as S.Schema<DBClusterParameterGroupNameMessage>,
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
 * Adds an attribute and values to, or removes an attribute and values from, a manual DB cluster snapshot.
 *
 * To share a manual DB cluster snapshot with other Amazon Web Services accounts, specify `restore` as the `AttributeName` and use the `ValuesToAdd` parameter to add a list of IDs of the Amazon Web Services accounts that are authorized to restore the manual DB cluster snapshot. Use the value `all` to make the manual DB cluster snapshot public, which means that it can be copied or restored by all Amazon Web Services accounts.
 *
 * Don't add the `all` value for any manual DB cluster snapshots that contain private information that you don't want available to all Amazon Web Services accounts.
 *
 * If a manual DB cluster snapshot is encrypted, it can be shared, but only by specifying a list of authorized Amazon Web Services account IDs for the `ValuesToAdd` parameter. You can't use `all` as a value for that parameter in this case.
 *
 * To view which Amazon Web Services accounts have access to copy or restore a manual DB cluster snapshot, or whether a manual DB cluster snapshot is public or private, use the DescribeDBClusterSnapshotAttributes API operation. The accounts are returned as values for the `restore` attribute.
 */
export const modifyDBClusterSnapshotAttribute: API.OperationMethod<
  ModifyDBClusterSnapshotAttributeMessage,
  ModifyDBClusterSnapshotAttributeResult,
  ModifyDBClusterSnapshotAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5728, __c179, 0) as any as S.Schema<ModifyDBClusterSnapshotAttributeMessage>,
  output: __S(5729, __c179, 1) as any as S.Schema<ModifyDBClusterSnapshotAttributeResult>,
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
  | BackupPolicyNotFoundFault
  | CertificateNotFoundFault
  | DBInstanceAlreadyExistsFault
  | DBInstanceNotFoundFault
  | DBParameterGroupNotFoundFault
  | DBSecurityGroupNotFoundFault
  | DBUpgradeDependencyFailureFault
  | DomainNotFoundFault
  | InsufficientDBInstanceCapacityFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBSecurityGroupStateFault
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | OptionGroupNotFoundFault
  | ProvisionedIopsNotAvailableInAZFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | TenantDatabaseQuotaExceededFault
  | VpcEncryptionControlViolationException
  | InvalidParameterCombination
  | InvalidParameterValue
  | CommonErrors;
/**
 * Modifies settings for a DB instance. You can change one or more database configuration parameters by specifying these parameters and the new values in the request. To learn what modifications you can make to your DB instance, call `DescribeValidDBInstanceModifications` before you call `ModifyDBInstance`.
 */
export const modifyDBInstance: API.OperationMethod<
  ModifyDBInstanceMessage,
  ModifyDBInstanceResult,
  ModifyDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5762, __c180, 2) as any as S.Schema<ModifyDBInstanceMessage>,
  output: __S(5763, __c180, 3) as any as S.Schema<ModifyDBInstanceResult>,
  errors: [
    AuthorizationNotFoundFault,
    BackupPolicyNotFoundFault,
    CertificateNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBInstanceNotFoundFault,
    DBParameterGroupNotFoundFault,
    DBSecurityGroupNotFoundFault,
    DBUpgradeDependencyFailureFault,
    DomainNotFoundFault,
    InsufficientDBInstanceCapacityFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBSecurityGroupStateFault,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    OptionGroupNotFoundFault,
    ProvisionedIopsNotAvailableInAZFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
    TenantDatabaseQuotaExceededFault,
    VpcEncryptionControlViolationException,
    InvalidParameterCombination,
    InvalidParameterValue,
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
 * Modifies the parameters of a DB parameter group. To modify more than one parameter, submit a list of the following: `ParameterName`, `ParameterValue`, and `ApplyMethod`. A maximum of 20 parameters can be modified in a single request.
 *
 * After you modify a DB parameter group, you should wait at least 5 minutes before creating your first DB instance that uses that DB parameter group as the default parameter group. This allows Amazon RDS to fully complete the modify operation before the parameter group is used as the default for a new DB instance. This is especially important for parameters that are critical when creating the default database for a DB instance, such as the character set for the default database defined by the `character_set_database` parameter. You can use the *Parameter Groups* option of the Amazon RDS console or the *DescribeDBParameters* command to verify that your DB parameter group has been created or modified.
 */
export const modifyDBParameterGroup: API.OperationMethod<
  ModifyDBParameterGroupMessage,
  DBParameterGroupNameMessage,
  ModifyDBParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5792, __c181, 0) as any as S.Schema<ModifyDBParameterGroupMessage>,
  output: __S(5824, __c182, 0) as any as S.Schema<DBParameterGroupNameMessage>,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBParameterGroup",
}));

export type ModifyDBProxyError =
  | DBProxyAlreadyExistsFault
  | DBProxyNotFoundFault
  | InvalidDBProxyStateFault
  | CommonErrors;
/**
 * Changes the settings for an existing DB proxy.
 */
export const modifyDBProxy: API.OperationMethod<
  ModifyDBProxyRequest,
  ModifyDBProxyResponse,
  ModifyDBProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5856, __c183, 0) as any as S.Schema<ModifyDBProxyRequest>,
  output: __S(5857, __c183, 1) as any as S.Schema<ModifyDBProxyResponse>,
  errors: [DBProxyAlreadyExistsFault, DBProxyNotFoundFault, InvalidDBProxyStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBProxy",
}));

export type ModifyDBProxyEndpointError =
  | DBProxyEndpointAlreadyExistsFault
  | DBProxyEndpointNotFoundFault
  | InvalidDBProxyEndpointStateFault
  | InvalidDBProxyStateFault
  | CommonErrors;
/**
 * Changes the settings for an existing DB proxy endpoint.
 */
export const modifyDBProxyEndpoint: API.OperationMethod<
  ModifyDBProxyEndpointRequest,
  ModifyDBProxyEndpointResponse,
  ModifyDBProxyEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5888, __c184, 0) as any as S.Schema<ModifyDBProxyEndpointRequest>,
  output: __S(5889, __c184, 1) as any as S.Schema<ModifyDBProxyEndpointResponse>,
  errors: [
    DBProxyEndpointAlreadyExistsFault,
    DBProxyEndpointNotFoundFault,
    InvalidDBProxyEndpointStateFault,
    InvalidDBProxyStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBProxyEndpoint",
}));

export type ModifyDBProxyTargetGroupError =
  | DBProxyNotFoundFault
  | DBProxyTargetGroupNotFoundFault
  | InvalidDBProxyStateFault
  | CommonErrors;
/**
 * Modifies the properties of a `DBProxyTargetGroup`.
 */
export const modifyDBProxyTargetGroup: API.OperationMethod<
  ModifyDBProxyTargetGroupRequest,
  ModifyDBProxyTargetGroupResponse,
  ModifyDBProxyTargetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5921, __c185, 1) as any as S.Schema<ModifyDBProxyTargetGroupRequest>,
  output: __S(5922, __c185, 2) as any as S.Schema<ModifyDBProxyTargetGroupResponse>,
  errors: [DBProxyNotFoundFault, DBProxyTargetGroupNotFoundFault, InvalidDBProxyStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBProxyTargetGroup",
}));

export type ModifyDBRecommendationError = CommonErrors;
/**
 * Updates the recommendation status and recommended action status for the specified recommendation.
 */
export const modifyDBRecommendation: API.OperationMethod<
  ModifyDBRecommendationMessage,
  DBRecommendationMessage,
  ModifyDBRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5954, __c186, 2) as any as S.Schema<ModifyDBRecommendationMessage>,
  output: __S(5955, __c186, 3) as any as S.Schema<DBRecommendationMessage>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBRecommendation",
}));

export type ModifyDBShardGroupError =
  | DBShardGroupAlreadyExistsFault
  | DBShardGroupNotFoundFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Modifies the settings of an Aurora Limitless Database DB shard group. You can change one or more settings by specifying these parameters and the new values in the request.
 */
export const modifyDBShardGroup: API.OperationMethod<
  ModifyDBShardGroupMessage,
  DBShardGroup,
  ModifyDBShardGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5984, __c187, 0) as any as S.Schema<ModifyDBShardGroupMessage>,
  output: __S(2144, __c67, 0) as any as S.Schema<DBShardGroup>,
  errors: [DBShardGroupAlreadyExistsFault, DBShardGroupNotFoundFault, InvalidDBClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBShardGroup",
}));

export type ModifyDBSnapshotError =
  | DBSnapshotNotFoundFault
  | InvalidDBSnapshotStateFault
  | KMSKeyNotAccessibleFault
  | CommonErrors;
/**
 * Updates a manual DB snapshot with a new engine version. The snapshot can be encrypted or unencrypted, but not shared or public.
 *
 * Amazon RDS supports upgrading DB snapshots for MariaDB, MySQL, PostgreSQL, and Oracle. This operation doesn't apply to RDS Custom or RDS for Db2.
 */
export const modifyDBSnapshot: API.OperationMethod<
  ModifyDBSnapshotMessage,
  ModifyDBSnapshotResult,
  ModifyDBSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6016, __c188, 0) as any as S.Schema<ModifyDBSnapshotMessage>,
  output: __S(6017, __c188, 1) as any as S.Schema<ModifyDBSnapshotResult>,
  errors: [DBSnapshotNotFoundFault, InvalidDBSnapshotStateFault, KMSKeyNotAccessibleFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBSnapshot",
}));

export type ModifyDBSnapshotAttributeError =
  | DBSnapshotNotFoundFault
  | InvalidDBSnapshotStateFault
  | SharedSnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Adds an attribute and values to, or removes an attribute and values from, a manual DB snapshot.
 *
 * To share a manual DB snapshot with other Amazon Web Services accounts, specify `restore` as the `AttributeName` and use the `ValuesToAdd` parameter to add a list of IDs of the Amazon Web Services accounts that are authorized to restore the manual DB snapshot. Uses the value `all` to make the manual DB snapshot public, which means it can be copied or restored by all Amazon Web Services accounts.
 *
 * Don't add the `all` value for any manual DB snapshots that contain private information that you don't want available to all Amazon Web Services accounts.
 *
 * If the manual DB snapshot is encrypted, it can be shared, but only by specifying a list of authorized Amazon Web Services account IDs for the `ValuesToAdd` parameter. You can't use `all` as a value for that parameter in this case.
 *
 * To view which Amazon Web Services accounts have access to copy or restore a manual DB snapshot, or whether a manual DB snapshot public or private, use the DescribeDBSnapshotAttributes API operation. The accounts are returned as values for the `restore` attribute.
 */
export const modifyDBSnapshotAttribute: API.OperationMethod<
  ModifyDBSnapshotAttributeMessage,
  ModifyDBSnapshotAttributeResult,
  ModifyDBSnapshotAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6048, __c189, 0) as any as S.Schema<ModifyDBSnapshotAttributeMessage>,
  output: __S(6049, __c189, 1) as any as S.Schema<ModifyDBSnapshotAttributeResult>,
  errors: [DBSnapshotNotFoundFault, InvalidDBSnapshotStateFault, SharedSnapshotQuotaExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBSnapshotAttribute",
}));

export type ModifyDBSubnetGroupError =
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | DBSubnetQuotaExceededFault
  | InvalidDBSubnetGroupStateFault
  | InvalidSubnet
  | SubnetAlreadyInUse
  | CommonErrors;
/**
 * Modifies an existing DB subnet group. DB subnet groups must contain at least one subnet in at least two AZs in the Amazon Web Services Region.
 */
export const modifyDBSubnetGroup: API.OperationMethod<
  ModifyDBSubnetGroupMessage,
  ModifyDBSubnetGroupResult,
  ModifyDBSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6080, __c190, 0) as any as S.Schema<ModifyDBSubnetGroupMessage>,
  output: __S(6081, __c190, 1) as any as S.Schema<ModifyDBSubnetGroupResult>,
  errors: [
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    DBSubnetQuotaExceededFault,
    InvalidDBSubnetGroupStateFault,
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
 * Modifies an existing RDS event notification subscription. You can't modify the source identifiers using this call. To change source identifiers for a subscription, use the `AddSourceIdentifierToSubscription` and `RemoveSourceIdentifierFromSubscription` calls.
 *
 * You can see a list of the event categories for a given source type (`SourceType`) in Events in the *Amazon RDS User Guide* or by using the `DescribeEventCategories` operation.
 */
export const modifyEventSubscription: API.OperationMethod<
  ModifyEventSubscriptionMessage,
  ModifyEventSubscriptionResult,
  ModifyEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6112, __c191, 0) as any as S.Schema<ModifyEventSubscriptionMessage>,
  output: __S(6113, __c191, 1) as any as S.Schema<ModifyEventSubscriptionResult>,
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
 * Modifies a setting for an Amazon Aurora global database cluster. You can change one or more database configuration parameters by specifying these parameters and the new values in the request. For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * This operation only applies to Aurora global database clusters.
 */
export const modifyGlobalCluster: API.OperationMethod<
  ModifyGlobalClusterMessage,
  ModifyGlobalClusterResult,
  ModifyGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6144, __c192, 0) as any as S.Schema<ModifyGlobalClusterMessage>,
  output: __S(6145, __c192, 1) as any as S.Schema<ModifyGlobalClusterResult>,
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

export type ModifyIntegrationError =
  | IntegrationConflictOperationFault
  | IntegrationNotFoundFault
  | InvalidIntegrationStateFault
  | CommonErrors;
/**
 * Modifies a zero-ETL integration with Amazon Redshift.
 */
export const modifyIntegration: API.OperationMethod<
  ModifyIntegrationMessage,
  Integration,
  ModifyIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6176, __c193, 0) as any as S.Schema<ModifyIntegrationMessage>,
  output: __S(2403, __c75, 3) as any as S.Schema<Integration>,
  errors: [
    IntegrationConflictOperationFault,
    IntegrationNotFoundFault,
    InvalidIntegrationStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyIntegration",
}));

export type ModifyOptionGroupError =
  | InvalidOptionGroupStateFault
  | OptionGroupNotFoundFault
  | CommonErrors;
/**
 * Modifies an existing option group.
 */
export const modifyOptionGroup: API.OperationMethod<
  ModifyOptionGroupMessage,
  ModifyOptionGroupResult,
  ModifyOptionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6212, __c194, 4) as any as S.Schema<ModifyOptionGroupMessage>,
  output: __S(6213, __c194, 5) as any as S.Schema<ModifyOptionGroupResult>,
  errors: [InvalidOptionGroupStateFault, OptionGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyOptionGroup",
}));

export type ModifyTenantDatabaseError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | KMSKeyNotAccessibleFault
  | TenantDatabaseAlreadyExistsFault
  | TenantDatabaseNotFoundFault
  | CommonErrors;
/**
 * Modifies an existing tenant database in a DB instance. You can change the tenant database name or the master user password. This operation is supported only for RDS for Oracle CDB instances using the multi-tenant configuration.
 */
export const modifyTenantDatabase: API.OperationMethod<
  ModifyTenantDatabaseMessage,
  ModifyTenantDatabaseResult,
  ModifyTenantDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6240, __c195, 0) as any as S.Schema<ModifyTenantDatabaseMessage>,
  output: __S(6241, __c195, 1) as any as S.Schema<ModifyTenantDatabaseResult>,
  errors: [
    DBInstanceNotFoundFault,
    InvalidDBInstanceStateFault,
    KMSKeyNotAccessibleFault,
    TenantDatabaseAlreadyExistsFault,
    TenantDatabaseNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyTenantDatabase",
}));

export type PromoteReadReplicaError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Promotes a read replica DB instance to a standalone DB instance.
 *
 * - Backup duration is a function of the amount of changes to the database since the previous backup. If you plan to promote a read replica to a standalone instance, we recommend that you enable backups and complete at least one backup prior to promotion. In addition, a read replica cannot be promoted to a standalone instance when it is in the `backing-up` status. If you have enabled backups on your read replica, configure the automated backup window so that daily backups do not interfere with read replica promotion.
 *
 * - This command doesn't apply to Aurora MySQL, Aurora PostgreSQL, or RDS Custom.
 */
export const promoteReadReplica: API.OperationMethod<
  PromoteReadReplicaMessage,
  PromoteReadReplicaResult,
  PromoteReadReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6272, __c196, 0) as any as S.Schema<PromoteReadReplicaMessage>,
  output: __S(6273, __c196, 1) as any as S.Schema<PromoteReadReplicaResult>,
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PromoteReadReplica",
}));

export type PromoteReadReplicaDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Promotes a read replica DB cluster to a standalone DB cluster.
 */
export const promoteReadReplicaDBCluster: API.OperationMethod<
  PromoteReadReplicaDBClusterMessage,
  PromoteReadReplicaDBClusterResult,
  PromoteReadReplicaDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6304, __c197, 0) as any as S.Schema<PromoteReadReplicaDBClusterMessage>,
  output: __S(6305, __c197, 1) as any as S.Schema<PromoteReadReplicaDBClusterResult>,
  errors: [DBClusterNotFoundFault, InvalidDBClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PromoteReadReplicaDBCluster",
}));

export type PurchaseReservedDBInstancesOfferingError =
  | ReservedDBInstanceAlreadyExistsFault
  | ReservedDBInstanceQuotaExceededFault
  | ReservedDBInstancesOfferingNotFoundFault
  | CommonErrors;
/**
 * Purchases a reserved DB instance offering.
 */
export const purchaseReservedDBInstancesOffering: API.OperationMethod<
  PurchaseReservedDBInstancesOfferingMessage,
  PurchaseReservedDBInstancesOfferingResult,
  PurchaseReservedDBInstancesOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6336, __c198, 0) as any as S.Schema<PurchaseReservedDBInstancesOfferingMessage>,
  output: __S(6337, __c198, 1) as any as S.Schema<PurchaseReservedDBInstancesOfferingResult>,
  errors: [
    ReservedDBInstanceAlreadyExistsFault,
    ReservedDBInstanceQuotaExceededFault,
    ReservedDBInstancesOfferingNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseReservedDBInstancesOffering",
}));

export type RebootDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * You might need to reboot your DB cluster, usually for maintenance reasons. For example, if you make certain modifications, or if you change the DB cluster parameter group associated with the DB cluster, reboot the DB cluster for the changes to take effect.
 *
 * Rebooting a DB cluster restarts the database engine service. Rebooting a DB cluster results in a momentary outage, during which the DB cluster status is set to rebooting.
 *
 * Use this operation only for a non-Aurora Multi-AZ DB cluster.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide.*
 */
export const rebootDBCluster: API.OperationMethod<
  RebootDBClusterMessage,
  RebootDBClusterResult,
  RebootDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6368, __c199, 0) as any as S.Schema<RebootDBClusterMessage>,
  output: __S(6369, __c199, 1) as any as S.Schema<RebootDBClusterResult>,
  errors: [DBClusterNotFoundFault, InvalidDBClusterStateFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDBCluster",
}));

export type RebootDBInstanceError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | KMSKeyNotAccessibleFault
  | CommonErrors;
/**
 * You might need to reboot your DB instance, usually for maintenance reasons. For example, if you make certain modifications, or if you change the DB parameter group associated with the DB instance, you must reboot the instance for the changes to take effect.
 *
 * Rebooting a DB instance restarts the database engine service. Rebooting a DB instance results in a momentary outage, during which the DB instance status is set to rebooting.
 *
 * For more information about rebooting, see Rebooting a DB Instance in the *Amazon RDS User Guide.*
 *
 * This command doesn't apply to RDS Custom.
 *
 * If your DB instance is part of a Multi-AZ DB cluster, you can reboot the DB cluster with the `RebootDBCluster` operation.
 */
export const rebootDBInstance: API.OperationMethod<
  RebootDBInstanceMessage,
  RebootDBInstanceResult,
  RebootDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6400, __c200, 0) as any as S.Schema<RebootDBInstanceMessage>,
  output: __S(6401, __c200, 1) as any as S.Schema<RebootDBInstanceResult>,
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault, KMSKeyNotAccessibleFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDBInstance",
}));

export type RebootDBShardGroupError =
  | DBShardGroupNotFoundFault
  | InvalidDBShardGroupStateFault
  | CommonErrors;
/**
 * You might need to reboot your DB shard group, usually for maintenance reasons. For example, if you make certain modifications, reboot the DB shard group for the changes to take effect.
 *
 * This operation applies only to Aurora Limitless Database DBb shard groups.
 */
export const rebootDBShardGroup: API.OperationMethod<
  RebootDBShardGroupMessage,
  DBShardGroup,
  RebootDBShardGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6432, __c201, 0) as any as S.Schema<RebootDBShardGroupMessage>,
  output: __S(2144, __c67, 0) as any as S.Schema<DBShardGroup>,
  errors: [DBShardGroupNotFoundFault, InvalidDBShardGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDBShardGroup",
}));

export type RegisterDBProxyTargetsError =
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | DBProxyNotFoundFault
  | DBProxyTargetAlreadyRegisteredFault
  | DBProxyTargetGroupNotFoundFault
  | InsufficientAvailableIPsInSubnetFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBProxyStateFault
  | CommonErrors;
/**
 * Associate one or more `DBProxyTarget` data structures with a `DBProxyTargetGroup`.
 */
export const registerDBProxyTargets: API.OperationMethod<
  RegisterDBProxyTargetsRequest,
  RegisterDBProxyTargetsResponse,
  RegisterDBProxyTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6464, __c202, 0) as any as S.Schema<RegisterDBProxyTargetsRequest>,
  output: __S(6465, __c202, 1) as any as S.Schema<RegisterDBProxyTargetsResponse>,
  errors: [
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    DBProxyNotFoundFault,
    DBProxyTargetAlreadyRegisteredFault,
    DBProxyTargetGroupNotFoundFault,
    InsufficientAvailableIPsInSubnetFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBProxyStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDBProxyTargets",
}));

export type RemoveFromGlobalClusterError =
  | DBClusterNotFoundFault
  | GlobalClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Detaches an Aurora secondary cluster from an Aurora global database cluster. The cluster becomes a standalone cluster with read-write capability instead of being read-only and receiving data from a primary cluster in a different Region.
 *
 * This operation only applies to Aurora DB clusters.
 */
export const removeFromGlobalCluster: API.OperationMethod<
  RemoveFromGlobalClusterMessage,
  RemoveFromGlobalClusterResult,
  RemoveFromGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6496, __c203, 0) as any as S.Schema<RemoveFromGlobalClusterMessage>,
  output: __S(6497, __c203, 1) as any as S.Schema<RemoveFromGlobalClusterResult>,
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidGlobalClusterStateFault,
  ],
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
 * Removes the asssociation of an Amazon Web Services Identity and Access Management (IAM) role from a DB cluster.
 *
 * For more information on Amazon Aurora DB clusters, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide.*
 */
export const removeRoleFromDBCluster: API.OperationMethod<
  RemoveRoleFromDBClusterMessage,
  RemoveRoleFromDBClusterResponse,
  RemoveRoleFromDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6528, __c204, 0) as any as S.Schema<RemoveRoleFromDBClusterMessage>,
  output: __S(6529, __c204, 1) as any as S.Schema<RemoveRoleFromDBClusterResponse>,
  errors: [DBClusterNotFoundFault, DBClusterRoleNotFoundFault, InvalidDBClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveRoleFromDBCluster",
}));

export type RemoveRoleFromDBInstanceError =
  | DBInstanceNotFoundFault
  | DBInstanceRoleNotFoundFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Disassociates an Amazon Web Services Identity and Access Management (IAM) role from a DB instance.
 */
export const removeRoleFromDBInstance: API.OperationMethod<
  RemoveRoleFromDBInstanceMessage,
  RemoveRoleFromDBInstanceResponse,
  RemoveRoleFromDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6560, __c205, 0) as any as S.Schema<RemoveRoleFromDBInstanceMessage>,
  output: __S(6561, __c205, 1) as any as S.Schema<RemoveRoleFromDBInstanceResponse>,
  errors: [DBInstanceNotFoundFault, DBInstanceRoleNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveRoleFromDBInstance",
}));

export type RemoveSourceIdentifierFromSubscriptionError =
  | SourceNotFoundFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Removes a source identifier from an existing RDS event notification subscription.
 */
export const removeSourceIdentifierFromSubscription: API.OperationMethod<
  RemoveSourceIdentifierFromSubscriptionMessage,
  RemoveSourceIdentifierFromSubscriptionResult,
  RemoveSourceIdentifierFromSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6592, __c206, 0) as any as S.Schema<RemoveSourceIdentifierFromSubscriptionMessage>,
  output: __S(6593, __c206, 1) as any as S.Schema<RemoveSourceIdentifierFromSubscriptionResult>,
  errors: [SourceNotFoundFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveSourceIdentifierFromSubscription",
}));

export type RemoveTagsFromResourceError =
  | BlueGreenDeploymentNotFoundFault
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | DBProxyEndpointNotFoundFault
  | DBProxyNotFoundFault
  | DBProxyTargetGroupNotFoundFault
  | DBShardGroupNotFoundFault
  | DBSnapshotNotFoundFault
  | DBSnapshotTenantDatabaseNotFoundFault
  | IntegrationNotFoundFault
  | InvalidDBClusterEndpointStateFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | TenantDatabaseNotFoundFault
  | CommonErrors;
/**
 * Removes metadata tags from an Amazon RDS resource.
 *
 * For an overview on tagging an Amazon RDS resource, see Tagging Amazon RDS Resources in the *Amazon RDS User Guide* or Tagging Amazon Aurora and Amazon RDS Resources in the *Amazon Aurora User Guide*.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceMessage,
  RemoveTagsFromResourceResponse,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6625, __c207, 1) as any as S.Schema<RemoveTagsFromResourceMessage>,
  output: __S(6626, __c207, 2) as any as S.Schema<RemoveTagsFromResourceResponse>,
  errors: [
    BlueGreenDeploymentNotFoundFault,
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    DBProxyEndpointNotFoundFault,
    DBProxyNotFoundFault,
    DBProxyTargetGroupNotFoundFault,
    DBShardGroupNotFoundFault,
    DBSnapshotNotFoundFault,
    DBSnapshotTenantDatabaseNotFoundFault,
    IntegrationNotFoundFault,
    InvalidDBClusterEndpointStateFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    TenantDatabaseNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
}));

export type ResetDBClusterParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Modifies the parameters of a DB cluster parameter group to the default value. To reset specific parameters submit a list of the following: `ParameterName` and `ApplyMethod`. To reset the entire DB cluster parameter group, specify the `DBClusterParameterGroupName` and `ResetAllParameters` parameters.
 *
 * When resetting the entire group, dynamic parameters are updated immediately and static parameters are set to `pending-reboot` to take effect on the next DB instance restart or `RebootDBInstance` request. You must call `RebootDBInstance` for every DB instance in your DB cluster that you want the updated static parameter to apply to.
 *
 * For more information on Amazon Aurora DB clusters, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide.*
 */
export const resetDBClusterParameterGroup: API.OperationMethod<
  ResetDBClusterParameterGroupMessage,
  DBClusterParameterGroupNameMessage,
  ResetDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6656, __c208, 0) as any as S.Schema<ResetDBClusterParameterGroupMessage>,
  output: __S(5696, __c178, 0) as any as S.Schema<DBClusterParameterGroupNameMessage>,
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
 * Modifies the parameters of a DB parameter group to the engine/system default value. To reset specific parameters, provide a list of the following: `ParameterName` and `ApplyMethod`. To reset the entire DB parameter group, specify the `DBParameterGroup` name and `ResetAllParameters` parameters. When resetting the entire group, dynamic parameters are updated immediately and static parameters are set to `pending-reboot` to take effect on the next DB instance restart or `RebootDBInstance` request.
 */
export const resetDBParameterGroup: API.OperationMethod<
  ResetDBParameterGroupMessage,
  DBParameterGroupNameMessage,
  ResetDBParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6688, __c209, 0) as any as S.Schema<ResetDBParameterGroupMessage>,
  output: __S(5824, __c182, 0) as any as S.Schema<DBParameterGroupNameMessage>,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDBParameterGroup",
}));

export type RestoreDBClusterFromS3Error =
  | DBClusterAlreadyExistsFault
  | DBClusterNotFoundFault
  | DBClusterParameterGroupNotFoundFault
  | DBClusterQuotaExceededFault
  | DBClusterRoleQuotaExceededFault
  | DBSubnetGroupNotFoundFault
  | DomainNotFoundFault
  | InsufficientStorageClusterCapacityFault
  | InvalidDBClusterStateFault
  | InvalidDBSubnetGroupStateFault
  | InvalidS3BucketFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | CommonErrors;
/**
 * Creates an Amazon Aurora DB cluster from MySQL data stored in an Amazon S3 bucket. Amazon RDS must be authorized to access the Amazon S3 bucket and the data must be created using the Percona XtraBackup utility as described in Migrating Data from MySQL by Using an Amazon S3 Bucket in the *Amazon Aurora User Guide*.
 *
 * This operation only restores the DB cluster, not the DB instances for that DB cluster. You must invoke the `CreateDBInstance` operation to create DB instances for the restored DB cluster, specifying the identifier of the restored DB cluster in `DBClusterIdentifier`. You can create DB instances only after the `RestoreDBClusterFromS3` operation has completed and the DB cluster is available.
 *
 * For more information on Amazon Aurora, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * This operation only applies to Aurora DB clusters. The source DB engine must be MySQL.
 *
 * You can use the `AssociatedRoles` parameter to associate one or more Amazon Web Services Identity and Access Management (IAM) roles with the Aurora DB cluster when you restore it from Amazon S3.
 */
export const restoreDBClusterFromS3: API.OperationMethod<
  RestoreDBClusterFromS3Message,
  RestoreDBClusterFromS3Result,
  RestoreDBClusterFromS3Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6720, __c210, 0) as any as S.Schema<RestoreDBClusterFromS3Message>,
  output: __S(6721, __c210, 1) as any as S.Schema<RestoreDBClusterFromS3Result>,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterNotFoundFault,
    DBClusterParameterGroupNotFoundFault,
    DBClusterQuotaExceededFault,
    DBClusterRoleQuotaExceededFault,
    DBSubnetGroupNotFoundFault,
    DomainNotFoundFault,
    InsufficientStorageClusterCapacityFault,
    InvalidDBClusterStateFault,
    InvalidDBSubnetGroupStateFault,
    InvalidS3BucketFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDBClusterFromS3",
}));

export type RestoreDBClusterFromSnapshotError =
  | DBClusterAlreadyExistsFault
  | DBClusterParameterGroupNotFoundFault
  | DBClusterQuotaExceededFault
  | DBClusterRoleQuotaExceededFault
  | DBClusterSnapshotNotFoundFault
  | DBSnapshotNotFoundFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | DomainNotFoundFault
  | InsufficientDBClusterCapacityFault
  | InsufficientDBInstanceCapacityFault
  | InsufficientStorageClusterCapacityFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBSnapshotStateFault
  | InvalidRestoreFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | OptionGroupNotFoundFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | VpcEncryptionControlViolationException
  | CommonErrors;
/**
 * Creates a new DB cluster from a DB snapshot or DB cluster snapshot.
 *
 * The target DB cluster is created from the source snapshot with a default configuration. If you don't specify a security group, the new DB cluster is associated with the default security group.
 *
 * You can use the `EnableVPCNetworking` and `EnableInternetAccessGateway` parameters together to restore an Aurora PostgreSQL cluster without VPC networking and with internet-based connectivity. These two parameters must always be specified together. Set `EnableVPCNetworking` to `false` to disable the VPC network interface (ENI) for the cluster. `EnableInternetAccessGateway` enables internet-based connectivity through an internet access gateway. IAM database authentication is required and must be enabled using `EnableIAMDatabaseAuthentication`. Once the cluster is restored, you need to modify the DB cluster to update `MasterUserAuthenticationType` to `iam-db-auth`.
 *
 * You can use the `AssociatedRoles` parameter to associate one or more Amazon Web Services Identity and Access Management (IAM) roles with an Aurora DB cluster when you restore it from a snapshot.
 *
 * This operation only restores the DB cluster, not the DB instances for that DB cluster. You must invoke the `CreateDBInstance` operation to create DB instances for the restored DB cluster, specifying the identifier of the restored DB cluster in `DBClusterIdentifier`. You can create DB instances only after the `RestoreDBClusterFromSnapshot` operation has completed and the DB cluster is available.
 *
 * For more information on Amazon Aurora DB clusters, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide.*
 */
export const restoreDBClusterFromSnapshot: API.OperationMethod<
  RestoreDBClusterFromSnapshotMessage,
  RestoreDBClusterFromSnapshotResult,
  RestoreDBClusterFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6752, __c211, 0) as any as S.Schema<RestoreDBClusterFromSnapshotMessage>,
  output: __S(6753, __c211, 1) as any as S.Schema<RestoreDBClusterFromSnapshotResult>,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterParameterGroupNotFoundFault,
    DBClusterQuotaExceededFault,
    DBClusterRoleQuotaExceededFault,
    DBClusterSnapshotNotFoundFault,
    DBSnapshotNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    DomainNotFoundFault,
    InsufficientDBClusterCapacityFault,
    InsufficientDBInstanceCapacityFault,
    InsufficientStorageClusterCapacityFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBSnapshotStateFault,
    InvalidRestoreFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    OptionGroupNotFoundFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
    VpcEncryptionControlViolationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDBClusterFromSnapshot",
}));

export type RestoreDBClusterToPointInTimeError =
  | DBClusterAlreadyExistsFault
  | DBClusterAutomatedBackupNotFoundFault
  | DBClusterNotFoundFault
  | DBClusterParameterGroupNotFoundFault
  | DBClusterQuotaExceededFault
  | DBClusterRoleQuotaExceededFault
  | DBClusterSnapshotNotFoundFault
  | DBSubnetGroupNotFoundFault
  | DomainNotFoundFault
  | InsufficientDBClusterCapacityFault
  | InsufficientDBInstanceCapacityFault
  | InsufficientStorageClusterCapacityFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBClusterStateFault
  | InvalidDBSnapshotStateFault
  | InvalidRestoreFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | OptionGroupNotFoundFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | VpcEncryptionControlViolationException
  | CommonErrors;
/**
 * Restores a DB cluster to an arbitrary point in time. Users can restore to any point in time before `LatestRestorableTime` for up to `BackupRetentionPeriod` days. The target DB cluster is created from the source DB cluster with the same configuration as the original DB cluster, except that the new DB cluster is created with the default DB security group. Unless the `RestoreType` is set to `copy-on-write`, the restore may occur in a different Availability Zone (AZ) from the original DB cluster. The AZ where RDS restores the DB cluster depends on the AZs in the specified subnet group.
 *
 * You can use the `EnableVPCNetworking` and `EnableInternetAccessGateway` parameters together to restore an Aurora PostgreSQL cluster without VPC networking and with internet-based connectivity. These two parameters must always be specified together. Set `EnableVPCNetworking` to `false` to disable the VPC network interface (ENI) for the cluster. `EnableInternetAccessGateway` enables internet-based connectivity through an internet access gateway. IAM database authentication is required and must be enabled using `EnableIAMDatabaseAuthentication`. Once the cluster is restored, you need to modify the DB cluster to update `MasterUserAuthenticationType` to `iam-db-auth`.
 *
 * You can use the `AssociatedRoles` parameter to associate one or more Amazon Web Services Identity and Access Management (IAM) roles with an Aurora DB cluster when you restore it to a point in time.
 *
 * For Aurora, this operation only restores the DB cluster, not the DB instances for that DB cluster. You must invoke the `CreateDBInstance` operation to create DB instances for the restored DB cluster, specifying the identifier of the restored DB cluster in `DBClusterIdentifier`. You can create DB instances only after the `RestoreDBClusterToPointInTime` operation has completed and the DB cluster is available.
 *
 * For more information on Amazon Aurora DB clusters, see What is Amazon Aurora? in the *Amazon Aurora User Guide*.
 *
 * For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the *Amazon RDS User Guide.*
 */
export const restoreDBClusterToPointInTime: API.OperationMethod<
  RestoreDBClusterToPointInTimeMessage,
  RestoreDBClusterToPointInTimeResult,
  RestoreDBClusterToPointInTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6784, __c212, 0) as any as S.Schema<RestoreDBClusterToPointInTimeMessage>,
  output: __S(6785, __c212, 1) as any as S.Schema<RestoreDBClusterToPointInTimeResult>,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterAutomatedBackupNotFoundFault,
    DBClusterNotFoundFault,
    DBClusterParameterGroupNotFoundFault,
    DBClusterQuotaExceededFault,
    DBClusterRoleQuotaExceededFault,
    DBClusterSnapshotNotFoundFault,
    DBSubnetGroupNotFoundFault,
    DomainNotFoundFault,
    InsufficientDBClusterCapacityFault,
    InsufficientDBInstanceCapacityFault,
    InsufficientStorageClusterCapacityFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBClusterStateFault,
    InvalidDBSnapshotStateFault,
    InvalidRestoreFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    OptionGroupNotFoundFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
    VpcEncryptionControlViolationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDBClusterToPointInTime",
}));

export type RestoreDBInstanceFromDBSnapshotError =
  | AuthorizationNotFoundFault
  | BackupPolicyNotFoundFault
  | CertificateNotFoundFault
  | DBClusterSnapshotNotFoundFault
  | DBInstanceAlreadyExistsFault
  | DBParameterGroupNotFoundFault
  | DBSecurityGroupNotFoundFault
  | DBSnapshotNotFoundFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | DomainNotFoundFault
  | InstanceQuotaExceededFault
  | InsufficientDBInstanceCapacityFault
  | InvalidDBSnapshotStateFault
  | InvalidRestoreFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | OptionGroupNotFoundFault
  | ProvisionedIopsNotAvailableInAZFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | TenantDatabaseQuotaExceededFault
  | VpcEncryptionControlViolationException
  | CommonErrors;
/**
 * Creates a new DB instance from a DB snapshot. The target database is created from the source database restore point with most of the source's original configuration, including the default security group and DB parameter group. By default, the new DB instance is created as a Single-AZ deployment, except when the instance is a SQL Server instance that has an option group associated with mirroring. In this case, the instance becomes a Multi-AZ deployment, not a Single-AZ deployment.
 *
 * If you want to replace your original DB instance with the new, restored DB instance, then rename your original DB instance before you call the `RestoreDBInstanceFromDBSnapshot` operation. RDS doesn't allow two DB instances with the same name. After you have renamed your original DB instance with a different identifier, then you can pass the original name of the DB instance as the `DBInstanceIdentifier` in the call to the `RestoreDBInstanceFromDBSnapshot` operation. The result is that you replace the original DB instance with the DB instance created from the snapshot.
 *
 * If you are restoring from a shared manual DB snapshot, the `DBSnapshotIdentifier` must be the ARN of the shared DB snapshot.
 *
 * To restore from a DB snapshot with an unsupported engine version, you must first upgrade the engine version of the snapshot. For more information about upgrading a RDS for MySQL DB snapshot engine version, see Upgrading a MySQL DB snapshot engine version. For more information about upgrading a RDS for PostgreSQL DB snapshot engine version, Upgrading a PostgreSQL DB snapshot engine version.
 *
 * This command doesn't apply to Aurora MySQL and Aurora PostgreSQL. For Aurora, use `RestoreDBClusterFromSnapshot`.
 */
export const restoreDBInstanceFromDBSnapshot: API.OperationMethod<
  RestoreDBInstanceFromDBSnapshotMessage,
  RestoreDBInstanceFromDBSnapshotResult,
  RestoreDBInstanceFromDBSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6816, __c213, 0) as any as S.Schema<RestoreDBInstanceFromDBSnapshotMessage>,
  output: __S(6817, __c213, 1) as any as S.Schema<RestoreDBInstanceFromDBSnapshotResult>,
  errors: [
    AuthorizationNotFoundFault,
    BackupPolicyNotFoundFault,
    CertificateNotFoundFault,
    DBClusterSnapshotNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBSecurityGroupNotFoundFault,
    DBSnapshotNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    DomainNotFoundFault,
    InstanceQuotaExceededFault,
    InsufficientDBInstanceCapacityFault,
    InvalidDBSnapshotStateFault,
    InvalidRestoreFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    OptionGroupNotFoundFault,
    ProvisionedIopsNotAvailableInAZFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
    TenantDatabaseQuotaExceededFault,
    VpcEncryptionControlViolationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDBInstanceFromDBSnapshot",
}));

export type RestoreDBInstanceFromS3Error =
  | AuthorizationNotFoundFault
  | BackupPolicyNotFoundFault
  | CertificateNotFoundFault
  | DBInstanceAlreadyExistsFault
  | DBParameterGroupNotFoundFault
  | DBSecurityGroupNotFoundFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | InstanceQuotaExceededFault
  | InsufficientDBInstanceCapacityFault
  | InvalidS3BucketFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | OptionGroupNotFoundFault
  | ProvisionedIopsNotAvailableInAZFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | VpcEncryptionControlViolationException
  | CommonErrors;
/**
 * Amazon Relational Database Service (Amazon RDS) supports importing MySQL databases by using backup files. You can create a backup of your on-premises database, store it on Amazon Simple Storage Service (Amazon S3), and then restore the backup file onto a new Amazon RDS DB instance running MySQL. For more information, see Restoring a backup into an Amazon RDS for MySQL DB instance in the *Amazon RDS User Guide.*
 *
 * This operation doesn't apply to RDS Custom.
 */
export const restoreDBInstanceFromS3: API.OperationMethod<
  RestoreDBInstanceFromS3Message,
  RestoreDBInstanceFromS3Result,
  RestoreDBInstanceFromS3Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6848, __c214, 0) as any as S.Schema<RestoreDBInstanceFromS3Message>,
  output: __S(6849, __c214, 1) as any as S.Schema<RestoreDBInstanceFromS3Result>,
  errors: [
    AuthorizationNotFoundFault,
    BackupPolicyNotFoundFault,
    CertificateNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBSecurityGroupNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    InstanceQuotaExceededFault,
    InsufficientDBInstanceCapacityFault,
    InvalidS3BucketFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    OptionGroupNotFoundFault,
    ProvisionedIopsNotAvailableInAZFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
    VpcEncryptionControlViolationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDBInstanceFromS3",
}));

export type RestoreDBInstanceToPointInTimeError =
  | AuthorizationNotFoundFault
  | BackupPolicyNotFoundFault
  | CertificateNotFoundFault
  | DBInstanceAlreadyExistsFault
  | DBInstanceAutomatedBackupNotFoundFault
  | DBInstanceNotFoundFault
  | DBParameterGroupNotFoundFault
  | DBSecurityGroupNotFoundFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | DomainNotFoundFault
  | InstanceQuotaExceededFault
  | InsufficientDBInstanceCapacityFault
  | InvalidDBInstanceStateFault
  | InvalidRestoreFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | OptionGroupNotFoundFault
  | PointInTimeRestoreNotEnabledFault
  | ProvisionedIopsNotAvailableInAZFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | TenantDatabaseQuotaExceededFault
  | VpcEncryptionControlViolationException
  | CommonErrors;
/**
 * Restores a DB instance to an arbitrary point in time. You can restore to any point in time before the time identified by the `LatestRestorableTime` property. You can restore to a point up to the number of days specified by the `BackupRetentionPeriod` property.
 *
 * The target database is created with most of the original configuration, but in a system-selected Availability Zone, with the default security group, the default subnet group, and the default DB parameter group. By default, the new DB instance is created as a single-AZ deployment except when the instance is a SQL Server instance that has an option group that is associated with mirroring; in this case, the instance becomes a mirrored deployment and not a single-AZ deployment.
 *
 * This operation doesn't apply to Aurora MySQL and Aurora PostgreSQL. For Aurora, use `RestoreDBClusterToPointInTime`.
 */
export const restoreDBInstanceToPointInTime: API.OperationMethod<
  RestoreDBInstanceToPointInTimeMessage,
  RestoreDBInstanceToPointInTimeResult,
  RestoreDBInstanceToPointInTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6880, __c215, 0) as any as S.Schema<RestoreDBInstanceToPointInTimeMessage>,
  output: __S(6881, __c215, 1) as any as S.Schema<RestoreDBInstanceToPointInTimeResult>,
  errors: [
    AuthorizationNotFoundFault,
    BackupPolicyNotFoundFault,
    CertificateNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBInstanceAutomatedBackupNotFoundFault,
    DBInstanceNotFoundFault,
    DBParameterGroupNotFoundFault,
    DBSecurityGroupNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    DomainNotFoundFault,
    InstanceQuotaExceededFault,
    InsufficientDBInstanceCapacityFault,
    InvalidDBInstanceStateFault,
    InvalidRestoreFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    OptionGroupNotFoundFault,
    PointInTimeRestoreNotEnabledFault,
    ProvisionedIopsNotAvailableInAZFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
    TenantDatabaseQuotaExceededFault,
    VpcEncryptionControlViolationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDBInstanceToPointInTime",
}));

export type RevokeDBSecurityGroupIngressError =
  | AuthorizationNotFoundFault
  | DBSecurityGroupNotFoundFault
  | InvalidDBSecurityGroupStateFault
  | CommonErrors;
/**
 * Revokes ingress from a DBSecurityGroup for previously authorized IP ranges or EC2 or VPC security groups. Required parameters for this API are one of CIDRIP, EC2SecurityGroupId for VPC, or (EC2SecurityGroupOwnerId and either EC2SecurityGroupName or EC2SecurityGroupId).
 *
 * EC2-Classic was retired on August 15, 2022. If you haven't migrated from EC2-Classic to a VPC, we recommend that you migrate as soon as possible. For more information, see Migrate from EC2-Classic to a VPC in the *Amazon EC2 User Guide*, the blog EC2-Classic Networking is Retiring - Here's How to Prepare, and Moving a DB instance not in a VPC into a VPC in the *Amazon RDS User Guide*.
 */
export const revokeDBSecurityGroupIngress: API.OperationMethod<
  RevokeDBSecurityGroupIngressMessage,
  RevokeDBSecurityGroupIngressResult,
  RevokeDBSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6912, __c216, 0) as any as S.Schema<RevokeDBSecurityGroupIngressMessage>,
  output: __S(6913, __c216, 1) as any as S.Schema<RevokeDBSecurityGroupIngressResult>,
  errors: [
    AuthorizationNotFoundFault,
    DBSecurityGroupNotFoundFault,
    InvalidDBSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeDBSecurityGroupIngress",
}));

export type StartActivityStreamError =
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Starts a database activity stream to monitor activity on the database. For more information, see Monitoring Amazon Aurora with Database Activity Streams in the *Amazon Aurora User Guide* or Monitoring Amazon RDS with Database Activity Streams in the *Amazon RDS User Guide*.
 */
export const startActivityStream: API.OperationMethod<
  StartActivityStreamRequest,
  StartActivityStreamResponse,
  StartActivityStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6944, __c217, 0) as any as S.Schema<StartActivityStreamRequest>,
  output: __S(6945, __c217, 1) as any as S.Schema<StartActivityStreamResponse>,
  errors: [
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartActivityStream",
}));

export type StartDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBShardGroupStateFault
  | KMSKeyNotAccessibleFault
  | VpcEncryptionControlViolationException
  | CommonErrors;
/**
 * Starts an Amazon Aurora DB cluster that was stopped using the Amazon Web Services console, the stop-db-cluster CLI command, or the `StopDBCluster` operation.
 *
 * For more information, see Stopping and Starting an Aurora Cluster in the *Amazon Aurora User Guide*.
 *
 * This operation only applies to Aurora DB clusters.
 */
export const startDBCluster: API.OperationMethod<
  StartDBClusterMessage,
  StartDBClusterResult,
  StartDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6976, __c218, 0) as any as S.Schema<StartDBClusterMessage>,
  output: __S(6977, __c218, 1) as any as S.Schema<StartDBClusterResult>,
  errors: [
    DBClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBShardGroupStateFault,
    KMSKeyNotAccessibleFault,
    VpcEncryptionControlViolationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDBCluster",
}));

export type StartDBInstanceError =
  | AuthorizationNotFoundFault
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | InsufficientDBInstanceCapacityFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | VpcEncryptionControlViolationException
  | CommonErrors;
/**
 * Starts an Amazon RDS DB instance that was stopped using the Amazon Web Services console, the stop-db-instance CLI command, or the `StopDBInstance` operation.
 *
 * For more information, see Starting an Amazon RDS DB instance That Was Previously Stopped in the *Amazon RDS User Guide.*
 *
 * This command doesn't apply to RDS Custom, Aurora MySQL, and Aurora PostgreSQL. For Aurora DB clusters, use `StartDBCluster` instead.
 */
export const startDBInstance: API.OperationMethod<
  StartDBInstanceMessage,
  StartDBInstanceResult,
  StartDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7008, __c219, 0) as any as S.Schema<StartDBInstanceMessage>,
  output: __S(7009, __c219, 1) as any as S.Schema<StartDBInstanceResult>,
  errors: [
    AuthorizationNotFoundFault,
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    InsufficientDBInstanceCapacityFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    VpcEncryptionControlViolationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDBInstance",
}));

export type StartDBInstanceAutomatedBackupsReplicationError =
  | DBInstanceAutomatedBackupQuotaExceededFault
  | DBInstanceNotFoundFault
  | InvalidDBInstanceAutomatedBackupStateFault
  | InvalidDBInstanceStateFault
  | KMSKeyNotAccessibleFault
  | StorageTypeNotSupportedFault
  | CommonErrors;
/**
 * Enables replication of automated backups to a different Amazon Web Services Region.
 *
 * This command doesn't apply to RDS Custom.
 *
 * For more information, see Replicating Automated Backups to Another Amazon Web Services Region in the *Amazon RDS User Guide.*
 */
export const startDBInstanceAutomatedBackupsReplication: API.OperationMethod<
  StartDBInstanceAutomatedBackupsReplicationMessage,
  StartDBInstanceAutomatedBackupsReplicationResult,
  StartDBInstanceAutomatedBackupsReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7040, __c220, 0) as any as S.Schema<StartDBInstanceAutomatedBackupsReplicationMessage>,
  output: __S(7041, __c220, 1) as any as S.Schema<StartDBInstanceAutomatedBackupsReplicationResult>,
  errors: [
    DBInstanceAutomatedBackupQuotaExceededFault,
    DBInstanceNotFoundFault,
    InvalidDBInstanceAutomatedBackupStateFault,
    InvalidDBInstanceStateFault,
    KMSKeyNotAccessibleFault,
    StorageTypeNotSupportedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDBInstanceAutomatedBackupsReplication",
}));

export type StartExportTaskError =
  | DBClusterNotFoundFault
  | DBClusterSnapshotNotFoundFault
  | DBSnapshotNotFoundFault
  | ExportTaskAlreadyExistsFault
  | IamRoleMissingPermissionsFault
  | IamRoleNotFoundFault
  | InvalidExportOnlyFault
  | InvalidExportSourceStateFault
  | InvalidS3BucketFault
  | KMSKeyNotAccessibleFault
  | CommonErrors;
/**
 * Starts an export of DB snapshot or DB cluster data to Amazon S3. The provided IAM role must have access to the S3 bucket.
 *
 * You can't export snapshot data from RDS Custom DB instances. For more information, see Supported Regions and DB engines for exporting snapshots to S3 in Amazon RDS.
 *
 * For more information on exporting DB snapshot data, see Exporting DB snapshot data to Amazon S3 in the *Amazon RDS User Guide* or Exporting DB cluster snapshot data to Amazon S3 in the *Amazon Aurora User Guide*.
 *
 * For more information on exporting DB cluster data, see Exporting DB cluster data to Amazon S3 in the *Amazon Aurora User Guide*.
 */
export const startExportTask: API.OperationMethod<
  StartExportTaskMessage,
  ExportTask,
  StartExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7072, __c221, 0) as any as S.Schema<StartExportTaskMessage>,
  output: __S(512, __c16, 0) as any as S.Schema<ExportTask>,
  errors: [
    DBClusterNotFoundFault,
    DBClusterSnapshotNotFoundFault,
    DBSnapshotNotFoundFault,
    ExportTaskAlreadyExistsFault,
    IamRoleMissingPermissionsFault,
    IamRoleNotFoundFault,
    InvalidExportOnlyFault,
    InvalidExportSourceStateFault,
    InvalidS3BucketFault,
    KMSKeyNotAccessibleFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExportTask",
}));

export type StopActivityStreamError =
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Stops a database activity stream that was started using the Amazon Web Services console, the `start-activity-stream` CLI command, or the `StartActivityStream` operation.
 *
 * For more information, see Monitoring Amazon Aurora with Database Activity Streams in the *Amazon Aurora User Guide* or Monitoring Amazon RDS with Database Activity Streams in the *Amazon RDS User Guide*.
 */
export const stopActivityStream: API.OperationMethod<
  StopActivityStreamRequest,
  StopActivityStreamResponse,
  StopActivityStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7104, __c222, 0) as any as S.Schema<StopActivityStreamRequest>,
  output: __S(7105, __c222, 1) as any as S.Schema<StopActivityStreamResponse>,
  errors: [
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopActivityStream",
}));

export type StopDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBShardGroupStateFault
  | CommonErrors;
/**
 * Stops an Amazon Aurora DB cluster. When you stop a DB cluster, Aurora retains the DB cluster's metadata, including its endpoints and DB parameter groups. Aurora also retains the transaction logs so you can do a point-in-time restore if necessary.
 *
 * For more information, see Stopping and Starting an Aurora Cluster in the *Amazon Aurora User Guide*.
 *
 * This operation only applies to Aurora DB clusters.
 */
export const stopDBCluster: API.OperationMethod<
  StopDBClusterMessage,
  StopDBClusterResult,
  StopDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7136, __c223, 0) as any as S.Schema<StopDBClusterMessage>,
  output: __S(7137, __c223, 1) as any as S.Schema<StopDBClusterResult>,
  errors: [
    DBClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBShardGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDBCluster",
}));

export type StopDBInstanceError =
  | DBInstanceNotFoundFault
  | DBSnapshotAlreadyExistsFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Stops an Amazon RDS DB instance temporarily. When you stop a DB instance, Amazon RDS retains the DB instance's metadata, including its endpoint, DB parameter group, and option group membership. Amazon RDS also retains the transaction logs so you can do a point-in-time restore if necessary. The instance restarts automatically after 7 days.
 *
 * For more information, see Stopping an Amazon RDS DB Instance Temporarily in the *Amazon RDS User Guide.*
 *
 * This command doesn't apply to RDS Custom, Aurora MySQL, and Aurora PostgreSQL. For Aurora clusters, use `StopDBCluster` instead.
 */
export const stopDBInstance: API.OperationMethod<
  StopDBInstanceMessage,
  StopDBInstanceResult,
  StopDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7168, __c224, 0) as any as S.Schema<StopDBInstanceMessage>,
  output: __S(7169, __c224, 1) as any as S.Schema<StopDBInstanceResult>,
  errors: [
    DBInstanceNotFoundFault,
    DBSnapshotAlreadyExistsFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDBInstance",
}));

export type StopDBInstanceAutomatedBackupsReplicationError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Stops automated backup replication for a DB instance.
 *
 * This command doesn't apply to RDS Custom, Aurora MySQL, and Aurora PostgreSQL.
 *
 * For more information, see Replicating Automated Backups to Another Amazon Web Services Region in the *Amazon RDS User Guide.*
 */
export const stopDBInstanceAutomatedBackupsReplication: API.OperationMethod<
  StopDBInstanceAutomatedBackupsReplicationMessage,
  StopDBInstanceAutomatedBackupsReplicationResult,
  StopDBInstanceAutomatedBackupsReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7200, __c225, 0) as any as S.Schema<StopDBInstanceAutomatedBackupsReplicationMessage>,
  output: __S(7201, __c225, 1) as any as S.Schema<StopDBInstanceAutomatedBackupsReplicationResult>,
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDBInstanceAutomatedBackupsReplication",
}));

export type SwitchoverBlueGreenDeploymentError =
  | BlueGreenDeploymentNotFoundFault
  | InvalidBlueGreenDeploymentStateFault
  | CommonErrors;
/**
 * Switches over a blue/green deployment.
 *
 * Before you switch over, production traffic is routed to the databases in the blue environment. After you switch over, production traffic is routed to the databases in the green environment.
 *
 * For more information, see Using Amazon RDS Blue/Green Deployments for database updates in the *Amazon RDS User Guide* and Using Amazon RDS Blue/Green Deployments for database updates in the *Amazon Aurora User Guide*.
 */
export const switchoverBlueGreenDeployment: API.OperationMethod<
  SwitchoverBlueGreenDeploymentRequest,
  SwitchoverBlueGreenDeploymentResponse,
  SwitchoverBlueGreenDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7232, __c226, 0) as any as S.Schema<SwitchoverBlueGreenDeploymentRequest>,
  output: __S(7233, __c226, 1) as any as S.Schema<SwitchoverBlueGreenDeploymentResponse>,
  errors: [BlueGreenDeploymentNotFoundFault, InvalidBlueGreenDeploymentStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SwitchoverBlueGreenDeployment",
}));

export type SwitchoverGlobalClusterError =
  | DBClusterNotFoundFault
  | GlobalClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Switches over the specified secondary DB cluster to be the new primary DB cluster in the global database cluster. Switchover operations were previously called "managed planned failovers."
 *
 * Aurora promotes the specified secondary cluster to assume full read/write capabilities and demotes the current primary cluster to a secondary (read-only) cluster, maintaining the orginal replication topology. All secondary clusters are synchronized with the primary at the beginning of the process so the new primary continues operations for the Aurora global database without losing any data. Your database is unavailable for a short time while the primary and selected secondary clusters are assuming their new roles. For more information about switching over an Aurora global database, see Performing switchovers for Amazon Aurora global databases in the *Amazon Aurora User Guide*.
 *
 * This operation is intended for controlled environments, for operations such as "regional rotation" or to fall back to the original primary after a global database failover.
 */
export const switchoverGlobalCluster: API.OperationMethod<
  SwitchoverGlobalClusterMessage,
  SwitchoverGlobalClusterResult,
  SwitchoverGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7264, __c227, 0) as any as S.Schema<SwitchoverGlobalClusterMessage>,
  output: __S(7265, __c227, 1) as any as S.Schema<SwitchoverGlobalClusterResult>,
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

export type SwitchoverReadReplicaError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Switches over an Oracle standby database in an Oracle Data Guard environment, making it the new primary database. Issue this command in the Region that hosts the current standby database.
 */
export const switchoverReadReplica: API.OperationMethod<
  SwitchoverReadReplicaMessage,
  SwitchoverReadReplicaResult,
  SwitchoverReadReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7296, __c228, 0) as any as S.Schema<SwitchoverReadReplicaMessage>,
  output: __S(7297, __c228, 1) as any as S.Schema<SwitchoverReadReplicaResult>,
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SwitchoverReadReplica",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
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
function __c1(j: number): any {
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
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          RoleArn: S.optional(S.String),
          FeatureName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddRoleToDBInstanceMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AddRoleToDBInstanceResponse",
      });
  }
}
function __c3(j: number): any {
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
        S.Struct({ EventSubscription: S.optional(__S(161, __c5, 1)) }).pipe(ns),
      ).annotate({ identifier: "AddSourceIdentifierToSubscriptionResult" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("EventCategory")));
  }
}
function __c5(j: number): any {
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
          SourceIdsList: S.optional(__S(160, __c5, 0)),
          EventCategoriesList: S.optional(__S(128, __c4, 0)),
          Enabled: S.optional(S.Boolean),
          EventSubscriptionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventSubscription" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceName: S.optional(S.String), Tags: S.optional(__S(225, __c7, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsToResourceMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AddTagsToResourceResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(224, __c7, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "Tag" }),
      );
  }
}
function __c8(j: number): any {
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
        S.Struct({ ResourcePendingMaintenanceActions: S.optional(__S(290, __c9, 2)) }).pipe(ns),
      ).annotate({ identifier: "ApplyPendingMaintenanceActionResult" });
  }
}
function __c9(j: number): any {
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
        /*@__PURE__*/ __S(288, __c9, 0)
          .pipe(/*@__PURE__*/ T.XmlName("PendingMaintenanceAction"))
          .annotate({ identifier: "PendingMaintenanceAction" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.optional(S.String),
          PendingMaintenanceActionDetails: S.optional(__S(289, __c9, 1)),
        }),
      ).annotate({ identifier: "ResourcePendingMaintenanceActions" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSecurityGroupName: S.optional(S.String),
          CIDRIP: S.optional(S.String),
          EC2SecurityGroupName: S.optional(S.String),
          EC2SecurityGroupId: S.optional(S.String),
          EC2SecurityGroupOwnerId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AuthorizeDBSecurityGroupIngressMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSecurityGroup: S.optional(__S(356, __c11, 4)) }).pipe(ns),
      ).annotate({ identifier: "AuthorizeDBSecurityGroupIngressResult" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          EC2SecurityGroupName: S.optional(S.String),
          EC2SecurityGroupId: S.optional(S.String),
          EC2SecurityGroupOwnerId: S.optional(S.String),
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
        S.Struct({ Status: S.optional(S.String), CIDRIP: S.optional(S.String) }),
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
          OwnerId: S.optional(S.String),
          DBSecurityGroupName: S.optional(S.String),
          DBSecurityGroupDescription: S.optional(S.String),
          VpcId: S.optional(S.String),
          EC2SecurityGroups: S.optional(__S(353, __c11, 1)),
          IPRanges: S.optional(__S(355, __c11, 3)),
          DBSecurityGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBSecurityGroup" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          BacktrackTo: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Force: S.optional(S.Boolean),
          UseEarliestTimeOnPointInTimeUnavailable: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BacktrackDBClusterMessage" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          BacktrackIdentifier: S.optional(S.String),
          BacktrackTo: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          BacktrackedFrom: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          BacktrackRequestCreationTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          Status: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterBacktrack" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExportTaskIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelExportTaskMessage" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExportTaskIdentifier: S.optional(S.String),
          SourceArn: S.optional(S.String),
          ExportOnly: S.optional(__S(480, __c15, 0)),
          SnapshotTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TaskStartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TaskEndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          S3Bucket: S.optional(S.String),
          S3Prefix: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Status: S.optional(S.String),
          PercentProgress: S.optional(S.Number),
          TotalExtractedDataInGB: S.optional(S.Number),
          FailureCause: S.optional(S.String),
          WarningMessage: S.optional(S.String),
          SourceType: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ExportTask" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDBClusterParameterGroupIdentifier: S.optional(S.String),
          TargetDBClusterParameterGroupIdentifier: S.optional(S.String),
          TargetDBClusterParameterGroupDescription: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyDBClusterParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterParameterGroup: S.optional(__S(576, __c18, 0)) }).pipe(ns),
      ).annotate({ identifier: "CopyDBClusterParameterGroupResult" });
  }
}
function __c18(j: number): any {
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
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDBClusterSnapshotIdentifier: S.optional(S.String),
          TargetDBClusterSnapshotIdentifier: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          PreSignedUrl: S.optional(SensitiveString),
          CopyTags: S.optional(S.Boolean),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyDBClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshot: S.optional(__S(672, __c21, 0)) }).pipe(ns),
      ).annotate({ identifier: "CopyDBClusterSnapshotResult" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AvailabilityZone")));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(640, __c20, 0)),
          DBClusterSnapshotIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          SnapshotCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Engine: S.optional(S.String),
          EngineMode: S.optional(S.String),
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
          StorageEncryptionType: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          DBClusterSnapshotArn: S.optional(S.String),
          SourceDBClusterSnapshotArn: S.optional(S.String),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          TagList: S.optional(__S(225, __c7, 1)),
          StorageType: S.optional(S.String),
          StorageThroughput: S.optional(S.Number),
          DbClusterResourceId: S.optional(S.String),
          DBSystemId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBClusterSnapshot" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDBParameterGroupIdentifier: S.optional(S.String),
          TargetDBParameterGroupIdentifier: S.optional(S.String),
          TargetDBParameterGroupDescription: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyDBParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBParameterGroup: S.optional(__S(736, __c23, 0)) }).pipe(ns),
      ).annotate({ identifier: "CopyDBParameterGroupResult" });
  }
}
function __c23(j: number): any {
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDBSnapshotIdentifier: S.optional(S.String),
          TargetDBSnapshotIdentifier: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          CopyTags: S.optional(S.Boolean),
          PreSignedUrl: S.optional(SensitiveString),
          OptionGroupName: S.optional(S.String),
          TargetCustomAvailabilityZone: S.optional(S.String),
          SnapshotTarget: S.optional(S.String),
          CopyOptionGroup: S.optional(S.Boolean),
          SnapshotAvailabilityZone: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyDBSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSnapshot: S.optional(__S(864, __c27, 0)) }).pipe(ns),
      ).annotate({ identifier: "CopyDBSnapshotResult" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeName: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          IOPS: S.optional(S.Number),
          MaxAllocatedStorage: S.optional(S.Number),
          StorageThroughput: S.optional(S.Number),
          StorageType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdditionalStorageVolume" });
    case 1:
      return S.Array(__S(800, __c25, 0));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "ProcessorFeature" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(832, __c26, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ProcessorFeature"))
          .annotate({ identifier: "ProcessorFeature" }),
      );
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSnapshotIdentifier: S.optional(S.String),
          DBInstanceIdentifier: S.optional(S.String),
          SnapshotCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Engine: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          Status: S.optional(S.String),
          Port: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          VpcId: S.optional(S.String),
          InstanceCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MasterUsername: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          Iops: S.optional(S.Number),
          StorageThroughput: S.optional(S.Number),
          OptionGroupName: S.optional(S.String),
          PercentProgress: S.optional(S.Number),
          SourceRegion: S.optional(S.String),
          SourceDBSnapshotIdentifier: S.optional(S.String),
          StorageType: S.optional(S.String),
          TdeCredentialArn: S.optional(S.String),
          Encrypted: S.optional(S.Boolean),
          StorageEncryptionType: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          DBSnapshotArn: S.optional(S.String),
          Timezone: S.optional(S.String),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          ProcessorFeatures: S.optional(__S(833, __c26, 1)),
          DbiResourceId: S.optional(S.String),
          TagList: S.optional(__S(225, __c7, 1)),
          SnapshotTarget: S.optional(S.String),
          OriginalSnapshotCreateTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          SnapshotDatabaseTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DBSystemId: S.optional(S.String),
          MultiTenant: S.optional(S.Boolean),
          DedicatedLogVolume: S.optional(S.Boolean),
          AdditionalStorageVolumes: S.optional(__S(801, __c25, 1)),
          SnapshotAvailabilityZone: S.optional(S.String),
          FullSnapshotSizeInBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DBSnapshot" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceOptionGroupIdentifier: S.optional(S.String),
          TargetOptionGroupIdentifier: S.optional(S.String),
          TargetOptionGroupDescription: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyOptionGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ OptionGroup: S.optional(__S(996, __c31, 4)) }).pipe(ns),
      ).annotate({ identifier: "CopyOptionGroupResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcSecurityGroupId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "VpcSecurityGroupMembership" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(928, __c29, 0)
          .pipe(/*@__PURE__*/ T.XmlName("VpcSecurityGroupMembership"))
          .annotate({ identifier: "VpcSecurityGroupMembership" }),
      );
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBSecurityGroupName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "DBSecurityGroupMembership" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(960, __c30, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBSecurityGroup"))
          .annotate({ identifier: "DBSecurityGroupMembership" }),
      );
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Value: S.optional(SensitiveString),
          DefaultValue: S.optional(S.String),
          Description: S.optional(S.String),
          ApplyType: S.optional(S.String),
          DataType: S.optional(S.String),
          AllowedValues: S.optional(S.String),
          IsModifiable: S.optional(S.Boolean),
          IsCollection: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "OptionSetting" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(992, __c31, 0)
          .pipe(/*@__PURE__*/ T.XmlName("OptionSetting"))
          .annotate({ identifier: "OptionSetting" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          OptionName: S.optional(S.String),
          OptionDescription: S.optional(S.String),
          Persistent: S.optional(S.Boolean),
          Permanent: S.optional(S.Boolean),
          Port: S.optional(S.Number),
          OptionVersion: S.optional(S.String),
          OptionSettings: S.optional(__S(993, __c31, 1)),
          DBSecurityGroupMemberships: S.optional(__S(961, __c30, 1)),
          VpcSecurityGroupMemberships: S.optional(__S(929, __c29, 1)),
        }),
      ).annotate({ identifier: "Option" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(994, __c31, 2)
          .pipe(/*@__PURE__*/ T.XmlName("Option"))
          .annotate({ identifier: "Option" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          OptionGroupName: S.optional(S.String),
          OptionGroupDescription: S.optional(S.String),
          EngineName: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
          Options: S.optional(__S(995, __c31, 3)),
          AllowsVpcAndNonVpcInstanceMemberships: S.optional(S.Boolean),
          VpcId: S.optional(S.String),
          OptionGroupArn: S.optional(S.String),
          SourceOptionGroup: S.optional(S.String),
          SourceAccountId: S.optional(S.String),
          CopyTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "OptionGroup" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceArn: S.String, TargetKmsKeyId: S.optional(S.String) }),
      ).annotate({ identifier: "TargetResourceConfiguration" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1024, __c32, 0)
          .pipe(/*@__PURE__*/ T.XmlName("TargetResourceConfiguration"))
          .annotate({ identifier: "TargetResourceConfiguration" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          BlueGreenDeploymentName: S.optional(S.String),
          Source: S.optional(S.String),
          TargetEngineVersion: S.optional(S.String),
          TargetDBParameterGroupName: S.optional(S.String),
          TargetDBClusterParameterGroupName: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          TargetDBInstanceClass: S.optional(S.String),
          UpgradeTargetStorageConfig: S.optional(S.Boolean),
          TargetIops: S.optional(S.Number),
          TargetStorageType: S.optional(S.String),
          TargetAllocatedStorage: S.optional(S.Number),
          TargetStorageThroughput: S.optional(S.Number),
          TargetResourceConfigurations: S.optional(__S(1025, __c32, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBlueGreenDeploymentRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ BlueGreenDeployment: S.optional(__S(1060, __c33, 4)) }).pipe(ns),
      ).annotate({ identifier: "CreateBlueGreenDeploymentResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceMember: S.optional(S.String),
          TargetMember: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "SwitchoverDetail" });
    case 1:
      return S.Array(__S(1056, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "BlueGreenDeploymentTask" });
    case 3:
      return S.Array(__S(1058, __c33, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          BlueGreenDeploymentIdentifier: S.optional(S.String),
          BlueGreenDeploymentName: S.optional(S.String),
          Source: S.optional(S.String),
          Target: S.optional(S.String),
          SwitchoverDetails: S.optional(__S(1057, __c33, 1)),
          Tasks: S.optional(__S(1059, __c33, 3)),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          CreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DeleteTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TagList: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "BlueGreenDeployment" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DatabaseInstallationFilesS3BucketName: S.optional(S.String),
          DatabaseInstallationFilesS3Prefix: S.optional(S.String),
          DatabaseInstallationFiles: S.optional(__S(480, __c15, 0)),
          ImageId: S.optional(S.String),
          KMSKeyId: S.optional(S.String),
          SourceCustomDbEngineVersionIdentifier: S.optional(S.String),
          UseAwsProvidedLatestImage: S.optional(S.Boolean),
          Description: S.optional(S.String),
          Manifest: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCustomDBEngineVersionMessage" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MinCapacity: S.optional(S.Number), MaxCapacity: S.optional(S.Number) }),
      ).annotate({ identifier: "ServerlessV2FeaturesSupport" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CharacterSetName: S.optional(S.String),
          CharacterSetDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "CharacterSet" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ImageId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "CustomDBEngineVersionAMI" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1216, __c38, 0)
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
          SupportedEngineModes: S.optional(__S(1152, __c36, 0)),
          SupportsParallelQuery: S.optional(S.Boolean),
          SupportsGlobalDatabases: S.optional(S.Boolean),
          SupportsBabelfish: S.optional(S.Boolean),
          SupportsLimitlessDatabase: S.optional(S.Boolean),
          SupportsLocalWriteForwarding: S.optional(S.Boolean),
          SupportsIntegrations: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpgradeTarget" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(1219, __c38, 3)
          .pipe(/*@__PURE__*/ T.XmlName("UpgradeTarget"))
          .annotate({ identifier: "UpgradeTarget" }),
      );
    case 5:
      return S.suspend(() => S.Struct({ TimezoneName: S.optional(S.String) })).annotate({
        identifier: "Timezone",
      });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(1221, __c38, 5)
          .pipe(/*@__PURE__*/ T.XmlName("Timezone"))
          .annotate({ identifier: "Timezone" }),
      );
    case 7:
      return S.Array(S.String);
    case 8:
      return S.Array(S.String);
    case 9:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DatabaseInstallationFilesS3BucketName: S.optional(S.String),
          DatabaseInstallationFilesS3Prefix: S.optional(S.String),
          DatabaseInstallationFiles: S.optional(__S(480, __c15, 0)),
          CustomDBEngineVersionManifest: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          DBEngineDescription: S.optional(S.String),
          DBEngineVersionArn: S.optional(S.String),
          DBEngineVersionDescription: S.optional(S.String),
          DefaultCharacterSet: S.optional(__S(1216, __c38, 0)),
          FailureReason: S.optional(S.String),
          Image: S.optional(__S(1217, __c38, 1)),
          DBEngineMediaType: S.optional(S.String),
          KMSKeyId: S.optional(S.String),
          CreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SupportedCharacterSets: S.optional(__S(1218, __c38, 2)),
          SupportedNcharCharacterSets: S.optional(__S(1218, __c38, 2)),
          ValidUpgradeTarget: S.optional(__S(1220, __c38, 4)),
          SupportedTimezones: S.optional(__S(1222, __c38, 6)),
          ExportableLogTypes: S.optional(__S(1120, __c35, 0)),
          SupportsLogExportsToCloudwatchLogs: S.optional(S.Boolean),
          SupportsReadReplica: S.optional(S.Boolean),
          SupportedEngineModes: S.optional(__S(1152, __c36, 0)),
          SupportedFeatureNames: S.optional(__S(1223, __c38, 7)),
          Status: S.optional(S.String),
          SupportsParallelQuery: S.optional(S.Boolean),
          SupportsGlobalDatabases: S.optional(S.Boolean),
          TagList: S.optional(__S(225, __c7, 1)),
          SupportsBabelfish: S.optional(S.Boolean),
          SupportsLimitlessDatabase: S.optional(S.Boolean),
          SupportsCertificateRotationWithoutRestart: S.optional(S.Boolean),
          SupportedCACertificateIdentifiers: S.optional(__S(1224, __c38, 8)),
          SupportsLocalWriteForwarding: S.optional(S.Boolean),
          SupportsIntegrations: S.optional(S.Boolean),
          ServerlessV2FeaturesSupport: S.optional(__S(1184, __c37, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DBEngineVersion" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(640, __c20, 0)),
          BackupRetentionPeriod: S.optional(S.Number),
          CharacterSetName: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          DBClusterParameterGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(1344, __c42, 0)),
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
          Tags: S.optional(__S(225, __c7, 1)),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          PreSignedUrl: S.optional(SensitiveString),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          BacktrackWindow: S.optional(S.Number),
          EnableCloudwatchLogsExports: S.optional(__S(1120, __c35, 0)),
          EngineMode: S.optional(S.String),
          ScalingConfiguration: S.optional(__S(1472, __c46, 0)),
          RdsCustomClusterConfiguration: S.optional(__S(1408, __c44, 0)),
          DBClusterInstanceClass: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          StorageType: S.optional(S.String),
          Iops: S.optional(S.Number),
          PubliclyAccessible: S.optional(S.Boolean),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          DeletionProtection: S.optional(S.Boolean),
          GlobalClusterIdentifier: S.optional(S.String),
          EnableHttpEndpoint: S.optional(S.Boolean),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          Domain: S.optional(S.String),
          DomainIAMRoleName: S.optional(S.String),
          EnableGlobalWriteForwarding: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          ServerlessV2ScalingConfiguration: S.optional(__S(1440, __c45, 0)),
          MonitoringInterval: S.optional(S.Number),
          MonitoringRoleArn: S.optional(S.String),
          DatabaseInsightsMode: S.optional(S.String),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          PerformanceInsightsRetentionPeriod: S.optional(S.Number),
          EnableLimitlessDatabase: S.optional(S.Boolean),
          ClusterScalabilityType: S.optional(S.String),
          DBSystemId: S.optional(S.String),
          ManageMasterUserPassword: S.optional(S.Boolean),
          EnableLocalWriteForwarding: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
          CACertificateIdentifier: S.optional(S.String),
          EngineLifecycleSupport: S.optional(S.String),
          TagSpecifications: S.optional(__S(1377, __c43, 1)),
          MasterUserAuthenticationType: S.optional(S.String),
          WithExpressConfiguration: S.optional(S.Boolean),
          AssociatedRoles: S.optional(__S(1505, __c47, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1422, __c44, 14)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBClusterResult" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SecretArn: S.optional(S.String),
          SecretStatus: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "MasterUserSecret" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LogTypesToEnable: S.optional(__S(1120, __c35, 0)),
          LogTypesToDisable: S.optional(__S(1120, __c35, 0)),
        }),
      ).annotate({ identifier: "PendingCloudwatchLogsExports" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CAIdentifier: S.optional(S.String),
          ValidTill: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CertificateDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Domain: S.optional(S.String),
          Status: S.optional(S.String),
          FQDN: S.optional(S.String),
          IAMRoleName: S.optional(S.String),
          OU: S.optional(S.String),
          AuthSecretArn: S.optional(S.String),
          DnsIps: S.optional(__S(480, __c15, 0)),
        }),
      ).annotate({ identifier: "DomainMembership" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(1314, __c41, 2)
          .pipe(/*@__PURE__*/ T.XmlName("DomainMembership"))
          .annotate({ identifier: "DomainMembership" }),
      );
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("VpcSecurityGroupId")));
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.optional(S.String), Tags: S.optional(__S(225, __c7, 1)) }),
      ).annotate({ identifier: "TagSpecification" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1376, __c43, 0)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "TagSpecification" }),
      );
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InterconnectSubnetId: S.optional(S.String),
          TransitGatewayMulticastDomainId: S.optional(S.String),
          ReplicaMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "RdsCustomClusterConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterOptionGroupName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "DBClusterOptionGroupStatus" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1409, __c44, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterOptionGroup"))
          .annotate({ identifier: "DBClusterOptionGroupStatus" }),
      );
    case 3:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ReadReplicaIdentifier")));
    case 4:
      return S.suspend(() =>
        S.Struct({
          StatusType: S.optional(S.String),
          Normal: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBClusterStatusInfo" });
    case 5:
      return S.Array(
        /*@__PURE__*/ __S(1412, __c44, 4)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterStatusInfo"))
          .annotate({ identifier: "DBClusterStatusInfo" }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          IsClusterWriter: S.optional(S.Boolean),
          DBClusterParameterGroupStatus: S.optional(S.String),
          PromotionTier: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DBClusterMember" });
    case 7:
      return S.Array(
        /*@__PURE__*/ __S(1414, __c44, 6)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterMember"))
          .annotate({ identifier: "DBClusterMember" }),
      );
    case 8:
      return S.suspend(() =>
        S.Struct({
          RoleArn: S.optional(S.String),
          Status: S.optional(S.String),
          FeatureName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBClusterRole" });
    case 9:
      return S.Array(
        /*@__PURE__*/ __S(1416, __c44, 8)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterRole"))
          .annotate({ identifier: "DBClusterRole" }),
      );
    case 10:
      return S.suspend(() =>
        S.Struct({
          PendingCloudwatchLogsExports: S.optional(__S(1312, __c41, 0)),
          DBClusterIdentifier: S.optional(S.String),
          MasterUserPassword: S.optional(SensitiveString),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          EngineVersion: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          StorageType: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          RdsCustomClusterConfiguration: S.optional(__S(1408, __c44, 0)),
          Iops: S.optional(S.Number),
          CertificateDetails: S.optional(__S(1313, __c41, 1)),
        }),
      ).annotate({ identifier: "ClusterPendingModifiedValues" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          MinCapacity: S.optional(S.Number),
          MaxCapacity: S.optional(S.Number),
          AutoPause: S.optional(S.Boolean),
          SecondsUntilAutoPause: S.optional(S.Number),
          TimeoutAction: S.optional(S.String),
          SecondsBeforeTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ScalingConfigurationInfo" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          MinCapacity: S.optional(S.Number),
          MaxCapacity: S.optional(S.Number),
          SecondsUntilAutoPause: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ServerlessV2ScalingConfigurationInfo" });
    case 13:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String), MinRequiredACU: S.optional(S.Number) }),
      ).annotate({ identifier: "LimitlessDatabase" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          AllocatedStorage: S.optional(S.Number),
          AvailabilityZones: S.optional(__S(640, __c20, 0)),
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
          CustomEndpoints: S.optional(__S(480, __c15, 0)),
          MultiAZ: S.optional(S.Boolean),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          LatestRestorableTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Port: S.optional(S.Number),
          MasterUsername: S.optional(S.String),
          DBClusterOptionGroupMemberships: S.optional(__S(1410, __c44, 2)),
          PreferredBackupWindow: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          UpgradeRolloutOrder: S.optional(S.String),
          ReplicationSourceIdentifier: S.optional(S.String),
          ReadReplicaIdentifiers: S.optional(__S(1411, __c44, 3)),
          StatusInfos: S.optional(__S(1413, __c44, 5)),
          DBClusterMembers: S.optional(__S(1415, __c44, 7)),
          VpcSecurityGroups: S.optional(__S(929, __c29, 1)),
          HostedZoneId: S.optional(S.String),
          StorageEncrypted: S.optional(S.Boolean),
          StorageEncryptionType: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          DbClusterResourceId: S.optional(S.String),
          DBClusterArn: S.optional(S.String),
          AssociatedRoles: S.optional(__S(1417, __c44, 9)),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          CloneGroupId: S.optional(S.String),
          ClusterCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EarliestBacktrackTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          BacktrackWindow: S.optional(S.Number),
          BacktrackConsumedChangeRecords: S.optional(S.Number),
          EnabledCloudwatchLogsExports: S.optional(__S(1120, __c35, 0)),
          Capacity: S.optional(S.Number),
          PendingModifiedValues: S.optional(__S(1418, __c44, 10)),
          EngineMode: S.optional(S.String),
          ScalingConfigurationInfo: S.optional(__S(1419, __c44, 11)),
          RdsCustomClusterConfiguration: S.optional(__S(1408, __c44, 0)),
          DBClusterInstanceClass: S.optional(S.String),
          StorageType: S.optional(S.String),
          Iops: S.optional(S.Number),
          StorageThroughput: S.optional(S.Number),
          IOOptimizedNextAllowedModificationTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          PubliclyAccessible: S.optional(S.Boolean),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          DeletionProtection: S.optional(S.Boolean),
          HttpEndpointEnabled: S.optional(S.Boolean),
          ActivityStreamMode: S.optional(S.String),
          ActivityStreamStatus: S.optional(S.String),
          ActivityStreamKmsKeyId: S.optional(S.String),
          ActivityStreamKinesisStreamName: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          CrossAccountClone: S.optional(S.Boolean),
          DomainMemberships: S.optional(__S(1315, __c41, 3)),
          TagList: S.optional(__S(225, __c7, 1)),
          GlobalClusterIdentifier: S.optional(S.String),
          GlobalWriteForwardingStatus: S.optional(S.String),
          GlobalWriteForwardingRequested: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          AutomaticRestartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ServerlessV2ScalingConfiguration: S.optional(__S(1420, __c44, 12)),
          ServerlessV2PlatformVersion: S.optional(S.String),
          MonitoringInterval: S.optional(S.Number),
          MonitoringRoleArn: S.optional(S.String),
          DatabaseInsightsMode: S.optional(S.String),
          PerformanceInsightsEnabled: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          PerformanceInsightsRetentionPeriod: S.optional(S.Number),
          DBSystemId: S.optional(S.String),
          MasterUserSecret: S.optional(__S(1280, __c40, 0)),
          LocalWriteForwardingStatus: S.optional(S.String),
          AwsBackupRecoveryPointArn: S.optional(S.String),
          LimitlessDatabase: S.optional(__S(1421, __c44, 13)),
          ClusterScalabilityType: S.optional(S.String),
          CertificateDetails: S.optional(__S(1313, __c41, 1)),
          EngineLifecycleSupport: S.optional(S.String),
          VPCNetworkingEnabled: S.optional(S.Boolean),
          InternetAccessGatewayEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DBCluster" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MinCapacity: S.optional(S.Number),
          MaxCapacity: S.optional(S.Number),
          SecondsUntilAutoPause: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ServerlessV2ScalingConfiguration" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MinCapacity: S.optional(S.Number),
          MaxCapacity: S.optional(S.Number),
          AutoPause: S.optional(S.Boolean),
          SecondsUntilAutoPause: S.optional(S.Number),
          TimeoutAction: S.optional(S.String),
          SecondsBeforeTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ScalingConfiguration" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RoleArn: S.String, FeatureName: S.optional(S.String) }),
      ).annotate({ identifier: "DBClusterAssociatedRole" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1504, __c47, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterAssociatedRole"))
          .annotate({ identifier: "DBClusterAssociatedRole" }),
      );
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          DBClusterEndpointIdentifier: S.optional(S.String),
          EndpointType: S.optional(S.String),
          StaticMembers: S.optional(__S(480, __c15, 0)),
          ExcludedMembers: S.optional(__S(480, __c15, 0)),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBClusterEndpointMessage" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterEndpointIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          DBClusterEndpointResourceIdentifier: S.optional(S.String),
          Endpoint: S.optional(S.String),
          Status: S.optional(S.String),
          EndpointType: S.optional(S.String),
          CustomEndpointType: S.optional(S.String),
          StaticMembers: S.optional(__S(480, __c15, 0)),
          ExcludedMembers: S.optional(__S(480, __c15, 0)),
          DBClusterEndpointArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterEndpoint" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBClusterParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterParameterGroup: S.optional(__S(576, __c18, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBClusterParameterGroupResult" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterSnapshotIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshot: S.optional(__S(672, __c21, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBClusterSnapshotResult" });
  }
}
function __c52(j: number): any {
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
          DBSecurityGroups: S.optional(__S(1824, __c57, 0)),
          VpcSecurityGroupIds: S.optional(__S(1344, __c42, 0)),
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
          StorageThroughput: S.optional(S.Number),
          OptionGroupName: S.optional(S.String),
          CharacterSetName: S.optional(S.String),
          NcharCharacterSetName: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          Tags: S.optional(__S(225, __c7, 1)),
          DBClusterIdentifier: S.optional(S.String),
          StorageType: S.optional(S.String),
          TdeCredentialArn: S.optional(S.String),
          TdeCredentialPassword: S.optional(SensitiveString),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          Domain: S.optional(S.String),
          DomainFqdn: S.optional(S.String),
          DomainOu: S.optional(S.String),
          DomainAuthSecretArn: S.optional(S.String),
          DomainDnsIps: S.optional(__S(480, __c15, 0)),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          MonitoringInterval: S.optional(S.Number),
          MonitoringRoleArn: S.optional(S.String),
          DomainIAMRoleName: S.optional(S.String),
          PromotionTier: S.optional(S.Number),
          Timezone: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          DatabaseInsightsMode: S.optional(S.String),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          PerformanceInsightsRetentionPeriod: S.optional(S.Number),
          EnableCloudwatchLogsExports: S.optional(__S(1120, __c35, 0)),
          ProcessorFeatures: S.optional(__S(833, __c26, 1)),
          DeletionProtection: S.optional(S.Boolean),
          MaxAllocatedStorage: S.optional(S.Number),
          EnableCustomerOwnedIp: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          BackupTarget: S.optional(S.String),
          CustomIamInstanceProfile: S.optional(S.String),
          DBSystemId: S.optional(S.String),
          CACertificateIdentifier: S.optional(S.String),
          ManageMasterUserPassword: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
          MultiTenant: S.optional(S.Boolean),
          DedicatedLogVolume: S.optional(S.Boolean),
          EngineLifecycleSupport: S.optional(S.String),
          AdditionalStorageVolumes: S.optional(__S(801, __c25, 1)),
          TagSpecifications: S.optional(__S(1377, __c43, 1)),
          MasterUserAuthenticationType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBInstanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBInstanceResult" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "AvailabilityZone",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "Outpost",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SubnetIdentifier: S.optional(S.String),
          SubnetAvailabilityZone: S.optional(__S(1696, __c53, 0)),
          SubnetOutpost: S.optional(__S(1728, __c54, 0)),
          SubnetStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Subnet" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1729, __c54, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Subnet"))
          .annotate({ identifier: "Subnet" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          DBSubnetGroupName: S.optional(S.String),
          DBSubnetGroupDescription: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetGroupStatus: S.optional(S.String),
          Subnets: S.optional(__S(1730, __c54, 2)),
          DBSubnetGroupArn: S.optional(S.String),
          SupportedNetworkTypes: S.optional(__S(480, __c15, 0)),
        }),
      ).annotate({ identifier: "DBSubnetGroup" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBInstanceAutomatedBackupsArn: S.optional(S.String) }),
      ).annotate({ identifier: "DBInstanceAutomatedBackupsReplication" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1760, __c55, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBInstanceAutomatedBackupsReplication"))
          .annotate({ identifier: "DBInstanceAutomatedBackupsReplication" }),
      );
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          ParameterApplyStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBParameterGroupStatus" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1792, __c56, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBParameterGroup"))
          .annotate({ identifier: "DBParameterGroupStatus" }),
      );
    case 2:
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
          StorageThroughput: S.optional(S.Number),
          DBInstanceIdentifier: S.optional(S.String),
          StorageType: S.optional(S.String),
          CACertificateIdentifier: S.optional(S.String),
          DBSubnetGroupName: S.optional(S.String),
          PendingCloudwatchLogsExports: S.optional(__S(1312, __c41, 0)),
          ProcessorFeatures: S.optional(__S(833, __c26, 1)),
          AutomationMode: S.optional(S.String),
          ResumeFullAutomationModeTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          MultiTenant: S.optional(S.Boolean),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          DedicatedLogVolume: S.optional(S.Boolean),
          Engine: S.optional(S.String),
          AdditionalStorageVolumes: S.optional(__S(801, __c25, 1)),
        }),
      ).annotate({ identifier: "PendingModifiedValues" });
    case 3:
      return S.Array(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ReadReplicaDBInstanceIdentifier")),
      );
    case 4:
      return S.Array(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("ReadReplicaDBClusterIdentifier")),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({ OptionGroupName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "OptionGroupMembership" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(1797, __c56, 5)
          .pipe(/*@__PURE__*/ T.XmlName("OptionGroupMembership"))
          .annotate({ identifier: "OptionGroupMembership" }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({
          StatusType: S.optional(S.String),
          Normal: S.optional(S.Boolean),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBInstanceStatusInfo" });
    case 8:
      return S.Array(
        /*@__PURE__*/ __S(1799, __c56, 7)
          .pipe(/*@__PURE__*/ T.XmlName("DBInstanceStatusInfo"))
          .annotate({ identifier: "DBInstanceStatusInfo" }),
      );
    case 9:
      return S.suspend(() =>
        S.Struct({
          RoleArn: S.optional(S.String),
          FeatureName: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBInstanceRole" });
    case 10:
      return S.Array(
        /*@__PURE__*/ __S(1801, __c56, 9)
          .pipe(/*@__PURE__*/ T.XmlName("DBInstanceRole"))
          .annotate({ identifier: "DBInstanceRole" }),
      );
    case 11:
      return S.suspend(() =>
        S.Struct({
          VolumeName: S.optional(S.String),
          StorageVolumeStatus: S.optional(S.String),
          StorageOperationStatus: S.optional(S.String),
          StorageOperationPercentProgress: S.optional(S.Number),
          AllocatedStorage: S.optional(S.Number),
          IOPS: S.optional(S.Number),
          MaxAllocatedStorage: S.optional(S.Number),
          StorageThroughput: S.optional(S.Number),
          StorageType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdditionalStorageVolumeOutput" });
    case 12:
      return S.Array(__S(1803, __c56, 11));
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
          DBSecurityGroups: S.optional(__S(961, __c30, 1)),
          VpcSecurityGroups: S.optional(__S(929, __c29, 1)),
          DBParameterGroups: S.optional(__S(1793, __c56, 1)),
          AvailabilityZone: S.optional(S.String),
          DBSubnetGroup: S.optional(__S(1731, __c54, 3)),
          PreferredMaintenanceWindow: S.optional(S.String),
          UpgradeRolloutOrder: S.optional(S.String),
          PendingModifiedValues: S.optional(__S(1794, __c56, 2)),
          LatestRestorableTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MultiAZ: S.optional(S.Boolean),
          EngineVersion: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          ReadReplicaSourceDBInstanceIdentifier: S.optional(S.String),
          ReadReplicaDBInstanceIdentifiers: S.optional(__S(1795, __c56, 3)),
          ReadReplicaDBClusterIdentifiers: S.optional(__S(1796, __c56, 4)),
          ReplicaMode: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          Iops: S.optional(S.Number),
          StorageThroughput: S.optional(S.Number),
          OptionGroupMemberships: S.optional(__S(1798, __c56, 6)),
          CharacterSetName: S.optional(S.String),
          NcharCharacterSetName: S.optional(S.String),
          SecondaryAvailabilityZone: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          StatusInfos: S.optional(__S(1800, __c56, 8)),
          StorageType: S.optional(S.String),
          StorageEncryptionType: S.optional(S.String),
          TdeCredentialArn: S.optional(S.String),
          DbInstancePort: S.optional(S.Number),
          DBClusterIdentifier: S.optional(S.String),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          DbiResourceId: S.optional(S.String),
          CACertificateIdentifier: S.optional(S.String),
          DomainMemberships: S.optional(__S(1315, __c41, 3)),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          MonitoringInterval: S.optional(S.Number),
          EnhancedMonitoringResourceArn: S.optional(S.String),
          MonitoringRoleArn: S.optional(S.String),
          PromotionTier: S.optional(S.Number),
          DBInstanceArn: S.optional(S.String),
          Timezone: S.optional(S.String),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          DatabaseInsightsMode: S.optional(S.String),
          PerformanceInsightsEnabled: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          PerformanceInsightsRetentionPeriod: S.optional(S.Number),
          EnabledCloudwatchLogsExports: S.optional(__S(1120, __c35, 0)),
          ProcessorFeatures: S.optional(__S(833, __c26, 1)),
          DeletionProtection: S.optional(S.Boolean),
          AssociatedRoles: S.optional(__S(1802, __c56, 10)),
          ListenerEndpoint: S.optional(Endpoint),
          MaxAllocatedStorage: S.optional(S.Number),
          TagList: S.optional(__S(225, __c7, 1)),
          AutomationMode: S.optional(S.String),
          ResumeFullAutomationModeTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          CustomerOwnedIpEnabled: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          ActivityStreamStatus: S.optional(S.String),
          ActivityStreamKmsKeyId: S.optional(S.String),
          ActivityStreamKinesisStreamName: S.optional(S.String),
          ActivityStreamMode: S.optional(S.String),
          ActivityStreamEngineNativeAuditFieldsIncluded: S.optional(S.Boolean),
          AwsBackupRecoveryPointArn: S.optional(S.String),
          DBInstanceAutomatedBackupsReplications: S.optional(__S(1761, __c55, 1)),
          BackupTarget: S.optional(S.String),
          AutomaticRestartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CustomIamInstanceProfile: S.optional(S.String),
          ActivityStreamPolicyStatus: S.optional(S.String),
          CertificateDetails: S.optional(__S(1313, __c41, 1)),
          DBSystemId: S.optional(S.String),
          MasterUserSecret: S.optional(__S(1280, __c40, 0)),
          ReadReplicaSourceDBClusterIdentifier: S.optional(S.String),
          PercentProgress: S.optional(S.String),
          MultiTenant: S.optional(S.Boolean),
          DedicatedLogVolume: S.optional(S.Boolean),
          IsStorageConfigUpgradeAvailable: S.optional(S.Boolean),
          EngineLifecycleSupport: S.optional(S.String),
          AdditionalStorageVolumes: S.optional(__S(1804, __c56, 12)),
          StorageVolumeStatus: S.optional(S.String),
          StorageOperationStatus: S.optional(S.String),
          StorageOperationPercentProgress: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DBInstance" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("DBSecurityGroupName")));
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          SourceDBInstanceIdentifier: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          Port: S.optional(S.Number),
          MultiAZ: S.optional(S.Boolean),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          Iops: S.optional(S.Number),
          StorageThroughput: S.optional(S.Number),
          OptionGroupName: S.optional(S.String),
          DBParameterGroupName: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          Tags: S.optional(__S(225, __c7, 1)),
          DBSubnetGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(1344, __c42, 0)),
          StorageType: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          MonitoringInterval: S.optional(S.Number),
          MonitoringRoleArn: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          PreSignedUrl: S.optional(SensitiveString),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          DatabaseInsightsMode: S.optional(S.String),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          PerformanceInsightsRetentionPeriod: S.optional(S.Number),
          EnableCloudwatchLogsExports: S.optional(__S(1120, __c35, 0)),
          ProcessorFeatures: S.optional(__S(833, __c26, 1)),
          UseDefaultProcessorFeatures: S.optional(S.Boolean),
          DeletionProtection: S.optional(S.Boolean),
          Domain: S.optional(S.String),
          DomainIAMRoleName: S.optional(S.String),
          DomainFqdn: S.optional(S.String),
          DomainOu: S.optional(S.String),
          DomainAuthSecretArn: S.optional(S.String),
          DomainDnsIps: S.optional(__S(480, __c15, 0)),
          ReplicaMode: S.optional(S.String),
          EnableCustomerOwnedIp: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          MaxAllocatedStorage: S.optional(S.Number),
          BackupTarget: S.optional(S.String),
          CustomIamInstanceProfile: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          SourceDBClusterIdentifier: S.optional(S.String),
          DedicatedLogVolume: S.optional(S.Boolean),
          UpgradeStorageConfig: S.optional(S.Boolean),
          CACertificateIdentifier: S.optional(S.String),
          AdditionalStorageVolumes: S.optional(__S(801, __c25, 1)),
          TagSpecifications: S.optional(__S(1377, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBInstanceReadReplicaMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBInstanceReadReplicaResult" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBParameterGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBParameterGroup: S.optional(__S(736, __c23, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBParameterGroupResult" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBProxyName: S.optional(S.String),
          EngineFamily: S.optional(S.String),
          DefaultAuthScheme: S.optional(S.String),
          Auth: S.optional(__S(1985, __c62, 1)),
          RoleArn: S.optional(S.String),
          VpcSubnetIds: S.optional(__S(480, __c15, 0)),
          VpcSecurityGroupIds: S.optional(__S(480, __c15, 0)),
          RequireTLS: S.optional(S.Boolean),
          IdleClientTimeout: S.optional(S.Number),
          DebugLogging: S.optional(S.Boolean),
          Tags: S.optional(__S(225, __c7, 1)),
          EndpointNetworkType: S.optional(S.String),
          TargetConnectionNetworkType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBProxyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBProxy: S.optional(__S(1954, __c61, 2)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBProxyResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          UserName: S.optional(S.String),
          AuthScheme: S.optional(S.String),
          SecretArn: S.optional(S.String),
          IAMAuth: S.optional(S.String),
          ClientPasswordAuthType: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserAuthConfigInfo" });
    case 1:
      return S.Array(__S(1952, __c61, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DBProxyName: S.optional(S.String),
          DBProxyArn: S.optional(S.String),
          Status: S.optional(S.String),
          EngineFamily: S.optional(S.String),
          VpcId: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(480, __c15, 0)),
          VpcSubnetIds: S.optional(__S(480, __c15, 0)),
          DefaultAuthScheme: S.optional(S.String),
          Auth: S.optional(__S(1953, __c61, 1)),
          RoleArn: S.optional(S.String),
          Endpoint: S.optional(S.String),
          RequireTLS: S.optional(S.Boolean),
          IdleClientTimeout: S.optional(S.Number),
          DebugLogging: S.optional(S.Boolean),
          CreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndpointNetworkType: S.optional(S.String),
          TargetConnectionNetworkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBProxy" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          UserName: S.optional(S.String),
          AuthScheme: S.optional(S.String),
          SecretArn: S.optional(S.String),
          IAMAuth: S.optional(S.String),
          ClientPasswordAuthType: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserAuthConfig" });
    case 1:
      return S.Array(__S(1984, __c62, 0));
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBProxyName: S.optional(S.String),
          DBProxyEndpointName: S.optional(S.String),
          VpcSubnetIds: S.optional(__S(480, __c15, 0)),
          VpcSecurityGroupIds: S.optional(__S(480, __c15, 0)),
          TargetRole: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          EndpointNetworkType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBProxyEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBProxyEndpoint: S.optional(__S(2048, __c64, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBProxyEndpointResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBProxyEndpointName: S.optional(S.String),
          DBProxyEndpointArn: S.optional(S.String),
          DBProxyName: S.optional(S.String),
          Status: S.optional(S.String),
          VpcId: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(480, __c15, 0)),
          VpcSubnetIds: S.optional(__S(480, __c15, 0)),
          Endpoint: S.optional(S.String),
          CreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          TargetRole: S.optional(S.String),
          IsDefault: S.optional(S.Boolean),
          EndpointNetworkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DBProxyEndpoint" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSecurityGroupName: S.optional(S.String),
          DBSecurityGroupDescription: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBSecurityGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSecurityGroup: S.optional(__S(356, __c11, 4)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBSecurityGroupResult" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBShardGroupIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          ComputeRedundancy: S.optional(S.Number),
          MaxACU: S.optional(S.Number),
          MinACU: S.optional(S.Number),
          PubliclyAccessible: S.optional(S.Boolean),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBShardGroupMessage" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBShardGroupResourceId: S.optional(S.String),
          DBShardGroupIdentifier: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          MaxACU: S.optional(S.Number),
          MinACU: S.optional(S.Number),
          ComputeRedundancy: S.optional(S.Number),
          Status: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          Endpoint: S.optional(S.String),
          DBShardGroupArn: S.optional(S.String),
          TagList: S.optional(__S(225, __c7, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBShardGroup" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSnapshotIdentifier: S.optional(S.String),
          DBInstanceIdentifier: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSnapshot: S.optional(__S(864, __c27, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBSnapshotResult" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSubnetGroupName: S.optional(S.String),
          DBSubnetGroupDescription: S.optional(S.String),
          SubnetIds: S.optional(__S(2240, __c70, 0)),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDBSubnetGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSubnetGroup: S.optional(__S(1731, __c54, 3)) }).pipe(ns),
      ).annotate({ identifier: "CreateDBSubnetGroupResult" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SubnetIdentifier")));
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SourceType: S.optional(S.String),
          EventCategories: S.optional(__S(128, __c4, 0)),
          SourceIds: S.optional(__S(160, __c5, 0)),
          Enabled: S.optional(S.Boolean),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEventSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(161, __c5, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateEventSubscriptionResult" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalClusterIdentifier: S.optional(S.String),
          SourceDBClusterIdentifier: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          EngineLifecycleSupport: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          DatabaseName: S.optional(S.String),
          StorageEncrypted: S.optional(S.Boolean),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGlobalClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalCluster: S.optional(__S(2340, __c73, 4)) }).pipe(ns),
      ).annotate({ identifier: "CreateGlobalClusterResult" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBClusterArn: S.optional(S.String),
          Readers: S.optional(__S(2336, __c73, 0)),
          IsWriter: S.optional(S.Boolean),
          GlobalWriteForwardingStatus: S.optional(S.String),
          SynchronizationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GlobalClusterMember" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(2337, __c73, 1)
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
          EngineLifecycleSupport: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          StorageEncrypted: S.optional(S.Boolean),
          StorageEncryptionType: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          GlobalClusterMembers: S.optional(__S(2338, __c73, 2)),
          Endpoint: S.optional(S.String),
          FailoverState: S.optional(__S(2339, __c73, 3)),
          TagList: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "GlobalCluster" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceArn: S.optional(S.String),
          TargetArn: S.optional(S.String),
          IntegrationName: S.optional(S.String),
          KMSKeyId: S.optional(S.String),
          AdditionalEncryptionContext: S.optional(__S(2400, __c75, 0)),
          Tags: S.optional(__S(225, __c7, 1)),
          DataFilter: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateIntegrationMessage" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "IntegrationError" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(2401, __c75, 1)
          .pipe(/*@__PURE__*/ T.XmlName("IntegrationError"))
          .annotate({ identifier: "IntegrationError" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          SourceArn: S.optional(S.String),
          TargetArn: S.optional(S.String),
          IntegrationName: S.optional(S.String),
          IntegrationArn: S.optional(S.String),
          KMSKeyId: S.optional(S.String),
          AdditionalEncryptionContext: S.optional(__S(2400, __c75, 0)),
          Status: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          DataFilter: S.optional(S.String),
          Description: S.optional(S.String),
          CreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Errors: S.optional(__S(2402, __c75, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "Integration" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OptionGroupName: S.optional(S.String),
          EngineName: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
          OptionGroupDescription: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateOptionGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ OptionGroup: S.optional(__S(996, __c31, 4)) }).pipe(ns),
      ).annotate({ identifier: "CreateOptionGroupResult" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          TenantDBName: S.optional(S.String),
          MasterUsername: S.optional(S.String),
          MasterUserPassword: S.optional(SensitiveString),
          CharacterSetName: S.optional(S.String),
          NcharCharacterSetName: S.optional(S.String),
          ManageMasterUserPassword: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTenantDatabaseMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TenantDatabase: S.optional(__S(2497, __c78, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateTenantDatabaseResult" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MasterUserPassword: S.optional(SensitiveString),
          TenantDBName: S.optional(S.String),
        }),
      ).annotate({ identifier: "TenantDatabasePendingModifiedValues" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TenantDatabaseCreateTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          DBInstanceIdentifier: S.optional(S.String),
          TenantDBName: S.optional(S.String),
          Status: S.optional(S.String),
          MasterUsername: S.optional(S.String),
          DbiResourceId: S.optional(S.String),
          TenantDatabaseResourceId: S.optional(S.String),
          TenantDatabaseARN: S.optional(S.String),
          CharacterSetName: S.optional(S.String),
          NcharCharacterSetName: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          PendingModifiedValues: S.optional(__S(2496, __c78, 0)),
          MasterUserSecret: S.optional(__S(1280, __c40, 0)),
          TagList: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "TenantDatabase" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlueGreenDeploymentIdentifier: S.optional(S.String),
          DeleteTarget: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteBlueGreenDeploymentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BlueGreenDeployment: S.optional(__S(1060, __c33, 4)) }).pipe(ns),
      ).annotate({ identifier: "DeleteBlueGreenDeploymentResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Engine: S.optional(S.String), EngineVersion: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCustomDBEngineVersionMessage" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          SkipFinalSnapshot: S.optional(S.Boolean),
          FinalDBSnapshotIdentifier: S.optional(S.String),
          DeleteAutomatedBackups: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1422, __c44, 14)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBClusterResult" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DbClusterResourceId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBClusterAutomatedBackupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterAutomatedBackup: S.optional(__S(2688, __c84, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBClusterAutomatedBackupResult" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EarliestTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LatestTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "RestoreWindow" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          VpcId: S.optional(S.String),
          DBClusterAutomatedBackupsArn: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          RestoreWindow: S.optional(__S(2656, __c83, 0)),
          MasterUsername: S.optional(S.String),
          DbClusterResourceId: S.optional(S.String),
          Region: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          Status: S.optional(S.String),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          ClusterCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StorageEncrypted: S.optional(S.Boolean),
          StorageEncryptionType: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          EngineVersion: S.optional(S.String),
          DBClusterArn: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          EngineMode: S.optional(S.String),
          AvailabilityZones: S.optional(__S(640, __c20, 0)),
          Port: S.optional(S.Number),
          KmsKeyId: S.optional(S.String),
          StorageType: S.optional(S.String),
          Iops: S.optional(S.Number),
          StorageThroughput: S.optional(S.Number),
          AwsBackupRecoveryPointArn: S.optional(S.String),
          TagList: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "DBClusterAutomatedBackup" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterEndpointIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBClusterEndpointMessage" });
  }
}
function __c86(j: number): any {
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
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBClusterSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshot: S.optional(__S(672, __c21, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBClusterSnapshotResult" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          SkipFinalSnapshot: S.optional(S.Boolean),
          FinalDBSnapshotIdentifier: S.optional(S.String),
          DeleteAutomatedBackups: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteDBInstanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBInstanceResult" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DbiResourceId: S.optional(S.String),
          DBInstanceAutomatedBackupsArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteDBInstanceAutomatedBackupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstanceAutomatedBackup: S.optional(__S(2880, __c90, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBInstanceAutomatedBackupResult" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceArn: S.optional(S.String),
          DbiResourceId: S.optional(S.String),
          Region: S.optional(S.String),
          DBInstanceIdentifier: S.optional(S.String),
          RestoreWindow: S.optional(__S(2656, __c83, 0)),
          AllocatedStorage: S.optional(S.Number),
          Status: S.optional(S.String),
          Port: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          VpcId: S.optional(S.String),
          InstanceCreateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MasterUsername: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          Iops: S.optional(S.Number),
          StorageThroughput: S.optional(S.Number),
          OptionGroupName: S.optional(S.String),
          TdeCredentialArn: S.optional(S.String),
          Encrypted: S.optional(S.Boolean),
          StorageEncryptionType: S.optional(S.String),
          StorageType: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Timezone: S.optional(S.String),
          IAMDatabaseAuthenticationEnabled: S.optional(S.Boolean),
          BackupRetentionPeriod: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          DBInstanceAutomatedBackupsArn: S.optional(S.String),
          DBInstanceAutomatedBackupsReplications: S.optional(__S(1761, __c55, 1)),
          BackupTarget: S.optional(S.String),
          MultiTenant: S.optional(S.Boolean),
          AwsBackupRecoveryPointArn: S.optional(S.String),
          TagList: S.optional(__S(225, __c7, 1)),
          DedicatedLogVolume: S.optional(S.Boolean),
          AdditionalStorageVolumes: S.optional(__S(801, __c25, 1)),
        }),
      ).annotate({ identifier: "DBInstanceAutomatedBackup" });
  }
}
function __c91(j: number): any {
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
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBProxyName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBProxyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBProxy: S.optional(__S(1954, __c61, 2)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBProxyResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBProxyEndpointName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBProxyEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBProxyEndpoint: S.optional(__S(2048, __c64, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBProxyEndpointResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBSecurityGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBSecurityGroupMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteDBSecurityGroupResponse",
      });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBShardGroupIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBShardGroupMessage" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBSnapshotIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDBSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSnapshot: S.optional(__S(864, __c27, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteDBSnapshotResult" });
  }
}
function __c97(j: number): any {
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
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubscriptionName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(161, __c5, 1)) }).pipe(ns),
      ).annotate({ identifier: "DeleteEventSubscriptionResult" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GlobalClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGlobalClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GlobalCluster: S.optional(__S(2340, __c73, 4)) }).pipe(ns),
      ).annotate({ identifier: "DeleteGlobalClusterResult" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IntegrationIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIntegrationMessage" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OptionGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOptionGroupMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteOptionGroupResponse",
      });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          TenantDBName: S.optional(S.String),
          SkipFinalSnapshot: S.optional(S.Boolean),
          FinalDBSnapshotIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteTenantDatabaseMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TenantDatabase: S.optional(__S(2497, __c78, 1)) }).pipe(ns),
      ).annotate({ identifier: "DeleteTenantDatabaseResult" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBProxyName: S.optional(S.String),
          TargetGroupName: S.optional(S.String),
          DBInstanceIdentifiers: S.optional(__S(480, __c15, 0)),
          DBClusterIdentifiers: S.optional(__S(480, __c15, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeregisterDBProxyTargetsRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeregisterDBProxyTargetsResponse",
      });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccountAttributesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountQuotaName: S.optional(S.String),
          Used: S.optional(S.Number),
          Max: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AccountQuota" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3329, __c104, 1)
          .pipe(/*@__PURE__*/ T.XmlName("AccountQuota"))
          .annotate({ identifier: "AccountQuota" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ AccountQuotas: S.optional(__S(3330, __c104, 2)) }).pipe(ns),
      ).annotate({ identifier: "AccountAttributesMessage" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlueGreenDeploymentIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBlueGreenDeploymentsRequest" });
    case 1:
      return S.Array(__S(1060, __c33, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          BlueGreenDeployments: S.optional(__S(3361, __c105, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeBlueGreenDeploymentsResponse" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Value")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(3392, __c106, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3393, __c106, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Filter"))
          .annotate({ identifier: "Filter" }),
      );
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCertificatesMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(3456, __c108, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Certificate"))
          .annotate({ identifier: "Certificate" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          DefaultCertificateForNewLaunches: S.optional(S.String),
          Certificates: S.optional(__S(3425, __c107, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CertificateMessage" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateIdentifier: S.optional(S.String),
          CertificateType: S.optional(S.String),
          Thumbprint: S.optional(S.String),
          ValidFrom: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ValidTill: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CertificateArn: S.optional(S.String),
          CustomerOverride: S.optional(S.Boolean),
          CustomerOverrideValidTill: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "Certificate" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DbClusterResourceId: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterAutomatedBackupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2688, __c84, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterAutomatedBackup"))
          .annotate({ identifier: "DBClusterAutomatedBackup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusterAutomatedBackups: S.optional(__S(3489, __c109, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterAutomatedBackupMessage" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          BacktrackIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterBacktracksMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(416, __c13, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterBacktrack"))
          .annotate({ identifier: "DBClusterBacktrack" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusterBacktracks: S.optional(__S(3521, __c110, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterBacktrackMessage" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          DBClusterEndpointIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterEndpointsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1568, __c49, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterEndpointList"))
          .annotate({ identifier: "DBClusterEndpoint" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusterEndpoints: S.optional(__S(3553, __c111, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterEndpointMessage" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterParameterGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(576, __c18, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterParameterGroup"))
          .annotate({ identifier: "DBClusterParameterGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusterParameterGroups: S.optional(__S(3585, __c112, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterParameterGroupsMessage" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          Source: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Parameters: S.optional(__S(3649, __c114, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterParameterGroupDetails" });
  }
}
function __c114(j: number): any {
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
          SupportedEngineModes: S.optional(__S(1152, __c36, 0)),
        }),
      ).annotate({ identifier: "Parameter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(3648, __c114, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Parameter"))
          .annotate({ identifier: "Parameter" }),
      );
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          IncludeShared: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClustersMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1422, __c44, 14)
          .pipe(/*@__PURE__*/ T.XmlName("DBCluster"))
          .annotate({ identifier: "DBCluster" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusters: S.optional(__S(3681, __c115, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterMessage" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDBClusterSnapshotAttributesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotAttributesResult: S.optional(__S(3778, __c118, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeDBClusterSnapshotAttributesResult" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AttributeValue")));
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AttributeName: S.optional(S.String),
          AttributeValues: S.optional(__S(3744, __c117, 0)),
        }),
      ).annotate({ identifier: "DBClusterSnapshotAttribute" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(3776, __c118, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterSnapshotAttribute"))
          .annotate({ identifier: "DBClusterSnapshotAttribute" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          DBClusterSnapshotIdentifier: S.optional(S.String),
          DBClusterSnapshotAttributes: S.optional(__S(3777, __c118, 1)),
        }),
      ).annotate({ identifier: "DBClusterSnapshotAttributesResult" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          DBClusterSnapshotIdentifier: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          IncludeShared: S.optional(S.Boolean),
          IncludePublic: S.optional(S.Boolean),
          DbClusterResourceId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBClusterSnapshotsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(672, __c21, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBClusterSnapshot"))
          .annotate({ identifier: "DBClusterSnapshot" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBClusterSnapshots: S.optional(__S(3809, __c119, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterSnapshotMessage" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DBParameterGroupFamily: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          DefaultOnly: S.optional(S.Boolean),
          ListSupportedCharacterSets: S.optional(S.Boolean),
          ListSupportedTimezones: S.optional(S.Boolean),
          IncludeAll: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBEngineVersionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1225, __c38, 9)
          .pipe(/*@__PURE__*/ T.XmlName("DBEngineVersion"))
          .annotate({ identifier: "DBEngineVersion" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBEngineVersions: S.optional(__S(3841, __c120, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBEngineVersionMessage" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DbiResourceId: S.optional(S.String),
          DBInstanceIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          DBInstanceAutomatedBackupsArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBInstanceAutomatedBackupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2880, __c90, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBInstanceAutomatedBackup"))
          .annotate({ identifier: "DBInstanceAutomatedBackup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBInstanceAutomatedBackups: S.optional(__S(3873, __c121, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBInstanceAutomatedBackupMessage" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBInstancesMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1805, __c56, 13)
          .pipe(/*@__PURE__*/ T.XmlName("DBInstance"))
          .annotate({ identifier: "DBInstance" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBInstances: S.optional(__S(3905, __c122, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBInstanceMessage" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          FilenameContains: S.optional(S.String),
          FileLastWritten: S.optional(S.Number),
          FileSize: S.optional(S.Number),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBLogFilesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LogFileName: S.optional(S.String),
          LastWritten: S.optional(S.Number),
          Size: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DescribeDBLogFilesDetails" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3937, __c123, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DescribeDBLogFilesDetails"))
          .annotate({ identifier: "DescribeDBLogFilesDetails" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          DescribeDBLogFiles: S.optional(__S(3938, __c123, 2)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDBLogFilesResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBMajorEngineVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LifecycleSupportName: S.optional(S.String),
          LifecycleSupportStartDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          LifecycleSupportEndDate: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "SupportedEngineLifecycle" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3969, __c124, 1)
          .pipe(/*@__PURE__*/ T.XmlName("SupportedEngineLifecycle"))
          .annotate({ identifier: "SupportedEngineLifecycle" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
          SupportedEngineLifecycles: S.optional(__S(3970, __c124, 2)),
        }),
      ).annotate({ identifier: "DBMajorEngineVersion" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(3971, __c124, 3)
          .pipe(/*@__PURE__*/ T.XmlName("DBMajorEngineVersion"))
          .annotate({ identifier: "DBMajorEngineVersion" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          DBMajorEngineVersions: S.optional(__S(3972, __c124, 4)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDBMajorEngineVersionsResponse" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBParameterGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(736, __c23, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBParameterGroup"))
          .annotate({ identifier: "DBParameterGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBParameterGroups: S.optional(__S(4001, __c125, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBParameterGroupsMessage" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          Source: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Parameters: S.optional(__S(3649, __c114, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DBParameterGroupDetails" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBProxyName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBProxiesRequest" });
    case 1:
      return S.Array(__S(1954, __c61, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DBProxies: S.optional(__S(4065, __c127, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDBProxiesResponse" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBProxyName: S.optional(S.String),
          DBProxyEndpointName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBProxyEndpointsRequest" });
    case 1:
      return S.Array(__S(2048, __c64, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DBProxyEndpoints: S.optional(__S(4097, __c128, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDBProxyEndpointsResponse" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBProxyName: S.optional(S.String),
          TargetGroupName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBProxyTargetGroupsRequest" });
    case 1:
      return S.Array(__S(4161, __c130, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TargetGroups: S.optional(__S(4129, __c129, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDBProxyTargetGroupsResponse" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxConnectionsPercent: S.optional(S.Number),
          MaxIdleConnectionsPercent: S.optional(S.Number),
          ConnectionBorrowTimeout: S.optional(S.Number),
          SessionPinningFilters: S.optional(__S(480, __c15, 0)),
          InitQuery: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ConnectionPoolConfigurationInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBProxyName: S.optional(S.String),
          TargetGroupName: S.optional(S.String),
          TargetGroupArn: S.optional(S.String),
          IsDefault: S.optional(S.Boolean),
          Status: S.optional(S.String),
          ConnectionPoolConfig: S.optional(__S(4160, __c130, 0)),
          CreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "DBProxyTargetGroup" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBProxyName: S.optional(S.String),
          TargetGroupName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBProxyTargetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Targets: S.optional(__S(4226, __c132, 2)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeDBProxyTargetsResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          Reason: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetHealth" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TargetArn: S.optional(S.String),
          Endpoint: S.optional(S.String),
          TrackedClusterId: S.optional(S.String),
          RdsResourceId: S.optional(S.String),
          Port: S.optional(S.Number),
          Type: S.optional(S.String),
          Role: S.optional(S.String),
          TargetHealth: S.optional(__S(4224, __c132, 0)),
        }),
      ).annotate({ identifier: "DBProxyTarget" });
    case 2:
      return S.Array(__S(4225, __c132, 1));
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LastUpdatedAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastUpdatedBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Locale: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBRecommendationsMessage" });
    case 1:
      return S.Array(__S(4307, __c134, 19));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DBRecommendations: S.optional(__S(4257, __c133, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DBRecommendationsMessage" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "RecommendedActionParameter" });
    case 1:
      return S.Array(__S(4288, __c134, 0));
    case 2:
      return S.suspend(() => S.Struct({ Value: S.optional(S.Number) })).annotate({
        identifier: "ScalarReferenceDetails",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ ScalarReferenceDetails: S.optional(__S(4290, __c134, 2)) }),
      ).annotate({ identifier: "ReferenceDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ReferenceDetails: S.optional(__S(4291, __c134, 3)),
        }),
      ).annotate({ identifier: "MetricReference" });
    case 5:
      return S.Array(__S(4292, __c134, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Dimensions: S.optional(__S(480, __c15, 0)),
          Group: S.optional(S.String),
          Limit: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PerformanceInsightsMetricDimensionGroup" });
    case 7:
      return S.suspend(() =>
        S.Struct({ GroupBy: S.optional(__S(4294, __c134, 6)), Metric: S.optional(S.String) }),
      ).annotate({ identifier: "PerformanceInsightsMetricQuery" });
    case 8:
      return S.suspend(() =>
        S.Struct({ PerformanceInsightsMetricQuery: S.optional(__S(4295, __c134, 7)) }),
      ).annotate({ identifier: "MetricQuery" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          References: S.optional(__S(4293, __c134, 5)),
          StatisticsDetails: S.optional(S.String),
          MetricQuery: S.optional(__S(4296, __c134, 8)),
        }),
      ).annotate({ identifier: "Metric" });
    case 10:
      return S.Array(__S(4297, __c134, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Metrics: S.optional(__S(4298, __c134, 10)),
          Analysis: S.optional(S.String),
        }),
      ).annotate({ identifier: "PerformanceIssueDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({ PerformanceIssueDetails: S.optional(__S(4299, __c134, 11)) }),
      ).annotate({ identifier: "IssueDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "ContextAttribute" });
    case 14:
      return S.Array(__S(4301, __c134, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          ActionId: S.optional(S.String),
          Title: S.optional(S.String),
          Description: S.optional(S.String),
          Operation: S.optional(S.String),
          Parameters: S.optional(__S(4289, __c134, 1)),
          ApplyModes: S.optional(__S(480, __c15, 0)),
          Status: S.optional(S.String),
          IssueDetails: S.optional(__S(4300, __c134, 12)),
          ContextAttributes: S.optional(__S(4302, __c134, 14)),
        }),
      ).annotate({ identifier: "RecommendedAction" });
    case 16:
      return S.Array(__S(4303, __c134, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ Text: S.optional(S.String), Url: S.optional(S.String) }),
      ).annotate({ identifier: "DocLink" });
    case 18:
      return S.Array(__S(4305, __c134, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          RecommendationId: S.optional(S.String),
          TypeId: S.optional(S.String),
          Severity: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Detection: S.optional(S.String),
          Recommendation: S.optional(S.String),
          Description: S.optional(S.String),
          Reason: S.optional(S.String),
          RecommendedActions: S.optional(__S(4304, __c134, 16)),
          Category: S.optional(S.String),
          Source: S.optional(S.String),
          TypeDetection: S.optional(S.String),
          TypeRecommendation: S.optional(S.String),
          Impact: S.optional(S.String),
          AdditionalInfo: S.optional(S.String),
          Links: S.optional(__S(4306, __c134, 18)),
          IssueDetails: S.optional(__S(4300, __c134, 12)),
        }),
      ).annotate({ identifier: "DBRecommendation" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSecurityGroupName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBSecurityGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(356, __c11, 4)
          .pipe(/*@__PURE__*/ T.XmlName("DBSecurityGroup"))
          .annotate({ identifier: "DBSecurityGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBSecurityGroups: S.optional(__S(4321, __c135, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBSecurityGroupMessage" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBShardGroupIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBShardGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2144, __c67, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBShardGroup"))
          .annotate({ identifier: "DBShardGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          DBShardGroups: S.optional(__S(4353, __c136, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDBShardGroupsResponse" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBSnapshotIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDBSnapshotAttributesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSnapshotAttributesResult: S.optional(__S(4418, __c138, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeDBSnapshotAttributesResult" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AttributeName: S.optional(S.String),
          AttributeValues: S.optional(__S(3744, __c117, 0)),
        }),
      ).annotate({ identifier: "DBSnapshotAttribute" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(4416, __c138, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBSnapshotAttribute"))
          .annotate({ identifier: "DBSnapshotAttribute" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          DBSnapshotIdentifier: S.optional(S.String),
          DBSnapshotAttributes: S.optional(__S(4417, __c138, 1)),
        }),
      ).annotate({ identifier: "DBSnapshotAttributesResult" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          DBSnapshotIdentifier: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          IncludeShared: S.optional(S.Boolean),
          IncludePublic: S.optional(S.Boolean),
          DbiResourceId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBSnapshotsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(864, __c27, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DBSnapshot"))
          .annotate({ identifier: "DBSnapshot" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBSnapshots: S.optional(__S(4449, __c139, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBSnapshotMessage" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          DBSnapshotIdentifier: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          DbiResourceId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBSnapshotTenantDatabasesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBSnapshotIdentifier: S.optional(S.String),
          DBInstanceIdentifier: S.optional(S.String),
          DbiResourceId: S.optional(S.String),
          EngineName: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          TenantDatabaseCreateTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          TenantDBName: S.optional(S.String),
          MasterUsername: S.optional(S.String),
          TenantDatabaseResourceId: S.optional(S.String),
          CharacterSetName: S.optional(S.String),
          DBSnapshotTenantDatabaseARN: S.optional(S.String),
          NcharCharacterSetName: S.optional(S.String),
          TagList: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "DBSnapshotTenantDatabase" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(4481, __c140, 1)
          .pipe(/*@__PURE__*/ T.XmlName("DBSnapshotTenantDatabase"))
          .annotate({ identifier: "DBSnapshotTenantDatabase" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBSnapshotTenantDatabases: S.optional(__S(4482, __c140, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DBSnapshotTenantDatabasesMessage" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSubnetGroupName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDBSubnetGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1731, __c54, 3)
          .pipe(/*@__PURE__*/ T.XmlName("DBSubnetGroup"))
          .annotate({ identifier: "DBSubnetGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          DBSubnetGroups: S.optional(__S(4513, __c141, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DBSubnetGroupMessage" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupFamily: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEngineDefaultClusterParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EngineDefaults: S.optional(__S(4576, __c143, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeEngineDefaultClusterParametersResult" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupFamily: S.optional(S.String),
          Marker: S.optional(S.String),
          Parameters: S.optional(__S(3649, __c114, 1)),
        }),
      ).annotate({ identifier: "EngineDefaults" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupFamily: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEngineDefaultParametersMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EngineDefaults: S.optional(__S(4576, __c143, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeEngineDefaultParametersResult" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventCategoriesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.optional(S.String),
          EventCategories: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "EventCategoriesMap" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(4641, __c145, 1)
          .pipe(/*@__PURE__*/ T.XmlName("EventCategoriesMap"))
          .annotate({ identifier: "EventCategoriesMap" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ EventCategoriesMapList: S.optional(__S(4642, __c145, 2)) }).pipe(ns),
      ).annotate({ identifier: "EventCategoriesMessage" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceIdentifier: S.optional(S.String),
          SourceType: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Duration: S.optional(S.Number),
          EventCategories: S.optional(__S(128, __c4, 0)),
          Filters: S.optional(__S(3394, __c106, 2)),
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
          EventCategories: S.optional(__S(128, __c4, 0)),
          Date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SourceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Event" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(4673, __c146, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Event"))
          .annotate({ identifier: "Event" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), Events: S.optional(__S(4674, __c146, 2)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "EventsMessage" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventSubscriptionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(161, __c5, 1)
          .pipe(/*@__PURE__*/ T.XmlName("EventSubscription"))
          .annotate({ identifier: "EventSubscription" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          EventSubscriptionsList: S.optional(__S(4705, __c147, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "EventSubscriptionsMessage" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExportTaskIdentifier: S.optional(S.String),
          SourceArn: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          SourceType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeExportTasksMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(512, __c16, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ExportTask"))
          .annotate({ identifier: "ExportTask" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ExportTasks: S.optional(__S(4737, __c148, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ExportTasksMessage" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalClusterIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeGlobalClustersMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2340, __c73, 4)
          .pipe(/*@__PURE__*/ T.XmlName("GlobalClusterMember"))
          .annotate({ identifier: "GlobalCluster" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          GlobalClusters: S.optional(__S(4769, __c149, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GlobalClustersMessage" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IntegrationIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeIntegrationsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2403, __c75, 3)
          .pipe(/*@__PURE__*/ T.XmlName("Integration"))
          .annotate({ identifier: "Integration" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          Integrations: S.optional(__S(4801, __c150, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeIntegrationsResponse" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EngineName: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOptionGroupOptionsMessage" });
    case 1:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("OptionName")));
    case 2:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("OptionConflictName")));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AllowedValue: S.optional(S.String),
          MinimumEngineVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "MinimumEngineVersionPerAllowedValue" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(4835, __c151, 3)
          .pipe(/*@__PURE__*/ T.XmlName("MinimumEngineVersionPerAllowedValue"))
          .annotate({ identifier: "MinimumEngineVersionPerAllowedValue" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          SettingName: S.optional(S.String),
          SettingDescription: S.optional(S.String),
          DefaultValue: S.optional(S.String),
          ApplyType: S.optional(S.String),
          AllowedValues: S.optional(S.String),
          IsModifiable: S.optional(S.Boolean),
          IsRequired: S.optional(S.Boolean),
          MinimumEngineVersionPerAllowedValue: S.optional(__S(4836, __c151, 4)),
        }),
      ).annotate({ identifier: "OptionGroupOptionSetting" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(4837, __c151, 5)
          .pipe(/*@__PURE__*/ T.XmlName("OptionGroupOptionSetting"))
          .annotate({ identifier: "OptionGroupOptionSetting" }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({ Version: S.optional(S.String), IsDefault: S.optional(S.Boolean) }),
      ).annotate({ identifier: "OptionVersion" });
    case 8:
      return S.Array(
        /*@__PURE__*/ __S(4839, __c151, 7)
          .pipe(/*@__PURE__*/ T.XmlName("OptionVersion"))
          .annotate({ identifier: "OptionVersion" }),
      );
    case 9:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          EngineName: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
          MinimumRequiredMinorEngineVersion: S.optional(S.String),
          PortRequired: S.optional(S.Boolean),
          DefaultPort: S.optional(S.Number),
          OptionsDependedOn: S.optional(__S(4833, __c151, 1)),
          OptionsConflictsWith: S.optional(__S(4834, __c151, 2)),
          Persistent: S.optional(S.Boolean),
          Permanent: S.optional(S.Boolean),
          RequiresAutoMinorEngineVersionUpgrade: S.optional(S.Boolean),
          VpcOnly: S.optional(S.Boolean),
          SupportsOptionVersionDowngrade: S.optional(S.Boolean),
          OptionGroupOptionSettings: S.optional(__S(4838, __c151, 6)),
          OptionGroupOptionVersions: S.optional(__S(4840, __c151, 8)),
          CopyableCrossAccount: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "OptionGroupOption" });
    case 10:
      return S.Array(
        /*@__PURE__*/ __S(4841, __c151, 9)
          .pipe(/*@__PURE__*/ T.XmlName("OptionGroupOption"))
          .annotate({ identifier: "OptionGroupOption" }),
      );
    case 11:
      return S.suspend(() =>
        S.Struct({
          OptionGroupOptions: S.optional(__S(4842, __c151, 10)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "OptionGroupOptionsMessage" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OptionGroupName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          EngineName: S.optional(S.String),
          MajorEngineVersion: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOptionGroupsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(996, __c31, 4)
          .pipe(/*@__PURE__*/ T.XmlName("OptionGroup"))
          .annotate({ identifier: "OptionGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          OptionGroupsList: S.optional(__S(4865, __c152, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "OptionGroups" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          AvailabilityZoneGroup: S.optional(S.String),
          Vpc: S.optional(S.Boolean),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOrderableDBInstanceOptionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1696, __c53, 0)
          .pipe(/*@__PURE__*/ T.XmlName("AvailabilityZone"))
          .annotate({ identifier: "AvailabilityZone" }),
      );
    case 2:
      return S.Array(S.String);
    case 3:
      return S.suspend(() =>
        S.Struct({
          SupportsStorageAutoscaling: S.optional(S.Boolean),
          SupportsStorageThroughput: S.optional(S.Boolean),
          SupportsIops: S.optional(S.Boolean),
          StorageType: S.optional(S.String),
          MinStorageSize: S.optional(S.Number),
          MaxStorageSize: S.optional(S.Number),
          MinIops: S.optional(S.Number),
          MaxIops: S.optional(S.Number),
          MinIopsPerGib: S.optional(S.Number),
          MaxIopsPerGib: S.optional(S.Number),
          MinStorageThroughput: S.optional(S.Number),
          MaxStorageThroughput: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AvailableAdditionalStorageVolumesOption" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(4899, __c153, 3)
          .pipe(/*@__PURE__*/ T.XmlName("AvailableAdditionalStorageVolumesOption"))
          .annotate({ identifier: "AvailableAdditionalStorageVolumesOption" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          AvailabilityZoneGroup: S.optional(S.String),
          AvailabilityZones: S.optional(__S(4897, __c153, 1)),
          MultiAZCapable: S.optional(S.Boolean),
          ReadReplicaCapable: S.optional(S.Boolean),
          Vpc: S.optional(S.Boolean),
          SupportsStorageEncryption: S.optional(S.Boolean),
          StorageType: S.optional(S.String),
          SupportsIops: S.optional(S.Boolean),
          SupportsStorageThroughput: S.optional(S.Boolean),
          SupportsEnhancedMonitoring: S.optional(S.Boolean),
          SupportsIAMDatabaseAuthentication: S.optional(S.Boolean),
          SupportsPerformanceInsights: S.optional(S.Boolean),
          MinStorageSize: S.optional(S.Number),
          MaxStorageSize: S.optional(S.Number),
          MinIopsPerDbInstance: S.optional(S.Number),
          MaxIopsPerDbInstance: S.optional(S.Number),
          MinIopsPerGib: S.optional(S.Number),
          MaxIopsPerGib: S.optional(S.Number),
          MinStorageThroughputPerDbInstance: S.optional(S.Number),
          MaxStorageThroughputPerDbInstance: S.optional(S.Number),
          MinStorageThroughputPerIops: S.optional(S.Number),
          MaxStorageThroughputPerIops: S.optional(S.Number),
          AvailableProcessorFeatures: S.optional(__S(4929, __c154, 1)),
          SupportedEngineModes: S.optional(__S(1152, __c36, 0)),
          SupportsStorageAutoscaling: S.optional(S.Boolean),
          SupportsKerberosAuthentication: S.optional(S.Boolean),
          OutpostCapable: S.optional(S.Boolean),
          SupportedActivityStreamModes: S.optional(__S(4898, __c153, 2)),
          SupportsGlobalDatabases: S.optional(S.Boolean),
          SupportedNetworkTypes: S.optional(__S(480, __c15, 0)),
          SupportsClusters: S.optional(S.Boolean),
          SupportsDedicatedLogVolume: S.optional(S.Boolean),
          SupportsAdditionalStorageVolumes: S.optional(S.Boolean),
          SupportsHttpEndpoint: S.optional(S.Boolean),
          AvailableAdditionalStorageVolumesOptions: S.optional(__S(4900, __c153, 4)),
        }),
      ).annotate({ identifier: "OrderableDBInstanceOption" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(4901, __c153, 5)
          .pipe(/*@__PURE__*/ T.XmlName("OrderableDBInstanceOption"))
          .annotate({ identifier: "OrderableDBInstanceOption" }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({
          OrderableDBInstanceOptions: S.optional(__S(4902, __c153, 6)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "OrderableDBInstanceOptionsMessage" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          DefaultValue: S.optional(S.String),
          AllowedValues: S.optional(S.String),
        }),
      ).annotate({ identifier: "AvailableProcessorFeature" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(4928, __c154, 0)
          .pipe(/*@__PURE__*/ T.XmlName("AvailableProcessorFeature"))
          .annotate({ identifier: "AvailableProcessorFeature" }),
      );
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifier: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePendingMaintenanceActionsMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(290, __c9, 2)
          .pipe(/*@__PURE__*/ T.XmlName("ResourcePendingMaintenanceActions"))
          .annotate({ identifier: "ResourcePendingMaintenanceActions" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          PendingMaintenanceActions: S.optional(__S(4961, __c155, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PendingMaintenanceActionsMessage" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedDBInstanceId: S.optional(S.String),
          ReservedDBInstancesOfferingId: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          Duration: S.optional(S.String),
          ProductDescription: S.optional(S.String),
          OfferingType: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          LeaseId: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeReservedDBInstancesMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(5056, __c158, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ReservedDBInstance"))
          .annotate({ identifier: "ReservedDBInstance" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ReservedDBInstances: S.optional(__S(4993, __c156, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ReservedDBInstanceMessage" });
  }
}
function __c157(j: number): any {
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
        /*@__PURE__*/ __S(5024, __c157, 0)
          .pipe(/*@__PURE__*/ T.XmlName("RecurringCharge"))
          .annotate({ identifier: "RecurringCharge" }),
      );
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedDBInstanceId: S.optional(S.String),
          ReservedDBInstancesOfferingId: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Duration: S.optional(S.Number),
          FixedPrice: S.optional(S.Number),
          UsagePrice: S.optional(S.Number),
          CurrencyCode: S.optional(S.String),
          DBInstanceCount: S.optional(S.Number),
          ProductDescription: S.optional(S.String),
          OfferingType: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          State: S.optional(S.String),
          RecurringCharges: S.optional(__S(5025, __c157, 1)),
          ReservedDBInstanceArn: S.optional(S.String),
          LeaseId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReservedDBInstance" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedDBInstancesOfferingId: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          Duration: S.optional(S.String),
          ProductDescription: S.optional(S.String),
          OfferingType: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          Filters: S.optional(__S(3394, __c106, 2)),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeReservedDBInstancesOfferingsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReservedDBInstancesOfferingId: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          Duration: S.optional(S.Number),
          FixedPrice: S.optional(S.Number),
          UsagePrice: S.optional(S.Number),
          CurrencyCode: S.optional(S.String),
          ProductDescription: S.optional(S.String),
          OfferingType: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          RecurringCharges: S.optional(__S(5025, __c157, 1)),
        }),
      ).annotate({ identifier: "ReservedDBInstancesOffering" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(5089, __c159, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ReservedDBInstancesOffering"))
          .annotate({ identifier: "ReservedDBInstancesOffering" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ReservedDBInstancesOfferings: S.optional(__S(5090, __c159, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ReservedDBInstancesOfferingMessage" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerlessV2PlatformVersion: S.optional(S.String),
          Engine: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          DefaultOnly: S.optional(S.Boolean),
          IncludeAll: S.optional(S.Boolean),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeServerlessV2PlatformVersionsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServerlessV2PlatformVersion: S.optional(S.String),
          ServerlessV2PlatformVersionDescription: S.optional(S.String),
          Engine: S.optional(S.String),
          ServerlessV2FeaturesSupport: S.optional(__S(1184, __c37, 0)),
          Status: S.optional(S.String),
          IsDefault: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ServerlessV2PlatformVersionInfo" });
    case 2:
      return S.Array(__S(5121, __c160, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          ServerlessV2PlatformVersions: S.optional(__S(5122, __c160, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ServerlessV2PlatformVersionsMessage" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegionName: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Marker: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSourceRegionsMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegionName: S.optional(S.String),
          Endpoint: S.optional(S.String),
          Status: S.optional(S.String),
          SupportsDBInstanceAutomatedBackupsReplication: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SourceRegion" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(5153, __c161, 1)
          .pipe(/*@__PURE__*/ T.XmlName("SourceRegion"))
          .annotate({ identifier: "SourceRegion" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          SourceRegions: S.optional(__S(5154, __c161, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "SourceRegionMessage" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          TenantDBName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
          Marker: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTenantDatabasesMessage" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2497, __c78, 1)
          .pipe(/*@__PURE__*/ T.XmlName("TenantDatabase"))
          .annotate({ identifier: "TenantDatabase" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          TenantDatabases: S.optional(__S(5185, __c162, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "TenantDatabasesMessage" });
  }
}
function __c163(j: number): any {
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
        /*@__PURE__*/ __S(5217, __c163, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Range"))
          .annotate({ identifier: "Range" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ From: S.optional(S.Number), To: S.optional(S.Number) }),
      ).annotate({ identifier: "DoubleRange" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(5219, __c163, 3)
          .pipe(/*@__PURE__*/ T.XmlName("DoubleRange"))
          .annotate({ identifier: "DoubleRange" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          StorageType: S.optional(S.String),
          StorageSize: S.optional(__S(5218, __c163, 2)),
          ProvisionedIops: S.optional(__S(5218, __c163, 2)),
          IopsToStorageRatio: S.optional(__S(5220, __c163, 4)),
          ProvisionedStorageThroughput: S.optional(__S(5218, __c163, 2)),
          StorageThroughputToIopsRatio: S.optional(__S(5220, __c163, 4)),
          SupportsStorageAutoscaling: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ValidStorageOptions" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(5221, __c163, 5)
          .pipe(/*@__PURE__*/ T.XmlName("ValidStorageOptions"))
          .annotate({ identifier: "ValidStorageOptions" }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({ VolumeName: S.optional(S.String), Storage: S.optional(__S(5222, __c163, 6)) }),
      ).annotate({ identifier: "ValidVolumeOptions" });
    case 8:
      return S.Array(__S(5223, __c163, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          SupportsAdditionalStorageVolumes: S.optional(S.Boolean),
          Volumes: S.optional(__S(5224, __c163, 8)),
        }),
      ).annotate({ identifier: "ValidAdditionalStorageOptions" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Storage: S.optional(__S(5222, __c163, 6)),
          ValidProcessorFeatures: S.optional(__S(4929, __c154, 1)),
          SupportsDedicatedLogVolume: S.optional(S.Boolean),
          AdditionalStorage: S.optional(__S(5225, __c163, 9)),
        }),
      ).annotate({ identifier: "ValidDBInstanceModificationsMessage" });
    case 11:
      return S.suspend(() =>
        S.Struct({ ValidDBInstanceModificationsMessage: S.optional(__S(5226, __c163, 10)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeValidDBInstanceModificationsResult" });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableHttpEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          HttpEndpointEnabled: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "DisableHttpEndpointResponse" });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          LogFileName: S.optional(S.String),
          Marker: S.optional(S.String),
          NumberOfLines: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DownloadDBLogFilePortionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LogFileData: S.optional(SensitiveString),
          Marker: S.optional(S.String),
          AdditionalDataPending: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "DownloadDBLogFilePortionDetails" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableHttpEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          HttpEndpointEnabled: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "EnableHttpEndpointResponse" });
  }
}
function __c167(j: number): any {
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
        S.Struct({ DBCluster: S.optional(__S(1422, __c44, 14)) }).pipe(ns),
      ).annotate({ identifier: "FailoverDBClusterResult" });
  }
}
function __c168(j: number): any {
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
        S.Struct({ GlobalCluster: S.optional(__S(2340, __c73, 4)) }).pipe(ns),
      ).annotate({ identifier: "FailoverGlobalClusterResult" });
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceName: S.optional(S.String),
          Filters: S.optional(__S(3394, __c106, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TagList: S.optional(__S(225, __c7, 1)) }).pipe(ns),
      ).annotate({ identifier: "TagListMessage" });
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          AuditPolicyState: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyActivityStreamRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KmsKeyId: S.optional(S.String),
          KinesisStreamName: S.optional(S.String),
          Status: S.optional(S.String),
          Mode: S.optional(S.String),
          EngineNativeAuditFieldsIncluded: S.optional(S.Boolean),
          PolicyStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ModifyActivityStreamResponse" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateIdentifier: S.optional(S.String),
          RemoveCustomerOverride: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyCertificatesMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Certificate: S.optional(__S(3456, __c108, 0)) }).pipe(ns),
      ).annotate({ identifier: "ModifyCertificatesResult" });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          Capacity: S.optional(S.Number),
          SecondsBeforeTimeout: S.optional(S.Number),
          TimeoutAction: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyCurrentDBClusterCapacityMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          PendingCapacity: S.optional(S.Number),
          CurrentCapacity: S.optional(S.Number),
          SecondsBeforeTimeout: S.optional(S.Number),
          TimeoutAction: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DBClusterCapacityInfo" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyCustomDBEngineVersionMessage" });
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterIdentifier: S.optional(S.String),
          NewDBClusterIdentifier: S.optional(S.String),
          ApplyImmediately: S.optional(S.Boolean),
          BackupRetentionPeriod: S.optional(S.Number),
          DBClusterParameterGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(1344, __c42, 0)),
          Port: S.optional(S.Number),
          MasterUserPassword: S.optional(SensitiveString),
          OptionGroupName: S.optional(S.String),
          PreferredBackupWindow: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          BacktrackWindow: S.optional(S.Number),
          CloudwatchLogsExportConfiguration: S.optional(__S(5600, __c175, 0)),
          EngineVersion: S.optional(S.String),
          AllowMajorVersionUpgrade: S.optional(S.Boolean),
          DBInstanceParameterGroupName: S.optional(S.String),
          Domain: S.optional(S.String),
          DomainIAMRoleName: S.optional(S.String),
          ScalingConfiguration: S.optional(__S(1472, __c46, 0)),
          DeletionProtection: S.optional(S.Boolean),
          EnableHttpEndpoint: S.optional(S.Boolean),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          EnableGlobalWriteForwarding: S.optional(S.Boolean),
          DBClusterInstanceClass: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          StorageType: S.optional(S.String),
          Iops: S.optional(S.Number),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          ServerlessV2ScalingConfiguration: S.optional(__S(1440, __c45, 0)),
          MonitoringInterval: S.optional(S.Number),
          MonitoringRoleArn: S.optional(S.String),
          DatabaseInsightsMode: S.optional(S.String),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          PerformanceInsightsRetentionPeriod: S.optional(S.Number),
          ManageMasterUserPassword: S.optional(S.Boolean),
          RotateMasterUserPassword: S.optional(S.Boolean),
          EnableLocalWriteForwarding: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
          EngineMode: S.optional(S.String),
          AllowEngineModeChange: S.optional(S.Boolean),
          AwsBackupRecoveryPointArn: S.optional(S.String),
          EnableLimitlessDatabase: S.optional(S.Boolean),
          CACertificateIdentifier: S.optional(S.String),
          MasterUserAuthenticationType: S.optional(S.String),
          EngineLifecycleSupport: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1422, __c44, 14)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBClusterResult" });
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnableLogTypes: S.optional(__S(1120, __c35, 0)),
          DisableLogTypes: S.optional(__S(1120, __c35, 0)),
        }),
      ).annotate({ identifier: "CloudwatchLogsExportConfiguration" });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterEndpointIdentifier: S.optional(S.String),
          EndpointType: S.optional(S.String),
          StaticMembers: S.optional(__S(480, __c15, 0)),
          ExcludedMembers: S.optional(__S(480, __c15, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBClusterEndpointMessage" });
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          Parameters: S.optional(__S(3649, __c114, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBClusterParameterGroupMessage" });
  }
}
function __c178(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterParameterGroupName: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DBClusterParameterGroupNameMessage" });
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterSnapshotIdentifier: S.optional(S.String),
          AttributeName: S.optional(S.String),
          ValuesToAdd: S.optional(__S(3744, __c117, 0)),
          ValuesToRemove: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBClusterSnapshotAttributeMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBClusterSnapshotAttributesResult: S.optional(__S(3778, __c118, 2)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBClusterSnapshotAttributeResult" });
  }
}
function __c180(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeName: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          IOPS: S.optional(S.Number),
          MaxAllocatedStorage: S.optional(S.Number),
          StorageThroughput: S.optional(S.Number),
          StorageType: S.optional(S.String),
          SetForDelete: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ModifyAdditionalStorageVolume" });
    case 1:
      return S.Array(__S(5760, __c180, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          DBInstanceClass: S.optional(S.String),
          DBSubnetGroupName: S.optional(S.String),
          DBSecurityGroups: S.optional(__S(1824, __c57, 0)),
          VpcSecurityGroupIds: S.optional(__S(1344, __c42, 0)),
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
          StorageThroughput: S.optional(S.Number),
          OptionGroupName: S.optional(S.String),
          NewDBInstanceIdentifier: S.optional(S.String),
          StorageType: S.optional(S.String),
          TdeCredentialArn: S.optional(S.String),
          TdeCredentialPassword: S.optional(SensitiveString),
          CACertificateIdentifier: S.optional(S.String),
          Domain: S.optional(S.String),
          DomainFqdn: S.optional(S.String),
          DomainOu: S.optional(S.String),
          DomainAuthSecretArn: S.optional(S.String),
          DomainDnsIps: S.optional(__S(480, __c15, 0)),
          DisableDomain: S.optional(S.Boolean),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          MonitoringInterval: S.optional(S.Number),
          DBPortNumber: S.optional(S.Number),
          PubliclyAccessible: S.optional(S.Boolean),
          MonitoringRoleArn: S.optional(S.String),
          DomainIAMRoleName: S.optional(S.String),
          PromotionTier: S.optional(S.Number),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          DatabaseInsightsMode: S.optional(S.String),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          PerformanceInsightsRetentionPeriod: S.optional(S.Number),
          CloudwatchLogsExportConfiguration: S.optional(__S(5600, __c175, 0)),
          ProcessorFeatures: S.optional(__S(833, __c26, 1)),
          UseDefaultProcessorFeatures: S.optional(S.Boolean),
          DeletionProtection: S.optional(S.Boolean),
          MaxAllocatedStorage: S.optional(S.Number),
          CertificateRotationRestart: S.optional(S.Boolean),
          ReplicaMode: S.optional(S.String),
          AutomationMode: S.optional(S.String),
          ResumeFullAutomationModeMinutes: S.optional(S.Number),
          EnableCustomerOwnedIp: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          AwsBackupRecoveryPointArn: S.optional(S.String),
          ManageMasterUserPassword: S.optional(S.Boolean),
          RotateMasterUserPassword: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
          MultiTenant: S.optional(S.Boolean),
          DedicatedLogVolume: S.optional(S.Boolean),
          Engine: S.optional(S.String),
          AdditionalStorageVolumes: S.optional(__S(5761, __c180, 1)),
          TagSpecifications: S.optional(__S(1377, __c43, 1)),
          MasterUserAuthenticationType: S.optional(S.String),
          EngineLifecycleSupport: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBInstanceMessage" });
    case 3:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBInstanceResult" });
  }
}
function __c181(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          Parameters: S.optional(__S(3649, __c114, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBParameterGroupMessage" });
  }
}
function __c182(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBParameterGroupName: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DBParameterGroupNameMessage" });
  }
}
function __c183(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBProxyName: S.optional(S.String),
          NewDBProxyName: S.optional(S.String),
          DefaultAuthScheme: S.optional(S.String),
          Auth: S.optional(__S(1985, __c62, 1)),
          RequireTLS: S.optional(S.Boolean),
          IdleClientTimeout: S.optional(S.Number),
          DebugLogging: S.optional(S.Boolean),
          RoleArn: S.optional(S.String),
          SecurityGroups: S.optional(__S(480, __c15, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBProxyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBProxy: S.optional(__S(1954, __c61, 2)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBProxyResponse" });
  }
}
function __c184(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBProxyEndpointName: S.optional(S.String),
          NewDBProxyEndpointName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(480, __c15, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBProxyEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBProxyEndpoint: S.optional(__S(2048, __c64, 0)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBProxyEndpointResponse" });
  }
}
function __c185(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxConnectionsPercent: S.optional(S.Number),
          MaxIdleConnectionsPercent: S.optional(S.Number),
          ConnectionBorrowTimeout: S.optional(S.Number),
          SessionPinningFilters: S.optional(__S(480, __c15, 0)),
          InitQuery: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ConnectionPoolConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TargetGroupName: S.optional(S.String),
          DBProxyName: S.optional(S.String),
          ConnectionPoolConfig: S.optional(__S(5920, __c185, 0)),
          NewName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBProxyTargetGroupRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ DBProxyTargetGroup: S.optional(__S(4161, __c130, 1)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBProxyTargetGroupResponse" });
  }
}
function __c186(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ActionId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "RecommendedActionUpdate" });
    case 1:
      return S.Array(__S(5952, __c186, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RecommendationId: S.optional(S.String),
          Locale: S.optional(S.String),
          Status: S.optional(S.String),
          RecommendedActionUpdates: S.optional(__S(5953, __c186, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBRecommendationMessage" });
    case 3:
      return S.suspend(() =>
        S.Struct({ DBRecommendation: S.optional(__S(4307, __c134, 19)) }).pipe(ns),
      ).annotate({ identifier: "DBRecommendationMessage" });
  }
}
function __c187(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBShardGroupIdentifier: S.optional(S.String),
          MaxACU: S.optional(S.Number),
          MinACU: S.optional(S.Number),
          ComputeRedundancy: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBShardGroupMessage" });
  }
}
function __c188(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSnapshotIdentifier: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          OptionGroupName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSnapshot: S.optional(__S(864, __c27, 0)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBSnapshotResult" });
  }
}
function __c189(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSnapshotIdentifier: S.optional(S.String),
          AttributeName: S.optional(S.String),
          ValuesToAdd: S.optional(__S(3744, __c117, 0)),
          ValuesToRemove: S.optional(__S(3744, __c117, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBSnapshotAttributeMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSnapshotAttributesResult: S.optional(__S(4418, __c138, 2)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBSnapshotAttributeResult" });
  }
}
function __c190(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSubnetGroupName: S.optional(S.String),
          DBSubnetGroupDescription: S.optional(S.String),
          SubnetIds: S.optional(__S(2240, __c70, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDBSubnetGroupMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSubnetGroup: S.optional(__S(1731, __c54, 3)) }).pipe(ns),
      ).annotate({ identifier: "ModifyDBSubnetGroupResult" });
  }
}
function __c191(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionName: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SourceType: S.optional(S.String),
          EventCategories: S.optional(__S(128, __c4, 0)),
          Enabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyEventSubscriptionMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventSubscription: S.optional(__S(161, __c5, 1)) }).pipe(ns),
      ).annotate({ identifier: "ModifyEventSubscriptionResult" });
  }
}
function __c192(j: number): any {
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
        S.Struct({ GlobalCluster: S.optional(__S(2340, __c73, 4)) }).pipe(ns),
      ).annotate({ identifier: "ModifyGlobalClusterResult" });
  }
}
function __c193(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IntegrationIdentifier: S.optional(S.String),
          IntegrationName: S.optional(S.String),
          DataFilter: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyIntegrationMessage" });
  }
}
function __c194(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(992, __c31, 0)
          .pipe(/*@__PURE__*/ T.XmlName("OptionSetting"))
          .annotate({ identifier: "OptionSetting" }),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          OptionName: S.optional(S.String),
          Port: S.optional(S.Number),
          OptionVersion: S.optional(S.String),
          DBSecurityGroupMemberships: S.optional(__S(1824, __c57, 0)),
          VpcSecurityGroupMemberships: S.optional(__S(1344, __c42, 0)),
          OptionSettings: S.optional(__S(6208, __c194, 0)),
        }),
      ).annotate({ identifier: "OptionConfiguration" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(6209, __c194, 1)
          .pipe(/*@__PURE__*/ T.XmlName("OptionConfiguration"))
          .annotate({ identifier: "OptionConfiguration" }),
      );
    case 3:
      return S.Array(S.String);
    case 4:
      return S.suspend(() =>
        S.Struct({
          OptionGroupName: S.optional(S.String),
          OptionsToInclude: S.optional(__S(6210, __c194, 2)),
          OptionsToRemove: S.optional(__S(6211, __c194, 3)),
          ApplyImmediately: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyOptionGroupMessage" });
    case 5:
      return S.suspend(() =>
        S.Struct({ OptionGroup: S.optional(__S(996, __c31, 4)) }).pipe(ns),
      ).annotate({ identifier: "ModifyOptionGroupResult" });
  }
}
function __c195(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          TenantDBName: S.optional(S.String),
          MasterUserPassword: S.optional(SensitiveString),
          NewTenantDBName: S.optional(S.String),
          ManageMasterUserPassword: S.optional(S.Boolean),
          RotateMasterUserPassword: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyTenantDatabaseMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TenantDatabase: S.optional(__S(2497, __c78, 1)) }).pipe(ns),
      ).annotate({ identifier: "ModifyTenantDatabaseResult" });
  }
}
function __c196(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          TagSpecifications: S.optional(__S(1377, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PromoteReadReplicaMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "PromoteReadReplicaResult" });
  }
}
function __c197(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PromoteReadReplicaDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1422, __c44, 14)) }).pipe(ns),
      ).annotate({ identifier: "PromoteReadReplicaDBClusterResult" });
  }
}
function __c198(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedDBInstancesOfferingId: S.optional(S.String),
          ReservedDBInstanceId: S.optional(S.String),
          DBInstanceCount: S.optional(S.Number),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PurchaseReservedDBInstancesOfferingMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReservedDBInstance: S.optional(__S(5056, __c158, 0)) }).pipe(ns),
      ).annotate({ identifier: "PurchaseReservedDBInstancesOfferingResult" });
  }
}
function __c199(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RebootDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1422, __c44, 14)) }).pipe(ns),
      ).annotate({ identifier: "RebootDBClusterResult" });
  }
}
function __c200(j: number): any {
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
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "RebootDBInstanceResult" });
  }
}
function __c201(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBShardGroupIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RebootDBShardGroupMessage" });
  }
}
function __c202(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBProxyName: S.optional(S.String),
          TargetGroupName: S.optional(S.String),
          DBInstanceIdentifiers: S.optional(__S(480, __c15, 0)),
          DBClusterIdentifiers: S.optional(__S(480, __c15, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterDBProxyTargetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBProxyTargets: S.optional(__S(4226, __c132, 2)) }).pipe(ns),
      ).annotate({ identifier: "RegisterDBProxyTargetsResponse" });
  }
}
function __c203(j: number): any {
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
        S.Struct({ GlobalCluster: S.optional(__S(2340, __c73, 4)) }).pipe(ns),
      ).annotate({ identifier: "RemoveFromGlobalClusterResult" });
  }
}
function __c204(j: number): any {
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
function __c205(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          RoleArn: S.optional(S.String),
          FeatureName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveRoleFromDBInstanceMessage" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "RemoveRoleFromDBInstanceResponse",
      });
  }
}
function __c206(j: number): any {
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
        S.Struct({ EventSubscription: S.optional(__S(161, __c5, 1)) }).pipe(ns),
      ).annotate({ identifier: "RemoveSourceIdentifierFromSubscriptionResult" });
  }
}
function __c207(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceName: S.optional(S.String),
          TagKeys: S.optional(__S(6624, __c207, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveTagsFromResourceMessage" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "RemoveTagsFromResourceResponse",
      });
  }
}
function __c208(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBClusterParameterGroupName: S.optional(S.String),
          ResetAllParameters: S.optional(S.Boolean),
          Parameters: S.optional(__S(3649, __c114, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ResetDBClusterParameterGroupMessage" });
  }
}
function __c209(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBParameterGroupName: S.optional(S.String),
          ResetAllParameters: S.optional(S.Boolean),
          Parameters: S.optional(__S(3649, __c114, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ResetDBParameterGroupMessage" });
  }
}
function __c210(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(640, __c20, 0)),
          BackupRetentionPeriod: S.optional(S.Number),
          CharacterSetName: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          DBClusterIdentifier: S.optional(S.String),
          DBClusterParameterGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(1344, __c42, 0)),
          DBSubnetGroupName: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Port: S.optional(S.Number),
          MasterUsername: S.optional(S.String),
          MasterUserPassword: S.optional(SensitiveString),
          OptionGroupName: S.optional(S.String),
          PreferredBackupWindow: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          SourceEngine: S.optional(S.String),
          SourceEngineVersion: S.optional(S.String),
          S3BucketName: S.optional(S.String),
          S3Prefix: S.optional(S.String),
          S3IngestionRoleArn: S.optional(S.String),
          BacktrackWindow: S.optional(S.Number),
          EnableCloudwatchLogsExports: S.optional(__S(1120, __c35, 0)),
          DeletionProtection: S.optional(S.Boolean),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          Domain: S.optional(S.String),
          DomainIAMRoleName: S.optional(S.String),
          StorageType: S.optional(S.String),
          NetworkType: S.optional(S.String),
          ServerlessV2ScalingConfiguration: S.optional(__S(1440, __c45, 0)),
          ManageMasterUserPassword: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
          EngineLifecycleSupport: S.optional(S.String),
          TagSpecifications: S.optional(__S(1377, __c43, 1)),
          AssociatedRoles: S.optional(__S(1505, __c47, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreDBClusterFromS3Message" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1422, __c44, 14)) }).pipe(ns),
      ).annotate({ identifier: "RestoreDBClusterFromS3Result" });
  }
}
function __c211(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__S(640, __c20, 0)),
          DBClusterIdentifier: S.optional(S.String),
          SnapshotIdentifier: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Port: S.optional(S.Number),
          DBSubnetGroupName: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          OptionGroupName: S.optional(S.String),
          VpcSecurityGroupIds: S.optional(__S(1344, __c42, 0)),
          Tags: S.optional(__S(225, __c7, 1)),
          KmsKeyId: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          BacktrackWindow: S.optional(S.Number),
          EnableCloudwatchLogsExports: S.optional(__S(1120, __c35, 0)),
          EngineMode: S.optional(S.String),
          ScalingConfiguration: S.optional(__S(1472, __c46, 0)),
          DBClusterParameterGroupName: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          Domain: S.optional(S.String),
          DomainIAMRoleName: S.optional(S.String),
          DBClusterInstanceClass: S.optional(S.String),
          StorageType: S.optional(S.String),
          Iops: S.optional(S.Number),
          PubliclyAccessible: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          ServerlessV2ScalingConfiguration: S.optional(__S(1440, __c45, 0)),
          RdsCustomClusterConfiguration: S.optional(__S(1408, __c44, 0)),
          MonitoringInterval: S.optional(S.Number),
          MonitoringRoleArn: S.optional(S.String),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          PerformanceInsightsRetentionPeriod: S.optional(S.Number),
          BackupRetentionPeriod: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          EngineLifecycleSupport: S.optional(S.String),
          TagSpecifications: S.optional(__S(1377, __c43, 1)),
          EnableVPCNetworking: S.optional(S.Boolean),
          EnableInternetAccessGateway: S.optional(S.Boolean),
          AssociatedRoles: S.optional(__S(1505, __c47, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreDBClusterFromSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1422, __c44, 14)) }).pipe(ns),
      ).annotate({ identifier: "RestoreDBClusterFromSnapshotResult" });
  }
}
function __c212(j: number): any {
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
          VpcSecurityGroupIds: S.optional(__S(1344, __c42, 0)),
          Tags: S.optional(__S(225, __c7, 1)),
          KmsKeyId: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          BacktrackWindow: S.optional(S.Number),
          EnableCloudwatchLogsExports: S.optional(__S(1120, __c35, 0)),
          DBClusterParameterGroupName: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          Domain: S.optional(S.String),
          DomainIAMRoleName: S.optional(S.String),
          DBClusterInstanceClass: S.optional(S.String),
          StorageType: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          Iops: S.optional(S.Number),
          NetworkType: S.optional(S.String),
          SourceDbClusterResourceId: S.optional(S.String),
          ServerlessV2ScalingConfiguration: S.optional(__S(1440, __c45, 0)),
          ScalingConfiguration: S.optional(__S(1472, __c46, 0)),
          EngineMode: S.optional(S.String),
          RdsCustomClusterConfiguration: S.optional(__S(1408, __c44, 0)),
          MonitoringInterval: S.optional(S.Number),
          MonitoringRoleArn: S.optional(S.String),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          PerformanceInsightsRetentionPeriod: S.optional(S.Number),
          BackupRetentionPeriod: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          EngineLifecycleSupport: S.optional(S.String),
          TagSpecifications: S.optional(__S(1377, __c43, 1)),
          EnableVPCNetworking: S.optional(S.Boolean),
          EnableInternetAccessGateway: S.optional(S.Boolean),
          AssociatedRoles: S.optional(__S(1505, __c47, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreDBClusterToPointInTimeMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1422, __c44, 14)) }).pipe(ns),
      ).annotate({ identifier: "RestoreDBClusterToPointInTimeResult" });
  }
}
function __c213(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          DBSnapshotIdentifier: S.optional(S.String),
          DBInstanceClass: S.optional(S.String),
          Port: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          DBSubnetGroupName: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          PubliclyAccessible: S.optional(S.Boolean),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          LicenseModel: S.optional(S.String),
          DBName: S.optional(S.String),
          Engine: S.optional(S.String),
          Iops: S.optional(S.Number),
          StorageThroughput: S.optional(S.Number),
          OptionGroupName: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          StorageType: S.optional(S.String),
          TdeCredentialArn: S.optional(S.String),
          TdeCredentialPassword: S.optional(SensitiveString),
          VpcSecurityGroupIds: S.optional(__S(1344, __c42, 0)),
          Domain: S.optional(S.String),
          DomainFqdn: S.optional(S.String),
          DomainOu: S.optional(S.String),
          DomainAuthSecretArn: S.optional(S.String),
          DomainDnsIps: S.optional(__S(480, __c15, 0)),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          DomainIAMRoleName: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          EnableCloudwatchLogsExports: S.optional(__S(1120, __c35, 0)),
          ProcessorFeatures: S.optional(__S(833, __c26, 1)),
          UseDefaultProcessorFeatures: S.optional(S.Boolean),
          DBParameterGroupName: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          EnableCustomerOwnedIp: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          BackupTarget: S.optional(S.String),
          CustomIamInstanceProfile: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          DBClusterSnapshotIdentifier: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          DedicatedLogVolume: S.optional(S.Boolean),
          CACertificateIdentifier: S.optional(S.String),
          EngineLifecycleSupport: S.optional(S.String),
          AdditionalStorageVolumes: S.optional(__S(801, __c25, 1)),
          TagSpecifications: S.optional(__S(1377, __c43, 1)),
          ManageMasterUserPassword: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreDBInstanceFromDBSnapshotMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "RestoreDBInstanceFromDBSnapshotResult" });
  }
}
function __c214(j: number): any {
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
          DBSecurityGroups: S.optional(__S(1824, __c57, 0)),
          VpcSecurityGroupIds: S.optional(__S(1344, __c42, 0)),
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
          StorageThroughput: S.optional(S.Number),
          OptionGroupName: S.optional(S.String),
          PubliclyAccessible: S.optional(S.Boolean),
          Tags: S.optional(__S(225, __c7, 1)),
          StorageType: S.optional(S.String),
          StorageEncrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          MonitoringInterval: S.optional(S.Number),
          MonitoringRoleArn: S.optional(S.String),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          SourceEngine: S.optional(S.String),
          SourceEngineVersion: S.optional(S.String),
          S3BucketName: S.optional(S.String),
          S3Prefix: S.optional(S.String),
          S3IngestionRoleArn: S.optional(S.String),
          DatabaseInsightsMode: S.optional(S.String),
          EnablePerformanceInsights: S.optional(S.Boolean),
          PerformanceInsightsKMSKeyId: S.optional(S.String),
          PerformanceInsightsRetentionPeriod: S.optional(S.Number),
          EnableCloudwatchLogsExports: S.optional(__S(1120, __c35, 0)),
          ProcessorFeatures: S.optional(__S(833, __c26, 1)),
          UseDefaultProcessorFeatures: S.optional(S.Boolean),
          DeletionProtection: S.optional(S.Boolean),
          MaxAllocatedStorage: S.optional(S.Number),
          NetworkType: S.optional(S.String),
          ManageMasterUserPassword: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
          DedicatedLogVolume: S.optional(S.Boolean),
          CACertificateIdentifier: S.optional(S.String),
          EngineLifecycleSupport: S.optional(S.String),
          AdditionalStorageVolumes: S.optional(__S(801, __c25, 1)),
          TagSpecifications: S.optional(__S(1377, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreDBInstanceFromS3Message" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "RestoreDBInstanceFromS3Result" });
  }
}
function __c215(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDBInstanceIdentifier: S.optional(S.String),
          TargetDBInstanceIdentifier: S.optional(S.String),
          RestoreTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UseLatestRestorableTime: S.optional(S.Boolean),
          DBInstanceClass: S.optional(S.String),
          Port: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          DBSubnetGroupName: S.optional(S.String),
          MultiAZ: S.optional(S.Boolean),
          PubliclyAccessible: S.optional(S.Boolean),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          LicenseModel: S.optional(S.String),
          DBName: S.optional(S.String),
          Engine: S.optional(S.String),
          Iops: S.optional(S.Number),
          StorageThroughput: S.optional(S.Number),
          OptionGroupName: S.optional(S.String),
          CopyTagsToSnapshot: S.optional(S.Boolean),
          Tags: S.optional(__S(225, __c7, 1)),
          StorageType: S.optional(S.String),
          TdeCredentialArn: S.optional(S.String),
          TdeCredentialPassword: S.optional(SensitiveString),
          VpcSecurityGroupIds: S.optional(__S(1344, __c42, 0)),
          Domain: S.optional(S.String),
          DomainIAMRoleName: S.optional(S.String),
          DomainFqdn: S.optional(S.String),
          DomainOu: S.optional(S.String),
          DomainAuthSecretArn: S.optional(S.String),
          DomainDnsIps: S.optional(__S(480, __c15, 0)),
          EnableIAMDatabaseAuthentication: S.optional(S.Boolean),
          EnableCloudwatchLogsExports: S.optional(__S(1120, __c35, 0)),
          ProcessorFeatures: S.optional(__S(833, __c26, 1)),
          UseDefaultProcessorFeatures: S.optional(S.Boolean),
          DBParameterGroupName: S.optional(S.String),
          DeletionProtection: S.optional(S.Boolean),
          SourceDbiResourceId: S.optional(S.String),
          MaxAllocatedStorage: S.optional(S.Number),
          EnableCustomerOwnedIp: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          SourceDBInstanceAutomatedBackupsArn: S.optional(S.String),
          BackupTarget: S.optional(S.String),
          CustomIamInstanceProfile: S.optional(S.String),
          AllocatedStorage: S.optional(S.Number),
          BackupRetentionPeriod: S.optional(S.Number),
          PreferredBackupWindow: S.optional(S.String),
          DedicatedLogVolume: S.optional(S.Boolean),
          CACertificateIdentifier: S.optional(S.String),
          EngineLifecycleSupport: S.optional(S.String),
          AdditionalStorageVolumes: S.optional(__S(801, __c25, 1)),
          TagSpecifications: S.optional(__S(1377, __c43, 1)),
          ManageMasterUserPassword: S.optional(S.Boolean),
          MasterUserSecretKmsKeyId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreDBInstanceToPointInTimeMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "RestoreDBInstanceToPointInTimeResult" });
  }
}
function __c216(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBSecurityGroupName: S.optional(S.String),
          CIDRIP: S.optional(S.String),
          EC2SecurityGroupName: S.optional(S.String),
          EC2SecurityGroupId: S.optional(S.String),
          EC2SecurityGroupOwnerId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RevokeDBSecurityGroupIngressMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBSecurityGroup: S.optional(__S(356, __c11, 4)) }).pipe(ns),
      ).annotate({ identifier: "RevokeDBSecurityGroupIngressResult" });
  }
}
function __c217(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          Mode: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          ApplyImmediately: S.optional(S.Boolean),
          EngineNativeAuditFieldsIncluded: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartActivityStreamRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KmsKeyId: S.optional(S.String),
          KinesisStreamName: S.optional(S.String),
          Status: S.optional(S.String),
          Mode: S.optional(S.String),
          EngineNativeAuditFieldsIncluded: S.optional(S.Boolean),
          ApplyImmediately: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "StartActivityStreamResponse" });
  }
}
function __c218(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1422, __c44, 14)) }).pipe(ns),
      ).annotate({ identifier: "StartDBClusterResult" });
  }
}
function __c219(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBInstanceIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartDBInstanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "StartDBInstanceResult" });
  }
}
function __c220(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDBInstanceArn: S.optional(S.String),
          BackupRetentionPeriod: S.optional(S.Number),
          KmsKeyId: S.optional(S.String),
          PreSignedUrl: S.optional(SensitiveString),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDBInstanceAutomatedBackupsReplicationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstanceAutomatedBackup: S.optional(__S(2880, __c90, 0)) }).pipe(ns),
      ).annotate({ identifier: "StartDBInstanceAutomatedBackupsReplicationResult" });
  }
}
function __c221(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExportTaskIdentifier: S.optional(S.String),
          SourceArn: S.optional(S.String),
          S3BucketName: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          S3Prefix: S.optional(S.String),
          ExportOnly: S.optional(__S(480, __c15, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartExportTaskMessage" });
  }
}
function __c222(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ApplyImmediately: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StopActivityStreamRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KmsKeyId: S.optional(S.String),
          KinesisStreamName: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "StopActivityStreamResponse" });
  }
}
function __c223(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBClusterIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopDBClusterMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBCluster: S.optional(__S(1422, __c44, 14)) }).pipe(ns),
      ).annotate({ identifier: "StopDBClusterResult" });
  }
}
function __c224(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DBInstanceIdentifier: S.optional(S.String),
          DBSnapshotIdentifier: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StopDBInstanceMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "StopDBInstanceResult" });
  }
}
function __c225(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceDBInstanceArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopDBInstanceAutomatedBackupsReplicationMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstanceAutomatedBackup: S.optional(__S(2880, __c90, 0)) }).pipe(ns),
      ).annotate({ identifier: "StopDBInstanceAutomatedBackupsReplicationResult" });
  }
}
function __c226(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlueGreenDeploymentIdentifier: S.optional(S.String),
          SwitchoverTimeout: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SwitchoverBlueGreenDeploymentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BlueGreenDeployment: S.optional(__S(1060, __c33, 4)) }).pipe(ns),
      ).annotate({ identifier: "SwitchoverBlueGreenDeploymentResponse" });
  }
}
function __c227(j: number): any {
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
        S.Struct({ GlobalCluster: S.optional(__S(2340, __c73, 4)) }).pipe(ns),
      ).annotate({ identifier: "SwitchoverGlobalClusterResult" });
  }
}
function __c228(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DBInstanceIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SwitchoverReadReplicaMessage" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DBInstance: S.optional(__S(1805, __c56, 13)) }).pipe(ns),
      ).annotate({ identifier: "SwitchoverReadReplicaResult" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
