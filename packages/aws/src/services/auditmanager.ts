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
  sdkId: "AuditManager",
  target: "BedrockAssessmentManagerLambda",
  version: "2017-07-25",
  sigv4: "auditmanager",
  protocol: restJson1Protocol,
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
                `https://auditmanager-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://auditmanager-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://auditmanager.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://auditmanager.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class AuditManagerMaintenanceMode
  extends /*@__PURE__*/ TE.TaggedError(
    "AuditManagerMaintenanceMode",
    ["BadRequestError"],
    {
      synthetic: {
        from: "ValidationException",
        message: { includes: "maintenance mode" },
      },
    },
  )<{
    readonly message: string;
    readonly reason?: ValidationExceptionReason;
    readonly fields?: ValidationExceptionField[];
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
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
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason?: ValidationExceptionReason;
    readonly fields?: ValidationExceptionField[];
  }> {}
export type UUID = string;
export interface AssociateAssessmentReportEvidenceFolderRequest {
  assessmentId: string;
  evidenceFolderId: string;
}
export interface AssociateAssessmentReportEvidenceFolderResponse {}
export type EvidenceIds = string[];
export interface BatchAssociateAssessmentReportEvidenceRequest {
  assessmentId: string;
  evidenceFolderId: string;
  evidenceIds: string[];
}
export type ErrorCode = string;
export type ErrorMessage = string;
export interface AssessmentReportEvidenceError {
  evidenceId?: string;
  errorCode?: string;
  errorMessage?: string;
}
export type AssessmentReportEvidenceErrors = AssessmentReportEvidenceError[];
export interface BatchAssociateAssessmentReportEvidenceResponse {
  evidenceIds?: string[];
  errors?: AssessmentReportEvidenceError[];
}
export type DelegationComment = string | redacted.Redacted<string>;
export type ControlSetId = string;
export type IamArn = string;
export type RoleType = "PROCESS_OWNER" | "RESOURCE_OWNER" | (string & {});
export interface CreateDelegationRequest {
  comment?: string | redacted.Redacted<string>;
  controlSetId?: string;
  roleArn?: string;
  roleType?: RoleType;
}
export type CreateDelegationRequests = CreateDelegationRequest[];
export interface BatchCreateDelegationByAssessmentRequest {
  createDelegationRequests: CreateDelegationRequest[];
  assessmentId: string;
}
export type AssessmentName = string | redacted.Redacted<string>;
export type DelegationStatus =
  | "IN_PROGRESS"
  | "UNDER_REVIEW"
  | "COMPLETE"
  | (string & {});
export type CreatedBy = string | redacted.Redacted<string>;
export interface Delegation {
  id?: string;
  assessmentName?: string | redacted.Redacted<string>;
  assessmentId?: string;
  status?: DelegationStatus;
  roleArn?: string;
  roleType?: RoleType;
  creationTime?: Date;
  lastUpdated?: Date;
  controlSetId?: string;
  comment?: string | redacted.Redacted<string>;
  createdBy?: string | redacted.Redacted<string>;
}
export type Delegations = Delegation[];
export interface BatchCreateDelegationByAssessmentError_ {
  createDelegationRequest?: CreateDelegationRequest;
  errorCode?: string;
  errorMessage?: string;
}
export type BatchCreateDelegationByAssessmentErrors =
  BatchCreateDelegationByAssessmentError_[];
export interface BatchCreateDelegationByAssessmentResponse {
  delegations?: Delegation[];
  errors?: BatchCreateDelegationByAssessmentError_[];
}
export type DelegationIds = string[];
export interface BatchDeleteDelegationByAssessmentRequest {
  delegationIds: string[];
  assessmentId: string;
}
export interface BatchDeleteDelegationByAssessmentError_ {
  delegationId?: string;
  errorCode?: string;
  errorMessage?: string;
}
export type BatchDeleteDelegationByAssessmentErrors =
  BatchDeleteDelegationByAssessmentError_[];
export interface BatchDeleteDelegationByAssessmentResponse {
  errors?: BatchDeleteDelegationByAssessmentError_[];
}
export interface BatchDisassociateAssessmentReportEvidenceRequest {
  assessmentId: string;
  evidenceFolderId: string;
  evidenceIds: string[];
}
export interface BatchDisassociateAssessmentReportEvidenceResponse {
  evidenceIds?: string[];
  errors?: AssessmentReportEvidenceError[];
}
export type S3Url = string;
export type ManualEvidenceTextResponse = string | redacted.Redacted<string>;
export type ManualEvidenceLocalFileName = string | redacted.Redacted<string>;
export interface ManualEvidence {
  s3ResourcePath?: string;
  textResponse?: string | redacted.Redacted<string>;
  evidenceFileName?: string | redacted.Redacted<string>;
}
export type ManualEvidenceList = ManualEvidence[];
export interface BatchImportEvidenceToAssessmentControlRequest {
  assessmentId: string;
  controlSetId: string;
  controlId: string;
  manualEvidence: ManualEvidence[];
}
export interface BatchImportEvidenceToAssessmentControlError_ {
  manualEvidence?: ManualEvidence;
  errorCode?: string;
  errorMessage?: string;
}
export type BatchImportEvidenceToAssessmentControlErrors =
  BatchImportEvidenceToAssessmentControlError_[];
export interface BatchImportEvidenceToAssessmentControlResponse {
  errors?: BatchImportEvidenceToAssessmentControlError_[];
}
export type AssessmentDescription = string | redacted.Redacted<string>;
export type AssessmentReportDestinationType = "S3" | (string & {});
export interface AssessmentReportsDestination {
  destinationType?: AssessmentReportDestinationType;
  destination?: string;
}
export type AccountId = string;
export type EmailAddress = string | redacted.Redacted<string>;
export type AccountName = string;
export interface AWSAccount {
  id?: string;
  emailAddress?: string | redacted.Redacted<string>;
  name?: string;
}
export type AWSAccounts = AWSAccount[];
export type AWSServiceName = string;
export interface AWSService {
  serviceName?: string;
}
export type AWSServices = AWSService[];
export interface Scope {
  awsAccounts?: AWSAccount[];
  awsServices?: AWSService[];
}
export interface Role {
  roleType: RoleType;
  roleArn: string;
}
export type Roles = Role[];
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateAssessmentRequest {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  assessmentReportsDestination: AssessmentReportsDestination;
  scope: Scope;
  roles: Role[];
  frameworkId: string;
  tags?: { [key: string]: string | undefined };
}
export type AuditManagerArn = string;
export type ComplianceType = string | redacted.Redacted<string>;
export type AssessmentStatus = "ACTIVE" | "INACTIVE" | (string & {});
export interface AssessmentMetadata {
  name?: string | redacted.Redacted<string>;
  id?: string;
  description?: string | redacted.Redacted<string>;
  complianceType?: string | redacted.Redacted<string>;
  status?: AssessmentStatus;
  assessmentReportsDestination?: AssessmentReportsDestination;
  scope?: Scope;
  roles?: Role[];
  delegations?: Delegation[];
  creationTime?: Date;
  lastUpdated?: Date;
}
export type AssessmentFrameworkDescription = string;
export type Filename = string;
export interface FrameworkMetadata {
  name?: string | redacted.Redacted<string>;
  description?: string;
  logo?: string;
  complianceType?: string | redacted.Redacted<string>;
}
export type NonEmptyString = string;
export type ControlSetStatus =
  | "ACTIVE"
  | "UNDER_REVIEW"
  | "REVIEWED"
  | (string & {});
export type ControlName = string;
export type ControlDescription = string | redacted.Redacted<string>;
export type ControlStatus =
  | "UNDER_REVIEW"
  | "REVIEWED"
  | "INACTIVE"
  | (string & {});
export type ControlResponse =
  | "MANUAL"
  | "AUTOMATE"
  | "DEFER"
  | "IGNORE"
  | (string & {});
export type Username = string | redacted.Redacted<string>;
export type ControlCommentBody = string | redacted.Redacted<string>;
export interface ControlComment {
  authorName?: string | redacted.Redacted<string>;
  commentBody?: string | redacted.Redacted<string>;
  postedDate?: Date;
}
export type ControlComments = ControlComment[];
export type EvidenceSources = string[];
export interface AssessmentControl {
  id?: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  status?: ControlStatus;
  response?: ControlResponse;
  comments?: ControlComment[];
  evidenceSources?: string[];
  evidenceCount?: number;
  assessmentReportEvidenceCount?: number;
}
export type AssessmentControls = AssessmentControl[];
export interface AssessmentControlSet {
  id?: string;
  description?: string;
  status?: ControlSetStatus;
  roles?: Role[];
  controls?: AssessmentControl[];
  delegations?: Delegation[];
  systemEvidenceCount?: number;
  manualEvidenceCount?: number;
}
export type AssessmentControlSets = AssessmentControlSet[];
export interface AssessmentFramework {
  id?: string;
  arn?: string;
  metadata?: FrameworkMetadata;
  controlSets?: AssessmentControlSet[];
}
export interface Assessment {
  arn?: string;
  awsAccount?: AWSAccount;
  metadata?: AssessmentMetadata;
  framework?: AssessmentFramework;
  tags?: { [key: string]: string | undefined };
}
export interface CreateAssessmentResponse {
  assessment?: Assessment;
}
export type FrameworkName = string;
export type FrameworkDescription = string;
export type ControlSetName = string;
export interface CreateAssessmentFrameworkControl {
  id: string;
}
export type CreateAssessmentFrameworkControls =
  CreateAssessmentFrameworkControl[];
export interface CreateAssessmentFrameworkControlSet {
  name: string;
  controls?: CreateAssessmentFrameworkControl[];
}
export type CreateAssessmentFrameworkControlSets =
  CreateAssessmentFrameworkControlSet[];
export interface CreateAssessmentFrameworkRequest {
  name: string;
  description?: string;
  complianceType?: string | redacted.Redacted<string>;
  controlSets: CreateAssessmentFrameworkControlSet[];
  tags?: { [key: string]: string | undefined };
}
export type FrameworkType = "Standard" | "Custom" | (string & {});
export type ControlSources = string;
export type ControlType = "Standard" | "Custom" | "Core" | (string & {});
export type TestingInformation = string | redacted.Redacted<string>;
export type ActionPlanTitle = string | redacted.Redacted<string>;
export type ActionPlanInstructions = string | redacted.Redacted<string>;
export type SourceName = string;
export type SourceDescription = string;
export type SourceSetUpOption =
  | "System_Controls_Mapping"
  | "Procedural_Controls_Mapping"
  | (string & {});
export type SourceType =
  | "AWS_Cloudtrail"
  | "AWS_Config"
  | "AWS_Security_Hub"
  | "AWS_API_Call"
  | "MANUAL"
  | "Common_Control"
  | "Core_Control"
  | (string & {});
export type KeywordInputType =
  | "SELECT_FROM_LIST"
  | "UPLOAD_FILE"
  | "INPUT_TEXT"
  | (string & {});
export type KeywordValue = string;
export interface SourceKeyword {
  keywordInputType?: KeywordInputType;
  keywordValue?: string;
}
export type SourceFrequency = "DAILY" | "WEEKLY" | "MONTHLY" | (string & {});
export type TroubleshootingText = string | redacted.Redacted<string>;
export interface ControlMappingSource {
  sourceId?: string;
  sourceName?: string;
  sourceDescription?: string;
  sourceSetUpOption?: SourceSetUpOption;
  sourceType?: SourceType;
  sourceKeyword?: SourceKeyword;
  sourceFrequency?: SourceFrequency;
  troubleshootingText?: string | redacted.Redacted<string>;
}
export type ControlMappingSources = ControlMappingSource[];
export type LastUpdatedBy = string | redacted.Redacted<string>;
export type ControlState = "ACTIVE" | "END_OF_SUPPORT" | (string & {});
export interface Control {
  arn?: string;
  id?: string;
  type?: ControlType;
  name?: string;
  description?: string | redacted.Redacted<string>;
  testingInformation?: string | redacted.Redacted<string>;
  actionPlanTitle?: string | redacted.Redacted<string>;
  actionPlanInstructions?: string | redacted.Redacted<string>;
  controlSources?: string;
  controlMappingSources?: ControlMappingSource[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
  createdBy?: string | redacted.Redacted<string>;
  lastUpdatedBy?: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
  state?: ControlState;
}
export type Controls = Control[];
export interface ControlSet {
  id?: string;
  name?: string;
  controls?: Control[];
}
export type ControlSets = ControlSet[];
export interface Framework {
  arn?: string;
  id?: string;
  name?: string;
  type?: FrameworkType;
  complianceType?: string | redacted.Redacted<string>;
  description?: string;
  logo?: string;
  controlSources?: string;
  controlSets?: ControlSet[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
  createdBy?: string | redacted.Redacted<string>;
  lastUpdatedBy?: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
}
export interface CreateAssessmentFrameworkResponse {
  framework?: Framework;
}
export type AssessmentReportName = string;
export type AssessmentReportDescription = string | redacted.Redacted<string>;
export type QueryStatement = string;
export interface CreateAssessmentReportRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  assessmentId: string;
  queryStatement?: string;
}
export type AssessmentReportStatus =
  | "COMPLETE"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export interface AssessmentReport {
  id?: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  awsAccountId?: string;
  assessmentId?: string;
  assessmentName?: string | redacted.Redacted<string>;
  author?: string | redacted.Redacted<string>;
  status?: AssessmentReportStatus;
  creationTime?: Date;
}
export interface CreateAssessmentReportResponse {
  assessmentReport?: AssessmentReport;
}
export interface CreateControlMappingSource {
  sourceName?: string;
  sourceDescription?: string;
  sourceSetUpOption?: SourceSetUpOption;
  sourceType?: SourceType;
  sourceKeyword?: SourceKeyword;
  sourceFrequency?: SourceFrequency;
  troubleshootingText?: string | redacted.Redacted<string>;
}
export type CreateControlMappingSources = CreateControlMappingSource[];
export interface CreateControlRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  testingInformation?: string | redacted.Redacted<string>;
  actionPlanTitle?: string | redacted.Redacted<string>;
  actionPlanInstructions?: string | redacted.Redacted<string>;
  controlMappingSources: CreateControlMappingSource[];
  tags?: { [key: string]: string | undefined };
}
export interface CreateControlResponse {
  control?: Control;
}
export interface DeleteAssessmentRequest {
  assessmentId: string;
}
export interface DeleteAssessmentResponse {}
export interface DeleteAssessmentFrameworkRequest {
  frameworkId: string;
}
export interface DeleteAssessmentFrameworkResponse {}
export type ShareRequestType = "SENT" | "RECEIVED" | (string & {});
export interface DeleteAssessmentFrameworkShareRequest {
  requestId: string;
  requestType: ShareRequestType;
}
export interface DeleteAssessmentFrameworkShareResponse {}
export interface DeleteAssessmentReportRequest {
  assessmentId: string;
  assessmentReportId: string;
}
export interface DeleteAssessmentReportResponse {}
export interface DeleteControlRequest {
  controlId: string;
}
export interface DeleteControlResponse {}
export interface DeregisterAccountRequest {}
export type AccountStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING_ACTIVATION"
  | (string & {});
export interface DeregisterAccountResponse {
  status?: AccountStatus;
}
export interface DeregisterOrganizationAdminAccountRequest {
  adminAccountId?: string;
}
export interface DeregisterOrganizationAdminAccountResponse {}
export interface DisassociateAssessmentReportEvidenceFolderRequest {
  assessmentId: string;
  evidenceFolderId: string;
}
export interface DisassociateAssessmentReportEvidenceFolderResponse {}
export interface GetAccountStatusRequest {}
export interface GetAccountStatusResponse {
  status?: AccountStatus;
}
export interface GetAssessmentRequest {
  assessmentId: string;
}
export interface GetAssessmentResponse {
  assessment?: Assessment;
  userRole?: Role;
}
export interface GetAssessmentFrameworkRequest {
  frameworkId: string;
}
export interface GetAssessmentFrameworkResponse {
  framework?: Framework;
}
export interface GetAssessmentReportUrlRequest {
  assessmentReportId: string;
  assessmentId: string;
}
export type HyperlinkName = string;
export type UrlLink = string;
export interface URL {
  hyperlinkName?: string;
  link?: string;
}
export interface GetAssessmentReportUrlResponse {
  preSignedUrl?: URL;
}
export type Token = string;
export type MaxResults = number;
export interface GetChangeLogsRequest {
  assessmentId: string;
  controlSetId?: string;
  controlId?: string;
  nextToken?: string;
  maxResults?: number;
}
export type ObjectTypeEnum =
  | "ASSESSMENT"
  | "CONTROL_SET"
  | "CONTROL"
  | "DELEGATION"
  | "ASSESSMENT_REPORT"
  | (string & {});
export type ActionEnum =
  | "CREATE"
  | "UPDATE_METADATA"
  | "ACTIVE"
  | "INACTIVE"
  | "DELETE"
  | "UNDER_REVIEW"
  | "REVIEWED"
  | "IMPORT_EVIDENCE"
  | (string & {});
export interface ChangeLog {
  objectType?: ObjectTypeEnum;
  objectName?: string;
  action?: ActionEnum;
  createdAt?: Date;
  createdBy?: string;
}
export type ChangeLogs = ChangeLog[];
export interface GetChangeLogsResponse {
  changeLogs?: ChangeLog[];
  nextToken?: string;
}
export interface GetControlRequest {
  controlId: string;
}
export interface GetControlResponse {
  control?: Control;
}
export interface GetDelegationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface DelegationMetadata {
  id?: string;
  assessmentName?: string | redacted.Redacted<string>;
  assessmentId?: string;
  status?: DelegationStatus;
  roleArn?: string;
  creationTime?: Date;
  controlSetName?: string;
}
export type DelegationMetadataList = DelegationMetadata[];
export interface GetDelegationsResponse {
  delegations?: DelegationMetadata[];
  nextToken?: string;
}
export interface GetEvidenceRequest {
  assessmentId: string;
  controlSetId: string;
  evidenceFolderId: string;
  evidenceId: string;
}
export type EventName = string;
export type GenericArn = string;
export interface Resource {
  arn?: string;
  value?: string;
  complianceCheck?: string;
}
export type Resources = Resource[];
export type EvidenceAttributeKey = string;
export type EvidenceAttributeValue = string;
export type EvidenceAttributes = { [key: string]: string | undefined };
export interface Evidence {
  dataSource?: string;
  evidenceAwsAccountId?: string;
  time?: Date;
  eventSource?: string;
  eventName?: string;
  evidenceByType?: string;
  resourcesIncluded?: Resource[];
  attributes?: { [key: string]: string | undefined };
  iamId?: string;
  complianceCheck?: string;
  awsOrganization?: string;
  awsAccountId?: string;
  evidenceFolderId?: string;
  id?: string;
  assessmentReportSelection?: string;
}
export interface GetEvidenceResponse {
  evidence?: Evidence;
}
export interface GetEvidenceByEvidenceFolderRequest {
  assessmentId: string;
  controlSetId: string;
  evidenceFolderId: string;
  nextToken?: string;
  maxResults?: number;
}
export type EvidenceList = Evidence[];
export interface GetEvidenceByEvidenceFolderResponse {
  evidence?: Evidence[];
  nextToken?: string;
}
export interface GetEvidenceFileUploadUrlRequest {
  fileName: string | redacted.Redacted<string>;
}
export interface GetEvidenceFileUploadUrlResponse {
  evidenceFileName?: string;
  uploadUrl?: string;
}
export interface GetEvidenceFolderRequest {
  assessmentId: string;
  controlSetId: string;
  evidenceFolderId: string;
}
export type AssessmentEvidenceFolderName = string;
export interface AssessmentEvidenceFolder {
  name?: string;
  date?: Date;
  assessmentId?: string;
  controlSetId?: string;
  controlId?: string;
  id?: string;
  dataSource?: string;
  author?: string;
  totalEvidence?: number;
  assessmentReportSelectionCount?: number;
  controlName?: string;
  evidenceResourcesIncludedCount?: number;
  evidenceByTypeConfigurationDataCount?: number;
  evidenceByTypeManualCount?: number;
  evidenceByTypeComplianceCheckCount?: number;
  evidenceByTypeComplianceCheckIssuesCount?: number;
  evidenceByTypeUserActivityCount?: number;
  evidenceAwsServiceSourceCount?: number;
}
export interface GetEvidenceFolderResponse {
  evidenceFolder?: AssessmentEvidenceFolder;
}
export interface GetEvidenceFoldersByAssessmentRequest {
  assessmentId: string;
  nextToken?: string;
  maxResults?: number;
}
export type AssessmentEvidenceFolders = AssessmentEvidenceFolder[];
export interface GetEvidenceFoldersByAssessmentResponse {
  evidenceFolders?: AssessmentEvidenceFolder[];
  nextToken?: string;
}
export interface GetEvidenceFoldersByAssessmentControlRequest {
  assessmentId: string;
  controlSetId: string;
  controlId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface GetEvidenceFoldersByAssessmentControlResponse {
  evidenceFolders?: AssessmentEvidenceFolder[];
  nextToken?: string;
}
export interface GetInsightsRequest {}
export interface Insights {
  activeAssessmentsCount?: number;
  noncompliantEvidenceCount?: number;
  compliantEvidenceCount?: number;
  inconclusiveEvidenceCount?: number;
  assessmentControlsCountByNoncompliantEvidence?: number;
  totalAssessmentControlsCount?: number;
  lastUpdated?: Date;
}
export interface GetInsightsResponse {
  insights?: Insights;
}
export interface GetInsightsByAssessmentRequest {
  assessmentId: string;
}
export interface InsightsByAssessment {
  noncompliantEvidenceCount?: number;
  compliantEvidenceCount?: number;
  inconclusiveEvidenceCount?: number;
  assessmentControlsCountByNoncompliantEvidence?: number;
  totalAssessmentControlsCount?: number;
  lastUpdated?: Date;
}
export interface GetInsightsByAssessmentResponse {
  insights?: InsightsByAssessment;
}
export interface GetOrganizationAdminAccountRequest {}
export type OrganizationId = string;
export interface GetOrganizationAdminAccountResponse {
  adminAccountId?: string;
  organizationId?: string;
}
export interface GetServicesInScopeRequest {}
export interface ServiceMetadata {
  name?: string;
  displayName?: string;
  description?: string;
  category?: string;
}
export type ServiceMetadataList = ServiceMetadata[];
export interface GetServicesInScopeResponse {
  serviceMetadata?: ServiceMetadata[];
}
export type SettingAttribute =
  | "ALL"
  | "IS_AWS_ORG_ENABLED"
  | "SNS_TOPIC"
  | "DEFAULT_ASSESSMENT_REPORTS_DESTINATION"
  | "DEFAULT_PROCESS_OWNERS"
  | "EVIDENCE_FINDER_ENABLEMENT"
  | "DEREGISTRATION_POLICY"
  | "DEFAULT_EXPORT_DESTINATION"
  | (string & {});
export interface GetSettingsRequest {
  attribute: SettingAttribute;
}
export type SNSTopic = string | redacted.Redacted<string>;
export type KmsKey = string;
export type CloudTrailArn = string;
export type EvidenceFinderEnablementStatus =
  | "ENABLED"
  | "DISABLED"
  | "ENABLE_IN_PROGRESS"
  | "DISABLE_IN_PROGRESS"
  | (string & {});
export type EvidenceFinderBackfillStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | (string & {});
export interface EvidenceFinderEnablement {
  eventDataStoreArn?: string;
  enablementStatus?: EvidenceFinderEnablementStatus;
  backfillStatus?: EvidenceFinderBackfillStatus;
  error?: string;
}
export type DeleteResources = "ALL" | "DEFAULT" | (string & {});
export interface DeregistrationPolicy {
  deleteResources?: DeleteResources;
}
export type ExportDestinationType = "S3" | (string & {});
export interface DefaultExportDestination {
  destinationType?: ExportDestinationType;
  destination?: string;
}
export interface Settings {
  isAwsOrgEnabled?: boolean;
  snsTopic?: string | redacted.Redacted<string>;
  defaultAssessmentReportsDestination?: AssessmentReportsDestination;
  defaultProcessOwners?: Role[];
  kmsKey?: string;
  evidenceFinderEnablement?: EvidenceFinderEnablement;
  deregistrationPolicy?: DeregistrationPolicy;
  defaultExportDestination?: DefaultExportDestination;
}
export interface GetSettingsResponse {
  settings?: Settings;
}
export type ControlDomainId = string;
export interface ListAssessmentControlInsightsByControlDomainRequest {
  controlDomainId: string;
  assessmentId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface EvidenceInsights {
  noncompliantEvidenceCount?: number;
  compliantEvidenceCount?: number;
  inconclusiveEvidenceCount?: number;
}
export interface ControlInsightsMetadataByAssessmentItem {
  name?: string;
  id?: string;
  evidenceInsights?: EvidenceInsights;
  controlSetName?: string;
  lastUpdated?: Date;
}
export type ControlInsightsMetadataByAssessment =
  ControlInsightsMetadataByAssessmentItem[];
export interface ListAssessmentControlInsightsByControlDomainResponse {
  controlInsightsByAssessment?: ControlInsightsMetadataByAssessmentItem[];
  nextToken?: string;
}
export interface ListAssessmentFrameworksRequest {
  frameworkType: FrameworkType;
  nextToken?: string;
  maxResults?: number;
}
export type ControlsCount = number;
export type ControlSetsCount = number;
export interface AssessmentFrameworkMetadata {
  arn?: string;
  id?: string;
  type?: FrameworkType;
  name?: string;
  description?: string;
  logo?: string;
  complianceType?: string | redacted.Redacted<string>;
  controlsCount?: number;
  controlSetsCount?: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export type FrameworkMetadataList = AssessmentFrameworkMetadata[];
export interface ListAssessmentFrameworksResponse {
  frameworkMetadataList?: AssessmentFrameworkMetadata[];
  nextToken?: string;
}
export interface ListAssessmentFrameworkShareRequestsRequest {
  requestType: ShareRequestType;
  nextToken?: string;
  maxResults?: number;
}
export type ShareRequestStatus =
  | "ACTIVE"
  | "REPLICATING"
  | "SHARED"
  | "EXPIRING"
  | "FAILED"
  | "EXPIRED"
  | "DECLINED"
  | "REVOKED"
  | (string & {});
export type Region = string;
export type ShareRequestComment = string;
export interface AssessmentFrameworkShareRequest {
  id?: string;
  frameworkId?: string;
  frameworkName?: string;
  frameworkDescription?: string;
  status?: ShareRequestStatus;
  sourceAccount?: string;
  destinationAccount?: string;
  destinationRegion?: string;
  expirationTime?: Date;
  creationTime?: Date;
  lastUpdated?: Date;
  comment?: string;
  standardControlsCount?: number;
  customControlsCount?: number;
  complianceType?: string | redacted.Redacted<string>;
}
export type AssessmentFrameworkShareRequestList =
  AssessmentFrameworkShareRequest[];
export interface ListAssessmentFrameworkShareRequestsResponse {
  assessmentFrameworkShareRequests?: AssessmentFrameworkShareRequest[];
  nextToken?: string;
}
export interface ListAssessmentReportsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface AssessmentReportMetadata {
  id?: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  assessmentId?: string;
  assessmentName?: string | redacted.Redacted<string>;
  author?: string | redacted.Redacted<string>;
  status?: AssessmentReportStatus;
  creationTime?: Date;
}
export type AssessmentReportsMetadata = AssessmentReportMetadata[];
export interface ListAssessmentReportsResponse {
  assessmentReports?: AssessmentReportMetadata[];
  nextToken?: string;
}
export interface ListAssessmentsRequest {
  status?: AssessmentStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface AssessmentMetadataItem {
  name?: string | redacted.Redacted<string>;
  id?: string;
  complianceType?: string | redacted.Redacted<string>;
  status?: AssessmentStatus;
  roles?: Role[];
  delegations?: Delegation[];
  creationTime?: Date;
  lastUpdated?: Date;
}
export type ListAssessmentMetadata = AssessmentMetadataItem[];
export interface ListAssessmentsResponse {
  assessmentMetadata?: AssessmentMetadataItem[];
  nextToken?: string;
}
export interface ListControlDomainInsightsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ControlDomainInsights {
  name?: string;
  id?: string;
  controlsCountByNoncompliantEvidence?: number;
  totalControlsCount?: number;
  evidenceInsights?: EvidenceInsights;
  lastUpdated?: Date;
}
export type ControlDomainInsightsList = ControlDomainInsights[];
export interface ListControlDomainInsightsResponse {
  controlDomainInsights?: ControlDomainInsights[];
  nextToken?: string;
}
export interface ListControlDomainInsightsByAssessmentRequest {
  assessmentId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListControlDomainInsightsByAssessmentResponse {
  controlDomainInsights?: ControlDomainInsights[];
  nextToken?: string;
}
export interface ListControlInsightsByControlDomainRequest {
  controlDomainId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ControlInsightsMetadataItem {
  name?: string;
  id?: string;
  evidenceInsights?: EvidenceInsights;
  lastUpdated?: Date;
}
export type ControlInsightsMetadata = ControlInsightsMetadataItem[];
export interface ListControlInsightsByControlDomainResponse {
  controlInsightsMetadata?: ControlInsightsMetadataItem[];
  nextToken?: string;
}
export type ControlCatalogId = string;
export interface ListControlsRequest {
  controlType: ControlType;
  nextToken?: string;
  maxResults?: number;
  controlCatalogId?: string;
}
export interface ControlMetadata {
  arn?: string;
  id?: string;
  name?: string;
  controlSources?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export type ControlMetadataList = ControlMetadata[];
export interface ListControlsResponse {
  controlMetadataList?: ControlMetadata[];
  nextToken?: string;
}
export type DataSourceType =
  | "AWS_Cloudtrail"
  | "AWS_Config"
  | "AWS_Security_Hub"
  | "AWS_API_Call"
  | "MANUAL"
  | (string & {});
export interface ListKeywordsForDataSourceRequest {
  source: DataSourceType;
  nextToken?: string;
  maxResults?: number;
}
export type Keywords = string[];
export interface ListKeywordsForDataSourceResponse {
  keywords?: string[];
  nextToken?: string;
}
export interface ListNotificationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type TimestampUUID = string;
export interface Notification {
  id?: string;
  assessmentId?: string;
  assessmentName?: string | redacted.Redacted<string>;
  controlSetId?: string;
  controlSetName?: string;
  description?: string;
  eventTime?: Date;
  source?: string;
}
export type Notifications = Notification[];
export interface ListNotificationsResponse {
  notifications?: Notification[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface RegisterAccountRequest {
  kmsKey?: string;
  delegatedAdminAccount?: string;
}
export interface RegisterAccountResponse {
  status?: AccountStatus;
}
export interface RegisterOrganizationAdminAccountRequest {
  adminAccountId: string;
}
export interface RegisterOrganizationAdminAccountResponse {
  adminAccountId?: string;
  organizationId?: string;
}
export interface StartAssessmentFrameworkShareRequest {
  frameworkId: string;
  destinationAccount: string;
  destinationRegion: string;
  comment?: string;
}
export interface StartAssessmentFrameworkShareResponse {
  assessmentFrameworkShareRequest?: AssessmentFrameworkShareRequest;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAssessmentRequest {
  assessmentId: string;
  assessmentName?: string | redacted.Redacted<string>;
  assessmentDescription?: string | redacted.Redacted<string>;
  scope: Scope;
  assessmentReportsDestination?: AssessmentReportsDestination;
  roles?: Role[];
}
export interface UpdateAssessmentResponse {
  assessment?: Assessment;
}
export interface UpdateAssessmentControlRequest {
  assessmentId: string;
  controlSetId: string;
  controlId: string;
  controlStatus?: ControlStatus;
  commentBody?: string | redacted.Redacted<string>;
}
export interface UpdateAssessmentControlResponse {
  control?: AssessmentControl;
}
export interface UpdateAssessmentControlSetStatusRequest {
  assessmentId: string;
  controlSetId: string;
  status: ControlSetStatus;
  comment: string | redacted.Redacted<string>;
}
export interface UpdateAssessmentControlSetStatusResponse {
  controlSet?: AssessmentControlSet;
}
export interface UpdateAssessmentFrameworkControlSet {
  id?: string;
  name: string;
  controls: CreateAssessmentFrameworkControl[];
}
export type UpdateAssessmentFrameworkControlSets =
  UpdateAssessmentFrameworkControlSet[];
export interface UpdateAssessmentFrameworkRequest {
  frameworkId: string;
  name: string;
  description?: string;
  complianceType?: string | redacted.Redacted<string>;
  controlSets: UpdateAssessmentFrameworkControlSet[];
}
export interface UpdateAssessmentFrameworkResponse {
  framework?: Framework;
}
export type ShareRequestAction =
  | "ACCEPT"
  | "DECLINE"
  | "REVOKE"
  | (string & {});
export interface UpdateAssessmentFrameworkShareRequest {
  requestId: string;
  requestType: ShareRequestType;
  action: ShareRequestAction;
}
export interface UpdateAssessmentFrameworkShareResponse {
  assessmentFrameworkShareRequest?: AssessmentFrameworkShareRequest;
}
export interface UpdateAssessmentStatusRequest {
  assessmentId: string;
  status: AssessmentStatus;
}
export interface UpdateAssessmentStatusResponse {
  assessment?: Assessment;
}
export interface UpdateControlRequest {
  controlId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  testingInformation?: string | redacted.Redacted<string>;
  actionPlanTitle?: string | redacted.Redacted<string>;
  actionPlanInstructions?: string | redacted.Redacted<string>;
  controlMappingSources: ControlMappingSource[];
}
export interface UpdateControlResponse {
  control?: Control;
}
export type SnsArn = string;
export interface UpdateSettingsRequest {
  snsTopic?: string;
  defaultAssessmentReportsDestination?: AssessmentReportsDestination;
  defaultProcessOwners?: Role[];
  kmsKey?: string;
  evidenceFinderEnabled?: boolean;
  deregistrationPolicy?: DeregistrationPolicy;
  defaultExportDestination?: DefaultExportDestination;
}
export interface UpdateSettingsResponse {
  settings?: Settings;
}
export interface ValidateAssessmentReportIntegrityRequest {
  s3RelativePath: string;
}
export type ValidationErrors = string[];
export interface ValidateAssessmentReportIntegrityResponse {
  signatureValid?: boolean;
  signatureAlgorithm?: string;
  signatureDateTime?: string;
  signatureKeyId?: string;
  validationErrors?: string[];
}
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateAssessmentReportEvidenceFolderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Associates an evidence folder to an assessment report in an Audit Manager
 * assessment.
 */
export const associateAssessmentReportEvidenceFolder: API.OperationMethod<
  AssociateAssessmentReportEvidenceFolderRequest,
  AssociateAssessmentReportEvidenceFolderResponse,
  AssociateAssessmentReportEvidenceFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assessments/{assessmentId}/associateToAssessmentReport",
    input: { assessmentId: 0, evidenceFolderId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAssessmentReportEvidenceFolder",
})) as any;

export type BatchAssociateAssessmentReportEvidenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Associates a list of evidence to an assessment report in an Audit Manager
 * assessment.
 */
export const batchAssociateAssessmentReportEvidence: API.OperationMethod<
  BatchAssociateAssessmentReportEvidenceRequest,
  BatchAssociateAssessmentReportEvidenceResponse,
  BatchAssociateAssessmentReportEvidenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assessments/{assessmentId}/batchAssociateToAssessmentReport",
    input: { assessmentId: 0, evidenceFolderId: 0, evidenceIds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateAssessmentReportEvidence",
})) as any;

export type BatchCreateDelegationByAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a batch of delegations for an assessment in Audit Manager.
 */
export const batchCreateDelegationByAssessment: API.OperationMethod<
  BatchCreateDelegationByAssessmentRequest,
  BatchCreateDelegationByAssessmentResponse,
  BatchCreateDelegationByAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assessments/{assessmentId}/delegations",
    input: {
      createDelegationRequests: D.list({
        comment: 0,
        controlSetId: 0,
        roleArn: 0,
        roleType: 0,
      }),
      assessmentId: 0,
    },
    output: {
      delegations: D.list(o_Delegation),
      errors: D.list({ createDelegationRequest: { comment: D.secret } }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateDelegationByAssessment",
})) as any;

export type BatchDeleteDelegationByAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a batch of delegations for an assessment in Audit Manager.
 */
export const batchDeleteDelegationByAssessment: API.OperationMethod<
  BatchDeleteDelegationByAssessmentRequest,
  BatchDeleteDelegationByAssessmentResponse,
  BatchDeleteDelegationByAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assessments/{assessmentId}/delegations",
    input: { delegationIds: 0, assessmentId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteDelegationByAssessment",
})) as any;

export type BatchDisassociateAssessmentReportEvidenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a list of evidence from an assessment report in Audit Manager.
 */
export const batchDisassociateAssessmentReportEvidence: API.OperationMethod<
  BatchDisassociateAssessmentReportEvidenceRequest,
  BatchDisassociateAssessmentReportEvidenceResponse,
  BatchDisassociateAssessmentReportEvidenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assessments/{assessmentId}/batchDisassociateFromAssessmentReport",
    input: { assessmentId: 0, evidenceFolderId: 0, evidenceIds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateAssessmentReportEvidence",
})) as any;

export type BatchImportEvidenceToAssessmentControlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more pieces of evidence to a control in an Audit Manager assessment.
 *
 * You can import manual evidence from any S3 bucket by specifying the S3 URI of the
 * object. You can also upload a file from your browser, or enter plain text in response to a
 * risk assessment question.
 *
 * The following restrictions apply to this action:
 *
 * - `manualEvidence` can be only one of the following:
 * `evidenceFileName`, `s3ResourcePath`, or
 * `textResponse`
 *
 * - Maximum size of an individual evidence file: 100 MB
 *
 * - Number of daily manual evidence uploads per control: 100
 *
 * - Supported file formats: See Supported file types for manual evidence in the *Audit Manager User Guide*
 *
 * For more information about Audit Manager service restrictions, see Quotas and
 * restrictions for Audit Manager.
 */
export const batchImportEvidenceToAssessmentControl: API.OperationMethod<
  BatchImportEvidenceToAssessmentControlRequest,
  BatchImportEvidenceToAssessmentControlResponse,
  BatchImportEvidenceToAssessmentControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assessments/{assessmentId}/controlSets/{controlSetId}/controls/{controlId}/evidence",
    input: {
      assessmentId: 0,
      controlSetId: 0,
      controlId: 0,
      manualEvidence: D.list({
        s3ResourcePath: 0,
        textResponse: 0,
        evidenceFileName: 0,
      }),
    },
    output: {
      errors: D.list({
        manualEvidence: { textResponse: D.secret, evidenceFileName: D.secret },
      }),
    },
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
  operationName: "BatchImportEvidenceToAssessmentControl",
})) as any;

export type CreateAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an assessment in Audit Manager.
 */
export const createAssessment: API.OperationMethod<
  CreateAssessmentRequest,
  CreateAssessmentResponse,
  CreateAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assessments",
    input: {
      name: 0,
      description: 0,
      assessmentReportsDestination: i_AssessmentReportsDestination,
      scope: i_Scope,
      roles: D.list(i_Role),
      frameworkId: 0,
      tags: 0,
    },
    output: { assessment: o_Assessment },
    body: true,
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
  operationName: "CreateAssessment",
})) as any;

export type CreateAssessmentFrameworkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom framework in Audit Manager.
 */
export const createAssessmentFramework: API.OperationMethod<
  CreateAssessmentFrameworkRequest,
  CreateAssessmentFrameworkResponse,
  CreateAssessmentFrameworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assessmentFrameworks",
    input: {
      name: 0,
      description: 0,
      complianceType: 0,
      controlSets: D.list({
        name: 0,
        controls: D.list(i_CreateAssessmentFrameworkControl),
      }),
      tags: 0,
    },
    output: { framework: o_Framework },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssessmentFramework",
})) as any;

export type CreateAssessmentReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates an assessment report for the specified assessment.
 */
export const createAssessmentReport: API.OperationMethod<
  CreateAssessmentReportRequest,
  CreateAssessmentReportResponse,
  CreateAssessmentReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assessments/{assessmentId}/reports",
    input: { name: 0, description: 0, assessmentId: 0, queryStatement: 0 },
    output: {
      assessmentReport: {
        description: D.secret,
        assessmentName: D.secret,
        author: D.secret,
        creationTime: D.ts,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssessmentReport",
})) as any;

export type CreateControlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new custom control in Audit Manager.
 */
export const createControl: API.OperationMethod<
  CreateControlRequest,
  CreateControlResponse,
  CreateControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /controls",
    input: {
      name: 0,
      description: 0,
      testingInformation: 0,
      actionPlanTitle: 0,
      actionPlanInstructions: 0,
      controlMappingSources: D.list({
        sourceName: 0,
        sourceDescription: 0,
        sourceSetUpOption: 0,
        sourceType: 0,
        sourceKeyword: i_SourceKeyword,
        sourceFrequency: 0,
        troubleshootingText: 0,
      }),
      tags: 0,
    },
    output: { control: o_Control },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateControl",
})) as any;

export type DeleteAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an assessment in Audit Manager.
 */
export const deleteAssessment: API.OperationMethod<
  DeleteAssessmentRequest,
  DeleteAssessmentResponse,
  DeleteAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assessments/{assessmentId}",
    input: { assessmentId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssessment",
})) as any;

export type DeleteAssessmentFrameworkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom framework in Audit Manager.
 */
export const deleteAssessmentFramework: API.OperationMethod<
  DeleteAssessmentFrameworkRequest,
  DeleteAssessmentFrameworkResponse,
  DeleteAssessmentFrameworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assessmentFrameworks/{frameworkId}",
    input: { frameworkId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssessmentFramework",
})) as any;

export type DeleteAssessmentFrameworkShareError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a share request for a custom framework in Audit Manager.
 */
export const deleteAssessmentFrameworkShare: API.OperationMethod<
  DeleteAssessmentFrameworkShareRequest,
  DeleteAssessmentFrameworkShareResponse,
  DeleteAssessmentFrameworkShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assessmentFrameworkShareRequests/{requestId}",
    input: { requestId: 0, requestType: D.m({ query: "requestType" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssessmentFrameworkShare",
})) as any;

export type DeleteAssessmentReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an assessment report in Audit Manager.
 *
 * When you run the `DeleteAssessmentReport` operation, Audit Manager
 * attempts to delete the following data:
 *
 * - The specified assessment report that’s stored in your S3 bucket
 *
 * - The associated metadata that’s stored in Audit Manager
 *
 * If Audit Manager can’t access the assessment report in your S3 bucket, the report
 * isn’t deleted. In this event, the `DeleteAssessmentReport` operation doesn’t
 * fail. Instead, it proceeds to delete the associated metadata only. You must then delete the
 * assessment report from the S3 bucket yourself.
 *
 * This scenario happens when Audit Manager receives a `403 (Forbidden)` or
 * `404 (Not Found)` error from Amazon S3. To avoid this, make sure that
 * your S3 bucket is available, and that you configured the correct permissions for Audit Manager to delete resources in your S3 bucket. For an example permissions policy that
 * you can use, see Assessment report destination permissions in the *Audit Manager User Guide*. For information about the issues that could cause a 403
 * (Forbidden) or `404 (Not Found`) error from Amazon S3, see
 * List of Error Codes in the Amazon Simple Storage Service API
 * Reference.
 */
export const deleteAssessmentReport: API.OperationMethod<
  DeleteAssessmentReportRequest,
  DeleteAssessmentReportResponse,
  DeleteAssessmentReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assessments/{assessmentId}/reports/{assessmentReportId}",
    input: { assessmentId: 0, assessmentReportId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssessmentReport",
})) as any;

export type DeleteControlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom control in Audit Manager.
 *
 * When you invoke this operation, the custom control is deleted from any frameworks or
 * assessments that it’s currently part of. As a result, Audit Manager will stop
 * collecting evidence for that custom control in all of your assessments. This includes
 * assessments that you previously created before you deleted the custom control.
 */
export const deleteControl: API.OperationMethod<
  DeleteControlRequest,
  DeleteControlResponse,
  DeleteControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /controls/{controlId}",
    input: { controlId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteControl",
})) as any;

export type DeregisterAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters an account in Audit Manager.
 *
 * Before you deregister, you can use the UpdateSettings API operation to set your preferred data retention policy. By
 * default, Audit Manager retains your data. If you want to delete your data, you can
 * use the `DeregistrationPolicy` attribute to request the deletion of your
 * data.
 *
 * For more information about data retention, see Data
 * Protection in the *Audit Manager User Guide*.
 */
export const deregisterAccount: API.OperationMethod<
  DeregisterAccountRequest,
  DeregisterAccountResponse,
  DeregisterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /account/deregisterAccount",
    input: {},
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterAccount",
})) as any;

export type DeregisterOrganizationAdminAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified Amazon Web Services account as a delegated administrator for
 * Audit Manager.
 *
 * When you remove a delegated administrator from your Audit Manager settings, you
 * continue to have access to the evidence that you previously collected under that account.
 * This is also the case when you deregister a delegated administrator from Organizations. However, Audit Manager stops collecting and attaching evidence to
 * that delegated administrator account moving forward.
 *
 * Keep in mind the following cleanup task if you use evidence finder:
 *
 * Before you use your management account to remove a delegated administrator, make sure
 * that the current delegated administrator account signs in to Audit Manager and
 * disables evidence finder first. Disabling evidence finder automatically deletes the
 * event data store that was created in their account when they enabled evidence finder. If
 * this task isn’t completed, the event data store remains in their account. In this case,
 * we recommend that the original delegated administrator goes to CloudTrail Lake
 * and manually deletes the
 * event data store.
 *
 * This cleanup task is necessary to ensure that you don't end up with multiple event
 * data stores. Audit Manager ignores an unused event data store after you remove or
 * change a delegated administrator account. However, the unused event data store continues
 * to incur storage costs from CloudTrail Lake if you don't delete it.
 *
 * When you deregister a delegated administrator account for Audit Manager, the data
 * for that account isn’t deleted. If you want to delete resource data for a delegated
 * administrator account, you must perform that task separately before you deregister the
 * account. Either, you can do this in the Audit Manager console. Or, you can use one of
 * the delete API operations that are provided by Audit Manager.
 *
 * To delete your Audit Manager resource data, see the following instructions:
 *
 * - DeleteAssessment (see also: Deleting an
 * assessment in the Audit Manager User
 * Guide)
 *
 * - DeleteAssessmentFramework (see also: Deleting a
 * custom framework in the Audit Manager User
 * Guide)
 *
 * - DeleteAssessmentFrameworkShare (see also: Deleting a share request in the Audit Manager User
 * Guide)
 *
 * - DeleteAssessmentReport (see also: Deleting an assessment report in the Audit Manager User
 * Guide)
 *
 * - DeleteControl (see also: Deleting a custom
 * control in the Audit Manager User
 * Guide)
 *
 * At this time, Audit Manager doesn't provide an option to delete evidence for a
 * specific delegated administrator. Instead, when your management account deregisters Audit Manager, we perform a cleanup for the current delegated administrator account at the
 * time of deregistration.
 */
export const deregisterOrganizationAdminAccount: API.OperationMethod<
  DeregisterOrganizationAdminAccountRequest,
  DeregisterOrganizationAdminAccountResponse,
  DeregisterOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /account/deregisterOrganizationAdminAccount",
    input: { adminAccountId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterOrganizationAdminAccount",
})) as any;

export type DisassociateAssessmentReportEvidenceFolderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an evidence folder from the specified assessment report in Audit Manager.
 */
export const disassociateAssessmentReportEvidenceFolder: API.OperationMethod<
  DisassociateAssessmentReportEvidenceFolderRequest,
  DisassociateAssessmentReportEvidenceFolderResponse,
  DisassociateAssessmentReportEvidenceFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assessments/{assessmentId}/disassociateFromAssessmentReport",
    input: { assessmentId: 0, evidenceFolderId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAssessmentReportEvidenceFolder",
})) as any;

export type GetAccountStatusError = InternalServerException | CommonErrors;
/**
 * Gets the registration status of an account in Audit Manager.
 */
export const getAccountStatus: API.OperationMethod<
  GetAccountStatusRequest,
  GetAccountStatusResponse,
  GetAccountStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /account/status", input: {} },
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountStatus",
})) as any;

export type GetAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specified assessment.
 */
export const getAssessment: API.OperationMethod<
  GetAssessmentRequest,
  GetAssessmentResponse,
  GetAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessments/{assessmentId}",
    input: { assessmentId: 0 },
    output: { assessment: o_Assessment },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssessment",
})) as any;

export type GetAssessmentFrameworkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specified framework.
 */
export const getAssessmentFramework: API.OperationMethod<
  GetAssessmentFrameworkRequest,
  GetAssessmentFrameworkResponse,
  GetAssessmentFrameworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessmentFrameworks/{frameworkId}",
    input: { frameworkId: 0 },
    output: { framework: o_Framework },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssessmentFramework",
})) as any;

export type GetAssessmentReportUrlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the URL of an assessment report in Audit Manager.
 */
export const getAssessmentReportUrl: API.OperationMethod<
  GetAssessmentReportUrlRequest,
  GetAssessmentReportUrlResponse,
  GetAssessmentReportUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessments/{assessmentId}/reports/{assessmentReportId}/url",
    input: { assessmentReportId: 0, assessmentId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssessmentReportUrl",
})) as any;

export type GetChangeLogsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of changelogs from Audit Manager.
 */
export const getChangeLogs: API.PaginatedOperationMethod<
  GetChangeLogsRequest,
  GetChangeLogsResponse,
  GetChangeLogsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessments/{assessmentId}/changelogs",
    input: {
      assessmentId: 0,
      controlSetId: D.m({ query: "controlSetId" }),
      controlId: D.m({ query: "controlId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { changeLogs: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChangeLogs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetControlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specified control.
 */
export const getControl: API.OperationMethod<
  GetControlRequest,
  GetControlResponse,
  GetControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /controls/{controlId}",
    input: { controlId: 0 },
    output: { control: o_Control },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetControl",
})) as any;

export type GetDelegationsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of delegations from an audit owner to a delegate.
 */
export const getDelegations: API.PaginatedOperationMethod<
  GetDelegationsRequest,
  GetDelegationsResponse,
  GetDelegationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /delegations",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      delegations: D.list({ assessmentName: D.secret, creationTime: D.ts }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDelegations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetEvidenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specified evidence item.
 */
export const getEvidence: API.OperationMethod<
  GetEvidenceRequest,
  GetEvidenceResponse,
  GetEvidenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessments/{assessmentId}/controlSets/{controlSetId}/evidenceFolders/{evidenceFolderId}/evidence/{evidenceId}",
    input: {
      assessmentId: 0,
      controlSetId: 0,
      evidenceFolderId: 0,
      evidenceId: 0,
    },
    output: { evidence: o_Evidence },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvidence",
})) as any;

export type GetEvidenceByEvidenceFolderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets all evidence from a specified evidence folder in Audit Manager.
 */
export const getEvidenceByEvidenceFolder: API.PaginatedOperationMethod<
  GetEvidenceByEvidenceFolderRequest,
  GetEvidenceByEvidenceFolderResponse,
  GetEvidenceByEvidenceFolderError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessments/{assessmentId}/controlSets/{controlSetId}/evidenceFolders/{evidenceFolderId}/evidence",
    input: {
      assessmentId: 0,
      controlSetId: 0,
      evidenceFolderId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { evidence: D.list(o_Evidence) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvidenceByEvidenceFolder",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetEvidenceFileUploadUrlError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a presigned Amazon S3 URL that can be used to upload a file as manual
 * evidence. For instructions on how to use this operation, see Upload a file from your browser in the Audit Manager User
 * Guide.
 *
 * The following restrictions apply to this operation:
 *
 * - Maximum size of an individual evidence file: 100 MB
 *
 * - Number of daily manual evidence uploads per control: 100
 *
 * - Supported file formats: See Supported file types for manual evidence in the *Audit Manager User Guide*
 *
 * For more information about Audit Manager service restrictions, see Quotas and
 * restrictions for Audit Manager.
 */
export const getEvidenceFileUploadUrl: API.OperationMethod<
  GetEvidenceFileUploadUrlRequest,
  GetEvidenceFileUploadUrlResponse,
  GetEvidenceFileUploadUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /evidenceFileUploadUrl",
    input: { fileName: D.m({ query: "fileName" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvidenceFileUploadUrl",
})) as any;

export type GetEvidenceFolderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets an evidence folder from a specified assessment in Audit Manager.
 */
export const getEvidenceFolder: API.OperationMethod<
  GetEvidenceFolderRequest,
  GetEvidenceFolderResponse,
  GetEvidenceFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessments/{assessmentId}/controlSets/{controlSetId}/evidenceFolders/{evidenceFolderId}",
    input: { assessmentId: 0, controlSetId: 0, evidenceFolderId: 0 },
    output: { evidenceFolder: o_AssessmentEvidenceFolder },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvidenceFolder",
})) as any;

export type GetEvidenceFoldersByAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the evidence folders from a specified assessment in Audit Manager.
 */
export const getEvidenceFoldersByAssessment: API.PaginatedOperationMethod<
  GetEvidenceFoldersByAssessmentRequest,
  GetEvidenceFoldersByAssessmentResponse,
  GetEvidenceFoldersByAssessmentError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessments/{assessmentId}/evidenceFolders",
    input: {
      assessmentId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { evidenceFolders: D.list(o_AssessmentEvidenceFolder) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvidenceFoldersByAssessment",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetEvidenceFoldersByAssessmentControlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of evidence folders that are associated with a specified control in an
 * Audit Manager assessment.
 */
export const getEvidenceFoldersByAssessmentControl: API.PaginatedOperationMethod<
  GetEvidenceFoldersByAssessmentControlRequest,
  GetEvidenceFoldersByAssessmentControlResponse,
  GetEvidenceFoldersByAssessmentControlError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessments/{assessmentId}/evidenceFolders-by-assessment-control/{controlSetId}/{controlId}",
    input: {
      assessmentId: 0,
      controlSetId: 0,
      controlId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { evidenceFolders: D.list(o_AssessmentEvidenceFolder) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvidenceFoldersByAssessmentControl",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetInsightsError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Gets the latest analytics data for all your current active assessments.
 */
export const getInsights: API.OperationMethod<
  GetInsightsRequest,
  GetInsightsResponse,
  GetInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /insights",
    input: {},
    output: { insights: { lastUpdated: D.ts } },
  },
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsights",
})) as any;

export type GetInsightsByAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the latest analytics data for a specific active assessment.
 */
export const getInsightsByAssessment: API.OperationMethod<
  GetInsightsByAssessmentRequest,
  GetInsightsByAssessmentResponse,
  GetInsightsByAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /insights/assessments/{assessmentId}",
    input: { assessmentId: 0 },
    output: { insights: { lastUpdated: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightsByAssessment",
})) as any;

export type GetOrganizationAdminAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the name of the delegated Amazon Web Services administrator account for a specified
 * organization.
 */
export const getOrganizationAdminAccount: API.OperationMethod<
  GetOrganizationAdminAccountRequest,
  GetOrganizationAdminAccountResponse,
  GetOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /account/organizationAdminAccount",
    input: {},
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationAdminAccount",
})) as any;

export type GetServicesInScopeError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of the Amazon Web Services services from which Audit Manager can collect
 * evidence.
 *
 * Audit Manager defines which Amazon Web Services services are in scope for an
 * assessment. Audit Manager infers this scope by examining the assessment’s controls and
 * their data sources, and then mapping this information to one or more of the corresponding
 * Amazon Web Services services that are in this list.
 *
 * For information about why it's no longer possible to specify services in scope manually, see
 * I can't edit the services in scope for my assessment in
 * the *Troubleshooting* section of the Audit Manager user
 * guide.
 */
export const getServicesInScope: API.OperationMethod<
  GetServicesInScopeRequest,
  GetServicesInScopeResponse,
  GetServicesInScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /services", input: {} },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServicesInScope",
})) as any;

export type GetSettingsError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Gets the settings for a specified Amazon Web Services account.
 */
export const getSettings: API.OperationMethod<
  GetSettingsRequest,
  GetSettingsResponse,
  GetSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /settings/{attribute}",
    input: { attribute: 0 },
    output: { settings: o_Settings },
  },
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSettings",
})) as any;

export type ListAssessmentControlInsightsByControlDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the latest analytics data for controls within a specific control domain and a
 * specific active assessment.
 *
 * Control insights are listed only if the control belongs to the control domain and
 * assessment that was specified. Moreover, the control must have collected evidence on the
 * `lastUpdated` date of `controlInsightsByAssessment`. If neither
 * of these conditions are met, no data is listed for that control.
 */
export const listAssessmentControlInsightsByControlDomain: API.PaginatedOperationMethod<
  ListAssessmentControlInsightsByControlDomainRequest,
  ListAssessmentControlInsightsByControlDomainResponse,
  ListAssessmentControlInsightsByControlDomainError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /insights/controls-by-assessment",
    input: {
      controlDomainId: D.m({ query: "controlDomainId" }),
      assessmentId: D.m({ query: "assessmentId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { controlInsightsByAssessment: D.list({ lastUpdated: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentControlInsightsByControlDomain",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssessmentFrameworksError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the frameworks that are available in the Audit Manager framework
 * library.
 */
export const listAssessmentFrameworks: API.PaginatedOperationMethod<
  ListAssessmentFrameworksRequest,
  ListAssessmentFrameworksResponse,
  ListAssessmentFrameworksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessmentFrameworks",
    input: {
      frameworkType: D.m({ query: "frameworkType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      frameworkMetadataList: D.list({
        complianceType: D.secret,
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
      }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentFrameworks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssessmentFrameworkShareRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of sent or received share requests for custom frameworks in Audit Manager.
 */
export const listAssessmentFrameworkShareRequests: API.PaginatedOperationMethod<
  ListAssessmentFrameworkShareRequestsRequest,
  ListAssessmentFrameworkShareRequestsResponse,
  ListAssessmentFrameworkShareRequestsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessmentFrameworkShareRequests",
    input: {
      requestType: D.m({ query: "requestType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      assessmentFrameworkShareRequests: D.list(
        o_AssessmentFrameworkShareRequest,
      ),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentFrameworkShareRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssessmentReportsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of assessment reports created in Audit Manager.
 */
export const listAssessmentReports: API.PaginatedOperationMethod<
  ListAssessmentReportsRequest,
  ListAssessmentReportsResponse,
  ListAssessmentReportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessmentReports",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      assessmentReports: D.list({
        description: D.secret,
        assessmentName: D.secret,
        author: D.secret,
        creationTime: D.ts,
      }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentReports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssessmentsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of current and past assessments from Audit Manager.
 */
export const listAssessments: API.PaginatedOperationMethod<
  ListAssessmentsRequest,
  ListAssessmentsResponse,
  ListAssessmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assessments",
    input: {
      status: D.m({ query: "status" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      assessmentMetadata: D.list({
        name: D.secret,
        complianceType: D.secret,
        delegations: D.list(o_Delegation),
        creationTime: D.ts,
        lastUpdated: D.ts,
      }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListControlDomainInsightsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the latest analytics data for control domains across all of your active
 * assessments.
 *
 * Audit Manager supports the control domains that are provided by Amazon Web Services
 * Control Catalog. For information about how to find a list of available control domains, see
 *
 * `ListDomains`
 * in the Amazon Web Services Control
 * Catalog API Reference.
 *
 * A control domain is listed only if at least one of the controls within that domain
 * collected evidence on the `lastUpdated` date of
 * `controlDomainInsights`. If this condition isn’t met, no data is listed
 * for that control domain.
 */
export const listControlDomainInsights: API.PaginatedOperationMethod<
  ListControlDomainInsightsRequest,
  ListControlDomainInsightsResponse,
  ListControlDomainInsightsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /insights/control-domains",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { controlDomainInsights: D.list(o_ControlDomainInsights) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListControlDomainInsights",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListControlDomainInsightsByAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists analytics data for control domains within a specified active assessment.
 *
 * Audit Manager supports the control domains that are provided by Amazon Web Services
 * Control Catalog. For information about how to find a list of available control domains, see
 *
 * `ListDomains`
 * in the Amazon Web Services Control
 * Catalog API Reference.
 *
 * A control domain is listed only if at least one of the controls within that domain
 * collected evidence on the `lastUpdated` date of
 * `controlDomainInsights`. If this condition isn’t met, no data is listed
 * for that domain.
 */
export const listControlDomainInsightsByAssessment: API.PaginatedOperationMethod<
  ListControlDomainInsightsByAssessmentRequest,
  ListControlDomainInsightsByAssessmentResponse,
  ListControlDomainInsightsByAssessmentError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /insights/control-domains-by-assessment",
    input: {
      assessmentId: D.m({ query: "assessmentId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { controlDomainInsights: D.list(o_ControlDomainInsights) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListControlDomainInsightsByAssessment",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListControlInsightsByControlDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the latest analytics data for controls within a specific control domain across all
 * active assessments.
 *
 * Control insights are listed only if the control belongs to the control domain that
 * was specified and the control collected evidence on the `lastUpdated` date of
 * `controlInsightsMetadata`. If neither of these conditions are met, no data
 * is listed for that control.
 */
export const listControlInsightsByControlDomain: API.PaginatedOperationMethod<
  ListControlInsightsByControlDomainRequest,
  ListControlInsightsByControlDomainResponse,
  ListControlInsightsByControlDomainError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /insights/controls",
    input: {
      controlDomainId: D.m({ query: "controlDomainId" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { controlInsightsMetadata: D.list({ lastUpdated: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListControlInsightsByControlDomain",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListControlsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of controls from Audit Manager.
 */
export const listControls: API.PaginatedOperationMethod<
  ListControlsRequest,
  ListControlsResponse,
  ListControlsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /controls",
    input: {
      controlType: D.m({ query: "controlType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      controlCatalogId: D.m({ query: "controlCatalogId" }),
    },
    output: {
      controlMetadataList: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListControls",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKeywordsForDataSourceError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of keywords that are pre-mapped to the specified control data
 * source.
 */
export const listKeywordsForDataSource: API.PaginatedOperationMethod<
  ListKeywordsForDataSourceRequest,
  ListKeywordsForDataSourceResponse,
  ListKeywordsForDataSourceError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /dataSourceKeywords",
    input: {
      source: D.m({ query: "source" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKeywordsForDataSource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNotificationsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all Audit Manager notifications.
 */
export const listNotifications: API.PaginatedOperationMethod<
  ListNotificationsRequest,
  ListNotificationsResponse,
  ListNotificationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /notifications",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      notifications: D.list({ assessmentName: D.secret, eventTime: D.ts }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotifications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags for the specified resource in Audit Manager.
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RegisterAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | AuditManagerMaintenanceMode
  | CommonErrors;
/**
 * Enables Audit Manager for the specified Amazon Web Services account.
 */
export const registerAccount: API.OperationMethod<
  RegisterAccountRequest,
  RegisterAccountResponse,
  RegisterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /account/registerAccount",
    input: { kmsKey: 0, delegatedAdminAccount: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    AuditManagerMaintenanceMode,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterAccount",
})) as any;

export type RegisterOrganizationAdminAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables an Amazon Web Services account within the organization as the delegated
 * administrator for Audit Manager.
 */
export const registerOrganizationAdminAccount: API.OperationMethod<
  RegisterOrganizationAdminAccountRequest,
  RegisterOrganizationAdminAccountResponse,
  RegisterOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /account/registerOrganizationAdminAccount",
    input: { adminAccountId: 0 },
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
  operationName: "RegisterOrganizationAdminAccount",
})) as any;

export type StartAssessmentFrameworkShareError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a share request for a custom framework in Audit Manager.
 *
 * The share request specifies a recipient and notifies them that a custom framework is
 * available. Recipients have 120 days to accept or decline the request. If no action is
 * taken, the share request expires.
 *
 * When you create a share request, Audit Manager stores a snapshot of your custom
 * framework in the US East (N. Virginia) Amazon Web Services Region. Audit Manager also
 * stores a backup of the same snapshot in the US West (Oregon) Amazon Web Services Region.
 *
 * Audit Manager deletes the snapshot and the backup snapshot when one of the following
 * events occurs:
 *
 * - The sender revokes the share request.
 *
 * - The recipient declines the share request.
 *
 * - The recipient encounters an error and doesn't successfully accept the share
 * request.
 *
 * - The share request expires before the recipient responds to the request.
 *
 * When a sender resends a share request, the snapshot is replaced with an updated version that
 * corresponds with the latest version of the custom framework.
 *
 * When a recipient accepts a share request, the snapshot is replicated into their Amazon Web Services account under the Amazon Web Services Region that was specified in the share
 * request.
 *
 * When you invoke the `StartAssessmentFrameworkShare` API, you are about to
 * share a custom framework with another Amazon Web Services account. You may not share a
 * custom framework that is derived from a standard framework if the standard framework is
 * designated as not eligible for sharing by Amazon Web Services, unless you have obtained
 * permission to do so from the owner of the standard framework. To learn more about which
 * standard frameworks are eligible for sharing, see Framework sharing eligibility in the Audit Manager User
 * Guide.
 */
export const startAssessmentFrameworkShare: API.OperationMethod<
  StartAssessmentFrameworkShareRequest,
  StartAssessmentFrameworkShareResponse,
  StartAssessmentFrameworkShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assessmentFrameworks/{frameworkId}/shareRequests",
    input: {
      frameworkId: 0,
      destinationAccount: 0,
      destinationRegion: 0,
      comment: 0,
    },
    output: {
      assessmentFrameworkShareRequest: o_AssessmentFrameworkShareRequest,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssessmentFrameworkShare",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Tags the specified resource in Audit Manager.
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from a resource in Audit Manager.
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Edits an Audit Manager assessment.
 */
export const updateAssessment: API.OperationMethod<
  UpdateAssessmentRequest,
  UpdateAssessmentResponse,
  UpdateAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assessments/{assessmentId}",
    input: {
      assessmentId: 0,
      assessmentName: 0,
      assessmentDescription: 0,
      scope: i_Scope,
      assessmentReportsDestination: i_AssessmentReportsDestination,
      roles: D.list(i_Role),
    },
    output: { assessment: o_Assessment },
    body: true,
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
  operationName: "UpdateAssessment",
})) as any;

export type UpdateAssessmentControlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a control within an assessment in Audit Manager.
 */
export const updateAssessmentControl: API.OperationMethod<
  UpdateAssessmentControlRequest,
  UpdateAssessmentControlResponse,
  UpdateAssessmentControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assessments/{assessmentId}/controlSets/{controlSetId}/controls/{controlId}",
    input: {
      assessmentId: 0,
      controlSetId: 0,
      controlId: 0,
      controlStatus: 0,
      commentBody: 0,
    },
    output: { control: o_AssessmentControl },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssessmentControl",
})) as any;

export type UpdateAssessmentControlSetStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of a control set in an Audit Manager assessment.
 */
export const updateAssessmentControlSetStatus: API.OperationMethod<
  UpdateAssessmentControlSetStatusRequest,
  UpdateAssessmentControlSetStatusResponse,
  UpdateAssessmentControlSetStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assessments/{assessmentId}/controlSets/{controlSetId}/status",
    input: { assessmentId: 0, controlSetId: 0, status: 0, comment: 0 },
    output: { controlSet: o_AssessmentControlSet },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssessmentControlSetStatus",
})) as any;

export type UpdateAssessmentFrameworkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates a custom framework in Audit Manager.
 */
export const updateAssessmentFramework: API.OperationMethod<
  UpdateAssessmentFrameworkRequest,
  UpdateAssessmentFrameworkResponse,
  UpdateAssessmentFrameworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assessmentFrameworks/{frameworkId}",
    input: {
      frameworkId: 0,
      name: 0,
      description: 0,
      complianceType: 0,
      controlSets: D.list({
        id: 0,
        name: 0,
        controls: D.list(i_CreateAssessmentFrameworkControl),
      }),
    },
    output: { framework: o_Framework },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssessmentFramework",
})) as any;

export type UpdateAssessmentFrameworkShareError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates a share request for a custom framework in Audit Manager.
 */
export const updateAssessmentFrameworkShare: API.OperationMethod<
  UpdateAssessmentFrameworkShareRequest,
  UpdateAssessmentFrameworkShareResponse,
  UpdateAssessmentFrameworkShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assessmentFrameworkShareRequests/{requestId}",
    input: { requestId: 0, requestType: 0, action: 0 },
    output: {
      assessmentFrameworkShareRequest: o_AssessmentFrameworkShareRequest,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssessmentFrameworkShare",
})) as any;

export type UpdateAssessmentStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of an assessment in Audit Manager.
 */
export const updateAssessmentStatus: API.OperationMethod<
  UpdateAssessmentStatusRequest,
  UpdateAssessmentStatusResponse,
  UpdateAssessmentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assessments/{assessmentId}/status",
    input: { assessmentId: 0, status: 0 },
    output: { assessment: o_Assessment },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssessmentStatus",
})) as any;

export type UpdateControlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a custom control in Audit Manager.
 */
export const updateControl: API.OperationMethod<
  UpdateControlRequest,
  UpdateControlResponse,
  UpdateControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /controls/{controlId}",
    input: {
      controlId: 0,
      name: 0,
      description: 0,
      testingInformation: 0,
      actionPlanTitle: 0,
      actionPlanInstructions: 0,
      controlMappingSources: D.list({
        sourceId: 0,
        sourceName: 0,
        sourceDescription: 0,
        sourceSetUpOption: 0,
        sourceType: 0,
        sourceKeyword: i_SourceKeyword,
        sourceFrequency: 0,
        troubleshootingText: 0,
      }),
    },
    output: { control: o_Control },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateControl",
})) as any;

export type UpdateSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Updates Audit Manager settings for the current account.
 */
export const updateSettings: API.OperationMethod<
  UpdateSettingsRequest,
  UpdateSettingsResponse,
  UpdateSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /settings",
    input: {
      snsTopic: 0,
      defaultAssessmentReportsDestination: i_AssessmentReportsDestination,
      defaultProcessOwners: D.list(i_Role),
      kmsKey: 0,
      evidenceFinderEnabled: 0,
      deregistrationPolicy: { deleteResources: 0 },
      defaultExportDestination: { destinationType: 0, destination: 0 },
    },
    output: { settings: o_Settings },
    body: true,
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSettings",
})) as any;

export type ValidateAssessmentReportIntegrityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Validates the integrity of an assessment report in Audit Manager.
 */
export const validateAssessmentReportIntegrity: API.OperationMethod<
  ValidateAssessmentReportIntegrityRequest,
  ValidateAssessmentReportIntegrityResponse,
  ValidateAssessmentReportIntegrityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assessmentReports/integrity",
    input: { s3RelativePath: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateAssessmentReportIntegrity",
})) as any;

const i_AssessmentReportsDestination: D.LazyStruct = () => ({
  destinationType: 0,
  destination: 0,
});
const i_CreateAssessmentFrameworkControl: D.LazyStruct = () => ({ id: 0 });
const i_Role: D.LazyStruct = () => ({ roleType: 0, roleArn: 0 });
const i_Scope: D.LazyStruct = () => ({
  awsAccounts: D.list({ id: 0, emailAddress: 0, name: 0 }),
  awsServices: D.list({ serviceName: 0 }),
});
const i_SourceKeyword: D.LazyStruct = () => ({
  keywordInputType: 0,
  keywordValue: 0,
});
const o_Assessment: D.LazyStruct = () => ({
  awsAccount: o_AWSAccount,
  metadata: {
    name: D.secret,
    description: D.secret,
    complianceType: D.secret,
    scope: { awsAccounts: D.list(o_AWSAccount) },
    delegations: D.list(o_Delegation),
    creationTime: D.ts,
    lastUpdated: D.ts,
  },
  framework: {
    metadata: { name: D.secret, complianceType: D.secret },
    controlSets: D.list(o_AssessmentControlSet),
  },
});
const o_AssessmentControl: D.LazyStruct = () => ({
  description: D.secret,
  comments: D.list({
    authorName: D.secret,
    commentBody: D.secret,
    postedDate: D.ts,
  }),
});
const o_AssessmentControlSet: D.LazyStruct = () => ({
  controls: D.list(o_AssessmentControl),
  delegations: D.list(o_Delegation),
});
const o_AssessmentEvidenceFolder: D.LazyStruct = () => ({ date: D.ts });
const o_AssessmentFrameworkShareRequest: D.LazyStruct = () => ({
  expirationTime: D.ts,
  creationTime: D.ts,
  lastUpdated: D.ts,
  complianceType: D.secret,
});
const o_Control: D.LazyStruct = () => ({
  description: D.secret,
  testingInformation: D.secret,
  actionPlanTitle: D.secret,
  actionPlanInstructions: D.secret,
  controlMappingSources: D.list({ troubleshootingText: D.secret }),
  createdAt: D.ts,
  lastUpdatedAt: D.ts,
  createdBy: D.secret,
  lastUpdatedBy: D.secret,
});
const o_ControlDomainInsights: D.LazyStruct = () => ({ lastUpdated: D.ts });
const o_Delegation: D.LazyStruct = () => ({
  assessmentName: D.secret,
  creationTime: D.ts,
  lastUpdated: D.ts,
  comment: D.secret,
  createdBy: D.secret,
});
const o_Evidence: D.LazyStruct = () => ({ time: D.ts });
const o_Framework: D.LazyStruct = () => ({
  complianceType: D.secret,
  controlSets: D.list({ controls: D.list(o_Control) }),
  createdAt: D.ts,
  lastUpdatedAt: D.ts,
  createdBy: D.secret,
  lastUpdatedBy: D.secret,
});
const o_Settings: D.LazyStruct = () => ({ snsTopic: D.secret });
const o_AWSAccount: D.LazyStruct = () => ({ emailAddress: D.secret });
