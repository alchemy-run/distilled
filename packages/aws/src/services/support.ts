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
const ns = /*@__PURE__*/ T.XmlNamespace("http://support.amazonaws.com/doc/2013-04-15/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Support",
  serviceShapeName: "AWSSupport_20130415",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "support" });
const ver = /*@__PURE__*/ T.ServiceVersion("2013-04-15");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({
      authSchemes: [{ name: "sigv4", signingName: "support", signingRegion: "us-gov-west-1" }],
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://support.us-east-1.amazonaws.com",
              {
                authSchemes: [
                  { name: "sigv4", signingName: "support", signingRegion: "us-east-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://support.cn-north-1.amazonaws.com.cn",
              {
                authSchemes: [
                  { name: "sigv4", signingName: "support", signingRegion: "cn-north-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://support.us-gov-west-1.amazonaws.com", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://support.us-gov-west-1.amazonaws.com", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://support.us-iso-east-1.c2s.ic.gov",
              {
                authSchemes: [
                  { name: "sigv4", signingName: "support", signingRegion: "us-iso-east-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://support.us-isob-east-1.sc2s.sgov.gov",
              {
                authSchemes: [
                  { name: "sigv4", signingName: "support", signingRegion: "us-isob-east-1" },
                ],
              },
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://support-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(`https://support-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://support.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(`https://support.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://support.us-east-1.{D}","properties":{"authSchemes":[{"name":"sigv4","signingName":"support","signingRegion":"us-east-1"}]},"headers":{}}',
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

export class AttachmentIdNotFound
  extends /*@__PURE__*/ S.TaggedError<AttachmentIdNotFound>()("AttachmentIdNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class AttachmentLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<AttachmentLimitExceeded>()("AttachmentLimitExceeded", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError) {}
export class AttachmentSetExpired
  extends /*@__PURE__*/ S.TaggedError<AttachmentSetExpired>()("AttachmentSetExpired", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class AttachmentSetIdNotFound
  extends /*@__PURE__*/ S.TaggedError<AttachmentSetIdNotFound>()("AttachmentSetIdNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class AttachmentSetSizeLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<AttachmentSetSizeLimitExceeded>()(
    "AttachmentSetSizeLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withThrottlingError) {}
export class CaseCreationLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<CaseCreationLimitExceeded>()("CaseCreationLimitExceeded", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError) {}
export class CaseIdNotFound
  extends /*@__PURE__*/ S.TaggedError<CaseIdNotFound>()("CaseIdNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class DescribeAttachmentLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<DescribeAttachmentLimitExceeded>()(
    "DescribeAttachmentLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withThrottlingError) {}
export class DryRunOperationException
  extends /*@__PURE__*/ S.TaggedError<DryRunOperationException>()("DryRunOperationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()("InternalServerError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      throttlingReasons: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
          identifier: "ThrottlingReasonList",
        }),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "Throttling", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UploadIdNotFound
  extends /*@__PURE__*/ S.TaggedError<UploadIdNotFound>()("UploadIdNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type AttachmentSetId = string;
export type FileName = string;
export type Data = Uint8Array;
export interface Attachment {
  fileName?: string;
  data?: Uint8Array;
}
export type Attachments = Attachment[];
export type NullableBooleanType = boolean;
export interface AddAttachmentsToSetRequest {
  attachmentSetId?: string;
  attachments: Attachment[];
  dryRun?: boolean;
}
export type ExpiryTime = string;
export interface AddAttachmentsToSetResponse {
  attachmentSetId?: string;
  expiryTime?: string;
}
export type CaseId = string;
export type CommunicationBody = string;
export type CcEmailAddress = string;
export type CcEmailAddressList = string[];
export type UploadId = string;
export type UploadIds = string[];
export interface AddCommunicationToCaseRequest {
  caseId?: string;
  communicationBody: string;
  ccEmailAddresses?: string[];
  attachmentSetId?: string;
  uploadIds?: string[];
  dryRun?: boolean;
}
export type Result = boolean;
export interface AddCommunicationToCaseResponse {
  result?: boolean;
}
export type FieldIntegerValue = number;
export type ETag = string;
export interface CompletedUpload {
  partIndex: number;
  eTag: string;
}
export type CompletedUploadList = CompletedUpload[];
export interface CompleteAttachmentUploadRequest {
  uploadId: string;
  completedUploads: CompletedUpload[];
  dryRun?: boolean;
}
export type UploadStatus = "attachment-ready" | "attachment-not-ready" | "failed" | (string & {});
export interface CompleteAttachmentUploadResponse {
  uploadStatus: UploadStatus;
}
export type Subject = string;
export type ServiceCode2 = string;
export type SeverityCode = string;
export type CategoryCode = string;
export type Language = string;
export type IssueType = string;
export interface CreateCaseRequest {
  subject: string;
  serviceCode?: string;
  severityCode?: string;
  categoryCode?: string;
  communicationBody: string;
  ccEmailAddresses?: string[];
  language?: string;
  issueType?: string;
  attachmentSetId?: string;
  uploadIds?: string[];
  dryRun?: boolean;
}
export interface CreateCaseResponse {
  caseId?: string;
}
export type AttachmentId = string;
export interface DescribeAttachmentRequest {
  attachmentId: string;
  dryRun?: boolean;
}
export interface DescribeAttachmentResponse {
  attachment?: Attachment;
}
export interface DescribeAttachmentUploadStatusRequest {
  uploadId: string;
  dryRun?: boolean;
}
export interface UploadProgress {
  totalParts?: number;
  completedPartsCount?: number;
}
export interface DescribeAttachmentUploadStatusResponse {
  uploadStatus: UploadStatus;
  fileName: string;
  uploadProgress?: UploadProgress;
}
export type CaseIdList = string[];
export type DisplayId = string;
export type AfterTime = string;
export type BeforeTime = string;
export type IncludeResolvedCases = boolean;
export type NextToken = string;
export type MaxResults = number;
export type IncludeCommunications = boolean;
export interface DescribeCasesRequest {
  caseIdList?: string[];
  displayId?: string;
  afterTime?: string;
  beforeTime?: string;
  includeResolvedCases?: boolean;
  nextToken?: string;
  maxResults?: number;
  language?: string;
  includeCommunications?: boolean;
  dryRun?: boolean;
}
export type Status = string;
export type ServiceCode = string;
export type SubmittedBy = string;
export type TimeCreated = string;
export type ValidatedCommunicationBody = string;
export interface AttachmentDetails {
  attachmentId?: string;
  fileName?: string;
}
export type AttachmentSet = AttachmentDetails[];
export interface Communication {
  caseId?: string;
  body?: string;
  submittedBy?: string;
  timeCreated?: string;
  attachments?: AttachmentDetails[];
  attachmentSet?: AttachmentDetails[];
}
export type CommunicationList = Communication[];
export interface RecentCaseCommunications {
  communications?: Communication[];
  nextToken?: string;
}
export interface CaseDetails {
  caseId?: string;
  displayId?: string;
  subject?: string;
  status?: string;
  serviceCode?: string;
  categoryCode?: string;
  severityCode?: string;
  submittedBy?: string;
  timeCreated?: string;
  recentCommunications?: RecentCaseCommunications;
  ccEmailAddresses?: string[];
  language?: string;
}
export type CaseList = CaseDetails[];
export interface DescribeCasesResponse {
  cases?: CaseDetails[];
  nextToken?: string;
}
export interface DescribeCommunicationsRequest {
  caseId: string;
  beforeTime?: string;
  afterTime?: string;
  nextToken?: string;
  maxResults?: number;
  dryRun?: boolean;
}
export interface DescribeCommunicationsResponse {
  communications?: Communication[];
  nextToken?: string;
}
export interface DescribeCreateCaseOptionsRequest {
  issueType: string;
  serviceCode: string;
  language: string;
  categoryCode: string;
  dryRun?: boolean;
}
export type ValidatedLanguageAvailability = string;
export type Type = string;
export type StartTime = string;
export type EndTime = string;
export interface SupportedHour {
  startTime?: string;
  endTime?: string;
}
export type SupportedHoursList = SupportedHour[];
export type ValidatedDateTime = string;
export interface DateInterval {
  startDateTime?: string;
  endDateTime?: string;
}
export type DatesWithoutSupportList = DateInterval[];
export interface CommunicationTypeOptions {
  type?: string;
  supportedHours?: SupportedHour[];
  datesWithoutSupport?: DateInterval[];
}
export type CommunicationTypeOptionsList = CommunicationTypeOptions[];
export interface DescribeCreateCaseOptionsResponse {
  languageAvailability?: string;
  communicationTypes?: CommunicationTypeOptions[];
}
export type ServiceCodeList = string[];
export interface DescribeServicesRequest {
  serviceCodeList?: string[];
  language?: string;
  dryRun?: boolean;
}
export type ServiceName = string;
export type CategoryName = string;
export interface Category {
  code?: string;
  name?: string;
}
export type CategoryList = Category[];
export interface Service {
  code?: string;
  name?: string;
  categories?: Category[];
}
export type ServiceList = Service[];
export interface DescribeServicesResponse {
  services?: Service[];
}
export interface DescribeSeverityLevelsRequest {
  language?: string;
  dryRun?: boolean;
}
export type SeverityLevelCode = string;
export type SeverityLevelName = string;
export interface SeverityLevel {
  code?: string;
  name?: string;
}
export type SeverityLevelsList = SeverityLevel[];
export interface DescribeSeverityLevelsResponse {
  severityLevels?: SeverityLevel[];
}
export type ValidatedIssueTypeString = string;
export type ValidatedServiceCode = string;
export type ValidatedCategoryCode = string;
export interface DescribeSupportedLanguagesRequest {
  issueType: string;
  serviceCode: string;
  categoryCode: string;
  dryRun?: boolean;
}
export type Code = string;
export type Display = string;
export interface SupportedLanguage {
  code?: string;
  language?: string;
  display?: string;
}
export type SupportedLanguagesList = SupportedLanguage[];
export interface DescribeSupportedLanguagesResponse {
  supportedLanguages?: SupportedLanguage[];
}
export type StringList = string[];
export interface DescribeTrustedAdvisorCheckRefreshStatusesRequest {
  checkIds: string[];
}
export interface TrustedAdvisorCheckRefreshStatus {
  checkId: string;
  status: string;
  millisUntilNextRefreshable: number;
}
export type TrustedAdvisorCheckRefreshStatusList = TrustedAdvisorCheckRefreshStatus[];
export interface DescribeTrustedAdvisorCheckRefreshStatusesResponse {
  statuses: TrustedAdvisorCheckRefreshStatus[];
}
export interface DescribeTrustedAdvisorCheckResultRequest {
  checkId: string;
  language?: string;
}
export interface TrustedAdvisorResourcesSummary {
  resourcesProcessed: number;
  resourcesFlagged: number;
  resourcesIgnored: number;
  resourcesSuppressed: number;
}
export interface TrustedAdvisorCostOptimizingSummary {
  estimatedMonthlySavings: number;
  estimatedPercentMonthlySavings: number;
}
export interface TrustedAdvisorCategorySpecificSummary {
  costOptimizing?: TrustedAdvisorCostOptimizingSummary;
}
export interface TrustedAdvisorResourceDetail {
  status: string;
  region?: string;
  resourceId: string;
  isSuppressed?: boolean;
  metadata: string[];
}
export type TrustedAdvisorResourceDetailList = TrustedAdvisorResourceDetail[];
export interface TrustedAdvisorCheckResult {
  checkId: string;
  timestamp: string;
  status: string;
  resourcesSummary: TrustedAdvisorResourcesSummary;
  categorySpecificSummary: TrustedAdvisorCategorySpecificSummary;
  flaggedResources: TrustedAdvisorResourceDetail[];
}
export interface DescribeTrustedAdvisorCheckResultResponse {
  result?: TrustedAdvisorCheckResult;
}
export interface DescribeTrustedAdvisorChecksRequest {
  language: string;
}
export interface TrustedAdvisorCheckDescription {
  id: string;
  name: string;
  description: string;
  category: string;
  metadata: string[];
}
export type TrustedAdvisorCheckList = TrustedAdvisorCheckDescription[];
export interface DescribeTrustedAdvisorChecksResponse {
  checks: TrustedAdvisorCheckDescription[];
}
export interface DescribeTrustedAdvisorCheckSummariesRequest {
  checkIds: string[];
}
export interface TrustedAdvisorCheckSummary {
  checkId: string;
  timestamp: string;
  status: string;
  hasFlaggedResources?: boolean;
  resourcesSummary: TrustedAdvisorResourcesSummary;
  categorySpecificSummary: TrustedAdvisorCategorySpecificSummary;
}
export type TrustedAdvisorCheckSummaryList = TrustedAdvisorCheckSummary[];
export interface DescribeTrustedAdvisorCheckSummariesResponse {
  summaries: TrustedAdvisorCheckSummary[];
}
export interface GetAttachmentDownloadLinkRequest {
  attachmentId: string;
  dryRun?: boolean;
}
export type HttpsUrl = string;
export interface DownloadUrl {
  url: string;
  expiryDate: string;
}
export interface GetAttachmentDownloadLinkResponse {
  fileName: string;
  downloadUrl: DownloadUrl;
}
export type FileSize = number;
export type StartIndex = number;
export type EndIndex = number;
export interface UploadRange {
  startIndex: number;
  endIndex?: number;
}
export interface GetAttachmentUploadLinksRequest {
  fileName: string;
  fileSizeBytes?: number;
  uploadId?: string;
  uploadRange?: UploadRange;
  dryRun?: boolean;
}
export type PartSizeBytes = number;
export interface UploadUrl {
  url: string;
  partIndex: number;
  expiryDate: string;
}
export type UploadUrlList = UploadUrl[];
export interface GetAttachmentUploadLinksResponse {
  uploadId: string;
  partSizeBytes: number;
  totalParts: number;
  nextIndex?: number;
  uploadUrls: UploadUrl[];
}
export interface RefreshTrustedAdvisorCheckRequest {
  checkId: string;
}
export interface RefreshTrustedAdvisorCheckResponse {
  status: TrustedAdvisorCheckRefreshStatus;
}
export interface ResolveCaseRequest {
  caseId?: string;
  dryRun?: boolean;
}
export type CaseStatus = string;
export interface ResolveCaseResponse {
  initialCaseStatus?: string;
  finalCaseStatus?: string;
}
export type ErrorMessage = string;
export type AvailabilityErrorMessage = string;
export type CoralAvailabilityThrottlingReason = string;
export type CoralAvailabilityThrottledResource = string;
export interface ThrottlingReason {
  reason?: string;
  resource?: string;
}
export type ThrottlingReasonList = ThrottlingReason[];
export type AddAttachmentsToSetError =
  | AttachmentLimitExceeded
  | AttachmentSetExpired
  | AttachmentSetIdNotFound
  | AttachmentSetSizeLimitExceeded
  | DryRunOperationException
  | InternalServerError
  | CommonErrors;
/**
 * Adds one or more attachments to an attachment set.
 *
 * An attachment set is a temporary container for attachments that you add to a case or
 * case communication. The set is available for 1 hour after it's created. The
 * `expiryTime` returned in the response is when the set expires.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const addAttachmentsToSet: API.OperationMethod<
  AddAttachmentsToSetRequest,
  AddAttachmentsToSetResponse,
  AddAttachmentsToSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(9, __c1, 1) as any as S.Schema<AddAttachmentsToSetRequest>,
  output: __S(10, __c1, 2) as any as S.Schema<AddAttachmentsToSetResponse>,
  errors: [
    AttachmentLimitExceeded,
    AttachmentSetExpired,
    AttachmentSetIdNotFound,
    AttachmentSetSizeLimitExceeded,
    DryRunOperationException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddAttachmentsToSet",
}));

export type AddCommunicationToCaseError =
  | AttachmentSetExpired
  | AttachmentSetIdNotFound
  | CaseIdNotFound
  | DryRunOperationException
  | InternalServerError
  | CommonErrors;
/**
 * Adds additional customer communication to a Amazon Web Services Support case. Use the `caseId`
 * parameter to identify the case to which to add communication. To list a set of
 * email addresses to copy on the communication, use the `ccEmailAddresses`
 * parameter. The `communicationBody` value contains the text of the
 * communication.
 *
 * To attach files larger than 5 MB to the communication, use the `uploadIds` parameter.
 *
 * Amazon Web Services Support automatically redacts sensitive information from support cases to protect your data. The following information is replaced with `[REDACTED_BY_Amazon Web Services]` and is not stored:
 *
 * - Amazon Web Services secret keys - The complete key is replaced. Example: `[REDACTED_BY_Amazon Web Services]`
 *
 * - Private keys - The complete key is replaced. Example: `[REDACTED_BY_Amazon Web Services]`
 *
 * - Credit card numbers - The number is redacted, but the last 4 digits remain. Example: `[REDACTED_BY_Amazon Web Services]-7016`
 *
 * This sensitive information is never required by Amazon Web Services Support.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const addCommunicationToCase: API.OperationMethod<
  AddCommunicationToCaseRequest,
  AddCommunicationToCaseResponse,
  AddCommunicationToCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<AddCommunicationToCaseRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<AddCommunicationToCaseResponse>,
  errors: [
    AttachmentSetExpired,
    AttachmentSetIdNotFound,
    CaseIdNotFound,
    DryRunOperationException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddCommunicationToCase",
}));

export type CompleteAttachmentUploadError =
  | DryRunOperationException
  | InternalServerError
  | UploadIdNotFound
  | CommonErrors;
/**
 * Completes an attachment upload that was started with GetAttachmentUploadLinks. After you upload a part of the file to its
 * presigned Amazon S3 URL, call `CompleteAttachmentUpload` with the
 * `partIndex` and `eTag` of that part. You can include one part per
 * call, or multiple parts in a single call. After `CompleteAttachmentUpload` has
 * been called for every part of the file, the service processes the upload asynchronously. The
 * `attachment-ready` status might not be reflected immediately. Use DescribeAttachmentUploadStatus to poll for the `uploadStatus` to
 * become `attachment-ready` before passing the `uploadId` to CreateCase or AddCommunicationToCase.
 */
export const completeAttachmentUpload: API.OperationMethod<
  CompleteAttachmentUploadRequest,
  CompleteAttachmentUploadResponse,
  CompleteAttachmentUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(42, __c5, 2) as any as S.Schema<CompleteAttachmentUploadRequest>,
  output: __S(43, __c5, 3) as any as S.Schema<CompleteAttachmentUploadResponse>,
  errors: [DryRunOperationException, InternalServerError, UploadIdNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteAttachmentUpload",
}));

export type CreateCaseError =
  | AttachmentSetExpired
  | AttachmentSetIdNotFound
  | CaseCreationLimitExceeded
  | DryRunOperationException
  | InternalServerError
  | CommonErrors;
/**
 * Creates a case in the Amazon Web Services Support Center. This operation is similar to how you create a case
 * in the Amazon Web Services Support Center Create
 * Case page.
 *
 * The Amazon Web Services Support API doesn't support requesting service limit increases. You can submit a
 * service limit increase in the following ways:
 *
 * - Submit a request from the Amazon Web Services Support Center Create Case page.
 *
 * - Use the Service Quotas RequestServiceQuotaIncrease operation.
 *
 * Amazon Web Services Support automatically redacts sensitive information from support cases to protect your data. The following information is replaced with `[REDACTED_BY_Amazon Web Services]` and is not stored:
 *
 * - Amazon Web Services secret keys - The complete key is replaced. Example: `[REDACTED_BY_Amazon Web Services]`
 *
 * - Private keys - The complete key is replaced. Example: `[REDACTED_BY_Amazon Web Services]`
 *
 * - Credit card numbers - The number is redacted, but the last 4 digits remain. Example: `[REDACTED_BY_Amazon Web Services]-7016`
 *
 * This sensitive information is never required by Amazon Web Services Support.
 *
 * A successful `CreateCase` request returns a Amazon Web Services Support case number. You can use
 * the DescribeCases operation and specify the case number to get
 * existing Amazon Web Services Support cases. After you create a case, use the AddCommunicationToCase operation to add additional communication or
 * attachments to an existing case.
 *
 * The `caseId` is separate from the `displayId` that appears in
 * the Amazon Web Services Support Center. Use the DescribeCases operation to get the `displayId`.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const createCase: API.OperationMethod<
  CreateCaseRequest,
  CreateCaseResponse,
  CreateCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<CreateCaseRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<CreateCaseResponse>,
  errors: [
    AttachmentSetExpired,
    AttachmentSetIdNotFound,
    CaseCreationLimitExceeded,
    DryRunOperationException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCase",
}));

export type DescribeAttachmentError =
  | AttachmentIdNotFound
  | DescribeAttachmentLimitExceeded
  | DryRunOperationException
  | InternalServerError
  | CommonErrors;
/**
 * Returns the attachment that has the specified ID. Attachments can include screenshots,
 * error logs, or other files that describe your issue. Attachment IDs are generated by the
 * case management system when you add an attachment to a case or case communication.
 * Attachment IDs are returned in the AttachmentDetails objects that are
 * returned by the DescribeCommunications operation.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * `DescribeAttachment` can't return attachments larger than 5 MB. If the
 * specified `attachmentId` refers to an attachment larger than 5 MB, the
 * request fails with `InvalidParameterValueException`.
 *
 * To download an attachment of any size, including attachments larger than 5 MB, use
 * GetAttachmentDownloadLink.
 * `GetAttachmentDownloadLink` returns an Amazon S3 presigned URL that you can
 * use to download the attachment directly.
 */
export const describeAttachment: API.OperationMethod<
  DescribeAttachmentRequest,
  DescribeAttachmentResponse,
  DescribeAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<DescribeAttachmentRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<DescribeAttachmentResponse>,
  errors: [
    AttachmentIdNotFound,
    DescribeAttachmentLimitExceeded,
    DryRunOperationException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAttachment",
}));

export type DescribeAttachmentUploadStatusError =
  | DryRunOperationException
  | InternalServerError
  | UploadIdNotFound
  | CommonErrors;
/**
 * Returns the current status, file name, and progress of a multipart attachment upload that
 * was started with GetAttachmentUploadLinks. Use this operation to track
 * where an upload is in the workflow. While parts are still being uploaded and reported through
 * CompleteAttachmentUpload, the `uploadStatus` is
 * `attachment-not-ready` and `uploadProgress` reports the total number
 * of parts and how many have been completed so far. After every part has been reported and the
 * service finishes processing the upload asynchronously, the `uploadStatus` becomes
 * `attachment-ready` and the `uploadId` can be attached to a case
 * through CreateCase or AddCommunicationToCase.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeAttachmentUploadStatus: API.OperationMethod<
  DescribeAttachmentUploadStatusRequest,
  DescribeAttachmentUploadStatusResponse,
  DescribeAttachmentUploadStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<DescribeAttachmentUploadStatusRequest>,
  output: __S(66, __c8, 2) as any as S.Schema<DescribeAttachmentUploadStatusResponse>,
  errors: [DryRunOperationException, InternalServerError, UploadIdNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAttachmentUploadStatus",
}));

export type DescribeCasesError =
  | CaseIdNotFound
  | DryRunOperationException
  | InternalServerError
  | CommonErrors;
/**
 * Returns a list of cases that you specify by passing one or more case IDs. You can use
 * the `afterTime` and `beforeTime` parameters to filter the cases by
 * date. You can set values for the `includeResolvedCases` and
 * `includeCommunications` parameters to specify how much information to
 * return.
 *
 * The response returns the following in JSON format:
 *
 * - One or more CaseDetails data types.
 *
 * - One or more `nextToken` values, which specify where to paginate the
 * returned records represented by the `CaseDetails` objects.
 *
 * Case data is available for 24 months after creation. If a case was created more than
 * 24 months ago, a request might return an error.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * Each Communication returned by this operation includes
 * attachment information in two fields:
 *
 * - `attachmentSet`: returns only attachments that are 5 MB or
 * smaller. Attachments larger than 5 MB are not included in this field.
 *
 * - `attachments`: returns all attachments regardless of size.
 *
 * Amazon Web Services recommends that you use the `attachments` field and download each
 * attachment with GetAttachmentDownloadLink, which supports
 * attachments of any size. The `attachmentSet` field and DescribeAttachment return only attachments that are 5 MB or
 * smaller.
 */
export const describeCases: API.PaginatedOperationMethod<
  DescribeCasesRequest,
  DescribeCasesResponse,
  DescribeCasesError,
  Credentials | HttpClient.HttpClient,
  CaseDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DescribeCasesRequest>,
  output: __S(76, __c9, 4) as any as S.Schema<DescribeCasesResponse>,
  errors: [CaseIdNotFound, DryRunOperationException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "cases",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeCommunicationsError =
  | CaseIdNotFound
  | DryRunOperationException
  | InternalServerError
  | CommonErrors;
/**
 * Returns communications and attachments for one or more support cases. Use the
 * `afterTime` and `beforeTime` parameters to filter by date. You
 * can use the `caseId` parameter to restrict the results to a specific
 * case.
 *
 * Case data is available for 24 months after creation. If a case was created more than
 * 24 months ago, a request for data might cause an error.
 *
 * You can use the `maxResults` and `nextToken` parameters to
 * control the pagination of the results. Set `maxResults` to the number of
 * cases that you want to display on each page, and use `nextToken` to specify
 * the resumption of pagination.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * Each Communication returned by this operation includes
 * attachment information in two fields:
 *
 * - `attachmentSet`: returns only attachments that are 5 MB or
 * smaller. Attachments larger than 5 MB are not included in this field.
 *
 * - `attachments`: returns all attachments regardless of size.
 *
 * Amazon Web Services recommends that you use the `attachments` field and download each
 * attachment with GetAttachmentDownloadLink, which supports
 * attachments of any size. The `attachmentSet` field and DescribeAttachment return only attachments that are 5 MB or
 * smaller.
 */
export const describeCommunications: API.PaginatedOperationMethod<
  DescribeCommunicationsRequest,
  DescribeCommunicationsResponse,
  DescribeCommunicationsError,
  Credentials | HttpClient.HttpClient,
  Communication
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<DescribeCommunicationsRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<DescribeCommunicationsResponse>,
  errors: [CaseIdNotFound, DryRunOperationException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCommunications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "communications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeCreateCaseOptionsError =
  | DryRunOperationException
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of CreateCaseOption types along with the
 * corresponding supported hours and language availability. You can specify the `language`
 * `categoryCode`,
 * `issueType` and `serviceCode` used to retrieve the CreateCaseOptions.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeCreateCaseOptions: API.OperationMethod<
  DescribeCreateCaseOptionsRequest,
  DescribeCreateCaseOptionsResponse,
  DescribeCreateCaseOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<DescribeCreateCaseOptionsRequest>,
  output: __S(103, __c12, 7) as any as S.Schema<DescribeCreateCaseOptionsResponse>,
  errors: [DryRunOperationException, InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCreateCaseOptions",
}));

export type DescribeServicesError = DryRunOperationException | InternalServerError | CommonErrors;
/**
 * Returns the current list of Amazon Web Services services and a list of service categories for each
 * service. You then use service names and categories in your CreateCase
 * requests. Each Amazon Web Services service has its own set of categories.
 *
 * The service codes and category codes correspond to the values that appear in the
 * **Service** and **Category** lists on the Amazon Web Services Support Center Create Case page. The values in those fields
 * don't necessarily match the service codes and categories returned by the
 * `DescribeServices` operation. Always use the service codes and categories
 * that the `DescribeServices` operation returns, so that you have the most
 * recent set of service and category codes.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeServices: API.OperationMethod<
  DescribeServicesRequest,
  DescribeServicesResponse,
  DescribeServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<DescribeServicesRequest>,
  output: __S(107, __c13, 3) as any as S.Schema<DescribeServicesResponse>,
  errors: [DryRunOperationException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServices",
}));

export type DescribeSeverityLevelsError =
  | DryRunOperationException
  | InternalServerError
  | CommonErrors;
/**
 * Returns the list of severity levels that you can assign to a support case. The
 * severity level for a case is also a field in the CaseDetails data type
 * that you include for a CreateCase request.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeSeverityLevels: API.OperationMethod<
  DescribeSeverityLevelsRequest,
  DescribeSeverityLevelsResponse,
  DescribeSeverityLevelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<DescribeSeverityLevelsRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<DescribeSeverityLevelsResponse>,
  errors: [DryRunOperationException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSeverityLevels",
}));

export type DescribeSupportedLanguagesError =
  | DryRunOperationException
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of supported languages for a specified `categoryCode`,
 * `issueType` and `serviceCode`. The returned supported languages will
 * include a ISO 639-1 code for the `language`, and the language display name.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeSupportedLanguages: API.OperationMethod<
  DescribeSupportedLanguagesRequest,
  DescribeSupportedLanguagesResponse,
  DescribeSupportedLanguagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DescribeSupportedLanguagesRequest>,
  output: __S(131, __c16, 3) as any as S.Schema<DescribeSupportedLanguagesResponse>,
  errors: [DryRunOperationException, InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSupportedLanguages",
}));

export type DescribeTrustedAdvisorCheckRefreshStatusesError =
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the refresh status of the Trusted Advisor checks that have the specified check
 * IDs. You can get the check IDs by calling the DescribeTrustedAdvisorChecks operation.
 *
 * Some checks are refreshed automatically, and you can't return their refresh statuses
 * by using the `DescribeTrustedAdvisorCheckRefreshStatuses` operation. If you
 * call this operation for these checks, you might see an
 * `InvalidParameterValue` error.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * To call the Trusted Advisor operations in
 * the Amazon Web Services Support API, you must use the US East (N. Virginia) endpoint. Currently, the US West (Oregon) and Europe (Ireland)
 * endpoints don't support the Trusted Advisor operations. For more information, see About the Amazon Web Services Support
 * API in the *Amazon Web Services Support User Guide*.
 */
export const describeTrustedAdvisorCheckRefreshStatuses: API.OperationMethod<
  DescribeTrustedAdvisorCheckRefreshStatusesRequest,
  DescribeTrustedAdvisorCheckRefreshStatusesResponse,
  DescribeTrustedAdvisorCheckRefreshStatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<DescribeTrustedAdvisorCheckRefreshStatusesRequest>,
  output: __S(138, __c17, 2) as any as S.Schema<DescribeTrustedAdvisorCheckRefreshStatusesResponse>,
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorCheckRefreshStatuses",
}));

export type DescribeTrustedAdvisorCheckResultError =
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the results of the Trusted Advisor check that has the specified check ID. You
 * can get the check IDs by calling the DescribeTrustedAdvisorChecks
 * operation.
 *
 * The response contains a TrustedAdvisorCheckResult object, which
 * contains these three objects:
 *
 * - TrustedAdvisorCategorySpecificSummary
 *
 * - TrustedAdvisorResourceDetail
 *
 * - TrustedAdvisorResourcesSummary
 *
 * In addition, the response contains these fields:
 *
 * - **status** - The alert status of the check
 * can be `ok` (green), `warning` (yellow),
 * `error` (red), or `not_available`.
 *
 * - **timestamp** - The time of the last refresh
 * of the check.
 *
 * - **checkId** - The unique identifier for the
 * check.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * To call the Trusted Advisor operations in
 * the Amazon Web Services Support API, you must use the US East (N. Virginia) endpoint. Currently, the US West (Oregon) and Europe (Ireland)
 * endpoints don't support the Trusted Advisor operations. For more information, see About the Amazon Web Services Support
 * API in the *Amazon Web Services Support User Guide*.
 */
export const describeTrustedAdvisorCheckResult: API.OperationMethod<
  DescribeTrustedAdvisorCheckResultRequest,
  DescribeTrustedAdvisorCheckResultResponse,
  DescribeTrustedAdvisorCheckResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<DescribeTrustedAdvisorCheckResultRequest>,
  output: __S(164, __c20, 4) as any as S.Schema<DescribeTrustedAdvisorCheckResultResponse>,
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorCheckResult",
}));

export type DescribeTrustedAdvisorChecksError =
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about all available Trusted Advisor checks, including the name, ID,
 * category, description, and metadata. You must specify a language code.
 *
 * The response contains a TrustedAdvisorCheckDescription object for
 * each check. You must set the Amazon Web Services Region to us-east-1.
 *
 * - You must have a Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the `SubscriptionRequiredException` error
 * message appears. For information about changing your support plan, see
 * Amazon Web Services Support.
 *
 * - The names and descriptions for Trusted Advisor checks are subject to change. We
 * recommend that you specify the check ID in your code to uniquely identify a
 * check.
 *
 * To call the Trusted Advisor operations in
 * the Amazon Web Services Support API, you must use the US East (N. Virginia) endpoint. Currently, the US West (Oregon) and Europe (Ireland)
 * endpoints don't support the Trusted Advisor operations. For more information, see About the Amazon Web Services Support
 * API in the *Amazon Web Services Support User Guide*.
 */
export const describeTrustedAdvisorChecks: API.OperationMethod<
  DescribeTrustedAdvisorChecksRequest,
  DescribeTrustedAdvisorChecksResponse,
  DescribeTrustedAdvisorChecksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<DescribeTrustedAdvisorChecksRequest>,
  output: __S(179, __c22, 3) as any as S.Schema<DescribeTrustedAdvisorChecksResponse>,
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorChecks",
}));

export type DescribeTrustedAdvisorCheckSummariesError =
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the results for the Trusted Advisor check summaries for the check IDs that you
 * specified. You can get the check IDs by calling the DescribeTrustedAdvisorChecks operation.
 *
 * The response contains an array of TrustedAdvisorCheckSummary
 * objects.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * To call the Trusted Advisor operations in
 * the Amazon Web Services Support API, you must use the US East (N. Virginia) endpoint. Currently, the US West (Oregon) and Europe (Ireland)
 * endpoints don't support the Trusted Advisor operations. For more information, see About the Amazon Web Services Support
 * API in the *Amazon Web Services Support User Guide*.
 *
 * **Understanding the Trusted Advisor Resources processed value**
 *
 * The **Resources processed** value, `resourcesProcessed`, usually shows both flagged resources (those with warnings or errors) and resources in good standing (ok status resources). However, some checks report flagged resources only. To understand what a specific check reports, review the detailed check information in the Trusted Advisor check reference. If you see a **Green** criterion listed in the **Alert criteria**, then the check reports all resources. If there's no **Green** criterion listed in the **Alert criteria**, then the check reports only flagged resources. For example, the Amazon EC2 Reserved Instance optimization check (cX3c2R1chu) doesn't list a **Green** criterion in the **Alert criteria**. So, this check only reports flagged resources.
 */
export const describeTrustedAdvisorCheckSummaries: API.OperationMethod<
  DescribeTrustedAdvisorCheckSummariesRequest,
  DescribeTrustedAdvisorCheckSummariesResponse,
  DescribeTrustedAdvisorCheckSummariesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<DescribeTrustedAdvisorCheckSummariesRequest>,
  output: __S(187, __c23, 3) as any as S.Schema<DescribeTrustedAdvisorCheckSummariesResponse>,
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorCheckSummaries",
}));

