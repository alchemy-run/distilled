import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "MemoryDB",
  target: "AmazonMemoryDB",
  version: "2021-01-01",
  sigv4: "memorydb",
  protocol: awsJson1_1Protocol,
  xmlns: "http://memorydb.amazonaws.com/doc/2021-01-01/",
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
                `https://memory-db-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://memory-db-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://memory-db.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (Region === "fips") {
            return e(
              "https://memory-db-fips.us-west-1.amazonaws.com",
              {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "memorydb",
                    signingRegion: "us-west-1",
                  },
                ],
              },
              {},
            );
          }
          return e(
            `https://memory-db.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ACLAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ACLAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ACLAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ACLNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ACLNotFoundFault",
    ["BadRequestError"],
    { code: "ACLNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ACLQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ACLQuotaExceededFault",
    ["BadRequestError"],
    { code: "ACLQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class APICallRateForCustomerExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "APICallRateForCustomerExceededFault",
    ["BadRequestError"],
    { code: "APICallRateForCustomerExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ClusterAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterNotFoundFault",
    ["BadRequestError"],
    { code: "ClusterNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ClusterQuotaForCustomerExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterQuotaForCustomerExceededFault",
    ["BadRequestError"],
    { code: "ClusterQuotaForCustomerExceeded", status: 400 },
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
export class InsufficientClusterCapacityFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientClusterCapacityFault",
    ["BadRequestError"],
    { code: "InsufficientClusterCapacity", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidACLStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidACLStateFault",
    ["BadRequestError"],
    { code: "InvalidACLState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidARNFault
  extends /*@__PURE__*/ TE.TaggedError("InvalidARNFault", ["BadRequestError"], {
    code: "InvalidARN",
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidClusterStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClusterStateFault",
    ["BadRequestError"],
    { code: "InvalidClusterState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidCredentialsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCredentialsException",
    ["TimeoutError"],
    { status: 408 },
  )<{ readonly message?: string }> {}
export class InvalidKMSKeyFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidKMSKeyFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidMultiRegionClusterStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidMultiRegionClusterStateFault",
    ["BadRequestError"],
    { code: "InvalidMultiRegionClusterState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidNodeStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNodeStateFault",
    ["BadRequestError"],
    { code: "InvalidNodeState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterCombinationException",
    ["BadRequestError"],
    { code: "InvalidParameterCombination", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidParameterGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { code: "InvalidParameterValue", status: 400 },
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
export class MultiRegionClusterAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "MultiRegionClusterAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MultiRegionClusterNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "MultiRegionClusterNotFoundFault",
    ["BadRequestError"],
    { code: "MultiRegionClusterNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class MultiRegionParameterGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "MultiRegionParameterGroupNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
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
export class ParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ParameterGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ParameterGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ParameterGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ParameterGroupNotFoundFault",
    ["BadRequestError"],
    { code: "ParameterGroupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ParameterGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "ParameterGroupQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ReservedNodeAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedNodeAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ReservedNodeAlreadyExists", status: 404 },
  )<{ readonly message?: string }> {}
export class ReservedNodeNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedNodeNotFoundFault",
    ["BadRequestError"],
    { code: "ReservedNodeNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ReservedNodeQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedNodeQuotaExceededFault",
    ["BadRequestError"],
    { code: "ReservedNodeQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ReservedNodesOfferingNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedNodesOfferingNotFoundFault",
    ["BadRequestError"],
    { code: "ReservedNodesOfferingNotFound", status: 404 },
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
export class ShardNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ShardNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ShardsPerClusterQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ShardsPerClusterQuotaExceededFault",
    ["BadRequestError"],
    { code: "ShardsPerClusterQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
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
export class SubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "SubnetGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class SubnetGroupInUseFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetGroupInUseFault",
    ["BadRequestError"],
    { code: "SubnetGroupInUse", status: 400 },
  )<{ readonly message?: string }> {}
export class SubnetGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetGroupNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class SubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "SubnetGroupQuotaExceeded", status: 400 },
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
export class SubnetQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetQuotaExceededFault",
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
export type ClusterNameList = string[];
export interface ServiceUpdateRequest {
  ServiceUpdateNameToApply?: string;
}
export interface BatchUpdateClusterRequest {
  ClusterNames: string[];
  ServiceUpdate?: ServiceUpdateRequest;
}
export interface SlotMigration {
  ProgressPercentage?: number;
}
export interface ReshardingStatus {
  SlotMigration?: SlotMigration;
}
export type ACLName = string;
export interface ACLsUpdateStatus {
  ACLToApply?: string;
}
export type ServiceUpdateStatus =
  | "available"
  | "in-progress"
  | "complete"
  | "scheduled"
  | (string & {});
export interface PendingModifiedServiceUpdate {
  ServiceUpdateName?: string;
  Status?: ServiceUpdateStatus;
}
export type PendingModifiedServiceUpdateList = PendingModifiedServiceUpdate[];
export interface ClusterPendingUpdates {
  Resharding?: ReshardingStatus;
  ACLs?: ACLsUpdateStatus;
  ServiceUpdates?: PendingModifiedServiceUpdate[];
}
export interface Endpoint {
  Address?: string;
  Port?: number;
}
export interface Node {
  Name?: string;
  Status?: string;
  AvailabilityZone?: string;
  CreateTime?: Date;
  Endpoint?: Endpoint;
}
export type NodeList = Node[];
export interface Shard {
  Name?: string;
  Status?: string;
  Slots?: string;
  Nodes?: Node[];
  NumberOfNodes?: number;
}
export type ShardList = Shard[];
export type AZStatus = "singleaz" | "multiaz" | (string & {});
export interface SecurityGroupMembership {
  SecurityGroupId?: string;
  Status?: string;
}
export type SecurityGroupMembershipList = SecurityGroupMembership[];
export type DataTieringStatus = "true" | "false" | (string & {});
export type NetworkType = "ipv4" | "ipv6" | "dual_stack" | (string & {});
export type IpDiscovery = "ipv4" | "ipv6" | (string & {});
export interface Cluster {
  Name?: string;
  Description?: string;
  Status?: string;
  PendingUpdates?: ClusterPendingUpdates;
  MultiRegionClusterName?: string;
  NumberOfShards?: number;
  Shards?: Shard[];
  AvailabilityMode?: AZStatus;
  ClusterEndpoint?: Endpoint;
  NodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  EnginePatchVersion?: string;
  ParameterGroupName?: string;
  ParameterGroupStatus?: string;
  SecurityGroups?: SecurityGroupMembership[];
  SubnetGroupName?: string;
  TLSEnabled?: boolean;
  KmsKeyId?: string;
  ARN?: string;
  SnsTopicArn?: string;
  SnsTopicStatus?: string;
  SnapshotRetentionLimit?: number;
  MaintenanceWindow?: string;
  SnapshotWindow?: string;
  ACLName?: string;
  AutoMinorVersionUpgrade?: boolean;
  DataTiering?: DataTieringStatus;
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
}
export type ClusterList = Cluster[];
export interface UnprocessedCluster {
  ClusterName?: string;
  ErrorType?: string;
  ErrorMessage?: string;
}
export type UnprocessedClusterList = UnprocessedCluster[];
export interface BatchUpdateClusterResponse {
  ProcessedClusters?: Cluster[];
  UnprocessedClusters?: UnprocessedCluster[];
}
export type TargetBucket = string;
export type KmsKeyId = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface CopySnapshotRequest {
  SourceSnapshotName: string;
  TargetSnapshotName: string;
  TargetBucket?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export interface ShardConfiguration {
  Slots?: string;
  ReplicaCount?: number;
}
export interface ShardDetail {
  Name?: string;
  Configuration?: ShardConfiguration;
  Size?: string;
  SnapshotCreationTime?: Date;
}
export type ShardDetails = ShardDetail[];
export interface ClusterConfiguration {
  Name?: string;
  Description?: string;
  NodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  MaintenanceWindow?: string;
  TopicArn?: string;
  Port?: number;
  ParameterGroupName?: string;
  SubnetGroupName?: string;
  VpcId?: string;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  NumShards?: number;
  Shards?: ShardDetail[];
  MultiRegionParameterGroupName?: string;
  MultiRegionClusterName?: string;
}
export interface Snapshot {
  Name?: string;
  Status?: string;
  Source?: string;
  KmsKeyId?: string;
  ARN?: string;
  ClusterConfiguration?: ClusterConfiguration;
  DataTiering?: DataTieringStatus;
}
export interface CopySnapshotResponse {
  Snapshot?: Snapshot;
}
export type UserName = string;
export type UserNameListInput = string[];
export interface CreateACLRequest {
  ACLName: string;
  UserNames?: string[];
  Tags?: Tag[];
}
export type UserNameList = string[];
export interface ACLPendingChanges {
  UserNamesToRemove?: string[];
  UserNamesToAdd?: string[];
}
export type ACLClusterNameList = string[];
export interface ACL {
  Name?: string;
  Status?: string;
  UserNames?: string[];
  MinimumEngineVersion?: string;
  PendingChanges?: ACLPendingChanges;
  Clusters?: string[];
  ARN?: string;
}
export interface CreateACLResponse {
  ACL?: ACL;
}
export type SecurityGroupIdsList = string[];
export type SnapshotArnsList = string[];
export interface CreateClusterRequest {
  ClusterName: string;
  NodeType: string;
  MultiRegionClusterName?: string;
  ParameterGroupName?: string;
  Description?: string;
  NumShards?: number;
  NumReplicasPerShard?: number;
  SubnetGroupName?: string;
  SecurityGroupIds?: string[];
  MaintenanceWindow?: string;
  Port?: number;
  SnsTopicArn?: string;
  TLSEnabled?: boolean;
  KmsKeyId?: string;
  SnapshotArns?: string[];
  SnapshotName?: string;
  SnapshotRetentionLimit?: number;
  Tags?: Tag[];
  SnapshotWindow?: string;
  ACLName: string;
  Engine?: string;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  DataTiering?: boolean;
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
}
export interface CreateClusterResponse {
  Cluster?: Cluster;
}
export interface CreateMultiRegionClusterRequest {
  MultiRegionClusterNameSuffix: string;
  Description?: string;
  Engine?: string;
  EngineVersion?: string;
  NodeType: string;
  MultiRegionParameterGroupName?: string;
  NumShards?: number;
  TLSEnabled?: boolean;
  Tags?: Tag[];
}
export interface RegionalCluster {
  ClusterName?: string;
  Region?: string;
  Status?: string;
  ARN?: string;
}
export type RegionalClusterList = RegionalCluster[];
export interface MultiRegionCluster {
  MultiRegionClusterName?: string;
  Description?: string;
  Status?: string;
  NodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  NumberOfShards?: number;
  Clusters?: RegionalCluster[];
  MultiRegionParameterGroupName?: string;
  TLSEnabled?: boolean;
  ARN?: string;
}
export interface CreateMultiRegionClusterResponse {
  MultiRegionCluster?: MultiRegionCluster;
}
export interface CreateParameterGroupRequest {
  ParameterGroupName: string;
  Family: string;
  Description?: string;
  Tags?: Tag[];
}
export interface ParameterGroup {
  Name?: string;
  Family?: string;
  Description?: string;
  ARN?: string;
}
export interface CreateParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export interface CreateSnapshotRequest {
  ClusterName: string;
  SnapshotName: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export interface CreateSnapshotResponse {
  Snapshot?: Snapshot;
}
export type SubnetIdentifierList = string[];
export interface CreateSubnetGroupRequest {
  SubnetGroupName: string;
  Description?: string;
  SubnetIds: string[];
  Tags?: Tag[];
}
export interface AvailabilityZone {
  Name?: string;
}
export type NetworkTypeList = NetworkType[];
export interface Subnet {
  Identifier?: string;
  AvailabilityZone?: AvailabilityZone;
  SupportedNetworkTypes?: NetworkType[];
}
export type SubnetList = Subnet[];
export interface SubnetGroup {
  Name?: string;
  Description?: string;
  VpcId?: string;
  Subnets?: Subnet[];
  ARN?: string;
  SupportedNetworkTypes?: NetworkType[];
}
export interface CreateSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export type InputAuthenticationType = "password" | "iam" | (string & {});
export type PasswordListInput = string[];
export interface AuthenticationMode {
  Type?: InputAuthenticationType;
  Passwords?: Array<string | redacted.Redacted<string>>;
}
export type AccessString = string;
export interface CreateUserRequest {
  UserName: string;
  AuthenticationMode: AuthenticationMode;
  AccessString: string;
  Tags?: Tag[];
}
export type ACLNameList = string[];
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
  Name?: string;
  Status?: string;
  AccessString?: string;
  ACLNames?: string[];
  MinimumEngineVersion?: string;
  Authentication?: Authentication;
  ARN?: string;
}
export interface CreateUserResponse {
  User?: User;
}
export interface DeleteACLRequest {
  ACLName: string;
}
export interface DeleteACLResponse {
  ACL?: ACL;
}
export interface DeleteClusterRequest {
  ClusterName: string;
  MultiRegionClusterName?: string;
  FinalSnapshotName?: string;
}
export interface DeleteClusterResponse {
  Cluster?: Cluster;
}
export interface DeleteMultiRegionClusterRequest {
  MultiRegionClusterName: string;
}
export interface DeleteMultiRegionClusterResponse {
  MultiRegionCluster?: MultiRegionCluster;
}
export interface DeleteParameterGroupRequest {
  ParameterGroupName: string;
}
export interface DeleteParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export interface DeleteSnapshotRequest {
  SnapshotName: string;
}
export interface DeleteSnapshotResponse {
  Snapshot?: Snapshot;
}
export interface DeleteSubnetGroupRequest {
  SubnetGroupName: string;
}
export interface DeleteSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export interface DeleteUserRequest {
  UserName: string;
}
export interface DeleteUserResponse {
  User?: User;
}
export interface DescribeACLsRequest {
  ACLName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ACLList = ACL[];
export interface DescribeACLsResponse {
  ACLs?: ACL[];
  NextToken?: string;
}
export interface DescribeClustersRequest {
  ClusterName?: string;
  MaxResults?: number;
  NextToken?: string;
  ShowShardDetails?: boolean;
}
export interface DescribeClustersResponse {
  NextToken?: string;
  Clusters?: Cluster[];
}
export interface DescribeEngineVersionsRequest {
  Engine?: string;
  EngineVersion?: string;
  ParameterGroupFamily?: string;
  MaxResults?: number;
  NextToken?: string;
  DefaultOnly?: boolean;
}
export interface EngineVersionInfo {
  Engine?: string;
  EngineVersion?: string;
  EnginePatchVersion?: string;
  ParameterGroupFamily?: string;
}
export type EngineVersionInfoList = EngineVersionInfo[];
export interface DescribeEngineVersionsResponse {
  NextToken?: string;
  EngineVersions?: EngineVersionInfo[];
}
export type SourceType =
  | "node"
  | "parameter-group"
  | "subnet-group"
  | "cluster"
  | "user"
  | "acl"
  | (string & {});
export interface DescribeEventsRequest {
  SourceName?: string;
  SourceType?: SourceType;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  MaxResults?: number;
  NextToken?: string;
}
export interface Event {
  SourceName?: string;
  SourceType?: SourceType;
  Message?: string;
  Date?: Date;
}
export type EventList = Event[];
export interface DescribeEventsResponse {
  NextToken?: string;
  Events?: Event[];
}
export interface DescribeMultiRegionClustersRequest {
  MultiRegionClusterName?: string;
  MaxResults?: number;
  NextToken?: string;
  ShowClusterDetails?: boolean;
}
export type MultiRegionClusterList = MultiRegionCluster[];
export interface DescribeMultiRegionClustersResponse {
  NextToken?: string;
  MultiRegionClusters?: MultiRegionCluster[];
}
export interface DescribeMultiRegionParameterGroupsRequest {
  MultiRegionParameterGroupName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface MultiRegionParameterGroup {
  Name?: string;
  Family?: string;
  Description?: string;
  ARN?: string;
}
export type MultiRegionParameterGroupList = MultiRegionParameterGroup[];
export interface DescribeMultiRegionParameterGroupsResponse {
  NextToken?: string;
  MultiRegionParameterGroups?: MultiRegionParameterGroup[];
}
export interface DescribeMultiRegionParametersRequest {
  MultiRegionParameterGroupName: string;
  Source?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface MultiRegionParameter {
  Name?: string;
  Value?: string;
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  MinimumEngineVersion?: string;
}
export type MultiRegionParametersList = MultiRegionParameter[];
export interface DescribeMultiRegionParametersResponse {
  NextToken?: string;
  MultiRegionParameters?: MultiRegionParameter[];
}
export interface DescribeParameterGroupsRequest {
  ParameterGroupName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ParameterGroupList = ParameterGroup[];
export interface DescribeParameterGroupsResponse {
  NextToken?: string;
  ParameterGroups?: ParameterGroup[];
}
export interface DescribeParametersRequest {
  ParameterGroupName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface Parameter {
  Name?: string;
  Value?: string;
  Description?: string;
  DataType?: string;
  AllowedValues?: string;
  MinimumEngineVersion?: string;
}
export type ParametersList = Parameter[];
export interface DescribeParametersResponse {
  NextToken?: string;
  Parameters?: Parameter[];
}
export interface DescribeReservedNodesRequest {
  ReservationId?: string;
  ReservedNodesOfferingId?: string;
  NodeType?: string;
  Duration?: string;
  OfferingType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface RecurringCharge {
  RecurringChargeAmount?: number;
  RecurringChargeFrequency?: string;
}
export type RecurringChargeList = RecurringCharge[];
export interface ReservedNode {
  ReservationId?: string;
  ReservedNodesOfferingId?: string;
  NodeType?: string;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  NodeCount?: number;
  OfferingType?: string;
  State?: string;
  RecurringCharges?: RecurringCharge[];
  ARN?: string;
}
export type ReservedNodeList = ReservedNode[];
export interface DescribeReservedNodesResponse {
  NextToken?: string;
  ReservedNodes?: ReservedNode[];
}
export interface DescribeReservedNodesOfferingsRequest {
  ReservedNodesOfferingId?: string;
  NodeType?: string;
  Duration?: string;
  OfferingType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ReservedNodesOffering {
  ReservedNodesOfferingId?: string;
  NodeType?: string;
  Duration?: number;
  FixedPrice?: number;
  OfferingType?: string;
  RecurringCharges?: RecurringCharge[];
}
export type ReservedNodesOfferingList = ReservedNodesOffering[];
export interface DescribeReservedNodesOfferingsResponse {
  NextToken?: string;
  ReservedNodesOfferings?: ReservedNodesOffering[];
}
export type ServiceUpdateStatusList = ServiceUpdateStatus[];
export interface DescribeServiceUpdatesRequest {
  ServiceUpdateName?: string;
  ClusterNames?: string[];
  Status?: ServiceUpdateStatus[];
  MaxResults?: number;
  NextToken?: string;
}
export type ServiceUpdateType = "security-update" | (string & {});
export interface ServiceUpdate {
  ClusterName?: string;
  ServiceUpdateName?: string;
  ReleaseDate?: Date;
  Description?: string;
  Status?: ServiceUpdateStatus;
  Type?: ServiceUpdateType;
  Engine?: string;
  NodesUpdated?: string;
  AutoUpdateStartDate?: Date;
}
export type ServiceUpdateList = ServiceUpdate[];
export interface DescribeServiceUpdatesResponse {
  NextToken?: string;
  ServiceUpdates?: ServiceUpdate[];
}
export interface DescribeSnapshotsRequest {
  ClusterName?: string;
  SnapshotName?: string;
  Source?: string;
  NextToken?: string;
  MaxResults?: number;
  ShowDetail?: boolean;
}
export type SnapshotList = Snapshot[];
export interface DescribeSnapshotsResponse {
  NextToken?: string;
  Snapshots?: Snapshot[];
}
export interface DescribeSubnetGroupsRequest {
  SubnetGroupName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type SubnetGroupList = SubnetGroup[];
export interface DescribeSubnetGroupsResponse {
  NextToken?: string;
  SubnetGroups?: SubnetGroup[];
}
export type FilterName = string;
export type FilterValue = string;
export type FilterValueList = string[];
export interface Filter {
  Name: string;
  Values: string[];
}
export type FilterList = Filter[];
export interface DescribeUsersRequest {
  UserName?: string;
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type UserList = User[];
export interface DescribeUsersResponse {
  Users?: User[];
  NextToken?: string;
}
export interface FailoverShardRequest {
  ClusterName: string;
  ShardName: string;
}
export interface FailoverShardResponse {
  Cluster?: Cluster;
}
export interface ListAllowedMultiRegionClusterUpdatesRequest {
  MultiRegionClusterName: string;
}
export type NodeTypeList = string[];
export interface ListAllowedMultiRegionClusterUpdatesResponse {
  ScaleUpNodeTypes?: string[];
  ScaleDownNodeTypes?: string[];
}
export interface ListAllowedNodeTypeUpdatesRequest {
  ClusterName: string;
}
export interface ListAllowedNodeTypeUpdatesResponse {
  ScaleUpNodeTypes?: string[];
  ScaleDownNodeTypes?: string[];
}
export interface ListTagsRequest {
  ResourceArn: string;
}
export interface ListTagsResponse {
  TagList?: Tag[];
}
export interface PurchaseReservedNodesOfferingRequest {
  ReservedNodesOfferingId: string;
  ReservationId?: string;
  NodeCount?: number;
  Tags?: Tag[];
}
export interface PurchaseReservedNodesOfferingResponse {
  ReservedNode?: ReservedNode;
}
export type ParameterNameList = string[];
export interface ResetParameterGroupRequest {
  ParameterGroupName: string;
  AllParameters?: boolean;
  ParameterNames?: string[];
}
export interface ResetParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {
  TagList?: Tag[];
}
export type KeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {
  TagList?: Tag[];
}
export interface UpdateACLRequest {
  ACLName: string;
  UserNamesToAdd?: string[];
  UserNamesToRemove?: string[];
}
export interface UpdateACLResponse {
  ACL?: ACL;
}
export interface ReplicaConfigurationRequest {
  ReplicaCount?: number;
}
export interface ShardConfigurationRequest {
  ShardCount?: number;
}
export interface UpdateClusterRequest {
  ClusterName: string;
  Description?: string;
  SecurityGroupIds?: string[];
  MaintenanceWindow?: string;
  SnsTopicArn?: string;
  SnsTopicStatus?: string;
  ParameterGroupName?: string;
  SnapshotWindow?: string;
  SnapshotRetentionLimit?: number;
  NodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  ReplicaConfiguration?: ReplicaConfigurationRequest;
  ShardConfiguration?: ShardConfigurationRequest;
  ACLName?: string;
  IpDiscovery?: IpDiscovery;
}
export interface UpdateClusterResponse {
  Cluster?: Cluster;
}
export type UpdateStrategy = "coordinated" | "uncoordinated" | (string & {});
export interface UpdateMultiRegionClusterRequest {
  MultiRegionClusterName: string;
  NodeType?: string;
  Description?: string;
  EngineVersion?: string;
  ShardConfiguration?: ShardConfigurationRequest;
  MultiRegionParameterGroupName?: string;
  UpdateStrategy?: UpdateStrategy;
}
export interface UpdateMultiRegionClusterResponse {
  MultiRegionCluster?: MultiRegionCluster;
}
export interface ParameterNameValue {
  ParameterName?: string;
  ParameterValue?: string;
}
export type ParameterNameValueList = ParameterNameValue[];
export interface UpdateParameterGroupRequest {
  ParameterGroupName: string;
  ParameterNameValues: ParameterNameValue[];
}
export interface UpdateParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export interface UpdateSubnetGroupRequest {
  SubnetGroupName: string;
  Description?: string;
  SubnetIds?: string[];
}
export interface UpdateSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export interface UpdateUserRequest {
  UserName: string;
  AuthenticationMode?: AuthenticationMode;
  AccessString?: string;
}
export interface UpdateUserResponse {
  User?: User;
}
export type AwsQueryErrorMessage = string;
export type ExceptionMessage = string;
export type BatchUpdateClusterError =
  | InvalidParameterValueException
  | ServiceUpdateNotFoundFault
  | InvalidParameterCombinationException
  | CommonErrors;
/**
 * Apply the service update to a list of clusters supplied. For more information on service updates and applying them, see Applying the service updates.
 */
export const batchUpdateCluster: API.OperationMethod<
  BatchUpdateClusterRequest,
  BatchUpdateClusterResponse,
  BatchUpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterNames: 0, ServiceUpdate: { ServiceUpdateNameToApply: 0 } },
    output: { ProcessedClusters: D.list(o_Cluster) },
  },
  errors: [
    InvalidParameterValueException,
    ServiceUpdateNotFoundFault,
    InvalidParameterCombinationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateCluster",
})) as any;

export type CopySnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidSnapshotStateFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotAlreadyExistsFault
  | SnapshotNotFoundFault
  | SnapshotQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Makes a copy of an existing snapshot.
 */
export const copySnapshot: API.OperationMethod<
  CopySnapshotRequest,
  CopySnapshotResponse,
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
      Tags: D.list(i_Tag),
    },
    output: { Snapshot: o_Snapshot },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidSnapshotStateFault,
    ServiceLinkedRoleNotFoundFault,
    SnapshotAlreadyExistsFault,
    SnapshotNotFoundFault,
    SnapshotQuotaExceededFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopySnapshot",
})) as any;

export type CreateACLError =
  | ACLAlreadyExistsFault
  | ACLQuotaExceededFault
  | DefaultUserRequired
  | DuplicateUserNameFault
  | InvalidParameterValueException
  | TagQuotaPerResourceExceeded
  | UserNotFoundFault
  | CommonErrors;
/**
 * Creates an Access Control List. For more information, see Authenticating users with Access Contol Lists (ACLs).
 */
export const createACL: API.OperationMethod<
  CreateACLRequest,
  CreateACLResponse,
  CreateACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ACLName: 0, UserNames: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    ACLAlreadyExistsFault,
    ACLQuotaExceededFault,
    DefaultUserRequired,
    DuplicateUserNameFault,
    InvalidParameterValueException,
    TagQuotaPerResourceExceeded,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateACL",
})) as any;

export type CreateClusterError =
  | ACLNotFoundFault
  | ClusterAlreadyExistsFault
  | ClusterQuotaForCustomerExceededFault
  | InsufficientClusterCapacityFault
  | InvalidACLStateFault
  | InvalidCredentialsException
  | InvalidMultiRegionClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidVPCNetworkStateFault
  | MultiRegionClusterNotFoundFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | ShardsPerClusterQuotaExceededFault
  | SubnetGroupNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a cluster. All nodes in the cluster run the same protocol-compliant engine software.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      NodeType: 0,
      MultiRegionClusterName: 0,
      ParameterGroupName: 0,
      Description: 0,
      NumShards: 0,
      NumReplicasPerShard: 0,
      SubnetGroupName: 0,
      SecurityGroupIds: 0,
      MaintenanceWindow: 0,
      Port: 0,
      SnsTopicArn: 0,
      TLSEnabled: 0,
      KmsKeyId: 0,
      SnapshotArns: 0,
      SnapshotName: 0,
      SnapshotRetentionLimit: 0,
      Tags: D.list(i_Tag),
      SnapshotWindow: 0,
      ACLName: 0,
      Engine: 0,
      EngineVersion: 0,
      AutoMinorVersionUpgrade: 0,
      DataTiering: 0,
      NetworkType: 0,
      IpDiscovery: 0,
    },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ACLNotFoundFault,
    ClusterAlreadyExistsFault,
    ClusterQuotaForCustomerExceededFault,
    InsufficientClusterCapacityFault,
    InvalidACLStateFault,
    InvalidCredentialsException,
    InvalidMultiRegionClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidVPCNetworkStateFault,
    MultiRegionClusterNotFoundFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    ShardsPerClusterQuotaExceededFault,
    SubnetGroupNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
})) as any;

export type CreateMultiRegionClusterError =
  | ClusterQuotaForCustomerExceededFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionClusterAlreadyExistsFault
  | MultiRegionParameterGroupNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a new multi-Region cluster.
 */
export const createMultiRegionCluster: API.OperationMethod<
  CreateMultiRegionClusterRequest,
  CreateMultiRegionClusterResponse,
  CreateMultiRegionClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MultiRegionClusterNameSuffix: 0,
      Description: 0,
      Engine: 0,
      EngineVersion: 0,
      NodeType: 0,
      MultiRegionParameterGroupName: 0,
      NumShards: 0,
      TLSEnabled: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    ClusterQuotaForCustomerExceededFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterAlreadyExistsFault,
    MultiRegionParameterGroupNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiRegionCluster",
})) as any;

export type CreateParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupAlreadyExistsFault
  | ParameterGroupQuotaExceededFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a new MemoryDB parameter group. A parameter group is a collection of parameters and their values that are applied to all of the nodes in any cluster. For
 * more information, see Configuring engine parameters using parameter groups.
 */
export const createParameterGroup: API.OperationMethod<
  CreateParameterGroupRequest,
  CreateParameterGroupResponse,
  CreateParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ParameterGroupName: 0,
      Family: 0,
      Description: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupAlreadyExistsFault,
    ParameterGroupQuotaExceededFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateParameterGroup",
})) as any;

export type CreateSnapshotError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | SnapshotAlreadyExistsFault
  | SnapshotQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a copy of an entire cluster at a specific moment in time.
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotRequest,
  CreateSnapshotResponse,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      SnapshotName: 0,
      KmsKeyId: 0,
      Tags: D.list(i_Tag),
    },
    output: { Snapshot: o_Snapshot },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    SnapshotAlreadyExistsFault,
    SnapshotQuotaExceededFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
})) as any;

