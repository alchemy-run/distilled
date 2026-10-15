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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Inspector2", serviceShapeName: "Inspector2" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "inspector2" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-06-08");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://inspector2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://inspector2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://inspector2.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), resourceId: S.String },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
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
      fields: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(3169, __c99, 1)).annotate({
          identifier: "ValidationExceptionFields",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type DisassociateConfigurationRequestList = DisassociateConfigurationRequest[];
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
export type MemberAccountEc2DeepInspectionStatusList = MemberAccountEc2DeepInspectionStatus[];
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
export type Day = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | (string & {});
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
  | { oneTime?: never; daily?: never; weekly?: never; monthly: MonthlySchedule };
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
export type PeriodicScanFrequency = "WEEKLY" | "MONTHLY" | "NEVER" | (string & {});
export type FrequencyExpression = string;
export interface PeriodicScanConfiguration {
  frequency?: PeriodicScanFrequency;
  frequencyExpression?: string;
}
export type ContinuousIntegrationScanEvent = "PULL_REQUEST" | "PUSH" | (string & {});
export type ContinuousIntegrationScanSupportedEvents = ContinuousIntegrationScanEvent[];
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
export type CisReportStatus = "SUCCEEDED" | "FAILED" | "IN_PROGRESS" | (string & {});
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
export type CisStringComparison = "EQUALS" | "PREFIX" | "NOT_EQUALS" | (string & {});
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
  | { awsEcsMetadataDetails: AwsEcsMetadataDetails; awsEksMetadataDetails?: never }
  | { awsEcsMetadataDetails?: never; awsEksMetadataDetails: AwsEksMetadataDetails };
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
export type CodeScanStatus = "IN_PROGRESS" | "SUCCESSFUL" | "FAILED" | "SKIPPED" | (string & {});
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
export type CisScanConfigurationsSortBy = "SCAN_NAME" | "SCAN_CONFIGURATION_ARN" | (string & {});
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
export type CisTargetStatus = "TIMED_OUT" | "CANCELLED" | "COMPLETED" | (string & {});
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
export type CisScanStatus = "FAILED" | "COMPLETED" | "CANCELLED" | "IN_PROGRESS" | (string & {});
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
export type CodeSecurityScanConfigurationSummaries = CodeSecurityScanConfigurationSummary[];
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
export type ConnectorType = "CUSTOMER_MANAGED" | "SERVICE_LINKED" | (string & {});
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
export type ScopeState = "ACTIVE" | "PENDING" | "ERROR" | "DISABLED" | (string & {});
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
export type ConnectorScanConfigurationItemList = ConnectorScanConfigurationItem[];
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
export type ProjectPeriodicScanConfigurationList = ProjectPeriodicScanConfiguration[];
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
  low?: number;
  informational?: number;
  untriaged?: number;
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
  | { gitlabSelfManaged: UpdateGitLabSelfManagedIntegrationDetail; github?: never }
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
 * indicates the association was successfully started, but doesn't indicate whether it was
 * completed. You can check if the association completed by using ListMembers for multiple
 * accounts or GetMembers for a single account.
 */
export const associateMember: API.OperationMethod<
  AssociateMemberRequest,
  AssociateMemberResponse,
  AssociateMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<AssociateMemberRequest>,
  output: __S(3552, __c111, 0) as any as S.Schema<AssociateMemberResponse>,
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
}));

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
  input: __S(
    3872,
    __c121,
    0,
  ) as any as S.Schema<BatchAssociateCodeSecurityScanConfigurationRequest>,
  output: __S(
    3910,
    __c122,
    6,
  ) as any as S.Schema<BatchAssociateCodeSecurityScanConfigurationResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<BatchDisassociateCodeSecurityScanConfigurationRequest>,
  output: __S(
    3910,
    __c122,
    6,
  ) as any as S.Schema<BatchDisassociateCodeSecurityScanConfigurationResponse>,
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
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<BatchGetAccountStatusRequest>,
  output: __S(37, __c1, 5) as any as S.Schema<BatchGetAccountStatusResponse>,
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
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<BatchGetCodeSnippetRequest>,
  output: __S(135, __c4, 7) as any as S.Schema<BatchGetCodeSnippetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCodeSnippet",
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<BatchGetFindingDetailsRequest>,
  output: __S(197, __c6, 5) as any as S.Schema<BatchGetFindingDetailsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFindingDetails",
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<BatchGetFreeTrialInfoRequest>,
  output: __S(263, __c8, 7) as any as S.Schema<BatchGetFreeTrialInfoResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFreeTrialInfo",
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<BatchGetMemberEc2DeepInspectionStatusRequest>,
  output: __S(324, __c10, 4) as any as S.Schema<BatchGetMemberEc2DeepInspectionStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMemberEc2DeepInspectionStatus",
}));

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
  input: __S(354, __c11, 2) as any as S.Schema<BatchUpdateMemberEc2DeepInspectionStatusRequest>,
  output: __S(324, __c10, 4) as any as S.Schema<BatchUpdateMemberEc2DeepInspectionStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateMemberEc2DeepInspectionStatus",
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<CancelFindingsReportRequest>,
  output: __S(385, __c12, 1) as any as S.Schema<CancelFindingsReportResponse>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<CancelSbomExportRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<CancelSbomExportResponse>,
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
}));

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
  input: __S(481, __c15, 1) as any as S.Schema<CreateCisScanConfigurationRequest>,
  output: __S(576, __c18, 0) as any as S.Schema<CreateCisScanConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCisScanConfiguration",
}));

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
  input: __S(706, __c22, 2) as any as S.Schema<CreateCodeSecurityIntegrationRequest>,
  output: __S(707, __c22, 3) as any as S.Schema<CreateCodeSecurityIntegrationResponse>,
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
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<CreateCodeSecurityScanConfigurationRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<CreateCodeSecurityScanConfigurationResponse>,
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
}));

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
  input: __S(866, __c27, 2) as any as S.Schema<CreateConnectorRequest>,
  output: __S(867, __c27, 3) as any as S.Schema<CreateConnectorResponse>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<CreateFilterRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<CreateFilterResponse>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<CreateFindingsReportRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<CreateFindingsReportResponse>,
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
}));

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
  input: __S(1216, __c38, 0) as any as S.Schema<CreateSbomExportRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<CreateSbomExportResponse>,
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
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<DeleteCisScanConfigurationRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteCisScanConfigurationResponse>,
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
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<DeleteCodeSecurityIntegrationRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<DeleteCodeSecurityIntegrationResponse>,
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
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<DeleteCodeSecurityScanConfigurationRequest>,
  output: __S(576, __c18, 0) as any as S.Schema<DeleteCodeSecurityScanConfigurationResponse>,
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
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<DeleteConnectorRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteConnectorResponse>,
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
}));

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
  input: __S(1408, __c44, 0) as any as S.Schema<DeleteFilterRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteFilterResponse>,
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
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<DescribeOrganizationConfigurationRequest>,
  output: __S(1441, __c45, 1) as any as S.Schema<DescribeOrganizationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfiguration",
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<DisableRequest>,
  output: __S(1538, __c48, 2) as any as S.Schema<DisableResponse>,
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
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<DisableDelegatedAdminAccountRequest>,
  output: __S(1600, __c50, 0) as any as S.Schema<DisableDelegatedAdminAccountResponse>,
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
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<DisassociateMemberRequest>,
  output: __S(3552, __c111, 0) as any as S.Schema<DisassociateMemberResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMember",
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<EnableRequest>,
  output: __S(1538, __c48, 2) as any as S.Schema<EnableResponse>,
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
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<EnableDelegatedAdminAccountRequest>,
  output: __S(1600, __c50, 0) as any as S.Schema<EnableDelegatedAdminAccountResponse>,
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
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<GetCisScanReportRequest>,
  output: __S(1729, __c54, 1) as any as S.Schema<GetCisScanReportResponse>,
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
}));

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
  input: __S(1761, __c55, 1) as any as S.Schema<GetCisScanResultDetailsRequest>,
  output: __S(1764, __c55, 4) as any as S.Schema<GetCisScanResultDetailsResponse>,
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
  input: __S(1857, __c58, 1) as any as S.Schema<GetClustersForImageRequest>,
  output: __S(1867, __c58, 11) as any as S.Schema<GetClustersForImageResponse>,
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
  input: __S(1888, __c59, 0) as any as S.Schema<GetCodeSecurityIntegrationRequest>,
  output: __S(1889, __c59, 1) as any as S.Schema<GetCodeSecurityIntegrationResponse>,
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
}));

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
  input: __S(1920, __c60, 0) as any as S.Schema<GetCodeSecurityScanRequest>,
  output: __S(1921, __c60, 1) as any as S.Schema<GetCodeSecurityScanResponse>,
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
}));

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
  input: __S(1952, __c61, 0) as any as S.Schema<GetCodeSecurityScanConfigurationRequest>,
  output: __S(1953, __c61, 1) as any as S.Schema<GetCodeSecurityScanConfigurationResponse>,
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
}));

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
  input: __S(1984, __c62, 0) as any as S.Schema<GetConfigurationRequest>,
  output: __S(1990, __c62, 6) as any as S.Schema<GetConfigurationResponse>,
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
}));

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
  input: __S(2016, __c63, 0) as any as S.Schema<GetDelegatedAdminAccountRequest>,
  output: __S(2018, __c63, 2) as any as S.Schema<GetDelegatedAdminAccountResponse>,
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
}));

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
  input: __S(2048, __c64, 0) as any as S.Schema<GetEc2DeepInspectionConfigurationRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<GetEc2DeepInspectionConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEc2DeepInspectionConfiguration",
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<GetEncryptionKeyRequest>,
  output: __S(2113, __c66, 1) as any as S.Schema<GetEncryptionKeyResponse>,
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
}));

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
  input: __S(2144, __c67, 0) as any as S.Schema<GetFindingsReportStatusRequest>,
  output: __S(2145, __c67, 1) as any as S.Schema<GetFindingsReportStatusResponse>,
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
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<GetMemberRequest>,
  output: __S(2177, __c68, 1) as any as S.Schema<GetMemberResponse>,
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
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<GetSbomExportRequest>,
  output: __S(2241, __c70, 1) as any as S.Schema<GetSbomExportResponse>,
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
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<ListAccountPermissionsRequest>,
  output: __S(2275, __c71, 3) as any as S.Schema<ListAccountPermissionsResponse>,
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
  input: __S(2305, __c72, 1) as any as S.Schema<ListCisScanConfigurationsRequest>,
  output: __S(2308, __c72, 4) as any as S.Schema<ListCisScanConfigurationsResponse>,
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
  input: __S(2401, __c75, 1) as any as S.Schema<ListCisScanResultsAggregatedByChecksRequest>,
  output: __S(2404, __c75, 4) as any as S.Schema<ListCisScanResultsAggregatedByChecksResponse>,
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
  input: __S(
    2465,
    __c77,
    1,
  ) as any as S.Schema<ListCisScanResultsAggregatedByTargetResourceRequest>,
  output: __S(
    2468,
    __c77,
    4,
  ) as any as S.Schema<ListCisScanResultsAggregatedByTargetResourceResponse>,
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
  input: __S(2499, __c78, 3) as any as S.Schema<ListCisScansRequest>,
  output: __S(2502, __c78, 6) as any as S.Schema<ListCisScansResponse>,
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
  input: __S(2528, __c79, 0) as any as S.Schema<ListCodeSecurityIntegrationsRequest>,
  output: __S(2531, __c79, 3) as any as S.Schema<ListCodeSecurityIntegrationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeSecurityIntegrations",
}));

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
  input: __S(
    2560,
    __c80,
    0,
  ) as any as S.Schema<ListCodeSecurityScanConfigurationAssociationsRequest>,
  output: __S(
    2563,
    __c80,
    3,
  ) as any as S.Schema<ListCodeSecurityScanConfigurationAssociationsResponse>,
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
}));

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
  input: __S(2592, __c81, 0) as any as S.Schema<ListCodeSecurityScanConfigurationsRequest>,
  output: __S(2595, __c81, 3) as any as S.Schema<ListCodeSecurityScanConfigurationsResponse>,
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
}));

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
  input: __S(2625, __c82, 1) as any as S.Schema<ListConnectorsRequest>,
  output: __S(2631, __c82, 7) as any as S.Schema<ListConnectorsResponse>,
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
  input: __S(2656, __c83, 0) as any as S.Schema<ListConnectorScanConfigurationsRequest>,
  output: __S(2659, __c83, 3) as any as S.Schema<ListConnectorScanConfigurationsResponse>,
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
  input: __S(2720, __c85, 0) as any as S.Schema<ListCoverageRequest>,
  output: __S(2740, __c85, 20) as any as S.Schema<ListCoverageResponse>,
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
  input: __S(2784, __c87, 0) as any as S.Schema<ListCoverageStatisticsRequest>,
  output: __S(2787, __c87, 3) as any as S.Schema<ListCoverageStatisticsResponse>,
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
  input: __S(2816, __c88, 0) as any as S.Schema<ListDelegatedAdminAccountsRequest>,
  output: __S(2819, __c88, 3) as any as S.Schema<ListDelegatedAdminAccountsResponse>,
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
  input: __S(2848, __c89, 0) as any as S.Schema<ListFiltersRequest>,
  output: __S(2851, __c89, 3) as any as S.Schema<ListFiltersResponse>,
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
  input: __S(2895, __c90, 15) as any as S.Schema<ListFindingAggregationsRequest>,
  output: __S(2914, __c91, 2) as any as S.Schema<ListFindingAggregationsResponse>,
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
  input: __S(2945, __c92, 1) as any as S.Schema<ListFindingsRequest>,
  output: __S(2978, __c93, 2) as any as S.Schema<ListFindingsResponse>,
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
  input: __S(3040, __c95, 0) as any as S.Schema<ListMembersRequest>,
  output: __S(3042, __c95, 2) as any as S.Schema<ListMembersResponse>,
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
  input: __S(3072, __c96, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(3073, __c96, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(3104, __c97, 0) as any as S.Schema<ListUsageTotalsRequest>,
  output: __S(3109, __c97, 5) as any as S.Schema<ListUsageTotalsResponse>,
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
  input: __S(3136, __c98, 0) as any as S.Schema<ResetEncryptionKeyRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<ResetEncryptionKeyResponse>,
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
}));

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
  input: __S(3201, __c100, 1) as any as S.Schema<SearchVulnerabilitiesRequest>,
  output: __S(3206, __c100, 6) as any as S.Schema<SearchVulnerabilitiesResponse>,
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
  input: __S(3232, __c101, 0) as any as S.Schema<SendCisSessionHealthRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<SendCisSessionHealthResponse>,
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
}));

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
  input: __S(3266, __c102, 2) as any as S.Schema<SendCisSessionTelemetryRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<SendCisSessionTelemetryResponse>,
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
}));

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
  input: __S(3297, __c103, 1) as any as S.Schema<StartCisSessionRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<StartCisSessionResponse>,
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
}));

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
  input: __S(3328, __c104, 0) as any as S.Schema<StartCodeSecurityScanRequest>,
  output: __S(3329, __c104, 1) as any as S.Schema<StartCodeSecurityScanResponse>,
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
}));

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
  input: __S(3363, __c105, 3) as any as S.Schema<StopCisSessionRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<StopCisSessionResponse>,
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
}));

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
  input: __S(3392, __c106, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(3424, __c107, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(3456, __c108, 0) as any as S.Schema<UpdateCisScanConfigurationRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<UpdateCisScanConfigurationResponse>,
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
}));

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
  input: __S(3491, __c109, 3) as any as S.Schema<UpdateCodeSecurityIntegrationRequest>,
  output: __S(3492, __c109, 4) as any as S.Schema<UpdateCodeSecurityIntegrationResponse>,
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
}));

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
  input: __S(3584, __c112, 0) as any as S.Schema<UpdateCodeSecurityScanConfigurationRequest>,
  output: __S(576, __c18, 0) as any as S.Schema<UpdateCodeSecurityScanConfigurationResponse>,
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
}));

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
  input: __S(3619, __c113, 3) as any as S.Schema<UpdateConfigurationRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfiguration",
}));

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
  input: __S(3650, __c114, 2) as any as S.Schema<UpdateConnectorRequest>,
  output: __S(3651, __c114, 3) as any as S.Schema<UpdateConnectorResponse>,
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
}));

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
  input: __S(3680, __c115, 0) as any as S.Schema<UpdateConnectorScanConfigurationRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateConnectorScanConfigurationResponse>,
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
}));

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
  input: __S(3712, __c116, 0) as any as S.Schema<UpdateEc2DeepInspectionConfigurationRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<UpdateEc2DeepInspectionConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEc2DeepInspectionConfiguration",
}));

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
  input: __S(3744, __c117, 0) as any as S.Schema<UpdateEncryptionKeyRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateEncryptionKeyResponse>,
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
}));

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
  input: __S(3776, __c118, 0) as any as S.Schema<UpdateFilterRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<UpdateFilterResponse>,
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
}));

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
  input: __S(3808, __c119, 0) as any as S.Schema<UpdateOrganizationConfigurationRequest>,
  output: __S(3809, __c119, 1) as any as S.Schema<UpdateOrganizationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationConfiguration",
}));

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
  input: __S(3840, __c120, 0) as any as S.Schema<UpdateOrgEc2DeepInspectionConfigurationRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateOrgEc2DeepInspectionConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrgEc2DeepInspectionConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ disassociateConfigurationRequests: __S(3905, __c122, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/scan-configuration/batch/disassociate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDisassociateCodeSecurityScanConfigurationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountIds: S.optional(__S(64, __c2, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/status/batch/get" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetAccountStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "State" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ec2: __S(33, __c1, 1),
          ecr: __S(33, __c1, 1),
          lambda: S.optional(__S(33, __c1, 1)),
          lambdaCode: S.optional(__S(33, __c1, 1)),
          codeRepository: S.optional(__S(33, __c1, 1)),
        }),
      ).annotate({ identifier: "ResourceState" });
    case 3:
      return S.suspend(() =>
        S.Struct({ accountId: S.String, state: __S(33, __c1, 1), resourceState: __S(34, __c1, 2) }),
      ).annotate({ identifier: "AccountState" });
    case 4:
      return S.Array(__S(35, __c1, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ accounts: __S(36, __c1, 4), failedAccounts: S.optional(__S(98, __c3, 2)) }),
      ).annotate({ identifier: "BatchGetAccountStatusResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ec2: S.optional(S.String),
          ecr: S.optional(S.String),
          lambda: S.optional(S.String),
          lambdaCode: S.optional(S.String),
          codeRepository: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          status: S.optional(S.String),
          resourceStatus: S.optional(__S(96, __c3, 0)),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailedAccount" });
    case 2:
      return S.Array(__S(97, __c3, 1));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ findingArns: __S(64, __c2, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesnippet/batchget" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetCodeSnippetRequest" });
    case 1:
      return S.suspend(() => S.Struct({ content: S.String, lineNumber: S.Number })).annotate({
        identifier: "CodeLine",
      });
    case 2:
      return S.Array(__S(129, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ description: S.optional(S.String), code: S.optional(S.String) }),
      ).annotate({ identifier: "SuggestedFix" });
    case 4:
      return S.Array(__S(131, __c4, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          findingArn: S.optional(S.String),
          startLine: S.optional(S.Number),
          endLine: S.optional(S.Number),
          codeSnippet: S.optional(__S(130, __c4, 2)),
          suggestedFixes: S.optional(__S(132, __c4, 4)),
        }),
      ).annotate({ identifier: "CodeSnippetResult" });
    case 6:
      return S.Array(__S(133, __c4, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          codeSnippetResults: S.optional(__S(134, __c4, 6)),
          errors: S.optional(__S(161, __c5, 1)),
        }),
      ).annotate({ identifier: "BatchGetCodeSnippetResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ findingArn: S.String, errorCode: S.String, errorMessage: S.String }),
      ).annotate({ identifier: "CodeSnippetError" });
    case 1:
      return S.Array(__S(160, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ findingArns: __S(64, __c2, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/findings/details/batch/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetFindingDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          evidenceRule: S.optional(S.String),
          evidenceDetail: S.optional(S.String),
          severity: S.optional(S.String),
        }),
      ).annotate({ identifier: "Evidence" });
    case 2:
      return S.Array(__S(193, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          findingArn: S.optional(S.String),
          cisaData: S.optional(__S(224, __c7, 0)),
          riskScore: S.optional(S.Number),
          evidences: S.optional(__S(194, __c6, 2)),
          ttps: S.optional(__S(64, __c2, 0)),
          tools: S.optional(__S(64, __c2, 0)),
          exploitObserved: S.optional(__S(225, __c7, 1)),
          referenceUrls: S.optional(__S(64, __c2, 0)),
          cwes: S.optional(__S(64, __c2, 0)),
          epssScore: S.optional(S.Number),
        }),
      ).annotate({ identifier: "FindingDetail" });
    case 4:
      return S.Array(__S(195, __c6, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          findingDetails: S.optional(__S(196, __c6, 4)),
          errors: S.optional(__S(161, __c5, 1)),
        }),
      ).annotate({ identifier: "BatchGetFindingDetailsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dateAdded: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          dateDue: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          action: S.optional(S.String),
        }),
      ).annotate({ identifier: "CisaData" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          lastSeen: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          firstSeen: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ExploitObserved" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountIds: __S(64, __c2, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/freetrialinfo/batchget" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetFreeTrialInfoRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          start: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          end: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          cloudProvider: S.optional(S.String),
        }),
      ).annotate({ identifier: "FreeTrialInfo" });
    case 2:
      return S.Array(__S(257, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ accountId: S.String, freeTrialInfo: __S(258, __c8, 2) }),
      ).annotate({ identifier: "FreeTrialAccountInfo" });
    case 4:
      return S.Array(__S(259, __c8, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ accountId: S.String, code: S.String, message: S.String }),
      ).annotate({ identifier: "FreeTrialInfoError" });
    case 6:
      return S.Array(__S(261, __c8, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ accounts: __S(260, __c8, 4), failedAccounts: __S(262, __c8, 6) }),
      ).annotate({ identifier: "BatchGetFreeTrialInfoResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountIds: S.optional(__S(64, __c2, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ec2deepinspectionstatus/member/batch/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetMemberEc2DeepInspectionStatusRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          status: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "MemberAccountEc2DeepInspectionStatusState" });
    case 1:
      return S.Array(__S(320, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          ec2ScanStatus: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailedMemberAccountEc2DeepInspectionStatusState" });
    case 3:
      return S.Array(__S(322, __c10, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(321, __c10, 1)),
          failedAccountIds: S.optional(__S(323, __c10, 3)),
        }),
      ).annotate({ identifier: "BatchGetMemberEc2DeepInspectionStatusResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountId: S.String, activateDeepInspection: S.Boolean }),
      ).annotate({ identifier: "MemberAccountEc2DeepInspectionStatus" });
    case 1:
      return S.Array(__S(352, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ accountIds: __S(353, __c11, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ec2deepinspectionstatus/member/batch/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateMemberEc2DeepInspectionStatusRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reportId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/reporting/cancel" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelFindingsReportRequest" });
    case 1:
      return S.suspend(() => S.Struct({ reportId: S.String })).annotate({
        identifier: "CancelFindingsReportResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reportId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sbomexport/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelSbomExportRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ reportId: S.optional(S.String) })).annotate({
        identifier: "CancelSbomExportResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountIds: __S(64, __c2, 0), targetResourceTags: __S(640, __c20, 0) }),
      ).annotate({ identifier: "CreateCisTargets" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scanName: S.String,
          securityLevel: S.String,
          schedule: __S(676, __c21, 4),
          targets: __S(480, __c15, 0),
          tags: S.optional(__S(512, __c16, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cis/scan-configuration/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCisScanConfigurationRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ scanConfigurationArn: S.optional(S.String) })).annotate({
        identifier: "CreateCisScanConfigurationResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "OneTimeSchedule" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(64, __c2, 0).pipe(S.optional));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ timeOfDay: S.String, timezone: S.String })).annotate({
        identifier: "Time",
      });
    case 1:
      return S.suspend(() => S.Struct({ startTime: __S(672, __c21, 0) })).annotate({
        identifier: "DailySchedule",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ startTime: __S(672, __c21, 0), days: __S(544, __c17, 0) }),
      ).annotate({ identifier: "WeeklySchedule" });
    case 3:
      return S.suspend(() => S.Struct({ startTime: __S(672, __c21, 0), day: S.String })).annotate({
        identifier: "MonthlySchedule",
      });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ oneTime: __S(608, __c19, 0) }),
        /*@__PURE__*/ S.Struct({ daily: __S(673, __c21, 1) }),
        /*@__PURE__*/ S.Struct({ weekly: __S(674, __c21, 2) }),
        /*@__PURE__*/ S.Struct({ monthly: __S(675, __c21, 3) }),
      ]);
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceUrl: SensitiveString, accessToken: SensitiveString }),
      ).annotate({ identifier: "CreateGitLabSelfManagedIntegrationDetail" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ gitlabSelfManaged: __S(704, __c22, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          details: S.optional(__S(705, __c22, 1)),
          tags: S.optional(__S(512, __c16, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/integration/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCodeSecurityIntegrationRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          integrationArn: S.String,
          status: S.String,
          authorizationUrl: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CreateCodeSecurityIntegrationResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          level: S.String,
          configuration: __S(834, __c26, 2),
          scopeSettings: S.optional(__S(800, __c25, 0)),
          tags: S.optional(__S(512, __c16, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/scan-configuration/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCodeSecurityScanConfigurationRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ scanConfigurationArn: S.String })).annotate({
        identifier: "CreateCodeSecurityScanConfigurationResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ projectSelectionScope: S.optional(S.String) })).annotate({
        identifier: "ScopeSettings",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ frequency: S.optional(S.String), frequencyExpression: S.optional(S.String) }),
      ).annotate({ identifier: "PeriodicScanConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ supportedEvents: __S(544, __c17, 0) })).annotate({
        identifier: "ContinuousIntegrationScanConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          periodicScanConfiguration: S.optional(__S(832, __c26, 0)),
          continuousIntegrationScanConfiguration: S.optional(__S(833, __c26, 1)),
          ruleSetCategories: __S(544, __c17, 0),
        }),
      ).annotate({ identifier: "CodeSecurityScanConfiguration" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          awsConfigConnectorArn: S.String,
          scopeConfiguration: __S(897, __c28, 1),
          azureRegions: __S(64, __c2, 0),
          autoInstallVMScanner: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AzureProviderDetailCreate" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ azure: __S(864, __c27, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          provider: S.String,
          description: S.optional(S.String),
          providerDetail: __S(865, __c27, 1),
          tags: S.optional(__S(512, __c16, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/connector/create" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConnectorRequest" });
    case 3:
      return S.suspend(() => S.Struct({ connectorArn: S.String })).annotate({
        identifier: "CreateConnectorResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scopeType: S.String, scopeValues: S.optional(__S(64, __c2, 0)) }),
      ).annotate({ identifier: "ScopeConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vmScanning: S.optional(__S(896, __c28, 0)),
          containerImageScanning: S.optional(__S(896, __c28, 0)),
          serverlessScanning: S.optional(__S(896, __c28, 0)),
        }),
      ).annotate({ identifier: "AzureScopeConfigurationInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          action: S.String,
          description: S.optional(S.String),
          filterCriteria: __S(1092, __c34, 4),
          name: S.String,
          tags: S.optional(__S(512, __c16, 0)),
          reason: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/filters/create" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateFilterRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ comparison: S.String, value: S.String })).annotate({
        identifier: "StringFilter",
      });
    case 1:
      return S.Array(__S(960, __c30, 0));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ comparison: S.String, key: S.String, value: S.optional(S.String) }),
      ).annotate({ identifier: "MapFilter" });
    case 1:
      return S.Array(__S(992, __c31, 0));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ upperInclusive: S.optional(S.Number), lowerInclusive: S.optional(S.Number) }),
      ).annotate({ identifier: "NumberFilter" });
    case 1:
      return S.Array(__S(1024, __c32, 0));
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DateFilter" });
    case 1:
      return S.Array(__S(1056, __c33, 0));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ beginInclusive: S.optional(S.Number), endInclusive: S.optional(S.Number) }),
      ).annotate({ identifier: "PortRangeFilter" });
    case 1:
      return S.Array(__S(1088, __c34, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(__S(960, __c30, 0)),
          version: S.optional(__S(960, __c30, 0)),
          epoch: S.optional(__S(1024, __c32, 0)),
          release: S.optional(__S(960, __c30, 0)),
          architecture: S.optional(__S(960, __c30, 0)),
          sourceLayerHash: S.optional(__S(960, __c30, 0)),
          sourceLambdaLayerArn: S.optional(__S(960, __c30, 0)),
          filePath: S.optional(__S(960, __c30, 0)),
        }),
      ).annotate({ identifier: "PackageFilter" });
    case 3:
      return S.Array(__S(1090, __c34, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          findingArn: S.optional(__S(961, __c30, 1)),
          awsAccountId: S.optional(__S(961, __c30, 1)),
          findingType: S.optional(__S(961, __c30, 1)),
          severity: S.optional(__S(961, __c30, 1)),
          firstObservedAt: S.optional(__S(1057, __c33, 1)),
          lastObservedAt: S.optional(__S(1057, __c33, 1)),
          updatedAt: S.optional(__S(1057, __c33, 1)),
          findingStatus: S.optional(__S(961, __c30, 1)),
          title: S.optional(__S(961, __c30, 1)),
          inspectorScore: S.optional(__S(1025, __c32, 1)),
          resourceType: S.optional(__S(961, __c30, 1)),
          resourceId: S.optional(__S(961, __c30, 1)),
          resourceTags: S.optional(__S(993, __c31, 1)),
          ec2InstanceImageId: S.optional(__S(961, __c30, 1)),
          ec2InstanceVpcId: S.optional(__S(961, __c30, 1)),
          ec2InstanceSubnetId: S.optional(__S(961, __c30, 1)),
          ecrImagePushedAt: S.optional(__S(1057, __c33, 1)),
          ecrImageArchitecture: S.optional(__S(961, __c30, 1)),
          ecrImageRegistry: S.optional(__S(961, __c30, 1)),
          ecrImageRepositoryName: S.optional(__S(961, __c30, 1)),
          ecrImageTags: S.optional(__S(961, __c30, 1)),
          ecrImageHash: S.optional(__S(961, __c30, 1)),
          ecrImageLastInUseAt: S.optional(__S(1057, __c33, 1)),
          ecrImageInUseCount: S.optional(__S(1025, __c32, 1)),
          portRange: S.optional(__S(1089, __c34, 1)),
          networkProtocol: S.optional(__S(961, __c30, 1)),
          componentId: S.optional(__S(961, __c30, 1)),
          componentType: S.optional(__S(961, __c30, 1)),
          vulnerabilityId: S.optional(__S(961, __c30, 1)),
          vulnerabilitySource: S.optional(__S(961, __c30, 1)),
          vendorSeverity: S.optional(__S(961, __c30, 1)),
          vulnerablePackages: S.optional(__S(1091, __c34, 3)),
          relatedVulnerabilities: S.optional(__S(961, __c30, 1)),
          fixAvailable: S.optional(__S(961, __c30, 1)),
          lambdaFunctionName: S.optional(__S(961, __c30, 1)),
          lambdaFunctionLayers: S.optional(__S(961, __c30, 1)),
          lambdaFunctionRuntime: S.optional(__S(961, __c30, 1)),
          lambdaFunctionLastModifiedAt: S.optional(__S(1057, __c33, 1)),
          lambdaFunctionExecutionRoleArn: S.optional(__S(961, __c30, 1)),
          exploitAvailable: S.optional(__S(961, __c30, 1)),
          codeVulnerabilityDetectorName: S.optional(__S(961, __c30, 1)),
          codeVulnerabilityDetectorTags: S.optional(__S(961, __c30, 1)),
          codeVulnerabilityFilePath: S.optional(__S(961, __c30, 1)),
          epssScore: S.optional(__S(1025, __c32, 1)),
          codeRepositoryProjectName: S.optional(__S(961, __c30, 1)),
          codeRepositoryProviderType: S.optional(__S(961, __c30, 1)),
          cloudProvider: S.optional(__S(961, __c30, 1)),
          cloudProviderRegion: S.optional(__S(961, __c30, 1)),
          cloudProviderAccountId: S.optional(__S(961, __c30, 1)),
          cloudProviderOrgId: S.optional(__S(961, __c30, 1)),
          cloudVmImageReference: S.optional(__S(961, __c30, 1)),
          cloudVmNetworkId: S.optional(__S(961, __c30, 1)),
          cloudVmSubnetIds: S.optional(__S(961, __c30, 1)),
          cloudImageRepositoryName: S.optional(__S(961, __c30, 1)),
          cloudImageRegistry: S.optional(__S(961, __c30, 1)),
          cloudImageDigest: S.optional(__S(961, __c30, 1)),
          cloudImageTags: S.optional(__S(961, __c30, 1)),
          cloudImagePushedAt: S.optional(__S(1057, __c33, 1)),
          cloudImageArchitecture: S.optional(__S(961, __c30, 1)),
          cloudImageLastInUseAt: S.optional(__S(1057, __c33, 1)),
          cloudImageInUseCount: S.optional(__S(1025, __c32, 1)),
          cloudServerlessFunctionName: S.optional(__S(961, __c30, 1)),
          cloudServerlessFunctionRuntime: S.optional(__S(961, __c30, 1)),
          cloudServerlessFunctionLastModifiedAt: S.optional(__S(1057, __c33, 1)),
          cloudServerlessFunctionExecutionRole: S.optional(__S(961, __c30, 1)),
        }),
      ).annotate({ identifier: "FilterCriteria" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({
        identifier: "CreateFilterResponse",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filterCriteria: S.optional(__S(1092, __c34, 4)),
          reportFormat: S.String,
          s3Destination: __S(1184, __c37, 0),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/reporting/create" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateFindingsReportRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketName: S.String, keyPrefix: S.optional(S.String), kmsKeyArn: S.String }),
      ).annotate({ identifier: "Destination" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceFilterCriteria: S.optional(__S(1248, __c39, 0)),
          reportFormat: S.String,
          s3Destination: __S(1184, __c37, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sbomexport/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSbomExportRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(__S(961, __c30, 1)),
          resourceId: S.optional(__S(961, __c30, 1)),
          resourceType: S.optional(__S(961, __c30, 1)),
          ecrRepositoryName: S.optional(__S(961, __c30, 1)),
          lambdaFunctionName: S.optional(__S(961, __c30, 1)),
          ecrImageTags: S.optional(__S(961, __c30, 1)),
          ec2InstanceTags: S.optional(__S(993, __c31, 1)),
          lambdaFunctionTags: S.optional(__S(993, __c31, 1)),
          cloudProvider: S.optional(__S(961, __c30, 1)),
          cloudProviderAccountId: S.optional(__S(961, __c30, 1)),
          cloudProviderOrgId: S.optional(__S(961, __c30, 1)),
          cloudProviderRegion: S.optional(__S(961, __c30, 1)),
          cloudVmInstanceTags: S.optional(__S(993, __c31, 1)),
          cloudContainerImageTags: S.optional(__S(961, __c30, 1)),
          cloudContainerRepositoryName: S.optional(__S(961, __c30, 1)),
          cloudContainerRegistryName: S.optional(__S(961, __c30, 1)),
          cloudServerlessFunctionName: S.optional(__S(961, __c30, 1)),
          cloudServerlessFunctionRuntime: S.optional(__S(961, __c30, 1)),
          cloudServerlessFunctionTags: S.optional(__S(993, __c31, 1)),
        }),
      ).annotate({ identifier: "ResourceFilterCriteria" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scanConfigurationArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cis/scan-configuration/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCisScanConfigurationRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ integrationArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/integration/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCodeSecurityIntegrationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ integrationArn: S.optional(S.String) })).annotate({
        identifier: "DeleteCodeSecurityIntegrationResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scanConfigurationArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/scan-configuration/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCodeSecurityScanConfigurationRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectorArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/connector/delete" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConnectorRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/filters/delete" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFilterRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/organizationconfiguration/describe" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeOrganizationConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          autoEnable: S.optional(__S(1472, __c46, 0)),
          maxAccountLimitReached: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DescribeOrganizationConfigurationResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ec2: S.Boolean,
          ecr: S.Boolean,
          lambda: S.optional(S.Boolean),
          lambdaCode: S.optional(S.Boolean),
          codeRepository: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AutoEnable" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(64, __c2, 0)),
          resourceTypes: S.optional(__S(64, __c2, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/disable" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisableRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountId: S.String, status: S.String, resourceStatus: __S(96, __c3, 0) }),
      ).annotate({ identifier: "Account" });
    case 1:
      return S.Array(__S(1536, __c48, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ accounts: __S(1537, __c48, 1), failedAccounts: S.optional(__S(98, __c3, 2)) }),
      ).annotate({ identifier: "DisableResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ delegatedAdminAccountId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delegatedadminaccounts/disable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableDelegatedAdminAccountRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ delegatedAdminAccountId: S.String })).annotate({
        identifier: "DisableDelegatedAdminAccountResponse",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/members/disassociate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateMemberRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(64, __c2, 0)),
          resourceTypes: __S(64, __c2, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/enable" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "EnableRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          delegatedAdminAccountId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delegatedadminaccounts/enable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableDelegatedAdminAccountRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scanArn: S.String,
          targetAccounts: S.optional(__S(64, __c2, 0)),
          reportFormat: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cis/scan/report/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCisScanReportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ url: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "GetCisScanReportResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          findingStatusFilters: S.optional(__S(1825, __c57, 1)),
          checkIdFilters: S.optional(__S(1793, __c56, 1)),
          titleFilters: S.optional(__S(1793, __c56, 1)),
          securityLevelFilters: S.optional(__S(1825, __c57, 1)),
          findingArnFilters: S.optional(__S(1793, __c56, 1)),
        }),
      ).annotate({ identifier: "CisScanResultDetailsFilterCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scanArn: S.String,
          targetResourceId: S.String,
          accountId: S.String,
          filterCriteria: S.optional(__S(1760, __c55, 0)),
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cis/scan-result/details/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCisScanResultDetailsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          scanArn: S.String,
          accountId: S.optional(S.String),
          targetResourceId: S.optional(S.String),
          platform: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          checkId: S.optional(S.String),
          title: S.optional(S.String),
          checkDescription: S.optional(S.String),
          remediation: S.optional(S.String),
          level: S.optional(S.String),
          findingArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CisScanResultDetails" });
    case 3:
      return S.Array(__S(1762, __c55, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          scanResultDetails: S.optional(__S(1763, __c55, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCisScanResultDetailsResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ comparison: S.String, value: S.String })).annotate({
        identifier: "CisStringFilter",
      });
    case 1:
      return S.Array(__S(1792, __c56, 0));
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ comparison: S.String, value: S.String })).annotate({
        identifier: "CisFindingStatusFilter",
      });
    case 1:
      return S.Array(__S(1824, __c57, 0));
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ resourceId: S.String })).annotate({
        identifier: "ClusterForImageFilterCriteria",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filter: __S(1856, __c58, 0),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/cluster/get" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetClustersForImageRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ detailsGroup: S.String, taskDefinitionArn: S.String }),
      ).annotate({ identifier: "AwsEcsMetadataDetails" });
    case 3:
      return S.suspend(() => S.Struct({ name: S.String, type: S.String })).annotate({
        identifier: "AwsEksWorkloadInfo",
      });
    case 4:
      return S.Array(__S(1859, __c58, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          namespace: S.optional(S.String),
          workloadInfoList: S.optional(__S(1860, __c58, 4)),
        }),
      ).annotate({ identifier: "AwsEksMetadataDetails" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ awsEcsMetadataDetails: __S(1858, __c58, 2) }),
        /*@__PURE__*/ S.Struct({ awsEksMetadataDetails: __S(1861, __c58, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          lastInUse: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          runningUnitCount: S.optional(S.Number),
          stoppedUnitCount: S.optional(S.Number),
          clusterMetadata: __S(1862, __c58, 6),
        }),
      ).annotate({ identifier: "ClusterDetails" });
    case 8:
      return S.Array(__S(1863, __c58, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ clusterArn: S.String, clusterDetails: S.optional(__S(1864, __c58, 8)) }),
      ).annotate({ identifier: "ClusterInformation" });
    case 10:
      return S.Array(__S(1865, __c58, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ cluster: __S(1866, __c58, 10), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetClustersForImageResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ integrationArn: S.String, tags: S.optional(__S(512, __c16, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/integration/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCodeSecurityIntegrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          integrationArn: S.String,
          name: S.String,
          type: S.String,
          status: S.String,
          statusReason: S.String,
          createdOn: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdateOn: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          authorizationUrl: S.optional(SensitiveString),
          tags: S.optional(__S(512, __c16, 0)),
        }),
      ).annotate({ identifier: "GetCodeSecurityIntegrationResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resource: __S(3936, __c123, 0), scanId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/scan/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCodeSecurityScanRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scanId: S.optional(S.String),
          resource: S.optional(__S(3936, __c123, 0)),
          accountId: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastCommitId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCodeSecurityScanResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scanConfigurationArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/scan-configuration/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCodeSecurityScanConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scanConfigurationArn: S.optional(S.String),
          name: S.optional(S.String),
          configuration: S.optional(__S(834, __c26, 2)),
          level: S.optional(S.String),
          scopeSettings: S.optional(__S(800, __c25, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(512, __c16, 0)),
        }),
      ).annotate({ identifier: "GetCodeSecurityScanConfigurationResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configuration/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          rescanDuration: S.optional(S.String),
          status: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          pullDateRescanDuration: S.optional(S.String),
          pullDateRescanMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "EcrRescanDurationState" });
    case 2:
      return S.suspend(() =>
        S.Struct({ rescanDurationState: S.optional(__S(1985, __c62, 1)) }),
      ).annotate({ identifier: "EcrConfigurationState" });
    case 3:
      return S.suspend(() =>
        S.Struct({ scanMode: S.optional(S.String), scanModeStatus: S.optional(S.String) }),
      ).annotate({ identifier: "Ec2ScanModeState" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          activated: S.optional(S.Boolean),
          activatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "VMScannerState" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          scanModeState: S.optional(__S(1987, __c62, 3)),
          vmScannerState: S.optional(__S(1988, __c62, 4)),
        }),
      ).annotate({ identifier: "Ec2ConfigurationState" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ecrConfiguration: S.optional(__S(1986, __c62, 2)),
          ec2Configuration: S.optional(__S(1989, __c62, 5)),
        }),
      ).annotate({ identifier: "GetConfigurationResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delegatedadminaccounts/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDelegatedAdminAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ accountId: S.optional(S.String), relationshipStatus: S.optional(S.String) }),
      ).annotate({ identifier: "DelegatedAdmin" });
    case 2:
      return S.suspend(() =>
        S.Struct({ delegatedAdmin: S.optional(__S(2017, __c63, 1)) }),
      ).annotate({ identifier: "GetDelegatedAdminAccountResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ec2deepinspectionconfiguration/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEc2DeepInspectionConfigurationRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packagePaths: S.optional(__S(64, __c2, 0)),
          orgPackagePaths: S.optional(__S(64, __c2, 0)),
          status: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetEc2DeepInspectionConfigurationResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scanType: S.String.pipe(T.HttpQuery("scanType")),
          resourceType: S.String.pipe(T.HttpQuery("resourceType")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/encryptionkey/get" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEncryptionKeyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ kmsKeyId: S.String })).annotate({
        identifier: "GetEncryptionKeyResponse",
      });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reportId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/reporting/status/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFindingsReportStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          reportId: S.optional(S.String),
          status: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
          destination: S.optional(__S(1184, __c37, 0)),
          filterCriteria: S.optional(__S(1092, __c34, 4)),
        }),
      ).annotate({ identifier: "GetFindingsReportStatusResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/members/get" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMemberRequest" });
    case 1:
      return S.suspend(() => S.Struct({ member: S.optional(__S(2208, __c69, 0)) })).annotate({
        identifier: "GetMemberResponse",
      });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          relationshipStatus: S.optional(S.String),
          delegatedAdminAccountId: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Member" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reportId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/sbomexport/get" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSbomExportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          reportId: S.optional(S.String),
          format: S.optional(S.String),
          status: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
          s3Destination: S.optional(__S(1184, __c37, 0)),
          filterCriteria: S.optional(__S(1248, __c39, 0)),
        }),
      ).annotate({ identifier: "GetSbomExportResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          service: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accountpermissions/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAccountPermissionsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ service: S.String, operation: S.String })).annotate({
        identifier: "Permission",
      });
    case 2:
      return S.Array(__S(2273, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ permissions: __S(2274, __c71, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccountPermissionsResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scanNameFilters: S.optional(__S(1793, __c56, 1)),
          targetResourceTagFilters: S.optional(__S(2337, __c73, 1)),
          scanConfigurationArnFilters: S.optional(__S(1793, __c56, 1)),
        }),
      ).annotate({ identifier: "ListCisScanConfigurationsFilterCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filterCriteria: S.optional(__S(2304, __c72, 0)),
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cis/scan-configuration/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCisScanConfigurationsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          scanConfigurationArn: S.String,
          ownerId: S.optional(S.String),
          scanName: S.optional(S.String),
          securityLevel: S.optional(S.String),
          schedule: S.optional(__S(676, __c21, 4)),
          targets: S.optional(__S(2368, __c74, 0)),
          tags: S.optional(__S(512, __c16, 0)),
        }),
      ).annotate({ identifier: "CisScanConfiguration" });
    case 3:
      return S.Array(__S(2306, __c72, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          scanConfigurations: S.optional(__S(2307, __c72, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCisScanConfigurationsResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ comparison: S.String, key: S.String, value: S.String }),
      ).annotate({ identifier: "TagFilter" });
    case 1:
      return S.Array(__S(2336, __c73, 0));
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(64, __c2, 0)),
          targetResourceTags: S.optional(__S(640, __c20, 0)),
        }),
      ).annotate({ identifier: "CisTargets" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIdFilters: S.optional(__S(1793, __c56, 1)),
          checkIdFilters: S.optional(__S(1793, __c56, 1)),
          titleFilters: S.optional(__S(1793, __c56, 1)),
          platformFilters: S.optional(__S(1793, __c56, 1)),
          failedResourcesFilters: S.optional(__S(1025, __c32, 1)),
          securityLevelFilters: S.optional(__S(1825, __c57, 1)),
        }),
      ).annotate({ identifier: "CisScanResultsAggregatedByChecksFilterCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scanArn: S.String,
          filterCriteria: S.optional(__S(2400, __c75, 0)),
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cis/scan-result/check/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCisScanResultsAggregatedByChecksRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          scanArn: S.String,
          checkId: S.optional(S.String),
          title: S.optional(S.String),
          checkDescription: S.optional(S.String),
          level: S.optional(S.String),
          accountId: S.optional(S.String),
          statusCounts: S.optional(__S(2432, __c76, 0)),
          platform: S.optional(S.String),
        }),
      ).annotate({ identifier: "CisCheckAggregation" });
    case 3:
      return S.Array(__S(2402, __c75, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          checkAggregations: S.optional(__S(2403, __c75, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCisScanResultsAggregatedByChecksResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          failed: S.optional(S.Number),
          skipped: S.optional(S.Number),
          passed: S.optional(S.Number),
        }),
      ).annotate({ identifier: "StatusCounts" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIdFilters: S.optional(__S(1793, __c56, 1)),
          statusFilters: S.optional(__S(1825, __c57, 1)),
          checkIdFilters: S.optional(__S(1793, __c56, 1)),
          targetResourceIdFilters: S.optional(__S(1793, __c56, 1)),
          targetResourceTagFilters: S.optional(__S(2337, __c73, 1)),
          platformFilters: S.optional(__S(1793, __c56, 1)),
          targetStatusFilters: S.optional(__S(1825, __c57, 1)),
          targetStatusReasonFilters: S.optional(__S(1825, __c57, 1)),
          failedChecksFilters: S.optional(__S(1025, __c32, 1)),
        }),
      ).annotate({ identifier: "CisScanResultsAggregatedByTargetResourceFilterCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scanArn: S.String,
          filterCriteria: S.optional(__S(2464, __c77, 0)),
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cis/scan-result/resource/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCisScanResultsAggregatedByTargetResourceRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          scanArn: S.String,
          targetResourceId: S.optional(S.String),
          accountId: S.optional(S.String),
          targetResourceTags: S.optional(__S(640, __c20, 0)),
          statusCounts: S.optional(__S(2432, __c76, 0)),
          platform: S.optional(S.String),
          targetStatus: S.optional(S.String),
          targetStatusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "CisTargetResourceAggregation" });
    case 3:
      return S.Array(__S(2466, __c77, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          targetResourceAggregations: S.optional(__S(2467, __c77, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCisScanResultsAggregatedByTargetResourceResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          earliestScanStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          latestScanStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CisDateFilter" });
    case 1:
      return S.Array(__S(2496, __c78, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          scanNameFilters: S.optional(__S(1793, __c56, 1)),
          targetResourceTagFilters: S.optional(__S(2337, __c73, 1)),
          targetResourceIdFilters: S.optional(__S(1793, __c56, 1)),
          scanStatusFilters: S.optional(__S(1825, __c57, 1)),
          scanAtFilters: S.optional(__S(2497, __c78, 1)),
          scanConfigurationArnFilters: S.optional(__S(1793, __c56, 1)),
          scanArnFilters: S.optional(__S(1793, __c56, 1)),
          scheduledByFilters: S.optional(__S(1793, __c56, 1)),
          failedChecksFilters: S.optional(__S(1025, __c32, 1)),
          targetAccountIdFilters: S.optional(__S(1793, __c56, 1)),
        }),
      ).annotate({ identifier: "ListCisScansFilterCriteria" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          filterCriteria: S.optional(__S(2498, __c78, 2)),
          detailLevel: S.optional(S.String),
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/cis/scan/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCisScansRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          scanArn: S.String,
          scanConfigurationArn: S.String,
          status: S.optional(S.String),
          scanName: S.optional(S.String),
          scanDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failedChecks: S.optional(S.Number),
          totalChecks: S.optional(S.Number),
          targets: S.optional(__S(2368, __c74, 0)),
          scheduledBy: S.optional(S.String),
          securityLevel: S.optional(S.String),
        }),
      ).annotate({ identifier: "CisScan" });
    case 5:
      return S.Array(__S(2500, __c78, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ scans: S.optional(__S(2501, __c78, 5)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCisScansResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/integration/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCodeSecurityIntegrationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          integrationArn: S.String,
          name: S.String,
          type: S.String,
          status: S.String,
          statusReason: S.String,
          createdOn: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdateOn: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CodeSecurityIntegrationSummary" });
    case 2:
      return S.Array(__S(2529, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          integrations: S.optional(__S(2530, __c79, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCodeSecurityIntegrationsResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scanConfigurationArn: S.String,
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/scan-configuration/associations/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCodeSecurityScanConfigurationAssociationsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ resource: S.optional(__S(3936, __c123, 0)) })).annotate({
        identifier: "CodeSecurityScanConfigurationAssociationSummary",
      });
    case 2:
      return S.Array(__S(2561, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          associations: S.optional(__S(2562, __c80, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCodeSecurityScanConfigurationAssociationsResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/scan-configuration/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCodeSecurityScanConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scanConfigurationArn: S.String,
          name: S.String,
          ownerAccountId: S.String,
          periodicScanFrequency: S.optional(S.String),
          frequencyExpression: S.optional(S.String),
          continuousIntegrationScanSupportedEvents: S.optional(__S(544, __c17, 0)),
          ruleSetCategories: __S(544, __c17, 0),
          scopeSettings: S.optional(__S(800, __c25, 0)),
        }),
      ).annotate({ identifier: "CodeSecurityScanConfigurationSummary" });
    case 2:
      return S.Array(__S(2593, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          configurations: S.optional(__S(2594, __c81, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCodeSecurityScanConfigurationsResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectorArns: S.optional(__S(1793, __c56, 1)),
          accounts: S.optional(__S(961, __c30, 1)),
          awsConfigConnectorArns: S.optional(__S(1793, __c56, 1)),
          connectorType: S.optional(__S(1825, __c57, 1)),
          provider: S.optional(__S(1825, __c57, 1)),
        }),
      ).annotate({ identifier: "ConnectorFilterCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(SensitiveString),
          filterCriteria: S.optional(__S(2624, __c82, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/connector/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListConnectorsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          connectorStatus: S.String,
          lastCheckedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectorHealth" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          scopeType: S.String,
          scopeValues: S.optional(__S(64, __c2, 0)),
          state: S.optional(S.String),
          stateReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScopeConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          vmScanning: S.optional(__S(2627, __c82, 3)),
          containerImageScanning: S.optional(__S(2627, __c82, 3)),
          serverlessScanning: S.optional(__S(2627, __c82, 3)),
        }),
      ).annotate({ identifier: "AzureScopeConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          connectorArn: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          provider: S.String,
          enablementStatus: S.optional(S.String),
          enablementStatusReason: S.optional(S.String),
          health: S.optional(__S(2626, __c82, 2)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          azureRegions: S.optional(__S(64, __c2, 0)),
          awsConfigConnectorArn: S.optional(S.String),
          scopeConfiguration: S.optional(__S(2628, __c82, 4)),
          tags: S.optional(__S(512, __c16, 0)),
          autoInstallVMScanner: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Connector" });
    case 6:
      return S.Array(__S(2629, __c82, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ items: __S(2630, __c82, 6), nextToken: S.optional(SensitiveString) }),
      ).annotate({ identifier: "ListConnectorsResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          awsConfigConnectorArns: S.optional(__S(64, __c2, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/connectorscanconfigurations/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConnectorScanConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          awsConfigConnectorArn: S.String,
          connectorArns: __S(64, __c2, 0),
          scanConfiguration: __S(2689, __c84, 1),
        }),
      ).annotate({ identifier: "ConnectorScanConfigurationItem" });
    case 2:
      return S.Array(__S(2657, __c83, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          scanConfigurations: __S(2658, __c83, 2),
          nextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListConnectorScanConfigurationsResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pushDuration: S.optional(S.String), pullDuration: S.optional(S.String) }),
      ).annotate({ identifier: "ConnectorContainerImageScanConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ containerImageScanning: S.optional(__S(2688, __c84, 0)) }),
      ).annotate({ identifier: "ConnectorScanConfiguration" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filterCriteria: S.optional(__S(2752, __c86, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/coverage/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCoverageRequest" });
    case 1:
      return S.suspend(() => S.Struct({ statusCode: S.String, reason: S.String })).annotate({
        identifier: "ScanStatus",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), scanFrequency: S.optional(S.String) }),
      ).annotate({ identifier: "EcrRepositoryMetadata" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          tags: S.optional(__S(64, __c2, 0)),
          imagePulledAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastInUseAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          inUseCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EcrContainerImageMetadata" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          tags: S.optional(__S(512, __c16, 0)),
          amiId: S.optional(S.String),
          platform: S.optional(S.String),
        }),
      ).annotate({ identifier: "Ec2Metadata" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          functionTags: S.optional(__S(512, __c16, 0)),
          layers: S.optional(__S(64, __c2, 0)),
          functionName: S.optional(S.String),
          runtime: S.optional(S.String),
        }),
      ).annotate({ identifier: "LambdaFunctionMetadata" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          frequencyExpression: S.optional(S.String),
          ruleSetCategories: S.optional(__S(544, __c17, 0)),
        }),
      ).annotate({ identifier: "ProjectPeriodicScanConfiguration" });
    case 7:
      return S.Array(__S(2726, __c85, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          supportedEvent: S.optional(S.String),
          ruleSetCategories: S.optional(__S(544, __c17, 0)),
        }),
      ).annotate({ identifier: "ProjectContinuousIntegrationScanConfiguration" });
    case 9:
      return S.Array(__S(2728, __c85, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          periodicScanConfigurations: S.optional(__S(2727, __c85, 7)),
          continuousIntegrationScanConfigurations: S.optional(__S(2729, __c85, 9)),
        }),
      ).annotate({ identifier: "ProjectCodeSecurityScanConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          lastScannedCommitId: S.optional(S.String),
          lastScanAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          scanStatus: S.optional(__S(2721, __c85, 1)),
        }),
      ).annotate({ identifier: "CodeRepositoryOnDemandScan" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          projectName: S.String,
          integrationArn: S.optional(S.String),
          providerType: S.String,
          providerTypeVisibility: S.String,
          lastScannedCommitId: S.optional(S.String),
          scanConfiguration: S.optional(__S(2730, __c85, 10)),
          onDemandScan: S.optional(__S(2731, __c85, 11)),
        }),
      ).annotate({ identifier: "CodeRepositoryMetadata" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          tags: S.optional(__S(512, __c16, 0)),
          platform: S.optional(S.String),
          inventoryHash: S.optional(S.String),
          vmImageReference: S.optional(S.String),
        }),
      ).annotate({ identifier: "VmInstanceMetadata" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          imageTags: S.optional(__S(64, __c2, 0)),
          imagePulledAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastInUseAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          inUseCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ContainerImageMetadata" });
    case 15:
      return S.suspend(() => S.Struct({ name: S.optional(S.String) })).annotate({
        identifier: "ContainerRegistryMetadata",
      });
    case 16:
      return S.suspend(() =>
        S.Struct({
          serverlessFunctionName: S.optional(S.String),
          runtime: S.optional(S.String),
          functionTags: S.optional(__S(512, __c16, 0)),
        }),
      ).annotate({ identifier: "ServerlessFunctionMetadata" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          ecrRepository: S.optional(__S(2722, __c85, 2)),
          ecrImage: S.optional(__S(2723, __c85, 3)),
          ec2: S.optional(__S(2724, __c85, 4)),
          lambdaFunction: S.optional(__S(2725, __c85, 5)),
          codeRepository: S.optional(__S(2732, __c85, 12)),
          vmInstance: S.optional(__S(2733, __c85, 13)),
          containerImage: S.optional(__S(2734, __c85, 14)),
          containerRepository: S.optional(__S(2722, __c85, 2)),
          containerRegistry: S.optional(__S(2735, __c85, 15)),
          serverlessFunction: S.optional(__S(2736, __c85, 16)),
        }),
      ).annotate({ identifier: "ResourceScanMetadata" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          resourceId: S.String,
          accountId: S.String,
          scanType: S.String,
          scanStatus: S.optional(__S(2721, __c85, 1)),
          resourceMetadata: S.optional(__S(2737, __c85, 17)),
          lastScannedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          scanMode: S.optional(S.String),
          provider: S.optional(S.String),
          providerAccountId: S.optional(S.String),
          providerOrgId: S.optional(S.String),
          providerRegion: S.optional(S.String),
          providerPartition: S.optional(S.String),
        }),
      ).annotate({ identifier: "CoveredResource" });
    case 19:
      return S.Array(__S(2738, __c85, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          coveredResources: S.optional(__S(2739, __c85, 19)),
        }),
      ).annotate({ identifier: "ListCoverageResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scanStatusCode: S.optional(__S(961, __c30, 1)),
          scanStatusReason: S.optional(__S(961, __c30, 1)),
          accountId: S.optional(__S(961, __c30, 1)),
          resourceId: S.optional(__S(961, __c30, 1)),
          resourceType: S.optional(__S(961, __c30, 1)),
          scanType: S.optional(__S(961, __c30, 1)),
          ecrRepositoryName: S.optional(__S(961, __c30, 1)),
          ecrImageTags: S.optional(__S(961, __c30, 1)),
          ec2InstanceTags: S.optional(__S(993, __c31, 1)),
          lambdaFunctionName: S.optional(__S(961, __c30, 1)),
          lambdaFunctionTags: S.optional(__S(993, __c31, 1)),
          lambdaFunctionRuntime: S.optional(__S(961, __c30, 1)),
          lastScannedAt: S.optional(__S(1057, __c33, 1)),
          scanMode: S.optional(__S(961, __c30, 1)),
          imagePulledAt: S.optional(__S(1057, __c33, 1)),
          ecrImageLastInUseAt: S.optional(__S(1057, __c33, 1)),
          ecrImageInUseCount: S.optional(__S(1025, __c32, 1)),
          codeRepositoryProjectName: S.optional(__S(961, __c30, 1)),
          codeRepositoryProviderType: S.optional(__S(961, __c30, 1)),
          codeRepositoryProviderTypeVisibility: S.optional(__S(961, __c30, 1)),
          lastScannedCommitId: S.optional(__S(961, __c30, 1)),
          cloudProvider: S.optional(__S(961, __c30, 1)),
          cloudProviderAccountId: S.optional(__S(961, __c30, 1)),
          cloudProviderRegion: S.optional(__S(961, __c30, 1)),
          cloudVmInstanceTags: S.optional(__S(993, __c31, 1)),
          cloudContainerImageTags: S.optional(__S(961, __c30, 1)),
          cloudContainerRepositoryName: S.optional(__S(961, __c30, 1)),
          cloudContainerRegistryName: S.optional(__S(961, __c30, 1)),
          cloudServerlessFunctionName: S.optional(__S(961, __c30, 1)),
          cloudServerlessFunctionRuntime: S.optional(__S(961, __c30, 1)),
          cloudServerlessFunctionTags: S.optional(__S(993, __c31, 1)),
          cloudProviderOrgId: S.optional(__S(961, __c30, 1)),
        }),
      ).annotate({ identifier: "CoverageFilterCriteria" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filterCriteria: S.optional(__S(2752, __c86, 0)),
          groupBy: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/coverage/statistics/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCoverageStatisticsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ count: S.optional(S.Number), groupKey: S.optional(S.String) }),
      ).annotate({ identifier: "Counts" });
    case 2:
      return S.Array(__S(2785, __c87, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          countsByGroup: S.optional(__S(2786, __c87, 2)),
          totalCounts: S.Number,
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCoverageStatisticsResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delegatedadminaccounts/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDelegatedAdminAccountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ accountId: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "DelegatedAdminAccount" });
    case 2:
      return S.Array(__S(2817, __c88, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          delegatedAdminAccounts: S.optional(__S(2818, __c88, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDelegatedAdminAccountsResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arns: S.optional(__S(64, __c2, 0)),
          action: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/filters/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFiltersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          ownerId: S.String,
          name: S.String,
          criteria: __S(1092, __c34, 4),
          action: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          description: S.optional(S.String),
          reason: S.optional(S.String),
          tags: S.optional(__S(512, __c16, 0)),
        }),
      ).annotate({ identifier: "Filter" });
    case 2:
      return S.Array(__S(2849, __c89, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ filters: __S(2850, __c89, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFiltersResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          findingType: S.optional(S.String),
          resourceType: S.optional(S.String),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccountAggregation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          amis: S.optional(__S(961, __c30, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AmiAggregation" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourceIds: S.optional(__S(961, __c30, 1)),
          imageShas: S.optional(__S(961, __c30, 1)),
          repositories: S.optional(__S(961, __c30, 1)),
          architectures: S.optional(__S(961, __c30, 1)),
          imageTags: S.optional(__S(961, __c30, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
          lastInUseAt: S.optional(__S(1057, __c33, 1)),
          inUseCount: S.optional(__S(1025, __c32, 1)),
        }),
      ).annotate({ identifier: "AwsEcrContainerAggregation" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          amis: S.optional(__S(961, __c30, 1)),
          operatingSystems: S.optional(__S(961, __c30, 1)),
          instanceIds: S.optional(__S(961, __c30, 1)),
          instanceTags: S.optional(__S(993, __c31, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "Ec2InstanceAggregation" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          repositories: S.optional(__S(961, __c30, 1)),
          resourceIds: S.optional(__S(961, __c30, 1)),
          layerHashes: S.optional(__S(961, __c30, 1)),
          cloudProviders: S.optional(__S(961, __c30, 1)),
          cloudAccountIds: S.optional(__S(961, __c30, 1)),
          cloudOrgIds: S.optional(__S(961, __c30, 1)),
          cloudRegions: S.optional(__S(961, __c30, 1)),
          cloudPartitions: S.optional(__S(961, __c30, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImageLayerAggregation" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          packageNames: S.optional(__S(961, __c30, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "PackageAggregation" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          repositories: S.optional(__S(961, __c30, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "RepositoryAggregation" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          titles: S.optional(__S(961, __c30, 1)),
          vulnerabilityIds: S.optional(__S(961, __c30, 1)),
          resourceType: S.optional(S.String),
          findingType: S.optional(S.String),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "TitleAggregation" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          functionNames: S.optional(__S(961, __c30, 1)),
          resourceIds: S.optional(__S(961, __c30, 1)),
          layerArns: S.optional(__S(961, __c30, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "LambdaLayerAggregation" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          resourceIds: S.optional(__S(961, __c30, 1)),
          functionNames: S.optional(__S(961, __c30, 1)),
          runtimes: S.optional(__S(961, __c30, 1)),
          functionTags: S.optional(__S(993, __c31, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "LambdaFunctionAggregation" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          projectNames: S.optional(__S(961, __c30, 1)),
          providerTypes: S.optional(__S(961, __c30, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
          resourceIds: S.optional(__S(961, __c30, 1)),
        }),
      ).annotate({ identifier: "CodeRepositoryAggregation" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          resourceIds: S.optional(__S(961, __c30, 1)),
          operatingSystems: S.optional(__S(961, __c30, 1)),
          instanceTags: S.optional(__S(993, __c31, 1)),
          vmImageReferences: S.optional(__S(961, __c30, 1)),
          cloudProviders: S.optional(__S(961, __c30, 1)),
          cloudPartitions: S.optional(__S(961, __c30, 1)),
          cloudRegions: S.optional(__S(961, __c30, 1)),
          cloudOrgIds: S.optional(__S(961, __c30, 1)),
          cloudAccountIds: S.optional(__S(961, __c30, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "VmInstanceAggregation" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          resourceIds: S.optional(__S(961, __c30, 1)),
          imageDigests: S.optional(__S(961, __c30, 1)),
          repositories: S.optional(__S(961, __c30, 1)),
          registries: S.optional(__S(961, __c30, 1)),
          architectures: S.optional(__S(961, __c30, 1)),
          imageTags: S.optional(__S(961, __c30, 1)),
          cloudProviders: S.optional(__S(961, __c30, 1)),
          cloudPartitions: S.optional(__S(961, __c30, 1)),
          cloudRegions: S.optional(__S(961, __c30, 1)),
          cloudOrgIds: S.optional(__S(961, __c30, 1)),
          cloudAccountIds: S.optional(__S(961, __c30, 1)),
          lastInUseAt: S.optional(__S(1057, __c33, 1)),
          inUseCount: S.optional(__S(1025, __c32, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerImageAggregation" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          resourceIds: S.optional(__S(961, __c30, 1)),
          functionNames: S.optional(__S(961, __c30, 1)),
          runtimes: S.optional(__S(961, __c30, 1)),
          functionTags: S.optional(__S(993, __c31, 1)),
          cloudProviders: S.optional(__S(961, __c30, 1)),
          cloudPartitions: S.optional(__S(961, __c30, 1)),
          cloudRegions: S.optional(__S(961, __c30, 1)),
          cloudOrgIds: S.optional(__S(961, __c30, 1)),
          cloudAccountIds: S.optional(__S(961, __c30, 1)),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServerlessFunctionAggregation" });
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ accountAggregation: __S(2880, __c90, 0) }),
        /*@__PURE__*/ S.Struct({ amiAggregation: __S(2881, __c90, 1) }),
        /*@__PURE__*/ S.Struct({ awsEcrContainerAggregation: __S(2882, __c90, 2) }),
        /*@__PURE__*/ S.Struct({ ec2InstanceAggregation: __S(2883, __c90, 3) }),
        /*@__PURE__*/ S.Struct({ findingTypeAggregation: __S(2880, __c90, 0) }),
        /*@__PURE__*/ S.Struct({ imageLayerAggregation: __S(2884, __c90, 4) }),
        /*@__PURE__*/ S.Struct({ packageAggregation: __S(2885, __c90, 5) }),
        /*@__PURE__*/ S.Struct({ repositoryAggregation: __S(2886, __c90, 6) }),
        /*@__PURE__*/ S.Struct({ titleAggregation: __S(2887, __c90, 7) }),
        /*@__PURE__*/ S.Struct({ lambdaLayerAggregation: __S(2888, __c90, 8) }),
        /*@__PURE__*/ S.Struct({ lambdaFunctionAggregation: __S(2889, __c90, 9) }),
        /*@__PURE__*/ S.Struct({ codeRepositoryAggregation: __S(2890, __c90, 10) }),
        /*@__PURE__*/ S.Struct({ vmInstanceAggregation: __S(2891, __c90, 11) }),
        /*@__PURE__*/ S.Struct({ containerImageAggregation: __S(2892, __c90, 12) }),
        /*@__PURE__*/ S.Struct({ serverlessFunctionAggregation: __S(2893, __c90, 13) }),
      ]);
    case 15:
      return S.suspend(() =>
        S.Struct({
          aggregationType: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          accountIds: S.optional(__S(961, __c30, 1)),
          aggregationRequest: S.optional(__S(2894, __c90, 14)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/findings/aggregation/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFindingAggregationsRequest" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          all: S.optional(S.Number),
          medium: S.optional(S.Number),
          high: S.optional(S.Number),
          critical: S.optional(S.Number),
          low: S.optional(S.Number),
          informational: S.optional(S.Number),
          untriaged: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SeverityCounts" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
          exploitAvailableCount: S.optional(S.Number),
          fixAvailableCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AccountAggregationResponse" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          ami: S.String,
          accountId: S.optional(S.String),
          cloudProvider: S.optional(S.String),
          cloudPartition: S.optional(S.String),
          cloudRegion: S.optional(S.String),
          cloudOrgId: S.optional(S.String),
          cloudAccountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
          affectedInstances: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AmiAggregationResponse" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          resourceId: S.String,
          imageSha: S.optional(S.String),
          repository: S.optional(S.String),
          architecture: S.optional(S.String),
          imageTags: S.optional(__S(64, __c2, 0)),
          accountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
          lastInUseAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          inUseCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsEcrContainerAggregationResponse" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          instanceId: S.String,
          ami: S.optional(S.String),
          operatingSystem: S.optional(S.String),
          instanceTags: S.optional(__S(512, __c16, 0)),
          accountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
          networkFindings: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Ec2InstanceAggregationResponse" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
          exploitAvailableCount: S.optional(S.Number),
          fixAvailableCount: S.optional(S.Number),
          cloudProvider: S.optional(S.String),
          cloudAccountId: S.optional(S.String),
          cloudOrgId: S.optional(S.String),
          cloudRegion: S.optional(S.String),
          cloudPartition: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindingTypeAggregationResponse" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          repository: S.String,
          resourceId: S.String,
          layerHash: S.String,
          accountId: S.String,
          cloudProvider: S.optional(S.String),
          cloudAccountId: S.optional(S.String),
          cloudOrgId: S.optional(S.String),
          cloudRegion: S.optional(S.String),
          cloudPartition: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
        }),
      ).annotate({ identifier: "ImageLayerAggregationResponse" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          packageName: S.String,
          accountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
        }),
      ).annotate({ identifier: "PackageAggregationResponse" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          repository: S.String,
          accountId: S.optional(S.String),
          cloudProvider: S.optional(S.String),
          cloudPartition: S.optional(S.String),
          cloudRegion: S.optional(S.String),
          cloudOrgId: S.optional(S.String),
          cloudAccountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
          affectedImages: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RepositoryAggregationResponse" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          vulnerabilityId: S.optional(S.String),
          accountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
        }),
      ).annotate({ identifier: "TitleAggregationResponse" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String,
          resourceId: S.String,
          layerArn: S.String,
          accountId: S.String,
          severityCounts: S.optional(__S(2896, __c90, 16)),
        }),
      ).annotate({ identifier: "LambdaLayerAggregationResponse" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          resourceId: S.String,
          functionName: S.optional(S.String),
          runtime: S.optional(S.String),
          lambdaTags: S.optional(__S(512, __c16, 0)),
          accountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
          lastModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LambdaFunctionAggregationResponse" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          projectNames: S.String,
          providerType: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
          exploitAvailableActiveFindingsCount: S.optional(S.Number),
          fixAvailableActiveFindingsCount: S.optional(S.Number),
          accountId: S.optional(S.String),
          resourceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CodeRepositoryAggregationResponse" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          resourceId: S.String,
          cloudProvider: S.optional(S.String),
          cloudAccountId: S.optional(S.String),
          cloudPartition: S.optional(S.String),
          cloudRegion: S.optional(S.String),
          cloudOrgId: S.optional(S.String),
          vmImageReference: S.optional(S.String),
          operatingSystem: S.optional(S.String),
          tags: S.optional(__S(512, __c16, 0)),
          accountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
          networkFindings: S.optional(S.Number),
          exploitAvailableActiveFindingsCount: S.optional(S.Number),
          fixAvailableActiveFindingsCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "VmInstanceAggregationResponse" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          resourceId: S.String,
          cloudProvider: S.optional(S.String),
          cloudAccountId: S.optional(S.String),
          cloudPartition: S.optional(S.String),
          cloudRegion: S.optional(S.String),
          cloudOrgId: S.optional(S.String),
          imageDigest: S.optional(S.String),
          repository: S.optional(S.String),
          registry: S.optional(S.String),
          architecture: S.optional(S.String),
          imageTags: S.optional(__S(64, __c2, 0)),
          accountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
          lastInUseAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          inUseCount: S.optional(S.Number),
          exploitAvailableActiveFindingsCount: S.optional(S.Number),
          fixAvailableActiveFindingsCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ContainerImageAggregationResponse" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          resourceId: S.String,
          cloudProvider: S.optional(S.String),
          cloudAccountId: S.optional(S.String),
          cloudPartition: S.optional(S.String),
          cloudRegion: S.optional(S.String),
          cloudOrgId: S.optional(S.String),
          functionName: S.optional(S.String),
          runtime: S.optional(S.String),
          tags: S.optional(__S(512, __c16, 0)),
          accountId: S.optional(S.String),
          severityCounts: S.optional(__S(2896, __c90, 16)),
          lastModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          exploitAvailableActiveFindingsCount: S.optional(S.Number),
          fixAvailableActiveFindingsCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ServerlessFunctionAggregationResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ accountAggregation: __S(2897, __c90, 17) }),
        /*@__PURE__*/ S.Struct({ amiAggregation: __S(2898, __c90, 18) }),
        /*@__PURE__*/ S.Struct({ awsEcrContainerAggregation: __S(2899, __c90, 19) }),
        /*@__PURE__*/ S.Struct({ ec2InstanceAggregation: __S(2900, __c90, 20) }),
        /*@__PURE__*/ S.Struct({ findingTypeAggregation: __S(2901, __c90, 21) }),
        /*@__PURE__*/ S.Struct({ imageLayerAggregation: __S(2902, __c90, 22) }),
        /*@__PURE__*/ S.Struct({ packageAggregation: __S(2903, __c90, 23) }),
        /*@__PURE__*/ S.Struct({ repositoryAggregation: __S(2904, __c90, 24) }),
        /*@__PURE__*/ S.Struct({ titleAggregation: __S(2905, __c90, 25) }),
        /*@__PURE__*/ S.Struct({ lambdaLayerAggregation: __S(2906, __c90, 26) }),
        /*@__PURE__*/ S.Struct({ lambdaFunctionAggregation: __S(2907, __c90, 27) }),
        /*@__PURE__*/ S.Struct({ codeRepositoryAggregation: __S(2908, __c90, 28) }),
        /*@__PURE__*/ S.Struct({ vmInstanceAggregation: __S(2909, __c90, 29) }),
        /*@__PURE__*/ S.Struct({ containerImageAggregation: __S(2910, __c90, 30) }),
        /*@__PURE__*/ S.Struct({ serverlessFunctionAggregation: __S(2911, __c90, 31) }),
      ]);
    case 1:
      return S.Array(__S(2912, __c91, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          aggregationType: S.String,
          responses: S.optional(__S(2913, __c91, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFindingAggregationsResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ field: S.String, sortOrder: S.String })).annotate({
        identifier: "SortCriteria",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filterCriteria: S.optional(__S(1092, __c34, 4)),
          sortCriteria: S.optional(__S(2944, __c92, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/findings/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFindingsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ text: S.optional(S.String), Url: S.optional(S.String) }),
      ).annotate({ identifier: "Recommendation" });
    case 3:
      return S.suspend(() =>
        S.Struct({ recommendation: S.optional(__S(2946, __c92, 2)) }),
      ).annotate({ identifier: "Remediation" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          imageId: S.optional(S.String),
          ipV4Addresses: S.optional(__S(64, __c2, 0)),
          ipV6Addresses: S.optional(__S(64, __c2, 0)),
          keyName: S.optional(S.String),
          iamInstanceProfileArn: S.optional(S.String),
          vpcId: S.optional(S.String),
          subnetId: S.optional(S.String),
          launchedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          platform: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsEc2InstanceDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          imageTags: S.optional(__S(64, __c2, 0)),
          pushedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          author: S.optional(S.String),
          architecture: S.optional(S.String),
          imageHash: S.String,
          registry: S.String,
          platform: S.optional(S.String),
          lastInUseAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          inUseCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AwsEcrContainerImageDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          subnetIds: S.optional(__S(64, __c2, 0)),
          securityGroupIds: S.optional(__S(64, __c2, 0)),
          vpcId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LambdaVpcConfig" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          functionName: S.String,
          runtime: S.String,
          codeSha256: S.String,
          version: S.String,
          executionRoleArn: S.String,
          layers: S.optional(__S(64, __c2, 0)),
          vpcConfig: S.optional(__S(2950, __c92, 6)),
          packageType: S.optional(S.String),
          architectures: S.optional(__S(64, __c2, 0)),
          lastModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AwsLambdaFunctionDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          projectName: S.optional(S.String),
          integrationArn: S.optional(S.String),
          providerType: S.optional(S.String),
        }),
      ).annotate({ identifier: "CodeRepositoryDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          vmName: S.optional(S.String),
          vmImageReference: S.optional(S.String),
          ipV4Addresses: S.optional(__S(64, __c2, 0)),
          ipV6Addresses: S.optional(__S(64, __c2, 0)),
          networkId: S.optional(S.String),
          subnetIds: S.optional(__S(64, __c2, 0)),
          securityGroupIds: S.optional(__S(64, __c2, 0)),
          launchedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          platform: S.optional(S.String),
          executionRole: S.optional(S.String),
          keyName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Vm" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          registry: S.optional(S.String),
          imageTags: S.optional(__S(64, __c2, 0)),
          imageDigest: S.optional(S.String),
          pushedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          architecture: S.optional(S.String),
          author: S.optional(S.String),
          inUseCount: S.optional(S.Number),
          lastInUseAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          platform: S.optional(S.String),
        }),
      ).annotate({ identifier: "Image" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          serverlessFunctionName: S.optional(S.String),
          runtime: S.optional(S.String),
          version: S.optional(S.String),
          codeDigest: S.optional(S.String),
          lastModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          networkId: S.optional(S.String),
          subnetIds: S.optional(__S(64, __c2, 0)),
          securityGroupIds: S.optional(__S(64, __c2, 0)),
          executionRole: S.optional(S.String),
          packageType: S.optional(S.String),
          architectures: S.optional(__S(64, __c2, 0)),
          layers: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "ServerlessFunction" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          awsEc2Instance: S.optional(__S(2948, __c92, 4)),
          awsEcrContainerImage: S.optional(__S(2949, __c92, 5)),
          awsLambdaFunction: S.optional(__S(2951, __c92, 7)),
          codeRepository: S.optional(__S(2952, __c92, 8)),
          vm: S.optional(__S(2953, __c92, 9)),
          image: S.optional(__S(2954, __c92, 10)),
          serverlessFunction: S.optional(__S(2955, __c92, 11)),
        }),
      ).annotate({ identifier: "ResourceDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          id: S.String,
          partition: S.optional(S.String),
          region: S.optional(S.String),
          tags: S.optional(__S(512, __c16, 0)),
          details: S.optional(__S(2956, __c92, 12)),
          provider: S.optional(S.String),
          providerAccountId: S.optional(S.String),
          providerOrgId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Resource" });
    case 14:
      return S.Array(__S(2957, __c92, 13));
    case 15:
      return S.suspend(() => S.Struct({ metric: S.String, reason: S.String })).annotate({
        identifier: "CvssScoreAdjustment",
      });
    case 16:
      return S.Array(__S(2959, __c92, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          scoreSource: S.String,
          cvssSource: S.optional(S.String),
          version: S.String,
          score: S.Number,
          scoringVector: S.String,
          adjustments: S.optional(__S(2960, __c92, 16)),
        }),
      ).annotate({ identifier: "CvssScoreDetails" });
    case 18:
      return S.suspend(() => S.Struct({ adjustedCvss: S.optional(__S(2961, __c92, 17)) })).annotate(
        { identifier: "InspectorScoreDetails" },
      );
    case 19:
      return S.suspend(() => S.Struct({ begin: S.Number, end: S.Number })).annotate({
        identifier: "PortRange",
      });
    case 20:
      return S.suspend(() =>
        S.Struct({
          componentId: S.String,
          componentType: S.String,
          componentArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Step" });
    case 21:
      return S.Array(__S(2964, __c92, 20));
    case 22:
      return S.suspend(() => S.Struct({ steps: S.optional(__S(2965, __c92, 21)) })).annotate({
        identifier: "NetworkPath",
      });
    case 23:
      return S.suspend(() =>
        S.Struct({
          openPortRange: __S(2963, __c92, 19),
          protocol: S.String,
          networkPath: __S(2966, __c92, 22),
        }),
      ).annotate({ identifier: "NetworkReachabilityDetails" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          version: S.String,
          sourceLayerHash: S.optional(S.String),
          epoch: S.optional(S.Number),
          release: S.optional(S.String),
          arch: S.optional(S.String),
          packageManager: S.optional(S.String),
          filePath: S.optional(S.String),
          fixedInVersion: S.optional(S.String),
          remediation: S.optional(S.String),
          sourceLambdaLayerArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "VulnerablePackage" });
    case 25:
      return S.Array(__S(2968, __c92, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          baseScore: S.Number,
          scoringVector: S.String,
          version: S.String,
          source: S.String,
        }),
      ).annotate({ identifier: "CvssScore" });
    case 27:
      return S.Array(__S(2970, __c92, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          vulnerabilityId: S.String,
          vulnerablePackages: S.optional(__S(2969, __c92, 25)),
          source: S.String,
          cvss: S.optional(__S(2971, __c92, 27)),
          relatedVulnerabilities: S.optional(__S(64, __c2, 0)),
          sourceUrl: S.optional(S.String),
          vendorSeverity: S.optional(S.String),
          vendorCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          vendorUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          referenceUrls: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "PackageVulnerabilityDetails" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          lastKnownExploitAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ExploitabilityDetails" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          fileName: S.String,
          filePath: S.String,
          startLine: S.Number,
          endLine: S.Number,
        }),
      ).annotate({ identifier: "CodeFilePath" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          filePath: __S(2974, __c92, 30),
          detectorTags: S.optional(__S(64, __c2, 0)),
          referenceUrls: S.optional(__S(64, __c2, 0)),
          ruleId: S.optional(S.String),
          sourceLambdaLayerArn: S.optional(S.String),
          detectorId: S.String,
          detectorName: S.String,
          cwes: __S(64, __c2, 0),
        }),
      ).annotate({ identifier: "CodeVulnerabilityDetails" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          findingArn: S.String,
          awsAccountId: S.String,
          type: S.String,
          description: S.String,
          title: S.optional(S.String),
          remediation: __S(2947, __c92, 3),
          severity: S.String,
          firstObservedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastObservedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.String,
          resources: __S(2958, __c92, 14),
          inspectorScore: S.optional(S.Number),
          inspectorScoreDetails: S.optional(__S(2962, __c92, 18)),
          networkReachabilityDetails: S.optional(__S(2967, __c92, 23)),
          packageVulnerabilityDetails: S.optional(__S(2972, __c92, 28)),
          fixAvailable: S.optional(S.String),
          exploitAvailable: S.optional(S.String),
          exploitabilityDetails: S.optional(__S(2973, __c92, 29)),
          codeVulnerabilityDetails: S.optional(__S(2975, __c92, 31)),
          epss: S.optional(__S(3008, __c94, 0)),
        }),
      ).annotate({ identifier: "Finding" });
    case 1:
      return S.Array(__S(2976, __c93, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), findings: S.optional(__S(2977, __c93, 1)) }),
      ).annotate({ identifier: "ListFindingsResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ score: S.optional(S.Number) })).annotate({
        identifier: "EpssDetails",
      });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          onlyAssociated: S.optional(S.Boolean),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/members/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMembersRequest" });
    case 1:
      return S.Array(__S(2208, __c69, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ members: S.optional(__S(3041, __c95, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMembersResponse" });
  }
}
function __c96(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(512, __c16, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          accountIds: S.optional(__S(64, __c2, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/usage/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListUsageTotalsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          total: S.optional(S.Number),
          estimatedMonthlyCost: S.optional(S.Number),
          currency: S.optional(S.String),
          cloudProvider: S.optional(S.String),
        }),
      ).annotate({ identifier: "Usage" });
    case 2:
      return S.Array(__S(3105, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ accountId: S.optional(S.String), usage: S.optional(__S(3106, __c97, 2)) }),
      ).annotate({ identifier: "UsageTotal" });
    case 4:
      return S.Array(__S(3107, __c97, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), totals: S.optional(__S(3108, __c97, 4)) }),
      ).annotate({ identifier: "ListUsageTotalsResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scanType: S.String, resourceType: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/encryptionkey/reset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetEncryptionKeyRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(3168, __c99, 0));
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ vulnerabilityIds: __S(64, __c2, 0) })).annotate({
        identifier: "SearchVulnerabilitiesFilterCriteria",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ filterCriteria: __S(3200, __c100, 0), nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/vulnerabilities/search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchVulnerabilitiesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          firstSeen: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastSeen: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          targets: S.optional(__S(64, __c2, 0)),
          ttps: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "AtigData" });
    case 3:
      return S.suspend(() =>
        S.Struct({ baseScore: S.optional(S.Number), scoringVector: S.optional(S.String) }),
      ).annotate({ identifier: "Cvss4" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          cwes: S.optional(__S(64, __c2, 0)),
          cisaData: S.optional(__S(224, __c7, 0)),
          source: S.optional(S.String),
          description: S.optional(S.String),
          atigData: S.optional(__S(3202, __c100, 2)),
          vendorSeverity: S.optional(S.String),
          cvss4: S.optional(__S(3203, __c100, 3)),
          cvss3: S.optional(__S(3203, __c100, 3)),
          relatedVulnerabilities: S.optional(__S(64, __c2, 0)),
          cvss2: S.optional(__S(3203, __c100, 3)),
          vendorCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          vendorUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          sourceUrl: S.optional(S.String),
          referenceUrls: S.optional(__S(64, __c2, 0)),
          exploitObserved: S.optional(__S(225, __c7, 1)),
          detectionPlatforms: S.optional(__S(64, __c2, 0)),
          epss: S.optional(__S(3008, __c94, 0)),
        }),
      ).annotate({ identifier: "Vulnerability" });
    case 5:
      return S.Array(__S(3204, __c100, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ vulnerabilities: __S(3205, __c100, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchVulnerabilitiesResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scanJobId: S.String, sessionToken: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/cissession/health/send" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendCisSessionHealthRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ruleId: S.String, status: S.String, cisRuleDetails: T.Blob }),
      ).annotate({ identifier: "CisSessionMessage" });
    case 1:
      return S.Array(__S(3264, __c102, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          scanJobId: S.String,
          sessionToken: S.String,
          messages: __S(3265, __c102, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/cissession/telemetry/send" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendCisSessionTelemetryRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ sessionToken: S.String })).annotate({
        identifier: "StartCisSessionMessage",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ scanJobId: S.String, message: __S(3296, __c103, 0) }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/cissession/start" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartCisSessionRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          resource: __S(3936, __c123, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/scan/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCodeSecurityScanRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ scanId: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "StartCodeSecurityScanResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          totalChecks: S.optional(S.Number),
          successfulChecks: S.optional(S.Number),
          failedChecks: S.optional(S.Number),
          notEvaluatedChecks: S.optional(S.Number),
          unknownChecks: S.optional(S.Number),
          notApplicableChecks: S.optional(S.Number),
          informationalChecks: S.optional(S.Number),
          errorChecks: S.optional(S.Number),
        }),
      ).annotate({ identifier: "StopCisMessageProgress" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vendor: S.optional(S.String),
          product: S.optional(S.String),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComputePlatform" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          reason: S.optional(S.String),
          progress: __S(3360, __c105, 0),
          computePlatform: S.optional(__S(3361, __c105, 1)),
          benchmarkVersion: S.optional(S.String),
          benchmarkProfile: S.optional(S.String),
        }),
      ).annotate({ identifier: "StopCisSessionMessage" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          scanJobId: S.String,
          sessionToken: S.String,
          message: __S(3362, __c105, 2),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/cissession/stop" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopCisSessionRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(512, __c16, 0),
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
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(64, __c2, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scanConfigurationArn: S.String,
          scanName: S.optional(S.String),
          securityLevel: S.optional(S.String),
          schedule: S.optional(__S(676, __c21, 4)),
          targets: S.optional(__S(2368, __c74, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cis/scan-configuration/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCisScanConfigurationRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ authCode: SensitiveString })).annotate({
        identifier: "UpdateGitLabSelfManagedIntegrationDetail",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ code: SensitiveString, installationId: S.String }),
      ).annotate({ identifier: "UpdateGitHubIntegrationDetail" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ gitlabSelfManaged: __S(3488, __c109, 0) }),
        /*@__PURE__*/ S.Struct({ github: __S(3489, __c109, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({ integrationArn: S.String, details: __S(3490, __c109, 2) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/integration/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCodeSecurityIntegrationRequest" });
    case 4:
      return S.suspend(() => S.Struct({ integrationArn: S.String, status: S.String })).annotate({
        identifier: "UpdateCodeSecurityIntegrationResponse",
      });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/members/associate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateMemberRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ accountId: S.String })).annotate({
        identifier: "AssociateMemberResponse",
      });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scanConfigurationArn: S.String, configuration: __S(834, __c26, 2) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/scan-configuration/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCodeSecurityScanConfigurationRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          rescanDuration: S.String,
          pullDateRescanDuration: S.optional(S.String),
          pullDateRescanMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "EcrConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ scanMode: S.String, activateVMScanner: S.optional(S.Boolean) }),
      ).annotate({ identifier: "Ec2Configuration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ec2Configuration: S.optional(S.String),
          ecrConfiguration: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateConfigurationInheritance" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          ecrConfiguration: S.optional(__S(3616, __c113, 0)),
          ec2Configuration: S.optional(__S(3617, __c113, 1)),
          updateConfigurationInheritance: S.optional(__S(3618, __c113, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configuration/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConfigurationRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          azureRegions: S.optional(__S(64, __c2, 0)),
          scopeConfiguration: S.optional(__S(897, __c28, 1)),
          autoInstallVMScanner: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AzureProviderDetailUpdate" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ azure: __S(3648, __c114, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          connectorArn: S.String,
          description: S.optional(S.String),
          providerDetail: S.optional(__S(3649, __c114, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/connector/update" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateConnectorRequest" });
    case 3:
      return S.suspend(() => S.Struct({ connectorArn: S.optional(S.String) })).annotate({
        identifier: "UpdateConnectorResponse",
      });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ awsConfigConnectorArn: S.String, scanConfiguration: __S(2689, __c84, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/connectorscanconfiguration/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectorScanConfigurationRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          activateDeepInspection: S.optional(S.Boolean),
          packagePaths: S.optional(__S(64, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ec2deepinspectionconfiguration/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEc2DeepInspectionConfigurationRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ kmsKeyId: S.String, scanType: S.String, resourceType: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/encryptionkey/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEncryptionKeyRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          action: S.optional(S.String),
          description: S.optional(S.String),
          filterCriteria: S.optional(__S(1092, __c34, 4)),
          name: S.optional(S.String),
          filterArn: S.String,
          reason: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/filters/update" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateFilterRequest" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autoEnable: __S(1472, __c46, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/organizationconfiguration/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateOrganizationConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ autoEnable: __S(1472, __c46, 0) })).annotate({
        identifier: "UpdateOrganizationConfigurationResponse",
      });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ orgPackagePaths: __S(64, __c2, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ec2deepinspectionconfiguration/org/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateOrgEc2DeepInspectionConfigurationRequest" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ associateConfigurationRequests: __S(3905, __c122, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/codesecurity/scan-configuration/batch/associate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchAssociateCodeSecurityScanConfigurationRequest" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scanConfigurationArn: S.String, resource: __S(3936, __c123, 0) }),
      ).annotate({ identifier: "AssociateConfigurationRequest" });
    case 1:
      return S.Array(__S(3904, __c122, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          scanConfigurationArn: S.optional(S.String),
          resource: S.optional(__S(3936, __c123, 0)),
          statusCode: S.optional(S.String),
          statusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailedAssociationResult" });
    case 3:
      return S.Array(__S(3906, __c122, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          scanConfigurationArn: S.optional(S.String),
          resource: S.optional(__S(3936, __c123, 0)),
        }),
      ).annotate({ identifier: "SuccessfulAssociationResult" });
    case 5:
      return S.Array(__S(3908, __c122, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          failedAssociations: S.optional(__S(3907, __c122, 3)),
          successfulAssociations: S.optional(__S(3909, __c122, 5)),
        }),
      ).annotate({ identifier: "BatchAssociateCodeSecurityScanConfigurationResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ projectId: S.String })]);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
