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
  sdkId: "Inspector2",
  target: "Inspector2",
  version: "2020-06-08",
  sigv4: "inspector2",
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
                `https://inspector2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://inspector2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://inspector2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://inspector2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
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
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string; readonly resourceId: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: string;
    readonly fields?: ValidationExceptionField[];
  }> {}
export type AccountId = string;
export interface AssociateMemberRequest {
  accountId: string;
}
export interface AssociateMemberResponse {
  accountId: string;
}
export type ScanConfigurationArn = string;
export type ProjectId = string;
export type CodeSecurityResource = { projectId: string };
export interface AssociateConfigurationRequest {
  scanConfigurationArn: string;
  resource: CodeSecurityResource;
}
export type AssociateConfigurationRequestList = AssociateConfigurationRequest[];
export interface BatchAssociateCodeSecurityScanConfigurationRequest {
  associateConfigurationRequests: AssociateConfigurationRequest[];
}
export type AssociationResultStatusCode =
  | "INTERNAL_ERROR"
  | "ACCESS_DENIED"
  | "SCAN_CONFIGURATION_NOT_FOUND"
  | "INVALID_INPUT"
  | "RESOURCE_NOT_FOUND"
  | "QUOTA_EXCEEDED"
  | (string & {});
export type AssociationResultStatusMessage = string;
export interface FailedAssociationResult {
  scanConfigurationArn?: string;
  resource?: CodeSecurityResource;
  statusCode?: AssociationResultStatusCode;
  statusMessage?: string;
}
export type FailedAssociationResultList = FailedAssociationResult[];
export interface SuccessfulAssociationResult {
  scanConfigurationArn?: string;
  resource?: CodeSecurityResource;
}
export type SuccessfulAssociationResultList = SuccessfulAssociationResult[];
export interface BatchAssociateCodeSecurityScanConfigurationResponse {
  failedAssociations?: FailedAssociationResult[];
  successfulAssociations?: SuccessfulAssociationResult[];
}
export interface DisassociateConfigurationRequest {
  scanConfigurationArn: string;
  resource: CodeSecurityResource;
}
export type DisassociateConfigurationRequestList =
  DisassociateConfigurationRequest[];
export interface BatchDisassociateCodeSecurityScanConfigurationRequest {
  disassociateConfigurationRequests: DisassociateConfigurationRequest[];
}
export interface BatchDisassociateCodeSecurityScanConfigurationResponse {
  failedAssociations?: FailedAssociationResult[];
  successfulAssociations?: SuccessfulAssociationResult[];
}
export type AccountIdSet = string[];
export interface BatchGetAccountStatusRequest {
  accountIds?: string[];
}
export type Status = string;
export type ErrorCode = string;
export type NonEmptyString = string;
export interface State {
  status: string;
  errorCode?: string;
  errorMessage?: string;
}
export interface ResourceState {
  ec2: State;
  ecr: State;
  lambda?: State;
  lambdaCode?: State;
  codeRepository?: State;
}
export interface AccountState {
  accountId: string;
  state: State;
  resourceState: ResourceState;
}
export type AccountStateList = AccountState[];
export interface ResourceStatus {
  ec2?: string;
  ecr?: string;
  lambda?: string;
  lambdaCode?: string;
  codeRepository?: string;
}
export interface FailedAccount {
  accountId: string;
  status?: string;
  resourceStatus?: ResourceStatus;
  errorCode?: string;
  errorMessage?: string;
}
export type FailedAccountList = FailedAccount[];
export interface BatchGetAccountStatusResponse {
  accounts: AccountState[];
  failedAccounts?: FailedAccount[];
}
export type FindingArn = string;
export type FindingArns = string[];
export interface BatchGetCodeSnippetRequest {
  findingArns: string[];
}
export interface CodeLine {
  content: string;
  lineNumber: number;
}
export type CodeLineList = CodeLine[];
export interface SuggestedFix {
  description?: string;
  code?: string;
}
export type SuggestedFixes = SuggestedFix[];
export interface CodeSnippetResult {
  findingArn?: string;
  startLine?: number;
  endLine?: number;
  codeSnippet?: CodeLine[];
  suggestedFixes?: SuggestedFix[];
}
export type CodeSnippetResultList = CodeSnippetResult[];
export type CodeSnippetErrorCode = string;
export interface CodeSnippetError {
  findingArn: string;
  errorCode: string;
  errorMessage: string;
}
export type CodeSnippetErrorList = CodeSnippetError[];
export interface BatchGetCodeSnippetResponse {
  codeSnippetResults?: CodeSnippetResult[];
  errors?: CodeSnippetError[];
}
export type FindingArnList = string[];
export interface BatchGetFindingDetailsRequest {
  findingArns: string[];
}
export type CisaDateAdded = Date;
export type CisaDateDue = Date;
export type CisaAction = string;
export interface CisaData {
  dateAdded?: Date;
  dateDue?: Date;
  action?: string;
}
export type RiskScore = number;
export type EvidenceRule = string;
export type EvidenceDetail = string;
export type EvidenceSeverity = string;
export interface Evidence {
  evidenceRule?: string;
  evidenceDetail?: string;
  severity?: string;
}
export type EvidenceList = Evidence[];
export type Ttp = string;
export type Ttps = string[];
export type Tool = string;
export type Tools = string[];
export type LastSeen = Date;
export type FirstSeen = Date;
export interface ExploitObserved {
  lastSeen?: Date;
  firstSeen?: Date;
}
export type VulnerabilityReferenceUrl = string;
export type VulnerabilityReferenceUrls = string[];
export type Cwe = string;
export type Cwes = string[];
export interface FindingDetail {
  findingArn?: string;
  cisaData?: CisaData;
  riskScore?: number;
  evidences?: Evidence[];
  ttps?: string[];
  tools?: string[];
  exploitObserved?: ExploitObserved;
  referenceUrls?: string[];
  cwes?: string[];
  epssScore?: number;
}
export type FindingDetails = FindingDetail[];
export type FindingDetailsErrorCode = string;
export interface FindingDetailsError {
  findingArn: string;
  errorCode: string;
  errorMessage: string;
}
export type FindingDetailsErrorList = FindingDetailsError[];
export interface BatchGetFindingDetailsResponse {
  findingDetails?: FindingDetail[];
  errors?: FindingDetailsError[];
}
export type MeteringAccountId = string;
export type MeteringAccountIdList = string[];
export interface BatchGetFreeTrialInfoRequest {
  accountIds: string[];
}
export type FreeTrialType = string;
export type FreeTrialStatus = string;
export type CloudProvider = string;
export interface FreeTrialInfo {
  type: string;
  start: Date;
  end: Date;
  status: string;
  cloudProvider?: string;
}
export type FreeTrialInfoList = FreeTrialInfo[];
export interface FreeTrialAccountInfo {
  accountId: string;
  freeTrialInfo: FreeTrialInfo[];
}
export type FreeTrialAccountInfoList = FreeTrialAccountInfo[];
export type FreeTrialInfoErrorCode = string;
export interface FreeTrialInfoError {
  accountId: string;
  code: string;
  message: string;
}
export type FreeTrialInfoErrorList = FreeTrialInfoError[];
export interface BatchGetFreeTrialInfoResponse {
  accounts: FreeTrialAccountInfo[];
  failedAccounts: FreeTrialInfoError[];
}
export interface BatchGetMemberEc2DeepInspectionStatusRequest {
  accountIds?: string[];
}
export type Ec2DeepInspectionStatus = string;
export interface MemberAccountEc2DeepInspectionStatusState {
  accountId: string;
  status?: string;
  errorMessage?: string;
}
export type MemberAccountEc2DeepInspectionStatusStateList =
  MemberAccountEc2DeepInspectionStatusState[];
export interface FailedMemberAccountEc2DeepInspectionStatusState {
  accountId: string;
  ec2ScanStatus?: string;
  errorMessage?: string;
}
export type FailedMemberAccountEc2DeepInspectionStatusStateList =
  FailedMemberAccountEc2DeepInspectionStatusState[];
export interface BatchGetMemberEc2DeepInspectionStatusResponse {
  accountIds?: MemberAccountEc2DeepInspectionStatusState[];
  failedAccountIds?: FailedMemberAccountEc2DeepInspectionStatusState[];
}
export interface MemberAccountEc2DeepInspectionStatus {
  accountId: string;
  activateDeepInspection: boolean;
}
export type MemberAccountEc2DeepInspectionStatusList =
  MemberAccountEc2DeepInspectionStatus[];
export interface BatchUpdateMemberEc2DeepInspectionStatusRequest {
  accountIds: MemberAccountEc2DeepInspectionStatus[];
}
export interface BatchUpdateMemberEc2DeepInspectionStatusResponse {
  accountIds?: MemberAccountEc2DeepInspectionStatusState[];
  failedAccountIds?: FailedMemberAccountEc2DeepInspectionStatusState[];
}
export type ReportId = string;
export interface CancelFindingsReportRequest {
  reportId: string;
}
export interface CancelFindingsReportResponse {
  reportId: string;
}
export interface CancelSbomExportRequest {
  reportId: string;
}
export interface CancelSbomExportResponse {
  reportId?: string;
}
export type CisScanName = string;
export type CisSecurityLevel = "LEVEL_1" | "LEVEL_2" | (string & {});
export interface OneTimeSchedule {}
export type TimeOfDay = string;
export type Timezone = string;
export interface Time {
  timeOfDay: string;
  timezone: string;
}
export interface DailySchedule {
  startTime: Time;
}
export type Day =
  | "SUN"
  | "MON"
  | "TUE"
  | "WED"
  | "THU"
  | "FRI"
  | "SAT"
  | (string & {});
export type DaysList = Day[];
export interface WeeklySchedule {
  startTime: Time;
  days: Day[];
}
export interface MonthlySchedule {
  startTime: Time;
  day: Day;
}
export type Schedule =
  | { oneTime: OneTimeSchedule; daily?: never; weekly?: never; monthly?: never }
  | { oneTime?: never; daily: DailySchedule; weekly?: never; monthly?: never }
  | { oneTime?: never; daily?: never; weekly: WeeklySchedule; monthly?: never }
  | {
      oneTime?: never;
      daily?: never;
      weekly?: never;
      monthly: MonthlySchedule;
    };
export type TargetAccount = string;
export type TargetAccountList = string[];
export type TargetResourceTagsKey = string;
export type TargetResourceTagsValue = string;
export type TagValueList = string[];
export type TargetResourceTags = { [key: string]: string[] | undefined };
export interface CreateCisTargets {
  accountIds: string[];
  targetResourceTags: { [key: string]: string[] | undefined };
}
export type MapKey = string;
export type MapValue = string;
export type CisTagMap = { [key: string]: string | undefined };
export interface CreateCisScanConfigurationRequest {
  scanName: string;
  securityLevel: CisSecurityLevel;
  schedule: Schedule;
  targets: CreateCisTargets;
  tags?: { [key: string]: string | undefined };
}
export type CisScanConfigurationArn = string;
export interface CreateCisScanConfigurationResponse {
  scanConfigurationArn?: string;
}
export type IntegrationName = string;
export type IntegrationType = "GITLAB_SELF_MANAGED" | "GITHUB" | (string & {});
export type InstanceUrl = string | redacted.Redacted<string>;
export type GitLabAccessToken = string | redacted.Redacted<string>;
export interface CreateGitLabSelfManagedIntegrationDetail {
  instanceUrl: string | redacted.Redacted<string>;
  accessToken: string | redacted.Redacted<string>;
}
export type CreateIntegrationDetail = {
  gitlabSelfManaged: CreateGitLabSelfManagedIntegrationDetail;
};
export type TagMap = { [key: string]: string | undefined };
export interface CreateCodeSecurityIntegrationRequest {
  name: string;
  type: IntegrationType;
  details?: CreateIntegrationDetail;
  tags?: { [key: string]: string | undefined };
}
export type CodeSecurityIntegrationArn = string;
export type IntegrationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "ACTIVE"
  | "INACTIVE"
  | "DISABLING"
  | (string & {});
export type AuthorizationUrl = string | redacted.Redacted<string>;
export interface CreateCodeSecurityIntegrationResponse {
  integrationArn: string;
  status: IntegrationStatus;
  authorizationUrl?: string | redacted.Redacted<string>;
}
export type ScanConfigurationName = string;
export type ConfigurationLevel = "ORGANIZATION" | "ACCOUNT" | (string & {});
export type PeriodicScanFrequency =
  | "WEEKLY"
  | "MONTHLY"
  | "NEVER"
  | (string & {});
export type FrequencyExpression = string;
export interface PeriodicScanConfiguration {
  frequency?: PeriodicScanFrequency;
  frequencyExpression?: string;
}
export type ContinuousIntegrationScanEvent =
  | "PULL_REQUEST"
  | "PUSH"
  | (string & {});
export type ContinuousIntegrationScanSupportedEvents =
  ContinuousIntegrationScanEvent[];
export interface ContinuousIntegrationScanConfiguration {
  supportedEvents: ContinuousIntegrationScanEvent[];
}
export type RuleSetCategory = "SAST" | "IAC" | "SCA" | (string & {});
export type RuleSetCategories = RuleSetCategory[];
export interface CodeSecurityScanConfiguration {
  periodicScanConfiguration?: PeriodicScanConfiguration;
  continuousIntegrationScanConfiguration?: ContinuousIntegrationScanConfiguration;
  ruleSetCategories: RuleSetCategory[];
}
export type ProjectSelectionScope = "ALL" | (string & {});
export interface ScopeSettings {
  projectSelectionScope?: ProjectSelectionScope;
}
export interface CreateCodeSecurityScanConfigurationRequest {
  name: string;
  level: ConfigurationLevel;
  configuration: CodeSecurityScanConfiguration;
  scopeSettings?: ScopeSettings;
  tags?: { [key: string]: string | undefined };
}
export interface CreateCodeSecurityScanConfigurationResponse {
  scanConfigurationArn: string;
}
export type ConnectorName = string;
export type ConnectorCloudProvider = "AZURE" | (string & {});
export type ConnectorDescription = string;
export type AwsConfigConnectorArn = string;
export type ScopeType = "TENANT" | "SUBSCRIPTION" | (string & {});
export type ScopeValue = string;
export type ScopeValueList = string[];
export interface ScopeConfigurationInput {
  scopeType: ScopeType;
  scopeValues?: string[];
}
export interface AzureScopeConfigurationInput {
  vmScanning?: ScopeConfigurationInput;
  containerImageScanning?: ScopeConfigurationInput;
  serverlessScanning?: ScopeConfigurationInput;
}
export type AzureRegion = string;
export type AzureRegionList = string[];
export interface AzureProviderDetailCreate {
  awsConfigConnectorArn: string;
  scopeConfiguration: AzureScopeConfigurationInput;
  azureRegions: string[];
  autoInstallVMScanner?: boolean;
}
export type ProviderDetailCreate = { azure: AzureProviderDetailCreate };
export type ConnectorTagKey = string;
export type ConnectorTagValue = string;
export type ConnectorTagMap = { [key: string]: string | undefined };
export interface CreateConnectorRequest {
  clientToken?: string;
  name: string;
  provider: ConnectorCloudProvider;
  description?: string;
  providerDetail: ProviderDetailCreate;
  tags?: { [key: string]: string | undefined };
}
export type ConnectorArn = string;
export interface CreateConnectorResponse {
  connectorArn: string;
}
export type FilterAction = string;
export type FilterDescription = string;
export type StringComparison = string;
export type StringInput = string;
export interface StringFilter {
  comparison: string;
  value: string;
}
export type StringFilterList = StringFilter[];
export interface DateFilter {
  startInclusive?: Date;
  endInclusive?: Date;
}
export type DateFilterList = DateFilter[];
export interface NumberFilter {
  upperInclusive?: number;
  lowerInclusive?: number;
}
export type NumberFilterList = NumberFilter[];
export type MapComparison = string;
export interface MapFilter {
  comparison: string;
  key: string;
  value?: string;
}
export type MapFilterList = MapFilter[];
export type Port = number;
export interface PortRangeFilter {
  beginInclusive?: number;
  endInclusive?: number;
}
export type PortRangeFilterList = PortRangeFilter[];
export interface PackageFilter {
  name?: StringFilter;
  version?: StringFilter;
  epoch?: NumberFilter;
  release?: StringFilter;
  architecture?: StringFilter;
  sourceLayerHash?: StringFilter;
  sourceLambdaLayerArn?: StringFilter;
  filePath?: StringFilter;
}
export type PackageFilterList = PackageFilter[];
export interface FilterCriteria {
  findingArn?: StringFilter[];
  awsAccountId?: StringFilter[];
  findingType?: StringFilter[];
  severity?: StringFilter[];
  firstObservedAt?: DateFilter[];
  lastObservedAt?: DateFilter[];
  updatedAt?: DateFilter[];
  findingStatus?: StringFilter[];
  title?: StringFilter[];
  inspectorScore?: NumberFilter[];
  resourceType?: StringFilter[];
  resourceId?: StringFilter[];
  resourceTags?: MapFilter[];
  ec2InstanceImageId?: StringFilter[];
  ec2InstanceVpcId?: StringFilter[];
  ec2InstanceSubnetId?: StringFilter[];
  ecrImagePushedAt?: DateFilter[];
  ecrImageArchitecture?: StringFilter[];
  ecrImageRegistry?: StringFilter[];
  ecrImageRepositoryName?: StringFilter[];
  ecrImageTags?: StringFilter[];
  ecrImageHash?: StringFilter[];
  ecrImageLastInUseAt?: DateFilter[];
  ecrImageInUseCount?: NumberFilter[];
  portRange?: PortRangeFilter[];
  networkProtocol?: StringFilter[];
  componentId?: StringFilter[];
  componentType?: StringFilter[];
  vulnerabilityId?: StringFilter[];
  vulnerabilitySource?: StringFilter[];
  vendorSeverity?: StringFilter[];
  vulnerablePackages?: PackageFilter[];
  relatedVulnerabilities?: StringFilter[];
  fixAvailable?: StringFilter[];
  lambdaFunctionName?: StringFilter[];
  lambdaFunctionLayers?: StringFilter[];
  lambdaFunctionRuntime?: StringFilter[];
  lambdaFunctionLastModifiedAt?: DateFilter[];
  lambdaFunctionExecutionRoleArn?: StringFilter[];
  exploitAvailable?: StringFilter[];
  codeVulnerabilityDetectorName?: StringFilter[];
  codeVulnerabilityDetectorTags?: StringFilter[];
  codeVulnerabilityFilePath?: StringFilter[];
  epssScore?: NumberFilter[];
  codeRepositoryProjectName?: StringFilter[];
  codeRepositoryProviderType?: StringFilter[];
  cloudProvider?: StringFilter[];
  cloudProviderRegion?: StringFilter[];
  cloudProviderAccountId?: StringFilter[];
  cloudProviderOrgId?: StringFilter[];
  cloudVmImageReference?: StringFilter[];
  cloudVmNetworkId?: StringFilter[];
  cloudVmSubnetIds?: StringFilter[];
  cloudImageRepositoryName?: StringFilter[];
  cloudImageRegistry?: StringFilter[];
  cloudImageDigest?: StringFilter[];
  cloudImageTags?: StringFilter[];
  cloudImagePushedAt?: DateFilter[];
  cloudImageArchitecture?: StringFilter[];
  cloudImageLastInUseAt?: DateFilter[];
  cloudImageInUseCount?: NumberFilter[];
  cloudServerlessFunctionName?: StringFilter[];
  cloudServerlessFunctionRuntime?: StringFilter[];
  cloudServerlessFunctionLastModifiedAt?: DateFilter[];
  cloudServerlessFunctionExecutionRole?: StringFilter[];
}
export type FilterName = string;
export type FilterReason = string;
export interface CreateFilterRequest {
  action: string;
  description?: string;
  filterCriteria: FilterCriteria;
  name: string;
  tags?: { [key: string]: string | undefined };
  reason?: string;
}
export type FilterArn = string;
export interface CreateFilterResponse {
  arn: string;
}
export type ReportFormat = string;
export interface Destination {
  bucketName: string;
  keyPrefix?: string;
  kmsKeyArn: string;
}
export interface CreateFindingsReportRequest {
  filterCriteria?: FilterCriteria;
  reportFormat: string;
  s3Destination: Destination;
}
export interface CreateFindingsReportResponse {
  reportId?: string;
}
export type ResourceStringComparison = string;
export type ResourceStringInput = string;
export interface ResourceStringFilter {
  comparison: string;
  value: string;
}
export type ResourceStringFilterList = ResourceStringFilter[];
export type ResourceMapComparison = string;
export interface ResourceMapFilter {
  comparison: string;
  key: string;
  value?: string;
}
export type ResourceMapFilterList = ResourceMapFilter[];
export interface ResourceFilterCriteria {
  accountId?: ResourceStringFilter[];
  resourceId?: ResourceStringFilter[];
  resourceType?: ResourceStringFilter[];
  ecrRepositoryName?: ResourceStringFilter[];
  lambdaFunctionName?: ResourceStringFilter[];
  ecrImageTags?: ResourceStringFilter[];
  ec2InstanceTags?: ResourceMapFilter[];
  lambdaFunctionTags?: ResourceMapFilter[];
  cloudProvider?: ResourceStringFilter[];
  cloudProviderAccountId?: ResourceStringFilter[];
  cloudProviderOrgId?: ResourceStringFilter[];
  cloudProviderRegion?: ResourceStringFilter[];
  cloudVmInstanceTags?: ResourceMapFilter[];
  cloudContainerImageTags?: ResourceStringFilter[];
  cloudContainerRepositoryName?: ResourceStringFilter[];
  cloudContainerRegistryName?: ResourceStringFilter[];
  cloudServerlessFunctionName?: ResourceStringFilter[];
  cloudServerlessFunctionRuntime?: ResourceStringFilter[];
  cloudServerlessFunctionTags?: ResourceMapFilter[];
}
export type SbomReportFormat = string;
export interface CreateSbomExportRequest {
  resourceFilterCriteria?: ResourceFilterCriteria;
  reportFormat: string;
  s3Destination: Destination;
}
export interface CreateSbomExportResponse {
  reportId?: string;
}
export interface DeleteCisScanConfigurationRequest {
  scanConfigurationArn: string;
}
export interface DeleteCisScanConfigurationResponse {
  scanConfigurationArn: string;
}
export interface DeleteCodeSecurityIntegrationRequest {
  integrationArn: string;
}
export interface DeleteCodeSecurityIntegrationResponse {
  integrationArn?: string;
}
export interface DeleteCodeSecurityScanConfigurationRequest {
  scanConfigurationArn: string;
}
export interface DeleteCodeSecurityScanConfigurationResponse {
  scanConfigurationArn?: string;
}
export interface DeleteConnectorRequest {
  connectorArn: string;
}
export interface DeleteConnectorResponse {}
export interface DeleteFilterRequest {
  arn: string;
}
export interface DeleteFilterResponse {
  arn: string;
}
export interface DescribeOrganizationConfigurationRequest {}
export interface AutoEnable {
  ec2: boolean;
  ecr: boolean;
  lambda?: boolean;
  lambdaCode?: boolean;
  codeRepository?: boolean;
}
export interface DescribeOrganizationConfigurationResponse {
  autoEnable?: AutoEnable;
  maxAccountLimitReached?: boolean;
}
export type ResourceScanType = string;
export type DisableResourceTypeList = string[];
export interface DisableRequest {
  accountIds?: string[];
  resourceTypes?: string[];
}
export interface Account {
  accountId: string;
  status: string;
  resourceStatus: ResourceStatus;
}
export type AccountList = Account[];
export interface DisableResponse {
  accounts: Account[];
  failedAccounts?: FailedAccount[];
}
export interface DisableDelegatedAdminAccountRequest {
  delegatedAdminAccountId: string;
}
export interface DisableDelegatedAdminAccountResponse {
  delegatedAdminAccountId: string;
}
export interface DisassociateMemberRequest {
  accountId: string;
}
export interface DisassociateMemberResponse {
  accountId: string;
}
export type EnableResourceTypeList = string[];
export type ClientToken = string;
export interface EnableRequest {
  accountIds?: string[];
  resourceTypes: string[];
  clientToken?: string;
}
export interface EnableResponse {
  accounts: Account[];
  failedAccounts?: FailedAccount[];
}
export interface EnableDelegatedAdminAccountRequest {
  delegatedAdminAccountId: string;
  clientToken?: string;
}
export interface EnableDelegatedAdminAccountResponse {
  delegatedAdminAccountId: string;
}
export type CisScanArn = string;
export type ReportTargetAccounts = string[];
export type CisReportFormat = "PDF" | "CSV" | (string & {});
export interface GetCisScanReportRequest {
  scanArn: string;
  targetAccounts?: string[];
  reportFormat?: CisReportFormat;
}
export type CisReportStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "IN_PROGRESS"
  | (string & {});
export interface GetCisScanReportResponse {
  url?: string;
  status?: CisReportStatus;
}
export type ResourceId = string;
export type CisFindingStatusComparison = "EQUALS" | (string & {});
export type CisFindingStatus = "PASSED" | "FAILED" | "SKIPPED" | (string & {});
export interface CisFindingStatusFilter {
  comparison: CisFindingStatusComparison;
  value: CisFindingStatus;
}
export type CisFindingStatusFilterList = CisFindingStatusFilter[];
export type CisStringComparison =
  | "EQUALS"
  | "PREFIX"
  | "NOT_EQUALS"
  | (string & {});
export interface CisStringFilter {
  comparison: CisStringComparison;
  value: string;
}
export type CheckIdFilterList = CisStringFilter[];
export type TitleFilterList = CisStringFilter[];
export type CisSecurityLevelComparison = "EQUALS" | (string & {});
export interface CisSecurityLevelFilter {
  comparison: CisSecurityLevelComparison;
  value: CisSecurityLevel;
}
export type CisSecurityLevelFilterList = CisSecurityLevelFilter[];
export type CisFindingArnFilterList = CisStringFilter[];
export interface CisScanResultDetailsFilterCriteria {
  findingStatusFilters?: CisFindingStatusFilter[];
  checkIdFilters?: CisStringFilter[];
  titleFilters?: CisStringFilter[];
  securityLevelFilters?: CisSecurityLevelFilter[];
  findingArnFilters?: CisStringFilter[];
}
export type CisScanResultDetailsSortBy = "CHECK_ID" | "STATUS" | (string & {});
export type CisSortOrder = "ASC" | "DESC" | (string & {});
export type NextToken = string;
export type GetCisScanResultDetailsMaxResults = number;
export interface GetCisScanResultDetailsRequest {
  scanArn: string;
  targetResourceId: string;
  accountId: string;
  filterCriteria?: CisScanResultDetailsFilterCriteria;
  sortBy?: CisScanResultDetailsSortBy;
  sortOrder?: CisSortOrder;
  nextToken?: string;
  maxResults?: number;
}
export type CisFindingArn = string;
export interface CisScanResultDetails {
  scanArn: string;
  accountId?: string;
  targetResourceId?: string;
  platform?: string;
  status?: CisFindingStatus;
  statusReason?: string;
  checkId?: string;
  title?: string;
  checkDescription?: string;
  remediation?: string;
  level?: CisSecurityLevel;
  findingArn?: string;
}
export type CisScanResultDetailsList = CisScanResultDetails[];
export interface GetCisScanResultDetailsResponse {
  scanResultDetails?: CisScanResultDetails[];
  nextToken?: string;
}
export interface ClusterForImageFilterCriteria {
  resourceId: string;
}
export type GetClustersForImageNextToken = string;
export interface GetClustersForImageRequest {
  filter: ClusterForImageFilterCriteria;
  maxResults?: number;
  nextToken?: string;
}
export interface AwsEcsMetadataDetails {
  detailsGroup: string;
  taskDefinitionArn: string;
}
export interface AwsEksWorkloadInfo {
  name: string;
  type: string;
}
export type AwsEksWorkloadInfoList = AwsEksWorkloadInfo[];
export interface AwsEksMetadataDetails {
  namespace?: string;
  workloadInfoList?: AwsEksWorkloadInfo[];
}
export type ClusterMetadata =
  | {
      awsEcsMetadataDetails: AwsEcsMetadataDetails;
      awsEksMetadataDetails?: never;
    }
  | {
      awsEcsMetadataDetails?: never;
      awsEksMetadataDetails: AwsEksMetadataDetails;
    };
export interface ClusterDetails {
  lastInUse: Date;
  runningUnitCount?: number;
  stoppedUnitCount?: number;
  clusterMetadata: ClusterMetadata;
}
export type ClusterDetailsList = ClusterDetails[];
export interface ClusterInformation {
  clusterArn: string;
  clusterDetails?: ClusterDetails[];
}
export type ClusterInformationList = ClusterInformation[];
export interface GetClustersForImageResponse {
  cluster: ClusterInformation[];
  nextToken?: string;
}
export interface GetCodeSecurityIntegrationRequest {
  integrationArn: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetCodeSecurityIntegrationResponse {
  integrationArn: string;
  name: string;
  type: IntegrationType;
  status: IntegrationStatus;
  statusReason: string;
  createdOn: Date;
  lastUpdateOn: Date;
  authorizationUrl?: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
}
export type CodeSecurityUuid = string;
export interface GetCodeSecurityScanRequest {
  resource: CodeSecurityResource;
  scanId: string;
}
export type CodeScanStatus =
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "SKIPPED"
  | (string & {});
export interface GetCodeSecurityScanResponse {
  scanId?: string;
  resource?: CodeSecurityResource;
  accountId?: string;
  status?: CodeScanStatus;
  statusReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastCommitId?: string;
}
export interface GetCodeSecurityScanConfigurationRequest {
  scanConfigurationArn: string;
}
export interface GetCodeSecurityScanConfigurationResponse {
  scanConfigurationArn?: string;
  name?: string;
  configuration?: CodeSecurityScanConfiguration;
  level?: ConfigurationLevel;
  scopeSettings?: ScopeSettings;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export interface GetConfigurationRequest {
  accountId?: string;
}
export type EcrRescanDuration = string;
export type EcrRescanDurationStatus = string;
export type DateTimeTimestamp = Date;
export type EcrPullDateRescanDuration = string;
export type EcrPullDateRescanMode = string;
export interface EcrRescanDurationState {
  rescanDuration?: string;
  status?: string;
  updatedAt?: Date;
  pullDateRescanDuration?: string;
  pullDateRescanMode?: string;
}
export interface EcrConfigurationState {
  rescanDurationState?: EcrRescanDurationState;
}
export type Ec2ScanMode = string;
export type Ec2ScanModeStatus = string;
export interface Ec2ScanModeState {
  scanMode?: string;
  scanModeStatus?: string;
}
export type VMScannerStatus = string;
export interface VMScannerState {
  activated?: boolean;
  activatedAt?: Date;
  status?: string;
}
export interface Ec2ConfigurationState {
  scanModeState?: Ec2ScanModeState;
  vmScannerState?: VMScannerState;
}
export interface GetConfigurationResponse {
  ecrConfiguration?: EcrConfigurationState;
  ec2Configuration?: Ec2ConfigurationState;
}
export interface GetDelegatedAdminAccountRequest {}
export type RelationshipStatus = string;
export interface DelegatedAdmin {
  accountId?: string;
  relationshipStatus?: string;
}
export interface GetDelegatedAdminAccountResponse {
  delegatedAdmin?: DelegatedAdmin;
}
export interface GetEc2DeepInspectionConfigurationRequest {}
export type Path = string;
export type PathList = string[];
export interface GetEc2DeepInspectionConfigurationResponse {
  packagePaths?: string[];
  orgPackagePaths?: string[];
  status?: string;
  errorMessage?: string;
}
export type ScanType = string;
export type ResourceType = string;
export interface GetEncryptionKeyRequest {
  scanType: string;
  resourceType: string;
}
export type KmsKeyArn = string;
export interface GetEncryptionKeyResponse {
  kmsKeyId: string;
}
export interface GetFindingsReportStatusRequest {
  reportId?: string;
}
export type ExternalReportStatus = string;
export type ReportingErrorCode = string;
export type ErrorMessage = string;
export interface GetFindingsReportStatusResponse {
  reportId?: string;
  status?: string;
  errorCode?: string;
  errorMessage?: string;
  destination?: Destination;
  filterCriteria?: FilterCriteria;
}
export interface GetMemberRequest {
  accountId: string;
}
export interface Member {
  accountId?: string;
  relationshipStatus?: string;
  delegatedAdminAccountId?: string;
  updatedAt?: Date;
}
export interface GetMemberResponse {
  member?: Member;
}
export interface GetSbomExportRequest {
  reportId: string;
}
export interface GetSbomExportResponse {
  reportId?: string;
  format?: string;
  status?: string;
  errorCode?: string;
  errorMessage?: string;
  s3Destination?: Destination;
  filterCriteria?: ResourceFilterCriteria;
}
export type Service = string;
export type ListAccountPermissionsMaxResults = number;
export interface ListAccountPermissionsRequest {
  service?: string;
  maxResults?: number;
  nextToken?: string;
}
export type Operation = string;
export interface Permission {
  service: string;
  operation: string;
}
export type Permissions = Permission[];
export interface ListAccountPermissionsResponse {
  permissions: Permission[];
  nextToken?: string;
}
export type CisScanNameFilterList = CisStringFilter[];
export type TagComparison = "EQUALS" | (string & {});
export interface TagFilter {
  comparison: TagComparison;
  key: string;
  value: string;
}
export type ResourceTagFilterList = TagFilter[];
export type CisScanConfigurationArnFilterList = CisStringFilter[];
export interface ListCisScanConfigurationsFilterCriteria {
  scanNameFilters?: CisStringFilter[];
  targetResourceTagFilters?: TagFilter[];
  scanConfigurationArnFilters?: CisStringFilter[];
}
export type CisScanConfigurationsSortBy =
  | "SCAN_NAME"
  | "SCAN_CONFIGURATION_ARN"
  | (string & {});
export type ListCisScanConfigurationsMaxResults = number;
export interface ListCisScanConfigurationsRequest {
  filterCriteria?: ListCisScanConfigurationsFilterCriteria;
  sortBy?: CisScanConfigurationsSortBy;
  sortOrder?: CisSortOrder;
  nextToken?: string;
  maxResults?: number;
}
export type CisOwnerId = string;
export type CisAccountIdList = string[];
export interface CisTargets {
  accountIds?: string[];
  targetResourceTags?: { [key: string]: string[] | undefined };
}
export interface CisScanConfiguration {
  scanConfigurationArn: string;
  ownerId?: string;
  scanName?: string;
  securityLevel?: CisSecurityLevel;
  schedule?: Schedule;
  targets?: CisTargets;
  tags?: { [key: string]: string | undefined };
}
export type CisScanConfigurationList = CisScanConfiguration[];
export interface ListCisScanConfigurationsResponse {
  scanConfigurations?: CisScanConfiguration[];
  nextToken?: string;
}
export type OneAccountIdFilterList = CisStringFilter[];
export type PlatformFilterList = CisStringFilter[];
export interface CisNumberFilter {
  upperInclusive?: number;
  lowerInclusive?: number;
}
export type CisNumberFilterList = CisNumberFilter[];
export interface CisScanResultsAggregatedByChecksFilterCriteria {
  accountIdFilters?: CisStringFilter[];
  checkIdFilters?: CisStringFilter[];
  titleFilters?: CisStringFilter[];
  platformFilters?: CisStringFilter[];
  failedResourcesFilters?: CisNumberFilter[];
  securityLevelFilters?: CisSecurityLevelFilter[];
}
export type CisScanResultsAggregatedByChecksSortBy =
  | "CHECK_ID"
  | "TITLE"
  | "PLATFORM"
  | "FAILED_COUNTS"
  | "SECURITY_LEVEL"
  | (string & {});
export type CisScanResultsMaxResults = number;
export interface ListCisScanResultsAggregatedByChecksRequest {
  scanArn: string;
  filterCriteria?: CisScanResultsAggregatedByChecksFilterCriteria;
  sortBy?: CisScanResultsAggregatedByChecksSortBy;
  sortOrder?: CisSortOrder;
  nextToken?: string;
  maxResults?: number;
}
export interface StatusCounts {
  failed?: number;
  skipped?: number;
  passed?: number;
}
export interface CisCheckAggregation {
  scanArn: string;
  checkId?: string;
  title?: string;
  checkDescription?: string;
  level?: CisSecurityLevel;
  accountId?: string;
  statusCounts?: StatusCounts;
  platform?: string;
}
export type CisCheckAggregationList = CisCheckAggregation[];
export interface ListCisScanResultsAggregatedByChecksResponse {
  checkAggregations?: CisCheckAggregation[];
  nextToken?: string;
}
export type AccountIdFilterList = CisStringFilter[];
export type CisResultStatusComparison = "EQUALS" | (string & {});
export type CisResultStatus = "PASSED" | "FAILED" | "SKIPPED" | (string & {});
export interface CisResultStatusFilter {
  comparison: CisResultStatusComparison;
  value: CisResultStatus;
}
export type CisResultStatusFilterList = CisResultStatusFilter[];
export type ResourceIdFilterList = CisStringFilter[];
export type CisTargetStatusComparison = "EQUALS" | (string & {});
export type CisTargetStatus =
  | "TIMED_OUT"
  | "CANCELLED"
  | "COMPLETED"
  | (string & {});
export interface CisTargetStatusFilter {
  comparison: CisTargetStatusComparison;
  value: CisTargetStatus;
}
export type TargetStatusFilterList = CisTargetStatusFilter[];
export type CisTargetStatusReason =
  | "SCAN_IN_PROGRESS"
  | "UNSUPPORTED_OS"
  | "SSM_UNMANAGED"
  | (string & {});
export interface CisTargetStatusReasonFilter {
  comparison: CisTargetStatusComparison;
  value: CisTargetStatusReason;
}
export type TargetStatusReasonFilterList = CisTargetStatusReasonFilter[];
export interface CisScanResultsAggregatedByTargetResourceFilterCriteria {
  accountIdFilters?: CisStringFilter[];
  statusFilters?: CisResultStatusFilter[];
  checkIdFilters?: CisStringFilter[];
  targetResourceIdFilters?: CisStringFilter[];
  targetResourceTagFilters?: TagFilter[];
  platformFilters?: CisStringFilter[];
  targetStatusFilters?: CisTargetStatusFilter[];
  targetStatusReasonFilters?: CisTargetStatusReasonFilter[];
  failedChecksFilters?: CisNumberFilter[];
}
export type CisScanResultsAggregatedByTargetResourceSortBy =
  | "RESOURCE_ID"
  | "FAILED_COUNTS"
  | "ACCOUNT_ID"
  | "PLATFORM"
  | "TARGET_STATUS"
  | "TARGET_STATUS_REASON"
  | (string & {});
export interface ListCisScanResultsAggregatedByTargetResourceRequest {
  scanArn: string;
  filterCriteria?: CisScanResultsAggregatedByTargetResourceFilterCriteria;
  sortBy?: CisScanResultsAggregatedByTargetResourceSortBy;
  sortOrder?: CisSortOrder;
  nextToken?: string;
  maxResults?: number;
}
export interface CisTargetResourceAggregation {
  scanArn: string;
  targetResourceId?: string;
  accountId?: string;
  targetResourceTags?: { [key: string]: string[] | undefined };
  statusCounts?: StatusCounts;
  platform?: string;
  targetStatus?: CisTargetStatus;
  targetStatusReason?: CisTargetStatusReason;
}
export type CisTargetResourceAggregationList = CisTargetResourceAggregation[];
export interface ListCisScanResultsAggregatedByTargetResourceResponse {
  targetResourceAggregations?: CisTargetResourceAggregation[];
  nextToken?: string;
}
export type CisScanStatusComparison = "EQUALS" | (string & {});
export type CisScanStatus =
  | "FAILED"
  | "COMPLETED"
  | "CANCELLED"
  | "IN_PROGRESS"
  | (string & {});
export interface CisScanStatusFilter {
  comparison: CisScanStatusComparison;
  value: CisScanStatus;
}
export type CisScanStatusFilterList = CisScanStatusFilter[];
export interface CisDateFilter {
  earliestScanStartTime?: Date;
  latestScanStartTime?: Date;
}
export type CisScanDateFilterList = CisDateFilter[];
export type CisScanArnFilterList = CisStringFilter[];
export type CisScheduledByFilterList = CisStringFilter[];
export interface ListCisScansFilterCriteria {
  scanNameFilters?: CisStringFilter[];
  targetResourceTagFilters?: TagFilter[];
  targetResourceIdFilters?: CisStringFilter[];
  scanStatusFilters?: CisScanStatusFilter[];
  scanAtFilters?: CisDateFilter[];
  scanConfigurationArnFilters?: CisStringFilter[];
  scanArnFilters?: CisStringFilter[];
  scheduledByFilters?: CisStringFilter[];
  failedChecksFilters?: CisNumberFilter[];
  targetAccountIdFilters?: CisStringFilter[];
}
export type ListCisScansDetailLevel = "ORGANIZATION" | "MEMBER" | (string & {});
export type ListCisScansSortBy =
  | "STATUS"
  | "SCHEDULED_BY"
  | "SCAN_START_DATE"
  | "FAILED_CHECKS"
  | (string & {});
export type ListCisScansMaxResults = number;
export interface ListCisScansRequest {
  filterCriteria?: ListCisScansFilterCriteria;
  detailLevel?: ListCisScansDetailLevel;
  sortBy?: ListCisScansSortBy;
  sortOrder?: CisSortOrder;
  nextToken?: string;
  maxResults?: number;
}
export interface CisScan {
  scanArn: string;
  scanConfigurationArn: string;
  status?: CisScanStatus;
  scanName?: string;
  scanDate?: Date;
  failedChecks?: number;
  totalChecks?: number;
  targets?: CisTargets;
  scheduledBy?: string;
  securityLevel?: CisSecurityLevel;
}
export type CisScanList = CisScan[];
export interface ListCisScansResponse {
  scans?: CisScan[];
  nextToken?: string;
}
export interface ListCodeSecurityIntegrationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface CodeSecurityIntegrationSummary {
  integrationArn: string;
  name: string;
  type: IntegrationType;
  status: IntegrationStatus;
  statusReason: string;
  createdOn: Date;
  lastUpdateOn: Date;
}
export type IntegrationSummaries = CodeSecurityIntegrationSummary[];
export interface ListCodeSecurityIntegrationsResponse {
  integrations?: CodeSecurityIntegrationSummary[];
  nextToken?: string;
}
export interface ListCodeSecurityScanConfigurationAssociationsRequest {
  scanConfigurationArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface CodeSecurityScanConfigurationAssociationSummary {
  resource?: CodeSecurityResource;
}
export type CodeSecurityScanConfigurationAssociationSummaries =
  CodeSecurityScanConfigurationAssociationSummary[];
export interface ListCodeSecurityScanConfigurationAssociationsResponse {
  associations?: CodeSecurityScanConfigurationAssociationSummary[];
  nextToken?: string;
}
export interface ListCodeSecurityScanConfigurationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type OwnerId = string;
export interface CodeSecurityScanConfigurationSummary {
  scanConfigurationArn: string;
  name: string;
  ownerAccountId: string;
  periodicScanFrequency?: PeriodicScanFrequency;
  frequencyExpression?: string;
  continuousIntegrationScanSupportedEvents?: ContinuousIntegrationScanEvent[];
  ruleSetCategories: RuleSetCategory[];
  scopeSettings?: ScopeSettings;
}
export type CodeSecurityScanConfigurationSummaries =
  CodeSecurityScanConfigurationSummary[];
export interface ListCodeSecurityScanConfigurationsResponse {
  configurations?: CodeSecurityScanConfigurationSummary[];
  nextToken?: string;
}
export type ConnectorNextToken = string | redacted.Redacted<string>;
export type ConnectorArnComparison = "EQUALS" | (string & {});
export interface ConnectorArnFilter {
  comparison: ConnectorArnComparison;
  value: string;
}
export type ConnectorArnFilterList = ConnectorArnFilter[];
export type AwsConfigConnectorArnComparison = "EQUALS" | (string & {});
export interface AwsConfigConnectorArnFilter {
  comparison: AwsConfigConnectorArnComparison;
  value: string;
}
export type AwsConfigConnectorArnFilterList = AwsConfigConnectorArnFilter[];
export type ConnectorTypeComparison = "EQUALS" | (string & {});
export type ConnectorType =
  | "CUSTOMER_MANAGED"
  | "SERVICE_LINKED"
  | (string & {});
export interface ConnectorTypeFilter {
  comparison: ConnectorTypeComparison;
  value: ConnectorType;
}
export type ConnectorTypeFilterList = ConnectorTypeFilter[];
export type ProviderComparison = "EQUALS" | (string & {});
export interface ProviderFilter {
  comparison: ProviderComparison;
  value: ConnectorCloudProvider;
}
export type ProviderFilterList = ProviderFilter[];
export interface ConnectorFilterCriteria {
  connectorArns?: ConnectorArnFilter[];
  accounts?: StringFilter[];
  awsConfigConnectorArns?: AwsConfigConnectorArnFilter[];
  connectorType?: ConnectorTypeFilter[];
  provider?: ProviderFilter[];
}
export interface ListConnectorsRequest {
  maxResults?: number;
  nextToken?: string | redacted.Redacted<string>;
  filterCriteria?: ConnectorFilterCriteria;
}
export type EnablementStatus =
  | "ENABLED"
  | "PENDING_ENABLEMENT"
  | "FAILED_TO_ENABLE"
  | "PENDING_UPDATE"
  | "FAILED_TO_UPDATE"
  | "PENDING_DELETION"
  | "DELETED"
  | "FAILED_TO_DELETE"
  | (string & {});
export type ConnectorHealthStatus =
  | "CONNECTED"
  | "DEGRADED"
  | "FAILED_TO_CONNECT"
  | "PENDING_AUTHORIZATION"
  | "PENDING_CONFIGURATION"
  | "UNKNOWN"
  | (string & {});
export interface ConnectorHealth {
  connectorStatus: ConnectorHealthStatus;
  lastCheckedAt: Date;
  message?: string;
}
export type ScopeState =
  | "ACTIVE"
  | "PENDING"
  | "ERROR"
  | "DISABLED"
  | (string & {});
export interface ScopeConfiguration {
  scopeType: ScopeType;
  scopeValues?: string[];
  state?: ScopeState;
  stateReason?: string;
}
export interface AzureScopeConfiguration {
  vmScanning?: ScopeConfiguration;
  containerImageScanning?: ScopeConfiguration;
  serverlessScanning?: ScopeConfiguration;
}
export interface Connector {
  connectorArn: string;
  name?: string;
  description?: string;
  provider: ConnectorCloudProvider;
  enablementStatus?: EnablementStatus;
  enablementStatusReason?: string;
  health?: ConnectorHealth;
  createdAt: Date;
  updatedAt: Date;
  azureRegions?: string[];
  awsConfigConnectorArn?: string;
  scopeConfiguration?: AzureScopeConfiguration;
  tags?: { [key: string]: string | undefined };
  autoInstallVMScanner?: boolean;
}
export type ConnectorList = Connector[];
export interface ListConnectorsResponse {
  items: Connector[];
  nextToken?: string | redacted.Redacted<string>;
}
export type AwsConfigConnectorArnList = string[];
export type ListConnectorScanConfigurationsMaxResults = number;
export interface ListConnectorScanConfigurationsRequest {
  awsConfigConnectorArns?: string[];
  maxResults?: number;
  nextToken?: string | redacted.Redacted<string>;
}
export type ConnectorArnList = string[];
export type ContainerImageRescanDuration = string;
export type ContainerImagePullDateRescanDuration = string;
export interface ConnectorContainerImageScanConfiguration {
  pushDuration?: string;
  pullDuration?: string;
}
export interface ConnectorScanConfiguration {
  containerImageScanning?: ConnectorContainerImageScanConfiguration;
}
export interface ConnectorScanConfigurationItem {
  awsConfigConnectorArn: string;
  connectorArns: string[];
  scanConfiguration: ConnectorScanConfiguration;
}
export type ConnectorScanConfigurationItemList =
  ConnectorScanConfigurationItem[];
export interface ListConnectorScanConfigurationsResponse {
  scanConfigurations: ConnectorScanConfigurationItem[];
  nextToken?: string | redacted.Redacted<string>;
}
export type ListCoverageMaxResults = number;
export type CoverageStringComparison = string;
export type CoverageStringInput = string;
export interface CoverageStringFilter {
  comparison: string;
  value: string;
}
export type CoverageStringFilterList = CoverageStringFilter[];
export type CoverageMapComparison = string;
export interface CoverageMapFilter {
  comparison: string;
  key: string;
  value?: string;
}
export type CoverageMapFilterList = CoverageMapFilter[];
export interface CoverageDateFilter {
  startInclusive?: Date;
  endInclusive?: Date;
}
export type CoverageDateFilterList = CoverageDateFilter[];
export interface CoverageNumberFilter {
  upperInclusive?: number;
  lowerInclusive?: number;
}
export type CoverageNumberFilterList = CoverageNumberFilter[];
export interface CoverageFilterCriteria {
  scanStatusCode?: CoverageStringFilter[];
  scanStatusReason?: CoverageStringFilter[];
  accountId?: CoverageStringFilter[];
  resourceId?: CoverageStringFilter[];
  resourceType?: CoverageStringFilter[];
  scanType?: CoverageStringFilter[];
  ecrRepositoryName?: CoverageStringFilter[];
  ecrImageTags?: CoverageStringFilter[];
  ec2InstanceTags?: CoverageMapFilter[];
  lambdaFunctionName?: CoverageStringFilter[];
  lambdaFunctionTags?: CoverageMapFilter[];
  lambdaFunctionRuntime?: CoverageStringFilter[];
  lastScannedAt?: CoverageDateFilter[];
  scanMode?: CoverageStringFilter[];
  imagePulledAt?: CoverageDateFilter[];
  ecrImageLastInUseAt?: CoverageDateFilter[];
  ecrImageInUseCount?: CoverageNumberFilter[];
  codeRepositoryProjectName?: CoverageStringFilter[];
  codeRepositoryProviderType?: CoverageStringFilter[];
  codeRepositoryProviderTypeVisibility?: CoverageStringFilter[];
  lastScannedCommitId?: CoverageStringFilter[];
  cloudProvider?: CoverageStringFilter[];
  cloudProviderAccountId?: CoverageStringFilter[];
  cloudProviderRegion?: CoverageStringFilter[];
  cloudVmInstanceTags?: CoverageMapFilter[];
  cloudContainerImageTags?: CoverageStringFilter[];
  cloudContainerRepositoryName?: CoverageStringFilter[];
  cloudContainerRegistryName?: CoverageStringFilter[];
  cloudServerlessFunctionName?: CoverageStringFilter[];
  cloudServerlessFunctionRuntime?: CoverageStringFilter[];
  cloudServerlessFunctionTags?: CoverageMapFilter[];
  cloudProviderOrgId?: CoverageStringFilter[];
}
export interface ListCoverageRequest {
  maxResults?: number;
  nextToken?: string;
  filterCriteria?: CoverageFilterCriteria;
}
export type CoverageResourceType = string;
export type ScanStatusCode = string;
export type ScanStatusReason = string;
export interface ScanStatus {
  statusCode: string;
  reason: string;
}
export type EcrScanFrequency = string;
export interface EcrRepositoryMetadata {
  name?: string;
  scanFrequency?: string;
}
export type TagList = string[];
export interface EcrContainerImageMetadata {
  tags?: string[];
  imagePulledAt?: Date;
  lastInUseAt?: Date;
  inUseCount?: number;
}
export type AmiId = string;
export type Ec2Platform = string;
export interface Ec2Metadata {
  tags?: { [key: string]: string | undefined };
  amiId?: string;
  platform?: string;
}
export type LambdaLayerList = string[];
export type Runtime = string;
export interface LambdaFunctionMetadata {
  functionTags?: { [key: string]: string | undefined };
  layers?: string[];
  functionName?: string;
  runtime?: string;
}
export type CodeRepositoryIntegrationArn = string;
export type CommitId = string;
export interface ProjectPeriodicScanConfiguration {
  frequencyExpression?: string;
  ruleSetCategories?: RuleSetCategory[];
}
export type ProjectPeriodicScanConfigurationList =
  ProjectPeriodicScanConfiguration[];
export interface ProjectContinuousIntegrationScanConfiguration {
  supportedEvent?: ContinuousIntegrationScanEvent;
  ruleSetCategories?: RuleSetCategory[];
}
export type ProjectContinuousIntegrationScanConfigurationList =
  ProjectContinuousIntegrationScanConfiguration[];
export interface ProjectCodeSecurityScanConfiguration {
  periodicScanConfigurations?: ProjectPeriodicScanConfiguration[];
  continuousIntegrationScanConfigurations?: ProjectContinuousIntegrationScanConfiguration[];
}
export interface CodeRepositoryOnDemandScan {
  lastScannedCommitId?: string;
  lastScanAt?: Date;
  scanStatus?: ScanStatus;
}
export interface CodeRepositoryMetadata {
  projectName: string;
  integrationArn?: string;
  providerType: string;
  providerTypeVisibility: string;
  lastScannedCommitId?: string;
  scanConfiguration?: ProjectCodeSecurityScanConfiguration;
  onDemandScan?: CodeRepositoryOnDemandScan;
}
export type VmPlatform = string;
export interface VmInstanceMetadata {
  tags?: { [key: string]: string | undefined };
  platform?: string;
  inventoryHash?: string;
  vmImageReference?: string;
}
export interface ContainerImageMetadata {
  imageTags?: string[];
  imagePulledAt?: Date;
  lastInUseAt?: Date;
  inUseCount?: number;
}
export interface ContainerRepositoryMetadata {
  name?: string;
  scanFrequency?: string;
}
export interface ContainerRegistryMetadata {
  name?: string;
}
export interface ServerlessFunctionMetadata {
  serverlessFunctionName?: string;
  runtime?: string;
  functionTags?: { [key: string]: string | undefined };
}
export interface ResourceScanMetadata {
  ecrRepository?: EcrRepositoryMetadata;
  ecrImage?: EcrContainerImageMetadata;
  ec2?: Ec2Metadata;
  lambdaFunction?: LambdaFunctionMetadata;
  codeRepository?: CodeRepositoryMetadata;
  vmInstance?: VmInstanceMetadata;
  containerImage?: ContainerImageMetadata;
  containerRepository?: ContainerRepositoryMetadata;
  containerRegistry?: ContainerRegistryMetadata;
  serverlessFunction?: ServerlessFunctionMetadata;
}
export type ScanMode = string;
export type Provider = string;
export type ProviderAccountId = string;
export type ProviderOrgId = string;
export type ProviderRegion = string;
export type ProviderPartition = string;
export interface CoveredResource {
  resourceType: string;
  resourceId: string;
  accountId: string;
  scanType: string;
  scanStatus?: ScanStatus;
  resourceMetadata?: ResourceScanMetadata;
  lastScannedAt?: Date;
  scanMode?: string;
  provider?: string;
  providerAccountId?: string;
  providerOrgId?: string;
  providerRegion?: string;
  providerPartition?: string;
}
export type CoveredResources = CoveredResource[];
export interface ListCoverageResponse {
  nextToken?: string;
  coveredResources?: CoveredResource[];
}
export type GroupKey = string;
export interface ListCoverageStatisticsRequest {
  filterCriteria?: CoverageFilterCriteria;
  groupBy?: string;
  nextToken?: string;
}
export type AggCounts = number;
export interface Counts {
  count?: number;
  groupKey?: string;
}
export type CountsList = Counts[];
export interface ListCoverageStatisticsResponse {
  countsByGroup?: Counts[];
  totalCounts: number;
  nextToken?: string;
}
export type ListDelegatedAdminMaxResults = number;
export interface ListDelegatedAdminAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export type DelegatedAdminStatus = string;
export interface DelegatedAdminAccount {
  accountId?: string;
  status?: string;
}
export type DelegatedAdminAccountList = DelegatedAdminAccount[];
export interface ListDelegatedAdminAccountsResponse {
  delegatedAdminAccounts?: DelegatedAdminAccount[];
  nextToken?: string;
}
export type FilterArnList = string[];
export type ListFilterMaxResults = number;
export interface ListFiltersRequest {
  arns?: string[];
  action?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface Filter {
  arn: string;
  ownerId: string;
  name: string;
  criteria: FilterCriteria;
  action: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  reason?: string;
  tags?: { [key: string]: string | undefined };
}
export type FilterList = Filter[];
export interface ListFiltersResponse {
  filters: Filter[];
  nextToken?: string;
}
export type AggregationType = string;
export type ListFindingAggregationsMaxResults = number;
export type AggregationFindingType = string;
export type AggregationResourceType = string;
export type SortOrder = string;
export type AccountSortBy = string;
export interface AccountAggregation {
  findingType?: string;
  resourceType?: string;
  sortOrder?: string;
  sortBy?: string;
}
export type AmiSortBy = string;
export interface AmiAggregation {
  amis?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export type AwsEcrContainerSortBy = string;
export interface AwsEcrContainerAggregation {
  resourceIds?: StringFilter[];
  imageShas?: StringFilter[];
  repositories?: StringFilter[];
  architectures?: StringFilter[];
  imageTags?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
  lastInUseAt?: DateFilter[];
  inUseCount?: NumberFilter[];
}
export type Ec2InstanceSortBy = string;
export interface Ec2InstanceAggregation {
  amis?: StringFilter[];
  operatingSystems?: StringFilter[];
  instanceIds?: StringFilter[];
  instanceTags?: MapFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export type FindingTypeSortBy = string;
export interface FindingTypeAggregation {
  findingType?: string;
  resourceType?: string;
  sortOrder?: string;
  sortBy?: string;
}
export type ImageLayerSortBy = string;
export interface ImageLayerAggregation {
  repositories?: StringFilter[];
  resourceIds?: StringFilter[];
  layerHashes?: StringFilter[];
  cloudProviders?: StringFilter[];
  cloudAccountIds?: StringFilter[];
  cloudOrgIds?: StringFilter[];
  cloudRegions?: StringFilter[];
  cloudPartitions?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export type PackageSortBy = string;
export interface PackageAggregation {
  packageNames?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export type RepositorySortBy = string;
export interface RepositoryAggregation {
  repositories?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export type TitleSortBy = string;
export interface TitleAggregation {
  titles?: StringFilter[];
  vulnerabilityIds?: StringFilter[];
  resourceType?: string;
  findingType?: string;
  sortOrder?: string;
  sortBy?: string;
}
export type LambdaLayerSortBy = string;
export interface LambdaLayerAggregation {
  functionNames?: StringFilter[];
  resourceIds?: StringFilter[];
  layerArns?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export type LambdaFunctionSortBy = string;
export interface LambdaFunctionAggregation {
  resourceIds?: StringFilter[];
  functionNames?: StringFilter[];
  runtimes?: StringFilter[];
  functionTags?: MapFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export type CodeRepositorySortBy = string;
export interface CodeRepositoryAggregation {
  projectNames?: StringFilter[];
  providerTypes?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
  resourceIds?: StringFilter[];
}
export type VmInstanceSortBy = string;
export interface VmInstanceAggregation {
  resourceIds?: StringFilter[];
  operatingSystems?: StringFilter[];
  instanceTags?: MapFilter[];
  vmImageReferences?: StringFilter[];
  cloudProviders?: StringFilter[];
  cloudPartitions?: StringFilter[];
  cloudRegions?: StringFilter[];
  cloudOrgIds?: StringFilter[];
  cloudAccountIds?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export type ContainerImageSortBy = string;
export interface ContainerImageAggregation {
  resourceIds?: StringFilter[];
  imageDigests?: StringFilter[];
  repositories?: StringFilter[];
  registries?: StringFilter[];
  architectures?: StringFilter[];
  imageTags?: StringFilter[];
  cloudProviders?: StringFilter[];
  cloudPartitions?: StringFilter[];
  cloudRegions?: StringFilter[];
  cloudOrgIds?: StringFilter[];
  cloudAccountIds?: StringFilter[];
  lastInUseAt?: DateFilter[];
  inUseCount?: NumberFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export type ServerlessFunctionSortBy = string;
export interface ServerlessFunctionAggregation {
  resourceIds?: StringFilter[];
  functionNames?: StringFilter[];
  runtimes?: StringFilter[];
  functionTags?: MapFilter[];
  cloudProviders?: StringFilter[];
  cloudPartitions?: StringFilter[];
  cloudRegions?: StringFilter[];
  cloudOrgIds?: StringFilter[];
  cloudAccountIds?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export type AggregationRequest =
  | {
      accountAggregation: AccountAggregation;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation: AmiAggregation;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation: AwsEcrContainerAggregation;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation: Ec2InstanceAggregation;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation: FindingTypeAggregation;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation: ImageLayerAggregation;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation: PackageAggregation;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation: RepositoryAggregation;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation: TitleAggregation;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation: LambdaLayerAggregation;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation: LambdaFunctionAggregation;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation: CodeRepositoryAggregation;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation: VmInstanceAggregation;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation: ContainerImageAggregation;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation: ServerlessFunctionAggregation;
    };
export interface ListFindingAggregationsRequest {
  aggregationType: string;
  nextToken?: string;
  maxResults?: number;
  accountIds?: StringFilter[];
  aggregationRequest?: AggregationRequest;
}
export interface SeverityCounts {
  all?: number;
  medium?: number;
  high?: number;
  critical?: number;
}
export interface AccountAggregationResponse {
  accountId?: string;
  severityCounts?: SeverityCounts;
  exploitAvailableCount?: number;
  fixAvailableCount?: number;
}
export interface AmiAggregationResponse {
  ami: string;
  accountId?: string;
  cloudProvider?: string;
  cloudPartition?: string;
  cloudRegion?: string;
  cloudOrgId?: string;
  cloudAccountId?: string;
  severityCounts?: SeverityCounts;
  affectedInstances?: number;
}
export type StringList = string[];
export interface AwsEcrContainerAggregationResponse {
  resourceId: string;
  imageSha?: string;
  repository?: string;
  architecture?: string;
  imageTags?: string[];
  accountId?: string;
  severityCounts?: SeverityCounts;
  lastInUseAt?: Date;
  inUseCount?: number;
}
export interface Ec2InstanceAggregationResponse {
  instanceId: string;
  ami?: string;
  operatingSystem?: string;
  instanceTags?: { [key: string]: string | undefined };
  accountId?: string;
  severityCounts?: SeverityCounts;
  networkFindings?: number;
}
export interface FindingTypeAggregationResponse {
  accountId?: string;
  severityCounts?: SeverityCounts;
  exploitAvailableCount?: number;
  fixAvailableCount?: number;
  cloudProvider?: string;
  cloudAccountId?: string;
  cloudOrgId?: string;
  cloudRegion?: string;
  cloudPartition?: string;
}
export interface ImageLayerAggregationResponse {
  repository: string;
  resourceId: string;
  layerHash: string;
  accountId: string;
  cloudProvider?: string;
  cloudAccountId?: string;
  cloudOrgId?: string;
  cloudRegion?: string;
  cloudPartition?: string;
  severityCounts?: SeverityCounts;
}
export interface PackageAggregationResponse {
  packageName: string;
  accountId?: string;
  severityCounts?: SeverityCounts;
}
export interface RepositoryAggregationResponse {
  repository: string;
  accountId?: string;
  cloudProvider?: string;
  cloudPartition?: string;
  cloudRegion?: string;
  cloudOrgId?: string;
  cloudAccountId?: string;
  severityCounts?: SeverityCounts;
  affectedImages?: number;
}
export interface TitleAggregationResponse {
  title: string;
  vulnerabilityId?: string;
  accountId?: string;
  severityCounts?: SeverityCounts;
}
export interface LambdaLayerAggregationResponse {
  functionName: string;
  resourceId: string;
  layerArn: string;
  accountId: string;
  severityCounts?: SeverityCounts;
}
export interface LambdaFunctionAggregationResponse {
  resourceId: string;
  functionName?: string;
  runtime?: string;
  lambdaTags?: { [key: string]: string | undefined };
  accountId?: string;
  severityCounts?: SeverityCounts;
  lastModifiedAt?: Date;
}
export interface CodeRepositoryAggregationResponse {
  projectNames: string;
  providerType?: string;
  severityCounts?: SeverityCounts;
  exploitAvailableActiveFindingsCount?: number;
  fixAvailableActiveFindingsCount?: number;
  accountId?: string;
  resourceId?: string;
}
export interface VmInstanceAggregationResponse {
  resourceId: string;
  cloudProvider?: string;
  cloudAccountId?: string;
  cloudPartition?: string;
  cloudRegion?: string;
  cloudOrgId?: string;
  vmImageReference?: string;
  operatingSystem?: string;
  tags?: { [key: string]: string | undefined };
  accountId?: string;
  severityCounts?: SeverityCounts;
  networkFindings?: number;
  exploitAvailableActiveFindingsCount?: number;
  fixAvailableActiveFindingsCount?: number;
}
export interface ContainerImageAggregationResponse {
  resourceId: string;
  cloudProvider?: string;
  cloudAccountId?: string;
  cloudPartition?: string;
  cloudRegion?: string;
  cloudOrgId?: string;
  imageDigest?: string;
  repository?: string;
  registry?: string;
  architecture?: string;
  imageTags?: string[];
  accountId?: string;
  severityCounts?: SeverityCounts;
  lastInUseAt?: Date;
  inUseCount?: number;
  exploitAvailableActiveFindingsCount?: number;
  fixAvailableActiveFindingsCount?: number;
}
export interface ServerlessFunctionAggregationResponse {
  resourceId: string;
  cloudProvider?: string;
  cloudAccountId?: string;
  cloudPartition?: string;
  cloudRegion?: string;
  cloudOrgId?: string;
  functionName?: string;
  runtime?: string;
  tags?: { [key: string]: string | undefined };
  accountId?: string;
  severityCounts?: SeverityCounts;
  lastModifiedAt?: Date;
  exploitAvailableActiveFindingsCount?: number;
  fixAvailableActiveFindingsCount?: number;
}
export type AggregationResponse =
  | {
      accountAggregation: AccountAggregationResponse;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation: AmiAggregationResponse;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation: AwsEcrContainerAggregationResponse;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation: Ec2InstanceAggregationResponse;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation: FindingTypeAggregationResponse;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation: ImageLayerAggregationResponse;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation: PackageAggregationResponse;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation: RepositoryAggregationResponse;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation: TitleAggregationResponse;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation: LambdaLayerAggregationResponse;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation: LambdaFunctionAggregationResponse;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation: CodeRepositoryAggregationResponse;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation: VmInstanceAggregationResponse;
      containerImageAggregation?: never;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation: ContainerImageAggregationResponse;
      serverlessFunctionAggregation?: never;
    }
  | {
      accountAggregation?: never;
      amiAggregation?: never;
      awsEcrContainerAggregation?: never;
      ec2InstanceAggregation?: never;
      findingTypeAggregation?: never;
      imageLayerAggregation?: never;
      packageAggregation?: never;
      repositoryAggregation?: never;
      titleAggregation?: never;
      lambdaLayerAggregation?: never;
      lambdaFunctionAggregation?: never;
      codeRepositoryAggregation?: never;
      vmInstanceAggregation?: never;
      containerImageAggregation?: never;
      serverlessFunctionAggregation: ServerlessFunctionAggregationResponse;
    };
export type AggregationResponseList = AggregationResponse[];
export interface ListFindingAggregationsResponse {
  aggregationType: string;
  responses?: AggregationResponse[];
  nextToken?: string;
}
export type ListFindingsMaxResults = number;
export type SortField = string;
export interface SortCriteria {
  field: string;
  sortOrder: string;
}
export interface ListFindingsRequest {
  maxResults?: number;
  nextToken?: string;
  filterCriteria?: FilterCriteria;
  sortCriteria?: SortCriteria;
}
export type FindingType = string;
export type FindingDescription = string;
export type FindingTitle = string;
export interface Recommendation {
  text?: string;
  Url?: string;
}
export interface Remediation {
  recommendation?: Recommendation;
}
export type Severity = string;
export type FindingStatus = string;
export type IpV4Address = string;
export type IpV4AddressList = string[];
export type IpV6Address = string;
export type IpV6AddressList = string[];
export type Platform = string;
export interface AwsEc2InstanceDetails {
  type?: string;
  imageId?: string;
  ipV4Addresses?: string[];
  ipV6Addresses?: string[];
  keyName?: string;
  iamInstanceProfileArn?: string;
  vpcId?: string;
  subnetId?: string;
  launchedAt?: Date;
  platform?: string;
}
export type ImageTagList = string[];
export type ImageHash = string;
export interface AwsEcrContainerImageDetails {
  repositoryName: string;
  imageTags?: string[];
  pushedAt?: Date;
  author?: string;
  architecture?: string;
  imageHash: string;
  registry: string;
  platform?: string;
  lastInUseAt?: Date;
  inUseCount?: number;
}
export type FunctionName = string;
export type Version = string;
export type ExecutionRoleArn = string;
export type LambdaLayerArn = string;
export type LayerList = string[];
export type SubnetId = string;
export type SubnetIdList = string[];
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export type VpcId = string;
export interface LambdaVpcConfig {
  subnetIds?: string[];
  securityGroupIds?: string[];
  vpcId?: string;
}
export type PackageType = string;
export type Architecture = string;
export type ArchitectureList = string[];
export interface AwsLambdaFunctionDetails {
  functionName: string;
  runtime: string;
  codeSha256: string;
  version: string;
  executionRoleArn: string;
  layers?: string[];
  vpcConfig?: LambdaVpcConfig;
  packageType?: string;
  architectures?: string[];
  lastModifiedAt?: Date;
}
export type CodeRepositoryProjectName = string;
export type CodeRepositoryProviderType = string;
export interface CodeRepositoryDetails {
  projectName?: string;
  integrationArn?: string;
  providerType?: string;
}
export type CloudSubnetIdList = string[];
export type CloudSecurityGroupIdList = string[];
export interface Vm {
  type?: string;
  vmName?: string;
  vmImageReference?: string;
  ipV4Addresses?: string[];
  ipV6Addresses?: string[];
  networkId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  launchedAt?: Date;
  platform?: string;
  executionRole?: string;
  keyName?: string;
}
export interface Image {
  repositoryName?: string;
  registry?: string;
  imageTags?: string[];
  imageDigest?: string;
  pushedAt?: Date;
  architecture?: string;
  author?: string;
  inUseCount?: number;
  lastInUseAt?: Date;
  platform?: string;
}
export type ServerlessFunctionLayerUrn = string;
export type ServerlessFunctionLayerList = string[];
export interface ServerlessFunction {
  serverlessFunctionName?: string;
  runtime?: string;
  version?: string;
  codeDigest?: string;
  lastModifiedAt?: Date;
  networkId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  executionRole?: string;
  packageType?: string;
  architectures?: string[];
  layers?: string[];
}
export interface ResourceDetails {
  awsEc2Instance?: AwsEc2InstanceDetails;
  awsEcrContainerImage?: AwsEcrContainerImageDetails;
  awsLambdaFunction?: AwsLambdaFunctionDetails;
  codeRepository?: CodeRepositoryDetails;
  vm?: Vm;
  image?: Image;
  serverlessFunction?: ServerlessFunction;
}
export interface Resource {
  type: string;
  id: string;
  partition?: string;
  region?: string;
  tags?: { [key: string]: string | undefined };
  details?: ResourceDetails;
  provider?: string;
  providerAccountId?: string;
  providerOrgId?: string;
}
export type ResourceList = Resource[];
export interface CvssScoreAdjustment {
  metric: string;
  reason: string;
}
export type CvssScoreAdjustmentList = CvssScoreAdjustment[];
export interface CvssScoreDetails {
  scoreSource: string;
  cvssSource?: string;
  version: string;
  score: number;
  scoringVector: string;
  adjustments?: CvssScoreAdjustment[];
}
export interface InspectorScoreDetails {
  adjustedCvss?: CvssScoreDetails;
}
export interface PortRange {
  begin: number;
  end: number;
}
export type NetworkProtocol = string;
export type Component = string;
export type ComponentType = string;
export type ComponentArn = string;
export interface Step {
  componentId: string;
  componentType: string;
  componentArn?: string;
}
export type StepList = Step[];
export interface NetworkPath {
  steps?: Step[];
}
export interface NetworkReachabilityDetails {
  openPortRange: PortRange;
  protocol: string;
  networkPath: NetworkPath;
}
export type VulnerabilityId = string;
export type PackageName = string;
export type PackageVersion = string;
export type SourceLayerHash = string;
export type PackageEpoch = number;
export type PackageRelease = string;
export type PackageArchitecture = string;
export type PackageManager = string;
export type FilePath = string;
export type VulnerablePackageRemediation = string;
export interface VulnerablePackage {
  name: string;
  version: string;
  sourceLayerHash?: string;
  epoch?: number;
  release?: string;
  arch?: string;
  packageManager?: string;
  filePath?: string;
  fixedInVersion?: string;
  remediation?: string;
  sourceLambdaLayerArn?: string;
}
export type VulnerablePackageList = VulnerablePackage[];
export interface CvssScore {
  baseScore: number;
  scoringVector: string;
  version: string;
  source: string;
}
export type CvssScoreList = CvssScore[];
export type VulnerabilityIdList = string[];
export type NonEmptyStringList = string[];
export interface PackageVulnerabilityDetails {
  vulnerabilityId: string;
  vulnerablePackages?: VulnerablePackage[];
  source: string;
  cvss?: CvssScore[];
  relatedVulnerabilities?: string[];
  sourceUrl?: string;
  vendorSeverity?: string;
  vendorCreatedAt?: Date;
  vendorUpdatedAt?: Date;
  referenceUrls?: string[];
}
export type FixAvailable = string;
export type ExploitAvailable = string;
export interface ExploitabilityDetails {
  lastKnownExploitAt?: Date;
}
export interface CodeFilePath {
  fileName: string;
  filePath: string;
  startLine: number;
  endLine: number;
}
export type DetectorTagList = string[];
export type ReferenceUrls = string[];
export type CweList = string[];
export interface CodeVulnerabilityDetails {
  filePath: CodeFilePath;
  detectorTags?: string[];
  referenceUrls?: string[];
  ruleId?: string;
  sourceLambdaLayerArn?: string;
  detectorId: string;
  detectorName: string;
  cwes: string[];
}
export type EpssScoreValue = number;
export interface EpssDetails {
  score?: number;
}
export interface Finding {
  findingArn: string;
  awsAccountId: string;
  type: string;
  description: string;
  title?: string;
  remediation: Remediation;
  severity: string;
  firstObservedAt: Date;
  lastObservedAt: Date;
  updatedAt?: Date;
  status: string;
  resources: Resource[];
  inspectorScore?: number;
  inspectorScoreDetails?: InspectorScoreDetails;
  networkReachabilityDetails?: NetworkReachabilityDetails;
  packageVulnerabilityDetails?: PackageVulnerabilityDetails;
  fixAvailable?: string;
  exploitAvailable?: string;
  exploitabilityDetails?: ExploitabilityDetails;
  codeVulnerabilityDetails?: CodeVulnerabilityDetails;
  epss?: EpssDetails;
}
export type FindingList = Finding[];
export interface ListFindingsResponse {
  nextToken?: string;
  findings?: Finding[];
}
export type ListMembersMaxResults = number;
export interface ListMembersRequest {
  onlyAssociated?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export type MemberList = Member[];
export interface ListMembersResponse {
  members?: Member[];
  nextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type ListUsageTotalsMaxResults = number;
export type ListUsageTotalsNextToken = string;
export type UsageAccountId = string;
export type UsageAccountIdList = string[];
export interface ListUsageTotalsRequest {
  maxResults?: number;
  nextToken?: string;
  accountIds?: string[];
}
export type UsageType = string;
export type UsageValue = number;
export type MonthlyCostEstimate = number;
export type Currency = string;
export interface Usage {
  type?: string;
  total?: number;
  estimatedMonthlyCost?: number;
  currency?: string;
  cloudProvider?: string;
}
export type UsageList = Usage[];
export interface UsageTotal {
  accountId?: string;
  usage?: Usage[];
}
export type UsageTotalList = UsageTotal[];
export interface ListUsageTotalsResponse {
  nextToken?: string;
  totals?: UsageTotal[];
}
export interface ResetEncryptionKeyRequest {
  scanType: string;
  resourceType: string;
}
export interface ResetEncryptionKeyResponse {}
export type VulnId = string;
export type VulnIdList = string[];
export interface SearchVulnerabilitiesFilterCriteria {
  vulnerabilityIds: string[];
}
export interface SearchVulnerabilitiesRequest {
  filterCriteria: SearchVulnerabilitiesFilterCriteria;
  nextToken?: string;
}
export type VulnerabilitySource = string;
export type VulnerabilityDescription = string;
export type Target = string;
export type Targets = string[];
export interface AtigData {
  firstSeen?: Date;
  lastSeen?: Date;
  targets?: string[];
  ttps?: string[];
}
export type VendorSeverity = string;
export type CvssBaseScore = number;
export type CvssScoringVector = string;
export interface Cvss4 {
  baseScore?: number;
  scoringVector?: string;
}
export interface Cvss3 {
  baseScore?: number;
  scoringVector?: string;
}
export type RelatedVulnerability = string;
export type RelatedVulnerabilities = string[];
export interface Cvss2 {
  baseScore?: number;
  scoringVector?: string;
}
export type VendorCreatedAt = Date;
export type VendorUpdatedAt = Date;
export type VulnerabilitySourceUrl = string;
export type DetectionPlatforms = string[];
export type EpssScore = number;
export interface Epss {
  score?: number;
}
export interface Vulnerability {
  id: string;
  cwes?: string[];
  cisaData?: CisaData;
  source?: string;
  description?: string;
  atigData?: AtigData;
  vendorSeverity?: string;
  cvss4?: Cvss4;
  cvss3?: Cvss3;
  relatedVulnerabilities?: string[];
  cvss2?: Cvss2;
  vendorCreatedAt?: Date;
  vendorUpdatedAt?: Date;
  sourceUrl?: string;
  referenceUrls?: string[];
  exploitObserved?: ExploitObserved;
  detectionPlatforms?: string[];
  epss?: Epss;
}
export type Vulnerabilities = Vulnerability[];
export interface SearchVulnerabilitiesResponse {
  vulnerabilities: Vulnerability[];
  nextToken?: string;
}
export type UUID = string;
export interface SendCisSessionHealthRequest {
  scanJobId: string;
  sessionToken: string;
}
export interface SendCisSessionHealthResponse {}
export type RuleId = string;
export type CisRuleStatus =
  | "FAILED"
  | "PASSED"
  | "NOT_EVALUATED"
  | "INFORMATIONAL"
  | "UNKNOWN"
  | "NOT_APPLICABLE"
  | "ERROR"
  | (string & {});
export type CisRuleDetails = Uint8Array;
export interface CisSessionMessage {
  ruleId: string;
  status: CisRuleStatus;
  cisRuleDetails: Uint8Array;
}
export type CisSessionMessages = CisSessionMessage[];
export interface SendCisSessionTelemetryRequest {
  scanJobId: string;
  sessionToken: string;
  messages: CisSessionMessage[];
}
export interface SendCisSessionTelemetryResponse {}
export interface StartCisSessionMessage {
  sessionToken: string;
}
export interface StartCisSessionRequest {
  scanJobId: string;
  message: StartCisSessionMessage;
}
export interface StartCisSessionResponse {}
export type CodeSecurityClientToken = string;
export interface StartCodeSecurityScanRequest {
  clientToken?: string;
  resource: CodeSecurityResource;
}
export interface StartCodeSecurityScanResponse {
  scanId?: string;
  status?: CodeScanStatus;
}
export type StopCisSessionStatus =
  | "SUCCESS"
  | "FAILED"
  | "INTERRUPTED"
  | "UNSUPPORTED_OS"
  | (string & {});
export type Reason = string;
export type CheckCount = number;
export interface StopCisMessageProgress {
  totalChecks?: number;
  successfulChecks?: number;
  failedChecks?: number;
  notEvaluatedChecks?: number;
  unknownChecks?: number;
  notApplicableChecks?: number;
  informationalChecks?: number;
  errorChecks?: number;
}
export type Vendor = string;
export type Product = string;
export type PlatformVersion = string;
export interface ComputePlatform {
  vendor?: string;
  product?: string;
  version?: string;
}
export type BenchmarkVersion = string;
export type BenchmarkProfile = string;
export interface StopCisSessionMessage {
  status: StopCisSessionStatus;
  reason?: string;
  progress: StopCisMessageProgress;
  computePlatform?: ComputePlatform;
  benchmarkVersion?: string;
  benchmarkProfile?: string;
}
export interface StopCisSessionRequest {
  scanJobId: string;
  sessionToken: string;
  message: StopCisSessionMessage;
}
export interface StopCisSessionResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKey = string;
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCisTargets {
  accountIds?: string[];
  targetResourceTags?: { [key: string]: string[] | undefined };
}
export interface UpdateCisScanConfigurationRequest {
  scanConfigurationArn: string;
  scanName?: string;
  securityLevel?: CisSecurityLevel;
  schedule?: Schedule;
  targets?: UpdateCisTargets;
}
export interface UpdateCisScanConfigurationResponse {
  scanConfigurationArn: string;
}
export type GitLabAuthCode = string | redacted.Redacted<string>;
export interface UpdateGitLabSelfManagedIntegrationDetail {
  authCode: string | redacted.Redacted<string>;
}
export type GitHubAuthCode = string | redacted.Redacted<string>;
export type GitHubInstallationId = string;
export interface UpdateGitHubIntegrationDetail {
  code: string | redacted.Redacted<string>;
  installationId: string;
}
export type UpdateIntegrationDetails =
  | {
      gitlabSelfManaged: UpdateGitLabSelfManagedIntegrationDetail;
      github?: never;
    }
  | { gitlabSelfManaged?: never; github: UpdateGitHubIntegrationDetail };
export interface UpdateCodeSecurityIntegrationRequest {
  integrationArn: string;
  details: UpdateIntegrationDetails;
}
export interface UpdateCodeSecurityIntegrationResponse {
  integrationArn: string;
  status: IntegrationStatus;
}
export interface UpdateCodeSecurityScanConfigurationRequest {
  scanConfigurationArn: string;
  configuration: CodeSecurityScanConfiguration;
}
export interface UpdateCodeSecurityScanConfigurationResponse {
  scanConfigurationArn?: string;
}
export interface EcrConfiguration {
  rescanDuration: string;
  pullDateRescanDuration?: string;
  pullDateRescanMode?: string;
}
export interface Ec2Configuration {
  scanMode: string;
  activateVMScanner?: boolean;
}
export type InheritanceMode = string;
export interface UpdateConfigurationInheritance {
  ec2Configuration?: string;
  ecrConfiguration?: string;
}
export interface UpdateConfigurationRequest {
  accountId?: string;
  ecrConfiguration?: EcrConfiguration;
  ec2Configuration?: Ec2Configuration;
  updateConfigurationInheritance?: UpdateConfigurationInheritance;
}
export interface UpdateConfigurationResponse {}
export interface AzureProviderDetailUpdate {
  azureRegions?: string[];
  scopeConfiguration?: AzureScopeConfigurationInput;
  autoInstallVMScanner?: boolean;
}
export type ProviderDetailUpdate = { azure: AzureProviderDetailUpdate };
export interface UpdateConnectorRequest {
  connectorArn: string;
  description?: string;
  providerDetail?: ProviderDetailUpdate;
}
export interface UpdateConnectorResponse {
  connectorArn?: string;
}
export interface UpdateConnectorScanConfigurationRequest {
  awsConfigConnectorArn: string;
  scanConfiguration: ConnectorScanConfiguration;
}
export interface UpdateConnectorScanConfigurationResponse {}
export interface UpdateEc2DeepInspectionConfigurationRequest {
  activateDeepInspection?: boolean;
  packagePaths?: string[];
}
export interface UpdateEc2DeepInspectionConfigurationResponse {
  packagePaths?: string[];
  orgPackagePaths?: string[];
  status?: string;
  errorMessage?: string;
}
export interface UpdateEncryptionKeyRequest {
  kmsKeyId: string;
  scanType: string;
  resourceType: string;
}
export interface UpdateEncryptionKeyResponse {}
export interface UpdateFilterRequest {
  action?: string;
  description?: string;
  filterCriteria?: FilterCriteria;
  name?: string;
  filterArn: string;
  reason?: string;
}
export interface UpdateFilterResponse {
  arn: string;
}
export interface UpdateOrganizationConfigurationRequest {
  autoEnable: AutoEnable;
}
export interface UpdateOrganizationConfigurationResponse {
  autoEnable: AutoEnable;
}
export interface UpdateOrgEc2DeepInspectionConfigurationRequest {
  orgPackagePaths: string[];
}
export interface UpdateOrgEc2DeepInspectionConfigurationResponse {}
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFields = ValidationExceptionField[];
export type AssociateMemberError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an Amazon Web Services account with an Amazon Inspector delegated administrator. An HTTP 200 response
 * indicates the association was successfully started, but doesn’t indicate whether it was
 * completed. You can check if the association completed by using ListMembers for multiple
 * accounts or GetMembers for a single account.
 */
export const associateMember: API.OperationMethod<
  AssociateMemberRequest,
  AssociateMemberResponse,
  AssociateMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /members/associate",
    input: { accountId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMember",
})) as any;

export type BatchAssociateCodeSecurityScanConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates multiple code repositories with an Amazon Inspector code security scan
 * configuration.
 */
export const batchAssociateCodeSecurityScanConfiguration: API.OperationMethod<
  BatchAssociateCodeSecurityScanConfigurationRequest,
  BatchAssociateCodeSecurityScanConfigurationResponse,
  BatchAssociateCodeSecurityScanConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/scan-configuration/batch/associate",
    input: {
      associateConfigurationRequests: D.list({
        scanConfigurationArn: 0,
        resource: i_CodeSecurityResource,
      }),
    },
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
  operationName: "BatchAssociateCodeSecurityScanConfiguration",
})) as any;

export type BatchDisassociateCodeSecurityScanConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates multiple code repositories from an Amazon Inspector code security scan
 * configuration.
 */
export const batchDisassociateCodeSecurityScanConfiguration: API.OperationMethod<
  BatchDisassociateCodeSecurityScanConfigurationRequest,
  BatchDisassociateCodeSecurityScanConfigurationResponse,
  BatchDisassociateCodeSecurityScanConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/scan-configuration/batch/disassociate",
    input: {
      disassociateConfigurationRequests: D.list({
        scanConfigurationArn: 0,
        resource: i_CodeSecurityResource,
      }),
    },
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
  operationName: "BatchDisassociateCodeSecurityScanConfiguration",
})) as any;

export type BatchGetAccountStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the Amazon Inspector status of multiple Amazon Web Services accounts within your environment.
 */
export const batchGetAccountStatus: API.OperationMethod<
  BatchGetAccountStatusRequest,
  BatchGetAccountStatusResponse,
  BatchGetAccountStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /status/batch/get",
    input: { accountIds: 0 },
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
  operationName: "BatchGetAccountStatus",
})) as any;

export type BatchGetCodeSnippetError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves code snippets from findings that Amazon Inspector detected code vulnerabilities
 * in.
 */
export const batchGetCodeSnippet: API.OperationMethod<
  BatchGetCodeSnippetRequest,
  BatchGetCodeSnippetResponse,
  BatchGetCodeSnippetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesnippet/batchget",
    input: { findingArns: 0 },
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
  operationName: "BatchGetCodeSnippet",
})) as any;

export type BatchGetFindingDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets vulnerability details for findings.
 */
export const batchGetFindingDetails: API.OperationMethod<
  BatchGetFindingDetailsRequest,
  BatchGetFindingDetailsResponse,
  BatchGetFindingDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /findings/details/batch/get",
    input: { findingArns: 0 },
    output: {
      findingDetails: D.list({
        cisaData: o_CisaData,
        exploitObserved: o_ExploitObserved,
      }),
    },
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
  operationName: "BatchGetFindingDetails",
})) as any;

export type BatchGetFreeTrialInfoError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets free trial status for multiple Amazon Web Services accounts.
 */
export const batchGetFreeTrialInfo: API.OperationMethod<
  BatchGetFreeTrialInfoRequest,
  BatchGetFreeTrialInfoResponse,
  BatchGetFreeTrialInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /freetrialinfo/batchget",
    input: { accountIds: 0 },
    output: {
      accounts: D.list({ freeTrialInfo: D.list({ start: D.ts, end: D.ts }) }),
    },
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
  operationName: "BatchGetFreeTrialInfo",
})) as any;

export type BatchGetMemberEc2DeepInspectionStatusError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves Amazon Inspector deep inspection activation status of multiple member accounts within
 * your organization. You must be the delegated administrator of an organization in Amazon Inspector to
 * use this API.
 */
export const batchGetMemberEc2DeepInspectionStatus: API.OperationMethod<
  BatchGetMemberEc2DeepInspectionStatusRequest,
  BatchGetMemberEc2DeepInspectionStatusResponse,
  BatchGetMemberEc2DeepInspectionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ec2deepinspectionstatus/member/batch/get",
    input: { accountIds: 0 },
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
  operationName: "BatchGetMemberEc2DeepInspectionStatus",
})) as any;

export type BatchUpdateMemberEc2DeepInspectionStatusError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Activates or deactivates Amazon Inspector deep inspection for the provided member accounts in your
 * organization. You must be the delegated administrator of an organization in Amazon Inspector to use
 * this API.
 */
export const batchUpdateMemberEc2DeepInspectionStatus: API.OperationMethod<
  BatchUpdateMemberEc2DeepInspectionStatusRequest,
  BatchUpdateMemberEc2DeepInspectionStatusResponse,
  BatchUpdateMemberEc2DeepInspectionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ec2deepinspectionstatus/member/batch/update",
    input: { accountIds: D.list({ accountId: 0, activateDeepInspection: 0 }) },
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
  operationName: "BatchUpdateMemberEc2DeepInspectionStatus",
})) as any;

export type CancelFindingsReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the given findings report.
 */
export const cancelFindingsReport: API.OperationMethod<
  CancelFindingsReportRequest,
  CancelFindingsReportResponse,
  CancelFindingsReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /reporting/cancel",
    input: { reportId: 0 },
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
  operationName: "CancelFindingsReport",
})) as any;

export type CancelSbomExportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a software bill of materials (SBOM) report.
 */
export const cancelSbomExport: API.OperationMethod<
  CancelSbomExportRequest,
  CancelSbomExportResponse,
  CancelSbomExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sbomexport/cancel",
    input: { reportId: 0 },
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
  operationName: "CancelSbomExport",
})) as any;

export type CreateCisScanConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a CIS scan configuration.
 */
export const createCisScanConfiguration: API.OperationMethod<
  CreateCisScanConfigurationRequest,
  CreateCisScanConfigurationResponse,
  CreateCisScanConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cis/scan-configuration/create",
    input: {
      scanName: 0,
      securityLevel: 0,
      schedule: i_Schedule,
      targets: { accountIds: 0, targetResourceTags: 0 },
      tags: 0,
    },
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
  operationName: "CreateCisScanConfiguration",
})) as any;

export type CreateCodeSecurityIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a code security integration with a source code repository provider.
 *
 * After calling the `CreateCodeSecurityIntegration` operation, you complete
 * authentication and authorization with your provider. Next you call the
 * `UpdateCodeSecurityIntegration` operation to provide the `details`
 * to complete the integration setup
 */
export const createCodeSecurityIntegration: API.OperationMethod<
  CreateCodeSecurityIntegrationRequest,
  CreateCodeSecurityIntegrationResponse,
  CreateCodeSecurityIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/integration/create",
    input: {
      name: 0,
      type: 0,
      details: { gitlabSelfManaged: { instanceUrl: 0, accessToken: 0 } },
      tags: 0,
    },
    output: { authorizationUrl: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCodeSecurityIntegration",
})) as any;

export type CreateCodeSecurityScanConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scan configuration for code security scanning.
 */
export const createCodeSecurityScanConfiguration: API.OperationMethod<
  CreateCodeSecurityScanConfigurationRequest,
  CreateCodeSecurityScanConfigurationResponse,
  CreateCodeSecurityScanConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/scan-configuration/create",
    input: {
      name: 0,
      level: 0,
      configuration: i_CodeSecurityScanConfiguration,
      scopeSettings: { projectSelectionScope: 0 },
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCodeSecurityScanConfiguration",
})) as any;

export type CreateConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a connector that links an external cloud provider to Amazon Inspector for vulnerability scanning.
 */
export const createConnector: API.OperationMethod<
  CreateConnectorRequest,
  CreateConnectorResponse,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /connector/create",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      provider: 0,
      description: 0,
      providerDetail: {
        azure: {
          awsConfigConnectorArn: 0,
          scopeConfiguration: i_AzureScopeConfigurationInput,
          azureRegions: 0,
          autoInstallVMScanner: 0,
        },
      },
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnector",
})) as any;

export type CreateFilterError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a filter resource using specified filter criteria. When the filter action is set
 * to `SUPPRESS` this action creates a suppression rule.
 */
export const createFilter: API.OperationMethod<
  CreateFilterRequest,
  CreateFilterResponse,
  CreateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /filters/create",
    input: {
      action: 0,
      description: 0,
      filterCriteria: i_FilterCriteria,
      name: 0,
      tags: 0,
      reason: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFilter",
})) as any;

export type CreateFindingsReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a finding report. By default only `ACTIVE` findings are returned in
 * the report. To see `SUPRESSED` or `CLOSED` findings you must specify
 * a value for the `findingStatus` filter criteria.
 */
export const createFindingsReport: API.OperationMethod<
  CreateFindingsReportRequest,
  CreateFindingsReportResponse,
  CreateFindingsReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /reporting/create",
    input: {
      filterCriteria: i_FilterCriteria,
      reportFormat: 0,
      s3Destination: i_Destination,
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
  operationName: "CreateFindingsReport",
})) as any;

export type CreateSbomExportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a software bill of materials (SBOM) report.
 */
export const createSbomExport: API.OperationMethod<
  CreateSbomExportRequest,
  CreateSbomExportResponse,
  CreateSbomExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sbomexport/create",
    input: {
      resourceFilterCriteria: {
        accountId: D.list(i_ResourceStringFilter),
        resourceId: D.list(i_ResourceStringFilter),
        resourceType: D.list(i_ResourceStringFilter),
        ecrRepositoryName: D.list(i_ResourceStringFilter),
        lambdaFunctionName: D.list(i_ResourceStringFilter),
        ecrImageTags: D.list(i_ResourceStringFilter),
        ec2InstanceTags: D.list(i_ResourceMapFilter),
        lambdaFunctionTags: D.list(i_ResourceMapFilter),
        cloudProvider: D.list(i_ResourceStringFilter),
        cloudProviderAccountId: D.list(i_ResourceStringFilter),
        cloudProviderOrgId: D.list(i_ResourceStringFilter),
        cloudProviderRegion: D.list(i_ResourceStringFilter),
        cloudVmInstanceTags: D.list(i_ResourceMapFilter),
        cloudContainerImageTags: D.list(i_ResourceStringFilter),
        cloudContainerRepositoryName: D.list(i_ResourceStringFilter),
        cloudContainerRegistryName: D.list(i_ResourceStringFilter),
        cloudServerlessFunctionName: D.list(i_ResourceStringFilter),
        cloudServerlessFunctionRuntime: D.list(i_ResourceStringFilter),
        cloudServerlessFunctionTags: D.list(i_ResourceMapFilter),
      },
      reportFormat: 0,
      s3Destination: i_Destination,
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
  operationName: "CreateSbomExport",
})) as any;

export type DeleteCisScanConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a CIS scan configuration.
 */
export const deleteCisScanConfiguration: API.OperationMethod<
  DeleteCisScanConfigurationRequest,
  DeleteCisScanConfigurationResponse,
  DeleteCisScanConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cis/scan-configuration/delete",
    input: { scanConfigurationArn: 0 },
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
  operationName: "DeleteCisScanConfiguration",
})) as any;

export type DeleteCodeSecurityIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a code security integration.
 */
export const deleteCodeSecurityIntegration: API.OperationMethod<
  DeleteCodeSecurityIntegrationRequest,
  DeleteCodeSecurityIntegrationResponse,
  DeleteCodeSecurityIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/integration/delete",
    input: { integrationArn: 0 },
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
  operationName: "DeleteCodeSecurityIntegration",
})) as any;

export type DeleteCodeSecurityScanConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a code security scan configuration.
 */
export const deleteCodeSecurityScanConfiguration: API.OperationMethod<
  DeleteCodeSecurityScanConfigurationRequest,
  DeleteCodeSecurityScanConfigurationResponse,
  DeleteCodeSecurityScanConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/scan-configuration/delete",
    input: { scanConfigurationArn: 0 },
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
  operationName: "DeleteCodeSecurityScanConfiguration",
})) as any;

export type DeleteConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a connector from your account.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /connector/delete",
    input: { connectorArn: 0 },
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
  operationName: "DeleteConnector",
})) as any;

export type DeleteFilterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a filter resource.
 */
export const deleteFilter: API.OperationMethod<
  DeleteFilterRequest,
  DeleteFilterResponse,
  DeleteFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /filters/delete",
    input: { arn: 0 },
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
  operationName: "DeleteFilter",
})) as any;

export type DescribeOrganizationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describe Amazon Inspector configuration settings for an Amazon Web Services organization.
 */
export const describeOrganizationConfiguration: API.OperationMethod<
  DescribeOrganizationConfigurationRequest,
  DescribeOrganizationConfigurationResponse,
  DescribeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /organizationconfiguration/describe",
    input: {},
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfiguration",
})) as any;

export type DisableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables Amazon Inspector scans for one or more Amazon Web Services accounts. Disabling all scan types in an
 * account disables the Amazon Inspector service.
 */
export const disable: API.OperationMethod<
  DisableRequest,
  DisableResponse,
  DisableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /disable",
    input: { accountIds: 0, resourceTypes: 0 },
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
  operationName: "Disable",
})) as any;

export type DisableDelegatedAdminAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables the Amazon Inspector delegated administrator for your organization.
 */
export const disableDelegatedAdminAccount: API.OperationMethod<
  DisableDelegatedAdminAccountRequest,
  DisableDelegatedAdminAccountResponse,
  DisableDelegatedAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delegatedadminaccounts/disable",
    input: { delegatedAdminAccountId: 0 },
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
  operationName: "DisableDelegatedAdminAccount",
})) as any;

export type DisassociateMemberError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a member account from an Amazon Inspector delegated administrator.
 */
export const disassociateMember: API.OperationMethod<
  DisassociateMemberRequest,
  DisassociateMemberResponse,
  DisassociateMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /members/disassociate",
    input: { accountId: 0 },
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
  operationName: "DisassociateMember",
})) as any;

export type EnableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables Amazon Inspector scans for one or more Amazon Web Services accounts.
 */
export const enable: API.OperationMethod<
  EnableRequest,
  EnableResponse,
  EnableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /enable",
    input: {
      accountIds: 0,
      resourceTypes: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "Enable",
})) as any;

export type EnableDelegatedAdminAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables the Amazon Inspector delegated administrator for your Organizations organization.
 */
export const enableDelegatedAdminAccount: API.OperationMethod<
  EnableDelegatedAdminAccountRequest,
  EnableDelegatedAdminAccountResponse,
  EnableDelegatedAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delegatedadminaccounts/enable",
    input: {
      delegatedAdminAccountId: 0,
      clientToken: D.m({ idempotency: true }),
    },
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
  operationName: "EnableDelegatedAdminAccount",
})) as any;

export type GetCisScanReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a CIS scan report.
 */
export const getCisScanReport: API.OperationMethod<
  GetCisScanReportRequest,
  GetCisScanReportResponse,
  GetCisScanReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cis/scan/report/get",
    input: { scanArn: 0, targetAccounts: 0, reportFormat: 0 },
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
  operationName: "GetCisScanReport",
})) as any;

export type GetCisScanResultDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves CIS scan result details.
 */
export const getCisScanResultDetails: API.PaginatedOperationMethod<
  GetCisScanResultDetailsRequest,
  GetCisScanResultDetailsResponse,
  GetCisScanResultDetailsError,
  Credentials | HttpClient.HttpClient,
  CisScanResultDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /cis/scan-result/details/get",
    input: {
      scanArn: 0,
      targetResourceId: 0,
      accountId: 0,
      filterCriteria: {
        findingStatusFilters: D.list({ comparison: 0, value: 0 }),
        checkIdFilters: D.list(i_CisStringFilter),
        titleFilters: D.list(i_CisStringFilter),
        securityLevelFilters: D.list(i_CisSecurityLevelFilter),
        findingArnFilters: D.list(i_CisStringFilter),
      },
      sortBy: 0,
      sortOrder: 0,
      nextToken: 0,
      maxResults: 0,
    },
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
  operationName: "GetCisScanResultDetails",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scanResultDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetClustersForImageError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of clusters and metadata associated with an image.
 */
export const getClustersForImage: API.PaginatedOperationMethod<
  GetClustersForImageRequest,
  GetClustersForImageResponse,
  GetClustersForImageError,
  Credentials | HttpClient.HttpClient,
  ClusterInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /cluster/get",
    input: { filter: { resourceId: 0 }, maxResults: 0, nextToken: 0 },
    output: {
      cluster: D.list({ clusterDetails: D.list({ lastInUse: D.ts }) }),
    },
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
  operationName: "GetClustersForImage",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "cluster",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetCodeSecurityIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a code security integration.
 */
export const getCodeSecurityIntegration: API.OperationMethod<
  GetCodeSecurityIntegrationRequest,
  GetCodeSecurityIntegrationResponse,
  GetCodeSecurityIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/integration/get",
    input: { integrationArn: 0, tags: 0 },
    output: { createdOn: D.ts, lastUpdateOn: D.ts, authorizationUrl: D.secret },
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
  operationName: "GetCodeSecurityIntegration",
})) as any;

export type GetCodeSecurityScanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific code security scan.
 */
export const getCodeSecurityScan: API.OperationMethod<
  GetCodeSecurityScanRequest,
  GetCodeSecurityScanResponse,
  GetCodeSecurityScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/scan/get",
    input: { resource: i_CodeSecurityResource, scanId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetCodeSecurityScan",
})) as any;

export type GetCodeSecurityScanConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a code security scan configuration.
 */
export const getCodeSecurityScanConfiguration: API.OperationMethod<
  GetCodeSecurityScanConfigurationRequest,
  GetCodeSecurityScanConfigurationResponse,
  GetCodeSecurityScanConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/scan-configuration/get",
    input: { scanConfigurationArn: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
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
  operationName: "GetCodeSecurityScanConfiguration",
})) as any;

export type GetConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves setting configurations for Amazon Inspector scans. If you specify an
 * `accountId`, this operation returns the scan configuration for that member
 * account. You must be the delegated administrator for the specified member account.
 * If you do not specify an `accountId`, this operation returns your own
 * scan configuration.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  GetConfigurationResponse,
  GetConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configuration/get",
    input: { accountId: 0 },
    output: {
      ecrConfiguration: { rescanDurationState: { updatedAt: D.ts } },
      ec2Configuration: { vmScannerState: { activatedAt: D.ts } },
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
  operationName: "GetConfiguration",
})) as any;

export type GetDelegatedAdminAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the Amazon Inspector delegated administrator for your
 * organization.
 */
export const getDelegatedAdminAccount: API.OperationMethod<
  GetDelegatedAdminAccountRequest,
  GetDelegatedAdminAccountResponse,
  GetDelegatedAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delegatedadminaccounts/get",
    input: {},
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
  operationName: "GetDelegatedAdminAccount",
})) as any;

export type GetEc2DeepInspectionConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the activation status of Amazon Inspector deep inspection and custom paths associated
 * with your account.
 */
export const getEc2DeepInspectionConfiguration: API.OperationMethod<
  GetEc2DeepInspectionConfigurationRequest,
  GetEc2DeepInspectionConfigurationResponse,
  GetEc2DeepInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ec2deepinspectionconfiguration/get",
    input: {},
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEc2DeepInspectionConfiguration",
})) as any;

export type GetEncryptionKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an encryption key.
 */
export const getEncryptionKey: API.OperationMethod<
  GetEncryptionKeyRequest,
  GetEncryptionKeyResponse,
  GetEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /encryptionkey/get",
    input: {
      scanType: D.m({ query: "scanType" }),
      resourceType: D.m({ query: "resourceType" }),
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
  operationName: "GetEncryptionKey",
})) as any;

export type GetFindingsReportStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the status of a findings report.
 */
export const getFindingsReportStatus: API.OperationMethod<
  GetFindingsReportStatusRequest,
  GetFindingsReportStatusResponse,
  GetFindingsReportStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /reporting/status/get",
    input: { reportId: 0 },
    output: { filterCriteria: o_FilterCriteria },
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
  operationName: "GetFindingsReportStatus",
})) as any;

export type GetMemberError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets member information for your organization.
 */
export const getMember: API.OperationMethod<
  GetMemberRequest,
  GetMemberResponse,
  GetMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /members/get",
    input: { accountId: 0 },
    output: { member: o_Member },
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
  operationName: "GetMember",
})) as any;

export type GetSbomExportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details of a software bill of materials (SBOM) report.
 */
export const getSbomExport: API.OperationMethod<
  GetSbomExportRequest,
  GetSbomExportResponse,
  GetSbomExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sbomexport/get",
    input: { reportId: 0 },
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
  operationName: "GetSbomExport",
})) as any;

export type ListAccountPermissionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the permissions an account has to configure Amazon Inspector.
 * If the account is a member account or standalone account with resources managed by an Organizations policy, the operation returns fewer permissions.
 */
export const listAccountPermissions: API.PaginatedOperationMethod<
  ListAccountPermissionsRequest,
  ListAccountPermissionsResponse,
  ListAccountPermissionsError,
  Credentials | HttpClient.HttpClient,
  Permission
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /accountpermissions/list",
    input: { service: 0, maxResults: 0, nextToken: 0 },
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
  operationName: "ListAccountPermissions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "permissions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCisScanConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists CIS scan configurations.
 */
export const listCisScanConfigurations: API.PaginatedOperationMethod<
  ListCisScanConfigurationsRequest,
  ListCisScanConfigurationsResponse,
  ListCisScanConfigurationsError,
  Credentials | HttpClient.HttpClient,
  CisScanConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /cis/scan-configuration/list",
    input: {
      filterCriteria: {
        scanNameFilters: D.list(i_CisStringFilter),
        targetResourceTagFilters: D.list(i_TagFilter),
        scanConfigurationArnFilters: D.list(i_CisStringFilter),
      },
      sortBy: 0,
      sortOrder: 0,
      nextToken: 0,
      maxResults: 0,
    },
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
  operationName: "ListCisScanConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scanConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCisScanResultsAggregatedByChecksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists scan results aggregated by checks.
 */
export const listCisScanResultsAggregatedByChecks: API.PaginatedOperationMethod<
  ListCisScanResultsAggregatedByChecksRequest,
  ListCisScanResultsAggregatedByChecksResponse,
  ListCisScanResultsAggregatedByChecksError,
  Credentials | HttpClient.HttpClient,
  CisCheckAggregation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /cis/scan-result/check/list",
    input: {
      scanArn: 0,
      filterCriteria: {
        accountIdFilters: D.list(i_CisStringFilter),
        checkIdFilters: D.list(i_CisStringFilter),
        titleFilters: D.list(i_CisStringFilter),
        platformFilters: D.list(i_CisStringFilter),
        failedResourcesFilters: D.list(i_CisNumberFilter),
        securityLevelFilters: D.list(i_CisSecurityLevelFilter),
      },
      sortBy: 0,
      sortOrder: 0,
      nextToken: 0,
      maxResults: 0,
    },
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
  operationName: "ListCisScanResultsAggregatedByChecks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "checkAggregations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCisScanResultsAggregatedByTargetResourceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists scan results aggregated by a target resource.
 */
export const listCisScanResultsAggregatedByTargetResource: API.PaginatedOperationMethod<
  ListCisScanResultsAggregatedByTargetResourceRequest,
  ListCisScanResultsAggregatedByTargetResourceResponse,
  ListCisScanResultsAggregatedByTargetResourceError,
  Credentials | HttpClient.HttpClient,
  CisTargetResourceAggregation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /cis/scan-result/resource/list",
    input: {
      scanArn: 0,
      filterCriteria: {
        accountIdFilters: D.list(i_CisStringFilter),
        statusFilters: D.list({ comparison: 0, value: 0 }),
        checkIdFilters: D.list(i_CisStringFilter),
        targetResourceIdFilters: D.list(i_CisStringFilter),
        targetResourceTagFilters: D.list(i_TagFilter),
        platformFilters: D.list(i_CisStringFilter),
        targetStatusFilters: D.list({ comparison: 0, value: 0 }),
        targetStatusReasonFilters: D.list({ comparison: 0, value: 0 }),
        failedChecksFilters: D.list(i_CisNumberFilter),
      },
      sortBy: 0,
      sortOrder: 0,
      nextToken: 0,
      maxResults: 0,
    },
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
  operationName: "ListCisScanResultsAggregatedByTargetResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "targetResourceAggregations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCisScansError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a CIS scan list.
 */
export const listCisScans: API.PaginatedOperationMethod<
  ListCisScansRequest,
  ListCisScansResponse,
  ListCisScansError,
  Credentials | HttpClient.HttpClient,
  CisScan
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /cis/scan/list",
    input: {
      filterCriteria: {
        scanNameFilters: D.list(i_CisStringFilter),
        targetResourceTagFilters: D.list(i_TagFilter),
        targetResourceIdFilters: D.list(i_CisStringFilter),
        scanStatusFilters: D.list({ comparison: 0, value: 0 }),
        scanAtFilters: D.list({
          earliestScanStartTime: 0,
          latestScanStartTime: 0,
        }),
        scanConfigurationArnFilters: D.list(i_CisStringFilter),
        scanArnFilters: D.list(i_CisStringFilter),
        scheduledByFilters: D.list(i_CisStringFilter),
        failedChecksFilters: D.list(i_CisNumberFilter),
        targetAccountIdFilters: D.list(i_CisStringFilter),
      },
      detailLevel: 0,
      sortBy: 0,
      sortOrder: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { scans: D.list({ scanDate: D.ts }) },
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
  operationName: "ListCisScans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scans",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCodeSecurityIntegrationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all code security integrations in your account.
 */
export const listCodeSecurityIntegrations: API.OperationMethod<
  ListCodeSecurityIntegrationsRequest,
  ListCodeSecurityIntegrationsResponse,
  ListCodeSecurityIntegrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/integration/list",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { integrations: D.list({ createdOn: D.ts, lastUpdateOn: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeSecurityIntegrations",
})) as any;

export type ListCodeSecurityScanConfigurationAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations between code repositories and Amazon Inspector code security scan
 * configurations.
 */
export const listCodeSecurityScanConfigurationAssociations: API.OperationMethod<
  ListCodeSecurityScanConfigurationAssociationsRequest,
  ListCodeSecurityScanConfigurationAssociationsResponse,
  ListCodeSecurityScanConfigurationAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/scan-configuration/associations/list",
    input: {
      scanConfigurationArn: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  operationName: "ListCodeSecurityScanConfigurationAssociations",
})) as any;

export type ListCodeSecurityScanConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all code security scan configurations in your account.
 */
export const listCodeSecurityScanConfigurations: API.OperationMethod<
  ListCodeSecurityScanConfigurationsRequest,
  ListCodeSecurityScanConfigurationsResponse,
  ListCodeSecurityScanConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/scan-configuration/list",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  operationName: "ListCodeSecurityScanConfigurations",
})) as any;

export type ListConnectorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists connectors in your account. Results are paginated. Use the `nextToken` parameter to retrieve the next page of results.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  Connector
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /connector/list",
    input: {
      maxResults: 0,
      nextToken: 0,
      filterCriteria: {
        connectorArns: D.list({ comparison: 0, value: 0 }),
        accounts: D.list(i_StringFilter),
        awsConfigConnectorArns: D.list({ comparison: 0, value: 0 }),
        connectorType: D.list({ comparison: 0, value: 0 }),
        provider: D.list({ comparison: 0, value: 0 }),
      },
    },
    output: {
      items: D.list({
        health: { lastCheckedAt: D.ts },
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
      nextToken: D.secret,
    },
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
  operationName: "ListConnectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConnectorScanConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists scan configurations for Amazon Web Services Config connectors. Results are paginated. Use the `nextToken` parameter to retrieve the next page of results.
 */
export const listConnectorScanConfigurations: API.PaginatedOperationMethod<
  ListConnectorScanConfigurationsRequest,
  ListConnectorScanConfigurationsResponse,
  ListConnectorScanConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ConnectorScanConfigurationItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /connectorscanconfigurations/list",
    input: { awsConfigConnectorArns: 0, maxResults: 0, nextToken: 0 },
    output: { nextToken: D.secret },
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
  operationName: "ListConnectorScanConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scanConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCoverageError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists coverage details for your environment.
 */
export const listCoverage: API.PaginatedOperationMethod<
  ListCoverageRequest,
  ListCoverageResponse,
  ListCoverageError,
  Credentials | HttpClient.HttpClient,
  CoveredResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /coverage/list",
    input: {
      maxResults: 0,
      nextToken: 0,
      filterCriteria: i_CoverageFilterCriteria,
    },
    output: {
      coveredResources: D.list({
        resourceMetadata: {
          ecrImage: { imagePulledAt: D.ts, lastInUseAt: D.ts },
          codeRepository: { onDemandScan: { lastScanAt: D.ts } },
          containerImage: { imagePulledAt: D.ts, lastInUseAt: D.ts },
        },
        lastScannedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoverage",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "coveredResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCoverageStatisticsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon Inspector coverage statistics for your environment.
 */
export const listCoverageStatistics: API.PaginatedOperationMethod<
  ListCoverageStatisticsRequest,
  ListCoverageStatisticsResponse,
  ListCoverageStatisticsError,
  Credentials | HttpClient.HttpClient,
  Counts
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /coverage/statistics/list",
    input: {
      filterCriteria: i_CoverageFilterCriteria,
      groupBy: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoverageStatistics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "countsByGroup",
  } as const,
})) as any;

export type ListDelegatedAdminAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about the Amazon Inspector delegated administrator of your organization.
 */
export const listDelegatedAdminAccounts: API.PaginatedOperationMethod<
  ListDelegatedAdminAccountsRequest,
  ListDelegatedAdminAccountsResponse,
  ListDelegatedAdminAccountsError,
  Credentials | HttpClient.HttpClient,
  DelegatedAdminAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /delegatedadminaccounts/list",
    input: { maxResults: 0, nextToken: 0 },
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
  operationName: "ListDelegatedAdminAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "delegatedAdminAccounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFiltersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the filters associated with your account.
 */
export const listFilters: API.PaginatedOperationMethod<
  ListFiltersRequest,
  ListFiltersResponse,
  ListFiltersError,
  Credentials | HttpClient.HttpClient,
  Filter
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /filters/list",
    input: { arns: 0, action: 0, nextToken: 0, maxResults: 0 },
    output: {
      filters: D.list({
        criteria: o_FilterCriteria,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
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
  operationName: "ListFilters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "filters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingAggregationsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists aggregated finding data for your environment based on specific criteria.
 */
export const listFindingAggregations: API.PaginatedOperationMethod<
  ListFindingAggregationsRequest,
  ListFindingAggregationsResponse,
  ListFindingAggregationsError,
  Credentials | HttpClient.HttpClient,
  AggregationResponse
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /findings/aggregation/list",
    input: {
      aggregationType: 0,
      nextToken: 0,
      maxResults: 0,
      accountIds: D.list(i_StringFilter),
      aggregationRequest: {
        accountAggregation: {
          findingType: 0,
          resourceType: 0,
          sortOrder: 0,
          sortBy: 0,
        },
        amiAggregation: {
          amis: D.list(i_StringFilter),
          sortOrder: 0,
          sortBy: 0,
        },
        awsEcrContainerAggregation: {
          resourceIds: D.list(i_StringFilter),
          imageShas: D.list(i_StringFilter),
          repositories: D.list(i_StringFilter),
          architectures: D.list(i_StringFilter),
          imageTags: D.list(i_StringFilter),
          sortOrder: 0,
          sortBy: 0,
          lastInUseAt: D.list(i_DateFilter),
          inUseCount: D.list(i_NumberFilter),
        },
        ec2InstanceAggregation: {
          amis: D.list(i_StringFilter),
          operatingSystems: D.list(i_StringFilter),
          instanceIds: D.list(i_StringFilter),
          instanceTags: D.list(i_MapFilter),
          sortOrder: 0,
          sortBy: 0,
        },
        findingTypeAggregation: {
          findingType: 0,
          resourceType: 0,
          sortOrder: 0,
          sortBy: 0,
        },
        imageLayerAggregation: {
          repositories: D.list(i_StringFilter),
          resourceIds: D.list(i_StringFilter),
          layerHashes: D.list(i_StringFilter),
          cloudProviders: D.list(i_StringFilter),
          cloudAccountIds: D.list(i_StringFilter),
          cloudOrgIds: D.list(i_StringFilter),
          cloudRegions: D.list(i_StringFilter),
          cloudPartitions: D.list(i_StringFilter),
          sortOrder: 0,
          sortBy: 0,
        },
        packageAggregation: {
          packageNames: D.list(i_StringFilter),
          sortOrder: 0,
          sortBy: 0,
        },
        repositoryAggregation: {
          repositories: D.list(i_StringFilter),
          sortOrder: 0,
          sortBy: 0,
        },
        titleAggregation: {
          titles: D.list(i_StringFilter),
          vulnerabilityIds: D.list(i_StringFilter),
          resourceType: 0,
          findingType: 0,
          sortOrder: 0,
          sortBy: 0,
        },
        lambdaLayerAggregation: {
          functionNames: D.list(i_StringFilter),
          resourceIds: D.list(i_StringFilter),
          layerArns: D.list(i_StringFilter),
          sortOrder: 0,
          sortBy: 0,
        },
        lambdaFunctionAggregation: {
          resourceIds: D.list(i_StringFilter),
          functionNames: D.list(i_StringFilter),
          runtimes: D.list(i_StringFilter),
          functionTags: D.list(i_MapFilter),
          sortOrder: 0,
          sortBy: 0,
        },
        codeRepositoryAggregation: {
          projectNames: D.list(i_StringFilter),
          providerTypes: D.list(i_StringFilter),
          sortOrder: 0,
          sortBy: 0,
          resourceIds: D.list(i_StringFilter),
        },
        vmInstanceAggregation: {
          resourceIds: D.list(i_StringFilter),
          operatingSystems: D.list(i_StringFilter),
          instanceTags: D.list(i_MapFilter),
          vmImageReferences: D.list(i_StringFilter),
          cloudProviders: D.list(i_StringFilter),
          cloudPartitions: D.list(i_StringFilter),
          cloudRegions: D.list(i_StringFilter),
          cloudOrgIds: D.list(i_StringFilter),
          cloudAccountIds: D.list(i_StringFilter),
          sortOrder: 0,
          sortBy: 0,
        },
        containerImageAggregation: {
          resourceIds: D.list(i_StringFilter),
          imageDigests: D.list(i_StringFilter),
          repositories: D.list(i_StringFilter),
          registries: D.list(i_StringFilter),
          architectures: D.list(i_StringFilter),
          imageTags: D.list(i_StringFilter),
          cloudProviders: D.list(i_StringFilter),
          cloudPartitions: D.list(i_StringFilter),
          cloudRegions: D.list(i_StringFilter),
          cloudOrgIds: D.list(i_StringFilter),
          cloudAccountIds: D.list(i_StringFilter),
          lastInUseAt: D.list(i_DateFilter),
          inUseCount: D.list(i_NumberFilter),
          sortOrder: 0,
          sortBy: 0,
        },
        serverlessFunctionAggregation: {
          resourceIds: D.list(i_StringFilter),
          functionNames: D.list(i_StringFilter),
          runtimes: D.list(i_StringFilter),
          functionTags: D.list(i_MapFilter),
          cloudProviders: D.list(i_StringFilter),
          cloudPartitions: D.list(i_StringFilter),
          cloudRegions: D.list(i_StringFilter),
          cloudOrgIds: D.list(i_StringFilter),
          cloudAccountIds: D.list(i_StringFilter),
          sortOrder: 0,
          sortBy: 0,
        },
      },
    },
    output: {
      responses: D.list({
        awsEcrContainerAggregation: { lastInUseAt: D.ts },
        lambdaFunctionAggregation: { lastModifiedAt: D.ts },
        containerImageAggregation: { lastInUseAt: D.ts },
        serverlessFunctionAggregation: { lastModifiedAt: D.ts },
      }),
    },
    body: true,
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindingAggregations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "responses",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists findings for your environment.
 */
export const listFindings: API.PaginatedOperationMethod<
  ListFindingsRequest,
  ListFindingsResponse,
  ListFindingsError,
  Credentials | HttpClient.HttpClient,
  Finding
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /findings/list",
    input: {
      maxResults: 0,
      nextToken: 0,
      filterCriteria: i_FilterCriteria,
      sortCriteria: { field: 0, sortOrder: 0 },
    },
    output: {
      findings: D.list({
        firstObservedAt: D.ts,
        lastObservedAt: D.ts,
        updatedAt: D.ts,
        resources: D.list({
          details: {
            awsEc2Instance: { launchedAt: D.ts },
            awsEcrContainerImage: { pushedAt: D.ts, lastInUseAt: D.ts },
            awsLambdaFunction: { lastModifiedAt: D.ts },
            vm: { launchedAt: D.ts },
            image: { pushedAt: D.ts, lastInUseAt: D.ts },
            serverlessFunction: { lastModifiedAt: D.ts },
          },
        }),
        packageVulnerabilityDetails: {
          vendorCreatedAt: D.ts,
          vendorUpdatedAt: D.ts,
        },
        exploitabilityDetails: { lastKnownExploitAt: D.ts },
      }),
    },
    body: true,
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMembersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List members associated with the Amazon Inspector delegated administrator for your
 * organization.
 */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersRequest,
  ListMembersResponse,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  Member
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /members/list",
    input: { onlyAssociated: 0, maxResults: 0, nextToken: 0 },
    output: { members: D.list(o_Member) },
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
  operationName: "ListMembers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags attached to a given resource.
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

export type ListUsageTotalsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon Inspector usage totals over the last 30 days.
 */
export const listUsageTotals: API.PaginatedOperationMethod<
  ListUsageTotalsRequest,
  ListUsageTotalsResponse,
  ListUsageTotalsError,
  Credentials | HttpClient.HttpClient,
  UsageTotal
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /usage/list",
    input: { maxResults: 0, nextToken: 0, accountIds: 0 },
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
  operationName: "ListUsageTotals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "totals",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ResetEncryptionKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resets an encryption key. After the key is reset your resources will be encrypted by an
 * Amazon Web Services owned key.
 */
export const resetEncryptionKey: API.OperationMethod<
  ResetEncryptionKeyRequest,
  ResetEncryptionKeyResponse,
  ResetEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /encryptionkey/reset",
    input: { scanType: 0, resourceType: 0 },
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
  operationName: "ResetEncryptionKey",
})) as any;

export type SearchVulnerabilitiesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon Inspector coverage details for a specific vulnerability.
 */
export const searchVulnerabilities: API.PaginatedOperationMethod<
  SearchVulnerabilitiesRequest,
  SearchVulnerabilitiesResponse,
  SearchVulnerabilitiesError,
  Credentials | HttpClient.HttpClient,
  Vulnerability
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /vulnerabilities/search",
    input: { filterCriteria: { vulnerabilityIds: 0 }, nextToken: 0 },
    output: {
      vulnerabilities: D.list({
        cisaData: o_CisaData,
        atigData: { firstSeen: D.ts, lastSeen: D.ts },
        vendorCreatedAt: D.ts,
        vendorUpdatedAt: D.ts,
        exploitObserved: o_ExploitObserved,
      }),
    },
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
  operationName: "SearchVulnerabilities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vulnerabilities",
  } as const,
})) as any;

export type SendCisSessionHealthError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a CIS session health. This API is used by the Amazon Inspector SSM plugin to
 * communicate with the Amazon Inspector service. The Amazon Inspector SSM plugin calls
 * this API to start a CIS scan session for the scan ID supplied by the service.
 */
export const sendCisSessionHealth: API.OperationMethod<
  SendCisSessionHealthRequest,
  SendCisSessionHealthResponse,
  SendCisSessionHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /cissession/health/send",
    input: { scanJobId: 0, sessionToken: 0 },
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
  operationName: "SendCisSessionHealth",
})) as any;

export type SendCisSessionTelemetryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a CIS session telemetry. This API is used by the Amazon Inspector SSM plugin to
 * communicate with the Amazon Inspector service. The Amazon Inspector SSM plugin calls
 * this API to start a CIS scan session for the scan ID supplied by the service.
 */
export const sendCisSessionTelemetry: API.OperationMethod<
  SendCisSessionTelemetryRequest,
  SendCisSessionTelemetryResponse,
  SendCisSessionTelemetryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /cissession/telemetry/send",
    input: {
      scanJobId: 0,
      sessionToken: 0,
      messages: D.list({ ruleId: 0, status: 0, cisRuleDetails: 0 }),
    },
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
  operationName: "SendCisSessionTelemetry",
})) as any;

export type StartCisSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a CIS session. This API is used by the Amazon Inspector SSM plugin to
 * communicate with the Amazon Inspector service. The Amazon Inspector SSM plugin calls
 * this API to start a CIS scan session for the scan ID supplied by the service.
 */
export const startCisSession: API.OperationMethod<
  StartCisSessionRequest,
  StartCisSessionResponse,
  StartCisSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /cissession/start",
    input: { scanJobId: 0, message: { sessionToken: 0 } },
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
  operationName: "StartCisSession",
})) as any;

export type StartCodeSecurityScanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a code security scan on a specified repository.
 */
export const startCodeSecurityScan: API.OperationMethod<
  StartCodeSecurityScanRequest,
  StartCodeSecurityScanResponse,
  StartCodeSecurityScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/scan/start",
    input: {
      clientToken: D.m({ idempotency: true }),
      resource: i_CodeSecurityResource,
    },
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
  operationName: "StartCodeSecurityScan",
})) as any;

export type StopCisSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a CIS session. This API is used by the Amazon Inspector SSM plugin to
 * communicate with the Amazon Inspector service. The Amazon Inspector SSM plugin calls
 * this API to stop a CIS scan session for the scan ID supplied by the service.
 */
export const stopCisSession: API.OperationMethod<
  StopCisSessionRequest,
  StopCisSessionResponse,
  StopCisSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /cissession/stop",
    input: {
      scanJobId: 0,
      sessionToken: 0,
      message: {
        status: 0,
        reason: 0,
        progress: {
          totalChecks: 0,
          successfulChecks: 0,
          failedChecks: 0,
          notEvaluatedChecks: 0,
          unknownChecks: 0,
          notApplicableChecks: 0,
          informationalChecks: 0,
          errorChecks: 0,
        },
        computePlatform: { vendor: 0, product: 0, version: 0 },
        benchmarkVersion: 0,
        benchmarkProfile: 0,
      },
    },
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
  operationName: "StopCisSession",
})) as any;

export type TagResourceError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to a resource.
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
    BadRequestException,
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
 * Removes tags from a resource.
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

export type UpdateCisScanConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a CIS scan configuration.
 */
export const updateCisScanConfiguration: API.OperationMethod<
  UpdateCisScanConfigurationRequest,
  UpdateCisScanConfigurationResponse,
  UpdateCisScanConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cis/scan-configuration/update",
    input: {
      scanConfigurationArn: 0,
      scanName: 0,
      securityLevel: 0,
      schedule: i_Schedule,
      targets: { accountIds: 0, targetResourceTags: 0 },
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
  operationName: "UpdateCisScanConfiguration",
})) as any;

export type UpdateCodeSecurityIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing code security integration.
 *
 * After calling the `CreateCodeSecurityIntegration` operation, you complete
 * authentication and authorization with your provider. Next you call the
 * `UpdateCodeSecurityIntegration` operation to provide the `details`
 * to complete the integration setup
 */
export const updateCodeSecurityIntegration: API.OperationMethod<
  UpdateCodeSecurityIntegrationRequest,
  UpdateCodeSecurityIntegrationResponse,
  UpdateCodeSecurityIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/integration/update",
    input: {
      integrationArn: 0,
      details: {
        gitlabSelfManaged: { authCode: 0 },
        github: { code: 0, installationId: 0 },
      },
    },
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
  operationName: "UpdateCodeSecurityIntegration",
})) as any;

export type UpdateCodeSecurityScanConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing code security scan configuration.
 */
export const updateCodeSecurityScanConfiguration: API.OperationMethod<
  UpdateCodeSecurityScanConfigurationRequest,
  UpdateCodeSecurityScanConfigurationResponse,
  UpdateCodeSecurityScanConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /codesecurity/scan-configuration/update",
    input: {
      scanConfigurationArn: 0,
      configuration: i_CodeSecurityScanConfiguration,
    },
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
  operationName: "UpdateCodeSecurityScanConfiguration",
})) as any;

export type UpdateConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the scan configuration for your Amazon Inspector account. If you don't specify an
 * `accountId`, this operation updates the delegated administrator's configuration
 * and propagates it to member accounts that have not been individually configured. If you
 * specify an `accountId`, this operation updates that member account's
 * configuration. Only the delegated administrator can specify an `accountId`;
 * member accounts cannot call this operation.
 */
export const updateConfiguration: API.OperationMethod<
  UpdateConfigurationRequest,
  UpdateConfigurationResponse,
  UpdateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configuration/update",
    input: {
      accountId: 0,
      ecrConfiguration: {
        rescanDuration: 0,
        pullDateRescanDuration: 0,
        pullDateRescanMode: 0,
      },
      ec2Configuration: { scanMode: 0, activateVMScanner: 0 },
      updateConfigurationInheritance: {
        ec2Configuration: 0,
        ecrConfiguration: 0,
      },
    },
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
  operationName: "UpdateConfiguration",
})) as any;

export type UpdateConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the description or provider-specific configuration details of an existing connector.
 */
export const updateConnector: API.OperationMethod<
  UpdateConnectorRequest,
  UpdateConnectorResponse,
  UpdateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /connector/update",
    input: {
      connectorArn: 0,
      description: 0,
      providerDetail: {
        azure: {
          azureRegions: 0,
          scopeConfiguration: i_AzureScopeConfigurationInput,
          autoInstallVMScanner: 0,
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnector",
})) as any;

export type UpdateConnectorScanConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates scan configuration settings for resources associated with an Amazon Web Services Config connector.
 */
export const updateConnectorScanConfiguration: API.OperationMethod<
  UpdateConnectorScanConfigurationRequest,
  UpdateConnectorScanConfigurationResponse,
  UpdateConnectorScanConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /connectorscanconfiguration/update",
    input: {
      awsConfigConnectorArn: 0,
      scanConfiguration: {
        containerImageScanning: { pushDuration: 0, pullDuration: 0 },
      },
    },
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
  operationName: "UpdateConnectorScanConfiguration",
})) as any;

export type UpdateEc2DeepInspectionConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Activates, deactivates Amazon Inspector deep inspection, or updates custom paths for your account.
 */
export const updateEc2DeepInspectionConfiguration: API.OperationMethod<
  UpdateEc2DeepInspectionConfigurationRequest,
  UpdateEc2DeepInspectionConfigurationResponse,
  UpdateEc2DeepInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ec2deepinspectionconfiguration/update",
    input: { activateDeepInspection: 0, packagePaths: 0 },
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
  operationName: "UpdateEc2DeepInspectionConfiguration",
})) as any;

export type UpdateEncryptionKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an encryption key. A `ResourceNotFoundException` means that an
 * Amazon Web Services owned key is being used for encryption.
 */
export const updateEncryptionKey: API.OperationMethod<
  UpdateEncryptionKeyRequest,
  UpdateEncryptionKeyResponse,
  UpdateEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /encryptionkey/update",
    input: { kmsKeyId: 0, scanType: 0, resourceType: 0 },
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
  operationName: "UpdateEncryptionKey",
})) as any;

export type UpdateFilterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Specifies the action that is to be applied to the findings that match the filter.
 */
export const updateFilter: API.OperationMethod<
  UpdateFilterRequest,
  UpdateFilterResponse,
  UpdateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /filters/update",
    input: {
      action: 0,
      description: 0,
      filterCriteria: i_FilterCriteria,
      name: 0,
      filterArn: 0,
      reason: 0,
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
  operationName: "UpdateFilter",
})) as any;

export type UpdateOrganizationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configurations for your Amazon Inspector organization.
 */
export const updateOrganizationConfiguration: API.OperationMethod<
  UpdateOrganizationConfigurationRequest,
  UpdateOrganizationConfigurationResponse,
  UpdateOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /organizationconfiguration/update",
    input: {
      autoEnable: {
        ec2: 0,
        ecr: 0,
        lambda: 0,
        lambdaCode: 0,
        codeRepository: 0,
      },
    },
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
  operationName: "UpdateOrganizationConfiguration",
})) as any;

export type UpdateOrgEc2DeepInspectionConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the Amazon Inspector deep inspection custom paths for your organization. You must be an
 * Amazon Inspector delegated administrator to use this API.
 */
export const updateOrgEc2DeepInspectionConfiguration: API.OperationMethod<
  UpdateOrgEc2DeepInspectionConfigurationRequest,
  UpdateOrgEc2DeepInspectionConfigurationResponse,
  UpdateOrgEc2DeepInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ec2deepinspectionconfiguration/org/update",
    input: { orgPackagePaths: 0 },
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
  operationName: "UpdateOrgEc2DeepInspectionConfiguration",
})) as any;

const i_AzureScopeConfigurationInput: D.LazyStruct = () => ({
  vmScanning: i_ScopeConfigurationInput,
  containerImageScanning: i_ScopeConfigurationInput,
  serverlessScanning: i_ScopeConfigurationInput,
});
const i_CisNumberFilter: D.LazyStruct = () => ({
  upperInclusive: 0,
  lowerInclusive: 0,
});
const i_CisSecurityLevelFilter: D.LazyStruct = () => ({
  comparison: 0,
  value: 0,
});
const i_CisStringFilter: D.LazyStruct = () => ({ comparison: 0, value: 0 });
const i_CodeSecurityResource: D.LazyStruct = () => ({ projectId: 0 });
const i_CodeSecurityScanConfiguration: D.LazyStruct = () => ({
  periodicScanConfiguration: { frequency: 0, frequencyExpression: 0 },
  continuousIntegrationScanConfiguration: { supportedEvents: 0 },
  ruleSetCategories: 0,
});
const i_CoverageFilterCriteria: D.LazyStruct = () => ({
  scanStatusCode: D.list(i_CoverageStringFilter),
  scanStatusReason: D.list(i_CoverageStringFilter),
  accountId: D.list(i_CoverageStringFilter),
  resourceId: D.list(i_CoverageStringFilter),
  resourceType: D.list(i_CoverageStringFilter),
  scanType: D.list(i_CoverageStringFilter),
  ecrRepositoryName: D.list(i_CoverageStringFilter),
  ecrImageTags: D.list(i_CoverageStringFilter),
  ec2InstanceTags: D.list(i_CoverageMapFilter),
  lambdaFunctionName: D.list(i_CoverageStringFilter),
  lambdaFunctionTags: D.list(i_CoverageMapFilter),
  lambdaFunctionRuntime: D.list(i_CoverageStringFilter),
  lastScannedAt: D.list(i_CoverageDateFilter),
  scanMode: D.list(i_CoverageStringFilter),
  imagePulledAt: D.list(i_CoverageDateFilter),
  ecrImageLastInUseAt: D.list(i_CoverageDateFilter),
  ecrImageInUseCount: D.list({ upperInclusive: 0, lowerInclusive: 0 }),
  codeRepositoryProjectName: D.list(i_CoverageStringFilter),
  codeRepositoryProviderType: D.list(i_CoverageStringFilter),
  codeRepositoryProviderTypeVisibility: D.list(i_CoverageStringFilter),
  lastScannedCommitId: D.list(i_CoverageStringFilter),
  cloudProvider: D.list(i_CoverageStringFilter),
  cloudProviderAccountId: D.list(i_CoverageStringFilter),
  cloudProviderRegion: D.list(i_CoverageStringFilter),
  cloudVmInstanceTags: D.list(i_CoverageMapFilter),
  cloudContainerImageTags: D.list(i_CoverageStringFilter),
  cloudContainerRepositoryName: D.list(i_CoverageStringFilter),
  cloudContainerRegistryName: D.list(i_CoverageStringFilter),
  cloudServerlessFunctionName: D.list(i_CoverageStringFilter),
  cloudServerlessFunctionRuntime: D.list(i_CoverageStringFilter),
  cloudServerlessFunctionTags: D.list(i_CoverageMapFilter),
  cloudProviderOrgId: D.list(i_CoverageStringFilter),
});
const i_DateFilter: D.LazyStruct = () => ({
  startInclusive: 0,
  endInclusive: 0,
});
const i_Destination: D.LazyStruct = () => ({
  bucketName: 0,
  keyPrefix: 0,
  kmsKeyArn: 0,
});
const i_FilterCriteria: D.LazyStruct = () => ({
  findingArn: D.list(i_StringFilter),
  awsAccountId: D.list(i_StringFilter),
  findingType: D.list(i_StringFilter),
  severity: D.list(i_StringFilter),
  firstObservedAt: D.list(i_DateFilter),
  lastObservedAt: D.list(i_DateFilter),
  updatedAt: D.list(i_DateFilter),
  findingStatus: D.list(i_StringFilter),
  title: D.list(i_StringFilter),
  inspectorScore: D.list(i_NumberFilter),
  resourceType: D.list(i_StringFilter),
  resourceId: D.list(i_StringFilter),
  resourceTags: D.list(i_MapFilter),
  ec2InstanceImageId: D.list(i_StringFilter),
  ec2InstanceVpcId: D.list(i_StringFilter),
  ec2InstanceSubnetId: D.list(i_StringFilter),
  ecrImagePushedAt: D.list(i_DateFilter),
  ecrImageArchitecture: D.list(i_StringFilter),
  ecrImageRegistry: D.list(i_StringFilter),
  ecrImageRepositoryName: D.list(i_StringFilter),
  ecrImageTags: D.list(i_StringFilter),
  ecrImageHash: D.list(i_StringFilter),
  ecrImageLastInUseAt: D.list(i_DateFilter),
  ecrImageInUseCount: D.list(i_NumberFilter),
  portRange: D.list({ beginInclusive: 0, endInclusive: 0 }),
  networkProtocol: D.list(i_StringFilter),
  componentId: D.list(i_StringFilter),
  componentType: D.list(i_StringFilter),
  vulnerabilityId: D.list(i_StringFilter),
  vulnerabilitySource: D.list(i_StringFilter),
  vendorSeverity: D.list(i_StringFilter),
  vulnerablePackages: D.list({
    name: i_StringFilter,
    version: i_StringFilter,
    epoch: i_NumberFilter,
    release: i_StringFilter,
    architecture: i_StringFilter,
    sourceLayerHash: i_StringFilter,
    sourceLambdaLayerArn: i_StringFilter,
    filePath: i_StringFilter,
  }),
  relatedVulnerabilities: D.list(i_StringFilter),
  fixAvailable: D.list(i_StringFilter),
  lambdaFunctionName: D.list(i_StringFilter),
  lambdaFunctionLayers: D.list(i_StringFilter),
  lambdaFunctionRuntime: D.list(i_StringFilter),
  lambdaFunctionLastModifiedAt: D.list(i_DateFilter),
  lambdaFunctionExecutionRoleArn: D.list(i_StringFilter),
  exploitAvailable: D.list(i_StringFilter),
  codeVulnerabilityDetectorName: D.list(i_StringFilter),
  codeVulnerabilityDetectorTags: D.list(i_StringFilter),
  codeVulnerabilityFilePath: D.list(i_StringFilter),
  epssScore: D.list(i_NumberFilter),
  codeRepositoryProjectName: D.list(i_StringFilter),
  codeRepositoryProviderType: D.list(i_StringFilter),
  cloudProvider: D.list(i_StringFilter),
  cloudProviderRegion: D.list(i_StringFilter),
  cloudProviderAccountId: D.list(i_StringFilter),
  cloudProviderOrgId: D.list(i_StringFilter),
  cloudVmImageReference: D.list(i_StringFilter),
  cloudVmNetworkId: D.list(i_StringFilter),
  cloudVmSubnetIds: D.list(i_StringFilter),
  cloudImageRepositoryName: D.list(i_StringFilter),
  cloudImageRegistry: D.list(i_StringFilter),
  cloudImageDigest: D.list(i_StringFilter),
  cloudImageTags: D.list(i_StringFilter),
  cloudImagePushedAt: D.list(i_DateFilter),
  cloudImageArchitecture: D.list(i_StringFilter),
  cloudImageLastInUseAt: D.list(i_DateFilter),
  cloudImageInUseCount: D.list(i_NumberFilter),
  cloudServerlessFunctionName: D.list(i_StringFilter),
  cloudServerlessFunctionRuntime: D.list(i_StringFilter),
  cloudServerlessFunctionLastModifiedAt: D.list(i_DateFilter),
  cloudServerlessFunctionExecutionRole: D.list(i_StringFilter),
});
const i_MapFilter: D.LazyStruct = () => ({ comparison: 0, key: 0, value: 0 });
const i_NumberFilter: D.LazyStruct = () => ({
  upperInclusive: 0,
  lowerInclusive: 0,
});
const i_ResourceMapFilter: D.LazyStruct = () => ({
  comparison: 0,
  key: 0,
  value: 0,
});
const i_ResourceStringFilter: D.LazyStruct = () => ({
  comparison: 0,
  value: 0,
});
const i_Schedule: D.LazyStruct = () => ({
  oneTime: {},
  daily: { startTime: i_Time },
  weekly: { startTime: i_Time, days: 0 },
  monthly: { startTime: i_Time, day: 0 },
});
const i_StringFilter: D.LazyStruct = () => ({ comparison: 0, value: 0 });
const i_TagFilter: D.LazyStruct = () => ({ comparison: 0, key: 0, value: 0 });
const o_CisaData: D.LazyStruct = () => ({ dateAdded: D.ts, dateDue: D.ts });
const o_ExploitObserved: D.LazyStruct = () => ({
  lastSeen: D.ts,
  firstSeen: D.ts,
});
const o_FilterCriteria: D.LazyStruct = () => ({
  firstObservedAt: D.list(o_DateFilter),
  lastObservedAt: D.list(o_DateFilter),
  updatedAt: D.list(o_DateFilter),
  ecrImagePushedAt: D.list(o_DateFilter),
  ecrImageLastInUseAt: D.list(o_DateFilter),
  lambdaFunctionLastModifiedAt: D.list(o_DateFilter),
  cloudImagePushedAt: D.list(o_DateFilter),
  cloudImageLastInUseAt: D.list(o_DateFilter),
  cloudServerlessFunctionLastModifiedAt: D.list(o_DateFilter),
});
const o_Member: D.LazyStruct = () => ({ updatedAt: D.ts });
const i_CoverageDateFilter: D.LazyStruct = () => ({
  startInclusive: 0,
  endInclusive: 0,
});
const i_CoverageMapFilter: D.LazyStruct = () => ({
  comparison: 0,
  key: 0,
  value: 0,
});
const i_CoverageStringFilter: D.LazyStruct = () => ({
  comparison: 0,
  value: 0,
});
const i_ScopeConfigurationInput: D.LazyStruct = () => ({
  scopeType: 0,
  scopeValues: 0,
});
const i_Time: D.LazyStruct = () => ({ timeOfDay: 0, timezone: 0 });
const o_DateFilter: D.LazyStruct = () => ({
  startInclusive: D.ts,
  endInclusive: D.ts,
});