export type CreateSubnetGroupError =
  | InvalidSubnet
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupAlreadyExistsFault
  | SubnetGroupQuotaExceededFault
  | SubnetNotAllowedFault
  | SubnetQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a subnet group. A subnet group is a collection of subnets (typically private) that you can designate for your clusters running in an Amazon Virtual Private Cloud (VPC) environment.
 *
 * When you create a cluster in an Amazon VPC, you must specify a subnet group. MemoryDB uses that subnet group to choose a subnet and IP addresses within that subnet to associate with your nodes.
 * For more information, see Subnets and subnet groups.
 */
export const createSubnetGroup: API.OperationMethod<
  CreateSubnetGroupRequest,
  CreateSubnetGroupResponse,
  CreateSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SubnetGroupName: 0,
      Description: 0,
      SubnetIds: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidSubnet,
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupAlreadyExistsFault,
    SubnetGroupQuotaExceededFault,
    SubnetNotAllowedFault,
    SubnetQuotaExceededFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubnetGroup",
})) as any;

export type CreateUserError =
  | DuplicateUserNameFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | TagQuotaPerResourceExceeded
  | UserAlreadyExistsFault
  | UserQuotaExceededFault
  | CommonErrors;
/**
 * Creates a MemoryDB user. For more information, see Authenticating users with Access Contol Lists (ACLs).
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserName: 0,
      AuthenticationMode: i_AuthenticationMode,
      AccessString: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    DuplicateUserNameFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    TagQuotaPerResourceExceeded,
    UserAlreadyExistsFault,
    UserQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
})) as any;

export type DeleteACLError =
  | ACLNotFoundFault
  | InvalidACLStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Deletes an Access Control List. The ACL must first be disassociated from the cluster before it can be deleted. For more information, see Authenticating users with Access Contol Lists (ACLs).
 */
