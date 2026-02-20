import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const ns = T.XmlNamespace("http://memorydb.amazonaws.com/doc/2021-01-01/");
const svc = T.AwsApiService({
  sdkId: "MemoryDB",
  serviceShapeName: "AmazonMemoryDB",
});
const auth = T.AwsAuthSigv4({ name: "memorydb" });
const ver = T.ServiceVersion("2021-01-01");
const proto = T.AwsProtocolsAwsJson1_1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type ACLName = string;
export type AwsQueryErrorMessage = string;
export type ExceptionMessage = string;
export type TargetBucket = string;
export type KmsKeyId = string;
export type UserName = string;
export type AccessString = string;
export type FilterName = string;
export type FilterValue = string;

//# Schemas
export type ClusterNameList = string[];
export const ClusterNameList = S.Array(S.String);
export interface ServiceUpdateRequest {
  ServiceUpdateNameToApply?: string;
}
export const ServiceUpdateRequest = S.suspend(() =>
  S.Struct({ ServiceUpdateNameToApply: S.optional(S.String) }),
).annotate({
  identifier: "ServiceUpdateRequest",
}) as any as S.Schema<ServiceUpdateRequest>;
export interface BatchUpdateClusterRequest {
  ClusterNames: string[];
  ServiceUpdate?: ServiceUpdateRequest;
}
export const BatchUpdateClusterRequest = S.suspend(() =>
  S.Struct({
    ClusterNames: ClusterNameList,
    ServiceUpdate: S.optional(ServiceUpdateRequest),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateClusterRequest",
}) as any as S.Schema<BatchUpdateClusterRequest>;
export interface SlotMigration {
  ProgressPercentage?: number;
}
export const SlotMigration = S.suspend(() =>
  S.Struct({ ProgressPercentage: S.optional(S.Number) }),
).annotate({ identifier: "SlotMigration" }) as any as S.Schema<SlotMigration>;
export interface ReshardingStatus {
  SlotMigration?: SlotMigration;
}
export const ReshardingStatus = S.suspend(() =>
  S.Struct({ SlotMigration: S.optional(SlotMigration) }),
).annotate({
  identifier: "ReshardingStatus",
}) as any as S.Schema<ReshardingStatus>;
export interface ACLsUpdateStatus {
  ACLToApply?: string;
}
export const ACLsUpdateStatus = S.suspend(() =>
  S.Struct({ ACLToApply: S.optional(S.String) }),
).annotate({
  identifier: "ACLsUpdateStatus",
}) as any as S.Schema<ACLsUpdateStatus>;
export type ServiceUpdateStatus =
  | "available"
  | "in-progress"
  | "complete"
  | "scheduled"
  | (string & {});
export const ServiceUpdateStatus = S.String;
export interface PendingModifiedServiceUpdate {
  ServiceUpdateName?: string;
  Status?: ServiceUpdateStatus;
}
export const PendingModifiedServiceUpdate = S.suspend(() =>
  S.Struct({
    ServiceUpdateName: S.optional(S.String),
    Status: S.optional(ServiceUpdateStatus),
  }),
).annotate({
  identifier: "PendingModifiedServiceUpdate",
}) as any as S.Schema<PendingModifiedServiceUpdate>;
export type PendingModifiedServiceUpdateList = PendingModifiedServiceUpdate[];
export const PendingModifiedServiceUpdateList = S.Array(
  PendingModifiedServiceUpdate.pipe(
    T.XmlName("PendingModifiedServiceUpdate"),
  ).annotate({ identifier: "PendingModifiedServiceUpdate" }),
);
export interface ClusterPendingUpdates {
  Resharding?: ReshardingStatus;
  ACLs?: ACLsUpdateStatus;
  ServiceUpdates?: PendingModifiedServiceUpdate[];
}
export const ClusterPendingUpdates = S.suspend(() =>
  S.Struct({
    Resharding: S.optional(ReshardingStatus),
    ACLs: S.optional(ACLsUpdateStatus),
    ServiceUpdates: S.optional(PendingModifiedServiceUpdateList),
  }),
).annotate({
  identifier: "ClusterPendingUpdates",
}) as any as S.Schema<ClusterPendingUpdates>;
export interface Endpoint {
  Address?: string;
  Port?: number;
}
export const Endpoint = S.suspend(() =>
  S.Struct({ Address: S.optional(S.String), Port: S.optional(S.Number) }),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export interface Node {
  Name?: string;
  Status?: string;
  AvailabilityZone?: string;
  CreateTime?: Date;
  Endpoint?: Endpoint;
}
export const Node = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Endpoint: S.optional(Endpoint),
  }),
).annotate({ identifier: "Node" }) as any as S.Schema<Node>;
export type NodeList = Node[];
export const NodeList = S.Array(
  Node.pipe(T.XmlName("Node")).annotate({ identifier: "Node" }),
);
export interface Shard {
  Name?: string;
  Status?: string;
  Slots?: string;
  Nodes?: Node[];
  NumberOfNodes?: number;
}
export const Shard = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(S.String),
    Slots: S.optional(S.String),
    Nodes: S.optional(NodeList),
    NumberOfNodes: S.optional(S.Number),
  }),
).annotate({ identifier: "Shard" }) as any as S.Schema<Shard>;
export type ShardList = Shard[];
export const ShardList = S.Array(
  Shard.pipe(T.XmlName("Shard")).annotate({ identifier: "Shard" }),
);
export type AZStatus = "singleaz" | "multiaz" | (string & {});
export const AZStatus = S.String;
export interface SecurityGroupMembership {
  SecurityGroupId?: string;
  Status?: string;
}
export const SecurityGroupMembership = S.suspend(() =>
  S.Struct({
    SecurityGroupId: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "SecurityGroupMembership",
}) as any as S.Schema<SecurityGroupMembership>;
export type SecurityGroupMembershipList = SecurityGroupMembership[];
export const SecurityGroupMembershipList = S.Array(SecurityGroupMembership);
export type DataTieringStatus = "true" | "false" | (string & {});
export const DataTieringStatus = S.String;
export type NetworkType = "ipv4" | "ipv6" | "dual_stack" | (string & {});
export const NetworkType = S.String;
export type IpDiscovery = "ipv4" | "ipv6" | (string & {});
export const IpDiscovery = S.String;
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
export const Cluster = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(S.String),
    PendingUpdates: S.optional(ClusterPendingUpdates),
    MultiRegionClusterName: S.optional(S.String),
    NumberOfShards: S.optional(S.Number),
    Shards: S.optional(ShardList),
    AvailabilityMode: S.optional(AZStatus),
    ClusterEndpoint: S.optional(Endpoint),
    NodeType: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    EnginePatchVersion: S.optional(S.String),
    ParameterGroupName: S.optional(S.String),
    ParameterGroupStatus: S.optional(S.String),
    SecurityGroups: S.optional(SecurityGroupMembershipList),
    SubnetGroupName: S.optional(S.String),
    TLSEnabled: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    ARN: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    SnsTopicStatus: S.optional(S.String),
    SnapshotRetentionLimit: S.optional(S.Number),
    MaintenanceWindow: S.optional(S.String),
    SnapshotWindow: S.optional(S.String),
    ACLName: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    DataTiering: S.optional(DataTieringStatus),
    NetworkType: S.optional(NetworkType),
    IpDiscovery: S.optional(IpDiscovery),
  }),
).annotate({ identifier: "Cluster" }) as any as S.Schema<Cluster>;
export type ClusterList = Cluster[];
export const ClusterList = S.Array(
  Cluster.pipe(T.XmlName("Cluster")).annotate({ identifier: "Cluster" }),
);
export interface UnprocessedCluster {
  ClusterName?: string;
  ErrorType?: string;
  ErrorMessage?: string;
}
export const UnprocessedCluster = S.suspend(() =>
  S.Struct({
    ClusterName: S.optional(S.String),
    ErrorType: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UnprocessedCluster",
}) as any as S.Schema<UnprocessedCluster>;
export type UnprocessedClusterList = UnprocessedCluster[];
export const UnprocessedClusterList = S.Array(
  UnprocessedCluster.pipe(T.XmlName("UnprocessedCluster")).annotate({
    identifier: "UnprocessedCluster",
  }),
);
export interface BatchUpdateClusterResponse {
  ProcessedClusters?: Cluster[];
  UnprocessedClusters?: UnprocessedCluster[];
}
export const BatchUpdateClusterResponse = S.suspend(() =>
  S.Struct({
    ProcessedClusters: S.optional(ClusterList),
    UnprocessedClusters: S.optional(UnprocessedClusterList),
  }).pipe(ns),
).annotate({
  identifier: "BatchUpdateClusterResponse",
}) as any as S.Schema<BatchUpdateClusterResponse>;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(
  Tag.pipe(T.XmlName("Tag")).annotate({ identifier: "Tag" }),
);
export interface CopySnapshotRequest {
  SourceSnapshotName: string;
  TargetSnapshotName: string;
  TargetBucket?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export const CopySnapshotRequest = S.suspend(() =>
  S.Struct({
    SourceSnapshotName: S.String,
    TargetSnapshotName: S.String,
    TargetBucket: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CopySnapshotRequest",
}) as any as S.Schema<CopySnapshotRequest>;
export interface ShardConfiguration {
  Slots?: string;
  ReplicaCount?: number;
}
export const ShardConfiguration = S.suspend(() =>
  S.Struct({ Slots: S.optional(S.String), ReplicaCount: S.optional(S.Number) }),
).annotate({
  identifier: "ShardConfiguration",
}) as any as S.Schema<ShardConfiguration>;
export interface ShardDetail {
  Name?: string;
  Configuration?: ShardConfiguration;
  Size?: string;
  SnapshotCreationTime?: Date;
}
export const ShardDetail = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Configuration: S.optional(ShardConfiguration),
    Size: S.optional(S.String),
    SnapshotCreationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ShardDetail" }) as any as S.Schema<ShardDetail>;
export type ShardDetails = ShardDetail[];
export const ShardDetails = S.Array(ShardDetail);
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
export const ClusterConfiguration = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    NodeType: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    MaintenanceWindow: S.optional(S.String),
    TopicArn: S.optional(S.String),
    Port: S.optional(S.Number),
    ParameterGroupName: S.optional(S.String),
    SubnetGroupName: S.optional(S.String),
    VpcId: S.optional(S.String),
    SnapshotRetentionLimit: S.optional(S.Number),
    SnapshotWindow: S.optional(S.String),
    NumShards: S.optional(S.Number),
    Shards: S.optional(ShardDetails),
    MultiRegionParameterGroupName: S.optional(S.String),
    MultiRegionClusterName: S.optional(S.String),
  }),
).annotate({
  identifier: "ClusterConfiguration",
}) as any as S.Schema<ClusterConfiguration>;
export interface Snapshot {
  Name?: string;
  Status?: string;
  Source?: string;
  KmsKeyId?: string;
  ARN?: string;
  ClusterConfiguration?: ClusterConfiguration;
  DataTiering?: DataTieringStatus;
}
export const Snapshot = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(S.String),
    Source: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    ARN: S.optional(S.String),
    ClusterConfiguration: S.optional(ClusterConfiguration),
    DataTiering: S.optional(DataTieringStatus),
  }),
).annotate({ identifier: "Snapshot" }) as any as S.Schema<Snapshot>;
export interface CopySnapshotResponse {
  Snapshot?: Snapshot;
}
export const CopySnapshotResponse = S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "CopySnapshotResponse",
}) as any as S.Schema<CopySnapshotResponse>;
export type UserNameListInput = string[];
export const UserNameListInput = S.Array(S.String);
export interface CreateACLRequest {
  ACLName: string;
  UserNames?: string[];
  Tags?: Tag[];
}
export const CreateACLRequest = S.suspend(() =>
  S.Struct({
    ACLName: S.String,
    UserNames: S.optional(UserNameListInput),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateACLRequest",
}) as any as S.Schema<CreateACLRequest>;
export type UserNameList = string[];
export const UserNameList = S.Array(S.String);
export interface ACLPendingChanges {
  UserNamesToRemove?: string[];
  UserNamesToAdd?: string[];
}
export const ACLPendingChanges = S.suspend(() =>
  S.Struct({
    UserNamesToRemove: S.optional(UserNameList),
    UserNamesToAdd: S.optional(UserNameList),
  }),
).annotate({
  identifier: "ACLPendingChanges",
}) as any as S.Schema<ACLPendingChanges>;
export type ACLClusterNameList = string[];
export const ACLClusterNameList = S.Array(S.String);
export interface ACL {
  Name?: string;
  Status?: string;
  UserNames?: string[];
  MinimumEngineVersion?: string;
  PendingChanges?: ACLPendingChanges;
  Clusters?: string[];
  ARN?: string;
}
export const ACL = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(S.String),
    UserNames: S.optional(UserNameList),
    MinimumEngineVersion: S.optional(S.String),
    PendingChanges: S.optional(ACLPendingChanges),
    Clusters: S.optional(ACLClusterNameList),
    ARN: S.optional(S.String),
  }),
).annotate({ identifier: "ACL" }) as any as S.Schema<ACL>;
export interface CreateACLResponse {
  ACL?: ACL;
}
export const CreateACLResponse = S.suspend(() =>
  S.Struct({ ACL: S.optional(ACL) }).pipe(ns),
).annotate({
  identifier: "CreateACLResponse",
}) as any as S.Schema<CreateACLResponse>;
export type SecurityGroupIdsList = string[];
export const SecurityGroupIdsList = S.Array(
  S.String.pipe(T.XmlName("SecurityGroupId")),
);
export type SnapshotArnsList = string[];
export const SnapshotArnsList = S.Array(
  S.String.pipe(T.XmlName("SnapshotArn")),
);
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
export const CreateClusterRequest = S.suspend(() =>
  S.Struct({
    ClusterName: S.String,
    NodeType: S.String,
    MultiRegionClusterName: S.optional(S.String),
    ParameterGroupName: S.optional(S.String),
    Description: S.optional(S.String),
    NumShards: S.optional(S.Number),
    NumReplicasPerShard: S.optional(S.Number),
    SubnetGroupName: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdsList),
    MaintenanceWindow: S.optional(S.String),
    Port: S.optional(S.Number),
    SnsTopicArn: S.optional(S.String),
    TLSEnabled: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    SnapshotArns: S.optional(SnapshotArnsList),
    SnapshotName: S.optional(S.String),
    SnapshotRetentionLimit: S.optional(S.Number),
    Tags: S.optional(TagList),
    SnapshotWindow: S.optional(S.String),
    ACLName: S.String,
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    DataTiering: S.optional(S.Boolean),
    NetworkType: S.optional(NetworkType),
    IpDiscovery: S.optional(IpDiscovery),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateClusterRequest",
}) as any as S.Schema<CreateClusterRequest>;
export interface CreateClusterResponse {
  Cluster?: Cluster;
}
export const CreateClusterResponse = S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "CreateClusterResponse",
}) as any as S.Schema<CreateClusterResponse>;
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
export const CreateMultiRegionClusterRequest = S.suspend(() =>
  S.Struct({
    MultiRegionClusterNameSuffix: S.String,
    Description: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    NodeType: S.String,
    MultiRegionParameterGroupName: S.optional(S.String),
    NumShards: S.optional(S.Number),
    TLSEnabled: S.optional(S.Boolean),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMultiRegionClusterRequest",
}) as any as S.Schema<CreateMultiRegionClusterRequest>;
export interface RegionalCluster {
  ClusterName?: string;
  Region?: string;
  Status?: string;
  ARN?: string;
}
export const RegionalCluster = S.suspend(() =>
  S.Struct({
    ClusterName: S.optional(S.String),
    Region: S.optional(S.String),
    Status: S.optional(S.String),
    ARN: S.optional(S.String),
  }),
).annotate({
  identifier: "RegionalCluster",
}) as any as S.Schema<RegionalCluster>;
export type RegionalClusterList = RegionalCluster[];
export const RegionalClusterList = S.Array(
  RegionalCluster.pipe(T.XmlName("RegionalCluster")).annotate({
    identifier: "RegionalCluster",
  }),
);
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
export const MultiRegionCluster = S.suspend(() =>
  S.Struct({
    MultiRegionClusterName: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(S.String),
    NodeType: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    NumberOfShards: S.optional(S.Number),
    Clusters: S.optional(RegionalClusterList),
    MultiRegionParameterGroupName: S.optional(S.String),
    TLSEnabled: S.optional(S.Boolean),
    ARN: S.optional(S.String),
  }),
).annotate({
  identifier: "MultiRegionCluster",
}) as any as S.Schema<MultiRegionCluster>;
export interface CreateMultiRegionClusterResponse {
  MultiRegionCluster?: MultiRegionCluster;
}
export const CreateMultiRegionClusterResponse = S.suspend(() =>
  S.Struct({ MultiRegionCluster: S.optional(MultiRegionCluster) }).pipe(ns),
).annotate({
  identifier: "CreateMultiRegionClusterResponse",
}) as any as S.Schema<CreateMultiRegionClusterResponse>;
export interface CreateParameterGroupRequest {
  ParameterGroupName: string;
  Family: string;
  Description?: string;
  Tags?: Tag[];
}
export const CreateParameterGroupRequest = S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.String,
    Family: S.String,
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateParameterGroupRequest",
}) as any as S.Schema<CreateParameterGroupRequest>;
export interface ParameterGroup {
  Name?: string;
  Family?: string;
  Description?: string;
  ARN?: string;
}
export const ParameterGroup = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Family: S.optional(S.String),
    Description: S.optional(S.String),
    ARN: S.optional(S.String),
  }),
).annotate({ identifier: "ParameterGroup" }) as any as S.Schema<ParameterGroup>;
export interface CreateParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export const CreateParameterGroupResponse = S.suspend(() =>
  S.Struct({ ParameterGroup: S.optional(ParameterGroup) }).pipe(ns),
).annotate({
  identifier: "CreateParameterGroupResponse",
}) as any as S.Schema<CreateParameterGroupResponse>;
export interface CreateSnapshotRequest {
  ClusterName: string;
  SnapshotName: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export const CreateSnapshotRequest = S.suspend(() =>
  S.Struct({
    ClusterName: S.String,
    SnapshotName: S.String,
    KmsKeyId: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSnapshotRequest",
}) as any as S.Schema<CreateSnapshotRequest>;
export interface CreateSnapshotResponse {
  Snapshot?: Snapshot;
}
export const CreateSnapshotResponse = S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "CreateSnapshotResponse",
}) as any as S.Schema<CreateSnapshotResponse>;
export type SubnetIdentifierList = string[];
export const SubnetIdentifierList = S.Array(
  S.String.pipe(T.XmlName("SubnetIdentifier")),
);
export interface CreateSubnetGroupRequest {
  SubnetGroupName: string;
  Description?: string;
  SubnetIds: string[];
  Tags?: Tag[];
}
export const CreateSubnetGroupRequest = S.suspend(() =>
  S.Struct({
    SubnetGroupName: S.String,
    Description: S.optional(S.String),
    SubnetIds: SubnetIdentifierList,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSubnetGroupRequest",
}) as any as S.Schema<CreateSubnetGroupRequest>;
export interface AvailabilityZone {
  Name?: string;
}
export const AvailabilityZone = S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "AvailabilityZone",
}) as any as S.Schema<AvailabilityZone>;
export type NetworkTypeList = NetworkType[];
export const NetworkTypeList = S.Array(NetworkType);
export interface Subnet {
  Identifier?: string;
  AvailabilityZone?: AvailabilityZone;
  SupportedNetworkTypes?: NetworkType[];
}
export const Subnet = S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    AvailabilityZone: S.optional(AvailabilityZone),
    SupportedNetworkTypes: S.optional(NetworkTypeList),
  }),
).annotate({ identifier: "Subnet" }) as any as S.Schema<Subnet>;
export type SubnetList = Subnet[];
export const SubnetList = S.Array(
  Subnet.pipe(T.XmlName("Subnet")).annotate({ identifier: "Subnet" }),
);
export interface SubnetGroup {
  Name?: string;
  Description?: string;
  VpcId?: string;
  Subnets?: Subnet[];
  ARN?: string;
  SupportedNetworkTypes?: NetworkType[];
}
export const SubnetGroup = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    VpcId: S.optional(S.String),
    Subnets: S.optional(SubnetList),
    ARN: S.optional(S.String),
    SupportedNetworkTypes: S.optional(NetworkTypeList),
  }),
).annotate({ identifier: "SubnetGroup" }) as any as S.Schema<SubnetGroup>;
export interface CreateSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export const CreateSubnetGroupResponse = S.suspend(() =>
  S.Struct({ SubnetGroup: S.optional(SubnetGroup) }).pipe(ns),
).annotate({
  identifier: "CreateSubnetGroupResponse",
}) as any as S.Schema<CreateSubnetGroupResponse>;
export type InputAuthenticationType = "password" | "iam" | (string & {});
export const InputAuthenticationType = S.String;
export type PasswordListInput = string[];
export const PasswordListInput = S.Array(S.String);
export interface AuthenticationMode {
  Type?: InputAuthenticationType;
  Passwords?: string[];
}
export const AuthenticationMode = S.suspend(() =>
  S.Struct({
    Type: S.optional(InputAuthenticationType),
    Passwords: S.optional(PasswordListInput),
  }),
).annotate({
  identifier: "AuthenticationMode",
}) as any as S.Schema<AuthenticationMode>;
export interface CreateUserRequest {
  UserName: string;
  AuthenticationMode: AuthenticationMode;
  AccessString: string;
  Tags?: Tag[];
}
export const CreateUserRequest = S.suspend(() =>
  S.Struct({
    UserName: S.String,
    AuthenticationMode: AuthenticationMode,
    AccessString: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUserRequest",
}) as any as S.Schema<CreateUserRequest>;
export type ACLNameList = string[];
export const ACLNameList = S.Array(S.String);
export type AuthenticationType =
  | "password"
  | "no-password"
  | "iam"
  | (string & {});
export const AuthenticationType = S.String;
export interface Authentication {
  Type?: AuthenticationType;
  PasswordCount?: number;
}
export const Authentication = S.suspend(() =>
  S.Struct({
    Type: S.optional(AuthenticationType),
    PasswordCount: S.optional(S.Number),
  }),
).annotate({ identifier: "Authentication" }) as any as S.Schema<Authentication>;
export interface User {
  Name?: string;
  Status?: string;
  AccessString?: string;
  ACLNames?: string[];
  MinimumEngineVersion?: string;
  Authentication?: Authentication;
  ARN?: string;
}
export const User = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(S.String),
    AccessString: S.optional(S.String),
    ACLNames: S.optional(ACLNameList),
    MinimumEngineVersion: S.optional(S.String),
    Authentication: S.optional(Authentication),
    ARN: S.optional(S.String),
  }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export interface CreateUserResponse {
  User?: User;
}
export const CreateUserResponse = S.suspend(() =>
  S.Struct({ User: S.optional(User) }).pipe(ns),
).annotate({
  identifier: "CreateUserResponse",
}) as any as S.Schema<CreateUserResponse>;
export interface DeleteACLRequest {
  ACLName: string;
}
export const DeleteACLRequest = S.suspend(() =>
  S.Struct({ ACLName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteACLRequest",
}) as any as S.Schema<DeleteACLRequest>;
export interface DeleteACLResponse {
  ACL?: ACL;
}
export const DeleteACLResponse = S.suspend(() =>
  S.Struct({ ACL: S.optional(ACL) }).pipe(ns),
).annotate({
  identifier: "DeleteACLResponse",
}) as any as S.Schema<DeleteACLResponse>;
export interface DeleteClusterRequest {
  ClusterName: string;
  MultiRegionClusterName?: string;
  FinalSnapshotName?: string;
}
export const DeleteClusterRequest = S.suspend(() =>
  S.Struct({
    ClusterName: S.String,
    MultiRegionClusterName: S.optional(S.String),
    FinalSnapshotName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteClusterRequest",
}) as any as S.Schema<DeleteClusterRequest>;
export interface DeleteClusterResponse {
  Cluster?: Cluster;
}
export const DeleteClusterResponse = S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "DeleteClusterResponse",
}) as any as S.Schema<DeleteClusterResponse>;
export interface DeleteMultiRegionClusterRequest {
  MultiRegionClusterName: string;
}
export const DeleteMultiRegionClusterRequest = S.suspend(() =>
  S.Struct({ MultiRegionClusterName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMultiRegionClusterRequest",
}) as any as S.Schema<DeleteMultiRegionClusterRequest>;
export interface DeleteMultiRegionClusterResponse {
  MultiRegionCluster?: MultiRegionCluster;
}
export const DeleteMultiRegionClusterResponse = S.suspend(() =>
  S.Struct({ MultiRegionCluster: S.optional(MultiRegionCluster) }).pipe(ns),
).annotate({
  identifier: "DeleteMultiRegionClusterResponse",
}) as any as S.Schema<DeleteMultiRegionClusterResponse>;
export interface DeleteParameterGroupRequest {
  ParameterGroupName: string;
}
export const DeleteParameterGroupRequest = S.suspend(() =>
  S.Struct({ ParameterGroupName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteParameterGroupRequest",
}) as any as S.Schema<DeleteParameterGroupRequest>;
export interface DeleteParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export const DeleteParameterGroupResponse = S.suspend(() =>
  S.Struct({ ParameterGroup: S.optional(ParameterGroup) }).pipe(ns),
).annotate({
  identifier: "DeleteParameterGroupResponse",
}) as any as S.Schema<DeleteParameterGroupResponse>;
export interface DeleteSnapshotRequest {
  SnapshotName: string;
}
export const DeleteSnapshotRequest = S.suspend(() =>
  S.Struct({ SnapshotName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSnapshotRequest",
}) as any as S.Schema<DeleteSnapshotRequest>;
export interface DeleteSnapshotResponse {
  Snapshot?: Snapshot;
}
export const DeleteSnapshotResponse = S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "DeleteSnapshotResponse",
}) as any as S.Schema<DeleteSnapshotResponse>;
export interface DeleteSubnetGroupRequest {
  SubnetGroupName: string;
}
export const DeleteSubnetGroupRequest = S.suspend(() =>
  S.Struct({ SubnetGroupName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSubnetGroupRequest",
}) as any as S.Schema<DeleteSubnetGroupRequest>;
export interface DeleteSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export const DeleteSubnetGroupResponse = S.suspend(() =>
  S.Struct({ SubnetGroup: S.optional(SubnetGroup) }).pipe(ns),
).annotate({
  identifier: "DeleteSubnetGroupResponse",
}) as any as S.Schema<DeleteSubnetGroupResponse>;
export interface DeleteUserRequest {
  UserName: string;
}
export const DeleteUserRequest = S.suspend(() =>
  S.Struct({ UserName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteUserRequest",
}) as any as S.Schema<DeleteUserRequest>;
export interface DeleteUserResponse {
  User?: User;
}
export const DeleteUserResponse = S.suspend(() =>
  S.Struct({ User: S.optional(User) }).pipe(ns),
).annotate({
  identifier: "DeleteUserResponse",
}) as any as S.Schema<DeleteUserResponse>;
export interface DescribeACLsRequest {
  ACLName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeACLsRequest = S.suspend(() =>
  S.Struct({
    ACLName: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeACLsRequest",
}) as any as S.Schema<DescribeACLsRequest>;
export type ACLList = ACL[];
export const ACLList = S.Array(ACL);
export interface DescribeACLsResponse {
  ACLs?: ACL[];
  NextToken?: string;
}
export const DescribeACLsResponse = S.suspend(() =>
  S.Struct({ ACLs: S.optional(ACLList), NextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeACLsResponse",
}) as any as S.Schema<DescribeACLsResponse>;
export interface DescribeClustersRequest {
  ClusterName?: string;
  MaxResults?: number;
  NextToken?: string;
  ShowShardDetails?: boolean;
}
export const DescribeClustersRequest = S.suspend(() =>
  S.Struct({
    ClusterName: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    ShowShardDetails: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClustersRequest",
}) as any as S.Schema<DescribeClustersRequest>;
export interface DescribeClustersResponse {
  NextToken?: string;
  Clusters?: Cluster[];
}
export const DescribeClustersResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Clusters: S.optional(ClusterList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeClustersResponse",
}) as any as S.Schema<DescribeClustersResponse>;
export interface DescribeEngineVersionsRequest {
  Engine?: string;
  EngineVersion?: string;
  ParameterGroupFamily?: string;
  MaxResults?: number;
  NextToken?: string;
  DefaultOnly?: boolean;
}
export const DescribeEngineVersionsRequest = S.suspend(() =>
  S.Struct({
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    ParameterGroupFamily: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    DefaultOnly: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEngineVersionsRequest",
}) as any as S.Schema<DescribeEngineVersionsRequest>;
export interface EngineVersionInfo {
  Engine?: string;
  EngineVersion?: string;
  EnginePatchVersion?: string;
  ParameterGroupFamily?: string;
}
export const EngineVersionInfo = S.suspend(() =>
  S.Struct({
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    EnginePatchVersion: S.optional(S.String),
    ParameterGroupFamily: S.optional(S.String),
  }),
).annotate({
  identifier: "EngineVersionInfo",
}) as any as S.Schema<EngineVersionInfo>;
export type EngineVersionInfoList = EngineVersionInfo[];
export const EngineVersionInfoList = S.Array(EngineVersionInfo);
export interface DescribeEngineVersionsResponse {
  NextToken?: string;
  EngineVersions?: EngineVersionInfo[];
}
export const DescribeEngineVersionsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    EngineVersions: S.optional(EngineVersionInfoList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEngineVersionsResponse",
}) as any as S.Schema<DescribeEngineVersionsResponse>;
export type SourceType =
  | "node"
  | "parameter-group"
  | "subnet-group"
  | "cluster"
  | "user"
  | "acl"
  | (string & {});
export const SourceType = S.String;
export interface DescribeEventsRequest {
  SourceName?: string;
  SourceType?: SourceType;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeEventsRequest = S.suspend(() =>
  S.Struct({
    SourceName: S.optional(S.String),
    SourceType: S.optional(SourceType),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Duration: S.optional(S.Number),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEventsRequest",
}) as any as S.Schema<DescribeEventsRequest>;
export interface Event {
  SourceName?: string;
  SourceType?: SourceType;
  Message?: string;
  Date?: Date;
}
export const Event = S.suspend(() =>
  S.Struct({
    SourceName: S.optional(S.String),
    SourceType: S.optional(SourceType),
    Message: S.optional(S.String),
    Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export type EventList = Event[];
export const EventList = S.Array(
  Event.pipe(T.XmlName("Event")).annotate({ identifier: "Event" }),
);
export interface DescribeEventsResponse {
  NextToken?: string;
  Events?: Event[];
}
export const DescribeEventsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Events: S.optional(EventList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEventsResponse",
}) as any as S.Schema<DescribeEventsResponse>;
export interface DescribeMultiRegionClustersRequest {
  MultiRegionClusterName?: string;
  MaxResults?: number;
  NextToken?: string;
  ShowClusterDetails?: boolean;
}
export const DescribeMultiRegionClustersRequest = S.suspend(() =>
  S.Struct({
    MultiRegionClusterName: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    ShowClusterDetails: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMultiRegionClustersRequest",
}) as any as S.Schema<DescribeMultiRegionClustersRequest>;
export type MultiRegionClusterList = MultiRegionCluster[];
export const MultiRegionClusterList = S.Array(MultiRegionCluster);
export interface DescribeMultiRegionClustersResponse {
  NextToken?: string;
  MultiRegionClusters?: MultiRegionCluster[];
}
export const DescribeMultiRegionClustersResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MultiRegionClusters: S.optional(MultiRegionClusterList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeMultiRegionClustersResponse",
}) as any as S.Schema<DescribeMultiRegionClustersResponse>;
export interface DescribeMultiRegionParameterGroupsRequest {
  MultiRegionParameterGroupName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeMultiRegionParameterGroupsRequest = S.suspend(() =>
  S.Struct({
    MultiRegionParameterGroupName: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMultiRegionParameterGroupsRequest",
}) as any as S.Schema<DescribeMultiRegionParameterGroupsRequest>;
export interface MultiRegionParameterGroup {
  Name?: string;
  Family?: string;
  Description?: string;
  ARN?: string;
}
export const MultiRegionParameterGroup = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Family: S.optional(S.String),
    Description: S.optional(S.String),
    ARN: S.optional(S.String),
  }),
).annotate({
  identifier: "MultiRegionParameterGroup",
}) as any as S.Schema<MultiRegionParameterGroup>;
export type MultiRegionParameterGroupList = MultiRegionParameterGroup[];
export const MultiRegionParameterGroupList = S.Array(
  MultiRegionParameterGroup.pipe(
    T.XmlName("MultiRegionParameterGroup"),
  ).annotate({ identifier: "MultiRegionParameterGroup" }),
);
export interface DescribeMultiRegionParameterGroupsResponse {
  NextToken?: string;
  MultiRegionParameterGroups?: MultiRegionParameterGroup[];
}
export const DescribeMultiRegionParameterGroupsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MultiRegionParameterGroups: S.optional(MultiRegionParameterGroupList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeMultiRegionParameterGroupsResponse",
}) as any as S.Schema<DescribeMultiRegionParameterGroupsResponse>;
export interface DescribeMultiRegionParametersRequest {
  MultiRegionParameterGroupName: string;
  Source?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeMultiRegionParametersRequest = S.suspend(() =>
  S.Struct({
    MultiRegionParameterGroupName: S.String,
    Source: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMultiRegionParametersRequest",
}) as any as S.Schema<DescribeMultiRegionParametersRequest>;
export interface MultiRegionParameter {
  Name?: string;
  Value?: string;
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  MinimumEngineVersion?: string;
}
export const MultiRegionParameter = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Value: S.optional(S.String),
    Description: S.optional(S.String),
    Source: S.optional(S.String),
    DataType: S.optional(S.String),
    AllowedValues: S.optional(S.String),
    MinimumEngineVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "MultiRegionParameter",
}) as any as S.Schema<MultiRegionParameter>;
export type MultiRegionParametersList = MultiRegionParameter[];
export const MultiRegionParametersList = S.Array(
  MultiRegionParameter.pipe(T.XmlName("MultiRegionParameter")).annotate({
    identifier: "MultiRegionParameter",
  }),
);
export interface DescribeMultiRegionParametersResponse {
  NextToken?: string;
  MultiRegionParameters?: MultiRegionParameter[];
}
export const DescribeMultiRegionParametersResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MultiRegionParameters: S.optional(MultiRegionParametersList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeMultiRegionParametersResponse",
}) as any as S.Schema<DescribeMultiRegionParametersResponse>;
export interface DescribeParameterGroupsRequest {
  ParameterGroupName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeParameterGroupsRequest = S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeParameterGroupsRequest",
}) as any as S.Schema<DescribeParameterGroupsRequest>;
export type ParameterGroupList = ParameterGroup[];
export const ParameterGroupList = S.Array(
  ParameterGroup.pipe(T.XmlName("ParameterGroup")).annotate({
    identifier: "ParameterGroup",
  }),
);
export interface DescribeParameterGroupsResponse {
  NextToken?: string;
  ParameterGroups?: ParameterGroup[];
}
export const DescribeParameterGroupsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ParameterGroups: S.optional(ParameterGroupList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeParameterGroupsResponse",
}) as any as S.Schema<DescribeParameterGroupsResponse>;
export interface DescribeParametersRequest {
  ParameterGroupName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeParametersRequest = S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeParametersRequest",
}) as any as S.Schema<DescribeParametersRequest>;
export interface Parameter {
  Name?: string;
  Value?: string;
  Description?: string;
  DataType?: string;
  AllowedValues?: string;
  MinimumEngineVersion?: string;
}
export const Parameter = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Value: S.optional(S.String),
    Description: S.optional(S.String),
    DataType: S.optional(S.String),
    AllowedValues: S.optional(S.String),
    MinimumEngineVersion: S.optional(S.String),
  }),
).annotate({ identifier: "Parameter" }) as any as S.Schema<Parameter>;
export type ParametersList = Parameter[];
export const ParametersList = S.Array(
  Parameter.pipe(T.XmlName("Parameter")).annotate({ identifier: "Parameter" }),
);
export interface DescribeParametersResponse {
  NextToken?: string;
  Parameters?: Parameter[];
}
export const DescribeParametersResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Parameters: S.optional(ParametersList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeParametersResponse",
}) as any as S.Schema<DescribeParametersResponse>;
export interface DescribeReservedNodesRequest {
  ReservationId?: string;
  ReservedNodesOfferingId?: string;
  NodeType?: string;
  Duration?: string;
  OfferingType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeReservedNodesRequest = S.suspend(() =>
  S.Struct({
    ReservationId: S.optional(S.String),
    ReservedNodesOfferingId: S.optional(S.String),
    NodeType: S.optional(S.String),
    Duration: S.optional(S.String),
    OfferingType: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReservedNodesRequest",
}) as any as S.Schema<DescribeReservedNodesRequest>;
export interface RecurringCharge {
  RecurringChargeAmount?: number;
  RecurringChargeFrequency?: string;
}
export const RecurringCharge = S.suspend(() =>
  S.Struct({
    RecurringChargeAmount: S.optional(S.Number),
    RecurringChargeFrequency: S.optional(S.String),
  }),
).annotate({
  identifier: "RecurringCharge",
}) as any as S.Schema<RecurringCharge>;
export type RecurringChargeList = RecurringCharge[];
export const RecurringChargeList = S.Array(
  RecurringCharge.pipe(T.XmlName("RecurringCharge")).annotate({
    identifier: "RecurringCharge",
  }),
);
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
export const ReservedNode = S.suspend(() =>
  S.Struct({
    ReservationId: S.optional(S.String),
    ReservedNodesOfferingId: S.optional(S.String),
    NodeType: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Duration: S.optional(S.Number),
    FixedPrice: S.optional(S.Number),
    NodeCount: S.optional(S.Number),
    OfferingType: S.optional(S.String),
    State: S.optional(S.String),
    RecurringCharges: S.optional(RecurringChargeList),
    ARN: S.optional(S.String),
  }),
).annotate({ identifier: "ReservedNode" }) as any as S.Schema<ReservedNode>;
export type ReservedNodeList = ReservedNode[];
export const ReservedNodeList = S.Array(
  ReservedNode.pipe(T.XmlName("ReservedNode")).annotate({
    identifier: "ReservedNode",
  }),
);
export interface DescribeReservedNodesResponse {
  NextToken?: string;
  ReservedNodes?: ReservedNode[];
}
export const DescribeReservedNodesResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ReservedNodes: S.optional(ReservedNodeList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeReservedNodesResponse",
}) as any as S.Schema<DescribeReservedNodesResponse>;
export interface DescribeReservedNodesOfferingsRequest {
  ReservedNodesOfferingId?: string;
  NodeType?: string;
  Duration?: string;
  OfferingType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeReservedNodesOfferingsRequest = S.suspend(() =>
  S.Struct({
    ReservedNodesOfferingId: S.optional(S.String),
    NodeType: S.optional(S.String),
    Duration: S.optional(S.String),
    OfferingType: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReservedNodesOfferingsRequest",
}) as any as S.Schema<DescribeReservedNodesOfferingsRequest>;
export interface ReservedNodesOffering {
  ReservedNodesOfferingId?: string;
  NodeType?: string;
  Duration?: number;
  FixedPrice?: number;
  OfferingType?: string;
  RecurringCharges?: RecurringCharge[];
}
export const ReservedNodesOffering = S.suspend(() =>
  S.Struct({
    ReservedNodesOfferingId: S.optional(S.String),
    NodeType: S.optional(S.String),
    Duration: S.optional(S.Number),
    FixedPrice: S.optional(S.Number),
    OfferingType: S.optional(S.String),
    RecurringCharges: S.optional(RecurringChargeList),
  }),
).annotate({
  identifier: "ReservedNodesOffering",
}) as any as S.Schema<ReservedNodesOffering>;
export type ReservedNodesOfferingList = ReservedNodesOffering[];
export const ReservedNodesOfferingList = S.Array(
  ReservedNodesOffering.pipe(T.XmlName("ReservedNodesOffering")).annotate({
    identifier: "ReservedNodesOffering",
  }),
);
export interface DescribeReservedNodesOfferingsResponse {
  NextToken?: string;
  ReservedNodesOfferings?: ReservedNodesOffering[];
}
export const DescribeReservedNodesOfferingsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ReservedNodesOfferings: S.optional(ReservedNodesOfferingList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeReservedNodesOfferingsResponse",
}) as any as S.Schema<DescribeReservedNodesOfferingsResponse>;
export type ServiceUpdateStatusList = ServiceUpdateStatus[];
export const ServiceUpdateStatusList = S.Array(ServiceUpdateStatus);
export interface DescribeServiceUpdatesRequest {
  ServiceUpdateName?: string;
  ClusterNames?: string[];
  Status?: ServiceUpdateStatus[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeServiceUpdatesRequest = S.suspend(() =>
  S.Struct({
    ServiceUpdateName: S.optional(S.String),
    ClusterNames: S.optional(ClusterNameList),
    Status: S.optional(ServiceUpdateStatusList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeServiceUpdatesRequest",
}) as any as S.Schema<DescribeServiceUpdatesRequest>;
export type ServiceUpdateType = "security-update" | (string & {});
export const ServiceUpdateType = S.String;
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
export const ServiceUpdate = S.suspend(() =>
  S.Struct({
    ClusterName: S.optional(S.String),
    ServiceUpdateName: S.optional(S.String),
    ReleaseDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    Status: S.optional(ServiceUpdateStatus),
    Type: S.optional(ServiceUpdateType),
    Engine: S.optional(S.String),
    NodesUpdated: S.optional(S.String),
    AutoUpdateStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ServiceUpdate" }) as any as S.Schema<ServiceUpdate>;
export type ServiceUpdateList = ServiceUpdate[];
export const ServiceUpdateList = S.Array(
  ServiceUpdate.pipe(T.XmlName("ServiceUpdate")).annotate({
    identifier: "ServiceUpdate",
  }),
);
export interface DescribeServiceUpdatesResponse {
  NextToken?: string;
  ServiceUpdates?: ServiceUpdate[];
}
export const DescribeServiceUpdatesResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ServiceUpdates: S.optional(ServiceUpdateList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeServiceUpdatesResponse",
}) as any as S.Schema<DescribeServiceUpdatesResponse>;
export interface DescribeSnapshotsRequest {
  ClusterName?: string;
  SnapshotName?: string;
  Source?: string;
  NextToken?: string;
  MaxResults?: number;
  ShowDetail?: boolean;
}
export const DescribeSnapshotsRequest = S.suspend(() =>
  S.Struct({
    ClusterName: S.optional(S.String),
    SnapshotName: S.optional(S.String),
    Source: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ShowDetail: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSnapshotsRequest",
}) as any as S.Schema<DescribeSnapshotsRequest>;
export type SnapshotList = Snapshot[];
export const SnapshotList = S.Array(Snapshot);
export interface DescribeSnapshotsResponse {
  NextToken?: string;
  Snapshots?: Snapshot[];
}
export const DescribeSnapshotsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Snapshots: S.optional(SnapshotList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeSnapshotsResponse",
}) as any as S.Schema<DescribeSnapshotsResponse>;
export interface DescribeSubnetGroupsRequest {
  SubnetGroupName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeSubnetGroupsRequest = S.suspend(() =>
  S.Struct({
    SubnetGroupName: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSubnetGroupsRequest",
}) as any as S.Schema<DescribeSubnetGroupsRequest>;
export type SubnetGroupList = SubnetGroup[];
export const SubnetGroupList = S.Array(SubnetGroup);
export interface DescribeSubnetGroupsResponse {
  NextToken?: string;
  SubnetGroups?: SubnetGroup[];
}
export const DescribeSubnetGroupsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    SubnetGroups: S.optional(SubnetGroupList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeSubnetGroupsResponse",
}) as any as S.Schema<DescribeSubnetGroupsResponse>;
export type FilterValueList = string[];
export const FilterValueList = S.Array(S.String);
export interface Filter {
  Name: string;
  Values: string[];
}
export const Filter = S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = S.Array(Filter);
export interface DescribeUsersRequest {
  UserName?: string;
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeUsersRequest = S.suspend(() =>
  S.Struct({
    UserName: S.optional(S.String),
    Filters: S.optional(FilterList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeUsersRequest",
}) as any as S.Schema<DescribeUsersRequest>;
export type UserList = User[];
export const UserList = S.Array(User);
export interface DescribeUsersResponse {
  Users?: User[];
  NextToken?: string;
}
export const DescribeUsersResponse = S.suspend(() =>
  S.Struct({
    Users: S.optional(UserList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeUsersResponse",
}) as any as S.Schema<DescribeUsersResponse>;
export interface FailoverShardRequest {
  ClusterName: string;
  ShardName: string;
}
export const FailoverShardRequest = S.suspend(() =>
  S.Struct({ ClusterName: S.String, ShardName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "FailoverShardRequest",
}) as any as S.Schema<FailoverShardRequest>;
export interface FailoverShardResponse {
  Cluster?: Cluster;
}
export const FailoverShardResponse = S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "FailoverShardResponse",
}) as any as S.Schema<FailoverShardResponse>;
export interface ListAllowedMultiRegionClusterUpdatesRequest {
  MultiRegionClusterName: string;
}
export const ListAllowedMultiRegionClusterUpdatesRequest = S.suspend(() =>
  S.Struct({ MultiRegionClusterName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAllowedMultiRegionClusterUpdatesRequest",
}) as any as S.Schema<ListAllowedMultiRegionClusterUpdatesRequest>;
export type NodeTypeList = string[];
export const NodeTypeList = S.Array(S.String);
export interface ListAllowedMultiRegionClusterUpdatesResponse {
  ScaleUpNodeTypes?: string[];
  ScaleDownNodeTypes?: string[];
}
export const ListAllowedMultiRegionClusterUpdatesResponse = S.suspend(() =>
  S.Struct({
    ScaleUpNodeTypes: S.optional(NodeTypeList),
    ScaleDownNodeTypes: S.optional(NodeTypeList),
  }).pipe(ns),
).annotate({
  identifier: "ListAllowedMultiRegionClusterUpdatesResponse",
}) as any as S.Schema<ListAllowedMultiRegionClusterUpdatesResponse>;
export interface ListAllowedNodeTypeUpdatesRequest {
  ClusterName: string;
}
export const ListAllowedNodeTypeUpdatesRequest = S.suspend(() =>
  S.Struct({ ClusterName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAllowedNodeTypeUpdatesRequest",
}) as any as S.Schema<ListAllowedNodeTypeUpdatesRequest>;
export interface ListAllowedNodeTypeUpdatesResponse {
  ScaleUpNodeTypes?: string[];
  ScaleDownNodeTypes?: string[];
}
export const ListAllowedNodeTypeUpdatesResponse = S.suspend(() =>
  S.Struct({
    ScaleUpNodeTypes: S.optional(NodeTypeList),
    ScaleDownNodeTypes: S.optional(NodeTypeList),
  }).pipe(ns),
).annotate({
  identifier: "ListAllowedNodeTypeUpdatesResponse",
}) as any as S.Schema<ListAllowedNodeTypeUpdatesResponse>;
export interface ListTagsRequest {
  ResourceArn: string;
}
export const ListTagsRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsRequest",
}) as any as S.Schema<ListTagsRequest>;
export interface ListTagsResponse {
  TagList?: Tag[];
}
export const ListTagsResponse = S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsResponse",
}) as any as S.Schema<ListTagsResponse>;
export interface PurchaseReservedNodesOfferingRequest {
  ReservedNodesOfferingId: string;
  ReservationId?: string;
  NodeCount?: number;
  Tags?: Tag[];
}
export const PurchaseReservedNodesOfferingRequest = S.suspend(() =>
  S.Struct({
    ReservedNodesOfferingId: S.String,
    ReservationId: S.optional(S.String),
    NodeCount: S.optional(S.Number),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PurchaseReservedNodesOfferingRequest",
}) as any as S.Schema<PurchaseReservedNodesOfferingRequest>;
export interface PurchaseReservedNodesOfferingResponse {
  ReservedNode?: ReservedNode;
}
export const PurchaseReservedNodesOfferingResponse = S.suspend(() =>
  S.Struct({ ReservedNode: S.optional(ReservedNode) }).pipe(ns),
).annotate({
  identifier: "PurchaseReservedNodesOfferingResponse",
}) as any as S.Schema<PurchaseReservedNodesOfferingResponse>;
export type ParameterNameList = string[];
export const ParameterNameList = S.Array(S.String);
export interface ResetParameterGroupRequest {
  ParameterGroupName: string;
  AllParameters?: boolean;
  ParameterNames?: string[];
}
export const ResetParameterGroupRequest = S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.String,
    AllParameters: S.optional(S.Boolean),
    ParameterNames: S.optional(ParameterNameList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetParameterGroupRequest",
}) as any as S.Schema<ResetParameterGroupRequest>;
export interface ResetParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export const ResetParameterGroupResponse = S.suspend(() =>
  S.Struct({ ParameterGroup: S.optional(ParameterGroup) }).pipe(ns),
).annotate({
  identifier: "ResetParameterGroupResponse",
}) as any as S.Schema<ResetParameterGroupResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {
  TagList?: Tag[];
}
export const TagResourceResponse = S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type KeyList = string[];
export const KeyList = S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: KeyList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {
  TagList?: Tag[];
}
export const UntagResourceResponse = S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateACLRequest {
  ACLName: string;
  UserNamesToAdd?: string[];
  UserNamesToRemove?: string[];
}
export const UpdateACLRequest = S.suspend(() =>
  S.Struct({
    ACLName: S.String,
    UserNamesToAdd: S.optional(UserNameListInput),
    UserNamesToRemove: S.optional(UserNameListInput),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateACLRequest",
}) as any as S.Schema<UpdateACLRequest>;
export interface UpdateACLResponse {
  ACL?: ACL;
}
export const UpdateACLResponse = S.suspend(() =>
  S.Struct({ ACL: S.optional(ACL) }).pipe(ns),
).annotate({
  identifier: "UpdateACLResponse",
}) as any as S.Schema<UpdateACLResponse>;
export interface ReplicaConfigurationRequest {
  ReplicaCount?: number;
}
export const ReplicaConfigurationRequest = S.suspend(() =>
  S.Struct({ ReplicaCount: S.optional(S.Number) }),
).annotate({
  identifier: "ReplicaConfigurationRequest",
}) as any as S.Schema<ReplicaConfigurationRequest>;
export interface ShardConfigurationRequest {
  ShardCount?: number;
}
export const ShardConfigurationRequest = S.suspend(() =>
  S.Struct({ ShardCount: S.optional(S.Number) }),
).annotate({
  identifier: "ShardConfigurationRequest",
}) as any as S.Schema<ShardConfigurationRequest>;
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
export const UpdateClusterRequest = S.suspend(() =>
  S.Struct({
    ClusterName: S.String,
    Description: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdsList),
    MaintenanceWindow: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    SnsTopicStatus: S.optional(S.String),
    ParameterGroupName: S.optional(S.String),
    SnapshotWindow: S.optional(S.String),
    SnapshotRetentionLimit: S.optional(S.Number),
    NodeType: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    ReplicaConfiguration: S.optional(ReplicaConfigurationRequest),
    ShardConfiguration: S.optional(ShardConfigurationRequest),
    ACLName: S.optional(S.String),
    IpDiscovery: S.optional(IpDiscovery),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateClusterRequest",
}) as any as S.Schema<UpdateClusterRequest>;
export interface UpdateClusterResponse {
  Cluster?: Cluster;
}
export const UpdateClusterResponse = S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "UpdateClusterResponse",
}) as any as S.Schema<UpdateClusterResponse>;
export type UpdateStrategy = "coordinated" | "uncoordinated" | (string & {});
export const UpdateStrategy = S.String;
export interface UpdateMultiRegionClusterRequest {
  MultiRegionClusterName: string;
  NodeType?: string;
  Description?: string;
  EngineVersion?: string;
  ShardConfiguration?: ShardConfigurationRequest;
  MultiRegionParameterGroupName?: string;
  UpdateStrategy?: UpdateStrategy;
}
export const UpdateMultiRegionClusterRequest = S.suspend(() =>
  S.Struct({
    MultiRegionClusterName: S.String,
    NodeType: S.optional(S.String),
    Description: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    ShardConfiguration: S.optional(ShardConfigurationRequest),
    MultiRegionParameterGroupName: S.optional(S.String),
    UpdateStrategy: S.optional(UpdateStrategy),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMultiRegionClusterRequest",
}) as any as S.Schema<UpdateMultiRegionClusterRequest>;
export interface UpdateMultiRegionClusterResponse {
  MultiRegionCluster?: MultiRegionCluster;
}
export const UpdateMultiRegionClusterResponse = S.suspend(() =>
  S.Struct({ MultiRegionCluster: S.optional(MultiRegionCluster) }).pipe(ns),
).annotate({
  identifier: "UpdateMultiRegionClusterResponse",
}) as any as S.Schema<UpdateMultiRegionClusterResponse>;
export interface ParameterNameValue {
  ParameterName?: string;
  ParameterValue?: string;
}
export const ParameterNameValue = S.suspend(() =>
  S.Struct({
    ParameterName: S.optional(S.String),
    ParameterValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ParameterNameValue",
}) as any as S.Schema<ParameterNameValue>;
export type ParameterNameValueList = ParameterNameValue[];
export const ParameterNameValueList = S.Array(
  ParameterNameValue.pipe(T.XmlName("ParameterNameValue")).annotate({
    identifier: "ParameterNameValue",
  }),
);
export interface UpdateParameterGroupRequest {
  ParameterGroupName: string;
  ParameterNameValues: ParameterNameValue[];
}
export const UpdateParameterGroupRequest = S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.String,
    ParameterNameValues: ParameterNameValueList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateParameterGroupRequest",
}) as any as S.Schema<UpdateParameterGroupRequest>;
export interface UpdateParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export const UpdateParameterGroupResponse = S.suspend(() =>
  S.Struct({ ParameterGroup: S.optional(ParameterGroup) }).pipe(ns),
).annotate({
  identifier: "UpdateParameterGroupResponse",
}) as any as S.Schema<UpdateParameterGroupResponse>;
export interface UpdateSubnetGroupRequest {
  SubnetGroupName: string;
  Description?: string;
  SubnetIds?: string[];
}
export const UpdateSubnetGroupRequest = S.suspend(() =>
  S.Struct({
    SubnetGroupName: S.String,
    Description: S.optional(S.String),
    SubnetIds: S.optional(SubnetIdentifierList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSubnetGroupRequest",
}) as any as S.Schema<UpdateSubnetGroupRequest>;
export interface UpdateSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export const UpdateSubnetGroupResponse = S.suspend(() =>
  S.Struct({ SubnetGroup: S.optional(SubnetGroup) }).pipe(ns),
).annotate({
  identifier: "UpdateSubnetGroupResponse",
}) as any as S.Schema<UpdateSubnetGroupResponse>;
export interface UpdateUserRequest {
  UserName: string;
  AuthenticationMode?: AuthenticationMode;
  AccessString?: string;
}
export const UpdateUserRequest = S.suspend(() =>
  S.Struct({
    UserName: S.String,
    AuthenticationMode: S.optional(AuthenticationMode),
    AccessString: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateUserRequest",
}) as any as S.Schema<UpdateUserRequest>;
export interface UpdateUserResponse {
  User?: User;
}
export const UpdateUserResponse = S.suspend(() =>
  S.Struct({ User: S.optional(User) }).pipe(ns),
).annotate({
  identifier: "UpdateUserResponse",
}) as any as S.Schema<UpdateUserResponse>;

//# Errors
export class InvalidParameterValueException extends S.TaggedErrorClass<InvalidParameterValueException>()(
  "InvalidParameterValueException",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "InvalidParameterValue", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class ServiceUpdateNotFoundFault extends S.TaggedErrorClass<ServiceUpdateNotFoundFault>()(
  "ServiceUpdateNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "ServiceUpdateNotFoundFault",
    httpResponseCode: 404,
  }),
).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException extends S.TaggedErrorClass<InvalidParameterCombinationException>()(
  "InvalidParameterCombinationException",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "InvalidParameterCombination",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class InvalidSnapshotStateFault extends S.TaggedErrorClass<InvalidSnapshotStateFault>()(
  "InvalidSnapshotStateFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "InvalidSnapshotState", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class ServiceLinkedRoleNotFoundFault extends S.TaggedErrorClass<ServiceLinkedRoleNotFoundFault>()(
  "ServiceLinkedRoleNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "ServiceLinkedRoleNotFoundFault",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class SnapshotAlreadyExistsFault extends S.TaggedErrorClass<SnapshotAlreadyExistsFault>()(
  "SnapshotAlreadyExistsFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "SnapshotAlreadyExistsFault",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SnapshotNotFoundFault extends S.TaggedErrorClass<SnapshotNotFoundFault>()(
  "SnapshotNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "SnapshotNotFoundFault", httpResponseCode: 404 }),
).pipe(C.withBadRequestError) {}
export class SnapshotQuotaExceededFault extends S.TaggedErrorClass<SnapshotQuotaExceededFault>()(
  "SnapshotQuotaExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "SnapshotQuotaExceededFault",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class TagQuotaPerResourceExceeded extends S.TaggedErrorClass<TagQuotaPerResourceExceeded>()(
  "TagQuotaPerResourceExceeded",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "TagQuotaPerResourceExceeded",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class ACLAlreadyExistsFault extends S.TaggedErrorClass<ACLAlreadyExistsFault>()(
  "ACLAlreadyExistsFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ACLAlreadyExists", httpResponseCode: 400 }),
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ACLQuotaExceededFault extends S.TaggedErrorClass<ACLQuotaExceededFault>()(
  "ACLQuotaExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ACLQuotaExceeded", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class DefaultUserRequired extends S.TaggedErrorClass<DefaultUserRequired>()(
  "DefaultUserRequired",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "DefaultUserRequired", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class DuplicateUserNameFault extends S.TaggedErrorClass<DuplicateUserNameFault>()(
  "DuplicateUserNameFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "DuplicateUserName", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class UserNotFoundFault extends S.TaggedErrorClass<UserNotFoundFault>()(
  "UserNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "UserNotFound", httpResponseCode: 404 }),
).pipe(C.withBadRequestError) {}
export class ACLNotFoundFault extends S.TaggedErrorClass<ACLNotFoundFault>()(
  "ACLNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ACLNotFound", httpResponseCode: 404 }),
).pipe(C.withBadRequestError) {}
export class ClusterAlreadyExistsFault extends S.TaggedErrorClass<ClusterAlreadyExistsFault>()(
  "ClusterAlreadyExistsFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ClusterAlreadyExists", httpResponseCode: 400 }),
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterQuotaForCustomerExceededFault extends S.TaggedErrorClass<ClusterQuotaForCustomerExceededFault>()(
  "ClusterQuotaForCustomerExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "ClusterQuotaForCustomerExceeded",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class InsufficientClusterCapacityFault extends S.TaggedErrorClass<InsufficientClusterCapacityFault>()(
  "InsufficientClusterCapacityFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "InsufficientClusterCapacity",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class InvalidACLStateFault extends S.TaggedErrorClass<InvalidACLStateFault>()(
  "InvalidACLStateFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "InvalidACLState", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class InvalidCredentialsException extends S.TaggedErrorClass<InvalidCredentialsException>()(
  "InvalidCredentialsException",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "InvalidCredentialsException",
    httpResponseCode: 408,
  }),
).pipe(C.withTimeoutError) {}
export class InvalidMultiRegionClusterStateFault extends S.TaggedErrorClass<InvalidMultiRegionClusterStateFault>()(
  "InvalidMultiRegionClusterStateFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "InvalidMultiRegionClusterState",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class InvalidVPCNetworkStateFault extends S.TaggedErrorClass<InvalidVPCNetworkStateFault>()(
  "InvalidVPCNetworkStateFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "InvalidVPCNetworkStateFault",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class MultiRegionClusterNotFoundFault extends S.TaggedErrorClass<MultiRegionClusterNotFoundFault>()(
  "MultiRegionClusterNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "MultiRegionClusterNotFound",
    httpResponseCode: 404,
  }),
).pipe(C.withBadRequestError) {}
export class NodeQuotaForClusterExceededFault extends S.TaggedErrorClass<NodeQuotaForClusterExceededFault>()(
  "NodeQuotaForClusterExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "NodeQuotaForClusterExceeded",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class NodeQuotaForCustomerExceededFault extends S.TaggedErrorClass<NodeQuotaForCustomerExceededFault>()(
  "NodeQuotaForCustomerExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "NodeQuotaForCustomerExceeded",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class ParameterGroupNotFoundFault extends S.TaggedErrorClass<ParameterGroupNotFoundFault>()(
  "ParameterGroupNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ParameterGroupNotFound", httpResponseCode: 404 }),
).pipe(C.withBadRequestError) {}
export class ShardsPerClusterQuotaExceededFault extends S.TaggedErrorClass<ShardsPerClusterQuotaExceededFault>()(
  "ShardsPerClusterQuotaExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "ShardsPerClusterQuotaExceeded",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class SubnetGroupNotFoundFault extends S.TaggedErrorClass<SubnetGroupNotFoundFault>()(
  "SubnetGroupNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "SubnetGroupNotFoundFault", httpResponseCode: 404 }),
).pipe(C.withBadRequestError) {}
export class MultiRegionClusterAlreadyExistsFault extends S.TaggedErrorClass<MultiRegionClusterAlreadyExistsFault>()(
  "MultiRegionClusterAlreadyExistsFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "MultiRegionClusterAlreadyExistsFault",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class MultiRegionParameterGroupNotFoundFault extends S.TaggedErrorClass<MultiRegionParameterGroupNotFoundFault>()(
  "MultiRegionParameterGroupNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "MultiRegionParameterGroupNotFoundFault",
    httpResponseCode: 404,
  }),
).pipe(C.withBadRequestError) {}
export class InvalidParameterGroupStateFault extends S.TaggedErrorClass<InvalidParameterGroupStateFault>()(
  "InvalidParameterGroupStateFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "InvalidParameterGroupState",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class ParameterGroupAlreadyExistsFault extends S.TaggedErrorClass<ParameterGroupAlreadyExistsFault>()(
  "ParameterGroupAlreadyExistsFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "ParameterGroupAlreadyExists",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ParameterGroupQuotaExceededFault extends S.TaggedErrorClass<ParameterGroupQuotaExceededFault>()(
  "ParameterGroupQuotaExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "ParameterGroupQuotaExceeded",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class ClusterNotFoundFault extends S.TaggedErrorClass<ClusterNotFoundFault>()(
  "ClusterNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ClusterNotFound", httpResponseCode: 404 }),
).pipe(C.withBadRequestError) {}
export class InvalidClusterStateFault extends S.TaggedErrorClass<InvalidClusterStateFault>()(
  "InvalidClusterStateFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "InvalidClusterState", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class InvalidSubnet extends S.TaggedErrorClass<InvalidSubnet>()(
  "InvalidSubnet",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "InvalidSubnet", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class SubnetGroupAlreadyExistsFault extends S.TaggedErrorClass<SubnetGroupAlreadyExistsFault>()(
  "SubnetGroupAlreadyExistsFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "SubnetGroupAlreadyExists", httpResponseCode: 400 }),
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SubnetGroupQuotaExceededFault extends S.TaggedErrorClass<SubnetGroupQuotaExceededFault>()(
  "SubnetGroupQuotaExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "SubnetGroupQuotaExceeded", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class SubnetNotAllowedFault extends S.TaggedErrorClass<SubnetNotAllowedFault>()(
  "SubnetNotAllowedFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "SubnetNotAllowedFault", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class SubnetQuotaExceededFault extends S.TaggedErrorClass<SubnetQuotaExceededFault>()(
  "SubnetQuotaExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "SubnetQuotaExceededFault", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class UserAlreadyExistsFault extends S.TaggedErrorClass<UserAlreadyExistsFault>()(
  "UserAlreadyExistsFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "UserAlreadyExists", httpResponseCode: 400 }),
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class UserQuotaExceededFault extends S.TaggedErrorClass<UserQuotaExceededFault>()(
  "UserQuotaExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "UserQuotaExceeded", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class SubnetGroupInUseFault extends S.TaggedErrorClass<SubnetGroupInUseFault>()(
  "SubnetGroupInUseFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "SubnetGroupInUse", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class InvalidUserStateFault extends S.TaggedErrorClass<InvalidUserStateFault>()(
  "InvalidUserStateFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "InvalidUserState", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class ReservedNodeNotFoundFault extends S.TaggedErrorClass<ReservedNodeNotFoundFault>()(
  "ReservedNodeNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ReservedNodeNotFound", httpResponseCode: 404 }),
).pipe(C.withBadRequestError) {}
export class ReservedNodesOfferingNotFoundFault extends S.TaggedErrorClass<ReservedNodesOfferingNotFoundFault>()(
  "ReservedNodesOfferingNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "ReservedNodesOfferingNotFound",
    httpResponseCode: 404,
  }),
).pipe(C.withBadRequestError) {}
export class APICallRateForCustomerExceededFault extends S.TaggedErrorClass<APICallRateForCustomerExceededFault>()(
  "APICallRateForCustomerExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "APICallRateForCustomerExceeded",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class InvalidKMSKeyFault extends S.TaggedErrorClass<InvalidKMSKeyFault>()(
  "InvalidKMSKeyFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "InvalidKMSKeyFault", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class ShardNotFoundFault extends S.TaggedErrorClass<ShardNotFoundFault>()(
  "ShardNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ShardNotFoundFault", httpResponseCode: 404 }),
).pipe(C.withBadRequestError) {}
export class TestFailoverNotAvailableFault extends S.TaggedErrorClass<TestFailoverNotAvailableFault>()(
  "TestFailoverNotAvailableFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({
    code: "TestFailoverNotAvailableFault",
    httpResponseCode: 400,
  }),
).pipe(C.withBadRequestError) {}
export class InvalidARNFault extends S.TaggedErrorClass<InvalidARNFault>()(
  "InvalidARNFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "InvalidARN", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class ReservedNodeAlreadyExistsFault extends S.TaggedErrorClass<ReservedNodeAlreadyExistsFault>()(
  "ReservedNodeAlreadyExistsFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ReservedNodeAlreadyExists", httpResponseCode: 404 }),
).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ReservedNodeQuotaExceededFault extends S.TaggedErrorClass<ReservedNodeQuotaExceededFault>()(
  "ReservedNodeQuotaExceededFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ReservedNodeQuotaExceeded", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class TagNotFoundFault extends S.TaggedErrorClass<TagNotFoundFault>()(
  "TagNotFoundFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "TagNotFound", httpResponseCode: 404 }),
).pipe(C.withBadRequestError) {}
export class InvalidNodeStateFault extends S.TaggedErrorClass<InvalidNodeStateFault>()(
  "InvalidNodeStateFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "InvalidNodeState", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class NoOperationFault extends S.TaggedErrorClass<NoOperationFault>()(
  "NoOperationFault",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "NoOperationFault", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class SubnetInUse extends S.TaggedErrorClass<SubnetInUse>()(
  "SubnetInUse",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "SubnetInUse", httpResponseCode: 400 }),
).pipe(C.withBadRequestError, C.withDependencyViolationError) {}

