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
  sdkId: "ElastiCache",
  target: "AmazonElastiCacheV9",
  version: "2015-02-02",
  sigv4: "elasticache",
  protocol: awsQueryProtocol,
  xmlns: "http://elasticache.amazonaws.com/doc/2015-02-02/",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://elasticache.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://elasticache.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class APICallRateForCustomerExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "APICallRateForCustomerExceededFault",
    ["BadRequestError"],
    { code: "APICallRateForCustomerExceeded", status: 400 },
  )<{ readonly message?: string }> {}
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
export class CacheClusterAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheClusterAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "CacheClusterAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class CacheClusterNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheClusterNotFoundFault",
    ["BadRequestError"],
    { code: "CacheClusterNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class CacheParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheParameterGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "CacheParameterGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class CacheParameterGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheParameterGroupNotFoundFault",
    ["BadRequestError"],
    { code: "CacheParameterGroupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class CacheParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheParameterGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "CacheParameterGroupQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class CacheSecurityGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheSecurityGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "CacheSecurityGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class CacheSecurityGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheSecurityGroupNotFoundFault",
    ["BadRequestError"],
    { code: "CacheSecurityGroupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class CacheSecurityGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheSecurityGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "QuotaExceeded.CacheSecurityGroup", status: 400 },
  )<{ readonly message?: string }> {}
export class CacheSubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheSubnetGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "CacheSubnetGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class CacheSubnetGroupInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheSubnetGroupInUse",
    ["BadRequestError", "DependencyViolationError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CacheSubnetGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheSubnetGroupNotFoundFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CacheSubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheSubnetGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "CacheSubnetGroupQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class CacheSubnetQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CacheSubnetQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterQuotaForCustomerExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterQuotaForCustomerExceededFault",
    ["BadRequestError"],
    { code: "ClusterQuotaForCustomerExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class DefaultUserAssociatedToUserGroupFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DefaultUserAssociatedToUserGroupFault",
    ["BadRequestError"],
    { code: "DefaultUserAssociatedToUserGroup", status: 400 },
  )<{ readonly message?: string }> {}
export class DefaultUserRequired
  extends /*@__PURE__*/ TE.TaggedError(
    "DefaultUserRequired",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DuplicateUserNameFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateUserNameFault",
    ["BadRequestError"],
    { code: "DuplicateUserName", status: 400 },
  )<{ readonly message?: string }> {}
export class GlobalReplicationGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "GlobalReplicationGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class GlobalReplicationGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "GlobalReplicationGroupNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class InsufficientCacheClusterCapacityFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientCacheClusterCapacityFault",
    ["BadRequestError"],
    { code: "InsufficientCacheClusterCapacity", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidARNFault
  extends /*@__PURE__*/ TE.TaggedError("InvalidARNFault", ["BadRequestError"], {
    code: "InvalidARN",
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidCacheClusterStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCacheClusterStateFault",
    ["BadRequestError"],
    { code: "InvalidCacheClusterState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidCacheParameterGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCacheParameterGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidCacheParameterGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidCacheSecurityGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCacheSecurityGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidCacheSecurityGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidCredentialsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCredentialsException",
    ["TimeoutError"],
    { status: 408 },
  )<{ readonly message?: string }> {}
export class InvalidGlobalReplicationGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidGlobalReplicationGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidGlobalReplicationGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidKMSKeyFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidKMSKeyFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterCombinationException",
    ["BadRequestError"],
    { code: "InvalidParameterCombination", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { code: "InvalidParameterValue", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidReplicationGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidReplicationGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidReplicationGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidServerlessCacheSnapshotStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidServerlessCacheSnapshotStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidServerlessCacheStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidServerlessCacheStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSnapshotStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSnapshotStateFault",
    ["BadRequestError"],
    { code: "InvalidSnapshotState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSubnet
  extends /*@__PURE__*/ TE.TaggedError("InvalidSubnet", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidUserGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidUserGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidUserGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidUserStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidUserStateFault",
    ["BadRequestError"],
    { code: "InvalidUserState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidVPCNetworkStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidVPCNetworkStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NodeGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "NodeGroupNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NodeGroupsPerReplicationGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "NodeGroupsPerReplicationGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "NodeGroupsPerReplicationGroupQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class NodeQuotaForClusterExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "NodeQuotaForClusterExceededFault",
    ["BadRequestError"],
    { code: "NodeQuotaForClusterExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class NodeQuotaForCustomerExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "NodeQuotaForCustomerExceededFault",
    ["BadRequestError"],
    { code: "NodeQuotaForCustomerExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class NoOperationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "NoOperationFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ReplicationGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReplicationGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ReplicationGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ReplicationGroupAlreadyUnderMigrationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReplicationGroupAlreadyUnderMigrationFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ReplicationGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReplicationGroupNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ReplicationGroupNotUnderMigrationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReplicationGroupNotUnderMigrationFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ReservedCacheNodeAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedCacheNodeAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ReservedCacheNodeAlreadyExists", status: 404 },
  )<{ readonly message?: string }> {}
export class ReservedCacheNodeNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedCacheNodeNotFoundFault",
    ["BadRequestError"],
    { code: "ReservedCacheNodeNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ReservedCacheNodeQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedCacheNodeQuotaExceededFault",
    ["BadRequestError"],
    { code: "ReservedCacheNodeQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ReservedCacheNodesOfferingNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedCacheNodesOfferingNotFoundFault",
    ["BadRequestError"],
    { code: "ReservedCacheNodesOfferingNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ServerlessCacheAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ServerlessCacheAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServerlessCacheNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ServerlessCacheNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServerlessCacheQuotaForCustomerExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ServerlessCacheQuotaForCustomerExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServerlessCacheSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ServerlessCacheSnapshotAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServerlessCacheSnapshotNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ServerlessCacheSnapshotNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServerlessCacheSnapshotQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ServerlessCacheSnapshotQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceLinkedRoleNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceLinkedRoleNotFoundFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceUpdateNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUpdateNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class SnapshotAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotFeatureNotSupportedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotFeatureNotSupportedFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class SnapshotQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SubnetInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetInUse",
    ["BadRequestError", "DependencyViolationError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SubnetNotAllowedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetNotAllowedFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TagNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "TagNotFoundFault",
    ["BadRequestError"],
    { code: "TagNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class TagQuotaPerResourceExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "TagQuotaPerResourceExceeded",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TestFailoverNotAvailableFault
  extends /*@__PURE__*/ TE.TaggedError(
    "TestFailoverNotAvailableFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UserAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UserAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "UserAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class UserGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UserGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "UserGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class UserGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UserGroupNotFoundFault",
    ["BadRequestError"],
    { code: "UserGroupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class UserGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UserGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "UserGroupQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class UserNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UserNotFoundFault",
    ["BadRequestError"],
    { code: "UserNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class UserQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UserQuotaExceededFault",
    ["BadRequestError"],
    { code: "UserQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface AddTagsToResourceMessage {
  ResourceName?: string;
  Tags?: Tag[];
}
export interface TagListMessage {
  TagList?: Tag[];
}
export interface AuthorizeCacheSecurityGroupIngressMessage {
  CacheSecurityGroupName?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export interface EC2SecurityGroup {
  Status?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export type EC2SecurityGroupList = EC2SecurityGroup[];
export interface CacheSecurityGroup {
  OwnerId?: string;
  CacheSecurityGroupName?: string;
  Description?: string;
  EC2SecurityGroups?: EC2SecurityGroup[];
  ARN?: string;
}
export interface AuthorizeCacheSecurityGroupIngressResult {
  CacheSecurityGroup?: CacheSecurityGroup;
}
export type ReplicationGroupIdList = string[];
export type CacheClusterIdList = string[];
export interface BatchApplyUpdateActionMessage {
  ReplicationGroupIds?: string[];
  CacheClusterIds?: string[];
  ServiceUpdateName?: string;
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
  ReplicationGroupId?: string;
  CacheClusterId?: string;
  ServiceUpdateName?: string;
  UpdateActionStatus?: UpdateActionStatus;
}
export type ProcessedUpdateActionList = ProcessedUpdateAction[];
export interface UnprocessedUpdateAction {
  ReplicationGroupId?: string;
  CacheClusterId?: string;
  ServiceUpdateName?: string;
  ErrorType?: string;
  ErrorMessage?: string;
}
export type UnprocessedUpdateActionList = UnprocessedUpdateAction[];
export interface UpdateActionResultsMessage {
  ProcessedUpdateActions?: ProcessedUpdateAction[];
  UnprocessedUpdateActions?: UnprocessedUpdateAction[];
}
export interface BatchStopUpdateActionMessage {
  ReplicationGroupIds?: string[];
  CacheClusterIds?: string[];
  ServiceUpdateName?: string;
}
export interface CompleteMigrationMessage {
  ReplicationGroupId?: string;
  Force?: boolean;
}
export interface GlobalReplicationGroupInfo {
  GlobalReplicationGroupId?: string;
  GlobalReplicationGroupMemberRole?: string;
}
export type PendingAutomaticFailoverStatus =
  | "enabled"
  | "disabled"
  | (string & {});
export interface SlotMigration {
  ProgressPercentage?: number;
}
export interface ReshardingStatus {
  SlotMigration?: SlotMigration;
}
export type AuthTokenUpdateStatus = "SETTING" | "ROTATING" | (string & {});
export type UserGroupId = string;
export type UserGroupIdList = string[];
export interface UserGroupsUpdateStatus {
  UserGroupIdsToAdd?: string[];
  UserGroupIdsToRemove?: string[];
}
export type LogType = "slow-log" | "engine-log" | (string & {});
export type DestinationType =
  | "cloudwatch-logs"
  | "kinesis-firehose"
  | (string & {});
export interface CloudWatchLogsDestinationDetails {
  LogGroup?: string;
}
export interface KinesisFirehoseDestinationDetails {
  DeliveryStream?: string;
}
export interface DestinationDetails {
  CloudWatchLogsDetails?: CloudWatchLogsDestinationDetails;
  KinesisFirehoseDetails?: KinesisFirehoseDestinationDetails;
}
export type LogFormat = "text" | "json" | (string & {});
export interface PendingLogDeliveryConfiguration {
  LogType?: LogType;
  DestinationType?: DestinationType;
  DestinationDetails?: DestinationDetails;
  LogFormat?: LogFormat;
}
export type PendingLogDeliveryConfigurationList =
  PendingLogDeliveryConfiguration[];
export type TransitEncryptionMode = "preferred" | "required" | (string & {});
export type ClusterMode = "enabled" | "disabled" | "compatible" | (string & {});
export interface ReplicationGroupPendingModifiedValues {
  PrimaryClusterId?: string;
  AutomaticFailoverStatus?: PendingAutomaticFailoverStatus;
  Resharding?: ReshardingStatus;
  AuthTokenStatus?: AuthTokenUpdateStatus;
  UserGroups?: UserGroupsUpdateStatus;
  LogDeliveryConfigurations?: PendingLogDeliveryConfiguration[];
  TransitEncryptionEnabled?: boolean;
  TransitEncryptionMode?: TransitEncryptionMode;
  ClusterMode?: ClusterMode;
}
export type ClusterIdList = string[];
export interface Endpoint {
  Address?: string;
  Port?: number;
}
export interface NodeGroupMember {
  CacheClusterId?: string;
  CacheNodeId?: string;
  ReadEndpoint?: Endpoint;
  PreferredAvailabilityZone?: string;
  PreferredOutpostArn?: string;
  CurrentRole?: string;
}
export type NodeGroupMemberList = NodeGroupMember[];
export interface NodeGroup {
  NodeGroupId?: string;
  Status?: string;
  PrimaryEndpoint?: Endpoint;
  ReaderEndpoint?: Endpoint;
  Slots?: string;
  NodeGroupMembers?: NodeGroupMember[];
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
export type StorageEncryptionType =
  | "none"
  | "sse-elasticache"
  | "sse-kms"
  | (string & {});
export type LogDeliveryConfigurationStatus =
  | "active"
  | "enabling"
  | "modifying"
  | "disabling"
  | "error"
  | (string & {});
export interface LogDeliveryConfiguration {
  LogType?: LogType;
  DestinationType?: DestinationType;
  DestinationDetails?: DestinationDetails;
  LogFormat?: LogFormat;
  Status?: LogDeliveryConfigurationStatus;
  Message?: string;
}
export type LogDeliveryConfigurationList = LogDeliveryConfiguration[];
export type DataTieringStatus = "enabled" | "disabled" | (string & {});
export type NetworkType = "ipv4" | "ipv6" | "dual_stack" | (string & {});
export type IpDiscovery = "ipv4" | "ipv6" | (string & {});
export type Durability =
  | "default"
  | "async"
  | "sync"
  | "disabled"
  | (string & {});
export type EffectiveDurability = "async" | "sync" | "disabled" | (string & {});
export interface ReplicationGroup {
  ReplicationGroupId?: string;
  Description?: string;
  GlobalReplicationGroupInfo?: GlobalReplicationGroupInfo;
  Status?: string;
  PendingModifiedValues?: ReplicationGroupPendingModifiedValues;
  MemberClusters?: string[];
  NodeGroups?: NodeGroup[];
  SnapshottingClusterId?: string;
  AutomaticFailover?: AutomaticFailoverStatus;
  MultiAZ?: MultiAZStatus;
  ConfigurationEndpoint?: Endpoint;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  ClusterEnabled?: boolean;
  CacheNodeType?: string;
  AuthTokenEnabled?: boolean;
  AuthTokenLastModifiedDate?: Date;
  TransitEncryptionEnabled?: boolean;
  AtRestEncryptionEnabled?: boolean;
  MemberClustersOutpostArns?: string[];
  KmsKeyId?: string;
  StorageEncryptionType?: StorageEncryptionType;
  ARN?: string;
  UserGroupIds?: string[];
  LogDeliveryConfigurations?: LogDeliveryConfiguration[];
  ReplicationGroupCreateTime?: Date;
  DataTiering?: DataTieringStatus;
  AutoMinorVersionUpgrade?: boolean;
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
  TransitEncryptionMode?: TransitEncryptionMode;
  ClusterMode?: ClusterMode;
  Engine?: string;
  Durability?: Durability;
  EffectiveDurability?: EffectiveDurability;
}
export interface CompleteMigrationResponse {
  ReplicationGroup?: ReplicationGroup;
}
export interface CopyServerlessCacheSnapshotRequest {
  SourceServerlessCacheSnapshotName?: string;
  TargetServerlessCacheSnapshotName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export interface ServerlessCacheConfiguration {
  ServerlessCacheName?: string;
  Engine?: string;
  MajorEngineVersion?: string;
}
export interface ServerlessCacheSnapshot {
  ServerlessCacheSnapshotName?: string;
  ARN?: string;
  KmsKeyId?: string;
  SnapshotType?: string;
  Status?: string;
  CreateTime?: Date;
  ExpiryTime?: Date;
  BytesUsedForCache?: string;
  ServerlessCacheConfiguration?: ServerlessCacheConfiguration;
}
export interface CopyServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot;
}
export interface CopySnapshotMessage {
  SourceSnapshotName?: string;
  TargetSnapshotName?: string;
  TargetBucket?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export type AllowedNodeGroupId = string;
export type AvailabilityZonesList = string[];
export type OutpostArnsList = string[];
export interface NodeGroupConfiguration {
  NodeGroupId?: string;
  Slots?: string;
  ReplicaCount?: number;
  PrimaryAvailabilityZone?: string;
  ReplicaAvailabilityZones?: string[];
  PrimaryOutpostArn?: string;
  ReplicaOutpostArns?: string[];
}
export interface NodeSnapshot {
  CacheClusterId?: string;
  NodeGroupId?: string;
  CacheNodeId?: string;
  NodeGroupConfiguration?: NodeGroupConfiguration;
  CacheSize?: string;
  CacheNodeCreateTime?: Date;
  SnapshotCreateTime?: Date;
}
export type NodeSnapshotList = NodeSnapshot[];
export interface Snapshot {
  SnapshotName?: string;
  ReplicationGroupId?: string;
  ReplicationGroupDescription?: string;
  CacheClusterId?: string;
  SnapshotStatus?: string;
  SnapshotSource?: string;
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  NumCacheNodes?: number;
  PreferredAvailabilityZone?: string;
  PreferredOutpostArn?: string;
  CacheClusterCreateTime?: Date;
  PreferredMaintenanceWindow?: string;
  TopicArn?: string;
  Port?: number;
  CacheParameterGroupName?: string;
  CacheSubnetGroupName?: string;
  VpcId?: string;
  AutoMinorVersionUpgrade?: boolean;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  NumNodeGroups?: number;
  AutomaticFailover?: AutomaticFailoverStatus;
  NodeSnapshots?: NodeSnapshot[];
  KmsKeyId?: string;
  ARN?: string;
  DataTiering?: DataTieringStatus;
  Durability?: Durability;
}
export interface CopySnapshotResult {
  Snapshot?: Snapshot;
}
export type AZMode = "single-az" | "cross-az" | (string & {});
export type PreferredAvailabilityZoneList = string[];
export type CacheSecurityGroupNameList = string[];
export type SecurityGroupIdsList = string[];
export type SnapshotArnsList = string[];
export type OutpostMode = "single-outpost" | "cross-outpost" | (string & {});
export type PreferredOutpostArnList = string[];
export interface LogDeliveryConfigurationRequest {
  LogType?: LogType;
  DestinationType?: DestinationType;
  DestinationDetails?: DestinationDetails;
  LogFormat?: LogFormat;
  Enabled?: boolean;
}
export type LogDeliveryConfigurationRequestList =
  LogDeliveryConfigurationRequest[];
export interface CreateCacheClusterMessage {
  CacheClusterId?: string;
  ReplicationGroupId?: string;
  AZMode?: AZMode;
  PreferredAvailabilityZone?: string;
  PreferredAvailabilityZones?: string[];
  NumCacheNodes?: number;
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  CacheParameterGroupName?: string;
  CacheSubnetGroupName?: string;
  CacheSecurityGroupNames?: string[];
  SecurityGroupIds?: string[];
  Tags?: Tag[];
  SnapshotArns?: string[];
  SnapshotName?: string;
  PreferredMaintenanceWindow?: string;
  Port?: number;
  NotificationTopicArn?: string;
  AutoMinorVersionUpgrade?: boolean;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  AuthToken?: string | redacted.Redacted<string>;
  OutpostMode?: OutpostMode;
  PreferredOutpostArn?: string;
  PreferredOutpostArns?: string[];
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  TransitEncryptionEnabled?: boolean;
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
}
export type CacheNodeIdsList = string[];
export interface ScaleConfig {
  ScalePercentage?: number;
  ScaleIntervalMinutes?: number;
}
export interface PendingModifiedValues {
  NumCacheNodes?: number;
  CacheNodeIdsToRemove?: string[];
  EngineVersion?: string;
  CacheNodeType?: string;
  AuthTokenStatus?: AuthTokenUpdateStatus;
  LogDeliveryConfigurations?: PendingLogDeliveryConfiguration[];
  TransitEncryptionEnabled?: boolean;
  TransitEncryptionMode?: TransitEncryptionMode;
  ScaleConfig?: ScaleConfig;
}
export interface NotificationConfiguration {
  TopicArn?: string;
  TopicStatus?: string;
}
export interface CacheSecurityGroupMembership {
  CacheSecurityGroupName?: string;
  Status?: string;
}
export type CacheSecurityGroupMembershipList = CacheSecurityGroupMembership[];
export interface CacheParameterGroupStatus {
  CacheParameterGroupName?: string;
  ParameterApplyStatus?: string;
  CacheNodeIdsToReboot?: string[];
}
export interface CacheNode {
  CacheNodeId?: string;
  CacheNodeStatus?: string;
  CacheNodeCreateTime?: Date;
  Endpoint?: Endpoint;
  ParameterGroupStatus?: string;
  SourceCacheNodeId?: string;
  CustomerAvailabilityZone?: string;
  CustomerOutpostArn?: string;
}
export type CacheNodeList = CacheNode[];
export interface SecurityGroupMembership {
  SecurityGroupId?: string;
  Status?: string;
}
export type SecurityGroupMembershipList = SecurityGroupMembership[];
export interface CacheCluster {
  CacheClusterId?: string;
  ConfigurationEndpoint?: Endpoint;
  ClientDownloadLandingPage?: string;
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  CacheClusterStatus?: string;
  NumCacheNodes?: number;
  PreferredAvailabilityZone?: string;
  PreferredOutpostArn?: string;
  CacheClusterCreateTime?: Date;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: PendingModifiedValues;
  NotificationConfiguration?: NotificationConfiguration;
  CacheSecurityGroups?: CacheSecurityGroupMembership[];
  CacheParameterGroup?: CacheParameterGroupStatus;
  CacheSubnetGroupName?: string;
  CacheNodes?: CacheNode[];
  AutoMinorVersionUpgrade?: boolean;
  SecurityGroups?: SecurityGroupMembership[];
  ReplicationGroupId?: string;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  AuthTokenEnabled?: boolean;
  AuthTokenLastModifiedDate?: Date;
  TransitEncryptionEnabled?: boolean;
  AtRestEncryptionEnabled?: boolean;
  ARN?: string;
  ReplicationGroupLogDeliveryEnabled?: boolean;
  LogDeliveryConfigurations?: LogDeliveryConfiguration[];
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
  TransitEncryptionMode?: TransitEncryptionMode;
}
export interface CreateCacheClusterResult {
  CacheCluster?: CacheCluster;
}
export interface CreateCacheParameterGroupMessage {
  CacheParameterGroupName?: string;
  CacheParameterGroupFamily?: string;
  Description?: string;
  Tags?: Tag[];
}
export interface CacheParameterGroup {
  CacheParameterGroupName?: string;
  CacheParameterGroupFamily?: string;
  Description?: string;
  IsGlobal?: boolean;
  ARN?: string;
}
export interface CreateCacheParameterGroupResult {
  CacheParameterGroup?: CacheParameterGroup;
}
export interface CreateCacheSecurityGroupMessage {
  CacheSecurityGroupName?: string;
  Description?: string;
  Tags?: Tag[];
}
export interface CreateCacheSecurityGroupResult {
  CacheSecurityGroup?: CacheSecurityGroup;
}
export type SubnetIdentifierList = string[];
export interface CreateCacheSubnetGroupMessage {
  CacheSubnetGroupName?: string;
  CacheSubnetGroupDescription?: string;
  SubnetIds?: string[];
  Tags?: Tag[];
}
export interface AvailabilityZone {
  Name?: string;
}
export interface SubnetOutpost {
  SubnetOutpostArn?: string;
}
export type NetworkTypeList = NetworkType[];
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AvailabilityZone;
  SubnetOutpost?: SubnetOutpost;
  SupportedNetworkTypes?: NetworkType[];
}
export type SubnetList = Subnet[];
export interface CacheSubnetGroup {
  CacheSubnetGroupName?: string;
  CacheSubnetGroupDescription?: string;
  VpcId?: string;
  Subnets?: Subnet[];
  ARN?: string;
  SupportedNetworkTypes?: NetworkType[];
}
export interface CreateCacheSubnetGroupResult {
  CacheSubnetGroup?: CacheSubnetGroup;
}
export interface CreateGlobalReplicationGroupMessage {
  GlobalReplicationGroupIdSuffix?: string;
  GlobalReplicationGroupDescription?: string;
  PrimaryReplicationGroupId?: string;
}
export interface GlobalReplicationGroupMember {
  ReplicationGroupId?: string;
  ReplicationGroupRegion?: string;
  Role?: string;
  AutomaticFailover?: AutomaticFailoverStatus;
  Status?: string;
}
export type GlobalReplicationGroupMemberList = GlobalReplicationGroupMember[];
export interface GlobalNodeGroup {
  GlobalNodeGroupId?: string;
  Slots?: string;
}
export type GlobalNodeGroupList = GlobalNodeGroup[];
export interface GlobalReplicationGroup {
  GlobalReplicationGroupId?: string;
  GlobalReplicationGroupDescription?: string;
  Status?: string;
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  Members?: GlobalReplicationGroupMember[];
  ClusterEnabled?: boolean;
  GlobalNodeGroups?: GlobalNodeGroup[];
  AuthTokenEnabled?: boolean;
  TransitEncryptionEnabled?: boolean;
  AtRestEncryptionEnabled?: boolean;
  ARN?: string;
}
export interface CreateGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export type NodeGroupConfigurationList = NodeGroupConfiguration[];
export type UserGroupIdListInput = string[];
export interface CreateReplicationGroupMessage {
  ReplicationGroupId?: string;
  ReplicationGroupDescription?: string;
  GlobalReplicationGroupId?: string;
  PrimaryClusterId?: string;
  AutomaticFailoverEnabled?: boolean;
  MultiAZEnabled?: boolean;
  NumCacheClusters?: number;
  PreferredCacheClusterAZs?: string[];
  NumNodeGroups?: number;
  ReplicasPerNodeGroup?: number;
  NodeGroupConfiguration?: NodeGroupConfiguration[];
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  CacheParameterGroupName?: string;
  CacheSubnetGroupName?: string;
  CacheSecurityGroupNames?: string[];
  SecurityGroupIds?: string[];
  Tags?: Tag[];
  SnapshotArns?: string[];
  SnapshotName?: string;
  PreferredMaintenanceWindow?: string;
  Port?: number;
  NotificationTopicArn?: string;
  AutoMinorVersionUpgrade?: boolean;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  AuthToken?: string | redacted.Redacted<string>;
  TransitEncryptionEnabled?: boolean;
  AtRestEncryptionEnabled?: boolean;
  KmsKeyId?: string;
  UserGroupIds?: string[];
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  DataTieringEnabled?: boolean;
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
  TransitEncryptionMode?: TransitEncryptionMode;
  ClusterMode?: ClusterMode;
  ServerlessCacheSnapshotName?: string;
  Durability?: Durability;
}
export interface CreateReplicationGroupResult {
  ReplicationGroup?: ReplicationGroup;
}
export type DataStorageUnit = "GB" | (string & {});
export interface DataStorage {
  Maximum?: number;
  Minimum?: number;
  Unit?: DataStorageUnit;
}
export interface ECPUPerSecond {
  Maximum?: number;
  Minimum?: number;
}
export interface CacheUsageLimits {
  DataStorage?: DataStorage;
  ECPUPerSecond?: ECPUPerSecond;
}
export type SubnetIdsList = string[];
export interface CreateServerlessCacheRequest {
  ServerlessCacheName?: string;
  Description?: string;
  Engine?: string;
  MajorEngineVersion?: string;
  CacheUsageLimits?: CacheUsageLimits;
  KmsKeyId?: string;
  SecurityGroupIds?: string[];
  SnapshotArnsToRestore?: string[];
  Tags?: Tag[];
  UserGroupId?: string;
  SubnetIds?: string[];
  SnapshotRetentionLimit?: number;
  DailySnapshotTime?: string;
  NetworkType?: NetworkType;
}
export interface ServerlessCache {
  ServerlessCacheName?: string;
  Description?: string;
  CreateTime?: Date;
  Status?: string;
  Engine?: string;
  MajorEngineVersion?: string;
  FullEngineVersion?: string;
  CacheUsageLimits?: CacheUsageLimits;
  KmsKeyId?: string;
  StorageEncryptionType?: StorageEncryptionType;
  SecurityGroupIds?: string[];
  Endpoint?: Endpoint;
  ReaderEndpoint?: Endpoint;
  ARN?: string;
  UserGroupId?: string;
  SubnetIds?: string[];
  SnapshotRetentionLimit?: number;
  DailySnapshotTime?: string;
  NetworkType?: NetworkType;
}
export interface CreateServerlessCacheResponse {
  ServerlessCache?: ServerlessCache & {
    CacheUsageLimits: CacheUsageLimits & {
      DataStorage: DataStorage & { Unit: DataStorageUnit };
    };
  };
}
export interface CreateServerlessCacheSnapshotRequest {
  ServerlessCacheSnapshotName?: string;
  ServerlessCacheName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export interface CreateServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot;
}
export interface CreateSnapshotMessage {
  ReplicationGroupId?: string;
  CacheClusterId?: string;
  SnapshotName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export interface CreateSnapshotResult {
  Snapshot?: Snapshot;
}
export type UserId = string;
export type UserName = string;
export type EngineType = string;
export type PasswordListInput = string[];
export type AccessString = string;
export type InputAuthenticationType =
  | "password"
  | "no-password-required"
  | "iam"
  | (string & {});
export interface AuthenticationMode {
  Type?: InputAuthenticationType;
  Passwords?: Array<string | redacted.Redacted<string>>;
}
export interface CreateUserMessage {
  UserId?: string;
  UserName?: string;
  Engine?: string;
  Passwords?: Array<string | redacted.Redacted<string>>;
  AccessString?: string;
  NoPasswordRequired?: boolean;
  Tags?: Tag[];
  AuthenticationMode?: AuthenticationMode;
}
export type AuthenticationType =
  | "password"
  | "no-password"
  | "iam"
  | (string & {});
export interface Authentication {
  Type?: AuthenticationType;
  PasswordCount?: number;
}
export interface User {
  UserId?: string;
  UserName?: string;
  Status?: string;
  Engine?: string;
  MinimumEngineVersion?: string;
  AccessString?: string;
  UserGroupIds?: string[];
  Authentication?: Authentication;
  ARN?: string;
}
export type UserIdListInput = string[];
export interface CreateUserGroupMessage {
  UserGroupId?: string;
  Engine?: string;
  UserIds?: string[];
  Tags?: Tag[];
}
export type UserIdList = string[];
export interface UserGroupPendingChanges {
  UserIdsToRemove?: string[];
  UserIdsToAdd?: string[];
}
export type UGReplicationGroupIdList = string[];
export type UGServerlessCacheIdList = string[];
export interface UserGroup {
  UserGroupId?: string;
  Status?: string;
  Engine?: string;
  UserIds?: string[];
  MinimumEngineVersion?: string;
  PendingChanges?: UserGroupPendingChanges;
  ReplicationGroups?: string[];
  ServerlessCaches?: string[];
  ARN?: string;
}
export type GlobalNodeGroupIdList = string[];
export interface DecreaseNodeGroupsInGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  NodeGroupCount?: number;
  GlobalNodeGroupsToRemove?: string[];
  GlobalNodeGroupsToRetain?: string[];
  ApplyImmediately?: boolean;
}
export interface DecreaseNodeGroupsInGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export interface ConfigureShard {
  NodeGroupId?: string;
  NewReplicaCount?: number;
  PreferredAvailabilityZones?: string[];
  PreferredOutpostArns?: string[];
}
export type ReplicaConfigurationList = ConfigureShard[];
export type RemoveReplicasList = string[];
export interface DecreaseReplicaCountMessage {
  ReplicationGroupId?: string;
  NewReplicaCount?: number;
  ReplicaConfiguration?: ConfigureShard[];
  ReplicasToRemove?: string[];
  ApplyImmediately?: boolean;
}
export interface DecreaseReplicaCountResult {
  ReplicationGroup?: ReplicationGroup;
}
export interface DeleteCacheClusterMessage {
  CacheClusterId?: string;
  FinalSnapshotIdentifier?: string;
}
export interface DeleteCacheClusterResult {
  CacheCluster?: CacheCluster;
}
export interface DeleteCacheParameterGroupMessage {
  CacheParameterGroupName?: string;
}
export interface DeleteCacheParameterGroupResponse {}
export interface DeleteCacheSecurityGroupMessage {
  CacheSecurityGroupName?: string;
}
export interface DeleteCacheSecurityGroupResponse {}
export interface DeleteCacheSubnetGroupMessage {
  CacheSubnetGroupName?: string;
}
export interface DeleteCacheSubnetGroupResponse {}
export interface DeleteGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  RetainPrimaryReplicationGroup?: boolean;
}
export interface DeleteGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export interface DeleteReplicationGroupMessage {
  ReplicationGroupId?: string;
  RetainPrimaryCluster?: boolean;
  FinalSnapshotIdentifier?: string;
}
export interface DeleteReplicationGroupResult {
  ReplicationGroup?: ReplicationGroup;
}
export interface DeleteServerlessCacheRequest {
  ServerlessCacheName?: string;
  FinalSnapshotName?: string;
}
export interface DeleteServerlessCacheResponse {
  ServerlessCache?: ServerlessCache & {
    CacheUsageLimits: CacheUsageLimits & {
      DataStorage: DataStorage & { Unit: DataStorageUnit };
    };
  };
}
export interface DeleteServerlessCacheSnapshotRequest {
  ServerlessCacheSnapshotName?: string;
}
export interface DeleteServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot;
}
export interface DeleteSnapshotMessage {
  SnapshotName?: string;
}
export interface DeleteSnapshotResult {
  Snapshot?: Snapshot;
}
export interface DeleteUserMessage {
  UserId?: string;
}
export interface DeleteUserGroupMessage {
  UserGroupId?: string;
}
export interface DescribeCacheClustersMessage {
  CacheClusterId?: string;
  MaxRecords?: number;
  Marker?: string;
  ShowCacheNodeInfo?: boolean;
  ShowCacheClustersNotInReplicationGroups?: boolean;
}
export type CacheClusterList = CacheCluster[];
export interface CacheClusterMessage {
  Marker?: string;
  CacheClusters?: CacheCluster[];
}
export interface DescribeCacheEngineVersionsMessage {
  Engine?: string;
  EngineVersion?: string;
  CacheParameterGroupFamily?: string;
  MaxRecords?: number;
  Marker?: string;
  DefaultOnly?: boolean;
}
export interface CacheEngineVersion {
  Engine?: string;
  EngineVersion?: string;
  CacheParameterGroupFamily?: string;
  CacheEngineDescription?: string;
  CacheEngineVersionDescription?: string;
}
export type CacheEngineVersionList = CacheEngineVersion[];
export interface CacheEngineVersionMessage {
  Marker?: string;
  CacheEngineVersions?: CacheEngineVersion[];
}
export interface DescribeCacheParameterGroupsMessage {
  CacheParameterGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type CacheParameterGroupList = CacheParameterGroup[];
export interface CacheParameterGroupsMessage {
  Marker?: string;
  CacheParameterGroups?: CacheParameterGroup[];
}
export interface DescribeCacheParametersMessage {
  CacheParameterGroupName?: string;
  Source?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type ChangeType = "immediate" | "requires-reboot" | (string & {});
export interface Parameter {
  ParameterName?: string;
  ParameterValue?: string;
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  IsModifiable?: boolean;
  MinimumEngineVersion?: string;
  ChangeType?: ChangeType;
}
export type ParametersList = Parameter[];
export interface CacheNodeTypeSpecificValue {
  CacheNodeType?: string;
  Value?: string;
}
export type CacheNodeTypeSpecificValueList = CacheNodeTypeSpecificValue[];
export interface CacheNodeTypeSpecificParameter {
  ParameterName?: string;
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  IsModifiable?: boolean;
  MinimumEngineVersion?: string;
  CacheNodeTypeSpecificValues?: CacheNodeTypeSpecificValue[];
  ChangeType?: ChangeType;
}
export type CacheNodeTypeSpecificParametersList =
  CacheNodeTypeSpecificParameter[];
export interface CacheParameterGroupDetails {
  Marker?: string;
  Parameters?: Parameter[];
  CacheNodeTypeSpecificParameters?: CacheNodeTypeSpecificParameter[];
}
export interface DescribeCacheSecurityGroupsMessage {
  CacheSecurityGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type CacheSecurityGroups = CacheSecurityGroup[];
export interface CacheSecurityGroupMessage {
  Marker?: string;
  CacheSecurityGroups?: CacheSecurityGroup[];
}
export interface DescribeCacheSubnetGroupsMessage {
  CacheSubnetGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type CacheSubnetGroups = CacheSubnetGroup[];
export interface CacheSubnetGroupMessage {
  Marker?: string;
  CacheSubnetGroups?: CacheSubnetGroup[];
}
export interface DescribeEngineDefaultParametersMessage {
  CacheParameterGroupFamily?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface EngineDefaults {
  CacheParameterGroupFamily?: string;
  Marker?: string;
  Parameters?: Parameter[];
  CacheNodeTypeSpecificParameters?: CacheNodeTypeSpecificParameter[];
}
export interface DescribeEngineDefaultParametersResult {
  EngineDefaults?: EngineDefaults;
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
  Date?: Date;
}
export type EventList = Event[];
export interface EventsMessage {
  Marker?: string;
  Events?: Event[];
}
export interface DescribeGlobalReplicationGroupsMessage {
  GlobalReplicationGroupId?: string;
  MaxRecords?: number;
  Marker?: string;
  ShowMemberInfo?: boolean;
}
export type GlobalReplicationGroupList = GlobalReplicationGroup[];
export interface DescribeGlobalReplicationGroupsResult {
  Marker?: string;
  GlobalReplicationGroups?: GlobalReplicationGroup[];
}
export interface DescribeReplicationGroupsMessage {
  ReplicationGroupId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type ReplicationGroupList = ReplicationGroup[];
export interface ReplicationGroupMessage {
  Marker?: string;
  ReplicationGroups?: ReplicationGroup[];
}
export interface DescribeReservedCacheNodesMessage {
  ReservedCacheNodeId?: string;
  ReservedCacheNodesOfferingId?: string;
  CacheNodeType?: string;
  Duration?: string;
  ProductDescription?: string;
  OfferingType?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface RecurringCharge {
  RecurringChargeAmount?: number;
  RecurringChargeFrequency?: string;
}
export type RecurringChargeList = RecurringCharge[];
export interface ReservedCacheNode {
  ReservedCacheNodeId?: string;
  ReservedCacheNodesOfferingId?: string;
  CacheNodeType?: string;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CacheNodeCount?: number;
  ProductDescription?: string;
  OfferingType?: string;
  State?: string;
  RecurringCharges?: RecurringCharge[];
  ReservationARN?: string;
}
export type ReservedCacheNodeList = ReservedCacheNode[];
export interface ReservedCacheNodeMessage {
  Marker?: string;
  ReservedCacheNodes?: ReservedCacheNode[];
}
export interface DescribeReservedCacheNodesOfferingsMessage {
  ReservedCacheNodesOfferingId?: string;
  CacheNodeType?: string;
  Duration?: string;
  ProductDescription?: string;
  OfferingType?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface ReservedCacheNodesOffering {
  ReservedCacheNodesOfferingId?: string;
  CacheNodeType?: string;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  ProductDescription?: string;
  OfferingType?: string;
  RecurringCharges?: RecurringCharge[];
}
export type ReservedCacheNodesOfferingList = ReservedCacheNodesOffering[];
export interface ReservedCacheNodesOfferingMessage {
  Marker?: string;
  ReservedCacheNodesOfferings?: ReservedCacheNodesOffering[];
}
export interface DescribeServerlessCachesRequest {
  ServerlessCacheName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ServerlessCacheList = ServerlessCache[];
export interface DescribeServerlessCachesResponse {
  NextToken?: string;
  ServerlessCaches?: (ServerlessCache & {
    CacheUsageLimits: CacheUsageLimits & {
      DataStorage: DataStorage & { Unit: DataStorageUnit };
    };
  })[];
}
export interface DescribeServerlessCacheSnapshotsRequest {
  ServerlessCacheName?: string;
  ServerlessCacheSnapshotName?: string;
  SnapshotType?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ServerlessCacheSnapshotList = ServerlessCacheSnapshot[];
export interface DescribeServerlessCacheSnapshotsResponse {
  NextToken?: string;
  ServerlessCacheSnapshots?: ServerlessCacheSnapshot[];
}
export type ServiceUpdateStatus =
  | "available"
  | "cancelled"
  | "expired"
  | (string & {});
export type ServiceUpdateStatusList = ServiceUpdateStatus[];
export interface DescribeServiceUpdatesMessage {
  ServiceUpdateName?: string;
  ServiceUpdateStatus?: ServiceUpdateStatus[];
  MaxRecords?: number;
  Marker?: string;
}
export type ServiceUpdateSeverity =
  | "critical"
  | "important"
  | "medium"
  | "low"
  | (string & {});
export type ServiceUpdateType = "security-update" | (string & {});
export interface ServiceUpdate {
  ServiceUpdateName?: string;
  ServiceUpdateReleaseDate?: Date;
  ServiceUpdateEndDate?: Date;
  ServiceUpdateSeverity?: ServiceUpdateSeverity;
  ServiceUpdateRecommendedApplyByDate?: Date;
  ServiceUpdateStatus?: ServiceUpdateStatus;
  ServiceUpdateDescription?: string;
  ServiceUpdateType?: ServiceUpdateType;
  Engine?: string;
  EngineVersion?: string;
  AutoUpdateAfterRecommendedApplyByDate?: boolean;
  EstimatedUpdateTime?: string;
}
export type ServiceUpdateList = ServiceUpdate[];
export interface ServiceUpdatesMessage {
  Marker?: string;
  ServiceUpdates?: ServiceUpdate[];
}
export interface DescribeSnapshotsMessage {
  ReplicationGroupId?: string;
  CacheClusterId?: string;
  SnapshotName?: string;
  SnapshotSource?: string;
  Marker?: string;
  MaxRecords?: number;
  ShowNodeGroupConfig?: boolean;
}
export type SnapshotList = Snapshot[];
export interface DescribeSnapshotsListMessage {
  Marker?: string;
  Snapshots?: Snapshot[];
}
export interface TimeRangeFilter {
  StartTime?: Date;
  EndTime?: Date;
}
export type UpdateActionStatusList = UpdateActionStatus[];
export interface DescribeUpdateActionsMessage {
  ServiceUpdateName?: string;
  ReplicationGroupIds?: string[];
  CacheClusterIds?: string[];
  Engine?: string;
  ServiceUpdateStatus?: ServiceUpdateStatus[];
  ServiceUpdateTimeRange?: TimeRangeFilter;
  UpdateActionStatus?: UpdateActionStatus[];
  ShowNodeLevelUpdateStatus?: boolean;
  MaxRecords?: number;
  Marker?: string;
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
  CacheClusterId?: string;
  CacheNodeId?: string;
  NodeUpdateStatus?: NodeUpdateStatus;
  NodeDeletionDate?: Date;
  NodeUpdateStartDate?: Date;
  NodeUpdateEndDate?: Date;
  NodeUpdateInitiatedBy?: NodeUpdateInitiatedBy;
  NodeUpdateInitiatedDate?: Date;
  NodeUpdateStatusModifiedDate?: Date;
}
export type NodeGroupMemberUpdateStatusList = NodeGroupMemberUpdateStatus[];
export interface NodeGroupUpdateStatus {
  NodeGroupId?: string;
  NodeGroupMemberUpdateStatus?: NodeGroupMemberUpdateStatus[];
}
export type NodeGroupUpdateStatusList = NodeGroupUpdateStatus[];
export interface CacheNodeUpdateStatus {
  CacheNodeId?: string;
  NodeUpdateStatus?: NodeUpdateStatus;
  NodeDeletionDate?: Date;
  NodeUpdateStartDate?: Date;
  NodeUpdateEndDate?: Date;
  NodeUpdateInitiatedBy?: NodeUpdateInitiatedBy;
  NodeUpdateInitiatedDate?: Date;
  NodeUpdateStatusModifiedDate?: Date;
}
export type CacheNodeUpdateStatusList = CacheNodeUpdateStatus[];
export interface UpdateAction {
  ReplicationGroupId?: string;
  CacheClusterId?: string;
  ServiceUpdateName?: string;
  ServiceUpdateReleaseDate?: Date;
  ServiceUpdateSeverity?: ServiceUpdateSeverity;
  ServiceUpdateStatus?: ServiceUpdateStatus;
  ServiceUpdateRecommendedApplyByDate?: Date;
  ServiceUpdateType?: ServiceUpdateType;
  UpdateActionAvailableDate?: Date;
  UpdateActionStatus?: UpdateActionStatus;
  NodesUpdated?: string;
  UpdateActionStatusModifiedDate?: Date;
  SlaMet?: SlaMet;
  NodeGroupUpdateStatus?: NodeGroupUpdateStatus[];
  CacheNodeUpdateStatus?: CacheNodeUpdateStatus[];
  EstimatedUpdateTime?: string;
  Engine?: string;
}
export type UpdateActionList = UpdateAction[];
export interface UpdateActionsMessage {
  Marker?: string;
  UpdateActions?: UpdateAction[];
}
export interface DescribeUserGroupsMessage {
  UserGroupId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type UserGroupList = UserGroup[];
export interface DescribeUserGroupsResult {
  UserGroups?: UserGroup[];
  Marker?: string;
}
export type FilterName = string;
export type FilterValue = string;
export type FilterValueList = string[];
export interface Filter {
  Name?: string;
  Values?: string[];
}
export type FilterList = Filter[];
export interface DescribeUsersMessage {
  Engine?: string;
  UserId?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export type UserList = User[];
export interface DescribeUsersResult {
  Users?: User[];
  Marker?: string;
}
export interface DisassociateGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  ReplicationGroupId?: string;
  ReplicationGroupRegion?: string;
}
export interface DisassociateGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export interface ExportServerlessCacheSnapshotRequest {
  ServerlessCacheSnapshotName?: string;
  S3BucketName?: string;
}
export interface ExportServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot;
}
export interface FailoverGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  PrimaryRegion?: string;
  PrimaryReplicationGroupId?: string;
}
export interface FailoverGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export interface ReshardingConfiguration {
  NodeGroupId?: string;
  PreferredAvailabilityZones?: string[];
}
export type ReshardingConfigurationList = ReshardingConfiguration[];
export interface RegionalConfiguration {
  ReplicationGroupId?: string;
  ReplicationGroupRegion?: string;
  ReshardingConfiguration?: ReshardingConfiguration[];
}
export type RegionalConfigurationList = RegionalConfiguration[];
export interface IncreaseNodeGroupsInGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  NodeGroupCount?: number;
  RegionalConfigurations?: RegionalConfiguration[];
  ApplyImmediately?: boolean;
}
export interface IncreaseNodeGroupsInGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export interface IncreaseReplicaCountMessage {
  ReplicationGroupId?: string;
  NewReplicaCount?: number;
  ReplicaConfiguration?: ConfigureShard[];
  ApplyImmediately?: boolean;
}
export interface IncreaseReplicaCountResult {
  ReplicationGroup?: ReplicationGroup;
}
export interface ListAllowedNodeTypeModificationsMessage {
  CacheClusterId?: string;
  ReplicationGroupId?: string;
}
export type NodeTypeList = string[];
export interface AllowedNodeTypeModificationsMessage {
  ScaleUpModifications?: string[];
  ScaleDownModifications?: string[];
}
export interface ListTagsForResourceMessage {
  ResourceName?: string;
}
export type AuthTokenUpdateStrategyType =
  | "SET"
  | "ROTATE"
  | "DELETE"
  | (string & {});
export interface ModifyCacheClusterMessage {
  CacheClusterId?: string;
  NumCacheNodes?: number;
  CacheNodeIdsToRemove?: string[];
  AZMode?: AZMode;
  NewAvailabilityZones?: string[];
  CacheSecurityGroupNames?: string[];
  SecurityGroupIds?: string[];
  PreferredMaintenanceWindow?: string;
  NotificationTopicArn?: string;
  CacheParameterGroupName?: string;
  NotificationTopicStatus?: string;
  ApplyImmediately?: boolean;
  Engine?: string;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  CacheNodeType?: string;
  AuthToken?: string | redacted.Redacted<string>;
  AuthTokenUpdateStrategy?: AuthTokenUpdateStrategyType;
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  IpDiscovery?: IpDiscovery;
  ScaleConfig?: ScaleConfig;
}
export interface ModifyCacheClusterResult {
  CacheCluster?: CacheCluster;
}
export interface ParameterNameValue {
  ParameterName?: string;
  ParameterValue?: string;
}
export type ParameterNameValueList = ParameterNameValue[];
export interface ModifyCacheParameterGroupMessage {
  CacheParameterGroupName?: string;
  ParameterNameValues?: ParameterNameValue[];
}
export interface CacheParameterGroupNameMessage {
  CacheParameterGroupName?: string;
}
export interface ModifyCacheSubnetGroupMessage {
  CacheSubnetGroupName?: string;
  CacheSubnetGroupDescription?: string;
  SubnetIds?: string[];
}
export interface ModifyCacheSubnetGroupResult {
  CacheSubnetGroup?: CacheSubnetGroup;
}
export interface ModifyGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  ApplyImmediately?: boolean;
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  CacheParameterGroupName?: string;
  GlobalReplicationGroupDescription?: string;
  AutomaticFailoverEnabled?: boolean;
}
export interface ModifyGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export interface ModifyReplicationGroupMessage {
  ReplicationGroupId?: string;
  ReplicationGroupDescription?: string;
  PrimaryClusterId?: string;
  SnapshottingClusterId?: string;
  AutomaticFailoverEnabled?: boolean;
  MultiAZEnabled?: boolean;
  NodeGroupId?: string;
  CacheSecurityGroupNames?: string[];
  SecurityGroupIds?: string[];
  PreferredMaintenanceWindow?: string;
  NotificationTopicArn?: string;
  CacheParameterGroupName?: string;
  NotificationTopicStatus?: string;
  ApplyImmediately?: boolean;
  Engine?: string;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  CacheNodeType?: string;
  AuthToken?: string | redacted.Redacted<string>;
  AuthTokenUpdateStrategy?: AuthTokenUpdateStrategyType;
  UserGroupIdsToAdd?: string[];
  UserGroupIdsToRemove?: string[];
  RemoveUserGroups?: boolean;
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  IpDiscovery?: IpDiscovery;
  TransitEncryptionEnabled?: boolean;
  TransitEncryptionMode?: TransitEncryptionMode;
  ClusterMode?: ClusterMode;
  Durability?: Durability;
}
export interface ModifyReplicationGroupResult {
  ReplicationGroup?: ReplicationGroup;
}
export type NodeGroupsToRemoveList = string[];
export type NodeGroupsToRetainList = string[];
export interface ModifyReplicationGroupShardConfigurationMessage {
  ReplicationGroupId?: string;
  NodeGroupCount?: number;
  ApplyImmediately?: boolean;
  ReshardingConfiguration?: ReshardingConfiguration[];
  NodeGroupsToRemove?: string[];
  NodeGroupsToRetain?: string[];
}
export interface ModifyReplicationGroupShardConfigurationResult {
  ReplicationGroup?: ReplicationGroup;
}
export interface ModifyServerlessCacheRequest {
  ServerlessCacheName?: string;
  Description?: string;
  CacheUsageLimits?: CacheUsageLimits;
  RemoveUserGroup?: boolean;
  UserGroupId?: string;
  SecurityGroupIds?: string[];
  SnapshotRetentionLimit?: number;
  DailySnapshotTime?: string;
  Engine?: string;
  MajorEngineVersion?: string;
}
export interface ModifyServerlessCacheResponse {
  ServerlessCache?: ServerlessCache & {
    CacheUsageLimits: CacheUsageLimits & {
      DataStorage: DataStorage & { Unit: DataStorageUnit };
    };
  };
}
export interface ModifyUserMessage {
  UserId?: string;
  AccessString?: string;
  AppendAccessString?: string;
  Passwords?: Array<string | redacted.Redacted<string>>;
  NoPasswordRequired?: boolean;
  AuthenticationMode?: AuthenticationMode;
  Engine?: string;
}
export interface ModifyUserGroupMessage {
  UserGroupId?: string;
  UserIdsToAdd?: string[];
  UserIdsToRemove?: string[];
  Engine?: string;
}
export interface PurchaseReservedCacheNodesOfferingMessage {
  ReservedCacheNodesOfferingId?: string;
  ReservedCacheNodeId?: string;
  CacheNodeCount?: number;
  Tags?: Tag[];
}
export interface PurchaseReservedCacheNodesOfferingResult {
  ReservedCacheNode?: ReservedCacheNode;
}
export interface RebalanceSlotsInGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  ApplyImmediately?: boolean;
}
export interface RebalanceSlotsInGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export interface RebootCacheClusterMessage {
  CacheClusterId?: string;
  CacheNodeIdsToReboot?: string[];
}
export interface RebootCacheClusterResult {
  CacheCluster?: CacheCluster;
}
export type KeyList = string[];
export interface RemoveTagsFromResourceMessage {
  ResourceName?: string;
  TagKeys?: string[];
}
export interface ResetCacheParameterGroupMessage {
  CacheParameterGroupName?: string;
  ResetAllParameters?: boolean;
  ParameterNameValues?: ParameterNameValue[];
}
export interface RevokeCacheSecurityGroupIngressMessage {
  CacheSecurityGroupName?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export interface RevokeCacheSecurityGroupIngressResult {
  CacheSecurityGroup?: CacheSecurityGroup;
}
export interface CustomerNodeEndpoint {
  Address?: string;
  Port?: number;
}
export type CustomerNodeEndpointList = CustomerNodeEndpoint[];
export interface StartMigrationMessage {
  ReplicationGroupId?: string;
  CustomerNodeEndpointList?: CustomerNodeEndpoint[];
}
export interface StartMigrationResponse {
  ReplicationGroup?: ReplicationGroup;
}
export interface TestFailoverMessage {
  ReplicationGroupId?: string;
  NodeGroupId?: string;
}
export interface TestFailoverResult {
  ReplicationGroup?: ReplicationGroup;
}
export interface TestMigrationMessage {
  ReplicationGroupId?: string;
  CustomerNodeEndpointList?: CustomerNodeEndpoint[];
}
export interface TestMigrationResponse {
  ReplicationGroup?: ReplicationGroup;
}
export type ExceptionMessage = string;
export type AwsQueryErrorMessage = string;
export type AddTagsToResourceError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | InvalidARNFault
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
 * to categorize and track all your ElastiCache resources, with the exception of global
 * replication group. When you add or remove tags on replication groups, those actions will
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
  AddTagsToResourceMessage,
  TagListMessage,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceName: 0, Tags: D.list(i_Tag, { item: "Tag" }) },
    output: { TagList: D.list({}, { item: "Tag" }) },
  },
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    InvalidARNFault,
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
})) as any;

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
  AuthorizeCacheSecurityGroupIngressMessage,
  AuthorizeCacheSecurityGroupIngressResult,
  AuthorizeCacheSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheSecurityGroupName: 0,
      EC2SecurityGroupName: 0,
      EC2SecurityGroupOwnerId: 0,
    },
    output: { CacheSecurityGroup: o_CacheSecurityGroup },
  },
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
})) as any;

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
  BatchApplyUpdateActionMessage,
  UpdateActionResultsMessage,
  BatchApplyUpdateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationGroupIds: 0, CacheClusterIds: 0, ServiceUpdateName: 0 },
    output: {
      ProcessedUpdateActions: D.list({}, { item: "ProcessedUpdateAction" }),
      UnprocessedUpdateActions: D.list({}, { item: "UnprocessedUpdateAction" }),
    },
  },
  errors: [InvalidParameterValueException, ServiceUpdateNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchApplyUpdateAction",
})) as any;

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
  BatchStopUpdateActionMessage,
  UpdateActionResultsMessage,
  BatchStopUpdateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationGroupIds: 0, CacheClusterIds: 0, ServiceUpdateName: 0 },
    output: {
      ProcessedUpdateActions: D.list({}, { item: "ProcessedUpdateAction" }),
      UnprocessedUpdateActions: D.list({}, { item: "UnprocessedUpdateAction" }),
    },
  },
  errors: [InvalidParameterValueException, ServiceUpdateNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStopUpdateAction",
})) as any;

export type CompleteMigrationError =
  | InvalidReplicationGroupStateFault
  | ReplicationGroupNotFoundFault
  | ReplicationGroupNotUnderMigrationFault
  | CommonErrors;
/**
 * Complete the migration of data.
 */
export const completeMigration: API.OperationMethod<
  CompleteMigrationMessage,
  CompleteMigrationResponse,
  CompleteMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationGroupId: 0, Force: 0 },
    output: { ReplicationGroup: o_ReplicationGroup },
  },
  errors: [
    InvalidReplicationGroupStateFault,
    ReplicationGroupNotFoundFault,
    ReplicationGroupNotUnderMigrationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteMigration",
})) as any;

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
 * Creates a copy of an existing serverless cache’s snapshot. Available for Valkey, Redis OSS and Serverless Memcached only.
 */
export const copyServerlessCacheSnapshot: API.OperationMethod<
  CopyServerlessCacheSnapshotRequest,
  CopyServerlessCacheSnapshotResponse,
  CopyServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceServerlessCacheSnapshotName: 0,
      TargetServerlessCacheSnapshotName: 0,
      KmsKeyId: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { ServerlessCacheSnapshot: o_ServerlessCacheSnapshot },
  },
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
})) as any;

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
  CopySnapshotMessage,
  CopySnapshotResult,
  CopySnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceSnapshotName: 0,
      TargetSnapshotName: 0,
      TargetBucket: 0,
      KmsKeyId: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { Snapshot: o_Snapshot },
  },
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
})) as any;

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
  CreateCacheClusterMessage,
  CreateCacheClusterResult,
  CreateCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheClusterId: 0,
      ReplicationGroupId: 0,
      AZMode: 0,
      PreferredAvailabilityZone: 0,
      PreferredAvailabilityZones: D.list(0, {
        item: "PreferredAvailabilityZone",
      }),
      NumCacheNodes: 0,
      CacheNodeType: 0,
      Engine: 0,
      EngineVersion: 0,
      CacheParameterGroupName: 0,
      CacheSubnetGroupName: 0,
      CacheSecurityGroupNames: D.list(0, { item: "CacheSecurityGroupName" }),
      SecurityGroupIds: D.list(0, { item: "SecurityGroupId" }),
      Tags: D.list(i_Tag, { item: "Tag" }),
      SnapshotArns: D.list(0, { item: "SnapshotArn" }),
      SnapshotName: 0,
      PreferredMaintenanceWindow: 0,
      Port: 0,
      NotificationTopicArn: 0,
      AutoMinorVersionUpgrade: 0,
      SnapshotRetentionLimit: 0,
      SnapshotWindow: 0,
      AuthToken: 0,
      OutpostMode: 0,
      PreferredOutpostArn: 0,
      PreferredOutpostArns: D.list(0, { item: "PreferredOutpostArn" }),
      LogDeliveryConfigurations: D.list(i_LogDeliveryConfigurationRequest, {
        item: "LogDeliveryConfigurationRequest",
      }),
      TransitEncryptionEnabled: 0,
      NetworkType: 0,
      IpDiscovery: 0,
    },
    output: { CacheCluster: o_CacheCluster },
  },
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
})) as any;

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
  CreateCacheParameterGroupMessage,
  CreateCacheParameterGroupResult,
  CreateCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheParameterGroupName: 0,
      CacheParameterGroupFamily: 0,
      Description: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { CacheParameterGroup: o_CacheParameterGroup },
  },
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
})) as any;

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
  CreateCacheSecurityGroupMessage,
  CreateCacheSecurityGroupResult,
  CreateCacheSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheSecurityGroupName: 0,
      Description: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { CacheSecurityGroup: o_CacheSecurityGroup },
  },
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
})) as any;

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
  CreateCacheSubnetGroupMessage,
  CreateCacheSubnetGroupResult,
  CreateCacheSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheSubnetGroupName: 0,
      CacheSubnetGroupDescription: 0,
      SubnetIds: D.list(0, { item: "SubnetIdentifier" }),
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { CacheSubnetGroup: o_CacheSubnetGroup },
  },
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
})) as any;

