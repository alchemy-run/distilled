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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "NetworkManager",
  serviceShapeName: "NetworkManager",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "networkmanager" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-07-05");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({ authSchemes: [{ name: "sigv4", signingRegion: "us-west-2" }] });
    const _p1 = () => ({ authSchemes: [{ name: "sigv4", signingRegion: "us-gov-west-1" }] });
    const _p2 = (_0: unknown) => ({
      authSchemes: [{ name: "sigv4", signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}` }],
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://networkmanager.us-west-2.amazonaws.com", _p0(), {});
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
            return e("https://networkmanager-fips.us-west-2.amazonaws.com", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e("https://networkmanager-fips.us-west-2.api.aws", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://networkmanager.us-gov-west-1.amazonaws.com", _p1(), {});
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://networkmanager.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p2(PartitionResult),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
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
  '{"url":"https://networkmanager.us-west-2.{D}","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-west-2"}]},"headers":{}}',
  [
    "us-gov-west-1",
    "us-gov-east-1",
    "aws-us-gov-global",
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CoreNetworkPolicyException
  extends /*@__PURE__*/ S.TaggedError<CoreNetworkPolicyException>()(
    "CoreNetworkPolicyException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Errors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(465, __c29, 1)).annotate({
          identifier: "CoreNetworkPolicyErrorList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
      Context: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1040, __c65, 0)).annotate({
          identifier: "ExceptionContextMap",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
      LimitCode: S.String,
      ServiceCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      Fields: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1585, __c99, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type LinkAssociationState = "PENDING" | "AVAILABLE" | "DELETING" | "DELETED" | (string & {});
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
export type ConnectionState = "PENDING" | "AVAILABLE" | "DELETING" | "UPDATING" | (string & {});
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
export type ConnectPeerState = "CREATING" | "FAILED" | "AVAILABLE" | "DELETING" | (string & {});
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
export type CoreNetworkState = "CREATING" | "UPDATING" | "AVAILABLE" | "DELETING" | (string & {});
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
export type CoreNetworkNetworkFunctionGroupList = CoreNetworkNetworkFunctionGroup[];
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
export type DeviceState = "PENDING" | "AVAILABLE" | "DELETING" | "UPDATING" | (string & {});
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
export type GlobalNetworkState = "PENDING" | "AVAILABLE" | "DELETING" | "UPDATING" | (string & {});
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
export type LinkState = "PENDING" | "AVAILABLE" | "DELETING" | "UPDATING" | (string & {});
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
export type SiteState = "PENDING" | "AVAILABLE" | "DELETING" | "UPDATING" | (string & {});
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
export type PeeringState = "CREATING" | "FAILED" | "AVAILABLE" | "DELETING" | (string & {});
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
export type ChangeStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" | "FAILED" | (string & {});
export type RoutingPolicyDirection = "inbound" | "outbound" | (string & {});
export interface RoutingPolicyAssociationDetail {
  RoutingPolicyNames?: string[];
  SharedSegments?: string[];
}
export type RoutingPolicyAssociationDetailsList = RoutingPolicyAssociationDetail[];
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
export type SegmentActionServiceInsertion = "send-via" | "send-to" | (string & {});
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
export type RouteAnalysisStatus = "RUNNING" | "COMPLETED" | "FAILED" | (string & {});
export type TransitGatewayAttachmentArn = string;
export interface RouteAnalysisEndpointOptions {
  TransitGatewayAttachmentArn?: string;
  TransitGatewayArn?: string;
  IpAddress?: string;
}
export type RouteAnalysisCompletionResultCode = "CONNECTED" | "NOT_CONNECTED" | (string & {});
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
export type TransitGatewayConnectPeerAssociationList = TransitGatewayConnectPeerAssociation[];
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
export type AttachmentRoutingPolicyAssociationsList = AttachmentRoutingPolicyAssociationSummary[];
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
  input: __S(1760, __c110, 0) as any as S.Schema<AcceptAttachmentRequest>,
  output: __S(1840, __c115, 0) as any as S.Schema<AcceptAttachmentResponse>,
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
}));

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
  input: __S(2048, __c128, 0) as any as S.Schema<AssociateConnectPeerRequest>,
  output: __S(2064, __c129, 0) as any as S.Schema<AssociateConnectPeerResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateCustomerGatewayRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<AssociateCustomerGatewayResponse>,
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
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<AssociateLinkRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<AssociateLinkResponse>,
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
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<AssociateTransitGatewayConnectPeerRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<AssociateTransitGatewayConnectPeerResponse>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<CreateConnectAttachmentRequest>,
  output: __S(210, __c13, 2) as any as S.Schema<CreateConnectAttachmentResponse>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<CreateConnectionRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<CreateConnectionResponse>,
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
}));

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
  input: __S(273, __c17, 1) as any as S.Schema<CreateConnectPeerRequest>,
  output: __S(292, __c18, 4) as any as S.Schema<CreateConnectPeerResponse>,
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
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<CreateCoreNetworkRequest>,
  output: __S(328, __c20, 8) as any as S.Schema<CreateCoreNetworkResponse>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<CreateCoreNetworkPrefixListAssociationRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<CreateCoreNetworkPrefixListAssociationResponse>,
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
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<CreateDeviceRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<CreateDeviceResponse>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<CreateDirectConnectGatewayAttachmentRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<CreateDirectConnectGatewayAttachmentResponse>,
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
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<CreateGlobalNetworkRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateGlobalNetworkResponse>,
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
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<CreateLinkRequest>,
  output: __S(560, __c35, 0) as any as S.Schema<CreateLinkResponse>,
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
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<CreateSiteRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<CreateSiteResponse>,
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
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<CreateSiteToSiteVpnAttachmentRequest>,
  output: __S(641, __c40, 1) as any as S.Schema<CreateSiteToSiteVpnAttachmentResponse>,
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
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<CreateTransitGatewayPeeringRequest>,
  output: __S(689, __c43, 1) as any as S.Schema<CreateTransitGatewayPeeringResponse>,
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
}));

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
  input: __S(704, __c44, 0) as any as S.Schema<CreateTransitGatewayRouteTableAttachmentRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<CreateTransitGatewayRouteTableAttachmentResponse>,
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
}));

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
  input: __S(736, __c46, 0) as any as S.Schema<CreateVpcAttachmentRequest>,
  output: __S(754, __c47, 2) as any as S.Schema<CreateVpcAttachmentResponse>,
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
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<DeleteAttachmentRequest>,
  output: __S(1840, __c115, 0) as any as S.Schema<DeleteAttachmentResponse>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<DeleteConnectionRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteConnectionResponse>,
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
}));

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
  input: __S(800, __c50, 0) as any as S.Schema<DeleteConnectPeerRequest>,
  output: __S(292, __c18, 4) as any as S.Schema<DeleteConnectPeerResponse>,
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
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<DeleteCoreNetworkRequest>,
  output: __S(328, __c20, 8) as any as S.Schema<DeleteCoreNetworkResponse>,
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
}));

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
  input: __S(832, __c52, 0) as any as S.Schema<DeleteCoreNetworkPolicyVersionRequest>,
  output: __S(849, __c53, 1) as any as S.Schema<DeleteCoreNetworkPolicyVersionResponse>,
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
}));

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
  input: __S(864, __c54, 0) as any as S.Schema<DeleteCoreNetworkPrefixListAssociationRequest>,
  output: __S(865, __c54, 1) as any as S.Schema<DeleteCoreNetworkPrefixListAssociationResponse>,
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
}));

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
  input: __S(880, __c55, 0) as any as S.Schema<DeleteDeviceRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DeleteDeviceResponse>,
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
}));

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
  input: __S(896, __c56, 0) as any as S.Schema<DeleteGlobalNetworkRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DeleteGlobalNetworkResponse>,
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
}));

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
  input: __S(912, __c57, 0) as any as S.Schema<DeleteLinkRequest>,
  output: __S(560, __c35, 0) as any as S.Schema<DeleteLinkResponse>,
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
}));

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
  input: __S(928, __c58, 0) as any as S.Schema<DeletePeeringRequest>,
  output: __S(929, __c58, 1) as any as S.Schema<DeletePeeringResponse>,
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
}));

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
  input: __S(944, __c59, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
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
}));

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
  input: __S(976, __c61, 0) as any as S.Schema<DeleteSiteRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<DeleteSiteResponse>,
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
}));

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
  input: __S(992, __c62, 0) as any as S.Schema<DeregisterTransitGatewayRequest>,
  output: __S(1024, __c64, 0) as any as S.Schema<DeregisterTransitGatewayResponse>,
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
}));

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
  input: __S(1056, __c66, 0) as any as S.Schema<DescribeGlobalNetworksRequest>,
  output: __S(1058, __c66, 2) as any as S.Schema<DescribeGlobalNetworksResponse>,
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
  input: __S(1072, __c67, 0) as any as S.Schema<DisassociateConnectPeerRequest>,
  output: __S(2064, __c129, 0) as any as S.Schema<DisassociateConnectPeerResponse>,
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
}));

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
  input: __S(1088, __c68, 0) as any as S.Schema<DisassociateCustomerGatewayRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DisassociateCustomerGatewayResponse>,
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
}));

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
  input: __S(1104, __c69, 0) as any as S.Schema<DisassociateLinkRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DisassociateLinkResponse>,
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
}));

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
  input: __S(1120, __c70, 0) as any as S.Schema<DisassociateTransitGatewayConnectPeerRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<DisassociateTransitGatewayConnectPeerResponse>,
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
}));

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
  input: __S(1136, __c71, 0) as any as S.Schema<ExecuteCoreNetworkChangeSetRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<ExecuteCoreNetworkChangeSetResponse>,
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
}));

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
  input: __S(1152, __c72, 0) as any as S.Schema<GetConnectAttachmentRequest>,
  output: __S(210, __c13, 2) as any as S.Schema<GetConnectAttachmentResponse>,
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
}));

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
  input: __S(1168, __c73, 0) as any as S.Schema<GetConnectionsRequest>,
  output: __S(1170, __c73, 2) as any as S.Schema<GetConnectionsResponse>,
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
  input: __S(1184, __c74, 0) as any as S.Schema<GetConnectPeerRequest>,
  output: __S(292, __c18, 4) as any as S.Schema<GetConnectPeerResponse>,
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
}));

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
  input: __S(1200, __c75, 0) as any as S.Schema<GetConnectPeerAssociationsRequest>,
  output: __S(1202, __c75, 2) as any as S.Schema<GetConnectPeerAssociationsResponse>,
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
  input: __S(1216, __c76, 0) as any as S.Schema<GetCoreNetworkRequest>,
  output: __S(328, __c20, 8) as any as S.Schema<GetCoreNetworkResponse>,
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
}));

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
  input: __S(1232, __c77, 0) as any as S.Schema<GetCoreNetworkChangeEventsRequest>,
  output: __S(1236, __c77, 4) as any as S.Schema<GetCoreNetworkChangeEventsResponse>,
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
  input: __S(1264, __c79, 0) as any as S.Schema<GetCoreNetworkChangeSetRequest>,
  output: __S(1277, __c79, 13) as any as S.Schema<GetCoreNetworkChangeSetResponse>,
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
  input: __S(1280, __c80, 0) as any as S.Schema<GetCoreNetworkPolicyRequest>,
  output: __S(849, __c53, 1) as any as S.Schema<GetCoreNetworkPolicyResponse>,
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
}));

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
  input: __S(1296, __c81, 0) as any as S.Schema<GetCustomerGatewayAssociationsRequest>,
  output: __S(1298, __c81, 2) as any as S.Schema<GetCustomerGatewayAssociationsResponse>,
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
  input: __S(1312, __c82, 0) as any as S.Schema<GetDevicesRequest>,
  output: __S(1314, __c82, 2) as any as S.Schema<GetDevicesResponse>,
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
  input: __S(1328, __c83, 0) as any as S.Schema<GetDirectConnectGatewayAttachmentRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<GetDirectConnectGatewayAttachmentResponse>,
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
}));

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
  input: __S(1344, __c84, 0) as any as S.Schema<GetLinkAssociationsRequest>,
  output: __S(1346, __c84, 2) as any as S.Schema<GetLinkAssociationsResponse>,
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
  input: __S(1360, __c85, 0) as any as S.Schema<GetLinksRequest>,
  output: __S(1362, __c85, 2) as any as S.Schema<GetLinksResponse>,
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
  input: __S(1376, __c86, 0) as any as S.Schema<GetNetworkResourceCountsRequest>,
  output: __S(1379, __c86, 3) as any as S.Schema<GetNetworkResourceCountsResponse>,
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
  input: __S(1392, __c87, 0) as any as S.Schema<GetNetworkResourceRelationshipsRequest>,
  output: __S(1395, __c87, 3) as any as S.Schema<GetNetworkResourceRelationshipsResponse>,
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
  input: __S(1408, __c88, 0) as any as S.Schema<GetNetworkResourcesRequest>,
  output: __S(1411, __c88, 3) as any as S.Schema<GetNetworkResourcesResponse>,
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
  input: __S(1428, __c89, 4) as any as S.Schema<GetNetworkRoutesRequest>,
  output: __S(1433, __c89, 9) as any as S.Schema<GetNetworkRoutesResponse>,
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
}));

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
  input: __S(1456, __c91, 0) as any as S.Schema<GetNetworkTelemetryRequest>,
  output: __S(1460, __c91, 4) as any as S.Schema<GetNetworkTelemetryResponse>,
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
  input: __S(1472, __c92, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(1473, __c92, 1) as any as S.Schema<GetResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

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
  input: __S(1488, __c93, 0) as any as S.Schema<GetRouteAnalysisRequest>,
  output: __S(1511, __c94, 7) as any as S.Schema<GetRouteAnalysisResponse>,
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
}));

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
  input: __S(1520, __c95, 0) as any as S.Schema<GetSitesRequest>,
  output: __S(1522, __c95, 2) as any as S.Schema<GetSitesResponse>,
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
  input: __S(1536, __c96, 0) as any as S.Schema<GetSiteToSiteVpnAttachmentRequest>,
  output: __S(641, __c40, 1) as any as S.Schema<GetSiteToSiteVpnAttachmentResponse>,
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
}));

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
  input: __S(1552, __c97, 0) as any as S.Schema<GetTransitGatewayConnectPeerAssociationsRequest>,
  output: __S(1554, __c97, 2) as any as S.Schema<GetTransitGatewayConnectPeerAssociationsResponse>,
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
  input: __S(1568, __c98, 0) as any as S.Schema<GetTransitGatewayPeeringRequest>,
  output: __S(689, __c43, 1) as any as S.Schema<GetTransitGatewayPeeringResponse>,
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
}));

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
  input: __S(1600, __c100, 0) as any as S.Schema<GetTransitGatewayRegistrationsRequest>,
  output: __S(1602, __c100, 2) as any as S.Schema<GetTransitGatewayRegistrationsResponse>,
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
  input: __S(1616, __c101, 0) as any as S.Schema<GetTransitGatewayRouteTableAttachmentRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<GetTransitGatewayRouteTableAttachmentResponse>,
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
}));

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
  input: __S(1632, __c102, 0) as any as S.Schema<GetVpcAttachmentRequest>,
  output: __S(754, __c47, 2) as any as S.Schema<GetVpcAttachmentResponse>,
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
}));

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
  input: __S(1648, __c103, 0) as any as S.Schema<ListAttachmentRoutingPolicyAssociationsRequest>,
  output: __S(1651, __c103, 3) as any as S.Schema<ListAttachmentRoutingPolicyAssociationsResponse>,
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
  input: __S(1664, __c104, 0) as any as S.Schema<ListAttachmentsRequest>,
  output: __S(1666, __c104, 2) as any as S.Schema<ListAttachmentsResponse>,
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
  input: __S(1680, __c105, 0) as any as S.Schema<ListConnectPeersRequest>,
  output: __S(1683, __c105, 3) as any as S.Schema<ListConnectPeersResponse>,
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
  input: __S(1696, __c106, 0) as any as S.Schema<ListCoreNetworkPolicyVersionsRequest>,
  output: __S(1699, __c106, 3) as any as S.Schema<ListCoreNetworkPolicyVersionsResponse>,
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
  input: __S(1712, __c107, 0) as any as S.Schema<ListCoreNetworkPrefixListAssociationsRequest>,
  output: __S(1714, __c107, 2) as any as S.Schema<ListCoreNetworkPrefixListAssociationsResponse>,
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
  input: __S(1728, __c108, 0) as any as S.Schema<ListCoreNetworkRoutingInformationRequest>,
  output: __S(1732, __c108, 4) as any as S.Schema<ListCoreNetworkRoutingInformationResponse>,
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
  input: __S(1744, __c109, 0) as any as S.Schema<ListCoreNetworksRequest>,
  output: __S(1747, __c109, 3) as any as S.Schema<ListCoreNetworksResponse>,
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
  input: __S(1856, __c116, 0) as any as S.Schema<ListOrganizationServiceAccessStatusRequest>,
  output: __S(1857, __c116, 1) as any as S.Schema<ListOrganizationServiceAccessStatusResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationServiceAccessStatus",
}));

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
  input: __S(1888, __c118, 0) as any as S.Schema<ListPeeringsRequest>,
  output: __S(1890, __c118, 2) as any as S.Schema<ListPeeringsResponse>,
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
  input: __S(1904, __c119, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1905, __c119, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(1920, __c120, 0) as any as S.Schema<PutAttachmentRoutingPolicyLabelRequest>,
  output: __S(1936, __c121, 0) as any as S.Schema<PutAttachmentRoutingPolicyLabelResponse>,
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
}));

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
  input: __S(1952, __c122, 0) as any as S.Schema<PutCoreNetworkPolicyRequest>,
  output: __S(849, __c53, 1) as any as S.Schema<PutCoreNetworkPolicyResponse>,
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
}));

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
  input: __S(1968, __c123, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<PutResourcePolicyResponse>,
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
}));

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
  input: __S(1984, __c124, 0) as any as S.Schema<RegisterTransitGatewayRequest>,
  output: __S(1024, __c64, 0) as any as S.Schema<RegisterTransitGatewayResponse>,
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
}));

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
  input: __S(2000, __c125, 0) as any as S.Schema<RejectAttachmentRequest>,
  output: __S(1840, __c115, 0) as any as S.Schema<RejectAttachmentResponse>,
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
}));

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
  input: __S(2016, __c126, 0) as any as S.Schema<RemoveAttachmentRoutingPolicyLabelRequest>,
  output: __S(1936, __c121, 0) as any as S.Schema<RemoveAttachmentRoutingPolicyLabelResponse>,
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
}));

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
  input: __S(2032, __c127, 0) as any as S.Schema<RestoreCoreNetworkPolicyVersionRequest>,
  output: __S(849, __c53, 1) as any as S.Schema<RestoreCoreNetworkPolicyVersionResponse>,
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
}));

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
  input: __S(2096, __c131, 0) as any as S.Schema<StartOrganizationServiceAccessUpdateRequest>,
  output: __S(2097, __c131, 1) as any as S.Schema<StartOrganizationServiceAccessUpdateResponse>,
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
}));

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
  input: __S(2113, __c132, 1) as any as S.Schema<StartRouteAnalysisRequest>,
  output: __S(1511, __c94, 7) as any as S.Schema<StartRouteAnalysisResponse>,
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
}));

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
  input: __S(2128, __c133, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(2144, __c134, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(960, __c60, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(2160, __c135, 0) as any as S.Schema<UpdateConnectionRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<UpdateConnectionResponse>,
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
}));

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
  input: __S(2176, __c136, 0) as any as S.Schema<UpdateCoreNetworkRequest>,
  output: __S(328, __c20, 8) as any as S.Schema<UpdateCoreNetworkResponse>,
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
}));

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
  input: __S(2192, __c137, 0) as any as S.Schema<UpdateDeviceRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<UpdateDeviceResponse>,
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
}));

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
  input: __S(2208, __c138, 0) as any as S.Schema<UpdateDirectConnectGatewayAttachmentRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<UpdateDirectConnectGatewayAttachmentResponse>,
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
}));

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
  input: __S(2224, __c139, 0) as any as S.Schema<UpdateGlobalNetworkRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UpdateGlobalNetworkResponse>,
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
}));

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
  input: __S(2240, __c140, 0) as any as S.Schema<UpdateLinkRequest>,
  output: __S(560, __c35, 0) as any as S.Schema<UpdateLinkResponse>,
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
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<UpdateNetworkResourceMetadataRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<UpdateNetworkResourceMetadataResponse>,
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
}));

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
  input: __S(64, __c4, 0) as any as S.Schema<UpdateSiteRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<UpdateSiteResponse>,
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
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<UpdateVpcAttachmentRequest>,
  output: __S(754, __c47, 2) as any as S.Schema<UpdateVpcAttachmentResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CustomerGatewayArn: S.String,
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          DeviceId: S.String,
          LinkId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/global-networks/{GlobalNetworkId}/customer-gateway-associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateCustomerGatewayRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CustomerGatewayAssociation: S.optional(__S(32, __c2, 0)) }),
      ).annotate({ identifier: "AssociateCustomerGatewayResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CustomerGatewayArn: S.optional(S.String),
          GlobalNetworkId: S.optional(S.String),
          DeviceId: S.optional(S.String),
          LinkId: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomerGatewayAssociation" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Metadata: __S(1040, __c65, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/global-networks/{GlobalNetworkId}/network-resources/{ResourceArn}/metadata",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNetworkResourceMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), Metadata: S.optional(__S(1040, __c65, 0)) }),
      ).annotate({ identifier: "UpdateNetworkResourceMetadataResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          SiteId: S.String.pipe(T.HttpLabel("SiteId")),
          Description: S.optional(S.String),
          Location: S.optional(__S(384, __c24, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/global-networks/{GlobalNetworkId}/sites/{SiteId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSiteRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AttachmentId: S.String.pipe(T.HttpLabel("AttachmentId")),
          AddSubnetArns: S.optional(__S(1792, __c112, 0)),
          RemoveSubnetArns: S.optional(__S(1792, __c112, 0)),
          Options: S.optional(__S(752, __c47, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/vpc-attachments/{AttachmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVpcAttachmentRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          DeviceId: S.String,
          LinkId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/global-networks/{GlobalNetworkId}/link-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateLinkRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LinkAssociation: S.optional(__S(128, __c8, 0)) })).annotate(
        { identifier: "AssociateLinkResponse" },
      );
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.optional(S.String),
          DeviceId: S.optional(S.String),
          LinkId: S.optional(S.String),
          LinkAssociationState: S.optional(S.String),
        }),
      ).annotate({ identifier: "LinkAssociation" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          TransitGatewayConnectPeerArn: S.String,
          DeviceId: S.String,
          LinkId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/global-networks/{GlobalNetworkId}/transit-gateway-connect-peer-associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateTransitGatewayConnectPeerRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransitGatewayConnectPeerAssociation: S.optional(__S(176, __c11, 0)) }),
      ).annotate({ identifier: "AssociateTransitGatewayConnectPeerResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TransitGatewayConnectPeerArn: S.optional(S.String),
          GlobalNetworkId: S.optional(S.String),
          DeviceId: S.optional(S.String),
          LinkId: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransitGatewayConnectPeerAssociation" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String,
          EdgeLocation: S.String,
          TransportAttachmentId: S.String,
          RoutingPolicyLabel: S.optional(S.String),
          Options: __S(208, __c13, 0),
          Tags: S.optional(__S(1777, __c111, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/connect-attachments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConnectAttachmentRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Protocol: S.optional(S.String) })).annotate({
        identifier: "ConnectAttachmentOptions",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Attachment: S.optional(__S(1826, __c114, 2)),
          TransportAttachmentId: S.optional(S.String),
          Options: S.optional(__S(208, __c13, 0)),
        }),
      ).annotate({ identifier: "ConnectAttachment" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ConnectAttachment: S.optional(__S(209, __c13, 1)) }),
      ).annotate({ identifier: "CreateConnectAttachmentResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          DeviceId: S.String,
          ConnectedDeviceId: S.String,
          LinkId: S.optional(S.String),
          ConnectedLinkId: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/global-networks/{GlobalNetworkId}/connections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConnectionRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionId: S.optional(S.String),
          ConnectionArn: S.optional(S.String),
          GlobalNetworkId: S.optional(S.String),
          DeviceId: S.optional(S.String),
          ConnectedDeviceId: S.optional(S.String),
          LinkId: S.optional(S.String),
          ConnectedLinkId: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
        }),
      ).annotate({ identifier: "Connection" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Connection: S.optional(__S(240, __c15, 0)) })).annotate({
        identifier: "CreateConnectionResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PeerAsn: S.optional(S.Number) })).annotate({
        identifier: "BgpOptions",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectAttachmentId: S.String,
          CoreNetworkAddress: S.optional(S.String),
          PeerAddress: S.String,
          BgpOptions: S.optional(__S(272, __c17, 0)),
          InsideCidrBlocks: S.optional(__S(1792, __c112, 0)),
          Tags: S.optional(__S(1777, __c111, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SubnetArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/connect-peers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConnectPeerRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkAsn: S.optional(S.Number),
          PeerAsn: S.optional(S.Number),
          CoreNetworkAddress: S.optional(S.String),
          PeerAddress: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectPeerBgpConfiguration" });
    case 1:
      return S.Array(__S(288, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkAddress: S.optional(S.String),
          PeerAddress: S.optional(S.String),
          InsideCidrBlocks: S.optional(__S(1792, __c112, 0)),
          Protocol: S.optional(S.String),
          BgpConfigurations: S.optional(__S(289, __c18, 1)),
        }),
      ).annotate({ identifier: "ConnectPeerConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String),
          ConnectAttachmentId: S.optional(S.String),
          ConnectPeerId: S.optional(S.String),
          EdgeLocation: S.optional(S.String),
          State: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Configuration: S.optional(__S(290, __c18, 2)),
          Tags: S.optional(__S(1777, __c111, 1)),
          SubnetArn: S.optional(S.String),
          LastModificationErrors: S.optional(__S(1809, __c113, 1)),
        }),
      ).annotate({ identifier: "ConnectPeer" });
    case 4:
      return S.suspend(() => S.Struct({ ConnectPeer: S.optional(__S(291, __c18, 3)) })).annotate({
        identifier: "CreateConnectPeerResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String,
          Description: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
          PolicyDocument: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/core-networks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateCoreNetworkRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          EdgeLocations: S.optional(__S(1792, __c112, 0)),
          SharedSegments: S.optional(__S(1792, __c112, 0)),
        }),
      ).annotate({ identifier: "CoreNetworkSegment" });
    case 1:
      return S.Array(__S(320, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SendVia: S.optional(__S(1792, __c112, 0)),
          SendTo: S.optional(__S(1792, __c112, 0)),
        }),
      ).annotate({ identifier: "ServiceInsertionSegments" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          EdgeLocations: S.optional(__S(1792, __c112, 0)),
          Segments: S.optional(__S(322, __c20, 2)),
        }),
      ).annotate({ identifier: "CoreNetworkNetworkFunctionGroup" });
    case 4:
      return S.Array(__S(323, __c20, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          EdgeLocation: S.optional(S.String),
          Asn: S.optional(S.Number),
          InsideCidrBlocks: S.optional(__S(1792, __c112, 0)),
        }),
      ).annotate({ identifier: "CoreNetworkEdge" });
    case 6:
      return S.Array(__S(325, __c20, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.optional(S.String),
          CoreNetworkId: S.optional(S.String),
          CoreNetworkArn: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          Segments: S.optional(__S(321, __c20, 1)),
          NetworkFunctionGroups: S.optional(__S(324, __c20, 4)),
          Edges: S.optional(__S(326, __c20, 6)),
          Tags: S.optional(__S(1777, __c111, 1)),
        }),
      ).annotate({ identifier: "CoreNetwork" });
    case 8:
      return S.suspend(() => S.Struct({ CoreNetwork: S.optional(__S(327, __c20, 7)) })).annotate({
        identifier: "CreateCoreNetworkResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String,
          PrefixListArn: S.String,
          PrefixListAlias: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/prefix-list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateCoreNetworkPrefixListAssociationRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String),
          PrefixListArn: S.optional(S.String),
          PrefixListAlias: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateCoreNetworkPrefixListAssociationResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          AWSLocation: S.optional(__S(400, __c25, 0)),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          Vendor: S.optional(S.String),
          Model: S.optional(S.String),
          SerialNumber: S.optional(S.String),
          Location: S.optional(__S(384, __c24, 0)),
          SiteId: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/global-networks/{GlobalNetworkId}/devices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDeviceRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Address: S.optional(S.String),
          Latitude: S.optional(S.String),
          Longitude: S.optional(S.String),
        }),
      ).annotate({ identifier: "Location" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Zone: S.optional(S.String), SubnetArn: S.optional(S.String) }),
      ).annotate({ identifier: "AWSLocation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeviceId: S.optional(S.String),
          DeviceArn: S.optional(S.String),
          GlobalNetworkId: S.optional(S.String),
          AWSLocation: S.optional(__S(400, __c25, 0)),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          Vendor: S.optional(S.String),
          Model: S.optional(S.String),
          SerialNumber: S.optional(S.String),
          Location: S.optional(__S(384, __c24, 0)),
          SiteId: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
        }),
      ).annotate({ identifier: "Device" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Device: S.optional(__S(401, __c25, 1)) })).annotate({
        identifier: "CreateDeviceResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String,
          DirectConnectGatewayArn: S.String,
          RoutingPolicyLabel: S.optional(S.String),
          EdgeLocations: __S(1792, __c112, 0),
          Tags: S.optional(__S(1777, __c111, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/direct-connect-gateway-attachments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDirectConnectGatewayAttachmentRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Attachment: S.optional(__S(1826, __c114, 2)),
          DirectConnectGatewayArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DirectConnectGatewayAttachment" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DirectConnectGatewayAttachment: S.optional(__S(448, __c28, 0)) }),
      ).annotate({ identifier: "CreateDirectConnectGatewayAttachmentResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.String, Message: S.String, Path: S.optional(S.String) }),
      ).annotate({ identifier: "CoreNetworkPolicyError" });
    case 1:
      return S.Array(__S(464, __c29, 0));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/global-networks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateGlobalNetworkRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.optional(S.String),
          GlobalNetworkArn: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
        }),
      ).annotate({ identifier: "GlobalNetwork" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ GlobalNetwork: S.optional(__S(496, __c31, 0)) })).annotate({
        identifier: "CreateGlobalNetworkResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          Bandwidth: __S(544, __c34, 0),
          Provider: S.optional(S.String),
          SiteId: S.String,
          Tags: S.optional(__S(1777, __c111, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/global-networks/{GlobalNetworkId}/links" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLinkRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UploadSpeed: S.optional(S.Number), DownloadSpeed: S.optional(S.Number) }),
      ).annotate({ identifier: "Bandwidth" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LinkId: S.optional(S.String),
          LinkArn: S.optional(S.String),
          GlobalNetworkId: S.optional(S.String),
          SiteId: S.optional(S.String),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          Bandwidth: S.optional(__S(544, __c34, 0)),
          Provider: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
        }),
      ).annotate({ identifier: "Link" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Link: S.optional(__S(545, __c34, 1)) })).annotate({
        identifier: "CreateLinkResponse",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          Description: S.optional(S.String),
          Location: S.optional(__S(384, __c24, 0)),
          Tags: S.optional(__S(1777, __c111, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/global-networks/{GlobalNetworkId}/sites" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSiteRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Site: S.optional(__S(608, __c38, 0)) })).annotate({
        identifier: "CreateSiteResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SiteId: S.optional(S.String),
          SiteArn: S.optional(S.String),
          GlobalNetworkId: S.optional(S.String),
          Description: S.optional(S.String),
          Location: S.optional(__S(384, __c24, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
        }),
      ).annotate({ identifier: "Site" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String,
          VpnConnectionArn: S.String,
          RoutingPolicyLabel: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/site-to-site-vpn-attachments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSiteToSiteVpnAttachmentRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Attachment: S.optional(__S(1826, __c114, 2)),
          VpnConnectionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SiteToSiteVpnAttachment" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SiteToSiteVpnAttachment: S.optional(__S(640, __c40, 0)) }),
      ).annotate({ identifier: "CreateSiteToSiteVpnAttachmentResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String,
          TransitGatewayArn: S.String,
          Tags: S.optional(__S(1777, __c111, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/transit-gateway-peerings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTransitGatewayPeeringRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MissingPermission: S.optional(S.String) })).annotate({
        identifier: "PermissionsErrorContext",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Code: S.optional(S.String),
          Message: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          RequestId: S.optional(S.String),
          MissingPermissionsContext: S.optional(__S(672, __c42, 0)),
        }),
      ).annotate({ identifier: "PeeringError" });
    case 2:
      return S.Array(__S(673, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String),
          CoreNetworkArn: S.optional(S.String),
          PeeringId: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          PeeringType: S.optional(S.String),
          State: S.optional(S.String),
          EdgeLocation: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModificationErrors: S.optional(__S(674, __c42, 2)),
        }),
      ).annotate({ identifier: "Peering" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Peering: S.optional(__S(675, __c42, 3)),
          TransitGatewayArn: S.optional(S.String),
          TransitGatewayPeeringAttachmentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransitGatewayPeering" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TransitGatewayPeering: S.optional(__S(688, __c43, 0)) }),
      ).annotate({ identifier: "CreateTransitGatewayPeeringResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PeeringId: S.String,
          TransitGatewayRouteTableArn: S.String,
          RoutingPolicyLabel: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/transit-gateway-route-table-attachments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTransitGatewayRouteTableAttachmentRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Attachment: S.optional(__S(1826, __c114, 2)),
          PeeringId: S.optional(S.String),
          TransitGatewayRouteTableArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransitGatewayRouteTableAttachment" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TransitGatewayRouteTableAttachment: S.optional(__S(720, __c45, 0)) }),
      ).annotate({ identifier: "CreateTransitGatewayRouteTableAttachmentResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String,
          VpcArn: S.String,
          SubnetArns: __S(1792, __c112, 0),
          Options: S.optional(__S(752, __c47, 0)),
          RoutingPolicyLabel: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/vpc-attachments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateVpcAttachmentRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Ipv6Support: S.optional(S.Boolean),
          ApplianceModeSupport: S.optional(S.Boolean),
          DnsSupport: S.optional(S.Boolean),
          SecurityGroupReferencingSupport: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "VpcOptions" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Attachment: S.optional(__S(1826, __c114, 2)),
          SubnetArns: S.optional(__S(1792, __c112, 0)),
          Options: S.optional(__S(752, __c47, 0)),
        }),
      ).annotate({ identifier: "VpcAttachment" });
    case 2:
      return S.suspend(() => S.Struct({ VpcAttachment: S.optional(__S(753, __c47, 1)) })).annotate({
        identifier: "CreateVpcAttachmentResponse",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttachmentId: S.String.pipe(T.HttpLabel("AttachmentId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/attachments/{AttachmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAttachmentRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/global-networks/{GlobalNetworkId}/connections/{ConnectionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectionRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectPeerId: S.String.pipe(T.HttpLabel("ConnectPeerId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/connect-peers/{ConnectPeerId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectPeerRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/core-networks/{CoreNetworkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCoreNetworkRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          PolicyVersionId: S.Number.pipe(T.HttpLabel("PolicyVersionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/core-networks/{CoreNetworkId}/core-network-policy-versions/{PolicyVersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCoreNetworkPolicyVersionRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String),
          PolicyVersionId: S.optional(S.Number),
          Alias: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ChangeSetState: S.optional(S.String),
          PolicyErrors: S.optional(__S(465, __c29, 1)),
          PolicyDocument: S.optional(S.String),
        }),
      ).annotate({ identifier: "CoreNetworkPolicy" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CoreNetworkPolicy: S.optional(__S(848, __c53, 0)) }),
      ).annotate({ identifier: "DeleteCoreNetworkPolicyVersionResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          PrefixListArn: S.String.pipe(T.HttpLabel("PrefixListArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/prefix-list/{PrefixListArn}/core-network/{CoreNetworkId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCoreNetworkPrefixListAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CoreNetworkId: S.optional(S.String), PrefixListArn: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteCoreNetworkPrefixListAssociationResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          DeviceId: S.String.pipe(T.HttpLabel("DeviceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/global-networks/{GlobalNetworkId}/devices/{DeviceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDeviceRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/global-networks/{GlobalNetworkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGlobalNetworkRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          LinkId: S.String.pipe(T.HttpLabel("LinkId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/global-networks/{GlobalNetworkId}/links/{LinkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLinkRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PeeringId: S.String.pipe(T.HttpLabel("PeeringId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/peerings/{PeeringId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePeeringRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Peering: S.optional(__S(675, __c42, 3)) })).annotate({
        identifier: "DeletePeeringResponse",
      });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/resource-policy/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteResourcePolicyResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          SiteId: S.String.pipe(T.HttpLabel("SiteId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/global-networks/{GlobalNetworkId}/sites/{SiteId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSiteRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          TransitGatewayArn: S.String.pipe(T.HttpLabel("TransitGatewayArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/global-networks/{GlobalNetworkId}/transit-gateway-registrations/{TransitGatewayArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterTransitGatewayRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "TransitGatewayRegistrationStateReason" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.optional(S.String),
          TransitGatewayArn: S.optional(S.String),
          State: S.optional(__S(1008, __c63, 0)),
        }),
      ).annotate({ identifier: "TransitGatewayRegistration" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransitGatewayRegistration: S.optional(__S(1009, __c63, 1)) }),
      ).annotate({ identifier: "DeregisterTransitGatewayResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkIds: S.optional(__S(1792, __c112, 0)).pipe(T.HttpQuery("globalNetworkIds")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/global-networks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeGlobalNetworksRequest" });
    case 1:
      return S.Array(__S(496, __c31, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworks: S.optional(__S(1057, __c66, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeGlobalNetworksResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          ConnectPeerId: S.String.pipe(T.HttpLabel("ConnectPeerId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/global-networks/{GlobalNetworkId}/connect-peer-associations/{ConnectPeerId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateConnectPeerRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          CustomerGatewayArn: S.String.pipe(T.HttpLabel("CustomerGatewayArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/global-networks/{GlobalNetworkId}/customer-gateway-associations/{CustomerGatewayArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateCustomerGatewayRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          DeviceId: S.String.pipe(T.HttpQuery("deviceId")),
          LinkId: S.String.pipe(T.HttpQuery("linkId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/global-networks/{GlobalNetworkId}/link-associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateLinkRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          TransitGatewayConnectPeerArn: S.String.pipe(T.HttpLabel("TransitGatewayConnectPeerArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/global-networks/{GlobalNetworkId}/transit-gateway-connect-peer-associations/{TransitGatewayConnectPeerArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateTransitGatewayConnectPeerRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          PolicyVersionId: S.Number.pipe(T.HttpLabel("PolicyVersionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/core-networks/{CoreNetworkId}/core-network-change-sets/{PolicyVersionId}/execute",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExecuteCoreNetworkChangeSetRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttachmentId: S.String.pipe(T.HttpLabel("AttachmentId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/connect-attachments/{AttachmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectAttachmentRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          ConnectionIds: S.optional(__S(1792, __c112, 0)).pipe(T.HttpQuery("connectionIds")),
          DeviceId: S.optional(S.String).pipe(T.HttpQuery("deviceId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/global-networks/{GlobalNetworkId}/connections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectionsRequest" });
    case 1:
      return S.Array(__S(240, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Connections: S.optional(__S(1169, __c73, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetConnectionsResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectPeerId: S.String.pipe(T.HttpLabel("ConnectPeerId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/connect-peers/{ConnectPeerId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectPeerRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          ConnectPeerIds: S.optional(__S(1792, __c112, 0)).pipe(T.HttpQuery("connectPeerIds")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/global-networks/{GlobalNetworkId}/connect-peer-associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectPeerAssociationsRequest" });
    case 1:
      return S.Array(__S(2080, __c130, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConnectPeerAssociations: S.optional(__S(1201, __c75, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetConnectPeerAssociationsResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/core-networks/{CoreNetworkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCoreNetworkRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          PolicyVersionId: S.Number.pipe(T.HttpLabel("PolicyVersionId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/core-networks/{CoreNetworkId}/core-network-change-events/{PolicyVersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCoreNetworkChangeEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EdgeLocation: S.optional(S.String),
          PeerEdgeLocation: S.optional(S.String),
          RoutingPolicyDirection: S.optional(S.String),
          SegmentName: S.optional(S.String),
          NetworkFunctionGroupName: S.optional(S.String),
          AttachmentId: S.optional(S.String),
          Cidr: S.optional(S.String),
          RoutingPolicyAssociationDetails: S.optional(__S(1249, __c78, 1)),
        }),
      ).annotate({ identifier: "CoreNetworkChangeEventValues" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Action: S.optional(S.String),
          IdentifierPath: S.optional(S.String),
          EventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          Values: S.optional(__S(1233, __c77, 1)),
        }),
      ).annotate({ identifier: "CoreNetworkChangeEvent" });
    case 3:
      return S.Array(__S(1234, __c77, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkChangeEvents: S.optional(__S(1235, __c77, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCoreNetworkChangeEventsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RoutingPolicyNames: S.optional(__S(1792, __c112, 0)),
          SharedSegments: S.optional(__S(1792, __c112, 0)),
        }),
      ).annotate({ identifier: "RoutingPolicyAssociationDetail" });
    case 1:
      return S.Array(__S(1248, __c78, 0));
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          PolicyVersionId: S.Number.pipe(T.HttpLabel("PolicyVersionId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/core-networks/{CoreNetworkId}/core-network-change-sets/{PolicyVersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCoreNetworkChangeSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ WhenSentToSegmentsList: S.optional(__S(1792, __c112, 0)) }),
      ).annotate({ identifier: "WhenSentTo" });
    case 2:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "NetworkFunctionGroup",
      });
    case 3:
      return S.Array(__S(1266, __c79, 2));
    case 4:
      return S.Array(__S(1792, __c112, 0));
    case 5:
      return S.suspend(() =>
        S.Struct({ EdgeSets: S.optional(__S(1268, __c79, 4)), UseEdge: S.optional(S.String) }),
      ).annotate({ identifier: "EdgeOverride" });
    case 6:
      return S.Array(__S(1269, __c79, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          NetworkFunctionGroups: S.optional(__S(1267, __c79, 3)),
          WithEdgeOverrides: S.optional(__S(1270, __c79, 6)),
        }),
      ).annotate({ identifier: "Via" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(S.String),
          Mode: S.optional(S.String),
          WhenSentTo: S.optional(__S(1265, __c79, 1)),
          Via: S.optional(__S(1271, __c79, 7)),
        }),
      ).annotate({ identifier: "ServiceInsertionAction" });
    case 9:
      return S.Array(__S(1272, __c79, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          SegmentName: S.optional(S.String),
          NetworkFunctionGroupName: S.optional(S.String),
          EdgeLocations: S.optional(__S(1792, __c112, 0)),
          Asn: S.optional(S.Number),
          Cidr: S.optional(S.String),
          DestinationIdentifier: S.optional(S.String),
          InsideCidrBlocks: S.optional(__S(1792, __c112, 0)),
          SharedSegments: S.optional(__S(1792, __c112, 0)),
          ServiceInsertionActions: S.optional(__S(1273, __c79, 9)),
          VpnEcmpSupport: S.optional(S.Boolean),
          DnsSupport: S.optional(S.Boolean),
          SecurityGroupReferencingSupport: S.optional(S.Boolean),
          RoutingPolicyDirection: S.optional(S.String),
          RoutingPolicy: S.optional(S.String),
          PeerEdgeLocations: S.optional(__S(1792, __c112, 0)),
          AttachmentId: S.optional(S.String),
          RoutingPolicyAssociationDetails: S.optional(__S(1249, __c78, 1)),
        }),
      ).annotate({ identifier: "CoreNetworkChangeValues" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Action: S.optional(S.String),
          Identifier: S.optional(S.String),
          PreviousValues: S.optional(__S(1274, __c79, 10)),
          NewValues: S.optional(__S(1274, __c79, 10)),
          IdentifierPath: S.optional(S.String),
        }),
      ).annotate({ identifier: "CoreNetworkChange" });
    case 12:
      return S.Array(__S(1275, __c79, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkChanges: S.optional(__S(1276, __c79, 12)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCoreNetworkChangeSetResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          PolicyVersionId: S.optional(S.Number).pipe(T.HttpQuery("policyVersionId")),
          Alias: S.optional(S.String).pipe(T.HttpQuery("alias")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/core-networks/{CoreNetworkId}/core-network-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCoreNetworkPolicyRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          CustomerGatewayArns: S.optional(__S(1792, __c112, 0)).pipe(
            T.HttpQuery("customerGatewayArns"),
          ),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/global-networks/{GlobalNetworkId}/customer-gateway-associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomerGatewayAssociationsRequest" });
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CustomerGatewayAssociations: S.optional(__S(1297, __c81, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCustomerGatewayAssociationsResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          DeviceIds: S.optional(__S(1792, __c112, 0)).pipe(T.HttpQuery("deviceIds")),
          SiteId: S.optional(S.String).pipe(T.HttpQuery("siteId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/global-networks/{GlobalNetworkId}/devices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDevicesRequest" });
    case 1:
      return S.Array(__S(401, __c25, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Devices: S.optional(__S(1313, __c82, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetDevicesResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttachmentId: S.String.pipe(T.HttpLabel("AttachmentId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/direct-connect-gateway-attachments/{AttachmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDirectConnectGatewayAttachmentRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          DeviceId: S.optional(S.String).pipe(T.HttpQuery("deviceId")),
          LinkId: S.optional(S.String).pipe(T.HttpQuery("linkId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/global-networks/{GlobalNetworkId}/link-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLinkAssociationsRequest" });
    case 1:
      return S.Array(__S(128, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          LinkAssociations: S.optional(__S(1345, __c84, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetLinkAssociationsResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          LinkIds: S.optional(__S(1792, __c112, 0)).pipe(T.HttpQuery("linkIds")),
          SiteId: S.optional(S.String).pipe(T.HttpQuery("siteId")),
          Type: S.optional(S.String).pipe(T.HttpQuery("type")),
          Provider: S.optional(S.String).pipe(T.HttpQuery("provider")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/global-networks/{GlobalNetworkId}/links" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLinksRequest" });
    case 1:
      return S.Array(__S(545, __c34, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Links: S.optional(__S(1361, __c85, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetLinksResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/global-networks/{GlobalNetworkId}/network-resource-count",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkResourceCountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.optional(S.String), Count: S.optional(S.Number) }),
      ).annotate({ identifier: "NetworkResourceCount" });
    case 2:
      return S.Array(__S(1377, __c86, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NetworkResourceCounts: S.optional(__S(1378, __c86, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetNetworkResourceCountsResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          CoreNetworkId: S.optional(S.String).pipe(T.HttpQuery("coreNetworkId")),
          RegisteredGatewayArn: S.optional(S.String).pipe(T.HttpQuery("registeredGatewayArn")),
          AwsRegion: S.optional(S.String).pipe(T.HttpQuery("awsRegion")),
          AccountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          ResourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/global-networks/{GlobalNetworkId}/network-resource-relationships",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkResourceRelationshipsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ From: S.optional(S.String), To: S.optional(S.String) }),
      ).annotate({ identifier: "Relationship" });
    case 2:
      return S.Array(__S(1393, __c87, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Relationships: S.optional(__S(1394, __c87, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetNetworkResourceRelationshipsResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          CoreNetworkId: S.optional(S.String).pipe(T.HttpQuery("coreNetworkId")),
          RegisteredGatewayArn: S.optional(S.String).pipe(T.HttpQuery("registeredGatewayArn")),
          AwsRegion: S.optional(S.String).pipe(T.HttpQuery("awsRegion")),
          AccountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          ResourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/global-networks/{GlobalNetworkId}/network-resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegisteredGatewayArn: S.optional(S.String),
          CoreNetworkId: S.optional(S.String),
          AwsRegion: S.optional(S.String),
          AccountId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          Definition: S.optional(S.String),
          DefinitionTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(1777, __c111, 1)),
          Metadata: S.optional(__S(1040, __c65, 0)),
        }),
      ).annotate({ identifier: "NetworkResource" });
    case 2:
      return S.Array(__S(1409, __c88, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NetworkResources: S.optional(__S(1410, __c88, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetNetworkResourcesResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String),
          SegmentName: S.optional(S.String),
          EdgeLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "CoreNetworkSegmentEdgeIdentifier" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String),
          NetworkFunctionGroupName: S.optional(S.String),
          EdgeLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "CoreNetworkNetworkFunctionGroupIdentifier" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TransitGatewayRouteTableArn: S.optional(S.String),
          CoreNetworkSegmentEdge: S.optional(__S(1424, __c89, 0)),
          CoreNetworkNetworkFunctionGroup: S.optional(__S(1425, __c89, 1)),
        }),
      ).annotate({ identifier: "RouteTableIdentifier" });
    case 3:
      return S.Array(S.String);
    case 4:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          RouteTableIdentifier: __S(1426, __c89, 2),
          ExactCidrMatches: S.optional(__S(1792, __c112, 0)),
          LongestPrefixMatches: S.optional(__S(1792, __c112, 0)),
          SubnetOfMatches: S.optional(__S(1792, __c112, 0)),
          SupernetOfMatches: S.optional(__S(1792, __c112, 0)),
          PrefixListIds: S.optional(__S(1792, __c112, 0)),
          States: S.optional(__S(1427, __c89, 3)),
          Types: S.optional(__S(1427, __c89, 3)),
          DestinationFilters: S.optional(__S(1440, __c90, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/global-networks/{GlobalNetworkId}/network-routes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkRoutesRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkAttachmentId: S.optional(S.String),
          TransitGatewayAttachmentId: S.optional(S.String),
          SegmentName: S.optional(S.String),
          NetworkFunctionGroupName: S.optional(S.String),
          EdgeLocation: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkRouteDestination" });
    case 6:
      return S.Array(__S(1429, __c89, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          DestinationCidrBlock: S.optional(S.String),
          Destinations: S.optional(__S(1430, __c89, 6)),
          PrefixListId: S.optional(S.String),
          State: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkRoute" });
    case 8:
      return S.Array(__S(1431, __c89, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          RouteTableArn: S.optional(S.String),
          CoreNetworkSegmentEdge: S.optional(__S(1424, __c89, 0)),
          RouteTableType: S.optional(S.String),
          RouteTableTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NetworkRoutes: S.optional(__S(1432, __c89, 8)),
        }),
      ).annotate({ identifier: "GetNetworkRoutesResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(1792, __c112, 0).pipe(S.optional));
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          CoreNetworkId: S.optional(S.String).pipe(T.HttpQuery("coreNetworkId")),
          RegisteredGatewayArn: S.optional(S.String).pipe(T.HttpQuery("registeredGatewayArn")),
          AwsRegion: S.optional(S.String).pipe(T.HttpQuery("awsRegion")),
          AccountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          ResourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/global-networks/{GlobalNetworkId}/network-telemetry" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkTelemetryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Status: S.optional(S.String),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ConnectionHealth" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RegisteredGatewayArn: S.optional(S.String),
          CoreNetworkId: S.optional(S.String),
          AwsRegion: S.optional(S.String),
          AccountId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          Address: S.optional(S.String),
          Health: S.optional(__S(1457, __c91, 1)),
        }),
      ).annotate({ identifier: "NetworkTelemetry" });
    case 3:
      return S.Array(__S(1458, __c91, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          NetworkTelemetry: S.optional(__S(1459, __c91, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetNetworkTelemetryResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resource-policy/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ PolicyDocument: S.optional(S.String) })).annotate({
        identifier: "GetResourcePolicyResponse",
      });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          RouteAnalysisId: S.String.pipe(T.HttpLabel("RouteAnalysisId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/global-networks/{GlobalNetworkId}/route-analyses/{RouteAnalysisId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRouteAnalysisRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TransitGatewayAttachmentArn: S.optional(S.String),
          TransitGatewayArn: S.optional(S.String),
          IpAddress: S.optional(S.String),
        }),
      ).annotate({ identifier: "RouteAnalysisEndpointOptions" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResultCode: S.optional(S.String),
          ReasonCode: S.optional(S.String),
          ReasonContext: S.optional(__S(1040, __c65, 0)),
        }),
      ).annotate({ identifier: "RouteAnalysisCompletion" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RegisteredGatewayArn: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Definition: S.optional(S.String),
          NameTag: S.optional(S.String),
          IsMiddlebox: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "NetworkResourceSummary" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Sequence: S.optional(S.Number),
          Resource: S.optional(__S(1506, __c94, 2)),
          DestinationCidrBlock: S.optional(S.String),
        }),
      ).annotate({ identifier: "PathComponent" });
    case 4:
      return S.Array(__S(1507, __c94, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          CompletionStatus: S.optional(__S(1505, __c94, 1)),
          Path: S.optional(__S(1508, __c94, 4)),
        }),
      ).annotate({ identifier: "RouteAnalysisPath" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          RouteAnalysisId: S.optional(S.String),
          StartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          Source: S.optional(__S(1504, __c94, 0)),
          Destination: S.optional(__S(1504, __c94, 0)),
          IncludeReturnPath: S.optional(S.Boolean),
          UseMiddleboxes: S.optional(S.Boolean),
          ForwardPath: S.optional(__S(1509, __c94, 5)),
          ReturnPath: S.optional(__S(1509, __c94, 5)),
        }),
      ).annotate({ identifier: "RouteAnalysis" });
    case 7:
      return S.suspend(() => S.Struct({ RouteAnalysis: S.optional(__S(1510, __c94, 6)) })).annotate(
        { identifier: "GetRouteAnalysisResponse" },
      );
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          SiteIds: S.optional(__S(1792, __c112, 0)).pipe(T.HttpQuery("siteIds")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/global-networks/{GlobalNetworkId}/sites" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSitesRequest" });
    case 1:
      return S.Array(__S(608, __c38, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Sites: S.optional(__S(1521, __c95, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetSitesResponse" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttachmentId: S.String.pipe(T.HttpLabel("AttachmentId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/site-to-site-vpn-attachments/{AttachmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSiteToSiteVpnAttachmentRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          TransitGatewayConnectPeerArns: S.optional(__S(1792, __c112, 0)).pipe(
            T.HttpQuery("transitGatewayConnectPeerArns"),
          ),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/global-networks/{GlobalNetworkId}/transit-gateway-connect-peer-associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTransitGatewayConnectPeerAssociationsRequest" });
    case 1:
      return S.Array(__S(176, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TransitGatewayConnectPeerAssociations: S.optional(__S(1553, __c97, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTransitGatewayConnectPeerAssociationsResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PeeringId: S.String.pipe(T.HttpLabel("PeeringId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/transit-gateway-peerings/{PeeringId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTransitGatewayPeeringRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(1584, __c99, 0));
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          TransitGatewayArns: S.optional(__S(1792, __c112, 0)).pipe(
            T.HttpQuery("transitGatewayArns"),
          ),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/global-networks/{GlobalNetworkId}/transit-gateway-registrations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTransitGatewayRegistrationsRequest" });
    case 1:
      return S.Array(__S(1009, __c63, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TransitGatewayRegistrations: S.optional(__S(1601, __c100, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTransitGatewayRegistrationsResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttachmentId: S.String.pipe(T.HttpLabel("AttachmentId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/transit-gateway-route-table-attachments/{AttachmentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTransitGatewayRouteTableAttachmentRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttachmentId: S.String.pipe(T.HttpLabel("AttachmentId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/vpc-attachments/{AttachmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVpcAttachmentRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          AttachmentId: S.optional(S.String).pipe(T.HttpQuery("attachmentId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/routing-policy-label/core-network/{CoreNetworkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAttachmentRoutingPolicyAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AttachmentId: S.optional(S.String),
          PendingRoutingPolicies: S.optional(__S(1792, __c112, 0)),
          AssociatedRoutingPolicies: S.optional(__S(1792, __c112, 0)),
          RoutingPolicyLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "AttachmentRoutingPolicyAssociationSummary" });
    case 2:
      return S.Array(__S(1649, __c103, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AttachmentRoutingPolicyAssociations: S.optional(__S(1650, __c103, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAttachmentRoutingPolicyAssociationsResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String).pipe(T.HttpQuery("coreNetworkId")),
          AttachmentType: S.optional(S.String).pipe(T.HttpQuery("attachmentType")),
          EdgeLocation: S.optional(S.String).pipe(T.HttpQuery("edgeLocation")),
          State: S.optional(S.String).pipe(T.HttpQuery("state")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/attachments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAttachmentsRequest" });
    case 1:
      return S.Array(__S(1826, __c114, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Attachments: S.optional(__S(1665, __c104, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAttachmentsResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String).pipe(T.HttpQuery("coreNetworkId")),
          ConnectAttachmentId: S.optional(S.String).pipe(T.HttpQuery("connectAttachmentId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/connect-peers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListConnectPeersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String),
          ConnectAttachmentId: S.optional(S.String),
          ConnectPeerId: S.optional(S.String),
          EdgeLocation: S.optional(S.String),
          ConnectPeerState: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(1777, __c111, 1)),
          SubnetArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectPeerSummary" });
    case 2:
      return S.Array(__S(1681, __c105, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConnectPeers: S.optional(__S(1682, __c105, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConnectPeersResponse" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/core-networks/{CoreNetworkId}/core-network-policy-versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCoreNetworkPolicyVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String),
          PolicyVersionId: S.optional(S.Number),
          Alias: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ChangeSetState: S.optional(S.String),
        }),
      ).annotate({ identifier: "CoreNetworkPolicyVersion" });
    case 2:
      return S.Array(__S(1697, __c106, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkPolicyVersions: S.optional(__S(1698, __c106, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCoreNetworkPolicyVersionsResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          PrefixListArn: S.optional(S.String).pipe(T.HttpQuery("prefixListArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prefix-list/core-network/{CoreNetworkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCoreNetworkPrefixListAssociationsRequest" });
    case 1:
      return S.Array(__S(352, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PrefixListAssociations: S.optional(__S(1713, __c107, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCoreNetworkPrefixListAssociationsResponse" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          SegmentName: S.String,
          EdgeLocation: S.String,
          NextHopFilters: S.optional(__S(1440, __c90, 0)),
          LocalPreferenceMatches: S.optional(__S(1792, __c112, 0)),
          ExactAsPathMatches: S.optional(__S(1792, __c112, 0)),
          MedMatches: S.optional(__S(1792, __c112, 0)),
          CommunityMatches: S.optional(__S(1792, __c112, 0)),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/core-networks/{CoreNetworkId}/core-network-routing-information",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCoreNetworkRoutingInformationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IpAddress: S.optional(S.String),
          CoreNetworkAttachmentId: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          SegmentName: S.optional(S.String),
          EdgeLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "RoutingInformationNextHop" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          NextHop: S.optional(__S(1729, __c108, 1)),
          LocalPreference: S.optional(S.String),
          Med: S.optional(S.String),
          AsPath: S.optional(__S(1792, __c112, 0)),
          Communities: S.optional(__S(1792, __c112, 0)),
        }),
      ).annotate({ identifier: "CoreNetworkRoutingInformation" });
    case 3:
      return S.Array(__S(1730, __c108, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkRoutingInformation: S.optional(__S(1731, __c108, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCoreNetworkRoutingInformationResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/core-networks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCoreNetworksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String),
          CoreNetworkArn: S.optional(S.String),
          GlobalNetworkId: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          State: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
        }),
      ).annotate({ identifier: "CoreNetworkSummary" });
    case 2:
      return S.Array(__S(1745, __c109, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CoreNetworks: S.optional(__S(1746, __c109, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCoreNetworksResponse" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttachmentId: S.String.pipe(T.HttpLabel("AttachmentId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/attachments/{AttachmentId}/accept" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptAttachmentRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(1776, __c111, 0));
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Code: S.optional(S.String),
          Message: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          RequestId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AttachmentError" });
    case 1:
      return S.Array(__S(1808, __c113, 0));
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Tags: S.optional(__S(1777, __c111, 1)),
          AttachmentPolicyRuleNumber: S.optional(S.Number),
          SegmentName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProposedSegmentChange" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Tags: S.optional(__S(1777, __c111, 1)),
          AttachmentPolicyRuleNumber: S.optional(S.Number),
          NetworkFunctionGroupName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProposedNetworkFunctionGroupChange" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String),
          CoreNetworkArn: S.optional(S.String),
          AttachmentId: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          AttachmentType: S.optional(S.String),
          State: S.optional(S.String),
          EdgeLocation: S.optional(S.String),
          EdgeLocations: S.optional(__S(1792, __c112, 0)),
          ResourceArn: S.optional(S.String),
          AttachmentPolicyRuleNumber: S.optional(S.Number),
          SegmentName: S.optional(S.String),
          NetworkFunctionGroupName: S.optional(S.String),
          Tags: S.optional(__S(1777, __c111, 1)),
          ProposedSegmentChange: S.optional(__S(1824, __c114, 0)),
          ProposedNetworkFunctionGroupChange: S.optional(__S(1825, __c114, 1)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModificationErrors: S.optional(__S(1809, __c113, 1)),
        }),
      ).annotate({ identifier: "Attachment" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Attachment: S.optional(__S(1826, __c114, 2)) })).annotate({
        identifier: "AcceptAttachmentResponse",
      });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/organizations/service-access" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOrganizationServiceAccessStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OrganizationStatus: S.optional(__S(1874, __c117, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOrganizationServiceAccessStatusResponse" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), SLRDeploymentStatus: S.optional(S.String) }),
      ).annotate({ identifier: "AccountStatus" });
    case 1:
      return S.Array(__S(1872, __c117, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          OrganizationId: S.optional(S.String),
          OrganizationAwsServiceAccessStatus: S.optional(S.String),
          SLRDeploymentStatus: S.optional(S.String),
          AccountStatusList: S.optional(__S(1873, __c117, 1)).pipe(T.XmlName("OrganizationStatus")),
        }),
      ).annotate({ identifier: "OrganizationStatus" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String).pipe(T.HttpQuery("coreNetworkId")),
          PeeringType: S.optional(S.String).pipe(T.HttpQuery("peeringType")),
          EdgeLocation: S.optional(S.String).pipe(T.HttpQuery("edgeLocation")),
          State: S.optional(S.String).pipe(T.HttpQuery("state")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/peerings" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPeeringsRequest" });
    case 1:
      return S.Array(__S(675, __c42, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ Peerings: S.optional(__S(1889, __c118, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPeeringsResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TagList: S.optional(__S(1777, __c111, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String,
          AttachmentId: S.String,
          RoutingPolicyLabel: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/routing-policy-label" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAttachmentRoutingPolicyLabelRequest" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.optional(S.String),
          AttachmentId: S.optional(S.String),
          RoutingPolicyLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutAttachmentRoutingPolicyLabelResponse" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          PolicyDocument: S.String,
          Description: S.optional(S.String),
          LatestVersionId: S.optional(S.Number),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/core-networks/{CoreNetworkId}/core-network-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutCoreNetworkPolicyRequest" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyDocument: S.String,
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/resource-policy/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          TransitGatewayArn: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/global-networks/{GlobalNetworkId}/transit-gateway-registrations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterTransitGatewayRequest" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttachmentId: S.String.pipe(T.HttpLabel("AttachmentId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/attachments/{AttachmentId}/reject" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectAttachmentRequest" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          AttachmentId: S.String.pipe(T.HttpLabel("AttachmentId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/routing-policy-label/core-network/{CoreNetworkId}/attachment/{AttachmentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveAttachmentRoutingPolicyLabelRequest" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          PolicyVersionId: S.Number.pipe(T.HttpLabel("PolicyVersionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/core-networks/{CoreNetworkId}/core-network-policy-versions/{PolicyVersionId}/restore",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RestoreCoreNetworkPolicyVersionRequest" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          ConnectPeerId: S.String,
          DeviceId: S.String,
          LinkId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/global-networks/{GlobalNetworkId}/connect-peer-associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateConnectPeerRequest" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectPeerAssociation: S.optional(__S(2080, __c130, 0)) }),
      ).annotate({ identifier: "AssociateConnectPeerResponse" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectPeerId: S.optional(S.String),
          GlobalNetworkId: S.optional(S.String),
          DeviceId: S.optional(S.String),
          LinkId: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectPeerAssociation" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/organizations/service-access" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartOrganizationServiceAccessUpdateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ OrganizationStatus: S.optional(__S(1874, __c117, 2)) }),
      ).annotate({ identifier: "StartOrganizationServiceAccessUpdateResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TransitGatewayAttachmentArn: S.optional(S.String),
          IpAddress: S.optional(S.String),
        }),
      ).annotate({ identifier: "RouteAnalysisEndpointOptionsSpecification" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          Source: __S(2112, __c132, 0),
          Destination: __S(2112, __c132, 0),
          IncludeReturnPath: S.optional(S.Boolean),
          UseMiddleboxes: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/global-networks/{GlobalNetworkId}/route-analyses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartRouteAnalysisRequest" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(1777, __c111, 1),
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
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(1792, __c112, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")),
          LinkId: S.optional(S.String),
          ConnectedLinkId: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/global-networks/{GlobalNetworkId}/connections/{ConnectionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectionRequest" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreNetworkId: S.String.pipe(T.HttpLabel("CoreNetworkId")),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/core-networks/{CoreNetworkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCoreNetworkRequest" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          DeviceId: S.String.pipe(T.HttpLabel("DeviceId")),
          AWSLocation: S.optional(__S(400, __c25, 0)),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          Vendor: S.optional(S.String),
          Model: S.optional(S.String),
          SerialNumber: S.optional(S.String),
          Location: S.optional(__S(384, __c24, 0)),
          SiteId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/global-networks/{GlobalNetworkId}/devices/{DeviceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDeviceRequest" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AttachmentId: S.String.pipe(T.HttpLabel("AttachmentId")),
          EdgeLocations: S.optional(__S(1792, __c112, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/direct-connect-gateway-attachments/{AttachmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDirectConnectGatewayAttachmentRequest" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/global-networks/{GlobalNetworkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGlobalNetworkRequest" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GlobalNetworkId: S.String.pipe(T.HttpLabel("GlobalNetworkId")),
          LinkId: S.String.pipe(T.HttpLabel("LinkId")),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          Bandwidth: S.optional(__S(544, __c34, 0)),
          Provider: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/global-networks/{GlobalNetworkId}/links/{LinkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLinkRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
