import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://directconnect.amazonaws.com/doc/2012-10-25/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Direct Connect",
  serviceShapeName: "OvertureService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "directconnect" });
const ver = /*@__PURE__*/ T.ServiceVersion("2012-10-25");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://directconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://directconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://directconnect.{R}.{D}","properties":{},"headers":{}}');

export class DirectConnectClientException
  extends /*@__PURE__*/ S.TaggedError<DirectConnectClientException>()(
    "DirectConnectClientException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DirectConnectServerException
  extends /*@__PURE__*/ S.TaggedError<DirectConnectServerException>()(
    "DirectConnectServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DuplicateTagKeysException
  extends /*@__PURE__*/ S.TaggedError<DuplicateTagKeysException>()("DuplicateTagKeysException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()("TooManyTagsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
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
export type GatewayType = "virtualPrivateGateway" | "transitGateway" | (string & {});
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
export type BillingMode =
  | "PayAsYouGo"
  | "FlatRateTier1"
  | "FlatRateTier2"
  | "FlatRateTier3"
  | "FlatRateTier4"
  | "FlatRateTier5"
  | "PortPairFlatRateTier1"
  | "PortPairFlatRateTier2"
  | "PortPairFlatRateTier3"
  | "PortPairFlatRateTier4"
  | "PortPairFlatRateTier5"
  | (string & {});
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
  billingMode?: BillingMode;
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
export type ConnectionIdentifier = string;
export type ConnectionIdentifierList = string[];
export type ResiliencyGroupId = string;
export type IdempotencyToken = string;
export interface AssociateConnectionsToResiliencyGroupRequest {
  connectionIdentifiers: string[];
  resiliencyGroupId: string;
  clientToken?: string;
}
export type ConnectionArn = string;
export type ResiliencyGroupAssociationState =
  | "associating"
  | "associated"
  | "disassociating"
  | "disassociated"
  | (string & {});
export interface ResiliencyGroupAssociation {
  resiliencyGroupId?: string;
  connectionArn?: string;
  state?: ResiliencyGroupAssociationState;
}
export type ResiliencyGroupAssociationList = ResiliencyGroupAssociation[];
export interface AssociateConnectionsToResiliencyGroupResult {
  resiliencyGroupAssociations?: ResiliencyGroupAssociation[];
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
export type RequestBillingMode =
  | "PayAsYouGo"
  | "FlatRateTier1"
  | "FlatRateTier2"
  | "FlatRateTier3"
  | "FlatRateTier4"
  | "FlatRateTier5"
  | (string & {});
export interface CreateConnectionRequest {
  location: string;
  bandwidth: string;
  connectionName: string;
  lagId?: string;
  tags?: Tag[];
  providerName?: string;
  requestMACSec?: boolean;
  billingMode?: RequestBillingMode;
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
  billingMode?: RequestBillingMode;
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
  billingMode?: BillingMode;
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
export type ResiliencyGroupName = string;
export type ResiliencyModel =
  | "maximum-resiliency"
  | "high-resiliency"
  | "basic-resiliency"
  | (string & {});
export interface CreateResiliencyGroupRequest {
  resiliencyGroupName: string;
  intendedResiliencyModel: ResiliencyModel;
  clientToken?: string;
  tags?: Tag[];
}
export type ResiliencyGroupArn = string;
export type ResiliencyGroupType = "Managed" | (string & {});
export type ResiliencyGroupState = "pending" | "available" | "deleting" | "deleted" | (string & {});
export interface ResiliencyGroup {
  resiliencyGroupId?: string;
  resiliencyGroupArn?: string;
  resiliencyGroupName?: string;
  resiliencyGroupType?: ResiliencyGroupType;
  ownerAccount?: string;
  state?: ResiliencyGroupState;
  tags?: Tag[];
}
export interface CreateResiliencyGroupResult {
  resiliencyGroup?: ResiliencyGroup;
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
export interface DeleteResiliencyGroupRequest {
  resiliencyGroupId: string;
}
export interface DeleteResiliencyGroupResult {
  resiliencyGroup?: ResiliencyGroup;
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
export type DirectConnectGatewayAssociationProposalList = DirectConnectGatewayAssociationProposal[];
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
export type DirectConnectGatewayAssociationList = DirectConnectGatewayAssociation[];
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
export type DirectConnectGatewayAttachmentList = DirectConnectGatewayAttachment[];
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
export type IncludedRegionList = string[];
export interface AvailableBillingMode {
  billingMode?: BillingMode;
  availablePortSpeeds?: string[];
  includedRegions?: string[];
}
export type AvailableBillingModeList = AvailableBillingMode[];
export interface Location {
  locationCode?: string;
  locationName?: string;
  region?: string;
  availablePortSpeeds?: string[];
  availableProviders?: string[];
  availableMacSecPortSpeeds?: string[];
  availableBillingModes?: AvailableBillingMode[];
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
export interface DisassociateConnectionsFromResiliencyGroupRequest {
  connectionIdentifiers: string[];
  resiliencyGroupId: string;
  clientToken?: string;
}
export interface DisassociateConnectionsFromResiliencyGroupResult {
  resiliencyGroupAssociations?: ResiliencyGroupAssociation[];
}
export interface DisassociateMacSecKeyRequest {
  connectionId: string;
  secretARN: string;
}
export interface DisassociateMacSecKeyResponse {
  connectionId?: string;
  macSecKeys?: MacSecKey[];
}
export interface GetResiliencyGroupRequest {
  resiliencyGroupId: string;
}
export interface GetResiliencyGroupResult {
  resiliencyGroup?: ResiliencyGroup;
}
export interface ListResiliencyGroupAssociationsRequest {
  resiliencyGroupId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListResiliencyGroupAssociationsResult {
  items?: ResiliencyGroupAssociation[];
  nextToken?: string;
}
export interface ListResiliencyGroupsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ResiliencyGroupSummary {
  resiliencyGroupId?: string;
  resiliencyGroupArn?: string;
  resiliencyGroupName?: string;
  resiliencyGroupType?: ResiliencyGroupType;
  ownerAccount?: string;
  state?: ResiliencyGroupState;
}
export type ResiliencyGroupSummaryList = ResiliencyGroupSummary[];
export interface ListResiliencyGroupsResult {
  items?: ResiliencyGroupSummary[];
  nextToken?: string;
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
export type ConnectionIdList = string[];
export interface UpdateConnectionsBillingModeRequest {
  connectionIds: string[];
  billingMode: RequestBillingMode;
}
export interface UpdateConnectionsBillingModeResponse {
  billingMode?: BillingMode;
  connections?: Connection[];
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
export interface UpdateResiliencyGroupRequest {
  resiliencyGroupId: string;
  resiliencyGroupName: string;
  clientToken?: string;
}
export interface UpdateResiliencyGroupResult {
  resiliencyGroup?: ResiliencyGroup;
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
  input: __S(
    456,
    __c57,
    0,
  ) as any as S.Schema<AcceptDirectConnectGatewayAssociationProposalRequest>,
  output: __S(
    480,
    __c60,
    0,
  ) as any as S.Schema<AcceptDirectConnectGatewayAssociationProposalResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptDirectConnectGatewayAssociationProposal",
}));

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
  input: __S(576, __c72, 0) as any as S.Schema<AllocateConnectionOnInterconnectRequest>,
  output: __S(593, __c74, 1) as any as S.Schema<Connection>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocateConnectionOnInterconnect",
}));

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
  input: __S(712, __c89, 0) as any as S.Schema<AllocateHostedConnectionRequest>,
  output: __S(593, __c74, 1) as any as S.Schema<Connection>,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllocateHostedConnection",
}));

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
  input: __S(785, __c98, 1) as any as S.Schema<AllocatePrivateVirtualInterfaceRequest>,
  output: __S(794, __c99, 2) as any as S.Schema<VirtualInterface>,
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
}));

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
  input: __S(800, __c100, 0) as any as S.Schema<AllocatePublicVirtualInterfaceRequest>,
  output: __S(794, __c99, 2) as any as S.Schema<VirtualInterface>,
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
}));

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
  input: __S(1, __c0, 1) as any as S.Schema<AllocateTransitVirtualInterfaceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<AllocateTransitVirtualInterfaceResult>,
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
}));