//# Operations
/**
 * Apply the service update to a list of clusters supplied. For more information on service updates and applying them, see Applying the service updates.
 */
export const batchUpdateCluster: (
  input: BatchUpdateClusterRequest,
) => effect.Effect<
  BatchUpdateClusterResponse,
  InvalidParameterValueException | ServiceUpdateNotFoundFault | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdateClusterRequest,
  output: BatchUpdateClusterResponse,
  errors: [InvalidParameterValueException, ServiceUpdateNotFoundFault],
}));
/**
 * Makes a copy of an existing snapshot.
 */
export const copySnapshot: (
  input: CopySnapshotRequest,
) => effect.Effect<
  CopySnapshotResponse,
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidSnapshotStateFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotAlreadyExistsFault
  | SnapshotNotFoundFault
  | SnapshotQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CopySnapshotRequest,
  output: CopySnapshotResponse,
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
}));
/**
 * Creates an Access Control List. For more information, see Authenticating users with Access Contol Lists (ACLs).
 */
export const createACL: (
  input: CreateACLRequest,
) => effect.Effect<
  CreateACLResponse,
  | ACLAlreadyExistsFault
  | ACLQuotaExceededFault
  | DefaultUserRequired
  | DuplicateUserNameFault
  | InvalidParameterValueException
  | TagQuotaPerResourceExceeded
  | UserNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateACLRequest,
  output: CreateACLResponse,
  errors: [
    ACLAlreadyExistsFault,
    ACLQuotaExceededFault,
    DefaultUserRequired,
    DuplicateUserNameFault,
    InvalidParameterValueException,
    TagQuotaPerResourceExceeded,
    UserNotFoundFault,
  ],
}));
/**
 * Creates a cluster. All nodes in the cluster run the same protocol-compliant engine software.
 */