export const deleteACL: API.OperationMethod<
  DeleteACLRequest,
  DeleteACLResponse,
  DeleteACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ACLName: 0 } },
  errors: [
    ACLNotFoundFault,
    InvalidACLStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteACL",
})) as any;

export type DeleteClusterError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | SnapshotAlreadyExistsFault
  | CommonErrors;
/**
 * Deletes a cluster. It also deletes all associated nodes and node endpoints.
 *
 * `CreateSnapshot` permission is required to create a final snapshot.
 * Without this permission, the API call will fail with an `Access Denied` exception.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterName: 0, MultiRegionClusterName: 0, FinalSnapshotName: 0 },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    SnapshotAlreadyExistsFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
})) as any;

export type DeleteMultiRegionClusterError =
  | InvalidMultiRegionClusterStateFault
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | CommonErrors;
/**
 * Deletes an existing multi-Region cluster.
 */
export const deleteMultiRegionCluster: API.OperationMethod<
  DeleteMultiRegionClusterRequest,
  DeleteMultiRegionClusterResponse,
  DeleteMultiRegionClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MultiRegionClusterName: 0 } },
  errors: [
    InvalidMultiRegionClusterStateFault,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiRegionCluster",
})) as any;

export type DeleteParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified parameter group. You cannot delete a parameter group if it is associated with any clusters.
 * You cannot delete the default parameter groups in your account.
 */
