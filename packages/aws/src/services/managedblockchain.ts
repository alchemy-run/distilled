import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "ManagedBlockchain",
  target: "TaigaWebService",
  version: "2018-09-24",
  sigv4: "managedblockchain",
  protocol: restJson1Protocol,
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
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class IllegalActionException
  extends /*@__PURE__*/ TE.TaggedError(
    "IllegalActionException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotReadyException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export type ClientRequestTokenString = string;
export type AccessorType = "BILLING_TOKEN" | (string & {});
export type TagKey = string;
export type TagValue = string;
export type InputTagMap = { [key: string]: string | undefined };
export type AccessorNetworkType =
  | "ETHEREUM_GOERLI"
  | "ETHEREUM_MAINNET"
  | "ETHEREUM_MAINNET_AND_GOERLI"
  | "POLYGON_MAINNET"
  | "POLYGON_MUMBAI"
  | (string & {});
export interface CreateAccessorInput {
  ClientRequestToken: string;
  AccessorType: AccessorType;
  Tags?: { [key: string]: string | undefined };
  NetworkType?: AccessorNetworkType;
}
export type ResourceIdString = string;
export type AccessorBillingTokenString = string;
export interface CreateAccessorOutput {
  AccessorId?: string;
  BillingToken?: string;
  NetworkType?: AccessorNetworkType;
}
export type NetworkMemberNameString = string;
export type DescriptionString = string;
export type UsernameString = string;
export type PasswordString = string | redacted.Redacted<string>;
export interface MemberFabricConfiguration {
  AdminUsername: string;
  AdminPassword: string | redacted.Redacted<string>;
}
export interface MemberFrameworkConfiguration {
  Fabric?: MemberFabricConfiguration;
}
export type Enabled = boolean;
export interface LogConfiguration {
  Enabled?: boolean;
}
export interface LogConfigurations {
  Cloudwatch?: LogConfiguration;
}
export interface MemberFabricLogPublishingConfiguration {
  CaLogs?: LogConfigurations;
}
export interface MemberLogPublishingConfiguration {
  Fabric?: MemberFabricLogPublishingConfiguration;
}
export type ArnString = string;
export interface MemberConfiguration {
  Name: string;
  Description?: string;
  FrameworkConfiguration: MemberFrameworkConfiguration;
  LogPublishingConfiguration?: MemberLogPublishingConfiguration;
  Tags?: { [key: string]: string | undefined };
  KmsKeyArn?: string;
}
export interface CreateMemberInput {
  ClientRequestToken: string;
  InvitationId: string;
  NetworkId: string;
  MemberConfiguration: MemberConfiguration;
}
export interface CreateMemberOutput {
  MemberId?: string;
}
export type NameString = string;
export type Framework = "HYPERLEDGER_FABRIC" | "ETHEREUM" | (string & {});
export type FrameworkVersionString = string;
export type Edition = "STARTER" | "STANDARD" | (string & {});
export interface NetworkFabricConfiguration {
  Edition: Edition;
}
export interface NetworkFrameworkConfiguration {
  Fabric?: NetworkFabricConfiguration;
}
export type ThresholdPercentageInt = number;
export type ProposalDurationInt = number;
export type ThresholdComparator =
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUAL_TO"
  | (string & {});
export interface ApprovalThresholdPolicy {
  ThresholdPercentage?: number;
  ProposalDurationInHours?: number;
  ThresholdComparator?: ThresholdComparator;
}
export interface VotingPolicy {
  ApprovalThresholdPolicy?: ApprovalThresholdPolicy;
}
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
export interface CreateNetworkOutput {
  NetworkId?: string;
  MemberId?: string;
}
export type InstanceTypeString = string;
export type AvailabilityZoneString = string;
export interface NodeFabricLogPublishingConfiguration {
  ChaincodeLogs?: LogConfigurations;
  PeerLogs?: LogConfigurations;
}
export interface NodeLogPublishingConfiguration {
  Fabric?: NodeFabricLogPublishingConfiguration;
}
export type StateDBType = "LevelDB" | "CouchDB" | (string & {});
export interface NodeConfiguration {
  InstanceType: string;
  AvailabilityZone?: string;
  LogPublishingConfiguration?: NodeLogPublishingConfiguration;
  StateDB?: StateDBType;
}
export interface CreateNodeInput {
  ClientRequestToken: string;
  NetworkId: string;
  MemberId?: string;
  NodeConfiguration: NodeConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateNodeOutput {
  NodeId?: string;
}
export type PrincipalString = string;
export interface InviteAction {
  Principal: string;
}
export type InviteActionList = InviteAction[];
export interface RemoveAction {
  MemberId: string;
}
export type RemoveActionList = RemoveAction[];
export interface ProposalActions {
  Invitations?: InviteAction[];
  Removals?: RemoveAction[];
}
export interface CreateProposalInput {
  ClientRequestToken: string;
  NetworkId: string;
  MemberId: string;
  Actions: ProposalActions;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateProposalOutput {
  ProposalId?: string;
}
export interface DeleteAccessorInput {
  AccessorId: string;
}
export interface DeleteAccessorOutput {}
export interface DeleteMemberInput {
  NetworkId: string;
  MemberId: string;
}
export interface DeleteMemberOutput {}
export interface DeleteNodeInput {
  NetworkId: string;
  MemberId?: string;
  NodeId: string;
}
export interface DeleteNodeOutput {}
export interface GetAccessorInput {
  AccessorId: string;
}
export type AccessorStatus =
  | "AVAILABLE"
  | "PENDING_DELETION"
  | "DELETED"
  | (string & {});
export type OutputTagMap = { [key: string]: string | undefined };
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
export interface GetAccessorOutput {
  Accessor?: Accessor;
}
export interface GetMemberInput {
  NetworkId: string;
  MemberId: string;
}
export interface MemberFabricAttributes {
  AdminUsername?: string;
  CaEndpoint?: string;
}
export interface MemberFrameworkAttributes {
  Fabric?: MemberFabricAttributes;
}
export type MemberStatus =
  | "CREATING"
  | "AVAILABLE"
  | "CREATE_FAILED"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "INACCESSIBLE_ENCRYPTION_KEY"
  | (string & {});
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
export interface GetMemberOutput {
  Member?: Member;
}
export interface GetNetworkInput {
  NetworkId: string;
}
export interface NetworkFabricAttributes {
  OrderingServiceEndpoint?: string;
  Edition?: Edition;
}
export interface NetworkEthereumAttributes {
  ChainId?: string;
}
export interface NetworkFrameworkAttributes {
  Fabric?: NetworkFabricAttributes;
  Ethereum?: NetworkEthereumAttributes;
}
export type NetworkStatus =
  | "CREATING"
  | "AVAILABLE"
  | "CREATE_FAILED"
  | "DELETING"
  | "DELETED"
  | (string & {});
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
export interface GetNetworkOutput {
  Network?: Network;
}
export interface GetNodeInput {
  NetworkId: string;
  MemberId?: string;
  NodeId: string;
}
export interface NodeFabricAttributes {
  PeerEndpoint?: string;
  PeerEventEndpoint?: string;
}
export interface NodeEthereumAttributes {
  HttpEndpoint?: string;
  WebSocketEndpoint?: string;
}
export interface NodeFrameworkAttributes {
  Fabric?: NodeFabricAttributes;
  Ethereum?: NodeEthereumAttributes;
}
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
export interface GetNodeOutput {
  Node?: Node;
}
export interface GetProposalInput {
  NetworkId: string;
  ProposalId: string;
}
export type ProposalStatus =
  | "IN_PROGRESS"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED"
  | "ACTION_FAILED"
  | (string & {});
export type VoteCount = number;
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
export interface GetProposalOutput {
  Proposal?: Proposal;
}
export type AccessorListMaxResults = number;
export type PaginationToken = string;
export interface ListAccessorsInput {
  MaxResults?: number;
  NextToken?: string;
  NetworkType?: AccessorNetworkType;
}
export interface AccessorSummary {
  Id?: string;
  Type?: AccessorType;
  Status?: AccessorStatus;
  CreationDate?: Date;
  Arn?: string;
  NetworkType?: AccessorNetworkType;
}
export type AccessorSummaryList = AccessorSummary[];
export interface ListAccessorsOutput {
  Accessors?: AccessorSummary[];
  NextToken?: string;
}
export type ProposalListMaxResults = number;
export interface ListInvitationsInput {
  MaxResults?: number;
  NextToken?: string;
}
export type InvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "ACCEPTING"
  | "REJECTED"
  | "EXPIRED"
  | (string & {});
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
export interface Invitation {
  InvitationId?: string;
  CreationDate?: Date;
  ExpirationDate?: Date;
  Status?: InvitationStatus;
  NetworkSummary?: NetworkSummary;
  Arn?: string;
}
export type InvitationList = Invitation[];
export interface ListInvitationsOutput {
  Invitations?: Invitation[];
  NextToken?: string;
}
export type IsOwned = boolean;
export type MemberListMaxResults = number;
export interface ListMembersInput {
  NetworkId: string;
  Name?: string;
  Status?: MemberStatus;
  IsOwned?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export interface MemberSummary {
  Id?: string;
  Name?: string;
  Description?: string;
  Status?: MemberStatus;
  CreationDate?: Date;
  IsOwned?: boolean;
  Arn?: string;
}
export type MemberSummaryList = MemberSummary[];
export interface ListMembersOutput {
  Members?: MemberSummary[];
  NextToken?: string;
}
export type NetworkListMaxResults = number;
export interface ListNetworksInput {
  Name?: string;
  Framework?: Framework;
  Status?: NetworkStatus;
  MaxResults?: number;
  NextToken?: string;
}
export type NetworkSummaryList = NetworkSummary[];
export interface ListNetworksOutput {
  Networks?: NetworkSummary[];
  NextToken?: string;
}
export type NodeListMaxResults = number;
export interface ListNodesInput {
  NetworkId: string;
  MemberId?: string;
  Status?: NodeStatus;
  MaxResults?: number;
  NextToken?: string;
}
export interface NodeSummary {
  Id?: string;
  Status?: NodeStatus;
  CreationDate?: Date;
  AvailabilityZone?: string;
  InstanceType?: string;
  Arn?: string;
}
export type NodeSummaryList = NodeSummary[];
export interface ListNodesOutput {
  Nodes?: NodeSummary[];
  NextToken?: string;
}
export interface ListProposalsInput {
  NetworkId: string;
  MaxResults?: number;
  NextToken?: string;
}
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
export type ProposalSummaryList = ProposalSummary[];
export interface ListProposalsOutput {
  Proposals?: ProposalSummary[];
  NextToken?: string;
}
export interface ListProposalVotesInput {
  NetworkId: string;
  ProposalId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type VoteValue = "YES" | "NO" | (string & {});
export interface VoteSummary {
  Vote?: VoteValue;
  MemberName?: string;
  MemberId?: string;
}
export type ProposalVoteList = VoteSummary[];
export interface ListProposalVotesOutput {
  ProposalVotes?: VoteSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface RejectInvitationInput {
  InvitationId: string;
}
export interface RejectInvitationOutput {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateMemberInput {
  NetworkId: string;
  MemberId: string;
  LogPublishingConfiguration?: MemberLogPublishingConfiguration;
}
export interface UpdateMemberOutput {}
export interface UpdateNodeInput {
  NetworkId: string;
  MemberId?: string;
  NodeId: string;
  LogPublishingConfiguration?: NodeLogPublishingConfiguration;
}
export interface UpdateNodeOutput {}
export interface VoteOnProposalInput {
  NetworkId: string;
  ProposalId: string;
  VoterMemberId: string;
  Vote: VoteValue;
}
export interface VoteOnProposalOutput {}
export type ExceptionMessage = string;
export type CreateAccessorError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a new accessor for use with Amazon Managed Blockchain service that supports token based access.
 * The accessor contains information required for token based access.
 */
export const createAccessor: API.OperationMethod<
  CreateAccessorInput,
  CreateAccessorOutput,
  CreateAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accessors",
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      AccessorType: 0,
      Tags: 0,
      NetworkType: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ThrottlingException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessor",
})) as any;

export type CreateMemberError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a member within a Managed Blockchain network.
 *
 * Applies only to Hyperledger Fabric.
 */
export const createMember: API.OperationMethod<
  CreateMemberInput,
  CreateMemberOutput,
  CreateMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /networks/{NetworkId}/members",
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      InvitationId: 0,
      NetworkId: 0,
      MemberConfiguration: i_MemberConfiguration,
    },
    body: true,
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMember",
})) as any;

