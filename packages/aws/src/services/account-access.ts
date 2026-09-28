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
  sdkId: "Account Access",
  target: "AWSAccountAccess",
  version: "2018-05-10",
  sigv4: "account-access",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://account-access-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://account-access.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class AlreadyCreatedException
  extends /*@__PURE__*/ TE.TaggedError("AlreadyCreatedException")<{
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type IdentityCenterInstanceArn = string;
export interface IdentityCenter {
  instanceArn: string;
}
export type IdentitySource = { identityCenter: IdentityCenter };
export type TagsMap = { [key: string]: string | undefined };
export interface CreateApplicationRequest {
  identitySource: IdentitySource;
  tags?: { [key: string]: string | undefined };
}
export type ApplicationArn = string;
export interface CreateApplicationResponse {
  applicationArn: string;
}
export type UserId = string;
export type GroupId = string;
export type IdentityCenterPrincipal =
  | { userId: string; groupId?: never }
  | { userId?: never; groupId: string };
export type Principal = { identityCenter: IdentityCenterPrincipal };
export type RoleArn = string;
export interface PrincipalRoleEntitlement {
  principal: Principal;
  roleArn: string;
}
export type Entitlement = { principalRole: PrincipalRoleEntitlement };
export interface CreateEntitlementRequest {
  applicationArn: string;
  entitlement: Entitlement;
}
export interface CreateEntitlementResponse {
  entitlementId: string;
}
export interface DeleteApplicationRequest {
  applicationArn: string;
}
export interface DeleteApplicationResponse {}
export interface DeleteEntitlementRequest {
  applicationArn: string;
  entitlementId: string;
}
export interface DeleteEntitlementResponse {}
export interface GetApplicationRequest {
  applicationArn: string;
}
export type IdentityCenterApplicationArn = string;
export interface IdentityCenterDetails {
  instanceArn: string;
  applicationArn?: string;
}
export type IdentitySourceDetails = { identityCenter: IdentityCenterDetails };
export type Status =
  | "CREATE_IN_PROGRESS"
  | "ACTIVE"
  | "DELETE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export type ErrorCode =
  | "AUTHORIZATION_ERROR"
  | "RESOURCE_NOT_FOUND_ERROR"
  | "SERVICE_QUOTA_EXCEEDED_ERROR"
  | "INTERNAL_SERVICE_ERROR"
  | (string & {});
export interface ErrorDetails {
  code: ErrorCode;
  message: string;
}
export interface GetApplicationResponse {
  identitySource: IdentitySourceDetails;
  status: Status;
  tenantId?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
  error?: ErrorDetails;
}
export interface GetEntitlementRequest {
  applicationArn: string;
  entitlementId: string;
}
export type Account = string;
export interface PrincipalRoleEntitlementDetails {
  principal: Principal;
  roleArn: string;
  account: string;
  accountName?: string;
}
export type EntitlementDetails = {
  principalRole: PrincipalRoleEntitlementDetails;
};
export interface GetEntitlementResponse {
  applicationArn: string;
  entitlementId: string;
  entitlement: EntitlementDetails;
  createdAt: Date;
}
export interface ListApplicationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ApplicationSummary {
  applicationArn: string;
  tenantId?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type ApplicationList = ApplicationSummary[];
export interface ListApplicationsResponse {
  applications: ApplicationSummary[];
  nextToken?: string;
}
export type IdentityCenterPrincipalFilter =
  | { userId: string; groupId?: never }
  | { userId?: never; groupId: string };
export type PrincipalFilter = { identityCenter: IdentityCenterPrincipalFilter };
export interface PrincipalRoleEntitlementFilter {
  principal?: PrincipalFilter;
  roleArn?: string;
  account?: string;
}
export interface EntitlementFilter {
  principalRole?: PrincipalRoleEntitlementFilter;
}
export interface ListEntitlementsRequest {
  applicationArn: string;
  filter: EntitlementFilter;
  nextToken?: string;
  maxResults?: number;
}
export interface PrincipalRoleEntitlementSummary {
  principal: Principal;
  roleArn: string;
  account: string;
  accountName?: string;
}
export type EntitlementSummary = {
  principalRole: PrincipalRoleEntitlementSummary;
};
export interface EntitlementsListMember {
  entitlementId: string;
  entitlement: EntitlementSummary;
  createdAt: Date;
}
export type EntitlementsList = EntitlementsListMember[];
export interface ListEntitlementsResponse {
  entitlements: EntitlementsListMember[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type CreateApplicationError =
  | AccessDeniedException
  | AlreadyCreatedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an account access manager instance and its Amazon Web Services account access application in the associated IAM Identity Center instance. This operation is idempotent; calling it multiple times with the same parameters returns the existing application.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications",
    input: { identitySource: { identityCenter: { instanceArn: 0 } }, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    AlreadyCreatedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateEntitlementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an entitlement (assignment) in account access manager. An entitlement (assignment) grants a principal (IAM Identity Center user or group) permission to assume a specified IAM role in an Amazon Web Services account. This operation is idempotent.
 */
export const createEntitlement: API.OperationMethod<
  CreateEntitlementRequest,
  CreateEntitlementResponse,
  CreateEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /entitlements",
    input: {
      applicationArn: 0,
      entitlement: {
        principalRole: {
          principal: { identityCenter: { userId: 0, groupId: 0 } },
          roleArn: 0,
        },
      },
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
  operationName: "CreateEntitlement",
})) as any;

export type DeleteApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account access manager application. This operation is idempotent; deleting an application that has already been deleted does not return an error.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationArn}",
    input: { applicationArn: 0 },
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
  operationName: "DeleteApplication",
})) as any;