export const deleteParameterGroup: API.OperationMethod<
  DeleteParameterGroupRequest,
  DeleteParameterGroupResponse,
  DeleteParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ParameterGroupName: 0 } },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteParameterGroup",
})) as any;

export type DeleteSnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidSnapshotStateFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotNotFoundFault
  | CommonErrors;
/**
 * Deletes an existing snapshot. When you receive a successful response from this operation, MemoryDB immediately begins deleting the snapshot; you cannot cancel or revert this operation.
 */
export const deleteSnapshot: API.OperationMethod<
  DeleteSnapshotRequest,
  DeleteSnapshotResponse,
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
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
})) as any;

export type DeleteSubnetGroupError =
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupInUseFault
  | SubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Deletes a subnet group. You cannot delete a default subnet group or one that is associated with any clusters.
 */
export const deleteSubnetGroup: API.OperationMethod<
  DeleteSubnetGroupRequest,
  DeleteSubnetGroupResponse,
  DeleteSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SubnetGroupName: 0 } },
  errors: [
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupInUseFault,
    SubnetGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubnetGroup",
})) as any;

export type DeleteUserError =
  | InvalidParameterValueException
  | InvalidUserStateFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Deletes a user. The user will be removed from all ACLs and in turn removed from all clusters.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0 } },
  errors: [
    InvalidParameterValueException,
    InvalidUserStateFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

export type DescribeACLsError =
  | ACLNotFoundFault
  | InvalidParameterCombinationException
  | CommonErrors;
/**
 * Returns a list of ACLs.
 */
export const describeACLs: API.PaginatedOperationMethod<
  DescribeACLsRequest,
  DescribeACLsResponse,
  DescribeACLsError,
  Credentials | HttpClient.HttpClient,
  ACL
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ACLName: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [ACLNotFoundFault, InvalidParameterCombinationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeACLs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ACLs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeClustersError =
  | ClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns information about all provisioned clusters if no cluster identifier is specified, or about a specific cluster if a cluster name is supplied.
 */
export const describeClusters: API.PaginatedOperationMethod<
  DescribeClustersRequest,
  DescribeClustersResponse,
  DescribeClustersError,
  Credentials | HttpClient.HttpClient,
  Cluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ClusterName: 0, MaxResults: 0, NextToken: 0, ShowShardDetails: 0 },
    output: { Clusters: D.list(o_Cluster) },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Clusters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeEngineVersionsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns a list of the available Redis OSS engine versions.
 */
export const describeEngineVersions: API.PaginatedOperationMethod<
  DescribeEngineVersionsRequest,
  DescribeEngineVersionsResponse,
  DescribeEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  EngineVersionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Engine: 0,
      EngineVersion: 0,
      ParameterGroupFamily: 0,
      MaxResults: 0,
      NextToken: 0,
      DefaultOnly: 0,
    },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngineVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeEventsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns events related to clusters, security groups, and parameter groups. You can obtain events specific to a particular cluster, security group, or parameter group by providing the name as a parameter.
 *
 * By default, only the events occurring within the last hour are returned; however, you can retrieve up to 14 days' worth of events if necessary.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsRequest,
  DescribeEventsResponse,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceName: 0,
      SourceType: 0,
      StartTime: 0,
      EndTime: 0,
      Duration: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Events: D.list({ Date: D.ts }) },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMultiRegionClustersError =
  | ClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | CommonErrors;
