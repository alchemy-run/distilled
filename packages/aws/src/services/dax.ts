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
const ns = /*@__PURE__*/ T.XmlNamespace("http://dax.amazonaws.com/doc/2017-04-19/");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "DAX", serviceShapeName: "AmazonDAXV3" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "dax" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-04-19");
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
              `https://dax-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://dax-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://dax.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://dax.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://dax.{R}.{D}","properties":{},"headers":{}}');

export class ClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterAlreadyExistsFault>()(
    "ClusterAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ClusterAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterNotFoundFault>()(
    "ClusterNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ClusterNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterQuotaForCustomerExceededFault>()(
    "ClusterQuotaForCustomerExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterQuotaForCustomerExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientClusterCapacityFault>()(
    "InsufficientClusterCapacityFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InsufficientClusterCapacity", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidARNFault
  extends /*@__PURE__*/ S.TaggedError<InvalidARNFault>()(
    "InvalidARNFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidARN", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterStateFault>()(
    "InvalidClusterStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidClusterState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameterCombination", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterGroupStateFault>()(
    "InvalidParameterGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameterGroupState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameterValue", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSubnet
  extends /*@__PURE__*/ S.TaggedError<InvalidSubnet>()(
    "InvalidSubnet",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSubnet", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidVPCNetworkStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidVPCNetworkStateFault>()(
    "InvalidVPCNetworkStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidVPCNetworkStateFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<NodeNotFoundFault>()(
    "NodeNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NodeNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeQuotaForClusterExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeQuotaForClusterExceededFault>()(
    "NodeQuotaForClusterExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NodeQuotaForClusterExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeQuotaForCustomerExceededFault>()(
    "NodeQuotaForCustomerExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "NodeQuotaForCustomerExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ParameterGroupAlreadyExistsFault>()(
    "ParameterGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ParameterGroupAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ParameterGroupNotFoundFault>()(
    "ParameterGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ParameterGroupNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ParameterGroupQuotaExceededFault>()(
    "ParameterGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ParameterGroupQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceLinkedRoleNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServiceLinkedRoleNotFoundFault>()(
    "ServiceLinkedRoleNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ServiceLinkedRoleNotFoundFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ServiceQuotaExceeded", httpResponseCode: 402 }),
      /*@__PURE__*/ T.HttpError(402),
    ),
  ).pipe(C.withQuotaError) {}
export class SubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupAlreadyExistsFault>()(
    "SubnetGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetGroupAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SubnetGroupInUseFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupInUseFault>()(
    "SubnetGroupInUseFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetGroupInUse", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupNotFoundFault>()(
    "SubnetGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetGroupNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupQuotaExceededFault>()(
    "SubnetGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetGroupQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetInUse
  extends /*@__PURE__*/ S.TaggedError<SubnetInUse>()(
    "SubnetInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetInUse", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class SubnetNotAllowedFault
  extends /*@__PURE__*/ S.TaggedError<SubnetNotAllowedFault>()(
    "SubnetNotAllowedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetNotAllowedFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SubnetQuotaExceededFault>()(
    "SubnetQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetQuotaExceededFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<TagNotFoundFault>()(
    "TagNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TagNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagQuotaPerResourceExceeded
  extends /*@__PURE__*/ S.TaggedError<TagQuotaPerResourceExceeded>()(
    "TagQuotaPerResourceExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TagQuotaPerResourceExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type AvailabilityZoneList = string[];
export type SecurityGroupIdentifierList = string[];
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export type SSEEnabled = boolean;
export interface SSESpecification {
  Enabled: boolean;
}
export type ClusterEndpointEncryptionType = "NONE" | "TLS" | (string & {});
export type NetworkType = "ipv4" | "ipv6" | "dual_stack" | (string & {});
export interface CreateClusterRequest {
  ClusterName: string;
  NodeType: string;
  Description?: string;
  ReplicationFactor: number;
  AvailabilityZones?: string[];
  SubnetGroupName?: string;
  SecurityGroupIds?: string[];
  PreferredMaintenanceWindow?: string;
  NotificationTopicArn?: string;
  IamRoleArn: string;
  ParameterGroupName?: string;
  Tags?: Tag[];
  SSESpecification?: SSESpecification;
  ClusterEndpointEncryptionType?: ClusterEndpointEncryptionType;
  NetworkType?: NetworkType;
}
export interface Endpoint {
  Address?: string;
  Port?: number;
  URL?: string;
}
const Endpoint = /*@__PURE__*/ __L.at(__c1, 0) as any as S.Schema<Endpoint>;
export type NodeIdentifierList = string[];
export interface Node {
  NodeId?: string;
  Endpoint?: Endpoint;
  NodeCreateTime?: Date;
  AvailabilityZone?: string;
  NodeStatus?: string;
  ParameterGroupStatus?: string;
}
export type NodeList = Node[];
export interface NotificationConfiguration {
  TopicArn?: string;
  TopicStatus?: string;
}
export interface SecurityGroupMembership {
  SecurityGroupIdentifier?: string;
  Status?: string;
}
export type SecurityGroupMembershipList = SecurityGroupMembership[];
export interface ParameterGroupStatus {
  ParameterGroupName?: string;
  ParameterApplyStatus?: string;
  NodeIdsToReboot?: string[];
}
export type SSEStatus = "ENABLING" | "ENABLED" | "DISABLING" | "DISABLED" | (string & {});
export interface SSEDescription {
  Status?: SSEStatus;
}
export interface Cluster {
  ClusterName?: string;
  Description?: string;
  ClusterArn?: string;
  TotalNodes?: number;
  ActiveNodes?: number;
  NodeType?: string;
  Status?: string;
  ClusterDiscoveryEndpoint?: Endpoint;
  NodeIdsToRemove?: string[];
  Nodes?: Node[];
  PreferredMaintenanceWindow?: string;
  NotificationConfiguration?: NotificationConfiguration;
  SubnetGroup?: string;
  SecurityGroups?: SecurityGroupMembership[];
  IamRoleArn?: string;
  ParameterGroup?: ParameterGroupStatus;
  SSEDescription?: SSEDescription;
  ClusterEndpointEncryptionType?: ClusterEndpointEncryptionType;
  NetworkType?: NetworkType;
}
export interface CreateClusterResponse {
  Cluster?: Cluster;
}
export interface CreateParameterGroupRequest {
  ParameterGroupName: string;
  Description?: string;
}
export interface ParameterGroup {
  ParameterGroupName?: string;
  Description?: string;
}
export interface CreateParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export type SubnetIdentifierList = string[];
export interface CreateSubnetGroupRequest {
  SubnetGroupName: string;
  Description?: string;
  SubnetIds: string[];
}
export type NetworkTypeList = NetworkType[];
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: string;
  SupportedNetworkTypes?: NetworkType[];
}
export type SubnetList = Subnet[];
export interface SubnetGroup {
  SubnetGroupName?: string;
  Description?: string;
  VpcId?: string;
  Subnets?: Subnet[];
  SupportedNetworkTypes?: NetworkType[];
}
export interface CreateSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export interface DecreaseReplicationFactorRequest {
  ClusterName: string;
  NewReplicationFactor: number;
  AvailabilityZones?: string[];
  NodeIdsToRemove?: string[];
}
export interface DecreaseReplicationFactorResponse {
  Cluster?: Cluster;
}
export interface DeleteClusterRequest {
  ClusterName: string;
}
export interface DeleteClusterResponse {
  Cluster?: Cluster;
}
export interface DeleteParameterGroupRequest {
  ParameterGroupName: string;
}
export interface DeleteParameterGroupResponse {
  DeletionMessage?: string;
}
export interface DeleteSubnetGroupRequest {
  SubnetGroupName: string;
}
export interface DeleteSubnetGroupResponse {
  DeletionMessage?: string;
}
export type ClusterNameList = string[];
export interface DescribeClustersRequest {
  ClusterNames?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type ClusterList = Cluster[];
export interface DescribeClustersResponse {
  NextToken?: string;
  Clusters?: Cluster[];
}
export interface DescribeDefaultParametersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type ParameterType = "DEFAULT" | "NODE_TYPE_SPECIFIC" | (string & {});
export interface NodeTypeSpecificValue {
  NodeType?: string;
  Value?: string;
}
export type NodeTypeSpecificValueList = NodeTypeSpecificValue[];
export type IsModifiable = "TRUE" | "FALSE" | "CONDITIONAL" | (string & {});
export type ChangeType = "IMMEDIATE" | "REQUIRES_REBOOT" | (string & {});
export interface Parameter {
  ParameterName?: string;
  ParameterType?: ParameterType;
  ParameterValue?: string;
  NodeTypeSpecificValues?: NodeTypeSpecificValue[];
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  IsModifiable?: IsModifiable;
  ChangeType?: ChangeType;
}
export type ParameterList = Parameter[];
export interface DescribeDefaultParametersResponse {
  NextToken?: string;
  Parameters?: Parameter[];
}
export type SourceType = "CLUSTER" | "PARAMETER_GROUP" | "SUBNET_GROUP" | (string & {});
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
export type ParameterGroupNameList = string[];
export interface DescribeParameterGroupsRequest {
  ParameterGroupNames?: string[];
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
  Source?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeParametersResponse {
  NextToken?: string;
  Parameters?: Parameter[];
}
export type SubnetGroupNameList = string[];
export interface DescribeSubnetGroupsRequest {
  SubnetGroupNames?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type SubnetGroupList = SubnetGroup[];
export interface DescribeSubnetGroupsResponse {
  NextToken?: string;
  SubnetGroups?: SubnetGroup[];
}
export interface IncreaseReplicationFactorRequest {
  ClusterName: string;
  NewReplicationFactor: number;
  AvailabilityZones?: string[];
}
export interface IncreaseReplicationFactorResponse {
  Cluster?: Cluster;
}
export interface ListTagsRequest {
  ResourceName: string;
  NextToken?: string;
}
export interface ListTagsResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export interface RebootNodeRequest {
  ClusterName: string;
  NodeId: string;
}
export interface RebootNodeResponse {
  Cluster?: Cluster;
}
export interface TagResourceRequest {
  ResourceName: string;
  Tags: Tag[];
}
export interface TagResourceResponse {
  Tags?: Tag[];
}
export type KeyList = string[];
export interface UntagResourceRequest {
  ResourceName: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {
  Tags?: Tag[];
}
export interface UpdateClusterRequest {
  ClusterName: string;
  Description?: string;
  PreferredMaintenanceWindow?: string;
  NotificationTopicArn?: string;
  NotificationTopicStatus?: string;
  ParameterGroupName?: string;
  SecurityGroupIds?: string[];
}
export interface UpdateClusterResponse {
  Cluster?: Cluster;
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
export type ExceptionMessage = string;
export type AwsQueryErrorMessage = string;
export type CreateClusterError =
  | ClusterAlreadyExistsFault
  | ClusterQuotaForCustomerExceededFault
  | InsufficientClusterCapacityFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | ServiceQuotaExceededException
  | SubnetGroupNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a DAX cluster. All nodes in the cluster run the same DAX caching software.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1, __c0, 1) as any as S.Schema<CreateClusterRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<CreateClusterResponse>,
  errors: [
    ClusterAlreadyExistsFault,
    ClusterQuotaForCustomerExceededFault,
    InsufficientClusterCapacityFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    ServiceQuotaExceededException,
    SubnetGroupNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupAlreadyExistsFault
  | ParameterGroupQuotaExceededFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Creates a new parameter group. A parameter group is a collection of parameters that
 * you apply to all of the nodes in a DAX cluster.
 */
export const createParameterGroup: API.OperationMethod<
  CreateParameterGroupRequest,
  CreateParameterGroupResponse,
  CreateParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<CreateParameterGroupRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<CreateParameterGroupResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupAlreadyExistsFault,
    ParameterGroupQuotaExceededFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateParameterGroup",
}));

export type CreateSubnetGroupError =
  | InvalidSubnet
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupAlreadyExistsFault
  | SubnetGroupQuotaExceededFault
  | SubnetNotAllowedFault
  | SubnetQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new subnet group.
 */
export const createSubnetGroup: API.OperationMethod<
  CreateSubnetGroupRequest,
  CreateSubnetGroupResponse,
  CreateSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<CreateSubnetGroupRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<CreateSubnetGroupResponse>,
  errors: [
    InvalidSubnet,
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupAlreadyExistsFault,
    SubnetGroupQuotaExceededFault,
    SubnetNotAllowedFault,
    SubnetQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubnetGroup",
}));

export type DecreaseReplicationFactorError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | NodeNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Removes one or more nodes from a DAX cluster.
 *
 * You cannot use `DecreaseReplicationFactor` to remove the last node
 * in a DAX cluster. If you need to do this, use
 * `DeleteCluster` instead.
 */
export const decreaseReplicationFactor: API.OperationMethod<
  DecreaseReplicationFactorRequest,
  DecreaseReplicationFactorResponse,
  DecreaseReplicationFactorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<DecreaseReplicationFactorRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<DecreaseReplicationFactorResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    NodeNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DecreaseReplicationFactor",
}));

export type DeleteClusterError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Deletes a previously provisioned DAX cluster.
 * *DeleteCluster* deletes all associated nodes, node endpoints and
 * the DAX cluster itself. When you receive a successful response from this
 * action, DAX immediately begins deleting the cluster; you cannot cancel or
 * revert this action.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<DeleteClusterRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<DeleteClusterResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified parameter group. You cannot delete a parameter group if it is
 * associated with any DAX clusters.
 */
export const deleteParameterGroup: API.OperationMethod<
  DeleteParameterGroupRequest,
  DeleteParameterGroupResponse,
  DeleteParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<DeleteParameterGroupRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteParameterGroupResponse>,
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
}));

export type DeleteSubnetGroupError =
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupInUseFault
  | SubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Deletes a subnet group.
 *
 * You cannot delete a subnet group if it is associated with any DAX
 * clusters.
 */
export const deleteSubnetGroup: API.OperationMethod<
  DeleteSubnetGroupRequest,
  DeleteSubnetGroupResponse,
  DeleteSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DeleteSubnetGroupRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<DeleteSubnetGroupResponse>,
  errors: [ServiceLinkedRoleNotFoundFault, SubnetGroupInUseFault, SubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubnetGroup",
}));

export type DescribeClustersError =
  | ClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns information about all provisioned DAX clusters if no cluster identifier is
 * specified, or about a specific DAX cluster if a cluster identifier is
 * supplied.
 *
 * If the cluster is in the CREATING state, only cluster level information will be
 * displayed until all of the nodes are successfully provisioned.
 *
 * If the cluster is in the DELETING state, only cluster level information will be
 * displayed.
 *
 * If nodes are currently being added to the DAX cluster, node endpoint information
 * and creation time for the additional nodes will not be displayed until they are
 * completely provisioned. When the DAX cluster state is
 * *available*, the cluster is ready for use.
 *
 * If nodes are currently being removed from the DAX cluster, no
 * endpoint information for the removed nodes is displayed.
 */
export const describeClusters: API.OperationMethod<
  DescribeClustersRequest,
  DescribeClustersResponse,
  DescribeClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<DescribeClustersRequest>,
  output: __S(138, __c17, 2) as any as S.Schema<DescribeClustersResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
}));

export type DescribeDefaultParametersError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns the default system parameter information for the DAX caching
 * software.
 */
export const describeDefaultParameters: API.OperationMethod<
  DescribeDefaultParametersRequest,
  DescribeDefaultParametersResponse,
  DescribeDefaultParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<DescribeDefaultParametersRequest>,
  output: __S(156, __c19, 4) as any as S.Schema<DescribeDefaultParametersResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDefaultParameters",
}));

export type DescribeEventsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns events related to DAX clusters and parameter groups. You can
 * obtain events specific to a particular DAX cluster or parameter group by
 * providing the name as a parameter.
 *
 * By default, only the events occurring within the last 24 hours are returned;
 * however, you can retrieve up to 14 days' worth of events if necessary.
 */
export const describeEvents: API.OperationMethod<
  DescribeEventsRequest,
  DescribeEventsResponse,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<DescribeEventsRequest>,
  output: __S(163, __c20, 3) as any as S.Schema<DescribeEventsResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
}));

export type DescribeParameterGroupsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns a list of parameter group descriptions. If a parameter group name is
 * specified, the list will contain only the descriptions for that group.
 */
export const describeParameterGroups: API.OperationMethod<
  DescribeParameterGroupsRequest,
  DescribeParameterGroupsResponse,
  DescribeParameterGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<DescribeParameterGroupsRequest>,
  output: __S(170, __c21, 2) as any as S.Schema<DescribeParameterGroupsResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeParameterGroups",
}));

export type DescribeParametersError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns the detailed parameter list for a particular parameter group.
 */
export const describeParameters: API.OperationMethod<
  DescribeParametersRequest,
  DescribeParametersResponse,
  DescribeParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<DescribeParametersRequest>,
  output: __S(156, __c19, 4) as any as S.Schema<DescribeParametersResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeParameters",
}));

export type DescribeSubnetGroupsError =
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a list of subnet group descriptions. If a subnet group name is specified,
 * the list will contain only the description of that group.
 */
export const describeSubnetGroups: API.OperationMethod<
  DescribeSubnetGroupsRequest,
  DescribeSubnetGroupsResponse,
  DescribeSubnetGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<DescribeSubnetGroupsRequest>,
  output: __S(186, __c23, 2) as any as S.Schema<DescribeSubnetGroupsResponse>,
  errors: [ServiceLinkedRoleNotFoundFault, SubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubnetGroups",
}));

export type IncreaseReplicationFactorError =
  | ClusterNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Adds one or more nodes to a DAX cluster.
 */
export const increaseReplicationFactor: API.OperationMethod<
  IncreaseReplicationFactorRequest,
  IncreaseReplicationFactorResponse,
  IncreaseReplicationFactorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<IncreaseReplicationFactorRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<IncreaseReplicationFactorResponse>,
  errors: [
    ClusterNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IncreaseReplicationFactor",
}));

export type ListTagsError =
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * List all of the tags for a DAX cluster. You can call
 * `ListTags` up to 10 times per second, per account.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<ListTagsRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<ListTagsResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

export type RebootNodeError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | NodeNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Reboots a single node of a DAX cluster. The reboot action takes
 * place as soon as possible. During the reboot, the node status is set to
 * REBOOTING.
 *
 * `RebootNode` restarts the DAX engine process and does not remove the
 * contents of the cache.
 */
export const rebootNode: API.OperationMethod<
  RebootNodeRequest,
  RebootNodeResponse,
  RebootNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<RebootNodeRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<RebootNodeResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    NodeNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootNode",
}));

export type TagResourceError =
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Associates a set of tags with a DAX resource.
 * You can call `TagResource` up to
 * 5 times per second, per account.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | TagNotFoundFault
  | CommonErrors;
/**
 * Removes the association of tags from a DAX resource. You can call
 * `UntagResource` up to 5 times per second, per account.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    TagNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateClusterError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Modifies the settings for a DAX cluster. You can use this action to
 * change one or more cluster configuration parameters by specifying the parameters and the
 * new values.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterRequest,
  UpdateClusterResponse,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<UpdateClusterRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<UpdateClusterResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
}));

export type UpdateParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Modifies the parameters of a parameter group. You can modify up to 20 parameters in
 * a single request by submitting a list parameter name and value pairs.
 */
export const updateParameterGroup: API.OperationMethod<
  UpdateParameterGroupRequest,
  UpdateParameterGroupResponse,
  UpdateParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(250, __c31, 2) as any as S.Schema<UpdateParameterGroupRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<UpdateParameterGroupResponse>,
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
}));

export type UpdateSubnetGroupError =
  | InvalidSubnet
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupNotFoundFault
  | SubnetInUse
  | SubnetNotAllowedFault
  | SubnetQuotaExceededFault
  | CommonErrors;
/**
 * Modifies an existing subnet group.
 */
export const updateSubnetGroup: API.OperationMethod<
  UpdateSubnetGroupRequest,
  UpdateSubnetGroupResponse,
  UpdateSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<UpdateSubnetGroupRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<UpdateSubnetGroupResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Enabled: S.Boolean })).annotate({
        identifier: "SSESpecification",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.String,
          NodeType: S.String,
          Description: S.optional(S.String),
          ReplicationFactor: S.Number,
          AvailabilityZones: S.optional(__S(16, __c2, 0)),
          SubnetGroupName: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(16, __c2, 0)),
          PreferredMaintenanceWindow: S.optional(S.String),
          NotificationTopicArn: S.optional(S.String),
          IamRoleArn: S.String,
          ParameterGroupName: S.optional(S.String),
          Tags: S.optional(__S(41, __c5, 1)),
          SSESpecification: S.optional(__S(0, __c0, 0)),
          ClusterEndpointEncryptionType: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Address: S.optional(S.String),
          Port: S.optional(S.Number),
          URL: S.optional(S.String),
        }),
      ).annotate({ identifier: "Endpoint" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NodeId: S.optional(S.String),
          Endpoint: S.optional(Endpoint),
          NodeCreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AvailabilityZone: S.optional(S.String),
          NodeStatus: S.optional(S.String),
          ParameterGroupStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Node" });
    case 1:
      return S.Array(__S(24, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ TopicArn: S.optional(S.String), TopicStatus: S.optional(S.String) }),
      ).annotate({ identifier: "NotificationConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ SecurityGroupIdentifier: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "SecurityGroupMembership" });
    case 4:
      return S.Array(__S(27, __c3, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.optional(S.String),
          ParameterApplyStatus: S.optional(S.String),
          NodeIdsToReboot: S.optional(__S(16, __c2, 0)),
        }),
      ).annotate({ identifier: "ParameterGroupStatus" });
    case 6:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "SSEDescription",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.optional(S.String),
          Description: S.optional(S.String),
          ClusterArn: S.optional(S.String),
          TotalNodes: S.optional(S.Number),
          ActiveNodes: S.optional(S.Number),
          NodeType: S.optional(S.String),
          Status: S.optional(S.String),
          ClusterDiscoveryEndpoint: S.optional(Endpoint),
          NodeIdsToRemove: S.optional(__S(16, __c2, 0)),
          Nodes: S.optional(__S(25, __c3, 1)),
          PreferredMaintenanceWindow: S.optional(S.String),
          NotificationConfiguration: S.optional(__S(26, __c3, 2)),
          SubnetGroup: S.optional(S.String),
          SecurityGroups: S.optional(__S(28, __c3, 4)),
          IamRoleArn: S.optional(S.String),
          ParameterGroup: S.optional(__S(29, __c3, 5)),
          SSEDescription: S.optional(__S(30, __c3, 6)),
          ClusterEndpointEncryptionType: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Cluster" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Cluster: S.optional(__S(31, __c3, 7)) }).pipe(ns)).annotate(
        { identifier: "CreateClusterResponse" },
      );
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(40, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterGroupName: S.String, Description: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateParameterGroupRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterGroupName: S.optional(S.String), Description: S.optional(S.String) }),
      ).annotate({ identifier: "ParameterGroup" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterGroup: S.optional(__S(56, __c7, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateParameterGroupResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetGroupName: S.String,
          Description: S.optional(S.String),
          SubnetIds: __S(16, __c2, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSubnetGroupRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          SubnetIdentifier: S.optional(S.String),
          SubnetAvailabilityZone: S.optional(S.String),
          SupportedNetworkTypes: S.optional(__S(80, __c10, 0)),
        }),
      ).annotate({ identifier: "Subnet" });
    case 2:
      return S.Array(__S(81, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SubnetGroupName: S.optional(S.String),
          Description: S.optional(S.String),
          VpcId: S.optional(S.String),
          Subnets: S.optional(__S(82, __c10, 2)),
          SupportedNetworkTypes: S.optional(__S(80, __c10, 0)),
        }),
      ).annotate({ identifier: "SubnetGroup" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubnetGroup: S.optional(__S(83, __c10, 3)) }).pipe(ns),
      ).annotate({ identifier: "CreateSubnetGroupResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.String,
          NewReplicationFactor: S.Number,
          AvailabilityZones: S.optional(__S(16, __c2, 0)),
          NodeIdsToRemove: S.optional(__S(16, __c2, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DecreaseReplicationFactorRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteClusterRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterGroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteParameterGroupRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DeletionMessage: S.optional(S.String) }).pipe(ns)).annotate(
        { identifier: "DeleteParameterGroupResponse" },
      );
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubnetGroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSubnetGroupRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterNames: S.optional(__S(16, __c2, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClustersRequest" });
    case 1:
      return S.Array(__S(31, __c3, 7));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Clusters: S.optional(__S(137, __c17, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeClustersResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDefaultParametersRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NodeType: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "NodeTypeSpecificValue" });
    case 1:
      return S.Array(__S(152, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ParameterName: S.optional(S.String),
          ParameterType: S.optional(S.String),
          ParameterValue: S.optional(S.String),
          NodeTypeSpecificValues: S.optional(__S(153, __c19, 1)),
          Description: S.optional(S.String),
          Source: S.optional(S.String),
          DataType: S.optional(S.String),
          AllowedValues: S.optional(S.String),
          IsModifiable: S.optional(S.String),
          ChangeType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Parameter" });
    case 3:
      return S.Array(__S(154, __c19, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Parameters: S.optional(__S(155, __c19, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDefaultParametersResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceName: S.optional(S.String),
          SourceType: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Duration: S.optional(S.Number),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceName: S.optional(S.String),
          SourceType: S.optional(S.String),
          Message: S.optional(S.String),
          Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Event" });
    case 2:
      return S.Array(__S(161, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Events: S.optional(__S(162, __c20, 2)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeEventsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupNames: S.optional(__S(16, __c2, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeParameterGroupsRequest" });
    case 1:
      return S.Array(__S(56, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ParameterGroups: S.optional(__S(169, __c21, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeParameterGroupsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.String,
          Source: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeParametersRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetGroupNames: S.optional(__S(16, __c2, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSubnetGroupsRequest" });
    case 1:
      return S.Array(__S(83, __c10, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          SubnetGroups: S.optional(__S(185, __c23, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSubnetGroupsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.String,
          NewReplicationFactor: S.Number,
          AvailabilityZones: S.optional(__S(16, __c2, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "IncreaseReplicationFactorRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceName: S.String, NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(41, __c5, 1)), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListTagsResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterName: S.String, NodeId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RebootNodeRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceName: S.String, Tags: __S(41, __c5, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(41, __c5, 1)) }).pipe(ns)).annotate({
        identifier: "TagResourceResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceName: S.String, TagKeys: __S(16, __c2, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.String,
          Description: S.optional(S.String),
          PreferredMaintenanceWindow: S.optional(S.String),
          NotificationTopicArn: S.optional(S.String),
          NotificationTopicStatus: S.optional(S.String),
          ParameterGroupName: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(16, __c2, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateClusterRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterName: S.optional(S.String), ParameterValue: S.optional(S.String) }),
      ).annotate({ identifier: "ParameterNameValue" });
    case 1:
      return S.Array(__S(248, __c31, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ParameterGroupName: S.String, ParameterNameValues: __S(249, __c31, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateParameterGroupRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetGroupName: S.String,
          Description: S.optional(S.String),
          SubnetIds: S.optional(__S(16, __c2, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSubnetGroupRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
