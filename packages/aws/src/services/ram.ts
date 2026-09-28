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
  sdkId: "RAM",
  target: "AmazonResourceSharing",
  version: "2018-01-04",
  sigv4: "ram",
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
                `https://ram-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://ram.${Region}.amazonaws.com`);
              }
              return e(
                `https://ram-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ram.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ram.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ TE.TaggedError(
    "IdempotentParameterMismatchException",
    ["BadRequestError"],
    { code: "IdempotentParameterMismatch", status: 400 },
  )<{ readonly message: string }> {}
export class InvalidClientTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClientTokenException",
    ["BadRequestError"],
    { code: "InvalidClientToken", status: 400 },
  )<{ readonly message: string }> {}
export class InvalidMaxResultsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidMaxResultsException",
    ["BadRequestError"],
    { code: "InvalidMaxResults", status: 400 },
  )<{ readonly message: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { code: "InvalidNextToken", status: 400 },
  )<{ readonly message: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { code: "InvalidParameter", status: 400 },
  )<{ readonly message: string }> {}
export class InvalidPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPolicyException",
    ["BadRequestError"],
    { code: "InvalidPolicy", status: 400 },
  )<{ readonly message: string }> {}
export class InvalidResourceTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidResourceTypeException",
    ["BadRequestError"],
    { code: "InvalidResourceType.Unknown", status: 400 },
  )<{ readonly message: string }> {}
export class InvalidStateTransitionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidStateTransitionException",
    ["BadRequestError"],
    { code: "InvalidStateTransitionException.Unknown", status: 400 },
  )<{ readonly message: string }> {}
export class MalformedArnException
  extends /*@__PURE__*/ TE.TaggedError(
    "MalformedArnException",
    ["BadRequestError"],
    { code: "InvalidArn.Malformed", status: 400 },
  )<{ readonly message: string }> {}
export class MalformedPolicyTemplateException
  extends /*@__PURE__*/ TE.TaggedError(
    "MalformedPolicyTemplateException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class MissingRequiredParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "MissingRequiredParameterException",
    ["BadRequestError"],
    { code: "MissingRequiredParameter", status: 400 },
  )<{ readonly message: string }> {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationNotPermittedException",
    ["BadRequestError"],
    { code: "OperationNotPermitted", status: 400 },
  )<{ readonly message: string }> {}
export class PermissionAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "PermissionAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message: string }> {}
export class PermissionLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "PermissionLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class PermissionVersionsLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "PermissionVersionsLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ResourceArnNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceArnNotFoundException",
    ["BadRequestError"],
    { code: "InvalidResourceArn.NotFound", status: 400 },
  )<{ readonly message: string }> {}
export class ResourceShareInvitationAlreadyAcceptedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceShareInvitationAlreadyAcceptedException",
    ["BadRequestError"],
    { code: "InvalidResourceShareInvitationArn.AlreadyAccepted", status: 400 },
  )<{ readonly message: string }> {}
export class ResourceShareInvitationAlreadyRejectedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceShareInvitationAlreadyRejectedException",
    ["BadRequestError"],
    { code: "InvalidResourceShareInvitationArn.AlreadyRejected", status: 400 },
  )<{ readonly message: string }> {}
export class ResourceShareInvitationArnNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceShareInvitationArnNotFoundException",
    ["BadRequestError"],
    { code: "InvalidResourceShareInvitationArn.NotFound", status: 400 },
  )<{ readonly message: string }> {}
export class ResourceShareInvitationExpiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceShareInvitationExpiredException",
    ["BadRequestError"],
    { code: "InvalidResourceShareInvitationArn.Expired", status: 400 },
  )<{ readonly message: string }> {}
export class ResourceShareLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceShareLimitExceededException",
    ["BadRequestError"],
    { code: "ResourceShareLimitExceeded", status: 400 },
  )<{ readonly message: string }> {}
export class ServerInternalException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServerInternalException",
    ["ServerError"],
    { code: "InternalError", status: 500 },
  )<{ readonly message: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { code: "Unavailable", status: 503 },
  )<{ readonly message: string }> {}
export class TagLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "TagLimitExceededException",
    ["BadRequestError"],
    { code: "TagLimitExceeded", status: 400 },
  )<{ readonly message: string }> {}
export class TagPolicyViolationException
  extends /*@__PURE__*/ TE.TaggedError(
    "TagPolicyViolationException",
    ["BadRequestError"],
    { code: "TagPolicyViolation", status: 400 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class UnknownResourceException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnknownResourceException",
    ["BadRequestError"],
    { code: "InvalidResourceShareArn.NotFound", status: 400 },
  )<{ readonly message: string }> {}
export class UnmatchedPolicyPermissionException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnmatchedPolicyPermissionException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export interface AcceptResourceShareInvitationRequest {
  resourceShareInvitationArn: string;
  clientToken?: string;
}
export type ResourceShareInvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"
  | (string & {});
export type ResourceShareAssociationType =
  | "PRINCIPAL"
  | "RESOURCE"
  | "SOURCE"
  | (string & {});
export type ResourceShareAssociationStatus =
  | "ASSOCIATING"
  | "ASSOCIATED"
  | "FAILED"
  | "DISASSOCIATING"
  | "DISASSOCIATED"
  | "SUSPENDED"
  | "SUSPENDING"
  | "RESTORING"
  | (string & {});
export interface ResourceShareAssociation {
  resourceShareArn?: string;
  resourceShareName?: string;
  associatedEntity?: string;
  associationType?: ResourceShareAssociationType;
  status?: ResourceShareAssociationStatus;
  statusMessage?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  external?: boolean;
}
export type ResourceShareAssociationList = ResourceShareAssociation[];
export interface ResourceShareInvitation {
  resourceShareInvitationArn?: string;
  resourceShareName?: string;
  resourceShareArn?: string;
  senderAccountId?: string;
  receiverAccountId?: string;
  invitationTimestamp?: Date;
  status?: ResourceShareInvitationStatus;
  resourceShareAssociations?: ResourceShareAssociation[];
  receiverArn?: string;
}
export interface AcceptResourceShareInvitationResponse {
  resourceShareInvitation?: ResourceShareInvitation;
  clientToken?: string;
}
export type ResourceArnList = string[];
export type PrincipalArnOrIdList = string[];
export type SourceArnOrAccountList = string[];
export interface AssociateResourceShareRequest {
  resourceShareArn: string;
  resourceArns?: string[];
  principals?: string[];
  clientToken?: string;
  sources?: string[];
}
export interface AssociateResourceShareResponse {
  resourceShareAssociations?: ResourceShareAssociation[];
  clientToken?: string;
}
export interface AssociateResourceSharePermissionRequest {
  resourceShareArn: string;
  permissionArn: string;
  replace?: boolean;
  clientToken?: string;
  permissionVersion?: number;
}
export interface AssociateResourceSharePermissionResponse {
  returnValue?: boolean;
  clientToken?: string;
}
export type PermissionName = string;
export type Policy = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key?: string;
  value?: string;
}
export type TagList = Tag[];
export interface CreatePermissionRequest {
  name: string;
  resourceType: string;
  policyTemplate: string;
  clientToken?: string;
  tags?: Tag[];
}
export type PermissionType = "CUSTOMER_MANAGED" | "AWS_MANAGED" | (string & {});
export type PermissionFeatureSet =
  | "CREATED_FROM_POLICY"
  | "PROMOTING_TO_STANDARD"
  | "STANDARD"
  | (string & {});
export interface ResourceSharePermissionSummary {
  arn?: string;
  version?: string;
  defaultVersion?: boolean;
  name?: string;
  resourceType?: string;
  status?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  isResourceTypeDefault?: boolean;
  permissionType?: PermissionType;
  featureSet?: PermissionFeatureSet;
  tags?: Tag[];
}
export interface CreatePermissionResponse {
  permission?: ResourceSharePermissionSummary;
  clientToken?: string;
}
export interface CreatePermissionVersionRequest {
  permissionArn: string;
  policyTemplate: string;
  clientToken?: string;
}
export type PermissionStatus =
  | "ATTACHABLE"
  | "UNATTACHABLE"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface ResourceSharePermissionDetail {
  arn?: string;
  version?: string;
  defaultVersion?: boolean;
  name?: string;
  resourceType?: string;
  permission?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  isResourceTypeDefault?: boolean;
  permissionType?: PermissionType;
  featureSet?: PermissionFeatureSet;
  status?: PermissionStatus;
  tags?: Tag[];
}
export interface CreatePermissionVersionResponse {
  permission?: ResourceSharePermissionDetail;
  clientToken?: string;
}
export type PermissionArnList = string[];
export interface ResourceShareConfiguration {
  retainSharingOnAccountLeaveOrganization?: boolean;
}
export interface CreateResourceShareRequest {
  name: string;
  resourceArns?: string[];
  principals?: string[];
  tags?: Tag[];
  allowExternalPrincipals?: boolean;
  clientToken?: string;
  permissionArns?: string[];
  sources?: string[];
  resourceShareConfiguration?: ResourceShareConfiguration;
}
export type ResourceShareStatus =
  | "PENDING"
  | "ACTIVE"
  | "FAILED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export type ResourceShareFeatureSet =
  | "CREATED_FROM_POLICY"
  | "PROMOTING_TO_STANDARD"
  | "STANDARD"
  | (string & {});
export interface ResourceShare {
  resourceShareArn?: string;
  name?: string;
  owningAccountId?: string;
  allowExternalPrincipals?: boolean;
  status?: ResourceShareStatus;
  statusMessage?: string;
  tags?: Tag[];
  creationTime?: Date;
  lastUpdatedTime?: Date;
  featureSet?: ResourceShareFeatureSet;
  resourceShareConfiguration?: ResourceShareConfiguration;
}
export interface CreateResourceShareResponse {
  resourceShare?: ResourceShare;
  clientToken?: string;
}
export interface DeletePermissionRequest {
  permissionArn: string;
  clientToken?: string;
}
export interface DeletePermissionResponse {
  returnValue?: boolean;
  clientToken?: string;
  permissionStatus?: PermissionStatus;
}
export interface DeletePermissionVersionRequest {
  permissionArn: string;
  permissionVersion: number;
  clientToken?: string;
}
export interface DeletePermissionVersionResponse {
  returnValue?: boolean;
  clientToken?: string;
  permissionStatus?: PermissionStatus;
}
export interface DeleteResourceShareRequest {
  resourceShareArn: string;
  clientToken?: string;
}
export interface DeleteResourceShareResponse {
  returnValue?: boolean;
  clientToken?: string;
}
export interface DisassociateResourceShareRequest {
  resourceShareArn: string;
  resourceArns?: string[];
  principals?: string[];
  clientToken?: string;
  sources?: string[];
}
export interface DisassociateResourceShareResponse {
  resourceShareAssociations?: ResourceShareAssociation[];
  clientToken?: string;
}
export interface DisassociateResourceSharePermissionRequest {
  resourceShareArn: string;
  permissionArn: string;
  clientToken?: string;
}
export interface DisassociateResourceSharePermissionResponse {
  returnValue?: boolean;
  clientToken?: string;
}
export interface EnableSharingWithAwsOrganizationRequest {}
export interface EnableSharingWithAwsOrganizationResponse {
  returnValue?: boolean;
}
export interface GetPermissionRequest {
  permissionArn: string;
  permissionVersion?: number;
}
export interface GetPermissionResponse {
  permission?: ResourceSharePermissionDetail;
}
export type MaxResults = number;
export interface GetResourcePoliciesRequest {
  resourceArns: string[];
  principal?: string;
  nextToken?: string;
  maxResults?: number;
}
export type PolicyList = string[];
export interface GetResourcePoliciesResponse {
  policies?: string[];
  nextToken?: string;
}
export type ResourceShareArnList = string[];
export interface GetResourceShareAssociationsRequest {
  associationType: ResourceShareAssociationType;
  resourceShareArns?: string[];
  resourceArn?: string;
  principal?: string;
  associationStatus?: ResourceShareAssociationStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface GetResourceShareAssociationsResponse {
  resourceShareAssociations?: ResourceShareAssociation[];
  nextToken?: string;
}
export type ResourceShareInvitationArnList = string[];
export interface GetResourceShareInvitationsRequest {
  resourceShareInvitationArns?: string[];
  resourceShareArns?: string[];
  nextToken?: string;
  maxResults?: number;
}
export type ResourceShareInvitationList = ResourceShareInvitation[];
export interface GetResourceShareInvitationsResponse {
  resourceShareInvitations?: ResourceShareInvitation[];
  nextToken?: string;
}
export type ResourceOwner = "SELF" | "OTHER-ACCOUNTS" | (string & {});
export type TagValueList = string[];
export interface TagFilter {
  tagKey?: string;
  tagValues?: string[];
}
export type TagFilters = TagFilter[];
export interface GetResourceSharesRequest {
  resourceShareArns?: string[];
  resourceShareStatus?: ResourceShareStatus;
  resourceOwner: ResourceOwner;
  name?: string;
  tagFilters?: TagFilter[];
  nextToken?: string;
  maxResults?: number;
  permissionArn?: string;
  permissionVersion?: number;
}
export type ResourceShareList = ResourceShare[];
export interface GetResourceSharesResponse {
  resourceShares?: ResourceShare[];
  nextToken?: string;
}
export type ResourceRegionScopeFilter =
  | "ALL"
  | "REGIONAL"
  | "GLOBAL"
  | (string & {});
export interface ListPendingInvitationResourcesRequest {
  resourceShareInvitationArn: string;
  nextToken?: string;
  maxResults?: number;
  resourceRegionScope?: ResourceRegionScopeFilter;
}
export type ResourceStatus =
  | "AVAILABLE"
  | "ZONAL_RESOURCE_INACCESSIBLE"
  | "LIMIT_EXCEEDED"
  | "UNAVAILABLE"
  | "PENDING"
  | (string & {});
export type ResourceRegionScope = "REGIONAL" | "GLOBAL" | (string & {});
export interface Resource {
  arn?: string;
  type?: string;
  resourceShareArn?: string;
  resourceGroupArn?: string;
  status?: ResourceStatus;
  statusMessage?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  resourceRegionScope?: ResourceRegionScope;
}
export type ResourceList = Resource[];
export interface ListPendingInvitationResourcesResponse {
  resources?: Resource[];
  nextToken?: string;
}
export interface ListPermissionAssociationsRequest {
  permissionArn?: string;
  permissionVersion?: number;
  associationStatus?: ResourceShareAssociationStatus;
  resourceType?: string;
  featureSet?: PermissionFeatureSet;
  defaultVersion?: boolean;
  nextToken?: string;
  maxResults?: number;
}
export interface AssociatedPermission {
  arn?: string;
  permissionVersion?: string;
  defaultVersion?: boolean;
  resourceType?: string;
  status?: string;
  featureSet?: PermissionFeatureSet;
  lastUpdatedTime?: Date;
  resourceShareArn?: string;
}
export type AssociatedPermissionList = AssociatedPermission[];
export interface ListPermissionAssociationsResponse {
  permissions?: AssociatedPermission[];
  nextToken?: string;
}
export type PermissionTypeFilter =
  | "ALL"
  | "AWS_MANAGED"
  | "CUSTOMER_MANAGED"
  | (string & {});
export interface ListPermissionsRequest {
  resourceType?: string;
  nextToken?: string;
  maxResults?: number;
  permissionType?: PermissionTypeFilter;
}
export type ResourceSharePermissionList = ResourceSharePermissionSummary[];
export interface ListPermissionsResponse {
  permissions?: ResourceSharePermissionSummary[];
  nextToken?: string;
}
export interface ListPermissionVersionsRequest {
  permissionArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListPermissionVersionsResponse {
  permissions?: ResourceSharePermissionSummary[];
  nextToken?: string;
}
export interface ListPrincipalsRequest {
  resourceOwner: ResourceOwner;
  resourceArn?: string;
  principals?: string[];
  resourceType?: string;
  resourceShareArns?: string[];
  nextToken?: string;
  maxResults?: number;
}
export interface Principal {
  id?: string;
  resourceShareArn?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  external?: boolean;
}
export type PrincipalList = Principal[];
export interface ListPrincipalsResponse {
  principals?: Principal[];
  nextToken?: string;
}
export type ReplacePermissionAssociationsWorkIdList = string[];
export type ReplacePermissionAssociationsWorkStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export interface ListReplacePermissionAssociationsWorkRequest {
  workIds?: string[];
  status?: ReplacePermissionAssociationsWorkStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface ReplacePermissionAssociationsWork {
  id?: string;
  fromPermissionArn?: string;
  fromPermissionVersion?: string;
  toPermissionArn?: string;
  toPermissionVersion?: string;
  status?: ReplacePermissionAssociationsWorkStatus;
  statusMessage?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
}
export type ReplacePermissionAssociationsWorkList =
  ReplacePermissionAssociationsWork[];
export interface ListReplacePermissionAssociationsWorkResponse {
  replacePermissionAssociationsWorks?: ReplacePermissionAssociationsWork[];
  nextToken?: string;
}
export interface ListResourcesRequest {
  resourceOwner: ResourceOwner;
  principal?: string;
  resourceType?: string;
  resourceArns?: string[];
  resourceShareArns?: string[];
  nextToken?: string;
  maxResults?: number;
  resourceRegionScope?: ResourceRegionScopeFilter;
}
export interface ListResourcesResponse {
  resources?: Resource[];
  nextToken?: string;
}
export interface ListResourceSharePermissionsRequest {
  resourceShareArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListResourceSharePermissionsResponse {
  permissions?: ResourceSharePermissionSummary[];
  nextToken?: string;
}
export interface ListResourceTypesRequest {
  nextToken?: string;
  maxResults?: number;
  resourceRegionScope?: ResourceRegionScopeFilter;
}
export interface ServiceNameAndResourceType {
  resourceType?: string;
  serviceName?: string;
  resourceRegionScope?: ResourceRegionScope;
}
export type ServiceNameAndResourceTypeList = ServiceNameAndResourceType[];
export interface ListResourceTypesResponse {
  resourceTypes?: ServiceNameAndResourceType[];
  nextToken?: string;
}
export interface ListSourceAssociationsRequest {
  resourceShareArns?: string[];
  sourceId?: string;
  sourceType?: string;
  associationStatus?: ResourceShareAssociationStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface AssociatedSource {
  resourceShareArn?: string;
  sourceId?: string;
  sourceType?: string;
  status?: string;
  lastUpdatedTime?: Date;
  creationTime?: Date;
  statusMessage?: string;
}
export type AssociatedSourceList = AssociatedSource[];
export interface ListSourceAssociationsResponse {
  sourceAssociations?: AssociatedSource[];
  nextToken?: string;
}
export interface PromotePermissionCreatedFromPolicyRequest {
  permissionArn: string;
  name: string;
  clientToken?: string;
}
export interface PromotePermissionCreatedFromPolicyResponse {
  permission?: ResourceSharePermissionSummary;
  clientToken?: string;
}
export interface PromoteResourceShareCreatedFromPolicyRequest {
  resourceShareArn: string;
}
export interface PromoteResourceShareCreatedFromPolicyResponse {
  returnValue?: boolean;
}
export interface RejectResourceShareInvitationRequest {
  resourceShareInvitationArn: string;
  clientToken?: string;
}
export interface RejectResourceShareInvitationResponse {
  resourceShareInvitation?: ResourceShareInvitation;
  clientToken?: string;
}
export interface ReplacePermissionAssociationsRequest {
  fromPermissionArn: string;
  fromPermissionVersion?: number;
  toPermissionArn: string;
  clientToken?: string;
}
export interface ReplacePermissionAssociationsResponse {
  replacePermissionAssociationsWork?: ReplacePermissionAssociationsWork;
  clientToken?: string;
}
export interface SetDefaultPermissionVersionRequest {
  permissionArn: string;
  permissionVersion: number;
  clientToken?: string;
}
export interface SetDefaultPermissionVersionResponse {
  returnValue?: boolean;
  clientToken?: string;
}
export interface TagResourceRequest {
  resourceShareArn?: string;
  tags: Tag[];
  resourceArn?: string;
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceShareArn?: string;
  tagKeys: string[];
  resourceArn?: string;
}
export interface UntagResourceResponse {}
export interface UpdateResourceShareRequest {
  resourceShareArn: string;
  name?: string;
  allowExternalPrincipals?: boolean;
  clientToken?: string;
}
export interface UpdateResourceShareResponse {
  resourceShare?: ResourceShare;
  clientToken?: string;
}
export type AcceptResourceShareInvitationError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | MalformedArnException
  | OperationNotPermittedException
  | ResourceShareInvitationAlreadyAcceptedException
  | ResourceShareInvitationAlreadyRejectedException
  | ResourceShareInvitationArnNotFoundException
  | ResourceShareInvitationExpiredException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Accepts an invitation to a resource share from another Amazon Web Services account. After you accept the
 * invitation, the resources included in the resource share are available to interact with in the
 * relevant Amazon Web Services Management Consoles and tools.
 */
export const acceptResourceShareInvitation: API.OperationMethod<
  AcceptResourceShareInvitationRequest,
  AcceptResourceShareInvitationResponse,
  AcceptResourceShareInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /acceptresourceshareinvitation",
    input: { resourceShareInvitationArn: 0, clientToken: 0 },
    output: { resourceShareInvitation: o_ResourceShareInvitation },
    body: true,
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    MalformedArnException,
    OperationNotPermittedException,
    ResourceShareInvitationAlreadyAcceptedException,
    ResourceShareInvitationAlreadyRejectedException,
    ResourceShareInvitationArnNotFoundException,
    ResourceShareInvitationExpiredException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptResourceShareInvitation",
})) as any;

export type AssociateResourceShareError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | OperationNotPermittedException
  | ResourceShareLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | ThrottlingException
  | UnknownResourceException
  | CommonErrors;
/**
 * Adds the specified list of principals, resources, and source constraints to a resource share. Principals that
 * already have access to this resource share immediately receive access to the added resources.
 * Newly added principals immediately receive access to the resources shared in this resource share.
 */
export const associateResourceShare: API.OperationMethod<
  AssociateResourceShareRequest,
  AssociateResourceShareResponse,
  AssociateResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /associateresourceshare",
    input: {
      resourceShareArn: 0,
      resourceArns: 0,
      principals: 0,
      clientToken: 0,
      sources: 0,
    },
    output: { resourceShareAssociations: D.list(o_ResourceShareAssociation) },
    body: true,
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    OperationNotPermittedException,
    ResourceShareLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
    ThrottlingException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResourceShare",
})) as any;

export type AssociateResourceSharePermissionError =
  | InvalidClientTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Adds or replaces the RAM permission for a resource type included in a resource share. You can
 * have exactly one permission associated with each resource type in the resource share. You can add
 * a new RAM permission only if there are currently no resources of that resource type
 * currently in the resource share.
 */
export const associateResourceSharePermission: API.OperationMethod<
  AssociateResourceSharePermissionRequest,
  AssociateResourceSharePermissionResponse,
  AssociateResourceSharePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /associateresourcesharepermission",
    input: {
      resourceShareArn: 0,
      permissionArn: 0,
      replace: 0,
      clientToken: 0,
      permissionVersion: 0,
    },
    body: true,
  },
  errors: [
    InvalidClientTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResourceSharePermission",
})) as any;

export type CreatePermissionError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidPolicyException
  | MalformedPolicyTemplateException
  | OperationNotPermittedException
  | PermissionAlreadyExistsException
  | PermissionLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a customer managed permission for a specified resource type that you can attach to resource shares.
 * It is created in the Amazon Web Services Region in which you call the operation.
 */
export const createPermission: API.OperationMethod<
  CreatePermissionRequest,
  CreatePermissionResponse,
  CreatePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /createpermission",
    input: {
      name: 0,
      resourceType: 0,
      policyTemplate: 0,
      clientToken: 0,
      tags: D.list(i_Tag),
    },
    output: { permission: o_ResourceSharePermissionSummary },
    body: true,
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidPolicyException,
    MalformedPolicyTemplateException,
    OperationNotPermittedException,
    PermissionAlreadyExistsException,
    PermissionLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePermission",
})) as any;

export type CreatePermissionVersionError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidPolicyException
  | MalformedArnException
  | MalformedPolicyTemplateException
  | PermissionVersionsLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Creates a new version of the specified customer managed permission. The new version is automatically set as
 * the default version of the customer managed permission. New resource shares automatically use the default
 * permission. Existing resource shares continue to use their original permission versions,
 * but you can use ReplacePermissionAssociations to update them.
 *
 * If the specified customer managed permission already has the maximum of 5 versions, then
 * you must delete one of the existing versions before you can create a new one.
 */
export const createPermissionVersion: API.OperationMethod<
  CreatePermissionVersionRequest,
  CreatePermissionVersionResponse,
  CreatePermissionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /createpermissionversion",
    input: { permissionArn: 0, policyTemplate: 0, clientToken: 0 },
    output: { permission: o_ResourceSharePermissionDetail },
    body: true,
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidPolicyException,
    MalformedArnException,
    MalformedPolicyTemplateException,
    PermissionVersionsLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePermissionVersion",
})) as any;

export type CreateResourceShareError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | OperationNotPermittedException
  | ResourceShareLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | TagLimitExceededException
  | TagPolicyViolationException
  | ThrottlingException
  | UnknownResourceException
  | CommonErrors;
/**
 * Creates a resource share. You can provide a list of the Amazon Resource Names (ARNs) for the resources that you
 * want to share, a list of principals you want to share the resources with, the
 * permissions to grant those principals, and optionally source constraints to enhance security for service principal sharing.
 *
 * Sharing a resource makes it available for use by principals outside of the
 * Amazon Web Services account that created the resource. Sharing doesn't change any permissions or
 * quotas that apply to the resource in the account that created it.
 */
export const createResourceShare: API.OperationMethod<
  CreateResourceShareRequest,
  CreateResourceShareResponse,
  CreateResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /createresourceshare",
    input: {
      name: 0,
      resourceArns: 0,
      principals: 0,
      tags: D.list(i_Tag),
      allowExternalPrincipals: 0,
      clientToken: 0,
      permissionArns: 0,
      sources: 0,
      resourceShareConfiguration: {
        retainSharingOnAccountLeaveOrganization: 0,
      },
    },
    output: { resourceShare: o_ResourceShare },
    body: true,
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    OperationNotPermittedException,
    ResourceShareLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
    TagLimitExceededException,
    TagPolicyViolationException,
    ThrottlingException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceShare",
})) as any;

export type DeletePermissionError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Deletes the specified customer managed permission in the Amazon Web Services Region in which you call this operation. You
 * can delete a customer managed permission only if it isn't attached to any resource share. The operation deletes all
 * versions associated with the customer managed permission.
 */
export const deletePermission: API.OperationMethod<
  DeletePermissionRequest,
  DeletePermissionResponse,
  DeletePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /deletepermission",
    input: {
      permissionArn: D.m({ query: "permissionArn" }),
      clientToken: D.m({ query: "clientToken" }),
    },
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermission",
})) as any;

export type DeletePermissionVersionError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Deletes one version of a customer managed permission. The version you specify must not be attached to any
 * resource share and must not be the default version for the permission.
 *
 * If a customer managed permission has the maximum of 5 versions, then you must delete at
 * least one version before you can create another.
 */
export const deletePermissionVersion: API.OperationMethod<
  DeletePermissionVersionRequest,
  DeletePermissionVersionResponse,
  DeletePermissionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /deletepermissionversion",
    input: {
      permissionArn: D.m({ query: "permissionArn" }),
      permissionVersion: D.m({ query: "permissionVersion" }),
      clientToken: D.m({ query: "clientToken" }),
    },
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermissionVersion",
})) as any;

export type DeleteResourceShareError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | ThrottlingException
  | UnknownResourceException
  | CommonErrors;
/**
 * Deletes the specified resource share.
 *
 * This doesn't delete any of the resources that were associated with the resource share; it
 * only stops the sharing of those resources through this resource share.
 */
export const deleteResourceShare: API.OperationMethod<
  DeleteResourceShareRequest,
  DeleteResourceShareResponse,
  DeleteResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /deleteresourceshare",
    input: {
      resourceShareArn: D.m({ query: "resourceShareArn" }),
      clientToken: D.m({ query: "clientToken" }),
    },
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    ThrottlingException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceShare",
})) as any;

export type DisassociateResourceShareError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | OperationNotPermittedException
  | ResourceShareLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | ThrottlingException
  | UnknownResourceException
  | CommonErrors;
/**
 * Removes the specified principals, resources, or source constraints from participating in the specified
 * resource share.
 */
export const disassociateResourceShare: API.OperationMethod<
  DisassociateResourceShareRequest,
  DisassociateResourceShareResponse,
  DisassociateResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /disassociateresourceshare",
    input: {
      resourceShareArn: 0,
      resourceArns: 0,
      principals: 0,
      clientToken: 0,
      sources: 0,
    },
    output: { resourceShareAssociations: D.list(o_ResourceShareAssociation) },
    body: true,
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    OperationNotPermittedException,
    ResourceShareLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
    ThrottlingException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResourceShare",
})) as any;

export type DisassociateResourceSharePermissionError =
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Removes a managed permission from a resource share. Permission changes take effect immediately. You can
 * remove a managed permission from a resource share only if there are currently no resources of the relevant
 * resource type currently attached to the resource share.
 */
export const disassociateResourceSharePermission: API.OperationMethod<
  DisassociateResourceSharePermissionRequest,
  DisassociateResourceSharePermissionResponse,
  DisassociateResourceSharePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /disassociateresourcesharepermission",
    input: { resourceShareArn: 0, permissionArn: 0, clientToken: 0 },
    body: true,
  },
  errors: [
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResourceSharePermission",
})) as any;

export type EnableSharingWithAwsOrganizationError =
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Enables resource sharing within your organization in Organizations. This operation creates
 * a service-linked role called `AWSServiceRoleForResourceAccessManager` that has the IAM managed policy
 * named AWSResourceAccessManagerServiceRolePolicy attached. This role permits RAM to retrieve information about
 * the organization and its structure. This lets you share resources with all of the
 * accounts in the calling account's organization by specifying the organization ID, or all
 * of the accounts in an organizational unit (OU) by specifying the OU ID. Until you enable
 * sharing within the organization, you can specify only individual Amazon Web Services accounts, or for
 * supported resource types, IAM roles and users.
 *
 * You must call this operation from an IAM role or user in the organization's
 * management account.
 */
export const enableSharingWithAwsOrganization: API.OperationMethod<
  EnableSharingWithAwsOrganizationRequest,
  EnableSharingWithAwsOrganizationResponse,
  EnableSharingWithAwsOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /enablesharingwithawsorganization",
    input: {},
  },
  errors: [
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSharingWithAwsOrganization",
})) as any;

export type GetPermissionError =
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Retrieves the contents of a managed permission in JSON format.
 */
export const getPermission: API.OperationMethod<
  GetPermissionRequest,
  GetPermissionResponse,
  GetPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /getpermission",
    input: { permissionArn: 0, permissionVersion: 0 },
    output: { permission: o_ResourceSharePermissionDetail },
    body: true,
  },
  errors: [
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPermission",
})) as any;

export type GetResourcePoliciesError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ResourceArnNotFoundException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves the resource policies for the specified resources that you own and have
 * shared.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const getResourcePolicies: API.PaginatedOperationMethod<
  GetResourcePoliciesRequest,
  GetResourcePoliciesResponse,
  GetResourcePoliciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /getresourcepolicies",
    input: { resourceArns: 0, principal: 0, nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ResourceArnNotFoundException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetResourceShareAssociationsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Retrieves the lists of resources and principals that associated for resource shares that you
 * own.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const getResourceShareAssociations: API.PaginatedOperationMethod<
  GetResourceShareAssociationsRequest,
  GetResourceShareAssociationsResponse,
  GetResourceShareAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /getresourceshareassociations",
    input: {
      associationType: 0,
      resourceShareArns: 0,
      resourceArn: 0,
      principal: 0,
      associationStatus: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { resourceShareAssociations: D.list(o_ResourceShareAssociation) },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceShareAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetResourceShareInvitationsError =
  | InvalidMaxResultsException
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ResourceShareInvitationArnNotFoundException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Retrieves details about invitations that you have received for resource shares.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const getResourceShareInvitations: API.PaginatedOperationMethod<
  GetResourceShareInvitationsRequest,
  GetResourceShareInvitationsResponse,
  GetResourceShareInvitationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /getresourceshareinvitations",
    input: {
      resourceShareInvitationArns: 0,
      resourceShareArns: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { resourceShareInvitations: D.list(o_ResourceShareInvitation) },
    body: true,
  },
  errors: [
    InvalidMaxResultsException,
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ResourceShareInvitationArnNotFoundException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceShareInvitations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetResourceSharesError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Retrieves details about the resource shares that you own or that are shared with you.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const getResourceShares: API.PaginatedOperationMethod<
  GetResourceSharesRequest,
  GetResourceSharesResponse,
  GetResourceSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /getresourceshares",
    input: {
      resourceShareArns: 0,
      resourceShareStatus: 0,
      resourceOwner: 0,
      name: 0,
      tagFilters: D.list({ tagKey: 0, tagValues: 0 }),
      nextToken: 0,
      maxResults: 0,
      permissionArn: 0,
      permissionVersion: 0,
    },
    output: { resourceShares: D.list(o_ResourceShare) },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceShares",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPendingInvitationResourcesError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | MissingRequiredParameterException
  | ResourceShareInvitationAlreadyRejectedException
  | ResourceShareInvitationArnNotFoundException
  | ResourceShareInvitationExpiredException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the resources in a resource share that is shared with you but for which the invitation is
 * still `PENDING`. That means that you haven't accepted or rejected the
 * invitation and the invitation hasn't expired.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listPendingInvitationResources: API.PaginatedOperationMethod<
  ListPendingInvitationResourcesRequest,
  ListPendingInvitationResourcesResponse,
  ListPendingInvitationResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listpendinginvitationresources",
    input: {
      resourceShareInvitationArn: 0,
      nextToken: 0,
      maxResults: 0,
      resourceRegionScope: 0,
    },
    output: { resources: D.list(o_Resource) },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    MissingRequiredParameterException,
    ResourceShareInvitationAlreadyRejectedException,
    ResourceShareInvitationArnNotFoundException,
    ResourceShareInvitationExpiredException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPendingInvitationResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPermissionAssociationsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists information about the managed permission and its associations to any resource shares that use
 * this managed permission. This lets you see which resource shares use which versions of the specified
 * managed permission.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listPermissionAssociations: API.PaginatedOperationMethod<
  ListPermissionAssociationsRequest,
  ListPermissionAssociationsResponse,
  ListPermissionAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listpermissionassociations",
    input: {
      permissionArn: 0,
      permissionVersion: 0,
      associationStatus: 0,
      resourceType: 0,
      featureSet: 0,
      defaultVersion: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { permissions: D.list({ lastUpdatedTime: D.ts }) },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissionAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPermissionsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves a list of available RAM permissions that you can use for the supported
 * resource types.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listPermissions: API.PaginatedOperationMethod<
  ListPermissionsRequest,
  ListPermissionsResponse,
  ListPermissionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listpermissions",
    input: { resourceType: 0, nextToken: 0, maxResults: 0, permissionType: 0 },
    output: { permissions: D.list(o_ResourceSharePermissionSummary) },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPermissionVersionsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Lists the available versions of the specified RAM permission.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listPermissionVersions: API.PaginatedOperationMethod<
  ListPermissionVersionsRequest,
  ListPermissionVersionsResponse,
  ListPermissionVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listpermissionversions",
    input: { permissionArn: 0, nextToken: 0, maxResults: 0 },
    output: { permissions: D.list(o_ResourceSharePermissionSummary) },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissionVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrincipalsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Lists the principals that you are sharing resources with or that are sharing resources
 * with you.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listPrincipals: API.PaginatedOperationMethod<
  ListPrincipalsRequest,
  ListPrincipalsResponse,
  ListPrincipalsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listprincipals",
    input: {
      resourceOwner: 0,
      resourceArn: 0,
      principals: 0,
      resourceType: 0,
      resourceShareArns: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      principals: D.list({ creationTime: D.ts, lastUpdatedTime: D.ts }),
    },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrincipals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReplacePermissionAssociationsWorkError =
  | InvalidNextTokenException
  | InvalidParameterException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves the current status of the asynchronous tasks performed by RAM when you
 * perform the ReplacePermissionAssociationsWork operation.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listReplacePermissionAssociationsWork: API.PaginatedOperationMethod<
  ListReplacePermissionAssociationsWorkRequest,
  ListReplacePermissionAssociationsWorkResponse,
  ListReplacePermissionAssociationsWorkError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listreplacepermissionassociationswork",
    input: { workIds: 0, status: 0, nextToken: 0, maxResults: 0 },
    output: {
      replacePermissionAssociationsWorks: D.list(
        o_ReplacePermissionAssociationsWork,
      ),
    },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReplacePermissionAssociationsWork",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidResourceTypeException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Lists the resources that you added to a resource share or the resources that are shared with
 * you.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesRequest,
  ListResourcesResponse,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listresources",
    input: {
      resourceOwner: 0,
      principal: 0,
      resourceType: 0,
      resourceArns: 0,
      resourceShareArns: 0,
      nextToken: 0,
      maxResults: 0,
      resourceRegionScope: 0,
    },
    output: { resources: D.list(o_Resource) },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidResourceTypeException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceSharePermissionsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Lists the RAM permissions that are associated with a resource share.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listResourceSharePermissions: API.PaginatedOperationMethod<
  ListResourceSharePermissionsRequest,
  ListResourceSharePermissionsResponse,
  ListResourceSharePermissionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listresourcesharepermissions",
    input: { resourceShareArn: 0, nextToken: 0, maxResults: 0 },
    output: { permissions: D.list(o_ResourceSharePermissionSummary) },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSharePermissions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceTypesError =
  | InvalidNextTokenException
  | InvalidParameterException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the resource types that can be shared by RAM.
 */
export const listResourceTypes: API.PaginatedOperationMethod<
  ListResourceTypesRequest,
  ListResourceTypesResponse,
  ListResourceTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listresourcetypes",
    input: { nextToken: 0, maxResults: 0, resourceRegionScope: 0 },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceAssociationsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Lists source associations for resource shares. Source associations control which sources can be used with service principals in resource shares. This operation provides visibility into source associations for resource share owners.
 *
 * You can filter the results by resource share Amazon Resource Name (ARN), source ID, source type, or association status. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listSourceAssociations: API.PaginatedOperationMethod<
  ListSourceAssociationsRequest,
  ListSourceAssociationsResponse,
  ListSourceAssociationsError,
  Credentials | HttpClient.HttpClient,
  AssociatedSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listsourceassociations",
    input: {
      resourceShareArns: 0,
      sourceId: 0,
      sourceType: 0,
      associationStatus: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      sourceAssociations: D.list({ lastUpdatedTime: D.ts, creationTime: D.ts }),
    },
    body: true,
  },
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sourceAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PromotePermissionCreatedFromPolicyError =
  | InvalidParameterException
  | InvalidPolicyException
  | MalformedArnException
  | MissingRequiredParameterException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * When you attach a resource-based policy to a resource, RAM automatically creates
 * a resource share of `featureSet`=`CREATED_FROM_POLICY` with a managed permission that
 * has the same IAM permissions as the original resource-based policy. However, this type
 * of managed permission is visible to only the resource share owner, and the associated resource share can't be modified by
 * using RAM.
 *
 * This operation creates a separate, fully manageable customer managed permission that has the same IAM
 * permissions as the original resource-based policy. You can associate this customer managed permission to any
 * resource shares.
 *
 * Before you use PromoteResourceShareCreatedFromPolicy, you should
 * first run this operation to ensure that you have an appropriate customer managed permission that can be
 * associated with the promoted resource share.
 *
 * - The original `CREATED_FROM_POLICY` policy isn't deleted, and
 * resource shares using that original policy aren't automatically
 * updated.
 *
 * - You can't modify a `CREATED_FROM_POLICY` resource share so you can't
 * associate the new customer managed permission by using
 * `ReplacePermsissionAssociations`. However, if you use PromoteResourceShareCreatedFromPolicy, that operation
 * automatically associates the fully manageable customer managed permission to the newly promoted
 * `STANDARD` resource share.
 *
 * - After you promote a resource share, if the original `CREATED_FROM_POLICY`
 * managed permission has no other associations to A resource share, then RAM automatically deletes
 * it.
 */
export const promotePermissionCreatedFromPolicy: API.OperationMethod<
  PromotePermissionCreatedFromPolicyRequest,
  PromotePermissionCreatedFromPolicyResponse,
  PromotePermissionCreatedFromPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /promotepermissioncreatedfrompolicy",
    input: { permissionArn: 0, name: 0, clientToken: 0 },
    output: { permission: o_ResourceSharePermissionSummary },
    body: true,
  },
  errors: [
    InvalidParameterException,
    InvalidPolicyException,
    MalformedArnException,
    MissingRequiredParameterException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PromotePermissionCreatedFromPolicy",
})) as any;

export type PromoteResourceShareCreatedFromPolicyError =
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | MissingRequiredParameterException
  | OperationNotPermittedException
  | ResourceShareLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | UnmatchedPolicyPermissionException
  | CommonErrors;
/**
 * When you attach a resource-based policy to a resource, RAM automatically creates
 * a resource share of `featureSet`=`CREATED_FROM_POLICY` with a managed permission that
 * has the same IAM permissions as the original resource-based policy. However, this type
 * of managed permission is visible to only the resource share owner, and the associated resource share can't be modified by
 * using RAM.
 *
 * This operation promotes the resource share to a `STANDARD` resource share that is fully
 * manageable in RAM. When you promote a resource share, you can then manage the resource share in RAM and
 * it becomes visible to all of the principals you shared it with.
 *
 * Before you perform this operation, you should first run PromotePermissionCreatedFromPolicyto ensure that you have an
 * appropriate customer managed permission that can be associated with this resource share after its is promoted. If
 * this operation can't find a managed permission that exactly matches the existing
 * `CREATED_FROM_POLICY` permission, then this operation fails.
 */
export const promoteResourceShareCreatedFromPolicy: API.OperationMethod<
  PromoteResourceShareCreatedFromPolicyRequest,
  PromoteResourceShareCreatedFromPolicyResponse,
  PromoteResourceShareCreatedFromPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /promoteresourcesharecreatedfrompolicy",
    input: { resourceShareArn: D.m({ query: "resourceShareArn" }) },
  },
  errors: [
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    MissingRequiredParameterException,
    OperationNotPermittedException,
    ResourceShareLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
    UnmatchedPolicyPermissionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PromoteResourceShareCreatedFromPolicy",
})) as any;

export type RejectResourceShareInvitationError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | MalformedArnException
  | OperationNotPermittedException
  | ResourceShareInvitationAlreadyAcceptedException
  | ResourceShareInvitationAlreadyRejectedException
  | ResourceShareInvitationArnNotFoundException
  | ResourceShareInvitationExpiredException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Rejects an invitation to a resource share from another Amazon Web Services account.
 */
export const rejectResourceShareInvitation: API.OperationMethod<
  RejectResourceShareInvitationRequest,
  RejectResourceShareInvitationResponse,
  RejectResourceShareInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /rejectresourceshareinvitation",
    input: { resourceShareInvitationArn: 0, clientToken: 0 },
    output: { resourceShareInvitation: o_ResourceShareInvitation },
    body: true,
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    MalformedArnException,
    OperationNotPermittedException,
    ResourceShareInvitationAlreadyAcceptedException,
    ResourceShareInvitationAlreadyRejectedException,
    ResourceShareInvitationArnNotFoundException,
    ResourceShareInvitationExpiredException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectResourceShareInvitation",
})) as any;

export type ReplacePermissionAssociationsError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Updates all resource shares that use a managed permission to a different managed
 * permission. This operation always applies the default version of the target managed
 * permission. You can optionally specify that the update applies to only resource shares that
 * currently use a specified version. This enables you to update to the latest version,
 * without changing the which managed permission is used.
 *
 * You can use this operation to update all of your resource shares to use the current
 * default version of the permission by specifying the same value for the
 * `fromPermissionArn` and `toPermissionArn` parameters.
 *
 * You can use the optional `fromPermissionVersion` parameter to update only
 * those resources that use a specified version of the managed permission to the new managed
 * permission.
 *
 * To successfully perform this operation, you must have permission to update the
 * resource-based policy on all affected resource types.
 */
export const replacePermissionAssociations: API.OperationMethod<
  ReplacePermissionAssociationsRequest,
  ReplacePermissionAssociationsResponse,
  ReplacePermissionAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /replacepermissionassociations",
    input: {
      fromPermissionArn: 0,
      fromPermissionVersion: 0,
      toPermissionArn: 0,
      clientToken: 0,
    },
    output: {
      replacePermissionAssociationsWork: o_ReplacePermissionAssociationsWork,
    },
    body: true,
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReplacePermissionAssociations",
})) as any;

export type SetDefaultPermissionVersionError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Designates the specified version number as the default version for the specified
 * customer managed permission. New resource shares automatically use this new default permission. Existing
 * resource shares continue to use their original permission version, but you can use ReplacePermissionAssociations to update them.
 */
export const setDefaultPermissionVersion: API.OperationMethod<
  SetDefaultPermissionVersionRequest,
  SetDefaultPermissionVersionResponse,
  SetDefaultPermissionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /setdefaultpermissionversion",
    input: { permissionArn: 0, permissionVersion: 0, clientToken: 0 },
    body: true,
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultPermissionVersion",
})) as any;

export type TagResourceError =
  | InvalidParameterException
  | MalformedArnException
  | ResourceArnNotFoundException
  | ServerInternalException
  | ServiceUnavailableException
  | TagLimitExceededException
  | TagPolicyViolationException
  | UnknownResourceException
  | CommonErrors;
/**
 * Adds the specified tag keys and values to a resource share or managed permission. If you choose a resource share, the
 * tags are attached to only the resource share, not to the resources that are in the resource share.
 *
 * The tags on a managed permission are the same for all versions of the managed permission.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tagresource",
    input: { resourceShareArn: 0, tags: D.list(i_Tag), resourceArn: 0 },
    body: true,
  },
  errors: [
    InvalidParameterException,
    MalformedArnException,
    ResourceArnNotFoundException,
    ServerInternalException,
    ServiceUnavailableException,
    TagLimitExceededException,
    TagPolicyViolationException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Removes the specified tag key and value pairs from the specified resource share or managed permission.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /untagresource",
    input: { resourceShareArn: 0, tagKeys: 0, resourceArn: 0 },
    body: true,
  },
  errors: [
    InvalidParameterException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateResourceShareError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | MalformedArnException
  | MissingRequiredParameterException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Modifies some of the properties of the specified resource share.
 */
export const updateResourceShare: API.OperationMethod<
  UpdateResourceShareRequest,
  UpdateResourceShareResponse,
  UpdateResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /updateresourceshare",
    input: {
      resourceShareArn: 0,
      name: 0,
      allowExternalPrincipals: 0,
      clientToken: 0,
    },
    output: { resourceShare: o_ResourceShare },
    body: true,
  },
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    MalformedArnException,
    MissingRequiredParameterException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceShare",
})) as any;

const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_ReplacePermissionAssociationsWork: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastUpdatedTime: D.ts,
});
const o_Resource: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastUpdatedTime: D.ts,
});
const o_ResourceShare: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastUpdatedTime: D.ts,
});
const o_ResourceShareAssociation: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastUpdatedTime: D.ts,
});
const o_ResourceShareInvitation: D.LazyStruct = () => ({
  invitationTimestamp: D.ts,
  resourceShareAssociations: D.list(o_ResourceShareAssociation),
});
const o_ResourceSharePermissionDetail: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastUpdatedTime: D.ts,
});
const o_ResourceSharePermissionSummary: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastUpdatedTime: D.ts,
});
