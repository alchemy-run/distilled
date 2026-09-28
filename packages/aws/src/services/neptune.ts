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
  sdkId: "Neptune",
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

export class AuthorizationNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthorizationNotFoundFault",
    ["BadRequestError"],
    { code: "AuthorizationNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class CertificateNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CertificateNotFoundFault",
    ["BadRequestError"],
    { code: "CertificateNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class DBClusterAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBClusterAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
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
    ["BadRequestError"],
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
    ["AuthError"],
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
export class DBInstanceNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBInstanceNotFoundFault",
    ["BadRequestError"],
    { code: "DBInstanceNotFound", status: 404 },
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
    ["BadRequestError"],
    { code: "DBParameterGroupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class DBParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBParameterGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "DBParameterGroupQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class DBSecurityGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSecurityGroupNotFoundFault",
    ["BadRequestError"],
    { code: "DBSecurityGroupNotFound", status: 404 },
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
export class DBSubnetGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSubnetGroupNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DBSubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DBSubnetGroupQuotaExceededFault",
    ["BadRequestError"],
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
export class EventSubscriptionQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "EventSubscriptionQuotaExceededFault",
    ["BadRequestError"],
    { code: "EventSubscriptionQuotaExceeded", status: 400 },
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
export class InstanceQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InstanceQuotaExceededFault",
    ["BadRequestError"],
    { code: "InstanceQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientDBClusterCapacityFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientDBClusterCapacityFault",
    ["AuthError"],
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
    ["BadRequestError"],
    { status: 400 },
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
export class InvalidDBSecurityGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBSecurityGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidDBSecurityGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDBSnapshotStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDBSnapshotStateFault",
    ["BadRequestError"],
    { code: "InvalidDBSnapshotState", status: 400 },
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
export class InvalidGlobalClusterStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidGlobalClusterStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRestoreFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRestoreFault",
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
export class NetworkTypeNotSupportedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "NetworkTypeNotSupportedFault",
    ["BadRequestError"],
    { code: "NetworkTypeNotSupported", status: 400 },
  )<{ readonly message?: string }> {}
export class OptionGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "OptionGroupNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ProvisionedIopsNotAvailableInAZFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ProvisionedIopsNotAvailableInAZFault",
    ["BadRequestError"],
    { status: 400 },
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
  descriptor: {
    service: svc,
    input: { ResourceName: 0, Tags: D.list(i_Tag, { item: "Tag" }) },
  },
  errors: [
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    DBSnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
})) as any;

export type ApplyPendingMaintenanceActionError =
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
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyPendingMaintenanceAction",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
      BackupRetentionPeriod: 0,
      CharacterSetName: 0,
      CopyTagsToSnapshot: 0,
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
      EnableCloudwatchLogsExports: 0,
      DeletionProtection: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      GlobalClusterIdentifier: 0,
      StorageType: 0,
      NetworkType: 0,
    },
    output: { DBCluster: o_DBCluster },
  },
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
 * Creates a new custom endpoint and associates it with an Amazon Neptune DB cluster.
 */
export const createDBClusterEndpoint: API.OperationMethod<
  CreateDBClusterEndpointMessage,
  CreateDBClusterEndpointOutput,
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
      OptionGroupName: 0,
      CharacterSetName: 0,
      PubliclyAccessible: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      DBClusterIdentifier: 0,
      StorageType: 0,
      TdeCredentialArn: 0,
      TdeCredentialPassword: 0,
      StorageEncrypted: 0,
      KmsKeyId: 0,
      Domain: 0,
      CopyTagsToSnapshot: 0,
      MonitoringInterval: 0,
      MonitoringRoleArn: 0,
      DomainIAMRoleName: 0,
      PromotionTier: 0,
      Timezone: 0,
      EnableIAMDatabaseAuthentication: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      EnableCloudwatchLogsExports: 0,
      DeletionProtection: 0,
    },
    output: { DBInstance: o_DBInstance },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      GlobalClusterIdentifier: 0,
      SourceDBClusterIdentifier: 0,
      Engine: 0,
      EngineVersion: 0,
      DeletionProtection: 0,
      DatabaseName: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      StorageEncrypted: 0,
    },
    output: { GlobalCluster: o_GlobalCluster },
  },
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterAlreadyExistsFault,
    GlobalClusterQuotaExceededFault,
    InvalidDBClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlobalCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      SkipFinalSnapshot: 0,
      FinalDBSnapshotIdentifier: 0,
    },
    output: { DBCluster: o_DBCluster },
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
  operationName: "DeleteDBCluster",
})) as any;

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
 * Deletes a specified DB cluster parameter group. The DB cluster parameter group to be
 * deleted can't be associated with any DB clusters.
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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      SkipFinalSnapshot: 0,
      FinalDBSnapshotIdentifier: 0,
    },
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
  operationName: "DeleteDBInstance",
})) as any;

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
  descriptor: { service: svc, input: { DBParameterGroupName: 0 } },
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBParameterGroup",
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
 * Deletes an event notification subscription.
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
 * Deletes a global database. The primary and all secondary clusters must
 * already be detached or deleted first.
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

