import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsQueryProtocol } from "../protocols/aws-query.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "RDS",
  target: "AmazonRDSv19",
  version: "2014-10-31",
  sigv4: "rds",
  protocol: awsQueryProtocol,
  xmlns: "http://rds.amazonaws.com/doc/2014-10-31/",
  rules: (p, _) => {
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
              return e(
                `https://rds-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://rds.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://rds.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AuthorizationAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthorizationAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "AuthorizationAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class AuthorizationNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthorizationNotFoundFault",
    ["BadRequestError"],
    { code: "AuthorizationNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class AuthorizationQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthorizationQuotaExceededFault",
    ["BadRequestError"],
    { code: "AuthorizationQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class BackupPolicyNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "BackupPolicyNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class BlueGreenDeploymentAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "BlueGreenDeploymentAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class BlueGreenDeploymentNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "BlueGreenDeploymentNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class CertificateNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CertificateNotFoundFault",
    ["BadRequestError"],
    { code: "CertificateNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class CreateCustomDBEngineVersionFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CreateCustomDBEngineVersionFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CustomAvailabilityZoneNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomAvailabilityZoneNotFoundFault",
    ["BadRequestError"],
    { code: "CustomAvailabilityZoneNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class CustomDBEngineVersionAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomDBEngineVersionAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CustomDBEngineVersionNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomDBEngineVersionNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class CustomDBEngineVersionQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomDBEngineVersionQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBClusterAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterAlreadyExistsFault",
    ["BadRequestError", "ConflictError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBClusterAutomatedBackupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterAutomatedBackupNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBClusterAutomatedBackupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterAutomatedBackupQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBClusterBacktrackNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterBacktrackNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBClusterEndpointAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterEndpointAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBClusterEndpointNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterEndpointNotFoundFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBClusterEndpointQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterEndpointQuotaExceededFault",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class DBClusterNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterNotFoundFault",
    ["BadRequestError", "NotFoundError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBClusterParameterGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterParameterGroupNotFoundFault",
    ["BadRequestError"],
    { code: "DBClusterParameterGroupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class DBClusterQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterQuotaExceededFault",
    ["AuthError", "QuotaError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class DBClusterRoleAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterRoleAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "DBClusterRoleAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class DBClusterRoleNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterRoleNotFoundFault",
    ["BadRequestError"],
    { code: "DBClusterRoleNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class DBClusterRoleQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterRoleQuotaExceededFault",
    ["BadRequestError"],
    { code: "DBClusterRoleQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class DBClusterSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterSnapshotAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBClusterSnapshotNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterSnapshotNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBInstanceAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBInstanceAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "DBInstanceAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class DBInstanceAutomatedBackupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBInstanceAutomatedBackupNotFoundFault",
    ["BadRequestError"],
    { code: "DBInstanceAutomatedBackupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class DBInstanceAutomatedBackupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBInstanceAutomatedBackupQuotaExceededFault",
    ["BadRequestError"],
    { code: "DBInstanceAutomatedBackupQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class DBInstanceNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBInstanceNotFoundFault",
    ["BadRequestError"],
    { code: "DBInstanceNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class DBInstanceNotReadyFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBInstanceNotReadyFault",
    ["BadRequestError"],
    { code: "DBInstanceNotReady", status: 400 },
  )<{ readonly message?: string }> {}
export class DBInstanceRoleAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBInstanceRoleAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "DBInstanceRoleAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class DBInstanceRoleNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBInstanceRoleNotFoundFault",
    ["BadRequestError"],
    { code: "DBInstanceRoleNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class DBInstanceRoleQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBInstanceRoleQuotaExceededFault",
    ["BadRequestError"],
    { code: "DBInstanceRoleQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class DBLogFileNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBLogFileNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBParameterGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "DBParameterGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class DBParameterGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBParameterGroupNotFoundFault",
    ["BadRequestError", "NotFoundError"],
    { code: "DBParameterGroupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class DBParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBParameterGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "DBParameterGroupQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class DBProxyAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBProxyAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBProxyEndpointAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBProxyEndpointAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBProxyEndpointNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBProxyEndpointNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBProxyEndpointQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBProxyEndpointQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBProxyNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBProxyNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBProxyQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBProxyQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBProxyTargetAlreadyRegisteredFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBProxyTargetAlreadyRegisteredFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBProxyTargetGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBProxyTargetGroupNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBProxyTargetNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBProxyTargetNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBSecurityGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSecurityGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "DBSecurityGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class DBSecurityGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSecurityGroupNotFoundFault",
    ["BadRequestError", "NotFoundError"],
    { code: "DBSecurityGroupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class DBSecurityGroupNotSupportedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSecurityGroupNotSupportedFault",
    ["BadRequestError"],
    { code: "DBSecurityGroupNotSupported", status: 400 },
  )<{ readonly message?: string }> {}
export class DBSecurityGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSecurityGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "QuotaExceeded.DBSecurityGroup", status: 400 },
  )<{ readonly message?: string }> {}
export class DBShardGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBShardGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "DBShardGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class DBShardGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBShardGroupNotFoundFault",
    ["BadRequestError"],
    { code: "DBShardGroupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class DBSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSnapshotAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "DBSnapshotAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class DBSnapshotNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSnapshotNotFoundFault",
    ["BadRequestError"],
    { code: "DBSnapshotNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class DBSnapshotTenantDatabaseNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSnapshotTenantDatabaseNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBSubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSubnetGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "DBSubnetGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class DBSubnetGroupDoesNotCoverEnoughAZs
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSubnetGroupDoesNotCoverEnoughAZs",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBSubnetGroupNotAllowedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSubnetGroupNotAllowedFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBSubnetGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSubnetGroupNotFoundFault",
    ["BadRequestError", "NotFoundError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBSubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSubnetGroupQuotaExceededFault",
    ["BadRequestError", "QuotaError"],
    { code: "DBSubnetGroupQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class DBSubnetQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSubnetQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DBUpgradeDependencyFailureFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBUpgradeDependencyFailureFault",
    ["BadRequestError"],
    { code: "DBUpgradeDependencyFailure", status: 400 },
  )<{ readonly message?: string }> {}
export class DomainNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DomainNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class Ec2ImagePropertiesNotSupportedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "Ec2ImagePropertiesNotSupportedFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class EventSubscriptionQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "EventSubscriptionQuotaExceededFault",
    ["BadRequestError"],
    { code: "EventSubscriptionQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ExportTaskAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ExportTaskAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ExportTaskAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ExportTaskNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ExportTaskNotFoundFault",
    ["BadRequestError"],
    { code: "ExportTaskNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class GlobalClusterAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "GlobalClusterAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class GlobalClusterNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "GlobalClusterNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class GlobalClusterQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "GlobalClusterQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IamRoleMissingPermissionsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IamRoleMissingPermissionsFault",
    ["BadRequestError"],
    { code: "IamRoleMissingPermissions", status: 400 },
  )<{ readonly message?: string }> {}
export class IamRoleNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IamRoleNotFoundFault",
    ["BadRequestError"],
    { code: "IamRoleNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class InstanceQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InstanceQuotaExceededFault",
    ["BadRequestError"],
    { code: "InstanceQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientAvailableIPsInSubnetFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientAvailableIPsInSubnetFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientDBClusterCapacityFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientDBClusterCapacityFault",
    ["AuthError", "QuotaError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class InsufficientDBInstanceCapacityFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientDBInstanceCapacityFault",
    ["BadRequestError"],
    { code: "InsufficientDBInstanceCapacity", status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientStorageClusterCapacityFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientStorageClusterCapacityFault",
    ["BadRequestError"],
    { code: "InsufficientStorageClusterCapacity", status: 400 },
  )<{ readonly message?: string }> {}
export class IntegrationAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IntegrationConflictOperationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationConflictOperationFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IntegrationNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class IntegrationQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidBlueGreenDeploymentStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidBlueGreenDeploymentStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidCustomDBEngineVersionStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCustomDBEngineVersionStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBClusterAutomatedBackupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBClusterAutomatedBackupStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBClusterCapacityFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBClusterCapacityFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBClusterEndpointStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBClusterEndpointStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBClusterSnapshotStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBClusterSnapshotStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBClusterStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBClusterStateFault",
    ["BadRequestError", "ConflictError", "RetryableError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBInstanceAutomatedBackupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBInstanceAutomatedBackupStateFault",
    ["BadRequestError"],
    { code: "InvalidDBInstanceAutomatedBackupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBInstanceStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBInstanceStateFault",
    ["BadRequestError"],
    { code: "InvalidDBInstanceState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBParameterGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBParameterGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidDBParameterGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBProxyEndpointStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBProxyEndpointStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBProxyStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBProxyStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBSecurityGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBSecurityGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidDBSecurityGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBShardGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBShardGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidDBShardGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBSnapshotStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBSnapshotStateFault",
    ["BadRequestError"],
    { code: "InvalidDBSnapshotState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBSubnetGroupFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBSubnetGroupFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBSubnetGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBSubnetGroupStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBSubnetStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBSubnetStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidEventSubscriptionStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidEventSubscriptionStateFault",
    ["BadRequestError"],
    { code: "InvalidEventSubscriptionState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidExportOnlyFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidExportOnlyFault",
    ["BadRequestError"],
    { code: "InvalidExportOnly", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidExportSourceStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidExportSourceStateFault",
    ["BadRequestError"],
    { code: "InvalidExportSourceState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidExportTaskStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidExportTaskStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidGlobalClusterStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidGlobalClusterStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidIntegrationStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidIntegrationStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidOptionGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidOptionGroupStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterCombination
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterCombination", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class InvalidParameterValue
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterValue", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class InvalidResourceStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidResourceStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRestoreFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRestoreFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidS3BucketFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidS3BucketFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSubnet
  extends /*@__PURE__*/ TE.TaggedError("InvalidSubnet", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidVPCNetworkStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidVPCNetworkStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class KMSKeyNotAccessibleFault
  extends /*@__PURE__*/ TE.TaggedError(
    "KMSKeyNotAccessibleFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MaxDBShardGroupLimitReached
  extends /*@__PURE__*/ TE.TaggedError(
    "MaxDBShardGroupLimitReached",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NetworkTypeNotSupported
  extends /*@__PURE__*/ TE.TaggedError(
    "NetworkTypeNotSupported",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class OptionGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "OptionGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class OptionGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "OptionGroupNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class OptionGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "OptionGroupQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class PointInTimeRestoreNotEnabledFault
  extends /*@__PURE__*/ TE.TaggedError(
    "PointInTimeRestoreNotEnabledFault",
    ["BadRequestError"],
    { code: "PointInTimeRestoreNotEnabled", status: 400 },
  )<{ readonly message?: string }> {}
export class ProvisionedIopsNotAvailableInAZFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ProvisionedIopsNotAvailableInAZFault",
    ["BadRequestError", "QuotaError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ReservedDBInstanceAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedDBInstanceAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ReservedDBInstanceAlreadyExists", status: 404 },
  )<{ readonly message?: string }> {}
export class ReservedDBInstanceNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedDBInstanceNotFoundFault",
    ["BadRequestError"],
    { code: "ReservedDBInstanceNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ReservedDBInstanceQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedDBInstanceQuotaExceededFault",
    ["BadRequestError"],
    { code: "ReservedDBInstanceQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ReservedDBInstancesOfferingNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedDBInstancesOfferingNotFoundFault",
    ["BadRequestError"],
    { code: "ReservedDBInstancesOfferingNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class SharedSnapshotQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SharedSnapshotQuotaExceededFault",
    ["BadRequestError"],
    { code: "SharedSnapshotQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotQuotaExceededFault",
    ["BadRequestError"],
    { code: "SnapshotQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class SNSInvalidTopicFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SNSInvalidTopicFault",
    ["BadRequestError"],
    { code: "SNSInvalidTopic", status: 400 },
  )<{ readonly message?: string }> {}
export class SNSNoAuthorizationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SNSNoAuthorizationFault",
    ["BadRequestError"],
    { code: "SNSNoAuthorization", status: 400 },
  )<{ readonly message?: string }> {}
export class SNSTopicArnNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SNSTopicArnNotFoundFault",
    ["BadRequestError"],
    { code: "SNSTopicArnNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class SourceClusterNotSupportedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SourceClusterNotSupportedFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SourceDatabaseNotSupportedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SourceDatabaseNotSupportedFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SourceNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SourceNotFoundFault",
    ["BadRequestError"],
    { code: "SourceNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class StorageQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "StorageQuotaExceededFault",
    ["BadRequestError"],
    { code: "StorageQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class StorageTypeNotAvailableFault
  extends /*@__PURE__*/ TE.TaggedError(
    "StorageTypeNotAvailableFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class StorageTypeNotSupportedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "StorageTypeNotSupportedFault",
    ["BadRequestError"],
    { code: "StorageTypeNotSupported", status: 400 },
  )<{ readonly message?: string }> {}
export class SubnetAlreadyInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetAlreadyInUse",
    ["BadRequestError", "DependencyViolationError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SubscriptionAlreadyExistFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionAlreadyExistFault",
    ["BadRequestError"],
    { code: "SubscriptionAlreadyExist", status: 400 },
  )<{ readonly message?: string }> {}
export class SubscriptionCategoryNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionCategoryNotFoundFault",
    ["BadRequestError"],
    { code: "SubscriptionCategoryNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class SubscriptionNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionNotFoundFault",
    ["BadRequestError"],
    { code: "SubscriptionNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class TenantDatabaseAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "TenantDatabaseAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "TenantDatabaseAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class TenantDatabaseNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "TenantDatabaseNotFoundFault",
    ["BadRequestError"],
    { code: "TenantDatabaseNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class TenantDatabaseQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "TenantDatabaseQuotaExceededFault",
    ["BadRequestError"],
    { code: "TenantDatabaseQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedDBEngineVersionFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedDBEngineVersionFault",
    ["BadRequestError"],
    { code: "UnsupportedDBEngineVersion", status: 400 },
  )<{ readonly message?: string }> {}
export class VpcEncryptionControlViolationException
  extends /*@__PURE__*/ TE.TaggedError(
    "VpcEncryptionControlViolationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type StorageEncryptionType =
  | "none"
  | "sse-kms"
  | "sse-rds"
  | (string & {});
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
    AdditionalStorageVolumes: (AdditionalStorageVolume & {
      VolumeName: string;
    })[];
  };
}
export interface CopyOptionGroupMessage {
  SourceOptionGroupIdentifier?: string;
  TargetOptionGroupIdentifier?: string;
  TargetOptionGroupDescription?: string;
  Tags?: Tag[];
}
export type PotentiallySensitiveOptionSettingValue =
  | string
  | redacted.Redacted<string>;
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
export type KmsKeyIdOrArn = string;
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
export type MasterUserAuthenticationType =
  | "password"
  | "iam-db-auth"
  | (string & {});
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
export type ActivityStreamStatus =
  | "stopped"
  | "starting"
  | "started"
  | "stopping"
  | (string & {});
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
export type DBInstanceAutomatedBackupsReplicationList =
  DBInstanceAutomatedBackupsReplication[];
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
export type AdditionalStorageVolumesOutputList =
  AdditionalStorageVolumeOutput[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
export type DBProxyEndpointTargetRole =
  | "READ_WRITE"
  | "READ_ONLY"
  | (string & {});
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
    AdditionalStorageVolumes: (AdditionalStorageVolume & {
      VolumeName: string;
    })[];
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
export type FailoverStatus =
  | "pending"
  | "failing-over"
  | "cancelling"
  | (string & {});
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
    AdditionalStorageVolumes: (AdditionalStorageVolume & {
      VolumeName: string;
    })[];
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
    AdditionalStorageVolumes: (AdditionalStorageVolume & {
      VolumeName: string;
    })[];
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
    AdditionalStorageVolumes: (AdditionalStorageVolume & {
      VolumeName: string;
    })[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
export type TargetState =
  | "REGISTERING"
  | "AVAILABLE"
  | "UNAVAILABLE"
  | "UNUSED"
  | (string & {});
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
    AdditionalStorageVolumes: (AdditionalStorageVolume & {
      VolumeName: string;
    })[];
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
  Integrations?: (Integration & {
    Errors: (IntegrationError & { ErrorCode: string })[];
  })[];
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
export type MinimumEngineVersionPerAllowedValueList =
  MinimumEngineVersionPerAllowedValue[];
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
export type AvailableAdditionalStorageVolumesOptionList =
  AvailableAdditionalStorageVolumesOption[];
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
export type ModifyAdditionalStorageVolumesList =
  ModifyAdditionalStorageVolume[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
    AdditionalStorageVolumes: (AdditionalStorageVolume & {
      VolumeName: string;
    })[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
    AdditionalStorageVolumes: (AdditionalStorageVolume & {
      VolumeName: string;
    })[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
    };
  };
}
export interface StopDBInstanceAutomatedBackupsReplicationMessage {
  SourceDBInstanceArn?: string;
}
export interface StopDBInstanceAutomatedBackupsReplicationResult {
  DBInstanceAutomatedBackup?: DBInstanceAutomatedBackup & {
    AdditionalStorageVolumes: (AdditionalStorageVolume & {
      VolumeName: string;
    })[];
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
      AdditionalStorageVolumes: (AdditionalStorageVolume & {
        VolumeName: string;
      })[];
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
  descriptor: {
    service: svc,
    input: { DBClusterIdentifier: 0, RoleArn: 0, FeatureName: 0 },
  },
  errors: [
    DBClusterNotFoundFault,
    DBClusterRoleAlreadyExistsFault,
    DBClusterRoleQuotaExceededFault,
    InvalidDBClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddRoleToDBCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBInstanceIdentifier: 0, RoleArn: 0, FeatureName: 0 },
  },
  errors: [
    DBInstanceNotFoundFault,
    DBInstanceRoleAlreadyExistsFault,
    DBInstanceRoleQuotaExceededFault,
    InvalidDBInstanceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddRoleToDBInstance",
})) as any;

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
  descriptor: {
    service: svc,
    input: { SubscriptionName: 0, SourceIdentifier: 0 },
    output: { EventSubscription: o_EventSubscription },
  },
  errors: [SourceNotFoundFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddSourceIdentifierToSubscription",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceName: 0, Tags: D.list(i_Tag, { item: "Tag" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceIdentifier: 0, ApplyAction: 0, OptInType: 0 },
    output: {
      ResourcePendingMaintenanceActions: o_ResourcePendingMaintenanceActions,
    },
  },
  errors: [
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyPendingMaintenanceAction",
})) as any;

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
 * EC2-Classic was retired on August 15, 2022. If you haven't migrated from EC2-Classic to a VPC, we recommend that you migrate as soon as possible. For more information, see Migrate from EC2-Classic to a VPC in the *Amazon EC2 User Guide*, the blog EC2-Classic Networking is Retiring – Here’s How to Prepare, and Moving a DB instance not in a VPC into a VPC in the *Amazon RDS User Guide*.
 */
export const authorizeDBSecurityGroupIngress: API.OperationMethod<
  AuthorizeDBSecurityGroupIngressMessage,
  AuthorizeDBSecurityGroupIngressResult,
  AuthorizeDBSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DBSecurityGroupName: 0,
      CIDRIP: 0,
      EC2SecurityGroupName: 0,
      EC2SecurityGroupId: 0,
      EC2SecurityGroupOwnerId: 0,
    },
    output: { DBSecurityGroup: o_DBSecurityGroup },
  },
  errors: [
    AuthorizationAlreadyExistsFault,
    AuthorizationQuotaExceededFault,
    DBSecurityGroupNotFoundFault,
    InvalidDBSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeDBSecurityGroupIngress",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      BacktrackTo: 0,
      Force: 0,
      UseEarliestTimeOnPointInTimeUnavailable: 0,
    },
    output: {
      BacktrackTo: D.ts,
      BacktrackedFrom: D.ts,
      BacktrackRequestCreationTime: D.ts,
    },
  },
  errors: [DBClusterNotFoundFault, InvalidDBClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BacktrackDBCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ExportTaskIdentifier: 0 },
    output: {
      ExportOnly: D.list(),
      SnapshotTime: D.ts,
      TaskStartTime: D.ts,
      TaskEndTime: D.ts,
      PercentProgress: D.num,
      TotalExtractedDataInGB: D.num,
    },
  },
  errors: [ExportTaskNotFoundFault, InvalidExportTaskStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelExportTask",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceDBClusterParameterGroupIdentifier: 0,
      TargetDBClusterParameterGroupIdentifier: 0,
      TargetDBClusterParameterGroupDescription: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { DBClusterParameterGroup: {} },
  },
  errors: [
    DBParameterGroupAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBParameterGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyDBClusterParameterGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceDBClusterSnapshotIdentifier: 0,
      TargetDBClusterSnapshotIdentifier: 0,
      KmsKeyId: 0,
      PreSignedUrl: 0,
      CopyTags: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { DBClusterSnapshot: o_DBClusterSnapshot },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceDBParameterGroupIdentifier: 0,
      TargetDBParameterGroupIdentifier: 0,
      TargetDBParameterGroupDescription: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { DBParameterGroup: {} },
  },
  errors: [
    DBParameterGroupAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBParameterGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyDBParameterGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceDBSnapshotIdentifier: 0,
      TargetDBSnapshotIdentifier: 0,
      KmsKeyId: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      CopyTags: 0,
      PreSignedUrl: 0,
      OptionGroupName: 0,
      TargetCustomAvailabilityZone: 0,
      SnapshotTarget: 0,
      CopyOptionGroup: 0,
      SnapshotAvailabilityZone: 0,
    },
    output: { DBSnapshot: o_DBSnapshot },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceOptionGroupIdentifier: 0,
      TargetOptionGroupIdentifier: 0,
      TargetOptionGroupDescription: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { OptionGroup: o_OptionGroup },
  },
  errors: [
    OptionGroupAlreadyExistsFault,
    OptionGroupNotFoundFault,
    OptionGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyOptionGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      BlueGreenDeploymentName: 0,
      Source: 0,
      TargetEngineVersion: 0,
      TargetDBParameterGroupName: 0,
      TargetDBClusterParameterGroupName: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      TargetDBInstanceClass: 0,
      UpgradeTargetStorageConfig: 0,
      TargetIops: 0,
      TargetStorageType: 0,
      TargetAllocatedStorage: 0,
      TargetStorageThroughput: 0,
    },
    output: { BlueGreenDeployment: o_BlueGreenDeployment },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Engine: 0,
      EngineVersion: 0,
      DatabaseInstallationFilesS3BucketName: 0,
      DatabaseInstallationFilesS3Prefix: 0,
      DatabaseInstallationFiles: 0,
      ImageId: 0,
      KMSKeyId: 0,
      SourceCustomDbEngineVersionIdentifier: 0,
      UseAwsProvidedLatestImage: 0,
      Description: 0,
      Manifest: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: {
      DatabaseInstallationFiles: D.list(),
      DefaultCharacterSet: {},
      Image: {},
      CreateTime: D.ts,
      SupportedCharacterSets: D.list({}, { item: "CharacterSet" }),
      SupportedNcharCharacterSets: D.list({}, { item: "CharacterSet" }),
      ValidUpgradeTarget: D.list(o_UpgradeTarget, { item: "UpgradeTarget" }),
      SupportedTimezones: D.list({}, { item: "Timezone" }),
      ExportableLogTypes: D.list(),
      SupportsLogExportsToCloudwatchLogs: D.bool,
      SupportsReadReplica: D.bool,
      SupportedEngineModes: D.list(),
      SupportedFeatureNames: D.list(),
      SupportsParallelQuery: D.bool,
      SupportsGlobalDatabases: D.bool,
      TagList: D.list({}, { item: "Tag" }),
      SupportsBabelfish: D.bool,
      SupportsLimitlessDatabase: D.bool,
      SupportsCertificateRotationWithoutRestart: D.bool,
      SupportedCACertificateIdentifiers: D.list(),
      SupportsLocalWriteForwarding: D.bool,
      SupportsIntegrations: D.bool,
      ServerlessV2FeaturesSupport: o_ServerlessV2FeaturesSupport,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
      BackupRetentionPeriod: 0,
      CharacterSetName: 0,
      DatabaseName: 0,
      DBClusterIdentifier: 0,
      DBClusterParameterGroupName: 0,
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      DBSubnetGroupName: 0,
      Engine: 0,
      EngineVersion: 0,
      Port: 0,
      MasterUsername: 0,
      MasterUserPassword: 0,
      OptionGroupName: 0,
      PreferredBackupWindow: 0,
      PreferredMaintenanceWindow: 0,
      ReplicationSourceIdentifier: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      StorageEncrypted: 0,
      KmsKeyId: 0,
      PreSignedUrl: 0,
      EnableIAMDatabaseAuthentication: 0,
      BacktrackWindow: 0,
      EnableCloudwatchLogsExports: 0,
      EngineMode: 0,
      ScalingConfiguration: i_ScalingConfiguration,
      RdsCustomClusterConfiguration: i_RdsCustomClusterConfiguration,
      DBClusterInstanceClass: 0,
      AllocatedStorage: 0,
      StorageType: 0,
      Iops: 0,
      PubliclyAccessible: 0,
      AutoMinorVersionUpgrade: 0,
      DeletionProtection: 0,
      GlobalClusterIdentifier: 0,
      EnableHttpEndpoint: 0,
      CopyTagsToSnapshot: 0,
      Domain: 0,
      DomainIAMRoleName: 0,
      EnableGlobalWriteForwarding: 0,
      NetworkType: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      MonitoringInterval: 0,
      MonitoringRoleArn: 0,
      DatabaseInsightsMode: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      PerformanceInsightsRetentionPeriod: 0,
      EnableLimitlessDatabase: 0,
      ClusterScalabilityType: 0,
      DBSystemId: 0,
      ManageMasterUserPassword: 0,
      EnableLocalWriteForwarding: 0,
      MasterUserSecretKmsKeyId: 0,
      CACertificateIdentifier: 0,
      EngineLifecycleSupport: 0,
      TagSpecifications: D.list(i_TagSpecification, { item: "item" }),
      MasterUserAuthenticationType: 0,
      WithExpressConfiguration: 0,
      AssociatedRoles: D.list(i_DBClusterAssociatedRole, {
        item: "DBClusterAssociatedRole",
      }),
    },
    output: { DBCluster: o_DBCluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      DBClusterEndpointIdentifier: 0,
      EndpointType: 0,
      StaticMembers: 0,
      ExcludedMembers: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { StaticMembers: D.list(), ExcludedMembers: D.list() },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterParameterGroupName: 0,
      DBParameterGroupFamily: 0,
      Description: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { DBClusterParameterGroup: {} },
  },
  errors: [
    DBParameterGroupAlreadyExistsFault,
    DBParameterGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBClusterParameterGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterSnapshotIdentifier: 0,
      DBClusterIdentifier: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { DBClusterSnapshot: o_DBClusterSnapshot },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBName: 0,
      DBInstanceIdentifier: 0,
      AllocatedStorage: 0,
      DBInstanceClass: 0,
      Engine: 0,
      MasterUsername: 0,
      MasterUserPassword: 0,
      DBSecurityGroups: D.list(0, { item: "DBSecurityGroupName" }),
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      AvailabilityZone: 0,
      DBSubnetGroupName: 0,
      PreferredMaintenanceWindow: 0,
      DBParameterGroupName: 0,
      BackupRetentionPeriod: 0,
      PreferredBackupWindow: 0,
      Port: 0,
      MultiAZ: 0,
      EngineVersion: 0,
      AutoMinorVersionUpgrade: 0,
      LicenseModel: 0,
      Iops: 0,
      StorageThroughput: 0,
      OptionGroupName: 0,
      CharacterSetName: 0,
      NcharCharacterSetName: 0,
      PubliclyAccessible: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      DBClusterIdentifier: 0,
      StorageType: 0,
      TdeCredentialArn: 0,
      TdeCredentialPassword: 0,
      StorageEncrypted: 0,
      KmsKeyId: 0,
      Domain: 0,
      DomainFqdn: 0,
      DomainOu: 0,
      DomainAuthSecretArn: 0,
      DomainDnsIps: 0,
      CopyTagsToSnapshot: 0,
      MonitoringInterval: 0,
      MonitoringRoleArn: 0,
      DomainIAMRoleName: 0,
      PromotionTier: 0,
      Timezone: 0,
      EnableIAMDatabaseAuthentication: 0,
      DatabaseInsightsMode: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      PerformanceInsightsRetentionPeriod: 0,
      EnableCloudwatchLogsExports: 0,
      ProcessorFeatures: D.list(i_ProcessorFeature, {
        item: "ProcessorFeature",
      }),
      DeletionProtection: 0,
      MaxAllocatedStorage: 0,
      EnableCustomerOwnedIp: 0,
      NetworkType: 0,
      BackupTarget: 0,
      CustomIamInstanceProfile: 0,
      DBSystemId: 0,
      CACertificateIdentifier: 0,
      ManageMasterUserPassword: 0,
      MasterUserSecretKmsKeyId: 0,
      MultiTenant: 0,
      DedicatedLogVolume: 0,
      EngineLifecycleSupport: 0,
      AdditionalStorageVolumes: D.list(i_AdditionalStorageVolume),
      TagSpecifications: D.list(i_TagSpecification, { item: "item" }),
      MasterUserAuthenticationType: 0,
    },
    output: { DBInstance: o_DBInstance },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      SourceDBInstanceIdentifier: 0,
      DBInstanceClass: 0,
      AvailabilityZone: 0,
      Port: 0,
      MultiAZ: 0,
      AutoMinorVersionUpgrade: 0,
      Iops: 0,
      StorageThroughput: 0,
      OptionGroupName: 0,
      DBParameterGroupName: 0,
      PubliclyAccessible: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      DBSubnetGroupName: 0,
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      StorageType: 0,
      CopyTagsToSnapshot: 0,
      MonitoringInterval: 0,
      MonitoringRoleArn: 0,
      KmsKeyId: 0,
      PreSignedUrl: 0,
      EnableIAMDatabaseAuthentication: 0,
      DatabaseInsightsMode: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      PerformanceInsightsRetentionPeriod: 0,
      EnableCloudwatchLogsExports: 0,
      ProcessorFeatures: D.list(i_ProcessorFeature, {
        item: "ProcessorFeature",
      }),
      UseDefaultProcessorFeatures: 0,
      DeletionProtection: 0,
      Domain: 0,
      DomainIAMRoleName: 0,
      DomainFqdn: 0,
      DomainOu: 0,
      DomainAuthSecretArn: 0,
      DomainDnsIps: 0,
      ReplicaMode: 0,
      EnableCustomerOwnedIp: 0,
      NetworkType: 0,
      MaxAllocatedStorage: 0,
      BackupTarget: 0,
      CustomIamInstanceProfile: 0,
      AllocatedStorage: 0,
      SourceDBClusterIdentifier: 0,
      DedicatedLogVolume: 0,
      UpgradeStorageConfig: 0,
      CACertificateIdentifier: 0,
      AdditionalStorageVolumes: D.list(i_AdditionalStorageVolume),
      TagSpecifications: D.list(i_TagSpecification, { item: "item" }),
    },
    output: { DBInstance: o_DBInstance },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBParameterGroupName: 0,
      DBParameterGroupFamily: 0,
      Description: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { DBParameterGroup: {} },
  },
  errors: [
    DBParameterGroupAlreadyExistsFault,
    DBParameterGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBParameterGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBProxyName: 0,
      EngineFamily: 0,
      DefaultAuthScheme: 0,
      Auth: D.list(i_UserAuthConfig),
      RoleArn: 0,
      VpcSubnetIds: 0,
      VpcSecurityGroupIds: 0,
      RequireTLS: 0,
      IdleClientTimeout: 0,
      DebugLogging: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      EndpointNetworkType: 0,
      TargetConnectionNetworkType: 0,
    },
    output: { DBProxy: o_DBProxy },
  },
  errors: [DBProxyAlreadyExistsFault, DBProxyQuotaExceededFault, InvalidSubnet],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBProxy",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBProxyName: 0,
      DBProxyEndpointName: 0,
      VpcSubnetIds: 0,
      VpcSecurityGroupIds: 0,
      TargetRole: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      EndpointNetworkType: 0,
    },
    output: { DBProxyEndpoint: o_DBProxyEndpoint },
  },
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
})) as any;

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
 * EC2-Classic was retired on August 15, 2022. If you haven't migrated from EC2-Classic to a VPC, we recommend that you migrate as soon as possible. For more information, see Migrate from EC2-Classic to a VPC in the *Amazon EC2 User Guide*, the blog EC2-Classic Networking is Retiring – Here’s How to Prepare, and Moving a DB instance not in a VPC into a VPC in the *Amazon RDS User Guide*.
 */
export const createDBSecurityGroup: API.OperationMethod<
  CreateDBSecurityGroupMessage,
  CreateDBSecurityGroupResult,
  CreateDBSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DBSecurityGroupName: 0,
      DBSecurityGroupDescription: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { DBSecurityGroup: o_DBSecurityGroup },
  },
  errors: [
    DBSecurityGroupAlreadyExistsFault,
    DBSecurityGroupNotSupportedFault,
    DBSecurityGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBSecurityGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBShardGroupIdentifier: 0,
      DBClusterIdentifier: 0,
      ComputeRedundancy: 0,
      MaxACU: 0,
      MinACU: 0,
      PubliclyAccessible: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: {
      MaxACU: D.num,
      MinACU: D.num,
      ComputeRedundancy: D.num,
      PubliclyAccessible: D.bool,
      TagList: D.list({}, { item: "Tag" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBSnapshotIdentifier: 0,
      DBInstanceIdentifier: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { DBSnapshot: o_DBSnapshot },
  },
  errors: [
    DBInstanceNotFoundFault,
    DBSnapshotAlreadyExistsFault,
    InvalidDBInstanceStateFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBSnapshot",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBSubnetGroupName: 0,
      DBSubnetGroupDescription: 0,
      SubnetIds: D.list(0, { item: "SubnetIdentifier" }),
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { DBSubnetGroup: o_DBSubnetGroup },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SubscriptionName: 0,
      SnsTopicArn: 0,
      SourceType: 0,
      EventCategories: D.list(0, { item: "EventCategory" }),
      SourceIds: D.list(0, { item: "SourceId" }),
      Enabled: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { EventSubscription: o_EventSubscription },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      GlobalClusterIdentifier: 0,
      SourceDBClusterIdentifier: 0,
      Engine: 0,
      EngineVersion: 0,
      EngineLifecycleSupport: 0,
      DeletionProtection: 0,
      DatabaseName: 0,
      StorageEncrypted: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { GlobalCluster: o_GlobalCluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceArn: 0,
      TargetArn: 0,
      IntegrationName: 0,
      KMSKeyId: 0,
      AdditionalEncryptionContext: D.map(),
      Tags: D.list(i_Tag, { item: "Tag" }),
      DataFilter: 0,
      Description: 0,
    },
    output: {
      AdditionalEncryptionContext: D.map(),
      Tags: D.list({}, { item: "Tag" }),
      CreateTime: D.ts,
      Errors: D.list({}, { item: "IntegrationError" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      OptionGroupName: 0,
      EngineName: 0,
      MajorEngineVersion: 0,
      OptionGroupDescription: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { OptionGroup: o_OptionGroup },
  },
  errors: [OptionGroupAlreadyExistsFault, OptionGroupQuotaExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOptionGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      TenantDBName: 0,
      MasterUsername: 0,
      MasterUserPassword: 0,
      CharacterSetName: 0,
      NcharCharacterSetName: 0,
      ManageMasterUserPassword: 0,
      MasterUserSecretKmsKeyId: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { TenantDatabase: o_TenantDatabase },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { BlueGreenDeploymentIdentifier: 0, DeleteTarget: 0 },
    output: { BlueGreenDeployment: o_BlueGreenDeployment },
  },
  errors: [
    BlueGreenDeploymentNotFoundFault,
    InvalidBlueGreenDeploymentStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBlueGreenDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Engine: 0, EngineVersion: 0 },
    output: {
      DatabaseInstallationFiles: D.list(),
      DefaultCharacterSet: {},
      Image: {},
      CreateTime: D.ts,
      SupportedCharacterSets: D.list({}, { item: "CharacterSet" }),
      SupportedNcharCharacterSets: D.list({}, { item: "CharacterSet" }),
      ValidUpgradeTarget: D.list(o_UpgradeTarget, { item: "UpgradeTarget" }),
      SupportedTimezones: D.list({}, { item: "Timezone" }),
      ExportableLogTypes: D.list(),
      SupportsLogExportsToCloudwatchLogs: D.bool,
      SupportsReadReplica: D.bool,
      SupportedEngineModes: D.list(),
      SupportedFeatureNames: D.list(),
      SupportsParallelQuery: D.bool,
      SupportsGlobalDatabases: D.bool,
      TagList: D.list({}, { item: "Tag" }),
      SupportsBabelfish: D.bool,
      SupportsLimitlessDatabase: D.bool,
      SupportsCertificateRotationWithoutRestart: D.bool,
      SupportedCACertificateIdentifiers: D.list(),
      SupportsLocalWriteForwarding: D.bool,
      SupportsIntegrations: D.bool,
      ServerlessV2FeaturesSupport: o_ServerlessV2FeaturesSupport,
    },
  },
  errors: [
    CustomDBEngineVersionNotFoundFault,
    InvalidCustomDBEngineVersionStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomDBEngineVersion",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      SkipFinalSnapshot: 0,
      FinalDBSnapshotIdentifier: 0,
      DeleteAutomatedBackups: 0,
    },
    output: { DBCluster: o_DBCluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { DbClusterResourceId: 0 },
    output: { DBClusterAutomatedBackup: o_DBClusterAutomatedBackup },
  },
  errors: [
    DBClusterAutomatedBackupNotFoundFault,
    InvalidDBClusterAutomatedBackupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBClusterAutomatedBackup",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBClusterEndpointIdentifier: 0 },
    output: { StaticMembers: D.list(), ExcludedMembers: D.list() },
  },
  errors: [
    DBClusterEndpointNotFoundFault,
    InvalidDBClusterEndpointStateFault,
    InvalidDBClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBClusterEndpoint",
})) as any;

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
  descriptor: { service: svc, input: { DBClusterParameterGroupName: 0 } },
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBClusterParameterGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBClusterSnapshotIdentifier: 0 },
    output: { DBClusterSnapshot: o_DBClusterSnapshot },
  },
  errors: [DBClusterSnapshotNotFoundFault, InvalidDBClusterSnapshotStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBClusterSnapshot",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      SkipFinalSnapshot: 0,
      FinalDBSnapshotIdentifier: 0,
      DeleteAutomatedBackups: 0,
    },
    output: { DBInstance: o_DBInstance },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { DbiResourceId: 0, DBInstanceAutomatedBackupsArn: 0 },
    output: { DBInstanceAutomatedBackup: o_DBInstanceAutomatedBackup },
  },
  errors: [
    DBInstanceAutomatedBackupNotFoundFault,
    InvalidDBInstanceAutomatedBackupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBInstanceAutomatedBackup",
})) as any;

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
  descriptor: { service: svc, input: { DBParameterGroupName: 0 } },
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBParameterGroup",
})) as any;

export type DeleteDBProxyError =
  | DBProxyNotFoundFault
  | InvalidDBProxyStateFault
  | CommonErrors;
/**
 * Deletes an existing DB proxy.
 */
export const deleteDBProxy: API.OperationMethod<
  DeleteDBProxyRequest,
  DeleteDBProxyResponse,
  DeleteDBProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DBProxyName: 0 },
    output: { DBProxy: o_DBProxy },
  },
  errors: [DBProxyNotFoundFault, InvalidDBProxyStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBProxy",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBProxyEndpointName: 0 },
    output: { DBProxyEndpoint: o_DBProxyEndpoint },
  },
  errors: [DBProxyEndpointNotFoundFault, InvalidDBProxyEndpointStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBProxyEndpoint",
})) as any;

export type DeleteDBSecurityGroupError =
  | DBSecurityGroupNotFoundFault
  | InvalidDBSecurityGroupStateFault
  | CommonErrors;
/**
 * Deletes a DB security group.
 *
 * The specified DB security group must not be associated with any DB instances.
 *
 * EC2-Classic was retired on August 15, 2022. If you haven't migrated from EC2-Classic to a VPC, we recommend that you migrate as soon as possible. For more information, see Migrate from EC2-Classic to a VPC in the *Amazon EC2 User Guide*, the blog EC2-Classic Networking is Retiring – Here’s How to Prepare, and Moving a DB instance not in a VPC into a VPC in the *Amazon RDS User Guide*.
 */
export const deleteDBSecurityGroup: API.OperationMethod<
  DeleteDBSecurityGroupMessage,
  DeleteDBSecurityGroupResponse,
  DeleteDBSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DBSecurityGroupName: 0 } },
  errors: [DBSecurityGroupNotFoundFault, InvalidDBSecurityGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBSecurityGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBShardGroupIdentifier: 0 },
    output: {
      MaxACU: D.num,
      MinACU: D.num,
      ComputeRedundancy: D.num,
      PubliclyAccessible: D.bool,
      TagList: D.list({}, { item: "Tag" }),
    },
  },
  errors: [
    DBShardGroupNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBShardGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBShardGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBSnapshotIdentifier: 0 },
    output: { DBSnapshot: o_DBSnapshot },
  },
  errors: [DBSnapshotNotFoundFault, InvalidDBSnapshotStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBSnapshot",
})) as any;

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
  descriptor: { service: svc, input: { DBSubnetGroupName: 0 } },
  errors: [
    DBSubnetGroupNotFoundFault,
    InvalidDBSubnetGroupStateFault,
    InvalidDBSubnetStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBSubnetGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: { SubscriptionName: 0 },
    output: { EventSubscription: o_EventSubscription },
  },
  errors: [InvalidEventSubscriptionStateFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSubscription",
})) as any;

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
  descriptor: {
    service: svc,
    input: { GlobalClusterIdentifier: 0 },
    output: { GlobalCluster: o_GlobalCluster },
  },
  errors: [GlobalClusterNotFoundFault, InvalidGlobalClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlobalCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { IntegrationIdentifier: 0 },
    output: {
      AdditionalEncryptionContext: D.map(),
      Tags: D.list({}, { item: "Tag" }),
      CreateTime: D.ts,
      Errors: D.list({}, { item: "IntegrationError" }),
    },
  },
  errors: [
    IntegrationConflictOperationFault,
    IntegrationNotFoundFault,
    InvalidIntegrationStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
})) as any;

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
  descriptor: { service: svc, input: { OptionGroupName: 0 } },
  errors: [InvalidOptionGroupStateFault, OptionGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOptionGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      TenantDBName: 0,
      SkipFinalSnapshot: 0,
      FinalDBSnapshotIdentifier: 0,
    },
    output: { TenantDatabase: o_TenantDatabase },
  },
  errors: [
    DBInstanceNotFoundFault,
    DBSnapshotAlreadyExistsFault,
    InvalidDBInstanceStateFault,
    TenantDatabaseNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTenantDatabase",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBProxyName: 0,
      TargetGroupName: 0,
      DBInstanceIdentifiers: 0,
      DBClusterIdentifiers: 0,
    },
  },
  errors: [
    DBProxyNotFoundFault,
    DBProxyTargetGroupNotFoundFault,
    DBProxyTargetNotFoundFault,
    InvalidDBProxyStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterDBProxyTargets",
})) as any;

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
  descriptor: {
    service: svc,
    input: {},
    output: {
      AccountQuotas: D.list(
        { Used: D.num, Max: D.num },
        { item: "AccountQuota" },
      ),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAttributes",
})) as any;

export type DescribeBlueGreenDeploymentsError =
  | BlueGreenDeploymentNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      BlueGreenDeploymentIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      Marker: 0,
      MaxRecords: 0,
    },
    output: { BlueGreenDeployments: D.list(o_BlueGreenDeployment) },
  },
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
  descriptor: {
    service: svc,
    input: {
      CertificateIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: { Certificates: D.list(o_Certificate, { item: "Certificate" }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      DbClusterResourceId: 0,
      DBClusterIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      DBClusterAutomatedBackups: D.list(o_DBClusterAutomatedBackup, {
        item: "DBClusterAutomatedBackup",
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      BacktrackIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      DBClusterBacktracks: D.list(
        {
          BacktrackTo: D.ts,
          BacktrackedFrom: D.ts,
          BacktrackRequestCreationTime: D.ts,
        },
        { item: "DBClusterBacktrack" },
      ),
    },
  },
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

export type DescribeDBClusterEndpointsError =
  | DBClusterNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      DBClusterEndpointIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      DBClusterEndpoints: D.list(
        { StaticMembers: D.list(), ExcludedMembers: D.list() },
        { item: "DBClusterEndpointList" },
      ),
    },
  },
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

export type DescribeDBClusterParameterGroupsError =
  | DBParameterGroupNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      DBClusterParameterGroupName: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      DBClusterParameterGroups: D.list({}, { item: "DBClusterParameterGroup" }),
    },
  },
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

export type DescribeDBClusterParametersError =
  | DBParameterGroupNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      DBClusterParameterGroupName: 0,
      Source: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: { Parameters: D.list(o_Parameter, { item: "Parameter" }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
      IncludeShared: 0,
    },
    output: { DBClusters: D.list(o_DBCluster, { item: "DBCluster" }) },
  },
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
  descriptor: {
    service: svc,
    input: { DBClusterSnapshotIdentifier: 0 },
    output: {
      DBClusterSnapshotAttributesResult: o_DBClusterSnapshotAttributesResult,
    },
  },
  errors: [DBClusterSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterSnapshotAttributes",
})) as any;

export type DescribeDBClusterSnapshotsError =
  | DBClusterSnapshotNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      DBClusterSnapshotIdentifier: 0,
      SnapshotType: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
      IncludeShared: 0,
      IncludePublic: 0,
      DbClusterResourceId: 0,
    },
    output: {
      DBClusterSnapshots: D.list(o_DBClusterSnapshot, {
        item: "DBClusterSnapshot",
      }),
    },
  },
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

export type DescribeDBEngineVersionsError =
  | InvalidParameterCombination
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      Engine: 0,
      EngineVersion: 0,
      DBParameterGroupFamily: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
      DefaultOnly: 0,
      ListSupportedCharacterSets: 0,
      ListSupportedTimezones: 0,
      IncludeAll: 0,
    },
    output: {
      DBEngineVersions: D.list(
        {
          DatabaseInstallationFiles: D.list(),
          DefaultCharacterSet: {},
          Image: {},
          CreateTime: D.ts,
          SupportedCharacterSets: D.list({}, { item: "CharacterSet" }),
          SupportedNcharCharacterSets: D.list({}, { item: "CharacterSet" }),
          ValidUpgradeTarget: D.list(o_UpgradeTarget, {
            item: "UpgradeTarget",
          }),
          SupportedTimezones: D.list({}, { item: "Timezone" }),
          ExportableLogTypes: D.list(),
          SupportsLogExportsToCloudwatchLogs: D.bool,
          SupportsReadReplica: D.bool,
          SupportedEngineModes: D.list(),
          SupportedFeatureNames: D.list(),
          SupportsParallelQuery: D.bool,
          SupportsGlobalDatabases: D.bool,
          TagList: D.list({}, { item: "Tag" }),
          SupportsBabelfish: D.bool,
          SupportsLimitlessDatabase: D.bool,
          SupportsCertificateRotationWithoutRestart: D.bool,
          SupportedCACertificateIdentifiers: D.list(),
          SupportsLocalWriteForwarding: D.bool,
          SupportsIntegrations: D.bool,
          ServerlessV2FeaturesSupport: o_ServerlessV2FeaturesSupport,
        },
        { item: "DBEngineVersion" },
      ),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      DbiResourceId: 0,
      DBInstanceIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
      DBInstanceAutomatedBackupsArn: 0,
    },
    output: {
      DBInstanceAutomatedBackups: D.list(o_DBInstanceAutomatedBackup, {
        item: "DBInstanceAutomatedBackup",
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: { DBInstances: D.list(o_DBInstance, { item: "DBInstance" }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      FilenameContains: 0,
      FileLastWritten: 0,
      FileSize: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      DescribeDBLogFiles: D.list(
        { LastWritten: D.num, Size: D.num },
        { item: "DescribeDBLogFilesDetails" },
      ),
    },
  },
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
  descriptor: {
    service: svc,
    input: { Engine: 0, MajorEngineVersion: 0, Marker: 0, MaxRecords: 0 },
    output: {
      DBMajorEngineVersions: D.list(
        {
          SupportedEngineLifecycles: D.list(
            { LifecycleSupportStartDate: D.ts, LifecycleSupportEndDate: D.ts },
            { item: "SupportedEngineLifecycle" },
          ),
        },
        { item: "DBMajorEngineVersion" },
      ),
    },
  },
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

export type DescribeDBParameterGroupsError =
  | DBParameterGroupNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      DBParameterGroupName: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: { DBParameterGroups: D.list({}, { item: "DBParameterGroup" }) },
  },
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

export type DescribeDBParametersError =
  | DBParameterGroupNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      DBParameterGroupName: 0,
      Source: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: { Parameters: D.list(o_Parameter, { item: "Parameter" }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      DBProxyName: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      Marker: 0,
      MaxRecords: 0,
    },
    output: { DBProxies: D.list(o_DBProxy) },
  },
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
  descriptor: {
    service: svc,
    input: {
      DBProxyName: 0,
      DBProxyEndpointName: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      Marker: 0,
      MaxRecords: 0,
    },
    output: { DBProxyEndpoints: D.list(o_DBProxyEndpoint) },
  },
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
  descriptor: {
    service: svc,
    input: {
      DBProxyName: 0,
      TargetGroupName: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      Marker: 0,
      MaxRecords: 0,
    },
    output: { TargetGroups: D.list(o_DBProxyTargetGroup) },
  },
  errors: [
    DBProxyNotFoundFault,
    DBProxyTargetGroupNotFoundFault,
    InvalidDBProxyStateFault,
  ],
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
  descriptor: {
    service: svc,
    input: {
      DBProxyName: 0,
      TargetGroupName: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      Marker: 0,
      MaxRecords: 0,
    },
    output: { Targets: D.list(o_DBProxyTarget) },
  },
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
  descriptor: {
    service: svc,
    input: {
      LastUpdatedAfter: 0,
      LastUpdatedBefore: 0,
      Locale: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: { DBRecommendations: D.list(o_DBRecommendation) },
  },
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

export type DescribeDBSecurityGroupsError =
  | DBSecurityGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a list of `DBSecurityGroup` descriptions. If a `DBSecurityGroupName` is specified, the list will contain only the descriptions of the specified DB security group.
 *
 * EC2-Classic was retired on August 15, 2022. If you haven't migrated from EC2-Classic to a VPC, we recommend that you migrate as soon as possible. For more information, see Migrate from EC2-Classic to a VPC in the *Amazon EC2 User Guide*, the blog EC2-Classic Networking is Retiring – Here’s How to Prepare, and Moving a DB instance not in a VPC into a VPC in the *Amazon RDS User Guide*.
 */
export const describeDBSecurityGroups: API.PaginatedOperationMethod<
  DescribeDBSecurityGroupsMessage,
  DBSecurityGroupMessage,
  DescribeDBSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  DBSecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      DBSecurityGroupName: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      DBSecurityGroups: D.list(o_DBSecurityGroup, { item: "DBSecurityGroup" }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      DBShardGroupIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      Marker: 0,
      MaxRecords: 0,
    },
    output: {
      DBShardGroups: D.list(
        {
          MaxACU: D.num,
          MinACU: D.num,
          ComputeRedundancy: D.num,
          PubliclyAccessible: D.bool,
          TagList: D.list({}, { item: "Tag" }),
        },
        { item: "DBShardGroup" },
      ),
    },
  },
  errors: [DBClusterNotFoundFault, DBShardGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBShardGroups",
})) as any;

export type DescribeDBSnapshotAttributesError =
  | DBSnapshotNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { DBSnapshotIdentifier: 0 },
    output: { DBSnapshotAttributesResult: o_DBSnapshotAttributesResult },
  },
  errors: [DBSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBSnapshotAttributes",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      DBSnapshotIdentifier: 0,
      SnapshotType: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
      IncludeShared: 0,
      IncludePublic: 0,
      DbiResourceId: 0,
    },
    output: { DBSnapshots: D.list(o_DBSnapshot, { item: "DBSnapshot" }) },
  },
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

export type DescribeDBSnapshotTenantDatabasesError =
  | DBSnapshotNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      DBSnapshotIdentifier: 0,
      SnapshotType: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
      DbiResourceId: 0,
    },
    output: {
      DBSnapshotTenantDatabases: D.list(
        {
          TenantDatabaseCreateTime: D.ts,
          TagList: D.list({}, { item: "Tag" }),
        },
        { item: "DBSnapshotTenantDatabase" },
      ),
    },
  },
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

export type DescribeDBSubnetGroupsError =
  | DBSubnetGroupNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      DBSubnetGroupName: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      DBSubnetGroups: D.list(o_DBSubnetGroup, { item: "DBSubnetGroup" }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      DBParameterGroupFamily: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: { EngineDefaults: o_EngineDefaults },
  },
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
  descriptor: {
    service: svc,
    input: {
      DBParameterGroupFamily: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: { EngineDefaults: o_EngineDefaults },
  },
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
  descriptor: {
    service: svc,
    input: { SourceType: 0, Filters: D.list(i_Filter, { item: "Filter" }) },
    output: {
      EventCategoriesMapList: D.list(
        { EventCategories: D.list(0, { item: "EventCategory" }) },
        { item: "EventCategoriesMap" },
      ),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventCategories",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceIdentifier: 0,
      SourceType: 0,
      StartTime: 0,
      EndTime: 0,
      Duration: 0,
      EventCategories: D.list(0, { item: "EventCategory" }),
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      Events: D.list(
        { EventCategories: D.list(0, { item: "EventCategory" }), Date: D.ts },
        { item: "Event" },
      ),
    },
  },
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
  | SubscriptionNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      SubscriptionName: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      EventSubscriptionsList: D.list(o_EventSubscription, {
        item: "EventSubscription",
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      ExportTaskIdentifier: 0,
      SourceArn: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      Marker: 0,
      MaxRecords: 0,
      SourceType: 0,
    },
    output: {
      ExportTasks: D.list(
        {
          ExportOnly: D.list(),
          SnapshotTime: D.ts,
          TaskStartTime: D.ts,
          TaskEndTime: D.ts,
          PercentProgress: D.num,
          TotalExtractedDataInGB: D.num,
        },
        { item: "ExportTask" },
      ),
    },
  },
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

export type DescribeGlobalClustersError =
  | GlobalClusterNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      GlobalClusterIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      GlobalClusters: D.list(o_GlobalCluster, { item: "GlobalClusterMember" }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      IntegrationIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      Integrations: D.list(
        {
          AdditionalEncryptionContext: D.map(),
          Tags: D.list({}, { item: "Tag" }),
          CreateTime: D.ts,
          Errors: D.list({}, { item: "IntegrationError" }),
        },
        { item: "Integration" },
      ),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      EngineName: 0,
      MajorEngineVersion: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      OptionGroupOptions: D.list(
        {
          PortRequired: D.bool,
          DefaultPort: D.num,
          OptionsDependedOn: D.list(0, { item: "OptionName" }),
          OptionsConflictsWith: D.list(0, { item: "OptionConflictName" }),
          Persistent: D.bool,
          Permanent: D.bool,
          RequiresAutoMinorEngineVersionUpgrade: D.bool,
          VpcOnly: D.bool,
          SupportsOptionVersionDowngrade: D.bool,
          OptionGroupOptionSettings: D.list(
            {
              IsModifiable: D.bool,
              IsRequired: D.bool,
              MinimumEngineVersionPerAllowedValue: D.list(
                {},
                { item: "MinimumEngineVersionPerAllowedValue" },
              ),
            },
            { item: "OptionGroupOptionSetting" },
          ),
          OptionGroupOptionVersions: D.list(
            { IsDefault: D.bool },
            { item: "OptionVersion" },
          ),
          CopyableCrossAccount: D.bool,
        },
        { item: "OptionGroupOption" },
      ),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      OptionGroupName: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      Marker: 0,
      MaxRecords: 0,
      EngineName: 0,
      MajorEngineVersion: 0,
    },
    output: {
      OptionGroupsList: D.list(o_OptionGroup, { item: "OptionGroup" }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      Engine: 0,
      EngineVersion: 0,
      DBInstanceClass: 0,
      LicenseModel: 0,
      AvailabilityZoneGroup: 0,
      Vpc: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      OrderableDBInstanceOptions: D.list(
        {
          AvailabilityZones: D.list({}, { item: "AvailabilityZone" }),
          MultiAZCapable: D.bool,
          ReadReplicaCapable: D.bool,
          Vpc: D.bool,
          SupportsStorageEncryption: D.bool,
          SupportsIops: D.bool,
          SupportsStorageThroughput: D.bool,
          SupportsEnhancedMonitoring: D.bool,
          SupportsIAMDatabaseAuthentication: D.bool,
          SupportsPerformanceInsights: D.bool,
          MinStorageSize: D.num,
          MaxStorageSize: D.num,
          MinIopsPerDbInstance: D.num,
          MaxIopsPerDbInstance: D.num,
          MinIopsPerGib: D.num,
          MaxIopsPerGib: D.num,
          MinStorageThroughputPerDbInstance: D.num,
          MaxStorageThroughputPerDbInstance: D.num,
          MinStorageThroughputPerIops: D.num,
          MaxStorageThroughputPerIops: D.num,
          AvailableProcessorFeatures: D.list(
            {},
            { item: "AvailableProcessorFeature" },
          ),
          SupportedEngineModes: D.list(),
          SupportsStorageAutoscaling: D.bool,
          SupportsKerberosAuthentication: D.bool,
          OutpostCapable: D.bool,
          SupportedActivityStreamModes: D.list(),
          SupportsGlobalDatabases: D.bool,
          SupportedNetworkTypes: D.list(),
          SupportsClusters: D.bool,
          SupportsDedicatedLogVolume: D.bool,
          SupportsAdditionalStorageVolumes: D.bool,
          SupportsHttpEndpoint: D.bool,
          AvailableAdditionalStorageVolumesOptions: D.list(
            {
              SupportsStorageAutoscaling: D.bool,
              SupportsStorageThroughput: D.bool,
              SupportsIops: D.bool,
              MinStorageSize: D.num,
              MaxStorageSize: D.num,
              MinIops: D.num,
              MaxIops: D.num,
              MinIopsPerGib: D.num,
              MaxIopsPerGib: D.num,
              MinStorageThroughput: D.num,
              MaxStorageThroughput: D.num,
            },
            { item: "AvailableAdditionalStorageVolumesOption" },
          ),
        },
        { item: "OrderableDBInstanceOption" },
      ),
    },
  },
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

export type DescribePendingMaintenanceActionsError =
  | ResourceNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      ResourceIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      Marker: 0,
      MaxRecords: 0,
    },
    output: {
      PendingMaintenanceActions: D.list(o_ResourcePendingMaintenanceActions, {
        item: "ResourcePendingMaintenanceActions",
      }),
    },
  },
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

export type DescribeReservedDBInstancesError =
  | ReservedDBInstanceNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      ReservedDBInstanceId: 0,
      ReservedDBInstancesOfferingId: 0,
      DBInstanceClass: 0,
      Duration: 0,
      ProductDescription: 0,
      OfferingType: 0,
      MultiAZ: 0,
      LeaseId: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      ReservedDBInstances: D.list(o_ReservedDBInstance, {
        item: "ReservedDBInstance",
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      ReservedDBInstancesOfferingId: 0,
      DBInstanceClass: 0,
      Duration: 0,
      ProductDescription: 0,
      OfferingType: 0,
      MultiAZ: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      ReservedDBInstancesOfferings: D.list(
        {
          Duration: D.num,
          FixedPrice: D.num,
          UsagePrice: D.num,
          MultiAZ: D.bool,
          RecurringCharges: D.list(o_RecurringCharge, {
            item: "RecurringCharge",
          }),
        },
        { item: "ReservedDBInstancesOffering" },
      ),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      ServerlessV2PlatformVersion: 0,
      Engine: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      DefaultOnly: 0,
      IncludeAll: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      ServerlessV2PlatformVersions: D.list({
        ServerlessV2FeaturesSupport: o_ServerlessV2FeaturesSupport,
        IsDefault: D.bool,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      RegionName: 0,
      MaxRecords: 0,
      Marker: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
    },
    output: {
      SourceRegions: D.list(
        { SupportsDBInstanceAutomatedBackupsReplication: D.bool },
        { item: "SourceRegion" },
      ),
    },
  },
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

export type DescribeTenantDatabasesError =
  | DBInstanceNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      TenantDBName: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      Marker: 0,
      MaxRecords: 0,
    },
    output: {
      TenantDatabases: D.list(o_TenantDatabase, { item: "TenantDatabase" }),
    },
  },
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
  descriptor: {
    service: svc,
    input: { DBInstanceIdentifier: 0 },
    output: {
      ValidDBInstanceModificationsMessage: {
        Storage: D.list(o_ValidStorageOptions, { item: "ValidStorageOptions" }),
        ValidProcessorFeatures: D.list(
          {},
          { item: "AvailableProcessorFeature" },
        ),
        SupportsDedicatedLogVolume: D.bool,
        AdditionalStorage: {
          SupportsAdditionalStorageVolumes: D.bool,
          Volumes: D.list({
            Storage: D.list(o_ValidStorageOptions, {
              item: "ValidStorageOptions",
            }),
          }),
        },
      },
    },
  },
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeValidDBInstanceModifications",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { HttpEndpointEnabled: D.bool },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableHttpEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      LogFileName: 0,
      Marker: 0,
      NumberOfLines: 0,
    },
    output: { LogFileData: D.secret, AdditionalDataPending: D.bool },
  },
  errors: [
    DBInstanceNotFoundFault,
    DBInstanceNotReadyFault,
    DBLogFileNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DownloadDBLogFilePortion",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "NumberOfLines",
  } as const,
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
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { HttpEndpointEnabled: D.bool },
  },
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableHttpEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBClusterIdentifier: 0, TargetDBInstanceIdentifier: 0 },
    output: { DBCluster: o_DBCluster },
  },
  errors: [
    DBClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverDBCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      GlobalClusterIdentifier: 0,
      TargetDbClusterIdentifier: 0,
      AllowDataLoss: 0,
      Switchover: 0,
    },
    output: { GlobalCluster: o_GlobalCluster },
  },
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidGlobalClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverGlobalCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceName: 0, Filters: D.list(i_Filter, { item: "Filter" }) },
    output: { TagList: D.list({}, { item: "Tag" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, AuditPolicyState: 0 },
    output: { EngineNativeAuditFieldsIncluded: D.bool },
  },
  errors: [
    DBInstanceNotFoundFault,
    InvalidDBInstanceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyActivityStream",
})) as any;

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
  descriptor: {
    service: svc,
    input: { CertificateIdentifier: 0, RemoveCustomerOverride: 0 },
    output: { Certificate: o_Certificate },
  },
  errors: [CertificateNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCertificates",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      Capacity: 0,
      SecondsBeforeTimeout: 0,
      TimeoutAction: 0,
    },
    output: {
      PendingCapacity: D.num,
      CurrentCapacity: D.num,
      SecondsBeforeTimeout: D.num,
    },
  },
  errors: [
    DBClusterNotFoundFault,
    InvalidDBClusterCapacityFault,
    InvalidDBClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCurrentDBClusterCapacity",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Engine: 0, EngineVersion: 0, Description: 0, Status: 0 },
    output: {
      DatabaseInstallationFiles: D.list(),
      DefaultCharacterSet: {},
      Image: {},
      CreateTime: D.ts,
      SupportedCharacterSets: D.list({}, { item: "CharacterSet" }),
      SupportedNcharCharacterSets: D.list({}, { item: "CharacterSet" }),
      ValidUpgradeTarget: D.list(o_UpgradeTarget, { item: "UpgradeTarget" }),
      SupportedTimezones: D.list({}, { item: "Timezone" }),
      ExportableLogTypes: D.list(),
      SupportsLogExportsToCloudwatchLogs: D.bool,
      SupportsReadReplica: D.bool,
      SupportedEngineModes: D.list(),
      SupportedFeatureNames: D.list(),
      SupportsParallelQuery: D.bool,
      SupportsGlobalDatabases: D.bool,
      TagList: D.list({}, { item: "Tag" }),
      SupportsBabelfish: D.bool,
      SupportsLimitlessDatabase: D.bool,
      SupportsCertificateRotationWithoutRestart: D.bool,
      SupportedCACertificateIdentifiers: D.list(),
      SupportsLocalWriteForwarding: D.bool,
      SupportsIntegrations: D.bool,
      ServerlessV2FeaturesSupport: o_ServerlessV2FeaturesSupport,
    },
  },
  errors: [
    CustomDBEngineVersionNotFoundFault,
    InvalidCustomDBEngineVersionStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCustomDBEngineVersion",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      NewDBClusterIdentifier: 0,
      ApplyImmediately: 0,
      BackupRetentionPeriod: 0,
      DBClusterParameterGroupName: 0,
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      Port: 0,
      MasterUserPassword: 0,
      OptionGroupName: 0,
      PreferredBackupWindow: 0,
      PreferredMaintenanceWindow: 0,
      EnableIAMDatabaseAuthentication: 0,
      BacktrackWindow: 0,
      CloudwatchLogsExportConfiguration: i_CloudwatchLogsExportConfiguration,
      EngineVersion: 0,
      AllowMajorVersionUpgrade: 0,
      DBInstanceParameterGroupName: 0,
      Domain: 0,
      DomainIAMRoleName: 0,
      ScalingConfiguration: i_ScalingConfiguration,
      DeletionProtection: 0,
      EnableHttpEndpoint: 0,
      CopyTagsToSnapshot: 0,
      EnableGlobalWriteForwarding: 0,
      DBClusterInstanceClass: 0,
      AllocatedStorage: 0,
      StorageType: 0,
      Iops: 0,
      AutoMinorVersionUpgrade: 0,
      NetworkType: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      MonitoringInterval: 0,
      MonitoringRoleArn: 0,
      DatabaseInsightsMode: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      PerformanceInsightsRetentionPeriod: 0,
      ManageMasterUserPassword: 0,
      RotateMasterUserPassword: 0,
      EnableLocalWriteForwarding: 0,
      MasterUserSecretKmsKeyId: 0,
      EngineMode: 0,
      AllowEngineModeChange: 0,
      AwsBackupRecoveryPointArn: 0,
      EnableLimitlessDatabase: 0,
      CACertificateIdentifier: 0,
      MasterUserAuthenticationType: 0,
      EngineLifecycleSupport: 0,
    },
    output: { DBCluster: o_DBCluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterEndpointIdentifier: 0,
      EndpointType: 0,
      StaticMembers: 0,
      ExcludedMembers: 0,
    },
    output: { StaticMembers: D.list(), ExcludedMembers: D.list() },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterParameterGroupName: 0,
      Parameters: D.list(i_Parameter, { item: "Parameter" }),
    },
  },
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBClusterParameterGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterSnapshotIdentifier: 0,
      AttributeName: 0,
      ValuesToAdd: D.list(0, { item: "AttributeValue" }),
      ValuesToRemove: D.list(0, { item: "AttributeValue" }),
    },
    output: {
      DBClusterSnapshotAttributesResult: o_DBClusterSnapshotAttributesResult,
    },
  },
  errors: [
    DBClusterSnapshotNotFoundFault,
    InvalidDBClusterSnapshotStateFault,
    SharedSnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBClusterSnapshotAttribute",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      AllocatedStorage: 0,
      DBInstanceClass: 0,
      DBSubnetGroupName: 0,
      DBSecurityGroups: D.list(0, { item: "DBSecurityGroupName" }),
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      ApplyImmediately: 0,
      MasterUserPassword: 0,
      DBParameterGroupName: 0,
      BackupRetentionPeriod: 0,
      PreferredBackupWindow: 0,
      PreferredMaintenanceWindow: 0,
      MultiAZ: 0,
      EngineVersion: 0,
      AllowMajorVersionUpgrade: 0,
      AutoMinorVersionUpgrade: 0,
      LicenseModel: 0,
      Iops: 0,
      StorageThroughput: 0,
      OptionGroupName: 0,
      NewDBInstanceIdentifier: 0,
      StorageType: 0,
      TdeCredentialArn: 0,
      TdeCredentialPassword: 0,
      CACertificateIdentifier: 0,
      Domain: 0,
      DomainFqdn: 0,
      DomainOu: 0,
      DomainAuthSecretArn: 0,
      DomainDnsIps: 0,
      DisableDomain: 0,
      CopyTagsToSnapshot: 0,
      MonitoringInterval: 0,
      DBPortNumber: 0,
      PubliclyAccessible: 0,
      MonitoringRoleArn: 0,
      DomainIAMRoleName: 0,
      PromotionTier: 0,
      EnableIAMDatabaseAuthentication: 0,
      DatabaseInsightsMode: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      PerformanceInsightsRetentionPeriod: 0,
      CloudwatchLogsExportConfiguration: i_CloudwatchLogsExportConfiguration,
      ProcessorFeatures: D.list(i_ProcessorFeature, {
        item: "ProcessorFeature",
      }),
      UseDefaultProcessorFeatures: 0,
      DeletionProtection: 0,
      MaxAllocatedStorage: 0,
      CertificateRotationRestart: 0,
      ReplicaMode: 0,
      AutomationMode: 0,
      ResumeFullAutomationModeMinutes: 0,
      EnableCustomerOwnedIp: 0,
      NetworkType: 0,
      AwsBackupRecoveryPointArn: 0,
      ManageMasterUserPassword: 0,
      RotateMasterUserPassword: 0,
      MasterUserSecretKmsKeyId: 0,
      MultiTenant: 0,
      DedicatedLogVolume: 0,
      Engine: 0,
      AdditionalStorageVolumes: D.list({
        VolumeName: 0,
        AllocatedStorage: 0,
        IOPS: 0,
        MaxAllocatedStorage: 0,
        StorageThroughput: 0,
        StorageType: 0,
        SetForDelete: 0,
      }),
      TagSpecifications: D.list(i_TagSpecification, { item: "item" }),
      MasterUserAuthenticationType: 0,
      EngineLifecycleSupport: 0,
    },
    output: { DBInstance: o_DBInstance },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBParameterGroupName: 0,
      Parameters: D.list(i_Parameter, { item: "Parameter" }),
    },
  },
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBParameterGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBProxyName: 0,
      NewDBProxyName: 0,
      DefaultAuthScheme: 0,
      Auth: D.list(i_UserAuthConfig),
      RequireTLS: 0,
      IdleClientTimeout: 0,
      DebugLogging: 0,
      RoleArn: 0,
      SecurityGroups: 0,
    },
    output: { DBProxy: o_DBProxy },
  },
  errors: [
    DBProxyAlreadyExistsFault,
    DBProxyNotFoundFault,
    InvalidDBProxyStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBProxy",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBProxyEndpointName: 0,
      NewDBProxyEndpointName: 0,
      VpcSecurityGroupIds: 0,
    },
    output: { DBProxyEndpoint: o_DBProxyEndpoint },
  },
  errors: [
    DBProxyEndpointAlreadyExistsFault,
    DBProxyEndpointNotFoundFault,
    InvalidDBProxyEndpointStateFault,
    InvalidDBProxyStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBProxyEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      TargetGroupName: 0,
      DBProxyName: 0,
      ConnectionPoolConfig: {
        MaxConnectionsPercent: 0,
        MaxIdleConnectionsPercent: 0,
        ConnectionBorrowTimeout: 0,
        SessionPinningFilters: 0,
        InitQuery: 0,
      },
      NewName: 0,
    },
    output: { DBProxyTargetGroup: o_DBProxyTargetGroup },
  },
  errors: [
    DBProxyNotFoundFault,
    DBProxyTargetGroupNotFoundFault,
    InvalidDBProxyStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBProxyTargetGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      RecommendationId: 0,
      Locale: 0,
      Status: 0,
      RecommendedActionUpdates: D.list({ ActionId: 0, Status: 0 }),
    },
    output: { DBRecommendation: o_DBRecommendation },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBRecommendation",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBShardGroupIdentifier: 0,
      MaxACU: 0,
      MinACU: 0,
      ComputeRedundancy: 0,
    },
    output: {
      MaxACU: D.num,
      MinACU: D.num,
      ComputeRedundancy: D.num,
      PubliclyAccessible: D.bool,
      TagList: D.list({}, { item: "Tag" }),
    },
  },
  errors: [
    DBShardGroupAlreadyExistsFault,
    DBShardGroupNotFoundFault,
    InvalidDBClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBShardGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBSnapshotIdentifier: 0, EngineVersion: 0, OptionGroupName: 0 },
    output: { DBSnapshot: o_DBSnapshot },
  },
  errors: [
    DBSnapshotNotFoundFault,
    InvalidDBSnapshotStateFault,
    KMSKeyNotAccessibleFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBSnapshot",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBSnapshotIdentifier: 0,
      AttributeName: 0,
      ValuesToAdd: D.list(0, { item: "AttributeValue" }),
      ValuesToRemove: D.list(0, { item: "AttributeValue" }),
    },
    output: { DBSnapshotAttributesResult: o_DBSnapshotAttributesResult },
  },
  errors: [
    DBSnapshotNotFoundFault,
    InvalidDBSnapshotStateFault,
    SharedSnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBSnapshotAttribute",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBSubnetGroupName: 0,
      DBSubnetGroupDescription: 0,
      SubnetIds: D.list(0, { item: "SubnetIdentifier" }),
    },
    output: { DBSubnetGroup: o_DBSubnetGroup },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SubscriptionName: 0,
      SnsTopicArn: 0,
      SourceType: 0,
      EventCategories: D.list(0, { item: "EventCategory" }),
      Enabled: 0,
    },
    output: { EventSubscription: o_EventSubscription },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      GlobalClusterIdentifier: 0,
      NewGlobalClusterIdentifier: 0,
      DeletionProtection: 0,
      EngineVersion: 0,
      AllowMajorVersionUpgrade: 0,
    },
    output: { GlobalCluster: o_GlobalCluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      IntegrationIdentifier: 0,
      IntegrationName: 0,
      DataFilter: 0,
      Description: 0,
    },
    output: {
      AdditionalEncryptionContext: D.map(),
      Tags: D.list({}, { item: "Tag" }),
      CreateTime: D.ts,
      Errors: D.list({}, { item: "IntegrationError" }),
    },
  },
  errors: [
    IntegrationConflictOperationFault,
    IntegrationNotFoundFault,
    InvalidIntegrationStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyIntegration",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      OptionGroupName: 0,
      OptionsToInclude: D.list(
        {
          OptionName: 0,
          Port: 0,
          OptionVersion: 0,
          DBSecurityGroupMemberships: D.list(0, {
            item: "DBSecurityGroupName",
          }),
          VpcSecurityGroupMemberships: D.list(0, {
            item: "VpcSecurityGroupId",
          }),
          OptionSettings: D.list(
            {
              Name: 0,
              Value: 0,
              DefaultValue: 0,
              Description: 0,
              ApplyType: 0,
              DataType: 0,
              AllowedValues: 0,
              IsModifiable: 0,
              IsCollection: 0,
            },
            { item: "OptionSetting" },
          ),
        },
        { item: "OptionConfiguration" },
      ),
      OptionsToRemove: 0,
      ApplyImmediately: 0,
    },
    output: { OptionGroup: o_OptionGroup },
  },
  errors: [InvalidOptionGroupStateFault, OptionGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyOptionGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      TenantDBName: 0,
      MasterUserPassword: 0,
      NewTenantDBName: 0,
      ManageMasterUserPassword: 0,
      RotateMasterUserPassword: 0,
      MasterUserSecretKmsKeyId: 0,
    },
    output: { TenantDatabase: o_TenantDatabase },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      BackupRetentionPeriod: 0,
      PreferredBackupWindow: 0,
      TagSpecifications: D.list(i_TagSpecification, { item: "item" }),
    },
    output: { DBInstance: o_DBInstance },
  },
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PromoteReadReplica",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBClusterIdentifier: 0 },
    output: { DBCluster: o_DBCluster },
  },
  errors: [DBClusterNotFoundFault, InvalidDBClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PromoteReadReplicaDBCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ReservedDBInstancesOfferingId: 0,
      ReservedDBInstanceId: 0,
      DBInstanceCount: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { ReservedDBInstance: o_ReservedDBInstance },
  },
  errors: [
    ReservedDBInstanceAlreadyExistsFault,
    ReservedDBInstanceQuotaExceededFault,
    ReservedDBInstancesOfferingNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseReservedDBInstancesOffering",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBClusterIdentifier: 0 },
    output: { DBCluster: o_DBCluster },
  },
  errors: [
    DBClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDBCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBInstanceIdentifier: 0, ForceFailover: 0 },
    output: { DBInstance: o_DBInstance },
  },
  errors: [
    DBInstanceNotFoundFault,
    InvalidDBInstanceStateFault,
    KMSKeyNotAccessibleFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDBInstance",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBShardGroupIdentifier: 0 },
    output: {
      MaxACU: D.num,
      MinACU: D.num,
      ComputeRedundancy: D.num,
      PubliclyAccessible: D.bool,
      TagList: D.list({}, { item: "Tag" }),
    },
  },
  errors: [DBShardGroupNotFoundFault, InvalidDBShardGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDBShardGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBProxyName: 0,
      TargetGroupName: 0,
      DBInstanceIdentifiers: 0,
      DBClusterIdentifiers: 0,
    },
    output: { DBProxyTargets: D.list(o_DBProxyTarget) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { GlobalClusterIdentifier: 0, DbClusterIdentifier: 0 },
    output: { GlobalCluster: o_GlobalCluster },
  },
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidGlobalClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFromGlobalCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBClusterIdentifier: 0, RoleArn: 0, FeatureName: 0 },
  },
  errors: [
    DBClusterNotFoundFault,
    DBClusterRoleNotFoundFault,
    InvalidDBClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveRoleFromDBCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBInstanceIdentifier: 0, RoleArn: 0, FeatureName: 0 },
  },
  errors: [
    DBInstanceNotFoundFault,
    DBInstanceRoleNotFoundFault,
    InvalidDBInstanceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveRoleFromDBInstance",
})) as any;

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
  descriptor: {
    service: svc,
    input: { SubscriptionName: 0, SourceIdentifier: 0 },
    output: { EventSubscription: o_EventSubscription },
  },
  errors: [SourceNotFoundFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveSourceIdentifierFromSubscription",
})) as any;

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
  descriptor: { service: svc, input: { ResourceName: 0, TagKeys: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterParameterGroupName: 0,
      ResetAllParameters: 0,
      Parameters: D.list(i_Parameter, { item: "Parameter" }),
    },
  },
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDBClusterParameterGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBParameterGroupName: 0,
      ResetAllParameters: 0,
      Parameters: D.list(i_Parameter, { item: "Parameter" }),
    },
  },
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDBParameterGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
      BackupRetentionPeriod: 0,
      CharacterSetName: 0,
      DatabaseName: 0,
      DBClusterIdentifier: 0,
      DBClusterParameterGroupName: 0,
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      DBSubnetGroupName: 0,
      Engine: 0,
      EngineVersion: 0,
      Port: 0,
      MasterUsername: 0,
      MasterUserPassword: 0,
      OptionGroupName: 0,
      PreferredBackupWindow: 0,
      PreferredMaintenanceWindow: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      StorageEncrypted: 0,
      KmsKeyId: 0,
      EnableIAMDatabaseAuthentication: 0,
      SourceEngine: 0,
      SourceEngineVersion: 0,
      S3BucketName: 0,
      S3Prefix: 0,
      S3IngestionRoleArn: 0,
      BacktrackWindow: 0,
      EnableCloudwatchLogsExports: 0,
      DeletionProtection: 0,
      CopyTagsToSnapshot: 0,
      Domain: 0,
      DomainIAMRoleName: 0,
      StorageType: 0,
      NetworkType: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      ManageMasterUserPassword: 0,
      MasterUserSecretKmsKeyId: 0,
      EngineLifecycleSupport: 0,
      TagSpecifications: D.list(i_TagSpecification, { item: "item" }),
      AssociatedRoles: D.list(i_DBClusterAssociatedRole, {
        item: "DBClusterAssociatedRole",
      }),
    },
    output: { DBCluster: o_DBCluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
      DBClusterIdentifier: 0,
      SnapshotIdentifier: 0,
      Engine: 0,
      EngineVersion: 0,
      Port: 0,
      DBSubnetGroupName: 0,
      DatabaseName: 0,
      OptionGroupName: 0,
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      Tags: D.list(i_Tag, { item: "Tag" }),
      KmsKeyId: 0,
      EnableIAMDatabaseAuthentication: 0,
      BacktrackWindow: 0,
      EnableCloudwatchLogsExports: 0,
      EngineMode: 0,
      ScalingConfiguration: i_ScalingConfiguration,
      DBClusterParameterGroupName: 0,
      DeletionProtection: 0,
      CopyTagsToSnapshot: 0,
      Domain: 0,
      DomainIAMRoleName: 0,
      DBClusterInstanceClass: 0,
      StorageType: 0,
      Iops: 0,
      PubliclyAccessible: 0,
      NetworkType: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      RdsCustomClusterConfiguration: i_RdsCustomClusterConfiguration,
      MonitoringInterval: 0,
      MonitoringRoleArn: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      PerformanceInsightsRetentionPeriod: 0,
      BackupRetentionPeriod: 0,
      PreferredBackupWindow: 0,
      EngineLifecycleSupport: 0,
      TagSpecifications: D.list(i_TagSpecification, { item: "item" }),
      EnableVPCNetworking: 0,
      EnableInternetAccessGateway: 0,
      AssociatedRoles: D.list(i_DBClusterAssociatedRole, {
        item: "DBClusterAssociatedRole",
      }),
    },
    output: { DBCluster: o_DBCluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      RestoreType: 0,
      SourceDBClusterIdentifier: 0,
      RestoreToTime: 0,
      UseLatestRestorableTime: 0,
      Port: 0,
      DBSubnetGroupName: 0,
      OptionGroupName: 0,
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      Tags: D.list(i_Tag, { item: "Tag" }),
      KmsKeyId: 0,
      EnableIAMDatabaseAuthentication: 0,
      BacktrackWindow: 0,
      EnableCloudwatchLogsExports: 0,
      DBClusterParameterGroupName: 0,
      DeletionProtection: 0,
      CopyTagsToSnapshot: 0,
      Domain: 0,
      DomainIAMRoleName: 0,
      DBClusterInstanceClass: 0,
      StorageType: 0,
      PubliclyAccessible: 0,
      Iops: 0,
      NetworkType: 0,
      SourceDbClusterResourceId: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      ScalingConfiguration: i_ScalingConfiguration,
      EngineMode: 0,
      RdsCustomClusterConfiguration: i_RdsCustomClusterConfiguration,
      MonitoringInterval: 0,
      MonitoringRoleArn: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      PerformanceInsightsRetentionPeriod: 0,
      BackupRetentionPeriod: 0,
      PreferredBackupWindow: 0,
      EngineLifecycleSupport: 0,
      TagSpecifications: D.list(i_TagSpecification, { item: "item" }),
      EnableVPCNetworking: 0,
      EnableInternetAccessGateway: 0,
      AssociatedRoles: D.list(i_DBClusterAssociatedRole, {
        item: "DBClusterAssociatedRole",
      }),
    },
    output: { DBCluster: o_DBCluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      DBSnapshotIdentifier: 0,
      DBInstanceClass: 0,
      Port: 0,
      AvailabilityZone: 0,
      DBSubnetGroupName: 0,
      MultiAZ: 0,
      PubliclyAccessible: 0,
      AutoMinorVersionUpgrade: 0,
      LicenseModel: 0,
      DBName: 0,
      Engine: 0,
      Iops: 0,
      StorageThroughput: 0,
      OptionGroupName: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      StorageType: 0,
      TdeCredentialArn: 0,
      TdeCredentialPassword: 0,
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      Domain: 0,
      DomainFqdn: 0,
      DomainOu: 0,
      DomainAuthSecretArn: 0,
      DomainDnsIps: 0,
      CopyTagsToSnapshot: 0,
      DomainIAMRoleName: 0,
      EnableIAMDatabaseAuthentication: 0,
      EnableCloudwatchLogsExports: 0,
      ProcessorFeatures: D.list(i_ProcessorFeature, {
        item: "ProcessorFeature",
      }),
      UseDefaultProcessorFeatures: 0,
      DBParameterGroupName: 0,
      DeletionProtection: 0,
      EnableCustomerOwnedIp: 0,
      NetworkType: 0,
      BackupTarget: 0,
      CustomIamInstanceProfile: 0,
      AllocatedStorage: 0,
      DBClusterSnapshotIdentifier: 0,
      BackupRetentionPeriod: 0,
      PreferredBackupWindow: 0,
      DedicatedLogVolume: 0,
      CACertificateIdentifier: 0,
      EngineLifecycleSupport: 0,
      AdditionalStorageVolumes: D.list(i_AdditionalStorageVolume),
      TagSpecifications: D.list(i_TagSpecification, { item: "item" }),
      ManageMasterUserPassword: 0,
      MasterUserSecretKmsKeyId: 0,
    },
    output: { DBInstance: o_DBInstance },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBName: 0,
      DBInstanceIdentifier: 0,
      AllocatedStorage: 0,
      DBInstanceClass: 0,
      Engine: 0,
      MasterUsername: 0,
      MasterUserPassword: 0,
      DBSecurityGroups: D.list(0, { item: "DBSecurityGroupName" }),
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      AvailabilityZone: 0,
      DBSubnetGroupName: 0,
      PreferredMaintenanceWindow: 0,
      DBParameterGroupName: 0,
      BackupRetentionPeriod: 0,
      PreferredBackupWindow: 0,
      Port: 0,
      MultiAZ: 0,
      EngineVersion: 0,
      AutoMinorVersionUpgrade: 0,
      LicenseModel: 0,
      Iops: 0,
      StorageThroughput: 0,
      OptionGroupName: 0,
      PubliclyAccessible: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      StorageType: 0,
      StorageEncrypted: 0,
      KmsKeyId: 0,
      CopyTagsToSnapshot: 0,
      MonitoringInterval: 0,
      MonitoringRoleArn: 0,
      EnableIAMDatabaseAuthentication: 0,
      SourceEngine: 0,
      SourceEngineVersion: 0,
      S3BucketName: 0,
      S3Prefix: 0,
      S3IngestionRoleArn: 0,
      DatabaseInsightsMode: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      PerformanceInsightsRetentionPeriod: 0,
      EnableCloudwatchLogsExports: 0,
      ProcessorFeatures: D.list(i_ProcessorFeature, {
        item: "ProcessorFeature",
      }),
      UseDefaultProcessorFeatures: 0,
      DeletionProtection: 0,
      MaxAllocatedStorage: 0,
      NetworkType: 0,
      ManageMasterUserPassword: 0,
      MasterUserSecretKmsKeyId: 0,
      DedicatedLogVolume: 0,
      CACertificateIdentifier: 0,
      EngineLifecycleSupport: 0,
      AdditionalStorageVolumes: D.list(i_AdditionalStorageVolume),
      TagSpecifications: D.list(i_TagSpecification, { item: "item" }),
    },
    output: { DBInstance: o_DBInstance },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceDBInstanceIdentifier: 0,
      TargetDBInstanceIdentifier: 0,
      RestoreTime: 0,
      UseLatestRestorableTime: 0,
      DBInstanceClass: 0,
      Port: 0,
      AvailabilityZone: 0,
      DBSubnetGroupName: 0,
      MultiAZ: 0,
      PubliclyAccessible: 0,
      AutoMinorVersionUpgrade: 0,
      LicenseModel: 0,
      DBName: 0,
      Engine: 0,
      Iops: 0,
      StorageThroughput: 0,
      OptionGroupName: 0,
      CopyTagsToSnapshot: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      StorageType: 0,
      TdeCredentialArn: 0,
      TdeCredentialPassword: 0,
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      Domain: 0,
      DomainIAMRoleName: 0,
      DomainFqdn: 0,
      DomainOu: 0,
      DomainAuthSecretArn: 0,
      DomainDnsIps: 0,
      EnableIAMDatabaseAuthentication: 0,
      EnableCloudwatchLogsExports: 0,
      ProcessorFeatures: D.list(i_ProcessorFeature, {
        item: "ProcessorFeature",
      }),
      UseDefaultProcessorFeatures: 0,
      DBParameterGroupName: 0,
      DeletionProtection: 0,
      SourceDbiResourceId: 0,
      MaxAllocatedStorage: 0,
      EnableCustomerOwnedIp: 0,
      NetworkType: 0,
      SourceDBInstanceAutomatedBackupsArn: 0,
      BackupTarget: 0,
      CustomIamInstanceProfile: 0,
      AllocatedStorage: 0,
      BackupRetentionPeriod: 0,
      PreferredBackupWindow: 0,
      DedicatedLogVolume: 0,
      CACertificateIdentifier: 0,
      EngineLifecycleSupport: 0,
      AdditionalStorageVolumes: D.list(i_AdditionalStorageVolume),
      TagSpecifications: D.list(i_TagSpecification, { item: "item" }),
      ManageMasterUserPassword: 0,
      MasterUserSecretKmsKeyId: 0,
    },
    output: { DBInstance: o_DBInstance },
  },
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
})) as any;

export type RevokeDBSecurityGroupIngressError =
  | AuthorizationNotFoundFault
  | DBSecurityGroupNotFoundFault
  | InvalidDBSecurityGroupStateFault
  | CommonErrors;
/**
 * Revokes ingress from a DBSecurityGroup for previously authorized IP ranges or EC2 or VPC security groups. Required parameters for this API are one of CIDRIP, EC2SecurityGroupId for VPC, or (EC2SecurityGroupOwnerId and either EC2SecurityGroupName or EC2SecurityGroupId).
 *
 * EC2-Classic was retired on August 15, 2022. If you haven't migrated from EC2-Classic to a VPC, we recommend that you migrate as soon as possible. For more information, see Migrate from EC2-Classic to a VPC in the *Amazon EC2 User Guide*, the blog EC2-Classic Networking is Retiring – Here’s How to Prepare, and Moving a DB instance not in a VPC into a VPC in the *Amazon RDS User Guide*.
 */
export const revokeDBSecurityGroupIngress: API.OperationMethod<
  RevokeDBSecurityGroupIngressMessage,
  RevokeDBSecurityGroupIngressResult,
  RevokeDBSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DBSecurityGroupName: 0,
      CIDRIP: 0,
      EC2SecurityGroupName: 0,
      EC2SecurityGroupId: 0,
      EC2SecurityGroupOwnerId: 0,
    },
    output: { DBSecurityGroup: o_DBSecurityGroup },
  },
  errors: [
    AuthorizationNotFoundFault,
    DBSecurityGroupNotFoundFault,
    InvalidDBSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeDBSecurityGroupIngress",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ResourceArn: 0,
      Mode: 0,
      KmsKeyId: 0,
      ApplyImmediately: 0,
      EngineNativeAuditFieldsIncluded: 0,
    },
    output: {
      EngineNativeAuditFieldsIncluded: D.bool,
      ApplyImmediately: D.bool,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBClusterIdentifier: 0 },
    output: { DBCluster: o_DBCluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBInstanceIdentifier: 0 },
    output: { DBInstance: o_DBInstance },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceDBInstanceArn: 0,
      BackupRetentionPeriod: 0,
      KmsKeyId: 0,
      PreSignedUrl: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { DBInstanceAutomatedBackup: o_DBInstanceAutomatedBackup },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ExportTaskIdentifier: 0,
      SourceArn: 0,
      S3BucketName: 0,
      IamRoleArn: 0,
      KmsKeyId: 0,
      S3Prefix: 0,
      ExportOnly: 0,
    },
    output: {
      ExportOnly: D.list(),
      SnapshotTime: D.ts,
      TaskStartTime: D.ts,
      TaskEndTime: D.ts,
      PercentProgress: D.num,
      TotalExtractedDataInGB: D.num,
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0, ApplyImmediately: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBClusterIdentifier: 0 },
    output: { DBCluster: o_DBCluster },
  },
  errors: [
    DBClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBShardGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDBCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBInstanceIdentifier: 0, DBSnapshotIdentifier: 0 },
    output: { DBInstance: o_DBInstance },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { SourceDBInstanceArn: 0 },
    output: { DBInstanceAutomatedBackup: o_DBInstanceAutomatedBackup },
  },
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDBInstanceAutomatedBackupsReplication",
})) as any;

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
  descriptor: {
    service: svc,
    input: { BlueGreenDeploymentIdentifier: 0, SwitchoverTimeout: 0 },
    output: { BlueGreenDeployment: o_BlueGreenDeployment },
  },
  errors: [
    BlueGreenDeploymentNotFoundFault,
    InvalidBlueGreenDeploymentStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SwitchoverBlueGreenDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    input: { GlobalClusterIdentifier: 0, TargetDbClusterIdentifier: 0 },
    output: { GlobalCluster: o_GlobalCluster },
  },
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidGlobalClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SwitchoverGlobalCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBInstanceIdentifier: 0 },
    output: { DBInstance: o_DBInstance },
  },
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SwitchoverReadReplica",
})) as any;

const i_AdditionalStorageVolume: D.LazyStruct = () => ({
  VolumeName: 0,
  AllocatedStorage: 0,
  IOPS: 0,
  MaxAllocatedStorage: 0,
  StorageThroughput: 0,
  StorageType: 0,
});
const i_CloudwatchLogsExportConfiguration: D.LazyStruct = () => ({
  EnableLogTypes: 0,
  DisableLogTypes: 0,
});
const i_DBClusterAssociatedRole: D.LazyStruct = () => ({
  RoleArn: 0,
  FeatureName: 0,
});
const i_Filter: D.LazyStruct = () => ({
  Name: 0,
  Values: D.list(0, { item: "Value" }),
});
const i_Parameter: D.LazyStruct = () => ({
  ParameterName: 0,
  ParameterValue: 0,
  Description: 0,
  Source: 0,
  ApplyType: 0,
  DataType: 0,
  AllowedValues: 0,
  IsModifiable: 0,
  MinimumEngineVersion: 0,
  ApplyMethod: 0,
  SupportedEngineModes: 0,
});
const i_ProcessorFeature: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_RdsCustomClusterConfiguration: D.LazyStruct = () => ({
  InterconnectSubnetId: 0,
  TransitGatewayMulticastDomainId: 0,
  ReplicaMode: 0,
});
const i_ScalingConfiguration: D.LazyStruct = () => ({
  MinCapacity: 0,
  MaxCapacity: 0,
  AutoPause: 0,
  SecondsUntilAutoPause: 0,
  TimeoutAction: 0,
  SecondsBeforeTimeout: 0,
});
const i_ServerlessV2ScalingConfiguration: D.LazyStruct = () => ({
  MinCapacity: 0,
  MaxCapacity: 0,
  SecondsUntilAutoPause: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TagSpecification: D.LazyStruct = () => ({
  ResourceType: 0,
  Tags: D.list(i_Tag, { item: "Tag" }),
});
const i_UserAuthConfig: D.LazyStruct = () => ({
  Description: 0,
  UserName: 0,
  AuthScheme: 0,
  SecretArn: 0,
  IAMAuth: 0,
  ClientPasswordAuthType: 0,
});
const o_BlueGreenDeployment: D.LazyStruct = () => ({
  SwitchoverDetails: D.list({}),
  Tasks: D.list({}),
  CreateTime: D.ts,
  DeleteTime: D.ts,
  TagList: D.list({}, { item: "Tag" }),
});
const o_Certificate: D.LazyStruct = () => ({
  ValidFrom: D.ts,
  ValidTill: D.ts,
  CustomerOverride: D.bool,
  CustomerOverrideValidTill: D.ts,
});
const o_DBCluster: D.LazyStruct = () => ({
  AllocatedStorage: D.num,
  AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
  BackupRetentionPeriod: D.num,
  EarliestRestorableTime: D.ts,
  CustomEndpoints: D.list(),
  MultiAZ: D.bool,
  LatestRestorableTime: D.ts,
  Port: D.num,
  DBClusterOptionGroupMemberships: D.list({}, { item: "DBClusterOptionGroup" }),
  ReadReplicaIdentifiers: D.list(0, { item: "ReadReplicaIdentifier" }),
  StatusInfos: D.list({ Normal: D.bool }, { item: "DBClusterStatusInfo" }),
  DBClusterMembers: D.list(
    { IsClusterWriter: D.bool, PromotionTier: D.num },
    { item: "DBClusterMember" },
  ),
  VpcSecurityGroups: D.list({}, { item: "VpcSecurityGroupMembership" }),
  StorageEncrypted: D.bool,
  AssociatedRoles: D.list({}, { item: "DBClusterRole" }),
  IAMDatabaseAuthenticationEnabled: D.bool,
  ClusterCreateTime: D.ts,
  EarliestBacktrackTime: D.ts,
  BacktrackWindow: D.num,
  BacktrackConsumedChangeRecords: D.num,
  EnabledCloudwatchLogsExports: D.list(),
  Capacity: D.num,
  PendingModifiedValues: {
    PendingCloudwatchLogsExports: o_PendingCloudwatchLogsExports,
    MasterUserPassword: D.secret,
    IAMDatabaseAuthenticationEnabled: D.bool,
    BackupRetentionPeriod: D.num,
    AllocatedStorage: D.num,
    RdsCustomClusterConfiguration: {},
    Iops: D.num,
    CertificateDetails: o_CertificateDetails,
  },
  ScalingConfigurationInfo: {
    MinCapacity: D.num,
    MaxCapacity: D.num,
    AutoPause: D.bool,
    SecondsUntilAutoPause: D.num,
    SecondsBeforeTimeout: D.num,
  },
  RdsCustomClusterConfiguration: {},
  Iops: D.num,
  StorageThroughput: D.num,
  IOOptimizedNextAllowedModificationTime: D.ts,
  PubliclyAccessible: D.bool,
  AutoMinorVersionUpgrade: D.bool,
  DeletionProtection: D.bool,
  HttpEndpointEnabled: D.bool,
  CopyTagsToSnapshot: D.bool,
  CrossAccountClone: D.bool,
  DomainMemberships: D.list(o_DomainMembership, { item: "DomainMembership" }),
  TagList: D.list({}, { item: "Tag" }),
  GlobalWriteForwardingRequested: D.bool,
  AutomaticRestartTime: D.ts,
  ServerlessV2ScalingConfiguration: {
    MinCapacity: D.num,
    MaxCapacity: D.num,
    SecondsUntilAutoPause: D.num,
  },
  MonitoringInterval: D.num,
  PerformanceInsightsEnabled: D.bool,
  PerformanceInsightsRetentionPeriod: D.num,
  MasterUserSecret: {},
  LimitlessDatabase: { MinRequiredACU: D.num },
  CertificateDetails: o_CertificateDetails,
  VPCNetworkingEnabled: D.bool,
  InternetAccessGatewayEnabled: D.bool,
});
const o_DBClusterAutomatedBackup: D.LazyStruct = () => ({
  RestoreWindow: o_RestoreWindow,
  IAMDatabaseAuthenticationEnabled: D.bool,
  ClusterCreateTime: D.ts,
  StorageEncrypted: D.bool,
  AllocatedStorage: D.num,
  BackupRetentionPeriod: D.num,
  AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
  Port: D.num,
  Iops: D.num,
  StorageThroughput: D.num,
  TagList: D.list({}, { item: "Tag" }),
});
const o_DBClusterSnapshot: D.LazyStruct = () => ({
  AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
  SnapshotCreateTime: D.ts,
  AllocatedStorage: D.num,
  Port: D.num,
  ClusterCreateTime: D.ts,
  PercentProgress: D.num,
  StorageEncrypted: D.bool,
  BackupRetentionPeriod: D.num,
  IAMDatabaseAuthenticationEnabled: D.bool,
  TagList: D.list({}, { item: "Tag" }),
  StorageThroughput: D.num,
});
const o_DBClusterSnapshotAttributesResult: D.LazyStruct = () => ({
  DBClusterSnapshotAttributes: D.list(
    { AttributeValues: D.list(0, { item: "AttributeValue" }) },
    { item: "DBClusterSnapshotAttribute" },
  ),
});
const o_DBInstance: D.LazyStruct = () => ({
  Endpoint: o_Endpoint,
  AllocatedStorage: D.num,
  InstanceCreateTime: D.ts,
  BackupRetentionPeriod: D.num,
  DBSecurityGroups: D.list({}, { item: "DBSecurityGroup" }),
  VpcSecurityGroups: D.list({}, { item: "VpcSecurityGroupMembership" }),
  DBParameterGroups: D.list({}, { item: "DBParameterGroup" }),
  DBSubnetGroup: o_DBSubnetGroup,
  PendingModifiedValues: {
    AllocatedStorage: D.num,
    MasterUserPassword: D.secret,
    Port: D.num,
    BackupRetentionPeriod: D.num,
    MultiAZ: D.bool,
    Iops: D.num,
    StorageThroughput: D.num,
    PendingCloudwatchLogsExports: o_PendingCloudwatchLogsExports,
    ProcessorFeatures: D.list({}, { item: "ProcessorFeature" }),
    ResumeFullAutomationModeTime: D.ts,
    MultiTenant: D.bool,
    IAMDatabaseAuthenticationEnabled: D.bool,
    DedicatedLogVolume: D.bool,
    AdditionalStorageVolumes: D.list(o_AdditionalStorageVolume),
  },
  LatestRestorableTime: D.ts,
  MultiAZ: D.bool,
  AutoMinorVersionUpgrade: D.bool,
  ReadReplicaDBInstanceIdentifiers: D.list(0, {
    item: "ReadReplicaDBInstanceIdentifier",
  }),
  ReadReplicaDBClusterIdentifiers: D.list(0, {
    item: "ReadReplicaDBClusterIdentifier",
  }),
  Iops: D.num,
  StorageThroughput: D.num,
  OptionGroupMemberships: D.list({}, { item: "OptionGroupMembership" }),
  PubliclyAccessible: D.bool,
  StatusInfos: D.list({ Normal: D.bool }, { item: "DBInstanceStatusInfo" }),
  DbInstancePort: D.num,
  StorageEncrypted: D.bool,
  DomainMemberships: D.list(o_DomainMembership, { item: "DomainMembership" }),
  CopyTagsToSnapshot: D.bool,
  MonitoringInterval: D.num,
  PromotionTier: D.num,
  IAMDatabaseAuthenticationEnabled: D.bool,
  PerformanceInsightsEnabled: D.bool,
  PerformanceInsightsRetentionPeriod: D.num,
  EnabledCloudwatchLogsExports: D.list(),
  ProcessorFeatures: D.list({}, { item: "ProcessorFeature" }),
  DeletionProtection: D.bool,
  AssociatedRoles: D.list({}, { item: "DBInstanceRole" }),
  ListenerEndpoint: o_Endpoint,
  MaxAllocatedStorage: D.num,
  TagList: D.list({}, { item: "Tag" }),
  ResumeFullAutomationModeTime: D.ts,
  CustomerOwnedIpEnabled: D.bool,
  ActivityStreamEngineNativeAuditFieldsIncluded: D.bool,
  DBInstanceAutomatedBackupsReplications: D.list(
    {},
    { item: "DBInstanceAutomatedBackupsReplication" },
  ),
  AutomaticRestartTime: D.ts,
  CertificateDetails: o_CertificateDetails,
  MasterUserSecret: {},
  MultiTenant: D.bool,
  DedicatedLogVolume: D.bool,
  IsStorageConfigUpgradeAvailable: D.bool,
  AdditionalStorageVolumes: D.list({
    StorageOperationPercentProgress: D.num,
    AllocatedStorage: D.num,
    IOPS: D.num,
    MaxAllocatedStorage: D.num,
    StorageThroughput: D.num,
  }),
  StorageOperationPercentProgress: D.num,
});
const o_DBInstanceAutomatedBackup: D.LazyStruct = () => ({
  RestoreWindow: o_RestoreWindow,
  AllocatedStorage: D.num,
  Port: D.num,
  InstanceCreateTime: D.ts,
  Iops: D.num,
  StorageThroughput: D.num,
  Encrypted: D.bool,
  IAMDatabaseAuthenticationEnabled: D.bool,
  BackupRetentionPeriod: D.num,
  DBInstanceAutomatedBackupsReplications: D.list(
    {},
    { item: "DBInstanceAutomatedBackupsReplication" },
  ),
  MultiTenant: D.bool,
  TagList: D.list({}, { item: "Tag" }),
  DedicatedLogVolume: D.bool,
  AdditionalStorageVolumes: D.list(o_AdditionalStorageVolume),
});
const o_DBProxy: D.LazyStruct = () => ({
  VpcSecurityGroupIds: D.list(),
  VpcSubnetIds: D.list(),
  Auth: D.list({}),
  RequireTLS: D.bool,
  IdleClientTimeout: D.num,
  DebugLogging: D.bool,
  CreatedDate: D.ts,
  UpdatedDate: D.ts,
});
const o_DBProxyEndpoint: D.LazyStruct = () => ({
  VpcSecurityGroupIds: D.list(),
  VpcSubnetIds: D.list(),
  CreatedDate: D.ts,
  IsDefault: D.bool,
});
const o_DBProxyTarget: D.LazyStruct = () => ({ Port: D.num, TargetHealth: {} });
const o_DBProxyTargetGroup: D.LazyStruct = () => ({
  IsDefault: D.bool,
  ConnectionPoolConfig: {
    MaxConnectionsPercent: D.num,
    MaxIdleConnectionsPercent: D.num,
    ConnectionBorrowTimeout: D.num,
    SessionPinningFilters: D.list(),
    InitQuery: D.secret,
  },
  CreatedDate: D.ts,
  UpdatedDate: D.ts,
});
const o_DBRecommendation: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  UpdatedTime: D.ts,
  RecommendedActions: D.list({
    Parameters: D.list({}),
    ApplyModes: D.list(),
    IssueDetails: o_IssueDetails,
    ContextAttributes: D.list({}),
  }),
  Links: D.list({}),
  IssueDetails: o_IssueDetails,
});
const o_DBSecurityGroup: D.LazyStruct = () => ({
  EC2SecurityGroups: D.list({}, { item: "EC2SecurityGroup" }),
  IPRanges: D.list({}, { item: "IPRange" }),
});
const o_DBSnapshot: D.LazyStruct = () => ({
  SnapshotCreateTime: D.ts,
  AllocatedStorage: D.num,
  Port: D.num,
  InstanceCreateTime: D.ts,
  Iops: D.num,
  StorageThroughput: D.num,
  PercentProgress: D.num,
  Encrypted: D.bool,
  BackupRetentionPeriod: D.num,
  IAMDatabaseAuthenticationEnabled: D.bool,
  ProcessorFeatures: D.list({}, { item: "ProcessorFeature" }),
  TagList: D.list({}, { item: "Tag" }),
  OriginalSnapshotCreateTime: D.ts,
  SnapshotDatabaseTime: D.ts,
  MultiTenant: D.bool,
  DedicatedLogVolume: D.bool,
  AdditionalStorageVolumes: D.list(o_AdditionalStorageVolume),
  FullSnapshotSizeInBytes: D.num,
});
const o_DBSnapshotAttributesResult: D.LazyStruct = () => ({
  DBSnapshotAttributes: D.list(
    { AttributeValues: D.list(0, { item: "AttributeValue" }) },
    { item: "DBSnapshotAttribute" },
  ),
});
const o_DBSubnetGroup: D.LazyStruct = () => ({
  Subnets: D.list(
    { SubnetAvailabilityZone: {}, SubnetOutpost: {} },
    { item: "Subnet" },
  ),
  SupportedNetworkTypes: D.list(),
});
const o_EngineDefaults: D.LazyStruct = () => ({
  Parameters: D.list(o_Parameter, { item: "Parameter" }),
});
const o_EventSubscription: D.LazyStruct = () => ({
  SourceIdsList: D.list(0, { item: "SourceId" }),
  EventCategoriesList: D.list(0, { item: "EventCategory" }),
  Enabled: D.bool,
});
const o_GlobalCluster: D.LazyStruct = () => ({
  StorageEncrypted: D.bool,
  DeletionProtection: D.bool,
  GlobalClusterMembers: D.list(
    { Readers: D.list(), IsWriter: D.bool },
    { item: "GlobalClusterMember" },
  ),
  FailoverState: { IsDataLossAllowed: D.bool },
  TagList: D.list({}, { item: "Tag" }),
});
const o_OptionGroup: D.LazyStruct = () => ({
  Options: D.list(
    {
      Persistent: D.bool,
      Permanent: D.bool,
      Port: D.num,
      OptionSettings: D.list(
        { Value: D.secret, IsModifiable: D.bool, IsCollection: D.bool },
        { item: "OptionSetting" },
      ),
      DBSecurityGroupMemberships: D.list({}, { item: "DBSecurityGroup" }),
      VpcSecurityGroupMemberships: D.list(
        {},
        { item: "VpcSecurityGroupMembership" },
      ),
    },
    { item: "Option" },
  ),
  AllowsVpcAndNonVpcInstanceMemberships: D.bool,
  CopyTimestamp: D.ts,
});
const o_Parameter: D.LazyStruct = () => ({
  IsModifiable: D.bool,
  SupportedEngineModes: D.list(),
});
const o_RecurringCharge: D.LazyStruct = () => ({
  RecurringChargeAmount: D.num,
});
const o_ReservedDBInstance: D.LazyStruct = () => ({
  StartTime: D.ts,
  Duration: D.num,
  FixedPrice: D.num,
  UsagePrice: D.num,
  DBInstanceCount: D.num,
  MultiAZ: D.bool,
  RecurringCharges: D.list(o_RecurringCharge, { item: "RecurringCharge" }),
});
const o_ResourcePendingMaintenanceActions: D.LazyStruct = () => ({
  PendingMaintenanceActionDetails: D.list(
    {
      AutoAppliedAfterDate: D.ts,
      ForcedApplyDate: D.ts,
      CurrentApplyDate: D.ts,
    },
    { item: "PendingMaintenanceAction" },
  ),
});
const o_ServerlessV2FeaturesSupport: D.LazyStruct = () => ({
  MinCapacity: D.num,
  MaxCapacity: D.num,
});
const o_TenantDatabase: D.LazyStruct = () => ({
  TenantDatabaseCreateTime: D.ts,
  DeletionProtection: D.bool,
  PendingModifiedValues: { MasterUserPassword: D.secret },
  MasterUserSecret: {},
  TagList: D.list({}, { item: "Tag" }),
});
const o_UpgradeTarget: D.LazyStruct = () => ({
  AutoUpgrade: D.bool,
  IsMajorVersionUpgrade: D.bool,
  SupportedEngineModes: D.list(),
  SupportsParallelQuery: D.bool,
  SupportsGlobalDatabases: D.bool,
  SupportsBabelfish: D.bool,
  SupportsLimitlessDatabase: D.bool,
  SupportsLocalWriteForwarding: D.bool,
  SupportsIntegrations: D.bool,
});
const o_ValidStorageOptions: D.LazyStruct = () => ({
  StorageSize: D.list(o_Range, { item: "Range" }),
  ProvisionedIops: D.list(o_Range, { item: "Range" }),
  IopsToStorageRatio: D.list(o_DoubleRange, { item: "DoubleRange" }),
  ProvisionedStorageThroughput: D.list(o_Range, { item: "Range" }),
  StorageThroughputToIopsRatio: D.list(o_DoubleRange, { item: "DoubleRange" }),
  SupportsStorageAutoscaling: D.bool,
});
const o_AdditionalStorageVolume: D.LazyStruct = () => ({
  AllocatedStorage: D.num,
  IOPS: D.num,
  MaxAllocatedStorage: D.num,
  StorageThroughput: D.num,
});
const o_CertificateDetails: D.LazyStruct = () => ({ ValidTill: D.ts });
const o_DomainMembership: D.LazyStruct = () => ({ DnsIps: D.list() });
const o_DoubleRange: D.LazyStruct = () => ({ From: D.num, To: D.num });
const o_Endpoint: D.LazyStruct = () => ({ Port: D.num });
const o_IssueDetails: D.LazyStruct = () => ({
  PerformanceIssueDetails: {
    StartTime: D.ts,
    EndTime: D.ts,
    Metrics: D.list({
      References: D.list({
        ReferenceDetails: { ScalarReferenceDetails: { Value: D.num } },
      }),
      MetricQuery: {
        PerformanceInsightsMetricQuery: {
          GroupBy: { Dimensions: D.list(), Limit: D.num },
        },
      },
    }),
  },
});
const o_PendingCloudwatchLogsExports: D.LazyStruct = () => ({
  LogTypesToEnable: D.list(),
  LogTypesToDisable: D.list(),
});
const o_Range: D.LazyStruct = () => ({ From: D.num, To: D.num, Step: D.num });
const o_RestoreWindow: D.LazyStruct = () => ({
  EarliestTime: D.ts,
  LatestTime: D.ts,
});