export const createCluster: (
  input: CreateClusterRequest,
) => effect.Effect<
  CreateClusterResponse,
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
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateClusterRequest,
  output: CreateClusterResponse,
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
}));
/**
 * Creates a new multi-Region cluster.
 */
export const createMultiRegionCluster: (
  input: CreateMultiRegionClusterRequest,
) => effect.Effect<
  CreateMultiRegionClusterResponse,
  | ClusterQuotaForCustomerExceededFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionClusterAlreadyExistsFault
  | MultiRegionParameterGroupNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMultiRegionClusterRequest,
  output: CreateMultiRegionClusterResponse,
  errors: [
    ClusterQuotaForCustomerExceededFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterAlreadyExistsFault,
    MultiRegionParameterGroupNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
}));
/**
 * Creates a new MemoryDB parameter group. A parameter group is a collection of parameters and their values that are applied to all of the nodes in any cluster. For
 * more information, see Configuring engine parameters using parameter groups.
 */
export const createParameterGroup: (
  input: CreateParameterGroupRequest,
) => effect.Effect<
  CreateParameterGroupResponse,
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupAlreadyExistsFault
  | ParameterGroupQuotaExceededFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateParameterGroupRequest,
  output: CreateParameterGroupResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupAlreadyExistsFault,
    ParameterGroupQuotaExceededFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
}));
/**
 * Creates a copy of an entire cluster at a specific moment in time.
 */
