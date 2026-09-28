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
  sdkId: "Security IR",
  target: "SecurityIncidentResponse",
  version: "2018-05-10",
  sigv4: "security-ir",
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
              `https://security-ir-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://security-ir.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
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
export type MembershipId = string;
export type AWSAccountId = string;
export type AWSAccountIds = string[];
export interface BatchGetMemberAccountDetailsRequest {
  membershipId: string;
  accountIds: string[];
}
export type MembershipAccountRelationshipStatus =
  | "Associated"
  | "Disassociated"
  | "Unassociated"
  | (string & {});
export type MembershipAccountRelationshipType =
  | "Organization"
  | "Unrelated"
  | (string & {});
export interface GetMembershipAccountDetailItem {
  accountId?: string;
  relationshipStatus?: MembershipAccountRelationshipStatus;
  relationshipType?: MembershipAccountRelationshipType;
}
export type GetMembershipAccountDetailItems = GetMembershipAccountDetailItem[];
export interface GetMembershipAccountDetailError {
  accountId: string;
  error: string;
  message: string;
}
export type GetMembershipAccountDetailErrors =
  GetMembershipAccountDetailError[];
export interface BatchGetMemberAccountDetailsResponse {
  items?: GetMembershipAccountDetailItem[];
  errors?: GetMembershipAccountDetailError[];
}
export interface CancelMembershipRequest {
  membershipId: string;
}
export interface CancelMembershipResponse {
  membershipId: string;
}
export type CaseId = string;
export interface CloseCaseRequest {
  caseId: string;
}
export type CaseStatus =
  | "Submitted"
  | "Acknowledged"
  | "Detection and Analysis"
  | "Containment, Eradication and Recovery"
  | "Post-incident Activities"
  | "Ready to Close"
  | "Closed"
  | (string & {});
export interface CloseCaseResponse {
  caseStatus?: CaseStatus;
  closedDate?: Date;
}
export type ResolverType = "AWS" | "Self" | (string & {});
export type CaseTitle = string | redacted.Redacted<string>;
export type CaseDescription = string | redacted.Redacted<string>;
export type EngagementType =
  | "Security Incident"
  | "Investigation"
  | (string & {});
export type ImpactedAccounts = string[];
export type EmailAddress = string | redacted.Redacted<string>;
export type PersonName = string | redacted.Redacted<string>;
export type JobTitle = string | redacted.Redacted<string>;
export interface Watcher {
  email: string | redacted.Redacted<string>;
  name?: string | redacted.Redacted<string>;
  jobTitle?: string | redacted.Redacted<string>;
}
export type Watchers = Watcher[];
export type IPAddress = string | redacted.Redacted<string>;
export type UserAgent = string;
export interface ThreatActorIp {
  ipAddress: string | redacted.Redacted<string>;
  userAgent?: string;
}
export type ThreatActorIpList = ThreatActorIp[];
export type AwsService = string;
export type ImpactedServicesList = string[];
export type AwsRegion =
  | "af-south-1"
  | "ap-east-1"
  | "ap-east-2"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-northeast-3"
  | "ap-south-1"
  | "ap-south-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-southeast-4"
  | "ap-southeast-5"
  | "ap-southeast-6"
  | "ap-southeast-7"
  | "ca-central-1"
  | "ca-west-1"
  | "cn-north-1"
  | "cn-northwest-1"
  | "eu-central-1"
  | "eu-central-2"
  | "eu-north-1"
  | "eu-south-1"
  | "eu-south-2"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "il-central-1"
  | "me-central-1"
  | "me-south-1"
  | "mx-central-1"
  | "sa-east-1"
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | (string & {});
export interface ImpactedAwsRegion {
  region: AwsRegion;
}
export type ImpactedAwsRegionList = ImpactedAwsRegion[];
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateCaseRequest {
  clientToken?: string;
  resolverType: ResolverType;
  title: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
  engagementType: EngagementType;
  reportedIncidentStartDate: Date;
  impactedAccounts: string[];
  watchers: Watcher[];
  threatActorIpAddresses?: ThreatActorIp[];
  impactedServices?: string[];
  impactedAwsRegions?: ImpactedAwsRegion[];
  tags?: { [key: string]: string | undefined };
}
export interface CreateCaseResponse {
  caseId: string;
}
export type CommentBody = string | redacted.Redacted<string>;
export interface CreateCaseCommentRequest {
  caseId: string;
  clientToken?: string;
  body: string | redacted.Redacted<string>;
}
export type CommentId = string;
export interface CreateCaseCommentResponse {
  commentId: string;
}
export type MembershipName = string | redacted.Redacted<string>;
export type IncidentResponderName = string | redacted.Redacted<string>;
export type CommunicationType =
  | "Case Created"
  | "Case Updated"
  | "Case Acknowledged"
  | "Case Closed"
  | "Case Updated To Service Managed"
  | "Case Status Updated"
  | "Case Pending Customer Action Reminder"
  | "Case Attachment Url Uploaded"
  | "Case Comment Added"
  | "Case Comment Updated"
  | "Membership Created"
  | "Membership Updated"
  | "Membership Cancelled"
  | "Register Delegated Administrator"
  | "Deregister Delegated Administrator"
  | "Disable AWS Service Access"
  | (string & {});
export type CommunicationPreferences = CommunicationType[];
export interface IncidentResponder {
  name: string | redacted.Redacted<string>;
  jobTitle: string | redacted.Redacted<string>;
  email: string | redacted.Redacted<string>;
  communicationPreferences?: CommunicationType[];
}
export type IncidentResponseTeam = IncidentResponder[];
export type OptInFeatureName = "Triage" | (string & {});
export interface OptInFeature {
  featureName: OptInFeatureName;
  isEnabled: boolean;
}
export type OptInFeatures = OptInFeature[];
export interface CreateMembershipRequest {
  clientToken?: string;
  membershipName: string | redacted.Redacted<string>;
  incidentResponseTeam: IncidentResponder[];
  optInFeatures?: OptInFeature[];
  tags?: { [key: string]: string | undefined };
  coverEntireOrganization?: boolean;
}
export interface CreateMembershipResponse {
  membershipId: string;
}
export interface GetCaseRequest {
  caseId: string;
}
export type CaseArn = string;
export type PendingAction = "Customer" | "None" | (string & {});
export type ClosureCode =
  | "Investigation Completed"
  | "Not Resolved"
  | "False Positive"
  | "Duplicate"
  | (string & {});
export type AttachmentId = string;
export type FileName = string | redacted.Redacted<string>;
export type CaseAttachmentStatus =
  | "Verified"
  | "Failed"
  | "Pending"
  | (string & {});
export type PrincipalId = string;
export interface CaseAttachmentAttributes {
  attachmentId: string;
  fileName: string | redacted.Redacted<string>;
  attachmentStatus: CaseAttachmentStatus;
  creator: string;
  createdDate: Date;
}
export type CaseAttachmentsList = CaseAttachmentAttributes[];
export interface CaseMetadataEntry {
  key: string;
  value: string;
}
export type CaseMetadata = CaseMetadataEntry[];
export interface GetCaseResponse {
  title?: string | redacted.Redacted<string>;
  caseArn?: string;
  description?: string | redacted.Redacted<string>;
  caseStatus?: CaseStatus;
  engagementType?: EngagementType;
  reportedIncidentStartDate?: Date;
  actualIncidentStartDate?: Date;
  impactedAwsRegions?: ImpactedAwsRegion[];
  threatActorIpAddresses?: ThreatActorIp[];
  pendingAction?: PendingAction;
  impactedAccounts?: string[];
  watchers?: Watcher[];
  createdDate?: Date;
  lastUpdatedDate?: Date;
  closureCode?: ClosureCode;
  resolverType?: ResolverType;
  impactedServices?: string[];
  caseAttachments?: CaseAttachmentAttributes[];
  closedDate?: Date;
  caseMetadata?: CaseMetadataEntry[];
}
export interface GetCaseAttachmentDownloadUrlRequest {
  caseId: string;
  attachmentId: string;
}
export type Url = string | redacted.Redacted<string>;
export interface GetCaseAttachmentDownloadUrlResponse {
  attachmentPresignedUrl: string | redacted.Redacted<string>;
}
export type ContentLength = number;
export interface GetCaseAttachmentUploadUrlRequest {
  caseId: string;
  fileName: string | redacted.Redacted<string>;
  contentLength: number;
  clientToken?: string;
}
export interface GetCaseAttachmentUploadUrlResponse {
  attachmentPresignedUrl: string | redacted.Redacted<string>;
}
export interface GetMembershipRequest {
  membershipId: string;
}
export type MembershipArn = string;
export type MembershipStatus =
  | "Active"
  | "Cancelled"
  | "Terminated"
  | (string & {});
export type CustomerType = "Standalone" | "Organization" | (string & {});
export type OrganizationalUnitId = string;
export type OrganizationalUnits = string[];
export interface MembershipAccountsConfigurations {
  coverEntireOrganization?: boolean;
  organizationalUnits?: string[];
}
export interface GetMembershipResponse {
  membershipId: string;
  accountId?: string;
  region?: AwsRegion;
  membershipName?: string | redacted.Redacted<string>;
  membershipArn?: string;
  membershipStatus?: MembershipStatus;
  membershipActivationTimestamp?: Date;
  membershipDeactivationTimestamp?: Date;
  customerType?: CustomerType;
  numberOfAccountsCovered?: number;
  incidentResponseTeam?: IncidentResponder[];
  optInFeatures?: OptInFeature[];
  membershipAccountsConfigurations?: MembershipAccountsConfigurations;
}
export interface ListCaseEditsRequest {
  nextToken?: string;
  maxResults?: number;
  caseId: string;
}
export type CaseEditAction = string;
export type CaseEditMessage = string;
export interface CaseEditItem {
  eventTimestamp?: Date;
  principal?: string;
  action?: string;
  message?: string;
}
export type CaseEditItems = CaseEditItem[];
export interface ListCaseEditsResponse {
  nextToken?: string;
  items?: CaseEditItem[];
  total?: number;
}
export interface ListCasesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ListCasesItem {
  caseId: string;
  lastUpdatedDate?: Date;
  title?: string | redacted.Redacted<string>;
  caseArn?: string;
  engagementType?: EngagementType;
  caseStatus?: CaseStatus;
  createdDate?: Date;
  closedDate?: Date;
  resolverType?: ResolverType;
  pendingAction?: PendingAction;
}
export type ListCasesItems = ListCasesItem[];
export interface ListCasesResponse {
  nextToken?: string;
  items?: ListCasesItem[];
  total?: number;
}
export interface ListCommentsRequest {
  nextToken?: string;
  maxResults?: number;
  caseId: string;
}
export interface ListCommentsItem {
  commentId: string;
  createdDate?: Date;
  lastUpdatedDate?: Date;
  creator?: string;
  lastUpdatedBy?: string;
  body?: string | redacted.Redacted<string>;
}
export type ListCommentsItems = ListCommentsItem[];
export interface ListCommentsResponse {
  nextToken?: string;
  items?: ListCommentsItem[];
  total?: number;
}
export interface ListInvestigationsRequest {
  nextToken?: string;
  maxResults?: number;
  caseId: string;
}
export type InvestigationId = string;
export type ActionType =
  | "Evidence"
  | "Investigation"
  | "Summarization"
  | (string & {});
export type InvestigationTitle = string;
export type InvestigationContent = string;
export type ExecutionStatus =
  | "Pending"
  | "InProgress"
  | "Waiting"
  | "Completed"
  | "Failed"
  | "Cancelled"
  | (string & {});
export type UsefulnessRating = "USEFUL" | "NOT_USEFUL" | (string & {});
export type FeedbackComment = string;
export interface InvestigationFeedback {
  usefulness?: UsefulnessRating;
  comment?: string;
  submittedAt?: Date;
}
export interface InvestigationAction {
  investigationId: string;
  actionType: ActionType;
  title: string;
  content: string;
  status: ExecutionStatus;
  lastUpdated: Date;
  feedback?: InvestigationFeedback;
}
export type InvestigationActionList = InvestigationAction[];
export interface ListInvestigationsResponse {
  nextToken?: string;
  investigationActions: InvestigationAction[];
}
export interface ListMembershipsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ListMembershipItem {
  membershipId: string;
  accountId?: string;
  region?: AwsRegion;
  membershipArn?: string;
  membershipStatus?: MembershipStatus;
}
export type ListMembershipItems = ListMembershipItem[];
export interface ListMembershipsResponse {
  nextToken?: string;
  items?: ListMembershipItem[];
}
export type Arn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags: { [key: string]: string | undefined };
}
export type ResultId = string;
export interface SendFeedbackRequest {
  caseId: string;
  resultId: string;
  usefulness: UsefulnessRating;
  comment?: string;
}
export interface SendFeedbackResponse {}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeys = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateCaseRequest {
  caseId: string;
  title?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  reportedIncidentStartDate?: Date;
  actualIncidentStartDate?: Date;
  engagementType?: EngagementType;
  watchersToAdd?: Watcher[];
  watchersToDelete?: Watcher[];
  threatActorIpAddressesToAdd?: ThreatActorIp[];
  threatActorIpAddressesToDelete?: ThreatActorIp[];
  impactedServicesToAdd?: string[];
  impactedServicesToDelete?: string[];
  impactedAwsRegionsToAdd?: ImpactedAwsRegion[];
  impactedAwsRegionsToDelete?: ImpactedAwsRegion[];
  impactedAccountsToAdd?: string[];
  impactedAccountsToDelete?: string[];
  caseMetadata?: CaseMetadataEntry[];
}
export interface UpdateCaseResponse {}
export interface UpdateCaseCommentRequest {
  caseId: string;
  commentId: string;
  body: string | redacted.Redacted<string>;
}
export interface UpdateCaseCommentResponse {
  commentId: string;
  body?: string | redacted.Redacted<string>;
}
export type SelfManagedCaseStatus =
  | "Submitted"
  | "Detection and Analysis"
  | "Containment, Eradication and Recovery"
  | "Post-incident Activities"
  | (string & {});
export interface UpdateCaseStatusRequest {
  caseId: string;
  caseStatus: SelfManagedCaseStatus;
}
export interface UpdateCaseStatusResponse {
  caseStatus?: SelfManagedCaseStatus;
}
export interface MembershipAccountsConfigurationsUpdate {
  coverEntireOrganization?: boolean;
  organizationalUnitsToAdd?: string[];
  organizationalUnitsToRemove?: string[];
}
export interface UpdateMembershipRequest {
  membershipId: string;
  membershipName?: string | redacted.Redacted<string>;
  incidentResponseTeam?: IncidentResponder[];
  optInFeatures?: OptInFeature[];
  membershipAccountsConfigurationsUpdate?: MembershipAccountsConfigurationsUpdate;
  undoMembershipCancellation?: boolean;
}
export interface UpdateMembershipResponse {}
export interface UpdateResolverTypeRequest {
  caseId: string;
  resolverType: ResolverType;
}
export interface UpdateResolverTypeResponse {
  caseId: string;
  caseStatus?: CaseStatus;
  resolverType?: ResolverType;
}
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type BatchGetMemberAccountDetailsError = CommonErrors;
/**
 * Provides information on whether the supplied account IDs are associated with a membership.
 *
 * AWS account ID's may appear less than 12 characters and need to be zero-prepended. An example would be `123123123` which is nine digits, and with zero-prepend would be `000123123123`. Not zero-prepending to 12 digits could result in errors.
 */
export const batchGetMemberAccountDetails: API.OperationMethod<
  BatchGetMemberAccountDetailsRequest,
  BatchGetMemberAccountDetailsResponse,
  BatchGetMemberAccountDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/membership/{membershipId}/batch-member-details",
    input: { membershipId: 0, accountIds: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMemberAccountDetails",
})) as any;

export type CancelMembershipError = CommonErrors;
/**
 * Cancels an existing membership.
 */
export const cancelMembership: API.OperationMethod<
  CancelMembershipRequest,
  CancelMembershipResponse,
  CancelMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/membership/{membershipId}",
    input: { membershipId: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMembership",
})) as any;

export type CloseCaseError = CommonErrors;
/**
 * Closes an existing case.
 */
export const closeCase: API.OperationMethod<
  CloseCaseRequest,
  CloseCaseResponse,
  CloseCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/cases/{caseId}/close-case",
    input: { caseId: 0 },
    output: { closedDate: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloseCase",
})) as any;

export type CreateCaseError = CommonErrors;
/**
 * Creates a new case.
 */
export const createCase: API.OperationMethod<
  CreateCaseRequest,
  CreateCaseResponse,
  CreateCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/create-case",
    input: {
      clientToken: D.m({ idempotency: true }),
      resolverType: 0,
      title: 0,
      description: 0,
      engagementType: 0,
      reportedIncidentStartDate: 0,
      impactedAccounts: 0,
      watchers: D.list(i_Watcher),
      threatActorIpAddresses: D.list(i_ThreatActorIp),
      impactedServices: 0,
      impactedAwsRegions: D.list(i_ImpactedAwsRegion),
      tags: 0,
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCase",
})) as any;

export type CreateCaseCommentError = CommonErrors;
/**
 * Adds a comment to an existing case.
 */
export const createCaseComment: API.OperationMethod<
  CreateCaseCommentRequest,
  CreateCaseCommentResponse,
  CreateCaseCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/cases/{caseId}/create-comment",
    input: { caseId: 0, clientToken: D.m({ idempotency: true }), body: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCaseComment",
})) as any;

export type CreateMembershipError = CommonErrors;
/**
 * Creates a new membership.
 */
export const createMembership: API.OperationMethod<
  CreateMembershipRequest,
  CreateMembershipResponse,
  CreateMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/membership",
    input: {
      clientToken: D.m({ idempotency: true }),
      membershipName: 0,
      incidentResponseTeam: D.list(i_IncidentResponder),
      optInFeatures: D.list(i_OptInFeature),
      tags: 0,
      coverEntireOrganization: 0,
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembership",
})) as any;

export type GetCaseError = CommonErrors;
/**
 * Returns the attributes of a case.
 */
export const getCase: API.OperationMethod<
  GetCaseRequest,
  GetCaseResponse,
  GetCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/cases/{caseId}/get-case",
    input: { caseId: 0 },
    output: {
      title: D.secret,
      description: D.secret,
      reportedIncidentStartDate: D.ts,
      actualIncidentStartDate: D.ts,
      threatActorIpAddresses: D.list({ ipAddress: D.secret }),
      watchers: D.list({ email: D.secret, name: D.secret, jobTitle: D.secret }),
      createdDate: D.ts,
      lastUpdatedDate: D.ts,
      caseAttachments: D.list({ fileName: D.secret, createdDate: D.ts }),
      closedDate: D.ts,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCase",
})) as any;

export type GetCaseAttachmentDownloadUrlError = CommonErrors;
/**
 * Returns a Pre-Signed URL for uploading attachments into a case.
 */
export const getCaseAttachmentDownloadUrl: API.OperationMethod<
  GetCaseAttachmentDownloadUrlRequest,
  GetCaseAttachmentDownloadUrlResponse,
  GetCaseAttachmentDownloadUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/cases/{caseId}/get-presigned-url/{attachmentId}",
    input: { caseId: 0, attachmentId: 0 },
    output: { attachmentPresignedUrl: D.secret },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCaseAttachmentDownloadUrl",
})) as any;

export type GetCaseAttachmentUploadUrlError = CommonErrors;
/**
 * Uploads an attachment to a case.
 */
export const getCaseAttachmentUploadUrl: API.OperationMethod<
  GetCaseAttachmentUploadUrlRequest,
  GetCaseAttachmentUploadUrlResponse,
  GetCaseAttachmentUploadUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/cases/{caseId}/get-presigned-url",
    input: {
      caseId: 0,
      fileName: 0,
      contentLength: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { attachmentPresignedUrl: D.secret },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCaseAttachmentUploadUrl",
})) as any;

export type GetMembershipError = CommonErrors;
/**
 * Returns the attributes of a membership.
 */
export const getMembership: API.OperationMethod<
  GetMembershipRequest,
  GetMembershipResponse,
  GetMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/membership/{membershipId}",
    input: { membershipId: 0 },
    output: {
      membershipName: D.secret,
      membershipActivationTimestamp: D.ts,
      membershipDeactivationTimestamp: D.ts,
      incidentResponseTeam: D.list({
        name: D.secret,
        jobTitle: D.secret,
        email: D.secret,
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembership",
})) as any;

export type ListCaseEditsError = CommonErrors;
/**
 * Views the case history for edits made to a designated case.
 */
export const listCaseEdits: API.PaginatedOperationMethod<
  ListCaseEditsRequest,
  ListCaseEditsResponse,
  ListCaseEditsError,
  Credentials | HttpClient.HttpClient,
  CaseEditItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/cases/{caseId}/list-case-edits",
    input: { nextToken: 0, maxResults: 0, caseId: 0 },
    output: { items: D.list({ eventTimestamp: D.ts }) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCaseEdits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCasesError = CommonErrors;
/**
 * Lists all cases the requester has access to.
 */
export const listCases: API.PaginatedOperationMethod<
  ListCasesRequest,
  ListCasesResponse,
  ListCasesError,
  Credentials | HttpClient.HttpClient,
  ListCasesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/list-cases",
    input: { nextToken: 0, maxResults: 0 },
    output: {
      items: D.list({
        lastUpdatedDate: D.ts,
        title: D.secret,
        createdDate: D.ts,
        closedDate: D.ts,
      }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCommentsError = CommonErrors;
/**
 * Returns comments for a designated case.
 */
export const listComments: API.PaginatedOperationMethod<
  ListCommentsRequest,
  ListCommentsResponse,
  ListCommentsError,
  Credentials | HttpClient.HttpClient,
  ListCommentsItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/cases/{caseId}/list-comments",
    input: { nextToken: 0, maxResults: 0, caseId: 0 },
    output: {
      items: D.list({
        createdDate: D.ts,
        lastUpdatedDate: D.ts,
        body: D.secret,
      }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInvestigationsError = CommonErrors;
/**
 * Investigation performed by an agent for a security incident...
 */
export const listInvestigations: API.PaginatedOperationMethod<
  ListInvestigationsRequest,
  ListInvestigationsResponse,
  ListInvestigationsError,
  Credentials | HttpClient.HttpClient,
  InvestigationAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/cases/{caseId}/list-investigations",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      caseId: 0,
    },
    output: {
      investigationActions: D.list({
        lastUpdated: D.ts,
        feedback: { submittedAt: D.ts },
      }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvestigations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "investigationActions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMembershipsError = CommonErrors;
/**
 * Returns the memberships that the calling principal can access.
 */
export const listMemberships: API.PaginatedOperationMethod<
  ListMembershipsRequest,
  ListMembershipsResponse,
  ListMembershipsError,
  Credentials | HttpClient.HttpClient,
  ListMembershipItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/memberships",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemberships",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns currently configured tags on a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type SendFeedbackError = CommonErrors;
/**
 * Send feedback based on response investigation action
 */
export const sendFeedback: API.OperationMethod<
  SendFeedbackRequest,
  SendFeedbackResponse,
  SendFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/cases/{caseId}/feedback/{resultId}/send-feedback",
    input: { caseId: 0, resultId: 0, usefulness: 0, comment: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendFeedback",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a tag(s) to a designated resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag(s) from a designate resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateCaseError = CommonErrors;
/**
 * Updates an existing case.
 */
export const updateCase: API.OperationMethod<
  UpdateCaseRequest,
  UpdateCaseResponse,
  UpdateCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/cases/{caseId}/update-case",
    input: {
      caseId: 0,
      title: 0,
      description: 0,
      reportedIncidentStartDate: 0,
      actualIncidentStartDate: 0,
      engagementType: 0,
      watchersToAdd: D.list(i_Watcher),
      watchersToDelete: D.list(i_Watcher),
      threatActorIpAddressesToAdd: D.list(i_ThreatActorIp),
      threatActorIpAddressesToDelete: D.list(i_ThreatActorIp),
      impactedServicesToAdd: 0,
      impactedServicesToDelete: 0,
      impactedAwsRegionsToAdd: D.list(i_ImpactedAwsRegion),
      impactedAwsRegionsToDelete: D.list(i_ImpactedAwsRegion),
      impactedAccountsToAdd: 0,
      impactedAccountsToDelete: 0,
      caseMetadata: D.list({ key: 0, value: 0 }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCase",
})) as any;

export type UpdateCaseCommentError = CommonErrors;
/**
 * Updates an existing case comment.
 */
export const updateCaseComment: API.OperationMethod<
  UpdateCaseCommentRequest,
  UpdateCaseCommentResponse,
  UpdateCaseCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/cases/{caseId}/update-case-comment/{commentId}",
    input: { caseId: 0, commentId: 0, body: 0 },
    output: { body: D.secret },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCaseComment",
})) as any;

export type UpdateCaseStatusError = CommonErrors;
/**
 * Updates the state transitions for a designated cases.
 *
 * **Self-managed**: the following states are available for self-managed cases.
 *
 * - Submitted → Detection and Analysis
 *
 * - Detection and Analysis → Containment, Eradication, and Recovery
 *
 * - Detection and Analysis → Post-incident Activities
 *
 * - Containment, Eradication, and Recovery → Detection and Analysis
 *
 * - Containment, Eradication, and Recovery → Post-incident Activities
 *
 * - Post-incident Activities → Containment, Eradication, and Recovery
 *
 * - Post-incident Activities → Detection and Analysis
 *
 * - Any → Closed
 *
 * **AWS supported**: You must use the `CloseCase` API to close.
 */
export const updateCaseStatus: API.OperationMethod<
  UpdateCaseStatusRequest,
  UpdateCaseStatusResponse,
  UpdateCaseStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/cases/{caseId}/update-case-status",
    input: { caseId: 0, caseStatus: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCaseStatus",
})) as any;

export type UpdateMembershipError = CommonErrors;
/**
 * Updates membership configuration.
 */
export const updateMembership: API.OperationMethod<
  UpdateMembershipRequest,
  UpdateMembershipResponse,
  UpdateMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/membership/{membershipId}/update-membership",
    input: {
      membershipId: 0,
      membershipName: 0,
      incidentResponseTeam: D.list(i_IncidentResponder),
      optInFeatures: D.list(i_OptInFeature),
      membershipAccountsConfigurationsUpdate: {
        coverEntireOrganization: 0,
        organizationalUnitsToAdd: 0,
        organizationalUnitsToRemove: 0,
      },
      undoMembershipCancellation: 0,
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMembership",
})) as any;

export type UpdateResolverTypeError = CommonErrors;
/**
 * Updates the resolver type for a case.
 *
 * This is a one-way action and cannot be reversed.
 */
export const updateResolverType: API.OperationMethod<
  UpdateResolverTypeRequest,
  UpdateResolverTypeResponse,
  UpdateResolverTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/cases/{caseId}/update-resolver-type",
    input: { caseId: 0, resolverType: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResolverType",
})) as any;

const i_ImpactedAwsRegion: D.LazyStruct = () => ({ region: 0 });
const i_IncidentResponder: D.LazyStruct = () => ({
  name: 0,
  jobTitle: 0,
  email: 0,
  communicationPreferences: 0,
});
const i_OptInFeature: D.LazyStruct = () => ({ featureName: 0, isEnabled: 0 });
const i_ThreatActorIp: D.LazyStruct = () => ({ ipAddress: 0, userAgent: 0 });
const i_Watcher: D.LazyStruct = () => ({ email: 0, name: 0, jobTitle: 0 });