export type DescribeDBClusterEndpointsError =
  | DBClusterNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      DBClusterIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
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
    },
    output: {
      DBEngineVersions: D.list(
        {
          DefaultCharacterSet: {},
          SupportedCharacterSets: D.list({}, { item: "CharacterSet" }),
          ValidUpgradeTarget: D.list(
            {
              AutoUpgrade: D.bool,
              IsMajorVersionUpgrade: D.bool,
              SupportsGlobalDatabases: D.bool,
            },
            { item: "UpgradeTarget" },
          ),
          SupportedTimezones: D.list({}, { item: "Timezone" }),
          ExportableLogTypes: D.list(),
          SupportsLogExportsToCloudwatchLogs: D.bool,
          SupportsReadReplica: D.bool,
          SupportsGlobalDatabases: D.bool,
        },
        { item: "DBEngineVersion" },
      ),
    },
  },
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

export type DescribeDBParameterGroupsError =
  | DBParameterGroupNotFoundFault
  | CommonErrors;
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

export type DescribeDBSubnetGroupsError =
  | DBSubnetGroupNotFoundFault
  | CommonErrors;
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
 * Returns the default engine and system parameter information for the cluster database
 * engine.
 */
export const describeEngineDefaultClusterParameters: API.OperationMethod<
  DescribeEngineDefaultClusterParametersMessage,
  DescribeEngineDefaultClusterParametersResult,
  DescribeEngineDefaultClusterParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
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
})) as any;

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
 * Displays a list of categories for all event source types, or, if specified, for a
 * specified source type.
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

export type DescribeGlobalClustersError =
  | GlobalClusterNotFoundFault
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { GlobalClusterIdentifier: 0, MaxRecords: 0, Marker: 0 },
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
  descriptor: {
    service: svc,
    input: {
      Engine: 0,
      EngineVersion: 0,
      DBInstanceClass: 0,
      LicenseModel: 0,
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
          SupportsEnhancedMonitoring: D.bool,
          SupportsIAMDatabaseAuthentication: D.bool,
          SupportsPerformanceInsights: D.bool,
          MinStorageSize: D.num,
          MaxStorageSize: D.num,
          MinIopsPerDbInstance: D.num,
          MaxIopsPerDbInstance: D.num,
          MinIopsPerGib: D.num,
          MaxIopsPerGib: D.num,
          SupportsGlobalDatabases: D.bool,
          SupportedNetworkTypes: D.list(),
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
  descriptor: {
    service: svc,
    input: { DBInstanceIdentifier: 0 },
    output: {
      ValidDBInstanceModificationsMessage: {
        Storage: D.list(
          {
            StorageSize: D.list(o_Range, { item: "Range" }),
            ProvisionedIops: D.list(o_Range, { item: "Range" }),
            IopsToStorageRatio: D.list(
              { From: D.num, To: D.num },
              { item: "DoubleRange" },
            ),
          },
          { item: "ValidStorageOptions" },
        ),
      },
    },
  },
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeValidDBInstanceModifications",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceName: 0, Filters: D.list(i_Filter, { item: "Filter" }) },
    output: { TagList: D.list({}, { item: "Tag" }) },
  },
  errors: [
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    DBSnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
      CloudwatchLogsExportConfiguration: i_CloudwatchLogsExportConfiguration,
      EngineVersion: 0,
      AllowMajorVersionUpgrade: 0,
      DBInstanceParameterGroupName: 0,
      DeletionProtection: 0,
      CopyTagsToSnapshot: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      StorageType: 0,
      NetworkType: 0,
    },
    output: { DBCluster: o_DBCluster },
  },
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
})) as any;

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
      OptionGroupName: 0,
      NewDBInstanceIdentifier: 0,
      StorageType: 0,
      TdeCredentialArn: 0,
      TdeCredentialPassword: 0,
      CACertificateIdentifier: 0,
      Domain: 0,
      CopyTagsToSnapshot: 0,
      MonitoringInterval: 0,
      DBPortNumber: 0,
      PubliclyAccessible: 0,
      MonitoringRoleArn: 0,
      DomainIAMRoleName: 0,
      PromotionTier: 0,
      EnableIAMDatabaseAuthentication: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      CloudwatchLogsExportConfiguration: i_CloudwatchLogsExportConfiguration,
      DeletionProtection: 0,
    },
    output: { DBInstance: o_DBInstance },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { DBInstanceIdentifier: 0, ForceFailover: 0 },
    output: { DBInstance: o_DBInstance },
  },
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDBInstance",
})) as any;

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
  descriptor: {
    service: svc,
    input: { GlobalClusterIdentifier: 0, DbClusterIdentifier: 0 },
    output: { GlobalCluster: o_GlobalCluster },
  },
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterNotFoundFault,
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
 * Disassociates an Identity and Access Management (IAM) role from a DB cluster.
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
  descriptor: { service: svc, input: { ResourceName: 0, TagKeys: 0 } },
  errors: [
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    DBSnapshotNotFoundFault,
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
      EnableCloudwatchLogsExports: 0,
      DBClusterParameterGroupName: 0,
      DeletionProtection: 0,
      CopyTagsToSnapshot: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      StorageType: 0,
      NetworkType: 0,
    },
    output: { DBCluster: o_DBCluster },
  },
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
})) as any;

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
      EnableCloudwatchLogsExports: 0,
      DBClusterParameterGroupName: 0,
      DeletionProtection: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      StorageType: 0,
      NetworkType: 0,
    },
    output: { DBCluster: o_DBCluster },
  },
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
})) as any;

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
  operationName: "StartDBCluster",
})) as any;

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
  operationName: "StopDBCluster",
})) as any;

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

