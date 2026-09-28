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
  sdkId: "DAX",
  target: "AmazonDAXV3",
  version: "2017-04-19",
  sigv4: "dax",
  protocol: awsJson1_1Protocol,
  xmlns: "http://dax.amazonaws.com/doc/2017-04-19/",
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
                `https://dax-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://dax-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://dax.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://dax.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

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
export class InsufficientClusterCapacityFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientClusterCapacityFault",
    ["BadRequestError"],
    { code: "InsufficientClusterCapacity", status: 400 },
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
export class InvalidSubnet
  extends /*@__PURE__*/ TE.TaggedError("InvalidSubnet", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidVPCNetworkStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidVPCNetworkStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NodeNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "NodeNotFoundFault",
    ["BadRequestError"],
    { code: "NodeNotFound", status: 404 },
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
export class ServiceLinkedRoleNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceLinkedRoleNotFoundFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { code: "ServiceQuotaExceeded", status: 402 },
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
export type SSEStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | (string & {});
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
export type SourceType =
  | "CLUSTER"
  | "PARAMETER_GROUP"
  | "SUBNET_GROUP"
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
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      NodeType: 0,
      Description: 0,
      ReplicationFactor: 0,
      AvailabilityZones: 0,
      SubnetGroupName: 0,
      SecurityGroupIds: 0,
      PreferredMaintenanceWindow: 0,
      NotificationTopicArn: 0,
      IamRoleArn: 0,
      ParameterGroupName: 0,
      Tags: D.list(i_Tag),
      SSESpecification: { Enabled: 0 },
      ClusterEndpointEncryptionType: 0,
      NetworkType: 0,
    },
    output: { Cluster: o_Cluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ParameterGroupName: 0, Description: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { SubnetGroupName: 0, Description: 0, SubnetIds: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      NewReplicationFactor: 0,
      AvailabilityZones: 0,
      NodeIdsToRemove: 0,
    },
    output: { Cluster: o_Cluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ClusterName: 0 },
    output: { Cluster: o_Cluster },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ClusterNames: 0, MaxResults: 0, NextToken: 0 },
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
})) as any;

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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDefaultParameters",
})) as any;

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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ParameterGroupNames: 0, MaxResults: 0, NextToken: 0 },
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
export const describeParameters: API.OperationMethod<
  DescribeParametersRequest,
  DescribeParametersResponse,
  DescribeParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ParameterGroupName: 0, Source: 0, MaxResults: 0, NextToken: 0 },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { SubnetGroupNames: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [ServiceLinkedRoleNotFoundFault, SubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubnetGroups",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ClusterName: 0, NewReplicationFactor: 0, AvailabilityZones: 0 },
    output: { Cluster: o_Cluster },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceName: 0, NextToken: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ClusterName: 0, NodeId: 0 },
    output: { Cluster: o_Cluster },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceName: 0, Tags: D.list(i_Tag) } },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceName: 0, TagKeys: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ClusterName: 0,
      Description: 0,
      PreferredMaintenanceWindow: 0,
      NotificationTopicArn: 0,
      NotificationTopicStatus: 0,
      ParameterGroupName: 0,
      SecurityGroupIds: 0,
    },
    output: { Cluster: o_Cluster },
  },
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
})) as any;

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
 * Modifies an existing subnet group.
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

const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Cluster: D.LazyStruct = () => ({
  Nodes: D.list({ NodeCreateTime: D.ts }),
});