export const createSnapshot: (
  input: CreateSnapshotRequest,
) => effect.Effect<
  CreateSnapshotResponse,
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | SnapshotAlreadyExistsFault
  | SnapshotQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSnapshotRequest,
  output: CreateSnapshotResponse,
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
}));
/**
 * Creates a subnet group. A subnet group is a collection of subnets (typically private) that you can designate for your clusters running in an Amazon Virtual Private Cloud (VPC) environment.
 *
 * When you create a cluster in an Amazon VPC, you must specify a subnet group. MemoryDB uses that subnet group to choose a subnet and IP addresses within that subnet to associate with your nodes.
 * For more information, see Subnets and subnet groups.
 */
export const createSubnetGroup: (
  input: CreateSubnetGroupRequest,
) => effect.Effect<
  CreateSubnetGroupResponse,
  | InvalidSubnet
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupAlreadyExistsFault
  | SubnetGroupQuotaExceededFault
  | SubnetNotAllowedFault
  | SubnetQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSubnetGroupRequest,
  output: CreateSubnetGroupResponse,
  errors: [
    InvalidSubnet,
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupAlreadyExistsFault,
    SubnetGroupQuotaExceededFault,
    SubnetNotAllowedFault,
    SubnetQuotaExceededFault,
    TagQuotaPerResourceExceeded,
  ],
}));
/**
 * Creates a MemoryDB user. For more information, see Authenticating users with Access Contol Lists (ACLs).
 */