export type CreateGlobalReplicationGroupError =
  | GlobalReplicationGroupAlreadyExistsFault
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | ReplicationGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
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
  CreateGlobalReplicationGroupMessage,
  CreateGlobalReplicationGroupResult,
  CreateGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GlobalReplicationGroupIdSuffix: 0,
      GlobalReplicationGroupDescription: 0,
      PrimaryReplicationGroupId: 0,
    },
    output: { GlobalReplicationGroup: o_GlobalReplicationGroup },
  },
  errors: [
    GlobalReplicationGroupAlreadyExistsFault,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlobalReplicationGroup",
})) as any;

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
  CreateReplicationGroupMessage,
  CreateReplicationGroupResult,
  CreateReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationGroupId: 0,
      ReplicationGroupDescription: 0,
      GlobalReplicationGroupId: 0,
      PrimaryClusterId: 0,
      AutomaticFailoverEnabled: 0,
      MultiAZEnabled: 0,
      NumCacheClusters: 0,
      PreferredCacheClusterAZs: D.list(0, { item: "AvailabilityZone" }),
      NumNodeGroups: 0,
      ReplicasPerNodeGroup: 0,
      NodeGroupConfiguration: D.list(
        {
          NodeGroupId: 0,
          Slots: 0,
          ReplicaCount: 0,
          PrimaryAvailabilityZone: 0,
          ReplicaAvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
          PrimaryOutpostArn: 0,
          ReplicaOutpostArns: D.list(0, { item: "OutpostArn" }),
        },
        { item: "NodeGroupConfiguration" },
      ),
      CacheNodeType: 0,
      Engine: 0,
      EngineVersion: 0,
      CacheParameterGroupName: 0,
      CacheSubnetGroupName: 0,
      CacheSecurityGroupNames: D.list(0, { item: "CacheSecurityGroupName" }),
      SecurityGroupIds: D.list(0, { item: "SecurityGroupId" }),
      Tags: D.list(i_Tag, { item: "Tag" }),
      SnapshotArns: D.list(0, { item: "SnapshotArn" }),
      SnapshotName: 0,
      PreferredMaintenanceWindow: 0,
      Port: 0,
      NotificationTopicArn: 0,
      AutoMinorVersionUpgrade: 0,
      SnapshotRetentionLimit: 0,
      SnapshotWindow: 0,
      AuthToken: 0,
      TransitEncryptionEnabled: 0,
      AtRestEncryptionEnabled: 0,
      KmsKeyId: 0,
      UserGroupIds: 0,
      LogDeliveryConfigurations: D.list(i_LogDeliveryConfigurationRequest, {
        item: "LogDeliveryConfigurationRequest",
      }),
      DataTieringEnabled: 0,
      NetworkType: 0,
      IpDiscovery: 0,
      TransitEncryptionMode: 0,
      ClusterMode: 0,
      ServerlessCacheSnapshotName: 0,
      Durability: 0,
    },
    output: { ReplicationGroup: o_ReplicationGroup },
  },
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
})) as any;

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
  CreateServerlessCacheRequest,
  CreateServerlessCacheResponse,
  CreateServerlessCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServerlessCacheName: 0,
      Description: 0,
      Engine: 0,
      MajorEngineVersion: 0,
      CacheUsageLimits: i_CacheUsageLimits,
      KmsKeyId: 0,
      SecurityGroupIds: D.list(0, { item: "SecurityGroupId" }),
      SnapshotArnsToRestore: D.list(0, { item: "SnapshotArn" }),
      Tags: D.list(i_Tag, { item: "Tag" }),
      UserGroupId: 0,
      SubnetIds: D.list(0, { item: "SubnetId" }),
      SnapshotRetentionLimit: 0,
      DailySnapshotTime: 0,
      NetworkType: 0,
    },
    output: { ServerlessCache: o_ServerlessCache },
  },
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
})) as any;

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
  CreateServerlessCacheSnapshotRequest,
  CreateServerlessCacheSnapshotResponse,
  CreateServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServerlessCacheSnapshotName: 0,
      ServerlessCacheName: 0,
      KmsKeyId: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { ServerlessCacheSnapshot: o_ServerlessCacheSnapshot },
  },
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
})) as any;

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
  CreateSnapshotMessage,
  CreateSnapshotResult,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationGroupId: 0,
      CacheClusterId: 0,
      SnapshotName: 0,
      KmsKeyId: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { Snapshot: o_Snapshot },
  },
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
})) as any;

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
  CreateUserMessage,
  User,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserId: 0,
      UserName: 0,
      Engine: 0,
      Passwords: 0,
      AccessString: 0,
      NoPasswordRequired: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      AuthenticationMode: i_AuthenticationMode,
    },
    output: { UserGroupIds: D.list(), Authentication: o_Authentication },
  },
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
})) as any;

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
  CreateUserGroupMessage,
  UserGroup,
  CreateUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserGroupId: 0,
      Engine: 0,
      UserIds: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: {
      UserIds: D.list(),
      PendingChanges: o_UserGroupPendingChanges,
      ReplicationGroups: D.list(),
      ServerlessCaches: D.list(),
    },
  },
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
})) as any;

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
  DecreaseNodeGroupsInGlobalReplicationGroupMessage,
  DecreaseNodeGroupsInGlobalReplicationGroupResult,
  DecreaseNodeGroupsInGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GlobalReplicationGroupId: 0,
      NodeGroupCount: 0,
      GlobalNodeGroupsToRemove: D.list(0, { item: "GlobalNodeGroupId" }),
      GlobalNodeGroupsToRetain: D.list(0, { item: "GlobalNodeGroupId" }),
      ApplyImmediately: 0,
    },
    output: { GlobalReplicationGroup: o_GlobalReplicationGroup },
  },
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DecreaseNodeGroupsInGlobalReplicationGroup",
})) as any;

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
  DecreaseReplicaCountMessage,
  DecreaseReplicaCountResult,
  DecreaseReplicaCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationGroupId: 0,
      NewReplicaCount: 0,
      ReplicaConfiguration: D.list(i_ConfigureShard, {
        item: "ConfigureShard",
      }),
      ReplicasToRemove: 0,
      ApplyImmediately: 0,
    },
    output: { ReplicationGroup: o_ReplicationGroup },
  },
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
})) as any;

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
  DeleteCacheClusterMessage,
  DeleteCacheClusterResult,
  DeleteCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CacheClusterId: 0, FinalSnapshotIdentifier: 0 },
    output: { CacheCluster: o_CacheCluster },
  },
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
})) as any;

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
  DeleteCacheParameterGroupMessage,
  DeleteCacheParameterGroupResponse,
  DeleteCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CacheParameterGroupName: 0 } },
  errors: [
    CacheParameterGroupNotFoundFault,
    InvalidCacheParameterGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheParameterGroup",
})) as any;

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
  DeleteCacheSecurityGroupMessage,
  DeleteCacheSecurityGroupResponse,
  DeleteCacheSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CacheSecurityGroupName: 0 } },
  errors: [
    CacheSecurityGroupNotFoundFault,
    InvalidCacheSecurityGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheSecurityGroup",
})) as any;

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
  DeleteCacheSubnetGroupMessage,
  DeleteCacheSubnetGroupResponse,
  DeleteCacheSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CacheSubnetGroupName: 0 } },
  errors: [CacheSubnetGroupInUse, CacheSubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheSubnetGroup",
})) as any;

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
  DeleteGlobalReplicationGroupMessage,
  DeleteGlobalReplicationGroupResult,
  DeleteGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GlobalReplicationGroupId: 0, RetainPrimaryReplicationGroup: 0 },
    output: { GlobalReplicationGroup: o_GlobalReplicationGroup },
  },
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlobalReplicationGroup",
})) as any;

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
  DeleteReplicationGroupMessage,
  DeleteReplicationGroupResult,
  DeleteReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationGroupId: 0,
      RetainPrimaryCluster: 0,
      FinalSnapshotIdentifier: 0,
    },
    output: { ReplicationGroup: o_ReplicationGroup },
  },
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
})) as any;

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
  DeleteServerlessCacheRequest,
  DeleteServerlessCacheResponse,
  DeleteServerlessCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServerlessCacheName: 0, FinalSnapshotName: 0 },
    output: { ServerlessCache: o_ServerlessCache },
  },
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
})) as any;

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
  DeleteServerlessCacheSnapshotRequest,
  DeleteServerlessCacheSnapshotResponse,
  DeleteServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServerlessCacheSnapshotName: 0 },
    output: { ServerlessCacheSnapshot: o_ServerlessCacheSnapshot },
  },
  errors: [
    InvalidParameterValueException,
    InvalidServerlessCacheSnapshotStateFault,
    ServerlessCacheSnapshotNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServerlessCacheSnapshot",
})) as any;

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
  DeleteSnapshotMessage,
  DeleteSnapshotResult,
  DeleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SnapshotName: 0 },
    output: { Snapshot: o_Snapshot },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidSnapshotStateFault,
    SnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
})) as any;

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
  DeleteUserMessage,
  User,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserId: 0 },
    output: { UserGroupIds: D.list(), Authentication: o_Authentication },
  },
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
})) as any;

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
  DeleteUserGroupMessage,
  UserGroup,
  DeleteUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserGroupId: 0 },
    output: {
      UserIds: D.list(),
      PendingChanges: o_UserGroupPendingChanges,
      ReplicationGroups: D.list(),
      ServerlessCaches: D.list(),
    },
  },
  errors: [
    InvalidParameterValueException,
    InvalidUserGroupStateFault,
    ServiceLinkedRoleNotFoundFault,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserGroup",
})) as any;

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
  DescribeCacheClustersMessage,
  CacheClusterMessage,
  DescribeCacheClustersError,
  Credentials | HttpClient.HttpClient,
  CacheCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheClusterId: 0,
      MaxRecords: 0,
      Marker: 0,
      ShowCacheNodeInfo: 0,
      ShowCacheClustersNotInReplicationGroups: 0,
    },
    output: { CacheClusters: D.list(o_CacheCluster, { item: "CacheCluster" }) },
  },
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
})) as any;

