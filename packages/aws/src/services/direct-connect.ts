import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "Direct Connect",
  target: "OvertureService",
  version: "2012-10-25",
  sigv4: "directconnect",
  protocol: awsJson1_1Protocol,
  xmlns: "http://directconnect.amazonaws.com/doc/2012-10-25/",
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
                `https://directconnect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://directconnect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://directconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://directconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class DirectConnectClientException
  extends /*@__PURE__*/ TE.TaggedError("DirectConnectClientException")<{
    readonly message?: string;
  }> {}
export class DirectConnectServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "DirectConnectServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DuplicateTagKeysException
  extends /*@__PURE__*/ TE.TaggedError("DuplicateTagKeysException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyTagsException")<{
    readonly message?: string;
  }> {}
export type DirectConnectGatewayId = string;
export type DirectConnectGatewayAssociationProposalId = string;
export type OwnerAccount = string;
export type CIDR = string;
export interface RouteFilterPrefix {
  cidr?: string;
}
export type RouteFilterPrefixList = RouteFilterPrefix[];
export interface AcceptDirectConnectGatewayAssociationProposalRequest {
  directConnectGatewayId: string;
  proposalId: string;
  associatedGatewayOwnerAccount: string;
  overrideAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
}
export type DirectConnectGatewayAssociationState =
  | "associating"
  | "associated"
  | "disassociating"
  | "disassociated"
  | "updating"
  | (string & {});
export type StateChangeError = string;
export type GatewayIdentifier = string;
export type GatewayType =
  | "virtualPrivateGateway"
  | "transitGateway"
  | (string & {});
export type Region = string;
export interface AssociatedGateway {
  id?: string;
  type?: GatewayType;
  ownerAccount?: string;
  region?: string;
}
export type DirectConnectGatewayAssociationId = string;
export type CoreNetworkIdentifier = string;
export type CoreNetworkAttachmentId = string;
export interface AssociatedCoreNetwork {
  id?: string;
  ownerAccount?: string;
  attachmentId?: string;
}
export type VirtualGatewayId = string;
export type VirtualGatewayRegion = string;
export interface DirectConnectGatewayAssociation {
  directConnectGatewayId?: string;
  directConnectGatewayOwnerAccount?: string;
  associationState?: DirectConnectGatewayAssociationState;
  stateChangeError?: string;
  associatedGateway?: AssociatedGateway;
  associationId?: string;
  allowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
  associatedCoreNetwork?: AssociatedCoreNetwork;
  virtualGatewayId?: string;
  virtualGatewayRegion?: string;
  virtualGatewayOwnerAccount?: string;
}
export interface AcceptDirectConnectGatewayAssociationProposalResult {
  directConnectGatewayAssociation?: DirectConnectGatewayAssociation;
}
export type Bandwidth = string;
export type ConnectionName = string;
export type InterconnectId = string;
export type VLAN = number;
export interface AllocateConnectionOnInterconnectRequest {
  bandwidth: string;
  connectionName: string;
  ownerAccount: string;
  interconnectId: string;
  vlan: number;
}
export type ConnectionId = string;
export type ConnectionState =
  | "ordering"
  | "requested"
  | "pending"
  | "available"
  | "down"
  | "deleting"
  | "deleted"
  | "rejected"
  | "unknown"
  | (string & {});
export type LocationCode = string;
export type PartnerName = string;
export type LoaIssueTime = Date;
export type LagId = string;
export type AwsDevice = string;
export type JumboFrameCapable = boolean;
export type AwsDeviceV2 = string;
export type AwsLogicalDeviceId = string;
export type HasLogicalRedundancy = "unknown" | "yes" | "no" | (string & {});
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value?: string;
}
export type TagList = Tag[];
export type ProviderName = string;
export type MacSecCapable = boolean;
export type PortEncryptionStatus = string;
export type EncryptionMode = string;
export type SecretARN = string;
export type Ckn = string;
export type State = string;
export type StartOnDate = string;
export interface MacSecKey {
  secretARN?: string;
  ckn?: string;
  state?: string;
  startOn?: string;
}
export type MacSecKeyList = MacSecKey[];
export type Count = number;
export interface RateLimiterStatus {
  maxAllowed?: number;
  inUse?: number;
  remaining?: number;
  totalBandwidth?: string;
}
export type PartnerInterconnectMacSecCapable = boolean;
export type PrefixPoolSize = number;
export type PrefixPoolUnallocatedCount = number;
export interface Connection {
  ownerAccount?: string;
  connectionId?: string;
  connectionName?: string;
  connectionState?: ConnectionState;
  region?: string;
  location?: string;
  bandwidth?: string;
  vlan?: number;
  partnerName?: string;
  loaIssueTime?: Date;
  lagId?: string;
  awsDevice?: string;
  jumboFrameCapable?: boolean;
  awsDeviceV2?: string;
  awsLogicalDeviceId?: string;
  hasLogicalRedundancy?: HasLogicalRedundancy;
  tags?: Tag[];
  providerName?: string;
  macSecCapable?: boolean;
  portEncryptionStatus?: string;
  encryptionMode?: string;
  macSecKeys?: MacSecKey[];
  rateLimiterStatus?: RateLimiterStatus;
  partnerInterconnectMacSecCapable?: boolean;
  prefixPoolSizeIpv4?: number;
  prefixPoolSizeIpv6?: number;
  prefixPoolUnallocatedCountIpv4?: number;
  prefixPoolUnallocatedCountIpv6?: number;
}
export interface AllocateHostedConnectionRequest {
  connectionId: string;
  ownerAccount: string;
  bandwidth: string;
  connectionName: string;
  vlan: number;
  tags?: Tag[];
}
export type VirtualInterfaceName = string;
export type ASN = number;
export type LongAsn = number;
export type MTU = number;
export type BGPAuthKey = string;
export type AmazonAddress = string;
export type AddressFamily = "ipv4" | "ipv6" | (string & {});
export type CustomerAddress = string;
export type RateLimit = string;
export interface NewPrivateVirtualInterfaceAllocation {
  virtualInterfaceName: string;
  vlan: number;
  asn?: number;
  asnLong?: number;
  mtu?: number;
  authKey?: string;
  amazonAddress?: string;
  addressFamily?: AddressFamily;
  customerAddress?: string;
  tags?: Tag[];
  rateLimit?: string;
}
export interface AllocatePrivateVirtualInterfaceRequest {
  connectionId: string;
  ownerAccount: string;
  newPrivateVirtualInterfaceAllocation: NewPrivateVirtualInterfaceAllocation;
}
export type VirtualInterfaceId = string;
export type VirtualInterfaceType = string;
export type VirtualInterfaceState =
  | "confirming"
  | "verifying"
  | "pending"
  | "available"
  | "down"
  | "testing"
  | "deleting"
  | "deleted"
  | "rejected"
  | "unknown"
  | (string & {});
export type RouterConfig = string;
export type BGPPeerId = string;
export type BGPPeerState =
  | "verifying"
  | "pending"
  | "available"
  | "deleting"
  | "deleted"
  | (string & {});
export type BGPStatus = "up" | "down" | "unknown" | (string & {});
export interface BGPPeer {
  bgpPeerId?: string;
  asn?: number;
  asnLong?: number;
  authKey?: string;
  addressFamily?: AddressFamily;
  amazonAddress?: string;
  customerAddress?: string;
  bgpPeerState?: BGPPeerState;
  bgpStatus?: BGPStatus;
  awsDeviceV2?: string;
  awsLogicalDeviceId?: string;
}
export type BGPPeerList = BGPPeer[];
export type SiteLinkEnabled = boolean;
export type PrefixPoolAllocatedCount = number;
export interface VirtualInterface {
  ownerAccount?: string;
  virtualInterfaceId?: string;
  location?: string;
  connectionId?: string;
  virtualInterfaceType?: string;
  virtualInterfaceName?: string;
  vlan?: number;
  asn?: number;
  asnLong?: number;
  amazonSideAsn?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  virtualInterfaceState?: VirtualInterfaceState;
  customerRouterConfig?: string;
  mtu?: number;
  jumboFrameCapable?: boolean;
  virtualGatewayId?: string;
  directConnectGatewayId?: string;
  routeFilterPrefixes?: RouteFilterPrefix[];
  bgpPeers?: BGPPeer[];
  region?: string;
  awsDeviceV2?: string;
  awsLogicalDeviceId?: string;
  tags?: Tag[];
  siteLinkEnabled?: boolean;
  prefixPoolAllocatedCountIpv4?: number;
  prefixPoolAllocatedCountIpv6?: number;
  rateLimit?: string;
}
export interface NewPublicVirtualInterfaceAllocation {
  virtualInterfaceName: string;
  vlan: number;
  asn?: number;
  asnLong?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  routeFilterPrefixes?: RouteFilterPrefix[];
  tags?: Tag[];
  rateLimit?: string;
}
export interface AllocatePublicVirtualInterfaceRequest {
  connectionId: string;
  ownerAccount: string;
  newPublicVirtualInterfaceAllocation: NewPublicVirtualInterfaceAllocation;
}
export interface NewTransitVirtualInterfaceAllocation {
  virtualInterfaceName?: string;
  vlan?: number;
  asn?: number;
  asnLong?: number;
  mtu?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  tags?: Tag[];
  rateLimit?: string;
}
export interface AllocateTransitVirtualInterfaceRequest {
  connectionId: string;
  ownerAccount: string;
  newTransitVirtualInterfaceAllocation: NewTransitVirtualInterfaceAllocation;
}
export interface AllocateTransitVirtualInterfaceResult {
  virtualInterface?: VirtualInterface;
}
export interface AssociateConnectionWithLagRequest {
  connectionId: string;
  lagId: string;
}
export interface AssociateHostedConnectionRequest {
  connectionId: string;
  parentConnectionId: string;
}
export type Cak = string;
export interface AssociateMacSecKeyRequest {
  connectionId: string;
  secretARN?: string;
  ckn?: string;
  cak?: string;
}
export interface AssociateMacSecKeyResponse {
  connectionId?: string;
  macSecKeys?: MacSecKey[];
}
export interface AssociateVirtualInterfaceRequest {
  virtualInterfaceId: string;
  connectionId: string;
}
export interface ConfirmConnectionRequest {
  connectionId: string;
}
export interface ConfirmConnectionResponse {
  connectionState?: ConnectionState;
}
export type AgreementName = string;
export interface ConfirmCustomerAgreementRequest {
  agreementName?: string;
}
export type Status = string;
export interface ConfirmCustomerAgreementResponse {
  status?: string;
}
export interface ConfirmPrivateVirtualInterfaceRequest {
  virtualInterfaceId: string;
  virtualGatewayId?: string;
  directConnectGatewayId?: string;
}
export interface ConfirmPrivateVirtualInterfaceResponse {
  virtualInterfaceState?: VirtualInterfaceState;
}
export interface ConfirmPublicVirtualInterfaceRequest {
  virtualInterfaceId: string;
}
export interface ConfirmPublicVirtualInterfaceResponse {
  virtualInterfaceState?: VirtualInterfaceState;
}
export interface ConfirmTransitVirtualInterfaceRequest {
  virtualInterfaceId: string;
  directConnectGatewayId: string;
}
export interface ConfirmTransitVirtualInterfaceResponse {
  virtualInterfaceState?: VirtualInterfaceState;
}
export interface NewBGPPeer {
  asn?: number;
  asnLong?: number;
  authKey?: string;
  addressFamily?: AddressFamily;
  amazonAddress?: string;
  customerAddress?: string;
}
export interface CreateBGPPeerRequest {
  virtualInterfaceId?: string;
  newBGPPeer?: NewBGPPeer;
}
export interface CreateBGPPeerResponse {
  virtualInterface?: VirtualInterface;
}
export type RequestMACSec = boolean;
export interface CreateConnectionRequest {
  location: string;
  bandwidth: string;
  connectionName: string;
  lagId?: string;
  tags?: Tag[];
  providerName?: string;
  requestMACSec?: boolean;
}
export type DirectConnectGatewayName = string;
export interface CreateDirectConnectGatewayRequest {
  directConnectGatewayName: string;
  tags?: Tag[];
  amazonSideAsn?: number;
}
export type DirectConnectGatewayState =
  | "pending"
  | "available"
  | "deleting"
  | "deleted"
  | (string & {});
export interface DirectConnectGateway {
  directConnectGatewayId?: string;
  directConnectGatewayName?: string;
  amazonSideAsn?: number;
  ownerAccount?: string;
  directConnectGatewayState?: DirectConnectGatewayState;
  stateChangeError?: string;
  totalPrefixPoolAllocations?: number;
  tags?: Tag[];
}
export interface CreateDirectConnectGatewayResult {
  directConnectGateway?: DirectConnectGateway;
}
export type GatewayIdToAssociate = string;
export interface CreateDirectConnectGatewayAssociationRequest {
  directConnectGatewayId: string;
  gatewayId?: string;
  addAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
  virtualGatewayId?: string;
}
export interface CreateDirectConnectGatewayAssociationResult {
  directConnectGatewayAssociation?: DirectConnectGatewayAssociation;
}
export interface CreateDirectConnectGatewayAssociationProposalRequest {
  directConnectGatewayId: string;
  directConnectGatewayOwnerAccount: string;
  gatewayId: string;
  addAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
  removeAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
}
export type DirectConnectGatewayAssociationProposalState =
  | "requested"
  | "accepted"
  | "deleted"
  | (string & {});
export interface DirectConnectGatewayAssociationProposal {
  proposalId?: string;
  directConnectGatewayId?: string;
  directConnectGatewayOwnerAccount?: string;
  proposalState?: DirectConnectGatewayAssociationProposalState;
  associatedGateway?: AssociatedGateway;
  existingAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
  requestedAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
}
export interface CreateDirectConnectGatewayAssociationProposalResult {
  directConnectGatewayAssociationProposal?: DirectConnectGatewayAssociationProposal;
}
export type InterconnectName = string;
export interface CreateInterconnectRequest {
  interconnectName: string;
  bandwidth: string;
  location: string;
  lagId?: string;
  tags?: Tag[];
  providerName?: string;
  requestMACSec?: boolean;
}
export type InterconnectState =
  | "requested"
  | "pending"
  | "available"
  | "down"
  | "deleting"
  | "deleted"
  | "unknown"
  | (string & {});
export interface Interconnect {
  interconnectId?: string;
  interconnectName?: string;
  interconnectState?: InterconnectState;
  region?: string;
  location?: string;
  bandwidth?: string;
  loaIssueTime?: Date;
  lagId?: string;
  awsDevice?: string;
  jumboFrameCapable?: boolean;
  awsDeviceV2?: string;
  awsLogicalDeviceId?: string;
  hasLogicalRedundancy?: HasLogicalRedundancy;
  tags?: Tag[];
  providerName?: string;
  macSecCapable?: boolean;
  portEncryptionStatus?: string;
  encryptionMode?: string;
  macSecKeys?: MacSecKey[];
}
export type LagName = string;
export interface CreateLagRequest {
  numberOfConnections: number;
  location: string;
  connectionsBandwidth: string;
  lagName: string;
  connectionId?: string;
  tags?: Tag[];
  childConnectionTags?: Tag[];
  providerName?: string;
  requestMACSec?: boolean;
}
export type LagState =
  | "requested"
  | "pending"
  | "available"
  | "down"
  | "deleting"
  | "deleted"
  | "unknown"
  | (string & {});
export type ConnectionList = Connection[];
export type BooleanFlag = boolean;
export interface Lag {
  connectionsBandwidth?: string;
  numberOfConnections?: number;
  lagId?: string;
  ownerAccount?: string;
  lagName?: string;
  lagState?: LagState;
  location?: string;
  region?: string;
  minimumLinks?: number;
  awsDevice?: string;
  awsDeviceV2?: string;
  awsLogicalDeviceId?: string;
  connections?: Connection[];
  allowsHostedConnections?: boolean;
  jumboFrameCapable?: boolean;
  hasLogicalRedundancy?: HasLogicalRedundancy;
  tags?: Tag[];
  providerName?: string;
  macSecCapable?: boolean;
  encryptionMode?: string;
  macSecKeys?: MacSecKey[];
  prefixPoolSizeIpv4?: number;
  prefixPoolSizeIpv6?: number;
  prefixPoolUnallocatedCountIpv4?: number;
  prefixPoolUnallocatedCountIpv6?: number;
  rateLimiterStatus?: RateLimiterStatus;
}
export type EnableSiteLink = boolean;
export interface NewPrivateVirtualInterface {
  virtualInterfaceName: string;
  vlan: number;
  asn?: number;
  asnLong?: number;
  mtu?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  virtualGatewayId?: string;
  directConnectGatewayId?: string;
  tags?: Tag[];
  enableSiteLink?: boolean;
  prefixPoolAllocatedCountIpv4?: number;
  prefixPoolAllocatedCountIpv6?: number;
  rateLimit?: string;
}
export interface CreatePrivateVirtualInterfaceRequest {
  connectionId: string;
  newPrivateVirtualInterface: NewPrivateVirtualInterface;
}
export interface NewPublicVirtualInterface {
  virtualInterfaceName: string;
  vlan: number;
  asn?: number;
  asnLong?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  routeFilterPrefixes?: RouteFilterPrefix[];
  tags?: Tag[];
  rateLimit?: string;
}
export interface CreatePublicVirtualInterfaceRequest {
  connectionId: string;
  newPublicVirtualInterface: NewPublicVirtualInterface;
}
export interface NewTransitVirtualInterface {
  virtualInterfaceName?: string;
  vlan?: number;
  asn?: number;
  asnLong?: number;
  mtu?: number;
  authKey?: string;
  amazonAddress?: string;
  customerAddress?: string;
  addressFamily?: AddressFamily;
  directConnectGatewayId?: string;
  tags?: Tag[];
  enableSiteLink?: boolean;
  prefixPoolAllocatedCountIpv4?: number;
  prefixPoolAllocatedCountIpv6?: number;
  rateLimit?: string;
}
export interface CreateTransitVirtualInterfaceRequest {
  connectionId: string;
  newTransitVirtualInterface: NewTransitVirtualInterface;
}
export interface CreateTransitVirtualInterfaceResult {
  virtualInterface?: VirtualInterface;
}
export interface DeleteBGPPeerRequest {
  virtualInterfaceId?: string;
  asn?: number;
  asnLong?: number;
  customerAddress?: string;
  bgpPeerId?: string;
}
export interface DeleteBGPPeerResponse {
  virtualInterface?: VirtualInterface;
}
export interface DeleteConnectionRequest {
  connectionId: string;
}
export interface DeleteDirectConnectGatewayRequest {
  directConnectGatewayId: string;
}
export interface DeleteDirectConnectGatewayResult {
  directConnectGateway?: DirectConnectGateway;
}
export interface DeleteDirectConnectGatewayAssociationRequest {
  associationId?: string;
  directConnectGatewayId?: string;
  virtualGatewayId?: string;
}
export interface DeleteDirectConnectGatewayAssociationResult {
  directConnectGatewayAssociation?: DirectConnectGatewayAssociation;
}
export interface DeleteDirectConnectGatewayAssociationProposalRequest {
  proposalId: string;
}
export interface DeleteDirectConnectGatewayAssociationProposalResult {
  directConnectGatewayAssociationProposal?: DirectConnectGatewayAssociationProposal;
}
export interface DeleteInterconnectRequest {
  interconnectId: string;
}
export interface DeleteInterconnectResponse {
  interconnectState?: InterconnectState;
}
export interface DeleteLagRequest {
  lagId: string;
}
export interface DeleteVirtualInterfaceRequest {
  virtualInterfaceId: string;
}
export interface DeleteVirtualInterfaceResponse {
  virtualInterfaceState?: VirtualInterfaceState;
}
export type LoaContentType = "application/pdf" | (string & {});
export interface DescribeConnectionLoaRequest {
  connectionId: string;
  providerName?: string;
  loaContentType?: LoaContentType;
}
export type LoaContent = Uint8Array;
export interface Loa {
  loaContent?: Uint8Array;
  loaContentType?: LoaContentType;
}
export interface DescribeConnectionLoaResponse {
  loa?: Loa;
}
export type MaxResultSetSize = number;
export type PaginationToken = string;
export interface DescribeConnectionsRequest {
  connectionId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface Connections {
  connections?: Connection[];
  nextToken?: string;
}
export interface DescribeConnectionsOnInterconnectRequest {
  interconnectId: string;
}
export interface DescribeCustomerMetadataRequest {}
export interface CustomerAgreement {
  agreementName?: string;
  status?: string;
}
export type AgreementList = CustomerAgreement[];
export type NniPartnerType = "v1" | "v2" | "nonPartner" | (string & {});
export interface DescribeCustomerMetadataResponse {
  agreements?: CustomerAgreement[];
  nniPartnerType?: NniPartnerType;
}
export type AssociatedGatewayId = string;
export interface DescribeDirectConnectGatewayAssociationProposalsRequest {
  directConnectGatewayId?: string;
  proposalId?: string;
  associatedGatewayId?: string;
  maxResults?: number;
  nextToken?: string;
}
export type DirectConnectGatewayAssociationProposalList =
  DirectConnectGatewayAssociationProposal[];
export interface DescribeDirectConnectGatewayAssociationProposalsResult {
  directConnectGatewayAssociationProposals?: DirectConnectGatewayAssociationProposal[];
  nextToken?: string;
}
export interface DescribeDirectConnectGatewayAssociationsRequest {
  associationId?: string;
  associatedGatewayId?: string;
  directConnectGatewayId?: string;
  maxResults?: number;
  nextToken?: string;
  virtualGatewayId?: string;
}
export type DirectConnectGatewayAssociationList =
  DirectConnectGatewayAssociation[];
export interface DescribeDirectConnectGatewayAssociationsResult {
  directConnectGatewayAssociations?: DirectConnectGatewayAssociation[];
  nextToken?: string;
}
export interface DescribeDirectConnectGatewayAttachmentsRequest {
  directConnectGatewayId?: string;
  virtualInterfaceId?: string;
  maxResults?: number;
  nextToken?: string;
}
export type VirtualInterfaceRegion = string;
export type DirectConnectGatewayAttachmentState =
  | "attaching"
  | "attached"
  | "detaching"
  | "detached"
  | (string & {});
export type DirectConnectGatewayAttachmentType =
  | "TransitVirtualInterface"
  | "PrivateVirtualInterface"
  | (string & {});
export interface DirectConnectGatewayAttachment {
  directConnectGatewayId?: string;
  virtualInterfaceId?: string;
  virtualInterfaceRegion?: string;
  virtualInterfaceOwnerAccount?: string;
  attachmentState?: DirectConnectGatewayAttachmentState;
  attachmentType?: DirectConnectGatewayAttachmentType;
  stateChangeError?: string;
}
export type DirectConnectGatewayAttachmentList =
  DirectConnectGatewayAttachment[];
export interface DescribeDirectConnectGatewayAttachmentsResult {
  directConnectGatewayAttachments?: DirectConnectGatewayAttachment[];
  nextToken?: string;
}
export interface DescribeDirectConnectGatewaysRequest {
  directConnectGatewayId?: string;
  maxResults?: number;
  nextToken?: string;
}
export type DirectConnectGatewayList = DirectConnectGateway[];
export interface DescribeDirectConnectGatewaysResult {
  directConnectGateways?: DirectConnectGateway[];
  nextToken?: string;
}
export interface DescribeHostedConnectionsRequest {
  connectionId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface DescribeInterconnectLoaRequest {
  interconnectId: string;
  providerName?: string;
  loaContentType?: LoaContentType;
}
export interface DescribeInterconnectLoaResponse {
  loa?: Loa;
}
export interface DescribeInterconnectsRequest {
  interconnectId?: string;
  maxResults?: number;
  nextToken?: string;
}
export type InterconnectList = Interconnect[];
export interface Interconnects {
  interconnects?: Interconnect[];
  nextToken?: string;
}
export interface DescribeLagsRequest {
  lagId?: string;
  maxResults?: number;
  nextToken?: string;
}
export type LagList = Lag[];
export interface Lags {
  lags?: Lag[];
  nextToken?: string;
}
export interface DescribeLoaRequest {
  connectionId: string;
  providerName?: string;
  loaContentType?: LoaContentType;
}
export interface DescribeLocationsRequest {}
export type LocationName = string;
export type PortSpeed = string;
export type AvailablePortSpeeds = string[];
export type ProviderList = string[];
export type AvailableMacSecPortSpeeds = string[];
export interface Location {
  locationCode?: string;
  locationName?: string;
  region?: string;
  availablePortSpeeds?: string[];
  availableProviders?: string[];
  availableMacSecPortSpeeds?: string[];
}
export type LocationList = Location[];
export interface Locations {
  locations?: Location[];
}
export type RouterTypeIdentifier = string;
export interface DescribeRouterConfigurationRequest {
  virtualInterfaceId: string;
  routerTypeIdentifier?: string;
}
export type Vendor = string;
export type Platform = string;
export type Software = string;
export type XsltTemplateName = string;
export type XsltTemplateNameForMacSec = string;
export interface RouterType {
  vendor?: string;
  platform?: string;
  software?: string;
  xsltTemplateName?: string;
  xsltTemplateNameForMacSec?: string;
  routerTypeIdentifier?: string;
}
export interface DescribeRouterConfigurationResponse {
  customerRouterConfig?: string;
  router?: RouterType;
  virtualInterfaceId?: string;
  virtualInterfaceName?: string;
}
export type ResourceArn = string;
export type ResourceArnList = string[];
export interface DescribeTagsRequest {
  resourceArns: string[];
}
export interface ResourceTag {
  resourceArn?: string;
  tags?: Tag[];
}
export type ResourceTagList = ResourceTag[];
export interface DescribeTagsResponse {
  resourceTags?: ResourceTag[];
}
export interface DescribeVirtualGatewaysRequest {}
export type VirtualGatewayState = string;
export interface VirtualGateway {
  virtualGatewayId?: string;
  virtualGatewayState?: string;
}
export type VirtualGatewayList = VirtualGateway[];
export interface VirtualGateways {
  virtualGateways?: VirtualGateway[];
}
export interface DescribeVirtualInterfacesRequest {
  connectionId?: string;
  virtualInterfaceId?: string;
  maxResults?: number;
  nextToken?: string;
}
export type VirtualInterfaceList = VirtualInterface[];
export interface VirtualInterfaces {
  virtualInterfaces?: VirtualInterface[];
  nextToken?: string;
}
export interface DisassociateConnectionFromLagRequest {
  connectionId: string;
  lagId: string;
}
export interface DisassociateMacSecKeyRequest {
  connectionId: string;
  secretARN: string;
}
export interface DisassociateMacSecKeyResponse {
  connectionId?: string;
  macSecKeys?: MacSecKey[];
}
export type RouteDirection = "accepted" | "advertised" | (string & {});
export type RouteFilterCidrString = string;
export type RouteFilterCidrStringList = string[];
export type AsPathList = number[];
export type CommunityEntry = string;
export type CommunityList = string[];
export interface RouteFilters {
  routeDirection?: RouteDirection;
  addressFamily?: AddressFamily;
  cidrs?: string[];
  asPath?: number[];
  communities?: string[];
}
export interface ListVirtualInterfaceRoutesRequest {
  virtualInterfaceId?: string;
  filters?: RouteFilters;
  maxResults?: number;
  nextToken?: string;
}
export type RouteCidr = string;
export type AsPathType = "seq" | "set" | (string & {});
export interface AsPathSegment {
  pathType?: AsPathType;
  path?: number[];
}
export type AsPathSegmentList = AsPathSegment[];
export type RouteInstalledAt = Date;
export interface Route {
  cidr?: string;
  routeDirection?: RouteDirection;
  addressFamily?: AddressFamily;
  asPath?: AsPathSegment[];
  communities?: string[];
  awsLogicalDeviceId?: string;
  routeInstalledAt?: Date;
}
export type RouteList = Route[];
export interface ListVirtualInterfaceRoutesResponse {
  virtualInterfaceId?: string;
  routes?: Route[];
  nextToken?: string;
}
export type TestId = string;
export type BGPPeerIdList = string[];
export type FailureTestHistoryStatus = string;
export interface ListVirtualInterfaceTestHistoryRequest {
  testId?: string;
  virtualInterfaceId?: string;
  bgpPeers?: string[];
  status?: string;
  maxResults?: number;
  nextToken?: string;
}
export type TestDuration = number;
export type StartTime = Date;
export type EndTime = Date;
export interface VirtualInterfaceTestHistory {
  testId?: string;
  virtualInterfaceId?: string;
  bgpPeers?: string[];
  status?: string;
  ownerAccount?: string;
  testDurationInMinutes?: number;
  startTime?: Date;
  endTime?: Date;
}
export type VirtualInterfaceTestHistoryList = VirtualInterfaceTestHistory[];
export interface ListVirtualInterfaceTestHistoryResponse {
  virtualInterfaceTestHistory?: VirtualInterfaceTestHistory[];
  nextToken?: string;
}
export interface StartBgpFailoverTestRequest {
  virtualInterfaceId: string;
  bgpPeers?: string[];
  testDurationInMinutes?: number;
}
export interface StartBgpFailoverTestResponse {
  virtualInterfaceTest?: VirtualInterfaceTestHistory;
}
export interface StopBgpFailoverTestRequest {
  virtualInterfaceId: string;
}
export interface StopBgpFailoverTestResponse {
  virtualInterfaceTest?: VirtualInterfaceTestHistory;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateConnectionRequest {
  connectionId: string;
  connectionName?: string;
  encryptionMode?: string;
}
export interface UpdateDirectConnectGatewayRequest {
  directConnectGatewayId: string;
  newDirectConnectGatewayName: string;
}
export interface UpdateDirectConnectGatewayResponse {
  directConnectGateway?: DirectConnectGateway;
}
export interface UpdateDirectConnectGatewayAssociationRequest {
  associationId?: string;
  addAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
  removeAllowedPrefixesToDirectConnectGateway?: RouteFilterPrefix[];
}
export interface UpdateDirectConnectGatewayAssociationResult {
  directConnectGatewayAssociation?: DirectConnectGatewayAssociation;
}
export interface UpdateLagRequest {
  lagId: string;
  lagName?: string;
  minimumLinks?: number;
  encryptionMode?: string;
}
export interface UpdateVirtualInterfaceAttributesRequest {
  virtualInterfaceId: string;
  mtu?: number;
  enableSiteLink?: boolean;
  virtualInterfaceName?: string;
  prefixPoolAllocatedCountIpv4?: number;
  prefixPoolAllocatedCountIpv6?: number;
  rateLimit?: string;
}
export type ErrorMessage = string;
export type AcceptDirectConnectGatewayAssociationProposalError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Accepts a proposal request to attach a virtual private gateway or transit gateway to a Direct Connect gateway.
 */
export const acceptDirectConnectGatewayAssociationProposal: API.OperationMethod<
  AcceptDirectConnectGatewayAssociationProposalRequest,
  AcceptDirectConnectGatewayAssociationProposalResult,
  AcceptDirectConnectGatewayAssociationProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      directConnectGatewayId: 0,
      proposalId: 0,
      associatedGatewayOwnerAccount: 0,
      overrideAllowedPrefixesToDirectConnectGateway:
        D.list(i_RouteFilterPrefix),
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptDirectConnectGatewayAssociationProposal",
})) as any;

export type AllocateConnectionOnInterconnectError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deprecated. Use AllocateHostedConnection instead.
 *
 * Creates a hosted connection on an interconnect.
 *
 * Allocates a VLAN number and a specified amount of bandwidth for use by a hosted connection on the specified interconnect.
 *
 * Intended for use by Direct Connect Partners only.
 */
export const allocateConnectionOnInterconnect: API.OperationMethod<
  AllocateConnectionOnInterconnectRequest,
  Connection,
  AllocateConnectionOnInterconnectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      bandwidth: 0,
      connectionName: 0,
      ownerAccount: 0,
      interconnectId: 0,
      vlan: 0,
    },
    output: { loaIssueTime: D.ts },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocateConnectionOnInterconnect",
})) as any;

export type AllocateHostedConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a hosted connection on the specified interconnect or a link aggregation group (LAG) of interconnects.
 *
 * Allocates a VLAN number and a specified amount of capacity (bandwidth) for use by a hosted connection on the specified interconnect or LAG of interconnects.
 * Amazon Web Services polices the hosted connection for the specified capacity and the Direct Connect Partner must also police the hosted connection for the specified capacity.
 *
 * Intended for use by Direct Connect Partners only.
 */
export const allocateHostedConnection: API.OperationMethod<
  AllocateHostedConnectionRequest,
  Connection,
  AllocateHostedConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      connectionId: 0,
      ownerAccount: 0,
      bandwidth: 0,
      connectionName: 0,
      vlan: 0,
      tags: D.list(i_Tag),
    },
    output: { loaIssueTime: D.ts },
  },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocateHostedConnection",
})) as any;

export type AllocatePrivateVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Provisions a private virtual interface to be owned by the specified Amazon Web Services account.
 *
 * Virtual interfaces created using this action must be confirmed by the owner using ConfirmPrivateVirtualInterface.
 * Until then, the virtual interface is in the `Confirming` state and is not available to handle traffic.
 */
export const allocatePrivateVirtualInterface: API.OperationMethod<
  AllocatePrivateVirtualInterfaceRequest,
  VirtualInterface,
  AllocatePrivateVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      connectionId: 0,
      ownerAccount: 0,
      newPrivateVirtualInterfaceAllocation: {
        virtualInterfaceName: 0,
        vlan: 0,
        asn: 0,
        asnLong: 0,
        mtu: 0,
        authKey: 0,
        amazonAddress: 0,
        addressFamily: 0,
        customerAddress: 0,
        tags: D.list(i_Tag),
        rateLimit: 0,
      },
    },
  },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocatePrivateVirtualInterface",
})) as any;

export type AllocatePublicVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Provisions a public virtual interface to be owned by the specified Amazon Web Services account.
 *
 * The owner of a connection calls this function to provision a public virtual interface to be owned by the specified Amazon Web Services account.
 *
 * Virtual interfaces created using this function must be confirmed by the owner using ConfirmPublicVirtualInterface.
 * Until this step has been completed, the virtual interface is in the `confirming` state and is not available to handle traffic.
 *
 * When creating an IPv6 public virtual interface, omit the Amazon address and customer address. IPv6 addresses are automatically assigned from
 * the Amazon pool of IPv6 addresses; you cannot specify custom IPv6 addresses.
 */
export const allocatePublicVirtualInterface: API.OperationMethod<
  AllocatePublicVirtualInterfaceRequest,
  VirtualInterface,
  AllocatePublicVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      connectionId: 0,
      ownerAccount: 0,
      newPublicVirtualInterfaceAllocation: {
        virtualInterfaceName: 0,
        vlan: 0,
        asn: 0,
        asnLong: 0,
        authKey: 0,
        amazonAddress: 0,
        customerAddress: 0,
        addressFamily: 0,
        routeFilterPrefixes: D.list(i_RouteFilterPrefix),
        tags: D.list(i_Tag),
        rateLimit: 0,
      },
    },
  },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocatePublicVirtualInterface",
})) as any;

export type AllocateTransitVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Provisions a transit virtual interface to be owned by the specified Amazon Web Services account. Use this type of interface to connect a transit gateway to your Direct Connect gateway.
 *
 * The owner of a connection provisions a transit virtual interface to be owned by the specified Amazon Web Services account.
 *
 * After you create a transit virtual interface, it must be confirmed by the owner using ConfirmTransitVirtualInterface. Until this step has been completed, the transit virtual interface is in the `requested` state and is not available to handle traffic.
 */
export const allocateTransitVirtualInterface: API.OperationMethod<
  AllocateTransitVirtualInterfaceRequest,
  AllocateTransitVirtualInterfaceResult,
  AllocateTransitVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      connectionId: 0,
      ownerAccount: 0,
      newTransitVirtualInterfaceAllocation: {
        virtualInterfaceName: 0,
        vlan: 0,
        asn: 0,
        asnLong: 0,
        mtu: 0,
        authKey: 0,
        amazonAddress: 0,
        customerAddress: 0,
        addressFamily: 0,
        tags: D.list(i_Tag),
        rateLimit: 0,
      },
    },
  },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocateTransitVirtualInterface",
})) as any;

export type AssociateConnectionWithLagError =
  | DirectConnectClientException
  | DirectConnectServerException
  | LimitExceededException
  | CommonErrors;
/**
 * Associates an existing connection with a link aggregation group (LAG). The connection
 * is interrupted and re-established as a member of the LAG (connectivity to Amazon Web Services is
 * interrupted). The connection must be hosted on the same Direct Connect endpoint as the LAG, and its
 * bandwidth must match the bandwidth for the LAG. You can re-associate a connection that's
 * currently associated with a different LAG; however, if removing the connection would cause
 * the original LAG to fall below its setting for minimum number of operational connections,
 * the request fails.
 *
 * Any virtual interfaces that are directly associated with the connection are
 * automatically re-associated with the LAG. If the connection was originally associated
 * with a different LAG, the virtual interfaces remain associated with the original
 * LAG.
 *
 * For interconnects, any hosted connections are automatically re-associated with the
 * LAG. If the interconnect was originally associated with a different LAG, the hosted
 * connections remain associated with the original LAG.
 */
export const associateConnectionWithLag: API.OperationMethod<
  AssociateConnectionWithLagRequest,
  Connection,
  AssociateConnectionWithLagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { connectionId: 0, lagId: 0 },
    output: { loaIssueTime: D.ts },
  },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateConnectionWithLag",
})) as any;

export type AssociateHostedConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Associates a hosted connection and its virtual interfaces with a link aggregation
 * group (LAG) or interconnect. If the target interconnect or LAG has an existing hosted
 * connection with a conflicting VLAN number or IP address, the operation fails. This
 * action temporarily interrupts the hosted connection's connectivity to Amazon Web Services
 * as it is being migrated.
 *
 * Intended for use by Direct Connect Partners only.
 */
export const associateHostedConnection: API.OperationMethod<
  AssociateHostedConnectionRequest,
  Connection,
  AssociateHostedConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { connectionId: 0, parentConnectionId: 0 },
    output: { loaIssueTime: D.ts },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateHostedConnection",
})) as any;

export type AssociateMacSecKeyError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Associates a MAC Security (MACsec) Connection Key Name (CKN)/ Connectivity Association Key (CAK) pair with a Direct Connect connection.
 *
 * You must supply either the `secretARN,` or the CKN/CAK (`ckn` and `cak`) pair in the request.
 *
 * For information about MAC Security (MACsec) key considerations, see MACsec pre-shared CKN/CAK key considerations in the *Direct Connect User Guide*.
 */
export const associateMacSecKey: API.OperationMethod<
  AssociateMacSecKeyRequest,
  AssociateMacSecKeyResponse,
  AssociateMacSecKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { connectionId: 0, secretARN: 0, ckn: 0, cak: 0 },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMacSecKey",
})) as any;

export type AssociateVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Associates a virtual interface with a specified link aggregation group (LAG) or
 * connection. Connectivity to Amazon Web Services is temporarily interrupted as the virtual interface is
 * being migrated. If the target connection or LAG has an associated virtual interface with
 * a conflicting VLAN number or a conflicting IP address, the operation fails.
 *
 * Virtual interfaces associated with a hosted connection cannot be associated with a
 * LAG; hosted connections must be migrated along with their virtual interfaces using AssociateHostedConnection.
 *
 * To reassociate a virtual interface to a new connection or LAG, the requester
 * must own either the virtual interface itself or the connection to which the virtual
 * interface is currently associated. Additionally, the requester must own the connection
 * or LAG for the association.
 */
export const associateVirtualInterface: API.OperationMethod<
  AssociateVirtualInterfaceRequest,
  VirtualInterface,
  AssociateVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { virtualInterfaceId: 0, connectionId: 0 },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateVirtualInterface",
})) as any;

export type ConfirmConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Confirms the creation of the specified hosted connection on an interconnect.
 *
 * Upon creation, the hosted connection is initially in the `Ordering` state, and
 * remains in this state until the owner confirms creation of the hosted connection.
 */
export const confirmConnection: API.OperationMethod<
  ConfirmConnectionRequest,
  ConfirmConnectionResponse,
  ConfirmConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { connectionId: 0 } },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmConnection",
})) as any;

export type ConfirmCustomerAgreementError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * The confirmation of the terms of agreement when creating the connection/link aggregation group (LAG).
 */
export const confirmCustomerAgreement: API.OperationMethod<
  ConfirmCustomerAgreementRequest,
  ConfirmCustomerAgreementResponse,
  ConfirmCustomerAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { agreementName: 0 } },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmCustomerAgreement",
})) as any;

export type ConfirmPrivateVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Accepts ownership of a private virtual interface created by another Amazon Web Services account.
 *
 * After the virtual interface owner makes this call, the virtual interface is
 * created and attached to the specified virtual private gateway or Direct Connect gateway, and is
 * made available to handle traffic.
 */
export const confirmPrivateVirtualInterface: API.OperationMethod<
  ConfirmPrivateVirtualInterfaceRequest,
  ConfirmPrivateVirtualInterfaceResponse,
  ConfirmPrivateVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      virtualInterfaceId: 0,
      virtualGatewayId: 0,
      directConnectGatewayId: 0,
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmPrivateVirtualInterface",
})) as any;

export type ConfirmPublicVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Accepts ownership of a public virtual interface created by another Amazon Web Services account.
 *
 * After the virtual interface owner makes this call, the specified virtual interface is
 * created and made available to handle traffic.
 */
export const confirmPublicVirtualInterface: API.OperationMethod<
  ConfirmPublicVirtualInterfaceRequest,
  ConfirmPublicVirtualInterfaceResponse,
  ConfirmPublicVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { virtualInterfaceId: 0 } },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmPublicVirtualInterface",
})) as any;

export type ConfirmTransitVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Accepts ownership of a transit virtual interface created by another Amazon Web Services account.
 *
 * After the owner of the transit virtual interface makes this call, the specified transit virtual interface is created and made available to handle traffic.
 */
export const confirmTransitVirtualInterface: API.OperationMethod<
  ConfirmTransitVirtualInterfaceRequest,
  ConfirmTransitVirtualInterfaceResponse,
  ConfirmTransitVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { virtualInterfaceId: 0, directConnectGatewayId: 0 },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmTransitVirtualInterface",
})) as any;

export type CreateBGPPeerError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Creates a BGP peer on the specified virtual interface.
 *
 * You must create a BGP peer for the corresponding address family (IPv4/IPv6) in order to
 * access Amazon Web Services resources that also use that address family.
 *
 * If logical redundancy is not supported by the connection, interconnect, or LAG, the BGP peer cannot
 * be in the same address family as an existing BGP peer on the virtual interface.
 *
 * When creating a IPv6 BGP peer, omit the Amazon address and customer address. IPv6 addresses are automatically assigned from
 * the Amazon pool of IPv6 addresses; you cannot specify custom IPv6 addresses.
 *
 * If you let Amazon Web Services auto-assign IPv4 addresses, a /30 CIDR will be allocated
 * from 169.254.0.0/16. Amazon Web Services does not recommend this option if you intend to use
 * the customer router peer IP address as the source and destination for traffic. Instead you
 * should use RFC 1918 or other addressing, and specify the address yourself. For more
 * information about RFC 1918 see
 * Address Allocation for Private Internets.
 *
 * For a public virtual interface, the Autonomous System Number (ASN) must be private or already on the allow list for the virtual interface.
 */
export const createBGPPeer: API.OperationMethod<
  CreateBGPPeerRequest,
  CreateBGPPeerResponse,
  CreateBGPPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      virtualInterfaceId: 0,
      newBGPPeer: {
        asn: 0,
        asnLong: 0,
        authKey: 0,
        addressFamily: 0,
        amazonAddress: 0,
        customerAddress: 0,
      },
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBGPPeer",
})) as any;

export type CreateConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a connection between a customer network and a specific Direct Connect location.
 *
 * A connection links your internal network to an Direct Connect location over a standard Ethernet fiber-optic
 * cable. One end of the cable is connected to your router, the other to an Direct Connect router.
 *
 * To find the locations for your Region, use DescribeLocations.
 *
 * You can automatically add the new connection to a link aggregation group (LAG) by
 * specifying a LAG ID in the request. This ensures that the new connection is allocated on the
 * same Direct Connect endpoint that hosts the specified LAG. If there are no available ports on the endpoint,
 * the request fails and no connection is created.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionRequest,
  Connection,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      location: 0,
      bandwidth: 0,
      connectionName: 0,
      lagId: 0,
      tags: D.list(i_Tag),
      providerName: 0,
      requestMACSec: 0,
    },
    output: { loaIssueTime: D.ts },
  },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
})) as any;

export type CreateDirectConnectGatewayError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Creates a Direct Connect gateway, which is an intermediate object that enables you to connect a set
 * of virtual interfaces and virtual private gateways. A Direct Connect gateway is global and visible in any
 * Amazon Web Services Region after it is created. The virtual interfaces and virtual private gateways that
 * are connected through a Direct Connect gateway can be in different Amazon Web Services Regions. This enables you to
 * connect to a VPC in any Region, regardless of the Region in which the virtual interfaces
 * are located, and pass traffic between them.
 */
export const createDirectConnectGateway: API.OperationMethod<
  CreateDirectConnectGatewayRequest,
  CreateDirectConnectGatewayResult,
  CreateDirectConnectGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      directConnectGatewayName: 0,
      tags: D.list(i_Tag),
      amazonSideAsn: 0,
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectConnectGateway",
})) as any;

export type CreateDirectConnectGatewayAssociationError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Creates an association between a Direct Connect gateway and a virtual private gateway. The virtual
 * private gateway must be attached to a VPC and must not be associated with another Direct Connect gateway.
 */
export const createDirectConnectGatewayAssociation: API.OperationMethod<
  CreateDirectConnectGatewayAssociationRequest,
  CreateDirectConnectGatewayAssociationResult,
  CreateDirectConnectGatewayAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      directConnectGatewayId: 0,
      gatewayId: 0,
      addAllowedPrefixesToDirectConnectGateway: D.list(i_RouteFilterPrefix),
      virtualGatewayId: 0,
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectConnectGatewayAssociation",
})) as any;

export type CreateDirectConnectGatewayAssociationProposalError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Creates a proposal to associate the specified virtual private gateway or transit gateway with the specified Direct Connect gateway.
 *
 * You can associate a Direct Connect gateway and virtual private gateway or transit gateway that is owned by any Amazon Web Services account.
 */
export const createDirectConnectGatewayAssociationProposal: API.OperationMethod<
  CreateDirectConnectGatewayAssociationProposalRequest,
  CreateDirectConnectGatewayAssociationProposalResult,
  CreateDirectConnectGatewayAssociationProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      directConnectGatewayId: 0,
      directConnectGatewayOwnerAccount: 0,
      gatewayId: 0,
      addAllowedPrefixesToDirectConnectGateway: D.list(i_RouteFilterPrefix),
      removeAllowedPrefixesToDirectConnectGateway: D.list(i_RouteFilterPrefix),
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectConnectGatewayAssociationProposal",
})) as any;

export type CreateInterconnectError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an interconnect between an Direct Connect Partner's network and a specific Direct Connect location.
 *
 * An interconnect is a connection that is capable of hosting other connections. The
 * Direct Connect Partner can use an interconnect to provide Direct Connect hosted
 * connections to customers through their own network services. Like a standard connection, an
 * interconnect links the partner's network to an Direct Connect location over a standard Ethernet
 * fiber-optic cable. One end is connected to the partner's router, the other to an Direct Connect
 * router.
 *
 * You can automatically add the new interconnect to a link aggregation group (LAG) by
 * specifying a LAG ID in the request. This ensures that the new interconnect is allocated on
 * the same Direct Connect endpoint that hosts the specified LAG. If there are no available ports on the
 * endpoint, the request fails and no interconnect is created.
 *
 * For each end customer, the Direct Connect Partner provisions a connection on their interconnect by calling AllocateHostedConnection.
 * The end customer can then connect to Amazon Web Services resources by creating a virtual interface on their connection, using the VLAN assigned to them by the Direct Connect Partner.
 *
 * Intended for use by Direct Connect Partners only.
 */
export const createInterconnect: API.OperationMethod<
  CreateInterconnectRequest,
  Interconnect,
  CreateInterconnectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      interconnectName: 0,
      bandwidth: 0,
      location: 0,
      lagId: 0,
      tags: D.list(i_Tag),
      providerName: 0,
      requestMACSec: 0,
    },
    output: { loaIssueTime: D.ts },
  },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInterconnect",
})) as any;

export type CreateLagError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a link aggregation group (LAG) with the specified number of bundled
 * physical dedicated connections between the customer network and a specific Direct Connect location.
 * A LAG is a logical interface that uses the Link Aggregation Control Protocol
 * (LACP) to aggregate multiple interfaces, enabling you to treat them as a single
 * interface.
 *
 * All connections in a LAG must use the same bandwidth (either 1Gbps, 10Gbps, 100Gbps,
 * or 400Gbps) and must terminate at the same Direct Connect endpoint.
 *
 * You can have up to 10 dedicated connections per location. Regardless of this limit, if you
 * request more connections for the LAG than Direct Connect can allocate on a single endpoint, no LAG is
 * created..
 *
 * You can specify an existing physical dedicated connection or interconnect to include in
 * the LAG (which counts towards the total number of connections). Doing so interrupts the
 * current physical dedicated connection, and re-establishes them as a member of the LAG. The LAG
 * will be created on the same Direct Connect endpoint to which the dedicated connection terminates. Any
 * virtual interfaces associated with the dedicated connection are automatically disassociated
 * and re-associated with the LAG. The connection ID does not change.
 *
 * If the Amazon Web Services account used to create a LAG is a registered Direct Connect Partner, the LAG is
 * automatically enabled to host sub-connections. For a LAG owned by a partner, any associated virtual
 * interfaces cannot be directly configured.
 */
export const createLag: API.OperationMethod<
  CreateLagRequest,
  Lag,
  CreateLagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      numberOfConnections: 0,
      location: 0,
      connectionsBandwidth: 0,
      lagName: 0,
      connectionId: 0,
      tags: D.list(i_Tag),
      childConnectionTags: D.list(i_Tag),
      providerName: 0,
      requestMACSec: 0,
    },
    output: { connections: D.list(o_Connection) },
  },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLag",
})) as any;

export type CreatePrivateVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a private virtual interface. A virtual interface is the VLAN that transports Direct Connect traffic.
 * A private virtual interface can be connected to either a Direct Connect gateway or a Virtual Private Gateway (VGW).
 * Connecting the private virtual interface to a Direct Connect gateway enables the possibility for connecting to multiple
 * VPCs, including VPCs in different Amazon Web Services Regions. Connecting the private virtual interface
 * to a VGW only provides access to a single VPC within the same Region.
 *
 * Setting the MTU of a virtual interface to 8500 (jumbo frames) can cause an update to
 * the underlying physical connection if it wasn't updated to support jumbo frames. Updating
 * the connection disrupts network connectivity for all virtual interfaces associated with
 * the connection for up to 30 seconds. To check whether your connection supports jumbo
 * frames, call DescribeConnections. To check whether your virtual
 * interface supports jumbo frames, call DescribeVirtualInterfaces.
 */
export const createPrivateVirtualInterface: API.OperationMethod<
  CreatePrivateVirtualInterfaceRequest,
  VirtualInterface,
  CreatePrivateVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      connectionId: 0,
      newPrivateVirtualInterface: {
        virtualInterfaceName: 0,
        vlan: 0,
        asn: 0,
        asnLong: 0,
        mtu: 0,
        authKey: 0,
        amazonAddress: 0,
        customerAddress: 0,
        addressFamily: 0,
        virtualGatewayId: 0,
        directConnectGatewayId: 0,
        tags: D.list(i_Tag),
        enableSiteLink: 0,
        prefixPoolAllocatedCountIpv4: 0,
        prefixPoolAllocatedCountIpv6: 0,
        rateLimit: 0,
      },
    },
  },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrivateVirtualInterface",
})) as any;

export type CreatePublicVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a public virtual interface. A virtual interface is the VLAN that transports Direct Connect traffic.
 * A public virtual interface supports sending traffic to public services of Amazon Web Services such as Amazon S3.
 *
 * When creating an IPv6 public virtual interface (`addressFamily` is `ipv6`), leave the `customer`
 * and `amazon` address fields blank to use auto-assigned IPv6 space. Custom IPv6 addresses are not supported.
 */
export const createPublicVirtualInterface: API.OperationMethod<
  CreatePublicVirtualInterfaceRequest,
  VirtualInterface,
  CreatePublicVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      connectionId: 0,
      newPublicVirtualInterface: {
        virtualInterfaceName: 0,
        vlan: 0,
        asn: 0,
        asnLong: 0,
        authKey: 0,
        amazonAddress: 0,
        customerAddress: 0,
        addressFamily: 0,
        routeFilterPrefixes: D.list(i_RouteFilterPrefix),
        tags: D.list(i_Tag),
        rateLimit: 0,
      },
    },
  },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePublicVirtualInterface",
})) as any;

export type CreateTransitVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a transit virtual interface. A transit virtual interface should be used to access one or more transit gateways associated with Direct Connect gateways. A transit virtual interface enables the connection of multiple VPCs attached to a transit gateway to a Direct Connect gateway.
 *
 * If you associate your transit gateway with one or more Direct Connect gateways, the Autonomous System Number (ASN) used by the transit gateway and the Direct Connect gateway must be different. For example, if you use the default ASN 64512 for both your the transit gateway and Direct Connect gateway, the association request fails.
 *
 * A jumbo MTU value must be either 1500 or 8500. No other values will be accepted. Setting
 * the MTU of a virtual interface to 8500 (jumbo frames) can cause an update to the underlying
 * physical connection if it wasn't updated to support jumbo frames. Updating the connection
 * disrupts network connectivity for all virtual interfaces associated with the connection for up
 * to 30 seconds. To check whether your connection supports jumbo frames, call DescribeConnections. To check whether your virtual interface supports jumbo
 * frames, call DescribeVirtualInterfaces.
 */
export const createTransitVirtualInterface: API.OperationMethod<
  CreateTransitVirtualInterfaceRequest,
  CreateTransitVirtualInterfaceResult,
  CreateTransitVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      connectionId: 0,
      newTransitVirtualInterface: {
        virtualInterfaceName: 0,
        vlan: 0,
        asn: 0,
        asnLong: 0,
        mtu: 0,
        authKey: 0,
        amazonAddress: 0,
        customerAddress: 0,
        addressFamily: 0,
        directConnectGatewayId: 0,
        tags: D.list(i_Tag),
        enableSiteLink: 0,
        prefixPoolAllocatedCountIpv4: 0,
        prefixPoolAllocatedCountIpv6: 0,
        rateLimit: 0,
      },
    },
  },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTransitVirtualInterface",
})) as any;

export type DeleteBGPPeerError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the specified BGP peer on the specified virtual interface with the specified customer address and ASN.
 *
 * You cannot delete the last BGP peer from a virtual interface.
 */
export const deleteBGPPeer: API.OperationMethod<
  DeleteBGPPeerRequest,
  DeleteBGPPeerResponse,
  DeleteBGPPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      virtualInterfaceId: 0,
      asn: 0,
      asnLong: 0,
      customerAddress: 0,
      bgpPeerId: 0,
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBGPPeer",
})) as any;

export type DeleteConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the specified connection.
 *
 * Deleting a connection only stops the Direct Connect port hour and data transfer charges.
 * If you are partnering with any third parties to connect with the Direct Connect location,
 * you must cancel your service with them separately.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  Connection,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { connectionId: 0 },
    output: { loaIssueTime: D.ts },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
})) as any;

export type DeleteDirectConnectGatewayError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the specified Direct Connect gateway. You must first delete all virtual interfaces that are
 * attached to the Direct Connect gateway and disassociate all virtual private gateways associated
 * with the Direct Connect gateway.
 */
export const deleteDirectConnectGateway: API.OperationMethod<
  DeleteDirectConnectGatewayRequest,
  DeleteDirectConnectGatewayResult,
  DeleteDirectConnectGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { directConnectGatewayId: 0 } },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectConnectGateway",
})) as any;

export type DeleteDirectConnectGatewayAssociationError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the association between the specified Direct Connect gateway and virtual private gateway.
 *
 * We recommend that you specify the `associationID` to delete the association. Alternatively, if you own virtual gateway and a Direct Connect gateway association, you can specify the `virtualGatewayId` and `directConnectGatewayId` to delete an association.
 */
export const deleteDirectConnectGatewayAssociation: API.OperationMethod<
  DeleteDirectConnectGatewayAssociationRequest,
  DeleteDirectConnectGatewayAssociationResult,
  DeleteDirectConnectGatewayAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { associationId: 0, directConnectGatewayId: 0, virtualGatewayId: 0 },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectConnectGatewayAssociation",
})) as any;

export type DeleteDirectConnectGatewayAssociationProposalError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the association proposal request between the specified Direct Connect gateway and virtual private gateway or transit gateway.
 */
export const deleteDirectConnectGatewayAssociationProposal: API.OperationMethod<
  DeleteDirectConnectGatewayAssociationProposalRequest,
  DeleteDirectConnectGatewayAssociationProposalResult,
  DeleteDirectConnectGatewayAssociationProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { proposalId: 0 } },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectConnectGatewayAssociationProposal",
})) as any;

export type DeleteInterconnectError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the specified interconnect.
 *
 * Intended for use
 * by Direct Connect Partners only.
 */
export const deleteInterconnect: API.OperationMethod<
  DeleteInterconnectRequest,
  DeleteInterconnectResponse,
  DeleteInterconnectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { interconnectId: 0 } },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInterconnect",
})) as any;

export type DeleteLagError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the specified link aggregation group (LAG). You cannot delete a LAG if it has active
 * virtual interfaces or hosted connections.
 */
export const deleteLag: API.OperationMethod<
  DeleteLagRequest,
  Lag,
  DeleteLagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { lagId: 0 },
    output: { connections: D.list(o_Connection) },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLag",
})) as any;

export type DeleteVirtualInterfaceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes a virtual interface.
 */
export const deleteVirtualInterface: API.OperationMethod<
  DeleteVirtualInterfaceRequest,
  DeleteVirtualInterfaceResponse,
  DeleteVirtualInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { virtualInterfaceId: 0 } },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualInterface",
})) as any;

export type DescribeConnectionLoaError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deprecated. Use DescribeLoa instead.
 *
 * Gets the LOA-CFA for a connection.
 *
 * The Letter of Authorization - Connecting Facility Assignment (LOA-CFA) is a document that your APN partner or
 * service provider uses when establishing your cross connect to Amazon Web Services at the colocation facility. For more information,
 * see Requesting Cross Connects
 * at Direct Connect Locations in the *Direct Connect User Guide*.
 */
export const describeConnectionLoa: API.OperationMethod<
  DescribeConnectionLoaRequest,
  DescribeConnectionLoaResponse,
  DescribeConnectionLoaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { connectionId: 0, providerName: 0, loaContentType: 0 },
    output: { loa: o_Loa },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionLoa",
})) as any;

export type DescribeConnectionsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Displays the specified connection or all connections in this Region.
 */
export const describeConnections: API.OperationMethod<
  DescribeConnectionsRequest,
  Connections,
  DescribeConnectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { connectionId: 0, maxResults: 0, nextToken: 0 },
    output: { connections: D.list(o_Connection) },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnections",
})) as any;

export type DescribeConnectionsOnInterconnectError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deprecated. Use DescribeHostedConnections instead.
 *
 * Lists the connections that have been provisioned on the specified interconnect.
 *
 * Intended for use by Direct Connect Partners only.
 */
export const describeConnectionsOnInterconnect: API.OperationMethod<
  DescribeConnectionsOnInterconnectRequest,
  Connections,
  DescribeConnectionsOnInterconnectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { interconnectId: 0 },
    output: { connections: D.list(o_Connection) },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionsOnInterconnect",
})) as any;

export type DescribeCustomerMetadataError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Get and view a list of customer agreements, along with their signed status and whether the customer is an NNIPartner, NNIPartnerV2, or a nonPartner.
 */
export const describeCustomerMetadata: API.OperationMethod<
  DescribeCustomerMetadataRequest,
  DescribeCustomerMetadataResponse,
  DescribeCustomerMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomerMetadata",
})) as any;

export type DescribeDirectConnectGatewayAssociationProposalsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Describes one or more association proposals for connection between a virtual private gateway or transit gateway and a Direct Connect gateway.
 */
export const describeDirectConnectGatewayAssociationProposals: API.OperationMethod<
  DescribeDirectConnectGatewayAssociationProposalsRequest,
  DescribeDirectConnectGatewayAssociationProposalsResult,
  DescribeDirectConnectGatewayAssociationProposalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      directConnectGatewayId: 0,
      proposalId: 0,
      associatedGatewayId: 0,
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGatewayAssociationProposals",
})) as any;

export type DescribeDirectConnectGatewayAssociationsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the associations between your Direct Connect gateways and virtual private gateways and transit gateways. You must specify one of the following:
 *
 * - A Direct Connect gateway
 *
 * The response contains all virtual private gateways and transit gateways associated with the Direct Connect gateway.
 *
 * - A virtual private gateway
 *
 * The response contains the Direct Connect gateway.
 *
 * - A transit gateway
 *
 * The response contains the Direct Connect gateway.
 *
 * - A Direct Connect gateway and a virtual private gateway
 *
 * The response contains the association between the Direct Connect gateway and virtual private gateway.
 *
 * - A Direct Connect gateway and a transit gateway
 *
 * The response contains the association between the Direct Connect gateway and transit gateway.
 *
 * - A Direct Connect gateway and a virtual private gateway
 *
 * The response contains the association between the Direct Connect gateway and virtual private gateway.
 *
 * - A Direct Connect gateway association to a Cloud WAN core network
 *
 * The response contains the Cloud WAN core network ID that the Direct Connect gateway is associated to.
 */
export const describeDirectConnectGatewayAssociations: API.OperationMethod<
  DescribeDirectConnectGatewayAssociationsRequest,
  DescribeDirectConnectGatewayAssociationsResult,
  DescribeDirectConnectGatewayAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      associationId: 0,
      associatedGatewayId: 0,
      directConnectGatewayId: 0,
      maxResults: 0,
      nextToken: 0,
      virtualGatewayId: 0,
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGatewayAssociations",
})) as any;

export type DescribeDirectConnectGatewayAttachmentsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the attachments between your Direct Connect gateways and virtual interfaces. You must specify
 * a Direct Connect gateway, a virtual interface, or both. If you specify a Direct Connect gateway, the response contains
 * all virtual interfaces attached to the Direct Connect gateway. If you specify a virtual interface, the
 * response contains all Direct Connect gateways attached to the virtual interface. If you specify both,
 * the response contains the attachment between the Direct Connect gateway and the virtual interface.
 */
export const describeDirectConnectGatewayAttachments: API.OperationMethod<
  DescribeDirectConnectGatewayAttachmentsRequest,
  DescribeDirectConnectGatewayAttachmentsResult,
  DescribeDirectConnectGatewayAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      directConnectGatewayId: 0,
      virtualInterfaceId: 0,
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGatewayAttachments",
})) as any;

export type DescribeDirectConnectGatewaysError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists all your Direct Connect gateways or only the specified Direct Connect gateway. Deleted Direct Connect gateways are not returned.
 */
export const describeDirectConnectGateways: API.OperationMethod<
  DescribeDirectConnectGatewaysRequest,
  DescribeDirectConnectGatewaysResult,
  DescribeDirectConnectGatewaysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { directConnectGatewayId: 0, maxResults: 0, nextToken: 0 },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGateways",
})) as any;

export type DescribeHostedConnectionsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the hosted connections that have been provisioned on the specified
 * interconnect or link aggregation group (LAG).
 *
 * Intended for use by Direct Connect Partners only.
 */
export const describeHostedConnections: API.OperationMethod<
  DescribeHostedConnectionsRequest,
  Connections,
  DescribeHostedConnectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { connectionId: 0, maxResults: 0, nextToken: 0 },
    output: { connections: D.list(o_Connection) },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHostedConnections",
})) as any;

export type DescribeInterconnectLoaError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deprecated. Use DescribeLoa instead.
 *
 * Gets the LOA-CFA for the specified interconnect.
 *
 * The Letter of Authorization - Connecting Facility Assignment (LOA-CFA) is a document that is used when establishing your cross connect to Amazon Web Services at the colocation facility.
 * For more information, see Requesting Cross Connects at Direct Connect Locations
 * in the *Direct Connect User Guide*.
 */
export const describeInterconnectLoa: API.OperationMethod<
  DescribeInterconnectLoaRequest,
  DescribeInterconnectLoaResponse,
  DescribeInterconnectLoaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { interconnectId: 0, providerName: 0, loaContentType: 0 },
    output: { loa: o_Loa },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInterconnectLoa",
})) as any;

export type DescribeInterconnectsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the interconnects owned by the Amazon Web Services account or only the specified interconnect.
 */
export const describeInterconnects: API.OperationMethod<
  DescribeInterconnectsRequest,
  Interconnects,
  DescribeInterconnectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { interconnectId: 0, maxResults: 0, nextToken: 0 },
    output: { interconnects: D.list({ loaIssueTime: D.ts }) },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInterconnects",
})) as any;

export type DescribeLagsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Describes all your link aggregation groups (LAG) or the specified LAG.
 */
export const describeLags: API.OperationMethod<
  DescribeLagsRequest,
  Lags,
  DescribeLagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { lagId: 0, maxResults: 0, nextToken: 0 },
    output: { lags: D.list({ connections: D.list(o_Connection) }) },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLags",
})) as any;

export type DescribeLoaError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Gets the LOA-CFA for a connection, interconnect, or link aggregation group (LAG).
 *
 * The Letter of Authorization - Connecting Facility Assignment (LOA-CFA) is a document that is used when establishing
 * your cross connect to Amazon Web Services at the colocation facility. For more information, see Requesting Cross Connects at Direct Connect Locations
 * in the *Direct Connect User Guide*.
 */
export const describeLoa: API.OperationMethod<
  DescribeLoaRequest,
  Loa,
  DescribeLoaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { connectionId: 0, providerName: 0, loaContentType: 0 },
    output: { loaContent: D.blob },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoa",
})) as any;

export type DescribeLocationsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the Direct Connect locations in the current Amazon Web Services Region. These are the locations that can be selected when calling
 * CreateConnection or CreateInterconnect.
 */
export const describeLocations: API.OperationMethod<
  DescribeLocationsRequest,
  Locations,
  DescribeLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocations",
})) as any;

export type DescribeRouterConfigurationError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Details about the router.
 */
export const describeRouterConfiguration: API.OperationMethod<
  DescribeRouterConfigurationRequest,
  DescribeRouterConfigurationResponse,
  DescribeRouterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { virtualInterfaceId: 0, routerTypeIdentifier: 0 },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRouterConfiguration",
})) as any;

export type DescribeTagsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Describes the tags associated with the specified Direct Connect resources.
 */
export const describeTags: API.OperationMethod<
  DescribeTagsRequest,
  DescribeTagsResponse,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArns: 0 } },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
})) as any;

export type DescribeVirtualGatewaysError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deprecated. Use `DescribeVpnGateways` instead. See DescribeVPNGateways in the *Amazon Elastic Compute Cloud API Reference*.
 *
 * Lists the virtual private gateways owned by the Amazon Web Services account.
 *
 * You can create one or more Direct Connect private virtual interfaces linked to a virtual private gateway.
 */
export const describeVirtualGateways: API.OperationMethod<
  DescribeVirtualGatewaysRequest,
  VirtualGateways,
  DescribeVirtualGatewaysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualGateways",
})) as any;

export type DescribeVirtualInterfacesError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Displays all virtual interfaces for an Amazon Web Services account. Virtual interfaces deleted fewer
 * than 15 minutes before you make the request are also returned. If you specify a
 * connection ID, only the virtual interfaces associated with the connection are returned.
 * If you specify a virtual interface ID, then only a single virtual interface is returned.
 *
 * A virtual interface (VLAN) transmits the traffic between the Direct Connect location and the customer network.
 *
 * - If you're using an `asn`, the response includes the ASN value in both the `asn` and `asnLong` fields.
 *
 * - If you're using `asnLong`, the response returns a value of `0` (zero) for the `asn` attribute because it exceeds the highest ASN value of 2,147,483,647 that it can support
 */
export const describeVirtualInterfaces: API.OperationMethod<
  DescribeVirtualInterfacesRequest,
  VirtualInterfaces,
  DescribeVirtualInterfacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      connectionId: 0,
      virtualInterfaceId: 0,
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualInterfaces",
})) as any;

export type DisassociateConnectionFromLagError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Disassociates a connection from a link aggregation group (LAG). The connection is
 * interrupted and re-established as a standalone connection (the connection is not
 * deleted; to delete the connection, use the DeleteConnection request).
 * If the LAG has associated virtual interfaces or hosted connections, they remain
 * associated with the LAG. A disassociated connection owned by an Direct Connect Partner is
 * automatically converted to an interconnect.
 *
 * If disassociating the connection would cause the LAG to fall below its setting for
 * minimum number of operational connections, the request fails, except when it's the last
 * member of the LAG. If all connections are disassociated, the LAG continues to exist as
 * an empty LAG with no physical connections.
 */
export const disassociateConnectionFromLag: API.OperationMethod<
  DisassociateConnectionFromLagRequest,
  Connection,
  DisassociateConnectionFromLagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { connectionId: 0, lagId: 0 },
    output: { loaIssueTime: D.ts },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateConnectionFromLag",
})) as any;

export type DisassociateMacSecKeyError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Removes the association between a MAC Security (MACsec) security key and a Direct Connect connection.
 */
export const disassociateMacSecKey: API.OperationMethod<
  DisassociateMacSecKeyRequest,
  DisassociateMacSecKeyResponse,
  DisassociateMacSecKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { connectionId: 0, secretARN: 0 } },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMacSecKey",
})) as any;

export type ListVirtualInterfaceRoutesError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the routes for the specified virtual interface.
 *
 * Use the `routeDirection` filter to control which routes are returned:
 *
 * - `accepted`: routes received from the customer network over the virtual interface.
 *
 * - `advertised`: routes advertised to the customer network over the virtual interface.
 */
export const listVirtualInterfaceRoutes: API.OperationMethod<
  ListVirtualInterfaceRoutesRequest,
  ListVirtualInterfaceRoutesResponse,
  ListVirtualInterfaceRoutesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      virtualInterfaceId: 0,
      filters: {
        routeDirection: 0,
        addressFamily: 0,
        cidrs: 0,
        asPath: 0,
        communities: 0,
      },
      maxResults: 0,
      nextToken: 0,
    },
    output: { routes: D.list({ routeInstalledAt: D.ts }) },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualInterfaceRoutes",
})) as any;

export type ListVirtualInterfaceTestHistoryError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the virtual interface failover test history.
 */
export const listVirtualInterfaceTestHistory: API.OperationMethod<
  ListVirtualInterfaceTestHistoryRequest,
  ListVirtualInterfaceTestHistoryResponse,
  ListVirtualInterfaceTestHistoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      testId: 0,
      virtualInterfaceId: 0,
      bgpPeers: 0,
      status: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      virtualInterfaceTestHistory: D.list(o_VirtualInterfaceTestHistory),
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualInterfaceTestHistory",
})) as any;

export type StartBgpFailoverTestError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Starts the virtual interface failover test that verifies your configuration meets your resiliency requirements by placing the BGP peering session in the DOWN state. You can then send traffic to verify that there are no outages.
 *
 * You can run the test on public, private, transit, and hosted virtual interfaces.
 *
 * You can use ListVirtualInterfaceTestHistory to view the virtual interface test history.
 *
 * If you need to stop the test before the test interval completes, use StopBgpFailoverTest.
 */
export const startBgpFailoverTest: API.OperationMethod<
  StartBgpFailoverTestRequest,
  StartBgpFailoverTestResponse,
  StartBgpFailoverTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { virtualInterfaceId: 0, bgpPeers: 0, testDurationInMinutes: 0 },
    output: { virtualInterfaceTest: o_VirtualInterfaceTestHistory },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBgpFailoverTest",
})) as any;

export type StopBgpFailoverTestError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Stops the virtual interface failover test.
 */
export const stopBgpFailoverTest: API.OperationMethod<
  StopBgpFailoverTestRequest,
  StopBgpFailoverTestResponse,
  StopBgpFailoverTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { virtualInterfaceId: 0 },
    output: { virtualInterfaceTest: o_VirtualInterfaceTestHistory },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBgpFailoverTest",
})) as any;

export type TagResourceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds the specified tags to the specified Direct Connect resource. Each resource can have a maximum of 50 tags.
 *
 * Each tag consists of a key and an optional value. If a tag with the same key is already associated with the resource, this action updates its value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Removes one or more tags from the specified Direct Connect resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateConnectionError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the Direct Connect connection configuration.
 *
 * You can update the following parameters for a connection:
 *
 * - The connection name
 *
 * - The connection's MAC Security (MACsec) encryption mode.
 */
export const updateConnection: API.OperationMethod<
  UpdateConnectionRequest,
  Connection,
  UpdateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { connectionId: 0, connectionName: 0, encryptionMode: 0 },
    output: { loaIssueTime: D.ts },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
})) as any;

export type UpdateDirectConnectGatewayError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the name of a current Direct Connect gateway.
 */
export const updateDirectConnectGateway: API.OperationMethod<
  UpdateDirectConnectGatewayRequest,
  UpdateDirectConnectGatewayResponse,
  UpdateDirectConnectGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { directConnectGatewayId: 0, newDirectConnectGatewayName: 0 },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDirectConnectGateway",
})) as any;

export type UpdateDirectConnectGatewayAssociationError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the specified attributes of the Direct Connect gateway association.
 *
 * Add or remove prefixes from the association.
 */
export const updateDirectConnectGatewayAssociation: API.OperationMethod<
  UpdateDirectConnectGatewayAssociationRequest,
  UpdateDirectConnectGatewayAssociationResult,
  UpdateDirectConnectGatewayAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      associationId: 0,
      addAllowedPrefixesToDirectConnectGateway: D.list(i_RouteFilterPrefix),
      removeAllowedPrefixesToDirectConnectGateway: D.list(i_RouteFilterPrefix),
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDirectConnectGatewayAssociation",
})) as any;

export type UpdateLagError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the attributes of the specified link aggregation group (LAG).
 *
 * You can update the following LAG attributes:
 *
 * - The name of the LAG.
 *
 * - The value for the minimum number of connections that must be operational
 * for the LAG itself to be operational.
 *
 * - The LAG's MACsec encryption mode.
 *
 * Amazon Web Services assigns this value to each connection which is part of the LAG.
 *
 * - The tags
 *
 * If you adjust the threshold value for the minimum number of operational connections, ensure
 * that the new value does not cause the LAG to fall below the threshold and become
 * non-operational.
 */
export const updateLag: API.OperationMethod<
  UpdateLagRequest,
  Lag,
  UpdateLagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { lagId: 0, lagName: 0, minimumLinks: 0, encryptionMode: 0 },
    output: { connections: D.list(o_Connection) },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLag",
})) as any;

export type UpdateVirtualInterfaceAttributesError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the specified attributes of the specified virtual private interface.
 *
 * Setting the MTU of a virtual interface to 8500 (jumbo frames) can cause an update to
 * the underlying physical connection if it wasn't updated to support jumbo frames. Updating
 * the connection disrupts network connectivity for all virtual interfaces associated with
 * the connection for up to 30 seconds. To check whether your connection supports jumbo
 * frames, call DescribeConnections. To check whether your virtual
 * interface supports jumbo frames, call DescribeVirtualInterfaces.
 */
export const updateVirtualInterfaceAttributes: API.OperationMethod<
  UpdateVirtualInterfaceAttributesRequest,
  VirtualInterface,
  UpdateVirtualInterfaceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      virtualInterfaceId: 0,
      mtu: 0,
      enableSiteLink: 0,
      virtualInterfaceName: 0,
      prefixPoolAllocatedCountIpv4: 0,
      prefixPoolAllocatedCountIpv6: 0,
      rateLimit: 0,
    },
  },
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualInterfaceAttributes",
})) as any;

const i_RouteFilterPrefix: D.LazyStruct = () => ({ cidr: 0 });
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_Connection: D.LazyStruct = () => ({ loaIssueTime: D.ts });
const o_Loa: D.LazyStruct = () => ({ loaContent: D.blob });
const o_VirtualInterfaceTestHistory: D.LazyStruct = () => ({
  startTime: D.ts,
  endTime: D.ts,
});