export type CreateNetworkError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a new blockchain network using Amazon Managed Blockchain.
 *
 * Applies only to Hyperledger Fabric.
 */
export const createNetwork: API.OperationMethod<
  CreateNetworkInput,
  CreateNetworkOutput,
  CreateNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /networks",
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      Name: 0,
      Description: 0,
      Framework: 0,
      FrameworkVersion: 0,
      FrameworkConfiguration: { Fabric: { Edition: 0 } },
      VotingPolicy: {
        ApprovalThresholdPolicy: {
          ThresholdPercentage: 0,
          ProposalDurationInHours: 0,
          ThresholdComparator: 0,
        },
      },
      MemberConfiguration: i_MemberConfiguration,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ThrottlingException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetwork",
})) as any;

export type CreateNodeError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a node on the specified blockchain network.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const createNode: API.OperationMethod<
  CreateNodeInput,
  CreateNodeOutput,
  CreateNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /networks/{NetworkId}/nodes",
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      NetworkId: 0,
      MemberId: 0,
      NodeConfiguration: {
        InstanceType: 0,
        AvailabilityZone: 0,
        LogPublishingConfiguration: i_NodeLogPublishingConfiguration,
        StateDB: 0,
      },
      Tags: 0,
    },
    body: true,
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNode",
})) as any;

