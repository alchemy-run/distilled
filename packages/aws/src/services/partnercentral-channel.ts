import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "PartnerCentral Channel",
  serviceShapeName: "PartnerCentralChannel",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "partnercentral-channel" });
const ver = /*@__PURE__*/ T.ServiceVersion("2024-03-18");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        { name: "sigv4", signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}` },
      ],
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
      }
      return e(
        Endpoint,
        { authSchemes: [{ name: "sigv4a", signingRegionSet: ["*"] }, { name: "sigv4" }] },
        {},
      );
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov" && UseFIPS === false) {
            return e(
              `https://partnercentral-channel.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(),
              {},
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov" && UseFIPS === true) {
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
  '{"url":"https://partnercentral-channel.global.api.aws","properties":{"authSchemes":[{"name":"sigv4a","signingRegionSet":["*"]},{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "PartnerCentralChannel",
  service: "PartnerCentralChannel",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(402), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withQuotaError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(289, __c18, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  id?: string | undefined;
  arn?: string | undefined;
  status?: HandshakeStatus | undefined;
}
export interface AcceptChannelHandshakeResponse {
  channelHandshakeDetail?: AcceptChannelHandshakeDetail | undefined;
}
export interface CancelChannelHandshakeRequest {
  catalog: string;
  identifier: string;
}
export interface CancelChannelHandshakeDetail {
  id?: string | undefined;
  arn?: string | undefined;
  status?: HandshakeStatus | undefined;
}
export interface CancelChannelHandshakeResponse {
  channelHandshakeDetail?: CancelChannelHandshakeDetail | undefined;
}
export type HandshakeType =
  | "START_SERVICE_PERIOD"
  | "REVOKE_SERVICE_PERIOD"
  | "PROGRAM_MANAGEMENT_ACCOUNT"
  | (string & {});
export type AssociatedResourceIdentifier = string;
export type ProgramManagementAccountIdentifier = string;
export type Note = string;
export type ServicePeriodType = "MINIMUM_NOTICE_PERIOD" | "FIXED_COMMITMENT_PERIOD" | (string & {});
export type MinimumNoticeDays = string;
export interface StartServicePeriodPayload {
  programManagementAccountIdentifier: string;
  note?: string | undefined;
  servicePeriodType: ServicePeriodType;
  minimumNoticeDays?: string | undefined;
  endDate?: Date | undefined;
}
export interface RevokeServicePeriodPayload {
  programManagementAccountIdentifier: string;
  note?: string | undefined;
}
export type ChannelHandshakePayload =
  | { startServicePeriodPayload: StartServicePeriodPayload; revokeServicePeriodPayload?: undefined }
  | {
      startServicePeriodPayload?: undefined;
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
  payload?: ChannelHandshakePayload | undefined;
  clientToken?: string | undefined;
  tags?: Tag[] | undefined;
}
export interface CreateChannelHandshakeDetail {
  id?: string | undefined;
  arn?: string | undefined;
}
export interface CreateChannelHandshakeResponse {
  channelHandshakeDetail?: CreateChannelHandshakeDetail | undefined;
}
export type Program = "SOLUTION_PROVIDER" | "DISTRIBUTION" | "DISTRIBUTION_SELLER" | (string & {});
export type ProgramManagementAccountDisplayName = string;
export type AccountId = string;
export interface CreateProgramManagementAccountRequest {
  catalog: string;
  program: Program;
  displayName: string;
  accountId: string;
  clientToken?: string | undefined;
  tags?: Tag[] | undefined;
}
export type ProgramManagementAccountId = string;
export interface CreateProgramManagementAccountDetail {
  id?: string | undefined;
  arn?: string | undefined;
}
export interface CreateProgramManagementAccountResponse {
  programManagementAccountDetail?: CreateProgramManagementAccountDetail | undefined;
}
export type AssociationType = "DOWNSTREAM_SELLER" | "END_CUSTOMER" | "INTERNAL" | (string & {});
export type RelationshipDisplayName = string;
export type ResaleAccountModel =
  | "DISTRIBUTOR"
  | "END_CUSTOMER"
  | "SOLUTION_PROVIDER"
  | (string & {});
