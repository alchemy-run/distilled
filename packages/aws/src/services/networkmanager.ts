import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "NetworkManager",
  target: "NetworkManager",
  version: "2019-07-05",
  sigv4: "networkmanager",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "us-west-2" }],
    });
    const _p1 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "us-gov-west-1" }],
    });
    const _p2 = (_0: unknown) => ({
      authSchemes: [
        {
          name: "sigv4",
          signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
        },
      ],
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://networkmanager.us-west-2.amazonaws.com",
              _p0(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://networkmanager.us-west-2.api.aws", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              "https://networkmanager-fips.us-west-2.amazonaws.com",
              _p0(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              "https://networkmanager-fips.us-west-2.api.aws",
              _p0(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              "https://networkmanager.us-gov-west-1.amazonaws.com",
              _p1(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://networkmanager.us-gov-west-1.api.aws", _p1(), {});
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://networkmanager-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p2(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://networkmanager-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p2(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://networkmanager.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p2(PartitionResult),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://networkmanager.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p2(PartitionResult),
            {},
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class CoreNetworkPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "CoreNetworkPolicyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string; readonly Errors?: CoreNetworkPolicyError[] }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly RetryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
    readonly Context?: { [key: string]: string | undefined };
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
    readonly LimitCode: string;
    readonly ServiceCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly RetryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason?: ValidationExceptionReason;
    readonly Fields?: ValidationExceptionField[];
  }> {}
export type AttachmentId = string;
export interface AcceptAttachmentRequest {
  AttachmentId: string;
}
export type CoreNetworkId = string;
export type CoreNetworkArn = string;
export type AWSAccountId = string;
export type AttachmentType =
  | "CONNECT"
  | "SITE_TO_SITE_VPN"
  | "VPC"
  | "DIRECT_CONNECT_GATEWAY"
  | "TRANSIT_GATEWAY_ROUTE_TABLE"
  | (string & {});
export type AttachmentState =
  | "REJECTED"
  | "PENDING_ATTACHMENT_ACCEPTANCE"
  | "CREATING"
  | "FAILED"
  | "AVAILABLE"
  | "UPDATING"
  | "PENDING_NETWORK_UPDATE"
  | "PENDING_TAG_ACCEPTANCE"
  | "DELETING"
  | (string & {});
export type ExternalRegionCode = string;
export type ExternalRegionCodeList = string[];
export type ResourceArn = string;
export type ConstrainedString = string;
export type NetworkFunctionGroupName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface ProposedSegmentChange {
  Tags?: Tag[];
  AttachmentPolicyRuleNumber?: number;
  SegmentName?: string;
}
export interface ProposedNetworkFunctionGroupChange {
  Tags?: Tag[];
  AttachmentPolicyRuleNumber?: number;
  NetworkFunctionGroupName?: string;
}
export type AttachmentErrorCode =
  | "VPC_NOT_FOUND"
  | "SUBNET_NOT_FOUND"
  | "SUBNET_DUPLICATED_IN_AVAILABILITY_ZONE"
  | "SUBNET_NO_FREE_ADDRESSES"
  | "SUBNET_UNSUPPORTED_AVAILABILITY_ZONE"
  | "SUBNET_NO_IPV6_CIDRS"
  | "VPN_CONNECTION_NOT_FOUND"
  | "MAXIMUM_NO_ENCAP_LIMIT_EXCEEDED"
  | "DIRECT_CONNECT_GATEWAY_NOT_FOUND"
  | "DIRECT_CONNECT_GATEWAY_EXISTING_ATTACHMENTS"
  | "DIRECT_CONNECT_GATEWAY_NO_PRIVATE_VIF"
  | "VPN_EXISTING_ASSOCIATIONS"
  | "VPC_UNSUPPORTED_FEATURES"
  | (string & {});
export type ServerSideString = string;
export interface AttachmentError {
  Code?: AttachmentErrorCode;
  Message?: string;
  ResourceArn?: string;
  RequestId?: string;
}
export type AttachmentErrorList = AttachmentError[];
export interface Attachment {
  CoreNetworkId?: string;
  CoreNetworkArn?: string;
  AttachmentId?: string;
  OwnerAccountId?: string;
  AttachmentType?: AttachmentType;
  State?: AttachmentState;
  EdgeLocation?: string;
  EdgeLocations?: string[];
  ResourceArn?: string;
  AttachmentPolicyRuleNumber?: number;
  SegmentName?: string;
  NetworkFunctionGroupName?: string;
  Tags?: Tag[];
  ProposedSegmentChange?: ProposedSegmentChange;
  ProposedNetworkFunctionGroupChange?: ProposedNetworkFunctionGroupChange;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  LastModificationErrors?: AttachmentError[];
}
export interface AcceptAttachmentResponse {
  Attachment?: Attachment;
}
export type GlobalNetworkId = string;
export type ConnectPeerId = string;
export type DeviceId = string;
export type LinkId = string;
export interface AssociateConnectPeerRequest {
  GlobalNetworkId: string;
  ConnectPeerId: string;
  DeviceId: string;
  LinkId?: string;
}
export type ConnectPeerAssociationState =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface ConnectPeerAssociation {
  ConnectPeerId?: string;
  GlobalNetworkId?: string;
  DeviceId?: string;
  LinkId?: string;
  State?: ConnectPeerAssociationState;
}
export interface AssociateConnectPeerResponse {
  ConnectPeerAssociation?: ConnectPeerAssociation;
}
export type CustomerGatewayArn = string;
export interface AssociateCustomerGatewayRequest {
  CustomerGatewayArn: string;
  GlobalNetworkId: string;
  DeviceId: string;
  LinkId?: string;
}
export type CustomerGatewayAssociationState =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface CustomerGatewayAssociation {
  CustomerGatewayArn?: string;
  GlobalNetworkId?: string;
  DeviceId?: string;
  LinkId?: string;
  State?: CustomerGatewayAssociationState;
}
export interface AssociateCustomerGatewayResponse {
  CustomerGatewayAssociation?: CustomerGatewayAssociation;
}
export interface AssociateLinkRequest {
  GlobalNetworkId: string;
  DeviceId: string;
  LinkId: string;
}
export type LinkAssociationState =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface LinkAssociation {
  GlobalNetworkId?: string;
  DeviceId?: string;
  LinkId?: string;
  LinkAssociationState?: LinkAssociationState;
}
export interface AssociateLinkResponse {
  LinkAssociation?: LinkAssociation;
}
export type TransitGatewayConnectPeerArn = string;
export interface AssociateTransitGatewayConnectPeerRequest {
  GlobalNetworkId: string;
  TransitGatewayConnectPeerArn: string;
  DeviceId: string;
  LinkId?: string;
}
export type TransitGatewayConnectPeerAssociationState =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface TransitGatewayConnectPeerAssociation {
  TransitGatewayConnectPeerArn?: string;
  GlobalNetworkId?: string;
  DeviceId?: string;
  LinkId?: string;
  State?: TransitGatewayConnectPeerAssociationState;
}
export interface AssociateTransitGatewayConnectPeerResponse {
  TransitGatewayConnectPeerAssociation?: TransitGatewayConnectPeerAssociation;
}
export type TunnelProtocol = "GRE" | "NO_ENCAP" | (string & {});
export interface ConnectAttachmentOptions {
  Protocol?: TunnelProtocol;
}
export type ClientToken = string;
export interface CreateConnectAttachmentRequest {
  CoreNetworkId: string;
  EdgeLocation: string;
  TransportAttachmentId: string;
  RoutingPolicyLabel?: string;
  Options: ConnectAttachmentOptions;
  Tags?: Tag[];
  ClientToken?: string;
}
export interface ConnectAttachment {
  Attachment?: Attachment;
  TransportAttachmentId?: string;
  Options?: ConnectAttachmentOptions;
}
export interface CreateConnectAttachmentResponse {
  ConnectAttachment?: ConnectAttachment;
}
export interface CreateConnectionRequest {
  GlobalNetworkId: string;
  DeviceId: string;
  ConnectedDeviceId: string;
  LinkId?: string;
  ConnectedLinkId?: string;
  Description?: string;
  Tags?: Tag[];
}
export type ConnectionId = string;
export type ConnectionArn = string;
export type ConnectionState =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export interface Connection {
  ConnectionId?: string;
  ConnectionArn?: string;
  GlobalNetworkId?: string;
  DeviceId?: string;
  ConnectedDeviceId?: string;
  LinkId?: string;
  ConnectedLinkId?: string;
  Description?: string;
  CreatedAt?: Date;
  State?: ConnectionState;
  Tags?: Tag[];
}
export interface CreateConnectionResponse {
  Connection?: Connection;
}
export type IPAddress = string;
export interface BgpOptions {
  PeerAsn?: number;
}
export type ConstrainedStringList = string[];
export type SubnetArn = string;
export interface CreateConnectPeerRequest {
  ConnectAttachmentId: string;
  CoreNetworkAddress?: string;
  PeerAddress: string;
  BgpOptions?: BgpOptions;
  InsideCidrBlocks?: string[];
  Tags?: Tag[];
  ClientToken?: string;
  SubnetArn?: string;
}
export type ConnectPeerState =
  | "CREATING"
  | "FAILED"
  | "AVAILABLE"
  | "DELETING"
  | (string & {});
export interface ConnectPeerBgpConfiguration {
  CoreNetworkAsn?: number;
  PeerAsn?: number;
  CoreNetworkAddress?: string;
  PeerAddress?: string;
}
export type ConnectPeerBgpConfigurationList = ConnectPeerBgpConfiguration[];
export interface ConnectPeerConfiguration {
  CoreNetworkAddress?: string;
  PeerAddress?: string;
  InsideCidrBlocks?: string[];
  Protocol?: TunnelProtocol;
  BgpConfigurations?: ConnectPeerBgpConfiguration[];
}
export type ConnectPeerErrorCode =
  | "EDGE_LOCATION_NO_FREE_IPS"
  | "EDGE_LOCATION_PEER_DUPLICATE"
  | "SUBNET_NOT_FOUND"
  | "IP_OUTSIDE_SUBNET_CIDR_RANGE"
  | "INVALID_INSIDE_CIDR_BLOCK"
  | "NO_ASSOCIATED_CIDR_BLOCK"
  | (string & {});
export interface ConnectPeerError {
  Code?: ConnectPeerErrorCode;
  Message?: string;
  ResourceArn?: string;
  RequestId?: string;
}
export type ConnectPeerErrorList = ConnectPeerError[];
export interface ConnectPeer {
  CoreNetworkId?: string;
  ConnectAttachmentId?: string;
  ConnectPeerId?: string;
  EdgeLocation?: string;
  State?: ConnectPeerState;
  CreatedAt?: Date;
  Configuration?: ConnectPeerConfiguration;
  Tags?: Tag[];
  SubnetArn?: string;
  LastModificationErrors?: ConnectPeerError[];
}
export interface CreateConnectPeerResponse {
  ConnectPeer?: ConnectPeer;
}
export type CoreNetworkPolicyDocument = string;
export interface CreateCoreNetworkRequest {
  GlobalNetworkId: string;
  Description?: string;
  Tags?: Tag[];
  PolicyDocument?: string;
  ClientToken?: string;
}
export type CoreNetworkState =
  | "CREATING"
  | "UPDATING"
  | "AVAILABLE"
  | "DELETING"
  | (string & {});
export interface CoreNetworkSegment {
  Name?: string;
  EdgeLocations?: string[];
  SharedSegments?: string[];
}
export type CoreNetworkSegmentList = CoreNetworkSegment[];
export interface ServiceInsertionSegments {
  SendVia?: string[];
  SendTo?: string[];
}
export interface CoreNetworkNetworkFunctionGroup {
  Name?: string;
  EdgeLocations?: string[];
  Segments?: ServiceInsertionSegments;
}
export type CoreNetworkNetworkFunctionGroupList =
  CoreNetworkNetworkFunctionGroup[];
export interface CoreNetworkEdge {
  EdgeLocation?: string;
  Asn?: number;
  InsideCidrBlocks?: string[];
}
export type CoreNetworkEdgeList = CoreNetworkEdge[];
export interface CoreNetwork {
  GlobalNetworkId?: string;
  CoreNetworkId?: string;
  CoreNetworkArn?: string;
  Description?: string;
  CreatedAt?: Date;
  State?: CoreNetworkState;
  Segments?: CoreNetworkSegment[];
  NetworkFunctionGroups?: CoreNetworkNetworkFunctionGroup[];
  Edges?: CoreNetworkEdge[];
  Tags?: Tag[];
}
export interface CreateCoreNetworkResponse {
  CoreNetwork?: CoreNetwork;
}
export type PrefixListArn = string;
export interface CreateCoreNetworkPrefixListAssociationRequest {
  CoreNetworkId: string;
  PrefixListArn: string;
  PrefixListAlias: string;
  ClientToken?: string;
}
export interface CreateCoreNetworkPrefixListAssociationResponse {
  CoreNetworkId?: string;
  PrefixListArn?: string;
  PrefixListAlias?: string;
}
export interface AWSLocation {
  Zone?: string;
  SubnetArn?: string;
}
export interface Location {
  Address?: string;
  Latitude?: string;
  Longitude?: string;
}
export type SiteId = string;
export interface CreateDeviceRequest {
  GlobalNetworkId: string;
  AWSLocation?: AWSLocation;
  Description?: string;
  Type?: string;
  Vendor?: string;
  Model?: string;
  SerialNumber?: string;
  Location?: Location;
  SiteId?: string;
  Tags?: Tag[];
}
export type DeviceArn = string;
export type DeviceState =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export interface Device {
  DeviceId?: string;
  DeviceArn?: string;
  GlobalNetworkId?: string;
  AWSLocation?: AWSLocation;
  Description?: string;
  Type?: string;
  Vendor?: string;
  Model?: string;
  SerialNumber?: string;
  Location?: Location;
  SiteId?: string;
  CreatedAt?: Date;
  State?: DeviceState;
  Tags?: Tag[];
}
export interface CreateDeviceResponse {
  Device?: Device;
}
export type DirectConnectGatewayArn = string;
export interface CreateDirectConnectGatewayAttachmentRequest {
  CoreNetworkId: string;
  DirectConnectGatewayArn: string;
  RoutingPolicyLabel?: string;
  EdgeLocations: string[];
  Tags?: Tag[];
  ClientToken?: string;
}
export interface DirectConnectGatewayAttachment {
  Attachment?: Attachment;
  DirectConnectGatewayArn?: string;
}
export interface CreateDirectConnectGatewayAttachmentResponse {
  DirectConnectGatewayAttachment?: DirectConnectGatewayAttachment;
}
export interface CreateGlobalNetworkRequest {
  Description?: string;
  Tags?: Tag[];
}
export type GlobalNetworkArn = string;
export type GlobalNetworkState =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export interface GlobalNetwork {
  GlobalNetworkId?: string;
  GlobalNetworkArn?: string;
  Description?: string;
  CreatedAt?: Date;
  State?: GlobalNetworkState;
  Tags?: Tag[];
}
export interface CreateGlobalNetworkResponse {
  GlobalNetwork?: GlobalNetwork;
}
export interface Bandwidth {
  UploadSpeed?: number;
  DownloadSpeed?: number;
}
export interface CreateLinkRequest {
  GlobalNetworkId: string;
  Description?: string;
  Type?: string;
  Bandwidth: Bandwidth;
  Provider?: string;
  SiteId: string;
  Tags?: Tag[];
}
export type LinkArn = string;
export type LinkState =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export interface Link {
  LinkId?: string;
  LinkArn?: string;
  GlobalNetworkId?: string;
  SiteId?: string;
  Description?: string;
  Type?: string;
  Bandwidth?: Bandwidth;
  Provider?: string;
  CreatedAt?: Date;
  State?: LinkState;
  Tags?: Tag[];
}
export interface CreateLinkResponse {
  Link?: Link;
}
export interface CreateSiteRequest {
  GlobalNetworkId: string;
  Description?: string;
  Location?: Location;
  Tags?: Tag[];
}
export type SiteArn = string;
export type SiteState =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export interface Site {
  SiteId?: string;
  SiteArn?: string;
  GlobalNetworkId?: string;
  Description?: string;
  Location?: Location;
  CreatedAt?: Date;
  State?: SiteState;
  Tags?: Tag[];
}
export interface CreateSiteResponse {
  Site?: Site;
}
export type VpnConnectionArn = string;
export interface CreateSiteToSiteVpnAttachmentRequest {
  CoreNetworkId: string;
  VpnConnectionArn: string;
  RoutingPolicyLabel?: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export interface SiteToSiteVpnAttachment {
  Attachment?: Attachment;
  VpnConnectionArn?: string;
}
export interface CreateSiteToSiteVpnAttachmentResponse {
  SiteToSiteVpnAttachment?: SiteToSiteVpnAttachment;
}
export type TransitGatewayArn = string;
export interface CreateTransitGatewayPeeringRequest {
  CoreNetworkId: string;
  TransitGatewayArn: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export type PeeringId = string;
export type PeeringType = "TRANSIT_GATEWAY" | (string & {});
export type PeeringState =
  | "CREATING"
  | "FAILED"
  | "AVAILABLE"
  | "DELETING"
  | (string & {});
export type PeeringErrorCode =
  | "TRANSIT_GATEWAY_NOT_FOUND"
  | "TRANSIT_GATEWAY_PEERS_LIMIT_EXCEEDED"
  | "MISSING_PERMISSIONS"
  | "INTERNAL_ERROR"
  | "EDGE_LOCATION_PEER_DUPLICATE"
  | "INVALID_TRANSIT_GATEWAY_STATE"
  | (string & {});
export interface PermissionsErrorContext {
  MissingPermission?: string;
}
export interface PeeringError {
  Code?: PeeringErrorCode;
  Message?: string;
  ResourceArn?: string;
  RequestId?: string;
  MissingPermissionsContext?: PermissionsErrorContext;
}
export type PeeringErrorList = PeeringError[];
export interface Peering {
  CoreNetworkId?: string;
  CoreNetworkArn?: string;
  PeeringId?: string;
  OwnerAccountId?: string;
  PeeringType?: PeeringType;
  State?: PeeringState;
  EdgeLocation?: string;
  ResourceArn?: string;
  Tags?: Tag[];
  CreatedAt?: Date;
  LastModificationErrors?: PeeringError[];
}
export type TransitGatewayPeeringAttachmentId = string;
export interface TransitGatewayPeering {
  Peering?: Peering;
  TransitGatewayArn?: string;
  TransitGatewayPeeringAttachmentId?: string;
}
export interface CreateTransitGatewayPeeringResponse {
  TransitGatewayPeering?: TransitGatewayPeering;
}
export type TransitGatewayRouteTableArn = string;
export interface CreateTransitGatewayRouteTableAttachmentRequest {
  PeeringId: string;
  TransitGatewayRouteTableArn: string;
  RoutingPolicyLabel?: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export interface TransitGatewayRouteTableAttachment {
  Attachment?: Attachment;
  PeeringId?: string;
  TransitGatewayRouteTableArn?: string;
}
export interface CreateTransitGatewayRouteTableAttachmentResponse {
  TransitGatewayRouteTableAttachment?: TransitGatewayRouteTableAttachment;
}
export type VpcArn = string;
export type SubnetArnList = string[];
export interface VpcOptions {
  Ipv6Support?: boolean;
  ApplianceModeSupport?: boolean;
  DnsSupport?: boolean;
  SecurityGroupReferencingSupport?: boolean;
}
export interface CreateVpcAttachmentRequest {
  CoreNetworkId: string;
  VpcArn: string;
  SubnetArns: string[];
  Options?: VpcOptions;
  RoutingPolicyLabel?: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export interface VpcAttachment {
  Attachment?: Attachment;
  SubnetArns?: string[];
  Options?: VpcOptions;
}
export interface CreateVpcAttachmentResponse {
  VpcAttachment?: VpcAttachment;
}
export interface DeleteAttachmentRequest {
  AttachmentId: string;
}
export interface DeleteAttachmentResponse {
  Attachment?: Attachment;
}
export interface DeleteConnectionRequest {
  GlobalNetworkId: string;
  ConnectionId: string;
}
export interface DeleteConnectionResponse {
  Connection?: Connection;
}
export interface DeleteConnectPeerRequest {
  ConnectPeerId: string;
}
export interface DeleteConnectPeerResponse {
  ConnectPeer?: ConnectPeer;
}
export interface DeleteCoreNetworkRequest {
  CoreNetworkId: string;
}
export interface DeleteCoreNetworkResponse {
  CoreNetwork?: CoreNetwork;
}
export interface DeleteCoreNetworkPolicyVersionRequest {
  CoreNetworkId: string;
  PolicyVersionId: number;
}
export type CoreNetworkPolicyAlias = "LIVE" | "LATEST" | (string & {});
export type ChangeSetState =
  | "PENDING_GENERATION"
  | "FAILED_GENERATION"
  | "READY_TO_EXECUTE"
  | "EXECUTING"
  | "EXECUTION_SUCCEEDED"
  | "OUT_OF_DATE"
  | (string & {});
export interface CoreNetworkPolicyError {
  ErrorCode: string;
  Message: string;
  Path?: string;
}
export type CoreNetworkPolicyErrorList = CoreNetworkPolicyError[];
export type SynthesizedJsonCoreNetworkPolicyDocument = string;
export interface CoreNetworkPolicy {
  CoreNetworkId?: string;
  PolicyVersionId?: number;
  Alias?: CoreNetworkPolicyAlias;
  Description?: string;
  CreatedAt?: Date;
  ChangeSetState?: ChangeSetState;
  PolicyErrors?: CoreNetworkPolicyError[];
  PolicyDocument?: string;
}
export interface DeleteCoreNetworkPolicyVersionResponse {
  CoreNetworkPolicy?: CoreNetworkPolicy;
}
export interface DeleteCoreNetworkPrefixListAssociationRequest {
  CoreNetworkId: string;
  PrefixListArn: string;
}
export interface DeleteCoreNetworkPrefixListAssociationResponse {
  CoreNetworkId?: string;
  PrefixListArn?: string;
}
export interface DeleteDeviceRequest {
  GlobalNetworkId: string;
  DeviceId: string;
}
export interface DeleteDeviceResponse {
  Device?: Device;
}
export interface DeleteGlobalNetworkRequest {
  GlobalNetworkId: string;
}
export interface DeleteGlobalNetworkResponse {
  GlobalNetwork?: GlobalNetwork;
}
export interface DeleteLinkRequest {
  GlobalNetworkId: string;
  LinkId: string;
}
export interface DeleteLinkResponse {
  Link?: Link;
}
export interface DeletePeeringRequest {
  PeeringId: string;
}
export interface DeletePeeringResponse {
  Peering?: Peering;
}
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteSiteRequest {
  GlobalNetworkId: string;
  SiteId: string;
}
export interface DeleteSiteResponse {
  Site?: Site;
}
export interface DeregisterTransitGatewayRequest {
  GlobalNetworkId: string;
  TransitGatewayArn: string;
}
export type TransitGatewayRegistrationState =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "DELETED"
  | "FAILED"
  | (string & {});
export interface TransitGatewayRegistrationStateReason {
  Code?: TransitGatewayRegistrationState;
  Message?: string;
}
export interface TransitGatewayRegistration {
  GlobalNetworkId?: string;
  TransitGatewayArn?: string;
  State?: TransitGatewayRegistrationStateReason;
}
export interface DeregisterTransitGatewayResponse {
  TransitGatewayRegistration?: TransitGatewayRegistration;
}
export type GlobalNetworkIdList = string[];
export type MaxResults = number;
export type NextToken = string;
export interface DescribeGlobalNetworksRequest {
  GlobalNetworkIds?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type GlobalNetworkList = GlobalNetwork[];
export interface DescribeGlobalNetworksResponse {
  GlobalNetworks?: GlobalNetwork[];
  NextToken?: string;
}
export interface DisassociateConnectPeerRequest {
  GlobalNetworkId: string;
  ConnectPeerId: string;
}
export interface DisassociateConnectPeerResponse {
  ConnectPeerAssociation?: ConnectPeerAssociation;
}
export interface DisassociateCustomerGatewayRequest {
  GlobalNetworkId: string;
  CustomerGatewayArn: string;
}
export interface DisassociateCustomerGatewayResponse {
  CustomerGatewayAssociation?: CustomerGatewayAssociation;
}
export interface DisassociateLinkRequest {
  GlobalNetworkId: string;
  DeviceId: string;
  LinkId: string;
}
export interface DisassociateLinkResponse {
  LinkAssociation?: LinkAssociation;
}
export interface DisassociateTransitGatewayConnectPeerRequest {
  GlobalNetworkId: string;
  TransitGatewayConnectPeerArn: string;
}
export interface DisassociateTransitGatewayConnectPeerResponse {
  TransitGatewayConnectPeerAssociation?: TransitGatewayConnectPeerAssociation;
}
export interface ExecuteCoreNetworkChangeSetRequest {
  CoreNetworkId: string;
  PolicyVersionId: number;
}
export interface ExecuteCoreNetworkChangeSetResponse {}
export interface GetConnectAttachmentRequest {
  AttachmentId: string;
}
export interface GetConnectAttachmentResponse {
  ConnectAttachment?: ConnectAttachment;
}
export type ConnectionIdList = string[];
export interface GetConnectionsRequest {
  GlobalNetworkId: string;
  ConnectionIds?: string[];
  DeviceId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ConnectionList = Connection[];
export interface GetConnectionsResponse {
  Connections?: Connection[];
  NextToken?: string;
}
export interface GetConnectPeerRequest {
  ConnectPeerId: string;
}
export interface GetConnectPeerResponse {
  ConnectPeer?: ConnectPeer;
}
export type ConnectPeerIdList = string[];
export interface GetConnectPeerAssociationsRequest {
  GlobalNetworkId: string;
  ConnectPeerIds?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type ConnectPeerAssociationList = ConnectPeerAssociation[];
export interface GetConnectPeerAssociationsResponse {
  ConnectPeerAssociations?: ConnectPeerAssociation[];
  NextToken?: string;
}
export interface GetCoreNetworkRequest {
  CoreNetworkId: string;
}
export interface GetCoreNetworkResponse {
  CoreNetwork?: CoreNetwork;
}
export interface GetCoreNetworkChangeEventsRequest {
  CoreNetworkId: string;
  PolicyVersionId: number;
  MaxResults?: number;
  NextToken?: string;
}
export type ChangeType =
  | "CORE_NETWORK_SEGMENT"
  | "NETWORK_FUNCTION_GROUP"
  | "CORE_NETWORK_EDGE"
  | "ATTACHMENT_MAPPING"
  | "ATTACHMENT_ROUTE_PROPAGATION"
  | "ATTACHMENT_ROUTE_STATIC"
  | "ROUTING_POLICY"
  | "ROUTING_POLICY_SEGMENT_ASSOCIATION"
  | "ROUTING_POLICY_EDGE_ASSOCIATION"
  | "ROUTING_POLICY_ATTACHMENT_ASSOCIATION"
  | "CORE_NETWORK_CONFIGURATION"
  | "SEGMENTS_CONFIGURATION"
  | "SEGMENT_ACTIONS_CONFIGURATION"
  | "ATTACHMENT_POLICIES_CONFIGURATION"
  | (string & {});
export type ChangeAction = "ADD" | "MODIFY" | "REMOVE" | (string & {});
export type ChangeStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETE"
  | "FAILED"
  | (string & {});
export type RoutingPolicyDirection = "inbound" | "outbound" | (string & {});
export interface RoutingPolicyAssociationDetail {
  RoutingPolicyNames?: string[];
  SharedSegments?: string[];
}
export type RoutingPolicyAssociationDetailsList =
  RoutingPolicyAssociationDetail[];
export interface CoreNetworkChangeEventValues {
  EdgeLocation?: string;
  PeerEdgeLocation?: string;
  RoutingPolicyDirection?: RoutingPolicyDirection;
  SegmentName?: string;
  NetworkFunctionGroupName?: string;
  AttachmentId?: string;
  Cidr?: string;
  RoutingPolicyAssociationDetails?: RoutingPolicyAssociationDetail[];
}
export interface CoreNetworkChangeEvent {
  Type?: ChangeType;
  Action?: ChangeAction;
  IdentifierPath?: string;
  EventTime?: Date;
  Status?: ChangeStatus;
  Values?: CoreNetworkChangeEventValues;
}
export type CoreNetworkChangeEventList = CoreNetworkChangeEvent[];
export interface GetCoreNetworkChangeEventsResponse {
  CoreNetworkChangeEvents?: CoreNetworkChangeEvent[];
  NextToken?: string;
}
export interface GetCoreNetworkChangeSetRequest {
  CoreNetworkId: string;
  PolicyVersionId: number;
  MaxResults?: number;
  NextToken?: string;
}
export type SegmentActionServiceInsertion =
  | "send-via"
  | "send-to"
  | (string & {});
export type SendViaMode = "dual-hop" | "single-hop" | (string & {});
export type WhenSentToSegmentsList = string[];
export interface WhenSentTo {
  WhenSentToSegmentsList?: string[];
}
export interface NetworkFunctionGroup {
  Name?: string;
}
export type NetworkFunctionGroupList = NetworkFunctionGroup[];
export type EdgeSet = string[];
export type EdgeSetList = string[][];
export interface EdgeOverride {
  EdgeSets?: string[][];
  UseEdge?: string;
}
export type WithEdgeOverridesList = EdgeOverride[];
export interface Via {
  NetworkFunctionGroups?: NetworkFunctionGroup[];
  WithEdgeOverrides?: EdgeOverride[];
}
export interface ServiceInsertionAction {
  Action?: SegmentActionServiceInsertion;
  Mode?: SendViaMode;
  WhenSentTo?: WhenSentTo;
  Via?: Via;
}
export type ServiceInsertionActionList = ServiceInsertionAction[];
export interface CoreNetworkChangeValues {
  SegmentName?: string;
  NetworkFunctionGroupName?: string;
  EdgeLocations?: string[];
  Asn?: number;
  Cidr?: string;
  DestinationIdentifier?: string;
  InsideCidrBlocks?: string[];
  SharedSegments?: string[];
  ServiceInsertionActions?: ServiceInsertionAction[];
  VpnEcmpSupport?: boolean;
  DnsSupport?: boolean;
  SecurityGroupReferencingSupport?: boolean;
  RoutingPolicyDirection?: RoutingPolicyDirection;
  RoutingPolicy?: string;
  PeerEdgeLocations?: string[];
  AttachmentId?: string;
  RoutingPolicyAssociationDetails?: RoutingPolicyAssociationDetail[];
}
export interface CoreNetworkChange {
  Type?: ChangeType;
  Action?: ChangeAction;
  Identifier?: string;
  PreviousValues?: CoreNetworkChangeValues;
  NewValues?: CoreNetworkChangeValues;
  IdentifierPath?: string;
}
export type CoreNetworkChangeList = CoreNetworkChange[];
export interface GetCoreNetworkChangeSetResponse {
  CoreNetworkChanges?: CoreNetworkChange[];
  NextToken?: string;
}
export interface GetCoreNetworkPolicyRequest {
  CoreNetworkId: string;
  PolicyVersionId?: number;
  Alias?: CoreNetworkPolicyAlias;
}
export interface GetCoreNetworkPolicyResponse {
  CoreNetworkPolicy?: CoreNetworkPolicy;
}
export type CustomerGatewayArnList = string[];
export interface GetCustomerGatewayAssociationsRequest {
  GlobalNetworkId: string;
  CustomerGatewayArns?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type CustomerGatewayAssociationList = CustomerGatewayAssociation[];
export interface GetCustomerGatewayAssociationsResponse {
  CustomerGatewayAssociations?: CustomerGatewayAssociation[];
  NextToken?: string;
}
export type DeviceIdList = string[];
export interface GetDevicesRequest {
  GlobalNetworkId: string;
  DeviceIds?: string[];
  SiteId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type DeviceList = Device[];
export interface GetDevicesResponse {
  Devices?: Device[];
  NextToken?: string;
}
export interface GetDirectConnectGatewayAttachmentRequest {
  AttachmentId: string;
}
export interface GetDirectConnectGatewayAttachmentResponse {
  DirectConnectGatewayAttachment?: DirectConnectGatewayAttachment;
}
export interface GetLinkAssociationsRequest {
  GlobalNetworkId: string;
  DeviceId?: string;
  LinkId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type LinkAssociationList = LinkAssociation[];
export interface GetLinkAssociationsResponse {
  LinkAssociations?: LinkAssociation[];
  NextToken?: string;
}
export type LinkIdList = string[];
export interface GetLinksRequest {
  GlobalNetworkId: string;
  LinkIds?: string[];
  SiteId?: string;
  Type?: string;
  Provider?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type LinkList = Link[];
export interface GetLinksResponse {
  Links?: Link[];
  NextToken?: string;
}
export interface GetNetworkResourceCountsRequest {
  GlobalNetworkId: string;
  ResourceType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface NetworkResourceCount {
  ResourceType?: string;
  Count?: number;
}
export type NetworkResourceCountList = NetworkResourceCount[];
export interface GetNetworkResourceCountsResponse {
  NetworkResourceCounts?: NetworkResourceCount[];
  NextToken?: string;
}
export interface GetNetworkResourceRelationshipsRequest {
  GlobalNetworkId: string;
  CoreNetworkId?: string;
  RegisteredGatewayArn?: string;
  AwsRegion?: string;
  AccountId?: string;
  ResourceType?: string;
  ResourceArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface Relationship {
  From?: string;
  To?: string;
}
export type RelationshipList = Relationship[];
export interface GetNetworkResourceRelationshipsResponse {
  Relationships?: Relationship[];
  NextToken?: string;
}
export interface GetNetworkResourcesRequest {
  GlobalNetworkId: string;
  CoreNetworkId?: string;
  RegisteredGatewayArn?: string;
  AwsRegion?: string;
  AccountId?: string;
  ResourceType?: string;
  ResourceArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type NetworkResourceMetadataMap = { [key: string]: string | undefined };
export interface NetworkResource {
  RegisteredGatewayArn?: string;
  CoreNetworkId?: string;
  AwsRegion?: string;
  AccountId?: string;
  ResourceType?: string;
  ResourceId?: string;
  ResourceArn?: string;
  Definition?: string;
  DefinitionTimestamp?: Date;
  Tags?: Tag[];
  Metadata?: { [key: string]: string | undefined };
}
export type NetworkResourceList = NetworkResource[];
export interface GetNetworkResourcesResponse {
  NetworkResources?: NetworkResource[];
  NextToken?: string;
}
export interface CoreNetworkSegmentEdgeIdentifier {
  CoreNetworkId?: string;
  SegmentName?: string;
  EdgeLocation?: string;
}
export interface CoreNetworkNetworkFunctionGroupIdentifier {
  CoreNetworkId?: string;
  NetworkFunctionGroupName?: string;
  EdgeLocation?: string;
}
export interface RouteTableIdentifier {
  TransitGatewayRouteTableArn?: string;
  CoreNetworkSegmentEdge?: CoreNetworkSegmentEdgeIdentifier;
  CoreNetworkNetworkFunctionGroup?: CoreNetworkNetworkFunctionGroupIdentifier;
}
export type RouteState = "ACTIVE" | "BLACKHOLE" | (string & {});
export type RouteStateList = RouteState[];
export type RouteType = "PROPAGATED" | "STATIC" | (string & {});
export type RouteTypeList = RouteType[];
export type FilterName = string;
export type FilterValue = string;
export type FilterValues = string[];
export type FilterMap = { [key: string]: string[] | undefined };
export interface GetNetworkRoutesRequest {
  GlobalNetworkId: string;
  RouteTableIdentifier: RouteTableIdentifier;
  ExactCidrMatches?: string[];
  LongestPrefixMatches?: string[];
  SubnetOfMatches?: string[];
  SupernetOfMatches?: string[];
  PrefixListIds?: string[];
  States?: RouteState[];
  Types?: RouteType[];
  DestinationFilters?: { [key: string]: string[] | undefined };
}
export type RouteTableType =
  | "TRANSIT_GATEWAY_ROUTE_TABLE"
  | "CORE_NETWORK_SEGMENT"
  | "NETWORK_FUNCTION_GROUP"
  | (string & {});
export type TransitGatewayAttachmentId = string;
export interface NetworkRouteDestination {
  CoreNetworkAttachmentId?: string;
  TransitGatewayAttachmentId?: string;
  SegmentName?: string;
  NetworkFunctionGroupName?: string;
  EdgeLocation?: string;
  ResourceType?: string;
  ResourceId?: string;
}
export type NetworkRouteDestinationList = NetworkRouteDestination[];
export interface NetworkRoute {
  DestinationCidrBlock?: string;
  Destinations?: NetworkRouteDestination[];
  PrefixListId?: string;
  State?: RouteState;
  Type?: RouteType;
}
export type NetworkRouteList = NetworkRoute[];
export interface GetNetworkRoutesResponse {
  RouteTableArn?: string;
  CoreNetworkSegmentEdge?: CoreNetworkSegmentEdgeIdentifier;
  RouteTableType?: RouteTableType;
  RouteTableTimestamp?: Date;
  NetworkRoutes?: NetworkRoute[];
}
export interface GetNetworkTelemetryRequest {
  GlobalNetworkId: string;
  CoreNetworkId?: string;
  RegisteredGatewayArn?: string;
  AwsRegion?: string;
  AccountId?: string;
  ResourceType?: string;
  ResourceArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ConnectionType = "BGP" | "IPSEC" | (string & {});
export type ConnectionStatus = "UP" | "DOWN" | (string & {});
export interface ConnectionHealth {
  Type?: ConnectionType;
  Status?: ConnectionStatus;
  Timestamp?: Date;
}
export interface NetworkTelemetry {
  RegisteredGatewayArn?: string;
  CoreNetworkId?: string;
  AwsRegion?: string;
  AccountId?: string;
  ResourceType?: string;
  ResourceId?: string;
  ResourceArn?: string;
  Address?: string;
  Health?: ConnectionHealth;
}
export type NetworkTelemetryList = NetworkTelemetry[];
export interface GetNetworkTelemetryResponse {
  NetworkTelemetry?: NetworkTelemetry[];
  NextToken?: string;
}
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export type SynthesizedJsonResourcePolicyDocument = string;
export interface GetResourcePolicyResponse {
  PolicyDocument?: string;
}
export interface GetRouteAnalysisRequest {
  GlobalNetworkId: string;
  RouteAnalysisId: string;
}
export type RouteAnalysisStatus =
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export type TransitGatewayAttachmentArn = string;
export interface RouteAnalysisEndpointOptions {
  TransitGatewayAttachmentArn?: string;
  TransitGatewayArn?: string;
  IpAddress?: string;
}
export type RouteAnalysisCompletionResultCode =
  | "CONNECTED"
  | "NOT_CONNECTED"
  | (string & {});
export type RouteAnalysisCompletionReasonCode =
  | "TRANSIT_GATEWAY_ATTACHMENT_NOT_FOUND"
  | "TRANSIT_GATEWAY_ATTACHMENT_NOT_IN_TRANSIT_GATEWAY"
  | "CYCLIC_PATH_DETECTED"
  | "TRANSIT_GATEWAY_ATTACHMENT_STABLE_ROUTE_TABLE_NOT_FOUND"
  | "ROUTE_NOT_FOUND"
  | "BLACKHOLE_ROUTE_FOR_DESTINATION_FOUND"
  | "INACTIVE_ROUTE_FOR_DESTINATION_FOUND"
  | "TRANSIT_GATEWAY_ATTACHMENT_ATTACH_ARN_NO_MATCH"
  | "MAX_HOPS_EXCEEDED"
  | "POSSIBLE_MIDDLEBOX"
  | "NO_DESTINATION_ARN_PROVIDED"
  | (string & {});
export type ReasonContextKey = string;
export type ReasonContextValue = string;
export type ReasonContextMap = { [key: string]: string | undefined };
export interface RouteAnalysisCompletion {
  ResultCode?: RouteAnalysisCompletionResultCode;
  ReasonCode?: RouteAnalysisCompletionReasonCode;
  ReasonContext?: { [key: string]: string | undefined };
}
export interface NetworkResourceSummary {
  RegisteredGatewayArn?: string;
  ResourceArn?: string;
  ResourceType?: string;
  Definition?: string;
  NameTag?: string;
  IsMiddlebox?: boolean;
}
export interface PathComponent {
  Sequence?: number;
  Resource?: NetworkResourceSummary;
  DestinationCidrBlock?: string;
}
export type PathComponentList = PathComponent[];
export interface RouteAnalysisPath {
  CompletionStatus?: RouteAnalysisCompletion;
  Path?: PathComponent[];
}
export interface RouteAnalysis {
  GlobalNetworkId?: string;
  OwnerAccountId?: string;
  RouteAnalysisId?: string;
  StartTimestamp?: Date;
  Status?: RouteAnalysisStatus;
  Source?: RouteAnalysisEndpointOptions;
  Destination?: RouteAnalysisEndpointOptions;
  IncludeReturnPath?: boolean;
  UseMiddleboxes?: boolean;
  ForwardPath?: RouteAnalysisPath;
  ReturnPath?: RouteAnalysisPath;
}
export interface GetRouteAnalysisResponse {
  RouteAnalysis?: RouteAnalysis;
}
export type SiteIdList = string[];
export interface GetSitesRequest {
  GlobalNetworkId: string;
  SiteIds?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type SiteList = Site[];
export interface GetSitesResponse {
  Sites?: Site[];
  NextToken?: string;
}
export interface GetSiteToSiteVpnAttachmentRequest {
  AttachmentId: string;
}
export interface GetSiteToSiteVpnAttachmentResponse {
  SiteToSiteVpnAttachment?: SiteToSiteVpnAttachment;
}
export type TransitGatewayConnectPeerArnList = string[];
export interface GetTransitGatewayConnectPeerAssociationsRequest {
  GlobalNetworkId: string;
  TransitGatewayConnectPeerArns?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type TransitGatewayConnectPeerAssociationList =
  TransitGatewayConnectPeerAssociation[];
export interface GetTransitGatewayConnectPeerAssociationsResponse {
  TransitGatewayConnectPeerAssociations?: TransitGatewayConnectPeerAssociation[];
  NextToken?: string;
}
export interface GetTransitGatewayPeeringRequest {
  PeeringId: string;
}
export interface GetTransitGatewayPeeringResponse {
  TransitGatewayPeering?: TransitGatewayPeering;
}
export type TransitGatewayArnList = string[];
export interface GetTransitGatewayRegistrationsRequest {
  GlobalNetworkId: string;
  TransitGatewayArns?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type TransitGatewayRegistrationList = TransitGatewayRegistration[];
export interface GetTransitGatewayRegistrationsResponse {
  TransitGatewayRegistrations?: TransitGatewayRegistration[];
  NextToken?: string;
}
export interface GetTransitGatewayRouteTableAttachmentRequest {
  AttachmentId: string;
}
export interface GetTransitGatewayRouteTableAttachmentResponse {
  TransitGatewayRouteTableAttachment?: TransitGatewayRouteTableAttachment;
}
export interface GetVpcAttachmentRequest {
  AttachmentId: string;
}
export interface GetVpcAttachmentResponse {
  VpcAttachment?: VpcAttachment;
}
export interface ListAttachmentRoutingPolicyAssociationsRequest {
  CoreNetworkId: string;
  AttachmentId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AttachmentRoutingPolicyAssociationSummary {
  AttachmentId?: string;
  PendingRoutingPolicies?: string[];
  AssociatedRoutingPolicies?: string[];
  RoutingPolicyLabel?: string;
}
export type AttachmentRoutingPolicyAssociationsList =
  AttachmentRoutingPolicyAssociationSummary[];
export interface ListAttachmentRoutingPolicyAssociationsResponse {
  AttachmentRoutingPolicyAssociations?: AttachmentRoutingPolicyAssociationSummary[];
  NextToken?: string;
}
export interface ListAttachmentsRequest {
  CoreNetworkId?: string;
  AttachmentType?: AttachmentType;
  EdgeLocation?: string;
  State?: AttachmentState;
  MaxResults?: number;
  NextToken?: string;
}
export type AttachmentList = Attachment[];
export interface ListAttachmentsResponse {
  Attachments?: Attachment[];
  NextToken?: string;
}
export interface ListConnectPeersRequest {
  CoreNetworkId?: string;
  ConnectAttachmentId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ConnectPeerSummary {
  CoreNetworkId?: string;
  ConnectAttachmentId?: string;
  ConnectPeerId?: string;
  EdgeLocation?: string;
  ConnectPeerState?: ConnectPeerState;
  CreatedAt?: Date;
  Tags?: Tag[];
  SubnetArn?: string;
}
export type ConnectPeerSummaryList = ConnectPeerSummary[];
export interface ListConnectPeersResponse {
  ConnectPeers?: ConnectPeerSummary[];
  NextToken?: string;
}
export interface ListCoreNetworkPolicyVersionsRequest {
  CoreNetworkId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface CoreNetworkPolicyVersion {
  CoreNetworkId?: string;
  PolicyVersionId?: number;
  Alias?: CoreNetworkPolicyAlias;
  Description?: string;
  CreatedAt?: Date;
  ChangeSetState?: ChangeSetState;
}
export type CoreNetworkPolicyVersionList = CoreNetworkPolicyVersion[];
export interface ListCoreNetworkPolicyVersionsResponse {
  CoreNetworkPolicyVersions?: CoreNetworkPolicyVersion[];
  NextToken?: string;
}
export interface ListCoreNetworkPrefixListAssociationsRequest {
  CoreNetworkId: string;
  PrefixListArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface PrefixListAssociation {
  CoreNetworkId?: string;
  PrefixListArn?: string;
  PrefixListAlias?: string;
}
export type PrefixListAssociationList = PrefixListAssociation[];
export interface ListCoreNetworkPrefixListAssociationsResponse {
  PrefixListAssociations?: PrefixListAssociation[];
  NextToken?: string;
}
export interface ListCoreNetworkRoutingInformationRequest {
  CoreNetworkId: string;
  SegmentName: string;
  EdgeLocation: string;
  NextHopFilters?: { [key: string]: string[] | undefined };
  LocalPreferenceMatches?: string[];
  ExactAsPathMatches?: string[];
  MedMatches?: string[];
  CommunityMatches?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export interface RoutingInformationNextHop {
  IpAddress?: string;
  CoreNetworkAttachmentId?: string;
  ResourceId?: string;
  ResourceType?: string;
  SegmentName?: string;
  EdgeLocation?: string;
}
export interface CoreNetworkRoutingInformation {
  Prefix?: string;
  NextHop?: RoutingInformationNextHop;
  LocalPreference?: string;
  Med?: string;
  AsPath?: string[];
  Communities?: string[];
}
export type CoreNetworkRoutingInformationList = CoreNetworkRoutingInformation[];
export interface ListCoreNetworkRoutingInformationResponse {
  CoreNetworkRoutingInformation?: CoreNetworkRoutingInformation[];
  NextToken?: string;
}
export interface ListCoreNetworksRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface CoreNetworkSummary {
  CoreNetworkId?: string;
  CoreNetworkArn?: string;
  GlobalNetworkId?: string;
  OwnerAccountId?: string;
  State?: CoreNetworkState;
  Description?: string;
  Tags?: Tag[];
}
export type CoreNetworkSummaryList = CoreNetworkSummary[];
export interface ListCoreNetworksResponse {
  CoreNetworks?: CoreNetworkSummary[];
  NextToken?: string;
}
export interface ListOrganizationServiceAccessStatusRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type OrganizationId = string;
export type OrganizationAwsServiceAccessStatus = string;
export type SLRDeploymentStatus = string;
export type AccountId = string;
export interface AccountStatus {
  AccountId?: string;
  SLRDeploymentStatus?: string;
}
export type AccountStatusList = AccountStatus[];
export interface OrganizationStatus {
  OrganizationId?: string;
  OrganizationAwsServiceAccessStatus?: string;
  SLRDeploymentStatus?: string;
  AccountStatusList?: AccountStatus[];
}
export interface ListOrganizationServiceAccessStatusResponse {
  OrganizationStatus?: OrganizationStatus;
  NextToken?: string;
}
export interface ListPeeringsRequest {
  CoreNetworkId?: string;
  PeeringType?: PeeringType;
  EdgeLocation?: string;
  State?: PeeringState;
  MaxResults?: number;
  NextToken?: string;
}
export type PeeringList = Peering[];
export interface ListPeeringsResponse {
  Peerings?: Peering[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  TagList?: Tag[];
}
export interface PutAttachmentRoutingPolicyLabelRequest {
  CoreNetworkId: string;
  AttachmentId: string;
  RoutingPolicyLabel: string;
  ClientToken?: string;
}
export interface PutAttachmentRoutingPolicyLabelResponse {
  CoreNetworkId?: string;
  AttachmentId?: string;
  RoutingPolicyLabel?: string;
}
export interface PutCoreNetworkPolicyRequest {
  CoreNetworkId: string;
  PolicyDocument: string;
  Description?: string;
  LatestVersionId?: number;
  ClientToken?: string;
}
export interface PutCoreNetworkPolicyResponse {
  CoreNetworkPolicy?: CoreNetworkPolicy;
}
export interface PutResourcePolicyRequest {
  PolicyDocument: string;
  ResourceArn: string;
}
export interface PutResourcePolicyResponse {}
export interface RegisterTransitGatewayRequest {
  GlobalNetworkId: string;
  TransitGatewayArn: string;
}
export interface RegisterTransitGatewayResponse {
  TransitGatewayRegistration?: TransitGatewayRegistration;
}
export interface RejectAttachmentRequest {
  AttachmentId: string;
}
export interface RejectAttachmentResponse {
  Attachment?: Attachment;
}
export interface RemoveAttachmentRoutingPolicyLabelRequest {
  CoreNetworkId: string;
  AttachmentId: string;
}
export interface RemoveAttachmentRoutingPolicyLabelResponse {
  CoreNetworkId?: string;
  AttachmentId?: string;
  RoutingPolicyLabel?: string;
}
export interface RestoreCoreNetworkPolicyVersionRequest {
  CoreNetworkId: string;
  PolicyVersionId: number;
}
export interface RestoreCoreNetworkPolicyVersionResponse {
  CoreNetworkPolicy?: CoreNetworkPolicy;
}
export type Action = string;
export interface StartOrganizationServiceAccessUpdateRequest {
  Action: string;
}
export interface StartOrganizationServiceAccessUpdateResponse {
  OrganizationStatus?: OrganizationStatus;
}
export interface RouteAnalysisEndpointOptionsSpecification {
  TransitGatewayAttachmentArn?: string;
  IpAddress?: string;
}
export interface StartRouteAnalysisRequest {
  GlobalNetworkId: string;
  Source: RouteAnalysisEndpointOptionsSpecification;
  Destination: RouteAnalysisEndpointOptionsSpecification;
  IncludeReturnPath?: boolean;
  UseMiddleboxes?: boolean;
}
export interface StartRouteAnalysisResponse {
  RouteAnalysis?: RouteAnalysis;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateConnectionRequest {
  GlobalNetworkId: string;
  ConnectionId: string;
  LinkId?: string;
  ConnectedLinkId?: string;
  Description?: string;
}
export interface UpdateConnectionResponse {
  Connection?: Connection;
}
export interface UpdateCoreNetworkRequest {
  CoreNetworkId: string;
  Description?: string;
}
export interface UpdateCoreNetworkResponse {
  CoreNetwork?: CoreNetwork;
}
export interface UpdateDeviceRequest {
  GlobalNetworkId: string;
  DeviceId: string;
  AWSLocation?: AWSLocation;
  Description?: string;
  Type?: string;
  Vendor?: string;
  Model?: string;
  SerialNumber?: string;
  Location?: Location;
  SiteId?: string;
}
export interface UpdateDeviceResponse {
  Device?: Device;
}
export interface UpdateDirectConnectGatewayAttachmentRequest {
  AttachmentId: string;
  EdgeLocations?: string[];
}
export interface UpdateDirectConnectGatewayAttachmentResponse {
  DirectConnectGatewayAttachment?: DirectConnectGatewayAttachment;
}
export interface UpdateGlobalNetworkRequest {
  GlobalNetworkId: string;
  Description?: string;
}
export interface UpdateGlobalNetworkResponse {
  GlobalNetwork?: GlobalNetwork;
}
export interface UpdateLinkRequest {
  GlobalNetworkId: string;
  LinkId: string;
  Description?: string;
  Type?: string;
  Bandwidth?: Bandwidth;
  Provider?: string;
}
export interface UpdateLinkResponse {
  Link?: Link;
}
export interface UpdateNetworkResourceMetadataRequest {
  GlobalNetworkId: string;
  ResourceArn: string;
  Metadata: { [key: string]: string | undefined };
}
export interface UpdateNetworkResourceMetadataResponse {
  ResourceArn?: string;
  Metadata?: { [key: string]: string | undefined };
}
export interface UpdateSiteRequest {
  GlobalNetworkId: string;
  SiteId: string;
  Description?: string;
  Location?: Location;
}
export interface UpdateSiteResponse {
  Site?: Site;
}
export interface UpdateVpcAttachmentRequest {
  AttachmentId: string;
  AddSubnetArns?: string[];
  RemoveSubnetArns?: string[];
  Options?: VpcOptions;
}
export interface UpdateVpcAttachmentResponse {
  VpcAttachment?: VpcAttachment;
}
export type RetryAfterSeconds = number;
export type ExceptionContextKey = string;
export type ExceptionContextValue = string;
export type ExceptionContextMap = { [key: string]: string | undefined };
export type ValidationExceptionReason =
  | "UnknownOperation"
  | "CannotParse"
  | "FieldValidationFailed"
  | "Other"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AcceptAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts a core network attachment request.
 *
 * Once the attachment request is accepted by a core network owner, the attachment is
 * created and connected to a core network.
 */
export const acceptAttachment: API.OperationMethod<
  AcceptAttachmentRequest,
  AcceptAttachmentResponse,
  AcceptAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /attachments/{AttachmentId}/accept",
    input: { AttachmentId: 0 },
    output: { Attachment: o_Attachment },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAttachment",
})) as any;

export type AssociateConnectPeerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a core network Connect peer with a device and optionally, with a link.
 *
 * If you specify a link, it must be associated with the specified device. You can only
 * associate core network Connect peers that have been created on a core network Connect
 * attachment on a core network.
 */
export const associateConnectPeer: API.OperationMethod<
  AssociateConnectPeerRequest,
  AssociateConnectPeerResponse,
  AssociateConnectPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks/{GlobalNetworkId}/connect-peer-associations",
    input: { GlobalNetworkId: 0, ConnectPeerId: 0, DeviceId: 0, LinkId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateConnectPeer",
})) as any;

export type AssociateCustomerGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a customer gateway with a device and optionally, with a link. If you
 * specify a link, it must be associated with the specified device.
 *
 * You can only associate customer gateways that are connected to a VPN attachment on a
 * transit gateway or core network registered in your global network. When you register a
 * transit gateway or core network, customer gateways that are connected to the transit
 * gateway are automatically included in the global network. To list customer gateways
 * that are connected to a transit gateway, use the DescribeVpnConnections EC2 API and filter by
 * `transit-gateway-id`.
 *
 * You cannot associate a customer gateway with more than one device and link.
 */
export const associateCustomerGateway: API.OperationMethod<
  AssociateCustomerGatewayRequest,
  AssociateCustomerGatewayResponse,
  AssociateCustomerGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks/{GlobalNetworkId}/customer-gateway-associations",
    input: {
      CustomerGatewayArn: 0,
      GlobalNetworkId: 0,
      DeviceId: 0,
      LinkId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateCustomerGateway",
})) as any;

export type AssociateLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a link to a device. A device can be associated to multiple links and a link can be associated to multiple devices. The device and link must be in the same global network and the same site.
 */
export const associateLink: API.OperationMethod<
  AssociateLinkRequest,
  AssociateLinkResponse,
  AssociateLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks/{GlobalNetworkId}/link-associations",
    input: { GlobalNetworkId: 0, DeviceId: 0, LinkId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateLink",
})) as any;

export type AssociateTransitGatewayConnectPeerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a transit gateway Connect peer with a device, and optionally, with a link. If you
 * specify a link, it must be associated with the specified device.
 *
 * You can only associate transit gateway Connect peers that have been created on a
 * transit gateway that's registered in your global network.
 *
 * You cannot associate a transit gateway Connect peer with more than one device and link.
 */
export const associateTransitGatewayConnectPeer: API.OperationMethod<
  AssociateTransitGatewayConnectPeerRequest,
  AssociateTransitGatewayConnectPeerResponse,
  AssociateTransitGatewayConnectPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks/{GlobalNetworkId}/transit-gateway-connect-peer-associations",
    input: {
      GlobalNetworkId: 0,
      TransitGatewayConnectPeerArn: 0,
      DeviceId: 0,
      LinkId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateTransitGatewayConnectPeer",
})) as any;

export type CreateConnectAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a core network Connect attachment from a specified core network attachment.
 *
 * A core network Connect attachment is a GRE-based tunnel attachment that you can use to
 * establish a connection between a core network and an appliance. A core network Connect
 * attachment uses an existing VPC attachment as the underlying transport mechanism.
 */
export const createConnectAttachment: API.OperationMethod<
  CreateConnectAttachmentRequest,
  CreateConnectAttachmentResponse,
  CreateConnectAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /connect-attachments",
    input: {
      CoreNetworkId: 0,
      EdgeLocation: 0,
      TransportAttachmentId: 0,
      RoutingPolicyLabel: 0,
      Options: { Protocol: 0 },
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { ConnectAttachment: o_ConnectAttachment },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectAttachment",
})) as any;

export type CreateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a connection between two devices. The devices can be a physical or virtual appliance that connects to a third-party appliance in a VPC, or a physical appliance that connects to another physical appliance in an on-premises network.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionRequest,
  CreateConnectionResponse,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks/{GlobalNetworkId}/connections",
    input: {
      GlobalNetworkId: 0,
      DeviceId: 0,
      ConnectedDeviceId: 0,
      LinkId: 0,
      ConnectedLinkId: 0,
      Description: 0,
      Tags: D.list(i_Tag),
    },
    output: { Connection: o_Connection },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
})) as any;

export type CreateConnectPeerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a core network Connect peer for a specified core network connect attachment between a core network and an appliance.
 * The peer address and transit gateway address must be the same IP address family (IPv4 or IPv6).
 */
export const createConnectPeer: API.OperationMethod<
  CreateConnectPeerRequest,
  CreateConnectPeerResponse,
  CreateConnectPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /connect-peers",
    input: {
      ConnectAttachmentId: 0,
      CoreNetworkAddress: 0,
      PeerAddress: 0,
      BgpOptions: { PeerAsn: 0 },
      InsideCidrBlocks: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
      SubnetArn: 0,
    },
    output: { ConnectPeer: o_ConnectPeer },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectPeer",
})) as any;

export type CreateCoreNetworkError =
  | AccessDeniedException
  | ConflictException
  | CoreNetworkPolicyException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a core network as part of your global network, and optionally, with a core network policy.
 */
export const createCoreNetwork: API.OperationMethod<
  CreateCoreNetworkRequest,
  CreateCoreNetworkResponse,
  CreateCoreNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /core-networks",
    input: {
      GlobalNetworkId: 0,
      Description: 0,
      Tags: D.list(i_Tag),
      PolicyDocument: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CoreNetwork: o_CoreNetwork },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    CoreNetworkPolicyException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCoreNetwork",
})) as any;

export type CreateCoreNetworkPrefixListAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an association between a core network and a prefix list for routing control.
 */
export const createCoreNetworkPrefixListAssociation: API.OperationMethod<
  CreateCoreNetworkPrefixListAssociationRequest,
  CreateCoreNetworkPrefixListAssociationResponse,
  CreateCoreNetworkPrefixListAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /prefix-list",
    input: {
      CoreNetworkId: 0,
      PrefixListArn: 0,
      PrefixListAlias: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCoreNetworkPrefixListAssociation",
})) as any;

export type CreateDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new device in a global network. If you specify both a site ID and a
 * location, the location of the site is used for visualization in the Network Manager console.
 */
export const createDevice: API.OperationMethod<
  CreateDeviceRequest,
  CreateDeviceResponse,
  CreateDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks/{GlobalNetworkId}/devices",
    input: {
      GlobalNetworkId: 0,
      AWSLocation: i_AWSLocation,
      Description: 0,
      Type: 0,
      Vendor: 0,
      Model: 0,
      SerialNumber: 0,
      Location: i_Location,
      SiteId: 0,
      Tags: D.list(i_Tag),
    },
    output: { Device: o_Device },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDevice",
})) as any;

export type CreateDirectConnectGatewayAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Web Services Direct Connect gateway attachment
 */
export const createDirectConnectGatewayAttachment: API.OperationMethod<
  CreateDirectConnectGatewayAttachmentRequest,
  CreateDirectConnectGatewayAttachmentResponse,
  CreateDirectConnectGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /direct-connect-gateway-attachments",
    input: {
      CoreNetworkId: 0,
      DirectConnectGatewayArn: 0,
      RoutingPolicyLabel: 0,
      EdgeLocations: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: {
      DirectConnectGatewayAttachment: o_DirectConnectGatewayAttachment,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectConnectGatewayAttachment",
})) as any;

export type CreateGlobalNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new, empty global network.
 */
export const createGlobalNetwork: API.OperationMethod<
  CreateGlobalNetworkRequest,
  CreateGlobalNetworkResponse,
  CreateGlobalNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks",
    input: { Description: 0, Tags: D.list(i_Tag) },
    output: { GlobalNetwork: o_GlobalNetwork },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlobalNetwork",
})) as any;