export type CreateProposalError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a proposal for a change to the network that other members of the network can vote on, for example, a proposal to add a new member to the network. Any member can create a proposal.
 *
 * Applies only to Hyperledger Fabric.
 */
export const createProposal: API.OperationMethod<
  CreateProposalInput,
  CreateProposalOutput,
  CreateProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /networks/{NetworkId}/proposals",
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      NetworkId: 0,
      MemberId: 0,
      Actions: {
        Invitations: D.list({ Principal: 0 }),
        Removals: D.list({ MemberId: 0 }),
      },
      Description: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProposal",
})) as any;

export type DeleteAccessorError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an accessor that your Amazon Web Services account owns. An accessor object is a container that has the
 * information required for token based access to your Ethereum nodes including, the
 * `BILLING_TOKEN`. After an accessor is deleted, the status of the accessor changes
 * from `AVAILABLE` to `PENDING_DELETION`. An accessor in the
 * `PENDING_DELETION` state can’t be used for new WebSocket requests or
 * HTTP requests. However, WebSocket connections that were initiated while the accessor was in the
 * `AVAILABLE` state remain open until they expire (up to 2 hours).
 */
export const deleteAccessor: API.OperationMethod<
  DeleteAccessorInput,
  DeleteAccessorOutput,
  DeleteAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /accessors/{AccessorId}",
    input: { AccessorId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessor",
})) as any;

