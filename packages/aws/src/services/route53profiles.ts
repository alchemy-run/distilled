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
  sdkId: "Route53Profiles",
  serviceShapeName: "Route53Profiles",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "route53profiles" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://route53profiles.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://route53profiles.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://route53profiles.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()("InvalidNextTokenException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    FieldName: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ResourceType: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ResourceExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceExistsException>()("ResourceExistsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ResourceType: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ResourceType: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
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
export type ShareStatus = "NOT_SHARED" | "SHARED_WITH_ME" | "SHARED_BY_ME" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateProfileRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<AssociateProfileResponse>,
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
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<AssociateResourceToProfileRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<AssociateResourceToProfileResponse>,
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
}));

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
  input: __S(28, __c7, 0) as any as S.Schema<CreateProfileRequest>,
  output: __S(33, __c8, 1) as any as S.Schema<CreateProfileResponse>,
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
}));

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
  input: __S(36, __c9, 0) as any as S.Schema<DeleteProfileRequest>,
  output: __S(33, __c8, 1) as any as S.Schema<DeleteProfileResponse>,
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
}));

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
  input: __S(40, __c10, 0) as any as S.Schema<DisassociateProfileRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<DisassociateProfileResponse>,
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
}));

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
  input: __S(44, __c11, 0) as any as S.Schema<DisassociateResourceFromProfileRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<DisassociateResourceFromProfileResponse>,
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
}));

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
  input: __S(48, __c12, 0) as any as S.Schema<GetProfileRequest>,
  output: __S(33, __c8, 1) as any as S.Schema<GetProfileResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfile",
}));

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
  input: __S(52, __c13, 0) as any as S.Schema<GetProfileAssociationRequest>,
  output: __S(8, __c2, 0) as any as S.Schema<GetProfileAssociationResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileAssociation",
}));

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
  input: __S(56, __c14, 0) as any as S.Schema<GetProfileResourceAssociationRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<GetProfileResourceAssociationResponse>,
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
}));

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
  input: __S(60, __c15, 0) as any as S.Schema<ListProfileAssociationsRequest>,
  output: __S(62, __c15, 2) as any as S.Schema<ListProfileAssociationsResponse>,
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
  input: __S(64, __c16, 0) as any as S.Schema<ListProfileResourceAssociationsRequest>,
  output: __S(66, __c16, 2) as any as S.Schema<ListProfileResourceAssociationsResponse>,
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
  input: __S(68, __c17, 0) as any as S.Schema<ListProfilesRequest>,
  output: __S(71, __c17, 3) as any as S.Schema<ListProfilesResponse>,
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
  input: __S(72, __c18, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(73, __c18, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(80, __c20, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(84, __c21, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
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
  input: __S(89, __c22, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(84, __c21, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(92, __c23, 0) as any as S.Schema<UpdateProfileResourceAssociationRequest>,
  output: __S(24, __c6, 0) as any as S.Schema<UpdateProfileResourceAssociationResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          ResourceId: S.String,
          Name: S.String,
          Tags: S.optional(__S(5, __c1, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/profileassociation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateProfileRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(4, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProfileAssociation: S.optional(__S(12, __c3, 0)) }),
      ).annotate({ identifier: "AssociateProfileResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          OwnerId: S.optional(S.String),
          ProfileId: S.optional(S.String),
          ResourceId: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ProfileAssociation" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String,
          ResourceArn: S.String,
          Name: S.String,
          ResourceProperties: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/profileresourceassociation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateResourceToProfileRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          OwnerId: S.optional(S.String),
          ProfileId: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceProperties: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ProfileResourceAssociation" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProfileResourceAssociation: S.optional(__S(20, __c5, 0)) }),
      ).annotate({ identifier: "AssociateResourceToProfileResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(5, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/profile" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProfileRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          OwnerId: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          ShareStatus: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ClientToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "Profile" });
    case 1:
      return S.suspend(() => S.Struct({ Profile: S.optional(__S(32, __c8, 0)) })).annotate({
        identifier: "CreateProfileResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProfileId: S.String.pipe(T.HttpLabel("ProfileId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/profile/{ProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProfileRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
          ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/profileassociation/Profileid/{ProfileId}/resourceid/{ResourceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateProfileRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/profileresourceassociation/profileid/{ProfileId}/resourcearn/{ResourceArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateResourceFromProfileRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProfileId: S.String.pipe(T.HttpLabel("ProfileId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/profile/{ProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProfileRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProfileAssociationId: S.String.pipe(T.HttpLabel("ProfileAssociationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/profileassociation/{ProfileAssociationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProfileAssociationRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileResourceAssociationId: S.String.pipe(T.HttpLabel("ProfileResourceAssociationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/profileresourceassociation/{ProfileResourceAssociationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProfileResourceAssociationRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String).pipe(T.HttpQuery("resourceId")),
          ProfileId: S.optional(S.String).pipe(T.HttpQuery("profileId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/profileassociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProfileAssociationsRequest" });
    case 1:
      return S.Array(__S(12, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProfileAssociations: S.optional(__S(61, __c15, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProfileAssociationsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/profileresourceassociations/profileid/{ProfileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProfileResourceAssociationsRequest" });
    case 1:
      return S.Array(__S(20, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProfileResourceAssociations: S.optional(__S(65, __c16, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProfileResourceAssociationsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/profiles" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProfilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          ShareStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProfileSummary" });
    case 2:
      return S.Array(__S(69, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProfileSummaries: S.optional(__S(70, __c17, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProfilesResponse" });
  }
}
function __c18(j: number): any {
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
      return S.suspend(() => S.Struct({ Tags: __S(76, __c19, 0) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(76, __c19, 0),
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
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(88, __c22, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProfileResourceAssociationId: S.String.pipe(T.HttpLabel("ProfileResourceAssociationId")),
          Name: S.optional(S.String),
          ResourceProperties: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/profileresourceassociation/{ProfileResourceAssociationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProfileResourceAssociationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