export type CreateLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new link for a specified site.
 */
export const createLink: API.OperationMethod<
  CreateLinkRequest,
  CreateLinkResponse,
  CreateLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks/{GlobalNetworkId}/links",
    input: {
      GlobalNetworkId: 0,
      Description: 0,
      Type: 0,
      Bandwidth: i_Bandwidth,
      Provider: 0,
      SiteId: 0,
      Tags: D.list(i_Tag),
    },
    output: { Link: o_Link },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLink",
})) as any;

export type CreateSiteError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new site in a global network.
 */
export const createSite: API.OperationMethod<
  CreateSiteRequest,
  CreateSiteResponse,
  CreateSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks/{GlobalNetworkId}/sites",
    input: {
      GlobalNetworkId: 0,
      Description: 0,
      Location: i_Location,
      Tags: D.list(i_Tag),
    },
    output: { Site: o_Site },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSite",
})) as any;

export type CreateSiteToSiteVpnAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Web Services site-to-site VPN attachment on an edge location of a core network.
 */
export const createSiteToSiteVpnAttachment: API.OperationMethod<
  CreateSiteToSiteVpnAttachmentRequest,
  CreateSiteToSiteVpnAttachmentResponse,
  CreateSiteToSiteVpnAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /site-to-site-vpn-attachments",
    input: {
      CoreNetworkId: 0,
      VpnConnectionArn: 0,
      RoutingPolicyLabel: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { SiteToSiteVpnAttachment: o_SiteToSiteVpnAttachment },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSiteToSiteVpnAttachment",
})) as any;