export type DescribeCacheEngineVersionsError = CommonErrors;
/**
 * Returns a list of the available cache engines and their versions.
 */
export const describeCacheEngineVersions: API.PaginatedOperationMethod<
  DescribeCacheEngineVersionsMessage,
  CacheEngineVersionMessage,
  DescribeCacheEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  CacheEngineVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Engine: 0,
      EngineVersion: 0,
      CacheParameterGroupFamily: 0,
      MaxRecords: 0,
      Marker: 0,
      DefaultOnly: 0,
    },
    output: { CacheEngineVersions: D.list({}, { item: "CacheEngineVersion" }) },
  },
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
  DescribeCacheParameterGroupsMessage,
  CacheParameterGroupsMessage,
  DescribeCacheParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  CacheParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CacheParameterGroupName: 0, MaxRecords: 0, Marker: 0 },
    output: {
      CacheParameterGroups: D.list(o_CacheParameterGroup, {
        item: "CacheParameterGroup",
      }),
    },
  },
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
  DescribeCacheParametersMessage,
  CacheParameterGroupDetails,
  DescribeCacheParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CacheParameterGroupName: 0, Source: 0, MaxRecords: 0, Marker: 0 },
    output: {
      Parameters: D.list(o_Parameter, { item: "Parameter" }),
      CacheNodeTypeSpecificParameters: D.list(
        o_CacheNodeTypeSpecificParameter,
        { item: "CacheNodeTypeSpecificParameter" },
      ),
    },
  },
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
  DescribeCacheSecurityGroupsMessage,
  CacheSecurityGroupMessage,
  DescribeCacheSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  CacheSecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CacheSecurityGroupName: 0, MaxRecords: 0, Marker: 0 },
    output: {
      CacheSecurityGroups: D.list(o_CacheSecurityGroup, {
        item: "CacheSecurityGroup",
      }),
    },
  },
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
})) as any;