export const createUser: (
  input: CreateUserRequest,
) => effect.Effect<
  CreateUserResponse,
  | DuplicateUserNameFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | TagQuotaPerResourceExceeded
  | UserAlreadyExistsFault
  | UserQuotaExceededFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUserRequest,
  output: CreateUserResponse,
  errors: [
    DuplicateUserNameFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    TagQuotaPerResourceExceeded,
    UserAlreadyExistsFault,
    UserQuotaExceededFault,
  ],
}));
/**
 * Deletes an Access Control List. The ACL must first be disassociated from the cluster before it can be deleted. For more information, see Authenticating users with Access Contol Lists (ACLs).
 */
export const deleteACL: (
  input: DeleteACLRequest,
) => effect.Effect<
  DeleteACLResponse,
  | ACLNotFoundFault
  | InvalidACLStateFault
  | InvalidParameterValueException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteACLRequest,
  output: DeleteACLResponse,
  errors: [
    ACLNotFoundFault,
    InvalidACLStateFault,
    InvalidParameterValueException,
  ],
}));
/**
 * Deletes a cluster. It also deletes all associated nodes and node endpoints.
 *
 * `CreateSnapshot` permission is required to create a final snapshot.
 * Without this permission, the API call will fail with an `Access Denied` exception.
 */