export type CreateTransitGatewayPeeringError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a transit gateway peering connection.
 */
export const createTransitGatewayPeering: API.OperationMethod<
  CreateTransitGatewayPeeringRequest,
  CreateTransitGatewayPeeringResponse,
  CreateTransitGatewayPeeringError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /transit-gateway-peerings",
    input: {
      CoreNetworkId: 0,
      TransitGatewayArn: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { TransitGatewayPeering: o_TransitGatewayPeering },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTransitGatewayPeering",
})) as any;

export type CreateTransitGatewayRouteTableAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a transit gateway route table attachment.
 */
export const createTransitGatewayRouteTableAttachment: API.OperationMethod<
  CreateTransitGatewayRouteTableAttachmentRequest,
  CreateTransitGatewayRouteTableAttachmentResponse,
  CreateTransitGatewayRouteTableAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /transit-gateway-route-table-attachments",
    input: {
      PeeringId: 0,
      TransitGatewayRouteTableArn: 0,
      RoutingPolicyLabel: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: {
      TransitGatewayRouteTableAttachment: o_TransitGatewayRouteTableAttachment,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTransitGatewayRouteTableAttachment",
})) as any;

export type CreateVpcAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a VPC attachment on an edge location of a core network.
 */
export const createVpcAttachment: API.OperationMethod<
  CreateVpcAttachmentRequest,
  CreateVpcAttachmentResponse,
  CreateVpcAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /vpc-attachments",
    input: {
      CoreNetworkId: 0,
      VpcArn: 0,
      SubnetArns: 0,
      Options: i_VpcOptions,
      RoutingPolicyLabel: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    output: { VpcAttachment: o_VpcAttachment },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcAttachment",
})) as any;