export type DeleteEntitlementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an entitlement from an account access manager application. This operation is idempotent; deleting an entitlement that has already been deleted does not return an error.
 */
export const deleteEntitlement: API.OperationMethod<
  DeleteEntitlementRequest,
  DeleteEntitlementResponse,
  DeleteEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /entitlements/{entitlementId}",
    input: {
      applicationArn: D.m({ query: "applicationArn" }),
      entitlementId: 0,
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
  operationName: "DeleteEntitlement",
})) as any;

export type GetApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an account access manager application, including its status, identity source, and tags.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationArn}",
    input: { applicationArn: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetApplication",
})) as any;

export type GetEntitlementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific entitlement for an account access manager application, including the principal, IAM role, and target account.
 */
export const getEntitlement: API.OperationMethod<
  GetEntitlementRequest,
  GetEntitlementResponse,
  GetEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /entitlements/{entitlementId}",
    input: {
      applicationArn: D.m({ query: "applicationArn" }),
      entitlementId: 0,
    },
    output: { createdAt: D.ts },
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
  operationName: "GetEntitlement",
})) as any;

export type ListApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the account access manager applications in your account. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications-list",
    input: { maxResults: 0, nextToken: 0 },
    output: { applications: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
  } as const,
})) as any;

export type ListEntitlementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the entitlements for a specified account access manager application. You can filter results by principal, IAM role, or account. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listEntitlements: API.PaginatedOperationMethod<
  ListEntitlementsRequest,
  ListEntitlementsResponse,
  ListEntitlementsError,
  Credentials | HttpClient.HttpClient,
  EntitlementsListMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /entitlements-list",
    input: {
      applicationArn: 0,
      filter: {
        principalRole: {
          principal: { identityCenter: { userId: 0, groupId: 0 } },
          roleArn: 0,
          account: 0,
        },
      },
      nextToken: 0,
      maxResults: 0,
    },
    output: { entitlements: D.list({ createdAt: D.ts }) },
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
  operationName: "ListEntitlements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entitlements",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with an account access manager resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to an account access manager resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from an account access manager resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;
