import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Support",
  target: "AWSSupport_20130415",
  version: "2013-04-15",
  sigv4: "support",
  protocol: awsJson1_1Protocol,
  xmlns: "http://support.amazonaws.com/doc/2013-04-15/",
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
    const _p0 = () => ({
      authSchemes: [
        {
          name: "sigv4",
          signingName: "support",
          signingRegion: "us-gov-west-1",
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://support.us-east-1.amazonaws.com",
              {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "support",
                    signingRegion: "us-east-1",
                  },
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
                  {
                    name: "sigv4",
                    signingName: "support",
                    signingRegion: "cn-north-1",
                  },
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
                  {
                    name: "sigv4",
                    signingName: "support",
                    signingRegion: "us-iso-east-1",
                  },
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
                  {
                    name: "sigv4",
                    signingName: "support",
                    signingRegion: "us-isob-east-1",
                  },
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
              return e(
                `https://support-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://support.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://support.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AttachmentIdNotFound
  extends /*@__PURE__*/ TE.TaggedError("AttachmentIdNotFound")<{
    readonly message?: string;
  }> {}
export class AttachmentLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("AttachmentLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class AttachmentSetExpired
  extends /*@__PURE__*/ TE.TaggedError("AttachmentSetExpired")<{
    readonly message?: string;
  }> {}
export class AttachmentSetIdNotFound
  extends /*@__PURE__*/ TE.TaggedError("AttachmentSetIdNotFound")<{
    readonly message?: string;
  }> {}
export class AttachmentSetSizeLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("AttachmentSetSizeLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class CaseCreationLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("CaseCreationLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class CaseIdNotFound
  extends /*@__PURE__*/ TE.TaggedError("CaseIdNotFound")<{
    readonly message?: string;
  }> {}
export class DescribeAttachmentLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("DescribeAttachmentLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError")<{
    readonly message?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["BadRequestError"],
    { code: "Throttling", status: 400 },
  )<{ readonly message?: string }> {}
export type AttachmentSetId = string;
export type FileName = string;
export type Data = Uint8Array;
export interface Attachment {
  fileName?: string;
  data?: Uint8Array;
}
export type Attachments = Attachment[];
export interface AddAttachmentsToSetRequest {
  attachmentSetId?: string;
  attachments: Attachment[];
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
export interface AddCommunicationToCaseRequest {
  caseId?: string;
  communicationBody: string;
  ccEmailAddresses?: string[];
  attachmentSetId?: string;
}
export type Result = boolean;
export interface AddCommunicationToCaseResponse {
  result?: boolean;
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
}
export interface CreateCaseResponse {
  caseId?: string;
}
export type AttachmentId = string;
export interface DescribeAttachmentRequest {
  attachmentId: string;
}
export interface DescribeAttachmentResponse {
  attachment?: Attachment;
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
export type TrustedAdvisorCheckRefreshStatusList =
  TrustedAdvisorCheckRefreshStatus[];
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
export interface RefreshTrustedAdvisorCheckRequest {
  checkId: string;
}
export interface RefreshTrustedAdvisorCheckResponse {
  status: TrustedAdvisorCheckRefreshStatus;
}
export interface ResolveCaseRequest {
  caseId?: string;
}
export type CaseStatus = string;
export interface ResolveCaseResponse {
  initialCaseStatus?: string;
  finalCaseStatus?: string;
}
export type ErrorMessage = string;
export type AvailabilityErrorMessage = string;
export type AddAttachmentsToSetError =
  | AttachmentLimitExceeded
  | AttachmentSetExpired
  | AttachmentSetIdNotFound
  | AttachmentSetSizeLimitExceeded
  | InternalServerError
  | CommonErrors;
/**
 * Adds one or more attachments to an attachment set.
 *
 * An attachment set is a temporary container for attachments that you add to a case or
 * case communication. The set is available for 1 hour after it's created. The
 * `expiryTime` returned in the response is when the set expires.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const addAttachmentsToSet: API.OperationMethod<
  AddAttachmentsToSetRequest,
  AddAttachmentsToSetResponse,
  AddAttachmentsToSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      attachmentSetId: 0,
      attachments: D.list({ fileName: 0, data: 0 }),
    },
  },
  errors: [
    AttachmentLimitExceeded,
    AttachmentSetExpired,
    AttachmentSetIdNotFound,
    AttachmentSetSizeLimitExceeded,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddAttachmentsToSet",
})) as any;

export type AddCommunicationToCaseError =
  | AttachmentSetExpired
  | AttachmentSetIdNotFound
  | CaseIdNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Adds additional customer communication to an Amazon Web Services Support case. Use the `caseId`
 * parameter to identify the case to which to add communication. You can list a set of
 * email addresses to copy on the communication by using the `ccEmailAddresses`
 * parameter. The `communicationBody` value contains the text of the
 * communication.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const addCommunicationToCase: API.OperationMethod<
  AddCommunicationToCaseRequest,
  AddCommunicationToCaseResponse,
  AddCommunicationToCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      caseId: 0,
      communicationBody: 0,
      ccEmailAddresses: 0,
      attachmentSetId: 0,
    },
  },
  errors: [
    AttachmentSetExpired,
    AttachmentSetIdNotFound,
    CaseIdNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddCommunicationToCase",
})) as any;

export type CreateCaseError =
  | AttachmentSetExpired
  | AttachmentSetIdNotFound
  | CaseCreationLimitExceeded
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
 * A successful `CreateCase` request returns an Amazon Web Services Support case number. You can use
 * the DescribeCases operation and specify the case number to get
 * existing Amazon Web Services Support cases. After you create a case, use the AddCommunicationToCase operation to add additional communication or
 * attachments to an existing case.
 *
 * The `caseId` is separate from the `displayId` that appears in
 * the Amazon Web Services Support Center. Use the DescribeCases operation to get the `displayId`.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const createCase: API.OperationMethod<
  CreateCaseRequest,
  CreateCaseResponse,
  CreateCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      subject: 0,
      serviceCode: 0,
      severityCode: 0,
      categoryCode: 0,
      communicationBody: 0,
      ccEmailAddresses: 0,
      language: 0,
      issueType: 0,
      attachmentSetId: 0,
    },
  },
  errors: [
    AttachmentSetExpired,
    AttachmentSetIdNotFound,
    CaseCreationLimitExceeded,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCase",
})) as any;

export type DescribeAttachmentError =
  | AttachmentIdNotFound
  | DescribeAttachmentLimitExceeded
  | InternalServerError
  | CommonErrors;
/**
 * Returns the attachment that has the specified ID. Attachments can include screenshots,
 * error logs, or other files that describe your issue. Attachment IDs are generated by the
 * case management system when you add an attachment to a case or case communication.
 * Attachment IDs are returned in the AttachmentDetails objects that are
 * returned by the DescribeCommunications operation.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeAttachment: API.OperationMethod<
  DescribeAttachmentRequest,
  DescribeAttachmentResponse,
  DescribeAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { attachmentId: 0 },
    output: { attachment: { data: D.blob } },
  },
  errors: [
    AttachmentIdNotFound,
    DescribeAttachmentLimitExceeded,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAttachment",
})) as any;

export type DescribeCasesError =
  | CaseIdNotFound
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
 * Case data is available for 12 months after creation. If a case was created more than
 * 12 months ago, a request might return an error.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeCases: API.PaginatedOperationMethod<
  DescribeCasesRequest,
  DescribeCasesResponse,
  DescribeCasesError,
  Credentials | HttpClient.HttpClient,
  CaseDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      caseIdList: 0,
      displayId: 0,
      afterTime: 0,
      beforeTime: 0,
      includeResolvedCases: 0,
      nextToken: 0,
      maxResults: 0,
      language: 0,
      includeCommunications: 0,
    },
  },
  errors: [CaseIdNotFound, InternalServerError],
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
  | InternalServerError
  | CommonErrors;
/**
 * Returns communications and attachments for one or more support cases. Use the
 * `afterTime` and `beforeTime` parameters to filter by date. You
 * can use the `caseId` parameter to restrict the results to a specific
 * case.
 *
 * Case data is available for 12 months after creation. If a case was created more than
 * 12 months ago, a request for data might cause an error.
 *
 * You can use the `maxResults` and `nextToken` parameters to
 * control the pagination of the results. Set `maxResults` to the number of
 * cases that you want to display on each page, and use `nextToken` to specify
 * the resumption of pagination.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeCommunications: API.PaginatedOperationMethod<
  DescribeCommunicationsRequest,
  DescribeCommunicationsResponse,
  DescribeCommunicationsError,
  Credentials | HttpClient.HttpClient,
  Communication
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      caseId: 0,
      beforeTime: 0,
      afterTime: 0,
      nextToken: 0,
      maxResults: 0,
    },
  },
  errors: [CaseIdNotFound, InternalServerError],
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
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of CreateCaseOption types along with the
 * corresponding supported hours and language availability. You can specify the `language`
 * `categoryCode`,
 * `issueType` and `serviceCode` used to retrieve the CreateCaseOptions.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeCreateCaseOptions: API.OperationMethod<
  DescribeCreateCaseOptionsRequest,
  DescribeCreateCaseOptionsResponse,
  DescribeCreateCaseOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { issueType: 0, serviceCode: 0, language: 0, categoryCode: 0 },
  },
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCreateCaseOptions",
})) as any;

export type DescribeServicesError = InternalServerError | CommonErrors;
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
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeServices: API.OperationMethod<
  DescribeServicesRequest,
  DescribeServicesResponse,
  DescribeServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { serviceCodeList: 0, language: 0 } },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServices",
})) as any;

export type DescribeSeverityLevelsError = InternalServerError | CommonErrors;
/**
 * Returns the list of severity levels that you can assign to a support case. The
 * severity level for a case is also a field in the CaseDetails data type
 * that you include for a CreateCase request.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeSeverityLevels: API.OperationMethod<
  DescribeSeverityLevelsRequest,
  DescribeSeverityLevelsResponse,
  DescribeSeverityLevelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { language: 0 } },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSeverityLevels",
})) as any;

export type DescribeSupportedLanguagesError =
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of supported languages for a specified `categoryCode`,
 * `issueType` and `serviceCode`. The returned supported languages will
 * include a ISO 639-1 code for the `language`, and the language display name.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeSupportedLanguages: API.OperationMethod<
  DescribeSupportedLanguagesRequest,
  DescribeSupportedLanguagesResponse,
  DescribeSupportedLanguagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { issueType: 0, serviceCode: 0, categoryCode: 0 },
  },
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSupportedLanguages",
})) as any;

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
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
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
  descriptor: { service: svc, input: { checkIds: 0 } },
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorCheckRefreshStatuses",
})) as any;

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
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
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
  descriptor: { service: svc, input: { checkId: 0, language: 0 } },
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorCheckResult",
})) as any;

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
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the `SubscriptionRequiredException` error
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
  descriptor: { service: svc, input: { language: 0 } },
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorChecks",
})) as any;

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
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * To call the Trusted Advisor operations in
 * the Amazon Web Services Support API, you must use the US East (N. Virginia) endpoint. Currently, the US West (Oregon) and Europe (Ireland)
 * endpoints don't support the Trusted Advisor operations. For more information, see About the Amazon Web Services Support
 * API in the *Amazon Web Services Support User Guide*.
 */
export const describeTrustedAdvisorCheckSummaries: API.OperationMethod<
  DescribeTrustedAdvisorCheckSummariesRequest,
  DescribeTrustedAdvisorCheckSummariesResponse,
  DescribeTrustedAdvisorCheckSummariesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { checkIds: 0 } },
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorCheckSummaries",
})) as any;

export type RefreshTrustedAdvisorCheckError =
  | InternalServerError
  | CommonErrors;
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
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
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
  descriptor: { service: svc, input: { checkId: 0 } },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RefreshTrustedAdvisorCheck",
})) as any;

export type ResolveCaseError =
  | CaseIdNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Resolves a support case. This operation takes a `caseId` and returns the
 * initial and final state of the case.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const resolveCase: API.OperationMethod<
  ResolveCaseRequest,
  ResolveCaseResponse,
  ResolveCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { caseId: 0 } },
  errors: [CaseIdNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResolveCase",
})) as any;