export type DescribeCacheSubnetGroupsError =
  | CacheSubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a list of cache subnet group descriptions. If a subnet group name is
 * specified, the list contains only the description of that group. This is applicable only
 * when you have ElastiCache in VPC setup. All ElastiCache clusters now launch in VPC by
 * default.
 */
export const describeCacheSubnetGroups: API.PaginatedOperationMethod<
  DescribeCacheSubnetGroupsMessage,
  CacheSubnetGroupMessage,
  DescribeCacheSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  CacheSubnetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CacheSubnetGroupName: 0, MaxRecords: 0, Marker: 0 },
    output: {
      CacheSubnetGroups: D.list(o_CacheSubnetGroup, {
        item: "CacheSubnetGroup",
      }),
    },
  },
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
  DescribeEngineDefaultParametersMessage,
  DescribeEngineDefaultParametersResult,
  DescribeEngineDefaultParametersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CacheParameterGroupFamily: 0, MaxRecords: 0, Marker: 0 },
    output: {
      EngineDefaults: {
        Parameters: D.list(o_Parameter, { item: "Parameter" }),
        CacheNodeTypeSpecificParameters: D.list(
          o_CacheNodeTypeSpecificParameter,
          { item: "CacheNodeTypeSpecificParameter" },
        ),
      },
    },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
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
      MaxRecords: 0,
      Marker: 0,
    },
    output: { Events: D.list({ Date: D.ts }, { item: "Event" }) },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
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
  DescribeGlobalReplicationGroupsMessage,
  DescribeGlobalReplicationGroupsResult,
  DescribeGlobalReplicationGroupsError,
  Credentials | HttpClient.HttpClient,
  GlobalReplicationGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      GlobalReplicationGroupId: 0,
      MaxRecords: 0,
      Marker: 0,
      ShowMemberInfo: 0,
    },
    output: {
      GlobalReplicationGroups: D.list(o_GlobalReplicationGroup, {
        item: "GlobalReplicationGroup",
      }),
    },
  },
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
  DescribeReplicationGroupsMessage,
  ReplicationGroupMessage,
  DescribeReplicationGroupsError,
  Credentials | HttpClient.HttpClient,
  ReplicationGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationGroupId: 0, MaxRecords: 0, Marker: 0 },
    output: {
      ReplicationGroups: D.list(o_ReplicationGroup, {
        item: "ReplicationGroup",
      }),
    },
  },
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
  DescribeReservedCacheNodesMessage,
  ReservedCacheNodeMessage,
  DescribeReservedCacheNodesError,
  Credentials | HttpClient.HttpClient,
  ReservedCacheNode
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ReservedCacheNodeId: 0,
      ReservedCacheNodesOfferingId: 0,
      CacheNodeType: 0,
      Duration: 0,
      ProductDescription: 0,
      OfferingType: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      ReservedCacheNodes: D.list(o_ReservedCacheNode, {
        item: "ReservedCacheNode",
      }),
    },
  },
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
  DescribeReservedCacheNodesOfferingsMessage,
  ReservedCacheNodesOfferingMessage,
  DescribeReservedCacheNodesOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedCacheNodesOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ReservedCacheNodesOfferingId: 0,
      CacheNodeType: 0,
      Duration: 0,
      ProductDescription: 0,
      OfferingType: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      ReservedCacheNodesOfferings: D.list(
        {
          Duration: D.num,
          FixedPrice: D.num,
          UsagePrice: D.num,
          RecurringCharges: D.list(o_RecurringCharge, {
            item: "RecurringCharge",
          }),
        },
        { item: "ReservedCacheNodesOffering" },
      ),
    },
  },
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
  DescribeServerlessCachesRequest,
  DescribeServerlessCachesResponse,
  DescribeServerlessCachesError,
  Credentials | HttpClient.HttpClient,
  ServerlessCache
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ServerlessCacheName: 0, MaxResults: 0, NextToken: 0 },
    output: { ServerlessCaches: D.list(o_ServerlessCache) },
  },
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
})) as any;

export type DescribeServerlessCacheSnapshotsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotNotFoundFault
  | CommonErrors;
/**
 * Returns information about serverless cache snapshots.
 * By default, this API lists all of the customer’s serverless cache snapshots.
 * It can also describe a single serverless cache snapshot, or the snapshots associated with
 * a particular serverless cache. Available for Valkey, Redis OSS and Serverless Memcached only.
 */
export const describeServerlessCacheSnapshots: API.PaginatedOperationMethod<
  DescribeServerlessCacheSnapshotsRequest,
  DescribeServerlessCacheSnapshotsResponse,
  DescribeServerlessCacheSnapshotsError,
  Credentials | HttpClient.HttpClient,
  ServerlessCacheSnapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServerlessCacheName: 0,
      ServerlessCacheSnapshotName: 0,
      SnapshotType: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ServerlessCacheSnapshots: D.list(o_ServerlessCacheSnapshot, {
        item: "ServerlessCacheSnapshot",
      }),
    },
  },
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
  DescribeServiceUpdatesMessage,
  ServiceUpdatesMessage,
  DescribeServiceUpdatesError,
  Credentials | HttpClient.HttpClient,
  ServiceUpdate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceUpdateName: 0,
      ServiceUpdateStatus: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      ServiceUpdates: D.list(
        {
          ServiceUpdateReleaseDate: D.ts,
          ServiceUpdateEndDate: D.ts,
          ServiceUpdateRecommendedApplyByDate: D.ts,
          AutoUpdateAfterRecommendedApplyByDate: D.bool,
        },
        { item: "ServiceUpdate" },
      ),
    },
  },
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
  DescribeSnapshotsMessage,
  DescribeSnapshotsListMessage,
  DescribeSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationGroupId: 0,
      CacheClusterId: 0,
      SnapshotName: 0,
      SnapshotSource: 0,
      Marker: 0,
      MaxRecords: 0,
      ShowNodeGroupConfig: 0,
    },
    output: { Snapshots: D.list(o_Snapshot, { item: "Snapshot" }) },
  },
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
})) as any;