export const deleteCluster: (
  input: DeleteClusterRequest,
) => effect.Effect<
  DeleteClusterResponse,
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | SnapshotAlreadyExistsFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteClusterRequest,
  output: DeleteClusterResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    SnapshotAlreadyExistsFault,
  ],
}));
/**
 * Deletes an existing multi-Region cluster.
 */
export const deleteMultiRegionCluster: (
  input: DeleteMultiRegionClusterRequest,
) => effect.Effect<
  DeleteMultiRegionClusterResponse,
  | InvalidMultiRegionClusterStateFault
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMultiRegionClusterRequest,
  output: DeleteMultiRegionClusterResponse,
  errors: [
    InvalidMultiRegionClusterStateFault,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
  ],
}));
/**
 * Deletes the specified parameter group. You cannot delete a parameter group if it is associated with any clusters.
 * You cannot delete the default parameter groups in your account.
 */
export const deleteParameterGroup: (
  input: DeleteParameterGroupRequest,
) => effect.Effect<
  DeleteParameterGroupResponse,
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteParameterGroupRequest,
  output: DeleteParameterGroupResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
}));
/**
 * Deletes an existing snapshot. When you receive a successful response from this operation, MemoryDB immediately begins deleting the snapshot; you cannot cancel or revert this operation.
 */