export type Sector = "COMMERCIAL" | "GOVERNMENT" | "GOVERNMENT_EXCEPTION" | (string & {});
export type Coverage = "ENTIRE_ORGANIZATION" | "MANAGEMENT_ACCOUNT_ONLY" | (string & {});
export interface ResoldEnterprise {
  coverage: Coverage;
  tamLocation: string;
  chargeAccountId?: string | undefined;
}
export type Provider = "DISTRIBUTOR" | "DISTRIBUTION_SELLER" | (string & {});
export interface PartnerLedSupport {
  coverage: Coverage;
  provider?: Provider | undefined;
  tamLocation: string;
}
export interface ResoldUnifiedOperations {
  coverage: Coverage;
  tamLocation: string;
  chargeAccountId?: string | undefined;
}
export type SupportPlan =
  | {
      resoldEnterprise: ResoldEnterprise;
      partnerLedSupport?: undefined;
      resoldUnifiedOperations?: undefined;
    }
  | {
      resoldEnterprise?: undefined;
      partnerLedSupport: PartnerLedSupport;
      resoldUnifiedOperations?: undefined;
    }
  | {
      resoldEnterprise?: undefined;
      partnerLedSupport?: undefined;
      resoldUnifiedOperations: ResoldUnifiedOperations;
    };
export interface CreateRelationshipRequest {
  catalog: string;
  associationType: AssociationType;
  programManagementAccountIdentifier: string;
  associatedAccountId: string;
  displayName: string;
  resaleAccountModel?: ResaleAccountModel | undefined;
  sector: Sector;
  clientToken?: string | undefined;
  tags?: Tag[] | undefined;
  requestedSupportPlan?: SupportPlan | undefined;
}
export type RelationshipId = string;
export interface CreateRelationshipDetail {
  arn?: string | undefined;
  id?: string | undefined;
}
export interface CreateRelationshipResponse {
  relationshipDetail?: CreateRelationshipDetail | undefined;
}
export interface DeleteProgramManagementAccountRequest {
  catalog: string;
  identifier: string;
  clientToken?: string | undefined;
}
export interface DeleteProgramManagementAccountResponse {}
export type RelationshipIdentifier = string;
export interface DeleteRelationshipRequest {
  catalog: string;
  identifier: string;
  programManagementAccountIdentifier: string;
  clientToken?: string | undefined;
}
export interface DeleteRelationshipResponse {}
export interface GetRelationshipRequest {
  catalog: string;
  programManagementAccountIdentifier: string;
  identifier: string;
}
export type Revision = string;
export interface RelationshipDetail {
  arn?: string | undefined;
  id?: string | undefined;
  revision?: string | undefined;
  catalog?: string | undefined;
  associationType?: AssociationType | undefined;
  programManagementAccountId?: string | undefined;
  associatedAccountId?: string | undefined;
  displayName?: string | undefined;
  resaleAccountModel?: ResaleAccountModel | undefined;
  sector?: Sector | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  startDate?: Date | undefined;
}
export interface GetRelationshipResponse {
  relationshipDetail?: RelationshipDetail | undefined;
}
export type ParticipantType = "SENDER" | "RECEIVER" | (string & {});
export type HandshakeStatusList = HandshakeStatus[];
export type AssociatedResourceIdentifierList = string[];
export type ServicePeriodTypeList = ServicePeriodType[];
export interface StartServicePeriodTypeFilters {
  servicePeriodTypes?: ServicePeriodType[] | undefined;
}
export interface RevokeServicePeriodTypeFilters {
  servicePeriodTypes?: ServicePeriodType[] | undefined;
}
export type ProgramList = Program[];
export interface ProgramManagementAccountTypeFilters {
  programs?: Program[] | undefined;
}
export type ListChannelHandshakesTypeFilters =
  | {
      startServicePeriodTypeFilters: StartServicePeriodTypeFilters;
      revokeServicePeriodTypeFilters?: undefined;
      programManagementAccountTypeFilters?: undefined;
    }
  | {
      startServicePeriodTypeFilters?: undefined;
      revokeServicePeriodTypeFilters: RevokeServicePeriodTypeFilters;
      programManagementAccountTypeFilters?: undefined;
    }
  | {
      startServicePeriodTypeFilters?: undefined;
      revokeServicePeriodTypeFilters?: undefined;
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
      revokeServicePeriodTypeSort?: undefined;
      programManagementAccountTypeSort?: undefined;
    }
  | {
      startServicePeriodTypeSort?: undefined;
      revokeServicePeriodTypeSort: RevokeServicePeriodTypeSort;
      programManagementAccountTypeSort?: undefined;
    }
  | {
      startServicePeriodTypeSort?: undefined;
      revokeServicePeriodTypeSort?: undefined;
      programManagementAccountTypeSort: ProgramManagementAccountTypeSort;
    };
