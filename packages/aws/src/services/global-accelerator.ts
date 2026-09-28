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
  sdkId: "Global Accelerator",
  target: "GlobalAccelerator_V20180706",
  version: "2018-08-08",
  sigv4: "globalaccelerator",
  protocol: awsJson1_1Protocol,
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
                `https://globalaccelerator-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://globalaccelerator-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://globalaccelerator.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://globalaccelerator.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AcceleratorNotDisabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "AcceleratorNotDisabledException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class AcceleratorNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "AcceleratorNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class AssociatedEndpointGroupFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "AssociatedEndpointGroupFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class AssociatedListenerFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "AssociatedListenerFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class AttachmentNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "AttachmentNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ByoipCidrNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ByoipCidrNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class EndpointAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class EndpointGroupAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointGroupAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class EndpointGroupNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointGroupNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class EndpointNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class IncorrectCidrStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "IncorrectCidrStateException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidArgumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidPortRangeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPortRangeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class ListenerNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ListenerNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class TransactionInProgressException
  extends /*@__PURE__*/ TE.TaggedError(
    "TransactionInProgressException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export interface CustomRoutingEndpointConfiguration {
  EndpointId?: string;
  AttachmentArn?: string;
}
export type CustomRoutingEndpointConfigurations =
  CustomRoutingEndpointConfiguration[];
export interface AddCustomRoutingEndpointsRequest {
  EndpointConfigurations: CustomRoutingEndpointConfiguration[];
  EndpointGroupArn: string;
}
export interface CustomRoutingEndpointDescription {
  EndpointId?: string;
}
export type CustomRoutingEndpointDescriptions =
  CustomRoutingEndpointDescription[];
export interface AddCustomRoutingEndpointsResponse {
  EndpointDescriptions?: CustomRoutingEndpointDescription[];
  EndpointGroupArn?: string;
}
export type EndpointWeight = number;
export interface EndpointConfiguration {
  EndpointId?: string;
  Weight?: number;
  ClientIPPreservationEnabled?: boolean;
  AttachmentArn?: string;
}
export type EndpointConfigurations = EndpointConfiguration[];
export interface AddEndpointsRequest {
  EndpointConfigurations: EndpointConfiguration[];
  EndpointGroupArn: string;
}
export type HealthState = "INITIAL" | "HEALTHY" | "UNHEALTHY" | (string & {});
export interface EndpointDescription {
  EndpointId?: string;
  Weight?: number;
  HealthState?: HealthState;
  HealthReason?: string;
  ClientIPPreservationEnabled?: boolean;
}
export type EndpointDescriptions = EndpointDescription[];
export interface AddEndpointsResponse {
  EndpointDescriptions?: EndpointDescription[];
  EndpointGroupArn?: string;
}
export interface AdvertiseByoipCidrRequest {
  Cidr: string;
}
export type ByoipCidrState =
  | "PENDING_PROVISIONING"
  | "READY"
  | "PENDING_ADVERTISING"
  | "ADVERTISING"
  | "PENDING_WITHDRAWING"
  | "PENDING_DEPROVISIONING"
  | "DEPROVISIONED"
  | "FAILED_PROVISION"
  | "FAILED_ADVERTISING"
  | "FAILED_WITHDRAW"
  | "FAILED_DEPROVISION"
  | (string & {});
export interface ByoipCidrEvent {
  Message?: string;
  Timestamp?: Date;
}
export type ByoipCidrEvents = ByoipCidrEvent[];
export interface ByoipCidr {
  Cidr?: string;
  State?: ByoipCidrState;
  Events?: ByoipCidrEvent[];
}
export interface AdvertiseByoipCidrResponse {
  ByoipCidr?: ByoipCidr;
}
export type IpAddress = string;
export type DestinationAddresses = string[];
export type PortNumber = number;
export type DestinationPorts = number[];
export interface AllowCustomRoutingTrafficRequest {
  EndpointGroupArn: string;
  EndpointId: string;
  DestinationAddresses?: string[];
  DestinationPorts?: number[];
  AllowAllTrafficToEndpoint?: boolean;
}
export interface AllowCustomRoutingTrafficResponse {}
export type IpAddressType = "IPV4" | "DUAL_STACK" | (string & {});
export type IpAddresses = string[];
export type IdempotencyToken = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type Tags = Tag[];
export interface CreateAcceleratorRequest {
  Name: string;
  IpAddressType?: IpAddressType;
  IpAddresses?: string[];
  Enabled?: boolean;
  IdempotencyToken: string;
  Tags?: Tag[];
}
export type IpAddressFamily = "IPv4" | "IPv6" | (string & {});
export interface IpSet {
  IpFamily?: string;
  IpAddresses?: string[];
  IpAddressFamily?: IpAddressFamily;
}
export type IpSets = IpSet[];
export type AcceleratorStatus = "DEPLOYED" | "IN_PROGRESS" | (string & {});
export interface AcceleratorEvent {
  Message?: string;
  Timestamp?: Date;
}
export type AcceleratorEvents = AcceleratorEvent[];
export interface Accelerator {
  AcceleratorArn?: string;
  Name?: string;
  IpAddressType?: IpAddressType;
  Enabled?: boolean;
  IpSets?: IpSet[];
  DnsName?: string;
  Status?: AcceleratorStatus;
  CreatedTime?: Date;
  LastModifiedTime?: Date;
  DualStackDnsName?: string;
  Events?: AcceleratorEvent[];
}
export interface CreateAcceleratorResponse {
  Accelerator?: Accelerator;
}
export type AttachmentName = string;
export type Principal = string;
export type Principals = string[];
export interface Resource {
  EndpointId?: string;
  Cidr?: string;
  Region?: string;
}
export type Resources = Resource[];
export interface CreateCrossAccountAttachmentRequest {
  Name: string;
  Principals?: string[];
  Resources?: Resource[];
  IdempotencyToken: string;
  Tags?: Tag[];
}
export interface Attachment {
  AttachmentArn?: string;
  Name?: string;
  Principals?: string[];
  Resources?: Resource[];
  LastModifiedTime?: Date;
  CreatedTime?: Date;
}
export interface CreateCrossAccountAttachmentResponse {
  CrossAccountAttachment?: Attachment;
}
export interface CreateCustomRoutingAcceleratorRequest {
  Name: string;
  IpAddressType?: IpAddressType;
  IpAddresses?: string[];
  Enabled?: boolean;
  IdempotencyToken: string;
  Tags?: Tag[];
}
export type CustomRoutingAcceleratorStatus =
  | "DEPLOYED"
  | "IN_PROGRESS"
  | (string & {});
export interface CustomRoutingAccelerator {
  AcceleratorArn?: string;
  Name?: string;
  IpAddressType?: IpAddressType;
  Enabled?: boolean;
  IpSets?: IpSet[];
  DnsName?: string;
  Status?: CustomRoutingAcceleratorStatus;
  CreatedTime?: Date;
  LastModifiedTime?: Date;
}
export interface CreateCustomRoutingAcceleratorResponse {
  Accelerator?: CustomRoutingAccelerator;
}
export type CustomRoutingProtocol = "TCP" | "UDP" | (string & {});
export type CustomRoutingProtocols = CustomRoutingProtocol[];
export interface CustomRoutingDestinationConfiguration {
  FromPort: number;
  ToPort: number;
  Protocols: CustomRoutingProtocol[];
}
export type CustomRoutingDestinationConfigurations =
  CustomRoutingDestinationConfiguration[];
export interface CreateCustomRoutingEndpointGroupRequest {
  ListenerArn: string;
  EndpointGroupRegion: string;
  DestinationConfigurations: CustomRoutingDestinationConfiguration[];
  IdempotencyToken: string;
}
export type Protocol = "TCP" | "UDP" | (string & {});
export type Protocols = Protocol[];
export interface CustomRoutingDestinationDescription {
  FromPort?: number;
  ToPort?: number;
  Protocols?: Protocol[];
}
export type CustomRoutingDestinationDescriptions =
  CustomRoutingDestinationDescription[];
export interface CustomRoutingEndpointGroup {
  EndpointGroupArn?: string;
  EndpointGroupRegion?: string;
  DestinationDescriptions?: CustomRoutingDestinationDescription[];
  EndpointDescriptions?: CustomRoutingEndpointDescription[];
}
export interface CreateCustomRoutingEndpointGroupResponse {
  EndpointGroup?: CustomRoutingEndpointGroup;
}
export interface PortRange {
  FromPort?: number;
  ToPort?: number;
}
export type PortRanges = PortRange[];
export interface CreateCustomRoutingListenerRequest {
  AcceleratorArn: string;
  PortRanges: PortRange[];
  IdempotencyToken: string;
}
export interface CustomRoutingListener {
  ListenerArn?: string;
  PortRanges?: PortRange[];
}
export interface CreateCustomRoutingListenerResponse {
  Listener?: CustomRoutingListener;
}
export type TrafficDialPercentage = number;
export type HealthCheckPort = number;
export type HealthCheckProtocol = "TCP" | "HTTP" | "HTTPS" | (string & {});
export type HealthCheckPath = string;
export type HealthCheckIntervalSeconds = number;
export type ThresholdCount = number;
export interface PortOverride {
  ListenerPort?: number;
  EndpointPort?: number;
}
export type PortOverrides = PortOverride[];
export interface CreateEndpointGroupRequest {
  ListenerArn: string;
  EndpointGroupRegion: string;
  EndpointConfigurations?: EndpointConfiguration[];
  TrafficDialPercentage?: number;
  HealthCheckPort?: number;
  HealthCheckProtocol?: HealthCheckProtocol;
  HealthCheckPath?: string;
  HealthCheckIntervalSeconds?: number;
  ThresholdCount?: number;
  IdempotencyToken: string;
  PortOverrides?: PortOverride[];
}
export interface EndpointGroup {
  EndpointGroupArn?: string;
  EndpointGroupRegion?: string;
  EndpointDescriptions?: EndpointDescription[];
  TrafficDialPercentage?: number;
  HealthCheckPort?: number;
  HealthCheckProtocol?: HealthCheckProtocol;
  HealthCheckPath?: string;
  HealthCheckIntervalSeconds?: number;
  ThresholdCount?: number;
  PortOverrides?: PortOverride[];
}
export interface CreateEndpointGroupResponse {
  EndpointGroup?: EndpointGroup;
}
export type ClientAffinity = "NONE" | "SOURCE_IP" | (string & {});
export interface CreateListenerRequest {
  AcceleratorArn: string;
  PortRanges: PortRange[];
  Protocol: Protocol;
  ClientAffinity?: ClientAffinity;
  IdempotencyToken: string;
}
export interface Listener {
  ListenerArn?: string;
  PortRanges?: PortRange[];
  Protocol?: Protocol;
  ClientAffinity?: ClientAffinity;
}
export interface CreateListenerResponse {
  Listener?: Listener;
}
export interface DeleteAcceleratorRequest {
  AcceleratorArn: string;
}
export interface DeleteAcceleratorResponse {}
export interface DeleteCrossAccountAttachmentRequest {
  AttachmentArn: string;
}
export interface DeleteCrossAccountAttachmentResponse {}
export interface DeleteCustomRoutingAcceleratorRequest {
  AcceleratorArn: string;
}
export interface DeleteCustomRoutingAcceleratorResponse {}
export interface DeleteCustomRoutingEndpointGroupRequest {
  EndpointGroupArn: string;
}
export interface DeleteCustomRoutingEndpointGroupResponse {}
export interface DeleteCustomRoutingListenerRequest {
  ListenerArn: string;
}
export interface DeleteCustomRoutingListenerResponse {}
export interface DeleteEndpointGroupRequest {
  EndpointGroupArn: string;
}
export interface DeleteEndpointGroupResponse {}
export interface DeleteListenerRequest {
  ListenerArn: string;
}
export interface DeleteListenerResponse {}
export interface DenyCustomRoutingTrafficRequest {
  EndpointGroupArn: string;
  EndpointId: string;
  DestinationAddresses?: string[];
  DestinationPorts?: number[];
  DenyAllTrafficToEndpoint?: boolean;
}
export interface DenyCustomRoutingTrafficResponse {}
export interface DeprovisionByoipCidrRequest {
  Cidr: string;
}
export interface DeprovisionByoipCidrResponse {
  ByoipCidr?: ByoipCidr;
}
export interface DescribeAcceleratorRequest {
  AcceleratorArn: string;
}
export interface DescribeAcceleratorResponse {
  Accelerator?: Accelerator;
}
export interface DescribeAcceleratorAttributesRequest {
  AcceleratorArn: string;
}
export interface AcceleratorAttributes {
  FlowLogsEnabled?: boolean;
  FlowLogsS3Bucket?: string;
  FlowLogsS3Prefix?: string;
}
export interface DescribeAcceleratorAttributesResponse {
  AcceleratorAttributes?: AcceleratorAttributes;
}
export interface DescribeCrossAccountAttachmentRequest {
  AttachmentArn: string;
}
export interface DescribeCrossAccountAttachmentResponse {
  CrossAccountAttachment?: Attachment;
}
export interface DescribeCustomRoutingAcceleratorRequest {
  AcceleratorArn: string;
}
export interface DescribeCustomRoutingAcceleratorResponse {
  Accelerator?: CustomRoutingAccelerator;
}
export interface DescribeCustomRoutingAcceleratorAttributesRequest {
  AcceleratorArn: string;
}
export interface CustomRoutingAcceleratorAttributes {
  FlowLogsEnabled?: boolean;
  FlowLogsS3Bucket?: string;
  FlowLogsS3Prefix?: string;
}
export interface DescribeCustomRoutingAcceleratorAttributesResponse {
  AcceleratorAttributes?: CustomRoutingAcceleratorAttributes;
}
export interface DescribeCustomRoutingEndpointGroupRequest {
  EndpointGroupArn: string;
}
export interface DescribeCustomRoutingEndpointGroupResponse {
  EndpointGroup?: CustomRoutingEndpointGroup;
}
export interface DescribeCustomRoutingListenerRequest {
  ListenerArn: string;
}
export interface DescribeCustomRoutingListenerResponse {
  Listener?: CustomRoutingListener;
}
export interface DescribeEndpointGroupRequest {
  EndpointGroupArn: string;
}
export interface DescribeEndpointGroupResponse {
  EndpointGroup?: EndpointGroup;
}
export interface DescribeListenerRequest {
  ListenerArn: string;
}
export interface DescribeListenerResponse {
  Listener?: Listener;
}
export type MaxResults = number;
export interface ListAcceleratorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type Accelerators = Accelerator[];
export interface ListAcceleratorsResponse {
  Accelerators?: Accelerator[];
  NextToken?: string;
}
export interface ListByoipCidrsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type ByoipCidrs = ByoipCidr[];
export interface ListByoipCidrsResponse {
  ByoipCidrs?: ByoipCidr[];
  NextToken?: string;
}
export interface ListCrossAccountAttachmentsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type Attachments = Attachment[];
export interface ListCrossAccountAttachmentsResponse {
  CrossAccountAttachments?: Attachment[];
  NextToken?: string;
}
export interface ListCrossAccountResourceAccountsRequest {}
export type AwsAccountId = string;
export type AwsAccountIds = string[];
export interface ListCrossAccountResourceAccountsResponse {
  ResourceOwnerAwsAccountIds?: string[];
}
export interface ListCrossAccountResourcesRequest {
  AcceleratorArn?: string;
  ResourceOwnerAwsAccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface CrossAccountResource {
  EndpointId?: string;
  Cidr?: string;
  AttachmentArn?: string;
}
export type CrossAccountResources = CrossAccountResource[];
export interface ListCrossAccountResourcesResponse {
  CrossAccountResources?: CrossAccountResource[];
  NextToken?: string;
}
export interface ListCustomRoutingAcceleratorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type CustomRoutingAccelerators = CustomRoutingAccelerator[];
export interface ListCustomRoutingAcceleratorsResponse {
  Accelerators?: CustomRoutingAccelerator[];
  NextToken?: string;
}
export interface ListCustomRoutingEndpointGroupsRequest {
  ListenerArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export type CustomRoutingEndpointGroups = CustomRoutingEndpointGroup[];
export interface ListCustomRoutingEndpointGroupsResponse {
  EndpointGroups?: CustomRoutingEndpointGroup[];
  NextToken?: string;
}
export interface ListCustomRoutingListenersRequest {
  AcceleratorArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export type CustomRoutingListeners = CustomRoutingListener[];
export interface ListCustomRoutingListenersResponse {
  Listeners?: CustomRoutingListener[];
  NextToken?: string;
}
export type PortMappingsMaxResults = number;
export interface ListCustomRoutingPortMappingsRequest {
  AcceleratorArn: string;
  EndpointGroupArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface SocketAddress {
  IpAddress?: string;
  Port?: number;
}
export type CustomRoutingDestinationTrafficState =
  | "ALLOW"
  | "DENY"
  | (string & {});
export interface PortMapping {
  AcceleratorPort?: number;
  EndpointGroupArn?: string;
  EndpointId?: string;
  DestinationSocketAddress?: SocketAddress;
  Protocols?: CustomRoutingProtocol[];
  DestinationTrafficState?: CustomRoutingDestinationTrafficState;
}
export type PortMappings = PortMapping[];
export interface ListCustomRoutingPortMappingsResponse {
  PortMappings?: PortMapping[];
  NextToken?: string;
}
export interface ListCustomRoutingPortMappingsByDestinationRequest {
  EndpointId: string;
  DestinationAddress: string;
  MaxResults?: number;
  NextToken?: string;
}
export type SocketAddresses = SocketAddress[];
export interface DestinationPortMapping {
  AcceleratorArn?: string;
  AcceleratorSocketAddresses?: SocketAddress[];
  EndpointGroupArn?: string;
  EndpointId?: string;
  EndpointGroupRegion?: string;
  DestinationSocketAddress?: SocketAddress;
  IpAddressType?: IpAddressType;
  DestinationTrafficState?: CustomRoutingDestinationTrafficState;
}
export type DestinationPortMappings = DestinationPortMapping[];
export interface ListCustomRoutingPortMappingsByDestinationResponse {
  DestinationPortMappings?: DestinationPortMapping[];
  NextToken?: string;
}
export interface ListEndpointGroupsRequest {
  ListenerArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export type EndpointGroups = EndpointGroup[];
export interface ListEndpointGroupsResponse {
  EndpointGroups?: EndpointGroup[];
  NextToken?: string;
}
export interface ListListenersRequest {
  AcceleratorArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export type Listeners = Listener[];
export interface ListListenersResponse {
  Listeners?: Listener[];
  NextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface CidrAuthorizationContext {
  Message: string;
  Signature: string;
}
export interface ProvisionByoipCidrRequest {
  Cidr: string;
  CidrAuthorizationContext: CidrAuthorizationContext;
}
export interface ProvisionByoipCidrResponse {
  ByoipCidr?: ByoipCidr;
}
export type EndpointIds = string[];
export interface RemoveCustomRoutingEndpointsRequest {
  EndpointIds: string[];
  EndpointGroupArn: string;
}
export interface RemoveCustomRoutingEndpointsResponse {}
export interface EndpointIdentifier {
  EndpointId: string;
  ClientIPPreservationEnabled?: boolean;
}
export type EndpointIdentifiers = EndpointIdentifier[];
export interface RemoveEndpointsRequest {
  EndpointIdentifiers: EndpointIdentifier[];
  EndpointGroupArn: string;
}
export interface RemoveEndpointsResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAcceleratorRequest {
  AcceleratorArn: string;
  Name?: string;
  IpAddressType?: IpAddressType;
  IpAddresses?: string[];
  Enabled?: boolean;
}
export interface UpdateAcceleratorResponse {
  Accelerator?: Accelerator;
}
export interface UpdateAcceleratorAttributesRequest {
  AcceleratorArn: string;
  FlowLogsEnabled?: boolean;
  FlowLogsS3Bucket?: string;
  FlowLogsS3Prefix?: string;
}
export interface UpdateAcceleratorAttributesResponse {
  AcceleratorAttributes?: AcceleratorAttributes;
}
export interface UpdateCrossAccountAttachmentRequest {
  AttachmentArn: string;
  Name?: string;
  AddPrincipals?: string[];
  RemovePrincipals?: string[];
  AddResources?: Resource[];
  RemoveResources?: Resource[];
}
export interface UpdateCrossAccountAttachmentResponse {
  CrossAccountAttachment?: Attachment;
}
export interface UpdateCustomRoutingAcceleratorRequest {
  AcceleratorArn: string;
  Name?: string;
  IpAddressType?: IpAddressType;
  IpAddresses?: string[];
  Enabled?: boolean;
}
export interface UpdateCustomRoutingAcceleratorResponse {
  Accelerator?: CustomRoutingAccelerator;
}
export interface UpdateCustomRoutingAcceleratorAttributesRequest {
  AcceleratorArn: string;
  FlowLogsEnabled?: boolean;
  FlowLogsS3Bucket?: string;
  FlowLogsS3Prefix?: string;
}
export interface UpdateCustomRoutingAcceleratorAttributesResponse {
  AcceleratorAttributes?: CustomRoutingAcceleratorAttributes;
}
export interface UpdateCustomRoutingListenerRequest {
  ListenerArn: string;
  PortRanges: PortRange[];
}
export interface UpdateCustomRoutingListenerResponse {
  Listener?: CustomRoutingListener;
}
export interface UpdateEndpointGroupRequest {
  EndpointGroupArn: string;
  EndpointConfigurations?: EndpointConfiguration[];
  TrafficDialPercentage?: number;
  HealthCheckPort?: number;
  HealthCheckProtocol?: HealthCheckProtocol;
  HealthCheckPath?: string;
  HealthCheckIntervalSeconds?: number;
  ThresholdCount?: number;
  PortOverrides?: PortOverride[];
}
export interface UpdateEndpointGroupResponse {
  EndpointGroup?: EndpointGroup;
}
export interface UpdateListenerRequest {
  ListenerArn: string;
  PortRanges?: PortRange[];
  Protocol?: Protocol;
  ClientAffinity?: ClientAffinity;
}
export interface UpdateListenerResponse {
  Listener?: Listener;
}
export interface WithdrawByoipCidrRequest {
  Cidr: string;
}
export interface WithdrawByoipCidrResponse {
  ByoipCidr?: ByoipCidr;
}
export type ErrorMessage = string;
export type AddCustomRoutingEndpointsError =
  | AccessDeniedException
  | ConflictException
  | EndpointAlreadyExistsException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | CommonErrors;
/**
 * Associate a virtual private cloud (VPC) subnet endpoint with your custom routing accelerator.
 *
 * The listener port range must be large enough to support the number of IP addresses that can be
 * specified in your subnet. The number of ports required is: subnet size times the number
 * of ports per destination EC2 instances. For example, a subnet defined as /24 requires a listener
 * port range of at least 255 ports.
 *
 * Note: You must have enough remaining listener ports available to
 * map to the subnet ports, or the call will fail with a LimitExceededException.
 *
 * By default, all destinations in a subnet in a custom routing accelerator cannot receive traffic. To enable all
 * destinations to receive traffic, or to specify individual port mappings that can receive
 * traffic, see the
 * AllowCustomRoutingTraffic operation.
 */
export const addCustomRoutingEndpoints: API.OperationMethod<
  AddCustomRoutingEndpointsRequest,
  AddCustomRoutingEndpointsResponse,
  AddCustomRoutingEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointConfigurations: D.list({ EndpointId: 0, AttachmentArn: 0 }),
      EndpointGroupArn: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    EndpointAlreadyExistsException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddCustomRoutingEndpoints",
})) as any;

export type AddEndpointsError =
  | AccessDeniedException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Add endpoints to an endpoint group. The `AddEndpoints` API operation is the recommended option for adding endpoints. The
 * alternative options are to add endpoints when you create an endpoint group (with the
 * CreateEndpointGroup API)
 * or when you update an endpoint group (with the
 * UpdateEndpointGroup API).
 *
 * There are two advantages to using `AddEndpoints` to add endpoints in Global Accelerator:
 *
 * - It's faster, because Global Accelerator only has to resolve the new endpoints that
 * you're adding, rather than resolving new and existing endpoints.
 *
 * - It's more convenient, because you don't need to specify the current
 * endpoints that are already in the endpoint group, in addition to the new endpoints that
 * you want to add.
 *
 * For information about endpoint types and requirements for endpoints that you can add
 * to Global Accelerator, see
 * Endpoints for standard accelerators in the *Global Accelerator Developer Guide*.
 */
export const addEndpoints: API.OperationMethod<
  AddEndpointsRequest,
  AddEndpointsResponse,
  AddEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointConfigurations: D.list(i_EndpointConfiguration),
      EndpointGroupArn: 0,
    },
  },
  errors: [
    AccessDeniedException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddEndpoints",
})) as any;

export type AdvertiseByoipCidrError =
  | AccessDeniedException
  | ByoipCidrNotFoundException
  | IncorrectCidrStateException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Advertises an IPv4 address range that is provisioned for use with your Amazon Web Services resources
 * through bring your own IP addresses (BYOIP). It can take a few minutes before traffic to
 * the specified addresses starts routing to Amazon Web Services because of propagation delays.
 *
 * To stop advertising the BYOIP address range, use
 * WithdrawByoipCidr.
 *
 * For more information, see Bring your own
 * IP addresses (BYOIP) in the *Global Accelerator Developer Guide*.
 */
export const advertiseByoipCidr: API.OperationMethod<
  AdvertiseByoipCidrRequest,
  AdvertiseByoipCidrResponse,
  AdvertiseByoipCidrError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Cidr: 0 },
    output: { ByoipCidr: o_ByoipCidr },
  },
  errors: [
    AccessDeniedException,
    ByoipCidrNotFoundException,
    IncorrectCidrStateException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdvertiseByoipCidr",
})) as any;

export type AllowCustomRoutingTrafficError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Specify the Amazon EC2 instance (destination) IP addresses and ports for a VPC subnet endpoint that can receive traffic
 * for a custom routing accelerator. You can allow traffic to all destinations in the subnet endpoint, or allow traffic to a
 * specified list of destination IP addresses and ports in the subnet. Note that you cannot specify IP addresses or ports
 * outside of the range that you configured for the endpoint group.
 *
 * After you make changes, you can verify that the updates are complete by checking the status of your
 * accelerator: the status changes from IN_PROGRESS to DEPLOYED.
 */
export const allowCustomRoutingTraffic: API.OperationMethod<
  AllowCustomRoutingTrafficRequest,
  AllowCustomRoutingTrafficResponse,
  AllowCustomRoutingTrafficError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointGroupArn: 0,
      EndpointId: 0,
      DestinationAddresses: 0,
      DestinationPorts: 0,
      AllowAllTrafficToEndpoint: 0,
    },
  },
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllowCustomRoutingTraffic",
})) as any;

export type CreateAcceleratorError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Create an accelerator. An accelerator includes one or more listeners that process inbound connections and direct traffic
 * to one or more endpoint groups, each of which includes endpoints, such as Network Load Balancers.
 *
 * Global Accelerator is a global service that supports endpoints in multiple Amazon Web Services Regions but you must specify the
 * US West (Oregon) Region to create, update, or otherwise work with accelerators. That is, for example, specify `--region us-west-2`
 * on Amazon Web Services CLI commands.
 */
export const createAccelerator: API.OperationMethod<
  CreateAcceleratorRequest,
  CreateAcceleratorResponse,
  CreateAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      IpAddressType: 0,
      IpAddresses: 0,
      Enabled: 0,
      IdempotencyToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: { Accelerator: o_Accelerator },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccelerator",
})) as any;

export type CreateCrossAccountAttachmentError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Create a cross-account attachment in Global Accelerator. You create a cross-account attachment to
 * specify the *principals* who have permission to work with *resources*
 * in accelerators in their own account. You specify, in the same attachment, the resources that are shared.
 *
 * A principal can be an Amazon Web Services account number or the Amazon Resource Name (ARN) for an
 * accelerator. For account numbers that are listed as principals, to work with a resource listed in the attachment,
 * you must sign in to an account specified as a principal. Then, you can work with resources that are listed,
 * with any of your accelerators. If an accelerator ARN is listed in the cross-account attachment as a principal,
 * anyone with permission to make updates to the accelerator can work with resources that are listed in the
 * attachment.
 *
 * Specify each principal and resource separately. To specify two CIDR address pools, list
 * them individually under `Resources`, and so on. For a command line operation, for example,
 * you might use a statement like the following:
 *
 * ` "Resources": [{"Cidr": "169.254.60.0/24"},{"Cidr": "169.254.59.0/24"}]`
 *
 * For more information, see
 * Working with cross-account attachments and resources in Global Accelerator in the
 * Global Accelerator Developer Guide.
 */
export const createCrossAccountAttachment: API.OperationMethod<
  CreateCrossAccountAttachmentRequest,
  CreateCrossAccountAttachmentResponse,
  CreateCrossAccountAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Principals: 0,
      Resources: D.list(i_Resource),
      IdempotencyToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: { CrossAccountAttachment: o_Attachment },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCrossAccountAttachment",
})) as any;

export type CreateCustomRoutingAcceleratorError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Create a custom routing accelerator. A custom routing accelerator directs traffic to one of possibly thousands
 * of Amazon EC2 instance destinations running in a single or multiple virtual private clouds (VPC) subnet endpoints.
 *
 * Be aware that, by default, all destination EC2 instances in a VPC subnet endpoint cannot receive
 * traffic. To enable all destinations to receive traffic, or to specify individual port
 * mappings that can receive traffic, see the
 * AllowCustomRoutingTraffic operation.
 *
 * Global Accelerator is a global service that supports endpoints in multiple Amazon Web Services Regions but you must specify the
 * US West (Oregon) Region to create, update, or otherwise work with accelerators. That is, for example, specify `--region us-west-2`
 * on Amazon Web Services CLI commands.
 */
export const createCustomRoutingAccelerator: API.OperationMethod<
  CreateCustomRoutingAcceleratorRequest,
  CreateCustomRoutingAcceleratorResponse,
  CreateCustomRoutingAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      IpAddressType: 0,
      IpAddresses: 0,
      Enabled: 0,
      IdempotencyToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: { Accelerator: o_CustomRoutingAccelerator },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomRoutingAccelerator",
})) as any;

export type CreateCustomRoutingEndpointGroupError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | EndpointGroupAlreadyExistsException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidPortRangeException
  | LimitExceededException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Create an endpoint group for the specified listener for a custom routing accelerator.
 * An endpoint group is a collection of endpoints in one Amazon Web Services
 * Region.
 */
export const createCustomRoutingEndpointGroup: API.OperationMethod<
  CreateCustomRoutingEndpointGroupRequest,
  CreateCustomRoutingEndpointGroupResponse,
  CreateCustomRoutingEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ListenerArn: 0,
      EndpointGroupRegion: 0,
      DestinationConfigurations: D.list({
        FromPort: 0,
        ToPort: 0,
        Protocols: 0,
      }),
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    EndpointGroupAlreadyExistsException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidPortRangeException,
    LimitExceededException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomRoutingEndpointGroup",
})) as any;

export type CreateCustomRoutingListenerError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidPortRangeException
  | LimitExceededException
  | CommonErrors;
/**
 * Create a listener to process inbound connections from clients to a custom routing accelerator.
 * Connections arrive to assigned static IP addresses on the port range that you specify.
 */
export const createCustomRoutingListener: API.OperationMethod<
  CreateCustomRoutingListenerRequest,
  CreateCustomRoutingListenerResponse,
  CreateCustomRoutingListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AcceleratorArn: 0,
      PortRanges: D.list(i_PortRange),
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidPortRangeException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomRoutingListener",
})) as any;

export type CreateEndpointGroupError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | EndpointGroupAlreadyExistsException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Create an endpoint group for the specified listener. An endpoint group is a collection of endpoints in one Amazon Web Services
 * Region. A resource must be valid and active when you add it as an endpoint.
 *
 * For more information about endpoint types and requirements for endpoints that you can add
 * to Global Accelerator, see
 * Endpoints for standard accelerators in the *Global Accelerator Developer Guide*.
 */
export const createEndpointGroup: API.OperationMethod<
  CreateEndpointGroupRequest,
  CreateEndpointGroupResponse,
  CreateEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ListenerArn: 0,
      EndpointGroupRegion: 0,
      EndpointConfigurations: D.list(i_EndpointConfiguration),
      TrafficDialPercentage: 0,
      HealthCheckPort: 0,
      HealthCheckProtocol: 0,
      HealthCheckPath: 0,
      HealthCheckIntervalSeconds: 0,
      ThresholdCount: 0,
      IdempotencyToken: D.m({ idempotency: true }),
      PortOverrides: D.list(i_PortOverride),
    },
  },
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    EndpointGroupAlreadyExistsException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpointGroup",
})) as any;

export type CreateListenerError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidPortRangeException
  | LimitExceededException
  | CommonErrors;
/**
 * Create a listener to process inbound connections from clients to an accelerator. Connections arrive to assigned static
 * IP addresses on a port, port range, or list of port ranges that you specify.
 */
export const createListener: API.OperationMethod<
  CreateListenerRequest,
  CreateListenerResponse,
  CreateListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AcceleratorArn: 0,
      PortRanges: D.list(i_PortRange),
      Protocol: 0,
      ClientAffinity: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidPortRangeException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateListener",
})) as any;

export type DeleteAcceleratorError =
  | AcceleratorNotDisabledException
  | AcceleratorNotFoundException
  | AssociatedListenerFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Delete an accelerator. Before you can delete an accelerator, you must disable it and remove all dependent resources
 * (listeners and endpoint groups). To disable the accelerator, update the accelerator to set `Enabled` to false.
 *
 * When you create an accelerator, by default, Global Accelerator provides you with a set of two static IP addresses.
 * Alternatively, you can bring your own IP address ranges to Global Accelerator and assign IP addresses from those ranges.
 *
 * The IP addresses are assigned to your accelerator for as long as it exists, even if you disable the accelerator and
 * it no longer accepts or routes traffic. However, when you *delete* an accelerator, you lose the
 * static IP addresses that are assigned to the accelerator, so you can no longer route traffic by using them.
 * As a best practice, ensure that you have permissions in place to avoid inadvertently deleting accelerators. You
 * can use IAM policies with Global Accelerator to limit the users who have permissions to delete an accelerator. For more information,
 * see Identity and access management in
 * the *Global Accelerator Developer Guide*.
 */
export const deleteAccelerator: API.OperationMethod<
  DeleteAcceleratorRequest,
  DeleteAcceleratorResponse,
  DeleteAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AcceleratorArn: 0 } },
  errors: [
    AcceleratorNotDisabledException,
    AcceleratorNotFoundException,
    AssociatedListenerFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccelerator",
})) as any;

export type DeleteCrossAccountAttachmentError =
  | AccessDeniedException
  | AttachmentNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Delete a cross-account attachment. When you delete an attachment, Global Accelerator revokes the permission
 * to use the resources in the attachment from all principals in the list of principals. Global Accelerator
 * revokes the permission for specific resources.
 *
 * For more information, see
 * Working with cross-account attachments and resources in Global Accelerator in the
 * Global Accelerator Developer Guide.
 */
export const deleteCrossAccountAttachment: API.OperationMethod<
  DeleteCrossAccountAttachmentRequest,
  DeleteCrossAccountAttachmentResponse,
  DeleteCrossAccountAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AttachmentArn: 0 } },
  errors: [
    AccessDeniedException,
    AttachmentNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCrossAccountAttachment",
})) as any;

export type DeleteCustomRoutingAcceleratorError =
  | AcceleratorNotDisabledException
  | AcceleratorNotFoundException
  | AssociatedListenerFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Delete a custom routing accelerator. Before you can delete an accelerator, you must disable it and remove all dependent resources
 * (listeners and endpoint groups). To disable the accelerator, update the accelerator to set `Enabled` to false.
 *
 * When you create a custom routing accelerator, by default, Global Accelerator provides you with a set of two static IP addresses.
 *
 * The IP
 * addresses are assigned to your accelerator for as long as it exists, even if you disable the accelerator and
 * it no longer accepts or routes traffic. However, when you *delete* an accelerator, you lose the
 * static IP addresses that are assigned to the accelerator, so you can no longer route traffic by using them.
 * As a best practice, ensure that you have permissions in place to avoid inadvertently deleting accelerators. You
 * can use IAM policies with Global Accelerator to limit the users who have permissions to delete an accelerator. For more information,
 * see Identity and access management in
 * the *Global Accelerator Developer Guide*.
 */
export const deleteCustomRoutingAccelerator: API.OperationMethod<
  DeleteCustomRoutingAcceleratorRequest,
  DeleteCustomRoutingAcceleratorResponse,
  DeleteCustomRoutingAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AcceleratorArn: 0 } },
  errors: [
    AcceleratorNotDisabledException,
    AcceleratorNotFoundException,
    AssociatedListenerFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomRoutingAccelerator",
})) as any;

export type DeleteCustomRoutingEndpointGroupError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Delete an endpoint group from a listener for a custom routing accelerator.
 */
export const deleteCustomRoutingEndpointGroup: API.OperationMethod<
  DeleteCustomRoutingEndpointGroupRequest,
  DeleteCustomRoutingEndpointGroupResponse,
  DeleteCustomRoutingEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EndpointGroupArn: 0 } },
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomRoutingEndpointGroup",
})) as any;

export type DeleteCustomRoutingListenerError =
  | AssociatedEndpointGroupFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Delete a listener for a custom routing accelerator.
 */
export const deleteCustomRoutingListener: API.OperationMethod<
  DeleteCustomRoutingListenerRequest,
  DeleteCustomRoutingListenerResponse,
  DeleteCustomRoutingListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ListenerArn: 0 } },
  errors: [
    AssociatedEndpointGroupFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomRoutingListener",
})) as any;

export type DeleteEndpointGroupError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Delete an endpoint group from a listener.
 */
export const deleteEndpointGroup: API.OperationMethod<
  DeleteEndpointGroupRequest,
  DeleteEndpointGroupResponse,
  DeleteEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EndpointGroupArn: 0 } },
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpointGroup",
})) as any;

export type DeleteListenerError =
  | AssociatedEndpointGroupFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Delete a listener from an accelerator.
 */
export const deleteListener: API.OperationMethod<
  DeleteListenerRequest,
  DeleteListenerResponse,
  DeleteListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ListenerArn: 0 } },
  errors: [
    AssociatedEndpointGroupFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteListener",
})) as any;

export type DenyCustomRoutingTrafficError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Specify the Amazon EC2 instance (destination) IP addresses and ports for a VPC subnet endpoint that cannot receive traffic
 * for a custom routing accelerator. You can deny traffic to all destinations in the VPC endpoint, or deny traffic to a
 * specified list of destination IP addresses and ports. Note that you cannot specify IP addresses
 * or ports outside of the range that you configured for the endpoint group.
 *
 * After you make changes, you can verify that the updates are complete by checking the status of your
 * accelerator: the status changes from IN_PROGRESS to DEPLOYED.
 */
export const denyCustomRoutingTraffic: API.OperationMethod<
  DenyCustomRoutingTrafficRequest,
  DenyCustomRoutingTrafficResponse,
  DenyCustomRoutingTrafficError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointGroupArn: 0,
      EndpointId: 0,
      DestinationAddresses: 0,
      DestinationPorts: 0,
      DenyAllTrafficToEndpoint: 0,
    },
  },
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DenyCustomRoutingTraffic",
})) as any;

export type DeprovisionByoipCidrError =
  | AccessDeniedException
  | ByoipCidrNotFoundException
  | IncorrectCidrStateException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Releases the specified address range that you provisioned to use with your Amazon Web Services resources
 * through bring your own IP addresses (BYOIP) and deletes the corresponding address pool.
 *
 * Before you can release an address range, you must stop advertising it by using WithdrawByoipCidr and you must not have
 * any accelerators that are using static IP addresses allocated from its address range.
 *
 * For more information, see Bring
 * your own IP addresses (BYOIP) in the *Global Accelerator Developer Guide*.
 */
export const deprovisionByoipCidr: API.OperationMethod<
  DeprovisionByoipCidrRequest,
  DeprovisionByoipCidrResponse,
  DeprovisionByoipCidrError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Cidr: 0 },
    output: { ByoipCidr: o_ByoipCidr },
  },
  errors: [
    AccessDeniedException,
    ByoipCidrNotFoundException,
    IncorrectCidrStateException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprovisionByoipCidr",
})) as any;

export type DescribeAcceleratorError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe an accelerator.
 */
export const describeAccelerator: API.OperationMethod<
  DescribeAcceleratorRequest,
  DescribeAcceleratorResponse,
  DescribeAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcceleratorArn: 0 },
    output: { Accelerator: o_Accelerator },
  },
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccelerator",
})) as any;

export type DescribeAcceleratorAttributesError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe the attributes of an accelerator.
 */
export const describeAcceleratorAttributes: API.OperationMethod<
  DescribeAcceleratorAttributesRequest,
  DescribeAcceleratorAttributesResponse,
  DescribeAcceleratorAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AcceleratorArn: 0 } },
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAcceleratorAttributes",
})) as any;

export type DescribeCrossAccountAttachmentError =
  | AccessDeniedException
  | AttachmentNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Gets configuration information about a cross-account attachment.
 */
export const describeCrossAccountAttachment: API.OperationMethod<
  DescribeCrossAccountAttachmentRequest,
  DescribeCrossAccountAttachmentResponse,
  DescribeCrossAccountAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AttachmentArn: 0 },
    output: { CrossAccountAttachment: o_Attachment },
  },
  errors: [
    AccessDeniedException,
    AttachmentNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCrossAccountAttachment",
})) as any;

export type DescribeCustomRoutingAcceleratorError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe a custom routing accelerator.
 */
export const describeCustomRoutingAccelerator: API.OperationMethod<
  DescribeCustomRoutingAcceleratorRequest,
  DescribeCustomRoutingAcceleratorResponse,
  DescribeCustomRoutingAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcceleratorArn: 0 },
    output: { Accelerator: o_CustomRoutingAccelerator },
  },
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomRoutingAccelerator",
})) as any;

export type DescribeCustomRoutingAcceleratorAttributesError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe the attributes of a custom routing accelerator.
 */
export const describeCustomRoutingAcceleratorAttributes: API.OperationMethod<
  DescribeCustomRoutingAcceleratorAttributesRequest,
  DescribeCustomRoutingAcceleratorAttributesResponse,
  DescribeCustomRoutingAcceleratorAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AcceleratorArn: 0 } },
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomRoutingAcceleratorAttributes",
})) as any;

export type DescribeCustomRoutingEndpointGroupError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe an endpoint group for a custom routing accelerator.
 */
export const describeCustomRoutingEndpointGroup: API.OperationMethod<
  DescribeCustomRoutingEndpointGroupRequest,
  DescribeCustomRoutingEndpointGroupResponse,
  DescribeCustomRoutingEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EndpointGroupArn: 0 } },
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomRoutingEndpointGroup",
})) as any;

export type DescribeCustomRoutingListenerError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * The description of a listener for a custom routing accelerator.
 */
export const describeCustomRoutingListener: API.OperationMethod<
  DescribeCustomRoutingListenerRequest,
  DescribeCustomRoutingListenerResponse,
  DescribeCustomRoutingListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ListenerArn: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomRoutingListener",
})) as any;

export type DescribeEndpointGroupError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe an endpoint group.
 */
export const describeEndpointGroup: API.OperationMethod<
  DescribeEndpointGroupRequest,
  DescribeEndpointGroupResponse,
  DescribeEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EndpointGroupArn: 0 } },
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointGroup",
})) as any;

export type DescribeListenerError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Describe a listener.
 */
export const describeListener: API.OperationMethod<
  DescribeListenerRequest,
  DescribeListenerResponse,
  DescribeListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ListenerArn: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeListener",
})) as any;

export type ListAcceleratorsError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the accelerators for an Amazon Web Services account.
 */
export const listAccelerators: API.PaginatedOperationMethod<
  ListAcceleratorsRequest,
  ListAcceleratorsResponse,
  ListAcceleratorsError,
  Credentials | HttpClient.HttpClient,
  Accelerator
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { Accelerators: D.list(o_Accelerator) },
  },
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccelerators",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Accelerators",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListByoipCidrsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists the IP address ranges that were specified in calls to ProvisionByoipCidr, including
 * the current state and a history of state changes.
 */
export const listByoipCidrs: API.PaginatedOperationMethod<
  ListByoipCidrsRequest,
  ListByoipCidrsResponse,
  ListByoipCidrsError,
  Credentials | HttpClient.HttpClient,
  ByoipCidr
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { ByoipCidrs: D.list(o_ByoipCidr) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListByoipCidrs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ByoipCidrs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCrossAccountAttachmentsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the cross-account attachments that have been created in Global Accelerator.
 */
export const listCrossAccountAttachments: API.PaginatedOperationMethod<
  ListCrossAccountAttachmentsRequest,
  ListCrossAccountAttachmentsResponse,
  ListCrossAccountAttachmentsError,
  Credentials | HttpClient.HttpClient,
  Attachment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { CrossAccountAttachments: D.list(o_Attachment) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrossAccountAttachments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CrossAccountAttachments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCrossAccountResourceAccountsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | CommonErrors;
/**
 * List the accounts that have cross-account resources.
 *
 * For more information, see
 * Working with cross-account attachments and resources in Global Accelerator in the
 * Global Accelerator Developer Guide.
 */
export const listCrossAccountResourceAccounts: API.OperationMethod<
  ListCrossAccountResourceAccountsRequest,
  ListCrossAccountResourceAccountsResponse,
  ListCrossAccountResourceAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [AccessDeniedException, InternalServiceErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrossAccountResourceAccounts",
})) as any;

export type ListCrossAccountResourcesError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the cross-account resources available to work with.
 */
export const listCrossAccountResources: API.PaginatedOperationMethod<
  ListCrossAccountResourcesRequest,
  ListCrossAccountResourcesResponse,
  ListCrossAccountResourcesError,
  Credentials | HttpClient.HttpClient,
  CrossAccountResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AcceleratorArn: 0,
      ResourceOwnerAwsAccountId: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrossAccountResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CrossAccountResources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomRoutingAcceleratorsError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the custom routing accelerators for an Amazon Web Services account.
 */
export const listCustomRoutingAccelerators: API.PaginatedOperationMethod<
  ListCustomRoutingAcceleratorsRequest,
  ListCustomRoutingAcceleratorsResponse,
  ListCustomRoutingAcceleratorsError,
  Credentials | HttpClient.HttpClient,
  CustomRoutingAccelerator
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { Accelerators: D.list(o_CustomRoutingAccelerator) },
  },
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomRoutingAccelerators",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Accelerators",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomRoutingEndpointGroupsError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * List the endpoint groups that are associated with a listener for a custom routing accelerator.
 */
export const listCustomRoutingEndpointGroups: API.PaginatedOperationMethod<
  ListCustomRoutingEndpointGroupsRequest,
  ListCustomRoutingEndpointGroupsResponse,
  ListCustomRoutingEndpointGroupsError,
  Credentials | HttpClient.HttpClient,
  CustomRoutingEndpointGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ListenerArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomRoutingEndpointGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EndpointGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomRoutingListenersError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the listeners for a custom routing accelerator.
 */
export const listCustomRoutingListeners: API.PaginatedOperationMethod<
  ListCustomRoutingListenersRequest,
  ListCustomRoutingListenersResponse,
  ListCustomRoutingListenersError,
  Credentials | HttpClient.HttpClient,
  CustomRoutingListener
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { AcceleratorArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomRoutingListeners",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Listeners",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomRoutingPortMappingsError =
  | AcceleratorNotFoundException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Provides a complete mapping from the public accelerator IP address and port to destination EC2 instance
 * IP addresses and ports in the virtual public cloud (VPC) subnet endpoint for a custom routing accelerator.
 * For each subnet endpoint that you add, Global Accelerator creates a new static port mapping for the accelerator. The port
 * mappings don't change after Global Accelerator generates them, so you can retrieve and cache the full mapping on your servers.
 *
 * If you remove a subnet from your accelerator, Global Accelerator removes (reclaims) the port mappings. If you add a subnet to
 * your accelerator, Global Accelerator creates new port mappings (the existing ones don't change). If you add or remove EC2 instances
 * in your subnet, the port mappings don't change, because the mappings are created when you add the subnet to Global Accelerator.
 *
 * The mappings also include a flag for each destination denoting which destination IP addresses and
 * ports are allowed or denied traffic.
 */
export const listCustomRoutingPortMappings: API.PaginatedOperationMethod<
  ListCustomRoutingPortMappingsRequest,
  ListCustomRoutingPortMappingsResponse,
  ListCustomRoutingPortMappingsError,
  Credentials | HttpClient.HttpClient,
  PortMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AcceleratorArn: 0,
      EndpointGroupArn: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    AcceleratorNotFoundException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomRoutingPortMappings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PortMappings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomRoutingPortMappingsByDestinationError =
  | EndpointNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the port mappings for a specific EC2 instance (destination) in a VPC subnet endpoint. The
 * response is the mappings for one destination IP address. This is useful when your subnet endpoint has mappings that
 * span multiple custom routing accelerators in your account, or for scenarios where you only want to
 * list the port mappings for a specific destination instance.
 */
export const listCustomRoutingPortMappingsByDestination: API.PaginatedOperationMethod<
  ListCustomRoutingPortMappingsByDestinationRequest,
  ListCustomRoutingPortMappingsByDestinationResponse,
  ListCustomRoutingPortMappingsByDestinationError,
  Credentials | HttpClient.HttpClient,
  DestinationPortMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointId: 0,
      DestinationAddress: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    EndpointNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomRoutingPortMappingsByDestination",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DestinationPortMappings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEndpointGroupsError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * List the endpoint groups that are associated with a listener.
 */
export const listEndpointGroups: API.PaginatedOperationMethod<
  ListEndpointGroupsRequest,
  ListEndpointGroupsResponse,
  ListEndpointGroupsError,
  Credentials | HttpClient.HttpClient,
  EndpointGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ListenerArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEndpointGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EndpointGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListListenersError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the listeners for an accelerator.
 */
export const listListeners: API.PaginatedOperationMethod<
  ListListenersRequest,
  ListListenersResponse,
  ListListenersError,
  Credentials | HttpClient.HttpClient,
  Listener
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { AcceleratorArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListListeners",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Listeners",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AcceleratorNotFoundException
  | AttachmentNotFoundException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * List all tags for an accelerator.
 *
 * For more information, see Tagging
 * in Global Accelerator in the *Global Accelerator Developer Guide*.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    AcceleratorNotFoundException,
    AttachmentNotFoundException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ProvisionByoipCidrError =
  | AccessDeniedException
  | IncorrectCidrStateException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | CommonErrors;
/**
 * Provisions an IP address range to use with your Amazon Web Services resources through bring your own IP
 * addresses (BYOIP) and creates a corresponding address pool. After the address range is provisioned,
 * it is ready to be advertised using
 * AdvertiseByoipCidr.
 *
 * For more information, see Bring your own
 * IP addresses (BYOIP) in the *Global Accelerator Developer Guide*.
 */
export const provisionByoipCidr: API.OperationMethod<
  ProvisionByoipCidrRequest,
  ProvisionByoipCidrResponse,
  ProvisionByoipCidrError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Cidr: 0, CidrAuthorizationContext: { Message: 0, Signature: 0 } },
    output: { ByoipCidr: o_ByoipCidr },
  },
  errors: [
    AccessDeniedException,
    IncorrectCidrStateException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ProvisionByoipCidr",
})) as any;

export type RemoveCustomRoutingEndpointsError =
  | AccessDeniedException
  | ConflictException
  | EndpointGroupNotFoundException
  | EndpointNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Remove endpoints from a custom routing accelerator.
 */
export const removeCustomRoutingEndpoints: API.OperationMethod<
  RemoveCustomRoutingEndpointsRequest,
  RemoveCustomRoutingEndpointsResponse,
  RemoveCustomRoutingEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EndpointIds: 0, EndpointGroupArn: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    EndpointGroupNotFoundException,
    EndpointNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveCustomRoutingEndpoints",
})) as any;

export type RemoveEndpointsError =
  | AccessDeniedException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Remove endpoints from an endpoint group.
 *
 * The `RemoveEndpoints` API operation is the recommended option for removing endpoints. The alternative is to remove
 * endpoints by updating an endpoint group by using the
 * UpdateEndpointGroup
 * API operation. There are two advantages to using `AddEndpoints` to remove endpoints instead:
 *
 * - It's more convenient, because you only need to specify the endpoints that you want to remove. With the
 * `UpdateEndpointGroup` API operation, you must specify all of the endpoints in the
 * endpoint group except the ones that you want to remove from the group.
 *
 * - It's faster, because Global Accelerator doesn't need to resolve any endpoints. With the
 * `UpdateEndpointGroup` API operation, Global Accelerator must resolve all of the endpoints that
 * remain in the group.
 */
export const removeEndpoints: API.OperationMethod<
  RemoveEndpointsRequest,
  RemoveEndpointsResponse,
  RemoveEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointIdentifiers: D.list({
        EndpointId: 0,
        ClientIPPreservationEnabled: 0,
      }),
      EndpointGroupArn: 0,
    },
  },
  errors: [
    AccessDeniedException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveEndpoints",
})) as any;

export type TagResourceError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Add tags to an accelerator resource.
 *
 * For more information, see Tagging
 * in Global Accelerator in the *Global Accelerator Developer Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Remove tags from a Global Accelerator resource. When you specify a tag key, the action removes both that key and its associated value.
 * The operation succeeds even if you attempt to remove tags from an accelerator that was already removed.
 *
 * For more information, see Tagging
 * in Global Accelerator in the *Global Accelerator Developer Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAcceleratorError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Update an accelerator to make changes, such as the following:
 *
 * - Change the name of the accelerator.
 *
 * - Disable the accelerator so that it no longer accepts or routes traffic, or so that you can delete it.
 *
 * - Enable the accelerator, if it is disabled.
 *
 * - Change the IP address type to dual-stack if it is IPv4, or change the IP address type to IPv4 if it's dual-stack.
 *
 * Be aware that static IP addresses remain assigned to your accelerator for as long as it exists, even if you disable the accelerator and it no
 * longer accepts or routes traffic. However, when you delete the accelerator, you lose the static IP addresses that are assigned to it, so you
 * can no longer route traffic by using them.
 *
 * Global Accelerator is a global service that supports endpoints in multiple Amazon Web Services Regions but you must specify the
 * US West (Oregon) Region to create, update, or otherwise work with accelerators. That is, for example, specify `--region us-west-2`
 * on Amazon Web Services CLI commands.
 */
export const updateAccelerator: API.OperationMethod<
  UpdateAcceleratorRequest,
  UpdateAcceleratorResponse,
  UpdateAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AcceleratorArn: 0,
      Name: 0,
      IpAddressType: 0,
      IpAddresses: 0,
      Enabled: 0,
    },
    output: { Accelerator: o_Accelerator },
  },
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccelerator",
})) as any;

export type UpdateAcceleratorAttributesError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Update the attributes for an accelerator.
 */
export const updateAcceleratorAttributes: API.OperationMethod<
  UpdateAcceleratorAttributesRequest,
  UpdateAcceleratorAttributesResponse,
  UpdateAcceleratorAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AcceleratorArn: 0,
      FlowLogsEnabled: 0,
      FlowLogsS3Bucket: 0,
      FlowLogsS3Prefix: 0,
    },
  },
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAcceleratorAttributes",
})) as any;

export type UpdateCrossAccountAttachmentError =
  | AccessDeniedException
  | AttachmentNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Update a cross-account attachment to add or remove principals or resources. When you update
 * an attachment to remove a principal (account ID or accelerator) or a resource, Global Accelerator
 * revokes the permission for specific resources.
 *
 * For more information, see
 * Working with cross-account attachments and resources in Global Accelerator in the
 * Global Accelerator Developer Guide.
 */
export const updateCrossAccountAttachment: API.OperationMethod<
  UpdateCrossAccountAttachmentRequest,
  UpdateCrossAccountAttachmentResponse,
  UpdateCrossAccountAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AttachmentArn: 0,
      Name: 0,
      AddPrincipals: 0,
      RemovePrincipals: 0,
      AddResources: D.list(i_Resource),
      RemoveResources: D.list(i_Resource),
    },
    output: { CrossAccountAttachment: o_Attachment },
  },
  errors: [
    AccessDeniedException,
    AttachmentNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCrossAccountAttachment",
})) as any;

export type UpdateCustomRoutingAcceleratorError =
  | AcceleratorNotFoundException
  | ConflictException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Update a custom routing accelerator.
 */
export const updateCustomRoutingAccelerator: API.OperationMethod<
  UpdateCustomRoutingAcceleratorRequest,
  UpdateCustomRoutingAcceleratorResponse,
  UpdateCustomRoutingAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AcceleratorArn: 0,
      Name: 0,
      IpAddressType: 0,
      IpAddresses: 0,
      Enabled: 0,
    },
    output: { Accelerator: o_CustomRoutingAccelerator },
  },
  errors: [
    AcceleratorNotFoundException,
    ConflictException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomRoutingAccelerator",
})) as any;

export type UpdateCustomRoutingAcceleratorAttributesError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Update the attributes for a custom routing accelerator.
 */
export const updateCustomRoutingAcceleratorAttributes: API.OperationMethod<
  UpdateCustomRoutingAcceleratorAttributesRequest,
  UpdateCustomRoutingAcceleratorAttributesResponse,
  UpdateCustomRoutingAcceleratorAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AcceleratorArn: 0,
      FlowLogsEnabled: 0,
      FlowLogsS3Bucket: 0,
      FlowLogsS3Prefix: 0,
    },
  },
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomRoutingAcceleratorAttributes",
})) as any;

export type UpdateCustomRoutingListenerError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidPortRangeException
  | LimitExceededException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Update a listener for a custom routing accelerator.
 */
export const updateCustomRoutingListener: API.OperationMethod<
  UpdateCustomRoutingListenerRequest,
  UpdateCustomRoutingListenerResponse,
  UpdateCustomRoutingListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ListenerArn: 0, PortRanges: D.list(i_PortRange) },
  },
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidPortRangeException,
    LimitExceededException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomRoutingListener",
})) as any;

export type UpdateEndpointGroupError =
  | AccessDeniedException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | CommonErrors;
/**
 * Update an endpoint group. A resource must be valid and active when you add it as an endpoint.
 */
export const updateEndpointGroup: API.OperationMethod<
  UpdateEndpointGroupRequest,
  UpdateEndpointGroupResponse,
  UpdateEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointGroupArn: 0,
      EndpointConfigurations: D.list(i_EndpointConfiguration),
      TrafficDialPercentage: 0,
      HealthCheckPort: 0,
      HealthCheckProtocol: 0,
      HealthCheckPath: 0,
      HealthCheckIntervalSeconds: 0,
      ThresholdCount: 0,
      PortOverrides: D.list(i_PortOverride),
    },
  },
  errors: [
    AccessDeniedException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEndpointGroup",
})) as any;

export type UpdateListenerError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidPortRangeException
  | LimitExceededException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Update a listener.
 */
export const updateListener: API.OperationMethod<
  UpdateListenerRequest,
  UpdateListenerResponse,
  UpdateListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ListenerArn: 0,
      PortRanges: D.list(i_PortRange),
      Protocol: 0,
      ClientAffinity: 0,
    },
  },
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidPortRangeException,
    LimitExceededException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateListener",
})) as any;

export type WithdrawByoipCidrError =
  | AccessDeniedException
  | ByoipCidrNotFoundException
  | IncorrectCidrStateException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Stops advertising an address range that is provisioned as an address pool.
 * You can perform this operation at most once every 10 seconds, even if you specify different address
 * ranges each time.
 *
 * It can take a few minutes before traffic to the specified addresses stops routing to Amazon Web Services because of
 * propagation delays.
 *
 * For more information, see Bring your own
 * IP addresses (BYOIP) in the *Global Accelerator Developer Guide*.
 */
export const withdrawByoipCidr: API.OperationMethod<
  WithdrawByoipCidrRequest,
  WithdrawByoipCidrResponse,
  WithdrawByoipCidrError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Cidr: 0 },
    output: { ByoipCidr: o_ByoipCidr },
  },
  errors: [
    AccessDeniedException,
    ByoipCidrNotFoundException,
    IncorrectCidrStateException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "WithdrawByoipCidr",
})) as any;

const i_EndpointConfiguration: D.LazyStruct = () => ({
  EndpointId: 0,
  Weight: 0,
  ClientIPPreservationEnabled: 0,
  AttachmentArn: 0,
});
const i_PortOverride: D.LazyStruct = () => ({
  ListenerPort: 0,
  EndpointPort: 0,
});
const i_PortRange: D.LazyStruct = () => ({ FromPort: 0, ToPort: 0 });
const i_Resource: D.LazyStruct = () => ({ EndpointId: 0, Cidr: 0, Region: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Accelerator: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
  Events: D.list({ Timestamp: D.ts }),
});
const o_Attachment: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
  CreatedTime: D.ts,
});
const o_ByoipCidr: D.LazyStruct = () => ({
  Events: D.list({ Timestamp: D.ts }),
});
const o_CustomRoutingAccelerator: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
});
