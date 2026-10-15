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
  sdkId: "RAM",
  serviceShapeName: "AmazonResourceSharing",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ram" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-01-04");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
            return e(`https://ram-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://ram.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://ram.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ram.{R}.{D}","properties":{},"headers":{}}');

export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "IdempotentParameterMismatch", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClientTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidClientTokenException>()(
    "InvalidClientTokenException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidClientToken", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidMaxResultsException
  extends /*@__PURE__*/ S.TaggedError<InvalidMaxResultsException>()(
    "InvalidMaxResultsException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidMaxResults", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidNextToken", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameter", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidPolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyException>()(
    "InvalidPolicyException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidPolicy", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidResourceTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceTypeException>()(
    "InvalidResourceTypeException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidResourceType.Unknown", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateTransitionException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateTransitionException>()(
    "InvalidStateTransitionException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidStateTransitionException.Unknown",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MalformedArnException
  extends /*@__PURE__*/ S.TaggedError<MalformedArnException>()(
    "MalformedArnException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidArn.Malformed", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MalformedPolicyTemplateException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyTemplateException>()(
    "MalformedPolicyTemplateException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "MalformedPolicyTemplateException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MissingRequiredParameterException
  extends /*@__PURE__*/ S.TaggedError<MissingRequiredParameterException>()(
    "MissingRequiredParameterException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "MissingRequiredParameter", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotPermittedException>()(
    "OperationNotPermittedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "OperationNotPermitted", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PermissionAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<PermissionAlreadyExistsException>()(
    "PermissionAlreadyExistsException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "PermissionAlreadyExistsException",
        httpResponseCode: 409,
      }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class PermissionLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<PermissionLimitExceededException>()(
    "PermissionLimitExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "PermissionLimitExceededException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PermissionVersionsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<PermissionVersionsLimitExceededException>()(
    "PermissionVersionsLimitExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "PermissionVersionsLimitExceededException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceArnNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceArnNotFoundException>()(
    "ResourceArnNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidResourceArn.NotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceShareInvitationAlreadyAcceptedException
  extends /*@__PURE__*/ S.TaggedError<ResourceShareInvitationAlreadyAcceptedException>()(
    "ResourceShareInvitationAlreadyAcceptedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidResourceShareInvitationArn.AlreadyAccepted",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceShareInvitationAlreadyRejectedException
  extends /*@__PURE__*/ S.TaggedError<ResourceShareInvitationAlreadyRejectedException>()(
    "ResourceShareInvitationAlreadyRejectedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidResourceShareInvitationArn.AlreadyRejected",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceShareInvitationArnNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceShareInvitationArnNotFoundException>()(
    "ResourceShareInvitationArnNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidResourceShareInvitationArn.NotFound",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceShareInvitationExpiredException
  extends /*@__PURE__*/ S.TaggedError<ResourceShareInvitationExpiredException>()(
    "ResourceShareInvitationExpiredException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidResourceShareInvitationArn.Expired",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceShareLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceShareLimitExceededException>()(
    "ResourceShareLimitExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceShareLimitExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerInternalException
  extends /*@__PURE__*/ S.TaggedError<ServerInternalException>()(
    "ServerInternalException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InternalError", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "Unavailable", httpResponseCode: 503 }),
      /*@__PURE__*/ T.HttpError(503),
    ),
  ).pipe(C.withServerError) {}
export class TagLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TagLimitExceededException>()(
    "TagLimitExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TagLimitExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagPolicyViolationException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyViolationException>()(
    "TagPolicyViolationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TagPolicyViolation", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ThrottlingException", httpResponseCode: 429 }),
      /*@__PURE__*/ T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class UnknownResourceException
  extends /*@__PURE__*/ S.TaggedError<UnknownResourceException>()(
    "UnknownResourceException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidResourceShareArn.NotFound",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnmatchedPolicyPermissionException
  extends /*@__PURE__*/ S.TaggedError<UnmatchedPolicyPermissionException>()(
    "UnmatchedPolicyPermissionException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "UnmatchedPolicyPermissionException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
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
export type ResourceShareAssociationType = "PRINCIPAL" | "RESOURCE" | "SOURCE" | (string & {});
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
export type ResourceRegionScopeFilter = "ALL" | "REGIONAL" | "GLOBAL" | (string & {});
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
export type PermissionTypeFilter = "ALL" | "AWS_MANAGED" | "CUSTOMER_MANAGED" | (string & {});
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
export type ReplacePermissionAssociationsWorkList = ReplacePermissionAssociationsWork[];
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
  input: __S(0, __c0, 0) as any as S.Schema<AcceptResourceShareInvitationRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<AcceptResourceShareInvitationResponse>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<AssociateResourceShareRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<AssociateResourceShareResponse>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<AssociateResourceSharePermissionRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<AssociateResourceSharePermissionResponse>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<CreatePermissionRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<CreatePermissionResponse>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<CreatePermissionVersionRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<CreatePermissionVersionResponse>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<CreateResourceShareRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<CreateResourceShareResponse>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<DeletePermissionRequest>,
  output: __S(152, __c19, 0) as any as S.Schema<DeletePermissionResponse>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<DeletePermissionVersionRequest>,
  output: __S(152, __c19, 0) as any as S.Schema<DeletePermissionVersionResponse>,
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
}));

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
  input: __S(168, __c21, 0) as any as S.Schema<DeleteResourceShareRequest>,
  output: __S(176, __c22, 0) as any as S.Schema<DeleteResourceShareResponse>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<DisassociateResourceShareRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<DisassociateResourceShareResponse>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<DisassociateResourceSharePermissionRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<DisassociateResourceSharePermissionResponse>,
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
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<EnableSharingWithAwsOrganizationRequest>,
  output: __S(208, __c26, 0) as any as S.Schema<EnableSharingWithAwsOrganizationResponse>,
  errors: [OperationNotPermittedException, ServerInternalException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSharingWithAwsOrganization",
}));

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
  input: __S(216, __c27, 0) as any as S.Schema<GetPermissionRequest>,
  output: __S(217, __c27, 1) as any as S.Schema<GetPermissionResponse>,
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
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<GetResourcePoliciesRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<GetResourcePoliciesResponse>,
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
  input: __S(232, __c29, 0) as any as S.Schema<GetResourceShareAssociationsRequest>,
  output: __S(233, __c29, 1) as any as S.Schema<GetResourceShareAssociationsResponse>,
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
  input: __S(240, __c30, 0) as any as S.Schema<GetResourceShareInvitationsRequest>,
  output: __S(242, __c30, 2) as any as S.Schema<GetResourceShareInvitationsResponse>,
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
  input: __S(250, __c31, 2) as any as S.Schema<GetResourceSharesRequest>,
  output: __S(252, __c31, 4) as any as S.Schema<GetResourceSharesResponse>,
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
  input: __S(264, __c33, 0) as any as S.Schema<ListPendingInvitationResourcesRequest>,
  output: __S(274, __c34, 2) as any as S.Schema<ListPendingInvitationResourcesResponse>,
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
  input: __S(280, __c35, 0) as any as S.Schema<ListPermissionAssociationsRequest>,
  output: __S(283, __c35, 3) as any as S.Schema<ListPermissionAssociationsResponse>,
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
  input: __S(288, __c36, 0) as any as S.Schema<ListPermissionsRequest>,
  output: __S(297, __c37, 1) as any as S.Schema<ListPermissionsResponse>,
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
  input: __S(304, __c38, 0) as any as S.Schema<ListPermissionVersionsRequest>,
  output: __S(297, __c37, 1) as any as S.Schema<ListPermissionVersionsResponse>,
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
  input: __S(312, __c39, 0) as any as S.Schema<ListPrincipalsRequest>,
  output: __S(315, __c39, 3) as any as S.Schema<ListPrincipalsResponse>,
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
  input: __S(320, __c40, 0) as any as S.Schema<ListReplacePermissionAssociationsWorkRequest>,
  output: __S(322, __c40, 2) as any as S.Schema<ListReplacePermissionAssociationsWorkResponse>,
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
  input: __S(336, __c42, 0) as any as S.Schema<ListResourcesRequest>,
  output: __S(274, __c34, 2) as any as S.Schema<ListResourcesResponse>,
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
  input: __S(344, __c43, 0) as any as S.Schema<ListResourceSharePermissionsRequest>,
  output: __S(297, __c37, 1) as any as S.Schema<ListResourceSharePermissionsResponse>,
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
  input: __S(352, __c44, 0) as any as S.Schema<ListResourceTypesRequest>,
  output: __S(355, __c44, 3) as any as S.Schema<ListResourceTypesResponse>,
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
  input: __S(360, __c45, 0) as any as S.Schema<ListSourceAssociationsRequest>,
  output: __S(363, __c45, 3) as any as S.Schema<ListSourceAssociationsResponse>,
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
  input: __S(368, __c46, 0) as any as S.Schema<PromotePermissionCreatedFromPolicyRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<PromotePermissionCreatedFromPolicyResponse>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<PromoteResourceShareCreatedFromPolicyRequest>,
  output: __S(208, __c26, 0) as any as S.Schema<PromoteResourceShareCreatedFromPolicyResponse>,
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
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<RejectResourceShareInvitationRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<RejectResourceShareInvitationResponse>,
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
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<ReplacePermissionAssociationsRequest>,
  output: __S(393, __c49, 1) as any as S.Schema<ReplacePermissionAssociationsResponse>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<SetDefaultPermissionVersionRequest>,
  output: __S(176, __c22, 0) as any as S.Schema<SetDefaultPermissionVersionResponse>,
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
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(416, __c52, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(416, __c52, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<UpdateResourceShareRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<UpdateResourceShareResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceShareInvitationArn: S.String, clientToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/acceptresourceshareinvitation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptResourceShareInvitationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.optional(S.String),
          resourceShareName: S.optional(S.String),
          associatedEntity: S.optional(S.String),
          associationType: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          external: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ResourceShareAssociation" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(8, __c1, 0)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "ResourceShareAssociation" }),
      );
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareInvitationArn: S.optional(S.String),
          resourceShareName: S.optional(S.String),
          resourceShareArn: S.optional(S.String),
          senderAccountId: S.optional(S.String),
          receiverAccountId: S.optional(S.String),
          invitationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          resourceShareAssociations: S.optional(__S(9, __c1, 1)),
          receiverArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceShareInvitation" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareInvitation: S.optional(__S(16, __c2, 0)),
          clientToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "AcceptResourceShareInvitationResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.String,
          resourceArns: S.optional(__S(40, __c5, 0)),
          principals: S.optional(__S(40, __c5, 0)),
          clientToken: S.optional(S.String),
          sources: S.optional(__S(40, __c5, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/associateresourceshare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateResourceShareRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("item")));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareAssociations: S.optional(__S(9, __c1, 1)),
          clientToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateResourceShareResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.String,
          permissionArn: S.String,
          replace: S.optional(S.Boolean),
          clientToken: S.optional(S.String),
          permissionVersion: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/associateresourcesharepermission" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateResourceSharePermissionRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ returnValue: S.optional(S.Boolean), clientToken: S.optional(S.String) }),
      ).annotate({ identifier: "AssociateResourceSharePermissionResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          resourceType: S.String,
          policyTemplate: S.String,
          clientToken: S.optional(S.String),
          tags: S.optional(__S(81, __c10, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/createpermission" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePermissionRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(80, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          version: S.optional(S.String),
          defaultVersion: S.optional(S.Boolean),
          name: S.optional(S.String),
          resourceType: S.optional(S.String),
          status: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          isResourceTypeDefault: S.optional(S.Boolean),
          permissionType: S.optional(S.String),
          featureSet: S.optional(S.String),
          tags: S.optional(__S(81, __c10, 1)),
        }),
      ).annotate({ identifier: "ResourceSharePermissionSummary" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ permission: S.optional(__S(88, __c11, 0)), clientToken: S.optional(S.String) }),
      ).annotate({ identifier: "CreatePermissionResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionArn: S.String,
          policyTemplate: S.String,
          clientToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/createpermissionversion" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePermissionVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ permission: S.optional(__S(112, __c14, 0)), clientToken: S.optional(S.String) }),
      ).annotate({ identifier: "CreatePermissionVersionResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          version: S.optional(S.String),
          defaultVersion: S.optional(S.Boolean),
          name: S.optional(S.String),
          resourceType: S.optional(S.String),
          permission: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          isResourceTypeDefault: S.optional(S.Boolean),
          permissionType: S.optional(S.String),
          featureSet: S.optional(S.String),
          status: S.optional(S.String),
          tags: S.optional(__S(81, __c10, 1)),
        }),
      ).annotate({ identifier: "ResourceSharePermissionDetail" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          resourceArns: S.optional(__S(40, __c5, 0)),
          principals: S.optional(__S(40, __c5, 0)),
          tags: S.optional(__S(81, __c10, 1)),
          allowExternalPrincipals: S.optional(S.Boolean),
          clientToken: S.optional(S.String),
          permissionArns: S.optional(__S(40, __c5, 0)),
          sources: S.optional(__S(40, __c5, 0)),
          resourceShareConfiguration: S.optional(__S(128, __c16, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/createresourceshare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateResourceShareRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ retainSharingOnAccountLeaveOrganization: S.optional(S.Boolean) }),
      ).annotate({ identifier: "ResourceShareConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.optional(S.String),
          name: S.optional(S.String),
          owningAccountId: S.optional(S.String),
          allowExternalPrincipals: S.optional(S.Boolean),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          tags: S.optional(__S(81, __c10, 1)),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          featureSet: S.optional(S.String),
          resourceShareConfiguration: S.optional(__S(128, __c16, 0)),
        }),
      ).annotate({ identifier: "ResourceShare" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShare: S.optional(__S(129, __c16, 1)),
          clientToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateResourceShareResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionArn: S.String.pipe(T.HttpQuery("permissionArn")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/deletepermission" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePermissionRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          returnValue: S.optional(S.Boolean).pipe(T.XmlName("return")),
          clientToken: S.optional(S.String),
          permissionStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeletePermissionResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionArn: S.String.pipe(T.HttpQuery("permissionArn")),
          permissionVersion: S.Number.pipe(T.HttpQuery("permissionVersion")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/deletepermissionversion" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePermissionVersionRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.String.pipe(T.HttpQuery("resourceShareArn")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/deleteresourceshare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourceShareRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          returnValue: S.optional(S.Boolean).pipe(T.XmlName("return")),
          clientToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteResourceShareResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.String,
          resourceArns: S.optional(__S(40, __c5, 0)),
          principals: S.optional(__S(40, __c5, 0)),
          clientToken: S.optional(S.String),
          sources: S.optional(__S(40, __c5, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/disassociateresourceshare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateResourceShareRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.String,
          permissionArn: S.String,
          clientToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/disassociateresourcesharepermission" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateResourceSharePermissionRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/enablesharingwithawsorganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableSharingWithAwsOrganizationRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ returnValue: S.optional(S.Boolean).pipe(T.XmlName("return")) }),
      ).annotate({ identifier: "EnableSharingWithAwsOrganizationResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ permissionArn: S.String, permissionVersion: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/getpermission" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPermissionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ permission: S.optional(__S(112, __c14, 0)) })).annotate({
        identifier: "GetPermissionResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArns: __S(40, __c5, 0),
          principal: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getresourcepolicies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ policies: S.optional(__S(40, __c5, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetResourcePoliciesResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          associationType: S.String,
          resourceShareArns: S.optional(__S(40, __c5, 0)),
          resourceArn: S.optional(S.String),
          principal: S.optional(S.String),
          associationStatus: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getresourceshareassociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceShareAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceShareAssociations: S.optional(__S(9, __c1, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetResourceShareAssociationsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareInvitationArns: S.optional(__S(40, __c5, 0)),
          resourceShareArns: S.optional(__S(40, __c5, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getresourceshareinvitations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceShareInvitationsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(16, __c2, 0)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "ResourceShareInvitation" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourceShareInvitations: S.optional(__S(241, __c30, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetResourceShareInvitationsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tagKey: S.optional(S.String), tagValues: S.optional(__S(256, __c32, 0)) }),
      ).annotate({ identifier: "TagFilter" });
    case 1:
      return S.Array(__S(248, __c31, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourceShareArns: S.optional(__S(40, __c5, 0)),
          resourceShareStatus: S.optional(S.String),
          resourceOwner: S.String,
          name: S.optional(S.String),
          tagFilters: S.optional(__S(249, __c31, 1)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          permissionArn: S.optional(S.String),
          permissionVersion: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getresourceshares" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceSharesRequest" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(129, __c16, 1)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "ResourceShare" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          resourceShares: S.optional(__S(251, __c31, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetResourceSharesResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareInvitationArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          resourceRegionScope: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listpendinginvitationresources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPendingInvitationResourcesRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          type: S.optional(S.String),
          resourceShareArn: S.optional(S.String),
          resourceGroupArn: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          resourceRegionScope: S.optional(S.String),
        }),
      ).annotate({ identifier: "Resource" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(272, __c34, 0)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "Resource" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ resources: S.optional(__S(273, __c34, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPendingInvitationResourcesResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionArn: S.optional(S.String),
          permissionVersion: S.optional(S.Number),
          associationStatus: S.optional(S.String),
          resourceType: S.optional(S.String),
          featureSet: S.optional(S.String),
          defaultVersion: S.optional(S.Boolean),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listpermissionassociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPermissionAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          permissionVersion: S.optional(S.String),
          defaultVersion: S.optional(S.Boolean),
          resourceType: S.optional(S.String),
          status: S.optional(S.String),
          featureSet: S.optional(S.String),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          resourceShareArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociatedPermission" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(281, __c35, 1)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "AssociatedPermission" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ permissions: S.optional(__S(282, __c35, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPermissionAssociationsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          permissionType: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/listpermissions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPermissionsRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(88, __c11, 0)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "ResourceSharePermissionSummary" }),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({ permissions: S.optional(__S(296, __c37, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPermissionsResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listpermissionversions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPermissionVersionsRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceOwner: S.String,
          resourceArn: S.optional(S.String),
          principals: S.optional(__S(40, __c5, 0)),
          resourceType: S.optional(S.String),
          resourceShareArns: S.optional(__S(40, __c5, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/listprincipals" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPrincipalsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          resourceShareArn: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          external: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Principal" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(313, __c39, 1)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "Principal" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ principals: S.optional(__S(314, __c39, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPrincipalsResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workIds: S.optional(__S(40, __c5, 0)),
          status: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listreplacepermissionassociationswork" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListReplacePermissionAssociationsWorkRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(328, __c41, 0)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "ReplacePermissionAssociationsWork" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          replacePermissionAssociationsWorks: S.optional(__S(321, __c40, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListReplacePermissionAssociationsWorkResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          fromPermissionArn: S.optional(S.String),
          fromPermissionVersion: S.optional(S.String),
          toPermissionArn: S.optional(S.String),
          toPermissionVersion: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ReplacePermissionAssociationsWork" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceOwner: S.String,
          principal: S.optional(S.String),
          resourceType: S.optional(S.String),
          resourceArns: S.optional(__S(40, __c5, 0)),
          resourceShareArns: S.optional(__S(40, __c5, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          resourceRegionScope: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/listresources" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListResourcesRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listresourcesharepermissions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceSharePermissionsRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          resourceRegionScope: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listresourcetypes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.optional(S.String),
          serviceName: S.optional(S.String),
          resourceRegionScope: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceNameAndResourceType" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(353, __c44, 1)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "ServiceNameAndResourceType" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          resourceTypes: S.optional(__S(354, __c44, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourceTypesResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareArns: S.optional(__S(40, __c5, 0)),
          sourceId: S.optional(S.String),
          sourceType: S.optional(S.String),
          associationStatus: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listsourceassociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSourceAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.optional(S.String),
          sourceId: S.optional(S.String),
          sourceType: S.optional(S.String),
          status: S.optional(S.String),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          statusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociatedSource" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(361, __c45, 1)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "AssociatedSource" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          sourceAssociations: S.optional(__S(362, __c45, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSourceAssociationsResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionArn: S.String,
          name: S.String,
          clientToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/promotepermissioncreatedfrompolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PromotePermissionCreatedFromPolicyRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceShareArn: S.String.pipe(T.HttpQuery("resourceShareArn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/promoteresourcesharecreatedfrompolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PromoteResourceShareCreatedFromPolicyRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceShareInvitationArn: S.String, clientToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/rejectresourceshareinvitation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectResourceShareInvitationRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fromPermissionArn: S.String,
          fromPermissionVersion: S.optional(S.Number),
          toPermissionArn: S.String,
          clientToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/replacepermissionassociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ReplacePermissionAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          replacePermissionAssociationsWork: S.optional(__S(328, __c41, 0)),
          clientToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReplacePermissionAssociationsResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permissionArn: S.String,
          permissionVersion: S.Number,
          clientToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/setdefaultpermissionversion" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SetDefaultPermissionVersionRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.optional(S.String),
          tags: __S(81, __c10, 1),
          resourceArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/tagresource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.optional(S.String),
          tagKeys: __S(256, __c32, 0),
          resourceArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/untagresource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceShareArn: S.String,
          name: S.optional(S.String),
          allowExternalPrincipals: S.optional(S.Boolean),
          clientToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/updateresourceshare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateResourceShareRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
