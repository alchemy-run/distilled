import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "PartnerCentral Channel",
  target: "PartnerCentralChannel",
  version: "2024-03-18",
  sigv4: "partnercentral-channel",
  protocol: awsJson1_0Protocol,
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
    const _p0 = () => ({
      authSchemes: [
        { name: "sigv4a", signingRegionSet: ["*"] },
        { name: "sigv4", signingRegion: "us-gov-west-1" },
      ],
    });
    const _p1 = (_0: unknown) => ({
      authSchemes: [
        { name: "sigv4a", signingRegionSet: ["*"] },
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
      return e(
        Endpoint,
        {
          authSchemes: [
            { name: "sigv4a", signingRegionSet: ["*"] },
            { name: "sigv4" },
          ],
        },
        {},
      );
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false
          ) {
            return e(
              `https://partnercentral-channel.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true
          ) {
            return e(
              `https://partnercentral-channel-fips.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(),
              {},
            );
          }
          if (UseFIPS === true) {
            return e(
              `https://partnercentral-channel-fips.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p1(PartitionResult),
              {},
            );
          }
          return e(
            `https://partnercentral-channel.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p1(PartitionResult),
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
  })<{ readonly message: string; readonly reason?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError", "RetryableError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type Catalog = string;
export type ChannelHandshakeIdentifier = string;
export interface AcceptChannelHandshakeRequest {
  catalog: string;
  identifier: string;
}
export type ChannelHandshakeId = string;
export type Arn = string;
export type HandshakeStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELED"
  | "EXPIRED"
  | (string & {});
export interface AcceptChannelHandshakeDetail {
  id?: string;
  arn?: string;
  status?: HandshakeStatus;
}
export interface AcceptChannelHandshakeResponse {
  channelHandshakeDetail?: AcceptChannelHandshakeDetail;
}
export interface CancelChannelHandshakeRequest {
  catalog: string;
  identifier: string;
}
export interface CancelChannelHandshakeDetail {
  id?: string;
  arn?: string;
  status?: HandshakeStatus;
}
export interface CancelChannelHandshakeResponse {
  channelHandshakeDetail?: CancelChannelHandshakeDetail;
}
export type HandshakeType =
  | "START_SERVICE_PERIOD"
  | "REVOKE_SERVICE_PERIOD"
  | "PROGRAM_MANAGEMENT_ACCOUNT"
  | (string & {});
export type AssociatedResourceIdentifier = string;
export type ProgramManagementAccountIdentifier = string;
export type Note = string;
export type ServicePeriodType =
  | "MINIMUM_NOTICE_PERIOD"
  | "FIXED_COMMITMENT_PERIOD"
  | (string & {});
export type MinimumNoticeDays = string;
export interface StartServicePeriodPayload {
  programManagementAccountIdentifier: string;
  note?: string;
  servicePeriodType: ServicePeriodType;
  minimumNoticeDays?: string;
  endDate?: Date;
}
export interface RevokeServicePeriodPayload {
  programManagementAccountIdentifier: string;
  note?: string;
}
export type ChannelHandshakePayload =
  | {
      startServicePeriodPayload: StartServicePeriodPayload;
      revokeServicePeriodPayload?: never;
    }
  | {
      startServicePeriodPayload?: never;
      revokeServicePeriodPayload: RevokeServicePeriodPayload;
    };
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface CreateChannelHandshakeRequest {
  handshakeType: HandshakeType;
  catalog: string;
  associatedResourceIdentifier: string;
  payload?: ChannelHandshakePayload;
  clientToken?: string;
  tags?: Tag[];
}
export interface CreateChannelHandshakeDetail {
  id?: string;
  arn?: string;
}
export interface CreateChannelHandshakeResponse {
  channelHandshakeDetail?: CreateChannelHandshakeDetail;
}
export type Program =
  | "SOLUTION_PROVIDER"
  | "DISTRIBUTION"
  | "DISTRIBUTION_SELLER"
  | (string & {});
export type ProgramManagementAccountDisplayName = string;
export type AccountId = string;
export interface CreateProgramManagementAccountRequest {
  catalog: string;
  program: Program;
  displayName: string;
  accountId: string;
  clientToken?: string;
  tags?: Tag[];
}
export type ProgramManagementAccountId = string;
export interface CreateProgramManagementAccountDetail {
  id?: string;
  arn?: string;
}
export interface CreateProgramManagementAccountResponse {
  programManagementAccountDetail?: CreateProgramManagementAccountDetail;
}
export type AssociationType =
  | "DOWNSTREAM_SELLER"
  | "END_CUSTOMER"
  | "INTERNAL"
  | (string & {});
export type RelationshipDisplayName = string;
export type ResaleAccountModel =
  | "DISTRIBUTOR"
  | "END_CUSTOMER"
  | "SOLUTION_PROVIDER"
  | (string & {});
export type Sector =
  | "COMMERCIAL"
  | "GOVERNMENT"
  | "GOVERNMENT_EXCEPTION"
  | (string & {});
export type Coverage =
  | "ENTIRE_ORGANIZATION"
  | "MANAGEMENT_ACCOUNT_ONLY"
  | (string & {});
export interface ResoldEnterprise {
  coverage: Coverage;
  tamLocation: string;
  chargeAccountId?: string;
}
export type Provider = "DISTRIBUTOR" | "DISTRIBUTION_SELLER" | (string & {});
export interface PartnerLedSupport {
  coverage: Coverage;
  provider?: Provider;
  tamLocation: string;
}
export interface ResoldUnifiedOperations {
  coverage: Coverage;
  tamLocation: string;
  chargeAccountId?: string;
}
export type SupportPlan =
  | {
      resoldEnterprise: ResoldEnterprise;
      partnerLedSupport?: never;
      resoldUnifiedOperations?: never;
    }
  | {
      resoldEnterprise?: never;
      partnerLedSupport: PartnerLedSupport;
      resoldUnifiedOperations?: never;
    }
  | {
      resoldEnterprise?: never;
      partnerLedSupport?: never;
      resoldUnifiedOperations: ResoldUnifiedOperations;
    };
export interface CreateRelationshipRequest {
  catalog: string;
  associationType: AssociationType;
  programManagementAccountIdentifier: string;
  associatedAccountId: string;
  displayName: string;
  resaleAccountModel?: ResaleAccountModel;
  sector: Sector;
  clientToken?: string;
  tags?: Tag[];
  requestedSupportPlan?: SupportPlan;
}
export type RelationshipId = string;
export interface CreateRelationshipDetail {
  arn?: string;
  id?: string;
}
export interface CreateRelationshipResponse {
  relationshipDetail?: CreateRelationshipDetail;
}
export interface DeleteProgramManagementAccountRequest {
  catalog: string;
  identifier: string;
  clientToken?: string;
}
export interface DeleteProgramManagementAccountResponse {}
export type RelationshipIdentifier = string;
export interface DeleteRelationshipRequest {
  catalog: string;
  identifier: string;
  programManagementAccountIdentifier: string;
  clientToken?: string;
}
export interface DeleteRelationshipResponse {}
export interface GetRelationshipRequest {
  catalog: string;
  programManagementAccountIdentifier: string;
  identifier: string;
}
export type Revision = string;
export interface RelationshipDetail {
  arn?: string;
  id?: string;
  revision?: string;
  catalog?: string;
  associationType?: AssociationType;
  programManagementAccountId?: string;
  associatedAccountId?: string;
  displayName?: string;
  resaleAccountModel?: ResaleAccountModel;
  sector?: Sector;
  createdAt?: Date;
  updatedAt?: Date;
  startDate?: Date;
}
export interface GetRelationshipResponse {
  relationshipDetail?: RelationshipDetail;
}
export type ParticipantType = "SENDER" | "RECEIVER" | (string & {});
export type HandshakeStatusList = HandshakeStatus[];
export type AssociatedResourceIdentifierList = string[];
export type ServicePeriodTypeList = ServicePeriodType[];
export interface StartServicePeriodTypeFilters {
  servicePeriodTypes?: ServicePeriodType[];
}
export interface RevokeServicePeriodTypeFilters {
  servicePeriodTypes?: ServicePeriodType[];
}
export type ProgramList = Program[];
export interface ProgramManagementAccountTypeFilters {
  programs?: Program[];
}
export type ListChannelHandshakesTypeFilters =
  | {
      startServicePeriodTypeFilters: StartServicePeriodTypeFilters;
      revokeServicePeriodTypeFilters?: never;
      programManagementAccountTypeFilters?: never;
    }
  | {
      startServicePeriodTypeFilters?: never;
      revokeServicePeriodTypeFilters: RevokeServicePeriodTypeFilters;
      programManagementAccountTypeFilters?: never;
    }
  | {
      startServicePeriodTypeFilters?: never;
      revokeServicePeriodTypeFilters?: never;
      programManagementAccountTypeFilters: ProgramManagementAccountTypeFilters;
    };
export type SortOrder = "Ascending" | "Descending" | (string & {});
export type StartServicePeriodTypeSortName = "UpdatedAt" | (string & {});
export interface StartServicePeriodTypeSort {
  sortOrder: SortOrder;
  sortBy: StartServicePeriodTypeSortName;
}
export type RevokeServicePeriodTypeSortName = "UpdatedAt" | (string & {});
export interface RevokeServicePeriodTypeSort {
  sortOrder: SortOrder;
  sortBy: RevokeServicePeriodTypeSortName;
}
export type ProgramManagementAccountTypeSortName = "UpdatedAt" | (string & {});
export interface ProgramManagementAccountTypeSort {
  sortOrder: SortOrder;
  sortBy: ProgramManagementAccountTypeSortName;
}
export type ListChannelHandshakesTypeSort =
  | {
      startServicePeriodTypeSort: StartServicePeriodTypeSort;
      revokeServicePeriodTypeSort?: never;
      programManagementAccountTypeSort?: never;
    }
  | {
      startServicePeriodTypeSort?: never;
      revokeServicePeriodTypeSort: RevokeServicePeriodTypeSort;
      programManagementAccountTypeSort?: never;
    }
  | {
      startServicePeriodTypeSort?: never;
      revokeServicePeriodTypeSort?: never;
      programManagementAccountTypeSort: ProgramManagementAccountTypeSort;
    };
export type NextToken = string;
export interface ListChannelHandshakesRequest {
  handshakeType: HandshakeType;
  catalog: string;
  participantType: ParticipantType;
  maxResults?: number;
  statuses?: HandshakeStatus[];
  associatedResourceIdentifiers?: string[];
  handshakeTypeFilters?: ListChannelHandshakesTypeFilters;
  handshakeTypeSort?: ListChannelHandshakesTypeSort;
  nextToken?: string;
}
export type PartnerProfileDisplayName = string;
export type AssociatedResourceId = string;
export interface StartServicePeriodHandshakeDetail {
  note?: string;
  servicePeriodType?: ServicePeriodType;
  minimumNoticeDays?: string;
  startDate?: Date;
  endDate?: Date;
}
export interface RevokeServicePeriodHandshakeDetail {
  note?: string;
  servicePeriodType?: ServicePeriodType;
  minimumNoticeDays?: string;
  startDate?: Date;
  endDate?: Date;
}
export interface ProgramManagementAccountHandshakeDetail {
  program?: Program;
}
export type HandshakeDetail =
  | {
      startServicePeriodHandshakeDetail: StartServicePeriodHandshakeDetail;
      revokeServicePeriodHandshakeDetail?: never;
      programManagementAccountHandshakeDetail?: never;
    }
  | {
      startServicePeriodHandshakeDetail?: never;
      revokeServicePeriodHandshakeDetail: RevokeServicePeriodHandshakeDetail;
      programManagementAccountHandshakeDetail?: never;
    }
  | {
      startServicePeriodHandshakeDetail?: never;
      revokeServicePeriodHandshakeDetail?: never;
      programManagementAccountHandshakeDetail: ProgramManagementAccountHandshakeDetail;
    };
export interface ChannelHandshakeSummary {
  id?: string;
  arn?: string;
  catalog?: string;
  handshakeType?: HandshakeType;
  ownerAccountId?: string;
  senderAccountId?: string;
  senderDisplayName?: string;
  receiverAccountId?: string;
  associatedResourceId?: string;
  detail?: HandshakeDetail;
  createdAt?: Date;
  updatedAt?: Date;
  status?: HandshakeStatus;
}
export type ChannelHandshakeSummaries = ChannelHandshakeSummary[];
export interface ListChannelHandshakesResponse {
  items?: ChannelHandshakeSummary[];
  nextToken?: string;
}
export type ProgramManagementAccountDisplayNameList = string[];
export type AccountIdList = string[];
export type ProgramManagementAccountStatus =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export type ProgramManagementAccountStatusList =
  ProgramManagementAccountStatus[];
export type ListProgramManagementAccountsSortName = "UpdatedAt" | (string & {});
export interface ListProgramManagementAccountsSortBase {
  sortOrder: SortOrder;
  sortBy: ListProgramManagementAccountsSortName;
}
export interface ListProgramManagementAccountsRequest {
  catalog: string;
  maxResults?: number;
  displayNames?: string[];
  programs?: Program[];
  accountIds?: string[];
  statuses?: ProgramManagementAccountStatus[];
  sort?: ListProgramManagementAccountsSortBase;
  nextToken?: string;
}
export interface ProgramManagementAccountSummary {
  id?: string;
  revision?: string;
  catalog?: string;
  program?: Program;
  displayName?: string;
  accountId?: string;
  arn?: string;
  createdAt?: Date;
  updatedAt?: Date;
  startDate?: Date;
  status?: ProgramManagementAccountStatus;
}
export type ProgramManagementAccountSummaries =
  ProgramManagementAccountSummary[];
export interface ListProgramManagementAccountsResponse {
  items?: ProgramManagementAccountSummary[];
  nextToken?: string;
}
export type AssociationTypeList = AssociationType[];
export type RelationshipDisplayNameList = string[];
export type ProgramManagementAccountIdentifierList = string[];
export type ListRelationshipsSortName = "UpdatedAt" | (string & {});
export interface ListRelationshipsSortBase {
  sortOrder: SortOrder;
  sortBy: ListRelationshipsSortName;
}
export interface ListRelationshipsRequest {
  catalog: string;
  maxResults?: number;
  associatedAccountIds?: string[];
  associationTypes?: AssociationType[];
  displayNames?: string[];
  programManagementAccountIdentifiers?: string[];
  sort?: ListRelationshipsSortBase;
  nextToken?: string;
}
export interface RelationshipSummary {
  arn?: string;
  id?: string;
  revision?: string;
  catalog?: string;
  associationType?: AssociationType;
  programManagementAccountId?: string;
  associatedAccountId?: string;
  displayName?: string;
  sector?: Sector;
  createdAt?: Date;
  updatedAt?: Date;
  startDate?: Date;
}
export type RelationshipSummaries = RelationshipSummary[];
export interface ListRelationshipsResponse {
  items?: RelationshipSummary[];
  nextToken?: string;
}
export type TaggableArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface RejectChannelHandshakeRequest {
  catalog: string;
  identifier: string;
}
export interface RejectChannelHandshakeDetail {
  id?: string;
  arn?: string;
  status?: HandshakeStatus;
}
export interface RejectChannelHandshakeResponse {
  channelHandshakeDetail?: RejectChannelHandshakeDetail;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateProgramManagementAccountRequest {
  catalog: string;
  identifier: string;
  revision?: string;
  displayName?: string;
}
export interface UpdateProgramManagementAccountDetail {
  id?: string;
  arn?: string;
  revision?: string;
  displayName?: string;
}
export interface UpdateProgramManagementAccountResponse {
  programManagementAccountDetail?: UpdateProgramManagementAccountDetail;
}
export interface UpdateRelationshipRequest {
  catalog: string;
  identifier: string;
  programManagementAccountIdentifier: string;
  revision?: string;
  displayName?: string;
  requestedSupportPlan?: SupportPlan;
}
export interface UpdateRelationshipDetail {
  arn?: string;
  id?: string;
  revision?: string;
  displayName?: string;
}
export interface UpdateRelationshipResponse {
  relationshipDetail?: UpdateRelationshipDetail;
}
export type ValidationExceptionReason =
  | "REQUEST_VALIDATION_FAILED"
  | "BUSINESS_VALIDATION_FAILED"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  code: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AcceptChannelHandshakeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts a pending channel handshake request from another AWS account.
 */
export const acceptChannelHandshake: API.OperationMethod<
  AcceptChannelHandshakeRequest,
  AcceptChannelHandshakeResponse,
  AcceptChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { catalog: 0, identifier: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptChannelHandshake",
})) as any;

export type CancelChannelHandshakeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a pending channel handshake request.
 */
export const cancelChannelHandshake: API.OperationMethod<
  CancelChannelHandshakeRequest,
  CancelChannelHandshakeResponse,
  CancelChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { catalog: 0, identifier: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelChannelHandshake",
})) as any;