export type DeleteMemberError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a member. Deleting a member removes the member and all associated resources from the network. `DeleteMember` can only be called for a specified `MemberId` if the principal performing the action is associated with the Amazon Web Services account that owns the member. In all other cases, the `DeleteMember` action is carried out as the result of an approved proposal to remove a member. If `MemberId` is the last member in a network specified by the last Amazon Web Services account, the network is deleted also.
 *
 * Applies only to Hyperledger Fabric.
 */
export const deleteMember: API.OperationMethod<
  DeleteMemberInput,
  DeleteMemberOutput,
  DeleteMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /networks/{NetworkId}/members/{MemberId}",
    input: { NetworkId: 0, MemberId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMember",
})) as any;

export type DeleteNodeError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a node that your Amazon Web Services account owns. All data on the node is lost and cannot be recovered.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const deleteNode: API.OperationMethod<
  DeleteNodeInput,
  DeleteNodeOutput,
  DeleteNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /networks/{NetworkId}/nodes/{NodeId}",
    input: { NetworkId: 0, MemberId: D.m({ query: "memberId" }), NodeId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNode",
})) as any;

export type GetAccessorError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information about an accessor. An accessor object is a container that has the
 * information required for token based access to your Ethereum nodes.
 */
export const getAccessor: API.OperationMethod<
  GetAccessorInput,
  GetAccessorOutput,
  GetAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /accessors/{AccessorId}",
    input: { AccessorId: 0 },
    output: { Accessor: { CreationDate: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessor",
})) as any;