export type GetAttachmentDownloadLinkError =
  | AttachmentIdNotFound
  | DryRunOperationException
  | InternalServerError
  | CommonErrors;
/**
 * Returns a presigned download URL for an attachment that is associated with a case
 * communication. The download link works for an attachment of any size, including attachments
 * added through `AddAttachmentsToSet` and attachments uploaded through GetAttachmentUploadLinks. The download URL is time-limited and expires at the
 * date and time indicated in the `downloadUrl` response field. Download the
 * attachment from the URL before it expires.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const getAttachmentDownloadLink: API.OperationMethod<
  GetAttachmentDownloadLinkRequest,
  GetAttachmentDownloadLinkResponse,
  GetAttachmentDownloadLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<GetAttachmentDownloadLinkRequest>,
  output: __S(194, __c24, 2) as any as S.Schema<GetAttachmentDownloadLinkResponse>,
  errors: [AttachmentIdNotFound, DryRunOperationException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttachmentDownloadLink",
}));

export type GetAttachmentUploadLinksError =
  | DryRunOperationException
  | InternalServerError
  | UploadIdNotFound
  | CommonErrors;
/**
 * Returns one or more presigned upload URLs for uploading a large file attachment to a
 * support case by using a multipart upload workflow. The maximum file size that you can upload
 * with this workflow is 150 MB, and parts can be up to 100 MB each. Initiate a new upload by
 * providing `fileName` and `fileSizeBytes`; the response returns a unique
 * `uploadId`, the part size, the total number of parts, and a list of presigned
 * upload URLs for the requested range of parts. A maximum of 10 upload URLs are returned per
 * call. To retrieve more upload URLs for an upload
 * that's already in progress, call `GetAttachmentUploadLinks` again with the existing
 * `uploadId` and a new `uploadRange`.
 *
 * Upload each part to its presigned URL by using HTTP `PUT` and capture the ETag
 * from the response. After you upload all parts, call CompleteAttachmentUpload
 * with the `uploadId` and the list of part indexes and ETags to finalize the upload.
 * You can then attach the upload to a case by passing the `uploadId` in the
 * `uploadIds` parameter of CreateCase or AddCommunicationToCase. To monitor progress before completion, call DescribeAttachmentUploadStatus.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const getAttachmentUploadLinks: API.OperationMethod<
  GetAttachmentUploadLinksRequest,
  GetAttachmentUploadLinksResponse,
  GetAttachmentUploadLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(201, __c25, 1) as any as S.Schema<GetAttachmentUploadLinksRequest>,
  output: __S(204, __c25, 4) as any as S.Schema<GetAttachmentUploadLinksResponse>,
  errors: [DryRunOperationException, InternalServerError, UploadIdNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttachmentUploadLinks",
}));

export type RefreshTrustedAdvisorCheckError = InternalServerError | CommonErrors;
/**
 * Refreshes the Trusted Advisor check that you specify using the check ID. You can get the
 * check IDs by calling the DescribeTrustedAdvisorChecks
 * operation.
 *
 * Some checks are refreshed automatically. If you call the
 * `RefreshTrustedAdvisorCheck` operation to refresh them, you might see
 * the `InvalidParameterValue` error.
 *
 * The response contains a TrustedAdvisorCheckRefreshStatus
 * object.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * To call the Trusted Advisor operations in
 * the Amazon Web Services Support API, you must use the US East (N. Virginia) endpoint. Currently, the US West (Oregon) and Europe (Ireland)
 * endpoints don't support the Trusted Advisor operations. For more information, see About the Amazon Web Services Support
 * API in the *Amazon Web Services Support User Guide*.
 */