export type DeleteAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an attachment. Supports all attachment types.
 */
export const deleteAttachment: API.OperationMethod<
  DeleteAttachmentRequest,
  DeleteAttachmentResponse,
  DeleteAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /attachments/{AttachmentId}",
    input: { AttachmentId: 0 },
    output: { Attachment: o_Attachment },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttachment",
})) as any;

export type DeleteConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified connection in your global network.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /global-networks/{GlobalNetworkId}/connections/{ConnectionId}",
    input: { GlobalNetworkId: 0, ConnectionId: 0 },
    output: { Connection: o_Connection },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
})) as any;

export type DeleteConnectPeerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Connect peer.
 */
export const deleteConnectPeer: API.OperationMethod<
  DeleteConnectPeerRequest,
  DeleteConnectPeerResponse,
  DeleteConnectPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /connect-peers/{ConnectPeerId}",
    input: { ConnectPeerId: 0 },
    output: { ConnectPeer: o_ConnectPeer },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectPeer",
})) as any;

export type DeleteCoreNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a core network along with all core network policies. This can only be done if there are no attachments on a core network.
 */
export const deleteCoreNetwork: API.OperationMethod<
  DeleteCoreNetworkRequest,
  DeleteCoreNetworkResponse,
  DeleteCoreNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /core-networks/{CoreNetworkId}",
    input: { CoreNetworkId: 0 },
    output: { CoreNetwork: o_CoreNetwork },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCoreNetwork",
})) as any;

export type DeleteCoreNetworkPolicyVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a policy version from a core network. You can't delete the current LIVE policy.
 */
export const deleteCoreNetworkPolicyVersion: API.OperationMethod<
  DeleteCoreNetworkPolicyVersionRequest,
  DeleteCoreNetworkPolicyVersionResponse,
  DeleteCoreNetworkPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /core-networks/{CoreNetworkId}/core-network-policy-versions/{PolicyVersionId}",
    input: { CoreNetworkId: 0, PolicyVersionId: 0 },
    output: { CoreNetworkPolicy: o_CoreNetworkPolicy },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCoreNetworkPolicyVersion",
})) as any;

export type DeleteCoreNetworkPrefixListAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an association between a core network and a prefix list.
 */
export const deleteCoreNetworkPrefixListAssociation: API.OperationMethod<
  DeleteCoreNetworkPrefixListAssociationRequest,
  DeleteCoreNetworkPrefixListAssociationResponse,
  DeleteCoreNetworkPrefixListAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /prefix-list/{PrefixListArn}/core-network/{CoreNetworkId}",
    input: { CoreNetworkId: 0, PrefixListArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCoreNetworkPrefixListAssociation",
})) as any;

export type DeleteDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing device. You must first disassociate the device from any links and
 * customer gateways.
 */