export type AssociateConnectionsToResiliencyGroupError =
  | DirectConnectClientException
  | DirectConnectServerException
  | LimitExceededException
  | CommonErrors;
/**
 * Associates one or more connections with the specified resiliency group. This operation is
 * atomic: either all of the specified connections are associated, or the operation fails and no
 * changes are made.
 */
export const associateConnectionsToResiliencyGroup: API.OperationMethod<
  AssociateConnectionsToResiliencyGroupRequest,
  AssociateConnectionsToResiliencyGroupResult,
  AssociateConnectionsToResiliencyGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<AssociateConnectionsToResiliencyGroupRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<AssociateConnectionsToResiliencyGroupResult>,
  errors: [DirectConnectClientException, DirectConnectServerException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateConnectionsToResiliencyGroup",
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<AssociateConnectionWithLagRequest>,
  output: __S(593, __c74, 1) as any as S.Schema<Connection>,
  errors: [DirectConnectClientException, DirectConnectServerException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateConnectionWithLag",
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<AssociateHostedConnectionRequest>,
  output: __S(593, __c74, 1) as any as S.Schema<Connection>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateHostedConnection",
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<AssociateMacSecKeyRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<AssociateMacSecKeyResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMacSecKey",
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<AssociateVirtualInterfaceRequest>,
  output: __S(794, __c99, 2) as any as S.Schema<VirtualInterface>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateVirtualInterface",
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<ConfirmConnectionRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<ConfirmConnectionResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmConnection",
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<ConfirmCustomerAgreementRequest>,
  output: __S(97, __c12, 1) as any as S.Schema<ConfirmCustomerAgreementResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmCustomerAgreement",
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<ConfirmPrivateVirtualInterfaceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<ConfirmPrivateVirtualInterfaceResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmPrivateVirtualInterface",
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<ConfirmPublicVirtualInterfaceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<ConfirmPublicVirtualInterfaceResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmPublicVirtualInterface",
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<ConfirmTransitVirtualInterfaceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<ConfirmTransitVirtualInterfaceResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmTransitVirtualInterface",
}));

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
  input: __S(137, __c17, 1) as any as S.Schema<CreateBGPPeerRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CreateBGPPeerResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBGPPeer",
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<CreateConnectionRequest>,
  output: __S(593, __c74, 1) as any as S.Schema<Connection>,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<CreateDirectConnectGatewayRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<CreateDirectConnectGatewayResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectConnectGateway",
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<CreateDirectConnectGatewayAssociationRequest>,
  output: __S(480, __c60, 0) as any as S.Schema<CreateDirectConnectGatewayAssociationResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectConnectGatewayAssociation",
}));

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
  input: __S(
    184,
    __c23,
    0,
  ) as any as S.Schema<CreateDirectConnectGatewayAssociationProposalRequest>,
  output: __S(
    192,
    __c24,
    0,
  ) as any as S.Schema<CreateDirectConnectGatewayAssociationProposalResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectConnectGatewayAssociationProposal",
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<CreateInterconnectRequest>,
  output: __S(216, __c27, 0) as any as S.Schema<Interconnect>,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInterconnect",
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<CreateLagRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<Lag>,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLag",
}));

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
  input: __S(249, __c31, 1) as any as S.Schema<CreatePrivateVirtualInterfaceRequest>,
  output: __S(794, __c99, 2) as any as S.Schema<VirtualInterface>,
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
}));

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
  input: __S(256, __c32, 0) as any as S.Schema<CreatePublicVirtualInterfaceRequest>,
  output: __S(794, __c99, 2) as any as S.Schema<VirtualInterface>,
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
}));

export type CreateResiliencyGroupError =
  | DirectConnectClientException
  | DirectConnectServerException
  | DuplicateTagKeysException
  | LimitExceededException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a resiliency group. A resiliency group lets you group Direct Connect connections together
 * and manage them as a single unit to meet a target resiliency model.
 */