export type GetMemberError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information about a member.
 *
 * Applies only to Hyperledger Fabric.
 */
export const getMember: API.OperationMethod<
  GetMemberInput,
  GetMemberOutput,
  GetMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /networks/{NetworkId}/members/{MemberId}",
    input: { NetworkId: 0, MemberId: 0 },
    output: { Member: { CreationDate: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMember",
})) as any;

export type GetNetworkError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information about a network.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const getNetwork: API.OperationMethod<
  GetNetworkInput,
  GetNetworkOutput,
  GetNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /networks/{NetworkId}",
    input: { NetworkId: 0 },
    output: { Network: { CreationDate: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetwork",
})) as any;

export type GetNodeError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information about a node.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const getNode: API.OperationMethod<
  GetNodeInput,
  GetNodeOutput,
  GetNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /networks/{NetworkId}/nodes/{NodeId}",
    input: { NetworkId: 0, MemberId: D.m({ query: "memberId" }), NodeId: 0 },
    output: { Node: { CreationDate: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNode",
})) as any;

export type GetProposalError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information about a proposal.
 *
 * Applies only to Hyperledger Fabric.
 */
export const getProposal: API.OperationMethod<
  GetProposalInput,
  GetProposalOutput,
  GetProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /networks/{NetworkId}/proposals/{ProposalId}",
    input: { NetworkId: 0, ProposalId: 0 },
    output: { Proposal: { CreationDate: D.ts, ExpirationDate: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProposal",
})) as any;

export type ListAccessorsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of the accessors and their properties. Accessor objects are containers that have the
 * information required for token based access to your Ethereum nodes.
 */