export type NextToken = string;
export interface ListChannelHandshakesRequest {
  handshakeType: HandshakeType;
  catalog: string;
  participantType: ParticipantType;
  maxResults?: number | undefined;
  statuses?: HandshakeStatus[] | undefined;
  associatedResourceIdentifiers?: string[] | undefined;
  handshakeTypeFilters?: ListChannelHandshakesTypeFilters | undefined;
  handshakeTypeSort?: ListChannelHandshakesTypeSort | undefined;
  nextToken?: string | undefined;
}
export type PartnerProfileDisplayName = string;
export type AssociatedResourceId = string;
export interface StartServicePeriodHandshakeDetail {
  note?: string | undefined;
  servicePeriodType?: ServicePeriodType | undefined;
  minimumNoticeDays?: string | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}
export interface RevokeServicePeriodHandshakeDetail {
  note?: string | undefined;
  servicePeriodType?: ServicePeriodType | undefined;
  minimumNoticeDays?: string | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}
export interface ProgramManagementAccountHandshakeDetail {
  program?: Program | undefined;
}
export type HandshakeDetail =
  | {
      startServicePeriodHandshakeDetail: StartServicePeriodHandshakeDetail;
      revokeServicePeriodHandshakeDetail?: undefined;
      programManagementAccountHandshakeDetail?: undefined;
    }
  | {
      startServicePeriodHandshakeDetail?: undefined;
      revokeServicePeriodHandshakeDetail: RevokeServicePeriodHandshakeDetail;
      programManagementAccountHandshakeDetail?: undefined;
    }
  | {
      startServicePeriodHandshakeDetail?: undefined;
      revokeServicePeriodHandshakeDetail?: undefined;
      programManagementAccountHandshakeDetail: ProgramManagementAccountHandshakeDetail;
    };