export type DescribeUpdateActionsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns details of the update actions
 */
export const describeUpdateActions: API.PaginatedOperationMethod<
  DescribeUpdateActionsMessage,
  UpdateActionsMessage,
  DescribeUpdateActionsError,
  Credentials | HttpClient.HttpClient,
  UpdateAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceUpdateName: 0,
      ReplicationGroupIds: 0,
      CacheClusterIds: 0,
      Engine: 0,
      ServiceUpdateStatus: 0,
      ServiceUpdateTimeRange: { StartTime: 0, EndTime: 0 },
      UpdateActionStatus: 0,
      ShowNodeLevelUpdateStatus: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      UpdateActions: D.list(
        {
          ServiceUpdateReleaseDate: D.ts,
          ServiceUpdateRecommendedApplyByDate: D.ts,
          UpdateActionAvailableDate: D.ts,
          UpdateActionStatusModifiedDate: D.ts,
          NodeGroupUpdateStatus: D.list(
            {
              NodeGroupMemberUpdateStatus: D.list(
                {
                  NodeDeletionDate: D.ts,
                  NodeUpdateStartDate: D.ts,
                  NodeUpdateEndDate: D.ts,
                  NodeUpdateInitiatedDate: D.ts,
                  NodeUpdateStatusModifiedDate: D.ts,
                },
                { item: "NodeGroupMemberUpdateStatus" },
              ),
            },
            { item: "NodeGroupUpdateStatus" },
          ),
          CacheNodeUpdateStatus: D.list(
            {
              NodeDeletionDate: D.ts,
              NodeUpdateStartDate: D.ts,
              NodeUpdateEndDate: D.ts,
              NodeUpdateInitiatedDate: D.ts,
              NodeUpdateStatusModifiedDate: D.ts,
            },
            { item: "CacheNodeUpdateStatus" },
          ),
        },
        { item: "UpdateAction" },
      ),
    },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUpdateActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "UpdateActions",
    pageSize: "MaxRecords",
  } as const,
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
  DescribeUserGroupsMessage,
  DescribeUserGroupsResult,
  DescribeUserGroupsError,
  Credentials | HttpClient.HttpClient,
  UserGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserGroupId: 0, MaxRecords: 0, Marker: 0 },
    output: {
      UserGroups: D.list({
        UserIds: D.list(),
        PendingChanges: o_UserGroupPendingChanges,
        ReplicationGroups: D.list(),
        ServerlessCaches: D.list(),
      }),
    },
  },
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
  DescribeUsersMessage,
  DescribeUsersResult,
  DescribeUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Engine: 0,
      UserId: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      Users: D.list({
        UserGroupIds: D.list(),
        Authentication: o_Authentication,
      }),
    },
  },
  errors: [
    InvalidParameterCombinationException,
    ServiceLinkedRoleNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsers",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Users",
    pageSize: "MaxRecords",
  } as const,
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
  DisassociateGlobalReplicationGroupMessage,
  DisassociateGlobalReplicationGroupResult,
  DisassociateGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GlobalReplicationGroupId: 0,
      ReplicationGroupId: 0,
      ReplicationGroupRegion: 0,
    },
    output: { GlobalReplicationGroup: o_GlobalReplicationGroup },
  },
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateGlobalReplicationGroup",
})) as any;

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
  ExportServerlessCacheSnapshotRequest,
  ExportServerlessCacheSnapshotResponse,
  ExportServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServerlessCacheSnapshotName: 0, S3BucketName: 0 },
    output: { ServerlessCacheSnapshot: o_ServerlessCacheSnapshot },
  },
  errors: [
    InvalidParameterValueException,
    InvalidServerlessCacheSnapshotStateFault,
    ServerlessCacheSnapshotNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportServerlessCacheSnapshot",
})) as any;

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
  FailoverGlobalReplicationGroupMessage,
  FailoverGlobalReplicationGroupResult,
  FailoverGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GlobalReplicationGroupId: 0,
      PrimaryRegion: 0,
      PrimaryReplicationGroupId: 0,
    },
    output: { GlobalReplicationGroup: o_GlobalReplicationGroup },
  },
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverGlobalReplicationGroup",
})) as any;

export type IncreaseNodeGroupsInGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Increase the number of node groups in the Global datastore
 */
export const increaseNodeGroupsInGlobalReplicationGroup: API.OperationMethod<
  IncreaseNodeGroupsInGlobalReplicationGroupMessage,
  IncreaseNodeGroupsInGlobalReplicationGroupResult,
  IncreaseNodeGroupsInGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GlobalReplicationGroupId: 0,
      NodeGroupCount: 0,
      RegionalConfigurations: D.list(
        {
          ReplicationGroupId: 0,
          ReplicationGroupRegion: 0,
          ReshardingConfiguration: D.list(i_ReshardingConfiguration, {
            item: "ReshardingConfiguration",
          }),
        },
        { item: "RegionalConfiguration" },
      ),
      ApplyImmediately: 0,
    },
    output: { GlobalReplicationGroup: o_GlobalReplicationGroup },
  },
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IncreaseNodeGroupsInGlobalReplicationGroup",
})) as any;

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
  IncreaseReplicaCountMessage,
  IncreaseReplicaCountResult,
  IncreaseReplicaCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationGroupId: 0,
      NewReplicaCount: 0,
      ReplicaConfiguration: D.list(i_ConfigureShard, {
        item: "ConfigureShard",
      }),
      ApplyImmediately: 0,
    },
    output: { ReplicationGroup: o_ReplicationGroup },
  },
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
})) as any;

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
  ListAllowedNodeTypeModificationsMessage,
  AllowedNodeTypeModificationsMessage,
  ListAllowedNodeTypeModificationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CacheClusterId: 0, ReplicationGroupId: 0 },
    output: {
      ScaleUpModifications: D.list(),
      ScaleDownModifications: D.list(),
    },
  },
  errors: [
    CacheClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAllowedNodeTypeModifications",
})) as any;

export type ListTagsForResourceError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | InvalidARNFault
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
 * tags to categorize and track all your ElastiCache resources, with the exception of
 * global replication group. When you add or remove tags on replication groups, those
 * actions will be replicated to all nodes in the replication group. For more information,
 * see Resource-level permissions.
 *
 * If the cluster is not in the *available* state,
 * `ListTagsForResource` returns an error.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceMessage,
  TagListMessage,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceName: 0 },
    output: { TagList: D.list({}, { item: "Tag" }) },
  },
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    InvalidARNFault,
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
})) as any;

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
  ModifyCacheClusterMessage,
  ModifyCacheClusterResult,
  ModifyCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheClusterId: 0,
      NumCacheNodes: 0,
      CacheNodeIdsToRemove: D.list(0, { item: "CacheNodeId" }),
      AZMode: 0,
      NewAvailabilityZones: D.list(0, { item: "PreferredAvailabilityZone" }),
      CacheSecurityGroupNames: D.list(0, { item: "CacheSecurityGroupName" }),
      SecurityGroupIds: D.list(0, { item: "SecurityGroupId" }),
      PreferredMaintenanceWindow: 0,
      NotificationTopicArn: 0,
      CacheParameterGroupName: 0,
      NotificationTopicStatus: 0,
      ApplyImmediately: 0,
      Engine: 0,
      EngineVersion: 0,
      AutoMinorVersionUpgrade: 0,
      SnapshotRetentionLimit: 0,
      SnapshotWindow: 0,
      CacheNodeType: 0,
      AuthToken: 0,
      AuthTokenUpdateStrategy: 0,
      LogDeliveryConfigurations: D.list(i_LogDeliveryConfigurationRequest, {
        item: "LogDeliveryConfigurationRequest",
      }),
      IpDiscovery: 0,
      ScaleConfig: { ScalePercentage: 0, ScaleIntervalMinutes: 0 },
    },
    output: { CacheCluster: o_CacheCluster },
  },
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
})) as any;

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
  ModifyCacheParameterGroupMessage,
  CacheParameterGroupNameMessage,
  ModifyCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheParameterGroupName: 0,
      ParameterNameValues: D.list(i_ParameterNameValue, {
        item: "ParameterNameValue",
      }),
    },
  },
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
})) as any;

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
  ModifyCacheSubnetGroupMessage,
  ModifyCacheSubnetGroupResult,
  ModifyCacheSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheSubnetGroupName: 0,
      CacheSubnetGroupDescription: 0,
      SubnetIds: D.list(0, { item: "SubnetIdentifier" }),
    },
    output: { CacheSubnetGroup: o_CacheSubnetGroup },
  },
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
})) as any;

export type ModifyGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Modifies the settings for a Global datastore.
 */
export const modifyGlobalReplicationGroup: API.OperationMethod<
  ModifyGlobalReplicationGroupMessage,
  ModifyGlobalReplicationGroupResult,
  ModifyGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GlobalReplicationGroupId: 0,
      ApplyImmediately: 0,
      CacheNodeType: 0,
      Engine: 0,
      EngineVersion: 0,
      CacheParameterGroupName: 0,
      GlobalReplicationGroupDescription: 0,
      AutomaticFailoverEnabled: 0,
    },
    output: { GlobalReplicationGroup: o_GlobalReplicationGroup },
  },
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyGlobalReplicationGroup",
})) as any;

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
  ModifyReplicationGroupMessage,
  ModifyReplicationGroupResult,
  ModifyReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationGroupId: 0,
      ReplicationGroupDescription: 0,
      PrimaryClusterId: 0,
      SnapshottingClusterId: 0,
      AutomaticFailoverEnabled: 0,
      MultiAZEnabled: 0,
      NodeGroupId: 0,
      CacheSecurityGroupNames: D.list(0, { item: "CacheSecurityGroupName" }),
      SecurityGroupIds: D.list(0, { item: "SecurityGroupId" }),
      PreferredMaintenanceWindow: 0,
      NotificationTopicArn: 0,
      CacheParameterGroupName: 0,
      NotificationTopicStatus: 0,
      ApplyImmediately: 0,
      Engine: 0,
      EngineVersion: 0,
      AutoMinorVersionUpgrade: 0,
      SnapshotRetentionLimit: 0,
      SnapshotWindow: 0,
      CacheNodeType: 0,
      AuthToken: 0,
      AuthTokenUpdateStrategy: 0,
      UserGroupIdsToAdd: 0,
      UserGroupIdsToRemove: 0,
      RemoveUserGroups: 0,
      LogDeliveryConfigurations: D.list(i_LogDeliveryConfigurationRequest, {
        item: "LogDeliveryConfigurationRequest",
      }),
      IpDiscovery: 0,
      TransitEncryptionEnabled: 0,
      TransitEncryptionMode: 0,
      ClusterMode: 0,
      Durability: 0,
    },
    output: { ReplicationGroup: o_ReplicationGroup },
  },
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
})) as any;

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
  ModifyReplicationGroupShardConfigurationMessage,
  ModifyReplicationGroupShardConfigurationResult,
  ModifyReplicationGroupShardConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationGroupId: 0,
      NodeGroupCount: 0,
      ApplyImmediately: 0,
      ReshardingConfiguration: D.list(i_ReshardingConfiguration, {
        item: "ReshardingConfiguration",
      }),
      NodeGroupsToRemove: D.list(0, { item: "NodeGroupToRemove" }),
      NodeGroupsToRetain: D.list(0, { item: "NodeGroupToRetain" }),
    },
    output: { ReplicationGroup: o_ReplicationGroup },
  },
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
})) as any;

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
  ModifyServerlessCacheRequest,
  ModifyServerlessCacheResponse,
  ModifyServerlessCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServerlessCacheName: 0,
      Description: 0,
      CacheUsageLimits: i_CacheUsageLimits,
      RemoveUserGroup: 0,
      UserGroupId: 0,
      SecurityGroupIds: D.list(0, { item: "SecurityGroupId" }),
      SnapshotRetentionLimit: 0,
      DailySnapshotTime: 0,
      Engine: 0,
      MajorEngineVersion: 0,
    },
    output: { ServerlessCache: o_ServerlessCache },
  },
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
})) as any;

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
  ModifyUserMessage,
  User,
  ModifyUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserId: 0,
      AccessString: 0,
      AppendAccessString: 0,
      Passwords: 0,
      NoPasswordRequired: 0,
      AuthenticationMode: i_AuthenticationMode,
      Engine: 0,
    },
    output: { UserGroupIds: D.list(), Authentication: o_Authentication },
  },
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
})) as any;

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
  ModifyUserGroupMessage,
  UserGroup,
  ModifyUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserGroupId: 0, UserIdsToAdd: 0, UserIdsToRemove: 0, Engine: 0 },
    output: {
      UserIds: D.list(),
      PendingChanges: o_UserGroupPendingChanges,
      ReplicationGroups: D.list(),
      ServerlessCaches: D.list(),
    },
  },
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
})) as any;

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
  PurchaseReservedCacheNodesOfferingMessage,
  PurchaseReservedCacheNodesOfferingResult,
  PurchaseReservedCacheNodesOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReservedCacheNodesOfferingId: 0,
      ReservedCacheNodeId: 0,
      CacheNodeCount: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { ReservedCacheNode: o_ReservedCacheNode },
  },
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
})) as any;

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
  RebalanceSlotsInGlobalReplicationGroupMessage,
  RebalanceSlotsInGlobalReplicationGroupResult,
  RebalanceSlotsInGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GlobalReplicationGroupId: 0, ApplyImmediately: 0 },
    output: { GlobalReplicationGroup: o_GlobalReplicationGroup },
  },
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebalanceSlotsInGlobalReplicationGroup",
})) as any;

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
  RebootCacheClusterMessage,
  RebootCacheClusterResult,
  RebootCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheClusterId: 0,
      CacheNodeIdsToReboot: D.list(0, { item: "CacheNodeId" }),
    },
    output: { CacheCluster: o_CacheCluster },
  },
  errors: [CacheClusterNotFoundFault, InvalidCacheClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootCacheCluster",
})) as any;