/**
 * Returns details about one or more multi-Region clusters.
 */
export const describeMultiRegionClusters: API.PaginatedOperationMethod<
  DescribeMultiRegionClustersRequest,
  DescribeMultiRegionClustersResponse,
  DescribeMultiRegionClustersError,
  Credentials | HttpClient.HttpClient,
  MultiRegionCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MultiRegionClusterName: 0,
      MaxResults: 0,
      NextToken: 0,
      ShowClusterDetails: 0,
    },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiRegionClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MultiRegionClusters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMultiRegionParameterGroupsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns a list of multi-region parameter groups.
 */
export const describeMultiRegionParameterGroups: API.OperationMethod<
  DescribeMultiRegionParameterGroupsRequest,
  DescribeMultiRegionParameterGroupsResponse,
  DescribeMultiRegionParameterGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MultiRegionParameterGroupName: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiRegionParameterGroups",
})) as any;

export type DescribeMultiRegionParametersError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns the detailed parameter list for a particular multi-region parameter group.
 */
export const describeMultiRegionParameters: API.OperationMethod<
  DescribeMultiRegionParametersRequest,
  DescribeMultiRegionParametersResponse,
  DescribeMultiRegionParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MultiRegionParameterGroupName: 0,
      Source: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiRegionParameters",
})) as any;

