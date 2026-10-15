import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Artifact", serviceShapeName: "Artifact" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "artifact" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
      authSchemes: [{ name: "sigv4", signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}` }],
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://artifact.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(PartitionResult),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
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
  '{"url":"https://artifact.us-east-1.{D}","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
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

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
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
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
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
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
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
      reason: S.String,
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(129, __c16, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type InquiryStatus = "PROCESSING" | "HUMAN_REVIEW" | "COMPLETED" | "FAILED" | (string & {});
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
export type NotificationSubscriptionStatus = "SUBSCRIBED" | "NOT_SUBSCRIBED" | (string & {});
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
export type UploadState = "PROCESSING" | "COMPLETE" | "FAILED" | "FAULT" | (string & {});
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
  input: __S(138, __c17, 2) as any as S.Schema<CreateComplianceInquiryRequest>,
  output: __S(139, __c17, 3) as any as S.Schema<CreateComplianceInquiryResponse>,
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
}));

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
  input: __S(169, __c21, 1) as any as S.Schema<ExportComplianceInquiryRequest>,
  output: __S(170, __c21, 2) as any as S.Schema<ExportComplianceInquiryResponse>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<GetAccountSettingsRequest>,
  output: __S(185, __c23, 1) as any as S.Schema<GetAccountSettingsResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<GetComplianceInquiryMetadataRequest>,
  output: __S(2, __c0, 2) as any as S.Schema<GetComplianceInquiryMetadataResponse>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<GetReportRequest>,
  output: __S(9, __c1, 1) as any as S.Schema<GetReportResponse>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<GetReportMetadataRequest>,
  output: __S(18, __c2, 2) as any as S.Schema<GetReportMetadataResponse>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<GetTermForReportRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<GetTermForReportResponse>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<ListComplianceInquiriesRequest>,
  output: __S(34, __c4, 2) as any as S.Schema<ListComplianceInquiriesResponse>,
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
  input: __S(40, __c5, 0) as any as S.Schema<ListComplianceInquiryQueriesRequest>,
  output: __S(47, __c5, 7) as any as S.Schema<ListComplianceInquiryQueriesResponse>,
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
  input: __S(48, __c6, 0) as any as S.Schema<ListCustomerAgreementsRequest>,
  output: __S(51, __c6, 3) as any as S.Schema<ListCustomerAgreementsResponse>,
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
  input: __S(56, __c7, 0) as any as S.Schema<ListReportsRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<ListReportsResponse>,
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
  input: __S(72, __c9, 0) as any as S.Schema<ListReportVersionsRequest>,
  output: __S(73, __c9, 1) as any as S.Schema<ListReportVersionsResponse>,
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
  input: __S(80, __c10, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<PutAccountSettingsRequest>,
  output: __S(185, __c23, 1) as any as S.Schema<PutAccountSettingsResponse>,
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
}));

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
  input: __S(97, __c12, 1) as any as S.Schema<PutComplianceInquiryFeedbackRequest>,
  output: __S(98, __c12, 2) as any as S.Schema<PutComplianceInquiryFeedbackResponse>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ complianceInquiryId: S.String.pipe(T.HttpQuery("complianceInquiryId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/compliance-inquiry/getMetadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetComplianceInquiryMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          id: S.String,
          status: S.String,
          statusMessage: S.String,
          inputSource: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          supportMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "InquiryDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          complianceInquiryDetail: S.optional(__S(1, __c0, 1)),
          tags: S.optional(__S(160, __c20, 0)),
        }),
      ).annotate({ identifier: "GetComplianceInquiryMetadataResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          reportId: S.String.pipe(T.HttpQuery("reportId")),
          reportVersion: S.optional(S.Number).pipe(T.HttpQuery("reportVersion")),
          termToken: S.String.pipe(T.HttpQuery("termToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/report/get" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetReportRequest" });
    case 1:
      return S.suspend(() => S.Struct({ documentPresignedUrl: S.optional(S.String) })).annotate({
        identifier: "GetReportResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          reportId: S.String.pipe(T.HttpQuery("reportId")),
          reportVersion: S.optional(S.Number).pipe(T.HttpQuery("reportVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/report/getMetadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetReportMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          periodStart: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          periodEnd: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          deletedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          state: S.optional(S.String),
          arn: S.optional(S.String),
          series: S.optional(S.String),
          category: S.optional(S.String),
          companyName: S.optional(S.String),
          productName: S.optional(S.String),
          termArn: S.optional(S.String),
          version: S.optional(S.Number),
          acceptanceType: S.optional(S.String),
          sequenceNumber: S.optional(S.Number),
          uploadState: S.optional(S.String),
          statusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReportDetail" });
    case 2:
      return S.suspend(() => S.Struct({ reportDetails: S.optional(__S(17, __c2, 1)) })).annotate({
        identifier: "GetReportMetadataResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          reportId: S.String.pipe(T.HttpQuery("reportId")),
          reportVersion: S.optional(S.Number).pipe(T.HttpQuery("reportVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/report/getTermForReport" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTermForReportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ documentPresignedUrl: S.optional(S.String), termToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetTermForReportResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/compliance-inquiry/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListComplianceInquiriesRequest" });
    case 1:
      return S.Array(__S(144, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          complianceInquiries: S.optional(__S(33, __c4, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListComplianceInquiriesResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          complianceInquiryId: S.String.pipe(T.HttpQuery("complianceInquiryId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/compliance-inquiry/listQueries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListComplianceInquiryQueriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sourceLabel: S.optional(S.String),
          sourceContent: S.optional(S.String),
          sourceLink: S.optional(S.String),
        }),
      ).annotate({ identifier: "Citation" });
    case 2:
      return S.Array(__S(41, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          responseText: S.String,
          timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ResponseVersion" });
    case 4:
      return S.Array(__S(43, __c5, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          queryIdentifier: S.Number,
          query: S.String,
          response: S.optional(S.String),
          reviewType: S.optional(S.String),
          citations: S.optional(__S(42, __c5, 2)),
          status: S.String,
          statusMessage: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedResponseVersions: S.optional(__S(44, __c5, 4)),
        }),
      ).annotate({ identifier: "QuerySummary" });
    case 6:
      return S.Array(__S(45, __c5, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ queries: S.optional(__S(46, __c5, 6)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListComplianceInquiryQueriesResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/customer-agreement/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCustomerAgreementsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          id: S.optional(S.String),
          agreementArn: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          organizationArn: S.optional(S.String),
          effectiveStart: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          effectiveEnd: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          state: S.optional(S.String),
          description: S.optional(S.String),
          acceptanceTerms: S.optional(__S(152, __c19, 0)),
          terminateTerms: S.optional(__S(152, __c19, 0)),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomerAgreementSummary" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ customerAgreements: __S(50, __c6, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCustomerAgreementsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/report/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListReportsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ reports: S.optional(__S(65, __c8, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListReportsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          state: S.optional(S.String),
          arn: S.optional(S.String),
          version: S.optional(S.Number),
          uploadState: S.optional(S.String),
          description: S.optional(S.String),
          periodStart: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          periodEnd: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          series: S.optional(S.String),
          category: S.optional(S.String),
          companyName: S.optional(S.String),
          productName: S.optional(S.String),
          statusMessage: S.optional(S.String),
          acceptanceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReportSummary" });
    case 1:
      return S.Array(__S(64, __c8, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          reportId: S.String.pipe(T.HttpQuery("reportId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/report/listVersions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListReportVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ reports: __S(65, __c8, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListReportVersionsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(160, __c20, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ notificationSubscriptionStatus: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/account-settings/put" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAccountSettingsRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          complianceInquiryId: S.String,
          queryIdentifier: S.optional(S.Number),
          rating: S.String,
          responseRevisionId: S.optional(S.Number),
          reasonCodes: S.optional(__S(96, __c12, 0)),
          comment: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/compliance-inquiry/putFeedback" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutComplianceInquiryFeedbackRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ submittedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")) }),
      ).annotate({ identifier: "PutComplianceInquiryFeedbackResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(160, __c20, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(152, __c19, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(128, __c16, 0));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fileSections: S.optional(__S(152, __c19, 0)), content: T.Blob }),
      ).annotate({ identifier: "InquiryFileContent" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ query: S.String }),
        /*@__PURE__*/ S.Struct({ fileContent: __S(136, __c17, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          inquiryContent: __S(137, __c17, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          supportMode: S.optional(S.String),
          tags: S.optional(__S(160, __c20, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/compliance-inquiry/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateComplianceInquiryRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          complianceInquirySummary: S.optional(__S(144, __c18, 0)),
          tags: S.optional(__S(160, __c20, 0)),
        }),
      ).annotate({ identifier: "CreateComplianceInquiryResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          id: S.String,
          status: S.String,
          statusMessage: S.String,
          inputSource: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "InquirySummary" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          complianceInquiryId: S.String,
          queryIdentifiers: S.optional(__S(168, __c21, 0)),
          includeCitations: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/compliance-inquiry/export" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExportComplianceInquiryRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          documentPresignedUrl: S.optional(SensitiveString),
          tags: S.optional(__S(160, __c20, 0)),
        }),
      ).annotate({ identifier: "ExportComplianceInquiryResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/account-settings/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountSettingsRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ notificationSubscriptionStatus: S.optional(S.String) }),
      ).annotate({ identifier: "AccountSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({ accountSettings: S.optional(__S(184, __c23, 0)) }),
      ).annotate({ identifier: "GetAccountSettingsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