export const deleteDevice: API.OperationMethod<
  DeleteDeviceRequest,
  DeleteDeviceResponse,
  DeleteDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /global-networks/{GlobalNetworkId}/devices/{DeviceId}",
    input: { GlobalNetworkId: 0, DeviceId: 0 },
    output: { Device: o_Device },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevice",
})) as any;

export type DeleteGlobalNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing global network. You must first delete all global network objects
 * (devices, links, and sites), deregister all transit gateways, and delete any core networks.
 */
export const deleteGlobalNetwork: API.OperationMethod<
  DeleteGlobalNetworkRequest,
  DeleteGlobalNetworkResponse,
  DeleteGlobalNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /global-networks/{GlobalNetworkId}",
    input: { GlobalNetworkId: 0 },
    output: { GlobalNetwork: o_GlobalNetwork },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlobalNetwork",
})) as any;

export type DeleteLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing link. You must first disassociate the link from any devices and
 * customer gateways.
 */
export const deleteLink: API.OperationMethod<
  DeleteLinkRequest,
  DeleteLinkResponse,
  DeleteLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /global-networks/{GlobalNetworkId}/links/{LinkId}",
    input: { GlobalNetworkId: 0, LinkId: 0 },
    output: { Link: o_Link },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLink",
})) as any;

export type DeletePeeringError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing peering connection.
 */
export const deletePeering: API.OperationMethod<
  DeletePeeringRequest,
  DeletePeeringResponse,
  DeletePeeringError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /peerings/{PeeringId}",
    input: { PeeringId: 0 },
    output: { Peering: o_Peering },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePeering",
})) as any;

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource policy for the specified resource. This revokes the access of the principals specified in the resource policy.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /resource-policy/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteSiteError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing site. The site cannot be associated with any device or link.
 */
export const deleteSite: API.OperationMethod<
  DeleteSiteRequest,
  DeleteSiteResponse,
  DeleteSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /global-networks/{GlobalNetworkId}/sites/{SiteId}",
    input: { GlobalNetworkId: 0, SiteId: 0 },
    output: { Site: o_Site },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSite",
})) as any;

export type DeregisterTransitGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters a transit gateway from your global network. This action does not delete
 * your transit gateway, or modify any of its attachments. This action removes any customer gateway associations.
 */
export const deregisterTransitGateway: API.OperationMethod<
  DeregisterTransitGatewayRequest,
  DeregisterTransitGatewayResponse,
  DeregisterTransitGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /global-networks/{GlobalNetworkId}/transit-gateway-registrations/{TransitGatewayArn}",
    input: { GlobalNetworkId: 0, TransitGatewayArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTransitGateway",
})) as any;

export type DescribeGlobalNetworksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes one or more global networks. By default, all global networks are
 * described. To describe the objects in your global network, you must use the appropriate
 * `Get*` action. For example, to list the transit gateways in your global
 * network, use GetTransitGatewayRegistrations.
 */
export const describeGlobalNetworks: API.PaginatedOperationMethod<
  DescribeGlobalNetworksRequest,
  DescribeGlobalNetworksResponse,
  DescribeGlobalNetworksError,
  Credentials | HttpClient.HttpClient,
  GlobalNetwork
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks",
    input: {
      GlobalNetworkIds: D.m({ query: "globalNetworkIds" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { GlobalNetworks: D.list(o_GlobalNetwork) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGlobalNetworks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GlobalNetworks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisassociateConnectPeerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a core network Connect peer from a device and a link.
 */
export const disassociateConnectPeer: API.OperationMethod<
  DisassociateConnectPeerRequest,
  DisassociateConnectPeerResponse,
  DisassociateConnectPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /global-networks/{GlobalNetworkId}/connect-peer-associations/{ConnectPeerId}",
    input: { GlobalNetworkId: 0, ConnectPeerId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateConnectPeer",
})) as any;

export type DisassociateCustomerGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a customer gateway from a device and a link.
 */
export const disassociateCustomerGateway: API.OperationMethod<
  DisassociateCustomerGatewayRequest,
  DisassociateCustomerGatewayResponse,
  DisassociateCustomerGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /global-networks/{GlobalNetworkId}/customer-gateway-associations/{CustomerGatewayArn}",
    input: { GlobalNetworkId: 0, CustomerGatewayArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateCustomerGateway",
})) as any;

export type DisassociateLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an existing device from a link. You must first disassociate any customer
 * gateways that are associated with the link.
 */
export const disassociateLink: API.OperationMethod<
  DisassociateLinkRequest,
  DisassociateLinkResponse,
  DisassociateLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /global-networks/{GlobalNetworkId}/link-associations",
    input: {
      GlobalNetworkId: 0,
      DeviceId: D.m({ query: "deviceId" }),
      LinkId: D.m({ query: "linkId" }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateLink",
})) as any;

export type DisassociateTransitGatewayConnectPeerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a transit gateway Connect peer from a device and link.
 */
export const disassociateTransitGatewayConnectPeer: API.OperationMethod<
  DisassociateTransitGatewayConnectPeerRequest,
  DisassociateTransitGatewayConnectPeerResponse,
  DisassociateTransitGatewayConnectPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /global-networks/{GlobalNetworkId}/transit-gateway-connect-peer-associations/{TransitGatewayConnectPeerArn}",
    input: { GlobalNetworkId: 0, TransitGatewayConnectPeerArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateTransitGatewayConnectPeer",
})) as any;

export type ExecuteCoreNetworkChangeSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Executes a change set on your core network. Deploys changes globally based on the policy submitted..
 */
export const executeCoreNetworkChangeSet: API.OperationMethod<
  ExecuteCoreNetworkChangeSetRequest,
  ExecuteCoreNetworkChangeSetResponse,
  ExecuteCoreNetworkChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /core-networks/{CoreNetworkId}/core-network-change-sets/{PolicyVersionId}/execute",
    input: { CoreNetworkId: 0, PolicyVersionId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteCoreNetworkChangeSet",
})) as any;

export type GetConnectAttachmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a core network Connect attachment.
 */
export const getConnectAttachment: API.OperationMethod<
  GetConnectAttachmentRequest,
  GetConnectAttachmentResponse,
  GetConnectAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /connect-attachments/{AttachmentId}",
    input: { AttachmentId: 0 },
    output: { ConnectAttachment: o_ConnectAttachment },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectAttachment",
})) as any;

export type GetConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about one or more of your connections in a global network.
 */
export const getConnections: API.PaginatedOperationMethod<
  GetConnectionsRequest,
  GetConnectionsResponse,
  GetConnectionsError,
  Credentials | HttpClient.HttpClient,
  Connection
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/connections",
    input: {
      GlobalNetworkId: 0,
      ConnectionIds: D.m({ query: "connectionIds" }),
      DeviceId: D.m({ query: "deviceId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Connections: D.list(o_Connection) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Connections",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetConnectPeerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a core network Connect peer.
 */
export const getConnectPeer: API.OperationMethod<
  GetConnectPeerRequest,
  GetConnectPeerResponse,
  GetConnectPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /connect-peers/{ConnectPeerId}",
    input: { ConnectPeerId: 0 },
    output: { ConnectPeer: o_ConnectPeer },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectPeer",
})) as any;

export type GetConnectPeerAssociationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a core network Connect peer associations.
 */
export const getConnectPeerAssociations: API.PaginatedOperationMethod<
  GetConnectPeerAssociationsRequest,
  GetConnectPeerAssociationsResponse,
  GetConnectPeerAssociationsError,
  Credentials | HttpClient.HttpClient,
  ConnectPeerAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/connect-peer-associations",
    input: {
      GlobalNetworkId: 0,
      ConnectPeerIds: D.m({ query: "connectPeerIds" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectPeerAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectPeerAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCoreNetworkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the LIVE policy for a core network.
 */
export const getCoreNetwork: API.OperationMethod<
  GetCoreNetworkRequest,
  GetCoreNetworkResponse,
  GetCoreNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /core-networks/{CoreNetworkId}",
    input: { CoreNetworkId: 0 },
    output: { CoreNetwork: o_CoreNetwork },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoreNetwork",
})) as any;

export type GetCoreNetworkChangeEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a core network change event.
 */