export type DescribeParameterGroupsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns a list of parameter group descriptions. If a parameter group name is specified, the list contains only the descriptions for that group.
 */
export const describeParameterGroups: API.PaginatedOperationMethod<
  DescribeParameterGroupsRequest,
  DescribeParameterGroupsResponse,
  DescribeParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  ParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ParameterGroupName: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeParameterGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ParameterGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeParametersError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns the detailed parameter list for a particular parameter group.
 */
export const describeParameters: API.PaginatedOperationMethod<
  DescribeParametersRequest,
  DescribeParametersResponse,
  DescribeParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ParameterGroupName: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeParameters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Parameters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeReservedNodesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedNodeNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns information about reserved nodes for this account, or about a specified reserved node.
 */
export const describeReservedNodes: API.PaginatedOperationMethod<
  DescribeReservedNodesRequest,
  DescribeReservedNodesResponse,
  DescribeReservedNodesError,
  Credentials | HttpClient.HttpClient,
  ReservedNode
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ReservationId: 0,
      ReservedNodesOfferingId: 0,
      NodeType: 0,
      Duration: 0,
      OfferingType: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { ReservedNodes: D.list(o_ReservedNode) },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedNodeNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReservedNodes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeReservedNodesOfferingsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedNodesOfferingNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Lists available reserved node offerings.
 */
export const describeReservedNodesOfferings: API.PaginatedOperationMethod<
  DescribeReservedNodesOfferingsRequest,
  DescribeReservedNodesOfferingsResponse,
  DescribeReservedNodesOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedNodesOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ReservedNodesOfferingId: 0,
      NodeType: 0,
      Duration: 0,
      OfferingType: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedNodesOfferingNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodesOfferings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReservedNodesOfferings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeServiceUpdatesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns details of the service updates.
 */