export const listAccessors: API.PaginatedOperationMethod<
  ListAccessorsInput,
  ListAccessorsOutput,
  ListAccessorsError,
  Credentials | HttpClient.HttpClient,
  AccessorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accessors",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      NetworkType: D.m({ query: "networkType" }),
    },
    output: { Accessors: D.list({ CreationDate: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Accessors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInvitationsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all invitations for the current Amazon Web Services account.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listInvitations: API.PaginatedOperationMethod<
  ListInvitationsInput,
  ListInvitationsOutput,
  ListInvitationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /invitations",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Invitations: D.list({
        CreationDate: D.ts,
        ExpirationDate: D.ts,
        NetworkSummary: o_NetworkSummary,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMembersError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of the members in a network and properties of their configurations.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersInput,
  ListMembersOutput,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /networks/{NetworkId}/members",
    input: {
      NetworkId: 0,
      Name: D.m({ query: "name" }),
      Status: D.m({ query: "status" }),
      IsOwned: D.m({ query: "isOwned" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Members: D.list({ CreationDate: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNetworksError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about the networks in which the current Amazon Web Services account participates.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const listNetworks: API.PaginatedOperationMethod<
  ListNetworksInput,
  ListNetworksOutput,
  ListNetworksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /networks",
    input: {
      Name: D.m({ query: "name" }),
      Framework: D.m({ query: "framework" }),
      Status: D.m({ query: "status" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Networks: D.list(o_NetworkSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNodesError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about the nodes within a network.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const listNodes: API.PaginatedOperationMethod<
  ListNodesInput,
  ListNodesOutput,
  ListNodesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /networks/{NetworkId}/nodes",
    input: {
      NetworkId: 0,
      MemberId: D.m({ query: "memberId" }),
      Status: D.m({ query: "status" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Nodes: D.list({ CreationDate: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProposalsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of proposals for the network.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listProposals: API.PaginatedOperationMethod<
  ListProposalsInput,
  ListProposalsOutput,
  ListProposalsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /networks/{NetworkId}/proposals",
    input: {
      NetworkId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Proposals: D.list({ CreationDate: D.ts, ExpirationDate: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProposals",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProposalVotesError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the list of votes for a specified proposal, including the value of each vote and the unique identifier of the member that cast the vote.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listProposalVotes: API.PaginatedOperationMethod<
  ListProposalVotesInput,
  ListProposalVotesOutput,
  ListProposalVotesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /networks/{NetworkId}/proposals/{ProposalId}/votes",
    input: {
      NetworkId: 0,
      ProposalId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProposalVotes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Returns a list of tags for the specified resource. Each tag consists of a key and optional value.
 *
 * For more information about tags, see Tagging Resources in the *Amazon Managed Blockchain Ethereum Developer Guide*, or Tagging Resources in the *Amazon Managed Blockchain Hyperledger Fabric Developer Guide*.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RejectInvitationError =
  | AccessDeniedException
  | IllegalActionException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Rejects an invitation to join a network. This action can be called by a principal in an Amazon Web Services account that has received an invitation to create a member and join a network.
 *
 * Applies only to Hyperledger Fabric.
 */
export const rejectInvitation: API.OperationMethod<
  RejectInvitationInput,
  RejectInvitationOutput,
  RejectInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /invitations/{InvitationId}",
    input: { InvitationId: 0 },
  },
  errors: [
    AccessDeniedException,
    IllegalActionException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectInvitation",
})) as any;

export type TagResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds or overwrites the specified tags for the specified Amazon Managed Blockchain resource. Each tag consists of a key and optional value.
 *
 * When you specify a tag key that already exists, the tag value is overwritten with the new value. Use `UntagResource` to remove tag keys.
 *
 * A resource can have up to 50 tags. If you try to create more than 50 tags for a resource, your request fails and returns an error.
 *
 * For more information about tags, see Tagging Resources in the *Amazon Managed Blockchain Ethereum Developer Guide*, or Tagging Resources in the *Amazon Managed Blockchain Hyperledger Fabric Developer Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Removes the specified tags from the Amazon Managed Blockchain resource.
 *
 * For more information about tags, see Tagging Resources in the *Amazon Managed Blockchain Ethereum Developer Guide*, or Tagging Resources in the *Amazon Managed Blockchain Hyperledger Fabric Developer Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateMemberError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a member configuration with new parameters.
 *
 * Applies only to Hyperledger Fabric.
 */
export const updateMember: API.OperationMethod<
  UpdateMemberInput,
  UpdateMemberOutput,
  UpdateMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /networks/{NetworkId}/members/{MemberId}",
    input: {
      NetworkId: 0,
      MemberId: 0,
      LogPublishingConfiguration: i_MemberLogPublishingConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMember",
})) as any;

export type UpdateNodeError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a node configuration with new parameters.
 *
 * Applies only to Hyperledger Fabric.
 */
export const updateNode: API.OperationMethod<
  UpdateNodeInput,
  UpdateNodeOutput,
  UpdateNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /networks/{NetworkId}/nodes/{NodeId}",
    input: {
      NetworkId: 0,
      MemberId: 0,
      NodeId: 0,
      LogPublishingConfiguration: i_NodeLogPublishingConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNode",
})) as any;

export type VoteOnProposalError =
  | AccessDeniedException
  | IllegalActionException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Casts a vote for a specified `ProposalId` on behalf of a member. The member to vote as, specified by `VoterMemberId`, must be in the same Amazon Web Services account as the principal that calls the action.
 *
 * Applies only to Hyperledger Fabric.
 */
export const voteOnProposal: API.OperationMethod<
  VoteOnProposalInput,
  VoteOnProposalOutput,
  VoteOnProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /networks/{NetworkId}/proposals/{ProposalId}/votes",
    input: { NetworkId: 0, ProposalId: 0, VoterMemberId: 0, Vote: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    IllegalActionException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VoteOnProposal",
})) as any;

const i_MemberConfiguration: D.LazyStruct = () => ({
  Name: 0,
  Description: 0,
  FrameworkConfiguration: { Fabric: { AdminUsername: 0, AdminPassword: 0 } },
  LogPublishingConfiguration: i_MemberLogPublishingConfiguration,
  Tags: 0,
  KmsKeyArn: 0,
});
const i_MemberLogPublishingConfiguration: D.LazyStruct = () => ({
  Fabric: { CaLogs: i_LogConfigurations },
});
const i_NodeLogPublishingConfiguration: D.LazyStruct = () => ({
  Fabric: { ChaincodeLogs: i_LogConfigurations, PeerLogs: i_LogConfigurations },
});
const o_NetworkSummary: D.LazyStruct = () => ({ CreationDate: D.ts });
const i_LogConfigurations: D.LazyStruct = () => ({
  Cloudwatch: { Enabled: 0 },
});