export const createResiliencyGroup: API.OperationMethod<
  CreateResiliencyGroupRequest,
  CreateResiliencyGroupResult,
  CreateResiliencyGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<CreateResiliencyGroupRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<CreateResiliencyGroupResult>,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    LimitExceededException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResiliencyGroup",
}));

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
  input: __S(281, __c35, 1) as any as S.Schema<CreateTransitVirtualInterfaceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CreateTransitVirtualInterfaceResult>,
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
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<DeleteBGPPeerRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteBGPPeerResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBGPPeer",
}));

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
  input: __S(296, __c37, 0) as any as S.Schema<DeleteConnectionRequest>,
  output: __S(593, __c74, 1) as any as S.Schema<Connection>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

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
  input: __S(304, __c38, 0) as any as S.Schema<DeleteDirectConnectGatewayRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteDirectConnectGatewayResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectConnectGateway",
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<DeleteDirectConnectGatewayAssociationRequest>,
  output: __S(480, __c60, 0) as any as S.Schema<DeleteDirectConnectGatewayAssociationResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectConnectGatewayAssociation",
}));

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
  input: __S(
    320,
    __c40,
    0,
  ) as any as S.Schema<DeleteDirectConnectGatewayAssociationProposalRequest>,
  output: __S(
    192,
    __c24,
    0,
  ) as any as S.Schema<DeleteDirectConnectGatewayAssociationProposalResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectConnectGatewayAssociationProposal",
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<DeleteInterconnectRequest>,
  output: __S(329, __c41, 1) as any as S.Schema<DeleteInterconnectResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInterconnect",
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<DeleteLagRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<Lag>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLag",
}));

export type DeleteResiliencyGroupError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Deletes the specified resiliency group. Deletion is asynchronous: the resiliency group
 * transitions through the `deleting` state before it reaches the
 * `deleted` state. The response returns the resiliency group so you can observe its
 * current state without a subsequent GetResiliencyGroup call.
 */
export const deleteResiliencyGroup: API.OperationMethod<
  DeleteResiliencyGroupRequest,
  DeleteResiliencyGroupResult,
  DeleteResiliencyGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<DeleteResiliencyGroupRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<DeleteResiliencyGroupResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResiliencyGroup",
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<DeleteVirtualInterfaceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DeleteVirtualInterfaceResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualInterface",
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<DescribeConnectionLoaRequest>,
  output: __S(368, __c46, 0) as any as S.Schema<DescribeConnectionLoaResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionLoa",
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<DescribeConnectionsRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<Connections>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnections",
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<DescribeConnectionsOnInterconnectRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<Connections>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionsOnInterconnect",
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<DescribeCustomerMetadataRequest>,
  output: __S(411, __c51, 3) as any as S.Schema<DescribeCustomerMetadataResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomerMetadata",
}));

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
  input: __S(
    416,
    __c52,
    0,
  ) as any as S.Schema<DescribeDirectConnectGatewayAssociationProposalsRequest>,
  output: __S(
    418,
    __c52,
    2,
  ) as any as S.Schema<DescribeDirectConnectGatewayAssociationProposalsResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGatewayAssociationProposals",
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<DescribeDirectConnectGatewayAssociationsRequest>,
  output: __S(426, __c53, 2) as any as S.Schema<DescribeDirectConnectGatewayAssociationsResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGatewayAssociations",
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<DescribeDirectConnectGatewayAttachmentsRequest>,
  output: __S(435, __c54, 3) as any as S.Schema<DescribeDirectConnectGatewayAttachmentsResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGatewayAttachments",
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<DescribeDirectConnectGatewaysRequest>,
  output: __S(442, __c55, 2) as any as S.Schema<DescribeDirectConnectGatewaysResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectConnectGateways",
}));

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
  input: __S(448, __c56, 0) as any as S.Schema<DescribeHostedConnectionsRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<Connections>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHostedConnections",
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<DescribeInterconnectLoaRequest>,
  output: __S(368, __c46, 0) as any as S.Schema<DescribeInterconnectLoaResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInterconnectLoa",
}));

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
  input: __S(504, __c63, 0) as any as S.Schema<DescribeInterconnectsRequest>,
  output: __S(506, __c63, 2) as any as S.Schema<Interconnects>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInterconnects",
}));

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
  input: __S(512, __c64, 0) as any as S.Schema<DescribeLagsRequest>,
  output: __S(514, __c64, 2) as any as S.Schema<Lags>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLags",
}));

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
  input: __S(520, __c65, 0) as any as S.Schema<DescribeLoaRequest>,
  output: __S(376, __c47, 0) as any as S.Schema<Loa>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoa",
}));

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
  input: __S(528, __c66, 0) as any as S.Schema<DescribeLocationsRequest>,
  output: __S(533, __c66, 5) as any as S.Schema<Locations>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocations",
}));

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
  input: __S(536, __c67, 0) as any as S.Schema<DescribeRouterConfigurationRequest>,
  output: __S(538, __c67, 2) as any as S.Schema<DescribeRouterConfigurationResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRouterConfiguration",
}));

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
  input: __S(544, __c68, 0) as any as S.Schema<DescribeTagsRequest>,
  output: __S(547, __c68, 3) as any as S.Schema<DescribeTagsResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
}));

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
  input: __S(552, __c69, 0) as any as S.Schema<DescribeVirtualGatewaysRequest>,
  output: __S(555, __c69, 3) as any as S.Schema<VirtualGateways>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualGateways",
}));

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
  input: __S(560, __c70, 0) as any as S.Schema<DescribeVirtualInterfacesRequest>,
  output: __S(562, __c70, 2) as any as S.Schema<VirtualInterfaces>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualInterfaces",
}));

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
  input: __S(568, __c71, 0) as any as S.Schema<DisassociateConnectionFromLagRequest>,
  output: __S(593, __c74, 1) as any as S.Schema<Connection>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateConnectionFromLag",
}));

export type DisassociateConnectionsFromResiliencyGroupError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Disassociates one or more connections from the specified resiliency group. This operation
 * is atomic: either all of the specified connections are disassociated, or the operation fails
 * and no changes are made.
 */
export const disassociateConnectionsFromResiliencyGroup: API.OperationMethod<
  DisassociateConnectionsFromResiliencyGroupRequest,
  DisassociateConnectionsFromResiliencyGroupResult,
  DisassociateConnectionsFromResiliencyGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c76, 0) as any as S.Schema<DisassociateConnectionsFromResiliencyGroupRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<DisassociateConnectionsFromResiliencyGroupResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateConnectionsFromResiliencyGroup",
}));

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
  input: __S(616, __c77, 0) as any as S.Schema<DisassociateMacSecKeyRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<DisassociateMacSecKeyResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMacSecKey",
}));

export type GetResiliencyGroupError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Gets information about the specified resiliency group.
 */
export const getResiliencyGroup: API.OperationMethod<
  GetResiliencyGroupRequest,
  GetResiliencyGroupResult,
  GetResiliencyGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c78, 0) as any as S.Schema<GetResiliencyGroupRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<GetResiliencyGroupResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResiliencyGroup",
}));

export type ListResiliencyGroupAssociationsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the connection associations for the specified resiliency group.
 */
export const listResiliencyGroupAssociations: API.OperationMethod<
  ListResiliencyGroupAssociationsRequest,
  ListResiliencyGroupAssociationsResult,
  ListResiliencyGroupAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(632, __c79, 0) as any as S.Schema<ListResiliencyGroupAssociationsRequest>,
  output: __S(633, __c79, 1) as any as S.Schema<ListResiliencyGroupAssociationsResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResiliencyGroupAssociations",
}));

export type ListResiliencyGroupsError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Lists the resiliency groups owned by your Amazon Web Services account in the current
 * Amazon Web Services Region.
 */
export const listResiliencyGroups: API.OperationMethod<
  ListResiliencyGroupsRequest,
  ListResiliencyGroupsResult,
  ListResiliencyGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c80, 0) as any as S.Schema<ListResiliencyGroupsRequest>,
  output: __S(643, __c80, 3) as any as S.Schema<ListResiliencyGroupsResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResiliencyGroups",
}));

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
  input: __S(650, __c81, 2) as any as S.Schema<ListVirtualInterfaceRoutesRequest>,
  output: __S(655, __c81, 7) as any as S.Schema<ListVirtualInterfaceRoutesResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualInterfaceRoutes",
}));

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
  input: __S(656, __c82, 0) as any as S.Schema<ListVirtualInterfaceTestHistoryRequest>,
  output: __S(658, __c82, 2) as any as S.Schema<ListVirtualInterfaceTestHistoryResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualInterfaceTestHistory",
}));

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
  input: __S(672, __c84, 0) as any as S.Schema<StartBgpFailoverTestRequest>,
  output: __S(680, __c85, 0) as any as S.Schema<StartBgpFailoverTestResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBgpFailoverTest",
}));

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
  input: __S(688, __c86, 0) as any as S.Schema<StopBgpFailoverTestRequest>,
  output: __S(680, __c85, 0) as any as S.Schema<StopBgpFailoverTestResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBgpFailoverTest",
}));

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
  input: __S(696, __c87, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(704, __c88, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    DirectConnectClientException,
    DirectConnectServerException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(720, __c90, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(704, __c88, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(728, __c91, 0) as any as S.Schema<UpdateConnectionRequest>,
  output: __S(593, __c74, 1) as any as S.Schema<Connection>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
}));

export type UpdateConnectionsBillingModeError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the billing mode for the specified Direct Connect connections. You can update the billing
 * mode for up to 200 connections in a single request.
 */
export const updateConnectionsBillingMode: API.OperationMethod<
  UpdateConnectionsBillingModeRequest,
  UpdateConnectionsBillingModeResponse,
  UpdateConnectionsBillingModeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c92, 0) as any as S.Schema<UpdateConnectionsBillingModeRequest>,
  output: __S(737, __c92, 1) as any as S.Schema<UpdateConnectionsBillingModeResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectionsBillingMode",
}));

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
  input: __S(744, __c93, 0) as any as S.Schema<UpdateDirectConnectGatewayRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<UpdateDirectConnectGatewayResponse>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDirectConnectGateway",
}));

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
  input: __S(752, __c94, 0) as any as S.Schema<UpdateDirectConnectGatewayAssociationRequest>,
  output: __S(480, __c60, 0) as any as S.Schema<UpdateDirectConnectGatewayAssociationResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDirectConnectGatewayAssociation",
}));

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
  input: __S(760, __c95, 0) as any as S.Schema<UpdateLagRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<Lag>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLag",
}));

export type UpdateResiliencyGroupError =
  | DirectConnectClientException
  | DirectConnectServerException
  | CommonErrors;
/**
 * Updates the name of the specified resiliency group.
 */