export const describeServiceUpdates: API.PaginatedOperationMethod<
  DescribeServiceUpdatesRequest,
  DescribeServiceUpdatesResponse,
  DescribeServiceUpdatesError,
  Credentials | HttpClient.HttpClient,
  ServiceUpdate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceUpdateName: 0,
      ClusterNames: 0,
      Status: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      ServiceUpdates: D.list({ ReleaseDate: D.ts, AutoUpdateStartDate: D.ts }),
    },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceUpdates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceUpdates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSnapshotsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | SnapshotNotFoundFault
  | CommonErrors;
/**
 * Returns information about cluster snapshots. By default, DescribeSnapshots lists all of your snapshots; it can optionally describe a single snapshot,
 * or just the snapshots associated with a particular cluster.
 */
export const describeSnapshots: API.PaginatedOperationMethod<
  DescribeSnapshotsRequest,
  DescribeSnapshotsResponse,
  DescribeSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      SnapshotName: 0,
      Source: 0,
      NextToken: 0,
      MaxResults: 0,
      ShowDetail: 0,
    },
    output: { Snapshots: D.list(o_Snapshot) },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Snapshots",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSubnetGroupsError =
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a list of subnet group descriptions. If a subnet group name is specified, the list contains only the description of that group.
 */
export const describeSubnetGroups: API.PaginatedOperationMethod<
  DescribeSubnetGroupsRequest,
  DescribeSubnetGroupsResponse,
  DescribeSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  SubnetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { SubnetGroupName: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [ServiceLinkedRoleNotFoundFault, SubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubnetGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SubnetGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeUsersError =
  | InvalidParameterCombinationException
  | UserNotFoundFault
  | CommonErrors;
/**
 * Returns a list of users.
 */
export const describeUsers: API.PaginatedOperationMethod<
  DescribeUsersRequest,
  DescribeUsersResponse,
  DescribeUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      UserName: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [InvalidParameterCombinationException, UserNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type FailoverShardError =
  | APICallRateForCustomerExceededFault
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidKMSKeyFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ShardNotFoundFault
  | TestFailoverNotAvailableFault
  | CommonErrors;
/**
 * Used to failover a shard. This API is designed for testing the behavior of your application in case of MemoryDB failover. It is not designed to be used as a production-level tool for initiating
 * a failover to overcome a problem you may have with the cluster. Moreover, in certain conditions such as large scale operational events, Amazon may block this API.
 */
export const failoverShard: API.OperationMethod<
  FailoverShardRequest,
  FailoverShardResponse,
  FailoverShardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterName: 0, ShardName: 0 },
    output: { Cluster: o_Cluster },
  },
  errors: [
    APICallRateForCustomerExceededFault,
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidKMSKeyFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ShardNotFoundFault,
    TestFailoverNotAvailableFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverShard",
})) as any;

export type ListAllowedMultiRegionClusterUpdatesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | CommonErrors;
/**
 * Lists the allowed updates for a multi-Region cluster.
 */
export const listAllowedMultiRegionClusterUpdates: API.OperationMethod<
  ListAllowedMultiRegionClusterUpdatesRequest,
  ListAllowedMultiRegionClusterUpdatesResponse,
  ListAllowedMultiRegionClusterUpdatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MultiRegionClusterName: 0 } },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAllowedMultiRegionClusterUpdates",
})) as any;

export type ListAllowedNodeTypeUpdatesError =
  | ClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Lists all available node types that you can scale to from your cluster's current node type.
 *
 * When you use the UpdateCluster operation to scale your cluster, the value of the NodeType parameter must be one of the node types returned by this operation.
 */
export const listAllowedNodeTypeUpdates: API.OperationMethod<
  ListAllowedNodeTypeUpdatesRequest,
  ListAllowedNodeTypeUpdatesResponse,
  ListAllowedNodeTypeUpdatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClusterName: 0 } },
  errors: [
    ClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAllowedNodeTypeUpdates",
})) as any;

export type ListTagsError =
  | ACLNotFoundFault
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | MultiRegionClusterNotFoundFault
  | MultiRegionParameterGroupNotFoundFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotNotFoundFault
  | SubnetGroupNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Lists all tags currently on a named resource. A tag is a key-value pair where the key and value are case-sensitive. You can use tags to categorize and track your MemoryDB resources. For more information, see Tagging your MemoryDB resources.
 *
 * When you add or remove tags from multi region clusters, you might not immediately see the latest effective tags in the ListTags API response due to it being eventually consistent specifically for multi region clusters. For more information, see Tagging your MemoryDB resources.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    ACLNotFoundFault,
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    MultiRegionClusterNotFoundFault,
    MultiRegionParameterGroupNotFoundFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
    SubnetGroupNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
})) as any;

export type PurchaseReservedNodesOfferingError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeQuotaExceededFault
  | ReservedNodesOfferingNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Allows you to purchase a reserved node offering. Reserved nodes are not eligible for cancellation and are non-refundable.
 */
export const purchaseReservedNodesOffering: API.OperationMethod<
  PurchaseReservedNodesOfferingRequest,
  PurchaseReservedNodesOfferingResponse,
  PurchaseReservedNodesOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReservedNodesOfferingId: 0,
      ReservationId: 0,
      NodeCount: 0,
      Tags: D.list(i_Tag),
    },
    output: { ReservedNode: o_ReservedNode },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeQuotaExceededFault,
    ReservedNodesOfferingNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseReservedNodesOffering",
})) as any;

export type ResetParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Modifies the parameters of a parameter group to the engine or system default value. You can reset specific parameters by submitting a list of parameter names. To reset the entire parameter group, specify the AllParameters and ParameterGroupName parameters.
 */
export const resetParameterGroup: API.OperationMethod<
  ResetParameterGroupRequest,
  ResetParameterGroupResponse,
  ResetParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ParameterGroupName: 0, AllParameters: 0, ParameterNames: 0 },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetParameterGroup",
})) as any;

export type TagResourceError =
  | ACLNotFoundFault
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | MultiRegionParameterGroupNotFoundFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotNotFoundFault
  | SubnetGroupNotFoundFault
  | TagQuotaPerResourceExceeded
  | UserNotFoundFault
  | CommonErrors;