export const getCoreNetworkChangeEvents: API.PaginatedOperationMethod<
  GetCoreNetworkChangeEventsRequest,
  GetCoreNetworkChangeEventsResponse,
  GetCoreNetworkChangeEventsError,
  Credentials | HttpClient.HttpClient,
  CoreNetworkChangeEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /core-networks/{CoreNetworkId}/core-network-change-events/{PolicyVersionId}",
    input: {
      CoreNetworkId: 0,
      PolicyVersionId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { CoreNetworkChangeEvents: D.list({ EventTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoreNetworkChangeEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CoreNetworkChangeEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCoreNetworkChangeSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a change set between the LIVE core network policy and a submitted policy.
 */
export const getCoreNetworkChangeSet: API.PaginatedOperationMethod<
  GetCoreNetworkChangeSetRequest,
  GetCoreNetworkChangeSetResponse,
  GetCoreNetworkChangeSetError,
  Credentials | HttpClient.HttpClient,
  CoreNetworkChange
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /core-networks/{CoreNetworkId}/core-network-change-sets/{PolicyVersionId}",
    input: {
      CoreNetworkId: 0,
      PolicyVersionId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoreNetworkChangeSet",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CoreNetworkChanges",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCoreNetworkPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a core network policy. You can get details about your current live policy or any previous policy version.
 */
export const getCoreNetworkPolicy: API.OperationMethod<
  GetCoreNetworkPolicyRequest,
  GetCoreNetworkPolicyResponse,
  GetCoreNetworkPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /core-networks/{CoreNetworkId}/core-network-policy",
    input: {
      CoreNetworkId: 0,
      PolicyVersionId: D.m({ query: "policyVersionId" }),
      Alias: D.m({ query: "alias" }),
    },
    output: { CoreNetworkPolicy: o_CoreNetworkPolicy },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoreNetworkPolicy",
})) as any;

export type GetCustomerGatewayAssociationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the association information for customer gateways that are associated with
 * devices and links in your global network.
 */
export const getCustomerGatewayAssociations: API.PaginatedOperationMethod<
  GetCustomerGatewayAssociationsRequest,
  GetCustomerGatewayAssociationsResponse,
  GetCustomerGatewayAssociationsError,
  Credentials | HttpClient.HttpClient,
  CustomerGatewayAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/customer-gateway-associations",
    input: {
      GlobalNetworkId: 0,
      CustomerGatewayArns: D.m({ query: "customerGatewayArns" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomerGatewayAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomerGatewayAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetDevicesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about one or more of your devices in a global network.
 */
export const getDevices: API.PaginatedOperationMethod<
  GetDevicesRequest,
  GetDevicesResponse,
  GetDevicesError,
  Credentials | HttpClient.HttpClient,
  Device
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/devices",
    input: {
      GlobalNetworkId: 0,
      DeviceIds: D.m({ query: "deviceIds" }),
      SiteId: D.m({ query: "siteId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Devices: D.list(o_Device) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Devices",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetDirectConnectGatewayAttachmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific Amazon Web Services Direct Connect gateway attachment.
 */
export const getDirectConnectGatewayAttachment: API.OperationMethod<
  GetDirectConnectGatewayAttachmentRequest,
  GetDirectConnectGatewayAttachmentResponse,
  GetDirectConnectGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /direct-connect-gateway-attachments/{AttachmentId}",
    input: { AttachmentId: 0 },
    output: {
      DirectConnectGatewayAttachment: o_DirectConnectGatewayAttachment,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDirectConnectGatewayAttachment",
})) as any;

export type GetLinkAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the link associations for a device or a link. Either the device ID or the link ID
 * must be specified.
 */
export const getLinkAssociations: API.PaginatedOperationMethod<
  GetLinkAssociationsRequest,
  GetLinkAssociationsResponse,
  GetLinkAssociationsError,
  Credentials | HttpClient.HttpClient,
  LinkAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/link-associations",
    input: {
      GlobalNetworkId: 0,
      DeviceId: D.m({ query: "deviceId" }),
      LinkId: D.m({ query: "linkId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLinkAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LinkAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetLinksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about one or more links in a specified global network.
 *
 * If you specify the site ID, you cannot specify the type or provider in the same request. You can specify the type and provider in the same request.
 */
export const getLinks: API.PaginatedOperationMethod<
  GetLinksRequest,
  GetLinksResponse,
  GetLinksError,
  Credentials | HttpClient.HttpClient,
  Link
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/links",
    input: {
      GlobalNetworkId: 0,
      LinkIds: D.m({ query: "linkIds" }),
      SiteId: D.m({ query: "siteId" }),
      Type: D.m({ query: "type" }),
      Provider: D.m({ query: "provider" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Links: D.list(o_Link) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLinks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Links",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetNetworkResourceCountsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the count of network resources, by resource type, for the specified global network.
 */
export const getNetworkResourceCounts: API.PaginatedOperationMethod<
  GetNetworkResourceCountsRequest,
  GetNetworkResourceCountsResponse,
  GetNetworkResourceCountsError,
  Credentials | HttpClient.HttpClient,
  NetworkResourceCount
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/network-resource-count",
    input: {
      GlobalNetworkId: 0,
      ResourceType: D.m({ query: "resourceType" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkResourceCounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NetworkResourceCounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetNetworkResourceRelationshipsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the network resource relationships for the specified global network.
 */
export const getNetworkResourceRelationships: API.PaginatedOperationMethod<
  GetNetworkResourceRelationshipsRequest,
  GetNetworkResourceRelationshipsResponse,
  GetNetworkResourceRelationshipsError,
  Credentials | HttpClient.HttpClient,
  Relationship
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/network-resource-relationships",
    input: {
      GlobalNetworkId: 0,
      CoreNetworkId: D.m({ query: "coreNetworkId" }),
      RegisteredGatewayArn: D.m({ query: "registeredGatewayArn" }),
      AwsRegion: D.m({ query: "awsRegion" }),
      AccountId: D.m({ query: "accountId" }),
      ResourceType: D.m({ query: "resourceType" }),
      ResourceArn: D.m({ query: "resourceArn" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkResourceRelationships",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Relationships",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetNetworkResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the network resources for the specified global network.
 *
 * The results include information from the corresponding Describe call for the resource, minus any sensitive information such as pre-shared keys.
 */
export const getNetworkResources: API.PaginatedOperationMethod<
  GetNetworkResourcesRequest,
  GetNetworkResourcesResponse,
  GetNetworkResourcesError,
  Credentials | HttpClient.HttpClient,
  NetworkResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/network-resources",
    input: {
      GlobalNetworkId: 0,
      CoreNetworkId: D.m({ query: "coreNetworkId" }),
      RegisteredGatewayArn: D.m({ query: "registeredGatewayArn" }),
      AwsRegion: D.m({ query: "awsRegion" }),
      AccountId: D.m({ query: "accountId" }),
      ResourceType: D.m({ query: "resourceType" }),
      ResourceArn: D.m({ query: "resourceArn" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { NetworkResources: D.list({ DefinitionTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NetworkResources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetNetworkRoutesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the network routes of the specified global network.
 */
export const getNetworkRoutes: API.OperationMethod<
  GetNetworkRoutesRequest,
  GetNetworkRoutesResponse,
  GetNetworkRoutesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks/{GlobalNetworkId}/network-routes",
    input: {
      GlobalNetworkId: 0,
      RouteTableIdentifier: {
        TransitGatewayRouteTableArn: 0,
        CoreNetworkSegmentEdge: {
          CoreNetworkId: 0,
          SegmentName: 0,
          EdgeLocation: 0,
        },
        CoreNetworkNetworkFunctionGroup: {
          CoreNetworkId: 0,
          NetworkFunctionGroupName: 0,
          EdgeLocation: 0,
        },
      },
      ExactCidrMatches: 0,
      LongestPrefixMatches: 0,
      SubnetOfMatches: 0,
      SupernetOfMatches: 0,
      PrefixListIds: 0,
      States: 0,
      Types: 0,
      DestinationFilters: 0,
    },
    output: { RouteTableTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkRoutes",
})) as any;

export type GetNetworkTelemetryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the network telemetry of the specified global network.
 */
export const getNetworkTelemetry: API.PaginatedOperationMethod<
  GetNetworkTelemetryRequest,
  GetNetworkTelemetryResponse,
  GetNetworkTelemetryError,
  Credentials | HttpClient.HttpClient,
  NetworkTelemetry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/network-telemetry",
    input: {
      GlobalNetworkId: 0,
      CoreNetworkId: D.m({ query: "coreNetworkId" }),
      RegisteredGatewayArn: D.m({ query: "registeredGatewayArn" }),
      AwsRegion: D.m({ query: "awsRegion" }),
      AccountId: D.m({ query: "accountId" }),
      ResourceType: D.m({ query: "resourceType" }),
      ResourceArn: D.m({ query: "resourceArn" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { NetworkTelemetry: D.list({ Health: { Timestamp: D.ts } }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkTelemetry",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NetworkTelemetry",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a resource policy.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /resource-policy/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type GetRouteAnalysisError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified route analysis.
 */
export const getRouteAnalysis: API.OperationMethod<
  GetRouteAnalysisRequest,
  GetRouteAnalysisResponse,
  GetRouteAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/route-analyses/{RouteAnalysisId}",
    input: { GlobalNetworkId: 0, RouteAnalysisId: 0 },
    output: { RouteAnalysis: o_RouteAnalysis },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouteAnalysis",
})) as any;

export type GetSitesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about one or more of your sites in a global network.
 */
export const getSites: API.PaginatedOperationMethod<
  GetSitesRequest,
  GetSitesResponse,
  GetSitesError,
  Credentials | HttpClient.HttpClient,
  Site
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/sites",
    input: {
      GlobalNetworkId: 0,
      SiteIds: D.m({ query: "siteIds" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Sites: D.list(o_Site) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSites",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Sites",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetSiteToSiteVpnAttachmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a site-to-site VPN attachment.
 */
export const getSiteToSiteVpnAttachment: API.OperationMethod<
  GetSiteToSiteVpnAttachmentRequest,
  GetSiteToSiteVpnAttachmentResponse,
  GetSiteToSiteVpnAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /site-to-site-vpn-attachments/{AttachmentId}",
    input: { AttachmentId: 0 },
    output: { SiteToSiteVpnAttachment: o_SiteToSiteVpnAttachment },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSiteToSiteVpnAttachment",
})) as any;

export type GetTransitGatewayConnectPeerAssociationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about one or more of your transit gateway Connect peer associations in a global network.
 */
export const getTransitGatewayConnectPeerAssociations: API.PaginatedOperationMethod<
  GetTransitGatewayConnectPeerAssociationsRequest,
  GetTransitGatewayConnectPeerAssociationsResponse,
  GetTransitGatewayConnectPeerAssociationsError,
  Credentials | HttpClient.HttpClient,
  TransitGatewayConnectPeerAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/transit-gateway-connect-peer-associations",
    input: {
      GlobalNetworkId: 0,
      TransitGatewayConnectPeerArns: D.m({
        query: "transitGatewayConnectPeerArns",
      }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTransitGatewayConnectPeerAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TransitGatewayConnectPeerAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTransitGatewayPeeringError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a transit gateway peer.
 */
export const getTransitGatewayPeering: API.OperationMethod<
  GetTransitGatewayPeeringRequest,
  GetTransitGatewayPeeringResponse,
  GetTransitGatewayPeeringError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /transit-gateway-peerings/{PeeringId}",
    input: { PeeringId: 0 },
    output: { TransitGatewayPeering: o_TransitGatewayPeering },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTransitGatewayPeering",
})) as any;

export type GetTransitGatewayRegistrationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the transit gateway registrations in a specified
 * global network.
 */
export const getTransitGatewayRegistrations: API.PaginatedOperationMethod<
  GetTransitGatewayRegistrationsRequest,
  GetTransitGatewayRegistrationsResponse,
  GetTransitGatewayRegistrationsError,
  Credentials | HttpClient.HttpClient,
  TransitGatewayRegistration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-networks/{GlobalNetworkId}/transit-gateway-registrations",
    input: {
      GlobalNetworkId: 0,
      TransitGatewayArns: D.m({ query: "transitGatewayArns" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTransitGatewayRegistrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TransitGatewayRegistrations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTransitGatewayRouteTableAttachmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a transit gateway route table attachment.
 */
export const getTransitGatewayRouteTableAttachment: API.OperationMethod<
  GetTransitGatewayRouteTableAttachmentRequest,
  GetTransitGatewayRouteTableAttachmentResponse,
  GetTransitGatewayRouteTableAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /transit-gateway-route-table-attachments/{AttachmentId}",
    input: { AttachmentId: 0 },
    output: {
      TransitGatewayRouteTableAttachment: o_TransitGatewayRouteTableAttachment,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTransitGatewayRouteTableAttachment",
})) as any;

export type GetVpcAttachmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a VPC attachment.
 */
export const getVpcAttachment: API.OperationMethod<
  GetVpcAttachmentRequest,
  GetVpcAttachmentResponse,
  GetVpcAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /vpc-attachments/{AttachmentId}",
    input: { AttachmentId: 0 },
    output: { VpcAttachment: o_VpcAttachment },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcAttachment",
})) as any;

export type ListAttachmentRoutingPolicyAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the routing policy associations for attachments in a core network.
 */
export const listAttachmentRoutingPolicyAssociations: API.PaginatedOperationMethod<
  ListAttachmentRoutingPolicyAssociationsRequest,
  ListAttachmentRoutingPolicyAssociationsResponse,
  ListAttachmentRoutingPolicyAssociationsError,
  Credentials | HttpClient.HttpClient,
  AttachmentRoutingPolicyAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /routing-policy-label/core-network/{CoreNetworkId}",
    input: {
      CoreNetworkId: 0,
      AttachmentId: D.m({ query: "attachmentId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachmentRoutingPolicyAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AttachmentRoutingPolicyAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAttachmentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of core network attachments.
 */
export const listAttachments: API.PaginatedOperationMethod<
  ListAttachmentsRequest,
  ListAttachmentsResponse,
  ListAttachmentsError,
  Credentials | HttpClient.HttpClient,
  Attachment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /attachments",
    input: {
      CoreNetworkId: D.m({ query: "coreNetworkId" }),
      AttachmentType: D.m({ query: "attachmentType" }),
      EdgeLocation: D.m({ query: "edgeLocation" }),
      State: D.m({ query: "state" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Attachments: D.list(o_Attachment) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Attachments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectPeersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of core network Connect peers.
 */
export const listConnectPeers: API.PaginatedOperationMethod<
  ListConnectPeersRequest,
  ListConnectPeersResponse,
  ListConnectPeersError,
  Credentials | HttpClient.HttpClient,
  ConnectPeerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /connect-peers",
    input: {
      CoreNetworkId: D.m({ query: "coreNetworkId" }),
      ConnectAttachmentId: D.m({ query: "connectAttachmentId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { ConnectPeers: D.list({ CreatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectPeers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectPeers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCoreNetworkPolicyVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of core network policy versions.
 */
export const listCoreNetworkPolicyVersions: API.PaginatedOperationMethod<
  ListCoreNetworkPolicyVersionsRequest,
  ListCoreNetworkPolicyVersionsResponse,
  ListCoreNetworkPolicyVersionsError,
  Credentials | HttpClient.HttpClient,
  CoreNetworkPolicyVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /core-networks/{CoreNetworkId}/core-network-policy-versions",
    input: {
      CoreNetworkId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { CoreNetworkPolicyVersions: D.list({ CreatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreNetworkPolicyVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CoreNetworkPolicyVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCoreNetworkPrefixListAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the prefix list associations for a core network.
 */
export const listCoreNetworkPrefixListAssociations: API.PaginatedOperationMethod<
  ListCoreNetworkPrefixListAssociationsRequest,
  ListCoreNetworkPrefixListAssociationsResponse,
  ListCoreNetworkPrefixListAssociationsError,
  Credentials | HttpClient.HttpClient,
  PrefixListAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /prefix-list/core-network/{CoreNetworkId}",
    input: {
      CoreNetworkId: 0,
      PrefixListArn: D.m({ query: "prefixListArn" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreNetworkPrefixListAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PrefixListAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCoreNetworkRoutingInformationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists routing information for a core network, including routes and their attributes.
 */
export const listCoreNetworkRoutingInformation: API.PaginatedOperationMethod<
  ListCoreNetworkRoutingInformationRequest,
  ListCoreNetworkRoutingInformationResponse,
  ListCoreNetworkRoutingInformationError,
  Credentials | HttpClient.HttpClient,
  CoreNetworkRoutingInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /core-networks/{CoreNetworkId}/core-network-routing-information",
    input: {
      CoreNetworkId: 0,
      SegmentName: 0,
      EdgeLocation: 0,
      NextHopFilters: 0,
      LocalPreferenceMatches: 0,
      ExactAsPathMatches: 0,
      MedMatches: 0,
      CommunityMatches: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreNetworkRoutingInformation",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CoreNetworkRoutingInformation",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCoreNetworksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of owned and shared core networks.
 */
export const listCoreNetworks: API.PaginatedOperationMethod<
  ListCoreNetworksRequest,
  ListCoreNetworksResponse,
  ListCoreNetworksError,
  Credentials | HttpClient.HttpClient,
  CoreNetworkSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /core-networks",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreNetworks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CoreNetworks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOrganizationServiceAccessStatusError = CommonErrors;
/**
 * Gets the status of the Service Linked Role (SLR) deployment for the accounts in a given Amazon Web Services Organization.
 */
export const listOrganizationServiceAccessStatus: API.OperationMethod<
  ListOrganizationServiceAccessStatusRequest,
  ListOrganizationServiceAccessStatusResponse,
  ListOrganizationServiceAccessStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /organizations/service-access",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationServiceAccessStatus",
})) as any;

export type ListPeeringsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the peerings for a core network.
 */
export const listPeerings: API.PaginatedOperationMethod<
  ListPeeringsRequest,
  ListPeeringsResponse,
  ListPeeringsError,
  Credentials | HttpClient.HttpClient,
  Peering
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /peerings",
    input: {
      CoreNetworkId: D.m({ query: "coreNetworkId" }),
      PeeringType: D.m({ query: "peeringType" }),
      EdgeLocation: D.m({ query: "edgeLocation" }),
      State: D.m({ query: "state" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Peerings: D.list(o_Peering) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPeerings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Peerings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for a specified resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutAttachmentRoutingPolicyLabelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Applies a routing policy label to an attachment for traffic routing decisions.
 */
export const putAttachmentRoutingPolicyLabel: API.OperationMethod<
  PutAttachmentRoutingPolicyLabelRequest,
  PutAttachmentRoutingPolicyLabelResponse,
  PutAttachmentRoutingPolicyLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /routing-policy-label",
    input: {
      CoreNetworkId: 0,
      AttachmentId: 0,
      RoutingPolicyLabel: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAttachmentRoutingPolicyLabel",
})) as any;

export type PutCoreNetworkPolicyError =
  | AccessDeniedException
  | ConflictException
  | CoreNetworkPolicyException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new, immutable version of a core network policy. A subsequent change set is created showing the differences between the LIVE policy and the submitted policy.
 */
export const putCoreNetworkPolicy: API.OperationMethod<
  PutCoreNetworkPolicyRequest,
  PutCoreNetworkPolicyResponse,
  PutCoreNetworkPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /core-networks/{CoreNetworkId}/core-network-policy",
    input: {
      CoreNetworkId: 0,
      PolicyDocument: 0,
      Description: 0,
      LatestVersionId: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CoreNetworkPolicy: o_CoreNetworkPolicy },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    CoreNetworkPolicyException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCoreNetworkPolicy",
})) as any;

export type PutResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a resource policy.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /resource-policy/{ResourceArn}",
    input: { PolicyDocument: 0, ResourceArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type RegisterTransitGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers a transit gateway in your global network. Not all Regions support transit
 * gateways for global networks. For a list of the supported Regions, see Region Availability in the Amazon Web Services Transit Gateways for Global
 * Networks User Guide. The transit gateway can be in any of the supported
 * Amazon Web Services Regions, but it must be owned by the same Amazon Web Services account that owns the global
 * network. You cannot register a transit gateway in more than one global network.
 */
export const registerTransitGateway: API.OperationMethod<
  RegisterTransitGatewayRequest,
  RegisterTransitGatewayResponse,
  RegisterTransitGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks/{GlobalNetworkId}/transit-gateway-registrations",
    input: { GlobalNetworkId: 0, TransitGatewayArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterTransitGateway",
})) as any;

export type RejectAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects a core network attachment request.
 */
export const rejectAttachment: API.OperationMethod<
  RejectAttachmentRequest,
  RejectAttachmentResponse,
  RejectAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /attachments/{AttachmentId}/reject",
    input: { AttachmentId: 0 },
    output: { Attachment: o_Attachment },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectAttachment",
})) as any;

export type RemoveAttachmentRoutingPolicyLabelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a routing policy label from an attachment.
 */
export const removeAttachmentRoutingPolicyLabel: API.OperationMethod<
  RemoveAttachmentRoutingPolicyLabelRequest,
  RemoveAttachmentRoutingPolicyLabelResponse,
  RemoveAttachmentRoutingPolicyLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /routing-policy-label/core-network/{CoreNetworkId}/attachment/{AttachmentId}",
    input: { CoreNetworkId: 0, AttachmentId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAttachmentRoutingPolicyLabel",
})) as any;

export type RestoreCoreNetworkPolicyVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restores a previous policy version as a new, immutable version of a core network policy. A subsequent change set is created showing the differences between the LIVE policy and restored policy.
 */
export const restoreCoreNetworkPolicyVersion: API.OperationMethod<
  RestoreCoreNetworkPolicyVersionRequest,
  RestoreCoreNetworkPolicyVersionResponse,
  RestoreCoreNetworkPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /core-networks/{CoreNetworkId}/core-network-policy-versions/{PolicyVersionId}/restore",
    input: { CoreNetworkId: 0, PolicyVersionId: 0 },
    output: { CoreNetworkPolicy: o_CoreNetworkPolicy },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreCoreNetworkPolicyVersion",
})) as any;

export type StartOrganizationServiceAccessUpdateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables the Network Manager service for an Amazon Web Services Organization. This can only be called by a management account within the organization.
 */
export const startOrganizationServiceAccessUpdate: API.OperationMethod<
  StartOrganizationServiceAccessUpdateRequest,
  StartOrganizationServiceAccessUpdateResponse,
  StartOrganizationServiceAccessUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /organizations/service-access",
    input: { Action: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOrganizationServiceAccessUpdate",
})) as any;

export type StartRouteAnalysisError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts analyzing the routing path between the specified source and destination. For more information,
 * see Route Analyzer.
 */
export const startRouteAnalysis: API.OperationMethod<
  StartRouteAnalysisRequest,
  StartRouteAnalysisResponse,
  StartRouteAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-networks/{GlobalNetworkId}/route-analyses",
    input: {
      GlobalNetworkId: 0,
      Source: i_RouteAnalysisEndpointOptionsSpecification,
      Destination: i_RouteAnalysisEndpointOptionsSpecification,
      IncludeReturnPath: 0,
      UseMiddleboxes: 0,
    },
    output: { RouteAnalysis: o_RouteAnalysis },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRouteAnalysis",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags a specified resource.
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
    input: { ResourceArn: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a specified resource.
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
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the information for an existing connection. To remove information for any of the parameters,
 * specify an empty string.
 */
export const updateConnection: API.OperationMethod<
  UpdateConnectionRequest,
  UpdateConnectionResponse,
  UpdateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /global-networks/{GlobalNetworkId}/connections/{ConnectionId}",
    input: {
      GlobalNetworkId: 0,
      ConnectionId: 0,
      LinkId: 0,
      ConnectedLinkId: 0,
      Description: 0,
    },
    output: { Connection: o_Connection },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
})) as any;

export type UpdateCoreNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the description of a core network.
 */
export const updateCoreNetwork: API.OperationMethod<
  UpdateCoreNetworkRequest,
  UpdateCoreNetworkResponse,
  UpdateCoreNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /core-networks/{CoreNetworkId}",
    input: { CoreNetworkId: 0, Description: 0 },
    output: { CoreNetwork: o_CoreNetwork },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCoreNetwork",
})) as any;

export type UpdateDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the details for an existing device. To remove information for any of the
 * parameters, specify an empty string.
 */
export const updateDevice: API.OperationMethod<
  UpdateDeviceRequest,
  UpdateDeviceResponse,
  UpdateDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /global-networks/{GlobalNetworkId}/devices/{DeviceId}",
    input: {
      GlobalNetworkId: 0,
      DeviceId: 0,
      AWSLocation: i_AWSLocation,
      Description: 0,
      Type: 0,
      Vendor: 0,
      Model: 0,
      SerialNumber: 0,
      Location: i_Location,
      SiteId: 0,
    },
    output: { Device: o_Device },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevice",
})) as any;

export type UpdateDirectConnectGatewayAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the edge locations associated with an Amazon Web Services Direct Connect gateway attachment.
 */
export const updateDirectConnectGatewayAttachment: API.OperationMethod<
  UpdateDirectConnectGatewayAttachmentRequest,
  UpdateDirectConnectGatewayAttachmentResponse,
  UpdateDirectConnectGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /direct-connect-gateway-attachments/{AttachmentId}",
    input: { AttachmentId: 0, EdgeLocations: 0 },
    output: {
      DirectConnectGatewayAttachment: o_DirectConnectGatewayAttachment,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDirectConnectGatewayAttachment",
})) as any;

export type UpdateGlobalNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing global network. To remove information for any of the parameters,
 * specify an empty string.
 */
export const updateGlobalNetwork: API.OperationMethod<
  UpdateGlobalNetworkRequest,
  UpdateGlobalNetworkResponse,
  UpdateGlobalNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /global-networks/{GlobalNetworkId}",
    input: { GlobalNetworkId: 0, Description: 0 },
    output: { GlobalNetwork: o_GlobalNetwork },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalNetwork",
})) as any;

export type UpdateLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the details for an existing link. To remove information for any of the
 * parameters, specify an empty string.
 */
export const updateLink: API.OperationMethod<
  UpdateLinkRequest,
  UpdateLinkResponse,
  UpdateLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /global-networks/{GlobalNetworkId}/links/{LinkId}",
    input: {
      GlobalNetworkId: 0,
      LinkId: 0,
      Description: 0,
      Type: 0,
      Bandwidth: i_Bandwidth,
      Provider: 0,
    },
    output: { Link: o_Link },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLink",
})) as any;

export type UpdateNetworkResourceMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the resource metadata for the specified global network.
 */
export const updateNetworkResourceMetadata: API.OperationMethod<
  UpdateNetworkResourceMetadataRequest,
  UpdateNetworkResourceMetadataResponse,
  UpdateNetworkResourceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /global-networks/{GlobalNetworkId}/network-resources/{ResourceArn}/metadata",
    input: { GlobalNetworkId: 0, ResourceArn: 0, Metadata: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkResourceMetadata",
})) as any;

export type UpdateSiteError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the information for an existing site. To remove information for any of the
 * parameters, specify an empty string.
 */
export const updateSite: API.OperationMethod<
  UpdateSiteRequest,
  UpdateSiteResponse,
  UpdateSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /global-networks/{GlobalNetworkId}/sites/{SiteId}",
    input: {
      GlobalNetworkId: 0,
      SiteId: 0,
      Description: 0,
      Location: i_Location,
    },
    output: { Site: o_Site },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSite",
})) as any;

export type UpdateVpcAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a VPC attachment.
 */
export const updateVpcAttachment: API.OperationMethod<
  UpdateVpcAttachmentRequest,
  UpdateVpcAttachmentResponse,
  UpdateVpcAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /vpc-attachments/{AttachmentId}",
    input: {
      AttachmentId: 0,
      AddSubnetArns: 0,
      RemoveSubnetArns: 0,
      Options: i_VpcOptions,
    },
    output: { VpcAttachment: o_VpcAttachment },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcAttachment",
})) as any;

