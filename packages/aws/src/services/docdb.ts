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
  sdkId: "DocDB",
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
export class NetworkTypeNotSupported
  extends /*@__PURE__*/ TE.TaggedError(
    "NetworkTypeNotSupported",
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
  descriptor: {
    service: svc,
    input: {
      AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
      BackupRetentionPeriod: 0,
      DBClusterIdentifier: 0,
      DBClusterParameterGroupName: 0,
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      DBSubnetGroupName: 0,
      Engine: 0,
      EngineVersion: 0,
      Port: 0,
      MasterUsername: 0,
      MasterUserPassword: 0,
      PreferredBackupWindow: 0,
      PreferredMaintenanceWindow: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      StorageEncrypted: 0,
      KmsKeyId: 0,
      PreSignedUrl: 0,
      EnableCloudwatchLogsExports: 0,
      DeletionProtection: 0,
      GlobalClusterIdentifier: 0,
      StorageType: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      ManageMasterUserPassword: 0,
      MasterUserSecretKmsKeyId: 0,
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
    NetworkTypeNotSupported,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBCluster",
})) as any;

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
 * Creates a snapshot of a cluster.
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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      DBInstanceClass: 0,
      Engine: 0,
      AvailabilityZone: 0,
      PreferredMaintenanceWindow: 0,
      AutoMinorVersionUpgrade: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      DBClusterIdentifier: 0,
      CopyTagsToSnapshot: 0,
      PromotionTier: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      CACertificateIdentifier: 0,
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
})) as any;

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
 * Creates an Amazon DocumentDB global cluster that can span multiple multiple Amazon Web Services Regions.
 * The global cluster contains one primary cluster with read-write capability, and up-to 10 read-only secondary clusters. Global clusters uses storage-based fast replication across regions with latencies less than one second, using dedicated infrastructure with no impact to your workload’s performance.
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
  descriptor: {
    service: svc,
    input: {
      GlobalClusterIdentifier: 0,
      SourceDBClusterIdentifier: 0,
      Engine: 0,
      EngineVersion: 0,
      DeletionProtection: 0,
      DatabaseName: 0,
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
 * Deletes a previously provisioned cluster. When you delete a cluster, all automated backups for that cluster are deleted and can't be recovered. Manual DB cluster snapshots of the specified cluster are not deleted.
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
 * Deletes a previously provisioned instance.
 */
export const deleteDBInstance: API.OperationMethod<
  DeleteDBInstanceMessage,
  DeleteDBInstanceResult,
  DeleteDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DBInstanceIdentifier: 0 },
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
 * Deletes an Amazon DocumentDB event notification subscription.
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
  descriptor: {
    service: svc,
    input: {
      CertificateIdentifier: 0,
      Filters: D.list(i_Filter, { item: "Filter" }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      Certificates: D.list(
        { ValidFrom: D.ts, ValidTill: D.ts },
        { item: "Certificate" },
      ),
    },
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

export type DescribeDBClusterParameterGroupsError =
  | DBParameterGroupNotFoundFault
  | CommonErrors;
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
 * Returns information about cluster snapshots. This API operation supports pagination.
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
 * Returns a list of the available engines.
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
          ValidUpgradeTarget: D.list(
            { AutoUpgrade: D.bool, IsMajorVersionUpgrade: D.bool },
            { item: "UpgradeTarget" },
          ),
          ExportableLogTypes: D.list(),
          SupportsLogExportsToCloudwatchLogs: D.bool,
          SupportedCACertificateIdentifiers: D.list(),
          SupportsCertificateRotationWithoutRestart: D.bool,
          ServerlessV2FeaturesSupport: {
            MinCapacity: D.num,
            MaxCapacity: D.num,
          },
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
 * Returns information about provisioned Amazon DocumentDB instances. This API supports pagination.
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

export type DescribeDBSubnetGroupsError =
  | DBSubnetGroupNotFoundFault
  | CommonErrors;
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
    output: {
      EngineDefaults: {
        Parameters: D.list(o_Parameter, { item: "Parameter" }),
      },
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineDefaultClusterParameters",
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
 * Returns events related to instances, security groups, snapshots, and DB parameter groups for the past 14 days. You can obtain events specific to a particular DB instance, security group, snapshot, or parameter group by providing the name as a parameter. By default, the events of the past hour are returned.
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

export type DescribeGlobalClustersError =
  | GlobalClusterNotFoundFault
  | CommonErrors;
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
          Vpc: D.bool,
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
 * Lists all tags on an Amazon DocumentDB resource.
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
      PreferredBackupWindow: 0,
      PreferredMaintenanceWindow: 0,
      CloudwatchLogsExportConfiguration: {
        EnableLogTypes: 0,
        DisableLogTypes: 0,
      },
      EngineVersion: 0,
      AllowMajorVersionUpgrade: 0,
      DeletionProtection: 0,
      StorageType: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      ManageMasterUserPassword: 0,
      MasterUserSecretKmsKeyId: 0,
      RotateMasterUserPassword: 0,
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
    NetworkTypeNotSupported,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DBInstanceIdentifier: 0,
      DBInstanceClass: 0,
      ApplyImmediately: 0,
      PreferredMaintenanceWindow: 0,
      AutoMinorVersionUpgrade: 0,
      NewDBInstanceIdentifier: 0,
      CACertificateIdentifier: 0,
      CopyTagsToSnapshot: 0,
      PromotionTier: 0,
      EnablePerformanceInsights: 0,
      PerformanceInsightsKMSKeyId: 0,
      CertificateRotationRestart: 0,
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
})) as any;

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
 * Modifies an existing Amazon DocumentDB event notification subscription.
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
  descriptor: {
    service: svc,
    input: {
      GlobalClusterIdentifier: 0,
      NewGlobalClusterIdentifier: 0,
      DeletionProtection: 0,
    },
    output: { GlobalCluster: o_GlobalCluster },
  },
  errors: [GlobalClusterNotFoundFault, InvalidGlobalClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyGlobalCluster",
})) as any;

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
 * Removes metadata tags from an Amazon DocumentDB resource.
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
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      Tags: D.list(i_Tag, { item: "Tag" }),
      KmsKeyId: 0,
      EnableCloudwatchLogsExports: 0,
      DeletionProtection: 0,
      DBClusterParameterGroupName: 0,
      ServerlessV2ScalingConfiguration: i_ServerlessV2ScalingConfiguration,
      StorageType: 0,
      NetworkType: 0,
    },
    output: { DBCluster: o_DBCluster },
  },
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
})) as any;

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
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      Tags: D.list(i_Tag, { item: "Tag" }),
      KmsKeyId: 0,
      EnableCloudwatchLogsExports: 0,
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
})) as any;

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
 * Switches over the specified secondary Amazon DocumentDB cluster to be the new primary Amazon DocumentDB cluster in the global database cluster.
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
  AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
  BackupRetentionPeriod: D.num,
  EarliestRestorableTime: D.ts,
  MultiAZ: D.bool,
  LatestRestorableTime: D.ts,
  Port: D.num,
  ReadReplicaIdentifiers: D.list(0, { item: "ReadReplicaIdentifier" }),
  DBClusterMembers: D.list(
    { IsClusterWriter: D.bool, PromotionTier: D.num },
    { item: "DBClusterMember" },
  ),
  VpcSecurityGroups: D.list({}, { item: "VpcSecurityGroupMembership" }),
  StorageEncrypted: D.bool,
  AssociatedRoles: D.list({}, { item: "DBClusterRole" }),
  ClusterCreateTime: D.ts,
  EnabledCloudwatchLogsExports: D.list(),
  DeletionProtection: D.bool,
  IOOptimizedNextAllowedModificationTime: D.ts,
  ServerlessV2ScalingConfiguration: { MinCapacity: D.num, MaxCapacity: D.num },
  MasterUserSecret: {},
});
const o_DBClusterSnapshot: D.LazyStruct = () => ({
  AvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
  SnapshotCreateTime: D.ts,
  Port: D.num,
  ClusterCreateTime: D.ts,
  PercentProgress: D.num,
  StorageEncrypted: D.bool,
});
const o_DBClusterSnapshotAttributesResult: D.LazyStruct = () => ({
  DBClusterSnapshotAttributes: D.list(
    { AttributeValues: D.list(0, { item: "AttributeValue" }) },
    { item: "DBClusterSnapshotAttribute" },
  ),
});
const o_DBInstance: D.LazyStruct = () => ({
  Endpoint: { Port: D.num },
  InstanceCreateTime: D.ts,
  BackupRetentionPeriod: D.num,
  VpcSecurityGroups: D.list({}, { item: "VpcSecurityGroupMembership" }),
  DBSubnetGroup: o_DBSubnetGroup,
  PendingModifiedValues: {
    AllocatedStorage: D.num,
    MasterUserPassword: D.secret,
    Port: D.num,
    BackupRetentionPeriod: D.num,
    MultiAZ: D.bool,
    Iops: D.num,
    PendingCloudwatchLogsExports: {
      LogTypesToEnable: D.list(),
      LogTypesToDisable: D.list(),
    },
  },
  LatestRestorableTime: D.ts,
  AutoMinorVersionUpgrade: D.bool,
  PubliclyAccessible: D.bool,
  StatusInfos: D.list({ Normal: D.bool }, { item: "DBInstanceStatusInfo" }),
  StorageEncrypted: D.bool,
  CopyTagsToSnapshot: D.bool,
  PromotionTier: D.num,
  EnabledCloudwatchLogsExports: D.list(),
  CertificateDetails: { ValidTill: D.ts },
  PerformanceInsightsEnabled: D.bool,
});
const o_DBSubnetGroup: D.LazyStruct = () => ({
  Subnets: D.list({ SubnetAvailabilityZone: {} }, { item: "Subnet" }),
  SupportedNetworkTypes: D.list(),
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
