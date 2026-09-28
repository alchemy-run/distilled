import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Artifact",
  target: "Artifact",
  version: "2018-05-10",
  sigv4: "artifact",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = (_0: unknown) => ({
      authSchemes: [
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
                `https://artifact-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://artifact-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://artifact.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(PartitionResult),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://artifact.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p0(PartitionResult),
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
  })<{ readonly message: string }> {}
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
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type InquiryName = string | redacted.Redacted<string>;
export type LongStringAttribute = string;
export type ShortStringAttribute = string;
export type FileSectionList = string[];
export interface InquiryFileContent {
  fileSections?: string[];
  content: Uint8Array;
}
export type InquiryContent =
  | { query: string; fileContent?: never }
  | { query?: never; fileContent: InquiryFileContent };
export type IdempotentClientToken = string;
export type InquirySupportMode = "AI_ONLY" | "FULL_SUPPORT" | (string & {});
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export interface CreateComplianceInquiryRequest {
  name: string | redacted.Redacted<string>;
  inquiryContent: InquiryContent;
  clientToken?: string;
  supportMode?: InquirySupportMode;
  tags?: { [key: string]: string | undefined };
}
export type InquiryId = string;
export type InquiryStatus =
  | "PROCESSING"
  | "HUMAN_REVIEW"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export type InquiryStatusMessage =
  | "Compliance inquiry processing is complete."
  | "Malware was detected on the file. Provide a new file and try again."
  | "Compliance inquiry processing is in-progress."
  | "An internal error occurred while processing the inquiry. Try again at a later time."
  | "Human review is in progress."
  | "Compliance inquiry processing is complete. One or more queries encountered errors during processing."
  | (string & {});
export type InputSource = "TEXT" | "FILE" | (string & {});
export type TimestampAttribute = Date;
export interface InquirySummary {
  arn: string;
  name: string;
  id: string;
  status: InquiryStatus;
  statusMessage: InquiryStatusMessage;
  inputSource: InputSource;
  createdAt: Date;
}
export interface CreateComplianceInquiryResponse {
  complianceInquirySummary?: InquirySummary;
  tags?: { [key: string]: string | undefined };
}
export type QueryIdentifiersList = number[];
export interface ExportComplianceInquiryRequest {
  complianceInquiryId: string;
  queryIdentifiers?: number[];
  includeCitations?: boolean;
}
export type PresignedUrl = string | redacted.Redacted<string>;
export interface ExportComplianceInquiryResponse {
  documentPresignedUrl?: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
}
export interface GetAccountSettingsRequest {}
export type NotificationSubscriptionStatus =
  | "SUBSCRIBED"
  | "NOT_SUBSCRIBED"
  | (string & {});
export interface AccountSettings {
  notificationSubscriptionStatus?: NotificationSubscriptionStatus;
}
export interface GetAccountSettingsResponse {
  accountSettings?: AccountSettings;
}
export interface GetComplianceInquiryMetadataRequest {
  complianceInquiryId: string;
}
export interface InquiryDetail {
  arn: string;
  name: string;
  id: string;
  status: InquiryStatus;
  statusMessage: InquiryStatusMessage;
  inputSource: InputSource;
  createdAt: Date;
  updatedAt?: Date;
  supportMode?: InquirySupportMode;
}
export interface GetComplianceInquiryMetadataResponse {
  complianceInquiryDetail?: InquiryDetail;
  tags?: { [key: string]: string | undefined };
}
export type ReportId = string;
export type VersionAttribute = number;
export interface GetReportRequest {
  reportId: string;
  reportVersion?: number;
  termToken: string;
}
export interface GetReportResponse {
  documentPresignedUrl?: string;
}
export interface GetReportMetadataRequest {
  reportId: string;
  reportVersion?: number;
}
export type PublishedState = "PUBLISHED" | "UNPUBLISHED" | (string & {});
export type AcceptanceType = "PASSTHROUGH" | "EXPLICIT" | (string & {});
export type SequenceNumberAttribute = number;
export type UploadState =
  | "PROCESSING"
  | "COMPLETE"
  | "FAILED"
  | "FAULT"
  | (string & {});
export type StatusMessage = string;
export interface ReportDetail {
  id?: string;
  name?: string;
  description?: string;
  periodStart?: Date;
  periodEnd?: Date;
  createdAt?: Date;
  lastModifiedAt?: Date;
  deletedAt?: Date;
  state?: PublishedState;
  arn?: string;
  series?: string;
  category?: string;
  companyName?: string;
  productName?: string;
  termArn?: string;
  version?: number;
  acceptanceType?: AcceptanceType;
  sequenceNumber?: number;
  uploadState?: UploadState;
  statusMessage?: string;
}
export interface GetReportMetadataResponse {
  reportDetails?: ReportDetail;
}
export interface GetTermForReportRequest {
  reportId: string;
  reportVersion?: number;
}
export interface GetTermForReportResponse {
  documentPresignedUrl?: string;
  termToken?: string;
}
export type MaxResultsAttribute = number;
export type NextTokenAttribute = string;
export interface ListComplianceInquiriesRequest {
  maxResults?: number;
  nextToken?: string;
}
export type InquiriesList = InquirySummary[];
export interface ListComplianceInquiriesResponse {
  complianceInquiries?: InquirySummary[];
  nextToken?: string;
}
export interface ListComplianceInquiryQueriesRequest {
  complianceInquiryId: string;
  maxResults?: number;
  nextToken?: string;
}
export type ReviewType = "HUMAN" | "AI" | (string & {});
export interface Citation {
  sourceLabel?: string;
  sourceContent?: string;
  sourceLink?: string;
}
export type CitationList = Citation[];
export type QueryStatus = "PROCESSING" | "COMPLETED" | "FAILED" | (string & {});
export type QueryStatusMessage =
  | "Query processing is complete."
  | "Query processing is in-progress."
  | "An internal error occurred while processing the query. Try again at a later time."
  | "Query is pending human review."
  | "Query contains restricted or unsupported content."
  | (string & {});
export interface ResponseVersion {
  responseText: string;
  timestamp: Date;
}
export type ResponseVersionList = ResponseVersion[];
export interface QuerySummary {
  queryIdentifier: number;
  query: string;
  response?: string;
  reviewType?: ReviewType;
  citations?: Citation[];
  status: QueryStatus;
  statusMessage: QueryStatusMessage;
  createdAt: Date;
  updatedResponseVersions?: ResponseVersion[];
}
export type QueriesList = QuerySummary[];
export interface ListComplianceInquiryQueriesResponse {
  queries?: QuerySummary[];
  nextToken?: string;
}
export interface ListCustomerAgreementsRequest {
  maxResults?: number;
  nextToken?: string;
}
export type CustomerAgreementIdAttribute = string;
export type CustomerAgreementState =
  | "ACTIVE"
  | "CUSTOMER_TERMINATED"
  | "AWS_TERMINATED"
  | (string & {});
export type AgreementTerms = string[];
export type AgreementType = "CUSTOM" | "DEFAULT" | "MODIFIED" | (string & {});
export interface CustomerAgreementSummary {
  name?: string;
  arn?: string;
  id?: string;
  agreementArn?: string;
  awsAccountId?: string;
  organizationArn?: string;
  effectiveStart?: Date;
  effectiveEnd?: Date;
  state?: CustomerAgreementState;
  description?: string;
  acceptanceTerms?: string[];
  terminateTerms?: string[];
  type?: AgreementType;
}
export type CustomerAgreementList = CustomerAgreementSummary[];
export interface ListCustomerAgreementsResponse {
  customerAgreements: CustomerAgreementSummary[];
  nextToken?: string;
}
export interface ListReportsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ReportSummary {
  id?: string;
  name?: string;
  state?: PublishedState;
  arn?: string;
  version?: number;
  uploadState?: UploadState;
  description?: string;
  periodStart?: Date;
  periodEnd?: Date;
  series?: string;
  category?: string;
  companyName?: string;
  productName?: string;
  statusMessage?: string;
  acceptanceType?: AcceptanceType;
}
export type ReportsList = ReportSummary[];
export interface ListReportsResponse {
  reports?: ReportSummary[];
  nextToken?: string;
}
export interface ListReportVersionsRequest {
  reportId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListReportVersionsResponse {
  reports: ReportSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PutAccountSettingsRequest {
  notificationSubscriptionStatus?: NotificationSubscriptionStatus;
}
export interface PutAccountSettingsResponse {
  accountSettings?: AccountSettings;
}
export type FeedbackRating = "THUMBS_UP" | "THUMBS_DOWN" | (string & {});
export type FeedbackReasonCode =
  | "OTHER"
  | "PARTIAL_RESPONSE"
  | "IRRELEVANT_RESPONSE"
  | (string & {});
export type FeedbackReasonCodeList = FeedbackReasonCode[];
export type FeedbackCommentAttribute = string | redacted.Redacted<string>;
export interface PutComplianceInquiryFeedbackRequest {
  complianceInquiryId: string;
  queryIdentifier?: number;
  rating: FeedbackRating;
  responseRevisionId?: number;
  reasonCodes?: FeedbackReasonCode[];
  comment?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export interface PutComplianceInquiryFeedbackResponse {
  submittedAt: Date;
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
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateComplianceInquiryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new compliance inquiry.
 */
export const createComplianceInquiry: API.OperationMethod<
  CreateComplianceInquiryRequest,
  CreateComplianceInquiryResponse,
  CreateComplianceInquiryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/compliance-inquiry/create",
    input: {
      name: 0,
      inquiryContent: {
        query: 0,
        fileContent: { fileSections: 0, content: 0 },
      },
      clientToken: D.m({ idempotency: true }),
      supportMode: 0,
      tags: 0,
    },
    output: { complianceInquirySummary: o_InquirySummary },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComplianceInquiry",
})) as any;

export type ExportComplianceInquiryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Export a compliance inquiry report.
 */
export const exportComplianceInquiry: API.OperationMethod<
  ExportComplianceInquiryRequest,
  ExportComplianceInquiryResponse,
  ExportComplianceInquiryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/compliance-inquiry/export",
    input: { complianceInquiryId: 0, queryIdentifiers: 0, includeCitations: 0 },
    output: { documentPresignedUrl: D.secret },
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
  operationName: "ExportComplianceInquiry",
})) as any;

export type GetAccountSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the account settings for Artifact.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsResponse,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /v1/account-settings/get", input: {} },
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
  operationName: "GetAccountSettings",
})) as any;

export type GetComplianceInquiryMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the metadata for a single compliance inquiry.
 */
export const getComplianceInquiryMetadata: API.OperationMethod<
  GetComplianceInquiryMetadataRequest,
  GetComplianceInquiryMetadataResponse,
  GetComplianceInquiryMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/compliance-inquiry/getMetadata",
    input: { complianceInquiryId: D.m({ query: "complianceInquiryId" }) },
    output: { complianceInquiryDetail: { createdAt: D.ts, updatedAt: D.ts } },
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
  operationName: "GetComplianceInquiryMetadata",
})) as any;

export type GetReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the content for a single report.
 */
export const getReport: API.OperationMethod<
  GetReportRequest,
  GetReportResponse,
  GetReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/report/get",
    input: {
      reportId: D.m({ query: "reportId" }),
      reportVersion: D.m({ query: "reportVersion" }),
      termToken: D.m({ query: "termToken" }),
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
  operationName: "GetReport",
})) as any;

export type GetReportMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the metadata for a single report.
 */
export const getReportMetadata: API.OperationMethod<
  GetReportMetadataRequest,
  GetReportMetadataResponse,
  GetReportMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/report/getMetadata",
    input: {
      reportId: D.m({ query: "reportId" }),
      reportVersion: D.m({ query: "reportVersion" }),
    },
    output: {
      reportDetails: {
        periodStart: D.ts,
        periodEnd: D.ts,
        createdAt: D.ts,
        lastModifiedAt: D.ts,
        deletedAt: D.ts,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReportMetadata",
})) as any;

export type GetTermForReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the Term content associated with a single report.
 */
export const getTermForReport: API.OperationMethod<
  GetTermForReportRequest,
  GetTermForReportResponse,
  GetTermForReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/report/getTermForReport",
    input: {
      reportId: D.m({ query: "reportId" }),
      reportVersion: D.m({ query: "reportVersion" }),
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
  operationName: "GetTermForReport",
})) as any;

export type ListComplianceInquiriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List available compliance inquiries.
 */
export const listComplianceInquiries: API.PaginatedOperationMethod<
  ListComplianceInquiriesRequest,
  ListComplianceInquiriesResponse,
  ListComplianceInquiriesError,
  Credentials | HttpClient.HttpClient,
  InquirySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/compliance-inquiry/list",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { complianceInquiries: D.list(o_InquirySummary) },
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
  operationName: "ListComplianceInquiries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "complianceInquiries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComplianceInquiryQueriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List queries within a compliance inquiry.
 */
export const listComplianceInquiryQueries: API.PaginatedOperationMethod<
  ListComplianceInquiryQueriesRequest,
  ListComplianceInquiryQueriesResponse,
  ListComplianceInquiryQueriesError,
  Credentials | HttpClient.HttpClient,
  QuerySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/compliance-inquiry/listQueries",
    input: {
      complianceInquiryId: D.m({ query: "complianceInquiryId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      queries: D.list({
        createdAt: D.ts,
        updatedResponseVersions: D.list({ timestamp: D.ts }),
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
  operationName: "ListComplianceInquiryQueries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "queries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCustomerAgreementsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List active customer-agreements applicable to calling identity.
 */
export const listCustomerAgreements: API.PaginatedOperationMethod<
  ListCustomerAgreementsRequest,
  ListCustomerAgreementsResponse,
  ListCustomerAgreementsError,
  Credentials | HttpClient.HttpClient,
  CustomerAgreementSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/customer-agreement/list",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      customerAgreements: D.list({ effectiveStart: D.ts, effectiveEnd: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomerAgreements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "customerAgreements",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReportsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List available reports.
 */
export const listReports: API.PaginatedOperationMethod<
  ListReportsRequest,
  ListReportsResponse,
  ListReportsError,
  Credentials | HttpClient.HttpClient,
  ReportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/report/list",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { reports: D.list(o_ReportSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reports",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReportVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List available report versions for a given report.
 */
export const listReportVersions: API.PaginatedOperationMethod<
  ListReportVersionsRequest,
  ListReportVersionsResponse,
  ListReportVersionsError,
  Credentials | HttpClient.HttpClient,
  ReportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/report/listVersions",
    input: {
      reportId: D.m({ query: "reportId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { reports: D.list(o_ReportSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReportVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reports",
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
 * List tags for a resource.
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

export type PutAccountSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Put the account settings for Artifact.
 */
export const putAccountSettings: API.OperationMethod<
  PutAccountSettingsRequest,
  PutAccountSettingsResponse,
  PutAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/account-settings/put",
    input: { notificationSubscriptionStatus: 0 },
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
  operationName: "PutAccountSettings",
})) as any;

export type PutComplianceInquiryFeedbackError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits feedback on a compliance inquiry response.
 */
export const putComplianceInquiryFeedback: API.OperationMethod<
  PutComplianceInquiryFeedbackRequest,
  PutComplianceInquiryFeedbackResponse,
  PutComplianceInquiryFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/compliance-inquiry/putFeedback",
    input: {
      complianceInquiryId: 0,
      queryIdentifier: 0,
      rating: 0,
      responseRevisionId: 0,
      reasonCodes: 0,
      comment: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { submittedAt: D.ts },
    body: true,
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
  operationName: "PutComplianceInquiryFeedback",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add tags to a resource.
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
    AccessDeniedException,
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove tags from a resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const o_InquirySummary: D.LazyStruct = () => ({ createdAt: D.ts });
const o_ReportSummary: D.LazyStruct = () => ({
  periodStart: D.ts,
  periodEnd: D.ts,
});
