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
  sdkId: "Route53Profiles",
  target: "Route53Profiles",
  version: "2018-05-10",
  sigv4: "route53profiles",
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
                `https://route53profiles-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://route53profiles-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://route53profiles.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://route53profiles.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
  }> {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ TE.TaggedError("InternalServiceErrorException")<{
    readonly message?: string;
  }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidNextTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException")<{
    readonly message: string;
    readonly FieldName?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
    readonly ResourceType?: string;
  }> {}
export class ResourceExistsException
  extends /*@__PURE__*/ TE.TaggedError("ResourceExistsException")<{
    readonly message?: string;
    readonly ResourceType?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
    readonly ResourceType?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
  }> {}
export type ResourceId = string;
export type Name = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface AssociateProfileRequest {
  ProfileId: string;
  ResourceId: string;
  Name: string;
  Tags?: Tag[];
}
export type AccountId = string;
export type ProfileStatus =
  | "COMPLETE"
  | "DELETING"
  | "UPDATING"
  | "CREATING"
  | "DELETED"
  | "FAILED"
  | (string & {});
export type Rfc3339Timestamp = Date;
export interface ProfileAssociation {
  Id?: string;
  Name?: string;
  OwnerId?: string;
  ProfileId?: string;
  ResourceId?: string;
  Status?: ProfileStatus;
  StatusMessage?: string;
  CreationTime?: Date;
  ModificationTime?: Date;
}
export interface AssociateProfileResponse {
  ProfileAssociation?: ProfileAssociation;
}
export type Arn = string;
export type ResourceProperties = string;
export interface AssociateResourceToProfileRequest {
  ProfileId: string;
  ResourceArn: string;
  Name: string;
  ResourceProperties?: string;
}
export interface ProfileResourceAssociation {
  Id?: string;
  Name?: string;
  OwnerId?: string;
  ProfileId?: string;
  ResourceArn?: string;
  ResourceType?: string;
  ResourceProperties?: string;
  Status?: ProfileStatus;
  StatusMessage?: string;
  CreationTime?: Date;
  ModificationTime?: Date;
}
export interface AssociateResourceToProfileResponse {
  ProfileResourceAssociation?: ProfileResourceAssociation;
}
export type CreatorRequestId = string;
export interface CreateProfileRequest {
  Name: string;
  ClientToken: string;
  Tags?: Tag[];
}
export type ShareStatus =
  | "NOT_SHARED"
  | "SHARED_WITH_ME"
  | "SHARED_BY_ME"
  | (string & {});
export interface Profile {
  Id?: string;
  Arn?: string;
  Name?: string;
  OwnerId?: string;
  Status?: ProfileStatus;
  StatusMessage?: string;
  ShareStatus?: ShareStatus;
  CreationTime?: Date;
  ModificationTime?: Date;
  ClientToken?: string;
}
export interface CreateProfileResponse {
  Profile?: Profile;
}
export interface DeleteProfileRequest {
  ProfileId: string;
}
export interface DeleteProfileResponse {
  Profile?: Profile;
}
export interface DisassociateProfileRequest {
  ProfileId: string;
  ResourceId: string;
}
export interface DisassociateProfileResponse {
  ProfileAssociation?: ProfileAssociation;
}
export interface DisassociateResourceFromProfileRequest {
  ProfileId: string;
  ResourceArn: string;
}
export interface DisassociateResourceFromProfileResponse {
  ProfileResourceAssociation?: ProfileResourceAssociation;
}
export interface GetProfileRequest {
  ProfileId: string;
}
export interface GetProfileResponse {
  Profile?: Profile;
}
export interface GetProfileAssociationRequest {
  ProfileAssociationId: string;
}
export interface GetProfileAssociationResponse {
  ProfileAssociation?: ProfileAssociation;
}
export interface GetProfileResourceAssociationRequest {
  ProfileResourceAssociationId: string;
}
export interface GetProfileResourceAssociationResponse {
  ProfileResourceAssociation?: ProfileResourceAssociation;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListProfileAssociationsRequest {
  ResourceId?: string;
  ProfileId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ProfileAssociations = ProfileAssociation[];
export interface ListProfileAssociationsResponse {
  ProfileAssociations?: ProfileAssociation[];
  NextToken?: string;
}
export interface ListProfileResourceAssociationsRequest {
  ProfileId: string;
  ResourceType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ProfileResourceAssociations = ProfileResourceAssociation[];
export interface ListProfileResourceAssociationsResponse {
  ProfileResourceAssociations?: ProfileResourceAssociation[];
  NextToken?: string;
}
export interface ListProfilesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ProfileSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  ShareStatus?: ShareStatus;
}
export type ProfileSummaryList = ProfileSummary[];
export interface ListProfilesResponse {
  ProfileSummaries?: ProfileSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export type TagMap = { [key: string]: string | undefined };
export interface ListTagsForResourceResponse {
  Tags: { [key: string]: string | undefined };
}
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
export interface UpdateProfileResourceAssociationRequest {
  ProfileResourceAssociationId: string;
  Name?: string;
  ResourceProperties?: string;
}
export interface UpdateProfileResourceAssociationResponse {
  ProfileResourceAssociation?: ProfileResourceAssociation;
}
export type ExceptionMessage = string;
export type AssociateProfileError =
  | AccessDeniedException
  | ConflictException
  | InvalidParameterException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a Route 53 Profiles profile with a VPC. A VPC can have only one Profile associated with it, but a Profile can be associated with 1000 of VPCs (and you can request a higher quota).
 * For more information, see https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DNSLimitations.html#limits-api-entities.
 */
export const associateProfile: API.OperationMethod<
  AssociateProfileRequest,
  AssociateProfileResponse,
  AssociateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profileassociation",
    input: { ProfileId: 0, ResourceId: 0, Name: 0, Tags: D.list(i_Tag) },
    output: { ProfileAssociation: o_ProfileAssociation },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidParameterException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateProfile",
})) as any;

export type AssociateResourceToProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a DNS reource configuration to a Route 53 Profile.
 */
export const associateResourceToProfile: API.OperationMethod<
  AssociateResourceToProfileRequest,
  AssociateResourceToProfileResponse,
  AssociateResourceToProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profileresourceassociation",
    input: { ProfileId: 0, ResourceArn: 0, Name: 0, ResourceProperties: 0 },
    output: { ProfileResourceAssociation: o_ProfileResourceAssociation },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResourceToProfile",
})) as any;

export type CreateProfileError =
  | AccessDeniedException
  | InvalidParameterException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an empty Route 53 Profile.
 */
export const createProfile: API.OperationMethod<
  CreateProfileRequest,
  CreateProfileResponse,
  CreateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profile",
    input: {
      Name: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: { Profile: o_Profile },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProfile",
})) as any;

export type DeleteProfileError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Route 53 Profile. Before you can delete a profile, you must first disassociate it from all VPCs.
 */
export const deleteProfile: API.OperationMethod<
  DeleteProfileRequest,
  DeleteProfileResponse,
  DeleteProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /profile/{ProfileId}",
    input: { ProfileId: 0 },
    output: { Profile: o_Profile },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfile",
})) as any;

export type DisassociateProfileError =
  | AccessDeniedException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Dissociates a specified Route 53 Profile from the specified VPC.
 */
export const disassociateProfile: API.OperationMethod<
  DisassociateProfileRequest,
  DisassociateProfileResponse,
  DisassociateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /profileassociation/Profileid/{ProfileId}/resourceid/{ResourceId}",
    input: { ProfileId: 0, ResourceId: 0 },
    output: { ProfileAssociation: o_ProfileAssociation },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateProfile",
})) as any;

export type DisassociateResourceFromProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Dissoaciated a specified resource, from the Route 53 Profile.
 */
export const disassociateResourceFromProfile: API.OperationMethod<
  DisassociateResourceFromProfileRequest,
  DisassociateResourceFromProfileResponse,
  DisassociateResourceFromProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /profileresourceassociation/profileid/{ProfileId}/resourcearn/{ResourceArn}",
    input: { ProfileId: 0, ResourceArn: 0 },
    output: { ProfileResourceAssociation: o_ProfileResourceAssociation },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResourceFromProfile",
})) as any;

export type GetProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specified Route 53 Profile, such as whether whether the Profile is shared, and the current status of the Profile.
 */
export const getProfile: API.OperationMethod<
  GetProfileRequest,
  GetProfileResponse,
  GetProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /profile/{ProfileId}",
    input: { ProfileId: 0 },
    output: { Profile: o_Profile },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfile",
})) as any;

export type GetProfileAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a Route 53 Profile association for a VPC. A VPC can have only one Profile association, but a Profile can be associated with up to 5000 VPCs.
 */
export const getProfileAssociation: API.OperationMethod<
  GetProfileAssociationRequest,
  GetProfileAssociationResponse,
  GetProfileAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /profileassociation/{ProfileAssociationId}",
    input: { ProfileAssociationId: 0 },
    output: { ProfileAssociation: o_ProfileAssociation },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileAssociation",
})) as any;

export type GetProfileResourceAssociationError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specified Route 53 Profile resource association.
 */
export const getProfileResourceAssociation: API.OperationMethod<
  GetProfileResourceAssociationRequest,
  GetProfileResourceAssociationResponse,
  GetProfileResourceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /profileresourceassociation/{ProfileResourceAssociationId}",
    input: { ProfileResourceAssociationId: 0 },
    output: { ProfileResourceAssociation: o_ProfileResourceAssociation },
  },
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileResourceAssociation",
})) as any;

export type ListProfileAssociationsError =
  | AccessDeniedException
  | InvalidNextTokenException
  | InvalidParameterException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the VPCs that the specified Route 53 Profile is associated with.
 */
export const listProfileAssociations: API.PaginatedOperationMethod<
  ListProfileAssociationsRequest,
  ListProfileAssociationsResponse,
  ListProfileAssociationsError,
  Credentials | HttpClient.HttpClient,
  ProfileAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /profileassociations",
    input: {
      ResourceId: D.m({ query: "resourceId" }),
      ProfileId: D.m({ query: "profileId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { ProfileAssociations: D.list(o_ProfileAssociation) },
  },
  errors: [
    AccessDeniedException,
    InvalidNextTokenException,
    InvalidParameterException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProfileAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProfileResourceAssociationsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the resource associations for the specified Route 53 Profile.
 */
export const listProfileResourceAssociations: API.PaginatedOperationMethod<
  ListProfileResourceAssociationsRequest,
  ListProfileResourceAssociationsResponse,
  ListProfileResourceAssociationsError,
  Credentials | HttpClient.HttpClient,
  ProfileResourceAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /profileresourceassociations/profileid/{ProfileId}",
    input: {
      ProfileId: 0,
      ResourceType: D.m({ query: "resourceType" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ProfileResourceAssociations: D.list(o_ProfileResourceAssociation),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileResourceAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProfileResourceAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProfilesError =
  | AccessDeniedException
  | InvalidNextTokenException
  | InvalidParameterException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the Route 53 Profiles associated with your Amazon Web Services account.
 */
export const listProfiles: API.PaginatedOperationMethod<
  ListProfilesRequest,
  ListProfilesResponse,
  ListProfilesError,
  Credentials | HttpClient.HttpClient,
  ProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /profiles",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidNextTokenException,
    InvalidParameterException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProfileSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags that you associated with the specified resource.
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
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to a specified resource.
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
    AccessDeniedException,
    ResourceNotFoundException,
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
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from a specified resource.
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
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateProfileResourceAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified Route 53 Profile resourse association.
 */
export const updateProfileResourceAssociation: API.OperationMethod<
  UpdateProfileResourceAssociationRequest,
  UpdateProfileResourceAssociationResponse,
  UpdateProfileResourceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /profileresourceassociation/{ProfileResourceAssociationId}",
    input: { ProfileResourceAssociationId: 0, Name: 0, ResourceProperties: 0 },
    output: { ProfileResourceAssociation: o_ProfileResourceAssociation },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfileResourceAssociation",
})) as any;

const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Profile: D.LazyStruct = () => ({
  CreationTime: D.ts,
  ModificationTime: D.ts,
});
const o_ProfileAssociation: D.LazyStruct = () => ({
  CreationTime: D.ts,
  ModificationTime: D.ts,
});
const o_ProfileResourceAssociation: D.LazyStruct = () => ({
  CreationTime: D.ts,
  ModificationTime: D.ts,
});