export const refreshTrustedAdvisorCheck: API.OperationMethod<
  RefreshTrustedAdvisorCheckRequest,
  RefreshTrustedAdvisorCheckResponse,
  RefreshTrustedAdvisorCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<RefreshTrustedAdvisorCheckRequest>,
  output: __S(209, __c26, 1) as any as S.Schema<RefreshTrustedAdvisorCheckResponse>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RefreshTrustedAdvisorCheck",
}));

export type ResolveCaseError =
  | CaseIdNotFound
  | DryRunOperationException
  | InternalServerError
  | CommonErrors;
/**
 * Resolves a support case. This operation takes a `caseId` and returns the
 * initial and final state of the case.
 *
 * - You must have an Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan to use the Amazon Web Services Support
 * API. If you're in an Amazon Web Services Region that doesn't offer one of these Amazon Web Services Support plans, or if you haven't transitioned to one of these plans, you can use the Amazon Web Services Support API with a Business, Enterprise On-Ramp, or Enterprise Support plan.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have an
 * Amazon Web Services Business Support+, Amazon Web Services Enterprise Support, or Amazon Web Services Unified Operations plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const resolveCase: API.OperationMethod<
  ResolveCaseRequest,
  ResolveCaseResponse,
  ResolveCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<ResolveCaseRequest>,
  output: __S(217, __c27, 1) as any as S.Schema<ResolveCaseResponse>,
  errors: [CaseIdNotFound, DryRunOperationException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResolveCase",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reason: S.optional(S.String), resource: S.optional(S.String) }),
      ).annotate({ identifier: "ThrottlingReason" });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(16, __c2, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          attachmentSetId: S.optional(S.String),
          attachments: __S(8, __c1, 0),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddAttachmentsToSetRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ attachmentSetId: S.optional(S.String), expiryTime: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "AddAttachmentsToSetResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fileName: S.optional(S.String), data: S.optional(T.Blob) }),
      ).annotate({ identifier: "Attachment" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caseId: S.optional(S.String),
          communicationBody: S.String,
          ccEmailAddresses: S.optional(__S(32, __c4, 0)),
          attachmentSetId: S.optional(S.String),
          uploadIds: S.optional(__S(32, __c4, 0)),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddCommunicationToCaseRequest" });
    case 1:
      return S.suspend(() => S.Struct({ result: S.optional(S.Boolean) }).pipe(ns)).annotate({
        identifier: "AddCommunicationToCaseResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ partIndex: S.Number, eTag: S.String })).annotate({
        identifier: "CompletedUpload",
      });
    case 1:
      return S.Array(__S(40, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          uploadId: S.String,
          completedUploads: __S(41, __c5, 1),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CompleteAttachmentUploadRequest" });
    case 3:
      return S.suspend(() => S.Struct({ uploadStatus: S.String }).pipe(ns)).annotate({
        identifier: "CompleteAttachmentUploadResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subject: S.String,
          serviceCode: S.optional(S.String),
          severityCode: S.optional(S.String),
          categoryCode: S.optional(S.String),
          communicationBody: S.String,
          ccEmailAddresses: S.optional(__S(32, __c4, 0)),
          language: S.optional(S.String),
          issueType: S.optional(S.String),
          attachmentSetId: S.optional(S.String),
          uploadIds: S.optional(__S(32, __c4, 0)),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCaseRequest" });
    case 1:
      return S.suspend(() => S.Struct({ caseId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateCaseResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attachmentId: S.String, dryRun: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAttachmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ attachment: S.optional(__S(16, __c2, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeAttachmentResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ uploadId: S.String, dryRun: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAttachmentUploadStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ totalParts: S.optional(S.Number), completedPartsCount: S.optional(S.Number) }),
      ).annotate({ identifier: "UploadProgress" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          uploadStatus: S.String,
          fileName: S.String,
          uploadProgress: S.optional(__S(65, __c8, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAttachmentUploadStatusResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caseIdList: S.optional(__S(32, __c4, 0)),
          displayId: S.optional(S.String),
          afterTime: S.optional(S.String),
          beforeTime: S.optional(S.String),
          includeResolvedCases: S.optional(S.Boolean),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          language: S.optional(S.String),
          includeCommunications: S.optional(S.Boolean),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          communications: S.optional(__S(83, __c10, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecentCaseCommunications" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          caseId: S.optional(S.String),
          displayId: S.optional(S.String),
          subject: S.optional(S.String),
          status: S.optional(S.String),
          serviceCode: S.optional(S.String),
          categoryCode: S.optional(S.String),
          severityCode: S.optional(S.String),
          submittedBy: S.optional(S.String),
          timeCreated: S.optional(S.String),
          recentCommunications: S.optional(__S(73, __c9, 1)),
          ccEmailAddresses: S.optional(__S(32, __c4, 0)),
          language: S.optional(S.String),
        }),
      ).annotate({ identifier: "CaseDetails" });
    case 3:
      return S.Array(__S(74, __c9, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ cases: S.optional(__S(75, __c9, 3)), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DescribeCasesResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attachmentId: S.optional(S.String), fileName: S.optional(S.String) }),
      ).annotate({ identifier: "AttachmentDetails" });
    case 1:
      return S.Array(__S(80, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          caseId: S.optional(S.String),
          body: S.optional(S.String),
          submittedBy: S.optional(S.String),
          timeCreated: S.optional(S.String),
          attachments: S.optional(__S(81, __c10, 1)),
          attachmentSet: S.optional(__S(81, __c10, 1)),
        }),
      ).annotate({ identifier: "Communication" });
    case 3:
      return S.Array(__S(82, __c10, 2));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String,
          beforeTime: S.optional(S.String),
          afterTime: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCommunicationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          communications: S.optional(__S(83, __c10, 3)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeCommunicationsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          issueType: S.String,
          serviceCode: S.String,
          language: S.String,
          categoryCode: S.String,
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCreateCaseOptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ startTime: S.optional(S.String), endTime: S.optional(S.String) }),
      ).annotate({ identifier: "SupportedHour" });
    case 2:
      return S.Array(__S(97, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ startDateTime: S.optional(S.String), endDateTime: S.optional(S.String) }),
      ).annotate({ identifier: "DateInterval" });
    case 4:
      return S.Array(__S(99, __c12, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          supportedHours: S.optional(__S(98, __c12, 2)),
          datesWithoutSupport: S.optional(__S(100, __c12, 4)),
        }),
      ).annotate({ identifier: "CommunicationTypeOptions" });
    case 6:
      return S.Array(__S(101, __c12, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          languageAvailability: S.optional(S.String),
          communicationTypes: S.optional(__S(102, __c12, 6)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeCreateCaseOptionsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceCodeList: S.optional(__S(32, __c4, 0)),
          language: S.optional(S.String),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeServicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          code: S.optional(S.String),
          name: S.optional(S.String),
          categories: S.optional(__S(113, __c14, 1)),
        }),
      ).annotate({ identifier: "Service" });
    case 2:
      return S.Array(__S(105, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ services: S.optional(__S(106, __c13, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeServicesResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), name: S.optional(S.String) }),
      ).annotate({ identifier: "Category" });
    case 1:
      return S.Array(__S(112, __c14, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ language: S.optional(S.String), dryRun: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSeverityLevelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ severityLevels: S.optional(__S(113, __c14, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeSeverityLevelsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          issueType: S.String,
          serviceCode: S.String,
          categoryCode: S.String,
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSupportedLanguagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          code: S.optional(S.String),
          language: S.optional(S.String),
          display: S.optional(S.String),
        }),
      ).annotate({ identifier: "SupportedLanguage" });
    case 2:
      return S.Array(__S(129, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ supportedLanguages: S.optional(__S(130, __c16, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeSupportedLanguagesResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ checkIds: __S(144, __c18, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTrustedAdvisorCheckRefreshStatusesRequest" });
    case 1:
      return S.Array(__S(152, __c19, 0));
    case 2:
      return S.suspend(() => S.Struct({ statuses: __S(137, __c17, 1) }).pipe(ns)).annotate({
        identifier: "DescribeTrustedAdvisorCheckRefreshStatusesResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String).pipe(/*@__PURE__*/ T.Sparse());
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ checkId: S.String, status: S.String, millisUntilNextRefreshable: S.Number }),
      ).annotate({ identifier: "TrustedAdvisorCheckRefreshStatus" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ checkId: S.String, language: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTrustedAdvisorCheckResultRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          region: S.optional(S.String),
          resourceId: S.String,
          isSuppressed: S.optional(S.Boolean),
          metadata: __S(144, __c18, 0),
        }),
      ).annotate({ identifier: "TrustedAdvisorResourceDetail" });
    case 2:
      return S.Array(__S(161, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          checkId: S.String,
          timestamp: S.String,
          status: S.String,
          resourcesSummary: __S(168, __c21, 0),
          categorySpecificSummary: __S(170, __c21, 2),
          flaggedResources: __S(162, __c20, 2),
        }),
      ).annotate({ identifier: "TrustedAdvisorCheckResult" });
    case 4:
      return S.suspend(() =>
        S.Struct({ result: S.optional(__S(163, __c20, 3)) }).pipe(ns),
      ).annotate({ identifier: "DescribeTrustedAdvisorCheckResultResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourcesProcessed: S.Number,
          resourcesFlagged: S.Number,
          resourcesIgnored: S.Number,
          resourcesSuppressed: S.Number,
        }),
      ).annotate({ identifier: "TrustedAdvisorResourcesSummary" });
    case 1:
      return S.suspend(() =>
        S.Struct({ estimatedMonthlySavings: S.Number, estimatedPercentMonthlySavings: S.Number }),
      ).annotate({ identifier: "TrustedAdvisorCostOptimizingSummary" });
    case 2:
      return S.suspend(() => S.Struct({ costOptimizing: S.optional(__S(169, __c21, 1)) })).annotate(
        { identifier: "TrustedAdvisorCategorySpecificSummary" },
      );
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ language: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTrustedAdvisorChecksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          description: S.String,
          category: S.String,
          metadata: __S(144, __c18, 0),
        }),
      ).annotate({ identifier: "TrustedAdvisorCheckDescription" });
    case 2:
      return S.Array(__S(177, __c22, 1));
    case 3:
      return S.suspend(() => S.Struct({ checks: __S(178, __c22, 2) }).pipe(ns)).annotate({
        identifier: "DescribeTrustedAdvisorChecksResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ checkIds: __S(144, __c18, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTrustedAdvisorCheckSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          checkId: S.String,
          timestamp: S.String,
          status: S.String,
          hasFlaggedResources: S.optional(S.Boolean),
          resourcesSummary: __S(168, __c21, 0),
          categorySpecificSummary: __S(170, __c21, 2),
        }),
      ).annotate({ identifier: "TrustedAdvisorCheckSummary" });
    case 2:
      return S.Array(__S(185, __c23, 1));
    case 3:
      return S.suspend(() => S.Struct({ summaries: __S(186, __c23, 2) }).pipe(ns)).annotate({
        identifier: "DescribeTrustedAdvisorCheckSummariesResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attachmentId: S.String, dryRun: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAttachmentDownloadLinkRequest" });
    case 1:
      return S.suspend(() => S.Struct({ url: S.String, expiryDate: S.String })).annotate({
        identifier: "DownloadUrl",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ fileName: S.String, downloadUrl: __S(193, __c24, 1) }).pipe(ns),
      ).annotate({ identifier: "GetAttachmentDownloadLinkResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ startIndex: S.Number, endIndex: S.optional(S.Number) }),
      ).annotate({ identifier: "UploadRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fileName: S.String,
          fileSizeBytes: S.optional(S.Number),
          uploadId: S.optional(S.String),
          uploadRange: S.optional(__S(200, __c25, 0)),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAttachmentUploadLinksRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ url: S.String, partIndex: S.Number, expiryDate: S.String }),
      ).annotate({ identifier: "UploadUrl" });
    case 3:
      return S.Array(__S(202, __c25, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          uploadId: S.String,
          partSizeBytes: S.Number,
          totalParts: S.Number,
          nextIndex: S.optional(S.Number),
          uploadUrls: __S(203, __c25, 3),
        }).pipe(ns),
      ).annotate({ identifier: "GetAttachmentUploadLinksResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ checkId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RefreshTrustedAdvisorCheckRequest" });
    case 1:
      return S.suspend(() => S.Struct({ status: __S(152, __c19, 0) }).pipe(ns)).annotate({
        identifier: "RefreshTrustedAdvisorCheckResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ caseId: S.optional(S.String), dryRun: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResolveCaseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          initialCaseStatus: S.optional(S.String),
          finalCaseStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ResolveCaseResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