export type CreateChannelHandshakeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new channel handshake request to establish a partnership with another AWS account.
 */
export const createChannelHandshake: API.OperationMethod<
  CreateChannelHandshakeRequest,
  CreateChannelHandshakeResponse,
  CreateChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      handshakeType: 0,
      catalog: 0,
      associatedResourceIdentifier: 0,
      payload: {
        startServicePeriodPayload: {
          programManagementAccountIdentifier: 0,
          note: 0,
          servicePeriodType: 0,
          minimumNoticeDays: 0,
          endDate: D.tsAs("date-time"),
        },
        revokeServicePeriodPayload: {
          programManagementAccountIdentifier: 0,
          note: 0,
        },
      },
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
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
  operationName: "CreateChannelHandshake",
})) as any;

export type CreateProgramManagementAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new program management account for managing partner relationships.
 */
export const createProgramManagementAccount: API.OperationMethod<
  CreateProgramManagementAccountRequest,
  CreateProgramManagementAccountResponse,
  CreateProgramManagementAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      catalog: 0,
      program: 0,
      displayName: 0,
      accountId: 0,
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
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
  operationName: "CreateProgramManagementAccount",
})) as any;

export type CreateRelationshipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new partner relationship between accounts.
 */
export const createRelationship: API.OperationMethod<
  CreateRelationshipRequest,
  CreateRelationshipResponse,
  CreateRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      catalog: 0,
      associationType: 0,
      programManagementAccountIdentifier: 0,
      associatedAccountId: 0,
      displayName: 0,
      resaleAccountModel: 0,
      sector: 0,
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
      requestedSupportPlan: i_SupportPlan,
    },
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
  operationName: "CreateRelationship",
})) as any;

