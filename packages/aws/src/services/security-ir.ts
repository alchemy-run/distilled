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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Security IR",
  serviceShapeName: "SecurityIncidentResponse",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "security-ir" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
  '{"url":"https://security-ir.{R}.api.aws","properties":{},"headers":{}}',
  [
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(97, __c12, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type MembershipAccountRelationshipType = "Organization" | "Unrelated" | (string & {});
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
export type GetMembershipAccountDetailErrors = GetMembershipAccountDetailError[];
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
export type EngagementType = "Security Incident" | "Investigation" | (string & {});
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
export type CaseAttachmentStatus = "Verified" | "Failed" | "Pending" | (string & {});
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
export type MembershipStatus = "Active" | "Cancelled" | "Terminated" | (string & {});
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
export type ActionType = "Evidence" | "Investigation" | "Summarization" | (string & {});
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
  input: __S(160, __c20, 0) as any as S.Schema<BatchGetMemberAccountDetailsRequest>,
  output: __S(165, __c20, 5) as any as S.Schema<BatchGetMemberAccountDetailsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMemberAccountDetails",
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<CancelMembershipRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<CancelMembershipResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMembership",
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<CloseCaseRequest>,
  output: __S(193, __c24, 1) as any as S.Schema<CloseCaseResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloseCase",
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<CreateCaseRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<CreateCaseResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCase",
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<CreateCaseCommentRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<CreateCaseCommentResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCaseComment",
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<CreateMembershipRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<CreateMembershipResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembership",
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<GetCaseRequest>,
  output: __S(251, __c31, 3) as any as S.Schema<GetCaseResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCase",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<GetCaseAttachmentDownloadUrlRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<GetCaseAttachmentDownloadUrlResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCaseAttachmentDownloadUrl",
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<GetCaseAttachmentUploadUrlRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<GetCaseAttachmentUploadUrlResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCaseAttachmentUploadUrl",
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<GetMembershipRequest>,
  output: __S(26, __c3, 2) as any as S.Schema<GetMembershipResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembership",
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<ListCaseEditsRequest>,
  output: __S(35, __c4, 3) as any as S.Schema<ListCaseEditsResponse>,
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
  input: __S(40, __c5, 0) as any as S.Schema<ListCasesRequest>,
  output: __S(43, __c5, 3) as any as S.Schema<ListCasesResponse>,
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
  input: __S(48, __c6, 0) as any as S.Schema<ListCommentsRequest>,
  output: __S(51, __c6, 3) as any as S.Schema<ListCommentsResponse>,
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
  input: __S(56, __c7, 0) as any as S.Schema<ListInvestigationsRequest>,
  output: __S(60, __c7, 4) as any as S.Schema<ListInvestigationsResponse>,
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
  input: __S(64, __c8, 0) as any as S.Schema<ListMembershipsRequest>,
  output: __S(67, __c8, 3) as any as S.Schema<ListMembershipsResponse>,
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
  input: __S(72, __c9, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(73, __c9, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<SendFeedbackRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<SendFeedbackResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendFeedback",
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<TagResourceInput>,
  output: __S(88, __c11, 0) as any as S.Schema<TagResourceOutput>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(88, __c11, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<UpdateCaseRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<UpdateCaseResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCase",
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<UpdateCaseCommentRequest>,
  output: __S(129, __c16, 1) as any as S.Schema<UpdateCaseCommentResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCaseComment",
}));

export type UpdateCaseStatusError = CommonErrors;
/**
 * Updates the state transitions for a designated cases.
 *
 * **Self-managed**: the following states are available for self-managed cases.
 *
 * - Submitted -> Detection and Analysis
 *
 * - Detection and Analysis -> Containment, Eradication, and Recovery
 *
 * - Detection and Analysis -> Post-incident Activities
 *
 * - Containment, Eradication, and Recovery -> Detection and Analysis
 *
 * - Containment, Eradication, and Recovery -> Post-incident Activities
 *
 * - Post-incident Activities -> Containment, Eradication, and Recovery
 *
 * - Post-incident Activities -> Detection and Analysis
 *
 * - Any -> Closed
 *
 * **AWS supported**: You must use the `CloseCase` API to close.
 */
export const updateCaseStatus: API.OperationMethod<
  UpdateCaseStatusRequest,
  UpdateCaseStatusResponse,
  UpdateCaseStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<UpdateCaseStatusRequest>,
  output: __S(137, __c17, 1) as any as S.Schema<UpdateCaseStatusResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCaseStatus",
}));

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
  input: __S(145, __c18, 1) as any as S.Schema<UpdateMembershipRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<UpdateMembershipResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMembership",
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<UpdateResolverTypeRequest>,
  output: __S(153, __c19, 1) as any as S.Schema<UpdateResolverTypeResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResolverType",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          attachmentId: S.String.pipe(T.HttpLabel("attachmentId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/cases/{caseId}/get-presigned-url/{attachmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCaseAttachmentDownloadUrlRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ attachmentPresignedUrl: SensitiveString })).annotate({
        identifier: "GetCaseAttachmentDownloadUrlResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          fileName: SensitiveString,
          contentLength: S.Number,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/cases/{caseId}/get-presigned-url" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCaseAttachmentUploadUrlRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ membershipId: S.String.pipe(T.HttpLabel("membershipId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/membership/{membershipId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMembershipRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          coverEntireOrganization: S.optional(S.Boolean),
          organizationalUnits: S.optional(__S(168, __c21, 0)),
        }),
      ).annotate({ identifier: "MembershipAccountsConfigurations" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          membershipId: S.String,
          accountId: S.optional(S.String),
          region: S.optional(S.String),
          membershipName: S.optional(SensitiveString),
          membershipArn: S.optional(S.String),
          membershipStatus: S.optional(S.String),
          membershipActivationTimestamp: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          membershipDeactivationTimestamp: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          customerType: S.optional(S.String),
          numberOfAccountsCovered: S.optional(S.Number),
          incidentResponseTeam: S.optional(__S(242, __c30, 2)),
          optInFeatures: S.optional(__S(244, __c30, 4)),
          membershipAccountsConfigurations: S.optional(__S(25, __c3, 1)),
        }),
      ).annotate({ identifier: "GetMembershipResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          caseId: S.String.pipe(T.HttpLabel("caseId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/cases/{caseId}/list-case-edits" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCaseEditsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          principal: S.optional(S.String),
          action: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "CaseEditItem" });
    case 2:
      return S.Array(__S(33, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          items: S.optional(__S(34, __c4, 2)),
          total: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ListCaseEditsResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/list-cases" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String,
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          title: S.optional(SensitiveString),
          caseArn: S.optional(S.String),
          engagementType: S.optional(S.String),
          caseStatus: S.optional(S.String),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          closedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          resolverType: S.optional(S.String),
          pendingAction: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCasesItem" });
    case 2:
      return S.Array(__S(41, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          items: S.optional(__S(42, __c5, 2)),
          total: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ListCasesResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          caseId: S.String.pipe(T.HttpLabel("caseId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/cases/{caseId}/list-comments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCommentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          commentId: S.String,
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          creator: S.optional(S.String),
          lastUpdatedBy: S.optional(S.String),
          body: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListCommentsItem" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          items: S.optional(__S(50, __c6, 2)),
          total: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ListCommentsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          caseId: S.String.pipe(T.HttpLabel("caseId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/cases/{caseId}/list-investigations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInvestigationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          usefulness: S.optional(S.String),
          comment: S.optional(S.String),
          submittedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "InvestigationFeedback" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          investigationId: S.String,
          actionType: S.String,
          title: S.String,
          content: S.String,
          status: S.String,
          lastUpdated: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          feedback: S.optional(__S(57, __c7, 1)),
        }),
      ).annotate({ identifier: "InvestigationAction" });
    case 3:
      return S.Array(__S(58, __c7, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), investigationActions: __S(59, __c7, 3) }),
      ).annotate({ identifier: "ListInvestigationsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/memberships" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMembershipsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          membershipId: S.String,
          accountId: S.optional(S.String),
          region: S.optional(S.String),
          membershipArn: S.optional(S.String),
          membershipStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMembershipItem" });
    case 2:
      return S.Array(__S(65, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(66, __c8, 2)) }),
      ).annotate({ identifier: "ListMembershipsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: __S(208, __c26, 0) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          resultId: S.String.pipe(T.HttpLabel("resultId")),
          usefulness: S.String,
          comment: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/cases/{caseId}/feedback/{resultId}/send-feedback" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendFeedbackRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "SendFeedbackResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(96, __c12, 0));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(208, __c26, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(168, __c21, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          title: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          reportedIncidentStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          actualIncidentStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          engagementType: S.optional(S.String),
          watchersToAdd: S.optional(__S(217, __c27, 1)),
          watchersToDelete: S.optional(__S(217, __c27, 1)),
          threatActorIpAddressesToAdd: S.optional(__S(219, __c27, 3)),
          threatActorIpAddressesToDelete: S.optional(__S(219, __c27, 3)),
          impactedServicesToAdd: S.optional(__S(168, __c21, 0)),
          impactedServicesToDelete: S.optional(__S(168, __c21, 0)),
          impactedAwsRegionsToAdd: S.optional(__S(221, __c27, 5)),
          impactedAwsRegionsToDelete: S.optional(__S(221, __c27, 5)),
          impactedAccountsToAdd: S.optional(__S(168, __c21, 0)),
          impactedAccountsToDelete: S.optional(__S(168, __c21, 0)),
          caseMetadata: S.optional(__S(257, __c32, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/cases/{caseId}/update-case" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCaseRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          commentId: S.String.pipe(T.HttpLabel("commentId")),
          body: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/cases/{caseId}/update-case-comment/{commentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCaseCommentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ commentId: S.String, body: S.optional(SensitiveString) }),
      ).annotate({ identifier: "UpdateCaseCommentResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ caseId: S.String.pipe(T.HttpLabel("caseId")), caseStatus: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/cases/{caseId}/update-case-status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCaseStatusRequest" });
    case 1:
      return S.suspend(() => S.Struct({ caseStatus: S.optional(S.String) })).annotate({
        identifier: "UpdateCaseStatusResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          coverEntireOrganization: S.optional(S.Boolean),
          organizationalUnitsToAdd: S.optional(__S(168, __c21, 0)),
          organizationalUnitsToRemove: S.optional(__S(168, __c21, 0)),
        }),
      ).annotate({ identifier: "MembershipAccountsConfigurationsUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          membershipId: S.String.pipe(T.HttpLabel("membershipId")),
          membershipName: S.optional(SensitiveString),
          incidentResponseTeam: S.optional(__S(242, __c30, 2)),
          optInFeatures: S.optional(__S(244, __c30, 4)),
          membershipAccountsConfigurationsUpdate: S.optional(__S(144, __c18, 0)),
          undoMembershipCancellation: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/membership/{membershipId}/update-membership" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMembershipRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ caseId: S.String.pipe(T.HttpLabel("caseId")), resolverType: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/cases/{caseId}/update-resolver-type" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateResolverTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String,
          caseStatus: S.optional(S.String),
          resolverType: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateResolverTypeResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          membershipId: S.String.pipe(T.HttpLabel("membershipId")),
          accountIds: __S(168, __c21, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/membership/{membershipId}/batch-member-details" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetMemberAccountDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          relationshipStatus: S.optional(S.String),
          relationshipType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetMembershipAccountDetailItem" });
    case 2:
      return S.Array(__S(161, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ accountId: S.String, error: S.String, message: S.String }),
      ).annotate({ identifier: "GetMembershipAccountDetailError" });
    case 4:
      return S.Array(__S(163, __c20, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(162, __c20, 2)), errors: S.optional(__S(164, __c20, 4)) }),
      ).annotate({ identifier: "BatchGetMemberAccountDetailsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ membershipId: S.String.pipe(T.HttpLabel("membershipId")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/membership/{membershipId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelMembershipRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ membershipId: S.String })).annotate({
        identifier: "CancelMembershipResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ caseId: S.String.pipe(T.HttpLabel("caseId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/cases/{caseId}/close-case" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CloseCaseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          caseStatus: S.optional(S.String),
          closedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CloseCaseResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          resolverType: S.String,
          title: SensitiveString,
          description: SensitiveString,
          engagementType: S.String,
          reportedIncidentStartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          impactedAccounts: __S(168, __c21, 0),
          watchers: __S(217, __c27, 1),
          threatActorIpAddresses: S.optional(__S(219, __c27, 3)),
          impactedServices: S.optional(__S(168, __c21, 0)),
          impactedAwsRegions: S.optional(__S(221, __c27, 5)),
          tags: S.optional(__S(208, __c26, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/create-case" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateCaseRequest" });
    case 1:
      return S.suspend(() => S.Struct({ caseId: S.String })).annotate({
        identifier: "CreateCaseResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          email: SensitiveString,
          name: S.optional(SensitiveString),
          jobTitle: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Watcher" });
    case 1:
      return S.Array(__S(216, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ipAddress: SensitiveString, userAgent: S.optional(S.String) }),
      ).annotate({ identifier: "ThreatActorIp" });
    case 3:
      return S.Array(__S(218, __c27, 2));
    case 4:
      return S.suspend(() => S.Struct({ region: S.String })).annotate({
        identifier: "ImpactedAwsRegion",
      });
    case 5:
      return S.Array(__S(220, __c27, 4));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          caseId: S.String.pipe(T.HttpLabel("caseId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          body: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/cases/{caseId}/create-comment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCaseCommentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ commentId: S.String })).annotate({
        identifier: "CreateCaseCommentResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          membershipName: SensitiveString,
          incidentResponseTeam: __S(242, __c30, 2),
          optInFeatures: S.optional(__S(244, __c30, 4)),
          tags: S.optional(__S(208, __c26, 0)),
          coverEntireOrganization: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/membership" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateMembershipRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          jobTitle: SensitiveString,
          email: SensitiveString,
          communicationPreferences: S.optional(__S(240, __c30, 0)),
        }),
      ).annotate({ identifier: "IncidentResponder" });
    case 2:
      return S.Array(__S(241, __c30, 1));
    case 3:
      return S.suspend(() => S.Struct({ featureName: S.String, isEnabled: S.Boolean })).annotate({
        identifier: "OptInFeature",
      });
    case 4:
      return S.Array(__S(243, __c30, 3));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ caseId: S.String.pipe(T.HttpLabel("caseId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/cases/{caseId}/get-case" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCaseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          attachmentId: S.String,
          fileName: SensitiveString,
          attachmentStatus: S.String,
          creator: S.String,
          createdDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CaseAttachmentAttributes" });
    case 2:
      return S.Array(__S(249, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(SensitiveString),
          caseArn: S.optional(S.String),
          description: S.optional(SensitiveString),
          caseStatus: S.optional(S.String),
          engagementType: S.optional(S.String),
          reportedIncidentStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          actualIncidentStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          impactedAwsRegions: S.optional(__S(221, __c27, 5)),
          threatActorIpAddresses: S.optional(__S(219, __c27, 3)),
          pendingAction: S.optional(S.String),
          impactedAccounts: S.optional(__S(168, __c21, 0)),
          watchers: S.optional(__S(217, __c27, 1)),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          closureCode: S.optional(S.String),
          resolverType: S.optional(S.String),
          impactedServices: S.optional(__S(168, __c21, 0)),
          caseAttachments: S.optional(__S(250, __c31, 2)),
          closedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          caseMetadata: S.optional(__S(257, __c32, 1)),
        }),
      ).annotate({ identifier: "GetCaseResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "CaseMetadataEntry",
      });
    case 1:
      return S.Array(__S(256, __c32, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