export const deleteSnapshot: (
  input: DeleteSnapshotRequest,
) => effect.Effect<
  DeleteSnapshotResponse,
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidSnapshotStateFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSnapshotRequest,
  output: DeleteSnapshotResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidSnapshotStateFault,
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
  ],
}));
/**
 * Deletes a subnet group. You cannot delete a default subnet group or one that is associated with any clusters.
 */
export const deleteSubnetGroup: (
  input: DeleteSubnetGroupRequest,
) => effect.Effect<
  DeleteSubnetGroupResponse,
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupInUseFault
  | SubnetGroupNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSubnetGroupRequest,
  output: DeleteSubnetGroupResponse,
  errors: [
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupInUseFault,
    SubnetGroupNotFoundFault,
  ],
}));
/**
 * Deletes a user. The user will be removed from all ACLs and in turn removed from all clusters.
 */
export const deleteUser: (
  input: DeleteUserRequest,
) => effect.Effect<
  DeleteUserResponse,
  | InvalidParameterValueException
  | InvalidUserStateFault
  | UserNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUserRequest,
  output: DeleteUserResponse,
  errors: [
    InvalidParameterValueException,
    InvalidUserStateFault,
    UserNotFoundFault,
  ],
}));
/**
 * Returns a list of ACLs.
 */
export const describeACLs: {
  (
    input: DescribeACLsRequest,
  ): effect.Effect<
    DescribeACLsResponse,
    ACLNotFoundFault | InvalidParameterCombinationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeACLsRequest,
  ) => stream.Stream<
    DescribeACLsResponse,
    ACLNotFoundFault | InvalidParameterCombinationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeACLsRequest,
  ) => stream.Stream<
    ACL,
    ACLNotFoundFault | InvalidParameterCombinationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeACLsRequest,
  output: DescribeACLsResponse,
  errors: [ACLNotFoundFault, InvalidParameterCombinationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ACLs",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns information about all provisioned clusters if no cluster identifier is specified, or about a specific cluster if a cluster name is supplied.
 */
export const describeClusters: {
  (
    input: DescribeClustersRequest,
  ): effect.Effect<
    DescribeClustersResponse,
    | ClusterNotFoundFault
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeClustersRequest,
  ) => stream.Stream<
    DescribeClustersResponse,
    | ClusterNotFoundFault
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeClustersRequest,
  ) => stream.Stream<
    Cluster,
    | ClusterNotFoundFault
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeClustersRequest,
  output: DescribeClustersResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Clusters",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of the available Redis OSS engine versions.
 */
export const describeEngineVersions: {
  (
    input: DescribeEngineVersionsRequest,
  ): effect.Effect<
    DescribeEngineVersionsResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeEngineVersionsRequest,
  ) => stream.Stream<
    DescribeEngineVersionsResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeEngineVersionsRequest,
  ) => stream.Stream<
    EngineVersionInfo,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeEngineVersionsRequest,
  output: DescribeEngineVersionsResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngineVersions",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns events related to clusters, security groups, and parameter groups. You can obtain events specific to a particular cluster, security group, or parameter group by providing the name as a parameter.
 *
 * By default, only the events occurring within the last hour are returned; however, you can retrieve up to 14 days' worth of events if necessary.
 */
export const describeEvents: {
  (
    input: DescribeEventsRequest,
  ): effect.Effect<
    DescribeEventsResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeEventsRequest,
  ) => stream.Stream<
    DescribeEventsResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeEventsRequest,
  ) => stream.Stream<
    Event,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeEventsRequest,
  output: DescribeEventsResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns details about one or more multi-Region clusters.
 */
export const describeMultiRegionClusters: {
  (
    input: DescribeMultiRegionClustersRequest,
  ): effect.Effect<
    DescribeMultiRegionClustersResponse,
    | ClusterNotFoundFault
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | MultiRegionClusterNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeMultiRegionClustersRequest,
  ) => stream.Stream<
    DescribeMultiRegionClustersResponse,
    | ClusterNotFoundFault
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | MultiRegionClusterNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeMultiRegionClustersRequest,
  ) => stream.Stream<
    MultiRegionCluster,
    | ClusterNotFoundFault
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | MultiRegionClusterNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeMultiRegionClustersRequest,
  output: DescribeMultiRegionClustersResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MultiRegionClusters",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of multi-region parameter groups.
 */
export const describeMultiRegionParameterGroups: (
  input: DescribeMultiRegionParameterGroupsRequest,
) => effect.Effect<
  DescribeMultiRegionParameterGroupsResponse,
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeMultiRegionParameterGroupsRequest,
  output: DescribeMultiRegionParameterGroupsResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
}));
/**
 * Returns the detailed parameter list for a particular multi-region parameter group.
 */