const i_AWSLocation: D.LazyStruct = () => ({ Zone: 0, SubnetArn: 0 });
const i_Bandwidth: D.LazyStruct = () => ({ UploadSpeed: 0, DownloadSpeed: 0 });
const i_Location: D.LazyStruct = () => ({
  Address: 0,
  Latitude: 0,
  Longitude: 0,
});
const i_RouteAnalysisEndpointOptionsSpecification: D.LazyStruct = () => ({
  TransitGatewayAttachmentArn: 0,
  IpAddress: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_VpcOptions: D.LazyStruct = () => ({
  Ipv6Support: 0,
  ApplianceModeSupport: 0,
  DnsSupport: 0,
  SecurityGroupReferencingSupport: 0,
});
const o_Attachment: D.LazyStruct = () => ({ CreatedAt: D.ts, UpdatedAt: D.ts });
const o_ConnectAttachment: D.LazyStruct = () => ({ Attachment: o_Attachment });
const o_ConnectPeer: D.LazyStruct = () => ({ CreatedAt: D.ts });
const o_Connection: D.LazyStruct = () => ({ CreatedAt: D.ts });
const o_CoreNetwork: D.LazyStruct = () => ({ CreatedAt: D.ts });
const o_CoreNetworkPolicy: D.LazyStruct = () => ({ CreatedAt: D.ts });
const o_Device: D.LazyStruct = () => ({ CreatedAt: D.ts });
const o_DirectConnectGatewayAttachment: D.LazyStruct = () => ({
  Attachment: o_Attachment,
});
const o_GlobalNetwork: D.LazyStruct = () => ({ CreatedAt: D.ts });
const o_Link: D.LazyStruct = () => ({ CreatedAt: D.ts });
const o_Peering: D.LazyStruct = () => ({ CreatedAt: D.ts });
const o_RouteAnalysis: D.LazyStruct = () => ({ StartTimestamp: D.ts });
const o_Site: D.LazyStruct = () => ({ CreatedAt: D.ts });
const o_SiteToSiteVpnAttachment: D.LazyStruct = () => ({
  Attachment: o_Attachment,
});
const o_TransitGatewayPeering: D.LazyStruct = () => ({ Peering: o_Peering });
const o_TransitGatewayRouteTableAttachment: D.LazyStruct = () => ({
  Attachment: o_Attachment,
});
const o_VpcAttachment: D.LazyStruct = () => ({ Attachment: o_Attachment });