export const updateResiliencyGroup: API.OperationMethod<
  UpdateResiliencyGroupRequest,
  UpdateResiliencyGroupResult,
  UpdateResiliencyGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c96, 0) as any as S.Schema<UpdateResiliencyGroupRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<UpdateResiliencyGroupResult>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResiliencyGroup",
}));

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
  input: __S(776, __c97, 0) as any as S.Schema<UpdateVirtualInterfaceAttributesRequest>,
  output: __S(794, __c99, 2) as any as S.Schema<VirtualInterface>,
  errors: [DirectConnectClientException, DirectConnectServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualInterfaceAttributes",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceName: S.optional(S.String),
          vlan: S.optional(S.Number),
          asn: S.optional(S.Number),
          asnLong: S.optional(S.Number),
          mtu: S.optional(S.Number),
          authKey: S.optional(S.String),
          amazonAddress: S.optional(S.String),
          customerAddress: S.optional(S.String),
          addressFamily: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
          rateLimit: S.optional(S.String),
        }),
      ).annotate({ identifier: "NewTransitVirtualInterfaceAllocation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.String,
          ownerAccount: S.String,
          newTransitVirtualInterfaceAllocation: __S(0, __c0, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AllocateTransitVirtualInterfaceRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ virtualInterface: S.optional(__S(794, __c99, 2)) }).pipe(ns),
      ).annotate({ identifier: "AllocateTransitVirtualInterfaceResult" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionIdentifiers: __S(24, __c3, 0),
          resiliencyGroupId: S.String,
          clientToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateConnectionsToResiliencyGroupRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resiliencyGroupAssociations: S.optional(__S(41, __c5, 1)) }).pipe(ns),
      ).annotate({ identifier: "AssociateConnectionsToResiliencyGroupResult" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resiliencyGroupId: S.optional(S.String),
          connectionArn: S.optional(S.String),
          state: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResiliencyGroupAssociation" });
    case 1:
      return S.Array(__S(40, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectionId: S.String, lagId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateConnectionWithLagRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectionId: S.String, parentConnectionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateHostedConnectionRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.String,
          secretARN: S.optional(S.String),
          ckn: S.optional(S.String),
          cak: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateMacSecKeyRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.optional(S.String),
          macSecKeys: S.optional(__S(585, __c73, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "AssociateMacSecKeyResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ virtualInterfaceId: S.String, connectionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateVirtualInterfaceRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ConfirmConnectionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ connectionState: S.optional(S.String) }).pipe(ns)).annotate(
        { identifier: "ConfirmConnectionResponse" },
      );
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ConfirmCustomerAgreementRequest" });
    case 1:
      return S.suspend(() => S.Struct({ status: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "ConfirmCustomerAgreementResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceId: S.String,
          virtualGatewayId: S.optional(S.String),
          directConnectGatewayId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ConfirmPrivateVirtualInterfaceRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ virtualInterfaceState: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ConfirmPrivateVirtualInterfaceResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ virtualInterfaceId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ConfirmPublicVirtualInterfaceRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ virtualInterfaceId: S.String, directConnectGatewayId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ConfirmTransitVirtualInterfaceRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          asn: S.optional(S.Number),
          asnLong: S.optional(S.Number),
          authKey: S.optional(S.String),
          addressFamily: S.optional(S.String),
          amazonAddress: S.optional(S.String),
          customerAddress: S.optional(S.String),
        }),
      ).annotate({ identifier: "NewBGPPeer" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceId: S.optional(S.String),
          newBGPPeer: S.optional(__S(136, __c17, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBGPPeerRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          location: S.String,
          bandwidth: S.String,
          connectionName: S.String,
          lagId: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
          providerName: S.optional(S.String),
          requestMACSec: S.optional(S.Boolean),
          billingMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateConnectionRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayName: S.String,
          tags: S.optional(__S(601, __c75, 1)),
          amazonSideAsn: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDirectConnectGatewayRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayId: S.optional(S.String),
          directConnectGatewayName: S.optional(S.String),
          amazonSideAsn: S.optional(S.Number),
          ownerAccount: S.optional(S.String),
          directConnectGatewayState: S.optional(S.String),
          stateChangeError: S.optional(S.String),
          totalPrefixPoolAllocations: S.optional(S.Number),
          tags: S.optional(__S(601, __c75, 1)),
        }),
      ).annotate({ identifier: "DirectConnectGateway" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ directConnectGateway: S.optional(__S(160, __c20, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateDirectConnectGatewayResult" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayId: S.String,
          gatewayId: S.optional(S.String),
          addAllowedPrefixesToDirectConnectGateway: S.optional(__S(489, __c61, 1)),
          virtualGatewayId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDirectConnectGatewayAssociationRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayId: S.String,
          directConnectGatewayOwnerAccount: S.String,
          gatewayId: S.String,
          addAllowedPrefixesToDirectConnectGateway: S.optional(__S(489, __c61, 1)),
          removeAllowedPrefixesToDirectConnectGateway: S.optional(__S(489, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDirectConnectGatewayAssociationProposalRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ directConnectGatewayAssociationProposal: S.optional(__S(200, __c25, 0)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "CreateDirectConnectGatewayAssociationProposalResult" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          proposalId: S.optional(S.String),
          directConnectGatewayId: S.optional(S.String),
          directConnectGatewayOwnerAccount: S.optional(S.String),
          proposalState: S.optional(S.String),
          associatedGateway: S.optional(__S(464, __c58, 0)),
          existingAllowedPrefixesToDirectConnectGateway: S.optional(__S(489, __c61, 1)),
          requestedAllowedPrefixesToDirectConnectGateway: S.optional(__S(489, __c61, 1)),
        }),
      ).annotate({ identifier: "DirectConnectGatewayAssociationProposal" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          interconnectName: S.String,
          bandwidth: S.String,
          location: S.String,
          lagId: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
          providerName: S.optional(S.String),
          requestMACSec: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateInterconnectRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          interconnectId: S.optional(S.String),
          interconnectName: S.optional(S.String),
          interconnectState: S.optional(S.String),
          region: S.optional(S.String),
          location: S.optional(S.String),
          bandwidth: S.optional(S.String),
          loaIssueTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lagId: S.optional(S.String),
          awsDevice: S.optional(S.String),
          jumboFrameCapable: S.optional(S.Boolean),
          awsDeviceV2: S.optional(S.String),
          awsLogicalDeviceId: S.optional(S.String),
          hasLogicalRedundancy: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
          providerName: S.optional(S.String),
          macSecCapable: S.optional(S.Boolean),
          portEncryptionStatus: S.optional(S.String),
          encryptionMode: S.optional(S.String),
          macSecKeys: S.optional(__S(585, __c73, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "Interconnect" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          numberOfConnections: S.Number,
          location: S.String,
          connectionsBandwidth: S.String,
          lagName: S.String,
          connectionId: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
          childConnectionTags: S.optional(__S(601, __c75, 1)),
          providerName: S.optional(S.String),
          requestMACSec: S.optional(S.Boolean),
          billingMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLagRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(593, __c74, 1));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionsBandwidth: S.optional(S.String),
          numberOfConnections: S.optional(S.Number),
          lagId: S.optional(S.String),
          ownerAccount: S.optional(S.String),
          lagName: S.optional(S.String),
          lagState: S.optional(S.String),
          location: S.optional(S.String),
          region: S.optional(S.String),
          minimumLinks: S.optional(S.Number),
          awsDevice: S.optional(S.String),
          awsDeviceV2: S.optional(S.String),
          awsLogicalDeviceId: S.optional(S.String),
          connections: S.optional(__S(232, __c29, 0)),
          allowsHostedConnections: S.optional(S.Boolean),
          jumboFrameCapable: S.optional(S.Boolean),
          hasLogicalRedundancy: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
          providerName: S.optional(S.String),
          macSecCapable: S.optional(S.Boolean),
          encryptionMode: S.optional(S.String),
          macSecKeys: S.optional(__S(585, __c73, 1)),
          prefixPoolSizeIpv4: S.optional(S.Number),
          prefixPoolSizeIpv6: S.optional(S.Number),
          prefixPoolUnallocatedCountIpv4: S.optional(S.Number),
          prefixPoolUnallocatedCountIpv6: S.optional(S.Number),
          rateLimiterStatus: S.optional(__S(592, __c74, 0)),
          billingMode: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "Lag" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceName: S.String,
          vlan: S.Number,
          asn: S.optional(S.Number),
          asnLong: S.optional(S.Number),
          mtu: S.optional(S.Number),
          authKey: S.optional(S.String),
          amazonAddress: S.optional(S.String),
          customerAddress: S.optional(S.String),
          addressFamily: S.optional(S.String),
          virtualGatewayId: S.optional(S.String),
          directConnectGatewayId: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
          enableSiteLink: S.optional(S.Boolean),
          prefixPoolAllocatedCountIpv4: S.optional(S.Number),
          prefixPoolAllocatedCountIpv6: S.optional(S.Number),
          rateLimit: S.optional(S.String),
        }),
      ).annotate({ identifier: "NewPrivateVirtualInterface" });
    case 1:
      return S.suspend(() =>
        S.Struct({ connectionId: S.String, newPrivateVirtualInterface: __S(248, __c31, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePrivateVirtualInterfaceRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectionId: S.String, newPublicVirtualInterface: __S(808, __c101, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePublicVirtualInterfaceRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resiliencyGroupName: S.String,
          intendedResiliencyModel: S.String,
          clientToken: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateResiliencyGroupRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resiliencyGroupId: S.optional(S.String),
          resiliencyGroupArn: S.optional(S.String),
          resiliencyGroupName: S.optional(S.String),
          resiliencyGroupType: S.optional(S.String),
          ownerAccount: S.optional(S.String),
          state: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
        }),
      ).annotate({ identifier: "ResiliencyGroup" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resiliencyGroup: S.optional(__S(272, __c34, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateResiliencyGroupResult" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceName: S.optional(S.String),
          vlan: S.optional(S.Number),
          asn: S.optional(S.Number),
          asnLong: S.optional(S.Number),
          mtu: S.optional(S.Number),
          authKey: S.optional(S.String),
          amazonAddress: S.optional(S.String),
          customerAddress: S.optional(S.String),
          addressFamily: S.optional(S.String),
          directConnectGatewayId: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
          enableSiteLink: S.optional(S.Boolean),
          prefixPoolAllocatedCountIpv4: S.optional(S.Number),
          prefixPoolAllocatedCountIpv6: S.optional(S.Number),
          rateLimit: S.optional(S.String),
        }),
      ).annotate({ identifier: "NewTransitVirtualInterface" });
    case 1:
      return S.suspend(() =>
        S.Struct({ connectionId: S.String, newTransitVirtualInterface: __S(280, __c35, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTransitVirtualInterfaceRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceId: S.optional(S.String),
          asn: S.optional(S.Number),
          asnLong: S.optional(S.Number),
          customerAddress: S.optional(S.String),
          bgpPeerId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteBGPPeerRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConnectionRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ directConnectGatewayId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDirectConnectGatewayRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          associationId: S.optional(S.String),
          directConnectGatewayId: S.optional(S.String),
          virtualGatewayId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteDirectConnectGatewayAssociationRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ proposalId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDirectConnectGatewayAssociationProposalRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ interconnectId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteInterconnectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ interconnectState: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DeleteInterconnectResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ lagId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLagRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resiliencyGroupId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResiliencyGroupRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ virtualInterfaceId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVirtualInterfaceRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.String,
          providerName: S.optional(S.String),
          loaContentType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConnectionLoaRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ loa: S.optional(__S(376, __c47, 0)) }).pipe(ns)).annotate({
        identifier: "DescribeConnectionLoaResponse",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ loaContent: S.optional(T.Blob), loaContentType: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "Loa" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConnectionsRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connections: S.optional(__S(232, __c29, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "Connections" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ interconnectId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeConnectionsOnInterconnectRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCustomerMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ agreementName: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "CustomerAgreement" });
    case 2:
      return S.Array(__S(409, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          agreements: S.optional(__S(410, __c51, 2)),
          nniPartnerType: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeCustomerMetadataResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayId: S.optional(S.String),
          proposalId: S.optional(S.String),
          associatedGatewayId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDirectConnectGatewayAssociationProposalsRequest" });
    case 1:
      return S.Array(__S(200, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayAssociationProposals: S.optional(__S(417, __c52, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDirectConnectGatewayAssociationProposalsResult" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          associationId: S.optional(S.String),
          associatedGatewayId: S.optional(S.String),
          directConnectGatewayId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          virtualGatewayId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDirectConnectGatewayAssociationsRequest" });
    case 1:
      return S.Array(__S(473, __c59, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayAssociations: S.optional(__S(425, __c53, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDirectConnectGatewayAssociationsResult" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayId: S.optional(S.String),
          virtualInterfaceId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDirectConnectGatewayAttachmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayId: S.optional(S.String),
          virtualInterfaceId: S.optional(S.String),
          virtualInterfaceRegion: S.optional(S.String),
          virtualInterfaceOwnerAccount: S.optional(S.String),
          attachmentState: S.optional(S.String),
          attachmentType: S.optional(S.String),
          stateChangeError: S.optional(S.String),
        }),
      ).annotate({ identifier: "DirectConnectGatewayAttachment" });
    case 2:
      return S.Array(__S(433, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayAttachments: S.optional(__S(434, __c54, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDirectConnectGatewayAttachmentsResult" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDirectConnectGatewaysRequest" });
    case 1:
      return S.Array(__S(160, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          directConnectGateways: S.optional(__S(441, __c55, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDirectConnectGatewaysResult" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeHostedConnectionsRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayId: S.String,
          proposalId: S.String,
          associatedGatewayOwnerAccount: S.String,
          overrideAllowedPrefixesToDirectConnectGateway: S.optional(__S(489, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AcceptDirectConnectGatewayAssociationProposalRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          type: S.optional(S.String),
          ownerAccount: S.optional(S.String),
          region: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociatedGateway" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          ownerAccount: S.optional(S.String),
          attachmentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociatedCoreNetwork" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          directConnectGatewayId: S.optional(S.String),
          directConnectGatewayOwnerAccount: S.optional(S.String),
          associationState: S.optional(S.String),
          stateChangeError: S.optional(S.String),
          associatedGateway: S.optional(__S(464, __c58, 0)),
          associationId: S.optional(S.String),
          allowedPrefixesToDirectConnectGateway: S.optional(__S(489, __c61, 1)),
          associatedCoreNetwork: S.optional(__S(472, __c59, 0)),
          virtualGatewayId: S.optional(S.String),
          virtualGatewayRegion: S.optional(S.String),
          virtualGatewayOwnerAccount: S.optional(S.String),
        }),
      ).annotate({ identifier: "DirectConnectGatewayAssociation" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ directConnectGatewayAssociation: S.optional(__S(473, __c59, 1)) }).pipe(ns),
      ).annotate({ identifier: "AcceptDirectConnectGatewayAssociationProposalResult" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ cidr: S.optional(S.String) })).annotate({
        identifier: "RouteFilterPrefix",
      });
    case 1:
      return S.Array(__S(488, __c61, 0));
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          interconnectId: S.String,
          providerName: S.optional(S.String),
          loaContentType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInterconnectLoaRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          interconnectId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInterconnectsRequest" });
    case 1:
      return S.Array(__S(216, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          interconnects: S.optional(__S(505, __c63, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "Interconnects" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lagId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeLagsRequest" });
    case 1:
      return S.Array(__S(240, __c30, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ lags: S.optional(__S(513, __c64, 1)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "Lags" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.String,
          providerName: S.optional(S.String),
          loaContentType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeLoaRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          billingMode: S.optional(S.String),
          availablePortSpeeds: S.optional(__S(24, __c3, 0)),
          includedRegions: S.optional(__S(24, __c3, 0)),
        }),
      ).annotate({ identifier: "AvailableBillingMode" });
    case 2:
      return S.Array(__S(529, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          locationCode: S.optional(S.String),
          locationName: S.optional(S.String),
          region: S.optional(S.String),
          availablePortSpeeds: S.optional(__S(24, __c3, 0)),
          availableProviders: S.optional(__S(24, __c3, 0)),
          availableMacSecPortSpeeds: S.optional(__S(24, __c3, 0)),
          availableBillingModes: S.optional(__S(530, __c66, 2)),
        }),
      ).annotate({ identifier: "Location" });
    case 4:
      return S.Array(__S(531, __c66, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ locations: S.optional(__S(532, __c66, 4)) }).pipe(ns),
      ).annotate({ identifier: "Locations" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ virtualInterfaceId: S.String, routerTypeIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRouterConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vendor: S.optional(S.String),
          platform: S.optional(S.String),
          software: S.optional(S.String),
          xsltTemplateName: S.optional(S.String),
          xsltTemplateNameForMacSec: S.optional(S.String),
          routerTypeIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "RouterType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          customerRouterConfig: S.optional(S.String),
          router: S.optional(__S(537, __c67, 1)),
          virtualInterfaceId: S.optional(S.String),
          virtualInterfaceName: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeRouterConfigurationResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArns: __S(24, __c3, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.optional(S.String), tags: S.optional(__S(601, __c75, 1)) }),
      ).annotate({ identifier: "ResourceTag" });
    case 2:
      return S.Array(__S(545, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ resourceTags: S.optional(__S(546, __c68, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeTagsResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeVirtualGatewaysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          virtualGatewayId: S.optional(S.String),
          virtualGatewayState: S.optional(S.String),
        }),
      ).annotate({ identifier: "VirtualGateway" });
    case 2:
      return S.Array(__S(553, __c69, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ virtualGateways: S.optional(__S(554, __c69, 2)) }).pipe(ns),
      ).annotate({ identifier: "VirtualGateways" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.optional(S.String),
          virtualInterfaceId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeVirtualInterfacesRequest" });
    case 1:
      return S.Array(__S(794, __c99, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaces: S.optional(__S(561, __c70, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "VirtualInterfaces" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectionId: S.String, lagId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateConnectionFromLagRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bandwidth: S.String,
          connectionName: S.String,
          ownerAccount: S.String,
          interconnectId: S.String,
          vlan: S.Number,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AllocateConnectionOnInterconnectRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          secretARN: S.optional(S.String),
          ckn: S.optional(S.String),
          state: S.optional(S.String),
          startOn: S.optional(S.String),
        }),
      ).annotate({ identifier: "MacSecKey" });
    case 1:
      return S.Array(__S(584, __c73, 0));
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxAllowed: S.optional(S.Number),
          inUse: S.optional(S.Number),
          remaining: S.optional(S.Number),
          totalBandwidth: S.optional(S.String),
        }),
      ).annotate({ identifier: "RateLimiterStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ownerAccount: S.optional(S.String),
          connectionId: S.optional(S.String),
          connectionName: S.optional(S.String),
          connectionState: S.optional(S.String),
          region: S.optional(S.String),
          location: S.optional(S.String),
          bandwidth: S.optional(S.String),
          vlan: S.optional(S.Number),
          partnerName: S.optional(S.String),
          loaIssueTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lagId: S.optional(S.String),
          awsDevice: S.optional(S.String),
          jumboFrameCapable: S.optional(S.Boolean),
          awsDeviceV2: S.optional(S.String),
          awsLogicalDeviceId: S.optional(S.String),
          hasLogicalRedundancy: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
          providerName: S.optional(S.String),
          macSecCapable: S.optional(S.Boolean),
          portEncryptionStatus: S.optional(S.String),
          encryptionMode: S.optional(S.String),
          macSecKeys: S.optional(__S(585, __c73, 1)),
          rateLimiterStatus: S.optional(__S(592, __c74, 0)),
          partnerInterconnectMacSecCapable: S.optional(S.Boolean),
          prefixPoolSizeIpv4: S.optional(S.Number),
          prefixPoolSizeIpv6: S.optional(S.Number),
          prefixPoolUnallocatedCountIpv4: S.optional(S.Number),
          prefixPoolUnallocatedCountIpv6: S.optional(S.Number),
          billingMode: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "Connection" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(600, __c75, 0));
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionIdentifiers: __S(24, __c3, 0),
          resiliencyGroupId: S.String,
          clientToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateConnectionsFromResiliencyGroupRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectionId: S.String, secretARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateMacSecKeyRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resiliencyGroupId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResiliencyGroupRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resiliencyGroupId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResiliencyGroupAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(41, __c5, 1)), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListResiliencyGroupAssociationsResult" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListResiliencyGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resiliencyGroupId: S.optional(S.String),
          resiliencyGroupArn: S.optional(S.String),
          resiliencyGroupName: S.optional(S.String),
          resiliencyGroupType: S.optional(S.String),
          ownerAccount: S.optional(S.String),
          state: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResiliencyGroupSummary" });
    case 2:
      return S.Array(__S(641, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(642, __c80, 2)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListResiliencyGroupsResult" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          routeDirection: S.optional(S.String),
          addressFamily: S.optional(S.String),
          cidrs: S.optional(__S(24, __c3, 0)),
          asPath: S.optional(__S(648, __c81, 0)),
          communities: S.optional(__S(24, __c3, 0)),
        }),
      ).annotate({ identifier: "RouteFilters" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceId: S.optional(S.String),
          filters: S.optional(__S(649, __c81, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListVirtualInterfaceRoutesRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ pathType: S.optional(S.String), path: S.optional(__S(648, __c81, 0)) }),
      ).annotate({ identifier: "AsPathSegment" });
    case 4:
      return S.Array(__S(651, __c81, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          cidr: S.optional(S.String),
          routeDirection: S.optional(S.String),
          addressFamily: S.optional(S.String),
          asPath: S.optional(__S(652, __c81, 4)),
          communities: S.optional(__S(24, __c3, 0)),
          awsLogicalDeviceId: S.optional(S.String),
          routeInstalledAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Route" });
    case 6:
      return S.Array(__S(653, __c81, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceId: S.optional(S.String),
          routes: S.optional(__S(654, __c81, 6)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListVirtualInterfaceRoutesResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testId: S.optional(S.String),
          virtualInterfaceId: S.optional(S.String),
          bgpPeers: S.optional(__S(24, __c3, 0)),
          status: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListVirtualInterfaceTestHistoryRequest" });
    case 1:
      return S.Array(__S(664, __c83, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceTestHistory: S.optional(__S(657, __c82, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListVirtualInterfaceTestHistoryResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testId: S.optional(S.String),
          virtualInterfaceId: S.optional(S.String),
          bgpPeers: S.optional(__S(24, __c3, 0)),
          status: S.optional(S.String),
          ownerAccount: S.optional(S.String),
          testDurationInMinutes: S.optional(S.Number),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "VirtualInterfaceTestHistory" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceId: S.String,
          bgpPeers: S.optional(__S(24, __c3, 0)),
          testDurationInMinutes: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartBgpFailoverTestRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ virtualInterfaceTest: S.optional(__S(664, __c83, 0)) }).pipe(ns),
      ).annotate({ identifier: "StartBgpFailoverTestResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ virtualInterfaceId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopBgpFailoverTestRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(601, __c75, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.String,
          ownerAccount: S.String,
          bandwidth: S.String,
          connectionName: S.String,
          vlan: S.Number,
          tags: S.optional(__S(601, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AllocateHostedConnectionRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(24, __c3, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.String,
          connectionName: S.optional(S.String),
          encryptionMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateConnectionRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectionIds: __S(24, __c3, 0), billingMode: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateConnectionsBillingModeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          billingMode: S.optional(S.String),
          connections: S.optional(__S(232, __c29, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateConnectionsBillingModeResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ directConnectGatewayId: S.String, newDirectConnectGatewayName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDirectConnectGatewayRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          associationId: S.optional(S.String),
          addAllowedPrefixesToDirectConnectGateway: S.optional(__S(489, __c61, 1)),
          removeAllowedPrefixesToDirectConnectGateway: S.optional(__S(489, __c61, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDirectConnectGatewayAssociationRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lagId: S.String,
          lagName: S.optional(S.String),
          minimumLinks: S.optional(S.Number),
          encryptionMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLagRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resiliencyGroupId: S.String,
          resiliencyGroupName: S.String,
          clientToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateResiliencyGroupRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceId: S.String,
          mtu: S.optional(S.Number),
          enableSiteLink: S.optional(S.Boolean),
          virtualInterfaceName: S.optional(S.String),
          prefixPoolAllocatedCountIpv4: S.optional(S.Number),
          prefixPoolAllocatedCountIpv6: S.optional(S.Number),
          rateLimit: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateVirtualInterfaceAttributesRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceName: S.String,
          vlan: S.Number,
          asn: S.optional(S.Number),
          asnLong: S.optional(S.Number),
          mtu: S.optional(S.Number),
          authKey: S.optional(S.String),
          amazonAddress: S.optional(S.String),
          addressFamily: S.optional(S.String),
          customerAddress: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
          rateLimit: S.optional(S.String),
        }),
      ).annotate({ identifier: "NewPrivateVirtualInterfaceAllocation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.String,
          ownerAccount: S.String,
          newPrivateVirtualInterfaceAllocation: __S(784, __c98, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AllocatePrivateVirtualInterfaceRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bgpPeerId: S.optional(S.String),
          asn: S.optional(S.Number),
          asnLong: S.optional(S.Number),
          authKey: S.optional(S.String),
          addressFamily: S.optional(S.String),
          amazonAddress: S.optional(S.String),
          customerAddress: S.optional(S.String),
          bgpPeerState: S.optional(S.String),
          bgpStatus: S.optional(S.String),
          awsDeviceV2: S.optional(S.String),
          awsLogicalDeviceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "BGPPeer" });
    case 1:
      return S.Array(__S(792, __c99, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ownerAccount: S.optional(S.String),
          virtualInterfaceId: S.optional(S.String),
          location: S.optional(S.String),
          connectionId: S.optional(S.String),
          virtualInterfaceType: S.optional(S.String),
          virtualInterfaceName: S.optional(S.String),
          vlan: S.optional(S.Number),
          asn: S.optional(S.Number),
          asnLong: S.optional(S.Number),
          amazonSideAsn: S.optional(S.Number),
          authKey: S.optional(S.String),
          amazonAddress: S.optional(S.String),
          customerAddress: S.optional(S.String),
          addressFamily: S.optional(S.String),
          virtualInterfaceState: S.optional(S.String),
          customerRouterConfig: S.optional(S.String),
          mtu: S.optional(S.Number),
          jumboFrameCapable: S.optional(S.Boolean),
          virtualGatewayId: S.optional(S.String),
          directConnectGatewayId: S.optional(S.String),
          routeFilterPrefixes: S.optional(__S(489, __c61, 1)),
          bgpPeers: S.optional(__S(793, __c99, 1)),
          region: S.optional(S.String),
          awsDeviceV2: S.optional(S.String),
          awsLogicalDeviceId: S.optional(S.String),
          tags: S.optional(__S(601, __c75, 1)),
          siteLinkEnabled: S.optional(S.Boolean),
          prefixPoolAllocatedCountIpv4: S.optional(S.Number),
          prefixPoolAllocatedCountIpv6: S.optional(S.Number),
          rateLimit: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "VirtualInterface" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.String,
          ownerAccount: S.String,
          newPublicVirtualInterfaceAllocation: __S(808, __c101, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AllocatePublicVirtualInterfaceRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualInterfaceName: S.String,
          vlan: S.Number,
          asn: S.optional(S.Number),
          asnLong: S.optional(S.Number),
          authKey: S.optional(S.String),
          amazonAddress: S.optional(S.String),
          customerAddress: S.optional(S.String),
          addressFamily: S.optional(S.String),
          routeFilterPrefixes: S.optional(__S(489, __c61, 1)),
          tags: S.optional(__S(601, __c75, 1)),
          rateLimit: S.optional(S.String),
        }),
      ).annotate({ identifier: "NewPublicVirtualInterfaceAllocation" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
