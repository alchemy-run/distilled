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
const svc = T.AwsApiService({
  sdkId: "ManagedBlockchain",
  serviceShapeName: "TaigaWebService",
});
const auth = T.AwsAuthSigv4({ name: "managedblockchain" });
const ver = T.ServiceVersion("2018-09-24");
const proto = T.AwsProtocolsRestJson1();
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
              `https://managedblockchain-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://managedblockchain-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://managedblockchain.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://managedblockchain.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type ClientRequestTokenString = string;
export type TagKey = string;
export type TagValue = string;
export type ResourceIdString = string;
export type AccessorBillingTokenString = string;
export type ExceptionMessage = string;
export type ArnString = string;
export type NetworkMemberNameString = string;
export type DescriptionString = string;
export type UsernameString = string;
export type PasswordString = string | redacted.Redacted<string>;
export type Enabled = boolean;
export type NameString = string;
export type FrameworkVersionString = string;
export type ThresholdPercentageInt = number;
export type ProposalDurationInt = number;
export type InstanceTypeString = string;
export type AvailabilityZoneString = string;
export type PrincipalString = string;
export type VoteCount = number;
export type AccessorListMaxResults = number;
export type PaginationToken = string;
export type ProposalListMaxResults = number;
export type IsOwned = boolean;
export type MemberListMaxResults = number;
export type NetworkListMaxResults = number;
export type NodeListMaxResults = number;

//# Schemas
export type AccessorType = "BILLING_TOKEN" | (string & {});
export const AccessorType = S.String;
export type InputTagMap = { [key: string]: string | undefined };
export const InputTagMap = S.Record(S.String, S.String.pipe(S.optional));
export type AccessorNetworkType =
  | "ETHEREUM_GOERLI"
  | "ETHEREUM_MAINNET"
  | "ETHEREUM_MAINNET_AND_GOERLI"
  | "POLYGON_MAINNET"
  | "POLYGON_MUMBAI"
  | (string & {});
export const AccessorNetworkType = S.String;
export interface CreateAccessorInput {
  ClientRequestToken: string;
  AccessorType: AccessorType;
  Tags?: { [key: string]: string | undefined };
  NetworkType?: AccessorNetworkType;
}
export const CreateAccessorInput = S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
    AccessorType: AccessorType,
    Tags: S.optional(InputTagMap),
    NetworkType: S.optional(AccessorNetworkType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accessors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccessorInput",
}) as any as S.Schema<CreateAccessorInput>;
export interface CreateAccessorOutput {
  AccessorId?: string;
  BillingToken?: string;
  NetworkType?: AccessorNetworkType;
}
export const CreateAccessorOutput = S.suspend(() =>
  S.Struct({
    AccessorId: S.optional(S.String),
    BillingToken: S.optional(S.String),
    NetworkType: S.optional(AccessorNetworkType),
  }),
).annotate({
  identifier: "CreateAccessorOutput",
}) as any as S.Schema<CreateAccessorOutput>;
export interface MemberFabricConfiguration {
  AdminUsername: string;
  AdminPassword: string | redacted.Redacted<string>;
}
export const MemberFabricConfiguration = S.suspend(() =>
  S.Struct({ AdminUsername: S.String, AdminPassword: SensitiveString }),
).annotate({
  identifier: "MemberFabricConfiguration",
}) as any as S.Schema<MemberFabricConfiguration>;
export interface MemberFrameworkConfiguration {
  Fabric?: MemberFabricConfiguration;
}
export const MemberFrameworkConfiguration = S.suspend(() =>
  S.Struct({ Fabric: S.optional(MemberFabricConfiguration) }),
).annotate({
  identifier: "MemberFrameworkConfiguration",
}) as any as S.Schema<MemberFrameworkConfiguration>;
export interface LogConfiguration {
  Enabled?: boolean;
}
export const LogConfiguration = S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "LogConfiguration",
}) as any as S.Schema<LogConfiguration>;
export interface LogConfigurations {
  Cloudwatch?: LogConfiguration;
}
export const LogConfigurations = S.suspend(() =>
  S.Struct({ Cloudwatch: S.optional(LogConfiguration) }),
).annotate({
  identifier: "LogConfigurations",
}) as any as S.Schema<LogConfigurations>;
export interface MemberFabricLogPublishingConfiguration {
  CaLogs?: LogConfigurations;
}
export const MemberFabricLogPublishingConfiguration = S.suspend(() =>
  S.Struct({ CaLogs: S.optional(LogConfigurations) }),
).annotate({
  identifier: "MemberFabricLogPublishingConfiguration",
}) as any as S.Schema<MemberFabricLogPublishingConfiguration>;
export interface MemberLogPublishingConfiguration {
  Fabric?: MemberFabricLogPublishingConfiguration;
}
export const MemberLogPublishingConfiguration = S.suspend(() =>
  S.Struct({ Fabric: S.optional(MemberFabricLogPublishingConfiguration) }),
).annotate({
  identifier: "MemberLogPublishingConfiguration",
}) as any as S.Schema<MemberLogPublishingConfiguration>;
export interface MemberConfiguration {
  Name: string;
  Description?: string;
  FrameworkConfiguration: MemberFrameworkConfiguration;
  LogPublishingConfiguration?: MemberLogPublishingConfiguration;
  Tags?: { [key: string]: string | undefined };
  KmsKeyArn?: string;
}
export const MemberConfiguration = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    FrameworkConfiguration: MemberFrameworkConfiguration,
    LogPublishingConfiguration: S.optional(MemberLogPublishingConfiguration),
    Tags: S.optional(InputTagMap),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "MemberConfiguration",
}) as any as S.Schema<MemberConfiguration>;
export interface CreateMemberInput {
  ClientRequestToken: string;
  InvitationId: string;
  NetworkId: string;
  MemberConfiguration: MemberConfiguration;
}
export const CreateMemberInput = S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
    InvitationId: S.String,
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberConfiguration: MemberConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{NetworkId}/members" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMemberInput",
}) as any as S.Schema<CreateMemberInput>;
export interface CreateMemberOutput {
  MemberId?: string;
}
export const CreateMemberOutput = S.suspend(() =>
  S.Struct({ MemberId: S.optional(S.String) }),
).annotate({
  identifier: "CreateMemberOutput",
}) as any as S.Schema<CreateMemberOutput>;
export type Framework = "HYPERLEDGER_FABRIC" | "ETHEREUM" | (string & {});
export const Framework = S.String;
export type Edition = "STARTER" | "STANDARD" | (string & {});
export const Edition = S.String;
export interface NetworkFabricConfiguration {
  Edition: Edition;
}
export const NetworkFabricConfiguration = S.suspend(() =>
  S.Struct({ Edition: Edition }),
).annotate({
  identifier: "NetworkFabricConfiguration",
}) as any as S.Schema<NetworkFabricConfiguration>;
export interface NetworkFrameworkConfiguration {
  Fabric?: NetworkFabricConfiguration;
}
export const NetworkFrameworkConfiguration = S.suspend(() =>
  S.Struct({ Fabric: S.optional(NetworkFabricConfiguration) }),
).annotate({
  identifier: "NetworkFrameworkConfiguration",
}) as any as S.Schema<NetworkFrameworkConfiguration>;
export type ThresholdComparator =
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUAL_TO"
  | (string & {});
export const ThresholdComparator = S.String;
export interface ApprovalThresholdPolicy {
  ThresholdPercentage?: number;
  ProposalDurationInHours?: number;
  ThresholdComparator?: ThresholdComparator;
}
export const ApprovalThresholdPolicy = S.suspend(() =>
  S.Struct({
    ThresholdPercentage: S.optional(S.Number),
    ProposalDurationInHours: S.optional(S.Number),
    ThresholdComparator: S.optional(ThresholdComparator),
  }),
).annotate({
  identifier: "ApprovalThresholdPolicy",
}) as any as S.Schema<ApprovalThresholdPolicy>;
export interface VotingPolicy {
  ApprovalThresholdPolicy?: ApprovalThresholdPolicy;
}
export const VotingPolicy = S.suspend(() =>
  S.Struct({ ApprovalThresholdPolicy: S.optional(ApprovalThresholdPolicy) }),
).annotate({ identifier: "VotingPolicy" }) as any as S.Schema<VotingPolicy>;
export interface CreateNetworkInput {
  ClientRequestToken: string;
  Name: string;
  Description?: string;
  Framework: Framework;
  FrameworkVersion: string;
  FrameworkConfiguration?: NetworkFrameworkConfiguration;
  VotingPolicy: VotingPolicy;
  MemberConfiguration: MemberConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export const CreateNetworkInput = S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
    Name: S.String,
    Description: S.optional(S.String),
    Framework: Framework,
    FrameworkVersion: S.String,
    FrameworkConfiguration: S.optional(NetworkFrameworkConfiguration),
    VotingPolicy: VotingPolicy,
    MemberConfiguration: MemberConfiguration,
    Tags: S.optional(InputTagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateNetworkInput",
}) as any as S.Schema<CreateNetworkInput>;
export interface CreateNetworkOutput {
  NetworkId?: string;
  MemberId?: string;
}
export const CreateNetworkOutput = S.suspend(() =>
  S.Struct({ NetworkId: S.optional(S.String), MemberId: S.optional(S.String) }),
).annotate({
  identifier: "CreateNetworkOutput",
}) as any as S.Schema<CreateNetworkOutput>;
export interface NodeFabricLogPublishingConfiguration {
  ChaincodeLogs?: LogConfigurations;
  PeerLogs?: LogConfigurations;
}
export const NodeFabricLogPublishingConfiguration = S.suspend(() =>
  S.Struct({
    ChaincodeLogs: S.optional(LogConfigurations),
    PeerLogs: S.optional(LogConfigurations),
  }),
).annotate({
  identifier: "NodeFabricLogPublishingConfiguration",
}) as any as S.Schema<NodeFabricLogPublishingConfiguration>;
export interface NodeLogPublishingConfiguration {
  Fabric?: NodeFabricLogPublishingConfiguration;
}
export const NodeLogPublishingConfiguration = S.suspend(() =>
  S.Struct({ Fabric: S.optional(NodeFabricLogPublishingConfiguration) }),
).annotate({
  identifier: "NodeLogPublishingConfiguration",
}) as any as S.Schema<NodeLogPublishingConfiguration>;
export type StateDBType = "LevelDB" | "CouchDB" | (string & {});
export const StateDBType = S.String;
export interface NodeConfiguration {
  InstanceType: string;
  AvailabilityZone?: string;
  LogPublishingConfiguration?: NodeLogPublishingConfiguration;
  StateDB?: StateDBType;
}
export const NodeConfiguration = S.suspend(() =>
  S.Struct({
    InstanceType: S.String,
    AvailabilityZone: S.optional(S.String),
    LogPublishingConfiguration: S.optional(NodeLogPublishingConfiguration),
    StateDB: S.optional(StateDBType),
  }),
).annotate({
  identifier: "NodeConfiguration",
}) as any as S.Schema<NodeConfiguration>;
export interface CreateNodeInput {
  ClientRequestToken: string;
  NetworkId: string;
  MemberId?: string;
  NodeConfiguration: NodeConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export const CreateNodeInput = S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.optional(S.String),
    NodeConfiguration: NodeConfiguration,
    Tags: S.optional(InputTagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{NetworkId}/nodes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateNodeInput",
}) as any as S.Schema<CreateNodeInput>;
export interface CreateNodeOutput {
  NodeId?: string;
}
export const CreateNodeOutput = S.suspend(() =>
  S.Struct({ NodeId: S.optional(S.String) }),
).annotate({
  identifier: "CreateNodeOutput",
}) as any as S.Schema<CreateNodeOutput>;
export interface InviteAction {
  Principal: string;
}
export const InviteAction = S.suspend(() =>
  S.Struct({ Principal: S.String }),
).annotate({ identifier: "InviteAction" }) as any as S.Schema<InviteAction>;
export type InviteActionList = InviteAction[];
export const InviteActionList = S.Array(InviteAction);
export interface RemoveAction {
  MemberId: string;
}
export const RemoveAction = S.suspend(() =>
  S.Struct({ MemberId: S.String }),
).annotate({ identifier: "RemoveAction" }) as any as S.Schema<RemoveAction>;
export type RemoveActionList = RemoveAction[];
export const RemoveActionList = S.Array(RemoveAction);
export interface ProposalActions {
  Invitations?: InviteAction[];
  Removals?: RemoveAction[];
}
export const ProposalActions = S.suspend(() =>
  S.Struct({
    Invitations: S.optional(InviteActionList),
    Removals: S.optional(RemoveActionList),
  }),
).annotate({
  identifier: "ProposalActions",
}) as any as S.Schema<ProposalActions>;
export interface CreateProposalInput {
  ClientRequestToken: string;
  NetworkId: string;
  MemberId: string;
  Actions: ProposalActions;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateProposalInput = S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.String,
    Actions: ProposalActions,
    Description: S.optional(S.String),
    Tags: S.optional(InputTagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{NetworkId}/proposals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProposalInput",
}) as any as S.Schema<CreateProposalInput>;
export interface CreateProposalOutput {
  ProposalId?: string;
}
export const CreateProposalOutput = S.suspend(() =>
  S.Struct({ ProposalId: S.optional(S.String) }),
).annotate({
  identifier: "CreateProposalOutput",
}) as any as S.Schema<CreateProposalOutput>;
export interface DeleteAccessorInput {
  AccessorId: string;
}
export const DeleteAccessorInput = S.suspend(() =>
  S.Struct({ AccessorId: S.String.pipe(T.HttpLabel("AccessorId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/accessors/{AccessorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccessorInput",
}) as any as S.Schema<DeleteAccessorInput>;
export interface DeleteAccessorOutput {}
export const DeleteAccessorOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteAccessorOutput",
}) as any as S.Schema<DeleteAccessorOutput>;
export interface DeleteMemberInput {
  NetworkId: string;
  MemberId: string;
}
export const DeleteMemberInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.String.pipe(T.HttpLabel("MemberId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/networks/{NetworkId}/members/{MemberId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMemberInput",
}) as any as S.Schema<DeleteMemberInput>;
export interface DeleteMemberOutput {}
export const DeleteMemberOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteMemberOutput",
}) as any as S.Schema<DeleteMemberOutput>;
export interface DeleteNodeInput {
  NetworkId: string;
  MemberId?: string;
  NodeId: string;
}
export const DeleteNodeInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.optional(S.String).pipe(T.HttpQuery("memberId")),
    NodeId: S.String.pipe(T.HttpLabel("NodeId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/networks/{NetworkId}/nodes/{NodeId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteNodeInput",
}) as any as S.Schema<DeleteNodeInput>;
export interface DeleteNodeOutput {}
export const DeleteNodeOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteNodeOutput",
}) as any as S.Schema<DeleteNodeOutput>;
export interface GetAccessorInput {
  AccessorId: string;
}
export const GetAccessorInput = S.suspend(() =>
  S.Struct({ AccessorId: S.String.pipe(T.HttpLabel("AccessorId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accessors/{AccessorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccessorInput",
}) as any as S.Schema<GetAccessorInput>;
export type AccessorStatus =
  | "AVAILABLE"
  | "PENDING_DELETION"
  | "DELETED"
  | (string & {});
export const AccessorStatus = S.String;
export type OutputTagMap = { [key: string]: string | undefined };
export const OutputTagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface Accessor {
  Id?: string;
  Type?: AccessorType;
  BillingToken?: string;
  Status?: AccessorStatus;
  CreationDate?: Date;
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
  NetworkType?: AccessorNetworkType;
}
export const Accessor = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Type: S.optional(AccessorType),
    BillingToken: S.optional(S.String),
    Status: S.optional(AccessorStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Arn: S.optional(S.String),
    Tags: S.optional(OutputTagMap),
    NetworkType: S.optional(AccessorNetworkType),
  }),
).annotate({ identifier: "Accessor" }) as any as S.Schema<Accessor>;
export interface GetAccessorOutput {
  Accessor?: Accessor;
}
export const GetAccessorOutput = S.suspend(() =>
  S.Struct({ Accessor: S.optional(Accessor) }),
).annotate({
  identifier: "GetAccessorOutput",
}) as any as S.Schema<GetAccessorOutput>;
export interface GetMemberInput {
  NetworkId: string;
  MemberId: string;
}
export const GetMemberInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.String.pipe(T.HttpLabel("MemberId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/networks/{NetworkId}/members/{MemberId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetMemberInput" }) as any as S.Schema<GetMemberInput>;
export interface MemberFabricAttributes {
  AdminUsername?: string;
  CaEndpoint?: string;
}
export const MemberFabricAttributes = S.suspend(() =>
  S.Struct({
    AdminUsername: S.optional(S.String),
    CaEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "MemberFabricAttributes",
}) as any as S.Schema<MemberFabricAttributes>;
export interface MemberFrameworkAttributes {
  Fabric?: MemberFabricAttributes;
}
export const MemberFrameworkAttributes = S.suspend(() =>
  S.Struct({ Fabric: S.optional(MemberFabricAttributes) }),
).annotate({
  identifier: "MemberFrameworkAttributes",
}) as any as S.Schema<MemberFrameworkAttributes>;
export type MemberStatus =
  | "CREATING"
  | "AVAILABLE"
  | "CREATE_FAILED"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "INACCESSIBLE_ENCRYPTION_KEY"
  | (string & {});
export const MemberStatus = S.String;
export interface Member {
  NetworkId?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  FrameworkAttributes?: MemberFrameworkAttributes;
  LogPublishingConfiguration?: MemberLogPublishingConfiguration;
  Status?: MemberStatus;
  CreationDate?: Date;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
  KmsKeyArn?: string;
}
export const Member = S.suspend(() =>
  S.Struct({
    NetworkId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    FrameworkAttributes: S.optional(MemberFrameworkAttributes),
    LogPublishingConfiguration: S.optional(MemberLogPublishingConfiguration),
    Status: S.optional(MemberStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Tags: S.optional(OutputTagMap),
    Arn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "Member" }) as any as S.Schema<Member>;
export interface GetMemberOutput {
  Member?: Member;
}
export const GetMemberOutput = S.suspend(() =>
  S.Struct({ Member: S.optional(Member) }),
).annotate({
  identifier: "GetMemberOutput",
}) as any as S.Schema<GetMemberOutput>;
export interface GetNetworkInput {
  NetworkId: string;
}
export const GetNetworkInput = S.suspend(() =>
  S.Struct({ NetworkId: S.String.pipe(T.HttpLabel("NetworkId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{NetworkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNetworkInput",
}) as any as S.Schema<GetNetworkInput>;
export interface NetworkFabricAttributes {
  OrderingServiceEndpoint?: string;
  Edition?: Edition;
}
export const NetworkFabricAttributes = S.suspend(() =>
  S.Struct({
    OrderingServiceEndpoint: S.optional(S.String),
    Edition: S.optional(Edition),
  }),
).annotate({
  identifier: "NetworkFabricAttributes",
}) as any as S.Schema<NetworkFabricAttributes>;
export interface NetworkEthereumAttributes {
  ChainId?: string;
}
export const NetworkEthereumAttributes = S.suspend(() =>
  S.Struct({ ChainId: S.optional(S.String) }),
).annotate({
  identifier: "NetworkEthereumAttributes",
}) as any as S.Schema<NetworkEthereumAttributes>;
export interface NetworkFrameworkAttributes {
  Fabric?: NetworkFabricAttributes;
  Ethereum?: NetworkEthereumAttributes;
}
export const NetworkFrameworkAttributes = S.suspend(() =>
  S.Struct({
    Fabric: S.optional(NetworkFabricAttributes),
    Ethereum: S.optional(NetworkEthereumAttributes),
  }),
).annotate({
  identifier: "NetworkFrameworkAttributes",
}) as any as S.Schema<NetworkFrameworkAttributes>;
export type NetworkStatus =
  | "CREATING"
  | "AVAILABLE"
  | "CREATE_FAILED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const NetworkStatus = S.String;
export interface Network {
  Id?: string;
  Name?: string;
  Description?: string;
  Framework?: Framework;
  FrameworkVersion?: string;
  FrameworkAttributes?: NetworkFrameworkAttributes;
  VpcEndpointServiceName?: string;
  VotingPolicy?: VotingPolicy;
  Status?: NetworkStatus;
  CreationDate?: Date;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export const Network = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Framework: S.optional(Framework),
    FrameworkVersion: S.optional(S.String),
    FrameworkAttributes: S.optional(NetworkFrameworkAttributes),
    VpcEndpointServiceName: S.optional(S.String),
    VotingPolicy: S.optional(VotingPolicy),
    Status: S.optional(NetworkStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Tags: S.optional(OutputTagMap),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "Network" }) as any as S.Schema<Network>;
export interface GetNetworkOutput {
  Network?: Network;
}
export const GetNetworkOutput = S.suspend(() =>
  S.Struct({ Network: S.optional(Network) }),
).annotate({
  identifier: "GetNetworkOutput",
}) as any as S.Schema<GetNetworkOutput>;
export interface GetNodeInput {
  NetworkId: string;
  MemberId?: string;
  NodeId: string;
}
export const GetNodeInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.optional(S.String).pipe(T.HttpQuery("memberId")),
    NodeId: S.String.pipe(T.HttpLabel("NodeId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{NetworkId}/nodes/{NodeId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetNodeInput" }) as any as S.Schema<GetNodeInput>;
export interface NodeFabricAttributes {
  PeerEndpoint?: string;
  PeerEventEndpoint?: string;
}
export const NodeFabricAttributes = S.suspend(() =>
  S.Struct({
    PeerEndpoint: S.optional(S.String),
    PeerEventEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "NodeFabricAttributes",
}) as any as S.Schema<NodeFabricAttributes>;
export interface NodeEthereumAttributes {
  HttpEndpoint?: string;
  WebSocketEndpoint?: string;
}
export const NodeEthereumAttributes = S.suspend(() =>
  S.Struct({
    HttpEndpoint: S.optional(S.String),
    WebSocketEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "NodeEthereumAttributes",
}) as any as S.Schema<NodeEthereumAttributes>;
export interface NodeFrameworkAttributes {
  Fabric?: NodeFabricAttributes;
  Ethereum?: NodeEthereumAttributes;
}
export const NodeFrameworkAttributes = S.suspend(() =>
  S.Struct({
    Fabric: S.optional(NodeFabricAttributes),
    Ethereum: S.optional(NodeEthereumAttributes),
  }),
).annotate({
  identifier: "NodeFrameworkAttributes",
}) as any as S.Schema<NodeFrameworkAttributes>;
export type NodeStatus =
  | "CREATING"
  | "AVAILABLE"
  | "UNHEALTHY"
  | "CREATE_FAILED"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "FAILED"
  | "INACCESSIBLE_ENCRYPTION_KEY"
  | (string & {});
export const NodeStatus = S.String;
export interface Node {
  NetworkId?: string;
  MemberId?: string;
  Id?: string;
  InstanceType?: string;
  AvailabilityZone?: string;
  FrameworkAttributes?: NodeFrameworkAttributes;
  LogPublishingConfiguration?: NodeLogPublishingConfiguration;
  StateDB?: StateDBType;
  Status?: NodeStatus;
  CreationDate?: Date;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
  KmsKeyArn?: string;
}
export const Node = S.suspend(() =>
  S.Struct({
    NetworkId: S.optional(S.String),
    MemberId: S.optional(S.String),
    Id: S.optional(S.String),
    InstanceType: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    FrameworkAttributes: S.optional(NodeFrameworkAttributes),
    LogPublishingConfiguration: S.optional(NodeLogPublishingConfiguration),
    StateDB: S.optional(StateDBType),
    Status: S.optional(NodeStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Tags: S.optional(OutputTagMap),
    Arn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "Node" }) as any as S.Schema<Node>;
export interface GetNodeOutput {
  Node?: Node;
}
export const GetNodeOutput = S.suspend(() =>
  S.Struct({ Node: S.optional(Node) }),
).annotate({ identifier: "GetNodeOutput" }) as any as S.Schema<GetNodeOutput>;
export interface GetProposalInput {
  NetworkId: string;
  ProposalId: string;
}
export const GetProposalInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    ProposalId: S.String.pipe(T.HttpLabel("ProposalId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/networks/{NetworkId}/proposals/{ProposalId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProposalInput",
}) as any as S.Schema<GetProposalInput>;
export type ProposalStatus =
  | "IN_PROGRESS"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED"
  | "ACTION_FAILED"
  | (string & {});
export const ProposalStatus = S.String;
export interface Proposal {
  ProposalId?: string;
  NetworkId?: string;
  Description?: string;
  Actions?: ProposalActions;
  ProposedByMemberId?: string;
  ProposedByMemberName?: string;
  Status?: ProposalStatus;
  CreationDate?: Date;
  ExpirationDate?: Date;
  YesVoteCount?: number;
  NoVoteCount?: number;
  OutstandingVoteCount?: number;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export const Proposal = S.suspend(() =>
  S.Struct({
    ProposalId: S.optional(S.String),
    NetworkId: S.optional(S.String),
    Description: S.optional(S.String),
    Actions: S.optional(ProposalActions),
    ProposedByMemberId: S.optional(S.String),
    ProposedByMemberName: S.optional(S.String),
    Status: S.optional(ProposalStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    YesVoteCount: S.optional(S.Number),
    NoVoteCount: S.optional(S.Number),
    OutstandingVoteCount: S.optional(S.Number),
    Tags: S.optional(OutputTagMap),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "Proposal" }) as any as S.Schema<Proposal>;
export interface GetProposalOutput {
  Proposal?: Proposal;
}
export const GetProposalOutput = S.suspend(() =>
  S.Struct({ Proposal: S.optional(Proposal) }),
).annotate({
  identifier: "GetProposalOutput",
}) as any as S.Schema<GetProposalOutput>;
export interface ListAccessorsInput {
  MaxResults?: number;
  NextToken?: string;
  NetworkType?: AccessorNetworkType;
}
export const ListAccessorsInput = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    NetworkType: S.optional(AccessorNetworkType).pipe(
      T.HttpQuery("networkType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accessors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccessorsInput",
}) as any as S.Schema<ListAccessorsInput>;
export interface AccessorSummary {
  Id?: string;
  Type?: AccessorType;
  Status?: AccessorStatus;
  CreationDate?: Date;
  Arn?: string;
  NetworkType?: AccessorNetworkType;
}
export const AccessorSummary = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Type: S.optional(AccessorType),
    Status: S.optional(AccessorStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Arn: S.optional(S.String),
    NetworkType: S.optional(AccessorNetworkType),
  }),
).annotate({
  identifier: "AccessorSummary",
}) as any as S.Schema<AccessorSummary>;
export type AccessorSummaryList = AccessorSummary[];
export const AccessorSummaryList = S.Array(AccessorSummary);
export interface ListAccessorsOutput {
  Accessors?: AccessorSummary[];
  NextToken?: string;
}
export const ListAccessorsOutput = S.suspend(() =>
  S.Struct({
    Accessors: S.optional(AccessorSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccessorsOutput",
}) as any as S.Schema<ListAccessorsOutput>;
export interface ListInvitationsInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListInvitationsInput = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/invitations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInvitationsInput",
}) as any as S.Schema<ListInvitationsInput>;
export type InvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "ACCEPTING"
  | "REJECTED"
  | "EXPIRED"
  | (string & {});
export const InvitationStatus = S.String;
export interface NetworkSummary {
  Id?: string;
  Name?: string;
  Description?: string;
  Framework?: Framework;
  FrameworkVersion?: string;
  Status?: NetworkStatus;
  CreationDate?: Date;
  Arn?: string;
}
export const NetworkSummary = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Framework: S.optional(Framework),
    FrameworkVersion: S.optional(S.String),
    Status: S.optional(NetworkStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "NetworkSummary" }) as any as S.Schema<NetworkSummary>;
export interface Invitation {
  InvitationId?: string;
  CreationDate?: Date;
  ExpirationDate?: Date;
  Status?: InvitationStatus;
  NetworkSummary?: NetworkSummary;
  Arn?: string;
}
export const Invitation = S.suspend(() =>
  S.Struct({
    InvitationId: S.optional(S.String),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(InvitationStatus),
    NetworkSummary: S.optional(NetworkSummary),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "Invitation" }) as any as S.Schema<Invitation>;
export type InvitationList = Invitation[];
export const InvitationList = S.Array(Invitation);
export interface ListInvitationsOutput {
  Invitations?: Invitation[];
  NextToken?: string;
}
export const ListInvitationsOutput = S.suspend(() =>
  S.Struct({
    Invitations: S.optional(InvitationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInvitationsOutput",
}) as any as S.Schema<ListInvitationsOutput>;
export interface ListMembersInput {
  NetworkId: string;
  Name?: string;
  Status?: MemberStatus;
  IsOwned?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export const ListMembersInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    Name: S.optional(S.String).pipe(T.HttpQuery("name")),
    Status: S.optional(MemberStatus).pipe(T.HttpQuery("status")),
    IsOwned: S.optional(S.Boolean).pipe(T.HttpQuery("isOwned")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{NetworkId}/members" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMembersInput",
}) as any as S.Schema<ListMembersInput>;
export interface MemberSummary {
  Id?: string;
  Name?: string;
  Description?: string;
  Status?: MemberStatus;
  CreationDate?: Date;
  IsOwned?: boolean;
  Arn?: string;
}
export const MemberSummary = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(MemberStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    IsOwned: S.optional(S.Boolean),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "MemberSummary" }) as any as S.Schema<MemberSummary>;
export type MemberSummaryList = MemberSummary[];
export const MemberSummaryList = S.Array(MemberSummary);
export interface ListMembersOutput {
  Members?: MemberSummary[];
  NextToken?: string;
}
export const ListMembersOutput = S.suspend(() =>
  S.Struct({
    Members: S.optional(MemberSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMembersOutput",
}) as any as S.Schema<ListMembersOutput>;
export interface ListNetworksInput {
  Name?: string;
  Framework?: Framework;
  Status?: NetworkStatus;
  MaxResults?: number;
  NextToken?: string;
}
export const ListNetworksInput = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String).pipe(T.HttpQuery("name")),
    Framework: S.optional(Framework).pipe(T.HttpQuery("framework")),
    Status: S.optional(NetworkStatus).pipe(T.HttpQuery("status")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNetworksInput",
}) as any as S.Schema<ListNetworksInput>;
export type NetworkSummaryList = NetworkSummary[];
export const NetworkSummaryList = S.Array(NetworkSummary);
export interface ListNetworksOutput {
  Networks?: NetworkSummary[];
  NextToken?: string;
}
export const ListNetworksOutput = S.suspend(() =>
  S.Struct({
    Networks: S.optional(NetworkSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNetworksOutput",
}) as any as S.Schema<ListNetworksOutput>;
export interface ListNodesInput {
  NetworkId: string;
  MemberId?: string;
  Status?: NodeStatus;
  MaxResults?: number;
  NextToken?: string;
}
export const ListNodesInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.optional(S.String).pipe(T.HttpQuery("memberId")),
    Status: S.optional(NodeStatus).pipe(T.HttpQuery("status")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{NetworkId}/nodes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ListNodesInput" }) as any as S.Schema<ListNodesInput>;
export interface NodeSummary {
  Id?: string;
  Status?: NodeStatus;
  CreationDate?: Date;
  AvailabilityZone?: string;
  InstanceType?: string;
  Arn?: string;
}
export const NodeSummary = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Status: S.optional(NodeStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    AvailabilityZone: S.optional(S.String),
    InstanceType: S.optional(S.String),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "NodeSummary" }) as any as S.Schema<NodeSummary>;
export type NodeSummaryList = NodeSummary[];
export const NodeSummaryList = S.Array(NodeSummary);
export interface ListNodesOutput {
  Nodes?: NodeSummary[];
  NextToken?: string;
}
export const ListNodesOutput = S.suspend(() =>
  S.Struct({
    Nodes: S.optional(NodeSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNodesOutput",
}) as any as S.Schema<ListNodesOutput>;
export interface ListProposalsInput {
  NetworkId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListProposalsInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{NetworkId}/proposals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProposalsInput",
}) as any as S.Schema<ListProposalsInput>;
export interface ProposalSummary {
  ProposalId?: string;
  Description?: string;
  ProposedByMemberId?: string;
  ProposedByMemberName?: string;
  Status?: ProposalStatus;
  CreationDate?: Date;
  ExpirationDate?: Date;
  Arn?: string;
}
export const ProposalSummary = S.suspend(() =>
  S.Struct({
    ProposalId: S.optional(S.String),
    Description: S.optional(S.String),
    ProposedByMemberId: S.optional(S.String),
    ProposedByMemberName: S.optional(S.String),
    Status: S.optional(ProposalStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Arn: S.optional(S.String),
  }),
).annotate({
  identifier: "ProposalSummary",
}) as any as S.Schema<ProposalSummary>;
export type ProposalSummaryList = ProposalSummary[];
export const ProposalSummaryList = S.Array(ProposalSummary);
export interface ListProposalsOutput {
  Proposals?: ProposalSummary[];
  NextToken?: string;
}
export const ListProposalsOutput = S.suspend(() =>
  S.Struct({
    Proposals: S.optional(ProposalSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProposalsOutput",
}) as any as S.Schema<ListProposalsOutput>;
export interface ListProposalVotesInput {
  NetworkId: string;
  ProposalId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListProposalVotesInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    ProposalId: S.String.pipe(T.HttpLabel("ProposalId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/networks/{NetworkId}/proposals/{ProposalId}/votes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProposalVotesInput",
}) as any as S.Schema<ListProposalVotesInput>;
export type VoteValue = "YES" | "NO" | (string & {});
export const VoteValue = S.String;
export interface VoteSummary {
  Vote?: VoteValue;
  MemberName?: string;
  MemberId?: string;
}
export const VoteSummary = S.suspend(() =>
  S.Struct({
    Vote: S.optional(VoteValue),
    MemberName: S.optional(S.String),
    MemberId: S.optional(S.String),
  }),
).annotate({ identifier: "VoteSummary" }) as any as S.Schema<VoteSummary>;
export type ProposalVoteList = VoteSummary[];
export const ProposalVoteList = S.Array(VoteSummary);
export interface ListProposalVotesOutput {
  ProposalVotes?: VoteSummary[];
  NextToken?: string;
}
export const ListProposalVotesOutput = S.suspend(() =>
  S.Struct({
    ProposalVotes: S.optional(ProposalVoteList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProposalVotesOutput",
}) as any as S.Schema<ListProposalVotesOutput>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(OutputTagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RejectInvitationInput {
  InvitationId: string;
}
export const RejectInvitationInput = S.suspend(() =>
  S.Struct({ InvitationId: S.String.pipe(T.HttpLabel("InvitationId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/invitations/{InvitationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectInvitationInput",
}) as any as S.Schema<RejectInvitationInput>;
export interface RejectInvitationOutput {}
export const RejectInvitationOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "RejectInvitationOutput",
}) as any as S.Schema<RejectInvitationOutput>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: InputTagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateMemberInput {
  NetworkId: string;
  MemberId: string;
  LogPublishingConfiguration?: MemberLogPublishingConfiguration;
}
export const UpdateMemberInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.String.pipe(T.HttpLabel("MemberId")),
    LogPublishingConfiguration: S.optional(MemberLogPublishingConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/networks/{NetworkId}/members/{MemberId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMemberInput",
}) as any as S.Schema<UpdateMemberInput>;
export interface UpdateMemberOutput {}
export const UpdateMemberOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "UpdateMemberOutput",
}) as any as S.Schema<UpdateMemberOutput>;
export interface UpdateNodeInput {
  NetworkId: string;
  MemberId?: string;
  NodeId: string;
  LogPublishingConfiguration?: NodeLogPublishingConfiguration;
}
export const UpdateNodeInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.optional(S.String),
    NodeId: S.String.pipe(T.HttpLabel("NodeId")),
    LogPublishingConfiguration: S.optional(NodeLogPublishingConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/networks/{NetworkId}/nodes/{NodeId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateNodeInput",
}) as any as S.Schema<UpdateNodeInput>;
export interface UpdateNodeOutput {}
export const UpdateNodeOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "UpdateNodeOutput",
}) as any as S.Schema<UpdateNodeOutput>;
export interface VoteOnProposalInput {
  NetworkId: string;
  ProposalId: string;
  VoterMemberId: string;
  Vote: VoteValue;
}
export const VoteOnProposalInput = S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    ProposalId: S.String.pipe(T.HttpLabel("ProposalId")),
    VoterMemberId: S.String,
    Vote: VoteValue,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/networks/{NetworkId}/proposals/{ProposalId}/votes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "VoteOnProposalInput",
}) as any as S.Schema<VoteOnProposalInput>;
export interface VoteOnProposalOutput {}
export const VoteOnProposalOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "VoteOnProposalOutput",
}) as any as S.Schema<VoteOnProposalOutput>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class InternalServiceErrorException extends S.TaggedErrorClass<InternalServiceErrorException>()(
  "InternalServiceErrorException",
  {},
).pipe(C.withServerError) {}
export class InvalidRequestException extends S.TaggedErrorClass<InvalidRequestException>()(
  "InvalidRequestException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException extends S.TaggedErrorClass<ResourceAlreadyExistsException>()(
  "ResourceAlreadyExistsException",
  { Message: S.optional(S.String) },
).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceLimitExceededException extends S.TaggedErrorClass<ResourceLimitExceededException>()(
  "ResourceLimitExceededException",
  { Message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  {},
).pipe(C.withThrottlingError) {}
export class TooManyTagsException extends S.TaggedErrorClass<TooManyTagsException>()(
  "TooManyTagsException",
  { Message: S.optional(S.String), ResourceName: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Message: S.optional(S.String), ResourceName: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceNotReadyException extends S.TaggedErrorClass<ResourceNotReadyException>()(
  "ResourceNotReadyException",
  { Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class IllegalActionException extends S.TaggedErrorClass<IllegalActionException>()(
  "IllegalActionException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Creates a new accessor for use with Amazon Managed Blockchain service that supports token based access.
 * The accessor contains information required for token based access.
 */
export const createAccessor: (
  input: CreateAccessorInput,
) => effect.Effect<
  CreateAccessorOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAccessorInput,
  output: CreateAccessorOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ThrottlingException,
    TooManyTagsException,
  ],
}));
/**
 * Creates a member within a Managed Blockchain network.
 *
 * Applies only to Hyperledger Fabric.
 */
export const createMember: (
  input: CreateMemberInput,
) => effect.Effect<
  CreateMemberOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMemberInput,
  output: CreateMemberOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
    TooManyTagsException,
  ],
}));
/**
 * Creates a new blockchain network using Amazon Managed Blockchain.
 *
 * Applies only to Hyperledger Fabric.
 */
export const createNetwork: (
  input: CreateNetworkInput,
) => effect.Effect<
  CreateNetworkOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateNetworkInput,
  output: CreateNetworkOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ThrottlingException,
    TooManyTagsException,
  ],
}));
/**
 * Creates a node on the specified blockchain network.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const createNode: (
  input: CreateNodeInput,
) => effect.Effect<
  CreateNodeOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateNodeInput,
  output: CreateNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
    TooManyTagsException,
  ],
}));
/**
 * Creates a proposal for a change to the network that other members of the network can vote on, for example, a proposal to add a new member to the network. Any member can create a proposal.
 *
 * Applies only to Hyperledger Fabric.
 */
export const createProposal: (
  input: CreateProposalInput,
) => effect.Effect<
  CreateProposalOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProposalInput,
  output: CreateProposalOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
    TooManyTagsException,
  ],
}));
/**
 * Deletes an accessor that your Amazon Web Services account owns. An accessor object is a container that has the
 * information required for token based access to your Ethereum nodes including, the
 * `BILLING_TOKEN`. After an accessor is deleted, the status of the accessor changes
 * from `AVAILABLE` to `PENDING_DELETION`. An accessor in the
 * `PENDING_DELETION` state can’t be used for new WebSocket requests or
 * HTTP requests. However, WebSocket connections that were initiated while the accessor was in the
 * `AVAILABLE` state remain open until they expire (up to 2 hours).
 */
export const deleteAccessor: (
  input: DeleteAccessorInput,
) => effect.Effect<
  DeleteAccessorOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAccessorInput,
  output: DeleteAccessorOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Deletes a member. Deleting a member removes the member and all associated resources from the network. `DeleteMember` can only be called for a specified `MemberId` if the principal performing the action is associated with the Amazon Web Services account that owns the member. In all other cases, the `DeleteMember` action is carried out as the result of an approved proposal to remove a member. If `MemberId` is the last member in a network specified by the last Amazon Web Services account, the network is deleted also.
 *
 * Applies only to Hyperledger Fabric.
 */
export const deleteMember: (
  input: DeleteMemberInput,
) => effect.Effect<
  DeleteMemberOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMemberInput,
  output: DeleteMemberOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
}));
/**
 * Deletes a node that your Amazon Web Services account owns. All data on the node is lost and cannot be recovered.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const deleteNode: (
  input: DeleteNodeInput,
) => effect.Effect<
  DeleteNodeOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteNodeInput,
  output: DeleteNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
}));
/**
 * Returns detailed information about an accessor. An accessor object is a container that has the
 * information required for token based access to your Ethereum nodes.
 */
export const getAccessor: (
  input: GetAccessorInput,
) => effect.Effect<
  GetAccessorOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccessorInput,
  output: GetAccessorOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Returns detailed information about a member.
 *
 * Applies only to Hyperledger Fabric.
 */
export const getMember: (
  input: GetMemberInput,
) => effect.Effect<
  GetMemberOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMemberInput,
  output: GetMemberOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Returns detailed information about a network.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const getNetwork: (
  input: GetNetworkInput,
) => effect.Effect<
  GetNetworkOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNetworkInput,
  output: GetNetworkOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Returns detailed information about a node.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const getNode: (
  input: GetNodeInput,
) => effect.Effect<
  GetNodeOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNodeInput,
  output: GetNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Returns detailed information about a proposal.
 *
 * Applies only to Hyperledger Fabric.
 */
export const getProposal: (
  input: GetProposalInput,
) => effect.Effect<
  GetProposalOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProposalInput,
  output: GetProposalOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Returns a list of the accessors and their properties. Accessor objects are containers that have the
 * information required for token based access to your Ethereum nodes.
 */
export const listAccessors: {
  (
    input: ListAccessorsInput,
  ): effect.Effect<
    ListAccessorsOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListAccessorsInput,
  ) => stream.Stream<
    ListAccessorsOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAccessorsInput,
  ) => stream.Stream<
    AccessorSummary,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccessorsInput,
  output: ListAccessorsOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Accessors",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of all invitations for the current Amazon Web Services account.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listInvitations: {
  (
    input: ListInvitationsInput,
  ): effect.Effect<
    ListInvitationsOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ResourceLimitExceededException
    | ResourceNotFoundException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListInvitationsInput,
  ) => stream.Stream<
    ListInvitationsOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ResourceLimitExceededException
    | ResourceNotFoundException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListInvitationsInput,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ResourceLimitExceededException
    | ResourceNotFoundException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInvitationsInput,
  output: ListInvitationsOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of the members in a network and properties of their configurations.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listMembers: {
  (
    input: ListMembersInput,
  ): effect.Effect<
    ListMembersOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListMembersInput,
  ) => stream.Stream<
    ListMembersOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMembersInput,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMembersInput,
  output: ListMembersOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns information about the networks in which the current Amazon Web Services account participates.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const listNetworks: {
  (
    input: ListNetworksInput,
  ): effect.Effect<
    ListNetworksOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListNetworksInput,
  ) => stream.Stream<
    ListNetworksOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListNetworksInput,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListNetworksInput,
  output: ListNetworksOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns information about the nodes within a network.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const listNodes: {
  (
    input: ListNodesInput,
  ): effect.Effect<
    ListNodesOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListNodesInput,
  ) => stream.Stream<
    ListNodesOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListNodesInput,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListNodesInput,
  output: ListNodesOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of proposals for the network.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listProposals: {
  (
    input: ListProposalsInput,
  ): effect.Effect<
    ListProposalsOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ResourceNotFoundException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListProposalsInput,
  ) => stream.Stream<
    ListProposalsOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ResourceNotFoundException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListProposalsInput,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ResourceNotFoundException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProposalsInput,
  output: ListProposalsOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns the list of votes for a specified proposal, including the value of each vote and the unique identifier of the member that cast the vote.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listProposalVotes: {
  (
    input: ListProposalVotesInput,
  ): effect.Effect<
    ListProposalVotesOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListProposalVotesInput,
  ) => stream.Stream<
    ListProposalVotesOutput,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListProposalVotesInput,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | InternalServiceErrorException
    | InvalidRequestException
    | ThrottlingException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProposalVotesInput,
  output: ListProposalVotesOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of tags for the specified resource. Each tag consists of a key and optional value.
 *
 * For more information about tags, see Tagging Resources in the *Amazon Managed Blockchain Ethereum Developer Guide*, or Tagging Resources in the *Amazon Managed Blockchain Hyperledger Fabric Developer Guide*.
 */
export const listTagsForResource: (
  input: ListTagsForResourceRequest,
) => effect.Effect<
  ListTagsForResourceResponse,
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
  ],
}));
/**
 * Rejects an invitation to join a network. This action can be called by a principal in an Amazon Web Services account that has received an invitation to create a member and join a network.
 *
 * Applies only to Hyperledger Fabric.
 */
export const rejectInvitation: (
  input: RejectInvitationInput,
) => effect.Effect<
  RejectInvitationOutput,
  | AccessDeniedException
  | IllegalActionException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RejectInvitationInput,
  output: RejectInvitationOutput,
  errors: [
    AccessDeniedException,
    IllegalActionException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Adds or overwrites the specified tags for the specified Amazon Managed Blockchain resource. Each tag consists of a key and optional value.
 *
 * When you specify a tag key that already exists, the tag value is overwritten with the new value. Use `UntagResource` to remove tag keys.
 *
 * A resource can have up to 50 tags. If you try to create more than 50 tags for a resource, your request fails and returns an error.
 *
 * For more information about tags, see Tagging Resources in the *Amazon Managed Blockchain Ethereum Developer Guide*, or Tagging Resources in the *Amazon Managed Blockchain Hyperledger Fabric Developer Guide*.
 */
export const tagResource: (
  input: TagResourceRequest,
) => effect.Effect<
  TagResourceResponse,
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | TooManyTagsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    TooManyTagsException,
  ],
}));
/**
 * Removes the specified tags from the Amazon Managed Blockchain resource.
 *
 * For more information about tags, see Tagging Resources in the *Amazon Managed Blockchain Ethereum Developer Guide*, or Tagging Resources in the *Amazon Managed Blockchain Hyperledger Fabric Developer Guide*.
 */
export const untagResource: (
  input: UntagResourceRequest,
) => effect.Effect<
  UntagResourceResponse,
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
  ],
}));
/**
 * Updates a member configuration with new parameters.
 *
 * Applies only to Hyperledger Fabric.
 */
export const updateMember: (
  input: UpdateMemberInput,
) => effect.Effect<
  UpdateMemberOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMemberInput,
  output: UpdateMemberOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Updates a node configuration with new parameters.
 *
 * Applies only to Hyperledger Fabric.
 */
export const updateNode: (
  input: UpdateNodeInput,
) => effect.Effect<
  UpdateNodeOutput,
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateNodeInput,
  output: UpdateNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Casts a vote for a specified `ProposalId` on behalf of a member. The member to vote as, specified by `VoterMemberId`, must be in the same Amazon Web Services account as the principal that calls the action.
 *
 * Applies only to Hyperledger Fabric.
 */
export const voteOnProposal: (
  input: VoteOnProposalInput,
) => effect.Effect<
  VoteOnProposalOutput,
  | AccessDeniedException
  | IllegalActionException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: VoteOnProposalInput,
  output: VoteOnProposalOutput,
  errors: [
    AccessDeniedException,
    IllegalActionException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