export type RemoveTagsFromResourceError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | InvalidARNFault
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
 * to categorize and track all your ElastiCache resources, with the exception of global
 * replication group. When you add or remove tags on replication groups, those actions will
 * be replicated to all nodes in the replication group. For more information, see Resource-level permissions.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceMessage,
  TagListMessage,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceName: 0, TagKeys: 0 },
    output: { TagList: D.list({}, { item: "Tag" }) },
  },
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    InvalidARNFault,
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
})) as any;

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
  ResetCacheParameterGroupMessage,
  CacheParameterGroupNameMessage,
  ResetCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheParameterGroupName: 0,
      ResetAllParameters: 0,
      ParameterNameValues: D.list(i_ParameterNameValue, {
        item: "ParameterNameValue",
      }),
    },
  },
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
})) as any;

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
  RevokeCacheSecurityGroupIngressMessage,
  RevokeCacheSecurityGroupIngressResult,
  RevokeCacheSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CacheSecurityGroupName: 0,
      EC2SecurityGroupName: 0,
      EC2SecurityGroupOwnerId: 0,
    },
    output: { CacheSecurityGroup: o_CacheSecurityGroup },
  },
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
})) as any;

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
  StartMigrationMessage,
  StartMigrationResponse,
  StartMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationGroupId: 0,
      CustomerNodeEndpointList: D.list(i_CustomerNodeEndpoint),
    },
    output: { ReplicationGroup: o_ReplicationGroup },
  },
  errors: [
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupAlreadyUnderMigrationFault,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMigration",
})) as any;

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
  TestFailoverMessage,
  TestFailoverResult,
  TestFailoverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplicationGroupId: 0, NodeGroupId: 0 },
    output: { ReplicationGroup: o_ReplicationGroup },
  },
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
})) as any;

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
  TestMigrationMessage,
  TestMigrationResponse,
  TestMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplicationGroupId: 0,
      CustomerNodeEndpointList: D.list(i_CustomerNodeEndpoint),
    },
    output: { ReplicationGroup: o_ReplicationGroup },
  },
  errors: [
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupAlreadyUnderMigrationFault,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestMigration",
})) as any;

const i_AuthenticationMode: D.LazyStruct = () => ({ Type: 0, Passwords: 0 });
const i_CacheUsageLimits: D.LazyStruct = () => ({
  DataStorage: { Maximum: 0, Minimum: 0, Unit: 0 },
  ECPUPerSecond: { Maximum: 0, Minimum: 0 },
});
const i_ConfigureShard: D.LazyStruct = () => ({
  NodeGroupId: 0,
  NewReplicaCount: 0,
  PreferredAvailabilityZones: D.list(0, { item: "PreferredAvailabilityZone" }),
  PreferredOutpostArns: D.list(0, { item: "PreferredOutpostArn" }),
});
const i_CustomerNodeEndpoint: D.LazyStruct = () => ({ Address: 0, Port: 0 });
const i_LogDeliveryConfigurationRequest: D.LazyStruct = () => ({
  LogType: 0,
  DestinationType: 0,
  DestinationDetails: {
    CloudWatchLogsDetails: { LogGroup: 0 },
    KinesisFirehoseDetails: { DeliveryStream: 0 },
  },
  LogFormat: 0,
  Enabled: 0,
});
const i_ParameterNameValue: D.LazyStruct = () => ({
  ParameterName: 0,
  ParameterValue: 0,
});
const i_ReshardingConfiguration: D.LazyStruct = () => ({
  NodeGroupId: 0,
  PreferredAvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Authentication: D.LazyStruct = () => ({ PasswordCount: D.num });
const o_CacheCluster: D.LazyStruct = () => ({
  ConfigurationEndpoint: o_Endpoint,
  NumCacheNodes: D.num,
  CacheClusterCreateTime: D.ts,
  PendingModifiedValues: {
    NumCacheNodes: D.num,
    CacheNodeIdsToRemove: D.list(0, { item: "CacheNodeId" }),
    LogDeliveryConfigurations: D.list(o_PendingLogDeliveryConfiguration),
    TransitEncryptionEnabled: D.bool,
    ScaleConfig: { ScalePercentage: D.num, ScaleIntervalMinutes: D.num },
  },
  NotificationConfiguration: {},
  CacheSecurityGroups: D.list({}, { item: "CacheSecurityGroup" }),
  CacheParameterGroup: {
    CacheNodeIdsToReboot: D.list(0, { item: "CacheNodeId" }),
  },
  CacheNodes: D.list(
    { CacheNodeCreateTime: D.ts, Endpoint: o_Endpoint },
    { item: "CacheNode" },
  ),
  AutoMinorVersionUpgrade: D.bool,
  SecurityGroups: D.list({}),
  SnapshotRetentionLimit: D.num,
  AuthTokenEnabled: D.bool,
  AuthTokenLastModifiedDate: D.ts,
  TransitEncryptionEnabled: D.bool,
  AtRestEncryptionEnabled: D.bool,
  ReplicationGroupLogDeliveryEnabled: D.bool,
  LogDeliveryConfigurations: D.list(o_LogDeliveryConfiguration, {
    item: "LogDeliveryConfiguration",
  }),
});
const o_CacheNodeTypeSpecificParameter: D.LazyStruct = () => ({
  IsModifiable: D.bool,
  CacheNodeTypeSpecificValues: D.list(
    {},
    { item: "CacheNodeTypeSpecificValue" },
  ),
});
const o_CacheParameterGroup: D.LazyStruct = () => ({ IsGlobal: D.bool });
const o_CacheSecurityGroup: D.LazyStruct = () => ({
  EC2SecurityGroups: D.list({}, { item: "EC2SecurityGroup" }),
});
const o_CacheSubnetGroup: D.LazyStruct = () => ({
  Subnets: D.list(
    {
      SubnetAvailabilityZone: {},
      SubnetOutpost: {},
      SupportedNetworkTypes: D.list(),
    },
    { item: "Subnet" },
  ),
  SupportedNetworkTypes: D.list(),
});
const o_GlobalReplicationGroup: D.LazyStruct = () => ({
  Members: D.list({}, { item: "GlobalReplicationGroupMember" }),
  ClusterEnabled: D.bool,
  GlobalNodeGroups: D.list({}, { item: "GlobalNodeGroup" }),
  AuthTokenEnabled: D.bool,
  TransitEncryptionEnabled: D.bool,
  AtRestEncryptionEnabled: D.bool,
});
const o_Parameter: D.LazyStruct = () => ({ IsModifiable: D.bool });
const o_RecurringCharge: D.LazyStruct = () => ({
  RecurringChargeAmount: D.num,
});
const o_ReplicationGroup: D.LazyStruct = () => ({
  GlobalReplicationGroupInfo: {},
  PendingModifiedValues: {
    Resharding: { SlotMigration: { ProgressPercentage: D.num } },
    UserGroups: { UserGroupIdsToAdd: D.list(), UserGroupIdsToRemove: D.list() },
    LogDeliveryConfigurations: D.list(o_PendingLogDeliveryConfiguration),
    TransitEncryptionEnabled: D.bool,
  },
  MemberClusters: D.list(0, { item: "ClusterId" }),
  NodeGroups: D.list(
    {
      PrimaryEndpoint: o_Endpoint,
      ReaderEndpoint: o_Endpoint,
      NodeGroupMembers: D.list(
        { ReadEndpoint: o_Endpoint },
        { item: "NodeGroupMember" },
      ),
    },
    { item: "NodeGroup" },
  ),
  ConfigurationEndpoint: o_Endpoint,
  SnapshotRetentionLimit: D.num,
  ClusterEnabled: D.bool,
  AuthTokenEnabled: D.bool,
  AuthTokenLastModifiedDate: D.ts,
  TransitEncryptionEnabled: D.bool,
  AtRestEncryptionEnabled: D.bool,
  MemberClustersOutpostArns: D.list(0, { item: "ReplicationGroupOutpostArn" }),
  UserGroupIds: D.list(),
  LogDeliveryConfigurations: D.list(o_LogDeliveryConfiguration, {
    item: "LogDeliveryConfiguration",
  }),
  ReplicationGroupCreateTime: D.ts,
  AutoMinorVersionUpgrade: D.bool,
});
const o_ReservedCacheNode: D.LazyStruct = () => ({
  StartTime: D.ts,
  Duration: D.num,
  FixedPrice: D.num,
  UsagePrice: D.num,
  CacheNodeCount: D.num,
  RecurringCharges: D.list(o_RecurringCharge, { item: "RecurringCharge" }),
});
const o_ServerlessCache: D.LazyStruct = () => ({
  CreateTime: D.ts,
  CacheUsageLimits: {
    DataStorage: { Maximum: D.num, Minimum: D.num },
    ECPUPerSecond: { Maximum: D.num, Minimum: D.num },
  },
  SecurityGroupIds: D.list(0, { item: "SecurityGroupId" }),
  Endpoint: o_Endpoint,
  ReaderEndpoint: o_Endpoint,
  SubnetIds: D.list(0, { item: "SubnetId" }),
  SnapshotRetentionLimit: D.num,
});
const o_ServerlessCacheSnapshot: D.LazyStruct = () => ({
  CreateTime: D.ts,
  ExpiryTime: D.ts,
  ServerlessCacheConfiguration: {},
});
const o_Snapshot: D.LazyStruct = () => ({
  NumCacheNodes: D.num,
  CacheClusterCreateTime: D.ts,
  Port: D.num,
  AutoMinorVersionUpgrade: D.bool,
  SnapshotRetentionLimit: D.num,
  NumNodeGroups: D.num,
  NodeSnapshots: D.list(
    {
      NodeGroupConfiguration: {
        ReplicaCount: D.num,
        ReplicaAvailabilityZones: D.list(0, { item: "AvailabilityZone" }),
        ReplicaOutpostArns: D.list(0, { item: "OutpostArn" }),
      },
      CacheNodeCreateTime: D.ts,
      SnapshotCreateTime: D.ts,
    },
    { item: "NodeSnapshot" },
  ),
});
const o_UserGroupPendingChanges: D.LazyStruct = () => ({
  UserIdsToRemove: D.list(),
  UserIdsToAdd: D.list(),
});
const o_Endpoint: D.LazyStruct = () => ({ Port: D.num });
const o_LogDeliveryConfiguration: D.LazyStruct = () => ({
  DestinationDetails: o_DestinationDetails,
});
const o_PendingLogDeliveryConfiguration: D.LazyStruct = () => ({
  DestinationDetails: o_DestinationDetails,
});
const o_DestinationDetails: D.LazyStruct = () => ({
  CloudWatchLogsDetails: {},
  KinesisFirehoseDetails: {},
});