const i_CloudwatchLogsExportConfiguration: D.LazyStruct = () => ({
  EnableLogTypes: 0,
  DisableLogTypes: 0,
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
});
const i_ServerlessV2ScalingConfiguration: D.LazyStruct = () => ({
  MinCapacity: 0,
  MaxCapacity: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_DBCluster: D.LazyStruct = () => ({
  AllocatedStorage: D.num,
  AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
  BackupRetentionPeriod: D.num,
  EarliestRestorableTime: D.ts,
  MultiAZ: D.bool,
  LatestRestorableTime: D.ts,
  Port: D.num,
  DBClusterOptionGroupMemberships: D.list({}, { item: "DBClusterOptionGroup" }),
  ReadReplicaIdentifiers: D.list(0, { item: "ReadReplicaIdentifier" }),
  DBClusterMembers: D.list(
    { IsClusterWriter: D.bool, PromotionTier: D.num },
    { item: "DBClusterMember" },
  ),
  VpcSecurityGroups: D.list({}, { item: "VpcSecurityGroupMembership" }),
  StorageEncrypted: D.bool,
  AssociatedRoles: D.list({}, { item: "DBClusterRole" }),
  IAMDatabaseAuthenticationEnabled: D.bool,
  ClusterCreateTime: D.ts,
  CopyTagsToSnapshot: D.bool,
  EnabledCloudwatchLogsExports: D.list(),
  PendingModifiedValues: {
    PendingCloudwatchLogsExports: o_PendingCloudwatchLogsExports,
    IAMDatabaseAuthenticationEnabled: D.bool,
    BackupRetentionPeriod: D.num,
    AllocatedStorage: D.num,
    Iops: D.num,
  },
  DeletionProtection: D.bool,
  CrossAccountClone: D.bool,
  AutomaticRestartTime: D.ts,
  ServerlessV2ScalingConfiguration: { MinCapacity: D.num, MaxCapacity: D.num },
  IOOptimizedNextAllowedModificationTime: D.ts,
});
const o_DBClusterSnapshot: D.LazyStruct = () => ({
  AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
  SnapshotCreateTime: D.ts,
  AllocatedStorage: D.num,
  Port: D.num,
  ClusterCreateTime: D.ts,
  PercentProgress: D.num,
  StorageEncrypted: D.bool,
  IAMDatabaseAuthenticationEnabled: D.bool,
});
const o_DBClusterSnapshotAttributesResult: D.LazyStruct = () => ({
  DBClusterSnapshotAttributes: D.list(
    { AttributeValues: D.list(0, { item: "AttributeValue" }) },
    { item: "DBClusterSnapshotAttribute" },
  ),
});
const o_DBInstance: D.LazyStruct = () => ({
  Endpoint: { Port: D.num },
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
    PendingCloudwatchLogsExports: o_PendingCloudwatchLogsExports,
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
  OptionGroupMemberships: D.list({}, { item: "OptionGroupMembership" }),
  PubliclyAccessible: D.bool,
  StatusInfos: D.list({ Normal: D.bool }, { item: "DBInstanceStatusInfo" }),
  DbInstancePort: D.num,
  StorageEncrypted: D.bool,
  DomainMemberships: D.list({}, { item: "DomainMembership" }),
  CopyTagsToSnapshot: D.bool,
  MonitoringInterval: D.num,
  PromotionTier: D.num,
  IAMDatabaseAuthenticationEnabled: D.bool,
  PerformanceInsightsEnabled: D.bool,
  EnabledCloudwatchLogsExports: D.list(),
  DeletionProtection: D.bool,
});
const o_DBSubnetGroup: D.LazyStruct = () => ({
  Subnets: D.list({ SubnetAvailabilityZone: {} }, { item: "Subnet" }),
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
const o_Parameter: D.LazyStruct = () => ({ IsModifiable: D.bool });
const o_Range: D.LazyStruct = () => ({ From: D.num, To: D.num, Step: D.num });
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
const o_PendingCloudwatchLogsExports: D.LazyStruct = () => ({
  LogTypesToEnable: D.list(),
  LogTypesToDisable: D.list(),
});