export const describeMultiRegionParameters: (
  input: DescribeMultiRegionParametersRequest,
) => effect.Effect<
  DescribeMultiRegionParametersResponse,
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeMultiRegionParametersRequest,
  output: DescribeMultiRegionParametersResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
}));
/**
 * Returns a list of parameter group descriptions. If a parameter group name is specified, the list contains only the descriptions for that group.
 */
export const describeParameterGroups: {
  (
    input: DescribeParameterGroupsRequest,
  ): effect.Effect<
    DescribeParameterGroupsResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ParameterGroupNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeParameterGroupsRequest,
  ) => stream.Stream<
    DescribeParameterGroupsResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ParameterGroupNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeParameterGroupsRequest,
  ) => stream.Stream<
    ParameterGroup,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ParameterGroupNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeParameterGroupsRequest,
  output: DescribeParameterGroupsResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ParameterGroups",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns the detailed parameter list for a particular parameter group.
 */
export const describeParameters: {
  (
    input: DescribeParametersRequest,
  ): effect.Effect<
    DescribeParametersResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ParameterGroupNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeParametersRequest,
  ) => stream.Stream<
    DescribeParametersResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ParameterGroupNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeParametersRequest,
  ) => stream.Stream<
    Parameter,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ParameterGroupNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeParametersRequest,
  output: DescribeParametersResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Parameters",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns information about reserved nodes for this account, or about a specified reserved node.
 */
export const describeReservedNodes: {
  (
    input: DescribeReservedNodesRequest,
  ): effect.Effect<
    DescribeReservedNodesResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ReservedNodeNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeReservedNodesRequest,
  ) => stream.Stream<
    DescribeReservedNodesResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ReservedNodeNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeReservedNodesRequest,
  ) => stream.Stream<
    ReservedNode,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ReservedNodeNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeReservedNodesRequest,
  output: DescribeReservedNodesResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedNodeNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReservedNodes",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists available reserved node offerings.
 */
export const describeReservedNodesOfferings: {
  (
    input: DescribeReservedNodesOfferingsRequest,
  ): effect.Effect<
    DescribeReservedNodesOfferingsResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ReservedNodesOfferingNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeReservedNodesOfferingsRequest,
  ) => stream.Stream<
    DescribeReservedNodesOfferingsResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ReservedNodesOfferingNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeReservedNodesOfferingsRequest,
  ) => stream.Stream<
    ReservedNodesOffering,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ReservedNodesOfferingNotFoundFault
    | ServiceLinkedRoleNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeReservedNodesOfferingsRequest,
  output: DescribeReservedNodesOfferingsResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedNodesOfferingNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReservedNodesOfferings",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns details of the service updates.
 */
export const describeServiceUpdates: {
  (
    input: DescribeServiceUpdatesRequest,
  ): effect.Effect<
    DescribeServiceUpdatesResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeServiceUpdatesRequest,
  ) => stream.Stream<
    DescribeServiceUpdatesResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeServiceUpdatesRequest,
  ) => stream.Stream<
    ServiceUpdate,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeServiceUpdatesRequest,
  output: DescribeServiceUpdatesResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceUpdates",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns information about cluster snapshots. By default, DescribeSnapshots lists all of your snapshots; it can optionally describe a single snapshot,
 * or just the snapshots associated with a particular cluster.
 */
export const describeSnapshots: {
  (
    input: DescribeSnapshotsRequest,
  ): effect.Effect<
    DescribeSnapshotsResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | SnapshotNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeSnapshotsRequest,
  ) => stream.Stream<
    DescribeSnapshotsResponse,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | SnapshotNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeSnapshotsRequest,
  ) => stream.Stream<
    Snapshot,
    | InvalidParameterCombinationException
    | InvalidParameterValueException
    | ServiceLinkedRoleNotFoundFault
    | SnapshotNotFoundFault
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeSnapshotsRequest,
  output: DescribeSnapshotsResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Snapshots",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of subnet group descriptions. If a subnet group name is specified, the list contains only the description of that group.
 */
export const describeSubnetGroups: {
  (
    input: DescribeSubnetGroupsRequest,
  ): effect.Effect<
    DescribeSubnetGroupsResponse,
    ServiceLinkedRoleNotFoundFault | SubnetGroupNotFoundFault | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeSubnetGroupsRequest,
  ) => stream.Stream<
    DescribeSubnetGroupsResponse,
    ServiceLinkedRoleNotFoundFault | SubnetGroupNotFoundFault | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeSubnetGroupsRequest,
  ) => stream.Stream<
    SubnetGroup,
    ServiceLinkedRoleNotFoundFault | SubnetGroupNotFoundFault | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeSubnetGroupsRequest,
  output: DescribeSubnetGroupsResponse,
  errors: [ServiceLinkedRoleNotFoundFault, SubnetGroupNotFoundFault],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SubnetGroups",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of users.
 */
export const describeUsers: {
  (
    input: DescribeUsersRequest,
  ): effect.Effect<
    DescribeUsersResponse,
    InvalidParameterCombinationException | UserNotFoundFault | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: DescribeUsersRequest,
  ) => stream.Stream<
    DescribeUsersResponse,
    InvalidParameterCombinationException | UserNotFoundFault | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeUsersRequest,
  ) => stream.Stream<
    User,
    InvalidParameterCombinationException | UserNotFoundFault | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeUsersRequest,
  output: DescribeUsersResponse,
  errors: [InvalidParameterCombinationException, UserNotFoundFault],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Used to failover a shard. This API is designed for testing the behavior of your application in case of MemoryDB failover. It is not designed to be used as a production-level tool for initiating
 * a failover to overcome a problem you may have with the cluster. Moreover, in certain conditions such as large scale operational events, Amazon may block this API.
 */
export const failoverShard: (
  input: FailoverShardRequest,
) => effect.Effect<
  FailoverShardResponse,
  | APICallRateForCustomerExceededFault
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidKMSKeyFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ShardNotFoundFault
  | TestFailoverNotAvailableFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: FailoverShardRequest,
  output: FailoverShardResponse,
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
}));
/**
 * Lists the allowed updates for a multi-Region cluster.
 */
export const listAllowedMultiRegionClusterUpdates: (
  input: ListAllowedMultiRegionClusterUpdatesRequest,
) => effect.Effect<
  ListAllowedMultiRegionClusterUpdatesResponse,
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListAllowedMultiRegionClusterUpdatesRequest,
  output: ListAllowedMultiRegionClusterUpdatesResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
  ],
}));
/**
 * Lists all available node types that you can scale to from your cluster's current node type.
 *
 * When you use the UpdateCluster operation to scale your cluster, the value of the NodeType parameter must be one of the node types returned by this operation.
 */
export const listAllowedNodeTypeUpdates: (
  input: ListAllowedNodeTypeUpdatesRequest,
) => effect.Effect<
  ListAllowedNodeTypeUpdatesResponse,
  | ClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListAllowedNodeTypeUpdatesRequest,
  output: ListAllowedNodeTypeUpdatesResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
}));
/**
 * Lists all tags currently on a named resource. A tag is a key-value pair where the key and value are case-sensitive. You can use tags to categorize and track your MemoryDB resources. For more information, see Tagging your MemoryDB resources.
 *
 * When you add or remove tags from multi region clusters, you might not immediately see the latest effective tags in the ListTags API response due to it being eventually consistent specifically for multi region clusters. For more information, see Tagging your MemoryDB resources.
 */
export const listTags: (
  input: ListTagsRequest,
) => effect.Effect<
  ListTagsResponse,
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
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsRequest,
  output: ListTagsResponse,
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
}));
/**
 * Allows you to purchase a reserved node offering. Reserved nodes are not eligible for cancellation and are non-refundable.
 */
export const purchaseReservedNodesOffering: (
  input: PurchaseReservedNodesOfferingRequest,
) => effect.Effect<
  PurchaseReservedNodesOfferingResponse,
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeQuotaExceededFault
  | ReservedNodesOfferingNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PurchaseReservedNodesOfferingRequest,
  output: PurchaseReservedNodesOfferingResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeQuotaExceededFault,
    ReservedNodesOfferingNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
}));
/**
 * Modifies the parameters of a parameter group to the engine or system default value. You can reset specific parameters by submitting a list of parameter names. To reset the entire parameter group, specify the AllParameters and ParameterGroupName parameters.
 */
export const resetParameterGroup: (
  input: ResetParameterGroupRequest,
) => effect.Effect<
  ResetParameterGroupResponse,
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResetParameterGroupRequest,
  output: ResetParameterGroupResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
}));
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
export const tagResource: (
  input: TagResourceRequest,
) => effect.Effect<
  TagResourceResponse,
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
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
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
}));
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
export const untagResource: (
  input: UntagResourceRequest,
) => effect.Effect<
  UntagResourceResponse,
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
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
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
}));
/**
 * Changes the list of users that belong to the Access Control List.
 */
export const updateACL: (
  input: UpdateACLRequest,
) => effect.Effect<
  UpdateACLResponse,
  | ACLNotFoundFault
  | DefaultUserRequired
  | DuplicateUserNameFault
  | InvalidACLStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | UserNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateACLRequest,
  output: UpdateACLResponse,
  errors: [
    ACLNotFoundFault,
    DefaultUserRequired,
    DuplicateUserNameFault,
    InvalidACLStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    UserNotFoundFault,
  ],
}));
/**
 * Modifies the settings for a cluster. You can use this operation to change one or more cluster configuration settings by specifying the settings and the new values.
 */
export const updateCluster: (
  input: UpdateClusterRequest,
) => effect.Effect<
  UpdateClusterResponse,
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
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateClusterRequest,
  output: UpdateClusterResponse,
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
}));
/**
 * Updates the configuration of an existing multi-Region cluster.
 */
export const updateMultiRegionCluster: (
  input: UpdateMultiRegionClusterRequest,
) => effect.Effect<
  UpdateMultiRegionClusterResponse,
  | InvalidMultiRegionClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | MultiRegionParameterGroupNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMultiRegionClusterRequest,
  output: UpdateMultiRegionClusterResponse,
  errors: [
    InvalidMultiRegionClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
    MultiRegionParameterGroupNotFoundFault,
  ],
}));
/**
 * Updates the parameters of a parameter group. You can modify up to 20 parameters in a single request by submitting a list parameter name and value pairs.
 */
export const updateParameterGroup: (
  input: UpdateParameterGroupRequest,
) => effect.Effect<
  UpdateParameterGroupResponse,
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateParameterGroupRequest,
  output: UpdateParameterGroupResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
}));
/**
 * Updates a subnet group. For more information, see Updating a subnet group
 */
export const updateSubnetGroup: (
  input: UpdateSubnetGroupRequest,
) => effect.Effect<
  UpdateSubnetGroupResponse,
  | InvalidSubnet
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupNotFoundFault
  | SubnetInUse
  | SubnetNotAllowedFault
  | SubnetQuotaExceededFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSubnetGroupRequest,
  output: UpdateSubnetGroupResponse,
  errors: [
    InvalidSubnet,
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupNotFoundFault,
    SubnetInUse,
    SubnetNotAllowedFault,
    SubnetQuotaExceededFault,
  ],
}));
/**
 * Changes user password(s) and/or access string.
 */
export const updateUser: (
  input: UpdateUserRequest,
) => effect.Effect<
  UpdateUserResponse,
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidUserStateFault
  | UserNotFoundFault
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateUserRequest,
  output: UpdateUserResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidUserStateFault,
    UserNotFoundFault,
  ],
}));