export type DeleteProgramManagementAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a program management account.
 */
export const deleteProgramManagementAccount: API.OperationMethod<
  DeleteProgramManagementAccountRequest,
  DeleteProgramManagementAccountResponse,
  DeleteProgramManagementAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      catalog: 0,
      identifier: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "DeleteProgramManagementAccount",
})) as any;

export type DeleteRelationshipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a partner relationship.
 */
export const deleteRelationship: API.OperationMethod<
  DeleteRelationshipRequest,
  DeleteRelationshipResponse,
  DeleteRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      catalog: 0,
      identifier: 0,
      programManagementAccountIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "DeleteRelationship",
})) as any;

export type GetRelationshipError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of a specific partner relationship.
 */
export const getRelationship: API.OperationMethod<
  GetRelationshipRequest,
  GetRelationshipResponse,
  GetRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { catalog: 0, programManagementAccountIdentifier: 0, identifier: 0 },
    output: {
      relationshipDetail: { createdAt: D.ts, updatedAt: D.ts, startDate: D.ts },
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
  operationName: "GetRelationship",
})) as any;

export type ListChannelHandshakesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists channel handshakes based on specified criteria.
 */
export const listChannelHandshakes: API.PaginatedOperationMethod<
  ListChannelHandshakesRequest,
  ListChannelHandshakesResponse,
  ListChannelHandshakesError,
  Credentials | HttpClient.HttpClient,
  ChannelHandshakeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      handshakeType: 0,
      catalog: 0,
      participantType: 0,
      maxResults: 0,
      statuses: 0,
      associatedResourceIdentifiers: 0,
      handshakeTypeFilters: {
        startServicePeriodTypeFilters: { servicePeriodTypes: 0 },
        revokeServicePeriodTypeFilters: { servicePeriodTypes: 0 },
        programManagementAccountTypeFilters: { programs: 0 },
      },
      handshakeTypeSort: {
        startServicePeriodTypeSort: { sortOrder: 0, sortBy: 0 },
        revokeServicePeriodTypeSort: { sortOrder: 0, sortBy: 0 },
        programManagementAccountTypeSort: { sortOrder: 0, sortBy: 0 },
      },
      nextToken: 0,
    },
    output: {
      items: D.list({
        detail: {
          startServicePeriodHandshakeDetail: { startDate: D.ts, endDate: D.ts },
          revokeServicePeriodHandshakeDetail: {
            startDate: D.ts,
            endDate: D.ts,
          },
        },
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
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
  operationName: "ListChannelHandshakes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProgramManagementAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists program management accounts based on specified criteria.
 */
export const listProgramManagementAccounts: API.PaginatedOperationMethod<
  ListProgramManagementAccountsRequest,
  ListProgramManagementAccountsResponse,
  ListProgramManagementAccountsError,
  Credentials | HttpClient.HttpClient,
  ProgramManagementAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      catalog: 0,
      maxResults: 0,
      displayNames: 0,
      programs: 0,
      accountIds: 0,
      statuses: 0,
      sort: { sortOrder: 0, sortBy: 0 },
      nextToken: 0,
    },
    output: {
      items: D.list({ createdAt: D.ts, updatedAt: D.ts, startDate: D.ts }),
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
  operationName: "ListProgramManagementAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRelationshipsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists partner relationships based on specified criteria.
 */
export const listRelationships: API.PaginatedOperationMethod<
  ListRelationshipsRequest,
  ListRelationshipsResponse,
  ListRelationshipsError,
  Credentials | HttpClient.HttpClient,
  RelationshipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      catalog: 0,
      maxResults: 0,
      associatedAccountIds: 0,
      associationTypes: 0,
      displayNames: 0,
      programManagementAccountIdentifiers: 0,
      sort: { sortOrder: 0, sortBy: 0 },
      nextToken: 0,
    },
    output: {
      items: D.list({ createdAt: D.ts, updatedAt: D.ts, startDate: D.ts }),
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
  operationName: "ListRelationships",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
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
 * Lists tags associated with a specific resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0 } },
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

export type RejectChannelHandshakeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects a pending channel handshake request.
 */
export const rejectChannelHandshake: API.OperationMethod<
  RejectChannelHandshakeRequest,
  RejectChannelHandshakeResponse,
  RejectChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { catalog: 0, identifier: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectChannelHandshake",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for a specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
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
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
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

export type UpdateProgramManagementAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of a program management account.
 */
export const updateProgramManagementAccount: API.OperationMethod<
  UpdateProgramManagementAccountRequest,
  UpdateProgramManagementAccountResponse,
  UpdateProgramManagementAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { catalog: 0, identifier: 0, revision: 0, displayName: 0 },
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
  operationName: "UpdateProgramManagementAccount",
})) as any;

export type UpdateRelationshipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of a partner relationship.
 */
export const updateRelationship: API.OperationMethod<
  UpdateRelationshipRequest,
  UpdateRelationshipResponse,
  UpdateRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      catalog: 0,
      identifier: 0,
      programManagementAccountIdentifier: 0,
      revision: 0,
      displayName: 0,
      requestedSupportPlan: i_SupportPlan,
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
  operationName: "UpdateRelationship",
})) as any;

const i_SupportPlan: D.LazyStruct = () => ({
  resoldEnterprise: { coverage: 0, tamLocation: 0, chargeAccountId: 0 },
  partnerLedSupport: { coverage: 0, provider: 0, tamLocation: 0 },
  resoldUnifiedOperations: { coverage: 0, tamLocation: 0, chargeAccountId: 0 },
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