/**
 * Use this operation to add tags to a resource. A tag is a key-value pair where the key and value are case-sensitive. You can use tags to categorize and track all your MemoryDB resources. For more information, see Tagging your MemoryDB resources.
 *
 * When you add tags to multi region clusters, you might not immediately see the latest effective tags in the ListTags API response due to it being eventually consistent specifically for multi region clusters. For more information, see Tagging your MemoryDB resources.
 *
 * You can specify cost-allocation tags for your MemoryDB resources, Amazon generates a cost allocation report as a comma-separated value
 * (CSV) file with your usage and costs aggregated by your tags. You can apply tags that represent business categories
 * (such as cost centers, application names, or owners) to organize your costs across multiple services.
 *
 * For more information, see Using Cost Allocation Tags.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    ACLNotFoundFault,
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
    MultiRegionParameterGroupNotFoundFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
    SubnetGroupNotFoundFault,
    TagQuotaPerResourceExceeded,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ACLNotFoundFault
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | MultiRegionParameterGroupNotFoundFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotNotFoundFault
  | SubnetGroupNotFoundFault
  | TagNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Use this operation to remove tags on a resource. A tag is a key-value pair where the key and value are case-sensitive. You can use tags to categorize and track all your MemoryDB resources. For more information, see Tagging your MemoryDB resources.
 *
 * When you remove tags from multi region clusters, you might not immediately see the latest effective tags in the ListTags API response due to it being eventually consistent specifically for multi region clusters. For more information, see Tagging your MemoryDB resources.
 *
 * You can specify cost-allocation tags for your MemoryDB resources, Amazon generates a cost allocation report as a comma-separated value
 * (CSV) file with your usage and costs aggregated by your tags. You can apply tags that represent business categories
 * (such as cost centers, application names, or owners) to organize your costs across multiple services.
 *
 * For more information, see Using Cost Allocation Tags.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    ACLNotFoundFault,
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
    MultiRegionParameterGroupNotFoundFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
    SubnetGroupNotFoundFault,
    TagNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateACLError =
  | ACLNotFoundFault
  | DefaultUserRequired
  | DuplicateUserNameFault
  | InvalidACLStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | UserNotFoundFault
  | CommonErrors;
/**
 * Changes the list of users that belong to the Access Control List.
 */
export const updateACL: API.OperationMethod<
  UpdateACLRequest,
  UpdateACLResponse,
  UpdateACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ACLName: 0, UserNamesToAdd: 0, UserNamesToRemove: 0 },
  },
  errors: [
    ACLNotFoundFault,
    DefaultUserRequired,
    DuplicateUserNameFault,
    InvalidACLStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateACL",
})) as any;

export type UpdateClusterError =
  | ACLNotFoundFault
  | ClusterNotFoundFault
  | ClusterQuotaForCustomerExceededFault
  | InvalidACLStateFault
  | InvalidClusterStateFault
  | InvalidKMSKeyFault
  | InvalidNodeStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | NoOperationFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | ShardsPerClusterQuotaExceededFault
  | CommonErrors;
/**
 * Modifies the settings for a cluster. You can use this operation to change one or more cluster configuration settings by specifying the settings and the new values.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterRequest,
  UpdateClusterResponse,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      Description: 0,
      SecurityGroupIds: 0,
      MaintenanceWindow: 0,
      SnsTopicArn: 0,
      SnsTopicStatus: 0,
      ParameterGroupName: 0,
      SnapshotWindow: 0,
      SnapshotRetentionLimit: 0,
      NodeType: 0,
      Engine: 0,
      EngineVersion: 0,
      ReplicaConfiguration: { ReplicaCount: 0 },
      ShardConfiguration: i_ShardConfigurationRequest,
      ACLName: 0,
      IpDiscovery: 0,
    },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ACLNotFoundFault,
    ClusterNotFoundFault,
    ClusterQuotaForCustomerExceededFault,
    InvalidACLStateFault,
    InvalidClusterStateFault,
    InvalidKMSKeyFault,
    InvalidNodeStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    NoOperationFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    ShardsPerClusterQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
})) as any;

export type UpdateMultiRegionClusterError =
  | InvalidMultiRegionClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | MultiRegionParameterGroupNotFoundFault
  | CommonErrors;
/**
 * Updates the configuration of an existing multi-Region cluster.
 */
export const updateMultiRegionCluster: API.OperationMethod<
  UpdateMultiRegionClusterRequest,
  UpdateMultiRegionClusterResponse,
  UpdateMultiRegionClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MultiRegionClusterName: 0,
      NodeType: 0,
      Description: 0,
      EngineVersion: 0,
      ShardConfiguration: i_ShardConfigurationRequest,
      MultiRegionParameterGroupName: 0,
      UpdateStrategy: 0,
    },
  },
  errors: [
    InvalidMultiRegionClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
    MultiRegionParameterGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMultiRegionCluster",
})) as any;

export type UpdateParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Updates the parameters of a parameter group. You can modify up to 20 parameters in a single request by submitting a list parameter name and value pairs.
 */
export const updateParameterGroup: API.OperationMethod<
  UpdateParameterGroupRequest,
  UpdateParameterGroupResponse,
  UpdateParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ParameterGroupName: 0,
      ParameterNameValues: D.list({ ParameterName: 0, ParameterValue: 0 }),
    },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateParameterGroup",
})) as any;

export type UpdateSubnetGroupError =
  | InvalidSubnet
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupNotFoundFault
  | SubnetInUse
  | SubnetNotAllowedFault
  | SubnetQuotaExceededFault
  | CommonErrors;
/**
 * Updates a subnet group. For more information, see Updating a subnet group
 */
export const updateSubnetGroup: API.OperationMethod<
  UpdateSubnetGroupRequest,
  UpdateSubnetGroupResponse,
  UpdateSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SubnetGroupName: 0, Description: 0, SubnetIds: 0 },
  },
  errors: [
    InvalidSubnet,
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupNotFoundFault,
    SubnetInUse,
    SubnetNotAllowedFault,
    SubnetQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubnetGroup",
})) as any;

export type UpdateUserError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidUserStateFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Changes user password(s) and/or access string.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserName: 0,
      AuthenticationMode: i_AuthenticationMode,
      AccessString: 0,
    },
  },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidUserStateFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
})) as any;

const i_AuthenticationMode: D.LazyStruct = () => ({ Type: 0, Passwords: 0 });
const i_ShardConfigurationRequest: D.LazyStruct = () => ({ ShardCount: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Cluster: D.LazyStruct = () => ({
  Shards: D.list({ Nodes: D.list({ CreateTime: D.ts }) }),
});
const o_ReservedNode: D.LazyStruct = () => ({ StartTime: D.ts });
const o_Snapshot: D.LazyStruct = () => ({
  ClusterConfiguration: { Shards: D.list({ SnapshotCreationTime: D.ts }) },
});