export interface ChannelHandshakeSummary {
  id?: string | undefined;
  arn?: string | undefined;
  catalog?: string | undefined;
  handshakeType?: HandshakeType | undefined;
  ownerAccountId?: string | undefined;
  senderAccountId?: string | undefined;
  senderDisplayName?: string | undefined;
  receiverAccountId?: string | undefined;
  associatedResourceId?: string | undefined;
  detail?: HandshakeDetail | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  status?: HandshakeStatus | undefined;
}
export type ChannelHandshakeSummaries = ChannelHandshakeSummary[];
export interface ListChannelHandshakesResponse {
  items?: ChannelHandshakeSummary[] | undefined;
  nextToken?: string | undefined;
}
export type ProgramManagementAccountDisplayNameList = string[];
export type AccountIdList = string[];
export type ProgramManagementAccountStatus = "PENDING" | "ACTIVE" | "INACTIVE" | (string & {});
export type ProgramManagementAccountStatusList = ProgramManagementAccountStatus[];
export type ListProgramManagementAccountsSortName = "UpdatedAt" | (string & {});
export interface ListProgramManagementAccountsSortBase {
  sortOrder: SortOrder;
  sortBy: ListProgramManagementAccountsSortName;
}
export interface ListProgramManagementAccountsRequest {
  catalog: string;
  maxResults?: number | undefined;
  displayNames?: string[] | undefined;
  programs?: Program[] | undefined;
  accountIds?: string[] | undefined;
  statuses?: ProgramManagementAccountStatus[] | undefined;
  sort?: ListProgramManagementAccountsSortBase | undefined;
  nextToken?: string | undefined;
}
export interface ProgramManagementAccountSummary {
  id?: string | undefined;
  revision?: string | undefined;
  catalog?: string | undefined;
  program?: Program | undefined;
  displayName?: string | undefined;
  accountId?: string | undefined;
  arn?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  startDate?: Date | undefined;
  status?: ProgramManagementAccountStatus | undefined;
}
export type ProgramManagementAccountSummaries = ProgramManagementAccountSummary[];
export interface ListProgramManagementAccountsResponse {
  items?: ProgramManagementAccountSummary[] | undefined;
  nextToken?: string | undefined;
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
  maxResults?: number | undefined;
  associatedAccountIds?: string[] | undefined;
  associationTypes?: AssociationType[] | undefined;
  displayNames?: string[] | undefined;
  programManagementAccountIdentifiers?: string[] | undefined;
  sort?: ListRelationshipsSortBase | undefined;
  nextToken?: string | undefined;
}
export interface RelationshipSummary {
  arn?: string | undefined;
  id?: string | undefined;
  revision?: string | undefined;
  catalog?: string | undefined;
  associationType?: AssociationType | undefined;
  programManagementAccountId?: string | undefined;
  associatedAccountId?: string | undefined;
  displayName?: string | undefined;
  sector?: Sector | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  startDate?: Date | undefined;
}
export type RelationshipSummaries = RelationshipSummary[];
export interface ListRelationshipsResponse {
  items?: RelationshipSummary[] | undefined;
  nextToken?: string | undefined;
}
export type TaggableArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[] | undefined;
}
export interface RejectChannelHandshakeRequest {
  catalog: string;
  identifier: string;
}
export interface RejectChannelHandshakeDetail {
  id?: string | undefined;
  arn?: string | undefined;
  status?: HandshakeStatus | undefined;
}
export interface RejectChannelHandshakeResponse {
  channelHandshakeDetail?: RejectChannelHandshakeDetail | undefined;
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
  revision?: string | undefined;
  displayName?: string | undefined;
}
export interface UpdateProgramManagementAccountDetail {
  id?: string | undefined;
  arn?: string | undefined;
  revision?: string | undefined;
  displayName?: string | undefined;
}
export interface UpdateProgramManagementAccountResponse {
  programManagementAccountDetail?: UpdateProgramManagementAccountDetail | undefined;
}
export interface UpdateRelationshipRequest {
  catalog: string;
  identifier: string;
  programManagementAccountIdentifier: string;
  revision?: string | undefined;
  displayName?: string | undefined;
  requestedSupportPlan?: SupportPlan | undefined;
}
export interface UpdateRelationshipDetail {
  arn?: string | undefined;
  id?: string | undefined;
  revision?: string | undefined;
  displayName?: string | undefined;
}
export interface UpdateRelationshipResponse {
  relationshipDetail?: UpdateRelationshipDetail | undefined;
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
  AcceptChannelHandshakeRequest & RegionInput,
  AcceptChannelHandshakeResponse,
  AcceptChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<AcceptChannelHandshakeRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<AcceptChannelHandshakeResponse>,
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
  telemetry: TELEMETRY,
  span: "AcceptChannelHandshake",
}));

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
  CancelChannelHandshakeRequest & RegionInput,
  CancelChannelHandshakeResponse,
  CancelChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<CancelChannelHandshakeRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<CancelChannelHandshakeResponse>,
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
  telemetry: TELEMETRY,
  span: "CancelChannelHandshake",
}));

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
  CreateChannelHandshakeRequest & RegionInput,
  CreateChannelHandshakeResponse,
  CreateChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(355, __c22, 3) as any as S.Schema<CreateChannelHandshakeRequest>,
  output: __S(356, __c22, 4) as any as S.Schema<CreateChannelHandshakeResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateChannelHandshake",
}));

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
  CreateProgramManagementAccountRequest & RegionInput,
  CreateProgramManagementAccountResponse,
  CreateProgramManagementAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateProgramManagementAccountRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateProgramManagementAccountResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateProgramManagementAccount",
}));

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
  CreateRelationshipRequest & RegionInput,
  CreateRelationshipResponse,
  CreateRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<CreateRelationshipRequest>,
  output: __S(18, __c1, 2) as any as S.Schema<CreateRelationshipResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateRelationship",
}));

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
  DeleteProgramManagementAccountRequest & RegionInput,
  DeleteProgramManagementAccountResponse,
  DeleteProgramManagementAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DeleteProgramManagementAccountRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DeleteProgramManagementAccountResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteProgramManagementAccount",
}));

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
  DeleteRelationshipRequest & RegionInput,
  DeleteRelationshipResponse,
  DeleteRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<DeleteRelationshipRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DeleteRelationshipResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteRelationship",
}));

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
  GetRelationshipRequest & RegionInput,
  GetRelationshipResponse,
  GetRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<GetRelationshipRequest>,
  output: __S(98, __c6, 2) as any as S.Schema<GetRelationshipResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRelationship",
}));

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
  ListChannelHandshakesRequest & RegionInput,
  ListChannelHandshakesResponse,
  ListChannelHandshakesError,
  Credentials | HttpClient.HttpClient,
  ChannelHandshakeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(116, __c7, 4) as any as S.Schema<ListChannelHandshakesRequest>,
  output: __S(122, __c7, 10) as any as S.Schema<ListChannelHandshakesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListChannelHandshakes",
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
  ListProgramManagementAccountsRequest & RegionInput,
  ListProgramManagementAccountsResponse,
  ListProgramManagementAccountsError,
  Credentials | HttpClient.HttpClient,
  ProgramManagementAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<ListProgramManagementAccountsRequest>,
  output: __S(163, __c10, 3) as any as S.Schema<ListProgramManagementAccountsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListProgramManagementAccounts",
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
  ListRelationshipsRequest & RegionInput,
  ListRelationshipsResponse,
  ListRelationshipsError,
  Credentials | HttpClient.HttpClient,
  RelationshipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<ListRelationshipsRequest>,
  output: __S(179, __c11, 3) as any as S.Schema<ListRelationshipsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListRelationships",
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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(193, __c12, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

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
  RejectChannelHandshakeRequest & RegionInput,
  RejectChannelHandshakeResponse,
  RejectChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<RejectChannelHandshakeRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<RejectChannelHandshakeResponse>,
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
  telemetry: TELEMETRY,
  span: "RejectChannelHandshake",
}));

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
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<TagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "TagResource",
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
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<UntagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

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
  UpdateProgramManagementAccountRequest & RegionInput,
  UpdateProgramManagementAccountResponse,
  UpdateProgramManagementAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<UpdateProgramManagementAccountRequest>,
  output: __S(258, __c16, 2) as any as S.Schema<UpdateProgramManagementAccountResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateProgramManagementAccount",
}));

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
  UpdateRelationshipRequest & RegionInput,
  UpdateRelationshipResponse,
  UpdateRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<UpdateRelationshipRequest>,
  output: __S(274, __c17, 2) as any as S.Schema<UpdateRelationshipResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateRelationship",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String,
          program: S.String,
          displayName: S.String,
          accountId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(385, __c24, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateProgramManagementAccount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProgramManagementAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ programManagementAccountDetail: S.optional(__S(368, __c23, 0)) }),
      ).annotate({ identifier: "CreateProgramManagementAccountResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String,
          associationType: S.String,
          programManagementAccountIdentifier: S.String,
          associatedAccountId: S.String,
          displayName: S.String,
          resaleAccountModel: S.optional(S.String),
          sector: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(385, __c24, 1)),
          requestedSupportPlan: S.optional(__S(34, __c2, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateRelationship" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRelationshipRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ arn: S.optional(S.String), id: S.optional(S.String) }),
      ).annotate({ identifier: "CreateRelationshipDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({ relationshipDetail: S.optional(__S(17, __c1, 1)) }),
      ).annotate({ identifier: "CreateRelationshipResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          coverage: S.String,
          tamLocation: S.String,
          chargeAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResoldEnterprise" });
    case 1:
      return S.suspend(() =>
        S.Struct({ coverage: S.String, provider: S.optional(S.String), tamLocation: S.String }),
      ).annotate({ identifier: "PartnerLedSupport" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ resoldEnterprise: __S(32, __c2, 0) }),
        /*@__PURE__*/ S.Struct({ partnerLedSupport: __S(33, __c2, 1) }),
        /*@__PURE__*/ S.Struct({ resoldUnifiedOperations: __S(32, __c2, 0) }),
      ]);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String,
          identifier: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteProgramManagementAccount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProgramManagementAccountRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteProgramManagementAccountResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String,
          identifier: S.String,
          programManagementAccountIdentifier: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteRelationship" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRelationshipRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String,
          programManagementAccountIdentifier: S.String,
          identifier: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetRelationship" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRelationshipRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          id: S.optional(S.String),
          revision: S.optional(S.String),
          catalog: S.optional(S.String),
          associationType: S.optional(S.String),
          programManagementAccountId: S.optional(S.String),
          associatedAccountId: S.optional(S.String),
          displayName: S.optional(S.String),
          resaleAccountModel: S.optional(S.String),
          sector: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          startDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "RelationshipDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({ relationshipDetail: S.optional(__S(97, __c6, 1)) }),
      ).annotate({ identifier: "GetRelationshipResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ servicePeriodTypes: S.optional(__S(128, __c8, 0)) }),
      ).annotate({ identifier: "StartServicePeriodTypeFilters" });
    case 1:
      return S.suspend(() => S.Struct({ programs: S.optional(__S(128, __c8, 0)) })).annotate({
        identifier: "ProgramManagementAccountTypeFilters",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ startServicePeriodTypeFilters: __S(112, __c7, 0) }),
        /*@__PURE__*/ S.Struct({ revokeServicePeriodTypeFilters: __S(112, __c7, 0) }),
        /*@__PURE__*/ S.Struct({ programManagementAccountTypeFilters: __S(113, __c7, 1) }),
      ]);
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ startServicePeriodTypeSort: __S(129, __c8, 1) }),
        /*@__PURE__*/ S.Struct({ revokeServicePeriodTypeSort: __S(129, __c8, 1) }),
        /*@__PURE__*/ S.Struct({ programManagementAccountTypeSort: __S(129, __c8, 1) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          handshakeType: S.String,
          catalog: S.String,
          participantType: S.String,
          maxResults: S.optional(S.Number),
          statuses: S.optional(__S(128, __c8, 0)),
          associatedResourceIdentifiers: S.optional(__S(144, __c9, 0)),
          handshakeTypeFilters: S.optional(__S(114, __c7, 2)),
          handshakeTypeSort: S.optional(__S(115, __c7, 3)),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListChannelHandshakes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelHandshakesRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          note: S.optional(S.String),
          servicePeriodType: S.optional(S.String),
          minimumNoticeDays: S.optional(S.String),
          startDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "StartServicePeriodHandshakeDetail" });
    case 6:
      return S.suspend(() => S.Struct({ program: S.optional(S.String) })).annotate({
        identifier: "ProgramManagementAccountHandshakeDetail",
      });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ startServicePeriodHandshakeDetail: __S(117, __c7, 5) }),
        /*@__PURE__*/ S.Struct({ revokeServicePeriodHandshakeDetail: __S(117, __c7, 5) }),
        /*@__PURE__*/ S.Struct({ programManagementAccountHandshakeDetail: __S(118, __c7, 6) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          catalog: S.optional(S.String),
          handshakeType: S.optional(S.String),
          ownerAccountId: S.optional(S.String),
          senderAccountId: S.optional(S.String),
          senderDisplayName: S.optional(S.String),
          receiverAccountId: S.optional(S.String),
          associatedResourceId: S.optional(S.String),
          detail: S.optional(__S(119, __c7, 7)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChannelHandshakeSummary" });
    case 9:
      return S.Array(__S(120, __c7, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(121, __c7, 9)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListChannelHandshakesResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() => S.Struct({ sortOrder: S.String, sortBy: S.String })).annotate({
        identifier: "StartServicePeriodTypeSort",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String,
          maxResults: S.optional(S.Number),
          displayNames: S.optional(__S(144, __c9, 0)),
          programs: S.optional(__S(128, __c8, 0)),
          accountIds: S.optional(__S(144, __c9, 0)),
          statuses: S.optional(__S(128, __c8, 0)),
          sort: S.optional(__S(129, __c8, 1)),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListProgramManagementAccounts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProgramManagementAccountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          revision: S.optional(S.String),
          catalog: S.optional(S.String),
          program: S.optional(S.String),
          displayName: S.optional(S.String),
          accountId: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          startDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProgramManagementAccountSummary" });
    case 2:
      return S.Array(__S(161, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(162, __c10, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProgramManagementAccountsResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String,
          maxResults: S.optional(S.Number),
          associatedAccountIds: S.optional(__S(144, __c9, 0)),
          associationTypes: S.optional(__S(128, __c8, 0)),
          displayNames: S.optional(__S(144, __c9, 0)),
          programManagementAccountIdentifiers: S.optional(__S(144, __c9, 0)),
          sort: S.optional(__S(129, __c8, 1)),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListRelationships" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRelationshipsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          id: S.optional(S.String),
          revision: S.optional(S.String),
          catalog: S.optional(S.String),
          associationType: S.optional(S.String),
          programManagementAccountId: S.optional(S.String),
          associatedAccountId: S.optional(S.String),
          displayName: S.optional(S.String),
          sector: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          startDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "RelationshipSummary" });
    case 2:
      return S.Array(__S(177, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(178, __c11, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRelationshipsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(385, __c24, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ catalog: S.String, identifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/RejectChannelHandshake" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectChannelHandshakeRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(385, __c24, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(144, __c9, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UntagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String,
          identifier: S.String,
          revision: S.optional(S.String),
          displayName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateProgramManagementAccount" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProgramManagementAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          revision: S.optional(S.String),
          displayName: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateProgramManagementAccountDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({ programManagementAccountDetail: S.optional(__S(257, __c16, 1)) }),
      ).annotate({ identifier: "UpdateProgramManagementAccountResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.String,
          identifier: S.String,
          programManagementAccountIdentifier: S.String,
          revision: S.optional(S.String),
          displayName: S.optional(S.String),
          requestedSupportPlan: S.optional(__S(34, __c2, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateRelationship" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRelationshipRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          id: S.optional(S.String),
          revision: S.optional(S.String),
          displayName: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateRelationshipDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({ relationshipDetail: S.optional(__S(273, __c17, 1)) }),
      ).annotate({ identifier: "UpdateRelationshipResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, code: S.String, message: S.String }),
      ).annotate({ identifier: "ValidationExceptionField" });
    case 1:
      return S.Array(__S(288, __c18, 0));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ catalog: S.String, identifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/AcceptChannelHandshake" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptChannelHandshakeRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AcceptChannelHandshakeDetail" });
    case 1:
      return S.suspend(() =>
        S.Struct({ channelHandshakeDetail: S.optional(__S(320, __c20, 0)) }),
      ).annotate({ identifier: "AcceptChannelHandshakeResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ catalog: S.String, identifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CancelChannelHandshake" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelChannelHandshakeRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          programManagementAccountIdentifier: S.String,
          note: S.optional(S.String),
          servicePeriodType: S.String,
          minimumNoticeDays: S.optional(S.String),
          endDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "StartServicePeriodPayload" });
    case 1:
      return S.suspend(() =>
        S.Struct({ programManagementAccountIdentifier: S.String, note: S.optional(S.String) }),
      ).annotate({ identifier: "RevokeServicePeriodPayload" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ startServicePeriodPayload: __S(352, __c22, 0) }),
        /*@__PURE__*/ S.Struct({ revokeServicePeriodPayload: __S(353, __c22, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          handshakeType: S.String,
          catalog: S.String,
          associatedResourceIdentifier: S.String,
          payload: S.optional(__S(354, __c22, 2)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(385, __c24, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateChannelHandshake" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateChannelHandshakeRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({ channelHandshakeDetail: S.optional(__S(368, __c23, 0)) }),
      ).annotate({ identifier: "CreateChannelHandshakeResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), arn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateChannelHandshakeDetail" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(384, __c24, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
